/* Quest feasible frozen urine/CSF amino-acid routes, batch26 (2026-11-16).
 * Source-specific specimens, original approved container, no slide/acid/special kit.
 * Already active/blocked Quest records remain untouched. Regional acceptance required. */
(()=>{'use strict';if(!Array.isArray(window.SEED_TESTS))return;
const additions=[
  {
    "id": "quest-verified-20261116-batch26-36183",
    "status": "active",
    "testCode": "36183",
    "testName": "Amino Acid Analysis, LC/MS, Urine",
    "specimenType": "Urine",
    "drawContainer": "Sterile cup",
    "alternativeContainer": "",
    "transportContainer": "Sterile cup",
    "preferredVolume": "2 mL unpreserved random urine",
    "minimumVolume": "0.5 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "stability": "Room unacceptable; refrigerated 7 days; frozen 28 days",
    "spin": "No",
    "specialLabeling": "Label collection date/time",
    "specialInstructions": "Collect RANDOM URINE without preservative into the ORIGINAL sterile leakproof Sterile cup. Submit original cup unspun with no transfer. FREEZE promptly and ship frozen; never ship room temperature. Urine pH below 2 is rejected. Record collection date/time, patient age, sex, clinical history, tentative diagnosis and medications/diet/infant formula during prior 3 days as required for interpretation. Quest Nichols Institute San Juan Capistrano (IFD) does not offer this code; confirm receiving service area.",
    "source": "Quest official test-specific directory, verified 2026-11-16 • https://testdirectory.questdiagnostics.com/test/test-detail/36183?cc=MASTER"
  },
  {
    "id": "quest-verified-20261116-batch26-29881",
    "status": "active",
    "testCode": "29881",
    "testName": "Amino Acid Analysis, LC/MS, CSF",
    "specimenType": "CSF",
    "drawContainer": "Transport Tube",
    "alternativeContainer": "",
    "transportContainer": "Transport Tube",
    "preferredVolume": "1 mL CSF",
    "minimumVolume": "0.25 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "stability": "Room unacceptable; refrigerated 7 days; frozen 28 days",
    "spin": "No",
    "specialLabeling": "Label collection date/time",
    "specialInstructions": "Qualified clinician obtains CSF using a sterile procedure directly into ORIGINAL sterile screw-cap Transport Tube. Submit original tube unspun, with no transfer, FROZEN below -20°C. Avoid hemolysis. Record collection date/time and patient age for reference-range interpretation. Do NOT use the first CSF tube if a separate clinical testing protocol requires otherwise. Quest Nichols Institute San Juan Capistrano (IFD) does not offer this code; confirm receiving service-area availability.",
    "source": "Quest official test-specific directory, verified 2026-11-16 • https://testdirectory.questdiagnostics.com/test/test-detail/29881?cc=MASTER"
  }
];
for(const record of additions){const prior=window.SEED_TESTS.find(t=>String(t.testCode||'').trim()===record.testCode);if(!prior){window.SEED_TESTS.push(record);continue;}if(['pending','reference'].includes(prior.status))Object.assign(prior,record,{id:prior.id||record.id});}
})();
