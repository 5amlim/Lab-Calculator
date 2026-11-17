/* Official Quest FIB-4 paired serum/EDTA collection: batch 27, 2026-11-16.
 * Do not pool distinct serum and whole blood routes; different bag temperatures.
 * Preserve existing active/blocked records and established specimen badges. */
(()=>{'use strict';if(!Array.isArray(window.SEED_TESTS))return;
const additions=[
  {
    "id": "quest-official-20261116-batch27-30555",
    "status": "active",
    "testCode": "30555",
    "testName": "Liver Fibrosis, Fibrosis-4 (FIB-4) Index Panel",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "alternativeContainer": "",
    "transportContainer": "SST / Gold (spun)",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "0.5 mL serum",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated (cold packs) for serum; room temperature for separate EDTA whole blood",
    "spin": "Yes",
    "stability": "Serum room 72 hours, refrigerated 5 days, frozen unacceptable; EDTA whole blood room 48 hours, refrigerated/frozen unacceptable",
    "specialLabeling": "Label collection date and time for serum and EDTA specimens",
    "specialInstructions": "REQUIRES TWO DISTINCT SPECIMENS: 1 mL serum from fully spun SST / Gold refrigerated (cold packs), plus ONE FULL LAVENDER EDTA whole-blood tube transported at room temperature, unspun. Keep the two containers separate, with specimen-specific labels and temperature bags. Do not freeze serum or EDTA. If drawn with lead testing, Quest requires appropriate EDTA tan-top collection instead; confirm locally. Includes AST, ALT, platelet count and the calculated FIB-4 index. Confirm Quest service-area acceptance; Nichols IFD San Juan Capistrano and Chantilly are listed as nonperforming.",
    "additionalDrawRequirements": [
      {
        "container": "Lavender EDTA",
        "count": 1,
        "specimenType": "Whole Blood",
        "purpose": "Required full lavender EDTA tube for platelet count",
        "preferredVolume": "One full lavender EDTA blood tube",
        "minimumVolume": "1 mL EDTA whole blood",
        "transportContainer": "Lavender EDTA",
        "transportTemperature": "Room Temperature",
        "transportTemperatureRaw": "Room temperature only; avoid refrigeration or freezing",
        "spin": "No",
        "specialInstructions": "Required full lavender EDTA tube for platelet count, original tube, do not spin; label Whole Blood, collection date/time, and do not combine with the refrigerated serum specimen"
      }
    ],
    "source": "Quest official test-specific directory, reviewed 2026-11-16 • https://testdirectory.questdiagnostics.com/test/test-detail/30555/liver-fibrosis-fibrosis-4-fib-4-index-panel?cc=MASTER"
  },
  {
    "id": "quest-official-20261116-batch27-12734",
    "status": "active",
    "testCode": "12734",
    "testName": "FIB-4 Index Panel with Reflex to Enhanced Liver Fibrosis (ELF) Score",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "alternativeContainer": "",
    "transportContainer": "SST / Gold (spun)",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "0.5 mL serum",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated (cold packs) for serum; room temperature for separate EDTA whole blood",
    "spin": "Yes",
    "stability": "Serum room 72 hours, refrigerated 5 days, frozen unacceptable; EDTA whole blood room 48 hours, refrigerated/frozen unacceptable",
    "specialLabeling": "Label collection date and time for serum and EDTA specimens",
    "specialInstructions": "REQUIRES TWO DISTINCT SPECIMENS: 1 mL serum from fully spun SST / Gold refrigerated (cold packs), plus ONE FULL LAVENDER EDTA whole-blood tube transported at room temperature, unspun. Keep the two containers separate, with specimen-specific labels and temperature bags. Do not freeze serum or EDTA. If drawn with lead testing, Quest requires appropriate EDTA tan-top collection instead; confirm locally. If the FIB-4 index is at least 1.30, Quest performs reflex ELF at additional charge; obtain the specified serum at initial collection. Confirm Quest service-area acceptance; Nichols IFD San Juan Capistrano and Chantilly are listed as nonperforming.",
    "additionalDrawRequirements": [
      {
        "container": "Lavender EDTA",
        "count": 1,
        "specimenType": "Whole Blood",
        "purpose": "Required full lavender EDTA tube for platelet count",
        "preferredVolume": "One full lavender EDTA blood tube",
        "minimumVolume": "1 mL EDTA whole blood",
        "transportContainer": "Lavender EDTA",
        "transportTemperature": "Room Temperature",
        "transportTemperatureRaw": "Room temperature only; avoid refrigeration or freezing",
        "spin": "No",
        "specialInstructions": "Required full lavender EDTA tube for platelet count, original tube, do not spin; label Whole Blood, collection date/time, and do not combine with the refrigerated serum specimen"
      }
    ],
    "source": "Quest official test-specific directory, reviewed 2026-11-16 • https://testdirectory.questdiagnostics.com/test/test-detail/12734/fib-4-index-panel-with-reflex-to-enhanced-liver-fibrosis-elf-score?cc=MASTER"
  }
];
for(const record of additions){const existing=window.SEED_TESTS.find(t=>String(t.testCode||'').trim()===record.testCode);if(!existing){window.SEED_TESTS.push(record);continue;}if(['pending','reference'].includes(existing.status))Object.assign(existing,record,{id:existing.id||record.id});}
})();
