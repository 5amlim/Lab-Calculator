/* Quest new verified additions batch30 2026-11-16. Duplicate-audited against active legacy and expansion catalogs.
 * Preserve blocked and active existing codes and source-specific collection/transport labels.
 * Separate specimen types and temperatures for paired tests, and 4 frozen PPP aliquots for 19681. */
(()=>{'use strict';if(!Array.isArray(window.SEED_TESTS))return;
const additions=[
  {
    "id": "quest-verified-20261116-batch30-10156",
    "testCode": "10156",
    "testName": "Lactoferrin, Qualitative, Stool",
    "status": "active",
    "specimenType": "Stool",
    "drawContainer": "Sterile cup",
    "alternativeContainer": "",
    "transportContainer": "Sterile cup",
    "preferredVolume": "1 g undiluted stool",
    "minimumVolume": "0.3 g",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "spin": "No",
    "stability": "Room up to 48 hours before freezing; refrigerated 14 days; frozen 21 days. Shipment must be frozen",
    "specialLabeling": "Label specimen and collection date/time",
    "specialInstructions": "Collect UNDILUTED stool in clean, dry original screw-cap Sterile cup without preservative, fixative, Cary-Blair medium or swab. Freeze the original container and ship frozen; do NOT thaw after freezing. Stool may be held at room temperature only briefly before freezing, no more than 48 hours from collection. Label STOOL and collection date/time. Confirm receiving-lab acceptance. Verify account and service-area acceptance before collection.",
    "source": "Quest official test directory, reviewed 2026-11-16 • https://testdirectory.questdiagnostics.com/test/test-detail/10156?cc=MASTER",
    "searchAliases": [
      "fecal lactoferrin qualitative",
      "stool lactoferrin",
      "lactoferrin qualitative",
      "IBD"
    ],
    "clinicalCategories": [
      "gi",
      "immunology"
    ]
  },
  {
    "id": "quest-verified-20261116-batch30-10379",
    "testCode": "10379",
    "testName": "Hemoglobin A1c with eAG with Reflex to 1,5-Anhydroglucitol (1,5-AG)",
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
    "stability": "Room 7 days; refrigerated 7 days; frozen 28 days for separated serum. Never freeze whole blood.",
    "specialLabeling": "Label specimen and collection date/time",
    "specialInstructions": "REQUIRES TWO DISTINCT SPECIMENS: 1 mL serum collected in SST / Gold (or SST / Tiger), spun and separated into a plastic Transport Tube, PLUS one FULL Lavender EDTA WHOLE BLOOD tube kept unspun in the original tube. Submit both at room temperature and label each separately. Do not use heparin plasma, gray-top fluoride/oxalate, or unspun SST. The receiving lab reflexes to 1,5-AG only if HbA1c is ≥6.5% and ≤8.0%. Do not substitute a single EDTA tube for both specimens. Verify account and service-area acceptance before collection.",
    "source": "Quest official test directory, reviewed 2026-11-16 • https://testdirectory.questdiagnostics.com/test/test-detail/10379?cc=MASTER",
    "searchAliases": [
      "a1c eag reflex 15 ag",
      "hba1c reflex glycomark",
      "A1c eAG 1 5 anhydroglucitol"
    ],
    "clinicalCategories": [
      "diabetes"
    ],
    "additionalDrawRequirements": [
      {
        "container": "Lavender EDTA",
        "count": 1,
        "submissionCount": 1,
        "specimenType": "Whole Blood",
        "purpose": "One full unspun EDTA tube for HbA1c",
        "preferredVolume": "One full EDTA whole blood tube",
        "minimumVolume": "0.5 mL EDTA whole blood",
        "transportContainer": "Lavender EDTA",
        "transportTemperature": "Room Temperature",
        "transportTemperatureRaw": "Room temperature; original unspun EDTA whole-blood tube",
        "spin": "No",
        "specialLabeling": "Label Whole Blood and collection date/time",
        "specialInstructions": "Submit original full Lavender EDTA tube UNspun. Keep separate from the serum Transport Tube. Do not centrifuge, aliquot, or freeze EDTA whole blood."
      }
    ]
  },
  {
    "id": "quest-verified-20261116-batch30-92062",
    "testCode": "92062",
    "testName": "Diabetes and ASCVD Risk Panel with Scores",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "alternativeContainer": "",
    "transportContainer": "SST / Gold (spun)",
    "preferredVolume": "4 mL serum",
    "minimumVolume": "2 mL serum",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "Yes",
    "stability": "Follow receiving Quest laboratory stability for serum and EDTA whole blood. Keep refrigerated; do not freeze whole blood.",
    "specialLabeling": "Label specimen and collection date/time",
    "specialInstructions": "REQUIRES TWO DIFFERENT SPECIMENS: 4 mL serum from centrifuged SST / Gold (or SST / Tiger if available) and 1 mL EDTA WHOLE BLOOD in a separately labeled Lavender EDTA tube. Both are refrigerated with cold packs, with the Lavender EDTA tube unspun. The Gold/Tiger serum yield calculation must allow for a 4 mL serum requirement (usually 2 Gold or 1 Tiger, not a single Gold). Risk-score calculation requires age, sex, race, systolic BP, BP treatment, diabetes status, and smoking status on requisition. Do not use gray-top fluoride or heparin plasma; verify regional availability. Verify account and service-area acceptance before collection.",
    "source": "Quest official test directory, reviewed 2026-11-16 • https://testdirectory.questdiagnostics.com/test/test-detail/92062?cc=MASTER",
    "searchAliases": [
      "ascvd diabetes risk score",
      "diabetes cardiovascular risk panel",
      "ASCVD risk panel"
    ],
    "clinicalCategories": [
      "diabetes",
      "lipids",
      "cardiac"
    ],
    "additionalDrawRequirements": [
      {
        "container": "Lavender EDTA",
        "count": 1,
        "submissionCount": 1,
        "specimenType": "Whole Blood",
        "purpose": "One EDTA whole blood tube for HbA1c",
        "preferredVolume": "1 mL EDTA whole blood",
        "minimumVolume": "0.5 mL EDTA whole blood",
        "transportContainer": "Lavender EDTA",
        "transportTemperature": "Refrigerated",
        "transportTemperatureRaw": "Refrigerated with cold packs",
        "spin": "No",
        "specialLabeling": "Label Whole Blood and collection date/time",
        "specialInstructions": "Original Lavender EDTA whole blood, do not centrifuge or transfer. Refrigerate with cold packs; do not freeze. Keep physically distinct from the spun serum SST."
      }
    ]
  },
  {
    "id": "quest-verified-20261116-batch30-19681",
    "testCode": "19681",
    "testName": "von Willebrand Comprehensive Panel 2 with Consultation",
    "status": "active",
    "specimenType": "Platelet-poor plasma",
    "drawContainer": "Light Blue Citrate",
    "alternativeContainer": "",
    "transportContainer": "Transport Tube",
    "preferredVolume": "Total 4 mL platelet-poor citrate plasma in FOUR separate 1 mL aliquots",
    "minimumVolume": "0.75 mL × 4 aliquots",
    "collectionCount": 3,
    "submissionCount": 4,
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "spin": "Yes",
    "stability": "Frozen 14 days; room/refrigerated specimens unacceptable",
    "specialLabeling": "Label Platelet-poor plasma, 1 of 4 through 4 of 4, and date/time of collection",
    "specialInstructions": "Requires FOUR separate, labeled frozen plastic Transport Tubes for four coagulation assays, with at least 0.75 mL EACH (1 mL preferred each). Fill 3.2% sodium citrate Light Blue Citrate tubes exactly to line; draw adequate full light blue tubes (plan three and verify usable volume). Invert gently 3-4 times. Within 60 minutes, centrifuge 15 min at approximately 1500 g, remove platelet-poor plasma without buffy coat, centrifuge a SECOND time, then transfer into FOUR separate plastic transport tubes. Must be platelet poor (<10,000 platelets/µL). FREEZE immediately and ship on dry ice. Do not refrigerate whole blood before processing, combine the frozen vials, or ship at room temperature. Includes PTT, Factor VIII, VWF antigen, ristocetin, collagen-binding assay, multimer analysis and consultation. Verify account and service-area acceptance before collection.",
    "source": "Quest official test directory, reviewed 2026-11-16 • https://testdirectory.questdiagnostics.com/test/test-detail/19681?cc=MASTER",
    "searchAliases": [
      "vwd comprehensive panel 2",
      "vwf coag consultation",
      "von willebrand 2 panel"
    ],
    "clinicalCategories": [
      "coagulation",
      "hematology"
    ]
  }
];
for(const record of additions){const existing=window.SEED_TESTS.find(t=>String(t.testCode||'').trim()===record.testCode);if(!existing){window.SEED_TESTS.push(record);continue;}if(['pending','reference'].includes(existing.status))Object.assign(existing,record,{id:existing.id||record.id});}
})();
