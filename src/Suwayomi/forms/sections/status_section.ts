import { LabelRow, Section } from '@paperback/types';

export function statusSection(id: string, message: string) {
	return Section(id, [LabelRow('status', { title: message })]);
}
