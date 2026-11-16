'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'assets/js/market-restrictions.js'), 'utf8');
function load() {
  const sandbox = { window: {} };
  vm.runInNewContext(source, sandbox);
  return sandbox.window.LabRegionalRestrictions;
}
const t = (code, name = 'Lab test') => ({ testCode: code, testName: name });

test('ordinary Quest and LabCorp tests have no new badges or warnings', () => {
  const flags = load();
  assert.equal(flags.badge(t('809'), 'quest'), '');
  assert.equal(flags.badge(t('001032'), 'labcorp'), '');
  assert.equal(flags.printNotice([t('809')], 'quest'), '');
  assert.equal(flags.entry(t('809'), 'quest'), null);
});

test('official patient-state Quest restrictions are explicit by exact code', () => {
  const flags = load();
  for (const code of ['90368', '90369', '90372'])
    assert.match(flags.badge(t(code), 'quest'), /CA patients only/);
  for (const code of ['335', '39481'])
    assert.match(flags.badge(t(code), 'quest'), /Not for CA patients/);
  assert.match(flags.badge(t('16167'), 'quest'), /Not for CA or NY/);
  assert.match(flags.badge(t('17329'), 'quest'), /NY patients only/);
  assert.match(flags.badge(t('16592'), 'quest'), /Unavailable in NY/);
});

test('LabCorp restriction is isolated from Quest codes', () => {
  const flags = load();
  assert.match(flags.badge(t('791280'), 'labcorp'), /Unavailable in CA \/ NY/);
  assert.equal(flags.badge(t('791280'), 'quest'), '');
  assert.equal(flags.badge(t('90372'), 'labcorp'), '');
});

test('print notices include only known flagged tests and deduplicate codes', () => {
  const flags = load();
  const text = flags.printNotice([t('809'), t('335', 'Cholinesterase'), t('335', 'Cholinesterase')], 'quest');
  assert.match(text, /Regional test restrictions/);
  assert.match(text, /335/);
  assert.doesNotMatch(text, />809/);
  assert.equal((text.match(/<li>/g) || []).length, 1);
});

test('flag markup escapes external record names safely', () => {
  const flags = load();
  const text = flags.printNotice([t('90372', 'A <script> & something')], 'quest');
  assert.doesNotMatch(text, /<script>/);
  assert.match(text, /&lt;script&gt;/);
});

test('both calculators have no added market selector or approval gate', () => {
  for (const html of ['index.html', 'labcorp.html']) {
    const code = fs.readFileSync(path.join(root, html), 'utf8');
    assert.match(code, /assets\/js\/market-restrictions\.js/);
    assert.match(code, /assets\/css\/market-restrictions\.css/);
    assert.doesNotMatch(code, /collectionMarketSelect|marketAcceptanceCheck|marketReviewPanel/);
  }
  for (const app of ['assets/js/app.js', 'labcorp-app.js']) {
    const code = fs.readFileSync(path.join(root, app), 'utf8');
    assert.match(code, /LabRegionalRestrictions\.badge/);
    assert.match(code, /LabRegionalRestrictions\.printNotice/);
    assert.doesNotMatch(code, /LabMarketAvailability/);
  }
});
