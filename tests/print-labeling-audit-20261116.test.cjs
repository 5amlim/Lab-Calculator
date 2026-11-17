'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8');
const files={
 Quest:[
  'assets/js/quest-verified-mixed-expansion-20261116-batch22.js',
  'assets/js/quest-verified-fluid-chemistry-20261115.js',
  'assets/js/quest-verified-expansion-20261115-batch5.js'
 ],
 Labcorp:[
  'assets/js/labcorp/catalog/verified-mixed-expansion-20261116-batch20.js',
  'assets/js/labcorp/catalog/verified-mixed-expansion-20261116-batch22.js'
 ]
};
async function harness(lab){
 const window={SEED_TESTS:[],QUEST_MISSING_DIRECTORY_READY:Promise.resolve(0)};
 for(const p of files[lab])vm.runInNewContext(read(p),{window},{filename:p});
 const document={
  getElementById:id=>({id,value:'',checked:false,options:[],
    classList:{add(){},remove(){},toggle(){}},
    addEventListener(){},setAttribute(){},querySelector(){return null;}}),
  querySelector(){return null;},querySelectorAll(){return[]},addEventListener(){}
 };
 const app=lab==='Quest'?'assets/js/app.js':'labcorp-app.js';
 const src=read(app),marker='  init();';
 assert(src.includes(marker),app+' initialization hook');
 vm.runInNewContext(src.replace(marker,
  '  window.__labelAudit={database,printLabelingNotes,specificSpecimenSource};'),{
   window,document,localStorage:{getItem(){return null;},setItem(){},removeItem(){}},
   setTimeout(){return 0;},clearTimeout(){},console:{warn(){},error(){}}
 },{filename:app,timeout:30000});
 await Promise.resolve();await Promise.resolve();
 const api=window.__labelAudit;
 assert(api,lab+' missing label audit hook');
 return {
   api,
   get:code=>{
     const t=api.database.find(r=>r.testCode===code);
     assert(t,lab+' '+code+' missing');
     return t;
   },
   print:(codes,opts={})=>api.printLabelingNotes({
     tests:codes.map(c=>api.database.find(r=>r.testCode===c)),
     originalTube:true,className:'tube-urine-cup',label:'Sterile cup',...opts
   })
 };
}
test('Quest source badges occur once and vague body fluids never become wound swabs',async()=>{
 const {api,get,print}=await harness('Quest');
 for(const [code,text] of [
   ['6740','Source/site · Collection date/time'],
   ['94675','Exact anatomical source/site · Collection date/time'],
   ['95185','Exact anatomical source/site · Collection date/time']
 ]){
   const html=print([code]);
   assert(html.includes(text),code+' source not formatted');
   assert.doesNotMatch(html,/print-collect-chip-specimen/,'single source badge is in heading');
   assert.doesNotMatch(html,/Wound swab|Label specimen source/i);
 }
 assert.equal(api.specificSpecimenSource(get('95185')),'Body Fluid');
 assert.equal(api.specificSpecimenSource(get('94675')),'Body Fluid');
});
test('Quest named swab uses actual collection site, not a generic label phrase',async()=>{
 const {api,get,print}=await harness('Quest');
 assert.equal(api.specificSpecimenSource(get('17656')),'Nasal Swab');
 const html=print(['17656']);
 assert.match(html,/Nasal Swab · Collection date\/time/);
 assert.doesNotMatch(html,/Label specimen source|print-collect-chip-specimen/);
 const generic={...get('17656'),specimenType:'Swab',testName:'Bacterial Culture',
   specialInstructions:'Acceptable sources include nasal, throat and wound swabs'};
 assert.equal(api.specificSpecimenSource(generic),'Collection site: ____');
});
test('When different fluid sources share a print item, each is still identified',async()=>{
 const {print}=await harness('Quest');
 const html=print(['17411','17586']);
 assert.equal((html.match(/class="print-label-note"/g)||[]).length,2);
 assert.equal((html.match(/print-collect-chip-specimen/g)||[]).length,2);
 assert.match(html,/>Pleural Fluid<\/span>/);
 assert.match(html,/>Pericardial Fluid<\/span>/);
});
test('Labcorp CSF sequence, specific joint, and ordinary specimen rules remain intact',async()=>{
 const {print}=await harness('Labcorp');
 const cases=[
  ['012229','Specimen source · Tube sequence · Collection date/time'],
  ['005355','Exact joint/site · Collection date/time'],
  ['019588','Exact anatomical source/site · Collection date/time'],
  ['620009','Specimen source · Collection date/time'],
  ['182776','Specimen source · Collection date/time']
 ];
 for(const [code,label] of cases){
   const html=print([code]);
   assert(html.includes(label),code+' label missing: '+html);
   assert.doesNotMatch(html,/print-collect-chip-specimen/);
 }
});
test('Custom timepoints and specialized labels are never flattened into generic text',async()=>{
 const {api,get}=await harness('Quest');
 const template=get('6740');
 const extra=[
   {...template,id:'time-audit',testCode:'999901',
    specialLabeling:'Fasting - record actual draw time'},
   {...template,id:'peak-audit',testCode:'999902',
    specialLabeling:'Label transport tubes PEAK and TROUGH with separate collection times'}
 ];
 const html=api.printLabelingNotes({tests:extra,originalTube:true,className:'tube-lavender'});
 assert.match(html,/Fasting - record actual draw time/);
 assert.match(html,/PEAK and TROUGH with separate collection times/);
});
