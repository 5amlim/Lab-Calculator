// Feasible exact-code additions after completing the 135 remaining Labcorp review.
(() => {
 'use strict';
 const additions=[
  {
    "id": "labcorp-reviewed-135-186197",
    "testCode": "186197",
    "testName": "Influenza A and B Antigen EIA With Reflex",
    "status": "active",
    "specimenType": "Nasopharyngeal Swab",
    "drawContainer": "Viral Transport Medium (VTM)",
    "transportContainer": "Viral Transport Medium (VTM)",
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "preferredVolume": "1 nasopharyngeal swab in viral transport medium",
    "minimumVolume": "1 swab",
    "spin": "No",
    "specialInstructions": "Collect one nasopharyngeal swab in Labcorp-approved viral transport medium (VTM). Keep in original sealed device. Refrigerate and ship refrigerated. Never use dry or bacterial swab, prepared slide, freeze or transfer. Verify exact reflex order 186197 availability before collection; the current Labcorp direct EIA code 186064 verifies refrigeration and VTM.",
    "specialLabeling": "Label NASOPHARYNGEAL SWAB",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "infectious",
      "respiratory",
      "microbiology"
    ],
    "searchAliases": [
      "flu EIA reflex",
      "influenza A B reflex",
      "NP flu antigen"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/186197"
  },
  {
    "id": "labcorp-reviewed-135-340337",
    "testCode": "340337",
    "testName": "Creatinine and Homovanillic Acid (HVA), 24-Hour Urine",
    "status": "active",
    "specimenType": "24-Hour Urine",
    "drawContainer": "24-Hour Urine Container",
    "transportContainer": "Sterile cup",
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "preferredVolume": "4 mL urine aliquot",
    "minimumVolume": "2 mL urine aliquot",
    "spin": "No",
    "specialInstructions": "Collect complete 24-hour urine in unpreserved clean collection container; discard first void and collect all subsequent voids including the final void after 24 hours. Mix total collected urine, record total 24-hour volume and collection start/end times. Submit 4 mL aliquot in a sealed sterile screw-cap cup at room temperature. HVA accepts NO preservative per Labcorp; do not acidify. CDOS exact combined code lists a 2 mL aliquot, and 4 mL accommodates the current HVA component preferred volume.",
    "specialLabeling": "Label 24-HOUR URINE; TOTAL VOLUME; START/END TIMES",
    "collectionCount": 1,
    "submissionCount": 1,
    "clinicalCategories": [
      "urinary",
      "endocrinology",
      "chemistry"
    ],
    "searchAliases": [
      "HVA 24 hour with creatinine",
      "creatU HVA24H",
      "homovanillic acid 24h"
    ],
    "source": "https://cdos.halfpenny.com/labcorp/TestDisplay/340337"
  }
];
 const catalog=window.SEED_TESTS||[];
 const existing=new Map(catalog.map(r=>[String(r.testCode||'').trim(),r]));
 for(const r of additions){const prior=existing.get(r.testCode);if(!prior){catalog.push(r);existing.set(r.testCode,r)}else if(prior.status==='pending'||prior.status==='reference') Object.assign(prior,r,{id:prior.id||r.id});}
 window.SEED_TESTS=catalog;
})();
