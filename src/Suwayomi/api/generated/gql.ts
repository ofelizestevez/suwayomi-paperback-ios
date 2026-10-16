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
    "mutation ChapterPages($chapterId: Int!) {\n  fetchChapterPages(input: {chapterId: $chapterId}) {\n    chapter {\n      mangaId\n      sourceOrder\n    }\n    pages\n  }\n}": typeof types.ChapterPagesDocument,
    "query ExtensionDetails($pkgName: String!) {\n  extension(pkgName: $pkgName) {\n    ...EXTENSION_DETAILS\n  }\n}": typeof types.ExtensionDetailsDocument,
    "query Extensions {\n  extensions {\n    nodes {\n      pkgName\n      name\n      lang\n      versionName\n      isInstalled\n      hasUpdate\n      isObsolete\n    }\n    totalCount\n    pageInfo {\n      hasNextPage\n    }\n  }\n}": typeof types.ExtensionsDocument,
    "fragment MANGA_FIELDS on MangaType {\n  id\n  title\n  description\n  thumbnailUrl\n  author\n  artist\n  status\n  genre\n  initialized\n  lastFetchedAt\n}\n\nfragment CHAPTER_FIELDS on ChapterType {\n  id\n  mangaId\n  name\n  chapterNumber\n  sourceOrder\n  uploadDate\n  scanlator\n}\n\nfragment EXTENSION_DETAILS on ExtensionType {\n  pkgName\n  name\n  lang\n  versionName\n  isInstalled\n  hasUpdate\n  isObsolete\n  source {\n    nodes {\n      ...SOURCE_DETAILS\n    }\n  }\n}\n\nfragment SOURCE_DETAILS on SourceType {\n  id\n  displayName\n  lang\n  contentWarning\n  isConfigurable\n  supportsLatest\n}\n\nfragment SOURCE_PREFERENCE on Preference {\n  type: __typename\n  ... on CheckBoxPreference {\n    key\n    title\n    summary\n    enabled\n    visible\n    booleanValue: currentValue\n    booleanDefault: default\n  }\n  ... on SwitchPreference {\n    key\n    title\n    summary\n    enabled\n    visible\n    booleanValue: currentValue\n    booleanDefault: default\n  }\n  ... on EditTextPreference {\n    key\n    title\n    summary\n    enabled\n    visible\n    stringValue: currentValue\n    stringDefault: default\n    dialogTitle\n    dialogMessage\n  }\n  ... on ListPreference {\n    key\n    title\n    summary\n    enabled\n    visible\n    entries\n    entryValues\n    stringValue: currentValue\n    stringDefault: default\n  }\n  ... on MultiSelectListPreference {\n    key\n    title\n    summary\n    enabled\n    visible\n    entries\n    entryValues\n    selectedValues: currentValue\n    defaultValues: default\n    dialogTitle\n    dialogMessage\n  }\n}": typeof types.Manga_FieldsFragmentDoc,
    "query InstalledExtensions {\n  extensions(condition: {isInstalled: true}) {\n    nodes {\n      pkgName\n      name\n      source {\n        nodes {\n          ...SOURCE_DETAILS\n        }\n      }\n    }\n  }\n}": typeof types.InstalledExtensionsDocument,
    "query LibraryCategories {\n  categories(order: [{by: ORDER, byType: ASC}]) {\n    nodes {\n      id\n      name\n    }\n  }\n}": typeof types.LibraryCategoriesDocument,
    "query LibraryCategoryManga($categoryId: Int!) {\n  category(id: $categoryId) {\n    mangas {\n      nodes {\n        ...MANGA_FIELDS\n      }\n      totalCount\n      pageInfo {\n        hasNextPage\n      }\n    }\n  }\n}": typeof types.LibraryCategoryMangaDocument,
    "mutation MangaChapters($mangaId: Int!) {\n  fetchMangaAndChapters(\n    input: {id: $mangaId, fetchManga: false, fetchChapters: true}\n  ) {\n    chapters {\n      ...CHAPTER_FIELDS\n    }\n    manga {\n      source {\n        lang\n      }\n    }\n  }\n}": typeof types.MangaChaptersDocument,
    "query MangaDetails($id: Int!) {\n  manga(id: $id) {\n    ...MANGA_FIELDS\n  }\n}": typeof types.MangaDetailsDocument,
    "query MangaProgress($mangaId: Int!) {\n  manga(id: $mangaId) {\n    source {\n      lang\n    }\n    lastReadChapter {\n      ...CHAPTER_FIELDS\n      isRead\n      lastReadAt\n    }\n  }\n}": typeof types.MangaProgressDocument,
    "mutation MarkChapterRead($chapterId: Int!) {\n  updateChapter(input: {id: $chapterId, patch: {isRead: true}}) {\n    chapter {\n      id\n      mangaId\n      isRead\n    }\n  }\n}": typeof types.MarkChapterReadDocument,
    "mutation RefreshExtensions {\n  fetchExtensions(input: {}) {\n    __typename\n  }\n}": typeof types.RefreshExtensionsDocument,
    "mutation RefreshMangaDetails($id: Int!) {\n  fetchMangaAndChapters(input: {id: $id, fetchManga: true, fetchChapters: false}) {\n    manga {\n      ...MANGA_FIELDS\n    }\n  }\n}": typeof types.RefreshMangaDetailsDocument,
    "mutation SearchSourceManga($sourceId: LongString!, $page: Int!, $query: String!, $filters: [FilterChangeInput!]) {\n  fetchSourceManga(\n    input: {source: $sourceId, page: $page, query: $query, type: SEARCH, filters: $filters}\n  ) {\n    hasNextPage\n    mangas {\n      id\n      title\n      thumbnailUrl\n    }\n  }\n}": typeof types.SearchSourceMangaDocument,
    "query ServerVersion {\n  aboutServer {\n    version\n  }\n}": typeof types.ServerVersionDocument,
    "query SourceDetails($sourceId: LongString!, $includePreferences: Boolean!) {\n  source(id: $sourceId) {\n    ...SOURCE_DETAILS\n    preferences @include(if: $includePreferences) {\n      ...SOURCE_PREFERENCE\n    }\n  }\n}": typeof types.SourceDetailsDocument,
    "fragment CHECKBOX_FIELDS on CheckBoxFilter {\n  type: __typename\n  CheckBoxFilterDefault: default\n  name\n}\n\nfragment HEADER_FIELDS on HeaderFilter {\n  type: __typename\n  name\n}\n\nfragment SELECT_FIELDS on SelectFilter {\n  type: __typename\n  SelectFilterDefault: default\n  name\n  values\n}\n\nfragment TRI_STATE_FIELDS on TriStateFilter {\n  type: __typename\n  TriStateFilterDefault: default\n  name\n}\n\nfragment TEXT_FIELDS on TextFilter {\n  type: __typename\n  TextFilterDefault: default\n  name\n}\n\nfragment SORT_FIELDS on SortFilter {\n  type: __typename\n  SortFilterDefault: default {\n    ascending\n    index\n    __typename\n  }\n  name\n  values\n}\n\nfragment SEPARATOR_FIELDS on SeparatorFilter {\n  type: __typename\n  name\n}\n\nfragment FILTER_FIELDS on Filter {\n  ...CHECKBOX_FIELDS\n  ...HEADER_FIELDS\n  ...SELECT_FIELDS\n  ...TRI_STATE_FIELDS\n  ...TEXT_FIELDS\n  ...SORT_FIELDS\n  ...SEPARATOR_FIELDS\n  ... on GroupFilter {\n    type: __typename\n    name\n  }\n}\n\nfragment FILTER_DEPTH_1 on Filter {\n  ...FILTER_FIELDS\n  ... on GroupFilter {\n    filters {\n      ...FILTER_FIELDS\n    }\n  }\n}\n\nfragment FILTER_DEPTH_2 on Filter {\n  ...FILTER_FIELDS\n  ... on GroupFilter {\n    filters {\n      ...FILTER_DEPTH_1\n    }\n  }\n}\n\nfragment FILTER_DEPTH_3 on Filter {\n  ...FILTER_FIELDS\n  ... on GroupFilter {\n    filters {\n      ...FILTER_DEPTH_2\n    }\n  }\n}\n\nquery SourceFilters($sourceId: LongString!) {\n  source(id: $sourceId) {\n    filters {\n      ...FILTER_DEPTH_3\n    }\n  }\n}": typeof types.Checkbox_FieldsFragmentDoc,
    "query SourceLanguages {\n  sources {\n    nodes {\n      lang\n    }\n  }\n}": typeof types.SourceLanguagesDocument,
    "mutation UpdateExtension($pkgName: String!, $patch: UpdateExtensionPatchInput!) {\n  updateExtension(input: {id: $pkgName, patch: $patch}) {\n    extension {\n      ...EXTENSION_DETAILS\n    }\n  }\n}": typeof types.UpdateExtensionDocument,
    "mutation UpdateMangasCategories($mangaIds: [Int!]!, $patch: UpdateMangaCategoriesPatchInput!) {\n  updateMangasCategories(input: {ids: $mangaIds, patch: $patch}) {\n    mangas {\n      id\n      categories {\n        nodes {\n          id\n        }\n      }\n    }\n  }\n}": typeof types.UpdateMangasCategoriesDocument,
    "mutation UpdateSourcePreference($sourceId: LongString!, $change: SourcePreferenceChangeInput!) {\n  updateSourcePreference(input: {source: $sourceId, change: $change}) {\n    preferences {\n      ...SOURCE_PREFERENCE\n    }\n  }\n}": typeof types.UpdateSourcePreferenceDocument,
};
const documents: Documents = {
    "mutation ChapterPages($chapterId: Int!) {\n  fetchChapterPages(input: {chapterId: $chapterId}) {\n    chapter {\n      mangaId\n      sourceOrder\n    }\n    pages\n  }\n}": types.ChapterPagesDocument,
    "query ExtensionDetails($pkgName: String!) {\n  extension(pkgName: $pkgName) {\n    ...EXTENSION_DETAILS\n  }\n}": types.ExtensionDetailsDocument,
    "query Extensions {\n  extensions {\n    nodes {\n      pkgName\n      name\n      lang\n      versionName\n      isInstalled\n      hasUpdate\n      isObsolete\n    }\n    totalCount\n    pageInfo {\n      hasNextPage\n    }\n  }\n}": types.ExtensionsDocument,
    "fragment MANGA_FIELDS on MangaType {\n  id\n  title\n  description\n  thumbnailUrl\n  author\n  artist\n  status\n  genre\n  initialized\n  lastFetchedAt\n}\n\nfragment CHAPTER_FIELDS on ChapterType {\n  id\n  mangaId\n  name\n  chapterNumber\n  sourceOrder\n  uploadDate\n  scanlator\n}\n\nfragment EXTENSION_DETAILS on ExtensionType {\n  pkgName\n  name\n  lang\n  versionName\n  isInstalled\n  hasUpdate\n  isObsolete\n  source {\n    nodes {\n      ...SOURCE_DETAILS\n    }\n  }\n}\n\nfragment SOURCE_DETAILS on SourceType {\n  id\n  displayName\n  lang\n  contentWarning\n  isConfigurable\n  supportsLatest\n}\n\nfragment SOURCE_PREFERENCE on Preference {\n  type: __typename\n  ... on CheckBoxPreference {\n    key\n    title\n    summary\n    enabled\n    visible\n    booleanValue: currentValue\n    booleanDefault: default\n  }\n  ... on SwitchPreference {\n    key\n    title\n    summary\n    enabled\n    visible\n    booleanValue: currentValue\n    booleanDefault: default\n  }\n  ... on EditTextPreference {\n    key\n    title\n    summary\n    enabled\n    visible\n    stringValue: currentValue\n    stringDefault: default\n    dialogTitle\n    dialogMessage\n  }\n  ... on ListPreference {\n    key\n    title\n    summary\n    enabled\n    visible\n    entries\n    entryValues\n    stringValue: currentValue\n    stringDefault: default\n  }\n  ... on MultiSelectListPreference {\n    key\n    title\n    summary\n    enabled\n    visible\n    entries\n    entryValues\n    selectedValues: currentValue\n    defaultValues: default\n    dialogTitle\n    dialogMessage\n  }\n}": types.Manga_FieldsFragmentDoc,
    "query InstalledExtensions {\n  extensions(condition: {isInstalled: true}) {\n    nodes {\n      pkgName\n      name\n      source {\n        nodes {\n          ...SOURCE_DETAILS\n        }\n      }\n    }\n  }\n}": types.InstalledExtensionsDocument,
    "query LibraryCategories {\n  categories(order: [{by: ORDER, byType: ASC}]) {\n    nodes {\n      id\n      name\n    }\n  }\n}": types.LibraryCategoriesDocument,
    "query LibraryCategoryManga($categoryId: Int!) {\n  category(id: $categoryId) {\n    mangas {\n      nodes {\n        ...MANGA_FIELDS\n      }\n      totalCount\n      pageInfo {\n        hasNextPage\n      }\n    }\n  }\n}": types.LibraryCategoryMangaDocument,
    "mutation MangaChapters($mangaId: Int!) {\n  fetchMangaAndChapters(\n    input: {id: $mangaId, fetchManga: false, fetchChapters: true}\n  ) {\n    chapters {\n      ...CHAPTER_FIELDS\n    }\n    manga {\n      source {\n        lang\n      }\n    }\n  }\n}": types.MangaChaptersDocument,
    "query MangaDetails($id: Int!) {\n  manga(id: $id) {\n    ...MANGA_FIELDS\n  }\n}": types.MangaDetailsDocument,
    "query MangaProgress($mangaId: Int!) {\n  manga(id: $mangaId) {\n    source {\n      lang\n    }\n    lastReadChapter {\n      ...CHAPTER_FIELDS\n      isRead\n      lastReadAt\n    }\n  }\n}": types.MangaProgressDocument,
    "mutation MarkChapterRead($chapterId: Int!) {\n  updateChapter(input: {id: $chapterId, patch: {isRead: true}}) {\n    chapter {\n      id\n      mangaId\n      isRead\n    }\n  }\n}": types.MarkChapterReadDocument,
    "mutation RefreshExtensions {\n  fetchExtensions(input: {}) {\n    __typename\n  }\n}": types.RefreshExtensionsDocument,
    "mutation RefreshMangaDetails($id: Int!) {\n  fetchMangaAndChapters(input: {id: $id, fetchManga: true, fetchChapters: false}) {\n    manga {\n      ...MANGA_FIELDS\n    }\n  }\n}": types.RefreshMangaDetailsDocument,
    "mutation SearchSourceManga($sourceId: LongString!, $page: Int!, $query: String!, $filters: [FilterChangeInput!]) {\n  fetchSourceManga(\n    input: {source: $sourceId, page: $page, query: $query, type: SEARCH, filters: $filters}\n  ) {\n    hasNextPage\n    mangas {\n      id\n      title\n      thumbnailUrl\n    }\n  }\n}": types.SearchSourceMangaDocument,
    "query ServerVersion {\n  aboutServer {\n    version\n  }\n}": types.ServerVersionDocument,
    "query SourceDetails($sourceId: LongString!, $includePreferences: Boolean!) {\n  source(id: $sourceId) {\n    ...SOURCE_DETAILS\n    preferences @include(if: $includePreferences) {\n      ...SOURCE_PREFERENCE\n    }\n  }\n}": types.SourceDetailsDocument,
    "fragment CHECKBOX_FIELDS on CheckBoxFilter {\n  type: __typename\n  CheckBoxFilterDefault: default\n  name\n}\n\nfragment HEADER_FIELDS on HeaderFilter {\n  type: __typename\n  name\n}\n\nfragment SELECT_FIELDS on SelectFilter {\n  type: __typename\n  SelectFilterDefault: default\n  name\n  values\n}\n\nfragment TRI_STATE_FIELDS on TriStateFilter {\n  type: __typename\n  TriStateFilterDefault: default\n  name\n}\n\nfragment TEXT_FIELDS on TextFilter {\n  type: __typename\n  TextFilterDefault: default\n  name\n}\n\nfragment SORT_FIELDS on SortFilter {\n  type: __typename\n  SortFilterDefault: default {\n    ascending\n    index\n    __typename\n  }\n  name\n  values\n}\n\nfragment SEPARATOR_FIELDS on SeparatorFilter {\n  type: __typename\n  name\n}\n\nfragment FILTER_FIELDS on Filter {\n  ...CHECKBOX_FIELDS\n  ...HEADER_FIELDS\n  ...SELECT_FIELDS\n  ...TRI_STATE_FIELDS\n  ...TEXT_FIELDS\n  ...SORT_FIELDS\n  ...SEPARATOR_FIELDS\n  ... on GroupFilter {\n    type: __typename\n    name\n  }\n}\n\nfragment FILTER_DEPTH_1 on Filter {\n  ...FILTER_FIELDS\n  ... on GroupFilter {\n    filters {\n      ...FILTER_FIELDS\n    }\n  }\n}\n\nfragment FILTER_DEPTH_2 on Filter {\n  ...FILTER_FIELDS\n  ... on GroupFilter {\n    filters {\n      ...FILTER_DEPTH_1\n    }\n  }\n}\n\nfragment FILTER_DEPTH_3 on Filter {\n  ...FILTER_FIELDS\n  ... on GroupFilter {\n    filters {\n      ...FILTER_DEPTH_2\n    }\n  }\n}\n\nquery SourceFilters($sourceId: LongString!) {\n  source(id: $sourceId) {\n    filters {\n      ...FILTER_DEPTH_3\n    }\n  }\n}": types.Checkbox_FieldsFragmentDoc,
    "query SourceLanguages {\n  sources {\n    nodes {\n      lang\n    }\n  }\n}": types.SourceLanguagesDocument,
    "mutation UpdateExtension($pkgName: String!, $patch: UpdateExtensionPatchInput!) {\n  updateExtension(input: {id: $pkgName, patch: $patch}) {\n    extension {\n      ...EXTENSION_DETAILS\n    }\n  }\n}": types.UpdateExtensionDocument,
    "mutation UpdateMangasCategories($mangaIds: [Int!]!, $patch: UpdateMangaCategoriesPatchInput!) {\n  updateMangasCategories(input: {ids: $mangaIds, patch: $patch}) {\n    mangas {\n      id\n      categories {\n        nodes {\n          id\n        }\n      }\n    }\n  }\n}": types.UpdateMangasCategoriesDocument,
    "mutation UpdateSourcePreference($sourceId: LongString!, $change: SourcePreferenceChangeInput!) {\n  updateSourcePreference(input: {source: $sourceId, change: $change}) {\n    preferences {\n      ...SOURCE_PREFERENCE\n    }\n  }\n}": types.UpdateSourcePreferenceDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ChapterPages($chapterId: Int!) {\n  fetchChapterPages(input: {chapterId: $chapterId}) {\n    chapter {\n      mangaId\n      sourceOrder\n    }\n    pages\n  }\n}"): typeof import('./graphql').ChapterPagesDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ExtensionDetails($pkgName: String!) {\n  extension(pkgName: $pkgName) {\n    ...EXTENSION_DETAILS\n  }\n}"): typeof import('./graphql').ExtensionDetailsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Extensions {\n  extensions {\n    nodes {\n      pkgName\n      name\n      lang\n      versionName\n      isInstalled\n      hasUpdate\n      isObsolete\n    }\n    totalCount\n    pageInfo {\n      hasNextPage\n    }\n  }\n}"): typeof import('./graphql').ExtensionsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment MANGA_FIELDS on MangaType {\n  id\n  title\n  description\n  thumbnailUrl\n  author\n  artist\n  status\n  genre\n  initialized\n  lastFetchedAt\n}\n\nfragment CHAPTER_FIELDS on ChapterType {\n  id\n  mangaId\n  name\n  chapterNumber\n  sourceOrder\n  uploadDate\n  scanlator\n}\n\nfragment EXTENSION_DETAILS on ExtensionType {\n  pkgName\n  name\n  lang\n  versionName\n  isInstalled\n  hasUpdate\n  isObsolete\n  source {\n    nodes {\n      ...SOURCE_DETAILS\n    }\n  }\n}\n\nfragment SOURCE_DETAILS on SourceType {\n  id\n  displayName\n  lang\n  contentWarning\n  isConfigurable\n  supportsLatest\n}\n\nfragment SOURCE_PREFERENCE on Preference {\n  type: __typename\n  ... on CheckBoxPreference {\n    key\n    title\n    summary\n    enabled\n    visible\n    booleanValue: currentValue\n    booleanDefault: default\n  }\n  ... on SwitchPreference {\n    key\n    title\n    summary\n    enabled\n    visible\n    booleanValue: currentValue\n    booleanDefault: default\n  }\n  ... on EditTextPreference {\n    key\n    title\n    summary\n    enabled\n    visible\n    stringValue: currentValue\n    stringDefault: default\n    dialogTitle\n    dialogMessage\n  }\n  ... on ListPreference {\n    key\n    title\n    summary\n    enabled\n    visible\n    entries\n    entryValues\n    stringValue: currentValue\n    stringDefault: default\n  }\n  ... on MultiSelectListPreference {\n    key\n    title\n    summary\n    enabled\n    visible\n    entries\n    entryValues\n    selectedValues: currentValue\n    defaultValues: default\n    dialogTitle\n    dialogMessage\n  }\n}"): typeof import('./graphql').Manga_FieldsFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query InstalledExtensions {\n  extensions(condition: {isInstalled: true}) {\n    nodes {\n      pkgName\n      name\n      source {\n        nodes {\n          ...SOURCE_DETAILS\n        }\n      }\n    }\n  }\n}"): typeof import('./graphql').InstalledExtensionsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query LibraryCategories {\n  categories(order: [{by: ORDER, byType: ASC}]) {\n    nodes {\n      id\n      name\n    }\n  }\n}"): typeof import('./graphql').LibraryCategoriesDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query LibraryCategoryManga($categoryId: Int!) {\n  category(id: $categoryId) {\n    mangas {\n      nodes {\n        ...MANGA_FIELDS\n      }\n      totalCount\n      pageInfo {\n        hasNextPage\n      }\n    }\n  }\n}"): typeof import('./graphql').LibraryCategoryMangaDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation MangaChapters($mangaId: Int!) {\n  fetchMangaAndChapters(\n    input: {id: $mangaId, fetchManga: false, fetchChapters: true}\n  ) {\n    chapters {\n      ...CHAPTER_FIELDS\n    }\n    manga {\n      source {\n        lang\n      }\n    }\n  }\n}"): typeof import('./graphql').MangaChaptersDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query MangaDetails($id: Int!) {\n  manga(id: $id) {\n    ...MANGA_FIELDS\n  }\n}"): typeof import('./graphql').MangaDetailsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query MangaProgress($mangaId: Int!) {\n  manga(id: $mangaId) {\n    source {\n      lang\n    }\n    lastReadChapter {\n      ...CHAPTER_FIELDS\n      isRead\n      lastReadAt\n    }\n  }\n}"): typeof import('./graphql').MangaProgressDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation MarkChapterRead($chapterId: Int!) {\n  updateChapter(input: {id: $chapterId, patch: {isRead: true}}) {\n    chapter {\n      id\n      mangaId\n      isRead\n    }\n  }\n}"): typeof import('./graphql').MarkChapterReadDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation RefreshExtensions {\n  fetchExtensions(input: {}) {\n    __typename\n  }\n}"): typeof import('./graphql').RefreshExtensionsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation RefreshMangaDetails($id: Int!) {\n  fetchMangaAndChapters(input: {id: $id, fetchManga: true, fetchChapters: false}) {\n    manga {\n      ...MANGA_FIELDS\n    }\n  }\n}"): typeof import('./graphql').RefreshMangaDetailsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation SearchSourceManga($sourceId: LongString!, $page: Int!, $query: String!, $filters: [FilterChangeInput!]) {\n  fetchSourceManga(\n    input: {source: $sourceId, page: $page, query: $query, type: SEARCH, filters: $filters}\n  ) {\n    hasNextPage\n    mangas {\n      id\n      title\n      thumbnailUrl\n    }\n  }\n}"): typeof import('./graphql').SearchSourceMangaDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ServerVersion {\n  aboutServer {\n    version\n  }\n}"): typeof import('./graphql').ServerVersionDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query SourceDetails($sourceId: LongString!, $includePreferences: Boolean!) {\n  source(id: $sourceId) {\n    ...SOURCE_DETAILS\n    preferences @include(if: $includePreferences) {\n      ...SOURCE_PREFERENCE\n    }\n  }\n}"): typeof import('./graphql').SourceDetailsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment CHECKBOX_FIELDS on CheckBoxFilter {\n  type: __typename\n  CheckBoxFilterDefault: default\n  name\n}\n\nfragment HEADER_FIELDS on HeaderFilter {\n  type: __typename\n  name\n}\n\nfragment SELECT_FIELDS on SelectFilter {\n  type: __typename\n  SelectFilterDefault: default\n  name\n  values\n}\n\nfragment TRI_STATE_FIELDS on TriStateFilter {\n  type: __typename\n  TriStateFilterDefault: default\n  name\n}\n\nfragment TEXT_FIELDS on TextFilter {\n  type: __typename\n  TextFilterDefault: default\n  name\n}\n\nfragment SORT_FIELDS on SortFilter {\n  type: __typename\n  SortFilterDefault: default {\n    ascending\n    index\n    __typename\n  }\n  name\n  values\n}\n\nfragment SEPARATOR_FIELDS on SeparatorFilter {\n  type: __typename\n  name\n}\n\nfragment FILTER_FIELDS on Filter {\n  ...CHECKBOX_FIELDS\n  ...HEADER_FIELDS\n  ...SELECT_FIELDS\n  ...TRI_STATE_FIELDS\n  ...TEXT_FIELDS\n  ...SORT_FIELDS\n  ...SEPARATOR_FIELDS\n  ... on GroupFilter {\n    type: __typename\n    name\n  }\n}\n\nfragment FILTER_DEPTH_1 on Filter {\n  ...FILTER_FIELDS\n  ... on GroupFilter {\n    filters {\n      ...FILTER_FIELDS\n    }\n  }\n}\n\nfragment FILTER_DEPTH_2 on Filter {\n  ...FILTER_FIELDS\n  ... on GroupFilter {\n    filters {\n      ...FILTER_DEPTH_1\n    }\n  }\n}\n\nfragment FILTER_DEPTH_3 on Filter {\n  ...FILTER_FIELDS\n  ... on GroupFilter {\n    filters {\n      ...FILTER_DEPTH_2\n    }\n  }\n}\n\nquery SourceFilters($sourceId: LongString!) {\n  source(id: $sourceId) {\n    filters {\n      ...FILTER_DEPTH_3\n    }\n  }\n}"): typeof import('./graphql').Checkbox_FieldsFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query SourceLanguages {\n  sources {\n    nodes {\n      lang\n    }\n  }\n}"): typeof import('./graphql').SourceLanguagesDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateExtension($pkgName: String!, $patch: UpdateExtensionPatchInput!) {\n  updateExtension(input: {id: $pkgName, patch: $patch}) {\n    extension {\n      ...EXTENSION_DETAILS\n    }\n  }\n}"): typeof import('./graphql').UpdateExtensionDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateMangasCategories($mangaIds: [Int!]!, $patch: UpdateMangaCategoriesPatchInput!) {\n  updateMangasCategories(input: {ids: $mangaIds, patch: $patch}) {\n    mangas {\n      id\n      categories {\n        nodes {\n          id\n        }\n      }\n    }\n  }\n}"): typeof import('./graphql').UpdateMangasCategoriesDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateSourcePreference($sourceId: LongString!, $change: SourcePreferenceChangeInput!) {\n  updateSourcePreference(input: {source: $sourceId, change: $change}) {\n    preferences {\n      ...SOURCE_PREFERENCE\n    }\n  }\n}"): typeof import('./graphql').UpdateSourcePreferenceDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
