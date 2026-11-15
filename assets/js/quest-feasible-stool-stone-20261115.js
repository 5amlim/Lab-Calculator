/* Additional slide-free Quest MASTER tests with official specimen requirements checked Nov 15, 2026.
 * The Quest directory varies by service area, including availability of the unpreserved urine route.
 */
(()=>{'use strict';if(!Array.isArray(window.SEED_TESTS))return;
const records=[
  {
    "id": "quest-master-30260-verified-20261115",
    "status": "active",
    "testCode": "30260",
    "testName": "Stone Analysis with Image",
    "specimenType": "Dry Stone",
    "drawContainer": "Sterile cup",
    "transportContainer": "Sterile cup",
    "preferredVolume": "Dry stone(s)",
    "minimumVolume": "One dry stone or stone fragments",
    "transportTemperature": "Room Temperature",
    "stability": "Room temperature: 1 year; refrigerated: 1 year; frozen: 1 year.",
    "spin": "No",
    "specialInstructions": "Collect retrieved stone in a sterile plastic screw-cap container. Wash blood or debris off with water and air dry thoroughly for approximately 24 hours before sealing. Do not send in liquid, formalin, surgical gel, transport medium, on a filter, or attached to a Q-tip. Identify anatomical source and separately package any stones requiring individual analysis. The 'with Image' refers to Quest's stone report, NOT a glass-slide specimen.",
    "source": "Quest official test directory, checked 2026-11-15 • https://testdirectory.questdiagnostics.com/test/test-detail/30260/stone-analysis-with-image?cc=MASTER"
  },
  {
    "id": "quest-master-8831-verified-20261115",
    "status": "active",
    "testCode": "8831",
    "testName": "Chloride, Feces",
    "specimenType": "Watery Liquid Stool",
    "drawContainer": "Sterile cup",
    "transportContainer": "Sterile cup",
    "preferredVolume": "10 mL liquid stool",
    "minimumVolume": "2 mL liquid stool",
    "transportTemperature": "Frozen",
    "stability": "Room temperature unacceptable; refrigerated 7 days; frozen 60 days.",
    "spin": "No",
    "specialInstructions": "WATERY LIQUID STOOL ONLY. Collect in clean plastic leakproof screw-cap sterile cup, keep refrigerated during collection, then freeze and transport FROZEN on dry ice. Formed stool is unacceptable and submitted refrigerated specimens are rejected. Keep frozen for transport. Confirm local frozen shipment service.",
    "source": "Quest official test directory, checked 2026-11-15 • https://testdirectory.questdiagnostics.com/test/test-detail/8831/chloride-feces?cc=MASTER"
  },
  {
    "id": "quest-master-968-verified-20261115",
    "status": "active",
    "testCode": "968",
    "testName": "Osmolality, Feces",
    "specimenType": "Watery Liquid Stool",
    "drawContainer": "Sterile cup",
    "transportContainer": "Sterile cup",
    "preferredVolume": "1 mL watery liquid stool",
    "minimumVolume": "0.2 mL",
    "transportTemperature": "Frozen",
    "stability": "Room temperature unacceptable; refrigerated 48 hours; frozen 60 days.",
    "spin": "No",
    "specialInstructions": "WATERY LIQUID STOOL ONLY. Collect in a clean plastic leakproof screw-cap sterile cup. Freeze promptly and transport FROZEN on dry ice to reduce odor and prevent rupture from gas buildup. Do not submit formed stool; Quest will reject it. Confirm local frozen shipment service.",
    "source": "Quest official test directory, checked 2026-11-15 • https://testdirectory.questdiagnostics.com/test/test-detail/968/osmolality-feces?cc=MASTER"
  },
  {
    "id": "quest-master-706-verified-20261115",
    "status": "active",
    "testCode": "706",
    "testName": "Rotavirus Antigen Detection",
    "specimenType": "Fresh Stool",
    "drawContainer": "Sterile cup",
    "transportContainer": "Sterile cup",
    "preferredVolume": "5 mL stool or 5 g stool",
    "minimumVolume": "1 mL stool or 1 g stool",
    "transportTemperature": "Frozen",
    "stability": "Room temperature unacceptable; refrigerated 72 hours; frozen 30 days.",
    "spin": "No",
    "specialInstructions": "Collect fresh stool in a clean, dry, sterile leakproof screw-cap cup WITHOUT any media, preservative or additive. If using a diaper, line it with clean plastic and transfer stool to the cup; do NOT submit the diaper. A rectal swab with visible stool is a separate allowable specimen path, but the calculator plans a direct stool-cup submission only. Ship frozen on dry ice. Confirm local acceptance.",
    "source": "Quest official test directory, checked 2026-11-15 • https://intellitestmanager.questdiagnostics.com/home/output/204035"
  },
  {
    "id": "quest-master-14578-verified-20261115",
    "status": "active",
    "testCode": "14578",
    "testName": "Calcium, Random Urine without Creatinine",
    "specimenType": "Random Urine",
    "drawContainer": "Sterile cup",
    "transportContainer": "Sterile cup",
    "preferredVolume": "10 mL unpreserved urine",
    "minimumVolume": "2 mL",
    "transportTemperature": "Refrigerated",
    "stability": "Unpreserved urine: refrigerated 5 weeks; frozen 6 months. Room stability listed for general specimen, not the selected unpreserved shipping route.",
    "spin": "No",
    "specialInstructions": "Use Quest's explicitly listed UNPRESERVED random-urine alternative. Collect in a sterile plastic screw-cap cup without acid or other preservative and ship REFRIGERATED on cold packs, NOT the acidified room-temperature default. Do not adjust pH with HCl. This test is not available in every Quest service area; verify that the receiving laboratory accepts the unpreserved refrigerated route before collecting.",
    "source": "Quest official test directory, checked 2026-11-15 • https://testdirectory.questdiagnostics.com/test/test-detail/14578/calcium-random-urine-without-creatinine?cc=MASTER"
  }
];
const known=new Set(window.SEED_TESTS.map(t=>String(t.testCode||'').trim()));
for(const record of records){if(!known.has(record.testCode)){window.SEED_TESTS.push(record);known.add(record.testCode);}}
})();
