/* Verified Quest batch 15, 2026-11-15. Review per-test source and retain protected catalog records. */
(()=>{'use strict';if(!Array.isArray(window.SEED_TESTS))return;
const additions=[
  {
    "id": "quest-verified-20261115-batch15-94569",
    "status": "active",
    "testCode": "94569",
    "testName": "Interferon-gamma (IFN-γ), Serum",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "alternativeContainer": "Red Top",
    "transportContainer": "Transport Tube",
    "collectionCount": 1,
    "submissionCount": 1,
    "preferredVolume": "1 mL serum",
    "minimumVolume": "Not specified in official directory",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen (overnight on dry ice)",
    "stability": "Room temperature unacceptable; refrigerated unacceptable; frozen >24 hours",
    "spin": "Yes",
    "specialInstructions": "SERUM cytokine test. Allow blood to clot, centrifuge, transfer separated serum into a dedicated standard Quest Transport Tube and immediately freeze; keep frozen and ship overnight on dry ice. Do not pool with unrelated frozen orders. Quest explicitly states this code is not available in all service areas; confirm receiving lab/account acceptance before collection.",
    "source": "Quest official test directory, reviewed 2026-11-15: https://testdirectory.questdiagnostics.com/test/test-detail/94569/interferon-gamma-ifn-y-serum?cc=MASTER"
  },
  {
    "id": "quest-verified-20261115-batch15-94570",
    "status": "active",
    "testCode": "94570",
    "testName": "Interleukin-5 (IL-5), Plasma",
    "specimenType": "Plasma",
    "drawContainer": "Lavender EDTA",
    "alternativeContainer": "",
    "transportContainer": "Transport Tube",
    "collectionCount": 1,
    "submissionCount": 1,
    "preferredVolume": "1 mL EDTA plasma",
    "minimumVolume": "Not specified in official directory",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen (overnight on dry ice)",
    "stability": "Room temperature unacceptable; refrigerated unacceptable; frozen >24 hours",
    "spin": "Yes",
    "specialInstructions": "Collect EDTA whole blood in lavender, promptly centrifuge and separate 1 mL plasma into a dedicated standard Quest Transport Tube; freeze and maintain frozen. Ship overnight on dry ice. Serum and whole blood are not accepted for this plasma order. Quest explicitly states this code is not available in all service areas; confirm receiving lab/account acceptance before collection.",
    "source": "Quest official test directory, reviewed 2026-11-15: https://testdirectory.questdiagnostics.com/test/test-detail/94570/il-5-plasma?cc=MASTER"
  }
];
for(const record of additions){
  const existing=window.SEED_TESTS.find(t=>String(t.testCode||'').trim()===record.testCode);
  if(!existing){window.SEED_TESTS.push(record);continue;}
  // Never override an active, blocked, or manually defined record.
  if(['pending','reference'].includes(existing.status)) Object.assign(existing,record,{id:existing.id||record.id});
}
})();
