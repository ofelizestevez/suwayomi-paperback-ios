import { LabelRow, Section, type FormSectionElement } from '@paperback/types';

export function statusSection(id: string, message: string): FormSectionElement<unknown> {
	return Section(id, [LabelRow('status', { title: message })]);
}
