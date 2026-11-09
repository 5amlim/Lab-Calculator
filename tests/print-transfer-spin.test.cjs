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
  const wholeBloodTransfer = render({specimenType:'Whole Blood', transfer:true, spin:'Yes'});
  assert.doesNotMatch(wholeBloodTransfer, /print-transfer-spin|print-detail-spin|Spin ✓|Spin, then transfer to/,
    lab + ': intact whole blood must not inherit a spin cue from transfer');
  assert.match(wholeBloodTransfer, /aria-label="Then transfer to"/,
    lab + ': whole-blood transfer arrow must remain visible');
  const wholeBloodOriginal = render({specimenType:'Whole Blood', transfer:false, spin:'Yes'});
  assert.doesNotMatch(wholeBloodOriginal, /print-transfer-spin|print-detail-spin|Spin ✓/,
    lab + ': whole blood in original tube must remain unspun');
  for (const material of ['Plasma', 'RBCs', 'Platelet-poor plasma']) {
    const processedTransfer = render({specimenType:material, transfer:true, spin:'Yes'});
    assert.match(processedTransfer, /aria-label="Spin, then transfer to"/,
      lab + ': ' + material + ' should retain centrifugation when indicated');
  }
  console.log(lab + ': print spin/transfer cases passed');
}


const questSeedSource = fs.readFileSync(path.join(root, 'assets/js/data.js'), 'utf8');
const questRecords = JSON.parse(questSeedSource.replace(/^window\.SEED_TESTS\s*=\s*/, '').replace(/;\s*$/, ''));
const b1 = questRecords.find(test => test.testCode === '10189');
assert.ok(b1, 'Quest 10189 should exist');
assert.equal(b1.specimenType, 'Whole Blood');
assert.equal(b1.spin, 'No');
assert.match(b1.transportContainer, /Amber transport tube/i);
assert.match(b1.specialInstructions, /Do not centrifuge/);
assert.match(b1.specialInstructions, /freeze immediately/i);

const labcorpAdditions = fs.readFileSync(path.join(root, 'assets/js/labcorp/catalog/workbook-additions-core.js'), 'utf8');
const leadOffset = labcorpAdditions.indexOf('"testCode": "007625"');
assert.ok(leadOffset >= 0, 'LabCorp 007625 should exist');
const leadStart = labcorpAdditions.lastIndexOf('  {', leadOffset);
const leadEnd = labcorpAdditions.indexOf('\n  },', leadOffset);
assert.ok(leadStart >= 0 && leadEnd > leadStart, 'LabCorp 007625 object boundary');
const lead = JSON.parse(labcorpAdditions.slice(leadStart, leadEnd + 4));
assert.equal(lead.specimenType, 'Whole Blood');
assert.equal(lead.spin, 'No');
assert.match(lead.transportContainer, /Original Tube/i);
console.log('Quest 10189 and LabCorp 007625 specimen prep data passed');
