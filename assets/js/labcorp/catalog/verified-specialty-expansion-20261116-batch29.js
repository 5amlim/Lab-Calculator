/* Official Labcorp verified sendout expansion, corrected duplicate-audited batch29.
 * Only codes absent from previous active catalogs (some previously pending) are activated.
 * Keep original verified/blocked records unchanged; preserve SST/transport separation.
 * Red-top or multiple-tube source alternatives require separate validated handling. */
(()=>{'use strict';if(!Array.isArray(window.SEED_TESTS))return;
const additions=[
  {
    "id": "labcorp-verified-20261116-batch29-corrected-520059",
    "testCode": "520059",
    "testName": "Anti-dsDNA (Double-stranded) Ab by Farr Method (RDL)",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "alternativeContainer": "",
    "transportContainer": "Transport Tube",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "0.3 mL serum",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "Yes",
    "stability": "Room 7 days; refrigerated 14 days; frozen 60 days",
    "specialLabeling": "Label serum, collection date and time",
    "specialInstructions": "Serum RDL Farr assay; separate from cells within ONE HOUR and transfer to a labeled plain plastic Transport Tube; refrigerate and ship with cold packs. Verify this code is accepted by the ordering Labcorp account and receiving service area.",
    "source": "Labcorp official test-specific directory, reviewed 2026-11-16 • https://www.labcorp.com/tests/520059/anti-dsdna-double-stranded-ab-by-farr-method-rdl",
    "searchAliases": [
      "dsdna farr",
      "anti ds dna farr",
      "lupus farr"
    ],
    "clinicalCategories": [
      "autoimmune",
      "immunology"
    ]
  },
  {
    "id": "labcorp-verified-20261116-batch29-corrected-520134",
    "testCode": "520134",
    "testName": "Anti-Fodrin Antibodies, IgG and IgA (RDL)",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "alternativeContainer": "",
    "transportContainer": "Transport Tube",
    "preferredVolume": "2 mL serum",
    "minimumVolume": "0.5 mL serum",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "Yes",
    "stability": "Room 7 days; refrigerated 14 days; frozen 60 days",
    "specialLabeling": "Label serum, collection date and time",
    "specialInstructions": "Serum only. Separate from cells within ONE HOUR and transfer to a labeled plastic Transport Tube; refrigerate and ship with cold packs. If frozen separately ordered tests are requested, Labcorp advises distinct frozen aliquots. Verify this code is accepted by the ordering Labcorp account and receiving service area.",
    "source": "Labcorp official test-specific directory, reviewed 2026-11-16 • https://www.labcorp.com/tests/520134/anti-fodrin-antibodies-igg-iga-rdl",
    "searchAliases": [
      "anti fodrin",
      "early sjogren",
      "fodrin iga igg"
    ],
    "clinicalCategories": [
      "autoimmune",
      "immunology"
    ]
  },
  {
    "id": "labcorp-verified-20261116-batch29-corrected-520149",
    "testCode": "520149",
    "testName": "ANCA Profile (RDL)",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "alternativeContainer": "",
    "transportContainer": "Transport Tube",
    "preferredVolume": "3 mL serum",
    "minimumVolume": "2 mL serum",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "Yes",
    "stability": "Room 7 days; refrigerated 14 days; frozen 60 days",
    "specialLabeling": "Label serum, collection date and time",
    "specialInstructions": "Collect sufficient serum for the preferred 3 mL yield; Gold SST usable yield 2.5 mL, so two Gold or one Tiger may be needed. Separate from cells within ONE HOUR, TRANSFER to labeled plastic Transport Tube, and ship refrigerated. Reflex analysis is performed by the receiving laboratory; clinics do not prepare slides. Verify this code is accepted by the ordering Labcorp account and receiving service area.",
    "source": "Labcorp official test-specific directory, reviewed 2026-11-16 • https://www.labcorp.com/tests/520149/anca-profile-rdl",
    "searchAliases": [
      "anca rdl",
      "anti mpo pr3",
      "anca profile"
    ],
    "clinicalCategories": [
      "autoimmune",
      "immunology"
    ],
    "usePreferredSerumYield": true
  },
  {
    "id": "labcorp-verified-20261116-batch29-corrected-520340",
    "testCode": "520340",
    "testName": "Connective Tissue Disease (CTD) Cascade",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "alternativeContainer": "",
    "transportContainer": "Transport Tube",
    "preferredVolume": "5 mL serum",
    "minimumVolume": "4 mL serum",
    "collectionCount": 2,
    "submissionCount": 2,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "Yes",
    "stability": "Refrigerated 14 days",
    "specialLabeling": "Label serum, collection date and time",
    "specialInstructions": "Requires TWO SST / Gold (or appropriate red-top) collection tubes to obtain at least 5 mL preferred serum for reflex testing. Separate serum from cells within ONE HOUR and TRANSFER separated serum into TWO labeled plastic Transport Tubes per stated tube requirement. Ship refrigerated with cold packs; no clinic slide preparation. The calculator must not estimate one SST sufficient. Verify this code is accepted by the ordering Labcorp account and receiving service area.",
    "source": "Labcorp official test-specific directory, reviewed 2026-11-16 • https://www.labcorp.com/tests/520340/connective-tissue-disease-ctd-cascade",
    "searchAliases": [
      "ctd cascade",
      "connective tissue cascade",
      "ana autoimmune cascade"
    ],
    "clinicalCategories": [
      "autoimmune",
      "immunology"
    ]
  },
  {
    "id": "labcorp-verified-20261116-batch29-corrected-520298",
    "testCode": "520298",
    "testName": "Rheumatoid Arthritis (RA) Profile with Reflex to SeroNeg RAdx4",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "alternativeContainer": "",
    "transportContainer": "Transport Tube",
    "preferredVolume": "3 mL serum",
    "minimumVolume": "1 mL serum",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "Yes",
    "stability": "Room 7 days; refrigerated 14 days; frozen 60 days",
    "specialLabeling": "Label serum, collection date and time",
    "specialInstructions": "Collect serum in SST / Gold or SST / Tiger; preferred 3 mL serum may require TWO Gold SST. Separate serum from cells within ONE HOUR, TRANSFER to plastic Transport Tube, and ship refrigerated. Reflex testing is performed by Labcorp. Verify this code is accepted by the ordering Labcorp account and receiving service area.",
    "source": "Labcorp official test-specific directory, reviewed 2026-11-16 • https://www.labcorp.com/tests/520298/rheumatoid-arthritis-ra-profile-with-reflex-to-seroneg-radx4",
    "searchAliases": [
      "ra reflex seroneg",
      "seroneg radx4",
      "rheumatoid reflex profile"
    ],
    "clinicalCategories": [
      "autoimmune",
      "immunology"
    ],
    "usePreferredSerumYield": true
  },
  {
    "id": "labcorp-verified-20261116-batch29-corrected-520293",
    "testCode": "520293",
    "testName": "Vasculitis Profile (RDL)",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "alternativeContainer": "",
    "transportContainer": "Transport Tube",
    "preferredVolume": "4 mL serum",
    "minimumVolume": "1.5 mL serum",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "Yes",
    "stability": "Room 7 days; refrigerated 14 days; frozen 60 days",
    "specialLabeling": "Label serum, collection date and time",
    "specialInstructions": "Collect serum; preferred 4 mL may require TWO Gold SST or ONE Tiger SST. Separate serum from cells within ONE HOUR, TRANSFER to labeled plastic Transport Tube, and ship refrigerated. The performing lab prepares any slides needed for immunofluorescence. Do not prepare or submit clinic slides. Verify this code is accepted by the ordering Labcorp account and receiving service area.",
    "source": "Labcorp official test-specific directory, reviewed 2026-11-16 • https://www.labcorp.com/tests/520293/vasculitis-profile-rdl",
    "searchAliases": [
      "vasculitis rdl",
      "anca autoimmune vasculitis",
      "vasculitis panel"
    ],
    "clinicalCategories": [
      "autoimmune",
      "immunology",
      "renal"
    ],
    "usePreferredSerumYield": true
  },
  {
    "id": "labcorp-verified-20261116-batch29-corrected-520194",
    "testCode": "520194",
    "testName": "Glomerulonephritis (GNP) Profile (RDL)",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "alternativeContainer": "",
    "transportContainer": "Transport Tube",
    "preferredVolume": "4 mL serum",
    "minimumVolume": "1.5 mL serum",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "Yes",
    "stability": "Room 2 days; refrigerated 8 days; frozen 8 days",
    "specialLabeling": "Label serum, collection date and time",
    "specialInstructions": "Serum only, 4 mL preferred may need TWO Gold SST or ONE Tiger SST. Separate serum from cells within ONE HOUR, TRANSFER to labeled plastic Transport Tube, and ship refrigerated. No clinic slide preparation. Verify this code is accepted by the ordering Labcorp account and receiving service area.",
    "source": "Labcorp official test-specific directory, reviewed 2026-11-16 • https://www.labcorp.com/tests/520194/glomerulonephritis-gnp-profile-rdl",
    "searchAliases": [
      "glomerulonephritis profile",
      "gnp rdl",
      "anti gbm anca panel"
    ],
    "clinicalCategories": [
      "renal",
      "autoimmune",
      "immunology"
    ],
    "usePreferredSerumYield": true
  },
  {
    "id": "labcorp-verified-20261116-batch29-corrected-520555",
    "testCode": "520555",
    "testName": "Lupus Prognostic Profile",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "alternativeContainer": "",
    "transportContainer": "Frozen Transport Tube (Purple Cap)",
    "preferredVolume": "5 mL serum",
    "minimumVolume": "4 mL serum",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "spin": "Yes",
    "stability": "Frozen 14 days (maximum 5 freeze/thaw cycles; avoid repeat thawing)",
    "specialLabeling": "Label serum, collection date and time",
    "specialInstructions": "Serum only. Obtain 5 mL preferred serum, requiring at least TWO SST draws under the Gold/Tiger yield assumptions. Allow clot, centrifuge, SEPARATE serum from cells within ONE HOUR, TRANSFER to a Labcorp-approved polypropylene Frozen Transport Tube (Purple Cap), and FREEZE promptly. Ship frozen; this dedicated aliquot must not pool with other frozen assays. Verify this code is accepted by the ordering Labcorp account and receiving service area.",
    "source": "Labcorp official test-specific directory, reviewed 2026-11-16 • https://www.labcorp.com/tests/520555/lupus-prognostic-profile",
    "searchAliases": [
      "lupus prognostic",
      "sle prognosis",
      "lupus rdl panel"
    ],
    "clinicalCategories": [
      "autoimmune",
      "immunology"
    ],
    "usePreferredSerumYield": true
  },
  {
    "id": "labcorp-verified-20261116-batch29-corrected-520385",
    "testCode": "520385",
    "testName": "Anti-HMGCR Ab",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "alternativeContainer": "",
    "transportContainer": "SST / Gold (spun)",
    "preferredVolume": "1 mL serum",
    "minimumVolume": "0.5 mL serum",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "Yes",
    "stability": "Room 48 hours; refrigerated 14 days; frozen 14 days",
    "specialLabeling": "Label serum, collection date and time",
    "specialInstructions": "Collect serum in SST / Gold (or SST / Tiger), allow to clot, and centrifuge. Submit original properly spun gel-barrier SST refrigerated with cold packs. If using a red-top instead, separated serum must be transferred to a plastic Transport Tube. Do not submit whole blood. Verify this code is accepted by the ordering Labcorp account and receiving service area.",
    "source": "Labcorp official test-specific directory, reviewed 2026-11-16 • https://www.labcorp.com/tests/520385/anti-hmgcr-ab",
    "searchAliases": [
      "anti hmgcr",
      "statin myopathy antibody",
      "immune mediated necrotizing myopathy"
    ],
    "clinicalCategories": [
      "autoimmune",
      "immunology"
    ]
  },
  {
    "id": "labcorp-verified-20261116-batch29-corrected-006981",
    "testCode": "006981",
    "testName": "Autoimmune Profile",
    "status": "active",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "alternativeContainer": "",
    "transportContainer": "Transport Tube",
    "preferredVolume": "3 mL serum",
    "minimumVolume": "1.5 mL serum",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "Yes",
    "stability": "Room 2 days; refrigerated 3 days; frozen 7 days",
    "specialLabeling": "Label serum, collection date and time",
    "specialInstructions": "Serum only. Collect SST / Gold or SST / Tiger, allow to clot and centrifuge. TRANSFER separated serum into labeled plastic Transport Tube and maintain at ROOM TEMPERATURE for normal shipment. The 3 mL preferred yield may require TWO Gold SST or ONE Tiger. Includes ANA, anti-dsDNA and complement C3. Verify this code is accepted by the ordering Labcorp account and receiving service area.",
    "source": "Labcorp official test-specific directory, reviewed 2026-11-16 • https://www.labcorp.com/tests/006981/autoimmune-profile",
    "searchAliases": [
      "autoimmune profile",
      "ana dna complement panel",
      "ana ds dna c3"
    ],
    "clinicalCategories": [
      "autoimmune",
      "immunology"
    ],
    "usePreferredSerumYield": true
  }
];
for (const record of additions) {
  const existing = window.SEED_TESTS.find(t => String(t.testCode || '').trim() === record.testCode);
  if (!existing) { window.SEED_TESTS.push(record); continue; }
  if (['pending', 'reference'].includes(existing.status)) {
    Object.assign(existing, record, { id: existing.id || record.id });
    continue;
  }
  // Earlier November 16 batches added several of these codes first. Reconcile
  // only those same-day provisional records with this later verified entry.
  // Never replace pre-existing active catalog records or clinic-blocked tests.
  if (existing.status === 'active' &&
      /^labcorp-verified-20261116-batch(?:17|18|26)-/.test(String(existing.id || ''))) {
    Object.assign(existing, record, { id: existing.id });
  }
}
})();
