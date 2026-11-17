/* Quest uncollectable audit, NEXT 50 after 12058, through 14511, reviewed 2026-11-16.
 * 15 compatible routes; leave all others as references, including unsupported
 * Streck/Orasure/biopsy, Pap/slide, family genetic kits, glucan-free BAL,
 * high-risk pathogen kits, reproductive donor workflows and specialized path.
 * Never overwrite existing active or blocked records.
 */
(()=>{'use strict';if(!Array.isArray(window.SEED_TESTS))return;
const additions=[
  {
    "id": "quest-verified-unusable-audit-next50b-20261116-12075",
    "testCode": "12075",
    "testName": "Obstetric Panel with Fourth Generation HIV, Hepatitis C Antibody with Reflex",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "alternativeContainer": "",
    "transportContainer": "Transport Tube",
    "preferredVolume": "11 mL serum",
    "minimumVolume": "8 mL serum",
    "collectionCount": 1,
    "submissionCount": 2,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "Yes",
    "stability": "Serum/EDTA component stability follows individual panel analytes; ship serum and blood room temperature per Quest panel instructions",
    "specialLabeling": "Label SERUM and exact collection date/time",
    "specialInstructions": "THREE DISTINCT SPECIMEN TYPES are required: 11 mL SERUM total from spun SST, ONE FULL LAVENDER EDTA whole-blood tube, ONE FULL PINK EDTA whole-blood tube. Use serum yield planning: the clinic's Gold SST 2.5 mL usable serum means approximately FIVE Gold SST draws; Tiger SST 4 mL means approximately THREE Tiger SST draws. Allow complete clotting, spin, transfer pooled compatible serum into TWO suitably sized Quest-approved labeled plain Transport Tubes to accommodate 11 mL total; distribute enough serum to satisfy all panel components. Retain intact original EDTA lavender and pink tubes at ROOM TEMPERATURE, never refrigerate them. Quest panel calls for serum transport separate from EDTA tubes; if one local transfer tube is verified to accommodate 11 mL the transfer-vial count can be reduced on manual review. Label every vial with two unique patient identifiers, serum/whole-blood specimen type and draw time; do not interchange Pink and Lavender. Biotin-containing supplements may interfere; Quest advises draw at least 8 hours after normal daily biotin and 72 hours after megadoses (clinician to direct). Confirm the test code is available through the patient's Quest service area and receiving account before collection.",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/12075/obstetric-panel-with-fourth-generation-hivhepatitis-c-antibody-with-reflex?cc=MASTER",
    "searchAliases": [
      "prenatal panel HIV HCV",
      "OB panel 4th gen HIV hepatitis C",
      "obstetric panel HCV",
      "pregnancy prenatal hepatitis HIV panel"
    ],
    "clinicalCategories": [
      "pregnancy",
      "hematology",
      "infectious",
      "screening"
    ],
    "usePreferredSerumYield": true,
    "additionalDrawRequirements": [
      {
        "container": "Lavender EDTA",
        "count": 1,
        "specimenType": "Whole Blood",
        "purpose": "Required full Lavender EDTA whole blood for CBC",
        "preferredVolume": "One FULL Lavender EDTA tube",
        "minimumVolume": "1 mL whole blood",
        "transportContainer": "Lavender EDTA",
        "transportTemperature": "Room Temperature",
        "transportTemperatureRaw": "Room Temperature",
        "spin": "No",
        "specialLabeling": "Label WHOLE BLOOD, Lavender EDTA, collection date/time",
        "specialInstructions": "Draw a full Lavender EDTA whole-blood tube, gently invert, submit ORIGINAL intact at room temperature. Do not refrigerate, centrifuge, aliquot or pool with the separate Pink EDTA."
      },
      {
        "container": "Pink EDTA",
        "count": 1,
        "specimenType": "Whole Blood",
        "purpose": "Required full Pink EDTA whole blood for blood bank ABO/Rh and antibody screen",
        "preferredVolume": "One FULL Pink EDTA tube",
        "minimumVolume": "1 mL whole blood",
        "transportContainer": "Pink EDTA",
        "transportTemperature": "Room Temperature",
        "transportTemperatureRaw": "Room Temperature",
        "spin": "No",
        "specialLabeling": "Label WHOLE BLOOD, Pink EDTA, collection date/time",
        "specialInstructions": "Draw a full Pink EDTA whole-blood tube, gently invert, submit ORIGINAL at room temperature. No centrifugation or transfer. This is a separate tube from Lavender EDTA; identify Pink EDTA."
      }
    ]
  },
  {
    "id": "quest-verified-unusable-audit-next50b-20261116-12346",
    "testCode": "12346",
    "testName": "Acute Myeloid Leukemia (AML), Rapid Mutation Panel",
    "status": "active",
    "specimenType": "Whole Blood",
    "drawContainer": "Lavender EDTA",
    "alternativeContainer": "",
    "transportContainer": "Lavender EDTA",
    "preferredVolume": "5 mL EDTA whole blood",
    "minimumVolume": "3 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "stability": "Ship promptly at room temperature; confirm local laboratory stability before scheduling",
    "specialLabeling": "Label WHOLE BLOOD and exact collection date/time",
    "specialInstructions": "Collect ONE DEDICATED Lavender EDTA whole-blood specimen, 5 mL preferred (3 mL minimum), for the AML 7-gene mutation panel. Gently invert, submit ORIGINAL UNOPENED EDTA tube; do not spin, aliquot, freeze, mix with any serum/plasma, or prepare glass slides. Bone marrow or extracted DNA are alternate pathways and NOT modeled. Because the preferred 5 mL may exceed a standard lavender tube's volume, fill a suitable approved EDTA collection tube or verify the number of lavender tubes with Quest before draw. Physician/provider should verify oncology test acceptance, draw timing and supporting indication. Confirm the test code is available through the patient's Quest service area and receiving account before collection.",
    "source": "https://www.questdiagnostics.com/healthcare-professionals/clinical-education-center/faq/faq260",
    "searchAliases": [
      "AML rapid mutation",
      "FLT3 IDH1 IDH2 CEBPA KIT NPM1 TP53",
      "acute myeloid leukemia genetic panel"
    ],
    "clinicalCategories": [
      "oncology",
      "hematology"
    ]
  },
  {
    "id": "quest-verified-unusable-audit-next50b-20261116-12598",
    "testCode": "12598",
    "testName": "Encephalitis Antibody Panel, CSF",
    "status": "active",
    "specimenType": "CSF",
    "drawContainer": "Sterile cup",
    "alternativeContainer": "",
    "transportContainer": "Sterile cup",
    "preferredVolume": "5 mL CSF",
    "minimumVolume": "1.7 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "stability": "Room 4 days; refrigerated 7 days; frozen 30 days",
    "specialLabeling": "Label CSF and exact collection date/time",
    "specialInstructions": "Qualified procedural clinician obtains CSF using sterile protocol. Submit original sterile leakproof CSF cup/vial REFRIGERATED with cold packs; avoid gross blood contamination, hemolysis and icterus. This is an antibody panel, not PCR or an autoimmune-encephalitis panel. Label CSF on tube and requisition; do not transfer to serum tubes or make microscope slides. QUEST EXPLICITLY DOES NOT OFFER THIS TEST FOR NEW YORK PATIENTS. Confirm the test code is available through the patient's Quest service area and receiving account before collection.",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/12598/encephalitis-antibody-panel-csf?cc=MASTER&p=r",
    "searchAliases": [
      "CSF viral encephalitis antibodies",
      "encephalitis antibody infectious CSF",
      "CSF LCMV measles mumps VZV West Nile"
    ],
    "clinicalCategories": [
      "neurology",
      "infectious"
    ]
  },
  {
    "id": "quest-verified-unusable-audit-next50b-20261116-12600",
    "testCode": "12600",
    "testName": "Meningoencephalitis (Encephalitis) Panel, CSF",
    "status": "active",
    "specimenType": "CSF",
    "drawContainer": "Sterile cup",
    "alternativeContainer": "",
    "transportContainer": "Sterile cup",
    "preferredVolume": "5 mL CSF",
    "minimumVolume": "2.7 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "stability": "Room 4 days; refrigerated 7 days; frozen 30 days",
    "specialLabeling": "Label CSF and exact collection date/time",
    "specialInstructions": "Qualified procedural clinician collects clear CSF directly into an additive-free, sterile leakproof cup/vial. Submit ORIGINAL CSF container REFRIGERATED with cold packs; mark CSF, source and collection date/time. No prepared slide, spin or blood-plasma substitute. Quest explicitly lists THIS panel as NOT AVAILABLE for New York patients. Confirm sample volume across concurrent CSF tests and do not combine different anatomical fluid sources. Confirm the test code is available through the patient's Quest service area and receiving account before collection.",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/12600/meningoencephalitis-encephalitis-panel-csf?cc=MASTER&p=r",
    "searchAliases": [
      "CSF meningoencephalitis antibody panel",
      "CSF encephalitis serology",
      "viral CSF antibodies panel"
    ],
    "clinicalCategories": [
      "neurology",
      "infectious"
    ]
  },
  {
    "id": "quest-verified-unusable-audit-next50b-20261116-12672",
    "testCode": "12672",
    "testName": "Enterovirus Panel, Complement Fixation, CSF",
    "status": "active",
    "specimenType": "CSF",
    "drawContainer": "Sterile cup",
    "alternativeContainer": "",
    "transportContainer": "Sterile cup",
    "preferredVolume": "5 mL CSF",
    "minimumVolume": "2 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "stability": "Room 7 days; refrigerated 14 days; frozen 30 days",
    "specialLabeling": "Label CSF and exact collection date/time",
    "specialInstructions": "A qualified procedural clinician collects CSF into an original sterile leakproof plastic container. Submit original labeled CSF container at ROOM TEMPERATURE (not refrigerated by default). This is complement fixation antibody testing for enterovirus serotypes, not enterovirus PCR. Do not prepare slides/smears, transfer into serum transport, or group with another body fluid. Account-specific acceptance must be confirmed. Confirm the test code is available through the patient's Quest service area and receiving account before collection.",
    "source": "https://intellitestmanager.questdiagnostics.com/home/output/241607",
    "searchAliases": [
      "coxsackie antibodies CSF",
      "enterovirus complement fixation CSF",
      "echovirus CSF antibody",
      "enterovirus CF panel"
    ],
    "clinicalCategories": [
      "infectious",
      "neurology"
    ]
  },
  {
    "id": "quest-verified-unusable-audit-next50b-20261116-12735",
    "testCode": "12735",
    "testName": "Hepatic Function Panel with FIB-4 Index with Reflex to ELF Score",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "alternativeContainer": "",
    "transportContainer": "SST / Gold",
    "preferredVolume": "1 mL serum in spun SST",
    "minimumVolume": "0.5 mL serum",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "Yes",
    "stability": "Serum room 24 hours, refrigerated 72 hours; EDTA whole blood room 48 hours, refrigeration unacceptable",
    "specialLabeling": "Label SERUM and exact collection date/time",
    "specialInstructions": "TWO DISTINCT SPECIMENS REQUIRED. Collect serum into SST Gold/Tiger, allow to clot fully and centrifuge. Submit ORIGINAL SPUN SST sealed in REFRIGERATED bag. Collect one separate FULL Lavender EDTA whole-blood tube for platelet count, invert gently and ship ORIGINAL at ROOM TEMPERATURE. DO NOT refrigerate Lavender. Separate serum and EDTA into different temperature bags. Reflex ELF score when FIB-4 >=1.30 uses the submitted serum. Quest panel's SJC performing-lab notice is not a blanket patient-state restriction; verify Quest account/order code. Confirm the test code is available through the patient's Quest service area and receiving account before collection.",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/12735/hepatic-function-panel-with-fib-4-index-with-reflex-to-elf-score?cc=MASTER&p=r",
    "searchAliases": [
      "LFT FIB4 reflex ELF",
      "hepatic fibrosis panel",
      "FIB-4 fibrosis index with ELF",
      "NASH hepatic function panel"
    ],
    "clinicalCategories": [
      "liver",
      "chemistry",
      "hematology"
    ],
    "additionalDrawRequirements": [
      {
        "container": "Lavender EDTA",
        "count": 1,
        "specimenType": "Whole Blood",
        "purpose": "Required separate FULL Lavender EDTA tube for platelet count/FIB-4",
        "preferredVolume": "One FULL Lavender EDTA tube",
        "minimumVolume": "1 mL whole blood",
        "transportContainer": "Lavender EDTA",
        "transportTemperature": "Room Temperature",
        "transportTemperatureRaw": "Room Temperature",
        "spin": "No",
        "specialLabeling": "Label WHOLE BLOOD, Lavender EDTA, time of collection",
        "specialInstructions": "Draw full lavender EDTA whole blood, invert and submit ORIGINAL whole-blood tube at ROOM TEMPERATURE; never refrigerate, centrifuge or send in the same refrigerated serum bag."
      }
    ]
  },
  {
    "id": "quest-verified-unusable-audit-next50b-20261116-13947",
    "testCode": "13947",
    "testName": "Cytomegalovirus (CMV) Genotype (UL97/UL54/UL56)",
    "status": "active",
    "specimenType": "Whole Blood",
    "drawContainer": "Lavender EDTA",
    "alternativeContainer": "",
    "transportContainer": "Lavender EDTA",
    "preferredVolume": "1 mL EDTA whole blood",
    "minimumVolume": "0.3 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "stability": "Room 48 hours; refrigerated 8 days; frozen 30 days",
    "specialLabeling": "Label WHOLE BLOOD and exact collection date/time",
    "specialInstructions": "Collect one Lavender EDTA WHOLE-BLOOD specimen, gently invert and submit original unopened EDTA tube REFRIGERATED with cold packs. NO serum, heparin, centrifugation or unnecessary transfer. If plasma is specifically needed it has a different 2-hour separation and transfer pathway and is not represented by this entry. Label WHOLE BLOOD, date and time. These three order codes test different CMV drug-resistance gene groups; do not select multiple unless the ordering provider intends to. Confirm the test code is available through the patient's Quest service area and receiving account before collection.",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/13947?cc=MASTER",
    "searchAliases": [
      "CMV genotyping all resistance genes",
      "CMV letermovir ganciclovir resistance",
      "CMV UL97 UL54 UL56"
    ],
    "clinicalCategories": [
      "infectious",
      "virology",
      "molecular"
    ]
  },
  {
    "id": "quest-verified-unusable-audit-next50b-20261116-13948",
    "testCode": "13948",
    "testName": "Cytomegalovirus (CMV) Genotype (UL97/UL54)",
    "status": "active",
    "specimenType": "Whole Blood",
    "drawContainer": "Lavender EDTA",
    "alternativeContainer": "",
    "transportContainer": "Lavender EDTA",
    "preferredVolume": "1 mL EDTA whole blood",
    "minimumVolume": "0.3 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "stability": "Room 48 hours; refrigerated 8 days; frozen 30 days",
    "specialLabeling": "Label WHOLE BLOOD and exact collection date/time",
    "specialInstructions": "Collect one Lavender EDTA WHOLE-BLOOD specimen, gently invert and submit original unopened EDTA tube REFRIGERATED with cold packs. NO serum, heparin, centrifugation or unnecessary transfer. If plasma is specifically needed it has a different 2-hour separation and transfer pathway and is not represented by this entry. Label WHOLE BLOOD, date and time. These three order codes test different CMV drug-resistance gene groups; do not select multiple unless the ordering provider intends to. Confirm the test code is available through the patient's Quest service area and receiving account before collection.",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/13948?cc=MASTER",
    "searchAliases": [
      "CMV ganciclovir resistance",
      "CMV UL97 UL54",
      "CMV maribavir resistance"
    ],
    "clinicalCategories": [
      "infectious",
      "virology",
      "molecular"
    ]
  },
  {
    "id": "quest-verified-unusable-audit-next50b-20261116-13949",
    "testCode": "13949",
    "testName": "Cytomegalovirus (CMV) Genotype (UL56)",
    "status": "active",
    "specimenType": "Whole Blood",
    "drawContainer": "Lavender EDTA",
    "alternativeContainer": "",
    "transportContainer": "Lavender EDTA",
    "preferredVolume": "1 mL EDTA whole blood",
    "minimumVolume": "0.3 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "stability": "Room 48 hours; refrigerated 8 days; frozen 30 days",
    "specialLabeling": "Label WHOLE BLOOD and exact collection date/time",
    "specialInstructions": "Collect one Lavender EDTA WHOLE-BLOOD specimen, gently invert and submit original unopened EDTA tube REFRIGERATED with cold packs. NO serum, heparin, centrifugation or unnecessary transfer. If plasma is specifically needed it has a different 2-hour separation and transfer pathway and is not represented by this entry. Label WHOLE BLOOD, date and time. These three order codes test different CMV drug-resistance gene groups; do not select multiple unless the ordering provider intends to. Confirm the test code is available through the patient's Quest service area and receiving account before collection.",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/13949?cc=MASTER",
    "searchAliases": [
      "CMV letermovir resistance",
      "CMV UL56 gene",
      "CMV terminase mutation"
    ],
    "clinicalCategories": [
      "infectious",
      "virology",
      "molecular"
    ]
  },
  {
    "id": "quest-verified-unusable-audit-next50b-20261116-13954",
    "testCode": "13954",
    "testName": "Culture, Blood with Reflexes",
    "status": "active",
    "specimenType": "Whole Blood",
    "drawContainer": "Blood Culture Bottle · BacT/ALERT FA PLUS (Pale Green)",
    "alternativeContainer": "",
    "transportContainer": "Blood Culture Bottle · BacT/ALERT FA PLUS (Pale Green)",
    "preferredVolume": "8-10 mL per adult blood culture bottle",
    "minimumVolume": "3 mL per bottle",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "stability": "Room 48 hours; refrigerated/frozen unacceptable",
    "specialLabeling": "Label AEROBIC · PALE GREEN blood culture, venipuncture site and exact collection time",
    "specialInstructions": "ADULT paired aerobic/anaerobic culture SET: collect from properly disinfected venipuncture sites into ONE BacT/ALERT FA PLUS PALE GREEN aerobic bottle and ONE BacT/ALERT FN PLUS ORANGE anaerobic bottle. Preferred 8-10 mL WHOLE BLOOD into EACH bottle, minimum 3 mL each. Submit BOTH ORIGINAL inoculated bottles at ROOM TEMPERATURE without transfer, chilling, freezing or preincubation. Label each bottle with patient identifiers, venipuncture site (e.g. LEFT ARM), exact draw time, and AEROBIC or ANAEROBIC bottle. If clinician orders a second distinct blood-culture set, use a separate order and appropriately labeled second pair. Pediatric culture bottle requirements differ and are NOT represented by this adult pathway. Confirm compatibility with local Quest culture bottles. Confirm the test code is available through the patient's Quest service area and receiving account before collection.",
    "source": "https://intellitestmanager.questdiagnostics.com/home/output/274238",
    "searchAliases": [
      "blood culture molecular ID reflex",
      "blood culture with BCID",
      "blood aerobic anaerobic cultures",
      "bacteremia blood cultures"
    ],
    "clinicalCategories": [
      "infectious",
      "microbiology"
    ],
    "additionalDrawRequirements": [
      {
        "container": "Blood Culture Bottle · BacT/ALERT FN PLUS (Orange)",
        "count": 1,
        "specimenType": "Whole Blood",
        "purpose": "Second required ANAEROBIC orange BacT/ALERT bottle",
        "preferredVolume": "8-10 mL whole blood in anaerobic bottle",
        "minimumVolume": "3 mL per anaerobic bottle",
        "transportContainer": "Blood Culture Bottle · BacT/ALERT FN PLUS (Orange)",
        "transportTemperature": "Room Temperature",
        "transportTemperatureRaw": "Room Temperature",
        "spin": "No",
        "specialLabeling": "Label ANAEROBIC · ORANGE blood culture, venipuncture source and exact collection time",
        "specialInstructions": "Collect a separate paired BacT/ALERT FN PLUS ORANGE anaerobic bottle from the same adult blood culture set. Fill 8-10 mL, min 3 mL. Submit ORIGINAL without chilling, preincubation or transfer. Label site, two identifiers, and time."
      }
    ]
  },
  {
    "id": "quest-verified-unusable-audit-next50b-20261116-14168",
    "testCode": "14168",
    "testName": "Phosphoethanolamine (PEA), Urine with Creatinine",
    "status": "active",
    "specimenType": "Urine",
    "drawContainer": "Sterile cup",
    "alternativeContainer": "",
    "transportContainer": "Transport Tube",
    "preferredVolume": "5 mL random unpreserved urine",
    "minimumVolume": "1 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "spin": "No",
    "stability": "Room 5 days; refrigerated 7 days; frozen 28 days, preferred frozen",
    "specialLabeling": "Label URINE and exact collection date/time",
    "specialInstructions": "Collect clean RANDOM urine into plain, unpreserved sterile leakproof Sterile cup; do not add HCl or other chemical preservative. Transfer 5 mL (minimum 1 mL) into one appropriately sized labeled plain plastic Transport Tube, FREEZE aliquot and ship on dry ice. DO NOT submit original room-temperature cup as the frozen aliquot destination. Label RANDOM URINE and collection date/time; do not merge frozen transport aliquot with room/refrigerated urine bags. Quest has a separate urine creatinine result in this assay. Confirm the test code is available through the patient's Quest service area and receiving account before collection.",
    "source": "https://labs.allinahealth.org/Lab/View?customObjectUID=9dc97833-db64-4080-bb01-fbc5e7494f2f&templateUID=ff24f908-cdc8-4068-84eb-6ce60783f288",
    "searchAliases": [
      "urine PEA creatinine",
      "phosphoethanolamine spot urine",
      "hypophosphatasia urine PEA"
    ],
    "clinicalCategories": [
      "metabolic",
      "urinary"
    ]
  },
  {
    "id": "quest-verified-unusable-audit-next50b-20261116-14268",
    "testCode": "14268",
    "testName": "Syphilis VDRL Screen with Reflex to Titer, CSF",
    "status": "active",
    "specimenType": "CSF",
    "drawContainer": "Sterile cup",
    "alternativeContainer": "",
    "transportContainer": "Sterile cup",
    "preferredVolume": "1 mL CSF",
    "minimumVolume": "0.3 mL (verify receiving lab)",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "stability": "Room 4 days; refrigerated 14 days; frozen 6 months",
    "specialLabeling": "Label CSF and exact collection date/time",
    "specialInstructions": "CSF only. Qualified procedural clinician obtains CSF into a sterile leakproof screw-cap container; submit ORIGINAL CSF cup REFRIGERATED with cold packs. VDRL reflexes to titer if reactive. Avoid traumatic/blood-contaminated CSF and label CSF, source and date/time. This is not blood VDRL, RPR or treponemal serology; do not make slides or transfer to ordinary blood specimen tubes. Confirm the test code is available through the patient's Quest service area and receiving account before collection.",
    "source": "https://www.providence.org/-/media/project/psjh/providence/norcal/files/humboldt/lab-manual-rev-18-june-2020.pdf",
    "searchAliases": [
      "CSF VDRL",
      "neurosyphilis VDRL",
      "syphilis reflex titer cerebrospinal fluid"
    ],
    "clinicalCategories": [
      "infectious",
      "neurology"
    ]
  },
  {
    "id": "quest-verified-unusable-audit-next50b-20261116-14273",
    "testCode": "14273",
    "testName": "Cardiometabolic Disease Assessment (CMDA) Panel",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "alternativeContainer": "",
    "transportContainer": "SST / Gold",
    "preferredVolume": "4.5 mL serum from spun SST",
    "minimumVolume": "2.5 mL serum",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "Yes",
    "stability": "Serum room 24h/refrigerated 72h; EDTA whole blood room 48h; random urine room 7 days",
    "specialLabeling": "Label SERUM and exact collection date/time",
    "specialInstructions": "THREE REQUIRED SPECIMEN TYPES in TWO bags. Patient FASTS 9-12 HOURS. Collect 4.5 mL SERUM from spun SST Gold/Tiger using Gold/Tiger usable-yield rules (minimum 2.5 mL); submit ORIGINAL SPUN SST(s) REFRIGERATED. Collect one FULL Lavender EDTA whole-blood tube, invert, submit ORIGINAL at ROOM TEMPERATURE; never refrigerate. Collect at least 10 mL RANDOM UNPRESERVED URINE into one separate Sterile cup, submit ORIGINAL at ROOM TEMPERATURE; do not send a yellow UA tube or gray urine-culture preservative tube. Label SERUM, WHOLE BLOOD, RANDOM URINE separately with patient IDs and collection date/time. Serum fasting insulin resistance components require true fasting. FIB-4 calculation uses platelet count. Confirm the test code is available through the patient's Quest service area and receiving account before collection.",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/14273?cc=MASTER",
    "searchAliases": [
      "CMDA panel",
      "cardiometabolic disease assessment",
      "GLP1 pre-treatment baseline",
      "cardiometabolic screening comprehensive panel"
    ],
    "clinicalCategories": [
      "cardiovascular",
      "metabolic",
      "endocrinology",
      "renal"
    ],
    "usePreferredSerumYield": true,
    "fastingStatus": "required",
    "fastingInstructions": "Fast 9-12 hours before collection; water permitted. Confirm any medications/dietary prep with ordering clinician.",
    "additionalDrawRequirements": [
      {
        "container": "Lavender EDTA",
        "count": 1,
        "specimenType": "Whole Blood",
        "purpose": "Required one full Lavender EDTA tube for CMDA panel",
        "preferredVolume": "One FULL Lavender EDTA whole blood tube",
        "minimumVolume": "1 mL whole blood",
        "transportContainer": "Lavender EDTA",
        "transportTemperature": "Room Temperature",
        "transportTemperatureRaw": "Room Temperature",
        "spin": "No",
        "specialLabeling": "Label WHOLE BLOOD, Lavender EDTA, collection date/time",
        "specialInstructions": "Keep original EDTA whole blood room temperature, not refrigerated, invert to mix, do not spin or pool with serum."
      },
      {
        "container": "Sterile cup",
        "count": 1,
        "specimenType": "Urine",
        "purpose": "Required separate random unpreserved urine sample",
        "preferredVolume": "10 mL random unpreserved urine",
        "minimumVolume": "2 mL",
        "transportContainer": "Sterile cup",
        "transportTemperature": "Room Temperature",
        "transportTemperatureRaw": "Room Temperature",
        "spin": "No",
        "specialLabeling": "Label RANDOM URINE, collection date/time",
        "specialInstructions": "Collect into clean sterile cup, no preservative, and submit original at room temperature; do not substitute urine-culture gray top or yellow UA preservative."
      }
    ]
  },
  {
    "id": "quest-verified-unusable-audit-next50b-20261116-14438",
    "testCode": "14438",
    "testName": "Mycobacteria Culture and Smear with Reflex to AST (Cystic Fibrosis)",
    "status": "active",
    "specimenType": "Sputum",
    "drawContainer": "Sterile cup",
    "alternativeContainer": "",
    "transportContainer": "Sterile cup",
    "preferredVolume": "10 mL lower respiratory sputum",
    "minimumVolume": "2 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "stability": "Room unacceptable; refrigerated 5 days; frozen unacceptable",
    "specialLabeling": "Label SPUTUM and exact collection date/time",
    "specialInstructions": "CYSTIC FIBROSIS RESPIRATORY PATHWAY ONLY. Have patient rinse/gargle with water and cough deeply into sterile leakproof sputum Sterile cup. Collect 10 mL (minimum 2 mL) lower respiratory specimen; avoid saliva. Submit original labeled cup REFRIGERATED with cold packs; do not prepare slide or smear onsite, and DO NOT transfer into bacterial ESwab. Quest laboratory performs AFB microscopy, culture and AST reflex. Three individually labeled early morning specimens on different days may be recommended by provider; no 24-hour pooled sputum. This test is for cystic fibrosis clinical context, confirm appropriateness. Confirm the test code is available through the patient's Quest service area and receiving account before collection.",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/14438/mycobacteria-culture-and-smear-with-reflex-to-ast-cystic-fibrosis?cc=MASTER&p=r",
    "searchAliases": [
      "cystic fibrosis AFB culture",
      "CF mycobacteria sputum",
      "AFB smear reflex susceptibilities",
      "CF respiratory mycobacteria"
    ],
    "clinicalCategories": [
      "infectious",
      "microbiology",
      "respiratory"
    ]
  },
  {
    "id": "quest-verified-unusable-audit-next50b-20261116-14511",
    "testCode": "14511",
    "testName": "Modified Acid Fast Stain Nocardia/Actinomycetes",
    "status": "active",
    "specimenType": "Sputum",
    "drawContainer": "Sterile cup",
    "alternativeContainer": "",
    "transportContainer": "Sterile cup",
    "preferredVolume": "5-10 mL fresh sputum",
    "minimumVolume": "2 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "stability": "Room storage not preferred; refrigerated 5 days; frozen unacceptable",
    "specialLabeling": "Label SPUTUM and exact collection date/time",
    "specialInstructions": "RESPIRATORY SPUTUM PATHWAY ONLY. Instruct patient to rinse/gargle mouth with water, cough deeply into one sterile leakproof Sterile cup; saliva is unacceptable. Obtain 5-10 mL (minimum 2 mL) and submit the ORIGINAL closed Sputum cup REFRIGERATED. Quest LAB performs modified acid-fast stain: do not make/send patient-site smear or glass microscope slide, which Quest rejects for this code. Provider may request three distinct collections over 8-24 hours including one first-morning sputum; each separate specimen needs a separate label/order. Never pool a 24-hour sputum collection; also consider sending appropriate culture order in addition to stain as Quest recommends. Confirm the test code is available through the patient's Quest service area and receiving account before collection.",
    "source": "https://intellitestmanager.questdiagnostics.com/home/output/216636",
    "searchAliases": [
      "modified AFB stain Nocardia",
      "Nocardia stain",
      "actinomycetes modified acid fast",
      "Kinyoun nocardia sputum"
    ],
    "clinicalCategories": [
      "infectious",
      "microbiology",
      "respiratory"
    ]
  }
];
for(const entry of additions){
 const existing=window.SEED_TESTS.find(x=>String(x.testCode||'').trim()===entry.testCode);
 if(!existing){window.SEED_TESTS.push(entry);continue;}
 if(existing.status==='reference'||existing.status==='pending')Object.assign(existing,entry,{id:existing.id||entry.id});
}
})();
