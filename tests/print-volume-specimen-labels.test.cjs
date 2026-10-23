const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

for (const [lab, file] of [
  ['Quest', '../assets/js/app.js'],
  ['LabCorp', '../labcorp-app.js']
]) {
  test(lab + ' print-table volume omits only redundant specimen labels', () => {
    const source = fs.readFileSync(path.join(__dirname, file), 'utf8');
    const start = source.indexOf('  function printDetailVolumeText(');
    const end = source.indexOf('  function printSummary() {', start);
    assert(start !== -1 && end > start, 'Print-only formatter must exist');
    const sandbox = {
      combinedVolumeText: (item, level) => {
        const value = level === 'preferred' ? item.preferredVolume : item.minimumVolume;
        const extras = (item.additionalDrawRequirements || []).map(
          r => level === 'preferred' ? r.preferredVolume : r.minimumVolume
        ).filter(Boolean);
        return [value, ...extras].filter(Boolean).join(' + ');
      },
      additionalDrawRequirements: item => item.additionalDrawRequirements || [],
      normalizeSpecimenType: type => String(type || ''),
    };
    const render = vm.runInNewContext('(' + source.slice(start, end).trim() + ')', sandbox);
    const serum = {specimenType:'Serum', preferredVolume:'6 mL serum', minimumVolume:'3 mL serum'};
    assert.equal(render(serum, 'preferred'), '6 mL');
    assert.equal(render(serum, 'minimum'), '3 mL');
    assert.equal(render({specimenType:'Plasma',preferredVolume:'0.5 mL plasma'},'preferred'), '0.5 mL');
    assert.equal(render({specimenType:'Whole Blood',preferredVolume:'4 mL whole blood'},'preferred'), '4 mL');
    assert.equal(render({specimenType:'Serum',preferredVolume:'1 mL serum - full tube'},'preferred'), '1 mL - full tube');
    assert.equal(render({specimenType:'Serum',preferredVolume:'1 mL plasma'},'preferred'), '1 mL plasma');
    const mixed = {specimenType:'Serum',preferredVolume:'1 mL serum',
      additionalDrawRequirements:[{specimenType:'Plasma',preferredVolume:'2 mL plasma'}]};
    assert.equal(render(mixed,'preferred'), '1 mL serum + 2 mL plasma');
    const same = {specimenType:'Serum',preferredVolume:'1 mL serum',
      additionalDrawRequirements:[{specimenType:'Serum',preferredVolume:'2 mL serum'}]};
    assert.equal(render(same,'preferred'), '1 mL + 2 mL');
    assert(source.includes("printDetailVolumeText(test, 'preferred') || 'Verify'"));
    assert(source.includes("printDetailVolumeText(test, 'minimum') || '—'"));
    assert(source.includes("combinedVolumeText(test, 'preferred')"));
    assert(source.includes("menuVolumeText(test, 'preferred')"));
  });
}
