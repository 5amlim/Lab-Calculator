const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.join(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');

for (const scriptPath of ['assets/js/app.js', 'labcorp-app.js']) {
  const source = read(scriptPath);
  const begin = source.indexOf('  function isPrintableStandardSstSerumAliquot(item) {');
  const end = source.indexOf('  function printCollectionSubmissionPlan(tests) {', begin);
  assert(begin > 0 && end > begin, scriptPath + ': expected print-only helper functions');
  const helperSource = source.slice(begin, end);
  const ctx = {
    uniqueTests: tests => [...new Map(tests.map(test => [test.id, test])).values()],
    isSstDraw: test => /sst|gold/i.test(test.drawContainer),
    normalizeSpecimenType: text => text,
    isOriginalContainerSubmission: () => false,
    splitSubmissionContainers: test => [{ key: test.destinationKey }]
  };
  vm.createContext(ctx);
  vm.runInContext(helperSource, ctx);
  const manualKey = 'transport|serum from gold sst|standard-serum-transport|spin-yes|dedicated-manual';
  const sharedKey = 'transport|serum from gold sst|standard-serum-transport|spin-yes';
  const redKey = 'transport|serum from red top|standard-serum-transport|spin-yes';
  const serum = (id, tube, destinationKey) => ({
    id, specimenType:'Serum', drawContainer:tube,
    transportContainer:'Serum Transport Tube', destinationKey
  });
  const manual = {
    key:manualKey, className:'tube-transport tube-transport-green-top',
    label:'Serum Transport Tube', originalTube:false, count:2,
    tests:[serum('custom-manual', 'Gold SST', manualKey)]
  };
  const shared = {
    key:sharedKey, className:'tube-transport tube-transport-green-top',
    label:'Serum Transport Tube', originalTube:false, count:3,
    pooledSerumPlasmaTransport:true,
    tests:Array.from({length:5}, (_,i)=>serum('routine-'+i,'Gold SST',sharedKey))
  };
  const red = {
    key:redKey, className:'tube-transport tube-transport-green-top',
    label:'Serum Transport Tube', originalTube:false, count:1,
    tests:[serum('red','Red Top',redKey)]
  };

  const original=[manual,red,shared];
  const grouped=ctx.printSstSerumTransportGroupContents(original);
  assert.equal(grouped.length,2,scriptPath+': one display card replaces two SST cards');
  assert.equal(grouped[0].count,5,scriptPath+': 2+3 is displayed as five tubes');
  assert.equal(grouped[0].printSubgroups.length,2);
  assert.deepEqual(Array.from(grouped[0].printSubgroups, part=>part.count),[2,3]);
  assert.equal(grouped[0].tests.length,6,scriptPath+': every test remains listed');
  assert.strictEqual(grouped[0].printSubgroups[0], manual,
    scriptPath+': dedicated manual allocations must remain intact');
  assert.strictEqual(grouped[0].printSubgroups[1], shared,
    scriptPath+': pooled allocations must remain intact');
  assert.strictEqual(grouped[1],red,scriptPath+': Red Top serum must not be grouped with SST');
  assert.equal(original.length,3,scriptPath+': no mutation of physical bag contents');
  assert.equal(original.reduce((sum,item)=>sum+item.count,0),6,
    scriptPath+': physical transport count is unchanged');
  assert.equal(ctx.printSstSerumTransportGroupContents([manual, red]).length,2,
    scriptPath+': a single eligible SST item should not be wrapped into a fake group');

  assert.match(source, /printSstSerumTransportSubgroups\(item, bag\.isStat\)/,
    scriptPath+': render dedicated subgroups within the aggregated card');
  assert.match(source, /printSubmissionItemDetail\(part\)/,
    scriptPath+': preserve individual draw-source instructions and source counts');
  assert.match(source, /printLabelingNotes\(part\)/,
    scriptPath+': retain independent label instructions');
  assert.match(source, /printManualCardWarning\(part\.tests\)/,
    scriptPath+': manual-entry warning stays with its own subgroup');
  assert.match(source, /const totalContainers = contents\.reduce/,
    scriptPath+': physical container totals must be computed before grouping');
  assert.match(source, /contents: printSstSerumTransportGroupContents\(contents\), totalContainers/,
    scriptPath+': grouping must affect print presentation only');
}
const css=read('assets/css/styles.css');
assert.match(css, /\.print-serum-subgroup/);
assert.match(css, /\.print-serum-subgroup-heading/);
assert.match(read('index.html'), /app\.js\?v=12\.51/);
assert.match(read('labcorp.html'), /labcorp-app\.js\?v=69/);
console.log('PASS: SST serum transport visual grouping preserves physical counts, subgroups and print instructions');
