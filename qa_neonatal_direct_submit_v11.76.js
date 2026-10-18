const fs=require('fs'), path=require('path'), vm=require('vm'), assert=require('assert');
function load(dir){
 const dummy={value:'',classList:{add(){},remove(){},toggle(){}},addEventListener(){},options:[]};
 const ctx=vm.createContext({window:{},document:{getElementById:()=>dummy,querySelectorAll:()=>[]},localStorage:{getItem(){return null},setItem(){},removeItem(){}},console,setTimeout,clearTimeout,Intl,Date,Map,Set,Object,Array,Math,Number,String,Boolean,RegExp,JSON});
 vm.runInContext(fs.readFileSync(path.join(dir,'data.js'),'utf8'),ctx);
 const app=fs.readFileSync(path.join(dir,'app.js'),'utf8').replace(/^  init\(\);/m,'  // skip init').replace(/\}\)\(\);\s*$/,`  globalThis.__qa={database,buildCollectionPlan,buildTransportBagPlan,buildSubmissionContents,printLabelingNotes,printSubmissionItemDetail,printSubmissionSourceBadges,canonicalCollectionContainer,orderCategory,isOriginalContainerSubmission};\n})();`);
 vm.runInContext(app,ctx);return ctx.__qa;
}
const base=load('/mnt/data/work1175'), now=load(__dirname);
const special=new Set(['6631','20381','34162']); const active=now.database.filter(x=>x.status==='active');
let n=0; function ok(c,msg){assert(c,msg);n++;}function eq(a,b,msg){assert.deepStrictEqual(JSON.parse(JSON.stringify(a)),JSON.parse(JSON.stringify(b)),msg);n++;}
function get(code,qa=now){return qa.database.find(t=>t.status==='active'&&t.testCode===String(code))}
function run(qa,tests){const bags=qa.buildTransportBagPlan(tests); return {collection:qa.buildCollectionPlan(tests,bags),submit:bags.flatMap(b=>qa.buildSubmissionContents(b))};}
function sig(item){return {key:item.key,label:item.label,count:item.count,original:!!item.originalTube,codes:item.tests.map(t=>t.testCode).sort().join(',')}}
for(const t of active){const prev=get(t.testCode,base);if(!prev||special.has(t.testCode))continue;const a=run(base,[prev]), b=run(now,[t]);eq(a.collection.map(sig),b.collection.map(sig),'non-neonatal collection '+t.testCode);eq(a.submit.map(sig),b.submit.map(sig),'non-neonatal submission '+t.testCode);eq(a.submit.map(i=>base.printLabelingNotes(i)),b.submit.map(i=>now.printLabelingNotes(i)),'non-neonatal label '+t.testCode)}
for (const code of special){
 const t=get(code);const r=run(now,[t]);
 ok(t.drawContainer==='Amber Microtainer SST','micro source '+code);
 ok(t.transportContainer==='Amber Microtainer SST (spun)','original transport '+code);
 ok(now.isOriginalContainerSubmission(t),'original routing '+code);
 ok(r.collection.length===1 && r.collection[0].className==='tube-microtainer'&&r.collection[0].count===2,'2 microtainers collected '+code);
 ok(r.submit.length===1 && r.submit[0].className==='tube-microtainer'&&r.submit[0].count===2&&r.submit[0].originalTube,'2 microtainers submitted '+code);
 ok(now.orderCategory(t)===null,'no extra order of draw '+code);
 const detail=now.printSubmissionItemDetail(r.submit[0]);
 ok(detail.includes('Submit in original tube') && detail.includes('Spin ✓') && detail.includes('Protect from light'),'print original and protect from light '+code);
 ok(!detail.includes('print-source-transfer-arrow'),'no transfer arrow '+code);
 ok(!now.printLabelingNotes(r.submit[0]).includes('LABEL Serum'),'original Microtainer has no redundant serum label '+code);
}
const mixed=run(now,['6631','20381','34162','899','201'].map(x=>get(x)));
ok(mixed.collection.find(i=>i.className==='tube-microtainer').count===6,'six separate micro source tubes');
ok(mixed.collection.find(i=>i.className==='tube-sst').count===1,'regular SST separate');
ok(mixed.submit.find(i=>i.className==='tube-microtainer').count===6,'six original microtainers submitted');
ok(mixed.submit.find(i=>i.className==='tube-microtainer').tests.length===3,'all three neonatal tests included');
ok(!mixed.submit.some(i=>i.label.includes('Amber Serum')),'no unnecessary amber aliquots');
const source=run(now,[get('285'),get('22'),get('899')]).submit.flatMap(i=>[now.printSubmissionItemDetail(i)]).join(' ');
ok(source.includes('print-source-origin') && source.includes('print-source-from'),'spacing markup preserved');
console.log('PASS',n,'non-neonatal parity + microtainer direct submission + mixed-order + pill spacing checks');
console.log('Mixed example:',JSON.stringify(mixed.submit.map(sig)));
