'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const read=p=>fs.readFileSync(path.resolve(__dirname,'..',p),'utf8');
const ordinary='008003 008900 008904 008185 008565 008573 086876 180787 183476 310 325 336 480260 505805 511402 519020 123260'.split(' ');
const cdos='058099 201752 501533 806813 909231 209641 130021 212183 343818 087817 140551 284332 510390 819333 823304 180018 824009 809175 809638 284462 188284 031757 844219 910625 819217 822972 824153 830746 835240 007914 878678'.split(' ');
const paths=['assets/js/labcorp/catalog/official-standard-additions-20261120.js','assets/js/labcorp/catalog/verified-cdos-supported-20261120.js'];
const official=new Map(JSON.parse(read('audits/labcorp-candidate-source-review-20261120.json')).records.map(r=>[r.code,r]));
const reviewed=new Map(JSON.parse(read('audits/labcorp-pending-cdos-source-review-20261120.json')).records.map(r=>[r.code,r]));
function apply(initial) {
 const window={SEED_TESTS:initial,LabDirectoryTat:{directory:{'000810':['Within 1 day',1,'Labcorp directory','','https://www.labcorp.com/tests/000810/vitamin-b12-and-folates']}}};
 for(const f of paths)vm.runInNewContext(read(f),{window},{filename:f,timeout:30000});
 return window;
}
test('48 independently source-reviewed Labcorp codes activate without overriding active or blocked records',()=>{
 const codes=[...ordinary,...cdos];
 assert.equal(codes.length,48);
 assert.equal(new Set(codes).size,48,'Duplicate expansion code');
 const initial=codes.map((testCode,i)=>({testCode,id:'original-'+i,status:'pending'}));
 const blocked={testCode:'92717',status:'blocked',testName:'Do not perform'};
 const active={testCode:'000810',status:'active',testName:'Existing active'};
 const {SEED_TESTS:rows,LabDirectoryTat:tat}=apply([...initial,blocked,active]);
 assert.equal(rows.length,50,'No new duplicate rows');
 assert.strictEqual(rows.find(r=>r.testCode==='92717'),blocked);
 assert.strictEqual(rows.find(r=>r.testCode==='000810'),active);
 assert.equal(tat.directory['000810'][0],'Within 1 day');
 const compulsory={};
 for(const [i,code] of codes.entries()){
  const row=rows.find(r=>r.testCode===code);
  assert(row,code+' missing after overlay');
  assert.equal(row.status,'active',code+' not available for cart');
  assert.equal(row.id,'original-'+i,code+' did not preserve stable source ID');
  assert(/^\d{3,6}$/.test(code),'Order code malformed: '+code);
  assert(row.testName && row.specimenType && row.drawContainer && row.transportContainer,code+' incomplete specimen');
  assert(['Room Temperature','Refrigerated','Frozen'].includes(row.transportTemperature),code+' missing shipment temperature');
  assert(['Yes','No'].includes(row.spin),code+' unknown centrifugation instruction');
  assert(!/streck|hair|nail|prepared slides?|acid preservation|futhan|trasylol/i.test(row.drawContainer+' '+row.transportContainer),code+' uses unsupported collection supplies');
  assert(!/verify official|not verified|do not collect/i.test(row.drawContainer+' '+row.transportContainer),code+' incomplete collection verification');
  const source=ordinary.includes(code)?official.get(code):reviewed.get(code);
  assert(source,code+' absent source review');
  assert.equal(row.source,source.url,code+' source URL mismatch');
  if(cdos.includes(code))assert.equal(source.hasExactCode,true,code+' CDOS test-code page not verified');
  for(const extra of row.additionalDrawRequirements||[]){
   assert(extra.container&&extra.transportContainer,code+' additional specimen missing collection/transport requirements');
   assert(extra.specimenType&&extra.transportTemperature,code+' additional specimen missing specimen/temperature');
   assert(Number(extra.count)>0,code+' additional specimen missing draw count');
  }
  const tatEntry=tat.directory[code];
  if(tatEntry){
   assert(tatEntry[0]&&Number.isFinite(tatEntry[1])&&tatEntry[1]>0,code+' invalid TAT range');
   assert.equal(tatEntry[4],source.url,code+' wrong official TAT source');
   compulsory[code]=true;
  }
 }
 for(const code of ordinary)assert(compulsory[code],code+' lost published Labcorp TAT');
 assert.equal(cdos.filter(code=>compulsory[code]).length,18,'Only 18 CDOS pages have confirmed routine TAT durations');
 assert.equal(Object.keys(compulsory).length,35,'Incorrect count of verified routine TAT updates');
 const sourceOnly=cdos.filter(code=>!compulsory[code]);
 assert.equal(sourceOnly.length,13,'Do not invent missing source TATs');
});
test('Source-specific required original tubes, paired specimens, aliquots, and restricted menu stay explicit',()=>{
 const {SEED_TESTS:rows}=apply([...ordinary,...cdos].map(testCode=>({testCode,status:'pending'})));
 const get=code=>rows.find(x=>x.testCode===code);
 assert.equal(get('058099').collectionCount,2,'Ionized calcium requires 2 SSTs');
 assert.equal(get('058099').submissionCount,2);
 assert.equal(get('806813').submissionCount,2,'17-ketosteroid aliquots not duplicated');
 assert.equal(get('844219').submissionCount,3,'2N-VWD requires 3 aliquot tubes');
 assert.equal(get('031757').specimenType,'Whole Blood','Whole blood should not be mislabeled plasma when unspun');
 assert(get('031757').additionalDrawRequirements.some(x=>/lavender/i.test(x.container)),'Missing EDTA platelet specimen');
 assert(get('505805').additionalDrawRequirements.some(x=>/lavender/i.test(x.container)),'Missing EDTA profile specimen');
 assert.equal(get('123260').collectionCount,2,'Alpha-1 deficiency requires two serum aliquots');
 assert(get('123260').additionalDrawRequirements.length,'Alpha-1 deficiency requires whole blood too');
 assert.equal(get('007914').drawContainer,'Red Top','Anticonvulsant gel barrier unacceptable');
 assert.equal(get('201752').specimenType,'24-hour Urine');
 assert.equal(get('180018').specimenType,'Skin Scraping','Unsupported hair and nail samples must not be enabled');
 assert.equal(get('824009').drawContainer,'Sterile cup');
 const html=read('labcorp.html');
 for(const f of paths){
  assert(html.includes('src="'+f+'?'),f+' missing from page');
  assert(html.indexOf('src="'+f+'?')<html.indexOf('src="labcorp-app.js?'),f+' loaded after app');
 }
 const restrictions=read('assets/js/market-restrictions.js');
 assert(restrictions.includes("'505805': { label: 'Unavailable in NY'"),'Restricted chronic urticaria profile missing NY badge');
});
