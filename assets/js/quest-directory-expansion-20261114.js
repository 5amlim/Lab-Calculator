/* Official Quest directory verified expansion, 2026-11-14.
 * This file is an additive catalog layer. Never replace an existing code.
 * Confirm service-area availability and current specimen requirements before collection.
 */
(() => {
 'use strict';
 if (!Array.isArray(window.SEED_TESTS)) return;
 const additions = [
  {
    "id": "quest-15060-verified-20261114",
    "testCode": "15060",
    "testName": "Adiponectin",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "alternativeContainer": "",
    "transportContainer": "Serum Transport Tube",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "0.5 mL",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "stability": "Room 4 days; refrigerated 14 days; frozen 28 days",
    "spin": "Yes",
    "specialInstructions": "Overnight fasting required. Gently invert the draw tube 5 times, allow to clot for 30 minutes, centrifuge for 10 minutes, transfer serum to transport vial and ship refrigerated same day. Confirm the receiving service area; this test is not available at all Quest sites.",
    "additionalDrawRequirements": [],
    "fastingStatus": "required",
    "fastingInstructions": "Overnight fast required by Quest.",
    "status": "active",
    "source": "Quest Diagnostics test directory, checked 2026-11-14 • https://testdirectory.questdiagnostics.com/test/test-detail/15060/adiponectin?cc=MASTER"
  },
  {
    "id": "quest-15332-verified-20261114",
    "testCode": "15332",
    "testName": "Rickettsia conorii Antibody Panel, IFA (IgG and IgM)",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "alternativeContainer": "",
    "transportContainer": "Serum Transport Tube",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "0.2 mL",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "stability": "Room 7 days; refrigerated 14 days; frozen 30 days",
    "spin": "Yes",
    "specialInstructions": "Separate serum from cells and submit in a labeled transport tube. Not available in all Quest locations; confirm receiving laboratory acceptance. Paired acute and convalescent samples may be requested by the ordering provider, each labeled with its own collection date.",
    "additionalDrawRequirements": [],
    "fastingStatus": "",
    "fastingInstructions": "",
    "status": "active",
    "source": "Quest Diagnostics test directory, checked 2026-11-14 • https://testdirectory.questdiagnostics.com/test/test-detail/15332/rickettsia-conorii-antibody-panel-ifa?cc=MASTER"
  },
  {
    "id": "quest-23475-verified-20261114",
    "testCode": "23475",
    "testName": "Glucose Tolerance Test, 3 Specimens (75 g)",
    "specimenType": "Plasma",
    "drawContainer": "Gray Top (Sodium Fluoride / Potassium Oxalate)",
    "alternativeContainer": "",
    "transportContainer": "Gray Top (original tubes)",
    "preferredVolume": "1 mL plasma at each of 3 time points",
    "minimumVolume": "0.5 mL plasma per specimen",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "stability": "Gray-top whole blood: room 24 hours, refrigerated 72 hours; sodium fluoride plasma: room/refrigerated 7 days",
    "spin": "No",
    "specialInstructions": "Three SEPARATE correctly labeled gray-top tubes are required: fasting baseline, 1 hour, and 2 hours after 75 g oral glucose. Fast at least 8 hours (water only). Obtain baseline before glucose drink; precisely time and label the 1-hour and 2-hour draws. Gray-top whole-blood tubes should remain unspun if shipped within acceptance window; use receiving Quest instructions for any transfer. Verify the provider's protocol, collection availability, and patient eligibility.",
    "additionalDrawRequirements": [
      {
        "container": "Gray Top",
        "count": 2,
        "specimenType": "Plasma",
        "preferredVolume": "1 mL plasma in each of the remaining 2 time-point tubes",
        "minimumVolume": "0.5 mL per specimen",
        "transportContainer": "Gray Top (original tubes)",
        "transportTemperature": "Room Temperature",
        "spin": "No",
        "specialInstructions": "Two additional separate time-point specimens, at 1 and 2 hours after 75 g glucose. Label each tube with its exact collection time."
      }
    ],
    "fastingStatus": "required",
    "fastingInstructions": "At least 8 hours fasting, water permitted.",
    "status": "active",
    "source": "Quest Diagnostics test directory, checked 2026-11-14 • https://testdirectory.questdiagnostics.com/test/test-detail/23475/glucose-tolerance-test-3-specimens-75g?cc=MASTER"
  },
  {
    "id": "quest-15853-verified-20261114",
    "testCode": "15853",
    "testName": "Proinsulin Response to Glucose, 5 Specimens",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "alternativeContainer": "",
    "transportContainer": "Serum Transport Tube",
    "preferredVolume": "1 mL serum per specimen",
    "minimumVolume": "0.5 mL serum per specimen",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "stability": "Room 24 hours; refrigerated 72 hours; frozen 90 days; must arrive frozen",
    "spin": "Yes",
    "specialLabeling": "Fasting - record actual draw time",
    "specialInstructions": "Five SEPARATE serum specimens are required. Obtain fasting baseline; administer 75 g oral glucose; collect timed specimens according to the provider's specific 5-time-point order. Mark every tube with exact collection time. Clot, centrifuge, separate serum into five individually labeled transport tubes, freeze, and send all with one requisition. Do not assume a five-time-point schedule if it is not specified; Quest lists several sampling intervals and the order must identify the selected ones.",
    "additionalDrawRequirements": [
      {
        "container": "SST / Gold",
        "count": 1,
        "specimenType": "Serum",
        "preferredVolume": "1 mL serum for this timed specimen",
        "minimumVolume": "0.5 mL serum",
        "transportContainer": "Serum Transport Tube",
        "transportTemperature": "Frozen",
        "spin": "Yes",
        "specialLabeling": "Timed specimen 2 - record actual draw time",
        "specialInstructions": "Specimen 2 of 5. Collect at its provider-ordered time after glucose; centrifuge, transfer serum to its OWN labeled vial, freeze, and submit with all other separately labeled specimens. Do not combine with any other timepoint."
      },
      {
        "container": "SST / Gold",
        "count": 1,
        "specimenType": "Serum",
        "preferredVolume": "1 mL serum for this timed specimen",
        "minimumVolume": "0.5 mL serum",
        "transportContainer": "Serum Transport Tube",
        "transportTemperature": "Frozen",
        "spin": "Yes",
        "specialLabeling": "Timed specimen 3 - record actual draw time",
        "specialInstructions": "Specimen 3 of 5. Collect at its provider-ordered time after glucose; centrifuge, transfer serum to its OWN labeled vial, freeze, and submit with all other separately labeled specimens. Do not combine with any other timepoint."
      },
      {
        "container": "SST / Gold",
        "count": 1,
        "specimenType": "Serum",
        "preferredVolume": "1 mL serum for this timed specimen",
        "minimumVolume": "0.5 mL serum",
        "transportContainer": "Serum Transport Tube",
        "transportTemperature": "Frozen",
        "spin": "Yes",
        "specialLabeling": "Timed specimen 4 - record actual draw time",
        "specialInstructions": "Specimen 4 of 5. Collect at its provider-ordered time after glucose; centrifuge, transfer serum to its OWN labeled vial, freeze, and submit with all other separately labeled specimens. Do not combine with any other timepoint."
      },
      {
        "container": "SST / Gold",
        "count": 1,
        "specimenType": "Serum",
        "preferredVolume": "1 mL serum for this timed specimen",
        "minimumVolume": "0.5 mL serum",
        "transportContainer": "Serum Transport Tube",
        "transportTemperature": "Frozen",
        "spin": "Yes",
        "specialLabeling": "Timed specimen 5 - record actual draw time",
        "specialInstructions": "Specimen 5 of 5. Collect at its provider-ordered time after glucose; centrifuge, transfer serum to its OWN labeled vial, freeze, and submit with all other separately labeled specimens. Do not combine with any other timepoint."
      }
    ],
    "fastingStatus": "required",
    "fastingInstructions": "Overnight fast required.",
    "status": "active",
    "source": "Quest Diagnostics test directory, checked 2026-11-14 • https://testdirectory.questdiagnostics.com/test/test-detail/15853/?cc=MASTER"
  },
  {
    "id": "quest-92062-verified-20261114",
    "testCode": "92062",
    "testName": "Diabetes and ASCVD Risk Panel with Scores",
    "specimenType": "Serum + Whole Blood",
    "drawContainer": "SST / Gold",
    "alternativeContainer": "",
    "transportContainer": "SST / Gold (spun) plus EDTA whole-blood tube",
    "preferredVolume": "4 mL serum plus 1 mL EDTA whole blood",
    "minimumVolume": "2 mL serum plus 0.5 mL EDTA whole blood",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "stability": "Check constituent stability and service-area requirements before shipment",
    "spin": "Yes",
    "specialInstructions": "TWO DIFFERENT specimens required: spun SST serum and a separate original lavender EDTA whole-blood tube, unspun. Record the risk-calculation clinical inputs on the requisition including age, sex, blood pressure and treatment, smoking, and diabetes status as requested. Lipid panel generally does not require fasting; confirm preparation if additional tests are ordered. Do not pool serum with EDTA blood. Check service-area restrictions.",
    "additionalDrawRequirements": [
      {
        "container": "Lavender EDTA",
        "count": 1,
        "specimenType": "Whole Blood",
        "preferredVolume": "1 mL EDTA whole blood",
        "minimumVolume": "0.5 mL",
        "transportContainer": "Lavender EDTA (original tube)",
        "transportTemperature": "Refrigerated",
        "spin": "No",
        "specialInstructions": "Required separate whole-blood specimen for HbA1c. Invert immediately; do not centrifuge or transfer."
      }
    ],
    "fastingStatus": "",
    "fastingInstructions": "",
    "status": "active",
    "source": "Quest Diagnostics test directory, checked 2026-11-14 • https://testdirectory.questdiagnostics.com/test/test-detail/92062/diabetes-and-ascvd-risk-panel-with-scores?cc=MASTER"
  }
];
 const known = new Set(window.SEED_TESTS.map(t=>String(t.testCode||'').trim()));
 for (const test of additions) {if (!known.has(test.testCode)) {window.SEED_TESTS.push(test); known.add(test.testCode);}}
})();
