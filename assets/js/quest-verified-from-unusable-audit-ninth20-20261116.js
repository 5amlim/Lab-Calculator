/* Quest nonusable audit entries 161-180, reviewed 2026-11-16.
 * Five collectible specimen pathways. Unsupported: hair/nails, tissue slides,
 * FFPE/IHC, fetus, 50% ethanol cytology/FISH kit, unavailable special cadmium
 * tube, unsupported clonidine suppression timed protocol, -70C vitamin C,
 * and specimens without sufficient primary transport verification.
 * Never override existing active or blocked entries; update references only.
 */
(()=>{'use strict';if(!Array.isArray(window.SEED_TESTS))return;
const additions=[
  {
    "id": "quest-verified-audit-ninth20-20261116-8631",
    "testCode": "8631",
    "testName": "Escherichia coli O157, Culture",
    "status": "active",
    "specimenType": "Stool",
    "drawContainer": "Sterile cup",
    "alternativeContainer": "",
    "transportContainer": "Cary-Blair Stool Culture Transport Medium",
    "preferredVolume": "1 gram or 1 mL stool in Cary-Blair",
    "minimumVolume": "1 gram or 1 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "stability": "Cary-Blair stool room 4 days; refrigerated 4 days; frozen unacceptable",
    "specialLabeling": "Label STOOL and exact collection date/time",
    "specialInstructions": "Collect stool into a clean, DRY Sterile cup without urine or toilet water contamination. Transfer at least 1 gram or 1 mL into modified Cary-Blair Stool Culture Transport Medium and fill to the manufacturer's fill line; mix as directed. Submit the Cary-Blair vial at ROOM TEMPERATURE, not the original plain stool cup. Do not freeze or use Total-Fix, PVA, or unpreserved stool for this culture. E. coli O157 culture is separate from Shiga toxin molecular testing. Compatible stool culture assays can share a same-bowel-movement SOURCE cup if adequate volume is available, but use each assay's required submission vial unless Quest confirms shared submission. Confirm service-area and Quest account acceptance of this exact test code and specimen source before collection.",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/8631/?cc=MASTER",
    "searchAliases": [
      "e coli o157 culture",
      "EHEC culture",
      "STEC O157 culture",
      "enterohemorrhagic e coli culture",
      "stool E. coli O157"
    ],
    "clinicalCategories": [
      "microbiology",
      "infectious",
      "gastrointestinal"
    ]
  },
  {
    "id": "quest-verified-audit-ninth20-20261116-8801",
    "testCode": "8801",
    "testName": "Staphylococcus aureus Screen, Culture",
    "status": "active",
    "specimenType": "Skin Swab",
    "drawContainer": "ESwab (Amies)",
    "alternativeContainer": "",
    "transportContainer": "ESwab (Amies)",
    "preferredVolume": "1 white-cap ESwab of skin lesion or colonization site",
    "minimumVolume": "1 swab",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "stability": "Amies ESwab room temperature 48 hours",
    "specialLabeling": "Label SKIN SWAB and exact collection date/time",
    "specialInstructions": "SKIN SWAB route only, as documented for Quest test code 8801. Collect material from the ordered skin site onto a WHITE-CAP liquid Amies ESwab, place the swab back in its ORIGINAL medium tube, cap tightly, and ship at ROOM TEMPERATURE within 48 hours. Label exact anatomical skin source. NO transfer, slide, dry swab or viral transport medium. Do not use this entry for nasal MRSA screening: Quest/DLO recommends separate test code 90417 for nasal MRSA screens. A skin swab is a separate specimen from wound fluid in a Sterile cup. Confirm service-area and Quest account acceptance of this exact test code and specimen source before collection.",
    "source": "https://www.dlolab.com/staphylococcus-aureus-screen-culture",
    "searchAliases": [
      "staph aureus screening",
      "s aureus culture",
      "MSSA culture skin",
      "skin staph carrier culture",
      "staph skin swab"
    ],
    "clinicalCategories": [
      "microbiology",
      "infectious"
    ]
  },
  {
    "id": "quest-verified-audit-ninth20-20261116-8835",
    "testCode": "8835",
    "testName": "Thallium, Urine",
    "status": "active",
    "specimenType": "Urine",
    "drawContainer": "Trace Metal-Free Plastic Container",
    "alternativeContainer": "",
    "transportContainer": "Trace Metal-Free Plastic Container",
    "preferredVolume": "7 mL random urine",
    "minimumVolume": "3 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "stability": "Room 48 hours; refrigerated 5 days; frozen 14 days",
    "specialLabeling": "Label URINE and exact collection date/time",
    "specialInstructions": "Collect RANDOM urine directly into a CLEAN acid-washed or trace-metal-free PLASTIC container. Submit the ORIGINAL metal-free container refrigerated with cold packs; do not transfer into an ordinary Sterile cup or urine preservative tube. Avoid collection at an industrial worksite and avoid metal contamination. Compatible same-temperature trace-metal urine assays may share one adequately filled metal-free source container only where their combined volume, timing and preparation requirements permit. Confirm local service area and laboratory acceptance. Confirm service-area and Quest account acceptance of this exact test code and specimen source before collection.",
    "source": "https://www.rchsd.org/lab-test/thallium-random-urine-8835/",
    "searchAliases": [
      "thallium random urine",
      "thallium urinary",
      "urinary thallium",
      "toxic heavy metal thallium urine"
    ],
    "clinicalCategories": [
      "heavy-metals",
      "toxicology",
      "urinary"
    ]
  },
  {
    "id": "quest-verified-audit-ninth20-20261116-10019",
    "testCode": "10019",
    "testName": "Salmonella and Shigella, Culture",
    "status": "active",
    "specimenType": "Stool",
    "drawContainer": "Sterile cup",
    "alternativeContainer": "",
    "transportContainer": "Cary-Blair Stool Culture Transport Medium",
    "preferredVolume": "1 gram or 1 mL stool in modified Cary-Blair",
    "minimumVolume": "1 gram or 1 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "stability": "Cary-Blair stool room 4 days; refrigerated 4 days; frozen unacceptable",
    "specialLabeling": "Label STOOL and exact collection date/time",
    "specialInstructions": "Collect fresh stool in a clean, DRY Sterile cup, without urine, water or disinfectant. Transfer at least 1 gram or 1 mL to a MODIFIED Cary-Blair stool culture transport vial and fill to the manufacturer's fill line; mix as directed. Submit Cary-Blair at ROOM TEMPERATURE, not raw stool. Do not use expired or yellow/discolored transport medium, dry rectal swabs, Total-Fix, PVA, or frozen specimens. A compatible stool source cup may supply this and code 8631 if there is sufficient specimen; treat each submission vial as distinct unless Quest specifically permits combining orders into one vial. Confirm service-area and Quest account acceptance of this exact test code and specimen source before collection.",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/10019/salmonella-and-shigella-culture?cc=MASTER",
    "searchAliases": [
      "salmonella shigella stool culture",
      "salmonella stool",
      "shigella culture",
      "enteric stool culture"
    ],
    "clinicalCategories": [
      "microbiology",
      "infectious",
      "gastrointestinal"
    ]
  },
  {
    "id": "quest-verified-audit-ninth20-20261116-10216",
    "testCode": "10216",
    "testName": "Micronutrient, Molybdenum, Blood",
    "status": "active",
    "specimenType": "Whole Blood",
    "drawContainer": "Royal Blue EDTA (purple stripe)",
    "alternativeContainer": "",
    "transportContainer": "Royal Blue EDTA (purple stripe)",
    "preferredVolume": "4 mL whole blood",
    "minimumVolume": "2 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "stability": "Room 7 days; refrigerated 30 days; frozen 30 days",
    "specialLabeling": "Label WHOLE BLOOD and exact collection date/time",
    "specialInstructions": "Collect one DEDICATED FULL ROYAL BLUE EDTA trace-metal-free (purple stripe) blood tube. Avoid worksite collection and metal contamination. Invert gently and submit the ORIGINAL UNOPENED whole-blood tube refrigerated with cold packs. Do NOT centrifuge, aliquot, share, or transfer; regular lavender EDTA and no-additive royal blue are not the intended specimen. Patient preparation per Quest-linked reference: avoid mineral supplements for 3 days and legumes/leafy vegetables for 2 days, as directed by ordering clinician. Verify local Quest service-area availability and current test code because direct MASTER directory lookup is not presently accessible. Confirm service-area and Quest account acceptance of this exact test code and specimen source before collection.",
    "source": "https://www.casandra.ai/catalog/test/micronutrient-molybdenum-blood",
    "searchAliases": [
      "molybdenum whole blood",
      "molybdenum micronutrient",
      "trace element molybdenum blood"
    ],
    "clinicalCategories": [
      "heavy-metals",
      "nutritional",
      "toxicology"
    ]
  }
];
for(const entry of additions){
 const old=window.SEED_TESTS.find(x=>String(x.testCode||'').trim()===entry.testCode);
 if(!old){window.SEED_TESTS.push(entry);continue;}
 if(old.status==='reference'||old.status==='pending')Object.assign(old,entry,{id:old.id||entry.id});
}
})();
