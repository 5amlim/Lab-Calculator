/* Quest 2026-11-16 not-usable audit records 101-120; 15 validated collection paths.
 * No clinic specimen slides/smears, hair/nails, acid-preserved urine, dedicated
 * pinworm kit, proprietary beta-2 microglobulin tube, or fungal blood bottles.
 * Do not overwrite existing active or blocked reference entries.
 * Final safety policy: never make HAIR/NAIL specimens cart-selectable.
 */
(()=>{'use strict';if(!Array.isArray(window.SEED_TESTS))return;
const additions=[
  {
    "id": "quest-verified-unusable-audit-sixth20-20261116-4489",
    "testCode": "4489",
    "testName": "Vibrio, Culture",
    "status": "active",
    "specimenType": "Stool",
    "drawContainer": "Sterile cup",
    "alternativeContainer": "",
    "transportContainer": "Cary-Blair Stool Culture Transport Medium",
    "preferredVolume": "1 g or 1 mL stool in filled Cary-Blair vial",
    "minimumVolume": "1 g or 1 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "stability": "Cary-Blair: room 4 days; refrigerated 4 days; frozen unacceptable",
    "specialLabeling": "Label STOOL and collection date/time",
    "specialInstructions": "Collect stool into a clean, dry Sterile cup with no urine or toilet-water contamination. Transfer at least 1 gram or 1 mL stool to a Cary-Blair stool culture vial, filling it to the printed line; mix well. Submit the Cary-Blair vial at room temperature. No direct unpreserved cup submission, Total-Fix, frozen stool, or diaper collection. This is a stool path, not a rectal swab path. Confirm exact test code, specimen source, receiving service area and Quest account before collection.",
    "searchAliases": [
      "vibrio stool culture",
      "cholera culture",
      "vibrio parahaemolyticus culture"
    ],
    "clinicalCategories": [
      "microbiology",
      "infectious",
      "gastrointestinal"
    ],
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/4489/vibrio-culture?cc=MASTER"
  },
  {
    "id": "quest-verified-unusable-audit-sixth20-20261116-4503",
    "testCode": "4503",
    "testName": "Mycobacteria Stain, Acid-Fast, Fluorochrome",
    "status": "active",
    "specimenType": "Sputum",
    "drawContainer": "Sterile cup",
    "alternativeContainer": "",
    "transportContainer": "Sterile cup",
    "preferredVolume": "10 mL freshly expectorated sputum",
    "minimumVolume": "2 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "stability": "Room temperature unacceptable; refrigerated 5 days; frozen unacceptable",
    "specialLabeling": "Label SPUTUM and collection date/time",
    "specialInstructions": "Collect a deep-cough sputum sample after rinsing mouth with water, directly in a leakproof sterile screw-cap cup. Submit the ORIGINAL sputum cup refrigerated, with cold packs. Do not submit saliva, a 24-hour pooled sputum, dry swabs, EDTA/heparin tubes, formalin, or a slide/smear prepared by staff. Quest performs the AFB fluorochrome staining. Three separate early-morning collections on different days may be recommended by the ordering clinician; each is separately labeled and ordered. Follow clinic isolation, biosafety, and TB specimen-handling protocols. Confirm exact test code, specimen source, receiving service area and Quest account before collection.",
    "searchAliases": [
      "afb stain",
      "acid fast stain",
      "fluorochrome sputum",
      "TB smear"
    ],
    "clinicalCategories": [
      "microbiology",
      "infectious",
      "respiratory"
    ],
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/4503/mycobacteria-stain-acid-fast-fluorochrome?cc=MASTER"
  },
  {
    "id": "quest-verified-unusable-audit-sixth20-20261116-4550",
    "testCode": "4550",
    "testName": "Culture, Aerobic Bacteria",
    "status": "active",
    "specimenType": "Wound Swab",
    "drawContainer": "ESwab (Amies)",
    "alternativeContainer": "",
    "transportContainer": "ESwab (Amies)",
    "preferredVolume": "1 ESwab from wound or abscess site",
    "minimumVolume": "1 swab",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "stability": "Amies swab room 48 hours; refrigerated 48 hours; frozen unacceptable",
    "specialLabeling": "Label WOUND SWAB and collection date/time",
    "specialInstructions": "Collect aerobic wound/abscess/drainage material from the appropriately prepared site into ONE liquid Amies ESwab and submit the ORIGINAL capped swab tube at room temperature. No slide or clinic-prepared smear. Label anatomical source and whether superficial or deep. For anaerobic infection concern, use the separate appropriate aerobic/anaerobic culture order; do not substitute this aerobic-only test. Dry swabs, formalin, viral medium, skin scrapings, nails, and oral swabs are unacceptable. Confirm exact test code, specimen source, receiving service area and Quest account before collection.",
    "searchAliases": [
      "aerobic wound culture",
      "superficial wound culture",
      "abscess culture aerobic",
      "wound culture"
    ],
    "clinicalCategories": [
      "microbiology",
      "infectious"
    ],
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/4550/culture-aerobic-bacteria?cc=DAL"
  },
  {
    "id": "quest-verified-unusable-audit-sixth20-20261116-4553",
    "testCode": "4553",
    "testName": "Culture, Fungus, Other Than Hair, Skin, Blood, with Fluorescent KOH",
    "status": "active",
    "specimenType": "Wound Swab",
    "drawContainer": "ESwab (Amies)",
    "alternativeContainer": "",
    "transportContainer": "ESwab (Amies)",
    "preferredVolume": "1 lesion/wound fungal culture swab",
    "minimumVolume": "1 swab",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "stability": "ESwab in Amies room 72 hours; refrigerated and frozen unacceptable",
    "specialLabeling": "Label WOUND SWAB and collection date/time",
    "specialInstructions": "WOUND/LESION SWAB collection route only: collect lesion material or wound exudate using an ESwab in Amies transport medium. Submit the ORIGINAL liquid Amies tube at room temperature, not refrigerated. Quest performs direct fluorescent KOH microscopy and culture; the clinic must NOT prepare slides or smears. Excludes skin scrapings, hair, nails, stool and blood. Other accepted specimens (sputum, body fluid, CSF, urine, tissue) have different collection temperatures, volumes or tubes and are not represented by this entry. Confirm exact test code, specimen source, receiving service area and Quest account before collection.",
    "searchAliases": [
      "fungal wound culture",
      "yeast mold culture",
      "fungal culture fluorescent KOH",
      "fungus culture swab"
    ],
    "clinicalCategories": [
      "microbiology",
      "infectious"
    ],
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/4553/culture-fungus-other-than-hair-skin-blood-with-fluorescent-koh?cc=MASTER"
  },
  {
    "id": "quest-verified-unusable-audit-sixth20-20261116-4554",
    "testCode": "4554",
    "testName": "Mycobacteria, Culture, with Fluorochrome Smear",
    "status": "active",
    "specimenType": "Sputum",
    "drawContainer": "Sterile cup",
    "alternativeContainer": "",
    "transportContainer": "Sterile cup",
    "preferredVolume": "10 mL early-morning deep-cough sputum",
    "minimumVolume": "2 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "stability": "Room temperature unacceptable; refrigerated 5 days; frozen unacceptable",
    "specialLabeling": "Label SPUTUM and collection date/time",
    "specialInstructions": "SPUTUM PATHWAY ONLY: rinse mouth with water; cough deeply into sterile leakproof screw-cap Sterile cup. Submit the ORIGINAL cup refrigerated with cold packs. Three separately collected early-morning specimens on consecutive days are often recommended for suspected TB. Do not pool specimens from separate days, prepare slides/smears onsite, freeze specimens, use formalin or EDTA/heparin, or submit throat/oral swabs from non-cystic-fibrosis patients. Quest performs culture and AFB smear. Follow clinical isolation and biosafety procedures for suspected TB. Confirm exact test code, specimen source, receiving service area and Quest account before collection.",
    "searchAliases": [
      "afb culture and smear",
      "tuberculosis culture",
      "mycobacterium sputum culture",
      "acid fast bacilli culture"
    ],
    "clinicalCategories": [
      "microbiology",
      "infectious",
      "respiratory"
    ],
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/4554/mycobacteria-culture-with-fluorochrome-smear?cc=MASTER"
  },
  {
    "id": "quest-verified-unusable-audit-sixth20-20261116-4558",
    "testCode": "4558",
    "testName": "Culture, Genital",
    "status": "active",
    "specimenType": "Vaginal Swab",
    "drawContainer": "ESwab (Amies)",
    "alternativeContainer": "",
    "transportContainer": "ESwab (Amies)",
    "preferredVolume": "1 vaginal ESwab",
    "minimumVolume": "1 swab",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "stability": "Transport swab room 48 hours; refrigerated and frozen unacceptable",
    "specialLabeling": "Label VAGINAL SWAB and collection date/time",
    "specialInstructions": "VAGINAL SWAB PATHWAY ONLY: collect vaginal secretions using one white-cap ESwab in liquid Amies, label exact vaginal site, and submit ORIGINAL swab medium tube at room temperature without transfer or slide. Does not rule out gonorrhea or group B streptococci; use their specific tests when needed. Endocervical, urethral or prostatic sources require independently reviewed anatomical site labeling. Confirm exact test code, specimen source, receiving service area and Quest account before collection.",
    "searchAliases": [
      "genital culture",
      "vaginal bacterial culture",
      "vaginal aerobic culture"
    ],
    "clinicalCategories": [
      "microbiology",
      "infectious",
      "sti"
    ],
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/4558/culture-genital?cc=MASTER"
  },
  {
    "id": "quest-verified-unusable-audit-sixth20-20261116-4563",
    "testCode": "4563",
    "testName": "Crystals, Synovial Fluid",
    "status": "active",
    "specimenType": "Synovial Fluid",
    "drawContainer": "Transport Tube",
    "alternativeContainer": "",
    "transportContainer": "Transport Tube",
    "preferredVolume": "3 mL synovial fluid",
    "minimumVolume": "1 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "stability": "Room 48 hours; refrigerated 7 days; frozen unacceptable",
    "specialLabeling": "Label SYNOVIAL FLUID, exact joint/location, collection date/time",
    "specialInstructions": "Qualified procedural clinician obtains synovial/joint fluid aseptically directly into a sterile plastic screw-cap Transport Tube (Quest-accepted alternative plastic vial), which is submitted ORIGINAL at room temperature without transfer. This is a SYNOVIAL FLUID source, NOT blood. Do not draw Lavender EDTA blood or group with other blood tubes. Quest also accepts properly anticoagulated synovial fluid in lavender EDTA or sodium-heparin tubes, but those are alternate source workflows not represented here. Clotted specimens are rejected; confirm anticoagulant-free plastic vial acceptability with receiving Quest laboratory before collection. Confirm exact test code, specimen source, receiving service area and Quest account before collection.",
    "searchAliases": [
      "synovial crystals",
      "joint fluid crystals",
      "urate crystals",
      "pseudogout crystals"
    ],
    "clinicalCategories": [
      "rheumatology",
      "body-fluids"
    ],
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/4563/crystals-synovial-fluid?cc=MASTER"
  },
  {
    "id": "quest-verified-unusable-audit-sixth20-20261116-4616",
    "testCode": "4616",
    "testName": "Citric Acid, 24-Hour Urine with Creatinine",
    "status": "active",
    "specimenType": "24-Hour Urine",
    "drawContainer": "24-Hour Urine Container (no preservative)",
    "alternativeContainer": "",
    "transportContainer": "Sterile cup",
    "preferredVolume": "10 mL aliquot from thoroughly mixed 24-hour urine",
    "minimumVolume": "1.5 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "stability": "Room 8 hours but room transport unacceptable; refrigerated 30 days; frozen 60 days",
    "specialLabeling": "Label 24-HOUR URINE, total volume and collection start/end date/time",
    "specialInstructions": "Provide an UNPRESERVED 24-hour urine jug. Discard the initial morning void, collect all subsequent voids through the matching next-morning void, refrigerate while collecting. At completion, mix, record total volume and start/end date/time, then transfer 10 mL (minimum 1.5 mL) into one labeled Sterile cup/plastic leakproof urine aliquot container. Ship this aliquot REFRIGERATED with cold packs. Never add 6N HCl or other acid, or send at room temperature. Keep this source in the 24-hour urine group, separate from random urine. Confirm exact test code, specimen source, receiving service area and Quest account before collection.",
    "searchAliases": [
      "citrate 24hr urine",
      "citric acid 24h",
      "kidney stone urinary citrate",
      "24h urine citrate"
    ],
    "clinicalCategories": [
      "renal",
      "urinary"
    ],
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/4616/citric-acid-24-hour-urine-with-creatinine?cc=MASTER"
  },
  {
    "id": "quest-verified-unusable-audit-sixth20-20261116-4637",
    "testCode": "4637",
    "testName": "Glucose Tolerance Test, Postprandial/2-Hour",
    "status": "active",
    "specimenType": "Plasma",
    "drawContainer": "Gray Fluoride/Oxalate",
    "alternativeContainer": "",
    "transportContainer": "Gray Fluoride/Oxalate",
    "preferredVolume": "1 mL plasma, one timed gray-top tube",
    "minimumVolume": "0.5 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "Yes",
    "stability": "Spun gray whole-blood tube room 24 hours; refrigerated 72 hours; frozen whole blood unacceptable",
    "specialLabeling": "Label PLASMA • 2-HOUR POSTPRANDIAL and exact meal/draw time",
    "specialInstructions": "ONE POSTPRANDIAL DRAW at exactly 2 HOURS after the patient begins the ordered meal protocol; this code does NOT include a fasting/baseline tube. Collect 1 fully filled Gray Fluoride/Oxalate blood tube, invert and centrifuge for separated plasma, and submit the ORIGINAL spun gray-top tube at room temperature. Label actual meal and draw times and 2-hour timepoint. Do not pool this timepoint with an untimed glucose draw, other draw-time samples, or gray specimens for another postprandial protocol. Alternate serum/plasma transfer tubes require a separately approved workflow. Confirm exact test code, specimen source, receiving service area and Quest account before collection.",
    "searchAliases": [
      "postprandial glucose 2h",
      "2 hour post meal glucose",
      "two hour glucose",
      "PP glucose"
    ],
    "clinicalCategories": [
      "diabetes",
      "endocrinology"
    ],
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/4637/glucose-tolerance-test-postprandial-2-hour?cc=MASTER"
  },
  {
    "id": "quest-verified-unusable-audit-sixth20-20261116-4946",
    "testCode": "4946",
    "testName": "Histamine, 24-Hour Urine",
    "status": "active",
    "specimenType": "24-Hour Urine",
    "drawContainer": "24-Hour Urine Container (no preservative)",
    "alternativeContainer": "",
    "transportContainer": "Transport Tube",
    "preferredVolume": "4 mL 24-hour urine aliquot",
    "minimumVolume": "2 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "stability": "Room 48 hours; refrigerated 14 days; frozen 14 days",
    "specialLabeling": "Label 24-HOUR URINE, total volume and start/end times",
    "specialInstructions": "Use the Quest-accepted NO-PRESERVATIVE 24-hour urine collection alternative. Collect into plain 24-hour jug without 6N HCl, refrigerate throughout the collection, and avoid direct sunlight. Mix total collection, record total volume and start/end times, then transfer 4 mL (minimum 2 mL) to a labeled standard plastic Transport Tube, keeping REFRIGERATED with cold packs for submission. Medication preparation: Quest advises avoiding antihistamines, oral corticosteroids, H2 blockers and allergy-triggering drugs for 24 hours, but DO NOT stop prescribed medications without the ordering clinician's instruction. Do not pool with acid-preserved urine. Confirm exact test code, specimen source, receiving service area and Quest account before collection.",
    "searchAliases": [
      "24hr urine histamine",
      "histamine 24h",
      "histamine urinary"
    ],
    "clinicalCategories": [
      "allergy",
      "urinary"
    ],
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/4946/histamine-24-hour-urine?cc=MASTER"
  },
  {
    "id": "quest-verified-unusable-audit-sixth20-20261116-5164",
    "testCode": "5164",
    "testName": "Plasminogen, Antigenic",
    "status": "active",
    "specimenType": "Plasma",
    "drawContainer": "Light Blue Citrate",
    "alternativeContainer": "",
    "transportContainer": "Transport Tube",
    "preferredVolume": "1 mL 3.2% citrated plasma",
    "minimumVolume": "0.5 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "spin": "Yes",
    "stability": "Frozen plasma: follow receiving-lab frozen stability; ship on dry ice without thaw",
    "specialLabeling": "Label PLASMA and collection date/time",
    "specialInstructions": "Fill a 3.2% sodium citrate Light Blue Citrate tube completely to the printed fill line and invert gently. Promptly centrifuge and separate plasma from cells (preferably within 1 hour); transfer 1 mL (minimum 0.5 mL) into a DEDICATED clearly labeled plastic Transport Tube, then FREEZE immediately and ship on dry ice. Do not freeze the original whole-blood citrate tube, share this frozen aliquot with other assays, or ship thawed. Confirm whether a platelet-poor plasma double spin is required by the receiving service area. Follow any ordering-clinician fasting preparation. Confirm exact test code, specimen source, receiving service area and Quest account before collection.",
    "searchAliases": [
      "plasminogen antigen",
      "plasminogen antigenic",
      "fibrinolysis plasminogen"
    ],
    "clinicalCategories": [
      "coagulation",
      "hematology"
    ],
    "source": "https://www.questdiagnostics.com/content/dam/corporate/unrestricted/documents/Bleeding-and-Thrombosis-Test-Menu.PDF"
  },
  {
    "id": "quest-verified-unusable-audit-sixth20-20261116-5215",
    "testCode": "5215",
    "testName": "Nickel, Random Urine",
    "status": "active",
    "specimenType": "Urine",
    "drawContainer": "Trace Metal-Free Plastic Container",
    "alternativeContainer": "",
    "transportContainer": "Trace Metal-Free Plastic Container",
    "preferredVolume": "7 mL random urine",
    "minimumVolume": "3 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "stability": "Room 48 hours; refrigerated 7 days; frozen 28 days",
    "specialLabeling": "Label URINE and collection date/time",
    "specialInstructions": "Collect random urine directly into a clean acid-washed/TRACE METAL-FREE plastic container to minimize environmental contamination. Avoid collection in the worksite, ordinary Sterile cups, preservative tubes or metal-containing equipment. Submit ORIGINAL leakproof metal-free container refrigerated with cold packs; no transfer. This is a TRACE-METAL source cup and must not be grouped with routine random urine cups. Confirm adequate volume if collecting for additional trace-metal assays. Confirm exact test code, specimen source, receiving service area and Quest account before collection.",
    "searchAliases": [
      "urinary nickel",
      "urine nickel",
      "nickel creatinine ratio",
      "nickel exposure urine"
    ],
    "clinicalCategories": [
      "heavy-metals",
      "urinary"
    ],
    "source": "https://dos.compunetlab.com/tests/863"
  },
  {
    "id": "quest-verified-unusable-audit-sixth20-20261116-5244",
    "testCode": "5244",
    "testName": "Catecholamines, Fractionated, Random Urine",
    "status": "active",
    "specimenType": "Urine",
    "drawContainer": "Sterile cup",
    "alternativeContainer": "",
    "transportContainer": "Transport Tube",
    "preferredVolume": "1 mL random unpreserved urine",
    "minimumVolume": "0.7 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "spin": "No",
    "stability": "Unpreserved urine: room unacceptable; refrigerated 7 days; frozen 60 days",
    "specialLabeling": "Label RANDOM URINE, collection date/time and verified pH ≤6",
    "specialInstructions": "Use Quest's UNPRESERVED urine alternative ONLY when specimen pH is confirmed at 6.0 or lower. Collect a SEPARATE random urine specimen in a plain Sterile cup, verify/record pH, then transfer at least 1 mL (minimum 0.7 mL) to a leakproof labeled plastic Transport Tube. FREEZE immediately and ship frozen on dry ice. Do not add 6N HCl, pool with unfrozen urine submissions, or proceed if pH is unknown or above 6. Advise avoidance of alcohol, coffee, tea, tobacco and strenuous exercise for 8–12 hours before collection. Medication adjustments require prescriber guidance. Confirm exact test code, specimen source, receiving service area and Quest account before collection.",
    "searchAliases": [
      "random urine catecholamines",
      "catecholamines fractionated urine",
      "spot urine catecholamines",
      "urine dopamine norepinephrine epinephrine"
    ],
    "clinicalCategories": [
      "endocrinology",
      "urinary"
    ],
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/5244/catecholamines-fractionated-random-urine?cc=MASTER"
  },
  {
    "id": "quest-verified-unusable-audit-sixth20-20261116-5291",
    "testCode": "5291",
    "testName": "Respiratory Syncytial Virus (RSV) Antigen, DFA",
    "status": "active",
    "specimenType": "Nasopharyngeal Swab",
    "drawContainer": "Viral transport media (VCM/M4)",
    "alternativeContainer": "",
    "transportContainer": "Viral transport media (VCM/M4)",
    "preferredVolume": "1 NP swab immersed in viral culture medium",
    "minimumVolume": "1 mL medium",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "stability": "VCM refrigerated 4 days; room and -20°C freezing unacceptable",
    "specialLabeling": "Label NASOPHARYNGEAL SWAB and collection date/time",
    "specialInstructions": "Collect ONE nasopharyngeal swab into Quest-approved VCM viral culture transport medium, and submit the ORIGINAL medium tube refrigerated at 2–8°C with cold packs; avoid delay. Quest performs immunofluorescence; DO NOT make slides or smears onsite. If prolonged transport requires freezing, Quest specifies -70°C or colder, not a routine -20°C freezer; do not freeze onsite. Nasal smears, throat swabs, sputum, dry swabs, bacterial transport media and other non-respiratory sources are rejected. Confirm exact test code, specimen source, receiving service area and Quest account before collection.",
    "searchAliases": [
      "rsv dfa",
      "rsv direct fluorescent antigen",
      "rsv immunofluorescence",
      "respiratory syncytial antigen"
    ],
    "clinicalCategories": [
      "infectious",
      "respiratory"
    ],
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/5291/respiratory-syncytial-virus-rsv-antigen-dfa?cc=MASTER"
  },
  {
    "id": "quest-verified-unusable-audit-sixth20-20261116-5295",
    "testCode": "5295",
    "testName": "Coccidioides Antibody, Complement Fixation, CSF",
    "status": "active",
    "specimenType": "CSF",
    "drawContainer": "Sterile cup",
    "alternativeContainer": "",
    "transportContainer": "Sterile cup",
    "preferredVolume": "1 mL CSF",
    "minimumVolume": "0.2 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "stability": "Room 7 days; refrigerated 14 days; frozen 30 days",
    "specialLabeling": "Label CSF and collection date/time",
    "specialInstructions": "A qualified procedural clinician obtains the CSF; staff do not perform routine CSF collection. Collect into one sterile leakproof screw-cap plastic Sterile cup, submitted ORIGINAL at room temperature without transfer, spin or clinic-prepared slides. Label CSF and collection date/time. Avoid gross hemolysis or grossly icteric specimens. Use a separate CSF specimen/aliquot if other tests require different bag temperatures or more total volume. Confirm receiving-area acceptance. Confirm exact test code, specimen source, receiving service area and Quest account before collection.",
    "searchAliases": [
      "coccidioides csf",
      "cocci antibody csf",
      "valley fever CSF antibody",
      "coccidioidal meningitis CF"
    ],
    "clinicalCategories": [
      "infectious",
      "neurology",
      "immunology"
    ],
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/5295/coccidioides-antibody-complement-fixation-csf?cc=MASTER"
  }
];
for(const entry of additions){
 const record=window.SEED_TESTS.find(x=>String(x.testCode||'').trim()===entry.testCode);
 if(!record){window.SEED_TESTS.push(entry);continue;}
 if(record.status==='reference'||record.status==='pending')Object.assign(record,entry,{id:record.id||entry.id});
}
// The clinics do not collect hair or nail specimens. Apply after all previous
// reference expansion layers to safeguard even older active mappings.
for(const record of window.SEED_TESTS){
 const specimen=String(record.specimenType||'').trim().toLowerCase();
 if(!/^(?:hair|nails?|nail clippings)(?:\s|$)/.test(specimen)||record.status!=='active')continue;
 record.status='reference';
 record.specialInstructions='Not collected at our clinics: hair and nail specimen types are reference-only. '+String(record.specialInstructions||'');
}
})();
