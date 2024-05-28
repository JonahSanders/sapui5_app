/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/merge","sap/ui/core/util/reflection/JsControlTreeModifier","sap/m/upload/p13n/handlers/ColumnConfigHandler","sap/m/upload/p13n/handlers/SortConfigHandler","sap/m/upload/p13n/handlers/GroupConfigHandler","sap/m/upload/p13n/handlers/FilterConfigHandler"],function(e,t,n,a,r,o){"use strict";const i="p13nManagerData";const u={[n.getEventName()]:new n,[a.getEventName()]:new a,[r.getEventName()]:new r,[o.getEventName()]:new o};const s={};s.read=function(t){if(!t||typeof t.getCustomData!=="function"){return undefined}const n=t.getCustomData().filter(e=>e.getKey()===i);return n.length?e({},JSON.parse(n[0].getValue().replaceAll(/\\/g,""))):undefined};s.update=async function(n,a){const r=a.propertyBag,o=r.modifier?r.modifier:t;const g=await s.getRawConfig(n,o,a);let d={};let l={};if(g){d=await o.getProperty(g,"value").then(t=>e({},JSON.parse(t.replace(/\\/g,""))))}if(u[a.changeType]){l=u[a.changeType].modifyState(a,d)}let p=Promise.resolve();if(g&&n.isA){p=o.removeAggregation(n,"customData",g).then(function(){return o.destroy(g)})}const f=r?r.appComponent:undefined;return p.then(()=>o.createAndAddCustomData(n,i,JSON.stringify(l),f).then(function(){return e({},l)}))};s.getRawConfig=function(e,t,n){return t.getControlMetadata(e).then(a=>{n.controlMetadata=a;return t.getAggregation(e,"customData")}).then(e=>Promise.all(e.map(e=>t.getProperty(e,"key"))).then(t=>e.reduce((e,n,a)=>t[a]===i?n:e,undefined)))};return s});
//# sourceMappingURL=CustomDataConfig.js.map