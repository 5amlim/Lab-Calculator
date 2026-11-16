/* Verified blood-test expansion Quest batch 13, 2026-11-15. Official per-test sources; preserve existing blocked and validated records. */
(()=>{'use strict';if(!Array.isArray(window.SEED_TESTS))return;
const additions=[
  {
    "testCode": "1468",
    "testName": "Human Anti-mouse Antibody (HAMA)",
    "specimenType": "Serum",
    "drawContainer": "Red Top",
    "alternativeContainer": "",
    "transportContainer": "Transport Tube",
    "collectionCount": 1,
    "submissionCount": 1,
    "preferredVolume": "1 mL frozen serum",
    "minimumVolume": "0.5 mL",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen (ship on dry ice)",
    "stability": "Room temperature unacceptable; refrigerated 24 hours; frozen at -20°C 21 days; -70°C 90 days",
    "spin": "Yes",
    "specialInstructions": "RED TOP ONLY, NO GEL. SST is rejected. Allow to clot, spin and immediately transfer separated serum into a properly labeled standard Quest Transport Tube; freeze and maintain frozen. Submit a dedicated frozen serum aliquot for this assay; do not pool separate frozen test orders. Quest notes limited service-area availability.",
    "source": "Quest official test directory, verified 2026-11-15: https://testdirectory.questdiagnostics.com/test/test-detail/1468/?cc=MASTER",
    "id": "quest-verified-blood-20261115-batch13-1468",
    "status": "active"
  },
  {
    "testCode": "93932",
    "testName": "HLA-B*58:01 Typing",
    "specimenType": "Whole Blood",
    "drawContainer": "Lavender EDTA",
    "alternativeContainer": "",
    "transportContainer": "Lavender EDTA (original tube)",
    "collectionCount": 1,
    "submissionCount": 1,
    "preferredVolume": "5 mL EDTA whole blood",
    "minimumVolume": "3 mL",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room temperature",
    "stability": "Room temperature 7 days; refrigerated 10 days; frozen unacceptable",
    "spin": "No",
    "specialInstructions": "Dedicated intact lavender EDTA whole-blood tube for HLA typing. Do not spin, transfer, split, open or freeze. Keep this collection separate from all other lavender EDTA orders. Alternative EDTA pink/royal-blue, sodium heparin and citrate tubes are listed by Quest but are NOT automatically substituted. Check service-area availability.",
    "source": "Quest official test directory, verified 2026-11-15: https://testdirectory.questdiagnostics.com/test/test-detail/93932/hla-b5801-typing?cc=MASTER",
    "id": "quest-verified-blood-20261115-batch13-93932",
    "status": "active"
  }
];
for(const record of additions){
  const existing=window.SEED_TESTS.find(t=>String(t.testCode||'').trim()===record.testCode);
  if(!existing){window.SEED_TESTS.push(record);continue;}
  // Do not overwrite any existing active, manual, blocked, or mismatched reference record.
  if(['pending','reference'].includes(existing.status)&&String(existing.testName||'').trim().toLowerCase()===record.testName.toLowerCase()) Object.assign(existing,record,{id:existing.id||record.id});
}
})();
