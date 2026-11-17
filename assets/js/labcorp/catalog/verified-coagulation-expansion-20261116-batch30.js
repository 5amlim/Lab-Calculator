/* Labcorp duplicate-audited additions batch30 (2026-11-16).
 * Existing active and Do Not Perform records are preserved.
 * Serum vs citrated plasma are separate groups; frozen plasma goes in purple-cap PP Transpak.
 * No clinic-made slides, smears or unsupported preservatives. */
(()=>{'use strict';if(!Array.isArray(window.SEED_TESTS))return;
const additions=[
  {
    "id": "labcorp-verified-20261116-batch30-117150",
    "testCode": "117150",
    "testName": "Platelet Antibody Profile",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "alternativeContainer": "",
    "transportContainer": "Transport Tube",
    "preferredVolume": "0.5 mL serum",
    "minimumVolume": "0.5 mL serum",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "Yes",
    "stability": "Refrigerate up to 48 hours; freeze for longer storage",
    "specialLabeling": "Label serum and collection date/time",
    "specialInstructions": "Collect blood into SST / Gold (or SST / Tiger), allow to clot, centrifuge, and TRANSFER separated serum to a labeled plastic Transport Tube. Ship refrigerated with cold packs within 48 hours; freeze if longer storage is necessary. Do not submit unseparated serum or hemolyzed specimens. The assay detects circulating HLA class I and platelet-specific glycoprotein antibodies, not HIT. Verify current Labcorp account and receiving service-area acceptance before collection.",
    "source": "Labcorp official test directory, reviewed 2026-11-16 • https://www.labcorp.com/tests/117150/platelet-antibody-profile",
    "searchAliases": [
      "platelet antibody profile",
      "antiplatelet antibody indirect",
      "ITP platelet antibodies"
    ],
    "clinicalCategories": [
      "hematology",
      "immunology"
    ]
  },
  {
    "id": "labcorp-verified-20261116-batch30-117921",
    "testCode": "117921",
    "testName": "ADAMTS13 Activity Reflex Profile",
    "status": "active",
    "specimenType": "Plasma",
    "drawContainer": "Light Blue Sodium Citrate",
    "alternativeContainer": "",
    "transportContainer": "Frozen Transport Tube (Purple Cap)",
    "preferredVolume": "1 mL citrate plasma",
    "minimumVolume": "0.3 mL citrate plasma",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "spin": "Yes",
    "stability": "Room temperature 2 hours; frozen 14 days; up to 3 freeze/thaw cycles (avoid thawing)",
    "specialLabeling": "Label plasma and collection date/time",
    "specialInstructions": "Collect a FULL 3.2% sodium-citrate Light Blue Sodium Citrate tube (fill to mark), invert gently at least SIX times, and use a discard tube with butterfly draws when needed to fill collection tubing. Double-centrifuge to platelet-poor plasma without disturbing the buffy coat, transfer to a separate Labcorp PP Transpak Frozen Transport Tube (Purple Cap), freeze immediately and maintain frozen in transit. Each ordered frozen assay needs its own labeled frozen aliquot, never pool separate assays. Avoid heparinized collection lines. Activity is measured first; antibody reflex is performed when activity meets Labcorp reflex threshold. Keep frozen through shipment. Avoid noncitrate plasma or leaving plasma on cells. Verify current Labcorp account and receiving service-area acceptance before collection.",
    "source": "Labcorp official test directory, reviewed 2026-11-16 • https://www.labcorp.com/tests/117921/adamts13-activity-reflex-profile",
    "searchAliases": [
      "adamts13 reflex",
      "TTP adamts13 reflex",
      "adamt13 activity antibody"
    ],
    "clinicalCategories": [
      "coagulation"
    ]
  },
  {
    "id": "labcorp-verified-20261116-batch30-086284",
    "testCode": "086284",
    "testName": "von Willebrand Factor Disease (vWD) Reflex Profile",
    "status": "active",
    "specimenType": "Plasma",
    "drawContainer": "Light Blue Sodium Citrate",
    "alternativeContainer": "",
    "transportContainer": "Frozen Transport Tube (Purple Cap)",
    "preferredVolume": "3 mL citrate plasma in THREE separate 1 mL frozen vials",
    "minimumVolume": "2 mL citrate plasma total",
    "collectionCount": 3,
    "submissionCount": 3,
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "spin": "Yes",
    "stability": "Refrigerated max 4 hours before freezing; frozen for shipment",
    "specialLabeling": "Label plasma aliquots 1/3, 2/3 and 3/3 with collection date/time",
    "specialInstructions": "Collect a FULL 3.2% sodium-citrate Light Blue Sodium Citrate tube (fill to mark), invert gently at least SIX times, and use a discard tube with butterfly draws when needed to fill collection tubing. Double-centrifuge to platelet-poor plasma without disturbing the buffy coat, transfer to a separate Labcorp PP Transpak Frozen Transport Tube (Purple Cap), freeze immediately and maintain frozen in transit. Each ordered frozen assay needs its own labeled frozen aliquot, never pool separate assays. Avoid heparinized collection lines. REQUIRES THREE distinctly labeled frozen purple-cap transport aliquots of 1 mL each (3 mL preferred). Collect adequate full Light Blue Sodium Citrate tubes and use the volume guide: plan THREE full tubes as a conservative collection allowance, but confirm recovered plasma volume. Double centrifuge before dividing into THREE labeled aliquots. No tubes containing serum or heparin plasma. Reflex multimer and CBA testing performed at Labcorp when indicated. Verify current Labcorp account and receiving service-area acceptance before collection.",
    "source": "Labcorp official test directory, reviewed 2026-11-16 • https://www.labcorp.com/tests/086284/von-willebrand-factor-disease-vwd-reflex-profile",
    "searchAliases": [
      "vwd reflex profile",
      "von willebrand disease reflex",
      "vwf factor viii profile"
    ],
    "clinicalCategories": [
      "coagulation"
    ]
  },
  {
    "id": "labcorp-verified-20261116-batch30-117713",
    "testCode": "117713",
    "testName": "Plasminogen Activity",
    "status": "active",
    "specimenType": "Plasma",
    "drawContainer": "Light Blue Sodium Citrate",
    "alternativeContainer": "",
    "transportContainer": "Frozen Transport Tube (Purple Cap)",
    "preferredVolume": "1 mL citrate plasma",
    "minimumVolume": "0.5 mL citrate plasma (verify minimum)",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "spin": "Yes",
    "stability": "See official Labcorp test-specific storage requirements",
    "specialLabeling": "Label plasma and collection date/time",
    "specialInstructions": "Collect a FULL 3.2% sodium-citrate Light Blue Sodium Citrate tube (fill to mark), invert gently at least SIX times, and use a discard tube with butterfly draws when needed to fill collection tubing. Double-centrifuge to platelet-poor plasma without disturbing the buffy coat, transfer to a separate Labcorp PP Transpak Frozen Transport Tube (Purple Cap), freeze immediately and maintain frozen in transit. Each ordered frozen assay needs its own labeled frozen aliquot, never pool separate assays. Avoid heparinized collection lines. Platelet-poor plasma must be double-centrifuged, transferred and frozen as a dedicated aliquot. Do not pool with antigen test 117340. Verify current Labcorp account and receiving service-area acceptance before collection.",
    "source": "Labcorp official test directory, reviewed 2026-11-16 • https://www.labcorp.com/tests/117713/plasminogen-activity",
    "searchAliases": [
      "plasminogen functional activity",
      "plasminogen act",
      "fibrinolysis activity"
    ],
    "clinicalCategories": [
      "coagulation"
    ]
  },
  {
    "id": "labcorp-verified-20261116-batch30-117340",
    "testCode": "117340",
    "testName": "Plasminogen Antigen",
    "status": "active",
    "specimenType": "Plasma",
    "drawContainer": "Light Blue Sodium Citrate",
    "alternativeContainer": "",
    "transportContainer": "Frozen Transport Tube (Purple Cap)",
    "preferredVolume": "1 mL citrate plasma",
    "minimumVolume": "See official directory (no minimum specified)",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "spin": "Yes",
    "stability": "See official Labcorp test-specific storage requirements",
    "specialLabeling": "Label plasma and collection date/time",
    "specialInstructions": "Collect a FULL 3.2% sodium-citrate Light Blue Sodium Citrate tube (fill to mark), invert gently at least SIX times, and use a discard tube with butterfly draws when needed to fill collection tubing. Double-centrifuge to platelet-poor plasma without disturbing the buffy coat, transfer to a separate Labcorp PP Transpak Frozen Transport Tube (Purple Cap), freeze immediately and maintain frozen in transit. Each ordered frozen assay needs its own labeled frozen aliquot, never pool separate assays. Avoid heparinized collection lines. Plasma MUST undergo double centrifugation before freezing in purple-cap transport. Test separately from plasminogen activity 117713. Verify current Labcorp account and receiving service-area acceptance before collection.",
    "source": "Labcorp official test directory, reviewed 2026-11-16 • https://www.labcorp.com/tests/117340/plasminogen-antigen",
    "searchAliases": [
      "plasminogen antigen level",
      "plasminogen quantity",
      "plasminogen quantitative"
    ],
    "clinicalCategories": [
      "coagulation"
    ]
  },
  {
    "id": "labcorp-verified-20261116-batch30-117359",
    "testCode": "117359",
    "testName": "High Molecular Weight Kininogen (HMWK)",
    "status": "active",
    "specimenType": "Plasma",
    "drawContainer": "Light Blue Sodium Citrate",
    "alternativeContainer": "",
    "transportContainer": "Frozen Transport Tube (Purple Cap)",
    "preferredVolume": "1 mL citrate plasma",
    "minimumVolume": "See official directory (no minimum specified)",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "spin": "Yes",
    "stability": "See official Labcorp test-specific storage requirements",
    "specialLabeling": "Label plasma and collection date/time",
    "specialInstructions": "Collect a FULL 3.2% sodium-citrate Light Blue Sodium Citrate tube (fill to mark), invert gently at least SIX times, and use a discard tube with butterfly draws when needed to fill collection tubing. Double-centrifuge to platelet-poor plasma without disturbing the buffy coat, transfer to a separate Labcorp PP Transpak Frozen Transport Tube (Purple Cap), freeze immediately and maintain frozen in transit. Each ordered frozen assay needs its own labeled frozen aliquot, never pool separate assays. Avoid heparinized collection lines. Use filled 3.2% sodium-citrate tube; double centrifuge before frozen transfer. This is the Fitzgerald factor assay; keep separate from other frozen coagulation tests. Verify current Labcorp account and receiving service-area acceptance before collection.",
    "source": "Labcorp official test directory, reviewed 2026-11-16 • https://www.labcorp.com/tests/117359/high-molecular-weight-kininogen-hmwk",
    "searchAliases": [
      "hmwk",
      "kininogen high molecular weight",
      "fitzgerald factor"
    ],
    "clinicalCategories": [
      "coagulation"
    ]
  },
  {
    "id": "labcorp-verified-20261116-batch30-117739",
    "testCode": "117739",
    "testName": "Alpha-2-Antiplasmin (α2-Antiplasmin)",
    "status": "active",
    "specimenType": "Plasma",
    "drawContainer": "Light Blue Sodium Citrate",
    "alternativeContainer": "",
    "transportContainer": "Frozen Transport Tube (Purple Cap)",
    "preferredVolume": "1 mL citrate plasma",
    "minimumVolume": "0.5 mL citrate plasma",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "spin": "Yes",
    "stability": "Frozen; verify precise storage deadline with receiving lab",
    "specialLabeling": "Label plasma and collection date/time",
    "specialInstructions": "Collect a FULL 3.2% sodium-citrate Light Blue Sodium Citrate tube (fill to mark), invert gently at least SIX times, and use a discard tube with butterfly draws when needed to fill collection tubing. Double-centrifuge to platelet-poor plasma without disturbing the buffy coat, transfer to a separate Labcorp PP Transpak Frozen Transport Tube (Purple Cap), freeze immediately and maintain frozen in transit. Each ordered frozen assay needs its own labeled frozen aliquot, never pool separate assays. Avoid heparinized collection lines. Perform the same platelet-poor citrate plasma freeze workflow used for other Labcorp frozen coagulation assays; freeze immediately and submit as its own labeled specimen. Labcorp's official hemostasis list specifies 1 mL frozen citrate plasma and its specimen guidance specifies 0.5 mL minimum; confirm with receiving laboratory before collection. Verify current Labcorp account and receiving service-area acceptance before collection.",
    "source": "Labcorp official test directory, reviewed 2026-11-16 • https://www.labcorp.com/tests/related-documents/L830",
    "searchAliases": [
      "alpha 2 antiplasmin",
      "a2 antiplasmin",
      "plasmin inhibitor"
    ],
    "clinicalCategories": [
      "coagulation"
    ]
  }
];
for(const record of additions){const existing=window.SEED_TESTS.find(t=>String(t.testCode||'').trim()===record.testCode);if(!existing){window.SEED_TESTS.push(record);continue;}if(['pending','reference'].includes(existing.status))Object.assign(existing,record,{id:existing.id||record.id});}
})();
