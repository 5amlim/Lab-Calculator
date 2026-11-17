/* Quest next 100 reference audit entries after 16252, through 18011.
 * Activate only 20 verified local pathways. Keep kit-dependent BK urine PCR
 * 16581, donor/pathology/cytogenetics, unsupported IHC/slide/isolate/kit,
 * and ambiguous fluid specimens as references. Do not overwrite active/blocked.
 */
(()=>{'use strict';if(!Array.isArray(window.SEED_TESTS))return;
const additions=[
  {
    "id": "quest-verified-audit-next100-20261116-16302",
    "testCode": "16302",
    "testName": "Campylobacter species Antigen, EIA",
    "status": "active",
    "specimenType": "Stool",
    "drawContainer": "Sterile cup",
    "alternativeContainer": "",
    "transportContainer": "Cary-Blair Stool Culture Transport Medium",
    "preferredVolume": "10 g stool in modified Cary-Blair",
    "minimumVolume": "5 g stool",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "stability": "Cary-Blair: room 4 days; refrigerated 4 days; frozen unacceptable",
    "specialLabeling": "Label STOOL, patient identifiers and collection date/time",
    "specialInstructions": "Collect stool in a clean dry Sterile cup without urine, water or diaper contamination. Transfer a sufficient mass of fresh stool into MODIFIED Cary-Blair enteric culture medium, following the manufacturer's fill line and mixing instructions. The official Quest requirement is unusually large (10 g preferred; 5 g minimum): verify Cary-Blair vial capacity and consult Quest if vial cannot accommodate that mass before accepting. Submit Cary-Blair original vial at room temperature; raw/unpreserved stool is rejected. This is Campylobacter stool ANTIGEN EIA, not Campylobacter culture. One compatible stool source cup may serve other stool orders when the source volume is adequate, but submit distinct required preservative media. Verify the performing Quest account, patient service area, and any local supply restrictions before collection.",
    "searchAliases": [
      "campylobacter antigen",
      "campy eia stool",
      "campylobacter stool immunoassay",
      "campy ELISA"
    ],
    "clinicalCategories": [
      "infectious",
      "gastrointestinal",
      "microbiology"
    ],
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/16302/campylobacter-species-antigen-eia?cc=MET"
  },
  {
    "id": "quest-verified-audit-next100-20261116-16326",
    "testCode": "16326",
    "testName": "XSense, Fragile X with Reflex and Chromosome Analysis, Blood",
    "status": "active",
    "specimenType": "Whole Blood",
    "drawContainer": "Green Sodium Heparin",
    "alternativeContainer": "",
    "transportContainer": "Green Sodium Heparin",
    "preferredVolume": "5 mL sodium-heparin whole blood AND separate 5 mL EDTA whole blood",
    "minimumVolume": "1 mL heparin blood + 2 mL EDTA blood",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "stability": "Ambient preferred; frozen unacceptable; Quest specifies no refrigeration",
    "specialLabeling": "Label WHOLE BLOOD · GREEN SODIUM HEPARIN, date/time; separate Lavender EDTA labeled independently",
    "specialInstructions": "TWO separate ORIGINAL whole-blood tubes required. Collect 5 mL GREEN SODIUM HEPARIN whole blood (minimum 1 mL), and a completely separate 5 mL LAVENDER EDTA whole blood (minimum 2 mL). Gently invert; cap and submit each intact original tube ROOM TEMPERATURE. DO NOT refrigerate, freeze, centrifuge, transfer or share either tube. This test includes laboratory chromosome analysis; clinic does not prepare or submit microscope slides. Confirm authorization and genetic testing requirements before collection. Verify the performing Quest account, patient service area, and any local supply restrictions before collection.",
    "searchAliases": [
      "FMR1 and karyotype",
      "fragile X with chromosome blood",
      "XSense chromosome analysis",
      "fragile X genetic analysis"
    ],
    "clinicalCategories": [
      "genetics",
      "neurology"
    ],
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/16326/xsense-fragile-x-with-reflex-and-chromosome-analysis-blood?cc=MASTER&p=r",
    "additionalDrawRequirements": [
      {
        "container": "Lavender EDTA",
        "count": 1,
        "specimenType": "Whole Blood",
        "purpose": "Separate EDTA specimen mandatory for Fragile X with chromosome analysis",
        "preferredVolume": "5 mL EDTA whole blood",
        "minimumVolume": "2 mL whole blood",
        "transportContainer": "Lavender EDTA",
        "transportTemperature": "Room Temperature",
        "transportTemperatureRaw": "Room Temperature",
        "spin": "No",
        "specialLabeling": "Label WHOLE BLOOD, LAVENDER EDTA, exact collection time",
        "specialInstructions": "Collect a second separate Lavender EDTA whole-blood tube, 5 mL preferred, 2 mL minimum. Submit original whole-blood tube at ROOM TEMPERATURE. Never refrigerate, freeze, centrifuge, or pool with the green sodium-heparin tube."
      }
    ]
  },
  {
    "id": "quest-verified-audit-next100-20261116-16442",
    "testCode": "16442",
    "testName": "JC Polyoma Virus DNA, Quantitative, Real-Time PCR, CSF",
    "status": "active",
    "specimenType": "CSF",
    "drawContainer": "Sterile cup",
    "alternativeContainer": "",
    "transportContainer": "Transport Tube",
    "preferredVolume": "0.7 mL CSF",
    "minimumVolume": "0.3 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "spin": "No",
    "stability": "Room 48 hours; refrigerated 7 days; frozen 30 days",
    "specialLabeling": "Label CSF, collection date/time and source",
    "specialInstructions": "Qualified procedural clinician collects clear CSF in sterile leakproof plastic cup/vial. Transfer 0.7 mL CSF into one additive-free plastic screw-cap Transport Tube; FREEZE aliquot promptly and ship frozen on dry ice. Label CSF and collection date/time and source. Never combine with other frozen CSF assays in the same transport vial unless receiving laboratory explicitly permits, and never mix serum or other fluid. This is QUANTITATIVE JC virus CSF PCR, not qualitative PCR or blood/urine JC testing. Verify the performing Quest account, patient service area, and any local supply restrictions before collection.",
    "searchAliases": [
      "JCV quantitative CSF",
      "PML JC PCR CSF",
      "JC virus DNA CSF quantitative",
      "JC polyoma copies CSF"
    ],
    "clinicalCategories": [
      "neurology",
      "infectious",
      "molecular"
    ],
    "source": "https://www.geisingermedicallabs.com/catalog/Details?tid=2184"
  },
  {
    "id": "quest-verified-audit-next100-20261116-16595",
    "testCode": "16595",
    "testName": "Syphilis (Treponema pallidum DNA), Qualitative Real-Time PCR",
    "status": "active",
    "specimenType": "CSF",
    "drawContainer": "Sterile cup",
    "alternativeContainer": "",
    "transportContainer": "Sterile cup",
    "preferredVolume": "0.7 mL CSF",
    "minimumVolume": "0.3 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "stability": "CSF room 7 days; refrigerated 14 days; frozen 30 days",
    "specialLabeling": "Label CSF, collection date/time and source",
    "specialInstructions": "CSF collection route only. Qualified procedural clinician obtains clear CSF in sterile leakproof Sterile cup; submit ORIGINAL closed container REFRIGERATED with cold packs. DO NOT replace this with a genital lesion swab route unless the separate transport-medium protocol is verified. Indicate CSF source and collection date/time; no slide preparation. This is pathogen DNA PCR, not blood RPR, CSF VDRL or FTA-ABS serology. Verify the performing Quest account, patient service area, and any local supply restrictions before collection.",
    "searchAliases": [
      "T pallidum PCR CSF",
      "neurosyphilis PCR",
      "syphilis CSF molecular test",
      "treponema DNA"
    ],
    "clinicalCategories": [
      "infectious",
      "neurology",
      "molecular"
    ],
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/16595/treponema-pallidum-dna-qualitative-real-time-pcr?cc=MASTER"
  },
  {
    "id": "quest-verified-audit-next100-20261116-16602",
    "testCode": "16602",
    "testName": "Iodine, 24-Hour Urine",
    "status": "active",
    "specimenType": "24-Hour Urine",
    "drawContainer": "24-Hour Urine Container (no preservative)",
    "alternativeContainer": "",
    "transportContainer": "Sterile cup",
    "preferredVolume": "10 mL well-mixed 24-hour urine aliquot",
    "minimumVolume": "2 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "stability": "Room 10 days; refrigerated 10 days; frozen unacceptable",
    "specialLabeling": "Label 24-HOUR URINE, TOTAL VOLUME and collection START/END date/time",
    "specialInstructions": "Use PLAIN NO-PRESERVATIVE 24-hour urine jug, refrigerating the source collection during the 24-hour period. Discard first morning urine, then collect ALL urine until and including the same time next day. At completion record TOTAL 24-HOUR URINE VOLUME, start and end date/time, mix the jug thoroughly, and TRANSFER 10 mL (minimum 2 mL) into a labeled screw-cap Sterile cup. Submit aliquot at ROOM TEMPERATURE. Do not acidify or use an acid-washed specialty container on the default pathway, and DO NOT freeze. Verify the performing Quest account, patient service area, and any local supply restrictions before collection.",
    "searchAliases": [
      "24h urinary iodine",
      "iodine 24 hour urine",
      "urine iodine 24 h",
      "iodine excretion"
    ],
    "clinicalCategories": [
      "endocrinology",
      "urinary",
      "trace-elements"
    ],
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/16602/iodine-24-hour-urine?cc=MASTER&p=r"
  },
  {
    "id": "quest-verified-audit-next100-20261116-16867",
    "testCode": "16867",
    "testName": "Selenium, Random Urine with Creatinine",
    "status": "active",
    "specimenType": "Urine",
    "drawContainer": "Trace Metal-Free Plastic Container",
    "alternativeContainer": "",
    "transportContainer": "Trace Metal-Free Plastic Container",
    "preferredVolume": "7 mL random urine",
    "minimumVolume": "Quest minimum not stated; verify",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "stability": "Room 5 days; refrigerated 14 days; frozen 30 days",
    "specialLabeling": "Label RANDOM URINE · TRACE METAL-FREE, date/time",
    "specialInstructions": "Collect RANDOM URINE directly into acid-washed / TRACE METAL-FREE PLASTIC urine container. Submit ORIGINAL metal-free container at ROOM TEMPERATURE with no transfer or preservatives. Avoid worksite collection and contamination. May share an adequately filled SAME-TEMPERATURE compatible trace-metal-free container, but NOT ordinary Sterile cup urine or refrigerated trace-metal panels. THIS CODE is for NON-NEW YORK patients: Quest directs New York patients to code 8829, which has different temperature requirements. Verify the performing Quest account, patient service area, and any local supply restrictions before collection.",
    "searchAliases": [
      "urinary selenium creatinine",
      "selenium trace metal random urine",
      "Se urine/creatinine",
      "selenium exposure urine"
    ],
    "clinicalCategories": [
      "heavy-metals",
      "urinary",
      "toxicology"
    ],
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/16867/selenium-random-urine-with-creatinine?cc=MASTER&p=r"
  },
  {
    "id": "quest-verified-audit-next100-20261116-16993",
    "testCode": "16993",
    "testName": "Protein, Total, 12-Hour Urine with Creatinine",
    "status": "active",
    "specimenType": "12-Hour Urine",
    "drawContainer": "24-Hour Urine Container (no preservative)",
    "alternativeContainer": "",
    "transportContainer": "Sterile cup",
    "preferredVolume": "10 mL well-mixed 12-hour unpreserved urine",
    "minimumVolume": "2 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "stability": "Room 4 days; refrigerated 5 days; frozen 30 days",
    "specialLabeling": "Label 12-HOUR URINE, TOTAL VOLUME and collection START/END date/time",
    "specialInstructions": "Collect ALL urine over EXACTLY 12 HOURS in the clinic's PLAIN no-preservative timed-urine jug, refrigerating source collection while collecting. Discard initial void; include final void at 12-hour cutoff. Record TOTAL 12-HOUR URINE VOLUME and exact start/end date/time. Mix full collection and transfer 10 mL (minimum 2 mL) into a separate sterile plastic leakproof Sterile cup, then submit the aliquot ROOM TEMPERATURE. Acidified urine is rejected. This order is NOT a 24-hour urine or random cup; label 12-HOUR collection explicitly. Verify the performing Quest account, patient service area, and any local supply restrictions before collection.",
    "searchAliases": [
      "protein urine 12 hour",
      "12 h urine protein creatinine",
      "12 hour total protein urine",
      "orthostatic protein timed urine"
    ],
    "clinicalCategories": [
      "renal",
      "urinary"
    ],
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/16993/?cc=MASTER"
  },
  {
    "id": "quest-verified-audit-next100-20261116-17088",
    "testCode": "17088",
    "testName": "Treponema pallidum Antibody, IFA, CSF",
    "status": "active",
    "specimenType": "CSF",
    "drawContainer": "Sterile cup",
    "alternativeContainer": "",
    "transportContainer": "Sterile cup",
    "preferredVolume": "1 mL CSF",
    "minimumVolume": "0.3 mL; verify Quest site",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "stability": "Refrigerate for transport; verify exact holding period with Quest",
    "specialLabeling": "Label CSF, collection date/time and source",
    "specialInstructions": "Qualified procedural clinician collects cerebrospinal fluid aseptically in clean sterile leakproof plastic screw-cap vial/cup. Submit ORIGINAL closed CSF container REFRIGERATED. No microscope slide or smear required of clinic; Quest performs immunofluorescent antibody assay. This is a CSF TREPONEMAL IFA (FTA-ABS), not CSF VDRL (14268), serum FTA-ABS (4112) or PCR (16595). Confirm exact temperature, stability and volume by service area if necessary. Verify the performing Quest account, patient service area, and any local supply restrictions before collection.",
    "searchAliases": [
      "CSF FTA ABS",
      "neurosyphilis treponemal antibody",
      "FTA ABS CSF",
      "Treponema pallidum IgG IFA"
    ],
    "clinicalCategories": [
      "infectious",
      "neurology",
      "immunology"
    ],
    "source": "https://testdirectory.questdiagnostics.com/test/test-guides/CF_Syphilis/syphilis-laboratory-support-for-screening-diagnosis-and-monitoring"
  },
  {
    "id": "quest-verified-audit-next100-20261116-17415",
    "testCode": "17415",
    "testName": "Amylase, Pleural Fluid",
    "status": "active",
    "specimenType": "Pleural Fluid",
    "drawContainer": "Sterile cup",
    "alternativeContainer": "",
    "transportContainer": "Transport Tube",
    "preferredVolume": "2 mL pleural fluid",
    "minimumVolume": "0.5 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "spin": "Yes",
    "stability": "Room 7 days; refrigerated 28 days; frozen 28 days",
    "specialLabeling": "Label PLEURAL FLUID, exact site and collection date/time",
    "specialInstructions": "Qualified procedural clinician obtains Pleural Fluid directly in a separate sterile leakproof plastic Sterile cup without anticoagulant/preservative. LABEL PLEURAL FLUID with exact anatomical source, collection date and time and two patient identifiers. Centrifuge to remove cellular material and TRANSFER the clear supernatant into an additive-free screw-cap Transport Tube. Keep specimen distinct from other body-fluid sources, CSF and urine. Submit the aliquot FROZEN in its own temperature-appropriate specimen bag. FREEZE the transfer aliquot and ship frozen on dry ice, with one labeled frozen tube per assay. This pleural assay is a separate Quest code from peritoneal amylase 17414; verify site-specific pleural requirements before collection. Verify the performing Quest account, patient service area, and any local supply restrictions before collection.",
    "searchAliases": [
      "pleural amylase",
      "thoracentesis fluid amylase",
      "amylase pleural effusion"
    ],
    "clinicalCategories": [
      "body-fluids",
      "chemistry"
    ],
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/17414/amylase-peritoneal-fluid?cc=MASTER&p=r"
  },
  {
    "id": "quest-verified-audit-next100-20261116-17424",
    "testCode": "17424",
    "testName": "Glucose, Peritoneal Fluid",
    "status": "active",
    "specimenType": "Peritoneal Fluid",
    "drawContainer": "Sterile cup",
    "alternativeContainer": "",
    "transportContainer": "Transport Tube",
    "preferredVolume": "1 mL peritoneal fluid",
    "minimumVolume": "0.5 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "spin": "Yes",
    "stability": "Room/refrigerated unacceptable for this Quest-referral pathway; frozen 7 days",
    "specialLabeling": "Label PERITONEAL FLUID, exact site and collection date/time",
    "specialInstructions": "Qualified procedural clinician obtains Peritoneal Fluid directly in a separate sterile leakproof plastic Sterile cup without anticoagulant/preservative. LABEL PERITONEAL FLUID with exact anatomical source, collection date and time and two patient identifiers. Centrifuge to remove cellular material and TRANSFER the clear supernatant into an additive-free screw-cap Transport Tube. Keep specimen distinct from other body-fluid sources, CSF and urine. Submit the aliquot FROZEN in its own temperature-appropriate specimen bag. FREEZE the transfer aliquot and ship frozen on dry ice, with one labeled frozen tube per assay. Specific Quest-referral instructions require FROZEN vial; do not substitute ambient transport. Verify the performing Quest account, patient service area, and any local supply restrictions before collection.",
    "searchAliases": [
      "peritoneal fluid glucose",
      "ascites glucose",
      "peritoneal glucose",
      "fluid glucose"
    ],
    "clinicalCategories": [
      "body-fluids",
      "chemistry"
    ],
    "source": "https://wardelab.com/test/glucose-peritoneal-fluid/"
  },
  {
    "id": "quest-verified-audit-next100-20261116-17425",
    "testCode": "17425",
    "testName": "Glucose, Pleural Fluid",
    "status": "active",
    "specimenType": "Pleural Fluid",
    "drawContainer": "Sterile cup",
    "alternativeContainer": "",
    "transportContainer": "Transport Tube",
    "preferredVolume": "1 mL pleural fluid",
    "minimumVolume": "0.5 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "spin": "Yes",
    "stability": "Use frozen pleural-fluid vial; confirm receiving Quest lab's exact holding period",
    "specialLabeling": "Label PLEURAL FLUID, exact site and collection date/time",
    "specialInstructions": "Qualified procedural clinician obtains Pleural Fluid directly in a separate sterile leakproof plastic Sterile cup without anticoagulant/preservative. LABEL PLEURAL FLUID with exact anatomical source, collection date and time and two patient identifiers. Centrifuge to remove cellular material and TRANSFER the clear supernatant into an additive-free screw-cap Transport Tube. Keep specimen distinct from other body-fluid sources, CSF and urine. Submit the aliquot FROZEN in its own temperature-appropriate specimen bag. FREEZE the transfer aliquot and ship frozen on dry ice, with one labeled frozen tube per assay. Quest order 17425 is separate from peritoneal glucose code 17424. Confirm lab-specific freezing preference before collection. Verify the performing Quest account, patient service area, and any local supply restrictions before collection.",
    "searchAliases": [
      "pleural glucose",
      "thoracentesis glucose",
      "pleural fluid glucose"
    ],
    "clinicalCategories": [
      "body-fluids",
      "chemistry"
    ],
    "source": "https://www.biomarkerlens.com/biomarkers/glucose-pleural-fluid-9656"
  },
  {
    "id": "quest-verified-audit-next100-20261116-17428",
    "testCode": "17428",
    "testName": "Protein, Total, Peritoneal Fluid",
    "status": "active",
    "specimenType": "Peritoneal Fluid",
    "drawContainer": "Sterile cup",
    "alternativeContainer": "",
    "transportContainer": "Transport Tube",
    "preferredVolume": "1 mL peritoneal fluid",
    "minimumVolume": "0.5 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "spin": "Yes",
    "stability": "Room 7 days; refrigerated 28 days; frozen 28 days",
    "specialLabeling": "Label PERITONEAL FLUID, exact site and collection date/time",
    "specialInstructions": "Qualified procedural clinician obtains Peritoneal Fluid directly in a separate sterile leakproof plastic Sterile cup without anticoagulant/preservative. LABEL PERITONEAL FLUID with exact anatomical source, collection date and time and two patient identifiers. Centrifuge to remove cellular material and TRANSFER the clear supernatant into an additive-free screw-cap Transport Tube. Keep specimen distinct from other body-fluid sources, CSF and urine. Submit the aliquot FROZEN in its own temperature-appropriate specimen bag. FREEZE the transfer aliquot and ship frozen on dry ice, with one labeled frozen tube per assay. Frozen transport is required by the Quest-referral test catalog for this pathway. Verify the performing Quest account, patient service area, and any local supply restrictions before collection.",
    "searchAliases": [
      "ascitic protein",
      "peritoneal protein total",
      "ascites protein",
      "peritoneal TP"
    ],
    "clinicalCategories": [
      "body-fluids",
      "chemistry"
    ],
    "source": "https://wardelab.com/test/protein-total-peritoneal-fluid/"
  },
  {
    "id": "quest-verified-audit-next100-20261116-17429",
    "testCode": "17429",
    "testName": "Protein, Total, Pericardial Fluid",
    "status": "active",
    "specimenType": "Pericardial Fluid",
    "drawContainer": "Sterile cup",
    "alternativeContainer": "",
    "transportContainer": "Transport Tube",
    "preferredVolume": "1 mL pericardial fluid",
    "minimumVolume": "1 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "Yes",
    "stability": "Room 7 days; refrigerated up to 28 days; frozen 60 days",
    "specialLabeling": "Label PERICARDIAL FLUID, exact site and collection date/time",
    "specialInstructions": "Qualified procedural clinician obtains Pericardial Fluid directly in a separate sterile leakproof plastic Sterile cup without anticoagulant/preservative. LABEL PERICARDIAL FLUID with exact anatomical source, collection date and time and two patient identifiers. Centrifuge to remove cellular material and TRANSFER the clear supernatant into an additive-free screw-cap Transport Tube. Keep specimen distinct from other body-fluid sources, CSF and urine. Submit the aliquot ROOM TEMPERATURE in its own temperature-appropriate specimen bag.  PERICARDIAL not PERITONEAL. Document collection site and clinician collection source. Verify the performing Quest account, patient service area, and any local supply restrictions before collection.",
    "searchAliases": [
      "pericardial protein total",
      "pericardial effusion protein",
      "protein pericardial fluid"
    ],
    "clinicalCategories": [
      "body-fluids",
      "chemistry"
    ],
    "source": "https://www.casandra.ai/catalog/lab/quest-diagnostics/test/protein-total-pericardial-fluid"
  },
  {
    "id": "quest-verified-audit-next100-20261116-17585",
    "testCode": "17585",
    "testName": "Cholesterol, Peritoneal Fluid",
    "status": "active",
    "specimenType": "Peritoneal Fluid",
    "drawContainer": "Sterile cup",
    "alternativeContainer": "",
    "transportContainer": "Transport Tube",
    "preferredVolume": "1 mL peritoneal fluid",
    "minimumVolume": "0.5 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "spin": "Yes",
    "stability": "Frozen 30 days; refrigerated 7 days; room 24 hours",
    "specialLabeling": "Label PERITONEAL FLUID, exact site and collection date/time",
    "specialInstructions": "Qualified procedural clinician obtains Peritoneal Fluid directly in a separate sterile leakproof plastic Sterile cup without anticoagulant/preservative. LABEL PERITONEAL FLUID with exact anatomical source, collection date and time and two patient identifiers. Centrifuge to remove cellular material and TRANSFER the clear supernatant into an additive-free screw-cap Transport Tube. Keep specimen distinct from other body-fluid sources, CSF and urine. Submit the aliquot FROZEN in its own temperature-appropriate specimen bag. FREEZE the transfer aliquot and ship frozen on dry ice, with one labeled frozen tube per assay. Use dedicated FROZEN lipid aliquot, not the same tube as room-temperature fluid chemistry; this handling follows validated body-fluid lipid processing. Verify the performing Quest account, patient service area, and any local supply restrictions before collection.",
    "searchAliases": [
      "ascites cholesterol",
      "peritoneal fluid cholesterol",
      "cholesterol effusion"
    ],
    "clinicalCategories": [
      "body-fluids",
      "chemistry"
    ],
    "source": "https://www.mayocliniclabs.com/test-catalog/Overview/606915"
  },
  {
    "id": "quest-verified-audit-next100-20261116-17588",
    "testCode": "17588",
    "testName": "LD, Peritoneal Fluid",
    "status": "active",
    "specimenType": "Peritoneal Fluid",
    "drawContainer": "Sterile cup",
    "alternativeContainer": "",
    "transportContainer": "Transport Tube",
    "preferredVolume": "1 mL peritoneal fluid",
    "minimumVolume": "0.5 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "Yes",
    "stability": "Room 7 days; refrigerated 48 hours; frozen unacceptable",
    "specialLabeling": "Label PERITONEAL FLUID, exact site and collection date/time",
    "specialInstructions": "Qualified procedural clinician obtains Peritoneal Fluid directly in a separate sterile leakproof plastic Sterile cup without anticoagulant/preservative. LABEL PERITONEAL FLUID with exact anatomical source, collection date and time and two patient identifiers. Centrifuge to remove cellular material and TRANSFER the clear supernatant into an additive-free screw-cap Transport Tube. Keep specimen distinct from other body-fluid sources, CSF and urine. Submit the aliquot ROOM TEMPERATURE in its own temperature-appropriate specimen bag.  Quest body-fluid LD instructions explicitly direct PERITONEAL specimens to code 17588. Never freeze. Verify the performing Quest account, patient service area, and any local supply restrictions before collection.",
    "searchAliases": [
      "LDH ascites",
      "peritoneal LD",
      "peritoneal lactate dehydrogenase",
      "ascites LDH"
    ],
    "clinicalCategories": [
      "body-fluids",
      "chemistry"
    ],
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/94675/lactate-dehydrogenase-ld-body-fluid?cc=MASTER&p=r"
  },
  {
    "id": "quest-verified-audit-next100-20261116-17591",
    "testCode": "17591",
    "testName": "Triglycerides, Peritoneal Fluid",
    "status": "active",
    "specimenType": "Peritoneal Fluid",
    "drawContainer": "Sterile cup",
    "alternativeContainer": "",
    "transportContainer": "Transport Tube",
    "preferredVolume": "1 mL peritoneal fluid",
    "minimumVolume": "0.5 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "spin": "Yes",
    "stability": "Frozen 30 days; refrigerated 7 days; room 24 hours",
    "specialLabeling": "Label PERITONEAL FLUID, exact site and collection date/time",
    "specialInstructions": "Qualified procedural clinician obtains Peritoneal Fluid directly in a separate sterile leakproof plastic Sterile cup without anticoagulant/preservative. LABEL PERITONEAL FLUID with exact anatomical source, collection date and time and two patient identifiers. Centrifuge to remove cellular material and TRANSFER the clear supernatant into an additive-free screw-cap Transport Tube. Keep specimen distinct from other body-fluid sources, CSF and urine. Submit the aliquot FROZEN in its own temperature-appropriate specimen bag. FREEZE the transfer aliquot and ship frozen on dry ice, with one labeled frozen tube per assay. Dedicated frozen fluid-lipid aliquot; verify Quest-specific processing with receiving location. Verify the performing Quest account, patient service area, and any local supply restrictions before collection.",
    "searchAliases": [
      "ascitic triglycerides",
      "chylous ascites triglyceride",
      "TG peritoneal fluid"
    ],
    "clinicalCategories": [
      "body-fluids",
      "chemistry"
    ],
    "source": "https://www.mayocliniclabs.com/test-catalog/Overview/800539"
  },
  {
    "id": "quest-verified-audit-next100-20261116-17642",
    "testCode": "17642",
    "testName": "CA 19-9, Pleural Fluid",
    "status": "active",
    "specimenType": "Pleural Fluid",
    "drawContainer": "Sterile cup",
    "alternativeContainer": "",
    "transportContainer": "Transport Tube",
    "preferredVolume": "2 mL pleural fluid",
    "minimumVolume": "0.5 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "spin": "Yes",
    "stability": "Room 7 days; refrigerated 14 days; frozen 90 days",
    "specialLabeling": "Label PLEURAL FLUID, exact site and collection date/time",
    "specialInstructions": "Qualified procedural clinician obtains Pleural Fluid directly in a separate sterile leakproof plastic Sterile cup without anticoagulant/preservative. LABEL PLEURAL FLUID with exact anatomical source, collection date and time and two patient identifiers. Centrifuge to remove cellular material and TRANSFER the clear supernatant into an additive-free screw-cap Transport Tube. Keep specimen distinct from other body-fluid sources, CSF and urine. Submit the aliquot FROZEN in its own temperature-appropriate specimen bag. FREEZE the transfer aliquot and ship frozen on dry ice, with one labeled frozen tube per assay. Use dedicated frozen original-sample transfer; do not confuse with serum or pericardial CA19-9. Verify the performing Quest account, patient service area, and any local supply restrictions before collection.",
    "searchAliases": [
      "pleural CA19-9",
      "pleural tumor marker 19-9",
      "pleural cancer antigen"
    ],
    "clinicalCategories": [
      "body-fluids",
      "chemistry"
    ],
    "source": "https://www.casandra.ai/catalog/test/ca-19-9-pleural-fluid"
  },
  {
    "id": "quest-verified-audit-next100-20261116-17787",
    "testCode": "17787",
    "testName": "California Encephalitis Virus Antibody Panel, IFA, CSF",
    "status": "active",
    "specimenType": "CSF",
    "drawContainer": "Sterile cup",
    "alternativeContainer": "",
    "transportContainer": "Sterile cup",
    "preferredVolume": "1 mL CSF",
    "minimumVolume": "0.3 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "stability": "Room 4 days; refrigerated 7 days; frozen 30 days",
    "specialLabeling": "Label CSF, collection date/time and source",
    "specialInstructions": "Qualified procedural clinician collects CSF into sterile screw-cap Sterile cup. Ship original container REFRIGERATED (2-8°C) with cold packs. Lab conducts IgG/IgM IFA; clinic must not prepare slides. Label CSF and source, date, time. Do not substitute arbovirus serology in serum or another encephalitis panel. Verify the performing Quest account, patient service area, and any local supply restrictions before collection.",
    "searchAliases": [
      "California encephalitis IFA CSF",
      "La Crosse virus CSF IgG IgM",
      "arbovirus CSF California encephalitis"
    ],
    "clinicalCategories": [
      "neurology",
      "infectious"
    ],
    "source": "https://intellitestmanager.questdiagnostics.com/home/output/241607"
  },
  {
    "id": "quest-verified-audit-next100-20261116-17788",
    "testCode": "17788",
    "testName": "Coccidioides Antibody (IgG), Immunodiffusion, CSF",
    "status": "active",
    "specimenType": "CSF",
    "drawContainer": "Sterile cup",
    "alternativeContainer": "",
    "transportContainer": "Sterile cup",
    "preferredVolume": "1 mL CSF",
    "minimumVolume": "0.3 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "stability": "Room 7 days; refrigerated 14 days; frozen 30 days",
    "specialLabeling": "Label CSF, collection date/time and source",
    "specialInstructions": "Qualified procedural clinician obtains sterile CSF, submit ORIGINAL leakproof plastic Sterile cup at ROOM TEMPERATURE. Label CSF and date/time; do not mix with serum or other body fluid, do not prepare slides. This is IgG IMMUNODIFFUSION, not complement fixation CSF code 5295. Allow enough specimen for all separately ordered CSF studies. Verify the performing Quest account, patient service area, and any local supply restrictions before collection.",
    "searchAliases": [
      "cocci CSF immunodiffusion",
      "valley fever IgG CSF",
      "coccidioides ID CSF"
    ],
    "clinicalCategories": [
      "infectious",
      "neurology"
    ],
    "source": "https://www.casandra.ai/catalog/lab/quest-diagnostics/test/coccidioides-antibody-igg-immunodiffusion-csf"
  },
  {
    "id": "quest-verified-audit-next100-20261116-17808",
    "testCode": "17808",
    "testName": "Western Equine Encephalitis Virus (IgG, IgM) Antibody Panel, IFA, CSF",
    "status": "active",
    "specimenType": "CSF",
    "drawContainer": "Sterile cup",
    "alternativeContainer": "",
    "transportContainer": "Sterile cup",
    "preferredVolume": "1 mL CSF",
    "minimumVolume": "0.3 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "stability": "Room 4 days; refrigerated 7 days; frozen 30 days",
    "specialLabeling": "Label CSF, collection date/time and source",
    "specialInstructions": "Qualified procedural clinician obtains aseptic CSF in sterile plastic screw-cap vial/cup. Submit original closed CSF container REFRIGERATED. Quest laboratory performs antibodies IgG/IgM IFA, not clinical staff. Label CSF and exact date/time, avoid blood contamination; do not pool with distinct anatomical fluid specimen. Verify the performing Quest account, patient service area, and any local supply restrictions before collection.",
    "searchAliases": [
      "western equine encephalitis antibodies CSF",
      "WEEV IgG IgM CSF",
      "WEE encephalitis IFA"
    ],
    "clinicalCategories": [
      "neurology",
      "infectious"
    ],
    "source": "https://intellitestmanager.questdiagnostics.com/home/output/241607"
  }
];
for(const entry of additions){
 const existing=window.SEED_TESTS.find(x=>String(x.testCode||'').trim()===entry.testCode);
 if(!existing){window.SEED_TESTS.push(entry);continue;}
 if(existing.status==='reference'||existing.status==='pending')Object.assign(existing,entry,{id:existing.id||entry.id});
}
})();
