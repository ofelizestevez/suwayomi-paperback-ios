import { Form, type FormSectionElement } from '@paperback/types';

import { getSourceFilters, type SourceFilters } from '../../api/utils/source_filters';
import type { FilterSelections } from '../../utils/filter_selections';
import { statusSection } from '../sections/status_section';
import { buildFilterSections } from './filter_renderer';

export class SourceFiltersForm extends Form {
	private filters: SourceFilters | null = null;
	private loading = false;
	private error?: string;

	constructor(
		private sourceId: string,
		private selections: FilterSelections,
	) {
		super();
	}

	override formWillAppear(): void {
		if (this.filters === null && !this.loading) {
			void this.loadFilters();
		}
	}

	override getSections(): FormSectionElement<unknown>[] {
		if (this.loading) {
			return [statusSection('status', 'Loading source filters...')];
		}

		if (this.error) {
			return [statusSection('status', this.error)];
		}

		if (this.filters === null) {
			return [];
		}

		return buildFilterSections(this.filters, this, this.selections);
	}

	private async loadFilters(): Promise<void> {
		this.loading = true;
		this.error = undefined;
		this.reloadForm();

		try {
			this.filters = await getSourceFilters(this.sourceId);
		} catch (error) {
			this.error = error instanceof Error ? error.message : 'Failed to load source filters.';
		} finally {
			this.loading = false;
			this.reloadForm();
		}
	}
}
