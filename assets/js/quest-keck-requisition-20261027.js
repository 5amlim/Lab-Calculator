/* Quest rheumatology requisition coverage, 2026-10-27.
 * Source: 2-page Keck Signature Care order scanned on 2026-10-26 (fax cover excluded).
 * Five requisition numbers are CPT billing codes, not orderable Quest test codes:
 * 82306 -> 17306, 86200 -> 11173, 86141 -> 10124, 86039 -> 249, 86431 -> 4418.
 * IMPORTANT: CPT 86039 describes ANA titer/pattern; Quest 249 is ANA IFA with reflex.
 * This is an approximate orderable match, NOT an exact ANA-only substitution.
 * Existing Quest catalog records are retained unchanged, including specimen rules and STAT flags.
 * No patient identifiers or order metadata are stored in this file.
 */
(() => {
  'use strict';
  if (!Array.isArray(window.SEED_TESTS)) return;
  const additions = [
    {
      id: 'quest-17306-20261027',
      testCode: '17306',
      testName: 'Vitamin D, 25-Hydroxy, Total, Immunoassay',
      specimenType: 'Serum',
      drawContainer: 'SST / Gold',
      alternativeContainer: 'Red Top serum',
      transportContainer: 'SST / Gold (spun)',
      preferredVolume: '1 mL serum',
      minimumVolume: '0.5 mL',
      transportTemperature: 'Room Temperature',
      transportTemperatureRaw: 'Verify regional Quest instructions before dispatch',
      stability: 'Verify current performing-laboratory stability',
      spin: 'Yes',
      specialInstructions: 'Serum 25-hydroxy vitamin D by immunoassay. If taking high-dose vitamin D2 prescription supplementation or needing D2/D3 separately, verify whether QuestAssureD LC/MS/MS code 92888 is more appropriate. Verify exact specimen acceptance and transport with Quest before collection. Requisition listed CPT 82306, which is not the Quest order code.',
      source: 'Quest vitamin D testing options: https://www.questdiagnostics.com/healthcare-professionals/about-our-tests/endocrine-disorders/vitamin-d ; directory https://testdirectory.questdiagnostics.com/test/test-detail/17306/?cc=MASTER',
      status: 'active'
    },
    {
      id: 'quest-11173-20261027',
      testCode: '11173',
      testName: 'Cyclic Citrullinated Peptide (CCP) Antibody (IgG)',
      specimenType: 'Serum',
      drawContainer: 'SST / Gold',
      alternativeContainer: 'Red Top serum',
      transportContainer: 'SST / Gold (spun)',
      preferredVolume: '1 mL serum',
      minimumVolume: '0.5 mL',
      transportTemperature: 'Room Temperature',
      transportTemperatureRaw: 'Room temperature; refrigerate if prolonged delay (verify site)',
      stability: 'Room 4 days; refrigerated 7 days; frozen 30 days (verify performing lab)',
      spin: 'Yes',
      specialInstructions: 'Separate serum from cells. Plasma, gross hemolysis and gross lipemia are unacceptable. Verify current test-specific directory requirements and performing site. Requisition CPT 86200 is a billing code, not the Quest order code.',
      source: 'Quest official 2026 test change: https://intellitestmanager.questdiagnostics.com/home/output/298704 ; Quest client lab guide https://www.rchsd.org/lab-test/cyclic-citrullinated-peptide-ccp-antibody-igg-11173x/',
      status: 'active'
    },
    {
      id: 'quest-10124-20261027',
      testCode: '10124',
      testName: 'hs-CRP (High Sensitivity C-Reactive Protein)',
      specimenType: 'Serum',
      drawContainer: 'SST / Gold',
      alternativeContainer: 'Red Top serum; green-top heparin or lavender EDTA plasma if accepted by performing lab',
      transportContainer: 'SST / Gold (spun)',
      preferredVolume: '1 mL serum or plasma',
      minimumVolume: '0.5 mL',
      transportTemperature: 'Room Temperature',
      transportTemperatureRaw: 'Room temperature',
      stability: 'Room 7 days; refrigerated 7 days; frozen stability varies by performing site',
      spin: 'Yes',
      specialInstructions: 'High-sensitivity CRP, NOT conventional CRP code 4420. Spin and separate serum/plasma as required by the actual collection tube and Quest service area. Requisition CPT 86141 is a billing code, not the Quest order code.',
      source: 'Quest official hs-CRP guide https://testdirectory.questdiagnostics.com/test/test-guides/TS_hs_CRP/hs-crp ; Quest client laboratory guide https://www.rchsd.org/lab-test/cardio-crp-10124/',
      status: 'active'
    },
    {
      id: 'quest-249-20261027',
      testCode: '249',
      testName: 'ANA Screen, IFA, with Reflex to Titer and Pattern',
      specimenType: 'Serum',
      drawContainer: 'SST / Gold',
      alternativeContainer: 'Red Top serum',
      transportContainer: 'Serum Transport Tube',
      preferredVolume: '1 mL serum',
      minimumVolume: '0.5 mL',
      transportTemperature: 'Room Temperature',
      transportTemperatureRaw: 'Room temperature',
      stability: 'Room 4 days; refrigerated 7 days; frozen 30 days',
      spin: 'Yes',
      specialInstructions: 'DO NOT ASSUME EQUIVALENCE TO ANA-ONLY ORDER. The requisition says ANA only and lists CPT 86039, which is used for ANA titer/pattern, frequently as a reflex component. Quest code 249 is an ANA screen by IFA that reflexes to titer/pattern if positive (with additional charge). Confirm provider intended ANA order and reflex before submitting. Quest specifies serum in transport tube; separate as required. Reject gross hemolysis/lipemia or contamination.',
      source: 'Quest official California/Nevada test directory https://testdirectory.questdiagnostics.com/test/test-detail/249/?cc=MET',
      status: 'active'
    },
    {
      id: 'quest-4418-20261027',
      testCode: '4418',
      testName: 'Rheumatoid Factor',
      specimenType: 'Serum',
      drawContainer: 'SST / Gold',
      alternativeContainer: 'Red Top serum',
      transportContainer: 'SST / Gold (spun)',
      preferredVolume: '1 mL serum',
      minimumVolume: '0.5 mL',
      transportTemperature: 'Room Temperature',
      transportTemperatureRaw: 'Room temperature; refrigerated is also acceptable',
      stability: 'Room 5 days; refrigerated 7 days; frozen 90 days (verify performing lab)',
      spin: 'Yes',
      specialInstructions: 'Serum rheumatoid factor (RF) test, distinct from rheumatoid factor IgA, IgG or IgM individual isotype assays. Verify the performing site specimen requirements. Requisition CPT 86431 is a billing code, not the Quest order code.',
      source: 'Quest official test guide https://testdirectory.questdiagnostics.com/test/test-guides/CF_SystemicSclerosis/systemic-sclerosis-laboratory-markers-for-diagnosis-and-prognosis?p=td ; Quest client lab guide https://www.rchsd.org/lab-test/rheumatoid-factor-4418/',
      status: 'active'
    }
  ];
  const codes = new Set(window.SEED_TESTS.map(test => String(test.testCode || '').trim()));
  for (const test of additions) {
    if (codes.has(test.testCode)) continue;
    window.SEED_TESTS.push(test);
    codes.add(test.testCode);
  }
})();
