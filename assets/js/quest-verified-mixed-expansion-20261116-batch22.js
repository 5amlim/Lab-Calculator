/* Quest directly reviewed collectable tests, batch22, 2026-11-16.
 * No slide preparation, acid-preserved urine, or unsupported collection media.
 * Whole body-fluid source labels remain distinct; white-cap ESwab remains original.
 * Existing active/blocked records must never be changed by this import. */
(()=>{'use strict';if(!Array.isArray(window.SEED_TESTS))return;
const additions=[
  {
    "id": "quest-verified-20261116-batch22-6740",
    "status": "active",
    "testCode": "6740",
    "testName": "Cell Count and Differential, Pericardial Fluid",
    "specimenType": "Pericardial Fluid",
    "drawContainer": "Lavender EDTA",
    "alternativeContainer": "",
    "transportContainer": "Lavender EDTA",
    "preferredVolume": "3 mL pericardial fluid",
    "minimumVolume": "1 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "stability": "Room 48 hours; refrigerated 48 hours; frozen unacceptable",
    "specialLabeling": "Label specimen source and collection date/time",
    "specialInstructions": "Qualified procedural clinician collects pericardial fluid directly into Lavender EDTA (preferred) or sodium-heparin green-top tube. Gently mix and submit the ORIGINAL tube, with no spin or transfer, at room temperature. Clearly label source PERICARDIAL FLUID, anatomic site, collection date/time. Do not freeze; clotted specimens rejected. Manual microscopic differential is performed at the reference laboratory, not prepared as a smear or slide at the clinic. Quest lists San Juan Capistrano / Chantilly laboratory restrictions; confirm account service-area acceptance before collection.",
    "source": "Quest official test directory, reviewed 2026-11-16 • https://testdirectory.questdiagnostics.com/test/test-detail/6740/cell-count-and-differential-pericardial-fluid?cc=MASTER&p=r"
  },
  {
    "id": "quest-verified-20261116-batch22-94675",
    "status": "active",
    "testCode": "94675",
    "testName": "Lactate Dehydrogenase (LD), Body Fluid",
    "specimenType": "Body Fluid",
    "drawContainer": "Sterile cup",
    "alternativeContainer": "",
    "transportContainer": "Transport Tube",
    "preferredVolume": "1 mL body fluid",
    "minimumVolume": "0.5 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "Yes",
    "stability": "Room 7 days; refrigerated 48 hours; frozen unacceptable",
    "specialLabeling": "Label specimen source and collection date/time",
    "specialInstructions": "Qualified clinician collects eligible sterile body fluid directly into an additive-free Sterile cup, centrifuges to remove cellular material, then TRANSFERS 1 mL clear supernatant into plastic screw-cap Transport Tube. Ship room temperature; NEVER freeze. Label exact source/site and collection date/time. Do NOT use generic code 94675 if source-specific Quest codes apply: peritoneal 17588, pleural 17589, synovial 17658, pericardial 17647 or CSF 1687. Breast milk, BAL, gastric/nasal secretions, ostomy material, vitreous fluid, feces, saliva, sputum and urine are unacceptable. Check local Quest service-area availability; not offered in San Juan Capistrano (IFD) or Chantilly.",
    "source": "Quest official test directory, reviewed 2026-11-16 • https://testdirectory.questdiagnostics.com/test/test-detail/94675/lactate-dehydrogenase-ld-body-fluid?cc=MASTER&p=r"
  },
  {
    "id": "quest-verified-20261116-batch22-17656",
    "status": "active",
    "testCode": "17656",
    "testName": "Methicillin Resistant Staphylococcus aureus (MRSA), PCR",
    "specimenType": "Nasal Swab",
    "drawContainer": "ESwab (Amies)",
    "alternativeContainer": "",
    "transportContainer": "ESwab (Amies)",
    "preferredVolume": "One white-cap ESwab collected from both nares",
    "minimumVolume": "One white-cap ESwab",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "stability": "Room 24 hours; refrigerated 7 days; frozen unacceptable",
    "specialLabeling": "Label specimen source and collection date/time",
    "specialInstructions": "Collect BOTH nostrils with the SAME white-cap ESwab; rotate/swab each nare and place the swab into its ORIGINAL liquid Amies transport medium. Submit original sealed white-cap ESwab, NO transfer or centrifugation. Keep refrigerated with cold packs, do not freeze. Only the validated WHITE-cap ESwab is accepted; other-colored ESwab devices, wire swabs and substitute swab types must not be used. Dual-rayon Stuart is an alternative ONLY if correct validated supplies are actually stocked.",
    "source": "Quest official test directory, reviewed 2026-11-16 • https://testdirectory.questdiagnostics.com/test/test-detail/17656/methicillin-resistant-staphylococcus-aureus-pcr?cc=MASTER&p=r"
  },
  {
    "id": "quest-verified-20261116-batch22-95185",
    "status": "active",
    "testCode": "95185",
    "testName": "Special Culture, Aerobic Bacteria",
    "specimenType": "Body Fluid",
    "drawContainer": "Sterile cup",
    "alternativeContainer": "",
    "transportContainer": "Sterile cup",
    "preferredVolume": "Aspirate/wound drainage in sterile leakproof container (volume not specified)",
    "minimumVolume": "Not specified for fluid collection",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "stability": "Room 48 hours; refrigerated 48 hours; frozen unacceptable",
    "specialLabeling": "Label specimen source and collection date/time",
    "specialInstructions": "For ASPIRATES, fluid from abscesses or wound drainage, qualified clinician submits sample directly in an original sterile leakproof screw-cap Sterile cup with NO spin or transfer. Label EXACT anatomical specimen source/site and collection date/time. Transport room temperature; DO NOT freeze. For surface swab collections, use a separate validated ESwab/Amies or equivalent medium, not a dry swab, and follow the swab-specific route. Do not submit nails, formalin, expired swabs, molecular transport medium or unsupported slides. Request anaerobic culture separately when clinically indicated.",
    "source": "Quest official test directory, reviewed 2026-11-16 • https://testdirectory.questdiagnostics.com/test/test-detail/95185/special-culture-aerobic-bacteria?cc=MASTER&p=r"
  }
];
for(const record of additions){const prior=window.SEED_TESTS.find(t=>String(t.testCode||'').trim()===record.testCode);if(!prior){window.SEED_TESTS.push(record);continue;}if(['pending','reference'].includes(prior.status))Object.assign(prior,record,{id:prior.id||record.id});}
})();
