/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2018 SAP SE. All rights reserved
 */
sap.ui.define(['sap/ui/core/XMLComposite',"sap/ui/mdc/base/ConditionModel"],function(X,C){"use strict";var D=X.extend("sap.ui.mdc.base.DefineConditionPanel",{metadata:{properties:{},events:{}},fragment:"sap.ui.mdc.base.DefineConditionPanel",init:function(){sap.ui.getCore().getMessageManager().registerObject(this,true);},exit:function(){sap.ui.getCore().getMessageManager().unregisterObject(this,true);},onBeforeRendering:function(){var f=this.getModel("cm").getFilterField();this.sFieldPath=f.getFieldPath();if(!this.oConditionModel){var o=f.getFilterOperatorConfig();var O=(o?o.getOperatorsForType(f.getDataType()):[])||[];var a=[];O.forEach(function(e){var d=o.getOperator(e);if(d.showInSuggest!==undefined&&d.showInSuggest==false){return;}var t=d.textKey||"operators."+d.name+".longText";var T=d.getTypeText(t,f._getDataType().getName().toLowerCase());if(T===t){T=d.longText;}a.push({key:e,additionalText:T});},this);var b=new sap.ui.model.json.JSONModel();b.setData(a);this.setModel(b,"om");this.oConditionModel=this.getModel("cm");var c=this.oConditionModel.bindProperty("/",this.oConditionModel.getContext("/"));c.attachChange(function(e){this.updateDefineConditions();}.bind(this));this.updateDefineConditions();}},removeCondition:function(e){var s=e.oSource;var c=s.getBindingContext("cm").getObject();var o=this.getModel("cm");o.removeCondition(c);},addCondition:function(e){var s=e.oSource;var c=s.getBindingContext("cm").getObject();var o=this.getModel("cm");var i=o.indexOf(c);this.addDummyCondition(i+1);},addDummyCondition:function(i){var c=this.getModel("cm");var o=c.createCondition(this.sFieldPath,"EQ",[null]);if(i!==undefined){c.insertCondition(i,o,true);}else{c.addCondition(o,true);}},updateDefineConditions:function(){var c=this.oConditionModel.getConditions().filter(function(o){return o.operator!=="EEQ";});if(c.length===0){this.addDummyCondition();}},valueCtrlFactory:function(i,c){var o=c.oModel;var p=c.sPath;var a=parseInt(p.split("/")[p.split("/").length-1],10);p=p.slice(0,p.lastIndexOf("/"));p=p.slice(0,p.lastIndexOf("/"));var b=o.getProperty(p);var O=o.getFilterOperatorConfig().getOperator(b.operator);var f=o.getFilterField();var d=f._getDataType();var v=sap.ui.mdc.base.FilterOperatorConfig.createControl(d,O,"cm>",a);v.addStyleClass("sapUiSmallPaddingBegin");v.setLayoutData(new sap.m.FlexItemData({shrinkFactor:0,growFactor:1}));if(v.attachChange){v.attachChange(this.onChange.bind(this));v.onpaste=this.onPaste.bind(this);}return v;},onChange:function(e){var c=this.getModel("cm");c._checkIsEmpty();c._updateValues();},onPaste:function(e){var o,s=e.srcControl;if(window.clipboardData){o=window.clipboardData.getData("Text");}else{o=e.originalEvent.clipboardData.getData('text/plain');}var S=o.split(/\r\n|\r|\n/g);if(S&&S.length>1){setTimeout(function(){var c=this.getModel("cm");var f=c.getFilterField();var t=f._getDataType(),a=t.getMetadata().getName();var l=S.length;for(var i=0;i<l;i++){if(S[i]){var v=S[i];var V=v.split(/\t/g);var O,b;if(V.length==2&&V[0]&&V[1]){O="BT";b=f.getFilterOperatorConfig().getOperator(O);}else{V=[v.trim()];O=f.getFilterOperatorConfig().getDefaultOperator(a);b=f.getFilterOperatorConfig().getOperator(O);}v=b?b.format(V):V[0];if(b){var d=b.getCondition(v,t);if(d){d.fieldPath=f.getFieldPath();c.addCondition(d);f.fireChange({value:d,type:"added",valid:true});}}}}if(s instanceof sap.m.MultiInput){s.setValue("");}}.bind(this),0);}}});return D;},true);
