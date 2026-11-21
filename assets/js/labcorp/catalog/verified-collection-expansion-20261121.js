// Source-reviewed Labcorp orders with usable collection and submission routes.
(() => {
  'use strict';

  const additions = [
  {
    "id": "labcorp-compendium-review-000315",
    "testCode": "000315",
    "testName": "CK, Chloride, Creatinine, Potassium, Sodium and Pheochromocytoma Evaluation",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "2 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum within 45 minutes. Refrigerate the spun SST and the separate first-morning urine specimen.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "renal",
      "endocrinology"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/000315",
    "additionalDrawRequirements": [
      {
        "purpose": "First-morning urine",
        "specimenType": "First Morning Urine",
        "transportContainer": "Sterile cup",
        "transportTemperature": "Refrigerated",
        "transportTemperatureRaw": "Refrigerated",
        "preferredVolume": "25 mL urine",
        "minimumVolume": "",
        "spin": "No",
        "specialInstructions": "Collect the first urine of the morning in a sterile cup without preservative. Refrigerate and submit the original cup with enough volume for the 25 mL aliquot.",
        "specialLabeling": "Label FIRST-MORNING URINE",
        "submissionCount": 1,
        "container": "Sterile cup",
        "count": 1
      }
    ]
  },
  {
    "id": "labcorp-compendium-review-003046",
    "testCode": "003046",
    "testName": "Urinalysis and Hemoglobin",
    "status": "active",
    "specimenType": "Urine",
    "drawContainer": "Sterile cup",
    "transportContainer": "Urinalysis Transport Tube (Red/Yellow)",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "10 mL urine",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Collect urine in a sterile cup and transfer to the red/yellow urinalysis preservative tube. Fill to the required mark. Submit at room temperature.",
    "specialLabeling": "Label URINE",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "urinary",
      "hematology"
    ],
    "searchAliases": [
      "UA and hemoglobin",
      "UA Hgb"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/003046",
    "additionalDrawRequirements": [
      {
        "purpose": "Hemoglobin",
        "specimenType": "Whole Blood",
        "transportContainer": "Lavender EDTA",
        "transportTemperature": "Room Temperature",
        "transportTemperatureRaw": "Room Temperature",
        "preferredVolume": "4 mL whole blood",
        "minimumVolume": "",
        "spin": "No",
        "specialInstructions": "Mix the originally collected EDTA specimen and submit unspun at room temperature.",
        "specialLabeling": "Label EDTA WHOLE BLOOD",
        "submissionCount": 1,
        "container": "Lavender EDTA",
        "count": 1
      }
    ]
  },
  {
    "id": "labcorp-compendium-review-003324",
    "testCode": "003324",
    "testName": "Calcium and Creatinine, 24-Hour Urine",
    "status": "active",
    "specimenType": "24-Hour Urine",
    "drawContainer": "24-Hour Urine Container",
    "transportContainer": "Sterile cup",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "25 mL urine",
    "minimumVolume": "1 mL",
    "spin": "No",
    "specialInstructions": "Use the unpreserved 24-hour collection accepted by Labcorp. Mix the complete collection, submit a 25 mL aliquot in a secure screw-cap cup and deliver promptly at room temperature. Labcorp acidifies after receipt. Follow the ordering clinician’s diet and medication instructions.",
    "specialLabeling": "Label 24-HOUR URINE and record total volume and collection start and end times",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "urinary",
      "renal"
    ],
    "searchAliases": [
      "24 hour urine calcium creatinine",
      "calcium creatinine 24h"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/003324"
  },
  {
    "id": "labcorp-compendium-review-008219",
    "testCode": "008219",
    "testName": "Parasite Identification, Worm",
    "status": "active",
    "specimenType": "Worm or Worm Segment",
    "drawContainer": "Para-Pak Pink Formalin Vial",
    "transportContainer": "Para-Pak Pink Formalin Vial",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "Entire worm or worm segment",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Submit the intact specimen in the original pink Para-Pak formalin vial at room temperature. Label the specimen type and source.",
    "specialLabeling": "Label WORM OR WORM SEGMENT",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "parasitology"
    ],
    "searchAliases": [
      "worm identification"
    ],
    "source": "https://www.labcorp.com/tests/008219/parasite-identification-worm"
  },
  {
    "id": "labcorp-compendium-review-010447",
    "testCode": "010447",
    "testName": "Antidiuretic Hormone (ADH), Plasma",
    "status": "active",
    "specimenType": "Plasma",
    "drawContainer": "Lavender EDTA",
    "transportContainer": "Frozen Transport Tube (Purple Cap)",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "preferredVolume": "2 mL plasma",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Confirm a refrigerated centrifuge and immediate freezing are available before drawing. Separate EDTA plasma with a refrigerated centrifuge. Transfer to a dedicated plastic screw-cap transport tube and freeze immediately. Confirm no radioisotopes within the prior 24 hours.",
    "specialLabeling": "Label EDTA PLASMA",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "endocrinology"
    ],
    "searchAliases": [
      "ADH",
      "vasopressin"
    ],
    "source": "https://www.labcorp.com/tests/010447/antidiuretic-hormone-adh-plasma"
  },
  {
    "id": "labcorp-compendium-review-011254",
    "testCode": "011254",
    "testName": "pH, Body Fluid",
    "status": "active",
    "specimenType": "Synovial Fluid",
    "drawContainer": "Green Lithium Heparin",
    "transportContainer": "Green Lithium Heparin",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "5 mL synovial fluid",
    "minimumVolume": "1 mL",
    "spin": "No",
    "specialInstructions": "Use provider-collected synovial fluid collected anaerobically in lithium heparin. Keep the original capped tube at room temperature.",
    "specialLabeling": "Label SYNOVIAL FLUID and joint source",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "body-fluids"
    ],
    "searchAliases": [
      "joint fluid pH"
    ],
    "source": "https://www.labcorp.com/tests/011254/ph-body-fluid"
  },
  {
    "id": "labcorp-compendium-review-046557",
    "testCode": "046557",
    "testName": "Antidiuretic Hormone (ADH) Profile",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "Transport Tube",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "0.5 mL",
    "spin": "Yes",
    "specialInstructions": "Confirm refrigerated centrifugation before drawing. Separate serum from cells in a refrigerated centrifuge. Transfer to a labeled plastic serum transport tube and refrigerate. Submit the separately collected EDTA plasma frozen. Confirm no radioisotopes within the prior 24 hours.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "endocrinology"
    ],
    "searchAliases": [
      "ADH profile",
      "vasopressin and osmolality"
    ],
    "source": "https://www.labcorp.com/tests/046557/antidiuretic-hormone-adh-profile",
    "additionalDrawRequirements": [
      {
        "purpose": "Antidiuretic hormone",
        "specimenType": "Plasma",
        "transportContainer": "Frozen Transport Tube (Purple Cap)",
        "transportTemperature": "Frozen",
        "transportTemperatureRaw": "Frozen",
        "preferredVolume": "2 mL plasma",
        "minimumVolume": "1 mL",
        "spin": "Yes",
        "specialInstructions": "Confirm a refrigerated centrifuge and immediate freezing are available before drawing. Separate EDTA plasma with a refrigerated centrifuge. Transfer to a dedicated plastic screw-cap transport tube and freeze immediately. Confirm no radioisotopes within the prior 24 hours.",
        "specialLabeling": "Label EDTA PLASMA",
        "submissionCount": 1,
        "container": "Lavender EDTA",
        "count": 1
      }
    ]
  },
  {
    "id": "labcorp-compendium-review-054494",
    "testCode": "054494",
    "testName": "Immune Complexes Profile",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "Frozen Transport Tube (Purple Cap)",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "preferredVolume": "2 mL total (1 mL per tube)",
    "minimumVolume": "0.2 mL total (0.1 mL per tube)",
    "spin": "Yes",
    "specialInstructions": "Verify dry ice or a −70 °C freezer before drawing. Separate serum and place into two individually labeled plastic transport tubes. Freeze at −70 °C or place on dry ice within six hours. Ship frozen on dry ice. Dedicated aliquots for this assay.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 2,
    "clinicalCategories": [
      "immunology"
    ],
    "searchAliases": [
      "circulating immune complexes",
      "C1q and C3d"
    ],
    "source": "https://www.labcorp.com/tests/054494/immune-complexes-profile"
  },
  {
    "id": "labcorp-compendium-review-087238",
    "testCode": "087238",
    "testName": "Iron, 24-Hour Urine",
    "status": "active",
    "specimenType": "24-Hour Urine",
    "drawContainer": "24-Hour Urine Container",
    "transportContainer": "Trace Metal-Free Plastic Container",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "2 mL urine",
    "minimumVolume": "0.7 mL",
    "spin": "No",
    "specialInstructions": "Use a trace-metal-free collection and transfer pathway. Mix the complete 24-hour collection, aliquot into a trace-metal-free plastic tube and refrigerate.",
    "specialLabeling": "Label 24-HOUR URINE and record total volume and collection start and end times",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "urinary",
      "heavy-metals"
    ],
    "searchAliases": [
      "24 hour urine iron"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/087238"
  },
  {
    "id": "labcorp-compendium-review-121175",
    "testCode": "121175",
    "testName": "Troponin I-STAT",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "0.8 mL serum",
    "minimumVolume": "0.3 mL",
    "spin": "Yes",
    "specialInstructions": "Use the refrigerated SST option. Centrifuge and submit the original spun SST. Confirm local STAT availability and pickup timing before collection.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "cardiac"
    ],
    "searchAliases": [
      "stat troponin I",
      "TnI stat"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/121175"
  },
  {
    "id": "labcorp-compendium-review-123133",
    "testCode": "123133",
    "testName": "Clonidine Suppression Test (Three-hour)",
    "status": "active",
    "specimenType": "Plasma",
    "drawContainer": "Lavender EDTA",
    "transportContainer": "Frozen Transport Tube (Purple Cap)",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "preferredVolume": "One chilled EDTA draw per timepoint",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Collect only under the ordering clinician’s monitored clonidine protocol. Confirm recumbency and preparation with the clinician. Collect 3 mL whole blood per timepoint (minimum 2.2 mL) in a dedicated chilled lavender EDTA tube and mix promptly. Centrifuge at 4 °C using a refrigerated centrifuge or the directory-approved chilled carriers. Transfer to its own prelabeled plastic screw-cap tube and immediately freeze at −20 °C.",
    "specialLabeling": "Baseline: label EDTA PLASMA and actual collection time",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "endocrinology"
    ],
    "searchAliases": [
      "clonidine test",
      "catecholamine suppression"
    ],
    "source": "https://www.labcorp.com/tests/123133/clonidine-suppression-test-three-hour",
    "additionalDrawRequirements": [
      {
        "purpose": "2 hour",
        "specimenType": "Plasma",
        "transportContainer": "Frozen Transport Tube (Purple Cap)",
        "transportTemperature": "Frozen",
        "transportTemperatureRaw": "Frozen",
        "preferredVolume": "One chilled EDTA draw per timepoint",
        "minimumVolume": "",
        "spin": "Yes",
        "specialInstructions": "Collect only under the ordering clinician’s monitored clonidine protocol. Confirm recumbency and preparation with the clinician. Collect 3 mL whole blood per timepoint (minimum 2.2 mL) in a dedicated chilled lavender EDTA tube and mix promptly. Centrifuge at 4 °C using a refrigerated centrifuge or the directory-approved chilled carriers. Transfer to its own prelabeled plastic screw-cap tube and immediately freeze at −20 °C.",
        "specialLabeling": "2 hour: label EDTA PLASMA and actual collection time",
        "submissionCount": 1,
        "container": "Lavender EDTA",
        "count": 1
      },
      {
        "purpose": "3 hour",
        "specimenType": "Plasma",
        "transportContainer": "Frozen Transport Tube (Purple Cap)",
        "transportTemperature": "Frozen",
        "transportTemperatureRaw": "Frozen",
        "preferredVolume": "One chilled EDTA draw per timepoint",
        "minimumVolume": "",
        "spin": "Yes",
        "specialInstructions": "Collect only under the ordering clinician’s monitored clonidine protocol. Confirm recumbency and preparation with the clinician. Collect 3 mL whole blood per timepoint (minimum 2.2 mL) in a dedicated chilled lavender EDTA tube and mix promptly. Centrifuge at 4 °C using a refrigerated centrifuge or the directory-approved chilled carriers. Transfer to its own prelabeled plastic screw-cap tube and immediately freeze at −20 °C.",
        "specialLabeling": "3 hour: label EDTA PLASMA and actual collection time",
        "submissionCount": 1,
        "container": "Lavender EDTA",
        "count": 1
      }
    ]
  },
  {
    "id": "labcorp-compendium-review-123158",
    "testCode": "123158",
    "testName": "Clonidine Suppression Test (Four-hour)",
    "status": "active",
    "specimenType": "Plasma",
    "drawContainer": "Lavender EDTA",
    "transportContainer": "Frozen Transport Tube (Purple Cap)",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "preferredVolume": "One chilled EDTA draw per timepoint",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Collect only under the ordering clinician’s monitored clonidine protocol. Confirm recumbency and preparation with the clinician. Collect 3 mL whole blood per timepoint (minimum 2.2 mL) in a dedicated chilled lavender EDTA tube and mix promptly. Centrifuge at 4 °C using a refrigerated centrifuge or the directory-approved chilled carriers. Transfer to its own prelabeled plastic screw-cap tube and immediately freeze at −20 °C.",
    "specialLabeling": "Baseline: label EDTA PLASMA and actual collection time",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "endocrinology"
    ],
    "searchAliases": [
      "clonidine test",
      "catecholamine suppression"
    ],
    "source": "https://www.labcorp.com/tests/123158/clonidine-suppression-test-four-hour",
    "additionalDrawRequirements": [
      {
        "purpose": "2 hour",
        "specimenType": "Plasma",
        "transportContainer": "Frozen Transport Tube (Purple Cap)",
        "transportTemperature": "Frozen",
        "transportTemperatureRaw": "Frozen",
        "preferredVolume": "One chilled EDTA draw per timepoint",
        "minimumVolume": "",
        "spin": "Yes",
        "specialInstructions": "Collect only under the ordering clinician’s monitored clonidine protocol. Confirm recumbency and preparation with the clinician. Collect 3 mL whole blood per timepoint (minimum 2.2 mL) in a dedicated chilled lavender EDTA tube and mix promptly. Centrifuge at 4 °C using a refrigerated centrifuge or the directory-approved chilled carriers. Transfer to its own prelabeled plastic screw-cap tube and immediately freeze at −20 °C.",
        "specialLabeling": "2 hour: label EDTA PLASMA and actual collection time",
        "submissionCount": 1,
        "container": "Lavender EDTA",
        "count": 1
      },
      {
        "purpose": "3 hour",
        "specimenType": "Plasma",
        "transportContainer": "Frozen Transport Tube (Purple Cap)",
        "transportTemperature": "Frozen",
        "transportTemperatureRaw": "Frozen",
        "preferredVolume": "One chilled EDTA draw per timepoint",
        "minimumVolume": "",
        "spin": "Yes",
        "specialInstructions": "Collect only under the ordering clinician’s monitored clonidine protocol. Confirm recumbency and preparation with the clinician. Collect 3 mL whole blood per timepoint (minimum 2.2 mL) in a dedicated chilled lavender EDTA tube and mix promptly. Centrifuge at 4 °C using a refrigerated centrifuge or the directory-approved chilled carriers. Transfer to its own prelabeled plastic screw-cap tube and immediately freeze at −20 °C.",
        "specialLabeling": "3 hour: label EDTA PLASMA and actual collection time",
        "submissionCount": 1,
        "container": "Lavender EDTA",
        "count": 1
      },
      {
        "purpose": "4 hour",
        "specimenType": "Plasma",
        "transportContainer": "Frozen Transport Tube (Purple Cap)",
        "transportTemperature": "Frozen",
        "transportTemperatureRaw": "Frozen",
        "preferredVolume": "One chilled EDTA draw per timepoint",
        "minimumVolume": "",
        "spin": "Yes",
        "specialInstructions": "Collect only under the ordering clinician’s monitored clonidine protocol. Confirm recumbency and preparation with the clinician. Collect 3 mL whole blood per timepoint (minimum 2.2 mL) in a dedicated chilled lavender EDTA tube and mix promptly. Centrifuge at 4 °C using a refrigerated centrifuge or the directory-approved chilled carriers. Transfer to its own prelabeled plastic screw-cap tube and immediately freeze at −20 °C.",
        "specialLabeling": "4 hour: label EDTA PLASMA and actual collection time",
        "submissionCount": 1,
        "container": "Lavender EDTA",
        "count": 1
      }
    ]
  },
  {
    "id": "labcorp-compendium-review-123224",
    "testCode": "123224",
    "testName": "Clonidine Suppression Test (One- to Three-hour)",
    "status": "active",
    "specimenType": "Plasma",
    "drawContainer": "Lavender EDTA",
    "transportContainer": "Frozen Transport Tube (Purple Cap)",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "preferredVolume": "One chilled EDTA draw per timepoint",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Collect only under the ordering clinician’s monitored clonidine protocol. Confirm recumbency and preparation with the clinician. Collect 3 mL whole blood per timepoint (minimum 2.2 mL) in a dedicated chilled lavender EDTA tube and mix promptly. Centrifuge at 4 °C using a refrigerated centrifuge or the directory-approved chilled carriers. Transfer to its own prelabeled plastic screw-cap tube and immediately freeze at −20 °C.",
    "specialLabeling": "Baseline: label EDTA PLASMA and actual collection time",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "endocrinology"
    ],
    "searchAliases": [
      "clonidine test",
      "catecholamine suppression"
    ],
    "source": "https://www.labcorp.com/tests/123224/clonidine-suppression-test-one-to-three-hour",
    "additionalDrawRequirements": [
      {
        "purpose": "1 hour",
        "specimenType": "Plasma",
        "transportContainer": "Frozen Transport Tube (Purple Cap)",
        "transportTemperature": "Frozen",
        "transportTemperatureRaw": "Frozen",
        "preferredVolume": "One chilled EDTA draw per timepoint",
        "minimumVolume": "",
        "spin": "Yes",
        "specialInstructions": "Collect only under the ordering clinician’s monitored clonidine protocol. Confirm recumbency and preparation with the clinician. Collect 3 mL whole blood per timepoint (minimum 2.2 mL) in a dedicated chilled lavender EDTA tube and mix promptly. Centrifuge at 4 °C using a refrigerated centrifuge or the directory-approved chilled carriers. Transfer to its own prelabeled plastic screw-cap tube and immediately freeze at −20 °C.",
        "specialLabeling": "1 hour: label EDTA PLASMA and actual collection time",
        "submissionCount": 1,
        "container": "Lavender EDTA",
        "count": 1
      },
      {
        "purpose": "2 hour",
        "specimenType": "Plasma",
        "transportContainer": "Frozen Transport Tube (Purple Cap)",
        "transportTemperature": "Frozen",
        "transportTemperatureRaw": "Frozen",
        "preferredVolume": "One chilled EDTA draw per timepoint",
        "minimumVolume": "",
        "spin": "Yes",
        "specialInstructions": "Collect only under the ordering clinician’s monitored clonidine protocol. Confirm recumbency and preparation with the clinician. Collect 3 mL whole blood per timepoint (minimum 2.2 mL) in a dedicated chilled lavender EDTA tube and mix promptly. Centrifuge at 4 °C using a refrigerated centrifuge or the directory-approved chilled carriers. Transfer to its own prelabeled plastic screw-cap tube and immediately freeze at −20 °C.",
        "specialLabeling": "2 hour: label EDTA PLASMA and actual collection time",
        "submissionCount": 1,
        "container": "Lavender EDTA",
        "count": 1
      },
      {
        "purpose": "3 hour",
        "specimenType": "Plasma",
        "transportContainer": "Frozen Transport Tube (Purple Cap)",
        "transportTemperature": "Frozen",
        "transportTemperatureRaw": "Frozen",
        "preferredVolume": "One chilled EDTA draw per timepoint",
        "minimumVolume": "",
        "spin": "Yes",
        "specialInstructions": "Collect only under the ordering clinician’s monitored clonidine protocol. Confirm recumbency and preparation with the clinician. Collect 3 mL whole blood per timepoint (minimum 2.2 mL) in a dedicated chilled lavender EDTA tube and mix promptly. Centrifuge at 4 °C using a refrigerated centrifuge or the directory-approved chilled carriers. Transfer to its own prelabeled plastic screw-cap tube and immediately freeze at −20 °C.",
        "specialLabeling": "3 hour: label EDTA PLASMA and actual collection time",
        "submissionCount": 1,
        "container": "Lavender EDTA",
        "count": 1
      }
    ]
  },
  {
    "id": "labcorp-compendium-review-188664",
    "testCode": "188664",
    "testName": "Parasite Identification, Arthropod",
    "status": "active",
    "specimenType": "Arthropod",
    "drawContainer": "Para-Pak Pink Formalin Vial",
    "transportContainer": "Para-Pak Pink Formalin Vial",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "Entire arthropod",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Submit the intact specimen in the original pink Para-Pak formalin vial at room temperature. Label the specimen type and source.",
    "specialLabeling": "Label ARTHROPOD",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "parasitology"
    ],
    "searchAliases": [
      "tick identification"
    ],
    "source": "https://www.labcorp.com/tests/188664/parasite-identification-arthropod"
  },
  {
    "id": "labcorp-compendium-review-504904",
    "testCode": "504904",
    "testName": "Left Adrenal Vein Aldosterone Unstimulated",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "Frozen Transport Tube (Purple Cap)",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "0.5 mL",
    "spin": "Yes",
    "specialInstructions": "Use the treating provider’s specimen from left adrenal vein, unstimulated. Keep this site and phase separate from other samples. Separate serum within 45 minutes and transfer to its own matching prelabeled transport tube. Freeze. Use a dedicated tube for this order.",
    "specialLabeling": "LEFT ADRENAL VEIN, ALDOSTERONE UNSTIMULATED",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "endocrinology"
    ],
    "searchAliases": [
      "AVS Aldosterone Left adrenal vein unstimulated"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/504904"
  },
  {
    "id": "labcorp-compendium-review-504905",
    "testCode": "504905",
    "testName": "Infrarenal IVC Aldosterone Unstimulated",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "Frozen Transport Tube (Purple Cap)",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "0.5 mL",
    "spin": "Yes",
    "specialInstructions": "Use the treating provider’s specimen from infrarenal ivc, unstimulated. Keep this site and phase separate from other samples. Separate serum within 45 minutes and transfer to its own matching prelabeled transport tube. Freeze. Use a dedicated tube for this order.",
    "specialLabeling": "INFRARENAL IVC, ALDOSTERONE UNSTIMULATED",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "endocrinology"
    ],
    "searchAliases": [
      "AVS Aldosterone Infrarenal IVC unstimulated"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/504905"
  },
  {
    "id": "labcorp-compendium-review-504906",
    "testCode": "504906",
    "testName": "Suprarenal IVC Aldosterone Unstimulated",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "Frozen Transport Tube (Purple Cap)",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "0.5 mL",
    "spin": "Yes",
    "specialInstructions": "Use the treating provider’s specimen from suprarenal ivc, unstimulated. Keep this site and phase separate from other samples. Separate serum within 45 minutes and transfer to its own matching prelabeled transport tube. Freeze. Use a dedicated tube for this order.",
    "specialLabeling": "SUPRARENAL IVC, ALDOSTERONE UNSTIMULATED",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "endocrinology"
    ],
    "searchAliases": [
      "AVS Aldosterone Suprarenal IVC unstimulated"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/504906"
  },
  {
    "id": "labcorp-compendium-review-504907",
    "testCode": "504907",
    "testName": "Right Adrenal Vein Aldosterone Unstimulated",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "Frozen Transport Tube (Purple Cap)",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "0.5 mL",
    "spin": "Yes",
    "specialInstructions": "Use the treating provider’s specimen from right adrenal vein, unstimulated. Keep this site and phase separate from other samples. Separate serum within 45 minutes and transfer to its own matching prelabeled transport tube. Freeze. Use a dedicated tube for this order.",
    "specialLabeling": "RIGHT ADRENAL VEIN, ALDOSTERONE UNSTIMULATED",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "endocrinology"
    ],
    "searchAliases": [
      "AVS Aldosterone Right adrenal vein unstimulated"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/504907"
  },
  {
    "id": "labcorp-compendium-review-504908",
    "testCode": "504908",
    "testName": "Left Adrenal Vein Aldosterone Post-Stimulation",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "Frozen Transport Tube (Purple Cap)",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "0.5 mL",
    "spin": "Yes",
    "specialInstructions": "Use the treating provider’s specimen from left adrenal vein, post-stimulation. Keep this site and phase separate from other samples. Separate serum within 45 minutes and transfer to its own matching prelabeled transport tube. Freeze. Use a dedicated tube for this order.",
    "specialLabeling": "LEFT ADRENAL VEIN, ALDOSTERONE POST-STIMULATION",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "endocrinology"
    ],
    "searchAliases": [
      "AVS Aldosterone Left adrenal vein post-stimulation"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/504908"
  },
  {
    "id": "labcorp-compendium-review-504909",
    "testCode": "504909",
    "testName": "Infrarenal IVC Aldosterone Post-Stimulation",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "Frozen Transport Tube (Purple Cap)",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "0.5 mL",
    "spin": "Yes",
    "specialInstructions": "Use the treating provider’s specimen from infrarenal ivc, post-stimulation. Keep this site and phase separate from other samples. Separate serum within 45 minutes and transfer to its own matching prelabeled transport tube. Freeze. Use a dedicated tube for this order.",
    "specialLabeling": "INFRARENAL IVC, ALDOSTERONE POST-STIMULATION",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "endocrinology"
    ],
    "searchAliases": [
      "AVS Aldosterone Infrarenal IVC post-stimulation"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/504909"
  },
  {
    "id": "labcorp-compendium-review-504910",
    "testCode": "504910",
    "testName": "Suprarenal IVC Aldosterone Post-Stimulation",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "Frozen Transport Tube (Purple Cap)",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "0.5 mL",
    "spin": "Yes",
    "specialInstructions": "Use the treating provider’s specimen from suprarenal ivc, post-stimulation. Keep this site and phase separate from other samples. Separate serum within 45 minutes and transfer to its own matching prelabeled transport tube. Freeze. Use a dedicated tube for this order.",
    "specialLabeling": "SUPRARENAL IVC, ALDOSTERONE POST-STIMULATION",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "endocrinology"
    ],
    "searchAliases": [
      "AVS Aldosterone Suprarenal IVC post-stimulation"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/504910"
  },
  {
    "id": "labcorp-compendium-review-504911",
    "testCode": "504911",
    "testName": "Right Adrenal Vein Aldosterone Post-Stimulation",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "Frozen Transport Tube (Purple Cap)",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "0.5 mL",
    "spin": "Yes",
    "specialInstructions": "Use the treating provider’s specimen from right adrenal vein, post-stimulation. Keep this site and phase separate from other samples. Separate serum within 45 minutes and transfer to its own matching prelabeled transport tube. Freeze. Use a dedicated tube for this order.",
    "specialLabeling": "RIGHT ADRENAL VEIN, ALDOSTERONE POST-STIMULATION",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "endocrinology"
    ],
    "searchAliases": [
      "AVS Aldosterone Right adrenal vein post-stimulation"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/504911"
  },
  {
    "id": "labcorp-compendium-review-504912",
    "testCode": "504912",
    "testName": "Left Adrenal Vein Cortisol Unstimulated",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "Frozen Transport Tube (Purple Cap)",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "0.5 mL",
    "spin": "Yes",
    "specialInstructions": "Use the treating provider’s specimen from left adrenal vein, unstimulated. Keep this site and phase separate from other samples. Separate serum within 45 minutes and transfer to its own matching prelabeled transport tube. Freeze. Use a dedicated tube for this order.",
    "specialLabeling": "LEFT ADRENAL VEIN, CORTISOL UNSTIMULATED",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "endocrinology"
    ],
    "searchAliases": [
      "AVS Cortisol Left adrenal vein unstimulated"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/504912"
  },
  {
    "id": "labcorp-compendium-review-504913",
    "testCode": "504913",
    "testName": "Infrarenal IVC Cortisol Unstimulated",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "Frozen Transport Tube (Purple Cap)",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "0.5 mL",
    "spin": "Yes",
    "specialInstructions": "Use the treating provider’s specimen from infrarenal ivc, unstimulated. Keep this site and phase separate from other samples. Separate serum within 45 minutes and transfer to its own matching prelabeled transport tube. Freeze. Use a dedicated tube for this order.",
    "specialLabeling": "INFRARENAL IVC, CORTISOL UNSTIMULATED",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "endocrinology"
    ],
    "searchAliases": [
      "AVS Cortisol Infrarenal IVC unstimulated"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/504913"
  },
  {
    "id": "labcorp-compendium-review-504914",
    "testCode": "504914",
    "testName": "Suprarenal IVC Cortisol Unstimulated",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "Frozen Transport Tube (Purple Cap)",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "0.5 mL",
    "spin": "Yes",
    "specialInstructions": "Use the treating provider’s specimen from suprarenal ivc, unstimulated. Keep this site and phase separate from other samples. Separate serum within 45 minutes and transfer to its own matching prelabeled transport tube. Freeze. Use a dedicated tube for this order.",
    "specialLabeling": "SUPRARENAL IVC, CORTISOL UNSTIMULATED",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "endocrinology"
    ],
    "searchAliases": [
      "AVS Cortisol Suprarenal IVC unstimulated"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/504914"
  },
  {
    "id": "labcorp-compendium-review-504915",
    "testCode": "504915",
    "testName": "Right Adrenal Vein Cortisol Unstimulated",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "Frozen Transport Tube (Purple Cap)",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "0.5 mL",
    "spin": "Yes",
    "specialInstructions": "Use the treating provider’s specimen from right adrenal vein, unstimulated. Keep this site and phase separate from other samples. Separate serum within 45 minutes and transfer to its own matching prelabeled transport tube. Freeze. Use a dedicated tube for this order.",
    "specialLabeling": "RIGHT ADRENAL VEIN, CORTISOL UNSTIMULATED",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "endocrinology"
    ],
    "searchAliases": [
      "AVS Cortisol Right adrenal vein unstimulated"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/504915"
  },
  {
    "id": "labcorp-compendium-review-504916",
    "testCode": "504916",
    "testName": "Left Adrenal Vein Cortisol Post-Stimulation",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "Frozen Transport Tube (Purple Cap)",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "0.5 mL",
    "spin": "Yes",
    "specialInstructions": "Use the treating provider’s specimen from left adrenal vein, post-stimulation. Keep this site and phase separate from other samples. Separate serum within 45 minutes and transfer to its own matching prelabeled transport tube. Freeze. Use a dedicated tube for this order.",
    "specialLabeling": "LEFT ADRENAL VEIN, CORTISOL POST-STIMULATION",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "endocrinology"
    ],
    "searchAliases": [
      "AVS Cortisol Left adrenal vein post-stimulation"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/504916"
  },
  {
    "id": "labcorp-compendium-review-504917",
    "testCode": "504917",
    "testName": "Infrarenal IVC Cortisol Post-Stimulation",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "Frozen Transport Tube (Purple Cap)",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "0.5 mL",
    "spin": "Yes",
    "specialInstructions": "Use the treating provider’s specimen from infrarenal ivc, post-stimulation. Keep this site and phase separate from other samples. Separate serum within 45 minutes and transfer to its own matching prelabeled transport tube. Freeze. Use a dedicated tube for this order.",
    "specialLabeling": "INFRARENAL IVC, CORTISOL POST-STIMULATION",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "endocrinology"
    ],
    "searchAliases": [
      "AVS Cortisol Infrarenal IVC post-stimulation"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/504917"
  },
  {
    "id": "labcorp-compendium-review-504918",
    "testCode": "504918",
    "testName": "Suprarenal IVC Cortisol Post-Stimulation",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "Frozen Transport Tube (Purple Cap)",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "0.5 mL",
    "spin": "Yes",
    "specialInstructions": "Use the treating provider’s specimen from suprarenal ivc, post-stimulation. Keep this site and phase separate from other samples. Separate serum within 45 minutes and transfer to its own matching prelabeled transport tube. Freeze. Use a dedicated tube for this order.",
    "specialLabeling": "SUPRARENAL IVC, CORTISOL POST-STIMULATION",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "endocrinology"
    ],
    "searchAliases": [
      "AVS Cortisol Suprarenal IVC post-stimulation"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/504918"
  },
  {
    "id": "labcorp-compendium-review-504919",
    "testCode": "504919",
    "testName": "Right Adrenal Vein Cortisol Post-Stimulation",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "Frozen Transport Tube (Purple Cap)",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "0.5 mL",
    "spin": "Yes",
    "specialInstructions": "Use the treating provider’s specimen from right adrenal vein, post-stimulation. Keep this site and phase separate from other samples. Separate serum within 45 minutes and transfer to its own matching prelabeled transport tube. Freeze. Use a dedicated tube for this order.",
    "specialLabeling": "RIGHT ADRENAL VEIN, CORTISOL POST-STIMULATION",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "endocrinology"
    ],
    "searchAliases": [
      "AVS Cortisol Right adrenal vein post-stimulation"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/504919"
  },
  {
    "id": "labcorp-compendium-review-821294",
    "testCode": "821294",
    "testName": "Salmonella Antibodies, EIA",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "Transport Tube",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "0.1 mL",
    "spin": "Yes",
    "specialInstructions": "Separate serum within 45 minutes, transfer to plastic serum transport and keep at room temperature.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "infectious"
    ],
    "searchAliases": [
      "salmonella serology"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/821294"
  },
  {
    "id": "labcorp-compendium-review-824546",
    "testCode": "824546",
    "testName": "Bromine-Total, Serum/Plasma",
    "status": "active",
    "specimenType": "Plasma",
    "drawContainer": "Royal Blue EDTA (purple stripe)",
    "transportContainer": "Trace Metal-Free Plasma Transport Tube",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "2 mL plasma",
    "minimumVolume": "0.7 mL",
    "spin": "Yes",
    "specialInstructions": "Use the trace-metal-free royal blue EDTA plasma route. Separate within two hours and transfer to a deionized-water-rinsed plastic transport tube. Refrigerate. Avoid iodine-containing skin prep and confirm the 96-hour contrast-media restriction before draw.",
    "specialLabeling": "Label TRACE METAL EDTA PLASMA",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "heavy-metals"
    ],
    "searchAliases": [
      "bromine total",
      "bromide level"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/824546"
  },
  {
    "id": "labcorp-compendium-review-830896",
    "testCode": "830896",
    "testName": "Adenosine Deaminase,Peritoneal",
    "status": "active",
    "specimenType": "Peritoneal Fluid",
    "drawContainer": "Sterile cup",
    "transportContainer": "Sterile cup",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "preferredVolume": "0.5 mL peritoneal fluid",
    "minimumVolume": "0.2 mL",
    "spin": "No",
    "specialInstructions": "Use provider-collected peritoneal fluid in the original leakproof, freezer-safe sterile cup. Freeze.",
    "specialLabeling": "Label PERITONEAL FLUID",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "body-fluids"
    ],
    "searchAliases": [
      "ADA ascites"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/830896"
  },
  {
    "id": "labcorp-compendium-review-830986",
    "testCode": "830986",
    "testName": "Cysticercosis Ab, IgG by ELISA",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "0.1 mL",
    "spin": "Yes",
    "specialInstructions": "Separate serum and refrigerate the spun SST. The directory rejects CSF, hemolyzed, icteric and lipemic specimens.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "infectious"
    ],
    "searchAliases": [
      "cysticercosis antibody"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/830986"
  },
  {
    "id": "labcorp-compendium-review-831140",
    "testCode": "831140",
    "testName": "3-Methylglutaconic Plasma/CSF",
    "status": "active",
    "specimenType": "Plasma",
    "drawContainer": "Lavender EDTA",
    "transportContainer": "Frozen Transport Tube (Purple Cap)",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "preferredVolume": "1 mL plasma",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate EDTA plasma into a screw-cap plastic transport tube. Freeze plasma and the independently labeled CSF specimen. Ship Monday through Thursday.",
    "specialLabeling": "Label EDTA PLASMA",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "body-fluids",
      "neurology"
    ],
    "searchAliases": [
      "3 methylglutaconic acid paired plasma csf",
      "3 MGA"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/831140",
    "additionalDrawRequirements": [
      {
        "purpose": "Paired CSF",
        "specimenType": "CSF",
        "transportContainer": "Sterile cup",
        "transportTemperature": "Frozen",
        "transportTemperatureRaw": "Frozen",
        "preferredVolume": "1 mL CSF",
        "minimumVolume": "",
        "spin": "No",
        "specialInstructions": "Use provider-collected CSF in the original freezer-safe sterile cup. Freeze.",
        "specialLabeling": "Label CSF",
        "submissionCount": 1,
        "container": "Sterile cup",
        "count": 1
      }
    ]
  },
  {
    "id": "labcorp-compendium-review-831752",
    "testCode": "831752",
    "testName": "Lupin IgE",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "0.5 mL",
    "spin": "Yes",
    "specialInstructions": "Centrifuge the SST and submit the original spun tube at room temperature. Avoid lipemia.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "allergy"
    ],
    "searchAliases": [
      "lupine IgE"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/831752"
  },
  {
    "id": "labcorp-compendium-review-833915",
    "testCode": "833915",
    "testName": "SC5b-9 Complement, P",
    "status": "active",
    "specimenType": "Plasma",
    "drawContainer": "Light Blue Sodium Citrate",
    "transportContainer": "Frozen Transport Tube (Purple Cap)",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "preferredVolume": "1.5 mL citrate plasma",
    "minimumVolume": "0.5 mL",
    "spin": "Yes",
    "specialInstructions": "Confirm refrigerated centrifugation and immediate freezing are available. Keep the filled citrate tube on wet ice. Centrifuge at 4 °C for 10 minutes at 1,000–2,000 × g, transfer plasma to a plastic tube and freeze within 30 minutes of collection.",
    "specialLabeling": "Label CITRATE PLASMA",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "immunology"
    ],
    "searchAliases": [
      "SC5b-9",
      "soluble terminal complement complex"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/833915"
  },
  {
    "id": "labcorp-compendium-review-835499",
    "testCode": "835499",
    "testName": "Creatine Disorders Panel, Plasma",
    "status": "active",
    "specimenType": "Plasma",
    "drawContainer": "Lavender EDTA",
    "transportContainer": "Frozen Transport Tube (Purple Cap)",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "preferredVolume": "0.5 mL plasma",
    "minimumVolume": "0.1 mL",
    "spin": "Yes",
    "specialInstructions": "Separate EDTA plasma and transfer to a plastic vial. Ship frozen. Include the patient age and sex and follow the performing lab’s biochemical genetics documentation.",
    "specialLabeling": "Label EDTA PLASMA",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "chemistry",
      "genetics"
    ],
    "searchAliases": [
      "CRDPP",
      "creatine deficiency screen"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/835499"
  }
];
  const catalog = window.SEED_TESTS;
  const byCode = new Map(catalog.map(record => [String(record.testCode || '').trim(), record]));
  for (const record of additions) {
    const previous = byCode.get(record.testCode);
    if (!previous) catalog.push(record);
    else if (previous.status === 'pending' || previous.status === 'reference') {
      Object.assign(previous, record, { id: previous.id || record.id });
    }
  }

  const turnaround = {
  "008219": [
    "3–7 days",
    7,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/008219/parasite-identification-worm"
  ],
  "188664": [
    "2–5 days",
    5,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/188664/parasite-identification-arthropod"
  ],
  "010447": [
    "4–12 days",
    12,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/010447/antidiuretic-hormone-adh-plasma"
  ],
  "046557": [
    "4–10 days",
    10,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/046557/antidiuretic-hormone-adh-profile"
  ],
  "011254": [
    "2–4 days",
    4,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/011254/ph-body-fluid"
  ],
  "054494": [
    "4–9 days",
    9,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/054494/immune-complexes-profile"
  ],
  "087238": [
    "9–13 days",
    13,
    "Labcorp CDOS compendium",
    "",
    "https://cdos.halfpenny.com/labcorp/TestDisplay/087238"
  ],
  "121175": [
    "Within 1 day",
    1,
    "Labcorp CDOS compendium",
    "",
    "https://cdos.halfpenny.com/labcorp/TestDisplay/121175"
  ],
  "123133": [
    "2–4 days",
    4,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/123133/clonidine-suppression-test-three-hour"
  ],
  "123158": [
    "2–4 days",
    4,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/123158/clonidine-suppression-test-four-hour"
  ],
  "123224": [
    "2–4 days",
    4,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/123224/clonidine-suppression-test-one-to-three-hour"
  ],
  "830986": [
    "1–11 days",
    11,
    "Labcorp CDOS compendium",
    "",
    "https://cdos.halfpenny.com/labcorp/TestDisplay/830986"
  ],
  "831752": [
    "3–4 days",
    4,
    "Labcorp CDOS compendium",
    "",
    "https://cdos.halfpenny.com/labcorp/TestDisplay/831752"
  ],
  "824546": [
    "8–13 days",
    13,
    "Labcorp CDOS compendium",
    "",
    "https://cdos.halfpenny.com/labcorp/TestDisplay/824546"
  ],
  "831140": [
    "19–31 days",
    31,
    "Labcorp CDOS compendium",
    "",
    "https://cdos.halfpenny.com/labcorp/TestDisplay/831140"
  ],
  "833915": [
    "6–8 days",
    8,
    "Labcorp CDOS compendium",
    "",
    "https://cdos.halfpenny.com/labcorp/TestDisplay/833915"
  ],
  "835499": [
    "6–12 days",
    12,
    "Labcorp CDOS compendium",
    "",
    "https://cdos.halfpenny.com/labcorp/TestDisplay/835499"
  ]
};
  const existing = window.LabDirectoryTat || {};
  window.LabDirectoryTat = Object.freeze({
    ...existing,
    directory: Object.freeze({ ...turnaround, ...existing.directory })
  });
})();
