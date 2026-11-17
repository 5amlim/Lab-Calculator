/* Quest reference-only audit: next 100 after 90168 through 93305, reviewed 2026-11-17.
 * Activate only six source-verified, locally feasible collection routes. Other 94 remain
 * reference-only: slide/IHC/cytology/pathology, special kits, donor-only services,
 * unsuitable collection, or insufficient code-level verification. Never override
 * an already-active or blocked entry. */
(()=>{'use strict';if(!Array.isArray(window.SEED_TESTS))return;
const additions=[
  {
    "testCode": "90417",
    "testName": "Methicillin Resistant Staphylococcus aureus (MRSA) Culture Screen",
    "specimenType": "Nasal Swab",
    "drawContainer": "ESwab (Amies)",
    "alternativeContainer": "",
    "transportContainer": "ESwab (Amies)",
    "preferredVolume": "1 nasal swab (both anterior nares)",
    "minimumVolume": "1 swab",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "stability": "Room 48 hours; refrigerated 48 hours; frozen unacceptable",
    "specialLabeling": "Label NASAL SWAB · anterior nares",
    "specialInstructions": "Using ONE Quest-approved liquid Amies ESwab (white cap), premoisten swab as directed, rotate in BOTH anterior nares, then return the SAME swab to its ORIGINAL Amies transport tube and cap. Do not transfer, prepare a slide or use dry swab, UTM or frozen transport. Quest lists this code as NOT OFFERED at Nichols San Juan Capistrano (SJC); check receiving Quest service area and account BEFORE collection.",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/90417/methicillin-resistant-staphylococcus-aureus-culture-screen?cc=MASTER",
    "searchAliases": [
      "MRSA nasal screen",
      "MRSA colonization culture",
      "methicillin resistant Staph aureus screening",
      "nasal culture MRSA"
    ],
    "clinicalCategories": [
      "infectious",
      "microbiology"
    ],
    "id": "quest-verified-audit-after90168-next100-20261117-90417",
    "status": "active"
  },
  {
    "testCode": "90570",
    "testName": "SureSwab HSV-1 and HSV-2 mRNA, TMA",
    "specimenType": "Anogenital Lesion Swab",
    "drawContainer": "Aptima Multitest Transport Tube (Orange Label)",
    "alternativeContainer": "",
    "transportContainer": "Aptima Multitest Transport Tube (Orange Label)",
    "preferredVolume": "1 lesion swab in original Aptima Multitest orange-label tube",
    "minimumVolume": "1 swab",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "stability": "Room 36 days; refrigerated 36 days; frozen 36 days (ship at room temperature)",
    "specialLabeling": "Label ANOGENITAL LESION SWAB · exact lesion site",
    "specialInstructions": "Collect a visible ANOGENITAL LESION using the APTIMA Multitest kit with ORANGE LABEL (or approved Aptima Vaginal Collection Kit). Put swab directly into its ORIGINAL Aptima medium, break shaft at score line, securely cap; no transfer, no slide or smear. The APTIMA Unisex white-label swab kit, ESwab and UTM are NOT acceptable. Do not submit CSF, serum or nonsymptomatic screening samples. Verify local Quest account and service area before collection.",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/90570?cc=MASTER",
    "searchAliases": [
      "HSV swab lesion TMA",
      "HSV 1 2 genital lesion",
      "herpes simplex mRNA",
      "SureSwab HSV PCR"
    ],
    "clinicalCategories": [
      "infectious",
      "sti",
      "microbiology"
    ],
    "id": "quest-verified-audit-after90168-next100-20261117-90570",
    "status": "active"
  },
  {
    "testCode": "90637",
    "testName": "Ribosomal P Antibody, CSF",
    "specimenType": "CSF",
    "drawContainer": "Transport Tube",
    "alternativeContainer": "",
    "transportContainer": "Transport Tube",
    "preferredVolume": "1 mL CSF in sterile plastic screw-cap tube",
    "minimumVolume": "0.3 mL CSF",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Refrigerated",
    "transportTemperatureRaw": "Refrigerated",
    "spin": "No",
    "stability": "Room 4 days; refrigerated 7 days; frozen 30 days",
    "specialLabeling": "Label CSF · precise collection source",
    "specialInstructions": "Qualified procedural clinician collects CSF directly into one sterile, additive-free, leakproof plastic screw-cap Transport Tube; submit the ORIGINAL sealed tube REFRIGERATED with cold packs. No centrifugation, specimen transfer, prepared slides or serum substitution. Do not combine with non-CSF specimens. Confirm Quest performing location and service-area acceptance for code 90637 before collection.",
    "source": "https://www.geisingermedicallabs.com/catalog/Details?tid=2452",
    "searchAliases": [
      "anti ribosomal P CSF",
      "P0 CSF antibody",
      "CSF lupus ribosomal P",
      "neuropsychiatric lupus CSF"
    ],
    "clinicalCategories": [
      "autoimmune",
      "neurology",
      "immunology"
    ],
    "id": "quest-verified-audit-after90168-next100-20261117-90637",
    "status": "active"
  },
  {
    "testCode": "90801",
    "testName": "Trichomonas vaginalis RNA, Qualitative, TMA, Males",
    "specimenType": "Urine",
    "drawContainer": "Sterile cup",
    "alternativeContainer": "",
    "transportContainer": "Aptima Urine Transport Tube",
    "preferredVolume": "2 mL first-catch male urine into Aptima urine transport tube",
    "minimumVolume": "2 mL urine transferred to transport tube",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "No",
    "stability": "Urine in Aptima: room 30 days; refrigerated 30 days; frozen 6 months",
    "specialLabeling": "Label MALE FIRST-CATCH URINE · Aptima transport",
    "specialInstructions": "Patient must not urinate for at least ONE HOUR before collection. Collect the FIRST 20-30 mL of male urine into a clean, preservative-free Sterile cup. Transfer EXACTLY 2 mL into the APTIMA URINE Transport Tube within 24 hours, with the combined liquid level inside the clear fill-level window, then securely cap. Submit only the filled Aptima urine transport tube at ROOM TEMPERATURE. Do not substitute Aptima swab, generic Transport Tube or plain urine cup for final submission. Verify local Quest acceptance.",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/90801?cc=MASTER",
    "searchAliases": [
      "male trichomonas urine",
      "Trich TMA male",
      "TV male Aptima urine",
      "trichomoniasis men"
    ],
    "clinicalCategories": [
      "sti",
      "infectious",
      "urinary"
    ],
    "id": "quest-verified-audit-after90168-next100-20261117-90801",
    "status": "active"
  },
  {
    "testCode": "91398",
    "testName": "Metabolic Syndrome and Glucose Control Including Insulin",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "alternativeContainer": "SST / Tiger",
    "transportContainer": "Transport Tube",
    "preferredVolume": "3 mL SST serum",
    "minimumVolume": "1.6 mL SST serum",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Frozen",
    "transportTemperatureRaw": "Frozen",
    "spin": "Yes",
    "stability": "SST serum frozen 15 days; separate red-top serum frozen 28 days",
    "specialLabeling": "Label SERUM · SST source (1 of 2)",
    "specialInstructions": "TWO PHYSICALLY DISTINCT SERUM SPECIMENS REQUIRED: obtain 3 mL serum from SST Gold (usually 2 Gold tubes) or 1 Tiger SST, PLUS 0.4 mL serum from a separate plain Red Top (NO GEL). Allow to clot, centrifuge, and transfer each source separately to its OWN plastic Transport Tube. Submit TWO separate tubes FROZEN; do not pool SST and Red-Top serum into one tube. Verify receiving Quest region/account; Quest notes unavailable at SJC. No fasting restriction should be displayed unless instructed by ordering provider; Quest states lipid-panel fasting is not required.",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/91398/metabolic-syndrome-and-glucose-control-including-insulin?cc=MASTER",
    "searchAliases": [
      "metabolic syndrome insulin panel",
      "insulin glucose cholesterol triglycerides",
      "metabolic syndrome lipid profile",
      "intact insulin LC MS"
    ],
    "clinicalCategories": [
      "metabolic",
      "diabetes",
      "lipids"
    ],
    "usePreferredSerumYield": true,
    "additionalDrawRequirements": [
      {
        "container": "Red Top",
        "count": 1,
        "submissionCount": 1,
        "specimenType": "Serum",
        "purpose": "Separate serum collected in PLAIN Red Top (NO GEL)",
        "preferredVolume": "0.4 mL serum",
        "minimumVolume": "0.2 mL serum",
        "transportContainer": "Transport Tube",
        "transportTemperature": "Frozen",
        "transportTemperatureRaw": "Frozen",
        "spin": "Yes",
        "specialLabeling": "Label SERUM · RED TOP NO GEL source (2 of 2)",
        "specialInstructions": "Collect a distinct plain Red Top without gel. Clot and centrifuge, transfer at least 0.2 mL (0.4 mL preferred) serum to its OWN plastic Transport Tube; freeze. Keep separate from SST-source serum. Do not pool, submit unspun whole blood or substitute a gel tube."
      }
    ],
    "id": "quest-verified-audit-after90168-next100-20261117-91398",
    "status": "active"
  },
  {
    "testCode": "91920",
    "testName": "Diabetes Risk Panel without Score",
    "specimenType": "Serum",
    "drawContainer": "SST / Gold",
    "alternativeContainer": "SST / Tiger",
    "transportContainer": "SST / Gold (spun)",
    "preferredVolume": "3 mL serum",
    "minimumVolume": "1 mL serum",
    "collectionCount": 1,
    "submissionCount": 1,
    "transportTemperature": "Room Temperature",
    "transportTemperatureRaw": "Room Temperature",
    "spin": "Yes",
    "stability": "Serum room 48 h; refrigerated 5 d. EDTA whole blood room 7 d; refrigerated 7 d",
    "specialLabeling": "Label SERUM · SST source",
    "specialInstructions": "TWO DISTINCT SPECIMENS: collect 3 mL SST SERUM (usually 2 Gold SST tubes or 1 Tiger SST to reach preferred volume), allow to clot and CENTRIFUGE; submit in original spun SST or Quest-approved equivalent. PLUS collect 1 mL EDTA WHOLE BLOOD in a separately labeled Lavender EDTA tube; leave it UNSPUN and intact. Both submit at ROOM TEMPERATURE, in separate source containers, not combined. Verify receiving service area; Quest notes unavailable at SJC. No automatic fasting requirement for a lipid panel; follow provider prep instructions.",
    "source": "https://testdirectory.questdiagnostics.com/test/test-detail/91920?cc=MASTER",
    "searchAliases": [
      "diabetes risk without score",
      "A1c glucose lipid panel without ASCVD score",
      "diabetes screening profile",
      "diabetes assessment no risk score"
    ],
    "clinicalCategories": [
      "diabetes",
      "lipids",
      "metabolic"
    ],
    "usePreferredSerumYield": true,
    "additionalDrawRequirements": [
      {
        "container": "Lavender EDTA",
        "count": 1,
        "submissionCount": 1,
        "specimenType": "Whole Blood",
        "purpose": "Separate EDTA whole blood for HbA1c",
        "preferredVolume": "1 mL EDTA whole blood",
        "minimumVolume": "0.5 mL EDTA whole blood",
        "transportContainer": "Lavender EDTA",
        "transportTemperature": "Room Temperature",
        "transportTemperatureRaw": "Room Temperature",
        "spin": "No",
        "specialLabeling": "Label WHOLE BLOOD · LAVENDER EDTA source",
        "specialInstructions": "Draw a separate original Lavender EDTA tube, gently invert, and submit UNSPUN with the original cap at room temperature. Do not spin, aliquot, freeze, or pool with serum."
      }
    ],
    "id": "quest-verified-audit-after90168-next100-20261117-91920",
    "status": "active"
  }
];
for(const incoming of additions){
 const existing=window.SEED_TESTS.find(t=>String(t.testCode||'').trim()===incoming.testCode);
 if(!existing){window.SEED_TESTS.push(incoming);continue;}
 if(existing.status==='reference'||existing.status==='pending')Object.assign(existing,incoming,{id:existing.id||incoming.id});
}
})();
