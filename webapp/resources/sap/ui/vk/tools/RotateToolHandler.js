sap.ui.define(["jquery.sap.global","sap/ui/base/EventProvider"],function(q,E){"use strict";var R=E.extend("sap.ui.vk.tools.RotateToolHandler",{metadata:{},constructor:function(t){this._tool=t;this._gizmo=t.getGizmo();this._rect=null;this._rayCaster=new THREE.Raycaster();this._rayCaster.linePrecision=0.2;this._handleIndex=-1;this._gizmoIndex=-1;this._handleAxis=new THREE.Vector3();this._gizmoOrigin=new THREE.Vector3();this._matrixOrigin=new THREE.Matrix4();this._mouse=new THREE.Vector2();}});R.prototype.destroy=function(){this._tool=null;this._gizmo=null;this._rect=null;this._rayCaster=null;this._handleAxis=null;this._gizmoOrigin=null;this._mouse=null;};R.prototype._updateMouse=function(e){var s=this.getViewport().getRenderer().getSize();this._mouse.x=((e.x-this._rect.x)/s.width)*2-1;this._mouse.y=((e.y-this._rect.y)/s.height)*-2+1;this._rayCaster.setFromCamera(this._mouse,this.getViewport().getCamera().getCameraRef());};R.prototype._updateHandles=function(e,h){var p=this._handleIndex;this._handleIndex=-1;for(var i=0,l=this._gizmo.getGizmoCount();i<l;i++){var t=this._gizmo.getTouchObject(i);var a=this._rayCaster.intersectObject(t,true);if(a.length>0){this._handleIndex=t.children.indexOf(a[0].object);if(this._handleIndex>=0&&this._handleIndex<3){this._gizmoIndex=i;this._matrixOrigin.copy(t.matrixWorld);this._gizmoOrigin.setFromMatrixPosition(t.matrixWorld);var b=new THREE.Vector3().setFromMatrixColumn(t.matrixWorld,(this._handleIndex+1)%3),c=new THREE.Vector3().setFromMatrixColumn(t.matrixWorld,(this._handleIndex+2)%3);this._handleAxis.crossVectors(b,c).normalize();}}}this._gizmo.highlightHandle(this._handleIndex,h||this._handleIndex===-1);if(p!==this._handleIndex){this.getViewport().setShouldRenderFrame();}};R.prototype.hover=function(e){if(this._inside(e)&&!this._gesture){this._updateMouse(e);this._updateHandles(e,true);e.handled|=this._handleIndex>0;}};R.prototype._getPlaneOffset=function(){var r=this._rayCaster.ray;var d=this._gizmoOrigin.clone().sub(r.origin);var a=this._handleAxis.dot(d)/this._handleAxis.dot(r.direction);return r.direction.clone().multiplyScalar(a).sub(d);};R.prototype.beginGesture=function(e){if(this._inside(e)&&!this._gesture){this._updateMouse(e);this._updateHandles(e,false);if(this._handleIndex>=0&&this._handleIndex<3&&e.n===1){this._gesture=true;e.handled=true;this._gizmo.beginGesture();if(this._handleIndex<3){this._dragOriginDirection=this._getPlaneOffset().normalize();}}}};R.prototype.move=function(e){if(this._gesture){e.handled=true;this._updateMouse(e);if(this._dragOriginDirection){var d=this._dragOriginDirection,a=this._getPlaneOffset().normalize(),b=new THREE.Vector3().setFromMatrixColumn(this._matrixOrigin,(this._handleIndex+1)%3).normalize(),c=new THREE.Vector3().setFromMatrixColumn(this._matrixOrigin,(this._handleIndex+2)%3).normalize();var f=Math.atan2(d.dot(c),d.dot(b));var g=Math.atan2(a.dot(c),a.dot(b));if(!isNaN(f)&&!isNaN(g)){this._gizmo._setRotationAxisAngle(this._handleIndex,f,g);}}}};R.prototype.endGesture=function(e){if(this._gesture){this._gesture=false;e.handled=true;this._updateMouse(e);this._gizmo.endGesture();this._dragOriginDirection=undefined;this._updateHandles(e,true);this.getViewport().setShouldRenderFrame();}};R.prototype.click=function(e){};R.prototype.doubleClick=function(e){};R.prototype.contextMenu=function(e){};R.prototype.getViewport=function(){return this._tool._viewport;};R.prototype._getOffset=function(o){var r=o.getBoundingClientRect();var p={x:r.left+window.pageXOffset,y:r.top+window.pageYOffset};return p;};R.prototype._inside=function(e){if(this._rect===null||true){var i=this._tool._viewport.getIdForLabel();var d=document.getElementById(i);if(d===null){return false;}var o=this._getOffset(d);this._rect={x:o.x,y:o.y,w:d.offsetWidth,h:d.offsetHeight};}return(e.x>=this._rect.x&&e.x<=this._rect.x+this._rect.w&&e.y>=this._rect.y&&e.y<=this._rect.y+this._rect.h);};return R;},true);
