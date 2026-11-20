// Combo and reflex collection requirements verified against Quest MASTER.
(() => {
  'use strict';
  if (!Array.isArray(window.SEED_TESTS)) return;
  const additions = [
  {
    "id": "quest-combo-327",
    "testCode": "327",
    "testName": "Cell Count and Differential, Pleural Fluid",
    "status": "active",
    "specimenType": "Pleural Fluid",
    "drawContainer": "Lavender EDTA",
    "alternativeContainer": "Green Sodium Heparin",
    "transportContainer": "Lavender EDTA",
    "preferredVolume": "3 mL pleural fluid",
    "minimumVolume": "1 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room temperature",
    "spin": "No",
    "specialLabeling": "Label PLEURAL FLUID",
    "specialInstructions": "Collect provider-obtained pleural fluid in lavender EDTA or sodium heparin and submit unspun in the original tube at room temperature. Avoid clotting.",
    "stability": "Room temperature: 48 hours Refrigerated: 48 hours Frozen: Unacceptable",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/327/?cc=MASTER",
    "clinicalCategories": [
      "hematology"
    ]
  },
  {
    "id": "quest-combo-20913",
    "testCode": "20913",
    "testName": "Cell Count and Differential, Fluid, Other",
    "status": "active",
    "specimenType": "Body Fluid",
    "drawContainer": "Lavender EDTA",
    "alternativeContainer": "Green Sodium Heparin",
    "transportContainer": "Lavender EDTA",
    "preferredVolume": "3 mL fluid",
    "minimumVolume": "1 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room temperature",
    "spin": "No",
    "specialLabeling": "Label body fluid source",
    "specialInstructions": "Collect provider-obtained body fluid in lavender EDTA or sodium heparin and submit unspun in the original tube at room temperature. Avoid clotting.",
    "stability": "Room temperature: 48 hours Refrigerated: 48 hours Frozen: Unacceptable",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/20913/?cc=MASTER",
    "clinicalCategories": [
      "hematology"
    ]
  },
  {
    "id": "quest-combo-232",
    "testCode": "232",
    "testName": "Alpha-Fetoprotein, Amniotic Fluid and Reflex to AchE and Fetal Hgb",
    "status": "active",
    "specimenType": "Amniotic Fluid",
    "drawContainer": "Sterile cup",
    "alternativeContainer": "",
    "transportContainer": "Sterile cup",
    "preferredVolume": "3 mL amniotic fluid",
    "minimumVolume": "1.5 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room temperature",
    "spin": "No",
    "specialLabeling": "Label AMNIOTIC FLUID",
    "specialInstructions": "Collect provider-obtained amniotic fluid in a sterile, leak-proof screw-cap cup and submit in the original labeled cup at room temperature. Avoid blood contamination. Quest reflexes when AFP MoM exceeds 1.99.",
    "stability": "Room temperature: 14 days Refrigerated: 21 days Frozen: 1 year",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/232/?cc=MASTER",
    "clinicalCategories": [
      "obstetrics"
    ]
  },
  {
    "id": "quest-combo-91615",
    "testCode": "91615",
    "testName": "Alpha-Fetoprotein and Acetylcholinesterase, Amniotic Fluid with Reflex to HbF",
    "status": "active",
    "specimenType": "Amniotic Fluid",
    "drawContainer": "Sterile Cup",
    "alternativeContainer": "",
    "transportContainer": "Sterile Cup",
    "preferredVolume": "2.4 mL amniotic fluid",
    "minimumVolume": "1.2 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room temperature",
    "spin": "No",
    "specialLabeling": "Label AMNIOTIC FLUID",
    "specialInstructions": "Submit provider-obtained amniotic fluid in the original sterile leak-proof container at room temperature. Avoid blood contamination. Include gestational age (13–24 weeks), collection date, clinical indications, and AFP and MoM results if available.",
    "stability": "Room temperature: 14 days Refrigerated: 21 days Frozen: 1 year",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/91615/?cc=MASTER",
    "clinicalCategories": [
      "obstetrics"
    ]
  },
  {
    "id": "quest-combo-34842",
    "testCode": "34842",
    "testName": "Hexosaminidase A and Total Hexosaminidase, Leukocytes",
    "status": "active",
    "specimenType": "Whole Blood",
    "drawContainer": "ACD Yellow Top",
    "alternativeContainer": "",
    "transportContainer": "ACD Yellow Top (original tube)",
    "preferredVolume": "6 mL whole blood",
    "minimumVolume": "5 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated (cold packs)",
    "spin": "No",
    "specialLabeling": "Label WHOLE BLOOD · ACD",
    "specialInstructions": "Draw in ACD solution A or B. Refrigerate the original tube and protect from freezing. Follow Quest seasonal coolant and insulated packing instructions. Draw Monday–Thursday, excluding the day before a holiday, as close to shipping as possible. Must arrive within 96 hours. Document informed consent for New York clients.",
    "stability": "Room temperature: 4 days Refrigerated: 4 days Frozen: Unacceptable",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/34842/?cc=MASTER",
    "clinicalCategories": [
      "genetics"
    ]
  },
  {
    "id": "quest-combo-35694",
    "testCode": "35694",
    "testName": "Mineral Profile, RBCs",
    "status": "active",
    "specimenType": "Red Blood Cells",
    "drawContainer": "Royal Blue EDTA (purple stripe)",
    "alternativeContainer": "",
    "transportContainer": "Royal Blue EDTA (purple stripe)",
    "preferredVolume": "2 mL RBCs",
    "minimumVolume": "0.7 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated (cold packs)",
    "spin": "Yes",
    "specialLabeling": "Label RED BLOOD CELLS · ROYAL BLUE EDTA",
    "specialInstructions": "Centrifuge and remove plasma within two hours. Keep the red blood cells in the original trace-metal-free royal blue EDTA tube, replace the stopper, and send refrigerated. The lab rejects frozen or room-temperature shipments.",
    "stability": "Room temperature: Not stable Refrigerated: 14 days Frozen: Not stable",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/35694/?cc=MASTER",
    "clinicalCategories": [
      "toxicology",
      "heavy-metals"
    ]
  },
  {
    "id": "quest-verified-panel-11469",
    "testCode": "11469",
    "testName": "Recurrent Miscarriage/Coagulation Panel with Reflex (without Consultation)",
    "status": "active",
    "specimenType": "Whole Blood",
    "drawContainer": "Lavender EDTA",
    "transportContainer": "Lavender EDTA",
    "preferredVolume": "5 mL whole blood",
    "minimumVolume": "3 mL",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "collectionCount": 1,
    "submissionCount": 1,
    "specialInstructions": "Submit the original unspun lavender EDTA tube at room temperature. This panel also requires dedicated frozen platelet-poor citrate plasma. Use a site with validated double-spin and frozen shipping capability. Review the Quest directory for assay-specific requirements.",
    "clinicalCategories": [
      "coagulation",
      "hematology"
    ],
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/11469/?cc=MASTER",
    "stability": "Room temperature: 8 days Refrigerated: 8 days Frozen: 30 days",
    "additionalDrawRequirements": [
      {
        "specimenType": "Platelet Poor Plasma",
        "container": "Light Blue Sodium Citrate",
        "transportContainer": "Transport Tube",
        "preferredVolume": "1 mL per vial",
        "minimumVolume": "0.5 mL per vial",
        "transportTemperature": "Frozen",
        "transportTemperatureRaw": "Frozen",
        "spin": "Yes",
        "count": 4,
        "submissionCount": 4,
        "specialInstructions": "Fill 4 dedicated 3.2% sodium citrate tubes to the fill line. Prepare platelet-poor plasma by the approved double-spin procedure within the Quest processing window. Submit 4 separate labeled plastic vials. Freeze immediately and ship on dry ice.",
        "stability": "Frozen: 14 days",
        "specialLabeling": "Label PLATELET-POOR PLASMA · SODIUM CITRATE"
      }
    ]
  },
  {
    "id": "quest-verified-panel-11472",
    "testCode": "11472",
    "testName": "Venous Thrombosis Hypercoagulability Panel with Reflex (Warfarin Patient)",
    "status": "active",
    "specimenType": "Whole Blood",
    "drawContainer": "Lavender EDTA",
    "transportContainer": "Lavender EDTA",
    "preferredVolume": "5 mL whole blood",
    "minimumVolume": "3 mL",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "collectionCount": 1,
    "submissionCount": 1,
    "specialInstructions": "Submit the original unspun lavender EDTA tube at room temperature. This panel also requires dedicated frozen platelet-poor citrate plasma. Use a site with validated double-spin and frozen shipping capability. Review the Quest directory for assay-specific requirements.",
    "clinicalCategories": [
      "coagulation",
      "hematology"
    ],
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/11472/?cc=MASTER",
    "stability": "Room temperature: 8 days Refrigerated: 8 days Frozen: 30 days",
    "additionalDrawRequirements": [
      {
        "specimenType": "Platelet Poor Plasma",
        "container": "Light Blue Sodium Citrate",
        "transportContainer": "Transport Tube",
        "preferredVolume": "1 mL per vial",
        "minimumVolume": "0.5 mL per vial",
        "transportTemperature": "Frozen",
        "transportTemperatureRaw": "Frozen",
        "spin": "Yes",
        "count": 6,
        "submissionCount": 6,
        "specialInstructions": "Fill 6 dedicated 3.2% sodium citrate tubes to the fill line. Prepare platelet-poor plasma by the approved double-spin procedure within the Quest processing window. Submit 6 separate labeled plastic vials. Freeze immediately and ship on dry ice.",
        "stability": "Frozen: 14 days",
        "specialLabeling": "Label PLATELET-POOR PLASMA · SODIUM CITRATE"
      }
    ]
  },
  {
    "id": "quest-verified-panel-11475",
    "testCode": "11475",
    "testName": "Venous Thrombosis Hypercoagulability Panel with Reflex",
    "status": "active",
    "specimenType": "Whole Blood",
    "drawContainer": "Lavender EDTA",
    "transportContainer": "Lavender EDTA",
    "preferredVolume": "5 mL whole blood",
    "minimumVolume": "3 mL",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "collectionCount": 1,
    "submissionCount": 1,
    "specialInstructions": "Submit the original unspun lavender EDTA tube at room temperature. This panel also requires dedicated frozen platelet-poor citrate plasma. Use a site with validated double-spin and frozen shipping capability. Review the Quest directory for assay-specific requirements.",
    "clinicalCategories": [
      "coagulation",
      "hematology"
    ],
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/11475/?cc=MASTER",
    "stability": "Room temperature: 8 days Refrigerated: 8 days Frozen: 30 days",
    "additionalDrawRequirements": [
      {
        "specimenType": "Platelet Poor Plasma",
        "container": "Light Blue Sodium Citrate",
        "transportContainer": "Transport Tube",
        "preferredVolume": "1 mL per vial",
        "minimumVolume": "0.5 mL per vial",
        "transportTemperature": "Frozen",
        "transportTemperatureRaw": "Frozen",
        "spin": "Yes",
        "count": 6,
        "submissionCount": 6,
        "specialInstructions": "Fill 6 dedicated 3.2% sodium citrate tubes to the fill line. Prepare platelet-poor plasma by the approved double-spin procedure within the Quest processing window. Submit 6 separate labeled plastic vials. Freeze immediately and ship on dry ice.",
        "stability": "Frozen: 14 days",
        "specialLabeling": "Label PLATELET-POOR PLASMA · SODIUM CITRATE"
      }
    ]
  },
  {
    "id": "quest-verified-panel-19655",
    "testCode": "19655",
    "testName": "Venous Thrombosis Hypercoag Panel w/Reflex, Consultation (Warfarin Patient)",
    "status": "active",
    "specimenType": "Whole Blood",
    "drawContainer": "Lavender EDTA",
    "transportContainer": "Lavender EDTA",
    "preferredVolume": "5 mL whole blood",
    "minimumVolume": "3 mL",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "collectionCount": 1,
    "submissionCount": 1,
    "specialInstructions": "Submit the original unspun lavender EDTA tube at room temperature. This panel also requires dedicated frozen platelet-poor citrate plasma. Use a site with validated double-spin and frozen shipping capability. Review the Quest directory for assay-specific requirements.",
    "clinicalCategories": [
      "coagulation",
      "hematology"
    ],
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/19655/?cc=MASTER",
    "stability": "Room temperature: 8 days Refrigerated: 8 days Frozen: 30 days",
    "additionalDrawRequirements": [
      {
        "specimenType": "Platelet Poor Plasma",
        "container": "Light Blue Sodium Citrate",
        "transportContainer": "Transport Tube",
        "preferredVolume": "1 mL per vial",
        "minimumVolume": "0.5 mL per vial",
        "transportTemperature": "Frozen",
        "transportTemperatureRaw": "Frozen",
        "spin": "Yes",
        "count": 6,
        "submissionCount": 6,
        "specialInstructions": "Fill 6 dedicated 3.2% sodium citrate tubes to the fill line. Prepare platelet-poor plasma by the approved double-spin procedure within the Quest processing window. Submit 6 separate labeled plastic vials. Freeze immediately and ship on dry ice.",
        "stability": "Frozen: 14 days",
        "specialLabeling": "Label PLATELET-POOR PLASMA · SODIUM CITRATE"
      },
      {
        "specimenType": "Serum",
        "container": "SST / Gold",
        "transportContainer": "Transport Tube",
        "preferredVolume": "1 mL serum",
        "minimumVolume": "0.6 mL",
        "transportTemperature": "Room Temperature",
        "transportTemperatureRaw": "Room Temperature",
        "spin": "Yes",
        "count": 1,
        "submissionCount": 1,
        "specialInstructions": "Refrigerate the SST for 30 minutes after collection. Centrifuge promptly after clot formation and transfer the serum to a screw-cap plastic vial.",
        "stability": "Room temperature: 4 days Refrigerated: 14 days Frozen: 6 months",
        "specialLabeling": "Label SERUM · SST"
      }
    ]
  },
  {
    "id": "quest-verified-panel-19656",
    "testCode": "19656",
    "testName": "Venous Thrombosis Hypercoagulability Panel with Reflex and Consultation",
    "status": "active",
    "specimenType": "Whole Blood",
    "drawContainer": "Lavender EDTA",
    "transportContainer": "Lavender EDTA",
    "preferredVolume": "5 mL whole blood",
    "minimumVolume": "3 mL",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "collectionCount": 1,
    "submissionCount": 1,
    "specialInstructions": "Submit the original unspun lavender EDTA tube at room temperature. This panel also requires dedicated frozen platelet-poor citrate plasma. Use a site with validated double-spin and frozen shipping capability. Review the Quest directory for assay-specific requirements.",
    "clinicalCategories": [
      "coagulation",
      "hematology"
    ],
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/19656/?cc=MASTER",
    "stability": "Room temperature: 8 days Refrigerated: 8 days Frozen: 30 days",
    "additionalDrawRequirements": [
      {
        "specimenType": "Platelet Poor Plasma",
        "container": "Light Blue Sodium Citrate",
        "transportContainer": "Transport Tube",
        "preferredVolume": "1 mL per vial",
        "minimumVolume": "0.5 mL per vial",
        "transportTemperature": "Frozen",
        "transportTemperatureRaw": "Frozen",
        "spin": "Yes",
        "count": 6,
        "submissionCount": 6,
        "specialInstructions": "Fill 6 dedicated 3.2% sodium citrate tubes to the fill line. Prepare platelet-poor plasma by the approved double-spin procedure within the Quest processing window. Submit 6 separate labeled plastic vials. Freeze immediately and ship on dry ice.",
        "stability": "Frozen: 14 days",
        "specialLabeling": "Label PLATELET-POOR PLASMA · SODIUM CITRATE"
      },
      {
        "specimenType": "Serum",
        "container": "SST / Gold",
        "transportContainer": "Transport Tube",
        "preferredVolume": "1 mL serum",
        "minimumVolume": "0.5 mL",
        "transportTemperature": "Frozen",
        "transportTemperatureRaw": "Frozen",
        "spin": "Yes",
        "count": 1,
        "submissionCount": 1,
        "specialInstructions": "Refrigerate the SST for 30 minutes after collection. Centrifuge promptly after clot formation and transfer the serum to a screw-cap plastic vial.",
        "stability": "Room temperature: 4 days Refrigerated: 14 days Frozen: 6 months",
        "specialLabeling": "Label SERUM · SST"
      }
    ]
  },
  {
    "id": "quest-verified-panel-17817",
    "testCode": "17817",
    "testName": "Chronic Lymphocytic Leukemia (CLL)/Lymphoma Diagnostic Panel",
    "status": "active",
    "specimenType": "Whole Blood",
    "drawContainer": "Green Sodium Heparin",
    "transportContainer": "Green Sodium Heparin",
    "preferredVolume": "5 mL peripheral whole blood",
    "minimumVolume": "3 mL",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "collectionCount": 1,
    "submissionCount": 1,
    "specialInstructions": "Peripheral blood workflow. Submit the original unspun tube at room temperature and ship immediately. Include the clinical indication and specimen source. Send CBC with differential results if available. Use Quest specimen-specific instructions for other collection types.",
    "clinicalCategories": [
      "hematology",
      "oncology"
    ],
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/17817/?cc=MASTER",
    "alternativeContainer": "ACD Yellow Top (Solution A) or Lavender EDTA",
    "stability": "Room temperature: 72 hours",
    "specialLabeling": "Label PERIPHERAL WHOLE BLOOD"
  },
  {
    "id": "quest-verified-panel-17818",
    "testCode": "17818",
    "testName": "Chronic Lymphocytic Leukemia (CLL)/Lymphoma Follow-up Panel",
    "status": "active",
    "specimenType": "Whole Blood",
    "drawContainer": "Green Sodium Heparin",
    "transportContainer": "Green Sodium Heparin",
    "preferredVolume": "5 mL peripheral whole blood",
    "minimumVolume": "3 mL",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "collectionCount": 1,
    "submissionCount": 1,
    "specialInstructions": "Peripheral blood workflow. Submit the original unspun tube at room temperature and ship immediately. Include the clinical indication and specimen source. Send CBC with differential results if available. Use Quest specimen-specific instructions for other collection types.",
    "clinicalCategories": [
      "hematology",
      "oncology"
    ],
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/17818/?cc=MASTER",
    "alternativeContainer": "ACD Yellow Top (Solution A) or Lavender EDTA",
    "stability": "Room temperature: 72 hours",
    "specialLabeling": "Label PERIPHERAL WHOLE BLOOD"
  },
  {
    "id": "quest-verified-panel-17819",
    "testCode": "17819",
    "testName": "Hairy Cell Leukemia (HCL)/Lymphoma Follow-up Panel",
    "status": "active",
    "specimenType": "Whole Blood",
    "drawContainer": "Green Sodium Heparin",
    "transportContainer": "Green Sodium Heparin",
    "preferredVolume": "5 mL peripheral whole blood",
    "minimumVolume": "3 mL",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "collectionCount": 1,
    "submissionCount": 1,
    "specialInstructions": "Peripheral blood workflow. Submit the original unspun tube at room temperature and ship immediately. Include the clinical indication and specimen source. Send CBC with differential results if available. Use Quest specimen-specific instructions for other collection types.",
    "clinicalCategories": [
      "hematology",
      "oncology"
    ],
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/17819/?cc=MASTER",
    "alternativeContainer": "ACD Yellow Top (Solution A) or Lavender EDTA",
    "stability": "Room temperature: 72 hours",
    "specialLabeling": "Label PERIPHERAL WHOLE BLOOD"
  },
  {
    "id": "quest-verified-panel-17820",
    "testCode": "17820",
    "testName": "Plasma Cell Neoplasia Follow-up Panel",
    "status": "active",
    "specimenType": "Whole Blood",
    "drawContainer": "Green Sodium Heparin",
    "transportContainer": "Green Sodium Heparin",
    "preferredVolume": "5 mL peripheral whole blood",
    "minimumVolume": "3 mL",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "collectionCount": 1,
    "submissionCount": 1,
    "specialInstructions": "Peripheral blood workflow. Submit the original unspun tube at room temperature and ship immediately. Include the clinical indication and specimen source. Send CBC with differential results if available. Use Quest specimen-specific instructions for other collection types.",
    "clinicalCategories": [
      "hematology",
      "oncology"
    ],
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/17820/?cc=MASTER",
    "alternativeContainer": "ACD Yellow Top (Solution A) or Lavender EDTA",
    "stability": "Room temperature: 72 hours",
    "specialLabeling": "Label PERIPHERAL WHOLE BLOOD"
  },
  {
    "id": "quest-verified-panel-17728",
    "testCode": "17728",
    "testName": "Multiple Sclerosis Panel",
    "status": "active",
    "specimenType": "CSF",
    "drawContainer": "Transport Tube",
    "transportContainer": "Transport Tube (original tube)",
    "preferredVolume": "2.2 mL CSF",
    "minimumVolume": "1 mL",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "collectionCount": 1,
    "submissionCount": 1,
    "specialInstructions": "Submit provider-collected CSF in its original sterile plastic CSF vial, preferably collection tube #4. Serum is required. Collect both at the same time if possible or within 48 hours of one another. Refrigerate the CSF and serum shipments. Avoid blood-contaminated CSF.",
    "clinicalCategories": [
      "neurology",
      "immunology"
    ],
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/17728/?cc=MASTER",
    "specialLabeling": "Label CSF and document collection date/time",
    "additionalDrawRequirements": [
      {
        "specimenType": "Serum",
        "container": "Red Top",
        "transportContainer": "Transport Tube",
        "preferredVolume": "1 mL serum",
        "minimumVolume": "0.5 mL",
        "transportTemperature": "Refrigerated",
        "transportTemperatureRaw": "Refrigerated",
        "spin": "Yes",
        "count": 1,
        "submissionCount": 1,
        "specialInstructions": "Allow blood to clot, centrifuge and transfer serum to a labeled transport tube. Send refrigerated.",
        "stability": "See individual tests",
        "specialLabeling": "Label SERUM and document collection date/time"
      }
    ]
  },
  {
    "id": "quest-verified-panel-20400",
    "testCode": "20400",
    "testName": "Helicobacter pylori and Clarithromycin Resistance, PCR, Miscellaneous",
    "status": "active",
    "specimenType": "Stool",
    "drawContainer": "Sterile cup",
    "transportContainer": "Cary-Blair Stool Culture Transport Vial",
    "preferredVolume": "5 mL liquid or soft stool",
    "minimumVolume": "5 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "stability": "Room temperature: 30 days Refrigerated: 30 days Frozen: Unacceptable",
    "specialInstructions": "Stool workflow. Collect liquid or soft stool in a clean, dry cup without urine or water contamination. Transfer to Cary-Blair medium up to the fill line, mix, and submit the vial at room temperature. Do not freeze. For non-stool specimen types use the Quest specimen-specific instructions.",
    "specialLabeling": "Label STOOL · CARY-BLAIR",
    "clinicalCategories": [
      "gastrointestinal",
      "microbiology"
    ],
    "searchAliases": [
      "h pylori clarithromycin resistance",
      "h pylori stool pcr"
    ],
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/20400/?cc=MASTER"
  },
  {
    "id": "quest-verified-panel-30427",
    "testCode": "30427",
    "testName": "Drug Screen Panel 9, Meconium",
    "status": "active",
    "specimenType": "Stool",
    "drawContainer": "Sterile cup",
    "transportContainer": "Sterile cup",
    "preferredVolume": "5 g meconium",
    "minimumVolume": "1 g",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "stability": "Room temperature: 48 hours Refrigerated: 7 days Frozen: 30 days",
    "specialInstructions": "Submit meconium in its original sterile leak-proof screw-cap cup without additives. Refrigerate and ship with cold packs. Do not pool with routine stool or transfer to stool preservative.",
    "specialLabeling": "Label MECONIUM",
    "clinicalCategories": [
      "toxicology",
      "pregnancy"
    ],
    "searchAliases": [
      "meconium drug screen",
      "meconium panel 9",
      "neonatal drug screen"
    ],
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/30427/?cc=MASTER"
  },
  {
    "id": "quest-verified-panel-91976",
    "testCode": "91976",
    "testName": "Mitogen-induced Lymphocyte Proliferation Panel (PHA, Con A, PWM)",
    "status": "active",
    "specimenType": "Whole Blood",
    "drawContainer": "Green Sodium Heparin",
    "transportContainer": "Green Sodium Heparin",
    "preferredVolume": "10 mL whole blood",
    "minimumVolume": "5 mL",
    "collectionCount": 3,
    "submissionCount": 3,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "stability": "Room temperature: 48 hours Refrigerated: Unacceptable Frozen: Unacceptable",
    "specialInstructions": "Prior arrangement required. Confirm tube size, quantity and transport with Quest Referral Testing before collection. The calculator estimates 3 standard 4 mL tubes to meet the preferred total. Use sodium heparin and submit the original unspun tubes at room temperature. Do not refrigerate or freeze. Submit Monday through Thursday, excluding the day before a holiday. Specimen must arrive at the testing lab within 48 hours. Record draw date and time.",
    "specialLabeling": "Label WHOLE BLOOD · SODIUM HEPARIN · draw date/time",
    "clinicalCategories": [
      "immunology",
      "hematology"
    ],
    "searchAliases": [
      "lymphocyte proliferation",
      "lymphocyte stimulation"
    ],
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/91976/?cc=MASTER"
  },
  {
    "id": "quest-verified-panel-91977",
    "testCode": "91977",
    "testName": "Antigen-induced Lymphocyte Proliferation Panel (Candida, Tetanus, TB PPD)",
    "status": "active",
    "specimenType": "Whole Blood",
    "drawContainer": "Green Sodium Heparin",
    "transportContainer": "Green Sodium Heparin",
    "preferredVolume": "10 mL whole blood",
    "minimumVolume": "5 mL",
    "collectionCount": 3,
    "submissionCount": 3,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "stability": "Room temperature: 48 hours Refrigerated: Unacceptable Frozen: Unacceptable",
    "specialInstructions": "Prior arrangement required. Confirm tube size, quantity and transport with Quest Referral Testing before collection. The calculator estimates 3 standard 4 mL tubes to meet the preferred total. Use sodium heparin and submit the original unspun tubes at room temperature. Do not refrigerate or freeze. Submit Monday through Thursday, excluding the day before a holiday. Specimen must arrive at the testing lab within 48 hours. Record draw date and time.",
    "specialLabeling": "Label WHOLE BLOOD · SODIUM HEPARIN · draw date/time",
    "clinicalCategories": [
      "immunology",
      "hematology"
    ],
    "searchAliases": [
      "lymphocyte proliferation",
      "lymphocyte stimulation"
    ],
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/91977/?cc=MASTER"
  },
  {
    "id": "quest-verified-panel-91978",
    "testCode": "91978",
    "testName": "Mitogen- and Antigen-induced Lymphocyte Proliferation Panel",
    "status": "active",
    "specimenType": "Whole Blood",
    "drawContainer": "Green Sodium Heparin",
    "transportContainer": "Green Sodium Heparin",
    "preferredVolume": "20 mL whole blood",
    "minimumVolume": "10 mL",
    "collectionCount": 5,
    "submissionCount": 5,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "stability": "Room temperature: 48 hours Refrigerated: Unacceptable Frozen: Unacceptable",
    "specialInstructions": "Prior arrangement required. Confirm tube size, quantity and transport with Quest Referral Testing before collection. The calculator estimates 5 standard 4 mL tubes to meet the preferred total. Use sodium heparin and submit the original unspun tubes at room temperature. Do not refrigerate or freeze. Submit Monday through Thursday, excluding the day before a holiday. Specimen must arrive at the testing lab within 48 hours. Record draw date and time.",
    "specialLabeling": "Label WHOLE BLOOD · SODIUM HEPARIN · draw date/time",
    "clinicalCategories": [
      "immunology",
      "hematology"
    ],
    "searchAliases": [
      "lymphocyte proliferation",
      "lymphocyte stimulation"
    ],
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/91978/?cc=MASTER"
  },
  {
    "id": "quest-verified-stool-30523",
    "testCode": "30523",
    "testName": "Alpha-1-Antitrypsin, Feces, 24-Hour",
    "status": "active",
    "specimenType": "Stool",
    "drawContainer": "24-Hour Stool Collection Container",
    "transportContainer": "Transport Tube",
    "preferredVolume": "10 g from 24-hour stool collection",
    "minimumVolume": "2 g",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "spin": "No",
    "specialLabeling": "Label 24-HOUR STOOL",
    "specialInstructions": "Collect all stool for 24 hours in a leak-proof plastic 24-hour collection container. Keep refrigerated throughout collection. Mix the completed collection and transfer a 10 g aliquot into a plastic transport container. Freeze and ship frozen. Keep separate from random stool. Avoid urine contamination.",
    "stability": "Room temperature: Unacceptable Refrigerated: 8 days Frozen: 28 days",
    "clinicalCategories": [
      "gastrointestinal"
    ],
    "searchAliases": [
      "24 hour stool AAT",
      "fecal alpha 1 antitrypsin"
    ],
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/30523/?cc=MASTER"
  },
  {
    "id": "quest-verified-stool-34515",
    "testCode": "34515",
    "testName": "Marijuana, Confirmation, Meconium",
    "status": "active",
    "specimenType": "Stool",
    "drawContainer": "Sterile cup",
    "transportContainer": "Transport Tube",
    "preferredVolume": "5 g fresh meconium",
    "minimumVolume": "1 g",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "specialLabeling": "Label MECONIUM",
    "specialInstructions": "Collect fresh meconium in a sterile leak-proof cup. Submit the specimen in a dedicated additive-free transport tube with cold packs. Do not pool with routine stool or add preservative.",
    "stability": "Room temperature: 72 hours Refrigerated: 14 days Frozen: 30 days",
    "clinicalCategories": [
      "toxicology",
      "pregnancy"
    ],
    "searchAliases": [
      "marijuana meconium",
      "meconium marijuana confirmation"
    ],
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/34515/?cc=MASTER"
  },
  {
    "id": "quest-verified-stool-34517",
    "testCode": "34517",
    "testName": "Amphetamines, Confirmation, Meconium",
    "status": "active",
    "specimenType": "Stool",
    "drawContainer": "Sterile cup",
    "transportContainer": "Transport Tube",
    "preferredVolume": "5 g fresh meconium",
    "minimumVolume": "1 g",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "specialLabeling": "Label MECONIUM",
    "specialInstructions": "Collect fresh meconium in a sterile leak-proof cup. Submit the specimen in a dedicated additive-free transport tube with cold packs. Do not pool with routine stool or add preservative.",
    "stability": "Room temperature: 72 hours Refrigerated: 14 days Frozen: 30 days",
    "clinicalCategories": [
      "toxicology",
      "pregnancy"
    ],
    "searchAliases": [
      "amphetamines meconium",
      "meconium amphetamines confirmation"
    ],
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/34517/?cc=MASTER"
  },
  {
    "id": "quest-verified-stool-38155",
    "testCode": "38155",
    "testName": "Opiate, Confirmation, Meconium",
    "status": "active",
    "specimenType": "Stool",
    "drawContainer": "Sterile cup",
    "transportContainer": "Transport Tube",
    "preferredVolume": "5 g fresh meconium",
    "minimumVolume": "1 g",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "specialLabeling": "Label MECONIUM",
    "specialInstructions": "Collect fresh meconium in a sterile leak-proof cup. Submit the specimen in a dedicated additive-free transport tube with cold packs. Do not pool with routine stool or add preservative.",
    "stability": "Room temperature: 72 hours Refrigerated: 14 days Frozen: 30 days",
    "clinicalCategories": [
      "toxicology",
      "pregnancy"
    ],
    "searchAliases": [
      "opiate meconium",
      "meconium opiate confirmation"
    ],
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/38155/?cc=MASTER"
  }
];
  const existing = new Map(window.SEED_TESTS.map(record => [String(record.testCode || '').trim(), record]));
  for (const record of additions) {
    const prior = existing.get(record.testCode);
    if (!prior) window.SEED_TESTS.push(record);
    else if (prior.status === 'reference' || prior.status === 'pending') {
      Object.assign(prior, record, { id: prior.id || record.id });
    }
  }
})();
