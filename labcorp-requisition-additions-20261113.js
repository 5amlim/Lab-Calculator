/* Missing Labcorp assays from a marked requisition reviewed 2026-11-13.
 * Other checked/handwritten tests already exist in the catalog. No patient data.
 * Specimen details from individual official Labcorp test pages.
 */
(() => {
  'use strict';
  const additions = [
    {
      id: 'labcorp-042580',
      testCode: '042580',
      testName: 'Heavy Metals Profile I, Whole Blood (Arsenic, Lead, Mercury)',
      specimenType: 'Whole Blood',
      drawContainer: 'Royal Blue EDTA',
      alternativeContainer: '',
      transportContainer: 'Royal Blue EDTA (original tube)',
      preferredVolume: '7 mL whole blood',
      minimumVolume: '1.1 mL',
      transportTemperature: 'Room Temperature',
      transportTemperatureRaw: 'Room Temperature',
      stability: '14 days at room temperature (also 14 days refrigerated or frozen)',
      spin: 'No',
      specialInstructions: 'Collect whole blood in a trace-element royal blue-top EDTA tube; submit the original unspun tube. Includes arsenic, lead, and mercury. Prevent metal contamination and clotting. Labcorp advises avoiding seafood and red wine for 72 hours before collection. Do not substitute the separately listed urine heavy-metals panels.',
      fastingStatus: '',
      fastingInstructions: '',
      status: 'active',
      source: 'Labcorp official test directory, checked 2026-11-13 • https://www.labcorp.com/tests/042580/heavy-metals-profile-i-whole-blood'
    },
    {
      id: 'labcorp-082016',
      testCode: '082016',
      testName: 'Sex Hormone-Binding Globulin (SHBG)',
      specimenType: 'Serum',
      drawContainer: 'SST / Gold',
      alternativeContainer: 'Red Top (serum)',
      transportContainer: 'SST / Gold (spun)',
      preferredVolume: '1 mL serum',
      minimumVolume: '0.7 mL',
      transportTemperature: 'Room Temperature',
      transportTemperatureRaw: 'Room Temperature',
      stability: '14 days at room temperature (also 14 days refrigerated or frozen)',
      spin: 'Yes',
      specialInstructions: 'Gel-barrier SST preferred. If red-top is used, centrifuge and transfer separated serum into a labeled plastic transport tube. Reject EDTA or citrate plasma. Ask about high-dose biotin; Labcorp recommends avoiding high-dose biotin for at least 72 hours before collection when appropriate.',
      fastingStatus: '',
      fastingInstructions: '',
      status: 'active',
      source: 'Labcorp official test directory, checked 2026-11-13 • https://www.labcorp.com/tests/082016/sex-hormone-binding-globulin'
    }
  ];
  const catalog = Array.isArray(window.SEED_TESTS) ? window.SEED_TESTS : [];
  const knownCodes = new Set(catalog.map(test => String(test.testCode || '').trim()));
  for (const test of additions) {
    if (knownCodes.has(test.testCode)) continue;
    catalog.push(test);
    knownCodes.add(test.testCode);
  }
  window.SEED_TESTS = catalog;
})();
