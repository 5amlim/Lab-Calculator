/* Six new Quest test codes from 2026 manufacturer notices and directory.
 * Includes paired blood+urine kidney reflex, kit-specific HPV collection, ESwab C auris
 * screening, Dengue RNA, and second/third blood culture SET codes. Not STAT assigned.
 * Keep all source-specific handling, including separate adult culture bottles.
 */
(()=>{'use strict';if(!Array.isArray(window.SEED_TESTS))return;const additions=[
  {
    "id": "quest-18365-expansion-20261027",
    "testCode": "18365",
    "testName": "Kidney Profile with Reflex to eGFR (Creatinine-Cystatin C)",
    "specimenType": "Serum + Urine",
    "drawContainer": "SST / Gold",
    "alternativeContainer": "Red Top serum if accepted by receiving Quest site",
    "transportContainer": "SST / Gold (spun)",
    "preferredVolume": "3 mL serum plus 10 mL random urine",
    "minimumVolume": "1 mL serum and 2 mL urine",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "stability": "Room/refrigerated 7 days; frozen 28 days",
    "spin": "Yes",
    "specialInstructions": "BOTH blood and random urine are REQUIRED. Initial tests: serum creatinine/eGFR plus urine albumin-creatinine ratio; cystatin C and combined eGFR reflex if eGFRcr <60 and/or uACR >=30. Draw serum, clot, centrifuge. Independently collect 10 mL (minimum 2) random urine in a plastic urine container; preserved yellow/blue-fill urinalysis transport tube acceptable. Avoid acid-preserved urine. Keep urine as an independent submission, NOT pooled with serum. Confirm regional transport and reflex acceptance.",
    "status": "active",
    "source": "Quest official test directory/change notice • https://intellitestmanager.questdiagnostics.com/home/output/301040",
    "additionalDrawRequirements": [
      {
        "container": "Sterile Urine Cup",
        "specimenType": "Urine",
        "preferredVolume": "10 mL random urine",
        "minimumVolume": "2 mL",
        "transportContainer": "Sterile Urine Cup",
        "transportTemperature": "Room Temperature",
        "spin": "No",
        "specialInstructions": "Required urine albumin-to-creatinine ratio for this kidney profile. Submit random urine in a labeled plastic cup or approved yellow-top blue-fill urinalysis tube. Avoid acid preservatives; do not submit in serum bag."
      }
    ]
  },
  {
    "id": "quest-14263-expansion-20261027",
    "testCode": "14263",
    "testName": "HPV DNA (16, 18, Other High Risk), PCR, Self-Collected",
    "specimenType": "Vaginal Swab",
    "drawContainer": "COPAN FLOQSwab 552C.RM (self-collected in healthcare setting)",
    "alternativeContainer": "Evalyn Brush (self-collected)",
    "transportContainer": "ThinPrep vial (swab transferred immediately)",
    "preferredVolume": "1 ThinPrep vial (1.5 mL) with self-collected device",
    "minimumVolume": "1 ThinPrep vial",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "stability": "Room/refrigerated 30 days; frozen unacceptable",
    "spin": "No",
    "specialInstructions": "SELF-COLLECTED VAGINAL HPV test, not cervical Pap. Patient must follow the validated kit procedure. Immediately transfer material into ThinPrep using clinic SOP; DO NOT leave the swab in the vial. Reject SurePath pellet, swab left in vial, untransferred swab, acid-treated samples, cervical specimens, post-hysterectomy samples or patients under age 21. Must be ordered only in eligible clinical screening settings. Do not substitute another swab/media.",
    "status": "active",
    "source": "Quest official test directory/change notice • https://intellitestmanager.questdiagnostics.com/home/output/296318"
  },
  {
    "id": "quest-18928-expansion-20261027",
    "testCode": "18928",
    "testName": "Dengue Virus RNA, Qualitative, Real-Time PCR",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "alternativeContainer": "Red Top serum",
    "transportContainer": "Serum Transport Tube",
    "preferredVolume": "1.2 mL serum",
    "minimumVolume": "0.4 mL",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "stability": "Confirm current Quest service-area stability",
    "spin": "Yes",
    "specialInstructions": "Virus RNA PCR on separated serum. Collect, clot and centrifuge promptly; transfer to a labeled plastic serum transport tube. Maintain refrigerated for shipment, and verify timing/available testing in Quest service area. Do NOT assume that dengue antibody serology is equivalent to RNA PCR.",
    "status": "active",
    "source": "Quest official test directory/change notice • https://intellitestmanager.questdiagnostics.com/home/output/236978"
  },
  {
    "id": "quest-10153-expansion-20261027",
    "testCode": "10153",
    "testName": "Candida auris Surveillance, Qualitative PCR, Axilla/Groin",
    "specimenType": "Swab",
    "drawContainer": "Liquid Amies ESwab",
    "alternativeContainer": "",
    "transportContainer": "Liquid Amies ESwab (original device)",
    "preferredVolume": "1 composite axilla/groin swab",
    "minimumVolume": "1 swab",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "stability": "Refrigerated 14 days; room temperature unacceptable; frozen 30 days per Quest",
    "spin": "No",
    "specialInstructions": "Infection-control SURVEILLANCE, not routine Candida wound culture. With the SAME ESwab, swab left/right axilla then left/right groin, targeting skin folds. Submit original swab in LIQUID AMIES elution transport. DO NOT use Amies gel, dry swabs, blood or urine. Refrigerate promptly and ship cold. Use clinic's infection-prevention workflow and confirm receiving laboratory access.",
    "status": "active",
    "source": "Quest official test directory/change notice • https://intellitestmanager.questdiagnostics.com/home/output/226192"
  },
  {
    "id": "quest-18303-expansion-20261027",
    "testCode": "18303",
    "testName": "Culture, Blood No.2 with Reflex to Molecular Identification",
    "specimenType": "Whole Blood",
    "drawContainer": "BacT/ALERT FA PLUS blood culture bottle (pale green)",
    "alternativeContainer": "Pediatric: BacT/ALERT PF PLUS (yellow), per age/weight guidance",
    "transportContainer": "BacT/ALERT FA PLUS (original bottle)",
    "preferredVolume": "Adults: 8-10 mL in EACH of two bottles; pediatric volume differs",
    "minimumVolume": "Adults: 3 mL per bottle; pediatric 0.5 mL in one PF PLUS bottle",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "stability": "Room temperature 48 hours; refrigeration/freezing UNACCEPTABLE",
    "spin": "No",
    "specialInstructions": "Use this order code ONLY for the SECOND blood culture SET collected within 24 hours. Adult: one FA PLUS pale green aerobic and one FN PLUS orange anaerobic bottle (8-10 mL in each; 3 mL minimum per bottle). Do not pre-incubate. Pediatric collection varies with age and weight and typically uses one PF PLUS yellow pediatric bottle rather than adult set. Confirm bottle selection, service-area access and local sepsis bundle. Never centrifuge, refrigerate, freeze or pool blood culture bottles with routine blood specimens. EDTA, sodium citrate, SPS or heparin collected in tubes is rejected.",
    "status": "active",
    "source": "Quest official test directory/change notice • https://intellitestmanager.questdiagnostics.com/home/output/301671",
    "additionalDrawRequirements": [
      {
        "container": "BacT/ALERT FN PLUS blood culture bottle (orange)",
        "specimenType": "Whole Blood",
        "preferredVolume": "Adults: 8-10 mL blood",
        "minimumVolume": "Adults: 3 mL",
        "transportContainer": "BacT/ALERT FN PLUS (original bottle)",
        "transportTemperature": "Room Temperature",
        "spin": "No",
        "specialInstructions": "SECOND mandatory bottle in adult blood-culture set. Pediatric patients use local protocol; do not automatically use adult aerobic/anaerobic pair."
      }
    ]
  },
  {
    "id": "quest-18304-expansion-20261027",
    "testCode": "18304",
    "testName": "Culture, Blood No.3 with Reflex to Molecular Identification",
    "specimenType": "Whole Blood",
    "drawContainer": "BacT/ALERT FA PLUS blood culture bottle (pale green)",
    "alternativeContainer": "Pediatric: BacT/ALERT PF PLUS (yellow), per age/weight guidance",
    "transportContainer": "BacT/ALERT FA PLUS (original bottle)",
    "preferredVolume": "Adults: 8-10 mL in EACH of two bottles; pediatric volume differs",
    "minimumVolume": "Adults: 3 mL per bottle; pediatric 0.5 mL in one PF PLUS bottle",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "stability": "Room temperature 48 hours; refrigeration/freezing UNACCEPTABLE",
    "spin": "No",
    "specialInstructions": "Use this order code ONLY for the THIRD blood culture SET collected within 24 hours. Adult: one FA PLUS pale green aerobic and one FN PLUS orange anaerobic bottle (8-10 mL in each; 3 mL minimum per bottle). Do not pre-incubate. Pediatric collection varies with age and weight and typically uses one PF PLUS yellow pediatric bottle rather than adult set. Confirm bottle selection, service-area access and local sepsis bundle. Never centrifuge, refrigerate, freeze or pool blood culture bottles with routine blood specimens. EDTA, sodium citrate, SPS or heparin collected in tubes is rejected.",
    "status": "active",
    "source": "Quest official test directory/change notice • https://intellitestmanager.questdiagnostics.com/home/output/301671",
    "additionalDrawRequirements": [
      {
        "container": "BacT/ALERT FN PLUS blood culture bottle (orange)",
        "specimenType": "Whole Blood",
        "preferredVolume": "Adults: 8-10 mL blood",
        "minimumVolume": "Adults: 3 mL",
        "transportContainer": "BacT/ALERT FN PLUS (original bottle)",
        "transportTemperature": "Room Temperature",
        "spin": "No",
        "specialInstructions": "SECOND mandatory bottle in adult blood-culture set. Pediatric patients use local protocol; do not automatically use adult aerobic/anaerobic pair."
      }
    ]
  }
];
const known=new Set(window.SEED_TESTS.map(t=>String(t.testCode||'').trim()));for(const t of additions){if(known.has(t.testCode))continue;window.SEED_TESTS.push(t);known.add(t.testCode)}})();
