'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('./helpers/browser-vm.cjs');

const root = path.resolve(__dirname, '..');
const files = [
  ['assets/js/quest-directory-expansion-20261114.js', 5, 'index.html'],
  ['assets/js/quest-metabolic-multipoint-expansion-20261114.js', 6, 'index.html'],
  ['assets/js/quest-specialized-panels-20261114.js', 2, 'index.html'],
  ['assets/js/labcorp/catalog/verified-specialty-20261114.js', 8, 'labcorp.html'],
  ['assets/js/labcorp/catalog/specialty-endocrine-expansion-20261114.js', 5, 'labcorp.html']
];

test('Nov 2026 additions load before app boot and never duplicate catalog codes', () => {
  const codes = new Set();
  for (const [file, count, page] of files) {
    const source = fs.readFileSync(path.join(root, file), 'utf8');
    const html = fs.readFileSync(path.join(root, page), 'utf8');
    const marker = 'src="' + file + '?v=';
    assert.ok(html.includes(marker), file + ' missing from ' + page);
    assert.ok(html.indexOf(marker) < html.indexOf(page === 'index.html' ? 'src="assets/js/app.js?' : 'src="labcorp-app.js?'), file + ' must load before calculator');
    const sandbox = { window: { SEED_TESTS: [] } };
    vm.runInNewContext(source, sandbox, {filename:file});
    assert.equal(sandbox.window.SEED_TESTS.length, count, file);
    for (const entry of sandbox.window.SEED_TESTS) {
      for (const field of ['testCode', 'testName', 'specimenType', 'drawContainer', 'transportContainer', 'transportTemperature', 'preferredVolume', 'minimumVolume', 'source']) {
        assert.ok(entry[field], entry.testCode + ' missing ' + field);
      }
      assert.match(entry.source, /questdiagnostics\.com|labcorp\.com/i);
      const key = page + ':' + entry.testCode;
      assert.ok(!codes.has(key), 'duplicate code across new additions: ' + key);
      codes.add(key);
    }
    vm.runInNewContext(source, sandbox, {filename:file});
    assert.equal(sandbox.window.SEED_TESTS.length, count, file + ' duplicate on second load');
  }
  assert.equal(codes.size, 26);
});

test('timed glucose and multi-specimen panels retain separate tube requirements', () => {
  const w = { window: { SEED_TESTS: [] } };
  for (const file of [files[0][0], files[1][0], files[3][0]]) {
    vm.runInNewContext(fs.readFileSync(path.join(root,file),'utf8'), w, {filename:file});
  }
  const byCode = Object.fromEntries(w.window.SEED_TESTS.map(t=>[t.testCode,t]));
  for (const [code, count] of [['35181',1],['23475',2],['18927',2],['6745',3],['15853',4]]) {
    assert.equal(byCode[code].additionalDrawRequirements.reduce((sum, route) => sum + route.count, 0), count, code);
  }
  for (const code of ['92062','92027','92026','92063','042045','042060']) {
    assert.ok(byCode[code].additionalDrawRequirements.length, code + ' missing separate specimen');
  }
  assert.equal(byCode['123014'].transportTemperature, 'Frozen');
});
