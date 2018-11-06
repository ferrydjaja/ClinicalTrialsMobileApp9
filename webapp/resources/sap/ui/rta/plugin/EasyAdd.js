/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/rta/plugin/additionalElements/AdditionalElementsPlugin','sap/ui/dt/OverlayRegistry'],function(A,O){"use strict";var E=A.extend("sap.ui.rta.plugin.EasyAdd",{metadata:{library:"sap.ui.rta",properties:{},associations:{},events:{}}});E.prototype.registerElementOverlay=function(o){var c=o.getElement();if(c.getMetadata().getName()==="sap.uxap.ObjectPageSection"&&this.hasStableId(o)){o.addStyleClass("sapUiRtaPersAdd");c.addStyleClass("sapUiRtaMarginBottom");}else if(c.getMetadata().getName()==="sap.uxap.ObjectPageLayout"&&this.hasStableId(o)){o.addStyleClass("sapUiRtaPersAddTop");c.$("sectionsContainer").addClass("sapUiRtaPaddingTop");}var a=function(d,o,i){var C;if(d){C=o.getDesignTimeMetadata().getName().plural;}else{C=o.getDesignTimeMetadata().getAggregation("sections").childNames.plural();}this.showAvailableElements(d,[o],i,C);}.bind(this);var f=function(o,d,S,C,i){var e=function(h){var o=O.getOverlay(h.getSource().getId().replace("-AddButton",""));a(S,o,i);h.cancelBubble();};var g=typeof C==="function"?C():C;this._addButton(o,e,d,g,S);}.bind(this);if(o.hasStyleClass("sapUiRtaPersAdd")){var b=o.hasStyleClass("sapUiRtaPersAdd")&&o.$().children(".sapUiRtaPersAddIconOuter").length<=0;if(b){f(o,o.$(),true,o.getDesignTimeMetadata().getName().singular);}}else if(o.hasStyleClass("sapUiRtaPersAddTop")){if(o.getAggregationOverlay("sections").$().children(".sapUiRtaPersAddIconOuter").length<=0){var s=o.getAggregationOverlay("sections").$();f(o,s,false,o.getDesignTimeMetadata().getAggregation("sections").childNames.singular,0);}}A.prototype.registerElementOverlay.apply(this,arguments);};E.prototype.deregisterElementOverlay=function(o){var c=o.getElement();if(o._oAddButton){o._oAddButton.destroy();}if(c.getMetadata().getName()==="sap.uxap.ObjectPageSection"){o.removeStyleClass("sapUiRtaPersAdd");c.removeStyleClass("sapUiRtaMarginBottom");}else if(c.getMetadata().getName()==="sap.uxap.ObjectPageLayout"){o.removeStyleClass("sapUiRtaPersAddTop");c.$("sectionsContainer").removeClass("sapUiRtaPaddingTop");}};E.prototype._isEditable=function(o){var i=A.prototype._isEditable.apply(this,arguments);if(o._oAddButton){var I=o.hasStyleClass("sapUiRtaPersAddTop");var s=I?"asChild":"asSibling";o._oAddButton.setEnabled(i[s]);if(I){var l=o.getElement();l.attachEventOnce("onAfterRenderingDOMReady",function(){l.$("sectionsContainer").addClass("sapUiRtaPaddingTop");});}}return i;};E.prototype._addButton=function(o,c,a,C,b){var i=o.getEditableByPlugins().indexOf(this._retrievePluginName(b))>-1;var t=sap.ui.getCore().getLibraryResourceBundle("sap.ui.rta");var I=o.getId()+"-AddButton";var h=jQuery("<div class='sapUiRtaPersAddIconOuter' draggable='true'> </div>");o._oAddButton=new sap.m.Button(I,{text:t.getText("CTX_ADD_ELEMENTS",C),icon:"sap-icon://add",press:c,enabled:i}).placeAt(h.get(0));a.append(h);h[0].addEventListener("mouseover",function(e){e.stopPropagation();var o=e.fromElement?O.getOverlay(e.fromElement.id):null;if(o&&o.getMetadata().getName()==="sap.ui.dt.ElementOverlay"){var p=o.getParentElementOverlay();p.removeStyleClass("sapUiRtaOverlayHover");}});h[0].addEventListener("mouseleave",function(e){e.stopPropagation();var o=e.toElement?O.getOverlay(e.toElement.id):null;if(o&&o.getMetadata().getName()==="sap.ui.dt.ElementOverlay"){var p=o.getParentElementOverlay();if(p.getMovable()){p.addStyleClass("sapUiRtaOverlayHover");}}});h[0].addEventListener("dragstart",function(e){e.stopPropagation();e.preventDefault();});};return E;},true);
