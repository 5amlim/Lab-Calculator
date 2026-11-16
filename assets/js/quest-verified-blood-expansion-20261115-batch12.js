/* Verified blood-only expansion batch 12 (2026-11-15), Quest.
 * Exact lab catalog codes, collection / submission distinction, source references.
 * Preserve pre-existing validated and blocked profiles. Upgrade only matching pending references.
 */
(()=>{'use strict';if(!Array.isArray(window.SEED_TESTS))return;
const additions=[
  {
    "id": "quest-verified-blood-20261115-batch12-16485",
    "testCode": "16485",
    "testName": "GP210 Antibody, IgG, Serum",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "alternativeContainer": "",
    "transportContainer": "Transport Tube",
    "collectionCount": 1,
    "submissionCount": 1,
    "preferredVolume": "0.5 mL serum",
    "minimumVolume": "0.4 mL",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated (cold packs)",
    "stability": "Room temperature unacceptable; refrigerated 21 days; frozen 21 days",
    "spin": "Yes",
    "specialInstructions": "Centrifuge and aliquot separated serum into a plastic Transport Tube. Refrigerate for transport; do not leave at room temperature.",
    "source": "Quest official directory, reviewed 2026-11-15: https://testdirectory.questdiagnostics.com/test/test-detail/16485?cc=MASTER"
  },
  {
    "id": "quest-verified-blood-20261115-batch12-37838",
    "testCode": "37838",
    "testName": "HDL Apolipoprotein A1 (ApoA1)",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "alternativeContainer": "",
    "transportContainer": "Transport Tube",
    "collectionCount": 1,
    "submissionCount": 1,
    "preferredVolume": "1 mL serum",
    "minimumVolume": "0.5 mL",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated (cold packs)",
    "stability": "Room temperature unacceptable; refrigerated 21 days; frozen 21 days",
    "spin": "Yes",
    "specialInstructions": "Allow serum to clot for 30 minutes, centrifuge for 10 minutes, then transfer the separated serum to a labeled generic Transport Tube. Refrigerate at 2-8 C and ship the same day with cold packs. Patient should fast 10-12 hours. Do not send at room temperature; lipemic specimens may be rejected. Confirm regional test availability.",
    "source": "Quest official directory, reviewed 2026-11-15: https://testdirectory.questdiagnostics.com/test/test-detail/37838/hdl-apolipoprotein-a1-apoa1?cc=MASTER"
  },
  {
    "id": "quest-verified-blood-20261115-batch12-37866",
    "testCode": "37866",
    "testName": "HDL Apolipoprotein C3 (ApoC3)",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "alternativeContainer": "",
    "transportContainer": "Transport Tube",
    "collectionCount": 1,
    "submissionCount": 1,
    "preferredVolume": "1 mL serum",
    "minimumVolume": "0.5 mL",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated (cold packs)",
    "stability": "Room temperature unacceptable; refrigerated 21 days; frozen 21 days",
    "spin": "Yes",
    "specialInstructions": "Allow serum to clot for 30 minutes, centrifuge for 10 minutes, then transfer the separated serum to a labeled generic Transport Tube. Refrigerate at 2-8 C and ship the same day with cold packs. Patient should fast 10-12 hours. Do not send at room temperature; lipemic specimens may be rejected. Confirm regional test availability.",
    "source": "Quest official directory, reviewed 2026-11-15: https://testdirectory.questdiagnostics.com/test/test-detail/37866/aalp-apolipoprotein-c3?cc=MASTER"
  }
];
const comparable=s=>String(s||'').toLowerCase().replace(/[^a-z0-9]/g,' ').split(/\s+/).filter(x=>x.length>2&&!['test','panel','antibody','antibodies','serum','profile'].includes(x));
for(const record of additions){
 const existing=window.SEED_TESTS.find(t=>String(t.testCode||'').trim()===record.testCode);
 if(!existing){window.SEED_TESTS.push(record);continue;}
 if(!['pending','reference'].includes(existing.status))continue;
 const a=new Set(comparable(existing.testName)),b=new Set(comparable(record.testName));
 if([...a].filter(x=>b.has(x)).length>=1){Object.assign(existing,record,{id:existing.id||record.id});}
}
})();
