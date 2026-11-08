const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.join(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');

function start(app, scripts) {
  const context = vm.createContext({window:{SEED_TESTS:[]},
    document:{getElementById:()=>null,querySelectorAll:()=>[]},
    localStorage:{getItem:()=>null,setItem:()=>{},removeItem:()=>{}}, console});
  for(const file of scripts) vm.runInContext(read(file),context,{filename:file});
  vm.runInContext(read(app).replace('  init();',
    '  window.testApi={normalizeRecord,buildTransportBagPlan,buildCollectionPlan,buildSubmissionContents};'),
    context,{filename:app});
  return {records:context.window.SEED_TESTS,api:context.window.testApi};
}
function inspect(runtime,code) {
  const original=runtime.records.find(t=>t.testCode===code);
  assert(original,code+' must exist');
  const {api}=runtime,record=api.normalizeRecord(original);
  const bags=api.buildTransportBagPlan([record]);
  return {collect:api.buildCollectionPlan([record],bags),
    ship:bags.flatMap(b=>api.buildSubmissionContents(b))};
}
function check(runtime,code,from,to,collectionLabel='') {
  const result=inspect(runtime,code);
  const source=result.collect.filter(x=>/tube-(?:blue|green|lavender)/.test(x.className||''));
  assert.equal(source.reduce((n,x)=>n+x.count,0),from,code+' source tubes');
  assert.equal(result.ship.reduce((n,x)=>n+x.count,0),to,code+' submission tubes');
  if(collectionLabel)assert(source.some(x=>x.label.includes(collectionLabel)),code+' special source tube label');
}
const quest=start('assets/js/app.js',['assets/js/data.js']);
for(const [code,draw,ship,label] of [
  ['19790',4,4],['15540',4,4],['33743',5,5],['16983',5,1],
  ['22',1,1],['10098',2,1],
  ['90842',1,1],['90843',1,1],['400',1,1],['91691',3,1],
  ['91692',1,1],['19672',6,6],['90923',5,5],['216',1,1],
  ['36970',1,1,'no gel, 6 mL'],['37737',1,1,'Greiner 9 mL'],
  ['38287',2,2,'5 mL'],['7197',1,1,'5 mL']
]) check(quest,code,draw,ship,label);
const labcorp=start('labcorp-app.js',[
  'labcorp-data.js',
  'assets/js/labcorp/catalog/workbook-additions-specialty.js',
  'assets/js/labcorp/catalog/infectious-and-immunity.js',
  'assets/js/labcorp/catalog/verified-expansions-a-e.js',
  'assets/js/labcorp/catalog/workbook-additions-core.js',
  'assets/js/labcorp/catalog/specialty-chemistry-and-hormones.js'
]);
for(const [code,draw,ship] of [['511238',1,1],['511154',1,1],
  ['001917',2,2],['120089',3,1],['225250',2,2],['038901',7,7],
  ['001610',1,1],['020321',1,1],['550655',3,2],
  ['706994',1,1],['117892',1,1],['550880',1,1],['550420',1,1]])
  check(labcorp,code,draw,ship);
console.log('PASS: minimum-volume reversion, explicit source tubes, and submission counts');
