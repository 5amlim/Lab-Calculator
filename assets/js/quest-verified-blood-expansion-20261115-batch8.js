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
    "id": "quest-blood-batch8-19903",
    "testCode": "19903",
    "testName": "Fibrinogen Comprehensive Panel with Consultation",
    "status": "active",
    "specimenType": "Citrated Plasma",
    "drawContainer": "Light Blue Sodium Citrate",
    "alternativeContainer": "",
    "collectionCount": 4,
    "submissionCount": 4,
    "transportContainer": "Plasma Transport Tube",
    "preferredVolume": "1 mL frozen platelet-poor plasma into each of four separate vials (4 mL total)",
    "minimumVolume": "Verify current receiving laboratory minimum; retain four separate aliquots",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen on dry ice",
    "stability": "Room/refrigerated unacceptable; frozen -20°C 30 days",
    "spin": "Yes",
    "specialLabeling": "Label each of four frozen vials with patient, specimen type, collection date and time",
    "specialInstructions": "FOUR independent frozen platelet-poor plasma vials required for fibrinogen activity/antigen, reptilase and thrombin clotting time panel. Draw completely filled 3.2% sodium-citrate Light Blue Sodium Citrate tubes. Invert gently and process each within 60 minutes. Centrifuge 15 minutes at approximately 1500g, transfer upper plasma without buffy coat to a clean plastic vial, centrifuge again to obtain platelet-poor plasma (<10,000 platelets/mcL), then aliquot into individual plastic screw-cap Plasma Transport Tubes. Freeze immediately and maintain frozen shipment on dry ice. Never submit the original blue-top as the frozen transport container, and do not collapse required aliquots. Include any requested clinical details for coagulation consultation. Quest lists this panel as unavailable in some service areas: confirm acceptance before collection.",
    "source": "Quest official directory, verified 2026-11-15 • https://testdirectory.questdiagnostics.com/test/test-detail/19903/fibrinogen-comprehensive-panel-with-consultation?cc=MASTER&p=r"
  },
  {
    "id": "quest-blood-batch8-19671",
    "testCode": "19671",
    "testName": "Recurrent Miscarriage Evaluation/Coagulation Panel with Consultation",
    "status": "active",
    "specimenType": "Citrated Plasma",
    "drawContainer": "Light Blue Sodium Citrate",
    "alternativeContainer": "",
    "collectionCount": 4,
    "submissionCount": 4,
    "transportContainer": "Plasma Transport Tube",
    "preferredVolume": "1 mL frozen platelet-poor plasma in each of four individually labeled vials",
    "minimumVolume": "0.5 mL in each of four vials, plus 0.5 mL frozen serum and 3 mL EDTA whole blood",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen plasma and serum; EDTA whole blood room temperature",
    "stability": "Plasma frozen 14 days; serum frozen 6 months; room-temperature EDTA whole blood up to 8 days",
    "spin": "Yes",
    "specialLabeling": "Label four plasma, frozen serum and ambient whole blood separately with date and time",
    "specialInstructions": "THREE DIFFERENT SUBMISSION PATHS. Draw completely filled 3.2% sodium-citrate Light Blue Sodium Citrate tubes. Invert gently and process each within 60 minutes. Centrifuge 15 minutes at approximately 1500g, transfer upper plasma without buffy coat to a clean plastic vial, centrifuge again to obtain platelet-poor plasma (<10,000 platelets/mcL), then aliquot into individual plastic screw-cap Plasma Transport Tubes. Freeze immediately and maintain frozen shipment on dry ice. Never submit the original blue-top as the frozen transport container, and do not collapse required aliquots. FOUR citrate plasma vials must remain frozen. ALSO collect one plain Red Top (no gel) for 3 mL frozen serum, preferred, 0.5 mL minimum: refrigerate or ice-bath red-top for 30 minutes, centrifuge after clotting, transfer separated serum into separately labeled plastic Serum Transport Tube, freeze and ship frozen. ALSO collect one dedicated Lavender EDTA whole-blood tube, 5 mL preferred, 3 mL minimum, for Factor V and Factor II mutation analysis. Submit the EDTA tube ORIGINAL, unspun, at room temperature in a SEPARATE bag. Do not pool plasma, serum or whole blood; include brief patient history. Verify service-area availability and provider ordering/consent before collection.",
    "additionalDrawRequirements": [
      {
        "container": "Red Top",
        "specimenType": "Serum",
        "count": 1,
        "purpose": "Separate homocysteine serum aliquot, frozen",
        "preferredVolume": "3 mL serum",
        "minimumVolume": "0.5 mL",
        "transportContainer": "Serum Transport Tube",
        "transportTemperature": "Frozen",
        "transportTemperatureRaw": "Frozen",
        "spin": "Yes",
        "specialInstructions": "Collect one plain Red Top without gel, chill 30 minutes in refrigerator or ice bath, clot and spin, transfer separated serum to plastic Serum Transport Tube; freeze and send frozen on dry ice."
      },
      {
        "container": "Lavender EDTA",
        "specimenType": "Whole Blood",
        "count": 1,
        "purpose": "Prothrombin and Factor V mutation analyses",
        "preferredVolume": "5 mL EDTA whole blood",
        "minimumVolume": "3 mL",
        "transportContainer": "Lavender EDTA (original tube)",
        "transportTemperature": "Room Temperature",
        "transportTemperatureRaw": "Room Temperature",
        "spin": "No",
        "specialInstructions": "Keep dedicated EDTA lavender tube unspun, never freeze, ship ambient in separate bag."
      }
    ],
    "source": "Quest official directory, verified 2026-11-15 • https://testdirectory.questdiagnostics.com/test/test-detail/19671/recurrent-miscarriage-evaluation-coagulation-panel-with-consultation?cc=MASTER"
  }
];
const known=new Set(window.SEED_TESTS.map(x=>String(x.testCode||'').trim()));
for(const record of additions){if(known.has(record.testCode))continue;window.SEED_TESTS.push(record);known.add(record.testCode);}
})();
