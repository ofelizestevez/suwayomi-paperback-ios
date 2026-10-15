import { EditSection, Form, LabelRow, type FormSectionElement } from '@paperback/types';

import { getEnabledSearchSources, type SearchSource } from '../../api/utils/sources';
import { config } from '../../config';
import { getLanguageName } from '../../utils/languages';
import { statusSection } from '../sections/status_section';

export class SearchSourceOrderForm extends Form {
	private sources: SearchSource[] = [];
	private loading = true;
	private error?: string;

	override formWillAppear(): void {
		void this.loadSources();
	}

	override getSections(): FormSectionElement<unknown>[] {
		if (this.loading) {
			return [statusSection('status', 'Loading enabled sources...')];
		}

		if (this.error) {
			return [statusSection('status', this.error)];
		}

		const sources = this.sources;

		if (sources.length === 0) {
			return [statusSection('status', 'No enabled sources found.')];
		}

		return [
			EditSection('sourceOrder', {
				id: 'sourceOrder',
				header: 'Search Priority',
				footer: 'Sources higher in the list have greater search priority.',
				items: sources.map((source) =>
					LabelRow(`source_${source.id}`, {
						title: `${source.extensionName} — ${getLanguageName(source.lang)}`,
						subtitle: source.displayName,
					}),
				),
				allowReorder: true,
				onReorder: Application.Selector(this as SearchSourceOrderForm, 'onReorder'),
			}),
		];
	}

	async onReorder(fromIndex: number, toIndex: number): Promise<void> {
		const sources = [...this.sources];

		if (
			fromIndex < 0 ||
			fromIndex >= sources.length ||
			toIndex < 0 ||
			toIndex >= sources.length
		) {
			return;
		}

		const [moved] = sources.splice(fromIndex, 1);

		if (moved === undefined) {
			return;
		}

		sources.splice(toIndex, 0, moved);

		// Preserve saved positions for disabled sources.
		const reorderedIds = sources.map((source) => source.id);
		const enabledIds = new Set(reorderedIds);

		const savedOrder = config.searchSourceOrder.map((id) =>
			enabledIds.has(id) ? reorderedIds.shift()! : id,
		);

		config.searchSourceOrder = [...savedOrder, ...reorderedIds];
		this.sources = sources;

		this.reloadForm();
	}

	private async loadSources(): Promise<void> {
		this.loading = true;
		this.error = undefined;
		this.reloadForm();

		try {
			this.sources = await getEnabledSearchSources();
		} catch (error) {
			this.error = error instanceof Error ? error.message : 'Failed to load enabled sources.';
		} finally {
			this.loading = false;
			this.reloadForm();
		}
	}
}
