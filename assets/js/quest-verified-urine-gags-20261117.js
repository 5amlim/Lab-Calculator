/* Quest 30422 urine GAGs exact Quest-linked referral guidance; verified freezer-safe cup only. */
(()=>{'use strict';if(!Array.isArray(window.SEED_TESTS))return;
const incoming={
  "id": "quest-verified-urine-gags-20261117-30422",
  "testCode": "30422",
  "testName": "Glycosaminoglycans, Urine",
  "status": "active",
  "specimenType": "Urine",
  "drawContainer": "Sterile cup",
  "alternativeContainer": "",
  "transportContainer": "Sterile cup",
  "preferredVolume": "20 mL random urine (adult); 4 mL (pediatric)",
  "minimumVolume": "10 mL adult urine; 2 mL pediatric urine",
  "collectionCount": 1,
  "submissionCount": 1,
  "transportTemperature": "Frozen",
  "transportTemperatureRaw": "Frozen",
  "spin": "No",
  "stability": "Room or refrigerated: unacceptable; frozen at -20°C: 8 weeks; do not thaw",
  "specialLabeling": "Label RANDOM URINE · ORIGINAL STERILE CUP",
  "specialInstructions": "Collect preferably FIRST MORNING random urine directly in an additive-free, leakproof, FREEZER-SAFE original Sterile cup. Adult 20 mL preferred, 10 mL minimum. Pediatric 4 mL preferred, 2 mL minimum. Include patient age on the requisition. FREEZE IMMEDIATELY after collection and keep FROZEN until dry-ice transport; do not refrigerate while awaiting freezing, thaw, add preservative or pour into gray urine culture tube. Submit the SAME original freezer-safe capped cup, unless the Quest receiving laboratory specifies a different certified freezer-safe vessel. Confirm Quest account routing and the availability of freezer-safe collection cups and frozen pickup before collection. These collection requirements follow the Geisinger reference test menu explicitly mapping to Quest code 30422; verify current Quest account instructions.",
  "source": "https://www.geisingermedicallabs.com/catalog/Details?tid=2491",
  "searchAliases": [
    "urinary glycosaminoglycans",
    "GAGs urine",
    "mucopolysaccharides urine",
    "MPS urine screen"
  ],
  "clinicalCategories": [
    "genetics",
    "metabolic",
    "urinary"
  ],
  "preparationInstructions": "Early morning urine preferred; immediately freeze specimen and retain frozen through pickup."
};
const prior=window.SEED_TESTS.find(x=>String(x.testCode||'').trim()===incoming.testCode);
if(!prior)window.SEED_TESTS.push(incoming);else if(prior.status==='reference'||prior.status==='pending')Object.assign(prior,incoming,{id:prior.id||incoming.id});
})();
