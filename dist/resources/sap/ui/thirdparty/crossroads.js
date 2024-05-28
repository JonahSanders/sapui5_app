/** @license
 * crossroads <http://millermedeiros.github.com/crossroads.js/>
 * Author: Miller Medeiros | MIT License
 * v0.12.0 (2013/01/21 13:47)
 */
(function(){var e=function(e){var t,r,i;r=/t(.+)?/.exec("t")[1]==="";function s(e,t){if(e.indexOf){return e.indexOf(t)}else{var r=e.length;while(r--){if(e[r]===t){return r}}return-1}}function n(e,t){var r=s(e,t);if(r!==-1){e.splice(r,1)}}function a(e,t){return"[object "+t+"]"===Object.prototype.toString.call(e)}function o(e){return a(e,"RegExp")}function u(e){return a(e,"Array")}function h(e){return typeof e==="function"}function l(e){var t;if(e===null||e==="null"){t=null}else if(e==="true"){t=true}else if(e==="false"){t=false}else if(e===i||e==="undefined"){t=i}else if(e===""||isNaN(e)){t=e}else{t=parseFloat(e)}return t}function f(e){var t=e.length,r=[];while(t--){r[t]=l(e[t])}return r}function c(e,t){var r=(e||"").replace("?","").split("&"),i=r.length,s={},n,a;while(i--){n=r[i].split("=");a=t?l(n[1]):n[1];s[n[0]]=typeof a==="string"?decodeURIComponent(a):a}return s}function p(){this.bypassed=new e.Signal;this.routed=new e.Signal;this._routes=[];this._prevRoutes=[];this._piped=[];this.resetState()}p.prototype={greedy:false,greedyEnabled:true,ignoreCase:true,ignoreState:false,shouldTypecast:false,normalizeFn:null,resetState:function(){this._prevRoutes.length=0;this._prevMatchedRequest=null;this._prevBypassedRequest=null},create:function(){return new p},addRoute:function(e,t,r){var i=new d(e,t,r,this);this._sortedInsert(i);return i},removeRoute:function(e){n(this._routes,e);e._destroy()},removeAllRoutes:function(){var e=this.getNumRoutes();while(e--){this._routes[e]._destroy()}this._routes.length=0},parse:function(e,t){e=e||"";t=t||[];if(!this.ignoreState&&(e===this._prevMatchedRequest||e===this._prevBypassedRequest)){return}var r=this._getMatchedRoutes(e),i=0,s=r.length,n;if(s){this._prevMatchedRequest=e;this._notifyPrevRoutes(r,e);this._prevRoutes=r;while(i<s){n=r[i];n.route.matched.dispatch.apply(n.route.matched,t.concat(n.params));n.isFirst=!i;this.routed.dispatch.apply(this.routed,t.concat([e,n]));i+=1}}else{this._prevBypassedRequest=e;this.bypassed.dispatch.apply(this.bypassed,t.concat([e]))}this._pipeParse(e,t)},_notifyPrevRoutes:function(e,t){var r=0,i;while(i=this._prevRoutes[r++]){if(i.route.switched&&this._didSwitch(i.route,e)){i.route.switched.dispatch(t)}}},_didSwitch:function(e,t){var r,i=0;while(r=t[i++]){if(r.route===e){return false}}return true},_pipeParse:function(e,t){var r=0,i;while(i=this._piped[r++]){i.parse(e,t)}},getNumRoutes:function(){return this._routes.length},_sortedInsert:function(e){var t=this._routes,r=t.length;do{--r}while(t[r]&&e._priority<=t[r]._priority);t.splice(r+1,0,e)},_getMatchedRoutes:function(e){var t=[],r=this._routes,i=r.length,s;while(s=r[--i]){if((!t.length||this.greedy||s.greedy)&&s.match(e)){t.push({route:s,params:s._getParamsArray(e)})}if(!this.greedyEnabled&&t.length){break}}return t},pipe:function(e){this._piped.push(e)},unpipe:function(e){n(this._piped,e)},toString:function(){return"[crossroads numRoutes:"+this.getNumRoutes()+"]"}};t=new p;t.VERSION="0.12.0";t.NORM_AS_ARRAY=function(e,t){return[t.vals_]};t.NORM_AS_OBJECT=function(e,t){return[t]};function d(t,r,i,s){var n=o(t),a=s.patternLexer;this._router=s;this._pattern=t;this._paramsIds=n?null:a.getParamIds(t);this._optionalParamsIds=n?null:a.getOptionalParamsIds(t);this._matchRegexp=n?t:a.compilePattern(t,s.ignoreCase);this.matched=new e.Signal;this.switched=new e.Signal;if(r){this.matched.add(r)}this._priority=i||0}d.prototype={greedy:false,rules:void 0,match:function(e){e=e||"";return this._matchRegexp.test(e)&&this._validateParams(e)},_validateParams:function(e){var t=this.rules,r=this._getParamsObject(e),i;for(i in t){if(i!=="normalize_"&&t.hasOwnProperty(i)&&!this._isValidParam(e,i,r)){return false}}return true},_isValidParam:function(e,t,r){var i=this.rules[t],n=r[t],a=false,l=t.indexOf("?")===0;if(n==null&&this._optionalParamsIds&&s(this._optionalParamsIds,t)!==-1){a=true}else if(o(i)){if(l){n=r[t+"_"]}a=i.test(n)}else if(u(i)){if(l){n=r[t+"_"]}a=this._isValidArrayRule(i,n)}else if(h(i)){a=i(n,e,r)}return a},_isValidArrayRule:function(e,t){if(!this._router.ignoreCase){return s(e,t)!==-1}if(typeof t==="string"){t=t.toLowerCase()}var r=e.length,i,n;while(r--){i=e[r];n=typeof i==="string"?i.toLowerCase():i;if(n===t){return true}}return false},_getParamsObject:function(e){var t=this._router.shouldTypecast,i=this._router.patternLexer.getParamValues(e,this._matchRegexp,t),n={},a=i.length,o,u;while(a--){u=i[a];if(this._paramsIds){o=this._paramsIds[a];if(o.indexOf("?")===0&&u){n[o+"_"]=u;u=c(u,t);i[a]=u}if(r&&u===""&&s(this._optionalParamsIds,o)!==-1){u=void 0;i[a]=u}n[o]=u}n[a]=u}n.request_=t?l(e):e;n.vals_=i;return n},_getParamsArray:function(e){var t=this.rules?this.rules.normalize_:null,r;t=t||this._router.normalizeFn;if(t&&h(t)){r=t(e,this._getParamsObject(e))}else{r=this._getParamsObject(e).vals_}return r},interpolate:function(e){var t=this._router.patternLexer.interpolate(this._pattern,e);if(!this._validateParams(t)){throw new Error("Generated string doesn't validate against `Route.rules`.")}return t},extrapolate:function(e){var t={};if(!e){return t}var r=this._getParamsObject(e);this._paramsIds.forEach(function(e){if(r.hasOwnProperty(e)){t[e]=r[e]}});return t},dispose:function(){this._router.removeRoute(this)},_destroy:function(){this.matched.dispose();this.switched.dispose();this.matched=this.switched=this._pattern=this._matchRegexp=null},toString:function(){return'[Route pattern:"'+this._pattern+'", numListeners:'+this.matched.getNumListeners()+"]"}};p.prototype.patternLexer=function(){var e=/[\\.+*?\^$\[\](){}\/'#]/g,t=/^\/|\/$/g,r=/\/$/g,i=/(?:\{|:)([^}:]+)(?:\}|:)/g,s=function(e,t,r){var i=r.lastIndexOf("__CR_RS__"),s=r.indexOf("__CR_RQ__"),a=r.indexOf("__CR_OQ__"),o=r.indexOf("\\/",t),u=Math.min(a===-1?r.length:a,s===-1?r.length:s),h=t+e.length;if(h>=u||h<i||h<o){return n.OS.res_normal}else{return n.OS.res_arsbq}},n={OS:{rgx:/([:})]|\w(?=\/))\/?(:|(?:\{\?))/g,save:"$1{{id}}$2",res:s,res_normal:"\\/?",res_arsbq:"(?:(?:\\/(?=(?:[^\\/?]+)?))|(?:\\/?(?=\\?))|^\\/?|\\/?$)"},RS:{rgx:/([:}])\/?(\{)/g,save:"$1{{id}}$2",res:"\\/"},RQ:{rgx:/\{\?([^}]+)\}/g,res:"\\?(.+)"},OQ:{rgx:/:\?([^:]+):/g,res:"(?:\\?(.*))?"},OR:{rgx:/:([^:]+)\*:/g,res:"(.*)?"},RR:{rgx:/\{([^}]+)\*\}/g,res:"(.+)"},RP:{rgx:/\{([^}]+)\}/g,res:"([^\\/?]+)"},OP:{rgx:/:([^:]+):/g,res:"([^\\/?]+)?(?:\\/(?!\\/))?"}},a=1,o=2,u=3,h=a;function l(){var e,t;for(e in n){if(n.hasOwnProperty(e)){t=n[e];t.id="__CR_"+e+"__";t.save="save"in t?t.save.replace("{{id}}",t.id):t.id;t.rRestore=new RegExp(t.id,"g")}}}l();function c(e,t){var r=[],i;e.lastIndex=0;while(i=e.exec(t)){r.push(i[1])}return r}function p(e){return c(i,e)}function d(e){return c(n.OP.rgx,e)}function _(i,s){i=i||"";if(i){if(h===a){i=i.replace(t,"")}else if(h===u){i=i.replace(r,"")}i=g(i,"rgx","save");i=i.replace(e,"\\$&");i=g(i,"rRestore","res");if(h===a){i="\\/?"+i}}if(h!==o){i+="\\/?"}return new RegExp("^"+i+"$",s?"i":"")}function g(e,t,r){var i,s;for(s in n){if(n.hasOwnProperty(s)){i=n[s];e=e.replace(i[t],i[r])}}return e}function v(e,t,r){var i=t.exec(e);if(i){i.shift();if(r){i=f(i)}}return i}function m(e,t){if(typeof e!=="string"){throw new Error("Route pattern should be a string.")}var r=function(e,r){var i,s;if(r.charAt(0)==="?"){s=t[r]||t[r.substring(1)]}else{s=t[r]}if(s!=null){if(e.indexOf("{")!==-1&&s===""){throw new Error('The required segment "'+e+'" cannot accept empty string as value.')}if(typeof s==="object"){var n=[];for(var a in s){n.push(encodeURI(a+"="+s[a]))}i="?"+n.join("&")}else{i=String(s)}if(e.indexOf("*")===-1&&i.indexOf("/")!==-1){throw new Error('Invalid value "'+i+'" for segment "'+e+'".')}}else if(e.indexOf("{")!==-1){throw new Error("The segment "+e+" is required.")}else{i=""}return i};if(!n.OS.trail){n.OS.trail=new RegExp("(?:"+n.OS.id+")+$")}return e.replace(n.OS.rgx,n.OS.save).replace(i,r).replace(n.OS.trail,"").replace(n.OS.rRestore,"/")}return{strict:function(){h=o},loose:function(){h=a},legacy:function(){h=u},getParamIds:p,getOptionalParamsIds:d,getParamValues:v,compilePattern:_,interpolate:m}}();return t};if(typeof define==="function"&&define.amd){define(["signals"],e)}else{window["crossroads"]=e(window["signals"])}})();
//# sourceMappingURL=crossroads.js.map