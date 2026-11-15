/* Verified new Quest ASCVD, chemistry and urinalysis codes, 2026-11-14. */
(()=>{'use strict';if(!Array.isArray(window.SEED_TESTS))return;const additions=[
  {
    "id": "quest-18840-20261114c",
    "testCode": "18840",
    "testName": "POC Urinalysis, UA",
    "specimenType": "Urine",
    "drawContainer": "Sterile Urine Cup",
    "alternativeContainer": "Quest-approved urinalysis vial yellow/orange top",
    "transportContainer": "Plastic Urine Container",
    "preferredVolume": "8 mL random urine",
    "minimumVolume": "1 mL",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "stability": "Room 2 hours; refrigerated 24 hours",
    "spin": "No",
    "specialInstructions": "Clean catch midstream, fresh urine, no preservative. Test immediately for point-of-care use. If being submitted externally, verify acceptance by the specific Quest receiving service area; not every facility accepts this point-of-care code. Reject a urine CULTURE preservative tube.",
    "additionalDrawRequirements": [],
    "status": "active",
    "source": "Quest official test directory, checked 2026-11-14 • https://testdirectory.questdiagnostics.com/test/test-detail/18840/poc-urinalysis-ua?cc=MASTER"
  },
  {
    "id": "quest-59925-20261114c",
    "testCode": "59925",
    "testName": "Comprehensive Metabolic Panel without CO2, ALT and eGFR",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "alternativeContainer": "",
    "transportContainer": "SST / Gold (spun)",
    "preferredVolume": "2 mL serum",
    "minimumVolume": "1 mL",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "stability": "Room 48h; refrigerated 72h; frozen at -20°C for 4 days",
    "spin": "Yes",
    "specialInstructions": "Fasting specimen. Allow SST to clot and centrifuge; submit spun serum specimen. Do not replace a standard CMP with this code since it deliberately EXCLUDES CO2, ALT and eGFR. Do not submit plasma. Verify account- and area-specific availability.",
    "additionalDrawRequirements": [],
    "status": "active",
    "source": "Quest official test directory, checked 2026-11-14 • https://testdirectory.questdiagnostics.com/test/test-detail/59925/comprehensive-metabolic-panel-without-co2-alt-and-glomerular-filtration-rate-estimated-egfr?cc=MASTER",
    "fastingStatus": "required",
    "fastingInstructions": "Fasting specimen requested by Quest."
  }
];
const known=new Set(window.SEED_TESTS.map(t=>String(t.testCode||'').trim()));for(const t of additions){if(!known.has(t.testCode)){window.SEED_TESTS.push(t);known.add(t.testCode);}}})();
