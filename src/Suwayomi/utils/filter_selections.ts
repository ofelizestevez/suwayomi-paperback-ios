import type { Metadata } from '@paperback/types';

import type { TriState } from '../api/generated/graphql';

export type SortSelection = {
	index: number;
	ascending: boolean;
};

export type FilterSelection =
	| { type: 'CheckBoxFilter'; value: boolean }
	| { type: 'SelectFilter'; value: number }
	| { type: 'TextFilter'; value: string }
	| { type: 'TriStateFilter'; value: TriState }
	| { type: 'SortFilter'; value: SortSelection };

export type FilterSelections = Map<string, FilterSelection>;

export type SavedFilterSelections = Record<string, FilterSelection>;

export type SavedFiltersBySource = Record<string, SavedFilterSelections>;

function copyFilterSelection(selection: FilterSelection): FilterSelection {
	return selection.type === 'SortFilter'
		? {
				type: 'SortFilter',
				value: { ...selection.value },
			}
		: { ...selection };
}

export function saveFilterSelections(selections: FilterSelections): SavedFilterSelections {
	return Object.fromEntries(
		[...selections].map(([path, selection]) => [path, copyFilterSelection(selection)]),
	);
}

function isValidIndex(value: Metadata | undefined): value is number {
	return (
		typeof value === 'number' && Number.isInteger(value) && value >= 0 && value <= 2_147_483_647
	);
}

export function parseFilterPath(path: string): number[] {
	const positions = path.split('.').map(Number);

	if (!/^\d+(\.\d+)*$/.test(path) || !positions.every(isValidIndex)) {
		throw new Error(`Invalid filter path: ${path}`);
	}

	return positions;
}

function isFilterSelection(value: Metadata | undefined): value is FilterSelection {
	if (!value || typeof value !== 'object' || Array.isArray(value)) {
		return false;
	}

	switch (value.type) {
		case 'CheckBoxFilter':
			return typeof value.value === 'boolean';

		case 'SelectFilter':
			return isValidIndex(value.value);

		case 'TextFilter':
			return typeof value.value === 'string';

		case 'TriStateFilter':
			return (
				value.value === 'INCLUDE' || value.value === 'EXCLUDE' || value.value === 'IGNORE'
			);

		case 'SortFilter': {
			const sort = value.value;

			return (
				!!sort &&
				typeof sort === 'object' &&
				!Array.isArray(sort) &&
				isValidIndex(sort.index) &&
				typeof sort.ascending === 'boolean'
			);
		}

		default:
			return false;
	}
}

export function restoreFilterSelections(saved: Metadata | undefined): FilterSelections {
	const selections: FilterSelections = new Map();

	if (saved === undefined) {
		return selections;
	}

	if (!saved || typeof saved !== 'object' || Array.isArray(saved)) {
		throw new Error('Saved source filters are invalid. Start a new search.');
	}

	for (const [path, selection] of Object.entries(saved)) {
		parseFilterPath(path);

		if (!isFilterSelection(selection)) {
			throw new Error('Saved source filters are invalid. Start a new search.');
		}

		selections.set(path, copyFilterSelection(selection));
	}

	return selections;
}
