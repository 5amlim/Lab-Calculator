// Source-reviewed Labcorp orders with usable collection and submission routes.
(() => {
  'use strict';

  const additions = [
  {
    "id": "labcorp-compendium-review-007804",
    "testCode": "007804",
    "testName": "Mercury, Random Urine",
    "status": "active",
    "specimenType": "Urine",
    "drawContainer": "Trace Metal-Free Plastic Container",
    "transportContainer": "Trace Metal-Free Plastic Container",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "5 mL urine",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Use the unpreserved random urine route. Collect in a trace-metal-free plastic screw-cap container and send the original container at room temperature. Follow the directory’s contrast or dietary preparation for the ordered metal. No transfer.",
    "specialLabeling": "Label RANDOM URINE",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "heavy-metals",
      "urinary"
    ],
    "searchAliases": [
      "Urine Mercury"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/007804"
  },
  {
    "id": "labcorp-compendium-review-009035",
    "testCode": "009035",
    "testName": "Bronchial Washings Cytology",
    "status": "active",
    "specimenType": "Bronchial Washings",
    "drawContainer": "50 mL Sterile Screw-Cap Conical Tube",
    "transportContainer": "50 mL Sterile Screw-Cap Conical Tube",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "At least 1–2 mL bronchial washings",
    "minimumVolume": "1 mL",
    "spin": "No",
    "specialInstructions": "Accept provider-collected bronchial washings already mixed with the required equal volume of fixative in the approved 50 mL screw-cap tube. Refrigerate and send to cytology. No transfer.",
    "specialLabeling": "Label BRONCHIAL WASHINGS and exact anatomical source",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "oncology"
    ],
    "searchAliases": [],
    "source": "https://www.labcorp.com/tests/009035/bronchial-washings-cytology"
  },
  {
    "id": "labcorp-compendium-review-009076",
    "testCode": "009076",
    "testName": "Sputum Cytology Series",
    "status": "active",
    "specimenType": "Sputum",
    "drawContainer": "Saccomanno Sputum Collection Container",
    "transportContainer": "Saccomanno Sputum Collection Container",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "30 mL sputum",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Use the provider-supplied Saccomanno container. Submit the first-morning sputum collected directly into the fixative, keeping each day’s specimen separate and labeled. Keep at room temperature. No transfer.",
    "specialLabeling": "Label SPUTUM and exact anatomical source",
    "collectionCount": 3,
    "submissionCount": 3,
    "clinicalCategories": [
      "oncology"
    ],
    "searchAliases": [],
    "source": "https://www.labcorp.com/tests/009076/sputum-cytology-series"
  },
  {
    "id": "labcorp-compendium-review-009876",
    "testCode": "009876",
    "testName": "Ductal Lavage Cytology",
    "status": "active",
    "specimenType": "Breast Duct Lavage Fluid",
    "drawContainer": "CytoLyt 30 mL Specimen Container",
    "transportContainer": "CytoLyt 30 mL Specimen Container",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "Entire CytoLyt tube",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Accept the collecting provider’s original CytoLyt specimen container. Keep at room temperature and submit it intact. Requisition must identify the specimen site. No transfer.",
    "specialLabeling": "Label BREAST DUCT LAVAGE FLUID and exact site",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "oncology",
      "body-fluids"
    ],
    "searchAliases": [],
    "source": "https://www.labcorp.com/tests/009876/ductal-lavage-cytology"
  },
  {
    "id": "labcorp-compendium-review-018713",
    "testCode": "018713",
    "testName": "Primidone, Serum",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "Red Top",
    "transportContainer": "Transport Tube",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Use a plain red-top tube without gel. Separate serum and transfer to a plastic screw-cap tube. Keep at room temperature. Record dose and collection timing as applicable.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "tdm"
    ],
    "searchAliases": [
      "Mysoline level"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/018713"
  },
  {
    "id": "labcorp-compendium-review-019318",
    "testCode": "019318",
    "testName": "Lead, Random Urine",
    "status": "active",
    "specimenType": "Urine",
    "drawContainer": "Trace Metal-Free Plastic Container",
    "transportContainer": "Trace Metal-Free Plastic Container",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "5 mL urine",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Use the unpreserved random urine route. Collect in a trace-metal-free plastic screw-cap container and send the original container at room temperature. Follow the directory’s contrast or dietary preparation for the ordered metal. No transfer.",
    "specialLabeling": "Label RANDOM URINE",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "heavy-metals",
      "urinary"
    ],
    "searchAliases": [
      "Urine Lead"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/019318"
  },
  {
    "id": "labcorp-compendium-review-038448",
    "testCode": "038448",
    "testName": "Red Cell Antibody Screen and Direct Antiglobulin Test (DAT)",
    "status": "active",
    "specimenType": "Whole Blood",
    "drawContainer": "Lavender EDTA",
    "transportContainer": "Lavender EDTA",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "8 mL total; 4 mL per tube",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Use separate original EDTA tubes for antibody screen and DAT. Mix gently after filling and keep refrigerated. Do not spin or freeze. No transfer.",
    "specialLabeling": "Label EDTA WHOLE BLOOD",
    "collectionCount": 2,
    "submissionCount": 2,
    "clinicalCategories": [
      "blood-bank"
    ],
    "searchAliases": [
      "Coombs and antibody screen"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/038448"
  },
  {
    "id": "labcorp-compendium-review-052005",
    "testCode": "052005",
    "testName": "POC/Skin Chrom 5 Cell Cnt",
    "status": "active",
    "specimenType": "Products of Conception Tissue",
    "drawContainer": "Sterile Tissue Container With Ringer’s Lactate",
    "transportContainer": "Sterile Tissue Container With Ringer’s Lactate",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "Products of conception tissue",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Accept provider-collected viable tissue in sterile Ringer’s lactate. Refrigerate and send promptly. Do not freeze or fix. No transfer.",
    "specialLabeling": "Label PRODUCTS OF CONCEPTION TISSUE and exact anatomical source",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "pregnancy",
      "genetics"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/052005"
  },
  {
    "id": "labcorp-compendium-review-052052",
    "testCode": "052052",
    "testName": "Chromosome Analysis, Tissue Biopsies (Products of Conception, Skin)",
    "status": "active",
    "specimenType": "Skin Biopsy Tissue",
    "drawContainer": "Sterile Tissue Container With Ringer’s Lactate",
    "transportContainer": "Sterile Tissue Container With Ringer’s Lactate",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "2–4 mm³ of skin biopsy tissue",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Accept clinician-collected skin biopsy in sterile Ringer’s lactate. Refrigerate and ship promptly. Do not freeze or fix. No transfer.",
    "specialLabeling": "Label SKIN BIOPSY TISSUE and exact anatomical source",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "oncology",
      "genetics"
    ],
    "searchAliases": [],
    "source": "https://www.labcorp.com/tests/052052/chromosome-analysis-tissue-biopsies-products-of-conception-skin"
  },
  {
    "id": "labcorp-compendium-review-052065",
    "testCode": "052065",
    "testName": "Chromosome Analysis, Products of Conception (POC) With Reflex to SNP Microarray (Reveal®)",
    "status": "active",
    "specimenType": "Products of Conception Tissue",
    "drawContainer": "Sterile Tissue Container With Ringer’s Lactate",
    "transportContainer": "Sterile Tissue Container With Ringer’s Lactate",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "Products of conception specimen",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Accept clinician-collected tissue in sterile Ringer’s lactate. Refrigerate and ship promptly. Do not freeze or fix. No transfer.",
    "specialLabeling": "Label PRODUCTS OF CONCEPTION TISSUE and exact anatomical source",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "oncology",
      "genetics"
    ],
    "searchAliases": [],
    "source": "https://www.labcorp.com/tests/052065/chromosome-analysis-products-of-conception-poc-with-reflex-to-snp-microarray-reveal"
  },
  {
    "id": "labcorp-compendium-review-052985",
    "testCode": "052985",
    "testName": "Hepatitis B Core Total and Surface Antibodies",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "2 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum from cells promptly. Submit the original spun SST at room temperature. Volume shown is a planning estimate for the listed components.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "infectious"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/052985",
    "usePreferredSerumYield": false
  },
  {
    "id": "labcorp-compendium-review-070111",
    "testCode": "070111",
    "testName": "Zinc, Random Urine",
    "status": "active",
    "specimenType": "Urine",
    "drawContainer": "Trace Metal-Free Plastic Container",
    "transportContainer": "Trace Metal-Free Plastic Container",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "5 mL urine",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Use the unpreserved random urine route. Collect in a trace-metal-free plastic screw-cap container and send the original container at room temperature. Follow the directory’s contrast or dietary preparation for the ordered metal. No transfer.",
    "specialLabeling": "Label RANDOM URINE",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "heavy-metals",
      "urinary"
    ],
    "searchAliases": [
      "Urine Zinc"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/070111"
  },
  {
    "id": "labcorp-compendium-review-072717",
    "testCode": "072717",
    "testName": "Cadmium, Random Urine",
    "status": "active",
    "specimenType": "Urine",
    "drawContainer": "Trace Metal-Free Plastic Container",
    "transportContainer": "Trace Metal-Free Plastic Container",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "5 mL urine",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Use the unpreserved random urine route. Collect in a trace-metal-free plastic screw-cap container and send the original container at room temperature. Follow the directory’s contrast or dietary preparation for the ordered metal. No transfer.",
    "specialLabeling": "Label RANDOM URINE",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "heavy-metals",
      "urinary"
    ],
    "searchAliases": [
      "Urine Cadmium"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/072717"
  },
  {
    "id": "labcorp-compendium-review-098657",
    "testCode": "098657",
    "testName": "Lipid Panel With Total Cholesterol/HDL and LDL/HDL Ratios",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum from cells promptly. Submit the original spun SST at room temperature. Volume shown is a planning estimate for the listed components. Follow the ordering clinician’s fasting instructions if a fasting specimen is ordered.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "lipids"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/098657",
    "usePreferredSerumYield": false
  },
  {
    "id": "labcorp-compendium-review-133440",
    "testCode": "133440",
    "testName": "Copper, Random Urine",
    "status": "active",
    "specimenType": "Urine",
    "drawContainer": "Trace Metal-Free Plastic Container",
    "transportContainer": "Trace Metal-Free Plastic Container",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "5 mL urine",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Use the unpreserved random urine route. Collect in a trace-metal-free plastic screw-cap container and send the original container at room temperature. Follow the directory’s contrast or dietary preparation for the ordered metal. No transfer.",
    "specialLabeling": "Label RANDOM URINE",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "heavy-metals",
      "urinary"
    ],
    "searchAliases": [
      "Urine Copper"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/133440"
  },
  {
    "id": "labcorp-compendium-review-140519",
    "testCode": "140519",
    "testName": "BK Virus DNA, Quantitative PCR, Plasma",
    "status": "active",
    "specimenType": "Plasma",
    "drawContainer": "Lavender EDTA",
    "transportContainer": "Frozen Transport Tube (Purple Cap)",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "preferredVolume": "1 mL plasma",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Centrifuge EDTA whole blood and transfer separated plasma to a dedicated screw-cap polypropylene tube. Freeze and ship frozen.",
    "specialLabeling": "Label EDTA PLASMA",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "infectious"
    ],
    "searchAliases": [
      "BKV qPCR"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/140519"
  },
  {
    "id": "labcorp-compendium-review-144027",
    "testCode": "144027",
    "testName": "Sexually Transmitted Infections (STI) Profile, With CT/NG/TV NAA",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "3.5 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Collect adequate serum for the refrigerated serology, dedicated unopened HIV SST and frozen HCV reflex aliquot. Use the accepted first-catch urine route for CT/NG/TV.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 2,
    "submissionCount": 2,
    "clinicalCategories": [
      "sti",
      "infectious"
    ],
    "searchAliases": [
      "STI profile with CT NG TV"
    ],
    "source": "https://www.labcorp.com/tests/144027/sexually-transmitted-infections-sti-profile-with-ct-ng-tv-naa",
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
        "specialInstructions": "Use its own dedicated SST for HIV antigen/antibody screening and reflexes. Centrifuge and submit refrigerated and unopened.",
        "specialLabeling": "Label SERUM; HIV SCREEN",
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
        "preferredVolume": "2.5 mL serum",
        "minimumVolume": "",
        "spin": "Yes",
        "specialInstructions": "Centrifuge within 24 hours, transfer separated serum into a separate screw-cap polypropylene transport tube and freeze.",
        "specialLabeling": "Label SERUM; HCV RNA REFLEX",
        "submissionCount": 1,
        "container": "SST / Gold",
        "count": 1
      },
      {
        "purpose": "Chlamydia, gonorrhea and trichomonas NAAT",
        "specimenType": "First Catch Urine",
        "transportContainer": "Aptima Urine Transport Tube (yellow label)",
        "transportTemperature": "Room Temperature",
        "transportTemperatureRaw": "Room Temperature",
        "preferredVolume": "2 mL urine in the device",
        "minimumVolume": "",
        "spin": "No",
        "specialInstructions": "Collect first-catch urine. The patient should not urinate for one hour before collection. Add urine to the yellow-label Aptima urine device between the fill lines.",
        "specialLabeling": "Label FIRST-CATCH URINE; CT/NG/TV NAAT",
        "submissionCount": 1,
        "container": "Sterile cup",
        "count": 1
      }
    ]
  },
  {
    "id": "labcorp-compendium-review-146563",
    "testCode": "146563",
    "testName": "TSH, Free T4, Free T3 and Thyroid Antibodies",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "4 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum from cells promptly and submit original spun SSTs. When no panel volume is specified, the calculator shows a planning estimate based on the listed components.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "thyroid",
      "autoimmune"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/146563",
    "usePreferredSerumYield": true
  },
  {
    "id": "labcorp-compendium-review-170397",
    "testCode": "170397",
    "testName": "Arsenic, Random Urine",
    "status": "active",
    "specimenType": "Urine",
    "drawContainer": "Trace Metal-Free Plastic Container",
    "transportContainer": "Trace Metal-Free Plastic Container",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "5 mL urine",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Use the unpreserved random urine route. Collect in a trace-metal-free plastic screw-cap container and send the original container at room temperature. Follow the directory’s contrast or dietary preparation for the ordered metal. No transfer.",
    "specialLabeling": "Label RANDOM URINE",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "heavy-metals",
      "urinary"
    ],
    "searchAliases": [
      "Urine Arsenic"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/170397"
  },
  {
    "id": "labcorp-compendium-review-180901",
    "testCode": "180901",
    "testName": "Wet Prep",
    "status": "active",
    "specimenType": "Vaginal Swab",
    "drawContainer": "InPouch TV Specimen Transport Device",
    "transportContainer": "InPouch TV Specimen Transport Device",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "One vaginal specimen in the supplied device",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Use only the InPouch TV route. Collect the vaginal specimen and use the original closed device according to the Labcorp collection instructions. Keep at room temperature and arrange delivery within 48 hours. No transfer.",
    "specialLabeling": "Label VAGINAL SPECIMEN",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "microbiology"
    ],
    "searchAliases": [
      "InPouch wet prep"
    ],
    "source": "https://www.labcorp.com/tests/180901/wet-prep"
  },
  {
    "id": "labcorp-compendium-review-180919",
    "testCode": "180919",
    "testName": "Wet Prep With Reflex to Trichomonas Culture",
    "status": "active",
    "specimenType": "Vaginal Swab",
    "drawContainer": "InPouch TV Specimen Transport Device",
    "transportContainer": "InPouch TV Specimen Transport Device",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "One vaginal specimen in the supplied device",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Use only the InPouch TV route. Collect the vaginal specimen and use the original closed device according to the Labcorp collection instructions. Keep at room temperature and arrange delivery within 48 hours. No transfer.",
    "specialLabeling": "Label VAGINAL SPECIMEN",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "microbiology"
    ],
    "searchAliases": [
      "InPouch wet prep"
    ],
    "source": "https://www.labcorp.com/tests/180919/wet-prep-with-reflex-to-trichomonas-culture"
  },
  {
    "id": "labcorp-compendium-review-180950",
    "testCode": "180950",
    "testName": "Trichomonas Culture",
    "status": "active",
    "specimenType": "Vaginal Swab",
    "drawContainer": "InPouch TV Specimen Transport Device",
    "transportContainer": "InPouch TV Specimen Transport Device",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "One vaginal specimen in the supplied device",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Use only the InPouch TV route. Collect the vaginal specimen and use the original closed device according to the Labcorp collection instructions. Keep at room temperature and arrange delivery within 48 hours. No transfer.",
    "specialLabeling": "Label VAGINAL SPECIMEN",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "microbiology"
    ],
    "searchAliases": [
      "Trichomonas culture vaginal"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/180950"
  },
  {
    "id": "labcorp-compendium-review-204484",
    "testCode": "204484",
    "testName": "Albumin and Creatinine Ratio, Random Urine",
    "status": "active",
    "specimenType": "Urine",
    "drawContainer": "Sterile cup",
    "transportContainer": "Sterile cup",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "10 mL urine",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Collect random urine into a sterile cup without preservative. Refrigerate and send the original screw-cap cup. Volume shown is a planning estimate for the listed components. No transfer.",
    "specialLabeling": "Label RANDOM URINE",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "renal",
      "urinary"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/204484"
  },
  {
    "id": "labcorp-compendium-review-209502",
    "testCode": "209502",
    "testName": "Progesterone and Quantitative hCG",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "2 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum from cells promptly. Submit the original spun SST at room temperature. Volume shown is a planning estimate for the listed components. Follow Labcorp guidance for biotin supplements.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "pregnancy",
      "endocrinology"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/209502",
    "usePreferredSerumYield": false
  },
  {
    "id": "labcorp-compendium-review-209603",
    "testCode": "209603",
    "testName": "Basic Metabolic Panel (7) With Anion Gap",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum from cells promptly. Submit the original spun SST at room temperature. Volume shown is a planning estimate for the listed components.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "chemistry",
      "renal"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/209603",
    "usePreferredSerumYield": false
  },
  {
    "id": "labcorp-compendium-review-211187",
    "testCode": "211187",
    "testName": "Iron and Transferrin",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "2 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum from cells promptly. Submit the original spun SST at room temperature. Volume shown is a planning estimate for the listed components.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "iron-anemia"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/211187",
    "usePreferredSerumYield": false
  },
  {
    "id": "labcorp-compendium-review-211728",
    "testCode": "211728",
    "testName": "Hepatic Function Panel With GGT",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "2 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum from cells promptly. Submit the original spun SST at room temperature. Volume shown is a planning estimate for the listed components.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "hepatic"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/211728",
    "usePreferredSerumYield": false
  },
  {
    "id": "labcorp-compendium-review-214336",
    "testCode": "214336",
    "testName": "Calcium, Intact PTH and Ionized Calcium",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Centrifuge and submit the original spun SST for total calcium. Keep the other required components in their own containers.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "endocrinology",
      "renal"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/214336",
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
        "specialInstructions": "Centrifuge and send the original unopened SST at room temperature with vacuum intact.",
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
        "preferredVolume": "1.5 mL EDTA plasma",
        "minimumVolume": "0.7 mL",
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
    "id": "labcorp-compendium-review-214540",
    "testCode": "214540",
    "testName": "Free T4 and Free T3",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "2 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum from cells promptly. Submit the original spun SST at room temperature. Volume shown is a planning estimate for the listed components. Follow Labcorp guidance for biotin supplements.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "thyroid"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/214540",
    "usePreferredSerumYield": false
  },
  {
    "id": "labcorp-compendium-review-219117",
    "testCode": "219117",
    "testName": "TSH, TPO Antibody and Thyroglobulin Antibody",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "3 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum from cells promptly. Submit the original spun SST at room temperature. Volume shown is a planning estimate for the listed components. Follow Labcorp guidance for biotin supplements.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "thyroid",
      "autoimmune"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/219117",
    "usePreferredSerumYield": true
  },
  {
    "id": "labcorp-compendium-review-227243",
    "testCode": "227243",
    "testName": "Creatinine Clearance and 24-Hour Urine Protein",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Draw serum near the end of the urine collection when feasible. Separate serum from cells within 45 minutes and submit with the timed urine aliquot.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "renal",
      "urinary"
    ],
    "searchAliases": [
      "creatinine clearance and protein"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/227243",
    "additionalDrawRequirements": [
      {
        "purpose": "Timed urine",
        "specimenType": "24-Hour Urine",
        "transportContainer": "Sterile cup",
        "transportTemperature": "Room Temperature",
        "transportTemperatureRaw": "Room Temperature",
        "preferredVolume": "15 mL urine",
        "minimumVolume": "",
        "spin": "No",
        "specialInstructions": "Collect unpreserved 24-hour urine. Mix the entire collection, submit an aliquot and record the total volume, start time and end time. Submit with paired serum.",
        "specialLabeling": "Label 24-HOUR URINE and record total volume and collection start and end times",
        "submissionCount": 1,
        "container": "24-Hour Urine Container",
        "count": 1
      }
    ]
  },
  {
    "id": "labcorp-compendium-review-228411",
    "testCode": "228411",
    "testName": "Total and Free Testosterone, DHEA-S, Androstenedione and SHBG",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "4 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Centrifuge within the required time and refrigerate the original spun SSTs. Submit the androstenedione serum in its own transport tube.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 2,
    "submissionCount": 2,
    "clinicalCategories": [
      "endocrinology",
      "reproductive"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/228411",
    "additionalDrawRequirements": [
      {
        "purpose": "Androstenedione",
        "specimenType": "Serum",
        "transportContainer": "Transport Tube",
        "transportTemperature": "Refrigerated",
        "transportTemperatureRaw": "Refrigerated",
        "preferredVolume": "1 mL serum",
        "minimumVolume": "",
        "spin": "Yes",
        "specialInstructions": "Use plain red-top and separate serum into plastic transport. Refrigerate.",
        "specialLabeling": "Label SERUM; ANDROSTENEDIONE",
        "submissionCount": 1,
        "container": "Red Top",
        "count": 1
      }
    ]
  },
  {
    "id": "labcorp-compendium-review-229400",
    "testCode": "229400",
    "testName": "Lipid Panel With Direct LDL Cholesterol",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "2 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum from cells promptly. Submit the original spun SST at room temperature. Volume shown is a planning estimate for the listed components. Follow the ordering clinician’s fasting instructions if a fasting specimen is ordered.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "lipids"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/229400",
    "usePreferredSerumYield": false
  },
  {
    "id": "labcorp-compendium-review-229401",
    "testCode": "229401",
    "testName": "TSH, Total T3 and Free T4",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "3 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum from cells promptly. Submit the original spun SST at room temperature. Volume shown is a planning estimate for the listed components. Follow Labcorp guidance for biotin supplements.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "thyroid"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/229401",
    "usePreferredSerumYield": true
  },
  {
    "id": "labcorp-compendium-review-230292",
    "testCode": "230292",
    "testName": "Glucose and Total Protein, CSF",
    "status": "active",
    "specimenType": "CSF",
    "drawContainer": "Sterile cup",
    "transportContainer": "Sterile cup",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "2 mL CSF",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Accept provider-collected CSF in its original sterile screw-cap cup. Refrigerate and submit promptly. Volume shown is a planning estimate for both components. No transfer.",
    "specialLabeling": "Label CSF",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "body-fluids",
      "chemistry"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/230292"
  },
  {
    "id": "labcorp-compendium-review-231299",
    "testCode": "231299",
    "testName": "Antithrombin, Protein C/S Activity, Anticardiolipin and Factor V Leiden",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Centrifuge, then refrigerate the spun SST for antibodies. Submit the frozen citrate plasma and separate room-temperature EDTA whole-blood tube.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "coagulation",
      "autoimmune"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/231299",
    "additionalDrawRequirements": [
      {
        "purpose": "Factor V Leiden",
        "specimenType": "Whole Blood",
        "transportContainer": "Lavender EDTA",
        "transportTemperature": "Room Temperature",
        "transportTemperatureRaw": "Room Temperature",
        "preferredVolume": "4 mL whole blood",
        "minimumVolume": "",
        "spin": "No",
        "specialInstructions": "Mix and submit the original unopened EDTA tube at room temperature. Do not spin.",
        "specialLabeling": "Label EDTA WHOLE BLOOD",
        "submissionCount": 1,
        "container": "Lavender EDTA",
        "count": 1
      },
      {
        "purpose": "Functional coagulation components",
        "specimenType": "Platelet-Poor Plasma",
        "transportContainer": "Frozen Transport Tube (Purple Cap)",
        "transportTemperature": "Frozen",
        "transportTemperatureRaw": "Frozen",
        "preferredVolume": "2 mL platelet-poor plasma",
        "minimumVolume": "",
        "spin": "Yes",
        "specialInstructions": "Fill citrate tubes to their mark. Prepare platelet-poor plasma by double centrifugation and submit frozen in a separate screw-cap transport tube.",
        "specialLabeling": "Label PLATELET-POOR CITRATE PLASMA",
        "submissionCount": 1,
        "container": "Light Blue Sodium Citrate",
        "count": 2
      }
    ]
  },
  {
    "id": "labcorp-compendium-review-231307",
    "testCode": "231307",
    "testName": "Anticardiolipin and Beta-2 Glycoprotein Antibodies With dRVVT",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "1.5 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate and refrigerate the original spun SST for antibodies. Prepare the citrate plasma separately and ship frozen.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "coagulation",
      "autoimmune"
    ],
    "searchAliases": [
      "APS anticardiolipin lupus anticoagulant"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/231307",
    "additionalDrawRequirements": [
      {
        "purpose": "Coagulation testing",
        "specimenType": "Platelet-Poor Plasma",
        "transportContainer": "Frozen Transport Tube (Purple Cap)",
        "transportTemperature": "Frozen",
        "transportTemperatureRaw": "Frozen",
        "preferredVolume": "2 mL platelet-poor plasma",
        "minimumVolume": "",
        "spin": "Yes",
        "specialInstructions": "Fill citrate tubes to the calibrated mark. Prepare platelet-poor plasma by double centrifugation, transfer to dedicated frozen screw-cap tubes and freeze.",
        "specialLabeling": "Label PLATELET-POOR CITRATE PLASMA",
        "submissionCount": 1,
        "container": "Light Blue Sodium Citrate",
        "count": 2
      }
    ]
  },
  {
    "id": "labcorp-compendium-review-235011",
    "testCode": "235011",
    "testName": "Lipid Panel With LDL/HDL Ratio and Direct LDL",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "2 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum from cells promptly. Submit the original spun SST at room temperature. Volume shown is a planning estimate for the listed components. Follow the ordering clinician’s fasting instructions if a fasting specimen is ordered.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "lipids"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/235011",
    "usePreferredSerumYield": false
  },
  {
    "id": "labcorp-compendium-review-235012",
    "testCode": "235012",
    "testName": "Lipid Panel With Cholesterol/HDL Ratio and Direct LDL",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "2 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum from cells promptly. Submit the original spun SST at room temperature. Volume shown is a planning estimate for the listed components. Follow the ordering clinician’s fasting instructions if a fasting specimen is ordered.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "lipids"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/235012",
    "usePreferredSerumYield": false
  },
  {
    "id": "labcorp-compendium-review-236821",
    "testCode": "236821",
    "testName": "Serum and Urine Immunofixation and Quantitative Immunoglobulins",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "1.2 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum promptly. Submit the original spun SST and the separately labeled unpreserved urine specimen.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "immunology",
      "urinary"
    ],
    "searchAliases": [
      "serum urine IFE"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/236821",
    "additionalDrawRequirements": [
      {
        "purpose": "Urine immunofixation",
        "specimenType": "Urine",
        "transportContainer": "Sterile cup",
        "transportTemperature": "Room Temperature",
        "transportTemperatureRaw": "Room Temperature",
        "preferredVolume": "10 mL urine",
        "minimumVolume": "",
        "spin": "No",
        "specialInstructions": "Use an unpreserved random urine in the original sterile screw-cap cup. Keep at room temperature and label urine.",
        "specialLabeling": "Label URINE",
        "submissionCount": 1,
        "container": "Sterile cup",
        "count": 1
      }
    ]
  },
  {
    "id": "labcorp-compendium-review-236956",
    "testCode": "236956",
    "testName": "Parvovirus B19 IgG, IgM and DNA PCR",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "0.5 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Centrifuge serum and ship the original spun SST at room temperature. Submit unspun EDTA blood separately for PCR.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "infectious"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/236956",
    "additionalDrawRequirements": [
      {
        "purpose": "Parvovirus B19 DNA",
        "specimenType": "Whole Blood",
        "transportContainer": "Lavender EDTA",
        "transportTemperature": "Room Temperature",
        "transportTemperatureRaw": "Room Temperature",
        "preferredVolume": "1 mL whole blood",
        "minimumVolume": "",
        "spin": "No",
        "specialInstructions": "Mix gently and keep original EDTA whole blood at room temperature. No spin or transfer.",
        "specialLabeling": "Label EDTA WHOLE BLOOD",
        "submissionCount": 1,
        "container": "Lavender EDTA",
        "count": 1
      }
    ]
  },
  {
    "id": "labcorp-compendium-review-236962",
    "testCode": "236962",
    "testName": "Coagulation Panel With Platelet Count",
    "status": "active",
    "specimenType": "Platelet-Poor Plasma",
    "drawContainer": "Light Blue Sodium Citrate",
    "transportContainer": "Frozen Transport Tube (Purple Cap)",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "preferredVolume": "2.9 mL platelet-poor plasma",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Fill citrate tubes to the mark. Prepare platelet-poor plasma, transfer to plastic screw-cap transport and freeze.",
    "specialLabeling": "Label PLATELET-POOR CITRATE PLASMA",
    "collectionCount": 2,
    "submissionCount": 1,
    "clinicalCategories": [
      "coagulation",
      "hematology"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/236962",
    "additionalDrawRequirements": [
      {
        "purpose": "Platelet count",
        "specimenType": "Whole Blood",
        "transportContainer": "Lavender EDTA",
        "transportTemperature": "Refrigerated",
        "transportTemperatureRaw": "Refrigerated",
        "preferredVolume": "6.7 mL whole blood",
        "minimumVolume": "",
        "spin": "No",
        "specialInstructions": "Collect enough EDTA blood in original tubes. Invert gently and refrigerate. Do not spin.",
        "specialLabeling": "Label EDTA WHOLE BLOOD",
        "submissionCount": 2,
        "container": "Lavender EDTA",
        "count": 2
      }
    ]
  },
  {
    "id": "labcorp-compendium-review-238307",
    "testCode": "238307",
    "testName": "Babesia, Anaplasma, Ehrlichia and Lyme DNA PCR Panel",
    "status": "active",
    "specimenType": "Whole Blood",
    "drawContainer": "Lavender EDTA",
    "transportContainer": "Lavender EDTA",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "9 mL total EDTA whole blood",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Collect sufficient EDTA whole blood in separate tubes. Mix promptly and submit the original unopened tubes refrigerated. Do not spin or transfer. No transfer.",
    "specialLabeling": "Label EDTA WHOLE BLOOD",
    "collectionCount": 3,
    "submissionCount": 3,
    "clinicalCategories": [
      "infectious"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/238307"
  },
  {
    "id": "labcorp-compendium-review-240354",
    "testCode": "240354",
    "testName": "Hepatitis A, B and C Serology With HCV RNA Reflex",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "2.75 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum and refrigerate the original spun SSTs for hepatitis serology. Submit a separate frozen polypropylene tube for the HCV reflex component.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 2,
    "submissionCount": 2,
    "clinicalCategories": [
      "infectious",
      "hepatic"
    ],
    "searchAliases": [
      "acute hepatitis panel reflex HCV PCR"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/240354",
    "additionalDrawRequirements": [
      {
        "purpose": "HCV RNA reflex",
        "specimenType": "Serum",
        "transportContainer": "Frozen Transport Tube (Purple Cap)",
        "transportTemperature": "Frozen",
        "transportTemperatureRaw": "Frozen",
        "preferredVolume": "2.5 mL serum",
        "minimumVolume": "",
        "spin": "Yes",
        "specialInstructions": "Centrifuge within 24 hours, transfer separated serum into a separate screw-cap polypropylene transport tube and freeze.",
        "specialLabeling": "Label SERUM; HCV RNA REFLEX",
        "submissionCount": 1,
        "container": "SST / Gold",
        "count": 1
      }
    ]
  },
  {
    "id": "labcorp-compendium-review-241610",
    "testCode": "241610",
    "testName": "CMP, CBC With Differential, TSH, Iron/TIBC, A1c and PT/INR",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "3.1 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum and refrigerate the original spun SSTs. Submit EDTA whole blood refrigerated and the unopened citrate specimen at room temperature for PT/INR.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 2,
    "submissionCount": 2,
    "clinicalCategories": [
      "chemistry",
      "hematology",
      "coagulation"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/241610",
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
        "specialInstructions": "Collect two separate EDTA tubes and mix promptly. Submit the two original tubes refrigerated. Do not spin or transfer.",
        "specialLabeling": "Label EDTA WHOLE BLOOD",
        "submissionCount": 2,
        "container": "Lavender EDTA",
        "count": 2
      },
      {
        "purpose": "PT/INR",
        "specimenType": "Whole Blood",
        "transportContainer": "Light Blue Sodium Citrate",
        "transportTemperature": "Room Temperature",
        "transportTemperatureRaw": "Room Temperature",
        "preferredVolume": "One 2.7 mL citrate collection tube",
        "minimumVolume": "",
        "spin": "No",
        "specialInstructions": "Fill to the calibrated line and mix promptly. Submit the original unopened citrate tube at room temperature. Confirm testing can occur within the original tube’s validated stability.",
        "specialLabeling": "Label CITRATED WHOLE BLOOD",
        "submissionCount": 1,
        "container": "Light Blue Sodium Citrate",
        "count": 1
      }
    ]
  },
  {
    "id": "labcorp-compendium-review-241712",
    "testCode": "241712",
    "testName": "Antiphospholipid Antibodies and Lupus Anticoagulant Panel",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "2 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate and refrigerate the original spun SST for antibodies. Prepare the citrate plasma separately and ship frozen.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "coagulation",
      "autoimmune"
    ],
    "searchAliases": [
      "APS anticardiolipin lupus anticoagulant"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/241712",
    "additionalDrawRequirements": [
      {
        "purpose": "Coagulation testing",
        "specimenType": "Platelet-Poor Plasma",
        "transportContainer": "Frozen Transport Tube (Purple Cap)",
        "transportTemperature": "Frozen",
        "transportTemperatureRaw": "Frozen",
        "preferredVolume": "2.1 mL platelet-poor plasma",
        "minimumVolume": "",
        "spin": "Yes",
        "specialInstructions": "Fill citrate tubes to the calibrated mark. Prepare platelet-poor plasma by double centrifugation, transfer to dedicated frozen screw-cap tubes and freeze.",
        "specialLabeling": "Label PLATELET-POOR CITRATE PLASMA",
        "submissionCount": 1,
        "container": "Light Blue Sodium Citrate",
        "count": 2
      }
    ]
  },
  {
    "id": "labcorp-compendium-review-241902",
    "testCode": "241902",
    "testName": "Antiphospholipid Antibodies and Lupus Anticoagulant Panel With PT and Thrombin Time",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "1.5 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate and refrigerate the original spun SST for antibodies. Prepare the citrate plasma separately and ship frozen.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "coagulation",
      "autoimmune"
    ],
    "searchAliases": [
      "APS anticardiolipin lupus anticoagulant"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/241902",
    "additionalDrawRequirements": [
      {
        "purpose": "Coagulation testing",
        "specimenType": "Platelet-Poor Plasma",
        "transportContainer": "Frozen Transport Tube (Purple Cap)",
        "transportTemperature": "Frozen",
        "transportTemperatureRaw": "Frozen",
        "preferredVolume": "3 mL platelet-poor plasma",
        "minimumVolume": "",
        "spin": "Yes",
        "specialInstructions": "Fill citrate tubes to the calibrated mark. Prepare platelet-poor plasma by double centrifugation, transfer to dedicated frozen screw-cap tubes and freeze.",
        "specialLabeling": "Label PLATELET-POOR CITRATE PLASMA",
        "submissionCount": 2,
        "container": "Light Blue Sodium Citrate",
        "count": 2
      }
    ]
  },
  {
    "id": "labcorp-compendium-review-248699",
    "testCode": "248699",
    "testName": "Prenatal Panel With CBC, Blood Bank, Serology, CT/NG and Prenatal Urine Culture With GBS",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "2 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum from cells and submit the original spun SST refrigerated. Follow the listed separate serum, blood and urine routes for this order.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "pregnancy",
      "blood-bank",
      "hematology"
    ],
    "searchAliases": [
      "prenatal lab panel"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/248699",
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
        "specialInstructions": "Use its own dedicated SST for HIV antigen/antibody screening and reflexes. Centrifuge and submit refrigerated and unopened.",
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
        "specialInstructions": "Collect two separate EDTA tubes and mix promptly. Submit the two original tubes refrigerated. Do not spin or transfer.",
        "specialLabeling": "Label EDTA WHOLE BLOOD",
        "submissionCount": 2,
        "container": "Lavender EDTA",
        "count": 2
      },
      {
        "purpose": "Urine culture",
        "specimenType": "Urine",
        "transportContainer": "Gray-Top Urine Culture Preservative Tube",
        "transportTemperature": "Refrigerated",
        "transportTemperatureRaw": "Refrigerated",
        "preferredVolume": "Fill the gray-top urine culture tube to the line",
        "minimumVolume": "",
        "spin": "No",
        "specialInstructions": "Collect clean-catch midstream urine. Fill the gray-top urine culture preservative tube to the fill line. Send refrigerated.",
        "specialLabeling": "Label URINE; CULTURE",
        "submissionCount": 1,
        "container": "Sterile cup",
        "count": 1
      },
      {
        "purpose": "Chlamydia and gonorrhea NAAT",
        "specimenType": "First Catch Urine",
        "transportContainer": "Aptima Urine Transport Tube (yellow label)",
        "transportTemperature": "Room Temperature",
        "transportTemperatureRaw": "Room Temperature",
        "preferredVolume": "2 mL urine in the device",
        "minimumVolume": "",
        "spin": "No",
        "specialInstructions": "Collect first-catch urine separately from the clean-catch specimen used for culture. The patient should not urinate for one hour before collection. Transfer to the yellow-label Aptima urine device between marked lines.",
        "specialLabeling": "Label FIRST-CATCH URINE; CT/NG NAAT",
        "submissionCount": 1,
        "container": "Sterile cup",
        "count": 1
      }
    ]
  },
  {
    "id": "labcorp-compendium-review-251249",
    "testCode": "251249",
    "testName": "PT, PTT, Fibrinogen, Platelets and Thrombin Time",
    "status": "active",
    "specimenType": "Platelet-Poor Plasma",
    "drawContainer": "Light Blue Sodium Citrate",
    "transportContainer": "Frozen Transport Tube (Purple Cap)",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "preferredVolume": "2 mL platelet-poor plasma",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Fill citrate tubes to the mark. Prepare platelet-poor plasma, transfer to plastic screw-cap transport and freeze.",
    "specialLabeling": "Label PLATELET-POOR CITRATE PLASMA",
    "collectionCount": 2,
    "submissionCount": 1,
    "clinicalCategories": [
      "coagulation",
      "hematology"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/251249",
    "additionalDrawRequirements": [
      {
        "purpose": "Platelet count",
        "specimenType": "Whole Blood",
        "transportContainer": "Lavender EDTA",
        "transportTemperature": "Refrigerated",
        "transportTemperatureRaw": "Refrigerated",
        "preferredVolume": "7 mL whole blood",
        "minimumVolume": "",
        "spin": "No",
        "specialInstructions": "Collect enough EDTA blood in original tubes. Invert gently and refrigerate. Do not spin.",
        "specialLabeling": "Label EDTA WHOLE BLOOD",
        "submissionCount": 2,
        "container": "Lavender EDTA",
        "count": 2
      }
    ]
  },
  {
    "id": "labcorp-compendium-review-255031",
    "testCode": "255031",
    "testName": "PrEP Oral, Male Monitoring, HIV RNA and RPR",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "3.5 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum and refrigerate the spun SSTs. Submit the separately frozen HIV RNA aliquot and first-catch Aptima urine specimen.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 2,
    "submissionCount": 2,
    "clinicalCategories": [
      "sti",
      "infectious"
    ],
    "searchAliases": [
      "PrEP monitoring"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/255031",
    "additionalDrawRequirements": [
      {
        "purpose": "Frozen HIV RNA",
        "specimenType": "Serum",
        "transportContainer": "Frozen Transport Tube (Purple Cap)",
        "transportTemperature": "Frozen",
        "transportTemperatureRaw": "Frozen",
        "preferredVolume": "1.5 mL serum",
        "minimumVolume": "",
        "spin": "Yes",
        "specialInstructions": "Centrifuge within 24 hours and transfer to a separate polypropylene screw-cap tube. Freeze.",
        "specialLabeling": "Label SERUM; HIV RNA",
        "submissionCount": 1,
        "container": "SST / Gold",
        "count": 1
      },
      {
        "purpose": "Chlamydia and gonorrhea NAAT",
        "specimenType": "First Catch Urine",
        "transportContainer": "Aptima Urine Transport Tube (yellow label)",
        "transportTemperature": "Room Temperature",
        "transportTemperatureRaw": "Room Temperature",
        "preferredVolume": "2 mL urine in the device",
        "minimumVolume": "",
        "spin": "No",
        "specialInstructions": "Collect first-catch urine after no urination for one hour. Transfer urine into the yellow-label Aptima device between marked lines.",
        "specialLabeling": "Label FIRST-CATCH URINE; CT/NG NAAT",
        "submissionCount": 1,
        "container": "Sterile cup",
        "count": 1
      }
    ]
  },
  {
    "id": "labcorp-compendium-review-255033",
    "testCode": "255033",
    "testName": "PrEP Oral, Male Baseline, HIV RNA and RPR",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "7.5 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum and refrigerate the spun SSTs. Submit the separately frozen HIV RNA aliquot and first-catch Aptima urine specimen.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 3,
    "submissionCount": 3,
    "clinicalCategories": [
      "sti",
      "infectious"
    ],
    "searchAliases": [
      "PrEP baseline"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/255033",
    "additionalDrawRequirements": [
      {
        "purpose": "Frozen HIV RNA",
        "specimenType": "Serum",
        "transportContainer": "Frozen Transport Tube (Purple Cap)",
        "transportTemperature": "Frozen",
        "transportTemperatureRaw": "Frozen",
        "preferredVolume": "1.5 mL serum",
        "minimumVolume": "",
        "spin": "Yes",
        "specialInstructions": "Centrifuge within 24 hours and transfer to a separate polypropylene screw-cap tube. Freeze.",
        "specialLabeling": "Label SERUM; HIV RNA",
        "submissionCount": 1,
        "container": "SST / Gold",
        "count": 1
      },
      {
        "purpose": "Chlamydia and gonorrhea NAAT",
        "specimenType": "First Catch Urine",
        "transportContainer": "Aptima Urine Transport Tube (yellow label)",
        "transportTemperature": "Room Temperature",
        "transportTemperatureRaw": "Room Temperature",
        "preferredVolume": "2 mL urine in the device",
        "minimumVolume": "",
        "spin": "No",
        "specialInstructions": "Collect first-catch urine after no urination for one hour. Transfer urine into the yellow-label Aptima device between marked lines.",
        "specialLabeling": "Label FIRST-CATCH URINE; CT/NG NAAT",
        "submissionCount": 1,
        "container": "Sterile cup",
        "count": 1
      }
    ]
  },
  {
    "id": "labcorp-compendium-review-257451",
    "testCode": "257451",
    "testName": "ALT, AST and Total Bilirubin",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "1.5 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum from cells promptly. Submit the original spun SST at room temperature. Volume shown is a planning estimate for the listed components.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "hepatic"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/257451",
    "usePreferredSerumYield": false
  },
  {
    "id": "labcorp-compendium-review-293118",
    "testCode": "293118",
    "testName": "Lipid Panel and Glucose",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "2 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum from cells promptly. Submit the original spun SST at room temperature. Volume shown is a planning estimate for the listed components. Follow the ordering clinician’s fasting instructions if a fasting specimen is ordered.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "lipids",
      "diabetes"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/293118",
    "usePreferredSerumYield": false
  },
  {
    "id": "labcorp-compendium-review-301987",
    "testCode": "301987",
    "testName": "Hepatitis B Surface Antigen and Hepatitis C Antibody",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "4.5 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum from cells and refrigerate the original spun SSTs. The planning volume accounts for the listed serology and HBsAg confirmation.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "infectious"
    ],
    "searchAliases": [
      "HBV HCV serology"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/301987",
    "usePreferredSerumYield": true
  },
  {
    "id": "labcorp-compendium-review-302107",
    "testCode": "302107",
    "testName": "Cholinesterase and Dibucaine Number",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "Transport Tube",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum from cells and transfer to plastic serum transport. Keep at room temperature.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "chemistry"
    ],
    "searchAliases": [
      "pseudocholinesterase dibucaine"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/302107"
  },
  {
    "id": "labcorp-compendium-review-304131",
    "testCode": "304131",
    "testName": "TSH, Total T4 and Free T3",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "3 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum from cells promptly. Submit the original spun SST at room temperature. Volume shown is a planning estimate for the listed components. Follow Labcorp guidance for biotin supplements.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "thyroid"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/304131",
    "usePreferredSerumYield": true
  },
  {
    "id": "labcorp-compendium-review-304553",
    "testCode": "304553",
    "testName": "Comprehensive Metabolic Panel (12), Lipids, CBC With Differential and Iron/TIBC",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "2 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum from cells promptly. Submit original spun SST refrigerated for chemistry and lipids. Submit the CBC in a separate original EDTA tube.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "chemistry",
      "lipids",
      "hematology"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/304553",
    "additionalDrawRequirements": [
      {
        "purpose": "CBC with differential",
        "specimenType": "Whole Blood",
        "transportContainer": "Lavender EDTA",
        "transportTemperature": "Refrigerated",
        "transportTemperatureRaw": "Refrigerated",
        "preferredVolume": "4 mL whole blood",
        "minimumVolume": "",
        "spin": "No",
        "specialInstructions": "Collect EDTA blood, mix promptly and refrigerate the original tube. Do not centrifuge.",
        "specialLabeling": "Label EDTA WHOLE BLOOD",
        "submissionCount": 1,
        "container": "Lavender EDTA",
        "count": 1
      }
    ]
  },
  {
    "id": "labcorp-compendium-review-306226",
    "testCode": "306226",
    "testName": "TSH, T3 Uptake, Total T3 and Free T4",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "3 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum from cells promptly. Submit the original spun SST at room temperature. Volume shown is a planning estimate for the listed components. Follow Labcorp guidance for biotin supplements.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "thyroid"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/306226",
    "usePreferredSerumYield": true
  },
  {
    "id": "labcorp-compendium-review-308512",
    "testCode": "308512",
    "testName": "Comprehensive Metabolic Panel (14)",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum from cells promptly. Submit the original spun SST at room temperature. Volume shown is a planning estimate for the listed components.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "chemistry"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/308512",
    "usePreferredSerumYield": false
  },
  {
    "id": "labcorp-compendium-review-311782",
    "testCode": "311782",
    "testName": "Calcium and Intact PTH",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Centrifuge and submit the original spun SST for total calcium. Keep the other required components in their own containers.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "endocrinology",
      "renal"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/311782",
    "additionalDrawRequirements": [
      {
        "purpose": "Intact PTH",
        "specimenType": "Plasma",
        "transportContainer": "Transport Tube",
        "transportTemperature": "Refrigerated",
        "transportTemperatureRaw": "Refrigerated",
        "preferredVolume": "1.5 mL EDTA plasma",
        "minimumVolume": "0.7 mL",
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
    "id": "labcorp-compendium-review-314368",
    "testCode": "314368",
    "testName": "Free T4 and TSH",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "2 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum from cells promptly and submit original spun SSTs. When no panel volume is specified, the calculator shows a planning estimate based on the listed components.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "thyroid"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/314368",
    "usePreferredSerumYield": false
  },
  {
    "id": "labcorp-compendium-review-318585",
    "testCode": "318585",
    "testName": "Comprehensive Metabolic Panel With Additional Chemistries (6)",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "2.5 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum from cells promptly. Submit the original spun SST at room temperature. Volume shown is a planning estimate for the listed components.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "chemistry",
      "renal"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/318585",
    "usePreferredSerumYield": false
  },
  {
    "id": "labcorp-compendium-review-318749",
    "testCode": "318749",
    "testName": "Hepatic Function Panel, Lipids and CK",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "3 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum from cells promptly. Submit the original spun SST at room temperature. Volume shown is a planning estimate for the listed components. Follow the ordering clinician’s fasting instructions if a fasting specimen is ordered.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "hepatic",
      "lipids"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/318749",
    "usePreferredSerumYield": true
  },
  {
    "id": "labcorp-compendium-review-321025",
    "testCode": "321025",
    "testName": "Serum and Urine Immunofixation and Quantitative Immunoglobulins",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "1.2 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum promptly. Submit the original spun SST and the separately labeled unpreserved urine specimen.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "immunology",
      "urinary"
    ],
    "searchAliases": [
      "serum urine IFE"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/321025",
    "additionalDrawRequirements": [
      {
        "purpose": "Urine immunofixation",
        "specimenType": "Urine",
        "transportContainer": "Sterile cup",
        "transportTemperature": "Room Temperature",
        "transportTemperatureRaw": "Room Temperature",
        "preferredVolume": "10 mL urine",
        "minimumVolume": "",
        "spin": "No",
        "specialInstructions": "Use an unpreserved random urine in the original sterile screw-cap cup. Keep at room temperature and label urine.",
        "specialLabeling": "Label URINE",
        "submissionCount": 1,
        "container": "Sterile cup",
        "count": 1
      }
    ]
  },
  {
    "id": "labcorp-compendium-review-321202",
    "testCode": "321202",
    "testName": "Testosterone, Free and Bioavailable",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "3 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum from cells and submit the original spun SST. Volume shown is the planning estimate for the listed components.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "endocrinology",
      "reproductive"
    ],
    "searchAliases": [
      "free weakly bound testosterone"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/321202",
    "usePreferredSerumYield": true
  },
  {
    "id": "labcorp-compendium-review-322454",
    "testCode": "322454",
    "testName": "TSH With Reflex to Total T4",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum from cells promptly and submit original spun SSTs. When no panel volume is specified, the calculator shows a planning estimate based on the listed components.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "thyroid"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/322454",
    "usePreferredSerumYield": false
  },
  {
    "id": "labcorp-compendium-review-322545",
    "testCode": "322545",
    "testName": "Comprehensive Metabolic Panel (12) With Additional Chemistries (5)",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "2.5 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum from cells promptly. Submit the original spun SST at room temperature. Volume shown is a planning estimate for the listed components.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "chemistry",
      "renal"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/322545",
    "usePreferredSerumYield": false
  },
  {
    "id": "labcorp-compendium-review-323966",
    "testCode": "323966",
    "testName": "Lipid Panel With Cholesterol/HDL Ratio and Direct LDL",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "2 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum from cells promptly. Submit the original spun SST at room temperature. Volume shown is a planning estimate for the listed components. Follow the ordering clinician’s fasting instructions if a fasting specimen is ordered.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "lipids"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/323966",
    "usePreferredSerumYield": false
  },
  {
    "id": "labcorp-compendium-review-324419",
    "testCode": "324419",
    "testName": "Lipid Panel With Cholesterol/HDL Ratio and Direct LDL",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "2 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum from cells promptly. Submit the original spun SST at room temperature. Volume shown is a planning estimate for the listed components. Follow the ordering clinician’s fasting instructions if a fasting specimen is ordered.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "lipids"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/324419",
    "usePreferredSerumYield": false
  },
  {
    "id": "labcorp-compendium-review-324505",
    "testCode": "324505",
    "testName": "Lipid Panel With Direct LDL and LDL/HDL Ratio",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "2 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum from cells promptly. Submit the original spun SST at room temperature. Volume shown is a planning estimate for the listed components. Follow the ordering clinician’s fasting instructions if a fasting specimen is ordered.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "lipids"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/324505",
    "usePreferredSerumYield": false
  },
  {
    "id": "labcorp-compendium-review-324732",
    "testCode": "324732",
    "testName": "Protein C Activity, Protein C Antigen and Protein S Antigen, Total and Free",
    "status": "active",
    "specimenType": "Platelet-Poor Plasma",
    "drawContainer": "Light Blue Sodium Citrate",
    "transportContainer": "Frozen Transport Tube (Purple Cap)",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "preferredVolume": "3 mL platelet-poor plasma",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Fill citrate tubes to the calibrated mark. Prepare platelet-poor plasma by double centrifugation. Transfer to the specified plastic screw-cap transport tubes and freeze immediately. Keep this order separate from other frozen coagulation specimens.",
    "specialLabeling": "Label PLATELET-POOR CITRATE PLASMA",
    "collectionCount": 2,
    "submissionCount": 3,
    "clinicalCategories": [
      "coagulation"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/324732"
  },
  {
    "id": "labcorp-compendium-review-327548",
    "testCode": "327548",
    "testName": "Hepatitis B Surface Antigen, Surface Antibody, Core Antibody and Hepatitis C Antibody",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "6.5 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum from cells and refrigerate the original spun SSTs. The planning volume accounts for the listed serology and HBsAg confirmation.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "infectious"
    ],
    "searchAliases": [
      "HBV HCV serology"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/327548",
    "usePreferredSerumYield": true
  },
  {
    "id": "labcorp-compendium-review-328244",
    "testCode": "328244",
    "testName": "Testosterone, Total and Free, and SHBG",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "3 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum from cells and submit the original spun SST. Volume shown is the planning estimate for the listed components.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "endocrinology",
      "reproductive"
    ],
    "searchAliases": [
      "testosterone SHBG"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/328244",
    "usePreferredSerumYield": true
  },
  {
    "id": "labcorp-compendium-review-329562",
    "testCode": "329562",
    "testName": "Testosterone, Total, Free and Bioavailable, and SHBG",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "3 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum from cells and submit the original spun SST. Volume shown is the planning estimate for the listed components.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "endocrinology",
      "reproductive"
    ],
    "searchAliases": [
      "testosterone SHBG"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/329562",
    "usePreferredSerumYield": true
  },
  {
    "id": "labcorp-compendium-review-329859",
    "testCode": "329859",
    "testName": "Testosterone, Total and Bioavailable, and SHBG",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "3 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum from cells and submit the original spun SST. Volume shown is the planning estimate for the listed components.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "endocrinology",
      "reproductive"
    ],
    "searchAliases": [
      "testosterone SHBG"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/329859",
    "usePreferredSerumYield": true
  },
  {
    "id": "labcorp-compendium-review-330070",
    "testCode": "330070",
    "testName": "Renal Function Panel, Lipids and Additional Chemistries",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "3 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum from cells promptly. Submit the original spun SST at room temperature. Volume shown is a planning estimate for the listed components. Follow the ordering clinician’s fasting instructions if a fasting specimen is ordered.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "renal",
      "lipids"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/330070",
    "usePreferredSerumYield": true
  },
  {
    "id": "labcorp-compendium-review-330819",
    "testCode": "330819",
    "testName": "IGF-1 and IGF Binding Protein 3",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "Transport Tube",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "1.5 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum from cells and transfer to plastic serum transport. Refrigerate. Volume shown is a planning estimate for the listed components.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "endocrinology"
    ],
    "searchAliases": [
      "IGF1 IGFBP3"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/330819"
  },
  {
    "id": "labcorp-compendium-review-333417",
    "testCode": "333417",
    "testName": "Comprehensive Thyroid Panel With Reverse T3 and Thyroid Antibodies",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "6 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum from cells promptly and submit original spun SSTs. When no panel volume is specified, the calculator shows a planning estimate based on the listed components.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "thyroid",
      "autoimmune"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/333417",
    "usePreferredSerumYield": true
  },
  {
    "id": "labcorp-compendium-review-334757",
    "testCode": "334757",
    "testName": "TSH With Reflex to Free T4 and Free T3",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "3 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum from cells promptly. Submit the original spun SST at room temperature. Volume shown is a planning estimate for the listed components. Follow Labcorp guidance for biotin supplements.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "thyroid"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/334757",
    "usePreferredSerumYield": true
  },
  {
    "id": "labcorp-compendium-review-334943",
    "testCode": "334943",
    "testName": "Comprehensive Metabolic Panel (14) With eGFR",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum from cells promptly. Submit the original spun SST at room temperature. Volume shown is a planning estimate for the listed components.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "chemistry",
      "renal"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/334943",
    "usePreferredSerumYield": false
  },
  {
    "id": "labcorp-compendium-review-335362",
    "testCode": "335362",
    "testName": "Basic Metabolic Panel (8) With eGFR",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum from cells promptly. Submit the original spun SST at room temperature. Volume shown is a planning estimate for the listed components.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "chemistry",
      "renal"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/335362",
    "usePreferredSerumYield": false
  },
  {
    "id": "labcorp-compendium-review-336050",
    "testCode": "336050",
    "testName": "Protein C Functional With Reflex to Protein C Antigen",
    "status": "active",
    "specimenType": "Platelet-Poor Plasma",
    "drawContainer": "Light Blue Sodium Citrate",
    "transportContainer": "Frozen Transport Tube (Purple Cap)",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "preferredVolume": "2 mL platelet-poor plasma",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Fill citrate tubes to the calibrated mark. Prepare platelet-poor plasma by double centrifugation. Transfer to the specified plastic screw-cap transport tubes and freeze immediately. Keep this order separate from other frozen coagulation specimens.",
    "specialLabeling": "Label PLATELET-POOR CITRATE PLASMA",
    "collectionCount": 2,
    "submissionCount": 2,
    "clinicalCategories": [
      "coagulation"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/336050"
  },
  {
    "id": "labcorp-compendium-review-337877",
    "testCode": "337877",
    "testName": "Lipid Panel With Direct LDL",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "2 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum from cells promptly. Submit the original spun SST at room temperature. Volume shown is a planning estimate for the listed components. Follow the ordering clinician’s fasting instructions if a fasting specimen is ordered.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "lipids"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/337877",
    "usePreferredSerumYield": false
  },
  {
    "id": "labcorp-compendium-review-339135",
    "testCode": "339135",
    "testName": "Free T3 and Reverse T3",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "2.2 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum from cells promptly and submit original spun SSTs. When no panel volume is specified, the calculator shows a planning estimate based on the listed components.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "thyroid"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/339135",
    "usePreferredSerumYield": false
  },
  {
    "id": "labcorp-compendium-review-343002",
    "testCode": "343002",
    "testName": "Lipid Panel With Direct LDL and Cholesterol Ratios",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "2 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum from cells promptly. Submit the original spun SST at room temperature. Volume shown is a planning estimate for the listed components. Follow the ordering clinician’s fasting instructions if a fasting specimen is ordered.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "lipids"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/343002",
    "usePreferredSerumYield": false
  },
  {
    "id": "labcorp-compendium-review-345445",
    "testCode": "345445",
    "testName": "Comprehensive Metabolic Panel, Lipids and Additional Chemistries (4)",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "3 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum from cells promptly. Submit the original spun SST at room temperature. Volume shown is a planning estimate for the listed components. Follow the ordering clinician’s fasting instructions if a fasting specimen is ordered.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "chemistry",
      "lipids"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/345445",
    "usePreferredSerumYield": true
  },
  {
    "id": "labcorp-compendium-review-347822",
    "testCode": "347822",
    "testName": "Anticardiolipin, Beta-2 Glycoprotein and Lupus Anticoagulant Panel",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "1.5 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate and refrigerate the original spun SST for antibodies. Prepare the citrate plasma separately and ship frozen.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "coagulation",
      "autoimmune"
    ],
    "searchAliases": [
      "APS anticardiolipin lupus anticoagulant"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/347822",
    "additionalDrawRequirements": [
      {
        "purpose": "Coagulation testing",
        "specimenType": "Platelet-Poor Plasma",
        "transportContainer": "Frozen Transport Tube (Purple Cap)",
        "transportTemperature": "Frozen",
        "transportTemperatureRaw": "Frozen",
        "preferredVolume": "2.1 mL platelet-poor plasma",
        "minimumVolume": "",
        "spin": "Yes",
        "specialInstructions": "Fill citrate tubes to the calibrated mark. Prepare platelet-poor plasma by double centrifugation, transfer to dedicated frozen screw-cap tubes and freeze.",
        "specialLabeling": "Label PLATELET-POOR CITRATE PLASMA",
        "submissionCount": 1,
        "container": "Light Blue Sodium Citrate",
        "count": 2
      }
    ]
  },
  {
    "id": "labcorp-compendium-review-348237",
    "testCode": "348237",
    "testName": "Uric Acid and Creatinine Ratio, Random Urine",
    "status": "active",
    "specimenType": "Urine",
    "drawContainer": "Sterile cup",
    "transportContainer": "Sterile cup",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "5 mL urine",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Collect random urine into a sterile cup without preservative. Refrigerate and send the original screw-cap cup. Volume shown is a planning estimate for the listed components. No transfer.",
    "specialLabeling": "Label RANDOM URINE",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "renal",
      "urinary"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/348237"
  },
  {
    "id": "labcorp-compendium-review-348867",
    "testCode": "348867",
    "testName": "TSH With Reflex to Total T4 and LDH",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "2.5 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum from cells promptly and submit original spun SSTs. When no panel volume is specified, the calculator shows a planning estimate based on the listed components.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "thyroid",
      "chemistry"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/348867",
    "usePreferredSerumYield": false
  },
  {
    "id": "labcorp-compendium-review-349827",
    "testCode": "349827",
    "testName": "Prenatal Panel With CBC, ABO/Rh, Rubella, HBsAg, RPR and Urine Culture",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "2 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum from cells and submit the original spun SST refrigerated. Follow the listed separate serum, blood and urine routes for this order.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "pregnancy",
      "blood-bank",
      "hematology"
    ],
    "searchAliases": [
      "prenatal lab panel"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/349827",
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
        "specialInstructions": "Collect two separate EDTA tubes and mix promptly. Submit the two original tubes refrigerated. Do not spin or transfer.",
        "specialLabeling": "Label EDTA WHOLE BLOOD",
        "submissionCount": 2,
        "container": "Lavender EDTA",
        "count": 2
      },
      {
        "purpose": "Urine culture",
        "specimenType": "Urine",
        "transportContainer": "Gray-Top Urine Culture Preservative Tube",
        "transportTemperature": "Refrigerated",
        "transportTemperatureRaw": "Refrigerated",
        "preferredVolume": "Fill the gray-top urine culture tube to the line",
        "minimumVolume": "",
        "spin": "No",
        "specialInstructions": "Collect clean-catch midstream urine. Fill the gray-top urine culture preservative tube to the fill line. Send refrigerated.",
        "specialLabeling": "Label URINE; CULTURE",
        "submissionCount": 1,
        "container": "Sterile cup",
        "count": 1
      }
    ]
  },
  {
    "id": "labcorp-compendium-review-361413",
    "testCode": "361413",
    "testName": "Vitamin B12 With Reflex to MMA Below 400",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "3 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum promptly and refrigerate the original spun SST for B12 and possible MMA reflex. Volume shown is a planning estimate for the listed components.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "vitamins",
      "iron-anemia"
    ],
    "searchAliases": [
      "B12 reflex MMA"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/361413",
    "usePreferredSerumYield": true
  },
  {
    "id": "labcorp-compendium-review-361891",
    "testCode": "361891",
    "testName": "Cardiac CRP, Homocysteine and Vitamin D, 25-Hydroxy",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "2 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum and refrigerate the original spun SST. Process the EDTA plasma separately for homocysteine. Volume shown is a planning estimate for the listed components.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "vitamins",
      "cardiac"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/361891",
    "usePreferredSerumYield": false,
    "additionalDrawRequirements": [
      {
        "purpose": "Homocysteine",
        "specimenType": "Plasma",
        "transportContainer": "Transport Tube",
        "transportTemperature": "Refrigerated",
        "transportTemperatureRaw": "Refrigerated",
        "preferredVolume": "2 mL EDTA plasma",
        "minimumVolume": "1 mL",
        "spin": "Yes",
        "specialInstructions": "Centrifuge immediately. If delayed, chill and separate within an hour. Send separated EDTA plasma refrigerated.",
        "specialLabeling": "Label EDTA PLASMA",
        "submissionCount": 1,
        "container": "Lavender EDTA",
        "count": 1
      }
    ]
  },
  {
    "id": "labcorp-compendium-review-363487",
    "testCode": "363487",
    "testName": "Prenatal Panel With CBC, ABO/Rh, Rubella, HBsAg and Syphilis Testing",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "0.6 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Centrifuge and refrigerate the original spun SST. Send the second spun SST at room temperature. Submit the original unspun EDTA tubes separately.",
    "specialLabeling": "Label SERUM; refrigerated component",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "pregnancy",
      "blood-bank",
      "hematology"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/363487",
    "additionalDrawRequirements": [
      {
        "purpose": "Room-temperature serum",
        "specimenType": "Serum",
        "transportContainer": "SST / Gold (spun)",
        "transportTemperature": "Room Temperature",
        "transportTemperatureRaw": "Room Temperature",
        "preferredVolume": "1.75 mL serum",
        "minimumVolume": "",
        "spin": "Yes",
        "specialInstructions": "Centrifuge and submit the original spun SST at room temperature.",
        "specialLabeling": "Label SERUM; room-temperature component",
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
        "specialInstructions": "Collect two separate EDTA tubes and mix promptly. Submit the two original tubes refrigerated. Do not spin or transfer.",
        "specialLabeling": "Label EDTA WHOLE BLOOD",
        "submissionCount": 2,
        "container": "Lavender EDTA",
        "count": 2
      }
    ]
  },
  {
    "id": "labcorp-compendium-review-364583",
    "testCode": "364583",
    "testName": "PT and PTT-LA With Mixing Studies",
    "status": "active",
    "specimenType": "Platelet-Poor Plasma",
    "drawContainer": "Light Blue Sodium Citrate",
    "transportContainer": "Frozen Transport Tube (Purple Cap)",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "preferredVolume": "3 mL platelet-poor plasma",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Fill citrate tubes to the calibrated mark. Prepare platelet-poor plasma by double centrifugation. Transfer to the specified plastic screw-cap transport tubes and freeze immediately. Keep this order separate from other frozen coagulation specimens.",
    "specialLabeling": "Label PLATELET-POOR CITRATE PLASMA",
    "collectionCount": 2,
    "submissionCount": 2,
    "clinicalCategories": [
      "coagulation"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/364583"
  },
  {
    "id": "labcorp-compendium-review-364668",
    "testCode": "364668",
    "testName": "ANA, ENA, dsDNA, C3, C4, TPO and Rheumatoid Factor Panel",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "4 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum from cells promptly and submit original spun SSTs. When no panel volume is specified, the calculator shows a planning estimate based on the listed components.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "autoimmune",
      "immunology"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/364668",
    "usePreferredSerumYield": true
  },
  {
    "id": "labcorp-compendium-review-365350",
    "testCode": "365350",
    "testName": "PTT-LA With Hexagonal Phase Phospholipid Reflex",
    "status": "active",
    "specimenType": "Platelet-Poor Plasma",
    "drawContainer": "Light Blue Sodium Citrate",
    "transportContainer": "Frozen Transport Tube (Purple Cap)",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "preferredVolume": "1.7 mL platelet-poor plasma",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Fill citrate tubes to the calibrated mark. Prepare platelet-poor plasma by double centrifugation. Transfer to the specified plastic screw-cap transport tubes and freeze immediately. Keep this order separate from other frozen coagulation specimens.",
    "specialLabeling": "Label PLATELET-POOR CITRATE PLASMA",
    "collectionCount": 2,
    "submissionCount": 1,
    "clinicalCategories": [
      "coagulation"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/365350"
  },
  {
    "id": "labcorp-compendium-review-366778",
    "testCode": "366778",
    "testName": "TSH, Free T3 and Free T4",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "3 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum from cells promptly. Submit the original spun SST at room temperature. Volume shown is a planning estimate for the listed components. Follow Labcorp guidance for biotin supplements.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "thyroid"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/366778",
    "usePreferredSerumYield": true
  },
  {
    "id": "labcorp-compendium-review-367228",
    "testCode": "367228",
    "testName": "Lipid Panel With Cholesterol/HDL Ratio, Reflex to Direct LDL",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "2 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum from cells promptly. Submit the original spun SST at room temperature. Volume shown is a planning estimate for the listed components. Follow the ordering clinician’s fasting instructions if a fasting specimen is ordered.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "lipids"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/367228",
    "usePreferredSerumYield": false
  },
  {
    "id": "labcorp-compendium-review-367330",
    "testCode": "367330",
    "testName": "Comprehensive Metabolic Panel, Lipids, CBC, Hemoglobin A1c, Urinalysis and Urine Albumin",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum from cells promptly. Submit the spun SST and original EDTA tubes refrigerated. Prepare and label the specified urine submissions separately.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "chemistry",
      "lipids",
      "hematology",
      "urinary"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/367330",
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
        "specialInstructions": "Collect two separate EDTA tubes and mix promptly. Submit the two original tubes refrigerated. Do not spin or transfer.",
        "specialLabeling": "Label EDTA WHOLE BLOOD",
        "submissionCount": 2,
        "container": "Lavender EDTA",
        "count": 2
      },
      {
        "purpose": "Urinalysis",
        "specimenType": "Urine",
        "transportContainer": "Urinalysis Transport Tube (Red/Yellow)",
        "transportTemperature": "Refrigerated",
        "transportTemperatureRaw": "Refrigerated",
        "preferredVolume": "10 mL urine",
        "minimumVolume": "",
        "spin": "No",
        "specialInstructions": "Transfer urine from the clean-catch cup to the required red/yellow urinalysis tube. Fill to its marked range. Refrigerate.",
        "specialLabeling": "Label URINE; URINALYSIS",
        "submissionCount": 1,
        "container": "Sterile cup",
        "count": 1
      },
      {
        "purpose": "Urine albumin",
        "specimenType": "Urine",
        "transportContainer": "Sterile cup",
        "transportTemperature": "Refrigerated",
        "transportTemperatureRaw": "Refrigerated",
        "preferredVolume": "1 mL urine",
        "minimumVolume": "",
        "spin": "No",
        "specialInstructions": "Set aside sufficient well-mixed urine in the original unpreserved cup for urine albumin. Refrigerate.",
        "specialLabeling": "Label URINE; ALBUMIN",
        "submissionCount": 1,
        "container": "Sterile cup",
        "count": 1
      }
    ]
  },
  {
    "id": "labcorp-compendium-review-369761",
    "testCode": "369761",
    "testName": "Lipid Panel With Cholesterol Ratios and Direct LDL",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "2 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum from cells promptly. Submit the original spun SST at room temperature. Volume shown is a planning estimate for the listed components. Follow the ordering clinician’s fasting instructions if a fasting specimen is ordered.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "lipids"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/369761",
    "usePreferredSerumYield": false
  },
  {
    "id": "labcorp-compendium-review-369954",
    "testCode": "369954",
    "testName": "Hepatitis C Antibody With Reflex to RNA and Genotype",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "1.5 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Centrifuge and refrigerate the original spun SST for HCV antibody. Submit the separately prepared frozen reflex specimen.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "infectious"
    ],
    "searchAliases": [
      "HCV ab PCR reflex genotype"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/369954",
    "additionalDrawRequirements": [
      {
        "purpose": "HCV PCR and genotype reflex",
        "specimenType": "Serum",
        "transportContainer": "Frozen Transport Tube (Purple Cap)",
        "transportTemperature": "Frozen",
        "transportTemperatureRaw": "Frozen",
        "preferredVolume": "1.5 mL serum",
        "minimumVolume": "",
        "spin": "Yes",
        "specialInstructions": "Centrifuge within 24 hours, transfer separated serum into its own screw-cap polypropylene tube and freeze.",
        "specialLabeling": "Label SERUM; HCV RNA AND GENOTYPE REFLEX",
        "submissionCount": 1,
        "container": "SST / Gold",
        "count": 1
      }
    ]
  },
  {
    "id": "labcorp-compendium-review-374462",
    "testCode": "374462",
    "testName": "AST, BUN, Creatinine and Uric Acid",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "1.5 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum from cells promptly. Submit the original spun SST at room temperature. Volume shown is a planning estimate for the listed components.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "chemistry",
      "renal"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/374462",
    "usePreferredSerumYield": false
  },
  {
    "id": "labcorp-compendium-review-375101",
    "testCode": "375101",
    "testName": "Vitamin B12 With Reflex to MMA Below 350",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "3 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum promptly and refrigerate the original spun SST for B12 and possible MMA reflex. Volume shown is a planning estimate for the listed components.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "vitamins",
      "iron-anemia"
    ],
    "searchAliases": [
      "B12 reflex MMA"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/375101",
    "usePreferredSerumYield": true
  },
  {
    "id": "labcorp-compendium-review-375591",
    "testCode": "375591",
    "testName": "Comprehensive Metabolic Panel (14) With GGT",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "2 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum from cells promptly. Submit the original spun SST at room temperature. Volume shown is a planning estimate for the listed components.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "chemistry",
      "hepatic"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/375591",
    "usePreferredSerumYield": false
  },
  {
    "id": "labcorp-compendium-review-377995",
    "testCode": "377995",
    "testName": "Hepatitis B Surface Antigen, Surface Antibody and Core Antibody (Total and IgM)",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "6 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum from cells and refrigerate the original spun SSTs. The planning volume accounts for the listed serology and HBsAg confirmation.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "infectious"
    ],
    "searchAliases": [
      "HBV serology panel"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/377995",
    "usePreferredSerumYield": true
  },
  {
    "id": "labcorp-compendium-review-379196",
    "testCode": "379196",
    "testName": "Vitamin B12 With Reflex to Methylmalonic Acid",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "3 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum promptly and refrigerate the original spun SST for B12 and possible MMA reflex. Volume shown is a planning estimate for the listed components.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "vitamins",
      "iron-anemia"
    ],
    "searchAliases": [
      "B12 reflex MMA"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/379196",
    "usePreferredSerumYield": true
  },
  {
    "id": "labcorp-compendium-review-379394",
    "testCode": "379394",
    "testName": "Testosterone, Total and Free, and SHBG",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "3 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum from cells and submit the original spun SST. Volume shown is the planning estimate for the listed components.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "endocrinology",
      "reproductive"
    ],
    "searchAliases": [
      "testosterone SHBG"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/379394",
    "usePreferredSerumYield": true
  },
  {
    "id": "labcorp-compendium-review-379720",
    "testCode": "379720",
    "testName": "Vitamin B12, Homocysteine and Methylmalonic Acid",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "3 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum and refrigerate the original spun SST. Process the EDTA plasma separately for homocysteine. Volume shown is a planning estimate for the listed components.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "vitamins",
      "cardiac"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/379720",
    "usePreferredSerumYield": true,
    "additionalDrawRequirements": [
      {
        "purpose": "Homocysteine",
        "specimenType": "Plasma",
        "transportContainer": "Transport Tube",
        "transportTemperature": "Refrigerated",
        "transportTemperatureRaw": "Refrigerated",
        "preferredVolume": "2 mL EDTA plasma",
        "minimumVolume": "1 mL",
        "spin": "Yes",
        "specialInstructions": "Centrifuge immediately. If delayed, chill and separate within an hour. Send separated EDTA plasma refrigerated.",
        "specialLabeling": "Label EDTA PLASMA",
        "submissionCount": 1,
        "container": "Lavender EDTA",
        "count": 1
      }
    ]
  },
  {
    "id": "labcorp-compendium-review-383957",
    "testCode": "383957",
    "testName": "Prenatal Panel With CBC, ABO/Rh, Rubella, HBsAg, RPR, HIV, Urinalysis and Urine Culture",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "2 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum from cells and submit the original spun SST refrigerated. Follow the listed separate serum, blood and urine routes for this order.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "pregnancy",
      "blood-bank",
      "hematology"
    ],
    "searchAliases": [
      "prenatal lab panel"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/383957",
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
        "specialInstructions": "Use its own dedicated SST for HIV antigen/antibody screening and reflexes. Centrifuge and submit refrigerated and unopened.",
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
        "specialInstructions": "Collect two separate EDTA tubes and mix promptly. Submit the two original tubes refrigerated. Do not spin or transfer.",
        "specialLabeling": "Label EDTA WHOLE BLOOD",
        "submissionCount": 2,
        "container": "Lavender EDTA",
        "count": 2
      },
      {
        "purpose": "Urine culture",
        "specimenType": "Urine",
        "transportContainer": "Gray-Top Urine Culture Preservative Tube",
        "transportTemperature": "Refrigerated",
        "transportTemperatureRaw": "Refrigerated",
        "preferredVolume": "Fill the gray-top urine culture tube to the line",
        "minimumVolume": "",
        "spin": "No",
        "specialInstructions": "Collect clean-catch midstream urine. Fill the gray-top urine culture preservative tube to the fill line. Send refrigerated.",
        "specialLabeling": "Label URINE; CULTURE",
        "submissionCount": 1,
        "container": "Sterile cup",
        "count": 1
      },
      {
        "purpose": "Urinalysis",
        "specimenType": "Urine",
        "transportContainer": "Urinalysis Transport Tube (Red/Yellow)",
        "transportTemperature": "Refrigerated",
        "transportTemperatureRaw": "Refrigerated",
        "preferredVolume": "10 mL urine",
        "minimumVolume": "",
        "spin": "No",
        "specialInstructions": "Transfer urine from the clean-catch cup to the required red/yellow urinalysis tube. Fill to its marked range. Refrigerate.",
        "specialLabeling": "Label URINE; URINALYSIS",
        "submissionCount": 1,
        "container": "Sterile cup",
        "count": 1
      }
    ]
  },
  {
    "id": "labcorp-compendium-review-384939",
    "testCode": "384939",
    "testName": "Prenatal Panel With CBC, ABO/Rh, Rubella, HBsAg, Syphilis and HIV",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "2.5 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum from cells and submit the original spun SST refrigerated. Follow the listed separate serum, blood and urine routes for this order.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "pregnancy",
      "blood-bank",
      "hematology"
    ],
    "searchAliases": [
      "prenatal lab panel"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/384939",
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
        "specialInstructions": "Use its own dedicated SST for HIV antigen/antibody screening and reflexes. Centrifuge and submit refrigerated and unopened.",
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
        "specialInstructions": "Collect two separate EDTA tubes and mix promptly. Submit the two original tubes refrigerated. Do not spin or transfer.",
        "specialLabeling": "Label EDTA WHOLE BLOOD",
        "submissionCount": 2,
        "container": "Lavender EDTA",
        "count": 2
      }
    ]
  },
  {
    "id": "labcorp-compendium-review-396255",
    "testCode": "396255",
    "testName": "Prenatal Panel With CBC, Blood Bank, Serology, CT/NG and Routine Urine Culture",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "2 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum from cells and submit the original spun SST refrigerated. Follow the listed separate serum, blood and urine routes for this order.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "pregnancy",
      "blood-bank",
      "hematology"
    ],
    "searchAliases": [
      "prenatal lab panel"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/396255",
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
        "specialInstructions": "Use its own dedicated SST for HIV antigen/antibody screening and reflexes. Centrifuge and submit refrigerated and unopened.",
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
        "specialInstructions": "Collect two separate EDTA tubes and mix promptly. Submit the two original tubes refrigerated. Do not spin or transfer.",
        "specialLabeling": "Label EDTA WHOLE BLOOD",
        "submissionCount": 2,
        "container": "Lavender EDTA",
        "count": 2
      },
      {
        "purpose": "Urine culture",
        "specimenType": "Urine",
        "transportContainer": "Gray-Top Urine Culture Preservative Tube",
        "transportTemperature": "Refrigerated",
        "transportTemperatureRaw": "Refrigerated",
        "preferredVolume": "Fill the gray-top urine culture tube to the line",
        "minimumVolume": "",
        "spin": "No",
        "specialInstructions": "Collect clean-catch midstream urine. Fill the gray-top urine culture preservative tube to the fill line. Send refrigerated.",
        "specialLabeling": "Label URINE; CULTURE",
        "submissionCount": 1,
        "container": "Sterile cup",
        "count": 1
      },
      {
        "purpose": "Chlamydia and gonorrhea NAAT",
        "specimenType": "First Catch Urine",
        "transportContainer": "Aptima Urine Transport Tube (yellow label)",
        "transportTemperature": "Room Temperature",
        "transportTemperatureRaw": "Room Temperature",
        "preferredVolume": "2 mL urine in the device",
        "minimumVolume": "",
        "spin": "No",
        "specialInstructions": "Collect first-catch urine separately from the clean-catch specimen used for culture. The patient should not urinate for one hour before collection. Transfer to the yellow-label Aptima urine device between marked lines.",
        "specialLabeling": "Label FIRST-CATCH URINE; CT/NG NAAT",
        "submissionCount": 1,
        "container": "Sterile cup",
        "count": 1
      }
    ]
  },
  {
    "id": "labcorp-compendium-review-481651",
    "testCode": "481651",
    "testName": "Spinal Muscular Atrophy (SMA), Fetal Analysis",
    "status": "active",
    "specimenType": "Cord Whole Blood",
    "drawContainer": "Lavender EDTA",
    "transportContainer": "Lavender EDTA",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "4 mL cord whole blood",
    "minimumVolume": "3 mL",
    "spin": "No",
    "specialInstructions": "Use provider-collected cord blood. Mix and ship promptly at room temperature in the original unspun EDTA tube. Do not freeze. No transfer.",
    "specialLabeling": "Label CORD WHOLE BLOOD",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "genetics",
      "pregnancy"
    ],
    "searchAliases": [
      "prenatal SMA cord blood"
    ],
    "source": "https://www.labcorp.com/tests/481651/spinal-muscular-atrophy-sma-fetal-analysis"
  },
  {
    "id": "labcorp-compendium-review-500918",
    "testCode": "500918",
    "testName": "Histopathology",
    "status": "active",
    "specimenType": "Tissue",
    "drawContainer": "10% Neutral Buffered Formalin Tissue Container",
    "transportContainer": "10% Neutral Buffered Formalin Tissue Container",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "Entire tissue specimen",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Accept provider-collected tissue in its original labeled 10% neutral buffered formalin container. Submit at room temperature and identify the site. No transfer.",
    "specialLabeling": "Label TISSUE and exact anatomical source",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "oncology"
    ],
    "searchAliases": [],
    "source": "https://www.labcorp.com/tests/500918/histopathology"
  },
  {
    "id": "labcorp-compendium-review-504400",
    "testCode": "504400",
    "testName": "Antiphospholipid Syndrome (APS), Comprehensive",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "Frozen Transport Tube (Purple Cap)",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "preferredVolume": "2 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate serum and freeze two separately labeled 1 mL serum aliquots. Submit frozen serum and citrate plasma in their specified separate tubes.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 2,
    "clinicalCategories": [
      "coagulation",
      "autoimmune"
    ],
    "searchAliases": [
      "Esoterix APS comprehensive"
    ],
    "source": "https://womenshealth.labcorp.com/sites/default/files/2024-04/L7965-0422-12.pdf",
    "additionalDrawRequirements": [
      {
        "purpose": "Esoterix coagulation component",
        "specimenType": "Platelet-Poor Plasma",
        "transportContainer": "Frozen Transport Tube (Purple Cap)",
        "transportTemperature": "Frozen",
        "transportTemperatureRaw": "Frozen",
        "preferredVolume": "6 mL platelet-poor citrate plasma",
        "minimumVolume": "",
        "spin": "Yes",
        "specialInstructions": "Fill citrate tubes to the calibrated mark. Prepare platelet-poor plasma by double centrifugation. Freeze three separately labeled plasma aliquots, 2 mL in each.",
        "specialLabeling": "Label PLATELET-POOR CITRATE PLASMA",
        "submissionCount": 3,
        "container": "Light Blue Sodium Citrate",
        "count": 4
      }
    ]
  },
  {
    "id": "labcorp-compendium-review-510110",
    "testCode": "510110",
    "testName": "SNP Microarray−Products of Conception (POC)/Tissue (Reveal®)",
    "status": "active",
    "specimenType": "Products of Conception Tissue",
    "drawContainer": "Sterile Tissue Container With Ringer’s Lactate",
    "transportContainer": "Sterile Tissue Container With Ringer’s Lactate",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "More than 8 mg of tissue",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Accept nonfixed provider-collected tissue in sterile Ringer’s lactate. Send promptly at room temperature. Refrigeration is the directory’s option if shipment is delayed. Do not freeze or fix. No transfer.",
    "specialLabeling": "Label PRODUCTS OF CONCEPTION TISSUE and exact anatomical source",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "oncology",
      "genetics"
    ],
    "searchAliases": [],
    "source": "https://www.labcorp.com/tests/510110/snp-microarray-products-of-conception-poc-tissue-reveal"
  },
  {
    "id": "labcorp-compendium-review-510770",
    "testCode": "510770",
    "testName": "Microdeletion Syndromes, FISH",
    "status": "active",
    "specimenType": "Bone Marrow",
    "drawContainer": "Green Sodium Heparin",
    "transportContainer": "Green Sodium Heparin",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "3 mL marrow",
    "minimumVolume": "1 mL",
    "spin": "No",
    "specialInstructions": "Use provider-collected bone marrow in a size-appropriate sodium-heparin tube. Mix and send the original tube at room temperature. No spin or transfer. No transfer.",
    "specialLabeling": "Label BONE MARROW",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "genetics",
      "hematology"
    ],
    "searchAliases": [
      "microdeletion FISH marrow"
    ],
    "source": "https://www.labcorp.com/tests/510770/microdeletion-syndromes-fish"
  },
  {
    "id": "labcorp-compendium-review-510960",
    "testCode": "510960",
    "testName": "Prenatal Aneuploid Evaluation, Chorionic Villus Sampling, FISH",
    "status": "active",
    "specimenType": "Chorionic Villi Tissue",
    "drawContainer": "Labcorp CVS Specimen Transport Tube",
    "transportContainer": "Labcorp CVS Specimen Transport Tube",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "5mg Chorionic villi or greater",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Accept the collecting provider’s chorionic villi specimen in the original Labcorp CVS transport tube with medium. Keep at room temperature and send promptly to cytogenetics. Do not freeze. No transfer.",
    "specialLabeling": "Label CHORIONIC VILLI",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "pregnancy",
      "genetics"
    ],
    "searchAliases": [],
    "source": "https://www.labcorp.com/tests/510960/prenatal-aneuploid-evaluation-chorionic-villus-sampling-fish"
  },
  {
    "id": "labcorp-compendium-review-510963",
    "testCode": "510963",
    "testName": "Products of Conception (POC) Aneuploid Evaluation, FISH Genetics",
    "status": "active",
    "specimenType": "Products of Conception Tissue",
    "drawContainer": "Sterile Tissue Container With Ringer’s Lactate",
    "transportContainer": "Sterile Tissue Container With Ringer’s Lactate",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "Viable tissue specimen",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Accept viable provider-collected tissue in sterile Ringer’s lactate. Keep at room temperature and deliver promptly to cytogenetics. No transfer.",
    "specialLabeling": "Label PRODUCTS OF CONCEPTION TISSUE and exact anatomical source",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "oncology",
      "genetics"
    ],
    "searchAliases": [],
    "source": "https://www.labcorp.com/tests/510963/products-of-conception-poc-aneuploid-evaluation-fish-genetics"
  },
  {
    "id": "labcorp-compendium-review-510988",
    "testCode": "510988",
    "testName": "Chromosome Analysis, Chorionic Villi Biopsy",
    "status": "active",
    "specimenType": "Chorionic Villi Tissue",
    "drawContainer": "Labcorp CVS Specimen Transport Tube",
    "transportContainer": "Labcorp CVS Specimen Transport Tube",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "20-30 mg",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Accept the collecting provider’s chorionic villi specimen in the original Labcorp CVS transport tube with medium. Keep at room temperature and send promptly to cytogenetics. Do not freeze. No transfer.",
    "specialLabeling": "Label CHORIONIC VILLI",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "pregnancy",
      "genetics"
    ],
    "searchAliases": [],
    "source": "https://www.labcorp.com/tests/510988/chromosome-analysis-chorionic-villi-biopsy"
  },
  {
    "id": "labcorp-compendium-review-510995",
    "testCode": "510995",
    "testName": "Chromosome Analysis - Solid Tumor | Labcorp Oncology | Labcorp",
    "status": "active",
    "specimenType": "Solid Tumor Tissue",
    "drawContainer": "Sterile Tissue Container With Ringer’s Lactate",
    "transportContainer": "Sterile Tissue Container With Ringer’s Lactate",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "Sterile non-necrotic tissue",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Accept provider-collected sterile non-necrotic tissue in sterile Ringer’s lactate. Coordinate immediate transport under the directory’s room-temperature route. No transfer.",
    "specialLabeling": "Label SOLID TUMOR TISSUE and exact anatomical source",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "oncology",
      "genetics"
    ],
    "searchAliases": [],
    "source": "https://www.labcorp.com/tests/510995/chromosome-analysis-solid-tumor-onc"
  },
  {
    "id": "labcorp-compendium-review-510999",
    "testCode": "510999",
    "testName": "Chromosome Analysis, Leukemia/Lymphoma",
    "status": "active",
    "specimenType": "Bone Marrow",
    "drawContainer": "Green Sodium Heparin",
    "transportContainer": "Green Sodium Heparin",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "2 mL bone marrow",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Accept the treating provider’s bone marrow in a size-appropriate original pediatric sodium-heparin tube. Use the Labcorp Leukemia/Lymphoma Specimen Transport Kit for shipment. Keep at room temperature; arrange arrival within 48 hours. Include the tentative diagnosis. No transfer.",
    "specialLabeling": "Label BONE MARROW",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "oncology",
      "hematology",
      "genetics"
    ],
    "searchAliases": [
      "marrow leukemia lymphoma chromosome analysis"
    ],
    "source": "https://www.labcorp.com/tests/510999/chromosome-analysis-leukemia-lymphoma"
  },
  {
    "id": "labcorp-compendium-review-511020",
    "testCode": "511020",
    "testName": "CVS Chrom Analysis 5 Cell Cnt",
    "status": "active",
    "specimenType": "Chorionic Villi Tissue",
    "drawContainer": "Labcorp CVS Specimen Transport Tube",
    "transportContainer": "Labcorp CVS Specimen Transport Tube",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "20-30 mg",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Accept the collecting provider’s chorionic villi specimen in the original Labcorp CVS transport tube with medium. Keep at room temperature and send promptly to cytogenetics. Do not freeze. No transfer.",
    "specialLabeling": "Label CHORIONIC VILLI",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "pregnancy",
      "genetics"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/511020"
  },
  {
    "id": "labcorp-compendium-review-511033",
    "testCode": "511033",
    "testName": "Chromosome Analysis, Chorionic Villi Biopsy With Reflex to SNP Microarray (Reveal®)",
    "status": "active",
    "specimenType": "Chorionic Villi Tissue",
    "drawContainer": "Labcorp CVS Specimen Transport Tube",
    "transportContainer": "Labcorp CVS Specimen Transport Tube",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "20-30 mg",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Accept the collecting provider’s chorionic villi specimen in the original Labcorp CVS transport tube with medium. Keep at room temperature and send promptly to cytogenetics. Do not freeze. No transfer.",
    "specialLabeling": "Label CHORIONIC VILLI",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "pregnancy",
      "genetics"
    ],
    "searchAliases": [],
    "source": "https://www.labcorp.com/tests/511033/chromosome-analysis-chorionic-villi-biopsy-with-reflex-to-snp-microarray-reveal"
  },
  {
    "id": "labcorp-compendium-review-511040",
    "testCode": "511040",
    "testName": "Chromosome Analysis, Leukemia/Lymphoma With Reflex to Chromosome Microarray (CMA)",
    "status": "active",
    "specimenType": "Bone Marrow",
    "drawContainer": "Green Sodium Heparin",
    "transportContainer": "Green Sodium Heparin",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "2 mL bone marrow",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Accept the treating provider’s bone marrow in a size-appropriate original pediatric sodium-heparin tube. Use the Labcorp Leukemia/Lymphoma Specimen Transport Kit for shipment. Keep at room temperature; arrange arrival within 48 hours. Include the tentative diagnosis. No transfer.",
    "specialLabeling": "Label BONE MARROW",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "oncology",
      "hematology",
      "genetics"
    ],
    "searchAliases": [
      "marrow leukemia lymphoma chromosome analysis"
    ],
    "source": "https://www.labcorp.com/tests/511040/chromosome-analysis-leukemia-lymphoma-with-reflex-to-chromosome-microarray-cma"
  },
  {
    "id": "labcorp-compendium-review-511485",
    "testCode": "511485",
    "testName": "Chromosome Analysis, Lymph Node",
    "status": "active",
    "specimenType": "Lymph Node Tissue",
    "drawContainer": "Labcorp Lymph Node Transport Kit",
    "transportContainer": "Labcorp Lymph Node Transport Kit",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "0.5–1 cm³ tissue",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Accept the provider’s specimen in the Labcorp Lymph Node Transport Kit. Keep the original container at room temperature and coordinate prompt delivery. No transfer.",
    "specialLabeling": "Label LYMPH NODE TISSUE and exact anatomical source",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "oncology",
      "genetics"
    ],
    "searchAliases": [],
    "source": "https://www.labcorp.com/tests/511485/chromosome-analysis-lymph-node"
  },
  {
    "id": "labcorp-compendium-review-511555",
    "testCode": "511555",
    "testName": "Reveal SNP Microarray and Abbreviated Chromosome Analysis (CVS) | Labcorp",
    "status": "active",
    "specimenType": "Chorionic Villi Tissue",
    "drawContainer": "Labcorp CVS Specimen Transport Tube",
    "transportContainer": "Labcorp CVS Specimen Transport Tube",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "20-30 mg (for concurrent array and chromosomes)",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Accept the collecting provider’s chorionic villi specimen in the original Labcorp CVS transport tube with medium. Keep at room temperature and send promptly to cytogenetics. Do not freeze. No transfer.",
    "specialLabeling": "Label CHORIONIC VILLI",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "pregnancy",
      "genetics"
    ],
    "searchAliases": [],
    "source": "https://www.labcorp.com/tests/511555/reveal-snp-microarray-and-abbreviated-chromosome-analysis-cvs-whe"
  },
  {
    "id": "labcorp-compendium-review-511625",
    "testCode": "511625",
    "testName": "Fluorescence in situ Hybridization (FISH), Prenatal Aneuploid Evaluation, Chorionic Villus Sampling With Reflex to Microarray or Chromosome Analysis",
    "status": "active",
    "specimenType": "Chorionic Villi Tissue",
    "drawContainer": "Labcorp CVS Specimen Transport Tube",
    "transportContainer": "Labcorp CVS Specimen Transport Tube",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "20-30 mg",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Accept the collecting provider’s chorionic villi specimen in the original Labcorp CVS transport tube with medium. Keep at room temperature and send promptly to cytogenetics. Do not freeze. No transfer.",
    "specialLabeling": "Label CHORIONIC VILLI",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "pregnancy",
      "genetics"
    ],
    "searchAliases": [],
    "source": "https://www.labcorp.com/tests/511625/fluorescence-in-situ-hybridization-fish-prenatal-aneuploid-evaluation-chorionic-villus-sampling-with-reflex-to-microarray-or-chromosome-analysis"
  },
  {
    "id": "labcorp-compendium-review-511880",
    "testCode": "511880",
    "testName": "Products of Conception (POC) Paraffin-embedded, Aneuploid Evaluation",
    "status": "active",
    "specimenType": "Products of Conception Tissue",
    "drawContainer": "Sterile Tissue Container",
    "transportContainer": "Sterile Tissue Container",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "Formalin-fixed tissue specimen",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Use the formalin-fixed tissue route supplied by the treating provider. Submit at room temperature in the original approved sterile tissue container. No transfer.",
    "specialLabeling": "Label PRODUCTS OF CONCEPTION TISSUE and exact anatomical source",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "oncology",
      "genetics"
    ],
    "searchAliases": [],
    "source": "https://www.labcorp.com/tests/511880/products-of-conception-poc-paraffin-embedded-aneuploid-evaluation"
  },
  {
    "id": "labcorp-compendium-review-512085",
    "testCode": "512085",
    "testName": "Microarray-Products of Conception (POC) Reveal(R)",
    "status": "active",
    "specimenType": "Products of Conception Tissue",
    "drawContainer": "Sterile Tissue Container With Ringer’s Lactate",
    "transportContainer": "Sterile Tissue Container With Ringer’s Lactate",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "Products of conception specimen",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Accept nonfixed provider-collected tissue in sterile Ringer’s lactate. Refrigerate and send promptly. Do not freeze or fix. No transfer.",
    "specialLabeling": "Label PRODUCTS OF CONCEPTION TISSUE and exact anatomical source",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "oncology",
      "genetics"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/512085"
  },
  {
    "id": "labcorp-compendium-review-512200",
    "testCode": "512200",
    "testName": "Products of Conception (POC) Profile",
    "status": "active",
    "specimenType": "Products of Conception Tissue",
    "drawContainer": "Sterile Tissue Container With Ringer’s Lactate",
    "transportContainer": "Sterile Tissue Container With Ringer’s Lactate",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "Products of conception specimen",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Accept provider-collected tissue in sterile Ringer’s lactate. Refrigerate and ship promptly. Do not freeze or fix. No transfer.",
    "specialLabeling": "Label PRODUCTS OF CONCEPTION TISSUE and exact anatomical source",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "oncology",
      "genetics"
    ],
    "searchAliases": [],
    "source": "https://www.labcorp.com/tests/512200/products-of-conception-poc-profile"
  },
  {
    "id": "labcorp-compendium-review-631559",
    "testCode": "631559",
    "testName": "5-Methyltetrahydrofolate (CSF)",
    "status": "active",
    "specimenType": "CSF",
    "drawContainer": "Sterile Screw-Cap CSF Tube",
    "transportContainer": "Sterile Screw-Cap CSF Tube",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "preferredVolume": "0.5 mL CSF",
    "minimumVolume": "0.25 mL",
    "spin": "No",
    "specialInstructions": "Use the directory’s single-assay route only. Accept CSF in the original sterile tube, already frozen by the procedural team following the exact Labcorp protocol. Do not combine collections or aliquot. Ship on dry ice. Concurrent CSF neurotransmitter orders require the separate Labcorp five-tube workflow. No transfer.",
    "specialLabeling": "Label CSF and required sequence",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "neurology",
      "body-fluids"
    ],
    "searchAliases": [],
    "source": "https://www.labcorp.com/tests/631559/5-methyltetrahydrofolate-csf"
  },
  {
    "id": "labcorp-compendium-review-631580",
    "testCode": "631580",
    "testName": "Neurotransmitter Metabolites (5HIAA, HVA, 3OMD) (CSF)",
    "status": "active",
    "specimenType": "CSF",
    "drawContainer": "Sterile Screw-Cap CSF Tube",
    "transportContainer": "Sterile Screw-Cap CSF Tube",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "preferredVolume": "0.5 mL CSF",
    "minimumVolume": "0.25 mL",
    "spin": "No",
    "specialInstructions": "Use the directory’s single-assay route only. Accept CSF in the original sterile tube, already frozen by the procedural team following the exact Labcorp protocol. Do not combine collections or aliquot. Ship on dry ice. Concurrent CSF neurotransmitter orders require the separate Labcorp five-tube workflow. No transfer.",
    "specialLabeling": "Label CSF and required sequence",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "neurology",
      "body-fluids"
    ],
    "searchAliases": [],
    "source": "https://www.labcorp.com/tests/631580/neurotransmitter-metabolites-5hiaa-hva-3omd-csf"
  },
  {
    "id": "labcorp-compendium-review-631589",
    "testCode": "631589",
    "testName": "3-O-Methyldopa (Plasma)",
    "status": "active",
    "specimenType": "Plasma",
    "drawContainer": "Lavender EDTA",
    "transportContainer": "Frozen Transport Tube (Purple Cap)",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "preferredVolume": "0.5 mL plasma",
    "minimumVolume": "0.25 mL",
    "spin": "Yes",
    "specialInstructions": "Separate EDTA plasma into a plastic screw-cap tube and freeze promptly. Submit the independently labeled lithium heparin plasma as well. Follow the directory’s −80 °C storage and dry-ice shipping instructions. Use the listed immediate-shipment option if only −20 °C storage is available.",
    "specialLabeling": "Label EDTA PLASMA",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "neurology"
    ],
    "searchAliases": [
      "3 O methyldopa plasma",
      "3 OMD plasma"
    ],
    "source": "https://www.labcorp.com/tests/631589/3-o-methyldopa-plasma",
    "additionalDrawRequirements": [
      {
        "purpose": "Lithium heparin plasma",
        "specimenType": "Plasma",
        "transportContainer": "Frozen Transport Tube (Purple Cap)",
        "transportTemperature": "Frozen",
        "transportTemperatureRaw": "Frozen",
        "preferredVolume": "0.5 mL plasma",
        "minimumVolume": "0.25 mL",
        "spin": "Yes",
        "specialInstructions": "Separate lithium heparin plasma and transfer into its own plastic screw-cap tube. Freeze promptly and ship on dry ice.",
        "specialLabeling": "Label LITHIUM HEPARIN PLASMA",
        "submissionCount": 1,
        "container": "Green Lithium Heparin",
        "count": 1
      }
    ]
  },
  {
    "id": "labcorp-compendium-review-631603",
    "testCode": "631603",
    "testName": "Pyridoxal 5'-phosphate (CSF)",
    "status": "active",
    "specimenType": "CSF",
    "drawContainer": "Sterile Screw-Cap CSF Tube",
    "transportContainer": "Sterile Screw-Cap CSF Tube",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "preferredVolume": "0.5 mL CSF",
    "minimumVolume": "0.25 mL",
    "spin": "No",
    "specialInstructions": "Use the directory’s single-assay route only. Accept CSF in the original sterile tube, already frozen by the procedural team following the exact Labcorp protocol. Do not combine collections or aliquot. Ship on dry ice. Concurrent CSF neurotransmitter orders require the separate Labcorp five-tube workflow. No transfer.",
    "specialLabeling": "Label CSF and required sequence",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "neurology",
      "body-fluids"
    ],
    "searchAliases": [],
    "source": "https://www.labcorp.com/tests/631603/pyridoxal-5-phosphate-csf"
  },
  {
    "id": "labcorp-compendium-review-700609",
    "testCode": "700609",
    "testName": "700609 7+Alc-Scr",
    "status": "active",
    "specimenType": "Urine",
    "drawContainer": "Sterile cup",
    "transportContainer": "Sterile cup",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "50 mL urine",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Use the unpreserved random urine clinical route. Refrigerate and submit the original screw-cap cup. No transfer.",
    "specialLabeling": "Label URINE",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "toxicology"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/700609"
  },
  {
    "id": "labcorp-compendium-review-701687",
    "testCode": "701687",
    "testName": "Drug Analysis, Comprehensive (AMP,BZO,COC,THC,OPI,6-AM,OXY,MD,FENT,BUP,TAP,MEP,PPX,TRAM,PCP,AC,MR,ZOLP,DUL,COT), byMass Spectrometry, oral fluid.",
    "status": "active",
    "specimenType": "Saliva",
    "drawContainer": "Quantisal Oral Fluid Collection Device",
    "transportContainer": "Quantisal Oral Fluid Collection Device",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "1 mL oral fluid in the supplied device",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Use this route only when the Labcorp-specified Quantisal device is supplied. Follow the device directions. Submit the original closed device at room temperature for prompt transit. Refrigerate if transport is delayed as specified by the directory. No transfer.",
    "specialLabeling": "Label ORAL FLUID",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "toxicology"
    ],
    "searchAliases": [
      "oral fluid Quantisal"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/701687"
  },
  {
    "id": "labcorp-compendium-review-702638",
    "testCode": "702638",
    "testName": "Drug Analysis, Comprehensive (AMP,BZO,OPI,OXY,FENT,BUP,TRAM,by Mass Spectrometry, oral fluid.",
    "status": "active",
    "specimenType": "Saliva",
    "drawContainer": "Quantisal Oral Fluid Collection Device",
    "transportContainer": "Quantisal Oral Fluid Collection Device",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "1 mL oral fluid in the supplied device",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Use this route only when the Labcorp-specified Quantisal device is supplied. Follow the device directions. Submit the original closed device at room temperature for prompt transit. Refrigerate if transport is delayed as specified by the directory. No transfer.",
    "specialLabeling": "Label ORAL FLUID",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "toxicology"
    ],
    "searchAliases": [
      "oral fluid Quantisal"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/702638"
  },
  {
    "id": "labcorp-compendium-review-739291",
    "testCode": "739291",
    "testName": "Barbiturates Confirm, OF",
    "status": "active",
    "specimenType": "Saliva",
    "drawContainer": "Quantisal Oral Fluid Collection Device",
    "transportContainer": "Quantisal Oral Fluid Collection Device",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "1 mL oral fluid in the supplied device",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Use this route only when the Labcorp-specified Quantisal device is supplied. Follow the device directions. Submit the original closed device at room temperature for prompt transit. Refrigerate if transport is delayed as specified by the directory. No transfer.",
    "specialLabeling": "Label ORAL FLUID",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "toxicology"
    ],
    "searchAliases": [
      "oral fluid Quantisal"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/739291"
  },
  {
    "id": "labcorp-compendium-review-739294",
    "testCode": "739294",
    "testName": "Opiates Confirm, OF",
    "status": "active",
    "specimenType": "Saliva",
    "drawContainer": "Quantisal Oral Fluid Collection Device",
    "transportContainer": "Quantisal Oral Fluid Collection Device",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "1 mL oral fluid in the supplied device",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Use this route only when the Labcorp-specified Quantisal device is supplied. Follow the device directions. Submit the original closed device at room temperature for prompt transit. Refrigerate if transport is delayed as specified by the directory. No transfer.",
    "specialLabeling": "Label ORAL FLUID",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "toxicology"
    ],
    "searchAliases": [
      "oral fluid Quantisal"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/739294"
  },
  {
    "id": "labcorp-compendium-review-739296",
    "testCode": "739296",
    "testName": "Methadone Confirm, OF",
    "status": "active",
    "specimenType": "Saliva",
    "drawContainer": "Quantisal Oral Fluid Collection Device",
    "transportContainer": "Quantisal Oral Fluid Collection Device",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "1 mL oral fluid in the supplied device",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Use this route only when the Labcorp-specified Quantisal device is supplied. Follow the device directions. Submit the original closed device at room temperature for prompt transit. Refrigerate if transport is delayed as specified by the directory. No transfer.",
    "specialLabeling": "Label ORAL FLUID",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "toxicology"
    ],
    "searchAliases": [
      "oral fluid Quantisal"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/739296"
  },
  {
    "id": "labcorp-compendium-review-761490",
    "testCode": "761490",
    "testName": "10+Oxycodone-Scr, Oral Fluid",
    "status": "active",
    "specimenType": "Saliva",
    "drawContainer": "Quantisal Oral Fluid Collection Device",
    "transportContainer": "Quantisal Oral Fluid Collection Device",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "1 mL oral fluid in the supplied device",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Use this route only when the Labcorp-specified Quantisal device is supplied. Follow the device directions. Submit the original closed device at room temperature for prompt transit. Refrigerate if transport is delayed as specified by the directory. No transfer.",
    "specialLabeling": "Label ORAL FLUID",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "toxicology"
    ],
    "searchAliases": [
      "oral fluid Quantisal"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/761490"
  },
  {
    "id": "labcorp-compendium-review-764651",
    "testCode": "764651",
    "testName": "764651 U9-Unbund+Alc+SV3",
    "status": "active",
    "specimenType": "Urine",
    "drawContainer": "Sterile cup",
    "transportContainer": "Sterile cup",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "Random urine specimen",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Use the clinical urine route. Submit unpreserved urine at room temperature. Refrigerate if arrival will exceed seven days. No transfer.",
    "specialLabeling": "Label URINE",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "toxicology"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/764651"
  },
  {
    "id": "labcorp-compendium-review-770005",
    "testCode": "770005",
    "testName": "Substance Abuse Monitoring and Rehabilitation Profile I,Oral Fluid (Screen With Confirmation) (LabCorp MedWatch(R))",
    "status": "active",
    "specimenType": "Saliva",
    "drawContainer": "Quantisal Oral Fluid Collection Device",
    "transportContainer": "Quantisal Oral Fluid Collection Device",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "1 mL oral fluid in the supplied device",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Use this route only when the Labcorp-specified Quantisal device is supplied. Follow the device directions. Submit the original closed device at room temperature for prompt transit. Refrigerate if transport is delayed as specified by the directory. No transfer.",
    "specialLabeling": "Label ORAL FLUID",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "toxicology"
    ],
    "searchAliases": [
      "oral fluid Quantisal"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/770005"
  },
  {
    "id": "labcorp-compendium-review-770031",
    "testCode": "770031",
    "testName": "Drug Oral Fluid 11 Class Profile (LabCorp MedWatch(R))",
    "status": "active",
    "specimenType": "Saliva",
    "drawContainer": "Quantisal Oral Fluid Collection Device",
    "transportContainer": "Quantisal Oral Fluid Collection Device",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "1 mL oral fluid in the supplied device",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Use this route only when the Labcorp-specified Quantisal device is supplied. Follow the device directions. Submit the original closed device at room temperature for prompt transit. Refrigerate if transport is delayed as specified by the directory. No transfer.",
    "specialLabeling": "Label ORAL FLUID",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "toxicology"
    ],
    "searchAliases": [
      "oral fluid Quantisal"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/770031"
  },
  {
    "id": "labcorp-compendium-review-770140",
    "testCode": "770140",
    "testName": "Buprenorphine, Oral Fluid",
    "status": "active",
    "specimenType": "Saliva",
    "drawContainer": "Quantisal Oral Fluid Collection Device",
    "transportContainer": "Quantisal Oral Fluid Collection Device",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "1 mL oral fluid in the supplied device",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Use this route only when the Labcorp-specified Quantisal device is supplied. Follow the device directions. Submit the original closed device at room temperature for prompt transit. Refrigerate if transport is delayed as specified by the directory. No transfer.",
    "specialLabeling": "Label ORAL FLUID",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "toxicology"
    ],
    "searchAliases": [
      "oral fluid Quantisal"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/770140"
  },
  {
    "id": "labcorp-compendium-review-770162",
    "testCode": "770162",
    "testName": "Ethanol (GCHS FID), Oral Fluid",
    "status": "active",
    "specimenType": "Saliva",
    "drawContainer": "Quantisal Oral Fluid Collection Device",
    "transportContainer": "Quantisal Oral Fluid Collection Device",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "1 mL oral fluid in the supplied device",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Use this route only when the Labcorp-specified Quantisal device is supplied. Follow the device directions. Submit the original closed device at room temperature for prompt transit. Refrigerate if transport is delayed as specified by the directory. No transfer.",
    "specialLabeling": "Label ORAL FLUID",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "toxicology"
    ],
    "searchAliases": [
      "oral fluid Quantisal"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/770162"
  },
  {
    "id": "labcorp-compendium-review-770169",
    "testCode": "770169",
    "testName": "Tramadol Conf, Oral Fluid",
    "status": "active",
    "specimenType": "Saliva",
    "drawContainer": "Quantisal Oral Fluid Collection Device",
    "transportContainer": "Quantisal Oral Fluid Collection Device",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "1 mL oral fluid in the supplied device",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Use this route only when the Labcorp-specified Quantisal device is supplied. Follow the device directions. Submit the original closed device at room temperature for prompt transit. Refrigerate if transport is delayed as specified by the directory. No transfer.",
    "specialLabeling": "Label ORAL FLUID",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "toxicology"
    ],
    "searchAliases": [
      "oral fluid Quantisal"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/770169"
  },
  {
    "id": "labcorp-compendium-review-770176",
    "testCode": "770176",
    "testName": "Fentanyl Conf, Oral Fluid",
    "status": "active",
    "specimenType": "Saliva",
    "drawContainer": "Quantisal Oral Fluid Collection Device",
    "transportContainer": "Quantisal Oral Fluid Collection Device",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "1 mL oral fluid in the supplied device",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Use this route only when the Labcorp-specified Quantisal device is supplied. Follow the device directions. Submit the original closed device at room temperature for prompt transit. Refrigerate if transport is delayed as specified by the directory. No transfer.",
    "specialLabeling": "Label ORAL FLUID",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "toxicology"
    ],
    "searchAliases": [
      "oral fluid Quantisal"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/770176"
  },
  {
    "id": "labcorp-compendium-review-770188",
    "testCode": "770188",
    "testName": "Drug Abuse Profile, Oral Fluid (12 Drug Classes) (Labcorp MedWatch®)",
    "status": "active",
    "specimenType": "Saliva",
    "drawContainer": "Quantisal Oral Fluid Collection Device",
    "transportContainer": "Quantisal Oral Fluid Collection Device",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "1 mL oral fluid in the supplied device",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Use this route only when the Labcorp-specified Quantisal device is supplied. Follow the device directions. Submit the original closed device at room temperature for prompt transit. Refrigerate if transport is delayed as specified by the directory. No transfer.",
    "specialLabeling": "Label ORAL FLUID",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "toxicology"
    ],
    "searchAliases": [
      "oral fluid Quantisal"
    ],
    "source": "https://www.labcorp.com/tests/770188/drug-abuse-profile-oral-fluid-12-drug-classes-labcorp-medwatch"
  },
  {
    "id": "labcorp-compendium-review-770411",
    "testCode": "770411",
    "testName": "Cotinine Screen, Oral Fluid",
    "status": "active",
    "specimenType": "Saliva",
    "drawContainer": "Quantisal Oral Fluid Collection Device",
    "transportContainer": "Quantisal Oral Fluid Collection Device",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "1 mL oral fluid in the supplied device",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Use this route only when the Labcorp-specified Quantisal device is supplied. Follow the device directions. Submit the original closed device at room temperature for prompt transit. Refrigerate if transport is delayed as specified by the directory. No transfer.",
    "specialLabeling": "Label ORAL FLUID",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "toxicology"
    ],
    "searchAliases": [
      "oral fluid Quantisal"
    ],
    "source": "https://www.labcorp.com/tests/770411/cotinine-screen-oral-fluid"
  },
  {
    "id": "labcorp-compendium-review-770421",
    "testCode": "770421",
    "testName": "Substance Abuse Monitoring and Rehabilitation Profile II,Oral Fluid (Screen Only) (LabCorp MedWatch(R))",
    "status": "active",
    "specimenType": "Saliva",
    "drawContainer": "Quantisal Oral Fluid Collection Device",
    "transportContainer": "Quantisal Oral Fluid Collection Device",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "1 mL oral fluid in the supplied device",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Use this route only when the Labcorp-specified Quantisal device is supplied. Follow the device directions. Submit the original closed device at room temperature for prompt transit. Refrigerate if transport is delayed as specified by the directory. No transfer.",
    "specialLabeling": "Label ORAL FLUID",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "toxicology"
    ],
    "searchAliases": [
      "oral fluid Quantisal"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/770421"
  },
  {
    "id": "labcorp-compendium-review-780400",
    "testCode": "780400",
    "testName": "Oral Fluid Drug Analysis",
    "status": "active",
    "specimenType": "Saliva",
    "drawContainer": "Quantisal Oral Fluid Collection Device",
    "transportContainer": "Quantisal Oral Fluid Collection Device",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "1 mL oral fluid in the supplied device",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Use this route only when the Labcorp-specified Quantisal device is supplied. Follow the device directions. Submit the original closed device at room temperature for prompt transit. Refrigerate if transport is delayed as specified by the directory. No transfer.",
    "specialLabeling": "Label ORAL FLUID",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "toxicology"
    ],
    "searchAliases": [
      "oral fluid Quantisal"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/780400"
  },
  {
    "id": "labcorp-compendium-review-815949",
    "testCode": "815949",
    "testName": "Adenovirus DNA, Quantitative PCR, Tracheal Aspirate",
    "status": "active",
    "specimenType": "Tracheal Aspirate",
    "drawContainer": "Sterile Screw-Cap Specimen Tube",
    "transportContainer": "Sterile Screw-Cap Specimen Tube",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "preferredVolume": "2 mL specimen",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Accept the original sterile leakproof screw-cap specimen tube from the collecting provider. Freeze and ship frozen. Identify the specimen type on the container. No transfer.",
    "specialLabeling": "Label TRACHEAL ASPIRATE",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "respiratory",
      "infectious"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/815949"
  },
  {
    "id": "labcorp-compendium-review-818779",
    "testCode": "818779",
    "testName": "HSV-1 and HSV-2 DNA, Quantitative PCR, Bronchoalveolar Lavage",
    "status": "active",
    "specimenType": "Bronchoalveolar Lavage",
    "drawContainer": "Sterile Screw-Cap Specimen Tube",
    "transportContainer": "Sterile Screw-Cap Specimen Tube",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "preferredVolume": "2 mL specimen",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Accept the original sterile leakproof screw-cap specimen tube from the collecting provider. Freeze and ship frozen. Identify the specimen type on the container. No transfer.",
    "specialLabeling": "Label BRONCHOALVEOLAR LAVAGE",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "respiratory",
      "infectious"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/818779"
  },
  {
    "id": "labcorp-compendium-review-819325",
    "testCode": "819325",
    "testName": "HHV-6 DNA, Quantitative PCR, Bronchoalveolar Lavage",
    "status": "active",
    "specimenType": "Bronchoalveolar Lavage",
    "drawContainer": "Sterile Screw-Cap Specimen Tube",
    "transportContainer": "Sterile Screw-Cap Specimen Tube",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "preferredVolume": "2 mL specimen",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Accept the original sterile leakproof screw-cap specimen tube from the collecting provider. Freeze and ship frozen. Identify the specimen type on the container. No transfer.",
    "specialLabeling": "Label BRONCHOALVEOLAR LAVAGE",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "respiratory",
      "infectious"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/819325"
  },
  {
    "id": "labcorp-compendium-review-828858",
    "testCode": "828858",
    "testName": "Partial Acid Stain",
    "status": "active",
    "specimenType": "Body Fluid",
    "drawContainer": "Sterile cup",
    "transportContainer": "Sterile cup",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "Provider-collected fluid specimen",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Submit provider-collected fluid or aspirate in the original sterile leakproof cup at room temperature. Specify the anatomical source. Labcorp prepares any required stain. No transfer.",
    "specialLabeling": "Label BODY FLUID and exact anatomical source",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "microbiology",
      "body-fluids"
    ],
    "searchAliases": [],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/828858"
  },
  {
    "id": "labcorp-compendium-review-911186",
    "testCode": "911186",
    "testName": "Levetiracetam (Keppra), Serum",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "Red Top",
    "transportContainer": "Transport Tube",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "2 mL serum",
    "minimumVolume": "0.8 mL",
    "spin": "Yes",
    "specialInstructions": "Use a plain red-top tube without gel. Separate serum and transfer to a plastic screw-cap tube. Keep at room temperature. Record dose and collection timing as applicable.",
    "specialLabeling": "Label SERUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "tdm"
    ],
    "searchAliases": [
      "Keppra level"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/911186"
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
  "334943": [
    "Within 1 day",
    1,
    "Labcorp CDOS compendium",
    "",
    "https://cdos.halfpenny.com/labcorp/TestDisplay/334943"
  ],
  "345445": [
    "Within 1 day",
    1,
    "Labcorp CDOS compendium",
    "",
    "https://cdos.halfpenny.com/labcorp/TestDisplay/345445"
  ],
  "072717": [
    "2–4 days",
    4,
    "Labcorp CDOS compendium",
    "",
    "https://cdos.halfpenny.com/labcorp/TestDisplay/072717"
  ],
  "241902": [
    "3–5 days",
    5,
    "Labcorp CDOS compendium",
    "",
    "https://cdos.halfpenny.com/labcorp/TestDisplay/241902"
  ],
  "701687": [
    "6–8 days",
    8,
    "Labcorp CDOS compendium",
    "",
    "https://cdos.halfpenny.com/labcorp/TestDisplay/701687"
  ],
  "770188": [
    "4–6 days",
    6,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/770188/drug-abuse-profile-oral-fluid-12-drug-classes-labcorp-medwatch"
  ],
  "770411": [
    "3–5 days",
    5,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/770411/cotinine-screen-oral-fluid"
  ],
  "009035": [
    "2–6 days",
    6,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/009035/bronchial-washings-cytology"
  ],
  "009076": [
    "Within 1 day",
    1,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/009076/sputum-cytology-series"
  ],
  "052052": [
    "11–16 days",
    16,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/052052/chromosome-analysis-tissue-biopsies-products-of-conception-skin"
  ],
  "052065": [
    "13–24 days",
    24,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/052065/chromosome-analysis-products-of-conception-poc-with-reflex-to-snp-microarray-reveal"
  ],
  "510110": [
    "12–18 days",
    18,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/510110/snp-microarray-products-of-conception-poc-tissue-reveal"
  ],
  "512085": [
    "14 days",
    14,
    "Labcorp CDOS compendium",
    "",
    "https://cdos.halfpenny.com/labcorp/TestDisplay/512085"
  ],
  "512200": [
    "10–15 days",
    15,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/512200/products-of-conception-poc-profile"
  ],
  "500918": [
    "3–4 days",
    4,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/500918/histopathology"
  ],
  "511485": [
    "7–10 days",
    10,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/511485/chromosome-analysis-lymph-node"
  ],
  "511880": [
    "7–10 days",
    10,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/511880/products-of-conception-poc-paraffin-embedded-aneuploid-evaluation"
  ],
  "510963": [
    "7–10 days",
    10,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/510963/products-of-conception-poc-aneuploid-evaluation-fish-genetics"
  ],
  "510995": [
    "10–14 days",
    14,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/510995/chromosome-analysis-solid-tumor-onc"
  ],
  "364668": [
    "4–6 days",
    6,
    "Labcorp CDOS compendium",
    "",
    "https://cdos.halfpenny.com/labcorp/TestDisplay/364668"
  ],
  "510960": [
    "2–3 days",
    3,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/510960/prenatal-aneuploid-evaluation-chorionic-villus-sampling-fish"
  ],
  "510988": [
    "6–10 days",
    10,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/510988/chromosome-analysis-chorionic-villi-biopsy"
  ],
  "511020": [
    "9–12 days",
    12,
    "Labcorp CDOS compendium",
    "",
    "https://cdos.halfpenny.com/labcorp/TestDisplay/511020"
  ],
  "511033": [
    "9–12 days",
    12,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/511033/chromosome-analysis-chorionic-villi-biopsy-with-reflex-to-snp-microarray-reveal"
  ],
  "511555": [
    "10–21 days",
    21,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/511555/reveal-snp-microarray-and-abbreviated-chromosome-analysis-cvs-whe"
  ],
  "511625": [
    "10–13 days",
    13,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/511625/fluorescence-in-situ-hybridization-fish-prenatal-aneuploid-evaluation-chorionic-villus-sampling-with-reflex-to-microarray-or-chromosome-analysis"
  ],
  "510770": [
    "4–7 days",
    7,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/510770/microdeletion-syndromes-fish"
  ],
  "009876": [
    "Within 1 day",
    1,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/009876/ductal-lavage-cytology"
  ],
  "631559": [
    "10–14 days",
    14,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/631559/5-methyltetrahydrofolate-csf"
  ],
  "631580": [
    "10–14 days",
    14,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/631580/neurotransmitter-metabolites-5hiaa-hva-3omd-csf"
  ],
  "631603": [
    "10–14 days",
    14,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/631603/pyridoxal-5-phosphate-csf"
  ],
  "631589": [
    "10–14 days",
    14,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/631589/3-o-methyldopa-plasma"
  ],
  "818779": [
    "4–7 days",
    7,
    "Labcorp CDOS compendium",
    "",
    "https://cdos.halfpenny.com/labcorp/TestDisplay/818779"
  ],
  "819325": [
    "2–6 days",
    6,
    "Labcorp CDOS compendium",
    "",
    "https://cdos.halfpenny.com/labcorp/TestDisplay/819325"
  ],
  "828858": [
    "3–5 days",
    5,
    "Labcorp CDOS compendium",
    "",
    "https://cdos.halfpenny.com/labcorp/TestDisplay/828858"
  ],
  "248699": [
    "2–5 days",
    5,
    "Labcorp CDOS compendium",
    "",
    "https://cdos.halfpenny.com/labcorp/TestDisplay/248699"
  ],
  "144027": [
    "1–4 days",
    4,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/144027/sexually-transmitted-infections-sti-profile-with-ct-ng-tv-naa"
  ],
  "180901": [
    "1–2 days",
    2,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/180901/wet-prep"
  ],
  "180919": [
    "2–8 days",
    8,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/180919/wet-prep-with-reflex-to-trichomonas-culture"
  ],
  "510999": [
    "7–10 days",
    10,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/510999/chromosome-analysis-leukemia-lymphoma"
  ],
  "511040": [
    "7–10 days",
    10,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/511040/chromosome-analysis-leukemia-lymphoma-with-reflex-to-chromosome-microarray-cma"
  ],
  "369954": [
    "1–4 days",
    4,
    "Labcorp CDOS compendium",
    "",
    "https://cdos.halfpenny.com/labcorp/TestDisplay/369954"
  ],
  "255031": [
    "4–6 days",
    6,
    "Labcorp CDOS compendium",
    "",
    "https://cdos.halfpenny.com/labcorp/TestDisplay/255031"
  ],
  "255033": [
    "4–6 days",
    6,
    "Labcorp CDOS compendium",
    "",
    "https://cdos.halfpenny.com/labcorp/TestDisplay/255033"
  ]
};
  const existing = window.LabDirectoryTat || {};
  window.LabDirectoryTat = Object.freeze({
    ...existing,
    directory: Object.freeze({ ...turnaround, ...existing.directory })
  });
})();
