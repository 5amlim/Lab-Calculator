const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.join(__dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const context={window:{}};
vm.runInNewContext(read('assets/js/clinical-categories.js'),context);
const categories=context.window.LabClinicalCategories;
for(const [lab,script,html] of [['Quest','assets/js/app.js','index.html'],['LabCorp','labcorp-app.js','labcorp.html']]){
  test(lab+' Add Tests supports clinical category browsing without auto-add',()=>{
    const source=read(script);
    const entry=source.indexOf('  function findCategoryMatches(query) {');
    const end=source.indexOf('  function isExactBatchMatch(',entry);
    assert(entry>=0&&end>entry);
    const database=[
      {id:'1',testCode:'101',testName:'Chlamydia trachomatis NAA'},
      {id:'2',testCode:'102',testName:'HIV 1/2 Ag Ab'},
      {id:'3',testCode:'103',testName:'CBC with Differential'},
      {id:'4',testCode:'104',testName:'Gonorrhea NAAT',status:'blocked'}
    ];
    const rankLibraryTest=(q,t)=>t.testName.toLowerCase().includes(q.toLowerCase())?500:0;
    const finder=vm.runInNewContext(source.slice(entry,end)+';findCategoryMatches',{window:{LabClinicalCategories:categories},database,rankLibraryTest});
    const sti=finder('sti');
    assert(sti&&sti.results.length===2,'STI returns two unblocked tests');
    assert(sti.results.every(t=>categories.forTest(t).includes('sti')));
    assert.equal(finder('sti chlamydia').results.length,1);
    assert.equal(finder('hematology').results.length,1);
    assert.equal(finder('notacategory'),null);
    const rStart=source.indexOf('  function renderBatchCategoryRow(row) {');
    const rEnd=source.indexOf('  function specimenFilterCategory(',rStart);
    assert(rStart>=0&&rEnd>rStart);
    const render=vm.runInNewContext(source.slice(rStart,rEnd)+';renderBatchCategoryRow',{
      selectedIds:['2'],escapeHtml:String,escapeAttr:String,
      displayCode:t=>t.testCode,isStatEligible:t=>t.id==='1'
    });
    const rendered=render({index:0,query:'sti',category:sti,visibleCount:20});
    assert.match(rendered,/Clinical category/);
    assert.match(rendered,/Chlamydia trachomatis/);
    assert.match(rendered,/HIV 1\/2/);
    assert.match(rendered,/STAT eligible/);
    assert.match(rendered,/data-action="add-category-test"/);
    assert.match(rendered,/✓ Added/);
    assert.doesNotMatch(rendered,/CBC with Differential/);
    assert(source.includes("if (row.category) return row.category.results.length ? 'category-results' : 'no-match';"));
    assert(source.includes("if (row.category) return renderBatchCategoryRow(row);"));
    assert(source.includes("if (row.outcome !== 'exact-match') return;"));
    assert(read(html).includes('clinical category per line'));
  });
}
