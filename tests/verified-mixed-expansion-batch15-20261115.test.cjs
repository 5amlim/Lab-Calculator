'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('./helpers/browser-vm.cjs');
const root=path.join(__dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const catalog={
 Quest:'assets/js/quest-verified-mixed-expansion-20261115-batch15.js',
 Labcorp:'assets/js/labcorp/catalog/verified-mixed-expansion-20261115-batch15.js'
};
const apps={Quest:'assets/js/app.js',Labcorp:'labcorp-app.js'};
const codes={Quest:['94569','94570'],Labcorp:['520149','520059','520555','511162','500140','140080','100446']};
function rows(lab,initial=[]){
 const window={SEED_TESTS:initial};
 vm.runInNewContext(read(catalog[lab]),{window},{filename:catalog[lab]});
 return window.SEED_TESTS;
}
async function planner(lab){
 const window={SEED_TESTS:rows(lab),QUEST_MISSING_DIRECTORY_READY:Promise.resolve(0)};
 const document={
  getElementById:id=>({id,value:'',checked:false,options:[],classList:{add(){},remove(){},toggle(){}},
    addEventListener(){},setAttribute(){},querySelector(){return null;}}),
  querySelector(){return null;},querySelectorAll(){return [];},addEventListener(){}
 };
 const app=read(apps[lab]);
 const boundary=lab==='Quest'?'  init();\n  };':'  init();';
 assert(app.includes(boundary),lab+' bootstrap');
 const hook='  window.__verified15={database,expandedCollectionTests,buildTransportBagPlan,buildCollectionPlan,buildSubmissionContents};'
  +(lab==='Quest'?'\n  };':'');
 vm.runInNewContext(app.replace(boundary,hook),{
  window,document,localStorage:{getItem(){return null;},setItem(){},removeItem(){}},
  setTimeout(){return 0;},clearTimeout(){},console:{warn(){},error(){}}
 },{filename:apps[lab],timeout:30000});
 await new Promise(resolve=>setImmediate(resolve));
 assert(window.__verified15,lab+' hook');
 return window.__verified15;
}
function plan(h,codeList){
 const selected=codeList.map(code=>h.database.find(x=>x.testCode===code));
 assert(selected.every(x=>x&&x.status==='active'),'cart-ready batch');
 const expanded=h.expandedCollectionTests(selected),bags=h.buildTransportBagPlan(expanded);
 return {selected,bags,draw:h.buildCollectionPlan(expanded,bags),
  submitted:bags.flatMap(bag=>h.buildSubmissionContents(bag))};
}
test('Batch 15 is loaded before the planner with exact distinct codes and verified metadata',()=>{
 for(const lab of ['Quest','Labcorp']){
  const found=rows(lab),html=read(lab==='Quest'?'index.html':'labcorp.html');
  assert.deepEqual(Array.from(found,x=>x.testCode),codes[lab]);
  assert.equal(html.split(catalog[lab]).length-1,1);
  assert(html.indexOf(catalog[lab])<html.indexOf('src="'+apps[lab]));
  for(const r of found){
   assert.equal(r.status,'active');
   for(const key of ['source','testName','specimenType','drawContainer',
     'transportContainer','preferredVolume','minimumVolume','specialInstructions']){
     assert(r[key],r.testCode+' '+key);
   }
   assert.match(r.source,/2026-11-15/);
   assert.doesNotMatch([r.drawContainer,r.transportContainer].join(' '),
      /smear|slide|6N HCl|acid.preserved|green.label aptima|insure card/i);
  }
 }
});
test('Repeat imports never duplicate, and existing validated and blocked tests are protected',()=>{
 for(const lab of ['Quest','Labcorp']){
  const first=rows(lab),after=rows(lab,first);
  assert.equal(first.length,after.length);
  const prior=[
   {testCode:codes[lab][0],testName:'Previously validated',status:'active'},
   {testCode:codes[lab][1],testName:'Previously blocked',status:'blocked'}
  ];
  rows(lab,prior);
  assert.equal(prior[0].testName,'Previously validated');
  assert.equal(prior[1].status,'blocked');
 }
});
test('Quest frozen serum and plasma remain separate green-badge transport aliquots',async()=>{
 const h=await planner('Quest'),p=plan(h,codes.Quest);
 assert.deepEqual(Array.from(p.bags,x=>x.label),['Frozen bag']);
 assert(p.draw.some(x=>x.label==='Gold / SST'&&x.count===1));
 assert(p.draw.some(x=>x.label==='Lavender EDTA'&&x.count===1));
 assert.equal(p.submitted.length,2);
 assert(p.submitted.every(x=>x.count===1&&x.className.includes('tube-transport-green-top')));
 assert(p.selected.every(x=>/not available in all service areas/.test(x.specialInstructions)));
});
test('Labcorp original whole blood and random urine do not produce duplicate submissions',async()=>{
 const h=await planner('Labcorp'),blood=plan(h,['511162']),urine=plan(h,['100446']);
 assert.deepEqual(Array.from(blood.draw,x=>[x.label,x.count]),[['Lavender EDTA',2]]);
 assert.equal(blood.submitted.length,1);
 assert.equal(blood.submitted[0].count,2);
 assert.equal(blood.submitted[0].originalTube,true);
 assert.deepEqual(Array.from(urine.draw,x=>[x.label,x.count]),[['Sterile cup',1]]);
 assert.equal(urine.submitted.length,1);
 assert.equal(urine.submitted[0].count,1);
 assert.equal(urine.submitted[0].originalTube,true);
});
test('Labcorp 500140 and 140080 include separate temperature bags and frozen plasma',async()=>{
 const h=await planner('Labcorp');
 for(const code of ['500140','140080']){
  const p=plan(h,[code]);
  assert.equal(p.bags.length,2);
  assert(p.bags.some(x=>x.label==='Frozen bag'));
  assert(p.draw.some(x=>x.label==='Gold / SST'));
  assert(p.submitted.some(x=>x.className==='tube-frozen-purple'&&x.count===1));
  assert(p.submitted.some(x=>x.className.includes('tube-transport-green-top')));
 }
 assert(plan(h,['500140']).draw.some(x=>x.label==='Light Blue Citrate'));
 assert(plan(h,['140080']).draw.some(x=>x.label==='Lavender EDTA'));
});
test('Labcorp large serum profiles use extra SST draws and proper frozen purple transport',async()=>{
 const h=await planner('Labcorp');
 for(const code of ['520149','520555']){
  const p=plan(h,[code]);
  assert.equal(p.draw.length,1);
  assert.equal(p.draw[0].label,'Gold / SST');
  assert.equal(p.draw[0].count,2);
 }
 const frozen=plan(h,['520555']);
 assert.equal(frozen.submitted[0].className,'tube-frozen-purple');
 assert.equal(frozen.bags[0].label,'Frozen bag');
});
