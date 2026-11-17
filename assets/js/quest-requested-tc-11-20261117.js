/* Requested Quest TC 11-code audit: 2026-11-17
 * All 11 codes guaranteed as catalog entries; nine normal workflows active when not already active/blocked.
 * Specialty serum dry-ice 94569 and two-temperature Mayo 92717 remain searchable reference-only
 * unless already approved active. Never override an explicitly blocked record.
 * Preserve previous active records but repair 10380 two-specimen display and 38470 label wording.
 */
(()=>{'use strict';if(!Array.isArray(window.SEED_TESTS))return;
const additions=[
  {
    "id": "quest-tc-20261117-15434",
    "testCode": "15434",
    "testName": "Lipid Panel (REFL)",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "alternativeContainer": "",
    "transportContainer": "SST / Gold (spun)",
    "preferredVolume": "2 mL serum",
    "minimumVolume": "Not stated",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "Yes",
    "specialLabeling": "Label SERUM · SST",
    "specialInstructions": "Collect Gold SST (or Tiger SST), clot and CENTRIFUGE within 30–60 minutes; submit the ORIGINAL SPUN SST at ROOM TEMPERATURE. Quest does not require fasting when cholesterol and triglycerides are ordered together as a lipid panel; honor specific provider restrictions where applicable. This is a CLIENT-SPECIFIC REFLEX code: the ordering physician's predetermined reflex criteria may add testing/cost. Verify availability under the receiving Quest account and service area; do not silently replace with routine Lipid Panel 7600.",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/15434/lipid-panel-refl?cc=MASTER&p=r",
    "searchAliases": [
      "lipid panel REFL",
      "cholesterol triglycerides HDL LDL reflex",
      "lipid reflex 15434",
      "cholesterol panel reflex"
    ],
    "clinicalCategories": [
      "lipids",
      "cardiac",
      "metabolic"
    ],
    "stability": "Serum room 48 hours; refrigerated 7 days; frozen 28 days",
    "fastingInstructions": "Fasting is not routinely required for a lipid panel."
  },
  {
    "id": "quest-tc-20261117-15060",
    "testCode": "15060",
    "testName": "Adiponectin",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "alternativeContainer": "",
    "transportContainer": "Transport Tube",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "0.5 mL serum",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "Yes",
    "specialLabeling": "Label SERUM · SST source",
    "specialInstructions": "OVERNIGHT FASTING REQUIRED. Draw Gold SST (or Tiger SST), gently INVERT FIVE TIMES immediately, allow clot for 30 minutes, centrifuge 10 minutes, transfer 1 mL (minimum 0.5 mL) clear serum into a dedicated plastic Transport Tube, then refrigerate at 2–8°C and ship SAME DAY with cold packs. Do not submit whole blood or unspun SST. Quest notes this code is not offered by Nichols San Juan Capistrano; verify performing service area and Quest account.",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/15060/adiponectin-?cc=MASTER&p=r",
    "searchAliases": [
      "adiponectin serum",
      "adipocyte hormone",
      "adiponectin fasting",
      "insulin resistance biomarker"
    ],
    "clinicalCategories": [
      "metabolic",
      "endocrinology",
      "cardiac"
    ],
    "stability": "Room 4 days; refrigerated 14 days; frozen 28 days",
    "fastingInstructions": "Overnight fasting required.",
    "fastingStatus": "required"
  },
  {
    "id": "quest-tc-20261117-10380",
    "testCode": "10380",
    "testName": "Hemoglobin A1c with Reflex to 1,5-Anhydroglucitol (1,5-AG)",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "alternativeContainer": "",
    "transportContainer": "Transport Tube",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "0.5 mL serum",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "Yes",
    "specialLabeling": "Label SERUM · SST source",
    "specialInstructions": "TWO DISTINCT SPECIMENS: (1) 1 mL (minimum 0.5 mL) SERUM from a Gold SST/Tiger SST, clotted, centrifuged and transferred to a separate plastic Transport Tube (plain Red Top no gel also accepted); (2) ONE FULL original Lavender EDTA WHOLE BLOOD tube, unspun, sent at ROOM TEMPERATURE. Do not pool the serum and EDTA blood or substitute gray-top or heparin tubes. Preferred alternate route uses a THIRD separate Lavender EDTA draw for EDTA plasma instead of serum. Reflex 1,5-AG is performed only for HbA1c 6.5%–8.0%, with additional charge. Verify Quest account; Nichols San Juan Capistrano does NOT offer this test.",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/10380/hemoglobin-a1c-with-reflex-to-15-anhydroglucitol-15-ag?cc=MASTER&p=r",
    "searchAliases": [
      "a1c with 1,5 AG",
      "A1c reflex glycated glycemic control",
      "hemoglobin a1c anhydroglucitol",
      "1 5 AG",
      "glycohemoglobin reflex"
    ],
    "clinicalCategories": [
      "diabetes",
      "endocrinology",
      "metabolic"
    ],
    "stability": "Room 7 days; refrigerated 7 days; frozen 28 days for accepted specimen types",
    "additionalDrawRequirements": [
      {
        "container": "Lavender EDTA",
        "count": 1,
        "submissionCount": 1,
        "specimenType": "Whole Blood",
        "purpose": "Separate original full EDTA blood tube for A1c",
        "preferredVolume": "1 full Lavender EDTA whole blood tube",
        "minimumVolume": "0.5 mL whole blood",
        "transportContainer": "Lavender EDTA",
        "transportTemperature": "Room Temperature",
        "transportTemperatureRaw": "Room Temperature",
        "spin": "No",
        "specialLabeling": "Label WHOLE BLOOD · LAVENDER EDTA",
        "specialInstructions": "Collect a SEPARATE full Lavender EDTA, invert and submit ORIGINAL tube UNSPUN at ROOM TEMPERATURE. Do not use the serum source or centrifuge this tube."
      }
    ]
  },
  {
    "id": "quest-tc-20261117-38470",
    "testCode": "38470",
    "testName": "Gastrointestinal Pathogen Panel, Real-Time PCR",
    "status": "active",
    "specimenType": "Stool",
    "drawContainer": "Sterile cup",
    "alternativeContainer": "",
    "transportContainer": "Cary-Blair Stool Culture Transport Medium",
    "preferredVolume": "5 mL liquid/soft stool to Cary-Blair fill line",
    "minimumVolume": "Fill Cary-Blair vial to premarked fill line",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "specialLabeling": "Label STOOL · CARY-BLAIR",
    "specialInstructions": "Collect fresh liquid/soft STOOL into clean dry Sterile cup, no urine/water. Using Cary-Blair's collection spoon transfer stool from several areas to the Cary-Blair stool-culture transport vial UNTIL THE FILL LINE, stir/mix, cap and submit the Cary-Blair vial at ROOM TEMPERATURE. Raw unpreserved stool, stool below the fill line, Total-Fix and frozen Cary-Blair specimens are REJECTED. Avoid antacids, bismuth, antidiarrheals, oily laxatives and related medicines as specified; wait 5–10 days after listed compounds or at least 2 weeks after barium/antibiotics when medically appropriate under provider instructions.",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/38470/gastrointestinal-pathogen-panel-real-time-pcr?cc=MASTER&p=r",
    "searchAliases": [
      "GI pathogen PCR panel",
      "gastrointestinal molecular panel",
      "enteric pathogens PCR",
      "stool PCR multiplex",
      "GIP"
    ],
    "clinicalCategories": [
      "gastrointestinal",
      "infectious",
      "microbiology"
    ],
    "stability": "Room 4 days; refrigerated 5 days; frozen unacceptable"
  },
  {
    "id": "quest-tc-20261117-30673",
    "testCode": "30673",
    "testName": "Lactate Dehydrogenase (LD) (REFL)",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "alternativeContainer": "",
    "transportContainer": "Transport Tube",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "0.5 mL serum",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "Yes",
    "specialLabeling": "Label SERUM · SST source",
    "specialInstructions": "Collect serum in Gold SST/Tiger SST, allow clot and centrifuge, TRANSFER 1 mL serum (minimum 0.5 mL) into a dedicated plastic screw-cap Transport Tube. Send at ROOM TEMPERATURE. DO NOT refrigerate or freeze for this client-specific reflex code, despite serum's limited laboratory refrigerated stability. Prevent hemolysis; moderate or gross hemolysis rejected. CLIENT-SPECIFIC reflex criteria may trigger additional testing and charges; verify receiving Quest account and region.",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/30673/lactate-dehydrogenase-ld-refl?cc=MASTER&p=r",
    "searchAliases": [
      "LDH REFL",
      "lactate dehydrogenase reflex",
      "LD 30673",
      "LDH serum client reflex"
    ],
    "clinicalCategories": [
      "chemistry",
      "cardiac",
      "hematology"
    ],
    "stability": "Serum room 14 days; refrigerated 48 hours but do NOT select as transport; frozen unacceptable"
  },
  {
    "id": "quest-tc-20261117-672",
    "testCode": "672",
    "testName": "Cadmium, Random Urine",
    "status": "active",
    "specimenType": "Urine",
    "drawContainer": "Trace Metal-Free Plastic Container",
    "alternativeContainer": "",
    "transportContainer": "Trace Metal-Free Plastic Container",
    "preferredVolume": "7 mL random urine",
    "minimumVolume": "3 mL urine",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "specialLabeling": "Label RANDOM URINE · TRACE METAL-FREE",
    "specialInstructions": "Collect RANDOM urine DIRECTLY in an ORIGINAL clean acid-washed or certified trace-metal-free PLASTIC urine container; submit the ORIGINAL labeled container at ROOM TEMPERATURE without transfer or preservative. Avoid worksite collection. Quest may accept a non-trace-metal container but warns that elevated readings may be contaminated; local workflow REQUIRES trace-metal-free collection. Verify Quest service area/account; Nichols San Juan Capistrano does not offer this code.",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/672/cadmium-random-urine?cc=MASTER&p=r",
    "searchAliases": [
      "random urine cadmium",
      "urinary cadmium and creatinine",
      "cadmium metal exposure",
      "Cd urine"
    ],
    "clinicalCategories": [
      "heavy-metals",
      "toxicology",
      "urinary"
    ],
    "stability": "Room 5 days; refrigerated 7 days; frozen 14 days"
  },
  {
    "id": "quest-tc-20261117-270",
    "testCode": "270",
    "testName": "Arsenic, Urine",
    "status": "active",
    "specimenType": "Urine",
    "drawContainer": "Trace Metal-Free Plastic Container",
    "alternativeContainer": "",
    "transportContainer": "Trace Metal-Free Plastic Container",
    "preferredVolume": "7 mL random urine",
    "minimumVolume": "3 mL urine",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "specialLabeling": "Label RANDOM URINE · TRACE METAL-FREE",
    "specialInstructions": "Collect RANDOM urine into ORIGINAL certified trace-metal-free plastic collection container and submit sealed ORIGINAL container REFRIGERATED. Avoid seafood before testing as specified in Quest instructions. Do not substitute unverified ordinary Sterile cup, use chemical preservatives or pool with 24-hour urine. Verify receiving Quest service area; SJC is not offered.",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/270/arsenic-urine?cc=MASTER&p=r",
    "searchAliases": [
      "arsenic urine random",
      "arsenic metal exposure",
      "urinary arsenic",
      "urine As"
    ],
    "clinicalCategories": [
      "heavy-metals",
      "toxicology",
      "urinary"
    ],
    "stability": "Confirm handling against receiving Quest service area"
  },
  {
    "id": "quest-tc-20261117-94569",
    "testCode": "94569",
    "testName": "Interferon-gamma (IFN-y), Serum",
    "status": "reference",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "alternativeContainer": "",
    "transportContainer": "Transport Tube",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "Verify with Quest",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "spin": "Yes",
    "specialLabeling": "Label SERUM · SST source · FROZEN",
    "specialInstructions": "SPECIAL SHIPPING NOT CLEARED FOR ROUTINE COLLECTION. Collect serum in SST, allow to clot/centrifuge, TRANSFER 1 mL serum into sealed plastic Transport Tube, freeze immediately. Quest/Viracor REQUIRES OVERNIGHT FROZEN SHIPPING ON DRY ICE. Room/refrigerated submissions are REJECTED. BEFORE collection, obtain confirmation of a properly equipped dry-ice overnight shipment and receiving Quest service area. If dry ice pickup is unavailable, DO NOT COLLECT. Do not confuse with interferon gamma release assay/QuantiFERON.",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/94569/interferon-gamma-ifn-y-serum?cc=MASTER&p=r",
    "searchAliases": [
      "IFN gamma serum",
      "IFN y cytokine",
      "interferon gamma serum test",
      "cytokine interferon-gamma"
    ],
    "clinicalCategories": [
      "immunology",
      "infectious",
      "specialty"
    ],
    "stability": "Room and refrigerated unacceptable; frozen acceptable >24 hours"
  },
  {
    "id": "quest-tc-20261117-13808",
    "testCode": "13808",
    "testName": "Peripheral Blood Smear Review",
    "status": "active",
    "specimenType": "Whole Blood",
    "drawContainer": "Lavender EDTA",
    "alternativeContainer": "",
    "transportContainer": "Lavender EDTA",
    "preferredVolume": "4.5 mL EDTA whole blood",
    "minimumVolume": "1 mL EDTA whole blood",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "specialLabeling": "Label WHOLE BLOOD · LAVENDER EDTA",
    "specialInstructions": "Use the QUEST-ACCEPTED ALTERNATIVE COLLECTION: 4.5 mL EDTA WHOLE BLOOD in ONE original Lavender EDTA tube (1 mL minimum); submit original UNSPUN tube at ROOM TEMPERATURE with SAME-DAY, CLIENT-PERFORMED in-house CBC results and clinical history. Quest performs the microscopic review; NO CLINIC-PREPARED GLASS SLIDES OR SMEARS are required for the alternative route. Quest CANCELS this code if the same-day CBC results are not supplied. This test cannot be collected at a Quest Patient Service Center. Do not collect if no same-day in-house CBC or receiving Quest approval. SJC not offered.",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/13808/peripheral-blood-smear-review?cc=MASTER&p=r",
    "searchAliases": [
      "PBF smear review Quest",
      "peripheral smear from lavender whole blood",
      "blood film review without onsite slides",
      "CBC reflex pathology smear"
    ],
    "clinicalCategories": [
      "hematology",
      "microscopy"
    ],
    "stability": "Whole blood room 48 hours; refrigerated 48 hours; frozen unacceptable"
  },
  {
    "id": "quest-tc-20261117-92717",
    "testCode": "92717",
    "testName": "Immune Assessment B Cell Subsets, Blood",
    "status": "reference",
    "specimenType": "Whole Blood",
    "drawContainer": "Lavender EDTA",
    "alternativeContainer": "",
    "transportContainer": "Lavender EDTA",
    "preferredVolume": "4 mL original EDTA whole blood",
    "minimumVolume": "3 mL original EDTA whole blood",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "specialLabeling": "Label WHOLE BLOOD · EDTA · T/B/NK COMPONENT · DATE OF DRAW",
    "specialInstructions": "SPECIAL MAYO REFERRAL LOGISTICS REQUIRED BEFORE COLLECTING. TWO DISTINCT ORIGINAL LAVENDER EDTA BLOOD SPECIMENS, NOT ALIQUOTS: (1) 4 mL (3 mL minimum) T/B/NK subsets, UNTRANSFERRED, ambient ROOM TEMP, received within 52 hours; (2) 10 mL EDTA whole blood (pediatric <=14y: 4 mL) for B-cell immune assessment, ORIGINAL EDTA collection tube, REFRIGERATED, received within 48 hours. LABEL each original tube for the correct component, INCLUDE DATE OF DRAW as Quest specifically requires, and ordering physician name/phone. Quest recommends arrival at Mayo within 24h, weekday receipt by 4PM Friday; weekend delivery may be cancelled. Contact lab before ordering to arrange special courier; Mayo testing requires specialized handling, recommend Mon-Thu before noon. Do not plan routine Quest evening pickup until logistics confirmed. DO NOT COLLECT if you lack a valid 10mL EDTA tube/confirmed split-temperature direct shipment.",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/92717/immune-assessment-b-cell-subsets-blood?cc=MASTER&p=r",
    "searchAliases": [
      "B cell subsets blood",
      "immune assessment B lymphocyte",
      "B cell phenotype flow",
      "T B NK cell subset two tube"
    ],
    "clinicalCategories": [
      "immunology",
      "hematology",
      "lymphocyte"
    ],
    "stability": "T/B/NK tube ambient <52 hours; B-cell tube refrigerated <48 hours",
    "additionalDrawRequirements": [
      {
        "container": "Lavender EDTA",
        "count": 1,
        "submissionCount": 1,
        "specimenType": "Whole Blood",
        "purpose": "Separate B-cell phenotyping original EDTA tube",
        "preferredVolume": "10 mL EDTA whole blood (age <=14 years: 4 mL)",
        "minimumVolume": "Verify age-specific requirement with Mayo",
        "transportContainer": "Lavender EDTA",
        "transportTemperature": "Refrigerated",
        "transportTemperatureRaw": "Refrigerated",
        "spin": "No",
        "specialLabeling": "Label WHOLE BLOOD · EDTA · B-CELL COMPONENT · DATE OF DRAW",
        "specialInstructions": "SEPARATE second original Lavender EDTA tube with 10 mL blood for adult B cell component. Do not aliquot or share with ambient T/B/NK tube. Refrigerate with cold packs; direct Mayo weekday logistics and Friday 4 p.m. receipt restrictions apply."
      }
    ]
  },
  {
    "id": "quest-tc-20261117-19593",
    "testCode": "19593",
    "testName": "CBC (includes Differential and Platelets) (REFL)",
    "status": "active",
    "specimenType": "Whole Blood",
    "drawContainer": "Lavender EDTA",
    "alternativeContainer": "",
    "transportContainer": "Lavender EDTA",
    "preferredVolume": "1 full Lavender EDTA whole blood tube",
    "minimumVolume": "1 mL EDTA whole blood (500 µL EDTA microtainer also accepted)",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "specialLabeling": "Label WHOLE BLOOD · LAVENDER EDTA",
    "specialInstructions": "Collect ONE full original Lavender EDTA tube, gently invert, submit UNSPUN at ROOM TEMPERATURE. DO NOT refrigerate or freeze; Quest notes cooling can precipitate fibrin and alter cell counts. If collecting multiple tubes, draw lavender last per Quest instructions. This CLIENT-SPECIFIC REFLEX code may trigger manual differential at Quest based on physician-defined criteria, with extra charges. Quest performs any required microscopy; clinic does NOT prepare a slide. Verify client-specific code availability in Quest service area.",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/19593/cbc-includes-differential-and-platelets-refl?cc=MASTER&p=r",
    "searchAliases": [
      "CBC with differential REFL",
      "CBC diff platelets reflex",
      "complete blood count client reflex",
      "CBC auto diff Quest 19593"
    ],
    "clinicalCategories": [
      "hematology",
      "cbc"
    ],
    "stability": "Room 48 hours; refrigerated unstable; frozen unstable"
  }
];
for(const row of additions){
 const old=window.SEED_TESTS.find(x=>String(x.testCode||'').trim()===row.testCode);
 if(!old){window.SEED_TESTS.push(row);continue;}
 if(old.status==='blocked')continue;
 if(old.status==='reference'||old.status==='pending'){Object.assign(old,row,{id:old.id||row.id});continue;}
 if(old.status==='active'&&row.testCode==='10380'){
   old.specialLabeling='Label SERUM · SST source';
   old.preferredVolume='1 mL serum';
   old.minimumVolume='0.5 mL serum';
   old.transportContainer='Transport Tube';
   old.additionalDrawRequirements=row.additionalDrawRequirements;
   old.specialInstructions=row.specialInstructions;
   if(!old.searchAliases?.length)old.searchAliases=row.searchAliases;
   if(!old.clinicalCategories?.length)old.clinicalCategories=row.clinicalCategories;
 }
 if(old.status==='active'&&row.testCode==='38470'){
   old.specialLabeling='Label STOOL · CARY-BLAIR';
   old.specialInstructions=row.specialInstructions;
   if(!old.searchAliases?.length)old.searchAliases=row.searchAliases;
   if(!old.clinicalCategories?.length)old.clinicalCategories=row.clinicalCategories;
 }
}
})();
