import { Form, NavigationRow, Section, type FormSectionElement } from '@paperback/types';

import { executeGraphQL } from '../../api/client';
import { InstalledExtensionsDocument } from '../../api/generated/graphql';
import type { InstalledExtension } from '../../api/utils/sources';
import { config } from '../../config';
import { statusSection } from '../sections/status_section';
import { ExtensionSourcesForm } from './extension_sources_form';

export class InstalledExtensionsForm extends Form {
	private extensions: InstalledExtension[] = [];
	private loading = true;
	private error?: string;

	override formWillAppear(): void {
		void this.loadExtensions();
	}

	override getSections(): FormSectionElement<unknown>[] {
		if (this.loading) {
			return [statusSection('extensions', 'Loading installed extensions...')];
		}

		if (this.error) {
			return [statusSection('extensions', this.error)];
		}

		const extensions = this.extensions.toSorted((a, b) => a.name.localeCompare(b.name));

		if (extensions.length === 0) {
			return [statusSection('extensions', 'No installed extensions found.')];
		}

		return [
			Section(
				{ id: 'extensions', header: 'Installed Extensions' },
				extensions.map((extension) =>
					NavigationRow(`extension_${extension.pkgName}`, {
						title: extension.name,
						form: new ExtensionSourcesForm(extension),
					}),
				),
			),
		];
	}

	private async loadExtensions(): Promise<void> {
		this.loading = true;
		this.error = undefined;
		this.reloadForm();

		try {
			const result = await executeGraphQL(config.serverUrl, InstalledExtensionsDocument);

			this.extensions = result.extensions.nodes;
		} catch (error) {
			this.error =
				error instanceof Error ? error.message : 'Failed to load installed extensions.';
		} finally {
			this.loading = false;
			this.reloadForm();
		}
	}
}
