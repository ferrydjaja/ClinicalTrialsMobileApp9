/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5) (c) Copyright 2009-2012 SAP AG. All rights reserved
 */
sap.ui.define(['./VoBase','./library'],function(V,l){"use strict";var C=V.extend("sap.ui.vbm.Container",{metadata:{library:"sap.ui.vbm",properties:{position:{type:"string",group:"Misc",defaultValue:null},alignment:{type:"string",group:"Misc",defaultValue:'0'}},aggregations:{item:{type:"sap.ui.core.Control",multiple:false}},events:{}}});C.prototype.openContextMenu=function(m){this.getParent().openContextMenu("Container",this,m);};C.prototype.getDataElement=function(){var e=V.prototype.getDataElement.apply(this,arguments);var b=this.oParent.mBindInfo;e.IK=this.getUniqueId();if(b.P){e.P=this.getPosition();}if(b.AL){e.AL=this.getAlignment();}return e;};C.prototype.handleChangedData=function(e){if(e.P){this.setPosition(e.P);}};return C;});
