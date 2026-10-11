
import type { Chapter, SourceManga } from '@paperback/types'
import type { MangaChaptersMutation } from '../generated/graphql.js'

type SuwayomiChapter =
  NonNullable<
    MangaChaptersMutation['fetchMangaAndChapters']
  >['chapters'][number]

export function toChapter(
  chapter: SuwayomiChapter,
  sourceManga: SourceManga,
  langCode: string,
): Chapter {
  const uploadDate = Number(chapter.uploadDate)

  return {
    chapterId: String(chapter.id),
    sourceManga,
    langCode,
    chapNum: chapter.chapterNumber,
    title: chapter.name,
    sortingIndex: chapter.sourceOrder,

    publishDate:
      Number.isFinite(uploadDate) && uploadDate > 0
        ? new Date(uploadDate)
        : undefined,

    additionalInfo: chapter.scanlator
      ? { Scanlator: chapter.scanlator }
      : undefined,
  }
}
