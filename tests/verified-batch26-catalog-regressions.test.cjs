'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
const catalogs={
  genetics:{file:'assets/js/labcorp/catalog/verified-genetic-blood-expansion-20261116-batch26.js',page:'labcorp.html',app:'labcorp-app.js',codes:['899722','899755','898950','900061','899634','899667','898956','899850','900371','899907','900143','900080','900635','900020','900072','899962','900599','899885','899940','900121','899863','900098','899973','900113','900151','900046','899951','900503','899997','900152','899689','899700','899896','899828','899929','899874','900141','900144','900225']},
  serum:{file:'assets/js/labcorp/catalog/verified-serum-specialty-20261116-batch26.js',page:'labcorp.html',app:'labcorp-app.js',codes:['520149','520059','520134','520298','520194','520293','501220','501663','503715','500285','500597','502236','504050','502280']}
};
function load(file,seed=[]){const window={SEED_TESTS:seed};vm.runInNewContext(read(file),{window},{filename:file});return window.SEED_TESTS;}
test('every verified catalog loads once, before its calculator, with all intended unique codes',()=>{
  const all=new Set();
  for(const cfg of Object.values(catalogs)){
    const html=read(cfg.page);const ref='src="'+cfg.file+'?';
    assert.equal(html.split(ref).length-1,1,cfg.file);
    assert(html.indexOf(ref)<html.indexOf('src="'+cfg.app),cfg.file+' must load before app');
    const rows=load(cfg.file);
    assert.deepEqual(rows.map(r=>r.testCode),cfg.codes);
    for(const r of rows){
      assert(!all.has(r.testCode),'duplicate new code '+r.testCode);all.add(r.testCode);
      for(const key of ['testName','specimenType','drawContainer','transportContainer','preferredVolume','minimumVolume','transportTemperature','stability','specialInstructions','source'])
        assert(String(r[key]||'').trim(),r.testCode+' missing '+key);
      assert.equal(r.status,'active');assert(r.collectionCount>=1);assert(r.submissionCount>=1);
      assert.equal(r.alternativeContainer,'');
      assert(r.source.includes('/'+r.testCode),r.testCode+' source link mismatched');
      assert.doesNotMatch(r.drawContainer+' '+r.transportContainer,/slide|smear|acid.preserv|futhan|insure card|green.label aptima/i);
    }
  }
  assert.equal(all.size,53);
});
test('idempotent import, existing active and blocked records remain authoritative',()=>{
  for(const cfg of Object.values(catalogs)){
    const rows=load(cfg.file);load(cfg.file,rows);
    assert.equal(rows.length,cfg.codes.length);
    const seed=[
      {testCode:cfg.codes[0],testName:'existing active',status:'active'},
      {testCode:cfg.codes[1],testName:'existing blocked',status:'blocked'},
      {testCode:cfg.codes[2]||cfg.codes[0],testName:'reference only',status:'reference'}
    ];
    load(cfg.file,seed);
    assert.equal(seed[0].testName,'existing active');
    assert.equal(seed[1].testName,'existing blocked');
    if(cfg.codes.length>2)assert.equal(seed[2].status,'active');
  }
});
test('all 39 genetic assays have separate original EDTA tubes and consent precautions',()=>{
  const rows=load(catalogs.genetics.file);assert.equal(rows.length,39);
  for(const r of rows){
    assert.equal(r.specimenType,'Whole Blood');
    assert.equal(r.drawContainer,'Lavender EDTA');
    assert.equal(r.transportContainer,'Lavender EDTA');
    assert.equal(r.spin,'No');assert.equal(r.transportTemperature,'Room Temperature');
    assert.match(r.specialInstructions,/DEDICATED COLLECTION TUBE/);
    assert.match(r.specialInstructions,/informed-consent attestation/);
    assert.match(r.specialInstructions,/allogeneic bone marrow transplant/);
    assert.match(r.specialInstructions,/Do not freeze/);
  }
});
test('14 specialty serum routes preserve SST vs red top and refrigeration vs frozen purple caps',()=>{
  const rows=load(catalogs.serum.file),rdl=rows.filter(r=>r.testCode.startsWith('520')),esoterix=rows.filter(r=>!r.testCode.startsWith('520'));
  assert.equal(rows.length,14);assert.equal(rdl.length,6);assert.equal(esoterix.length,8);
  for(const r of rdl){assert.equal(r.drawContainer,'SST / Gold');assert.equal(r.transportContainer,'Transport Tube');assert.equal(r.transportTemperature,'Refrigerated');assert.equal(r.spin,'Yes');}
  for(const r of esoterix){assert(['Red Top','SST / Gold'].includes(r.drawContainer));assert.equal(r.transportContainer,'Frozen Transport Tube (Purple Cap)');assert.equal(r.transportTemperature,'Frozen');assert.equal(r.spin,'Yes');}
  for(const code of ['501220','501663','500597','502236']){
    assert.equal(rows.find(r=>r.testCode===code).drawContainer,'Red Top');
  }
  assert(!rows.some(r=>r.testCode==='505770'),'Futhan-dependent lupus profile must remain excluded');
});
