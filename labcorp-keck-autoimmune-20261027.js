/* Follow-up Keck requisition 2026-10-27: six tests covered by five Labcorp order codes.
 * SS-A/SS-B are combined within 012708. 006338 reports separate Sm and RNP,
 * not the same as an Sm/RNP complex antibody; warning is retained in the test.
 * Requisition numbers 86235 and 85652 are CPT, not orderable Labcorp codes.
 * Duplicate-safe and free of all patient-identifying information.
 */
(()=>{'use strict';if(!Array.isArray(window.SEED_TESTS))return;const additions=[
  {
    "id": "labcorp-018705",
    "testCode": "018705",
    "testName": "Antiscleroderma-70 Antibodies (Scl-70, IgG)",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "alternativeContainer": "Red Top serum",
    "transportContainer": "SST / Gold (spun)",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "0.5 mL",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "stability": "Room temperature 14 days; refrigerated 14 days; frozen 14 days",
    "spin": "Yes",
    "specialInstructions": "Semi-quantitative IgG anti-Scl70 antibodies. Gel barrier or red-top serum accepted. Reject hemolysis, icterus, lipemia or bacterial contamination. Not an ANA reflex panel.",
    "status": "active",
    "source": "Labcorp official directory https://www.labcorp.com/tests/018705/antiscleroderma-70-antibodies"
  },
  {
    "id": "labcorp-006338",
    "testCode": "006338",
    "testName": "Antiextractable Nuclear Antigens (Anti-Sm and Anti-RNP, IgG)",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "alternativeContainer": "Red Top serum",
    "transportContainer": "SST / Gold (spun)",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "0.5 mL",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "stability": "Room temperature 14 days; refrigerated 14 days; frozen 14 days",
    "spin": "Yes",
    "specialInstructions": "IMPORTANT DIFFERENCE: Labcorp code 006338 reports separate anti-Sm and anti-RNP IgG antibodies, rather than the combined Sm/RNP complex antibody requested on the outside requisition. Do not treat this as an exact substitute for Quest 38567. Verify the provider's intended assay with Labcorp. For an additional Sm/RNP complex result, a broader Labcorp 164920 panel contains that component but adds other analytes; confirm order before collection.",
    "status": "active",
    "source": "Labcorp official directory https://www.labcorp.com/tests/006338/antiextractable-nuclear-antigens"
  },
  {
    "id": "labcorp-164814",
    "testCode": "164814",
    "testName": "Anticentromere B Antibodies (IgG)",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "alternativeContainer": "Red Top serum",
    "transportContainer": "SST / Gold (spun)",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "0.3 mL",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "stability": "Room temperature 14 days; refrigerated 14 days; frozen 14 days",
    "spin": "Yes",
    "specialInstructions": "Anti-centromere B by multiplex flow immunoassay. Reject gross hemolysis, icterus, lipemia, or bacterial contamination. Confirm current service-area availability.",
    "status": "active",
    "source": "Labcorp official directory https://www.labcorp.com/tests/164814/anticentromere-b-antibodies"
  },
  {
    "id": "labcorp-012708",
    "testCode": "012708",
    "testName": "Sjögren's Antibodies (Anti-SS-A/Ro and Anti-SS-B/La, IgG)",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "alternativeContainer": "Red Top serum",
    "transportContainer": "SST / Gold (spun)",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "0.5 mL",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "stability": "Room temperature 14 days; refrigerated 14 days; frozen 14 days",
    "spin": "Yes",
    "specialInstructions": "ONE LAB CORP ORDERABLE PANEL contains BOTH anti-SS-A/Ro IgG and anti-SS-B/La IgG. The requisition lists these separately; ensure both are actually ordered and do not add this same panel twice. Gel barrier or red-top serum accepted. Reject hemolysis, icterus, lipemia, bacterial contamination.",
    "status": "active",
    "source": "Labcorp official directory https://www.labcorp.com/tests/012708/sj-gren-s-antibodies-anti-ss-a-anti-ss-b"
  },
  {
    "id": "labcorp-005215",
    "testCode": "005215",
    "testName": "Erythrocyte Sedimentation Rate (ESR)",
    "specimenType": "Whole Blood",
    "drawContainer": "Lavender EDTA",
    "alternativeContainer": "",
    "transportContainer": "Lavender EDTA (original tube)",
    "preferredVolume": "Tube fill capacity",
    "minimumVolume": "2 mL whole blood",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "stability": "Refrigerated 24 hours",
    "spin": "No",
    "specialInstructions": "Invert lavender EDTA tube immediately 8–10 times. Submit ORIGINAL CLOSED whole-blood tube. Do not centrifuge, separate or transfer. Refrigerate for transport. Reject clotted, hemolyzed, underfilled, mislabeled, frozen or >24-hour-old specimens. Keep apart from Quest ESR room-temperature workflow.",
    "status": "active",
    "source": "Labcorp official directory https://www.labcorp.com/tests/005215/erythrocyte-sedimentation-rate"
  }
];
const known=new Set(window.SEED_TESTS.map(t=>String(t.testCode||'').trim()));for(const t of additions){if(!known.has(t.testCode)){window.SEED_TESTS.push(t);known.add(t.testCode)}}})();
