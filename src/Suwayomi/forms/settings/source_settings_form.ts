import { Form, Section, ToggleRow, type FormSectionElement } from '@paperback/types';

import type { InstalledSource } from '../../api/utils/sources';
import { config } from '../../config';

export class SourceSettingsForm extends Form {
	constructor(private readonly source: InstalledSource) {
		super();
	}

	override getSections(): FormSectionElement<unknown>[] {
		return [
			Section('settings', [
				ToggleRow('enabled', {
					title: 'Enabled',
					value: config.isSourceEnabled(this.source),
					onValueChange: Application.Selector(
						this as SourceSettingsForm,
						'onEnabledChanged',
					),
				}),
			]),
		];
	}

	async onEnabledChanged(enabled: boolean): Promise<void> {
		config.setSourceEnabled(this.source.id, enabled);
		this.reloadForm();
	}
}
