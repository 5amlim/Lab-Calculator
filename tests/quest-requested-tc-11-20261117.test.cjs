'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const src=fs.readFileSync(path.join(root,'assets/js/quest-requested-tc-11-20261117.js'),'utf8');
function seed(before=[]){const window={SEED_TESTS:before};vm.runInNewContext(src,{window});return window.SEED_TESTS;}
const codes=['10676','15434','15060','10380','38470','30673','672','270','94569','13808','92717','19593'];
test('the 12 requested Quest codes are cataloged once, with normal and restricted statuses',()=>{
 const rows=seed();const by=new Map(rows.map(x=>[x.testCode,x]));
 assert.equal(rows.map(x=>x.testCode).join(','),codes.join(','));
 assert.equal(by.size,codes.length);
 assert.equal(rows.filter(x=>x.status==='active').length,10);
 assert.equal(rows.filter(x=>x.status==='reference').length,1);
 assert.equal(rows.filter(x=>x.status==='blocked').length,1);
 assert.equal(by.get('10676').status,'active');
 assert.equal(by.get('10676').specimenType,'Urine');
 assert.equal(by.get('92717').status,'blocked');
 assert.equal(by.get('94569').status,'reference');
 for(const t of rows){
  assert.ok(t.source.includes('/'+t.testCode+'/'),t.testCode);
  assert.ok(t.searchAliases.length>1,t.testCode);
  assert.ok(t.clinicalCategories.length>0,t.testCode);
  assert.ok(t.specialLabeling.startsWith('Label '),t.testCode);
 }
});
test('catalog protects blocked and existing active records and promotes reference-only records',()=>{
 const rows=seed([{testCode:'15434',status:'blocked',id:'blocked'},{testCode:'15060',status:'active',id:'already-active'},{testCode:'30673',status:'reference',id:'old-ref'},{testCode:'19593',status:'pending',id:'old-pending'}]);
 assert.equal(rows.length,codes.length);
 const by=new Map(rows.map(x=>[x.testCode,x]));
 assert.equal(by.get('15434').status,'blocked');
 assert.equal(by.get('15060').id,'already-active');
 assert.equal(by.get('30673').id,'old-ref');
 assert.equal(by.get('30673').status,'active');
 assert.equal(by.get('19593').id,'old-pending');
 assert.equal(by.get('19593').status,'active');
});
test('legacy A1c and stool records repair only their critical collection and label fields',()=>{
 const rows=seed([{testCode:'10380',status:'active',id:'old10380',additionalDrawRequirements:[],preferredVolume:'1 mL serum + EDTA'},{testCode:'38470',status:'active',id:'old38470',specialLabeling:'old date and time'}]);
 const by=new Map(rows.map(x=>[x.testCode,x]));
 assert.equal(by.get('10380').id,'old10380');
 assert.equal(by.get('10380').additionalDrawRequirements.length,1);
 assert.equal(by.get('10380').additionalDrawRequirements[0].specimenType,'Whole Blood');
 assert.equal(by.get('10380').preferredVolume,'1 mL serum');
 assert.equal(by.get('38470').id,'old38470');
 assert.equal(by.get('38470').specialLabeling,'Label STOOL · CARY-BLAIR');
});
test('reflex and specialty tests keep accurate specimen/source handling',()=>{
 const by=new Map(seed().map(x=>[x.testCode,x]));
 assert.equal(by.get('15060').fastingStatus,'required');
 assert.equal(by.get('15060').transportContainer,'Transport Tube');
 assert.equal(by.get('15060').transportTemperature,'Refrigerated');
 assert.equal(by.get('30673').transportTemperature,'Room Temperature');
 assert.equal(by.get('38470').drawContainer,'Sterile cup');
 assert.ok(by.get('38470').transportContainer.includes('Cary-Blair'));
 assert.equal(by.get('672').transportContainer,'Trace Metal-Free Plastic Container');
 assert.equal(by.get('270').transportContainer,'Trace Metal-Free Plastic Container');
 assert.equal(by.get('13808').drawContainer,'Lavender EDTA');
 assert.ok(by.get('13808').specialInstructions.includes('SAME-DAY'));
 assert.ok(by.get('13808').specialInstructions.includes('NO CLINIC-PREPARED GLASS SLIDES'));
 assert.equal(by.get('19593').transportTemperature,'Room Temperature');
 assert.ok(by.get('94569').specialInstructions.includes('DRY ICE'));
 const b=by.get('92717');
 assert.equal(b.additionalDrawRequirements.length,1);
 assert.equal(b.transportTemperature,'Room Temperature');
 assert.equal(b.additionalDrawRequirements[0].transportTemperature,'Refrigerated');
 assert.ok(b.additionalDrawRequirements[0].preferredVolume.includes('10 mL'));
});
test('Quest 92717 always appears as Do Not Perform, including legacy active records',()=>{
 for(const prior of ['reference','pending','active','blocked']){
  const rows=seed([{id:'legacy-'+prior,testCode:'92717',status:prior,additionalDrawRequirements:[]}]);
  const b=rows.find(x=>x.testCode==='92717');
  assert.equal(rows.length,codes.length);
  assert.equal(b.id,'legacy-'+prior);
  assert.equal(b.status,'blocked');
  assert.ok(b.specialInstructions.startsWith('DO NOT PERFORM ONSITE.'));
  assert.equal(b.additionalDrawRequirements.length,1);
  assert.equal(b.transportTemperature,'Room Temperature');
  assert.equal(b.additionalDrawRequirements[0].transportTemperature,'Refrigerated');
 }
 const b=seed().find(x=>x.testCode==='92717');
 assert.equal(b.status,'blocked');
 assert.ok(b.specialInstructions.includes('DO NOT COLLECT OR SEND'));
});
test('saved browser active overrides and custom records cannot reactivate 92717',()=>{
 const app=fs.readFileSync(path.join(root,'assets/js/app.js'),'utf8');
 assert.ok(app.includes("String(base.testCode || '') === '92717'"));
 assert.ok(app.includes("builtIns[index] = { ...override, ...base, id: base.id, status: 'blocked' }"));
 assert.ok(app.includes("String(test.testCode || '').trim() === '92717'"));
 assert.ok(app.includes("test && test.status === 'active'"));
});
test('script import occurs before app initialization and after prior Quest corrections',()=>{
 const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
 const old=html.indexOf('quest-verified-metal-neuro-batch14-20261117.js');
 const newOne=html.indexOf('quest-requested-tc-11-20261117.js');
 const app=html.indexOf('assets/js/app.js');
 assert.ok(old>=0&&newOne>old&&app>newOne);
});
