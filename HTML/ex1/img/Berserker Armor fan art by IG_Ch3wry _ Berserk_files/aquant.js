/* Copyright (c) 2008-2020, Quantcast Corp. */
!function(window){function RequireDependencyError(n){Error.apply(this),this.name="RequireDependencyError",this.message=n||""}RequireDependencyError.prototype=Error.prototype;var amd={},definitions={};amd.require=function(n,e){"function"==typeof n&&(e=n,n=[]);for(var t=[],r=0;r<n.length;r++){var i=n[r];if(!definitions.hasOwnProperty(i))throw new RequireDependencyError("No module named "+i+" has been defined");t[r]=definitions[i]}return e.apply({},t)};var array=Array.prototype,available=function(n,e){return"function"==typeof n[e]},map="map",forEach="forEach",reduce="reduce",indexOf="indexOf";with(available(array,map)||(array[map]=function(n,e){var t=[];e||(e=this);for(var r=0;r<this.length;r++)t[r]=n.call(e,this[r],r,this);return t}),available(array,forEach)||(array[forEach]=array[map]),available(array,reduce)||(array[reduce]=function(n,e){var t=0;for(void 0===e&&(e=this[t++]);t<this.length;t++)e=n.call(this,e,this[t],t,this);return e}),available(array,indexOf)||(array[indexOf]=function(n){for(var e=0;e<this.length;e++)if(this[e]==n)return e;return-1}),amd.define=function(n,e,t){definitions.hasOwnProperty(n)||(definitions[n]=amd.require(e,t))},amd)define("quant/origin",[],function(){return function(n){for(var e=n.domain||"",t=new Date(0).toUTCString(),r=e.split("."),i=1;i<=r.length;i++){var o=r.slice(-i).join("."),a="_dlt=1; domain="+o;if(n.cookie=a,/_dlt=1/.test(n.cookie))return n.cookie=a+"; expires="+t,o}return e}}),define("quant/windows",[],function(){return function(n,e){if(void 0===n)throw new Error("window many not be undefined");if(void 0===e)throw new Error("top may not be undefined");e=e.self,this.depth=0;var t=n.self;for(this.top=t;t!==e;){t=t.parent.self;try{t.location.href&&(this.url=t.location.href,this.top=t)}catch(n){}this.depth++}this.locate=function(t){for(var r=n;;){try{if(t in r.frames)return r}catch(n){}if(r===e)break;r=r.parent.self}}}}),define("quant/log",[],function(){function n(n,e){this.isDebug=/qcdbgc=1$/.test(window.location.toString());var t=function(){return(new Date).toString()},r=function(r,i){"undefined"!=typeof console&&console.log(r+" "+t()+" "+i),e&&"ERROR"==r&&n.beacon("//"+e+"/log/"+r.toLowerCase()+"?msg="+encodeURI(i))};this.error=function(n,e){void 0!==e&&void 0!==e.stack&&(n+=" caused by "+e.message+" at:\n"+e.stack),r("ERROR",n)},this.debug=function(n){this.isDebug&&r("DEBUG",n)}}return n}),define("quant/ready",[],function(){function n(){var n=!1,e=[];document.readyState in{complete:!0,interactive:!0}&&(n=!0);var t=function(){for(n=!0;e.length>0;)e.shift()()};document.addEventListener?(document.addEventListener("DOMContentLoaded",t,!1),window.addEventListener("load",t,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",t,!1),window.attachEvent("onload",t)),this.ready=function(t){n?t():e.push(t)}}return(new n).ready}),define("quant/promise",[],function(){function n(u){var c,s,f=[],l=e,d=function(n){return n},p=function(n,e,t,r){try{var o=n(r);i(o)?(o.then(e),o.catch(t)):e(o)}catch(n){t(n)}},h=function(n){c=n,l=t,f.forEach(function(e){e.push(n),p.apply(0,e)})},v=function(n){s=n,l=r,f.forEach(function(e){e[r](n)})},g=function(n,e,t){return function(r){p(n,e,t,r)}};try{u(h,v)}catch(n){v(n)}return{then:function(i){switch(l){case e:return new n(function(n,e){f.push([i,n,e])});case t:return o(i(c));case r:return a(s)}},catch:function(i){switch(l){case e:return new n(function(n,e){f.push([d,n,g(i,n,e)])});case t:return o(c);case r:return o(i(s))}}}}var e=0,t=1,r=2,i=function(n){return"object"==typeof n&&"then"in n&&"function"==typeof n.then},o=function(n){return i(n)?n:{then:function(e){return o(e(n))},catch:function(n){return this}}},a=function(n){return{then:function(n){return this},catch:function(e){return o(e(n))}}};return n.resolve=o,n.reject=a,n.all=function(n){return n.length?n.map(function(n){return n.then(function(n){return[n]})}).reduce(function(n,e){return n.then(function(n){return e.then(function(e){return n.concat(e)})})}):o([])},n}),define("quant/loader",["quant/ready","quant/promise"],function(n,e){function t(t,r){var i,o=[];n(function(){i=r.getElementsByTagName("head")[0]});var a=function(n){var e=new Image;return e.src=n,e};this.image=function(n){return new e(function(e,t){var r=a(n);o.push(r),r.onload=function(){e(r),o.shift(),delete r.onload,delete r.onerror},r.onerror=t})},this.beacon=function(n){var e=t.navigator;e&&e.sendBeacon?e.sendBeacon(n):a(n)};var u=function(n,e,t){var i=r.createElement("script");i.type="text/javascript",i.src=n;var o=function(){e(i),i.onreadystatechange=null,i.onload=null,i.onerror=null};return i.onload=o,i.onreadystatechange=function(){i.readyState in{loaded:1,complete:1}&&o()},i.onerror=t,i};this.script=function(t){return new e(function(e,r){n(function(){var n=u(t,e,r);i.firstChild?i.insertBefore(n,i.firstChild):i.appendChild(n)})})}}return t}),define("quant/json",[],function(){var localJSON=window.JSON||{};return void 0!==localJSON.stringify&&'{"test":["1"]}'===localJSON.stringify({test:["1"]})||(localJSON.stringify=function(n){var e=typeof n;if("object"!==e||null===n)return"string"===e&&(n='"'+n+'"'),String(n);var t,r,i=[],o=n&&n.constructor===Array;for(t in n)r=n[t],"function"!==(e=typeof r)&&("string"===e?r='"'+r+'"':"object"===e&&null!==r&&(r=localJSON.stringify(r)),i.push((o?"":'"'+t+'":')+String(r)));return(o?"[":"{")+String(i)+(o?"]":"}")},localJSON.parse=localJSON.parse||function(string){return eval("("+string+")")}),localJSON}),define("quant/event",[],function(){function n(){this.add=function(n,e,t){n.addEventListener?n.addEventListener(e,t):"function"==typeof jQuery?jQuery(n).on(e,t):n.attachEvent&&n.attachEvent("on"+e,t)},this.remove=function(n,e,t){n.removeEventListener?n.removeEventListener(e,t):"function"==typeof jQuery?jQuery(n).off(e,t):n.detachEvent&&n.detachEvent("on"+e,t)},this.trigger=function(n,e,t){var r=n.ownerDocument;if(n.dispatchEvent&&r.createEvent){var i=r.createEvent("Event");if(i.initEvent(e,!0,!0),void 0!==t)for(var o in t)o in i||(i[o]=t[o]);n.dispatchEvent(i)}else"function"==typeof jQuery&&jQuery(n).trigger(e,t)}}return new n}),define("quant/now",[],function(){return function(){return(new Date).getTime()}}),define("quant/consent/truste",["quant/json","quant/promise","quant/event","quant/now"],function(n,e,t,r){return function(i,o,a,u,c,s,f,l){var d,p={},h=function(n){var e=n.source[0];return"p"+n.consent[0]+("a"==e?"e":"i")};"object"==typeof u&&"function"==typeof u.callApi?(!0,d=function(n,t,r,i){var o=u.callApi(t,i,l,c,r);return n.cm=h(o),e.resolve(!0)}):d=function(u,s,f,d){return i.depth>0&&(t.add(o,"message",function(e){var t=e.data;if("string"==typeof t&&t.indexOf("PrivacyManagerAPI")>0)try{t=n.parse(t)}catch(n){return}else if(void 0!==t.PrivacyManagerAPI){var r=t.PrivacyManagerAPI;u.cm=h(r)}}),a.postMessage(n.stringify({PrivacyManagerAPI:{timestamp:r(),action:s,self:d,domain:l,authority:c,type:f}}),"*")),e.resolve(!0)},this.consent=function(n){return d(n,"getConsent",s,f)},this.parameters=p}}),define("quant/consent/uspapi",["quant/promise","quant/json","quant/event","quant/now"],function(n,e,t,r){return function(i,o,a,u){var c;if("function"==typeof o.__uspapi)c=function(e,t){return new n(function(n,e){o.__uspapi("getUSPData",t,function(t,r){r&&void 0!==t?n(t.uspString):e(t)})}).catch(function(n){return a.error("[USPAPI] unsuccessful: "+n),!0})};else{var s=(i.locate(u),{});t.add(o,"message",function(n){var t=n.data;if("string"==typeof t&&"{"==t[0])try{t=e.parse(t)}catch(n){return}if(t.hasOwnProperty("__uspapiReturn")){var r=t.__uspapiReturn,i=r.callId,o=s[i];if(void 0===o)return;r.success?o[RESOLVE](r.returnValue):o[REJECT](r.returnValue)}}),c=function(e,t){var o=i.locate(u);if(void 0===o)return n.resolve(void 0);var a=r();return new n(function(n,r){s[a]=[n,r],o.postMessage({__uspapiCall:{command:e,version:t,callId:a}})})}}this.consent=function(n){return c("getUSPData",1).then(function(e){return e&&"string"==typeof e.uspString&&(n.us_privacy=e.uspString),!0})}}}),define("quant/consent/tcf1.1",["quant/promise","quant/json","quant/event","quant/now"],function(n,e,t,r){return function(i,o,a,u){var c,s;if("function"==typeof o.__cmp)s=function(e,t){return new n(function(n,r){o.__cmp(e,t,function(e,t){t?n(e):r(e)})})};else{var f={};t.add(o,"message",function(n){var t=n.data;if(void 0===t)return void a.error("[TCF]: Recieved undefined message");if("string"==typeof t&&"{"==t[0])try{t=e.parse(t)}catch(n){return}if(t.hasOwnProperty("__cmpReturn")){var r=t.__cmpReturn,i=r.callId,o=f[i];if(void 0===o)return;r.success?o[0](r.returnValue):o[1](r.returnValue)}}),s=function(t,o){var a=i.locate(u);if(void 0===a)return n.resolve({gdprApplies:!1});var c=r();return new n(function(n,r){f[c]=[n,r],a.postMessage(e.stringify({__cmpCall:{command:t,parameter:o,callId:c}}),"*")})}}this.consent=function(n){return void 0===c&&(c=s("getVendorConsents",[11]).then(function(e){return e.gdprApplies&&"false"!=e.gdprApplies?(n.gdpr=1,s("getConsentData",null).then(function(t){n.gdpr_consent=t.consentData;var r=e.purposeConsents||e.purposes,i=!0;return"object"==typeof r&&(i=r[1]),i&&(i=!e.vendorConsents||e.vendorConsents[11]),i})):(n.gdpr=n.gdpr||0,!0)}).catch(function(e){return a.error(e),n.gdpr=n.gdpr||0,!0})),c}}}),define("quant/consent-manager",["quant/promise","quant/json"],function(n,e){return function(e){var t,r={},i=function(i){return void 0===t&&(t=n.all(e.map(function(n){return n.consent(r)})).then(function(n){return n.reduce(function(n,e){return n&&e},!0)})),t.then(function(n){if(n)return i()})};this.consent=i,this.wrap=function(n){return function(){var e=this,t=arguments;return i(function(){return n.apply(e,t)})}},this.parameters=r}}),define("quant/consent/tcf2.0",["quant/promise","quant/json","quant/event","quant/now"],function(n,e,t,r){function i(n,e){var t=e.gdprApplies,r=e.purpose,i=e.vendor,o=i&&i.consents&&i.consents[s],a=i&&i.legitimateInterests&&i.legitimateInterests[s],u=e.publisher?e.publisher.restrictions:{};return!t||n.map(function(n){var e=!!r.consents&&r.consents[n],t=!!r.legitimateInterests&&r.legitimateInterests[n],i=u&&u[n]?u[n][s]:null;return 0!==i&&(!(!o||!e||2===i||-1==l.indexOf(n)&&1!==i)||!(1===i||!a||!t||-1!=d.indexOf(n)||-1!=l.indexOf(n)&&2!==i))}).reduce(function(n,e){return n&&e},!0)}function o(o,s,l,d){var q,m;if("function"==typeof s.__tcfapi)m=function(e,t){return new n(function(n,r){s.__tcfapi(e,p,function(t,i){if(i){var o=t.eventStatus;e===h&&t.gdprApplies&&"useractioncomplete"!==o&&"tcloaded"!==o||n(t)}else r(t)},t)})};else{var y={},w={};t.add(s,"message",function(n){var t=n.data;if(void 0===t)return void l.error(a+"Recieved undefined message");if("string"==typeof t&&"{"==t[0])try{t=e.parse(t)}catch(n){return}if(t.hasOwnProperty(v)){var r=t[v],i=r.callId,o=y[i];if(void 0===o)return;var s=r.returnValue;r.success?w[i]===h&&s.gdprApplies&&"useractioncomplete"!==s.eventStatus&&"tcloaded"!==s.eventStatus||o[u](s):o[c](s)}}),m=function(t,i){var a=o.locate(d);if(void 0===a)return n.resolve({gdprApplies:!1});var u=r();return new n(function(n,r){y[u]=[n,r],w[u]=t;var o={};o[g]={command:t,parameter:i,version:p,callId:u},a.postMessage(e.stringify(o),"*")})}}this.consent=function(n){return void 0===q&&(q=m(h).then(function(e){return e.gdprApplies&&"false"!=e.gdprApplies?(n.gdpr=1,n.gdpr_consent=e.tcString):n.gdpr=n.gdpr||0,i(f,e)}).catch(function(e){return l.error(e),n.gdpr=n.gdpr||0,!0})),q}}var a="[TCF2]: ",u=0,c=1,s=11,f=["1","3","7","8","9","10"],l=["1","3"],d=["1","3"],p=2,h="addEventListener",v="__tcfapiReturn",g="__tcfapiCall";return o.resolveConsent=i,o}),define("quant/qtrack",[],function(){function n(n,e){for(var t in e)e.hasOwnProperty(t)&&(n[t]=e[t])}function e(e,t,o){for(var a=0;a<r.length;a++){var u={qacct:r[a],labels:o?e:"_fp.event."+e,event:"refresh"};if(n(u,i),void 0!==t&&null!==t)for(var c in t)t.hasOwnProperty(c)&&("product_id"===c&&t[c].constructor===Array&&(t[c]=t[c].join(",")),u[s[c]||c]=t[c]);window._qevents.push(u)}}function t(t,s,f){if(t===a){if(-1!==r.indexOf(s))return;r.push(s);var l={qacct:s};n(i,f),n(l,i),window._qevents.push(l)}else t===u?-1!==o.indexOf(s)?e(s,f,!1):console.warn("Unsupported event by track, please use "+c+" for this event."):t===c&&e(s,f,!0)}var r,i,o=["PageView","ViewContent","Search","AddToWishlist","AddToCart","InitiateCheckout","AddPaymentInfo","Purchase","Lead","Register","StartTrial","Subscribe","SubmitApplication"],a="init",u="track",c="trackCustom",s={order_id:"orderid",value:"revenue"};return function(){if(window.qtrack||(window.qtrack=function(){window.qtrack.impl.apply(window.qtrack,arguments)}),!window.qtrack.impl&&(r=[],i={},window.qtrack.impl=t,window.qtrack&&window.qtrack.q))for(;window.qtrack.q.length>0;)t.apply(t,window.qtrack.q.shift())}}),define("quant/hashing",[],function(){function n(){this.FNV=function(e){var t,r,i,o;return t=2166136261,r=3386659096,i=n(t,e),o=n(r,e),Math.round(Math.abs(i*o)/65536).toString(16)};var n=function(n,e){var t;for(t=0;t<e.length;t++)n^=e.charCodeAt(t),n+=(n<<1)+(n<<4)+(n<<7)+(n<<8)+(n<<24);return n}}return new n}),define("quant/normalize",["quant/hashing"],function(n){return function(e,t,r,i,o,a){var u,c={},s=null,f=/^[^\s@]+@[^\s@]+\.[^\s@]+$/,l=/^[A-Fa-f0-9]{64}$/,d=2,p={};for(u in t)p[u]=void 0!==t[u],t.hasOwnProperty(u)&&"string"==typeof t[u]&&("uid"!==u&&"uh"!==u?"qacct"!==u&&(t[u].length>0?c[u+e]=encodeURIComponent(t[u]):p[u]=!1):(a||(t[u].match(l)&&(d=1),t[u].match(f)&&(d=0),s=n.FNV(t[u])),delete t[u]));for(u in r)r.hasOwnProperty(u)&&"string"==typeof r[u]&&!p[u]&&(c[u+e]=encodeURIComponent(r[u]));return c["rf"+e]=""+o,"string"==typeof s&&(t.uh=s,c["uh"+e]=encodeURIComponent(s)),c["uht"+e]=""+d,c["a"+e]=i,c}}),define("quant.js",["quant/origin","quant/windows","quant/log","quant/loader","quant/consent/truste","quant/consent/uspapi","quant/consent/tcf1.1","quant/consent-manager","quant/consent/tcf2.0","quant/qtrack","quant/normalize","quant/hashing"],function(n,e,t,r,i,o,a,u,c,s,f,l){return void 0===window.__qc&&(window.__qc=function(s,d,p){if(s.__qc)return s.__qc;var h,v,g,q,m,y,w,_,b,E,O,S,j,P,C,k,I,R,x,A,D,N,T,M,z,L,U,V,J,F,B,Q,G,$,W,Z,H,K,X,Y,nn,en,tn,rn,on,an,un,cn,sn=n(d),fn=new e(s,s.top),ln=new r(s,d),dn=new t(ln,"quantcount.com"),pn=new u([new i(fn,s,s.top,s.PrivacyManagerAPI,"truste.com","advertising","quantserve.com",sn),new o(fn,s,dn,"__uspapiLocator"),new a(fn,s,dn,"__cmpLocator"),new c(fn,s,dn,"__tcfapiLocator")]),hn=["a","ce","cm","dst","enc","fpa","fpan","je","ns","ogl","rf","tzo","sr"],vn=["4dcfa7079941","127fdf7967f31","588ab9292a3f","32f92b0727e5","22f9aa38dfd3","a4abfe8f3e04","18b66bc1325c","958e70ea2f28","bdbf0cb4bbb","65118a0d557","40a1d9db1864","18ae3d985046","3b26460f55d"],gn=!1,qn=!1,mn=0,yn=[],wn=[],_n=[],bn=[],En={},On=0,Sn=null,jn={},Pn={},Cn=null,kn=[].slice;!function(){var n;n=d.createElement("script"),h="async"in n?1:n.readyState?2:3,n=null}();var In=function(n){try{return{init:E,hash:l.FNV,push:O,rules:$,require:require,hasRules:Z,defaults:Y,__qc:function(){return!0}}[n].apply(null,kn.call(arguments,1))}catch(n){return dn.error(n),!1}};return In.evts=0,In.v=2,In.SD=vn,In.qpixelsent=[],G=function(n){var e,t=n?n.length||0:0;for(e=0;e<t;e++)if(!n[e])return!1;return!0},X=function(n){(n=n||s._qacct)&&(z(bn,n)||bn.push(n))},z=function(n,e){var t,r=n.length;for(t=0;t<r;t++)if(n[t]===e)return!0;return!1},V=function(n){return{}.toString.call(n).match(/\s([a-zA-Z]+)/)[1].toLowerCase()},J=function(n){var e,t,r;if("array"===(t=V(n)))return n.slice(0);if("object"===t){e={};for(r in n)n.hasOwnProperty(r)&&(e[r]=n[r]);return e}return"string"===t?""+n:n},O=function(n,e){C(n,e)},Z=function(n){return z(_n,n)},Y=function(n,e){var t;n&&(t=jn[n],t&&(e=T(e,t)),e.qacct&&delete e.qacct,jn[n]=e)},nn=function(n){var e,t,r,i,o,a;if(m(n)){o=n;for(i in o){if("string"==typeof o[i]){e=n.event||"load",t=n.media||"webpage","rule"!==e&&"load"!==e||"webpage"!==t&&"ad"!==t?C(n):(a=n.qacct||s._qacct,n.qacct=a,r=Pn[a],r=r?T(r,n):n,Pn[a]=r),X(n.qacct);break}"object"==typeof o[i]&&null!=o[i]&&nn(o[i])}}},T=function(n,e){var t={};return t.qacct=n.qacct||e.qacct,"load"===n.event||"load"===e.event?t.event="load":n.event&&e.event?t.event=n.event||e.event:t.event=null,t.media=null,"webpage"===n.media||"webpage"===e.media?t.media="webpage":"ad"===n.media||"ad"===e.media?t.media="ad":t.media=n.media||e.media,M(t,n,e),M(t,e,n),t.event||delete t.event,t.media||delete t.media,t},M=function(n,e,t){var r,i,o,a,u,c;for(r in e)e.hasOwnProperty(r)&&!n.hasOwnProperty(r)&&(i=e[r],o=t[r],a="",u=!!i&&"string"==typeof i,c=!!o&&"string"==typeof o,u&&(a=i),u&&c&&(a+=","),c&&(a+=o),n[r]=a)},en=function(){var n,e,t=[];if(!(On>0)){U();for(n in Pn)Pn.hasOwnProperty(n)&&Pn[n]&&(e=Pn[n],t.push(e),delete Pn[n]);1==t.length&&C(t[0]),t.length>1&&C(t)}},tn=function(){var n,e,t,r=[];for(t=bn.slice(0),n=0;n<t.length;n++)e=t[n],Z(e)||r.push(e);if(0===r.length)en();else for(n=0;n<r.length;n++)e=r[n],_n.push(e),D(e)},N=function(n,e,t,r){var i;if(n=s.location.protocol+"//"+n,Sn=Sn||d.scripts[0],i=d.createElement("script"),1===h)i.src=n,i.async=!0,i.onload=e,t&&(i.onerror=function(n){i.onerror=null,t(n)}),Sn.parentNode.insertBefore(i,Sn);else if(2===h){var o=!1;i.onload=i.onreadystatechange=function(){o||"loaded"!=i.readyState&&"complete"!=i.readyState||(o=!0,i.onreadystatechange=null,e())},i.src=n,Sn.parentNode.insertBefore(i,Sn)}else r&&r()},D=function(n){On++,N("rules.quantcount.com/rules-"+n+".js",function(){En[n]=2===h?2:0,rn()},function(e){En[n]=1,rn()},function(){En[n]=4,rn()})},rn=function(){On-=On>0?1:0,en()},$=function(){var n,e,t,r=!0;if(arguments.length){for(t=function(n){r?nn(n):C(n,!0)},n=0;n<arguments.length;n++)e=kn.call(arguments[n],0),e.splice(1,0,t),W.apply(null,e);r=!1,gn&&en()}},W=function(n,e){var t,r,i,o,a,u,c,s=[],f=[],l=e||C;if((r=kn.call(arguments,2))&&r.length){for(i=r[0]||G,o=r[1],a=r[2],t=a.length,u=0;u<t;u++)s.push(!1),f.push(null);c={p:n,f:s,r:i,c:a,a:o,v:f},Z(n)||_n.push(n),wn.push(c),H(c,l)}else _n.push(n),En[n]=6},H=function(n,e){var t,r=n&&n.c?n.c.length:0;for(t=0;t<r;t++)!function(t){var r,i;try{r=n.c[t][0],i=n.c[t].slice(1),i.splice(0,0,function(r){n.f[t]=!0,n.v[t]=r,K(n,e)}),r.apply(null,i)}catch(r){n.f[t]=!0,n.v[t]=!1,K(n,e)}}(t)},K=function(n,e){var t,r,i,o,a,u,c,s=n.a,f=n.f,l=n.v,d=n.r||G;if(t=G(f),t&&(t=t&&d(l)),t)for(a=0;a<s.length;a++)try{r=s[a][0],i=s[a].length>1?s[a].slice(1):[],i=i.concat(n.v),o=r.apply(null,i),u={qacct:n.p,event:"rule"};for(c in o)o.hasOwnProperty(c)&&"qacct"!==c&&(u[c]=o[c]);e(u)}catch(n){continue}},v=function(){return g(0)!==g(6)?1:0},g=function(n){var e=new Date(2e3,n,1,0,0,0,0),t=e.toGMTString();return e-new Date(t.substring(0,t.lastIndexOf(" ")-1))},q=function(n){return n.replace(/\./g,"%2E").replace(/,/g,"%2C")},m=function(n){return void 0!==n&&null!=n},y=function(){return Math.round(2147483647*Math.random())},w=function(n){var e,t,r,i="",o=d.cookie;return o?(e=o.indexOf(n+"="),t=e+n.length+1,e>-1&&(r=o.indexOf(";",t),r<0&&(r=o.length),i=o.substring(t,r)),i):i},P=function(n){return"P0-"+y()+"-"+n.getTime()},j=function(n,e,t){return["__qca=",n,"; expires=",e.toGMTString(),"; path=/; domain=",t].join("")},S=function(){var n,e,t,r,i,o,a=["","",""];if(1===mn)return a[0]=";fpan=u;fpa=",a;for(n=l.FNV(sn),o=0;o<vn.length;o++)if(vn[o]===n)return a[0]=";fpan=u;fpa=",a;return e=new Date,t=w("__qca"),t.length>0||Cn?(0===t.length&&(t=Cn,a[1]=j(Cn,new Date(e.getTime()+338688e5),sn)),a[0]=";fpan=0;fpa="+t):(Cn=P(e),a[1]=j(Cn,new Date(e.getTime()+338688e5),sn),a[0]=";fpan=1;fpa="+Cn),r=w("_pubcid"),i=w("_pubcid_optout"),(0===i.length||0===i)&&r.length>0?a[2]=";pbcn=1;pbc="+r:a[2]=";pbcn=u;pbc=",a},_=function(){var n=S()[1];n&&(d.cookie=n)},b=function(n){d.cookie=n+"=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/; domain="+sn},B=function(n){var e,t;if(n&&"object"===V(n))for(t=0;t<hn.length;t++)e=hn[t],n.hasOwnProperty(e)&&n[e]&&delete n[e]},x=function(n,e,t){var r,i,o;return e&&"string"==typeof e.qacct?r=e.qacct:"string"==typeof s._qacct&&(r=s._qacct),r&&0!==r.length?(e=F(r,e),delete Pn[r],o=jn[r],i=En[r],m(i)||(i=3),cn(e,o,t,r)?null:f(n,e,o,r,i,Q())):null},R=function(n){var e,t=[],r=[],i=[];for(e in n)n[e]&&n.hasOwnProperty(e)&&("uh"===e||"uht"===e?r.push(";"+e+"="+n[e]):t.push(e+"="+n[e]));return i.push(t.join(";")),i.push(r.join("")),i},A=function(){var n,e,t,r,i,o=d.getElementsByTagName("meta"),a="";for(n=0;n<o.length;n++){if(i=o[n],a.length>=1e3)return a;m(i)&&m(i.attributes)&&m(i.attributes.property)&&m(i.attributes.property.value)&&m(i.content)&&(e=i.attributes.property.value,t=i.content,e.length>3&&"og:"===e.substring(0,3)&&(a.length>0&&(a+=","),r=t.length>80?80:t.length,a+=q(e.substring(3,e.length))+"."+q(t.substring(0,r))))}return encodeURIComponent(a)},Q=function(){var n,e=!1;return m(s.external)&&(n=s.external,e="function"==typeof n.InPrivateFilteringEnabled&&!0===n.InPrivateFilteringEnabled()),e||"1"==p.doNotTrack||"yes"===p.doNotTrack||"1"==p.msDoNotTrack},C=function(n,e){var t,r,i,o,a,u,c,f,l,h,g=y(),q="",w="",_="",b="",E="",O="u",j="1",P=[];if(mn=0,m(In.qpixelsent)||(In.qpixelsent=[]),m(n)){if("object"===(l=V(n)))i=x("",n,e);else if("array"===l)for(a=0;a<n.length;a++)h=x("."+(a+1),n[a],e),i=0===a?h:T(i,h)}else"string"==typeof _qacct&&(i=x("",null,e));i&&(t=p.cookieEnabled?"1":"0",void 0!==p.javaEnabled&&(O=p.javaEnabled()?"1":"0"),m(s._qmeta)&&(w=";m="+encodeURIComponent(s._qmeta),s._qmeta=null),self.screen&&(q=screen.width+"x"+screen.height+"x"+screen.colorDepth),u=new Date,c=v(),f=S()[0],pubcidCookie=S()[2],s.location&&s.location.href&&(_=encodeURIComponent(s.location.href)),d&&d.referrer&&(E=encodeURIComponent(d.referrer)),s.self===s.top&&(j="0"),i.url?b=_:i.url=_,i.ref||(i.ref=E||""),r=A(),o=R(i),P.push("/pixel;r="+g+";"+o[0]),P.push(o[1]),P.push(f+pubcidCookie),P.push(";ns="+j+";ce="+t+";qjs=1;qv=b0f2076b-20210419173321"),P.push((i.ref?"":";ref=")+";d="+sn+";je="+O+";sr="+q+";dst="+c+";et="+u.getTime()+";tzo="+u.getTimezoneOffset()+(b?";ourl="+b:"")+w+";ogl="+r),yn.push(P),I())},k=function(n){pn.consent(function(){return!0}).then(function(n){return n||b("__qca"),n?"quantserve.com":"quantcount.com"}).then(function(e){var t=pn.parameters,r=function(){return function(){return"quantserve.com"===e?[n[1],n[2]].join(""):";uh=u;uht=u"}}();return ln.image(["//pixel.",e,n[0],r(),n[3],";cm=",t.cm,1===t.gdpr?";gdpr=1;gdpr_consent="+t.gdpr_consent:";gdpr=0",t.us_privacy?";us_privacy="+t.us_privacy:"",n[4]].join("")).then(function(n){n&&"number"==typeof n.width&&3===n.width?b("__qca"):"quantserve.com"===e&&_()})})},I=function(){for(;yn.length;)k(yn.shift())},on=function(){var n,e,t=arguments;for(L([].slice.call(t)),e=0;e<t.length;e++)n=t[e],C(n);bn.length?tn():en()},L=function(n){var e,t=V(n);if("array"===t)for(e=0;e<n.length;e++)L(n[e]);else"object"===t&&X(n.qacct||s._qacct)},U=function(){var n;if(qn||s._qevents.length||s.ezt.length||"undefined"==typeof _qacct||(C({qacct:s._qacct}),qn=!0),!In.evts){for(n in s._qevents)s._qevents[n]!==s._qevents.push&&s._qevents.hasOwnProperty(n)&&C(s._qevents[n]);for(n in s.ezt)s.ezt[n]!==s.ezt.push&&s.ezt.hasOwnProperty(n)&&C(s.ezt[n]);s._qevents={push:on},s.ezt.push=function(){var n,e=arguments;if(m(s.queueManager))for(n=0;n<e.length;n++)s.queueManager.push(e[n]);else on.apply(this,arguments)},In.evts=1}},un=function(n){var e;n&&(e=J(n),L(n),s._qevents.push(e),n=null)},an=function(n){n.push=function(){return L([].slice.call(arguments)),tn(),[].push.apply(n,arguments)}},cn=function(n,e,t,r){e=e||{};var i=(n?n.media:e.media)||"webpage",o=(n?n.event:e.event)||"load";if("ad"===i&&(mn=1),"webpage"===i&&"load"===o){for(var a=0;a<In.qpixelsent.length;a++)if(In.qpixelsent[a]===r&&!t)return!0;In.qpixelsent.push(r)}return!1},F=function(n,e){var t=Pn[n];return e?t&&(e=T(e,t)):e=t,B(e),e},E=function(){m(s._qevents)||(s._qevents=[]),m(s.ezt)||(s.ezt=[]),un(s._qoptions),un(s.qcdata),un(s.smarttagdata),In.evts||(an(s._qevents),an(s.ezt)),L(s.ezt),L(s._qevents),L({qacct:s._qacct}),s._qoptions=null,bn.length?tn():en(),gn=!0},s.quantserve=s.quantserve||E,In.quantserve=E,In}(window,window.document,window.navigator)),window.quantserve(),s(),window.__qc})}(window);