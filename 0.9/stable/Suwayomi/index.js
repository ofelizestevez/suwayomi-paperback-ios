var source=(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:`Module`});var t=Object.create,n=Object.defineProperty,r=Object.getOwnPropertyDescriptor,i=Object.getOwnPropertyNames,a=Object.getPrototypeOf,o=Object.prototype.hasOwnProperty,s=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports),c=(e,t,a,s)=>{if(t&&typeof t==`object`||typeof t==`function`)for(var c=i(t),l=0,u=c.length,d;l<u;l++)d=c[l],!o.call(e,d)&&d!==a&&n(e,d,{get:(e=>t[e]).bind(null,d),enumerable:!(s=r(t,d))||s.enumerable});return e},l=(e,r,i)=>(i=e==null?{}:t(a(e)),c(r||!e||!e.__esModule||!o.call(e,`default`)?n(i,`default`,{value:e,enumerable:!0}):i,e));async function u(e,t,n){let r=e.trim().replace(/\/+$/,``),[i,a]=await Application.scheduleRequest({url:`${r}/api/graphql`,method:`POST`,headers:{"Content-Type":`application/json`,Accept:`application/json`},body:JSON.stringify({query:t.toString(),variables:n})});if(i.status===401||i.status===403)throw Error(`Authentication is required or access was denied.`);if(i.status<200||i.status>=300)throw Error(`Server returned HTTP ${i.status}`);let o;try{o=JSON.parse(Application.arrayBufferToUTF8String(a))}catch{throw Error(`The server did not return valid JSON.`)}if(o.errors?.length)throw Error(o.errors.map(e=>e.message).join(`; `));if(!o.data)throw Error(`The GraphQL response contains no data.`);return o.data}function d(e){"@babel/helpers - typeof";return d=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},d(e)}function f(e,t){if(d(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t||`default`);if(d(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}function p(e){var t=f(e,`string`);return d(t)==`symbol`?t:t+``}function m(e,t,n){return(t=p(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var h=class extends String{constructor(e,t){super(e),m(this,`__apiType`,void 0),m(this,`value`,void 0),m(this,`__meta__`,void 0),this.value=e,this.__meta__=t}toString(){return this.value}};let g=new h(`
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
    `),_=new h(`
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
    `),v=new h(`
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
    `),y=new h(`
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
    `),b=new h(`
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
    `),x=new h(`
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
    `),S=new h(`
    mutation MarkChapterRead($chapterId: Int!) {
  updateChapter(input: { id: $chapterId, patch: { isRead: true } }) {
    chapter {
      id
      mangaId
      isRead
    }
  }
}
    `),C=new h(`
    query ServerVersion {
  aboutServer {
    name
    version
  }
}
    `),w=new h(`
    query SourceLanguages {
  sources {
    nodes {
      id
      lang
    }
  }
}
    `);function T(e,t,n){let r=Number(e.uploadDate);return{chapterId:String(e.id),sourceManga:t,langCode:n,chapNum:e.chapterNumber,title:e.name,sortingIndex:e.sourceOrder,publishDate:Number.isFinite(r)&&r>0?new Date(r):void 0,additionalInfo:e.scanlator?{Scanlator:e.scanlator}:void 0}}var E=class{constructor(){m(this,`requiresExplicitSubmission`,!1)}reloadForm(){let e=this.__underlying_formId;e&&Application.formDidChange(e)}};function D(e,t,n){return e[`__closure_selector-`+t]=n,Application.Selector(e,`__closure_selector-`+t)}function O(e,t){let n;return n=typeof e==`string`?{id:e}:e,{type:`listSection`,...n,items:t.filter(e=>e),allowAddition:!1,allowDeletion:!1,allowReorder:!1}}function k(e,t){let n;return n=typeof e==`string`?{id:e}:e,{type:`flowSection`,...n,items:t.filter(e=>e)}}function A(e,t){let n=Object.keys(t.value).length;return(t.layout==`flow`?k:O)({id:t.id,header:t.header,footer:t.footer},t.items.map(r=>{let i=t.value[r.id],a,o;switch(i){case`included`:t.layout==`flow`?(o=`success`,a=void 0):(o=void 0,a={symbol:`checkmark`,style:`success`});break;case`excluded`:t.layout==`flow`?(o=`error`,a=void 0):(o=void 0,a={symbol:`xmark`,style:`error`});break;default:a=void 0,o=void 0}return j(r.id,{style:o,title:r.title,value:a,onSelect:D(e,`__multiselect_${t.id}#${r.id}`,async()=>{let a,o=!t.maximum||n<t.maximum,s=t.allowEmptySelection&&n==1||n>1;switch(i){case`included`:if(t.allowExclusion){a=`excluded`;break}if(s){a=void 0;break}return;case`excluded`:if(s){a=void 0;break}return;case void 0:if(o){a=`included`;break}return}a==null?delete t.value[r.id]:t.value[r.id]=a,t.onValueChange&&await Application.SelectorRegistry.selector(t.onValueChange)(),e.reloadForm()})})}))}function j(e,t){return{...t,id:e,type:`labelRow`,isHidden:t.isHidden??!1,isSelectable:t.onSelect!=null}}function M(e,t){return{...t,id:e,type:`inputRow`,isHidden:t.isHidden??!1}}function N(e,t){return F(e,{form:new I(t.title,t),title:t.title,subtitle:t.subtitle,value:`${Object.keys(t.value).length} items`,isHidden:t.isHidden})}function P(e,t){return{...t,id:e,type:`buttonRow`,isHidden:t.isHidden??!1}}function F(e,t){return{...t,id:e,type:`navigationRow`,isHidden:t.isHidden??!1}}var I=class extends E{constructor(e,t){super(),m(this,`title`,void 0),m(this,`params`,void 0),m(this,`states`,{}),m(this,`requiresExplicitSubmission`,!0),this.title=e,this.params=t,this.states={...t.value}}getSections(){return[A(this,{id:`multiselect`,value:this.states,items:this.params.items,allowExclusion:this.params.allowExclusion,allowEmptySelection:this.params.allowEmptySelection,maximum:this.params.maximum,layout:this.params.layout})]}async formDidSubmit(){await Application.SelectorRegistry.selector(this.params.onValueChange)(this.states)}},L;(function(e){e[e.NONE=0]=`NONE`,e[e.MANGA_CHAPTERS=1]=`MANGA_CHAPTERS`,e[e.CHAPTER_PROVIDING=1]=`CHAPTER_PROVIDING`,e[e.MANGA_PROGRESS=2]=`MANGA_PROGRESS`,e[e.MANGA_PROGRESS_PROVIDING=2]=`MANGA_PROGRESS_PROVIDING`,e[e.PROGRESS_PROVIDING=2]=`PROGRESS_PROVIDING`,e[e.DISCOVER_SECIONS=4]=`DISCOVER_SECIONS`,e[e.DISCOVER_SECIONS_PROVIDING=4]=`DISCOVER_SECIONS_PROVIDING`,e[e.DISCOVER_SECTION_PROVIDING=4]=`DISCOVER_SECTION_PROVIDING`,e[e.COLLECTION_MANAGEMENT=8]=`COLLECTION_MANAGEMENT`,e[e.MANAGED_COLLECTION_PROVIDING=8]=`MANAGED_COLLECTION_PROVIDING`,e[e.CLOUDFLARE_BYPASS_REQUIRED=16]=`CLOUDFLARE_BYPASS_REQUIRED`,e[e.CLOUDFLARE_BYPASS_PROVIDING=16]=`CLOUDFLARE_BYPASS_PROVIDING`,e[e.SETTINGS_UI=32]=`SETTINGS_UI`,e[e.SETTINGS_FORM_PROVIDING=32]=`SETTINGS_FORM_PROVIDING`,e[e.MANGA_SEARCH=64]=`MANGA_SEARCH`,e[e.SEARCH_RESULTS_PROVIDING=64]=`SEARCH_RESULTS_PROVIDING`,e[e.SEARCH_RESULT_PROVIDING=64]=`SEARCH_RESULT_PROVIDING`})(L||(L={}));var R;(function(e){e.EVERYONE=`SAFE`,e.MATURE=`MATURE`,e.ADULT=`ADULT`})(R||(R={}));var z;(function(e){e[e.featured=0]=`featured`,e[e.simpleCarousel=1]=`simpleCarousel`,e[e.prominentCarousel=2]=`prominentCarousel`,e[e.chapterUpdates=3]=`chapterUpdates`,e[e.genres=4]=`genres`})(z||(z={})),Object.freeze({items:[],metadata:void 0});var B=/* @__PURE__ */ l((/* @__PURE__ */ s(((e,t)=>{(function(n,r,i){typeof e==`object`?(t.exports=i(),t.exports.default=i()):typeof define==`function`&&define.amd?define(i):r[n]=i()})(`slugify`,e,function(){var e=JSON.parse(`{"$":"dollar","%":"percent","&":"and","<":"less",">":"greater","|":"or","¢":"cent","£":"pound","¤":"currency","¥":"yen","©":"(c)","ª":"a","®":"(r)","º":"o","À":"A","Á":"A","Â":"A","Ã":"A","Ä":"A","Å":"A","Æ":"AE","Ç":"C","È":"E","É":"E","Ê":"E","Ë":"E","Ì":"I","Í":"I","Î":"I","Ï":"I","Ð":"D","Ñ":"N","Ò":"O","Ó":"O","Ô":"O","Õ":"O","Ö":"O","Ø":"O","Ù":"U","Ú":"U","Û":"U","Ü":"U","Ý":"Y","Þ":"TH","ß":"ss","à":"a","á":"a","â":"a","ã":"a","ä":"a","å":"a","æ":"ae","ç":"c","è":"e","é":"e","ê":"e","ë":"e","ì":"i","í":"i","î":"i","ï":"i","ð":"d","ñ":"n","ò":"o","ó":"o","ô":"o","õ":"o","ö":"o","ø":"o","ù":"u","ú":"u","û":"u","ü":"u","ý":"y","þ":"th","ÿ":"y","Ā":"A","ā":"a","Ă":"A","ă":"a","Ą":"A","ą":"a","Ć":"C","ć":"c","Č":"C","č":"c","Ď":"D","ď":"d","Đ":"DJ","đ":"dj","Ē":"E","ē":"e","Ė":"E","ė":"e","Ę":"e","ę":"e","Ě":"E","ě":"e","Ğ":"G","ğ":"g","Ģ":"G","ģ":"g","Ĩ":"I","ĩ":"i","Ī":"i","ī":"i","Į":"I","į":"i","İ":"I","ı":"i","Ķ":"k","ķ":"k","Ļ":"L","ļ":"l","Ľ":"L","ľ":"l","Ł":"L","ł":"l","Ń":"N","ń":"n","Ņ":"N","ņ":"n","Ň":"N","ň":"n","Ō":"O","ō":"o","Ő":"O","ő":"o","Œ":"OE","œ":"oe","Ŕ":"R","ŕ":"r","Ř":"R","ř":"r","Ś":"S","ś":"s","Ş":"S","ş":"s","Š":"S","š":"s","Ţ":"T","ţ":"t","Ť":"T","ť":"t","Ũ":"U","ũ":"u","Ū":"u","ū":"u","Ů":"U","ů":"u","Ű":"U","ű":"u","Ų":"U","ų":"u","Ŵ":"W","ŵ":"w","Ŷ":"Y","ŷ":"y","Ÿ":"Y","Ź":"Z","ź":"z","Ż":"Z","ż":"z","Ž":"Z","ž":"z","Ə":"E","ƒ":"f","Ơ":"O","ơ":"o","Ư":"U","ư":"u","ǈ":"LJ","ǉ":"lj","ǋ":"NJ","ǌ":"nj","Ș":"S","ș":"s","Ț":"T","ț":"t","ə":"e","˚":"o","Ά":"A","Έ":"E","Ή":"H","Ί":"I","Ό":"O","Ύ":"Y","Ώ":"W","ΐ":"i","Α":"A","Β":"B","Γ":"G","Δ":"D","Ε":"E","Ζ":"Z","Η":"H","Θ":"8","Ι":"I","Κ":"K","Λ":"L","Μ":"M","Ν":"N","Ξ":"3","Ο":"O","Π":"P","Ρ":"R","Σ":"S","Τ":"T","Υ":"Y","Φ":"F","Χ":"X","Ψ":"PS","Ω":"W","Ϊ":"I","Ϋ":"Y","ά":"a","έ":"e","ή":"h","ί":"i","ΰ":"y","α":"a","β":"b","γ":"g","δ":"d","ε":"e","ζ":"z","η":"h","θ":"8","ι":"i","κ":"k","λ":"l","μ":"m","ν":"n","ξ":"3","ο":"o","π":"p","ρ":"r","ς":"s","σ":"s","τ":"t","υ":"y","φ":"f","χ":"x","ψ":"ps","ω":"w","ϊ":"i","ϋ":"y","ό":"o","ύ":"y","ώ":"w","Ё":"Yo","Ђ":"DJ","Є":"Ye","І":"I","Ї":"Yi","Ј":"J","Љ":"LJ","Њ":"NJ","Ћ":"C","Џ":"DZ","А":"A","Б":"B","В":"V","Г":"G","Д":"D","Е":"E","Ж":"Zh","З":"Z","И":"I","Й":"J","К":"K","Л":"L","М":"M","Н":"N","О":"O","П":"P","Р":"R","С":"S","Т":"T","У":"U","Ф":"F","Х":"H","Ц":"C","Ч":"Ch","Ш":"Sh","Щ":"Sh","Ъ":"U","Ы":"Y","Ь":"","Э":"E","Ю":"Yu","Я":"Ya","а":"a","б":"b","в":"v","г":"g","д":"d","е":"e","ж":"zh","з":"z","и":"i","й":"j","к":"k","л":"l","м":"m","н":"n","о":"o","п":"p","р":"r","с":"s","т":"t","у":"u","ф":"f","х":"h","ц":"c","ч":"ch","ш":"sh","щ":"sh","ъ":"u","ы":"y","ь":"","э":"e","ю":"yu","я":"ya","ё":"yo","ђ":"dj","є":"ye","і":"i","ї":"yi","ј":"j","љ":"lj","њ":"nj","ћ":"c","ѝ":"u","џ":"dz","Ґ":"G","ґ":"g","Ғ":"GH","ғ":"gh","Қ":"KH","қ":"kh","Ң":"NG","ң":"ng","Ү":"UE","ү":"ue","Ұ":"U","ұ":"u","Һ":"H","һ":"h","Ә":"AE","ә":"ae","Ө":"OE","ө":"oe","Ա":"A","Բ":"B","Գ":"G","Դ":"D","Ե":"E","Զ":"Z","Է":"E'","Ը":"Y'","Թ":"T'","Ժ":"JH","Ի":"I","Լ":"L","Խ":"X","Ծ":"C'","Կ":"K","Հ":"H","Ձ":"D'","Ղ":"GH","Ճ":"TW","Մ":"M","Յ":"Y","Ն":"N","Շ":"SH","Չ":"CH","Պ":"P","Ջ":"J","Ռ":"R'","Ս":"S","Վ":"V","Տ":"T","Ր":"R","Ց":"C","Փ":"P'","Ք":"Q'","Օ":"O''","Ֆ":"F","և":"EV","ء":"a","آ":"aa","أ":"a","ؤ":"u","إ":"i","ئ":"e","ا":"a","ب":"b","ة":"h","ت":"t","ث":"th","ج":"j","ح":"h","خ":"kh","د":"d","ذ":"th","ر":"r","ز":"z","س":"s","ش":"sh","ص":"s","ض":"dh","ط":"t","ظ":"z","ع":"a","غ":"gh","ف":"f","ق":"q","ك":"k","ل":"l","م":"m","ن":"n","ه":"h","و":"w","ى":"a","ي":"y","ً":"an","ٌ":"on","ٍ":"en","َ":"a","ُ":"u","ِ":"e","ْ":"","٠":"0","١":"1","٢":"2","٣":"3","٤":"4","٥":"5","٦":"6","٧":"7","٨":"8","٩":"9","پ":"p","چ":"ch","ژ":"zh","ک":"k","گ":"g","ی":"y","۰":"0","۱":"1","۲":"2","۳":"3","۴":"4","۵":"5","۶":"6","۷":"7","۸":"8","۹":"9","฿":"baht","ა":"a","ბ":"b","გ":"g","დ":"d","ე":"e","ვ":"v","ზ":"z","თ":"t","ი":"i","კ":"k","ლ":"l","მ":"m","ნ":"n","ო":"o","პ":"p","ჟ":"zh","რ":"r","ს":"s","ტ":"t","უ":"u","ფ":"f","ქ":"k","ღ":"gh","ყ":"q","შ":"sh","ჩ":"ch","ც":"ts","ძ":"dz","წ":"ts","ჭ":"ch","ხ":"kh","ჯ":"j","ჰ":"h","Ṣ":"S","ṣ":"s","Ẁ":"W","ẁ":"w","Ẃ":"W","ẃ":"w","Ẅ":"W","ẅ":"w","ẞ":"SS","Ạ":"A","ạ":"a","Ả":"A","ả":"a","Ấ":"A","ấ":"a","Ầ":"A","ầ":"a","Ẩ":"A","ẩ":"a","Ẫ":"A","ẫ":"a","Ậ":"A","ậ":"a","Ắ":"A","ắ":"a","Ằ":"A","ằ":"a","Ẳ":"A","ẳ":"a","Ẵ":"A","ẵ":"a","Ặ":"A","ặ":"a","Ẹ":"E","ẹ":"e","Ẻ":"E","ẻ":"e","Ẽ":"E","ẽ":"e","Ế":"E","ế":"e","Ề":"E","ề":"e","Ể":"E","ể":"e","Ễ":"E","ễ":"e","Ệ":"E","ệ":"e","Ỉ":"I","ỉ":"i","Ị":"I","ị":"i","Ọ":"O","ọ":"o","Ỏ":"O","ỏ":"o","Ố":"O","ố":"o","Ồ":"O","ồ":"o","Ổ":"O","ổ":"o","Ỗ":"O","ỗ":"o","Ộ":"O","ộ":"o","Ớ":"O","ớ":"o","Ờ":"O","ờ":"o","Ở":"O","ở":"o","Ỡ":"O","ỡ":"o","Ợ":"O","ợ":"o","Ụ":"U","ụ":"u","Ủ":"U","ủ":"u","Ứ":"U","ứ":"u","Ừ":"U","ừ":"u","Ử":"U","ử":"u","Ữ":"U","ữ":"u","Ự":"U","ự":"u","Ỳ":"Y","ỳ":"y","Ỵ":"Y","ỵ":"y","Ỷ":"Y","ỷ":"y","Ỹ":"Y","ỹ":"y","–":"-","‘":"'","’":"'","“":"\\"","”":"\\"","„":"\\"","†":"+","•":"*","…":"...","₠":"ecu","₢":"cruzeiro","₣":"french franc","₤":"lira","₥":"mill","₦":"naira","₧":"peseta","₨":"rupee","₩":"won","₪":"new shequel","₫":"dong","€":"euro","₭":"kip","₮":"tugrik","₯":"drachma","₰":"penny","₱":"peso","₲":"guarani","₳":"austral","₴":"hryvnia","₵":"cedi","₸":"kazakhstani tenge","₹":"indian rupee","₺":"turkish lira","₽":"russian ruble","₿":"bitcoin","℠":"sm","™":"tm","∂":"d","∆":"delta","∑":"sum","∞":"infinity","♥":"love","元":"yuan","円":"yen","﷼":"rial","ﻵ":"laa","ﻷ":"laa","ﻹ":"lai","ﻻ":"la"}`),t=JSON.parse(`{"bg":{"Й":"Y","Ц":"Ts","Щ":"Sht","Ъ":"A","Ь":"Y","й":"y","ц":"ts","щ":"sht","ъ":"a","ь":"y"},"de":{"Ä":"AE","ä":"ae","Ö":"OE","ö":"oe","Ü":"UE","ü":"ue","ß":"ss","%":"prozent","&":"und","|":"oder","∑":"summe","∞":"unendlich","♥":"liebe"},"es":{"%":"por ciento","&":"y","<":"menor que",">":"mayor que","|":"o","¢":"centavos","£":"libras","¤":"moneda","₣":"francos","∑":"suma","∞":"infinito","♥":"amor"},"fr":{"%":"pourcent","&":"et","<":"plus petit",">":"plus grand","|":"ou","¢":"centime","£":"livre","¤":"devise","₣":"franc","∑":"somme","∞":"infini","♥":"amour"},"pt":{"%":"porcento","&":"e","<":"menor",">":"maior","|":"ou","¢":"centavo","∑":"soma","£":"libra","∞":"infinito","♥":"amor"},"uk":{"И":"Y","и":"y","Й":"Y","й":"y","Ц":"Ts","ц":"ts","Х":"Kh","х":"kh","Щ":"Shch","щ":"shch","Г":"H","г":"h"},"vi":{"Đ":"D","đ":"d"},"da":{"Ø":"OE","ø":"oe","Å":"AA","å":"aa","%":"procent","&":"og","|":"eller","$":"dollar","<":"mindre end",">":"større end"},"nb":{"&":"og","Å":"AA","Æ":"AE","Ø":"OE","å":"aa","æ":"ae","ø":"oe"},"it":{"&":"e"},"nl":{"&":"en"},"sv":{"&":"och","Å":"AA","Ä":"AE","Ö":"OE","å":"aa","ä":"ae","ö":"oe"}}`);function n(n,r){if(typeof n!=`string`)throw Error(`slugify: string argument expected`);r=typeof r==`string`?{replacement:r}:r||{};var i=t[r.locale]||{},a=r.replacement===void 0?`-`:r.replacement,o=r.trim===void 0||r.trim,s=n.normalize().split(``).reduce(function(t,n){var o=i[n];return o===void 0&&(o=e[n]),o===void 0&&(o=n),o===a&&(o=` `),t+o.replace(r.remove||/[^\w\s$*_+~.()'"!\-:@]+/g,``)},``);return r.strict&&(s=s.replace(/[^A-Za-z0-9\s]/g,``)),o&&(s=s.trim()),s=s.replace(/\s+/g,a),r.lower&&(s=s.toLowerCase()),s}return n.extend=function(t){Object.assign(e,t)},n})})))(),1);function V(e,t){return{mangaId:String(e.id),mangaInfo:{primaryTitle:e.title,secondaryTitles:[],synopsis:e.description??``,tagGroups:[{id:`genres`,title:`Genres`,tags:e.genre.map(e=>({id:(0,B.default)(e,{lower:!0,strict:!0}),title:e}))}],contentRating:R.EVERYONE,contentType:`comic`,status:e.status,artist:e.artist??void 0,author:e.author??void 0,thumbnailUrl:t+e.thumbnailUrl,shareUrl:t+`/manga/`+e.id}}}let H={serverUrl:`suwayomi.serverUrl`,sourceLanguages:`suwayomi.sourceLanguages`},U={get serverUrl(){let e=Application.getState(H.serverUrl);return typeof e==`string`?e:``},set serverUrl(e){Application.setState(e,H.serverUrl)},get sourceLanguages(){return Application.getState(H.sourceLanguages)??[`en`,`all`]},set sourceLanguages(e){Application.setState(e,H.sourceLanguages)}};var W=class extends E{getSections(){return[O({id:`progress`,header:`Suwayomi Reading Progress`,footer:`Completed chapter reading actions are synchronized with your Suwayomi server.`},[j(`syncStatus`,{title:`Progress Provider`,value:`Suwayomi`})])]}};function G(e){if(e===`all`)return`Multi-language`;if(e===`localsourcelang`)return`Local Source`;try{return new Intl.DisplayNames([`en`],{type:`language`}).of(e)??e}catch{return e}}var K=class extends E{constructor(...e){super(...e),m(this,`languages`,[])}getSections(){return[this.languageSection()]}formWillAppear(){this.loadLanguages()}languageSection(){let e=new Set(U.sourceLanguages);return O({id:`sourceLanguages`},[N(`sourceLanguages`,{title:`Source Languages`,layout:`list`,value:Object.fromEntries(U.sourceLanguages.map(e=>[e,`included`])),items:[...this.languages].sort((t,n)=>{if(t.id===`all`)return-1;if(n.id===`all`)return 1;let r=e.has(t.id);return r===e.has(n.id)?t.title.localeCompare(n.title):r?-1:1}),allowExclusion:!1,allowEmptySelection:!0,onValueChange:Application.Selector(this,`onLanguagesChanged`)})])}async onLanguagesChanged(e){U.sourceLanguages=Object.entries(e).filter(([,e])=>e===`included`).map(([e])=>e),this.reloadForm()}async loadLanguages(){try{let e=(await u(U.serverUrl,w)).sources.nodes.map(e=>e.lang);this.languages=[.../* @__PURE__ */ new Set([...e,...U.sourceLanguages])].filter(e=>e!==`localsourcelang`).map(e=>({id:e,title:G(e)})),this.reloadForm()}catch(e){console.error(`Failed to load source languages:`,e)}}},q=class extends E{constructor(...e){super(...e),m(this,`serverUrl`,U.serverUrl),m(this,`connectionStatus`,void 0)}getSections(){return[this.urlSection(),this.testConnectionSection()]}urlSection(){return O({id:`url`},[M(`url`,{title:`URL`,value:this.serverUrl,onValueChange:Application.Selector(this,`updateServerUrl`)})])}testConnectionSection(){return O({id:`testConnection`},[P(`textConnection`,{title:`Test Connection`,onSelect:Application.Selector(this,`testConnection`)}),j(`connectionStatus`,{title:`Status`,value:this.connectionStatus})])}async updateServerUrl(e){this.serverUrl=e,this.connectionStatus=void 0,U.serverUrl=e,this.testConnection()}async testConnection(){let e=this.serverUrl.trim();if(!/^https?:\/\/[^/\s]+/i.test(e))this.connectionStatus={text:`Enter a valid server URL.`,style:`error`},this.reloadForm();else{try{let t=await u(e,C);if(typeof t.aboutServer?.version!=`string`)throw Error(`Invalid server version response.`);this.connectionStatus={text:`Connected — Suwayomi ${t.aboutServer.version}`,style:`success`},console.log(`[Suwayomi] Connected to server version ${t.aboutServer.version}`)}catch(e){this.connectionStatus={text:e instanceof Error?e.message:`Connection failed.`,style:`error`},console.error(`[Suwayomi] Connection test failed:`,e)}this.reloadForm()}}},J=class extends E{getSections(){return[O(`serverConnection`,[F(`serverConnection`,{title:`Server Settings`,form:new q}),F(`searchDiscover`,{title:`Search & Discover`,form:new K})])]}};return e.Suwayomi=new class{async initialise(){}async getSettingsForm(){return new J}async getMangaDetails(e){let t=Number(e);if(!Number.isSafeInteger(t)||t<0)throw Error(`Invalid manga ID: ${e}`);let n=U.serverUrl;return V((await u(n,b,{id:t})).manga,n)}async getManagedLibraryCollections(){return(await u(U.serverUrl,_)).categories.nodes.map(e=>({id:String(e.id),title:e.name||`Default`}))}commitManagedCollectionChanges(e){throw Error(`Method not implemented.`)}async getSourceMangaInManagedCollection(e){let t=Number(e.id),{nodes:n,totalCount:r,pageInfo:i}=(await u(U.serverUrl,v,{categoryId:t})).category.mangas;if(i.hasNextPage||n.length<r)throw Error(`Incomplete category: received ${n.length} of ${r} manga`);return n.map(e=>V(e,U.serverUrl))}async getChapters(e){let t=Number(e.mangaId),n=(await u(U.serverUrl,y,{mangaId:t})).fetchMangaAndChapters;if(!n)throw Error(`Failed to retrieve manga chapters`);let{manga:r,chapters:i}=n,a=r.source?.lang&&r.source.lang!==`all`?r.source.lang:`und`;return i.map(t=>T(t,e,a))}async getChapterDetails(e){let t=Number(e.chapterId);if(!Number.isSafeInteger(t)||t<0)throw Error(`Invalid chapter ID: ${e.chapterId}`);let n=(await u(U.serverUrl,g,{chapterId:t})).fetchChapterPages;if(!n)throw Error(`Failed to retrieve chapter pages`);let{pages:r,chapter:i}=n;if(r.length===0)throw Error(`This chapter has no pages`);let a=U.serverUrl.trim().replace(/\/+$/,``),o=r.map((e,t)=>`${a}/api/v1/manga/${i.mangaId}/chapter/${i.sourceOrder}/page/${t}`);return{id:e.chapterId,mangaId:e.sourceManga.mangaId,type:`images`,pages:o}}async getMangaProgressManagementForm(e){return new W}async getMangaProgress(e){let t=Number(e.mangaId),{source:n,lastReadChapter:r}=(await u(U.serverUrl,x,{mangaId:t})).manga;if(!r||!r.isRead)return;let i=n?.lang&&n.lang!==`all`?n.lang:`und`,a=Number(r.lastReadAt);return{sourceManga:e,lastReadChapter:T(r,e,i),lastReadTime:Number.isFinite(a)&&a>0?new Date(a):void 0}}async processChapterReadActionQueue(e){let t=[],n=[];for(let r of e)try{let e=Number(r.chapterId),n=Number(r.sourceManga.mangaId);if(!Number.isSafeInteger(e)||!Number.isSafeInteger(n)||e<0||n<0)throw Error(`Invalid chapter or manga ID`);let i=(await u(U.serverUrl,S,{chapterId:e})).updateChapter?.chapter;if(i?.id!==e||i.mangaId!==n||!i.isRead)throw Error(`Chapter read status was not confirmed`);t.push(r.id)}catch(e){console.error(`[Suwayomi] Failed to sync chapter ${r.chapterId}`,e instanceof Error?e.message:String(e)),n.push(r.id)}return{successfulItems:t,failedItems:n}}},e})({});