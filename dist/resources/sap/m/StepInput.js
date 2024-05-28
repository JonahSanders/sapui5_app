/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/ui/core/IconPool","sap/ui/core/Lib","sap/ui/core/message/MessageMixin","sap/ui/core/format/NumberFormat","sap/ui/model/ValidateException","sap/ui/Device","sap/ui/core/library","sap/m/library","./NumericInput","./StepInputRenderer","sap/ui/events/KeyCodes","sap/base/Log"],function(e,t,i,s,n,a,r,u,o,l,h,p,_){"use strict";var g=u.TextAlign;var f=u.ValueState;var d=o.StepInputValidationMode;var c=o.StepInputStepModeType;var m=e.extend("sap.m.StepInput",{metadata:{interfaces:["sap.ui.core.IFormContent"],library:"sap.m",designtime:"sap/m/designtime/StepInput.designtime",properties:{min:{type:"float",group:"Data"},max:{type:"float",group:"Data"},step:{type:"float",group:"Data",defaultValue:1},stepMode:{type:"sap.m.StepInputStepModeType",group:"Data",defaultValue:c.AdditionAndSubtraction},largerStep:{type:"float",group:"Data",defaultValue:2},value:{type:"float",group:"Data",defaultValue:0},name:{type:"string",group:"Misc",defaultValue:null},placeholder:{type:"string",group:"Misc",defaultValue:null},required:{type:"boolean",group:"Misc",defaultValue:false},width:{type:"sap.ui.core.CSSSize",group:"Dimension"},valueState:{type:"sap.ui.core.ValueState",group:"Data",defaultValue:f.None},valueStateText:{type:"string",group:"Misc",defaultValue:null},editable:{type:"boolean",group:"Behavior",defaultValue:true},enabled:{type:"boolean",group:"Behavior",defaultValue:true},displayValuePrecision:{type:"int",group:"Data",defaultValue:0},description:{type:"string",group:"Misc",defaultValue:null},fieldWidth:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:"50%"},textAlign:{type:"sap.ui.core.TextAlign",group:"Appearance",defaultValue:g.End},validationMode:{type:"sap.m.StepInputValidationMode",group:"Misc",defaultValue:d.FocusOut}},aggregations:{_input:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"},ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"}},events:{change:{parameters:{value:{type:"string"}}}},dnd:{draggable:false,droppable:true}},constructor:function(t,i){e.prototype.constructor.apply(this,arguments);if(this.getEditable()){this._getOrCreateDecrementButton();this._getOrCreateIncrementButton()}if(typeof t!=="string"){i=t}if(i&&i.value===undefined){this.setValue(this._getDefaultValue(undefined,i.max,i.min))}},renderer:h});var y=i.getResourceBundleFor("sap.m");m.STEP_INPUT_INCREASE_BTN_TOOLTIP=y.getText("STEP_INPUT_INCREASE_BTN");m.STEP_INPUT_DECREASE_BTN_TOOLTIP=y.getText("STEP_INPUT_DECREASE_BTN");m.INITIAL_WAIT_TIMEOUT=500;m.ACCELLERATION=.8;m.MIN_WAIT_TIMEOUT=50;m.INITIAL_SPEED=120;m._TOLERANCE=10;var b=["enabled","editable","name","placeholder","required","valueStateText","description","fieldWidth","textAlign"];s.call(m.prototype);m.prototype.init=function(){this._iRealPrecision=0;this._attachChange();this._bPaste=false;this._bNeedsVerification=false;this._bValueStatePreset=true;this._onmousewheel=this._onmousewheel.bind(this);window.addEventListener("contextmenu",function(e){if(this._btndown===false&&e.target.className.indexOf("sapMInputBaseIconContainer")!==-1){e.preventDefault()}}.bind(this))};m.prototype.onBeforeRendering=function(){var e=this._getMin(),t=this._getMax(),i=this._sOriginalValue||this.getValue(),s=this.getEditable();this._iRealPrecision=this._getRealValuePrecision();this._getInput().setValue(this._getFormattedValue(i));this._getInput().setValueState(this.getValueState());this._getOrCreateDecrementButton().setVisible(s);this._getOrCreateIncrementButton().setVisible(s);this._getInput().setTooltip(this.getTooltip());this._disableButtons(i,t,e);this.$().off(r.browser.firefox?"DOMMouseScroll":"mousewheel",this._onmousewheel);if(this._bNeedsVerification&&!this._bValueStatePreset){this._verifyValue();this._bNeedsVerification=false}};m.prototype.onAfterRendering=function(){this.$().on(r.browser.firefox?"DOMMouseScroll":"mousewheel",this._onmousewheel)};m.prototype.exit=function(){this.$().off(r.browser.firefox?"DOMMouseScroll":"mousewheel",this._onmousewheel);this._sOriginalValue=null};m.prototype.setProperty=function(t,i,s){e.prototype.setProperty.call(this,t,i,s);if(b.indexOf(t)>-1){this._getInput().setProperty(t,this.getProperty(t),s)}return this};m.prototype.setValidationMode=function(e){if(this.getValidationMode()!==e){switch(e){case d.FocusOut:this._detachLiveChange();break;case d.LiveChange:this._attachLiveChange();break}this.setProperty("validationMode",e)}return this};m.prototype.setMin=function(e){if(e!==undefined&&!this._validateOptionalNumberProperty("min",e)){return this}return this.setProperty("min",e)};m.prototype.setMax=function(e){if(e!==undefined&&!this._validateOptionalNumberProperty("max",e)){return this}return this.setProperty("max",e)};m.prototype._validateOptionalNumberProperty=function(e,t){if(this._isNumericLike(t)){return true}_.error("The value of property '"+e+"' must be a number");return false};m.prototype.setDisplayValuePrecision=function(e){var t,i;if(V(e)){t=parseInt(e)}else{t=0;_.warning(this+": ValuePrecision ("+e+") is not correct. It should be a number between 0 and 20! Setting the default ValuePrecision:0.")}var i=this.setProperty("displayValuePrecision",t);this._getNumberFormatter(true);return i};m.prototype._getIncrementButton=function(){var e=this._getInput().getAggregation("_endIcon")||[];var t=null;if(e.length){t=e[e.length-1]}return t};m.prototype._getDecrementButton=function(){var e=this._getInput().getAggregation("_beginIcon");return e?e[0]:null};m.prototype._createIncrementButton=function(){var e=this._getInput().addEndIcon({src:t.getIconURI("add"),id:this.getId()+"-incrementBtn",noTabStop:true,decorative:!r.support.touch||r.system.desktop?true:false,press:this._handleButtonPress.bind(this,1),useIconTooltip:false,alt:m.STEP_INPUT_INCREASE_BTN_TOOLTIP});e.getEnabled=function(){return!this._shouldDisableIncrementButton(this._parseNumber(this._getInput().getValue()),this._getMax())}.bind(this);e.$().attr("tabindex","-1");this._attachEvents(e,true);e.addEventDelegate({onAfterRendering:function(){e.$().attr("tabindex","-1")}});return e};m.prototype._createDecrementButton=function(){var e=this._getInput().addBeginIcon({src:t.getIconURI("less"),id:this.getId()+"-decrementBtn",noTabStop:true,decorative:!r.support.touch||r.system.desktop?true:false,press:this._handleButtonPress.bind(this,-1),useIconTooltip:false,alt:m.STEP_INPUT_DECREASE_BTN_TOOLTIP});e.getEnabled=function(){return!this._shouldDisableDecrementButton(this._parseNumber(this._getInput().getValue()),this._getMin())}.bind(this);e.$().attr("tabindex","-1");this._attachEvents(e,false);e.addEventDelegate({onAfterRendering:function(){e.$().attr("tabindex","-1")}});return e};m.prototype._getInput=function(){if(!this.getAggregation("_input")){var e=new l({id:this.getId()+"-input",textAlign:this.getTextAlign(),editable:this.getEditable(),enabled:this.getEnabled(),description:this.getDescription(),fieldWidth:this.getFieldWidth(),liveChange:this._inputLiveChangeHandler});this.setAggregation("_input",e)}return this.getAggregation("_input")};m.prototype._changeValue=function(e){if(this._fTempValue!=this._fOldValue||e){this.setValue(this._fTempValue);this.fireChange({value:this._fTempValue})}else{this._applyValue(this._fTempValue);this._disableButtons(this._parseNumber(this._getInput().getValue()),this._getMax(),this._getMin())}return this};m.prototype._handleButtonPress=function(e){if(!this._bSpinStarted){this._bDelayedEventFire=false;this._changeValueWithStep(e);this._btndown=false;this._changeValue()}else{this._bSpinStarted=false}this._bNeedsVerification=true;return this};m.prototype._changeValueWithStep=function(e){var t,i,s;if(isNaN(this._iValuePrecision)){this._iValuePrecision=this._getNumberPrecision(this.getValue())}t=Math.pow(10,Math.max(this.getDisplayValuePrecision(),this._iValuePrecision));if(isNaN(this._fTempValue)||this._fTempValue===undefined){this._fTempValue=this.getValue()}s=this._checkInputValue();this._fTempValue+=s;i=e!==0?this._calculateNewValue(e):this._fTempValue;if(e===0){i=Math.round(i*t)/t}if(e!==0||s!==0||this._bDelayedEventFire){this._fTempValue=i}if(this._bDelayedEventFire){this._applyValue(i);this._disableButtons(this._parseNumber(this._getFormattedValue(i)),this._getMax(),this._getMin());this._bNeedsVerification=true}return this};m.prototype._disableButtons=function(e,t,i){if(!this._isNumericLike(e)){return}var s=this._getIncrementButton(),n=this._getDecrementButton(),a=this._shouldDisableDecrementButton(e,i),r=this._shouldDisableIncrementButton(e,t);n&&n.toggleStyleClass("sapMStepInputIconDisabled",a);s&&s.toggleStyleClass("sapMStepInputIconDisabled",r);return this};m.prototype._shouldDisableDecrementButton=function(e,t){var i=this._isNumericLike(t),s=this.getEnabled(),n=i&&t>=e;return s?n:true};m.prototype._shouldDisableIncrementButton=function(e,t){var i=this._isNumericLike(t),s=this.getEnabled(),n=i&&t<=e;return s?n:true};m.prototype._verifyValue=function(){var e=this._getMin(),t=this._getMax(),s=this._parseNumber(this._getInput().getValue()),n=i.getResourceBundleFor("sap.ui.core"),r=this.getBinding("value"),u=r&&r.getType&&r.getType(),o=u&&u.oConstraints&&u.oConstraints.maximum,l=u&&u.oConstraints&&u.oConstraints.minimum,h,p=[],_=false,g;if(!this._isNumericLike(s)){return}g=this;do{_=g.hasListeners("validationError");g=g.getEventingParent()}while(g&&!_);if(this._isMoreThanMax(s)){if(_&&o){return}h=n.getText("EnterNumberMax",[t]);p.push("maximum")}else if(this._isLessThanMin(s)){if(_&&l){return}h=n.getText("EnterNumberMin",[e]);p.push("minimum")}else if(this._areFoldChangeRequirementsFulfilled()&&s%this.getStep()!==0){h=n.getText("Float.Invalid")}if(h){this.setProperty("valueState",f.Error,true);this._getInput().setValueState(f.Error);this._getInput().setValueStateText(h);if(_){this.fireValidationError({element:this,exception:new a(h,p),id:this.getId(),message:h,property:"value"})}}else{this.setProperty("valueState",f.None,true);this._getInput().setValueState(f.None)}};m.prototype._getNumberPrecision=function(e){var t=!isNaN(e)&&e!==null?e.toString().split("."):[];return t.length>1?t[1].length:0};m.prototype.setValueState=function(e){this._bValueStatePreset=true;this.setProperty("valueState",e);this._getInput().setValueState(e);return this};m.prototype.setValue=function(e){var t;this._iValuePrecision=this._getNumberPrecision(e);if(isNaN(e)||e===null){e=this._getDefaultValue(undefined,this._getMax(),this._getMin())}else{e=Number(e)}if(!this._validateOptionalNumberProperty("value",e)){return this}this._sOriginalValue=e;this._applyValue(e);this._disableButtons(this._parseNumber(this._getInput().getValue()),this._getMax(),this._getMin());if(e!==this._fOldValue){this._fOldValue=e;t=this.setProperty("value",e)}else{t=this}this._iRealPrecision=this._getRealValuePrecision();this._fTempValue=e;this._bValueStatePreset=false;return t};m.prototype._getNumberFormatter=function(e){if(!this._formatter||e){this._formatter=n.getFloatInstance({decimals:this.getDisplayValuePrecision()})}return this._formatter};m.prototype._getFormattedValue=function(e){var t=this.getDisplayValuePrecision(),i,s;if(e==undefined){e=this.getValue()}if(r.system.desktop){return this._getNumberFormatter().format(e)}if(t<=0){return parseFloat(e).toFixed(0)}s=e.toString().split(".");if(s.length===2){i=s[1].length;if(i>t){return parseFloat(e).toFixed(t)}return s[0]+"."+this._padZeroesRight(s[1],t)}else{return e.toString()+"."+this._padZeroesRight("0",t)}};m.prototype._padZeroesRight=function(e,t){var i="",s=e.length;for(var n=s;n<t;n++){i=i+"0"}i=e+i;return i};m.prototype._checkInputValue=function(){var e=this._getInput().getValue(),t=0;if(e===""){e=this._getDefaultValue(e,this._getMax(),this._getMin()).toString()}if(this.getDisplayValuePrecision()===0){e=Math.round(this._parseNumber(e.toLowerCase().split("e")[0])).toString()}if(this._getFormattedValue(this._fTempValue)!==e){t=this._parseNumber(e)-this._fTempValue}return t};m.prototype.onsappageup=function(e){e.preventDefault();if(this.getEditable()){this._bDelayedEventFire=true;this._changeValueWithStep(this.getLargerStep())}};m.prototype.onsappagedown=function(e){e.preventDefault();if(this.getEditable()){this._bDelayedEventFire=true;this._changeValueWithStep(-this.getLargerStep())}};m.prototype.onsappageupmodifiers=function(e){if(this.getEditable()&&this._isNumericLike(this._getMax())&&!(e.ctrlKey||e.metaKey||e.altKey)&&e.shiftKey){this._bDelayedEventFire=true;this._fTempValue=this._parseNumber(this._getInput().getValue());this._changeValueWithStep(this._getMax()-this._fTempValue)}};m.prototype.onsappagedownmodifiers=function(e){if(this.getEditable()&&this._isNumericLike(this._getMin())&&!(e.ctrlKey||e.metaKey||e.altKey)&&e.shiftKey){this._bDelayedEventFire=true;this._fTempValue=this._parseNumber(this._getInput().getValue());this._changeValueWithStep(-(this._fTempValue-this._getMin()))}};m.prototype.onsapup=function(e){e.preventDefault();if(this.getEditable()){this._bDelayedEventFire=true;this._changeValueWithStep(1);e.setMarked()}};m.prototype.onsapdown=function(e){e.preventDefault();if(this.getEditable()){this._bDelayedEventFire=true;this._changeValueWithStep(-1);e.setMarked()}};m.prototype._onmousewheel=function(e){var t=this.getDomRef().contains(document.activeElement);if(t&&this.getEditable()&&this.getEnabled()){e.preventDefault();var i=e.originalEvent,s=i.detail?-i.detail>0:i.wheelDelta>0;this._bDelayedEventFire=true;this._changeValueWithStep(s?1:-1)}};m.prototype.onkeydown=function(e){var t,i,s;if(!this.getEditable()){return}if(e.which===p.ENTER&&this._fTempValue!==this.getValue()){e.preventDefault();this._changeValue();return}this._bPaste=(e.ctrlKey||e.metaKey)&&e.which===p.V;if(e.which===p.ARROW_UP&&!e.altKey&&e.shiftKey&&(e.ctrlKey||e.metaKey)){i=this._getMax();this._fTempValue=this._parseNumber(this._getInput().getValue());t=i!==undefined?i-this._fTempValue:0}else if(e.which===p.ARROW_DOWN&&!e.altKey&&e.shiftKey&&(e.ctrlKey||e.metaKey)){s=this._getMin();this._fTempValue=this._parseNumber(this._getInput().getValue());t=s!==undefined?-(this._fTempValue-s):0}else if(e.which===p.ARROW_UP&&!(e.ctrlKey||e.metaKey||e.altKey)&&e.shiftKey){t=this.getLargerStep()}else if(e.which===p.ARROW_DOWN&&!(e.ctrlKey||e.metaKey||e.altKey)&&e.shiftKey){t=-this.getLargerStep()}else if(e.which===p.ARROW_UP&&(e.ctrlKey||e.metaKey)){t=1}else if(e.which===p.ARROW_DOWN&&(e.ctrlKey||e.metaKey)){t=-1}else if(e.which===p.ARROW_UP&&e.altKey){t=1}else if(e.which===p.ARROW_DOWN&&e.altKey){t=-1}if(t!==undefined){e.preventDefault();if(t!==0){this._bDelayedEventFire=true;this._changeValueWithStep(t)}}};m.prototype.onsapescape=function(e){if(this._fOldValue!==this._fTempValue){this._applyValue(this._fOldValue);this._bNeedsVerification=true}};m.prototype._attachLiveChange=function(){this._getInput().attachLiveChange(this._liveChange,this)};m.prototype._detachLiveChange=function(){this._getInput().detachLiveChange(this._liveChange,this)};m.prototype._attachChange=function(){this._getInput().attachChange(this._change,this)};m.prototype._liveChange=function(){this._disableButtons(this._parseNumber(this._getInput().getValue()),this._getMax(),this._getMin());this._verifyValue()};m.prototype._change=function(e){var t;var i=this._getInput().getValue();var s=this._isLessThanMin(i)||this._isMoreThanMax(i);if(!this._isButtonFocused()){if(!this._btndown||s){t=this._parseNumber(this._getFormattedValue());if(this._fOldValue===undefined){this._fOldValue=t}this._bDelayedEventFire=false;this._changeValueWithStep(0);this._changeValue();this._bNeedsVerification=true}else{this._fTempValue=this._parseNumber(this._getInput().getValue())}}};m.prototype._isMoreThanMax=function(e){return this._isNumericLike(this._getMax())&&this._getMax()<e};m.prototype._isLessThanMin=function(e){return this._isNumericLike(this._getMin())&&this._getMin()>e};m.prototype._applyValue=function(e){this._getInput().setValue(this._getFormattedValue(e))};m.prototype._calculateNewValue=function(e,t){if(t===undefined){t=e<0?false:true}var i=this.getStep(),s=this._getMax(),n=this._getMin(),a=parseFloat(this._getDefaultValue(this._getInput().getValue(),s,n)),r=t?1:-1,u=Math.abs(i)*Math.abs(e),o=a+r*u,l;if(this._areFoldChangeRequirementsFulfilled()){o=l=this._calculateClosestFoldValue(a,u,r)}else{l=this._sumValues(this._fTempValue,u,r,this._iRealPrecision)}if(this._isNumericLike(s)&&o>=s){l=s}if(this._isNumericLike(n)&&o<=n){l=n}return l};m.prototype._getRealValuePrecision=function(){var e=this.getValue().toString().split("."),t=this.getStep().toString().split("."),i,s;i=!e[1]?0:e[1].length;s=!t[1]?0:t[1].length;return i>s?i:s};m.prototype._getOrCreateDecrementButton=function(){return this._getDecrementButton()||this._createDecrementButton()};m.prototype._getOrCreateIncrementButton=function(){return this._getIncrementButton()||this._createIncrementButton()};m.prototype._inputLiveChangeHandler=function(e){var t=this.getParent()._restrictCharsWhenDecimal(e);this.setProperty("value",t?t:e.getParameter("newValue"),true)};m.prototype._restrictCharsWhenDecimal=function(e){var t=r.system.desktop?this._getNumberFormatter().oFormatOptions.decimalSeparator:".";var i=e.getParameter("value").indexOf(t),s=this.getDisplayValuePrecision(),n=e.getParameter("value"),a;if(i>0&&s>=0){var u=n.split(t)[1],o=u?u.length:0,l=n.split(t)[0],h=s>0?n.substring(n.indexOf(t)+1,n.length):"";if(!this._bPaste){if(o>s){a=l+(s>0?t+h.substr(0,s):"");this._showWrongValueVisualEffect()}}else{if(n.indexOf(t)){a=n.split(t)[0]+(s>0?t+u.substring(0,s):"")}this._bPaste=false}}else{a=n}if(this._getInput()._getInputValue()!==a){this._getInput().updateDomValue(a)}return a};m.prototype._showWrongValueVisualEffect=function(){var e=this.getValueState(),t=this._getInput();if(e===f.Error){return}t.setValueState(f.Error);setTimeout(t["setValueState"].bind(t,e),1e3)};m.prototype._getDefaultValue=function(e,t,i){if(e!==""&&e!==undefined){return this._parseNumber(this._getInput().getValue())}if(this._isNumericLike(i)&&i>0){return i}else if(this._isNumericLike(t)&&t<0){return t}else{return 0}};m.prototype._isNumericLike=function(e){return!isNaN(e)&&e!==null&&e!==""};m.prototype._isInteger=function(e){return e===parseInt(e)};m.prototype._isButtonFocused=function(){return document.activeElement===this._getIncrementButton().getDomRef()||document.activeElement===this._getDecrementButton().getDomRef()};m.prototype._sumValues=function(e,t,i,s){var n=Math.pow(10,s),a=parseInt((e*n).toFixed(1)),r=parseInt((t*n).toFixed(1));return(a+i*r)/n};m.prototype._areFoldChangeRequirementsFulfilled=function(){return this.getStepMode()===c.Multiple&&this.getDisplayValuePrecision()===0&&this._isInteger(this.getStep())&&this._isInteger(this.getLargerStep())};m.prototype._calculateClosestFoldValue=function(e,t,i){var s=Math.floor(e),n=t;do{s+=i;n--}while(s%t!==0&&n);if(s%t!==0){_.error("Wrong next/previous value "+s+" for "+e+", step: "+t+" and sign: "+i,this)}return s};function V(e){return typeof e==="number"&&!isNaN(e)&&e>=0&&e<=20}m.prototype._calcWaitTimeout=function(){this._speed*=m.ACCELLERATION;this._waitTimeout=this._waitTimeout-this._speed<m.MIN_WAIT_TIMEOUT?m.MIN_WAIT_TIMEOUT:this._waitTimeout-this._speed;return this._waitTimeout};m.prototype._spinValues=function(e){this._spinTimeoutId=setTimeout(function(){if(this._btndown){this._bSpinStarted=true;this._bDelayedEventFire=true;this._changeValueWithStep(e?1:-1);this._disableButtons(this._parseNumber(this._getInput().getValue()),this._getMax(),this._getMin());if(this._getIncrementButton().getEnabled()&&e||this._getDecrementButton().getEnabled()&&!e){this._spinValues(e)}}}.bind(this),this._calcWaitTimeout())};m.prototype._attachEvents=function(e,t){var i={onmousedown:function(e){if(e.button===0&&!this._btndown){this._btndown=true;this._waitTimeout=m.INITIAL_WAIT_TIMEOUT;this._speed=m.INITIAL_SPEED;this._spinValues(t)}}.bind(this),onmouseup:function(e){if(e.button===0){this._bDelayedEventFire=undefined;this._btndown=false;this._stopSpin()}}.bind(this),onmouseout:function(e){if(this._btndown){this._bDelayedEventFire=undefined;this._stopSpin()}}.bind(this),oncontextmenu:function(e){e.stopImmediatePropagation(true);if(e.originalEvent&&e.originalEvent.cancelable){e.preventDefault()}e.stopPropagation()},ontouchend:function(e){if(r.system.phone||r.system.tablet){this._bDelayedEventFire=undefined;this._btndown=false;this._stopSpin()}if(e.originalEvent&&e.originalEvent.cancelable){e.preventDefault()}if(t){this._getIncrementButton().invalidate()}else{this._getDecrementButton().invalidate()}}.bind(this)};e.addDelegate(i,true)};m.prototype._stopSpin=function(){this._resetSpinValues();if(this._bSpinStarted){this._changeValue()}};m.prototype._getMin=function(){var e=this.getBinding("value"),t=e&&e.getType&&e.getType(),i=t&&t.oConstraints&&t.oConstraints.minimum;return i!==undefined?parseFloat(i):this.getMin()};m.prototype._getMax=function(){var e=this.getBinding("value"),t=e&&e.getType&&e.getType(),i=t&&t.oConstraints&&t.oConstraints.maximum;return i!==undefined?parseFloat(i):this.getMax()};m.prototype.getIdForLabel=function(){return this._getInput().getIdForLabel()};m.prototype.onfocusout=function(e){if(!this._btndown){this._changeValueWithStep(0);if(this._bDelayedEventFire&&this._fTempValue!==this._fOldValue){this._bDelayedEventFire=undefined;this._changeValue()}}};m.prototype.getFocusDomRef=function(){return this.getAggregation("_input").getFocusDomRef()};m.prototype._resetSpinValues=function(){clearTimeout(this._spinTimeoutId);this._waitTimeout=500;this._speed=120};m.prototype.getAccessibilityInfo=function(){return{type:i.getResourceBundleFor("sap.m").getText("ACC_CTR_TYPE_STEPINPUT"),description:this.getValue()||"",focusable:this.getEnabled(),enabled:this.getEnabled(),editable:this.getEnabled()&&this.getEditable()}};m.prototype._parseNumber=function(e){if(r.system.desktop){return this._getNumberFormatter().parse(e)}return Number(e)};return m});
//# sourceMappingURL=StepInput.js.map