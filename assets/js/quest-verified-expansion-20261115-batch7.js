/* Officially reviewed Quest batch 7, November 15, 2026.
 * Preserve specimen source, original sterile cups, independent serum and urine submissions,
 * shipping temperatures, and the established container nomenclature.
 * Unsupported slides, smears, acid preservation, green-label Aptima and InSure cards excluded.
 */
(()=>{'use strict';
 if(!Array.isArray(window.SEED_TESTS))return;
 const additions=[
  {
    "id": "quest-verified-20261115-batch7-8514",
    "testCode": "8514",
    "testName": "Sodium, Random Urine with Creatinine",
    "specimenType": "Random Urine",
    "drawContainer": "Sterile cup",
    "transportContainer": "Sterile cup",
    "preferredVolume": "10 mL random urine",
    "minimumVolume": "2 mL",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "stability": "Room 7 days; refrigerated 7 days; frozen 28 days",
    "spin": "No",
    "specialLabeling": "Label urine, collection date and time",
    "specialInstructions": "Collect unpreserved random urine in a sterile leakproof screw-cap cup. Submit in the original cup at room temperature. Pool only with tests from the same patient, specimen source, and collection time, when volumes are sufficient. Do not use acid or specialty preservative. Verify receiving Quest service-area acceptance.",
    "status": "active",
    "source": "Quest official test directory, reviewed 2026-11-15 • https://testdirectory.questdiagnostics.com/test/test-detail/8514/sodium-random-urine-with-creatinine?cc=MASTER"
  },
  {
    "id": "quest-verified-20261115-batch7-1645",
    "testCode": "1645",
    "testName": "Chloride, Random Urine with Creatinine",
    "specimenType": "Random Urine",
    "drawContainer": "Sterile cup",
    "transportContainer": "Sterile cup",
    "preferredVolume": "10 mL random urine",
    "minimumVolume": "2 mL",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "stability": "Room 7 days; refrigerated 7 days; frozen 28 days",
    "spin": "No",
    "specialLabeling": "Label urine, collection date and time",
    "specialInstructions": "Collect unpreserved random urine in a sterile leakproof screw-cap cup. Submit in the original cup at room temperature. Pool only with tests from the same patient, specimen source, and collection time, when volumes are sufficient. Do not use acid or specialty preservative. Verify receiving Quest service-area acceptance.",
    "status": "active",
    "source": "Quest official test directory, reviewed 2026-11-15 • https://testdirectory.questdiagnostics.com/test/test-detail/1645/chloride-random-urine-with-creatinine?cc=MASTER"
  },
  {
    "id": "quest-verified-20261115-batch7-6517",
    "testCode": "6517",
    "testName": "Albumin, Random Urine with Creatinine",
    "specimenType": "Random Urine",
    "drawContainer": "Sterile cup",
    "transportContainer": "Sterile cup",
    "preferredVolume": "10 mL random urine",
    "minimumVolume": "2 mL",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "stability": "Room 7 days; refrigerated 7 days; frozen 28 days",
    "spin": "No",
    "specialLabeling": "Label urine, collection date and time",
    "specialInstructions": "Collect unpreserved random urine in a sterile leakproof screw-cap cup. Submit in the original cup at room temperature. Pool only with tests from the same patient, specimen source, and collection time, when volumes are sufficient. Do not use acid or specialty preservative. Verify receiving Quest service-area acceptance.",
    "status": "active",
    "source": "Quest official test directory, reviewed 2026-11-15 • https://testdirectory.questdiagnostics.com/test/test-detail/6517/albumin-random-urine-with-creatinine?cc=MASTER"
  },
  {
    "id": "quest-verified-20261115-batch7-39165",
    "testCode": "39165",
    "testName": "Kidney Profile",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "preferredVolume": "1 mL serum and 10 mL random urine",
    "minimumVolume": "0.5 mL serum and 2 mL urine",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "stability": "Room 7 days; refrigerated 7 days; frozen 28 days",
    "spin": "Yes",
    "specialLabeling": "Label serum and random urine, including collection date/time",
    "specialInstructions": "TWO SPECIMEN TYPES REQUIRED. Collect an SST, allow to clot, centrifuge and submit the original spun SST at room temperature. Separately collect unpreserved random urine in a sterile screw-cap cup and submit original cup at room temperature. Serum and urine are never pooled together. For urine, do not use an acid-preserved container. Verify Quest service-area acceptance.",
    "additionalDrawRequirements": [
      {
        "container": "Sterile cup",
        "specimenType": "Random Urine",
        "count": 1,
        "purpose": "Albumin/creatinine ratio component",
        "preferredVolume": "10 mL random urine",
        "minimumVolume": "2 mL",
        "transportContainer": "Sterile cup",
        "transportTemperature": "Room Temperature",
        "spin": "No",
        "specialInstructions": "Submit original sterile cup, unpreserved. Label urine, date and time."
      }
    ],
    "status": "active",
    "source": "Quest official test directory, reviewed 2026-11-15 • https://testdirectory.questdiagnostics.com/test/test-detail/39165/kidney-profile?cc=MASTER"
  },
  {
    "id": "quest-verified-20261115-batch7-1687",
    "testCode": "1687",
    "testName": "LD, CSF",
    "specimenType": "CSF",
    "drawContainer": "Sterile cup",
    "transportContainer": "Sterile cup",
    "preferredVolume": "1 mL CSF",
    "minimumVolume": "0.5 mL",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "stability": "Room 7 days; refrigerated 7 days; frozen unacceptable",
    "spin": "No",
    "specialLabeling": "Label CSF, collection date and time",
    "specialInstructions": "PROVIDER-COLLECTED CSF. Use a sterile plastic screw-cap container and submit the original labeled container at room temperature. Do not freeze. Keep CSF separate from other body fluid sources, urine, and other collection times. Verify receiving Quest service-area acceptance.",
    "status": "active",
    "source": "Quest official test directory, reviewed 2026-11-15 • https://testdirectory.questdiagnostics.com/test/test-detail/1687/ld-csf?cc=MASTER"
  }
];
 const known=new Set(window.SEED_TESTS.map(t=>String(t.testCode||'').trim()));
 for(const t of additions){
   if(known.has(t.testCode))continue;
   window.SEED_TESTS.push(t);
   known.add(t.testCode);
 }
})();
