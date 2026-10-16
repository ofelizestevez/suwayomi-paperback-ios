import type {
	AdvancedSearchForm,
	Chapter,
	ChapterDetails,
	ChapterReadActionQueueProcessingResult,
	ExtensionImpl,
	Form,
	ManagedCollection,
	ManagedCollectionChangeset,
	MangaProgress,
	Metadata,
	PagedResults,
	SearchQuery,
	SearchResultItem,
	SortingOption,
	SourceManga,
	TrackedMangaChapterReadAction,
} from '@paperback/types';

import { executeGraphQL } from './api/client';
import {
	LibraryCategoriesDocument,
	LibraryCategoryMangaDocument,
	MangaDetailsDocument,
	MangaChaptersDocument,
	ChapterPagesDocument,
	MangaProgressDocument,
	MarkChapterReadDocument,
	SearchSourceMangaDocument,
	RefreshMangaDetailsDocument,
	UpdateMangasCategoriesDocument,
} from './api/generated/graphql';
import { toChapter } from './api/mappers/chapter';
import { toSourceManga } from './api/mappers/manga';
import { toFilterChanges } from './api/mappers/source_filters';
import { getEnabledSearchSources } from './api/utils/sources';
import { config } from './config';
import { ProgressManagementForm } from './forms/progress_management_form';
import { SearchOptionsForm } from './forms/search/search_options_form';
import { SettingsForm } from './forms/settings_form';
import type SuwayomiExtensionInfo from './pbconfig';
import { restoreFilterSelections, type FilterSelections } from './utils/filter_selections';
import { getChapterLanguageCode } from './utils/languages';
import type { SimpleSearchPageMetadata, SourceSearchPageMetadata } from './utils/search_metadata';
import { parseServerId } from './utils/server_id';
import { getMangaThumbnailUrl, normalizeServerUrl, resolveServerUrl } from './utils/url';

export class SuwayomiExtension implements ExtensionImpl<typeof SuwayomiExtensionInfo> {
	async initialise(): Promise<void> {}

	async getSettingsForm(): Promise<Form> {
		return new SettingsForm();
	}

	async getMangaDetails(mangaId: string): Promise<SourceManga> {
		const id = parseServerId(mangaId, 'manga');

		const serverUrl = config.serverUrl;
		const ONE_WEEK = 7 * 24 * 60 * 60 * 1000;

		const result = await executeGraphQL(serverUrl, MangaDetailsDocument, {
			id,
		});

		let manga = result.manga;

		const lastFetchedAtMs = Number(manga.lastFetchedAt ?? 0) * 1000;
		const isStale =
			!Number.isFinite(lastFetchedAtMs) ||
			lastFetchedAtMs <= 0 ||
			Date.now() - lastFetchedAtMs >= ONE_WEEK;

		if (!manga.initialized || isStale) {
			const refreshed = await executeGraphQL(serverUrl, RefreshMangaDetailsDocument, { id });
			const refreshedManga = refreshed.fetchMangaAndChapters?.manga;

			if (!refreshedManga) {
				throw new Error(`Failed to refresh manga details for ID ${id}`);
			}

			manga = refreshedManga;
		}

		return toSourceManga(manga, serverUrl);
	}

	async getManagedLibraryCollections(): Promise<ManagedCollection[]> {
		const result = await executeGraphQL(config.serverUrl, LibraryCategoriesDocument);

		return result.categories.nodes.map((category) => ({
			id: String(category.id),
			title: category.name || 'Default',
		}));
	}

	async commitManagedCollectionChanges(changeset: ManagedCollectionChangeset): Promise<void> {
		const serverUrl = config.serverUrl;

		const categoryId = parseServerId(changeset.collection.id, 'category');
		const additionIds = changeset.additions.map((manga) =>
			parseServerId(manga.mangaId, 'manga'),
		);
		const deletionIds = changeset.deletions.map((manga) =>
			parseServerId(manga.mangaId, 'manga'),
		);

		if (additionIds.length > 0) {
			await executeGraphQL(serverUrl, UpdateMangasCategoriesDocument, {
				mangaIds: additionIds,
				patch: { addToCategories: [categoryId] },
			});
		}

		if (deletionIds.length > 0) {
			await executeGraphQL(serverUrl, UpdateMangasCategoriesDocument, {
				mangaIds: deletionIds,
				patch: { removeFromCategories: [categoryId] },
			});
		}
	}

	async getSourceMangaInManagedCollection(
		managedCollection: ManagedCollection,
	): Promise<SourceManga[]> {
		const categoryId = parseServerId(managedCollection.id, 'category');

		const serverUrl = config.serverUrl;
		const result = await executeGraphQL(serverUrl, LibraryCategoryMangaDocument, {
			categoryId,
		});

		const { nodes, totalCount, pageInfo } = result.category.mangas;

		if (pageInfo.hasNextPage || nodes.length < totalCount) {
			throw new Error(`Incomplete category: received ${nodes.length} of ${totalCount} manga`);
		}

		return nodes.map((manga) => toSourceManga(manga, serverUrl));
	}

	async getChapters(sourceManga: SourceManga): Promise<Chapter[]> {
		const mangaId = parseServerId(sourceManga.mangaId, 'manga');

		const result = await executeGraphQL(config.serverUrl, MangaChaptersDocument, { mangaId });

		const data = result.fetchMangaAndChapters;

		if (!data) {
			throw new Error('Failed to retrieve manga chapters');
		}

		const { manga, chapters } = data;

		const langCode = getChapterLanguageCode(manga.source?.lang);
		return chapters.map((chapter) => toChapter(chapter, sourceManga, langCode));
	}

	async getChapterDetails(chapter: Chapter): Promise<ChapterDetails> {
		const chapterId = parseServerId(chapter.chapterId, 'chapter');

		const serverUrl = config.serverUrl;
		const result = await executeGraphQL(serverUrl, ChapterPagesDocument, { chapterId });

		const data = result.fetchChapterPages;

		if (!data) {
			throw new Error('Failed to retrieve chapter pages');
		}

		const { pages, chapter: chapterInfo } = data;

		if (pages.length === 0) {
			throw new Error('This chapter has no pages');
		}

		const imageUrls = pages.map((_, index) =>
			resolveServerUrl(
				serverUrl,
				`/api/v1/manga/${chapterInfo.mangaId}/chapter/${chapterInfo.sourceOrder}/page/${index}`,
			),
		);

		return {
			id: chapter.chapterId,
			mangaId: chapter.sourceManga.mangaId,
			type: 'images',
			pages: imageUrls,
		};
	}

	async getMangaProgressManagementForm(sourceManga: SourceManga): Promise<Form> {
		return new ProgressManagementForm();
	}

	async getMangaProgress(sourceManga: SourceManga): Promise<MangaProgress | undefined> {
		const mangaId = parseServerId(sourceManga.mangaId, 'manga');

		const result = await executeGraphQL(config.serverUrl, MangaProgressDocument, { mangaId });

		const { source, lastReadChapter } = result.manga;

		if (!lastReadChapter || !lastReadChapter.isRead) {
			return undefined;
		}

		const langCode = getChapterLanguageCode(source?.lang);

		const lastReadAtMs = Number(lastReadChapter.lastReadAt);

		return {
			sourceManga,
			lastReadChapter: toChapter(lastReadChapter, sourceManga, langCode),
			lastReadTime:
				Number.isFinite(lastReadAtMs) && lastReadAtMs > 0
					? new Date(lastReadAtMs)
					: undefined,
		};
	}

	async processChapterReadActionQueue(
		actions: TrackedMangaChapterReadAction[],
	): Promise<ChapterReadActionQueueProcessingResult> {
		const successfulItems: string[] = [];
		const failedItems: string[] = [];

		for (const action of actions) {
			try {
				const chapterId = parseServerId(action.chapterId, 'chapter');
				const mangaId = parseServerId(action.sourceManga.mangaId, 'manga');

				const result = await executeGraphQL(config.serverUrl, MarkChapterReadDocument, {
					chapterId,
				});

				const chapter = result.updateChapter?.chapter;

				if (chapter?.id !== chapterId || chapter.mangaId !== mangaId || !chapter.isRead) {
					throw new Error('Chapter read status was not confirmed');
				}

				successfulItems.push(action.id);
			} catch (error) {
				console.error(
					`[Suwayomi] Failed to sync chapter ${action.chapterId}`,
					error instanceof Error ? error.message : String(error),
				);

				failedItems.push(action.id);
			}
		}

		return {
			successfulItems,
			failedItems,
		};
	}

	async getSearchResults(
		query: SearchQuery<Metadata>,
		metadata: Metadata | undefined,
		_sortingOption: SortingOption | undefined,
	): Promise<PagedResults<SearchResultItem>> {
		const options = query.metadata;

		if (!options || typeof options !== 'object' || Array.isArray(options)) {
			return this.searchSimple(query.title, metadata);
		}

		if (options.searchModeSelection === undefined || options.searchModeSelection === 'simple') {
			return this.searchSimple(query.title, metadata);
		}

		if (options.searchModeSelection !== 'source') {
			throw new Error('Invalid search mode. Open search options and submit again.');
		}

		const sourceId = options.sourceId;

		if (typeof sourceId !== 'string' || !sourceId.trim()) {
			throw new Error('Select an enabled source before searching.');
		}

		const savedFilters = options.filterSelectionsBySource;

		if (
			savedFilters !== undefined &&
			(!savedFilters || typeof savedFilters !== 'object' || Array.isArray(savedFilters))
		) {
			throw new Error('Saved search filters are invalid. Start a new search.');
		}

		const selections = restoreFilterSelections(savedFilters?.[sourceId]);

		return this.searchSource(query.title, sourceId, selections, metadata);
	}

	private async searchSimple(
		title: string,
		metadata: Metadata | undefined,
	): Promise<PagedResults<SearchResultItem>> {
		function advanceSource(): void {
			sourceIndex++;
			if (sourceIndex >= sources.length) {
				sourceIndex = 0;
				page++;
			}
		}
		const serverUrl = normalizeServerUrl(config.serverUrl);

		const searchTerm = title.trim();
		if (!searchTerm) {
			return { items: [], metadata: undefined };
		}

		// Retrieve all enabled sources in their preferred order.
		const sources = await getEnabledSearchSources();

		const searchContext = JSON.stringify([
			'simple',
			serverUrl,
			searchTerm,
			sources.map((source) => source.id),
		]);

		const cursor = metadata as SimpleSearchPageMetadata | undefined;

		if (
			cursor &&
			(cursor.kind !== 'simple' ||
				cursor.searchContext !== searchContext ||
				!Array.isArray(cursor.exhaustedSourceIds) ||
				!cursor.exhaustedSourceIds.every((id) => typeof id === 'string') ||
				!Number.isInteger(cursor.sourceIndex) ||
				cursor.sourceIndex < 0 ||
				cursor.sourceIndex >= sources.length ||
				!Number.isInteger(cursor.page) ||
				cursor.page < 1 ||
				cursor.page > 2_147_483_647)
		) {
			throw new Error(
				'Search settings changed or pagination is invalid. Start a new search.',
			);
		}

		if (sources.length === 0) {
			console.warn('[Suwayomi][Search] No enabled sources available');
			return { items: [], metadata: undefined };
		}

		let sourceIndex = cursor?.sourceIndex ?? 0;
		let page = cursor?.page ?? 1;

		const exhaustedSources = new Set(cursor?.exhaustedSourceIds ?? []);

		// Continue until we find results or exhaust the sources.
		while (sources.some((source) => !exhaustedSources.has(source.id))) {
			const source = sources[sourceIndex];

			if (!source) {
				break;
			}

			// Skip sources that have no additional pages.
			if (exhaustedSources.has(source.id)) {
				advanceSource();
				continue;
			}

			let result;

			try {
				result = await executeGraphQL(serverUrl, SearchSourceMangaDocument, {
					sourceId: source.id,
					page,
					query: searchTerm,
				});
			} catch (error) {
				console.error(`[Suwayomi][Search] Request failed for ${source.displayName}`, error);
				throw error;
			}

			const data = result.fetchSourceManga;

			if (!data) {
				throw new Error(`No search response from ${source.displayName}`);
			}

			// Convert manga into Paperback search results.
			// map() preserves the order provided by Suwayomi.
			const items: SearchResultItem[] = data.mangas.map((manga) => ({
				mangaId: String(manga.id),
				title: manga.title,
				subtitle: `${source.extensionName} (${source.lang})`,
				imageUrl: getMangaThumbnailUrl(serverUrl, manga),
			}));

			// Track whether the current source has more pages.
			if (!data.hasNextPage) {
				exhaustedSources.add(source.id);
			}

			advanceSource();

			// Determine whether any sources still have results.
			const hasMoreSources = sources.some((source) => !exhaustedSources.has(source.id));

			const nextMetadata: SimpleSearchPageMetadata | undefined = hasMoreSources
				? {
						kind: 'simple',
						searchContext,
						sourceIndex,
						page,
						exhaustedSourceIds: [...exhaustedSources],
					}
				: undefined;

			if (items.length > 0) {
				return {
					items,
					metadata: nextMetadata,
				};
			}
		}

		return {
			items: [],
			metadata: undefined,
		};
	}

	private async searchSource(
		title: string,
		sourceId: string,
		selections: FilterSelections,
		metadata: Metadata | undefined,
	): Promise<PagedResults<SearchResultItem>> {
		const serverUrl = normalizeServerUrl(config.serverUrl);
		const searchTerm = title.trim();
		const filters = toFilterChanges(selections);

		const sources = await getEnabledSearchSources();
		const source = sources.find((source) => source.id === sourceId);

		if (!source) {
			throw new Error(
				'The selected source is no longer enabled or installed. Choose a source in search options.',
			);
		}

		const searchContext = JSON.stringify(['source', serverUrl, searchTerm, sourceId, filters]);

		const cursor = metadata as SourceSearchPageMetadata | undefined;

		if (
			cursor &&
			(cursor.kind !== 'source' ||
				cursor.searchContext !== searchContext ||
				!Number.isInteger(cursor.page) ||
				cursor.page < 1 ||
				cursor.page > 2_147_483_647)
		) {
			throw new Error(
				'Search settings changed or pagination is invalid. Start a new search.',
			);
		}

		let page = cursor?.page ?? 1;

		while (true) {
			const result = await executeGraphQL(serverUrl, SearchSourceMangaDocument, {
				sourceId,
				page,
				query: searchTerm,
				filters,
			});

			const data = result.fetchSourceManga;

			if (!data) {
				throw new Error(`No search response from ${source.displayName}`);
			}

			const items: SearchResultItem[] = data.mangas.map((manga) => ({
				mangaId: String(manga.id),
				title: manga.title,
				subtitle: `${source.extensionName} (${source.lang})`,
				imageUrl: getMangaThumbnailUrl(serverUrl, manga),
			}));

			const nextMetadata: SourceSearchPageMetadata | undefined = data.hasNextPage
				? {
						kind: 'source',
						searchContext,
						page: page + 1,
					}
				: undefined;

			if (items.length > 0 || !data.hasNextPage) {
				return {
					items,
					metadata: nextMetadata,
				};
			}

			page++;
		}
	}

	async getAdvancedSearchForm?(query: SearchQuery<Metadata>): Promise<AdvancedSearchForm> {
		return new SearchOptionsForm(query);
	}
}
