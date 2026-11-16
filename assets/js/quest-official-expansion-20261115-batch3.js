/* Verified Quest additions not already present in the current calculator, Nov 15 2026.
 * Retain separate serum, EDTA, timed-urine and temperature-specific requirements.
 */
(()=>{'use strict';if(!Array.isArray(window.SEED_TESTS))return;
const records=[
  {
    "id": "quest-official-nov15-more-1744",
    "testCode": "1744",
    "testName": "Uric Acid, Random Urine with Creatinine",
    "specimenType": "Urine",
    "drawContainer": "Sterile cup",
    "alternativeContainer": "",
    "transportContainer": "Sterile cup",
    "preferredVolume": "10 mL random urine",
    "minimumVolume": "Confirm minimum with receiving Quest lab",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "stability": "Room 7 days; refrigerated 7 days; frozen 28 days",
    "spin": "No",
    "specialInstructions": "Collect 10 mL random urine without preservative in a sterile, leakproof plastic cup. Submit original cup; do not acidify. Quest's minimum volume varies by service area. Verify that the receiving laboratory accepts this order code and volume before collection.",
    "fastingStatus": "",
    "fastingInstructions": "",
    "status": "active",
    "source": "Quest official test directory, reviewed 2026-11-15 • https://testdirectory.questdiagnostics.com/test/test-detail/1744/uric-acid-random-urine-with-creatinine?cc=MASTER&p=r"
  },
  {
    "id": "quest-official-nov15-more-11233",
    "testCode": "11233",
    "testName": "Kappa/Lambda Light Chains, Free with Ratio, Random Urine",
    "specimenType": "Urine",
    "drawContainer": "Sterile cup",
    "alternativeContainer": "",
    "transportContainer": "Sterile cup",
    "preferredVolume": "2 mL random urine",
    "minimumVolume": "1 mL",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "stability": "Room 7 days; refrigerated 21 days; frozen 30 days",
    "spin": "No",
    "specialInstructions": "Collect an unpreserved random urine specimen in a sterile, leakproof plastic cup. Submit original cup without transfer. A 24-hour unpreserved aliquot is an alternative, but the calculator's default is a random spot collection; verify the ordered specimen type. Reject visibly contaminated specimens.",
    "fastingStatus": "",
    "fastingInstructions": "",
    "status": "active",
    "source": "Quest official test directory, reviewed 2026-11-15 • https://testdirectory.questdiagnostics.com/test/test-detail/11233/kappalambda-light-chains-free-with-ratio-random-urine?cc=MASTER&p=r"
  },
  {
    "id": "quest-official-nov15-more-17307",
    "testCode": "17307",
    "testName": "Alpha-1-Antitrypsin (AAT) Quantitation and Mutation Analysis",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "alternativeContainer": "",
    "transportContainer": "Serum Transport Tube",
    "preferredVolume": "1 mL serum AND 5 mL EDTA whole blood",
    "minimumVolume": "0.5 mL serum AND 2 mL EDTA whole blood",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "stability": "Serum refrigerated 7 days; EDTA whole blood refrigerated 8 days; NEVER freeze whole blood",
    "spin": "Yes",
    "specialInstructions": "TWO REQUIRED SPECIMENS. Draw an SST for serum, clot and centrifuge, transfer at least 0.5 mL serum into a plastic Serum Transport Tube, refrigerate. ALSO draw one separate lavender EDTA whole blood tube (5 mL preferred; 2 mL minimum). Keep the original whole blood tube unspun and ship refrigerated in the same cold-pack temperature bag, as separate labeled submissions. Do not transfer or freeze whole blood. Confirm local Quest code/service area.",
    "fastingStatus": "",
    "fastingInstructions": "",
    "status": "active",
    "source": "Quest official test directory, reviewed 2026-11-15 • https://testdirectory.questdiagnostics.com/test/test-detail/17307/alpha-1-antitrypsin-aat-quantitation-and-mutation-analysis?cc=MASTER&p=r",
    "additionalDrawRequirements": [
      {
        "container": "Lavender EDTA",
        "specimenType": "Whole Blood",
        "count": 1,
        "purpose": "AAT mutation analysis (separate whole-blood specimen)",
        "preferredVolume": "5 mL EDTA whole blood",
        "minimumVolume": "2 mL",
        "transportContainer": "Lavender EDTA",
        "transportTemperature": "Refrigerated",
        "spin": "No",
        "specialInstructions": "Submit original lavender EDTA whole blood unspun and refrigerated. Do not freeze or combine with spun serum."
      }
    ]
  },
  {
    "id": "quest-official-nov15-more-91705",
    "testCode": "91705",
    "testName": "Autoimmune Hepatitis Differential Panel for Hep-C Patient",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "alternativeContainer": "",
    "transportContainer": "SST / Gold (spun)",
    "preferredVolume": "One spun SST for room-temperature submission",
    "minimumVolume": "One properly filled SST for each submission",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "stability": "See component assays; 2 physically separate spun tubes required",
    "spin": "Yes",
    "specialInstructions": "First SST: spin and submit the original tube at ROOM TEMPERATURE. Second SST: spin and submit the original tube REFRIGERATED. Do not pour off serum, combine contents, or replace both with one shared tube. Label both with patient details and preserve the separate shipping temperatures. Confirm Quest receiving service area.",
    "fastingStatus": "",
    "fastingInstructions": "",
    "status": "active",
    "source": "Quest official test directory, reviewed 2026-11-15 • https://testdirectory.questdiagnostics.com/test/test-detail/91705/autoimmune-hepatitis-differential-panel-for-hep-c-patient?cc=MASTER&p=r",
    "additionalDrawRequirements": [
      {
        "container": "SST / Gold",
        "specimenType": "Serum",
        "count": 1,
        "purpose": "Second SST shipped refrigerated; first SST ships at room temperature",
        "preferredVolume": "One spun SST",
        "minimumVolume": "One full properly filled SST",
        "transportContainer": "SST / Gold (spun)",
        "transportTemperature": "Refrigerated",
        "spin": "Yes",
        "specialInstructions": "Spin and submit original second SST refrigerated, separate from the room-temperature SST. No serum pooling."
      }
    ]
  },
  {
    "id": "quest-official-nov15-more-907",
    "testCode": "907",
    "testName": "Uric Acid, 24-Hour Urine with Creatinine",
    "specimenType": "24-Hour Urine",
    "drawContainer": "24-Hour Urine Container (no preservative)",
    "alternativeContainer": "",
    "transportContainer": "Sterile cup",
    "preferredVolume": "10 mL aliquot of well-mixed 24-hour urine",
    "minimumVolume": "Verify Quest service-area minimum",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "stability": "Verify service-area stability; Quest directory requires room temperature transport",
    "spin": "No",
    "specialInstructions": "Collect entire 24-hour urine WITHOUT preservative or acid in a designated timed urine container; omit first morning void then collect all voids through the first morning void next day at the same time. Record start/end time, TOTAL collection volume and duration. Mix well; place a 10 mL unpreserved aliquot in one sterile screw-cap cup for submission, NOT the collection jug. Store timed collection appropriately and verify local Quest minimum/stability.",
    "fastingStatus": "",
    "fastingInstructions": "",
    "status": "active",
    "source": "Quest official test directory, reviewed 2026-11-15 • https://testdirectory.questdiagnostics.com/test/test-detail/907/uric-acid-24-hour-urine-with-creatinine?cc=MASTER&p=r"
  }
];
const known=new Set(window.SEED_TESTS.map(test=>String(test.testCode||'').trim()));
for(const test of records){if(known.has(test.testCode))continue;window.SEED_TESTS.push(test);known.add(test.testCode);}
})();
