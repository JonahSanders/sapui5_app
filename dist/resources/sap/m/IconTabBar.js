/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","./IconTabBarRenderer","./IconTabHeader","sap/ui/core/RenderManager","sap/ui/core/util/ResponsivePaddingsEnablement","sap/ui/thirdparty/jquery"],function(e,t,n,r,a,o,jQuery){"use strict";var i=e.IconTabHeaderMode;var s=e.BackgroundDesign;var d=e.IconTabDensityMode;var p=e.TabsOverflowMode;var l=t.extend("sap.m.IconTabBar",{metadata:{interfaces:["sap.m.ObjectHeaderContainer","sap.f.IDynamicPageStickyContent"],library:"sap.m",properties:{showSelection:{type:"boolean",group:"Misc",defaultValue:true,deprecated:true},expandable:{type:"boolean",group:"Misc",defaultValue:true},expanded:{type:"boolean",group:"Misc",defaultValue:true},selectedKey:{type:"string",group:"Data",defaultValue:null},upperCase:{type:"boolean",group:"Appearance",defaultValue:false},stretchContentHeight:{type:"boolean",group:"Appearance",defaultValue:false},applyContentPadding:{type:"boolean",group:"Appearance",defaultValue:true},backgroundDesign:{type:"sap.m.BackgroundDesign",group:"Appearance",defaultValue:s.Solid},headerMode:{type:"sap.m.IconTabHeaderMode",group:"Appearance",defaultValue:i.Standard},showOverflowSelectList:{type:"boolean",group:"Appearance",defaultValue:false,deprecated:true},headerBackgroundDesign:{type:"sap.m.BackgroundDesign",group:"Appearance",defaultValue:s.Solid},enableTabReordering:{type:"boolean",group:"Behavior",defaultValue:false},maxNestingLevel:{type:"int",group:"Behavior",defaultValue:0},tabDensityMode:{type:"sap.m.IconTabDensityMode",group:"Appearance",defaultValue:d.Cozy},ariaTexts:{type:"object",group:"Accessibility",defaultValue:null},tabsOverflowMode:{type:"sap.m.TabsOverflowMode",group:"Behavior",defaultValue:p.End}},aggregations:{items:{type:"sap.m.IconTab",multiple:true,singularName:"item",forwarding:{getter:"_getIconTabHeader",aggregation:"items",forwardBinding:true}},content:{type:"sap.ui.core.Control",multiple:true,singularName:"content"},_header:{type:"sap.m.IconTabHeader",multiple:false,visibility:"hidden"}},events:{select:{parameters:{item:{type:"sap.m.IconTabFilter"},key:{type:"string"},previousKey:{type:"string"},selectedItem:{type:"sap.m.IconTabFilter"},selectedKey:{type:"string"}}},expand:{parameters:{expand:{type:"boolean"},collapse:{type:"boolean"}}}},designtime:"sap/m/designtime/IconTabBar.designtime"},renderer:n});o.call(l.prototype,{header:{selector:".sapMITH"},content:{suffix:"content"}});l._CLASSES_TO_COPY=["sapUiResponsiveContentPadding","sapUiNoContentPadding","sapUiContentPadding"];l.prototype.init=function(){this._initResponsivePaddingsEnablement()};l.prototype.setExpanded=function(e){this.setProperty("expanded",e,true);if(this.$().length){this._toggleExpandCollapse(this.getProperty("expanded"))}return this};l.prototype.setHeaderMode=function(e){var t=this._getIconTabHeader();this.setProperty("headerMode",e,true);if(t){t.setMode(e)}return this};l.prototype.setTabDensityMode=function(e){var t=this._getIconTabHeader();this.setProperty("tabDensityMode",e);if(t){t.setTabDensityMode(e)}return this};l.prototype.setHeaderBackgroundDesign=function(e){var t=this._getIconTabHeader();this.setProperty("headerBackgroundDesign",e,true);if(t){t.setBackgroundDesign(e)}return this};l.prototype.setEnableTabReordering=function(e){var t=this._getIconTabHeader();this.setProperty("enableTabReordering",e,true);if(t){t.setEnableTabReordering(e)}return this};l.prototype.setAriaTexts=function(e){var t=this._getIconTabHeader();this.setProperty("ariaTexts",e,true);if(t){t.setAriaTexts(e)}return this};l.prototype.addStyleClass=function(e,n){var r=this._getIconTabHeader();if(r&&l._CLASSES_TO_COPY.indexOf(e)!==-1){r.addStyleClass(e,true)}return t.prototype.addStyleClass.apply(this,arguments)};l.prototype.removeStyleClass=function(e,n){var r=this._getIconTabHeader();if(r&&l._CLASSES_TO_COPY.indexOf(e)!==-1){r.removeStyleClass(e,true)}return t.prototype.removeStyleClass.apply(this,arguments)};l.prototype._rerenderContent=function(e){var t=this.$("content");if(e&&t.length>0){var n=(new a).getInterface();for(var r=0;r<e.length;r++){n.renderControl(e[r])}n.flush(t[0]);n.destroy()}};l.prototype._toggleExpandCollapse=function(e){var t=this.$("content");var n=this._getIconTabHeader().oSelectedItem;if(e===undefined){e=!this.getExpanded()}if(n){n.$().toggleClass("sapMITBSelected",e);n.$().attr({"aria-expanded":e});if(e){n.$().attr({"aria-selected":e})}else{n.$().removeAttr("aria-selected")}}this._iAnimationCounter=this._iAnimationCounter===undefined?1:++this._iAnimationCounter;if(e){if(n){if(this.$("content").children().length===0){var r=n.getContent();if(r.length>0){this._rerenderContent(r)}else{this._rerenderContent(this.getContent())}}t.stop(true,true).slideDown("400",jQuery.proxy(this.onTransitionEnded,this,e));this.$("containerContent").toggleClass("sapMITBContentClosed",!e)}}else{this.$("contentArrow").hide();t.stop(true,true).slideUp("400",jQuery.proxy(this.onTransitionEnded,this,e))}if(!e||n){this.setProperty("expanded",e,true)}this.fireExpand({expand:e,collapse:!e});return this};l.prototype.onTransitionEnded=function(e){var t=this.$("content"),n=this.$("containerContent"),r=this.$("contentArrow");if(this._iAnimationCounter===1){n.toggleClass("sapMITBContentClosed",!e);if(e){r.show();t.css("display","block")}else{r.hide();t.css("display","none")}}this._iAnimationCounter=this._iAnimationCounter>0?--this._iAnimationCounter:0;return this};l.prototype._getIconTabHeader=function(){if(this.isDestroyStarted()){return null}var e=this.getAggregation("_header");if(!e){e=new r(this.getId()+"--header",{});this.setAggregation("_header",e,true)}return e};l.prototype._getStickyContent=function(){return this._getIconTabHeader()};l.prototype._returnStickyContent=function(){if(this.bIsDestroyed){return}this._getStickyContent().$().prependTo(this.$())};l.prototype._setStickySubheaderSticked=function(e){this._bStickyContentSticked=e};l.prototype._getStickySubheaderSticked=function(){return this._bStickyContentSticked};l.prototype.onBeforeRendering=function(){var e=this._getIconTabHeader(),t=e.$();e.setMaxNestingLevel(this.getMaxNestingLevel());e.setTabsOverflowMode(this.getTabsOverflowMode());if(this._bStickyContentSticked&&t){delete this._bStickyContentSticked;this._getIconTabHeader().$().remove()}};l.prototype.setShowSelection=function(e){var t=this._getIconTabHeader();if(t){t.setShowSelection(e)}this.setProperty("showSelection",e,true);return this};l.prototype.setSelectedKey=function(e){var t=this._getIconTabHeader();if(t){t.setSelectedKey(e)}return this};l.prototype.getSelectedKey=function(){var e=this._getIconTabHeader();if(e){return e.getSelectedKey()}return this.getMetadata().getProperty("selectedKey").getDefaultValue()};l.prototype.setSelectedItem=function(e,t){return this._getIconTabHeader().setSelectedItem(e,t)};return l});
//# sourceMappingURL=IconTabBar.js.map