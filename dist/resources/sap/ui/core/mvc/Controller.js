/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/ObjectPath","sap/base/util/extend","sap/ui/base/EventProvider","sap/ui/base/ManagedObject","sap/ui/core/mvc/ControllerMetadata","sap/ui/core/mvc/ControllerExtension","sap/ui/core/mvc/ControllerExtensionProvider","sap/ui/core/mvc/OverrideExecution","sap/ui/util/_enforceNoReturnValue","sap/base/future","sap/base/Log"],function(e,t,n,r,o,i,a,s,l,u,f){"use strict";var d={};var c=n.extend("sap.ui.core.mvc.Controller",{metadata:{stereotype:"controller",methods:{byId:{public:true,final:true},getInterface:{public:false,final:true},getMetadata:{public:true,final:true},getView:{public:true,final:true},isA:{public:true,final:true},onExit:{public:false,final:false,overrideExecution:s.Before},onInit:{public:false,final:false,overrideExecution:s.After},onAfterRendering:{public:false,final:false,overrideExecution:s.After},onBeforeRendering:{public:false,final:false,overrideExecution:s.Before}}},constructor:function(e){var r=null;if(typeof e=="string"){if(!d[e]){f.warning("Do not call sap.ui.core.mvc.Controller constructor for non typed scenario!")}r=d[e]}n.apply(this,arguments);if(r){t(this,d[e])}if(this.extension){throw new Error("The keyword 'extension' cannot be used as a member of a controller")}this["_sapui_Extensions"]={};c.extendByMember(this,false);this._sapui_isExtended=false;this._aDestroyables=[]},_isExtended:function(){return this._sapui_isExtended},getInterface:function(){var e={};var t=this.getMetadata();var n=t._aAllPublicMethods;n.forEach(function(t){var n=this[t];if(typeof n==="function"){e[t]=function(){var e=n.apply(this,arguments);return e instanceof c?e.getInterface():e}.bind(this)}}.bind(this));this.getInterface=function(){return e};return e}},o);function p(t,n,r){var o=n.getMetadata().getName();var a=t.getMetadata();var s=t["_sapui_Extensions"];var l=t.getInterface();var d=i.getMetadata().getLifecycleConfiguration();var c={namespace:o,extension:n,reloadNeeded:false};n._setController(l);if(n.getMetadata().hasOverrides()){var p,h,g,v,x=n.getMetadata().getOverrides(),y=n.getMetadata().getStaticOverrides();for(v in y){g=n.getMetadata();if(!g.isMethodFinal(v)){i.overrideMethod(v,n,y,n,g.getOverrideExecution(v))}else{u.errorThrows("Method '"+v+"' of extension '"+o+"' is flagged final and cannot be overridden by calling 'override'")}}for(v in x){if(v!=="extension"){if(v in n.base){f.debug("Overriding  member '"+v+"' of original controller.");var m=x[v];var w=t[v];if(typeof w=="object"&&typeof m=="object"){h=s[v];g=h.extension.getMetadata();for(p in m){if(!g.isMethodFinal(p)){i.overrideMethod(p,w,m,n,g.getOverrideExecution(p))}else{u.errorThrows("Method '"+p+"' of extension '"+h.namespace+"' is flagged final and cannot be overridden by extension '"+o+"'")}}}else if(!a.isMethodFinal(v)){i.overrideMethod(v,t,x,n,a.getOverrideExecution(v))}else{u.errorThrows("Method '"+v+"' of controller '"+t.getMetadata().getName()+"' is flagged final and cannot be overridden by extension '"+o+"'")}}else if(v in d){i.overrideMethod(v,t,x,n,a.getOverrideExecution(v))}else if(v.startsWith("extHook")&&t[v]===null){i.overrideMethod(v,t,x,n)}else{u.errorThrows("Method '"+v+"' does not exist in controller "+t.getMetadata().getName()+" and cannot be overridden")}}c.reloadNeeded=true}if(x&&x.extension){for(var b in x.extension){g=s[b].extension.getMetadata();var E=e.create(b,t.extension);var M=s[b].extension;var C=x.extension[b];for(p in C){if(!g.isMethodFinal(p)){i.overrideMethod(p,E,C,n,g.getOverrideExecution(p));i.overrideMethod(p,M,C,n,g.getOverrideExecution(p))}else{u.errorThrows("Method '"+p+"' of extension '"+b+"' is flagged final and cannot be overridden by extension '"+o+"'")}}}}}var _=n.getInterface();if(r){s[r]=c;c.location=r;t[r]=_;l[r]=_}else{s[o]=c;c.location="extension."+o;e.set("extension."+o,_,t);e.set("extension."+o,_,l)}}function h(e,t,n){if(t instanceof i){p(e,t,n)}else if(t.getMetadata&&t.getMetadata().getStereotype()=="controllerextension"){var r=new t;p(e,r,n)}else{var o=i.getMetadata().getLifecycleConfiguration();for(var a in t){if(a in o){i.overrideMethod(a,e,t,e,o[a].overrideExecution)}else{i.overrideMethod(a,e,t)}}}}function g(t,n,r){if(!t){throw new Error("Controller name ('sName' parameter) is required")}function o(n){if(n){return n}else if(d[t]){return c}else{return e.get(t)}}const i=t.replace(/\./g,"/")+".controller";let a=sap.ui.require(i);a??=o(a);(()=>{if(a?.getMetadata?.().isA?.("sap.ui.core.mvc.View")){throw new Error(`The controller '${t}' define for the View with ID '${n}' is not a valid Controller, but rather a View. `+`This happens when the View and Controller classes have the same fully qualified class name. Please make sure that the class names in`+`Controller.extend("...") and the View.extend("...") call differ. If you migrated a 'JSView' to a 'Typed View' please refer to the documentation section under 'Typed View'`)}})();if(!r){if(!a){a=sap.ui.requireSync(i);return o(a)}else{return a}}return new Promise(function(e,t){if(!a){sap.ui.require([i],function(t){t??=o(t);e(t)},t)}else{e(a)}})}function v(e,t){var n;if(d[t]){n=new e(t)}else{n=new e}if(!n){throw new Error("Controller "+t+" couldn't be instantiated")}return n}c.extendByMember=function(e,t){var n;for(n in e){if(e[n]&&e[n].getMetadata&&e[n].getMetadata().getStereotype()=="controllerextension"){e[n]=new e[n]}}for(n in e){if(e[n]&&e[n].getMetadata&&e[n].getMetadata().getStereotype()=="controllerextension"){h(e,e[n],n)}}if(t){return Promise.resolve(e)}else{return e}};c.applyExtensions=function(e,t,n,r,o){function i(e,t){if(e){return g(t,r,true).then(function(e){e=d[t]||e;if(e!==undefined){if(e.getMetadata&&e.getMetadata().isA("sap.ui.core.mvc.Controller")){u.fatalThrows("Attempt to load Extension Controller "+t+" was not successful","Controller extension should be a plain object.",null,function(){return{type:"ControllerExtension",name:t}})}return e}},function(e){u.errorThrows("Attempt to load Extension Controller "+t+" was not successful - is the Controller correctly defined in its file?")})}else{if(!d[t]&&!sap.ui.require(t)){g(t,r)}if(d[t]!==undefined){return d[t]}else{f.error("Attempt to load Extension Controller "+t+" was not successful - is the Controller correctly defined in its file?",null,function(){return{type:"ControllerExtension",name:t}});return{}}}}if(o){return a.getControllerExtensions(t,n,r,o).then(function(t){var n=t.customizingControllerNames.map(function(e){return i(true,e)});return Promise.all(n).then(function(n){var r=n.concat(t.providerControllers);for(var o=0,i=r.length;o<i;o++){h(e,r[o])}return e})},function(t){u.errorThrows("Controller Extension Provider: Error '"+t+"' thrown in "+c._sExtensionProvider+".",{suffix:"Extension provider is ignored."});return e})}else{var s=a.getControllerExtensions(t,n,r,o);var l=s.customizingControllerNames.map(i.bind(null,false));var p=l.concat(s.providerControllers);for(var v=0,x=p.length;v<x;v++){h(e,p[v])}}return e};c.create=function(e){return x(e.name,undefined,true,e._viewId)};sap.ui.controller=function(e,t,n,r){if(n){f.info("Do not use deprecated factory function 'sap.ui.controller("+e+")'. Use 'sap.ui.core.mvc.Controller.create(...)' instead.","sap.ui.controller",null,function(){return{type:"sap.ui.controller",name:e}})}else{f.warning("Do not use synchronous controller creation for controller '"+e+"'! Use the new asynchronous factory 'sap.ui.core.mvc.Controller.create(...)' instead.","sap.ui.controller",null,function(){return{type:"sap.ui.controller",name:e}})}return x.apply(this,arguments)};function x(e,t,n,o){var i,a,s=r._sOwnerId;if(typeof t==="boolean"){t=undefined}if(!t){if(n){return g(e,o,n).then(function(t){return v(t,e)}).then(function(t){return c.applyExtensions(t,e,s,o,n)}).then(function(e){e._sapui_isExtended=true;return e})}else{a=g(e,o,n);i=v(a,e);i=c.applyExtensions(i,e,s,o,n);i._sapui_isExtended=true}return i}else{d[e]=t;f.info("For defining controllers use Controller.extend instead")}}c.prototype.getPublicMethods=function(){var e={},n=this.getMetadata(),r=n.getAllMethods(),o=n.getLifecycleConfiguration();Object.keys(r).forEach(function(t){if(n.isMethodPublic(t)){e[t]=r[t];e[t].reloadNeeded=!!(t in o)}});delete e.extension;var i=this["_sapui_Extensions"];Object.keys(i).forEach(function(n){var r=i[n];var o=r.extension.getInterface();var a=r.extension.getMetadata().getAllMethods();Object.keys(o).forEach(function(n){delete e[r.location];var o=t({},a[n],{reloadNeeded:r.reloadNeeded});e[r.location+"."+n]=o})});return e};c.prototype._getDestroyables=function(){if(!this._aDestroyables){u.errorThrows("Mandatory super constructor not called for Controller: '"+this.getMetadata().getName()+"'.",null,"sap.ui.support",function(){return{type:"missingSuperConstructor"}});this._aDestroyables=[]}return this._aDestroyables};c.prototype.destroyFragments=function(){function e(e){e=Array.isArray(e)?e:[e];for(var t=0;t<e.length;t++){if(!e[t].isDestroyed()){e[t].destroy()}}}var t=this._getDestroyables();for(var n=0;n<t.length;n++){t[n]=t[n].then(e)}};c.prototype.destroy=function(){if(this["_sapui_Extensions"]){Object.keys(this["_sapui_Extensions"]).forEach(function(t){var n=this["_sapui_Extensions"][t];e.set(n.location,null,this)}.bind(this));delete this["_sapui_Extensions"]}n.prototype.destroy.apply(this,arguments)};c.prototype.getView=function(){return this.oView};c.prototype.byId=function(e){return this.oView?this.oView.byId(e):undefined};c.prototype.createId=function(e){return this.oView?this.oView.createId(e):undefined};c.prototype.getOwnerComponent=function(){var e=sap.ui.require("sap/ui/core/Component");if(e){return e.getOwnerComponentFor(this.getView())}else{return undefined}};c.prototype.connectToView=function(e){this.oView=e;const t=this.getMetadata().getName();if(this.onInit){const n=function(){l(this.onInit.apply(this,arguments),{name:"onInit",component:t})};e.attachAfterInit(n,this)}if(this.onExit){const n=function(){l(this.onExit.apply(this,arguments),{name:"onExit",component:t})};e.attachBeforeExit(n,this)}if(e.bControllerIsViewManaged){const n=function(){l(this.destroyFragments.apply(this,arguments),{name:"destroyFragments",component:t})};e.attachBeforeExit(n,this)}if(this.onAfterRendering){const n=function(){l(this.onAfterRendering.apply(this,arguments),{name:"onAfterRendering",component:t})};e.attachAfterRendering(n,this)}if(this.onBeforeRendering){const n=function(){l(this.onBeforeRendering.apply(this,arguments),{name:"onBeforeRendering",component:t})};e.attachBeforeRendering(n,this)}};c.prototype.loadFragment=function(e){if(!this.getView()){throw new Error("Calling 'loadFragment' without a view attached is not supported!")}else if(!e||!e.name){throw new Error("oOptions must provide at least a fragment name!")}var t=this.getOwnerComponent();var n=e.addToDependents!==false;var r=e.autoPrefixId!==false;var o={name:e.name,type:e.type,id:e.id,controller:this};var i=this._getDestroyables();var a=new Promise(function(e,t){sap.ui.require(["sap/ui/core/Fragment"],function(t){e(t)},t)}).then(function(n){if(!e.id&&r){o.id=this.getView().getId()}else if(r){o.id=this.createId(e.id)}if(t){return t.runAsOwner(function(){return n.load(o)})}else{return n.load(o)}}.bind(this)).then(function(e){if(n){this.getView().applySettings({dependents:e})}i.splice(i.indexOf(a),1);return e}.bind(this));i.push(a);return a};c._sExtensionProvider=null;c.registerExtensionProvider=function(e){c._sExtensionProvider=e;a.registerExtensionProvider(e)};return c});
//# sourceMappingURL=Controller.js.map