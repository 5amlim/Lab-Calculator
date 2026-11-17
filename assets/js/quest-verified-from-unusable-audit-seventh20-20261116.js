/* Quest reference audit records #121-140, researched 2026-11-16.
 * Nine supported specimen collection pathways. Explicit hair/nail, 6N HCl,
 * isolate-only, unsupported specialty bottles and transport-unknown records
 * remain reference-only. Never overwrite active or blocked records.
 */
(()=>{'use strict';if(!Array.isArray(window.SEED_TESTS))return;
const additions=[
  {
    "id": "quest-verified-unusable-audit-seventh20-20261116-5367",
    "testCode": "5367",
    "testName": "pH, Body Fluid",
    "status": "active",
    "specimenType": "Body Fluid",
    "drawContainer": "Transport Tube",
    "alternativeContainer": "",
    "transportContainer": "Transport Tube",
    "preferredVolume": "2 mL body fluid",
    "minimumVolume": "1 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "stability": "Room 24 hours; refrigerated 14 days; frozen 6 months",
    "specialLabeling": "Label BODY FLUID, exact anatomical specimen source, date and collection time",
    "specialInstructions": "A qualified clinician obtains the specific body-fluid specimen aseptically directly into a sterile, leakproof plastic Transport Tube. Keep the original closed container and submit refrigerated with cold packs. Avoid needless air exposure and delays because pH can change with specimen handling; no staff-prepared smear, transfer or centrifugation. Identify the exact source on tube and order, such as pleural versus peritoneal fluid. This workflow is not for routine urine, serum or plasma. Verify the exact Quest account, receiving laboratory and service-area acceptance before collection.",
    "source": "Quest official Test Directory, checked November 16, 2026 • https://testdirectory.questdiagnostics.com/test/test-detail/5367/ph-body-fluid?cc=MASTER&p=r",
    "searchAliases": [
      "body fluid ph",
      "pleural fluid ph",
      "peritoneal fluid ph",
      "fluid acidity"
    ],
    "clinicalCategories": [
      "body-fluids",
      "chemistry"
    ]
  },
  {
    "id": "quest-verified-unusable-audit-seventh20-20261116-6024",
    "testCode": "6024",
    "testName": "Aluminum, Random Urine without Creatinine",
    "status": "active",
    "specimenType": "Urine",
    "drawContainer": "Trace Metal-Free Plastic Container",
    "alternativeContainer": "",
    "transportContainer": "Trace Metal-Free Plastic Container",
    "preferredVolume": "7 mL random urine",
    "minimumVolume": "2 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "stability": "Room 5 days; refrigerated 14 days; frozen 30 days",
    "specialLabeling": "Label URINE, RANDOM, TRACE METAL-FREE, and collection date/time",
    "specialInstructions": "Collect random urine directly into an acid-washed or trace-metal-free PLASTIC urine container. Submit the original metal-free container at room temperature without transfer. Keep separate from routine Sterile cup urines and all preserved urine. Avoid contamination from non-metal-free equipment; do not use glass. Ensure sufficient volume for every compatible assay sharing this source. Quest lists this code as unavailable at the IFD San Juan Capistrano lab, so confirm the local receiving site. Verify the exact Quest account, receiving laboratory and service-area acceptance before collection.",
    "source": "Quest official Test Directory, checked November 16, 2026 • https://testdirectory.questdiagnostics.com/test/test-detail/6024/?cc=MASTER",
    "searchAliases": [
      "urine aluminum",
      "aluminium urine",
      "urinary aluminum random",
      "aluminum no creatinine"
    ],
    "clinicalCategories": [
      "heavy-metals",
      "urinary"
    ]
  },
  {
    "id": "quest-verified-unusable-audit-seventh20-20261116-6057",
    "testCode": "6057",
    "testName": "Beryllium, Urine",
    "status": "active",
    "specimenType": "Urine",
    "drawContainer": "Trace Metal-Free Plastic Container",
    "alternativeContainer": "",
    "transportContainer": "Trace Metal-Free Plastic Container",
    "preferredVolume": "3 mL urine",
    "minimumVolume": "1.1 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "stability": "Room 5 days; refrigerated 30 days; frozen 14 days",
    "specialLabeling": "Label URINE, TRACE METAL-FREE and collection date/time",
    "specialInstructions": "Collect urine in a trace-metal-free or acid-washed PLASTIC urine container. Submit the original container at room temperature, with no transfer or chemical preservative. Avoid gadolinium-containing contrast media exposure for 48 hours before collection. Keep source separate from ordinary Sterile cup urines; compatible trace-metal orders may use the same original container only if the receiving laboratory accepts it and enough specimen is collected. Verify the exact Quest account, receiving laboratory and service-area acceptance before collection.",
    "source": "Quest official Test Directory, checked November 16, 2026 • https://testdirectory.questdiagnostics.com/test/test-detail/6057/beryllium-urine?cc=MASTER&p=r",
    "searchAliases": [
      "urine beryllium",
      "beryllium urine creatinine corrected",
      "beryllium exposure"
    ],
    "clinicalCategories": [
      "heavy-metals",
      "urinary"
    ]
  },
  {
    "id": "quest-verified-unusable-audit-seventh20-20261116-6060",
    "testCode": "6060",
    "testName": "Bismuth, Random Urine with Creatinine",
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
    "specialLabeling": "Label RANDOM URINE, TRACE METAL-FREE and collection date/time",
    "specialInstructions": "Collect random urine directly into an acid-washed or trace-metal-free PLASTIC urine container, avoiding contamination. Submit the original metal-free container refrigerated with cold packs; no transfer or preservative. Avoid bismuth preparations (including Pepto-Bismol) and mineral supplements for at least one week before collection, as directed by the ordering clinician. This code is NOT for New York patients: use Quest 13722 for NY. Do not combine with room-temperature metal-free urine specimens into one original container. Verify the exact Quest account, receiving laboratory and service-area acceptance before collection.",
    "source": "Quest official Test Directory, checked November 16, 2026 • https://testdirectory.questdiagnostics.com/test/test-detail/6060/bismuth-random-urine-with-creatinine?cc=MASTER&p=r",
    "searchAliases": [
      "urine bismuth",
      "bismuth random urine",
      "urinary bismuth creatinine"
    ],
    "clinicalCategories": [
      "heavy-metals",
      "urinary"
    ]
  },
  {
    "id": "quest-verified-unusable-audit-seventh20-20261116-6183",
    "testCode": "6183",
    "testName": "Manganese, Random Urine with Creatinine",
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
    "stability": "Room 5 days; refrigerated 7 days; frozen 14 days",
    "specialLabeling": "Label RANDOM URINE, TRACE METAL-FREE and collection date/time",
    "specialInstructions": "Collect random urine directly into an acid-washed or metal-free PLASTIC urine container away from any industrial worksite. Submit the ORIGINAL metal-free container at room temperature. No transfer to a regular Sterile cup or preservative tube. Confirm adequate volume and preparation if submitting multiple same-temperature trace-metal urine tests. This code is NOT for New York patients; use Quest 13723 for NY. Verify the exact Quest account, receiving laboratory and service-area acceptance before collection.",
    "source": "Quest official Test Directory, checked November 16, 2026 • https://testdirectory.questdiagnostics.com/test/test-detail/6183/manganese-random-urine-with-creatinine?cc=MASTER&p=r",
    "searchAliases": [
      "urine manganese",
      "manganese random urine",
      "manganese creatinine ratio"
    ],
    "clinicalCategories": [
      "heavy-metals",
      "urinary"
    ]
  },
  {
    "id": "quest-verified-unusable-audit-seventh20-20261116-6328",
    "testCode": "6328",
    "testName": "Toluene, Blood",
    "status": "active",
    "specimenType": "Whole Blood",
    "drawContainer": "Gray Fluoride/Oxalate",
    "alternativeContainer": "",
    "transportContainer": "Gray Fluoride/Oxalate",
    "preferredVolume": "2 mL gray-top whole blood",
    "minimumVolume": "0.7 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "stability": "Room 5 days stability, but room shipment is rejected; refrigerated 60 days; frozen 6 months",
    "specialLabeling": "Label WHOLE BLOOD, collection date/time and exposure timing if applicable",
    "specialInstructions": "Collect whole blood into ONE DEDICATED gray sodium fluoride/potassium oxalate tube. Invert gently to mix, keep securely sealed and submit the ORIGINAL UNOPENED gray-top tube refrigerated with cold packs. Do NOT centrifuge, aliquot, open, pool, freeze as a whole-blood specimen, or share this tube with routine gray-top testing. Quest explicitly rejects receipt at room temperature. Confirm correct local performing lab because code 6328 is not offered at IFD San Juan Capistrano. Verify the exact Quest account, receiving laboratory and service-area acceptance before collection.",
    "source": "Quest official Test Directory, checked November 16, 2026 • https://testdirectory.questdiagnostics.com/test/test-detail/6328/?cc=MASTER",
    "searchAliases": [
      "toluene whole blood",
      "blood toluene",
      "occupational solvent toluene"
    ],
    "clinicalCategories": [
      "toxicology",
      "occupational"
    ]
  },
  {
    "id": "quest-verified-unusable-audit-seventh20-20261116-6339",
    "testCode": "6339",
    "testName": "Trichloroethylene, Blood",
    "status": "active",
    "specimenType": "Whole Blood",
    "drawContainer": "Gray Fluoride/Oxalate",
    "alternativeContainer": "",
    "transportContainer": "Gray Fluoride/Oxalate",
    "preferredVolume": "3 mL gray-top whole blood",
    "minimumVolume": "1.2 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "stability": "Room 7 days; refrigerated 14 days; frozen 14 months",
    "specialLabeling": "Label WHOLE BLOOD and collection date/time; END OF SHIFT / END OF WORKWEEK",
    "specialInstructions": "Collect at END OF SHIFT at END OF WORKWEEK using a DEDICATED gray sodium fluoride/potassium oxalate tube. Invert gently, keep cap tightly sealed and submit the ORIGINAL UNOPENED whole-blood tube at ROOM TEMPERATURE. Do NOT centrifuge, transfer, open, pool, or share this time-specific tube with other gray-top blood tests. Quest code 6339 is not offered at IFD San Juan Capistrano; verify receiving lab and timing with provider. Verify the exact Quest account, receiving laboratory and service-area acceptance before collection.",
    "source": "Quest official Test Directory, checked November 16, 2026 • https://testdirectory.questdiagnostics.com/test/test-detail/6339/?cc=MASTER",
    "searchAliases": [
      "trichloroethylene",
      "tce blood",
      "occupational trichloroethylene"
    ],
    "clinicalCategories": [
      "toxicology",
      "occupational"
    ]
  },
  {
    "id": "quest-verified-unusable-audit-seventh20-20261116-6705",
    "testCode": "6705",
    "testName": "Immunoglobulins Panel, CSF",
    "status": "active",
    "specimenType": "CSF",
    "drawContainer": "Sterile cup",
    "alternativeContainer": "",
    "transportContainer": "Sterile cup",
    "preferredVolume": "2 mL clear CSF",
    "minimumVolume": "1 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "spin": "No",
    "stability": "Room 72 hours; refrigerated 7 days; frozen 90 days",
    "specialLabeling": "Label CSF, specimen source and collection date/time",
    "specialInstructions": "Qualified procedural clinician collects CLEAR CSF into an original sterile leakproof screw-cap Sterile cup. FREEZE the ORIGINAL specimen promptly and ship frozen on dry ice. Do not centrifuge, transfer, or mix with another fluid source. RBC contamination, xanthochromia, or hemolysis may cause rejection. Includes IgG, IgA and IgM; unlike a CSF synthesis-rate test, paired serum is not required for this panel. If other CSF tests are ordered, ensure sufficient total volume and different transport temperatures are respected. Verify the exact Quest account, receiving laboratory and service-area acceptance before collection.",
    "source": "Quest official Test Directory, checked November 16, 2026 • https://testdirectory.questdiagnostics.com/test/test-detail/6705/immunoglobulins-panel-csf?cc=MASTER&p=r",
    "searchAliases": [
      "csf immunoglobulins",
      "CSF IgG IgA IgM",
      "cerebrospinal fluid immunoglobulin panel"
    ],
    "clinicalCategories": [
      "neurology",
      "immunology"
    ]
  },
  {
    "id": "quest-verified-unusable-audit-seventh20-20261116-6881",
    "testCode": "6881",
    "testName": "Glucose, Fasting and Postprandial/2-Hour",
    "status": "active",
    "specimenType": "Plasma",
    "drawContainer": "Gray Fluoride/Oxalate",
    "alternativeContainer": "",
    "transportContainer": "Gray Fluoride/Oxalate",
    "preferredVolume": "1 mL plasma from fasting gray-top draw",
    "minimumVolume": "0.5 mL plasma each timepoint",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "Yes",
    "stability": "Gray-top whole blood room 24 hours; refrigerated 72 hours; frozen whole blood unacceptable",
    "specialLabeling": "Fasting",
    "specialInstructions": "TWO DISTINCT TIMED DRAWS are mandatory: FIRST after at least 8 hours fasting (water permitted); SECOND 2 hours after the specified meal. Collect the fasting draw in a dedicated gray sodium fluoride/potassium oxalate tube, mix gently, centrifuge to separate plasma from cells, and submit the original SPUN gray-top tube at room temperature. Record the ACTUAL fasting draw time and precise meal start time. Never use one tube for both measurements or pool the two timepoints. Both gray tubes must remain separate and individually labeled. Quest permits alternative processed plasma/serum media but this calculator uses the preferred gray-top pathway. Verify the exact Quest account, receiving laboratory and service-area acceptance before collection.",
    "source": "Quest official Test Directory, checked November 16, 2026 • https://testdirectory.questdiagnostics.com/test/test-detail/6881/?cc=MASTER",
    "searchAliases": [
      "fasting postprandial glucose",
      "fasting glucose 2h",
      "two hour post meal sugar",
      "FPG PPG"
    ],
    "clinicalCategories": [
      "diabetes",
      "endocrinology"
    ],
    "fastingStatus": "required",
    "fastingInstructions": "Fast at least 8 hours before the first draw; water only. Second draw is exactly 2 hours after the meal. Confirm meal instructions with ordering provider.",
    "additionalDrawRequirements": [
      {
        "container": "Gray Fluoride/Oxalate",
        "count": 1,
        "submissionCount": 1,
        "specimenType": "Plasma",
        "purpose": "Required second 2-hour postprandial timepoint",
        "preferredVolume": "1 mL plasma from postprandial gray-top draw",
        "minimumVolume": "0.5 mL plasma",
        "transportContainer": "Gray Fluoride/Oxalate",
        "transportTemperature": "Room Temperature",
        "transportTemperatureRaw": "Room Temperature",
        "spin": "Yes",
        "specialLabeling": "2 hours",
        "specialInstructions": "SECOND SEPARATE GRAY TUBE exactly 2 hours after the meal. Invert and centrifuge. Submit original SPUN gray-top tube at room temperature, labeled with exact draw and meal times. Do not pool with fasting gray tube."
      }
    ]
  }
];
for(const entry of additions){
 const current=window.SEED_TESTS.find(x=>String(x.testCode||'').trim()===entry.testCode);
 if(!current){window.SEED_TESTS.push(entry);continue;}
 if(current.status==='reference'||current.status==='pending')Object.assign(current,entry,{id:current.id||entry.id});
}
})();
