'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');
const openCalculator = require('./helpers/calculator-vm.cjs');

for (const app of ['assets/js/app.js', 'labcorp-app.js']) {
  test(app + ': rank typos and shorthand without guessing qualified assays or codes', () => {
    const records = [
      ['991001', 'Fructosamine'],
      ['991002', 'Alpha Fetoprotein Tumor Marker'],
      ['991003', 'Thyroid Stimulating Hormone'],
      ['991004', 'Hepatitis C RNA Quantitative'],
      ['991005', 'Hepatitis C RNA Qualitative'],
      ['991006', 'Prostate Specific Antigen Total'],
      ['991007', 'Prostate Specific Antigen Free'],
      ['991008', 'Hepatitis B Surface Antigen'],
      ['991009', 'Hepatitis B Surface Antibody'],
      ['991010', 'Vitamin D 25 Hydroxy'],
      ['991011', 'Vitamin D 125 Hydroxy'],
      ['991012', 'Adenovirus Antigen, DFA'],
      ['991013', 'Erythrocyte Sedimentation Rate (ESR)'],
      ['991014', 'ESR-Wes+ANA+RF Qn+CRP'],
    ].map(([testCode, testName]) => ({
      id: 'audit-' + testCode, testCode, testName, status: 'active',
      searchAliases: testCode === '991012' ? ['Adenovirus direct fluorescent antibody'] : []
    }));
    const { rankLibraryTest, findMatches, suggestionMatches, isExactBatchMatch } = openCalculator(app,
      ['rankLibraryTest', 'findMatches', 'suggestionMatches', 'isExactBatchMatch'], { records });

    for (const [query, code] of [
      ['fructosmaine', '991001'],
      ['aftm', '991002'],
      ['t s h', '991003'],
      ['thyrod stimulatng hormone', '991003'],
      ['heptatitis c rna quant', '991004'],
      ['hepatitis c rna qual', '991005'],
      ['prostate specifc antigen free', '991007'],
      ['hepatitis b surafce antigen', '991008'],
      ['vitamin d 25 hydroxy', '991010'],
      ['adenovirus direct fluorescent antibody', '991012'],
      ['sed rate', '991013'],
    ]) {
      const found = findMatches(query);
      assert.equal(found[0]?.test.testCode, code, query);
      assert.equal(suggestionMatches(query, 'batch')[0]?.test.testCode, code, query);
      if (query !== 'vitamin d 25 hydroxy') assert(!isExactBatchMatch(query, found[0].test), query);
    }

    for (const [query, differentCode] of [
      ['hepatitis c rna qual', '991004'],
      ['prostate specifc antigen free', '991006'],
      ['hepatitis b surafce antigen', '991009'],
      ['vitamin d 25 hydroxy', '991011'],
    ]) {
      assert.equal(rankLibraryTest(query, records.find(row => row.testCode === differentCode)), 0, query);
    }

    assert.equal(findMatches('991010')[0]?.test.testCode, '991010');
    assert.equal(findMatches('991099').length, 0);
  });
}
