'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const zlib = require('node:zlib');

const root = path.resolve(__dirname, '..');
const load = path => fs.readFileSync(require('node:path').join(root, path), 'utf8');

test('1,068 Quest code/name entries are intact and uniquely keyed by numeric Quest code', () => {
  const source = load('assets/js/quest-missing-directory-b64-20261114.js');
  const match = source.match(/QUEST_MISSING_DIRECTORY_B64\s*=\s*"([A-Za-z0-9+/=]+)"/);
  assert.ok(match, 'base64 catalog present');
  const lines = zlib.inflateSync(Buffer.from(match[1], 'base64')).toString('utf8').split('\n');
  assert.equal(lines.length, 1068);
  const codes = lines.map(line => {
    const divider = line.indexOf('|');
    assert.ok(divider > 0, 'code/name delimiter present');
    const code = line.slice(0, divider);
    const name = line.slice(divider + 1);
    assert.match(code, /^\d+$/);
    assert.ok(name.trim(), 'nonempty Quest test name');
    return code;
  });
  assert.equal(new Set(codes).size, lines.length, 'no duplicate codes');
});

test('directory-only records preserve names but are excluded from collection plans', () => {
  const loader = load('assets/js/quest-missing-directory-loader-20261114.js');
  const app = load('assets/js/app.js');
  const html = load('index.html');
  assert.match(loader, /if \(knownCodes\.has\(code\)\) continue;/);
  assert.match(loader, /status: 'reference'/);
  assert.match(app, /record\.status === 'reference' \? 'reference'/);
  assert.match(app, /if \(!test \|\| test\.status !== 'active'\) return false;/);
  assert.match(app, /selectedIds\.map\(id => database\.find\(test => test\.id === id\)\)\.filter\(test => test && test\.status === 'active'\)/);
  assert.match(app, /function renderLibraryRow\(test\) \{\s*if \(test\.status === 'reference'\)/);
  assert.match(app, /if \(choice\.test\.status === 'reference'\) return/);
  assert.match(app, /window\.QUEST_MISSING_DIRECTORY_READY/);
  const data = html.indexOf('quest-missing-directory-b64-20261114.js');
  const loaderScript = html.indexOf('quest-missing-directory-loader-20261114.js');
  const appScript = html.indexOf('assets/js/app.js?v=12.94');
  assert.ok(data >= 0 && data < loaderScript && loaderScript < appScript, 'catalog loads before app');
});
