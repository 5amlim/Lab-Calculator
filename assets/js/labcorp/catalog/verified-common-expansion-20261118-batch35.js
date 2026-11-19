/* Official order-code specimen review. Preserve existing active and blocked records. Timed collections use existing additionalDrawRequirements; no new grouping rules. */
(()=>{'use strict';if(!Array.isArray(window.SEED_TESTS))return;
const additions=[
  {
    "id": "labcorp-verified-20261118-batch35-401423",
    "testCode": "401423",
    "testName": "PrEP Use Only: Lipid Panel",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "alternativeContainer": "",
    "transportContainer": "SST / Gold (spun)",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "0.7 mL serum",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "Yes",
    "stability": "Room 3 days; refrigerated/frozen 14 days; freeze/thaw x2",
    "specialLabeling": "",
    "specialInstructions": "Allow blood to clot and centrifuge within 45 minutes of collection. Submit original spun SST at room temperature. Do not use oxalate, EDTA or citrate plasma. Use for clinician-ordered PrEP monitoring only. Fasting not routinely necessary; 12–14 hours preferred (8 acceptable) only when fasting triglyceride information is needed per clinician.",
    "fastingStatus": "",
    "fastingInstructions": "",
    "source": "Labcorp official order-code directory, reviewed 2026-11-18 • https://www.labcorp.com/tests/401423/prep-use-only-lipid-panel",
    "clinicalCategories": [
      "cardiac",
      "lipids",
      "sti"
    ],
    "searchAliases": [
      "PrEP lipid panel",
      "PrEP cholesterol"
    ]
  },
  {
    "id": "labcorp-verified-20261118-batch35-104000",
    "testCode": "104000",
    "testName": "Cortisol, AM & PM",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "alternativeContainer": "",
    "transportContainer": "SST / Gold (spun)",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "0.7 mL serum",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "Yes",
    "stability": "14 days room, refrigerated or frozen",
    "specialLabeling": "Timed specimen 1: AM; exact collection date/time",
    "specialInstructions": "Collect AM specimen at the physician-directed time in a separate SST; spin and submit original tube. A second PM specimen is required, on the same requisition. Do not share or combine timepoints. Label patient identifiers, collection date and time on both tubes and document both in clinical information. Ask about high-dose biotin; Labcorp recommends withholding it for 72 hours before collection, with clinician guidance.",
    "fastingStatus": "",
    "fastingInstructions": "",
    "source": "Labcorp official order-code directory, reviewed 2026-11-18 • https://www.labcorp.com/tests/104000/cortisol-am-amp-pm",
    "clinicalCategories": [
      "endocrinology"
    ],
    "searchAliases": [
      "AM PM cortisol",
      "cortisol morning evening",
      "diurnal cortisol"
    ],
    "additionalDrawRequirements": [
      {
        "container": "SST / Gold",
        "specimenType": "Serum",
        "transportContainer": "SST / Gold (spun)",
        "preferredVolume": "1 mL serum",
        "minimumVolume": "0.7 mL serum",
        "transportTemperature": "Room Temperature",
        "transportTemperatureRaw": "Room Temperature",
        "spin": "Yes",
        "count": 1,
        "submissionCount": 1,
        "purpose": "PM cortisol",
        "specialLabeling": "Timed specimen 2: PM; exact collection date/time",
        "specialInstructions": "At the physician-directed PM time, collect the second specimen in its own SST, allow clotting, centrifuge and submit original spun SST. Keep AM and PM specimens separate. Record date/time on tube and requisition."
      }
    ]
  },
  {
    "id": "labcorp-verified-20261118-batch35-373634",
    "testCode": "373634",
    "testName": "Lipid Profile, Nonfasting, Pediatric",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "alternativeContainer": "",
    "transportContainer": "SST / Gold (spun)",
    "preferredVolume": "2 mL serum",
    "minimumVolume": "0.7 mL serum",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "Yes",
    "stability": "7 days room temperature, refrigerated or frozen",
    "specialLabeling": "",
    "specialInstructions": "Allow blood to clot and centrifuge within 45 minutes of collection. Submit original spun SST at room temperature. Do not use oxalate, EDTA or citrate plasma. Nonfasting. Confirm safe age-appropriate collection volume.",
    "fastingStatus": "",
    "fastingInstructions": "",
    "source": "Labcorp official order-code directory, reviewed 2026-11-18 • https://www.labcorp.com/tests/373634/lipid-profile-nonfasting-pediatric",
    "clinicalCategories": [
      "cardiac",
      "lipids"
    ],
    "searchAliases": [
      "pediatric nonfasting lipids",
      "pediatric cholesterol HDL"
    ]
  },
  {
    "id": "labcorp-verified-20261118-batch35-144510",
    "testCode": "144510",
    "testName": "Hepatitis B Virus (HBV) Prenatal Screen, HBsAg",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "alternativeContainer": "",
    "transportContainer": "SST / Gold (spun)",
    "preferredVolume": "3.5 mL serum",
    "minimumVolume": "1.5 mL serum",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "Yes",
    "stability": "14 days room, refrigerated or frozen; freeze/thaw x3",
    "specialLabeling": "",
    "specialInstructions": "Allow to clot, centrifuge and submit spun original SST. Do not freeze the gel tube. Collect sufficient serum for preferred volume. Ask about high-dose biotin; Labcorp recommends withholding it for 72 hours before collection, with clinician guidance.",
    "fastingStatus": "",
    "fastingInstructions": "",
    "source": "Labcorp official order-code directory, reviewed 2026-11-18 • https://www.labcorp.com/tests/144510/hepatitis-b-virus-hbv-prenatal-screen-hbsag",
    "clinicalCategories": [
      "infectious",
      "hepatic",
      "pregnancy"
    ],
    "searchAliases": [
      "prenatal HBsAg",
      "hepatitis B pregnancy screen"
    ],
    "usePreferredSerumYield": true
  },
  {
    "id": "labcorp-verified-20261118-batch35-551710",
    "testCode": "551710",
    "testName": "Hepatitis B Virus (HBV) Genotype",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "alternativeContainer": "",
    "transportContainer": "Frozen Transport Tube (Purple Cap)",
    "preferredVolume": "1.2 mL serum",
    "minimumVolume": "0.6 mL serum",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "spin": "Yes",
    "stability": "Maintain frozen",
    "specialLabeling": "",
    "specialInstructions": "Serum pathway. Centrifuge within six hours, transfer serum to polypropylene screw-cap frozen transport tube, freeze and maintain frozen transit. Do not freeze original SST. Submit separate frozen aliquots for different orders; avoid heparin/SPS and hemolyzed specimens.",
    "fastingStatus": "",
    "fastingInstructions": "",
    "source": "Labcorp official order-code directory, reviewed 2026-11-18 • https://www.labcorp.com/tests/551710/hepatitis-b-virus-hbv-genotype",
    "clinicalCategories": [
      "infectious",
      "hepatic"
    ],
    "searchAliases": [
      "HBV genotype",
      "HBV precore mutation"
    ]
  },
  {
    "id": "labcorp-verified-20261118-batch35-551750",
    "testCode": "551750",
    "testName": "Hepatitis B Virus (HBV) Genotyping Plus Drug Resistance",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "alternativeContainer": "",
    "transportContainer": "Frozen Transport Tube (Purple Cap)",
    "preferredVolume": "1.2 mL serum",
    "minimumVolume": "0.6 mL serum",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "spin": "Yes",
    "stability": "Maintain frozen",
    "specialLabeling": "",
    "specialInstructions": "Serum pathway. Centrifuge within six hours, transfer serum to polypropylene screw-cap frozen transport tube, freeze and maintain frozen transit. Do not freeze original SST. Submit separate frozen aliquots for different orders; avoid heparin/SPS and hemolyzed specimens.",
    "fastingStatus": "",
    "fastingInstructions": "",
    "source": "Labcorp official order-code directory, reviewed 2026-11-18 • https://www.labcorp.com/tests/551750/hepatitis-b-virus-hbv-genotyping-plus-drug-resistance",
    "clinicalCategories": [
      "infectious",
      "hepatic"
    ],
    "searchAliases": [
      "HBV genotyping resistance",
      "HBV precore mutation"
    ]
  },
  {
    "id": "labcorp-verified-20261118-batch35-912845",
    "testCode": "912845",
    "testName": "ToxAssure Flex Oxycodone Class Confirmation, Urine",
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
    "stability": "Room/refrigerated 14 days; frozen 6 weeks",
    "specialLabeling": "",
    "specialInstructions": "Collect random urine in an unpreserved plastic sterile cup; submit the original cup without spin or transfer. Collect sufficient volume (10 mL per order when multiple definitive tests are requested). Reject urine from preservative tubes. Send at room temperature if transit is under three days; for longer storage refrigerate or freeze. Include patient-reported and prescribed medications if available.",
    "fastingStatus": "",
    "fastingInstructions": "",
    "source": "Labcorp official order-code directory, reviewed 2026-11-18 • https://www.labcorp.com/tests/912845/toxassure-flex-oxycodone-class-confirmation-urine",
    "clinicalCategories": [
      "toxicology",
      "urinary"
    ],
    "searchAliases": [
      "ToxAssure Flex Oxycodone Class Confirmation, Urine"
    ]
  },
  {
    "id": "labcorp-verified-20261118-batch35-910792",
    "testCode": "910792",
    "testName": "ToxAssure Flex Phencyclidine Confirmation, Urine",
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
    "stability": "Room/refrigerated 14 days; frozen 6 weeks",
    "specialLabeling": "",
    "specialInstructions": "Collect random urine in an unpreserved plastic sterile cup; submit the original cup without spin or transfer. Collect sufficient volume (10 mL per order when multiple definitive tests are requested). Reject urine from preservative tubes. Send at room temperature if transit is under three days; for longer storage refrigerate or freeze. Include patient-reported and prescribed medications if available.",
    "fastingStatus": "",
    "fastingInstructions": "",
    "source": "Labcorp official order-code directory, reviewed 2026-11-18 • https://www.labcorp.com/tests/910792/toxassure-flex-phencyclidine-confirmation-urine",
    "clinicalCategories": [
      "toxicology",
      "urinary"
    ],
    "searchAliases": [
      "ToxAssure Flex Phencyclidine Confirmation, Urine"
    ]
  },
  {
    "id": "labcorp-verified-20261118-batch35-912844",
    "testCode": "912844",
    "testName": "ToxAssure Flex Opiate Class Confirmation, Urine",
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
    "stability": "Room/refrigerated 14 days; frozen 6 weeks",
    "specialLabeling": "",
    "specialInstructions": "Collect random urine in an unpreserved plastic sterile cup; submit the original cup without spin or transfer. Collect sufficient volume (10 mL per order when multiple definitive tests are requested). Reject urine from preservative tubes. Send at room temperature if transit is under three days; for longer storage refrigerate or freeze. Include patient-reported and prescribed medications if available.",
    "fastingStatus": "",
    "fastingInstructions": "",
    "source": "Labcorp official order-code directory, reviewed 2026-11-18 • https://www.labcorp.com/tests/912844/toxassure-flex-opiate-class-confirmation-urine",
    "clinicalCategories": [
      "toxicology",
      "urinary"
    ],
    "searchAliases": [
      "ToxAssure Flex Opiate Class Confirmation, Urine"
    ]
  },
  {
    "id": "labcorp-verified-20261118-batch35-910527",
    "testCode": "910527",
    "testName": "ToxAssure Flex Methadone Confirmation, Urine",
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
    "stability": "Room/refrigerated 14 days; frozen 6 weeks",
    "specialLabeling": "",
    "specialInstructions": "Collect random urine in an unpreserved plastic sterile cup; submit the original cup without spin or transfer. Collect sufficient volume (10 mL per order when multiple definitive tests are requested). Reject urine from preservative tubes. Send at room temperature if transit is under three days; for longer storage refrigerate or freeze. Include patient-reported and prescribed medications if available.",
    "fastingStatus": "",
    "fastingInstructions": "",
    "source": "Labcorp official order-code directory, reviewed 2026-11-18 • https://www.labcorp.com/tests/910527/toxassure-flex-methadone-confirmation-urine",
    "clinicalCategories": [
      "toxicology",
      "urinary"
    ],
    "searchAliases": [
      "ToxAssure Flex Methadone Confirmation, Urine"
    ]
  },
  {
    "id": "labcorp-verified-20261118-batch35-910801",
    "testCode": "910801",
    "testName": "ToxAssure Flex Tramadol Confirmation, Urine",
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
    "stability": "Room/refrigerated 14 days; frozen 6 weeks",
    "specialLabeling": "",
    "specialInstructions": "Collect random urine in an unpreserved plastic sterile cup; submit the original cup without spin or transfer. Collect sufficient volume (10 mL per order when multiple definitive tests are requested). Reject urine from preservative tubes. Send at room temperature if transit is under three days; for longer storage refrigerate or freeze. Include patient-reported and prescribed medications if available.",
    "fastingStatus": "",
    "fastingInstructions": "",
    "source": "Labcorp official order-code directory, reviewed 2026-11-18 • https://www.labcorp.com/tests/910801/toxassure-flex-tramadol-confirmation-urine",
    "clinicalCategories": [
      "toxicology",
      "urinary"
    ],
    "searchAliases": [
      "ToxAssure Flex Tramadol Confirmation, Urine"
    ]
  },
  {
    "id": "labcorp-verified-20261118-batch35-911127",
    "testCode": "911127",
    "testName": "ToxAssure Flex Fentanyl Confirmation, Urine",
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
    "stability": "Room/refrigerated 14 days; frozen 6 weeks",
    "specialLabeling": "",
    "specialInstructions": "Collect random urine in an unpreserved plastic sterile cup; submit the original cup without spin or transfer. Collect sufficient volume (10 mL per order when multiple definitive tests are requested). Reject urine from preservative tubes. Send at room temperature if transit is under three days; for longer storage refrigerate or freeze. Include patient-reported and prescribed medications if available.",
    "fastingStatus": "",
    "fastingInstructions": "",
    "source": "Labcorp official order-code directory, reviewed 2026-11-18 • https://www.labcorp.com/tests/911127/toxassure-flex-fentanyl-confirmation-urine",
    "clinicalCategories": [
      "toxicology",
      "urinary"
    ],
    "searchAliases": [
      "ToxAssure Flex Fentanyl Confirmation, Urine"
    ]
  },
  {
    "id": "labcorp-verified-20261118-batch35-912081",
    "testCode": "912081",
    "testName": "Drug Screen 17 With Reflex Confirmation (Pregnancy Profile), Urine",
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
    "stability": "Room/refrigerated 14 days; frozen 6 weeks",
    "specialLabeling": "",
    "specialInstructions": "Collect random urine in an unpreserved plastic sterile cup; submit the original cup without spin or transfer. Collect sufficient volume (10 mL per order when multiple definitive tests are requested). Reject urine from preservative tubes. Send at room temperature if transit is under three days; for longer storage refrigerate or freeze. Include patient-reported and prescribed medications if available.",
    "fastingStatus": "",
    "fastingInstructions": "",
    "source": "Labcorp official order-code directory, reviewed 2026-11-18 • https://www.labcorp.com/tests/912081/drug-screen-17-with-reflex-confirmation-pregnancy-profile-etg-amp-bar-bzo-coc-pcp-thc-6am-opi-oxy-tap-md-fen-bup-ppx-tram-nic-urine",
    "clinicalCategories": [
      "toxicology",
      "urinary",
      "pregnancy"
    ],
    "searchAliases": [
      "Drug Screen 17 With Reflex Confirmation (Pregnancy Profile), Urine"
    ]
  },
  {
    "id": "labcorp-verified-20261118-batch35-650044",
    "testCode": "650044",
    "testName": "K076-IgE Isocyanate MDI",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "alternativeContainer": "",
    "transportContainer": "SST / Gold (spun)",
    "preferredVolume": "0.2 mL serum",
    "minimumVolume": "0.1 mL serum",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "Yes",
    "stability": "",
    "specialLabeling": "",
    "specialInstructions": "Allow to clot and centrifuge; submit original spun SST at room temperature. This is allergen-specific serum IgE testing.",
    "fastingStatus": "",
    "fastingInstructions": "",
    "source": "Labcorp official order-code directory, reviewed 2026-11-18 • https://www.labcorp.com/tests/650044/k076-ige-isocyanate-mdi",
    "clinicalCategories": [
      "allergy"
    ],
    "searchAliases": [
      "K076-IgE Isocyanate MDI",
      "Isocyanate MDI"
    ]
  },
  {
    "id": "labcorp-verified-20261118-batch35-650077",
    "testCode": "650077",
    "testName": "K079-IgE Phthalic Anhydride",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "alternativeContainer": "",
    "transportContainer": "SST / Gold (spun)",
    "preferredVolume": "0.2 mL serum",
    "minimumVolume": "0.1 mL serum",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "Yes",
    "stability": "",
    "specialLabeling": "",
    "specialInstructions": "Allow to clot and centrifuge; submit original spun SST at room temperature. This is allergen-specific serum IgE testing.",
    "fastingStatus": "",
    "fastingInstructions": "",
    "source": "Labcorp official order-code directory, reviewed 2026-11-18 • https://www.labcorp.com/tests/650077/k079-ige-phthalic-anhydride",
    "clinicalCategories": [
      "allergy"
    ],
    "searchAliases": [
      "K079-IgE Phthalic Anhydride",
      "Phthalic Anhydride"
    ]
  }
];
for(const record of additions){const prior=window.SEED_TESTS.find(t=>String(t.testCode||'').trim()===record.testCode);if(!prior){window.SEED_TESTS.push(record);continue;}if(['pending','reference'].includes(prior.status))Object.assign(prior,record,{id:prior.id||record.id});}
})();
