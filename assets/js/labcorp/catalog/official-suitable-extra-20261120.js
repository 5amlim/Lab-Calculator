// Verified additional Labcorp orders with ONE clinic-compatible specimen route each.
// Do not overwrite active or blocked tests. Keep required named swab kits as original submissions.
(() => {
'use strict';
const additions=[
  {
    "id": "labcorp-verified-20261120-extra-008136",
    "testCode": "008136",
    "testName": "Fungus Stain",
    "status": "active",
    "specimenType": "Body Fluid",
    "drawContainer": "Sterile cup",
    "transportContainer": "Sterile cup",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "5–10 mL body fluid",
    "minimumVolume": "1 mL",
    "spin": "No",
    "specialLabeling": "",
    "specialInstructions": "Label specimen BODY FLUID and exact source. Submit provider-collected fluid in its original sterile screw-cap cup at room temperature. This collection path does not use nail, hair, slide, or swab specimens.",
    "source": "https://www.labcorp.com/tests/008136/fungus-stain"
  },
  {
    "id": "labcorp-verified-20261120-extra-008482",
    "testCode": "008482",
    "testName": "Fungus (Mycology) Culture",
    "status": "active",
    "specimenType": "Body Fluid",
    "drawContainer": "Sterile cup",
    "transportContainer": "Sterile cup",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "5–10 mL body fluid",
    "minimumVolume": "1 mL",
    "spin": "No",
    "specialLabeling": "",
    "specialInstructions": "Label specimen BODY FLUID and exact source. Submit provider-collected fluid in the original sterile screw-cap cup at room temperature. Refrigeration requirements differ for nonsterile respiratory samples; those routes are not configured.",
    "source": "https://www.labcorp.com/tests/008482/fungus-mycology-culture"
  },
  {
    "id": "labcorp-verified-20261120-extra-188243",
    "testCode": "188243",
    "testName": "Fungus Culture With Stain",
    "status": "active",
    "specimenType": "Body Fluid",
    "drawContainer": "Sterile cup",
    "transportContainer": "Sterile cup",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "5–10 mL body fluid",
    "minimumVolume": "1 mL",
    "spin": "No",
    "specialLabeling": "",
    "specialInstructions": "Label specimen BODY FLUID and exact source. Submit provider-collected fluid in the original sterile screw-cap cup at room temperature. This route does not cover respiratory specimens, hair, nails, or separate swab sets.",
    "source": "https://www.labcorp.com/tests/188243/fungus-culture-with-stain"
  },
  {
    "id": "labcorp-verified-20261120-extra-086884",
    "testCode": "086884",
    "testName": "Ureaplasma/Mycoplasma hominis Culture",
    "status": "active",
    "specimenType": "Urine",
    "drawContainer": "Sterile cup",
    "transportContainer": "Sterile cup",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "Entire urine specimen",
    "minimumVolume": "",
    "spin": "No",
    "specialLabeling": "",
    "specialInstructions": "Urine collection route only. Collect urine into a sterile leakproof screw-cap cup, refrigerate and ship at 2–8°C. Submit one specimen per test and specify URINE on the requisition. No special swab transport is needed for this urine route.",
    "source": "https://www.labcorp.com/tests/086884/ureaplasma-mycoplasma-hominis-culture"
  },
  {
    "id": "labcorp-verified-20261120-extra-140046",
    "testCode": "140046",
    "testName": "Influenza A and Influenza B With Reflex to H5 Subtyping, NAA",
    "status": "active",
    "specimenType": "Nasopharyngeal Swab",
    "drawContainer": "Universal Transport Medium (UTM) Swab",
    "transportContainer": "Universal Transport Medium (UTM) Swab",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "preferredVolume": "1 nasopharyngeal swab",
    "minimumVolume": "1 swab",
    "spin": "No",
    "specialLabeling": "",
    "specialInstructions": "Collect a nasopharyngeal swab, not an anterior nasal swab. Immediately place in up to 3 mL UTM or VTM, cap and freeze. Submit in original viral transport device without transferring. Confirm frozen transport pickup.",
    "source": "https://www.labcorp.com/tests/140046/influenza-a-and-influenza-b-with-reflex-to-h5-subtyping-naa"
  },
  {
    "id": "labcorp-verified-20261120-extra-140111",
    "testCode": "140111",
    "testName": "Influenza A/H5 Subtyping, NAA",
    "status": "active",
    "specimenType": "Nasopharyngeal Swab",
    "drawContainer": "Universal Transport Medium (UTM) Swab",
    "transportContainer": "Universal Transport Medium (UTM) Swab",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "preferredVolume": "1 nasopharyngeal swab",
    "minimumVolume": "1 swab",
    "spin": "No",
    "specialLabeling": "",
    "specialInstructions": "Collect a nasopharyngeal swab, not an anterior nasal swab. Immediately place in 3 mL UTM or VTM, cap and freeze. Submit the original transport device. Labcorp states this test is NOT APPROVED for New York state.",
    "source": "https://www.labcorp.com/tests/140111/influenza-a-h5-subtyping-naa"
  },
  {
    "id": "labcorp-verified-20261120-extra-085506",
    "testCode": "085506",
    "testName": "Legionella pneumophila, DFA",
    "status": "active",
    "specimenType": "Lung Exudate",
    "drawContainer": "Sterile cup",
    "transportContainer": "Sterile cup",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "1 mL lung exudate",
    "minimumVolume": "",
    "spin": "No",
    "specialLabeling": "",
    "specialInstructions": "Provider-collected lung exudate only. Label LUNG EXUDATE, submit in sterile leakproof screw-cap cup at 2–8°C and ensure arrival within 24 hours of collection. Do not use swabs, prepared slides or environmental water.",
    "source": "https://www.labcorp.com/tests/085506/legionella-pneumophila-dfa"
  },
  {
    "id": "labcorp-verified-20261120-extra-086868",
    "testCode": "086868",
    "testName": "Legionella species Culture",
    "status": "active",
    "specimenType": "Lung Exudate",
    "drawContainer": "Sterile cup",
    "transportContainer": "Sterile cup",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "1 mL lung exudate",
    "minimumVolume": "",
    "spin": "No",
    "specialLabeling": "",
    "specialInstructions": "Provider-collected lung exudate only. Label LUNG EXUDATE, submit in sterile leakproof screw-cap cup at 2–8°C and ensure arrival within 24 hours of collection. Do not use swabs or environmental water.",
    "source": "https://www.labcorp.com/tests/086868/legionella-species-culture"
  },
  {
    "id": "labcorp-verified-20261120-extra-180026",
    "testCode": "180026",
    "testName": "Vaginitis/Vaginosis, DNA Probe",
    "status": "active",
    "specimenType": "Vaginal Swab",
    "drawContainer": "Affirm VPIII ATTS Swab",
    "transportContainer": "Affirm VPIII ATTS Swab",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "1 vaginal swab in Affirm ATTS",
    "minimumVolume": "",
    "spin": "No",
    "specialLabeling": "",
    "specialInstructions": "Use only the Affirm VPIII Ambient Temperature Transport System (ATTS) kit. Collect from the posterior vaginal fornix using its supplied swab; activate the reagent ampule and follow the ATTS processing steps. Submit in the original transport tube within 72 hours at room temperature. Do not substitute a generic Aptima or VTM swab.",
    "source": "https://www.labcorp.com/tests/180026/vaginitis-vaginosis-dna-probe"
  },
  {
    "id": "labcorp-verified-20261120-extra-186015",
    "testCode": "186015",
    "testName": "Viral Culture, Rapid, Respiratory",
    "status": "active",
    "specimenType": "Nasopharyngeal Swab",
    "drawContainer": "Universal Transport Medium (UTM) Swab",
    "transportContainer": "Universal Transport Medium (UTM) Swab",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "1 nasopharyngeal swab",
    "minimumVolume": "",
    "spin": "No",
    "specialLabeling": "",
    "specialInstructions": "Collect a nasopharyngeal swab during acute illness. Immediately place the swab into appropriate viral transport medium, keep cold and moist, and ship promptly. Submit the original transport device. Do not use an aerobic bacterial swab.",
    "source": "https://www.labcorp.com/tests/186015/viral-culture-rapid-respiratory"
  },
  {
    "id": "labcorp-verified-20261120-extra-186031",
    "testCode": "186031",
    "testName": "Virus Culture, Rapid, Varicella Zoster Virus (VZV)",
    "status": "active",
    "specimenType": "Lesion Swab",
    "drawContainer": "Universal Transport Medium (UTM) Swab",
    "transportContainer": "Universal Transport Medium (UTM) Swab",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "1 lesion swab",
    "minimumVolume": "",
    "spin": "No",
    "specialLabeling": "",
    "specialInstructions": "Do not prepare vesicle site with alcohol or iodophors. Collect from the bases of freshly unroofed lesions with a sterile synthetic swab, place immediately in cold viral transport medium, and send promptly. Submit the original VTM device. Label LESION / VESICULAR SOURCE; do not prepare slides.",
    "source": "https://www.labcorp.com/tests/186031/virus-culture-rapid-varicella-zoster-virus-vzv"
  }
];
const byCode=new Map((window.SEED_TESTS||[]).map(x=>[String(x.testCode||'').trim(),x]));
for(const row of additions){const prior=byCode.get(row.testCode);
if(prior && !['pending','reference'].includes(prior.status)) continue;
if(prior) Object.assign(prior,row,{id:prior.id||row.id});else {window.SEED_TESTS.push(row);byCode.set(row.testCode,row);}}
const old=window.LabDirectoryTat||{};
window.LabDirectoryTat=Object.freeze({...old,directory:Object.freeze({...{
  "140046": [
    "2–4 days",
    4,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/140046/influenza-a-and-influenza-b-with-reflex-to-h5-subtyping-naa"
  ],
  "140111": [
    "2–4 days",
    4,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/140111/influenza-a-h5-subtyping-naa"
  ],
  "180026": [
    "1–3 days",
    3,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/180026/vaginitis-vaginosis-dna-probe"
  ],
  "186015": [
    "4–5 days",
    5,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/186015/viral-culture-rapid-respiratory"
  ],
  "186031": [
    "5–6 days",
    6,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/186031/virus-culture-rapid-varicella-zoster-virus-vzv"
  ],
  "188243": [
    "30–42 days",
    42,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/188243/fungus-culture-with-stain"
  ],
  "008136": [
    "1–4 days",
    4,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/008136/fungus-stain"
  ],
  "008482": [
    "30–42 days",
    42,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/008482/fungus-mycology-culture"
  ],
  "086884": [
    "6–10 days",
    10,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/086884/ureaplasma-mycoplasma-hominis-culture"
  ],
  "085506": [
    "2–5 days",
    5,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/085506/legionella-pneumophila-dfa"
  ],
  "086868": [
    "7–16 days",
    16,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/086868/legionella-species-culture"
  ]
},...(old.directory||{})})});
})();
