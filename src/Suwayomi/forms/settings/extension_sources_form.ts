import { Form, NavigationRow, Section, type FormSectionElement } from '@paperback/types';

import type { InstalledExtension } from '../../api/utils/sources';
import { getLanguageName } from '../../utils/languages';
import { statusSection } from '../sections/status_section';
import { SourceSettingsForm } from './source_settings_form';

export class ExtensionSourcesForm extends Form {
	constructor(private readonly extension: InstalledExtension) {
		super();
	}

	override getSections(): FormSectionElement<unknown>[] {
		const sources = this.extension.source.nodes.toSorted((a, b) =>
			a.lang.localeCompare(b.lang),
		);

		if (sources.length === 0) {
			return [statusSection('languages', 'No languages found.')];
		}

		return [
			Section(
				{
					id: 'languages',
					header: this.extension.name,
				},
				sources.map((source) =>
					NavigationRow(`source_${source.id}`, {
						title: getLanguageName(source.lang),
						form: new SourceSettingsForm(source),
					}),
				),
			),
		];
	}
}
