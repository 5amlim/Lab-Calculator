/* Quest source-verified 2026-11-17: CSF IgM, CSF pyruvate, 24-hour cortisol/cortisone.
 * Only three new/previously-reference codes. Preserve original-vs-transfer container
 * identities, frozen bag isolation, 24h source labels and no acid-preserved urine. */
(()=>{'use strict';if(!Array.isArray(window.SEED_TESTS))return;
const additions=[
  {
    "id": "quest-validated-extra-20261117-4449",
    "testCode": "4449",
    "testName": "IgM, CSF",
    "status": "active",
    "specimenType": "CSF",
    "drawContainer": "Sterile cup",
    "alternativeContainer": "",
    "transportContainer": "Sterile cup",
    "preferredVolume": "1 mL CSF",
    "minimumVolume": "0.5 mL CSF",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "spin": "No",
    "stability": "Room temperature 72 hours; refrigerated 7 days; frozen 90 days; Quest specifies FROZEN transport.",
    "specialLabeling": "Label CSF",
    "specialInstructions": "Qualified procedural clinician obtains CSF into an additive-free sterile, leak-proof, FREEZER-SAFE original Sterile cup (or a sterile leakproof CSF collection vial accepted by the receiving lab). Preferred 1 mL, minimum 0.5 mL. Cap securely and FREEZE the CSF specimen for Quest transport. Submit the SAME ORIGINAL vessel without spinning, slides, preservatives, or an invented serum/plasma transfer. Keep in the frozen bag on dry ice. Confirm Quest service-area acceptance: MASTER notes code not offered by San Juan Capistrano.",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/4449/igm-csf?cc=MASTER&p=r",
    "searchAliases": [
      "CSF IgM",
      "immunoglobulin M cerebrospinal fluid",
      "spinal fluid IgM",
      "CSF immunoglobulin M nephelometry"
    ],
    "clinicalCategories": [
      "neurology",
      "immunology",
      "csf"
    ]
  },
  {
    "id": "quest-validated-extra-20261117-38363",
    "testCode": "38363",
    "testName": "Pyruvate, CSF",
    "status": "active",
    "specimenType": "CSF",
    "drawContainer": "Sterile cup",
    "alternativeContainer": "",
    "transportContainer": "Transport Tube",
    "preferredVolume": "2 mL CSF",
    "minimumVolume": "2 mL CSF planned (Quest does not publish a lower minimum in MASTER; confirm service area)",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "spin": "No",
    "stability": "Room temperature UNACCEPTABLE; refrigerated stability 7 days; frozen 6 months; transport must be FROZEN.",
    "specialLabeling": "Label CSF · STERILE CUP SOURCE",
    "specialInstructions": "Qualified clinician collects 2 mL CSF in a sterile leakproof Sterile cup. Immediately place 2 mL into a labeled additive-free sterile plastic screw-cap Transport Tube suitable for freezing, then FREEZE and ship FROZEN on dry ice. No centrifugation, preservative, gel, slide, blood tube, or holding at ROOM TEMPERATURE. The original collection Sterile cup is NOT a second submitted container. The Quest MASTER directory does not publish a smaller minimum, so plan the full 2 mL and verify Quest regional acceptance before scheduling. Quest notes not offered by SJC.",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/38363/pyruvate-csf?cc=MASTER&p=r",
    "searchAliases": [
      "CSF pyruvic acid",
      "spinal fluid pyruvate",
      "cerebrospinal pyruvate",
      "pyruvate cerebrospinal fluid"
    ],
    "clinicalCategories": [
      "neurology",
      "metabolic",
      "csf"
    ]
  },
  {
    "id": "quest-validated-extra-20261117-37355",
    "testCode": "37355",
    "testName": "Cortisol, Free and Cortisone, 24-Hour Urine with Creatinine",
    "status": "active",
    "specimenType": "24-Hour Urine",
    "drawContainer": "24-Hour Urine Container",
    "alternativeContainer": "",
    "transportContainer": "Sterile cup",
    "preferredVolume": "10 mL well-mixed 24-hour urine aliquot",
    "minimumVolume": "2.6 mL aliquot",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "stability": "Room temperature 14 days; refrigerated 21 days; frozen 90 days; Quest transport REFRIGERATED.",
    "specialLabeling": "Label 24-HOUR URINE · TOTAL 24-HOUR VOLUME · COLLECTION DURATION",
    "specialInstructions": "Perform a complete 24-HOUR URINE COLLECTION WITHOUT PRESERVATIVE in a 24-Hour Urine Container; keep the collection jug REFRIGERATED for the entire collection. Mix the completed sample thoroughly, record TOTAL 24-hour urine volume plus start/end time on requisition and aliquot label, then submit 10 mL (minimum 2.6 mL) in one clean leakproof plastic Sterile cup as a separately labeled aliquot. Transport the ALIQUOT REFRIGERATED; the large source jug is NOT a submitted transport container. Do NOT use boric acid, glacial acetic acid, 6N HCl or the gray urine culture preservative. Do not relabel a random urine specimen as a 24-hour collection; random-urine results lack the 24-hour reference range. Verify regional Quest account before collecting; SJC listed as not offering.",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/37355/cortisol-free-and-cortisone-24-hour-urine-with-creatinine?cc=MASTER&p=r",
    "searchAliases": [
      "24h urinary free cortisol cortisone creatinine",
      "urinary cortisol cortisone ratio",
      "Cushing 24 hour urine combination",
      "24-hour cortisol free and cortisone"
    ],
    "clinicalCategories": [
      "endocrinology",
      "metabolic",
      "urinary"
    ],
    "preparationInstructions": "24-hour urine collection: no chemical preservative; refrigerate throughout and record total 24-hour volume and start/end times."
  }
];
for(const candidate of additions){
  const existing=window.SEED_TESTS.find(x=>String(x.testCode||'').trim()===candidate.testCode);
  if(!existing){window.SEED_TESTS.push(candidate);continue;}
  if(existing.status==='reference'||existing.status==='pending')
    Object.assign(existing,candidate,{id:existing.id||candidate.id});
}
})();
