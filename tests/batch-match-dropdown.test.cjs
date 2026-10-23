const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path');
const root=path.join(__dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
for(const [lab,file,page] of [['Quest','assets/js/app.js','index.html'],['LabCorp','labcorp-app.js','labcorp.html']]){
  test(lab+' search match dropdown uses in-page choices and STAT eligibility',()=>{
    const s=read(file),html=read(page);
    assert.match(s,/class="batch-choice-dropdown"/);
    assert.match(s,/class="batch-choice-menu"/);
    assert.match(s,/data-action="choose-batch-test"/);
    assert.match(s,/isStatEligible\(test\) \? '<span class="batch-choice-stat">STAT eligible/);
    assert.match(s,/isStatEligible\(choice\.test\) \? '<span class="batch-choice-stat">STAT eligible/);
    assert.doesNotMatch(s,/<select id="batch-choice-/);
    assert.match(s,/row\.chosenId = chosenId;/);
    assert.match(s,/row\.outcome = batchRowOutcome\(row\)/);
    assert.match(s,/if \(!canAutoAddBatchRow\(row\)\)/);
    assert.match(s,/event\.key === 'Escape'/);
    assert.match(html,/experience\.css\?v=11\.86/);
  });
}
