'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('./helpers/browser-vm.cjs');
const read=file=>fs.readFileSync(path.join(__dirname,'..',file),'utf8');
const Q='assets/js/quest-verified-blood-expansion-20261115-batch11.js';
const L='assets/js/labcorp/catalog/verified-blood-expansion-20261115-batch11.js';
const QCODES=['10529','19724','18090','18089','18070','18068'];
const LCODES=['503198','502682','500440','500166','504050','500597','502236','501663','503715'];
async function catalog(lab){
 const window={};
 const context=vm.createContext({window,console,DecompressionStream,Blob,Response,Uint8Array,TextDecoder,atob});
 const html=read(lab==='Quest'?'index.html':'labcorp.html');
 for(const match of html.matchAll(/<script[^>]+src="([^"]+)"/g)){
  const file=match[1].split('?')[0];
  if(file.includes('batch-inline-hints')||file==='assets/js/app.js'||file==='labcorp-app.js')break;
  vm.runInContext(read(file),context,{filename:file,timeout:15000});
 }
 if(window.QUEST_MISSING_DIRECTORY_READY)await window.QUEST_MISSING_DIRECTORY_READY;
 return window;
}
async function planner(lab){
 const window=await catalog(lab);
 const document={getElementById:id=>({id,value:'',checked:false,options:[],classList:{add(){},remove(){},toggle(){}},addEventListener(){},setAttribute(){},querySelector(){return null;}}),querySelector(){return null;},querySelectorAll(){return [];},addEventListener(){}};
 const file=lab==='Quest'?'assets/js/app.js':'labcorp-app.js',src=read(file);
 const hook=lab==='Quest'?'  init();\n  };':'  init();';
 assert(src.includes(hook));
 const inject='  window.__batch11={database,expandedCollectionTests,buildTransportBagPlan,buildCollectionPlan,buildSubmissionContents};'+(lab==='Quest'?'\n  };':'');
 vm.runInNewContext(src.replace(hook,inject),{window,document,localStorage:{getItem(){return null;},setItem(){},removeItem(){}},setTimeout(){return 0;},clearTimeout(){},console:{warn(){},error(){}}},{filename:file,timeout:30000});
 await new Promise(resolve=>setImmediate(resolve));
 const api=window.__batch11;assert(api);
 return codes=>{
  const selected=codes.map(c=>api.database.find(t=>t.testCode===c));
  selected.forEach((r,i)=>assert(r&&r.status==='active',lab+' '+codes[i]));
  const expanded=api.expandedCollectionTests(selected),bags=api.buildTransportBagPlan(expanded);
  return {selected,expanded,bags,draw:api.buildCollectionPlan(expanded,bags),submitted:bags.flatMap(b=>api.buildSubmissionContents(b))};
 };
}
test('Both deployed catalog entry points activate each new code once with complete verified routes',async()=>{
 for(const [lab,codes,script] of [['Quest',QCODES,Q],['Labcorp',LCODES,L]]){
  const {SEED_TESTS:rows}=await catalog(lab);
  for(const code of codes){
   const matches=rows.filter(r=>r.testCode===code);assert.equal(matches.length,1,code);
   const r=matches[0];assert.equal(r.status,'active');assert(['Serum','Plasma','Whole Blood'].includes(r.specimenType));
   for(const key of ['drawContainer','transportContainer','preferredVolume','minimumVolume','transportTemperature','stability','spin','source'])assert(r[key]&&!/unverified|not verified|verify official/i.test(r[key]),code+' '+key);
  }
  const window={SEED_TESTS:[{testCode:codes[0],status:'active',testName:'Preserve validated entry'},{testCode:codes[1],status:'blocked',testName:'Preserve blocked entry'}]};
  vm.runInNewContext(read(script),{window});assert.equal(window.SEED_TESTS[0].testName,'Preserve validated entry');assert.equal(window.SEED_TESTS[1].status,'blocked');
 }
});
test('Quest whole blood remains unspun in original lavender without a transfer container',async()=>{
 const plan=await planner('Quest');
 for(const code of ['19724','18090','18070']){
  const p=plan([code]);assert.equal(p.selected[0].spin,'No');assert.deepEqual(Array.from(p.bags,b=>b.label),['Refrigerated bag']);
  assert(p.submitted.every(r=>r.className==='tube-lavender'),code);
  assert(!p.submitted.some(r=>/transport/i.test(r.label)),code);
 }
});
test('Quest EDTA count reserves separate whole-blood and plasma source tubes',async()=>{
 const plan=await planner('Quest'),p=plan(['18090','18089']);
 assert.equal(p.expanded.length,2);
 const lavender=p.draw.find(r=>r.className==='tube-lavender');
 assert.equal(lavender.count,3,'One intact whole-blood tube plus two plasma source tubes');
 assert.match(lavender.detail,/1 whole blood.*2 source for plasma/);
 assert(p.submitted.some(r=>r.className==='tube-lavender'));
 assert(p.submitted.some(r=>r.label==='Transport Tube'&&r.className.includes('green-top')));
 assert.equal(p.selected.find(r=>r.testCode==='18089').spin,'Yes');
});
test('Quest HBV alternative plasma route uses generic frozen green-badge transport, not Labcorp purple',async()=>{
 const plan=await planner('Quest'),p=plan(['10529']);
 assert.equal(p.selected[0].drawContainer,'Lavender EDTA');assert.equal(p.selected[0].spin,'Yes');
 assert.deepEqual(Array.from(p.bags,b=>b.label),['Frozen bag']);
 assert(p.submitted.every(r=>r.className.includes('green-top')&&r.className!=='tube-frozen-purple'));
});
test('Labcorp keeps one dedicated purple frozen transport aliquot per assay and separates red-top draws',async()=>{
 const plan=await planner('Labcorp'),p=plan(LCODES);
 assert.deepEqual(Array.from(p.bags,b=>b.label),['Frozen bag']);
 assert.equal(p.submitted.reduce((n,r)=>n+r.count,0),LCODES.length,'Frozen orders must not pool');
 assert(p.submitted.every(r=>r.className==='tube-frozen-purple'));
 for(const code of ['500166','500597','502236','501663']){
  const one=plan([code]);assert(one.draw.every(r=>r.className==='tube-red'),code+' must not use SST');
 }
 assert(plan(['502236']).draw.reduce((n,r)=>n+r.count,0)>=2);
 assert(plan(['501663']).draw.reduce((n,r)=>n+r.count,0)>=2);
});
