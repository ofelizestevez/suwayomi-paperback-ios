/* eslint-disable */
/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import type { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type ContentWarning =
  | 'MIXED'
  | 'NSFW'
  | 'SAFE';

export type FilterChangeInput = {
  checkBoxState?: boolean | null | undefined;
  groupChange?: FilterChangeInput | null | undefined;
  position: number;
  selectState?: number | null | undefined;
  sortState?: SortSelectionInput | null | undefined;
  textState?: string | null | undefined;
  triState?: TriState | null | undefined;
};

export type MangaStatus =
  | 'CANCELLED'
  | 'COMPLETED'
  | 'LICENSED'
  | 'ONGOING'
  | 'ON_HIATUS'
  | 'PUBLISHING_FINISHED'
  | 'UNKNOWN';

export type SortSelectionInput = {
  ascending: boolean;
  index: number;
};

export type SourcePreferenceChangeInput = {
  checkBoxState?: boolean | null | undefined;
  editTextState?: string | null | undefined;
  listState?: string | null | undefined;
  multiSelectState?: Array<string> | null | undefined;
  position: number;
  switchState?: boolean | null | undefined;
};

export type TriState =
  | 'EXCLUDE'
  | 'IGNORE'
  | 'INCLUDE';

export type UpdateExtensionPatchInput = {
  install?: boolean | null | undefined;
  uninstall?: boolean | null | undefined;
  update?: boolean | null | undefined;
};

export type UpdateMangaCategoriesPatchInput = {
  addToCategories?: Array<number> | null | undefined;
  clearCategories?: boolean | null | undefined;
  removeFromCategories?: Array<number> | null | undefined;
};

export type ChapterPagesMutationVariables = Exact<{
  chapterId: number;
}>;


export type ChapterPagesMutation = { fetchChapterPages: { pages: Array<string>, chapter: { mangaId: number, sourceOrder: number } } | null };

export type ExtensionDetailsQueryVariables = Exact<{
  pkgName: string;
}>;


export type ExtensionDetailsQuery = { extension: { pkgName: string, name: string, lang: string, versionName: string, isInstalled: boolean, hasUpdate: boolean, isObsolete: boolean, source: { nodes: Array<{ id: string, displayName: string, lang: string, contentWarning: ContentWarning, isConfigurable: boolean, supportsLatest: boolean }> } } };

export type ExtensionsQueryVariables = Exact<{ [key: string]: never; }>;


export type ExtensionsQuery = { extensions: { totalCount: number, nodes: Array<{ pkgName: string, name: string, lang: string, versionName: string, isInstalled: boolean, hasUpdate: boolean, isObsolete: boolean }>, pageInfo: { hasNextPage: boolean } } };

export type Manga_FieldsFragment = { id: number, title: string, description: string | null, thumbnailUrl: string | null, author: string | null, artist: string | null, status: MangaStatus, genre: Array<string>, initialized: boolean, lastFetchedAt: string | null };

export type Chapter_FieldsFragment = { id: number, mangaId: number, name: string, chapterNumber: number, sourceOrder: number, uploadDate: string, scanlator: string | null };

export type Extension_DetailsFragment = { pkgName: string, name: string, lang: string, versionName: string, isInstalled: boolean, hasUpdate: boolean, isObsolete: boolean, source: { nodes: Array<{ id: string, displayName: string, lang: string, contentWarning: ContentWarning, isConfigurable: boolean, supportsLatest: boolean }> } };

export type Source_DetailsFragment = { id: string, displayName: string, lang: string, contentWarning: ContentWarning, isConfigurable: boolean, supportsLatest: boolean };

type Source_Preference_CheckBoxPreference_Fragment = { key: string | null, title: string | null, summary: string | null, enabled: boolean, visible: boolean, booleanValue: boolean | null, booleanDefault: boolean, type: 'CheckBoxPreference' };

type Source_Preference_EditTextPreference_Fragment = { key: string | null, title: string | null, summary: string | null, enabled: boolean, visible: boolean, dialogTitle: string | null, dialogMessage: string | null, stringValue: string | null, stringDefault: string | null, type: 'EditTextPreference' };

type Source_Preference_ListPreference_Fragment = { key: string | null, title: string | null, summary: string | null, enabled: boolean, visible: boolean, entries: Array<string>, entryValues: Array<string>, stringValue: string | null, stringDefault: string | null, type: 'ListPreference' };

type Source_Preference_MultiSelectListPreference_Fragment = { key: string | null, title: string | null, summary: string | null, enabled: boolean, visible: boolean, entries: Array<string>, entryValues: Array<string>, dialogTitle: string | null, dialogMessage: string | null, selectedValues: Array<string> | null, defaultValues: Array<string> | null, type: 'MultiSelectListPreference' };

type Source_Preference_SwitchPreference_Fragment = { key: string | null, title: string | null, summary: string | null, enabled: boolean, visible: boolean, booleanValue: boolean | null, booleanDefault: boolean, type: 'SwitchPreference' };

export type Source_PreferenceFragment =
  | Source_Preference_CheckBoxPreference_Fragment
  | Source_Preference_EditTextPreference_Fragment
  | Source_Preference_ListPreference_Fragment
  | Source_Preference_MultiSelectListPreference_Fragment
  | Source_Preference_SwitchPreference_Fragment
;

export type InstalledExtensionsQueryVariables = Exact<{ [key: string]: never; }>;


export type InstalledExtensionsQuery = { extensions: { nodes: Array<{ pkgName: string, name: string, source: { nodes: Array<{ id: string, displayName: string, lang: string, contentWarning: ContentWarning, isConfigurable: boolean, supportsLatest: boolean }> } }> } };

export type LibraryCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type LibraryCategoriesQuery = { categories: { nodes: Array<{ id: number, name: string }> } };

export type LibraryCategoryMangaQueryVariables = Exact<{
  categoryId: number;
}>;


export type LibraryCategoryMangaQuery = { category: { mangas: { totalCount: number, nodes: Array<{ id: number, title: string, description: string | null, thumbnailUrl: string | null, author: string | null, artist: string | null, status: MangaStatus, genre: Array<string>, initialized: boolean, lastFetchedAt: string | null }>, pageInfo: { hasNextPage: boolean } } } };

export type MangaChaptersMutationVariables = Exact<{
  mangaId: number;
}>;


export type MangaChaptersMutation = { fetchMangaAndChapters: { chapters: Array<{ id: number, mangaId: number, name: string, chapterNumber: number, sourceOrder: number, uploadDate: string, scanlator: string | null }>, manga: { source: { lang: string } | null } } | null };

export type MangaDetailsQueryVariables = Exact<{
  id: number;
}>;


export type MangaDetailsQuery = { manga: { id: number, title: string, description: string | null, thumbnailUrl: string | null, author: string | null, artist: string | null, status: MangaStatus, genre: Array<string>, initialized: boolean, lastFetchedAt: string | null } };

export type MangaProgressQueryVariables = Exact<{
  mangaId: number;
}>;


export type MangaProgressQuery = { manga: { source: { lang: string } | null, lastReadChapter: { isRead: boolean, lastReadAt: string, id: number, mangaId: number, name: string, chapterNumber: number, sourceOrder: number, uploadDate: string, scanlator: string | null } | null } };

export type MarkChapterReadMutationVariables = Exact<{
  chapterId: number;
}>;


export type MarkChapterReadMutation = { updateChapter: { chapter: { id: number, mangaId: number, isRead: boolean } } | null };

export type RefreshExtensionsMutationVariables = Exact<{ [key: string]: never; }>;


export type RefreshExtensionsMutation = { fetchExtensions: { __typename: 'FetchExtensionsPayload' } | null };

export type RefreshMangaDetailsMutationVariables = Exact<{
  id: number;
}>;


export type RefreshMangaDetailsMutation = { fetchMangaAndChapters: { manga: { id: number, title: string, description: string | null, thumbnailUrl: string | null, author: string | null, artist: string | null, status: MangaStatus, genre: Array<string>, initialized: boolean, lastFetchedAt: string | null } } | null };

export type SearchSourceMangaMutationVariables = Exact<{
  sourceId: string;
  page: number;
  query: string;
  filters?: Array<FilterChangeInput> | FilterChangeInput | null | undefined;
}>;


export type SearchSourceMangaMutation = { fetchSourceManga: { hasNextPage: boolean, mangas: Array<{ id: number, title: string, thumbnailUrl: string | null }> } | null };

export type ServerVersionQueryVariables = Exact<{ [key: string]: never; }>;


export type ServerVersionQuery = { aboutServer: { version: string } };

export type SourceDetailsQueryVariables = Exact<{
  sourceId: string;
  includePreferences: boolean;
}>;


export type SourceDetailsQuery = { source: { id: string, displayName: string, lang: string, contentWarning: ContentWarning, isConfigurable: boolean, supportsLatest: boolean, preferences?: Array<
      | { key: string | null, title: string | null, summary: string | null, enabled: boolean, visible: boolean, booleanValue: boolean | null, booleanDefault: boolean, type: 'CheckBoxPreference' }
      | { key: string | null, title: string | null, summary: string | null, enabled: boolean, visible: boolean, dialogTitle: string | null, dialogMessage: string | null, stringValue: string | null, stringDefault: string | null, type: 'EditTextPreference' }
      | { key: string | null, title: string | null, summary: string | null, enabled: boolean, visible: boolean, entries: Array<string>, entryValues: Array<string>, stringValue: string | null, stringDefault: string | null, type: 'ListPreference' }
      | { key: string | null, title: string | null, summary: string | null, enabled: boolean, visible: boolean, entries: Array<string>, entryValues: Array<string>, dialogTitle: string | null, dialogMessage: string | null, selectedValues: Array<string> | null, defaultValues: Array<string> | null, type: 'MultiSelectListPreference' }
      | { key: string | null, title: string | null, summary: string | null, enabled: boolean, visible: boolean, booleanValue: boolean | null, booleanDefault: boolean, type: 'SwitchPreference' }
    > } };

export type Checkbox_FieldsFragment = { name: string, type: 'CheckBoxFilter', CheckBoxFilterDefault: boolean };

export type Header_FieldsFragment = { name: string, type: 'HeaderFilter' };

export type Select_FieldsFragment = { name: string, values: Array<string>, type: 'SelectFilter', SelectFilterDefault: number };

export type Tri_State_FieldsFragment = { name: string, type: 'TriStateFilter', TriStateFilterDefault: TriState };

export type Text_FieldsFragment = { name: string, type: 'TextFilter', TextFilterDefault: string };

export type Sort_FieldsFragment = { name: string, values: Array<string>, type: 'SortFilter', SortFilterDefault: { __typename: 'SortSelection', ascending: boolean, index: number } | null };

export type Separator_FieldsFragment = { name: string, type: 'SeparatorFilter' };

type Filter_Fields_CheckBoxFilter_Fragment = { name: string, type: 'CheckBoxFilter', CheckBoxFilterDefault: boolean };

type Filter_Fields_GroupFilter_Fragment = { name: string, type: 'GroupFilter' };

type Filter_Fields_HeaderFilter_Fragment = { name: string, type: 'HeaderFilter' };

type Filter_Fields_SelectFilter_Fragment = { name: string, values: Array<string>, type: 'SelectFilter', SelectFilterDefault: number };

type Filter_Fields_SeparatorFilter_Fragment = { name: string, type: 'SeparatorFilter' };

type Filter_Fields_SortFilter_Fragment = { name: string, values: Array<string>, type: 'SortFilter', SortFilterDefault: { __typename: 'SortSelection', ascending: boolean, index: number } | null };

type Filter_Fields_TextFilter_Fragment = { name: string, type: 'TextFilter', TextFilterDefault: string };

type Filter_Fields_TriStateFilter_Fragment = { name: string, type: 'TriStateFilter', TriStateFilterDefault: TriState };

export type Filter_FieldsFragment =
  | Filter_Fields_CheckBoxFilter_Fragment
  | Filter_Fields_GroupFilter_Fragment
  | Filter_Fields_HeaderFilter_Fragment
  | Filter_Fields_SelectFilter_Fragment
  | Filter_Fields_SeparatorFilter_Fragment
  | Filter_Fields_SortFilter_Fragment
  | Filter_Fields_TextFilter_Fragment
  | Filter_Fields_TriStateFilter_Fragment
;

type Filter_Depth_1_CheckBoxFilter_Fragment = { name: string, type: 'CheckBoxFilter', CheckBoxFilterDefault: boolean };

type Filter_Depth_1_GroupFilter_Fragment = { name: string, type: 'GroupFilter', filters: Array<
    | { name: string, type: 'CheckBoxFilter', CheckBoxFilterDefault: boolean }
    | { name: string, type: 'GroupFilter' }
    | { name: string, type: 'HeaderFilter' }
    | { name: string, values: Array<string>, type: 'SelectFilter', SelectFilterDefault: number }
    | { name: string, type: 'SeparatorFilter' }
    | { name: string, values: Array<string>, type: 'SortFilter', SortFilterDefault: { __typename: 'SortSelection', ascending: boolean, index: number } | null }
    | { name: string, type: 'TextFilter', TextFilterDefault: string }
    | { name: string, type: 'TriStateFilter', TriStateFilterDefault: TriState }
  > };

type Filter_Depth_1_HeaderFilter_Fragment = { name: string, type: 'HeaderFilter' };

type Filter_Depth_1_SelectFilter_Fragment = { name: string, values: Array<string>, type: 'SelectFilter', SelectFilterDefault: number };

type Filter_Depth_1_SeparatorFilter_Fragment = { name: string, type: 'SeparatorFilter' };

type Filter_Depth_1_SortFilter_Fragment = { name: string, values: Array<string>, type: 'SortFilter', SortFilterDefault: { __typename: 'SortSelection', ascending: boolean, index: number } | null };

type Filter_Depth_1_TextFilter_Fragment = { name: string, type: 'TextFilter', TextFilterDefault: string };

type Filter_Depth_1_TriStateFilter_Fragment = { name: string, type: 'TriStateFilter', TriStateFilterDefault: TriState };

export type Filter_Depth_1Fragment =
  | Filter_Depth_1_CheckBoxFilter_Fragment
  | Filter_Depth_1_GroupFilter_Fragment
  | Filter_Depth_1_HeaderFilter_Fragment
  | Filter_Depth_1_SelectFilter_Fragment
  | Filter_Depth_1_SeparatorFilter_Fragment
  | Filter_Depth_1_SortFilter_Fragment
  | Filter_Depth_1_TextFilter_Fragment
  | Filter_Depth_1_TriStateFilter_Fragment
;

type Filter_Depth_2_CheckBoxFilter_Fragment = { name: string, type: 'CheckBoxFilter', CheckBoxFilterDefault: boolean };

type Filter_Depth_2_GroupFilter_Fragment = { name: string, type: 'GroupFilter', filters: Array<
    | { name: string, type: 'CheckBoxFilter', CheckBoxFilterDefault: boolean }
    | { name: string, type: 'GroupFilter', filters: Array<
        | { name: string, type: 'CheckBoxFilter', CheckBoxFilterDefault: boolean }
        | { name: string, type: 'GroupFilter' }
        | { name: string, type: 'HeaderFilter' }
        | { name: string, values: Array<string>, type: 'SelectFilter', SelectFilterDefault: number }
        | { name: string, type: 'SeparatorFilter' }
        | { name: string, values: Array<string>, type: 'SortFilter', SortFilterDefault: { __typename: 'SortSelection', ascending: boolean, index: number } | null }
        | { name: string, type: 'TextFilter', TextFilterDefault: string }
        | { name: string, type: 'TriStateFilter', TriStateFilterDefault: TriState }
      > }
    | { name: string, type: 'HeaderFilter' }
    | { name: string, values: Array<string>, type: 'SelectFilter', SelectFilterDefault: number }
    | { name: string, type: 'SeparatorFilter' }
    | { name: string, values: Array<string>, type: 'SortFilter', SortFilterDefault: { __typename: 'SortSelection', ascending: boolean, index: number } | null }
    | { name: string, type: 'TextFilter', TextFilterDefault: string }
    | { name: string, type: 'TriStateFilter', TriStateFilterDefault: TriState }
  > };

type Filter_Depth_2_HeaderFilter_Fragment = { name: string, type: 'HeaderFilter' };

type Filter_Depth_2_SelectFilter_Fragment = { name: string, values: Array<string>, type: 'SelectFilter', SelectFilterDefault: number };

type Filter_Depth_2_SeparatorFilter_Fragment = { name: string, type: 'SeparatorFilter' };

type Filter_Depth_2_SortFilter_Fragment = { name: string, values: Array<string>, type: 'SortFilter', SortFilterDefault: { __typename: 'SortSelection', ascending: boolean, index: number } | null };

type Filter_Depth_2_TextFilter_Fragment = { name: string, type: 'TextFilter', TextFilterDefault: string };

type Filter_Depth_2_TriStateFilter_Fragment = { name: string, type: 'TriStateFilter', TriStateFilterDefault: TriState };

export type Filter_Depth_2Fragment =
  | Filter_Depth_2_CheckBoxFilter_Fragment
  | Filter_Depth_2_GroupFilter_Fragment
  | Filter_Depth_2_HeaderFilter_Fragment
  | Filter_Depth_2_SelectFilter_Fragment
  | Filter_Depth_2_SeparatorFilter_Fragment
  | Filter_Depth_2_SortFilter_Fragment
  | Filter_Depth_2_TextFilter_Fragment
  | Filter_Depth_2_TriStateFilter_Fragment
;

type Filter_Depth_3_CheckBoxFilter_Fragment = { name: string, type: 'CheckBoxFilter', CheckBoxFilterDefault: boolean };

type Filter_Depth_3_GroupFilter_Fragment = { name: string, type: 'GroupFilter', filters: Array<
    | { name: string, type: 'CheckBoxFilter', CheckBoxFilterDefault: boolean }
    | { name: string, type: 'GroupFilter', filters: Array<
        | { name: string, type: 'CheckBoxFilter', CheckBoxFilterDefault: boolean }
        | { name: string, type: 'GroupFilter', filters: Array<
            | { name: string, type: 'CheckBoxFilter', CheckBoxFilterDefault: boolean }
            | { name: string, type: 'GroupFilter' }
            | { name: string, type: 'HeaderFilter' }
            | { name: string, values: Array<string>, type: 'SelectFilter', SelectFilterDefault: number }
            | { name: string, type: 'SeparatorFilter' }
            | { name: string, values: Array<string>, type: 'SortFilter', SortFilterDefault: { __typename: 'SortSelection', ascending: boolean, index: number } | null }
            | { name: string, type: 'TextFilter', TextFilterDefault: string }
            | { name: string, type: 'TriStateFilter', TriStateFilterDefault: TriState }
          > }
        | { name: string, type: 'HeaderFilter' }
        | { name: string, values: Array<string>, type: 'SelectFilter', SelectFilterDefault: number }
        | { name: string, type: 'SeparatorFilter' }
        | { name: string, values: Array<string>, type: 'SortFilter', SortFilterDefault: { __typename: 'SortSelection', ascending: boolean, index: number } | null }
        | { name: string, type: 'TextFilter', TextFilterDefault: string }
        | { name: string, type: 'TriStateFilter', TriStateFilterDefault: TriState }
      > }
    | { name: string, type: 'HeaderFilter' }
    | { name: string, values: Array<string>, type: 'SelectFilter', SelectFilterDefault: number }
    | { name: string, type: 'SeparatorFilter' }
    | { name: string, values: Array<string>, type: 'SortFilter', SortFilterDefault: { __typename: 'SortSelection', ascending: boolean, index: number } | null }
    | { name: string, type: 'TextFilter', TextFilterDefault: string }
    | { name: string, type: 'TriStateFilter', TriStateFilterDefault: TriState }
  > };

type Filter_Depth_3_HeaderFilter_Fragment = { name: string, type: 'HeaderFilter' };

type Filter_Depth_3_SelectFilter_Fragment = { name: string, values: Array<string>, type: 'SelectFilter', SelectFilterDefault: number };

type Filter_Depth_3_SeparatorFilter_Fragment = { name: string, type: 'SeparatorFilter' };

type Filter_Depth_3_SortFilter_Fragment = { name: string, values: Array<string>, type: 'SortFilter', SortFilterDefault: { __typename: 'SortSelection', ascending: boolean, index: number } | null };

type Filter_Depth_3_TextFilter_Fragment = { name: string, type: 'TextFilter', TextFilterDefault: string };

type Filter_Depth_3_TriStateFilter_Fragment = { name: string, type: 'TriStateFilter', TriStateFilterDefault: TriState };

export type Filter_Depth_3Fragment =
  | Filter_Depth_3_CheckBoxFilter_Fragment
  | Filter_Depth_3_GroupFilter_Fragment
  | Filter_Depth_3_HeaderFilter_Fragment
  | Filter_Depth_3_SelectFilter_Fragment
  | Filter_Depth_3_SeparatorFilter_Fragment
  | Filter_Depth_3_SortFilter_Fragment
  | Filter_Depth_3_TextFilter_Fragment
  | Filter_Depth_3_TriStateFilter_Fragment
;

export type SourceFiltersQueryVariables = Exact<{
  sourceId: string;
}>;


export type SourceFiltersQuery = { source: { filters: Array<
      | { name: string, type: 'CheckBoxFilter', CheckBoxFilterDefault: boolean }
      | { name: string, type: 'GroupFilter', filters: Array<
          | { name: string, type: 'CheckBoxFilter', CheckBoxFilterDefault: boolean }
          | { name: string, type: 'GroupFilter', filters: Array<
              | { name: string, type: 'CheckBoxFilter', CheckBoxFilterDefault: boolean }
              | { name: string, type: 'GroupFilter', filters: Array<
                  | { name: string, type: 'CheckBoxFilter', CheckBoxFilterDefault: boolean }
                  | { name: string, type: 'GroupFilter' }
                  | { name: string, type: 'HeaderFilter' }
                  | { name: string, values: Array<string>, type: 'SelectFilter', SelectFilterDefault: number }
                  | { name: string, type: 'SeparatorFilter' }
                  | { name: string, values: Array<string>, type: 'SortFilter', SortFilterDefault: { __typename: 'SortSelection', ascending: boolean, index: number } | null }
                  | { name: string, type: 'TextFilter', TextFilterDefault: string }
                  | { name: string, type: 'TriStateFilter', TriStateFilterDefault: TriState }
                > }
              | { name: string, type: 'HeaderFilter' }
              | { name: string, values: Array<string>, type: 'SelectFilter', SelectFilterDefault: number }
              | { name: string, type: 'SeparatorFilter' }
              | { name: string, values: Array<string>, type: 'SortFilter', SortFilterDefault: { __typename: 'SortSelection', ascending: boolean, index: number } | null }
              | { name: string, type: 'TextFilter', TextFilterDefault: string }
              | { name: string, type: 'TriStateFilter', TriStateFilterDefault: TriState }
            > }
          | { name: string, type: 'HeaderFilter' }
          | { name: string, values: Array<string>, type: 'SelectFilter', SelectFilterDefault: number }
          | { name: string, type: 'SeparatorFilter' }
          | { name: string, values: Array<string>, type: 'SortFilter', SortFilterDefault: { __typename: 'SortSelection', ascending: boolean, index: number } | null }
          | { name: string, type: 'TextFilter', TextFilterDefault: string }
          | { name: string, type: 'TriStateFilter', TriStateFilterDefault: TriState }
        > }
      | { name: string, type: 'HeaderFilter' }
      | { name: string, values: Array<string>, type: 'SelectFilter', SelectFilterDefault: number }
      | { name: string, type: 'SeparatorFilter' }
      | { name: string, values: Array<string>, type: 'SortFilter', SortFilterDefault: { __typename: 'SortSelection', ascending: boolean, index: number } | null }
      | { name: string, type: 'TextFilter', TextFilterDefault: string }
      | { name: string, type: 'TriStateFilter', TriStateFilterDefault: TriState }
    > } };

export type SourceLanguagesQueryVariables = Exact<{ [key: string]: never; }>;


export type SourceLanguagesQuery = { sources: { nodes: Array<{ lang: string }> } };

export type UpdateExtensionMutationVariables = Exact<{
  pkgName: string;
  patch: UpdateExtensionPatchInput;
}>;


export type UpdateExtensionMutation = { updateExtension: { extension: { pkgName: string, name: string, lang: string, versionName: string, isInstalled: boolean, hasUpdate: boolean, isObsolete: boolean, source: { nodes: Array<{ id: string, displayName: string, lang: string, contentWarning: ContentWarning, isConfigurable: boolean, supportsLatest: boolean }> } } | null } | null };

export type UpdateMangasCategoriesMutationVariables = Exact<{
  mangaIds: Array<number> | number;
  patch: UpdateMangaCategoriesPatchInput;
}>;


export type UpdateMangasCategoriesMutation = { updateMangasCategories: { mangas: Array<{ id: number, categories: { nodes: Array<{ id: number }> } }> } | null };

export type UpdateSourcePreferenceMutationVariables = Exact<{
  sourceId: string;
  change: SourcePreferenceChangeInput;
}>;


export type UpdateSourcePreferenceMutation = { updateSourcePreference: { preferences: Array<
      | { key: string | null, title: string | null, summary: string | null, enabled: boolean, visible: boolean, booleanValue: boolean | null, booleanDefault: boolean, type: 'CheckBoxPreference' }
      | { key: string | null, title: string | null, summary: string | null, enabled: boolean, visible: boolean, dialogTitle: string | null, dialogMessage: string | null, stringValue: string | null, stringDefault: string | null, type: 'EditTextPreference' }
      | { key: string | null, title: string | null, summary: string | null, enabled: boolean, visible: boolean, entries: Array<string>, entryValues: Array<string>, stringValue: string | null, stringDefault: string | null, type: 'ListPreference' }
      | { key: string | null, title: string | null, summary: string | null, enabled: boolean, visible: boolean, entries: Array<string>, entryValues: Array<string>, dialogTitle: string | null, dialogMessage: string | null, selectedValues: Array<string> | null, defaultValues: Array<string> | null, type: 'MultiSelectListPreference' }
      | { key: string | null, title: string | null, summary: string | null, enabled: boolean, visible: boolean, booleanValue: boolean | null, booleanDefault: boolean, type: 'SwitchPreference' }
    > } | null };

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
export const Manga_FieldsFragmentDoc = new TypedDocumentString(`
    fragment MANGA_FIELDS on MangaType {
  id
  title
  description
  thumbnailUrl
  author
  artist
  status
  genre
  initialized
  lastFetchedAt
}
    `, {"fragmentName":"MANGA_FIELDS"}) as unknown as TypedDocumentString<Manga_FieldsFragment, unknown>;
export const Chapter_FieldsFragmentDoc = new TypedDocumentString(`
    fragment CHAPTER_FIELDS on ChapterType {
  id
  mangaId
  name
  chapterNumber
  sourceOrder
  uploadDate
  scanlator
}
    `, {"fragmentName":"CHAPTER_FIELDS"}) as unknown as TypedDocumentString<Chapter_FieldsFragment, unknown>;
export const Source_DetailsFragmentDoc = new TypedDocumentString(`
    fragment SOURCE_DETAILS on SourceType {
  id
  displayName
  lang
  contentWarning
  isConfigurable
  supportsLatest
}
    `, {"fragmentName":"SOURCE_DETAILS"}) as unknown as TypedDocumentString<Source_DetailsFragment, unknown>;
export const Extension_DetailsFragmentDoc = new TypedDocumentString(`
    fragment EXTENSION_DETAILS on ExtensionType {
  pkgName
  name
  lang
  versionName
  isInstalled
  hasUpdate
  isObsolete
  source {
    nodes {
      ...SOURCE_DETAILS
    }
  }
}
    fragment SOURCE_DETAILS on SourceType {
  id
  displayName
  lang
  contentWarning
  isConfigurable
  supportsLatest
}`, {"fragmentName":"EXTENSION_DETAILS"}) as unknown as TypedDocumentString<Extension_DetailsFragment, unknown>;
export const Source_PreferenceFragmentDoc = new TypedDocumentString(`
    fragment SOURCE_PREFERENCE on Preference {
  type: __typename
  ... on CheckBoxPreference {
    key
    title
    summary
    enabled
    visible
    booleanValue: currentValue
    booleanDefault: default
  }
  ... on SwitchPreference {
    key
    title
    summary
    enabled
    visible
    booleanValue: currentValue
    booleanDefault: default
  }
  ... on EditTextPreference {
    key
    title
    summary
    enabled
    visible
    stringValue: currentValue
    stringDefault: default
    dialogTitle
    dialogMessage
  }
  ... on ListPreference {
    key
    title
    summary
    enabled
    visible
    entries
    entryValues
    stringValue: currentValue
    stringDefault: default
  }
  ... on MultiSelectListPreference {
    key
    title
    summary
    enabled
    visible
    entries
    entryValues
    selectedValues: currentValue
    defaultValues: default
    dialogTitle
    dialogMessage
  }
}
    `, {"fragmentName":"SOURCE_PREFERENCE"}) as unknown as TypedDocumentString<Source_PreferenceFragment, unknown>;
export const Checkbox_FieldsFragmentDoc = new TypedDocumentString(`
    fragment CHECKBOX_FIELDS on CheckBoxFilter {
  type: __typename
  CheckBoxFilterDefault: default
  name
}
    `, {"fragmentName":"CHECKBOX_FIELDS"}) as unknown as TypedDocumentString<Checkbox_FieldsFragment, unknown>;
export const Header_FieldsFragmentDoc = new TypedDocumentString(`
    fragment HEADER_FIELDS on HeaderFilter {
  type: __typename
  name
}
    `, {"fragmentName":"HEADER_FIELDS"}) as unknown as TypedDocumentString<Header_FieldsFragment, unknown>;
export const Select_FieldsFragmentDoc = new TypedDocumentString(`
    fragment SELECT_FIELDS on SelectFilter {
  type: __typename
  SelectFilterDefault: default
  name
  values
}
    `, {"fragmentName":"SELECT_FIELDS"}) as unknown as TypedDocumentString<Select_FieldsFragment, unknown>;
export const Tri_State_FieldsFragmentDoc = new TypedDocumentString(`
    fragment TRI_STATE_FIELDS on TriStateFilter {
  type: __typename
  TriStateFilterDefault: default
  name
}
    `, {"fragmentName":"TRI_STATE_FIELDS"}) as unknown as TypedDocumentString<Tri_State_FieldsFragment, unknown>;
export const Text_FieldsFragmentDoc = new TypedDocumentString(`
    fragment TEXT_FIELDS on TextFilter {
  type: __typename
  TextFilterDefault: default
  name
}
    `, {"fragmentName":"TEXT_FIELDS"}) as unknown as TypedDocumentString<Text_FieldsFragment, unknown>;
export const Sort_FieldsFragmentDoc = new TypedDocumentString(`
    fragment SORT_FIELDS on SortFilter {
  type: __typename
  SortFilterDefault: default {
    ascending
    index
    __typename
  }
  name
  values
}
    `, {"fragmentName":"SORT_FIELDS"}) as unknown as TypedDocumentString<Sort_FieldsFragment, unknown>;
export const Separator_FieldsFragmentDoc = new TypedDocumentString(`
    fragment SEPARATOR_FIELDS on SeparatorFilter {
  type: __typename
  name
}
    `, {"fragmentName":"SEPARATOR_FIELDS"}) as unknown as TypedDocumentString<Separator_FieldsFragment, unknown>;
export const Filter_FieldsFragmentDoc = new TypedDocumentString(`
    fragment FILTER_FIELDS on Filter {
  ...CHECKBOX_FIELDS
  ...HEADER_FIELDS
  ...SELECT_FIELDS
  ...TRI_STATE_FIELDS
  ...TEXT_FIELDS
  ...SORT_FIELDS
  ...SEPARATOR_FIELDS
  ... on GroupFilter {
    type: __typename
    name
  }
}
    fragment CHECKBOX_FIELDS on CheckBoxFilter {
  type: __typename
  CheckBoxFilterDefault: default
  name
}
fragment HEADER_FIELDS on HeaderFilter {
  type: __typename
  name
}
fragment SELECT_FIELDS on SelectFilter {
  type: __typename
  SelectFilterDefault: default
  name
  values
}
fragment TRI_STATE_FIELDS on TriStateFilter {
  type: __typename
  TriStateFilterDefault: default
  name
}
fragment TEXT_FIELDS on TextFilter {
  type: __typename
  TextFilterDefault: default
  name
}
fragment SORT_FIELDS on SortFilter {
  type: __typename
  SortFilterDefault: default {
    ascending
    index
    __typename
  }
  name
  values
}
fragment SEPARATOR_FIELDS on SeparatorFilter {
  type: __typename
  name
}`, {"fragmentName":"FILTER_FIELDS"}) as unknown as TypedDocumentString<Filter_FieldsFragment, unknown>;
export const Filter_Depth_1FragmentDoc = new TypedDocumentString(`
    fragment FILTER_DEPTH_1 on Filter {
  ...FILTER_FIELDS
  ... on GroupFilter {
    filters {
      ...FILTER_FIELDS
    }
  }
}
    fragment CHECKBOX_FIELDS on CheckBoxFilter {
  type: __typename
  CheckBoxFilterDefault: default
  name
}
fragment HEADER_FIELDS on HeaderFilter {
  type: __typename
  name
}
fragment SELECT_FIELDS on SelectFilter {
  type: __typename
  SelectFilterDefault: default
  name
  values
}
fragment TRI_STATE_FIELDS on TriStateFilter {
  type: __typename
  TriStateFilterDefault: default
  name
}
fragment TEXT_FIELDS on TextFilter {
  type: __typename
  TextFilterDefault: default
  name
}
fragment SORT_FIELDS on SortFilter {
  type: __typename
  SortFilterDefault: default {
    ascending
    index
    __typename
  }
  name
  values
}
fragment SEPARATOR_FIELDS on SeparatorFilter {
  type: __typename
  name
}
fragment FILTER_FIELDS on Filter {
  ...CHECKBOX_FIELDS
  ...HEADER_FIELDS
  ...SELECT_FIELDS
  ...TRI_STATE_FIELDS
  ...TEXT_FIELDS
  ...SORT_FIELDS
  ...SEPARATOR_FIELDS
  ... on GroupFilter {
    type: __typename
    name
  }
}`, {"fragmentName":"FILTER_DEPTH_1"}) as unknown as TypedDocumentString<Filter_Depth_1Fragment, unknown>;
export const Filter_Depth_2FragmentDoc = new TypedDocumentString(`
    fragment FILTER_DEPTH_2 on Filter {
  ...FILTER_FIELDS
  ... on GroupFilter {
    filters {
      ...FILTER_DEPTH_1
    }
  }
}
    fragment CHECKBOX_FIELDS on CheckBoxFilter {
  type: __typename
  CheckBoxFilterDefault: default
  name
}
fragment HEADER_FIELDS on HeaderFilter {
  type: __typename
  name
}
fragment SELECT_FIELDS on SelectFilter {
  type: __typename
  SelectFilterDefault: default
  name
  values
}
fragment TRI_STATE_FIELDS on TriStateFilter {
  type: __typename
  TriStateFilterDefault: default
  name
}
fragment TEXT_FIELDS on TextFilter {
  type: __typename
  TextFilterDefault: default
  name
}
fragment SORT_FIELDS on SortFilter {
  type: __typename
  SortFilterDefault: default {
    ascending
    index
    __typename
  }
  name
  values
}
fragment SEPARATOR_FIELDS on SeparatorFilter {
  type: __typename
  name
}
fragment FILTER_FIELDS on Filter {
  ...CHECKBOX_FIELDS
  ...HEADER_FIELDS
  ...SELECT_FIELDS
  ...TRI_STATE_FIELDS
  ...TEXT_FIELDS
  ...SORT_FIELDS
  ...SEPARATOR_FIELDS
  ... on GroupFilter {
    type: __typename
    name
  }
}
fragment FILTER_DEPTH_1 on Filter {
  ...FILTER_FIELDS
  ... on GroupFilter {
    filters {
      ...FILTER_FIELDS
    }
  }
}`, {"fragmentName":"FILTER_DEPTH_2"}) as unknown as TypedDocumentString<Filter_Depth_2Fragment, unknown>;
export const Filter_Depth_3FragmentDoc = new TypedDocumentString(`
    fragment FILTER_DEPTH_3 on Filter {
  ...FILTER_FIELDS
  ... on GroupFilter {
    filters {
      ...FILTER_DEPTH_2
    }
  }
}
    fragment CHECKBOX_FIELDS on CheckBoxFilter {
  type: __typename
  CheckBoxFilterDefault: default
  name
}
fragment HEADER_FIELDS on HeaderFilter {
  type: __typename
  name
}
fragment SELECT_FIELDS on SelectFilter {
  type: __typename
  SelectFilterDefault: default
  name
  values
}
fragment TRI_STATE_FIELDS on TriStateFilter {
  type: __typename
  TriStateFilterDefault: default
  name
}
fragment TEXT_FIELDS on TextFilter {
  type: __typename
  TextFilterDefault: default
  name
}
fragment SORT_FIELDS on SortFilter {
  type: __typename
  SortFilterDefault: default {
    ascending
    index
    __typename
  }
  name
  values
}
fragment SEPARATOR_FIELDS on SeparatorFilter {
  type: __typename
  name
}
fragment FILTER_FIELDS on Filter {
  ...CHECKBOX_FIELDS
  ...HEADER_FIELDS
  ...SELECT_FIELDS
  ...TRI_STATE_FIELDS
  ...TEXT_FIELDS
  ...SORT_FIELDS
  ...SEPARATOR_FIELDS
  ... on GroupFilter {
    type: __typename
    name
  }
}
fragment FILTER_DEPTH_1 on Filter {
  ...FILTER_FIELDS
  ... on GroupFilter {
    filters {
      ...FILTER_FIELDS
    }
  }
}
fragment FILTER_DEPTH_2 on Filter {
  ...FILTER_FIELDS
  ... on GroupFilter {
    filters {
      ...FILTER_DEPTH_1
    }
  }
}`, {"fragmentName":"FILTER_DEPTH_3"}) as unknown as TypedDocumentString<Filter_Depth_3Fragment, unknown>;
export const ChapterPagesDocument = new TypedDocumentString(`
    mutation ChapterPages($chapterId: Int!) {
  fetchChapterPages(input: { chapterId: $chapterId }) {
    chapter {
      mangaId
      sourceOrder
    }
    pages
  }
}
    `) as unknown as TypedDocumentString<ChapterPagesMutation, ChapterPagesMutationVariables>;
export const ExtensionDetailsDocument = new TypedDocumentString(`
    query ExtensionDetails($pkgName: String!) {
  extension(pkgName: $pkgName) {
    ...EXTENSION_DETAILS
  }
}
    fragment EXTENSION_DETAILS on ExtensionType {
  pkgName
  name
  lang
  versionName
  isInstalled
  hasUpdate
  isObsolete
  source {
    nodes {
      ...SOURCE_DETAILS
    }
  }
}
fragment SOURCE_DETAILS on SourceType {
  id
  displayName
  lang
  contentWarning
  isConfigurable
  supportsLatest
}`) as unknown as TypedDocumentString<ExtensionDetailsQuery, ExtensionDetailsQueryVariables>;
export const ExtensionsDocument = new TypedDocumentString(`
    query Extensions {
  extensions {
    nodes {
      pkgName
      name
      lang
      versionName
      isInstalled
      hasUpdate
      isObsolete
    }
    totalCount
    pageInfo {
      hasNextPage
    }
  }
}
    `) as unknown as TypedDocumentString<ExtensionsQuery, ExtensionsQueryVariables>;
export const InstalledExtensionsDocument = new TypedDocumentString(`
    query InstalledExtensions {
  extensions(condition: { isInstalled: true }) {
    nodes {
      pkgName
      name
      source {
        nodes {
          ...SOURCE_DETAILS
        }
      }
    }
  }
}
    fragment SOURCE_DETAILS on SourceType {
  id
  displayName
  lang
  contentWarning
  isConfigurable
  supportsLatest
}`) as unknown as TypedDocumentString<InstalledExtensionsQuery, InstalledExtensionsQueryVariables>;
export const LibraryCategoriesDocument = new TypedDocumentString(`
    query LibraryCategories {
  categories(order: [{ by: ORDER, byType: ASC }]) {
    nodes {
      id
      name
    }
  }
}
    `) as unknown as TypedDocumentString<LibraryCategoriesQuery, LibraryCategoriesQueryVariables>;
export const LibraryCategoryMangaDocument = new TypedDocumentString(`
    query LibraryCategoryManga($categoryId: Int!) {
  category(id: $categoryId) {
    mangas {
      nodes {
        ...MANGA_FIELDS
      }
      totalCount
      pageInfo {
        hasNextPage
      }
    }
  }
}
    fragment MANGA_FIELDS on MangaType {
  id
  title
  description
  thumbnailUrl
  author
  artist
  status
  genre
  initialized
  lastFetchedAt
}`) as unknown as TypedDocumentString<LibraryCategoryMangaQuery, LibraryCategoryMangaQueryVariables>;
export const MangaChaptersDocument = new TypedDocumentString(`
    mutation MangaChapters($mangaId: Int!) {
  fetchMangaAndChapters(
    input: { id: $mangaId, fetchManga: false, fetchChapters: true }
  ) {
    chapters {
      ...CHAPTER_FIELDS
    }
    manga {
      source {
        lang
      }
    }
  }
}
    fragment CHAPTER_FIELDS on ChapterType {
  id
  mangaId
  name
  chapterNumber
  sourceOrder
  uploadDate
  scanlator
}`) as unknown as TypedDocumentString<MangaChaptersMutation, MangaChaptersMutationVariables>;
export const MangaDetailsDocument = new TypedDocumentString(`
    query MangaDetails($id: Int!) {
  manga(id: $id) {
    ...MANGA_FIELDS
  }
}
    fragment MANGA_FIELDS on MangaType {
  id
  title
  description
  thumbnailUrl
  author
  artist
  status
  genre
  initialized
  lastFetchedAt
}`) as unknown as TypedDocumentString<MangaDetailsQuery, MangaDetailsQueryVariables>;
export const MangaProgressDocument = new TypedDocumentString(`
    query MangaProgress($mangaId: Int!) {
  manga(id: $mangaId) {
    source {
      lang
    }
    lastReadChapter {
      ...CHAPTER_FIELDS
      isRead
      lastReadAt
    }
  }
}
    fragment CHAPTER_FIELDS on ChapterType {
  id
  mangaId
  name
  chapterNumber
  sourceOrder
  uploadDate
  scanlator
}`) as unknown as TypedDocumentString<MangaProgressQuery, MangaProgressQueryVariables>;
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
export const RefreshExtensionsDocument = new TypedDocumentString(`
    mutation RefreshExtensions {
  fetchExtensions(input: {  }) {
    __typename
  }
}
    `) as unknown as TypedDocumentString<RefreshExtensionsMutation, RefreshExtensionsMutationVariables>;
export const RefreshMangaDetailsDocument = new TypedDocumentString(`
    mutation RefreshMangaDetails($id: Int!) {
  fetchMangaAndChapters(
    input: { id: $id, fetchManga: true, fetchChapters: false }
  ) {
    manga {
      ...MANGA_FIELDS
    }
  }
}
    fragment MANGA_FIELDS on MangaType {
  id
  title
  description
  thumbnailUrl
  author
  artist
  status
  genre
  initialized
  lastFetchedAt
}`) as unknown as TypedDocumentString<RefreshMangaDetailsMutation, RefreshMangaDetailsMutationVariables>;
export const SearchSourceMangaDocument = new TypedDocumentString(`
    mutation SearchSourceManga($sourceId: LongString!, $page: Int!, $query: String!, $filters: [FilterChangeInput!]) {
  fetchSourceManga(
    input: {
      source: $sourceId
      page: $page
      query: $query
      type: SEARCH
      filters: $filters
    }
  ) {
    hasNextPage
    mangas {
      id
      title
      thumbnailUrl
    }
  }
}
    `) as unknown as TypedDocumentString<SearchSourceMangaMutation, SearchSourceMangaMutationVariables>;
export const ServerVersionDocument = new TypedDocumentString(`
    query ServerVersion {
  aboutServer {
    version
  }
}
    `) as unknown as TypedDocumentString<ServerVersionQuery, ServerVersionQueryVariables>;
export const SourceDetailsDocument = new TypedDocumentString(`
    query SourceDetails($sourceId: LongString!, $includePreferences: Boolean!) {
  source(id: $sourceId) {
    ...SOURCE_DETAILS
    preferences @include(if: $includePreferences) {
      ...SOURCE_PREFERENCE
    }
  }
}
    fragment SOURCE_DETAILS on SourceType {
  id
  displayName
  lang
  contentWarning
  isConfigurable
  supportsLatest
}
fragment SOURCE_PREFERENCE on Preference {
  type: __typename
  ... on CheckBoxPreference {
    key
    title
    summary
    enabled
    visible
    booleanValue: currentValue
    booleanDefault: default
  }
  ... on SwitchPreference {
    key
    title
    summary
    enabled
    visible
    booleanValue: currentValue
    booleanDefault: default
  }
  ... on EditTextPreference {
    key
    title
    summary
    enabled
    visible
    stringValue: currentValue
    stringDefault: default
    dialogTitle
    dialogMessage
  }
  ... on ListPreference {
    key
    title
    summary
    enabled
    visible
    entries
    entryValues
    stringValue: currentValue
    stringDefault: default
  }
  ... on MultiSelectListPreference {
    key
    title
    summary
    enabled
    visible
    entries
    entryValues
    selectedValues: currentValue
    defaultValues: default
    dialogTitle
    dialogMessage
  }
}`) as unknown as TypedDocumentString<SourceDetailsQuery, SourceDetailsQueryVariables>;
export const SourceFiltersDocument = new TypedDocumentString(`
    query SourceFilters($sourceId: LongString!) {
  source(id: $sourceId) {
    filters {
      ...FILTER_DEPTH_3
    }
  }
}
    fragment CHECKBOX_FIELDS on CheckBoxFilter {
  type: __typename
  CheckBoxFilterDefault: default
  name
}
fragment HEADER_FIELDS on HeaderFilter {
  type: __typename
  name
}
fragment SELECT_FIELDS on SelectFilter {
  type: __typename
  SelectFilterDefault: default
  name
  values
}
fragment TRI_STATE_FIELDS on TriStateFilter {
  type: __typename
  TriStateFilterDefault: default
  name
}
fragment TEXT_FIELDS on TextFilter {
  type: __typename
  TextFilterDefault: default
  name
}
fragment SORT_FIELDS on SortFilter {
  type: __typename
  SortFilterDefault: default {
    ascending
    index
    __typename
  }
  name
  values
}
fragment SEPARATOR_FIELDS on SeparatorFilter {
  type: __typename
  name
}
fragment FILTER_FIELDS on Filter {
  ...CHECKBOX_FIELDS
  ...HEADER_FIELDS
  ...SELECT_FIELDS
  ...TRI_STATE_FIELDS
  ...TEXT_FIELDS
  ...SORT_FIELDS
  ...SEPARATOR_FIELDS
  ... on GroupFilter {
    type: __typename
    name
  }
}
fragment FILTER_DEPTH_1 on Filter {
  ...FILTER_FIELDS
  ... on GroupFilter {
    filters {
      ...FILTER_FIELDS
    }
  }
}
fragment FILTER_DEPTH_2 on Filter {
  ...FILTER_FIELDS
  ... on GroupFilter {
    filters {
      ...FILTER_DEPTH_1
    }
  }
}
fragment FILTER_DEPTH_3 on Filter {
  ...FILTER_FIELDS
  ... on GroupFilter {
    filters {
      ...FILTER_DEPTH_2
    }
  }
}`) as unknown as TypedDocumentString<SourceFiltersQuery, SourceFiltersQueryVariables>;
export const SourceLanguagesDocument = new TypedDocumentString(`
    query SourceLanguages {
  sources {
    nodes {
      lang
    }
  }
}
    `) as unknown as TypedDocumentString<SourceLanguagesQuery, SourceLanguagesQueryVariables>;
export const UpdateExtensionDocument = new TypedDocumentString(`
    mutation UpdateExtension($pkgName: String!, $patch: UpdateExtensionPatchInput!) {
  updateExtension(input: { id: $pkgName, patch: $patch }) {
    extension {
      ...EXTENSION_DETAILS
    }
  }
}
    fragment EXTENSION_DETAILS on ExtensionType {
  pkgName
  name
  lang
  versionName
  isInstalled
  hasUpdate
  isObsolete
  source {
    nodes {
      ...SOURCE_DETAILS
    }
  }
}
fragment SOURCE_DETAILS on SourceType {
  id
  displayName
  lang
  contentWarning
  isConfigurable
  supportsLatest
}`) as unknown as TypedDocumentString<UpdateExtensionMutation, UpdateExtensionMutationVariables>;
export const UpdateMangasCategoriesDocument = new TypedDocumentString(`
    mutation UpdateMangasCategories($mangaIds: [Int!]!, $patch: UpdateMangaCategoriesPatchInput!) {
  updateMangasCategories(input: { ids: $mangaIds, patch: $patch }) {
    mangas {
      id
      categories {
        nodes {
          id
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateMangasCategoriesMutation, UpdateMangasCategoriesMutationVariables>;
export const UpdateSourcePreferenceDocument = new TypedDocumentString(`
    mutation UpdateSourcePreference($sourceId: LongString!, $change: SourcePreferenceChangeInput!) {
  updateSourcePreference(input: { source: $sourceId, change: $change }) {
    preferences {
      ...SOURCE_PREFERENCE
    }
  }
}
    fragment SOURCE_PREFERENCE on Preference {
  type: __typename
  ... on CheckBoxPreference {
    key
    title
    summary
    enabled
    visible
    booleanValue: currentValue
    booleanDefault: default
  }
  ... on SwitchPreference {
    key
    title
    summary
    enabled
    visible
    booleanValue: currentValue
    booleanDefault: default
  }
  ... on EditTextPreference {
    key
    title
    summary
    enabled
    visible
    stringValue: currentValue
    stringDefault: default
    dialogTitle
    dialogMessage
  }
  ... on ListPreference {
    key
    title
    summary
    enabled
    visible
    entries
    entryValues
    stringValue: currentValue
    stringDefault: default
  }
  ... on MultiSelectListPreference {
    key
    title
    summary
    enabled
    visible
    entries
    entryValues
    selectedValues: currentValue
    defaultValues: default
    dialogTitle
    dialogMessage
  }
}`) as unknown as TypedDocumentString<UpdateSourcePreferenceMutation, UpdateSourcePreferenceMutationVariables>;