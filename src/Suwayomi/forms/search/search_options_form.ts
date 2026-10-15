import {
	AdvancedSearchForm,
	ButtonRow,
	LabelRow,
	NavigationRow,
	Section,
	SelectSection,
	type FormSectionElement,
	type Metadata,
	type SearchQuery,
} from '@paperback/types';

import { getEnabledSearchSources, type SearchSource } from '../../api/utils/sources';
import {
	restoreFilterSelections,
	saveFilterSelections,
	type FilterSelections,
} from '../../utils/filter_selections';
import { getLanguageName } from '../../utils/languages';
import type { SearchQueryMetadata } from '../../utils/search_metadata';
import { statusSection } from '../sections/status_section';
import { SourceFiltersForm } from './source_filters_form';

export class SearchOptionsForm extends AdvancedSearchForm {
	private searchModeSelection: string[] = ['simple'];
	private selectedSourceIds: string[] = [];

	private sources: SearchSource[] | null = null;
	private loadingSources = false;
	private sourceError?: string;

	private readonly filterSelectionsBySource = new Map<string, FilterSelections>();

	constructor(query: SearchQuery<Metadata>) {
		super();

		const metadata = query.metadata;

		if (metadata && typeof metadata === 'object' && !Array.isArray(metadata)) {
			if (metadata.searchModeSelection === 'source') {
				this.searchModeSelection = ['source'];
			}

			if (typeof metadata.sourceId === 'string') {
				this.selectedSourceIds = [metadata.sourceId];
			}

			const savedFilters = metadata.filterSelectionsBySource;

			if (savedFilters !== undefined) {
				if (
					!savedFilters ||
					typeof savedFilters !== 'object' ||
					Array.isArray(savedFilters)
				) {
					throw new Error('Saved search filters are invalid. Start a new search.');
				}

				for (const [sourceId, selections] of Object.entries(savedFilters)) {
					this.filterSelectionsBySource.set(
						sourceId,
						restoreFilterSelections(selections),
					);
				}
			}
		}
	}

	override formWillAppear(): void {
		if (this.searchModeSelection[0] === 'source') {
			void this.loadSources();
		}
	}

	override getSections(): FormSectionElement<unknown>[] {
		const sections: FormSectionElement<unknown>[] = [
			SelectSection(this, {
				id: 'searchMode',
				header: 'Search Mode',
				layout: 'list',
				value: this.searchModeSelection,
				items: [
					{ id: 'simple', title: 'Simple' },
					{ id: 'source', title: 'Source-specific' },
				],
				minItemCount: 1,
				maxItemCount: 1,
				onValueChange: Application.Selector(this as SearchOptionsForm, 'onModeChanged'),
			}),
		];

		if (this.searchModeSelection[0] !== 'source') {
			return sections;
		}

		if (this.loadingSources) {
			sections.push(statusSection('status', 'Loading enabled sources...'));

			return sections;
		}

		if (this.sourceError) {
			sections.push(
				Section('sourceStatus', [
					LabelRow('error', {
						title: this.sourceError,
					}),
					ButtonRow('retry', {
						title: 'Retry',
						onSelect: Application.Selector(this as SearchOptionsForm, 'retrySources'),
					}),
				]),
			);

			return sections;
		}

		if (!this.sources?.length) {
			sections.push(statusSection('status', 'No enabled sources found.'));

			return sections;
		}

		sections.push(
			SelectSection(this, {
				id: 'searchSource',
				header: 'Source',
				layout: 'list',
				value: this.selectedSourceIds,
				items: this.sources.map((source) => ({
					id: source.id,
					title: `${source.extensionName} (${getLanguageName(source.lang)})`,
				})),
				minItemCount: 1,
				maxItemCount: 1,
			}),
		);

		const source = this.sources.find((source) => source.id === this.selectedSourceIds[0]);

		if (source) {
			let selections = this.filterSelectionsBySource.get(source.id);

			if (!selections) {
				selections = new Map();
				this.filterSelectionsBySource.set(source.id, selections);
			}

			sections.push(
				Section('sourceFilters', [
					NavigationRow('editFilters', {
						title: 'Edit Filters',
						subtitle: source.displayName,
						form: new SourceFiltersForm(source.id, selections),
					}),
				]),
			);
		}

		return sections;
	}

	async onModeChanged(): Promise<void> {
		if (this.searchModeSelection[0] === 'source') {
			void this.loadSources();
		}
	}

	async retrySources(): Promise<void> {
		await this.loadSources();
	}

	private async loadSources(): Promise<void> {
		if (this.sources !== null || this.loadingSources) {
			return;
		}

		this.loadingSources = true;
		this.sourceError = undefined;
		this.reloadForm();

		try {
			this.sources = await getEnabledSearchSources();

			const source =
				this.sources.find((source) => source.id === this.selectedSourceIds[0]) ??
				this.sources[0];

			this.selectedSourceIds = source ? [source.id] : [];
		} catch (error) {
			this.sourceError =
				error instanceof Error ? error.message : 'Failed to load enabled sources.';
		} finally {
			this.loadingSources = false;
			this.reloadForm();
		}
	}

	override async formDidSubmit(): Promise<void> {
		if (this.searchModeSelection[0] !== 'source') {
			return;
		}

		if (
			this.loadingSources ||
			!this.sources?.some((source) => source.id === this.selectedSourceIds[0])
		) {
			throw new Error('Select an enabled source before searching.');
		}
	}

	override getSearchQueryMetadata(): SearchQueryMetadata {
		return {
			searchModeSelection: this.searchModeSelection[0] === 'source' ? 'source' : 'simple',

			sourceId: this.selectedSourceIds[0],

			filterSelectionsBySource: Object.fromEntries(
				[...this.filterSelectionsBySource].map(([sourceId, selections]) => [
					sourceId,
					saveFilterSelections(selections),
				]),
			),
		};
	}
}
