/* Quest verified additions November 15, 2026 batch 7.
 * Distinguish CSF from synovial fluid; group only matching original sterile cups,
 * keep whole blood unspun, and never combine paired serum with CSF.
 * No slides, smears, acid preservatives, or specialty unsupported collection kits.
 */
(()=>{'use strict';
 if(!Array.isArray(window.SEED_TESTS))return;
 const additions=[
  {
    "id": "quest-verified-20261115-batch7-1687",
    "testCode": "1687",
    "testName": "LD, CSF",
    "specimenType": "CSF",
    "drawContainer": "Sterile cup",
    "transportContainer": "Sterile cup",
    "preferredVolume": "1 mL CSF",
    "minimumVolume": "0.5 mL",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "stability": "Room 7 days; refrigerated 48 hours; frozen unacceptable",
    "spin": "No",
    "specialLabeling": "Label CSF, collection date and time",
    "specialInstructions": "PROVIDER-COLLECTED CSF ONLY. Collect CSF without additives in a sterile leakproof screw-cap cup and submit the original container at room temperature. Label CSF, date and time. Keep CSF separate from other body fluids and collection times. Do not freeze. Verify the receiving Quest service-area code and handling.",
    "status": "active",
    "source": "Quest official test directory, reviewed 2026-11-15 • https://testdirectory.questdiagnostics.com/test/test-detail/1687/ld-csf?cc=MASTER"
  },
  {
    "id": "quest-verified-20261115-batch7-39218",
    "testCode": "39218",
    "testName": "Borrelia Species DNA, Real-Time PCR, with Reflexes, Synovial Fluid/CSF",
    "specimenType": "CSF",
    "drawContainer": "Sterile cup",
    "transportContainer": "Sterile cup",
    "preferredVolume": "3 mL CSF",
    "minimumVolume": "0.5 mL",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated (cold packs)",
    "stability": "Room 72 hours; refrigerated 7 days; frozen 30 days",
    "spin": "No",
    "specialLabeling": "Label CSF, collection date and time",
    "specialInstructions": "PROVIDER-COLLECTED FLUID. Calculator defaults to CSF; Quest also accepts synovial fluid but the specimen source must match the physician order. Submit original unpreserved CSF sterile cup refrigerated, properly labeled as CSF. Never pool CSF with synovial fluid or other sources. Confirm receiving Quest service-area acceptance.",
    "status": "active",
    "source": "Quest official test directory, reviewed 2026-11-15 • https://testdirectory.questdiagnostics.com/test/test-detail/39218?cc=MASTER"
  },
  {
    "id": "quest-verified-20261115-batch7-93795",
    "testCode": "93795",
    "testName": "Borrelia miyamotoi DNA, Real-Time PCR, Miscellaneous",
    "specimenType": "CSF",
    "drawContainer": "Sterile cup",
    "transportContainer": "Sterile cup",
    "preferredVolume": "1 mL CSF",
    "minimumVolume": "0.3 mL",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated (cold packs)",
    "stability": "CSF room 48 hours; refrigerated 7 days; frozen 30 days",
    "spin": "No",
    "specialLabeling": "Label CSF, collection date and time",
    "specialInstructions": "PROVIDER-COLLECTED CSF. Quest accepts CSF or synovial fluid; calculator defaults to CSF collected in a sterile leakproof screw-cap cup. Submit original CSF cup refrigerated, labeled by precise specimen source, date and time. Do not pool CSF and synovial specimens. EDTA whole blood is a Quest alternate route but requires a separate specimen-specific order review.",
    "status": "active",
    "source": "Quest official test directory, reviewed 2026-11-15 • https://testdirectory.questdiagnostics.com/test/test-detail/93795?cc=MASTER"
  },
  {
    "id": "quest-verified-20261115-batch7-17603",
    "testCode": "17603",
    "testName": "Lipase, JP Drainage",
    "specimenType": "JP Drainage",
    "drawContainer": "Sterile cup",
    "transportContainer": "Sterile cup",
    "preferredVolume": "2 mL JP drainage fluid",
    "minimumVolume": "Verify minimum with receiving Quest lab",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "stability": "Room 7 days; refrigerated 14 days; frozen 28 days",
    "spin": "No",
    "specialLabeling": "Label JP Drainage, collection date and time",
    "specialInstructions": "PROVIDER-COLLECTED JP DRAINAGE. Collect into sterile leakproof plastic screw-cap cup without preservative. Submit in the original labeled cup. Freeze promptly and ship frozen on dry ice. Do not combine with other fluid sources, collection times, or patients. Confirm local Quest service-area acceptance and exact volume before collection.",
    "source": "Quest official test directory, reviewed 2026-11-15 • https://testdirectory.questdiagnostics.com/test/test-detail/17603/lipase-jp-drainage?cc=MASTER",
    "status": "active"
  },
  {
    "id": "quest-verified-20261115-batch7-17604",
    "testCode": "17604",
    "testName": "Lipase, Pancreatic Fluid",
    "specimenType": "Pancreatic Fluid",
    "drawContainer": "Sterile cup",
    "transportContainer": "Sterile cup",
    "preferredVolume": "2 mL pancreatic fluid",
    "minimumVolume": "Verify minimum with receiving Quest lab",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "stability": "Room 48 hours; refrigerated 14 days; frozen 28 days",
    "spin": "No",
    "specialLabeling": "Label Pancreatic Fluid, collection date and time",
    "specialInstructions": "PROVIDER-COLLECTED PANCREATIC FLUID. Collect into sterile leakproof plastic screw-cap cup without preservative. Submit in the original labeled cup. Freeze promptly and ship frozen on dry ice. Do not combine with other fluid sources, collection times, or patients. Confirm local Quest service-area acceptance and exact volume before collection.",
    "source": "Quest official test directory, reviewed 2026-11-15 • https://testdirectory.questdiagnostics.com/test/test-detail/17604/lipase-pancreatic-fluid?cc=MASTER",
    "status": "active"
  }
];
 const known=new Set(window.SEED_TESTS.map(t=>String(t.testCode||'').trim()));
 for(const t of additions){
   if(known.has(t.testCode))continue;
   window.SEED_TESTS.push(t);
   known.add(t.testCode);
 }
})();
