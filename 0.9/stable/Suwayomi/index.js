var source=(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:`Module`});var t=Object.create,n=Object.defineProperty,r=Object.getOwnPropertyDescriptor,i=Object.getOwnPropertyNames,a=Object.getPrototypeOf,o=Object.prototype.hasOwnProperty,s=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports),c=(e,t,a,s)=>{if(t&&typeof t==`object`||typeof t==`function`)for(var c=i(t),l=0,u=c.length,d;l<u;l++)d=c[l],!o.call(e,d)&&d!==a&&n(e,d,{get:(e=>t[e]).bind(null,d),enumerable:!(s=r(t,d))||s.enumerable});return e},l=(e,r,i)=>(i=e==null?{}:t(a(e)),c(r||!e||!e.__esModule||!o.call(e,`default`)?n(i,`default`,{value:e,enumerable:!0}):i,e));function u(e){"@babel/helpers - typeof";return u=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},u(e)}function d(e,t){if(u(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t||`default`);if(u(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}function f(e){var t=d(e,`string`);return u(t)==`symbol`?t:t+``}function p(e,t,n){return(t=f(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var m=class{constructor(){p(this,`requiresExplicitSubmission`,!1)}reloadForm(){let e=this.__underlying_formId;e&&Application.formDidChange(e)}};function h(e,t){let n;return n=typeof e==`string`?{id:e}:e,{type:`listSection`,...n,items:t.filter(e=>e),allowAddition:!1,allowDeletion:!1,allowReorder:!1}}function g(e,t){return{...t,id:e,type:`labelRow`,isHidden:t.isHidden??!1,isSelectable:t.onSelect!=null}}function _(e,t){return{...t,id:e,type:`inputRow`,isHidden:t.isHidden??!1}}function v(e,t){return{...t,id:e,type:`buttonRow`,isHidden:t.isHidden??!1}}function y(e,t){return{...t,id:e,type:`navigationRow`,isHidden:t.isHidden??!1}}var b;(function(e){e[e.NONE=0]=`NONE`,e[e.MANGA_CHAPTERS=1]=`MANGA_CHAPTERS`,e[e.CHAPTER_PROVIDING=1]=`CHAPTER_PROVIDING`,e[e.MANGA_PROGRESS=2]=`MANGA_PROGRESS`,e[e.MANGA_PROGRESS_PROVIDING=2]=`MANGA_PROGRESS_PROVIDING`,e[e.PROGRESS_PROVIDING=2]=`PROGRESS_PROVIDING`,e[e.DISCOVER_SECIONS=4]=`DISCOVER_SECIONS`,e[e.DISCOVER_SECIONS_PROVIDING=4]=`DISCOVER_SECIONS_PROVIDING`,e[e.DISCOVER_SECTION_PROVIDING=4]=`DISCOVER_SECTION_PROVIDING`,e[e.COLLECTION_MANAGEMENT=8]=`COLLECTION_MANAGEMENT`,e[e.MANAGED_COLLECTION_PROVIDING=8]=`MANAGED_COLLECTION_PROVIDING`,e[e.CLOUDFLARE_BYPASS_REQUIRED=16]=`CLOUDFLARE_BYPASS_REQUIRED`,e[e.CLOUDFLARE_BYPASS_PROVIDING=16]=`CLOUDFLARE_BYPASS_PROVIDING`,e[e.SETTINGS_UI=32]=`SETTINGS_UI`,e[e.SETTINGS_FORM_PROVIDING=32]=`SETTINGS_FORM_PROVIDING`,e[e.MANGA_SEARCH=64]=`MANGA_SEARCH`,e[e.SEARCH_RESULTS_PROVIDING=64]=`SEARCH_RESULTS_PROVIDING`,e[e.SEARCH_RESULT_PROVIDING=64]=`SEARCH_RESULT_PROVIDING`})(b||(b={}));var x;(function(e){e.EVERYONE=`SAFE`,e.MATURE=`MATURE`,e.ADULT=`ADULT`})(x||(x={}));var S;(function(e){e[e.featured=0]=`featured`,e[e.simpleCarousel=1]=`simpleCarousel`,e[e.prominentCarousel=2]=`prominentCarousel`,e[e.chapterUpdates=3]=`chapterUpdates`,e[e.genres=4]=`genres`})(S||(S={})),Object.freeze({items:[],metadata:void 0});async function C(e,t,n){let r=e.trim().replace(/\/+$/,``),[i,a]=await Application.scheduleRequest({url:`${r}/api/graphql`,method:`POST`,headers:{"Content-Type":`application/json`,Accept:`application/json`},body:JSON.stringify({query:t.toString(),variables:n})});if(i.status===401||i.status===403)throw Error(`Authentication is required or access was denied.`);if(i.status<200||i.status>=300)throw Error(`Server returned HTTP ${i.status}`);let o;try{o=JSON.parse(Application.arrayBufferToUTF8String(a))}catch{throw Error(`The server did not return valid JSON.`)}if(o.errors?.length)throw Error(o.errors.map(e=>e.message).join(`; `));if(!o.data)throw Error(`The GraphQL response contains no data.`);return o.data}var w=class extends String{constructor(e,t){super(e),p(this,`__apiType`,void 0),p(this,`value`,void 0),p(this,`__meta__`,void 0),this.value=e,this.__meta__=t}toString(){return this.value}};let T=new w(`
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
    `),E=new w(`
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
    `),D=new w(`
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
    `),O=new w(`
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
    `),k=new w(`
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
    `),A=new w(`
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
    `),j=new w(`
    mutation MarkChapterRead($chapterId: Int!) {
  updateChapter(input: { id: $chapterId, patch: { isRead: true } }) {
    chapter {
      id
      mangaId
      isRead
    }
  }
}
    `),M=new w(`
    query ServerVersion {
  aboutServer {
    name
    version
  }
}
    `),N={serverUrl:`suwayomi.serverUrl`,showRecentlyUpdated:`suwayomi.showRecentlyUpdated`,showContinueReading:`suwayomi.showContinueReading`},P={get serverUrl(){let e=Application.getState(N.serverUrl);return typeof e==`string`?e:``},set serverUrl(e){Application.setState(e,N.serverUrl)}};var F=class extends m{constructor(...e){super(...e),p(this,`serverUrl`,P.serverUrl),p(this,`connectionStatus`,void 0)}getSections(){return[this.urlSection(),this.testConnectionSection()]}urlSection(){return h({id:`url`},[_(`url`,{title:`URL`,value:this.serverUrl,onValueChange:Application.Selector(this,`updateServerUrl`)})])}testConnectionSection(){return h({id:`testConnection`},[v(`textConnection`,{title:`Test Connection`,onSelect:Application.Selector(this,`testConnection`)}),g(`connectionStatus`,{title:`Status`,value:this.connectionStatus})])}async updateServerUrl(e){this.serverUrl=e,this.connectionStatus=void 0,P.serverUrl=e,this.testConnection()}async testConnection(){let e=this.serverUrl.trim();if(!/^https?:\/\/[^/\s]+/i.test(e))this.connectionStatus={text:`Enter a valid server URL.`,style:`error`},this.reloadForm();else{try{let t=await C(e,M);if(typeof t.aboutServer?.version!=`string`)throw Error(`Invalid server version response.`);this.connectionStatus={text:`Connected — Suwayomi ${t.aboutServer.version}`,style:`success`},console.log(`[Suwayomi] Connected to server version ${t.aboutServer.version}`)}catch(e){this.connectionStatus={text:e instanceof Error?e.message:`Connection failed.`,style:`error`},console.error(`[Suwayomi] Connection test failed:`,e)}this.reloadForm()}}},I=class extends m{getSections(){return[h(`serverConnection`,[y(`serverConnection`,{title:`Server Settings`,form:new F})])]}},L=/* @__PURE__ */ l((/* @__PURE__ */ s(((e,t)=>{(function(n,r,i){typeof e==`object`?(t.exports=i(),t.exports.default=i()):typeof define==`function`&&define.amd?define(i):r[n]=i()})(`slugify`,e,function(){var e=JSON.parse(`{"$":"dollar","%":"percent","&":"and","<":"less",">":"greater","|":"or","¢":"cent","£":"pound","¤":"currency","¥":"yen","©":"(c)","ª":"a","®":"(r)","º":"o","À":"A","Á":"A","Â":"A","Ã":"A","Ä":"A","Å":"A","Æ":"AE","Ç":"C","È":"E","É":"E","Ê":"E","Ë":"E","Ì":"I","Í":"I","Î":"I","Ï":"I","Ð":"D","Ñ":"N","Ò":"O","Ó":"O","Ô":"O","Õ":"O","Ö":"O","Ø":"O","Ù":"U","Ú":"U","Û":"U","Ü":"U","Ý":"Y","Þ":"TH","ß":"ss","à":"a","á":"a","â":"a","ã":"a","ä":"a","å":"a","æ":"ae","ç":"c","è":"e","é":"e","ê":"e","ë":"e","ì":"i","í":"i","î":"i","ï":"i","ð":"d","ñ":"n","ò":"o","ó":"o","ô":"o","õ":"o","ö":"o","ø":"o","ù":"u","ú":"u","û":"u","ü":"u","ý":"y","þ":"th","ÿ":"y","Ā":"A","ā":"a","Ă":"A","ă":"a","Ą":"A","ą":"a","Ć":"C","ć":"c","Č":"C","č":"c","Ď":"D","ď":"d","Đ":"DJ","đ":"dj","Ē":"E","ē":"e","Ė":"E","ė":"e","Ę":"e","ę":"e","Ě":"E","ě":"e","Ğ":"G","ğ":"g","Ģ":"G","ģ":"g","Ĩ":"I","ĩ":"i","Ī":"i","ī":"i","Į":"I","į":"i","İ":"I","ı":"i","Ķ":"k","ķ":"k","Ļ":"L","ļ":"l","Ľ":"L","ľ":"l","Ł":"L","ł":"l","Ń":"N","ń":"n","Ņ":"N","ņ":"n","Ň":"N","ň":"n","Ō":"O","ō":"o","Ő":"O","ő":"o","Œ":"OE","œ":"oe","Ŕ":"R","ŕ":"r","Ř":"R","ř":"r","Ś":"S","ś":"s","Ş":"S","ş":"s","Š":"S","š":"s","Ţ":"T","ţ":"t","Ť":"T","ť":"t","Ũ":"U","ũ":"u","Ū":"u","ū":"u","Ů":"U","ů":"u","Ű":"U","ű":"u","Ų":"U","ų":"u","Ŵ":"W","ŵ":"w","Ŷ":"Y","ŷ":"y","Ÿ":"Y","Ź":"Z","ź":"z","Ż":"Z","ż":"z","Ž":"Z","ž":"z","Ə":"E","ƒ":"f","Ơ":"O","ơ":"o","Ư":"U","ư":"u","ǈ":"LJ","ǉ":"lj","ǋ":"NJ","ǌ":"nj","Ș":"S","ș":"s","Ț":"T","ț":"t","ə":"e","˚":"o","Ά":"A","Έ":"E","Ή":"H","Ί":"I","Ό":"O","Ύ":"Y","Ώ":"W","ΐ":"i","Α":"A","Β":"B","Γ":"G","Δ":"D","Ε":"E","Ζ":"Z","Η":"H","Θ":"8","Ι":"I","Κ":"K","Λ":"L","Μ":"M","Ν":"N","Ξ":"3","Ο":"O","Π":"P","Ρ":"R","Σ":"S","Τ":"T","Υ":"Y","Φ":"F","Χ":"X","Ψ":"PS","Ω":"W","Ϊ":"I","Ϋ":"Y","ά":"a","έ":"e","ή":"h","ί":"i","ΰ":"y","α":"a","β":"b","γ":"g","δ":"d","ε":"e","ζ":"z","η":"h","θ":"8","ι":"i","κ":"k","λ":"l","μ":"m","ν":"n","ξ":"3","ο":"o","π":"p","ρ":"r","ς":"s","σ":"s","τ":"t","υ":"y","φ":"f","χ":"x","ψ":"ps","ω":"w","ϊ":"i","ϋ":"y","ό":"o","ύ":"y","ώ":"w","Ё":"Yo","Ђ":"DJ","Є":"Ye","І":"I","Ї":"Yi","Ј":"J","Љ":"LJ","Њ":"NJ","Ћ":"C","Џ":"DZ","А":"A","Б":"B","В":"V","Г":"G","Д":"D","Е":"E","Ж":"Zh","З":"Z","И":"I","Й":"J","К":"K","Л":"L","М":"M","Н":"N","О":"O","П":"P","Р":"R","С":"S","Т":"T","У":"U","Ф":"F","Х":"H","Ц":"C","Ч":"Ch","Ш":"Sh","Щ":"Sh","Ъ":"U","Ы":"Y","Ь":"","Э":"E","Ю":"Yu","Я":"Ya","а":"a","б":"b","в":"v","г":"g","д":"d","е":"e","ж":"zh","з":"z","и":"i","й":"j","к":"k","л":"l","м":"m","н":"n","о":"o","п":"p","р":"r","с":"s","т":"t","у":"u","ф":"f","х":"h","ц":"c","ч":"ch","ш":"sh","щ":"sh","ъ":"u","ы":"y","ь":"","э":"e","ю":"yu","я":"ya","ё":"yo","ђ":"dj","є":"ye","і":"i","ї":"yi","ј":"j","љ":"lj","њ":"nj","ћ":"c","ѝ":"u","џ":"dz","Ґ":"G","ґ":"g","Ғ":"GH","ғ":"gh","Қ":"KH","қ":"kh","Ң":"NG","ң":"ng","Ү":"UE","ү":"ue","Ұ":"U","ұ":"u","Һ":"H","һ":"h","Ә":"AE","ә":"ae","Ө":"OE","ө":"oe","Ա":"A","Բ":"B","Գ":"G","Դ":"D","Ե":"E","Զ":"Z","Է":"E'","Ը":"Y'","Թ":"T'","Ժ":"JH","Ի":"I","Լ":"L","Խ":"X","Ծ":"C'","Կ":"K","Հ":"H","Ձ":"D'","Ղ":"GH","Ճ":"TW","Մ":"M","Յ":"Y","Ն":"N","Շ":"SH","Չ":"CH","Պ":"P","Ջ":"J","Ռ":"R'","Ս":"S","Վ":"V","Տ":"T","Ր":"R","Ց":"C","Փ":"P'","Ք":"Q'","Օ":"O''","Ֆ":"F","և":"EV","ء":"a","آ":"aa","أ":"a","ؤ":"u","إ":"i","ئ":"e","ا":"a","ب":"b","ة":"h","ت":"t","ث":"th","ج":"j","ح":"h","خ":"kh","د":"d","ذ":"th","ر":"r","ز":"z","س":"s","ش":"sh","ص":"s","ض":"dh","ط":"t","ظ":"z","ع":"a","غ":"gh","ف":"f","ق":"q","ك":"k","ل":"l","م":"m","ن":"n","ه":"h","و":"w","ى":"a","ي":"y","ً":"an","ٌ":"on","ٍ":"en","َ":"a","ُ":"u","ِ":"e","ْ":"","٠":"0","١":"1","٢":"2","٣":"3","٤":"4","٥":"5","٦":"6","٧":"7","٨":"8","٩":"9","پ":"p","چ":"ch","ژ":"zh","ک":"k","گ":"g","ی":"y","۰":"0","۱":"1","۲":"2","۳":"3","۴":"4","۵":"5","۶":"6","۷":"7","۸":"8","۹":"9","฿":"baht","ა":"a","ბ":"b","გ":"g","დ":"d","ე":"e","ვ":"v","ზ":"z","თ":"t","ი":"i","კ":"k","ლ":"l","მ":"m","ნ":"n","ო":"o","პ":"p","ჟ":"zh","რ":"r","ს":"s","ტ":"t","უ":"u","ფ":"f","ქ":"k","ღ":"gh","ყ":"q","შ":"sh","ჩ":"ch","ც":"ts","ძ":"dz","წ":"ts","ჭ":"ch","ხ":"kh","ჯ":"j","ჰ":"h","Ṣ":"S","ṣ":"s","Ẁ":"W","ẁ":"w","Ẃ":"W","ẃ":"w","Ẅ":"W","ẅ":"w","ẞ":"SS","Ạ":"A","ạ":"a","Ả":"A","ả":"a","Ấ":"A","ấ":"a","Ầ":"A","ầ":"a","Ẩ":"A","ẩ":"a","Ẫ":"A","ẫ":"a","Ậ":"A","ậ":"a","Ắ":"A","ắ":"a","Ằ":"A","ằ":"a","Ẳ":"A","ẳ":"a","Ẵ":"A","ẵ":"a","Ặ":"A","ặ":"a","Ẹ":"E","ẹ":"e","Ẻ":"E","ẻ":"e","Ẽ":"E","ẽ":"e","Ế":"E","ế":"e","Ề":"E","ề":"e","Ể":"E","ể":"e","Ễ":"E","ễ":"e","Ệ":"E","ệ":"e","Ỉ":"I","ỉ":"i","Ị":"I","ị":"i","Ọ":"O","ọ":"o","Ỏ":"O","ỏ":"o","Ố":"O","ố":"o","Ồ":"O","ồ":"o","Ổ":"O","ổ":"o","Ỗ":"O","ỗ":"o","Ộ":"O","ộ":"o","Ớ":"O","ớ":"o","Ờ":"O","ờ":"o","Ở":"O","ở":"o","Ỡ":"O","ỡ":"o","Ợ":"O","ợ":"o","Ụ":"U","ụ":"u","Ủ":"U","ủ":"u","Ứ":"U","ứ":"u","Ừ":"U","ừ":"u","Ử":"U","ử":"u","Ữ":"U","ữ":"u","Ự":"U","ự":"u","Ỳ":"Y","ỳ":"y","Ỵ":"Y","ỵ":"y","Ỷ":"Y","ỷ":"y","Ỹ":"Y","ỹ":"y","–":"-","‘":"'","’":"'","“":"\\"","”":"\\"","„":"\\"","†":"+","•":"*","…":"...","₠":"ecu","₢":"cruzeiro","₣":"french franc","₤":"lira","₥":"mill","₦":"naira","₧":"peseta","₨":"rupee","₩":"won","₪":"new shequel","₫":"dong","€":"euro","₭":"kip","₮":"tugrik","₯":"drachma","₰":"penny","₱":"peso","₲":"guarani","₳":"austral","₴":"hryvnia","₵":"cedi","₸":"kazakhstani tenge","₹":"indian rupee","₺":"turkish lira","₽":"russian ruble","₿":"bitcoin","℠":"sm","™":"tm","∂":"d","∆":"delta","∑":"sum","∞":"infinity","♥":"love","元":"yuan","円":"yen","﷼":"rial","ﻵ":"laa","ﻷ":"laa","ﻹ":"lai","ﻻ":"la"}`),t=JSON.parse(`{"bg":{"Й":"Y","Ц":"Ts","Щ":"Sht","Ъ":"A","Ь":"Y","й":"y","ц":"ts","щ":"sht","ъ":"a","ь":"y"},"de":{"Ä":"AE","ä":"ae","Ö":"OE","ö":"oe","Ü":"UE","ü":"ue","ß":"ss","%":"prozent","&":"und","|":"oder","∑":"summe","∞":"unendlich","♥":"liebe"},"es":{"%":"por ciento","&":"y","<":"menor que",">":"mayor que","|":"o","¢":"centavos","£":"libras","¤":"moneda","₣":"francos","∑":"suma","∞":"infinito","♥":"amor"},"fr":{"%":"pourcent","&":"et","<":"plus petit",">":"plus grand","|":"ou","¢":"centime","£":"livre","¤":"devise","₣":"franc","∑":"somme","∞":"infini","♥":"amour"},"pt":{"%":"porcento","&":"e","<":"menor",">":"maior","|":"ou","¢":"centavo","∑":"soma","£":"libra","∞":"infinito","♥":"amor"},"uk":{"И":"Y","и":"y","Й":"Y","й":"y","Ц":"Ts","ц":"ts","Х":"Kh","х":"kh","Щ":"Shch","щ":"shch","Г":"H","г":"h"},"vi":{"Đ":"D","đ":"d"},"da":{"Ø":"OE","ø":"oe","Å":"AA","å":"aa","%":"procent","&":"og","|":"eller","$":"dollar","<":"mindre end",">":"større end"},"nb":{"&":"og","Å":"AA","Æ":"AE","Ø":"OE","å":"aa","æ":"ae","ø":"oe"},"it":{"&":"e"},"nl":{"&":"en"},"sv":{"&":"och","Å":"AA","Ä":"AE","Ö":"OE","å":"aa","ä":"ae","ö":"oe"}}`);function n(n,r){if(typeof n!=`string`)throw Error(`slugify: string argument expected`);r=typeof r==`string`?{replacement:r}:r||{};var i=t[r.locale]||{},a=r.replacement===void 0?`-`:r.replacement,o=r.trim===void 0||r.trim,s=n.normalize().split(``).reduce(function(t,n){var o=i[n];return o===void 0&&(o=e[n]),o===void 0&&(o=n),o===a&&(o=` `),t+o.replace(r.remove||/[^\w\s$*_+~.()'"!\-:@]+/g,``)},``);return r.strict&&(s=s.replace(/[^A-Za-z0-9\s]/g,``)),o&&(s=s.trim()),s=s.replace(/\s+/g,a),r.lower&&(s=s.toLowerCase()),s}return n.extend=function(t){Object.assign(e,t)},n})})))(),1);function R(e,t){return{mangaId:String(e.id),mangaInfo:{primaryTitle:e.title,secondaryTitles:[],synopsis:e.description??``,tagGroups:[{id:`genres`,title:`Genres`,tags:e.genre.map(e=>({id:(0,L.default)(e,{lower:!0,strict:!0}),title:e}))}],contentRating:x.EVERYONE,contentType:`comic`,status:e.status,artist:e.artist??void 0,author:e.author??void 0,thumbnailUrl:t+e.thumbnailUrl,shareUrl:t+`/manga/`+e.id}}}function z(e,t,n){let r=Number(e.uploadDate);return{chapterId:String(e.id),sourceManga:t,langCode:n,chapNum:e.chapterNumber,title:e.name,sortingIndex:e.sourceOrder,publishDate:Number.isFinite(r)&&r>0?new Date(r):void 0,additionalInfo:e.scanlator?{Scanlator:e.scanlator}:void 0}}var B=class extends m{getSections(){return[h({id:`progress`,header:`Suwayomi Reading Progress`,footer:`Completed chapter reading actions are synchronized with your Suwayomi server.`},[g(`syncStatus`,{title:`Progress Provider`,value:`Suwayomi`})])]}};return e.Suwayomi=new class{async initialise(){}async getSettingsForm(){return new I}async getMangaDetails(e){let t=Number(e);if(!Number.isSafeInteger(t)||t<0)throw Error(`Invalid manga ID: ${e}`);let n=P.serverUrl;return R((await C(n,k,{id:t})).manga,n)}async getManagedLibraryCollections(){return(await C(P.serverUrl,E)).categories.nodes.map(e=>({id:String(e.id),title:e.name||`Default`}))}commitManagedCollectionChanges(e){throw Error(`Method not implemented.`)}async getSourceMangaInManagedCollection(e){let t=Number(e.id),{nodes:n,totalCount:r,pageInfo:i}=(await C(P.serverUrl,D,{categoryId:t})).category.mangas;if(i.hasNextPage||n.length<r)throw Error(`Incomplete category: received ${n.length} of ${r} manga`);return n.map(e=>R(e,P.serverUrl))}async getChapters(e){let t=Number(e.mangaId),n=(await C(P.serverUrl,O,{mangaId:t})).fetchMangaAndChapters;if(!n)throw Error(`Failed to retrieve manga chapters`);let{manga:r,chapters:i}=n,a=r.source?.lang&&r.source.lang!==`all`?r.source.lang:`und`;return i.map(t=>z(t,e,a))}async getChapterDetails(e){let t=Number(e.chapterId);if(!Number.isSafeInteger(t)||t<0)throw Error(`Invalid chapter ID: ${e.chapterId}`);let n=(await C(P.serverUrl,T,{chapterId:t})).fetchChapterPages;if(!n)throw Error(`Failed to retrieve chapter pages`);let{pages:r,chapter:i}=n;if(r.length===0)throw Error(`This chapter has no pages`);let a=P.serverUrl.trim().replace(/\/+$/,``),o=r.map((e,t)=>`${a}/api/v1/manga/${i.mangaId}/chapter/${i.sourceOrder}/page/${t}`);return{id:e.chapterId,mangaId:e.sourceManga.mangaId,type:`images`,pages:o}}async getMangaProgressManagementForm(e){return new B}async getMangaProgress(e){let t=Number(e.mangaId),{source:n,lastReadChapter:r}=(await C(P.serverUrl,A,{mangaId:t})).manga;if(!r||!r.isRead)return;let i=n?.lang&&n.lang!==`all`?n.lang:`und`,a=Number(r.lastReadAt);return{sourceManga:e,lastReadChapter:z(r,e,i),lastReadTime:Number.isFinite(a)&&a>0?new Date(a):void 0}}async processChapterReadActionQueue(e){let t=[],n=[];for(let r of e)try{let e=Number(r.chapterId),n=Number(r.sourceManga.mangaId);if(!Number.isSafeInteger(e)||!Number.isSafeInteger(n)||e<0||n<0)throw Error(`Invalid chapter or manga ID`);let i=(await C(P.serverUrl,j,{chapterId:e})).updateChapter?.chapter;if(i?.id!==e||i.mangaId!==n||!i.isRead)throw Error(`Chapter read status was not confirmed`);t.push(r.id)}catch(e){console.error(`[Suwayomi] Failed to sync chapter ${r.chapterId}`,e instanceof Error?e.message:String(e)),n.push(r.id)}return{successfulItems:t,failedItems:n}}},e})({});