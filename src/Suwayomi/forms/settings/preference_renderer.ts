import {
	Form,
	InputRow,
	LabelRow,
	NavigationRow,
	Section,
	SelectRow,
	ToggleRow,
	closureSelector,
	type FormItemElement,
	type FormSectionElement,
} from '@paperback/types';

import type { SourcePreferenceChangeInput } from '../../api/generated/graphql';
import type { SourcePreferences } from '../../api/utils/sources';
import { statusSection } from '../sections/status_section';

type SavePreference = (change: SourcePreferenceChangeInput) => Promise<void>;

export function buildPreferenceSections(
	preferences: SourcePreferences,
	form: Form,
	save: SavePreference,
) {
	return preferences.flatMap((preference, position) => {
		if (!preference.visible) return [];

		const id = `preference_${position}`;
		const title = preference.title ?? preference.key ?? `Preference ${position + 1}`;

		let displayValue = '';
		let row: FormItemElement<unknown>;

		switch (preference.type) {
			case 'CheckBoxPreference':
			case 'SwitchPreference': {
				const value = preference.booleanValue ?? preference.booleanDefault;

				displayValue = value ? 'On' : 'Off';

				row = ToggleRow(id, {
					title,
					value,
					onValueChange: closureSelector(form, `change_${id}`, async (next: boolean) => {
						await save({
							position,
							...(preference.type === 'CheckBoxPreference'
								? { checkBoxState: next }
								: { switchState: next }),
						});
					}),
				});

				break;
			}

			case 'ListPreference':
			case 'MultiSelectListPreference': {
				const selected =
					preference.type === 'ListPreference'
						? [preference.stringValue ?? preference.stringDefault].filter(
								(value): value is string => value != null,
							)
						: (preference.selectedValues ?? preference.defaultValues ?? []);

				const items = preference.entryValues.map((value, index) => ({
					id: String(index),
					title: preference.entries[index] ?? value,
				}));

				const selectedIds = preference.entryValues.flatMap((value, index) =>
					selected.includes(value) ? [String(index)] : [],
				);

				displayValue = selected
					.map(
						(value) =>
							preference.entries[preference.entryValues.indexOf(value)] ?? value,
					)
					.join(', ');

				row =
					items.length === 0
						? LabelRow(id, {
								title,
								value: 'No options available.',
							})
						: SelectRow(id, {
								title,
								layout: 'list',
								items,
								value:
									preference.type === 'ListPreference'
										? selectedIds.slice(0, 1)
										: selectedIds,
								minItemCount: preference.type === 'ListPreference' ? 1 : 0,
								maxItemCount:
									preference.type === 'ListPreference' ? 1 : items.length,
								onValueChange: closureSelector(
									form,
									`change_${id}`,
									async (ids: string[]) => {
										const values = ids.map((selectedId) => {
											const index = items.findIndex(
												(item) => item.id === selectedId,
											);

											const value = preference.entryValues[index];

											if (value === undefined) {
												throw new Error('Invalid preference option.');
											}

											return value;
										});

										if (preference.type === 'ListPreference') {
											const value = values[0];

											if (values.length !== 1 || value === undefined) {
												throw new Error('Select one preference option.');
											}

											await save({
												position,
												listState: value,
											});
										} else {
											await save({
												position,
												multiSelectState: values,
											});
										}
									},
								),
							});

				break;
			}

			case 'EditTextPreference': {
				const value = preference.stringValue ?? preference.stringDefault ?? '';

				displayValue = value;

				row = NavigationRow(id, {
					title,
					form: new TextPreferenceForm(
						preference.dialogTitle ?? title,
						preference.dialogMessage,
						value,
						async (next) =>
							save({
								position,
								editTextState: next,
							}),
					),
				});

				break;
			}
		}

		if (!preference.enabled) {
			row = LabelRow(id, {
				title,
				value: displayValue,
			});
		}

		const summary = preference.summary?.replaceAll('%s', displayValue);

		const dialogMessage = 'dialogMessage' in preference ? preference.dialogMessage : undefined;

		const footer = [summary, dialogMessage].filter(Boolean).join('\n') || undefined;

		return [Section({ id, footer }, [row])];
	});
}

class TextPreferenceForm extends Form {
	override readonly requiresExplicitSubmission = true;

	private saving = false;

	constructor(
		private readonly title: string,
		private readonly message: string | null | undefined,
		private value: string,
		private readonly save: (value: string) => Promise<void>,
	) {
		super();
	}

	override getSections(): FormSectionElement<unknown>[] {
		if (this.saving) {
			return [statusSection('text', 'Saving preference...')];
		}

		return [
			Section(
				{
					id: 'text',
					header: this.title,
					footer: this.message ?? undefined,
				},
				[
					InputRow('value', {
						title: 'Value',
						value: this.value,
						onValueChange: Application.Selector(
							this as TextPreferenceForm,
							'onValueChanged',
						),
					}),
				],
			),
		];
	}

	async onValueChanged(value: string): Promise<void> {
		this.value = value;
	}

	override async formDidSubmit(): Promise<void> {
		if (this.saving) {
			throw new Error('The preference is already being saved.');
		}

		this.saving = true;
		this.reloadForm();

		try {
			await this.save(this.value);
		} finally {
			this.saving = false;
			this.reloadForm();
		}
	}
}
