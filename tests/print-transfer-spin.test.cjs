const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
const css = fs.readFileSync(path.join(root, 'assets/css/styles.css'), 'utf8');
assert.match(css, /\.container-path\.is-transfer \.print-transfer-spin/);
assert.match(css, /\.print-transfer-spin[\s\S]*?font-size: inherit !important/);

for (const [lab, script] of [['Quest', 'assets/js/app.js'], ['LabCorp', 'labcorp-app.js']]) {
  const source = fs.readFileSync(path.join(root, script), 'utf8');
  const begin = source.indexOf('  function printDetailContainerPath(test) {');
  const end = source.indexOf('function printStabilityForTemperature(test) {', begin);
  assert(begin >= 0 && end > begin, lab + ': missing print-detail formatter');
  const ctx = {
    menuContainerBadges: test => '<span class="container-path is-' + (test.transfer ? 'transfer' : 'single') + '">' +
      '<span class="container-path-source"><span class="badge tube tube-sst">Gold / SST</span></span>' +
      (test.transfer ? '<span class="container-path-arrow" role="img" aria-label="Then transfer to">↓</span>' +
        '<span class="container-path-submit"><span class="badge tube tube-transport">Transport tube</span></span>' : '') + '</span>',
    additionalDrawRequirements: test => test.additionalDrawRequirements || [],
    normalizeSpecimenType: value => String(value || ''),
    specimenClass: () => 'specimen-serum',
    escapeHtml: value => String(value),
  };
  const render = vm.runInNewContext(source.slice(begin, end) + '; printDetailContainerPath', ctx);
  const spunTransfer = render({specimenType:'Serum', transfer:true, spin:'Yes'});
  assert.match(spunTransfer, /container-path-arrow[^>]*>↓ <span class="print-transfer-spin" aria-hidden="true">spin<\/span><\/span>/,
    lab + ': transfer spin needs to share arrow line');
  assert.match(spunTransfer, /aria-label="Spin, then transfer to"/);
  assert.doesNotMatch(spunTransfer, /Spin ✓|print-detail-spin/,
    lab + ': transferred SST must not duplicate spin below');
  const directSst = render({specimenType:'Serum', transfer:false, spin:'Yes'});
  assert.doesNotMatch(directSst, /print-transfer-spin/);
  assert.match(directSst, /class="print-detail-spin"[^>]*>· Spin ✓<\/span>/,
    lab + ': original-tube SST should keep Spin ✓');
  const noSpinTransfer = render({specimenType:'Serum', transfer:true, spin:'No'});
  assert.doesNotMatch(noSpinTransfer, /print-transfer-spin|print-detail-spin/);
  assert.match(noSpinTransfer, /Then transfer to/);
  const special = render({specimenType:'Plasma', transfer:true, spin:'per protocol'});
  assert.doesNotMatch(special, /print-transfer-spin/);
  assert.match(special, /Spin: per protocol/);
  console.log(lab + ': print spin/transfer cases passed');
}
