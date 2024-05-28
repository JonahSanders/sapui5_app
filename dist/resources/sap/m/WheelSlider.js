/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","./WheelSliderRenderer","sap/ui/core/ControlBehavior","sap/ui/core/IconPool","sap/ui/Device","sap/ui/events/KeyCodes","sap/m/Button","sap/ui/thirdparty/jquery","sap/ui/core/Configuration"],function(e,t,i,s,n,o,a,jQuery,r){"use strict";var h=e.extend("sap.m.WheelSlider",{metadata:{library:"sap.m",properties:{selectedKey:{type:"string",defaultValue:null},isCyclic:{type:"boolean",defaultValue:true},label:{type:"string",defaultValue:null},isExpanded:{type:"boolean",defaultValue:false}},aggregations:{items:{type:"sap.ui.core.Item",multiple:true,singularName:"item"},_arrowUp:{type:"sap.m.Button",multiple:false,visibility:"hidden"},_arrowDown:{type:"sap.m.Button",multiple:false,visibility:"hidden"}},events:{expanded:{},collapsed:{},selectedKeyChange:{parameters:{newKey:{type:"string"}}}}},renderer:t});var l=i.getAnimationMode();var d=l!==r.AnimationMode.none&&l!==r.AnimationMode.minimal;var u=d?200:0;var f=32;var p=32;var c=1;h.prototype.init=function(){this._bIsDrag=null;this._selectionOffset=0;this._mousedown=false;this._dragSession=null;this._iSelectedItemIndex=-1;this._animatingSnap=false;this._iSelectedIndex=-1;this._animating=false;this._intervalId=null;this._maxScrollTop=null;this._minScrollTop=null;this._marginTop=null;this._marginBottom=null;this._bOneTimeValueSelectionAnimation=false;this._bEnabled=true;if(n.system.desktop){this._fnHandleTypeValues=I.call(this)}this._onTouchStart=jQuery.proxy(_,this);this._onTouchMove=jQuery.proxy(S,this);this._onTouchEnd=jQuery.proxy(v,this);this._onMouseWheel=this._onMouseWheel.bind(this);this._initArrows()};h.prototype.exit=function(){var e=this._getSliderContainerDomRef();if(e){e.stop()}this._stopAnimation();if(e[0]){this._detachEvents()}};h.prototype.onBeforeRendering=function(){if(this._getSliderContainerDomRef()[0]){this._detachEvents()}};h.prototype.onAfterRendering=function(){if(this._marginTop){this._previousMarginTop=this._marginTop}if(this._marginBottom){this._previousMarginBottom=this._marginBottom}if(this.getItems().length){this._updateDynamicLayout(this.getIsExpanded())}this._attachEvents()};h.prototype.onThemeChanged=function(e){this.invalidate()};h.prototype._handleTap=function(e){var t,i,s;if(!this.getIsExpanded()){if(n.system.desktop){this.focus()}else{this.setIsExpanded(true)}}else{t=e.srcElement||e.originalTarget;if(t&&t.tagName.toLowerCase()==="li"){i=jQuery(t).text();s=y.call(this,i);this._iClickedIndex=Array.prototype.slice.call(t.parentElement.children).indexOf(t);this._bOneTimeValueSelectionAnimation=true;this.setSelectedKey(s);this.fireSelectedKeyChange({newKey:s})}else{this._addSelectionStyle();this.focus()}}};h.prototype.setSelectedKey=function(e,t){var i=t!==undefined?!t:true,s=g(this.getItems(),function(t){return t.getKey()===e}),s,n,o;this.setProperty("selectedKey",e,i);if(!i||s===-1){return this}s-=this.iMinIndex;if(this.getDomRef()){n=this._getSliderContainerDomRef();o=this._getItemHeightInPx();if(this._bOneTimeValueSelectionAnimation){n.scrollTop((s-this._iClickedIndex+this._iSelectedItemIndex)*o-this._selectionOffset);this._animatingSnap=true;n.animate({scrollTop:s*o-this._selectionOffset},u,"linear",function(){n.clearQueue();this._animatingSnap=false;this._bOneTimeValueSelectionAnimation=false}.bind(this))}else{n.scrollTop(s*o-this._selectionOffset)}this._removeSelectionStyle();this._iSelectedItemIndex=s;this._addSelectionStyle()}return this};h.prototype.setIsExpanded=function(e,t){this.setProperty("isExpanded",e,true);if(!this.getDomRef()){return this}var i=this.$();if(e){i.addClass("sapMWSExpanded");this._updateDynamicLayout(true);if(!t){this.fireExpanded({ctrl:this})}}else{this._stopAnimation();if(this._animatingSnap===true){this._animatingSnap=false;this._getSliderContainerDomRef().stop(true);if(this._animatingTargetIndex!==null&&this._animatingTargetIndex!==undefined){this._scrollerSnapped(this._animatingTargetIndex);this._animatingTargetIndex=null}else if(this._iSelectedIndex!==-1){this._scrollerSnapped(this._iSelectedIndex)}}i.removeClass("sapMWSExpanded");this._updateDynamicLayout(false);if(!t){this.fireCollapsed({ctrl:this})}}return this};h.prototype.onfocusin=function(e){if(n.system.desktop&&!this.getIsExpanded()){this.setIsExpanded(true)}};h.prototype.onfocusout=function(e){var t=e.relatedTarget?e.relatedTarget.id:null,i=[this.getAggregation("_arrowUp").getId(),this.getAggregation("_arrowDown").getId()];if(t&&i.indexOf(t)!==-1){return}if(n.system.desktop&&this.getIsExpanded()){this.setIsExpanded(false)}};h.prototype._onMouseWheel=function(e){var t,i,s;e.preventDefault();e.stopPropagation();if(!this.getIsExpanded()){return false}t=e.originalEvent;i=t.detail?-t.detail>0:t.wheelDelta>0;s=t.detail?-t.detail/3:t.wheelDelta/120;if(!s){return false}this._handleWheelScroll(i,s)};h.prototype._handleWheelScroll=function(e,t){var i=e?Math.ceil:Math.floor,s;if(!this._aWheelDeltas){this._aWheelDeltas=[]}this._aWheelDeltas.push(t);if(!this._bWheelScrolling){this._bWheelScrolling=true;this._stopAnimation();this._animating=true;this._intervalId=setInterval(function(){if(!this._aWheelDeltas.length){this._stopAnimation();this._bWheelScrolling=false}else{s=this._aWheelDeltas[0];this._aWheelDeltas=[];s=i(s);if(s){this._offsetValue(s)}}}.bind(this),150)}return false};h.prototype.onsappageup=function(e){if(this.getIsExpanded()){var t=this.getItems()[0],i=t.getKey();this.setSelectedKey(i,true);this.fireSelectedKeyChange({newKey:i})}};h.prototype.onsappagedown=function(e){if(this.getIsExpanded()){var t=this.getItems()[this.getItems().length-1],i=t.getKey();this.setSelectedKey(i,true);this.fireSelectedKeyChange({newKey:i})}};h.prototype.onsapup=function(e){if(this.getIsExpanded()){this._offsetAnimateValue(-1)}};h.prototype.onsapdown=function(e){if(this.getIsExpanded()){this._offsetAnimateValue(1)}};h.prototype.onkeydown=function(e){var t=e.which||e.keyCode,i=o;if(t>=i.NUMPAD_0&&t<=i.NUMPAD_9){t=this._convertNumPadToNumKeyCode(t)}if(t>=i.A&&t<=i.Z||t>=i.DIGIT_0&&t<=i.DIGIT_9){this._fnHandleTypeValues(e.timeStamp,t)}};h.prototype._getSliderContainerDomRef=function(){return this.$().find(".sapMWSInner")};h.prototype._getItemHeightInPx=function(){return this.$("content").find("li")[0].getBoundingClientRect().height};h.prototype._updateSelectionFrameLayout=function(){var e,t,i,s,n=this.$().offset(),o=n?n.top:0,a=this.$().parents(".sapMWSContainer").offset(),r=a?a.top:0;if(this.getDomRef()){s=this._getItemHeightInPx();e=this.$().find(".sapMWSSelectionFrame");i=o-r;t=(this.$().height()-s+f)/2+i;e.css("top",t)}};h.prototype._updateConstrainedMargins=function(e){var t=this._getItemHeightInPx(),i,s,n,o,a,r,h,l;if(this.getDomRef()){t=this._getItemHeightInPx();i=this.$().find(".SliderValues3,.SliderValues4,.SliderValues5,.SliderValues6,.SliderValues7,.SliderValues8,.SliderValues9,.SliderValues10,.SliderValues11,.SliderValues12");if(!i.length){return}if(e){s=this.getItems().length;n=t*Math.floor(s/2);o=t*Math.ceil(s/2);r=this.$().parents().hasClass("sapUiSizeCompact")?p:0;a=(this.$().height()-t+f)/2;h=a-n-f-r;l=this.$().height()-a-o-r;h=Math.max(h,0);l=Math.max(l,0)}else{h=0;l=0}i.css("margin-top",h);i.css("margin-bottom",l)}};h.prototype._updateDynamicLayout=function(e){if(this.getDomRef()){this._updateConstrainedMargins(e);if(e){this._updateSelectionFrameLayout()}this._updateMargins();this._updateSelectionOffset();this._reselectCurrentItem();this.$().attr("aria-expanded",e)}};h.prototype._getSelectionFrameTopOffset=function(){var e=this._getSliderContainerDomRef().find(".sapMWSSelectionFrame"),t=e.offset();return t.top};h.prototype._animateScroll=function(e){var t=this._getSliderContainerDomRef(),i=t.scrollTop(),s=25,n=this.getIsCyclic(),o=.9,a=.05;this._animating=true;this._intervalId=setInterval(function(){i=i-e*s;if(!n){if(i>this._maxScrollTop){i=this._maxScrollTop;e=0}if(i<this._minScrollTop){i=this._minScrollTop;e=0}}t.scrollTop(i);e*=o;if(Math.abs(e)<a){this._stopAnimation();var r=this._getItemHeightInPx();var h=this._selectionOffset?this._selectionOffset%r:0;var l=Math.round((i+h)/r)*r-h;this._iSelectedIndex=Math.round((i+this._selectionOffset)/r);if(this._animatingSnap){return}this._animatingSnap=true;t.animate({scrollTop:l},u,"linear",function(){t.clearQueue();this._animatingSnap=false;if(t.css("visibility")==="visible"&&!this._animating){this._scrollerSnapped(this._iSelectedIndex)}}.bind(this))}}.bind(this),s)};h.prototype.getSelectedItemIndex=function(){var e=this.getSelectedKey();if(!e){return 0}return g(this.getItems(),function(t){return t.getKey()===e})};h.prototype._reselectCurrentItem=function(){var e=this.getSelectedItemIndex(),t;if(e===-1){return}t=this.getItems()[e].getKey();this.setSelectedKey(t)};h.prototype._updateSelectionOffset=function(){var e=this._getSelectionFrameTopOffset(),t=this._getSliderContainerDomRef(),i=t.offset();if(this.getIsCyclic()&&this.getIsExpanded()){this._selectionOffset=e-i.top}else{this._selectionOffset=0}};h.prototype._stopAnimation=function(){if(this._animating){clearInterval(this._intervalId);this._intervalId=null;this._animating=null}};h.prototype._startDrag=function(e){if(!this._dragSession){this._dragSession={};this._dragSession.positions=[]}this._dragSession.pageY=e;this._dragSession.startTop=this._getSliderContainerDomRef().scrollTop()};h.prototype._doDrag=function(e,t){if(this._dragSession){this._dragSession.offsetY=e-this._dragSession.pageY;this._dragSession.positions.push({pageY:e,timeStamp:t});if(this._dragSession.positions.length>20){this._dragSession.positions.splice(0,10)}if(this._bIsDrag){this._getSliderContainerDomRef().scrollTop(this._dragSession.startTop-this._dragSession.offsetY)}}};h.prototype._endDrag=function(e,t){if(this._dragSession){var i,s;for(var n=this._dragSession.positions.length-1;n>=0;n--){i=t-this._dragSession.positions[n].timeStamp;s=e-this._dragSession.positions[n].pageY;if(i>100){break}}var o=s/i;this._stopAnimation();this._dragSession=null;o=Math.min(o,c);o=Math.max(o,-c);this._animateScroll(o)}};h.prototype._updateMargins=function(){var e=this._getSelectionFrameTopOffset(),t=this._getSliderContainerDomRef(),i=t.offset(),s,n,o,a;if(!this.getIsCyclic()){n=this.$("content");a=this._getItemHeightInPx();o=this.$().height();if(this.getIsExpanded()){this._minScrollTop=0;this._marginTop=e-i.top;this._maxScrollTop=a*(this.getItems().length-1);s=t.height();this._marginBottom=s-this._marginTop-a;if(this._marginBottom<0){this._marginBottom=o-this._marginTop-a}}else{this._marginTop=0;this._marginBottom=o-a}if(this._previousMarginTop!==this._marginTop){n.css("margin-top",this._marginTop);this._previousMarginTop=this._marginTop}if(this._previousMarginBottom!==this._marginBottom){n.css("margin-bottom",this._marginBottom);this._previousMarginBottom=this._marginBottom}}};h.prototype._scrollerSnapped=function(e){var t=e,i=this.getItems().length,s;if(!this.getIsCyclic()){t=e}var n=t+this.iMinIndex;if(this.getIsCyclic()){while(n<0){n=n+i}while(n>=i){n=n-i}}else{n=Math.min(i-1,n)}s=this.getItems()[n].getKey();var o=this.getIsCyclic()||this.iPreviousMiddle>n&&this.iMinIndex>0||this.iPreviousMiddle<n&&this.iMaxIndex<i-1;this.setSelectedKey(s,o);this.fireSelectedKeyChange({newKey:s})};h.prototype._addSelectionStyle=function(){var e=this.$("content").find("li"),t=e.eq(this._iSelectedItemIndex).text(),i,s;if(!t){return}s=t;if(s&&s.length>1&&s.indexOf("0")===0){s=s.substring(1)}e.eq(this._iSelectedItemIndex).addClass("sapMWSItemSelected");i=this.getDomRef("valDescription");if(i.innerText!==s){i.innerText=s}};h.prototype._removeSelectionStyle=function(){var e=this.$("content").find("li");e.eq(this._iSelectedItemIndex).removeClass("sapMWSItemSelected")};h.prototype._attachEvents=function(){var e=this._getSliderContainerDomRef()[0];if(n.system.combi){e.addEventListener("touchstart",this._onTouchStart,false);e.addEventListener("touchmove",this._onTouchMove,false);document.addEventListener("touchend",this._onTouchEnd,false);e.addEventListener("mousedown",this._onTouchStart,false);document.addEventListener("mousemove",this._onTouchMove,false);document.addEventListener("mouseup",this._onTouchEnd,false)}else{if(n.system.phone||n.system.tablet){e.addEventListener("touchstart",this._onTouchStart,false);e.addEventListener("touchmove",this._onTouchMove,false);document.addEventListener("touchend",this._onTouchEnd,false)}else{e.addEventListener("mousedown",this._onTouchStart,false);document.addEventListener("mousemove",this._onTouchMove,false);document.addEventListener("mouseup",this._onTouchEnd,false)}}this.$().on("selectstart",m);this.$().on(n.browser.firefox?"DOMMouseScroll":"mousewheel",this._onMouseWheel)};function m(){return false}h.prototype._detachEvents=function(){var e=this._getSliderContainerDomRef()[0];if(n.system.combi){e.removeEventListener("touchstart",this._onTouchStart,false);e.removeEventListener("touchmove",this._onTouchMove,false);document.removeEventListener("touchend",this._onTouchEnd,false);e.removeEventListener("mousedown",this._onTouchStart,false);document.removeEventListener("mousemove",this._onTouchMove,false);document.removeEventListener("mouseup",this._onTouchEnd,false)}else{if(n.system.phone||n.system.tablet){e.removeEventListener("touchstart",this._onTouchStart,false);e.removeEventListener("touchmove",this._onTouchMove,false);document.removeEventListener("touchend",this._onTouchEnd,false)}else{e.removeEventListener("mousedown",this._onTouchStart,false);document.removeEventListener("mousemove",this._onTouchMove,false);document.removeEventListener("mouseup",this._onTouchEnd,false)}}this.$().off("selectstart",m);this.$().off(n.browser.firefox?"DOMMouseScroll":"mousewheel",this._onMouseWheel)};h.prototype._offsetAnimateValue=function(e){var t=this._getSliderContainerDomRef(),i,s=this._getItemHeightInPx(),n,o,a=this.getIsCyclic();this._stopAnimation();if(this._animatingSnap===true){this._animatingSnap=false;this._getSliderContainerDomRef().stop(true);if(this._animatingTargetIndex!==null&&this._animatingTargetIndex!==undefined){this._scrollerSnapped(this._animatingTargetIndex);this._animatingTargetIndex=null}else if(this._iSelectedIndex!==-1){this._scrollerSnapped(this._iSelectedIndex)}}o=this._iSelectedItemIndex+e;i=t.scrollTop();n=i+e*s;if(!a){if(o<0||o>=this.getItems().length){return}if(n>this._maxScrollTop){n=this._maxScrollTop}if(n<this._minScrollTop){n=this._minScrollTop}}this._animatingSnap=true;this._animatingTargetIndex=o;t.animate({scrollTop:n},u,"linear",function(){t.clearQueue();this._animatingSnap=false;this._animatingTargetIndex=null;if(t.css("visibility")==="visible"){this._scrollerSnapped(o)}}.bind(this))};h.prototype._offsetValue=function(e){var t=this._getSliderContainerDomRef().scrollTop(),i=this.getIsCyclic(),s=this._getItemHeightInPx();t=t-e*s;if(!i){if(t>this._maxScrollTop){t=this._maxScrollTop}if(t<this._minScrollTop){t=this._minScrollTop}}this._getSliderContainerDomRef().scrollTop(t);this._iSelectedIndex=Math.round((t+this._selectionOffset)/s);this._scrollerSnapped(this._iSelectedIndex)};h.prototype._initArrows=function(){var e,t;e=new a({icon:s.getIconURI("slim-arrow-up"),press:function(e){this._offsetAnimateValue(-1)}.bind(this),type:"Transparent"});e.addEventDelegate({onAfterRendering:function(){e.$().attr("tabindex",-1)}});this.setAggregation("_arrowUp",e);t=new a({icon:s.getIconURI("slim-arrow-down"),press:function(e){this._offsetAnimateValue(1)}.bind(this),type:"Transparent"});t.addEventDelegate({onAfterRendering:function(){t.$().attr("tabindex",-1)}});this.setAggregation("_arrowDown",t)};h.prototype._convertNumPadToNumKeyCode=function(e){var t=o;if(e>=t.NUMPAD_0&&e<=t.NUMPAD_9){e-=48}return e};function g(e,t){if(e==null){throw new TypeError("findIndex called with null or undefined array")}if(typeof t!=="function"){throw new TypeError("predicate must be a function")}var i=e.length;var s=arguments[1];var n;for(var o=0;o<i;o++){n=e[o];if(t.call(s,n,o,e)){return o}}return-1}var _=function(e){var t=e.touches&&e.touches.length?e.touches[0].pageY:e.pageY;this._bIsDrag=false;if(!this.getIsExpanded()){return}this._stopAnimation();this._startDrag(t);if(!n.system.desktop){e.preventDefault()}this._mousedown=true};var S=function(e){var t=e.touches&&e.touches.length?e.touches[0].pageY:e.pageY;if(!this._mousedown||!this.getIsExpanded()){return}if(!this._bIsDrag&&this._dragSession&&this._dragSession.positions.length){var i=this._dragSession.positions.some(function(e){return Math.abs(e.pageY-t)>5});if(i){this._bIsDrag=true}}this._doDrag(t,e.timeStamp);this._mousedown=true};var v=function(e){var t=e.changedTouches&&e.changedTouches.length?e.changedTouches[0].pageY:e.pageY;if(this._bIsDrag===false){this._handleTap(e);this._dragSession=null}this._bIsDrag=true;if(!this.getIsExpanded()){this._dragSession=null;return}this._endDrag(t,e.timeStamp);this._mousedown=false};var y=function(e){var t=this.getItems();var i=g(t,function(t){return t.getText()===e});return t[i].getKey()};var I=function(){var e=-1,t=-1,i=1e3,s="",n=function(n,o){var a;if(e+i<n){s=""}else{if(t!==-1){clearTimeout(t);t=-1}}s+=String.fromCharCode(o).toLowerCase();a=this.getItems().filter(function(e){return e.getText().indexOf(s)===0});if(a.length>1){t=setTimeout(function(){this.setSelectedKey(a[0].getKey(),true);s="";t=-1}.bind(this),i)}else if(a.length===1){this.setSelectedKey(a[0].getKey(),true);s=""}else{s=""}e=n};return n};return h});
//# sourceMappingURL=WheelSlider.js.map