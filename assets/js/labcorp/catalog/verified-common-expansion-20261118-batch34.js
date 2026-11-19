/* Official Labcorp directory verified common / outpatient orders. Preserve existing records and use existing collection, submission, pooling, and label logic. */
(()=>{'use strict';if(!Array.isArray(window.SEED_TESTS))return;
const additions=[
  {
    "id": "labcorp-verified-20261118-batch34-123525",
    "status": "active",
    "alternativeContainer": "",
    "collectionCount": 1,
    "submissionCount": 1,
    "specialLabeling": "",
    "fastingStatus": "required",
    "fastingInstructions": "Fast 8–12 hours.",
    "testCode": "123525",
    "testName": "Lipid Panel With Diabetes Risk Index (DRI)",
    "specimenType": "Serum",
    "drawContainer": "Red Top",
    "transportContainer": "Transport Tube",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "0.5 mL serum",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "Yes",
    "specialInstructions": "Use plain red-top tube, not standard SST. Allow upright clotting for 45 minutes, centrifuge, and transfer serum to plastic transport tube. Refrigerate at 2–8°C and ship with frozen gel packs. Avoid hemolysis.",
    "source": "Labcorp official test directory, reviewed 2026-11-18 • https://www.labcorp.com/tests/123525/lipid-panel-with-diabetes-risk-index-dri",
    "clinicalCategories": [
      "lipids",
      "cardiac",
      "diabetes"
    ],
    "searchAliases": [
      "lipid DRI",
      "lipid diabetes risk"
    ],
    "stability": "Refrigerated 14 days"
  },
  {
    "id": "labcorp-verified-20261118-batch34-123510",
    "status": "active",
    "alternativeContainer": "",
    "collectionCount": 1,
    "submissionCount": 1,
    "specialLabeling": "",
    "fastingStatus": "",
    "fastingInstructions": "Fasting not routinely required; follow physician instructions if triglyceride assessment requires fasting.",
    "testCode": "123510",
    "testName": "Lipid Panel With GlycA (Inflammation)",
    "specimenType": "Serum",
    "drawContainer": "Red Top",
    "transportContainer": "Transport Tube",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "0.5 mL serum",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "Yes",
    "specialInstructions": "Use plain red-top tube, not standard SST. Allow upright clotting for 45 minutes, centrifuge, and transfer serum to plastic transport tube. Refrigerate at 2–8°C and ship with frozen gel packs. Avoid hemolysis.",
    "source": "Labcorp official test directory, reviewed 2026-11-18 • https://www.labcorp.com/tests/123510/lipid-panel-with-glyca-inflammation",
    "clinicalCategories": [
      "lipids",
      "cardiac",
      "diabetes"
    ],
    "searchAliases": [
      "lipid GlycA",
      "lipid inflammation"
    ],
    "stability": "Refrigerated 14 days"
  },
  {
    "id": "labcorp-verified-20261118-batch34-123559",
    "status": "active",
    "alternativeContainer": "",
    "collectionCount": 1,
    "submissionCount": 1,
    "specialLabeling": "",
    "fastingStatus": "required",
    "fastingInstructions": "Fast 8–12 hours.",
    "testCode": "123559",
    "testName": "Lipid Panel With GlycA (Inflammation) and Diabetes Risk Index (DRI)",
    "specimenType": "Serum",
    "drawContainer": "Red Top",
    "transportContainer": "Transport Tube",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "0.5 mL serum",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "Yes",
    "specialInstructions": "Use plain red-top tube, not standard SST. Allow upright clotting for 45 minutes, centrifuge, and transfer serum to plastic transport tube. Refrigerate at 2–8°C and ship with frozen gel packs. Avoid hemolysis.",
    "source": "Labcorp official test directory, reviewed 2026-11-18 • https://www.labcorp.com/tests/123559/lipid-panel-with-glyca-inflammation-and-diabetes-risk-index-dri",
    "clinicalCategories": [
      "lipids",
      "cardiac",
      "diabetes"
    ],
    "searchAliases": [
      "lipid GlycA DRI",
      "lipid inflammation diabetes"
    ],
    "stability": "Refrigerated 14 days"
  },
  {
    "id": "labcorp-verified-20261118-batch34-123855",
    "status": "active",
    "alternativeContainer": "",
    "collectionCount": 1,
    "submissionCount": 1,
    "specialLabeling": "",
    "fastingStatus": "required",
    "fastingInstructions": "Fast 8–12 hours.",
    "testCode": "123855",
    "testName": "Diabetes Risk Index (DRI)",
    "specimenType": "Plasma",
    "drawContainer": "Lavender EDTA",
    "transportContainer": "Transport Tube",
    "preferredVolume": "1 mL EDTA plasma",
    "minimumVolume": "0.5 mL EDTA plasma",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "Yes",
    "specialInstructions": "Collect in lavender-top EDTA tube without gel. Centrifuge, promptly separate plasma into plastic transport tube, and refrigerate at 2–8°C; ship with frozen gel packs. Do not use a standard SST.",
    "source": "Labcorp official test directory, reviewed 2026-11-18 • https://www.labcorp.com/tests/123855/diabetes-risk-index-dri",
    "clinicalCategories": [
      "diabetes",
      "lipids"
    ],
    "searchAliases": [
      "DRI",
      "diabetes risk index"
    ],
    "stability": "Refrigerated or frozen 14 days"
  },
  {
    "id": "labcorp-verified-20261118-batch34-167651",
    "status": "active",
    "alternativeContainer": "",
    "collectionCount": 1,
    "submissionCount": 1,
    "specialLabeling": "",
    "fastingStatus": "",
    "fastingInstructions": "If fasting requested for triglyceride assessment, 12–14 hours preferred; 8 hours acceptable.",
    "testCode": "167651",
    "testName": "Extended Lipid Panel With LDL-C Equivalent Calculation from Apolipoprotein B (ApoB)",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "Transport Tube",
    "preferredVolume": "2 mL serum",
    "minimumVolume": "1 mL serum",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "Yes",
    "specialInstructions": "Separate serum within 45 minutes and transfer to plastic transport tube. Fasting may be indicated for assessment of triglycerides.",
    "source": "Labcorp official test directory, reviewed 2026-11-18 • https://www.labcorp.com/tests/167651/extended-lipid-panel-with-ldl-c-equivalent-calculation-from-apolipoprotein-b-apob",
    "clinicalCategories": [
      "lipids",
      "cardiac"
    ],
    "searchAliases": [
      "extended lipid",
      "LDL-C equivalent",
      "ApoB equivalent"
    ],
    "stability": "Room 3 days; refrigerated/frozen 14 days",
    "usePreferredSerumYield": true
  },
  {
    "id": "labcorp-verified-20261118-batch34-100781",
    "status": "active",
    "alternativeContainer": "",
    "collectionCount": 1,
    "submissionCount": 1,
    "specialLabeling": "",
    "fastingStatus": "",
    "fastingInstructions": "",
    "testCode": "100781",
    "testName": "PrEP Use Only: eGFR With Creatinine",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "0.7 mL serum",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "Yes",
    "specialInstructions": "Allow serum to clot, centrifuge and submit spun SST. Do not collect in oxalate, citrate or EDTA. For PrEP monitoring only.",
    "source": "Labcorp official test directory, reviewed 2026-11-18 • https://www.labcorp.com/tests/100781/prep-use-only-egfr-with-creatinine",
    "clinicalCategories": [
      "renal",
      "sti"
    ],
    "searchAliases": [
      "PrEP creatinine",
      "PrEP kidney function"
    ],
    "stability": "Room/refrigerated/frozen 14 days"
  },
  {
    "id": "labcorp-verified-20261118-batch34-144613",
    "status": "active",
    "alternativeContainer": "",
    "collectionCount": 1,
    "submissionCount": 1,
    "specialLabeling": "",
    "fastingStatus": "",
    "fastingInstructions": "",
    "testCode": "144613",
    "testName": "PrEP Use Only: HCV Antibody With Reflex to Quantitative Real-time PCR",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "preferredVolume": "3 mL serum",
    "minimumVolume": "1.5 mL serum",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "Yes",
    "specialInstructions": "Centrifuge SST promptly and submit refrigerated. Do not freeze gel tube. Ask about high-dose biotin; follow Labcorp's 72-hour recommendation with clinician guidance. PrEP use only.",
    "source": "Labcorp official test directory, reviewed 2026-11-18 • https://www.labcorp.com/tests/144613/prep-use-only-hcv-antibody-with-reflex-to-quantitative-real-time-pcr",
    "clinicalCategories": [
      "infectious",
      "sti",
      "hepatic"
    ],
    "searchAliases": [
      "PrEP HCV reflex",
      "PrEP hepatitis C"
    ],
    "stability": "Room 24 hours; refrigerated 6 days; frozen separated serum 14 days",
    "usePreferredSerumYield": true
  },
  {
    "id": "labcorp-verified-20261118-batch34-083909",
    "status": "active",
    "alternativeContainer": "",
    "collectionCount": 1,
    "submissionCount": 1,
    "specialLabeling": "",
    "fastingStatus": "",
    "fastingInstructions": "",
    "testCode": "083909",
    "testName": "PrEP Use Only: HIV p24 Antigen/Antibody With Reflex to Confirmation",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "preferredVolume": "2 mL serum",
    "minimumVolume": "1 mL serum",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "Yes",
    "specialInstructions": "Centrifuge and submit original spun SST refrigerated; do not freeze gel tube. Ask about high-dose biotin and verify with clinician. PrEP use only.",
    "source": "Labcorp official test directory, reviewed 2026-11-18 • https://www.labcorp.com/tests/083909/prep-use-only-hiv-p24-antigen-antibody-with-reflex-to-confirmation",
    "clinicalCategories": [
      "infectious",
      "sti"
    ],
    "searchAliases": [
      "PrEP HIV Ag Ab",
      "PrEP HIV fourth generation"
    ],
    "stability": "Refrigerated 7 days",
    "usePreferredSerumYield": true
  },
  {
    "id": "labcorp-verified-20261118-batch34-006403",
    "status": "active",
    "alternativeContainer": "",
    "collectionCount": 1,
    "submissionCount": 1,
    "specialLabeling": "",
    "fastingStatus": "",
    "fastingInstructions": "",
    "testCode": "006403",
    "testName": "PrEP Use Only: RPR With Reflex to Titer and Treponemal Antibodies",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "preferredVolume": "2 mL serum",
    "minimumVolume": "1 mL serum",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "Yes",
    "specialInstructions": "Allow to clot, centrifuge and submit spun SST; avoid hemolysis and lipemia. No plasma. PrEP use only.",
    "source": "Labcorp official test directory, reviewed 2026-11-18 • https://www.labcorp.com/tests/006403/prep-use-only-rpr-with-reflex-to-titer-and-treponemal-antibodies",
    "clinicalCategories": [
      "sti",
      "infectious"
    ],
    "searchAliases": [
      "PrEP RPR",
      "PrEP syphilis"
    ],
    "stability": "Room/refrigerated/frozen 14 days",
    "usePreferredSerumYield": true
  },
  {
    "id": "labcorp-verified-20261118-batch34-082360",
    "status": "active",
    "alternativeContainer": "",
    "collectionCount": 1,
    "submissionCount": 1,
    "specialLabeling": "",
    "fastingStatus": "",
    "fastingInstructions": "",
    "testCode": "082360",
    "testName": "PrEP Use Only: T. pallidum (Syphilis) Cascade (Reverse Cascade)",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "0.5 mL serum",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "Yes",
    "specialInstructions": "Centrifuge and submit spun SST at room temperature. PrEP use only.",
    "source": "Labcorp official test directory, reviewed 2026-11-18 • https://www.labcorp.com/tests/082360/prep-use-only-t-pallidum-syphilis-cascade-reverse-cascade",
    "clinicalCategories": [
      "sti",
      "infectious"
    ],
    "searchAliases": [
      "PrEP syphilis reverse cascade",
      "PrEP treponemal antibody"
    ],
    "stability": "Room/refrigerated/frozen 14 days"
  },
  {
    "id": "labcorp-verified-20261118-batch34-311959",
    "status": "active",
    "alternativeContainer": "",
    "collectionCount": 1,
    "submissionCount": 1,
    "specialLabeling": "",
    "fastingStatus": "",
    "fastingInstructions": "",
    "testCode": "311959",
    "testName": "Weight Management Follow-Up Profile",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "preferredVolume": "2 mL serum",
    "minimumVolume": "",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "Yes",
    "specialInstructions": "Collect serum for lipid panel and a separate 4 mL EDTA whole blood specimen for HbA1c. Centrifuge SST, submit at room temperature. Follow component requirements; no routine fasting unless ordered.",
    "source": "Labcorp official test directory, reviewed 2026-11-18 • https://www.labcorp.com/tests/311959/weight-management-follow-up-profile",
    "clinicalCategories": [
      "lipids",
      "diabetes",
      "endocrinology"
    ],
    "searchAliases": [
      "weight management follow up",
      "lipid A1c",
      "weight loss monitoring"
    ],
    "usePreferredSerumYield": true,
    "additionalDrawRequirements": [
      {
        "container": "Lavender EDTA",
        "specimenType": "Whole Blood",
        "transportContainer": "Lavender EDTA",
        "preferredVolume": "4 mL whole blood",
        "minimumVolume": "",
        "transportTemperature": "Room Temperature",
        "transportTemperatureRaw": "Room Temperature",
        "spin": "No",
        "count": 1,
        "submissionCount": 1,
        "purpose": "Hemoglobin A1c",
        "specialLabeling": "",
        "specialInstructions": "Fill EDTA tube to its intended volume, invert gently, and submit original whole blood tube. Do not spin or transfer."
      }
    ],
    "stability": "See lipid panel and HbA1c component requirements"
  },
  {
    "id": "labcorp-verified-20261118-batch34-402145",
    "status": "active",
    "alternativeContainer": "",
    "collectionCount": 1,
    "submissionCount": 1,
    "specialLabeling": "",
    "fastingStatus": "",
    "fastingInstructions": "",
    "testCode": "402145",
    "testName": "Liver Fibrosis Risk Profile With Hepatic Function Panel, CBC With Differential, FIB-4, and APRI",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "preferredVolume": "4 mL serum",
    "minimumVolume": "2.5 mL serum",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "Yes",
    "specialInstructions": "Separate serum from cells within 45 minutes. Also collect full EDTA tube for CBC and platelets. Submit promptly at room temperature, avoid hemolysis.",
    "source": "Labcorp official test directory, reviewed 2026-11-18 • https://www.labcorp.com/tests/402145/liver-fibrosis-risk-profile-with-hepatic-function-panel-complete-blood-count-cbc-with-differential-fib-4-and-apri",
    "clinicalCategories": [
      "hepatic",
      "hematology"
    ],
    "searchAliases": [
      "liver fibrosis risk",
      "FIB4 APRI hepatic CBC"
    ],
    "usePreferredSerumYield": true,
    "stability": "Serum direct bilirubin 2 days; other serum components 3 days; whole blood 1 day at room temperature",
    "additionalDrawRequirements": [
      {
        "container": "Lavender EDTA",
        "specimenType": "Whole Blood",
        "transportContainer": "Lavender EDTA",
        "preferredVolume": "Full EDTA tube",
        "minimumVolume": "0.5 mL whole blood",
        "transportTemperature": "Room Temperature",
        "transportTemperatureRaw": "Room Temperature",
        "spin": "No",
        "count": 1,
        "submissionCount": 1,
        "purpose": "CBC with differential and platelets",
        "specialLabeling": "",
        "specialInstructions": "Fill EDTA tube to its intended volume, invert gently, and submit original whole blood tube. Do not spin or transfer."
      }
    ]
  },
  {
    "id": "labcorp-verified-20261118-batch34-385375",
    "status": "active",
    "alternativeContainer": "",
    "collectionCount": 1,
    "submissionCount": 1,
    "specialLabeling": "",
    "fastingStatus": "",
    "fastingInstructions": "",
    "testCode": "385375",
    "testName": "AST and Platelets With APRI",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "preferredVolume": "0.5 mL serum",
    "minimumVolume": "0.5 mL serum",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "Yes",
    "specialInstructions": "Separate serum within 45 minutes. Also collect EDTA whole blood for platelets. Submit both promptly; do not freeze whole blood.",
    "source": "Labcorp official test directory, reviewed 2026-11-18 • https://www.labcorp.com/tests/385375/ast-and-platelets-with-apri",
    "clinicalCategories": [
      "hepatic",
      "hematology"
    ],
    "searchAliases": [
      "APRI",
      "AST platelet ratio"
    ],
    "additionalDrawRequirements": [
      {
        "container": "Lavender EDTA",
        "specimenType": "Whole Blood",
        "transportContainer": "Lavender EDTA",
        "preferredVolume": "Full EDTA tube",
        "minimumVolume": "0.5 mL whole blood",
        "transportTemperature": "Room Temperature",
        "transportTemperatureRaw": "Room Temperature",
        "spin": "No",
        "count": 1,
        "submissionCount": 1,
        "purpose": "Platelet count",
        "specialLabeling": "",
        "specialInstructions": "Fill EDTA tube to its intended volume, invert gently, and submit original whole blood tube. Do not spin or transfer."
      }
    ],
    "stability": "Room 1 day; refrigerated 3 days; frozen unstable"
  },
  {
    "id": "labcorp-verified-20261118-batch34-121054",
    "status": "active",
    "alternativeContainer": "",
    "collectionCount": 1,
    "submissionCount": 1,
    "specialLabeling": "",
    "fastingStatus": "",
    "fastingInstructions": "",
    "testCode": "121054",
    "testName": "eGFR Creatinine-Cystatin C Calculation With Albumin:Creatinine Ratio, Urine",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "preferredVolume": "1.5 mL serum",
    "minimumVolume": "1 mL serum",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "Yes",
    "specialInstructions": "Centrifuge and submit spun SST. Collect separate random urine without preservative. Reject visibly bloody urine; urine pH 4–8.",
    "source": "Labcorp official test directory, reviewed 2026-11-18 • https://www.labcorp.com/tests/121054/egfr-creatinine-cystatin-c-calculation-with-albumin-creatinine-ratio-urine",
    "clinicalCategories": [
      "renal",
      "urinary"
    ],
    "searchAliases": [
      "eGFR cystatin C ACR",
      "CKD creatinine cystatin C urine albumin"
    ],
    "additionalDrawRequirements": [
      {
        "container": "Sterile cup",
        "specimenType": "Urine",
        "transportContainer": "Sterile cup",
        "preferredVolume": "10 mL random urine",
        "minimumVolume": "2 mL random urine",
        "transportTemperature": "Room Temperature",
        "transportTemperatureRaw": "Room Temperature",
        "spin": "No",
        "count": 1,
        "submissionCount": 1,
        "purpose": "Urine component",
        "specialLabeling": "",
        "specialInstructions": "Collect random urine in clean sterile cup without additives; submit original cup, label urine."
      }
    ],
    "stability": "Room/refrigerated 7 days; frozen 14 days"
  },
  {
    "id": "labcorp-verified-20261118-batch34-165065",
    "status": "active",
    "alternativeContainer": "",
    "collectionCount": 1,
    "submissionCount": 1,
    "specialLabeling": "",
    "fastingStatus": "",
    "fastingInstructions": "",
    "testCode": "165065",
    "testName": "Long COVID Profile",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "preferredVolume": "6 mL serum",
    "minimumVolume": "",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "Yes",
    "specialInstructions": "Separate serum within 2 hours. Collect full EDTA tube and urine specimen for urinalysis. Ask about high-dose biotin and follow Labcorp's 72-hour recommendation with clinician guidance.",
    "source": "Labcorp official test directory, reviewed 2026-11-18 • https://www.labcorp.com/tests/165065/long-covid-profile",
    "clinicalCategories": [
      "infectious",
      "chemistry",
      "hematology",
      "urinary"
    ],
    "searchAliases": [
      "long COVID",
      "post COVID profile"
    ],
    "usePreferredSerumYield": true,
    "additionalDrawRequirements": [
      {
        "container": "Lavender EDTA",
        "specimenType": "Whole Blood",
        "transportContainer": "Lavender EDTA",
        "preferredVolume": "Full EDTA tube",
        "minimumVolume": "",
        "transportTemperature": "Room Temperature",
        "transportTemperatureRaw": "Room Temperature",
        "spin": "No",
        "count": 1,
        "submissionCount": 1,
        "purpose": "CBC and whole blood components",
        "specialLabeling": "",
        "specialInstructions": "Fill EDTA tube to its intended volume, invert gently, and submit original whole blood tube. Do not spin or transfer."
      },
      {
        "container": "Sterile cup",
        "specimenType": "Urine",
        "transportContainer": "Red/Yellow Swirl UA Preservative Tube",
        "preferredVolume": "3–9 mL urine",
        "minimumVolume": "",
        "transportTemperature": "Room Temperature",
        "transportTemperatureRaw": "Room Temperature",
        "spin": "No",
        "count": 1,
        "submissionCount": 1,
        "purpose": "Urine component",
        "specialLabeling": "",
        "specialInstructions": "Collect voided urine; use clean catch if contamination is a concern. Transfer to UA preservative tube within the fill range and label urine."
      }
    ],
    "stability": "See individual component requirements"
  },
  {
    "id": "labcorp-verified-20261118-batch34-162020",
    "status": "active",
    "alternativeContainer": "",
    "collectionCount": 1,
    "submissionCount": 1,
    "specialLabeling": "",
    "fastingStatus": "",
    "fastingInstructions": "",
    "testCode": "162020",
    "testName": "Crohn's Disease Prognostic Profile",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "0.2 mL serum",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "Yes",
    "specialInstructions": "Centrifuge and submit spun SST; avoid hemolysis, gross lipemia, heat exposure and contamination. No plasma.",
    "source": "Labcorp official test directory, reviewed 2026-11-18 • https://www.labcorp.com/tests/162020/crohn-s-disease-prognostic-profile",
    "clinicalCategories": [
      "gi"
    ],
    "searchAliases": [
      "Crohn prognostic profile",
      "IBD prognosis"
    ],
    "stability": "Room 14 days"
  },
  {
    "id": "labcorp-verified-20261118-batch34-164113",
    "status": "active",
    "alternativeContainer": "",
    "collectionCount": 1,
    "submissionCount": 1,
    "specialLabeling": "",
    "fastingStatus": "",
    "fastingInstructions": "",
    "testCode": "164113",
    "testName": "Gluten Sensitivity Antibodies Cascade",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "0.5 mL serum",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "Yes",
    "specialInstructions": "Centrifuge and submit spun SST. Avoid gross hemolysis, lipemia and contamination.",
    "source": "Labcorp official test directory, reviewed 2026-11-18 • https://www.labcorp.com/tests/164113/gluten-sensitivity-antibodies-cascade",
    "clinicalCategories": [
      "gi",
      "immunology"
    ],
    "searchAliases": [
      "gluten sensitivity cascade",
      "gluten antibodies"
    ],
    "stability": "Room 14 days"
  },
  {
    "id": "labcorp-verified-20261118-batch34-185041",
    "status": "active",
    "alternativeContainer": "",
    "collectionCount": 1,
    "submissionCount": 1,
    "specialLabeling": "",
    "fastingStatus": "",
    "fastingInstructions": "",
    "testCode": "185041",
    "testName": "Adenovirus (Type 40/41), Direct Detection EIA",
    "specimenType": "Stool",
    "drawContainer": "Sterile cup",
    "transportContainer": "Sterile cup",
    "preferredVolume": "2 mL liquid stool or 2 g semiformed stool",
    "minimumVolume": "",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "specialInstructions": "Collect unpreserved stool in leakproof sterile cup. Refrigerate and submit promptly, preferably within 72 hours. No preservative, viral transport medium, diaper or room-temperature submission. Label stool; no spin or transfer.",
    "source": "Labcorp official test directory, reviewed 2026-11-18 • https://www.labcorp.com/tests/185041/adenovirus-type-40-41-direct-detection-eia",
    "clinicalCategories": [
      "gi",
      "infectious",
      "microbiology"
    ],
    "searchAliases": [
      "enteric adenovirus",
      "adenovirus stool antigen"
    ],
    "stability": "Refrigerated; submit promptly"
  },
  {
    "id": "labcorp-verified-20261118-batch34-067116",
    "status": "active",
    "alternativeContainer": "",
    "collectionCount": 1,
    "submissionCount": 1,
    "specialLabeling": "",
    "fastingStatus": "",
    "fastingInstructions": "",
    "testCode": "067116",
    "testName": "C002-IgE Penicillin V",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "preferredVolume": "0.2 mL serum",
    "minimumVolume": "0.1 mL serum",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "Yes",
    "specialInstructions": "Centrifuge and submit spun SST at room temperature.",
    "source": "Labcorp official test directory, reviewed 2026-11-18 • https://www.labcorp.com/tests/067116/c002-ige-penicillin-v",
    "clinicalCategories": [
      "allergy"
    ],
    "searchAliases": [
      "penicillin V IgE",
      "C002 penicillin allergy"
    ],
    "stability": "Room/refrigerated 14 days; frozen 18 months"
  }
];
for(const record of additions){const prior=window.SEED_TESTS.find(t=>String(t.testCode||'').trim()===record.testCode);if(!prior){window.SEED_TESTS.push(record);continue;}if(['pending','reference'].includes(prior.status))Object.assign(prior,record,{id:prior.id||record.id});}
})();
