const fs=require('fs'),vm=require('vm'),assert=require('assert');
const fake={value:'',classList:{add(){},remove(){},toggle(){}},addEventListener(){},options:[],setAttribute(){},textContent:''};
const data=fs.readFileSync('data.js','utf8');
const src=fs.readFileSync('app.js','utf8')
 .replace(/^  init\(\);/m,'  // no DOM initialization in regression harness')
 .replace(/\}\)\(\);\s*$/,
 `  window.__qa = { database, STAT_AREAS, renderStatMenu, handleStatMenuClick,\n    buildTransportBagPlan, buildSubmissionContents, buildCollectionPlan,\n    expandedCollectionTests, isOriginalContainerSubmission, sstCollectionEstimateForTests,\n    selectedTests, splitSubmissionContainers, requiresDedicatedSst };\n})();`);
const ctx={window:{confirm:()=>true},document:{getElementById:()=>fake,querySelectorAll:()=>[]},localStorage:{getItem:()=>null,setItem(){},removeItem(){}},console,Date,Intl,setTimeout,clearTimeout};
vm.createContext(ctx);vm.runInContext(data,ctx);vm.runInContext(src,ctx);
const qa=ctx.window.__qa;
const db=qa.database;
const newcodes=['250','444','890','5406','310','8013','8477','17667','37015','10553','38226'];
const unverified=['784','59118','70117'];
const allmenu=new Set(Object.values(qa.STAT_AREAS).flatMap(v=>v.codes));
for(const code of newcodes) {
 const match=db.filter(t=>t.testCode===code);
 assert.equal(match.length,1,'one record for '+code);
 const test=match[0];assert.equal(test.status,'active',code);
 assert(allmenu.has(code),'listed in supplied STAT menu '+code);
 const b=qa.buildTransportBagPlan(qa.expandedCollectionTests([test]));
 const collection=qa.buildCollectionPlan(qa.expandedCollectionTests([test]),b);
 assert(b.length>0&&collection.length>0,'collection plan generated '+code);
 for(const bag of b){assert(qa.buildSubmissionContents(bag).length,'submission plan for '+code);}
}
for(const code of unverified) assert.equal(db.filter(t=>t.testCode===code).length,0,'unverified remains unavailable '+code);
for(const code of ['250','444','890','5406']){
 const test=db.find(t=>t.testCode===code);
 assert.equal(test.collectionCount,2,code+' two independent blood collections');
 assert.equal(test.submissionCount,2,code+' two serum transports');
 const bags=qa.buildTransportBagPlan([test]);
 const contents=bags.flatMap(b=>qa.buildSubmissionContents(b));
 assert(contents.some(c=>c.count>=2),'peak and trough not pooled together '+code);
 const coll=qa.buildCollectionPlan([test],bags);
 console.log('Peak/trough',code, coll.map(x=>[x.label,x.count]),contents.map(x=>[x.label,x.count]));
}
const co2=db.find(t=>t.testCode==='310');
assert(qa.requiresDedicatedSst(co2),'CO2 must have dedicated full unopened SST');
const cmp=db.find(t=>t.testCode==='37015');assert(qa.isOriginalContainerSubmission(cmp),'CMP reflex spun SST original');
const ur=db.find(t=>t.testCode==='17667');assert(qa.splitSubmissionContainers(ur).length===2,'UA reflex two transport tubes');
console.log('PASS all 11 new records + missing-list safety + peak/trough + carbon dioxide + UA reflex');
