'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const source=fs.readFileSync(path.join(__dirname,'../assets/js/portal-selects.js'),'utf8');

function navigationHelpers(){
 const marker="  if (document.readyState === 'loading')";
 assert(source.includes(marker),'Picker bootstrap marker changed');
 const instrumented=source.replace(marker,
   '  window.__navigationTest = {returnToSpecimenCategories,clearSubmenu};\n'+marker);
 const context={
   window:{matchMedia(){return {matches:true};}},
   document:{readyState:'loading',addEventListener(){}}
 };
 vm.runInNewContext(instrumented,context,{filename:'portal-selects.js'});
 return context.window.__navigationTest;
}

test('Swab types Back returns to main category instead of reopening on focus',()=>{
 const {returnToSpecimenCategories}=navigationHelpers();
 const events=[];
 const choice={
   setAttribute(key,value){events.push('attribute:'+key+'='+value);},
   focus(){
     events.push('focus');
     if(item.submenuReturnTarget!==choice)events.push('UNEXPECTED-REOPEN');
   }
 };
 const item={submenu:{remove(){events.push('removed');}},submenuAnchor:choice};
 returnToSpecimenCategories(item,choice);
 assert.equal(item.submenu,null);
 assert.equal(item.submenuAnchor,null);
 assert.equal(item.submenuReturnTarget,choice);
 assert.deepEqual(events,['attribute:aria-expanded=false','removed','focus']);
});

test('Click and ArrowLeft both go back, suppress automatic hover/focus, and can reopen deliberately',()=>{
 assert.match(source,/heading\.addEventListener\('click',[\s\S]*?returnToSpecimenCategories\(item, parentChoice\)/);
 assert.match(source,/if \(e\.key === 'ArrowLeft'\)[\s\S]*?returnToSpecimenCategories\(item, parentChoice\)/);
 assert.match(source,/choice\.addEventListener\('pointerenter',[\s\S]*?if \(item\.submenuReturnTarget === choice\) return/);
 assert.match(source,/choice\.addEventListener\('focus',[\s\S]*?if \(item\.submenuReturnTarget === choice\) return/);
 assert.match(source,/choice\.addEventListener\('pointerleave',[\s\S]*?item\.submenuReturnTarget = null/);
 assert.match(source,/choice\.addEventListener\('blur',[\s\S]*?item\.submenuReturnTarget = null/);
 assert.match(source,/openSubmenu\(item,choice,option\.value,root,true\)/);
});
test('Quest and LabCorp use the corrected shared picker cache version',()=>{
 for(const page of ['index.html','labcorp.html']){
  const html=fs.readFileSync(path.join(__dirname,'..',page),'utf8');
  assert.match(html,/assets\/js\/portal-selects\.js\?v=11\.96/);
 }
});
