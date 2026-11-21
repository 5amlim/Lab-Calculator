// Individually verified complex coagulation/hematology and timed urine collection paths.
// Preserve two-stage citrate plasma preparation, multi-temperature submissions, and TAT provenance.
(() => {
'use strict';
const additions=[
  {
    "id": "labcorp-clinically-reviewed-20261120-117700",
    "testCode": "117700",
    "testName": "Bleeding With Normal aPTT/PT",
    "status": "active",
    "specimenType": "Plasma",
    "drawContainer": "Light Blue Sodium Citrate",
    "transportContainer": "Transport Tube",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "preferredVolume": "6 mL citrated plasma total (3 x 2 mL)",
    "minimumVolume": "3 mL citrated plasma total (3 x 1 mL)",
    "spin": "Yes",
    "collectionCount": 4,
    "submissionCount": 3,
    "additionalDrawRequirements": [],
    "specialLabeling": "",
    "specialInstructions": "Collect fully filled 3.2% sodium citrate light-blue tubes, invert at least six times, and double centrifuge (10 minutes, transfer upper 2/3 plasma, repeat 10 minutes). Submit THREE separate frozen screw-cap plasma transport tubes, 2 mL plasma each (at least 1 mL each); freeze immediately. For butterfly draws use a discard tube as directed. 4 standard citrate tubes are needed for the preferred 6 mL plasma target. Do not pool with noncitrated plasma.",
    "source": "https://www.labcorp.com/tests/117700/bleeding-with-normal-aptt-pt"
  },
  {
    "id": "labcorp-clinically-reviewed-20261120-117853",
    "testCode": "117853",
    "testName": "Disseminated Intravascular Coagulation (DIC) Profile, Comprehensive Plus",
    "status": "active",
    "specimenType": "Whole Blood",
    "drawContainer": "Lavender EDTA",
    "transportContainer": "Lavender EDTA (original tube)",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "5 mL EDTA whole blood",
    "minimumVolume": "",
    "spin": "No",
    "collectionCount": 2,
    "submissionCount": 1,
    "additionalDrawRequirements": [
      {
        "container": "Light Blue Sodium Citrate",
        "specimenType": "Plasma",
        "preferredVolume": "4 mL citrated plasma total, 2 mL per submission tube",
        "transportContainer": "Transport Tube",
        "transportTemperature": "Frozen",
        "spin": "Yes",
        "purpose": "Required double-spun frozen citrate plasma (2 separate 2 mL aliquots)",
        "count": 3,
        "submissionCount": 2
      }
    ],
    "specialLabeling": "",
    "specialInstructions": "DIC comprehensive plus requires EDTA whole blood at room temperature and TWO separate 2 mL frozen sodium citrate plasma specimens. For each citrate tube fill exactly, gently invert at least six times, double centrifuge with a second plastic tube for 10 minutes, transfer platelet-poor plasma into separate transport tubes and freeze immediately. Adjust citrate for hematocrit over 55% per performing laboratory instruction. Do not spin EDTA whole blood.",
    "source": "https://www.labcorp.com/tests/117853/disseminated-intravascular-coagulation-dic-profile-comprehensive-plus"
  },
  {
    "id": "labcorp-clinically-reviewed-20261120-164044",
    "testCode": "164044",
    "testName": "COVID-19 Induced Thrombotic Microangiopathy Profile",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "2 mL serum",
    "minimumVolume": "1 mL serum",
    "spin": "Yes",
    "collectionCount": 1,
    "submissionCount": 1,
    "additionalDrawRequirements": [
      {
        "container": "Light Blue Sodium Citrate",
        "specimenType": "Plasma",
        "preferredVolume": "4.5 mL citrated plasma",
        "minimumVolume": "3 mL citrated plasma",
        "transportContainer": "Transport Tube",
        "transportTemperature": "Frozen",
        "spin": "Yes",
        "purpose": "Additional frozen citrate plasma; must freeze within 4 hours",
        "count": 3,
        "submissionCount": 1
      }
    ],
    "specialLabeling": "",
    "specialInstructions": "COVID-19 thrombotic microangiopathy profile requires BOTH serum and frozen citrate plasma. Submit the original spun SST at room temperature for serum. For citrate, fill 3.2% blue tubes completely, invert at least six times, centrifuge, transfer 4.5 mL plasma into plastic transport tube and freeze within four hours. Transport plasma frozen, separate from serum. If needed, use additional full citrate draws to meet total plasma volume.",
    "source": "https://www.labcorp.com/tests/164044/covid-19-induced-thrombotic-microangiopathy-profile"
  },
  {
    "id": "labcorp-clinically-reviewed-20261120-164049",
    "testCode": "164049",
    "testName": "COVID-19 Severe Disease Progression Risk Profile",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "5 mL serum",
    "minimumVolume": "3.5 mL serum",
    "spin": "Yes",
    "collectionCount": 1,
    "submissionCount": 1,
    "additionalDrawRequirements": [
      {
        "container": "Light Blue Sodium Citrate",
        "specimenType": "Plasma",
        "preferredVolume": "2 mL citrated plasma",
        "minimumVolume": "1 mL citrated plasma",
        "transportContainer": "Transport Tube",
        "transportTemperature": "Frozen",
        "spin": "Yes",
        "purpose": "Frozen citrate plasma; freeze within 4 hours",
        "count": 2,
        "submissionCount": 1
      },
      {
        "container": "Lavender EDTA",
        "specimenType": "Whole Blood",
        "preferredVolume": "4 mL EDTA whole blood",
        "transportContainer": "Lavender EDTA (original tube)",
        "transportTemperature": "Room Temperature",
        "spin": "No",
        "purpose": "Separate EDTA whole blood specimen",
        "count": 1,
        "submissionCount": 1
      }
    ],
    "specialLabeling": "",
    "specialInstructions": "COVID-19 disease progression risk profile requires serum, citrate plasma, and EDTA whole blood. Collect 5 mL serum with fully spun SST, plus EDTA whole blood and 2 mL double-spun 3.2% citrated plasma transferred into plastic transport tube and frozen within four hours. Maintain serum and EDTA whole blood at room temperature. Ask about high-dose biotin supplementation; the performing lab recommends discontinuing at least 72 hours before sampling when clinically appropriate.",
    "source": "https://www.labcorp.com/tests/164049/covid-19-severe-disease-progression-risk-profile"
  },
  {
    "id": "labcorp-clinically-reviewed-20261120-140250",
    "testCode": "140250",
    "testName": "GM1 IgG/M Autoantibodies",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "Transport Tube",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "preferredVolume": "1 mL total serum (0.5 mL per aliquot)",
    "minimumVolume": "0.4 mL total serum (0.2 mL per aliquot)",
    "spin": "Yes",
    "collectionCount": 1,
    "submissionCount": 2,
    "additionalDrawRequirements": [],
    "specialLabeling": "",
    "specialInstructions": "GM1 IgG/IgM antibodies. Allow serum to clot, centrifuge and separate serum from SST; submit TWO separately labeled frozen plastic screw-cap transport tubes, each with 0.5 mL serum (0.2 mL minimum). Freeze immediately to −20°C or colder. Do not freeze original SST.",
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/140250"
  },
  {
    "id": "labcorp-clinically-reviewed-20261120-375002",
    "testCode": "375002",
    "testName": "CreatU+Ca U+Phos U+Na U+BUN...",
    "status": "active",
    "specimenType": "24-hour Urine",
    "drawContainer": "24 Hour Urine Container",
    "transportContainer": "Sterile cup",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "10 mL aliquot from 24-hour urine",
    "minimumVolume": "",
    "spin": "No",
    "collectionCount": 1,
    "submissionCount": 1,
    "additionalDrawRequirements": [],
    "specialLabeling": "",
    "specialInstructions": "Creatinine, calcium, phosphate, sodium and BUN urine profile. Record total 24-hour volume and start/end collection times. Mix the full collection before submitting 10 mL in a sterile plastic screw-cap cup. Unpreserved collection route. Compendium lists room-temperature stability 7 days, refrigerated 14 days; acid-preserved source containers are not used.",
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/375002"
  }
];
const prior=new Map((window.SEED_TESTS||[]).map(r=>[String(r.testCode||'').trim(),r]));
for(const row of additions){const old=prior.get(row.testCode);if(old&&!['pending','reference'].includes(old.status))continue;
if(old)Object.assign(old,row,{id:old.id||row.id});else{window.SEED_TESTS.push(row);prior.set(row.testCode,row)}}
const d=window.LabDirectoryTat||{};window.LabDirectoryTat=Object.freeze({...d,directory:Object.freeze({...{
  "117700": [
    "4–5 days",
    5,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/117700/bleeding-with-normal-aptt-pt"
  ],
  "117853": [
    "2–3 days",
    3,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/117853/disseminated-intravascular-coagulation-dic-profile-comprehensive-plus"
  ],
  "140250": [
    "5–7 days",
    7,
    "Labcorp CDOS compendium",
    "",
    "https://cdos.halfpenny.com/labcorp/TestDisplay/140250"
  ],
  "164044": [
    "2–4 days",
    4,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/164044/covid-19-induced-thrombotic-microangiopathy-profile"
  ],
  "164049": [
    "2–4 days",
    4,
    "Labcorp directory",
    "",
    "https://www.labcorp.com/tests/164049/covid-19-severe-disease-progression-risk-profile"
  ]
},...(d.directory||{})})});
})();
