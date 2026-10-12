/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "mutation ChapterPages($chapterId: Int!) {\n  fetchChapterPages(input: {chapterId: $chapterId}) {\n    chapter {\n      id\n      mangaId\n      sourceOrder\n      pageCount\n    }\n    pages\n  }\n}": typeof types.ChapterPagesDocument,
    "query LibraryCategories {\n  categories(order: [{by: ORDER, byType: ASC}]) {\n    nodes {\n      id\n      name\n      order\n      isDefaultCategory\n    }\n  }\n}": typeof types.LibraryCategoriesDocument,
    "query LibraryCategoryManga($categoryId: Int!) {\n  category(id: $categoryId) {\n    id\n    name\n    mangas {\n      nodes {\n        id\n        title\n        description\n        thumbnailUrl\n        author\n        artist\n        status\n        url\n        realUrl\n        age\n        genre\n        source {\n          id\n          displayName\n        }\n      }\n      totalCount\n      pageInfo {\n        hasNextPage\n      }\n    }\n  }\n}": typeof types.LibraryCategoryMangaDocument,
    "mutation MangaChapters($mangaId: Int!) {\n  fetchMangaAndChapters(\n    input: {id: $mangaId, fetchManga: false, fetchChapters: true}\n  ) {\n    chapters {\n      id\n      mangaId\n      name\n      chapterNumber\n      sourceOrder\n      uploadDate\n      scanlator\n    }\n    manga {\n      source {\n        lang\n      }\n    }\n  }\n}": typeof types.MangaChaptersDocument,
    "query MangaDetails($id: Int!) {\n  manga(id: $id) {\n    id\n    title\n    description\n    thumbnailUrl\n    author\n    artist\n    status\n    url\n    realUrl\n    age\n    genre\n    source {\n      id\n      displayName\n    }\n  }\n}": typeof types.MangaDetailsDocument,
    "query MangaProgress($mangaId: Int!) {\n  manga(id: $mangaId) {\n    source {\n      lang\n    }\n    lastReadChapter {\n      id\n      mangaId\n      name\n      chapterNumber\n      sourceOrder\n      uploadDate\n      scanlator\n      isRead\n      lastReadAt\n    }\n  }\n}": typeof types.MangaProgressDocument,
    "mutation MarkChapterRead($chapterId: Int!) {\n  updateChapter(input: {id: $chapterId, patch: {isRead: true}}) {\n    chapter {\n      id\n      mangaId\n      isRead\n    }\n  }\n}": typeof types.MarkChapterReadDocument,
    "query ServerVersion {\n  aboutServer {\n    name\n    version\n  }\n}": typeof types.ServerVersionDocument,
    "query SourceLanguages {\n  sources {\n    nodes {\n      id\n      lang\n    }\n  }\n}": typeof types.SourceLanguagesDocument,
};
const documents: Documents = {
    "mutation ChapterPages($chapterId: Int!) {\n  fetchChapterPages(input: {chapterId: $chapterId}) {\n    chapter {\n      id\n      mangaId\n      sourceOrder\n      pageCount\n    }\n    pages\n  }\n}": types.ChapterPagesDocument,
    "query LibraryCategories {\n  categories(order: [{by: ORDER, byType: ASC}]) {\n    nodes {\n      id\n      name\n      order\n      isDefaultCategory\n    }\n  }\n}": types.LibraryCategoriesDocument,
    "query LibraryCategoryManga($categoryId: Int!) {\n  category(id: $categoryId) {\n    id\n    name\n    mangas {\n      nodes {\n        id\n        title\n        description\n        thumbnailUrl\n        author\n        artist\n        status\n        url\n        realUrl\n        age\n        genre\n        source {\n          id\n          displayName\n        }\n      }\n      totalCount\n      pageInfo {\n        hasNextPage\n      }\n    }\n  }\n}": types.LibraryCategoryMangaDocument,
    "mutation MangaChapters($mangaId: Int!) {\n  fetchMangaAndChapters(\n    input: {id: $mangaId, fetchManga: false, fetchChapters: true}\n  ) {\n    chapters {\n      id\n      mangaId\n      name\n      chapterNumber\n      sourceOrder\n      uploadDate\n      scanlator\n    }\n    manga {\n      source {\n        lang\n      }\n    }\n  }\n}": types.MangaChaptersDocument,
    "query MangaDetails($id: Int!) {\n  manga(id: $id) {\n    id\n    title\n    description\n    thumbnailUrl\n    author\n    artist\n    status\n    url\n    realUrl\n    age\n    genre\n    source {\n      id\n      displayName\n    }\n  }\n}": types.MangaDetailsDocument,
    "query MangaProgress($mangaId: Int!) {\n  manga(id: $mangaId) {\n    source {\n      lang\n    }\n    lastReadChapter {\n      id\n      mangaId\n      name\n      chapterNumber\n      sourceOrder\n      uploadDate\n      scanlator\n      isRead\n      lastReadAt\n    }\n  }\n}": types.MangaProgressDocument,
    "mutation MarkChapterRead($chapterId: Int!) {\n  updateChapter(input: {id: $chapterId, patch: {isRead: true}}) {\n    chapter {\n      id\n      mangaId\n      isRead\n    }\n  }\n}": types.MarkChapterReadDocument,
    "query ServerVersion {\n  aboutServer {\n    name\n    version\n  }\n}": types.ServerVersionDocument,
    "query SourceLanguages {\n  sources {\n    nodes {\n      id\n      lang\n    }\n  }\n}": types.SourceLanguagesDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ChapterPages($chapterId: Int!) {\n  fetchChapterPages(input: {chapterId: $chapterId}) {\n    chapter {\n      id\n      mangaId\n      sourceOrder\n      pageCount\n    }\n    pages\n  }\n}"): typeof import('./graphql').ChapterPagesDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query LibraryCategories {\n  categories(order: [{by: ORDER, byType: ASC}]) {\n    nodes {\n      id\n      name\n      order\n      isDefaultCategory\n    }\n  }\n}"): typeof import('./graphql').LibraryCategoriesDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query LibraryCategoryManga($categoryId: Int!) {\n  category(id: $categoryId) {\n    id\n    name\n    mangas {\n      nodes {\n        id\n        title\n        description\n        thumbnailUrl\n        author\n        artist\n        status\n        url\n        realUrl\n        age\n        genre\n        source {\n          id\n          displayName\n        }\n      }\n      totalCount\n      pageInfo {\n        hasNextPage\n      }\n    }\n  }\n}"): typeof import('./graphql').LibraryCategoryMangaDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation MangaChapters($mangaId: Int!) {\n  fetchMangaAndChapters(\n    input: {id: $mangaId, fetchManga: false, fetchChapters: true}\n  ) {\n    chapters {\n      id\n      mangaId\n      name\n      chapterNumber\n      sourceOrder\n      uploadDate\n      scanlator\n    }\n    manga {\n      source {\n        lang\n      }\n    }\n  }\n}"): typeof import('./graphql').MangaChaptersDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query MangaDetails($id: Int!) {\n  manga(id: $id) {\n    id\n    title\n    description\n    thumbnailUrl\n    author\n    artist\n    status\n    url\n    realUrl\n    age\n    genre\n    source {\n      id\n      displayName\n    }\n  }\n}"): typeof import('./graphql').MangaDetailsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query MangaProgress($mangaId: Int!) {\n  manga(id: $mangaId) {\n    source {\n      lang\n    }\n    lastReadChapter {\n      id\n      mangaId\n      name\n      chapterNumber\n      sourceOrder\n      uploadDate\n      scanlator\n      isRead\n      lastReadAt\n    }\n  }\n}"): typeof import('./graphql').MangaProgressDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation MarkChapterRead($chapterId: Int!) {\n  updateChapter(input: {id: $chapterId, patch: {isRead: true}}) {\n    chapter {\n      id\n      mangaId\n      isRead\n    }\n  }\n}"): typeof import('./graphql').MarkChapterReadDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ServerVersion {\n  aboutServer {\n    name\n    version\n  }\n}"): typeof import('./graphql').ServerVersionDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query SourceLanguages {\n  sources {\n    nodes {\n      id\n      lang\n    }\n  }\n}"): typeof import('./graphql').SourceLanguagesDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
