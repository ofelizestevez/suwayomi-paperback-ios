import type { Chapter, SourceManga } from '@paperback/types';

import type { Chapter_FieldsFragment as SuwayomiChapter } from '../generated/graphql';

export function toChapter(
	chapter: SuwayomiChapter,
	sourceManga: SourceManga,
	langCode: string,
): Chapter {
	const uploadDateMs = Number(chapter.uploadDate);

	return {
		chapterId: String(chapter.id),
		sourceManga,
		langCode,
		chapNum: chapter.chapterNumber,
		title: chapter.name,
		sortingIndex: chapter.sourceOrder,

		publishDate:
			Number.isFinite(uploadDateMs) && uploadDateMs > 0 ? new Date(uploadDateMs) : undefined,

		additionalInfo: chapter.scanlator ? { Scanlator: chapter.scanlator } : undefined,
	};
}
