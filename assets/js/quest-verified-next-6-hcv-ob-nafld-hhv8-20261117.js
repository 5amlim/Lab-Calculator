/* Nov 17, 2026 Quest next verified reference batch: HCV panels, prenatal, NAFLD and HHV-8.
 * Sources: Quest test-specific directories; 91979 & 15873 Quest-performed referral catalogs.
 * Preserve three distinct HCV blood/plasma routes, transport temperatures and original containers.
 * No interference with active or blocked catalog records. */
(()=>{'use strict';if(!Array.isArray(window.SEED_TESTS))return;
const additions=[
  {
    "alternativeContainer": "",
    "status": "active",
    "sourceRow": null,
    "id": "quest-reviewed-nov17-next-batch-91704",
    "testCode": "91704",
    "testName": "Hepatitis C-Infected Patient, Baseline Panel 1",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "preferredVolume": "3 full spun SST tubes for serum submitted at room temperature",
    "minimumVolume": "3 spun SST tubes per Quest panel instructions",
    "collectionCount": 3,
    "submissionCount": 3,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "Yes",
    "stability": "Panel components have separate temperatures. Room-temperature serum SST and EDTA whole blood; refrigerated additional serum SST and EDTA plasma.",
    "specialLabeling": "Label SERUM · ORIGINAL SST",
    "specialInstructions": "FOUR DISTINCT SPECIMEN ROUTES: (1) THREE full spun original SST tubes at ROOM TEMPERATURE; HIV serum must remain UNOPENED. (2) ONE additional full spun original SST tube REFRIGERATED, separate from the room-temperature SSTs. (3) ONE full unspun Lavender EDTA whole-blood tube at ROOM TEMPERATURE. (4) A SEPARATE EDTA lavender draw for 2 mL PLASMA, centrifuged at 800–1600 × g for 20 minutes and separated within 24 h into a dedicated sterile polypropylene Transport Tube, ship REFRIGERATED. Do not use the original whole-blood EDTA tube as the plasma aliquot and do not merge the two serum temperature bags. This is HCV baseline panel 1, including viral genotype, HIV, HAV and HBV serology. Confirm Quest receiving account/service area before collection; not offered at SJC.",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/91704/hepatitis-c-infected-patient-baseline-panel-1?cc=MASTER&p=r",
    "searchAliases": [
      "HCV baseline 1",
      "hepatitis C pre-treatment panel one",
      "hepatitis C with HAV HBV HIV baseline"
    ],
    "clinicalCategories": [
      "infectious",
      "hepatitis",
      "hematology"
    ],
    "additionalDrawRequirements": [
      {
        "container": "SST / Gold",
        "count": 1,
        "submissionCount": 1,
        "specimenType": "Serum",
        "purpose": "SERUM · ORIGINAL SST",
        "preferredVolume": "1 full spun SST tube",
        "minimumVolume": "1 full spun SST tube",
        "transportContainer": "SST / Gold (spun)",
        "transportTemperature": "Refrigerated",
        "transportTemperatureRaw": "Refrigerated",
        "spin": "Yes",
        "specialLabeling": "Label SERUM · ORIGINAL SST",
        "specialInstructions": "An ADDITIONAL spun original SST separate from the 3 ambient SSTs; ship refrigerated, do not pool or freeze."
      },
      {
        "container": "Lavender EDTA",
        "count": 1,
        "submissionCount": 1,
        "specimenType": "Whole Blood",
        "purpose": "WHOLE BLOOD · LAVENDER EDTA",
        "preferredVolume": "One full Lavender EDTA whole-blood tube",
        "minimumVolume": "One full Lavender EDTA tube",
        "transportContainer": "Lavender EDTA",
        "transportTemperature": "Room Temperature",
        "transportTemperatureRaw": "Room Temperature",
        "spin": "No",
        "specialLabeling": "Label WHOLE BLOOD · LAVENDER EDTA",
        "specialInstructions": "Leave unspun, original tube at ROOM TEMPERATURE. Must be a separate tube from EDTA used for plasma."
      },
      {
        "container": "Lavender EDTA",
        "count": 1,
        "submissionCount": 1,
        "specimenType": "Plasma",
        "purpose": "PLASMA · FROM LAVENDER EDTA",
        "preferredVolume": "2 mL EDTA plasma",
        "minimumVolume": "Verify code-specific minimum with Quest",
        "transportContainer": "Transport Tube",
        "transportTemperature": "Refrigerated",
        "transportTemperatureRaw": "Refrigerated",
        "spin": "Yes",
        "specialLabeling": "Label PLASMA · FROM LAVENDER EDTA",
        "specialInstructions": "Use a separate Lavender EDTA draw (PPT white-top accepted alternative but not modeled). Spin at 800–1600 × g for 20 min and transfer within 24 h to a labeled sterile polypropylene Transport Tube. Refrigerate; no heparin substitution."
      }
    ]
  },
  {
    "alternativeContainer": "",
    "status": "active",
    "sourceRow": null,
    "id": "quest-reviewed-nov17-next-batch-91706",
    "testCode": "91706",
    "testName": "Hepatitis C-Infected Patient, Treatment Panel",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "preferredVolume": "1 full spun SST tube",
    "minimumVolume": "1 full spun SST tube",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "Yes",
    "stability": "Serum RT 72h, refrigerated 5d, frozen unacceptable. EDTA whole blood RT 48h. Separated plasma refrigerated 14d, frozen 84d.",
    "specialLabeling": "Label SERUM · ORIGINAL SST",
    "specialInstructions": "REQUIRES FOUR PHYSICAL DRAWS: ONE spun SST submitted intact at ROOM TEMPERATURE, ONE separate original unspun Lavender EDTA WHOLE BLOOD tube at ROOM TEMPERATURE for CBC, and TWO ADDITIONAL Lavender EDTA tubes for HCV RNA PLASMA. Spin each of the two plasma-source EDTA tubes, transfer into TWO separate sterile plastic Transport Tubes, and submit REFRIGERATED. Do not submit the original plasma-source whole blood tubes. Do not freeze any whole blood or specimen in a primary collection tube. Separate plasma within 24 h; keep separate temperature bags. Confirm code and service area.",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/91706/hepatitis-c-infected-patient-treatment-panel?cc=MASTER&p=r",
    "searchAliases": [
      "HCV therapy monitoring panel",
      "HCV treatment RNA CBC ALT",
      "hepatitis C treatment monitoring"
    ],
    "clinicalCategories": [
      "infectious",
      "hepatitis",
      "hematology"
    ],
    "additionalDrawRequirements": [
      {
        "container": "Lavender EDTA",
        "count": 1,
        "submissionCount": 1,
        "specimenType": "Whole Blood",
        "purpose": "WHOLE BLOOD · LAVENDER EDTA",
        "preferredVolume": "One full Lavender EDTA whole-blood tube",
        "minimumVolume": "One full EDTA tube",
        "transportContainer": "Lavender EDTA",
        "transportTemperature": "Room Temperature",
        "transportTemperatureRaw": "Room Temperature",
        "spin": "No",
        "specialLabeling": "Label WHOLE BLOOD · LAVENDER EDTA",
        "specialInstructions": "Use dedicated whole-blood Lavender EDTA original, unspun, room temperature. Do not use either of the 2 plasma-draw tubes."
      },
      {
        "container": "Lavender EDTA",
        "count": 2,
        "submissionCount": 2,
        "specimenType": "Plasma",
        "purpose": "PLASMA · FROM LAVENDER EDTA · 2 SEPARATE ALIQUOTS",
        "preferredVolume": "2 distinct Lavender EDTA draws, each processed into its own plasma Transport Tube",
        "minimumVolume": "Two EDTA collection tubes required (no mL minimum specified for this route)",
        "transportContainer": "Transport Tube",
        "transportTemperature": "Refrigerated",
        "transportTemperatureRaw": "Refrigerated",
        "spin": "Yes",
        "specialLabeling": "Label PLASMA · FROM LAVENDER EDTA · 2 SEPARATE ALIQUOTS",
        "specialInstructions": "Collect TWO separate Lavender EDTA tubes, centrifuge, and pour plasma into TWO separate plastic Transport Tubes. Ship both refrigerated. Do not combine with serum or unspun EDTA blood; each source stays separately identifiable."
      }
    ]
  },
  {
    "alternativeContainer": "",
    "status": "active",
    "sourceRow": null,
    "id": "quest-reviewed-nov17-next-batch-91707",
    "testCode": "91707",
    "testName": "Hepatitis C-Infected Patient, Baseline Panel 2",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "preferredVolume": "2 full spun SST tubes",
    "minimumVolume": "2 full spun SST tubes",
    "collectionCount": 2,
    "submissionCount": 2,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "Yes",
    "stability": "Original spun SST serum room temperature per panel. EDTA whole blood room temperature; separated EDTA plasma refrigerated or frozen.",
    "specialLabeling": "Label SERUM · ORIGINAL SST",
    "specialInstructions": "THREE PHYSICAL SPECIMEN PREPARATIONS: TWO full spun original SSTs kept at ROOM TEMPERATURE (the SST used for HIV must remain UNOPENED), ONE separate full Lavender EDTA WHOLE BLOOD tube at ROOM TEMPERATURE, and 2 mL EDTA PLASMA from another separate Lavender EDTA collection, spun at 800–1600 × g for 20 min and separated within 24 h into its own labeled sterile polypropylene Transport Tube. Ship PLASMA REFRIGERATED (freezing is a Quest-accepted alternative but not default). Do not share the whole-blood EDTA tube with the plasma source. Panel excludes HAV/HBV testing; code 91704 is separate. Confirm service area.",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/91707/hepatitis-c-infected-patient-baseline-panel-2?cc=MASTER&p=r",
    "searchAliases": [
      "HCV baseline 2",
      "hepatitis C pre-treatment panel two",
      "HCV genotype HIV liver CBC"
    ],
    "clinicalCategories": [
      "infectious",
      "hepatitis",
      "hematology"
    ],
    "additionalDrawRequirements": [
      {
        "container": "Lavender EDTA",
        "count": 1,
        "submissionCount": 1,
        "specimenType": "Whole Blood",
        "purpose": "WHOLE BLOOD · LAVENDER EDTA",
        "preferredVolume": "One full Lavender EDTA whole-blood tube",
        "minimumVolume": "One full EDTA tube",
        "transportContainer": "Lavender EDTA",
        "transportTemperature": "Room Temperature",
        "transportTemperatureRaw": "Room Temperature",
        "spin": "No",
        "specialLabeling": "Label WHOLE BLOOD · LAVENDER EDTA",
        "specialInstructions": "Keep original whole blood unspun at room temperature; draw a different Lavender EDTA for plasma."
      },
      {
        "container": "Lavender EDTA",
        "count": 1,
        "submissionCount": 1,
        "specimenType": "Plasma",
        "purpose": "PLASMA · FROM LAVENDER EDTA",
        "preferredVolume": "2 mL EDTA plasma",
        "minimumVolume": "Verify code-specific minimum with Quest",
        "transportContainer": "Transport Tube",
        "transportTemperature": "Refrigerated",
        "transportTemperatureRaw": "Refrigerated",
        "spin": "Yes",
        "specialLabeling": "Label PLASMA · FROM LAVENDER EDTA",
        "specialInstructions": "Use a SECOND Lavender EDTA tube (PPT white top acceptable alternative). Spin at 800–1600 × g for 20 minutes and transfer the plasma within 24 h into a dedicated polypropylene Transport Tube. Ship refrigerated."
      }
    ]
  },
  {
    "alternativeContainer": "SST / Tiger",
    "status": "active",
    "sourceRow": null,
    "id": "quest-reviewed-nov17-next-batch-93802",
    "testCode": "93802",
    "testName": "Obstetric Panel with Fourth Generation HIV",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "Transport Tube",
    "preferredVolume": "7 mL serum total",
    "minimumVolume": "5 mL serum total",
    "collectionCount": 1,
    "submissionCount": 2,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "Yes",
    "usePreferredSerumYield": true,
    "stability": "Per individual component, serum and intact EDTA whole-blood specimens shipped at room temperature per Quest panel.",
    "specialLabeling": "Label SERUM · SST SOURCE",
    "specialInstructions": "Collect 7 mL serum TOTAL (minimum 5 mL) from spun SSTs: approximately THREE Gold SST (2.5 mL estimated serum each) or TWO Tiger SST (4 mL each), accounting for any other ordered tests. Quest lists plain serum Transport Tube submission; prepare TWO separately labeled Quest-approved plastic Transport Tubes if needed to safely accommodate the 7 mL total, and verify vial capacity/serum allocation with the receiving laboratory. HIV serum may instead be submitted unopened in a spun original SST if specifically directed by Quest; do not transfer that dedicated HIV specimen in such a route. ALSO collect ONE full original unspun Lavender EDTA WHOLE BLOOD tube and ONE full original unspun Pink EDTA WHOLE BLOOD tube; both room temperature and distinct. Do not substitute Pink for Lavender. Biotin may interfere; confirm provider-directed waiting period. Quest lists routine doses 8h and megadoses 72h. Confirm account/service area; SJC not offered.",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/93802/obstetric-panel-with-fourth-generation-hiv?cc=MASTER&p=r",
    "searchAliases": [
      "prenatal HIV panel",
      "OB panel with HIV 4th generation",
      "pregnancy infectious screen CBC type and screen"
    ],
    "clinicalCategories": [
      "pregnancy",
      "infectious",
      "hematology"
    ],
    "additionalDrawRequirements": [
      {
        "container": "Lavender EDTA",
        "count": 1,
        "submissionCount": 1,
        "specimenType": "Whole Blood",
        "purpose": "WHOLE BLOOD · LAVENDER EDTA",
        "preferredVolume": "1 full Lavender EDTA tube",
        "minimumVolume": "1 mL EDTA blood",
        "transportContainer": "Lavender EDTA",
        "transportTemperature": "Room Temperature",
        "transportTemperatureRaw": "Room Temperature",
        "spin": "No",
        "specialLabeling": "Label WHOLE BLOOD · LAVENDER EDTA",
        "specialInstructions": "Dedicated full Lavender EDTA CBC tube, original unspun, ship at room temperature; never refrigerate or pool with Pink EDTA."
      },
      {
        "container": "Pink EDTA",
        "count": 1,
        "submissionCount": 1,
        "specimenType": "Whole Blood",
        "purpose": "WHOLE BLOOD · PINK EDTA",
        "preferredVolume": "1 full Pink EDTA tube",
        "minimumVolume": "1 mL EDTA blood",
        "transportContainer": "Pink EDTA",
        "transportTemperature": "Room Temperature",
        "transportTemperatureRaw": "Room Temperature",
        "spin": "No",
        "specialLabeling": "Label WHOLE BLOOD · PINK EDTA",
        "specialInstructions": "Dedicated full Pink EDTA tube for ABO/Rh and antibody screen, original unspun, ship at room temperature. Follow 2-identifier blood-bank labeling."
      }
    ]
  },
  {
    "alternativeContainer": "",
    "status": "active",
    "sourceRow": null,
    "id": "quest-reviewed-nov17-next-batch-91979",
    "testCode": "91979",
    "testName": "NAFLD Fibrosis Score",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "preferredVolume": "1 mL serum in original spun SST",
    "minimumVolume": "0.5 mL serum",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "Yes",
    "stability": "Serum ambient 72h, refrigerated 5d, frozen unacceptable; EDTA whole blood ambient 48h, other temperatures not established in referral guide.",
    "specialLabeling": "Label SERUM",
    "specialInstructions": "Quest-Syracuse referral route: obtain 1 mL (min 0.5 mL) serum from ONE spun original Gold SST plus SEPARATE 1 mL (min 0.5 mL) unspun Lavender EDTA WHOLE BLOOD at ROOM TEMPERATURE. Enter age, sex, height, weight and diabetes status for the NAFLD fibrosis calculation. This is TIME-SENSITIVE and the referenced receiving menu specifies collections Monday–Thursday and AVOID Friday, weekends and before holidays. Do not freeze; validate with your actual Quest service area and pickup schedule before offering the test, as the referral policy may differ by region.",
    "source": "https://laboratory.crouse.org/tests/display/2900",
    "searchAliases": [
      "fatty liver fibrosis score",
      "NFS NAFLD",
      "NAFLD glucose AST ALT platelet albumin"
    ],
    "clinicalCategories": [
      "gastroenterology",
      "hepatology",
      "metabolic"
    ],
    "additionalDrawRequirements": [
      {
        "container": "Lavender EDTA",
        "count": 1,
        "submissionCount": 1,
        "specimenType": "Whole Blood",
        "purpose": "WHOLE BLOOD · LAVENDER EDTA",
        "preferredVolume": "1 mL whole blood in Lavender EDTA",
        "minimumVolume": "0.5 mL whole blood",
        "transportContainer": "Lavender EDTA",
        "transportTemperature": "Room Temperature",
        "transportTemperatureRaw": "Room Temperature",
        "spin": "No",
        "specialLabeling": "Label WHOLE BLOOD · LAVENDER EDTA",
        "specialInstructions": "A separate original Lavender EDTA tube, not spun. Ambient transport and time-sensitive dispatch; ensure patient demographic inputs for fibrosis score."
      }
    ]
  },
  {
    "alternativeContainer": "",
    "status": "active",
    "sourceRow": null,
    "id": "quest-reviewed-nov17-next-batch-15873",
    "testCode": "15873",
    "testName": "Herpesvirus 8 (HHV-8) DNA, Qualitative, Real-Time PCR",
    "specimenType": "Whole Blood",
    "drawContainer": "Lavender EDTA",
    "transportContainer": "Lavender EDTA",
    "preferredVolume": "One correctly filled Lavender EDTA tube; Quest reference assay needs 1–2 mL whole blood",
    "minimumVolume": "Whole-blood minimum not listed for this route; confirm Quest account-specific requirement",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "stability": "Whole blood room 48 hours, refrigerated 7 days, frozen 30 days for other specimen types; frozen WHOLE BLOOD is rejected.",
    "specialLabeling": "Label WHOLE BLOOD · LAVENDER EDTA",
    "specialInstructions": "Use ONE dedicated collection tube: a properly filled ORIGINAL Lavender EDTA tube (satisfy manufacturer fill and invert requirements), supplying 1–2 mL EDTA WHOLE BLOOD for this assay. Refrigerate with cold packs. Do NOT freeze whole blood or substitute heparin tubes. Other accepted specimen types may have different processing rules but are NOT modeled here. This route is based on a Quest-performed reference-laboratory manual matching code 15873. Quest performing locations and acceptance can vary; verify exact service-area instructions before collection.",
    "source": "https://www.rchsd.org/lab-test/herpes-virus-8-dna-qualitative-rt-pcr-15873/",
    "searchAliases": [
      "HHV8 PCR blood",
      "Kaposi herpesvirus PCR",
      "human herpesvirus 8 qualitative DNA"
    ],
    "clinicalCategories": [
      "infectious",
      "virology",
      "molecular"
    ]
  }
];
for (const candidate of additions) {
 const existing=window.SEED_TESTS.find(test=>String(test.testCode||'').trim()===candidate.testCode);
 if (!existing) {window.SEED_TESTS.push(candidate);continue;}
 if(existing.status==='reference'||existing.status==='pending')
   Object.assign(existing,candidate,{id:existing.id||candidate.id});
}
})();
