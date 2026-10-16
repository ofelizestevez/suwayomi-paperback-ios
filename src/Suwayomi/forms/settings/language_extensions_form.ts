import { Form, LabelRow, NavigationRow, Section, type FormSectionElement } from '@paperback/types';

import { getExtensions, type ExtensionSummary } from '../../api/utils/extensions';
import { getLanguageName } from '../../utils/languages';
import { statusSection } from '../sections/status_section';
import { ExtensionDetailsForm } from './extension_details_form';

export class LanguageExtensionsForm extends Form {
	private extensions: ExtensionSummary[] = [];
	private loading = true;
	private error?: string;

	constructor(private readonly language: string) {
		super();
	}

	override formWillAppear(): void {
		void this.loadExtensions();
	}

	override getSections(): FormSectionElement<unknown>[] {
		if (this.loading) {
			return [statusSection('extensions', 'Loading extensions...')];
		}

		if (this.error) {
			return [statusSection('extensions', this.error)];
		}

		const extensions = this.extensions.toSorted((a, b) => a.name.localeCompare(b.name));

		return [
			Section(
				{
					id: 'extensions',
					header: getLanguageName(this.language),
				},
				extensions.length > 0
					? extensions.map((extension) =>
							NavigationRow(`extension_${extension.pkgName}`, {
								title: extension.name,
								subtitle: extension.versionName,
								form: new ExtensionDetailsForm(extension.pkgName),
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

	private async loadExtensions(): Promise<void> {
		this.loading = true;
		this.error = undefined;
		this.reloadForm();

		try {
			const extensions = await getExtensions();

			this.extensions = extensions.filter(
				(extension) =>
					!extension.isInstalled &&
					!extension.isObsolete &&
					extension.lang === this.language,
			);
		} catch (error) {
			this.error = error instanceof Error ? error.message : 'Failed to load extensions.';
		} finally {
			this.loading = false;
			this.reloadForm();
		}
	}
}
