/* Quest audit reference items 41 through 60, verified 2026-11-16.
 * 15 supported specimen paths; no acid preservative, prepared slides,
 * Quest-exclusive kits, or -70C freezer required for these workflows.
 * Never override an already-active test or blocked Do Not Perform item.
 * Alternate specimen sites not represented by these one-path records must
 * be checked in the official directory rather than inferred in the cart.
 */
(()=>{'use strict';if(!Array.isArray(window.SEED_TESTS))return;
const additions=[
  {
    "id": "quest-verified-unusable-audit-41-60-20261116-688",
    "testCode": "688",
    "testName": "Legionella Culture",
    "status": "active",
    "specimenType": "Sputum",
    "drawContainer": "Sterile cup",
    "alternativeContainer": "",
    "transportContainer": "Sterile cup",
    "preferredVolume": "3 mL deep-cough sputum",
    "minimumVolume": "2 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "stability": "Room unacceptable; refrigerated 7 days; frozen unacceptable",
    "specialLabeling": "Label SPUTUM and collection date/time",
    "specialInstructions": "SPUTUM-ONLY collection pathway: patient gargles with water, then coughs deeply to produce a lower-respiratory sputum specimen into a sterile, leakproof screw-cap Sterile cup. Submit the original cup refrigerated at 2–8°C with cold packs. No transfer or additives. Do not collect saliva, urine, swab, VCM, or frozen specimens. Other Quest-approved sources (lung tissue, BAL, bronchial washing or pleural fluid) need their own source-specific collection workflows and are not covered by this sputum entry. Confirm account-specific test code, region and transport acceptance with Quest before collection.",
    "source": "Quest official test directory, reviewed 2026-11-16 • https://testdirectory.questdiagnostics.com/test/test-detail/688/legionella-culture?cc=MASTER",
    "clinicalCategories": [
      "infectious",
      "microbiology",
      "respiratory"
    ],
    "searchAliases": [
      "legionella culture sputum",
      "legionnaires culture",
      "sputum legionella"
    ]
  },
  {
    "id": "quest-verified-unusable-audit-41-60-20261116-689",
    "testCode": "689",
    "testName": "Culture, Viral, Non-Respiratory, Conventional, Body Fluids or Tissue",
    "status": "active",
    "specimenType": "Body Fluid",
    "drawContainer": "Sterile cup",
    "alternativeContainer": "",
    "transportContainer": "Viral transport media (VCM/M4)",
    "preferredVolume": "2 mL body fluid plus equal volume VCM",
    "minimumVolume": "1 mL body fluid",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "stability": "Room unacceptable; refrigerated up to 72 hours; frozen -20°C unacceptable; -70°C acceptable for 30 days",
    "specialLabeling": "Label BODY FLUID, exact anatomical SOURCE and collection date/time",
    "specialInstructions": "NON-RESPIRATORY BODY-FLUID PATHWAY ONLY: collect fluid aseptically in an original Sterile cup, then add an EQUAL VOLUME of the body fluid to an approved VCM or equivalent viral transport tube. Submit the labeled VCM tube refrigerated at 2–8°C with cold packs as soon as possible, within 72 hours. DO NOT use a dry swab, bacterial transport media, formalin, or a -20°C freezer. If freezing is necessary, Quest requires -70°C or colder and dry-ice shipment; do not freeze in the clinic's standard freezer. Tissue or biopsy collection must be individually reviewed, not substituted using this fluid workflow. Check specimen-source-specific exclusions, including pleural fluid, in the official Quest directory. Confirm account-specific test code, region and transport acceptance with Quest before collection.",
    "source": "Quest official test directory, reviewed 2026-11-16 • https://testdirectory.questdiagnostics.com/test/test-detail/689/culture-viral-non-respiratory-conventional-body-fluids-or-tissue?cc=MASTER",
    "clinicalCategories": [
      "infectious",
      "microbiology"
    ],
    "searchAliases": [
      "nonrespiratory viral culture",
      "body fluid viral culture",
      "viral isolation fluid"
    ]
  },
  {
    "id": "quest-verified-unusable-audit-41-60-20261116-690",
    "testCode": "690",
    "testName": "Chlamydiae Species Culture",
    "status": "active",
    "specimenType": "Site-Specific Culture Swab",
    "drawContainer": "Viral transport media (VCM/M4)",
    "alternativeContainer": "",
    "transportContainer": "Viral transport media (VCM/M4)",
    "preferredVolume": "One endocervical, endourethral or rectal swab",
    "minimumVolume": "One swab",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "stability": "Room unacceptable; refrigerated up to 48 hours; -20°C freezing unacceptable; -70°C frozen acceptable",
    "specialLabeling": "Label SWAB with exact anatomic site and date/time",
    "specialInstructions": "Collect an endocervical, endourethral or rectal-mucosal swab (without feces) directly into an approved VCM/UTM culture transport medium, and submit the ORIGINAL viral transport tube without transfer. Refrigerate immediately at 2–8°C and transport to Quest within 48 hours. Quest prefers -70°C frozen shipment if delays require longer holding, which ordinary clinic freezers cannot provide. DO NOT use bacterial Amies/ESwab, molecular transport, dry swabs, or any M4RT formulation unless Quest specifically approves it. Respiratory or conjunctival swabs are NOT accepted. A separate pediatric vaginal exception requires lab confirmation. Confirm account-specific test code, region and transport acceptance with Quest before collection.",
    "source": "Quest-performing UW Medicine sendout instructions, verified 2026-11-16 • https://labmed.washington.edu/test-guide/view/603",
    "clinicalCategories": [
      "infectious",
      "sti",
      "microbiology"
    ],
    "searchAliases": [
      "chlamydia culture",
      "chlamydiae culture",
      "c trachomatis culture",
      "genital chlamydia culture"
    ]
  },
  {
    "id": "quest-verified-unusable-audit-41-60-20261116-725",
    "testCode": "725",
    "testName": "Hippuric Acid, Urine",
    "status": "active",
    "specimenType": "Urine",
    "drawContainer": "Sterile cup",
    "alternativeContainer": "",
    "transportContainer": "Sterile cup",
    "preferredVolume": "3 mL end-of-shift urine",
    "minimumVolume": "1.1 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "stability": "Refrigerated up to 30 days; frozen up to 30 days; avoid room-temperature shipping",
    "specialLabeling": "Label URINE • END OF SHIFT, collection date/time",
    "specialInstructions": "Collect a separate urine specimen at END OF SHIFT in a clean, preservative-free leakproof Sterile cup. Submit the original labeled cup refrigerated with cold packs. No acid, transfer or additional processing is required for the unpreserved alternative. Do not pool with general random urine collected at another timepoint. Confirm the occupational timing, service area and local Quest receiving requirements. Confirm account-specific test code, region and transport acceptance with Quest before collection.",
    "source": "Quest-associated reference directory, reviewed 2026-11-16 • https://www.casandra.ai/catalog/test/hippuric-acid-urine",
    "clinicalCategories": [
      "toxicology",
      "urinary"
    ],
    "searchAliases": [
      "hippurate urine",
      "toluene metabolite",
      "hippuric acid end shift"
    ]
  },
  {
    "id": "quest-verified-unusable-audit-41-60-20261116-726",
    "testCode": "726",
    "testName": "Porphobilinogen, Quantitative, 24-Hour Urine",
    "status": "active",
    "specimenType": "24-Hour Urine",
    "drawContainer": "24-Hour Urine Container (no preservative)",
    "alternativeContainer": "",
    "transportContainer": "Amber Light-Protected Tube",
    "preferredVolume": "2 mL from mixed 24-hour urine",
    "minimumVolume": "1 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "stability": "Room unacceptable; refrigerated up to 7 days if pH 6–7; frozen up to 30 days if pH 6–7",
    "specialLabeling": "Label URINE, 24-hour total volume, start/end time and LIGHT PROTECTED",
    "specialInstructions": "Use Quest's acceptable UNPRESERVED ALTERNATIVE. Collect the complete 24-hour urine in a plain no-preservative collection container, refrigerating at 2–8°C and protecting from light throughout collection. Verify the collection pH is 6–7 for optimal stability; if pH cannot be confirmed or light protection is not possible, do not collect onsite. Mix entire jug and transfer 2 mL (minimum 1 mL) into a light-protected amber screw-cap transport tube. Refrigerate and ship with cold packs in a light-protected bag; do NOT send at room temperature. Record total urine volume, duration and patient collection times. Quest's preferred 5 g sodium carbonate collection system is not substituted here; do not add acid. Confirm account-specific test code, region and transport acceptance with Quest before collection.",
    "source": "Quest official test directory, reviewed 2026-11-16 • https://testdirectory.questdiagnostics.com/test/test-detail/726/porphobilinogen-quantitative-24-hour-urine?cc=MASTER",
    "clinicalCategories": [
      "urinary",
      "hematology"
    ],
    "searchAliases": [
      "PBG 24h urine",
      "porphobilinogen",
      "acute porphyria urine"
    ]
  },
  {
    "id": "quest-verified-unusable-audit-41-60-20261116-729",
    "testCode": "729",
    "testName": "Porphyrins, Fractionated, Quantitative, 24-Hour Urine",
    "status": "active",
    "specimenType": "24-Hour Urine",
    "drawContainer": "24-Hour Urine Container (no preservative)",
    "alternativeContainer": "",
    "transportContainer": "Amber Light-Protected Tube",
    "preferredVolume": "2 mL 24-hour urine aliquot",
    "minimumVolume": "1 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "stability": "Room unacceptable; refrigerated up to 7 days; frozen up to 30 days; reject pH below 4",
    "specialLabeling": "Label URINE, 24-hour total volume, start/end time and LIGHT PROTECTED",
    "specialInstructions": "Collect complete 24-hour urine WITHOUT preservative using Quest's accepted unpreserved alternative. Refrigerate throughout collection and keep the container COMPLETELY protected from light, using foil if no amber jug is available. After completion mix, document total volume/duration, then transfer 2 mL (minimum 1 mL) into an amber screw-cap transport tube or tightly foil-wrapped plastic transport tube. Keep refrigerated and protected from light for transport; never ship at room temperature. Sample pH must be at least 4; confirm local acceptance if pH cannot be assessed. Do not add unsupported sodium carbonate, acid or other chemicals. Confirm account-specific test code, region and transport acceptance with Quest before collection.",
    "source": "Quest official test directory, reviewed 2026-11-16 • https://testdirectory.questdiagnostics.com/test/test-detail/729/porphyrins-fractionated-quantitative-24-hour-urine?cc=MASTER",
    "clinicalCategories": [
      "urinary",
      "hematology"
    ],
    "searchAliases": [
      "24 hour urine porphyrins",
      "porphyria urine fractions",
      "uroporphyrin coproporphyrin"
    ]
  },
  {
    "id": "quest-verified-unusable-audit-41-60-20261116-734",
    "testCode": "734",
    "testName": "Potassium, 24-Hour Urine with Creatinine",
    "status": "active",
    "specimenType": "24-Hour Urine",
    "drawContainer": "24-Hour Urine Container (no preservative)",
    "alternativeContainer": "",
    "transportContainer": "Sterile cup",
    "preferredVolume": "10 mL 24-hour urine aliquot",
    "minimumVolume": "2 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "stability": "Room up to 7 days; refrigerated 7 days; frozen 28 days",
    "specialLabeling": "Label URINE, 24-hour total volume and collection start/end",
    "specialInstructions": "Collect the complete 24-hour urine specimen in the standard plain NO-PRESERVATIVE 24-hour urine container, refrigerating while collection is in progress. Do not include first morning void; include the corresponding next-morning final void. Mix the entire jug at completion, record total urine volume and collection duration on BOTH requisition and aliquot, then transfer 10 mL (minimum 2 mL) to one clean leakproof Sterile cup. Submit aliquot at room temperature without acid or other preservative. This is one timed urine SOURCE and one submitted cup; do not confuse the jug with an additional submitted container. Confirm account-specific test code, region and transport acceptance with Quest before collection.",
    "source": "Quest official test directory, reviewed 2026-11-16 • https://testdirectory.questdiagnostics.com/test/test-detail/734/potassium-24-hour-urine-with-creatinine?cc=MASTER",
    "clinicalCategories": [
      "renal",
      "urinary"
    ],
    "searchAliases": [
      "24h potassium",
      "24 hour urine potassium",
      "urine potassium creatinine"
    ]
  },
  {
    "id": "quest-verified-unusable-audit-41-60-20261116-749",
    "testCode": "749",
    "testName": "Protein, Total and Protein Electrophoresis, CSF",
    "status": "active",
    "specimenType": "CSF",
    "drawContainer": "Sterile cup",
    "alternativeContainer": "",
    "transportContainer": "Sterile cup",
    "preferredVolume": "6 mL CSF",
    "minimumVolume": "3.5 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "stability": "Room 48 hours; refrigerated 7 days; frozen 28 days",
    "specialLabeling": "Label CSF and collection date/time",
    "specialInstructions": "Qualified procedural clinician collects 6 mL CSF (minimum 3.5 mL) into an original sterile leakproof screw-cap Sterile cup without additive. Submit ORIGINAL CSF cup refrigerated at 2–8°C with cold packs; do not spin, transfer, or pool with other source fluids. Keep separately labeled if additional CSF testing requires different temperature or additional volume. Confirm that sufficient CSF is available for all ordered assays and check local Quest code availability. Confirm account-specific test code, region and transport acceptance with Quest before collection.",
    "source": "Quest IntelliTest Manager 2023-06-26, exact code 749 and 6 mL/3.5 mL CSF requirements • https://intellitestmanager.questdiagnostics.com/home/output/244897; Quest-performing Providence reference laboratory handling guide • https://www.providence.org/-/media/project/psjh/providence/norcal/files/humboldt/lab-manual-rev-18-june-2020.pdf",
    "clinicalCategories": [
      "neurology",
      "immunology"
    ],
    "searchAliases": [
      "CSF protein electrophoresis",
      "CSF PEP",
      "CSF protein fractions"
    ]
  },
  {
    "id": "quest-verified-unusable-audit-41-60-20261116-755",
    "testCode": "755",
    "testName": "Protein, Total, CSF",
    "status": "active",
    "specimenType": "CSF",
    "drawContainer": "Sterile cup",
    "alternativeContainer": "",
    "transportContainer": "Sterile cup",
    "preferredVolume": "1 mL CSF",
    "minimumVolume": "0.5 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "stability": "Room 7 days; refrigerated 7 days; frozen 28 days; gross hemolysis rejected",
    "specialLabeling": "Label CSF and collection date/time",
    "specialInstructions": "Qualified procedural clinician collects CSF directly into sterile leakproof screw-cap Sterile cup without preservatives. Submit ORIGINAL container refrigerated at 2–8°C with cold packs. No transfer or clinic-prepared smear. Do not combine distinct specimen types. Confirm volume sufficiency if other CSF sendouts are ordered, and avoid grossly bloody specimens. Confirm account-specific test code, region and transport acceptance with Quest before collection.",
    "source": "Quest official test directory, reviewed 2026-11-16 • https://testdirectory.questdiagnostics.com/test/test-detail/755/protein-total-csf?cc=MASTER",
    "clinicalCategories": [
      "neurology"
    ],
    "searchAliases": [
      "CSF protein",
      "cerebrospinal fluid protein",
      "CSF total protein"
    ]
  },
  {
    "id": "quest-verified-unusable-audit-41-60-20261116-838",
    "testCode": "838",
    "testName": "Sodium, 24-Hour Urine with Creatinine",
    "status": "active",
    "specimenType": "24-Hour Urine",
    "drawContainer": "24-Hour Urine Container (no preservative)",
    "alternativeContainer": "",
    "transportContainer": "Sterile cup",
    "preferredVolume": "10 mL 24-hour urine aliquot",
    "minimumVolume": "2 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "stability": "Room 7 days; refrigerated 7 days; frozen 28 days",
    "specialLabeling": "Label URINE, 24-hour total volume and collection start/end",
    "specialInstructions": "Collect complete 24-hour urine in a plain NO-PRESERVATIVE 24-hour collection container. Refrigerate while collecting and follow correct 24-hour start and end voids. Thoroughly mix the total collection; record total 24-hour volume, start/end times, duration and date on specimen and requisition. Submit 10 mL (minimum 2 mL) in one leakproof Sterile cup at room temperature, not the entire collection jug. No acid or preservation is necessary for this preferred pathway; compatible unpreserved 24-hour source may be aliquoted separately for potassium or other tests. Confirm account-specific test code, region and transport acceptance with Quest before collection.",
    "source": "Quest official test directory, reviewed 2026-11-16 • https://testdirectory.questdiagnostics.com/test/test-detail/838/sodium-24-hour-urine-with-creatinine?cc=MASTER",
    "clinicalCategories": [
      "renal",
      "urinary"
    ],
    "searchAliases": [
      "24h sodium",
      "24 hour urine sodium",
      "urinary sodium creatinine"
    ]
  },
  {
    "id": "quest-verified-unusable-audit-41-60-20261116-871",
    "testCode": "871",
    "testName": "Mycoplasma hominis/Ureaplasma Culture",
    "status": "active",
    "specimenType": "Site-Specific Culture Swab",
    "drawContainer": "Viral transport media (VCM/M4)",
    "alternativeContainer": "",
    "transportContainer": "Viral transport media (VCM/M4)",
    "preferredVolume": "One genital swab",
    "minimumVolume": "One swab",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "stability": "Room unacceptable; refrigerated up to 48 hours; -20°C unacceptable; -70°C frozen up to 30 days",
    "specialLabeling": "Label GENITAL SWAB and exact anatomical site; collection date/time",
    "specialInstructions": "GENITAL SWAB PATHWAY ONLY: obtain vaginal, endocervical or urethral swab directly into Quest-approved VCM/UTM viral culture medium, then submit the ORIGINAL viral transport tube. Refrigerate immediately at 2–8°C with cold packs; deliver to Quest within 48 hours. DO NOT use M4RT, Amies/ESwab, Aptima/molecular media, unpreserved dry swabs, or standard -20°C frozen storage. Alternative urine or neonatal respiratory specimens require different source-specific handling and are NOT covered by this swab entry. If 48-hour transit cannot be ensured, do not collect onsite. Confirm account-specific test code, region and transport acceptance with Quest before collection.",
    "source": "Quest official test directory, reviewed 2026-11-16 • https://testdirectory.questdiagnostics.com/test/test-detail/871/mycoplasma-hominis-ureaplasma-culture?cc=MASTER",
    "clinicalCategories": [
      "infectious",
      "sti",
      "microbiology"
    ],
    "searchAliases": [
      "ureaplasma culture",
      "mycoplasma hominis culture",
      "genital ureaplasma mycoplasma"
    ]
  },
  {
    "id": "quest-verified-unusable-audit-41-60-20261116-934",
    "testCode": "934",
    "testName": "VMA (Vanillylmandelic Acid), 24-Hour Urine without Creatinine",
    "status": "active",
    "specimenType": "24-Hour Urine",
    "drawContainer": "24-Hour Urine Container (no preservative)",
    "alternativeContainer": "",
    "transportContainer": "Sterile cup",
    "preferredVolume": "10 mL 24-hour urine aliquot",
    "minimumVolume": "5 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "spin": "No",
    "stability": "UNPRESERVED urine: room and refrigerated shipping unacceptable; frozen 30 days",
    "specialLabeling": "Label URINE, 24-hour total volume, age and start/end date/time",
    "specialInstructions": "Use Quest's approved UNPRESERVED alternative, not the acid-preserved preferred pathway. Collect complete 24-hour urine in a plain no-additive container, refrigerated during collection. Verify urine pH is 6 or lower; if not verified, do not collect onsite. Mix and aliquot 10 mL (minimum 5 mL) into one leakproof freezer-safe Sterile cup. FREEZE promptly, ship frozen on dry ice, never ship unpreserved urine refrigerated or at room temperature. Record 24-hour total volume and patient age on requisition and container. Preparation: avoid alcohol, coffee, tea, tobacco, bananas, citrus and strenuous exercise during prep as directed; any medication interruption requires the prescriber's approval. Confirm account-specific test code, region and transport acceptance with Quest before collection.",
    "source": "Quest official test directory, reviewed 2026-11-16 • https://testdirectory.questdiagnostics.com/test/test-detail/934/vma-vanillylmandelic-acid-24-hour-urine-without-creatinine?cc=MASTER",
    "clinicalCategories": [
      "endocrinology",
      "urinary",
      "oncology"
    ],
    "searchAliases": [
      "VMA 24h",
      "vanillylmandelic acid 24 hour",
      "24hr VMA"
    ]
  },
  {
    "id": "quest-verified-unusable-audit-41-60-20261116-1633",
    "testCode": "1633",
    "testName": "Calcium, Random Urine with Creatinine",
    "status": "active",
    "specimenType": "Urine",
    "drawContainer": "Sterile cup",
    "alternativeContainer": "",
    "transportContainer": "Sterile cup",
    "preferredVolume": "10 mL random urine",
    "minimumVolume": "2 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "stability": "Unpreserved urine: use refrigerated shipping; service-area temperature must be confirmed",
    "specialLabeling": "Label URINE and collection date/time",
    "specialInstructions": "Collect a random clean-catch URINE specimen in a standard plain leakproof Sterile cup, with NO preservative. Use only the Quest-listed unpreserved alternative, which is not the acidified preferred pathway in some service areas. Keep unpreserved urine REFRIGERATED with cold packs and submit original cup; do not add 6N HCl or any other acid. Do not pool with preserved urine. Verify receiving service-area rules for unpreserved specimen acceptance, as acidified urine is preferred in certain areas. Confirm account-specific test code, region and transport acceptance with Quest before collection.",
    "source": "Quest official test directory, reviewed 2026-11-16 • https://testdirectory.questdiagnostics.com/test/test-detail/1633/calcium-random-urine-with-creatinine?cc=MASTER",
    "clinicalCategories": [
      "renal",
      "urinary",
      "endocrinology"
    ],
    "searchAliases": [
      "spot urine calcium creatinine",
      "urine calcium creatinine ratio",
      "random urine calcium"
    ]
  },
  {
    "id": "quest-verified-unusable-audit-41-60-20261116-1659",
    "testCode": "1659",
    "testName": "Lactic Acid, CSF",
    "status": "active",
    "specimenType": "CSF",
    "drawContainer": "Sterile cup",
    "alternativeContainer": "",
    "transportContainer": "Sterile cup",
    "preferredVolume": "1 mL CSF",
    "minimumVolume": "0.5 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "spin": "No",
    "stability": "Room 3 hours; refrigerated 24 hours; frozen 90 days",
    "specialLabeling": "Label CSF and collection date/time",
    "specialInstructions": "Qualified procedural clinician obtains CSF directly in an original sterile leakproof screw-cap container. If CSF is CLEAR and not blood-contaminated, FREEZE promptly in original Sterile cup and ship frozen on dry ice. IF BLOODY OR CLOUDY, centrifuge promptly and transfer SUPERNATANT to an independently labeled sterile transport tube before freezing (the source/submit path changes for that condition); do not freeze unseparated bloody CSF. Prevent prolonged room-temperature holding. Quest warns that high-dose N-acetylcysteine may interfere with results. This entry models clear CSF only; bloody specimens require clinician/lab-specific processing review. Confirm account-specific test code, region and transport acceptance with Quest before collection.",
    "source": "Quest official test directory, reviewed 2026-11-16 • https://testdirectory.questdiagnostics.com/test/test-detail/1659/lactic-acid-csf?cc=MASTER",
    "clinicalCategories": [
      "neurology",
      "infectious"
    ],
    "searchAliases": [
      "CSF lactate",
      "cerebrospinal fluid lactate",
      "CSF lactic acid"
    ]
  },
  {
    "id": "quest-verified-unusable-audit-41-60-20261116-2649",
    "testCode": "2649",
    "testName": "Herpes Simplex Virus Culture with Reflex Typing",
    "status": "active",
    "specimenType": "Site-Specific Culture Swab",
    "drawContainer": "Viral transport media (VCM/M4)",
    "alternativeContainer": "",
    "transportContainer": "Viral transport media (VCM/M4)",
    "preferredVolume": "One lesion or mucosal swab",
    "minimumVolume": "One swab",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "stability": "VCM: room unacceptable, refrigerated 4 days; frozen -20°C unacceptable; frozen at -70°C or colder 30 days",
    "specialLabeling": "Label SWAB with exact source/site and collection date/time",
    "specialInstructions": "SWAB PATHWAY ONLY: collect the lesion vesicle base or selected mucosal site on a synthetic swab and place directly into approved Viral Culture Medium (VCM) or Quest-approved UTM equivalent. Submit the ORIGINAL capped viral transport tube without a specimen transfer. Refrigerate immediately with cold packs at 2–8°C and transport promptly (up to 4 days refrigerated). Do not use ESwab/Amies, dry swab, Aptima, formalin, or -20°C freezing. HSV culture of CSF or eye fluid is not appropriate; Quest recommends PCR for those sources. Other accepted fluids/tissues require independent collection plans, not the swab instructions shown here. Confirm account-specific test code, region and transport acceptance with Quest before collection.",
    "source": "Quest official test directory, reviewed 2026-11-16 • https://testdirectory.questdiagnostics.com/test/test-detail/2649/herpes-simplex-virus-culture-with-reflex-typing?cc=MASTER",
    "clinicalCategories": [
      "infectious",
      "sti",
      "microbiology"
    ],
    "searchAliases": [
      "HSV viral culture",
      "herpes simplex culture",
      "HSV culture reflex typing",
      "HSV swab culture"
    ]
  }
];
for(const record of additions){
 const existing=window.SEED_TESTS.find(t=>String(t.testCode||'').trim()===record.testCode);
 if(!existing){window.SEED_TESTS.push(record);continue;}
 if(existing.status==='reference'||existing.status==='pending')Object.assign(existing,record,{id:existing.id||record.id});
}
})();
