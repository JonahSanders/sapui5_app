/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Element","sap/ui/core/util/reflection/JsControlTreeModifier","sap/base/util/uid","sap/base/Log"],function(e,t,r,n){"use strict";var o={};o.CHANGE_TYPE_MOVE_FIELD="moveSimpleFormField";o.CHANGE_TYPE_MOVE_GROUP="moveSimpleFormGroup";o.sTypeTitle="sap.ui.core.Title";o.sTypeMTitle="sap.m.Title";o.sTypeToolBar="sap.m.Toolbar";o.sTypeOverflowToolBar="sap.m.OverflowToolbar";o.sTypeLabel="sap.m.Label";o.sTypeSmartLabel="sap.ui.comp.smartfield.SmartLabel";o.CONTENT_AGGREGATION="content";function a(e,t,r){return r.reduce(function(r,n){return r.then(function(r){if(r!==undefined){return r}var o=e.getControlType(n);if(t.indexOf(o)===-1){return Promise.resolve().then(e.getVisible.bind(e,n)).then(function(e){return e||undefined})}else{return false}})},Promise.resolve())}function i(e,t,r,n,o,i,l){return a(t,i,r).then(function(r){if(r){var a=o.view;var i=o.appComponent;var c;return Promise.resolve().then(t.createControl.bind(t,"sap.ui.core.Title",i,a,l)).then(function(e){c=e;t.setProperty(c,"text","");return t.insertAggregation(n,"content",c,0,a)}).then(function(){var t=e.getRevertData();t.createdTitleSelector=o.modifier.getSelector(c,o.appComponent);e.setRevertData(t)})}return Promise.resolve()}).then(function(){return t.getAggregation(n,"content")})}function l(e,t,r,n){var o;var i=-1;return a(e,t,r).then(function(a){if(a){i++}for(var l=0;l<r.length;l++){var c=e.getControlType(r[l]);if(t.indexOf(c)>-1){i++;if(i===n){o=r[l];break}}}return r.indexOf(o)})}function c(e,t,r){if(t>=e.length||t===-1){return true}var n=r.getControlType(e[t]);return o.sTypeTitle===n||o.sTypeToolBar===n||o.sTypeMTitle===n||o.sTypeOverflowToolBar===n}function u(e,t,r,n){var o=0;for(o=t+1;o<r.length;++o){var a=e.getControlType(r[o]);if(n.indexOf(a)>-1){break}}return o-t}function p(e,t,r){return u(e,r,t,[o.sTypeTitle,o.sTypeMTitle,o.sTypeToolBar,o.sTypeOverflowToolBar,o.sTypeLabel,o.sTypeSmartLabel])}function s(e,t,r,o,a){if(!c(t,r,e)){n.error("Illegal argument. iIndex has to point to a Label.")}else{o=a?o+1:o;var i=0;var l=r;var u;while(l<t.length&&i<o){++i;u=p(e,t,l);l+=u}return l}}function g(e,t,r,n,o){var a=r;for(var i=0;i<o;i++){a.splice(n+i,0,e[t+i])}return a}function v(e){return e.getTitle()||e.getToolbar()}function d(e,t,r){var n=v(t.element);var a=r.modifier.getSelector(e,r.appComponent);var i={elementSelector:r.modifier.getSelector(n,r.appComponent),source:{groupIndex:t.sourceIndex},target:{groupIndex:t.targetIndex}};return{changeType:o.CHANGE_TYPE_MOVE_GROUP,targetSelector:a,movedControl:n,movedElements:[i]}}function f(e,t,r,n,a){var i=a.modifier.getSelector(e,a.appComponent);var l=t.element.getLabel();var c=a.modifier.getSelector(l,a.appComponent);var u=v(n.parent);var p=v(r.parent);var s=a.modifier.getSelector(u,a.appComponent);var g=a.modifier.getSelector(p,a.appComponent);var d={elementSelector:c,source:{groupSelector:g,fieldIndex:t.sourceIndex},target:{groupSelector:s,fieldIndex:t.targetIndex}};return{changeType:o.CHANGE_TYPE_MOVE_FIELD,targetSelector:i,target:u,source:p,movedControl:l,movedElements:[d]}}function m(e,t,r,n,o,a){return Promise.resolve().then(function(){return o.reduce(function(r,n){return r.then(e.insertAggregation.bind(e,t,"dependents",n,0,a))},Promise.resolve())}).then(function(){return n.reduce(function(n,o,i){return n.then(e.insertAggregation.bind(e,t,r.CONTENT_AGGREGATION,o,i,a))},Promise.resolve())})}o.applyChange=function(e,t,r){var a=r.modifier;var c=r.view;var v=r.appComponent;var d;var f;var T;var C=e.getContent();var y=C.movedElements[0];return Promise.resolve().then(function(){return a.getAggregation(t,o.CONTENT_AGGREGATION)}).then(function(S){var E=S.map(function(e){return a.getSelector(e,v)});var h={content:E};e.setRevertData(h);if(e.getChangeType()===o.CHANGE_TYPE_MOVE_FIELD){var I=a.bySelector(y.elementSelector||y.element,v,c);var b=S.indexOf(I);var O=p(a,S,b);d=a.bySelector(y.target.groupSelector||y.target.groupId,v,c);var P=S.indexOf(d);var x=a.bySelector(y.source.groupSelector||y.source.groupId,v,c);var _=S.indexOf(x);var G=s(a,S,P,y.target.fieldIndex,_===P&&y.source.fieldIndex<y.target.fieldIndex);var A=p(a,S,G);f=S.slice();var N=f.slice(b,b+O);var w,L,M,R;if(b<G){w=f.slice(0,b);M=f.slice(b+O,G+A);R=f.slice(G+A,f.length);f=w.concat(M.concat(N.concat(R)))}else if(b>G){L=f.slice(0,G+A);M=f.slice(G+A,b);R=f.slice(b+O,f.length);f=L.concat(N.concat(M.concat(R)))}if(b!=G){return m(a,t,o,f,S,c)}}else if(e.getChangeType()===o.CHANGE_TYPE_MOVE_GROUP){var D=[o.sTypeTitle,o.sTypeToolBar,o.sTypeMTitle,o.sTypeOverflowToolBar];var F=a.bySelector(y.elementSelector||y.element,v,c);return Promise.resolve().then(function(){if(y.target.groupIndex===0||!F){return i(e,a,S,t,r,D,C.newControlId).then(function(e){S=e})}return undefined}).then(function(){T=F?S.indexOf(F):0;return l(a,D,S,y.target.groupIndex)}).then(function(e){d=S[e];var r=u(a,e,S,D);var n=u(a,T,S,D);f=S.slice();f.splice(T,n);e=f.indexOf(d);var i=y.source.groupIndex<y.target.groupIndex?r:0;f=g(S,T,f,e+i,n);return m(a,t,o,f,S,c)})}else{n.warning("Unknown change type detected. Cannot apply to SimpleForm")}})};o.completeChangeContent=function(t,o,a){var i;var l=a.modifier;var c=a.view;var u=a.appComponent;var p=l.bySelector(o.selector,u,c);var s=o.movedElements;if(s.length>1){n.warning("Moving more than 1 Formelement is not yet supported.")}var g=s[0];g.element=e.getElementById(g.id);var v=Object.assign({},o.source);var m=Object.assign({},o.target);if(!m.parent){m.parent=e.getElementById(m.id)}if(!v.parent){v.parent=e.getElementById(v.id)}if(p&&g.element&&m.parent){if(o.changeType==="moveSimpleFormGroup"){i=d(p,g,a)}else if(o.changeType==="moveSimpleFormField"){i=f(p,g,v,m,a)}}else{n.error("Element not found. This may be caused by an unstable id!")}var T={targetSelector:i.targetSelector,movedElements:i.movedElements,newControlId:l.getSelector(c.createId(r()),u)};t.setContent(T);if(i.source&&i.target){t.addDependentControl(i.source,"sourceParent",a);t.addDependentControl(i.target,"targetParent",a)}if(i.movedControl){t.addDependentControl([i.movedControl],"movedElements",a)}};o.revertChange=function(e,t,r){var n=r.modifier;var a=r.appComponent;var i=r.view;var l=e.getRevertData();var c=l.content;return n.getAggregation(t,o.CONTENT_AGGREGATION).then(function(u){var p=c.map(function(e){return n.bySelector(e,a,i)});return m(n,t,o,p,u,i).then(function(){var t=l.createdTitleSelector;var n=r.modifier.bySelector(t,r.appComponent);if(n){n.destroy()}e.resetRevertData();return true})})};o.getChangeVisualizationInfo=function(e,r){var n;var a;var i;var l=e.getContent().movedElements[0];if(l.elementSelector.id){i=t.bySelector(l.elementSelector,r)}else if(e.getContent().newControlId){i=t.bySelector(e.getContent().newControlId,r)}var u=l.source.groupSelector;if(e.getChangeType()===o.CHANGE_TYPE_MOVE_FIELD){var p=t.bySelector(l.source.groupSelector,r);var s=t.bySelector(l.target.groupSelector,r);n=p?p.getParent().getId():null;a=s?s.getParent().getId():null;u={id:n}}else if(!u&&c([i],0,t)){var g=i.getParent();u={id:g.getId()}}var v=i.getParent().getId();return{affectedControls:[v],dependentControls:[u&&u.id?u:e.getContent().targetSelector],updateRequired:true,descriptionPayload:{sourceContainer:n,targetContainer:a}}};return o},true);
//# sourceMappingURL=MoveSimpleForm.js.map