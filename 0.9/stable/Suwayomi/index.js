var source=(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:`Module`});var t=Object.create,n=Object.defineProperty,r=Object.getOwnPropertyDescriptor,i=Object.getOwnPropertyNames,a=Object.getPrototypeOf,o=Object.prototype.hasOwnProperty,s=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports),c=(e,t,a,s)=>{if(t&&typeof t==`object`||typeof t==`function`)for(var c=i(t),l=0,u=c.length,d;l<u;l++)d=c[l],!o.call(e,d)&&d!==a&&n(e,d,{get:(e=>t[e]).bind(null,d),enumerable:!(s=r(t,d))||s.enumerable});return e},l=(e,r,i)=>(i=e==null?{}:t(a(e)),c(r||!e||!e.__esModule||!o.call(e,`default`)?n(i,`default`,{value:e,enumerable:!0}):i,e));function u(e){return e.trim().replace(/\/+$/,``)}function d(e,t){return/^https?:\/\//i.test(t)?t:`${u(e)}/${t.replace(/^\/+/,``)}`}function f(e,t){return d(e,t.thumbnailUrl||`/api/v1/manga/${t.id}/thumbnail`)}async function p(e,t,n){let r=u(e);if(!r)throw Error(`Configure your Suwayomi server first.`);let[i,a]=await Application.scheduleRequest({url:`${r}/api/graphql`,method:`POST`,headers:{"Content-Type":`application/json`,Accept:`application/json`},body:JSON.stringify({query:t.toString(),variables:n})});if(i.status===401||i.status===403)throw Error(`Authentication is required or access was denied.`);if(i.status<200||i.status>=300)throw Error(`Server returned HTTP ${i.status}`);let o;try{o=JSON.parse(Application.arrayBufferToUTF8String(a))}catch{throw Error(`The server did not return valid JSON.`)}if(!o||typeof o!=`object`||Array.isArray(o))throw Error(`The server did not return a GraphQL response.`);if(o.errors!=null&&!Array.isArray(o.errors))throw Error(`The GraphQL response contains invalid errors.`);if(o.errors?.length){let e=o.errors.map(e=>typeof e?.message==`string`?e.message:`Unknown GraphQL error.`);throw Error(e.join(`; `))}if(!o.data)throw Error(`The GraphQL response contains no data.`);return o.data}function m(e){"@babel/helpers - typeof";return m=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},m(e)}function ee(e,t){if(m(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t||`default`);if(m(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}function te(e){var t=ee(e,`string`);return m(t)==`symbol`?t:t+``}function h(e,t,n){return(t=te(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var g=class extends String{constructor(e,t){super(e),h(this,`__apiType`,void 0),h(this,`value`,void 0),h(this,`__meta__`,void 0),this.value=e,this.__meta__=t}toString(){return this.value}};new g(`
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
    `,{fragmentName:`MANGA_FIELDS`}),new g(`
    fragment CHAPTER_FIELDS on ChapterType {
  id
  mangaId
  name
  chapterNumber
  sourceOrder
  uploadDate
  scanlator
}
    `,{fragmentName:`CHAPTER_FIELDS`}),new g(`
    fragment SOURCE_DETAILS on SourceType {
  id
  displayName
  lang
  contentWarning
  isConfigurable
  supportsLatest
}
    `,{fragmentName:`SOURCE_DETAILS`}),new g(`
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
}`,{fragmentName:`EXTENSION_DETAILS`}),new g(`
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
    `,{fragmentName:`SOURCE_PREFERENCE`}),new g(`
    fragment CHECKBOX_FIELDS on CheckBoxFilter {
  type: __typename
  CheckBoxFilterDefault: default
  name
}
    `,{fragmentName:`CHECKBOX_FIELDS`}),new g(`
    fragment HEADER_FIELDS on HeaderFilter {
  type: __typename
  name
}
    `,{fragmentName:`HEADER_FIELDS`}),new g(`
    fragment SELECT_FIELDS on SelectFilter {
  type: __typename
  SelectFilterDefault: default
  name
  values
}
    `,{fragmentName:`SELECT_FIELDS`}),new g(`
    fragment TRI_STATE_FIELDS on TriStateFilter {
  type: __typename
  TriStateFilterDefault: default
  name
}
    `,{fragmentName:`TRI_STATE_FIELDS`}),new g(`
    fragment TEXT_FIELDS on TextFilter {
  type: __typename
  TextFilterDefault: default
  name
}
    `,{fragmentName:`TEXT_FIELDS`}),new g(`
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
    `,{fragmentName:`SORT_FIELDS`}),new g(`
    fragment SEPARATOR_FIELDS on SeparatorFilter {
  type: __typename
  name
}
    `,{fragmentName:`SEPARATOR_FIELDS`}),new g(`
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
}`,{fragmentName:`FILTER_FIELDS`}),new g(`
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
}`,{fragmentName:`FILTER_DEPTH_1`}),new g(`
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
}`,{fragmentName:`FILTER_DEPTH_2`}),new g(`
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
}`,{fragmentName:`FILTER_DEPTH_3`});let ne=new g(`
    mutation ChapterPages($chapterId: Int!) {
  fetchChapterPages(input: { chapterId: $chapterId }) {
    chapter {
      mangaId
      sourceOrder
    }
    pages
  }
}
    `),re=new g(`
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
}`),ie=new g(`
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
    `),ae=new g(`
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
}`),oe=new g(`
    query LibraryCategories {
  categories(order: [{ by: ORDER, byType: ASC }]) {
    nodes {
      id
      name
    }
  }
}
    `),_=new g(`
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
}`),se=new g(`
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
}`),ce=new g(`
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
}`),le=new g(`
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
}`),ue=new g(`
    mutation MarkChapterRead($chapterId: Int!) {
  updateChapter(input: { id: $chapterId, patch: { isRead: true } }) {
    chapter {
      id
      mangaId
      isRead
    }
  }
}
    `),de=new g(`
    mutation RefreshExtensions {
  fetchExtensions(input: {  }) {
    __typename
  }
}
    `),fe=new g(`
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
}`),v=new g(`
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
    `),pe=new g(`
    query ServerVersion {
  aboutServer {
    version
  }
}
    `),me=new g(`
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
}`),he=new g(`
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
}`),ge=new g(`
    query SourceLanguages {
  sources {
    nodes {
      lang
    }
  }
}
    `),_e=new g(`
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
}`),y=new g(`
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
    `),ve=new g(`
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
}`);function b(e,t,n){let r=Number(e.uploadDate);return{chapterId:String(e.id),sourceManga:t,langCode:n,chapNum:e.chapterNumber,title:e.name,sortingIndex:e.sourceOrder,publishDate:Number.isFinite(r)&&r>0?new Date(r):void 0,additionalInfo:e.scanlator?{Scanlator:e.scanlator}:void 0}}var x=class{constructor(){h(this,`requiresExplicitSubmission`,!1)}reloadForm(){let e=this.__underlying_formId;e&&Application.formDidChange(e)}};function S(e,t,n){return e[`__closure_selector-`+t]=n,Application.Selector(e,`__closure_selector-`+t)}function C(e,t){let n;return n=typeof e==`string`?{id:e}:e,{type:`listSection`,...n,items:t.filter(e=>e),allowAddition:!1,allowDeletion:!1,allowReorder:!1}}function ye(e,t){return{id:e,type:`listSection`,header:t.header,footer:t.footer,allowAddition:t.onAddition!=null&&t.allowAddition==1,allowDeletion:t.onDeletion!=null&&t.allowDeletion==1,allowReorder:t.onReorder!=null&&t.allowReorder==1,onAddition:t.onAddition,onDeletion:t.onDeletion,onReorder:t.onReorder,items:t.items.filter(e=>e)}}function w(e,t){let n;return n=typeof e==`string`?{id:e}:e,{type:`flowSection`,...n,items:t.filter(e=>e)}}function T(e,t){if(t.maxItemCount<1)throw Error(`[${t.id}] maxItemCount must not be less than one`);if(t.minItemCount<0)throw Error(`[${t.id}] minItemCount must not be less than zero`);if(t.minItemCount>=t.maxItemCount&&t.maxItemCount>1)throw Error(`[${t.id}] minItemCount must be less than maxItemCount, or both must be one`);if(t.value.length<t.minItemCount)throw Error(`[${t.id}] value count must not be less than minItemCount`);if(!t.value.every(e=>t.items.some(t=>t.id===e)))throw Error(`[${t.id}] All provided values must be inside items`);let n=Object.keys(t.value).length;return(t.layout==`flow`?w:C)({id:t.id,header:t.header,footer:t.footer},t.items.map(r=>{let i=t.value.indexOf(r.id),a=i!==-1;return E(r.id,{title:r.title,value:a?{symbol:`checkmark`,style:`success`}:void 0,onSelect:S(e,`__select_${t.id}#${r.id}`,async()=>{if(a)n>t.minItemCount&&t.value.splice(i,1);else if(t.maxItemCount==1)t.value.splice(0,t.value.length,r.id);else if(n<t.maxItemCount)t.value.push(r.id);else return;t.onValueChange&&await Application.SelectorRegistry.selector(t.onValueChange)(),e.reloadForm()})})}))}function be(e,t){let n=Object.keys(t.value).length;return(t.layout==`flow`?w:C)({id:t.id,header:t.header,footer:t.footer},t.items.map(r=>{let i=t.value[r.id],a,o;switch(i){case`included`:t.layout==`flow`?(o=`success`,a=void 0):(o=void 0,a={symbol:`checkmark`,style:`success`});break;case`excluded`:t.layout==`flow`?(o=`error`,a=void 0):(o=void 0,a={symbol:`xmark`,style:`error`});break;default:a=void 0,o=void 0}return E(r.id,{style:o,title:r.title,value:a,onSelect:S(e,`__multiselect_${t.id}#${r.id}`,async()=>{let a,o=!t.maximum||n<t.maximum,s=t.allowEmptySelection&&n==1||n>1;switch(i){case`included`:if(t.allowExclusion){a=`excluded`;break}if(s){a=void 0;break}return;case`excluded`:if(s){a=void 0;break}return;case void 0:if(o){a=`included`;break}return}a==null?delete t.value[r.id]:t.value[r.id]=a,t.onValueChange&&await Application.SelectorRegistry.selector(t.onValueChange)(),e.reloadForm()})})}))}function E(e,t){return{...t,id:e,type:`labelRow`,isHidden:t.isHidden??!1,isSelectable:t.onSelect!=null}}function D(e,t){return{...t,id:e,type:`inputRow`,isHidden:t.isHidden??!1}}function O(e,t){return{...t,id:e,type:`toggleRow`,isHidden:t.isHidden??!1}}function k(e,t){let n=Object.keys(t.value).length;return M(e,{form:new N(t.title,t),title:t.title,subtitle:t.subtitle,value:n==1?`${(`items`in t?t.items.find(e=>e.id==t.value[0])?.title:t.options.find(e=>e.id==t.value[0])?.title)??`1 item`}`:`${Object.keys(t.value).length} items`,isHidden:t.isHidden})}function A(e,t){return M(e,{form:new xe(t.title,t),title:t.title,subtitle:t.subtitle,value:`${Object.keys(t.value).length} items`,isHidden:t.isHidden})}function j(e,t){return{...t,id:e,type:`buttonRow`,isHidden:t.isHidden??!1}}function M(e,t){return{...t,id:e,type:`navigationRow`,isHidden:t.isHidden??!1}}var N=class extends x{constructor(e,t){super(),h(this,`title`,void 0),h(this,`params`,void 0),h(this,`states`,[]),h(this,`requiresExplicitSubmission`,!0),this.title=e,this.params=t,this.states=[...t.value]}getSections(){return[T(this,{id:`select`,value:this.states,layout:`layout`in this.params?this.params.layout:`list`,items:`items`in this.params?this.params.items:this.params.options,minItemCount:this.params.minItemCount,maxItemCount:this.params.maxItemCount,isHidden:this.params.isHidden})]}async formDidSubmit(){await Application.SelectorRegistry.selector(this.params.onValueChange)(this.states)}},xe=class extends x{constructor(e,t){super(),h(this,`title`,void 0),h(this,`params`,void 0),h(this,`states`,{}),h(this,`requiresExplicitSubmission`,!0),this.title=e,this.params=t,this.states={...t.value}}getSections(){return[be(this,{id:`multiselect`,value:this.states,items:this.params.items,allowExclusion:this.params.allowExclusion,allowEmptySelection:this.params.allowEmptySelection,maximum:this.params.maximum,layout:this.params.layout})]}async formDidSubmit(){await Application.SelectorRegistry.selector(this.params.onValueChange)(this.states)}},Se=class extends x{constructor(...e){super(...e),h(this,`requiresExplicitSubmission`,!0)}async formDidSubmit(){}formDidCancel(){}},P;(function(e){e[e.NONE=0]=`NONE`,e[e.MANGA_CHAPTERS=1]=`MANGA_CHAPTERS`,e[e.CHAPTER_PROVIDING=1]=`CHAPTER_PROVIDING`,e[e.MANGA_PROGRESS=2]=`MANGA_PROGRESS`,e[e.MANGA_PROGRESS_PROVIDING=2]=`MANGA_PROGRESS_PROVIDING`,e[e.PROGRESS_PROVIDING=2]=`PROGRESS_PROVIDING`,e[e.DISCOVER_SECIONS=4]=`DISCOVER_SECIONS`,e[e.DISCOVER_SECIONS_PROVIDING=4]=`DISCOVER_SECIONS_PROVIDING`,e[e.DISCOVER_SECTION_PROVIDING=4]=`DISCOVER_SECTION_PROVIDING`,e[e.COLLECTION_MANAGEMENT=8]=`COLLECTION_MANAGEMENT`,e[e.MANAGED_COLLECTION_PROVIDING=8]=`MANAGED_COLLECTION_PROVIDING`,e[e.CLOUDFLARE_BYPASS_REQUIRED=16]=`CLOUDFLARE_BYPASS_REQUIRED`,e[e.CLOUDFLARE_BYPASS_PROVIDING=16]=`CLOUDFLARE_BYPASS_PROVIDING`,e[e.SETTINGS_UI=32]=`SETTINGS_UI`,e[e.SETTINGS_FORM_PROVIDING=32]=`SETTINGS_FORM_PROVIDING`,e[e.MANGA_SEARCH=64]=`MANGA_SEARCH`,e[e.SEARCH_RESULTS_PROVIDING=64]=`SEARCH_RESULTS_PROVIDING`,e[e.SEARCH_RESULT_PROVIDING=64]=`SEARCH_RESULT_PROVIDING`})(P||(P={}));var F;(function(e){e.EVERYONE=`SAFE`,e.MATURE=`MATURE`,e.ADULT=`ADULT`})(F||(F={}));var I;(function(e){e[e.featured=0]=`featured`,e[e.simpleCarousel=1]=`simpleCarousel`,e[e.prominentCarousel=2]=`prominentCarousel`,e[e.chapterUpdates=3]=`chapterUpdates`,e[e.genres=4]=`genres`})(I||(I={})),Object.freeze({items:[],metadata:void 0});var Ce=/* @__PURE__ */ l((/* @__PURE__ */ s(((e,t)=>{(function(n,r,i){typeof e==`object`?(t.exports=i(),t.exports.default=i()):typeof define==`function`&&define.amd?define(i):r[n]=i()})(`slugify`,e,function(){var e=JSON.parse(`{"$":"dollar","%":"percent","&":"and","<":"less",">":"greater","|":"or","¢":"cent","£":"pound","¤":"currency","¥":"yen","©":"(c)","ª":"a","®":"(r)","º":"o","À":"A","Á":"A","Â":"A","Ã":"A","Ä":"A","Å":"A","Æ":"AE","Ç":"C","È":"E","É":"E","Ê":"E","Ë":"E","Ì":"I","Í":"I","Î":"I","Ï":"I","Ð":"D","Ñ":"N","Ò":"O","Ó":"O","Ô":"O","Õ":"O","Ö":"O","Ø":"O","Ù":"U","Ú":"U","Û":"U","Ü":"U","Ý":"Y","Þ":"TH","ß":"ss","à":"a","á":"a","â":"a","ã":"a","ä":"a","å":"a","æ":"ae","ç":"c","è":"e","é":"e","ê":"e","ë":"e","ì":"i","í":"i","î":"i","ï":"i","ð":"d","ñ":"n","ò":"o","ó":"o","ô":"o","õ":"o","ö":"o","ø":"o","ù":"u","ú":"u","û":"u","ü":"u","ý":"y","þ":"th","ÿ":"y","Ā":"A","ā":"a","Ă":"A","ă":"a","Ą":"A","ą":"a","Ć":"C","ć":"c","Č":"C","č":"c","Ď":"D","ď":"d","Đ":"DJ","đ":"dj","Ē":"E","ē":"e","Ė":"E","ė":"e","Ę":"e","ę":"e","Ě":"E","ě":"e","Ğ":"G","ğ":"g","Ģ":"G","ģ":"g","Ĩ":"I","ĩ":"i","Ī":"i","ī":"i","Į":"I","į":"i","İ":"I","ı":"i","Ķ":"k","ķ":"k","Ļ":"L","ļ":"l","Ľ":"L","ľ":"l","Ł":"L","ł":"l","Ń":"N","ń":"n","Ņ":"N","ņ":"n","Ň":"N","ň":"n","Ō":"O","ō":"o","Ő":"O","ő":"o","Œ":"OE","œ":"oe","Ŕ":"R","ŕ":"r","Ř":"R","ř":"r","Ś":"S","ś":"s","Ş":"S","ş":"s","Š":"S","š":"s","Ţ":"T","ţ":"t","Ť":"T","ť":"t","Ũ":"U","ũ":"u","Ū":"u","ū":"u","Ů":"U","ů":"u","Ű":"U","ű":"u","Ų":"U","ų":"u","Ŵ":"W","ŵ":"w","Ŷ":"Y","ŷ":"y","Ÿ":"Y","Ź":"Z","ź":"z","Ż":"Z","ż":"z","Ž":"Z","ž":"z","Ə":"E","ƒ":"f","Ơ":"O","ơ":"o","Ư":"U","ư":"u","ǈ":"LJ","ǉ":"lj","ǋ":"NJ","ǌ":"nj","Ș":"S","ș":"s","Ț":"T","ț":"t","ə":"e","˚":"o","Ά":"A","Έ":"E","Ή":"H","Ί":"I","Ό":"O","Ύ":"Y","Ώ":"W","ΐ":"i","Α":"A","Β":"B","Γ":"G","Δ":"D","Ε":"E","Ζ":"Z","Η":"H","Θ":"8","Ι":"I","Κ":"K","Λ":"L","Μ":"M","Ν":"N","Ξ":"3","Ο":"O","Π":"P","Ρ":"R","Σ":"S","Τ":"T","Υ":"Y","Φ":"F","Χ":"X","Ψ":"PS","Ω":"W","Ϊ":"I","Ϋ":"Y","ά":"a","έ":"e","ή":"h","ί":"i","ΰ":"y","α":"a","β":"b","γ":"g","δ":"d","ε":"e","ζ":"z","η":"h","θ":"8","ι":"i","κ":"k","λ":"l","μ":"m","ν":"n","ξ":"3","ο":"o","π":"p","ρ":"r","ς":"s","σ":"s","τ":"t","υ":"y","φ":"f","χ":"x","ψ":"ps","ω":"w","ϊ":"i","ϋ":"y","ό":"o","ύ":"y","ώ":"w","Ё":"Yo","Ђ":"DJ","Є":"Ye","І":"I","Ї":"Yi","Ј":"J","Љ":"LJ","Њ":"NJ","Ћ":"C","Џ":"DZ","А":"A","Б":"B","В":"V","Г":"G","Д":"D","Е":"E","Ж":"Zh","З":"Z","И":"I","Й":"J","К":"K","Л":"L","М":"M","Н":"N","О":"O","П":"P","Р":"R","С":"S","Т":"T","У":"U","Ф":"F","Х":"H","Ц":"C","Ч":"Ch","Ш":"Sh","Щ":"Sh","Ъ":"U","Ы":"Y","Ь":"","Э":"E","Ю":"Yu","Я":"Ya","а":"a","б":"b","в":"v","г":"g","д":"d","е":"e","ж":"zh","з":"z","и":"i","й":"j","к":"k","л":"l","м":"m","н":"n","о":"o","п":"p","р":"r","с":"s","т":"t","у":"u","ф":"f","х":"h","ц":"c","ч":"ch","ш":"sh","щ":"sh","ъ":"u","ы":"y","ь":"","э":"e","ю":"yu","я":"ya","ё":"yo","ђ":"dj","є":"ye","і":"i","ї":"yi","ј":"j","љ":"lj","њ":"nj","ћ":"c","ѝ":"u","џ":"dz","Ґ":"G","ґ":"g","Ғ":"GH","ғ":"gh","Қ":"KH","қ":"kh","Ң":"NG","ң":"ng","Ү":"UE","ү":"ue","Ұ":"U","ұ":"u","Һ":"H","һ":"h","Ә":"AE","ә":"ae","Ө":"OE","ө":"oe","Ա":"A","Բ":"B","Գ":"G","Դ":"D","Ե":"E","Զ":"Z","Է":"E'","Ը":"Y'","Թ":"T'","Ժ":"JH","Ի":"I","Լ":"L","Խ":"X","Ծ":"C'","Կ":"K","Հ":"H","Ձ":"D'","Ղ":"GH","Ճ":"TW","Մ":"M","Յ":"Y","Ն":"N","Շ":"SH","Չ":"CH","Պ":"P","Ջ":"J","Ռ":"R'","Ս":"S","Վ":"V","Տ":"T","Ր":"R","Ց":"C","Փ":"P'","Ք":"Q'","Օ":"O''","Ֆ":"F","և":"EV","ء":"a","آ":"aa","أ":"a","ؤ":"u","إ":"i","ئ":"e","ا":"a","ب":"b","ة":"h","ت":"t","ث":"th","ج":"j","ح":"h","خ":"kh","د":"d","ذ":"th","ر":"r","ز":"z","س":"s","ش":"sh","ص":"s","ض":"dh","ط":"t","ظ":"z","ع":"a","غ":"gh","ف":"f","ق":"q","ك":"k","ل":"l","م":"m","ن":"n","ه":"h","و":"w","ى":"a","ي":"y","ً":"an","ٌ":"on","ٍ":"en","َ":"a","ُ":"u","ِ":"e","ْ":"","٠":"0","١":"1","٢":"2","٣":"3","٤":"4","٥":"5","٦":"6","٧":"7","٨":"8","٩":"9","پ":"p","چ":"ch","ژ":"zh","ک":"k","گ":"g","ی":"y","۰":"0","۱":"1","۲":"2","۳":"3","۴":"4","۵":"5","۶":"6","۷":"7","۸":"8","۹":"9","฿":"baht","ა":"a","ბ":"b","გ":"g","დ":"d","ე":"e","ვ":"v","ზ":"z","თ":"t","ი":"i","კ":"k","ლ":"l","მ":"m","ნ":"n","ო":"o","პ":"p","ჟ":"zh","რ":"r","ს":"s","ტ":"t","უ":"u","ფ":"f","ქ":"k","ღ":"gh","ყ":"q","შ":"sh","ჩ":"ch","ც":"ts","ძ":"dz","წ":"ts","ჭ":"ch","ხ":"kh","ჯ":"j","ჰ":"h","Ṣ":"S","ṣ":"s","Ẁ":"W","ẁ":"w","Ẃ":"W","ẃ":"w","Ẅ":"W","ẅ":"w","ẞ":"SS","Ạ":"A","ạ":"a","Ả":"A","ả":"a","Ấ":"A","ấ":"a","Ầ":"A","ầ":"a","Ẩ":"A","ẩ":"a","Ẫ":"A","ẫ":"a","Ậ":"A","ậ":"a","Ắ":"A","ắ":"a","Ằ":"A","ằ":"a","Ẳ":"A","ẳ":"a","Ẵ":"A","ẵ":"a","Ặ":"A","ặ":"a","Ẹ":"E","ẹ":"e","Ẻ":"E","ẻ":"e","Ẽ":"E","ẽ":"e","Ế":"E","ế":"e","Ề":"E","ề":"e","Ể":"E","ể":"e","Ễ":"E","ễ":"e","Ệ":"E","ệ":"e","Ỉ":"I","ỉ":"i","Ị":"I","ị":"i","Ọ":"O","ọ":"o","Ỏ":"O","ỏ":"o","Ố":"O","ố":"o","Ồ":"O","ồ":"o","Ổ":"O","ổ":"o","Ỗ":"O","ỗ":"o","Ộ":"O","ộ":"o","Ớ":"O","ớ":"o","Ờ":"O","ờ":"o","Ở":"O","ở":"o","Ỡ":"O","ỡ":"o","Ợ":"O","ợ":"o","Ụ":"U","ụ":"u","Ủ":"U","ủ":"u","Ứ":"U","ứ":"u","Ừ":"U","ừ":"u","Ử":"U","ử":"u","Ữ":"U","ữ":"u","Ự":"U","ự":"u","Ỳ":"Y","ỳ":"y","Ỵ":"Y","ỵ":"y","Ỷ":"Y","ỷ":"y","Ỹ":"Y","ỹ":"y","–":"-","‘":"'","’":"'","“":"\\"","”":"\\"","„":"\\"","†":"+","•":"*","…":"...","₠":"ecu","₢":"cruzeiro","₣":"french franc","₤":"lira","₥":"mill","₦":"naira","₧":"peseta","₨":"rupee","₩":"won","₪":"new shequel","₫":"dong","€":"euro","₭":"kip","₮":"tugrik","₯":"drachma","₰":"penny","₱":"peso","₲":"guarani","₳":"austral","₴":"hryvnia","₵":"cedi","₸":"kazakhstani tenge","₹":"indian rupee","₺":"turkish lira","₽":"russian ruble","₿":"bitcoin","℠":"sm","™":"tm","∂":"d","∆":"delta","∑":"sum","∞":"infinity","♥":"love","元":"yuan","円":"yen","﷼":"rial","ﻵ":"laa","ﻷ":"laa","ﻹ":"lai","ﻻ":"la"}`),t=JSON.parse(`{"bg":{"Й":"Y","Ц":"Ts","Щ":"Sht","Ъ":"A","Ь":"Y","й":"y","ц":"ts","щ":"sht","ъ":"a","ь":"y"},"de":{"Ä":"AE","ä":"ae","Ö":"OE","ö":"oe","Ü":"UE","ü":"ue","ß":"ss","%":"prozent","&":"und","|":"oder","∑":"summe","∞":"unendlich","♥":"liebe"},"es":{"%":"por ciento","&":"y","<":"menor que",">":"mayor que","|":"o","¢":"centavos","£":"libras","¤":"moneda","₣":"francos","∑":"suma","∞":"infinito","♥":"amor"},"fr":{"%":"pourcent","&":"et","<":"plus petit",">":"plus grand","|":"ou","¢":"centime","£":"livre","¤":"devise","₣":"franc","∑":"somme","∞":"infini","♥":"amour"},"pt":{"%":"porcento","&":"e","<":"menor",">":"maior","|":"ou","¢":"centavo","∑":"soma","£":"libra","∞":"infinito","♥":"amor"},"uk":{"И":"Y","и":"y","Й":"Y","й":"y","Ц":"Ts","ц":"ts","Х":"Kh","х":"kh","Щ":"Shch","щ":"shch","Г":"H","г":"h"},"vi":{"Đ":"D","đ":"d"},"da":{"Ø":"OE","ø":"oe","Å":"AA","å":"aa","%":"procent","&":"og","|":"eller","$":"dollar","<":"mindre end",">":"større end"},"nb":{"&":"og","Å":"AA","Æ":"AE","Ø":"OE","å":"aa","æ":"ae","ø":"oe"},"it":{"&":"e"},"nl":{"&":"en"},"sv":{"&":"och","Å":"AA","Ä":"AE","Ö":"OE","å":"aa","ä":"ae","ö":"oe"}}`);function n(n,r){if(typeof n!=`string`)throw Error(`slugify: string argument expected`);r=typeof r==`string`?{replacement:r}:r||{};var i=t[r.locale]||{},a=r.replacement===void 0?`-`:r.replacement,o=r.trim===void 0||r.trim,s=n.normalize().split(``).reduce(function(t,n){var o=i[n];return o===void 0&&(o=e[n]),o===void 0&&(o=n),o===a&&(o=` `),t+o.replace(r.remove||/[^\w\s$*_+~.()'"!\-:@]+/g,``)},``);return r.strict&&(s=s.replace(/[^A-Za-z0-9\s]/g,``)),o&&(s=s.trim()),s=s.replace(/\s+/g,a),r.lower&&(s=s.toLowerCase()),s}return n.extend=function(t){Object.assign(e,t)},n})})))(),1);function L(e,t){return{mangaId:String(e.id),mangaInfo:{primaryTitle:e.title,secondaryTitles:[],synopsis:e.description??``,tagGroups:[{id:`genres`,title:`Genres`,tags:e.genre.map(e=>({id:(0,Ce.default)(e,{lower:!0,strict:!0}),title:e}))}],contentRating:F.EVERYONE,contentType:`comic`,status:e.status,artist:e.artist??void 0,author:e.author??void 0,thumbnailUrl:f(t,e),shareUrl:d(t,`/manga/${e.id}`)}}}function R(e){return e.type===`SortFilter`?{type:`SortFilter`,value:{...e.value}}:{...e}}function we(e){return Object.fromEntries([...e].map(([e,t])=>[e,R(t)]))}function z(e){return typeof e==`number`&&Number.isInteger(e)&&e>=0&&e<=2147483647}function B(e){let t=e.split(`.`).map(Number);if(!/^\d+(\.\d+)*$/.test(e)||!t.every(z))throw Error(`Invalid filter path: ${e}`);return t}function Te(e){if(!e||typeof e!=`object`||Array.isArray(e))return!1;switch(e.type){case`CheckBoxFilter`:return typeof e.value==`boolean`;case`SelectFilter`:return z(e.value);case`TextFilter`:return typeof e.value==`string`;case`TriStateFilter`:return e.value===`INCLUDE`||e.value===`EXCLUDE`||e.value===`IGNORE`;case`SortFilter`:{let t=e.value;return!!t&&typeof t==`object`&&!Array.isArray(t)&&z(t.index)&&typeof t.ascending==`boolean`}default:return!1}}function V(e){let t=/* @__PURE__ */ new Map;if(e===void 0)return t;if(!e||typeof e!=`object`||Array.isArray(e))throw Error(`Saved source filters are invalid. Start a new search.`);for(let[n,r]of Object.entries(e)){if(B(n),!Te(r))throw Error(`Saved source filters are invalid. Start a new search.`);t.set(n,R(r))}return t}function Ee(e,t){switch(t.type){case`CheckBoxFilter`:return{position:e,checkBoxState:t.value};case`SelectFilter`:return{position:e,selectState:t.value};case`TextFilter`:return{position:e,textState:t.value};case`TriStateFilter`:return{position:e,triState:t.value};case`SortFilter`:return{position:e,sortState:{...t.value}}}}function De(e){return[...e].toSorted(([e],[t])=>e.localeCompare(t)).map(([e,t])=>{let n=B(e),r=Ee(n.pop(),t);for(;n.length>0;)r={position:n.pop(),groupChange:r};return r})}let H={serverUrl:`suwayomi.serverUrl`,sourceLanguages:`suwayomi.sourceLanguages`,sourceOverrides:`suwayomi.sourceOverrides`,searchSourceOrder:`suwayomi.searchSourceOrder`},U={get serverUrl(){let e=Application.getState(H.serverUrl);return typeof e==`string`?e:``},set serverUrl(e){Application.setState(e,H.serverUrl)},get sourceLanguages(){return Application.getState(H.sourceLanguages)??[`en`,`all`]},set sourceLanguages(e){Application.setState(e,H.sourceLanguages)},get sourceOverrides(){return Application.getState(H.sourceOverrides)??{}},set sourceOverrides(e){Application.setState(e,H.sourceOverrides)},isSourceEnabled(e){return this.sourceOverrides[e.id]??this.sourceLanguages.includes(e.lang)},setSourceEnabled(e,t){this.sourceOverrides={...this.sourceOverrides,[e]:t}},get searchSourceOrder(){return Application.getState(H.searchSourceOrder)??[]},set searchSourceOrder(e){Application.setState(e,H.searchSourceOrder)}};async function W(){let e=await p(U.serverUrl,ae),t=new Map(U.searchSourceOrder.map((e,t)=>[e,t]));return e.extensions.nodes.flatMap(e=>e.source.nodes.map(t=>({...t,extensionName:e.name}))).filter(e=>U.isSourceEnabled(e)).toSorted((e,n)=>{let r=t.get(e.id)??1/0,i=t.get(n.id)??1/0;return r===i?e.extensionName.localeCompare(n.extensionName)||e.lang.localeCompare(n.lang):r-i})}async function Oe(e,t){return(await p(U.serverUrl,me,{sourceId:e,includePreferences:t})).source}var ke=class extends x{getSections(){return[C({id:`progress`,header:`Suwayomi Reading Progress`,footer:`Completed chapter reading actions are synchronized with your Suwayomi server.`},[E(`syncStatus`,{title:`Progress Provider`,value:`Suwayomi`})])]}};function G(e){if(e===`all`)return`Multi-language`;if(e===`localsourcelang`)return`Local Source`;try{return new Intl.DisplayNames([`en`],{type:`language`}).of(e)??e}catch{return e}}function K(e){return e&&e!==`all`?e:`und`}function q(e,t){return C(e,[E(`status`,{title:t})])}async function Ae(e){let t=await p(U.serverUrl,he,{sourceId:e});if(!t.source)throw Error(`Source ${e} not found.`);return t.source.filters}function J(e,t){return Number.isInteger(e)&&e>=0&&e<t}function Y(e,t,n,r=[]){let i=[],a=[];return e.forEach((e,t)=>{e.type===`SeparatorFilter`?a.length>0&&(i.push(a),a=[]):a.push({filter:e,position:t})}),a.length>0&&i.push(a),i.map((e,i)=>C(`section_${[...r,i].join(`_`)}`,e.map(({filter:e,position:i})=>je(e,[...r,i],t,n))))}function je(e,t,n,r){let i=`filter_${t.join(`_`)}`,a=t.join(`.`),o=r.get(a);switch(e.type){case`HeaderFilter`:return E(i,{title:e.name});case`GroupFilter`:{if(e.filters===void 0)return E(i,{title:e.name,subtitle:`Additional filter nesting is not supported.`});let a=e.filters??[];return a.length>0&&a.every(e=>e.type===`TriStateFilter`)?X(i,e.name,a.map((e,n)=>({filter:e,path:[...t,n]})),n,r):M(i,{title:e.name,form:new Me(e.name,a,t,r)})}case`CheckBoxFilter`:return O(i,{title:e.name,value:o?.type===`CheckBoxFilter`?o.value:e.CheckBoxFilterDefault??!1,onValueChange:S(n,`toggle_${i}`,async e=>{r.set(a,{type:`CheckBoxFilter`,value:e}),n.reloadForm()})});case`SelectFilter`:{let t=e.values??[];if(t.length===0)return E(i,{title:e.name,subtitle:`No options available`});let s=o?.type===`SelectFilter`?o.value:e.SelectFilterDefault??0,c=J(s,t.length)?s:0;return k(i,{title:e.name,layout:`list`,value:[String(c)],items:t.map((e,t)=>({id:String(t),title:e})),minItemCount:1,maxItemCount:1,onValueChange:S(n,`select_${i}`,async e=>{let i=Number(e[0]);J(i,t.length)&&(r.set(a,{type:`SelectFilter`,value:i}),n.reloadForm())})})}case`TriStateFilter`:return X(i,e.name,[{filter:e,path:t}],n,r);case`SortFilter`:{let t=e.values??[];return t.length===0?E(i,{title:e.name,subtitle:`No sorting options available`}):M(i,{title:e.name,form:new Ne(e.name,t,e.SortFilterDefault??{index:0,ascending:!1},a,r)})}case`TextFilter`:return D(i,{title:e.name,value:o?.type===`TextFilter`?o.value:e.TextFilterDefault??``,onValueChange:S(n,`text_${i}`,async e=>{r.set(a,{type:`TextFilter`,value:e})})});default:return E(i,{title:e.name,subtitle:e.type})}}function X(e,t,n,r,i){let a={};for(let{filter:e,path:t}of n){let n=t.join(`.`),r=i.get(n),o=r?.type===`TriStateFilter`?r.value:e.TriStateFilterDefault??`IGNORE`;o===`INCLUDE`?a[n]=`included`:o===`EXCLUDE`&&(a[n]=`excluded`)}return A(e,{title:t,layout:`list`,value:a,items:n.map(({filter:e,path:t})=>({id:t.join(`.`),title:e.name})),allowExclusion:!0,allowEmptySelection:!0,onValueChange:S(r,`triState_${e}`,async e=>{for(let{path:t}of n){let n=t.join(`.`),r=e[n];i.set(n,{type:`TriStateFilter`,value:r===`included`?`INCLUDE`:r===`excluded`?`EXCLUDE`:`IGNORE`})}r.reloadForm()})})}var Me=class extends x{constructor(e,t,n,r){super(),this.name=e,this.filters=t,this.path=n,this.selections=r}getSections(){return this.filters.length===0?[q(`empty`,`No filters available for ${this.name}.`)]:Y(this.filters,this,this.selections,this.path)}},Ne=class extends x{constructor(e,t,n,r,i){super(),this.name=e,this.options=t,this.defaultValue=n,this.key=r,this.selections=i}getValue(){let e=this.selections.get(this.key),t=e?.type===`SortFilter`?e.value:this.defaultValue;return{index:J(t.index,this.options.length)?t.index:0,ascending:t.ascending}}getSections(){let e=this.getValue();return[C(`sort`,[k(`sortOption`,{title:this.name,layout:`list`,value:[String(e.index)],items:this.options.map((e,t)=>({id:String(t),title:e})),minItemCount:1,maxItemCount:1,onValueChange:S(this,`sort_index_${this.key}`,async e=>{let t=Number(e[0]);J(t,this.options.length)&&(this.selections.set(this.key,{type:`SortFilter`,value:{...this.getValue(),index:t}}),this.reloadForm())})}),O(`sortAscending`,{title:`Ascending`,subtitle:`Off = Descending`,value:e.ascending,onValueChange:S(this,`sort_ascending_${this.key}`,async e=>{this.selections.set(this.key,{type:`SortFilter`,value:{...this.getValue(),ascending:e}}),this.reloadForm()})})])]}},Pe=class extends x{constructor(e,t){super(),this.sourceId=e,this.selections=t,h(this,`filters`,null),h(this,`loading`,!1),h(this,`error`,void 0)}formWillAppear(){this.filters===null&&!this.loading&&this.loadFilters()}getSections(){return this.loading?[q(`status`,`Loading source filters...`)]:this.error?[q(`status`,this.error)]:this.filters===null?[]:Y(this.filters,this,this.selections)}async loadFilters(){this.loading=!0,this.error=void 0,this.reloadForm();try{this.filters=await Ae(this.sourceId)}catch(e){this.error=e instanceof Error?e.message:`Failed to load source filters.`}finally{this.loading=!1,this.reloadForm()}}},Fe=class extends Se{constructor(e){super(),h(this,`searchModeSelection`,[`simple`]),h(this,`selectedSourceIds`,[]),h(this,`sources`,null),h(this,`loadingSources`,!1),h(this,`sourceError`,void 0),h(this,`filterSelectionsBySource`,/* @__PURE__ */ new Map);let t=e.metadata;if(t&&typeof t==`object`&&!Array.isArray(t)){t.searchModeSelection===`source`&&(this.searchModeSelection=[`source`]),typeof t.sourceId==`string`&&(this.selectedSourceIds=[t.sourceId]);let e=t.filterSelectionsBySource;if(e!==void 0){if(!e||typeof e!=`object`||Array.isArray(e))throw Error(`Saved search filters are invalid. Start a new search.`);for(let[t,n]of Object.entries(e))this.filterSelectionsBySource.set(t,V(n))}}}formWillAppear(){this.searchModeSelection[0]===`source`&&this.loadSources()}getSections(){let e=[T(this,{id:`searchMode`,header:`Search Mode`,layout:`list`,value:this.searchModeSelection,items:[{id:`simple`,title:`Simple`},{id:`source`,title:`Source-specific`}],minItemCount:1,maxItemCount:1,onValueChange:Application.Selector(this,`onModeChanged`)})];if(this.searchModeSelection[0]!==`source`)return e;if(this.loadingSources)return e.push(q(`status`,`Loading enabled sources...`)),e;if(this.sourceError)return e.push(C(`sourceStatus`,[E(`error`,{title:this.sourceError}),j(`retry`,{title:`Retry`,onSelect:Application.Selector(this,`retrySources`)})])),e;if(!this.sources?.length)return e.push(q(`status`,`No enabled sources found.`)),e;e.push(T(this,{id:`searchSource`,header:`Source`,layout:`list`,value:this.selectedSourceIds,items:this.sources.map(e=>({id:e.id,title:`${e.extensionName} (${G(e.lang)})`})),minItemCount:1,maxItemCount:1}));let t=this.sources.find(e=>e.id===this.selectedSourceIds[0]);if(t){let n=this.filterSelectionsBySource.get(t.id);n||(n=/* @__PURE__ */ new Map,this.filterSelectionsBySource.set(t.id,n)),e.push(C(`sourceFilters`,[M(`editFilters`,{title:`Edit Filters`,subtitle:t.displayName,form:new Pe(t.id,n)})]))}return e}async onModeChanged(){this.searchModeSelection[0]===`source`&&this.loadSources()}async retrySources(){await this.loadSources()}async loadSources(){if(!(this.sources!==null||this.loadingSources)){this.loadingSources=!0,this.sourceError=void 0,this.reloadForm();try{this.sources=await W();let e=this.sources.find(e=>e.id===this.selectedSourceIds[0])??this.sources[0];this.selectedSourceIds=e?[e.id]:[]}catch(e){this.sourceError=e instanceof Error?e.message:`Failed to load enabled sources.`}finally{this.loadingSources=!1,this.reloadForm()}}}async formDidSubmit(){if(this.searchModeSelection[0]===`source`&&(this.loadingSources||!this.sources?.some(e=>e.id===this.selectedSourceIds[0])))throw Error(`Select an enabled source before searching.`)}getSearchQueryMetadata(){return{searchModeSelection:this.searchModeSelection[0]===`source`?`source`:`simple`,sourceId:this.selectedSourceIds[0],filterSelectionsBySource:Object.fromEntries([...this.filterSelectionsBySource].map(([e,t])=>[e,we(t)]))}}};async function Z(){let{nodes:e,totalCount:t,pageInfo:n}=(await p(U.serverUrl,ie)).extensions;if(n.hasNextPage||e.length<t)throw Error(`Incomplete extension catalogue: received ${e.length} of ${t} extensions`);return e}async function Ie(){if(!(await p(U.serverUrl,de)).fetchExtensions)throw Error(`The server did not confirm the catalogue refresh.`);return Z()}async function Le(e,t){let n=await p(U.serverUrl,ve,{sourceId:e,change:t});if(!n.updateSourcePreference)throw Error(`The server did not confirm the preference change.`);return n.updateSourcePreference.preferences}function Re(e,t,n){return e.flatMap((e,r)=>{if(!e.visible)return[];let i=`preference_${r}`,a=e.title??e.key??`Preference ${r+1}`,o=``,s;switch(e.type){case`CheckBoxPreference`:case`SwitchPreference`:{let c=e.booleanValue??e.booleanDefault;o=c?`On`:`Off`,s=O(i,{title:a,value:c,onValueChange:S(t,`change_${i}`,async t=>{await n({position:r,...e.type===`CheckBoxPreference`?{checkBoxState:t}:{switchState:t}})})});break}case`ListPreference`:case`MultiSelectListPreference`:{let c=e.type===`ListPreference`?[e.stringValue??e.stringDefault].filter(e=>e!=null):e.selectedValues??e.defaultValues??[],l=e.entryValues.map((t,n)=>({id:String(n),title:e.entries[n]??t})),u=e.entryValues.flatMap((e,t)=>c.includes(e)?[String(t)]:[]);o=c.map(t=>e.entries[e.entryValues.indexOf(t)]??t).join(`, `),s=l.length===0?E(i,{title:a,value:`No options available.`}):k(i,{title:a,layout:`list`,items:l,value:e.type===`ListPreference`?u.slice(0,1):u,minItemCount:+(e.type===`ListPreference`),maxItemCount:e.type===`ListPreference`?1:l.length,onValueChange:S(t,`change_${i}`,async t=>{let i=t.map(t=>{let n=l.findIndex(e=>e.id===t),r=e.entryValues[n];if(r===void 0)throw Error(`Invalid preference option.`);return r});if(e.type===`ListPreference`){let e=i[0];if(i.length!==1||e===void 0)throw Error(`Select one preference option.`);await n({position:r,listState:e})}else await n({position:r,multiSelectState:i})})});break}case`EditTextPreference`:{let t=e.stringValue??e.stringDefault??``;o=t,s=M(i,{title:a,form:new ze(e.dialogTitle??a,e.dialogMessage,t,async e=>n({position:r,editTextState:e}))});break}}return e.enabled||(s=E(i,{title:a,value:o})),[C({id:i,footer:[e.summary?.replaceAll(`%s`,o),`dialogMessage`in e?e.dialogMessage:void 0].filter(Boolean).join(`
`)||void 0},[s])]})}var ze=class extends x{constructor(e,t,n,r){super(),this.title=e,this.message=t,this.value=n,this.save=r,h(this,`requiresExplicitSubmission`,!0),h(this,`saving`,!1)}getSections(){return this.saving?[q(`text`,`Saving preference...`)]:[C({id:`text`,header:this.title,footer:this.message??void 0},[D(`value`,{title:`Value`,value:this.value,onValueChange:Application.Selector(this,`onValueChanged`)})])]}async onValueChanged(e){this.value=e}async formDidSubmit(){if(this.saving)throw Error(`The preference is already being saved.`);this.saving=!0,this.reloadForm();try{await this.save(this.value)}finally{this.saving=!1,this.reloadForm()}}};let Be={SAFE:`Safe`,MIXED:`Mixed`,NSFW:`NSFW`};var Ve=class extends x{constructor(e){super(),this.source=e,h(this,`loading`,!1),h(this,`error`,void 0),h(this,`saving`,!1),h(this,`preferenceError`,void 0),e.isConfigurable&&this.loadSourceDetails()}getSections(){let e=[C({id:`sourceInfo`,header:`Source`},[E(`displayName`,{title:`Name`,value:this.source.displayName}),E(`contentWarning`,{title:`Content Warning`,value:Be[this.source.contentWarning]})]),C({id:`settings`,header:`Paperback`},[O(`enabled`,{title:`Enabled`,value:U.isSourceEnabled(this.source),onValueChange:Application.Selector(this,`onEnabledChanged`)})])];if(this.loading||this.saving)return[...e,q(`sourceStatus`,this.saving?`Saving source preference...`:`Loading source settings...`)];if(this.error)return[...e,C(`sourceError`,[E(`error`,{title:this.error}),j(`retry`,{title:`Retry`,onSelect:Application.Selector(this,`retryLoad`)})])];if(this.preferenceError&&e.push(q(`preferenceError`,this.preferenceError)),!this.source.isConfigurable)e.push(q(`preferences`,`This source has no configurable preferences.`));else{let t=this.source.preferences??[];t.length===0?e.push(q(`preferences`,`No source preferences available.`)):e.push(...Re(t,this,e=>this.savePreference(e)))}return e}async onEnabledChanged(e){U.setSourceEnabled(this.source.id,e),this.reloadForm()}async retryLoad(){await this.loadSourceDetails()}async loadSourceDetails(){if(!(this.loading||this.saving)){this.loading=!0,this.error=void 0,this.preferenceError=void 0,this.reloadForm();try{this.source=await Oe(this.source.id,this.source.isConfigurable)}catch(e){this.error=e instanceof Error?e.message:`Failed to load source settings.`}finally{this.loading=!1,this.reloadForm()}}}async savePreference(e){if(this.loading||this.saving)throw Error(`Wait for the current preference operation to finish.`);let t=this.source.preferences?.[e.position];if(!this.source.isConfigurable||!t?.visible||!t.enabled)throw Error(`This preference is no longer editable. Reload source settings.`);this.saving=!0,this.preferenceError=void 0,this.reloadForm();try{this.source.preferences=await Le(this.source.id,e)}catch(e){throw this.preferenceError=e instanceof Error?e.message:`Failed to save source preference.`,e}finally{this.saving=!1,this.reloadForm()}}},Q=class extends x{constructor(e){super(),this.pkgName=e,h(this,`extension`,void 0),h(this,`loading`,!0),h(this,`error`,void 0),h(this,`pendingAction`,void 0),h(this,`actionError`,void 0),h(this,`removed`,!1)}formWillAppear(){!this.removed&&!this.pendingAction&&this.loadExtension()}getSections(){if(this.loading)return[q(`extension`,`Loading extension...`)];if(this.error)return[q(`extension`,this.error)];let e=this.extension;if(!e)return[q(`extension`,this.removed?`Extension uninstalled.`:`Extension not found.`)];let t=[C({id:`extension`,header:e.name},[E(`language`,{title:`Language`,value:G(e.lang)}),E(`version`,{title:`Version`,value:e.versionName}),E(`status`,{title:`Status`,value:e.isInstalled?e.hasUpdate?`Update available`:`Installed`:`Not installed`})])];if(t.push(this.actionsSection(e)),!e.isInstalled||this.pendingAction)return t;let n=e.source.nodes.toSorted((e,t)=>Number(U.isSourceEnabled(t))-Number(U.isSourceEnabled(e))||e.displayName.localeCompare(t.displayName)||e.lang.localeCompare(t.lang));return t.push(C({id:`sources`,header:`Sources`},n.length>0?n.map(e=>M(`source_${e.id}`,{title:e.displayName,subtitle:G(e.lang),form:new Ve(e)})):[E(`empty`,{title:`No sources found.`})])),t}actionsSection(e){return this.pendingAction?q(`actions`,{install:`Installing extension...`,update:`Updating extension...`,uninstall:`Uninstalling extension...`}[this.pendingAction]):C({id:`actions`,header:`Actions`},[j(`install`,{title:`Install`,isHidden:e.isInstalled||e.isObsolete,onSelect:Application.Selector(this,`installExtension`)}),j(`update`,{title:`Update`,isHidden:!e.isInstalled||!e.hasUpdate||e.isObsolete,onSelect:Application.Selector(this,`updateExtension`)}),j(`uninstall`,{title:`Uninstall`,isHidden:!e.isInstalled,onSelect:Application.Selector(this,`uninstallExtension`)}),this.actionError?E(`actionError`,{title:this.actionError}):void 0])}async installExtension(){await this.changeExtension(`install`)}async updateExtension(){await this.changeExtension(`update`)}async uninstallExtension(){await this.changeExtension(`uninstall`)}async changeExtension(e){let t=this.extension;if(!(!t||this.loading||this.pendingAction)&&!(e===`install`&&t.isInstalled)&&(e===`install`||t.isInstalled)&&(e!==`update`||t.hasUpdate)&&!(e!==`uninstall`&&t.isObsolete)){this.pendingAction=e,this.actionError=void 0,this.reloadForm();try{let t=(await p(U.serverUrl,_e,{pkgName:this.pkgName,patch:{[e]:!0}})).updateExtension;if(!t)throw Error(`The server did not confirm the extension action.`);let n=t.extension;if(!n&&e!==`uninstall`)throw Error(`The server returned no extension after the action.`);if(n&&n.isInstalled!==(e!==`uninstall`))throw Error(`The extension installation state did not change as expected.`);this.extension=n??void 0,this.removed=!n}catch(e){this.actionError=e instanceof Error?e.message:`Extension action failed.`}finally{this.pendingAction=void 0,this.reloadForm()}}}async loadExtension(){if(!this.pendingAction){this.loading=!0,this.error=void 0,this.reloadForm();try{let e=await p(U.serverUrl,re,{pkgName:this.pkgName});this.extension=e.extension}catch(e){this.error=e instanceof Error?e.message:`Failed to load extension.`}finally{this.loading=!1,this.reloadForm()}}}},He=class extends x{constructor(e){super(),this.language=e,h(this,`extensions`,[]),h(this,`loading`,!0),h(this,`error`,void 0)}formWillAppear(){this.loadExtensions()}getSections(){if(this.loading)return[q(`extensions`,`Loading extensions...`)];if(this.error)return[q(`extensions`,this.error)];let e=this.extensions.toSorted((e,t)=>e.name.localeCompare(t.name));return[C({id:`extensions`,header:G(this.language)},e.length>0?e.map(e=>M(`extension_${e.pkgName}`,{title:e.name,subtitle:e.versionName,form:new Q(e.pkgName)})):[E(`empty`,{title:`No available extensions found.`})])]}async loadExtensions(){this.loading=!0,this.error=void 0,this.reloadForm();try{let e=await Z();this.extensions=e.filter(e=>!e.isInstalled&&!e.isObsolete&&e.lang===this.language)}catch(e){this.error=e instanceof Error?e.message:`Failed to load extensions.`}finally{this.loading=!1,this.reloadForm()}}},Ue=class extends x{constructor(...e){super(...e),h(this,`extensions`,[]),h(this,`loading`,!0),h(this,`error`,void 0),h(this,`refreshing`,!1)}formWillAppear(){this.loadExtensions()}getSections(){if(this.loading)return[q(`extensions`,`Loading extensions...`)];let e=C(`catalogue`,[j(`refreshCatalogue`,{title:`Refresh Catalogue`,onSelect:Application.Selector(this,`refreshCatalogue`)})]);if(this.error)return[e,q(`extensions`,this.error)];let t=this.extensions.toSorted((e,t)=>e.name.localeCompare(t.name)),n=t.filter(e=>e.isInstalled&&e.hasUpdate),r=t.filter(e=>e.isInstalled&&!e.hasUpdate),i=t.filter(e=>!e.isInstalled&&!e.isObsolete),a=[...new Set(i.map(e=>e.lang))].map(e=>({id:e,title:G(e)})).toSorted((e,t)=>e.id===`all`?-1:t.id===`all`?1:e.title.localeCompare(t.title));return[e,this.extensionSection(`updates`,`Updates`,n),this.extensionSection(`installed`,`Installed`,r),C({id:`available`,header:`Available`},a.length>0?a.map(e=>M(`language_${e.id}`,{title:e.title,form:new He(e.id)})):[E(`empty`,{title:`No available extensions found.`})])]}extensionSection(e,t,n){return C({id:e,header:t},n.length>0?n.map(e=>M(`extension_${e.pkgName}`,{title:e.name,subtitle:G(e.lang),form:new Q(e.pkgName)})):[E(`empty`,{title:e===`updates`?`No updates available.`:`No other installed extensions.`})])}async refreshCatalogue(){this.loading||await this.loadExtensions(!0)}async loadExtensions(e=!1){if(!this.refreshing){this.loading=!0,this.refreshing=e,this.error=void 0,this.reloadForm();try{this.extensions=e?await Ie():await Z()}catch(e){this.error=e instanceof Error?e.message:`Failed to load extensions.`}finally{this.loading=!1,this.refreshing=!1,this.reloadForm()}}}},We=class extends x{constructor(...e){super(...e),h(this,`sources`,[]),h(this,`loading`,!0),h(this,`error`,void 0)}formWillAppear(){this.loadSources()}getSections(){if(this.loading)return[q(`status`,`Loading enabled sources...`)];if(this.error)return[q(`status`,this.error)];let e=this.sources;return e.length===0?[q(`status`,`No enabled sources found.`)]:[ye(`sourceOrder`,{id:`sourceOrder`,header:`Search Priority`,footer:`Sources higher in the list have greater search priority.`,items:e.map(e=>E(`source_${e.id}`,{title:`${e.extensionName} — ${G(e.lang)}`,subtitle:e.displayName})),allowReorder:!0,onReorder:Application.Selector(this,`onReorder`)})]}async onReorder(e,t){let n=[...this.sources];if(e<0||e>=n.length||t<0||t>=n.length)return;let[r]=n.splice(e,1);if(r===void 0)return;n.splice(t,0,r);let i=n.map(e=>e.id),a=new Set(i),o=U.searchSourceOrder.map(e=>a.has(e)?i.shift():e);U.searchSourceOrder=[...o,...i],this.sources=n,this.reloadForm()}async loadSources(){this.loading=!0,this.error=void 0,this.reloadForm();try{this.sources=await W()}catch(e){this.error=e instanceof Error?e.message:`Failed to load enabled sources.`}finally{this.loading=!1,this.reloadForm()}}},Ge=class extends x{constructor(...e){super(...e),h(this,`languageOptions`,[]),h(this,`loadingLanguages`,!1),h(this,`languageError`,void 0)}getSections(){return[this.languageSection(),this.installedExtensionsSection(),this.searchSourceOrderSection()]}formWillAppear(){this.loadLanguages()}languageSection(){if(this.loadingLanguages)return q(`sourceLanguages`,`Loading source languages...`);if(this.languageError)return C(`sourceLanguages`,[E(`error`,{title:this.languageError}),j(`retryLanguages`,{title:`Retry`,onSelect:Application.Selector(this,`retryLanguages`)})]);let e=new Set(U.sourceLanguages);return C({id:`sourceLanguages`},[A(`sourceLanguages`,{title:`Source Languages`,layout:`list`,value:Object.fromEntries(U.sourceLanguages.map(e=>[e,`included`])),items:this.languageOptions.toSorted((t,n)=>{if(t.id===`all`)return-1;if(n.id===`all`)return 1;let r=e.has(t.id);return r===e.has(n.id)?t.title.localeCompare(n.title):r?-1:1}),allowExclusion:!1,allowEmptySelection:!0,onValueChange:Application.Selector(this,`onLanguagesChanged`)})])}installedExtensionsSection(){return C({id:`Extensions`},[M(`Extensions`,{title:`Extensions`,form:new Ue})])}searchSourceOrderSection(){return C({id:`SearchSourceOrder`},[M(`SearchSourceOrder`,{title:`Search Source Order`,form:new We})])}async onLanguagesChanged(e){U.sourceLanguages=Object.entries(e).filter(([,e])=>e===`included`).map(([e])=>e),this.reloadForm()}async loadLanguages(){if(!this.loadingLanguages){this.loadingLanguages=!0,this.languageError=void 0,this.reloadForm();try{let e=(await p(U.serverUrl,ge)).sources.nodes.map(e=>e.lang);this.languageOptions=[.../* @__PURE__ */ new Set([...e,...U.sourceLanguages])].filter(e=>e!==`localsourcelang`).map(e=>({id:e,title:G(e)}))}catch(e){this.languageError=e instanceof Error?e.message:`Failed to load source languages.`}finally{this.loadingLanguages=!1,this.reloadForm()}}}async retryLanguages(){await this.loadLanguages()}},Ke=class extends x{constructor(...e){super(...e),h(this,`serverUrl`,U.serverUrl),h(this,`connectionStatus`,void 0)}getSections(){return[this.urlSection(),this.testConnectionSection()]}urlSection(){return C({id:`url`},[D(`url`,{title:`URL`,value:this.serverUrl,onValueChange:Application.Selector(this,`updateServerUrl`)})])}testConnectionSection(){return C({id:`testConnection`},[j(`testConnection`,{title:`Test Connection`,onSelect:Application.Selector(this,`testConnection`)}),E(`connectionStatus`,{title:`Status`,value:this.connectionStatus})])}async updateServerUrl(e){this.serverUrl=e,this.connectionStatus=void 0,U.serverUrl=e}async testConnection(){let e=u(this.serverUrl);if(!/^https?:\/\/[^/\s]+/i.test(e))this.connectionStatus={text:`Enter a valid server URL.`,style:`error`},this.reloadForm();else{try{let t=await p(e,pe);if(typeof t.aboutServer?.version!=`string`)throw Error(`Invalid server version response.`);this.connectionStatus={text:`Connected — Suwayomi ${t.aboutServer.version}`,style:`success`},console.log(`[Suwayomi] Connected to server version ${t.aboutServer.version}`)}catch(e){this.connectionStatus={text:e instanceof Error?e.message:`Connection failed.`,style:`error`},console.error(`[Suwayomi] Connection test failed:`,e)}this.reloadForm()}}},qe=class extends x{getSections(){return[C(`serverConnection`,[M(`serverConnection`,{title:`Server Settings`,form:new Ke}),M(`searchDiscover`,{title:`Search & Discover`,form:new Ge})])]}};function $(e,t){let n=e.trim(),r=Number(n);if(!/^\d+$/.test(n)||r>2147483647)throw Error(`Invalid ${t} ID: ${e}`);return r}return e.Suwayomi=new class{async initialise(){}async getSettingsForm(){return new qe}async getMangaDetails(e){let t=$(e,`manga`),n=U.serverUrl,r=(await p(n,ce,{id:t})).manga,i=Number(r.lastFetchedAt??0)*1e3,a=!Number.isFinite(i)||i<=0||Date.now()-i>=6048e5;if(!r.initialized||a){let e=(await p(n,fe,{id:t})).fetchMangaAndChapters?.manga;if(!e)throw Error(`Failed to refresh manga details for ID ${t}`);r=e}return L(r,n)}async getManagedLibraryCollections(){return(await p(U.serverUrl,oe)).categories.nodes.map(e=>({id:String(e.id),title:e.name||`Default`}))}async commitManagedCollectionChanges(e){let t=U.serverUrl,n=$(e.collection.id,`category`),r=e.additions.map(e=>$(e.mangaId,`manga`)),i=e.deletions.map(e=>$(e.mangaId,`manga`));r.length>0&&await p(t,y,{mangaIds:r,patch:{addToCategories:[n]}}),i.length>0&&await p(t,y,{mangaIds:i,patch:{removeFromCategories:[n]}})}async getSourceMangaInManagedCollection(e){let t=$(e.id,`category`),n=U.serverUrl,{nodes:r,totalCount:i,pageInfo:a}=(await p(n,_,{categoryId:t})).category.mangas;if(a.hasNextPage||r.length<i)throw Error(`Incomplete category: received ${r.length} of ${i} manga`);return r.map(e=>L(e,n))}async getChapters(e){let t=$(e.mangaId,`manga`),n=(await p(U.serverUrl,se,{mangaId:t})).fetchMangaAndChapters;if(!n)throw Error(`Failed to retrieve manga chapters`);let{manga:r,chapters:i}=n,a=K(r.source?.lang);return i.map(t=>b(t,e,a))}async getChapterDetails(e){let t=$(e.chapterId,`chapter`),n=U.serverUrl,r=(await p(n,ne,{chapterId:t})).fetchChapterPages;if(!r)throw Error(`Failed to retrieve chapter pages`);let{pages:i,chapter:a}=r;if(i.length===0)throw Error(`This chapter has no pages`);let o=i.map((e,t)=>d(n,`/api/v1/manga/${a.mangaId}/chapter/${a.sourceOrder}/page/${t}`));return{id:e.chapterId,mangaId:e.sourceManga.mangaId,type:`images`,pages:o}}async getMangaProgressManagementForm(e){return new ke}async getMangaProgress(e){let t=$(e.mangaId,`manga`),{source:n,lastReadChapter:r}=(await p(U.serverUrl,le,{mangaId:t})).manga;if(!r||!r.isRead)return;let i=K(n?.lang),a=Number(r.lastReadAt);return{sourceManga:e,lastReadChapter:b(r,e,i),lastReadTime:Number.isFinite(a)&&a>0?new Date(a):void 0}}async processChapterReadActionQueue(e){let t=[],n=[];for(let r of e)try{let e=$(r.chapterId,`chapter`),n=$(r.sourceManga.mangaId,`manga`),i=(await p(U.serverUrl,ue,{chapterId:e})).updateChapter?.chapter;if(i?.id!==e||i.mangaId!==n||!i.isRead)throw Error(`Chapter read status was not confirmed`);t.push(r.id)}catch(e){console.error(`[Suwayomi] Failed to sync chapter ${r.chapterId}`,e instanceof Error?e.message:String(e)),n.push(r.id)}return{successfulItems:t,failedItems:n}}async getSearchResults(e,t,n){let r=e.metadata;if(!r||typeof r!=`object`||Array.isArray(r)||r.searchModeSelection===void 0||r.searchModeSelection===`simple`)return this.searchSimple(e.title,t);if(r.searchModeSelection!==`source`)throw Error(`Invalid search mode. Open search options and submit again.`);let i=r.sourceId;if(typeof i!=`string`||!i.trim())throw Error(`Select an enabled source before searching.`);let a=r.filterSelectionsBySource;if(a!==void 0&&(!a||typeof a!=`object`||Array.isArray(a)))throw Error(`Saved search filters are invalid. Start a new search.`);let o=V(a?.[i]);return this.searchSource(e.title,i,o,t)}async searchSimple(e,t){function n(){c++,c>=a.length&&(c=0,l++)}let r=u(U.serverUrl),i=e.trim();if(!i)return{items:[],metadata:void 0};let a=await W(),o=JSON.stringify([`simple`,r,i,a.map(e=>e.id)]),s=t;if(s&&(s.kind!==`simple`||s.searchContext!==o||!Array.isArray(s.exhaustedSourceIds)||!s.exhaustedSourceIds.every(e=>typeof e==`string`)||!Number.isInteger(s.sourceIndex)||s.sourceIndex<0||s.sourceIndex>=a.length||!Number.isInteger(s.page)||s.page<1||s.page>2147483647))throw Error(`Search settings changed or pagination is invalid. Start a new search.`);if(a.length===0)return console.warn(`[Suwayomi][Search] No enabled sources available`),{items:[],metadata:void 0};let c=s?.sourceIndex??0,l=s?.page??1,d=new Set(s?.exhaustedSourceIds??[]);for(;a.some(e=>!d.has(e.id));){let e=a[c];if(!e)break;if(d.has(e.id)){n();continue}let t;try{t=await p(r,v,{sourceId:e.id,page:l,query:i})}catch(t){throw console.error(`[Suwayomi][Search] Request failed for ${e.displayName}`,t),t}let s=t.fetchSourceManga;if(!s)throw Error(`No search response from ${e.displayName}`);let u=s.mangas.map(t=>({mangaId:String(t.id),title:t.title,subtitle:`${e.extensionName} (${e.lang})`,imageUrl:f(r,t)}));s.hasNextPage||d.add(e.id),n();let m=a.some(e=>!d.has(e.id))?{kind:`simple`,searchContext:o,sourceIndex:c,page:l,exhaustedSourceIds:[...d]}:void 0;if(u.length>0)return{items:u,metadata:m}}return{items:[],metadata:void 0}}async searchSource(e,t,n,r){let i=u(U.serverUrl),a=e.trim(),o=De(n),s=(await W()).find(e=>e.id===t);if(!s)throw Error(`The selected source is no longer enabled or installed. Choose a source in search options.`);let c=JSON.stringify([`source`,i,a,t,o]),l=r;if(l&&(l.kind!==`source`||l.searchContext!==c||!Number.isInteger(l.page)||l.page<1||l.page>2147483647))throw Error(`Search settings changed or pagination is invalid. Start a new search.`);let d=l?.page??1;for(;;){let e=(await p(i,v,{sourceId:t,page:d,query:a,filters:o})).fetchSourceManga;if(!e)throw Error(`No search response from ${s.displayName}`);let n=e.mangas.map(e=>({mangaId:String(e.id),title:e.title,subtitle:`${s.extensionName} (${s.lang})`,imageUrl:f(i,e)})),r=e.hasNextPage?{kind:`source`,searchContext:c,page:d+1}:void 0;if(n.length>0||!e.hasNextPage)return{items:n,metadata:r};d++}}async getAdvancedSearchForm(e){return new Fe(e)}},e})({});