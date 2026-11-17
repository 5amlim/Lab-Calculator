'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const read = file => fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
const fixtures = [
  { id: 'cary', specimenType: 'Stool', drawContainer: 'Sterile cup', transportContainer: 'Cary-Blair Stool Culture Transport Vial' },
  { id: 'totalfix', specimenType: 'Stool', drawContainer: 'Sterile cup', transportContainer: 'Total-Fix® Transport Vial' },
  { id: 'op', specimenType: 'Stool', drawContainer: 'Sterile cup', transportContainer: 'Pink Formalin O&P Vial + Gray PVA O&P Vial' },
  { id: 'qft', specimenType: 'Whole Blood', drawContainer: 'QuantiFERON TB1 Tube', transportContainer: 'QuantiFERON TB1 Tube (original tube)' },
  { id: 'green', specimenType: 'Whole Blood', drawContainer: 'Green Lithium Heparin', transportContainer: 'Green Top (Heparin) (original tube)' },
  { id: 'nmr', specimenType: 'Whole Blood', drawContainer: 'NMR LipoTube', transportContainer: 'NMR LipoTube (spun original tube)' },
  { id: 'csf', specimenType: 'CSF', drawContainer: 'Sterile cup', transportContainer: 'Sterile Screw-cap CSF Tube' },
  { id: 'both', specimenType: 'Serum', drawContainer: 'SST / Gold', transportContainer: 'Serum Transport Tube',
    additionalDrawRequirements: [{specimenType:'Stool', container:'Sterile cup',
      transportContainer:'Cary-Blair Stool Culture Transport Vial'}] }
].map(x => ({ testCode:x.id, testName:x.id, transportTemperature:'Room Temperature', status:'active', ...x }));

function transportOptions(html) {
  const begin = html.indexOf('<select id="transportContainerFilter"');
  assert(begin >= 0, 'Missing transport filter');
  const end = html.indexOf('</select>', begin);
  assert(end > begin, 'Unclosed transport filter');
  const section = html.slice(begin, end);
  return [...section.matchAll(/<option value="([^"]*)"([^>]*)>([^<]*)<\/option>/g)]
    .map(m => ({
      value: m[1], label: m[3], disabled:false, hidden:false,
      dataset: {containerGroup: m[2].match(/data-container-group="([^"]+)"/)?.[1]}
    }));
}

function loadedApp(pathToApp) {
  const win = {SEED_TESTS:fixtures, QUEST_MISSING_DIRECTORY_READY:Promise.resolve(0)};
  const elements = new Map();
  const makeElement = () => ({
    value:'', checked:false, options:[], dataset:{},
    classList:{add(){},remove(){},toggle(){},contains(){return false;}},
    addEventListener(){},setAttribute(){},querySelector(){return null;},
    appendChild(item){this.options.push(item);return item;}
  });
  const doc = {
    getElementById(id) { if(!elements.has(id)) elements.set(id,makeElement()); return elements.get(id); },
    querySelector(){return null;},querySelectorAll(){return [];},addEventListener(){},
    createElement(){return makeElement();}
  };
  const code = read(pathToApp);
  assert(code.includes('  init();'), 'Calculator startup changed');
  vm.runInNewContext(code.replace('  init();',
    '  window.__audit = {database,transportContainerFilterCategories,matchesLibraryFilters,filters:els};'),
    {window:win,document:doc,localStorage:{getItem(){return null;},setItem(){},removeItem(){}},
      setTimeout(){return 0;},clearTimeout(){},console:{warn(){},error(){}}},
    {filename:pathToApp,timeout:30000});
  return win;
}

for (const [name,htmlPath,appPath] of [
  ['Quest','index.html','assets/js/app.js'],['Labcorp','labcorp.html','labcorp-app.js']
]) {
  test(name + ' transport filter has complete, nonduplicated side-menu groups', () => {
    const html = read(htmlPath);
    const options = transportOptions(html);
    const parents = options.filter(o => o.value.startsWith('group-'));
    const children = options.filter(o => o.dataset.containerGroup);
    assert.equal(parents.length,7);
    assert.equal(new Set(options.map(o=>o.value)).size,options.length);
    for(const child of children)
      assert(parents.some(parent=>parent.value===child.dataset.containerGroup), child.value+' has no parent');
    for(const key of ['transport','serum','plasma','chilled-vial','clean-vial','qft','nmr',
      'cary-blair','stool','stool-formalin','stool-pva','stool-clean','salivette','sterile-cup'])
      assert(children.some(child=>child.value===key), key+' missing from nested menu');
    assert(!options.some(o=>o.value==='csf-vial'), 'CSF must use Sterile cup');
    assert(html.includes('portal-selects.js?v=11.96'));
  });

  test(name + ' broad group filters include children and additional specimens', async () => {
    const win = loadedApp(appPath);
    await Promise.resolve(); await Promise.resolve();
    const api=win.__audit, filters=api.filters;
    assert(api);
    filters.transportContainerFilter.options=transportOptions(read(htmlPath));
    const record=id=>api.database.find(t=>t.id===id);
    const cases=[
      ['cary','group-stool',true],['cary','group-transport-vials',false],
      ['totalfix','group-stool',true],['op','stool-formalin',true],['op','stool-pva',true],
      ['qft','group-blood',true],['qft','qft',true],['qft','blood-green',false],
      ['green','blood-green',true],['green','qft',false],
      ['nmr','group-blood',true],['nmr','nmr',true],
      ['csf','sterile-cup',true],['csf','group-urine',true],['csf','group-special',false],
      ['both','group-transport-vials',true],['both','group-stool',true]
    ];
    for(const [id,key,expected] of cases){
      filters.transportContainerFilter.value=key;
      assert.equal(api.matchesLibraryFilters(record(id)),expected,id+' / '+key);
    }
  });
}

test('Portal side menu reuses specimen navigation and colors both labs correctly', () => {
  const script=read('assets/js/portal-selects.js');
  const startup="  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',init);\n  else init();";
  assert(script.includes(startup));
  const win={matchMedia(){return {matches:false};}};
  const doc={body:{getAttribute(){return 'L';}}};
  vm.runInNewContext(script.replace(startup,
    '  window.__audit={nestedGroupForValue,childOptionsFor,transportFilterIcon};'),
    {window:win,document:doc}, {timeout:30000});
  const api=win.__audit;
  const item={select:{id:'transportContainerFilter',dataset:{},options:[
    {value:'group-blood',dataset:{}},
    {value:'qft',dataset:{containerGroup:'group-blood'},hidden:false,disabled:false},
    {value:'nmr',dataset:{containerGroup:'group-blood'},hidden:false,disabled:false}
  ]}};
  assert.equal(api.nestedGroupForValue(item,'qft'),'group-blood');
  assert.deepEqual(Array.from(api.childOptionsFor(item,'group-blood'),o=>o.value),['qft','nmr']);
  assert.equal(api.transportFilterIcon('qft'),api.transportFilterIcon('blood-green'));
  assert.equal(api.transportFilterIcon('nmr'),'tube-nmr-lipotube');
  const css=read('assets/css/experience.css');
  for(const cls of ['tube-op-formalin','tube-op-pva','tube-stool-clean','tube-nmr-lipotube'])
    assert(css.includes('.portal-select-icon.'+cls+'::before'),cls+' lacks shared color style');
});
