/* Quest additions verified 2026-10-23. Loaded after data.js and before app.js.
 * Existing records, including locally blocked 1635, are not modified.
 * Test codes remain unique and locally defined STAT rules are unchanged.
 */
(() => {
  'use strict';
  if (!Array.isArray(window.SEED_TESTS)) return;
  const existing = new Set(window.SEED_TESTS.map(test => String(test.testCode || '').trim()));
  const additions = [
  {
    "id": "quest-37960-20261023",
    "testCode": "37960",
    "testName": "Culture, Fungus, Miscellaneous",
    "specimenType": "Other clinical specimen",
    "drawContainer": "Sterile cup",
    "alternativeContainer": "Amies swab transport (for swab specimens)",
    "transportContainer": "Sterile cup",
    "preferredVolume": "Varies: 1 swab, 1–3 mL fluid, 2 mL sputum, 10 mL urine or tissue",
    "minimumVolume": "Varies by specimen (5 mL urine; 1 mL fluid; 1 swab)",
    "transportTemperature": "Mixed",
    "transportTemperatureRaw": "Raw specimens: refrigerated; swabs in Amies: room temperature; suspected Histoplasma capsulatum: room temperature",
    "stability": "Raw sterile specimens: up to 72 h refrigerated (urine: 48 h); swabs: 72 h room temperature; do not freeze",
    "spin": "No",
    "specialInstructions": "MULTIPLE COLLECTION PATHS. For raw abscess, fluid, CSF, sputum, tissue, or urine, collect in a sterile leak-proof container and refrigerate (except suspected H. capsulatum: room temperature). For swab sites, use an Amies liquid/gel or ESwab transport device and submit the original device at room temperature. Choose the correct collection path and temperature for the specimen; do not group differently handled specimen types into the same bag. No stool, skin, hair, nails, alcohol/formalin, viral media, or 24-hour urine. Confirm code availability by service area.",
    "source": "Quest Test Directory 2026-10-23 https://testdirectory.questdiagnostics.com/test/test-detail/37960/?cc=MASTER",
    "status": "active",
    "sourceRow": null
  },
  {
    "id": "quest-18881-20261023",
    "testCode": "18881",
    "testName": "Culture, Aerobic Bacteria with Gram Stain",
    "specimenType": "Swab",
    "drawContainer": "Amies Gel Bacterial Swab Transport",
    "alternativeContainer": "Sterile cup for wound drainage / abscess / aspirate",
    "transportContainer": "Amies Gel Bacterial Swab Transport",
    "preferredVolume": "1 swab from wound, abscess, aspirate or drainage",
    "minimumVolume": "1 swab",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Confirm current local service-area handling for wound drainage or sterile-container submissions",
    "stability": "Verify local service-area stability; frozen unacceptable",
    "spin": "No",
    "specialInstructions": "Collect wounds, abscesses, aspirates or drainage with Amies liquid/gel swab or ESwab; submit original swab medium. Alternatively submit suitable drainage or aspirate in a sterile leak-proof container or capped needle-free syringe, with specimen source labeled. Dry swabs, formalin, molecular transport media, oral swabs and wood-shafted/cotton/calcium-alginate swabs are unacceptable. Deep wounds or suspected anaerobes need aerobic/anaerobic culture instead. Confirm local transport temperature for the specimen type.",
    "source": "Quest IntelliTest Manager https://intellitestmanager.questdiagnostics.com/home/output/222669",
    "status": "active",
    "sourceRow": null
  },
  {
    "id": "quest-32114-20261023",
    "testCode": "32114",
    "testName": "Salmonella/Shigella Cult, Campy EIA and Shiga Toxin reflex E.coli O157 Cult",
    "specimenType": "Stool",
    "drawContainer": "Sterile cup",
    "alternativeContainer": "",
    "transportContainer": "Cary-Blair Stool Culture Transport Vial",
    "preferredVolume": "1 g stool in modified Cary-Blair",
    "minimumVolume": "1 g",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room temperature",
    "stability": "4 days room temperature or refrigerated; frozen unacceptable",
    "spin": "No",
    "specialInstructions": "Collect stool in a clean, dry sterile cup, then transfer to modified Cary-Blair transport medium. Submit the Cary-Blair vial, not raw stool. Do not freeze. Dry rectal swabs, other transport media, and yellow-discolored Cary-Blair are unacceptable. Includes Salmonella/Shigella culture, Campylobacter antigen EIA, and Shiga toxin EIA with conditional E. coli O157 reflex.",
    "source": "Quest Test Directory 2026-10-23 https://testdirectory.questdiagnostics.com/test/test-detail/32114/?cc=MASTER",
    "status": "active",
    "sourceRow": null
  },
  {
    "id": "quest-15433-20261023",
    "testCode": "15433",
    "testName": "Thyroid Panel with TSH (REFL)",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "alternativeContainer": "",
    "transportContainer": "SST / Gold (spun)",
    "preferredVolume": "2 mL serum",
    "minimumVolume": "",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room temperature",
    "stability": "Room temperature 7 days; refrigerated 7 days; frozen 28 days",
    "spin": "Yes",
    "specialInstructions": "Contains T3 uptake, total T4, and TSH. Client-specific reflex test: reflex criteria are predetermined by the ordering physician; additional testing may be billed. Plasma unacceptable. Allow blood to clot and centrifuge; submit spun SST. Confirm code availability by service area.",
    "source": "Quest Test Directory 2026-10-23 https://testdirectory.questdiagnostics.com/test/test-detail/15433/?cc=MASTER",
    "status": "active",
    "sourceRow": null
  },
  {
    "id": "quest-28882-20261023",
    "testCode": "28882",
    "testName": "Iron, Total and Total Iron Binding Capacity (REFL)",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "alternativeContainer": "Green Top Heparin (plasma)",
    "transportContainer": "SST / Gold (spun)",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "0.5 mL",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room temperature",
    "stability": "Room temperature 6 days; refrigerated 7 days; frozen 28 days",
    "spin": "Yes",
    "specialInstructions": "Collect in the morning from a fasting patient. Client-specific reflex criteria are predefined by the ordering physician; additional testing may be billed. Includes iron, TIBC and calculated % saturation. Hemolysis and anticoagulants other than heparin are unacceptable. Spun SST is preferred for serum; green-top heparin plasma is an alternative. Confirm code availability by service area.",
    "fastingStatus": "required",
    "fastingInstructions": "Morning specimen from a fasting patient.",
    "source": "Quest Test Directory 2026-10-23 https://testdirectory.questdiagnostics.com/test/test-detail/28882/?cc=MASTER",
    "status": "active",
    "sourceRow": null
  }
];
  additions.forEach(test => {
    if (!existing.has(test.testCode)) {
      window.SEED_TESTS.push(test);
      existing.add(test.testCode);
    }
  });
})();
