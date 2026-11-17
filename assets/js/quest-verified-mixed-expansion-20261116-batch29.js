/* Quest 2026-11-16 verified update, duplicate-audited.
 * Existing Quest catalog records are left unchanged.
 * Only 37675 was absent from the pre-existing active and loaded catalog. */
(()=>{'use strict';if(!Array.isArray(window.SEED_TESTS))return;
const additions=[
  {
    "id": "quest-verified-20261116-batch29-37675",
    "status": "active",
    "testCode": "37675",
    "testName": "T4 (Thyroxine), Total with Reflex to TSH",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "alternativeContainer": "",
    "transportContainer": "SST / Gold (spun)",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "0.5 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "Yes",
    "stability": "Room 7 days; refrigerated 7 days; frozen 28 days",
    "specialLabeling": "Label serum, collection date and time",
    "specialInstructions": "Collect SST / Gold (or SST / Tiger), allow to clot, centrifuge, and submit the original spun SST at room temperature. The reflex TSH is triggered only when total T4 meets laboratory reflex criteria. This code is not available in all service areas; confirm account eligibility before collecting.",
    "source": "Quest official test directory, reviewed 2026-11-16 • https://testdirectory.questdiagnostics.com/test/test-detail/37675?cc=MASTER",
    "searchAliases": [
      "t4 reflex tsh",
      "thyroxine tsh reflex",
      "total t4 tsh"
    ],
    "clinicalCategories": [
      "endocrinology"
    ]
  }
];
for(const record of additions){const existing=window.SEED_TESTS.find(t=>String(t.testCode||'').trim()===record.testCode);if(!existing){window.SEED_TESTS.push(record);continue;}if(['pending','reference'].includes(existing.status))Object.assign(existing,record,{id:existing.id||record.id});}
})();
