// Individually checked supported Labcorp collection routes with published routine TAT.
// Multi-specimen and swab-count constraints remain explicit; blocked records stay blocked.
(() => {
  'use strict';
  const verified = [
  {
    "id": "labcorp-verified-20261120-next-008003",
    "testCode": "008003",
    "testName": "Anaerobic and Aerobic Culture",
    "status": "active",
    "specimenType": "Deep Wound Swab",
    "drawContainer": "ESwab",
    "transportContainer": "ESwab",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "2 swabs",
    "minimumVolume": "",
    "spin": "No",
    "specialLabeling": "",
    "specialInstructions": "Anaerobic and aerobic culture on a deep wound or aspirate swab only. If swabs are used, collect two separately in ESwab transport, one for Gram stain and one for culture. Deep aspirate is preferred. Avoid surface contamination. Keep at room temperature; never refrigerate. Specify site, antibiotics and collection time.",
    "source": "https://www.labcorp.com/tests/008003/anaerobic-and-aerobic-culture",
    "collectionCount": 2,
    "submissionCount": 2
  },
  {
    "id": "labcorp-verified-20261120-next-008900",
    "testCode": "008900",
    "testName": "Anaerobic Culture, Extended Incubation",
    "status": "active",
    "specimenType": "Deep Wound Swab",
    "drawContainer": "ESwab",
    "transportContainer": "ESwab",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "2 swabs",
    "minimumVolume": "",
    "spin": "No",
    "specialLabeling": "",
    "specialInstructions": "Extended incubation anaerobic culture using two ESwabs for a properly prepared deep wound/aspirate site. Aspirates are preferred. Anaerobes are oxygen-sensitive; use anaerobe-compatible ESwab media, avoid surface flora, keep at room temperature and ship promptly. Do not refrigerate.",
    "source": "https://www.labcorp.com/tests/008900/anaerobic-culture-extended-incubation",
    "collectionCount": 2,
    "submissionCount": 2
  },
  {
    "id": "labcorp-verified-20261120-next-008904",
    "testCode": "008904",
    "testName": "Anaerobic Culture",
    "status": "active",
    "specimenType": "Deep Wound Swab",
    "drawContainer": "ESwab",
    "transportContainer": "ESwab",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "2 swabs",
    "minimumVolume": "",
    "spin": "No",
    "specialLabeling": "",
    "specialInstructions": "Anaerobic culture on deep wound/aspirate swabs. Aspirate preferred; if swabs are used collect two separate ESwabs (Gram stain and culture) and label exact site. Keep transport anaerobe-compatible at room temperature; no refrigeration. Avoid superficial wounds and commensal flora contamination.",
    "source": "https://www.labcorp.com/tests/008904/anaerobic-culture",
    "collectionCount": 2,
    "submissionCount": 2
  },
  {
    "id": "labcorp-verified-20261120-next-008185",
    "testCode": "008185",
    "testName": "Parasite Examination, Whole Blood",
    "status": "active",
    "specimenType": "Whole Blood",
    "drawContainer": "Lavender EDTA",
    "transportContainer": "Lavender EDTA (original tube)",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "3–5 mL whole blood",
    "minimumVolume": "",
    "spin": "No",
    "specialLabeling": "",
    "specialInstructions": "Fresh venous whole-blood option only. Draw into lavender EDTA tube, mix gently and submit the original tube at room temperature within 24–48 hours. Do not centrifuge or transfer. This cart path does not require preparing blood smears; confirm receiving-lab smear requirement before shipment.",
    "source": "https://www.labcorp.com/tests/008185/parasite-examination-whole-blood"
  },
  {
    "id": "labcorp-verified-20261120-next-008565",
    "testCode": "008565",
    "testName": "Chlamydia trachomatis Culture",
    "status": "active",
    "specimenType": "Cervical Swab",
    "drawContainer": "Universal Transport Medium (UTM) Swab",
    "transportContainer": "Universal Transport Medium (UTM) Swab",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "1 cervical swab",
    "minimumVolume": "",
    "spin": "No",
    "specialLabeling": "",
    "specialInstructions": "Cervical epithelial-cell culture route only. Provider removes mucus with one swab, then samples mucosal epithelial cells firmly with a separate synthetic swab. Place the specimen swab into appropriate Chlamydia/viral UTM-RT transport and refrigerate. Never use a wooden-shaft or bacterial culture swab. Submit original device and label source CERVIX.",
    "source": "https://www.labcorp.com/tests/008565/chlamydia-trachomatis-culture"
  },
  {
    "id": "labcorp-verified-20261120-next-008573",
    "testCode": "008573",
    "testName": "Viral Culture, General",
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
    "specialInstructions": "Viral culture of dermal/vesicular lesion only. Open lesion and sample fresh vesicle fluid or exposed base with a sterile synthetic swab, place directly into viral transport medium and refrigerate immediately. Do not transfer or submit dry bacterial swabs. Label LESION with source.",
    "source": "https://www.labcorp.com/tests/008573/viral-culture-general"
  },
  {
    "id": "labcorp-verified-20261120-next-086876",
    "testCode": "086876",
    "testName": "Mycoplasma pneumoniae (Respiratory) Culture",
    "status": "active",
    "specimenType": "Throat Swab",
    "drawContainer": "Universal Transport Medium (UTM) Swab",
    "transportContainer": "Universal Transport Medium (UTM) Swab",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "1 throat swab",
    "minimumVolume": "",
    "spin": "No",
    "specialLabeling": "",
    "specialInstructions": "Throat-swab route for Mycoplasma pneumoniae respiratory culture. Collect directly in viral/Mycoplasma transport medium, refrigerate at 2–8°C and submit original transport swab. Wooden swabs are unacceptable. Specify THROAT as specimen origin.",
    "source": "https://www.labcorp.com/tests/086876/mycoplasma-pneumoniae-respiratory-culture"
  },
  {
    "id": "labcorp-verified-20261120-next-180787",
    "testCode": "180787",
    "testName": "Tissue Culture",
    "status": "active",
    "specimenType": "Tissue",
    "drawContainer": "Sterile cup",
    "transportContainer": "Sterile cup",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "Provider-collected tissue specimen",
    "minimumVolume": "",
    "spin": "No",
    "specialLabeling": "Label TISSUE and exact anatomical source",
    "specialInstructions": "Provider-obtained fresh tissue only. Submit in a sterile leakproof screw-cap cup at room temperature, without formalin or fixative. Avoid normal flora contamination and transport within the published 48-hour stability. Anaerobic culture requires an appropriate additional order/handling route.",
    "source": "https://www.labcorp.com/tests/180787/tissue-culture"
  },
  {
    "id": "labcorp-verified-20261120-next-183476",
    "testCode": "183476",
    "testName": "Tissue Culture: Aerobic and Anaerobic Bacterial Culture",
    "status": "active",
    "specimenType": "Tissue",
    "drawContainer": "Sterile cup",
    "transportContainer": "Sterile cup",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "Provider-collected tissue specimen",
    "minimumVolume": "",
    "spin": "No",
    "specialLabeling": "Label TISSUE and exact anatomical source",
    "specialInstructions": "Provider-obtained fresh tissue for aerobic/anaerobic bacterial culture. Submit in the original sterile screw-cap cup at room temperature, with no fixative; avoid normal flora contamination. Maintain anaerobic specimen integrity and deliver within 48 hours. Confirm local receiving laboratory accepts sterile cup for anaerobic viability.",
    "source": "https://www.labcorp.com/tests/183476/tissue-culture-aerobic-and-anaerobic-bacterial-culture"
  },
  {
    "id": "labcorp-verified-20261120-next-310",
    "testCode": "310",
    "testName": "Maternal Serum Alpha-Fetoprotein (MSAFP)",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "7 mL whole blood in SST",
    "minimumVolume": "",
    "spin": "Yes",
    "specialLabeling": "",
    "specialInstructions": "Maternal serum AFP screening via SST whole-blood collection path. Allow to clot and centrifuge 15 minutes at 1,500 rpm to prevent hemolysis. Submit the original spun SST at room temperature. Verify gestational-age and maternal screening information on the requisition.",
    "source": "https://www.labcorp.com/tests/310/maternal-serum-alpha-fetoprotein-msafp-whe"
  },
  {
    "id": "labcorp-verified-20261120-next-325",
    "testCode": "325",
    "testName": "Afp4® Screening - Quadruple Marker Test (AFP, hCG, uE3, Inhibin A)",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "7 mL whole blood in SST",
    "minimumVolume": "",
    "spin": "Yes",
    "specialLabeling": "",
    "specialInstructions": "Second-trimester AFP4/quad screen. Collect 7 mL whole blood in SST, allow to clot and centrifuge 15 minutes at 1,000 g to prevent hemolysis. Submit the complete original spun SST; do not pour off. Verify gestational age and ultrasound dating information.",
    "source": "https://www.labcorp.com/tests/325/afp4-screening-quadruple-marker-test-afp-hcg-ue3-inhibin-a-whe"
  },
  {
    "id": "labcorp-verified-20261120-next-336",
    "testCode": "336",
    "testName": "SequentialScreen Part 2",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "7 mL whole blood in SST",
    "minimumVolume": "3 mL serum",
    "spin": "Yes",
    "specialLabeling": "",
    "specialInstructions": "SequentialScreen Part 2 requires a prior first-trimester Sequential 1 specimen. Collect during 15.0–21.9 weeks of gestation, 7 mL whole blood in SST, clot and centrifuge 15 minutes at 1,000 g. Submit complete spun original SST without pouring off. Document first-trimester results and gestational dating.",
    "source": "https://www.labcorp.com/tests/336/sequentialscreen-part-2-whe"
  },
  {
    "id": "labcorp-verified-20261120-next-480260",
    "testCode": "480260",
    "testName": "Leukemia/Lymphoma Phenotyping, Flow Cytometry",
    "status": "active",
    "specimenType": "Whole Blood",
    "drawContainer": "Green Sodium Heparin",
    "transportContainer": "Green Sodium Heparin (original tube)",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "3 mL whole blood",
    "minimumVolume": "1 mL",
    "spin": "No",
    "specialLabeling": "",
    "specialInstructions": "Leukemia/lymphoma flow cytometry: whole-blood route only. Collect green sodium-heparin whole blood; submit the original tube at room temperature and arrange arrival within 24 hours, Monday–Saturday. Record collection date/time and responsible pathologist. For NY, Labcorp instructs refrigerated nonfrozen gel pack in shipper; confirm service-area courier rules.",
    "source": "https://www.labcorp.com/tests/480260/leukemia-lymphoma-phenotyping-flow-cytometry"
  },
  {
    "id": "labcorp-verified-20261120-next-505805",
    "testCode": "505805",
    "testName": "Chronic Urticaria (CU) Evaluation Profile",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "4 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialLabeling": "",
    "specialInstructions": "Two specimen types required: 4 mL serum in spun SST plus 4 mL original EDTA whole blood for CBC/ESR. Invert lavender 8–10 times immediately; do not spin lavender. If using a red-top serum tube instead of SST, transfer separated serum to a plastic transport tube. High-dose biotin may interfere. Component test 505800 not approved for NY.",
    "source": "https://www.labcorp.com/tests/505805/chronic-urticaria-cu-evaluation-profile",
    "additionalDrawRequirements": [
      {
        "container": "Lavender EDTA",
        "specimenType": "Whole Blood",
        "preferredVolume": "4 mL whole blood",
        "transportContainer": "Lavender EDTA (original tube)",
        "transportTemperature": "Room Temperature",
        "spin": "No",
        "purpose": "Required CBC/ESR EDTA whole blood",
        "count": 1
      }
    ]
  },
  {
    "id": "labcorp-verified-20261120-next-511402",
    "testCode": "511402",
    "testName": "Maternal Cell Contamination",
    "status": "active",
    "specimenType": "Whole Blood",
    "drawContainer": "Lavender EDTA",
    "transportContainer": "Lavender EDTA (original tube)",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "8.5 mL whole blood",
    "minimumVolume": "3 mL whole blood",
    "spin": "No",
    "specialLabeling": "",
    "specialInstructions": "Maternal-cell contamination assessment from maternal EDTA whole blood. Submit unspun original EDTA tubes; do not freeze. Must be a separate maternal requisition from fetal CVS or amniotic fluid specimens. Maintain enough total blood volume for the assay.",
    "source": "https://www.labcorp.com/tests/511402/maternal-cell-contamination"
  },
  {
    "id": "labcorp-verified-20261120-next-519020",
    "testCode": "519020",
    "testName": "Postvasectomy Sperm Evaluation, Qualitative",
    "status": "active",
    "specimenType": "Semen",
    "drawContainer": "Sterile cup",
    "transportContainer": "Sterile cup",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "Entire ejaculate",
    "minimumVolume": "",
    "spin": "No",
    "specialLabeling": "Label SEMEN",
    "specialInstructions": "Postvasectomy semen qualitative assessment. Collect complete ejaculate into a clean additive-free sterile screw-cap cup; no lubricants or spermicides. Keep at room temperature or refrigerate without freezing, avoid temperature extremes and ensure specimen reaches lab within 72 hours. Patient preparation: abstain 2–7 days.",
    "source": "https://www.labcorp.com/tests/519020/postvasectomy-sperm-evaluation-qualitative"
  },
  {
    "id": "labcorp-verified-20261120-next-123260",
    "testCode": "123260",
    "testName": "α1-Antitrypsin Deficiency Profile",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "1.5 mL serum per tube",
    "minimumVolume": "0.6 mL serum per tube",
    "spin": "Yes",
    "specialLabeling": "",
    "specialInstructions": "Alpha-1-antitrypsin deficiency profile requires TWO SEPARATE serum specimens of 1.5 mL each (at least 0.6 mL per serum tube), plus 7 mL EDTA whole blood (3 mL minimum). Use two SSTs and original lavender EDTA tubes. Never spin or freeze EDTA whole blood. Overnight fasting preferred.",
    "source": "https://www.labcorp.com/tests/123260/a1-antitrypsin-deficiency-profile",
    "collectionCount": 2,
    "submissionCount": 2,
    "additionalDrawRequirements": [
      {
        "container": "Lavender EDTA",
        "specimenType": "Whole Blood",
        "preferredVolume": "7 mL whole blood",
        "minimumVolume": "3 mL whole blood",
        "transportContainer": "Lavender EDTA (original tube)",
        "transportTemperature": "Room Temperature",
        "spin": "No",
        "purpose": "Mandatory EDTA whole-blood component",
        "count": 2
      }
    ]
  }
];
  const known = new Map((window.SEED_TESTS||[]).map(row=>[String(row.testCode||'').trim(),row]));
  for(const row of verified){
    const old=known.get(row.testCode);
    if(old&&!['pending','reference'].includes(old.status)) continue;
    if(old) Object.assign(old,row,{id:old.id||row.id});
    else {window.SEED_TESTS.push(row);known.set(row.testCode,row);}
  }
  const old=window.LabDirectoryTat||{};
  window.LabDirectoryTat=Object.freeze({...old,directory:Object.freeze({...{
  "310": [
    "2–5 days",
    5,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/310/maternal-serum-alpha-fetoprotein-msafp-whe"
  ],
  "325": [
    "2–5 days",
    5,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/325/afp4-screening-quadruple-marker-test-afp-hcg-ue3-inhibin-a-whe"
  ],
  "336": [
    "2–5 days",
    5,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/336/sequentialscreen-part-2-whe"
  ],
  "123260": [
    "6–12 days",
    12,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/123260/a1-antitrypsin-deficiency-profile"
  ],
  "180787": [
    "3–4 days",
    4,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/180787/tissue-culture"
  ],
  "183476": [
    "14–17 days",
    17,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/183476/tissue-culture-aerobic-and-anaerobic-bacterial-culture"
  ],
  "480260": [
    "1–3 days",
    3,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/480260/leukemia-lymphoma-phenotyping-flow-cytometry"
  ],
  "505805": [
    "7–10 days",
    10,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/505805/chronic-urticaria-cu-evaluation-profile"
  ],
  "511402": [
    "11–21 days",
    21,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/511402/maternal-cell-contamination"
  ],
  "519020": [
    "Within 1 day",
    1,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/519020/postvasectomy-sperm-evaluation-qualitative"
  ],
  "008003": [
    "4–7 days",
    7,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/008003/anaerobic-and-aerobic-culture"
  ],
  "008900": [
    "14–18 days",
    18,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/008900/anaerobic-culture-extended-incubation"
  ],
  "008904": [
    "4–7 days",
    7,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/008904/anaerobic-culture"
  ],
  "008185": [
    "2–4 days",
    4,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/008185/parasite-examination-whole-blood"
  ],
  "008565": [
    "3–5 days",
    5,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/008565/chlamydia-trachomatis-culture"
  ],
  "008573": [
    "9–12 days",
    12,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/008573/viral-culture-general"
  ],
  "086876": [
    "15–21 days",
    21,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/086876/mycoplasma-pneumoniae-respiratory-culture"
  ]
},...(old.directory||{})})});
})();
