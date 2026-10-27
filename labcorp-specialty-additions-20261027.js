/* Three new Labcorp specialty test records, directory-verified 2026-10-27.
 * Six other verified candidates already existed and are not redefined.\n * All code-specific specimen handling is preserved. Do not apply Quest specimen
 * rules, or merge separately frozen/amber aliquots into pooled SST submissions.
 * Existing built-in records and local browser overrides are untouched.
 */
(()=>{'use strict';if(!Array.isArray(window.SEED_TESTS))return;const additions=[
  {
    "id": "labcorp-520380-20261027-specialty",
    "testCode": "520380",
    "testName": "Serum Amyloid A (SAA)",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "alternativeContainer": "Red Top serum or EDTA/heparin plasma",
    "transportContainer": "Frozen Transport Tube",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "0.5 mL",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "stability": "Room, refrigerated, frozen: 14 days",
    "spin": "Yes",
    "specialInstructions": "Separate serum or plasma from cells within 45 minutes and freeze in dedicated labeled plastic transport tube. Labcorp requires frozen shipment. Use separate frozen aliquots for multiple frozen tests. Do not send an unopened SST frozen.",
    "fastingStatus": "",
    "fastingInstructions": "",
    "status": "active",
    "source": "Labcorp official test directory reviewed 2026-10-27 • https://www.labcorp.com/tests/520380/serum-amyloid-a-saa"
  },
  {
    "id": "labcorp-140916-20261027-specialty",
    "testCode": "140916",
    "testName": "Interleukin-6 (IL-6), Serum",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "alternativeContainer": "Red Top serum",
    "transportContainer": "Frozen Transport Tube",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "1 mL",
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "stability": "Room 1 day; refrigerated 1 day; frozen 14 days; max 1 freeze-thaw",
    "spin": "Yes",
    "specialInstructions": "Separate SERUM from cells and transfer to plastic transport tube. Freeze and ship FROZEN, using a dedicated aliquot. Minimum 1 mL is required; avoid freeze-thaw cycles.",
    "fastingStatus": "",
    "fastingInstructions": "",
    "status": "active",
    "source": "Labcorp official test directory reviewed 2026-10-27 • https://www.labcorp.com/tests/140916/interleukin-6-serum"
  },
  {
    "id": "labcorp-141330-20261027-specialty",
    "testCode": "141330",
    "testName": "Phospholipase A2 Receptor Autoantibodies, IgG (PLA2R)",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "alternativeContainer": "Red Top serum",
    "transportContainer": "SST / Gold (spun)",
    "preferredVolume": "0.5 mL serum",
    "minimumVolume": "0.2 mL",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "stability": "Room, refrigerated, frozen: 14 days",
    "spin": "Yes",
    "specialInstructions": "Labcorp PLA2R IgG ELISA. If drawn into plain red-top, spin and separate into a plastic transport tube; gel-barrier serum may be submitted spun. This assay is distinct from PLA2R IFA and from the full primary membranous nephropathy antibody panel.",
    "fastingStatus": "",
    "fastingInstructions": "",
    "status": "active",
    "source": "Labcorp official test directory reviewed 2026-10-27 • https://www.labcorp.com/tests/141330/phospholipase-a2-receptor-autoantibodies-igg"
  }
];
const known=new Set(window.SEED_TESTS.map(t=>String(t.testCode||'').trim()));for(const t of additions){if(!known.has(t.testCode)){window.SEED_TESTS.push(t);known.add(t.testCode)}}})();