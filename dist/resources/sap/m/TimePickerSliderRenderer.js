/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var e={apiVersion:2};e.render=function(t,a){var s,i,l=a._getContentRepeat(),n=a.getItems(),r=a.getLabel();t.openStart("div",a);t.attr("tabindex","0");t.class("sapMTPColumn");if(a.getIsExpanded()){t.class("sapMTPSliderExpanded")}if(!a.getIsCyclic()){t.class("sapMTimePickerSliderShort")}if(!a._getEnabled()){t.class("sapMTPDisabled")}t.accessibilityState(a,{role:"list",labelledby:{value:a.getId()+"-label",append:true},describedby:{value:a.getId()+"-valDescription",append:true}});t.openEnd();t.openStart("div",a.getId()+"-label");t.class("sapMTimePickerLabel");t.openEnd();t.text(r);t.close("div");t.openStart("div",a.getId()+"-valDescription");t.attr("aria-hidden","false");t.attr("aria-live","assertive");t.class("sapUiInvisibleText");t.openEnd();t.close("div");t.openStart("div");t.class("sapMTimePickerItemArrows");t.openEnd();t.renderControl(a.getAggregation("_arrowUp"));t.close("div");t.openStart("div");t.class("sapMTimePickerSlider");e.addItemValuesCssClass(t,a);t.attr("unselectable","on");t.openEnd();t.openStart("div");t.class("sapMTPPickerSelectionFrame");t.openEnd();t.close("div");t.openStart("ul",a.getId()+"-content");t.attr("unselectable","on");t.openEnd();for(i=1;i<=l;i++){for(s=0;s<n.length;s++){t.openStart("li");t.class("sapMTimePickerItem");if(!n[s].getVisible()){t.class("TPSliderItemHidden")}t.accessibilityState(a);t.attr("unselectable","on");t.openEnd();t.text(n[s].getText());t.close("li")}}t.close("ul");t.close("div");t.openStart("div");t.class("sapMTimePickerItemArrows");t.openEnd();t.renderControl(a.getAggregation("_arrowDown"));t.close("div");t.close("div")};e.addItemValuesCssClass=function(e,t){var a=t.getItems().filter(function(e){return e.getVisible()}).length;if(a>2&&a<13){e.class("SliderValues"+a.toString())}};return e});
//# sourceMappingURL=TimePickerSliderRenderer.js.map