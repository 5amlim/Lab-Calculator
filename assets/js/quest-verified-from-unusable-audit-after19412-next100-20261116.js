/* Quest reference-only audit next 100 after code 19412 through 36592, reviewed 2026-11-16.
 * Activate only verified locally collectable specimen paths; the other 88 remain
 * reference-only for slide/IHC/pathology, specialized kits, trace-metal 24-hour
 * collection jugs, dedicated trace-element transfer kits, 24-hour stool collection
 * container, nonstandard organism isolate assays or insufficient code-level
 * handling verification. Respect previously active and blocked records.
 */
(()=>{'use strict';if(!Array.isArray(window.SEED_TESTS))return;
const additions=[
  {
    "id": "quest-verified-audit-after19412-next100-20261116-20210",
    "testCode": "20210",
    "testName": "Obstetric Panel",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "alternativeContainer": "",
    "transportContainer": "Transport Tube",
    "preferredVolume": "6 mL serum",
    "minimumVolume": "2.5 mL serum",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "Yes",
    "stability": "Serum per individual panel test; full EDTA lavender/pink must remain room temperature",
    "specialLabeling": "Label SERUM and collection date/time; label LAVENDER WHOLE BLOOD and PINK WHOLE BLOOD separately",
    "specialInstructions": "THREE physical specimen sources required: 6 mL total SERUM from spun SST, one FULL Lavender EDTA whole-blood tube, and one FULL Pink EDTA whole-blood tube. Gold SST 5 mL yields approximately 2.5 mL serum, so plan at least THREE Gold SSTs; Tiger SST 7.5 mL yields approximately 4 mL serum, so plan at least TWO Tigers. Allow SSTs to clot, centrifuge and pour off/transfer combined compatible serum to a Quest-approved plastic Transport Tube able to contain at least 6 mL (verify tube capacity; if smaller, split serum into additional individually labeled vials according to Quest). Send serum transport and the TWO separate intact EDTA whole-blood tubes at ROOM TEMPERATURE. Do not refrigerate lavender/pink blood or use one lavender in place of pink for ABO/Rh. Biotin supplementation may interfere; Quest advises at least 8 hours after normal daily supplementation or 72 hours after megadose, with clinician direction. Test does not include HIV or HCV unless ordered separately. Verify the test code and performing laboratory for the patient's Quest service area before collection.",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/20210/obstetric-panel?cc=MASTER&q=20210",
    "searchAliases": [
      "prenatal profile",
      "ob panel",
      "routine obstetric panel",
      "OB panel without HIV"
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
        "purpose": "Required CBC whole blood",
        "preferredVolume": "One FULL Lavender EDTA tube",
        "minimumVolume": "1 mL whole blood",
        "submissionCount": 1,
        "transportContainer": "Lavender EDTA",
        "transportTemperature": "Room Temperature",
        "transportTemperatureRaw": "Room Temperature",
        "spin": "No",
        "specialLabeling": "Label WHOLE BLOOD, LAVENDER EDTA, collection date/time",
        "specialInstructions": "Collect one separate FULL Lavender EDTA whole-blood tube; gently invert and submit the ORIGINAL tightly capped tube at ROOM TEMPERATURE. Do not centrifuge, refrigerate, freeze, transfer, or mix with serum/other EDTA tube. Label two patient identifiers and collection date/time."
      },
      {
        "container": "Pink EDTA",
        "count": 1,
        "specimenType": "Whole Blood",
        "purpose": "Required separate blood-bank antibody screen and ABO/Rh",
        "preferredVolume": "One FULL Pink EDTA tube",
        "minimumVolume": "1 mL whole blood",
        "submissionCount": 1,
        "transportContainer": "Pink EDTA",
        "transportTemperature": "Room Temperature",
        "transportTemperatureRaw": "Room Temperature",
        "spin": "No",
        "specialLabeling": "Label WHOLE BLOOD, PINK EDTA, collection date/time",
        "specialInstructions": "Collect one separate FULL Pink EDTA whole-blood tube; gently invert and submit the ORIGINAL tightly capped tube at ROOM TEMPERATURE. Do not centrifuge, refrigerate, freeze, transfer, or mix with serum/other EDTA tube. Label two patient identifiers and collection date/time."
      }
    ]
  },
  {
    "id": "quest-verified-audit-after19412-next100-20261116-20541",
    "testCode": "20541",
    "testName": "Culture, Yeast, with Identification",
    "status": "active",
    "specimenType": "Oral Swab",
    "drawContainer": "ESwab (Amies)",
    "alternativeContainer": "",
    "transportContainer": "ESwab (Amies)",
    "preferredVolume": "1 oral swab in liquid Amies ESwab",
    "minimumVolume": "1 swab",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "stability": "ESwab room 72 hours; refrigerated 72 hours; frozen unacceptable",
    "specialLabeling": "Label ORAL SWAB, exact mouth or mucosal site, collection date/time",
    "specialInstructions": "Collect one ORAL swab using Quest-approved WHITE-CAP liquid Amies ESwab, place swab directly back into its ORIGINAL capped ESwab (Amies) tube, and send at ROOM TEMPERATURE. Do not transfer the swab to another tube, prepare glass slides/smears, freeze, or substitute viral transport medium. Quest performs all yeast culture, identification and microscopic testing at the receiving laboratory; this entry is strictly the oral swab route, not urine or other anatomical sources. Avoid submitting stool, sputum, blood, tissue, hair, nails, serum or any preservative. Quest also accepts vaginal/rectal swabs as alternate specimen pathways, but only ORAL ESwab is modeled here. Verify the test code and performing laboratory for the patient's Quest service area before collection.",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/20541?cc=MASTER",
    "searchAliases": [
      "yeast culture ID oral",
      "oral thrush culture",
      "Candida oral culture",
      "fungal yeast identification oral"
    ],
    "clinicalCategories": [
      "infectious",
      "microbiology"
    ]
  },
  {
    "id": "quest-verified-audit-after19412-next100-20261116-30264",
    "testCode": "30264",
    "testName": "Shiga Toxins, EIA with Reflex to E. coli O157, Culture",
    "status": "active",
    "specimenType": "Stool",
    "drawContainer": "Sterile cup",
    "alternativeContainer": "",
    "transportContainer": "Cary-Blair Stool Culture Transport Medium",
    "preferredVolume": "1 gram or 1 mL stool in modified Cary-Blair",
    "minimumVolume": "1 gram or 1 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "stability": "Cary-Blair room 4 days; refrigerated 4 days; frozen unacceptable",
    "specialLabeling": "Label STOOL, collection date/time, Cary-Blair transport and patient identifiers",
    "specialInstructions": "Collect fresh stool in a clean, DRY Sterile cup with no urine or toilet water contamination. Transfer sufficient stool to a separate MODIFIED Cary-Blair stool culture vial, fill exactly to the manufacturer's fill line, cap and mix as instructed. Submit the Cary-Blair original vial at ROOM TEMPERATURE; reject yellow/unbuffered medium, raw unpreserved stool, diapers, dry swabs and frozen stool. Compatible cultures may share a sufficiently filled single STOOL source cup from the same bowel movement, but submit distinct Cary-Blair vial(s) per order unless Quest approves combining. Shiga-toxin EIA reflexes to E. coli O157 culture if toxin detected; it is not an independent routine stool culture. Verify the test code and performing laboratory for the patient's Quest service area before collection.",
    "source": "https://www.rchsd.org/lab-test/shiga-toxins-eia-with-reflex-to-escherichia-coli-o157-culture-30264/",
    "searchAliases": [
      "Shiga toxin EIA reflex EHEC",
      "STEC toxin stool test",
      "E coli O157 reflex culture",
      "EHEC EIA"
    ],
    "clinicalCategories": [
      "infectious",
      "microbiology",
      "gastrointestinal"
    ]
  },
  {
    "id": "quest-verified-audit-after19412-next100-20261116-30710",
    "testCode": "30710",
    "testName": "Liver Fibrosis, Hepatic Function Panel with Fibrosis-4 (FIB-4) Index",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "alternativeContainer": "",
    "transportContainer": "SST / Gold",
    "preferredVolume": "1 mL serum in original spun SST",
    "minimumVolume": "0.5 mL serum",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "Yes",
    "stability": "Serum room 24 h, refrigerated 72 h, frozen unacceptable; Lavender whole blood room 48 h",
    "specialLabeling": "Label SERUM, collection date/time; separately label LAVENDER EDTA WHOLE BLOOD",
    "specialInstructions": "TWO DISTINCT tubes: collect serum in SST Gold/Tiger, allow to clot, CENTRIFUGE and submit ORIGINAL SPUN SST REFRIGERATED with cold packs. Draw one additional FULL Lavender EDTA whole-blood tube, gently invert and submit ORIGINAL at ROOM TEMPERATURE. NEVER refrigerate the lavender or place it in the refrigerated serum bag. This code includes hepatic-function chemistries, platelets and FIB-4 score; it is distinct from 12735, which additionally reflexes to ELF. If ordering in the same encounter as lead testing, Quest directs EDTA tan-top for platelet specimen, requiring a different verified collection route. Verify the test code and performing laboratory for the patient's Quest service area before collection.",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/30710/liver-fibrosis-hepatic-function-panel-with-fibrosis-4-fib-4-index?cc=MASTER&p=r",
    "searchAliases": [
      "FIB4 liver panel",
      "liver fibrosis FIB-4",
      "LFT with platelets",
      "NASH fibrosis index"
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
        "purpose": "Mandatory platelet count for FIB-4",
        "preferredVolume": "One FULL Lavender EDTA tube",
        "minimumVolume": "1 mL whole blood",
        "submissionCount": 1,
        "transportContainer": "Lavender EDTA",
        "transportTemperature": "Room Temperature",
        "transportTemperatureRaw": "Room Temperature",
        "spin": "No",
        "specialLabeling": "Label WHOLE BLOOD, LAVENDER EDTA, collection date/time",
        "specialInstructions": "Collect one separate FULL Lavender EDTA whole-blood tube; gently invert and submit the ORIGINAL tightly capped tube at ROOM TEMPERATURE. Do not centrifuge, refrigerate, freeze, transfer, or mix with serum/other EDTA tube. Label two patient identifiers and collection date/time."
      }
    ]
  },
  {
    "id": "quest-verified-audit-after19412-next100-20261116-34541",
    "testCode": "34541",
    "testName": "Dementia Panel, Secondary Causes",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "alternativeContainer": "",
    "transportContainer": "SST / Gold",
    "preferredVolume": "5 mL serum in original spun SST",
    "minimumVolume": "Quest minimum not specified; verify",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "Yes",
    "stability": "Serum room 36 h / refrigerated 72 h; whole blood room 48 h, frozen unacceptable",
    "specialLabeling": "Label SERUM, collection date/time; separately label LAVENDER EDTA WHOLE BLOOD",
    "specialInstructions": "REQUIRES BOTH 5 mL serum in serum separator tubes and ONE FULL Lavender EDTA whole-blood tube. Gold usable serum 2.5 mL per tube means two Gold SST draws; Tiger usable 4 mL per tube means two Tiger SST draws. Allow serum to clot, spin and submit original spun SSTs REFRIGERATED, particularly when performing lab delivery exceeds 24 hours. Submit original intact full Lavender EDTA at ROOM TEMPERATURE in a separate bag, no centrifugation or refrigeration. Fasting is preferred, not mandatory. Panel includes CMP, CBC/diff, TSH, B12 and folate; defer collection for three days after fluorescein angiography per Quest instructions. Verify the test code and performing laboratory for the patient's Quest service area before collection.",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/34541/dementia-panel-restoreu?cc=MASTER&p=r",
    "searchAliases": [
      "secondary causes dementia",
      "dementia workup panel",
      "B12 TSH folate CBC CMP",
      "cognitive decline reversible causes"
    ],
    "clinicalCategories": [
      "neurology",
      "chemistry",
      "hematology"
    ],
    "usePreferredSerumYield": true,
    "fastingStatus": "preferred",
    "fastingInstructions": "Fasting specimen preferred. Check fasting duration with ordering clinician; delay collection after fluorescein dye angiography.",
    "additionalDrawRequirements": [
      {
        "container": "Lavender EDTA",
        "count": 1,
        "specimenType": "Whole Blood",
        "purpose": "Required full whole-blood lavender for CBC",
        "preferredVolume": "One FULL Lavender EDTA tube",
        "minimumVolume": "1 mL whole blood",
        "submissionCount": 1,
        "transportContainer": "Lavender EDTA",
        "transportTemperature": "Room Temperature",
        "transportTemperatureRaw": "Room Temperature",
        "spin": "No",
        "specialLabeling": "Label WHOLE BLOOD, LAVENDER EDTA, collection date/time",
        "specialInstructions": "Collect one separate FULL Lavender EDTA whole-blood tube; gently invert and submit the ORIGINAL tightly capped tube at ROOM TEMPERATURE. Do not centrifuge, refrigerate, freeze, transfer, or mix with serum/other EDTA tube. Label two patient identifiers and collection date/time."
      }
    ]
  },
  {
    "id": "quest-verified-audit-after19412-next100-20261116-34695",
    "testCode": "34695",
    "testName": "Heavy Metals Panel 4, Urine (CSA)",
    "status": "active",
    "specimenType": "Urine",
    "drawContainer": "Trace Metal-Free Plastic Container",
    "alternativeContainer": "",
    "transportContainer": "Trace Metal-Free Plastic Container",
    "preferredVolume": "4 mL random unpreserved urine",
    "minimumVolume": "1.5 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "stability": "Room 5 days; refrigerated 30 days; frozen 30 days, but received room temperature is rejected",
    "specialLabeling": "Label RANDOM URINE, TRACE METAL-FREE, collection date/time",
    "specialInstructions": "Collect RANDOM unpreserved urine DIRECTLY into acid-washed or TRACE METAL-FREE PLASTIC collection container, without chemical preservative. Submit ORIGINAL tightly closed metal-free container REFRIGERATED with cold packs. Never substitute a routine Sterile cup, acid preservative, or room-temperature shipment. Avoid gadolinium contrast and seafood for 48 hours before collection; avoid industrial worksite collection. Can share one source only with compatible SAME-TEMPERATURE trace-metal urine orders when patient preparation and sufficient volume allow; do not mix with 24-hour urine. Verify the test code and performing laboratory for the patient's Quest service area before collection.",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/34695/heavy-metals-panel-4-urine-csa?cc=MASTER&p=r",
    "searchAliases": [
      "CSA heavy metals panel 4",
      "urinary toxic metal screen",
      "arsenic mercury thallium cobalt urine",
      "metals panel four urine"
    ],
    "clinicalCategories": [
      "heavy-metals",
      "toxicology",
      "urinary"
    ]
  },
  {
    "id": "quest-verified-audit-after19412-next100-20261116-35378",
    "testCode": "35378",
    "testName": "Copper, Blood",
    "status": "active",
    "specimenType": "Whole Blood",
    "drawContainer": "Royal Blue EDTA (purple stripe)",
    "alternativeContainer": "",
    "transportContainer": "Royal Blue EDTA (purple stripe)",
    "preferredVolume": "1 mL trace-metal-free EDTA whole blood",
    "minimumVolume": "0.3 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "stability": "Room 30 days; refrigerated 30 days; frozen 30 days",
    "specialLabeling": "Label WHOLE BLOOD, ROYAL BLUE EDTA (PURPLE STRIPE), collection date/time",
    "specialInstructions": "Collect blood directly into trace-metal-free ROYAL BLUE EDTA (PURPLE STRIPE) tube; invert gently. Submit the ORIGINAL unopened royal-blue tube at ROOM TEMPERATURE, no spin, transfer, or contact with ordinary lavender tubes. Do not use sodium heparin or ordinary Lavender EDTA. Document copper exposure and specimen draw time; prevent contamination with powder-free gloves and trace-metal-clean phlebotomy supplies. Verify the test code and performing laboratory for the patient's Quest service area before collection.",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/35378/copper-blood?cc=MASTER&p=r",
    "searchAliases": [
      "whole blood copper",
      "Cu whole blood",
      "copper exposure royal blue EDTA"
    ],
    "clinicalCategories": [
      "heavy-metals",
      "toxicology"
    ]
  },
  {
    "id": "quest-verified-audit-after19412-next100-20261116-36167",
    "testCode": "36167",
    "testName": "Collagen Cross-Linked N-Telopeptide (NTx), Urine",
    "status": "active",
    "specimenType": "Second-Morning Urine",
    "drawContainer": "Sterile cup",
    "alternativeContainer": "",
    "transportContainer": "Sterile cup",
    "preferredVolume": "2 mL second-morning unpreserved urine",
    "minimumVolume": "1 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "stability": "Room 72 hours; refrigerated 5 days; frozen 30 days",
    "specialLabeling": "Label SECOND-MORNING URINE (2nd void), collection date/time",
    "specialInstructions": "DISCARD the FIRST morning urine void, then collect the SECOND morning void in a clean original leakproof Sterile cup, without preservative or acidification. Mix gently and submit the ORIGINAL capped Sterile cup REFRIGERATED with cold packs. Do not pool with a first-morning, random, 24-hour, or preserved urine sample. If provider orders an alternative random source, that requires a separately verified alternate workflow. Includes urine creatinine. Verify the test code and performing laboratory for the patient's Quest service area before collection.",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/36167/collagen-cross-linked-n-telopeptide-ntx-urine?cc=MASTER&p=r",
    "searchAliases": [
      "NTx random urine",
      "urine bone resorption marker",
      "collagen N telopeptide",
      "second void NTx"
    ],
    "clinicalCategories": [
      "endocrinology",
      "bone-health",
      "urinary"
    ]
  },
  {
    "id": "quest-verified-audit-after19412-next100-20261116-36268",
    "testCode": "36268",
    "testName": "Culture, Yeast with Limited Susceptibility",
    "status": "active",
    "specimenType": "Vaginal Swab",
    "drawContainer": "ESwab (Amies)",
    "alternativeContainer": "",
    "transportContainer": "ESwab (Amies)",
    "preferredVolume": "1 vaginal swab in Amies liquid ESwab",
    "minimumVolume": "1 swab",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "stability": "Swab room 72 hours; refrigerated 72 hours; frozen unacceptable",
    "specialLabeling": "Label VAGINAL SWAB, site and collection date/time",
    "specialInstructions": "Collect one VAGINAL swab using Quest-approved WHITE-CAP liquid Amies ESwab, place swab directly back into its ORIGINAL capped ESwab (Amies) tube, and send at ROOM TEMPERATURE. Do not transfer the swab to another tube, prepare glass slides/smears, freeze, or substitute viral transport medium. Quest performs all yeast culture, identification and microscopic testing at the receiving laboratory; this entry is strictly the vaginal swab route, not urine or other anatomical sources. Yeast antifungal susceptibility is performed by Quest when indicated; not a clinic procedure. Do not collect hair, nails, tissue, stool or sputum under this code. Verify the test code and performing laboratory for the patient's Quest service area before collection.",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/36268?cc=MASTER",
    "searchAliases": [
      "yeast culture susceptibility vaginal",
      "Candida antifungal MIC",
      "vaginal yeast susceptibility",
      "fungal Candida susceptibility swab"
    ],
    "clinicalCategories": [
      "infectious",
      "microbiology",
      "women-health"
    ]
  },
  {
    "id": "quest-verified-audit-after19412-next100-20261116-36270",
    "testCode": "36270",
    "testName": "Culture, Yeast with Direct Fluorescent KOH and Limited Susceptibility",
    "status": "active",
    "specimenType": "Vaginal Swab",
    "drawContainer": "ESwab (Amies)",
    "alternativeContainer": "",
    "transportContainer": "ESwab (Amies)",
    "preferredVolume": "1 vaginal swab in Amies liquid ESwab",
    "minimumVolume": "1 swab",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "stability": "Swab room 72 hours; refrigerated 72 hours; frozen unacceptable",
    "specialLabeling": "Label VAGINAL SWAB, site and collection date/time",
    "specialInstructions": "Collect one VAGINAL swab using Quest-approved WHITE-CAP liquid Amies ESwab, place swab directly back into its ORIGINAL capped ESwab (Amies) tube, and send at ROOM TEMPERATURE. Do not transfer the swab to another tube, prepare glass slides/smears, freeze, or substitute viral transport medium. Quest performs all yeast culture, identification and microscopic testing at the receiving laboratory; this entry is strictly the vaginal swab route, not urine or other anatomical sources. Quest, not clinic staff, prepares and examines all direct fluorescent KOH microscopy; DO NOT prepare or send microscopic glass slides. The KOH analysis does not require a separate collection swab beyond the single Amies tube per this code. Verify the test code and performing laboratory for the patient's Quest service area before collection.",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/36270?cc=MASTER",
    "searchAliases": [
      "yeast culture KOH susceptibility",
      "Candida fungal stain and MIC",
      "vaginitis yeast KOH culture",
      "direct fluorescent KOH vaginal swab"
    ],
    "clinicalCategories": [
      "infectious",
      "microbiology",
      "women-health"
    ]
  },
  {
    "id": "quest-verified-audit-after19412-next100-20261116-36421",
    "testCode": "36421",
    "testName": "Collagen Cross-Linked N-Telopeptide (NTx), 24-Hour Urine",
    "status": "active",
    "specimenType": "24-Hour Urine",
    "drawContainer": "24-Hour Urine Container (no preservative)",
    "alternativeContainer": "",
    "transportContainer": "Sterile cup",
    "preferredVolume": "2 mL from well-mixed total 24-hour collection",
    "minimumVolume": "1 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "stability": "Room 72 hours; refrigerated 5 days; frozen 30 days",
    "specialLabeling": "Label 24-HOUR URINE, TOTAL VOLUME and exact START/END collection date/time",
    "specialInstructions": "Collect ALL urine in PLAIN NO-PRESERVATIVE 24-hour jug, refrigerating during collection. DISCARD the first morning void, collect subsequent urinations and final next-morning void at the same time; record exact start/end collection date/time and TOTAL 24-hour urine volume. Mix whole jug and transfer 2 mL (minimum 1 mL) into a labeled leakproof Sterile cup. Submit refrigerated with cold packs. Never add acid or preservative; do not mix the 24-hour urine source with a random or second-morning NTx specimen. Verify the test code and performing laboratory for the patient's Quest service area before collection.",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/36421/collagen-cross-linked-n-telopeptide-ntx-24-hour-urine?cc=MASTER&p=r",
    "searchAliases": [
      "NTx 24 hour",
      "24h bone resorption N telopeptide",
      "collagen NTx total urine"
    ],
    "clinicalCategories": [
      "endocrinology",
      "bone-health",
      "urinary"
    ]
  },
  {
    "id": "quest-verified-audit-after19412-next100-20261116-36592",
    "testCode": "36592",
    "testName": "Porphyrins, Fractionated, Quantitative, Random Urine",
    "status": "active",
    "specimenType": "Urine",
    "drawContainer": "Sterile cup",
    "alternativeContainer": "",
    "transportContainer": "Sterile cup",
    "preferredVolume": "2 mL random unpreserved urine",
    "minimumVolume": "1.5 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "stability": "Room unacceptable; refrigerated 7 days; frozen 30 days",
    "specialLabeling": "Label RANDOM URINE, collection date/time and PROTECT FROM LIGHT",
    "specialInstructions": "Collect a SEPARATE URINE SPECIMEN (random void) in a clean unpreserved Sterile cup and IMMEDIATELY wrap completely with aluminum foil for light protection. REFRIGERATE during storage and ship original foil-wrapped sterile cup with cold packs; do not expose to ambient light. Quest prefers 5 g sodium carbonate preservative, but explicitly accepts NO PRESERVATIVE IF REFRIGERATED AND LIGHT-PROTECTED; clinics do NOT add carbonate, acid or other preservatives. Reject specimens pH below 4, received room temperature, or not protected from light. Do not share this collection cup with ordinary urine specimens that have not been continuously light-protected. Verify the test code and performing laboratory for the patient's Quest service area before collection.",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/36592/porphyrins-fractionated-quantitative-random-urine?cc=MASTER&p=r",
    "searchAliases": [
      "urine porphyrins fractionated",
      "uroporphyrin coproporphyrin",
      "porphyria random urine",
      "porphyrins light protected"
    ],
    "clinicalCategories": [
      "metabolic",
      "hematology",
      "urinary"
    ]
  }
];
for(const entry of additions){
 const existing=window.SEED_TESTS.find(t=>String(t.testCode||'').trim()===entry.testCode);
 if(!existing){window.SEED_TESTS.push(entry);continue;}
 if(existing.status==='reference'||existing.status==='pending')
   Object.assign(existing,entry,{id:existing.id||entry.id});
}
})();
