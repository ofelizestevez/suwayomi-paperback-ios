/* eslint-disable */
/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import type { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type MangaStatus =
  | 'CANCELLED'
  | 'COMPLETED'
  | 'LICENSED'
  | 'ONGOING'
  | 'ON_HIATUS'
  | 'PUBLISHING_FINISHED'
  | 'UNKNOWN';

export type ChapterPagesMutationVariables = Exact<{
  chapterId: number;
}>;


export type ChapterPagesMutation = { fetchChapterPages: { pages: Array<string>, chapter: { id: number, mangaId: number, sourceOrder: number, pageCount: number } } | null };

export type LibraryCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type LibraryCategoriesQuery = { categories: { nodes: Array<{ id: number, name: string, order: number, isDefaultCategory: boolean }> } };

export type LibraryCategoryMangaQueryVariables = Exact<{
  categoryId: number;
}>;


export type LibraryCategoryMangaQuery = { category: { id: number, name: string, mangas: { totalCount: number, nodes: Array<{ id: number, title: string, description: string | null, thumbnailUrl: string | null, author: string | null, artist: string | null, status: MangaStatus, url: string, realUrl: string | null, age: string | null, genre: Array<string>, source: { id: string, displayName: string } | null }>, pageInfo: { hasNextPage: boolean } } } };

export type MangaChaptersMutationVariables = Exact<{
  mangaId: number;
}>;


export type MangaChaptersMutation = { fetchMangaAndChapters: { chapters: Array<{ id: number, mangaId: number, name: string, chapterNumber: number, sourceOrder: number, uploadDate: string, scanlator: string | null }>, manga: { source: { lang: string } | null } } | null };

export type MangaDetailsQueryVariables = Exact<{
  id: number;
}>;


export type MangaDetailsQuery = { manga: { id: number, title: string, description: string | null, thumbnailUrl: string | null, author: string | null, artist: string | null, status: MangaStatus, url: string, realUrl: string | null, age: string | null, genre: Array<string>, source: { id: string, displayName: string } | null } };

export type MangaProgressQueryVariables = Exact<{
  mangaId: number;
}>;


export type MangaProgressQuery = { manga: { source: { lang: string } | null, lastReadChapter: { id: number, mangaId: number, name: string, chapterNumber: number, sourceOrder: number, uploadDate: string, scanlator: string | null, isRead: boolean, lastReadAt: string } | null } };

export type MarkChapterReadMutationVariables = Exact<{
  chapterId: number;
}>;


export type MarkChapterReadMutation = { updateChapter: { chapter: { id: number, mangaId: number, isRead: boolean } } | null };

export type ServerVersionQueryVariables = Exact<{ [key: string]: never; }>;


export type ServerVersionQuery = { aboutServer: { name: string, version: string } };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: NonNullable<DocumentTypeDecoration<TResult, TVariables>['__apiType']>;
  private value: string;
  public __meta__?: Record<string, any> | undefined;

  constructor(value: string, __meta__?: Record<string, any> | undefined) {
    super(value);
    this.value = value;
    this.__meta__ = __meta__;
  }

  override toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}

export const ChapterPagesDocument = new TypedDocumentString(`
    mutation ChapterPages($chapterId: Int!) {
  fetchChapterPages(input: { chapterId: $chapterId }) {
    chapter {
      id
      mangaId
      sourceOrder
      pageCount
    }
    pages
  }
}
    `) as unknown as TypedDocumentString<ChapterPagesMutation, ChapterPagesMutationVariables>;
export const LibraryCategoriesDocument = new TypedDocumentString(`
    query LibraryCategories {
  categories(order: [{ by: ORDER, byType: ASC }]) {
    nodes {
      id
      name
      order
      isDefaultCategory
    }
  }
}
    `) as unknown as TypedDocumentString<LibraryCategoriesQuery, LibraryCategoriesQueryVariables>;
export const LibraryCategoryMangaDocument = new TypedDocumentString(`
    query LibraryCategoryManga($categoryId: Int!) {
  category(id: $categoryId) {
    id
    name
    mangas {
      nodes {
        id
        title
        description
        thumbnailUrl
        author
        artist
        status
        url
        realUrl
        age
        genre
        source {
          id
          displayName
        }
      }
      totalCount
      pageInfo {
        hasNextPage
      }
    }
  }
}
    `) as unknown as TypedDocumentString<LibraryCategoryMangaQuery, LibraryCategoryMangaQueryVariables>;
export const MangaChaptersDocument = new TypedDocumentString(`
    mutation MangaChapters($mangaId: Int!) {
  fetchMangaAndChapters(
    input: { id: $mangaId, fetchManga: false, fetchChapters: true }
  ) {
    chapters {
      id
      mangaId
      name
      chapterNumber
      sourceOrder
      uploadDate
      scanlator
    }
    manga {
      source {
        lang
      }
    }
  }
}
    `) as unknown as TypedDocumentString<MangaChaptersMutation, MangaChaptersMutationVariables>;
export const MangaDetailsDocument = new TypedDocumentString(`
    query MangaDetails($id: Int!) {
  manga(id: $id) {
    id
    title
    description
    thumbnailUrl
    author
    artist
    status
    url
    realUrl
    age
    genre
    source {
      id
      displayName
    }
  }
}
    `) as unknown as TypedDocumentString<MangaDetailsQuery, MangaDetailsQueryVariables>;
export const MangaProgressDocument = new TypedDocumentString(`
    query MangaProgress($mangaId: Int!) {
  manga(id: $mangaId) {
    source {
      lang
    }
    lastReadChapter {
      id
      mangaId
      name
      chapterNumber
      sourceOrder
      uploadDate
      scanlator
      isRead
      lastReadAt
    }
  }
}
    `) as unknown as TypedDocumentString<MangaProgressQuery, MangaProgressQueryVariables>;
export const MarkChapterReadDocument = new TypedDocumentString(`
    mutation MarkChapterRead($chapterId: Int!) {
  updateChapter(input: { id: $chapterId, patch: { isRead: true } }) {
    chapter {
      id
      mangaId
      isRead
    }
  }
}
    `) as unknown as TypedDocumentString<MarkChapterReadMutation, MarkChapterReadMutationVariables>;
export const ServerVersionDocument = new TypedDocumentString(`
    query ServerVersion {
  aboutServer {
    name
    version
  }
}
    `) as unknown as TypedDocumentString<ServerVersionQuery, ServerVersionQueryVariables>;