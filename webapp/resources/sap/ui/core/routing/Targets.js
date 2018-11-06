/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/base/EventProvider','./Target','./async/Targets','./sync/Targets'],function(q,E,T,a,s){"use strict";var b=E.extend("sap.ui.core.routing.Targets",{constructor:function(o){var t,c;E.apply(this);this._mTargets={};this._oConfig=o.config;this._oViews=o.views;if(!this._oConfig){this._oConfig={_async:false};}function d(){if(q.sap.getUriParameters().get("sap-ui-xx-asyncRouting")==="true"){q.sap.log.warning("Activation of async view loading in routing via url parameter is only temporarily supported and may be removed soon","Targets");return true;}return false;}if(this._oConfig._async===undefined){this._oConfig._async=(this._oConfig.async===undefined)?d():this._oConfig.async;}var e=this._oConfig._async?a:s;for(var f in e){this[f]=e[f];}for(t in o.targets){if(o.targets.hasOwnProperty(t)){this._createTarget(t,o.targets[t]);}}for(c in this._mTargets){if(this._mTargets.hasOwnProperty(c)){this._addParentTo(this._mTargets[c]);}}},destroy:function(){var t;E.prototype.destroy.apply(this);for(t in this._mTargets){if(this._mTargets.hasOwnProperty(t)){this._mTargets[t].destroy();}}this._mTargets=null;this._oViews=null;this._oConfig=null;this.bIsDestroyed=true;return this;},getViews:function(){return this._oViews;},getTarget:function(n){var t=this,r=[];if(Array.isArray(n)){n.forEach(function(N){var o=t._mTargets[N];if(o){r.push(o);}else{q.sap.log.error("The target you tried to get \""+N+"\" does not exist!",t);}});return r;}return this._mTargets[n];},addTarget:function(n,t){var o=this.getTarget(n),c;if(o){q.sap.log.error("Target with name "+n+" already exists",this);}else{c=this._createTarget(n,t);this._addParentTo(c);}return this;},attachDisplay:function(d,f,l){return this.attachEvent(this.M_EVENTS.DISPLAY,d,f,l);},detachDisplay:function(f,l){return this.detachEvent(this.M_EVENTS.DISPLAY,f,l);},fireDisplay:function(A){return this.fireEvent(this.M_EVENTS.DISPLAY,A);},attachTitleChanged:function(d,f,l){this.attachEvent(this.M_EVENTS.TITLE_CHANGED,d,f,l);return this;},detachTitleChanged:function(f,l){return this.detachEvent(this.M_EVENTS.TITLE_CHANGED,f,l);},fireTitleChanged:function(A){return this.fireEvent(this.M_EVENTS.TITLE_CHANGED,A);},M_EVENTS:{DISPLAY:"display",TITLE_CHANGED:"titleChanged"},_createTarget:function(n,t){var o,O;O=q.extend(true,{name:n},this._oConfig,t);o=this._constructTarget(O);o.attachDisplay(function(e){var p=e.getParameters();this.fireDisplay({name:n,view:p.view,control:p.control,config:p.config,data:p.data});},this);this._mTargets[n]=o;return o;},_addParentTo:function(t){var p,P=t._oOptions.parent;if(!P){return;}p=this._mTargets[P];if(!p){q.sap.log.error("The target '"+t._oOptions.name+" has a parent '"+P+"' defined, but it was not found in the other targets",this);return;}t._oParent=p;},_constructTarget:function(o,p){return new T(o,this._oViews,p);},_setRootViewId:function(i){var t,o;for(t in this._mTargets){if(this._mTargets.hasOwnProperty(t)){o=this._mTargets[t]._oOptions;if(o.rootView===undefined){o.rootView=i;}}}},_getTitleTargetName:function(t,p){var o,c;c=p||(typeof t==="string"&&t);if(!c){t.some(function(d){o=this.getTarget(d);while(o&&o._oParent&&o._oParent._oOptions.title){o=o._oParent;}if(o&&o._oOptions.title){c=o._oOptions.name;return true;}}.bind(this));}return c;},_forwardTitleChanged:function(e){this.fireTitleChanged({name:e.getParameter("name"),title:e.getParameter("title")});},_attachTitleChanged:function(t,c){var o;c=this._getTitleTargetName(t,c);o=this.getTarget(c);if(this._oLastTitleTarget){this._oLastTitleTarget.detachTitleChanged(this._forwardTitleChanged,this);this._oLastTitleTarget._bIsDisplayed=false;}if(o){o.attachTitleChanged({name:o._oOptions.name},this._forwardTitleChanged,this);this._oLastTitleTarget=o;}else if(c){q.sap.log.error("The target with the name \""+c+"\" where the titleChanged event should be fired does not exist!",this);}}});return b;});
