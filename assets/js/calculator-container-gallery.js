/* Preserve selected tests while using the integrated specimen container reference. */
(function(){
'use strict';
function install(){
 const dialog=document.getElementById('calculatorGalleryDialog');
 const mount=document.getElementById('calculatorGalleryMount');
 if(!dialog||!mount)return;
 let mounted=false;
 function open(){
  const gallery=window.LAB_CONTAINER_REFERENCE;
  if(!gallery){console.error('Container gallery unavailable.');return;}
  if(!mounted){
   gallery.setLab(document.body.classList.contains('labcorp-page')?'L':'Q');
   mount.innerHTML=gallery.render();
   mounted=true;
  }
  if(!dialog.open)dialog.showModal();
 }
 document.addEventListener('click',function(event){
  if(event.target.closest('[data-calculator-gallery-open]')){event.preventDefault();open();}
  else if(event.target.closest('[data-calculator-gallery-close]')){event.preventDefault();dialog.close();}
 });
 if(new URLSearchParams(window.location.search).get('containers')==='1')open();
 window.CalculatorContainerGallery={open};
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);
else install();
})();