const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const read = name => fs.readFileSync(path.join(__dirname, '..', name), 'utf8');

for(const file of ['assets/js/app.js','labcorp-app.js']) {
  const source=read(file);
  assert.match(source,/const heading = els\.printSheet\.querySelector\('\.print-submit-heading'\);\s*const firstBagRow = els\.printSheet\.querySelector\('\.print-bag-row'\);\s*if \(heading && firstBagRow\) firstBagRow\.insertBefore\(heading, firstBagRow\.firstChild\);/,
    file + ': heading must be inside first paired bag row on ALL platforms');
  assert.doesNotMatch(source,/if \(mobilePrint\) \{\s*const heading = els\.printSheet\.querySelector\('\.print-submit-heading'\)/,
    file + ': no mobile-only heading placement');
  assert.match(source,/pairKeep\.className = 'print-bag-pair-keep';[\s\S]*?pairKeep\.appendChild\(row\);/,
    file + ': paired bag row remains one pagination unit');
  assert.match(source,/if \(sliceIndex === 0 && heading\) sliceRow\.appendChild\(heading\);/,
    file + ': only first slice keeps the heading');
  assert.match(source,/const printBagGroupsPerSlice = 4;/,
    file + ': existing per-bag fragmentation is unchanged');
}
const css=read('assets/css/styles.css');
assert.match(css,/\.print-bag-pair-keep > \.print-bag-row > \.print-submit-heading/);
assert.match(css,/grid-column: 1 \/ -1 !important/);
assert.match(read('index.html'),/app\.js\?v=12\.53/);
assert.match(read('labcorp.html'),/labcorp-app\.js\?v=71/);
console.log('PASS: section heading stays with the first paired bag row across print layouts');
