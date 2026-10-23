const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const read = file => fs.readFileSync(path.join(__dirname, '..', file), 'utf8');

const cedarsApp = read('cedars-app.js');
const cdCtx = vm.createContext({window:{}});
vm.runInContext(read('cedars-data.js'), cdCtx);
const byCedarsId = id => cdCtx.window.CEDARS_TESTS.find(t => t.id === id);
const cb = cedarsApp.indexOf('  const requiresOriginalStoolKit');
const ce = cedarsApp.indexOf('\n  function makeRows()', cb);
const ub = cedarsApp.indexOf('  const urineCupCategory');
const ue = cedarsApp.indexOf('  const originalCupNote', ub);
assert(cb > 0 && ce > cb && ub > 0 && ue > ub);
const cedars = new Function('clean','specimenClass','esc',
  cedarsApp.slice(cb,ce) + '\n' + cedarsApp.slice(ub,ue) +
  '\nreturn {collectionContainer,cedarsMenuContainerPath,originalCollectionGroup,requiresOriginalStoolKit};')(
  text=>String(text||'').trim(), cat=>'type-'+cat.toLowerCase(),
  text=>String(text??'').replace(/&/g,'&amp;').replace(/</g,'&lt;')
);
for(const id of ['gc-ct-swab','affirm','blood-culture','blood-culture-peds','urine-legionella','urine-afb','fecal-fit']){
  const t=byCedarsId(id);assert(t,id+' missing');
  const row=cedars.cedarsMenuContainerPath(t);
  assert.match(row,/is-single/,id+' should use its original transport container');
  assert.doesNotMatch(row,/cedars-container-path-arrow/,id+' should not show a transfer arrow');
  if(t.category==='Swab'||t.category==='Blood')
    assert.equal(cedars.originalCollectionGroup(t).container,t.submit);
}
for(const id of ['gc-ct-urine','urine-culture','urinalysis-swirl']){
  const t=byCedarsId(id),row=cedars.cedarsMenuContainerPath(t);
  assert.match(row,/cedars-container-path-arrow/,id+' must retain urine transfer');
}
const pb=cedarsApp.indexOf('    const mustTransfer =',cedarsApp.indexOf('  function printPlan()'));
const pe=cedarsApp.indexOf('    const collection = new Map();',pb);
assert(pb>0&&pe>pb);
const cedarsPrint = new Function('requiresOriginalStoolKit','esc',
  cedarsApp.slice(pb,pe)+'\nreturn {mustTransfer,transferDirections};')(
  cedars.requiresOriginalStoolKit, text=>String(text??'')
);
assert.equal(cedarsPrint.mustTransfer(byCedarsId('fecal-fit')),false);
assert.match(cedarsPrint.transferDirections(byCedarsId('fecal-fit')),/original stool sampling bottle/);
assert.equal(cedarsPrint.mustTransfer(byCedarsId('urine-culture')),true);

const lcCtx = vm.createContext({
  window:{SEED_TESTS:[]},
  document:{getElementById:()=>null,querySelectorAll:()=>[]},
  localStorage:{getItem:()=>null,setItem:()=>{},removeItem:()=>{}},
  console
});
vm.runInContext(read('labcorp-urgent-pcp-data.js'),lcCtx);
const labcorpApp=read('labcorp-app.js');
vm.runInContext(labcorpApp.replace('  init();',
  '  window.testApi={normalizeRecord,buildTransportBagPlan,buildCollectionPlan,buildSubmissionContents,menuContainerBadges,printCollectionSubmissionPlan};'),
  lcCtx);
const api=lcCtx.window.testApi;
const byLabCode=code=>api.normalizeRecord(lcCtx.window.SEED_TESTS.find(t=>t.testCode===code));
const codes=['180073','180021','008169','008342','180043','180055','008649','188056'];
for(const code of codes){
  const test=byLabCode(code);
  assert(test,code+' missing');
  assert.equal(test.drawContainer,test.transportContainer,code+' must collect in original swab kit');
  assert.doesNotMatch(api.menuContainerBadges(test),/container-path-arrow/,code+' must not show transfer');
  const bags=api.buildTransportBagPlan([test]);
  assert(api.buildCollectionPlan([test],bags).some(c=>c.label===test.drawContainer));
  assert(bags.flatMap(b=>api.buildSubmissionContents(b)).every(c=>c.originalTube===true));
  const printed=api.printCollectionSubmissionPlan([test]);
  assert(printed.includes(test.drawContainer)&&printed.includes(test.testCode),
    code+' printout must identify original swab kit');
}
assert.equal(byLabCode('008169').specimenType,'Throat Swab');
assert.equal(byLabCode('188056').specimenType,'Lesion Swab');
const urine=byLabCode('377036');
assert.match(api.menuContainerBadges(urine),/container-path-arrow/,
  'Actual urine-to-culture-preservative transfer must remain');
const stool=byLabCode('008144');
assert.match(api.menuContainerBadges(stool),/container-path-arrow/,
  'Actual stool-to-Cary-Blair transfer must remain');

const styles=read('assets/css/styles.css');
for(const [page,code] of [['index.html','assets/js/app.js'],['labcorp.html','labcorp-app.js']]){
 const src=read(code);
 assert.match(src,/firstBagRow\.insertBefore\(heading, firstBagRow\.firstChild\)/,
   page+' must attach the submission heading to the actual first bag row');
 assert.match(src,/if \(mobilePrint\)/,page+' print change must be mobile only');
 assert.match(read(page),/assets\/css\/styles\.css\?v=12\.02/);
}
assert.match(styles,/html\.mobile-print \.print-sheet \.print-bag-row > \.print-submit-heading\s*\{[^}]*grid-column:\s*1\s*\/\s*-1/);
assert.match(styles,/html\.mobile-print \.print-sheet \.print-submit-section\s*\{[^}]*margin-top:\s*13px !important/);
assert.match(styles,/\.print-bag-row\s*\{[^}]*grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\)/);
console.log('PASS: Cedars direct kits, selective stool/urine transfers, all 8 LabCorp swabs and mobile bag heading');
