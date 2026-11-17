/* Quest first-20 directory-only audit verification, 2026-11-16.
 * Only 6 candidates meet documented sendout requirements without unsupported slide, acid-preserved, specialty kit, or warm-processing workflows.
 * Preserve blocked entries and all already-active records.
 */
(()=>{'use strict';
if(!Array.isArray(window.SEED_TESTS))return;
const additions=[
  {
    "id": "quest-verified-audit-first20-20261116-208",
    "status": "active",
    "testCode": "208",
    "testName": "Prostatic Acid Phosphatase (PAP)",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "alternativeContainer": "",
    "transportContainer": "Transport Tube",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "0.5 mL serum",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "spin": "Yes",
    "stability": "Room 24 hours; refrigerated 24 hours; frozen 28 days",
    "specialLabeling": "Label SERUM and collection date/time",
    "specialInstructions": "Collect prior to prostate examination, biopsy, prostatectomy or prostatic massage when feasible. Allow SST / Gold (or SST / Tiger) to clot, centrifuge and transfer separated serum to a labeled plastic Transport Tube. Freeze promptly and ship frozen; do not ship whole blood. Grossly hemolyzed specimens are unacceptable. Confirm receiving Quest account and service-area acceptance before collection.",
    "source": "Quest performing-lab collection guide, checked 2026-11-16 • https://willisknighton.testcatalog.org/show/PROSTATICACIDPH-208--1",
    "clinicalCategories": [
      "oncology"
    ],
    "searchAliases": [
      "PAP",
      "prostatic acid phosphatase"
    ]
  },
  {
    "id": "quest-verified-audit-first20-20261116-219",
    "status": "active",
    "testCode": "219",
    "testName": "Delta Aminolevulinic Acid, 24-Hour Urine",
    "specimenType": "24-Hour Urine",
    "drawContainer": "24-Hour Urine Container (no preservative)",
    "alternativeContainer": "",
    "transportContainer": "Amber Light-Protected Tube",
    "preferredVolume": "2 mL unpreserved 24-hour urine",
    "minimumVolume": "2 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "stability": "Refrigerate or freeze aliquot, protect from light; verify receiving-lab handling",
    "specialLabeling": "Label URINE, 24-hour total volume, and start/end date/time",
    "specialInstructions": "Collect entire 24-hour urine WITHOUT acid or other preservative. Refrigerate throughout the collection. Protect the collecting vessel from light with foil. Mix thoroughly and record total 24-hour volume, collection start/end date and time. Transfer a 2 mL aliquot to an amber light-protected screw-cap vial; keep refrigerated and protected from light. Do not pool with acid-preserved urine. Verify the local receiving Quest laboratory accepts the container and refrigerated transport. Confirm receiving Quest account and service-area acceptance before collection.",
    "source": "Quest performing-lab collection instructions and Hoag reference laboratory manual, checked 2026-11-16 • https://hie.hoag.org/docs/HIE-Hoag-LabManual.pdf",
    "clinicalCategories": [
      "urinary",
      "toxicology"
    ],
    "searchAliases": [
      "ALA 24 hour urine",
      "delta ALA",
      "aminolevulinic acid"
    ]
  },
  {
    "id": "quest-verified-audit-first20-20261116-224",
    "status": "active",
    "testCode": "224",
    "testName": "Albumin, CSF",
    "specimenType": "CSF",
    "drawContainer": "Sterile cup",
    "alternativeContainer": "",
    "transportContainer": "Sterile cup",
    "preferredVolume": "1 mL CSF",
    "minimumVolume": "0.5 mL CSF",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "stability": "Room 5 days; refrigerated 14 days; frozen 42 days; verify local Quest service area",
    "specialLabeling": "Label specimen source and collection date/time",
    "specialInstructions": "Provider-collected CSF only. Submit clear CSF in an individually labeled sterile leakproof plastic screw-cap Sterile cup, without additives; no centrifugation or transfer. Label CSF and collection date/time. Avoid gross blood contamination; hemolysis/xanthochromia may cause rejection. Keep refrigerated for sendout; do not combine with specimens of different sources. Confirm receiving Quest account and service-area acceptance before collection.",
    "source": "Quest Diagnostics referenced specimen guide, checked 2026-11-16 • https://www.casandra.ai/catalog/lab/quest-diagnostics/test/albumin-csf",
    "clinicalCategories": [
      "neurology"
    ],
    "searchAliases": [
      "CSF albumin",
      "cerebrospinal fluid albumin"
    ]
  },
  {
    "id": "quest-verified-audit-first20-20261116-318",
    "status": "active",
    "testCode": "318",
    "testName": "Catecholamines, Fractionated, 24-Hour Urine without Creatinine",
    "specimenType": "24-Hour Urine",
    "drawContainer": "24-Hour Urine Container (no preservative)",
    "alternativeContainer": "",
    "transportContainer": "Sterile cup",
    "preferredVolume": "1 mL of well-mixed 24-hour urine",
    "minimumVolume": "0.7 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "spin": "No",
    "stability": "Unpreserved urine must remain frozen for shipping; pH ≤6 is required",
    "specialLabeling": "Label URINE, 24-hour total volume, patient age and start/end time",
    "specialInstructions": "USE ONLY the Quest-listed UNPRESERVED alternative. Collect entire 24-hour urine without 6N HCl or other acid, refrigerating during collection. Verify unpreserved urine pH is 6 or below; if pH cannot be confirmed, do not collect onsite. Mix, record 24-hour volume and patient age, and submit a separate frozen, leakproof plastic Sterile cup aliquot on dry ice. Ship FROZEN and never ship unpreserved urine refrigerated. Patient should avoid tobacco, tea, coffee and strenuous exercise for 8–12 hours before collection. Medication withholding requires prescriber direction. Quest reports this order code is not offered in San Juan Capistrano; check local availability. Confirm receiving Quest account and service-area acceptance before collection.",
    "source": "Quest official directory, checked 2026-11-16 • https://testdirectory.questdiagnostics.com/test/test-detail/318/catecholamines-fractionated-24-hour-urine-without-creatinine?cc=MASTER",
    "clinicalCategories": [
      "endocrinology",
      "urinary"
    ],
    "searchAliases": [
      "24hr urine catecholamines",
      "urinary catecholamines",
      "epinephrine norepinephrine dopamine"
    ]
  },
  {
    "id": "quest-verified-audit-first20-20261116-368",
    "status": "active",
    "testCode": "368",
    "testName": "Chloride, 24-Hour Urine with Creatinine",
    "specimenType": "24-Hour Urine",
    "drawContainer": "24-Hour Urine Container (no preservative)",
    "alternativeContainer": "",
    "transportContainer": "Sterile cup",
    "preferredVolume": "10 mL well-mixed 24-hour urine aliquot",
    "minimumVolume": "Confirm Quest minimum",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "stability": "Room 7 days; refrigerated 7 days; frozen 28 days",
    "specialLabeling": "Label URINE, 24-hour total volume and collection start/end time",
    "specialInstructions": "Collect an entire 24-hour urine specimen in a plain no-preservative collection container. Mix thoroughly after completion and submit a 10 mL aliquot in a leakproof Sterile cup. Record total 24-hour urine volume and start/end collection times on specimen and requisition. Do not add HCl or other urine preservative. Do not pool with acid-preserved urine tests. Verify minimum volume and receiving service-area code. Confirm receiving Quest account and service-area acceptance before collection.",
    "source": "Quest-associated collection directory, checked 2026-11-16 • https://us.fullscript.com/labs/quest/chloride-24-hour-urine-with-creatinine",
    "clinicalCategories": [
      "renal",
      "urinary"
    ],
    "searchAliases": [
      "24hr urine chloride",
      "urine chloride creatinine"
    ]
  },
  {
    "id": "quest-verified-audit-first20-20261116-394",
    "status": "active",
    "testCode": "394",
    "testName": "Culture, Throat",
    "specimenType": "Throat Swab",
    "drawContainer": "ESwab (Amies)",
    "alternativeContainer": "",
    "transportContainer": "ESwab (Amies)",
    "preferredVolume": "One throat swab",
    "minimumVolume": "One swab",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "stability": "Amies transport swab at room temperature 48 hours",
    "specialLabeling": "Label THROAT and collection date/time",
    "specialInstructions": "Swab tonsillar areas and posterior pharynx using a white-cap ESwab / Amies liquid transport device, then insert the SAME swab into its original transport medium and close securely. NO specimen transfer and no additional swab unless another test needs one. Label THROAT and collection date/time. Keep at room temperature; do not refrigerate, freeze, send dry swabs or use viral transport medium. Confirm local availability; this code is not offered by all Quest service areas. Confirm receiving Quest account and service-area acceptance before collection.",
    "source": "Quest official test directory, checked 2026-11-16 • https://testdirectory.questdiagnostics.com/test/test-detail/394/culture-throat?cc=MASTER",
    "clinicalCategories": [
      "microbiology",
      "infectious"
    ],
    "searchAliases": [
      "throat culture",
      "routine throat culture",
      "pharyngeal culture"
    ]
  }
];
for(const item of additions){
 const existing=window.SEED_TESTS.find(t=>String(t.testCode||'').trim()===item.testCode);
 if(!existing){window.SEED_TESTS.push(item);continue;}
 if(existing.status==='reference'||existing.status==='pending')Object.assign(existing,item,{id:existing.id||item.id});
}
})();
