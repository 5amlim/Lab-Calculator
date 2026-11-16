/* Official Labcorp specialty blood expansion batch 9, November 15, 2026.
 * Frozen Labcorp aliquots remain dedicated PP Transpak 49482 purple-cap devices.
 * Keep source serum/plasma distinct, and do not combine specimens across different tests.
 * Activate only pending tests; preserve any independently verified active catalog records.
 */
(()=>{'use strict';if(!Array.isArray(window.SEED_TESTS))return;
const verified=[
  {
    "id": "labcorp-blood-batch9-502280",
    "testCode": "502280",
    "testName": "Follicle-stimulating Hormone (FSH), Pediatric (Endocrine Sciences)",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "alternativeContainer": "Lavender EDTA (plasma alternative)",
    "transportContainer": "Frozen Transport Tube",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "0.2 mL",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "stability": "Ship frozen on dry ice per official directory",
    "spin": "Yes",
    "specialInstructions": "Pediatric assay: gel-barrier serum preferred; EDTA lavender plasma accepted. Separate within 45 minutes and freeze. Submit a dedicated frozen specimen per test; don't pool frozen aliquots. Separate serum from cells and transfer into the dedicated Labcorp frozen purple-cap transport tube (PP Transpak 49482); freeze and ship frozen on dry ice. Never ship frozen whole blood or a frozen original SST.",
    "fastingStatus": "",
    "fastingInstructions": "",
    "source": "Labcorp official specialty test directory, verified 2026-11-15 • https://specialtytesting.labcorp.com/tests/502280/follicle-stimulating-hormone-fsh-pediatric-endocrine-sciences"
  },
  {
    "id": "labcorp-blood-batch9-500712",
    "testCode": "500712",
    "testName": "Thyroid Function, Adult Thyroid Test Group",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "Red Top",
    "alternativeContainer": "",
    "transportContainer": "Frozen Transport Tube",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "0.2 mL",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "stability": "Ship frozen on dry ice per official directory",
    "spin": "Yes",
    "specialInstructions": "Red-top serum required; test includes T4, T3 uptake and free T4 index. Separate serum within 1 hour, transfer and freeze. Separate serum from cells and transfer into the dedicated Labcorp frozen purple-cap transport tube (PP Transpak 49482); freeze and ship frozen on dry ice. Never ship frozen whole blood or a frozen original SST.",
    "fastingStatus": "",
    "fastingInstructions": "",
    "source": "Labcorp official specialty test directory, verified 2026-11-15 • https://specialtytesting.labcorp.com/tests/500712/thyroid-function-adult-thyroid-test-group"
  },
  {
    "id": "labcorp-blood-batch9-501007",
    "testCode": "501007",
    "testName": "Growth Assessment Test Group V",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "Red Top",
    "alternativeContainer": "",
    "transportContainer": "Frozen Transport Tube",
    "preferredVolume": "0.5 mL serum",
    "minimumVolume": "0.2 mL",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "stability": "Ship frozen on dry ice per official directory",
    "spin": "Yes",
    "specialInstructions": "Red-top serum source; includes IGF-I and IGFBP-3. Separate serum within 1 hour, transfer and freeze. Separate serum from cells and transfer into the dedicated Labcorp frozen purple-cap transport tube (PP Transpak 49482); freeze and ship frozen on dry ice. Never ship frozen whole blood or a frozen original SST.",
    "fastingStatus": "",
    "fastingInstructions": "",
    "source": "Labcorp official specialty test directory, verified 2026-11-15 • https://specialtytesting.labcorp.com/tests/501007/growth-assessment-test-group-v"
  },
  {
    "id": "labcorp-blood-batch9-501220",
    "testCode": "501220",
    "testName": "Growth Receptor Test Group I",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "Red Top",
    "alternativeContainer": "",
    "transportContainer": "Frozen Transport Tube",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "0.7 mL",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "stability": "Ship frozen on dry ice per official directory",
    "spin": "Yes",
    "specialInstructions": "Red-top serum source; includes growth hormone, IGF-I, IGFBP-3, and GH binding protein. Separate within 1 hour, transfer and freeze. Separate serum from cells and transfer into the dedicated Labcorp frozen purple-cap transport tube (PP Transpak 49482); freeze and ship frozen on dry ice. Never ship frozen whole blood or a frozen original SST.",
    "fastingStatus": "",
    "fastingInstructions": "",
    "source": "Labcorp official specialty test directory, verified 2026-11-15 • https://specialtytesting.labcorp.com/tests/501220/growth-receptor-test-group-i"
  }
];
for(const record of verified){const index=window.SEED_TESTS.findIndex(test=>String(test.testCode||'').trim()===record.testCode);if(index<0){window.SEED_TESTS.push(record);}else if(['pending','reference'].includes(window.SEED_TESTS[index].status)){window.SEED_TESTS[index]={...window.SEED_TESTS[index],...record,id:window.SEED_TESTS[index].id||record.id};}}
})();
