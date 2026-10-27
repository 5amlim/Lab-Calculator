/* Verified Quest additions, 2026-10-27. Four confirmed new codes.
 * Preserve separate temperatures, sample types, timepoints, and aliquots.
 * Dedupe by exact Quest code; do not override existing records.
 */
(()=>{'use strict';if(!Array.isArray(window.SEED_TESTS))return;
const additions=[
  {
    "id": "quest-18634-verified-20261027",
    "status": "active",
    "testCode": "18634",
    "testName": "Cognitive Assessment Panel with Reflex to T4 Free",
    "specimenType": "Serum and EDTA Whole Blood",
    "drawContainer": "Red Top",
    "alternativeContainer": "",
    "transportContainer": "Plastic Serum Transport Tube",
    "preferredVolume": "9.7 mL total serum in FOUR separate transport tubes plus one full EDTA (lavender) whole blood",
    "minimumVolume": "4.8 mL serum total and 1.5 mL EDTA whole blood",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Serum refrigerated; EDTA whole blood room temperature",
    "stability": "Serum: RT 36 h, refrigerated 72 h, frozen unacceptable. EDTA whole blood: RT 48 h, refrigerated 48 h, frozen unacceptable",
    "spin": "Yes",
    "fastingStatus": "preferred",
    "fastingInstructions": "Fasting preferred.",
    "specialInstructions": "HIGH COMPLEXITY MULTI-SPECIMEN PANEL: serum must be aliquoted into FOUR separately labeled plastic transport tubes; includes a dedicated red-top tube for homocysteine and serum from 3 SST draws for other analytes. For homocysteine red-top, chill in refrigerator or ice bath 30 min after collection, centrifuge promptly after clotting and transfer serum. For 3 SSTs, allow 30 min clot, centrifuge, prepare separate serum aliquots, REFRIGERATE all serum. A full lavender EDTA whole-blood tube must be submitted separately at ROOM TEMP, not spun or pooled with serum. Keep all serum aliquots separate, never freeze. TSH can reflex to free T4. Confirm with Quest service area before collection.",
    "additionalDrawRequirements": [
      {
        "container": "SST / Gold",
        "count": 3,
        "purpose": "three dedicated serum SST draws for four serum transport aliquots total",
        "specimenType": "Serum",
        "preferredVolume": "Remaining serum to make 9.7 mL total",
        "minimumVolume": "Remaining serum to make 4.8 mL total",
        "transportContainer": "Plastic Serum Transport Tube",
        "transportTemperature": "Refrigerated",
        "spin": "Yes",
        "specialInstructions": "Draw 3 separate SSTs for other cognitive panel analytes, separate after clotting and make independently labeled refrigerated serum aliquots. NO FREEZING."
      },
      {
        "container": "Lavender EDTA",
        "count": 1,
        "purpose": "CBC with differential",
        "specimenType": "Whole Blood",
        "preferredVolume": "1 full lavender EDTA",
        "minimumVolume": "1.5 mL whole blood",
        "transportContainer": "Lavender EDTA (original tube)",
        "transportTemperature": "Room Temperature",
        "spin": "No",
        "specialInstructions": "Full lavender EDTA whole-blood tube, mix gently, ship room temperature, never centrifuge or freeze."
      }
    ],
    "source": "Quest official directory checked October 2026 • https://testdirectory.questdiagnostics.com/test/test-detail/18634/cognitive-assessment-panel-with-reflex-to-t4-free?cc=MASTER"
  },
  {
    "id": "quest-10195-verified-20261027",
    "status": "active",
    "testCode": "10195",
    "testName": "Micronutrients, B-Vitamin Panel",
    "specimenType": "Serum, EDTA plasma, EDTA whole blood",
    "drawContainer": "Red Top",
    "alternativeContainer": "",
    "transportContainer": "Frozen light-protected serum transport tube (two separate aliquots)",
    "preferredVolume": "4 mL serum (two aliquots) + 3 mL EDTA plasma + 2 mL EDTA whole blood",
    "minimumVolume": "2 mL serum + 1 mL EDTA plasma + 1 mL EDTA whole blood",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "ALL four separated submissions FROZEN and protected from light",
    "stability": "See each component in Quest directory. Vitamin B2/B3/B5 serum frozen 30 d; Vitamin B6 plasma frozen 6 d; B1 whole blood frozen 35 d",
    "spin": "Yes",
    "fastingStatus": "required",
    "fastingInstructions": "Overnight fasting required. Avoid vitamin supplements for 24 hours.",
    "specialInstructions": "ADULTS 18+ ONLY. NO GEL SST / plasma gel. Draw TWO plain RED TOP tubes for a total 4 mL serum yield (one standard 5 mL red top usually cannot yield 4 mL) and TWO separate lavender EDTA tubes for B6 plasma and B1 whole blood. Serum: aliquot 2 mL (1 mL min) for folate/B12 into plastic frozen transport tube, plus 2 mL (1 mL min) for B2/B3/B5 into an AMBER or fully foil-wrapped frozen tube. Lavender #1: centrifuge, transfer EDTA PLASMA (3 mL preferred) to amber polypropylene, freeze. Lavender #2: transfer EDTA WHOLE BLOOD (2 mL preferred) to separate amber tube and freeze; do not centrifuge. Protect all from light, SHIP FROZEN. Do NOT pool tubes or use SST. Verify current area-specific requirements.",
    "additionalDrawRequirements": [
      {
        "container": "Lavender EDTA",
        "count": 1,
        "purpose": "B6 separated plasma, amber frozen",
        "specimenType": "Plasma",
        "preferredVolume": "3 mL EDTA plasma",
        "minimumVolume": "1 mL",
        "transportContainer": "Frozen light-protected plasma transport tube",
        "transportTemperature": "Frozen",
        "spin": "Yes",
        "specialInstructions": "Centrifuge EDTA, transfer separated plasma into amber or foil-wrapped plastic transport tube, freeze and ship frozen; separate dedicated aliquot."
      },
      {
        "container": "Lavender EDTA",
        "count": 1,
        "purpose": "B1 whole blood, amber frozen",
        "specimenType": "Whole Blood",
        "preferredVolume": "2 mL EDTA whole blood",
        "minimumVolume": "1 mL",
        "transportContainer": "Frozen light-protected whole blood transport tube",
        "transportTemperature": "Frozen",
        "spin": "No",
        "specialInstructions": "EDTA whole blood for B1, unspun, into separate amber/foil-wrapped tube, freeze and ship frozen; do not pool with plasma."
      }
    ],
    "source": "Quest official directory checked October 2026 • https://testdirectory.questdiagnostics.com/test/test-detail/10195/micronutrients-b-vitamin-panel?cc=MASTER",
    "collectionCount": 2
  },
  {
    "id": "quest-6796-verified-20261027",
    "status": "active",
    "testCode": "6796",
    "testName": "Anemia Diagnostic Profile, Basic",
    "specimenType": "Serum and EDTA Whole Blood",
    "drawContainer": "SST / Gold",
    "alternativeContainer": "Red Top serum",
    "transportContainer": "Serum Transport Tube",
    "preferredVolume": "3 mL separated serum + one FULL lavender EDTA whole blood",
    "minimumVolume": "1.5 mL serum and 1 mL whole blood (pediatric microtainer 0.5 mL)",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Both serum and EDTA whole blood room temperature",
    "stability": "Serum RT/refrigerated 72 h, frozen 28 d; whole blood RT 48 h, refrigerated/frozen NOT stable",
    "spin": "Yes",
    "specialInstructions": "Contains iron/TIBC, ferritin, CRP, CBC with differential. For 3 mL serum, draw TWO standard 5 mL SST tubes if needed (or confirm one 7.5 mL tiger-top will yield enough); collect serum in SST, centrifuge, separate into labeled serum transport tube. ADD a FULL EDTA lavender-top for CBC; gently invert and submit original unspun at ROOM TEMPERATURE. Do not freeze or refrigerate EDTA for this panel. Confirm Quest service-area availability.",
    "additionalDrawRequirements": [
      {
        "container": "Lavender EDTA",
        "count": 1,
        "purpose": "CBC with differential",
        "specimenType": "Whole Blood",
        "preferredVolume": "Full lavender EDTA tube",
        "minimumVolume": "1 mL venous whole blood or 0.5 mL pediatric microtainer",
        "transportContainer": "Lavender EDTA (original tube)",
        "transportTemperature": "Room Temperature",
        "spin": "No",
        "specialInstructions": "Required separate CBC lavender EDTA specimen, room temperature and never frozen."
      }
    ],
    "source": "Quest official directory checked October 2026 • https://testdirectory.questdiagnostics.com/test/test-detail/6796/anemia-diagnostic-profile-basic?cc=MASTER",
    "collectionCount": 2
  },
  {
    "id": "quest-6736-verified-20261027",
    "status": "active",
    "testCode": "6736",
    "testName": "Cortisol, 4 Specimens",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "alternativeContainer": "Red Top serum",
    "transportContainer": "SST / Gold (spun)",
    "preferredVolume": "4 separately timed serum specimens, 1 mL serum EACH",
    "minimumVolume": "0.5 mL serum per each of FOUR specimens",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room temperature; all four tubes labeled individually",
    "stability": "Room/refrigerated 7 days; frozen 28 days",
    "spin": "Yes",
    "collectionCount": 4,
    "submissionCount": 4,
    "specialInstructions": "Four SEPARATELY TIMED serum specimens in FOUR separately labeled tubes. Label exact collection time on EACH original tube; do not pool or transfer them into one transport tube. Cortisol timing is prescribed by the ordering physician and cannot be inferred. Quest advises assay cross-reactivity if patient takes prednisone/prednisolone. Verify the intended timing and regional acceptance before collecting.",
    "source": "Quest official directory checked October 2026 • https://testdirectory.questdiagnostics.com/test/test-detail/6736/cortisol-4-specimens?cc=MASTER"
  }
];
const known=new Set(window.SEED_TESTS.map(t=>String(t.testCode||'').trim()));
for(const t of additions){if(!known.has(t.testCode)){window.SEED_TESTS.push(t);known.add(t.testCode)}}})();