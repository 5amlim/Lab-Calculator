// Source-reviewed Labcorp orders with usable collection and submission routes.
(() => {
  'use strict';

  const additions = [
  {
    "id": "labcorp-compendium-review-080972",
    "testCode": "080972",
    "testName": "Mercury, Tissue",
    "status": "active",
    "specimenType": "Tissue",
    "drawContainer": "Trace Metal-Free Plastic Container",
    "transportContainer": "Trace Metal-Free Plastic Container",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "10 g tissue",
    "minimumVolume": "10 g",
    "spin": "No",
    "specialInstructions": "Use the trace-metal-free plastic container for a provider-collected tissue specimen. Keep the original container refrigerated. Record the tissue source. No transfer.",
    "specialLabeling": "Label TISSUE and source",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "heavy-metals"
    ],
    "searchAliases": [
      "tissue mercury level"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/080972"
  },
  {
    "id": "labcorp-compendium-review-088757",
    "testCode": "088757",
    "testName": "HemoQuant, Fecal Hemoglobin",
    "status": "active",
    "specimenType": "Stool",
    "drawContainer": "Mayo HemoQuant Stool Collection Kit (T134)",
    "transportContainer": "Mayo HemoQuant Stool Collection Kit (T134)",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "1 g stool",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Use the receiving laboratory’s Mayo HemoQuant T134 kit and screw-cap vial. Collect from one bowel movement and send refrigerated. Refer to the ordering clinician for preparation requirements. No transfer.",
    "specialLabeling": "Label STOOL; HEMOQUANT",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "gi",
      "chemistry"
    ],
    "searchAliases": [
      "fecal hemoglobin quantitative"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/088757"
  },
  {
    "id": "labcorp-compendium-review-120857",
    "testCode": "120857",
    "testName": "Fetal Fibronectin",
    "status": "active",
    "specimenType": "Cervicovaginal Swab",
    "drawContainer": "Fetal Fibronectin Special Collection Kit",
    "transportContainer": "Fetal Fibronectin Special Collection Kit",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "preferredVolume": "One swab in its FFN buffer tube",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Confirm the receiving location offers 24/7 testing and can receive the sample promptly, ideally within four hours. Use the original ADEZA swab and buffer kit. Freeze after collection and ship frozen. No transfer.",
    "specialLabeling": "Label CERVICOVAGINAL SWAB; FETAL FIBRONECTIN",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "pregnancy"
    ],
    "searchAliases": [
      "fFN",
      "ADEZA"
    ],
    "source": "https://www.labcorp.com/tests/120857/fetal-fibronectin"
  },
  {
    "id": "labcorp-compendium-review-180224",
    "testCode": "180224",
    "testName": "Bordetella pertussis Culture, Nasopharyngeal Swab",
    "status": "active",
    "specimenType": "Nasopharyngeal Swab",
    "drawContainer": "Labcorp Bordetella Charcoal Transport Kit",
    "transportContainer": "Labcorp Bordetella Charcoal Transport Kit",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "One flexible nasopharyngeal swab",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Obtain Labcorp’s charcoal-containing Bordetella device before collection. Place the flexible nasopharyngeal swab into the supplied medium, close and ship refrigerated. Follow Labcorp instructions on optional preincubation if supported. No transfer.",
    "specialLabeling": "Label NASOPHARYNGEAL SWAB",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "infectious",
      "respiratory",
      "microbiology"
    ],
    "searchAliases": [
      "whooping cough culture"
    ],
    "source": "https://www.labcorp.com/tests/180224/bordetella-pertussis-nasopharyngeal-culture"
  },
  {
    "id": "labcorp-compendium-review-180851",
    "testCode": "180851",
    "testName": "Ova and Parasites Examination, Formalin Only",
    "status": "active",
    "specimenType": "Stool",
    "drawContainer": "Sterile cup",
    "transportContainer": "Para-Pak Pink Formalin Vial",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "5 mL stool",
    "minimumVolume": "3 mL",
    "spin": "No",
    "specialInstructions": "Use the Labcorp formalin-only stool route. Collect stool in a sterile cup and transfer to the supplied pink Para-Pak formalin vial to its fill line. Ship the closed vial at room temperature.",
    "specialLabeling": "Label STOOL; FORMALIN ONLY",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "parasitology",
      "gi",
      "microbiology"
    ],
    "searchAliases": [
      "O&P formalin",
      "stool parasites"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/180851",
    "alternateSource": "https://www.labcorp.com/test-menu/resources/parasitology"
  },
  {
    "id": "labcorp-compendium-review-183111",
    "testCode": "183111",
    "testName": "Anaerobic and Aerobic Culture With Gram Stain, Deep Swab",
    "status": "active",
    "specimenType": "Deep Wound Swab",
    "drawContainer": "ESwab (Amies)",
    "transportContainer": "ESwab (Amies)",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "Two swabs",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Use the Labcorp-supported ESwab route for an appropriate deep site. Collect two swabs and identify the one for culture and the one for lab-prepared Gram stain. Deliver promptly at room temperature within 48 hours. No transfer.",
    "specialLabeling": "Label SPECIFIC SITE, and record collection time on requisition",
    "collectionCount": 2,
    "submissionCount": 2,
    "clinicalCategories": [
      "microbiology"
    ],
    "searchAliases": [],
    "source": "https://www.labcorp.com/tests/183111/anaerobic-and-aerobic-culture-and-gram-stain"
  },
  {
    "id": "labcorp-compendium-review-236944",
    "testCode": "236944",
    "testName": "Creatinine and Porphobilinogen, Random Urine",
    "status": "active",
    "specimenType": "Random Urine",
    "drawContainer": "Sterile cup",
    "transportContainer": "Sterile cup",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "13 mL total urine before splitting",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Collect one unpreserved random urine. Mix and split, using the original cup for creatinine at room temperature. Send the PBG aliquot separately, frozen and light protected. Do not use this unpreserved workflow when delta-ALA is also ordered.",
    "specialLabeling": "Label RANDOM URINE; CREATININE",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "urinary",
      "renal",
      "chemistry"
    ],
    "searchAliases": [
      "urine PBG and creatinine"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/236944",
    "additionalDrawRequirements": [
      {
        "purpose": "Porphobilinogen",
        "specimenType": "Random Urine",
        "transportContainer": "Amber Plastic Frozen Transport Tube (78656)",
        "transportTemperature": "Frozen",
        "transportTemperatureRaw": "Frozen",
        "preferredVolume": "3 mL PBG aliquot",
        "minimumVolume": "",
        "spin": "No",
        "specialInstructions": "Transfer to the amber Labcorp tube. Freeze immediately; protect from light.",
        "specialLabeling": "Label RANDOM URINE; PBG; PROTECT FROM LIGHT",
        "submissionCount": 1,
        "container": "Sterile cup",
        "count": 1,
        "transportOnly": true
      }
    ]
  },
  {
    "id": "labcorp-compendium-review-252867",
    "testCode": "252867",
    "testName": "Beta-Thalassemia (HBB), Prenatal Full Gene Sequencing",
    "status": "active",
    "specimenType": "Amniotic Fluid",
    "drawContainer": "Sterile cup",
    "transportContainer": "Sterile cup",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "10–15 mL amniotic fluid",
    "minimumVolume": "10 mL",
    "spin": "No",
    "specialInstructions": "Use the amniotic fluid route only for a provider-collected specimen. Coordinate with the Labcorp prenatal genetics team before collection. Submit the original sterile plastic screw-cap container. Parental EDTA blood samples require separate labeled orders as directed by Labcorp. No transfer.",
    "specialLabeling": "Label AMNIOTIC FLUID; fetal specimen",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "pregnancy",
      "genetics",
      "hematology"
    ],
    "searchAliases": [
      "HBB prenatal",
      "beta thalassemia prenatal"
    ],
    "source": "https://www.labcorp.com/tests/252867/b-thalassemia-hbb-prenatal-test-full-gene-sequencing"
  },
  {
    "id": "labcorp-compendium-review-252870",
    "testCode": "252870",
    "testName": "Beta-Thalassemia (HBB), Prenatal Known Variant",
    "status": "active",
    "specimenType": "Amniotic Fluid",
    "drawContainer": "Sterile cup",
    "transportContainer": "Sterile cup",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "15 mL amniotic fluid",
    "minimumVolume": "10 mL",
    "spin": "No",
    "specialInstructions": "Use the amniotic fluid route only for a provider-collected specimen. Coordinate with the Labcorp prenatal genetics team before collection. Submit the original sterile plastic screw-cap container. Parental EDTA blood samples require separate labeled orders as directed by Labcorp. No transfer.",
    "specialLabeling": "Label AMNIOTIC FLUID; fetal specimen",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "pregnancy",
      "genetics",
      "hematology"
    ],
    "searchAliases": [
      "HBB prenatal",
      "beta thalassemia prenatal"
    ],
    "source": "https://www.labcorp.com/tests/252870/b-thalassemia-hbb-prenatal-test-known-mutation"
  },
  {
    "id": "labcorp-compendium-review-282173",
    "testCode": "282173",
    "testName": "Creatinine and Porphobilinogen, 24-Hour Urine",
    "status": "active",
    "specimenType": "24-Hour Urine",
    "drawContainer": "24-Hour Urine Container",
    "transportContainer": "Amber Plastic Frozen Transport Tube (78656)",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "preferredVolume": "3 mL PBG aliquot",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Keep one unpreserved 24-hour collection refrigerated and shielded from light. Mix and record total volume and collection start and end. Freeze the separate amber PBG aliquot immediately and send the other labeled aliquots in their own bags.",
    "specialLabeling": "Label 24-HOUR URINE and record total volume and collection start and end times",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "urinary",
      "renal",
      "chemistry"
    ],
    "searchAliases": [
      "urine PBG and creatinine"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/282173",
    "additionalDrawRequirements": [
      {
        "purpose": "Creatinine",
        "specimenType": "24-Hour Urine",
        "transportContainer": "Sterile cup",
        "transportTemperature": "Room Temperature",
        "transportTemperatureRaw": "Room Temperature",
        "preferredVolume": "1 mL from same collection",
        "minimumVolume": "",
        "spin": "No",
        "specialInstructions": "Submit the unpreserved creatinine aliquot at room temperature.",
        "specialLabeling": "Label 24-HOUR URINE; CREATININE",
        "submissionCount": 1,
        "container": "24-Hour Urine Container",
        "count": 1,
        "transportOnly": true
      }
    ]
  },
  {
    "id": "labcorp-compendium-review-342708",
    "testCode": "342708",
    "testName": "Creatinine, Porphobilinogen and Porphyrins, 24-Hour Urine",
    "status": "active",
    "specimenType": "24-Hour Urine",
    "drawContainer": "24-Hour Urine Container",
    "transportContainer": "Amber Plastic Frozen Transport Tube (78656)",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "preferredVolume": "1 mL PBG aliquot",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Keep one unpreserved 24-hour collection refrigerated and shielded from light. Mix and record total volume and collection start and end. Freeze the separate amber PBG aliquot immediately and send the other labeled aliquots in their own bags.",
    "specialLabeling": "Label 24-HOUR URINE and record total volume and collection start and end times",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "urinary",
      "renal",
      "chemistry"
    ],
    "searchAliases": [
      "urine PBG and creatinine"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/342708",
    "additionalDrawRequirements": [
      {
        "purpose": "Creatinine",
        "specimenType": "24-Hour Urine",
        "transportContainer": "Sterile cup",
        "transportTemperature": "Room Temperature",
        "transportTemperatureRaw": "Room Temperature",
        "preferredVolume": "1 mL from same collection",
        "minimumVolume": "",
        "spin": "No",
        "specialInstructions": "Submit the unpreserved creatinine aliquot at room temperature.",
        "specialLabeling": "Label 24-HOUR URINE; CREATININE",
        "submissionCount": 1,
        "container": "24-Hour Urine Container",
        "count": 1,
        "transportOnly": true
      },
      {
        "purpose": "Quantitative porphyrins",
        "specimenType": "24-Hour Urine",
        "transportContainer": "12-mL Amber Plastic Transport Tube",
        "transportTemperature": "Refrigerated",
        "transportTemperatureRaw": "Refrigerated",
        "preferredVolume": "30 mL from same collection; divide among three vials",
        "minimumVolume": "",
        "spin": "No",
        "specialInstructions": "Submit separate unpreserved amber aliquots. Refrigerate and protect from light.",
        "specialLabeling": "Label 24-HOUR URINE; PORPHYRINS",
        "submissionCount": 3,
        "container": "24-Hour Urine Container",
        "count": 1,
        "transportOnly": true
      }
    ]
  },
  {
    "id": "labcorp-compendium-review-511444",
    "testCode": "511444",
    "testName": "MPN With Eosinophilia FISH Profile, Peripheral Blood",
    "status": "active",
    "specimenType": "Whole Blood",
    "drawContainer": "Green Sodium Heparin",
    "transportContainer": "Green Sodium Heparin",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "10 mL adult whole blood",
    "minimumVolume": "5 mL adult whole blood",
    "spin": "No",
    "specialInstructions": "Use the adult peripheral blood route. Choose the sodium-heparin tube size appropriate for the draw volume and submit the capped original tubes at room temperature. Arrange receipt within 48 hours. No transfer.",
    "specialLabeling": "Label SODIUM HEPARIN WHOLE BLOOD; record collection date",
    "collectionCount": 2,
    "submissionCount": 2,
    "clinicalCategories": [
      "genetics",
      "hematology",
      "oncology"
    ],
    "searchAliases": [
      "hypereosinophilic syndrome FISH",
      "FGFR1 PDGFRA PDGFRB FISH"
    ],
    "source": "https://www.labcorp.com/tests/511444/mpn-with-eosinophilia-fish-profile-onc"
  },
  {
    "id": "labcorp-compendium-review-738576",
    "testCode": "738576",
    "testName": "Barbiturate Confirmation, Meconium",
    "status": "active",
    "specimenType": "Meconium",
    "drawContainer": "Sterile cup",
    "transportContainer": "Sterile cup",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "2 g meconium",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Use a clean leakproof polypropylene sterile cup. Submit the original closed cup refrigerated with no preservative. Meconium from multiple collections can be combined only for the same infant under the same order. No transfer.",
    "specialLabeling": "Label MECONIUM",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "toxicology"
    ],
    "searchAliases": [
      "meconium barbiturate"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/738576",
    "alternateSource": "https://medtox.labcorp.com/program-services/meconium-drug-testing"
  },
  {
    "id": "labcorp-compendium-review-790540",
    "testCode": "790540",
    "testName": "Manganese, Packed Red Blood Cells and Plasma",
    "status": "active",
    "specimenType": "Plasma",
    "drawContainer": "Royal Blue EDTA (purple stripe)",
    "transportContainer": "Trace Metal-Free Plasma Transport Tube",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "3 mL EDTA plasma",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate plasma and packed red blood cells from the shared trace-metal-free draw. Submit each fraction in its own certified metal-free screw-cap vial. Arrange Labcorp receipt within five days.",
    "specialLabeling": "Label EDTA PLASMA; MANGANESE",
    "collectionCount": 2,
    "submissionCount": 1,
    "clinicalCategories": [
      "heavy-metals"
    ],
    "searchAliases": [
      "manganese rbc plasma",
      "Mn rbc"
    ],
    "source": "https://www.labcorp.com/tests/790540/manganese-rbc-and-plasma",
    "additionalDrawRequirements": [
      {
        "purpose": "Packed red blood cells",
        "specimenType": "RBCs",
        "transportContainer": "Trace Metal-Free Red Blood Cell Transport Tube",
        "transportTemperature": "Room Temperature",
        "transportTemperatureRaw": "Room Temperature",
        "preferredVolume": "3 mL packed red blood cells",
        "minimumVolume": "",
        "spin": "Yes",
        "specialInstructions": "Use the packed red cells from the same separated trace-metal-free blood draw. Ship in a separate certified metal-free screw-cap vial at room temperature.",
        "specialLabeling": "Label PACKED RED BLOOD CELLS; MANGANESE",
        "submissionCount": 1,
        "container": "Royal Blue EDTA (purple stripe)",
        "count": 1,
        "transportOnly": true
      }
    ]
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
  "120857": [
    "Within 1 day",
    1,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/120857/fetal-fibronectin"
  ],
  "511444": [
    "4–7 days",
    7,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/511444/mpn-with-eosinophilia-fish-profile-onc"
  ],
  "183111": [
    "4–7 days",
    7,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/183111/anaerobic-and-aerobic-culture-and-gram-stain"
  ],
  "180224": [
    "14–16 days",
    16,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/180224/bordetella-pertussis-nasopharyngeal-culture"
  ],
  "790540": [
    "5–9 days",
    9,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/790540/manganese-rbc-and-plasma"
  ],
  "252867": [
    "12–14 days",
    14,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/252867/b-thalassemia-hbb-prenatal-test-full-gene-sequencing"
  ],
  "252870": [
    "12–14 days",
    14,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/252870/b-thalassemia-hbb-prenatal-test-known-mutation"
  ]
};
  const existing = window.LabDirectoryTat || {};
  window.LabDirectoryTat = Object.freeze({
    ...existing,
    directory: Object.freeze({ ...turnaround, ...existing.directory })
  });
})();
