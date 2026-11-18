/* Requested pediatric Quest tests from screenshot, reviewed 2026-11-17.
 * Keep four acid-preservation/service-area-dependent urine tests review-only.
 * Activate the CSF route using verified Quest volume/container/temperature,
 * with procedural-clinician and receiving-account confirmation.
 * Never overwrite any existing active or Do Not Perform record.
 */
(()=>{'use strict';if(!Array.isArray(window.SEED_TESTS))return;
const additions=[
  {
    "id": "quest-pediatric-reviewed-20261117-11216",
    "testCode": "11216",
    "testName": "Calcium, Pediatric Urine with Creatinine",
    "status": "reference",
    "specimenType": "Urine",
    "drawContainer": "Sterile cup",
    "transportContainer": "Plastic urine container (6N HCl preserved)",
    "preferredVolume": "2 mL second-morning void urine",
    "minimumVolume": "0.5 mL urine",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature, with approved 6N HCl preservation; local acceptance must be confirmed",
    "spin": "No",
    "stability": "Room: 5 days; refrigerated: 35 days; frozen: 6 months (per Quest directory)",
    "specialLabeling": "Label URINE · SECOND-MORNING VOID · PRESERVATION STATUS",
    "specialInstructions": "VERIFICATION REQUESTED. Official Quest code and specimen details verified. Second-morning void urine. Quest instructs adjustment to pH below 2.0 using 6N HCl BEFORE aliquoting for calcium; this is NOT a normal unpreserved sterile-cup transport route. Quest also lists an alternate urine transport option with ambiguous preservative wording. Do not collect as routine onsite until the serving Quest laboratory confirms test availability, its approved preservative kit, the responsible processing location, and acceptable transport. Do not handle or add concentrated hydrochloric acid without an approved trained workflow. Quest directory notes not offered at Nichols IFD San Juan Capistrano.",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/11216/calcium-pediatric-urine-with-creatinine?cc=MASTER",
    "clinicalCategories": [
      "renal",
      "urinary"
    ],
    "searchAliases": [
      "pediatric urine calcium creatinine ratio",
      "Ca Cr ratio child",
      "hypercalciuria pediatric urine"
    ],
    "preparationInstructions": "Second morning void urine. Confirm approved preservative requirements with Quest before booking."
  },
  {
    "id": "quest-pediatric-reviewed-20261117-11220",
    "testCode": "11220",
    "testName": "Magnesium, Pediatric Urine",
    "status": "reference",
    "specimenType": "Urine",
    "drawContainer": "Sterile cup",
    "transportContainer": "Verify Official Instructions",
    "preferredVolume": "Quest service-area confirmation required",
    "minimumVolume": "Not published in general directory",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Not specified",
    "transportTemperatureRaw": "Service-area details not published under general Quest directory",
    "spin": "No",
    "specialLabeling": "Label URINE · SECOND-MORNING VOID (verify)",
    "specialInstructions": "VERIFICATION REQUESTED. Quest confirms test code 11220 and includes urine creatinine, but its public directory suppresses preferred volume, minimum volume, transport container, temperature and processing steps pending selection of a service area. A separate Quest-linked listing describes second-morning urine and adjustment to pH below 3.0 using 6N HCl before aliquoting; do not assume this is a collection instruction for our local Quest account. Obtain service-area-specific written instructions and an approved preservation process before making this test selectable. No in-clinic acidification without training and an approved method. Quest excludes Nichols IFD San Juan Capistrano and Chantilly.",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/11220/magnesium-pediatric-urine?cc=MASTER&p=r",
    "clinicalCategories": [
      "renal",
      "urinary"
    ],
    "searchAliases": [
      "pediatric urine magnesium",
      "magnesium creatinine ratio child",
      "urinary Mg pediatric"
    ]
  },
  {
    "id": "quest-pediatric-reviewed-20261117-11222",
    "testCode": "11222",
    "testName": "Oxalic Acid, Pediatric Urine with Creatinine",
    "status": "reference",
    "specimenType": "Urine",
    "drawContainer": "Sterile cup",
    "transportContainer": "Sterile screw-cap vial (6N HCl-preserved urine)",
    "preferredVolume": "10 mL second-morning urine",
    "minimumVolume": "3 mL urine",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature after approved acidification",
    "spin": "No",
    "stability": "Room: 7 days; refrigerated: 7 days; frozen: 24 days",
    "specialLabeling": "Label URINE · SECOND-MORNING VOID · ACID PRESERVED",
    "specialInstructions": "VERIFICATION REQUESTED. Quest specifies second-morning urine collected in a sterile leakproof plastic container and acidified with 6N HCl to pH below 3.0 BEFORE aliquoting into a sterile screw-cap submission vial. This is a chemically preserved specimen, not a standard sterile-cup/transport-tube route. Do not collect onsite unless the serving Quest account confirms orderability, the approved preservative kit/processing method, and who performs the acidification. Never add 6N HCl onsite without approved trained procedures. Quest directory flags this code not offered at Nichols IFD San Juan Capistrano.",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/11222/oxalic-acid-pediatric-urine-with-creatinine?cc=MASTER&p=r",
    "clinicalCategories": [
      "renal",
      "urinary"
    ],
    "searchAliases": [
      "oxalate pediatric urine creatinine",
      "hyperoxaluria child",
      "urine oxalic acid ratio pediatric"
    ],
    "preparationInstructions": "Second-morning urine. Preservation with 6N HCl requires receiving laboratory approval."
  },
  {
    "id": "quest-pediatric-reviewed-20261117-18420",
    "testCode": "18420",
    "testName": "Pediatric Autoimmune Encephalitis Evaluation with Reflexes, CSF",
    "status": "active",
    "specimenType": "CSF",
    "drawContainer": "Sterile cup",
    "transportContainer": "Sterile cup",
    "preferredVolume": "2 mL CSF",
    "minimumVolume": "1.2 mL CSF",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "stability": "Room: 7 days; refrigerated: 14 days; frozen: 21 days",
    "specialLabeling": "",
    "specialInstructions": "CSF must be obtained by a qualified procedural clinician. Collect 2 mL (minimum 1.2 mL) into ONE sterile leakproof plastic screw-cap collection container (Sterile cup in the calculator); submit the original capped container at room temperature with no spin or transfer. Quest rejects visible particulate matter. This pediatric reflex panel may add testing and additional charges after positive screens. Confirm local Quest account/service-area acceptance and the appropriate CSF collection/transport arrangements BEFORE collecting; Quest directory notes it is not offered at Nichols IFD San Juan Capistrano. Never substitute serum for CSF.",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/18420/pediatric-autoimmune-encephalitis-evaluation-with-reflexes-csf?cc=MASTER",
    "clinicalCategories": [
      "neurology",
      "autoimmune",
      "immunology"
    ],
    "searchAliases": [
      "pediatric autoimmune encephalitis csf",
      "child encephalitis antibody spinal fluid",
      "NMDAR1 MOG AQP4 CRMP5 GAD65 CSF pediatric"
    ]
  },
  {
    "id": "quest-pediatric-reviewed-20261117-11215",
    "testCode": "11215",
    "testName": "Phosphate, Pediatric Urine with Creatinine",
    "status": "reference",
    "specimenType": "Urine",
    "drawContainer": "Sterile cup",
    "transportContainer": "Plastic urine container (preservation to verify)",
    "preferredVolume": "2 mL second-morning urine",
    "minimumVolume": "0.5 mL urine",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Unpreserved refrigerated (cold packs) if specifically approved by receiving Quest laboratory; preserved specimen room temperature",
    "spin": "No",
    "stability": "Unpreserved room: 48 hours; refrigerated: 7 days; frozen: 28 days. Preserved room/refrigerated/frozen: 6 months",
    "specialLabeling": "Label URINE · SECOND-MORNING VOID · PRESERVATION STATUS",
    "specialInstructions": "VERIFICATION REQUESTED. Quest specifies 2 mL second-morning urine (minimum 0.5 mL) and acid adjustment to pH below 3.0 with 6N HCl prior to aliquoting for phosphate testing. It also lists an alternative refrigerated unpreserved route, but the preservative-tube wording is inconsistent. Do not assume plain sterile-cup submission is accepted until the serving Quest laboratory confirms exact unpreserved collection tube and refrigerated shipping method OR provides an approved acid-preservation workflow. Do not add concentrated acid onsite without approved training. Nichols IFD San Juan Capistrano does not offer the code.",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/11215/phosphate-pediatric-urine-with-creatinine?cc=MASTER&p=r",
    "clinicalCategories": [
      "renal",
      "urinary"
    ],
    "searchAliases": [
      "phosphorus pediatric urine creatinine",
      "pediatric urinary phosphate",
      "urine phosphate to creatinine child"
    ],
    "preparationInstructions": "Second-morning urine. Confirm approved preserved or refrigerated unpreserved route with Quest."
  }
];
for (const incoming of additions) {
  const existing=window.SEED_TESTS.find(t=>String(t.testCode||'').trim()===incoming.testCode);
  if(!existing) {window.SEED_TESTS.push(incoming);continue;}
  if(existing.status==='reference'||existing.status==='pending')
    Object.assign(existing,incoming,{id:existing.id||incoming.id});
}
})();
