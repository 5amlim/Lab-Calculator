/* Quest audit reference rows immediately after 7002 (positions 141-160), 2026-11-16.
 * Eleven clinic-compatible pathways; slide preparation, FFPE blocks, active
 * tuberculosis isolates, unverified metal assays, five-point lactose load,
 * and scabies scrapings remain reference-only. Never overwrite active or blocked.
 */
(()=>{'use strict';if(!Array.isArray(window.SEED_TESTS))return;
const additions=[
  {
    "id": "quest-verified-audit-eighth20-20261116-7085",
    "testCode": "7085",
    "testName": "Multiple Sclerosis Panel 2",
    "status": "active",
    "specimenType": "CSF",
    "drawContainer": "Sterile cup",
    "alternativeContainer": "",
    "transportContainer": "Sterile cup",
    "preferredVolume": "4.2 mL CSF plus separately collected 3 mL serum",
    "minimumVolume": "2 mL CSF and 1.5 mL serum",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "stability": "Room 8 hours; refrigerated 7 days; frozen 21 days",
    "specialLabeling": "Label CSF, lumbar puncture source, date/time; pair with separately labeled SERUM",
    "specialInstructions": "Qualified procedural clinician obtains CSF into sterile leakproof collection container; clinic personnel only handle and ship the received, properly labeled specimen. Quest requires BOTH CSF and a matching serum specimen. Use the CSF collection tube #4 from the lumbar puncture when available to minimize blood contamination; submit the original sterile CSF container refrigerated with cold packs. Collect serum the same date/time where possible, or within 48 hours, and ship serum separately from cells in a labeled Transport Tube. Serum draw must be included in the plan; without serum the order is incomplete. Avoid bloody/hemolyzed or xanthochromic CSF. CSF serum specimens require separate source containers and cannot pool across specimen types. Confirm regional code and specimen acceptance with the receiving Quest account before collection.",
    "searchAliases": [
      "MS panel 2",
      "multiple sclerosis CSF serum",
      "CSF oligoclonal bands myelin basic protein",
      "MSP2"
    ],
    "clinicalCategories": [
      "neurology",
      "immunology"
    ],
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/7085/multiple-sclerosis-panel-2?cc=MASTER&p=r",
    "usePreferredSerumYield": true,
    "additionalDrawRequirements": [
      {
        "container": "SST / Gold",
        "count": 1,
        "specimenType": "Serum",
        "purpose": "Required paired serum for MS Panel 2",
        "preferredVolume": "3 mL serum",
        "minimumVolume": "1.5 mL serum",
        "transportContainer": "Transport Tube",
        "transportTemperature": "Refrigerated",
        "transportTemperatureRaw": "Refrigerated",
        "spin": "Yes",
        "specialLabeling": "Label SERUM and exact collection date/time (paired to CSF within 48 hours)",
        "specialInstructions": "Collect separately from CSF into SST / Gold (or Tiger SST setting); allow clotting, centrifuge, transfer 3 mL serum (minimum 1.5 mL) into labeled Transport Tube and refrigerate. Gold 5 mL versus Tiger 7.5 mL source-yield planning must be checked; do not assume one Gold can yield 3 mL. Date/time should match CSF if possible."
      }
    ]
  },
  {
    "id": "quest-verified-audit-eighth20-20261116-7329",
    "testCode": "7329",
    "testName": "Urea Clearance",
    "status": "active",
    "specimenType": "24-Hour Urine",
    "drawContainer": "24-Hour Urine Container (no preservative)",
    "alternativeContainer": "",
    "transportContainer": "Sterile cup",
    "preferredVolume": "10 mL from mixed complete 24-hour urine plus 1 mL serum",
    "minimumVolume": "2 mL urine plus 0.5 mL serum",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "stability": "Urine: room 24 h, refrigerated 7 days; serum: room 7 days; refrigerate only the urine aliquot",
    "specialLabeling": "Label 24-HOUR URINE total volume and collection start/end date/time; paired serum required",
    "specialInstructions": "Collect the complete 24-hour urine in a plain NO PRESERVATIVE jug, refrigerate during collection, measure and record total volume and start/end times. Mix full jug, then transfer 10 mL (minimum 2 mL) urine to a labeled leakproof Sterile cup, refrigerated with cold packs. SECOND REQUIRED SPECIMEN: collect serum from an SST / Gold tube, allow clot, spin and transfer 1 mL (minimum 0.5 mL) to a separate labeled Transport Tube. Send serum at ROOM TEMPERATURE, not in urine's refrigerated bag; record total timed urine volume on both urine container and requisition. Do NOT add 6N HCl or send urine jug as an additional submission tube. Confirm regional code and specimen acceptance with the receiving Quest account before collection.",
    "searchAliases": [
      "24h urea clearance",
      "urine urea nitrogen clearance",
      "renal urea clearance",
      "BUN and 24 hour urine"
    ],
    "clinicalCategories": [
      "renal",
      "urinary",
      "chemistry"
    ],
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/7329/urea-clearance",
    "additionalDrawRequirements": [
      {
        "container": "SST / Gold",
        "count": 1,
        "specimenType": "Serum",
        "purpose": "Required blood BUN specimen for Urea Clearance",
        "preferredVolume": "1 mL serum",
        "minimumVolume": "0.5 mL serum",
        "transportContainer": "Transport Tube",
        "transportTemperature": "Room Temperature",
        "transportTemperatureRaw": "Room Temperature",
        "spin": "Yes",
        "specialLabeling": "Label SERUM, collection date/time for paired Urea Clearance",
        "specialInstructions": "Collect separate serum in SST / Gold, centrifuge and transfer serum into ordinary green-badge Transport Tube. Ship at ROOM TEMPERATURE in separate bag from refrigerated 24-hour urine aliquot."
      }
    ]
  },
  {
    "id": "quest-verified-audit-eighth20-20261116-7507",
    "testCode": "7507",
    "testName": "Heavy Metals Panel, Random Urine",
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
    "specialLabeling": "Label URINE and collection date/time",
    "specialInstructions": "Collect RANDOM urine directly into a trace-metal-free or acid-washed PLASTIC container, without preservative or transfer. The original metal-free container is the submitted transport device, refrigerated with cold packs. Avoid worksite collection. Patient should avoid seafood for 48 hours before collection. Includes arsenic, lead, mercury and creatinine. Never group in an ordinary urine Sterile cup or with trace-metal urine requiring different transport temperatures. Quest says ordering restrictions and receiving-lab availability may apply. Confirm regional code and specimen acceptance with the receiving Quest account before collection.",
    "searchAliases": [
      "heavy metals random urine",
      "urinary arsenic lead mercury panel",
      "metals urine screen",
      "Hg Pb As urine"
    ],
    "clinicalCategories": [
      "heavy-metals",
      "toxicology",
      "urinary"
    ],
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/7507/heavy-metals-panel-random-urine?cc=MASTER&p=r"
  },
  {
    "id": "quest-verified-audit-eighth20-20261116-7558",
    "testCode": "7558",
    "testName": "IgG Synthesis Rate/Index, CSF",
    "status": "active",
    "specimenType": "CSF",
    "drawContainer": "Sterile cup",
    "alternativeContainer": "",
    "transportContainer": "Sterile cup",
    "preferredVolume": "2 mL CSF plus 1 mL serum",
    "minimumVolume": "1 mL CSF plus 0.5 mL serum",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "stability": "Room 8 h unacceptable for shipping; refrigerated 7 days; frozen 90 days",
    "specialLabeling": "Label CSF and date/time; pair with separately labeled SERUM collected within 48 hours",
    "specialInstructions": "Qualified procedural clinician obtains CSF into sterile leakproof collection container; clinic personnel only handle and ship the received, properly labeled specimen. Quest requires BOTH CSF and a paired serum specimen; use lumbar puncture tube #4 where practical. Submit original sterile CSF vial refrigerated at 2–8°C with cold packs. Draw paired serum preferably at same date/time, but within 48 hours is permitted. Process serum separately from cells and submit a second labeled Transport Tube. Reject RBC-contaminated, xanthochromic or hemolyzed CSF. Do not pool serum and CSF or ship at room temperature. Confirm regional code and specimen acceptance with the receiving Quest account before collection.",
    "searchAliases": [
      "CSF IgG index",
      "CSF synthesis rate",
      "IgG synthesis CSF serum",
      "CSF albumin index"
    ],
    "clinicalCategories": [
      "neurology",
      "immunology"
    ],
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/7558/igg-synthesis-rate-index-csf?cc=DAL&q=*",
    "additionalDrawRequirements": [
      {
        "container": "SST / Gold",
        "count": 1,
        "specimenType": "Serum",
        "purpose": "Paired serum required for CSF IgG synthesis rate/index",
        "preferredVolume": "1 mL serum",
        "minimumVolume": "0.5 mL serum",
        "transportContainer": "Transport Tube",
        "transportTemperature": "Refrigerated",
        "transportTemperatureRaw": "Refrigerated",
        "spin": "Yes",
        "specialLabeling": "Label SERUM and date/time paired to CSF (same time preferred)",
        "specialInstructions": "Obtain a separate SST / Gold serum specimen, allow clotting and spin; transfer serum into a Transport Tube and refrigerate. Must accompany CSF order; within 48 hours of CSF collection."
      }
    ]
  },
  {
    "id": "quest-verified-audit-eighth20-20261116-7599",
    "testCode": "7599",
    "testName": "Aromatic Solvents Metabolites Panel, Urine",
    "status": "active",
    "specimenType": "Urine",
    "drawContainer": "Sterile cup",
    "alternativeContainer": "",
    "transportContainer": "Sterile cup",
    "preferredVolume": "6 mL unpreserved urine",
    "minimumVolume": "3.7 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "stability": "Room 4 days; refrigerated 7 days; frozen 30 days",
    "specialLabeling": "Label URINE and collection date/time",
    "specialInstructions": "Collect unpreserved random urine in a clean leakproof Sterile cup with NO chemical additive. Submit the ORIGINAL Sterile cup refrigerated with cold packs. Quest published 6 mL preferred and 3.7 mL minimum. Confirm occupational timing and patient preparation with ordering clinician or receiving Quest laboratory; do not assume an end-of-shift requirement that the code does not explicitly state. Do not use a 24-hour jug, preserved urine tube, or special acid collection. Confirm regional code and specimen acceptance with the receiving Quest account before collection.",
    "searchAliases": [
      "aromatic solvent urine panel",
      "xylene ethylbenzene metabolites",
      "occupational aromatic solvents",
      "solvent metabolites urine"
    ],
    "clinicalCategories": [
      "toxicology",
      "occupational",
      "urinary"
    ],
    "source": "https://intellitestmanager.questdiagnostics.com/home/output/227753"
  },
  {
    "id": "quest-verified-audit-eighth20-20261116-7709",
    "testCode": "7709",
    "testName": "Cell Count and Differential, Peritoneal Fluid",
    "status": "active",
    "specimenType": "Peritoneal Fluid",
    "drawContainer": "Green Sodium Heparin",
    "alternativeContainer": "",
    "transportContainer": "Green Sodium Heparin",
    "preferredVolume": "3 mL peritoneal fluid",
    "minimumVolume": "1 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "stability": "Use prompt room-temperature transport; do not freeze; confirm service-area holding stability",
    "specialLabeling": "Label PERITONEAL FLUID, exact source, collection date/time",
    "specialInstructions": "Qualified procedural clinician collects PERITONEAL fluid, not blood, directly into a sterile sodium-heparin green-top tube. Mix gently to prevent clotting, cap and submit the ORIGINAL tube at room temperature. Exact specimen source PERITONEAL FLUID must appear on container and requisition. Never pool with a green-top blood draw or with other body-fluid sources. Lavender EDTA is another acceptable source-tube alternative but this pathway uses Green Sodium Heparin to keep fluid-source grouping distinct from hematology Lavender blood collection. Confirm regional code and specimen acceptance with the receiving Quest account before collection.",
    "searchAliases": [
      "peritoneal fluid differential",
      "ascites cell count",
      "peritoneal fluid WBC",
      "ascitic fluid nucleated cell count"
    ],
    "clinicalCategories": [
      "body-fluids",
      "hematology"
    ],
    "source": "https://www.biomarkerlens.com/biomarkers/lymphocytes-fluid-body-fluid"
  },
  {
    "id": "quest-verified-audit-eighth20-20261116-8355",
    "testCode": "8355",
    "testName": "Adenovirus Antigen, DFA",
    "status": "active",
    "specimenType": "Nasopharyngeal Swab",
    "drawContainer": "Viral transport medium (VCM)",
    "alternativeContainer": "",
    "transportContainer": "Viral transport medium (VCM)",
    "preferredVolume": "3 mL viral culture medium containing NP swab",
    "minimumVolume": "1 mL viral medium",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "stability": "VCM refrigerated promptly; room and frozen at -20°C unacceptable",
    "specialLabeling": "Label NASOPHARYNGEAL SWAB and collection date/time",
    "specialInstructions": "Collect one nasopharyngeal flocked synthetic swab directly into Quest-approved Viral Culture Medium (VCM) or validated viral transport equivalent. Submit the ORIGINAL capped viral transport tube refrigerated at 2–8°C with cold packs. DO NOT prepare slides or smears; Quest performs DFA. Quest January 2025 update removed throat, conjunctival and nasal swabs as acceptable sources. Dry swabs, bacterial culture media, nucleic acid testing media, raw/unpreserved specimens, and sputum are rejected. Alternative NP aspirate/bronchial lavage requires a distinct collection workflow. Confirm regional code and specimen acceptance with the receiving Quest account before collection.",
    "searchAliases": [
      "adenovirus DFA",
      "adenovirus fluorescent antigen",
      "adenovirus direct fluorescent antibody",
      "adenovirus NP antigen"
    ],
    "clinicalCategories": [
      "infectious",
      "respiratory"
    ],
    "source": "https://intellitestmanager.questdiagnostics.com/home/output/276982"
  },
  {
    "id": "quest-verified-audit-eighth20-20261116-8357",
    "testCode": "8357",
    "testName": "Influenza A and B Antigen, DFA",
    "status": "active",
    "specimenType": "Nasopharyngeal Swab",
    "drawContainer": "Viral transport medium (VCM)",
    "alternativeContainer": "",
    "transportContainer": "Viral transport medium (VCM)",
    "preferredVolume": "3 mL viral transport medium containing NP swab",
    "minimumVolume": "1 mL viral medium",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "stability": "VCM refrigerated up to 4 days; room and -20°C frozen unacceptable; -70°C freezing requires specialized freezer",
    "specialLabeling": "Label NASOPHARYNGEAL SWAB and collection date/time",
    "specialInstructions": "Collect one nasopharyngeal swab in approved Viral Culture Medium (VCM) or FDA-approved equivalent medium and submit the ORIGINAL capped tube refrigerated at 2–8°C. No collection-site slides or smear preparation: Quest performs direct fluorescent antibody examination. Do not use ESwab/Amies, dry swabs or routine NAAT medium. Raw NP washes and approved throat swabs have alternate source requirements; this entry models only the NP swab in viral transport. Confirm regional code and specimen acceptance with the receiving Quest account before collection.",
    "searchAliases": [
      "flu A B DFA",
      "influenza antigen direct fluorescent",
      "influenza immunofluorescence",
      "flu swab DFA"
    ],
    "clinicalCategories": [
      "infectious",
      "respiratory"
    ],
    "source": "https://intellitestmanager.questdiagnostics.com/home/output/238082"
  },
  {
    "id": "quest-verified-audit-eighth20-20261116-8476",
    "testCode": "8476",
    "testName": "Glucose Tolerance Test, Postprandial/1-Hour",
    "status": "active",
    "specimenType": "Plasma",
    "drawContainer": "Gray Fluoride/Oxalate",
    "alternativeContainer": "",
    "transportContainer": "Gray Fluoride/Oxalate",
    "preferredVolume": "1 mL plasma from a single timed gray-top tube",
    "minimumVolume": "0.5 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "Yes",
    "stability": "Original spun gray-top room up to 24 hours, refrigerated up to 72 hours; do not freeze whole blood",
    "specialLabeling": "1 hour",
    "specialInstructions": "Collect only ONE timed gray-top specimen exactly 1 hour after the patient starts the specified meal. Label 1-HOUR POSTPRANDIAL and record meal start/draw times. Fill gray sodium-fluoride/potassium-oxalate tube, invert, centrifuge and submit the ORIGINAL spun gray-top tube at room temperature. No fasting/baseline sample is included in this order. This timed draw must not pool with ordinary gray-top blood or any other timed protocol. Confirm whether gestational screening rather than a simple post-meal glucose is intended by the ordering provider. Confirm regional code and specimen acceptance with the receiving Quest account before collection.",
    "searchAliases": [
      "one hour postprandial glucose",
      "1h glucose meal",
      "PP glucose 1 hour",
      "post meal one hour glucose"
    ],
    "clinicalCategories": [
      "diabetes",
      "endocrinology"
    ],
    "source": "https://www.biomarkerlens.com/biomarkers/glucose-tolerance-test-postprandial1-hour-9bcc"
  },
  {
    "id": "quest-verified-audit-eighth20-20261116-8542",
    "testCode": "8542",
    "testName": "Herpes Simplex Virus 1/2 (IgG) Type Antibody, CSF",
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
    "stability": "Refrigerate for transport; confirm receiving-lab holding period",
    "specialLabeling": "Label CSF and collection date/time",
    "specialInstructions": "Qualified procedural clinician obtains CSF into sterile leakproof collection container; clinic personnel only handle and ship the received, properly labeled specimen. Collect CSF directly in a clean leakproof sterile screw-cap container, submit the ORIGINAL container refrigerated with cold packs. No clinician onsite needs to prepare a microscope slide, no transfer required. Quest 8542 measures HSV type-specific IgG indices in CSF, not HSV DNA PCR, and must not be substituted for HSV CSF PCR. Check service-area code and minimum CSF requirements before collection. Confirm regional code and specimen acceptance with the receiving Quest account before collection.",
    "searchAliases": [
      "HSV 1 2 IgG CSF",
      "herpes antibodies CSF",
      "HSV antibodies cerebrospinal fluid",
      "HSV 1 IgG index CSF",
      "HSV 2 IgG index CSF"
    ],
    "clinicalCategories": [
      "infectious",
      "neurology"
    ],
    "source": "https://kentri.testcatalog.org/show/Quest-8542-1"
  },
  {
    "id": "quest-verified-audit-eighth20-20261116-8627",
    "testCode": "8627",
    "testName": "Fungal Stain",
    "status": "active",
    "specimenType": "Wound Swab",
    "drawContainer": "ESwab (Amies)",
    "alternativeContainer": "",
    "transportContainer": "ESwab (Amies)",
    "preferredVolume": "One swab in bacterial Amies transport medium",
    "minimumVolume": "One swab",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "stability": "Swab in bacterial transport medium room 72 hours or refrigerated 72 hours; frozen unacceptable",
    "specialLabeling": "Label WOUND SWAB and collection date/time",
    "specialInstructions": "WOUND SWAB ROUTE ONLY: collect wound or lesion exudate using an ESwab in liquid Amies bacterial transport medium and submit ORIGINAL capped swab medium tube at room temperature. Quest laboratory performs KOH/calcofluor staining and microscopy. DO NOT prepare slides/smears onsite. This path is NOT approved for hair, nails, dermatologic scrapings, stool, corneal rims, bone, catheter tips, or raw fluid submitted through the swab entry. Viral transport medium is unacceptable. Check source-specific Quest acceptance because this test code also covers raw specimens with different temperatures. Confirm regional code and specimen acceptance with the receiving Quest account before collection.",
    "searchAliases": [
      "fungal stain KOH",
      "fungal smear",
      "fungal direct stain",
      "calcofluor stain",
      "KOH wound"
    ],
    "clinicalCategories": [
      "microbiology",
      "infectious"
    ],
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/8627/fungal-stain?cc=MASTER&p=r"
  }
];
for(const incoming of additions){
 const existing=window.SEED_TESTS.find(t=>String(t.testCode||'').trim()===incoming.testCode);
 if(!existing){window.SEED_TESTS.push(incoming);continue;}
 if(existing.status==='reference'||existing.status==='pending')Object.assign(existing,incoming,{id:existing.id||incoming.id});
}
})();
