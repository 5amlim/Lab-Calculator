'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const read = path => fs.readFileSync(require('node:path').join(__dirname, '..', path), 'utf8');
const script = read('assets/js/quest-review-requested-20261116.js');
const codes = script.match(/const requested = new Set\(`([\s\S]*?)`/)[1].trim().split(/\s+/);

test('all 280 user-requested Quest codes are unique, numbered, and remain nonaddable until verified', async () => {
  assert.equal(codes.length, 280);
  assert.equal(new Set(codes).size, 280);
  assert.ok(codes.every(code => /^\d+$/.test(code)));
  const entries = codes.map(code => ({
    id: 'quest-directory-only-' + code,
    testCode: code,
    testName: 'Example directory reference ' + code,
    status: 'reference',
    specialInstructions: 'DIRECTORY REFERENCE ONLY'
  }));
  // An existing active or blocked record must never be replaced by an approval.
  entries.find(item => item.testCode === '224').status = 'active';
  entries.find(item => item.testCode === '6024').status = 'blocked';
  const window = { SEED_TESTS: entries, QUEST_MISSING_DIRECTORY_READY: Promise.resolve() };
  vm.runInNewContext(script, { window, Promise, console });
  await window.QUEST_MISSING_DIRECTORY_READY;
  assert.equal(window.SEED_TESTS.length, codes.length, 'never duplicate a Quest test code');
  const byCode = new Map(window.SEED_TESTS.map(item => [item.testCode, item]));
  assert.equal(byCode.get('224').status, 'active');
  assert.equal(byCode.get('6024').status, 'blocked');
  for (const code of ['10640','3353','35378','7558']) {
    assert.equal(byCode.get(code).status, 'active', code + ' has a verified workflow');
    assert.ok(byCode.get(code).source.includes('testdirectory.questdiagnostics.com'));
  }
  for (const code of codes) {
    const entry = byCode.get(code);
    if (['224','6024','10640','3353','35378','7558'].includes(code)) continue;
    assert.equal(entry.status, 'reference', code + ' must not be approved from its name alone');
    assert.ok(entry.specialInstructions.startsWith('VERIFICATION REQUESTED.'));
  }
  assert.equal(window.QUEST_REVIEW_REQUESTED_STATS.submitted, 280);
  assert.equal(window.QUEST_REVIEW_REQUESTED_STATS.newlyActivated, 4);
});

test('Quest reference review loads after directory names and before the app', () => {
  const html = read('index.html');
  const loader = html.indexOf('quest-missing-directory-loader-20261114.js');
  const review = html.indexOf('quest-review-requested-20261116.js');
  const app = html.indexOf('assets/js/app.js');
  assert.ok(loader >= 0 && review > loader && app > review);
});
