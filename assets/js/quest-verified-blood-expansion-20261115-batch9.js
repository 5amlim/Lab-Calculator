/* Verified Quest blood-first expansion batch 9, Nov 15 2026. Official directory sources per record.
 * All multi-specimen paths and required tube counts remain separate. No slide preparation.
 * Add new tests or upgrade directory-only references, never overwrite existing active catalog entries.
 */
(()=>{'use strict';if(!Array.isArray(window.SEED_TESTS))return;
const additions=[
  {
    "testCode": "3333",
    "testName": "Hydroxychloroquine, Blood",
    "specimenType": "Whole Blood",
    "drawContainer": "Lavender EDTA",
    "transportContainer": "Lavender EDTA (original tube)",
    "preferredVolume": "1 mL whole blood",
    "minimumVolume": "0.2 mL",
    "transportTemperature": "Room Temperature",
    "stability": "Room 30 days; refrigerated 30 days; frozen 30 days",
    "spin": "No",
    "specialInstructions": "Submit the intact, labeled EDTA whole-blood tube. Do not spin or transfer; no extra transport tube required.",
    "id": "quest-blood-verified-20261115-batch9-3333",
    "status": "active",
    "source": "Quest official test directory (verified 2026-11-15) • https://testdirectory.questdiagnostics.com/test/test-detail/3333/hydroxychloroquine-blood?cc=MASTER"
  },
  {
    "testCode": "35489",
    "testName": "Hemoglobinopathy Evaluation",
    "specimenType": "Whole Blood",
    "drawContainer": "Lavender EDTA",
    "transportContainer": "Lavender EDTA (original tube)",
    "preferredVolume": "1 full 5 mL EDTA tube",
    "minimumVolume": "1 mL",
    "transportTemperature": "Refrigerated",
    "stability": "Room 72 hours; refrigerated 7 days; frozen unacceptable",
    "spin": "No",
    "specialInstructions": "Submit original unspun EDTA whole blood. Provide patient age and ethnicity for interpretation; note transfusion in preceding 4 months. No preparation of blood slides or smears at the collection site. If shared with lead testing, use appropriate trace-metal-free EDTA tube and verify acceptance.",
    "id": "quest-blood-verified-20261115-batch9-35489",
    "status": "active",
    "source": "Quest official test directory (verified 2026-11-15) • https://testdirectory.questdiagnostics.com/test/test-detail/35489/hemoglobinopathy-evaluation?cc=MASTER"
  },
  {
    "testCode": "10379",
    "testName": "Hemoglobin A1c with eAG with Reflex to 1,5-Anhydroglucitol (1,5-AG)",
    "specimenType": "Whole Blood",
    "drawContainer": "Lavender EDTA",
    "transportContainer": "Lavender EDTA (original tube)",
    "preferredVolume": "One full EDTA whole-blood tube",
    "minimumVolume": "0.5 mL whole blood",
    "transportTemperature": "Room Temperature",
    "stability": "Room 7 days; refrigerated 7 days; frozen 28 days (per directory; never freeze primary whole blood without lab confirmation)",
    "spin": "No",
    "specialInstructions": "REQUIRES TWO DISTINCT SPECIMENS: EDTA whole blood for A1c plus separate spun serum for possible reflex 1,5-AG. Do not split or use the primary EDTA blood for serum. Reflex 1,5-AG if A1c is 6.5%-8.0%.",
    "additionalDrawRequirements": [
      {
        "container": "SST / Gold",
        "specimenType": "Serum",
        "count": 1,
        "preferredVolume": "1 mL serum",
        "minimumVolume": "0.5 mL serum",
        "transportContainer": "SST / Gold (spun)",
        "transportTemperature": "Room Temperature",
        "spin": "Yes",
        "specialInstructions": "Draw an additional SST/gold separate from EDTA; allow to clot and centrifuge. Submit original spun SST/gold tube per Quest directory, or red-top separated serum in Transport Tube if locally verified."
      }
    ],
    "id": "quest-blood-verified-20261115-batch9-10379",
    "status": "active",
    "source": "Quest official test directory (verified 2026-11-15) • https://testdirectory.questdiagnostics.com/test/test-detail/10379/hemoglobin-a1c-with-eag-with-reflex-to-15-anhydroglucitol-15-ag?cc=MASTER"
  },
  {
    "testCode": "58689",
    "testName": "Alternative Complement Pathway Functional, Serum (AH50)",
    "specimenType": "Serum",
    "drawContainer": "Red Top",
    "transportContainer": "Transport Tube",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "0.2 mL",
    "transportTemperature": "Frozen",
    "stability": "Room/refrigerated unacceptable; frozen 14 days",
    "spin": "Yes",
    "fastingStatus": "preferred",
    "fastingInstructions": "Fasting preferred by the Quest directory.",
    "specialInstructions": "TIME-SENSITIVE COMPLEMENT COLLECTION: use a plain red-top serum source, place immediately on wet ice and allow to clot. Centrifuge at 4 C; room-temperature centrifuge may be used only if tube stays on ice before and immediately after. Transfer serum to plastic Transport Tube; freeze within 30 minutes after centrifugation and ship frozen on dry ice. If this workflow cannot be met, do not collect. Confirm receiving-lab availability.",
    "id": "quest-blood-verified-20261115-batch9-58689",
    "status": "active",
    "source": "Quest official test directory (verified 2026-11-15) • https://testdirectory.questdiagnostics.com/test/test-detail/58689/alternative-complement-pathway-functional-serum?cc=MASTER"
  },
  {
    "testCode": "17365",
    "testName": "Thalassemia and Hemoglobinopathy Comprehensive Evaluation",
    "specimenType": "Whole Blood",
    "drawContainer": "Lavender EDTA",
    "transportContainer": "Lavender EDTA (original tube)",
    "collectionCount": 3,
    "submissionCount": 3,
    "preferredVolume": "Adult: 3 separate full EDTA tubes, 5 mL each; pediatric: 3 separate EDTA tubes, 1 mL each",
    "minimumVolume": "Adult: 2 separate 5 mL EDTA tubes; pediatric: 2 separate 1 mL EDTA tubes",
    "transportTemperature": "Refrigerated",
    "stability": "Serum/whole blood room or refrigerated up to 72 hours; whole blood frozen unacceptable",
    "spin": "No",
    "specialInstructions": "REQUIRED MULTI-TUBE COLLECTION: submit three independent, intact unspun EDTA whole-blood tubes (adult 5 mL each; pediatric 1 mL each) PLUS separate serum (see second required container). Lab must receive within 72 hours. Label whole blood and serum separately; provide patient age, sex, and recent transfusion history. Do not produce slides or smears at the collection site. Insulate EDTA tubes from ice packs; no freezing of whole blood.",
    "additionalDrawRequirements": [
      {
        "container": "SST / Gold",
        "specimenType": "Serum",
        "count": 1,
        "preferredVolume": "1 mL serum",
        "minimumVolume": "0.5 mL",
        "transportContainer": "Transport Tube",
        "transportTemperature": "Refrigerated",
        "spin": "Yes",
        "specialInstructions": "Collect separate SST/gold (or red-top without gel), clot, spin, and submit separated serum in green-badge Transport Tube. Label SERUM; refrigerated preferred."
      }
    ],
    "id": "quest-blood-verified-20261115-batch9-17365",
    "status": "active",
    "source": "Quest official test directory (verified 2026-11-15) • https://testdirectory.questdiagnostics.com/test/test-detail/17365/thalassemia-and-hemoglobinopathy-comprehensive-evaluation?cc=MASTER"
  },
  {
    "testCode": "90372",
    "testName": "Cholinesterase, RBC and Plasma (CA Clients)",
    "specimenType": "Whole Blood",
    "drawContainer": "Lavender EDTA",
    "transportContainer": "Lavender EDTA (original tube)",
    "preferredVolume": "4 mL unspun EDTA whole blood",
    "minimumVolume": "3 mL",
    "transportTemperature": "Refrigerated",
    "stability": "Room 24 hours; refrigerated 7 days; frozen unacceptable",
    "spin": "No",
    "specialInstructions": "CALIFORNIA PATIENTS ONLY. Two separate lavender tubes required: keep first 4 mL original whole blood unspun; spin second promptly and pour off 1 mL EDTA plasma (0.5 mL minimum) into green-badge Transport Tube, label PLASMA. Send both refrigerated; never send only one EDTA tube or packed cells.",
    "additionalDrawRequirements": [
      {
        "container": "Lavender EDTA",
        "specimenType": "Plasma",
        "count": 1,
        "preferredVolume": "1 mL EDTA plasma",
        "minimumVolume": "0.5 mL",
        "transportContainer": "Transport Tube",
        "transportTemperature": "Refrigerated",
        "spin": "Yes",
        "specialInstructions": "Separate second lavender EDTA draw; centrifuge promptly and transfer PLASMA to distinct plastic transport vial. Do not mix with whole-blood specimen."
      }
    ],
    "id": "quest-blood-verified-20261115-batch9-90372",
    "status": "active",
    "source": "Quest official test directory (verified 2026-11-15) • https://testdirectory.questdiagnostics.com/test/test-detail/90372/?cc=MASTER"
  },
  {
    "testCode": "90369",
    "testName": "Cholinesterase, Serum, Plasma, RBC (CA Clients)",
    "specimenType": "Whole Blood",
    "drawContainer": "Lavender EDTA",
    "transportContainer": "Lavender EDTA (original tube)",
    "preferredVolume": "4 mL unspun EDTA whole blood",
    "minimumVolume": "3 mL",
    "transportTemperature": "Refrigerated",
    "stability": "Room 24 hours; refrigerated 7 days; frozen unacceptable",
    "spin": "No",
    "specialInstructions": "CALIFORNIA PATIENTS ONLY. THREE SEPARATE PATHS: intact EDTA whole blood, plasma from a second EDTA tube, and serum from a serum draw. Submit serum and plasma as separate labeled Transport Tubes, whole blood in original lavender. Do not spin whole-blood tube; keep all refrigerated, never freeze.",
    "additionalDrawRequirements": [
      {
        "container": "Lavender EDTA",
        "specimenType": "Plasma",
        "count": 1,
        "preferredVolume": "1 mL EDTA plasma",
        "minimumVolume": "0.5 mL",
        "transportContainer": "Transport Tube",
        "transportTemperature": "Refrigerated",
        "spin": "Yes",
        "specialInstructions": "Spin separate EDTA lavender sample, transfer plasma into dedicated green-badge Transport Tube, label PLASMA."
      },
      {
        "container": "SST / Gold",
        "specimenType": "Serum",
        "count": 1,
        "preferredVolume": "1 mL serum",
        "minimumVolume": "0.5 mL",
        "transportContainer": "Transport Tube",
        "transportTemperature": "Refrigerated",
        "spin": "Yes",
        "specialInstructions": "Collect separate serum tube, clot and spin; transfer 1 mL serum to its own Transport Tube, label SERUM."
      }
    ],
    "id": "quest-blood-verified-20261115-batch9-90369",
    "status": "active",
    "source": "Quest official test directory (verified 2026-11-15) • https://testdirectory.questdiagnostics.com/test/test-detail/90369/?cc=MASTER"
  },
  {
    "testCode": "39481",
    "testName": "Cholinesterase, Serum, Plasma, RBC (non-CA)",
    "specimenType": "Whole Blood",
    "drawContainer": "Lavender EDTA",
    "transportContainer": "Lavender EDTA (original tube)",
    "preferredVolume": "4 mL unspun EDTA whole blood",
    "minimumVolume": "3 mL",
    "transportTemperature": "Refrigerated",
    "stability": "Room 24 hours; refrigerated 7 days; frozen unacceptable",
    "spin": "No",
    "specialInstructions": "NON-CALIFORNIA PATIENTS ONLY. Use Quest 90369 for California. Three required specimen paths: one intact EDTA whole blood, separate processed EDTA plasma, and processed serum. Send all refrigerated, not frozen. Keep source tubes/aliquots separate and label each specimen.",
    "additionalDrawRequirements": [
      {
        "container": "Lavender EDTA",
        "specimenType": "Plasma",
        "count": 1,
        "preferredVolume": "1 mL EDTA plasma",
        "minimumVolume": "0.5 mL",
        "transportContainer": "Transport Tube",
        "transportTemperature": "Refrigerated",
        "spin": "Yes",
        "specialInstructions": "Separate lavender tube (not whole-blood tube); spin and transfer plasma to its own Transport Tube."
      },
      {
        "container": "SST / Gold",
        "specimenType": "Serum",
        "count": 1,
        "preferredVolume": "1 mL serum",
        "minimumVolume": "0.5 mL",
        "transportContainer": "Transport Tube",
        "transportTemperature": "Refrigerated",
        "spin": "Yes",
        "specialInstructions": "Separate serum draw; spin and transfer serum to its own Transport Tube."
      }
    ],
    "id": "quest-blood-verified-20261115-batch9-39481",
    "status": "active",
    "source": "Quest official test directory (verified 2026-11-15) • https://testdirectory.questdiagnostics.com/test/test-detail/39481/cholinesterase-serum-plasma-rbc?cc=MASTER"
  }
];
for(const record of additions){const code=String(record.testCode);const existing=window.SEED_TESTS.findIndex(t=>String(t.testCode||'').trim()===code);if(existing<0){window.SEED_TESTS.push(record);continue;}if(['reference','pending'].includes(window.SEED_TESTS[existing].status)){window.SEED_TESTS[existing]={...window.SEED_TESTS[existing],...record,id:window.SEED_TESTS[existing].id||record.id};}}
})();
