const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const read = p => fs.readFileSync(path.join(__dirname, '..', p), 'utf8');

for (const file of ['assets/js/app.js', 'labcorp-app.js']) {
  const script = read(file);
  assert.match(script, /if \(sliceIndex > 0\) \{[\s\S]*?cue\.className = 'print-bag-continuation-cue'/,
    file + ': continuation sections need a compact cue');
  assert.match(script, /cue\.textContent = '› CONTINUE '/,
    file + ': use a chevron rather than a corner arrow');
  assert.match(script, /topbar\?\.remove\(\);\s*header\?\.remove\(\);/,
    file + ': continuation must not look like a new bag');
  assert.match(script, /printBagItemProgress\(item, itemIndex, contents\)/,
    file + ': manual verification must share the progress line');
  assert.doesNotMatch(script, /\$\{printManualCardWarning\(bag\.tests\)\}/,
    file + ': do not show a whole-bag manual warning');
  assert.doesNotMatch(script, /sliceCard\.querySelector\('\.print-manual-card-warning'\)\?\.remove\(\)/,
    file + ': keep the manual warning with its tube even on continuation pages');
  assert.match(script, /if \(end < allItems\.length\) \{[\s\S]*?sliceCard\.classList\.add\('bag-has-more'\);[\s\S]*?sliceCard\.querySelector\('\.print-bag-end'\)\?\.remove\(\)/,
    file + ': only incomplete fragments omit the end of bag');
  assert.match(script, /› MORE CONTAINERS FOLLOW · SAME BAG/,
    file + ': partial bag footer should use a chevron');
}
const css = read('assets/css/styles.css');
assert.match(css, /\.print-bag-row > \.print-bag-card\.bag-has-more[^}]*?border-bottom: 0 !important;/,
  'An unfinished bag must not have a bottom border');
assert.match(css, /\.print-bag-row > \.print-bag-card\.bag-continued[^}]*?border-top: 0 !important;/,
  'A continuation must not have a new top border');
assert.match(css, /\.print-bag-item-progress \.print-bag-manual-flag/,
  'Manual verification should appear left-aligned in the item progress row');
assert.match(css, /\.print-bag-card > \.print-bag-end,[\s\S]*?margin-top: auto !important/,
  'The completed bag footer stays at the bottom');
console.log('PASS: paired bags use open continuation borders, chevrons, and inline manual verification');
