const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const read = file => fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
const suites = [
  {name:'Quest', app:'assets/js/app.js', data:['assets/js/data.js'],
    single:'5463', reflex:'17667', otherReflex:'3020'},
  {name:'LabCorp', app:'labcorp-app.js',
    data:['labcorp-data.js','labcorp-urgent-pcp-data.js'],
    single:'003772', reflex:'377036', culture:'008847'}
];

for (const suite of suites) {
  const context = vm.createContext({
    window:{SEED_TESTS:[]},
    document:{getElementById:()=>null,querySelectorAll:()=>[]},
    localStorage:{getItem:()=>null,setItem:()=>{},removeItem:()=>{}},
    console
  });
  for (const data of suite.data) vm.runInContext(read(data),context,{filename:data});
  const src = read(suite.app);
  const injected = src.replace('  init();',
    '  window.testApi={normalizeRecord,buildTransportBagPlan,buildSubmissionContents,'+
    'groupSubmissionContainersForPrint,printCollectionSubmissionPlan,'+
    'printContainerPresentationKey,splitSubmissionContainers};');
  assert.notEqual(src,injected,'test injection required for '+suite.name);
  vm.runInContext(injected,context,{filename:suite.app});
  const api=context.window.testApi;
  const get=code=>{
    const found=context.window.SEED_TESTS.find(test=>String(test.testCode)===code);
    assert(found,suite.name+': missing catalog entry '+code);
    return api.normalizeRecord(found);
  };
  const contents=tests=>api.buildTransportBagPlan(tests).flatMap(bag=>api.buildSubmissionContents(bag));
  const count=items=>items.reduce((sum,item)=>sum+item.count,0);
  const group=items=>api.groupSubmissionContainersForPrint(items);
  const base=[get(suite.single),get(suite.reflex)];
  const original=contents(base);
  const grouped=group(original);
  const ua=grouped.filter(item=>item.className==='tube-ua-swirl');
  assert.equal(ua.length,1,suite.name+': equivalent UA containers should have one print card');
  assert.equal(ua[0].count,2,suite.name+': one tube per test, total two');
  assert.deepEqual(Array.from(ua[0].tests,test=>String(test.testCode)),
    [suite.single,suite.reflex],suite.name+': retain both test references');
  assert.match(ua[0].printAllocationNote,/Separate containers:/);
  assert(ua[0].printAllocationNote.includes('1 for '+suite.single));
  assert(ua[0].printAllocationNote.includes('1 for '+suite.reflex));
  assert.equal(count(grouped),count(original),suite.name+': never change physical bag count');

  const printed=api.printCollectionSubmissionPlan(base);
  assert(printed.includes('Separate containers: 1 for '+suite.single+
    ' · 1 for '+suite.reflex),suite.name+': printed per-test tube allocation');
  assert(printed.includes('<small>'+suite.single+'</small>'),
    suite.name+': independently labeled standard UA tube');
  assert(printed.includes('<small>'+suite.reflex+'</small>'),
    suite.name+': independently labeled reflex UA tube');

  const reflexOnly=contents([get(suite.reflex)]);
  assert.equal(reflexOnly.length,2,suite.name+': two different reflex containers retained');
  assert.equal(count(reflexOnly),2);
  assert.equal(count(group(reflexOnly)),2);

  if (suite.name==='Quest') {
    const cyanide=get('400');
    const mixed=[cyanide,...base];
    const all=contents(mixed);
    assert.equal(count(all),4,'Quest: cyanide + UA + reflex = four actual containers');
    const visible=group(all);
    assert.equal(visible.length,3,'Quest: green, combined UA, gray culture');
    assert.equal(count(visible),4);
    assert.equal(visible.filter(x=>x.className==='tube-ua-swirl')[0].count,2);
    assert.equal(visible.filter(x=>x.className==='tube-urine-culture').length,1);
    const twoReflex=group(contents([get(suite.otherReflex),get(suite.reflex)]));
    assert.equal(count(twoReflex),4,'Distinct reflex orders retain their own two tubes');
    assert.equal(twoReflex.filter(x=>x.className==='tube-ua-swirl')[0].count,2);
    assert.equal(twoReflex.filter(x=>x.className==='tube-urine-culture')[0].count,2);
  } else {
    const all=contents([get(suite.single),get(suite.reflex),get(suite.culture)]);
    const visible=group(all);
    assert.equal(count(visible),4,'LabCorp: two UA and two culture tubes');
    assert.equal(visible.length,2,'LabCorp: equivalent UA and culture aliases group for printing');
    assert.equal(visible.filter(x=>x.className==='tube-ua-swirl')[0].count,2);
    assert.equal(visible.filter(x=>x.className==='tube-urine-culture')[0].count,2);
    const basic=contents([get(suite.single),get(suite.culture)]);
    assert.equal(count(group(basic)),2,'LabCorp: basic UA plus culture is two containers');
  }

  // Never consolidate across temperature or routine/STAT bags.
  const stat={...get(suite.single),isStat:true};
  const routine=get(suite.reflex);
  const statBags=api.buildTransportBagPlan([stat,routine]);
  assert.equal(statBags.length,2,suite.name+': STAT and routine remain separate bags');
  for(const bag of statBags)assert.equal(count(group(api.buildSubmissionContents(bag))),
    count(api.buildSubmissionContents(bag)),suite.name+': per-bag totals remain stable');

  // Synthetic counterexamples: different source sites and dedicated aliquots
  // must never become a single display entry.
  const mk=(code,name,specimen,container)=>api.normalizeRecord({
    id:'print-group-'+code,testCode:code,testName:name,specimenType:specimen,
    drawContainer:container,transportContainer:container,
    transportTemperature:'Room Temperature',spin:'No',
    preferredVolume:'1 mL',minimumVolume:'0.5 mL'
  });
  const throat=mk('99101','Throat swab','Swab','Aptima Multitest Transport Tube (orange label)');
  const vaginal=mk('99102','Vaginal swab','Swab','Aptima Multitest Transport Tube (orange label)');
  const twoSwabs=contents([throat,vaginal]);
  assert.equal(group(twoSwabs).length,twoSwabs.length,
    suite.name+': distinct collection sites are not interchangeable');
  const material=mk('99103','Plasma assay','Plasma','Plastic Plasma Transport Tube');
  const dedicated=[
    {key:'transport|plasma|dedicated-99103',label:'Plasma Transport Tube',
      className:'tube-transport',count:1,detail:'Plasma',tests:[material]},
    {key:'transport|plasma|dedicated-99104',label:'Plasma Transport Tube',
      className:'tube-transport',count:1,detail:'Plasma',tests:[{...material,id:'99104',testCode:'99104'}]}
  ];
  assert.equal(group(dedicated).length,2,
    suite.name+': dedicated aliquots remain separately identified');
}
console.log('PASS: Quest/LabCorp print grouping preserves counts, codes, labels, sites, STAT and dedicated allocations');
