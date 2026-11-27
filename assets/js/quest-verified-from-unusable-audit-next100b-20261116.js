/* Quest audit NEXT 100 after 18011, through 19412, reviewed 2026-11-16.
 * Five verified clinic-compatible collection pathways.
 * All post-transplant-only services remain reference-only until Quest
 * Specialized Transplant Services kits, separate requisition and same-day
 * FedEx logistics are explicitly implemented at the clinic.
 * No onsite slides, FFPE/IHC, specialized saliva/PCDEC processing.
 * Preserve staff edits and blocked records. 
 */
(()=>{'use strict';if(!Array.isArray(window.SEED_TESTS))return;
const additions=[
  {
    "id": "quest-verified-unusable-audit-next100b-20261116-18216",
    "testCode": "18216",
    "testName": "Multiple Sclerosis (MS) Differential Evaluation with Reflexes",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "Red Top",
    "alternativeContainer": "",
    "transportContainer": "Transport Tube",
    "preferredVolume": "11 mL serum total from 9 Red Top (no gel) tubes",
    "minimumVolume": "4.7 mL serum",
    "collectionCount": 9,
    "submissionCount": 3,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "Yes",
    "stability": "Room temperature unacceptable; refrigerated 7 days; frozen 21 days",
    "specialLabeling": "Label SERUM, multiple screw-cap aliquots, collection date/time and two patient identifiers",
    "specialInstructions": "Draw nine plain red-top tubes without gel at one time. Do not use SST or submit plasma or whole blood. Clot for 30–60 minutes, centrifuge each tube for 15 minutes at 1250–1600 RCF, and transfer serum into labeled plastic screw-cap vials. The calculator estimates three shipping vials. The directory does not specify a fixed vial count. Confirm vial capacity and submit the required serum volume. Ship with cold packs. Do not ship at room temperature. Confirm the performing site and account before collection.",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/18216/multiple-sclerosis-ms-differential-evaluation-with-reflexes?cc=MASTER&p=r",
    "searchAliases": [
      "MS differential panel",
      "multiple sclerosis mimics evaluation",
      "MS mimic panel",
      "NMO MOG HTLV Lyme ANA B12 panel"
    ],
    "clinicalCategories": [
      "neurology",
      "autoimmune",
      "immunology"
    ]
  },
  {
    "id": "quest-verified-unusable-audit-next100b-20261116-18835",
    "testCode": "18835",
    "testName": "Pneumocystis jirovecii DNA, Qualitative Real-Time PCR",
    "status": "active",
    "specimenType": "Sputum",
    "drawContainer": "Sterile cup",
    "alternativeContainer": "",
    "transportContainer": "Sterile cup",
    "preferredVolume": "1 mL lower-respiratory sputum",
    "minimumVolume": "0.5 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "stability": "Room 24 hours; refrigerated 7 days; frozen 30 days",
    "specialLabeling": "Label SPUTUM, source lower respiratory tract, exact collection date/time",
    "specialInstructions": "Have the patient provide DEEP-COUGH SPUTUM, not saliva, into one sterile leakproof screw-cap Sterile cup. Quest supports sputum for code 18835 (as well as BAL/bronchial washing via different clinician collection pathways). Submit original closed SPUTUM cup REFRIGERATED (2-8 C), without any swab, fixative, viral media, transfer, centrifugation or clinic-prepared smear. Patients who may need aerosol-generating induction or isolation should not be collected in the ordinary clinical area. Use approved clinical/infection-control workflow. This is QUALITATIVE Pneumocystis DNA PCR, not code 18834 quantitative BAL testing. Verify the patient's Quest service area and receiving account before collecting this specimen.",
    "source": "https://intellitestmanager.questdiagnostics.com/home/output/205952",
    "searchAliases": [
      "PJP PCR qualitative",
      "pneumocystis jirovecii PCR",
      "PCP pneumonia sputum PCR",
      "P jirovecii DNA sputum"
    ],
    "clinicalCategories": [
      "infectious",
      "microbiology",
      "respiratory"
    ]
  },
  {
    "id": "quest-verified-unusable-audit-next100b-20261116-18844",
    "testCode": "18844",
    "testName": "Measles (Rubeola) IgG Antibodies, IFA, CSF",
    "status": "active",
    "specimenType": "CSF",
    "drawContainer": "Sterile cup",
    "alternativeContainer": "",
    "transportContainer": "Sterile cup",
    "preferredVolume": "1 mL CSF",
    "minimumVolume": "0.075 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "stability": "Room 7 days; refrigerated 14 days; frozen 30 days",
    "specialLabeling": "Label CSF, collection date/time and anatomical source; two patient identifiers",
    "specialInstructions": "Qualified clinician obtains CSF aseptically in an ADDITIVE-FREE sterile leakproof screw-cap cup/vial. Submit the ORIGINAL labeled CSF container at ROOM TEMPERATURE, no transfer or serum/blood pooling, no clinic slide preparation. Avoid grossly hemolyzed, lipemic, icteric, turbid or contaminated CSF. Quest performs IFA. QUEST LISTS THIS CODE NOT OFFERED AT NICHOLS SAN JUAN CAPISTRANO, CALIFORNIA. Confirm receiving service area and alternative Quest performing laboratory before collection. This is CSF rubeola IgG IFA, not measles RNA PCR or serum IgG. Verify the patient's Quest service area and receiving account before collecting this specimen.",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/18844/measles-rubeola-igg-antibodies-ifa-csf?cc=MASTER&p=r",
    "searchAliases": [
      "measles IgG CSF",
      "rubeola CSF IFA",
      "SSPE rubeola CSF antibody",
      "measles CNS IgG"
    ],
    "clinicalCategories": [
      "neurology",
      "infectious",
      "immunology"
    ]
  },
  {
    "id": "quest-verified-unusable-audit-next100b-20261116-18901",
    "testCode": "18901",
    "testName": "BK Virus DNA, Quantitative, Real-Time PCR, CSF",
    "status": "active",
    "specimenType": "CSF",
    "drawContainer": "Sterile cup",
    "alternativeContainer": "",
    "transportContainer": "Transport Tube",
    "preferredVolume": "0.7 mL CSF frozen aliquot",
    "minimumVolume": "0.3 mL CSF",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "spin": "No",
    "stability": "Room 48 hours; refrigerated 7 days; frozen 30 days",
    "specialLabeling": "Label CSF, collection date/time and exact source; FROZEN",
    "specialInstructions": "Qualified procedural clinician collects CSF into an additive-free sterile leakproof Sterile cup. Transfer 0.7 mL (minimum 0.3 mL) to a separate dry sterile plastic screw-cap Transport Tube, freeze promptly and ship FROZEN on dry ice. Do not centrifuge or combine with other CSF studies in one frozen aliquot. Label CSF and actual collection time on the transfer vial, plus two patient identifiers. Quantitative BK PCR reports IU/mL per Quest's August 2026 update; do not confuse with qualitative BK CSF code 18889 or BK urine code 16581 requiring cobas medium. Verify the patient's Quest service area and receiving account before collecting this specimen.",
    "source": "https://www.geisingermedicallabs.com/catalog/Details?tid=2194",
    "searchAliases": [
      "BKV CSF quantitative",
      "BK polyomavirus CSF viral load",
      "BK virus qPCR CSF",
      "BK CSF IU mL"
    ],
    "clinicalCategories": [
      "neurology",
      "infectious",
      "molecular"
    ]
  },
  {
    "id": "quest-verified-unusable-audit-next100b-20261116-19118",
    "testCode": "19118",
    "testName": "Creatinine Clearance without Glomerular Filtration Rate, Estimated (eGFR)",
    "status": "active",
    "specimenType": "24-Hour Urine",
    "drawContainer": "24-Hour Urine Container (no preservative)",
    "alternativeContainer": "",
    "transportContainer": "Sterile cup",
    "preferredVolume": "10 mL mixed 24-hour urine aliquot plus 1 mL paired serum",
    "minimumVolume": "0.5 mL urine plus 0.5 mL serum",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "stability": "Serum and urine room 7 days; refrigerated 7 days",
    "specialLabeling": "Label 24-HOUR URINE, TOTAL VOLUME, exact START/END collection date/time",
    "specialInstructions": "Collect entire 24-hour urine in a PLAIN NO-PRESERVATIVE jug, refrigerate source collection; discard first morning void and include next morning matching final void. Measure TOTAL 24-HOUR VOLUME, mix the complete jug, and transfer 10 mL to an unpreserved screw-cap Sterile cup for ROOM-TEMPERATURE submission. A separate SERUM CREATININE specimen must be collected within 24 hours of the beginning OR ending of the urine collection. Record total urine volume and duration on container and requisition, as well as patient's height (feet/inches) and weight (lbs.) for body surface area. Do NOT acidify this local collection pathway, do not pool with spot urine, and do not submit the entire 24-hour jug. Unlike eGFR panels, this code reports calculated creatinine clearance without estimated GFR. Verify the patient's Quest service area and receiving account before collecting this specimen.",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/7943/creatinine-clearance?cc=MASTER&p=r",
    "searchAliases": [
      "creatinine clearance no egfr",
      "CrCl 24 hour urine",
      "24h creatinine clearance",
      "urine creatinine clearance without GFR"
    ],
    "clinicalCategories": [
      "renal",
      "urinary",
      "chemistry"
    ],
    "additionalDrawRequirements": [
      {
        "container": "SST / Gold",
        "count": 1,
        "specimenType": "Serum",
        "purpose": "REQUIRED paired serum creatinine sample",
        "preferredVolume": "1 mL serum",
        "minimumVolume": "0.5 mL",
        "transportContainer": "Transport Tube",
        "transportTemperature": "Room Temperature",
        "transportTemperatureRaw": "Room Temperature",
        "spin": "Yes",
        "specialLabeling": "Label SERUM, collection date/time (within 24 h of 24-hour urine start or end)",
        "specialInstructions": "Required separate blood draw within 24 hours of START or END of complete 24-hour urine collection. Draw SST Gold or Tiger SST, allow clot and centrifuge; transfer at least 0.5 mL serum into a separate Transport Tube. Submit serum ROOM TEMPERATURE. Include urine total volume, duration, height and weight."
      }
    ]
  }
];
for(const entry of additions){
 const old=window.SEED_TESTS.find(x=>String(x.testCode||'').trim()===entry.testCode);
 if(!old){window.SEED_TESTS.push(entry);continue;}
 if(old.status==='reference'||old.status==='pending')Object.assign(old,entry,{id:old.id||entry.id});
}
})();
