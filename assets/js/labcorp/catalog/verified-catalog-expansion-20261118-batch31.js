/* Directly verified Labcorp catalog order codes: batch31. Preserve active and blocked records. Use existing container / specimen grouping; no unsupported collection routes. */
(()=>{'use strict';if(!Array.isArray(window.SEED_TESTS))return;
const additions=[
  {
    "id": "labcorp-verified-20261118-batch31-505890",
    "testCode": "505890",
    "testName": "Abatacept and Anti-Abatacept Antibody, DoseASSURE™ ABT",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "alternativeContainer": "Red Top",
    "transportContainer": "Transport Tube",
    "preferredVolume": "2.0 mL serum",
    "minimumVolume": "1.0 mL serum",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "Yes",
    "stability": "Room, refrigerated or frozen: 14 days; freeze/thaw x6",
    "specialLabeling": "",
    "specialInstructions": "Collect serum just before next dose (trough). Allow clotting for 30–60 minutes, centrifuge and separate within 2 hours. Transfer serum to a plastic Transport Tube, refrigerate for shipment. EDTA plasma is unacceptable. Ask about high-dose biotin; Labcorp recommends withholding for 72 hours before collection, with clinician guidance. Serum pathway only.",
    "source": "Labcorp test-specific directory, reviewed 2026-11-18 • https://www.labcorp.com/tests/505890/abatacept-and-anti-abatacept-antibody-doseassure-abt",
    "searchAliases": [
      "abatacept",
      "orencia",
      "doseassure abt"
    ],
    "clinicalCategories": [
      "tdm",
      "autoimmune"
    ]
  },
  {
    "id": "labcorp-verified-20261118-batch31-505895",
    "testCode": "505895",
    "testName": "Risankizumab and Anti-Risankizumab Antibody, DoseASSURE™ RSK",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "alternativeContainer": "Red Top",
    "transportContainer": "Transport Tube",
    "preferredVolume": "2.0 mL serum",
    "minimumVolume": "1.0 mL serum",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "Yes",
    "stability": "Room 7 days; refrigerated or frozen 14 days; freeze/thaw x6",
    "specialLabeling": "",
    "specialInstructions": "Allow clotting for 30–60 minutes. Centrifuge and transfer serum to a plastic Transport Tube within 2 hours; ship refrigerated. Reject gross hemolysis or lipemia. Ask about high-dose biotin; Labcorp recommends withholding for 72 hours before collection, with clinician guidance.",
    "source": "Labcorp test-specific directory, reviewed 2026-11-18 • https://www.labcorp.com/tests/505895/risankizumab-and-anti-risankizumab-antibody-doseassure-rsk",
    "searchAliases": [
      "risankizumab",
      "skyrizi",
      "doseassure rsk"
    ],
    "clinicalCategories": [
      "tdm",
      "autoimmune",
      "gi"
    ]
  },
  {
    "id": "labcorp-verified-20261118-batch31-811984",
    "testCode": "811984",
    "testName": "Acetazolamide, Serum or Plasma",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "Red Top",
    "alternativeContainer": "",
    "transportContainer": "Transport Tube",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "0.5 mL serum",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "Yes",
    "stability": "Room temperature for transport under 3 days; refrigerate or freeze for longer storage",
    "specialLabeling": "",
    "specialInstructions": "Use plain red-top serum only for this configured route. Do not use SST or any gel-barrier tube. Allow to clot, centrifuge and transfer separated serum to plastic Transport Tube within 2 hours. Trough levels are most reproducible. Heparin plasma is an alternative in the directory, but not configured here.",
    "source": "Labcorp test-specific directory, reviewed 2026-11-18 • https://www.labcorp.com/tests/811984/acetazolamide-serum-or-plasma",
    "searchAliases": [
      "acetazolamide",
      "diamox",
      "acetazolamide level"
    ],
    "clinicalCategories": [
      "tdm",
      "toxicology"
    ]
  },
  {
    "id": "labcorp-verified-20261118-batch31-791350",
    "testCode": "791350",
    "testName": "Acetyl Fentanyl, Screen and Confirmation, Urine",
    "status": "active",
    "specimenType": "Urine",
    "drawContainer": "Sterile cup",
    "alternativeContainer": "",
    "transportContainer": "Sterile cup",
    "preferredVolume": "10 mL random urine",
    "minimumVolume": "3 mL random urine",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "stability": "Room temperature for transport under 3 days; refrigerate or freeze for longer storage",
    "specialLabeling": "",
    "specialInstructions": "Collect random urine in a clean leakproof plastic Sterile cup without preservative. Submit original cup; no centrifugation or transfer. Label random urine. Confirm clinical order and local receiving-lab acceptance.",
    "source": "Labcorp test-specific directory, reviewed 2026-11-18 • https://medtox.labcorp.com/tests/791350/acetyl-fentanyl-screen-with-confirmation-urine",
    "searchAliases": [
      "acetyl fentanyl",
      "acetylfentanyl",
      "fentanyl analog"
    ],
    "clinicalCategories": [
      "toxicology",
      "urinary"
    ]
  },
  {
    "id": "labcorp-verified-20261118-batch31-164119",
    "testCode": "164119",
    "testName": "Bowel Disorders Evaluation Rule-out Cascade",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "alternativeContainer": "",
    "transportContainer": "SST / Gold (spun)",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "0.5 mL serum",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "Yes",
    "stability": "Room, refrigerated or frozen 14 days; freeze/thaw x3",
    "specialLabeling": "",
    "specialInstructions": "Allow to clot, centrifuge and submit original spun SST at room temperature. Avoid hemolysis, lipemia, contamination and heat treatment. Red-top serum or serum aliquot also accepted; this workflow uses SST.",
    "source": "Labcorp test-specific directory, reviewed 2026-11-18 • https://www.labcorp.com/tests/164119/bowel-disorders-evaluation-rule-out-cascade",
    "searchAliases": [
      "bowel disorders cascade",
      "ibd cascade",
      "celiac ibd cascade"
    ],
    "clinicalCategories": [
      "gi",
      "immunology"
    ]
  },
  {
    "id": "labcorp-verified-20261118-batch31-164047",
    "testCode": "164047",
    "testName": "Celiac Antibodies tTG IgA and Total IgA With Reflex to tTG IgG and DGP IgG",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "alternativeContainer": "",
    "transportContainer": "SST / Gold (spun)",
    "preferredVolume": "3 mL serum",
    "minimumVolume": "1 mL serum",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "Yes",
    "stability": "Room, refrigerated or frozen 14 days; freeze/thaw x3",
    "specialLabeling": "",
    "specialInstructions": "Collect sufficient serum for preferred volume, allow to clot, centrifuge, and submit original spun SST at room temperature. Preferred 3 mL serum requires sufficient Gold/Tiger yield. Avoid hemolysis, lipemia and gross contamination.",
    "source": "Labcorp test-specific directory, reviewed 2026-11-18 • https://www.labcorp.com/tests/164047/celiac-antibodies-ttg-iga-and-total-iga-with-reflex-to-ttg-igg-and-dgp-igg",
    "searchAliases": [
      "celiac reflex",
      "ttg iga total iga reflex",
      "celiac antibodies"
    ],
    "clinicalCategories": [
      "gi",
      "autoimmune",
      "immunology"
    ],
    "usePreferredSerumYield": true
  },
  {
    "id": "labcorp-verified-20261118-batch31-512260",
    "testCode": "512260",
    "testName": "Cytochrome P450 3A4/3A5 Genotyping",
    "status": "active",
    "specimenType": "Whole Blood",
    "drawContainer": "Lavender EDTA",
    "alternativeContainer": "",
    "transportContainer": "Lavender EDTA",
    "preferredVolume": "2 mL EDTA whole blood",
    "minimumVolume": "1 mL EDTA whole blood",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "stability": "Whole blood: room or refrigerated 28 days; frozen 2 years",
    "specialLabeling": "",
    "specialInstructions": "Collect EDTA whole blood in a dedicated collection tube. Gently invert and submit the original unspun Lavender EDTA at room temperature; do not transfer or pool with other orders. The ACD and dedicated buccal kit routes are not configured. Confirm ordering requirements and local receiving-lab acceptance.",
    "source": "Labcorp test-specific directory, reviewed 2026-11-18 • https://www.labcorp.com/tests/512260/cytochrome-p450-3a4-3a5-genotyping",
    "searchAliases": [
      "cyp3a4",
      "cyp3a5",
      "cyp3a4/3a5",
      "pharmacogenetics"
    ],
    "clinicalCategories": [
      "genetics",
      "tdm"
    ]
  }
];
for(const record of additions){const prior=window.SEED_TESTS.find(t=>String(t.testCode||'').trim()===record.testCode);if(!prior){window.SEED_TESTS.push(record);continue;}if(['pending','reference'].includes(prior.status))Object.assign(prior,record,{id:prior.id||record.id});}
})();
