/* Verified Quest blood-first batch 8, November 15, 2026.
 * Coagulation panel: 3 independently frozen citrated plasma aliquots.
 * Cognitive panel: 4 separately aliquoted refrigerated serum vials and 1 ambient EDTA whole blood.
 * Excludes unsupported slides, smears, acid-preserved specimens, specialty collection cards.
 */
(()=>{'use strict';if(!Array.isArray(window.SEED_TESTS))return;
const additions=[
  {
    "id": "quest-blood-batch8-19651",
    "testCode": "19651",
    "testName": "Menorrhagia Screen with Consultation",
    "status": "active",
    "specimenType": "Citrated Plasma",
    "drawContainer": "Light Blue Sodium Citrate",
    "alternativeContainer": "",
    "collectionCount": 3,
    "submissionCount": 3,
    "transportContainer": "Plasma Transport Tube",
    "preferredVolume": "1 mL platelet-poor plasma in each of three separate frozen vials (3 mL total)",
    "minimumVolume": "0.5 mL plasma in each of three vials",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "stability": "Frozen: maintain frozen on dry ice; room/refrigerated unacceptable",
    "spin": "Yes",
    "specialLabeling": "Label patient, plasma, collection date and time on each of three vials",
    "specialInstructions": "THREE independent coagulation aliquots required. Draw three FULL 3.2% sodium citrate Light Blue Sodium Citrate tubes, preserve correct blood-to-anticoagulant ratio, invert gently 3-4 times. Centrifuge within one hour for 15 minutes at approximately 1500g, transfer upper plasma away from buffy coat to a clean plastic tube, then centrifuge again. Transfer at least 0.5 mL (1 mL preferred) platelet-poor plasma into EACH of three separate Quest plastic screw-cap Plasma Transport Tubes. Freeze immediately and transport on dry ice. Do not submit original blue-top tubes frozen, mix specimens, or merge the three aliquots. Include brief clinical history for coagulation consultation. Quest may require ordering provider confirmation of informed consent depending on jurisdiction. Confirm local Quest acceptance before scheduling.",
    "source": "Quest official directory, reviewed 2026-11-15 • https://testdirectory.questdiagnostics.com/test/test-detail/19651/menorrhagia-screen-with-consultation?cc=MASTER&p=r"
  },
  {
    "id": "quest-blood-batch8-18634",
    "testCode": "18634",
    "testName": "Cognitive Assessment Panel with Reflex to T4 Free",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "alternativeContainer": "",
    "collectionCount": 4,
    "submissionCount": 4,
    "transportContainer": "Serum Transport Tube",
    "preferredVolume": "9.7 mL serum total in four separately labeled aliquots",
    "minimumVolume": "4.8 mL serum total plus 1.5 mL EDTA whole blood",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated (cold packs) for serum; EDTA whole blood must remain at room temperature",
    "stability": "Serum: room 36 h, refrigerated 72 h, frozen unacceptable. EDTA whole blood: room 48 h; do not freeze.",
    "spin": "Yes",
    "fastingStatus": "preferred",
    "fastingInstructions": "Fasting preferred by Quest for this panel.",
    "specialLabeling": "Label four serum transport tubes and separate lavender whole blood with patient, specimen type, date and time",
    "specialInstructions": "REQUIRES FOUR DISTINCT SERUM ALIQUOTS AND ONE ORIGINAL EDTA WHOLE-BLOOD TUBE. Collect 4 SST / Gold tubes total to supply 9.7 mL serum preferred, with four separately labeled plastic Serum Transport Tubes. For HOMOCYSTEINE serum source: refrigerate its SST 30 minutes after draw, then centrifuge as soon as clotting is complete; DO NOT place SST gel tube in ice bath. For OTHER three SSTs: allow clot, centrifuge promptly (about 30 minutes), transfer to THREE separate plastic serum transport tubes. Ship all FOUR serum aliquots refrigerated on cold packs. Separately draw one full Lavender EDTA whole-blood tube for CBC, leave unspun at ROOM TEMPERATURE and ship in a different bag; never freeze or refrigerate EDTA whole blood for this panel. Do not combine serum with whole blood, collapse the four serum aliquots, or substitute a single original SST. Minimum: 4.8 mL serum total plus 1.5 mL whole blood. Quest lists this test as unavailable at several Nichols facilities; verify receiving service area before patient collection.",
    "additionalDrawRequirements": [
      {
        "container": "Lavender EDTA",
        "specimenType": "Whole Blood",
        "count": 1,
        "purpose": "Separate CBC whole blood, ambient",
        "preferredVolume": "One full Lavender EDTA whole-blood tube",
        "minimumVolume": "1.5 mL",
        "transportContainer": "Lavender EDTA (original tube)",
        "transportTemperature": "Room Temperature",
        "transportTemperatureRaw": "Room Temperature only; do not refrigerate",
        "spin": "No",
        "specialInstructions": "Keep original Lavender EDTA whole-blood tube UNSPUN at room temperature; do not refrigerate or freeze. Label with patient, collection date and time."
      }
    ],
    "source": "Quest official directory, reviewed 2026-11-15 • https://testdirectory.questdiagnostics.com/test/test-detail/18634/cognitive-assessment-panel-with-reflex-to-t4-free?cc=MASTER"
  }
];
const known=new Set(window.SEED_TESTS.map(x=>String(x.testCode||'').trim()));
for(const record of additions){if(known.has(record.testCode))continue;window.SEED_TESTS.push(record);known.add(record.testCode);}
})();
