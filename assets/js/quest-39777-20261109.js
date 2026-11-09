/* Quest 39777: whole-blood erythrocyte porphyrin.
 * Verified against the Quest test directory 2026-11-09.
 * Availability must be confirmed with the receiving Quest service area.
 */
(() => {
  'use strict';
  if (!Array.isArray(window.SEED_TESTS)) return;
  if (window.SEED_TESTS.some(test => String(test.testCode || '').trim() === '39777')) return;

  window.SEED_TESTS.push({
    "id": "quest-39777-20261109",
    "testCode": "39777",
    "testName": "Erythrocyte Porphyrin (EP), Whole Blood",
    "specimenType": "Whole Blood",
    "drawContainer": "Royal Blue EDTA (purple stripe)",
    "alternativeContainer": "Lavender EDTA; Pink EDTA (K2)",
    "transportContainer": "Amber transport tube / protect from light",
    "preferredVolume": "1 mL whole blood",
    "minimumVolume": "0.5 mL",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated (cold packs)",
    "stability": "Room temperature: unacceptable; refrigerated: 14 days; frozen: 30 days",
    "spin": "No",
    "specialInstructions": "Collect in royal-blue EDTA, lavender EDTA, or pink K2 EDTA. Protect from light during collection, storage, and shipment. Without centrifuging, transfer 1 mL whole blood (minimum 0.5 mL) to an amber transport tube and refrigerate with cold packs. Do not transport at room temperature. When testing for lead as well, use royal-blue EDTA and test the lead specimen first to avoid contamination. Reject non-EDTA or clotted specimens. Test availability varies by Quest service area.",
    "status": "active",
    "source": "Quest Test Directory, verified 2026-11-09 https://testdirectory.questdiagnostics.com/test/test-detail/39777/?cc=MASTER"
  });
})();
