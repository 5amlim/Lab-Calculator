// Source-reviewed Labcorp orders with usable collection and submission routes.
(() => {
  'use strict';

  const additions = [
  {
    "id": "labcorp-compendium-review-000661",
    "testCode": "000661",
    "testName": "Electrolytes, T4, Cortisol, Urine Metanephrines and Renin Activity",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "1.5 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum from cells and refrigerate the original spun SST. Submit urine and renin plasma separately.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "renal",
      "endocrinology",
      "thyroid"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/000661",
    "additionalDrawRequirements": [
      {
        "purpose": "First-morning urine metanephrines",
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
        "specialInstructions": "Follow the Labcorp renin instructions for posture and handling. Separate into a dedicated screw-cap plastic tube and freeze promptly.",
        "specialLabeling": "Label EDTA PLASMA; RENIN",
        "submissionCount": 1,
        "container": "Lavender EDTA",
        "count": 2
      }
    ]
  },
  {
    "id": "labcorp-compendium-review-008631",
    "testCode": "008631",
    "testName": "Pinworm Preparation, Paddle",
    "status": "active",
    "specimenType": "Other",
    "drawContainer": "Pinworm Paddle",
    "transportContainer": "Pinworm Paddle",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "One pinworm paddle",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Use the Labcorp-approved pinworm paddle. Collect the perianal specimen before bathing or using the toilet and ship the original closed paddle at room temperature. No transfer.",
    "specialLabeling": "Label PERIANAL PINWORM PADDLE",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "parasitology",
      "microbiology"
    ],
    "searchAliases": [
      "enterobius",
      "pinworm test"
    ],
    "source": "https://www.labcorp.com/tests/008631/pinworm-preparation"
  },
  {
    "id": "labcorp-compendium-review-030056",
    "testCode": "030056",
    "testName": "BUN, Creatinine, CBC, Urinalysis and Blood Lead",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "2 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum for BUN and creatinine. Keep routine EDTA whole blood for CBC separate from the lead-free portion.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "renal",
      "hematology",
      "urinary",
      "heavy-metals"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/030056",
    "additionalDrawRequirements": [
      {
        "purpose": "CBC or A1c",
        "specimenType": "Whole Blood",
        "transportContainer": "Lavender EDTA",
        "transportTemperature": "Refrigerated",
        "transportTemperatureRaw": "Refrigerated",
        "preferredVolume": "4 mL whole blood",
        "minimumVolume": "",
        "spin": "No",
        "specialInstructions": "Send the original capped EDTA sample. Do not spin or transfer.",
        "specialLabeling": "Label EDTA WHOLE BLOOD",
        "submissionCount": 1,
        "container": "Lavender EDTA",
        "count": 1
      },
      {
        "purpose": "Lead",
        "specimenType": "Whole Blood",
        "transportContainer": "Royal Blue EDTA (purple stripe)",
        "transportTemperature": "Room Temperature",
        "transportTemperatureRaw": "Room Temperature",
        "preferredVolume": "1 mL lead-free EDTA whole blood",
        "minimumVolume": "",
        "spin": "No",
        "specialInstructions": "Send lead-free EDTA whole blood in its original collection tube. Use dedicated tubes for lead and ZPP if both are ordered. Do not spin.",
        "specialLabeling": "Label TRACE METAL-FREE EDTA WHOLE BLOOD",
        "submissionCount": 1,
        "container": "Royal Blue EDTA (purple stripe)",
        "count": 1
      },
      {
        "purpose": "Routine urinalysis",
        "specimenType": "Urine",
        "transportContainer": "Urinalysis Transport Tube (Red/Yellow)",
        "transportTemperature": "Room Temperature",
        "transportTemperatureRaw": "Room Temperature",
        "preferredVolume": "10 mL urine",
        "minimumVolume": "",
        "spin": "No",
        "specialInstructions": "Collect clean catch urine in a sterile cup and fill the red/yellow urinalysis transport tube to its marked range.",
        "specialLabeling": "Label URINE; UA",
        "submissionCount": 1,
        "container": "Sterile cup",
        "count": 1
      }
    ]
  },
  {
    "id": "labcorp-compendium-review-165100",
    "testCode": "165100",
    "testName": "Protein C Antigen and Protein S Antigen, Total and Free",
    "status": "active",
    "specimenType": "Platelet-Poor Plasma",
    "drawContainer": "Light Blue Sodium Citrate",
    "transportContainer": "Frozen Transport Tube (Purple Cap)",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "preferredVolume": "8 mL total; 2 mL in each of four vials",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Fill citrate tubes to the indicated mark and separate platelet-poor plasma by double centrifugation. Submit four dedicated plastic vials, 2 mL each, labeled for the individual protein C and protein S studies. Freeze promptly.",
    "specialLabeling": "Label PLATELET-POOR CITRATE PLASMA",
    "collectionCount": 8,
    "submissionCount": 4,
    "clinicalCategories": [
      "coagulation"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/165100"
  },
  {
    "id": "labcorp-compendium-review-180047",
    "testCode": "180047",
    "testName": "Chlamydia, Gonorrhea, Trichomonas and Genital Mycoplasmas, Urine NAA",
    "status": "active",
    "specimenType": "Urine",
    "drawContainer": "Sterile cup",
    "transportContainer": "Aptima Urine Transport Tube (Yellow Label)",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "5 mL collected urine",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Collect first-catch urine after at least one hour without urinating. Transfer to the yellow-label Aptima urine transport tube, filling between the marked lines. Ship at room temperature.",
    "specialLabeling": "Label FIRST-CATCH URINE",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "sti",
      "infectious"
    ],
    "searchAliases": [
      "CT GC TV mycoplasma urine",
      "ureaplasma first catch"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/180047"
  },
  {
    "id": "labcorp-compendium-review-180910",
    "testCode": "180910",
    "testName": "Wet Prep, Vaginal, With Cell and Organism Findings",
    "status": "active",
    "specimenType": "Swab",
    "drawContainer": "InPouch TV Specimen Transport Device",
    "transportContainer": "InPouch TV Specimen Transport Device",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "One vaginal swab",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Use the vaginal swab route with the Labcorp InPouch TV device. Inoculate and close the device per its instructions. Arrange delivery at room temperature within 48 hours. No transfer.",
    "specialLabeling": "Label VAGINAL SWAB",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "sti",
      "microbiology"
    ],
    "searchAliases": [
      "InPouch wet prep"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/180910"
  },
  {
    "id": "labcorp-compendium-review-243768",
    "testCode": "243768",
    "testName": "BUN, Creatinine, CBC, Urinalysis, Lead and Zinc Protoporphyrin",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum for BUN and creatinine. Keep routine EDTA whole blood for CBC separate from the lead-free portion.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "renal",
      "hematology",
      "urinary",
      "heavy-metals"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/243768",
    "additionalDrawRequirements": [
      {
        "purpose": "CBC or A1c",
        "specimenType": "Whole Blood",
        "transportContainer": "Lavender EDTA",
        "transportTemperature": "Refrigerated",
        "transportTemperatureRaw": "Refrigerated",
        "preferredVolume": "4 mL whole blood",
        "minimumVolume": "",
        "spin": "No",
        "specialInstructions": "Send the original capped EDTA sample. Do not spin or transfer.",
        "specialLabeling": "Label EDTA WHOLE BLOOD",
        "submissionCount": 1,
        "container": "Lavender EDTA",
        "count": 1
      },
      {
        "purpose": "Occupational lead and zinc protoporphyrin",
        "specimenType": "Whole Blood",
        "transportContainer": "Royal Blue EDTA (purple stripe)",
        "transportTemperature": "Room Temperature",
        "transportTemperatureRaw": "Room Temperature",
        "preferredVolume": "7 mL total in lead-free EDTA for lead and ZPP",
        "minimumVolume": "",
        "spin": "No",
        "specialInstructions": "Send lead-free EDTA whole blood in its original collection tube. Use dedicated tubes for lead and ZPP if both are ordered. Do not spin.",
        "specialLabeling": "Label TRACE METAL-FREE EDTA WHOLE BLOOD",
        "submissionCount": 2,
        "container": "Royal Blue EDTA (purple stripe)",
        "count": 2
      },
      {
        "purpose": "Routine urinalysis",
        "specimenType": "Urine",
        "transportContainer": "Urinalysis Transport Tube (Red/Yellow)",
        "transportTemperature": "Room Temperature",
        "transportTemperatureRaw": "Room Temperature",
        "preferredVolume": "10 mL urine",
        "minimumVolume": "",
        "spin": "No",
        "specialInstructions": "Collect clean catch urine in a sterile cup and fill the red/yellow urinalysis transport tube to its marked range.",
        "specialLabeling": "Label URINE; UA",
        "submissionCount": 1,
        "container": "Sterile cup",
        "count": 1
      }
    ]
  },
  {
    "id": "labcorp-compendium-review-254757",
    "testCode": "254757",
    "testName": "Prenatal Panel With CBC, ABO/Rh, HIV, HCV Reflex and Urine Culture",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "1.5 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate and refrigerate routine prenatal serology in the original spun SST. Collect the dedicated HIV, HCV reflex, EDTA whole-blood and urine culture specimens separately.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "pregnancy",
      "infectious",
      "blood-bank",
      "hematology",
      "urinary"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/254757",
    "additionalDrawRequirements": [
      {
        "purpose": "HIV antigen/antibody reflex",
        "specimenType": "Serum",
        "transportContainer": "SST / Gold (spun, unopened)",
        "transportTemperature": "Refrigerated",
        "transportTemperatureRaw": "Refrigerated",
        "preferredVolume": "2 mL serum",
        "minimumVolume": "",
        "spin": "Yes",
        "specialInstructions": "Centrifuge and send this dedicated original gel-barrier tube unopened and refrigerated.",
        "specialLabeling": "HIV AG/AB; DEDICATED SST; DO NOT OPEN",
        "submissionCount": 1,
        "container": "SST / Gold",
        "count": 1
      },
      {
        "purpose": "HCV RNA reflex",
        "specimenType": "Serum",
        "transportContainer": "Frozen Transport Tube (Purple Cap)",
        "transportTemperature": "Frozen",
        "transportTemperatureRaw": "Frozen",
        "preferredVolume": "1.5 mL serum",
        "minimumVolume": "",
        "spin": "Yes",
        "specialInstructions": "Separate serum into a dedicated screw-cap transfer tube and freeze.",
        "specialLabeling": "Label SERUM; HCV RNA REFLEX",
        "submissionCount": 1,
        "container": "SST / Gold",
        "count": 1
      },
      {
        "purpose": "CBC and ABO/Rh with antibody screen",
        "specimenType": "Whole Blood",
        "transportContainer": "Lavender EDTA",
        "transportTemperature": "Refrigerated",
        "transportTemperatureRaw": "Refrigerated",
        "preferredVolume": "8 mL whole blood; 4 mL per tube",
        "minimumVolume": "",
        "spin": "No",
        "specialInstructions": "Send two separate original EDTA tubes refrigerated. Do not spin.",
        "specialLabeling": "Label EDTA WHOLE BLOOD",
        "submissionCount": 2,
        "container": "Lavender EDTA",
        "count": 2
      },
      {
        "purpose": "Prenatal urine culture",
        "specimenType": "Urine",
        "transportContainer": "Gray Top Urine Culture Tube",
        "transportTemperature": "Room Temperature",
        "transportTemperatureRaw": "Room Temperature",
        "preferredVolume": "Fill to the indicated line",
        "minimumVolume": "",
        "spin": "No",
        "specialInstructions": "Collect clean-catch urine in a sterile screw-cap cup. Transfer into the gray-top urine culture tube and fill to the indicated line.",
        "specialLabeling": "Label URINE; PRENATAL CULTURE",
        "submissionCount": 1,
        "container": "Sterile cup",
        "count": 1
      }
    ]
  },
  {
    "id": "labcorp-compendium-review-259090",
    "testCode": "259090",
    "testName": "Post-Bariatric Surgery Comprehensive Profile",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "6 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum from cells, protect serum used for vitamin A from light as applicable, and refrigerate the original spun SSTs. Use dedicated draws and separate packaging for the whole blood and plasma components.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "vitamins",
      "chemistry",
      "endocrinology"
    ],
    "searchAliases": [
      "bariatric vitamin labs",
      "bariatric micronutrient panel"
    ],
    "source": "https://www.labcorp.com/tests/259090/post-bariatric-surgery-comprehensive-profile",
    "usePreferredSerumYield": true,
    "additionalDrawRequirements": [
      {
        "purpose": "Whole-blood thiamine",
        "specimenType": "Whole Blood",
        "transportContainer": "Amber Plastic Transport Tube (23598)",
        "transportTemperature": "Frozen",
        "transportTemperatureRaw": "Frozen",
        "preferredVolume": "4 mL whole blood",
        "minimumVolume": "",
        "spin": "No",
        "specialInstructions": "Transfer unseparated EDTA whole blood to a freezer-safe, light-protective amber transport tube. Freeze immediately. Do not centrifuge.",
        "specialLabeling": "Label EDTA WHOLE BLOOD; THIAMINE; PROTECT FROM LIGHT",
        "submissionCount": 2,
        "container": "Lavender EDTA",
        "count": 2
      },
      {
        "purpose": "Copper and zinc",
        "specimenType": "Plasma",
        "transportContainer": "Trace Metal-Free Plasma Transport Tube",
        "transportTemperature": "Room Temperature",
        "transportTemperatureRaw": "Room Temperature",
        "preferredVolume": "4 mL EDTA plasma total; 2 mL per transport tube",
        "minimumVolume": "",
        "spin": "Yes",
        "specialInstructions": "Centrifuge the trace-metal-free EDTA blood promptly and transfer separated plasma to certified metal-free screw-cap plastic transport. Ship at room temperature.",
        "specialLabeling": "Label TRACE METAL-FREE EDTA PLASMA",
        "submissionCount": 2,
        "container": "Royal Blue EDTA (purple stripe)",
        "count": 2
      },
      {
        "purpose": "CBC or A1c",
        "specimenType": "Whole Blood",
        "transportContainer": "Lavender EDTA",
        "transportTemperature": "Refrigerated",
        "transportTemperatureRaw": "Refrigerated",
        "preferredVolume": "4 mL whole blood",
        "minimumVolume": "",
        "spin": "No",
        "specialInstructions": "Send the original capped EDTA sample. Do not spin or transfer.",
        "specialLabeling": "Label EDTA WHOLE BLOOD",
        "submissionCount": 1,
        "container": "Lavender EDTA",
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
        "specialInstructions": "Use a separate lavender EDTA draw. Separate EDTA plasma into a screw-cap plastic transport tube and refrigerate.",
        "specialLabeling": "Label EDTA PLASMA; INTACT PTH",
        "submissionCount": 1,
        "container": "Lavender EDTA",
        "count": 1
      }
    ]
  },
  {
    "id": "labcorp-compendium-review-259104",
    "testCode": "259104",
    "testName": "Pre-Bariatric Surgery Micronutrient Profile",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "4 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum from cells, protect serum used for vitamin A from light as applicable, and refrigerate the original spun SSTs. Use dedicated draws and separate packaging for the whole blood and plasma components.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "vitamins",
      "chemistry",
      "endocrinology"
    ],
    "searchAliases": [
      "bariatric vitamin labs",
      "bariatric micronutrient panel"
    ],
    "source": "https://www.labcorp.com/tests/259104/pre-bariatric-surgery-micronutrient-profile",
    "usePreferredSerumYield": true,
    "additionalDrawRequirements": [
      {
        "purpose": "Whole-blood thiamine",
        "specimenType": "Whole Blood",
        "transportContainer": "Amber Plastic Transport Tube (23598)",
        "transportTemperature": "Frozen",
        "transportTemperatureRaw": "Frozen",
        "preferredVolume": "4 mL whole blood",
        "minimumVolume": "",
        "spin": "No",
        "specialInstructions": "Transfer unseparated EDTA whole blood to a freezer-safe, light-protective amber transport tube. Freeze immediately. Do not centrifuge.",
        "specialLabeling": "Label EDTA WHOLE BLOOD; THIAMINE; PROTECT FROM LIGHT",
        "submissionCount": 2,
        "container": "Lavender EDTA",
        "count": 2
      },
      {
        "purpose": "Copper and zinc",
        "specimenType": "Plasma",
        "transportContainer": "Trace Metal-Free Plasma Transport Tube",
        "transportTemperature": "Room Temperature",
        "transportTemperatureRaw": "Room Temperature",
        "preferredVolume": "4 mL EDTA plasma total; 2 mL per transport tube",
        "minimumVolume": "",
        "spin": "Yes",
        "specialInstructions": "Centrifuge the trace-metal-free EDTA blood promptly and transfer separated plasma to certified metal-free screw-cap plastic transport. Ship at room temperature.",
        "specialLabeling": "Label TRACE METAL-FREE EDTA PLASMA",
        "submissionCount": 2,
        "container": "Royal Blue EDTA (purple stripe)",
        "count": 2
      }
    ]
  },
  {
    "id": "labcorp-compendium-review-259129",
    "testCode": "259129",
    "testName": "Post-Bariatric Surgery Micronutrient Profile",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "5 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum from cells, protect serum used for vitamin A from light as applicable, and refrigerate the original spun SSTs. Use dedicated draws and separate packaging for the whole blood and plasma components.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "vitamins",
      "chemistry",
      "endocrinology"
    ],
    "searchAliases": [
      "bariatric vitamin labs",
      "bariatric micronutrient panel"
    ],
    "source": "https://www.labcorp.com/tests/259129/post-bariatric-surgery-micronutrient-profile",
    "usePreferredSerumYield": true,
    "additionalDrawRequirements": [
      {
        "purpose": "Whole-blood thiamine",
        "specimenType": "Whole Blood",
        "transportContainer": "Amber Plastic Transport Tube (23598)",
        "transportTemperature": "Frozen",
        "transportTemperatureRaw": "Frozen",
        "preferredVolume": "4 mL whole blood",
        "minimumVolume": "",
        "spin": "No",
        "specialInstructions": "Transfer unseparated EDTA whole blood to a freezer-safe, light-protective amber transport tube. Freeze immediately. Do not centrifuge.",
        "specialLabeling": "Label EDTA WHOLE BLOOD; THIAMINE; PROTECT FROM LIGHT",
        "submissionCount": 2,
        "container": "Lavender EDTA",
        "count": 2
      },
      {
        "purpose": "Copper and zinc",
        "specimenType": "Plasma",
        "transportContainer": "Trace Metal-Free Plasma Transport Tube",
        "transportTemperature": "Room Temperature",
        "transportTemperatureRaw": "Room Temperature",
        "preferredVolume": "4 mL EDTA plasma total; 2 mL per transport tube",
        "minimumVolume": "",
        "spin": "Yes",
        "specialInstructions": "Centrifuge the trace-metal-free EDTA blood promptly and transfer separated plasma to certified metal-free screw-cap plastic transport. Ship at room temperature.",
        "specialLabeling": "Label TRACE METAL-FREE EDTA PLASMA",
        "submissionCount": 2,
        "container": "Royal Blue EDTA (purple stripe)",
        "count": 2
      },
      {
        "purpose": "CBC or A1c",
        "specimenType": "Whole Blood",
        "transportContainer": "Lavender EDTA",
        "transportTemperature": "Refrigerated",
        "transportTemperatureRaw": "Refrigerated",
        "preferredVolume": "4 mL whole blood",
        "minimumVolume": "",
        "spin": "No",
        "specialInstructions": "Send the original capped EDTA sample. Do not spin or transfer.",
        "specialLabeling": "Label EDTA WHOLE BLOOD",
        "submissionCount": 1,
        "container": "Lavender EDTA",
        "count": 1
      }
    ]
  },
  {
    "id": "labcorp-compendium-review-259141",
    "testCode": "259141",
    "testName": "Pre-Bariatric Surgery Comprehensive Profile",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "5 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum from cells, protect serum used for vitamin A from light as applicable, and refrigerate the original spun SSTs. Use dedicated draws and separate packaging for the whole blood and plasma components.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "vitamins",
      "chemistry",
      "endocrinology"
    ],
    "searchAliases": [
      "bariatric vitamin labs",
      "bariatric micronutrient panel"
    ],
    "source": "https://www.labcorp.com/tests/259141/pre-bariatric-surgery-comprehensive-profile",
    "usePreferredSerumYield": true,
    "additionalDrawRequirements": [
      {
        "purpose": "Whole-blood thiamine",
        "specimenType": "Whole Blood",
        "transportContainer": "Amber Plastic Transport Tube (23598)",
        "transportTemperature": "Frozen",
        "transportTemperatureRaw": "Frozen",
        "preferredVolume": "4 mL whole blood",
        "minimumVolume": "",
        "spin": "No",
        "specialInstructions": "Transfer unseparated EDTA whole blood to a freezer-safe, light-protective amber transport tube. Freeze immediately. Do not centrifuge.",
        "specialLabeling": "Label EDTA WHOLE BLOOD; THIAMINE; PROTECT FROM LIGHT",
        "submissionCount": 2,
        "container": "Lavender EDTA",
        "count": 2
      },
      {
        "purpose": "Copper and zinc",
        "specimenType": "Plasma",
        "transportContainer": "Trace Metal-Free Plasma Transport Tube",
        "transportTemperature": "Room Temperature",
        "transportTemperatureRaw": "Room Temperature",
        "preferredVolume": "4 mL EDTA plasma total; 2 mL per transport tube",
        "minimumVolume": "",
        "spin": "Yes",
        "specialInstructions": "Centrifuge the trace-metal-free EDTA blood promptly and transfer separated plasma to certified metal-free screw-cap plastic transport. Ship at room temperature.",
        "specialLabeling": "Label TRACE METAL-FREE EDTA PLASMA",
        "submissionCount": 2,
        "container": "Royal Blue EDTA (purple stripe)",
        "count": 2
      },
      {
        "purpose": "CBC or A1c",
        "specimenType": "Whole Blood",
        "transportContainer": "Lavender EDTA",
        "transportTemperature": "Refrigerated",
        "transportTemperatureRaw": "Refrigerated",
        "preferredVolume": "4 mL whole blood",
        "minimumVolume": "",
        "spin": "No",
        "specialInstructions": "Send the original capped EDTA sample. Do not spin or transfer.",
        "specialLabeling": "Label EDTA WHOLE BLOOD",
        "submissionCount": 1,
        "container": "Lavender EDTA",
        "count": 1
      }
    ]
  },
  {
    "id": "labcorp-compendium-review-260183",
    "testCode": "260183",
    "testName": "Female Healthy Aging Profile",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "7 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum promptly and refrigerate the original spun SSTs. Follow the ordering clinician’s fasting instructions.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "lipids",
      "endocrinology",
      "diabetes"
    ],
    "searchAliases": [
      "healthy aging panel"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/260183",
    "usePreferredSerumYield": true,
    "additionalDrawRequirements": [
      {
        "purpose": "CBC or A1c",
        "specimenType": "Whole Blood",
        "transportContainer": "Lavender EDTA",
        "transportTemperature": "Refrigerated",
        "transportTemperatureRaw": "Refrigerated",
        "preferredVolume": "4 mL whole blood",
        "minimumVolume": "",
        "spin": "No",
        "specialInstructions": "Send the original capped EDTA sample. Do not spin or transfer.",
        "specialLabeling": "Label EDTA WHOLE BLOOD",
        "submissionCount": 1,
        "container": "Lavender EDTA",
        "count": 1
      },
      {
        "purpose": "Homocysteine",
        "specimenType": "Plasma",
        "transportContainer": "Transport Tube",
        "transportTemperature": "Refrigerated",
        "transportTemperatureRaw": "Refrigerated",
        "preferredVolume": "2 mL EDTA plasma",
        "minimumVolume": "",
        "spin": "Yes",
        "specialInstructions": "Centrifuge immediately. When delayed, keep chilled and separate within an hour. Refrigerate separated EDTA plasma.",
        "specialLabeling": "Label EDTA PLASMA; HOMOCYSTEINE",
        "submissionCount": 1,
        "container": "Lavender EDTA",
        "count": 1
      }
    ]
  },
  {
    "id": "labcorp-compendium-review-260185",
    "testCode": "260185",
    "testName": "Male Healthy Aging Profile",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "7 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum promptly and refrigerate the original spun SSTs. Follow the ordering clinician’s fasting instructions.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "lipids",
      "endocrinology",
      "diabetes"
    ],
    "searchAliases": [
      "healthy aging panel"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/260185",
    "usePreferredSerumYield": true,
    "additionalDrawRequirements": [
      {
        "purpose": "CBC or A1c",
        "specimenType": "Whole Blood",
        "transportContainer": "Lavender EDTA",
        "transportTemperature": "Refrigerated",
        "transportTemperatureRaw": "Refrigerated",
        "preferredVolume": "4 mL whole blood",
        "minimumVolume": "",
        "spin": "No",
        "specialInstructions": "Send the original capped EDTA sample. Do not spin or transfer.",
        "specialLabeling": "Label EDTA WHOLE BLOOD",
        "submissionCount": 1,
        "container": "Lavender EDTA",
        "count": 1
      },
      {
        "purpose": "Homocysteine",
        "specimenType": "Plasma",
        "transportContainer": "Transport Tube",
        "transportTemperature": "Refrigerated",
        "transportTemperatureRaw": "Refrigerated",
        "preferredVolume": "2 mL EDTA plasma",
        "minimumVolume": "",
        "spin": "Yes",
        "specialInstructions": "Centrifuge immediately. When delayed, keep chilled and separate within an hour. Refrigerate separated EDTA plasma.",
        "specialLabeling": "Label EDTA PLASMA; HOMOCYSTEINE",
        "submissionCount": 1,
        "container": "Lavender EDTA",
        "count": 1
      }
    ]
  },
  {
    "id": "labcorp-compendium-review-297788",
    "testCode": "297788",
    "testName": "Basic Metabolic Panel (7), CBC With Differential, PT and aPTT",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate and submit serum in the original spun SST. Use a dedicated EDTA tube for CBC and a completely filled light-blue citrate tube for PT/aPTT.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "renal",
      "hematology",
      "coagulation"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/297788",
    "additionalDrawRequirements": [
      {
        "purpose": "CBC or A1c",
        "specimenType": "Whole Blood",
        "transportContainer": "Lavender EDTA",
        "transportTemperature": "Refrigerated",
        "transportTemperatureRaw": "Refrigerated",
        "preferredVolume": "4 mL whole blood",
        "minimumVolume": "",
        "spin": "No",
        "specialInstructions": "Send the original capped EDTA sample. Do not spin or transfer.",
        "specialLabeling": "Label EDTA WHOLE BLOOD",
        "submissionCount": 1,
        "container": "Lavender EDTA",
        "count": 1
      },
      {
        "purpose": "PT and aPTT",
        "specimenType": "Whole Blood",
        "transportContainer": "Light Blue Sodium Citrate",
        "transportTemperature": "Room Temperature",
        "transportTemperatureRaw": "Room Temperature",
        "preferredVolume": "2 mL whole blood; fill to the mark",
        "minimumVolume": "",
        "spin": "No",
        "specialInstructions": "Keep the original filled citrate tube at room temperature. Confirm that delivery meets the applicable PT and aPTT stability limits before using whole-blood transport.",
        "specialLabeling": "Label CITRATED WHOLE BLOOD",
        "submissionCount": 1,
        "container": "Light Blue Sodium Citrate",
        "count": 1
      }
    ]
  },
  {
    "id": "labcorp-compendium-review-306172",
    "testCode": "306172",
    "testName": "Liver Workup With Iron Studies, ANA, Alpha-1-Antitrypsin, Ceruloplasmin and Copper",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "3.9 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate and refrigerate serum. Collect the copper sample in a dedicated trace-metal-free EDTA draw and ship it separately.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "hepatic",
      "iron-anemia",
      "autoimmune",
      "heavy-metals"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/306172",
    "usePreferredSerumYield": true,
    "additionalDrawRequirements": [
      {
        "purpose": "Copper",
        "specimenType": "Plasma",
        "transportContainer": "Trace Metal-Free Plasma Transport Tube",
        "transportTemperature": "Room Temperature",
        "transportTemperatureRaw": "Room Temperature",
        "preferredVolume": "1 mL EDTA plasma",
        "minimumVolume": "",
        "spin": "Yes",
        "specialInstructions": "Centrifuge the trace-metal-free EDTA blood promptly and transfer separated plasma to certified metal-free screw-cap plastic transport. Ship at room temperature.",
        "specialLabeling": "Label TRACE METAL-FREE EDTA PLASMA",
        "submissionCount": 1,
        "container": "Royal Blue EDTA (purple stripe)",
        "count": 1
      }
    ]
  },
  {
    "id": "labcorp-compendium-review-312114",
    "testCode": "312114",
    "testName": "Insulin, 2 Hour",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "0.8 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Collect at the clinician-defined two-hour time point and document the actual draw time. Separate serum and keep refrigerated. Volume is based on the Labcorp insulin assay.",
    "specialLabeling": "Label SERUM; 2 HOUR and collection time",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "endocrinology",
      "diabetes"
    ],
    "searchAliases": [
      "two-hour insulin",
      "timed insulin"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/312114"
  },
  {
    "id": "labcorp-compendium-review-321771",
    "testCode": "321771",
    "testName": "Creatinine and Quantitative Porphyrins, 24-Hour Urine",
    "status": "active",
    "specimenType": "24-Hour Urine",
    "drawContainer": "24-Hour Urine Container",
    "transportContainer": "Amber Plastic Transport Tube (23598)",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "30 mL from the 24-hour collection",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Collect unpreserved urine for 24 hours, shield it from light and keep it cold. Mix the collection, record total volume and collection times, and submit both aliquots. Divide 30 mL among correctly sized light-protected transport tubes.",
    "specialLabeling": "Label 24-HOUR URINE and record total volume and collection start and end times",
    "collectionCount": 1,
    "submissionCount": 3,
    "clinicalCategories": [
      "urinary",
      "chemistry"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/321771",
    "additionalDrawRequirements": [
      {
        "purpose": "Urine creatinine",
        "specimenType": "24-Hour Urine",
        "transportContainer": "Sterile cup",
        "transportTemperature": "Refrigerated",
        "transportTemperatureRaw": "Refrigerated",
        "preferredVolume": "1 mL from the same 24-hour collection",
        "minimumVolume": "",
        "spin": "No",
        "specialInstructions": "Submit the separate unpreserved 1 mL urine aliquot from the same collection.",
        "specialLabeling": "Label 24-HOUR URINE; CREATININE",
        "submissionCount": 1,
        "container": "24-Hour Urine Container",
        "count": 1,
        "transportOnly": true
      }
    ]
  },
  {
    "id": "labcorp-compendium-review-330173",
    "testCode": "330173",
    "testName": "Antiphospholipid Antibody Panel, Cardiolipin, Beta-2 Glycoprotein I and Phosphatidylserine",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "6 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Centrifuge to separate serum from cells and refrigerate the original spun SSTs for the antibody panel.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "coagulation",
      "autoimmune"
    ],
    "searchAliases": [
      "APS antibody panel",
      "PS PT antibodies"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/330173",
    "usePreferredSerumYield": true
  },
  {
    "id": "labcorp-compendium-review-337834",
    "testCode": "337834",
    "testName": "Creatinine and Protein Electrophoresis, Random Urine",
    "status": "active",
    "specimenType": "Urine",
    "drawContainer": "Sterile cup",
    "transportContainer": "Sterile cup",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "1.6 mL urine",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Use an unpreserved random urine sample. Cap securely and ship at room temperature. No transfer.",
    "specialLabeling": "Label RANDOM URINE",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "renal",
      "urinary",
      "immunology"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/337834"
  },
  {
    "id": "labcorp-compendium-review-349669",
    "testCode": "349669",
    "testName": "Epinephrine, Plasma",
    "status": "active",
    "specimenType": "Plasma",
    "drawContainer": "Lavender EDTA",
    "transportContainer": "Frozen Transport Tube (Purple Cap)",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "preferredVolume": "3 mL EDTA plasma",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Use chilled EDTA tubes. Place on ice immediately, separate plasma into a plastic screw-cap transport tube and freeze. Follow the clinician’s collection and medication instructions.",
    "specialLabeling": "Label EDTA PLASMA",
    "collectionCount": 2,
    "submissionCount": 1,
    "clinicalCategories": [
      "endocrinology"
    ],
    "searchAliases": [
      "Adrenaline plasma"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/349669"
  },
  {
    "id": "labcorp-compendium-review-364169",
    "testCode": "364169",
    "testName": "Renal Panel, Lipids, PTH, CBC and Urine Protein/Creatinine",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum and ship the original spun SST refrigerated. Use separate EDTA draws for CBC and PTH.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "renal",
      "lipids",
      "urinary"
    ],
    "searchAliases": [
      "kidney panel PTH CBC"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/364169",
    "additionalDrawRequirements": [
      {
        "purpose": "CBC or A1c",
        "specimenType": "Whole Blood",
        "transportContainer": "Lavender EDTA",
        "transportTemperature": "Refrigerated",
        "transportTemperatureRaw": "Refrigerated",
        "preferredVolume": "4 mL whole blood",
        "minimumVolume": "",
        "spin": "No",
        "specialInstructions": "Send the original capped EDTA sample. Do not spin or transfer.",
        "specialLabeling": "Label EDTA WHOLE BLOOD",
        "submissionCount": 1,
        "container": "Lavender EDTA",
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
        "specialInstructions": "Use a separate lavender EDTA draw. Separate EDTA plasma into a screw-cap plastic transport tube and refrigerate.",
        "specialLabeling": "Label EDTA PLASMA; INTACT PTH",
        "submissionCount": 1,
        "container": "Lavender EDTA",
        "count": 1
      },
      {
        "purpose": "Random urine",
        "specimenType": "Urine",
        "transportContainer": "Sterile cup",
        "transportTemperature": "Refrigerated",
        "transportTemperatureRaw": "Refrigerated",
        "preferredVolume": "1 mL urine",
        "minimumVolume": "",
        "spin": "No",
        "specialInstructions": "Collect unpreserved random urine and refrigerate. Send the original closed sterile cup. No transfer.",
        "specialLabeling": "Label RANDOM URINE",
        "submissionCount": 1,
        "container": "Sterile cup",
        "count": 1
      }
    ]
  },
  {
    "id": "labcorp-compendium-review-364181",
    "testCode": "364181",
    "testName": "Renal Panel, Lipids, PTH, CBC and Urine Albumin/Creatinine",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum and ship the original spun SST refrigerated. Use separate EDTA draws for CBC and PTH.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "renal",
      "lipids",
      "urinary"
    ],
    "searchAliases": [
      "kidney panel PTH CBC"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/364181",
    "additionalDrawRequirements": [
      {
        "purpose": "CBC or A1c",
        "specimenType": "Whole Blood",
        "transportContainer": "Lavender EDTA",
        "transportTemperature": "Refrigerated",
        "transportTemperatureRaw": "Refrigerated",
        "preferredVolume": "4 mL whole blood",
        "minimumVolume": "",
        "spin": "No",
        "specialInstructions": "Send the original capped EDTA sample. Do not spin or transfer.",
        "specialLabeling": "Label EDTA WHOLE BLOOD",
        "submissionCount": 1,
        "container": "Lavender EDTA",
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
        "specialInstructions": "Use a separate lavender EDTA draw. Separate EDTA plasma into a screw-cap plastic transport tube and refrigerate.",
        "specialLabeling": "Label EDTA PLASMA; INTACT PTH",
        "submissionCount": 1,
        "container": "Lavender EDTA",
        "count": 1
      },
      {
        "purpose": "Random urine",
        "specimenType": "Urine",
        "transportContainer": "Sterile cup",
        "transportTemperature": "Refrigerated",
        "transportTemperatureRaw": "Refrigerated",
        "preferredVolume": "10 mL urine",
        "minimumVolume": "",
        "spin": "No",
        "specialInstructions": "Collect unpreserved random urine and refrigerate. Send the original closed sterile cup. No transfer.",
        "specialLabeling": "Label RANDOM URINE",
        "submissionCount": 1,
        "container": "Sterile cup",
        "count": 1
      }
    ]
  },
  {
    "id": "labcorp-compendium-review-370272",
    "testCode": "370272",
    "testName": "CMP, Lipids, TSH, A1c, CBC and Urinalysis With Reflex to Culture",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "2 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum promptly and ship the original spun SST refrigerated. Serum and EDTA quantities are planning estimates for the compatible components.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "chemistry",
      "lipids",
      "hematology",
      "thyroid",
      "urinary",
      "diabetes"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/370272",
    "additionalDrawRequirements": [
      {
        "purpose": "CBC or A1c",
        "specimenType": "Whole Blood",
        "transportContainer": "Lavender EDTA",
        "transportTemperature": "Refrigerated",
        "transportTemperatureRaw": "Refrigerated",
        "preferredVolume": "4 mL whole blood",
        "minimumVolume": "",
        "spin": "No",
        "specialInstructions": "Send the original capped EDTA sample. Do not spin or transfer.",
        "specialLabeling": "Label EDTA WHOLE BLOOD",
        "submissionCount": 1,
        "container": "Lavender EDTA",
        "count": 1
      },
      {
        "purpose": "Urinalysis and possible culture",
        "specimenType": "Urine",
        "transportContainer": "Sterile cup",
        "transportTemperature": "Refrigerated",
        "transportTemperatureRaw": "Refrigerated",
        "preferredVolume": "One clean-catch urine specimen",
        "minimumVolume": "",
        "spin": "No",
        "specialInstructions": "Collect unpreserved random urine and refrigerate. Send the original closed sterile cup. No transfer.",
        "specialLabeling": "Label RANDOM URINE",
        "submissionCount": 1,
        "container": "Sterile cup",
        "count": 1
      }
    ]
  },
  {
    "id": "labcorp-compendium-review-370504",
    "testCode": "370504",
    "testName": "Porphobilinogen and Quantitative Porphyrins, 24-Hour Urine",
    "status": "active",
    "specimenType": "24-Hour Urine",
    "drawContainer": "24-Hour Urine Container",
    "transportContainer": "Amber Plastic Frozen Transport Tube (78656)",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "preferredVolume": "1 mL from the 24-hour collection",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Protect the unpreserved 24-hour collection from light and keep it cold. Mix, record total volume and collection times, and split one collection into the two lab-labeled amber aliquots. Freeze the 1 mL porphobilinogen aliquot and refrigerate the 2 mL porphyrin aliquot. This route is for this panel without delta-ALA.",
    "specialLabeling": "Label 24-HOUR URINE and record total volume and collection start and end times",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "urinary",
      "chemistry"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/370504",
    "additionalDrawRequirements": [
      {
        "purpose": "Quantitative urine porphyrins",
        "specimenType": "24-Hour Urine",
        "transportContainer": "12-mL Amber Plastic Transport Tube",
        "transportTemperature": "Refrigerated",
        "transportTemperatureRaw": "Refrigerated",
        "preferredVolume": "2 mL from the same 24-hour collection",
        "minimumVolume": "",
        "spin": "No",
        "specialInstructions": "Keep the second amber aliquot refrigerated and protected from light.",
        "specialLabeling": "Label 24-HOUR URINE; PORPHYRINS",
        "submissionCount": 1,
        "container": "24-Hour Urine Container",
        "count": 1,
        "transportOnly": true
      }
    ]
  },
  {
    "id": "labcorp-compendium-review-370921",
    "testCode": "370921",
    "testName": "Creatinine and Iodine, 24-Hour Urine",
    "status": "active",
    "specimenType": "24-Hour Urine",
    "drawContainer": "24-Hour Urine Container",
    "transportContainer": "Sterile cup",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "6 mL from the 24-hour collection",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Collect an unpreserved 24-hour urine specimen in plastic. Mix well, record total collected volume and collection start/end times, and ship the aliquot at room temperature. The displayed volume is a planning estimate for the iodine and creatinine components.",
    "specialLabeling": "Label 24-HOUR URINE and record total volume and collection start and end times",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "urinary",
      "renal",
      "thyroid"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/370921"
  },
  {
    "id": "labcorp-compendium-review-377000",
    "testCode": "377000",
    "testName": "Urine Microscopic Examination With Reflex to Culture",
    "status": "active",
    "specimenType": "Urine",
    "drawContainer": "Sterile cup",
    "transportContainer": "Sterile cup",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "One clean-catch urine sample",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Collect clean-catch urine without additives in a sterile screw-cap cup. Refrigerate without delay and send the same cup for microscopy and possible culture. Arrange receipt within 48 hours. No transfer.",
    "specialLabeling": "Label URINE; MICROSCOPY WITH CULTURE REFLEX",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "urinary",
      "microbiology"
    ],
    "searchAliases": [
      "urine microscopy and reflex culture"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/377000"
  },
  {
    "id": "labcorp-compendium-review-399299",
    "testCode": "399299",
    "testName": "Extended Coagulation Panel, PT, Lupus Anticoagulant, Antithrombin, Protein C and Protein S",
    "status": "active",
    "specimenType": "Platelet-Poor Plasma",
    "drawContainer": "Light Blue Sodium Citrate",
    "transportContainer": "Frozen Transport Tube (Purple Cap)",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "preferredVolume": "4 mL platelet-poor plasma",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Fill citrate tubes to the mark. Prepare platelet-poor plasma by double centrifugation. Transfer to separate frozen screw-cap tubes and freeze. Follow the receiving lab’s aliquot requirements.",
    "specialLabeling": "Label PLATELET-POOR CITRATE PLASMA",
    "collectionCount": 4,
    "submissionCount": 3,
    "clinicalCategories": [
      "coagulation"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/399299"
  },
  {
    "id": "labcorp-compendium-review-502380",
    "testCode": "502380",
    "testName": "Thyroglobulin, Lymph Node Aspirate",
    "status": "active",
    "specimenType": "Aspirate",
    "drawContainer": "Labcorp Lymph Node Aspirate Kit Saline Vial",
    "transportContainer": "Labcorp Lymph Node Aspirate Kit Saline Vial",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "preferredVolume": "1 mL aspirate in saline",
    "minimumVolume": "1 mL",
    "spin": "No",
    "specialInstructions": "A qualified clinician collects lymph node aspirate into the saline vial supplied in Labcorp kit 38621G (75203). Freeze the sealed original kit vial and record the collection site. No transfer.",
    "specialLabeling": "Label LYMPH NODE ASPIRATE; SITE",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "thyroid",
      "body-fluids"
    ],
    "searchAliases": [
      "FNA thyroglobulin"
    ],
    "source": "https://www.labcorp.com/tests/502380/thyroglobulin-lymph-node-aspirate-endocrine-sciences"
  },
  {
    "id": "labcorp-compendium-review-502503",
    "testCode": "502503",
    "testName": "Timed Cortisol (6) and Growth Hormone (9) Stimulation Panel",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "Frozen Transport Tube (Purple Cap)",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "preferredVolume": "0.8 mL serum per time point",
    "minimumVolume": "0.3 mL per time point",
    "spin": "Yes",
    "specialInstructions": "Use the nine ordered time points. Separate each serum draw and freeze in its own labeled transport tube. Record the draw date and exact time on each tube. Send all specimens together on one requisition.",
    "specialLabeling": "Label SERUM; TIME POINT and collection date/time",
    "collectionCount": 9,
    "submissionCount": 9,
    "clinicalCategories": [
      "endocrinology"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/502503"
  },
  {
    "id": "labcorp-compendium-review-503155",
    "testCode": "503155",
    "testName": "C-Telopeptide (CTx) and 25-Hydroxy Vitamin D",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "Frozen Transport Tube (Purple Cap)",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "preferredVolume": "0.5 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Collect the SST and plain red top at the same fasting morning draw. Separate both within 45 minutes and freeze in separate screw-cap transfer tubes. Directory panel total is 1.10 mL serum.",
    "specialLabeling": "Label SERUM; C-TELOPEPTIDE",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "endocrinology",
      "vitamins"
    ],
    "searchAliases": [
      "CTX vitamin D25"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/503155",
    "additionalDrawRequirements": [
      {
        "purpose": "25-hydroxy vitamin D",
        "specimenType": "Serum",
        "transportContainer": "Frozen Transport Tube (Purple Cap)",
        "transportTemperature": "Frozen",
        "transportTemperatureRaw": "Frozen",
        "preferredVolume": "0.6 mL serum",
        "minimumVolume": "",
        "spin": "Yes",
        "specialInstructions": "Separate within 45 minutes and freeze in a dedicated screw-cap tube.",
        "specialLabeling": "Label SERUM; VITAMIN D",
        "submissionCount": 1,
        "container": "Red Top",
        "count": 1
      }
    ]
  },
  {
    "id": "labcorp-compendium-review-505272",
    "testCode": "505272",
    "testName": "HIV-1 RNA, CD4/CD8 and CBC With Differential",
    "status": "active",
    "specimenType": "Plasma",
    "drawContainer": "Lavender EDTA",
    "transportContainer": "Frozen Transport Tube (Purple Cap)",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "preferredVolume": "3.5 mL EDTA plasma",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Centrifuge separate EDTA tubes for HIV RNA, transfer plasma into screw-cap plastic transport and freeze. Send the unspun cell-count tubes separately at room temperature.",
    "specialLabeling": "Label EDTA PLASMA; HIV-1 RNA",
    "collectionCount": 2,
    "submissionCount": 2,
    "clinicalCategories": [
      "infectious",
      "immunology",
      "hematology"
    ],
    "searchAliases": [
      "HIV viral load CD4"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/505272",
    "additionalDrawRequirements": [
      {
        "purpose": "CBC or A1c",
        "specimenType": "Whole Blood",
        "transportContainer": "Lavender EDTA",
        "transportTemperature": "Room Temperature",
        "transportTemperatureRaw": "Room Temperature",
        "preferredVolume": "4 mL whole blood",
        "minimumVolume": "",
        "spin": "No",
        "specialInstructions": "Send the original capped EDTA sample. Do not spin or transfer.",
        "specialLabeling": "Label EDTA WHOLE BLOOD",
        "submissionCount": 1,
        "container": "Lavender EDTA",
        "count": 1
      },
      {
        "purpose": "CD4 and CD8 enumeration",
        "specimenType": "Whole Blood",
        "transportContainer": "Yellow ACD-A",
        "transportTemperature": "Room Temperature",
        "transportTemperatureRaw": "Room Temperature",
        "preferredVolume": "One full ACD-A tube",
        "minimumVolume": "",
        "spin": "No",
        "specialInstructions": "Mix promptly. Send original capped ACD-A whole blood at room temperature. Arrange receipt within 48 hours and record venipuncture date and time. The separate EDTA whole blood needs receipt within 24 hours.",
        "specialLabeling": "Label ACD-A WHOLE BLOOD; CD4/CD8",
        "submissionCount": 1,
        "container": "Yellow ACD-A",
        "count": 1
      }
    ]
  },
  {
    "id": "labcorp-compendium-review-701768",
    "testCode": "701768",
    "testName": "Pentobarbital, Immunoassay, Serum",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "Red Top",
    "transportContainer": "Transport Tube",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "0.3 mL",
    "spin": "Yes",
    "specialInstructions": "Use a plain red-top tube without gel. Separate serum from cells within two hours into a plastic transport tube. Ship at room temperature if delivery is within three days.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "tdm"
    ],
    "searchAliases": [
      "Nembutal level"
    ],
    "source": "https://medtox.labcorp.com/tests/701768/pentobarbital-immunoassay-serum-plasma"
  },
  {
    "id": "labcorp-compendium-review-770154",
    "testCode": "770154",
    "testName": "THC (Marijuana) Confirmation, Oral Fluid",
    "status": "active",
    "specimenType": "Oral Fluid",
    "drawContainer": "Labcorp Oral Fluid Collection Kit",
    "transportContainer": "Labcorp Oral Fluid Collection Kit",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "1 mL oral fluid",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Obtain the assay-specific oral fluid collection kit from Labcorp before collection. Send the original capped device at room temperature. Refrigerate if transport is delayed. No transfer.",
    "specialLabeling": "Label ORAL FLUID",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "toxicology"
    ],
    "searchAliases": [
      "saliva drug confirmation"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/770154"
  },
  {
    "id": "labcorp-compendium-review-770434",
    "testCode": "770434",
    "testName": "Oxycodone and Oxymorphone Confirmation, Oral Fluid",
    "status": "active",
    "specimenType": "Oral Fluid",
    "drawContainer": "Labcorp Oral Fluid Collection Kit",
    "transportContainer": "Labcorp Oral Fluid Collection Kit",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "1 mL oral fluid",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Obtain the assay-specific oral fluid collection kit from Labcorp before collection. Send the original capped device at room temperature. Refrigerate if transport is delayed. No transfer.",
    "specialLabeling": "Label ORAL FLUID",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "toxicology"
    ],
    "searchAliases": [
      "saliva drug confirmation"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/770434"
  },
  {
    "id": "labcorp-compendium-review-770510",
    "testCode": "770510",
    "testName": "Benzodiazepine Confirmation, Oral Fluid",
    "status": "active",
    "specimenType": "Oral Fluid",
    "drawContainer": "Labcorp Oral Fluid Collection Kit",
    "transportContainer": "Labcorp Oral Fluid Collection Kit",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "1 mL oral fluid",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Obtain the assay-specific oral fluid collection kit from Labcorp before collection. Send the original capped device at room temperature. Refrigerate if transport is delayed. No transfer.",
    "specialLabeling": "Label ORAL FLUID",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "toxicology"
    ],
    "searchAliases": [
      "saliva drug confirmation"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/770510"
  },
  {
    "id": "labcorp-compendium-review-815472",
    "testCode": "815472",
    "testName": "Cytomegalovirus (CMV) DNA, Qualitative PCR, Whole Blood",
    "status": "active",
    "specimenType": "Whole Blood",
    "drawContainer": "Lavender EDTA",
    "transportContainer": "Lavender EDTA",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "One filled EDTA tube",
    "minimumVolume": "0.5 mL whole blood",
    "spin": "No",
    "specialInstructions": "Use the EDTA whole-blood route. Send intact whole blood at room temperature and arrange receipt within 48 hours. Do not centrifuge or freeze. No transfer.",
    "specialLabeling": "Label EDTA WHOLE BLOOD",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "infectious"
    ],
    "searchAliases": [
      "CMV qualitative PCR"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/815472"
  },
  {
    "id": "labcorp-compendium-review-818326",
    "testCode": "818326",
    "testName": "Alpha-1-Antitrypsin Clearance, Timed Stool and Serum",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "Frozen Transport Tube (Purple Cap)",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "preferredVolume": "0.5 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Draw the blood during the timed stool collection. Separate serum within two hours and freeze in a dedicated plastic transport tube.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "gi",
      "chemistry"
    ],
    "searchAliases": [
      "A1AT clearance"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/818326",
    "additionalDrawRequirements": [
      {
        "purpose": "Timed stool",
        "specimenType": "Stool",
        "transportContainer": "Sterile cup",
        "transportTemperature": "Frozen",
        "transportTemperatureRaw": "Frozen",
        "preferredVolume": "5 g stool listed; send entire timed collection",
        "minimumVolume": "",
        "spin": "No",
        "specialInstructions": "Obtain the timed stool kit (ARUP 44192) from the regional referral department first. Collect and submit the entire frozen timed stool collection and record its duration.",
        "specialLabeling": "Label TIMED STOOL; record collection duration",
        "submissionCount": 1,
        "container": "Sterile cup",
        "count": 1
      }
    ]
  },
  {
    "id": "labcorp-compendium-review-818682",
    "testCode": "818682",
    "testName": "Maternal Testing for Neonatal Alloimmune Thrombocytopenia",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "10 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum promptly and refrigerate. Coordinate the high-volume maternal sampling and pickup in advance. Collect Monday through Thursday for receipt within four days.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "pregnancy",
      "blood-bank",
      "immunology"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/818682",
    "usePreferredSerumYield": true,
    "additionalDrawRequirements": [
      {
        "purpose": "Maternal platelet antigen typing",
        "specimenType": "Whole Blood",
        "transportContainer": "Yellow ACD-A",
        "transportTemperature": "Refrigerated",
        "transportTemperatureRaw": "Refrigerated",
        "preferredVolume": "30 mL whole blood total; fill tubes as marked",
        "minimumVolume": "",
        "spin": "No",
        "specialInstructions": "Submit original intact ACD tubes refrigerated. No centrifugation or transfer.",
        "specialLabeling": "Label MATERNAL ACD WHOLE BLOOD",
        "submissionCount": 4,
        "container": "Yellow ACD-A",
        "count": 4
      }
    ]
  },
  {
    "id": "labcorp-compendium-review-824808",
    "testCode": "824808",
    "testName": "Heparin-PF4 IgG Antibody",
    "status": "active",
    "specimenType": "Whole Blood",
    "drawContainer": "Light Blue Sodium Citrate",
    "transportContainer": "Light Blue Sodium Citrate",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "5 mL whole blood total; fill both tubes to their marks",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Send original filled sodium-citrate tubes at room temperature only when the Bloodworks Northwest laboratory can receive them within 24 hours. For weekend collection, confirm the receiving laboratory’s frozen citrate-plasma route before drawing. No transfer.",
    "specialLabeling": "Label CITRATED WHOLE BLOOD",
    "collectionCount": 2,
    "submissionCount": 2,
    "clinicalCategories": [
      "coagulation",
      "immunology"
    ],
    "searchAliases": [
      "HIT antibody"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/824808"
  },
  {
    "id": "labcorp-compendium-review-825561",
    "testCode": "825561",
    "testName": "Maternal Cell Contamination (MCC) Studies",
    "status": "active",
    "specimenType": "Whole Blood",
    "drawContainer": "Lavender EDTA",
    "transportContainer": "Lavender EDTA",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "10 mL whole blood total",
    "minimumVolume": "5 mL",
    "spin": "No",
    "specialInstructions": "Submit two original lavender EDTA tubes at room temperature. For maternal cell contamination testing, identify the maternal specimen on a separate requisition from the fetal specimen. No transfer.",
    "specialLabeling": "Label MATERNAL EDTA WHOLE BLOOD",
    "collectionCount": 2,
    "submissionCount": 2,
    "clinicalCategories": [
      "genetics",
      "pregnancy"
    ],
    "searchAliases": [
      "MCC prenatal"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/825561"
  },
  {
    "id": "labcorp-compendium-review-830944",
    "testCode": "830944",
    "testName": "Beryllium Lymphocyte Proliferation, Whole Blood",
    "status": "active",
    "specimenType": "Whole Blood",
    "drawContainer": "Green Sodium Heparin",
    "transportContainer": "Green Sodium Heparin",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "40 mL whole blood total",
    "minimumVolume": "30 mL",
    "spin": "No",
    "specialInstructions": "Confirm same-day referral and Labcorp receipt timing before collection. Submit original filled sodium-heparin tubes at room temperature and schedule collection for arrival within 24 hours. Do not centrifuge, refrigerate or freeze. No transfer.",
    "specialLabeling": "Label SODIUM HEPARIN WHOLE BLOOD",
    "collectionCount": 10,
    "submissionCount": 10,
    "clinicalCategories": [
      "heavy-metals",
      "immunology"
    ],
    "searchAliases": [
      "BeLPT"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/830944"
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
  "701768": [
    "1 day",
    1,
    "Labcorp directory",
    "",
    "https://medtox.labcorp.com/tests/701768/pentobarbital-immunoassay-serum-plasma"
  ],
  "259104": [
    "2–4 days",
    4,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/259104/pre-bariatric-surgery-micronutrient-profile"
  ],
  "259129": [
    "3–5 days",
    5,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/259129/post-bariatric-surgery-micronutrient-profile"
  ],
  "259090": [
    "5–7 days",
    7,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/259090/post-bariatric-surgery-comprehensive-profile"
  ],
  "259141": [
    "5–7 days",
    7,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/259141/pre-bariatric-surgery-comprehensive-profile"
  ],
  "260183": [
    "6–8 days",
    8,
    "Labcorp CDOS compendium",
    "",
    "https://cdos.halfpenny.com/labcorp/TestDisplay/260183"
  ],
  "260185": [
    "6–8 days",
    8,
    "Labcorp CDOS compendium",
    "",
    "https://cdos.halfpenny.com/labcorp/TestDisplay/260185"
  ],
  "502380": [
    "3–15 days",
    15,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/502380/thyroglobulin-lymph-node-aspirate-endocrine-sciences"
  ],
  "818326": [
    "12–15 days",
    15,
    "Labcorp CDOS compendium",
    "",
    "https://cdos.halfpenny.com/labcorp/TestDisplay/818326"
  ],
  "008631": [
    "1–4 days",
    4,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/008631/pinworm-preparation"
  ],
  "254757": [
    "2–5 days",
    5,
    "Labcorp CDOS compendium",
    "",
    "https://cdos.halfpenny.com/labcorp/TestDisplay/254757"
  ],
  "825561": [
    "4–7 days",
    7,
    "Labcorp CDOS compendium",
    "",
    "https://cdos.halfpenny.com/labcorp/TestDisplay/825561"
  ],
  "824808": [
    "4–6 days",
    6,
    "Labcorp CDOS compendium",
    "",
    "https://cdos.halfpenny.com/labcorp/TestDisplay/824808"
  ]
};
  const existing = window.LabDirectoryTat || {};
  window.LabDirectoryTat = Object.freeze({
    ...existing,
    directory: Object.freeze({ ...turnaround, ...existing.directory })
  });
})();
