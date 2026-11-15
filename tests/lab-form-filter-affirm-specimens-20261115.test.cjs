'use strict';
const assert = require('node:assert/strict');
const {test} = require('node:test');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const read = file => fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
const AFFIRM = 'BD Affirm VPIII ATTS swab transport kit';
const pages = [['Quest','index.html','assets/js/app.js'],['Labcorp','labcorp.html','labcorp-app.js']];

function selectMarkup(html, id) {
  const start = html.indexOf('<select id="' + id + '"');
  assert(start >= 0,'missing dropdown '+id);
  const end = html.indexOf('</select>',start);
  assert(end > start,'unterminated dropdown '+id);
  return html.slice(start,end);
}

function loadedApp(appPath) {
  const window={SEED_TESTS:[
    {id:'affirm',testCode:'14577',testName:'Affirm VPIII',status:'active',
     specimenType:'Vaginal Swab',drawContainer:AFFIRM,transportContainer:AFFIRM,transportTemperature:'Room Temperature'},
    {id:'amies',testCode:'swab-1',testName:'ESwab',status:'active',
     specimenType:'Throat Swab',drawContainer:'ESwab (Amies)',transportContainer:'ESwab (Amies)',transportTemperature:'Room Temperature'},
    {id:'fluid',testCode:'fluid-1',testName:'Pleural Fluid',status:'active',
     specimenType:'Pleural Fluid',drawContainer:'Sterile cup',transportContainer:'Sterile cup',transportTemperature:'Frozen'},
    {id:'paired',testCode:'paired-1',testName:'Paired',status:'active',
     specimenType:'Serum',drawContainer:'SST / Gold',transportContainer:'Serum Transport Tube',
     transportTemperature:'Refrigerated',additionalDrawRequirements:[{
       container:AFFIRM,specimenType:'Vaginal Swab',transportContainer:AFFIRM,transportTemperature:'Room Temperature'}]}
  ]};
  const elements=new Map();
  const makeElement = () => ({
    value:'',checked:false,options:[],dataset:{},
    classList:{add(){},remove(){},toggle(){},contains(){return false;}},
    addEventListener(){},setAttribute(){},querySelector(){return null;},
    appendChild(child){this.options.push(child);return child;}
  });
  const document={
    getElementById(id){if(!elements.has(id))elements.set(id,makeElement());return elements.get(id);},
    querySelector(){return null;},querySelectorAll(){return [];},addEventListener(){},
    createElement(){return makeElement();}
  };
  const src=read(appPath);
  assert(src.includes('  init();'));
  vm.runInNewContext(src.replace('  init();',
    '  window.__test = { database, specimenFilterCategories, transportContainerFilterCategories, '+
    'setSelectValue, specimenSelect:els.specimenType, matchesLibraryFilters, filters:els };'),
    {window,document,localStorage:{getItem(){return null;},setItem(){},removeItem(){}},
     setTimeout(){return 0;},clearTimeout(){},
     console:{warn(){},error(){}}},
    {filename:appPath,timeout:30000});
  return window;
}

for (const [name,page,app] of pages) {
 test(name+' add form offers actual Affirm/Amies draw and submission kits exactly once',()=>{
   const html=read(page);
   for(const id of ['drawContainer','transportContainer']){
     const markup=selectMarkup(html,id);
     assert.equal(markup.split('>'+AFFIRM+'</option>').length-1,1,id+': Affirm duplicated or absent');
     assert.equal(markup.split('>ESwab (Amies)</option>').length-1,1,id+': ESwab duplicated or absent');
   }
   const specimen=selectMarkup(html,'specimenType');
   for(const label of ['Vaginal Swab','Vaginal-Rectal Swab','CSF','Pleural Fluid',
     'Peritoneal Fluid','Pericardial Fluid','Synovial Fluid','Sputum','Platelet-poor plasma'])
     assert(specimen.includes('>'+label+'</option>'),label+' missing');
   assert(selectMarkup(html,'transportContainerFilter').includes('<option value="affirm">'));
   assert(selectMarkup(html,'transportContainerFilter').includes('<option value="amies">'));
   assert(selectMarkup(html,'specimenFilter').includes('<option value="Vaginal Swab">'));
   assert(selectMarkup(html,'specimenFilter').includes('<option value="CSF">'));
   assert(selectMarkup(html,'specimenFilter').includes('<option value="Body Fluid">'));
   assert(selectMarkup(html,'transportContainer').includes('>Submit in original container (no transfer)</option>'));
 });
 test(name+' filters distinguish dedicated kits and specific specimen sources',async()=>{
   const w=loadedApp(app);
   await Promise.resolve();
   const h=w.__test;
   assert(h);
   const tests=Object.fromEntries(h.database.filter(x=>['affirm','amies','fluid','paired'].includes(x.id))
     .map(x=>[x.id,x]));
   for(const id of ['affirm','amies','fluid','paired']) assert(tests[id],id+' missing');
   assert(h.specimenFilterCategories(tests.affirm).includes('Swab'));
   assert(h.specimenFilterCategories(tests.affirm).includes('Vaginal Swab'));
   assert(!h.specimenFilterCategories(tests.affirm).includes('Body Fluid'));
   assert(h.transportContainerFilterCategories(tests.affirm).includes('affirm'));
   assert(!h.transportContainerFilterCategories(tests.affirm).includes('amies'));
   assert(h.transportContainerFilterCategories(tests.amies).includes('amies'));
   assert(h.specimenFilterCategories(tests.fluid).includes('Pleural Fluid'));
   assert(h.specimenFilterCategories(tests.fluid).includes('Body Fluid'));
   assert(h.transportContainerFilterCategories(tests.fluid).includes('sterile-cup'));
   const specimens=h.specimenFilterCategories(tests.paired);
   const containers=h.transportContainerFilterCategories(tests.paired);
   assert(specimens.includes('Blood')&&specimens.includes('Vaginal Swab'));
   assert(containers.includes('serum')&&containers.includes('affirm'));
 });
 test(name+' live filter values find Affirm, Pleural Fluid and second required specimens',async()=>{
   const w=loadedApp(app);await Promise.resolve();const h=w.__test;
   const byCode=Object.fromEntries(h.database.filter(t=>['a','b','c','d'].includes(t.id))
     .map(t=>[t.id,t]));
   // Native dropdowns remain the source of truth for the portal menu.
   h.filters.specimenFilter.value='Vaginal Swab';
   h.filters.transportContainerFilter.value='affirm';
   assert(h.matchesLibraryFilters(byCode.a),'Affirm was hidden by its dedicated filter');
   assert(h.matchesLibraryFilters(byCode.c),'a secondary required Affirm specimen was omitted');
   assert.equal(h.matchesLibraryFilters(byCode.b),false);
   h.filters.specimenFilter.value='Pleural Fluid';
   h.filters.transportContainerFilter.value='sterile-cup';
   assert(h.matchesLibraryFilters(byCode.b),'pleural fluid was missing under sterile cup');
   assert.equal(h.matchesLibraryFilters(byCode.a),false);
   h.filters.specimenFilter.value='Swab';
   h.filters.transportContainerFilter.value='amies';
   assert(h.matchesLibraryFilters(byCode.d),'Amies swab was not searchable by both filters');
 });
 test(name+' edits preserve uncommon exact specimen names instead of Other / Verify',async()=>{
   const w=loadedApp(app);await Promise.resolve();
   const h=w.__test;
   const el=h.specimenSelect;
   el.options=[{value:'Serum'},{value:'Other / Verify'}];
   h.setSelectValue(el,'Cervical Cytology Fluid','Other / Verify');
   assert.equal(el.value,'Cervical Cytology Fluid');
   assert(el.options.some(o=>o.value==='Cervical Cytology Fluid'));
 });
}

test('Frozen transport filtering respects Quest vs Labcorp badge conventions',async()=>{
 const qw=loadedApp('assets/js/app.js'),lw=loadedApp('labcorp-app.js');
 await Promise.all([Promise.resolve(),Promise.resolve()]);
 const sample={id:'frozen',testCode:'f',testName:'Serum frozen',status:'active',
   specimenType:'Serum',drawContainer:'SST / Gold',
   transportContainer:'Frozen Transport Tube',transportTemperature:'Frozen'};
 assert(qw.__test.transportContainerFilterCategories(sample).includes('transport'));
 assert(!qw.__test.transportContainerFilterCategories(sample).includes('frozen-transport'));
 const labCategories=lw.__test.transportContainerFilterCategories({...sample,
   transportContainer:'Frozen Transport Tube (Purple Cap)'});
 assert(labCategories.includes('frozen-transport'));
});

test('Quest and Labcorp filters retain generic swab and original sterile-cup pathways',async()=>{
 for(const app of ['assets/js/app.js','labcorp-app.js']){
   const w=loadedApp(app);await Promise.resolve();const h=w.__test;
   assert(h.specimenFilterCategories({specimenType:'Throat Swab'}).includes('Swab'));
   assert(h.specimenFilterCategories({specimenType:'CSF'}).includes('CSF'));
   assert(h.specimenFilterCategories({specimenType:'Stool'}).includes('Stool'));
   assert(h.specimenFilterCategories({specimenType:'RBCs'}).includes('Blood'));
   assert(h.transportContainerFilterCategories({
     specimenType:'Urine',drawContainer:'Sterile cup',transportContainer:'Sterile cup'})
     .includes('sterile-cup'));
 }
});

test('Portal menu displays original container wording while preserving legacy saved values',()=>{
 const code=read('assets/js/portal-selects.js');
 assert.match(code,/option\.value === 'Submit in original tube'/);
 assert.match(code,/isSstSource\(item\) \? 'Spun SST \/ Original tube' : 'Submit in original container'/);
 assert.match(code,/tube-eswab/);
});
