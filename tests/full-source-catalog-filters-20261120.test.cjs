'use strict';
// Exercise the actual, fully loaded Quest and Labcorp source catalogs.
// Unlike the lightweight published search indexes this checks real collection
// metadata, secondary draws, transport containers, and temperature filters.
const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.join(__dirname, '..');
const read = p => fs.readFileSync(path.join(root,p),'utf8');

async function loadCalculator(page,app,lab) {
  const html = read(page);
  const scripts = [...html.matchAll(/<script\b[^>]*\bsrc="([^"]+)"[^>]*>/gi)]
    .map(m => m[1].split('?')[0]);
  const end = scripts.indexOf(app);
  assert(end >= 0,'Missing calculator entrypoint '+app);
  const elementCache = new Map();
  const element = () => ({value:'',checked:false,options:[],dataset:{},style:{},
    classList:{add(){},remove(){},toggle(){},contains(){return false}},
    addEventListener(){},setAttribute(){},removeAttribute(){},
    appendChild(){},querySelector(){return null},querySelectorAll(){return []}});
  const document = {body:{dataset:{galleryLab:lab === 'quest'?'Q':'L'}},
    getElementById:id => {
      if(!elementCache.has(id))elementCache.set(id,element());
      return elementCache.get(id);
    },
    querySelector:()=>null,querySelectorAll:()=>[],addEventListener(){},
    createElement:element};
  const localStorage = {getItem(){return null},setItem(){},removeItem(){}};
  const sandbox={document,localStorage,console,URL,URLSearchParams,
    Blob,Response,DecompressionStream,atob,btoa,Uint8Array,TextDecoder,TextEncoder,
    setTimeout,clearTimeout,location:{search:'',origin:'https://5amlim.github.io',
      href:'https://5amlim.github.io/Lab-Calculator/'+page},addEventListener(){},removeEventListener(){}};
  sandbox.window=sandbox;sandbox.parent=sandbox;
  const context=vm.createContext(sandbox);
  for(const src of scripts.slice(0,end)) {
    assert(!/^(?:https?:|\/\/)/i.test(src),'External script '+src);
    vm.runInContext(read(src),context,{filename:src,timeout:30000});
  }
  if(lab==='quest')await sandbox.QUEST_MISSING_DIRECTORY_READY;
  const source=read(app),hook='  init();';
  assert(source.includes(hook),'Expected calculator init hook');
  vm.runInContext(source.replace(hook,
    '  window.__audit={database,els,rankLibraryTest,specimenFilterCategories,transportContainerFilterCategories,transportBagInfo,catalogTemperatureFilterKey,matchesLibraryFilters,hasRoutineTat,tatBadge,expandedCollectionTests,buildTransportBagPlan,buildCollectionPlan,buildSubmissionContents,printCollectionSubmissionPlan,collectionSpecimenBadgesForItem,applyUserState,clinicalCategories: window.LabClinicalCategories};'),context,{filename:app,timeout:30000});
  await Promise.resolve(); await Promise.resolve();
  assert(sandbox.__audit, 'Calculator did not initialize audit hooks');
  return sandbox.__audit;
}

for(const [lab,page,app] of [
  ['quest','index.html','assets/js/app.js'],
  ['labcorp','labcorp.html','labcorp-app.js']
]) {
 test(lab+': live source catalog filter accessibility', {timeout:120000}, async () => {
   const audit=await loadCalculator(page,app,lab);
   const rows=audit.database.filter(t=>t.status==='active');
   const html=read(page);
   const options=(id)=>new Set([...(html.split('<select id="'+id+'"')[1]?.split('</select>')[0]||'')
     .matchAll(/<option[^>]*value="([^"]+)"/g)].map(m=>m[1]));
   const specimenOptions=options('specimenFilter');
   const transportOptions=options('transportContainerFilter');
   const tempOptions=options('temperatureFilter');
   const missing={code:[],specimen:[],transport:[],temperature:[],category:[]};
   const detail=[];
   const indexes=JSON.parse(read('assets/search/'+lab+'-tests.json')).tests;
   assert(rows.length>=indexes.length,lab+' active catalog smaller than published index');
   for(const row of rows){
     const code=String(row.testCode||'');
     if(!code||audit.rankLibraryTest(code,row)!==2000)missing.code.push(code);
     const specimens=audit.specimenFilterCategories(row);
     if(!specimens.some(c=>specimenOptions.has(c)))missing.specimen.push([code,row.specimenType,specimens]);
     const transport=audit.transportContainerFilterCategories(row);
     if(!transport.some(c=>transportOptions.has(c)))
       missing.transport.push([code,row.transportContainer,transport]);
     const temp=audit.catalogTemperatureFilterKey(row);
     if(!tempOptions.has(temp))missing.temperature.push([code,row.transportTemperature,temp]);
     else {
       audit.els.temperatureFilter.value = temp;
       if(!audit.matchesLibraryFilters(row))missing.temperature.push([code,row.transportTemperature,temp,'filter mismatch']);
       audit.els.temperatureFilter.value = '';
     }
     if(!sandboxCategory(row))missing.category.push(code);
     if(detail.length<5&&transport.includes('special'))detail.push(code);
   }
   function sandboxCategory(row) {
     const ids = audit.clinicalCategories.forTest(row);
     return ids.length > 0 && ids.every(id => audit.clinicalCategories.options.some(category => category.id === id));
   }
   console.log(lab+' full source audit '+JSON.stringify({
     activeRows:rows.length,indexCodes:indexes.length,
     failures:Object.fromEntries(Object.entries(missing).map(([k,v])=>[k,v.length])),
     examples:Object.fromEntries(Object.entries(missing).map(([k,v])=>[k,v.slice(0,12)])),
     specialtyExamples:detail
   }));
   // Verify every officially sourced addition is actually searchable, cart-ready and TAT-enabled
   // after all source overlays, blocked-code rules, and catalog normalization have run.
   if (lab === 'labcorp') {
     const reviewedCodes = '001875 008201 071538 115101 120 140 180232 183444 183469 183531 190256 372 373 480566 481020 489200 489590 591 631596 738534 808417 504965 504980 008136 008482 188243 086884 140046 140111 085506 086868 180026 186015 186031'.split(' ');
     const expandedCodes = '008003 008900 008904 008185 008565 008573 086876 180787 183476 310 325 336 480260 505805 511402 519020 123260 058099 201752 501533 806813 909231 209641 130021 212183 343818 087817 140551 284332 510390 819333 823304 180018 824009 809175 809638 284462 188284 031757 844219 910625 819217 822972 824153 830746 835240 007914 878678'.split(' ');
     const sourceTAT = new Set('008003 008900 008904 008185 008565 008573 086876 180787 183476 310 325 336 480260 505805 511402 519020 123260 201752 501533 806813 909231 087817 284332 819333 823304 824009 809175 809638 284462 910625 819217 822972 824153 830746 835240'.split(' '));
     assert.equal(expandedCodes.length,48,'New batch changed without review');
     for(const code of expandedCodes){
       const row=rows.find(test=>test.testCode===code);
       assert(row,'New code missing from actual live active catalog: '+code);
       assert.equal(audit.rankLibraryTest(code,row),2000,'New code not searchable: '+code);
       if(sourceTAT.has(code)){
         assert(audit.hasRoutineTat(row),'Official source TAT not loaded: '+code);
         assert(audit.tatBadge(row).includes('data-action="view-tat"'),'Official source TAT clock hidden: '+code);
       }
     }
     const complexCodes='117700 117853 164044 164049 140250 375002'.split(' ');
     for(const code of complexCodes){
       const row=rows.find(test=>test.testCode===code);
       assert(row,'Complex specimen order missing from live cart: '+code);
       assert.equal(audit.rankLibraryTest(code,row),2000,'Complex test not searchable: '+code);
       if(code!=='375002'){
         assert(audit.hasRoutineTat(row),'Complex order published TAT missing: '+code);
         assert(audit.tatBadge(row).includes('data-action="view-tat"'),'Complex order TAT clock hidden: '+code);
       }
     }
     for (const code of reviewedCodes) {
       const row = rows.find(test => test.testCode === code);
       assert(row, 'Verified Labcorp addition unavailable in cart: ' + code);
       assert(audit.hasRoutineTat(row), 'Published Labcorp TAT not loaded: ' + code);
       assert(audit.tatBadge(row).includes('data-action="view-tat"'), 'TAT clock not available: ' + code);
     }
   }
   assert.equal(missing.code.length,0,lab+' codes not searchable');
   assert.equal(missing.category.length,0,lab+' clinical categories incomplete');
   assert.equal(missing.specimen.length,0,lab+' specimen filters incomplete');
   assert.equal(missing.transport.length,0,lab+' transport filters incomplete: '+JSON.stringify(missing.transport.slice(0,10)));
   assert.equal(missing.temperature.length,0,lab+' temperature filters incomplete: '+JSON.stringify(missing.temperature.slice(0,10)));
 });
}


test('Labcorp applies exclusions to saved orders and prints specific non-blood specimen badges', async () => {
  const audit = await loadCalculator('labcorp.html', 'labcorp-app.js', 'labcorp');
  const record = code => audit.database.find(row => row.testCode === code);
  for (const code of ['009068', '009035', '510995', '511485', '510950', '199380']) {
    const blocked = record(code);
    assert.equal(blocked.status, 'blocked', code);
    const edited = { ...blocked, testName: 'Local saved copy', status: 'active', specimenType: 'Serum',
      drawContainer: 'SST / Gold', transportContainer: 'SST / Gold' };
    const restored = audit.applyUserState({
      overrides: [edited], customTests: [{ ...edited, id: 'custom-' + code }]
    });
    assert(restored.filter(test => test.testCode === code).every(test => test.status === 'blocked'), code);
  }
  assert.equal(record('002253').status, 'active', 'AFP serum marker is collectable');
  assert.equal(record('180787').status, 'active', 'non-tumor tissue culture is collectable');

  for (const [code, badge, filter] of [
    ['008219', 'Worm or Worm Segment', 'Parasite / Arthropod'],
    ['008631', 'Perianal Pinworm Specimen', 'Parasite / Arthropod'],
    ['188664', 'Arthropod', 'Parasite / Arthropod'],
    ['738574', 'Meconium', 'Meconium'],
    ['180910', 'Vaginal Swab', 'Swab'],
    ['815949', 'Tracheal Aspirate', 'Respiratory'],
    ['818779', 'Bronchoalveolar Lavage', 'Respiratory'],
    ['819325', 'Bronchoalveolar Lavage', 'Respiratory']
  ]) {
    const row = record(code);
    const plan = audit.buildCollectionPlan([row], audit.buildTransportBagPlan([row]));
    assert(audit.specimenFilterCategories(row).includes(filter), code);
    assert(plan.some(item => audit.collectionSpecimenBadgesForItem(item).some(value => value.label === badge)), code);
    assert(audit.printCollectionSubmissionPlan([row]).includes('>' + badge + '</span>'), code);
  }
  for (const code of ['815949', '818779', '819325']) {
    const row = record(code);
    assert.equal(row.drawContainer, 'Sterile cup', code);
    assert.equal(row.transportContainer, 'Sterile cup', code);
    assert(audit.transportContainerFilterCategories(row).includes('sterile-cup'), code);
    const [bag] = audit.buildTransportBagPlan([row]);
    assert(audit.buildSubmissionContents(bag).some(item => item.label === 'Sterile cup' && item.originalTube), code);
  }
  const split = record('790540');
  const routes = audit.expandedCollectionTests([split]);
  const bags = audit.buildTransportBagPlan(routes);
  const plan = audit.buildCollectionPlan(routes, bags);
  assert.deepEqual(Array.from(plan, item => item.count), [2]);
  assert.equal(audit.buildSubmissionContents(bags[0]).length, 2);
  assert(audit.buildSubmissionContents(bags[0]).every(item => item.sharedSplitSource));
});

test('Quest kidney profile labels urine on its separate source cup', async () => {
  const audit = await loadCalculator('index.html', 'assets/js/app.js', 'quest');
  const row = audit.database.find(test => test.testCode === '18365');
  assert(audit.specimenFilterCategories(row).includes('Urine'));
  const routes = audit.expandedCollectionTests([row]);
  const plan = audit.buildCollectionPlan(routes, audit.buildTransportBagPlan(routes));
  assert.deepEqual(Array.from(plan, item => item.label), ['Gold / SST', 'Sterile cup']);
  assert.equal(audit.collectionSpecimenBadgesForItem(plan[0]).length, 0);
  assert.equal(audit.collectionSpecimenBadgesForItem(plan[1])[0].label, 'Random urine');
});
