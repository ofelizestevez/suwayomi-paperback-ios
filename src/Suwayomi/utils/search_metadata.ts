import type { FilterSelection } from './filter_selections';
import type { SavedFiltersBySource } from './filter_selections';

export type SavedFilterSelections = Record<string, FilterSelection>;

export type SearchQueryMetadata = {
	searchModeSelection: 'simple' | 'source';
	sourceId?: string;
	filterSelectionsBySource: SavedFiltersBySource;
};

export type SimpleSearchPageMetadata = {
	kind: 'simple';
	searchContext: string;
	sourceIndex: number;
	page: number;
	exhaustedSourceIds: string[];
};

export type SourceSearchPageMetadata = {
	kind: 'source';
	searchContext: string;
	page: number;
};
