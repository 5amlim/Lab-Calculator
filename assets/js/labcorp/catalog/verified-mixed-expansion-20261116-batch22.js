/* Labcorp official collectable serum, CSF and urine culture, batch22, 2026-11-16.
 * One validated pathway per test. No clinic slides, new kits or special preservatives.
 * Existing active/blocked records remain authoritative. */
(()=>{'use strict';if(!Array.isArray(window.SEED_TESTS))return;
const additions=[
  {
    "id": "labcorp-verified-20261116-batch22-140335",
    "status": "active",
    "testCode": "140335",
    "testName": "Neopterin",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "alternativeContainer": "",
    "transportContainer": "SST / Gold (spun)",
    "preferredVolume": "0.8 mL serum",
    "minimumVolume": "0.3 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "Yes",
    "stability": "Refrigerated; specific interval not listed on official directory page",
    "specialLabeling": "Label serum specimen and collection date/time",
    "specialInstructions": "Collect SERUM into SST / Gold; allow to clot, centrifuge and submit ORIGINAL fully spun SST with gel barrier. Refrigerate immediately and PROTECT FROM SUNLIGHT / UV light during storage and transport using opaque wrapping or a light-protected specimen bag. Do not expose to ambient sunlight. A red-top or EDTA plasma alternative requires an independently validated transfer pathway and is not configured here. Verify current receiving-lab acceptance and light protection requirements.",
    "source": "Labcorp official test directory, reviewed 2026-11-16 • https://www.labcorp.com/tests/140335/neopterin"
  },
  {
    "id": "labcorp-verified-20261116-batch22-620009",
    "status": "active",
    "testCode": "620009",
    "testName": "NeuroSURE Metabolites: Neopterin, CSF",
    "specimenType": "CSF",
    "drawContainer": "Transport Tube",
    "alternativeContainer": "",
    "transportContainer": "Transport Tube",
    "preferredVolume": "1 mL CSF",
    "minimumVolume": "0.5 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "spin": "No",
    "stability": "Room unacceptable; refrigerated 24 hours; frozen -20°C 72 hours, -80°C indefinitely; no freeze/thaw",
    "specialLabeling": "Label specimen source and collection date/time",
    "specialInstructions": "Qualified procedural clinician collects CSF directly into a single sterile screw-cap Transport Tube. Submit ORIGINAL tube with NO spin, aliquot or transfer. FREEZE as soon as possible after collection, protect against thawing and ship frozen; avoid bloody CSF. At -20°C, manufacturer states only 72-hour stability, so arrange immediate reliable frozen transfer and confirm receiving-lab transit schedule BEFORE collection, especially weekends. The source page says that this CSF Neopterin assay can be ordered without the specialized neurotransmitter CSF collection kit; do not substitute when a different assay requires a kit.",
    "source": "Labcorp official test directory, reviewed 2026-11-16 • https://www.labcorp.com/tests/620009/neurosure-metabolites-neopterin-csf"
  },
  {
    "id": "labcorp-verified-20261116-batch22-182776",
    "status": "active",
    "testCode": "182776",
    "testName": "Yeast Only, Culture (Urine Collection Route)",
    "specimenType": "Urine",
    "drawContainer": "Sterile cup",
    "alternativeContainer": "",
    "transportContainer": "Sterile cup",
    "preferredVolume": "Unpreserved clean-catch urine in sterile screw-cap cup (volume not specified)",
    "minimumVolume": "Not specified for urine route",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "stability": "Room temperature; specimens with prolonged transit over approximately 72 hours may be rejected",
    "specialLabeling": "Label specimen source and collection date/time",
    "specialInstructions": "Use this record ONLY for the URINE specimen collection route. Patient collects clean-catch midstream URINE into a sterile leakproof Sterile cup with NO additives, preservatives, or transport medium. Submit ORIGINAL capped cup unspun at room temperature; do not transfer. Label URINE and collection date/time. For blood, wound, respiratory, vaginal, skin, nail, or other yeast-culture specimens, follow official specimen-specific instructions rather than the urine workflow. Do not submit microscopy slides from the clinic; yeast identification is a laboratory reflex when yeast is isolated.",
    "source": "Labcorp official test directory, reviewed 2026-11-16 • https://www.labcorp.com/tests/182776/yeast-only-culture"
  }
];
for(const record of additions){const prior=window.SEED_TESTS.find(t=>String(t.testCode||'').trim()===record.testCode);if(!prior){window.SEED_TESTS.push(record);continue;}if(['pending','reference'].includes(prior.status))Object.assign(prior,record,{id:prior.id||record.id});}
})();
