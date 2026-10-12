import type {
	Chapter,
	ChapterDetails,
	ChapterReadActionQueueProcessingResult,
	ExtensionImpl,
	Form,
	ManagedCollection,
	ManagedCollectionChangeset,
	MangaProgress,
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
} from './api/generated/graphql';
import { toChapter } from './api/mappers/chapter';
import { toSourceManga } from './api/mappers/manga';
import { config } from './config';
import { ProgressManagementForm } from './forms/progress_management';
import { SettingsForm } from './forms/settings';
import type SuwayomiConfig from './pbconfig';

export class SuwayomiExtension implements ExtensionImpl<typeof SuwayomiConfig> {
	async initialise(): Promise<void> {}

	async getSettingsForm(): Promise<Form> {
		return new SettingsForm();
	}

	async getMangaDetails(mangaId: string): Promise<SourceManga> {
		const id = Number(mangaId);

		if (!Number.isSafeInteger(id) || id < 0) {
			throw new Error(`Invalid manga ID: ${mangaId}`);
		}

		const serverUrl = config.serverUrl;

		const result = await executeGraphQL(serverUrl, MangaDetailsDocument, {
			id,
		});

		return toSourceManga(result.manga, serverUrl);
	}

	async getManagedLibraryCollections(): Promise<ManagedCollection[]> {
		const result = await executeGraphQL(config.serverUrl, LibraryCategoriesDocument);

		return result.categories.nodes.map((category) => ({
			id: String(category.id),
			title: category.name || 'Default',
		}));
	}

	commitManagedCollectionChanges(changeset: ManagedCollectionChangeset): Promise<void> {
		throw new Error('Method not implemented.');
	}

	async getSourceMangaInManagedCollection(
		managedCollection: ManagedCollection,
	): Promise<SourceManga[]> {
		const categoryId = Number(managedCollection.id);

		const result = await executeGraphQL(config.serverUrl, LibraryCategoryMangaDocument, {
			categoryId,
		});

		const { nodes, totalCount, pageInfo } = result.category.mangas;

		if (pageInfo.hasNextPage || nodes.length < totalCount) {
			throw new Error(`Incomplete category: received ${nodes.length} of ${totalCount} manga`);
		}

		return nodes.map((manga) => toSourceManga(manga, config.serverUrl));
	}

	async getChapters(sourceManga: SourceManga): Promise<Chapter[]> {
		const mangaId = Number(sourceManga.mangaId);

		const result = await executeGraphQL(config.serverUrl, MangaChaptersDocument, { mangaId });

		const data = result.fetchMangaAndChapters;

		if (!data) {
			throw new Error('Failed to retrieve manga chapters');
		}

		const { manga, chapters } = data;

		const langCode =
			manga.source?.lang && manga.source.lang !== 'all' ? manga.source.lang : 'und';
		return chapters.map((chapter) => toChapter(chapter, sourceManga, langCode));
	}

	async getChapterDetails(chapter: Chapter): Promise<ChapterDetails> {
		const chapterId = Number(chapter.chapterId);

		if (!Number.isSafeInteger(chapterId) || chapterId < 0) {
			throw new Error(`Invalid chapter ID: ${chapter.chapterId}`);
		}

		const result = await executeGraphQL(config.serverUrl, ChapterPagesDocument, { chapterId });

		const data = result.fetchChapterPages;

		if (!data) {
			throw new Error('Failed to retrieve chapter pages');
		}

		const { pages, chapter: chapterInfo } = data;

		if (pages.length === 0) {
			throw new Error('This chapter has no pages');
		}

		const baseUrl = config.serverUrl.trim().replace(/\/+$/, '');

		const imageUrls = pages.map(
			(_, index) =>
				`${baseUrl}/api/v1/manga/${chapterInfo.mangaId}/chapter/${chapterInfo.sourceOrder}/page/${index}`,
		);

		return {
			id: chapter.chapterId,
			mangaId: chapter.sourceManga.mangaId,
			type: 'images',
			pages: imageUrls,
		};
	}

	// processTitlesForUpdates?(updateManager: UpdateManager, lastUpdateDate?: Date): Promise<void> {
	//     throw new Error("Method not implemented.");
	// }
	// processTitlesForUpdates?(updateManager: UpdateManager, lastUpdateDate?: Date): Promise<void> {
	//     throw new Error("Method not implemented.");
	// }

	async getMangaProgressManagementForm(sourceManga: SourceManga): Promise<Form> {
		return new ProgressManagementForm();
	}

	async getMangaProgress(sourceManga: SourceManga): Promise<MangaProgress | undefined> {
		const mangaId = Number(sourceManga.mangaId);

		const result = await executeGraphQL(config.serverUrl, MangaProgressDocument, { mangaId });

		const { source, lastReadChapter } = result.manga;

		if (!lastReadChapter || !lastReadChapter.isRead) {
			return undefined;
		}

		const langCode = source?.lang && source.lang !== 'all' ? source.lang : 'und';

		const timestamp = Number(lastReadChapter.lastReadAt);

		return {
			sourceManga,
			lastReadChapter: toChapter(lastReadChapter, sourceManga, langCode),
			lastReadTime:
				Number.isFinite(timestamp) && timestamp > 0 ? new Date(timestamp) : undefined,
		};
	}

	async processChapterReadActionQueue(
		actions: TrackedMangaChapterReadAction[],
	): Promise<ChapterReadActionQueueProcessingResult> {
		const successfulItems: string[] = [];
		const failedItems: string[] = [];

		for (const action of actions) {
			try {
				const chapterId = Number(action.chapterId);
				const mangaId = Number(action.sourceManga.mangaId);

				if (
					!Number.isSafeInteger(chapterId) ||
					!Number.isSafeInteger(mangaId) ||
					chapterId < 0 ||
					mangaId < 0
				) {
					throw new Error('Invalid chapter or manga ID');
				}

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
}
