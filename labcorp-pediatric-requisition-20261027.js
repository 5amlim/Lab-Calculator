/* Pediatric requisition test coverage, 2026-10-27.
 * Added only entries missing from Labcorp test dataset; pre-existing requisition codes remain untouched.
 * Historical/order-code mismatch entries and Prometheus sendouts are searchable but BLOCKED
 * so the calculator cannot generate an unsafe Labcorp collection plan.
 * No patient identifiers or other requisition PHI are stored here.
 */
(() => {
  'use strict';
  const entry = (code, name, fields) => ({
    id: 'labcorp-' + code.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    testCode: code,
    testName: name,
    specimenType: fields.specimenType || 'Serum',
    drawContainer: fields.drawContainer || 'SST / Gold',
    alternativeContainer: fields.alternativeContainer || '',
    transportContainer: fields.transportContainer || 'SST / Gold (spun)',
    preferredVolume: fields.preferredVolume || '',
    minimumVolume: fields.minimumVolume || '',
    transportTemperature: fields.transportTemperature || 'Room Temperature',
    transportTemperatureRaw: fields.transportTemperature || 'Room Temperature',
    stability: fields.stability || '',
    spin: fields.spin || 'Yes',
    specialInstructions: fields.specialInstructions || '',
    specialLabeling: fields.specialLabeling || '',
    fastingStatus: fields.fastingStatus || '',
    fastingInstructions: fields.fastingInstructions || '',
    status: fields.status || 'active',
    source: fields.source || '',
    additionalDrawRequirements: fields.additionalDrawRequirements || []
  });
  const legacy = (code, name, warning, source) => entry(code, name + ' (historical code, verify)', {
    specimenType: 'Other',
    drawContainer: 'Do not collect',
    transportContainer: 'Do not collect',
    transportTemperature: 'Not specified',
    spin: 'No',
    specialInstructions: 'DO NOT COLLECT under this historical/unverified code. ' + warning,
    status: 'blocked',
    source
  });
  const additions = [
    entry('373632', 'Lipid Profile, Fasting, Pediatric', {
      specimenType: 'Serum', drawContainer: 'SST / Gold',
      alternativeContainer: 'Red Top serum or green-top lithium heparin plasma',
      transportContainer: 'SST / Gold (spun)',
      preferredVolume: '2 mL serum or plasma', minimumVolume: '0.7 mL',
      stability: 'Room temperature, refrigerated or frozen: 7 days',
      specialInstructions: 'Separate serum or plasma from cells within 45 minutes. Do not use EDTA, citrate or oxalate plasma. Reject hemolyzed specimen.',
      fastingStatus: 'required',
      fastingInstructions: 'Labcorp pediatric fasting lipid profile: fast 12-14 hours before collection.',
      source: 'Labcorp official test directory • https://www.labcorp.com/tests/373632/lipid-profile-fasting-pediatric'
    }),
    entry('717009', 'Lead, Venous Blood, Pediatric', {
      specimenType: 'Whole Blood',
      drawContainer: 'Royal Blue EDTA',
      alternativeContainer: 'Tan-top lead-free tube',
      transportContainer: 'Royal Blue EDTA (original tube)',
      preferredVolume: '1 mL whole blood (venous)', minimumVolume: '0.5 mL',
      stability: 'Room temperature or refrigerated: 14 days',
      spin: 'No',
      specialInstructions: 'Venous collection only. Use royal blue EDTA or tan lead-free tube; submit original tube. Mix thoroughly to prevent clotting. Capillary Microtainer specimens and clots are rejected.',
      source: 'Labcorp official test directory • https://www.labcorp.com/tests/717009/lead-venous-blood-pediatric'
    }),
    entry('002295', 'Immunoglobulins, Quantitative, IgA, IgE, IgG and IgM', {
      specimenType: 'Serum', drawContainer: 'SST / Gold',
      alternativeContainer: 'Red Top serum',
      transportContainer: 'SST / Gold (spun)',
      preferredVolume: '3 mL serum',
      stability: 'Room temperature, refrigerated or frozen: 14 days',
      specialInstructions: 'State patient age on requisition. Ask about high-dose biotin; Labcorp advises withholding for at least 72 hours when clinically appropriate. For suspected cryoglobulins/macroglobulins, special warm handling is required. Avoid routine refrigeration before separation for suspected cold agglutinins.',
      source: 'Labcorp official test directory • https://www.labcorp.com/tests/002295/immunoglobulins-quantitative-iga-ige-igg-igm'
    }),
    entry('104018', 'Cortisol, AM', {
      specimenType: 'Serum', drawContainer: 'SST / Gold',
      alternativeContainer: 'Red Top serum',
      transportContainer: 'SST / Gold (spun)',
      preferredVolume: '1 mL serum', minimumVolume: '0.7 mL',
      stability: 'Room temperature, refrigerated or frozen: 14 days',
      specialLabeling: 'Document collection time and date',
      specialInstructions: 'Record collection date and time. Red top requires serum separation and transfer into a plastic transport tube. Citrate plasma is rejected. Ask about high-dose biotin; follow prescriber guidance on withholding at least 72 hours where appropriate.',
      source: 'Labcorp official test directory • https://www.labcorp.com/tests/104018/cortisol-am'
    }),
    entry('503660', 'Insulin-like Growth Factor 1 (IGF-1), Pediatric With Z Score', {
      specimenType: 'Serum', drawContainer: 'SST / Gold',
      alternativeContainer: 'Red Top serum',
      transportContainer: 'Frozen Transport Tube',
      preferredVolume: '0.5 mL serum', minimumVolume: '0.1 mL',
      transportTemperature: 'Frozen',
      stability: 'Room temperature or refrigerated 2 days; frozen 2 years',
      specialLabeling: 'Patient sex and date of birth are needed for Z score',
      specialInstructions: 'Separate serum from cells within 45 minutes. Transfer to a labeled plastic frozen transport tube before freezing. Submit a dedicated separate frozen aliquot for this test, do not pool with other frozen tests. Plasma is unacceptable.',
      source: 'Labcorp official test directory • https://www.labcorp.com/tests/503660/insulin-like-growth-factor-1-igf-1-pediatric-with-z-score-endocrine-sciences'
    }),
    entry('716720', 'Organic Acid Analysis, Urine', {
      specimenType: 'Urine', drawContainer: 'Sterile Cup',
      transportContainer: 'Sterile Cup',
      preferredVolume: '10 mL random urine', minimumVolume: '3 mL',
      transportTemperature: 'Frozen',
      stability: 'Frozen: 12 months',
      spin: 'No',
      specialInstructions: 'Collect random unpreserved urine in a clean, leakproof plastic urine container; freeze specimen for transport. No preservative. Do not pool with urine specimens requiring additives. Very dilute specimens may be rejected.',
      source: 'Labcorp official test directory • https://www.labcorp.com/tests/716720/organic-acid-analysis-urine'
    }),
    entry('240610', 'Epstein-Barr Virus (EBV) Antibody Profile', {
      specimenType: 'Serum', drawContainer: 'SST / Gold',
      alternativeContainer: 'Red Top serum',
      transportContainer: 'SST / Gold (spun)',
      preferredVolume: '2 mL serum', minimumVolume: '0.5 mL',
      stability: 'Room temperature, refrigerated or frozen: 14 days',
      specialInstructions: 'Current Labcorp EBV profile measures EBV VCA IgG, VCA IgM and EBNA antibodies. This is NOT an exact substitute for historical acute infection profile 216655, which also listed early antigen IgG; confirm intended panel with provider.',
      source: 'Labcorp official test directory • https://www.labcorp.com/tests/240610/epstein-barr-virus-ebv-antibody-profile'
    }),
    entry('164226', 'Lyme Antibodies, Modified 2-Tier Testing Profile With Reflex', {
      specimenType: 'Serum', drawContainer: 'SST / Gold',
      alternativeContainer: 'Red-top serum or EDTA/lithium heparin plasma',
      transportContainer: 'SST / Gold (spun)',
      preferredVolume: '2 mL serum or plasma', minimumVolume: '0.75 mL',
      stability: 'Room temperature, refrigerated or frozen: 14 days',
      specialInstructions: 'Current FDA-cleared modified 2-tier Lyme serology; reactive total antibody reflexes to IgG and IgM immunoassays. NOT a Western blot reflex and not identical to older code 258004. If no gel-barrier tube is used, separate serum/plasma and transfer to plastic transport tube; never freeze a gel-barrier tube.',
      source: 'Labcorp official test directory • https://www.labcorp.com/tests/164226/lyme-antibodies-modified-2-tier-testing-profile-serum-plasma'
    }),
    legacy('216655', 'EBV Acute Infection Antibodies Profile',
      'Historical profile includes early antigen IgG and is not necessarily equivalent to currently offered 240610; confirm active order code and panel with Labcorp before collection.',
      'Legacy Labcorp pediatric test list • https://www.labcorp.com/content/dam/labcorp/files/providers-launch/L21744%20Pediatric%20Test%20List.pdf'),
    legacy('096288', 'Anti-DNase B Titer',
      'The current official Anti-DNase B antibody code is 096289, already available in this calculator. Verify and re-order as 096289; 096288 is not confirmed in the current Labcorp directory.',
      'Labcorp official active code • https://www.labcorp.com/tests/096289/anti-dnase-b-streptococcal-antibodies'),
    legacy('182873', 'QuantiFERON-TB Gold',
      'This is an older three-tube QuantiFERON code. Current Labcorp 182879 QuantiFERON-TB Gold Plus requires FOUR specialized tubes, room-temperature transport and time-sensitive delivery. Never use three-tube or refrigerated collection instructions for 182879. Confirm the order.',
      'Labcorp official current code • https://www.labcorp.com/tests/182879/quantiferon-tb-gold-plus'),
    legacy('258004', 'Lyme Disease Antibodies With Western Blot Reflex',
      'Historical Lyme reflex code not verified as currently orderable. Labcorp now lists 164226 modified two-tier reflex serology; that is a different algorithm, NOT a direct Western blot substitute. Confirm required testing and active order code.',
      'Current Labcorp Lyme testing • https://www.labcorp.com/tests/164226/lyme-antibodies-modified-2-tier-testing-profile-serum-plasma'),
    entry('PROM-CELIAC-SEROLOGY', 'Celiac Serology (Prometheus, external lab only)', {
      specimenType: 'Serum', drawContainer: 'SST / Gold',
      alternativeContainer: 'Red Top serum',
      transportContainer: 'SST / Gold (spun)',
      preferredVolume: '2 mL serum (Prometheus pediatric 0.5 mL)',
      transportTemperature: 'Refrigerated',
      stability: 'Ambient 7 days; refrigerated 30 days; do not freeze',
      spin: 'Yes', status: 'blocked',
      specialInstructions: 'EXTERNAL PROMETHEUS REFERENCE ONLY: not a Labcorp orderable code. The identifier here is a calculator reference key, NOT a laboratory order code. Verify Prometheus ordering and sendout instructions before collection. Do not confuse with Labcorp celiac antibody panel 165126.',
      source: 'Prometheus official requisition instructions • https://prometheuslabs.com/wp-content/uploads/2025/03/DX_1001_v14_Precision-Guided_Care_Requisition_FILLABLE_20250324.pdf'
    }),
    entry('PROM-CELIAC-PLUS', 'Celiac PLUS (Prometheus, external lab only)', {
      specimenType: 'Serum + Whole Blood', drawContainer: 'SST / Gold',
      alternativeContainer: 'Red Top serum',
      transportContainer: 'SST / Gold (spun)',
      preferredVolume: '2 mL serum AND 2 mL EDTA whole blood',
      transportTemperature: 'Refrigerated',
      stability: 'Ambient 7 days; refrigerated 30 days; do not freeze',
      spin: 'Yes', status: 'blocked',
      additionalDrawRequirements: [{
        container: 'Lavender EDTA', specimenType: 'Whole Blood',
        preferredVolume: '2 mL EDTA whole blood',
        transportContainer: 'Lavender EDTA (original tube)',
        transportTemperature: 'Refrigerated', spin: 'No',
        specialInstructions: 'Required paired EDTA whole-blood specimen for external Prometheus Celiac PLUS.'
      }],
      specialInstructions: 'EXTERNAL PROMETHEUS REFERENCE ONLY: not a Labcorp orderable code. The identifier here is a calculator reference key, NOT a laboratory order code. Requires paired serum and whole blood; do not freeze. Verify outside-lab account, kit, requisition and courier before collection.',
      source: 'Prometheus official requisition instructions • https://prometheuslabs.com/wp-content/uploads/2025/03/DX_1001_v14_Precision-Guided_Care_Requisition_FILLABLE_20250324.pdf'
    })
  ];
  const catalog = Array.isArray(window.SEED_TESTS) ? window.SEED_TESTS : [];
  const knownCodes = new Set(catalog.map(test => String(test.testCode || '').trim()));
  for (const test of additions) {
    if (!knownCodes.has(test.testCode)) {
      catalog.push(test);
      knownCodes.add(test.testCode);
    }
  }
  window.SEED_TESTS = catalog;
})();
