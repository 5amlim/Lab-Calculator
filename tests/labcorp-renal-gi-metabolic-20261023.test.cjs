const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const catalogFile = 'assets/js/labcorp/catalog/renal-gi-metabolic-specialty-20261023.js';
const read = file => fs.readFileSync(path.join(root, file), 'utf8');

test('new renal/GI/metabolic Labcorp batch is loaded once before calculator', () => {
  const html = read('labcorp.html');
  const tag = '<script src="' + catalogFile + '?v=1"></script>';
  assert.equal(html.split(tag).length, 2);
  assert(html.indexOf(tag) > html.indexOf('labcorp-data.js'));
  assert(html.indexOf(tag) < html.indexOf('labcorp-app.js'));
});

test('twenty unique complete Labcorp codes are present', () => {
  const ctx = {window:{SEED_TESTS:[]}};
  vm.runInNewContext(read(catalogFile), ctx, {filename: catalogFile, timeout:10000});
  const rows = ctx.window.SEED_TESTS;
  assert.equal(rows.length, 20);
  assert.equal(new Set(rows.map(x=>x.testCode)).size, 20);
  for (const r of rows) {
    assert.match(r.testCode, /^\d{6}$/);
    for(const key of ['testName','specimenType','drawContainer','transportContainer','minimumVolume','preferredVolume','transportTemperature','specialInstructions','source']) {
      assert(r[key], r.testCode+' missing '+key);
    }
    assert(/labcorp\.com\/tests\//.test(r.source), r.testCode+' missing official test source');
    assert(r.source.includes('/' + r.testCode + '/'),r.testCode+' wrong source code');
    assert(['Room Temperature','Refrigerated','Frozen'].includes(r.transportTemperature),r.testCode+' invalid temperature');
  }
  assert.equal(rows.filter(x=>x.transportTemperature==='Frozen').length, 7);
  for(const code of ['081162','724344','007010']) {
    const r=rows.find(x=>x.testCode===code);
    assert.match(r.specialInstructions,/MANUAL|separate/i,code+' must explain multi-specimen processing');
  }
  assert.match(rows.find(x=>x.testCode==='007010').specialInstructions,/ROOM TEMPERATURE/);
  assert.match(rows.find(x=>x.testCode==='007010').specialInstructions,/freeze/);
  assert.match(rows.find(x=>x.testCode==='004788').specialInstructions,/SPECIALIZED COLLECTION ONLY/);
  assert.match(rows.find(x=>x.testCode==='007700').specialInstructions,/INVESTIGATIONAL/);
  assert.match(rows.find(x=>x.testCode==='086340').specialInstructions,/completion/);
  const next={window:{SEED_TESTS:rows.slice()}};
  vm.runInNewContext(read(catalogFile),next,{filename:catalogFile,timeout:10000});
  assert.equal(next.window.SEED_TESTS.length,20,'re-loading must not add duplicate records');
});
