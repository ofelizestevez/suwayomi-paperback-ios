import {
	Form,
	InputRow,
	LabelRow,
	NavigationRow,
	Section,
	SelectRow,
	ToggleRow,
	closureSelector,
	TriStateSelectRow,
	type FormItemElement,
	type FormSectionElement,
} from '@paperback/types';

import type { TriState } from '../../api/generated/graphql';
import type { FilterSelections, SortSelection } from '../../utils/filter_selections';
import { statusSection } from '../sections/status_section';

type FilterNode = {
	type: string;
	name: string;
	filters?: readonly FilterNode[] | null;
	values?: readonly string[] | null;
	CheckBoxFilterDefault?: boolean | null;
	SelectFilterDefault?: number | null;
	TextFilterDefault?: string | null;
	TriStateFilterDefault?: TriState | null;
	SortFilterDefault?: SortSelection | null;
};
type PaperbackTriState = 'included' | 'excluded';

function isValidOptionIndex(index: number, optionCount: number): boolean {
	return Number.isInteger(index) && index >= 0 && index < optionCount;
}

export function buildFilterSections(
	filters: readonly FilterNode[],
	form: Form,
	selections: FilterSelections,
	path: number[] = [],
): FormSectionElement<unknown>[] {
	const groups: { filter: FilterNode; position: number }[][] = [];

	let currentGroup: { filter: FilterNode; position: number }[] = [];

	filters.forEach((filter, position) => {
		if (filter.type === 'SeparatorFilter') {
			if (currentGroup.length > 0) {
				groups.push(currentGroup);
				currentGroup = [];
			}

			return;
		}

		currentGroup.push({ filter, position });
	});

	if (currentGroup.length > 0) {
		groups.push(currentGroup);
	}

	return groups.map((group, index) =>
		Section(
			`section_${[...path, index].join('_')}`,
			group.map(({ filter, position }) =>
				buildFilterRow(filter, [...path, position], form, selections),
			),
		),
	);
}

function buildFilterRow(
	filter: FilterNode,
	path: number[],
	form: Form,
	selections: FilterSelections,
): FormItemElement<unknown> {
	const id = `filter_${path.join('_')}`;
	const key = path.join('.');
	const saved = selections.get(key);

	switch (filter.type) {
		case 'HeaderFilter':
			return LabelRow(id, {
				title: filter.name,
			});

		case 'GroupFilter': {
			if (filter.filters === undefined) {
				return LabelRow(id, {
					title: filter.name,
					subtitle: 'Additional filter nesting is not supported.',
				});
			}

			const children = filter.filters ?? [];

			if (children.length > 0 && children.every((child) => child.type === 'TriStateFilter')) {
				return buildTriStateRow(
					id,
					filter.name,
					children.map((child, position) => ({
						filter: child,
						path: [...path, position],
					})),
					form,
					selections,
				);
			}

			return NavigationRow(id, {
				title: filter.name,
				form: new FilterGroupForm(filter.name, children, path, selections),
			});
		}

		case 'CheckBoxFilter':
			return ToggleRow(id, {
				title: filter.name,
				value:
					saved?.type === 'CheckBoxFilter'
						? saved.value
						: (filter.CheckBoxFilterDefault ?? false),
				onValueChange: closureSelector(form, `toggle_${id}`, async (value: boolean) => {
					selections.set(key, {
						type: 'CheckBoxFilter',
						value,
					});
					form.reloadForm();
				}),
			});

		case 'SelectFilter': {
			const options = filter.values ?? [];

			if (options.length === 0) {
				return LabelRow(id, {
					title: filter.name,
					subtitle: 'No options available',
				});
			}

			const selectedIndex =
				saved?.type === 'SelectFilter' ? saved.value : (filter.SelectFilterDefault ?? 0);

			const index = isValidOptionIndex(selectedIndex, options.length) ? selectedIndex : 0;

			return SelectRow(id, {
				title: filter.name,
				layout: 'list',
				value: [String(index)],
				items: options.map((title, index) => ({
					id: String(index),
					title,
				})),
				minItemCount: 1,
				maxItemCount: 1,
				onValueChange: closureSelector(form, `select_${id}`, async (value: string[]) => {
					const nextIndex = Number(value[0]);

					if (isValidOptionIndex(nextIndex, options.length)) {
						selections.set(key, { type: 'SelectFilter', value: nextIndex });
						form.reloadForm();
					}
				}),
			});
		}

		case 'TriStateFilter':
			return buildTriStateRow(id, filter.name, [{ filter, path }], form, selections);

		case 'SortFilter': {
			const options = filter.values ?? [];

			if (options.length === 0) {
				return LabelRow(id, {
					title: filter.name,
					subtitle: 'No sorting options available',
				});
			}

			return NavigationRow(id, {
				title: filter.name,
				form: new SortFilterForm(
					filter.name,
					options,
					filter.SortFilterDefault ?? {
						index: 0,
						ascending: false,
					},
					key,
					selections,
				),
			});
		}
		case 'TextFilter':
			return InputRow(id, {
				title: filter.name,
				value:
					saved?.type === 'TextFilter' ? saved.value : (filter.TextFilterDefault ?? ''),

				onValueChange: closureSelector(form, `text_${id}`, async (value: string) => {
					selections.set(key, { type: 'TextFilter', value });
				}),
			});

		default:
			return LabelRow(id, {
				title: filter.name,
				subtitle: filter.type,
			});
	}
}

function buildTriStateRow(
	id: string,
	title: string,
	entries: { filter: FilterNode; path: number[] }[],
	form: Form,
	selections: FilterSelections,
): FormItemElement<unknown> {
	const value: Record<string, PaperbackTriState> = {};

	for (const { filter, path } of entries) {
		const key = path.join('.');
		const saved = selections.get(key);

		const state =
			saved?.type === 'TriStateFilter'
				? saved.value
				: (filter.TriStateFilterDefault ?? 'IGNORE');

		if (state === 'INCLUDE') {
			value[key] = 'included';
		} else if (state === 'EXCLUDE') {
			value[key] = 'excluded';
		}
	}

	return TriStateSelectRow(id, {
		title,
		layout: 'list',
		value,
		items: entries.map(({ filter, path }) => ({
			id: path.join('.'),
			title: filter.name,
		})),
		allowExclusion: true,
		allowEmptySelection: true,
		onValueChange: closureSelector(
			form,
			`triState_${id}`,
			async (value: Record<string, PaperbackTriState>) => {
				for (const { path } of entries) {
					const key = path.join('.');
					const state = value[key];

					selections.set(key, {
						type: 'TriStateFilter',
						value:
							state === 'included'
								? 'INCLUDE'
								: state === 'excluded'
									? 'EXCLUDE'
									: 'IGNORE',
					});
				}

				form.reloadForm();
			},
		),
	});
}

class FilterGroupForm extends Form {
	constructor(
		private name: string,
		private filters: readonly FilterNode[],
		private path: number[],
		private selections: FilterSelections,
	) {
		super();
	}

	override getSections(): FormSectionElement<unknown>[] {
		if (this.filters.length === 0) {
			return [statusSection('empty', `No filters available for ${this.name}.`)];
		}

		return buildFilterSections(this.filters, this, this.selections, this.path);
	}
}

class SortFilterForm extends Form {
	constructor(
		private name: string,
		private options: readonly string[],
		private defaultValue: SortSelection,
		private key: string,
		private selections: FilterSelections,
	) {
		super();
	}

	private getValue(): SortSelection {
		const saved = this.selections.get(this.key);

		const value = saved?.type === 'SortFilter' ? saved.value : this.defaultValue;

		return {
			index: isValidOptionIndex(value.index, this.options.length) ? value.index : 0,
			ascending: value.ascending,
		};
	}

	override getSections(): FormSectionElement<unknown>[] {
		const value = this.getValue();

		return [
			Section('sort', [
				SelectRow('sortOption', {
					title: this.name,
					layout: 'list',
					value: [String(value.index)],
					items: this.options.map((title, index) => ({
						id: String(index),
						title,
					})),
					minItemCount: 1,
					maxItemCount: 1,
					onValueChange: closureSelector(
						this,
						`sort_index_${this.key}`,
						async (selected: string[]) => {
							const index = Number(selected[0]);

							if (!isValidOptionIndex(index, this.options.length)) {
								return;
							}

							this.selections.set(this.key, {
								type: 'SortFilter',
								value: {
									...this.getValue(),
									index,
								},
							});

							this.reloadForm();
						},
					),
				}),

				ToggleRow('sortAscending', {
					title: 'Ascending',
					subtitle: 'Off = Descending',
					value: value.ascending,
					onValueChange: closureSelector(
						this,
						`sort_ascending_${this.key}`,
						async (ascending: boolean) => {
							this.selections.set(this.key, {
								type: 'SortFilter',
								value: {
									...this.getValue(),
									ascending,
								},
							});
							this.reloadForm();
						},
					),
				}),
			]),
		];
	}
}
