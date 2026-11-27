/* Test-specific official Labcorp directory review, batch33. Existing active/blocked records are preserved. Multispecimen profiles use additionalDrawRequirements; no new grouping or labelling engine rules. */
(()=>{'use strict';if(!Array.isArray(window.SEED_TESTS))return;
const additions=[
  {
    "id": "labcorp-verified-20261118-batch33-180051",
    "status": "active",
    "alternativeContainer": "",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperatureRaw": "Room Temperature",
    "stability": "30 days at room temperature or refrigerated in Aptima (2–30°C)",
    "specialLabeling": "",
    "fastingStatus": "",
    "fastingInstructions": "",
    "testCode": "180051",
    "testName": "Chlamydia/Gonococcus/Genital Mycoplasma Profile, NAA, Urine",
    "specimenType": "Urine",
    "drawContainer": "Sterile cup",
    "transportContainer": "Aptima Urine Transport Tube",
    "preferredVolume": "2 mL aliquot from 20–30 mL first-catch urine",
    "minimumVolume": "2 mL in Aptima",
    "transportTemperature": "Room Temperature",
    "spin": "No",
    "specialInstructions": "Do not urinate for 1 hour before collection. Collect the initial urine stream (20–30 mL) in a preservative-free sterile cup. Female patients should not cleanse the labial area beforehand. Transfer approximately 2 mL between the black fill lines of the Aptima urine device. Do not submit the raw cup or a urine culture tube. Maintain at room temperature; label first-catch urine.",
    "source": "Labcorp official directory, reviewed 2026-11-18 • https://www.labcorp.com/tests/180051/chlamydia-gonococcus-genital-mycoplasma-profile-naa-urine",
    "clinicalCategories": [
      "sti",
      "infectious"
    ],
    "searchAliases": [
      "CT GC mycoplasma urine",
      "chlamydia gonorrhea mycoplasma NAAT",
      "ureaplasma genital mycoplasma"
    ]
  },
  {
    "id": "labcorp-verified-20261118-batch33-180049",
    "status": "active",
    "alternativeContainer": "",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperatureRaw": "Room Temperature",
    "stability": "30 days at room temperature or refrigerated in Aptima (2–30°C)",
    "specialLabeling": "",
    "fastingStatus": "",
    "fastingInstructions": "",
    "testCode": "180049",
    "testName": "Chlamydia/Gonococcus/Mycoplasma genitalium, NAA, Urine",
    "specimenType": "Urine",
    "drawContainer": "Sterile cup",
    "transportContainer": "Aptima Urine Transport Tube",
    "preferredVolume": "2 mL aliquot from 20–30 mL first-catch urine",
    "minimumVolume": "2 mL in Aptima",
    "transportTemperature": "Room Temperature",
    "spin": "No",
    "specialInstructions": "Do not urinate for 1 hour before collection. Collect the initial urine stream (20–30 mL) in a preservative-free sterile cup. Female patients should not cleanse the labial area beforehand. Transfer approximately 2 mL between the black fill lines of the Aptima urine device. Do not submit the raw cup or a urine culture tube. Maintain at room temperature; label first-catch urine.",
    "source": "Labcorp official directory, reviewed 2026-11-18 • https://www.labcorp.com/tests/180049/chlamydia-gonococcus-mycoplasma-genitalium-naa-urine",
    "clinicalCategories": [
      "sti",
      "infectious"
    ],
    "searchAliases": [
      "CT GC mycoplasma urine",
      "chlamydia gonorrhea mycoplasma NAAT"
    ]
  },
  {
    "id": "labcorp-verified-20261118-batch33-030577",
    "status": "active",
    "alternativeContainer": "",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperatureRaw": "Room Temperature",
    "stability": "Refer to current test-specific directory",
    "specialLabeling": "",
    "fastingStatus": "",
    "fastingInstructions": "",
    "testCode": "030577",
    "testName": "Anemia Profile A",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "preferredVolume": "4 mL serum",
    "minimumVolume": "4 mL serum",
    "transportTemperature": "Room Temperature",
    "spin": "Yes",
    "specialInstructions": "Separate serum from cells within 45 minutes. Submit spun SST and original EDTA whole blood, both at room temperature; avoid hemolysis. Serum yield calculation uses 4 mL; the EDTA requirement is separate.",
    "source": "Labcorp official directory, reviewed 2026-11-18 • https://www.labcorp.com/tests/030577/anemia-profile-a",
    "clinicalCategories": [
      "iron-anemia",
      "hematology"
    ],
    "searchAliases": [
      "anemia panel A",
      "iron TIBC CBC reticulocytes"
    ],
    "usePreferredSerumYield": true,
    "additionalDrawRequirements": [
      {
        "container": "Lavender EDTA",
        "specimenType": "Whole Blood",
        "transportContainer": "Lavender EDTA",
        "preferredVolume": "5 mL whole blood",
        "minimumVolume": "5 mL whole blood",
        "transportTemperature": "Room Temperature",
        "transportTemperatureRaw": "Room Temperature",
        "spin": "No",
        "count": 2,
        "submissionCount": 2,
        "purpose": "CBC and reticulocyte count",
        "specialLabeling": "",
        "specialInstructions": "Collect the required EDTA whole blood in dedicated collection tubes; gently invert according to tube manufacturer. Submit original unspun tubes at room temperature; no transfer. Do not pool with other orders."
      }
    ]
  },
  {
    "id": "labcorp-verified-20261118-batch33-042077",
    "status": "active",
    "alternativeContainer": "",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperatureRaw": "Room Temperature",
    "stability": "Refer to current test-specific directory",
    "specialLabeling": "",
    "fastingStatus": "",
    "fastingInstructions": "",
    "testCode": "042077",
    "testName": "Anemia Profile B",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "preferredVolume": "4 mL serum",
    "minimumVolume": "4 mL serum",
    "transportTemperature": "Room Temperature",
    "spin": "Yes",
    "specialInstructions": "Submit spun SST serum and original EDTA whole blood at room temperature. Avoid hemolysis. Ask about high-dose biotin; Labcorp advises avoiding it for 72 hours before collection with clinician guidance.",
    "source": "Labcorp official directory, reviewed 2026-11-18 • https://www.labcorp.com/tests/042077/anemia-profile-b",
    "clinicalCategories": [
      "iron-anemia",
      "hematology",
      "vitamins"
    ],
    "searchAliases": [
      "anemia panel B",
      "iron ferritin B12 folate CBC reticulocytes"
    ],
    "usePreferredSerumYield": true,
    "additionalDrawRequirements": [
      {
        "container": "Lavender EDTA",
        "specimenType": "Whole Blood",
        "transportContainer": "Lavender EDTA",
        "preferredVolume": "7 mL whole blood",
        "minimumVolume": "7 mL whole blood",
        "transportTemperature": "Room Temperature",
        "transportTemperatureRaw": "Room Temperature",
        "spin": "No",
        "count": 2,
        "submissionCount": 2,
        "purpose": "CBC and reticulocyte count",
        "specialLabeling": "",
        "specialInstructions": "Collect the required EDTA whole blood in dedicated collection tubes; gently invert according to tube manufacturer. Submit original unspun tubes at room temperature; no transfer. Do not pool with other orders."
      }
    ]
  },
  {
    "id": "labcorp-verified-20261118-batch33-123026",
    "status": "active",
    "alternativeContainer": "",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperatureRaw": "Refrigerated",
    "stability": "Room 3 days; refrigerated/frozen 14 days",
    "specialLabeling": "",
    "fastingStatus": "",
    "fastingInstructions": "",
    "testCode": "123026",
    "testName": "Protein Electrophoresis With Interpretation, Serum With Reflex to IFE, Serum",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "preferredVolume": "5 mL serum",
    "minimumVolume": "2 mL serum",
    "transportTemperature": "Refrigerated",
    "spin": "Yes",
    "specialInstructions": "Allow to clot, centrifuge and submit spun SST refrigerated. Avoid hemolysis and plasma. Collect sufficient serum for preferred volume; reflex to IFE if indicated.",
    "source": "Labcorp official directory, reviewed 2026-11-18 • https://www.labcorp.com/tests/123026/protein-electrophoresis-with-interpretation-serum-with-reflex-to-ife-serum",
    "clinicalCategories": [
      "immunology",
      "hematology",
      "oncology"
    ],
    "searchAliases": [
      "SPEP reflex IFE",
      "serum protein electrophoresis immunofixation"
    ],
    "usePreferredSerumYield": true
  },
  {
    "id": "labcorp-verified-20261118-batch33-138307",
    "status": "active",
    "alternativeContainer": "",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperatureRaw": "Refrigerated",
    "stability": "Unpreserved sterile container: 7 days room, refrigerated or frozen",
    "specialLabeling": "",
    "fastingStatus": "",
    "fastingInstructions": "",
    "testCode": "138307",
    "testName": "Norovirus Detection, Real-time PCR",
    "specimenType": "Stool",
    "drawContainer": "Sterile cup",
    "transportContainer": "Sterile cup",
    "preferredVolume": "1 mL stool",
    "minimumVolume": "0.2 mL stool",
    "transportTemperature": "Refrigerated",
    "spin": "No",
    "specialInstructions": "Collect stool into a sterile leakproof cup, without urine or preservative contamination. Refrigerate and submit original cup without spin or transfer. Label stool. Cary-Blair is an alternative but is not configured for this route.",
    "source": "Labcorp official directory, reviewed 2026-11-18 • https://www.labcorp.com/tests/138307/norovirus-detection-real-time-pcr",
    "clinicalCategories": [
      "gi",
      "infectious",
      "microbiology"
    ],
    "searchAliases": [
      "norovirus PCR",
      "norwalk virus",
      "human calicivirus"
    ]
  },
  {
    "id": "labcorp-verified-20261118-batch33-123836",
    "status": "active",
    "alternativeContainer": "",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperatureRaw": "Refrigerated",
    "stability": "Lipid profile 10 days refrigerated; NMR 14 days refrigerated",
    "specialLabeling": "",
    "fastingStatus": "required",
    "fastingInstructions": "Fast 8–12 hours per Labcorp.",
    "testCode": "123836",
    "testName": "Lipid Cascade With Reflex to Lipoprotein Particle Assessment by NMR (With Graph if Reflexed)",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "preferredVolume": "2 mL serum",
    "minimumVolume": "1 mL serum",
    "transportTemperature": "Refrigerated",
    "spin": "Yes",
    "specialInstructions": "Requires both lipid-profile serum and the NMR reflex specimen even if no reflex occurs. Separate lipid serum promptly. Refrigerate both specimens at 2–8°C and ship with frozen cool packs; do not freeze either specimen.",
    "source": "Labcorp official directory, reviewed 2026-11-18 • https://www.labcorp.com/tests/123836/lipid-cascade-with-reflex-to-lipoprotein-particle-assessment-by-nmr-with-graph-if-reflexed",
    "clinicalCategories": [
      "lipids",
      "cardiac"
    ],
    "searchAliases": [
      "lipid cascade NMR with graph",
      "lipoprotein particles reflex"
    ],
    "additionalDrawRequirements": [
      {
        "container": "NMR LipoTube (Black/Yellow)",
        "specimenType": "Serum",
        "transportContainer": "NMR LipoTube (Black/Yellow, spun and unopened)",
        "preferredVolume": "2 mL serum",
        "minimumVolume": "1 mL serum",
        "transportTemperature": "Refrigerated",
        "transportTemperatureRaw": "Refrigerated",
        "spin": "Yes",
        "count": 1,
        "submissionCount": 1,
        "purpose": "Separate mandatory NMR reflex specimen",
        "specialLabeling": "",
        "specialInstructions": "Use NMR LipoTube rather than a routine SST; allow upright clotting 30 minutes, centrifuge 1600–1800 xg for 10–15 minutes, keep unopened. Refrigerate and ship with frozen cool packs; do not freeze."
      }
    ]
  },
  {
    "id": "labcorp-verified-20261118-batch33-027011",
    "status": "active",
    "alternativeContainer": "",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperatureRaw": "Refrigerated",
    "stability": "14 days room, refrigerated or frozen; freeze/thaw x3",
    "specialLabeling": "",
    "fastingStatus": "",
    "fastingInstructions": "",
    "testCode": "027011",
    "testName": "Thyroid Profile II, Comprehensive",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "preferredVolume": "2.5 mL serum",
    "minimumVolume": "1.5 mL serum",
    "transportTemperature": "Refrigerated",
    "spin": "Yes",
    "specialInstructions": "Allow to clot, centrifuge, and submit original spun SST refrigerated. Plasma not accepted. Ask about high-dose biotin; Labcorp advises avoiding it for 72 hours before collection with clinician guidance.",
    "source": "Labcorp official directory, reviewed 2026-11-18 • https://www.labcorp.com/tests/027011/thyroid-profile-ii-comprehensive",
    "clinicalCategories": [
      "thyroid",
      "endocrinology"
    ],
    "searchAliases": [
      "thyroid panel comprehensive",
      "thyroid profile D",
      "TSH T3 T4 FTI"
    ],
    "usePreferredSerumYield": true
  },
  {
    "id": "labcorp-verified-20261118-batch33-551722",
    "status": "active",
    "alternativeContainer": "",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperatureRaw": "Frozen",
    "stability": "Must arrive frozen",
    "specialLabeling": "",
    "fastingStatus": "",
    "fastingInstructions": "",
    "testCode": "551722",
    "testName": "Hepatitis B Virus (HBV) DNA, Quantitative Real-time PCR With Reflex to HBV Genotype",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "Frozen Transport Tube (Purple Cap)",
    "preferredVolume": "3 mL serum",
    "minimumVolume": "1.5 mL serum",
    "transportTemperature": "Frozen",
    "spin": "Yes",
    "specialInstructions": "Collect SST serum; centrifuge within 6 hours, transfer separated serum to a screw-cap polypropylene frozen transport tube, and freeze. Submit an individual frozen aliquot. Do not use heparin or ACD tubes. Serum route only.",
    "source": "Labcorp official directory, reviewed 2026-11-18 • https://www.labcorp.com/tests/551722/hepatitis-b-virus-hbv-dna-quantitative-real-time-pcr-with-reflex-to-hbv-genotype",
    "clinicalCategories": [
      "infectious",
      "hepatic"
    ],
    "searchAliases": [
      "HBV DNA viral load reflex genotype"
    ],
    "usePreferredSerumYield": true
  },
  {
    "id": "labcorp-verified-20261118-batch33-551735",
    "status": "active",
    "alternativeContainer": "",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperatureRaw": "Frozen",
    "stability": "Must arrive frozen",
    "specialLabeling": "",
    "fastingStatus": "",
    "fastingInstructions": "",
    "testCode": "551735",
    "testName": "Hepatitis B Virus (HBV) DNA, Quantitative Real-time PCR With Reflex to HBV Genotype Plus Drug Resistance",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "Frozen Transport Tube (Purple Cap)",
    "preferredVolume": "3 mL serum",
    "minimumVolume": "1.5 mL serum",
    "transportTemperature": "Frozen",
    "spin": "Yes",
    "specialInstructions": "Collect SST serum; centrifuge within 6 hours, transfer separated serum to a screw-cap polypropylene frozen transport tube, and freeze. Submit an individual frozen aliquot. Do not use heparin or ACD tubes. Serum route only.",
    "source": "Labcorp official directory, reviewed 2026-11-18 • https://www.labcorp.com/tests/551735/hepatitis-b-virus-hbv-dna-quantitative-real-time-pcr-with-reflex-to-hbv-genotype-plus-drug-resistance",
    "clinicalCategories": [
      "infectious",
      "hepatic"
    ],
    "searchAliases": [
      "HBV DNA viral load reflex genotype",
      "HBV drug resistance"
    ],
    "usePreferredSerumYield": true
  },
  {
    "id": "labcorp-verified-20261118-batch33-005330",
    "status": "active",
    "alternativeContainer": "",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperatureRaw": "Room Temperature",
    "stability": "14 days room temperature",
    "specialLabeling": "",
    "fastingStatus": "",
    "fastingInstructions": "",
    "testCode": "005330",
    "testName": "Hemoglobin (Hb) Solubility With Reflex to Hemoglobinopathy Fractionation Cascade, Blood",
    "specimenType": "Whole Blood",
    "drawContainer": "Lavender EDTA",
    "transportContainer": "Lavender EDTA",
    "preferredVolume": "1 mL whole blood",
    "minimumVolume": "0.6 mL whole blood",
    "transportTemperature": "Room Temperature",
    "spin": "No",
    "specialInstructions": "Collect a dedicated collection tube of EDTA whole blood. Submit original unspun tube at room temperature; no transfer. Do not share with other EDTA orders. No fasting required.",
    "source": "Labcorp official directory, reviewed 2026-11-18 • https://www.labcorp.com/tests/005330/hemoglobin-hb-solubility-with-reflex-to-hemoglobinopathy-fractionation-cascade-blood",
    "clinicalCategories": [
      "hematology",
      "iron-anemia"
    ],
    "searchAliases": [
      "sickle cell screen reflex",
      "Hb solubility",
      "hemoglobinopathy fractionation cascade"
    ]
  },
  {
    "id": "labcorp-verified-20261118-batch33-035741",
    "status": "active",
    "alternativeContainer": "",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperatureRaw": "Refrigerated",
    "stability": "Room 3 days; refrigerated 5 days; frozen 14 days",
    "specialLabeling": "",
    "fastingStatus": "",
    "fastingInstructions": "",
    "testCode": "035741",
    "testName": "Testicular Function Profile I",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "preferredVolume": "1.5 mL serum",
    "minimumVolume": "0.8 mL serum",
    "transportTemperature": "Refrigerated",
    "spin": "Yes",
    "specialInstructions": "Allow to clot, centrifuge and submit original spun SST refrigerated. Include patient age on requisition. Ask about high-dose biotin; Labcorp advises avoiding it for 72 hours before collection with clinician guidance.",
    "source": "Labcorp official directory, reviewed 2026-11-18 • https://www.labcorp.com/tests/035741/testicular-function-profile-i",
    "clinicalCategories": [
      "endocrinology",
      "reproductive"
    ],
    "searchAliases": [
      "male hormone panel",
      "FSH LH prolactin testosterone"
    ]
  },
  {
    "id": "labcorp-verified-20261118-batch33-048462",
    "status": "active",
    "alternativeContainer": "",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperatureRaw": "Refrigerated",
    "stability": "14 days room, refrigerated, or frozen; freeze/thaw x2",
    "specialLabeling": "",
    "fastingStatus": "",
    "fastingInstructions": "",
    "testCode": "048462",
    "testName": "Hirsutism Profile",
    "specimenType": "Serum",
    "drawContainer": "Red Top",
    "transportContainer": "Transport Tube",
    "preferredVolume": "2 mL serum",
    "minimumVolume": "1 mL serum",
    "transportTemperature": "Refrigerated",
    "spin": "Yes",
    "specialInstructions": "Collect plain red-top blood only, not SST; steroid adsorption to gel can interfere. Allow to clot, centrifuge and transfer separated serum to a plastic Transport Tube. Ask about high-dose biotin; Labcorp advises avoiding it for 72 hours before collection with clinician guidance.",
    "source": "Labcorp official directory, reviewed 2026-11-18 • https://www.labcorp.com/tests/048462/hirsutism-profile",
    "clinicalCategories": [
      "endocrinology",
      "reproductive"
    ],
    "searchAliases": [
      "androgen panel",
      "androstenedione DHEAS testosterone"
    ]
  },
  {
    "id": "labcorp-verified-20261118-batch33-165075",
    "status": "active",
    "alternativeContainer": "",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperatureRaw": "Room Temperature",
    "stability": "Refer to current test-specific directory",
    "specialLabeling": "",
    "fastingStatus": "",
    "fastingInstructions": "",
    "testCode": "165075",
    "testName": "Chronic Fatigue Profile",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "preferredVolume": "2 mL serum",
    "minimumVolume": "1 mL serum",
    "transportTemperature": "Room Temperature",
    "spin": "Yes",
    "specialInstructions": "Centrifuge SST and separate serum from cells within 2 hours. Submit spun SST and original EDTA whole blood at room temperature. Both specimens required.",
    "source": "Labcorp official directory, reviewed 2026-11-18 • https://www.labcorp.com/tests/165075/chronic-fatigue-profile",
    "clinicalCategories": [
      "chemistry",
      "hematology",
      "iron-anemia",
      "thyroid",
      "diabetes"
    ],
    "searchAliases": [
      "fatigue panel",
      "long COVID fatigue",
      "ME CFS"
    ],
    "usePreferredSerumYield": true,
    "additionalDrawRequirements": [
      {
        "container": "Lavender EDTA",
        "specimenType": "Whole Blood",
        "transportContainer": "Lavender EDTA",
        "preferredVolume": "8 mL whole blood",
        "minimumVolume": "0.5 mL whole blood",
        "transportTemperature": "Room Temperature",
        "transportTemperatureRaw": "Room Temperature",
        "spin": "No",
        "count": 2,
        "submissionCount": 2,
        "purpose": "CBC and hemoglobin A1c",
        "specialLabeling": "",
        "specialInstructions": "Collect the required EDTA whole blood in dedicated collection tubes; gently invert according to tube manufacturer. Submit original unspun tubes at room temperature; no transfer. Do not pool with other orders."
      }
    ]
  },
  {
    "id": "labcorp-verified-20261118-batch33-121065",
    "status": "active",
    "alternativeContainer": "",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperatureRaw": "Room Temperature",
    "stability": "Room/refrigerated 7 days; frozen 14 days",
    "specialLabeling": "",
    "fastingStatus": "",
    "fastingInstructions": "",
    "testCode": "121065",
    "testName": "eGFR Creatinine-Cystatin C Calculation With Albumin:Creatinine-Protein:Creatinine Ratios, Urine",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "preferredVolume": "1.5 mL serum",
    "minimumVolume": "1 mL serum",
    "transportTemperature": "Room Temperature",
    "spin": "Yes",
    "specialInstructions": "Both serum and random urine required. Allow serum to clot and centrifuge; submit original spun SST at room temperature. Collect unpreserved urine (pH 4–8). Do not collect visibly bloody urine.",
    "source": "Labcorp official directory, reviewed 2026-11-18 • https://www.labcorp.com/tests/121065/egfr-creatinine-cystatin-c-calculation-with-albumin-creatinine-protein-creatinine-ratios-urine",
    "clinicalCategories": [
      "renal",
      "urinary"
    ],
    "searchAliases": [
      "CKD panel",
      "creatinine cystatin C eGFR UACR UPCR"
    ],
    "additionalDrawRequirements": [
      {
        "container": "Sterile cup",
        "specimenType": "Urine",
        "transportContainer": "Sterile cup",
        "preferredVolume": "20 mL random urine",
        "minimumVolume": "2 mL random urine",
        "transportTemperature": "Room Temperature",
        "transportTemperatureRaw": "Room Temperature",
        "spin": "No",
        "count": 1,
        "submissionCount": 1,
        "purpose": "Random urine albumin and protein ratios",
        "specialLabeling": "",
        "specialInstructions": "Collect random urine directly into an unpreserved sterile cup (pH 4–8); submit original cup, no transfer or centrifugation. Label random urine."
      }
    ]
  },
  {
    "id": "labcorp-verified-20261118-batch33-160077",
    "status": "active",
    "alternativeContainer": "",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperatureRaw": "Refrigerated",
    "stability": "Refrigerated 7 days; frozen serum 6 months",
    "specialLabeling": "",
    "fastingStatus": "",
    "fastingInstructions": "",
    "testCode": "160077",
    "testName": "Acute Measles Panel, IgM Antibody and PCR",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "0.5 mL serum",
    "transportTemperature": "Refrigerated",
    "spin": "Yes",
    "specialInstructions": "Both serum and throat or NP swab required. Suspected measles requires facility airborne precautions and public-health coordination before collection. Allow serum to clot and centrifuge; submit original spun SST refrigerated; room temperature is unacceptable.",
    "source": "Labcorp official directory, reviewed 2026-11-18 • https://www.labcorp.com/tests/160077/acute-measles-panel-igm-antibody-and-pcr",
    "clinicalCategories": [
      "infectious",
      "respiratory"
    ],
    "searchAliases": [
      "rubeola IgM PCR",
      "measles serology and swab"
    ],
    "additionalDrawRequirements": [
      {
        "container": "Viral Transport Medium (VTM/UTM)",
        "specimenType": "Throat swab",
        "transportContainer": "Viral Transport Medium (VTM/UTM)",
        "preferredVolume": "1 swab",
        "minimumVolume": "1 swab",
        "transportTemperature": "Refrigerated",
        "transportTemperatureRaw": "Refrigerated",
        "spin": "No",
        "count": 1,
        "submissionCount": 1,
        "purpose": "Measles PCR",
        "specialLabeling": "",
        "specialInstructions": "Collect posterior pharyngeal swab (preferred) into approved VTM/UTM. NP swab is directory alternative. Label anatomical source. Submit original device refrigerated; do not spin or transfer. No ESwab or bacterial culture swab.",
        "stability": "Refrigerated 7 days; frozen 14 days; room unstable"
      }
    ]
  }
];
for(const record of additions){const prior=window.SEED_TESTS.find(t=>String(t.testCode||'').trim()===record.testCode);if(!prior){window.SEED_TESTS.push(record);continue;}if(['pending','reference'].includes(prior.status))Object.assign(prior,record,{id:prior.id||record.id});}
})();
