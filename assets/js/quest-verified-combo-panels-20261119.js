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
    "drawContainer": "Sterile Transport Tube",
    "alternativeContainer": "",
    "transportContainer": "Sterile Transport Tube",
    "preferredVolume": "3 mL amniotic fluid",
    "minimumVolume": "1.5 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room temperature",
    "spin": "No",
    "specialLabeling": "Label AMNIOTIC FLUID",
    "specialInstructions": "Collect provider-obtained amniotic fluid in a sterile transport tube and submit in the original tube at room temperature. Avoid blood contamination. Quest reflexes when AFP MoM exceeds 1.99.",
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
