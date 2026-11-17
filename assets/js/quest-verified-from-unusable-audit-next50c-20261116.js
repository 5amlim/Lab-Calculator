/* Quest missing-audit NEXT 50 after 14511, through 16252. Reviewed 2026-11-16.
 * Activate only verified collectable routes; all others remain reference-only.
 * Never overwrite active staff records or Do Not Perform blocks.
 * IMPORTANT: specialized TB respiratory collection, platelet-poor plasma, and
 * certain controlled collection environments require site approval.
 */
(()=>{'use strict';if(!Array.isArray(window.SEED_TESTS))return;
const additions=[
  {
    "id": "quest-verified-unusable-audit-next50c-20261116-14534",
    "testCode": "14534",
    "testName": "Cortisol, Free, 24-Hour Urine",
    "status": "active",
    "specimenType": "24-Hour Urine",
    "drawContainer": "24-Hour Urine Container (no preservative)",
    "alternativeContainer": "",
    "transportContainer": "Sterile cup",
    "preferredVolume": "2 mL urine from a well-mixed 24-hour collection",
    "minimumVolume": "0.5 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "stability": "Room 14 days; refrigerated 21 days; frozen 90 days",
    "specialLabeling": "Label 24-HOUR URINE, exact specimen source and collection date/time",
    "specialInstructions": "Collect ALL urine over one complete 24-hour period in a plain 24-hour urine jug WITHOUT ANY PRESERVATIVE. Keep the jug REFRIGERATED during collection. Discard the first morning void, collect every subsequent void including the final void 24 hours later. Mix the completed collection; record TOTAL URINE VOLUME, start and end date/time on request and aliquot. Transfer at least 2 mL (minimum 0.5 mL) to a labeled sterile leakproof Sterile cup. Ship the urine aliquot REFRIGERATED with cold packs; source jug is not the submission container. Do NOT substitute the alternative 6N HCl, acetic-acid or boric-acid preservation pathways. Verify account-specific Quest service-area acceptance and available supplies before collection.",
    "searchAliases": [
      "24-hour urine free cortisol",
      "UFC 24h",
      "urine cortisol creatinine",
      "Cushing urine cortisol"
    ],
    "clinicalCategories": [
      "endocrinology",
      "urinary"
    ],
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/14534/cortisol-free-24-hour-urine?cc=MASTER&p=r"
  },
  {
    "id": "quest-verified-unusable-audit-next50c-20261116-14541",
    "testCode": "14541",
    "testName": "Culture, Throat, Special with Group A Strep Susceptibility",
    "status": "active",
    "specimenType": "Throat Swab",
    "drawContainer": "ESwab (Amies)",
    "alternativeContainer": "",
    "transportContainer": "ESwab (Amies)",
    "preferredVolume": "One ESwab in Amies transport",
    "minimumVolume": "One swab",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "stability": "Room 48 hours; frozen unacceptable",
    "specialLabeling": "Label THROAT SWAB, exact specimen source and collection date/time",
    "specialInstructions": "Collect THROAT SWAB from both tonsillar pillars and posterior pharynx with a clean WHITE-CAP liquid Amies ESwab; avoid contacting tongue or cheek. Place swab directly back into its ORIGINAL liquid Amies ESwab tube, cap securely and submit at ROOM TEMPERATURE, ideally as soon as possible (within 48 hours). NO slide or onsite smear, no transfer, no viral medium. Quest performs group A Streptococcus culture and reflex antimicrobial susceptibility in lab. This exact code is NOT performed at Quest Nichols San Juan Capistrano: confirm your receiving account's assigned performing laboratory before draw. Verify account-specific Quest service-area acceptance and available supplies before collection.",
    "searchAliases": [
      "group A strep throat culture susceptibility",
      "GAS culture sensitivity",
      "throat swab special culture",
      "strep pyogenes antimicrobial susceptibility"
    ],
    "clinicalCategories": [
      "microbiology",
      "infectious",
      "respiratory"
    ],
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/14541/culture-throat-special-wgrp-a-strep-suscept?cc=MASTER"
  },
  {
    "id": "quest-verified-unusable-audit-next50c-20261116-14573",
    "testCode": "14573",
    "testName": "Heavy Metals Comprehensive Panel, Urine",
    "status": "active",
    "specimenType": "Urine",
    "drawContainer": "Trace Metal-Free Plastic Container",
    "alternativeContainer": "",
    "transportContainer": "Trace Metal-Free Plastic Container",
    "preferredVolume": "7 mL random urine",
    "minimumVolume": "3 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "stability": "Room 48 hours; refrigerated 5 days; frozen 14 days",
    "specialLabeling": "Label URINE, exact specimen source and collection date/time",
    "specialInstructions": "Collect RANDOM urine directly into an acid-washed or TRACE METAL-FREE PLASTIC urine container. Submit the ORIGINAL metal-free container REFRIGERATED with cold packs; do not transfer into ordinary Sterile cup or use preservative. Patient should avoid seafood for 48 hours before collection and should not collect at industrial worksite. Panel includes arsenic, cadmium, cobalt, lead, mercury, thallium and creatinine. Quest explicitly lists code 14573 as NOT AVAILABLE for New York patient testing; check that the patient's market is appropriate. Do not pool this source with room-temperature metal-free urine orders. Verify account-specific Quest service-area acceptance and available supplies before collection.",
    "searchAliases": [
      "comprehensive urine heavy metals",
      "urine toxic metals panel",
      "arsenic cadmium cobalt lead mercury thallium urine"
    ],
    "clinicalCategories": [
      "heavy-metals",
      "toxicology",
      "urinary"
    ],
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/14573/heavy-metals-comprehensive-panel-urine?cc=MASTER&p=r"
  },
  {
    "id": "quest-verified-unusable-audit-next50c-20261116-14684",
    "testCode": "14684",
    "testName": "Mycobacterium tuberculosis Complex, PCR, Culture and Smear, Respiratory",
    "status": "active",
    "specimenType": "Sputum",
    "drawContainer": "Sterile cup",
    "alternativeContainer": "",
    "transportContainer": "Sterile cup",
    "preferredVolume": "10 mL expectorated sputum",
    "minimumVolume": "2 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "stability": "Room unacceptable; refrigerated 5 days; frozen unacceptable",
    "specialLabeling": "Label SPUTUM, exact specimen source and collection date/time",
    "specialInstructions": "RESPIRATORY SPUTUM ROUTE ONLY: collect deep-cough sputum into one sterile leakproof Sterile cup, after patient gargles with water. Avoid saliva; do not pool collections. Submit ORIGINAL cup REFRIGERATED (2–8°C), never frozen, in a separate labeled sputum specimen bag. Quest performs AFB fluorochrome microscopy, PCR, and culture; NEVER prepare slides or smears at your clinic. For clinical TB suspicion, do NOT induce cough or collect in ordinary shared clinic space. Follow approved airborne precautions, clinical escalation and site infection-control policy; refer collection elsewhere when adequate isolation is unavailable. Quest recommends three separate first-morning sputum specimens on three consecutive days when ordered, each separately labeled/order and collected per clinically approved protocol. Verify account-specific Quest service-area acceptance and available supplies before collection.",
    "searchAliases": [
      "TB PCR and culture",
      "tuberculosis AFB PCR sputum",
      "MTB complex sputum",
      "AFB smear culture TB"
    ],
    "clinicalCategories": [
      "microbiology",
      "infectious",
      "respiratory"
    ],
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/14684/mycobacterium-tuberculosis-complex-pcr-culture-and-smear-respiratory?cc=MASTER&p=r"
  },
  {
    "id": "quest-verified-unusable-audit-next50c-20261116-14685",
    "testCode": "14685",
    "testName": "Mycobacterium tuberculosis Complex, PCR, Culture and Smear, Non-Respiratory",
    "status": "active",
    "specimenType": "CSF",
    "drawContainer": "Sterile cup",
    "alternativeContainer": "",
    "transportContainer": "Sterile cup",
    "preferredVolume": "2 mL CSF from qualified clinician",
    "minimumVolume": "1 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "stability": "Room unacceptable; refrigerated 5 days; frozen unacceptable",
    "specialLabeling": "Label CSF, exact specimen source and collection date/time",
    "specialInstructions": "NON-RESPIRATORY CSF PATHWAY ONLY: qualified procedural clinician collects CSF aseptically in original sterile leakproof Sterile cup/vial. Submit ORIGINAL labeled CSF container REFRIGERATED with cold packs; do not freeze, centrifuge, add preservative, or prepare slides/smears. Quest performs mycobacterial culture and fluorochrome microscopy as well as PCR. Distinct CSF source must not be grouped with respiratory sputum, gastric lavage, body-fluid, urine or tissue pathways. If clinical TB is suspected, follow infection-control escalation and local procedural collection policy before acceptance. Verify account-specific Quest service-area acceptance and available supplies before collection.",
    "searchAliases": [
      "TB PCR CSF",
      "tuberculous meningitis CSF culture",
      "MTB complex nonrespiratory",
      "AFB CSF TB"
    ],
    "clinicalCategories": [
      "microbiology",
      "infectious",
      "neurology"
    ],
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/14685/mycobacterium-tuberculosis-complex-pcr-culture-and-smear-non-respiratory?cc=MASTER&p=r"
  },
  {
    "id": "quest-verified-unusable-audit-next50c-20261116-14867",
    "testCode": "14867",
    "testName": "Viral Respiratory, Rapid Culture with Reflex",
    "status": "active",
    "specimenType": "Nasopharyngeal Swab",
    "drawContainer": "Viral transport medium (VCM)",
    "alternativeContainer": "",
    "transportContainer": "Viral transport medium (VCM)",
    "preferredVolume": "One NP swab in 3 mL VCM viral medium",
    "minimumVolume": "1 mL VCM specimen",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "stability": "Room unacceptable; refrigerated 4 days; -20°C frozen unacceptable",
    "specialLabeling": "Label NASOPHARYNGEAL SWAB, exact specimen source and collection date/time",
    "specialInstructions": "Collect NASOPHARYNGEAL swab using Quest-approved synthetic swab directly into 3 mL VCM viral culture medium (or Quest-accepted equivalent). Submit ORIGINAL capped viral medium tube REFRIGERATED with cold packs; do not transfer, prepare slides/smears or send dry. A different standard NAAT-only medium or bacterial Amies ESwab is NOT acceptable. Quest laboratory performs enhanced viral culture and reflex identification. No sputum, throat swab, nasal smear or non-respiratory source through this entry. Delay requiring -70°C freezing is not supported by the clinic's -20°C freezer, so dispatch refrigerated within 4 days. Verify account-specific Quest service-area acceptance and available supplies before collection.",
    "searchAliases": [
      "viral respiratory rapid culture",
      "respiratory virus culture reflex",
      "NP swab viral culture",
      "rapid virus screen culture"
    ],
    "clinicalCategories": [
      "microbiology",
      "infectious",
      "respiratory"
    ],
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/14867/viral-respiratory-rapid-culture-with-reflex?cc=MASTER"
  },
  {
    "id": "quest-verified-unusable-audit-next50c-20261116-15062",
    "testCode": "15062",
    "testName": "Legionella DNA, Qualitative, Real-Time PCR",
    "status": "active",
    "specimenType": "Sputum",
    "drawContainer": "Sterile cup",
    "alternativeContainer": "",
    "transportContainer": "Sterile cup",
    "preferredVolume": "1 mL fresh sputum",
    "minimumVolume": "0.3 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "stability": "Room 48 hours; refrigerated 14 days; frozen 30 days",
    "specialLabeling": "Label SPUTUM, exact specimen source and collection date/time",
    "specialInstructions": "RESPIRATORY SPUTUM ROUTE: collect fresh deep-cough sputum into a sterile leakproof plastic Sterile cup (never saliva). Label SPUTUM and collection date/time; submit the ORIGINAL closed cup REFRIGERATED with cold packs. Do not add viral medium, bacterial Amies or preservative. Quest accepts BAL or NP/throat swab in viral medium via alternative pathways but those are NOT represented by this single original-sputum container plan. Quest PCR detects Legionella pneumophila and other pathogenic Legionella DNA. Verify account-specific Quest service-area acceptance and available supplies before collection.",
    "searchAliases": [
      "Legionella pneumophila PCR",
      "legionella molecular sputum",
      "Legionella species DNA",
      "legionnaires PCR"
    ],
    "clinicalCategories": [
      "microbiology",
      "infectious",
      "respiratory"
    ],
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/15062/legionella-dna-qualitative-real-time-pcr?cc=MASTER"
  },
  {
    "id": "quest-verified-unusable-audit-next50c-20261116-15082",
    "testCode": "15082",
    "testName": "Enterovirus RNA, Qualitative, Real-Time PCR",
    "status": "active",
    "specimenType": "CSF",
    "drawContainer": "Sterile cup",
    "alternativeContainer": "",
    "transportContainer": "Sterile cup",
    "preferredVolume": "0.7 mL clear CSF",
    "minimumVolume": "0.3 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "stability": "Room 48 hours; refrigerated 7 days; frozen 30 days",
    "specialLabeling": "Label CSF, exact specimen source and collection date/time",
    "specialInstructions": "CSF PATHWAY: qualified procedural clinician obtains cerebrospinal fluid into original sterile leakproof screw-cap Sterile cup/vial. Submit original container REFRIGERATED with cold packs and correctly label CSF, collection time and source. This is enterovirus RNA PCR (includes echovirus/coxsackie), NOT complement fixation antibody test or a rhinovirus discriminatory assay. Alternative stool specimens require FROZEN shipment, and swabs require viral medium; those must NOT be grouped with this CSF workflow. No clinic slide preparation or transfer. Verify account-specific Quest service-area acceptance and available supplies before collection.",
    "searchAliases": [
      "enterovirus PCR CSF",
      "coxsackievirus CSF PCR",
      "echovirus CSF",
      "EV RNA PCR CSF"
    ],
    "clinicalCategories": [
      "microbiology",
      "infectious",
      "neurology"
    ],
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/15082/enterovirus-rna-qualitative-real-time-pcr?cc=MASTER"
  },
  {
    "id": "quest-verified-unusable-audit-next50c-20261116-15110",
    "testCode": "15110",
    "testName": "Heavy Metals Panel with Cadmium, Random Urine",
    "status": "active",
    "specimenType": "Urine",
    "drawContainer": "Trace Metal-Free Plastic Container",
    "alternativeContainer": "",
    "transportContainer": "Trace Metal-Free Plastic Container",
    "preferredVolume": "7 mL random urine",
    "minimumVolume": "3 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "stability": "Room 48 hours; refrigerated 5 days; frozen 14 days",
    "specialLabeling": "Label URINE, exact specimen source and collection date/time",
    "specialInstructions": "Collect RANDOM URINE directly into a trace-metal-free or acid-washed PLASTIC urine container. Original metal-free container is shipped REFRIGERATED with cold packs, with no transfer or preservative. Avoid collection at the occupational worksite and avoid seafood for 48 hours before collection. Do not use ordinary Sterile cup, glass, or a different-temperature urine collection in the same physical source. Quest panel includes cadmium and other heavy metals, distinct from 24-hour metal screens. Confirm Quest test code and available service area. Verify account-specific Quest service-area acceptance and available supplies before collection.",
    "searchAliases": [
      "urine heavy metals cadmium",
      "cadmium arsenic lead mercury urine",
      "toxic metals cadmium random urine"
    ],
    "clinicalCategories": [
      "heavy-metals",
      "toxicology",
      "urinary"
    ],
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/15110/heavy-metals-panel-with-cadmium-random-urine?cc=MASTER&p=r"
  },
  {
    "id": "quest-verified-unusable-audit-next50c-20261116-15319",
    "testCode": "15319",
    "testName": "Copper, Random Urine",
    "status": "active",
    "specimenType": "Urine",
    "drawContainer": "Trace Metal-Free Plastic Container",
    "alternativeContainer": "",
    "transportContainer": "Trace Metal-Free Plastic Container",
    "preferredVolume": "7 mL random urine",
    "minimumVolume": "3 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "stability": "Room 5 days; refrigerated 7 days; frozen 28 days",
    "specialLabeling": "Label URINE, exact specimen source and collection date/time",
    "specialInstructions": "Collect RANDOM URINE directly into an acid-washed/TRACE METAL-FREE PLASTIC urine container, no additives. Submit ORIGINAL metal-free container at ROOM TEMPERATURE. Keep this source distinct from ordinary Sterile cup urine and from refrigerated trace-metal urine specimens. Do not transfer into standard urine cup; avoid fecal contamination. Includes urine creatinine. Confirm local Quest account availability for code 15319. Verify account-specific Quest service-area acceptance and available supplies before collection.",
    "searchAliases": [
      "urine copper creatinine",
      "copper random urine",
      "Wilson copper random urine",
      "urinary copper"
    ],
    "clinicalCategories": [
      "heavy-metals",
      "urinary",
      "metabolic"
    ],
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/15319/copper-random-urine?cc=MASTER&p=r"
  },
  {
    "id": "quest-verified-unusable-audit-next50c-20261116-15873",
    "testCode": "15873",
    "testName": "Herpesvirus 8 (HHV-8) DNA, Qualitative Real-Time PCR",
    "status": "active",
    "specimenType": "Whole Blood",
    "drawContainer": "Lavender EDTA",
    "alternativeContainer": "",
    "transportContainer": "Lavender EDTA",
    "preferredVolume": "1 mL whole blood in Lavender EDTA",
    "minimumVolume": "0.5 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "stability": "Room 48 hours; refrigerated 7 days; frozen WHOLE BLOOD not acceptable",
    "specialLabeling": "Label WHOLE BLOOD, exact specimen source and collection date/time",
    "specialInstructions": "Collect 1 mL EDTA WHOLE BLOOD in original Lavender EDTA tube; invert gently and submit ORIGINAL sealed tube REFRIGERATED with cold packs. No heparin, centrifugation, aliquot or whole-blood freezing. Quest also permits EDTA plasma, ACD blood and serum using different routes; this entry models ONLY original Lavender EDTA whole blood. Explicitly label WHOLE BLOOD and collection time on tube and request. Verify account-specific Quest service-area acceptance and available supplies before collection.",
    "searchAliases": [
      "HHV8 PCR",
      "human herpesvirus 8 DNA",
      "Kaposi-associated herpesvirus PCR",
      "KSHV DNA whole blood"
    ],
    "clinicalCategories": [
      "infectious",
      "virology",
      "molecular"
    ],
    "source": "https://intellitestmanager.questdiagnostics.com/home/output/236128"
  },
  {
    "id": "quest-verified-unusable-audit-next50c-20261116-15904",
    "testCode": "15904",
    "testName": "Aripiprazole, Blood",
    "status": "active",
    "specimenType": "Whole Blood",
    "drawContainer": "Gray Fluoride/Oxalate",
    "alternativeContainer": "",
    "transportContainer": "Gray Fluoride/Oxalate",
    "preferredVolume": "1 mL whole blood",
    "minimumVolume": "0.3 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "stability": "Room 30 days; refrigerated 30 days; frozen 30 days",
    "specialLabeling": "Label WHOLE BLOOD, exact specimen source and collection date/time",
    "specialInstructions": "Collect ONE DEDICATED Gray Fluoride/Oxalate sodium fluoride/potassium oxalate whole-blood tube and invert gently; submit ORIGINAL intact, unspun tube at ROOM TEMPERATURE. Do NOT centrifuge, transfer serum, substitute SST or use routine green/lavender tubes. Record collection time and prescribed aripiprazole dosing/last dose when clinician specifies therapeutic drug monitoring. Keep this whole-blood assay distinct from Quest code 15922 (serum/plasma aripiprazole). Do not pool dedicated gray tube with glucose or timed solvent measurements. Verify account-specific Quest service-area acceptance and available supplies before collection.",
    "searchAliases": [
      "Abilify blood level",
      "aripiprazole whole blood",
      "aripiprazole therapeutic drug monitoring",
      "aripiprazole concentration"
    ],
    "clinicalCategories": [
      "toxicology",
      "medications"
    ],
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/15904/aripiprazole-blood?cc=MASTER"
  },
  {
    "id": "quest-verified-unusable-audit-next50c-20261116-16064",
    "testCode": "16064",
    "testName": "Mycobacterium avium-intracellulare DNA, Qualitative, Real-Time PCR",
    "status": "active",
    "specimenType": "Sputum",
    "drawContainer": "Sterile cup",
    "alternativeContainer": "",
    "transportContainer": "Sterile cup",
    "preferredVolume": "2 mL expectorated sputum",
    "minimumVolume": "1 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "stability": "Room 48 hours; refrigerated 10 days; frozen 30 days",
    "specialLabeling": "Label SPUTUM, exact specimen source and collection date/time",
    "specialInstructions": "RESPIRATORY SPUTUM ROUTE: collect deep-cough sputum in original sterile leakproof Sterile cup, avoiding saliva. Submit original properly labeled closed cup REFRIGERATED with cold packs (Quest requires refrigeration after collection and in transit). Do not use heparin, add bacterial transport swab medium, transfer, or prepare slides. This detects M. avium and M. intracellulare DNA; it is not an AFB culture and must not be substituted for tuberculosis PCR. If aerosol-generating collection is clinically concerning, follow clinic respiratory isolation/infection-control policy. Verify account-specific Quest service-area acceptance and available supplies before collection.",
    "searchAliases": [
      "MAC PCR sputum",
      "MAI mycobacterium DNA",
      "M avium intracellulare molecular",
      "nontuberculous mycobacteria PCR"
    ],
    "clinicalCategories": [
      "microbiology",
      "infectious",
      "respiratory"
    ],
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/16064/mycobacterium-avium-intracellulare-dna-qualitative-real-time-pcr?cc=MASTER&p=r"
  },
  {
    "id": "quest-verified-unusable-audit-next50c-20261116-16103",
    "testCode": "16103",
    "testName": "Fondaparinux Sodium (Xa Inhibition)",
    "status": "active",
    "specimenType": "Platelet Poor Plasma",
    "drawContainer": "Light Blue Sodium Citrate",
    "alternativeContainer": "",
    "transportContainer": "Transport Tube",
    "preferredVolume": "1 mL frozen platelet-poor citrate plasma",
    "minimumVolume": "0.5 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "spin": "Yes",
    "stability": "Room and refrigerated unacceptable; frozen 21 days",
    "specialLabeling": "Label PLATELET POOR PLASMA, exact specimen source and collection date/time",
    "specialInstructions": "Collect a DEDICATED properly filled Light Blue Sodium Citrate tube to its manufacturer fill line. Gently invert, centrifuge and prepare platelet-POOR CITRATED PLASMA following the site's approved double-spin protocol. Separate 1 mL (minimum 0.5 mL) into one additive-free screw-cap Transport Tube promptly and FREEZE before dispatch; send on dry ice without thawing. Do not submit whole blood, yellow/light-blue urine tubes, serum, lavender EDTA plasma or an underfilled citrate tube. Document collection time relative to fondaparinux dosing as directed by ordering clinician. DO NOT activate this workflow at a clinic unless the approved platelet-poor plasma processing, freezing and specimen-handling capability is available. Verify account-specific Quest service-area acceptance and available supplies before collection.",
    "searchAliases": [
      "fondaparinux anti-Xa",
      "Arixtra level",
      "fondaparinux drug monitoring",
      "anti factor Xa fondaparinux"
    ],
    "clinicalCategories": [
      "coagulation",
      "hematology",
      "medications"
    ],
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/16103/fondaparinux-sodium-xa-inhibition?cc=MASTER"
  }
];
for(const entry of additions){
 const old=window.SEED_TESTS.find(x=>String(x.testCode||'').trim()===entry.testCode);
 if(!old){window.SEED_TESTS.push(entry);continue;}
 if(old.status==='reference'||old.status==='pending')Object.assign(old,entry,{id:old.id||entry.id});
}
})();
