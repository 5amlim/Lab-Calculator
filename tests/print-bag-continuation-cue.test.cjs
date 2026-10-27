const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');

for (const file of ['assets/js/app.js', 'labcorp-app.js']) {
  const script = read(file);
  assert.match(script, /if \(sliceIndex > 0\) \{[\s\S]*?cue\.className = 'print-bag-continuation-cue'/,
    file + ' should render a compact cue for continuing bag fragments');
  assert.match(script, /topbar\?\.remove\(\);\s*header\?\.remove\(\);/,
    file + ' should not repeat full bag masthead');
  assert.match(script, /sliceCard\.querySelector\('\.print-manual-card-warning'\)\?\.remove\(\)/,
    file + ' should only print the full-bag manual warning once');
  assert.match(script, /if \(end < allItems\.length\) \{\s*sliceCard\.querySelector\('\.print-bag-end'\)\?\.remove\(\);/,
    file + ' should only print END OF BAG in the last fragment');
  assert.match(script, /MORE CONTAINERS FOLLOW · SAME BAG/,
    file + ' should identify continuing groups as the same physical bag');
}
const css = read('assets/css/styles.css');
assert.match(css, /\.print-bag-continuation-cue/, 'Continuation cue must be styled in print');
assert.match(css, /\.print-bag-card > \.print-bag-end,[\s\S]*?margin-top: auto !important/,
  'End of Bag must remain at the bottom of its row');
console.log('PASS: Quest and LabCorp bag continuations use a cue rather than a repeated bag start');
