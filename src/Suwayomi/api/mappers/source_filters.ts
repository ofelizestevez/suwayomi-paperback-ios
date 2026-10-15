import {
	parseFilterPath,
	type FilterSelection,
	type FilterSelections,
} from '../../utils/filter_selections';
import type { FilterChangeInput } from '../generated/graphql';

function toLeafFilterChange(position: number, selection: FilterSelection): FilterChangeInput {
	switch (selection.type) {
		case 'CheckBoxFilter':
			return {
				position,
				checkBoxState: selection.value,
			};

		case 'SelectFilter':
			return {
				position,
				selectState: selection.value,
			};

		case 'TextFilter':
			return {
				position,
				textState: selection.value,
			};

		case 'TriStateFilter':
			return {
				position,
				triState: selection.value,
			};

		case 'SortFilter':
			return {
				position,
				sortState: { ...selection.value },
			};
	}
}

export function toFilterChanges(selections: FilterSelections): FilterChangeInput[] {
	return [...selections]
		.toSorted(([a], [b]) => a.localeCompare(b))
		.map(([path, selection]) => {
			const positions = parseFilterPath(path);

			let change = toLeafFilterChange(positions.pop()!, selection);

			while (positions.length > 0) {
				change = {
					position: positions.pop()!,
					groupChange: change,
				};
			}

			return change;
		});
}
