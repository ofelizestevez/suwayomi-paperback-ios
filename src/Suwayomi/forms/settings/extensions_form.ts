import {
	Form,
	LabelRow,
	ButtonRow,
	NavigationRow,
	Section,
	type FormSectionElement,
} from '@paperback/types';

import {
	getExtensions,
	refreshExtensions,
	type ExtensionSummary,
} from '../../api/utils/extensions';
import { getLanguageName } from '../../utils/languages';
import { statusSection } from '../sections/status_section';
import { ExtensionDetailsForm } from './extension_details_form';
import { LanguageExtensionsForm } from './language_extensions_form';

export class ExtensionsForm extends Form {
	private extensions: ExtensionSummary[] = [];
	private loading = true;
	private error?: string;

	private refreshing = false;

	override formWillAppear(): void {
		void this.loadExtensions();
	}

	override getSections(): FormSectionElement<unknown>[] {
		if (this.loading) {
			return [statusSection('extensions', 'Loading extensions...')];
		}

		const refreshSection = Section('catalogue', [
			ButtonRow('refreshCatalogue', {
				title: 'Refresh Catalogue',
				onSelect: Application.Selector(this as ExtensionsForm, 'refreshCatalogue'),
			}),
		]);

		if (this.error) {
			return [refreshSection, statusSection('extensions', this.error)];
		}

		const extensions = this.extensions.toSorted((a, b) => a.name.localeCompare(b.name));

		const updates = extensions.filter(
			(extension) => extension.isInstalled && extension.hasUpdate,
		);

		const installed = extensions.filter(
			(extension) => extension.isInstalled && !extension.hasUpdate,
		);

		const available = extensions.filter(
			(extension) => !extension.isInstalled && !extension.isObsolete,
		);

		const languages = [...new Set(available.map((extension) => extension.lang))]
			.map((id) => ({ id, title: getLanguageName(id) }))
			.toSorted((a, b) => {
				if (a.id === 'all') return -1;
				if (b.id === 'all') return 1;

				return a.title.localeCompare(b.title);
			});

		return [
			refreshSection,
			this.extensionSection('updates', 'Updates', updates),
			this.extensionSection('installed', 'Installed', installed),
			Section(
				{ id: 'available', header: 'Available' },
				languages.length > 0
					? languages.map((language) =>
							NavigationRow(`language_${language.id}`, {
								title: language.title,
								form: new LanguageExtensionsForm(language.id),
							}),
						)
					: [
							LabelRow('empty', {
								title: 'No available extensions found.',
							}),
						],
			),
		];
	}

	private extensionSection(id: string, title: string, extensions: ExtensionSummary[]) {
		return Section(
			{ id, header: title },
			extensions.length > 0
				? extensions.map((extension) =>
						NavigationRow(`extension_${extension.pkgName}`, {
							title: extension.name,
							subtitle: getLanguageName(extension.lang),
							form: new ExtensionDetailsForm(extension.pkgName),
						}),
					)
				: [
						LabelRow('empty', {
							title:
								id === 'updates'
									? 'No updates available.'
									: 'No other installed extensions.',
						}),
					],
		);
	}

	async refreshCatalogue(): Promise<void> {
		if (this.loading) return;

		await this.loadExtensions(true);
	}

	private async loadExtensions(refresh = false): Promise<void> {
		if (this.refreshing) return;

		this.loading = true;
		this.refreshing = refresh;
		this.error = undefined;
		this.reloadForm();

		try {
			this.extensions = refresh ? await refreshExtensions() : await getExtensions();
		} catch (error) {
			this.error = error instanceof Error ? error.message : 'Failed to load extensions.';
		} finally {
			this.loading = false;
			this.refreshing = false;
			this.reloadForm();
		}
	}
}
