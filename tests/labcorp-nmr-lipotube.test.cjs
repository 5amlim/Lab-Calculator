const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('./helpers/browser-vm.cjs');
const { test } = require('node:test');

const root = path.join(__dirname, '..');
const css = fs.readFileSync(path.join(root, 'labcorp-theme.css'), 'utf8');
const openCalculator = require('./helpers/calculator-vm.cjs');
const { tubeClass, shortDrawSource, canonicalCollectionContainer, printCollectionWholeBloodDetail } =
  openCalculator('labcorp-app.js', [
    'tubeClass', 'shortDrawSource', 'canonicalCollectionContainer', 'printCollectionWholeBloodDetail'
  ]);
test('NMR LipoTube cannot be mistaken for Yellow ACD', () => {
  assert.equal(tubeClass('NMR LipoTube (Black/Yellow)'), 'tube-nmr-lipotube');
  assert.equal(tubeClass('NMR LipoTube (spun original tube)'), 'tube-nmr-lipotube');
  assert.equal(shortDrawSource({ drawContainer: 'NMR LipoTube (Black/Yellow)' }), 'NMR LipoTube (Black/Yellow)');
  assert.equal(tubeClass('Yellow ACD'), 'tube-yellow');
  assert.equal(shortDrawSource({ drawContainer: 'Yellow ACD' }), 'Yellow ACD');
  assert.equal(tubeClass('SST / Gold'), 'tube-sst');
});

test('collection card retains named NMR tube rather than a generic cap color', () => {
  const tube = canonicalCollectionContainer({
    testCode: '123810', specimenType: 'Serum', drawContainer: 'NMR LipoTube (Black/Yellow)'
  });
  assert.equal(tube.className, 'tube-nmr-lipotube');
  assert.equal(tube.label, 'NMR LipoTube (Black/Yellow)');
  assert.match(css, /\.labcorp-page \.tube-nmr-lipotube::before/);
});

test('NMR volume shows LabCorp serum amount without inventing exact draw volume', () => {
  const markup = printCollectionWholeBloodDetail({
    className: 'tube-nmr-lipotube',
    tests: [{ testCode: '123810', preferredVolume: '2 mL serum', minimumVolume: '1 mL' }]
  }, []);
  assert.match(markup, /Serum Required \/ Tube/);
  assert.match(markup, /2 mL serum/);
  assert.match(markup, /1 mL/);
  assert.doesNotMatch(markup, /Draw Volume|5 mL/);
});

test('source catalog preserves original specialty tube and refrigerated shipping', () => {
  const catalogJs = fs.readFileSync(path.join(root, 'assets/js/labcorp/catalog/metabolic-nmr-and-gestational.js'), 'utf8');
  const ctx = vm.createContext({ window: { SEED_TESTS: [] } });
  vm.runInContext(catalogJs, ctx);
  const entry = ctx.window.SEED_TESTS.find(record => record.testCode === '123810');
  assert(entry);
  assert.match(entry.drawContainer, /NMR LipoTube \(Black\/Yellow\)/);
  assert.equal(entry.transportTemperature, 'Refrigerated');
  assert.match(entry.specialInstructions, /DO NOT OPEN|do NOT open/i);
});