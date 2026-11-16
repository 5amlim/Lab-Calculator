/* LabCorp 2026-11-15 batch 7: verify pending assays with official specimen instructions.
 * Keep citrate plasma double-spun and separately frozen; serum is not pooled with plasma.
 */
(()=>{'use strict';if(!Array.isArray(window.SEED_TESTS))return;
const verified={
  "117169": {
    "specimenType": "Plasma",
    "drawContainer": "Light Blue Sodium Citrate",
    "transportContainer": "Frozen Transport Tube (Purple Cap)",
    "alternativeContainer": "",
    "preferredVolume": "2 mL citrated plasma",
    "minimumVolume": "1 mL",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "spin": "Yes",
    "specialInstructions": "Collect a full 3.2% sodium-citrate light blue tube, invert at least six times, and use a discard tube if using a butterfly set. Double-centrifuge to platelet-poor plasma. Transfer to LabCorp Frozen Transport Tube (Purple Cap), PP Transpak 49482, freeze immediately, and maintain frozen. Use a separately labeled frozen aliquot for each ordered frozen test; do not combine distinct assays or patient samples. Verify that sufficient plasma can be obtained. 2 mL preferred, 1 mL minimum; use coagulation volume guide.",
    "source": "Labcorp official directory, reviewed 2026-11-15 • https://www.labcorp.com/tests/117169/von-willebrand-factor-vwf-collagen-binding-activity-cba",
    "status": "active",
    "collectionCount": 2,
    "stability": "Freeze; refrigerated up to 4 hours"
  },
  "117180": {
    "specimenType": "Plasma",
    "drawContainer": "Light Blue Sodium Citrate",
    "transportContainer": "Frozen Transport Tube (Purple Cap)",
    "alternativeContainer": "",
    "preferredVolume": "1 mL citrated plasma",
    "minimumVolume": "Refer to official directory",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "spin": "Yes",
    "specialInstructions": "Collect a full 3.2% sodium-citrate light blue tube, invert at least six times, and use a discard tube if using a butterfly set. Double-centrifuge to platelet-poor plasma. Transfer to LabCorp Frozen Transport Tube (Purple Cap), PP Transpak 49482, freeze immediately, and maintain frozen. Use a separately labeled frozen aliquot for each ordered frozen test; do not combine distinct assays or patient samples. Verify that sufficient plasma can be obtained. 1 mL frozen platelet-poor plasma for Reptilase Time.",
    "source": "Labcorp official directory, reviewed 2026-11-15 • https://www.labcorp.com/tests/117180/reptilase-time",
    "status": "active",
    "stability": "Frozen 28 days"
  },
  "117230": {
    "specimenType": "Plasma",
    "drawContainer": "Light Blue Sodium Citrate",
    "transportContainer": "Frozen Transport Tube (Purple Cap)",
    "alternativeContainer": "",
    "preferredVolume": "1 mL citrated plasma",
    "minimumVolume": "0.5 mL",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "spin": "Yes",
    "specialInstructions": "Collect a full 3.2% sodium-citrate light blue tube, invert at least six times, and use a discard tube if using a butterfly set. Double-centrifuge to platelet-poor plasma. Transfer to LabCorp Frozen Transport Tube (Purple Cap), PP Transpak 49482, freeze immediately, and maintain frozen. Use a separately labeled frozen aliquot for each ordered frozen test; do not combine distinct assays or patient samples. Verify that sufficient plasma can be obtained. 1 mL preferred; the 0.5 mL minimum does not permit repeats.",
    "source": "Labcorp official directory, reviewed 2026-11-15 • https://www.labcorp.com/tests/117230/prothrombin-fragment-1-2",
    "status": "active"
  },
  "117330": {
    "specimenType": "Plasma",
    "drawContainer": "Light Blue Sodium Citrate",
    "transportContainer": "Frozen Transport Tube (Purple Cap)",
    "alternativeContainer": "",
    "preferredVolume": "2 mL citrated plasma",
    "minimumVolume": "Refer to official directory",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "spin": "Yes",
    "specialInstructions": "Collect a full 3.2% sodium-citrate light blue tube, invert at least six times, and use a discard tube if using a butterfly set. Double-centrifuge to platelet-poor plasma. Transfer to LabCorp Frozen Transport Tube (Purple Cap), PP Transpak 49482, freeze immediately, and maintain frozen. Use a separately labeled frozen aliquot for each ordered frozen test; do not combine distinct assays or patient samples. Verify that sufficient plasma can be obtained. 2 mL frozen platelet-poor plasma for aPTT mixing studies.",
    "source": "Labcorp official directory, reviewed 2026-11-15 • https://www.labcorp.com/tests/117330/aptt-mixing-studies",
    "status": "active",
    "collectionCount": 2
  },
  "140715": {
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "Frozen Transport Tube (Purple Cap)",
    "alternativeContainer": "",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "0.3 mL adult; 0.1 mL pediatric",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "spin": "Yes",
    "stability": "Room 6 hours; refrigerated 1 day; frozen 2 years",
    "specialInstructions": "Collect serum in SST / Gold, clot and centrifuge. Transfer separated serum to LabCorp Frozen Transport Tube (Purple Cap), PP Transpak 49482, and immediately freeze. The lab also accepts lavender EDTA plasma, but serum is the default route here. Keep each separately ordered frozen test in its own transport tube.",
    "source": "https://www.labcorp.com/tests/140715/17-hydroxypregnenolone-mass-spectrometry-endocrine-sciences",
    "status": "active"
  },
  "164535": {
    "specimenType": "Plasma",
    "drawContainer": "Light Blue Sodium Citrate",
    "transportContainer": "Frozen Transport Tube (Purple Cap)",
    "alternativeContainer": "",
    "preferredVolume": "2.6 mL citrated plasma",
    "minimumVolume": "Refer to official directory",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "spin": "Yes",
    "specialInstructions": "Collect a full 3.2% sodium-citrate light blue tube, invert at least six times, and use a discard tube if using a butterfly set. Double-centrifuge to platelet-poor plasma. Transfer to LabCorp Frozen Transport Tube (Purple Cap), PP Transpak 49482, freeze immediately, and maintain frozen. Use a separately labeled frozen aliquot for each ordered frozen test; do not combine distinct assays or patient samples. Verify that sufficient plasma can be obtained. TWO specimen types required: 2.6 mL frozen citrated plasma plus 2 mL refrigerated serum. Keep them in different transport bags.",
    "source": "Labcorp official directory, reviewed 2026-11-15 • https://www.labcorp.com/tests/164535/antiphospholipid-syndrome-aps-assessment",
    "status": "active",
    "collectionCount": 2,
    "additionalDrawRequirements": [
      {
        "container": "SST / Gold",
        "specimenType": "Serum",
        "count": 1,
        "purpose": "2 mL serum for APS antibodies",
        "preferredVolume": "2 mL serum",
        "minimumVolume": "Refer to official directory",
        "transportContainer": "SST / Gold (spun)",
        "transportTemperature": "Refrigerated",
        "spin": "Yes",
        "specialInstructions": "Clot and spin SST / Gold, submit original spun tube refrigerated, separate from frozen citrated plasma."
      }
    ]
  }
};
for(const t of window.SEED_TESTS){const v=verified[String(t.testCode||'').trim()];if(v)Object.assign(t,v,{status:'active'});}
})();
