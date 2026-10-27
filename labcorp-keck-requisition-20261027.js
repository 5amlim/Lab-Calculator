/* Labcorp equivalent for Keck rheumatology requisition, 2026-10-27.
 * Labcorp codes 081950 Vitamin D; 164914 anti-CCP IgG/IgA;
 * 120766 hs-CRP; and 006502 rheumatoid factor already exist.
 * Adds only previously missing 164947. Does not reuse Quest codes
 * or represent Quest anti-CCP IgG-only as identical to Labcorp IgG/IgA.
 * ANA options 164855 (qualitative multiplex) and 520075 (RDL IFA)
 * remain distinct, and the prescriber must confirm the intended ANA method/reflex.
 * No patient-identifying information stored here.
 */
(() => {
  'use strict';
  if (!Array.isArray(window.SEED_TESTS)) return;
  const test = {
    id: 'labcorp-164947',
    testCode: '164947',
    testName: 'ANA by IFA, Reflex to Titer and Pattern',
    specimenType: 'Serum',
    drawContainer: 'SST / Gold',
    alternativeContainer: 'Red Top serum',
    transportContainer: 'SST / Gold (spun)',
    preferredVolume: '1 mL serum',
    minimumVolume: '0.3 mL',
    transportTemperature: 'Room Temperature',
    transportTemperatureRaw: 'Room Temperature',
    stability: 'Room temperature 14 days; refrigerated 14 days; frozen 14 days; freeze/thaw stable x6 (directory updated October 26, 2026)',
    spin: 'Yes',
    specialInstructions: 'Labcorp 164947 uses ANA immunofluorescence (IFA), reflexing to titer and pattern when indicated. Not the same as ANA Direct qualitative multiplex 164855 or RDL IFA 520075. The referring requisition described ANA only and showed CPT 86039; confirm the intended ANA method and reflex with the ordering provider before collection. Gel-barrier SST or red-top serum; if red-top is used, separate serum into a labeled plastic transport tube. Reject hemolysis, lipemia and gross bacterial contamination. Verify current performing-lab requirements.',
    fastingStatus: '',
    fastingInstructions: '',
    status: 'active',
    source: 'Labcorp official test directory, last updated 2026-10-26 • https://www.labcorp.com/tests/164947/ana-by-ifa-reflex-to-titer-and-pattern'
  };
  if (!window.SEED_TESTS.some(row => String(row.testCode || '').trim() === test.testCode)) {
    window.SEED_TESTS.push(test);
  }
})();
