var ImageDialog={preInit:function(){var u;tinyMCEPopup.requireLangPack();if(u=tinyMCEPopup.getParam("external_image_list_url"))document.write('<script language="javascript" type="text/javascript" src="'+tinyMCEPopup.editor.documentBaseURI.toAbsolute(u)+'"></script>');},init:function(e){var f=document.forms[0],a=f.elements,e=tinyMCEPopup.editor,d=e.dom,n=e.selection.getNode(),b=tinyMCEPopup.getParam('external_image_list','tinyMCEImageList');tinyMCEPopup.resizeToInnerSize();this.fillClassList('class_list');this.fillFileList('src_list',b);this.fillFileList('over_list',b);this.fillFileList('out_list',b);TinyMCE_EditableSelects.init();if(n.nodeName=='IMG'){a.src.value=d.getAttrib(n,'src');a.width.value=d.getAttrib(n,'width');a.height.value=d.getAttrib(n,'height');a.alt.value=d.getAttrib(n,'alt');a.title.value=d.getAttrib(n,'title');a.vspace.value=this.getAttrib(n,'vspace');a.hspace.value=this.getAttrib(n,'hspace');a.border.value=this.getAttrib(n,'border');selectByValue(f,'align',this.getAttrib(n,'align'));selectByValue(f,'class_list',d.getAttrib(n,'class'),true,true);a.style.value=d.getAttrib(n,'style');a.id.value=d.getAttrib(n,'id');a.dir.value=d.getAttrib(n,'dir');a.lang.value=d.getAttrib(n,'lang');a.usemap.value=d.getAttrib(n,'usemap');a.longdesc.value=d.getAttrib(n,'longdesc');a.insert.value=e.getLang('update');if(/^\s*this.src\s*=\s*\'([^\']+)\';?\s*$/.test(d.getAttrib(n,'onmouseover')))a.onmouseoversrc.value=d.getAttrib(n,'onmouseover').replace(/^\s*this.src\s*=\s*\'([^\']+)\';?\s*$/,'$1');if(/^\s*this.src\s*=\s*\'([^\']+)\';?\s*$/.test(d.getAttrib(n,'onmouseout')))a.onmouseoutsrc.value=d.getAttrib(n,'onmouseout').replace(/^\s*this.src\s*=\s*\'([^\']+)\';?\s*$/,'$1');if(e.settings.inline_styles){if(d.getAttrib(n,'align'))this.updateStyle('align');if(d.getAttrib(n,'hspace'))this.updateStyle('hspace');if(d.getAttrib(n,'border'))this.updateStyle('border');if(d.getAttrib(n,'vspace'))this.updateStyle('vspace');}}document.getElementById('srcbrowsercontainer').innerHTML=getBrowserHTML('srcbrowser','src','image','theme_advanced_image');if(isVisible('srcbrowser'))document.getElementById('src').style.width='260px';document.getElementById('onmouseoversrccontainer').innerHTML=getBrowserHTML('overbrowser','onmouseoversrc','image','theme_advanced_image');if(isVisible('overbrowser'))document.getElementById('onmouseoversrc').style.width='260px';document.getElementById('onmouseoutsrccontainer').innerHTML=getBrowserHTML('outbrowser','onmouseoutsrc','image','theme_advanced_image');if(isVisible('outbrowser'))document.getElementById('onmouseoutsrc').style.width='260px';if(e.getParam("advimage_constrain_proportions",true))f.constrain.checked=true;if(a.onmouseoversrc.value||a.onmouseoutsrc.value)this.setSwapImage(true);else this.setSwapImage(false);this.changeAppearance();this.showPreviewImage(a.src.value,1);},insert:function(a,b){var e=tinyMCEPopup.editor,t=this,f=document.forms[0];if(f.src.value===''){if(e.selection.getNode().nodeName=='IMG'){e.dom.remove(e.selection.getNode());e.execCommand('mceRepaint');}tinyMCEPopup.close();return;}if(tinyMCEPopup.getParam("accessibility_warnings",1)){if(!f.alt.value){tinyMCEPopup.confirm(tinyMCEPopup.getLang('advimage_dlg.missing_alt'),function(s){if(s)t.insertAndClose();});return;}}t.insertAndClose();},insertAndClose:function(){var e=tinyMCEPopup.editor,f=document.forms[0],n=f.elements,v,a={},b;tinyMCEPopup.restoreSelection();if(tinymce.isWebKit)e.getWin().focus();if(!e.settings.inline_styles){a={vspace:n.vspace.value,hspace:n.hspace.value,border:n.border.value,align:getSelectValue(f,'align')};}else{a={vspace:'',hspace:'',border:'',align:''};}tinymce.extend(a,{src:n.src.value.replace(/ /g,'%20'),width:n.width.value,height:n.height.value,alt:n.alt.value,title:n.title.value,'class':getSelectValue(f,'class_list'),style:n.style.value,id:n.id.value,dir:n.dir.value,lang:n.lang.value,usemap:n.usemap.value,longdesc:n.longdesc.value});a.onmouseover=a.onmouseout='';if(f.onmousemovecheck.checked){if(n.onmouseoversrc.value)a.onmouseover="this.src='"+n.onmouseoversrc.value+"';";if(n.onmouseoutsrc.value)a.onmouseout="this.src='"+n.onmouseoutsrc.value+"';";}b=e.selection.getNode();if(b&&b.nodeName=='IMG'){e.dom.setAttribs(b,a);}else{tinymce.each(a,function(c,d){if(c===""){delete a[d];}});e.execCommand('mceInsertContent',false,tinyMCEPopup.editor.dom.createHTML('img',a),{skip_undo:1});e.undoManager.add();}tinyMCEPopup.editor.execCommand('mceRepaint');tinyMCEPopup.editor.focus();tinyMCEPopup.close();},getAttrib:function(e,a){var b=tinyMCEPopup.editor,d=b.dom,v,c;if(b.settings.inline_styles){switch(a){case'align':if(v=d.getStyle(e,'float'))return v;if(v=d.getStyle(e,'vertical-align'))return v;break;case'hspace':v=d.getStyle(e,'margin-left');c=d.getStyle(e,'margin-right');if(v&&v==c)return parseInt(v.replace(/[^0-9]/g,''));break;case'vspace':v=d.getStyle(e,'margin-top');c=d.getStyle(e,'margin-bottom');if(v&&v==c)return parseInt(v.replace(/[^0-9]/g,''));break;case'border':v=0;tinymce.each(['top','right','bottom','left'],function(s){s=d.getStyle(e,'border-'+s+'-width');if(!s||(s!=v&&v!==0)){v=0;return false;}if(s)v=s;});if(v)return parseInt(v.replace(/[^0-9]/g,''));break;}}if(v=d.getAttrib(e,a))return v;return'';},setSwapImage:function(s){var f=document.forms[0];f.onmousemovecheck.checked=s;setBrowserDisabled('overbrowser',!s);setBrowserDisabled('outbrowser',!s);if(f.over_list)f.over_list.disabled=!s;if(f.out_list)f.out_list.disabled=!s;f.onmouseoversrc.disabled=!s;f.onmouseoutsrc.disabled=!s;},fillClassList:function(i){var d=tinyMCEPopup.dom,l=d.get(i),v,c;if(v=tinyMCEPopup.getParam('theme_advanced_styles')){c=[];tinymce.each(v.split(';'),function(v){var p=v.split('=');c.push({'title':p[0],'class':p[1]});});}else c=tinyMCEPopup.editor.dom.getClasses();if(c.length>0){l.options.length=0;l.options[l.options.length]=new Option(tinyMCEPopup.getLang('not_set'),'');tinymce.each(c,function(o){l.options[l.options.length]=new Option(o.title||o['class'],o['class']);});}else d.remove(d.getParent(i,'tr'));},fillFileList:function(i,l){var d=tinyMCEPopup.dom,a=d.get(i),v,c;l=typeof(l)==='function'?l():window[l];a.options.length=0;if(l&&l.length>0){a.options[a.options.length]=new Option('','');tinymce.each(l,function(o){a.options[a.options.length]=new Option(o[0],o[1]);});}else d.remove(d.getParent(i,'tr'));},resetImageData:function(){var f=document.forms[0];f.elements.width.value=f.elements.height.value='';},updateImageData:function(i,s){var f=document.forms[0];if(!s){f.elements.width.value=i.width;f.elements.height.value=i.height;}this.preloadImg=i;},changeAppearance:function(){var e=tinyMCEPopup.editor,f=document.forms[0],i=document.getElementById('alignSampleImg');if(i){if(e.getParam('inline_styles')){e.dom.setAttrib(i,'style',f.style.value);}else{i.align=f.align.value;i.border=f.border.value;i.hspace=f.hspace.value;i.vspace=f.vspace.value;}}},changeHeight:function(){var f=document.forms[0],a,t=this;if(!f.constrain.checked||!t.preloadImg){return;}if(f.width.value==""||f.height.value=="")return;a=(parseInt(f.width.value)/parseInt(t.preloadImg.width))*t.preloadImg.height;f.height.value=a.toFixed(0);},changeWidth:function(){var f=document.forms[0],a,t=this;if(!f.constrain.checked||!t.preloadImg){return;}if(f.width.value==""||f.height.value=="")return;a=(parseInt(f.height.value)/parseInt(t.preloadImg.height))*t.preloadImg.width;f.width.value=a.toFixed(0);},updateStyle:function(t){var d=tinyMCEPopup.dom,b,s,c,v,i=tinymce.isIE,f=document.forms[0],a=d.create('img',{style:d.get('style').value});if(tinyMCEPopup.editor.settings.inline_styles){if(t=='align'){d.setStyle(a,'float','');d.setStyle(a,'vertical-align','');v=getSelectValue(f,'align');if(v){if(v=='left'||v=='right')d.setStyle(a,'float',v);else a.style.verticalAlign=v;}}if(t=='border'){b=a.style.border?a.style.border.split(' '):[];s=d.getStyle(a,'border-style');c=d.getStyle(a,'border-color');d.setStyle(a,'border','');v=f.border.value;if(v||v=='0'){if(v=='0')a.style.border=i?'0':'0 none none';else{var e=tinymce.isIE&&(!document.documentMode||document.documentMode<9);if(b.length==3&&b[e?2:1])s=b[e?2:1];else if(!s||s=='none')s='solid';if(b.length==3&&b[i?0:2])c=b[e?0:2];else if(!c||c=='none')c='black';a.style.border=v+'px '+s+' '+c;}}}if(t=='hspace'){d.setStyle(a,'marginLeft','');d.setStyle(a,'marginRight','');v=f.hspace.value;if(v){a.style.marginLeft=v+'px';a.style.marginRight=v+'px';}}if(t=='vspace'){d.setStyle(a,'marginTop','');d.setStyle(a,'marginBottom','');v=f.vspace.value;if(v){a.style.marginTop=v+'px';a.style.marginBottom=v+'px';}}d.get('style').value=d.serializeStyle(d.parseStyle(a.style.cssText),'img');}},changeMouseMove:function(){},showPreviewImage:function(u,s){if(!u){tinyMCEPopup.dom.setHTML('prev','');return;}if(!s&&tinyMCEPopup.getParam("advimage_update_dimensions_onchange",true))this.resetImageData();u=tinyMCEPopup.editor.documentBaseURI.toAbsolute(u);if(!s)tinyMCEPopup.dom.setHTML('prev','<img id="previewImg" src="'+u+'" border="0" onload="ImageDialog.updateImageData(this);" onerror="ImageDialog.resetImageData();" />');else tinyMCEPopup.dom.setHTML('prev','<img id="previewImg" src="'+u+'" border="0" onload="ImageDialog.updateImageData(this, 1);" />');}};ImageDialog.preInit();tinyMCEPopup.onInit.add(ImageDialog.init,ImageDialog);
