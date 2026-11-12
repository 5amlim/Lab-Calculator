/* Quest 10380: Hemoglobin A1c with reflex to 1,5-Anhydroglucitol (1,5-AG).
 * Verified against Quest Test Directory 2026-11-12.
 * Two separate specimens are required; availability varies by service area.
 * Load after data.js and before app.js.
 */
(() => {
  'use strict';
  if (!Array.isArray(window.SEED_TESTS)) return;
  if (window.SEED_TESTS.some(test => String(test.testCode || '').trim() === '10380')) return;

  window.SEED_TESTS.push({
    id: 'quest-10380-20261112',
    testCode: '10380',
    testName: 'Hemoglobin A1c with Reflex to 1,5-Anhydroglucitol (1,5-AG)',
    specimenType: 'Serum',
    drawContainer: 'SST / Gold',
    alternativeContainer: 'Red Top (no gel) for serum',
    transportContainer: 'Serum Transport Tube',
    preferredVolume: '1 mL serum, plus one full lavender EDTA whole-blood tube',
    minimumVolume: '0.5 mL serum; 0.5 mL EDTA whole blood minimum',
    transportTemperature: 'Room Temperature',
    transportTemperatureRaw: 'Room temperature for both separately submitted specimens',
    stability: 'Room temperature: 7 days; refrigerated: 7 days; frozen: 28 days (verify freezing instructions with receiving lab)',
    spin: 'Yes',
    specialInstructions: 'TWO SEPARATE SPECIMENS REQUIRED. (1) Draw SST/Gold, allow to clot, centrifuge; send 1 mL spun serum (0.5 mL minimum) in a labeled serum transport tube. A plain red-top (no gel) is also accepted for serum. (2) Draw a separate FULL lavender EDTA tube; invert, do NOT centrifuge, and submit the whole blood in the original tube at ROOM TEMPERATURE (0.5 mL minimum). Do not pool the serum and whole blood. Alternative to serum: submit 1 mL (0.5 mL minimum) EDTA plasma from a separate lavender tube; this requires spinning and transferring plasma while keeping the whole-blood tube unspun. Reject gray fluoride/oxalate, heparinized plasma, or unspun SST. Reflex 1,5-AG is performed if A1c is >=6.5% and <=8.0% and carries an additional charge. NOT offered at Nichols Institute (IFD), San Juan Capistrano; verify availability with the receiving Quest service area before collection.',
    additionalDrawRequirements: [
      {
        container: 'Lavender EDTA',
        count: 1,
        purpose: 'Separate Hemoglobin A1c whole-blood specimen',
        specimenType: 'Whole Blood',
        preferredVolume: 'One full lavender EDTA tube',
        minimumVolume: '0.5 mL whole blood',
        transportContainer: 'Submit in original tube',
        transportTemperature: 'Room Temperature',
        spin: 'No',
        specialInstructions: 'Required SECOND specimen: full lavender EDTA whole blood. Invert, do not centrifuge, and submit the original labeled tube separately at room temperature. Do not use this same tube as the spun serum/plasma specimen.'
      }
    ],
    status: 'active',
    source: 'Quest Test Directory, verified 2026-11-12 https://testdirectory.questdiagnostics.com/test/test-detail/10380/hemoglobin-a1c-with-reflex-to-15-anhydroglucitol-15-ag?cc=MASTER'
  });
})();
