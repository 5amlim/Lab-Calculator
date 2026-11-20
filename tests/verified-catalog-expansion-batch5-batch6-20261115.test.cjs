'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('./helpers/browser-vm.cjs');
const read=file=>fs.readFileSync(path.join(__dirname,'..',file),'utf8');
const QUEST='assets/js/quest-verified-expansion-20261115-batch5.js';
const LABCORP='assets/js/labcorp/catalog/verified-expansion-20261115-batch6.js';
const QUEST_CODES=['17586','17589','17427','17605','17409','17420','17592','17601','14579','1696'];
const LABCORP_CODES=['520340','117150','164509','117921','117713','117340','115402','117838','335884','500140'];
function seed(lab){
 const window={SEED_TESTS:[]};
 const scripts=lab==='Quest'?[QUEST]:[
  'labcorp-missing-tests-20261115.js',
  'assets/js/labcorp/catalog/verified-expansion-20261115-batch4.js',
  LABCORP
 ];
 for(const file of scripts)vm.runInNewContext(read(file),{window,console},{filename:file,timeout:30000});
 return window;
}
async function calculator(lab){
 const window=seed(lab);
 const document={
  getElementById:id=>({id,value:'',checked:false,options:[],classList:{add(){},remove(){},toggle(){}},
    addEventListener(){},setAttribute(){},querySelector(){return null;}}),
  querySelector(){return null;},querySelectorAll(){return [];},addEventListener(){}
 };
 const localStorage={getItem(){return null;},setItem(){},removeItem(){}};
 const file=lab==='Quest'?'assets/js/app.js':'labcorp-app.js';
 const source=read(file);
 assert(source.includes('  init();'),file+' app hook changed');
 vm.runInNewContext(source.replace('  init();',
  '  window.__batchAudit={database,expandedCollectionTests,buildTransportBagPlan,buildCollectionPlan,buildSubmissionContents};'
 ),{window,document,localStorage,setTimeout(){},clearTimeout(){},console:{warn(){},error(){}}
 },{filename:file,timeout:30000});
 await Promise.resolve();
 await Promise.resolve();
 assert(window.__batchAudit,'app did not expose calculation functions');
 const api=window.__batchAudit;
 return function(codes){
  const chosen=codes.map(code=>api.database.find(x=>x.testCode===code));
  chosen.forEach((x,i)=>assert(x&&x.status==='active','missing active '+codes[i]));
  const expanded=api.expandedCollectionTests(chosen),bags=api.buildTransportBagPlan(expanded);
  return {chosen,expanded,bags,draw:api.buildCollectionPlan(expanded,bags),
    submit:bags.flatMap(b=>api.buildSubmissionContents(b))};
 };
}
test('20 new records have official per-test sources, unique codes and supported containers',()=>{
 for(const [lab,src,page,app,codes] of [
  ['Quest',QUEST,'index.html','assets/js/app.js',QUEST_CODES],
  ['Labcorp',LABCORP,'labcorp.html','labcorp-app.js',LABCORP_CODES]
 ]){
  const html=read(page),w=seed(lab);
  assert(html.includes('src="'+src+'?v=1"'));
  assert(html.indexOf('src="'+src+'?v=1"')<html.indexOf('src="'+app+'?'));
  assert.equal(new Set(w.SEED_TESTS.map(x=>x.testCode)).size,w.SEED_TESTS.length);
  for(const code of codes){
   const r=w.SEED_TESTS.find(t=>t.testCode===code);
   assert(r&&r.status==='active',lab+':'+code);
   for(const prop of ['testName','specimenType','drawContainer','transportContainer','preferredVolume',
    'minimumVolume','transportTemperature','spin','source'])assert(r[prop],code+' missing '+prop);
   assert(r.source.includes(lab==='Quest'?'testdirectory.questdiagnostics.com':'labcorp.com/tests/'));
   assert.doesNotMatch(r.drawContainer+' '+r.transportContainer,/6N HCl|InSure|microscope slide|green-label Aptima/i);
  }
 }
 const records=seed('Labcorp').SEED_TESTS;
 assert.equal(records.length,347);
 assert.equal(records.filter(x=>x.status==='active').length,108);
 assert.equal(records.filter(x=>x.status==='pending').length,239);
 for(const code of ['505770','160721','520057'])
  assert.equal(records.find(x=>x.testCode===code).status,'pending');
});
test('Quest body-fluid specimen types remain distinct, frozen original cups and cold urine preserved',async()=>{
 const plan=await calculator('Quest');
 for(const code of QUEST_CODES){
  const x=plan([code]);
  assert.equal(x.draw.length,1);
  assert.equal(x.draw[0].label,'Sterile cup');
  assert.equal(x.submit.length,1);
  assert.equal(x.submit[0].label,'Sterile cup');
  assert.equal(x.submit[0].count,1);
  assert.equal(x.bags[0].label,
   ['14579','1696'].includes(code)?'Refrigerated bag':'Frozen bag');
 }
 const combo=plan(['17586','17589','17427','17592','17601','17605','17409','17420','14579','1696']);
 assert.equal(combo.bags.length,2);
 assert.equal(combo.submit.reduce((n,x)=>n+x.count,0),9);
 assert(combo.draw.some(x=>x.tests.every(t=>/Pleural Fluid/.test(t.specimenType))));
 assert(combo.draw.some(x=>x.tests.every(t=>t.specimenType==='CSF')));
 assert(combo.draw.some(x=>x.tests.every(t=>t.specimenType==='Pericardial Fluid')));
 assert.equal(plan(['14579','1696']).submit.reduce((n,x)=>n+x.count,0),1,
  'same-source unpreserved urine shares an original sterile cup');
});
test('Labcorp 2-SST source, two-material profiles, and individual frozen purple aliquots are retained',async()=>{
 const plan=await calculator('Labcorp');
 const ctd=plan(['520340']);
 assert.equal(ctd.draw.find(x=>x.className==='tube-sst').count,2);
 assert(ctd.submit.some(x=>x.label==='Transport Tube'));
 const metabolic=plan(['335884']);
 assert(metabolic.draw.some(x=>x.className==='tube-sst'));
 assert(metabolic.draw.some(x=>/Gray Fluoride/.test(x.label)));
 assert(metabolic.submit.some(x=>x.label === 'Transport Tube' && x.tests.some(test => test.specimenType === 'Plasma')));
 const heart=plan(['500140']);
 assert(heart.draw.some(x=>x.className==='tube-sst'));
 assert(heart.draw.some(x=>x.className==='tube-blue'));
 assert(heart.bags.some(x=>x.label==='Frozen bag'));
 assert(heart.bags.some(x=>x.label==='Refrigerated bag'));
 assert(heart.submit.some(x=>x.className==='tube-frozen-purple'));
 const coag=plan(['164509','117921','117713','117340','115402','117838']);
 assert.equal(coag.draw.find(x=>x.className==='tube-blue').count,6);
 assert.equal(coag.submit.length,6);
 assert(coag.submit.every(x=>x.className==='tube-frozen-purple'&&x.count===1));
});
test('selector fallback shows only cart-ready active test counts and refreshes on all pages',()=>{
  assert(read('assets/js/lab-select.js').includes('quest:' + JSON.parse(read('assets/search/quest-tests.json')).tests.length));
 for(const p of ['index.html','labcorp.html','cedars.html'])
  assert(read(p).match(/assets\/js\/lab-select\.js\?v=[\w.-]+/));
});
