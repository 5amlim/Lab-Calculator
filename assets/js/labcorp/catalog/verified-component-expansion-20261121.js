// Source-reviewed Labcorp orders with usable collection and submission routes.
(() => {
  'use strict';

  const additions = [
  {
    "id": "labcorp-compendium-review-000653",
    "testCode": "000653",
    "testName": "CK, Chloride, Creatinine, Potassium, Sodium, Pheochromocytoma Evaluation and Renin",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum within 45 minutes and refrigerate the original spun SST. Submit the first-morning urine and frozen EDTA plasma separately.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "renal",
      "endocrinology"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/000653",
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
        "specialInstructions": "Collect first-morning urine in an unpreserved sterile cup and refrigerate. Submit the original cup.",
        "specialLabeling": "Label FIRST-MORNING URINE",
        "submissionCount": 1,
        "container": "Sterile cup",
        "count": 1
      },
      {
        "purpose": "Renin activity",
        "specimenType": "Plasma",
        "transportContainer": "Frozen Transport Tube (Purple Cap)",
        "transportTemperature": "Frozen",
        "transportTemperatureRaw": "Frozen",
        "preferredVolume": "2.5 mL EDTA plasma",
        "minimumVolume": "",
        "spin": "Yes",
        "specialInstructions": "Follow renin collection instructions for posture and specimen handling. Separate EDTA plasma into its own screw-cap tube and freeze promptly.",
        "specialLabeling": "Label EDTA PLASMA FOR RENIN",
        "submissionCount": 1,
        "container": "Lavender EDTA",
        "count": 1
      }
    ]
  },
  {
    "id": "labcorp-compendium-review-001305",
    "testCode": "001305",
    "testName": "Creatine Kinase (CK) With Reflex to Isoenzymes",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum. Submit CK total in the original spun SST at room temperature. Send the separate isoenzyme reflex aliquot frozen.",
    "specialLabeling": "Label SERUM; TOTAL CK",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "chemistry",
      "cardiac"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/001305",
    "additionalDrawRequirements": [
      {
        "purpose": "CK isoenzyme reflex",
        "specimenType": "Serum",
        "transportContainer": "Frozen Transport Tube (Purple Cap)",
        "transportTemperature": "Frozen",
        "transportTemperatureRaw": "Frozen",
        "preferredVolume": "1 mL serum",
        "minimumVolume": "",
        "spin": "Yes",
        "specialInstructions": "Transfer the reflex aliquot into a dedicated plastic frozen transport tube and freeze.",
        "specialLabeling": "Label SERUM; CK ISOENZYME REFLEX",
        "submissionCount": 1,
        "container": "SST / Gold",
        "count": 1
      }
    ]
  },
  {
    "id": "labcorp-compendium-review-002659",
    "testCode": "002659",
    "testName": "BUN, Calcium, Chloride, Potassium, Sodium, Phosphorus and Creatinine Clearance",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Draw serum near the end of the 24-hour urine collection when feasible. Separate serum from cells within 45 minutes. Send serum and urine together at room temperature.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "renal",
      "chemistry"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/002659",
    "additionalDrawRequirements": [
      {
        "purpose": "Creatinine clearance",
        "specimenType": "24-Hour Urine",
        "transportContainer": "Sterile cup",
        "transportTemperature": "Room Temperature",
        "transportTemperatureRaw": "Room Temperature",
        "preferredVolume": "10 mL urine",
        "minimumVolume": "",
        "spin": "No",
        "specialInstructions": "Collect unpreserved 24-hour urine. Mix the complete collection and submit a 10 mL aliquot at room temperature. Record the total volume and start and end times.",
        "specialLabeling": "Label 24-HOUR URINE and record total volume and collection start and end times",
        "submissionCount": 1,
        "container": "24-Hour Urine Container",
        "count": 1
      }
    ]
  },
  {
    "id": "labcorp-compendium-review-009043",
    "testCode": "009043",
    "testName": "Pleural Fluid Cytology",
    "status": "active",
    "specimenType": "Pleural Fluid",
    "drawContainer": "120 mL Labcorp Cytology Collection Cup",
    "transportContainer": "120 mL Labcorp Cytology Collection Cup",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "50 mL or more",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Accept fluid collected by the treating provider in the Labcorp-approved 120 mL cup with integrated sampling device. Arrange immediate delivery to cytology. Refrigerate if held after hours. If more than 24 hours is anticipated, confirm the directory’s provider-prepared preservation route before collection. No transfer.",
    "specialLabeling": "Label PLEURAL FLUID and exact source",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "body-fluids",
      "oncology"
    ],
    "searchAliases": [
      "pleural effusion cytology"
    ],
    "source": "https://www.labcorp.com/tests/009043/pleural-fluid-cytology"
  },
  {
    "id": "labcorp-compendium-review-009050",
    "testCode": "009050",
    "testName": "Abdominal Fluid Cytology",
    "status": "active",
    "specimenType": "Peritoneal Fluid",
    "drawContainer": "120 mL Labcorp Cytology Collection Cup",
    "transportContainer": "120 mL Labcorp Cytology Collection Cup",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "50 mL or more",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Accept fluid collected by the treating provider in the Labcorp-approved 120 mL cup with integrated sampling device. Arrange immediate delivery to cytology. Refrigerate if held after hours. If more than 24 hours is anticipated, confirm the directory’s provider-prepared preservation route before collection. No transfer.",
    "specialLabeling": "Label PERITONEAL FLUID and exact source",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "body-fluids",
      "oncology"
    ],
    "searchAliases": [
      "ascites cytology"
    ],
    "source": "https://www.labcorp.com/tests/009050/abdominal-fluid-cytology"
  },
  {
    "id": "labcorp-compendium-review-009159",
    "testCode": "009159",
    "testName": "Miscellaneous Fluid Cytology",
    "status": "active",
    "specimenType": "Body Fluid",
    "drawContainer": "Sterile cup",
    "transportContainer": "Sterile cup",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "1–2 mL fluid",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Accept provider-collected fluid prepared in the original sterile container with the required equal volume of 50% ethyl alcohol or Saccomanno fixative. Refrigerate immediately and ship promptly to cytology. Record the anatomical source. No transfer.",
    "specialLabeling": "Label BODY FLUID and exact anatomical source",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "body-fluids",
      "oncology"
    ],
    "searchAliases": [
      "non gynecologic fluid cytology"
    ],
    "source": "https://www.labcorp.com/tests/009159/miscellaneous-fluid-cytology"
  },
  {
    "id": "labcorp-compendium-review-035527",
    "testCode": "035527",
    "testName": "Aerobic Culture + Gram Stain",
    "status": "active",
    "specimenType": "Wound Aspirate",
    "drawContainer": "Sterile cup",
    "transportContainer": "Sterile cup",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "0.5 mL aspirate",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Use sterile provider-collected wound aspirate or pus in the original leakproof sterile cup. Record the exact specimen site and maintain room temperature. No transfer.",
    "specialLabeling": "Label WOUND ASPIRATE and exact site",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "microbiology"
    ],
    "searchAliases": [
      "aerobic wound culture with gram stain"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/035527"
  },
  {
    "id": "labcorp-compendium-review-107110",
    "testCode": "107110",
    "testName": "KT/V Effective",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "3–5 mL per specimen",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Use the dialysis team’s pre-treatment sample collected before dialysis and heparin administration. Submit the original spun SST refrigerated. Keep pre- and post-treatment samples separate. Record pre- and post-dialysis weights on the requisition.",
    "specialLabeling": "Timed specimen 1: label PRE-DIALYSIS SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "renal"
    ],
    "searchAliases": [
      "dialysis BUN pre post"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/107110",
    "additionalDrawRequirements": [
      {
        "purpose": "Post-dialysis",
        "specimenType": "Serum",
        "transportContainer": "SST / Gold (spun)",
        "transportTemperature": "Refrigerated",
        "transportTemperatureRaw": "Refrigerated",
        "preferredVolume": "3–5 mL per specimen",
        "minimumVolume": "",
        "spin": "Yes",
        "specialInstructions": "Use the dialysis team’s post-treatment specimen after circuit blood has been returned. Keep the spun SST refrigerated.",
        "specialLabeling": "Timed specimen 2: label POST-DIALYSIS SERUM",
        "submissionCount": 1,
        "container": "SST / Gold",
        "count": 1
      }
    ]
  },
  {
    "id": "labcorp-compendium-review-107128",
    "testCode": "107128",
    "testName": "Urea Reduction Ratio (URR)",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "1 mL serum per specimen",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Use the dialysis team’s pre-treatment sample collected before dialysis and heparin administration. Submit the original spun SST refrigerated. Keep pre- and post-treatment samples separate.",
    "specialLabeling": "Timed specimen 1: label PRE-DIALYSIS SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "renal"
    ],
    "searchAliases": [
      "dialysis BUN pre post"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/107128",
    "additionalDrawRequirements": [
      {
        "purpose": "Post-dialysis",
        "specimenType": "Serum",
        "transportContainer": "SST / Gold (spun)",
        "transportTemperature": "Refrigerated",
        "transportTemperatureRaw": "Refrigerated",
        "preferredVolume": "1 mL serum per specimen",
        "minimumVolume": "",
        "spin": "Yes",
        "specialInstructions": "Use the dialysis team’s post-treatment specimen after circuit blood has been returned. Keep the spun SST refrigerated.",
        "specialLabeling": "Timed specimen 2: label POST-DIALYSIS SERUM",
        "submissionCount": 1,
        "container": "SST / Gold",
        "count": 1
      }
    ]
  },
  {
    "id": "labcorp-compendium-review-113110",
    "testCode": "113110",
    "testName": "Ketones, Random Urine",
    "status": "active",
    "specimenType": "Urine",
    "drawContainer": "Sterile cup",
    "transportContainer": "Urinalysis Transport Tube (Red/Yellow)",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "10 mL urine",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Collect random urine, transfer to the red/yellow urinalysis tube and fill to its marked range. Submit at room temperature.",
    "specialLabeling": "Label URINE",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "urinary",
      "diabetes"
    ],
    "searchAliases": [
      "urine ketones",
      "urine ketone"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/113110"
  },
  {
    "id": "labcorp-compendium-review-117024",
    "testCode": "117024",
    "testName": "Thrombotic Risk Profile, Acquired",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Centrifuge and refrigerate the original spun SST for the antibody component. Prepare and freeze the two citrate plasma aliquots separately.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "coagulation",
      "autoimmune"
    ],
    "searchAliases": [
      "APS antiphospholipid syndrome",
      "acquired thrombotic risk"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/117024",
    "additionalDrawRequirements": [
      {
        "purpose": "Coagulation component",
        "specimenType": "Platelet-Poor Plasma",
        "transportContainer": "Frozen Transport Tube (Purple Cap)",
        "transportTemperature": "Frozen",
        "transportTemperatureRaw": "Frozen",
        "preferredVolume": "2 mL platelet-poor plasma",
        "minimumVolume": "",
        "spin": "Yes",
        "specialInstructions": "Fill 3.2% citrate tubes to their calibrated mark and mix promptly. Prepare platelet-poor plasma with two centrifugations per Labcorp. Put 1 mL in each tube in two separately labeled screw-cap transport tubes and freeze immediately.",
        "specialLabeling": "Label PLATELET-POOR CITRATE PLASMA",
        "submissionCount": 2,
        "container": "Light Blue Sodium Citrate",
        "count": 2
      }
    ]
  },
  {
    "id": "labcorp-compendium-review-117105",
    "testCode": "117105",
    "testName": "Thrombotic Risk Profile, Acquired (Comprehensive-1)",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Centrifuge and refrigerate the original spun SST for the antibody component. Prepare and freeze the two citrate plasma aliquots separately.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "coagulation",
      "autoimmune"
    ],
    "searchAliases": [
      "APS antiphospholipid syndrome",
      "acquired thrombotic risk"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/117105",
    "additionalDrawRequirements": [
      {
        "purpose": "Coagulation component",
        "specimenType": "Platelet-Poor Plasma",
        "transportContainer": "Frozen Transport Tube (Purple Cap)",
        "transportTemperature": "Frozen",
        "transportTemperatureRaw": "Frozen",
        "preferredVolume": "4 mL platelet-poor plasma",
        "minimumVolume": "",
        "spin": "Yes",
        "specialInstructions": "Fill 3.2% citrate tubes to their calibrated mark and mix promptly. Prepare platelet-poor plasma with two centrifugations per Labcorp. Put 2 mL in each tube in two separately labeled screw-cap transport tubes and freeze immediately.",
        "specialLabeling": "Label PLATELET-POOR CITRATE PLASMA",
        "submissionCount": 2,
        "container": "Light Blue Sodium Citrate",
        "count": 3
      }
    ]
  },
  {
    "id": "labcorp-compendium-review-117320",
    "testCode": "117320",
    "testName": "AspirinWorks® (11-Dehydro Thromboxane B2)",
    "status": "active",
    "specimenType": "Urine",
    "drawContainer": "Sterile cup",
    "transportContainer": "Frozen Transport Tube (Purple Cap)",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "preferredVolume": "10 mL urine",
    "minimumVolume": "6 mL",
    "spin": "No",
    "specialInstructions": "Have a BD C&S or BD UAP urine preservative tube and a Labcorp PP transpak frozen tube ready. Collect urine in a clean sterile cup. Promptly fill the approved preservative tube with at least 5 mL to its required fill range and mix gently. Transfer the preserved urine to the purple screw-cap frozen transport tube. Freeze immediately. Ship only the final tube frozen.",
    "specialLabeling": "Label PRESERVED URINE; AspirinWorks",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "coagulation",
      "urinary"
    ],
    "searchAliases": [
      "11 dehydro thromboxane B2",
      "aspirin resistance"
    ],
    "source": "https://www.labcorp.com/tests/117320/aspirinworks-11-dehydro-thromboxane-b2"
  },
  {
    "id": "labcorp-compendium-review-121185",
    "testCode": "121185",
    "testName": "Troponin I High Sensitivity",
    "status": "active",
    "specimenType": "Plasma",
    "drawContainer": "Green Lithium Heparin",
    "transportContainer": "Frozen Transport Tube (Purple Cap)",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "preferredVolume": "1 mL lithium heparin plasma",
    "minimumVolume": "0.8 mL",
    "spin": "Yes",
    "specialInstructions": "Use the lithium-heparin plasma route. Separate plasma, transfer to a dedicated screw-cap plastic tube and freeze for the frozen shipping route. For time-critical testing, confirm the receiving site and available handling and turnaround before drawing.",
    "specialLabeling": "Label LITHIUM HEPARIN PLASMA",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "cardiac"
    ],
    "searchAliases": [
      "high sensitivity troponin I",
      "hs TnI"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/121185"
  },
  {
    "id": "labcorp-compendium-review-131888",
    "testCode": "131888",
    "testName": "Specific Gravity, Urine",
    "status": "active",
    "specimenType": "Urine",
    "drawContainer": "Sterile cup",
    "transportContainer": "Sterile cup",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "10 mL urine",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Submit the original clean, unpreserved screw-cap urine cup promptly at room temperature. No transfer.",
    "specialLabeling": "Label URINE",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "urinary"
    ],
    "searchAliases": [
      "urine SG",
      "urine specific gravity"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/131888"
  },
  {
    "id": "labcorp-compendium-review-182337",
    "testCode": "182337",
    "testName": "Dermatophyte Culture",
    "status": "active",
    "specimenType": "Skin Scrapings",
    "drawContainer": "Sterile cup",
    "transportContainer": "Sterile cup",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "Skin scrapings from active border",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Use the skin-scraping route. The clinician collects skin scrapings from the active edge of the lesion into a sterile container. Submit the original cup at room temperature. No transfer.",
    "specialLabeling": "Label SKIN SCRAPINGS and exact site",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "microbiology"
    ],
    "searchAliases": [
      "dermatophyte skin culture",
      "fungal skin scraping"
    ],
    "source": "https://www.labcorp.com/tests/182337/dermatophyte-culture"
  },
  {
    "id": "labcorp-compendium-review-205045",
    "testCode": "205045",
    "testName": "Prenatal Panel With CBC and Differential, RPR, ABO/Rh, Rubella and HBsAg",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "Red Top",
    "transportContainer": "Transport Tube",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "3 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Use the two-plain-red-top option. Centrifuge within 45 minutes and transfer separated serum to plastic transport. Submit separate EDTA tubes for the hematology and blood bank components.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 2,
    "submissionCount": 1,
    "clinicalCategories": [
      "pregnancy",
      "blood-bank",
      "hematology"
    ],
    "searchAliases": [
      "obstetric prenatal CBC rubella"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/205045",
    "additionalDrawRequirements": [
      {
        "purpose": "EDTA whole blood",
        "specimenType": "Whole Blood",
        "transportContainer": "Lavender EDTA",
        "transportTemperature": "Refrigerated",
        "transportTemperatureRaw": "Refrigerated",
        "preferredVolume": "8 mL total whole blood",
        "minimumVolume": "",
        "spin": "No",
        "specialInstructions": "Fill two separate lavender EDTA tubes and invert promptly. Refrigerate the original unspun tubes. Keep the CBC and blood bank specimens identifiable.",
        "specialLabeling": "Label EDTA WHOLE BLOOD",
        "submissionCount": 2,
        "container": "Lavender EDTA",
        "count": 2
      }
    ]
  },
  {
    "id": "labcorp-compendium-review-231888",
    "testCode": "231888",
    "testName": "ANA, ENA, dsDNA, Antichromatin and Complement Panel",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "2 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Centrifuge and send the original spun SST refrigerated for the antibody and routine complement components. Submit a separate frozen CH50 aliquot.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "autoimmune",
      "immunology"
    ],
    "searchAliases": [
      "ANA ENA complement dsDNA",
      "lupus autoimmune antibody panel"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/231888",
    "additionalDrawRequirements": [
      {
        "purpose": "Total complement CH50",
        "specimenType": "Serum",
        "transportContainer": "Frozen Transport Tube (Purple Cap)",
        "transportTemperature": "Frozen",
        "transportTemperatureRaw": "Frozen",
        "preferredVolume": "1 mL serum",
        "minimumVolume": "",
        "spin": "Yes",
        "specialInstructions": "Allow to clot at room temperature for 15–30 minutes. Centrifuge and transfer the CH50 aliquot to its own polypropylene tube. Freeze promptly.",
        "specialLabeling": "Label SERUM; CH50",
        "submissionCount": 1,
        "container": "SST / Gold",
        "count": 1
      }
    ]
  },
  {
    "id": "labcorp-compendium-review-236310",
    "testCode": "236310",
    "testName": "Urine Immunofixation, Free Light Chains and Protein, 24-Hour",
    "status": "active",
    "specimenType": "24-Hour Urine",
    "drawContainer": "24-Hour Urine Container",
    "transportContainer": "Sterile cup",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "12.5 mL urine",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Collect unpreserved 24-hour urine. Mix the complete collection and submit a 12.5 mL aliquot in a secure screw-cap cup. Refrigerate. Record total volume and collection times.",
    "specialLabeling": "Label 24-HOUR URINE and record total volume and collection start and end times",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "urinary",
      "immunology"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/236310"
  },
  {
    "id": "labcorp-compendium-review-236942",
    "testCode": "236942",
    "testName": "Lipids, Glucose, Cardiac CRP and Homocysteine",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "1.7 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum from cells. Submit the original spun SST refrigerated. Collect and process EDTA plasma separately for homocysteine.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "lipids",
      "cardiac"
    ],
    "searchAliases": [
      "lipids glucose crp homocysteine"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/236942",
    "additionalDrawRequirements": [
      {
        "purpose": "Homocysteine",
        "specimenType": "Plasma",
        "transportContainer": "Transport Tube",
        "transportTemperature": "Refrigerated",
        "transportTemperatureRaw": "Refrigerated",
        "preferredVolume": "1.2 mL EDTA plasma",
        "minimumVolume": "",
        "spin": "Yes",
        "specialInstructions": "Separate EDTA plasma immediately. If immediate processing is unavailable, keep the draw on ice and centrifuge within one hour. Transfer plasma to plastic transport and refrigerate.",
        "specialLabeling": "Label EDTA PLASMA",
        "submissionCount": 1,
        "container": "Lavender EDTA",
        "count": 1
      }
    ]
  },
  {
    "id": "labcorp-compendium-review-237305",
    "testCode": "237305",
    "testName": "Prenatal Panel With CBC and Differential, RPR, ABO/Rh and HBsAg",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "1.4 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum from cells and refrigerate the original spun SST. Submit the original unspun EDTA specimens separately.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "pregnancy",
      "blood-bank",
      "hematology"
    ],
    "searchAliases": [
      "obstetric prenatal CBC RPR"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/237305",
    "additionalDrawRequirements": [
      {
        "purpose": "EDTA whole blood",
        "specimenType": "Whole Blood",
        "transportContainer": "Lavender EDTA",
        "transportTemperature": "Refrigerated",
        "transportTemperatureRaw": "Refrigerated",
        "preferredVolume": "8 mL total whole blood",
        "minimumVolume": "",
        "spin": "No",
        "specialInstructions": "Fill two separate lavender EDTA tubes and invert promptly. Refrigerate the original unspun tubes. Keep the CBC and blood bank specimens identifiable.",
        "specialLabeling": "Label EDTA WHOLE BLOOD",
        "submissionCount": 2,
        "container": "Lavender EDTA",
        "count": 2
      }
    ]
  },
  {
    "id": "labcorp-compendium-review-242170",
    "testCode": "242170",
    "testName": "Vitamin B1, Bariatric",
    "status": "active",
    "specimenType": "Whole Blood",
    "drawContainer": "Lavender EDTA",
    "transportContainer": "Frozen Transport Tube (Purple Cap)",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "preferredVolume": "1 mL whole blood",
    "minimumVolume": "0.5 mL",
    "spin": "No",
    "specialInstructions": "Collect EDTA whole blood. Transfer unspun whole blood to a dedicated plastic screw-cap transport tube and freeze. Protect the specimen from light. Keep separate from other frozen tests.",
    "specialLabeling": "Label EDTA WHOLE BLOOD",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "vitamins"
    ],
    "searchAliases": [
      "thiamine",
      "vitamin B1 after bariatric surgery"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/242170"
  },
  {
    "id": "labcorp-compendium-review-259375",
    "testCode": "259375",
    "testName": "NMR LipoProfile With ApoB, Lp(a) and direct LDL",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum from cells. Refrigerate the original spun SST for ApoB, Lp(a) and direct LDL. Refrigerate the dedicated original NMR LipoTube separately.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "lipids",
      "cardiac"
    ],
    "searchAliases": [
      "advanced lipids nmr apob lpa"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/259375",
    "additionalDrawRequirements": [
      {
        "purpose": "NMR LipoProfile",
        "specimenType": "Serum",
        "transportContainer": "NMR LipoTube (Black/Yellow, spun and unopened)",
        "transportTemperature": "Refrigerated",
        "transportTemperatureRaw": "Refrigerated",
        "preferredVolume": "2 mL serum",
        "minimumVolume": "1 mL",
        "spin": "Yes",
        "specialInstructions": "Collect in the dedicated NMR LipoTube. Clot upright for 30 minutes, centrifuge, refrigerate the original spun tube unopened and ship with frozen cool packs. Keep the specimen refrigerated.",
        "specialLabeling": "Label SERUM; NMR LIPOPROFILE",
        "submissionCount": 1,
        "container": "NMR LipoTube (Black/Yellow)",
        "count": 1
      }
    ]
  },
  {
    "id": "labcorp-compendium-review-259387",
    "testCode": "259387",
    "testName": "NMR LipoProfile With ApoB, Lp(a), direct LDL, cardiac CRP and Lp-PLA2",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "2 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum from cells. Refrigerate the original spun SST for ApoB, Lp(a), direct LDL, cardiac CRP and Lp-PLA2. Refrigerate the dedicated original NMR LipoTube separately.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "lipids",
      "cardiac"
    ],
    "searchAliases": [
      "advanced lipids nmr apob lpa"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/259387",
    "additionalDrawRequirements": [
      {
        "purpose": "NMR LipoProfile",
        "specimenType": "Serum",
        "transportContainer": "NMR LipoTube (Black/Yellow, spun and unopened)",
        "transportTemperature": "Refrigerated",
        "transportTemperatureRaw": "Refrigerated",
        "preferredVolume": "2 mL serum",
        "minimumVolume": "1 mL",
        "spin": "Yes",
        "specialInstructions": "Collect in the dedicated NMR LipoTube. Clot upright for 30 minutes, centrifuge, refrigerate the original spun tube unopened and ship with frozen cool packs. Keep the specimen refrigerated.",
        "specialLabeling": "Label SERUM; NMR LIPOPROFILE",
        "submissionCount": 1,
        "container": "NMR LipoTube (Black/Yellow)",
        "count": 1
      }
    ]
  },
  {
    "id": "labcorp-compendium-review-267245",
    "testCode": "267245",
    "testName": "Creatinine and Protein Electrophoresis, 24-Hour Urine",
    "status": "active",
    "specimenType": "24-Hour Urine",
    "drawContainer": "24-Hour Urine Container",
    "transportContainer": "Sterile cup",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "100 mL total (50 mL per cup)",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Collect one unpreserved 24-hour urine. Mix the complete collection and submit two separate 50 mL aliquots in sterile screw-cap cups. Refrigerate and record the total volume and collection times.",
    "specialLabeling": "Label 24-HOUR URINE and record total volume and collection start and end times",
    "collectionCount": 1,
    "submissionCount": 2,
    "clinicalCategories": [
      "urinary",
      "renal"
    ],
    "searchAliases": [
      "24 hour urine upep creatinine"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/267245"
  },
  {
    "id": "labcorp-compendium-review-273805",
    "testCode": "273805",
    "testName": "Progesterone (2 Specimens)",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "0.7 mL",
    "spin": "Yes",
    "specialInstructions": "Collect the two specimens at the ordered times. Centrifuge and keep each original spun SST at room temperature. Submit together.",
    "specialLabeling": "Baseline: label SERUM and collection date and time",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "endocrinology",
      "reproductive"
    ],
    "searchAliases": [
      "timed progesterone",
      "progesterone 2 samples"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/273805",
    "additionalDrawRequirements": [
      {
        "purpose": "Second timed specimen",
        "specimenType": "Serum",
        "transportContainer": "SST / Gold (spun)",
        "transportTemperature": "Room Temperature",
        "transportTemperatureRaw": "Room Temperature",
        "preferredVolume": "1 mL serum",
        "minimumVolume": "0.7 mL",
        "spin": "Yes",
        "specialInstructions": "Collect at the ordered second time. Centrifuge and keep the original spun SST at room temperature.",
        "specialLabeling": "Timed specimen 2: label SERUM and collection date and time",
        "submissionCount": 1,
        "container": "SST / Gold",
        "count": 1
      }
    ]
  },
  {
    "id": "labcorp-compendium-review-303424",
    "testCode": "303424",
    "testName": "Calcium, Creatinine, Phosphorus, Intact PTH and Ionized Calcium",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "2 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Centrifuge the first SST for total calcium, creatinine, and phosphorus. Keep the unopened ionized calcium SST and refrigerated EDTA plasma separate.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "renal",
      "endocrinology"
    ],
    "searchAliases": [
      "calcium creatinine phosphate intact PTH ionized calcium"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/303424",
    "additionalDrawRequirements": [
      {
        "purpose": "Ionized calcium",
        "specimenType": "Serum",
        "transportContainer": "SST / Gold (spun, unopened)",
        "transportTemperature": "Room Temperature",
        "transportTemperatureRaw": "Room Temperature",
        "preferredVolume": "One dedicated full SST",
        "minimumVolume": "",
        "spin": "Yes",
        "specialInstructions": "Centrifuge and send the dedicated original spun SST at room temperature with the vacuum intact. Do not open.",
        "specialLabeling": "IONIZED CALCIUM - DO NOT OPEN",
        "submissionCount": 1,
        "container": "SST / Gold",
        "count": 1
      },
      {
        "purpose": "Intact PTH",
        "specimenType": "Plasma",
        "transportContainer": "Transport Tube",
        "transportTemperature": "Refrigerated",
        "transportTemperatureRaw": "Refrigerated",
        "preferredVolume": "1 mL EDTA plasma",
        "minimumVolume": "",
        "spin": "Yes",
        "specialInstructions": "Separate EDTA plasma into plastic transport and refrigerate.",
        "specialLabeling": "Label EDTA PLASMA",
        "submissionCount": 1,
        "container": "Lavender EDTA",
        "count": 1
      }
    ]
  },
  {
    "id": "labcorp-compendium-review-306139",
    "testCode": "306139",
    "testName": "Complement C4 and C1 Esterase Inhibitor, Quantitative and Functional",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "Transport Tube",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "1.2 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum within 30–60 minutes and transfer to plastic transport for C4 and quantitative C1 esterase inhibitor. Keep this aliquot at room temperature and the separate functional aliquot frozen.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "immunology",
      "autoimmune"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/306139",
    "additionalDrawRequirements": [
      {
        "purpose": "Functional C1 esterase inhibitor",
        "specimenType": "Serum",
        "transportContainer": "Frozen Transport Tube (Purple Cap)",
        "transportTemperature": "Frozen",
        "transportTemperatureRaw": "Frozen",
        "preferredVolume": "0.5 mL serum",
        "minimumVolume": "",
        "spin": "Yes",
        "specialInstructions": "Use plain red with no gel. Separate serum into plastic transport and freeze promptly.",
        "specialLabeling": "Label SERUM; FUNCTIONAL C1 ESTERASE INHIBITOR",
        "submissionCount": 1,
        "container": "Red Top",
        "count": 1
      }
    ]
  },
  {
    "id": "labcorp-compendium-review-372252",
    "testCode": "372252",
    "testName": "Creatine Kinase, CK-MB and High-Sensitivity Troponin T",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "2 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum from cells. Submit the original spun SST for CK and CK-MB and a separate frozen lithium-heparin plasma aliquot for troponin T.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "cardiac",
      "chemistry"
    ],
    "searchAliases": [
      "ck ckmb troponin t"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/372252",
    "additionalDrawRequirements": [
      {
        "purpose": "High-sensitivity Troponin T",
        "specimenType": "Plasma",
        "transportContainer": "Frozen Transport Tube (Purple Cap)",
        "transportTemperature": "Frozen",
        "transportTemperatureRaw": "Frozen",
        "preferredVolume": "1 mL plasma",
        "minimumVolume": "",
        "spin": "Yes",
        "specialInstructions": "Centrifuge, separate the lithium-heparin plasma into plastic transport and freeze.",
        "specialLabeling": "Label LITHIUM HEPARIN PLASMA",
        "submissionCount": 1,
        "container": "Green Lithium Heparin",
        "count": 1
      }
    ]
  },
  {
    "id": "labcorp-compendium-review-381630",
    "testCode": "381630",
    "testName": "Cryptosporidium, Cyclospora and Giardia, Stool",
    "status": "active",
    "specimenType": "Stool",
    "drawContainer": "Sterile cup",
    "transportContainer": "Para-Pak Pink Formalin Vial",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "5 g stool",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Collect stool in a clean sterile cup. Transfer the specimen to a pink Para-Pak formalin vial according to its fill instructions. Ship at room temperature.",
    "specialLabeling": "Label STOOL",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "parasitology",
      "gi"
    ],
    "searchAliases": [
      "crypto cyclo giardia"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/381630"
  },
  {
    "id": "labcorp-compendium-review-382583",
    "testCode": "382583",
    "testName": "Prenatal Panel With CBC and Differential, HIV, RPR, ABO/Rh, Rubella and HBsAg",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "2 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum and refrigerate the original spun SST for HBV, RPR and rubella. Submit the dedicated unopened HIV SST and the original EDTA tubes separately.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "pregnancy",
      "blood-bank",
      "hematology"
    ],
    "searchAliases": [
      "obstetric prenatal panel hiv"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/382583",
    "additionalDrawRequirements": [
      {
        "purpose": "Dedicated HIV screen",
        "specimenType": "Serum",
        "transportContainer": "SST / Gold (spun, unopened)",
        "transportTemperature": "Refrigerated",
        "transportTemperatureRaw": "Refrigerated",
        "preferredVolume": "2 mL serum",
        "minimumVolume": "",
        "spin": "Yes",
        "specialInstructions": "Use a dedicated SST for HIV antigen and antibody screening and reflexes. Centrifuge and refrigerate the original unopened tube.",
        "specialLabeling": "Label SERUM; HIV SCREEN",
        "submissionCount": 1,
        "container": "SST / Gold",
        "count": 1
      },
      {
        "purpose": "EDTA whole blood",
        "specimenType": "Whole Blood",
        "transportContainer": "Lavender EDTA",
        "transportTemperature": "Refrigerated",
        "transportTemperatureRaw": "Refrigerated",
        "preferredVolume": "8 mL total whole blood",
        "minimumVolume": "",
        "spin": "No",
        "specialInstructions": "Fill two separate lavender EDTA tubes and invert promptly. Refrigerate the original unspun tubes. Keep the CBC and blood bank specimens identifiable.",
        "specialLabeling": "Label EDTA WHOLE BLOOD",
        "submissionCount": 2,
        "container": "Lavender EDTA",
        "count": 2
      }
    ]
  },
  {
    "id": "labcorp-compendium-review-388944",
    "testCode": "388944",
    "testName": "Prenatal Panel With CBC, HIV, RPR, ABO/Rh, Rubella and HBsAg",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "2 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum and refrigerate the original spun SST for HBV, RPR and rubella. Submit the dedicated unopened HIV SST and the original EDTA tubes separately.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "pregnancy",
      "blood-bank",
      "hematology"
    ],
    "searchAliases": [
      "obstetric prenatal panel hiv"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/388944",
    "additionalDrawRequirements": [
      {
        "purpose": "Dedicated HIV screen",
        "specimenType": "Serum",
        "transportContainer": "SST / Gold (spun, unopened)",
        "transportTemperature": "Refrigerated",
        "transportTemperatureRaw": "Refrigerated",
        "preferredVolume": "2 mL serum",
        "minimumVolume": "",
        "spin": "Yes",
        "specialInstructions": "Use a dedicated SST for HIV antigen and antibody screening and reflexes. Centrifuge and refrigerate the original unopened tube.",
        "specialLabeling": "Label SERUM; HIV SCREEN",
        "submissionCount": 1,
        "container": "SST / Gold",
        "count": 1
      },
      {
        "purpose": "EDTA whole blood",
        "specimenType": "Whole Blood",
        "transportContainer": "Lavender EDTA",
        "transportTemperature": "Refrigerated",
        "transportTemperatureRaw": "Refrigerated",
        "preferredVolume": "8 mL total whole blood",
        "minimumVolume": "",
        "spin": "No",
        "specialInstructions": "Fill two separate lavender EDTA tubes and invert promptly. Refrigerate the original unspun tubes. Keep the CBC and blood bank specimens identifiable.",
        "specialLabeling": "Label EDTA WHOLE BLOOD",
        "submissionCount": 2,
        "container": "Lavender EDTA",
        "count": 2
      }
    ]
  },
  {
    "id": "labcorp-compendium-review-392259",
    "testCode": "392259",
    "testName": "Glucose and Insulin, Four Timed Specimens",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "2 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Follow the ordering clinician’s fasting and post-intake protocol. Separate serum from cells within 45 minutes. Refrigerate each original spun SST and submit all four timed tubes together.",
    "specialLabeling": "Baseline: label FASTING SERUM and record actual collection time",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "diabetes"
    ],
    "searchAliases": [
      "4 specimen glucose insulin",
      "glucose insulin tolerance"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/392259",
    "fastingStatus": "required",
    "fastingInstructions": "Follow the ordering clinician’s fasting interval and intake instructions.",
    "additionalDrawRequirements": [
      {
        "purpose": "30 minutes",
        "specimenType": "Serum",
        "transportContainer": "SST / Gold (spun)",
        "transportTemperature": "Refrigerated",
        "transportTemperatureRaw": "Refrigerated",
        "preferredVolume": "2 mL serum",
        "minimumVolume": "",
        "spin": "Yes",
        "specialInstructions": "Follow the ordering clinician’s fasting and post-intake protocol. Separate serum from cells within 45 minutes. Refrigerate each original spun SST and submit all four timed tubes together.",
        "specialLabeling": "30 minutes: label SERUM and record actual collection time",
        "submissionCount": 1,
        "container": "SST / Gold",
        "count": 1
      },
      {
        "purpose": "60 minutes",
        "specimenType": "Serum",
        "transportContainer": "SST / Gold (spun)",
        "transportTemperature": "Refrigerated",
        "transportTemperatureRaw": "Refrigerated",
        "preferredVolume": "2 mL serum",
        "minimumVolume": "",
        "spin": "Yes",
        "specialInstructions": "Follow the ordering clinician’s fasting and post-intake protocol. Separate serum from cells within 45 minutes. Refrigerate each original spun SST and submit all four timed tubes together.",
        "specialLabeling": "60 minutes: label SERUM and record actual collection time",
        "submissionCount": 1,
        "container": "SST / Gold",
        "count": 1
      },
      {
        "purpose": "90 minutes",
        "specimenType": "Serum",
        "transportContainer": "SST / Gold (spun)",
        "transportTemperature": "Refrigerated",
        "transportTemperatureRaw": "Refrigerated",
        "preferredVolume": "2 mL serum",
        "minimumVolume": "",
        "spin": "Yes",
        "specialInstructions": "Follow the ordering clinician’s fasting and post-intake protocol. Separate serum from cells within 45 minutes. Refrigerate each original spun SST and submit all four timed tubes together.",
        "specialLabeling": "90 minutes: label SERUM and record actual collection time",
        "submissionCount": 1,
        "container": "SST / Gold",
        "count": 1
      }
    ]
  },
  {
    "id": "labcorp-compendium-review-484415",
    "testCode": "484415",
    "testName": "Alzheimer's Disease Evaluation Profile, CSF",
    "status": "active",
    "specimenType": "CSF",
    "drawContainer": "Sarstedt CSF Tube 63.614.625",
    "transportContainer": "Sarstedt CSF Tube 63.614.625",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "1 mL CSF",
    "minimumVolume": "0.7 mL",
    "spin": "No",
    "specialInstructions": "Arrange the exact manufacturer tube with the collecting provider before the procedure. The collecting provider uses gravity drip before noon and excludes the first 2 mL of CSF from this assay. Accept their original Sarstedt 63.614.625 tube. Refrigerate without mixing, aliquoting, or freezing. No transfer.",
    "specialLabeling": "Label CSF",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "neurology",
      "body-fluids"
    ],
    "searchAliases": [
      "CSF Alzheimer biomarker profile",
      "amyloid tau CSF"
    ],
    "source": "https://www.labcorp.com/tests/484415/alzheimer-s-disease-evaluation-profile-csf"
  },
  {
    "id": "labcorp-compendium-review-485235",
    "testCode": "485235",
    "testName": "Prostate Cancer Profile II (Serial Monitor)",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "0.5 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Centrifuge serum. Refrigerate the original spun SST for the non-PAP components. Collect separate serum for the frozen PAP aliquot. Use the approved Labcorp account workflow for serial monitor identifiers.",
    "specialLabeling": "Label SERUM; refrigerated monitor components",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "oncology"
    ],
    "searchAliases": [
      "prostate cancer serial monitor",
      "PSA and PAP"
    ],
    "source": "https://www.labcorp.com/tests/485235/prostate-cancer-profile-ii-serial-monitor",
    "additionalDrawRequirements": [
      {
        "purpose": "Prostatic acid phosphatase",
        "specimenType": "Serum",
        "transportContainer": "Frozen Transport Tube (Purple Cap)",
        "transportTemperature": "Frozen",
        "transportTemperatureRaw": "Frozen",
        "preferredVolume": "0.5 mL serum",
        "minimumVolume": "",
        "spin": "Yes",
        "specialInstructions": "Separate the prostatic acid phosphatase serum aliquot into a plastic frozen transport tube. Freeze promptly. Do not use acid phosphatase preservative transport.",
        "specialLabeling": "Label SERUM; PAP",
        "submissionCount": 1,
        "container": "SST / Gold",
        "count": 1
      }
    ]
  },
  {
    "id": "labcorp-compendium-review-485466",
    "testCode": "485466",
    "testName": "Prostate Cancer Monitor I",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "3.5 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Centrifuge serum. Refrigerate the original spun SST for the non-PAP components. Collect separate serum for the frozen PAP aliquot. Use the approved Labcorp account workflow for serial monitor identifiers.",
    "specialLabeling": "Label SERUM; refrigerated monitor components",
    "collectionCount": 2,
    "submissionCount": 2,
    "clinicalCategories": [
      "oncology"
    ],
    "searchAliases": [
      "prostate cancer serial monitor",
      "PSA and PAP"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/485466",
    "additionalDrawRequirements": [
      {
        "purpose": "Prostatic acid phosphatase",
        "specimenType": "Serum",
        "transportContainer": "Frozen Transport Tube (Purple Cap)",
        "transportTemperature": "Frozen",
        "transportTemperatureRaw": "Frozen",
        "preferredVolume": "0.5 mL serum",
        "minimumVolume": "",
        "spin": "Yes",
        "specialInstructions": "Separate the prostatic acid phosphatase serum aliquot into a plastic frozen transport tube. Freeze promptly. Do not use acid phosphatase preservative transport.",
        "specialLabeling": "Label SERUM; PAP",
        "submissionCount": 1,
        "container": "SST / Gold",
        "count": 1
      }
    ]
  },
  {
    "id": "labcorp-compendium-review-510195",
    "testCode": "510195",
    "testName": "Multiple Myeloma Enrichment SNP Microarray−Oncology (Reveal®)",
    "status": "active",
    "specimenType": "Bone Marrow",
    "drawContainer": "Green Sodium Heparin",
    "transportContainer": "Green Sodium Heparin",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "2 mL marrow",
    "minimumVolume": "1 mL for array only",
    "spin": "No",
    "specialInstructions": "Accept provider-collected bone marrow in a size-appropriate sodium-heparin tube confirmed with the collecting provider. Gently mix and submit the original unspun tube at room temperature. Arrange same-day shipment and include diagnosis and prior cytogenetic studies. No transfer.",
    "specialLabeling": "Label BONE MARROW",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "hematology",
      "oncology",
      "genetics"
    ],
    "searchAliases": [
      "marrow myeloma SNP microarray"
    ],
    "source": "https://www.labcorp.com/tests/510195/multiple-myeloma-enrichment-snp-microarray-oncology-reveal"
  },
  {
    "id": "labcorp-compendium-review-510325",
    "testCode": "510325",
    "testName": "Multiple Myeloma (MM) Profile, FISH",
    "status": "active",
    "specimenType": "Bone Marrow",
    "drawContainer": "Green Sodium Heparin",
    "transportContainer": "Green Sodium Heparin",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "1–3 mL marrow",
    "minimumVolume": "1 mL marrow",
    "spin": "No",
    "specialInstructions": "Accept provider-collected bone marrow in a size-appropriate sodium-heparin tube confirmed with the collecting provider. Gently mix and submit the original unspun tube at room temperature. Arrange same-day shipment and include diagnosis and prior cytogenetic studies. No transfer.",
    "specialLabeling": "Label BONE MARROW",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "hematology",
      "oncology",
      "genetics"
    ],
    "searchAliases": [
      "myeloma marrow fish"
    ],
    "source": "https://www.labcorp.com/tests/510325/multiple-myeloma-mm-profile-fish"
  },
  {
    "id": "labcorp-compendium-review-510904",
    "testCode": "510904",
    "testName": "Multiple Myeloma Enriched Microarray and Multiple Myeloma FISH",
    "status": "active",
    "specimenType": "Bone Marrow",
    "drawContainer": "Green Sodium Heparin",
    "transportContainer": "Green Sodium Heparin",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "1–3 mL marrow",
    "minimumVolume": "1 mL marrow",
    "spin": "No",
    "specialInstructions": "Accept provider-collected bone marrow in a size-appropriate sodium-heparin tube confirmed with the collecting provider. Gently mix and submit the original unspun tube at room temperature. Arrange same-day shipment and include diagnosis and prior cytogenetic studies. No transfer.",
    "specialLabeling": "Label BONE MARROW",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "hematology",
      "oncology",
      "genetics"
    ],
    "searchAliases": [
      "myeloma marrow fish"
    ],
    "source": "https://www.labcorp.com/tests/510904/multiple-myeloma-enriched-microarray-and-multiple-myeloma-fish"
  },
  {
    "id": "labcorp-compendium-review-519180",
    "testCode": "519180",
    "testName": "Postvasectomy Sperm Count",
    "status": "active",
    "specimenType": "Semen",
    "drawContainer": "Sterile cup",
    "transportContainer": "Sterile cup",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "Entire ejaculate",
    "minimumVolume": "0.5 mL",
    "spin": "No",
    "specialInstructions": "Collect in a sterile screw-cap container without additives. Keep at room temperature and arrange receipt so testing starts within 72 hours of collection. No transfer.",
    "specialLabeling": "Label SEMEN and actual collection time",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "reproductive"
    ],
    "searchAliases": [
      "post vasectomy sperm count",
      "PVSA"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/519180"
  },
  {
    "id": "labcorp-compendium-review-550410",
    "testCode": "550410",
    "testName": "HIV-1 RNA, Quantitative PCR, CSF",
    "status": "active",
    "specimenType": "CSF",
    "drawContainer": "Frozen Transport Tube (Purple Cap)",
    "transportContainer": "Frozen Transport Tube (Purple Cap)",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "preferredVolume": "3.5 mL CSF",
    "minimumVolume": "1.1 mL",
    "spin": "No",
    "specialInstructions": "Accept provider-collected CSF in the original screw-cap polypropylene tube. Keep the tube separate from other orders and freeze. Pop-top and snap-cap tubes are unacceptable. No transfer.",
    "specialLabeling": "Label CSF",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "body-fluids",
      "infectious"
    ],
    "searchAliases": [
      "CSF HIV RNA PCR"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/550410"
  },
  {
    "id": "labcorp-compendium-review-810200",
    "testCode": "810200",
    "testName": "Cathartic Laxative Stool",
    "status": "active",
    "specimenType": "Stool",
    "drawContainer": "Sterile cup",
    "transportContainer": "Trace Metal-Free Plastic Container",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "20 g stool or 20 mL liquid stool",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Confirm availability of the performing laboratory’s acid-washed trace-metal-free plastic transfer tube. Submit the aliquot refrigerated.",
    "specialLabeling": "Label STOOL",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "gi",
      "toxicology"
    ],
    "searchAliases": [
      "stool cathartic laxative profile"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/810200"
  },
  {
    "id": "labcorp-compendium-review-828795",
    "testCode": "828795",
    "testName": "Microsporidia Stain",
    "status": "active",
    "specimenType": "Stool",
    "drawContainer": "Sterile cup",
    "transportContainer": "Para-Pak Pink Formalin Vial",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "2 g stool",
    "minimumVolume": "1 g",
    "spin": "No",
    "specialInstructions": "Collect stool in a clean sterile cup. Transfer to 10% formalin within one hour using the pink Para-Pak formalin vial. Keep at room temperature. Collect subsequent specimens on separate orders as indicated.",
    "specialLabeling": "Label STOOL",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "parasitology",
      "gi"
    ],
    "searchAliases": [
      "microsporidia stool"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/828795"
  },
  {
    "id": "labcorp-compendium-review-831572",
    "testCode": "831572",
    "testName": "Smi. Lem. Opi. Syn. - Pre. Dia",
    "status": "active",
    "specimenType": "Amniotic Fluid",
    "drawContainer": "Sterile Plastic Conical Tube",
    "transportContainer": "Sterile Plastic Conical Tube",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "5 mL amniotic fluid supernatant",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Use the provider-collected amniotic fluid supernatant route. Submit the original sterile tube at room temperature. Labcorp’s referral laboratory handles freezing for the onward shipment. No transfer.",
    "specialLabeling": "Label AMNIOTIC FLUID SUPERNATANT",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "genetics"
    ],
    "searchAliases": [
      "Smith Lemli Opitz prenatal biochemical"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/831572"
  },
  {
    "id": "labcorp-compendium-review-832658",
    "testCode": "832658",
    "testName": "Disaccharidase Deter. w/Interp",
    "status": "active",
    "specimenType": "Small Bowel Tissue",
    "drawContainer": "Sterile cup",
    "transportContainer": "Sterile cup",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "preferredVolume": "5 mg small bowel tissue",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Accept provider-collected small bowel tissue in the original empty sterile container. Freeze promptly. No fixative, saline, gauze, foil, or other support medium. No transfer.",
    "specialLabeling": "Label SMALL BOWEL TISSUE",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "gi"
    ],
    "searchAliases": [
      "intestinal disaccharidases",
      "lactase sucrase maltase"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/832658"
  },
  {
    "id": "labcorp-compendium-review-835467",
    "testCode": "835467",
    "testName": "PTH, FNAB, Needle Wash",
    "status": "active",
    "specimenType": "Fine Needle Wash",
    "drawContainer": "Plastic Screw-Cap Specimen Tube",
    "transportContainer": "Plastic Screw-Cap Specimen Tube",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "preferredVolume": "0.5–1.5 mL needle wash",
    "minimumVolume": "0.5 mL",
    "spin": "No",
    "specialInstructions": "Accept the collecting provider’s already prepared saline needle wash in its dedicated plastic screw-cap tube. Use only the clear, prepared specimen for this route. Freeze within two to four hours. Separate tubes and orders are required for different biopsy sites. No transfer.",
    "specialLabeling": "Label NEEDLE WASH and exact site",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "endocrinology"
    ],
    "searchAliases": [
      "PTH FNA washout",
      "PTH needle wash"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/835467"
  },
  {
    "id": "labcorp-compendium-review-840029",
    "testCode": "840029",
    "testName": "Iron, Liver",
    "status": "active",
    "specimenType": "Liver Tissue",
    "drawContainer": "Trace Metal-Free Plastic Container",
    "transportContainer": "Trace Metal-Free Plastic Container",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "At least 1 cm of liver tissue",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Accept fresh provider-collected liver tissue in the original metal-free polypropylene vial. Refrigerate. Document specimen source. No transfer.",
    "specialLabeling": "Label LIVER TISSUE",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "heavy-metals",
      "hepatic"
    ],
    "searchAliases": [
      "hepatic iron",
      "liver iron index"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/840029"
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
  "117320": [
    "4–9 days",
    9,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/117320/aspirinworks-11-dehydro-thromboxane-b2"
  ],
  "121185": [
    "1–3 days",
    3,
    "Labcorp CDOS compendium",
    "",
    "https://cdos.halfpenny.com/labcorp/TestDisplay/121185"
  ],
  "485235": [
    "2–4 days",
    4,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/485235/prostate-cancer-profile-ii-serial-monitor"
  ],
  "182337": [
    "14–35 days",
    35,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/182337/dermatophyte-culture"
  ],
  "828795": [
    "4–8 days",
    8,
    "Labcorp CDOS compendium",
    "",
    "https://cdos.halfpenny.com/labcorp/TestDisplay/828795"
  ],
  "810200": [
    "17–26 days",
    26,
    "Labcorp CDOS compendium",
    "",
    "https://cdos.halfpenny.com/labcorp/TestDisplay/810200"
  ],
  "009043": [
    "2–6 days",
    6,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/009043/pleural-fluid-cytology"
  ],
  "009050": [
    "2–6 days",
    6,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/009050/abdominal-fluid-cytology"
  ],
  "009159": [
    "2–6 days",
    6,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/009159/miscellaneous-fluid-cytology"
  ],
  "484415": [
    "2–4 days",
    4,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/484415/alzheimer-s-disease-evaluation-profile-csf"
  ],
  "510195": [
    "11–15 days",
    15,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/510195/multiple-myeloma-enrichment-snp-microarray-oncology-reveal"
  ],
  "510325": [
    "5–7 days",
    7,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/510325/multiple-myeloma-mm-profile-fish"
  ],
  "510904": [
    "10–14 days",
    14,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/510904/multiple-myeloma-enriched-microarray-and-multiple-myeloma-fish"
  ],
  "550410": [
    "Within 5 days",
    5,
    "Labcorp CDOS compendium",
    "",
    "https://cdos.halfpenny.com/labcorp/TestDisplay/550410"
  ],
  "831572": [
    "13–17 days",
    17,
    "Labcorp CDOS compendium",
    "",
    "https://cdos.halfpenny.com/labcorp/TestDisplay/831572"
  ],
  "832658": [
    "1–3 days",
    3,
    "Labcorp CDOS compendium",
    "",
    "https://cdos.halfpenny.com/labcorp/TestDisplay/832658"
  ],
  "835467": [
    "4–6 days",
    6,
    "Labcorp CDOS compendium",
    "",
    "https://cdos.halfpenny.com/labcorp/TestDisplay/835467"
  ],
  "840029": [
    "6–13 days",
    13,
    "Labcorp CDOS compendium",
    "",
    "https://cdos.halfpenny.com/labcorp/TestDisplay/840029"
  ],
  "231888": [
    "2–4 days",
    4,
    "Labcorp CDOS compendium",
    "",
    "https://cdos.halfpenny.com/labcorp/TestDisplay/231888"
  ],
  "205045": [
    "1–3 days",
    3,
    "Labcorp CDOS compendium",
    "",
    "https://cdos.halfpenny.com/labcorp/TestDisplay/205045"
  ],
  "259375": [
    "2–5 days",
    5,
    "Labcorp CDOS compendium",
    "",
    "https://cdos.halfpenny.com/labcorp/TestDisplay/259375"
  ],
  "259387": [
    "4–6 days",
    6,
    "Labcorp CDOS compendium",
    "",
    "https://cdos.halfpenny.com/labcorp/TestDisplay/259387"
  ],
  "117024": [
    "3–4 days",
    4,
    "Labcorp CDOS compendium",
    "",
    "https://cdos.halfpenny.com/labcorp/TestDisplay/117024"
  ],
  "117105": [
    "4–5 days",
    5,
    "Labcorp CDOS compendium",
    "",
    "https://cdos.halfpenny.com/labcorp/TestDisplay/117105"
  ]
};
  const existing = window.LabDirectoryTat || {};
  window.LabDirectoryTat = Object.freeze({
    ...existing,
    directory: Object.freeze({ ...turnaround, ...existing.directory })
  });
})();
