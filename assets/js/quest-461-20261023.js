/* Quest test 461, 2026-10-23: one new record, duplicate-safe. Load after data.js. */
(() => {
  'use strict';
  if (!Array.isArray(window.SEED_TESTS)) return;
  const record = {
  "id": "quest-461-20261023",
  "testCode": "461",
  "testName": "Fibrinogen Activity, Clauss",
  "specimenType": "Whole Blood",
  "drawContainer": "Light Blue Citrate",
  "alternativeContainer": "",
  "transportContainer": "No transfer unless directed",
  "preferredVolume": "1 full, unopened 3.2% sodium citrate light blue-top tube",
  "minimumVolume": "Full tube (frozen plasma alternative: 0.5 mL)",
  "transportTemperature": "Room Temperature",
  "transportTemperatureRaw": "Room temperature for unopened citrate tube; frozen for processed platelet-poor plasma alternative",
  "stability": "Confirm time limits with receiving Quest service area; room-temperature original tube or frozen plasma only per accepted workflow",
  "spin": "No",
  "specialInstructions": "Default: fill one 3.2% sodium citrate light blue-top tube to its fill line, invert gently, and submit the FULL, UNOPENED original tube at ROOM TEMPERATURE. Do not centrifuge or transfer for this route. Alternative if approved by the receiving lab: prepare platelet-poor citrated plasma by double centrifugation (1500 x g for 15 minutes each), transfer to plastic transport tube and freeze; 1 mL preferred, 0.5 mL minimum. Keep the frozen alternative in a separate frozen bag, not the room-temperature bag. Confirm acceptance, timing and shipment with Quest; code 461 is not offered at Nichols Institute (IFD), San Juan Capistrano.",
  "status": "active",
  "source": "Quest Test Directory 2026-10-23 https://testdirectory.questdiagnostics.com/test/test-detail/461/?cc=MASTER ; Quest Bleeding and Thrombosis Test Menu (2024) https://www.questdiagnostics.com/content/dam/corporate/unrestricted/documents/Bleeding-and-Thrombosis-Test-Menu.PDF",
  "sourceRow": null
};
  if (!window.SEED_TESTS.some(test => String(test.testCode || '').trim() === record.testCode)) {
    window.SEED_TESTS.push(record);
  }
})();
