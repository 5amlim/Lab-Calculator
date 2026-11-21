// Verified clinic-collectable Labcorp records from the 151 remaining reference sweep, 2026-11-21.
// The original pending references remain searchable; this promotes only records with a supported workflow.
(() => {
  'use strict';
  const additions = [
  {
    "id": "labcorp-remaining-verified-183511",
    "testCode": "183511",
    "testName": "Acid-Fast Smear and Culture With M. tuberculosis Susceptibility Reflex",
    "status": "active",
    "specimenType": "Sputum",
    "drawContainer": "Sterile cup",
    "transportContainer": "Sterile cup",
    "transportTemperature": "Refrigerated",
    "preferredVolume": "5 mL sputum",
    "minimumVolume": "2 mL",
    "spin": "No",
    "specialInstructions": "Collect true first-morning sputum, not saliva, in a leakproof sterile screw-cap cup. One collection per container; if repeat specimens are ordered, collect on separate days as directed (three separate days recommended). Do not submit an eSwab, a syringe, paraffin, fixative or frozen sample. Refrigerate and deliver within the source-listed seven-day stability window. AFB smear, culture, and M. tuberculosis-only susceptibility pathway.",
    "specialLabeling": "Label SPUTUM; document source and collection date",
    "clinicalCategories": [
      "infectious",
      "microbiology",
      "respiratory"
    ],
    "searchAliases": [
      "AFB smear culture MTb",
      "mycobacterium tuberculosis sputum culture",
      "TB culture"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/183511",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperatureRaw": "Refrigerated"
  },
  {
    "id": "labcorp-remaining-verified-183631",
    "testCode": "183631",
    "testName": "Acid-Fast Mycobacterial Blood Culture With Reflex",
    "status": "active",
    "specimenType": "Whole Blood",
    "drawContainer": "Green Sodium Heparin",
    "transportContainer": "Green Sodium Heparin",
    "transportTemperature": "Refrigerated",
    "preferredVolume": "10 mL sodium-heparin whole blood",
    "minimumVolume": "5 mL whole blood",
    "spin": "No",
    "specialInstructions": "Collect directly into GREEN SODIUM HEPARIN (not lithium heparin) using enough approved tubes for the 10 mL preferred draw. Submit original, unopened and unspun green sodium-heparin tube(s); no transfer. Refrigerate. Do not use a syringe, EDTA tube, eSwab, paraffin, fixative or frozen specimen. Alternative bone marrow route is not offered in this calculator.",
    "specialLabeling": "Label WHOLE BLOOD; SODIUM HEPARIN",
    "clinicalCategories": [
      "infectious",
      "microbiology",
      "hematology"
    ],
    "searchAliases": [
      "AFB blood culture",
      "mycobacteria blood culture",
      "acid fast bacilli blood"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/183631",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperatureRaw": "Refrigerated"
  },
  {
    "id": "labcorp-remaining-verified-316511",
    "testCode": "316511",
    "testName": "Beta-2-Microglobulin and Creatinine, Urine",
    "status": "active",
    "specimenType": "Urine",
    "drawContainer": "Sterile cup",
    "transportContainer": "Sterile cup",
    "transportTemperature": "Refrigerated",
    "preferredVolume": "2 mL urine",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Collect random urine directly in a clean sterile screw-cap cup without preservative. Submit original specimen refrigerated, no transfer or centrifugation. Verify an appropriate sample pH and routing if the receiving laboratory provides additional instructions.",
    "specialLabeling": "Label URINE",
    "clinicalCategories": [
      "urinary",
      "renal",
      "chemistry"
    ],
    "searchAliases": [
      "beta 2 microglobulin urine",
      "B2M urine",
      "CreatU Beta2U"
    ],
    "source": "https://labcatalog.net/tests/?test=25176",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperatureRaw": "Refrigerated"
  },
  {
    "id": "labcorp-remaining-verified-365200",
    "testCode": "365200",
    "testName": "Stillbirth / Intrauterine Fetal Demise Follow-up Profile",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "SST / Gold (spun)",
    "transportTemperature": "Refrigerated",
    "preferredVolume": "4 mL serum",
    "minimumVolume": "",
    "spin": "Yes",
    "specialInstructions": "Separate and refrigerate 4 mL serum. Also obtain separate EDTA whole blood, ACD whole blood (or the specified approved Labcorp buccal kit), and sodium-citrate platelet-poor plasma. For citrate: fill tubes to mark, mix, double centrifuge, transfer platelet-poor plasma to a dedicated Labcorp frozen purple transport vial and freeze immediately. Do not group differently preserved specimens or freeze the EDTA/ACD whole blood. Follow prescriber guidance on anticoagulant therapy.",
    "specialLabeling": "Label SERUM",
    "clinicalCategories": [
      "pregnancy",
      "hematology",
      "coagulation",
      "endocrinology"
    ],
    "searchAliases": [
      "IUFD follow up",
      "stillborn follow up",
      "fetal demise panel",
      "stillbirth panel"
    ],
    "source": "https://www.labcorp.com/tests/365200/intrauterine-fetal-demise-stillborn-follow-up-profile",
    "additionalDrawRequirements": [
      {
        "purpose": "Lupus anticoagulant profile",
        "specimenType": "Platelet-Poor Plasma",
        "container": "Light Blue Sodium Citrate",
        "transportContainer": "Frozen Transport Tube (Purple Cap)",
        "transportTemperature": "Frozen",
        "transportTemperatureRaw": "Frozen",
        "preferredVolume": "1 mL citrate plasma",
        "spin": "Yes",
        "specialInstructions": "Completely fill 3.2% citrate blue tubes, double-spin platelet-poor plasma, transfer to frozen purple screw-cap transport tube and freeze immediately.",
        "specialLabeling": "Label CITRATE PLASMA; PPP",
        "count": 1,
        "submissionCount": 1
      },
      {
        "purpose": "CBC and genetic components",
        "specimenType": "Whole Blood",
        "container": "Lavender EDTA",
        "transportContainer": "Lavender EDTA",
        "transportTemperature": "Refrigerated",
        "transportTemperatureRaw": "Refrigerated",
        "preferredVolume": "One filled EDTA whole-blood tube",
        "spin": "No",
        "specialInstructions": "Collect EDTA whole blood in original lavender tube, do not spin or transfer; refrigerate.",
        "specialLabeling": "Label EDTA WHOLE BLOOD",
        "count": 1,
        "submissionCount": 1
      },
      {
        "purpose": "ACD whole blood for inherited components",
        "specimenType": "Whole Blood",
        "container": "Yellow ACD",
        "transportContainer": "Yellow ACD",
        "transportTemperature": "Refrigerated",
        "transportTemperatureRaw": "Refrigerated",
        "preferredVolume": "One filled ACD-A whole-blood tube",
        "spin": "No",
        "specialInstructions": "Collect and send a dedicated yellow ACD-A whole-blood tube; no transfer; refrigerate. Do not substitute an ACD yellow for an EDTA lavender tube.",
        "specialLabeling": "Label ACD WHOLE BLOOD",
        "count": 1,
        "submissionCount": 1
      }
    ],
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperatureRaw": "Refrigerated"
  },
  {
    "id": "labcorp-remaining-verified-716167",
    "testCode": "716167",
    "testName": "Ethanol, Urine",
    "status": "active",
    "specimenType": "Urine",
    "drawContainer": "Sterile cup",
    "transportContainer": "Sterile cup",
    "transportTemperature": "Room Temperature",
    "preferredVolume": "20 mL urine",
    "minimumVolume": "",
    "spin": "No",
    "specialInstructions": "Collect urine in a sterile screw-cap cup without preservative, seal firmly to minimize loss of volatiles and submit in the original container at room temperature. Not a legal chain-of-custody collection.",
    "specialLabeling": "Label URINE",
    "clinicalCategories": [
      "toxicology",
      "urinary"
    ],
    "searchAliases": [
      "alcohol urine",
      "ETOH urine",
      "ethyl alcohol urine"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/716167",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperatureRaw": "Room Temperature"
  },
  {
    "id": "labcorp-remaining-verified-723202",
    "testCode": "723202",
    "testName": "Benzene Exposure Emergency Exam, Urine (Phenol)",
    "status": "active",
    "specimenType": "Urine",
    "drawContainer": "Sterile cup",
    "transportContainer": "Sterile cup",
    "transportTemperature": "Refrigerated",
    "preferredVolume": "10 mL random urine",
    "minimumVolume": "2 mL",
    "spin": "No",
    "specialInstructions": "Collect end-of-shift random urine for occupational benzene phenol evaluation in an unpreserved sterile screw-cap cup. Fill and seal to minimize volatilization; refrigerate immediately and submit within three days. This is a clinical specimen pathway only; legal/forensic chain-of-custody collections require a separate approved process.",
    "specialLabeling": "Label URINE; END OF SHIFT",
    "clinicalCategories": [
      "toxicology",
      "urinary"
    ],
    "searchAliases": [
      "benzene exposure",
      "occupational benzene",
      "phenol urine"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/723202",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperatureRaw": "Refrigerated"
  },
  {
    "id": "labcorp-remaining-verified-910627",
    "testCode": "910627",
    "testName": "Isopropyl Alcohol, Whole Blood",
    "status": "active",
    "specimenType": "Whole Blood",
    "drawContainer": "Gray Sodium Fluoride",
    "transportContainer": "Gray Sodium Fluoride",
    "transportTemperature": "Room Temperature",
    "preferredVolume": "2 mL whole blood",
    "minimumVolume": "1 mL whole blood",
    "spin": "No",
    "specialInstructions": "Use original gray sodium-fluoride blood collection tube. Fill completely to the manufacturer's fill line to minimize headspace, seal immediately and do NOT open, aliquot, centrifuge or transfer. Use a nonalcohol skin antiseptic for volatile alcohol testing. Labcorp's equivalent current whole-blood volatile test guidance supports room-temperature transport; confirm any exact-code receiving-lab exception.",
    "specialLabeling": "Label WHOLE BLOOD; ORIGINAL UNOPENED TUBE",
    "clinicalCategories": [
      "toxicology",
      "chemistry"
    ],
    "searchAliases": [
      "isopropanol",
      "rubbing alcohol blood"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/910627",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperatureRaw": "Room Temperature"
  },
  {
    "id": "labcorp-remaining-verified-910650",
    "testCode": "910650",
    "testName": "Methyl Alcohol, Whole Blood",
    "status": "active",
    "specimenType": "Whole Blood",
    "drawContainer": "Gray Sodium Fluoride",
    "transportContainer": "Gray Sodium Fluoride",
    "transportTemperature": "Room Temperature",
    "preferredVolume": "2 mL whole blood",
    "minimumVolume": "1 mL whole blood",
    "spin": "No",
    "specialInstructions": "Use original gray sodium-fluoride blood collection tube. Fill completely to the manufacturer's fill line to minimize headspace, seal immediately and do NOT open, aliquot, centrifuge or transfer. Use a nonalcohol skin antiseptic for volatile alcohol testing. Labcorp's equivalent current whole-blood volatile test guidance supports room-temperature transport; confirm any exact-code receiving-lab exception.",
    "specialLabeling": "Label WHOLE BLOOD; ORIGINAL UNOPENED TUBE",
    "clinicalCategories": [
      "toxicology",
      "chemistry"
    ],
    "searchAliases": [
      "methanol",
      "wood alcohol blood"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/910650",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperatureRaw": "Room Temperature"
  },
  {
    "id": "labcorp-remaining-verified-910808",
    "testCode": "910808",
    "testName": "Volatiles, Whole Blood",
    "status": "active",
    "specimenType": "Whole Blood",
    "drawContainer": "Gray Sodium Fluoride",
    "transportContainer": "Gray Sodium Fluoride",
    "transportTemperature": "Room Temperature",
    "preferredVolume": "2 mL whole blood",
    "minimumVolume": "1 mL whole blood",
    "spin": "No",
    "specialInstructions": "Use original gray sodium-fluoride blood collection tube. Fill completely to the manufacturer's fill line to minimize headspace, seal immediately and do NOT open, aliquot, centrifuge or transfer. Use a nonalcohol skin antiseptic for volatile alcohol testing. Labcorp's equivalent current whole-blood volatile test guidance supports room-temperature transport; confirm any exact-code receiving-lab exception.",
    "specialLabeling": "Label WHOLE BLOOD; ORIGINAL UNOPENED TUBE",
    "clinicalCategories": [
      "toxicology",
      "chemistry"
    ],
    "searchAliases": [
      "blood volatile solvents",
      "toxic alcohol panel"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/910808",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperatureRaw": "Room Temperature"
  }
];
  const catalog = window.SEED_TESTS || [];
  const existing = new Map(catalog.map(r=>[String(r.testCode||'').trim(),r]));
  for (const record of additions) {
    const prior=existing.get(record.testCode);
    if (!prior) { catalog.push(record); existing.set(record.testCode,record); }
    else if (prior.status==='pending'||prior.status==='reference') Object.assign(prior,record,{id:prior.id||record.id});
  }
  window.SEED_TESTS = catalog;
  const previousTat = window.LabDirectoryTat || {};
  window.LabDirectoryTat = Object.freeze({ ...previousTat, directory:Object.freeze({...{"365200":["2–3 days",3,"Labcorp official","","https://www.labcorp.com/tests/365200/intrauterine-fetal-demise-stillborn-follow-up-profile"]},...(previousTat.directory||{})}) });
})();
