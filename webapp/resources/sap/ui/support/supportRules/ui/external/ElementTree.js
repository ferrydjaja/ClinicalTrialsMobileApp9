/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global"],function(q){"use strict";function _(h){return(typeof h==="object"&&!Array.isArray(h)&&h!==null);}function a(o){return"<ul "+o.attributes.join(" ")+">";}function b(){return"</ul>";}function c(o,h){var i="<li data-id=\""+o.id+"\" ";if(h){i+="issue";}i+=">";return i;}function d(){return"</li>";}function e(h,p){var i="<offset style=\"padding-left:"+p+"px\" >";if(h.content.length>0){i+="<arrow down=\"true\"></arrow>";}else{i+="<place-holder></place-holder>";}i+="</offset>";return i;}function f(h,n){var s=h.name.split(".");var i=s[s.length-1];var j=h.name.replace(i,"");var k=(n>0)?"showNumbOfIssues":"hideNumbOfIssues";return"<tag data-search=\""+h.name+h.id+"\">"+"&#60;"+"<namespace>"+j+"</namespace>"+i+"<attribute>&#32;id=\"<attribute-value>"+h.id+"</attribute-value>\"</attribute>"+"&#62;"+"</tag>"+"<span class = "+k+">["+n+"  issue(s)] </span>";}function g(h,p){while(h.nodeName!==p){if(h.nodeName==="CONTROL-TREE"){break;}h=h.parentNode;}return h;}function E(i,h){var j=_(h);var o;if(j){o=h;}else{o={};}this._ElementTreeContainer=document.getElementById(i);this.onIssueCountClicked=o.onIssueCountClicked?o.onIssueCountClicked:function(){};this.onSelectionChanged=o.onSelectionChanged?o.onSelectionChanged:function(s){};this.onHoverChanged=o.onHoverChanged?o.onHoverChanged:function(k){};this.onMouseOut=o.onMouseOut?o.onMouseOut:function(){};this.onInitialRendering=o.onInitialRendering?o.onInitialRendering:function(){};this.setData(o.data);}E.prototype.init=function(){if(!this._ElementTreeContainer){return;}this._createHTML();this._createHandlers();this.onInitialRendering();};E.prototype.getData=function(){return this._data;};E.prototype.setData=function(h){var o=this.getData();var i=_(h);if(i===false){q.sap.log.warning("The parameter should be an Object");return;}if(JSON.stringify(o)===JSON.stringify(h)){return;}this._data=h;if(this._isFirstRendering===undefined){this.init();this._isFirstRendering=true;}else{this._createTree();}return this;};E.prototype.setContainerId=function(i){this._ElementTreeContainer=document.getElementById(i);this.init();};E.prototype.getSelectedElement=function(){return this._selectedElement;};E.prototype.setSelectedElement=function(h,n){var s;if(typeof h!=="string"){q.sap.log.warning("Please use a valid string parameter");return;}s=this._ElementTreeContainer.querySelector("[data-id='"+h+"']");if(s===null){q.sap.log.warning("The selected element is not a child of the ElementTree");return;}this._selectedElement=s;this._selectTreeElement(s,n);return this;};E.prototype.clearSelection=function(){var s=this._ElementTreeContainer.querySelector("[selected]");if(s){s.removeAttribute("selected");}};E.prototype._createHTML=function(){var h;h=this._createFilter();h+=this._createTreeContainer();this._ElementTreeContainer.innerHTML=h;this._setReferences();if(this.getData()!==undefined){this._createTree();}};E.prototype._createFilter=function(){return"<filter>"+"<end>"+"<label><input type=\"checkbox\" issues checked/>Issues</label>"+"<label><input type=\"checkbox\" namespaces checked/>Namespaces</label>"+"<label><input type=\"checkbox\" attributes/>Attributes</label>"+"</end>"+"</filter>";};E.prototype._createTreeContainer=function(){return"<tree show-namespaces show-problematic-elements></tree>";};E.prototype._createTree=function(){var h=this.getData().controls;this._treeContainer.innerHTML=this._createTreeHTML(h);};E.prototype._createTreeHTML=function(h,l){if(h===undefined||h.length===0){return"";}var i="";var n=l||0;var p=++n*10;var t=this;var j=this.getData().issuesIds;h.forEach(function(k){i+=a({attributes:["expanded=\"true\""]});var m=j[k.id]!==undefined?true:false;var o=0;var o=m?j[k.id].length:0;i+=c({id:k.id},m);i+=e(k,p);i+=f(k,o);i+=d();i+=t._createTreeHTML(k.content,n);i+=b();});return i;};E.prototype._toggleCollapse=function(t){var h=g(t.parentNode,"UL");if(t.getAttribute("right")==="true"){t.removeAttribute("right");t.setAttribute("down","true");h.setAttribute("expanded","true");}else if(t.getAttribute("down")==="true"){t.removeAttribute("down");h.removeAttribute("expanded");t.setAttribute("right","true");}};E.prototype._selectTreeElement=function(t,n){var h=g(t,"LI");var i=h.attributes["data-id"];if(!i){return;}var j=i.value;if(j===this._ElementTreeContainer.id){return;}this._scrollToElement(h,window);if(n){this.onSelectionChanged(j);}this.clearSelection();h.setAttribute("selected","true");if(n){this.onIssueCountClicked(j);}};E.prototype._scrollToElement=function(t,w){var h=this._treeContainer.offsetHeight-this._treeContainer.offsetTop+this._treeContainer.scrollTop;if(t.offsetTop>h||t.offsetTop<this._treeContainer.scrollTop){this._treeContainer.scrollTop=t.offsetTop-w.innerHeight/6;}};E.prototype._searchInTree=function(u){var s=this._ElementTreeContainer.querySelectorAll("[data-search]");var h=u.toLocaleLowerCase();var j;for(var i=0;i<s.length;i++){j=s[i].getAttribute("data-search").toLocaleLowerCase();if(j.indexOf(h)!==-1){s[i].parentNode.setAttribute("matching",true);}else{s[i].parentNode.removeAttribute("matching");}}};E.prototype._removeAttributesFromSearch=function(){var h=this._treeContainer.querySelectorAll("[matching]");for(var i=0;i<h.length;i++){h[i].removeAttribute("matching");}};E.prototype._setSearchResultCount=function(h){this._filterContainer.querySelector("results").innerHTML="("+h+")";};E.prototype._onArrowClick=function(h){var t=h.target;if(t.nodeName==="ARROW"){this._toggleCollapse(t);}else if(q(h.srcElement).hasClass("showNumbOfIssues")){this._selectTreeElement(t,true);}};E.prototype._onSearchInput=function(h){var t=h.target;var s;if(t.getAttribute("search")!==null){if(t.value.length!==0){this._searchInTree(t.value);}else{this._removeAttributesFromSearch("matching");}s=this._treeContainer.querySelectorAll("[matching]").length;this._setSearchResultCount(s);}};E.prototype._onSearchEvent=function(h){var s;if(h.target.value.length===0){this._removeAttributesFromSearch("matching");s=this._treeContainer.querySelectorAll("[matching]").length;this._setSearchResultCount(s);}};E.prototype._onOptionsChange=function(h){var t=h.target;if(t.getAttribute("filter")!==null){if(t.checked){this._treeContainer.setAttribute("show-filtered-elements",true);}else{this._treeContainer.removeAttribute("show-filtered-elements");}}if(t.getAttribute("issues")!==null){if(t.checked){this._treeContainer.setAttribute("show-problematic-elements",true);}else{this._treeContainer.removeAttribute("show-problematic-elements");}}if(t.getAttribute("namespaces")!==null){if(t.checked){this._treeContainer.setAttribute("show-namespaces",true);}else{this._treeContainer.removeAttribute("show-namespaces");}}if(t.getAttribute("attributes")!==null){if(t.checked){this._treeContainer.setAttribute("show-attributes",true);}else{this._treeContainer.removeAttribute("show-attributes");}}};E.prototype._onTreeElementMouseHover=function(h){var t=g(h.target,"LI");var i=this._ElementTreeContainer.querySelector("[hover]");if(i){i.removeAttribute("hover");}t.setAttribute("hover","true");var j=t.attributes["data-id"];this.onHoverChanged(j&&j.value);};E.prototype._onTreeElementMouseOut=function(h){this.onMouseOut();};E.prototype._createHandlers=function(){this._treeContainer.onclick=this._onArrowClick.bind(this);this._filterContainer.onkeyup=this._onSearchInput.bind(this);this._filterContainer.onsearch=this._onSearchEvent.bind(this);this._filterContainer.onchange=this._onOptionsChange.bind(this);this._ElementTreeContainer.onmouseover=this._onTreeElementMouseHover.bind(this);this._ElementTreeContainer.onmouseout=this._onTreeElementMouseOut.bind(this);};E.prototype._setReferences=function(){this._filterContainer=this._ElementTreeContainer.querySelector("filter");this._treeContainer=this._ElementTreeContainer.querySelector("tree");};return E;});
