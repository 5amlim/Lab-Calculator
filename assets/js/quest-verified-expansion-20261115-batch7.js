/* Quest verified additions November 15, 2026 batch 7.
 * Distinguish CSF from synovial fluid; group only matching original sterile cups,
 * keep whole blood unspun, and never combine paired serum with CSF.
 * No slides, smears, acid preservatives, or specialty unsupported collection kits.
 */
(()=>{'use strict';
 if(!Array.isArray(window.SEED_TESTS))return;
 const additions=[
  {
    "id": "quest-verified-20261115-batch7-1687",
    "testCode": "1687",
    "testName": "LD, CSF",
    "specimenType": "CSF",
    "drawContainer": "Sterile cup",
    "transportContainer": "Sterile cup",
    "preferredVolume": "1 mL CSF",
    "minimumVolume": "0.5 mL",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "stability": "Room 7 days; refrigerated 48 hours; frozen unacceptable",
    "spin": "No",
    "specialLabeling": "Label CSF, collection date and time",
    "specialInstructions": "PROVIDER-COLLECTED CSF ONLY. Collect CSF without additives in a sterile leakproof screw-cap cup and submit the original container at room temperature. Label CSF, date and time. Keep CSF separate from other body fluids and collection times. Do not freeze. Verify the receiving Quest service-area code and handling.",
    "status": "active",
    "source": "Quest official test directory, reviewed 2026-11-15 • https://testdirectory.questdiagnostics.com/test/test-detail/1687/ld-csf?cc=MASTER"
  },
  {
    "id": "quest-verified-20261115-batch7-17320",
    "testCode": "17320",
    "testName": "Anaplasma phagocytophilum DNA, Qualitative Real-Time PCR",
    "specimenType": "Whole Blood",
    "drawContainer": "Lavender EDTA",
    "transportContainer": "Lavender EDTA",
    "preferredVolume": "0.7 mL whole blood",
    "minimumVolume": "0.3 mL",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated (cold packs)",
    "stability": "Whole blood: room 48 hours; refrigerated 7 days",
    "spin": "No",
    "specialInstructions": "Collect EDTA whole blood in lavender tube, invert gently, leave unspun and submit the original tube refrigerated on cold packs. ACD yellow is an alternative, but the supported default is EDTA. Do not transfer or freeze whole blood. Reject heparin anticoagulant and hemolyzed specimens. Do not use the tick-in-ethanol alternative.",
    "status": "active",
    "source": "Quest official test directory, reviewed 2026-11-15 • https://testdirectory.questdiagnostics.com/test/test-detail/17320?cc=MASTER"
  },
  {
    "id": "quest-verified-20261115-batch7-39218",
    "testCode": "39218",
    "testName": "Borrelia Species DNA, Real-Time PCR, with Reflexes, Synovial Fluid/CSF",
    "specimenType": "CSF",
    "drawContainer": "Sterile cup",
    "transportContainer": "Sterile cup",
    "preferredVolume": "3 mL CSF",
    "minimumVolume": "0.5 mL",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated (cold packs)",
    "stability": "Room 72 hours; refrigerated 7 days; frozen 30 days",
    "spin": "No",
    "specialLabeling": "Label CSF, collection date and time",
    "specialInstructions": "PROVIDER-COLLECTED FLUID. Calculator defaults to CSF; Quest also accepts synovial fluid but the specimen source must match the physician order. Submit original unpreserved CSF sterile cup refrigerated, properly labeled as CSF. Never pool CSF with synovial fluid or other sources. Confirm receiving Quest service-area acceptance.",
    "status": "active",
    "source": "Quest official test directory, reviewed 2026-11-15 • https://testdirectory.questdiagnostics.com/test/test-detail/39218?cc=MASTER"
  },
  {
    "id": "quest-verified-20261115-batch7-34194",
    "testCode": "34194",
    "testName": "Lyme Disease Antibody Index for CNS Infection",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "transportContainer": "Serum Transport Tube",
    "preferredVolume": "2 mL serum and 2 mL CSF",
    "minimumVolume": "1 mL serum and 1 mL CSF",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "stability": "Room 7 days; refrigerated 14 days; frozen 30 days",
    "spin": "Yes",
    "specialLabeling": "Label serum and CSF separately with collection date and time",
    "specialInstructions": "TWO PAIRED SPECIMENS REQUIRED within 24 hours: serum AND CSF. Collect SST, clot and centrifuge; transfer 2 mL serum into labeled Serum Transport Tube at room temperature. Separately collect 2 mL provider-collected CSF in sterile cup, submit original cup at room temperature. Label source/date/time on both. Never combine serum with CSF. Quest rejects pairs collected more than 24 hours apart; review the paired draw times before sendout.",
    "additionalDrawRequirements": [
      {
        "container": "Sterile cup",
        "specimenType": "CSF",
        "count": 1,
        "purpose": "Paired CSF required within 24 hours of serum collection",
        "preferredVolume": "2 mL CSF",
        "minimumVolume": "1 mL",
        "transportContainer": "Sterile cup",
        "transportTemperature": "Room Temperature",
        "spin": "No",
        "specialInstructions": "Submit original CSF sterile cup with CSF label, collection date and time. Serum and CSF must be collected within 24 hours."
      }
    ],
    "status": "active",
    "source": "Quest official test directory, reviewed 2026-11-15 • https://testdirectory.questdiagnostics.com/test/test-detail/34194/lyme-disease-antibody-index-for-cns-infection?cc=MASTER"
  },
  {
    "id": "quest-verified-20261115-batch7-93795",
    "testCode": "93795",
    "testName": "Borrelia miyamotoi DNA, Real-Time PCR, Miscellaneous",
    "specimenType": "CSF",
    "drawContainer": "Sterile cup",
    "transportContainer": "Sterile cup",
    "preferredVolume": "1 mL CSF",
    "minimumVolume": "0.3 mL",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated (cold packs)",
    "stability": "CSF room 48 hours; refrigerated 7 days; frozen 30 days",
    "spin": "No",
    "specialLabeling": "Label CSF, collection date and time",
    "specialInstructions": "PROVIDER-COLLECTED CSF. Quest accepts CSF or synovial fluid; calculator defaults to CSF collected in a sterile leakproof screw-cap cup. Submit original CSF cup refrigerated, labeled by precise specimen source, date and time. Do not pool CSF and synovial specimens. EDTA whole blood is a Quest alternate route but requires a separate specimen-specific order review.",
    "status": "active",
    "source": "Quest official test directory, reviewed 2026-11-15 • https://testdirectory.questdiagnostics.com/test/test-detail/93795?cc=MASTER"
  }
];
 const known=new Set(window.SEED_TESTS.map(t=>String(t.testCode||'').trim()));
 for(const t of additions){
   if(known.has(t.testCode))continue;
   window.SEED_TESTS.push(t);
   known.add(t.testCode);
 }
})();
