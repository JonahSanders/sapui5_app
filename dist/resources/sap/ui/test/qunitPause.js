/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
(function(){"use strict";var t={NONE:"none",TIMEOUT:"timeout",ASSERT:"assert",POLL:"poll"};var e={};var n={pause:[],resume:[]};var i={};var u=false;var a=t.NONE;var r=false;function o(){return a!==t.NONE&&a!==t.POLL}function s(){return a.indexOf(t.ASSERT)>-1}function l(){return a.indexOf(t.POLL)>-1}function f(){return QUnit.test.length===2}function c(){var t=window.setTimeout;window.setTimeout=function n(i,u){var a=t.apply(null,arguments);e[a]={delay:u||0,callback:i,startTime:Date.now()};return a}}function p(){var t=f()?"pushResult":"push";var e=QUnit.assert[t];QUnit.assert[t]=function(){var t=this;var n=arguments;var i=f()?arguments[0].result:arguments[0];var u=sap.ui.require("sap/ui/test/Opa");var a=t.test&&u&&u.config.testName===t.test.testName;if(a&&!i&&s()){var r=new u;var o=true;U();var l=new Promise(function(i){d(function(){if(o){o=false;i()}});e.apply(t,n)});r.iWaitForPromise(l)}else{e.apply(t,n)}}}function m(){if(o()){i=e[QUnit.config.timeout];if(!i){throw new Error("QUnitPause should be loaded before QUnit!")}i.originalCallback=i.callback;i.callback=function(){U();d(function(){var t=Math.max(0,i.delay-(Date.now()-i.startTime));QUnit.config.timeout=setTimeout(i.originalCallback,t)})};clearTimeout(QUnit.config.timeout);QUnit.config.timeout=setTimeout(i.callback,QUnit.config.testTimeout);e={}}}function v(){return g("pause").apply(this,arguments)}function d(){return g("resume").apply(this,arguments)}function U(){if(o()&&!u){u=true;P("pause");clearTimeout(QUnit.config.timeout)}else if(!s()){setTimeout(function(){Q()},0)}}function Q(){P("resume",true);u=false}function h(t,e){QUnit.begin(function(){r=false});var n=false;if(!QUnit){throw new Error("QUnitPause should start polling after QUnit is loaded!")}else if(r){e({qunitDone:true})}else if(l()){QUnit.done(function(){r=true;if(!n){e({qunitDone:true})}});setTimeout(function(){if(!r&&!n){n=true;e({qunitDone:false})}},t)}}function T(e){var n=false;for(var i in t){if(t[i]===e){n=true}}return n}function g(t){return function(e,i,u){n[t].push({cb:e,context:i,args:u,called:false})}}function P(t,e){n[t].forEach(function(t){if(!e||!t.called){t.cb.apply(t.context,t.args);t.called=true}})}const O={PAUSE_RULES:t,paused:u,get pauseRule(){return a},set pauseRule(e){var n=e.split(",");a="";var i=n.filter(T).join(",");a=i?i:t.NONE},shouldPause:o,shouldPauseOnAssert:s,shouldPoll:l,setupAfterQUnit:p,setupBeforeQUnit:c,setupBeforeOpaTest:m,onPause:v,onResume:d,emitPause:U,emitResume:Q,pollForQUnitDone:h};c();sap.ui.loader._.defineModuleSync("sap/ui/test/qunitPause.js",O);sap.ui.test??={};sap.ui.test.qunitPause=O})();
//# sourceMappingURL=qunitPause.js.map