/* Quest remaining 86 audit after 92203 through 95512, 2026-11-17.
 * Ten source-verified routes; excluded slide/IHC/pathology, special restricted tubes,
 * Aptima green-label cytology, donor-only services, and other unverified methods.
 * Do not overwrite existing active or clinic-blocked test entries.
 */
(()=>{'use strict';if(!Array.isArray(window.SEED_TESTS))return;
const additions=[
  {
    "id": "quest-verified-audit-after92203-20261117-93023",
    "testCode": "93023",
    "testName": "ELANE Genetic Analysis (Patient/Parental Blood Route)",
    "status": "active",
    "specimenType": "Whole Blood",
    "drawContainer": "Lavender EDTA",
    "alternativeContainer": "",
    "transportContainer": "Lavender EDTA",
    "preferredVolume": "3-5 mL EDTA whole blood",
    "minimumVolume": "2 mL EDTA whole blood",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "stability": "Use receiving Quest/Versiti laboratory time limits; no freezing supported in verified instructions",
    "specialLabeling": "Label WHOLE BLOOD · LAVENDER EDTA",
    "specialInstructions": "PATIENT/PARENT whole blood route only. Collect 3-5 mL EDTA whole blood in one ORIGINAL Lavender EDTA tube, gently invert, submit UNSPUN and UNTRANSFERRED at room temperature. Do not substitute fetal fluid/CVS route. Requisition MUST specify one assay choice: NGS sequencing only, deletion/duplication aCGH only, NGS with reflex aCGH, or NGS with concurrent aCGH. This code is not offered at Nichols SJC; verify Quest service area, Versiti routing and requisition selection before collecting.",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/93023/elane-genetic-analysis?cc=MASTER",
    "searchAliases": [
      "ELANE mutation",
      "ELA2 neutropenia",
      "congenital neutropenia genetic",
      "cyclic neutropenia ELANE"
    ],
    "clinicalCategories": [
      "genetics",
      "hematology"
    ]
  },
  {
    "id": "quest-verified-audit-after92203-20261117-94088",
    "testCode": "94088",
    "testName": "Perfluorooctanoic Acid (PFOA), Blood",
    "status": "active",
    "specimenType": "Whole Blood",
    "drawContainer": "Lavender EDTA",
    "alternativeContainer": "",
    "transportContainer": "Lavender EDTA",
    "preferredVolume": "1 mL EDTA whole blood",
    "minimumVolume": "0.22 mL EDTA whole blood",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "stability": "Room 15 days; refrigerated 15 days; frozen 11 months",
    "specialLabeling": "Label WHOLE BLOOD · LAVENDER EDTA",
    "specialInstructions": "Collect peripheral EDTA WHOLE BLOOD in the ORIGINAL Lavender EDTA tube and submit unspun at ROOM TEMPERATURE. Do not centrifuge, transfer or use separator gel. Avoid PTFE/Teflon- or PVDF-coated collection devices or potential PFAS contamination. Verify patient-region availability: Quest Nichols San Juan Capistrano does not offer this test.",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/94088/perfluorooctanoic-acid-blood?cc=MASTER",
    "searchAliases": [
      "PFOA exposure",
      "perfluorooctanoic acid blood",
      "PFAS forever chemicals",
      "FC-143 PFOA"
    ],
    "clinicalCategories": [
      "toxicology",
      "heavy-metals"
    ]
  },
  {
    "id": "quest-verified-audit-after92203-20261117-94531",
    "testCode": "94531",
    "testName": "Voltage-Gated Potassium Channel (VGKC) Antibody, CSF",
    "status": "active",
    "specimenType": "CSF",
    "drawContainer": "Transport Tube",
    "alternativeContainer": "",
    "transportContainer": "Transport Tube",
    "preferredVolume": "1 mL CSF",
    "minimumVolume": "0.5 mL CSF",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "stability": "Room 48 hours; refrigerated 14 days; frozen 28 days",
    "specialLabeling": "Label CSF · original transport tube",
    "specialInstructions": "Qualified procedural clinician collects CSF into a sterile additive-free leakproof plastic screw-cap Transport Tube. Submit the ORIGINAL tube REFRIGERATED with cold packs; no aliquoting, centrifugation, slides or media. When other CSF orders are present, confirm adequate specimen volume before splitting. Check receiving Quest service area; not offered at Nichols SJC.",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/94531/voltage-gated-potassium-channel-vgkc-antibody-csf?cc=MASTER",
    "searchAliases": [
      "VGKC CSF antibody",
      "voltage gated K channel CSF",
      "limbic encephalitis CSF",
      "neuromyotonia CSF"
    ],
    "clinicalCategories": [
      "neurology",
      "autoimmune",
      "immunology"
    ]
  },
  {
    "id": "quest-verified-audit-after92203-20261117-94577",
    "testCode": "94577",
    "testName": "Mycobacterium tuberculosis Complex and Rifampin Resistance, PCR, Sputum",
    "status": "active",
    "specimenType": "Sputum",
    "drawContainer": "Sterile cup",
    "alternativeContainer": "",
    "transportContainer": "Sterile cup",
    "preferredVolume": "5 mL sputum",
    "minimumVolume": "2 mL sputum",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "stability": "Room unacceptable; refrigerated 5 days; frozen unacceptable",
    "specialLabeling": "Label SPUTUM · expectorated (original cup)",
    "specialInstructions": "Collect only clinician-authorized spontaneously EXPECTORATED lower respiratory sputum following clinic airborne-precaution protocols. Patient gargles with water and coughs deeply into ORIGINAL clean leakproof Sterile cup, without preservatives, formalin or alcohol. Do not perform induced sputum or aerosol-generating collection onsite unless facility is specifically equipped and approved. Immediately REFRIGERATE with cold packs, no room-temperature storage or freezing. NO pre-processing, slide, pooled 24-hour sputum or visibly food-contaminated sample. If suspected infectious TB, follow isolation/referral policy before attempting collection. Verify Quest regional/account acceptance.",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/94577/mycobacterium-tuberculosis-complex-and-rifampin-resistance-pcr-sputum?cc=MASTER",
    "searchAliases": [
      "TB sputum PCR",
      "Xpert MTB RIF sputum",
      "MTB rifampin resistance",
      "Mycobacterium tuberculosis PCR sputum"
    ],
    "clinicalCategories": [
      "infectious",
      "respiratory",
      "microbiology"
    ]
  },
  {
    "id": "quest-verified-audit-after92203-20261117-94578",
    "testCode": "94578",
    "testName": "Mycobacterium tuberculosis Complex, Rifampin Resistance, Culture/PCR, Sputum",
    "status": "active",
    "specimenType": "Sputum",
    "drawContainer": "Sterile cup",
    "alternativeContainer": "",
    "transportContainer": "Sterile cup",
    "preferredVolume": "10 mL sputum",
    "minimumVolume": "2 mL sputum",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "stability": "Room unacceptable; refrigerated 5 days; frozen unacceptable",
    "specialLabeling": "Label SPUTUM · expectorated (original cup)",
    "specialInstructions": "Collect only clinician-authorized, spontaneously EXPECTORATED lower respiratory sputum in ORIGINAL sterile leakproof Sterile cup following facility airborne-precaution and TB isolation policies; gargle water first, then deep cough. Never induce sputum onsite without an approved facility/procedure. Submit REFRIGERATED with cold packs; room temperature and freezing unacceptable. Do not preconcentrate, prepare clinic slides or smears, add preservatives or pool 24-hour specimens. All mycobacterial culture, smear and PCR testing occurs at Quest. If PCR-only 94577 also ordered, confirm whether a shared original cup is permitted rather than assuming it can be pooled. Confirm service area.",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/94578/mycobacterium-tuberculosis-complex-rifampin-resistance-culturepcrsputum?cc=MASTER",
    "searchAliases": [
      "TB sputum culture PCR",
      "MTB culture rifampin resistance",
      "Xpert MTB RIF culture and smear",
      "AFB culture PCR sputum"
    ],
    "clinicalCategories": [
      "infectious",
      "respiratory",
      "microbiology"
    ]
  },
  {
    "id": "quest-verified-audit-after92203-20261117-94603",
    "testCode": "94603",
    "testName": "Paraneoplastic Autoantibody Evaluation with Recombx, CSF",
    "status": "active",
    "specimenType": "CSF",
    "drawContainer": "Sterile cup",
    "alternativeContainer": "",
    "transportContainer": "Sterile cup",
    "preferredVolume": "2 mL CSF",
    "minimumVolume": "0.5 mL CSF",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "stability": "Room 72 hours; refrigerated 28 days; frozen 28 days",
    "specialLabeling": "Label CSF · original sterile cup",
    "specialInstructions": "Qualified procedural clinician collects CSF directly into ORIGINAL additive-free sterile leakproof screw-cap Sterile cup. Label with TWO patient identifiers matching requisition; label specimen source CSF. Submit REFRIGERATED with cold packs; no transfer, spin, preparation of slides or preservative. Distinguish laboratory-performed immunofluorescence from onsite slide preparation, which is not required. Verify service area and performing lab; Quest Nichols SJC does not offer this panel.",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/94603/paraneoplastic-autoantibody-evaluation-with-recombx-csf?cc=MASTER",
    "searchAliases": [
      "Recombx paraneoplastic CSF",
      "anti-Hu Yo Ri CSF",
      "Athena paraneoplastic CSF",
      "paraneoplastic neurological CSF"
    ],
    "clinicalCategories": [
      "neurology",
      "autoimmune",
      "oncology"
    ]
  },
  {
    "id": "quest-verified-audit-after92203-20261117-94958",
    "testCode": "94958",
    "testName": "Encephalitis Antibody Evaluation with Reflex to Titer and Line Blot, CSF",
    "status": "active",
    "specimenType": "CSF",
    "drawContainer": "Sterile cup",
    "alternativeContainer": "",
    "transportContainer": "Sterile cup",
    "preferredVolume": "4 mL CSF",
    "minimumVolume": "2 mL CSF",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "stability": "Room 24 hours but RECEIVED ROOM TEMPERATURE rejected; refrigerated 7 days; frozen 21 days",
    "specialLabeling": "Label CSF · original sterile cup",
    "specialInstructions": "Qualified procedural clinician collects 4 mL CSF (minimum 2 mL) directly into a clean, ADDITIVE-FREE leakproof Sterile cup. Submit ORIGINAL container REFRIGERATED with cold packs. Do not spin, transfer, freeze by default, prepare clinic slides or substitute serum. All IFA, reflex line blot and titers are performed by receiving laboratory. Quest rejects specimens received at room temperature, despite listed 24-hour room stability. Confirm receiving Quest service area; Nichols SJC does not offer.",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/94958/encephalitis-antibody-evaluation-with-reflex-to-titer-and-line-blot-csf?cc=MASTER",
    "searchAliases": [
      "autoimmune encephalitis CSF",
      "NMDA receptor CSF panel",
      "encephalitis neuronal antibody",
      "anti-neuronal CSF reflex panel"
    ],
    "clinicalCategories": [
      "neurology",
      "autoimmune",
      "immunology"
    ]
  },
  {
    "id": "quest-verified-audit-after92203-20261117-94959",
    "testCode": "94959",
    "testName": "Epilepsy Antibody Evaluation with Reflex to Titer and Line Blot, CSF",
    "status": "active",
    "specimenType": "CSF",
    "drawContainer": "Sterile cup",
    "alternativeContainer": "",
    "transportContainer": "Sterile cup",
    "preferredVolume": "4 mL CSF",
    "minimumVolume": "2 mL CSF",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "stability": "Room 24 hours but RECEIVED ROOM TEMPERATURE rejected; refrigerated 7 days; frozen 21 days",
    "specialLabeling": "Label CSF · original sterile cup",
    "specialInstructions": "Qualified procedural clinician collects 4 mL CSF (minimum 2 mL) directly into ORIGINAL clean additive-free leakproof Sterile cup. REFRIGERATE immediately and send with cold packs; room-temperature receipt rejected. Do not transfer, spin, prepare slides, or replace with serum. IFA and reflex immunologic testing are performed by Quest, not clinic. Verify Quest service-area acceptance; Nichols SJC not offered.",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/94959/epilepsy-antibody-evaluation-with-reflex-to-titer-and-line-blot-csf?cc=MASTER",
    "searchAliases": [
      "autoimmune epilepsy CSF",
      "epilepsy neuronal antibody CSF",
      "GABA B NMDA CSF panel",
      "seizure autoimmune CSF panel"
    ],
    "clinicalCategories": [
      "neurology",
      "autoimmune",
      "immunology"
    ]
  },
  {
    "id": "quest-verified-audit-after92203-20261117-94960",
    "testCode": "94960",
    "testName": "Paraneoplastic Antibody Expanded Evaluation with Reflex to Titer and Line Blot, CSF",
    "status": "active",
    "specimenType": "CSF",
    "drawContainer": "Sterile cup",
    "alternativeContainer": "",
    "transportContainer": "Sterile cup",
    "preferredVolume": "4 mL CSF",
    "minimumVolume": "2 mL CSF",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "stability": "Room 24 hours but RECEIVED ROOM TEMPERATURE rejected; refrigerated 7 days; frozen 21 days",
    "specialLabeling": "Label CSF · original sterile cup",
    "specialInstructions": "Qualified procedural clinician collects 4 mL CSF (minimum 2 mL) directly into ORIGINAL leakproof additive-free Sterile cup; submit REFRIGERATED with cold packs. Do not transfer or spin, freeze by default or create slides. Quest performs tissue IFA and any reflex line-blot or titer testing at the receiving lab. ROOM-TEMPERATURE receipt is rejected despite listed room stability. Do not substitute other body fluid. Confirm service area; Nichols SJC not offered.",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/94960/paraneoplastic-antibody-expanded-evaluation-with-reflex-to-titer-and-lb-csf?cc=MASTER",
    "searchAliases": [
      "expanded paraneoplastic CSF",
      "anti Hu Yo Ri expanded CSF",
      "PNS expanded CSF antibodies",
      "autoimmune neuro CSF panel"
    ],
    "clinicalCategories": [
      "neurology",
      "autoimmune",
      "oncology"
    ]
  },
  {
    "id": "quest-verified-audit-after92203-20261117-95512",
    "testCode": "95512",
    "testName": "Respiratory Viral Panel, PCR",
    "status": "active",
    "specimenType": "Nasopharyngeal Swab",
    "drawContainer": "Viral transport medium (VCM)",
    "alternativeContainer": "",
    "transportContainer": "Viral transport medium (VCM)",
    "preferredVolume": "1 nasopharyngeal nylon swab in 3 mL VCM / UTM",
    "minimumVolume": "1 swab in 0.5 mL viral transport medium",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "stability": "Room 8 hours; refrigerated 72 hours; frozen -70°C 30 days; -20°C not established",
    "specialLabeling": "Label NASOPHARYNGEAL SWAB · source",
    "specialInstructions": "Qualified clinic clinical staff collect ONE nylon flocked nasopharyngeal swab and place directly in the ORIGINAL VCM, M4, M4RT or approved equivalent UTM tube. SUBMIT original tightly capped viral transport tube REFRIGERATED with cold packs. No slide, transfer, dry swab, standard bacterial ESwab or throat/anterior nasal source; this code accepts NP only. Quest PSCs and in-office phlebotomists do not collect respiratory specimens, so collection must follow clinic infection-control policy. Do not freeze at -20°C. Verify Quest service-area acceptance.",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/95512/respiratory-viral-panel-pcr?cc=MASTER",
    "searchAliases": [
      "respiratory viral panel",
      "RVP PCR",
      "LIAISON PLEX respiratory flex",
      "adenovirus influenza RSV rhinovirus PCR"
    ],
    "clinicalCategories": [
      "infectious",
      "respiratory",
      "microbiology"
    ]
  }
];
for(const incoming of additions){const old=window.SEED_TESTS.find(x=>String(x.testCode||'').trim()===incoming.testCode);if(!old){window.SEED_TESTS.push(incoming);continue;}if(old.status==='reference'||old.status==='pending')Object.assign(old,incoming,{id:old.id||incoming.id});}
})();
