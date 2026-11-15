'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'assets/js/gestational-test-warnings.js'), 'utf8');
function getWarning(lab, testCode, testName) {
  const sandbox = {
    window: {},
    document: { body: {
      dataset: { galleryLab: lab === 'Quest' ? 'Q' : 'L' },
      classList: { contains: name => lab === 'Labcorp' && name === 'labcorp-page' }
    } }
  };
  vm.runInNewContext(source, sandbox);
  return sandbox.window.gestationalTestWarning({ testCode, testName });
}
const scenarios = [
  ['Quest','8477','Glucose, Gestational Screen (50g), 135 Cutoff','No fasting','50 g'],
  ['Quest','19833','Glucose, Gestational Screen (50g), 140 Cutoff','No fasting','50 g'],
  ['Quest','18927','Glucose Tolerance Test, Gestational, 3 Specimens (75g)','FASTING','75 g'],
  ['Quest','6745','Glucose Tolerance Test, Gestational, 4 Specimens (100g)','FASTING','100 g'],
  ['Labcorp','102277','Gestational Diabetes Screen, ACOG (1-hour 50g)','Fasting is NOT required','50 g'],
  ['Labcorp','101000','Gestational Glucose Tolerance Screening and Diagnostic, 2-hour ADA','Fast 8–14 hours','75 g'],
  ['Labcorp','102004','Gestational Glucose Tolerance Diagnostic Test, ACOG','Fast 8–14 hours','100 g']
];
test('screening and diagnostic protocols have distinct warnings', () => {
  for (const [lab, code, name, fasting, dose] of scenarios) {
    const w = getWarning(lab, code, name);
    assert.ok(w, lab + ' ' + code + ' no warning');
    assert.ok(w.note.includes(fasting), lab + ' ' + code + ' wrong fasting advice');
    assert.ok(w.note.includes(dose), lab + ' ' + code + ' wrong oral load');
    assert.equal(w.kind, 'glucose');
  }
});
test('other gestational and pregnancy-specific orders receive a warning without a glucose dose', () => {
  for (const [lab, code, name] of [
    ['Quest','19485','hCG with Gestational Table'],
    ['Quest','14801','Bile Acids, Total, Pregnancy, Enzymatic'],
    ['Quest','90896','TSH, Pregnancy'],
    ['Labcorp','349287','Pregnancy Infectious Disease Antibody Profile']
  ]) {
    const w = getWarning(lab,code,name);
    assert.equal(w.kind,'pregnancy');
    assert.doesNotMatch(w.note,/give \d+ g/i);
  }
  assert.equal(getWarning('Quest','8396','hCG, Total, Quantitative'), null);
  assert.equal(getWarning('Labcorp','101200','Glucose Tolerance Test, WHO'), null);
});
test('warnings are integrated with search, selected tests, and printed precautions for both laboratories', () => {
  for (const [app,page] of [['assets/js/app.js','index.html'], ['labcorp-app.js','labcorp.html']]) {
    const js = fs.readFileSync(path.join(root,app),'utf8');
    const html = fs.readFileSync(path.join(root,page),'utf8');
    assert.match(js,/gestationalWarningBadge\(test\)/);
    assert.match(js,/selected-gestational-warning/);
    assert.match(js,/print-gestational-warning/);
    assert.match(js,/if \(gestational\) add\(gestational.label, gestational.note\)/);
    assert.ok(html.includes('assets/js/gestational-test-warnings.js'));
    assert.ok(html.includes('assets/css/gestational-test-warnings.css'));
    assert.ok(html.indexOf('gestational-test-warnings.js') < html.indexOf(app.split('/').pop() + '?'));
  }
});
