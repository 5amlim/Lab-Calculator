/* Verified Quest references #21-40 from November 16 not-usable audit.
 * 11 of 20 have supported collection, specimen preparation and submission flows.
 * Never activate existing blocked records or replace preverified active tests.
 * Urine metal-free containers require a separate source family from standard cups.
 */
(()=>{'use strict';if(!Array.isArray(window.SEED_TESTS))return;
const additions=[
  {
    "id": "quest-verified-audit-next20-20261116-401",
    "testCode": "401",
    "testName": "Cystine, Random Urine with Creatinine",
    "status": "active",
    "specimenType": "Urine",
    "drawContainer": "Sterile cup",
    "alternativeContainer": "",
    "transportContainer": "Transport Tube",
    "preferredVolume": "1.8 mL random urine",
    "minimumVolume": "0.6 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "spin": "No",
    "stability": "Frozen 28 days; room temperature and refrigerated shipment unacceptable",
    "specialLabeling": "Label URINE, patient age and collection date/time",
    "specialInstructions": "Collect clean-catch, first-void, catheterized, or random urine with NO preservative in a sterile screw-cap cup. Transfer 1.8 mL (minimum 0.6 mL) promptly into a labeled leakproof plastic Transport Tube. Freeze immediately, ship FROZEN on dry ice, and do not thaw. Room-temperature, refrigerated, thawed or pH below 2.0 specimens are rejected. Patient AGE is required for the reference interval. Do not pool a frozen aliquot with room-temperature or refrigerated submissions. Confirm this test code is accepted by the receiving Quest service area and account before collection.",
    "source": "Quest official Test Directory, verified 2026-11-16 • https://testdirectory.questdiagnostics.com/test/test-detail/401/cystine-random-urine-with-creatinine?cc=MASTER",
    "searchAliases": [
      "random urine cystine",
      "cystinuria random urine",
      "cystine creatinine"
    ],
    "clinicalCategories": [
      "urinary",
      "renal",
      "genetics"
    ]
  },
  {
    "id": "quest-verified-audit-next20-20261116-454",
    "testCode": "454",
    "testName": "Drug Screen Panel 5, Meconium",
    "status": "active",
    "specimenType": "Stool",
    "drawContainer": "Sterile cup",
    "alternativeContainer": "",
    "transportContainer": "Sterile cup",
    "preferredVolume": "5 g meconium",
    "minimumVolume": "1 g",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "stability": "Room 48 hours; refrigerated 7 days; frozen 30 days",
    "specialLabeling": "Label MECONIUM and collection date/time",
    "specialInstructions": "Collect first neonatal meconium stool in a clean sterile leakproof screw-cap Sterile cup without additives, fixative, transport medium or swab. Submit the original cup with at least 1 g meconium, ideally 5 g. Keep refrigerated with cold packs. DO NOT pool meconium with routine stool specimens or transfer to a preservation kit. Document source MECONIUM and collection date/time. This is a newborn-specific specimen; no slide or smear is prepared onsite. Confirm this test code is accepted by the receiving Quest service area and account before collection.",
    "source": "Quest official Test Directory, verified 2026-11-16 • https://testdirectory.questdiagnostics.com/test/test-detail/454/drug-screen-panel-5-meconium?cc=MASTER",
    "searchAliases": [
      "meconium drug screen",
      "meconium tox",
      "meconium panel 5",
      "neonatal drug screen"
    ],
    "clinicalCategories": [
      "toxicology",
      "pregnancy"
    ]
  },
  {
    "id": "quest-verified-audit-next20-20261116-468",
    "testCode": "468",
    "testName": "Glucose, CSF",
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
    "stability": "Room unacceptable; refrigerated 14 days (not the prescribed transport method); frozen 28 days",
    "specialLabeling": "Label CSF and collection date/time",
    "specialInstructions": "CSF is collected by a qualified procedural clinician, not by routine venipuncture. Collect CSF directly in an original sterile leakproof screw-cap Sterile cup with no additive. FREEZE IMMEDIATELY after collection and ship FROZEN on dry ice. Do not centrifuge, transfer to another container, or pool with a different specimen source. Hemolyzed specimens may be rejected. Confirm immediate-freezing capability before collection. Confirm this test code is accepted by the receiving Quest service area and account before collection.",
    "source": "Quest official Test Directory, verified 2026-11-16 • https://testdirectory.questdiagnostics.com/test/test-detail/468/glucose-csf?cc=MASTER",
    "searchAliases": [
      "cerebrospinal fluid glucose",
      "csf glucose"
    ],
    "clinicalCategories": [
      "neurology",
      "diabetes"
    ]
  },
  {
    "id": "quest-verified-audit-next20-20261116-497",
    "testCode": "497",
    "testName": "Gram Stain",
    "status": "active",
    "specimenType": "Site-Specific Culture Swab",
    "drawContainer": "ESwab (Amies)",
    "alternativeContainer": "",
    "transportContainer": "ESwab (Amies)",
    "preferredVolume": "1 ESwab specimen from wound/exudate/lesion/ocular site",
    "minimumVolume": "1 ESwab",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "stability": "Amies swab room 48 hours; other sources have different stability",
    "specialLabeling": "Label exact SWAB SOURCE and collection date/time",
    "specialInstructions": "THIS CALCULATOR ENTRY COVERS SITE-SPECIFIC SWAB COLLECTION ONLY. Collect site-specific wound, exudate, lesion or ocular specimen using an ESwab in liquid Amies; cap and submit the ORIGINAL swab tube without transfers or clinic-prepared slides. Label the exact anatomical collection site and date/time. If culture is also ordered, Quest requires a SECOND separately collected swab. Do not prepare slides or smears onsite. Quest code 497 also accepts sterile-container fluids, CSF, tissue and other sources with DIFFERENT collection rules; do not use this swab protocol for those specimens. Stool has different transport temperature. Confirm this test code is accepted by the receiving Quest service area and account before collection.",
    "source": "Quest official Test Directory, verified 2026-11-16 • https://testdirectory.questdiagnostics.com/test/test-detail/497/gram-stain?cc=MASTER",
    "searchAliases": [
      "gram stain swab",
      "wound gram stain",
      "site gram stain",
      "gram stain microscopy"
    ],
    "clinicalCategories": [
      "microbiology",
      "infectious"
    ]
  },
  {
    "id": "quest-verified-audit-next20-20261116-518",
    "testCode": "518",
    "testName": "Hemosiderin Stain, Urine",
    "status": "active",
    "specimenType": "Urine",
    "drawContainer": "Sterile cup",
    "alternativeContainer": "",
    "transportContainer": "Sterile cup",
    "preferredVolume": "30 mL unpreserved urine",
    "minimumVolume": "20 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "stability": "Room 7 days only for preserved specimens; refrigerated 7 days for unpreserved; frozen unacceptable",
    "specialLabeling": "Label URINE and collection date/time; first morning preferred",
    "specialInstructions": "Early-morning urine is preferred. Collect 30 mL (minimum 20 mL) of unpreserved urine in a clean leakproof Sterile cup and submit the ORIGINAL cup refrigerated with cold packs. NO boric-acid preservation needed for this acceptable alternative. Quest performs the stain; the clinic must NOT prepare slides or smears. Do not freeze. Confirm receiving laboratory acceptance of the unpreserved specimen. Confirm this test code is accepted by the receiving Quest service area and account before collection.",
    "source": "HealthLab Quest performing-laboratory directory alias #518, updated 2026-01-21, verified 2026-11-16 • https://www.healthlabtesting.com/Test%20Directory/Test%20Directory%20Item.aspx?itemGuid=89a7b5c7-3251-4d6f-aef4-da70a2902dce",
    "searchAliases": [
      "urine hemosiderin",
      "hemosiderin urine stain"
    ],
    "clinicalCategories": [
      "urinary",
      "hematology"
    ]
  },
  {
    "id": "quest-verified-audit-next20-20261116-585",
    "testCode": "585",
    "testName": "Lactic Acid, Plasma",
    "status": "active",
    "specimenType": "Plasma",
    "drawContainer": "Gray Fluoride/Oxalate",
    "alternativeContainer": "",
    "transportContainer": "Transport Tube",
    "preferredVolume": "2 mL separated gray-top plasma",
    "minimumVolume": "0.5 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "spin": "Yes",
    "stability": "Unseparated blood on ice only until processing; separated plasma refrigerated 72 hours; frozen 30 days; room temperature unacceptable",
    "specialLabeling": "Label PLASMA from GRAY Fluoride/Oxalate, collection and separation time",
    "specialInstructions": "Collect using GRAY Fluoride/Oxalate, without prolonged tourniquet or fist clenching; if tourniquet used, release for 1 minute before venipuncture. Immediately invert/mix the drawn gray tube and place on ice. Centrifuge and SEPARATE PLASMA FROM CELLS WITHIN 3 HOURS, then transfer to one labeled plastic Transport Tube. FREEZE the separated plasma and ship frozen on dry ice. Do not ship the original whole-blood tube frozen, and do not pool with serum, heparin plasma or unfrozen specimens. This test has time-sensitive handling: do not collect if rapid icing and processing cannot be guaranteed. Confirm this test code is accepted by the receiving Quest service area and account before collection.",
    "source": "Quest official Test Directory, verified 2026-11-16 • https://testdirectory.questdiagnostics.com/test/test-detail/585/lactic-acid-plasma?cc=MASTER",
    "searchAliases": [
      "lactate plasma",
      "plasma lactic acid",
      "gray top lactate"
    ],
    "clinicalCategories": [
      "diabetes"
    ]
  },
  {
    "id": "quest-verified-audit-next20-20261116-601",
    "testCode": "601",
    "testName": "Lead, Urine",
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
    "stability": "Room 48 hours; refrigerated 5 days; frozen 14 days",
    "specialLabeling": "Label URINE • TRACE METAL-FREE and collection date/time",
    "specialInstructions": "Collect urine directly into an acid-washed, TRACE METAL-FREE plastic urine collection container. Submit the ORIGINAL trace-metal-free container refrigerated with cold packs; no transfer to an ordinary sterile cup or urine preservative tube. Avoid worksite collection and environmental contamination. If multiple trace-metal urine tests are ordered, use sufficient volume and receiving-lab-approved compatible aliquots; do not pool with routine urine. Avoid metal-contaminated collection equipment. Confirm this test code is accepted by the receiving Quest service area and account before collection.",
    "source": "Quest official Test Directory, verified 2026-11-16 • https://testdirectory.questdiagnostics.com/test/test-detail/601/lead-urine?cc=MASTER",
    "searchAliases": [
      "urinary lead",
      "urine lead creatinine",
      "lead urine"
    ],
    "clinicalCategories": [
      "heavy-metals",
      "urinary"
    ]
  },
  {
    "id": "quest-verified-audit-next20-20261116-637",
    "testCode": "637",
    "testName": "Mercury, Random Urine",
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
    "stability": "Room 48 hours; refrigerated 5 days; frozen 14 days",
    "specialLabeling": "Label URINE • TRACE METAL-FREE and collection date/time",
    "specialInstructions": "Avoid seafood consumption for 48 hours before collection. Collect random urine directly into an acid-washed, TRACE METAL-FREE plastic container away from the worksite. Submit the ORIGINAL leakproof metal-free container refrigerated with cold packs. No transfer to an ordinary sterile cup or preservative tube. Keep source separate from routine urine and avoid contamination. Confirm compatible aliquots and adequate volume if another metal test is ordered. Confirm this test code is accepted by the receiving Quest service area and account before collection.",
    "source": "Quest official Test Directory, verified 2026-11-16 • https://testdirectory.questdiagnostics.com/test/test-detail/637/mercury-random-urine?cc=MASTER",
    "searchAliases": [
      "urinary mercury",
      "urine mercury",
      "inorganic mercury urine"
    ],
    "clinicalCategories": [
      "heavy-metals",
      "urinary"
    ]
  },
  {
    "id": "quest-verified-audit-next20-20261116-672",
    "testCode": "672",
    "testName": "Cadmium, Random Urine",
    "status": "active",
    "specimenType": "Urine",
    "drawContainer": "Trace Metal-Free Plastic Container",
    "alternativeContainer": "",
    "transportContainer": "Trace Metal-Free Plastic Container",
    "preferredVolume": "7 mL random urine",
    "minimumVolume": "3 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "stability": "Room 5 days; refrigerated 7 days; frozen 14 days",
    "specialLabeling": "Label URINE • TRACE METAL-FREE and collection date/time",
    "specialInstructions": "Collect random urine directly into a TRACE METAL-FREE or acid-washed plastic container, avoiding worksite contamination and all routine urine cups or preservative tubes. Submit the ORIGINAL metal-free container at ROOM TEMPERATURE. This assay uses a room-temperature bag: do not automatically place the same submitted container into the refrigerated lead/mercury bag; use independently labeled Quest-approved aliquots as needed. Do not pool with ordinary urine. Confirm this test code is accepted by the receiving Quest service area and account before collection.",
    "source": "Quest official Test Directory, verified 2026-11-16 • https://testdirectory.questdiagnostics.com/test/test-detail/672/cadmium-random-urine?cc=MASTER",
    "searchAliases": [
      "urinary cadmium",
      "urine cadmium",
      "cadmium creatinine"
    ],
    "clinicalCategories": [
      "heavy-metals",
      "urinary"
    ]
  },
  {
    "id": "quest-verified-audit-next20-20261116-674",
    "testCode": "674",
    "testName": "Oligoclonal Bands (IgG), CSF",
    "status": "active",
    "specimenType": "CSF",
    "drawContainer": "Sterile cup",
    "alternativeContainer": "",
    "transportContainer": "Sterile cup",
    "preferredVolume": "1 mL CSF",
    "minimumVolume": "0.5 mL CSF",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "stability": "Room unacceptable; refrigerated 20 days; frozen 30 days",
    "specialLabeling": "Label CSF and collection date/time; paired SERUM must be separately labeled",
    "specialInstructions": "REQUIRES PAIRED CSF AND SERUM; two separately labeled specimen containers. CSF must be obtained by a qualified procedural clinician; fourth CSF tube is preferred to reduce blood contamination. Submit 1 mL CSF (minimum 0.5 mL) in original sterile screw-cap CSF cup, refrigerated at 2–8 C with cold packs (freezing CSF at -20 C and shipping frozen is an alternative only if coordinated). Obtain 1 mL paired serum (minimum 0.5 mL) preferably at the same time, but within 48 hours is acceptable. Centrifuge SST / Gold and transfer the separated serum to its own labeled plastic Transport Tube. Refrigerate CSF and serum; do not mix or pool the two specimen sources. Received room-temperature specimens are rejected. Confirm this test code is accepted by the receiving Quest service area and account before collection.",
    "source": "Quest official Test Directory, verified 2026-11-16 • https://testdirectory.questdiagnostics.com/test/test-detail/674/oligoclonal-bands-igg-csf?cc=MASTER",
    "searchAliases": [
      "oligoclonal bands",
      "oligoclonal CSF",
      "OBANDS",
      "CSF OCB"
    ],
    "clinicalCategories": [
      "neurology",
      "immunology"
    ],
    "additionalDrawRequirements": [
      {
        "container": "SST / Gold",
        "count": 1,
        "submissionCount": 1,
        "specimenType": "Serum",
        "purpose": "Required paired serum",
        "preferredVolume": "1 mL separated serum",
        "minimumVolume": "0.5 mL serum",
        "transportContainer": "Transport Tube",
        "transportTemperature": "Refrigerated",
        "transportTemperatureRaw": "Refrigerated (cold packs)",
        "spin": "Yes",
        "specialLabeling": "Label SERUM and collection date/time",
        "specialInstructions": "Collect paired serum preferably at the same time as CSF, acceptable within 48 hours. Allow SST / Gold or SST / Tiger to clot, centrifuge and transfer separated serum to a dedicated labeled Transport Tube. Refrigerate and ship separately from CSF; no source mixing."
      }
    ]
  },
  {
    "id": "quest-verified-audit-next20-20261116-682",
    "testCode": "682",
    "testName": "Oxalic Acid, 24-Hour Urine with Creatinine",
    "status": "active",
    "specimenType": "24-Hour Urine",
    "drawContainer": "24-Hour Urine Container (no preservative)",
    "alternativeContainer": "",
    "transportContainer": "Sterile cup",
    "preferredVolume": "10 mL unpreserved 24-hour urine aliquot",
    "minimumVolume": "2 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "stability": "Room 7 days; refrigerated 7 days; frozen 24 days",
    "specialLabeling": "Label URINE • 24-HOUR TOTAL VOLUME and start/end date/time",
    "specialInstructions": "Use the QUEST-LISTED NO-PRESERVATIVE ALTERNATIVE, NOT 6N HCl or boric acid. Give the patient a plain 24-hour urine collection jug without acid or additive. Discard initial morning void, then collect every subsequent void including same-time next-morning void. Refrigerate the collection while in progress. Mix well after completion, record total 24-hour volume, duration and date/time, and transfer 10 mL (minimum 2 mL) to a labeled leakproof Sterile cup for submission at room temperature. DO NOT substitute a routine random urine. Advise the patient to avoid excessive vitamin C and oxalate-rich foods (spinach, coffee, tea, chocolate, rhubarb) at least 48 hours prior to the collection period. Confirm this test code is accepted by the receiving Quest service area and account before collection.",
    "source": "Quest official Test Directory, verified 2026-11-16 • https://testdirectory.questdiagnostics.com/test/test-detail/682/oxalic-acid-24-hour-urine-with-creatinine?cc=MASTER",
    "searchAliases": [
      "24hr oxalate",
      "oxalate 24h urine",
      "oxalic acid urine"
    ],
    "clinicalCategories": [
      "renal",
      "urinary"
    ]
  }
];
for(const record of additions){
 const existing=window.SEED_TESTS.find(t=>String(t.testCode||'').trim()===record.testCode);
 if(!existing){window.SEED_TESTS.push(record);continue;}
 if(existing.status==='reference'||existing.status==='pending')Object.assign(existing,record,{id:existing.id||record.id});
}
})();
