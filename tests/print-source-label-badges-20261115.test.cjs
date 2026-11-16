'use strict';
const { test }=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8');

async function printHarness(lab) {
  const window={SEED_TESTS:[]};
  const sources=[
    'assets/js/quest-verified-fluid-chemistry-20261115.js',
    'assets/js/quest-feasible-specialty-20261115-batch2.js',
    'assets/js/quest-verified-expansion-20261115-batch5.js'
  ];
  for(const source of sources)vm.runInNewContext(read(source),{window},{filename:source});
  const document={
    getElementById:id=>({id,value:'',checked:false,options:[],
      classList:{add(){},remove(){},toggle(){}},
      addEventListener(){},setAttribute(){},querySelector(){return null;}}),
    querySelector(){return null;},querySelectorAll(){return [];},addEventListener(){}
  };
  const app=lab==='Quest'?'assets/js/app.js':'labcorp-app.js';
  const src=read(app);
  assert(src.includes('  init();'),lab+' app initialization marker changed');
  vm.runInNewContext(src.replace('  init();',
    '  window.__printLabelAudit={database,printLabelingNotes,printBagSpecimenBadge,buildTransportBagPlan,buildSubmissionContents,expandedCollectionTests};'),{
    window,document,localStorage:{getItem(){return null;},setItem(){},removeItem(){}},
    console:{warn(){},error(){}},setTimeout(){return 0;},clearTimeout(){}
  },{filename:app,timeout:30000});
  await Promise.resolve();
  await Promise.resolve();
  const api=window.__printLabelAudit;
  assert(api,lab+' calculator did not initialize print audit');
  const find=code=>{
    const item=api.database.find(t=>t.testCode===code);
    assert(item,'missing test '+code);
    return item;
  };
  const print=(codes,itemOptions={})=>api.printLabelingNotes({
    originalTube:true,className:'tube-urine-cup',label:'Sterile cup',
    tests:codes.map(find),...itemOptions
  });
  return {api,find,print};
}

for(const lab of ['Quest','Labcorp']){
  test(lab+': LABEL uses colored CSF and fluid source badges with date/time',async()=>{
    const {print}=await printHarness(lab);
    const cases=[
      [['17409','17420'],'CSF','csf'],
      [['17586','17589','17427','17592','17601'],'Pleural Fluid','fluid'],
      [['17605'],'Pericardial Fluid','fluid'],
      [['17411'],'Pericardial Fluid','fluid']
    ];
    for(const [codes,label,color] of cases) {
      const html=print(codes);
      assert.match(html,new RegExp('class="print-collect-chip-specimen specimen-'+color+'">'+label+'</span>'));
      assert.match(html,/and collection date and time/);
      assert.equal((html.match(/class="print-label-note"/g)||[]).length,1,'only one label row per specimen source');
      assert.equal((html.match(/class="print-collect-chip-specimen/g)||[]).length,1);
      for(const code of codes)assert(html.includes(code),'missing source test '+code);
      assert.doesNotMatch(html,/label (?:precise |exact )?specimen source/i);
      assert.doesNotMatch(html,/[\uE000\uE001]/,'internal source token escaped to print');
    }
  });

  test(lab+': mixed source labels remain separate, no false pooling',async()=>{
    const {print}=await printHarness(lab);
    const html=print(['17586','17409','17605']);
    assert.equal((html.match(/class="print-label-note"/g)||[]).length,3);
    for(const specimen of ['Pleural Fluid','CSF','Pericardial Fluid'])
      assert(html.includes('>'+specimen+'</span>'));
    assert.equal((html.match(/and collection date and time/g)||[]).length,3);
  });

  test(lab+': preserve specific instructions and do not reduce a swab site to a generic badge',async()=>{
    const {api,find}=await printHarness(lab);
    const specific={
      ...find('17409'),id:'specific-source-label',
      specialLabeling:'Label vial HIV RNA specimen and collection time'
    };
    const swab={
      ...find('17409'),id:'swab-source-label',specimenType:'Vaginal Swab',
      specialLabeling:'Label precise specimen source and collection date/time'
    };
    const custom=[specific,swab];
    const html=api.printLabelingNotes({tests:custom,originalTube:true,className:'tube-urine-cup',label:'Sterile cup'});
    assert.match(html,/Label vial HIV RNA specimen and collection time/);
    assert.match(html,/Label precise specimen source and collection date\/time/);
    assert.doesNotMatch(html,/>Swab<\/span> and collection date and time/);
  });
}

test('The existing printed specimen badge palette also styles inline label badges',()=>{
  const css=read('assets/css/styles.css');
  for(const source of ['fluid','csf','urine','stool']){
    assert(css.includes('.print-collect-chip-specimen.specimen-'+source),'missing '+source+' inline badge color');
  }
});
