const fs=require('fs'),path=require('path'),vm=require('vm'),assert=require('assert');
function load(dir){
 const dummy={value:'',classList:{add(){},remove(){},toggle(){}},addEventListener(){},options:[]};
 const ctx=vm.createContext({window:{},document:{getElementById:()=>dummy,querySelectorAll:()=>[]},localStorage:{getItem(){return null},setItem(){},removeItem(){}},console,setTimeout,clearTimeout,Intl,Date,Map,Set,Object,Array,Math,Number,String,Boolean,RegExp,JSON});
 vm.runInContext(fs.readFileSync(path.join(dir,'data.js'),'utf8'),ctx);
 const app=fs.readFileSync(path.join(dir,'app.js'),'utf8').replace(/^  init\(\);/m,'  // skip init')
  .replace(/\}\)\(\);\s*$/,`  globalThis.__qa = {database,buildCollectionPlan,buildTransportBagPlan,buildSubmissionContents,printLabelingNotes,printSubmissionItemDetail,printSubmissionSourceBadges,normalizeSpecimenType,canonicalCollectionContainer};\n})();`);
 vm.runInContext(app,ctx);return ctx.__qa;
}
const old=load('/mnt/data/work1169'), newer=load(__dirname);
let pass=0;
const eq=(a,b,detail)=>{assert.deepStrictEqual(JSON.parse(JSON.stringify(a)),JSON.parse(JSON.stringify(b)),detail);pass++};
const test=(x,msg)=>{assert(x,msg);pass++};
const all=newer.database.filter(t=>t.status==='active');
const itemSig=(item)=>[item.key,item.label,item.count,item.detail,item.originalTube||false,item.tests.map(t=>t.testCode).sort().join(',')];
const testCode=(code)=>{const t=all.find(t=>t.testCode===String(code));test(!!t,'test code missing '+code);return t};
const build=(qa,tests)=>{const bs=qa.buildTransportBagPlan(tests);return {bs,collection:qa.buildCollectionPlan(tests,bs),subs:bs.flatMap(bag=>qa.buildSubmissionContents(bag))};};
for(const t of all){
 const prev=old.database.find(x=>x.id===t.id);
 if(!prev)continue;
 const a=build(old,[prev]),b=build(newer,[t]);
 eq(a.collection.map(itemSig),b.collection.map(itemSig),'collection '+t.testCode);
 eq(a.subs.map(itemSig),b.subs.map(itemSig),'submit '+t.testCode);
 for(let i=0;i<a.subs.length;i++)eq(old.printLabelingNotes(a.subs[i]),newer.printLabelingNotes(b.subs[i]),'label '+t.testCode);
}
const mixedCodes=[22,331,201,345,681,16796,899,809,335,310,7573,91729,94267].map(testCode);
const a=build(old,mixedCodes),b=build(newer,mixedCodes);
eq(a.collection.map(itemSig),b.collection.map(itemSig),'mixed collection');
eq(a.subs.map(itemSig),b.subs.map(itemSig),'mixed submit');
for(let i=0;i<a.subs.length;i++)eq(old.printLabelingNotes(a.subs[i]),newer.printLabelingNotes(b.subs[i]),'mixed labels');
const p=b.subs.find(item=>item.label.includes('Platelet-Poor Plasma'));
test(!!p,'PPP transport exists');
const display=newer.printSubmissionItemDetail(p);
test(/class="print-source-count">2<\/span>/.test(display),'source count pill 2');
test(/class="print-source-from">From<\/span><span>spun Light Blue Citrate/.test(display),'From spun source within pill');
test(/class="print-source-spun">· Spin/.test(display),'spin cue outside pill');
test(!/Platelet-Poor Plasma from spun Light Blue Citrate/i.test(display),'no redundant specimen prefix');
test(!/class="print-source-outside"/.test(display),'no source words outside pill');
const stool=b.subs.find(item=>/Total-Fix/i.test(item.label));
test(!!stool,'stool total fix exists');
test(/From<\/span><span>Sterile Cup/.test(newer.printSubmissionItemDetail(stool)),'stool source inside pill');
test(!/· Spin/.test(newer.printSubmissionItemDetail(stool)),'no stool spin');
const original=b.subs.find(item=>item.label==='Lavender EDTA' && item.originalTube);
test(!!original,'lavender original');
test(!/Whole Blood · Submit in original tube/i.test(newer.printSubmissionItemDetail(original)),'no redundant original');
console.log('PASS',pass,'directory + representative mixed-order checks; unchanged labels and counts');
