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
    splitSubmissionContainers: test => [{ key: test.destinationKey }],
    displayCode: test => test.testCode || test.id
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
    sourceCountOverrides:new Map([['sst',3]]),
    tests:[serum('custom-manual', 'Gold SST', manualKey)]
  };
  const shared = {
    key:sharedKey, className:'tube-transport tube-transport-green-top',
    label:'Serum Transport Tube', originalTube:false, count:3,
    pooledSerumPlasmaTransport:true,
    sourceCountOverrides:new Map([['sst',4]]),
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
  assert.equal(grouped[0].tests.length,6,scriptPath+': every test remains listed');
  assert.equal(grouped[0].sourceCountOverrides.get('sst'),7,
    scriptPath+': source SST badge combines the correct physical allocation');
  assert.match(grouped[0].printAllocationNote,/2 for custom-manual/,
    scriptPath+': manual tubes remain separately allocated in one compact note');
  assert.match(grouped[0].printAllocationNote,/3 for other tests/,
    scriptPath+': routine tubes remain separately allocated without nested boxes');
  assert.equal(grouped[0].printSubgroups,undefined,
    scriptPath+': nested subgroups are no longer rendered');
  assert.strictEqual(grouped[1],red,scriptPath+': Red Top serum must not be grouped with SST');
  assert.equal(original.length,3,scriptPath+': no mutation of physical bag contents');
  assert.equal(original.reduce((sum,item)=>sum+item.count,0),6,
    scriptPath+': physical transport count is unchanged');
  assert.equal(ctx.printSstSerumTransportGroupContents([manual, red]).length,2,
    scriptPath+': a single eligible SST item should not be wrapped into a fake group');

  assert.doesNotMatch(source, /printSstSerumTransportSubgroups/,
    scriptPath+': remove nested subgroup cards');
  assert.match(source, /printSubmissionItemDetail\(item\)/,
    scriptPath+': show one transfer-source instruction');
  assert.match(source, /printLabelingNotes\(item\)/,
    scriptPath+': preserve labeling instructions and test codes');
  assert.match(source, /printBagItemProgress\(item, itemIndex, contents\)/,
    scriptPath+': manual warning shares the footer line with bag progress');
  assert.match(source, /print-bag-manual-flag/,
    scriptPath+': shortened manual warning is left-aligned in progress row');
  assert.match(source, /printBagItemProgress\(item, itemIndex, contents\)/,
    scriptPath+': warning is rendered inline rather than as a standalone block');
  assert.match(source, /const totalContainers = contents\.reduce/,
    scriptPath+': physical container totals must be computed before grouping');
  assert.match(source, /contents: printSstSerumTransportGroupContents\(contents\), totalContainers/,
    scriptPath+': grouping must affect print presentation only');
}
const css=read('assets/css/styles.css');
assert.match(css, /\.print-serum-allocation-note/);
assert.match(css, /\.print-bag-manual-flag/);
assert.match(read('index.html'), /app\.js\?v=12\.52/);
assert.match(read('labcorp.html'), /labcorp-app\.js\?v=70/);
console.log('PASS: SST serum transport visual grouping preserves physical counts, consolidated instructions and compact warnings');
