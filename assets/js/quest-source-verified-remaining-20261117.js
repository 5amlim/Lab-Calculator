/* Quest 2026-11-17 next safe tranche from the historical reference-only audit.
   Do not modify active or blocked entries. Require code-specific collection route,
   source-specific labels, validated draw/submit distinction, and Quest service-area checks. */
(()=>{'use strict';if(!Array.isArray(window.SEED_TESTS))return;
const additions=[
  {
    "id": "quest-source-verified-remaining-20261117-16186",
    "status": "active",
    "alternativeContainer": "",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperatureRaw": "Frozen",
    "testCode": "16186",
    "testName": "HIV-1 RNA, Quantitative, Real-Time PCR, CSF",
    "specimenType": "CSF",
    "drawContainer": "Sterile cup",
    "transportContainer": "Sterile cup",
    "preferredVolume": "3 mL CSF",
    "minimumVolume": "1.1 mL CSF",
    "transportTemperature": "Frozen",
    "spin": "No",
    "stability": "Room: 24 hours; refrigerated: 6 days; frozen: 42 days",
    "specialLabeling": "Label CSF · ORIGINAL STERILE CONTAINER",
    "specialInstructions": "Qualified procedural clinician collects at least 3 mL CSF into an additive-free sterile screw-cap leakproof container. Submit in the SAME ORIGINAL capped Sterile cup; do NOT add heparin or use heparinized tubes because heparin inhibits PCR. FREEZE and ship FROZEN in the dedicated frozen bag. Verify receiving Quest account and service area before collection.",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/16186/hiv-1-rna-quantitative-real-time-pcr-csf?cc=MASTER",
    "searchAliases": [
      "CSF HIV viral load",
      "HIV RNA spinal fluid",
      "HIV1 CSF PCR"
    ],
    "clinicalCategories": [
      "infectious",
      "neurology",
      "virology"
    ]
  },
  {
    "id": "quest-source-verified-remaining-20261117-16441",
    "status": "active",
    "alternativeContainer": "",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperatureRaw": "Frozen",
    "testCode": "16441",
    "testName": "JC Polyoma Virus DNA, Qualitative, Real-Time PCR, CSF",
    "specimenType": "CSF",
    "drawContainer": "Sterile cup",
    "transportContainer": "Sterile cup",
    "preferredVolume": "0.7 mL CSF",
    "minimumVolume": "0.3 mL CSF",
    "transportTemperature": "Frozen",
    "spin": "No",
    "stability": "Room: 48 hours; refrigerated: 7 days; frozen: 30 days",
    "specialLabeling": "Label CSF · ORIGINAL STERILE CONTAINER",
    "specialInstructions": "Qualified clinician collects CSF directly into an additive-free sterile leakproof plastic Sterile cup. Submit the original securely capped container FROZEN. No centrifugation, media, preservatives, slides or forced transfer; do not combine with serum or plasma. Distinguish QUALITATIVE code 16441 from QUANTITATIVE code 16442. Confirm Quest account/service-area orderability and frozen shipment.",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/16441/jc-polyoma-virus-dna-qualitative-real-time-pcr-csf?cc=MASTER&p=r",
    "searchAliases": [
      "JC virus CSF qualitative",
      "JCV DNA CSF",
      "progressive multifocal leukoencephalopathy CSF"
    ],
    "clinicalCategories": [
      "infectious",
      "neurology",
      "virology"
    ]
  },
  {
    "id": "quest-source-verified-remaining-20261117-18889",
    "status": "active",
    "alternativeContainer": "",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperatureRaw": "Frozen",
    "testCode": "18889",
    "testName": "BK Virus DNA, Qualitative, Real-Time PCR, CSF",
    "specimenType": "CSF",
    "drawContainer": "Sterile cup",
    "transportContainer": "Sterile cup",
    "preferredVolume": "0.7 mL CSF",
    "minimumVolume": "0.3 mL CSF",
    "transportTemperature": "Frozen",
    "spin": "No",
    "stability": "Room: 48 hours; refrigerated: 7 days; frozen: 30 days",
    "specialLabeling": "Label CSF · ORIGINAL STERILE CONTAINER",
    "specialInstructions": "Qualified procedural clinician collects CSF into an additive-free sterile leakproof Sterile cup. Submit the SAME ORIGINAL capped container FROZEN; no centrifugation, preservative, spin or slides. Do not confuse QUALITATIVE BK code 18889 with QUANTITATIVE CSF code 18901 or BK urine molecular testing, which has a separate collection device. Verify local Quest acceptance and current performing lab.",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/18889/bk-virus-dna-qualitative-real-time-pcr-csf?cc=MASTER&p=r",
    "searchAliases": [
      "BK polyomavirus CSF qualitative",
      "BKV CSF PCR",
      "BK virus cerebrospinal fluid"
    ],
    "clinicalCategories": [
      "infectious",
      "neurology",
      "virology"
    ]
  },
  {
    "id": "quest-source-verified-remaining-20261117-19895",
    "status": "active",
    "alternativeContainer": "",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperatureRaw": "Room Temperature",
    "testCode": "19895",
    "testName": "Coxsackie A Antibodies, CSF",
    "specimenType": "CSF",
    "drawContainer": "Sterile cup",
    "transportContainer": "Transport Tube",
    "preferredVolume": "2 mL CSF",
    "minimumVolume": "0.5 mL CSF",
    "transportTemperature": "Room Temperature",
    "spin": "No",
    "stability": "Room: 7 days; refrigerated: 14 days; frozen: 30 days",
    "specialLabeling": "Label CSF · STERILE TRANSPORT TUBE",
    "specialInstructions": "A qualified procedural clinician obtains CSF in original sterile leakproof Sterile cup. Transfer 2 mL (minimum 0.5 mL) of additive-free CSF into a dedicated sterile screw-cap plastic Transport Tube as specified by Quest. Label CSF and submit at ROOM TEMPERATURE. No centrifugation, preservative, blood-tube substitution or onsite slides. Verify active Quest code and service area.",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/19895/coxsackie-a-antibodies-csf?cc=MASTER&p=r",
    "searchAliases": [
      "Coxsackievirus A CSF antibody",
      "Coxsackie A spinal fluid",
      "enterovirus CSF antibody"
    ],
    "clinicalCategories": [
      "infectious",
      "neurology",
      "virology"
    ]
  },
  {
    "id": "quest-source-verified-remaining-20261117-37476",
    "status": "active",
    "alternativeContainer": "",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperatureRaw": "Room Temperature",
    "testCode": "37476",
    "testName": "Echovirus Antibodies, CSF",
    "specimenType": "CSF",
    "drawContainer": "Sterile cup",
    "transportContainer": "Sterile cup",
    "preferredVolume": "2 mL CSF",
    "minimumVolume": "1 mL CSF",
    "transportTemperature": "Room Temperature",
    "spin": "No",
    "stability": "Room: 7 days; refrigerated: 14 days; frozen: 30 days",
    "specialLabeling": "Label CSF · ORIGINAL STERILE SCREW-CAP",
    "specialInstructions": "Qualified procedural clinician obtains CSF in additive-free sterile leakproof screw-cap plastic Sterile cup, and submits the SAME ORIGINAL container at ROOM TEMPERATURE. No centrifugation, slide preparation, preservatives or automatic transfer. Confirm local Quest service area and code-specific acceptability.",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/37476/echovirus-antibodies-csf?cc=MASTER&p=r",
    "searchAliases": [
      "echovirus CSF",
      "ECHO antibodies spinal fluid",
      "echovirus meningitis antibodies"
    ],
    "clinicalCategories": [
      "infectious",
      "neurology",
      "virology"
    ]
  },
  {
    "id": "quest-source-verified-remaining-20261117-37612",
    "status": "active",
    "alternativeContainer": "",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperatureRaw": "Room Temperature",
    "testCode": "37612",
    "testName": "Varicella-Zoster Virus Antibody, ACIF, CSF",
    "specimenType": "CSF",
    "drawContainer": "Sterile cup",
    "transportContainer": "Sterile cup",
    "preferredVolume": "1 mL CSF",
    "minimumVolume": "0.1 mL CSF",
    "transportTemperature": "Room Temperature",
    "spin": "No",
    "stability": "Room: 7 days; refrigerated: 14 days; frozen: 30 days",
    "specialLabeling": "Label CSF · ORIGINAL STERILE CONTAINER",
    "specialInstructions": "Only qualified procedural clinician collects CSF in a sterile leakproof original Sterile cup. Submit the SAME ORIGINAL securely capped cup at ROOM TEMPERATURE. Do not spin, add media, make slides or force transfer. Confirm local Quest ordering code and service area. This is VZV ACIF antibody, NOT VZV PCR.",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/37612/varicella-zoster-virus-antibody-acif-csf?cc=MASTER",
    "searchAliases": [
      "VZV CSF ACIF",
      "varicella zoster CSF antibody",
      "shingles CSF antibody"
    ],
    "clinicalCategories": [
      "infectious",
      "neurology",
      "virology"
    ]
  },
  {
    "id": "quest-source-verified-remaining-20261117-94263",
    "status": "active",
    "alternativeContainer": "",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperatureRaw": "Frozen",
    "testCode": "94263",
    "testName": "C-Peptide, 24-Hour Urine",
    "specimenType": "Urine",
    "drawContainer": "24-Hour Urine Container",
    "transportContainer": "Transport Tube",
    "preferredVolume": "2 mL aliquot from well-mixed 24-hour urine",
    "minimumVolume": "0.5 mL urine aliquot",
    "transportTemperature": "Frozen",
    "spin": "No",
    "stability": "Room: 2 hours; refrigerated: 24 hours; frozen: 30 days",
    "specialLabeling": "Label 24-HOUR URINE · ALIQUOT · TRANSPORT TUBE",
    "specialInstructions": "Collect a full 24-HOUR urine specimen without added chemical preservative; keep the collection jug REFRIGERATED throughout collection. After completion, thoroughly mix and record TOTAL 24-hour volume and duration on the requisition and aliquot label. Transfer 2 mL (minimum 0.5 mL) into a clean sterile plastic Transport Tube (ARUP standard transport tube or equivalent approved by Quest), cap tightly and FREEZE; ship FROZEN in a separate bag. Do NOT submit the 24-hour jug or gray urine culture preservative tube in lieu of the specified aliquot. Quest notes that Nichols San Juan Capistrano does not offer this code; verify receiving account.",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/94263/c-peptide-24-hour-urine?cc=MASTER",
    "searchAliases": [
      "urinary C peptide 24 hour",
      "C peptide urine",
      "24hr urine C peptide"
    ],
    "clinicalCategories": [
      "endocrinology",
      "metabolic",
      "urinary"
    ]
  }
];
for(const incoming of additions){const old=window.SEED_TESTS.find(x=>String(x.testCode||'').trim()===incoming.testCode);if(!old){window.SEED_TESTS.push(incoming);continue;}if(old.status==='reference'||old.status==='pending')Object.assign(old,incoming,{id:old.id||incoming.id});}
})();
