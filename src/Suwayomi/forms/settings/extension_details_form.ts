import {
	Form,
	LabelRow,
	ButtonRow,
	NavigationRow,
	Section,
	type FormSectionElement,
} from '@paperback/types';

import { executeGraphQL } from '../../api/client';
import {
	ExtensionDetailsDocument,
	UpdateExtensionDocument,
	type ExtensionDetailsQuery,
} from '../../api/generated/graphql';
import { config } from '../../config';
import { getLanguageName } from '../../utils/languages';
import { statusSection } from '../sections/status_section';
import { SourceSettingsForm } from './source_settings_form';

type ExtensionDetails = ExtensionDetailsQuery['extension'];

type ExtensionAction = 'install' | 'update' | 'uninstall';

export class ExtensionDetailsForm extends Form {
	private extension?: ExtensionDetails;
	private loading = true;
	private error?: string;

	private pendingAction?: ExtensionAction;
	private actionError?: string;
	private removed = false;

	constructor(private readonly pkgName: string) {
		super();
	}

	override formWillAppear(): void {
		if (!this.removed && !this.pendingAction) {
			void this.loadExtension();
		}
	}

	override getSections(): FormSectionElement<unknown>[] {
		if (this.loading) {
			return [statusSection('extension', 'Loading extension...')];
		}

		if (this.error) {
			return [statusSection('extension', this.error)];
		}

		const extension = this.extension;

		if (!extension) {
			return [
				statusSection(
					'extension',
					this.removed ? 'Extension uninstalled.' : 'Extension not found.',
				),
			];
		}

		const sections: FormSectionElement<unknown>[] = [
			Section({ id: 'extension', header: extension.name }, [
				LabelRow('language', {
					title: 'Language',
					value: getLanguageName(extension.lang),
				}),
				LabelRow('version', {
					title: 'Version',
					value: extension.versionName,
				}),
				LabelRow('status', {
					title: 'Status',
					value: !extension.isInstalled
						? 'Not installed'
						: extension.hasUpdate
							? 'Update available'
							: 'Installed',
				}),
			]),
		];

		sections.push(this.actionsSection(extension));

		if (!extension.isInstalled || this.pendingAction) {
			return sections;
		}

		const sources = extension.source.nodes.toSorted(
			(a, b) =>
				Number(config.isSourceEnabled(b)) - Number(config.isSourceEnabled(a)) ||
				a.displayName.localeCompare(b.displayName) ||
				a.lang.localeCompare(b.lang),
		);

		sections.push(
			Section(
				{ id: 'sources', header: 'Sources' },
				sources.length > 0
					? sources.map((source) =>
							NavigationRow(`source_${source.id}`, {
								title: source.displayName,
								subtitle: getLanguageName(source.lang),
								form: new SourceSettingsForm(source),
							}),
						)
					: [LabelRow('empty', { title: 'No sources found.' })],
			),
		);

		return sections;
	}

	private actionsSection(extension: ExtensionDetails): FormSectionElement<unknown> {
		if (this.pendingAction) {
			const messages: Record<ExtensionAction, string> = {
				install: 'Installing extension...',
				update: 'Updating extension...',
				uninstall: 'Uninstalling extension...',
			};

			return statusSection('actions', messages[this.pendingAction]);
		}

		return Section({ id: 'actions', header: 'Actions' }, [
			ButtonRow('install', {
				title: 'Install',
				isHidden: extension.isInstalled || extension.isObsolete,
				onSelect: Application.Selector(this as ExtensionDetailsForm, 'installExtension'),
			}),
			ButtonRow('update', {
				title: 'Update',
				isHidden: !extension.isInstalled || !extension.hasUpdate || extension.isObsolete,
				onSelect: Application.Selector(this as ExtensionDetailsForm, 'updateExtension'),
			}),
			ButtonRow('uninstall', {
				title: 'Uninstall',
				isHidden: !extension.isInstalled,
				onSelect: Application.Selector(this as ExtensionDetailsForm, 'uninstallExtension'),
			}),
			this.actionError ? LabelRow('actionError', { title: this.actionError }) : undefined,
		]);
	}

	async installExtension(): Promise<void> {
		await this.changeExtension('install');
	}

	async updateExtension(): Promise<void> {
		await this.changeExtension('update');
	}

	async uninstallExtension(): Promise<void> {
		await this.changeExtension('uninstall');
	}

	private async changeExtension(action: ExtensionAction): Promise<void> {
		const extension = this.extension;

		if (!extension || this.loading || this.pendingAction) return;
		if (action === 'install' && extension.isInstalled) return;
		if (action !== 'install' && !extension.isInstalled) return;
		if (action === 'update' && !extension.hasUpdate) return;
		if (action !== 'uninstall' && extension.isObsolete) return;

		this.pendingAction = action;
		this.actionError = undefined;
		this.reloadForm();

		try {
			const result = await executeGraphQL(config.serverUrl, UpdateExtensionDocument, {
				pkgName: this.pkgName,
				patch: { [action]: true },
			});

			const payload = result.updateExtension;

			if (!payload) {
				throw new Error('The server did not confirm the extension action.');
			}

			const updated = payload.extension;

			if (!updated && action !== 'uninstall') {
				throw new Error('The server returned no extension after the action.');
			}

			if (updated && updated.isInstalled !== (action !== 'uninstall')) {
				throw new Error('The extension installation state did not change as expected.');
			}

			this.extension = updated ?? undefined;
			this.removed = !updated;
		} catch (error) {
			this.actionError = error instanceof Error ? error.message : 'Extension action failed.';
		} finally {
			this.pendingAction = undefined;
			this.reloadForm();
		}
	}

	private async loadExtension(): Promise<void> {
		if (this.pendingAction) return;

		this.loading = true;
		this.error = undefined;
		this.reloadForm();

		try {
			const result = await executeGraphQL(config.serverUrl, ExtensionDetailsDocument, {
				pkgName: this.pkgName,
			});

			this.extension = result.extension;
		} catch (error) {
			this.error = error instanceof Error ? error.message : 'Failed to load extension.';
		} finally {
			this.loading = false;
			this.reloadForm();
		}
	}
}
