/* Quest workbook nomenclature audit, 2026-10-22.
 * Rename ONLY specific numeric codes checked against the official Quest directory.
 * Original workbook shorthand and prior labels remain searchable by code.
 * No test codes, specimen conditions, status, priorities or pooling data change.
 * See docs/QUEST_WORKBOOK_NAME_AUDIT.md for scope and source links.
 */
(() => {
  'use strict';
  const official = {
  "249": "ANA Screen,IFA, with Reflex to Titer and Pattern",
  "859": "T3 Total",
  "10306": "Acute Viral Hepatitis Diagnostic with Reflexes (HAV, HBV, HCV)",
  "36378": "ANAlyzeR™ ANA, IFA with Reflex Titer/Pattern, Systemic Autoimmune Panel 1",
  "402": "DHEA Sulfate, Immunoassay",
  "470": "FSH (Follicle Stimulating Hormone)",
  "496": "Hemoglobin A1c",
  "615": "LH",
  "802": "Rubella Antibody (IgG), Immune Status",
  "866": "T4 Free (FT4)",
  "927": "Vitamin B12 (Cobalamin)",
  "1759": "CBC (H/H, RBC, Indices, WBC, Plt)",
  "4420": "C-Reactive Protein (CRP)",
  "5363": "PSA, Total",
  "5616": "Iron, TIBC and Ferritin Panel",
  "6399": "CBC (includes Differential and Platelets)",
  "6732": "Cytomegalovirus Antibodies (IgG, IgM)",
  "7065": "Vitamin B12 (Cobalamin) and Folate Panel, Serum",
  "7600": "Lipid Panel, Standard",
  "8396": "hCG, Total, Quantitative",
  "10124": "hs-CRP",
  "10165": "Basic Metabolic Panel",
  "10231": "Comprehensive Metabolic Panel",
  "10256": "Hepatic Function Panel",
  "14966": "Testosterone, Free, Bioavailable and Total, MS",
  "18944": "Testosterone Free, Calculation",
  "34429": "T3, Free",
  "91726": "Cardio IQ® Apolipoprotein B",
  "91729": "Cardio IQ® Lipoprotein (a)",
  "91731": "Cardio IQ® Insulin",
  "91732": "Cardio IQ® Hemoglobin A1c",
  "91737": "Cardio IQ® hs-CRP",
  "92145": "Advanced Lipid Panel, Cardio IQ®"
};
  const workbook = {
  "249": [
    "ANA screen With Reflex"
  ],
  "267": [
    "Thyroglobulin Antibodies"
  ],
  "374": [
    "CK total",
    "CPK"
  ],
  "402": [
    "DHEA - Sulfate",
    "DHEA-S"
  ],
  "470": [
    "FSH"
  ],
  "482": [
    "GGT"
  ],
  "496": [
    "Hgb A1c",
    "HbA1c"
  ],
  "539": [
    "IgA"
  ],
  "593": [
    "LDH"
  ],
  "615": [
    "Lutenizing Hormone (LH)",
    "luteinizing hormone"
  ],
  "718": [
    "Phosphate (phosphorus)"
  ],
  "799": [
    "RPR with reflex titer (monitor)"
  ],
  "802": [
    "Rubella iGG"
  ],
  "809": [
    "ESR - Sed Rate, Western (STAT)",
    "ESR",
    "sed rate"
  ],
  "866": [
    "T4- free",
    "free T4",
    "FT4"
  ],
  "867": [
    "T4 Total"
  ],
  "927": [
    "B12",
    "Vitamin B12"
  ],
  "1759": [
    "CBC (H/H, RBC, indicies, RBC, PLT)",
    "CBC no diff"
  ],
  "4420": [
    "CRP"
  ],
  "4914": [
    "PT/INR and PTT (STAT)",
    "PT PTT",
    "PT INR PTT"
  ],
  "5081": [
    "Thyroid Peroxidase Antibody - TPO"
  ],
  "5224": [
    "Apolipoprotein-B"
  ],
  "5363": [
    "PSA total"
  ],
  "5616": [
    "Iron/ TIBC and Ferritin panel",
    "iron and ferritin"
  ],
  "6399": [
    "CBC w/ diff",
    "CBC with diff"
  ],
  "6421": [
    "EBV Panel"
  ],
  "6631": [
    "Bilirubin, Total and Direct, Neonatal STAT"
  ],
  "6732": [
    "Cytomegalovirus (CMV) IgG, IgM"
  ],
  "7065": [
    "B12 + folate panel",
    "B12 folate"
  ],
  "7137": [
    "FSH and LH"
  ],
  "7260": [
    "TPO TG antibodies"
  ],
  "7444": [
    "Thyroid panel with TSH"
  ],
  "7573": [
    "lron, Total And Total lron Binding Capacity (TIBC)"
  ],
  "7600": [
    "Lipid panel",
    "lipids"
  ],
  "7788": [
    "ABO group and RH status"
  ],
  "8396": [
    "HCG total quantitative",
    "quant hCG"
  ],
  "8659": [
    "D-Dimer, Quantitative",
    "d dimer"
  ],
  "8847": [
    "PT/INR (STAT)"
  ],
  "10120": [
    "SureSwab® Advanced Vaginitis Plus, TMA"
  ],
  "10124": [
    "HS CRP",
    "hsCRP"
  ],
  "10165": [
    "BMP",
    "basic"
  ],
  "10231": [
    "CMP",
    "comprehensive"
  ],
  "10256": [
    "LFT/ Hepatic function panel",
    "LFT"
  ],
  "10306": [
    "Hepatitis panel with reflex confirmatory titers"
  ],
  "13701": [
    "PrEP GC CT"
  ],
  "13825": [
    "Quest AD-Detect® Phosphorylated tau217(p-tau217), Plasma"
  ],
  "14966": [
    "Testosterone Free, total, bioavailable, Sex hormone BG"
  ],
  "15983": [
    "Testosterone, Total, MS"
  ],
  "16220": [
    "Tick-Borne Disease, Antibody Panel w/ Reflex to Titers"
  ],
  "16599": [
    "Iodine, serum/plasm"
  ],
  "17306": [
    "Vit D, 25-OH",
    "vitamin d"
  ],
  "18944": [
    "Testosterone Free"
  ],
  "20381": [
    "Bilirubin, Total, Neonatal STAT"
  ],
  "34162": [
    "Bilirubin, Direct, Neonatal STAT"
  ],
  "34429": [
    "T3 - Free",
    "FT3"
  ],
  "34483": [
    "Troponin - T"
  ],
  "34604": [
    "Lipoprotein A"
  ],
  "34879": [
    "Methylmalonic Acid (MMA)"
  ],
  "36126": [
    "RPR with reflex titer and confirmation (diagnosis)"
  ],
  "36127": [
    "TSH reflex free T4"
  ],
  "36378": [
    "Analyzer ANA with reflex panel"
  ],
  "36577": [
    "TSH antibody"
  ],
  "36970": [
    "Quantiferon Gold TB",
    "QFT"
  ],
  "37386": [
    "BNP"
  ],
  "39416": [
    "Drug Monitoring, Panel 1, Screen, Urine"
  ],
  "58984": [
    "TSH and Free T4"
  ],
  "90271": [
    "von Willebrand Screen"
  ],
  "90567": [
    "DHT - dihydrotestosterone"
  ],
  "90963": [
    "T3 reverse",
    "Reverse T3"
  ],
  "91431": [
    "HIV 4th gen"
  ],
  "91726": [
    "Cardio IQ® Apolipoprotein B"
  ],
  "91729": [
    "Cardio IQ Lipoprotein a",
    "Lp(a)"
  ],
  "91731": [
    "CardioIQ Insulin"
  ],
  "91732": [
    "CardioIQ Hemoglobin A1c"
  ],
  "91735": [
    "Cardio IQ® Vitamin D, 25-Hydroxy"
  ],
  "91737": [
    "CardioIQ HS CRP"
  ],
  "92145": [
    "Advanced Lipid Panel CardioIQ"
  ],
  "92701": [
    "OmegaCheck®"
  ],
  "92888": [
    "Vit D25-OH, D2, D3"
  ],
  "94154": [
    "TMAO (Trimethylamine N-Oxide)"
  ]
};
  const byCode = Object.create(null);
  const sourceTests = Array.isArray(window.SEED_TESTS) ? window.SEED_TESTS : [];
  const nameChanges = [];
  for (const test of sourceTests) {
    const code = String(test.testCode ?? '').trim();
    if (!/^\d+$/.test(code) || code === '91001') continue;
    const original = String(test.testName || '').trim();
    const canonical = official[code];
    if (canonical && original && original !== canonical) {
      test.testName = canonical;
      nameChanges.push({code,from:original,to:canonical});
    }
    const names = [original, ...(workbook[code] || [])];
    if (!byCode[code]) byCode[code] = [];
    byCode[code].push(...names);
  }
  window.QUEST_WORKBOOK_SEARCH_ALIASES = Object.freeze(
    Object.fromEntries(Object.entries(byCode)
      .map(([code, names]) => [code, [...new Set(names.map(x => String(x).trim()).filter(Boolean))]]))
  );
  window.QUEST_WORKBOOK_NAME_AUDIT = Object.freeze({verifiedCodes:Object.keys(official),nameChanges});
})();
