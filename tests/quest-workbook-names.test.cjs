const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.join(__dirname,'..');const read=p=>fs.readFileSync(path.join(root,p),'utf8');
test('Quest workbook mapping preserves shorthand aliases and verified names by exact code',()=>{
 const window={SEED_TESTS:[
 {id:'bmp',testCode:'10165',testName:'BMP',preferredVolume:'1 mL serum',status:'active'},
 {id:'cbc',testCode:'6399',testName:'CBC w/ diff'},
 {id:'pt',testCode:'4914',testName:'Prothrombin with INR and Partial Thromboplastin Times'},
 {id:'retired',testCode:'91001',testName:'Omega-3 and -6 Fatty Acids'},
 {id:'other',testCode:'999888',testName:'BMP'}
 ]};
 vm.runInNewContext(read('assets/js/quest-workbook-names.js'),{window});
 const [bmp,cbc,pt,retired,other]=window.SEED_TESTS;
 assert.equal(bmp.testName,'Basic Metabolic Panel');
 assert.equal(cbc.testName,'CBC (includes Differential and Platelets)');
 assert.equal(pt.testName,'Prothrombin with INR and Partial Thromboplastin Times');
 assert.equal(retired.testName,'Omega-3 and -6 Fatty Acids');
 assert.equal(other.testName,'BMP');
 assert.equal(bmp.preferredVolume,'1 mL serum');assert.equal(bmp.status,'active');
 assert(window.QUEST_WORKBOOK_SEARCH_ALIASES['10165'].includes('BMP'));
 assert(window.QUEST_WORKBOOK_SEARCH_ALIASES['6399'].includes('CBC w/ diff'));
 assert(!window.QUEST_WORKBOOK_SEARCH_ALIASES['999888'].includes('Basic Metabolic Panel'));
 const app=read('assets/js/app.js');
 assert.match(app,/QUEST_WORKBOOK_SEARCH_ALIASES/);
 assert.match(read('index.html'),/quest-workbook-names\.js\?v=1/);
 assert(read('index.html').indexOf('quest-workbook-names.js')<read('index.html').indexOf('assets/js/app.js'));
});
for(const [lab,script,html] of [['Quest','assets/js/app.js','index.html'],['LabCorp','labcorp-app.js','labcorp.html']]){
 test(lab+' STAT badge keeps green styling with red STAT text',()=>{
  const s=read(script),css=read('assets/css/experience.css');
  assert(s.includes('<span class="batch-choice-stat"><span class="batch-choice-stat-word">STAT</span> eligible</span>'));
  assert(css.includes('.batch-choice-stat .batch-choice-stat-word'));
  assert(css.includes('color: #a23d37;'));
  assert(css.includes('background: #e7f5ee'));
  assert(read(html).includes('experience.css?v=11.89'));
 });
}