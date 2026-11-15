/* Additional Quest unpreserved 24-hour urine pathways selected from the 1,068-code workbook.
 * Reviewed against official Quest test-specific directories November 15, 2026.
 * No acid preservatives; the restricted routes remain unlisted.
 */
(()=>{'use strict';if(!Array.isArray(window.SEED_TESTS))return;
const records=[
  {
    "id": "quest-master-381-verified-20261115",
    "status": "active",
    "testCode": "381",
    "testName": "Creatinine, 24-Hour Urine",
    "specimenType": "24-Hour Urine",
    "drawContainer": "24-Hour Urine Container (no preservative)",
    "transportContainer": "Sterile cup",
    "preferredVolume": "10 mL unpreserved urine",
    "minimumVolume": "2 mL",
    "transportTemperature": "Room Temperature",
    "stability": "Room 7 days; refrigerated 7 days; frozen 28 days.",
    "spin": "No",
    "specialInstructions": "Collect complete 24-hour urine WITHOUT preservatives; keep the collection correctly stored throughout. Mix collection thoroughly then submit the required aliquot in a sterile leakproof screw-cap plastic cup, not the entire collection jug. Record TOTAL 24-hour volume and collection duration on specimen and requisition. No acid required; this is Quest's preferred unpreserved collection route.",
    "source": "Quest official test directory, checked 2026-11-15 • https://testdirectory.questdiagnostics.com/test/test-detail/381/?cc=MASTER"
  },
  {
    "id": "quest-master-11320-verified-20261115",
    "status": "active",
    "testCode": "11320",
    "testName": "Protein, Total, 24-Hour Urine without Creatinine",
    "specimenType": "24-Hour Urine",
    "drawContainer": "24-Hour Urine Container (no preservative)",
    "transportContainer": "Sterile cup",
    "preferredVolume": "10 mL unpreserved urine",
    "minimumVolume": "2 mL",
    "transportTemperature": "Room Temperature",
    "stability": "Room 4 days; refrigerated 5 days; frozen 30 days.",
    "spin": "No",
    "specialInstructions": "Collect complete 24-hour urine WITHOUT preservatives; keep the collection correctly stored throughout. Mix collection thoroughly then submit the required aliquot in a sterile leakproof screw-cap plastic cup, not the entire collection jug. Record TOTAL 24-hour volume and collection duration on specimen and requisition. Quest REJECTS acidified urine. Use only the unpreserved route.",
    "source": "Quest official test directory, checked 2026-11-15 • https://testdirectory.questdiagnostics.com/test/test-detail/11320/?cc=MASTER"
  },
  {
    "id": "quest-master-757-verified-20261115",
    "status": "active",
    "testCode": "757",
    "testName": "Protein, Total, 24-Hour Urine with Creatinine",
    "specimenType": "24-Hour Urine",
    "drawContainer": "24-Hour Urine Container (no preservative)",
    "transportContainer": "Sterile cup",
    "preferredVolume": "10 mL unpreserved urine",
    "minimumVolume": "2 mL",
    "transportTemperature": "Room Temperature",
    "stability": "Room 4 days; refrigerated 5 days; frozen 30 days.",
    "spin": "No",
    "specialInstructions": "Collect complete 24-hour urine WITHOUT preservatives; keep the collection correctly stored throughout. Mix collection thoroughly then submit the required aliquot in a sterile leakproof screw-cap plastic cup, not the entire collection jug. Record TOTAL 24-hour volume and collection duration on specimen and requisition. Quest REJECTS acidified urine. Both protein and creatinine are assayed from this same 24-hour unpreserved aliquot.",
    "source": "Quest official test directory, checked 2026-11-15 • https://testdirectory.questdiagnostics.com/test/test-detail/757/?cc=MASTER"
  },
  {
    "id": "quest-master-11314-verified-20261115",
    "status": "active",
    "testCode": "11314",
    "testName": "Chloride, 24-Hour Urine without Creatinine",
    "specimenType": "24-Hour Urine",
    "drawContainer": "24-Hour Urine Container (no preservative)",
    "transportContainer": "Sterile cup",
    "preferredVolume": "10 mL unpreserved urine",
    "minimumVolume": "2 mL",
    "transportTemperature": "Room Temperature",
    "stability": "Room 14 days; refrigerated 14 days; frozen 60 days.",
    "spin": "No",
    "specialInstructions": "Collect complete 24-hour urine WITHOUT preservatives; keep the collection correctly stored throughout. Mix collection thoroughly then submit the required aliquot in a sterile leakproof screw-cap plastic cup, not the entire collection jug. Record TOTAL 24-hour volume and collection duration on specimen and requisition. Quest REJECTS HCl-preserved urine; submit the preferred unpreserved aliquot.",
    "source": "Quest official test directory, checked 2026-11-15 • https://testdirectory.questdiagnostics.com/test/test-detail/11314/?cc=MASTER"
  },
  {
    "id": "quest-master-11317-verified-20261115",
    "status": "active",
    "testCode": "11317",
    "testName": "Sodium, 24-Hour Urine without Creatinine",
    "specimenType": "24-Hour Urine",
    "drawContainer": "24-Hour Urine Container (no preservative)",
    "transportContainer": "Sterile cup",
    "preferredVolume": "10 mL unpreserved urine",
    "minimumVolume": "2 mL",
    "transportTemperature": "Room Temperature",
    "stability": "Room 14 days; refrigerated 14 days; frozen 60 days.",
    "spin": "No",
    "specialInstructions": "Collect complete 24-hour urine WITHOUT preservatives; keep the collection correctly stored throughout. Mix collection thoroughly then submit the required aliquot in a sterile leakproof screw-cap plastic cup, not the entire collection jug. Record TOTAL 24-hour volume and collection duration on specimen and requisition. Use Quest's explicitly preferred unpreserved collection. Do not add acid or a chemical preservative.",
    "source": "Quest official test directory, checked 2026-11-15 • https://testdirectory.questdiagnostics.com/test/test-detail/11317/?cc=MASTER"
  },
  {
    "id": "quest-master-973-verified-20261115",
    "status": "active",
    "testCode": "973",
    "testName": "Urea Nitrogen, 24-Hour Urine without Creatinine",
    "specimenType": "24-Hour Urine",
    "drawContainer": "24-Hour Urine Container (no preservative)",
    "transportContainer": "Sterile cup",
    "preferredVolume": "10 mL unpreserved urine",
    "minimumVolume": "2 mL",
    "transportTemperature": "Refrigerated",
    "stability": "Unpreserved room 24 hours including collection; refrigerated 7 days; frozen 15 months.",
    "spin": "No",
    "specialInstructions": "Collect complete 24-hour urine WITHOUT preservatives; keep the collection correctly stored throughout. Mix collection thoroughly then submit the required aliquot in a sterile leakproof screw-cap plastic cup, not the entire collection jug. Record TOTAL 24-hour volume and collection duration on specimen and requisition. Keep collection refrigerated throughout. Submit 10 mL aliquot REFRIGERATED on cold packs. Do not use the separate acid-preserved room-temperature option.",
    "source": "Quest official test directory, checked 2026-11-15 • https://testdirectory.questdiagnostics.com/test/test-detail/973/?cc=MASTER"
  },
  {
    "id": "quest-master-719-verified-20261115",
    "status": "active",
    "testCode": "719",
    "testName": "Phosphate, 24-Hour Urine with Creatinine",
    "specimenType": "24-Hour Urine",
    "drawContainer": "24-Hour Urine Container (no preservative)",
    "transportContainer": "Sterile cup",
    "preferredVolume": "10 mL unpreserved urine",
    "minimumVolume": "2 mL",
    "transportTemperature": "Refrigerated",
    "stability": "Unpreserved room 48 hours; refrigerated 7 days; frozen 28 days.",
    "spin": "No",
    "specialInstructions": "Collect complete 24-hour urine WITHOUT preservatives; keep the collection correctly stored throughout. Mix collection thoroughly then submit the required aliquot in a sterile leakproof screw-cap plastic cup, not the entire collection jug. Record TOTAL 24-hour volume and collection duration on specimen and requisition. USE THE QUEST-EXPLICIT ALTERNATIVE: unpreserved urine refrigerated throughout and after collection, shipped refrigerated on cold packs. The separate acidified preferred route is NOT used. Confirm the receiving service area accepts the refrigerated unpreserved alternative before collection.",
    "source": "Quest official test directory, checked 2026-11-15 • https://testdirectory.questdiagnostics.com/test/test-detail/719/?cc=MASTER"
  }
];
const seen=new Set(window.SEED_TESTS.map(x=>String(x.testCode||'').trim()));
for(const r of records){if(!seen.has(r.testCode)){window.SEED_TESTS.push(r);seen.add(r.testCode);}}
})();
