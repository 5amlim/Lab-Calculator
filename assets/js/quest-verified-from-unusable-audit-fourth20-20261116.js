/* Verified Quest reference entries 61-80, 2026-11-16.
 * 4 supported clinic collection paths; eight hair/nail records reference-only. Preserve original specimen type,
 * transport temperature, patient preparation, and required containers.
 * No slide preparation, unsupported stains, acid-preserved urine, or automatic
 * conversion of hair/nail/seminal material into a urine/stool collection.
 * Existing active and blocked entries are never overwritten.
 */
(()=>{'use strict';if(!Array.isArray(window.SEED_TESTS))return;
const additions=[
  {
    "id": "quest-verified-audit-61-80-20261116-2691",
    "status": "active",
    "testCode": "2691",
    "testName": "Varicella-Zoster Virus, Rapid Method, Culture",
    "specimenType": "Site-Specific Culture Swab",
    "drawContainer": "Viral transport media (VCM/M4)",
    "alternativeContainer": "",
    "transportContainer": "Viral transport media (VCM/M4)",
    "preferredVolume": "1 vesicle/lesion swab in approximately 3 mL VCM",
    "minimumVolume": "1 mL transport medium",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "stability": "Room unacceptable; VCM refrigerated 72 hours; frozen at -20°C unacceptable",
    "specialLabeling": "Label VESICLE/LESION SWAB with exact site and collection date/time",
    "specialInstructions": "Swab the vesicle base or affected lesion with a suitable synthetic swab, immediately immerse in approved viral culture medium (VCM or Quest-approved equivalent) and submit the ORIGINAL securely capped medium tube. Refrigerate at 2–8°C and ship with cold packs promptly, within 72 hours. Do not transfer, freeze in a standard clinic freezer, use ESwab/Amies, dry swabs, wooden shafts, calcium alginate, slides, or formalin. The Quest code also accepts other specimen sources but this calculator entry covers the LESION SWAB collection route only. Confirm the receiving Quest laboratory/account accepts this exact code and source before collection.",
    "searchAliases": [
      "VZV culture",
      "shingles virus culture",
      "varicella zoster viral culture",
      "chickenpox culture"
    ],
    "clinicalCategories": [
      "infectious",
      "microbiology"
    ],
    "source": "Quest test directory or performing-lab official instructions, reviewed 2026-11-16 • https://intellitestmanager.questdiagnostics.com/home/output/238085"
  },
  {
    "id": "quest-verified-audit-61-80-20261116-3021",
    "status": "active",
    "testCode": "3021",
    "testName": "Culture, Urine, Special",
    "specimenType": "Urine",
    "drawContainer": "Sterile cup",
    "alternativeContainer": "",
    "transportContainer": "Gray-Top Urine Culture Preservative Tube",
    "preferredVolume": "4 mL catheterized or suprapubic urine in filled gray top",
    "minimumVolume": "Gray top to printed fill line (4 mL)",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "stability": "Filled preserved gray tube: room 48 hours, refrigerated 48 hours, frozen unacceptable",
    "specialLabeling": "Label URINE • CATHETERIZED/SUPRAPUBIC/CYSTOSCOPIC source and collection date/time",
    "specialInstructions": "Collect a separate urine specimen by the PROVIDER-OBTAINED in-and-out/straight catheterization, suprapubic aspiration, or cystoscopic collection route into a clean sterile cup. This is NOT routine clean-catch urine and must not pool with general random urine tests. IMMEDIATELY fill the gray-top urine culture preservative tube precisely to its printed 4 mL fill line and gently mix. Submit ONE original gray-top preserved tube at room temperature. No red/yellow swirl UA tube, 24-hour collection, swab, catheter bag urine, routine clean-catch or frozen specimen. A small unpreserved cup is only conditionally acceptable for specific pediatric/renal cases and is NOT modeled by this entry. Confirm procedural collection support before booking. Confirm the receiving Quest laboratory/account accepts this exact code and source before collection.",
    "searchAliases": [
      "special urine culture",
      "comprehensive urine culture",
      "catheterized urine culture",
      "straight cath urine culture",
      "suprapubic aspirate culture"
    ],
    "clinicalCategories": [
      "microbiology",
      "infectious",
      "urinary"
    ],
    "source": "Quest test directory or performing-lab official instructions, reviewed 2026-11-16 • https://testdirectory.questdiagnostics.com/test/test-detail/3021/culture-urine-special?cc=MASTER"
  },
  {
    "id": "quest-verified-audit-61-80-20261116-3107",
    "status": "reference",
    "testCode": "3107",
    "testName": "Metals/Metalloids Panel 1, Hair",
    "specimenType": "Hair",
    "drawContainer": "Trace Metal-Free Plastic Container",
    "alternativeContainer": "",
    "transportContainer": "Trace Metal-Free Plastic Container",
    "preferredVolume": "500 mg hair",
    "minimumVolume": "500 mg",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "stability": "Not established by Quest; prompt submission at room temperature",
    "specialLabeling": "Label HAIR • METALS/METALLOIDS PANEL 1 and collection date/time",
    "specialInstructions": "NOT COLLECTED ONSITE. Hair and nail specimens are not supported by these clinics. Reference only. Hair is a separate specimen type. Collect adequate source material into a clean acid-washed or trace metal-free PLASTIC container, not an ordinary Sterile cup, swab, tube with blood additives, or paper packet. Submit the ORIGINAL metal-free container without processing or specimen transfer. Keep distinct from other specimen types; EACH selected assay must have the full required 500 mg available. Do not pool identical 500 mg aliquots across multiple tests unless Quest specifically confirms shared submission. Confirm approved collection tooling and kit availability to avoid trace-metal contamination. Collect a pencil-thick segment near the scalp, bundle and cut at roots, and secure the root end with a twist tie as specified by Quest. Do not wash, chemically treat, or mix hair with nail clippings unless Quest provides source-specific instructions. Quest states this test is NOT available for New York patient testing. Confirm the receiving Quest laboratory/account accepts this exact code and source before collection.",
    "searchAliases": [
      "metals/metalloids panel 1 hair",
      "hair metals/metalloids panel 1",
      "toxic metals hair"
    ],
    "clinicalCategories": [
      "heavy-metals"
    ],
    "source": "Quest test directory or performing-lab official instructions, reviewed 2026-11-16 • https://testdirectory.questdiagnostics.com/test/test-detail/3107/metalsmetalloids-hair-panel-1?cc=MASTER"
  },
  {
    "id": "quest-verified-audit-61-80-20261116-3119",
    "status": "active",
    "testCode": "3119",
    "testName": "Palladium, Urine",
    "specimenType": "Urine",
    "drawContainer": "Trace Metal-Free Plastic Container",
    "alternativeContainer": "",
    "transportContainer": "Trace Metal-Free Plastic Container",
    "preferredVolume": "2 mL random urine",
    "minimumVolume": "0.7 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "stability": "Room 30 days; refrigerated 60 days; frozen 60 days",
    "specialLabeling": "Label URINE • TRACE METAL-FREE and collection date/time",
    "specialInstructions": "Collect random urine directly into a clean acid-washed or trace metal-free PLASTIC urine container, never an ordinary Sterile cup or urinalysis tube. Submit the ORIGINAL container at room temperature, without transfer or preservative. Avoid gadolinium-based contrast media for 48 hours before specimen collection. Do not group with routine urine specimens; trace metal-free urine specimens may share a collection source only if all assays' patient preparation, collection times and transport are compatible and there is adequate volume. Confirm the receiving Quest laboratory/account accepts this exact code and source before collection.",
    "searchAliases": [
      "urinary palladium",
      "palladium metal exposure",
      "palladium random urine"
    ],
    "clinicalCategories": [
      "heavy-metals",
      "urinary"
    ],
    "source": "Quest test directory or performing-lab official instructions, reviewed 2026-11-16 • https://testdirectory.questdiagnostics.com/test/test-detail/3119/palladium-urine?cc=MASTER"
  },
  {
    "id": "quest-verified-audit-61-80-20261116-3187",
    "status": "active",
    "testCode": "3187",
    "testName": "Post-Vasectomy, Spermatozoa, Qualitative",
    "specimenType": "Semen",
    "drawContainer": "Sterile cup",
    "alternativeContainer": "",
    "transportContainer": "Sterile cup",
    "preferredVolume": "Complete ejaculate, at least 1 mL",
    "minimumVolume": "1 mL",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "stability": "Room temperature up to 48 hours; contaminated or older than 48 hours rejected",
    "specialLabeling": "Label SEMEN and exact collection date/time",
    "specialInstructions": "Patient collects the specimen by masturbation directly into a clean STERILE WIDE-MOUTH plastic screw-cap cup. Submit the ORIGINAL cup at room temperature, never in a condom, swab, preservative or transport tube, and do not pool with another specimen source. Follow prescriber-directed abstinence (usually 2–7 days) and time after vasectomy (typically 8–16 weeks). Coordinate with receiving Quest lab BEFORE the patient collects; deliver as soon as practical. Keep separate from urine, stool or other bodily fluid cups. Confirm the receiving Quest laboratory/account accepts this exact code and source before collection.",
    "searchAliases": [
      "post vasectomy semen",
      "qualitative sperm count",
      "post vasectomy sperm",
      "spermatozoa semen"
    ],
    "clinicalCategories": [
      "reproductive"
    ],
    "source": "Quest test directory or performing-lab official instructions, reviewed 2026-11-16 • https://testdirectory.questdiagnostics.com/test/test-detail/3187/post-vasectomy-spermatozoa-qualitative?cc=MASTER"
  },
  {
    "id": "quest-verified-audit-61-80-20261116-3256",
    "status": "reference",
    "testCode": "3256",
    "testName": "Thallium, Nails",
    "specimenType": "Nails",
    "drawContainer": "Trace Metal-Free Plastic Container",
    "alternativeContainer": "",
    "transportContainer": "Trace Metal-Free Plastic Container",
    "preferredVolume": "500 mg nail clippings",
    "minimumVolume": "500 mg",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "stability": "Not established by Quest; prompt submission at room temperature",
    "specialLabeling": "Label NAILS • THALLIUM and collection date/time",
    "specialInstructions": "NOT COLLECTED ONSITE. Hair and nail specimens are not supported by these clinics. Reference only. Nail clippings is a separate specimen type. Collect adequate source material into a clean acid-washed or trace metal-free PLASTIC container, not an ordinary Sterile cup, swab, tube with blood additives, or paper packet. Submit the ORIGINAL metal-free container without processing or specimen transfer. Keep distinct from other specimen types; EACH selected assay must have the full required 500 mg available. Do not pool identical 500 mg aliquots across multiple tests unless Quest specifically confirms shared submission. Confirm approved collection tooling and kit availability to avoid trace-metal contamination. Quest states this test is NOT available for New York patient testing. Confirm the receiving Quest laboratory/account accepts this exact code and source before collection.",
    "searchAliases": [
      "thallium nail",
      "thallium nails",
      "toxic metals nails",
      "nail clipping"
    ],
    "clinicalCategories": [
      "heavy-metals"
    ],
    "source": "Quest test directory or performing-lab official instructions, reviewed 2026-11-16 • https://testdirectory.questdiagnostics.com/test/test-detail/3256/thallium-nails?cc=MASTER"
  },
  {
    "id": "quest-verified-audit-61-80-20261116-3348",
    "status": "reference",
    "testCode": "3348",
    "testName": "Zinc, Nails",
    "specimenType": "Nails",
    "drawContainer": "Trace Metal-Free Plastic Container",
    "alternativeContainer": "",
    "transportContainer": "Trace Metal-Free Plastic Container",
    "preferredVolume": "500 mg nail clippings",
    "minimumVolume": "500 mg",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "stability": "Not established by Quest; prompt submission at room temperature",
    "specialLabeling": "Label NAILS • ZINC and collection date/time",
    "specialInstructions": "NOT COLLECTED ONSITE. Hair and nail specimens are not supported by these clinics. Reference only. Nail clippings is a separate specimen type. Collect adequate source material into a clean acid-washed or trace metal-free PLASTIC container, not an ordinary Sterile cup, swab, tube with blood additives, or paper packet. Submit the ORIGINAL metal-free container without processing or specimen transfer. Keep distinct from other specimen types; EACH selected assay must have the full required 500 mg available. Do not pool identical 500 mg aliquots across multiple tests unless Quest specifically confirms shared submission. Confirm approved collection tooling and kit availability to avoid trace-metal contamination. Quest states this test is NOT available for New York patient testing. Confirm the receiving Quest laboratory/account accepts this exact code and source before collection.",
    "searchAliases": [
      "zinc nail",
      "zinc nails",
      "toxic metals nails",
      "nail clipping"
    ],
    "clinicalCategories": [
      "heavy-metals"
    ],
    "source": "Quest test directory or performing-lab official instructions, reviewed 2026-11-16 • https://testdirectory.questdiagnostics.com/test/test-detail/3348/zinc-nails-?cc=MASTER"
  },
  {
    "id": "quest-verified-audit-61-80-20261116-3386",
    "status": "reference",
    "testCode": "3386",
    "testName": "Selenium, Hair",
    "specimenType": "Hair",
    "drawContainer": "Trace Metal-Free Plastic Container",
    "alternativeContainer": "",
    "transportContainer": "Trace Metal-Free Plastic Container",
    "preferredVolume": "500 mg hair",
    "minimumVolume": "500 mg",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "stability": "Not established by Quest; prompt submission at room temperature",
    "specialLabeling": "Label HAIR • SELENIUM and collection date/time",
    "specialInstructions": "NOT COLLECTED ONSITE. Hair and nail specimens are not supported by these clinics. Reference only. Hair is a separate specimen type. Collect adequate source material into a clean acid-washed or trace metal-free PLASTIC container, not an ordinary Sterile cup, swab, tube with blood additives, or paper packet. Submit the ORIGINAL metal-free container without processing or specimen transfer. Keep distinct from other specimen types; EACH selected assay must have the full required 500 mg available. Do not pool identical 500 mg aliquots across multiple tests unless Quest specifically confirms shared submission. Confirm approved collection tooling and kit availability to avoid trace-metal contamination. Collect a pencil-thick segment near the scalp, bundle and cut at roots, and secure the root end with a twist tie as specified by Quest. Do not wash, chemically treat, or mix hair with nail clippings unless Quest provides source-specific instructions. Quest states this test is NOT available for New York patient testing. Confirm the receiving Quest laboratory/account accepts this exact code and source before collection.",
    "searchAliases": [
      "selenium hair",
      "hair selenium",
      "toxic metals hair"
    ],
    "clinicalCategories": [
      "heavy-metals"
    ],
    "source": "Quest test directory or performing-lab official instructions, reviewed 2026-11-16 • https://testdirectory.questdiagnostics.com/test/test-detail/3386/selenium-hair?cc=MASTER"
  },
  {
    "id": "quest-verified-audit-61-80-20261116-3411",
    "status": "reference",
    "testCode": "3411",
    "testName": "Thallium, Hair",
    "specimenType": "Hair",
    "drawContainer": "Trace Metal-Free Plastic Container",
    "alternativeContainer": "",
    "transportContainer": "Trace Metal-Free Plastic Container",
    "preferredVolume": "500 mg hair",
    "minimumVolume": "500 mg",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "stability": "Not established by Quest; prompt submission at room temperature",
    "specialLabeling": "Label HAIR • THALLIUM and collection date/time",
    "specialInstructions": "NOT COLLECTED ONSITE. Hair and nail specimens are not supported by these clinics. Reference only. Hair is a separate specimen type. Collect adequate source material into a clean acid-washed or trace metal-free PLASTIC container, not an ordinary Sterile cup, swab, tube with blood additives, or paper packet. Submit the ORIGINAL metal-free container without processing or specimen transfer. Keep distinct from other specimen types; EACH selected assay must have the full required 500 mg available. Do not pool identical 500 mg aliquots across multiple tests unless Quest specifically confirms shared submission. Confirm approved collection tooling and kit availability to avoid trace-metal contamination. Collect a pencil-thick segment near the scalp, bundle and cut at roots, and secure the root end with a twist tie as specified by Quest. Do not wash, chemically treat, or mix hair with nail clippings unless Quest provides source-specific instructions. Quest states this test is NOT available for New York patient testing. Confirm the receiving Quest laboratory/account accepts this exact code and source before collection.",
    "searchAliases": [
      "thallium hair",
      "hair thallium",
      "toxic metals hair"
    ],
    "clinicalCategories": [
      "heavy-metals"
    ],
    "source": "Quest test directory or performing-lab official instructions, reviewed 2026-11-16 • https://testdirectory.questdiagnostics.com/test/test-detail/3411/thallium-hair?cc=MASTER"
  },
  {
    "id": "quest-verified-audit-61-80-20261116-3419",
    "status": "reference",
    "testCode": "3419",
    "testName": "Lead, Nails",
    "specimenType": "Nails",
    "drawContainer": "Trace Metal-Free Plastic Container",
    "alternativeContainer": "",
    "transportContainer": "Trace Metal-Free Plastic Container",
    "preferredVolume": "500 mg nail clippings",
    "minimumVolume": "500 mg",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "stability": "Not established by Quest; prompt submission at room temperature",
    "specialLabeling": "Label NAILS • LEAD and collection date/time",
    "specialInstructions": "NOT COLLECTED ONSITE. Hair and nail specimens are not supported by these clinics. Reference only. Nail clippings is a separate specimen type. Collect adequate source material into a clean acid-washed or trace metal-free PLASTIC container, not an ordinary Sterile cup, swab, tube with blood additives, or paper packet. Submit the ORIGINAL metal-free container without processing or specimen transfer. Keep distinct from other specimen types; EACH selected assay must have the full required 500 mg available. Do not pool identical 500 mg aliquots across multiple tests unless Quest specifically confirms shared submission. Confirm approved collection tooling and kit availability to avoid trace-metal contamination. Quest states this test is NOT available for New York patient testing. Confirm the receiving Quest laboratory/account accepts this exact code and source before collection.",
    "searchAliases": [
      "lead nail",
      "lead nails",
      "toxic metals nails",
      "nail clipping"
    ],
    "clinicalCategories": [
      "heavy-metals"
    ],
    "source": "Quest test directory or performing-lab official instructions, reviewed 2026-11-16 • https://testdirectory.questdiagnostics.com/test/test-detail/3419/lead-nails?cc=MASTER"
  },
  {
    "id": "quest-verified-audit-61-80-20261116-3487",
    "status": "reference",
    "testCode": "3487",
    "testName": "Chromium, Nails",
    "specimenType": "Nails",
    "drawContainer": "Trace Metal-Free Plastic Container",
    "alternativeContainer": "",
    "transportContainer": "Trace Metal-Free Plastic Container",
    "preferredVolume": "500 mg nail clippings",
    "minimumVolume": "500 mg",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "stability": "Not established by Quest; prompt submission at room temperature",
    "specialLabeling": "Label NAILS • CHROMIUM and collection date/time",
    "specialInstructions": "NOT COLLECTED ONSITE. Hair and nail specimens are not supported by these clinics. Reference only. Nail clippings is a separate specimen type. Collect adequate source material into a clean acid-washed or trace metal-free PLASTIC container, not an ordinary Sterile cup, swab, tube with blood additives, or paper packet. Submit the ORIGINAL metal-free container without processing or specimen transfer. Keep distinct from other specimen types; EACH selected assay must have the full required 500 mg available. Do not pool identical 500 mg aliquots across multiple tests unless Quest specifically confirms shared submission. Confirm approved collection tooling and kit availability to avoid trace-metal contamination. Confirm the receiving Quest laboratory/account accepts this exact code and source before collection.",
    "searchAliases": [
      "chromium nail",
      "chromium nails",
      "toxic metals nails",
      "nail clipping"
    ],
    "clinicalCategories": [
      "heavy-metals"
    ],
    "source": "Quest test directory or performing-lab official instructions, reviewed 2026-11-16 • https://testdirectory.questdiagnostics.com/test/test-detail/3487/chromium-nails?cc=MASTER"
  },
  {
    "id": "quest-verified-audit-61-80-20261116-3499",
    "status": "reference",
    "testCode": "3499",
    "testName": "Nickel, Nails",
    "specimenType": "Nails",
    "drawContainer": "Trace Metal-Free Plastic Container",
    "alternativeContainer": "",
    "transportContainer": "Trace Metal-Free Plastic Container",
    "preferredVolume": "500 mg nail clippings",
    "minimumVolume": "500 mg",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "stability": "Not established by Quest; prompt submission at room temperature",
    "specialLabeling": "Label NAILS • NICKEL and collection date/time",
    "specialInstructions": "NOT COLLECTED ONSITE. Hair and nail specimens are not supported by these clinics. Reference only. Nail clippings is a separate specimen type. Collect adequate source material into a clean acid-washed or trace metal-free PLASTIC container, not an ordinary Sterile cup, swab, tube with blood additives, or paper packet. Submit the ORIGINAL metal-free container without processing or specimen transfer. Keep distinct from other specimen types; EACH selected assay must have the full required 500 mg available. Do not pool identical 500 mg aliquots across multiple tests unless Quest specifically confirms shared submission. Confirm approved collection tooling and kit availability to avoid trace-metal contamination. Confirm the receiving Quest laboratory/account accepts this exact code and source before collection.",
    "searchAliases": [
      "nickel nail",
      "nickel nails",
      "toxic metals nails",
      "nail clipping"
    ],
    "clinicalCategories": [
      "heavy-metals"
    ],
    "source": "Quest test directory or performing-lab official instructions, reviewed 2026-11-16 • https://testdirectory.questdiagnostics.com/test/test-detail/3499/nickel-nails?cc=MASTER"
  }
];
for(const record of additions){
 const existing=window.SEED_TESTS.find(t=>String(t.testCode||'').trim()===record.testCode);
 if(!existing){window.SEED_TESTS.push(record);continue;}
 if(existing.status==='reference'||existing.status==='pending')Object.assign(existing,record,{id:existing.id||record.id});
}
})();
