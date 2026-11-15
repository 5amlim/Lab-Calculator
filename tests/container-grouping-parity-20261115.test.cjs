'use strict';
// Regression coverage for cross-catalog collection and transport normalization.
// These tests validate grouping logic, not the accuracy of every external lab entry.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const read = p => fs.readFileSync(path.join(__dirname, '..', p), 'utf8');

function openCalculator(appFile, seed = []) {
  const window = { SEED_TESTS: seed };
  const document = {
    getElementById: id => ({
      id, value: '', checked: false, options: [], classList: { add(){}, remove(){}, toggle(){} },
      addEventListener(){}, setAttribute(){}, querySelector(){return null;}
    }),
    querySelector: () => null,
    querySelectorAll: () => [],
    addEventListener(){}
  };
  const localStorage = { getItem: () => null, setItem(){}, removeItem(){} };
  const app = read(appFile);
  assert.ok(app.includes('  init();'), appFile + ': initialization boundary');
  const replacement = '  window.__groupingAudit = { database, normalizeRecord, isTimedUrineTest, ' +
    'isPlainUrineAliquotTransport, isGenericSerumPlasmaTransport, canonicalCollectionContainer, ' +
    'transportTubeClass, transportContainerFilterCategories, menuContainerBadges, ' +
    'expandedCollectionTests, buildTransportBagPlan, buildCollectionPlan, buildSubmissionContents, ' +
    'splitSubmissionContainers };';
  vm.runInNewContext(app.replace('  init();', replacement), {
    window, document, localStorage, setTimeout:()=>0, clearTimeout(){},
    console:{warn(){},error(){}}
  }, {filename:appFile, timeout:30000});
  assert.ok(window.__groupingAudit, appFile + ': audit hooks available');
  return window.__groupingAudit;
}

function make(api, code, specimenType, draw, transport, temp='Room Temperature', instructions='') {
  return api.normalizeRecord({
    id:'audit-'+code, testCode:String(code), testName:'Audit '+code, specimenType,
    drawContainer:draw, transportContainer:transport,
    preferredVolume:specimenType==='Urine'?'10 mL':'1 mL',
    minimumVolume:specimenType==='Urine'?'3 mL':'0.5 mL',
    spin:/^(?:serum|plasma)$/i.test(specimenType)?'Yes':'No',
    transportTemperature:temp, specialInstructions:instructions, status:'active'
  });
}
function plan(api, tests) {
  const expanded=api.expandedCollectionTests(tests);
  const bags=api.buildTransportBagPlan(expanded);
  return {expanded,bags,collection:api.buildCollectionPlan(expanded,bags),
    submitted:bags.flatMap(b=>api.buildSubmissionContents(b))};
}

for (const [lab, appFile] of [['Quest','assets/js/app.js'],['Labcorp','labcorp-app.js']]) {
  test(lab+': unpreserved urine aliquot labels map to the sterile-cup stock', () => {
    const api=openCalculator(appFile);
    for (const transport of ['Urine Aliquot Tube','Plastic Urine Aliquot Vial',
      'Unpreserved Urine Container','Plastic Screw-Cap Urine Aliquot Tube',
      'Plastic Urine Aliquot Container, No Preservative']) {
      const spot=make(api,901,'Urine','Sterile cup',transport);
      assert.equal(api.isPlainUrineAliquotTransport(spot,transport),true,transport);
      assert.equal(api.canonicalCollectionContainer(spot).label,'Sterile cup',transport);
      assert(api.transportContainerFilterCategories(spot).includes('sterile-cup'),transport);
      assert.doesNotMatch(api.menuContainerBadges(spot),/container-path-arrow/,transport);
      const p=plan(api,[spot]);
      assert.equal(p.submitted.length,1,transport);
      assert.equal(p.submitted[0].label,'Sterile cup',transport);
      assert.equal(p.submitted[0].count,1,transport);
    }
  });

  test(lab+': 24-hour urine stays a timed source jug with a separate clean cup aliquot', () => {
    const api=openCalculator(appFile);
    const timed=make(api,902,'24-Hour Urine','24-Hour Urine Container','Urine Aliquot Tube');
    const p=plan(api,[timed]);
    assert.equal(api.isTimedUrineTest(timed),true);
    assert.match(api.canonicalCollectionContainer(timed).label,/24.Hour Urine Container/);
    assert.match(api.menuContainerBadges(timed),/container-path-arrow/);
    assert.equal(p.submitted.length,1);
    assert.equal(p.submitted[0].label,'Sterile cup');
    assert.equal(p.submitted[0].count,1);
  });

  test(lab+': first-catch urine is a spot collection, not a timed 24-hour source', () => {
    const api=openCalculator(appFile);
    const first=make(api,903,'Urine','Sterile cup','Urine Aliquot Tube');
    first.testName='First-catch urine panel';
    assert.equal(api.isTimedUrineTest(first),false);
    assert.equal(api.canonicalCollectionContainer(first).label,'Sterile cup');
  });

  test(lab+': preservative and specialty urine devices are never silently called sterile cups', () => {
    const api=openCalculator(appFile);
    const cases=[
      ['Aptima Urine Transport Tube','Aptima Urine Transport Tube'],
      ['Trace Metal-Free Urine Container','Trace Metal-Free Urine Container'],
      ['6N HCl Preserved Urine Container','6N HCl Preserved Urine Container']
    ];
    for(const [draw,transport] of cases){
      const t=make(api,904,'Urine',draw,transport);
      assert.equal(api.isPlainUrineAliquotTransport(t,transport),false,transport);
      assert.notEqual(api.canonicalCollectionContainer(t).label,'Sterile cup',draw);
    }
  });

  test(lab+': ordinary plastic serum and plasma tubes share green transport badges, not special tubes', () => {
    const api=openCalculator(appFile);
    const normal=['Serum Transport Tube','Plastic Serum Transport Vial',
      'Plastic Screw-Cap Serum Vial','Plastic Plasma Transport Vial (Additive-Free)',
      'Plasma Transfer Tube','Polypropylene Plasma Aliquot Container',
      'Plastic Plasma Transport Vial, No Preservative',
      'Dedicated Plastic Serum Transport Tube'];
    for(const value of normal){
      const material=/serum/i.test(value)?'Serum':'Plasma';
      const sample=make(api,905,material,'Red Top',value);
      assert.equal(api.isGenericSerumPlasmaTransport(sample,value),true,value);
      assert.equal(api.transportTubeClass(sample,value),'tube-transport tube-transport-green-top',value);
    }
    const mixed=make(api,908,'Serum or Plasma','Red Top','Plastic Serum/Plasma Transport Tube');
    assert.equal(api.isGenericSerumPlasmaTransport(mixed,mixed.transportContainer),true);
    assert.equal(api.transportTubeClass(mixed,mixed.transportContainer),'tube-transport tube-transport-green-top');
    const dedicated=make(api,909,'Serum','Red Top','Dedicated Plastic Serum Transport Tube');
    const regular=make(api,910,'Serum','Red Top','Plastic Serum Transport Tube');
    const distinct=plan(api,[dedicated,regular]);
    assert.equal(distinct.submitted.reduce((n,x)=>n+x.count,0),2);
    const exceptions=['Amber Serum Transport Tube','Acid-Washed Plasma Transport Tube',
      'Metal-Free Serum Transport Vial','Frozen Plasma Transport Tube',
      'Platelet-Poor Plasma Transport Tube','EDTA Plasma Transport Tube'];
    for (const value of exceptions) {
      const t=make(api,906,/serum/i.test(value)?'Serum':'Plasma','Red Top',value);
      assert.equal(api.isGenericSerumPlasmaTransport(t,value),false,value);
    }
    const frozen=make(api,907,'Plasma','Green Lithium Heparin',
      'Plastic Plasma Transport Vial','Frozen');
    assert.equal(api.isGenericSerumPlasmaTransport(frozen,frozen.transportContainer),false);
  });
}

for (const [lab, appFile] of [['Quest','assets/js/app.js'],['Labcorp','labcorp-app.js']]) {
  test(lab+': no HCl qualifiers do not mask a plain urine aliquot transport', () => {
    const api=openCalculator(appFile);
    for (const qualifier of ['no HCl', 'without HCl', 'no acid preservative']) {
      const sample=make(api,911,'24-Hour Urine','24-Hour Urine Container ('+qualifier+')','Urine Aliquot Transport Tube');
      assert.equal(api.isPlainUrineAliquotTransport(sample,sample.transportContainer),true,qualifier);
      const submitted=plan(api,[sample]).submitted;
      assert.equal(submitted.length,1,qualifier);
      assert.equal(submitted[0].label,'Sterile cup',qualifier);
      assert.equal(submitted[0].count,1,qualifier);
    }
    const actuallyAcid=make(api,912,'24-Hour Urine','24-Hour Urine Container (6N HCl Preserved)','Urine Aliquot Transport Tube');
    assert.equal(api.isPlainUrineAliquotTransport(actuallyAcid,actuallyAcid.transportContainer),false);
    assert.notEqual(plan(api,[actuallyAcid]).submitted[0].label,'Sterile cup');
  });
}

test('Labcorp 809523 metal-free urine collection stays a dedicated specialty container',()=>{
  const window={SEED_TESTS:[]};
  vm.runInNewContext(read('assets/js/labcorp/catalog/therapeutic-drug-monitoring-20261023.js'),{window});
  const api=openCalculator('labcorp-app.js',window.SEED_TESTS);
  const specimen=api.database.find(t=>t.testCode==='809523');
  assert.ok(specimen,'809523 is in the real Labcorp catalog');
  const source=api.canonicalCollectionContainer(specimen);
  assert.match(source.label,/metal.free.*urine/i);
  assert.notEqual(source.label,'Sterile cup');
  assert.equal(source.className,'tube-trace-metal-container');
  const submitted=plan(api,[specimen]).submitted;
  assert.equal(submitted.length,1);
  assert.match(submitted[0].label,/metal.free/i);
  assert.notEqual(submitted[0].label,'Sterile cup');
});

test('Quest 1430: two separate gray-top draws, two centrifuged additive-free plasma vials, green transport badge',()=>{
  const window={SEED_TESTS:[]};
  vm.runInNewContext(read('assets/js/quest-gray-plasma-processing-20261114.js'),{window});
  const api=openCalculator('assets/js/app.js',window.SEED_TESTS);
  const specimen=api.database.find(t=>t.testCode==='1430');
  assert.ok(specimen,'1430 exists');
  assert.equal(specimen.spin,'Yes');
  assert.match(specimen.transportContainer,/Plastic Screw-Cap Plasma Vial/);
  const p=plan(api,[specimen]);
  assert.equal(p.expanded.length,2);
  assert.equal(p.collection.reduce((sum,item)=>sum+item.count,0),2);
  assert.equal(p.submitted.reduce((sum,item)=>sum+item.count,0),2);
  assert.equal(new Set(p.submitted.map(item=>item.key)).size,2);
  assert(p.submitted.every(item=>item.className==='tube-transport tube-transport-green-top'));
  assert.match(api.menuContainerBadges(specimen),/tube-transport-green-top/);
});

test('Quest 229 retains 24-hour source collection but submits one unpreserved sterile-cup aliquot',()=>{
  const window={SEED_TESTS:[]};
  vm.runInNewContext(read('assets/js/quest-verified-urine-20261114.js'),{window});
  const api=openCalculator('assets/js/app.js',window.SEED_TESTS);
  const item=api.database.find(t=>t.testCode==='229');
  assert.ok(item,'Quest 229 exists in verified urine catalog');
  assert.equal(api.isPlainUrineAliquotTransport(item,item.transportContainer),true);
  assert.equal(api.isTimedUrineTest(item),true);
  const p=plan(api,[item]);
  assert.match(api.canonicalCollectionContainer(item).label,/24.Hour|Timed/i);
  assert.equal(p.submitted.length,1);
  assert.equal(p.submitted[0].label,'Sterile cup');
});
