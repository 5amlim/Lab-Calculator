'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const expected={8477:1,19833:1,484:1,1430:2,19834:2,16292:4,35181:2,23475:3,18927:3,6745:4};
async function getCalculator(){
  const window={addEventListener() {},SEED_TESTS:[]};
  new Function('window',read('assets/js/quest-gray-plasma-processing-20261114.js'))(window);
  const localStorage={getItem:()=>null,setItem(){},removeItem(){}};
  const document={
    getElementById:id=>({id,value:'',checked:false,options:[],classList:{add(){},remove(){},toggle(){}},addEventListener(){},setAttribute(){},querySelector(){return null;}}),
    querySelector:()=>null,querySelectorAll:()=>[],addEventListener(){}
  };
  const app=read('assets/js/app.js');
  const patch='  init();\n  };';
  assert.ok(app.includes(patch),'calculator app contains expected initialization boundary');
  const instrumented=app.replace(patch,
    '  window.__QUEST_PLAN_TEST__={database,expandedCollectionTests,buildTransportBagPlan,buildCollectionPlan,buildSubmissionContents};\n  };');
  new Function('window','document','localStorage','console','setTimeout','clearTimeout',instrumented)(
    window,document,localStorage,{warn(){},error(){throw Error('App startup error');}},()=>0,()=>{}
  );
  await new Promise(setImmediate);
  assert.ok(window.__QUEST_PLAN_TEST__,'calculator initialized in isolated test environment');
  return window.__QUEST_PLAN_TEST__;
}
function plan(h,tests) {
  const sources=h.expandedCollectionTests(tests);
  const bags=h.buildTransportBagPlan(sources);
  const collects=h.buildCollectionPlan(sources,bags);
  const submits=bags.flatMap(bag=>h.buildSubmissionContents(bag));
  return {sources,collects,submits,
    collectionCount:collects.reduce((sum,item)=>sum+item.count,0),
    submissionCount:submits.reduce((sum,item)=>sum+item.count,0)};
}
test('For all ten verified gray-top glucose assays, planner outputs the correct number of original gray tubes and transferred plastic vials',async()=>{
  const h=await getCalculator();
  for(const [code,count] of Object.entries(expected)){
    const item=h.database.find(t=>t.testCode===code);
    assert.ok(item,code);
    const p=plan(h,[item]);
    assert.equal(p.sources.length,count,'expanded timed draws '+code);
    assert.equal(p.collectionCount,count,'collect count '+code);
    assert.equal(p.submissionCount,count,'submit count '+code);
    assert.equal(p.submits.length,count,'one distinct vial per timed draw '+code);
    assert.ok(p.sources.every(x=>x.spin==='Yes'),'every timepoint must spin '+code);
    assert.ok(p.submits.every(x=>x.label==='Plastic Plasma Transport Vial (Additive-Free)'),'correct additiveless vial '+code);
    assert.equal(new Set(p.submits.map(x=>x.key)).size,count,'no vial sharing '+code);
  }
});
test('Ten mixed protocols do not accidentally pool timepoints or transport vials',async()=>{
  const h=await getCalculator();
  const chosen=Object.keys(expected).map(code=>h.database.find(t=>t.testCode===code));
  const p=plan(h,chosen);
  const total=Object.values(expected).reduce((a,b)=>a+b,0);
  assert.equal(total,23);
  assert.equal(p.collectionCount,total);
  assert.equal(p.submissionCount,total);
  assert.equal(p.submits.length,total);
  assert.equal(new Set(p.submits.map(x=>x.key)).size,total);
});
