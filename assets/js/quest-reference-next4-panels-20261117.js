/* Quest verified standalone 24-hour urine and motor neuropathy, plus component-audited post-COVID panels.
 * Four new Quest codes, reviewed 2026-11-17. Preserves original SST, nonpreserved urine
 * aliquot, yellow-top UA tube and matched serum/plasma routes.
 * No overwriting active / blocked entries. */
(()=>{'use strict';if(!Array.isArray(window.SEED_TESTS))return;
const additions=[
  {
    "id": "quest-source-reviewed-20261117-next-11013",
    "status": "active",
    "testCode": "11013",
    "testName": "Sulfate, Urine",
    "specimenType": "24-Hour Urine",
    "drawContainer": "24-Hour Urine Container",
    "alternativeContainer": "",
    "transportContainer": "Sterile cup",
    "preferredVolume": "4 mL from well-mixed 24-hour urine",
    "minimumVolume": "1 mL urine aliquot",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "specialLabeling": "Label 24-HOUR URINE · STERILE CUP ALIQUOT",
    "specialInstructions": "Collect a COMPLETE 24-hour urine in a clean leak-proof 24-Hour Urine Container with NO preservative. Refrigerate throughout collection. At completion record total 24-hour volume and start/end times. Thoroughly mix, then transfer 4 mL (minimum 1 mL) into a NEW leak-proof plastic Sterile cup for submission, label 24-HOUR URINE and total volume. Send aliquot REFRIGERATED in the refrigerated bag; do not use gray urine-culture tube, acid or other preservative. The source jug is a collection container, not the submitted aliquot. Confirm Quest service-area code acceptance; MASTER warns not offered at San Juan Capistrano.",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/11013/sulfate-urine?cc=MASTER",
    "stability": "Unpreserved urine: room temperature unacceptable; refrigerated 14 days; frozen 14 days",
    "collectionType": "24-hour",
    "searchAliases": [
      "sulfate 24 hour urine",
      "urinary sulfate",
      "urine sulfate excretion"
    ],
    "clinicalCategories": [
      "renal",
      "metabolic",
      "urinary"
    ],
    "preparationInstructions": "24-hour urine collection: keep refrigerated; do not add preservative. Record total volume and start/end times."
  },
  {
    "id": "quest-source-reviewed-20261117-next-90137",
    "status": "active",
    "testCode": "90137",
    "testName": "Motor Neuropathy Complete Antibody Panel",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "alternativeContainer": "",
    "transportContainer": "Transport Tube",
    "preferredVolume": "5 mL serum",
    "minimumVolume": "2 mL serum",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "Yes",
    "specialLabeling": "Label SERUM",
    "specialInstructions": "Paired SPECIMENS REQUIRED: 5 mL serum preferred (minimum 2 mL) from spun SST, TRANSFER to a plain plastic Transport Tube and REFRIGERATE; use the established 2.5-mL Gold or 4-mL Tiger SST serum-yield estimates. ALSO collect 25 mL random unpreserved urine (minimum 10 mL) in a dedicated, original leak-proof plastic Sterile cup; REFRIGERATE. Serum and urine must be in SEPARATE labeled containers, never mixed; do not add urine preservative or submit urine culture gray-top. Overnight fasting is preferred, NOT required. Quest MASTER says not offered at San Juan Capistrano and an Aug 2025 update is Erie-specific; confirm local Quest account orderability before offering.",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/90137/motor-neuropathy-complete-antibody-panel?cc=MASTER",
    "usePreferredSerumYield": true,
    "searchAliases": [
      "motor neuropathy ganglioside panel",
      "GM1 ganglioside serum urine",
      "motor peripheral neuropathy antibodies"
    ],
    "clinicalCategories": [
      "neurology",
      "autoimmune",
      "immunology",
      "urinary"
    ],
    "stability": "Serum refrigerated 7 days, frozen 30 days; urine refrigerated 7 days, frozen 30 days; serum room temperature received not accepted",
    "preparationInstructions": "Overnight fasting preferred, but not mandatory. Submit both refrigerated serum and random urine.",
    "additionalDrawRequirements": [
      {
        "container": "Sterile cup",
        "count": 1,
        "submissionCount": 1,
        "specimenType": "Urine",
        "purpose": "RANDOM URINE · ORIGINAL STERILE CUP",
        "preferredVolume": "25 mL unpreserved random urine",
        "minimumVolume": "10 mL random urine",
        "transportContainer": "Sterile cup",
        "transportTemperature": "Refrigerated",
        "transportTemperatureRaw": "Refrigerated",
        "spin": "No",
        "specialLabeling": "Label RANDOM URINE · ORIGINAL STERILE CUP",
        "specialInstructions": "Collect a separate urine specimen (random, unpreserved) into a dedicated plastic leak-proof Sterile cup, at least 25 mL preferred or 10 mL minimum. Submit the ORIGINAL cup refrigerated, do not pool with other urine tests or add preservative. This is the required urine immunofixation specimen."
      }
    ]
  },
  {
    "id": "quest-source-reviewed-20261117-next-11454",
    "status": "active",
    "testCode": "11454",
    "testName": "Post COVID-19 Panel",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "alternativeContainer": "",
    "transportContainer": "SST / Gold (spun)",
    "preferredVolume": "3 mL serum for TSH reflex, CRP, and Vitamin B12 in original SST",
    "minimumVolume": "1.7 mL combined serum for these three components",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "Yes",
    "specialLabeling": "Label SERUM · ORIGINAL SST",
    "specialInstructions": "Quest panel 11454 contains TSH with reflex free T4, CRP, vitamin D 25-OH immunoassay, vitamin B12, and complete urinalysis. COMPONENT-SPECIFIC PLAN: use an ORIGINAL spun SST at ROOM TEMPERATURE for TSH, CRP and B12 (3 mL preferred combined; minimums total 1.7 mL); a separate SST for vitamin D to be spun and transferred into a plain Transport Tube (0.8 mL preferred, minimum 0.5 mL) also ROOM TEMPERATURE. Collect an unpreserved urine specimen FIRST in a Sterile cup, then fill ONE yellow-top, blue fill line UA PRESERVATIVE TUBE (or verified red/yellow swirl alternative), submitted at ROOM TEMPERATURE. The UA tube is NOT a urine-culture tube. Gold/Tiger SST counts must follow serum yield. No panel-wide fasting requirement; Vitamin D fasting preferred but not required. Confirm receiving Quest service area, as MASTER says San Juan Capistrano does not offer this panel.",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/11454/post-covid-19-panel?cc=MASTER",
    "usePreferredSerumYield": true,
    "searchAliases": [
      "long covid basic panel",
      "post covid fatigue test",
      "COVID-19 follow-up panel"
    ],
    "clinicalCategories": [
      "infectious",
      "metabolic",
      "endocrinology",
      "urinary"
    ],
    "preparationInstructions": "No required fasting. Vitamin D component prefers fasting, but it is not mandatory.",
    "additionalDrawRequirements": [
      {
        "container": "SST / Gold",
        "count": 1,
        "submissionCount": 1,
        "specimenType": "Serum",
        "purpose": "SERUM · SST SOURCE",
        "preferredVolume": "0.8 mL serum",
        "minimumVolume": "0.5 mL serum",
        "transportContainer": "Transport Tube",
        "transportTemperature": "Room Temperature",
        "transportTemperatureRaw": "Room Temperature",
        "spin": "Yes",
        "specialLabeling": "Label SERUM · SST SOURCE",
        "specialInstructions": "A separately drawn SST specimen for Vitamin D. Clot, spin, transfer at least 0.5 mL (0.8 mL preferred) to ONE plain plastic Transport Tube and ship room temperature; do not count it as another original SST submission."
      },
      {
        "container": "Sterile cup",
        "count": 1,
        "submissionCount": 1,
        "specimenType": "Urine",
        "purpose": "URINE · UA PRESERVATIVE TUBE",
        "preferredVolume": "10 mL urine into UA tube",
        "minimumVolume": "3 mL preserved urine",
        "transportContainer": "Urinalysis Transport Tube (Yellow-Top, Blue Fill Line)",
        "transportTemperature": "Room Temperature",
        "transportTemperatureRaw": "Room Temperature",
        "spin": "No",
        "specialLabeling": "Label URINE · UA PRESERVATIVE TUBE",
        "specialInstructions": "Collect urine into a clean Sterile cup, transfer/fill the Yellow-Top UA Preservative Tube (Blue Fill Line) to its specified line, and submit the UA tube ROOM TEMPERATURE. A red/yellow swirl UA preservative tube is an accepted alternative if verified. DO NOT use gray urine-culture preservative tube."
      }
    ]
  },
  {
    "id": "quest-source-reviewed-20261117-next-11457",
    "status": "active",
    "testCode": "11457",
    "testName": "Post COVID-19 Rheumatological Panel",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "alternativeContainer": "",
    "transportContainer": "SST / Gold (spun)",
    "preferredVolume": "2 mL serum for rheumatoid factor and CK in original spun SST",
    "minimumVolume": "1 mL combined serum for RF and CK",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "Yes",
    "specialLabeling": "Label SERUM · ORIGINAL SST",
    "specialInstructions": "Quest panel contains RF, ANA with reflex titer/pattern, CCP antibody IgG, CK total, and cardiolipin IgA/IgG/IgM. For physically valid container routing, submit an ORIGINAL spun SST at ROOM TEMPERATURE with 2 mL preferred combined RF+CK; collect another SST SOURCE for 3 mL combined ANA, CCP, and cardiolipin SERUM, spin and transfer to ONE plain Transport Tube at ROOM TEMPERATURE. Serum is the explicit acceptable ALTERNATIVE to citrate plasma for cardiolipin; no extra light-blue citrate tube is modeled. Use SST Gold/Tiger yield planning and check sufficient serum. If separate CK isoenzymes are also ordered, Quest requires freezing for that assay combination and this plan needs receiving-lab review. No blanket fasting requirement. Quest MASTER says not offered at San Juan Capistrano, check receiving region.",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/11457/post-covid-19-rheumatological-panel?cc=MASTER",
    "usePreferredSerumYield": true,
    "searchAliases": [
      "long covid rheumatology",
      "post-COVID joint pain autoimmune panel",
      "ANA RF CCP cardiolipin CK"
    ],
    "clinicalCategories": [
      "rheumatology",
      "autoimmune",
      "inflammatory"
    ],
    "preparationInstructions": "No fasting specified by Quest for this panel.",
    "additionalDrawRequirements": [
      {
        "container": "SST / Gold",
        "count": 1,
        "submissionCount": 1,
        "specimenType": "Serum",
        "purpose": "SERUM · SST SOURCE",
        "preferredVolume": "3 mL serum for ANA, CCP, and cardiolipin",
        "minimumVolume": "1.5 mL combined serum",
        "transportContainer": "Transport Tube",
        "transportTemperature": "Room Temperature",
        "transportTemperatureRaw": "Room Temperature",
        "spin": "Yes",
        "specialLabeling": "Label SERUM · SST SOURCE",
        "specialInstructions": "Collect an additional SST specimen (use Gold/Tiger yield planning) for ANA (Quest 249), CCP IgG (11173), and cardiolipin serum alternative (7352). Clot and spin, transfer 3 mL preferred serum total into ONE plain Transport Tube at ROOM TEMPERATURE; no heparin or citrate is required for this verified serum alternative."
      }
    ]
  }
];
for(const candidate of additions){
  const prior=window.SEED_TESTS.find(t=>String(t.testCode||'').trim()===candidate.testCode);
  if(!prior){window.SEED_TESTS.push(candidate);continue;}
  if(prior.status==='reference'||prior.status==='pending')
    Object.assign(prior,candidate,{id:prior.id||candidate.id});
}
})();
