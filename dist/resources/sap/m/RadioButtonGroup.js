/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/ui/core/Element","sap/ui/core/delegate/ItemNavigation","sap/ui/core/library","sap/ui/base/ManagedObjectObserver","./RadioButton","./RadioButtonGroupRenderer","sap/base/Log"],function(t,e,i,s,n,o,a,r,h){"use strict";var u=n.TextDirection;var l=n.ValueState;var d=e.extend("sap.m.RadioButtonGroup",{metadata:{interfaces:["sap.ui.core.IFormContent","sap.ui.core.ISemanticFormContent"],library:"sap.m",designtime:"sap/m/designtime/RadioButtonGroup.designtime",properties:{width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},columns:{type:"int",group:"Appearance",defaultValue:1},editable:{type:"boolean",group:"Behavior",defaultValue:true},valueState:{type:"sap.ui.core.ValueState",group:"Data",defaultValue:l.None},selectedIndex:{type:"int",group:"Data",defaultValue:0},enabled:{type:"boolean",group:"Behavior",defaultValue:true},textDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:u.Inherit}},defaultAggregation:"buttons",aggregations:{buttons:{type:"sap.m.RadioButton",multiple:true,singularName:"button",bindable:"bindable"}},associations:{ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"},ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{select:{parameters:{selectedIndex:{type:"int"}}}}},renderer:r});d.prototype.init=function(){this._iSelectionNumber=-1;this._oObserver=new o(this._observeChanges.bind(this));this._oObserver.observe(this,{aggregations:["buttons"]})};d.prototype.exit=function(){this.destroyButtons();if(this._oItemNavigation){this.removeDelegate(this._oItemNavigation);this._oItemNavigation.destroy();delete this._oItemNavigation}if(this._oObserver){this._oObserver.disconnect();this._oObserver=null}};d.prototype.onBeforeRendering=function(){var t=this.getButtons();var e=this.getEditable();var i=-1;t.forEach(function(t){if(t.getSelected()){i=Math.max(i,t._iSelectionNumber)}});if(i===-1&&this._iSelectionNumber===-1){this._iSelectionNumber=a.getNextSelectionNumber()}t.forEach(function(t,s){t._setEditableParent(e);if(s===this.getSelectedIndex()&&this._iSelectionNumber>i&&t.isPropertyInitial("selected")){t.setSelected(true)}},this);if(this.aRBs){var s=this.getValueState();this.aRBs.forEach(function(t){t.setValueState(s)})}};d.prototype.onAfterRendering=function(){this._initItemNavigation()};d.prototype._initItemNavigation=function(){var t=this._getVisibleButtons();var e=[];var i=false;var n=this.getEnabled();for(var o=0;o<t.length;o++){e.push(t[o].getDomRef());i=i||t[o].getEnabled()}if(!i||!n){if(this._oItemNavigation){this.removeDelegate(this._oItemNavigation);this._oItemNavigation.destroy();delete this._oItemNavigation}return}if(!this._oItemNavigation){this._oItemNavigation=new s;this._oItemNavigation.attachEvent(s.Events.AfterFocus,this._handleAfterFocus,this);this.addDelegate(this._oItemNavigation)}this._oItemNavigation.setRootDomRef(this.getDomRef());this._oItemNavigation.setItemDomRefs(e);this._oItemNavigation.setCycling(true);this._oItemNavigation.setColumns(this.getColumns());this._oItemNavigation.setSelectedIndex(this._getSelectedIndexInRange());this._oItemNavigation.setFocusedIndex(this._getSelectedIndexInRange());this._oItemNavigation.setDisabledModifiers({sapnext:["alt","meta"],sapprevious:["alt","meta"]})};d.prototype._getVisibleButtons=function(){return this.getButtons().filter(function(t){return t.getVisible()})};d.prototype._observeChanges=function(t){var e=t.object,i=t.name,s=t.mutation,n=t.child;if(e===this){if(s==="insert"){this._observeVisibility(n)}else if(s==="remove"){this._unobserveVisibility(n)}}else if(i==="visible"){this._initItemNavigation()}};d.prototype._observeVisibility=function(t){this._oObserver.observe(t,{properties:["visible"]})};d.prototype._unobserveVisibility=function(t){this._oObserver.unobserve(t,{properties:["visible"]})};d.prototype.setSelectedIndex=function(t){var e=this.getSelectedIndex();var i=this.getDomRef()&&this.getDomRef().contains(document.activeElement);var s=this.aRBs&&this.aRBs[t]&&this.aRBs[t].getDomRef();var n;if(t<-1){h.warning("Invalid index, will not be changed");return this}this.setProperty("selectedIndex",t,true);this._iSelectionNumber=a.getNextSelectionNumber();n=this._getSelectedIndexInRange();if(!isNaN(e)&&this.aRBs&&this.aRBs[e]){this.aRBs[e].setSelected(false);this.aRBs[e].setTabIndex(-1)}if(this.aRBs&&this.aRBs[t]){this.aRBs[t].setSelected(true);this.aRBs[t].setTabIndex(0)}if(this._oItemNavigation){this._oItemNavigation.setFocusedIndex(n);this._oItemNavigation.setSelectedIndex(n)}if(s&&i){this.aRBs[t].getDomRef().focus()}return this};d.prototype.setSelectedButton=function(t){if(!t){return this.setSelectedIndex(-1)}var e=this.getButtons();for(var i=0;i<e.length;i++){if(t.getId()==e[i].getId()){return this.setSelectedIndex(i)}}return this};d.prototype.getSelectedButton=function(){return this.getButtons()[this.getSelectedIndex()]};d.prototype.addButton=function(t){if(!this.aRBs){this.aRBs=[]}var e=this.aRBs.length;this.aRBs[e]=this._createRadioButton(t);this.addAggregation("buttons",this.aRBs[e]);return this};d.prototype.insertButton=function(t,e){if(!this.aRBs){this.aRBs=[]}var i=this.aRBs.length,s=this.getButtons().length;e=Math.max(Math.min(e,s),0);if(!this._bUpdateButtons){if(this.getSelectedIndex()===undefined||i==0){this.setSelectedIndex(0)}else if(this.getSelectedIndex()>=e){this.setProperty("selectedIndex",this.getSelectedIndex()+1,true)}}if(e>=i){this.aRBs[e]=this._createRadioButton(t)}else{for(var n=i;n>e;n--){this.aRBs[n]=this.aRBs[n-1];if(n-1==e){this.aRBs[n-1]=this._createRadioButton(t)}}}this.insertAggregation("buttons",t,e);return this};d.prototype._createRadioButton=function(t){t.setValueState(this.getValueState());t.setGroupName(this.getId());t.attachEvent("select",this._handleRBSelect,this);return t};d.prototype.removeButton=function(t){var e=t;if(typeof t=="string"){t=i.getElementById(t)}if(typeof t=="object"){e=this.indexOfButton(t)}var s=this.removeAggregation("buttons",e);if(!this.aRBs){this.aRBs=[]}if(!this.aRBs[e]){return null}this.aRBs.splice(e,1);if(!this._bUpdateButtons){if(this.aRBs.length==0){this.setSelectedIndex(-1)}else if(this.getSelectedIndex()==e){this.setSelectedIndex(0)}else{if(this.getSelectedIndex()>e){this.setProperty("selectedIndex",this.getSelectedIndex()-1,true)}}}return s};d.prototype.removeAllButtons=function(){if(!this._bUpdateButtons){this.setSelectedIndex(-1)}this.aRBs=[];return this.removeAllAggregation("buttons")};d.prototype.destroyButtons=function(){this.destroyAggregation("buttons");if(this.aRBs){while(this.aRBs.length>0){this.aRBs[0].destroy();this.aRBs.splice(0,1)}}return this};d.prototype.updateButtons=function(){this._bUpdateButtons=true;this.updateAggregation("buttons");this._bUpdateButtons=undefined};d.prototype.clone=function(){var t=this.getButtons();var i=0;for(i=0;i<t.length;i++){t[i].detachEvent("select",this._handleRBSelect,this)}var s=e.prototype.clone.apply(this,arguments);for(i=0;i<t.length;i++){t[i].attachEvent("select",this._handleRBSelect,this)}return s};d.prototype._handleRBSelect=function(t){for(var e=0;e<this.aRBs.length;e++){if(this.aRBs[e].getId()==t.getParameter("id")&&t.getParameter("selected")){this.setSelectedIndex(e);this.fireSelect({selectedIndex:e});break}}};d.prototype._handleAfterFocus=function(t){var e=this.getButtons();var i=t.getParameter("index");var s=t.getParameter("event");for(var n=0;n<=i;n++){if(!e[n].getVisible()){i++}}if(s.keyCode===undefined){return}if(i!=this.getSelectedIndex()&&!(s.ctrlKey||s.metaKey)&&this.aRBs[i].getEditable()&&this.aRBs[i].getEnabled()&&this.getEditable()&&this.getEnabled()){this.setSelectedIndex(i);this.fireSelect({selectedIndex:i});this.aRBs.filter(function(t){return t.getEditable()&&t.getEnabled()}).forEach(function(t){if(t===this.aRBs[i]){t.setTabIndex(0);return}t.setTabIndex(-1)}.bind(this))}};d.prototype._getSelectedIndexInRange=function(){var t=this.getButtons(),e=t.length,i=this.getSelectedIndex(),s=-1;if(i<=-1||i>e-1){return-1}for(var n=0;n<=i;n++){if(t[n].getVisible()){s++}}return s};d.prototype.getFormFormattedValue=function(){var t=this.getButtons();var e=this.getSelectedIndex();if(e>=0&&e<t.length){return t[e].getText()}};d.prototype.getFormValueProperty=function(){return"selectedIndex"};d.prototype.getFormObservingProperties=function(){return["selectedIndex"]};d.prototype.getFormRenderAsControl=function(){return false};return d});
//# sourceMappingURL=RadioButtonGroup.js.map