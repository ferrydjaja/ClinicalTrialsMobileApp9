/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/Control','sap/ui/Device','sap/ui/core/LocaleData','sap/ui/core/delegate/ItemNavigation','sap/ui/unified/calendar/CalendarUtils','sap/ui/unified/calendar/CalendarDate','sap/ui/unified/library','sap/ui/core/format/DateFormat','sap/ui/core/library','sap/ui/core/Locale',"./MonthRenderer",'jquery.sap.keycodes'],function(q,C,D,L,I,a,b,l,c,d,e,M){"use strict";var f=d.CalendarType;var g=l.CalendarDayType;var h=C.extend("sap.ui.unified.calendar.Month",{metadata:{library:"sap.ui.unified",properties:{date:{type:"object",group:"Data"},intervalSelection:{type:"boolean",group:"Behavior",defaultValue:false},singleSelection:{type:"boolean",group:"Behavior",defaultValue:true},showHeader:{type:"boolean",group:"Appearance",defaultValue:false},firstDayOfWeek:{type:"int",group:"Appearance",defaultValue:-1},nonWorkingDays:{type:"int[]",group:"Appearance",defaultValue:null},primaryCalendarType:{type:"sap.ui.core.CalendarType",group:"Appearance"},secondaryCalendarType:{type:"sap.ui.core.CalendarType",group:"Appearance"},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},showWeekNumbers:{type:"boolean",group:"Appearance",defaultValue:true}},aggregations:{selectedDates:{type:"sap.ui.unified.DateRange",multiple:true,singularName:"selectedDate"},specialDates:{type:"sap.ui.unified.DateTypeRange",multiple:true,singularName:"specialDate"},disabledDates:{type:"sap.ui.unified.DateRange",multiple:true,singularName:"disabledDate"}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"},legend:{type:"sap.ui.unified.CalendarLegend",multiple:false}},events:{select:{},focus:{parameters:{date:{type:"object"},otherMonth:{type:"boolean"},restoreOldDate:{type:"boolean"}}}}}});h.prototype.init=function(){var i=sap.ui.getCore().getConfiguration().getCalendarType();this.setProperty("primaryCalendarType",i);this.setProperty("secondaryCalendarType",i);this._oFormatYyyymmdd=c.getInstance({pattern:"yyyyMMdd",calendarType:f.Gregorian});this._oFormatLong=c.getInstance({style:"long",calendarType:i});this._mouseMoveProxy=q.proxy(this._handleMouseMove,this);this._iColumns=7;this._aVisibleDays=[];};h.prototype.exit=function(){if(this._oItemNavigation){this.removeDelegate(this._oItemNavigation);this._oItemNavigation.destroy();delete this._oItemNavigation;}if(this._sInvalidateMonth){q.sap.clearDelayedCall(this._sInvalidateMonth);}this._aVisibleDays=null;};h.prototype.onAfterRendering=function(){_.call(this);s.call(this);};h.prototype.onmouseover=function(E){var t=q(E.target),S,i,u;if(!this.getIntervalSelection()){return;}S=this.getSelectedDates()[0];if(!S||!S.getStartDate()||S.getEndDate()){return;}if(!t.hasClass('sapUiCalItemText')&&!t.hasClass('sapUiCalItem')){return;}if(t.hasClass('sapUiCalItemText')){t=t.parent();}i=parseInt(this._oFormatYyyymmdd.format(S.getStartDate()),10);u=t.data("sapDay");if(i>u){i=i+u;u=i-u;i=i-u;}if(this.hasListeners("datehovered")){this.fireEvent("datehovered",{date1:i,date2:u});}else{this._markDatesBetweenStartAndHoveredDate(i,u);}};h.prototype._markDatesBetweenStartAndHoveredDate=function(t,u){var v,$,w,i;v=this.$().find(".sapUiCalItem");for(i=0;i<v.length;i++){$=q(v[i]);w=$.data('sapDay');if(w>t&&w<u){$.addClass('sapUiCalItemSelBetween');}else{$.removeClass('sapUiCalItemSelBetween');}}};h.prototype.onsapfocusleave=function(E){if(!E.relatedControlId||!q.sap.containsOrEquals(this.getDomRef(),sap.ui.getCore().byId(E.relatedControlId).getFocusDomRef())){if(this._bMouseMove){this._unbindMousemove(true);var S=this._selectDay(this._getDate());if(!S&&this._oMoveSelectedDate){this._selectDay(this._oMoveSelectedDate);}this._bMoveChange=false;this._bMousedownChange=false;this._oMoveSelectedDate=undefined;r.call(this);}if(this._bMousedownChange){this._bMousedownChange=false;r.call(this);}}};h.prototype.removeAllSelectedDates=function(){this._bDateRangeChanged=true;var R=this.removeAllAggregation("selectedDates");return R;};h.prototype.destroySelectedDates=function(){this._bDateRangeChanged=true;var i=this.destroyAggregation("selectedDates");return i;};h.prototype.removeAllSpecialDates=function(){this._bDateRangeChanged=true;var R=this.removeAllAggregation("specialDates");return R;};h.prototype.destroySpecialDates=function(){this._bDateRangeChanged=true;var i=this.destroyAggregation("specialDates");return i;};h.prototype.removeAllDisabledDates=function(){this._bDateRangeChanged=true;var R=this.removeAllAggregation("disabledDates");return R;};h.prototype.destroyDisabledDates=function(){this._bDateRangeChanged=true;var i=this.destroyAggregation("disabledDates");return i;};h.prototype.setDate=function(i){var t=b.fromLocalJSDate(i,this.getPrimaryCalendarType());m.call(this,t,false);return this;};h.prototype._setDate=function(i){var t=i.toLocalJSDate();this.setProperty("date",t,true);this._oDate=i;};h.prototype._getDate=function(){if(!this._oDate){this._oDate=b.fromLocalJSDate(new Date(),this.getPrimaryCalendarType());}return this._oDate;};h.prototype.displayDate=function(i){var t=b.fromLocalJSDate(i,this.getPrimaryCalendarType());m.call(this,t,true);return this;};h.prototype.setPrimaryCalendarType=function(i){this.setProperty("primaryCalendarType",i);this._oFormatLong=c.getInstance({style:"long",calendarType:i});if(this._oDate){this._oDate=new b(this._oDate,i);}return this;};h.prototype.setSecondaryCalendarType=function(i){this._bSecondaryCalendarTypeSet=true;this.setProperty("secondaryCalendarType",i);this.invalidate();this._oFormatSecondaryLong=c.getInstance({style:"long",calendarType:i});return this;};h.prototype._getSecondaryCalendarType=function(){var S;if(this._bSecondaryCalendarTypeSet){S=this.getSecondaryCalendarType();var P=this.getPrimaryCalendarType();if(S==P){S=undefined;}}return S;};h.prototype._getLocale=function(){var P=this.getParent();if(P&&P.getLocale){return P.getLocale();}else if(!this._sLocale){this._sLocale=sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale().toString();}return this._sLocale;};h.prototype._getLocaleData=function(){var P=this.getParent();if(P&&P._getLocaleData){return P._getLocaleData();}else if(!this._oLocaleData){var i=this._getLocale();var t=new e(i);this._oLocaleData=L.getInstance(t);}return this._oLocaleData;};h.prototype._getFormatLong=function(){var i=this._getLocale();if(this._oFormatLong.oLocale.toString()!=i){var t=new e(i);this._oFormatLong=c.getInstance({style:"long",calendarType:this.getPrimaryCalendarType()},t);if(this._oFormatSecondaryLong){this._oFormatSecondaryLong=c.getInstance({style:"long",calendarType:this._getSecondaryCalendarType()},t);}}return this._oFormatLong;};h.prototype.getIntervalSelection=function(){var P=this.getParent();if(P&&P.getIntervalSelection){return P.getIntervalSelection();}else{return this.getProperty("intervalSelection");}};h.prototype.getSingleSelection=function(){var P=this.getParent();if(P&&P.getSingleSelection){return P.getSingleSelection();}else{return this.getProperty("singleSelection");}};h.prototype.getSelectedDates=function(){var P=this.getParent();if(P&&P.getSelectedDates){return P.getSelectedDates();}else{return this.getAggregation("selectedDates",[]);}};h.prototype.getSpecialDates=function(){var P=this.getParent();if(P&&P.getSpecialDates){return P.getSpecialDates();}else{return this.getAggregation("specialDates",[]);}};h.prototype.getDisabledDates=function(){var P=this.getParent();if(P&&P.getDisabledDates){return P.getDisabledDates();}else{return this.getAggregation("disabledDates",[]);}};h.prototype._getShowHeader=function(){var P=this.getParent();if(P&&P._getShowMonthHeader){return P._getShowMonthHeader();}else{return this.getProperty("showHeader");}};h.prototype.getAriaLabelledBy=function(){var P=this.getParent();if(P&&P.getAriaLabelledBy){return P.getAriaLabelledBy();}else{return this.getAssociation("ariaLabelledBy",[]);}};h.prototype.getLegend=function(){var P=this.getParent();if(P&&P.getLegend){return P.getLegend();}else{return this.getAssociation("legend",[]);}};h.prototype._getFirstDayOfWeek=function(){var P=this.getParent();var F=0;if(P&&P.getFirstDayOfWeek){F=P.getFirstDayOfWeek();}else{F=this.getProperty("firstDayOfWeek");}if(F<0||F>6){var i=this._getLocaleData();F=i.getFirstDayOfWeek();}return F;};h.prototype._getNonWorkingDays=function(){var P=this.getParent();var N;if(P&&P.getNonWorkingDays){N=P.getNonWorkingDays();}else{N=this.getProperty("nonWorkingDays");}if(N&&!q.isArray(N)){N=[];}return N;};h.prototype._checkDateSelected=function(t){a._checkCalendarDate(t);var S=0;var u=this.getSelectedDates();var T=t.toUTCJSDate().getTime();var v=this.getPrimaryCalendarType();for(var i=0;i<u.length;i++){var R=u[i];var w=R.getStartDate();var x=0;if(w){w=b.fromLocalJSDate(w,v);x=w.toUTCJSDate().getTime();}var E=R.getEndDate();var y=0;if(E){E=b.fromLocalJSDate(E,v);y=E.toUTCJSDate().getTime();}if(T==x&&!E){S=1;break;}else if(T==x&&E){S=2;if(E&&T==y){S=5;}break;}else if(E&&T==y){S=3;break;}else if(E&&T>x&&T<y){S=4;break;}if(this.getSingleSelection()){break;}}return S;};h.prototype._getDateTypes=function(t){a._checkCalendarDate(t);var T,u,N,v=[];var S=this.getSpecialDates();var w=t.toUTCJSDate().getTime();var x=this.getPrimaryCalendarType();for(var i=0;i<S.length;i++){var R=S[i];var y=R.getStartDate();var z=a.MAX_MILLISECONDS;if(y){y=b.fromLocalJSDate(y,x);z=y.toUTCJSDate().getTime();}var E=R.getEndDate();var A=-a.MAX_MILLISECONDS;if(E){E=b.fromLocalJSDate(E,x);A=E.toUTCJSDate().getTime();}N=R.getType()===g.NonWorking;if((w==z&&!E)||(w>=z&&w<=A)){if(!N&&!T){T={type:R.getType(),tooltip:R.getTooltip_AsString()};v.push(T);}else if(N&&!u){u={type:R.getType(),tooltip:R.getTooltip_AsString()};v.push(u);}if(T&&u){break;}}}return v;};h.prototype._checkDateEnabled=function(t){a._checkCalendarDate(t);var E=true;var u=this.getDisabledDates();var T=t.toUTCJSDate().getTime();var v=this.getPrimaryCalendarType();var P=this.getParent();if(P&&P._oMinDate&&P._oMaxDate){if(T<P._oMinDate.valueOf()||T>P._oMaxDate.valueOf()){return false;}}for(var i=0;i<u.length;i++){var R=u[i];var S=R.getStartDate();var w=0;if(S){S=b.fromLocalJSDate(S,v);w=S.toUTCJSDate().getTime();}var x=R.getEndDate();var y=0;if(x){x=b.fromLocalJSDate(x,v);y=x.toUTCJSDate().getTime();}if(x){if(T>w&&T<y){E=false;break;}}else if(T==w){E=false;break;}}return E;};h.prototype.setWidth=function(w){this.setProperty("width",w,true);if(this.getDomRef()){w=this.getWidth();this.$().css("width",w);}return this;};h.prototype._handleMouseMove=function(E){if(!this.$().is(":visible")){this._unbindMousemove(true);}var t=q(E.target);if(t.hasClass("sapUiCalItemText")){t=t.parent();}if(this._sLastTargetId&&this._sLastTargetId==t.attr("id")){return;}this._sLastTargetId=t.attr("id");if(t.hasClass("sapUiCalItem")){var O=this._getDate();if(!q.sap.containsOrEquals(this.getDomRef(),E.target)){var S=this.getSelectedDates();if(S.length>0&&this.getSingleSelection()){var i=S[0].getStartDate();if(i){i=b.fromLocalJSDate(i,this.getPrimaryCalendarType());}var u=b.fromLocalJSDate(this._oFormatYyyymmdd.parse(t.attr("data-sap-day")));if(u.isSameOrAfter(i)){o.call(this,i,u);}else{o.call(this,u,i);}}}else{var F=b.fromLocalJSDate(this._oFormatYyyymmdd.parse(t.attr("data-sap-day")),this.getPrimaryCalendarType());if(!F.isSame(O)){if(t.hasClass("sapUiCalItemOtherMonth")){this.fireFocus({date:F.toLocalJSDate(),otherMonth:true});}else{this._setDate(F);var v=this._selectDay(F,true);if(v){this._oMoveSelectedDate=new b(F,this.getPrimaryCalendarType());}this._bMoveChange=true;}}}}};h.prototype.onmousedown=function(E){this._oMousedownPosition={clientX:E.clientX,clientY:E.clientY};};h.prototype.onmouseup=function(E){if(this._bMouseMove){this._unbindMousemove(true);var F=this._getDate();var t=this._oItemNavigation.getItemDomRefs();for(var i=0;i<t.length;i++){var $=q(t[i]);if(!$.hasClass("sapUiCalItemOtherMonth")){if($.attr("data-sap-day")==this._oFormatYyyymmdd.format(F.toUTCJSDate(),true)){$.focus();break;}}}if(this._bMoveChange){var S=this._selectDay(F);if(!S&&this._oMoveSelectedDate){this._selectDay(this._oMoveSelectedDate);}this._bMoveChange=false;this._bMousedownChange=false;this._oMoveSelectedDate=undefined;r.call(this);}}if(this._bMousedownChange){this._bMousedownChange=false;r.call(this);}else if(D.support.touch&&this._isValueInThreshold(this._oMousedownPosition.clientX,E.clientX,10)&&this._isValueInThreshold(this._oMousedownPosition.clientY,E.clientY,10)&&(E.target.classList.contains("sapUiCalItemText")||E.target.classList.contains("sapUiCalDayName"))){var u=b.fromLocalJSDate(this._oFormatYyyymmdd.parse(q(E.target).parent().attr("data-sap-day")),this.getPrimaryCalendarType());this._selectDay(u,false,false);r.call(this);}};h.prototype.onsapselect=function(E){var S=this._selectDay(this._getDate());if(S){r.call(this);}E.stopPropagation();E.preventDefault();};h.prototype.onsapselectmodifiers=function(E){this.onsapselect(E);};h.prototype.onsappageupmodifiers=function(E){var F=new b(this._getDate(),this.getPrimaryCalendarType());var y=F.getYear();if(E.metaKey||E.ctrlKey){F.setYear(y-10);}else{F.setYear(y-1);}this.fireFocus({date:F.toLocalJSDate(),otherMonth:true});E.preventDefault();};h.prototype.onsappagedownmodifiers=function(E){var F=new b(this._getDate(),this.getPrimaryCalendarType());var y=F.getYear();if(E.metaKey||E.ctrlKey){F.setYear(y+10);}else{F.setYear(y+1);}this.fireFocus({date:F.toLocalJSDate(),otherMonth:true});E.preventDefault();};h.prototype._updateSelection=function(){var S=this.getSelectedDates();if(S.length>0){var i=this.getPrimaryCalendarType();var t=S.map(function(u){var v=u.getStartDate();if(v){return b.fromLocalJSDate(v,i);}});var E=S[0].getEndDate();if(E){E=b.fromLocalJSDate(E,i);}o.call(this,t,E);}};h.prototype._isValueInThreshold=function(R,v,t){var i=R-t,u=R+t;return v>=i&&v<=u;};h.prototype._bindMousemove=function(F){q(window.document).bind('mousemove',this._mouseMoveProxy);this._bMouseMove=true;if(F){this.fireEvent("_bindMousemove");}};h.prototype._unbindMousemove=function(F){q(window.document).unbind('mousemove',this._mouseMoveProxy);this._bMouseMove=undefined;this._sLastTargetId=undefined;if(F){this.fireEvent("_unbindMousemove");}};h.prototype.onThemeChanged=function(){if(this._bNoThemeChange){return;}this._bNamesLengthChecked=undefined;this._bLongWeekDays=undefined;var w=this.$().find(".sapUiCalWH");var t=this._getLocaleData();var S=this._getFirstWeekDay();var u=t.getDaysStandAlone("abbreviated",this.getPrimaryCalendarType());for(var i=0;i<w.length;i++){var W=w[i];q(W).text(u[(i+S)%7]);}s.call(this);};h.prototype._handleBorderReached=function(i){var E=i.getParameter("event");var t=0;var O=this._getDate();var F=new b(O,this.getPrimaryCalendarType());if(E.type){switch(E.type){case"sapnext":case"sapnextmodifiers":if(E.keyCode==q.sap.KeyCodes.ARROW_DOWN){F.setDate(F.getDate()+7);}else{F.setDate(F.getDate()+1);}break;case"sapprevious":case"sappreviousmodifiers":if(E.keyCode==q.sap.KeyCodes.ARROW_UP){F.setDate(F.getDate()-7);}else{F.setDate(F.getDate()-1);}break;case"sappagedown":t=F.getMonth()+1;F.setMonth(t);if(t%12!=F.getMonth()){while(t!=F.getMonth()){F.setDate(F.getDate()-1);}}break;case"sappageup":t=F.getMonth()-1;F.setMonth(t);if(t<0){t=11;}if(t!=F.getMonth()){while(t!=F.getMonth()){F.setDate(F.getDate()-1);}}break;default:break;}this.fireFocus({date:F.toLocalJSDate(),otherMonth:true});}};h.prototype.checkDateFocusable=function(i){a._checkJSDateObject(i);var t=this._getDate();var u=b.fromLocalJSDate(i,this.getPrimaryCalendarType());return a._isSameMonthAndYear(u,t);};h.prototype.applyFocusInfo=function(i){this._oItemNavigation.focusItem(this._oItemNavigation.getFocusedIndex());return this;};h.prototype._renderHeader=function(){if(this._getShowHeader()){var i=this._getDate();var t=this._getLocaleData();var u=t.getMonthsStandAlone("wide",this.getPrimaryCalendarType());this.$("Head").text(u[i.getMonth()]);}};h.prototype._getFirstWeekDay=function(){return this._getFirstDayOfWeek();};h.prototype._isMonthNameLong=function(w){var i;var W;for(i=0;i<w.length;i++){W=w[i];if(Math.abs(W.clientWidth-W.scrollWidth)>1){return true;}}return false;};h.prototype._getVisibleDays=function(S,i){var N,t,u,v,F,w,y;if(!S){return this._aVisibleDays;}this._aVisibleDays=[];w=this._getFirstDayOfWeek();F=new b(S,this.getPrimaryCalendarType());F.setDate(1);v=F.getDay()-w;if(v<0){v=7+v;}if(v>0){F.setDate(1-v);}t=new b(F);N=(S.getMonth()+1)%12;do{y=t.getYear();u=new b(t,this.getPrimaryCalendarType());if(i&&y<1){u._bBeforeFirstYear=true;this._aVisibleDays.push(u);}else if(y>0&&y<10000){this._aVisibleDays.push(u);}t.setDate(t.getDate()+1);}while(t.getMonth()!==N||t.getDay()!==w);return this._aVisibleDays;};h.prototype._handleMousedown=function(E,F,i){var t=(D.browser.msie||D.browser.edge)&&navigator.maxTouchPoints,w=E.target.classList.contains("sapUiCalWeekNum"),u=!E.button;if(!u||D.support.touch||(w&&(u||t))){return;}var S=this._selectDay(F);if(S){this._bMousedownChange=true;}if(this._bMouseMove){this._unbindMousemove(true);this._bMoveChange=false;this._oMoveSelectedDate=undefined;}else if(S&&this.getIntervalSelection()&&this.$().is(":visible")){this._bindMousemove(true);this._oMoveSelectedDate=new b(F,this.getPrimaryCalendarType());}E.preventDefault();E.setMark("cancelAutoClose");};h.prototype._selectDay=function(t,u){if(!this._checkDateEnabled(t)){return false;}var S=this.getSelectedDates();var v;var w=this._oItemNavigation.getItemDomRefs();var $;var y;var i=0;var P=this.getParent();var A=this;var x;var z=this.getPrimaryCalendarType();if(P&&P.getSelectedDates){A=P;}if(this.getSingleSelection()){if(S.length>0){v=S[0];x=v.getStartDate();if(x){x=b.fromLocalJSDate(x,z);}}else{v=new sap.ui.unified.DateRange();A.addAggregation("selectedDates",v,true);}if(this.getIntervalSelection()&&(!v.getEndDate()||u)&&x){var E;if(t.isBefore(x)){E=x;x=t;if(!u){v.setProperty("startDate",x.toLocalJSDate(),true);v.setProperty("endDate",E.toLocalJSDate(),true);}}else if(t.isSameOrAfter(x)){E=t;if(!u){v.setProperty("endDate",E.toLocalJSDate(),true);}}o.call(this,x,E);}else{o.call(this,t);v.setProperty("startDate",t.toLocalJSDate(),true);v.setProperty("endDate",undefined,true);}}else{if(this.getIntervalSelection()){throw new Error("Calender don't support multiple interval selection");}else{var B=this._checkDateSelected(t);if(B>0){for(i=0;i<S.length;i++){x=S[i].getStartDate();if(x&&t.isSame(b.fromLocalJSDate(x,z))){A.removeAggregation("selectedDates",i,true);break;}}}else{v=new sap.ui.unified.DateRange({startDate:t.toLocalJSDate()});A.addAggregation("selectedDates",v,true);}y=this._oFormatYyyymmdd.format(t.toUTCJSDate(),true);for(i=0;i<w.length;i++){$=q(w[i]);if($.attr("data-sap-day")==y){if(B>0){$.removeClass("sapUiCalItemSel");$.attr("aria-selected","false");}else{$.addClass("sapUiCalItemSel");$.attr("aria-selected","true");}}}}}return true;};function _(){var y=this._oFormatYyyymmdd.format(this._getDate().toUTCJSDate(),true);var t=0;var R=this.$("days").get(0);var u=this.$("days").find(".sapUiCalItem");for(var i=0;i<u.length;i++){var $=q(u[i]);if($.attr("data-sap-day")===y){t=i;break;}}if(!this._oItemNavigation){this._oItemNavigation=new I();this._oItemNavigation.attachEvent(I.Events.AfterFocus,j,this);this._oItemNavigation.attachEvent(I.Events.FocusAgain,k,this);this._oItemNavigation.attachEvent(I.Events.BorderReached,this._handleBorderReached,this);this.addDelegate(this._oItemNavigation);if(this._iColumns>1){this._oItemNavigation.setHomeEndColumnMode(true,true);}this._oItemNavigation.setDisabledModifiers({sapnext:["alt"],sapprevious:["alt"],saphome:["alt"],sapend:["alt"]});this._oItemNavigation.setCycling(false);this._oItemNavigation.setColumns(this._iColumns,true);}this._oItemNavigation.setRootDomRef(R);this._oItemNavigation.setItemDomRefs(u);this._oItemNavigation.setFocusedIndex(t);this._oItemNavigation.setPageSize(u.length);}function j(t){var u=t.getParameter("index");var E=t.getParameter("event");if(!E){return;}var O=this._getDate();var F=new b(O,this.getPrimaryCalendarType());var v=false;var w=true;var x=this._oItemNavigation.getItemDomRefs();var i=0;var $=q(x[u]);var y;if($.hasClass("sapUiCalItemOtherMonth")){if(E.type=="saphomemodifiers"&&(E.metaKey||E.ctrlKey)){F.setDate(1);this._focusDate(F);}else if(E.type=="sapendmodifiers"&&(E.metaKey||E.ctrlKey)){for(i=x.length-1;i>0;i--){y=q(x[i]);if(!y.hasClass("sapUiCalItemOtherMonth")){F=b.fromLocalJSDate(this._oFormatYyyymmdd.parse(y.attr("data-sap-day")),this.getPrimaryCalendarType());break;}}this._focusDate(F);}else{v=true;F=b.fromLocalJSDate(this._oFormatYyyymmdd.parse($.attr("data-sap-day")),this.getPrimaryCalendarType());if(!F){F=new b(O);}this._focusDate(O);if(E.type=="mousedown"||(this._sTouchstartYyyyMMdd&&E.type=="focusin"&&this._sTouchstartYyyyMMdd==$.attr("data-sap-day"))){w=false;this.fireFocus({date:O.toLocalJSDate(),otherMonth:false,restoreOldDate:true});}if(E.originalEvent&&E.originalEvent.type=="touchstart"){this._sTouchstartYyyyMMdd=$.attr("data-sap-day");}else{this._sTouchstartYyyyMMdd=undefined;}}}else{if(q(E.target).hasClass("sapUiCalWeekNum")){this._focusDate(F);}else{F=b.fromLocalJSDate(this._oFormatYyyymmdd.parse($.attr("data-sap-day")),this.getPrimaryCalendarType());this._setDate(F);}this._sTouchstartYyyyMMdd=undefined;}if(E.type=="mousedown"&&this.getIntervalSelection()){this._sLastTargetId=$.attr("id");}if(w){this.fireFocus({date:F.toLocalJSDate(),otherMonth:v});}if(E.type=="mousedown"){this._handleMousedown(E,F,u);}}function k(i){var t=i.getParameter("index");var E=i.getParameter("event");if(!E){return;}if(E.type=="mousedown"){var F=this._getDate();if(this.getIntervalSelection()){var u=this._oItemNavigation.getItemDomRefs();this._sLastTargetId=u[t].id;}this._handleMousedown(E,F,t);}}function m(i,N){a._checkCalendarDate(i);var y=i.getYear();a._checkYearInValidRange(y);var F=true;if(!this.getDate()||!i.isSame(b.fromLocalJSDate(this.getDate(),i.getCalendarType()))){var t=new b(i);F=this.checkDateFocusable(i.toLocalJSDate());this.setProperty("date",i.toLocalJSDate(),true);this._oDate=t;}if(this.getDomRef()){if(F){this._focusDate(this._oDate,true,N);}else{n.call(this,N);}}}h.prototype._focusDate=function(t,S,u){if(!S){this.setDate(t.toLocalJSDate());}var y=this._oFormatYyyymmdd.format(t.toUTCJSDate(),true);var v=this._oItemNavigation.getItemDomRefs();var $;for(var i=0;i<v.length;i++){$=q(v[i]);if($.attr("data-sap-day")==y){if(document.activeElement!=v[i]){if(u){this._oItemNavigation.setFocusedIndex(i);}else{this._oItemNavigation.focusItem(i);}}break;}}};function n(N){var t=this.getRenderer().getStartDate(this);var $=this.$("days");var w=this.$("weeks");var u;var v;var i=0;var x=0;if(this._sLastTargetId){u=this._oItemNavigation.getItemDomRefs();for(i=0;i<u.length;i++){v=q(u[i]);if(v.attr("id")==this._sLastTargetId){x=i;break;}}}if($.length>0){var R=sap.ui.getCore().createRenderManager();this.getRenderer().renderDays(R,this,t);R.flush($[0]);if(w.length){this.getRenderer().renderWeekNumbers(R,this);R.flush(w[0]);}R.destroy();}this._renderHeader();this.fireEvent("_renderMonth",{days:$.find(".sapUiCalItem").length});_.call(this);if(!N){this._oItemNavigation.focusItem(this._oItemNavigation.getFocusedIndex());}if(this._sLastTargetId){u=this._oItemNavigation.getItemDomRefs();if(x<=u.length-1){v=q(u[x]);this._sLastTargetId=v.attr("id");}}}function o(S,E){if(!Array.isArray(S)){S=[S];}var t=this._oItemNavigation.getItemDomRefs();var $;var i=0;var u=false;var v=false;if(!E){var w=S.map(function(y){return this._oFormatYyyymmdd.format(y.toUTCJSDate(),true);},this);for(i=0;i<t.length;i++){$=q(t[i]);u=false;v=false;if(w.indexOf($.attr("data-sap-day"))>-1){$.addClass("sapUiCalItemSel");$.attr("aria-selected","true");u=true;}else if($.hasClass("sapUiCalItemSel")){$.removeClass("sapUiCalItemSel");$.attr("aria-selected","false");}if($.hasClass("sapUiCalItemSelStart")){$.removeClass("sapUiCalItemSelStart");}else if($.hasClass("sapUiCalItemSelBetween")){$.removeClass("sapUiCalItemSelBetween");}else if($.hasClass("sapUiCalItemSelEnd")){$.removeClass("sapUiCalItemSelEnd");}p.call(this,$,u,v);}}else{var x;for(i=0;i<t.length;i++){$=q(t[i]);u=false;v=false;x=b.fromLocalJSDate(this._oFormatYyyymmdd.parse($.attr("data-sap-day")),f.Gregorian);if(x.isSame(S[0])){$.addClass("sapUiCalItemSelStart");u=true;$.addClass("sapUiCalItemSel");$.attr("aria-selected","true");if(E&&x.isSame(E)){$.addClass("sapUiCalItemSelEnd");v=true;}$.removeClass("sapUiCalItemSelBetween");}else if(E&&a._isBetween(x,S[0],E)){$.addClass("sapUiCalItemSel");$.attr("aria-selected","true");$.addClass("sapUiCalItemSelBetween");$.removeClass("sapUiCalItemSelStart");$.removeClass("sapUiCalItemSelEnd");}else if(E&&x.isSame(E)){$.addClass("sapUiCalItemSelEnd");v=true;$.addClass("sapUiCalItemSel");$.attr("aria-selected","true");$.removeClass("sapUiCalItemSelStart");$.removeClass("sapUiCalItemSelBetween");}else{if($.hasClass("sapUiCalItemSel")){$.removeClass("sapUiCalItemSel");$.attr("aria-selected","false");}if($.hasClass("sapUiCalItemSelStart")){$.removeClass("sapUiCalItemSelStart");}else if($.hasClass("sapUiCalItemSelBetween")){$.removeClass("sapUiCalItemSelBetween");}else if($.hasClass("sapUiCalItemSelEnd")){$.removeClass("sapUiCalItemSelEnd");}}p.call(this,$,u,v);}}}function p($,S,E){if(!this.getIntervalSelection()){return;}var t="";var u=[];var v=this.getId();var w=false;t=$.attr("aria-describedby");if(t){u=t.split(" ");}var x=-1;var y=-1;for(var i=0;i<u.length;i++){var z=u[i];if(z==(v+"-Start")){x=i;}if(z==(v+"-End")){y=i;}}if(x>=0&&!S){u.splice(x,1);w=true;if(y>x){y--;}}if(y>=0&&!E){u.splice(y,1);w=true;}if(x<0&&S){u.push(v+"-Start");w=true;}if(y<0&&E){u.push(v+"-End");w=true;}if(w){t=u.join(" ");$.attr("aria-describedby",t);}}function r(){if(this._bMouseMove){this._unbindMousemove(true);}this.fireSelect();}function s(){if(!this._bNamesLengthChecked){var w;var W=this.$().find(".sapUiCalWH");var t=this._isMonthNameLong(W);var i=0;if(t){this._bLongWeekDays=false;var u=this._getLocaleData();var S=this._getFirstWeekDay();var v=u.getDaysStandAlone("narrow",this.getPrimaryCalendarType());for(i=0;i<W.length;i++){w=W[i];q(w).text(v[(i+S)%7]);}}else{this._bLongWeekDays=true;}this._bNamesLengthChecked=true;}}return h;});
