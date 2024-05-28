/*!
* OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
*/
sap.ui.define(["./library","sap/m/GenericTile","sap/m/ToDoCardRenderer","sap/m/GenericTileRenderer"],function(e,t,i,a){"use strict";var o=e.FrameType,r=e.GenericTileMode,n=e.LoadState,s=e.Priority;var p=t.extend("sap.m.ActionTile",{metadata:{library:"sap.m",properties:{enableDynamicHeight:{type:"boolean",group:"Appearance",defaultValue:false},enableIconFrame:{type:"boolean",group:"Appearance",defaultValue:false},priority:{type:"sap.m.Priority",group:"Data",defaultValue:s.None},priorityText:{type:"string",group:"Data",defaultValue:null}}},renderer:{apiVersion:2,render:function(e,t){if(t.getState()===n.Loading){i.render(e,t)}else{a.render(e,t)}}}});p.prototype.init=function(){this.addStyleClass("sapMAT");this.setMode(r.ActionMode);this.setFrameType(o.TwoByOne);t.prototype.init.apply(this,arguments)};p.prototype.onBeforeRendering=function(){if(this.getHeaderImage()){this.addStyleClass("sapMATHeaderImage")}this.toggleStyleClass("sapMATDynamicHeight",this.getEnableDynamicHeight());this.toggleStyleClass("sapMATHideActionButton",!this.getEnableNavigationButton());t.prototype.onBeforeRendering.apply(this,arguments)};p.prototype.onAfterRendering=function(){if(this.getDomRef()){this._removeStyleClasses()}t.prototype.onAfterRendering.apply(this,arguments)};p.prototype._removeStyleClasses=function(){this.getDomRef().classList.remove("sapMGT");this.getDomRef().classList.remove("TwoByOne");this.getDomRef().classList.remove("sapMGTActionMode")};p.prototype._getSizeDescription=function(){return this._oRb.getText("ACTION_TILE_SIZE")};p.prototype._setupResizeClassHandler=function(){};return p});
//# sourceMappingURL=ActionTile.js.map