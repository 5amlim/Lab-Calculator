(() => {
  'use strict';

  // Built-in catalog records live in data.js. Browser storage is reserved for
  // user-created tests and edits only, so catalog growth cannot exhaust localStorage.
  const USER_DATA_KEY = 'labcorpCollectionCalculator.userData.v1';
  const LEGACY_STORAGE_PREFIX = 'labcorpCollectionCalculator';
  const LEGACY_FULL_DB_KEYS = [];
  const RETIRED_TEST_CODES = new Set();
  // IDs retired when Quest 15447 / 90567 duplicate records were corrected.
  const CONSOLIDATED_TEST_IDS = {};
  const SELECTED_KEY = 'labcorpCollectionCalculator.selected.v1';
  const SST_MODE_KEY = 'labcorpCollectionCalculator.sstMode.v1';
  const TAT_REGION_KEY = 'labcorpCollectionCalculator.tatRegion.v1';
  const URINE_CULTURE_MODE_KEY = 'labcorpCollectionCalculator.urineCultureTransport.v1';
  const STAT_SELECTED_KEY = 'labcorpCollectionCalculator.statSelected.v1';
  const DEFAULT_STAT_MIGRATION_KEY = 'labcorpCollectionCalculator.defaultStat.v11.12';
  const UNDO_SED_RATE_DEFAULT_KEY = 'labcorpCollectionCalculator.undoSedRateDefault.v11.14';
  // Only canonicalize these legacy names after checking Quest's directory.
  // STAT designation is a separate order-priority choice, not part of the assay name.
  // 34162 uses the existing catalog mapping with the legacy STAT suffix removed;
  // its currently accessible Quest directory page could not be reverified.
  const VERIFIED_TEST_NAMES = Object.freeze({});
  // LabCorp STAT availability must be confirmed for each code and receiving site.
  const STAT_AREA_KEY = 'labcorpCollectionCalculator.labcorpStatArea.v1';
  // Exact code/name pairs from the provided San Leandro regional STAT worksheet (LabCorp codes).
  const SAN_LEANDRO_STAT_TESTS = Object.freeze({"115600":"Bilirubin, Direct (Neonatal)","120857":"FFN","205500":"Bilirubin, Neonatal (T,D & IND )","303754":"Electrolyte","303758":"Metabolic Panel, Basic  (7)","322000":"Metabolic Panel, Comp","322755":"Hepatic Function","322758":"Metabolic Panel, Basic  (8)","322777":"Renal panel","717314":"Vancomycin ,peak and trough","001081":"Albumin","001107":"Alk Phos","001545":"ALT","001396":"Amylase","001123":"AST","001222":"Bilirubin, Direct","015602":"Bilirubin, Neonatal (Total only)","001099":"Bilirubin, Total","001040":"BUN","001016":"Calcium","005009":"CBC + diff","001362":"CK","001578":"CO2","001370":"Creatinine","006627":"CRP","005215":"ESR","004515":"Estradiol","004598":"Ferritin","004316":"FSH","001958":"GGT","001032":"Glucose","004416":"HCG, serum,Quant","005058":"Hematocrit","005041":"Hemoglobin","001339":"Iron","001321":"Iron and TIBC","007708":"Lithium","001115":"LD","004283":"LH","001404":"Lipase","001537":"Magnesium","007906":"Phenytoin (Dilatin)","001024":"Phosphorus","005249":"Platelet Count   (auto)","001180":"Potassium","010555":"Pregnancy, Serum,Qual(Surevue)","004317":"Progesterone","005199":"PT / INR","005207":"PTT","001198":"Sodium","001073":"Total Protein","004264":"TSH","001057":"Uric Acid","003384":"Urinalysis ,no microscopic","003038":"Urinalysis, routine","003772":"Urinalysis, complete","007260":"Valproic Acid (Depakote)","070327":"Vancomycin ,peak","070328":"Vancomycin ,trough","070326":"Vancomycin, Random"});
  // Source: Labcorp Los Angeles, CA Rapid Response STAT Test Menu, document 415698_STAT-LA.0325.
  // Six-digit order codes are preserved exactly, including leading zeroes.
  const LOS_ANGELES_STAT_TESTS = Object.freeze({
    "115188": "D-Dimer",
    "115600": "Bilirubin, Direct, Neonatal",
    "120816": "Creatine Kinase (CK), MB",
    "140150": "Troponin T (Highly Sensitive)",
    "143000": "NT-proBNP",
    "180901": "Wet Prep",
    "205500": "Bilirubin Fraction, Neonatal",
    "303754": "Electrolyte Panel",
    "322000": "Metabolic Panel (14), Comprehensive",
    "322755": "Hepatic Function Panel (7)",
    "322758": "Metabolic Panel (8), Basic",
    "322777": "Renal Function Panel",
    "001545": "Alanine Aminotransferase (ALT/SGPT)",
    "001081": "Albumin",
    "001107": "Alkaline Phosphatase",
    "001396": "Amylase",
    "001123": "Aspartate Aminotransferase (AST/SGOT)",
    "001222": "Bilirubin, Direct",
    "001099": "Bilirubin, Total",
    "001214": "Bilirubin, Total and Direct",
    "015602": "Bilirubin, Total, Neonatal",
    "001016": "Calcium",
    "001578": "Carbon Dioxide, Total",
    "001206": "Chloride",
    "005009": "Complete Blood Count (CBC) With Differential, Reflex to Peripheral Smear Review",
    "006627": "C-Reactive Protein (CRP), Quantitative",
    "001362": "Creatine Kinase (CK), Total",
    "001370": "Creatinine",
    "004515": "Estradiol",
    "004309": "Follicle-stimulating Hormone (FSH)",
    "001032": "Glucose",
    "005058": "Hematocrit",
    "005041": "Hemoglobin (Hb)",
    "004416": "Human Chorionic Gonadotropin (hCG), β-Subunit, Quantitative",
    "001115": "Lactic Acid Dehydrogenase (LD)",
    "001404": "Lipase",
    "004283": "Luteinizing Hormone (LH)",
    "001537": "Magnesium",
    "005207": "Partial Thromboplastin Time (PTT), Activated",
    "001024": "Phosphorus",
    "005249": "Platelet Count",
    "001180": "Potassium",
    "004036": "Pregnancy Test, Urine",
    "004317": "Progesterone",
    "004465": "Prolactin",
    "001073": "Protein, Total",
    "005199": "Prothrombin Time (PT)",
    "005215": "Sedimentation Rate, Modified Westergren",
    "001198": "Sodium",
    "010555": "Sure-Vue Serum (hCG)",
    "001040": "Urea Nitrogen",
    "001057": "Uric Acid",
    "003772": "Urinalysis, Complete With Microscopic Examination",
    "003038": "Urinalysis, Routine With Microscopic Examination on Positives"
  });
  const STAT_AREAS = Object.freeze({
    unselected: {label:'Area not selected',codes:[],note:'Select the LabCorp receiving region; STAT status is not automatically verified.'},
    socal: {label:'Southern California',codes:[],note:'Choose the specific Los Angeles receiving lab to use its STAT menu. No region-wide STAT eligibility is assumed.'},
    socal_los_angeles: {label:'Southern California · Los Angeles',codes:Object.keys(LOS_ANGELES_STAT_TESTS),names:LOS_ANGELES_STAT_TESTS,note:'Labcorp Los Angeles Rapid Response menu (March 2025). Hours: Monday–Friday 8 AM–7 PM; Saturday 9 AM–3:30 PM. Target results within 4 hours of STAT pickup request. Call 877-STATNOW (877-782-8669) for STAT pickup. Collect separate STAT and routine specimens with separate requisitions and couriers. Verify current service eligibility, deadlines, specimen requirements, and pickup before use.'},
    norcal: {label:'Northern California',codes:[],note:'Choose San Leandro for its specific STAT menu. No region-wide eligibility is assumed.'},
    norcal_san_leandro: {label:'Northern California · San Leandro',codes:Object.keys(SAN_LEANDRO_STAT_TESTS),names:SAN_LEANDRO_STAT_TESTS,note:'San Leandro regional STAT worksheet (LabCorp codes); Monday–Friday lab hours 8:30 AM–11:30 PM, specimen receiving 9 AM–10 PM. Verify acceptance, pickup and routing before requesting STAT.'},
    ny: {label:'New York',codes:[],note:'No approved LabCorp STAT menu is loaded for this area. STAT selection is disabled pending receiving-lab verification.'},
    fl: {label:'Florida',codes:[],note:'No approved LabCorp STAT menu is loaded for this area. STAT selection is disabled pending receiving-lab verification.'},
    other: {label:'Other service area',codes:[],note:'No approved LabCorp STAT menu is loaded for this area. STAT selection is disabled pending receiving-lab verification.'}
  });
  // All STAT-eligible tests, including sedimentation rate (809), start as Routine.
  const DEFAULT_STAT_TEST_CODES = new Set();
  const LEGACY_SELECTED_KEYS = [];
  const PAGE_STEP = 10;
  // SST pooling plans use estimated usable serum, not the source tube's
  // nominal whole-blood draw capacity. These are planning assumptions only.
  const SST_USABLE_ML_PER_TUBE = 2.5;       // Gold: 5 mL blood draw.
  const TIGER_SST_USABLE_ML_PER_TUBE = 4; // Tiger: 7.5 mL blood draw.
  const SERUM_PLASMA_TESTS_PER_TRANSPORT_TUBE = 2; // Ordinary compatible aliquots only.
  const PROCESSED_SPECIMEN_USABLE_ML_PER_TUBE = 2;
  const WHOLE_BLOOD_USABLE_ML_PER_TUBE = 4;
  const SERUM_PLASMA_TO_WHOLE_BLOOD_FACTOR = 2.5;
  const RBC_TO_WHOLE_BLOOD_FACTOR = 2.5;
  const ORDER_OF_DRAW = [
    { key: 'culture', number: 1, label: 'Blood cultures', additive: 'See bottle label', tubeClass: 'tube-culture' },
    { key: 'citrate', number: 2, label: 'Light blue', additive: 'Sodium citrate', tubeClass: 'tube-blue' },
    { key: 'sst', number: 3, label: 'Gold / SST', additive: 'Gel, serum', tubeClass: 'tube-sst' },
    { key: 'serum', number: 4, label: 'Red', additive: 'No additive, serum', tubeClass: 'tube-red' },
    { key: 'heparin', number: 5, label: 'Green', additive: 'Sodium or lithium heparin — verify test', tubeClass: 'tube-green' },
    { key: 'edta', number: 6, label: 'Lavender / Pink / Tan', additive: 'EDTA', tubeClass: 'tube-lavender' },
    {
      key: 'royal',
      number: 7,
      label: 'Royal blue',
      additive: 'Trace-metal tube — verify stripe / additive',
      tubeClass: 'tube-royal'
    },
    { key: 'gray', number: 8, label: 'Gray', additive: 'Fluoride / oxalate', tubeClass: 'tube-gray' },
    { key: 'acd', number: 9, label: 'Yellow ACD', additive: 'Citrate ACD — draw last', tubeClass: 'tube-yellow' }
  ];

  const $ = (id) => document.getElementById(id);
  const els = {
    recordCount: $('recordCount'), searchInput: $('searchInput'), addBestButton: $('addBestButton'),
    previewButton: $('previewButton'), clearSearchButton: $('clearSearchButton'), batchResults: $('batchResults'),
    librarySuggestions: $('librarySuggestions'), batchSuggestions: $('batchSuggestions'),
    libraryFilter: $('libraryFilter'), categoryFilter: $('categoryFilter'), specimenFilter: $('specimenFilter'), temperatureFilter: $('temperatureFilter'), transportContainerFilter: $('transportContainerFilter'), containerNameFilter: $('containerNameFilter'), fastingFilter: $('fastingFilter'), pediatricFilter: $('pediatricFilter'), spinFilter: $('spinFilter'), catalogFilterButton: $('catalogFilterButton'), catalogFilterButtonText: $('catalogFilterButtonText'), catalogFilterPanel: $('catalogFilterPanel'), catalogFilterReset: $('catalogFilterReset'), catalogFilterDone: $('catalogFilterDone'), catalogFilterControl: $('catalogFilterControl'), clearBrowserTestsButton: $('clearBrowserTestsButton'), browserCustomCount: $('browserCustomCount'),
    libraryBody: $('libraryBody'), libraryStatus: $('libraryStatus'), loadMoreButton: $('loadMoreButton'), loadMoreInlineButton: $('loadMoreInlineButton'),
    blockedListButton: $('blockedListButton'), blockedListPanel: $('blockedListPanel'), blockedListBody: $('blockedListBody'),
    addTestButton: $('addTestButton'), addSelectedTestButton: $('addSelectedTestButton'), additionalContainers: $('additionalContainers'), addAdditionalContainerButton: $('addAdditionalContainerButton'), testsDetailsButton: $('testsDetailsButton'), testsDetailsPanel: $('testsDetailsPanel'),
    selectedCount: $('selectedCount'), selectedList: $('selectedList'), testsOverviewList: $('testsOverviewList'), testsOverviewSummary: $('testsOverviewSummary'),
    drawPlan: $('drawPlan'), drawPlanSummary: $('drawPlanSummary'), orderOfDraw: $('orderOfDraw'), orderOfDrawSummary: $('orderOfDrawSummary'), collectionAlerts: $('collectionAlerts'), clearOrderButton: $('clearOrderButton'),
    printButton: $('printButton'), exportSummaryButton: $('exportSummaryButton'),
    statAreaSelect: $('statAreaSelect'), statSelectWrap: $('statSelectWrap'), statAreaButton: $('statAreaButton'), statAreaButtonLabel: $('statAreaButtonLabel'), statAreaOptions: $('statAreaOptions'), statAreaHelp: $('statAreaHelp'), statMenuButton: $('statMenuButton'), statMenuPanel: $('statMenuPanel'), statMenuClose: $('statMenuClose'), statMenuSearch: $('statMenuSearch'), statMenuTitle: $('statMenuTitle'), statMenuCount: $('statMenuCount'), statMenuResults: $('statMenuResults'),
    sstModeOptions: Array.from(document.querySelectorAll('[data-sst-mode]')),
    urineCultureControl: $('urineCultureModeControl'), urineCultureModeOptions: Array.from(document.querySelectorAll('[data-urine-culture-mode]')),
    printSheet: $('printSheet'), testDialog: $('testDialog'), testForm: $('testForm'), dialogTitle: $('dialogTitle'),
    closeDialogButton: $('closeDialogButton'), cancelDialogButton: $('cancelDialogButton'), deleteTestButton: $('deleteTestButton'),
    saveTestButton: $('saveTestButton'), testId: $('testId'), testCode: $('testCode'), testName: $('testName'), addedByInitials: $('addedByInitials'), addedByInitialsRow: $('addedByInitialsRow'), specimenType: $('specimenType'),
    drawContainer: $('drawContainer'), customDrawContainer: $('customDrawContainer'), customDrawContainerRow: $('customDrawContainerRow'), alternativeContainer: $('alternativeContainer'), collectionCount: $('collectionCount'), submissionCount: $('submissionCount'), transportContainer: $('transportContainer'), customTransportContainer: $('customTransportContainer'), customTransportContainerRow: $('customTransportContainerRow'),
    preferredVolume: $('preferredVolume'), minimumVolume: $('minimumVolume'), transportTemperature: $('transportTemperature'),
    transportTemperatureRaw: $('transportTemperatureRaw'), stability: $('stability'), spin: $('spin'),
    specialLabeling: $('specialLabeling'), specialInstructions: $('specialInstructions'), blockedStatus: $('blockedStatus'), addToSummary: $('addToSummary'),
    addToSummaryRow: $('addToSummaryRow'), optionalDetails: $('optionalDetails'), openDirectoryFromDialogButton: $('openDirectoryFromDialogButton'), toast: $('toast')
  };

  const LAB_SEARCH_ALIAS_RULES = [
    { name: /^(?:cmp|comprehensive metabolic panel)(?:$|\s)/, terms: ['chem 14', 'chemistry 14', 'comprehensive metabolic panel', 'cmp'] },
    { name: /^(?:bmp|basic metabolic panel)(?:$|\s)/, terms: ['chem 7', 'chemistry 7', 'basic metabolic panel', 'bmp'] },
    { name: /^(?:cbc|complete blood count)(?:$|\s)/, terms: ['cbc', 'complete blood count', 'blood count', 'hemogram'] },
    { name: /^cbc\b.*(?:diff|differential)/, terms: ['cbc diff', 'cbc with diff', 'cbc with differential', 'complete blood count with differential', 'cbc w diff', 'cbc d p'] },
    { name: /^cbc\b.*(?:h h|indices)/, terms: ['cbc without diff', 'cbc no diff', 'cbc no differential'] },
    { name: /^(?:hemoglobin a1c|a1c)(?:$|\s)/, terms: ['hba1c', 'hb a1c', 'hgb a1c', 'glycated hemoglobin', 'glycosylated hemoglobin', 'a1c'] },
    { name: /^tsh$|^tsh(?: reflex| and free| with hama| pregnancy)/, terms: ['thyroid stimulating hormone', 'thyrotropin'] },
    { name: /^tsh.*reflex.*(?:free|t4)/, terms: ['tsh reflex', 'tsh reflex t4', 'tsh reflex ft4', 'thyroid reflex'] },
    { name: /^t4 free\b|^free t4\b/, terms: ['ft4', 'free t4', 'free thyroxine'] },
    { name: /^t3 free\b|^free t3\b|^t3\s+free\b/, terms: ['ft3', 'free t3', 'free triiodothyronine'] },
    { name: /^thyroid peroxidase antibody\b/, terms: ['tpo ab', 'anti tpo', 'thyroid peroxidase antibody'] },
    { name: /^tsi\b/, terms: ['thyroid stimulating immunoglobulin', 't s i'] },
    { name: /^lipid panel\b/, terms: ['lipid profile', 'cholesterol panel', 'lipids'] },
    { name: /^triglycerides?\b/, terms: ['trigs', 'tg triglycerides', 'trig'] },
    { name: /^hdl cholesterol\b/, terms: ['hdl c', 'good cholesterol'] },
    { name: /^(?:direct ldl|ldl cholesterol)\b/, terms: ['ldl c', 'bad cholesterol'] },
    { name: /^apolipoprotein b\b/, terms: ['apo b', 'apob'] },
    { name: /^lipoprotein a\b/, terms: ['lp a', 'lpa', 'lipoprotein a'] },
    { name: /^(?:crp|c reactive protein)$/, terms: ['c reactive protein', 'standard crp', 'crp'] },
    { name: /^(?:hs crp|cardioiq hs crp|cardio iq hs crp)\b/, terms: ['hscrp', 'hs crp', 'high sensitivity crp', 'high sensitive c reactive protein', 'cardiac crp'] },
    { name: /^(?:esr|erythrocyte sedimentation rate|sedimentation rate)\b/, terms: ['sed rate', 'sedimentation rate', 'erythrocyte sedimentation rate', 'esr'] },
    { name: /^ana screen\b/, terms: ['antinuclear antibody', 'anti nuclear antibody', 'ana screening', 'ana screen'] },
    { name: /^pt\s+inr\b/, terms: ['protime', 'prothrombin time', 'pt inr', 'prothrombin time inr'] },
    { name: /^partial thromboplastin time activated\b/, terms: ['ptt', 'aptt', 'activated partial thromboplastin time', 'partial thromboplastin time'] },
    { name: /^d dimer\b/, terms: ['d dimer', 'ddimer', 'dimer'] },
    { name: /^creatine kinase.*total|^ck\s+total$/, terms: ['ck', 'cpk', 'creatine phosphokinase', 'total ck'] },
    { name: /^troponin i high sensitivity\b/, terms: ['hs tni', 'hstni', 'high sensitivity troponin i', 'hs troponin i'] },
    { name: /^troponin t high sensitivity\b/, terms: ['hs tnt', 'hstnt', 'high sensitivity troponin t', 'hs troponin t'] },
    { name: /^pro bnp n terminal\b|^cardio iq nt probnp\b/, terms: ['nt probnp', 'ntprobnp', 'pro bnp', 'n terminal pro bnp'] },
    { name: /^bnp$/, terms: ['b type natriuretic peptide', 'brain natriuretic peptide'] },
    { name: /^psa total\b/, terms: ['total psa', 'prostate specific antigen', 'psa screening'] },
    { name: /^hcg.*quantitative|^hcg total quantitative/, terms: ['quant hcg', 'beta hcg quantitative', 'bhcg quant', 'hcg quant'] },
    { name: /^hcg.*qualitative|^hcg total qualitative/, terms: ['qual hcg', 'pregnancy blood test', 'beta hcg qualitative'] },
    { name: /^hepatitis b surface antigen\b/, terms: ['hbsag', 'hep b surface ag', 'hbv surface antigen'] },
    { name: /^hepatitis b surface antibody\b/, terms: ['hbsab', 'anti hbs', 'hep b surface antibody'] },
    { name: /^hepatitis b core antibody total\b/, terms: ['hbcab total', 'anti hbc total', 'hbv core antibody'] },
    { name: /^hepatitis c antibody\b/, terms: ['hcv ab', 'anti hcv', 'hep c antibody'] },
    { name: /^hiv 1 2 antigen and antibodies fourth generation\b/, terms: ['hiv 4th gen', 'hiv 4th generation', 'hiv ag ab', 'hiv antigen antibody', 'fourth generation hiv'] },
    { name: /^urinalysis\b/, terms: ['ua', 'urine analysis', 'urine test'] },
    { name: /^urinalysis complete with reflex to culture\b/, terms: ['ua reflex culture', 'ua with reflex', 'ua cx reflex', 'urinalysis reflex culture'] },
    { name: /^culture urine routine\b/, terms: ['ucx', 'urine cx', 'urine culture', 'culture urine', 'urine c s'] },
    { name: /^albumin random urine with creatinine\b/, terms: ['uacr', 'uac ratio', 'urine acr', 'microalbumin creatinine ratio', 'urine microalbumin creatinine'] },
    { name: /^albumin random urine without creatinine\b/, terms: ['urine microalbumin', 'microalbumin urine', 'urine albumin'] },
    { name: /^quanti feron tb gold plus\b|^quantiferon tb gold plus\b/, terms: ['qft', 'qft gold', 'quant gold', 'quantiferon', 'quantiferon gold', 'tb gold', 'igra tb'] },
    { name: /^chlamydia.*neisseria gonorrhoeae\b/, terms: ['ct ng', 'gc ct', 'gc chlamydia', 'chlamydia gonorrhea', 'gonorrhea chlamydia', 'gc chlamydia pcr'] },
    { name: /^neisseria gonorrhoeae\b/, terms: ['gonorrhea', 'gonorrhoea', 'gc test'] },
    { name: /^chlamydia trachomatis\b/, terms: ['chlamydia', 'ct test'] },
    { name: /^vitamin b12\b|^b12$/, terms: ['vit b12', 'vitamin b 12', 'cobalamin', 'b 12'] },
    { name: /^b12 folate panel\b/, terms: ['b12 folate', 'b12 and folate', 'folate b12'] },
    { name: /^hemoglobin$/, terms: ['hgb', 'hb', 'hemoglobin level'] },
    { name: /^hematocrit$/, terms: ['hct', 'hematocrit level'] },
    { name: /^platelet count\b/, terms: ['plt', 'platelets', 'platelet count'] },
    { name: /^fsh(?:$|\s)/, terms: ['follicle stimulating hormone', 'follicle stimulating hormone fsh'] },
    { name: /^luteinizing hormone\b/, terms: ['lh', 'lutropin', 'luteinizing hormone'] },
    { name: /^folate serum\b/, terms: ['folic acid', 'serum folate'] },
    { name: /^(?:vitamin d 25 hydroxy|cardio iq vitamin d 25 hydroxy|questassured.*25 hydroxyvitamin d)\b/, terms: ['25 oh vit d', '25ohd', '25 hydroxy vitamin d', 'vit d 25', 'vitamin d 25', 'vitamin d', 'vit d'] },
    { name: /^lft\b|^hepatic function panel\b/, terms: ['lft', 'liver function tests', 'liver panel', 'hepatic panel'] },
    { name: /^iron total and total iron binding capacity\b/, terms: ['iron tibc', 'iron and tibc', 'iron binding capacity'] },
    { name: /^anti streptolysin o antibody\b/, terms: ['aso', 'aso titer', 'antistreptolysin o'] },
    { name: /^epstein barr virus antibody panel\b/, terms: ['ebv panel', 'epstein barr panel', 'mono antibodies'] },
    { name: /^epstein barr virus early antigen d antibody\b/, terms: ['ebv ea d', 'ebv early antigen d', 'ea d igg'] },
    { name: /^dihydrotestosterone$/, terms: ['dht'] }
  ];

  // Additional catalog-name variants shared by Quest and Labcorp.
  // These are search hints only; they never substitute an order code.
  const SMART_LAB_ALIAS_RULES = [
    { name: /^(?:creatinine clearance|creatinine clearance test)\b/, terms: ['crcl', 'cr clearance', 'creat clearance'] },
    { name: /^(?:5 hiaa|5 hydroxyindoleacetic acid)\b/, terms: ['5hiaa', '5 hiaa', '5 hydroxyindoleacetic acid'] },
    { name: /^(?:angiotensin(?: 1)? converting enzyme|ace)\b/, terms: ['ace level', 'ace', 'angiotensin converting enzyme'] },
    { name: /^(?:erythropoietin|epo)\b/, terms: ['epo', 'erythropoietin'] },
    { name: /^(?:17 hydroxyprogesterone|17 oh progesterone|17 ohp)\b/, terms: ['17ohp', '17 ohp', '17 oh progesterone', '17 hydroxyprogesterone'] },
    { name: /^(?:c telopeptide|ctx)\b/, terms: ['ctx', 'c telopeptide'] },
    { name: /^(?:intrinsic factor blocking antibod(?:y|ies)|intrinsic factor antibod(?:y|ies))\b/, terms: ['ifab', 'intrinsic factor ab'] },
    { name: /^(?:tissue transglutaminase|transglutaminase tissue)\b.*\biga\b/, terms: ['ttg iga', 'iga ttg', 'tissue transglutaminase iga'] },
    { name: /^(?:tissue transglutaminase|transglutaminase tissue)\b.*\bigg\b/, terms: ['ttg igg', 'igg ttg', 'tissue transglutaminase igg'] },

    { name: /^(?:sed rate|sedimentation rate|erythrocyte sedimentation rate)\b/, terms: ['esr', 'sed rate', 'sedimentation rate', 'westergren'] },
    { name: /^(?:metabolic panel\b.*\bbasic\b|basic metabolic panel\b|bmp\b)/, terms: ['bmp', 'basic metabolic panel', 'chem 7', 'chem 8'] },
    { name: /^(?:metabolic panel\b.*\bcomprehensive\b|comprehensive metabolic panel\b|cmp\b)/, terms: ['cmp', 'comprehensive metabolic panel', 'chem 14'] },
    { name: /^(?:complete blood count|cbc)\b.*\b(?:with|w)\b.*\b(?:diff|differential)\b/, terms: ['cbc diff', 'cbc with diff', 'cbc w diff', 'cbc differential'] },
    { name: /^(?:complete blood count|cbc)\b.*\b(?:without|no)\b.*\b(?:diff|differential)\b/, terms: ['cbc no diff', 'cbc without diff', 'cbc w o diff'] },
    { name: /^(?:hemoglobin a1c|hba1c|glycohemoglobin)\b/, terms: ['a1c', 'hba1c', 'hgb a1c', 'glycated hemoglobin'] },
    { name: /^troponin i\b.*\b(?:high sensitivity|highly sensitive)\b/, terms: ['hs trop i', 'hs troponin i', 'hstni', 'tni hs'] },
    { name: /^troponin t\b.*\b(?:high sensitivity|highly sensitive)\b/, terms: ['hs trop t', 'hs troponin t', 'hstnt', 'tnt hs'] },
    { name: /^(?:nt pro bnp|pro bnp|n terminal pro bnp|b type natriuretic peptide n terminal)\b/, terms: ['nt probnp', 'nt pro bnp', 'pro bnp'] },
    { name: /^(?:culture urine|urine culture)\b/, terms: ['ucx', 'urine cx', 'urine culture'] },
    { name: /^urinalysis\b.*\breflex\b.*\bculture\b/, terms: ['ua reflex culture', 'ua reflex', 'ua with reflex culture'] },
    { name: /^(?:25 hydroxy vitamin d|vitamin d 25 hydroxy|vitamin d 25 oh)\b/, terms: ['25ohd', '25 oh vit d', 'vit d 25', 'vitamin d 25'] },
    { name: /^(?:quanti feron|quantiferon)\b/, terms: ['qft', 'quant gold', 'quantiferon gold', 'tb gold', 'igra'] },
    { name: /^(?:iron and tibc|iron total and total iron binding capacity)\b/, terms: ['iron tibc', 'tibc', 'iron binding capacity'] },
    { name: /^(?:c reactive protein|crp)\b(?!.*\bhigh sensitivity\b)/, terms: ['crp', 'c reactive protein'] },
    { name: /^c reactive protein\b.*\b(?:high sensitivity|cardiac)\b|^hs crp\b/, terms: ['hscrp', 'hs crp', 'high sensitivity crp'] },
    { name: /^thyroid stimulating hormone\b/, terms: ['tsh', 'thyrotropin'] },
    { name: /^thyroid stimulating hormone\b.*\breflex\b/, terms: ['tsh reflex', 'thyroid reflex'] }
  ];


  const seedDatabase = (window.SEED_TESTS || []).map(normalizeRecord);
  if (!seedDatabase.some(test => test.testCode === '180026')) {
    seedDatabase.push(normalizeRecord({ id: 'labcorp-180026', testCode: '180026' }));
  }

  // Lab Central requests a read-only published catalog in a same-origin frame.
  // Apply the calculator's actual clinic-wide policies, but never read or write
  // localStorage or include staff-created/manual records and browser overrides.
  if (window.parent && window.parent !== window && new URLSearchParams(window.location?.search || '').get('labcentral-index') === '1') {
    const published = applyUserState({customTests: [], overrides: []});
    const categories = window.LabClinicalCategories;
    const labels = new Map((categories?.options || []).map(c => [c.id,c.label]));
    const byCode = new Map();
    for (const test of published) {
      if (test.status !== 'active' || !test.testCode || !test.testName) continue;
      const code = String(test.testCode).trim();
      if (!/^\d{2,8}$/.test(code)) continue;
      const aliases = Array.from(new Set([
        ...curatedLabAliases(normalizeSearch(test.testName)),
        ...(window.QUEST_WORKBOOK_SEARCH_ALIASES?.[code] || []),
        ...(test.searchAliases || []),
        ...(categories?.forTest(test) || []).flatMap(id => [id,labels.get(id)]).filter(Boolean)
      ]));
      const row = [code,test.testName,test.specimenType || '',aliases];
      const previous = byCode.get(code);
      if (previous) previous[3] = Array.from(new Set([...previous[3],test.testName,...aliases]));
      else byCode.set(code,row);
    }
    window.parent.postMessage({
      type:'labcentral:published-tests', lab:'labcorp', schema:1,
      tests:Array.from(byCode.values())
    },window.location.origin);
    return;
  }

  let pendingUserState = null;
  let database = loadDatabase();
  let selectedIds = loadSelectedIds();
  let statArea = loadStatArea();
  let statMenuOpen = false;
  let statSelectedIds = loadStatSelectedIds();
  let statAreaResetNotice = '';
  undoPriorSedRateDefault();
  applyDefaultStatMigration();
  reconcileStatWithArea();
  let sstTubeMode = loadSstTubeMode();
  let urineCultureMode = loadUrineCultureMode();
  finalizeStorageMigration();
  let batchReviewRows = [];
  let statActionTip = null;
  let statActionTipButton = null;
  let containerFlowTip = null;
  let containerFlowButton = null;
  let containerFlowPinned = false;
  let containerFlowHideTimer = null;
  let libraryLimit = PAGE_STEP;
  let blockedListOpen = false;
  const suggestionState = {
    library: { active: -1, items: [] },
    batch: { active: -1, items: [] }
  };
  let toastTimer;
  let refreshBatchHints = () => {};

  function init() {
    if (els.categoryFilter && window.LabClinicalCategories) {
      els.categoryFilter.innerHTML = '<option value="">All categories</option>' +
        window.LabClinicalCategories.options.map(({id,label}) =>
          `<option value="${id}">${label.replace(/&/g, '&amp;')}</option>`).join('');
    }
    if (window.LabBatchInlineHints) {
      refreshBatchHints = window.LabBatchInlineHints.mount(els.searchInput, query =>
        window.LabBatchInlineHints.resolveExact(query, database, normalizeSearch));
    }
    restoreTatRegion();
    bindEvents();
    renderAll();
  }

  function bindEvents() {
    els.previewButton.addEventListener('click', () => renderBatch(false));
    els.addBestButton.addEventListener('click', () => renderBatch(true));
    els.clearSearchButton.addEventListener('click', () => {
      els.searchInput.value = '';
      refreshBatchHints();
      closeSuggestions('batch');
      els.batchResults.classList.add('hidden');
      els.batchResults.innerHTML = '';
      els.searchInput.focus();
    });
    els.searchInput.addEventListener('input', () => renderSuggestions('batch'));
    els.searchInput.addEventListener('focus', () => renderSuggestions('batch'));
    els.searchInput.addEventListener('click', () => renderSuggestions('batch'));
    els.searchInput.addEventListener('keydown', (event) => {
      if (handleSuggestionKeydown('batch', event)) return;
      if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
        closeSuggestions('batch');
        renderBatch(true);
      }
    });
    els.libraryFilter.addEventListener('input', () => {
      libraryLimit = PAGE_STEP;
      renderLibrary();
      renderSuggestions('library');
    });
    els.libraryFilter.addEventListener('focus', () => renderSuggestions('library'));
    els.libraryFilter.addEventListener('keydown', event => handleSuggestionKeydown('library', event));
    // Native search submission (including mobile keyboards) dismisses suggestions.
    els.libraryFilter.addEventListener('search', () => closeSuggestions('library'));
    for (const kind of ['library', 'batch']) {
      const panel = kind === 'library' ? els.librarySuggestions : els.batchSuggestions;
      panel.addEventListener('click', event => {
        const option = event.target.closest('.calc-suggestion-option');
        if (option) chooseSuggestion(kind, Number(option.dataset.index));
      });
    }
    document.addEventListener('pointerdown', event => {
      if (!event.target.closest('#libraryAutocomplete')) closeSuggestions('library');
      if (!event.target.closest('#batchAutocomplete')) closeSuggestions('batch');
    });

    [els.categoryFilter, els.specimenFilter, els.temperatureFilter, els.transportContainerFilter, els.fastingFilter, els.pediatricFilter, els.spinFilter].forEach(control => control.addEventListener('change', () => { libraryLimit = PAGE_STEP; renderLibrary(); }));
    els.containerNameFilter.addEventListener('input', () => { libraryLimit = PAGE_STEP; renderLibrary(); });
    els.catalogFilterButton.addEventListener('click', () => { if (els.catalogFilterPanel.classList.contains('hidden')) setStatPickerOpen(false); toggleCatalogFilters(); });
    els.catalogFilterDone.addEventListener('click', () => toggleCatalogFilters(false));
    els.catalogFilterReset.addEventListener('click', resetCatalogFilters);
    document.addEventListener('click', event => { if (!els.catalogFilterControl.contains(event.target)) toggleCatalogFilters(false); });
    document.addEventListener('keydown', event => { if (event.key === 'Escape') toggleCatalogFilters(false); });
    els.clearBrowserTestsButton.addEventListener('click', clearBrowserAddedTests);
    els.loadMoreButton.addEventListener('click', () => { libraryLimit += PAGE_STEP; renderLibrary(); });
    els.blockedListButton?.addEventListener('click', () => { blockedListOpen = !blockedListOpen; renderBlockedList(); });
    els.loadMoreInlineButton?.addEventListener('click', () => { libraryLimit += PAGE_STEP; renderLibrary(); });
    $('tatRegionFilter')?.addEventListener('change', () => {
    try { localStorage.setItem(TAT_REGION_KEY, $('tatRegionFilter').value); } catch (_) {}
    hideTatPreview();
    renderTurnaroundTime(selectedTests());
  });
    $('turnaroundTime')?.addEventListener('click', event => {
      const button = event.target.closest('button[data-cart-tat-id]');
      if (button) showTatDetails(selectedTests().find(test => test.id === button.dataset.cartTatId));
    });
    els.libraryBody.addEventListener('click', handleLibraryClick);
    els.libraryBody.addEventListener('pointerover', event => {
      if (event.pointerType !== 'mouse') return;
      const button = event.target.closest('button[data-action="view-tat"]');
      if (button) showTatPreview(button);
    });
    els.libraryBody.addEventListener('pointerout', event => {
      const button = event.target.closest('button[data-action="view-tat"]');
      if (button && !button.contains(event.relatedTarget)) hideTatPreview();
    });
    els.libraryBody.addEventListener('focusin', event => {
      const button = event.target.closest('button[data-action="view-tat"]');
      if (button && button.matches(':focus-visible')) showTatPreview(button);
    });
    els.libraryBody.addEventListener('focusout', event => {
      if (event.target === tatPreviewButton) hideTatPreview();
    });
    document.addEventListener('scroll', hideTatPreview, true);
    window.addEventListener('resize', hideTatPreview);
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') hideTatPreview();
    });

    els.libraryBody.addEventListener('pointerover', event => {
      if (event.pointerType === 'touch') return;
      const button = event.target.closest('button[data-container-more]');
      if (button) showContainerFlowTip(button);
    });
    els.libraryBody.addEventListener('pointerout', event => {
      const button = event.target.closest('button[data-container-more]');
      if (button && !button.contains(event.relatedTarget) && !containerFlowPinned) scheduleContainerFlowTipHide();
    });
    els.libraryBody.addEventListener('focusin', event => {
      const button = event.target.closest('button[data-container-more]');
      if (button) showContainerFlowTip(button);
    });
    els.libraryBody.addEventListener('focusout', event => {
      if (event.target === containerFlowButton && !containerFlowPinned) scheduleContainerFlowTipHide();
    });
    document.addEventListener('pointerdown', event => {
      if (containerFlowPinned && !event.target.closest('button[data-container-more]')) hideContainerFlowTip();
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && containerFlowTip) hideContainerFlowTip();
    });
    document.addEventListener('scroll', event => {
      // Scrolling inside a long preview should not dismiss it.
      if (containerFlowTip && containerFlowTip.contains(event.target)) return;
      hideContainerFlowTip();
    }, true);
    window.addEventListener('resize', hideContainerFlowTip);
    els.batchResults.addEventListener('click', handleBatchClick);
    // These delegated handlers continue to work after matches are refreshed.
    els.batchResults.addEventListener('pointerover', event => {
      if (event.pointerType === 'touch') return;
      const button = event.target.closest('button[data-stat-note]');
      if (button) showStatActionTip(button);
    });
    els.batchResults.addEventListener('pointerout', event => {
      const button = event.target.closest('button[data-stat-note]');
      if (button && !button.contains(event.relatedTarget) && document.activeElement !== button) hideStatActionTip();
    });
    els.batchResults.addEventListener('focusin', event => {
      const button = event.target.closest('button[data-stat-note]');
      if (button) showStatActionTip(button);
    });
    els.batchResults.addEventListener('focusout', event => {
      if (event.target === statActionTipButton) hideStatActionTip();
    });
    els.batchResults.addEventListener('click', event => {
      if (event.target.closest('button[data-stat-note]')) hideStatActionTip();
    });
    document.addEventListener('scroll', hideStatActionTip, true);
    window.addEventListener('resize', hideStatActionTip);
    document.addEventListener('click', event => {
      if (!event.target.closest('.batch-choice-dropdown')) {
        els.batchResults.querySelectorAll('.batch-choice-dropdown.is-open').forEach(dropdown => setBatchChoiceOpen(dropdown, false));
      }
      if (!event.target.closest('.batch-choice-entry, .batch-main-add-control')) closeBatchAddOptions();
    });
    els.batchResults.addEventListener('keydown', event => {
      const trigger = event.target.closest('.batch-choice-trigger');
      const menu = event.target.closest('.batch-choice-menu');
      if (trigger && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
        event.preventDefault();
        const dropdown = trigger.closest('.batch-choice-dropdown');
        els.batchResults.querySelectorAll('.batch-choice-dropdown.is-open').forEach(item => setBatchChoiceOpen(item, false));
        setBatchChoiceOpen(dropdown, true);
        const options = Array.from(dropdown.querySelectorAll('.batch-choice-option'));
        (event.key === 'ArrowUp' ? options[options.length - 1] : options.find(item => item.classList.contains('is-selected')) || options[0])?.focus();
        return;
      }
      if (menu && ['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
        event.preventDefault();
        const options = Array.from(menu.querySelectorAll('.batch-choice-option'));
        const index = options.indexOf(document.activeElement);
        const next = event.key === 'Home' ? 0 : event.key === 'End' ? options.length - 1
          : event.key === 'ArrowUp' ? (index - 1 + options.length) % options.length
          : (index + 1) % options.length;
        options[next]?.focus();
        return;
      }
      if (event.key === 'Escape') {
        const openAdd = els.batchResults.querySelector('.batch-add-toggle[aria-expanded="true"]');
        if (openAdd) {
          event.preventDefault();
          closeBatchAddOptions();
          openAdd.focus();
          return;
        }
        const opened = els.batchResults.querySelector('.batch-choice-dropdown.is-open');
        if (opened) {
          event.preventDefault();
          setBatchChoiceOpen(opened, false);
          opened.querySelector('.batch-choice-trigger')?.focus();
        } else if (!els.batchResults.classList.contains('hidden')) {
          event.preventDefault();
          closeBatchResults();
        }
      }
    });
    els.selectedList.addEventListener('click', handleSelectedClick);
    els.testsOverviewList.addEventListener('click', handleTestsOverviewClick);
    els.addTestButton.addEventListener('click', openMissingTestDialog);
    els.addSelectedTestButton.addEventListener('click', openMissingTestDialog);
    els.testsDetailsButton.addEventListener('click', toggleTestsDetails);
    els.clearOrderButton.addEventListener('click', clearOrder);
    els.printButton.addEventListener('click', printSummary);
    els.exportSummaryButton.addEventListener('click', exportSummaryCsv);
    els.sstModeOptions.forEach(button => button.addEventListener('click', () => setSstTubeMode(button.dataset.sstMode)));
    els.statAreaSelect?.addEventListener('change', () => changeStatArea(els.statAreaSelect.value));
    initializeStatAreaPicker();
    els.statMenuButton?.addEventListener('click', () => { statMenuOpen = !statMenuOpen; renderStatMenu(); });
    els.statMenuClose?.addEventListener('click', () => { statMenuOpen = false; renderStatMenu(); });
    els.statMenuSearch?.addEventListener('input', renderStatMenu);
    els.statMenuResults?.addEventListener('click', handleStatMenuClick);
    els.urineCultureModeOptions.forEach(button => button.addEventListener('click', () => setUrineCultureMode(button.dataset.urineCultureMode)));
    els.closeDialogButton.addEventListener('click', closeDialog);
    els.cancelDialogButton.addEventListener('click', closeDialog);
    els.testForm.addEventListener('submit', saveTestFromForm);
    els.deleteTestButton.addEventListener('click', deleteCustomTest);
    els.openDirectoryFromDialogButton.addEventListener('click', openDirectoryFromDialog);
    els.addAdditionalContainerButton.addEventListener('click', () => addAdditionalContainerForm());
    els.drawContainer.addEventListener('change', () => { toggleCustomDrawContainer(); updateSstSpinRequirement(); });
    els.customDrawContainer.addEventListener('input', updateSstSpinRequirement);
    els.transportContainer.addEventListener('change', toggleCustomTransportContainer);
    els.specimenType.addEventListener('change', () => {
      // Stool specimens start in a sterile collection cup. Preserve explicitly
      // selected special containers for exceptional collection workflows.
      if (els.specimenType.value === 'Stool' && (els.drawContainer.value !== '__other__' ||
        /^(?:stool container|sterile cup|total[- ]?fix(?:®)?(?: transport vial)?)$/i.test(selectedDrawContainer(true)))) {
        setDrawContainerValue('Sterile cup');
        window.syncPortalSelects?.();
      }
    });
  }

  function renderRecordCount() {
    const activeCount = database.filter(test => test.status === 'active').length;
    const referenceCount = database.filter(test => test.status === 'pending').length;
    const referenceText = referenceCount
      ? ` · ${referenceCount} directory-only ${referenceCount === 1 ? 'reference' : 'references'}`
      : '';
    els.recordCount.textContent = `${activeCount} active tests${referenceText}`;
  }

  function renderAll() {
    renderRecordCount();
    renderLibrary();
    renderBlockedList();
    renderOrder();
    refreshBatchHints();
  }

  function loadDatabase() {
    let state = loadJson(USER_DATA_KEY, null);
    if (!isUserState(state)) {
      state = migrateLegacyUserData();
      if (!saveUserState(state)) pendingUserState = state;
    }
    return applyUserState(state);
  }

  function isUserState(state) {
    return Boolean(state && typeof state === 'object' &&
      Array.isArray(state.customTests) && Array.isArray(state.overrides));
  }

  function migrateLegacyUserData() {
    // Older builds stored the full built-in catalog in localStorage. Only migrate
    // staff-created custom tests; published built-in data should come from data.js.
    const custom = new Map();
    LEGACY_FULL_DB_KEYS.forEach(key => {
      const legacy = loadJson(key, null);
      if (!Array.isArray(legacy)) return;
      legacy.map(normalizeRecord)
        .filter(test => test.id.startsWith('custom-') || test.source === 'Custom entry')
        .forEach(test => {
          if (!custom.has(test.id)) custom.set(test.id, test);
        });
    });
    return { customTests: Array.from(custom.values()), overrides: [] };
  }

  // Hair and nail specimens are not collected by this clinic.
  function blockHairOrNailSpecimen(test) {
    if (!test || test.status === 'reference') return test;
    const specimen = String(test.specimenType || '').trim().toLowerCase();
    const required = /\b(?:hair|nails?|fingernails?|toenails?|nail clippings?)\b/.test(specimen);
    const alternatives = /\b(?:skin|swab|serum|plasma|blood|urine|stool|tissue|saliva|sputum|csf|fluid)\b/.test(specimen);
    if (!required || alternatives) return test;
    const notice = 'DO NOT PERFORM ONSITE. Hair and nail specimens are not collected at our clinics.';
    const instructions = String(test.specialInstructions || '');
    return { ...test, status: 'blocked',
      specialInstructions: instructions.includes(notice) ? instructions : notice + ' ' + instructions };
  }

  function applyUserState(state) {
    // Separate LabCorp records and local edits; no Quest code migrations.
    const builtIns = seedDatabase.map(test => ({ ...test }));
    const byId = new Map(builtIns.map((test, i) => [test.id, i]));
    const byKey = new Map(builtIns.map((test, i) => [databaseKey(test), i]));
    (state.overrides || []).map(normalizeRecord).forEach(override => {
      const index = byId.get(override.id) ?? byKey.get(databaseKey(override));
      if (index === undefined) return;
      const base = builtIns[index];
      if (base.status === 'blocked') return;
      builtIns[index] = override;
    });
    const blockedByCode = new Map(builtIns.filter(test => test.status === 'blocked' && test.testCode)
      .map(test => [test.testCode, test]));
    const customTests = (state.customTests || []).map(normalizeRecord).map(test => {
      const blocked = blockedByCode.get(test.testCode);
      return blocked ? { ...test, status: 'blocked', specialInstructions: blocked.specialInstructions } : test;
    });
    return [...customTests, ...builtIns].map(verifiedAffirmRecord).map(blockHairOrNailSpecimen);
  }

  function verifiedAffirmRecord(test) {
    if (String(test.testCode || '').trim() !== '180026') return test;
    return normalizeRecord({
      ...test,
      testName: 'Vaginitis/Vaginosis, DNA Probe (Affirm VPIII)',
      specimenType: 'Vaginal Swab',
      drawContainer: 'BD Affirm VPIII ATTS swab transport kit',
      transportContainer: 'BD Affirm VPIII ATTS swab transport kit',
      alternativeContainer: '',
      additionalDrawRequirements: [],
      collectionCount: 1,
      submissionCount: 1,
      preferredVolume: '1 vaginal swab in Affirm ATTS tube',
      minimumVolume: '1 swab in Affirm ATTS tube',
      transportTemperature: 'Room Temperature',
      transportTemperatureRaw: 'Room temperature only',
      stability: '72 hours at room temperature; do not freeze',
      spin: 'No',
      status: 'active',
      specialInstructions: 'Use the BD Affirm VPIII Ambient Temperature Transport System (ATTS). Break the reagent ampule and add the contents to the collection tube. Swab the posterior vaginal fornix using the supplied swab, immediately insert into the collection tube, break shaft at the score mark and snap cap firmly closed. Label patient identifiers, collection date and time. Maintain room temperature and deliver within 72 hours. Do not replace with a generic ESwab or Aptima swab.',
      source: 'Labcorp official test directory: https://www.labcorp.com/tests/180026/vaginitis-vaginosis-dna-probe'
    });
  }

  function userStateFromDatabase() {
    const seedById = new Map(seedDatabase.map(test => [test.id, test]));
    const seedByKey = new Map(seedDatabase.map(test => [databaseKey(test), test]));
    const customTests = [];
    const overrides = [];

    database.forEach(test => {
      const normalized = normalizeRecord(test);
      if (normalized.id.startsWith('custom-') || normalized.source === 'Custom entry') {
        customTests.push(normalized);
        return;
      }
      const seed = seedById.get(normalized.id) || seedByKey.get(databaseKey(normalized));
      if (seed && JSON.stringify(normalized) !== JSON.stringify(seed)) overrides.push(normalized);
    });

    return { customTests, overrides };
  }

  function saveUserState(state) {
    try {
      localStorage.setItem(USER_DATA_KEY, JSON.stringify(state));
      return true;
    } catch (error) {
      console.warn('User test changes could not be saved.', error);
      return false;
    }
  }

  function finalizeStorageMigration() {
    // This runs only after selected test IDs have been loaded. Removing obsolete
    // full-catalog keys releases the storage that caused the expanded-catalog alert.
    try {
      LEGACY_FULL_DB_KEYS.forEach(key => localStorage.removeItem(key));
      if (pendingUserState) {
        if (!saveUserState(pendingUserState)) {
          void window.PortalDialog.alert('This browser could not save your manual test changes. Check browser storage before continuing.', { title: 'Manual changes not saved', tone: 'warning' });
        } else {
          pendingUserState = null;
        }
      }
      if (localStorage.getItem(SELECTED_KEY) !== null) {
        LEGACY_SELECTED_KEYS.forEach(key => localStorage.removeItem(key));
      }
    } catch (error) {
      console.warn('Legacy browser storage could not be cleaned up.', error);
    }
  }

  function loadSelectedIds() {
    const reconcile = ids => Array.from(new Set(ids
      .map(id => CONSOLIDATED_TEST_IDS[id] || id)
      .filter(id => database.some(test => test.id === id))));
    const current = loadJson(SELECTED_KEY, null);
    if (Array.isArray(current)) {
      const migrated = reconcile(current);
      if (JSON.stringify(migrated) !== JSON.stringify(current)) {
        try { localStorage.setItem(SELECTED_KEY, JSON.stringify(migrated)); }
        catch (error) { console.warn('Could not save reconciled test selections.', error); }
      }
      return migrated;
    }
    for (const key of LEGACY_SELECTED_KEYS) {
      const legacy = loadJson(key, null);
      if (!Array.isArray(legacy)) continue;
      const migrated = reconcile(legacy);
      try { localStorage.setItem(SELECTED_KEY, JSON.stringify(migrated)); }
      catch (error) { console.warn('Could not save migrated test selections.', error); }
      return migrated;
    }
    return [];
  }

  function databaseKey(test) {
    return `${normalizeSearch(test.testCode)}|${normalizeSearch(test.testName)}`;
  }

  // Neutral wording also applies to records already saved in this browser.
  // Keep identifiers and source attribution intact.
  function interfaceWording(value) {
    return String(value ?? '')
      .replace(/\bSollis(?: Health)?\b/gi, 'the collecting facility')
      .replace(/\bDO NOT PERFORM(?:\s+ONSITE)?\.?\s*/gi, 'Collection requirements must be verified. ')
      .replace(/\bnot (?:stocked|used) onsite\b/gi, 'subject to local availability confirmation');
  }

  function normalizeAdditionalDrawRequirements(value) {
    if (!Array.isArray(value)) return [];
    return value.map(item => {
      const source = typeof item === 'string' ? { container: item } : (item || {});
      const count = Math.max(Number(source.count) || 1, 1);
      return {
        container: cleanCollectionContainer(interfaceWording(String(source.container || '')).trim()),
        specimenType: normalizeSpecimenType(source.specimenType || ''),
        preferredVolume: interfaceWording(String(source.preferredVolume || '')).trim(),
        minimumVolume: interfaceWording(String(source.minimumVolume || '')).trim(),
        purpose: interfaceWording(String(source.purpose || '')).trim(),
        alternativeContainer: cleanCollectionContainer(interfaceWording(String(source.alternativeContainer || '')).trim()),
        submissionCount: Math.max(Number(source.submissionCount) || 1, 1),
        transportContainer: cleanTransportContainer(interfaceWording(String(source.transportContainer || '')).trim()),
        transportTemperature: interfaceWording(String(source.transportTemperature || '')).trim(),
        transportTemperatureRaw: interfaceWording(String(source.transportTemperatureRaw || '')).trim(),
        stability: interfaceWording(String(source.stability || '')).trim(),
        spin: interfaceWording(String(source.spin || '')).trim(),
        specialLabeling: interfaceWording(String(source.specialLabeling || '')).trim(),
        specialInstructions: interfaceWording(String(source.specialInstructions || '')).trim(),
        transportOnly: Boolean(source.transportOnly),
        count
      };
    }).filter(item => item.container);
  }

  function normalizeUrineCollectionSource(specimenType, drawContainer, transportContainer) {
    if (!/\burine\b/i.test(specimenType)) return drawContainer;
    const draw = String(drawContainer || '').trim();
    const transport = String(transportContainer || '').trim();

    // Do not replace true 24-hour collection jugs, special collection devices,
    // or intentionally unavailable tests with a spot-urine cup.
    if (/24\s*[- ]?hour|24h\b|timed\s+urine|do not collect|^n\/?a$/i.test(draw)) return draw;
    if (/^sterile(?: urine)? cup$/i.test(draw)) return 'Sterile cup';

    // Some previously saved browser overrides put the downstream preservative
    // tube in the Draw Container field. For the clinic workflow the patient
    // provides urine to a sterile cup first, then the preservative tubes are filled.
    // Cover gray-top culture/transport and red-yellow or yellow-top UA variants.
    // Do not rewrite blood gray-tops, stool containers, or generic specialty tests.
    const grayUrineTransport = /\bgray[- ]?top\s+urine\b.*\b(?:culture|transport|preservative|tube)\b/i;
    const uaPreservative = /(?:red\s*\/\s*yellow|yellow\s*\/\s*red|red[- ]yellow|yellow[- ]red|yellow[- ]top).*\b(?:ua|urinalysis|preservative|swirl|urine)/i;
    const isUrinePreservativeDraw = grayUrineTransport.test(draw) || uaPreservative.test(draw);
    const isUrinePreservativeTransport = grayUrineTransport.test(transport)
      || uaPreservative.test(transport);
    if (isUrinePreservativeDraw && isUrinePreservativeTransport) {
      return 'Sterile cup';
    }
    return draw;
  }

  function normalizeStoolCollectionSource(specimenType, drawContainer) {
    if (!/\b(?:stool|feces|fecal|faecal)\b/i.test(String(specimenType || ''))) return drawContainer;
    const draw = String(drawContainer || '').trim();
    // Staff collect an ordinary stool specimen in a sterile cup and then fill
    // any required preservative/transport vial (e.g., Total-Fix). Do not
    // overwrite special primary collections such as trace-metal-free sources
    // or timed total-stool containers.
    if (/^(?:sterile\s+(?:urine\s+)?cup|stool\s+(?:collection\s+)?(?:cup|container)|standard\s+stool\s+container|total[- ]?fix(?:®)?\s+(?:transport\s+)?vial)$/i.test(draw)) return 'Sterile cup';
    return draw;
  }

  function normalizeRecord(record, index = 0) {
    record = { ...record };
    const canonicalName = VERIFIED_TEST_NAMES[String(record.testCode || '').trim()];
    // Migrate older browser overrides that still have (STAT) baked into the name.
    // Keep existing user-created names intact unless they are one of the known
    // obsolete directory mappings.
    if (canonicalName && /\bSTAT\b/i.test(String(record.testName || ''))) {
      record.testName = canonicalName;
    }
    for (const key of ['testName', 'specimenType', 'drawContainer', 'alternativeContainer',
      'transportContainer', 'preferredVolume', 'minimumVolume', 'transportTemperature',
      'transportTemperatureRaw', 'stability', 'spin', 'specialLabeling',
      'specialInstructions', 'fastingInstructions']) {
      if (record[key] != null) record[key] = interfaceWording(record[key]);
    }

    let specimenType = normalizeSpecimenType(record.specimenType);
    let transportContainer = cleanTransportContainer(record.transportContainer);
    let drawContainer = normalizeStoolCollectionSource(
      specimenType,
      normalizeUrineCollectionSource(
        specimenType,
        cleanCollectionContainer(String(record.drawContainer || 'Verify Official Instructions')),
        transportContainer
      )
    );
    // For swab assays the swab transport device is also the collection kit.
    // Anatomical labels such as "Throat Swab" describe specimen SOURCE, not
    // a second tube. Preserve the site in the specimen column while treating
    // the actual Amies/viral/Aptima swab kit as both draw and submit container.
    if (/\bswab\b/i.test(specimenType) &&
        !/\b(?:urine|stool|feces|faeces|fecal|faecal)\b/i.test(specimenType) &&
        !/\b(?:thinprep|preservcyt|surepath|cytology|pap[- ]?vial|fixative|slides?|smears?)\b/i.test(transportContainer) &&
        !/\b(?:swab\s+transferred|transfer\s+(?:the\s+)?specimen\s+(?:to|into)\s+(?:another|a separate))\b/i.test(transportContainer+' '+String(record.specialInstructions||'')) &&
        /(?:swab|amies|aptima|cobas|viral transport|\butm\b|\bvtm\b)/i.test(transportContainer) &&
        !/^(?:verify|other \/ verify)/i.test(transportContainer)) {
      if (/^swab$/i.test(specimenType) &&
          /\b(?:throat|nasal|nasopharyngeal|oropharyngeal|rectal|vaginal|cervical|endocervical|urethral|lesion|wound|ear|eye|buccal)\b/i.test(drawContainer) &&
          /\bswab\b/i.test(drawContainer)) {
        // Keep the anatomical source, not the swab manufacturer's or assay's
        // name, in the specimen column.
        specimenType = /bacterial\s+culture\s+swab.*\bwound\b/i.test(drawContainer)
          ? 'Wound swab'
          : drawContainer.replace(/^(?:aptima|synthetic)\s+/i, '');
      }
      // Preserve the named collection kit when the destination is merely
      // abbreviated (e.g., Aptima instead of Aptima Multitest orange label).
      // Anatomical-only entries such as "Throat Swab" still resolve to
      // the specified collection kit.
      const namedKit = /\b(?:aptima|eswab|e-swab|affirm|atts|cobas)\b/i.test(drawContainer);
      if (namedKit && isDirectSwabKitSubmission({
        ...record, specimenType, drawContainer, transportContainer
      })) {
        if (/^aptima(?:®)?$/i.test(transportContainer.trim()) && /\baptima\b/i.test(drawContainer))
          transportContainer = drawContainer;
      } else {
        drawContainer = transportContainer;
      }
    }
    // The yellow-label Aptima urine tube is filled from an initial urine cup.
    // It is not a directly collected swab tube. Fix legacy records that listed
    // the transport kit in both fields, without touching Aptima swab workflows.
    if (/\burine\b/i.test(specimenType) && /aptima/i.test(drawContainer) && /aptima/i.test(transportContainer)) {
      drawContainer = 'Sterile cup';
    }
    // Surface the same unpreserved Sterile cup in search, gallery, collection,
    // submission and print views; leave 24-hour source jugs unchanged.
    if (isPlainUrineAliquotTransport({ ...record, specimenType, drawContainer }, transportContainer)) {
      transportContainer = 'Sterile cup';
    }
    // Microtainer-only neonatal instructions override the generic SST/Gold
    // source. Never count these small-volume microcollection tubes as regular
    // 5 mL Gold or 7.5 mL Tiger SSTs. Preserve the full manufacturer notes.
    const microtainerRequired = /\bmicrotainer(?:s)?\b/i.test(`${drawContainer} ${record.specialInstructions || ''}`)
      && /\bserum\b/i.test(specimenType)
      && /sst|serum separator|gold|microtainer/i.test(drawContainer);
    if (microtainerRequired && (!/microtainer/i.test(drawContainer) || /^microtainer$/i.test(drawContainer))) drawContainer = 'Amber Microtainer SST';
    return blockHairOrNailSpecimen({
      id: String(record.id || `custom-${Date.now()}-${index}`),
      testCode: String(record.testCode ?? record[['que', 'stCode'].join('')] ?? '').trim(),
      testName: String(record.testName ?? '').trim(),
      searchAliases: Array.isArray(record.searchAliases) ? record.searchAliases.map(value => String(value || '').trim()).filter(Boolean) : [],
      clinicalCategories: Array.isArray(record.clinicalCategories) ? record.clinicalCategories.map(value => String(value || '').trim()).filter(Boolean) : [],
      addedByInitials: String(record.addedByInitials || '').trim().toUpperCase(),
      specimenType,
      drawContainer,
      alternativeContainer: cleanCollectionContainer(String(record.alternativeContainer || '')),
      additionalDrawRequirements: normalizeAdditionalDrawRequirements(record.additionalDrawRequirements),
      collectionCount: Number(record.collectionCount) > 1 ? Math.floor(Number(record.collectionCount)) : 1,
      usePreferredSerumYield: record.usePreferredSerumYield === true,
      submissionCount: Number(record.submissionCount) > 1 ? Math.floor(Number(record.submissionCount)) : 1,
      transportContainer,
      preferredVolume: String(record.preferredVolume || ''),
      minimumVolume: String(record.minimumVolume || ''),
      transportTemperature: String(record.transportTemperature || 'Not specified'),
      transportTemperatureRaw: String(record.transportTemperatureRaw || ''),
      stability: String(record.stability || ''),
      spin: specimenType === 'Whole Blood' && /^(?:yes|true|spin|centrifuge)$/i.test(String(record.spin || '').trim())
        ? 'No' : String(record.spin || 'Verify'),
      specialLabeling: String(record.specialLabeling || '').trim(),
      specialInstructions: String(record.specialInstructions || ''),
      fastingStatus: ['required', 'preferred'].includes(String(record.fastingStatus || '').toLowerCase()) ? String(record.fastingStatus).toLowerCase() : '',
      fastingInstructions: String(record.fastingInstructions || '').trim(),
      status: ['blocked', 'pending'].includes(record.status) ? record.status : 'active',
      source: String(record.source || 'Custom entry'),
      sourceRow: record.sourceRow || null
    });
  }

  function additionalDrawRequirements(test) {
    return Array.isArray(test.additionalDrawRequirements) ? test.additionalDrawRequirements : [];
  }

  function expandedCollectionTests(tests) {
    return tests.flatMap(test => {
      const expanded = [test];
      additionalDrawRequirements(test).forEach((requirement, index) => {
        const count = Math.max(Number(requirement.count) || 1, 1);
        const requirementNote = requirement.specialInstructions || (count > 1
          ? `Required additional collection for ${test.testName}. Draw ${count} tubes.`
          : `Required additional collection for ${test.testName}${requirement.purpose ? ` (${requirement.purpose})` : ''}.`);
        expanded.push({
          ...test,
          id: `${test.id}::additional-draw-${index}`,
          sourceTestId: test.sourceTestId || test.id,
          drawContainer: requirement.container,
          alternativeContainer: requirement.alternativeContainer || '',
          additionalDrawRequirements: [],
          specimenType: requirement.specimenType || test.specimenType,
          preferredVolume: requirement.preferredVolume || '',
          minimumVolume: requirement.minimumVolume || '',
          transportContainer: requirement.transportContainer || test.transportContainer,
          transportTemperature: requirement.transportTemperature || test.transportTemperature,
          transportTemperatureRaw: requirement.transportTemperatureRaw || test.transportTemperatureRaw,
          stability: requirement.stability || test.stability,
          spin: requirement.spin || test.spin,
          specialLabeling: requirement.specialLabeling || '',
          specialInstructions: requirementNote,
          transportOnly: requirement.transportOnly,
          collectionCount: count,
          submissionCount: Math.max(Number(requirement.submissionCount) || 1, 1)
        });
      });
      return expanded;
    });
  }

  function drawContainerBadge(container, className = 'badge') {
    const cls = tubeClass(container);
    const isSst = cls === 'tube-sst';
    const displayClass = isSst ? selectedSstVisualClass() : cls;
    const label = isSst ? selectedSstLabel() : container;
    return `<span class="${className} tube ${displayClass}">${escapeHtml(label)}${/^tube-microtainer\b/.test(cls) ? ' · MICROTAINER' : ''}</span>`;
  }

  function requiredDrawContainerBadges(test, className = 'badge') {
    const primary = drawContainerBadge(test.drawContainer, className);
    const extras = additionalDrawRequirements(test).filter(requirement => !requirement.transportOnly)
      .map(requirement => drawContainerBadge(requirement.container, className)).join(' ');
    return extras ? `${primary} ${extras}` : primary;
  }

  // In the searchable LabCorp menu, show the container sent to LabCorp,
  // not the source tube/cup used during collection. The collection/print
  // plan continues using its own separate draw-versus-submit logic.
  function libraryTransportContainerBadges(test, className = 'badge') {
    const code = String(test.testCode || '').trim();
    const multipleContainers = ['008623', '188110', '377036', '081162', '001750', '144057'].includes(code);
    const submissions = multipleContainers
      ? splitSubmissionContainers(test).map(item => ({
          label: item.label, className: item.className
        }))
      : [
          {
            label: isGenericSerumPlasmaTransport(test, finalTransportContainer(test)) ? 'Transport Tube' : frozenTransportLabel(test, finalTransportContainer(test)),
            className: transportTubeClass(test, finalTransportContainer(test))
          },
          ...additionalDrawRequirements(test).map(requirement => {
            const raw = requirement.transportContainer || requirement.container;
            const route = { ...test, specimenType: requirement.specimenType || test.specimenType,
              transportTemperature: requirement.transportTemperature || test.transportTemperature };
            return {
              label: isGenericSerumPlasmaTransport(route, raw) ? 'Transport Tube' : frozenTransportLabel(route, raw),
              className: transportTubeClass(route, raw)
            };
          })
        ];
    const seen = new Set();
    return submissions
      .filter(item => {
        if (!item.label || seen.has(item.label)) return false;
        seen.add(item.label);
        return true;
      })
      .map(item => {
        const cls = item.className || tubeClass(item.label);
        const displayClass = cls === 'tube-sst' ? selectedSstVisualClass() : cls;
        const label = cls === 'tube-sst'
          ? `${selectedSstTransportLabel()}${/\bspun\b/i.test(item.label) ? ' (spun)' : ''}`
          : item.label;
        return `<span class="${className} tube ${displayClass}">${escapeHtml(label)}</span>`;
      })
      .join(' ');
  }

  // Search-list badge presentation only. Blood and swab records display draw
  // containers; urine/stool display the actual container shipped to LabCorp.
  function menuSingleContainerPath(test) {
    // Directory-only presentation. Never change collection, processing or pooling.
    // Display the physical source followed by its distinct submission container.
    const specimen = String(test.specimenType || '').toLowerCase();
    const rawDraw = String(test.drawContainer || 'Verify collection container').trim();
    const draw = cleanCollectionContainer(rawDraw);
    const transport = String(finalTransportContainer(test) || '').trim();
    const isCup = /^(?:sterile\s+(?:urine\s+|stool\s+|specimen\s+)?cup|stool\s+collection\s+cup|urine\s+collection\s+cup)$/i.test(rawDraw);
    const collectionLabel = isCup ? 'Sterile cup' : draw;
    const drawBadges = drawContainerBadge(collectionLabel);
    // Do not draw a second tube or arrow for original swab transport kits.
    if (isDirectSwabKitSubmission(test))
      return '<span class="container-path is-single">' + drawBadges + '</span>';
    const cleanName = value => {
      const text = normalizeSearch(cleanCollectionContainer(value))
        .replace(/\b(?:spun|centrifuged|original|tube)\b/g, ' ').replace(/\s+/g, ' ').trim();
      return /^(?:gold\s+sst|sst\s+gold|gold|sst)$/.test(text) ? 'sst gold' : text;
    };
    // Presentation only. Mandatory transfer instructions take priority over
    // similarly named SST tubes; never conceal a required aliquot step.
    const collectionNotes = String(test.specialInstructions || '').toLowerCase();
    const mandatoryTransfer = /\bmust\s+(?:immediately\s+|promptly\s+)?(?:transfer|pour\s+off)\b|\b(?:transfer|separation)\s+of\s+(?:the\s+)?serum\s+(?:is\s+)?(?:mandatory|required)\b|\b(?:transfer|separate)\s+(?:serum|plasma)\s+(?:to|into)\s+(?:a\s+)?(?:separate|dedicated|plastic)\s+(?:tube|container)\b/.test(collectionNotes);
    // Direct-to-lab swab kits remain one physical container even when the
    // directory shortens the submission name (e.g. Aptima Multitest -> Aptima).
    // Reuse the collection/print classification so the table never invents a transfer.
    const directSwab = /\bswab\b/i.test(specimen) && isOriginalContainerSubmission(test);
    const original = /\bno\s+transfer\b|\bsubmit\s+in\s+(?:the\s+)?original\s+(?:tube|container)\b|\b(?:original|primary)\s+(?:tube|container)\b/i.test(transport) || directSwab;
    const same = (isPlainUrineAliquotTransport(test, transport) && !isTimedUrineTest(test) &&
      cleanCollectionContainer(collectionLabel) === 'Sterile cup') ||
      cleanName(collectionLabel) === cleanName(transport) ||
      (tubeClass(collectionLabel) === 'tube-sst' &&
        tubeClass(transport) === 'tube-sst' &&
        !/transport\s+tube|aliquot|cryovial|transpak/i.test(transport));
    // A red-top or plasma ALTERNATIVE may require transfer even when the
    // primary SST goes directly to the lab. That conditional instruction
    // must not invent a transfer arrow for the primary draw.
    const alternativeOnly = /\b(?:if|when)\s+(?:using|drawn\s+in|collected\s+in)\s+(?:a\s+)?(?:red[- ]?top|plain\s+red|plasma)\b/i.test(collectionNotes);
    const needsAdditionalSubmitBadge = ['001750', '144057'].includes(String(test.testCode || '').trim());
    if (!needsAdditionalSubmitBadge && (((original || same) && (!mandatoryTransfer || alternativeOnly)) || !transport)) {
      return '<span class="container-path is-single">' + drawBadges + '</span>';
    }
    const sendBadges = libraryTransportContainerBadges(test);
    return '<span class="container-path is-transfer">' +
      '<span class="container-path-source" aria-label="Collect in">' + drawBadges + '</span>' +
      '<span class="container-path-arrow" role="img" aria-label="Then transfer to">↓</span>' +
      '<span class="container-path-submit" aria-label="Submit in">' + sendBadges + '</span>' +
      '</span>';
  }

  function libraryContainerRoutes(test) {
    // Reuse the existing expansion so display matches the collection and
    // submission requirements already saved for each container.
    return printDetailRoutes(test);
  }

  function libraryContainerPreviewRoutes(test) {
    // Screen-only expansion. The source record retains its actual draw and
    // submission counts for cart planning, bagging and print output.
    return libraryContainerRoutes(test).flatMap(route => {
      const draws = Math.max(1, Math.floor(Number(route.collectionCount) || 1));
      const submits = Math.max(1, Math.floor(Number(route.submissionCount) || 1));
      if (draws === submits && draws > 1) {
        return Array.from({ length: draws }, (_, index) => ({
          ...route, collectionCount: 1, submissionCount: 1,
          _libraryRepeatedPair: true, _libraryRouteNumber: index + 1
        }));
      }
      if (draws === 1 && submits > 1) {
        // One collection source feeds several destination vials. Do not show
        // multiple independent source tubes in the hover.
        return [route];
      }
      // When the numbers differ, never invent a one-to-one collection/transfer
      // relationship. Show the actual counts in one route instead.
      return [route];
    });
  }

  function menuHasMultipleRoutes(test) {
    const paths = libraryContainerRoutes(test);
    return paths.length > 1 || paths.some(route =>
      Math.max(Number(route.collectionCount) || 1, Number(route.submissionCount) || 1) > 1);
  }

  function menuContainerBadges(test) {
    if (!menuHasMultipleRoutes(test)) return menuSingleContainerPath(test);
    const routes = libraryContainerPreviewRoutes(test);
    const primary = routes[0];
    const moreText = routes.length > 1 ? '+' + (routes.length - 1) + ' more required' : 'View required quantities';
    return '<div class="library-container-route-summary">' +
      '<div class="library-container-main-route">' + menuSingleContainerPath(primary) + '</div>' +
      '<div class="subtext specimen-line">' + specimenBadge(primary.specimenType) + '</div>' +
      '<button type="button" class="library-container-more" data-container-more data-id="' + escapeAttr(test.id) + '" aria-expanded="false" aria-label="Show required collection and submission containers for ' + escapeAttr(test.testName) + '">' +
        moreText + ' <span class="shared-chevron library-container-more-chevron" aria-hidden="true"></span>' +
      '</button>' +
    '</div>';
  }

  function librarySingleDrawMultiSubmitPath(route) {
    const draws = Math.max(1, Number(route.collectionCount) || 1);
    const submits = Math.max(1, Number(route.submissionCount) || 1);
    if (draws !== 1 || submits < 2) return menuSingleContainerPath(route);
    // Render the physical draw tube ONCE, followed by each distinct transport
    // aliquot. This is a split, not one source tube per submitted vial.
    const destinations = Array.from({ length: submits }, (_, index) =>
      '<span class="library-container-multi-submit-item"><strong>Aliquot ' +
      (index + 1) + '</strong>' + librarySubmissionBadges(route) + '</span>'
    ).join('');
    return '<span class="container-path is-transfer">' +
      '<span class="container-path-source" aria-label="Collect in">' +
      drawContainerBadge(route.drawContainer) + '</span>' +
      '<span class="container-path-arrow" role="img" aria-label="Process and split into separate transport aliquots">↓</span>' +
      '<span class="container-path-submit" aria-label="Submit in">' +
      '<span class="library-container-multi-submit">' + destinations + '</span></span></span>';
  }

  function libraryContainerFlowCard(test) {
    const routes = libraryContainerPreviewRoutes(test);
    const originals = libraryContainerRoutes(test);
    const onlyOneType = originals.length === 1;
    const draws = Math.max(1, Number(test.collectionCount) || 1);
    const submits = Math.max(1, Number(test.submissionCount) || 1);
    const countLabel = onlyOneType && (draws > 1 || submits > 1)
      ? (draws === submits ? draws + ' draw · ' + submits + ' submit containers'
        : draws === 1 ? '1 draw · ' + submits + ' separate submit containers'
        : draws + ' draw · ' + submits + ' submit containers')
      : routes.length + ' required container paths';
    return '<div class="library-container-preview-heading"><strong>Collection &amp; transport</strong>' +
      '<span>' + escapeHtml(countLabel) + '</span></div>' +
      routes.map((route, index) => {
        const preferred = cleanVolumeDisplayText(route.preferredVolume);
        const minimum = cleanVolumeDisplayText(route.minimumVolume);
        const quantity = Math.max(1, Number(route.collectionCount) || 1);
        const submitQuantity = Math.max(1, Number(route.submissionCount) || 1);
        const note = route._libraryRepeatedPair
          ? 'Independent collection and submission; keep aliquots separate'
          : quantity === 1 && submitQuantity > 1
            ? 'Split the collected specimen into ' + submitQuantity + ' separate transport aliquots'
            : quantity !== submitQuantity
              ? quantity + ' collection tube(s) and ' + submitQuantity + ' submission container(s)'
              : '';
        const details = [preferred && 'Preferred: ' + preferred,
          minimum && 'Minimum: ' + minimum, note].filter(Boolean);
        return '<section class="library-container-preview-route">' +
          '<div class="library-container-preview-route-heading"><span class="library-container-number">' + (index + 1) + '</span><strong>Container ' + (index + 1) + '</strong></div>' +
          '<div class="library-container-preview-path">' + librarySingleDrawMultiSubmitPath(route) + '</div>' +
          '<div class="library-container-preview-meta">' + specimenBadge(route.specimenType) +
            '<span class="badge ' + temperatureClass(route.transportTemperature) + '">' + escapeHtml(route.transportTemperature || 'Verify temperature') + '</span></div>' +
          (details.length ? '<div class="library-container-preview-detail">' + escapeHtml(details.join(' · ')) + '</div>' : '') +
        '</section>';
      }).join('');
  }

  function cancelContainerFlowTipHide() {
    clearTimeout(containerFlowHideTimer);
    containerFlowHideTimer = null;
  }

  function scheduleContainerFlowTipHide() {
    if (containerFlowPinned) return;
    cancelContainerFlowTipHide();
    containerFlowHideTimer = setTimeout(hideContainerFlowTip, 170);
  }

  function hideContainerFlowTip() {
    cancelContainerFlowTipHide();
    if (containerFlowButton) {
      containerFlowButton.setAttribute('aria-expanded', 'false');
      containerFlowButton.removeAttribute('aria-describedby');
    }
    containerFlowTip?.remove();
    containerFlowTip = null;
    containerFlowButton = null;
    containerFlowPinned = false;
  }

  function positionContainerFlowTip(button, tip) {
    const box = button.getBoundingClientRect();
    const gutter = 12;
    const width = Math.min(350, window.innerWidth - gutter * 2);
    tip.style.width = width + 'px';
    const height = tip.getBoundingClientRect().height;
    const left = Math.min(Math.max(box.left, gutter), window.innerWidth - width - gutter);
    const spaceBelow = window.innerHeight - box.bottom - gutter;
    const above = spaceBelow < Math.min(height, 260) && box.top > spaceBelow;
    tip.style.left = left + 'px';
    tip.style.top = Math.max(gutter, above
      ? box.top - Math.min(height, window.innerHeight - gutter * 2) - 8
      : Math.min(box.bottom + 8, window.innerHeight - height - gutter)) + 'px';
  }

  function showContainerFlowTip(button, pin = false) {
    cancelContainerFlowTipHide();
    if (containerFlowButton === button && containerFlowTip?.isConnected) {
      if (pin) containerFlowPinned = true;
      return;
    }
    hideContainerFlowTip();
    const test = database.find(item => item.id === button?.dataset.id);
    if (!test || !menuHasMultipleRoutes(test)) return;
    const tip = document.createElement('div');
    tip.id = 'library-container-flow-preview';
    tip.className = 'library-container-flow-preview';
    tip.setAttribute('role', 'tooltip');
    tip.innerHTML = libraryContainerFlowCard(test);
    tip.addEventListener('pointerenter', cancelContainerFlowTipHide);
    tip.addEventListener('pointerleave', scheduleContainerFlowTipHide);
    document.body.appendChild(tip);
    containerFlowButton = button;
    containerFlowTip = tip;
    containerFlowPinned = pin;
    button.setAttribute('aria-describedby', tip.id);
    button.setAttribute('aria-expanded', 'true');
    positionContainerFlowTip(button, tip);
  }

  function menuVolumeText(test, label) {
    const value = combinedVolumeText(test, label);
    return /^fill\s+(?:(?:the|a)\s+)?(?:[\w-]+\s+){0,3}tube\s+to\s+capacity$/i.test(value)
      ? 'Full tube'
      : value;
  }

  function requiredSpecimenBadges(test, extraClass = '') {
    const labels = [normalizeSpecimenType(test.specimenType), ...additionalDrawRequirements(test).map(requirement => normalizeSpecimenType(requirement.specimenType))]
      .filter(Boolean);
    return Array.from(new Set(labels)).map(label => specimenBadge(label, extraClass)).join(' ');
  }

  function additionalRequirementSummary(test, printMode = false) {
    const requirements = additionalDrawRequirements(test);
    if (!requirements.length) return '';
    const cls = printMode ? 'print-additional-requirement' : 'selected-additional-requirement';
    return requirements.map(requirement => {
      const parts = [
        requirement.purpose,
        requirement.transportOnly ? 'from the same collected specimen' : requirement.specimenType,
        requirement.transportOnly ? `submit in ${requirement.transportContainer}` : `from ${requirement.container}`,
        requirement.preferredVolume ? `Volume ${cleanVolumeDisplayText(requirement.preferredVolume)}` : '',
        requirement.minimumVolume ? `Minimum ${requirement.minimumVolume}` : ''
      ].filter(Boolean);
      return `<div class="${cls}"><strong>Also required:</strong> ${escapeHtml(parts.join(' · '))}</div>`;
    }).join('');
  }

  function cleanVolumeDisplayText(value) {
    let text = String(value || '')
      .replace(/[\u0000-\u001f\u007f]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .replace(/^preferred\s*:?\s*/i, '');
    if (!text) return '';

    const flags = [];
    const addFlag = (label) => { if (label && !flags.includes(label)) flags.push(label); };
    const numberWord = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10 };
    const countValue = (raw) => numberWord[String(raw || '').toLowerCase()] || Number(raw) || 0;

    if (/\b(?:protect(?:ed)? from light|light[- ]protected)\b/i.test(text)) addFlag('protected from light');
    if (/\b(?:no gel|without gel)\b/i.test(text)) addFlag('no gel');
    if (/\b(?:preservative[- ]free|no preservative|unpreserved)\b/i.test(text)) addFlag('preservative-free');
    const fullTube = /\bfull\b[^;]{0,35}\btube\b/i.test(text);

    // Preserve meaningful counts before removing redundant container wording.
    let tubeCount = 0;
    let countMatch = text.match(/\b(?:collected|drawn|submitted?)\b[^;]{0,90}\b(?:in|from)\s+(two|three|four|five|six|seven|eight|nine|ten|\d+)\s+(?:separate\s+)?[^;]{0,45}?tubes?\b/i);
    if (!countMatch) countMatch = text.match(/\beach\s+of\s+(two|three|four|five|six|seven|eight|nine|ten|\d+)\s+[^;]{0,45}?(?:EDTA|citrate|heparin|tubes?)\b/i);
    if (countMatch) tubeCount = countValue(countMatch[1]);

    const aliquotMatch = text.match(/\bsubmit\s+(two|three|four|five|six|seven|eight|nine|ten|\d+)\s+(?:separate\s+)?aliquots?\b/i);
    const aliquotCount = aliquotMatch ? countValue(aliquotMatch[1]) : 0;
    const splitMatch = text.match(/\[\s*(\d+(?:\.\d+)?)\s*mL\s*[x×]\s*(\d+)\s*\]/i);

    // "Preferred volume" should describe the specimen amount/state, not repeat
    // the tube or transport container already shown elsewhere in the interface.
    text = text
      .replace(/^submit\s+(?:one|two|three|four|five|six|seven|eight|nine|ten|\d+)\s+(?:separate\s+)?aliquots?\s*;\s*/i, '')
      .replace(/\s+(?:collected|submitted|preserved)\s+(?:in|into)\b.*$/i, '')
      .replace(/\s+from\s+(?:an?\s+)?(?:a\s+)?full\s+[^;]*?\btube\b.*$/i, '')
      .replace(/\s+(?:in|into)\s+(?:an?\s+)?[^;]*?\b(?:tubes?|vials?|containers?|cups?)\b.*$/i, '')
      .replace(/\s*\[\s*\d+(?:\.\d+)?\s*mL\s*[x×]\s*\d+\s*\]\s*/ig, ' ')
      .replace(/(?:\s*[-–—,;:]\s*)?(?:protect(?:ed)? from light|light[- ]protected)\b/ig, '')
      .replace(/(?:\s*[-–—,;:]\s*)?(?:preservative[- ]free|no preservative|unpreserved)\b/ig, '')
      .replace(/\s*\(?\s*(?:no gel|without gel)\s*\)?/ig, '')
      .replace(/\s+/g, ' ')
      .replace(/\s*[-–—,;:]\s*$/g, '')
      .trim();

    text = text
      .replace(/^whole blood\s+(?:from\s+)?(?:a\s+)?full\s+.*$/i, 'Full tube whole blood')
      .replace(/^whole blood full\s+.*$/i, 'Full tube whole blood')
      .replace(/\b(\d+(?:\.\d+)?)\s*hour\b/ig, '$1-hour')
      .replace(/\s+/g, ' ')
      .trim();

    if (fullTube && !/\bfull tube\b/i.test(text)) addFlag('full tube');
    if (tubeCount > 1) addFlag(`${tubeCount} tubes`);
    if (aliquotCount > 1) addFlag(`${aliquotCount} aliquots`);
    if (splitMatch) addFlag(`${splitMatch[1]} mL × ${splitMatch[2]}`);
    return [text, ...flags].filter(Boolean).join(' - ');
  }

  function combinedVolumeText(test, label) {
    // QuantiFERON is a four-tube kit. Keep four 1 mL requirements in the
    // collection calculation, but show a concise volume in the test menu.
    if (String(test.testCode || '').trim() === '182879') return '1 mL each';
    const primary = cleanVolumeDisplayText(label === 'preferred' ? test.preferredVolume : test.minimumVolume);
    const extras = additionalDrawRequirements(test)
      .map(requirement => cleanVolumeDisplayText(label === 'preferred' ? requirement.preferredVolume : requirement.minimumVolume))
      .filter(Boolean);
    return [primary, ...extras].filter(Boolean).join(' + ');
  }

  function genericTransportName(value) {
    const text = String(value || '').trim();
    return /^(?:transport tube|(?:plastic )?(?:serum|plasma) transport tube|polypropylene transport tube|clean screw[- ]?capped plastic vial \(no preservative\)|chilled plastic screw[- ]?cap vial|plastic screw[- ]?cap serum transport vial)$/i.test(text) ? 'Transport Tube' : text;
  }
  function microtainerIcon(value) {
    if (/gray|fluoride/i.test(value)) return 'tube-microtainer tube-micro-gray';
    if (/lavender|edta/i.test(value)) return 'tube-microtainer tube-micro-lavender';
    if (/\bpst\b|mint green/i.test(value)) return /amber/i.test(value) ? 'tube-microtainer tube-micro-amber-pst' : 'tube-microtainer tube-micro-mint';
    if (/heparin|green/i.test(value)) return 'tube-microtainer tube-micro-green';
    if (/red top|no additive|clot activator/i.test(value) && !/\bsst\b/i.test(value)) return 'tube-microtainer tube-micro-red';
    if (/amber/i.test(value)) return 'tube-microtainer';
    if (/gold|\bsst\b/i.test(value)) return 'tube-microtainer tube-micro-gold';
    return 'tube-microtainer tube-micro-verify';
  }

  function cleanCollectionContainer(value) {
    const text = genericTransportName(value);
    if (/^sterile (?:screw[- ]?cap )?csf (?:tube|vial|container)(?:\s*\(original (?:tube|container)\))?$/i.test(text)) return 'Sterile cup';
    if (/^salivette saliva collection device(?: \(blue cap\))?$/i.test(text)) return 'Salivette';
    // Standard unpreserved urine collection and submission cups are one
    // physical container, despite directory aliases such as "original specimen"
    // or "plastic urine container, no preservative". Do not normalize aliquot
    // containers, preservatives, timed collection jugs, or special metal-free cups.
    const directCup = text
      .replace(/^(?:submit|send)\s+in\s+(?:the\s+)?original\s+/i, '')
      .replace(/\s*\(original\s+(?:specimen|container|cup)\)\s*$/i, '')
      .replace(/\s*\(urine\)\s*$/i, '')
      .replace(/\s*,\s*(?:no|without)\s+preservative\s*$/i, '')
      .replace(/\s+without\s+preservative\s*$/i, '')
      .trim();
    if (/^(?:(?:sterile\s+)?(?:plastic\s+)?urine\s+(?:collection\s+)?(?:cup|container)|plastic\s+urine\s+container|sterile\s+(?:specimen\s+)?cup)$/i.test(directCup)) {
      return 'Sterile cup';
    }
    // Local standard: generic urine cups/containers are the existing Sterile cup.
    // Keep truly special devices (24-hour jugs, preservative tubes, trace-metal containers, Aptima, etc.) distinct.
    if (/^(?:sterile\s*,?\s*)?(?:plastic\s+)?urine\s+(?:collection\s+)?(?:cup|container)$/i.test(text)) {
      return 'Sterile cup';
    }
    if (/^urine\s+collection\s+(?:cup|container)$/i.test(text)) return 'Sterile cup';
    if (/^(?:sterile\s+stool\s+cup|stool\s+collection\s+cup|sterile\s+cup|sterile\s+specimen\s+cup)$/i.test(text)) return 'Sterile cup';
    return text;
  }

  function cleanTransportContainer(value) {
    const cleaned = String(value || '')
      .trim()
      .replace(/^labeled\s+transport\s+tube\s*\(local workflow;\s*verify\s+[a-z]+\)$/i, 'Transport tube (verify official instructions)')
      .replace(/^labeled\s+transport\s+tube$/i, 'Transport tube')
      .replace(/\blabeled transport tube\b/gi, 'transport tube')
      .replace(/\s*\(original device\)\s*$/i, '')
      .replace(/\s{2,}/g, ' ');
    // Keep the explicit additive restriction available to print and handle the vial.
    if (/^clean screw[- ]?capped plastic vial \(no preservative\)$/i.test(cleaned)) return cleaned;
    const container = cleanCollectionContainer(cleaned);
    // Standard plastic serum/plasma transport aliases are the same stock
    // vessel in the catalog. Keep Labcorp frozen purple-cap transport separate
    // because it is a distinct supplied device (PP Transpak 49482).
    if (/^(?:transport tube|serum transport tube|plasma transport tube|plastic screw-cap serum transport vial|polypropylene transport tube|plastic serum transport tube)$/i.test(container)) {
      return 'Transport Tube';
    }
    return container;
  }


  function normalizeSpecimenType(value) {
    const original = String(value || 'Other / Verify').trim();
    const normalized = original.toLowerCase();
    if (/^(rbc|rbcs|red blood cell|red blood cells|erythrocyte|erythrocytes)$/.test(normalized)) return 'RBCs';
    if (normalized === 'serum') return 'Serum';
    if (normalized === 'plasma') return 'Plasma';
    if (normalized === 'whole blood' || normalized === 'wholeblood') return 'Whole Blood';
    return original || 'Other / Verify';
  }

  function specimenClass(specimenType) {
    const value = normalizeSpecimenType(specimenType).toLowerCase();
    if (/\bserum\b/.test(value)) return 'specimen-serum';
    if (/\bplasma\b/.test(value)) return 'specimen-plasma';
    if (value === 'rbcs') return 'specimen-rbc';
    if (value === 'whole blood') return 'specimen-whole-blood';
    return 'specimen-other';
  }

  function specimenBadge(specimenType, extraClass = '') {
    const label = normalizeSpecimenType(specimenType);
    const displayLabel = label.replace(/\bRBCs?\b/gi, 'Red Blood Cells');
    return `<span class="specimen-badge ${specimenClass(label)} ${extraClass}">${escapeHtml(displayLabel)}</span>`;
  }

  function parseQueries(text) {
    return text
      .split(/[\n;]+/)
      .map(item => item.trim().replace(/^[-•*]\s*/, '').replace(/^\d+[.)]\s+/, ''))
      .filter(Boolean);
  }

  function normalizeSearch(value) {
    return String(value || '')
      .toLowerCase()
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[®™]/g, '')
      .replace(/[^a-z0-9]+/g, ' ')
      .trim();
  }

  // Curated medical shorthand and synonym rules. Match against the *test name*,
  // not specimen instructions, because a panel that happens to mention a test
  // is not interchangeable with the standalone test. These are search aliases,
  // NOT substitute order codes or automated test-selection instructions.
  // Sources: Quest Test Directory (including official alternate names), its
  // thyroid and hs-CRP guides, and published laboratory naming research.
  function curatedLabAliases(normalizedName) {
    const aliases = [];
    [...LAB_SEARCH_ALIAS_RULES, ...SMART_LAB_ALIAS_RULES].forEach(({ name, terms }) => {
      if (name.test(normalizedName)) aliases.push(...terms);
    });
    return aliases;
  }

  // Search indexes are cached by record so live filtering stays responsive for
  // the full catalog. Saved edits create new records, so the cache stays valid.
  const librarySearchIndexCache = new WeakMap();

  function librarySearchIndex(test) {
    const existing = librarySearchIndexCache.get(test);
    if (existing) return existing;
    const name = normalizeSearch(test.testName);
    const code = normalizeSearch(test.testCode);
    const aliases = Array.from(new Set([...curatedLabAliases(name), ...(Array.isArray(test.searchAliases) ? test.searchAliases : [])].map(normalizeSearch).filter(Boolean)));
    const aliasWords = Array.from(new Set(aliases.flatMap(value => value.split(' '))));
    const nameWords = name.split(' ').filter(Boolean);
    const info = normalizeSearch([
      test.specimenType, test.drawContainer, test.alternativeContainer,
      additionalDrawRequirements(test).map(item => `${item.specimenType} ${item.container}`).join(' '),
      test.transportContainer, test.transportTemperature, test.specialLabeling,
      test.specialInstructions
    ].join(' '));
    const indexed = { name, code, aliases, nameWords, aliasWords, info };
    librarySearchIndexCache.set(test, indexed);
    return indexed;
  }

  // Stop after two edits. A missing, extra, or transposed letter can match;
  // short words and numeric codes are never fuzzily matched.
  function libraryEditDistanceWithin(a, b, maxEdits) {
    if (Math.abs(a.length - b.length) > maxEdits) return false;
    const prev = Array.from({ length: b.length + 1 }, (_, i) => i);
    const current = new Array(b.length + 1);
    const beforePrev = new Array(b.length + 1).fill(0);
    for (let i = 1; i <= a.length; i++) {
      current[0] = i;
      let smallest = current[0];
      for (let j = 1; j <= b.length; j++) {
        current[j] = Math.min(prev[j] + 1, current[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
        if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
          current[j] = Math.min(current[j], beforePrev[j - 2] + 1);
        }
        smallest = Math.min(smallest, current[j]);
      }
      if (smallest > maxEdits) return false;
      for (let j = 0; j <= b.length; j++) beforePrev[j] = prev[j];
      for (let j = 0; j <= b.length; j++) prev[j] = current[j];
    }
    return prev[b.length] <= maxEdits;
  }

  function libraryWordMatch(token, words, allowTypo) {
    if (words.includes(token)) return 3;
    if (/^\d+$/.test(token)) return 0;
    // Roman numerals (VII, VIII) must match whole tokens, never a prefix.
    // That avoids confusing Factor VII with Factor VIII or Troponin I with II.
    if (/^(?:i|ii|iii|iv|v|vi|vii|viii|ix|x|xi|xii)$/.test(token)) return 0;
    if (words.some(word => word.startsWith(token))) return 2;
    if (token.length >= 3 && words.some(word => word.includes(token))) return 1;
    // Do not "correct" clinically distinct abbreviated markers into each
    // other (e.g. HBsAg ≠ HBsAb). These short clinical aliases require exact
    // spelling; longer ordinary name words still tolerate small typos.
    if (!allowTypo || token.length < 4 || /\d/.test(token) || /^(?:hbsag|hbsab|anti|hcv|hiv|ft3|ft4)$/.test(token)) return 0;
    const maxEdits = token.length >= 6 ? 2 : 1;
    return words.some(word => !/^(?:hbsag|hbsab)$/.test(word)
      && libraryEditDistanceWithin(token, word, maxEdits)) ? -1 : 0;
  }

  function troponinSearchType(query) {
    if (/\b(?:hstni|tni)\b/.test(query)) return 'i';
    if (/\b(?:hstnt|tnt)\b/.test(query)) return 't';
    const match = query.match(/\b(?:troponin|trop) ([it])\b|\b([it]) (?:troponin|trop)\b/);
    return match?.[1] || match?.[2] || '';
  }

  // Relevance order: exact code, code prefix, full name, name keywords (any
  // order), common abbreviations, then typo matches. Instructions rank last.
  function rankLibraryTest(query, test) {
    const q = normalizeSearch(query);
    if (!q) return 0;
    const { code, name, aliases, nameWords, aliasWords, info } = librarySearchIndex(test);
    if (code && q === code) return 2000;
    if (/^\d+$/.test(q)) {
      if (code.startsWith(q)) return 1650;
      if (q.length >= 3 && code.replace(/^0+/, '') === q) return 1550;
      return q.length >= 3 && code.includes(q) ? 1200 : 0;
    }
    const codeAndName = q.match(/^(\S+) (.+)$/);
    if (codeAndName && codeAndName[1] === code && /\d/.test(code)) {
      const nameScore = rankLibraryTest(codeAndName[2], test);
      if (nameScore >= 500) return 2000 + nameScore / 50;
    }
    const requestedTroponin = troponinSearchType(q);
    const catalogTroponin = requestedTroponin && troponinSearchType(name);
    if (catalogTroponin && catalogTroponin !== requestedTroponin) return 0;
    if (name === q) return 1500;
    const clinicalQuery = window.LabClinicalCategories?.matchQuery(q);
    if (clinicalQuery && !clinicalQuery.rest)
      return window.LabClinicalCategories.forTest(test).includes(clinicalQuery.id) ? 1000 : 0;
    // Curated full aliases precede prefix/substring matches so PTT finds aPTT
    // instead of incidentally preferring PTT-LA. Exact name/code still wins.
    if (aliases.includes(q)) return 1480 - Math.min(75, name.length / 2);
    const tokens = q.split(' ').filter(Boolean);
    const finalIsRoman = /^(?:i|ii|iii|iv|v|vi|vii|viii|ix|x|xi|xii)$/.test(tokens[tokens.length - 1]);
    const exactNumericWords = tokens.every(token => !/^\d+$/.test(token) || nameWords.includes(token));
    if (exactNumericWords && name.startsWith(q) && (!finalIsRoman || name === q || name.startsWith(`${q} `))) {
      return 1450 - Math.min(120, name.length - q.length);
    }
    if (exactNumericWords && name.includes(q) && (!finalIsRoman || name.includes(`${q} `) || name.endsWith(q))) {
      return 1360 - Math.min(100, name.length - q.length);
    }
    const nameMatches = tokens.map(token => libraryWordMatch(token, nameWords, true));
    if (nameMatches.every(score => score !== 0)) {
      const fuzzy = nameMatches.filter(score => score < 0).length;
      const exact = nameMatches.filter(score => score === 3).length;
      return (fuzzy ? 820 - fuzzy * 75 : 1120) + exact * 8 + tokens.length * 5 - Math.min(nameWords.length, 25);
    }
    const combinedWords = nameWords.concat(aliasWords);
    const aliasMatches = tokens.map(token => libraryWordMatch(token, combinedWords, true));
    if (aliasMatches.every(score => score !== 0)) {
      const fuzzy = aliasMatches.filter(score => score < 0).length;
      return (fuzzy ? 665 - fuzzy * 60 : 930) + tokens.length * 5 - Math.min(nameWords.length, 25);
    }
    // Combined clinical category + test query must match both terms.
    if (clinicalQuery?.rest && window.LabClinicalCategories.forTest(test).includes(clinicalQuery.id)) {
      const remainderScore = rankLibraryTest(clinicalQuery.rest, test);
      if (remainderScore > 300) return Math.min(990, remainderScore);
    }
    // Keep secondary container/specimen/handling matches available for staff,
    // but avoid letting long processing notes outrank a matching test name.
    if (tokens.every(token => info.includes(token))) return 240 + Math.min(tokens.length, 4) * 9;
    return 0;
  }

  // Batch search now uses the same ranked, typo-tolerant index as Search Tests.
  // Codes remain exact identifiers: never try to fuzzy-match or silently replace
  // a numeric code. A typed code followed by a name is reviewed unless BOTH
  // the code and complete name match the same catalog record.
  function rankBatchTest(query, test) {
    const q = normalizeSearch(query);
    if (!q) return 0;
    const { code, name } = librarySearchIndex(test);
    if (q === name && !/^\d+$/.test(q)) return 1500;
    const clinicalQuery = window.LabClinicalCategories?.matchQuery(q);
    if (clinicalQuery && !clinicalQuery.rest) return 0;
    const leading = q.match(/^([a-z]*\d[a-z0-9]*) (.+)$/);
    if (leading && leading[1] === code) {
      const nameScore = rankLibraryTest(leading[2], test);
      if (!/^\d{1,3}$/.test(code) || nameScore >= 500) return 2000 + nameScore / 50;
    }
    // Short numbers can be part of an assay name (25-hydroxy vitamin D).
    // A full-length numeric order-code prefix must match the actual code.
    if (leading && /^\d{4,}$/.test(leading[1])) return 0;
    const score = rankLibraryTest(q, test);
    // Specimen/handling-text-only matches are too weak for bulk ordering.
    return score >= 500 ? score : 0;
  }

  function findMatches(query, limit = 5) {
    return database
      .map(test => ({ test, score: rankBatchTest(query, test) }))
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score || a.test.testName.localeCompare(b.test.testName))
      .slice(0, limit);
  }

  // Category input in Add Tests is a catalog browse, never an auto-add match.
  function findCategoryMatches(query) {
    const category = window.LabClinicalCategories?.matchQuery(query);
    if (!category) return null;
    // A complete assay name or shorthand can begin with a category alias
    // (for example, Chemistry 14). Review those as assay matches.
    const normalizedQuery = normalizeSearch(query);
    const isAssayQuery = database.some(test => {
      if (test.status === 'blocked') return false;
      const { name, aliases } = librarySearchIndex(test);
      return name === normalizedQuery || (category.rest && aliases.includes(normalizedQuery));
    });
    if (isAssayQuery) return null;
    const results = database
      .filter(test => test.status !== 'blocked' &&
        window.LabClinicalCategories.forTest(test).includes(category.id) &&
        (!category.rest || rankLibraryTest(category.rest, test) >= 500))
      .sort((a, b) => a.testName.localeCompare(b.testName) ||
        String(a.testCode || '').localeCompare(String(b.testCode || '')));
    const label = window.LabClinicalCategories.options.find(item => item.id === category.id)?.label || query;
    return { label, results };
  }

  function isExactBatchMatch(query, test) {
    const q = normalizeSearch(query);
    const code = normalizeSearch(test?.testCode);
    const name = normalizeSearch(test?.testName);
    if (!q || !test) return false;
    return q === code || q === name || (Boolean(code) && q === `${code} ${name}`);
  }

  function chosenBatchMatch(row) {
    return row.matches.find(match => match.test.id === row.chosenId) || row.matches[0];
  }

  function canAutoAddBatchRow(row) {
    const chosen = chosenBatchMatch(row);
    if (!chosen || chosen.test.status !== 'active' || !isExactBatchMatch(row.query, chosen.test)) return false;
    if (chosen !== row.matches[0]) return false;
    // An identical name shared by multiple distinct codes cannot be silently
    // resolved without the user specifying a code.
    const q = normalizeSearch(row.query);
    if (q === normalizeSearch(chosen.test.testCode)) {
      const sameCodeTests = database.filter(test => normalizeSearch(test.testCode) === q);
      if (sameCodeTests.length > 1) return false;
    }
    if (q === normalizeSearch(chosen.test.testName)) {
      const category = window.LabClinicalCategories?.matchQuery(q);
      if (category && !category.rest) return false;
      const sameNames = database.filter(test => test.status !== 'blocked' && normalizeSearch(test.testName) === q);
      if (new Set(sameNames.map(test => normalizeSearch(test.testCode))).size > 1) return false;
    }
    return true;
  }

  function batchRowOutcome(row) {
    if (row.category) return row.category.results.length ? 'category-results' : 'no-match';
    const chosen = chosenBatchMatch(row);
    if (!chosen) return 'no-match';
    if (chosen.test.status === 'blocked') return 'blocked';
    if (chosen.test.status === 'pending') return 'pending';
    if (chosen.score < 550) return 'low-confidence';
    return canAutoAddBatchRow(row) ? 'exact-match' : 'confirm-match';
  }

  function renderBatch(addBest) {
    const queries = parseQueries(els.searchInput.value);
    if (!queries.length) {
      showToast('Enter at least one test name or code.');
      els.searchInput.focus();
      return;
    }

    const previousChoices = new Map(batchReviewRows.map(row => [row.query, row.chosenId]));
    const rows = queries.map((query, index) => {
      const category = findCategoryMatches(query);
      // A category never falls through into "No local match found" or a guessed assay.
      if (category) return { query, index, category, matches: [], chosenId: null, outcome: 'review' };
      const matches = findMatches(query, 5);
      const previousId = previousChoices.get(query);
      return { query, index, matches, chosenId: matches.some(match => match.test.id === previousId) ? previousId : matches[0]?.test.id, outcome: 'review' };
    });
    let added = 0;

    if (addBest) {
      rows.forEach(row => {
        const best = chosenBatchMatch(row);
        row.outcome = batchRowOutcome(row);
        if (row.outcome !== 'exact-match') return;
        if (selectedIds.includes(best.test.id)) {
          row.outcome = 'already-selected';
          return;
        }
        if (addSelected(best.test.id, false)) {
          row.outcome = 'added';
          added += 1;
        } else {
          row.outcome = 'not-added';
        }
      });
      saveSelected();
      renderOrder();
    } else {
      rows.forEach(row => { row.outcome = batchRowOutcome(row); });
    }

    batchReviewRows = rows;
    const matchedCount = rows.filter(row => row.matches.length || row.category?.results.length).length;
    const categoryRows = rows.filter(row => row.category);
    const confirmCount = rows.filter(row => row.outcome === 'confirm-match').length;
    const inSummaryCount = rows.filter(row => ['added', 'already-selected'].includes(row.outcome)).length;
    const hardIssueCount = rows.filter(row => ['no-match', 'blocked', 'pending', 'low-confidence', 'not-added'].includes(row.outcome)).length;
    const unresolved = rows.filter(row => ['no-match', 'blocked', 'pending', 'low-confidence', 'confirm-match', 'not-added'].includes(row.outcome));
    const resultSummary = renderBatchResultSummary(rows, addBest);
    const reviewSummary = renderBatchReviewSummary(inSummaryCount, confirmCount, hardIssueCount, addBest);

    if (addBest) {
      const alreadySelected = rows.filter(row => row.outcome === 'already-selected').length;
      const accountedFor = added + alreadySelected;
      if (categoryRows.length && !unresolved.length) {
        showToast(accountedFor
          ? `${accountedFor} specific ${accountedFor === 1 ? 'test' : 'tests'} in summary. Choose category tests individually below.`
          : 'Category results are shown below. Choose individual tests to add to the cart.');
      } else if (unresolved.length) {
        showToast(`${accountedFor} ${accountedFor === 1 ? 'test is' : 'tests are'} in the summary. ${unresolved.length} ${unresolved.length === 1 ? 'entry needs' : 'entries need'} review.`);
      } else {
        showToast(`All ${rows.length} ${rows.length === 1 ? 'test is' : 'tests are'} in the summary.`);
      }
    }

    const headerText = categoryRows.length === rows.length && categoryRows.length === 1 && categoryRows[0].category.results.length
      ? `${categoryRows[0].category.results.length} tests in ${categoryRows[0].category.label}. Select individual tests below.`
      : confirmCount
        ? `${confirmCount} ${confirmCount === 1 ? 'possible match needs' : 'possible matches need'} your confirmation before adding.`
        : hardIssueCount
          ? `${hardIssueCount} ${hardIssueCount === 1 ? 'entry needs' : 'entries need'} attention.`
          : categoryRows.length
            ? `${matchedCount} of ${rows.length} entries matched. Choose category tests individually below.`
            : `${matchedCount} of ${rows.length} entries matched.`;

    els.batchResults.classList.remove('hidden');
    els.batchResults.innerHTML = `
      <div class="panel-heading batch-panel-heading">
        <div><h2>Review matches</h2><p>${headerText}</p></div>
        <button type="button" class="batch-review-close" data-action="close-batch-results" aria-label="Close review matches"><span aria-hidden="true">×</span> Close</button>
      </div>
      ${reviewSummary}
      ${resultSummary}
      <div class="batch-grid">
        ${rows.map(renderBatchRow).join('')}
      </div>`;
  }

  function renderBatchReviewSummary(inSummaryCount, confirmCount, hardIssueCount, addBest) {
    if (!addBest && !confirmCount && !hardIssueCount) return '';
    const chips = [];
    if (addBest && inSummaryCount) chips.push(`<span class="batch-summary-chip is-added">✓ ${inSummaryCount} ${inSummaryCount === 1 ? 'in summary' : 'in summary'}</span>`);
    if (confirmCount) chips.push(`<span class="batch-summary-chip needs-review">${confirmCount} ${confirmCount === 1 ? 'needs confirmation' : 'need confirmation'}</span>`);
    if (hardIssueCount) chips.push(`<span class="batch-summary-chip has-issue">${hardIssueCount} ${hardIssueCount === 1 ? 'needs attention' : 'need attention'}</span>`);
    return chips.length ? `<div class="batch-review-summary">${chips.join('')}</div>` : '';
  }

  function renderBatchResultSummary(rows, addBest) {
    if (rows.length < 2) return '';

    // Possible matches that simply need confirmation are shown directly on their cards.
    // Keep this summary only for true problems so the same warning is not repeated twice.
    const unresolved = rows.filter(row => ['no-match', 'blocked', 'pending', 'low-confidence', 'not-added'].includes(row.outcome));
    if (!unresolved.length) return '';

    const label = addBest ? 'Needs attention' : 'Needs attention';
    return `<div class="batch-status batch-status-warning">
      <div class="batch-status-heading"><strong>${label} (${unresolved.length})</strong><span>These entries could not be added automatically.</span></div>
      <ul class="batch-missing-list">
        ${unresolved.map(row => `<li><strong>${escapeHtml(row.query)}</strong><span>${escapeHtml(batchOutcomeReason(row.outcome))}</span></li>`).join('')}
      </ul>
    </div>`;
  }

  function batchOutcomeReason(outcome) {
    if (outcome === 'no-match') return 'No local match found';
    if (outcome === 'low-confidence') return 'Low-confidence match — verify before adding';
    if (outcome === 'confirm-match') return 'Possible match — confirm before adding';
    if (outcome === 'blocked') return 'This test requires collection verification before adding';
    if (outcome === 'pending') return 'LabCorp test name and specimen requirements need verification';
    return 'Could not be added';
  }

  function renderBatchRow(row) {
    if (row.category) return renderBatchCategoryRow(row);
    if (!row.matches.length) {
      return `<div class="batch-row unmatched" data-batch-index="${row.index}">
        <div class="batch-query-block"><span class="batch-kicker">You entered</span><div class="batch-query">${escapeHtml(row.query)}</div></div>
        <div class="batch-match"><span class="batch-kicker">Result</span><strong>No local match found</strong><small>Check the official directory or add the test manually.</small></div>
        <div class="batch-unmatched-actions"><a class="mini-button edit" href="${escapeAttr(directorySearchUrl(row.query))}" target="_blank" rel="noreferrer">Search directory ↗</a><button class="mini-button edit" data-action="new-from-query" data-query="${escapeAttr(row.query)}">Add missing test</button></div>
      </div>`;
    }
    const choice = chosenBatchMatch(row);
    const blocked = choice.test.status === 'blocked';
    const pending = choice.test.status === 'pending';
    const autoSafe = canAutoAddBatchRow(row);
    const needsConfirmation = !blocked && !pending && !autoSafe;
    const selected = selectedIds.includes(choice.test.id);
    const rowClass = blocked || pending ? 'unmatched' : needsConfirmation ? 'needs-confirmation' : 'exact-match';
    const exactLabel = autoSafe ? 'Exact match' : 'Confirm test code/name';
    const status = blocked
      ? '<span class="batch-match-warning is-blocked">Review collection</span>'
      : pending ? '<span class="batch-match-warning">Verify LabCorp details</span>'
      : autoSafe
        ? `<span class="batch-match-exact">${exactLabel}</span>`
        : `<span class="batch-match-warning">${exactLabel}</span>`;
    const options = row.matches.length > 1 && (needsConfirmation || blocked || pending || row.matches.some(match => normalizeSearch(match.test.testName) === normalizeSearch(row.query)));
    // An in-page dropdown supports per-choice STAT/blocked badges.
    // Eligibility always uses the receiving-lab menu via isStatEligible().
    const picker = options ? `<div class="batch-choice-control">
      <span class="batch-choice-label" id="batch-choice-label-${row.index}">Choose test (code / name)</span>
      <div class="batch-choice-dropdown">
        <button type="button" class="batch-choice-trigger" aria-labelledby="batch-choice-label-${row.index}" aria-label="Choose test for ${escapeAttr(row.query)}" aria-expanded="false" aria-controls="batch-choice-menu-${row.index}" aria-haspopup="true">
          <span class="batch-choice-selected">${escapeHtml(displayCode(choice.test))} · ${escapeHtml(choice.test.testName)}</span><svg class="batch-choice-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
        </button>
        <div id="batch-choice-menu-${row.index}" class="batch-choice-menu" role="group" hidden aria-label="Matching tests for ${escapeAttr(row.query)}">
          ${row.matches.map(({test}, matchIndex) => `<div class="batch-choice-entry">
            <div class="batch-choice-entry-actions">
              <button type="button" class="batch-choice-option${test.id === choice.test.id ? ' is-selected' : ''}"
                data-action="choose-batch-test" data-batch-index="${row.index}" data-id="${escapeAttr(test.id)}"
                aria-pressed="${test.id === choice.test.id ? 'true' : 'false'}">
                <span class="batch-choice-option-name">${escapeHtml(displayCode(test))} · ${escapeHtml(test.testName)}</span>${window.LabRegionalRestrictions.badge(test, 'labcorp')}
                <span class="batch-choice-option-tags">${isStatEligible(test) ? '<span class="batch-choice-stat"><span class="batch-choice-stat-word">STAT</span> eligible</span>' : ''}${test.status === 'blocked' ? '<span class="batch-choice-blocked">Review collection</span>' : test.status === 'pending' ? '<span class="batch-choice-blocked">Verification required</span>' : ''}</span>
              </button>
              <button type="button" class="batch-choice-quick-add batch-add-toggle" data-action="toggle-batch-add-options"
                data-batch-index="${row.index}" data-id="${escapeAttr(test.id)}"
                aria-controls="batch-choice-stat-options-${row.index}-${matchIndex}" aria-expanded="false" aria-haspopup="true"
                title="${selectedIds.includes(test.id) ? 'Already in cart' : test.status === 'blocked' ? 'Review collection' : test.status === 'pending' ? 'Verification required' : 'Choose Routine or STAT priority'}"
                aria-label="${selectedIds.includes(test.id) ? 'Already in cart: ' : 'Choose how to add: '}${escapeAttr(displayCode(test) + ' ' + test.testName)}"
                ${selectedIds.includes(test.id) || test.status !== 'active' ? 'disabled' : ''}>${selectedIds.includes(test.id) ? '✓' : '+'}</button>
              <button type="button" class="batch-choice-details-button" data-action="toggle-batch-test-details"
                aria-expanded="false" aria-controls="batch-choice-details-${row.index}-${matchIndex}" aria-label="Details for ${escapeAttr(displayCode(test) + ' ' + test.testName)}">Details</button>
            </div>
            ${!selectedIds.includes(test.id) && test.status === 'active' ? `<div class="batch-choice-stat-options" id="batch-choice-stat-options-${row.index}-${matchIndex}" hidden role="group"
              aria-label="Choose priority for ${escapeAttr(displayCode(test) + ' ' + test.testName)}">
              <button type="button" data-action="add-batch-option" data-batch-index="${row.index}" data-id="${escapeAttr(test.id)}" data-priority="routine" data-source="match">+ Add as Routine</button>
              ${isStatEligible(test) ? `<button type="button" data-action="add-batch-option" data-batch-index="${row.index}" data-id="${escapeAttr(test.id)}" data-priority="stat" data-source="match" data-stat-note="Confirm receiving-lab acceptance"><span>+ Add as <b>STAT</b></span></button>` : ''}
            </div>` : ''}
            <div class="batch-choice-test-details" id="batch-choice-details-${row.index}-${matchIndex}" hidden>
              <div><b>Specimen:</b> ${escapeHtml(test.specimenType || 'Verify in directory')}</div>
              <div><b>Collect:</b> ${escapeHtml(test.drawContainer || 'Verify in directory')}</div>
              <div><b>Submit:</b> ${escapeHtml(test.transportContainer || test.drawContainer || 'Verify in directory')}</div>
              <div><b>Temperature:</b> ${escapeHtml(test.transportTemperature || 'Verify in directory')}</div>
              ${test.preferredVolume ? `<div><b>Preferred volume:</b> ${escapeHtml(test.preferredVolume)}</div>` : ''}
              ${test.minimumVolume ? `<div><b>Minimum volume:</b> ${escapeHtml(test.minimumVolume)}</div>` : ''}
              ${test.stability ? `<div><b>Stability:</b> ${escapeHtml(test.stability)}</div>` : ''}
              ${conciseSpecimenLabel(test, { originalTube: isOriginalContainerSubmission(test) }).label ? `<div><b>Label:</b> ${escapeHtml(conciseSpecimenLabel(test, { originalTube: isOriginalContainerSubmission(test) }).label)}</div>` : ''}${conciseSpecimenLabel(test, { originalTube: isOriginalContainerSubmission(test) }).processing.map(note => `<div><b>Processing:</b> ${escapeHtml(note)}</div>`).join('')}
              ${test.specialInstructions ? `<div><b>Handling:</b> ${escapeHtml(test.specialInstructions)}</div>` : ''}
              <a href="${escapeAttr(directoryUrl(test))}" target="_blank" rel="noopener noreferrer">Verify in official directory ↗</a>
            </div>
          </div>`).join('')}
        </div>
      </div>
    </div>` : '';
    const buttonLabel = selected ? '✓ Added' : pending ? 'Verification required' : needsConfirmation ? 'Confirm & add' : '+ Add';
    return `<div class="batch-row ${rowClass}" data-batch-index="${row.index}">
      <div class="batch-query-block"><span class="batch-kicker">You entered</span><div class="batch-query">${escapeHtml(row.query)}</div></div>
      <div class="batch-match">
        <div class="batch-match-title">${autoSafe ? '' : `<span class="batch-kicker">${choice === row.matches[0] ? 'Best match' : 'Selected match'}</span>`}${status}</div>
        <strong>${escapeHtml(displayCode(choice.test))} · ${escapeHtml(choice.test.testName)}</strong>${window.LabRegionalRestrictions.badge(choice.test, 'labcorp')}
        <div class="batch-match-meta">${blocked ? '<span>Collection review required</span>' : pending ? '<span>Collection details not verified</span>' : ''}${requiredSpecimenBadges(choice.test)}<span class="batch-meta-dot">·</span>${requiredDrawContainerBadges(choice.test)}${isStatEligible(choice.test) ? '<span class="batch-choice-stat"><span class="batch-choice-stat-word">STAT</span> eligible</span>' : ''}</div>
        ${picker}
      </div>
      <div class="batch-row-action">
        <div class="batch-main-add-control">
          <button type="button" class="mini-button batch-main-add-toggle batch-add-toggle ${needsConfirmation ? 'confirm-match-button' : ''}" data-action="toggle-batch-add-options"
            data-batch-index="${row.index}" data-id="${escapeAttr(choice.test.id)}" aria-haspopup="true"
            aria-expanded="false" aria-controls="batch-main-add-options-${row.index}"
            ${blocked || pending || selected ? 'disabled' : ''}>${buttonLabel}<span class="batch-main-add-chevron shared-chevron" aria-hidden="true"></span></button>
          ${!blocked && !pending && !selected ? `<div class="batch-choice-stat-options batch-main-add-options" id="batch-main-add-options-${row.index}" hidden role="group"
             aria-label="Choose priority for ${escapeAttr(displayCode(choice.test) + ' ' + choice.test.testName)}">
             <button type="button" data-action="add-batch-option" data-batch-index="${row.index}" data-id="${escapeAttr(choice.test.id)}" data-priority="routine" data-source="main">+ Add as Routine</button>
             ${isStatEligible(choice.test) ? `<button type="button" data-action="add-batch-option" data-batch-index="${row.index}" data-id="${escapeAttr(choice.test.id)}" data-priority="stat" data-source="main" data-stat-note="Confirm receiving-lab acceptance"><span>+ Add as <b>STAT</b></span></button>` : ''}
           </div>` : ''}
        </div>
        ${needsConfirmation ? `<a class="mini-button edit batch-directory-button" href="${escapeAttr(directorySearchUrl(row.query))}" target="_blank" rel="noreferrer">Search directory ↗</a>` : ''}
        ${autoSafe ? `<a class="batch-exact-directory-link" href="${escapeAttr(directoryUrl(choice.test))}" target="_blank" rel="noopener noreferrer" aria-label="Open official directory for ${escapeAttr(displayCode(choice.test) + ' ' + choice.test.testName)}">Official directory ↗</a>` : ''}
      </div>
    </div>`;
  }

  // Keep the complete category list accessible inside a five-row scroll window.
  function renderBatchCategoryRow(row) {
    const { label, results } = row.category;
    return `<div class="batch-row batch-category-row" data-batch-index="${row.index}">
      <div class="batch-category-heading">
        <div><span class="batch-kicker">Clinical category</span><strong>${escapeHtml(label)}</strong>
          <p>${results.length} ${results.length === 1 ? 'test' : 'tests'} found${results.length ? '. Choose the tests you need.' : '. Try another category or a specific test name.'}</p></div>
        <span class="batch-category-count">${results.length} tests</span>
      </div>
      <div class="batch-category-list" tabindex="0" role="region" aria-label="${escapeAttr(label)} tests, ${results.length} results. Scroll to view all tests.">
        ${results.map(test => {
          const selected = selectedIds.includes(test.id);
          return `<div class="batch-category-item">
            <div class="batch-category-test"><span class="batch-category-code">${escapeHtml(displayCode(test))}</span>
              <span class="batch-category-name">${escapeHtml(test.testName)}</span>${window.LabRegionalRestrictions.badge(test, 'labcorp')}
              ${isStatEligible(test) ? '<span class="batch-choice-stat"><span class="batch-choice-stat-word">STAT</span> eligible</span>' : ''}
            </div>
            <button type="button" class="mini-button batch-category-add" data-action="add-category-test"
              data-batch-index="${row.index}" data-id="${escapeAttr(test.id)}" ${selected || test.status !== 'active' ? 'disabled' : ''}>${selected ? '✓ Added' : test.status === 'pending' ? 'Verification required' : '+ Add'}</button>
          </div>`;
        }).join('')}
      </div>
      ${results.length > 5 ? `<div class="batch-category-footer"><span>Scroll inside the list to browse all ${results.length} tests</span></div>` : ''}
    </div>`;
  }

  // A test may need multiple physical specimens. Filter by every required path,
  // not just the primary specimen, while keeping precise fluid and swab subtypes.
  function specimenFilterCategoriesForType(specimenType) {
    const value = normalizeSearch(specimenType || '');
    if (/\b(?:serum|plasma|blood|rbcs?|erythrocytes?|red blood cells?)\b/.test(value)) {
      const result = ['Blood'];
      if (/\bserum\b/.test(value)) result.push('Serum');
      if (/\bplasma\b/.test(value)) result.push('Plasma');
      if (/\bwhole blood\b/.test(value)) result.push('Whole Blood');
      if (/\b(?:rbcs?|erythrocytes?|red blood cells?)\b/.test(value)) result.push('RBCs');
      return result;
    }
    if (/\b(?:urine|urinary)\b/.test(value)) return ['Urine'];
    if (/\b(?:stool|feces|fecal|faeces|faecal)\b/.test(value)) return ['Stool'];
    if (/\bswab\b/.test(value)) {
      const result = ['Swab'];
      if (/\bvaginal\s+rectal\b/.test(value)) result.push('Vaginal-Rectal Swab', 'Vaginal Swab');
      else if (/\bcervicovaginal\b/.test(value)) result.push('Cervicovaginal Swab', 'Vaginal Swab');
      else if (/\bvaginal\b/.test(value)) result.push('Vaginal Swab');
      if (/\bthroat\b|\bpharyng/.test(value)) result.push('Throat Swab');
      if (/\bnasopharyngeal\b/.test(value)) result.push('Nasopharyngeal Swab');
      if (/\bsite specific\b|\bculture swab\b/.test(value)) result.push('Site-Specific Culture Swab');
      return result;
    }
    if (/\b(?:csf|cerebrospinal)\b/.test(value)) return ['Body Fluid', 'CSF'];
    if (/\bsputum\b/.test(value)) return ['Sputum', 'Respiratory'];
    // BAL and airway washings are respiratory specimens, not sputum.
    if (/\b(?:bronchoalveolar lavage|bronchial washing|tracheal aspirate|nasopharyngeal washing)\b/.test(value)) return ['Respiratory'];
    if (/\bsaliva\b/.test(value)) return ['Saliva'];
    if (/^semen$/.test(value)) return ['Semen'];
    if (/^breath$/.test(value)) return ['Breath'];
    if (/^(?:dry stone|calculi|calculus)$/.test(value)) return ['Dry Stone'];
    if (/^(?:jp drainage|bile)$/.test(value)) return ['Body Fluid'];
    if (/\btissue\b/.test(value)) return ['Tissue'];
    if (/\bcervical\b.*\bcytology\b.*\bfluid\b/.test(value)) return ['Body Fluid', 'Cervical Cytology Fluid'];
    for (const [pattern, name] of [
      [/\bpericardial\b/, 'Pericardial Fluid'],
      [/\bperitoneal\b|\bascit(?:es|ic)\b/, 'Peritoneal Fluid'],
      [/\bpleural\b/, 'Pleural Fluid'],
      [/\bsynovial\b|\bjoint fluid\b/, 'Synovial Fluid']
    ]) {
      if (pattern.test(value)) return ['Body Fluid', name];
    }
    if (/\b(?:fluid|ascites|effusion)\b/.test(value)) return ['Body Fluid'];
    return ['Other'];
  }

  function specimenFilterCategories(test) {
    const result = new Set(specimenFilterCategoriesForType(test.specimenType));
    additionalDrawRequirements(test).forEach(requirement => {
      if (!requirement.specimenType) return;
      specimenFilterCategoriesForType(requirement.specimenType).forEach(category => result.add(category));
    });
    return Array.from(result);
  }

  // Filter by the transport requirement recorded for each test, not the draw
  // tube. Keep special containers separate from generic transport tubes.
  // Match the SUBMITTED container rather than a collection-tube alternative.
  // Dedicated systems (Affirm, ESwab, Aptima) must never fall under a generic kit.
  function transportCategoriesForPath(test) {
    const value = normalizeSearch(test.transportContainer || '');
    const draw = normalizeSearch(test.drawContainer || '');
    const original = /\b(?:original tubes?|original containers?|original specimens?|original bottles?|original devices?|original kits?|primary tubes?|no transfer|do not open|unopened original)\b/.test(value);
    // Classify the actual submitted device (or the original collection kit).
    // Do not infer media from narrative instructions or the specimen's source cup.
    const submitted = original ? draw : value;
    const withOriginal = categories => original ? [...categories, 'original'] : categories;
    // Frozen polypropylene/Transpak aliquots retain the purple frozen class.
    // This check must precede general serum, plasma and polypropylene matches.
    if (isFrozenSerumPlasmaTransport(test, test.transportContainer))
      return withOriginal(['frozen-transport']);
    // Preserve the actual tube/kit family even when the record says to ship
    // the unopened original device. Labels and processing requirements stay intact.
    if (/bac(?:t)? alert|bactec|blood culture bottl/.test(submitted))
      return withOriginal(['blood-culture']);
    if (/salivette/.test(submitted)) return withOriginal(['salivette']);
    if (/flocked.*dry swab|dry swab|swab sleeve/.test(submitted))
      return withOriginal(['dry-swab']);
    if (/thinprep|preservcyt|surepath/.test(submitted))
      return withOriginal(['cytology-vial']);
    if (/breath bag|breath collection bag/.test(submitted))
      return withOriginal(['breath-bag']);
    // A plain sterile CSF screw-cap vessel belongs under Sterile cup in filters.
    // Keep the test's precise specimen label and transport instructions unchanged.
    if (/sterile.*csf.*(?:tube|container|vial)|csf.*screw cap/.test(submitted))
      return withOriginal(['sterile-cup']);
    if (/\broyal blue\b/.test(submitted)) {
      if (/edta|purple stripe/.test(submitted)) return withOriginal(['blood-royal-blue-edta']);
      if (/heparin/.test(submitted)) return withOriginal(['blood-royal-blue-heparin']);
      return withOriginal(['blood-royal-blue-serum']);
    }
    if (/\bpink edta\b/.test(submitted)) return withOriginal(['blood-pink']);
    if (/\blavender edta\b|edta lavender/.test(submitted)) return withOriginal(['blood-lavender']);
    if (/\bgreen\b.*\bheparin\b|\bheparin\b.*\bgreen\b/.test(submitted)) return withOriginal(['blood-green']);
    if (/\blight blue\b.*\bcitrate\b|\bsodium citrate\b.*\bblue\b/.test(submitted))
      return withOriginal(['blood-blue']);
    if (/\bgray\b.*(?:fluoride|oxalate)|\bgray top\b/.test(submitted) &&
        !/urine|culture|pva/.test(submitted)) return withOriginal(['blood-gray']);
    if (/yellow acd|acd yellow/.test(submitted)) return withOriginal(['blood-yellow']);
    if (/\btan\b.*(?:edta|heparin)/.test(submitted)) return withOriginal(['blood-tan']);
    if (/\bred top\b|\bred no additive\b/.test(submitted)) return withOriginal(['blood-red']);
    if (/\bsst\b|\bgold\b.*(?:spun|sst)|spun gold/.test(submitted))
      return withOriginal(['sst']);
    // Standard empty serum/plasma, chilled, and clean screw-cap transport vials
    // share the Transport Tube filter. Their exact test-specific handling,
    // preservation, matrix, and temperatures remain unchanged in source data.
    if (/serum plasma transport/.test(submitted)) return withOriginal(['transport', 'serum', 'plasma']);
    if (/polypropylene.*(?:transport|tube|vial)|plastic screw cap plasma vial/.test(submitted)) {
      const cats = ['transport'];
      if (/\bplasma\b/.test(submitted)) cats.push('plasma');
      if (/\bserum\b/.test(submitted)) cats.push('serum');
      return withOriginal(cats);
    }
    if (/cary ?blair|para pak orange|para pak c s/.test(submitted))
      return withOriginal(['cary-blair']);
    if (/total fix/.test(submitted)) return withOriginal(['stool']);
    const opVials = [];
    if (/\bformalin\b/.test(submitted)) opVials.push('stool-formalin');
    if (/\bpva\b|polyvinyl alcohol/.test(submitted)) opVials.push('stool-pva');
    if (opVials.length) return withOriginal(opVials);
    if (/para pak white|(?:sterile |clean )?screw cap(?:ped)? (?:plastic )?stool|(?:sterile |clean )?stool.*(?:screw cap|clean|unpreserved) vial/.test(submitted))
      return withOriginal(['stool-clean']);
    if (/uri\s?sponge/.test(submitted)) return withOriginal(['urisponge', 'urine-culture']);
    if (/blood culture bottles?/.test(submitted)) return withOriginal(['blood-culture']);
    if (/quantiferon|quanti feron|qft tb|tb gold plus tubes?/.test(submitted)) return withOriginal(['qft']);
    if (/nmr lipotube|nmr lipo tube/.test(submitted)) return withOriginal(['nmr']);
    if (/microtainer/.test(submitted)) return withOriginal(['microtainer']);
    if (/protease inhibitor/.test(submitted)) return withOriginal(['protease']);
    if (/chilled.*(?:screw cap|plastic|vial)/.test(submitted)) return withOriginal(['transport', 'chilled-vial']);
    if (/24 hour urine (?:container|jug)/.test(submitted))
      return withOriginal(['24h-urine', 'urine-cup']);
    if (/screw cap(?:ped)? (?:plastic )?vial|clean screw cap|plain plastic vial/.test(submitted)) {
      const specimen = normalizeSearch(test.specimenType || '');
      return withOriginal(/\bstool\b|\bfeces\b|\bfecal\b/.test(specimen) ? ['stool-clean', 'clean-vial'] : ['transport', 'clean-vial']);
    }
    if (/\baffirm\b|\batts\b/.test(value) || (original && /\baffirm\b|\batts\b/.test(draw)))
      return original ? ['affirm', 'original'] : ['affirm'];
    if (/\beswab\b|\be swab\b|\bamies\b/.test(value) ||
        (original && /\beswab\b|\be swab\b|\bamies\b/.test(draw)))
      return original ? ['amies', 'original'] : ['amies'];
    if (/fetal fibronectin/.test(value) || (original && /fetal fibronectin/.test(draw)))
      return original ? ['fetal-fibronectin', 'original'] : ['fetal-fibronectin'];
    if (isPlainUrineAliquotTransport(test, test.transportContainer)) return ['sterile-cup'];
    if (cleanCollectionContainer(test.transportContainer) === 'Sterile cup' ||
        (original && cleanCollectionContainer(test.drawContainer) === 'Sterile cup'))
      return ['sterile-cup', 'original'];
    if (isFrozenSerumPlasmaTransport(test, test.transportContainer)) return ['frozen-transport'];
    if (/red yellow|ua preservative/.test(value))
      return /gray top urine|urine culture|urisponge/.test(value)
        ? ['urine-ua', 'urine-culture'] : ['urine-ua'];
    if (/gray top urine|urine culture|urisponge/.test(value)) return ['urine-culture'];
    if (/amber|light protected|protect from light/.test(value)) return ['amber'];
    if (/acid washed|metal free|trace element|trace metal/.test(value) ||
        (original && /acid washed|metal free|trace element|trace metal/.test(draw))) {
      const metalLabel = /acid washed|metal free|trace element|trace metal/.test(value) ? value : draw;
      const withOriginal = categories => original ? [...categories, 'original'] : categories;
      const specimen = normalizeSearch(test.specimenType || '');
      // Distinguish the submitted material, while retaining the legacy metal key.
      if (/\burine\b/.test(specimen) || /\burine\b|\bcup\b/.test(metalLabel))
        return withOriginal(['metal', 'metal-urine']);
      if (/\bserum\b/.test(specimen) || /\bserum\b/.test(metalLabel))
        return withOriginal(['metal', 'metal-serum']);
      if (/\bplasma\b|\bwhole blood\b|\brbcs?\b|\bred blood cells?\b/.test(specimen) ||
          /\bplasma\b|\bwhole blood\b|\brbcs?\b/.test(metalLabel))
        return withOriginal(['metal', 'metal-plasma']);
      return withOriginal(['metal', 'metal-other']);
    }
    if (/sst|gold spun/.test(value)) return ['sst'];
    if (/aptima/.test(value) || (original && /aptima/.test(draw))) {
      const kitName = /aptima/.test(value) ? value : draw;
      const withOriginal = cats => original ? [...cats, 'original'] : cats;
      const specimen = normalizeSearch(test.specimenType || '');
      const source = normalizeSearch(test.drawContainer || '');
      if (/\burine\b/.test(specimen) || /\burine\b/.test(kitName)) return withOriginal(['aptima', 'aptima-urine']);
      if (/\bunisex\b|white label/.test(kitName + ' ' + source)) return withOriginal(['aptima', 'aptima-unisex']);
      if (/multitest|multi test|orange label/.test(kitName + ' ' + source) || /\bswab\b/.test(specimen))
        return withOriginal(['aptima', 'aptima-multitest']);
      return withOriginal(['aptima', 'aptima-other']);
    }
    if (original) return ['original'];
    if (/^(lavender edta|edta lavender top tube|gray top|gray fluoride oxalate|yellow acd b)$/.test(value))
      return ['original'];
    if (/viral|vcm|utm|transport media/.test(value)) return ['viral'];
    if (/total fix/.test(value)) return ['stool'];
    if (/stool container|stool can|stool vial|fecal container/.test(value)) return ['stool-other'];
    if (/sterile (?:urine )?cup/.test(value)) return ['sterile-cup'];
    if (/plastic urine container|24 hour urine/.test(value)) return ['urine-cup'];
    if (/plasma transport/.test(value)) return ['transport', 'plasma'];
    if (/serum transport|serum .* transport vial/.test(value)) return ['transport', 'serum'];
    if (/^(?:(?:\d+|two)\s+)?(?:separate\s+)?transport tubes?$/.test(value)) return ['transport'];
    return ['special'];
  }

  function transportContainerFilterCategories(test) {
    const result = new Set(transportCategoriesForPath(test));
    additionalDrawRequirements(test).forEach(requirement => {
      if (!requirement.transportContainer) return;
      const route = { ...test, specimenType: requirement.specimenType || test.specimenType,
        drawContainer: requirement.container || test.drawContainer,
        transportContainer: requirement.transportContainer };
      transportCategoriesForPath(route).forEach(category => result.add(category));
    });
    return Array.from(result);
  }

  // This is a TRANSPORT filter: a sterile source cup alone is not enough.
  // A culture specimen transferred to a gray-top tube is filtered by that tube.
  function usesSterileCup(test) {
    return transportContainerFilterCategories(test).includes('sterile-cup');
  }

  function positionMobileCatalogFilters() {
    const panel = els.catalogFilterPanel;
    if (panel.classList.contains('hidden')) return;
    if (!matchMedia('(max-width: 720px), (hover: none) and (pointer: coarse)').matches) {
      panel.style.removeProperty('--catalog-filter-top');
      return;
    }
    const viewHeight = window.visualViewport?.height || innerHeight;
    const anchor = els.catalogFilterButton.getBoundingClientRect();
    const spaceBelow = viewHeight - anchor.bottom - 12;
    // Stay below the trigger when there is room, otherwise open a full-height sheet.
    const top = spaceBelow >= Math.min(370, viewHeight * .55) ? anchor.bottom + 8 : 12;
    panel.style.setProperty('--catalog-filter-top', Math.max(12, Math.round(top)) + 'px');
  }

  function toggleCatalogFilters(force) {
    const open = typeof force === 'boolean' ? force : els.catalogFilterPanel.classList.contains('hidden');
    if (!open && !els.catalogFilterPanel.classList.contains('hidden')) window.closePortalSelects?.();
    els.catalogFilterPanel.classList.toggle('hidden', !open);
    els.catalogFilterButton.setAttribute('aria-expanded', String(open));
    const mobileOpen = open && matchMedia('(max-width: 720px), (hover: none) and (pointer: coarse)').matches;
    document.documentElement.classList.toggle('catalog-filter-scroll-lock', mobileOpen);
    document.body.classList.toggle('catalog-filter-scroll-lock', mobileOpen);
    els.catalogFilterControl.closest('.filter-row')?.classList.toggle('catalog-filter-expanded', open);
    if (open) positionMobileCatalogFilters();
    else els.catalogFilterPanel.style.removeProperty('--catalog-filter-top');
  }
  window.addEventListener('resize', () => {
    if (els.catalogFilterPanel.classList.contains('hidden')) return;
    const mobileOpen = matchMedia('(max-width: 720px), (hover: none) and (pointer: coarse)').matches;
    document.documentElement.classList.toggle('catalog-filter-scroll-lock', mobileOpen);
    document.body.classList.toggle('catalog-filter-scroll-lock', mobileOpen);
    positionMobileCatalogFilters();
  }, { passive: true });

  function resetCatalogFilters() {
    els.categoryFilter.value = '';
    els.specimenFilter.value = '';
    els.temperatureFilter.value = '';
    els.transportContainerFilter.value = '';
    els.containerNameFilter.value = '';
    els.fastingFilter.value = '';
    els.pediatricFilter.checked = false;
    els.spinFilter.checked = false;
    libraryLimit = PAGE_STEP;
    renderLibrary();
    window.syncPortalSelects?.();
  }

  function libraryFilterCount() {
    return [els.categoryFilter.value, els.specimenFilter.value, els.temperatureFilter.value, els.transportContainerFilter.value, els.containerNameFilter.value.trim(), els.fastingFilter.value,
      els.pediatricFilter.checked, els.spinFilter.checked].filter(Boolean).length;
  }

  function catalogTemperatureFilterKey(test) {
    const bag = transportBagInfo(test);
    // A dedicated Quest QuantiFERON refrigerated bag remains separate in the
    // draw/transport plan, while the temperature filter reflects temperature.
    if (bag.key === 'quantiferon-gold') return 'refrigerated';
    return bag.key;
  }

  function matchesLibraryFilters(test) {
    const category = els.categoryFilter.value;
    if (category && !window.LabClinicalCategories?.forTest(test).includes(category)) return false;
    const specimen = els.specimenFilter.value;
    if (specimen && !specimenFilterCategories(test).includes(specimen)) return false;
    const temperature = els.temperatureFilter.value;
    if (temperature && catalogTemperatureFilterKey(test) !== temperature) return false;
    const container = els.transportContainerFilter.value;
    if (container) {
      const categories = transportContainerFilterCategories(test);
      // Parent group membership comes directly from the native options used
      // by the side menu. Selecting a parent matches any of its child types.
      const children = container.startsWith('group-')
        ? [...els.transportContainerFilter.options].filter(option =>
            option.dataset?.containerGroup === container).map(option => option.value)
        : null;
      const matched = children
        ? children.some(key => categories.includes(key))
        : container === 'sterile-cup' ? usesSterileCup(test) : categories.includes(container);
      if (!matched) return false;
    }
    // The optional name search covers any exact transport-device wording in
    // the catalog, including rare kits and secondary submission routes.
    // It never matches a source-only sterile cup when a specimen is transferred.
    const specificContainer = normalizeSearch(els.containerNameFilter.value);
    if (specificContainer) {
      const submittedName = route => {
        const transport = normalizeSearch(route.transportContainer || '');
        if (/\b(?:original tubes?|original containers?|original specimens?|original bottles?|original devices?|original kits?|primary tubes?|no transfer|do not open|unopened original)\b/.test(transport))
          return normalizeSearch(route.drawContainer || '');
        return transport;
      };
      const routes = [test, ...additionalDrawRequirements(test).map(requirement => ({
        drawContainer: requirement.container || test.drawContainer,
        transportContainer: requirement.transportContainer
      }))];
      if (!routes.some(route => submittedName(route).includes(specificContainer))) return false;
    }
    const fasting = els.fastingFilter.value;
    if (fasting && fastingRequirement(test)?.level !== fasting) return false;
    // Limit this category to explicitly named pediatric/neonatal tests;
    // general references to a patient's age in instructions are not reliable age eligibility.
    if (els.pediatricFilter.checked && !/\b(pediatric|paediatric|neonatal|newborn|infant|child(?:ren)?|microtainer)\b/i.test(test.testName)) return false;
    if (els.spinFilter.checked && !/^(yes|required)$/i.test(String(test.spin || '').trim())) return false;
    return true;
  }

  function browserAddedTests() {
    return database.filter(test => test.id.startsWith('custom-') || test.source === 'Custom entry');
  }

  function updateBrowserClearButton() {
    const count = browserAddedTests().length;
    els.clearBrowserTestsButton.disabled = !count;
    els.browserCustomCount.textContent = count ? `(${count})` : '(0)';
    els.clearBrowserTestsButton.title = count ? 'Remove only manual entries stored in this browser' : 'No manual entries to remove';
  }

  async function clearBrowserAddedTests() {
    const custom = browserAddedTests();
    if (!custom.length) return;
    if (!(await window.PortalDialog.confirm('This will permanently remove manually added tests saved in this browser. Built-in tests and their edits will remain.', { title: `Remove ${custom.length} manually added ${custom.length === 1 ? 'test' : 'tests'}?`, confirmLabel: 'Remove tests', tone: 'danger' }))) return;
    const ids = new Set(custom.map(test => test.id));
    database = database.filter(test => !ids.has(test.id));
    selectedIds = selectedIds.filter(id => !ids.has(id));
    statSelectedIds = statSelectedIds.filter(id => !ids.has(id));
    saveStatSelectedIds();
    saveSelected();
    persistDatabase();
    renderAll();
    showToast(`${custom.length} manual ${custom.length === 1 ? 'entry' : 'entries'} removed. Packaged tests preserved.`);
  }

  // Search suggestions share the established catalog ranking and never guess
  // numeric order codes. Selecting a suggestion only fills a search field:
  // the existing Add / Review actions remain the confirmation step.
  function activeBatchLine() {
    const value = els.searchInput.value;
    const caret = els.searchInput.selectionStart ?? value.length;
    const start = value.lastIndexOf('\n', Math.max(0, caret - 1)) + 1;
    const endIndex = value.indexOf('\n', caret);
    const end = endIndex === -1 ? value.length : endIndex;
    return { start, end, query: value.slice(start, end).trim() };
  }

  function closeSuggestions(kind) {
    const input = kind === 'library' ? els.libraryFilter : els.searchInput;
    const panel = kind === 'library' ? els.librarySuggestions : els.batchSuggestions;
    suggestionState[kind].active = -1;
    suggestionState[kind].items = [];
    panel.innerHTML = '';
    panel.classList.add('hidden');
    input.setAttribute('aria-expanded', 'false');
    input.removeAttribute('aria-activedescendant');
  }

  // Rank exact identity first, then code prefixes, name matches, curated
  // shorthand, and only finally typo matches. Do not fuzzy-match codes.
  function suggestionMatches(query, kind) {
    const q = normalizeSearch(query);
    if (!q) return [];
    const numeric = /^\d+$/.test(q);
    const codePlusName = q.match(/^(\d{2,})\s+(.+)$/);
    const shorterTokens = q.split(' ').filter(Boolean);
    return database
      .filter(test => test.status !== 'blocked' && (kind !== 'library' || matchesLibraryFilters(test)))
      .map(test => {
        const index = librarySearchIndex(test);
        const code = index.code;
        const name = index.name;
        let score = 0;
        if (numeric) {
          if (code === q) score = 3000;
          else if (code.startsWith(q)) score = 2300 - Math.min(100, code.length - q.length);
          // Labcorp's published six-digit codes retain leading zeroes.
          // Missing zeroes can be suggested, but never silently rewritten.
          else if (q.length >= 3 && /^0/.test(code) && code.replace(/^0+/, '').startsWith(q))
            score = 1650 - Math.min(100, code.length - q.length);
        } else {
          // A name such as "25 hydroxy vitamin D" also starts with digits.
          // Treat it as a code+name pair only when that exact code exists.
          if (codePlusName && code === codePlusName[1] &&
            rankLibraryTest(codePlusName[2], test) >= 500) score = 2800;
          else score = rankLibraryTest(q, test);
          if (index.aliases.includes(q)) score = Math.max(score, 1550);
          else if (q.length >= 2 && index.aliases.some(alias => alias.startsWith(q)))
            score = Math.max(score, 1260 - Math.min(100, name.length / 2));
          // Search suggestions should include common misspellings of a full
          // shorthand, not just misspellings of canonical test-name words.
          if (q.length >= 5 && shorterTokens.length === 1 &&
            !/^(?:hbsag|hbsab|hbcab|hbcag|hstni|hstnt|hscrp|ft3|ft4|tni|tnt)$/.test(q) &&
            index.aliases.some(alias => !alias.includes(' ') && alias.length >= 5 &&
              !/^(?:hbsag|hbsab|hbcab|hbcag|hstni|hstnt|hscrp|ft3|ft4|tni|tnt)$/.test(alias) &&
              libraryEditDistanceWithin(q, alias, q.length >= 7 ? 2 : 1)))
            score = Math.max(score, 725);
          // Do not suggest a clinically different qualified assay as though
          // it were the exact one requested.
          const requestedDiff = /\b(?:cbc|blood count)\b.*\b(?:diff|differential)\b/.test(q);
          const queryNoDiff = /\b(?:without|no|w o)\s+(?:diff|differential)\b/.test(q);
          const nameNoDiff = /\b(?:without|no)\s+(?:diff|differential)\b/.test(name);
          if (requestedDiff && queryNoDiff && !nameNoDiff &&
            /\b(?:with|w)\s+(?:diff|differential)\b/.test(name)) score = 0;
          if (requestedDiff && !queryNoDiff && nameNoDiff) score = 0;
          if (/\b(?:qualitative|qual)\b/.test(q) &&
            /\bquantitative\b/.test(name) && !/\bqualitative\b/.test(name)) score = 0;
          if (/\b(?:quantitative|quant)\b/.test(q) &&
            /\bqualitative\b/.test(name) && !/\bquantitative\b/.test(name)) score = 0;
        }
        const requestedTroponin = troponinSearchType(q);
        const catalogTroponin = requestedTroponin && troponinSearchType(name);
        if (catalogTroponin && catalogTroponin !== requestedTroponin) score = 0;
        return { test, score };
      })
      .filter(item => item.score >= 500)
      .sort((a, b) => b.score - a.score ||
        (numeric ? String(a.test.testCode || '').length - String(b.test.testCode || '').length : 0) ||
        a.test.testName.length - b.test.testName.length ||
        a.test.testName.localeCompare(b.test.testName) ||
        String(a.test.testCode || '').localeCompare(String(b.test.testCode || '')))
      .slice(0, 8);
  }

  // A unique exact test code already identifies the requested assay.
  // Keep the dropdown for partial codes, names, and duplicate exact codes.
  function hasSingleExactCodeMatch(query, matches) {
    const code = String(query || '').trim();
    return /^\d+$/.test(code) &&
      matches.filter(({ test }) => String(test.testCode || '').trim() === code).length === 1;
  }

  // An unambiguous full test name is already confirmed by the inline code hint.
  // Partial names and shared names still show the suggestion dropdown.
  function hasSingleExactNameMatch(query) {
    const name = normalizeSearch(query);
    return Boolean(name) && database.filter(test =>
      test.status === 'active' && normalizeSearch(test.testName) === name).length === 1;
  }

  function renderSuggestions(kind) {
    const input = kind === 'library' ? els.libraryFilter : els.searchInput;
    const panel = kind === 'library' ? els.librarySuggestions : els.batchSuggestions;
    const query = kind === 'library' ? input.value.trim() : activeBatchLine().query;
    if (!query) { closeSuggestions(kind); return; }
    const matches = suggestionMatches(query, kind);
    const state = suggestionState[kind];
    state.items = matches.map(item => item.test);
    state.active = -1;
    if (!matches.length || hasSingleExactCodeMatch(query, matches) ||
      (kind === 'batch' && hasSingleExactNameMatch(query))) {
      closeSuggestions(kind);
      return;
    }
    const label = kind === 'library' ? 'Matching Labcorp tests' : 'Matching tests for this line';
    panel.innerHTML = '<div class="calc-suggestion-heading">' + label + '</div>' +
      matches.map(({test}, index) => {
        const code = displayCode(test);
        const meta = [test.specimenType, test.transportTemperature].filter(Boolean).join(' · ');
        return '<button type="button" class="calc-suggestion-option" role="option" id="' +
          kind + '-suggestion-' + index + '" aria-selected="false" data-index="' + index +
          '" tabindex="-1"><span class="calc-suggestion-code">' + escapeHtml(code) +
          '</span><span class="calc-suggestion-copy"><strong>' + escapeHtml(test.testName) +
          '</strong><small>' + escapeHtml(meta) +
          '</small></span><span class="calc-suggestion-arrow" aria-hidden="true">›</span></button>';
      }).join('') +
      '<div class="calc-suggestion-footer">' +
      (kind === 'batch' ? 'Click to fill this test and start the next line · Enter also starts a new line' :
        '↑ ↓ to navigate · Enter to choose · Esc to close') + '</div>';
    panel.classList.remove('hidden');
    input.setAttribute('aria-expanded', 'true');
    input.removeAttribute('aria-activedescendant');
  }

  function setActiveSuggestion(kind, index) {
    const state = suggestionState[kind];
    const panel = kind === 'library' ? els.librarySuggestions : els.batchSuggestions;
    const input = kind === 'library' ? els.libraryFilter : els.searchInput;
    if (!state.items.length) return;
    state.active = (index + state.items.length) % state.items.length;
    panel.querySelectorAll('.calc-suggestion-option').forEach((option, i) => {
      option.classList.toggle('is-active', i === state.active);
      option.setAttribute('aria-selected', String(i === state.active));
    });
    const current = panel.querySelectorAll('.calc-suggestion-option')[state.active];
    input.setAttribute('aria-activedescendant', current.id);
    current.scrollIntoView({ block: 'nearest' });
  }

  function chooseSuggestion(kind, index) {
    const test = suggestionState[kind].items[index];
    if (!test) return;
    const value = String(test.testCode || '').trim() || test.testName;
    if (kind === 'library') {
      els.libraryFilter.value = value;
      libraryLimit = PAGE_STEP;
      renderLibrary();
      els.libraryFilter.focus();
    } else {
      const { start, end } = activeBatchLine();
      const following = els.searchInput.value.slice(end);
      // Leave the caret on an empty next line, without duplicating an
      // existing blank line or overwriting tests entered below.
      const nextLineIsBlank = following.startsWith('\n') &&
        (following.length === 1 || following[1] === '\n');
      els.searchInput.setRangeText(nextLineIsBlank ? value : value + '\n', start, end, 'end');
      els.searchInput.focus();
      if (nextLineIsBlank) {
        const nextLineStart = start + value.length + 1;
        els.searchInput.setSelectionRange(nextLineStart, nextLineStart);
      }
      refreshBatchHints();
    }
    closeSuggestions(kind);
  }

  function handleSuggestionKeydown(kind, event) {
    const state = suggestionState[kind];
    const panel = kind === 'library' ? els.librarySuggestions : els.batchSuggestions;
    if (event.isComposing || event.keyCode === 229) return false;
    if (kind === 'library' && event.key === 'Enter' && !event.metaKey && !event.ctrlKey) {
      event.preventDefault();
      if (!panel.classList.contains('hidden') && state.items.length && state.active !== -1) {
        chooseSuggestion(kind, state.active);
      } else {
        closeSuggestions(kind);
      }
      return true;
    }
    if (panel.classList.contains('hidden') || !state.items.length) return false;
    if (kind === 'batch' && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) return false;
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveSuggestion(kind, state.active === -1
        ? (event.key === 'ArrowDown' ? 0 : state.items.length - 1)
        : state.active + (event.key === 'ArrowDown' ? 1 : -1));
      return true;
    }
    if (event.key === 'Enter' && kind === 'batch' && !event.metaKey && !event.ctrlKey) {
      closeSuggestions('batch');
      return false; // Let textarea insert its native newline.
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      closeSuggestions(kind);
      return true;
    }
    if (event.key === 'Tab') closeSuggestions(kind);
    return false;
  }

  function renderLibrary() {
    hideTatPreview();
    hideContainerFlowTip();
    const filter = normalizeSearch(els.libraryFilter.value);
    const filtered = database
      .filter(test => test.status !== 'blocked' && matchesLibraryFilters(test))
      .map(test => ({ test, score: filter ? rankLibraryTest(filter, test) : 1 }))
      .filter(item => item.score > 0);
    if (filter) {
      filtered.sort((a, b) => b.score - a.score || a.test.testName.localeCompare(b.test.testName));
    } else {
      // Prioritize routine urgent-care/PCP tests on first load; keep all other
      // tests, including specific IgE assays, available through search.
      const commonOrder = [
        '322000','005009','028142','377036','008847','003772',
        '322758','001453','303756','004259','224576','140285',
        '183194','180045','180021','083935','082345','012005',
        '144050','006510','182879','008169','008342','006189',
        '004416','004556','001321','004598','081950','000810',
        '180764','183480','008144','008623','008649','188056',
        '183992','115188','006627','004226',
        '001404','001396','001057','001024','001958','006502',
        '164855','002014','004309','004515','004317','004465',
        '004020','004051','140103','144980','070085',
        '001065','001172','001339','001040','001073',
        '001016','001198','001032','001370',
        '330015','006530','006718','006734','006726',
        '164947','164065','164226','240610','096206',
        '096552','006197','096560','003129','706961',
        '164099','164897','164098','121265','121022',
        '141503','160101','161950','161836','010272','096230','096255',
        '322755','322777','001099','001222','001214','001107','001637',
        '001180','001206','001578','480772','015610',
        '235010','221010','010405','004110','140150'
      ];
      const priority = new Map(commonOrder.map((code, index) => [code, index]));
      filtered.sort((a, b) =>
        (priority.get(a.test.testCode) ?? 9999) -
        (priority.get(b.test.testCode) ?? 9999)
      );
    }

    const shown = filtered.slice(0, libraryLimit).map(item => item.test);
    const query = els.libraryFilter.value.trim();
    els.libraryBody.innerHTML = shown.length ? shown.map(renderLibraryRow).join('') : `<tr><td colspan="6" class="empty-state">No tests match these filters.${query ? `<div class="missing-search-action"><button class="mini-button" type="button" data-action="new-from-query" data-query="${escapeAttr(query)}">+ Add missing test</button></div>` : ''}</td></tr>`;
    els.libraryStatus.textContent = `Showing ${shown.length} of ${filtered.length}`;
    const allLibraryTestsShown = shown.length >= filtered.length;
    els.loadMoreButton.classList.toggle('hidden', allLibraryTestsShown);
    els.loadMoreInlineButton?.classList.toggle('hidden', allLibraryTestsShown);
    const applied = libraryFilterCount();
    els.catalogFilterButtonText.textContent = applied ? `Filters (${applied})` : 'Filters';
    els.catalogFilterButton.classList.toggle('has-filters', Boolean(applied));
    updateBrowserClearButton();
  }

  function blockedReason(test) {
    const raw = String(test.specialInstructions || '').trim();
    if (!raw) return 'Confirm the required supplies and processing with the receiving laboratory before collection.';
    const cleaned = raw
      .replace(/^Review collection onsite\.\s*/i, '')
      .split(/\s+(?:Patient preparation|Collection details|Unacceptable specimens):/i)[0]
      .trim();
    return cleaned || 'Confirm the required supplies and processing with the receiving laboratory before collection.';
  }

  function renderBlockedList() {
    if (!els.blockedListButton || !els.blockedListPanel || !els.blockedListBody) return;
    const blocked = database.filter(test => test.status === 'blocked');
    els.blockedListButton.textContent = blockedListOpen ? `Hide Do Not Perform (${blocked.length})` : `Do Not Perform (${blocked.length})`;
    els.blockedListButton.setAttribute('aria-expanded', String(blockedListOpen));
    els.blockedListPanel.classList.toggle('hidden', !blockedListOpen);
    if (!blockedListOpen) return;
    els.blockedListBody.innerHTML = blocked.length ? blocked.map(test => `
      <article class="blocked-list-item">
        <div class="blocked-list-code">${escapeHtml(displayCode(test))}</div>
        <div class="blocked-list-copy"><strong>${escapeHtml(test.testName)}</strong><p>${escapeHtml(blockedReason(test))}</p></div>
        <a class="blocked-list-link" href="${escapeAttr(directoryUrl(test))}" target="_blank" rel="noreferrer">Official directory ↗</a>
      </article>`).join('') : '<div class="empty-state">No tests currently require additional collection review.</div>';
  }


  function hasTatDetails(test) {
    return test?.status === 'active';
  }

  function hasRoutineTat(test) {
    return Object.values(window.LabDirectoryTat || {}).some(region => region?.[displayCode(test)]?.[0]);
  }

  function tatBadge(test, printing = false) {
    if (!hasTatDetails(test)) return '';
    if (printing) {
      const tat = regionalDirectoryTat(test, $('tatRegionFilter')?.value || 'directory');
      const stat = test.isStat || statSelectedIds.includes(test.id);
      if (!stat && !tat?.[0]) return '';
      const label = stat ? 'STAT TAT not verified' : 'Routine TAT: ' + tat[0] + ' (' + tat[2] + ', estimate)';
      return '<div style="margin-top:3px">' + escapeHtml(label) + '</div>';
    }
    if (!hasRoutineTat(test)) return '';
    return '<button type="button" class="mini-button library-tat-clock" data-action="view-tat" data-id="' + escapeAttr(test.id) + '" aria-haspopup="dialog" aria-label="View TAT &amp; Test Setup"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg></button>';
  }


  let tatPreview = null;
  let tatPreviewButton = null;
  function hideTatPreview() {
    tatPreviewButton?.removeAttribute('aria-describedby');
    tatPreview?.remove();
    tatPreview = null;
    tatPreviewButton = null;
  }
  function showTatPreview(button) {
    if (!button || tatPreviewButton === button || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    hideTatPreview();
    const test = database.find(item => item.id === button.dataset.id);
    if (!hasRoutineTat(test)) return;
    const regionSelect = $('tatRegionFilter');
    const region = regionSelect?.value || 'directory';
    const regionLabel = regionSelect?.selectedOptions[0]?.textContent || 'Published directory';
    const tat = regionalDirectoryTat(test, region);
    const tip = document.createElement('div');
    tip.id = 'tat-hover-preview';
    tip.className = 'no-print';
    tip.setAttribute('role', 'tooltip');
    Object.assign(tip.style, {position:'fixed',zIndex:'10000',width:'min(320px, calc(100vw - 24px))',padding:'14px',border:'1px solid #d6e0e8',borderRadius:'12px',background:'#fff',color:'#172b40',boxShadow:'0 8px 28px rgba(20,40,60,.16)',fontSize:'12px',lineHeight:'1.5',pointerEvents:'none',boxSizing:'border-box'});
    const row = (label, value) => '<div style="display:flex;justify-content:space-between;align-items:baseline;gap:12px;padding:6px 0;border-top:1px solid #e7edf1"><span style="color:#526579">' + escapeHtml(label) + '</span><strong style="text-align:right">' + escapeHtml(value) + '</strong></div>';
    tip.innerHTML = '<div style="font-weight:800;color:var(--brand-dark,#00666e);font-size:11px;letter-spacing:.04em">TAT &amp; TEST SETUP</div><div style="font-size:14px;font-weight:750;margin:5px 0 8px">' + escapeHtml(displayCode(test) + ' · ' + test.testName) + '</div>' +
      row('Region', regionLabel) + row('Routine TAT', tat?.[0] || 'Not verified') + row('Test setup', tat?.[3] || 'Not verified') +
      (test.isStat || statSelectedIds.includes(test.id) ? row('STAT TAT','Not verified') : '') +
      '<div style="font-size:11px;color:#526579;margin-top:8px">' + escapeHtml(tat ? (region === 'directory' ? 'General Labcorp directory estimate. TAT starts at specimen pickup.' : 'General Labcorp directory estimate, not verified for ' + regionLabel + '. TAT starts at specimen pickup.') : 'No published TAT estimate available.') + ' Estimates may vary with schedules and reflex testing.</div>';
    document.body.appendChild(tip);
    const rect = button.getBoundingClientRect();
    const gap = 10;
    const left = Math.max(gap, Math.min(rect.left, window.innerWidth - tip.offsetWidth - gap));
    const above = rect.bottom + gap + tip.offsetHeight > window.innerHeight && rect.top >= tip.offsetHeight + gap;
    const top = Math.max(gap, Math.min(above ? rect.top - tip.offsetHeight - gap : rect.bottom + gap, window.innerHeight - tip.offsetHeight - gap));
    tip.style.left = left + 'px';
    tip.style.top = top + 'px';
    tatPreview = tip;
    tatPreviewButton = button;
    button.setAttribute('aria-describedby', tip.id);
  }


  function regionalDirectoryTat(test, region) {
    if (!hasTatDetails(test) || isManuallyAddedTest(test)) return null;
    const code = displayCode(test);
    const regional = window.LabDirectoryTat?.[region]?.[code];
    if (regional?.[0]) return regional;
    // Labcorp's published general estimate is still useful when a region
    // lacks verified local TAT. The UI explicitly labels this fallback.
    return window.LabDirectoryTat?.directory?.[code] || regional || null;
  }

  function restoreTatRegion() {
    const select = $('tatRegionFilter');
    if (!select) return;
    try {
      const saved = localStorage.getItem(TAT_REGION_KEY);
      if (Array.from(select.options).some(option => option.value === saved)) select.value = saved;
    } catch (_) { /* Keep the default if storage is unavailable. */ }
    window.syncPortalSelects?.();
  }

  function regionalPanelTat(test, region) {
    const tat = regionalDirectoryTat(test, region);
    return test.isStat || !tat?.[0] ? null : tat;
  }

  function showTatDetails(test) {
    if (!test) return;
    const cartFilter = $('tatRegionFilter');
    if (!cartFilter || document.getElementById('tatSetupDialog')) return;
    const dialog = document.createElement('dialog');
    dialog.id = 'tatSetupDialog';
    dialog.className = 'portal-action-dialog has-subject no-print';
    dialog.setAttribute('aria-labelledby','tatSetupTitle');
    dialog.innerHTML = '<div class="portal-action-content"><header class="portal-action-header"><span class="portal-action-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg></span><div class="portal-action-heading"><span class="portal-action-kicker">LAB DIRECTORY</span><h2 id="tatSetupTitle">TAT &amp; Test Setup</h2></div></header><div class="portal-action-subject">' + escapeHtml(displayCode(test) + ' · ' + test.testName) + '</div><div class="portal-action-message" style="white-space:normal"><div style="display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;margin:6px 0 14px"><label for="tatPopupRegion" style="font-weight:750">Region</label><select id="tatPopupRegion" style="width:auto;max-width:100%;min-width:140px;padding:7px 10px;border:1px solid #d9dfe8;border-radius:8px;background:#fff;color:var(--brand-dark,#00666e);font:inherit;font-weight:700"></select></div><div id="tatPopupResults" aria-live="polite"></div></div><footer class="portal-action-buttons"><button type="button" class="portal-action-proceed">Close</button></footer></div>';
    const select = dialog.querySelector('#tatPopupRegion');
    Array.from(cartFilter.options).forEach(item => select.add(new Option(item.text, item.value)));
    select.value = cartFilter.value;
    const results = dialog.querySelector('#tatPopupResults');
    function refresh() {
      const region = select.value;
      const regionLabel = select.selectedOptions[0]?.textContent || 'Published directory';
      const tat = regionalDirectoryTat(test, region);
      const row = (label,value) => '<div style="display:flex;justify-content:space-between;align-items:baseline;gap:12px;padding:9px 0;border-top:1px solid #e7edf1"><span>' + escapeHtml(label) + '</span><strong style="text-align:right;color:#30224f">' + escapeHtml(value) + '</strong></div>';
      results.innerHTML = row('Routine TAT',tat?.[0] || 'Not verified') +
        row('Test setup',tat?.[3] || 'Not verified') +
        (test.isStat || statSelectedIds.includes(test.id) ? row('STAT TAT','Not verified') : '') +
        '<div style="font-size:12px;margin-top:8px">' + escapeHtml(tat ? (region === 'directory' ? 'General Labcorp directory estimate. TAT starts at specimen pickup.' : 'General Labcorp directory estimate, not verified for ' + regionLabel + '. TAT starts at specimen pickup.') : 'No published TAT estimate available for ' + regionLabel + '.') + ' Schedules and reflex testing may extend turnaround.</div>' +
        '<div style="margin-top:9px"><a class="reference-link" href="' + escapeAttr(tat?.[4] || regionalDirectoryTat(test, 'directory')?.[4] || directoryUrl(test)) + '" target="_blank" rel="noopener noreferrer">Official directory ↗</a></div>';
    }
    select.addEventListener('change', () => {
      cartFilter.value = select.value;
      cartFilter.dispatchEvent(new Event('change', {bubbles:true}));
      refresh();
    });
    dialog.querySelector('button').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
    dialog.addEventListener('close', () => { window.closePortalSelects?.(); dialog.remove(); window.syncPortalSelects?.(); }, {once:true});
    refresh();
    document.body.appendChild(dialog);
    window.enhanceNamedPortalSelect?.(select);
    try { dialog.showModal(); } catch (error) { dialog.remove(); window.syncPortalSelects?.(); }
  }

  function renderTurnaroundTime(tests) {
    const summary = $('turnaroundTimeSummary');
    const body = $('turnaroundTime');
    if (!summary || !body) return;
    if (!tests.length) {
      summary.textContent = 'No tests selected';
      body.className = 'draw-plan empty-state';
      body.textContent = 'Add tests to see estimated turnaround times.';
      return;
    }
    const regionSelect = $('tatRegionFilter');
    const region = regionSelect?.value || 'directory';
    const regionLabel = regionSelect?.selectedOptions[0]?.textContent || 'Published directory';
    const entries = tests.map(test => ({ test, tat: regionalPanelTat(test, region) }));
    const known = entries.filter(entry => entry.tat);
    const unavailable = entries.length - known.length;
    summary.textContent = known.length ? known.length + ' of ' + tests.length + ' estimated' : 'No estimates yet';
    body.className = 'draw-plan';
    const groups = new Map();
    entries.sort((a, b) => (a.tat?.[1] ?? Infinity) - (b.tat?.[1] ?? Infinity));
    entries.forEach(({ test, tat }) => {
      const label = tat?.[0] || 'Unavailable';
      if (!groups.has(label)) groups.set(label, []);
      groups.get(label).push({ test, tat });
    });
    const cards = Array.from(groups, ([label, rows]) => {
      const estimate = rows[0].tat;
      const upperDays = estimate?.[1];
      let accent = 'unavailable';
      if (estimate) {
        if (!Number.isFinite(upperDays)) accent = 'published';
        else if (upperDays <= 3) accent = 'short';
        else if (upperDays <= 5) accent = 'medium';
        else accent = 'long';
      }
      return `
      <section class="tat-group" data-tat-accent="${accent}">
        <div class="tat-group-heading">
          <h3>${escapeHtml(label)}</h3>
          <span>${rows.length} ${rows.length === 1 ? 'test' : 'tests'}</span>
        </div>
        <ul class="tat-test-list">
          ${rows.map(({ test, tat }) => `
            <li class="tat-test-row">
              <span class="tat-test-code">${escapeHtml(displayCode(test))}</span>
              <button type="button" class="tat-test-name" title="View TAT &amp; Test Setup" data-cart-tat-id="${escapeAttr(test.id)}" aria-haspopup="dialog">${escapeHtml(test.testName)}${test.isStat ? ' · STAT' : ''}</button>
              <a class="tat-test-link" title="View on Labcorp Test Directory (opens in a new tab)" href="${escapeAttr(tat?.[4] || regionalDirectoryTat(test, 'directory')?.[4] || directoryUrl(test))}" aria-label="Open official directory for ${escapeAttr(test.testName)} (new tab)" target="_blank" rel="noopener noreferrer"><span aria-hidden="true">↗</span></a>
            </li>`).join('')}
        </ul>
      </section>`;
    }).join('');
    const dayEstimates = known.map(entry => entry.tat[1]).filter(Number.isFinite);
    const max = dayEstimates.length && dayEstimates.length === known.length ? Math.max(...dayEstimates) : null;
    const longest = max === null ? '' : `<div class="tat-estimate">
      <span>Longest listed routine estimate</span>
      <strong>Up to ${max} ${max === 1 ? 'day' : 'days'}</strong>
    </div>`;
    const warning = unavailable ? `<p class="tat-coverage-note">${unavailable} ${unavailable === 1 ? 'test has' : 'tests have'} no applicable estimate. Full order completion cannot be estimated.</p>` : '';
    const regionNote = region === 'directory' ? 'General Labcorp directory estimates start at specimen pickup.' : 'Showing general Labcorp directory estimates for ' + regionLabel + '. Region-specific turnaround times have not been verified. Estimates start at specimen pickup.';
    body.innerHTML = longest + warning +
      '<div class="tat-groups">' + cards + '</div>' +
      '<div class="order-of-draw-note">' + escapeHtml(regionNote) + ' Schedules and reflex testing may extend turnaround. Result dates can vary.</div>';
  }

  function renderLibraryRow(test) {
    const selected = selectedIds.includes(test.id);
    const blocked = test.status === 'blocked';
    const pending = test.status === 'pending';
    const hasMultipleContainers = menuHasMultipleRoutes(test);
    const primaryDisplay = hasMultipleContainers ? { ...test, additionalDrawRequirements: [] } : test;
    const primaryOnlyNote = hasMultipleContainers ? '<div class="library-container-primary-note">First path only</div>' : '';
    return `<tr class="${selected ? 'is-selected' : ''}">
      <td class="code-cell" data-label="Code">${escapeHtml(displayCode(test))}</td>
      <td data-label="Test"><div class="test-name">${escapeHtml(test.testName)}${window.LabRegionalRestrictions.badge(test, 'labcorp')}${manualLibraryTag(test)}${gestationalWarningBadge(test)}${statSelectedIds.includes(test.id) && isStatEligible(test) ? '<span class="library-stat-eligible selected" title="Manually marked STAT; verify receiving-lab acceptance and courier routing.">STAT selected</span>' : ''}</div><div class="subtext">${escapeHtml(truncate(test.specialInstructions, 95))}</div></td>
      <td data-label="Container">${menuContainerBadges(test)}${hasMultipleContainers ? '' : '<div class="subtext specimen-line">' + requiredSpecimenBadges(test) + '</div>'}</td>
      <td data-label="Temperature"><span class="badge ${temperatureClass(test.transportTemperature)}">${escapeHtml(test.transportTemperature)}</span>${primaryOnlyNote}</td>
      <td data-label="Volume"><span class="preferred-volume-chip">${escapeHtml(menuVolumeText(primaryDisplay, 'preferred') || 'Verify')}</span><div class="subtext">Minimum: ${escapeHtml(menuVolumeText(primaryDisplay, 'minimum') || '—')}</div>${primaryOnlyNote}</td>
      <td class="row-actions" data-label="Actions">
        ${blocked ? '<span class="badge temp-unknown">Review collection</span>' : pending ? '<span class="badge temp-unknown">Verification required</span>' : selected
          ? `<button class="mini-button" disabled>✓ Added${statSelectedIds.includes(test.id) ? ' · STAT' : ''}</button>`
          : isStatEligible(test)
            ? `<button type="button" class="mini-button library-routine-action" data-action="add" data-id="${escapeAttr(test.id)}">Add as routine</button><button type="button" class="mini-button library-stat-action" data-action="add-stat" data-id="${escapeAttr(test.id)}" title="Confirm eligibility and add as STAT">Add as STAT</button>`
            : `<button class="mini-button" data-action="add" data-id="${escapeAttr(test.id)}" aria-label="Add ${escapeAttr(test.testName)}">+ Add</button>`}
        <button class="mini-button edit" data-action="edit" data-id="${escapeAttr(test.id)}">Edit</button><div class="library-directory-actions">${tatBadge(test)}<a class="mini-button edit" href="${escapeAttr(directoryUrl(test))}" target="_blank" rel="noreferrer">Official directory ↗</a></div>
      </td>
    </tr>`;
  }

  function handleLibraryClick(event) {
    const more = event.target.closest('button[data-container-more]');
    if (more) {
      if (containerFlowButton === more && containerFlowPinned) hideContainerFlowTip();
      else showContainerFlowTip(more, true);
      return;
    }
    const button = event.target.closest('button[data-action]');
    if (!button) return;
    if (button.dataset.action === 'new-from-query') {
      openMissingTestFromQuery(button.dataset.query);
      return;
    }
    const id = button.dataset.id;
    if (button.dataset.action === 'view-tat') {
      hideTatPreview();
      showTatDetails(database.find(test => test.id === id));
      return;
    }
    if (button.dataset.action === 'add') {
      addSelected(id);
      button.textContent = 'Added';
    } else if (button.dataset.action === 'add-stat') {
      addStatFromMenu(id);
    } else if (button.dataset.action === 'edit') {
      openDialog(database.find(test => test.id === id));
    }
  }

  // Hover/focus tooltip is attached to the document so it cannot be clipped
  // by the scrolling match list. The note is also announced on keyboard focus.
  function hideStatActionTip() {
    statActionTipButton?.removeAttribute('aria-describedby');
    statActionTip?.remove();
    statActionTip = null;
    statActionTipButton = null;
  }

  function showStatActionTip(button) {
    if (!button || statActionTipButton === button || !button.dataset.statNote) return;
    hideStatActionTip();
    const tip = document.createElement('div');
    tip.id = 'stat-action-hover-tip';
    tip.className = 'stat-action-hover-tip';
    tip.setAttribute('role', 'tooltip');
    tip.textContent = button.dataset.statNote;
    document.body.appendChild(tip);
    const rect = button.getBoundingClientRect();
    const gap = 10;
    const width = tip.offsetWidth;
    const height = tip.offsetHeight;
    const left = Math.min(Math.max(rect.left + rect.width / 2 - width / 2, gap),
      Math.max(gap, window.innerWidth - width - gap));
    const above = rect.top >= height + 18;
    const top = above ? rect.top - height - 9
      : Math.min(rect.bottom + 9, Math.max(gap, window.innerHeight - height - gap));
    tip.style.left = `${left}px`;
    tip.style.top = `${top}px`;
    if (!above) tip.classList.add('below');
    button.setAttribute('aria-describedby', tip.id);
    statActionTip = tip;
    statActionTipButton = button;
  }

  function closeBatchResults() {
    hideStatActionTip();
    els.batchResults.classList.add('hidden');
    els.batchResults.innerHTML = '';
    batchReviewRows = [];
    els.previewButton.focus();
  }

  // App-managed menu, rather than a native browser disclosure/select popup.
  function setBatchChoiceOpen(dropdown, open) {
    if (!dropdown) return;
    dropdown.classList.toggle('is-open', open);
    dropdown.closest('.batch-row')?.classList.toggle('batch-choice-open', open);
    dropdown.querySelector('.batch-choice-trigger')?.setAttribute('aria-expanded', String(open));
    const menu = dropdown.querySelector('.batch-choice-menu');
    if (menu) menu.hidden = !open;
    // Closing the test-match list must not dismiss a different open action
    // menu (such as the main Confirm & add button) in the same click.
    if (!open) dropdown.querySelectorAll('.batch-add-toggle[aria-expanded="true"]').forEach(toggle =>
      setBatchAddOptionsOpen(toggle.closest('.batch-choice-entry'), false));
  }

  // Each result has exactly one Add button. The same accessible priority
  // picker is shared by per-match + and the main Confirm & add button.
  function setBatchAddOptionsOpen(control, open) {
    if (!control) return;
    const toggle = control.querySelector('.batch-add-toggle');
    const menu = control.querySelector('.batch-choice-stat-options');
    if (!toggle || !menu || toggle.disabled) return;
    toggle.setAttribute('aria-expanded', String(open));
    menu.hidden = !open;
    control.classList.toggle('batch-add-open', open);
  }
  function closeBatchAddOptions() {
    els.batchResults.querySelectorAll('.batch-add-toggle[aria-expanded="true"]').forEach(toggle =>
      setBatchAddOptionsOpen(toggle.closest('.batch-choice-entry, .batch-main-add-control'), false));
  }

  async function handleBatchClick(event) {
    const trigger = event.target.closest('.batch-choice-trigger');
    if (trigger) {
      const dropdown = trigger.closest('.batch-choice-dropdown');
      const open = !dropdown.classList.contains('is-open');
      els.batchResults.querySelectorAll('.batch-choice-dropdown.is-open').forEach(item => setBatchChoiceOpen(item, false));
      setBatchChoiceOpen(dropdown, open);
      return;
    }
    const button = event.target.closest('button[data-action]');
    if (!button) return;
    if (button.dataset.action === 'close-batch-results') {
      closeBatchResults();
      return;
    }
    if (button.dataset.action === 'add-category-test') {
      const row = batchReviewRows[Number(button.dataset.batchIndex)];
      const test = row?.category?.results.find(test => test.id === button.dataset.id);
      if (!test || test.status !== 'active') return;
      if (selectedIds.includes(test.id)) return;
      // Rebuilding the review refreshes Added badges; preserve the scroll position.
      const scrollTop = button.closest('.batch-category-list')?.scrollTop || 0;
      if (addSelected(test.id)) {
        renderBatch(false);
        const nextList = els.batchResults.querySelector(`.batch-category-row[data-batch-index="${row.index}"] .batch-category-list`);
        if (nextList) {
          nextList.scrollTop = scrollTop;
          const nextButton = Array.from(nextList.querySelectorAll('.batch-category-add'))
            .find(item => item.dataset.id === test.id);
          nextButton?.focus({ preventScroll: true });
        }
      }
      return;
    }
    if (button.dataset.action === 'toggle-batch-add-options') {
      const control = button.closest('.batch-choice-entry, .batch-main-add-control');
      const open = button.getAttribute('aria-expanded') !== 'true';
      closeBatchAddOptions();
      setBatchAddOptionsOpen(control, open);
      return;
    }
    if (button.dataset.action === 'add-batch-option') {
      const row = batchReviewRows[Number(button.dataset.batchIndex)];
      const match = row?.matches.find(item => item.test.id === button.dataset.id);
      const test = match?.test;
      const wantStat = button.dataset.priority === 'stat';
      if (!test || test.status !== 'active' || selectedIds.includes(test.id)) return;
      if (wantStat && !isStatEligible(test)) return;
      // The main action retains its ambiguity check. Choosing an alternate
      // candidate or a fuzzy match from the list also requires confirmation.
      const exactSafe = button.dataset.source === 'main'
        ? canAutoAddBatchRow(row)
        : isExactBatchMatch(row.query, test) && test.id === row.matches[0]?.test.id && canAutoAddBatchRow(row);
      if (!exactSafe && !(await window.PortalDialog.confirm(`Entered: ${row.query}\nSelected: ${displayCode(test)} · ${test.testName}\n\nVerify the test code and specimen requirements before adding.`, { title: 'Confirm test match', confirmLabel: 'Add this test', tone: 'warning' }))) return;
      if (wantStat && !(await confirmStatSelection(test))) return;
      const fromMatchList = button.dataset.source === 'match';
      const previousMenu = fromMatchList ? button.closest('.batch-choice-menu') : null;
      const previousScroll = previousMenu?.scrollTop || 0;
      if (!addSelected(test.id, false)) return;
      if (wantStat && !statSelectedIds.includes(test.id)) {
        statSelectedIds.push(test.id);
        saveStatSelectedIds();
      }
      saveSelected();
      renderOrder();
      renderLibrary();
      row.chosenId = test.id;
      renderBatch(false);
      if (fromMatchList) {
        const dropdown = els.batchResults.querySelector(`.batch-row[data-batch-index="${row.index}"] .batch-choice-dropdown`);
        setBatchChoiceOpen(dropdown, true);
        const menu = dropdown?.querySelector('.batch-choice-menu');
        if (menu) menu.scrollTop = previousScroll;
        const added = Array.from(menu?.querySelectorAll('.batch-choice-quick-add') || [])
          .find(item => item.dataset.id === test.id);
        added?.focus({ preventScroll: true });
      } else {
        els.batchResults.querySelector(`.batch-row[data-batch-index="${row.index}"] .batch-main-add-toggle`)?.focus({ preventScroll: true });
      }
      showToast(`${test.testName} added as ${wantStat ? 'STAT' : 'Routine'}.`);
      return;
    }
    if (button.dataset.action === 'toggle-batch-test-details') {
      const entry = button.closest('.batch-choice-entry');
      const panel = entry?.querySelector('.batch-choice-test-details');
      if (!panel) return;
      const nextOpen = panel.hidden;
      // One details panel per menu, with selection handled separately.
      button.closest('.batch-choice-menu')?.querySelectorAll('.batch-choice-test-details:not([hidden])').forEach(item => {
        item.hidden = true;
        const other = item.closest('.batch-choice-entry')?.querySelector('.batch-choice-details-button');
        if (other) { other.setAttribute('aria-expanded', 'false'); other.textContent = 'Details'; }
      });
      panel.hidden = !nextOpen;
      button.setAttribute('aria-expanded', String(nextOpen));
      button.textContent = nextOpen ? 'Hide details' : 'Details';
      return;
    }
    if (button.dataset.action === 'choose-batch-test') {
      const row = batchReviewRows[Number(button.dataset.batchIndex)];
      const chosenId = button.dataset.id;
      if (!row || !row.matches.some(match => match.test.id === chosenId)) return;
      row.chosenId = chosenId;
      row.outcome = batchRowOutcome(row);
      const card = button.closest('.batch-row');
      if (card) {
        card.outerHTML = renderBatchRow(row);
        const next = els.batchResults.querySelector(`.batch-row[data-batch-index="${row.index}"] .batch-choice-trigger`);
        next?.focus();
      }
      return;
    }
    if (button.dataset.action === 'new-from-query') {
      openMissingTestFromQuery(button.dataset.query);
    }
  }

  function handleSelectedClick(event) {
    const button = event.target.closest('button[data-action]');
    if (!button) return;
    if (button.dataset.action === 'remove') removeSelected(button.dataset.id);
    if (button.dataset.action === 'edit') openDialog(database.find(test => test.id === button.dataset.id));
    if (button.dataset.action === 'toggle-stat') toggleStatPriority(button.dataset.id);
  }

  function handleTestsOverviewClick(event) {
    const button = event.target.closest('button[data-action]');
    if (!button) return;
    if (button.dataset.action === 'remove') removeSelected(button.dataset.id);
    if (button.dataset.action === 'toggle-stat') toggleStatPriority(button.dataset.id);
  }

  function toggleTestsDetails() {
    const showingDetails = els.testsDetailsPanel.classList.contains('hidden');
    els.testsOverviewList.classList.toggle('hidden', showingDetails);
    els.testsDetailsPanel.classList.toggle('hidden', !showingDetails);
    els.testsDetailsPanel.setAttribute('aria-hidden', showingDetails ? 'false' : 'true');
    els.testsDetailsButton.setAttribute('aria-expanded', showingDetails ? 'true' : 'false');
    els.testsDetailsButton.querySelector('.tests-details-label').textContent = showingDetails ? 'Hide details' : 'Show details';
    // The heading stays outside the scrollable cart list in both modes.
    const cartViewport = document.getElementById('cartTestsViewport');
    if (cartViewport) cartViewport.scrollTop = 0;
  }

  function loadStatArea() {
    try {
      const value = localStorage.getItem(STAT_AREA_KEY);
      return value && STAT_AREAS[value] ? value : 'unselected';
    } catch (_) { return 'unselected'; }
  }

  function isStatEligible(test) {
    // Only an explicitly verified per-region LabCorp code may be marked STAT.
    // Selecting a region alone is NOT eligibility. An empty list disables STAT.
    const area = STAT_AREAS[statArea];
    return Boolean(test && test.status === 'active' && area &&
      statArea !== 'unselected' &&
      area.codes.some(code => String(code) === String(test.testCode || '').trim()));
  }

  function reconcileStatWithArea() {
    const eligibleIds = statSelectedIds.filter(id => {
      const test = database.find(item => item.id === id);
      return test && isStatEligible(test);
    });
    const removed = statSelectedIds.length - eligibleIds.length;
    if (removed) {
      statSelectedIds = eligibleIds;
      saveStatSelectedIds();
      statAreaResetNotice = `${removed} previously marked STAT test${removed === 1 ? '' : 's'} reset to Routine because the receiving area changed. Reconfirm STAT eligibility for the new location.`;
    }
    return removed;
  }

  // In-page STAT receiving lab list. Keep the native select as the single
  // data source for option values and preserve the existing change workflow.
  function initializeStatAreaPicker() {
    const { statAreaSelect: select, statSelectWrap: wrap, statAreaButton: trigger, statAreaOptions: panel } = els;
    if (!select || !wrap || !trigger || !panel) return;
    const fragment = document.createDocumentFragment();
    for (const child of select.children) {
      if (child.tagName === 'OPTGROUP') {
        const heading = document.createElement('div');
        heading.className = 'stat-area-optgroup';
        heading.textContent = child.label;
        heading.setAttribute('role', 'presentation');
        fragment.appendChild(heading);
        const group = document.createElement('div');
        group.className = 'stat-area-group-options';
        group.setAttribute('role', 'group');
        group.setAttribute('aria-label', child.label);
        for (const opt of child.children) addOption(opt, true, group);
        fragment.appendChild(group);
      } else if (child.tagName === 'OPTION') addOption(child);
    }
    function addOption(opt, isNested = false, parent = fragment) {
      const info = STAT_AREAS[opt.value];
      const count = info ? new Set(info.codes).size : 0;
      const isPlaceholder = opt.value === 'unselected';
      const row = document.createElement('button');
      row.type = 'button';
      row.className = 'stat-area-option'
        + (isNested ? ' stat-area-option-nested' : '')
        + (isPlaceholder ? ' stat-area-option-placeholder' : '')
        + (opt.value === 'socal' && count ? ' stat-area-option-common' : '')
        + (!count && !isPlaceholder ? ' is-empty' : '');
      row.setAttribute('role', 'option');
      row.dataset.statArea = opt.value;
      const name = document.createElement('span');
      name.className = 'stat-area-option-label';
      name.textContent = opt.textContent;
      if (opt.value === 'socal' && count) {
        const sharedTag = document.createElement('span');
        sharedTag.className = 'stat-area-common-tag';
        sharedTag.textContent = 'Shared';
        sharedTag.setAttribute('aria-hidden', 'true');
        name.appendChild(sharedTag);
      }
      row.appendChild(name);
      if (!isPlaceholder) {
        const badge = document.createElement('span');
        badge.className = 'stat-area-count';
        badge.textContent = count ? `${count} ${count === 1 ? 'test' : 'tests'}` : 'No menu';
        badge.setAttribute('aria-hidden', 'true');
        row.setAttribute('aria-label', `${opt.textContent}, ${count} listed STAT ${count === 1 ? 'test' : 'tests'}`);
        row.appendChild(badge);
      }
      parent.appendChild(row);
    }
    panel.replaceChildren(fragment);
    trigger.addEventListener('click', () => setStatPickerOpen(panel.classList.contains('hidden')));
    panel.addEventListener('click', event => {
      const option = event.target.closest('.stat-area-option');
      if (!option || !panel.contains(option)) return;
      select.value = option.dataset.statArea;
      changeStatArea(select.value);
      syncStatAreaPicker();
      setStatPickerOpen(false);
      trigger.focus();
    });
    trigger.addEventListener('keydown', event => {
      if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
      event.preventDefault();
      setStatPickerOpen(true);
      const opts = [...panel.querySelectorAll('.stat-area-option')];
      const active = opts.findIndex(el => el.dataset.statArea === select.value);
      opts[(active + (event.key === 'ArrowDown' ? 1 : opts.length - 1)) % opts.length]?.focus();
    });
    panel.addEventListener('keydown', event => {
      if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp' && event.key !== 'Home' && event.key !== 'End') return;
      event.preventDefault();
      const options = [...panel.querySelectorAll('.stat-area-option')];
      const index = options.indexOf(document.activeElement);
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? options.length - 1 : (index + (event.key === 'ArrowDown' ? 1 : options.length - 1)) % options.length;
      options[next]?.focus();
    });
    document.addEventListener('click', event => {
      if (!wrap.contains(event.target)) setStatPickerOpen(false);
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && !panel.classList.contains('hidden')) {
        setStatPickerOpen(false);
        trigger.focus();
        event.stopPropagation();
      }
    });
    syncStatAreaPicker();
  }

  function setStatPickerOpen(open) {
    if (!els.statAreaOptions || !els.statAreaButton) return;
    els.statAreaOptions.classList.toggle('hidden', !open);
    els.statAreaButton.setAttribute('aria-expanded', String(open));
    if (open) toggleCatalogFilters(false);
  }

  function syncStatAreaPicker() {
    if (!els.statAreaSelect || !els.statAreaButtonLabel) return;
    els.statAreaButtonLabel.textContent = els.statAreaSelect.selectedOptions[0]?.textContent || 'Select receiving lab';
    const count = new Set(STAT_AREAS[els.statAreaSelect.value]?.codes || []).size;
    const countBadge = document.getElementById('statAreaButtonCount');
    if (countBadge) {
      countBadge.textContent = `${count} ${count === 1 ? 'test' : 'tests'}`;
      countBadge.hidden = !count;
    }
    els.statAreaButton.setAttribute('aria-label', `STAT receiving lab: ${els.statAreaButtonLabel.textContent}, ${count} listed STAT ${count === 1 ? 'test' : 'tests'}`);
    els.statAreaButton.classList.toggle('stat-area-picker-common', els.statAreaSelect.value === 'socal' && count > 0);
    // Once a lab is chosen, repurpose the original "Select receiving lab"
    // entry into a real clear action. This takes the existing changeStatArea
    // path so saved STAT priorities and match eligibility are reconciled.
    const resetOption = els.statAreaOptions?.querySelector('.stat-area-option-placeholder');
    if (resetOption) {
      const hasSelection = els.statAreaSelect.value !== 'unselected';
      const label = resetOption.querySelector('.stat-area-option-label');
      if (label) label.textContent = hasSelection ? 'Clear selected lab' : 'Select receiving lab';
      resetOption.classList.toggle('is-clear-action', hasSelection);
      resetOption.setAttribute('aria-label', hasSelection ? 'Clear selected STAT receiving lab' : 'Select receiving lab');
    }
    els.statAreaOptions?.querySelectorAll('.stat-area-option').forEach(option => {
      const selected = option.dataset.statArea === els.statAreaSelect.value;
      option.setAttribute('aria-selected', String(selected));
      option.classList.toggle('selected', selected);
    });
  }

  function changeStatArea(value) {
    if (!STAT_AREAS[value] || value === statArea) return;
    statAreaResetNotice = '';
    statArea = value;
    if (els.statAreaSelect) els.statAreaSelect.value = value;
    syncStatAreaPicker();
    try { localStorage.setItem(STAT_AREA_KEY, value); } catch (_) {}
    const removed = reconcileStatWithArea();
    renderOrder();
    renderLibrary();
    refreshBatchStatEligibility();
    if (removed) showToast(statAreaResetNotice);
  }

  // Refresh the already-reviewed matches after a STAT lab change, without
  // repeating the search or losing an explicitly chosen alternate test.
  function refreshBatchStatEligibility() {
    hideStatActionTip();
    if (!batchReviewRows.length || !els.batchResults || els.batchResults.classList.contains('hidden')) return;
    const grid = els.batchResults.querySelector('.batch-grid');
    if (!grid) return;
    const openMenus = [...grid.querySelectorAll('.batch-choice-dropdown.is-open')].map(dropdown => ({
      index: dropdown.closest('.batch-row')?.dataset.batchIndex,
      scrollTop: dropdown.querySelector('.batch-choice-menu')?.scrollTop || 0
    }));
    grid.innerHTML = batchReviewRows.map(renderBatchRow).join('');
    // Previously opened Routine/STAT action menus close because the available
    // priorities may have changed. Keep test-choice lists open for continuity.
    openMenus.forEach(({index, scrollTop}) => {
      const dropdown = [...grid.querySelectorAll('.batch-row')].find(row => row.dataset.batchIndex === index)?.querySelector('.batch-choice-dropdown');
      if (!dropdown) return;
      setBatchChoiceOpen(dropdown, true);
      const menu = dropdown.querySelector('.batch-choice-menu');
      if (menu) menu.scrollTop = scrollTop;
    });
  }

  function renderStatArea() {
    if (els.statAreaSelect) els.statAreaSelect.value = statArea;
    syncStatAreaPicker();
    renderStatMenu();
  }

  function renderStatMenu() {
    if (!els.statMenuPanel) return;
    const info = STAT_AREAS[statArea];
    const codes = [...new Set(info.codes)].sort((a,b) => Number(a) - Number(b));
    const keyword = normalizeSearch(els.statMenuSearch?.value || '');
    const matches = codes.map(code => {
      const test = database.find(row => String(row.testCode || '') === String(code));
      return { code, test, name: info.names?.[code] || test?.testName || '' };
    }).filter(({code,name}) => !keyword || normalizeSearch(`${code} ${name}`).includes(keyword));
    els.statMenuPanel.classList.toggle('hidden', !statMenuOpen);
    els.statMenuButton?.setAttribute('aria-expanded', String(statMenuOpen));
    els.statMenuButton.textContent = `${statMenuOpen ? 'Hide' : 'Show'} STAT routing info`;
    if (!statMenuOpen) return;
    els.statMenuTitle.textContent = info.label;
    els.statMenuCount.textContent = `${codes.length} listed code${codes.length === 1 ? '' : 's'}`;
    els.statAreaHelp.textContent = `${info.note} Confirm current receiving-lab acceptance, cutoff, requisition, and courier before sending STAT. ${statAreaResetNotice}`.trim();
    els.statMenuResults.innerHTML = !codes.length
      ? '<p class="stat-menu-empty">No verified LabCorp STAT codes are configured for this receiving area. STAT actions are disabled until an approved local menu is added. Confirm with the receiving lab before requesting STAT testing.</p>'
      : matches.length
        ? matches.map(({code,test}) => {
          const available = test && test.status === 'active';
          const added = available && selectedIds.includes(test.id);
          const button = available
            ? added
              ? `<button type="button" class="stat-menu-add is-added" data-action="stat-menu-remove" data-id="${escapeAttr(test.id)}" aria-label="Remove ${escapeAttr(info.names?.[code] || test.testName)} from cart" title="Remove from cart">✓</button>`
              : `<button type="button" class="stat-menu-add" data-action="stat-menu-add" data-id="${escapeAttr(test.id)}" aria-label="Add ${escapeAttr(info.names?.[code] || test.testName)} as STAT" title="Add as STAT (confirmation required)">+</button>`
            : `<button type="button" class="stat-menu-add needs-setup" data-action="stat-menu-setup" data-code="${escapeAttr(code)}" aria-label="Set up missing test ${escapeAttr(code)}" title="Open Add missing test to enter verified collection requirements">+</button>`;
          return `<div class="stat-menu-test"><strong>${escapeHtml(code)}</strong><span>${escapeHtml(info.names?.[code] || test?.testName || 'Needs verified specimen details')}</span>${test?.status === 'blocked' ? '<small>Collection requirements need verification</small>' : test?.status === 'pending' ? '<small>Collection instructions require verification</small>' : ''}${button}</div>`;
        }).join('')
        : '<p class="stat-menu-empty">No codes or tests match this search.</p>';
  }

  function handleStatMenuClick(event) {
    const button = event.target.closest('button[data-action]');
    if (!button || !els.statMenuResults.contains(button)) return;
    if (button.dataset.action === 'stat-menu-add') {
      // New STAT selections continue to require user confirmation.
      addStatFromMenu(button.dataset.id);
    } else if (button.dataset.action === 'stat-menu-remove') {
      // The selected check is an active toggle: removing it clears the cart
      // selection and the corresponding STAT flag, just like the cart X.
      if (selectedIds.includes(button.dataset.id)) removeSelected(button.dataset.id);
    } else if (button.dataset.action === 'stat-menu-setup') {
      // Do not fabricate processing instructions for an unknown menu code.
      // Staff can complete the existing required-fields dialog after checking
      // the receiving lab's official directory entry.
      openDialog({ testCode: button.dataset.code }, { addToSummary: false });
      els.testCode.focus();
    }
  }

  function loadStatSelectedIds() {
    const saved = loadJson(STAT_SELECTED_KEY, []);
    return Array.isArray(saved)
      ? Array.from(new Set(saved.map(id => CONSOLIDATED_TEST_IDS[id] || id).filter(id => selectedIds.includes(id))))
      : [];
  }

  function saveStatSelectedIds() {
    try { localStorage.setItem(STAT_SELECTED_KEY, JSON.stringify(statSelectedIds)); }
    catch (error) { console.warn('Could not save STAT selections.', error); }
  }

  function undoPriorSedRateDefault() {
    // v11.12/v11.13 automatically marked ESR 809 STAT. On this one-time
    // upgrade, reset it to Routine so it behaves like all other eligible tests.
    // Subsequent manual selection is respected across reloads.
    try {
      if (localStorage.getItem(UNDO_SED_RATE_DEFAULT_KEY) === '1') return;
      const removedIds = new Set(database.filter(test => String(test.testCode) === '809').map(test => test.id));
      statSelectedIds = statSelectedIds.filter(id => !removedIds.has(id));
      saveStatSelectedIds();
      localStorage.setItem(UNDO_SED_RATE_DEFAULT_KEY, '1');
    } catch (error) { console.warn('Could not reset prior sed-rate STAT default.', error); }
  }

  function applyDefaultStatMigration() {
    // Legacy migration kept for compatibility. No test now defaults to STAT.
    try {
      if (localStorage.getItem(DEFAULT_STAT_MIGRATION_KEY) === '1') return;
      const ids = selectedIds.filter(id => {
        const test = database.find(entry => entry.id === id);
        return test && DEFAULT_STAT_TEST_CODES.has(test.testCode) && isStatEligible(test);
      });
      ids.forEach(id => {
        if (!statSelectedIds.includes(id)) statSelectedIds.push(id);
      });
      saveStatSelectedIds();
      localStorage.setItem(DEFAULT_STAT_MIGRATION_KEY, '1');
    } catch (error) { console.warn('Could not migrate default STAT priorities.', error); }
  }

  function confirmStatSelection(test) {
    return window.PortalDialog.confirm(`Receiving lab: ${STAT_AREAS[statArea].label}\n\nMarking this test STAT will separate it from routine specimens in the collection summary. Confirm STAT availability with the receiving lab before collection.`, { title: 'Mark test as STAT?', confirmLabel: 'Mark STAT', tone: 'warning', subject: `${displayCode(test)} · ${test.testName}` });
  }

  async function toggleStatPriority(id) {
    if (!selectedIds.includes(id)) return;
    const test = database.find(item => item.id === id);
    if (!isStatEligible(test)) return;
    if (!statSelectedIds.includes(id) && !(await confirmStatSelection(test))) return;
    statSelectedIds = statSelectedIds.includes(id)
      ? statSelectedIds.filter(item => item !== id)
      : [...statSelectedIds, id];
    saveStatSelectedIds();
    renderOrder();
    renderLibrary();
  }

  async function addStatFromMenu(id) {
    const test = database.find(item => item.id === id);
    if (!isStatEligible(test)) return;
    if (selectedIds.includes(id)) return;
    // Never add a test or change its routing until the user confirms it.
    if (!(await confirmStatSelection(test))) return;
    if (!addSelected(id, false)) return;
    statSelectedIds.push(id);
    saveSelected();
    saveStatSelectedIds();
    renderOrder();
    renderLibrary();
    showToast(`${test.testName} added and marked STAT.`);
  }

  function addSelected(id, rerender = true) {
    const test = database.find(item => item.id === id);
    if (!test || test.status !== 'active') return false;
    if (selectedIds.includes(id)) return false;
    selectedIds.push(id);
    if (DEFAULT_STAT_TEST_CODES.has(String(test.testCode)) && isStatEligible(test)) {
      if (!statSelectedIds.includes(id)) statSelectedIds.push(id);
      saveStatSelectedIds();
    }
    if (rerender) {
      saveSelected();
      renderOrder();
      renderLibrary();
      showToast(`${test.testName} added.`);
    }
    return true;
  }

  function removeSelected(id) {
    selectedIds = selectedIds.filter(item => item !== id);
    statSelectedIds = statSelectedIds.filter(item => item !== id);
    saveStatSelectedIds();
    saveSelected();
    renderOrder();
    renderLibrary();
  }

  // Prevent rapid taps from stacking duplicate Clear All confirmations.
  let clearOrderPending = false;
  async function clearOrder() {
    if (!selectedIds.length || clearOrderPending) return;
    clearOrderPending = true;
    try {
      const count = selectedIds.length;
      const confirmed = await window.PortalDialog.confirm(
        `Remove ${count} selected ${count === 1 ? 'test' : 'tests'} from the cart?`,
        { title: 'Clear collection summary?', confirmLabel: 'Clear all', cancelLabel: 'Keep tests', tone: 'danger' }
      );
      if (!confirmed) return;
      selectedIds = [];
      statSelectedIds = [];
      saveStatSelectedIds();
      saveSelected();
      renderOrder();
      renderLibrary();
      showToast('Cart cleared.');
    } finally {
      clearOrderPending = false;
    }
  }

  function saveSelected() {
    localStorage.setItem(SELECTED_KEY, JSON.stringify(selectedIds));
  }

  function loadSstTubeMode() {
    try {
      return localStorage.getItem(SST_MODE_KEY) === 'tiger' ? 'tiger' : 'gold';
    } catch (error) {
      return 'gold';
    }
  }

  function selectedSstIsTiger() {
    return sstTubeMode === 'tiger';
  }

  function selectedSstLabel() {
    return selectedSstIsTiger() ? 'Tiger SST · 7.5 mL' : 'Gold / SST';
  }

  function selectedSstTransportLabel() {
    return selectedSstIsTiger() ? 'Tiger SST' : 'Gold / SST';
  }

  function selectedSstVisualClass() {
    return selectedSstIsTiger() ? 'tube-tiger-sst' : 'tube-sst';
  }

  function selectedSstEstimateForBag(bag) {
    return selectedSstIsTiger() ? bag.tigerSstEstimate : bag.sstEstimate;
  }

  function selectedSstEstimateForTests(tests) {
    return selectedSstIsTiger() ? tigerSstEstimateForTests(tests) : sstEstimateForTests(tests);
  }

  function setSstTubeMode(mode) {
    const next = mode === 'tiger' ? 'tiger' : 'gold';
    if (next === sstTubeMode) return;
    sstTubeMode = next;
    try { localStorage.setItem(SST_MODE_KEY, sstTubeMode); } catch (error) {}
    renderOrder();
    // The test library is outside the collection summary, so redraw its tube
    // badges when the SST choice changes. The badge renderer already uses the
    // selected label and matching Gold or Tiger color/icon.
    renderLibrary();
    // Keep an open batch-match review visually in sync without resetting any
    // match/confirmation state the user is currently reviewing.
    els.batchResults.querySelectorAll('.tube-sst, .tube-tiger-sst').forEach(badge => {
      badge.classList.remove('tube-sst', 'tube-tiger-sst');
      badge.classList.add(selectedSstVisualClass());
      badge.textContent = selectedSstLabel();
    });
  }

  function renderSstTubeMode() {
    els.sstModeOptions.forEach(button => {
      const selected = button.dataset.sstMode === sstTubeMode;
      button.classList.toggle('is-selected', selected);
      button.setAttribute('aria-pressed', selected ? 'true' : 'false');
    });
  }

  function isCultureTransportEligible(test) {
    if (!test || !isUrineTest(test)) return false;
    const name = String(test.testName || '').toLowerCase();
    const hasCultureInName = /(?:culture.*urine|urine.*culture|urinalysis.*reflex to culture)/.test(name);
    const hasCultureTransport = /gray[- ]top.*urine.*(?:culture|transport)|uri[- ]?sponge/i.test(String(test.transportContainer || ''));
    // Other urine chemistry tests can use a gray-top tube; only routine bacterial
    // urine culture and urinalysis/reflex culture are eligible for this toggle.
    return hasCultureInName && hasCultureTransport;
  }

  function selectedUrineCultureIsSponge() { return urineCultureMode === 'urisponge'; }

  function loadUrineCultureMode() {
    // LabCorp starter directory confirms gray-top preserved urine, not UriSponge.
    return 'gray';
  }

  function setUrineCultureMode(mode) {
    if (urineCultureMode !== 'gray') {
      urineCultureMode = 'gray';
      renderOrder();
    }
  }

  function renderUrineCultureMode() {
    // Always show the transport choice so a market can choose before adding tests.
    els.urineCultureModeOptions.forEach(button => {
      const selected = button.dataset.urineCultureMode === urineCultureMode;
      button.classList.toggle('is-selected', selected);
      button.setAttribute('aria-pressed', selected ? 'true' : 'false');
    });
  }

  function withSelectedCultureTransport(test) {
    if (!selectedUrineCultureIsSponge() || !isCultureTransportEligible(test)) return test;
    const reflex = String(test.testCode || '') === '3020'
      || /urinalysis.*reflex to culture/i.test(test.testName || '');
    const instructions = 'Collect clean-catch midstream urine in a sterile cup. Dip the UriSponge applicator into the urine sample, fully submerging for 5 seconds. Return saturated sponge to UriSponge tube and secure tightly. Do not pour urine into the UriSponge tube. Transport preserved urine at room temperature or refrigerated. Confirm acceptance with the receiving lab.';
    if (reflex) {
      return {
        ...test,
        transportContainer: 'Red/Yellow Swirl UA Preservative Tube + UriSponge Urine Culture Transport',
        preferredVolume: '10 mL urine for UA tube + completely saturated UriSponge for culture',
        minimumVolume: 'Fill UA tube to marked minimum + fully saturated UriSponge for culture',
        specialInstructions: `Two submissions required: fill the urinalysis preservative tube to its required line, and provide a separate UriSponge for culture. ${instructions}`
      };
    }
    return {
      ...test,
      transportContainer: 'UriSponge Urine Culture Transport',
      preferredVolume: 'Completely saturated UriSponge transport',
      minimumVolume: 'Completely saturated UriSponge transport',
      specialInstructions: instructions
    };
  }

  function selectedTests() {
    return selectedIds.map(id => database.find(test => test.id === id)).filter(test => test?.status === 'active')
      .map(test => ({ ...withSelectedCultureTransport(test), isStat: isStatEligible(test) && statSelectedIds.includes(test.id) }));
  }

  function renderOrder() {
    renderSstTubeMode();
    renderStatArea();
    const tests = selectedTests();
    renderUrineCultureMode();
    const collectionTests = expandedCollectionTests(tests);
    els.selectedCount.textContent = tests.length;
    $('mobileCount').textContent = `${tests.length} ${tests.length === 1 ? 'test' : 'tests'}`;
    els.printButton.disabled = !tests.length;
    els.exportSummaryButton.disabled = !tests.length;
    renderTestsOverview(tests);
    renderDrawPlan(collectionTests);
    renderOrderOfDraw(collectionTests);
    renderTurnaroundTime(tests);
    renderAlerts(tests);
    if (!tests.length) {
      els.selectedList.className = 'selected-list empty-state';
      els.selectedList.textContent = 'No tests selected.';
      return;
    }
    els.selectedList.className = 'selected-list';
    els.selectedList.innerHTML = tests.map(test => `
      <article class="selected-card${test.isStat ? ' is-stat' : ''}">
        <div class="selected-card-top">
          <div><div class="test-name">${escapeHtml(displayCode(test))} · ${escapeHtml(test.testName)}${manualLibraryTag(test)}</div><div class="subtext specimen-line">${requiredSpecimenBadges(test)} <span>·</span> <span class="preferred-volume-inline">${escapeHtml(combinedVolumeText(test, 'preferred') || 'verify')}</span> <span>· Minimum ${escapeHtml(combinedVolumeText(test, 'minimum') || 'verify')}</span></div>${fastingBadge(test, 'selected-fasting-badge')}${gestationalWarningBadge(test, 'selected-gestational-warning')}</div>
          <div>${isStatEligible(test) ? `<button class="mini-button stat-toggle${test.isStat ? ' is-stat' : ''}" type="button" data-action="toggle-stat" data-id="${escapeAttr(test.id)}" aria-pressed="${test.isStat ? 'true' : 'false'}" title="Mark as STAT or Routine">${test.isStat ? 'STAT ✓' : 'Mark STAT'}</button>` : ''}<a class="mini-button edit" href="${escapeAttr(directoryUrl(test))}" target="_blank" rel="noreferrer">Official directory ↗</a><button class="mini-button edit" data-action="edit" data-id="${escapeAttr(test.id)}">Edit</button><button class="mini-button remove selected-card-delete" data-action="remove" data-id="${escapeAttr(test.id)}" type="button" aria-label="Delete ${escapeAttr(test.testName)}">Delete</button></div>
        </div>
        <div class="selected-details">
          ${requiredDrawContainerBadges(test)}
          <span class="badge ${temperatureClass(test.transportTemperature)}">${escapeHtml(test.transportTemperature)}</span>
          <span class="badge temp-unknown">Spin: ${escapeHtml(test.spin)}</span>
        </div>
        ${additionalRequirementSummary(test)}
        ${test.specialInstructions ? `<div class="selected-note">${escapeHtml(truncate(test.specialInstructions, 190))}</div>` : ''}
      </article>`).join('');
  }

  function renderTestsOverview(tests) {
    els.testsOverviewSummary.textContent = `${tests.length} ${tests.length === 1 ? 'test' : 'tests'}`;
    els.testsDetailsButton.disabled = !tests.length;
    els.clearOrderButton.disabled = !tests.length;
    if (!tests.length) {
      els.testsOverviewList.classList.remove('hidden');
      els.testsDetailsPanel.classList.add('hidden');
      els.testsDetailsPanel.setAttribute('aria-hidden', 'true');
      els.testsDetailsButton.setAttribute('aria-expanded', 'false');
      els.testsDetailsButton.querySelector('.tests-details-label').textContent = 'Show details';
      els.testsOverviewList.className = 'tests-overview-list empty-state';
      els.testsOverviewList.innerHTML = '<div class="empty-symbol" aria-hidden="true">＋</div><strong>No tests selected</strong><p>Select Add next to a test, or enter names or codes in the box and select Add best matches.</p>';
      return;
    }
    els.testsOverviewList.className = 'tests-overview-list';
    // Preserve Details mode when a cart entry is added, removed, or updated.
    els.testsOverviewList.classList.toggle('hidden', !els.testsDetailsPanel.classList.contains('hidden'));
    els.testsOverviewList.innerHTML = tests.map(test => `
      <div class="tests-overview-row${test.isStat ? ' is-stat' : ''}${!isStatEligible(test) ? ' no-stat-action' : ''}">
        <div class="tests-overview-ident">
          <strong class="tests-overview-code">${escapeHtml(displayCode(test))}</strong>
          <span class="tests-overview-name">${escapeHtml(test.testName)}</span>${window.LabRegionalRestrictions.badge(test, 'labcorp')}
        </div>
        ${isStatEligible(test) ? `<button class="mini-button stat-toggle${test.isStat ? ' is-stat' : ''}" type="button" data-action="toggle-stat" data-id="${escapeAttr(test.id)}" aria-pressed="${test.isStat ? 'true' : 'false'}" title="Mark as STAT or Routine">${test.isStat ? 'STAT ✓' : 'Mark STAT'}</button>` : ''}
        <button class="mini-button remove remove-flex tests-overview-remove" type="button" data-action="remove" data-id="${escapeAttr(test.id)}" aria-label="Remove ${escapeAttr(test.testName)}"><span class="remove-icon" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false"><path d="M7.3 6.1 12 10.8l4.7-4.7 1.2 1.2-4.7 4.7 4.7 4.7-1.2 1.2-4.7-4.7-4.7 4.7-1.2-1.2 4.7-4.7-4.7-4.7 1.2-1.2Z"/></svg></span><span class="remove-text" aria-hidden="true">Delete</span></button>
      </div>`).join('');
  }

  function buildDrawGroups(tests) {
    const groups = new Map();
    tests.forEach(test => {
      const source = canonicalCollectionContainer(test);
      const urineCup = source.className === 'tube-urine-cup' && isUrineTest(test);
      const dedicated = urineCup && requiresSeparateUrineCollection(test);
      const shareable = urineCup && isShareableUrineCupTest(test);
      const key = urineCup
        ? `Urine|${urineCollectionType(test).key}|${shareable ? 'shared' : `separate|${test.sourceTestId || test.id}|${test.isStat ? 'stat' : 'routine'}`}`
        : `${test.isStat ? 'STAT' : 'Routine'}|${test.drawContainer || 'Verify Official Instructions'}`;
      if (!groups.has(key)) groups.set(key, { container: urineCup ? source.label : test.drawContainer || 'Verify Official Instructions', isStat: Boolean(test.isStat), urineCup, tests: [], specimenTypes: new Set(), minimumMl: 0, volumeCount: 0, hasStat: false, hasRoutine: false });
      const group = groups.get(key);
      group.tests.push(test);
      group.hasStat ||= Boolean(test.isStat);
      group.hasRoutine ||= !test.isStat;
      group.isStat = group.hasStat && !group.hasRoutine;
      group.sharedStatRoutine = urineCup && group.hasStat && group.hasRoutine;
      group.specimenTypes.add(test.specimenType);
      const ml = parseSimpleMl(test.minimumVolume);
      if (ml !== null) { group.minimumMl += ml; group.volumeCount += 1; }
    });
    const orderIndex = new Map(ORDER_OF_DRAW.map((step, index) => [step.key, index]));
    return Array.from(groups.values()).sort((a, b) => {
      const aCategory = orderCategory(a.tests[0]);
      const bCategory = orderCategory(b.tests[0]);
      const aOrder = aCategory !== null && orderIndex.has(aCategory) ? orderIndex.get(aCategory) : Number.MAX_SAFE_INTEGER;
      const bOrder = bCategory !== null && orderIndex.has(bCategory) ? orderIndex.get(bCategory) : Number.MAX_SAFE_INTEGER;
      if (aOrder !== bOrder) return aOrder - bOrder;
      return a.container.localeCompare(b.container);
    });
  }

  function drawGroupContainerCount(group) {
    const groupBags = buildTransportBagPlan(group.tests);
    return buildCollectionPlan(group.tests, groupBags)
      .reduce((sum, item) => sum + (Number(item.count) || 0), 0);
  }

  function renderDrawPlan(tests) {
    if (!tests.length) {
      els.drawPlanSummary.textContent = 'No collection types';
      els.drawPlan.className = 'draw-plan empty-state';
      els.drawPlan.textContent = 'Add tests to see the draw plan.';
      return;
    }
    const groups = buildDrawGroups(tests);
    els.drawPlanSummary.textContent = `${groups.length} collection ${groups.length === 1 ? 'type' : 'types'}`;
    els.drawPlan.className = 'draw-plan';
    els.drawPlan.innerHTML = groups.map(group => {
      const volume = group.volumeCount ? ` · listed minimum total ${formatMl(group.minimumMl)}` : '';
      const containerCount = drawGroupContainerCount(group);
      const testLabel = `${group.tests.length} ${group.tests.length === 1 ? 'test' : 'tests'}`;
      const containerLabel = `${containerCount} ${containerCount === 1 ? 'container' : 'containers'}`;
      const groupClass = tubeClass(group.container) === 'tube-sst' ? selectedSstVisualClass() : tubeClass(group.container);
      const groupLabel = tubeClass(group.container) === 'tube-sst' ? selectedSstLabel() : group.container;
      return `<div class="draw-card${group.isStat ? ' is-stat' : ''}"><div class="draw-title-block"><strong class="tube ${groupClass}">${escapeHtml(groupLabel)}</strong>${group.sharedStatRoutine ? '<span class="priority-marker">Shared STAT + routine urine cup; transport separately</span>' : group.isStat ? `<span class="priority-marker">${group.urineCup ? 'STAT' : 'STAT · separate source tubes'}</span>` : ''}<span class="draw-test-count">${escapeHtml(testLabel)}</span></div><strong class="draw-container-badge">${escapeHtml(containerLabel)}</strong><div class="draw-meta specimen-line">${Array.from(group.specimenTypes).map(type => specimenBadge(type)).join(' ')}${volume ? `<span>${escapeHtml(volume)}</span>` : ''}</div></div>`;
    }).join('');
  }

  function orderCategory(test) {
    // Microtainers are flagged in What to collect, not represented as an extra
    // tile or as a misleading ordinary Gold/Tiger tube in order of draw.
    if (/microtainer/i.test(String(test.drawContainer || ''))) return null;
    // The order-of-draw panel reflects the preferred/selected collection tube only.
    // Alternative containers are shown with the test but do not add extra tubes to
    // the nurse draw plan.
    const specimen = String(test.specimenType || '').toLowerCase();
    if (/urine|stool|swab|saliva|semen|csf|cerebrospinal|tissue/.test(specimen)) return null;

    const value = String(test.drawContainer || '').toLowerCase();
    if (/blood culture|culture bottle|bactec|\bsps\b/.test(value)) return 'culture';
    if (/light blue|sodium citrate|coagulation tube/.test(value)) return 'citrate';
    if (/acid citrate dextrose|\bacd\b/.test(value)) return 'acd';

    // Keep all royal-blue trace-metal tubes together in one dedicated step.
    // The stripe/additive still appears on each test and tube badge.
    if (/royal blue|royal-blue/.test(value)) return 'royal';

    if (/gray|grey|fluoride|oxalate/.test(value)) return 'gray';
    if (/sst|gold|serum separator|red\s*\/\s*black/.test(value)) return 'sst';
    if (/green|heparin|\bpst\b/.test(value)) return 'heparin';
    if (/lavender|purple|pink|\bedta\b|tan top/.test(value)) return 'edta';
    if (/red top|plain red|no gel|serum tube|^red$/.test(value.trim())) return 'serum';
    return null;
  }

  function orderTubeMarkup(step, printMode = false) {
    const prefix = printMode ? 'print-order-tube' : 'order-tube';
    const stepLabel = step.key === 'sst' ? selectedSstLabel() : step.label;
    const stepClass = step.key === 'sst' ? selectedSstVisualClass() : step.tubeClass;
    const primary = `<span class="${prefix} tube ${stepClass}">${escapeHtml(stepLabel)}</span>`;
    const secondary = step.secondaryLabel
      ? `<span class="${prefix} tube ${step.secondaryTubeClass}">${escapeHtml(step.secondaryLabel)}</span>`
      : '';
    return `<span class="order-tube-group">${primary}${secondary}</span>`;
  }

  function renderOrderOfDraw(tests) {
    const selectedCategories = new Set(tests.map(orderCategory).filter(Boolean));
    els.orderOfDrawSummary.textContent = selectedCategories.size
      ? `${selectedCategories.size} blood tube ${selectedCategories.size === 1 ? 'type' : 'types'} used`
      : 'No blood tubes';
    els.orderOfDraw.innerHTML = ORDER_OF_DRAW.map(step => {
      const selected = selectedCategories.has(step.key);
      return `<div class="order-step ${selected ? 'is-selected' : ''}">
        <span class="order-number">${step.number}</span>
        ${orderTubeMarkup(step)}
        <span class="order-additive">${escapeHtml(step.additive)}</span>
        ${selected ? '<span class="order-selected">IN DRAW PLAN</span>' : ''}
      </div>`;
    }).join('');
  }

  function printOrderOfDraw(tests) {
    const selectedCategories = new Set(tests.map(orderCategory).filter(Boolean));
    return `<section class="print-order-section">
      <div class="print-section-heading"><strong>Nurse order of draw</strong><span>Standard sequence for multiple blood tubes</span></div>
      <div class="print-order-strip">${ORDER_OF_DRAW.map(step => `<div class="print-order-step ${selectedCategories.has(step.key) ? 'is-selected' : ''}"><div class="print-order-top"><span class="print-order-number">${step.number}</span>${orderTubeMarkup(step, true)}</div><span class="print-order-additive">${escapeHtml(step.additive)}</span></div>`).join('')}</div>
      <div class="print-order-note"><strong>Butterfly:</strong> If light blue is first, use a partially filled citrate discard tube to fill tubing dead space, then fill the test tube completely. Confirm additives on tube labels; do not rely on stopper color alone. Follow test-specific official instructions and facility policy.</div>
    </section>`;
  }

  // Only flag actionable pre-collection requirements supported by a test's
  // recorded directions or a reviewed test-code-specific Quest instruction.
  // Do not apply hormone time windows to all similarly named assays.
  function gestationalWarningBadge(test, className = '') {
    const warning = window.gestationalTestWarning?.(test);
    if (!warning) return '';
    return `<span class="gestational-warning-tag ${className}" title="${escapeAttr(warning.note)}">⚠ ${escapeHtml(warning.label)}</span>`;
  }

  function preCollectionPrecautions(test) {
    const code = ''; // Do not apply Quest-only test-code preparation rules to LabCorp codes.
    const notes = String(test.specialInstructions || '');
    const result = [];
    const add = (label, note) => result.push({ label, note });
    const gestational = window.gestationalTestWarning?.(test);
    if (gestational) add(gestational.label, gestational.note);

    if (code === '4212') {
      add('AM draw · 7–9 AM', 'Collect between 7 and 9 AM. Write the collection time on the tube and requisition.');
    } else if (code === '4213') {
      add('PM draw · 3–5 PM', 'Collect between 3 and 5 PM. Write the collection time on the tube and requisition.');
    } else if (code === '6921') {
      add('Timed AM draw', 'Draw between 7 and 9 AM after the prescriber-directed overnight dexamethasone protocol. Confirm medication timing with the ordering clinician; record date and time.');
    }
    if (code === '873' || code === '30741') {
      add('Morning testosterone', 'For adult male screening, collection at 8–10 AM is recommended; confirmation generally uses a second morning on a different day. Confirm with the ordering clinician.');
    }

    if (/avoid seafood.{0,55}48 hours|avoid seafood consumption for 48 hours/i.test(notes)) {
      add('No seafood · 48h', 'Avoid fish and seafood for 48 hours before collection, as specified by the receiving lab.');
    } else if (/avoid fish and seafood the day before/i.test(notes)) {
      add('No fish / seafood', 'Avoid fish and seafood the day before collection.');
    }
    if (/patient should avoid food high in indoles/i.test(notes)) {
      add('Diet · 3 days', 'Avoid indole-rich foods listed in the test instructions and avoid tobacco, tea, and coffee for 3 days before collection.');
    }
    if (['10190', '36399'].includes(code) &&
        /avoidance of vitamin supplements for 24 hours prior to collection is preferred/i.test(
          [notes, test.fastingInstructions || ''].join(' '))) {
      add('Vitamin supplements · 24h preferred',
        'For this vitamin B2 test, avoiding vitamin supplements for 24 hours before collection is preferred (not required). Confirm any prescribed supplement changes with the ordering clinician.');
    }

    if (/\bcollect in the morning from a fasting patient\b|\bsamples should be taken in the morning from patients in a fasting state\b/i.test(notes)) {
      add('Morning draw', 'Collect in the morning and follow the separately listed fasting instruction.');
    } else if (/\b(?:an )?early[- ]morning specimen is preferred\b/i.test(notes)) {
      add('AM preferred', 'Early morning collection is preferred; record collection time when requested.');
    } else if (/fast for at least 12 hours and collect in the morning/i.test(notes)) {
      add('AM draw · 8–10', 'Draw in the morning, preferably 8–10 AM; the separate fasting warning applies.');
    }

    if (/\bbiotin\b/i.test(notes) && /supplement|vitamin|consumption/i.test(notes) || code === '873' || code === '7065') {
      if (/at least 8 hours.{0,140}last biotin|at least 8 hours following.{0,140}biotin/i.test(notes) || code === '873' || code === '7065') {
        add('Biotin interference', 'Biotin may interfere with this assay. Consult the LabCorp test-specific instructions and ordering clinician about supplement timing.');
      } else if (/72 hours prior|at least 72 hours prior/i.test(notes)) {
        add('Biotin · 72h', 'Lab directions call for avoiding biotin for at least 72 hours before the draw. Confirm changes to any prescribed supplements or therapy with the clinician.');
      } else if (/24-48 hours|24–48 hours/i.test(notes)) {
        add('Biotin · 24–48h', 'Check the 24–48-hour biotin supplement restriction in this test’s collection directions.');
      } else if (/48 hours (?:before|prior)|48 hours prior|no biotin supplements.*48/i.test(notes)) {
        add('Biotin · 48h', 'Lab directions specify no biotin supplements for 48 hours before collection; confirm with the clinician.');
      } else {
        add('Biotin interference', 'Biotin supplements may interfere with results. Check this test’s specific supplement and draw-timing instructions.');
      }
    }

    if (/collect(?:ion)? (?:as )?(?:a )?trough|steady-state trough|trough concentration|just prior to next dose|just before next dose|trough specimen/i.test(notes)) {
      if (/\bpeak\b|post.dose|after (?:the )?last dose/i.test(notes) && /\bpeak\b/.test(notes)) {
        add('Drug-level timing', 'This assay includes peak/trough timing requirements. Confirm the ordered draw interval and document dosing and collection times.');
      } else if (/steady-state trough|>12 hours after dose|12 hours after last dose/i.test(notes)) {
        add('Timed drug level', 'Collect at the prescribed steady-state trough interval. Check the exact time since the last dose and document it.');
      } else {
        add('Trough sample', 'Collect at the ordered trough time, usually just before the next dose. Confirm and document dose and collection times.');
      }
    } else if (/collect (?:24, 48, or 72 hours after dose|sample \d+ hours after last dose)|draw sample \d+ hours after last dose/i.test(notes)) {
      add('Timed drug level', 'The sample has a specific post-dose collection interval. Check the lab directions and document the dose and draw times.');
    }

    if (/after (?:the )?patient has been upright.{0,100}seated|after patient has been upright|upright for at least 2 hours|mid.morning.{0,100}seated/i.test(notes)) {
      add('Position / rest', 'Follow the test-specific upright and seated-rest periods before collecting; confirm any medication-related restrictions with the clinician.');
    } else if (/patient needs to sit 5-15 minutes prior/i.test(notes)) {
      add('Seated rest', 'Have the patient sit for 5–15 minutes before collection, as specified in the lab instructions.');
    } else if (/patients should be relaxed in either a supine or upright position/i.test(notes)) {
      add('Rest / posture', 'Patient should be relaxed before collection. Follow positioning and dietary restrictions in the full test instructions.');
    }

    if (/clearly mark time drawn on all tubes|mark time drawn on all tubes/i.test(notes)) {
      add('Timed specimens', 'Keep specimens from different collection times separate and label the collection time on each tube.');
    } else if (code === '11281') {
      add('Record draw time', 'Specify the time of day the specimen was collected.');
    }

    return result;
  }

  function preCollectionPrecautionsForTests(tests) {
    return tests.flatMap(test => preCollectionPrecautions(test).map(requirement => ({ test, requirement })));
  }

  function isVariableLipidFasting(test) {
    const note = String(test.fastingInstructions || '');
    return /If a cholesterol measurement is to be performed along with triglycerides/i.test(note)
      && /If the cholesterol is ordered as part of a lipid panel, then a fasting sample is not required/i.test(note);
  }

  function printFastingRequirement(test, requirement) {
    if (!requirement) return null;
    if (!isVariableLipidFasting(test)) return requirement;
    return {
      ...requirement,
      label: 'Check fasting',
      note: 'Lipid panel: fasting may not be needed. Cholesterol + triglycerides ordered separately: fast 9–12 hours. Therapeutic NAC may falsely lower cholesterol/uric acid; confirm with the ordering clinician.'
    };
  }

  function printFastingBadge(test, className = '') {
    const requirement = printFastingRequirement(test, fastingRequirement(test));
    if (!requirement) return '';
    return `<span class="fasting-badge fasting-${requirement.level} ${className}">${escapeHtml(requirement.label)}</span>`;
  }

  function printSpecialInstructions(test) {
    let note = String(test.specialInstructions || '').trim();
    if (!note) return '—';
  
    // Summarize only matching known boilerplate. All raw catalog records remain unchanged.
    if (isVariableLipidFasting(test)) {
      const longPrep = `Patient preparation: ${String(test.fastingInstructions || '').trim()}`;
      if (note.includes(longPrep)) {
        note = note.replace(longPrep,
          'Fasting: see above. Therapeutic NAC may falsely lower cholesterol/uric acid.');
      }
      if (String(test.testCode) === '94220' &&
          note.includes('Collection details: The assay manufacturer Beckman Coulter advises:')) {
        note = note.replace(/Collection details: The assay manufacturer Beckman Coulter advises:[\s\S]*?(?=Unacceptable specimens:)/i, '');
      }
    }
  
    const routineSst = 'Allow blood to clot upright for 30–60 minutes, then centrifuge. Submit the spun SST/gold-top tube; do not transfer unless the current official test page or local service-area instructions specifically require it.';
    const routineAllergen = 'Allow SST to clot and centrifuge; submit the spun SST. Confirm LabCorp serum-allergen volume, stability and destination-specific handling before collection.';
    if (note === routineSst) return 'Clot 30–60 min, centrifuge and submit spun SST. No transfer unless directed.';
    if (note === routineAllergen) return 'Clot and centrifuge SST; submit original spun tube. If referred, verify volume and stability.';
  
    note = note.replace(
      /Dietary supplements containing biotin may interfere in assays and may skew analyte results to be either falsely high or falsely low\. For patients receiving the \w+ daily doses of biotin, draw samples at least 8 hours following the last biotin supplementation\. For patients on mega-doses of biotin supplements, draw samples at least 72 hours following the last biotin supplementation\./gi,
      'Biotin may interfere: draw ≥8 h after standard supplements or ≥72 h after mega-doses; confirm with clinician.'
    );
  
    if (String(test.testCode) === '34838') {
      const original = `Patient preparation: ${String(test.fastingInstructions || '').trim()}`;
      if (note.includes(original)) {
        note = note.replace(original,
          'Initial H. pylori stool test: no fasting or medication hold required. PPIs/antibiotics may cause false negatives; provider may repeat after a directed 2-week hold. Check eradication ≥4 weeks after treatment. Positive at 7 days may indicate failure. Pediatric specimens accepted.');
      }
    }
  
    const fastingNote = String(test.fastingInstructions || '').trim();
    if (fastingNote && fastingNote.length < 130 &&
        note.startsWith('Patient preparation: ' + fastingNote + ' ') &&
        /^(?:required|preferred)$/i.test(String(test.fastingStatus || ''))) {
      note = note.slice(('Patient preparation: ' + fastingNote + ' ').length);
    }
    return note.replace(/\s{2,}/g, ' ').trim() || 'See fasting/collection precautions above.';
  }

  function fastingRequirement(test) {
    // Gestational 50 g screening is nonfasting. Its dedicated warning already states
    // the required 1-hour post-load collection, so do not show a false fasting badge.
    if (window.gestationalTestWarning?.(test)?.label === 'Gestational · 50 g screen') return null;
    const explicitLevel = String(test.fastingStatus || '').toLowerCase();
    if (explicitLevel === 'required' || explicitLevel === 'preferred') {
      return {
        level: explicitLevel,
        label: explicitLevel === 'required' ? 'Fasting required' : 'Fasting preferred',
        note: String(test.fastingInstructions || '').trim() || (explicitLevel === 'required' ? 'Fasting is required.' : 'Fasting is preferred.')
      };
    }

    const instructions = String(test.specialInstructions || '').trim();
    const combined = `${test.testName || ''} ${instructions}`.toLowerCase();
    if (!/\bfasting\b|\bnon-fasting\b|\bovernight fast\b|\bfast for\b|\bfast overnight\b|\bfasting state\b/.test(combined)) return null;

    let level = 'verify';
    if (/fasting (?:is )?(?:required|mandatory)|requires? (?:a )?fasting specimen|must (?:be )?fast|patient should fast|patients? in (?:a )?fasting state|non-fasting[^.]{0,80}(?:unacceptable|rejected)|overnight fast[^.]{0,50}(?:required|mandatory)|fast for \d+/.test(combined)) {
      level = 'required';
    } else if (/fasting (?:is )?(?:preferred|recommended)|(?:preferred|recommended)[^.]{0,40}fasting|overnight fasting (?:is )?(?:preferred|recommended)|fasting is recommended but not required/.test(combined)) {
      level = 'preferred';
    }

    const sentences = instructions.split(/(?:\.\s+|;\s+)/).map(value => value.trim()).filter(Boolean);
    const sentence = sentences.find(value => /\bfasting\b|\bnon-fasting\b|\bovernight fast\b|\bfast for\b|\bfast overnight\b|\bfasting state\b/i.test(value));
    const label = level === 'required' ? 'Fasting required' : level === 'preferred' ? 'Fasting preferred' : 'Fasting instructions — verify';
    return {
      level,
      label,
      note: sentence || 'Fasting instructions are noted in the collection requirements.'
    };
  }

  function fastingBadge(test, className = '') {
    const requirement = fastingRequirement(test);
    if (!requirement) return '';
    return `<span class="fasting-badge fasting-${requirement.level} ${className}">${escapeHtml(requirement.label)}</span>`;
  }

  function fastingRequirementsForTests(tests) {
    return tests.map(test => ({ test, requirement: fastingRequirement(test) })).filter(item => item.requirement);
  }

  function collectAlerts(tests) {
    const alerts = [];
    tests.forEach(test => {
      const note = String(test.specialInstructions || '').toLowerCase();
      preCollectionPrecautions(test).forEach(req => {
        alerts.push({ type: 'warning', text: `${displayCode(test)} ${test.testName}: ${req.note}` });
      });
      if (test.status === 'blocked') alerts.push({ type: 'danger', text: `${test.testName}: requires collection verification.` });
      const sstYieldWarning = singleSstSpecimenVolumeWarning(test);
      if (sstYieldWarning) alerts.push({ type: singleSstSpecimenVolumeLevel(test) === 'minimum' ? 'danger' : 'warning', text: `${test.testName}: ${sstYieldWarning}` });
      if (/own tube|dedicated tube|needs own tube|two separate|full tube|required on label|draw waste|discard tube/.test(note)) alerts.push({ type: 'warning', text: `${test.testName}: dedicated tube, fill, labeling, or discard instructions may apply.` });
      if (/immediately|freeze immediately|centrifuge immediately|stat/.test(note)) alerts.push({ type: 'warning', text: `${test.testName}: time-sensitive processing noted.` });
      if (/protect from light|amber|wrap.*foil/.test(note)) alerts.push({ type: 'warning', text: `${test.testName}: protect from light.` });
      if (/cannot be done on housecall|do not refrigerate|unacceptable|reject|not found in the current directory|verify the active test code/.test(note)) alerts.push({ type: 'danger', text: `${test.testName}: collection or rejection restriction noted.` });
    });
    const seen = new Set();
    return alerts.filter(alert => {
      if (seen.has(alert.text)) return false;
      seen.add(alert.text);
      return true;
    }).slice(0, 10);
  }

  function renderAlerts(tests) {
    const alerts = collectAlerts(tests);
    if (!alerts.length) {
      els.collectionAlerts.innerHTML = '';
      return;
    }

    const dangerCount = alerts.filter(alert => alert.type === 'danger').length;
    const warningCount = alerts.length - dangerCount;
    const countLabel = `${alerts.length} ${alerts.length === 1 ? 'notice' : 'notices'}`;
    const severityLabel = [
      dangerCount ? `${dangerCount} restriction${dangerCount === 1 ? '' : 's'}` : '',
      warningCount ? `${warningCount} warning${warningCount === 1 ? '' : 's'}` : ''
    ].filter(Boolean).join(' · ');

    els.collectionAlerts.innerHTML = `<details class="collection-alerts-disclosure">
      <summary class="collection-alerts-summary">
        <span class="collection-alerts-summary-main">
          <span class="collection-alerts-icon" aria-hidden="true">!</span>
          <span><strong>Warnings & special handling</strong><small>${escapeHtml(severityLabel)}</small></span>
        </span>
        <span class="collection-alerts-summary-count">${escapeHtml(countLabel)}</span>
        <span class="collection-alerts-chevron" aria-hidden="true"></span>
      </summary>
      <div class="collection-alerts-list">${alerts.map(alert => `<div class="alert ${alert.type === 'danger' ? 'danger' : ''}">${escapeHtml(alert.text)}</div>`).join('')}</div>
    </details>`;
  }

  function missingTestPrefillQuery() {
    const libraryQuery = els.libraryFilter.value.trim();
    if (libraryQuery && !database.some(test => isExactBatchMatch(libraryQuery, test))) {
      return libraryQuery;
    }
    const batchQueries = parseQueries(els.searchInput.value);
    if (batchQueries.length === 1 && !database.some(test => isExactBatchMatch(batchQueries[0], test))) {
      return batchQueries[0];
    }
    return '';
  }

  function openMissingTestFromQuery(query) {
    const text = String(query || '').trim();
    const prefill = /^\d+$/.test(text) ? { testCode: text } : { testName: text };
    openDialog(prefill, { addToSummary: true });
  }

  function openMissingTestDialog() {
    openMissingTestFromQuery(missingTestPrefillQuery());
  }


  // An additional collection is a separate required specimen/transport route,
  // not an alternate choice for the primary container.
  function additionalContainerField(card, name) {
    return card.querySelector('[data-field="' + name + '"]');
  }

  function additionalContainerValue(card, name) {
    return String(additionalContainerField(card, name)?.value || '').trim();
  }

  function toggleAdditionalCustomContainer(card, name) {
    const select = additionalContainerField(card, name);
    const custom = additionalContainerField(card, name === 'drawContainer' ? 'customDrawContainer' : 'customTransportContainer');
    const row = card.querySelector('[data-other-row="' + name + '"]');
    const enabled = select.value === '__other__';
    row.classList.toggle('hidden', !enabled);
    custom.disabled = !enabled;
    custom.required = enabled;
    if (!enabled) custom.value = '';
  }

  function setAdditionalContainerChoice(card, name, value) {
    const select = additionalContainerField(card, name);
    const text = ['drawContainer','transportContainer'].includes(name) ? cleanCollectionContainer(value) : String(value || '').trim();
    if (Array.from(select.options).some(option => option.value === text)) {
      select.value = text;
    } else if (text && name === 'specimenType') {
      const option = document.createElement('option');
      option.value = text;
      option.textContent = text;
      select.appendChild(option);
      select.value = text;
    } else if (text && (name === 'drawContainer' || name === 'transportContainer')) {
      select.value = '__other__';
      additionalContainerField(card, name === 'drawContainer' ? 'customDrawContainer' : 'customTransportContainer').value = text;
    } else {
      select.value = '';
    }
    if (name === 'drawContainer' || name === 'transportContainer') {
      const custom = additionalContainerField(card, name === 'drawContainer' ? 'customDrawContainer' : 'customTransportContainer');
      const row = card.querySelector('[data-other-row="' + name + '"]');
      const enabled = select.value === '__other__';
      row.classList.toggle('hidden', !enabled);
      custom.disabled = !enabled;
      custom.required = enabled;
    }
  }

  function updateAdditionalSpin(card) {
    const draw = additionalContainerValue(card, 'drawContainer') === '__other__'
      ? additionalContainerValue(card, 'customDrawContainer') : additionalContainerValue(card, 'drawContainer');
    const isSst = /\bsst\b|gold|serum separator|red\s*\/\s*black/i.test(draw);
    const spin = additionalContainerField(card, 'spin');
    if (isSst) spin.value = 'Yes';
    spin.disabled = isSst;
    spin.title = isSst ? 'SST specimens must be spun before submission.' : '';
    if (additionalContainerValue(card, 'specimenType') === 'Whole Blood') {
      spin.value = 'No';
      spin.disabled = true;
      spin.title = 'Whole blood must not be centrifuged.';
    }
  }

  function renumberAdditionalContainers() {
    Array.from(els.additionalContainers.children).forEach((card, index) => {
      const number = index + 2;
      card.querySelector('[data-container-number]').textContent = number;
      card.querySelector('[data-container-heading]').textContent = 'Container ' + number;
    });
  }

  function addAdditionalContainerForm(requirement = {}, focus = true) {
    const card = document.createElement('div');
    card.className = 'additional-container-card';
    card.innerHTML =
      '<div class="additional-container-head"><div><h4><span class="container-number-badge" data-container-number>2</span><span data-container-heading>Container 2</span></h4><p>Enter separate collection, transfer, and transport requirements.</p></div><button class="additional-container-remove" data-remove type="button">Remove</button></div>' +
      '<div class="form-grid form-grid-compact">' +
        '<label><span class="form-label-text">Specimen type <span class="required-mark">*</span></span><select data-field="specimenType" required></select></label>' +
        '<label><span class="form-label-text">Draw container <span class="required-mark">*</span></span><select data-field="drawContainer" required></select></label>' +
        '<label class="full-width custom-draw-container-row hidden" data-other-row="drawContainer"><span class="form-label-text">Custom draw container <span class="required-mark">*</span></span><input data-field="customDrawContainer" disabled placeholder="Tube, cup, swab, or kit"></label>' +
        '<label><span class="form-label-text">Transport tube / container <span class="required-mark">*</span></span><select data-field="transportContainer" required></select></label>' +
        '<label class="full-width custom-draw-container-row hidden" data-other-row="transportContainer"><span class="form-label-text">Custom transport container <span class="required-mark">*</span></span><input data-field="customTransportContainer" disabled placeholder="Transport container exactly as specified"></label>' +
        '<label><span class="form-label-text">Transport temperature <span class="required-mark">*</span></span><select data-field="transportTemperature" required></select></label>' +
      '</div>' +
      '<details class="additional-container-optional"><summary>Volumes, spin, and special handling <span>(optional)</span></summary>' +
        '<div class="form-grid form-grid-compact additional-container-optional-grid">' +
          '<label>Draw containers needed<input type="number" min="1" step="1" value="1" data-field="count"></label>' +
          '<label>Submission containers needed<input type="number" min="1" step="1" value="1" data-field="submissionCount"></label>' +
          '<label>Alternative container<input data-field="alternativeContainer" placeholder="Optional alternative"></label>' +
          '<label>Preferred volume<input data-field="preferredVolume" placeholder="Example: 1 mL plasma"></label>' +
          '<label>Minimum volume<input data-field="minimumVolume" placeholder="Example: 0.5 mL"></label>' +
          '<label>Exact temperature wording<input data-field="transportTemperatureRaw" placeholder="From official directory"></label>' +
          '<label>Stability / viability<input data-field="stability" placeholder="Example: 2 days refrigerated"></label>' +
          '<label>Spin?<select data-field="spin"></select></label>' +
          '<label class="full-width">Special submission label<input data-field="specialLabeling" placeholder="Example: Label vial PLASMA"></label>' +
          '<label class="full-width">Special handling and collection notes<textarea data-field="specialInstructions" rows="3" placeholder="Transfer, centrifugation, timing, light protection, or dedicated specimen requirements"></textarea></label>' +
        '</div>' +
      '</details>';
    for (const name of ['specimenType', 'drawContainer', 'transportContainer', 'transportTemperature', 'spin']) {
      additionalContainerField(card, name).innerHTML = els[name].innerHTML;
      // The primary form may temporarily disable this option for its own temperature.
      // A second specimen has an independent temperature, so do not inherit that state.
      if (name === 'transportContainer') {
        const frozen = additionalContainerField(card, name).querySelector('option[value="Frozen Transport Tube"]');
        if (frozen) { frozen.disabled = false; frozen.hidden = false; }
      }
    }
    els.additionalContainers.appendChild(card);
    for (const [name, value] of Object.entries({
      specimenType: requirement.specimenType || '',
      drawContainer: requirement.container || '',
      transportContainer: requirement.transportContainer || '',
      transportTemperature: requirement.transportTemperature || '',
      spin: requirement.spin || 'Verify'
    })) {
      setAdditionalContainerChoice(card, name, value);
    }
    for (const name of ['count','submissionCount','alternativeContainer','preferredVolume','minimumVolume','transportTemperatureRaw','stability','specialLabeling','specialInstructions']) {
      additionalContainerField(card, name).value = requirement[name] ?? (name === 'count' || name === 'submissionCount' ? 1 : '');
    }
    additionalContainerField(card, 'drawContainer').addEventListener('change', () => {
      toggleAdditionalCustomContainer(card, 'drawContainer');
      updateAdditionalSpin(card);
    });
    additionalContainerField(card, 'customDrawContainer').addEventListener('input', () => updateAdditionalSpin(card));
    additionalContainerField(card, 'transportContainer').addEventListener('change', () => {
      toggleAdditionalCustomContainer(card, 'transportContainer');
      if (additionalContainerValue(card, 'transportContainer') === 'Frozen Transport Tube') {
        additionalContainerField(card, 'transportTemperature').value = 'Frozen';
      }
      window.syncPortalSelects?.();
    });
    additionalContainerField(card, 'transportTemperature').addEventListener('change', () => {
      if (additionalContainerValue(card, 'transportContainer') === 'Frozen Transport Tube' &&
          additionalContainerValue(card, 'transportTemperature') !== 'Frozen') {
        additionalContainerField(card, 'transportContainer').value = '';
      }
      window.syncPortalSelects?.();
    });
    additionalContainerField(card, 'specimenType').addEventListener('change', () => {
      if (additionalContainerValue(card, 'specimenType') === 'Stool' &&
          additionalContainerValue(card, 'drawContainer') !== '__other__') {
        setAdditionalContainerChoice(card, 'drawContainer', 'Sterile cup');
      }
      updateAdditionalSpin(card);
    });
    card.querySelector('[data-remove]').addEventListener('click', () => {
      card.remove();
      renumberAdditionalContainers();
      window.syncPortalSelects?.();
    });
    updateAdditionalSpin(card);
    renumberAdditionalContainers();
    window.enhanceAdditionalPortalSelects?.(card);
    if (focus) {
      const specimen = additionalContainerField(card, 'specimenType');
      if (window.focusPortalSelect) window.focusPortalSelect(specimen);
      else specimen.focus();
    }
  }

  function collectAdditionalContainerRequirements() {
    const requirements = [];
    const cards = Array.from(els.additionalContainers.children);
    for (let index = 0; index < cards.length; index++) {
      const card = cards[index];
      const label = 'Container ' + (index + 2);
      function requireField(name, message) {
        const element = additionalContainerField(card, name);
        if (additionalContainerValue(card, name)) return true;
        showToast(label + ': ' + message);
        element.focus();
        return false;
      }
      if (!requireField('specimenType', 'choose a specimen type.') ||
          !requireField('drawContainer', 'choose a draw container.') ||
          !requireField('transportContainer', 'choose a transport container.') ||
          !requireField('transportTemperature', 'choose a transport temperature.')) return null;
      const draw = additionalContainerValue(card, 'drawContainer') === '__other__'
        ? additionalContainerValue(card, 'customDrawContainer') : additionalContainerValue(card, 'drawContainer');
      const transport = additionalContainerValue(card, 'transportContainer') === '__other__'
        ? additionalContainerValue(card, 'customTransportContainer') : additionalContainerValue(card, 'transportContainer');
      if (!draw || !transport) {
        const name = !draw ? 'customDrawContainer' : 'customTransportContainer';
        showToast(label + ': enter the custom ' + (!draw ? 'draw' : 'transport') + ' container.');
        additionalContainerField(card, name).focus();
        return null;
      }
      const count = Number(additionalContainerValue(card, 'count'));
      const submissionCount = Number(additionalContainerValue(card, 'submissionCount'));
      if (!Number.isInteger(count) || count < 1 || !Number.isInteger(submissionCount) || submissionCount < 1) {
        showToast(label + ': enter valid draw and submission quantities.');
        (count < 1 || !Number.isInteger(count) ? additionalContainerField(card, 'count') : additionalContainerField(card, 'submissionCount')).focus();
        return null;
      }
      const specimenType = additionalContainerValue(card, 'specimenType');
      requirements.push({
        container: draw,
        specimenType,
        transportContainer: transport,
        transportTemperature: additionalContainerValue(card, 'transportTemperature'),
        count,
        submissionCount,
        alternativeContainer: additionalContainerValue(card, 'alternativeContainer'),
        preferredVolume: additionalContainerValue(card, 'preferredVolume'),
        minimumVolume: additionalContainerValue(card, 'minimumVolume'),
        transportTemperatureRaw: additionalContainerValue(card, 'transportTemperatureRaw'),
        stability: additionalContainerValue(card, 'stability'),
        spin: specimenType === 'Whole Blood' ? 'No' : additionalContainerField(card, 'spin').disabled && /\bsst\b|gold|serum separator|red\s*\/\s*black/i.test(draw) ? 'Yes' : additionalContainerValue(card, 'spin'),
        specialLabeling: additionalContainerValue(card, 'specialLabeling'),
        specialInstructions: additionalContainerValue(card, 'specialInstructions')
      });
    }
    return requirements;
  }

  function openDialog(test = null, options = {}) {
    const isExisting = Boolean(test && test.id);
    const record = normalizeRecord(test || {});
    els.dialogTitle.textContent = isExisting ? 'Edit test' : 'Add missing test';
    els.testId.value = isExisting ? record.id : '';
    els.testCode.value = record.testCode;
    els.testName.value = record.testName;
    const requireAddedBy = !isExisting || isManuallyAddedTest(record);
    els.addedByInitialsRow.classList.toggle('hidden', !requireAddedBy);
    els.addedByInitials.required = requireAddedBy;
    els.addedByInitials.disabled = !requireAddedBy;
    els.addedByInitials.value = requireAddedBy ? (record.addedByInitials || '') : '';
    if (isExisting) setSelectValue(els.specimenType, record.specimenType, 'Other / Verify');
    else els.specimenType.value = '';
    setDrawContainerValue(record.drawContainer === 'Verify Official Instructions' && !isExisting ? '' : record.drawContainer);
    els.alternativeContainer.value = record.alternativeContainer;
    els.collectionCount.value = record.collectionCount || 1;
    els.submissionCount.value = record.submissionCount || 1;
    setTransportContainerValue(record.transportContainer);
    els.preferredVolume.value = record.preferredVolume;
    els.minimumVolume.value = record.minimumVolume;
    if (isExisting) setSelectValue(els.transportTemperature, record.transportTemperature, 'Not specified');
    else els.transportTemperature.value = '';
    els.transportTemperatureRaw.value = record.transportTemperatureRaw;
    els.stability.value = record.stability;
    setSelectValue(els.spin, record.spin, 'Verify');
    updateSstSpinRequirement();
    els.specialLabeling.value = record.specialLabeling;
    els.specialInstructions.value = record.specialInstructions;
    els.additionalContainers.replaceChildren();
    additionalDrawRequirements(record).forEach(requirement => addAdditionalContainerForm(requirement, false));
    els.blockedStatus.checked = record.status === 'blocked';
    els.addToSummary.checked = options.addToSummary !== false;
    els.addToSummaryRow.classList.toggle('hidden', isExisting);
    els.saveTestButton.textContent = isExisting ? 'Save changes' : 'Save test';
    els.deleteTestButton.classList.toggle('hidden', !isExisting || !record.id.startsWith('custom-'));
    if (els.optionalDetails) els.optionalDetails.open = isExisting;
    const showPreparedForm = () => {
      els.testDialog.showModal();
      window.syncPortalSelects?.();
      setTimeout(() => (isExisting ? els.testName : els.testCode.value ? els.testName : els.testName.value ? els.testCode : els.testCode).focus(), 0);
    };
    if (!isExisting && typeof window.showManualTestNotice === 'function') {
      window.showManualTestNotice(showPreparedForm);
    } else {
      showPreparedForm();
    }
  }

  function closeDialog() {
    window.closePortalSelects?.();
    els.testDialog.close();
  }

  function saveTestFromForm(event) {
    event.preventDefault();
    const id = els.testId.value || `custom-${Date.now()}`;
    const existingIndex = database.findIndex(test => test.id === id);
    const additionalRequirements = collectAdditionalContainerRequirements();
    if (additionalRequirements === null) return;
    const record = normalizeRecord({
      id,
      testCode: els.testCode.value,
      testName: els.testName.value,
      addedByInitials: els.addedByInitials.disabled ? (existingIndex >= 0 ? database[existingIndex].addedByInitials : '') : els.addedByInitials.value.trim().toUpperCase(),
      specimenType: els.specimenType.value,
      drawContainer: selectedDrawContainer(),
      alternativeContainer: els.alternativeContainer.value,
      additionalDrawRequirements: additionalRequirements,
      collectionCount: Number(els.collectionCount.value || 1),
      submissionCount: Number(els.submissionCount.value || 1),
      transportContainer: selectedTransportContainer(),
      preferredVolume: els.preferredVolume.value,
      minimumVolume: els.minimumVolume.value,
      transportTemperature: els.transportTemperature.value,
      transportTemperatureRaw: els.transportTemperatureRaw.value,
      stability: els.stability.value,
      spin: isSelectedDrawSst() ? 'Yes' : els.spin.value,
      specialLabeling: els.specialLabeling.value,
      specialInstructions: els.specialInstructions.value,
      status: els.blockedStatus.checked ? 'blocked' : 'active',
      source: existingIndex >= 0 ? database[existingIndex].source : 'Custom entry',
      sourceRow: existingIndex >= 0 ? database[existingIndex].sourceRow : null
    });
    const requiredFields = [
      { element: els.testCode, value: els.testCode.value.trim(), message: 'Enter a test code before saving.' },
      { element: els.testName, value: els.testName.value.trim(), message: 'Enter a test name before saving.' },
      { element: els.specimenType, value: els.specimenType.value, message: 'Select a specimen type before saving.' },
      { element: els.drawContainer, value: selectedDrawContainer(true), message: 'Select a draw container before saving.' },
      { element: els.transportContainer, value: selectedTransportContainer(true), message: 'Select a transport tube or container before saving.' },
      { element: els.transportTemperature, value: els.transportTemperature.value, message: 'Select a transport temperature before saving.' }
    ];
    if (els.drawContainer.value === '__other__' && !els.customDrawContainer.value.trim()) {
      showToast('Enter the custom draw container before saving.');
      els.customDrawContainer.focus();
      return;
    }
    if (els.transportContainer.value === '__other__' && !els.customTransportContainer.value.trim()) {
      showToast('Enter the custom transport container before saving.');
      els.customTransportContainer.focus();
      return;
    }
    if (els.addedByInitials.required && !/^[A-Za-z]{2,8}$/.test(els.addedByInitials.value.trim())) {
      showToast('Enter the initials of the person adding this test (2–8 letters).');
      els.addedByInitials.focus();
      return;
    }
    const missingField = requiredFields.find(field => !field.value);
    if (missingField) {
      showToast(missingField.message);
      window.focusPortalSelect ? window.focusPortalSelect(missingField.element) : missingField.element.focus();
      return;
    }
    if (existingIndex >= 0) database[existingIndex] = record;
    else database.unshift(record);

    const shouldAdd = existingIndex < 0 && els.addToSummary.checked && record.status !== 'blocked';
    if (shouldAdd && !selectedIds.includes(record.id)) {
      selectedIds.push(record.id);
      if (DEFAULT_STAT_TEST_CODES.has(record.testCode) && isStatEligible(record)) {
        if (!statSelectedIds.includes(record.id)) statSelectedIds.push(record.id);
        saveStatSelectedIds();
      }
      saveSelected();
    }

    persistDatabase();
    closeDialog();
    renderAll();
    showToast(existingIndex >= 0 ? 'Test updated.' : shouldAdd ? 'Test added to the collection summary.' : 'Test saved.');
  }

  function openDirectoryFromDialog() {
    const url = directoryUrl({ testCode: els.testCode.value.trim(), testName: els.testName.value.trim() });
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  async function deleteCustomTest() {
    const id = els.testId.value;
    if (!id.startsWith('custom-')) return;
    const test = database.find(item => item.id === id);
    if (!test || !(await window.PortalDialog.confirm(`“${test.testName}” will be removed from this browser. This cannot be undone.`, { title: 'Delete manually added test?', confirmLabel: 'Delete test', tone: 'danger' }))) return;
    database = database.filter(item => item.id !== id);
    selectedIds = selectedIds.filter(item => item !== id);
    statSelectedIds = statSelectedIds.filter(item => item !== id);
    saveStatSelectedIds();
    persistDatabase();
    saveSelected();
    closeDialog();
    renderAll();
    showToast('Custom test deleted.');
  }

  function persistDatabase() {
    const state = userStateFromDatabase();
    if (!saveUserState(state)) {
      void window.PortalDialog.alert('Your change is visible for now but was not saved. Check browser storage before relying on this entry.', { title: 'Change not saved', tone: 'warning' });
    }
    renderRecordCount();
  }


  // Printed labels put the emoji in its own high-contrast badge after BAG.
  // The written temperature stays visible even without emoji font support.
  function printBagTemperatureType(bag) {
    const key = String(bag.key || '').split('|')[0].toLowerCase();
    return ['room','refrigerated','frozen','mixed','verify'].includes(key) ? key :
      String(bag.className || '').includes('bag-room') ? 'room' :
      String(bag.className || '').includes('bag-refrigerated') ? 'refrigerated' :
      String(bag.className || '').includes('bag-frozen') ? 'frozen' :
      String(bag.className || '').includes('bag-mixed') ? 'mixed' : 'verify';
  }
  function printBagTemperatureLabel(bag, short = false) {
    const labels = {
      room:'ROOM TEMPERATURE', refrigerated:'REFRIGERATED',
      frozen:'FROZEN', mixed:'MIXED / VERIFY', verify:'VERIFY TEMPERATURE'
    };
    const label = labels[printBagTemperatureType(bag)];
    return label + (short ? '' : ' BAG');
  }
  function printBagTemperatureBadge(bag) {
    const type = printBagTemperatureType(bag);
    const icons = {room:'🌡️',refrigerated:'❄️',frozen:'❄️❄️',
      mixed:'⚠️',verify:'⚠️'};
    return '<span class="print-temperature-emoji" aria-hidden="true">' + icons[type] + '</span>';
  }

  function transportBagInfo(test) {
    const normalized = String(test.transportTemperature || '').trim();
    const value = (normalized && normalized !== 'Not specified'
      ? normalized
      : test.transportTemperatureRaw || '').toLowerCase();
    const hasRoom = /room|ambient/.test(value);
    const hasRefrigerated = /refriger|2\s*[-–]\s*8|chill|cold/.test(value);
    const hasFrozen = /frozen|freeze/.test(value);
    const categoryCount = [hasRoom, hasRefrigerated, hasFrozen].filter(Boolean).length;

    if (/mixed|see instructions|multiple/.test(value) || categoryCount > 1) {
      return { key: 'mixed', label: 'Mixed / verify instructions', className: 'bag-mixed', order: 4 };
    }
    if (hasFrozen) return { key: 'frozen', label: 'Frozen bag', className: 'bag-frozen', order: 3 };
    if (hasRefrigerated) return { key: 'refrigerated', label: 'Refrigerated bag', className: 'bag-refrigerated', order: 2 };
    if (hasRoom) return { key: 'room', label: 'Room-temperature bag', className: 'bag-room', order: 1 };
    return { key: 'verify', label: 'Temperature to verify', className: 'bag-verify', order: 5 };
  }

  function isSstDraw(test) {
    const value = String(test.drawContainer || '').toLowerCase();
    // Microtainers have their own count and must never enter Gold/Tiger pooling.
    if (/microtainer/.test(value)) return false;
    return /\bsst\b|gold|serum separator|red\s*\/\s*black/.test(value);
  }

  function parseVolumeMl(value) {
    const text = String(value || '').replace(/,/g, ' ');
    const explicitTotal = text.match(/(?:total|yield|submit|preferred)\D{0,12}(\d+(?:\.\d+)?)\s*m\s*l\b/i);
    if (explicitTotal) return Number(explicitTotal[1]);

    const multiplication = text.match(/(\d+)\s*(?:x|×)\s*(\d+(?:\.\d+)?)\s*m\s*l\b/i);
    if (multiplication) return Number(multiplication[1]) * Number(multiplication[2]);

    const first = text.match(/(\d+(?:\.\d+)?)\s*m\s*l\b/i);
    return first ? Number(first[1]) : null;
  }

  // Collection-scope review: these exact catalog components use either an
  // ordinary compatible source or a separate source with a volume-derived
  // tube estimate. Parent panel instructions about other matrices must not
  // turn serum into a dedicated or full EDTA draw. Exact signatures prevent
  // applying the override to manual edits or unrelated catalog orders.
  const REVIEWED_SST_COMPONENT_POLICIES = Object.freeze({
    "labcorp-verified-20261118-batch34-311959": {
      "policy": "shared",
      "signature": [
        "Serum",
        "SST / Gold",
        "SST / Gold (spun)",
        "Room Temperature",
        "Yes",
        "2 mL serum",
        "",
        1,
        1,
        "",
        "Collect serum for lipid panel and a separate 4 mL EDTA whole blood specimen for HbA1c. Centrifuge SST, submit at room temperature. Follow component requirements; no routine fasting unless ordered.",
        "[{\"container\":\"Lavender EDTA\",\"specimenType\":\"Whole Blood\",\"preferredVolume\":\"4 mL whole blood\",\"minimumVolume\":\"\",\"purpose\":\"Hemoglobin A1c\",\"alternativeContainer\":\"\",\"submissionCount\":1,\"transportContainer\":\"Lavender EDTA\",\"transportTemperature\":\"Room Temperature\",\"transportTemperatureRaw\":\"Room Temperature\",\"stability\":\"\",\"spin\":\"No\",\"specialLabeling\":\"\",\"specialInstructions\":\"Fill EDTA tube to its intended volume, invert gently, and submit original whole blood tube. Do not spin or transfer.\",\"transportOnly\":false,\"count\":1}]"
      ]
    },
    "labcorp-verified-20261118-batch34-402145": {
      "policy": "shared",
      "signature": [
        "Serum",
        "SST / Gold",
        "SST / Gold (spun)",
        "Room Temperature",
        "Yes",
        "4 mL serum",
        "2.5 mL serum",
        1,
        1,
        "",
        "Separate serum from cells within 45 minutes. Also collect full EDTA tube for CBC and platelets. Submit promptly at room temperature, avoid hemolysis.",
        "[{\"container\":\"Lavender EDTA\",\"specimenType\":\"Whole Blood\",\"preferredVolume\":\"Full EDTA tube\",\"minimumVolume\":\"0.5 mL whole blood\",\"purpose\":\"CBC with differential and platelets\",\"alternativeContainer\":\"\",\"submissionCount\":1,\"transportContainer\":\"Lavender EDTA\",\"transportTemperature\":\"Room Temperature\",\"transportTemperatureRaw\":\"Room Temperature\",\"stability\":\"\",\"spin\":\"No\",\"specialLabeling\":\"\",\"specialInstructions\":\"Fill EDTA tube to its intended volume, invert gently, and submit original whole blood tube. Do not spin or transfer.\",\"transportOnly\":false,\"count\":1}]"
      ]
    },
    "labcorp-verified-20261118-batch34-385375": {
      "policy": "shared",
      "signature": [
        "Serum",
        "SST / Gold",
        "SST / Gold (spun)",
        "Room Temperature",
        "Yes",
        "0.5 mL serum",
        "0.5 mL serum",
        1,
        1,
        "",
        "Separate serum within 45 minutes. Also collect EDTA whole blood for platelets. Submit both promptly; do not freeze whole blood.",
        "[{\"container\":\"Lavender EDTA\",\"specimenType\":\"Whole Blood\",\"preferredVolume\":\"Full EDTA tube\",\"minimumVolume\":\"0.5 mL whole blood\",\"purpose\":\"Platelet count\",\"alternativeContainer\":\"\",\"submissionCount\":1,\"transportContainer\":\"Lavender EDTA\",\"transportTemperature\":\"Room Temperature\",\"transportTemperatureRaw\":\"Room Temperature\",\"stability\":\"\",\"spin\":\"No\",\"specialLabeling\":\"\",\"specialInstructions\":\"Fill EDTA tube to its intended volume, invert gently, and submit original whole blood tube. Do not spin or transfer.\",\"transportOnly\":false,\"count\":1}]"
      ]
    },
    "labcorp-verified-20261118-batch34-121054": {
      "policy": "shared",
      "signature": [
        "Serum",
        "SST / Gold",
        "SST / Gold (spun)",
        "Room Temperature",
        "Yes",
        "1.5 mL serum",
        "1 mL serum",
        1,
        1,
        "",
        "Centrifuge and submit spun SST. Collect separate random urine without preservative. Reject visibly bloody urine; urine pH 4–8.",
        "[{\"container\":\"Sterile cup\",\"specimenType\":\"Urine\",\"preferredVolume\":\"10 mL random urine\",\"minimumVolume\":\"2 mL random urine\",\"purpose\":\"Urine component\",\"alternativeContainer\":\"\",\"submissionCount\":1,\"transportContainer\":\"Sterile cup\",\"transportTemperature\":\"Room Temperature\",\"transportTemperatureRaw\":\"Room Temperature\",\"stability\":\"\",\"spin\":\"No\",\"specialLabeling\":\"\",\"specialInstructions\":\"Collect random urine in clean sterile cup without additives; submit original cup, label urine.\",\"transportOnly\":false,\"count\":1}]"
      ]
    },
    "labcorp-verified-20261118-batch34-165065": {
      "policy": "shared",
      "signature": [
        "Serum",
        "SST / Gold",
        "SST / Gold (spun)",
        "Room Temperature",
        "Yes",
        "6 mL serum",
        "",
        1,
        1,
        "",
        "Separate serum within 2 hours. Collect full EDTA tube and urine specimen for urinalysis. Ask about high-dose biotin and follow Labcorp's 72-hour recommendation with clinician guidance.",
        "[{\"container\":\"Lavender EDTA\",\"specimenType\":\"Whole Blood\",\"preferredVolume\":\"Full EDTA tube\",\"minimumVolume\":\"\",\"purpose\":\"CBC and whole blood components\",\"alternativeContainer\":\"\",\"submissionCount\":1,\"transportContainer\":\"Lavender EDTA\",\"transportTemperature\":\"Room Temperature\",\"transportTemperatureRaw\":\"Room Temperature\",\"stability\":\"\",\"spin\":\"No\",\"specialLabeling\":\"\",\"specialInstructions\":\"Fill EDTA tube to its intended volume, invert gently, and submit original whole blood tube. Do not spin or transfer.\",\"transportOnly\":false,\"count\":1},{\"container\":\"Sterile cup\",\"specimenType\":\"Urine\",\"preferredVolume\":\"3–9 mL urine\",\"minimumVolume\":\"\",\"purpose\":\"Urine component\",\"alternativeContainer\":\"\",\"submissionCount\":1,\"transportContainer\":\"Red/Yellow Swirl UA Preservative Tube\",\"transportTemperature\":\"Room Temperature\",\"transportTemperatureRaw\":\"Room Temperature\",\"stability\":\"\",\"spin\":\"No\",\"specialLabeling\":\"\",\"specialInstructions\":\"Collect voided urine; use clean catch if contamination is a concern. Transfer to UA preservative tube within the fill range and label urine.\",\"transportOnly\":false,\"count\":1}]"
      ]
    },
    "labcorp-verified-20261118-batch36-144149": {
      "policy": "separate-volume",
      "signature": [
        "Serum",
        "SST / Gold",
        "SST / Gold (spun)",
        "Refrigerated",
        "Yes",
        "7 mL serum",
        "2.9 mL serum",
        3,
        3,
        "",
        "Two sample types required. Collect sufficient serum for 7 mL non-DNA testing plus 2.5 mL dedicated HBV DNA aliquot (9.5 mL total). Submit original spun SSTs refrigerated; centrifuge DNA sample within 24 hours and transfer to a separate frozen polypropylene screw-cap vial. Ask about high-dose biotin; Labcorp recommends withholding it for 72 hours before collection with clinician guidance.",
        "[{\"container\":\"SST / Gold\",\"specimenType\":\"Serum\",\"preferredVolume\":\"2.5 mL serum\",\"minimumVolume\":\"0.7 mL serum\",\"purpose\":\"HBV DNA\",\"alternativeContainer\":\"\",\"submissionCount\":1,\"transportContainer\":\"Frozen Transport Tube (Purple Cap)\",\"transportTemperature\":\"Frozen\",\"transportTemperatureRaw\":\"Frozen\",\"stability\":\"\",\"spin\":\"Yes\",\"specialLabeling\":\"\",\"specialInstructions\":\"Centrifuge within 24 hours and transfer 2.5 mL serum to a separate polypropylene screw-cap tube; freeze. Do not freeze the SST. Keep separate from other frozen tests.\",\"transportOnly\":false,\"count\":1}]"
      ]
    },
    "labcorp-verified-20261118-batch37-144547": {
      "policy": "separate-volume",
      "signature": [
        "Serum",
        "SST / Gold",
        "SST / Gold (spun)",
        "Room Temperature",
        "Yes",
        "5 mL serum",
        "2.2 mL serum",
        2,
        2,
        "",
        "Two separate serum specimens are required. Published aggregate volume 7.5 mL, minimum 2.9 mL; component-based allocation reserves 2.5 mL (minimum 0.7 mL) for HBV DNA; confirm aliquot allocation with Labcorp. Spin serology SSTs; keep separate from DNA. Ask about high-dose biotin; follow Labcorp's 72-hour withholding recommendation with clinician guidance.",
        "[{\"container\":\"SST / Gold\",\"specimenType\":\"Serum\",\"preferredVolume\":\"2.5 mL serum\",\"minimumVolume\":\"0.7 mL serum\",\"purpose\":\"HBV DNA\",\"alternativeContainer\":\"\",\"submissionCount\":1,\"transportContainer\":\"Frozen Transport Tube (Purple Cap)\",\"transportTemperature\":\"Frozen\",\"transportTemperatureRaw\":\"Frozen\",\"stability\":\"\",\"spin\":\"Yes\",\"specialLabeling\":\"\",\"specialInstructions\":\"Centrifuge within 24 hours. Separate serum into a dedicated polypropylene screw-cap frozen transport tube; use a lab-approved vial with adequate capacity and freezing headspace. Keep frozen; do not combine with other tests.\",\"transportOnly\":false,\"count\":1}]"
      ]
    },
    "labcorp-verified-20261118-batch37-257524::additional-draw-0": {
      "policy": "separate-volume",
      "signature": [
        "Serum",
        "SST / Gold",
        "SST / Gold (spun)",
        "Refrigerated",
        "Yes",
        "3 mL serum",
        "2 mL serum",
        2,
        2,
        "",
        "Spin separate SSTs and refrigerate; do not share HIV specimen. Send promptly within HCV PCR stability. Confirm panel allocation if low yield.",
        "[]"
      ]
    },
    "labcorp-verified-20261118-batch37-266800": {
      "policy": "shared",
      "signature": [
        "Serum",
        "SST / Gold",
        "SST / Gold (spun)",
        "Refrigerated",
        "Yes",
        "3 mL serum",
        "",
        2,
        2,
        "",
        "Collect three distinct specimen types: 3 mL serum, 1 mL EDTA plasma and 4 mL EDTA whole blood. Centrifuge serum SSTs, refrigerate; keep EDTA whole blood separate. Ask about high-dose biotin; follow Labcorp's 72-hour withholding recommendation with clinician guidance.",
        "[{\"container\":\"Lavender EDTA\",\"specimenType\":\"Plasma\",\"preferredVolume\":\"1 mL plasma\",\"minimumVolume\":\"\",\"purpose\":\"pTau-181\",\"alternativeContainer\":\"\",\"submissionCount\":1,\"transportContainer\":\"Transport Tube\",\"transportTemperature\":\"Room Temperature\",\"transportTemperatureRaw\":\"Room Temperature\",\"stability\":\"\",\"spin\":\"Yes\",\"specialLabeling\":\"\",\"specialInstructions\":\"Mix EDTA blood, centrifuge and transfer separated plasma into plastic transport tube. Room temperature 2 days.\",\"transportOnly\":false,\"count\":1},{\"container\":\"Lavender EDTA\",\"specimenType\":\"Whole Blood\",\"preferredVolume\":\"4 mL whole blood\",\"minimumVolume\":\"\",\"purpose\":\"CBC\",\"alternativeContainer\":\"\",\"submissionCount\":1,\"transportContainer\":\"Lavender EDTA (original tube)\",\"transportTemperature\":\"Room Temperature\",\"transportTemperatureRaw\":\"Room Temperature\",\"stability\":\"\",\"spin\":\"No\",\"specialLabeling\":\"\",\"specialInstructions\":\"Mix immediately by gentle inversion 8–10 times. Submit whole blood in the original tube; do not spin or freeze. Send promptly within 24 hours.\",\"transportOnly\":false,\"count\":1}]"
      ]
    },
    "labcorp-verified-20261118-batch37-607635": {
      "policy": "shared",
      "signature": [
        "Serum",
        "SST / Gold",
        "Transport Tube",
        "Room Temperature",
        "Yes",
        "2 mL serum",
        "1 mL serum",
        1,
        1,
        "",
        "Centrifuge SST and transfer separated serum to plastic transport tube. Collect a separate EDTA whole blood tube for CBC.",
        "[{\"container\":\"Lavender EDTA\",\"specimenType\":\"Whole Blood\",\"preferredVolume\":\"4 mL whole blood\",\"minimumVolume\":\"Fill adult tube to capacity\",\"purpose\":\"CBC\",\"alternativeContainer\":\"\",\"submissionCount\":1,\"transportContainer\":\"Lavender EDTA (original tube)\",\"transportTemperature\":\"Room Temperature\",\"transportTemperatureRaw\":\"Room Temperature\",\"stability\":\"\",\"spin\":\"No\",\"specialLabeling\":\"\",\"specialInstructions\":\"Mix immediately by gentle inversion 8–10 times. Submit whole blood in the original tube; do not spin or freeze. Send within 24 hours. A pediatric microtainer is a distinct collection option.\",\"transportOnly\":false,\"count\":1}]"
      ]
    },
    "labcorp-verified-20261118-batch37-144053::additional-draw-0": {
      "policy": "separate-volume",
      "signature": [
        "Serum",
        "SST / Gold",
        "SST / Gold (spun)",
        "Refrigerated",
        "Yes",
        "7 mL serum",
        "",
        3,
        3,
        "",
        "Spin and refrigerate separate SSTs. Do not open or share the dedicated HIV SST. Send promptly within HCV reflex PCR stability.",
        "[]"
      ]
    },
    "labcorp-verified-20261118-batch37-144059::additional-draw-0": {
      "policy": "separate-volume",
      "signature": [
        "Serum",
        "SST / Gold",
        "SST / Gold (spun)",
        "Refrigerated",
        "Yes",
        "8 mL serum",
        "",
        4,
        4,
        "",
        "Spin and refrigerate separate SSTs. Do not open or share the dedicated HIV SST. Send promptly within HCV reflex PCR stability.",
        "[]"
      ]
    },
    "labcorp-verified-20261118-batch37-144099::additional-draw-0": {
      "policy": "separate-volume",
      "signature": [
        "Serum",
        "SST / Gold",
        "SST / Gold (spun)",
        "Refrigerated",
        "Yes",
        "8 mL serum",
        "",
        4,
        4,
        "",
        "Spin and refrigerate separate SSTs. Do not open or share the dedicated HIV SST. Send promptly within HCV reflex PCR stability.",
        "[]"
      ]
    }
  });
  function reviewedSstComponentPolicy(test) {
    const entry = REVIEWED_SST_COMPONENT_POLICIES[test.id];
    if (!entry || !isSstDraw(test)) return '';
    const signature = [test.specimenType,test.drawContainer,test.transportContainer,
      test.transportTemperature,test.spin,test.preferredVolume,test.minimumVolume,
      test.collectionCount,test.submissionCount,test.specialLabeling,test.specialInstructions,
      JSON.stringify(test.additionalDrawRequirements || [])];
    return JSON.stringify(signature) === JSON.stringify(entry.signature) ? entry.policy : '';
  }

  function explicitSstTubeCount(test) {
    if (reviewedSstComponentPolicy(test)) return 0;
    // An entered draw count takes priority over counts inferred from free text.
    const enteredCount = Math.floor(Number(test.collectionCount) || 1);
    if (enteredCount > 1) return enteredCount;
    const text = `${test.drawContainer || ''} ${test.preferredVolume || ''} ${test.specialInstructions || ''}`.toLowerCase();
    const numeric = text.match(/\b(\d+)\s+(?:full\s+)?(?:gold\s*\/\s*)?sst\s+tubes?\b/);
    if (numeric) return Number(numeric[1]);
    const words = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6 };
    const wordMatch = text.match(/\b(one|two|three|four|five|six)\s+(?:full\s+)?(?:gold\s*\/\s*)?sst\s+tubes?\b/);
    if (wordMatch) return words[wordMatch[1]];
    const describedTubes = text.match(/(?<![\d.])\b(\d+|one|two|three|four|five|six)\s+(?:[a-z0-9.®/()_-]+\s+){0,10}tubes\b/);
    if (describedTubes && /sst|gold|serum separator|microtainer/.test(describedTubes[0]) && !/transport|aliquot|cryovial|vial/.test(describedTubes[0])) {
      return Math.max(numberWordValue(describedTubes[1]), 1);
    }
    const genericCount = explicitCollectionCount(test);
    return genericCount > 1 ? genericCount : 0;
  }

  // A frozen-only restriction does not apply to the configured refrigerated
  // route. Strip only the exact, reviewed conditional sentence for rule
  // classification; keep original notes visible and preserve all other text.
  function routeSpecificPoolingNotes(test) {
    const notes = String(test.specialInstructions || '');
    if (!/^refrigerated$/i.test(String(test.transportTemperature || '').trim()) ||
        !/^serum$/i.test(String(test.specimenType || '').trim()) ||
        !/^(?:plastic serum )?transport tube$/i.test(String(test.transportContainer || '').trim()) ||
        !/^yes$/i.test(String(test.spin || '').trim())) return notes;
    return notes.replace(/\bIf shipping frozen, submit a separate dedicated frozen aliquot for each assay; do not pool frozen specimens\./gi, '');
  }

  function requiresDedicatedSst(test) {
    const reviewedPolicy = reviewedSstComponentPolicy(test);
    if (reviewedPolicy) return reviewedPolicy === 'separate-volume';
    if (requiresDistinctDrawTransport(test)) return true;
    const text = `${test.drawContainer || ''} ${test.transportContainer || ''} ${routeSpecificPoolingNotes(test)}`.toLowerCase();
    return /dedicated|own tube|separate (?:sst|gold|tube)|do not share|full tube|full sst|full gold|each tube|individual tube/.test(text)
      || explicitSstTubeCount(test) > 0;
  }

  function finalTransportContainer(test) {
    const transport = String(test.transportContainer || '').trim();
    if (transport && !/^verify/i.test(transport)) return transport;
    return String(test.drawContainer || 'Verify container').trim();
  }

  // Certain LabCorp monographs specify a serum yield larger than one SST can
  // supply. Unlike generic one-test estimates, their source-derived volume
  // requirement is explicitly opted into capacity-based multi-tube counting.
  function needsPreferredSerumYieldSstCount(test) {
    return Boolean(reviewedSstComponentPolicy(test)) || test.usePreferredSerumYield === true
      || /preferred serum yield requires multi-sst calculation/i.test(String(test.specialInstructions || ''));

  }

  // Local SST planning policy: a recorded minimum of at least 4 mL
  // receives two SST collection tubes. Explicit higher tube counts override
  // this floor. Do not apply to other collection tube types.
  function needsTwoSstForMinimum(test) {
    if (!isSstDraw(test)) return false;
    const minimum = parseVolumeMl(test.minimumVolume);
    return minimum !== null && minimum >= 4 - 1e-8;
  }

  // Collection planning targets depend on the number of compatible tests
  // in the existing physical source pool: 1–9 use midpoint; 10+ use one-fifth.
  // Directory requirements and special collection rules remain authoritative.
  // Multiple amounts, pediatric minima, alternate matrices and per-vial
  // instructions retain the existing conservative route and parsing.
  function specimenPlanningVolumeMl(test, largePool = false) {
    if (hasCollectionFillRule(test)) return null;
    if (/\b(?:minimum volume (?:is )?(?:not acceptable|insufficient)|preferred volume (?:is )?required|must (?:submit|provide|collect) (?:the )?preferred volume)\b/i.test(String(test.specialInstructions || ''))) return null;
    const simple = value => {
      const match = String(value || '').trim().match(/^(\d+(?:\.\d+)?)\s*m\s*l(?:\s+(serum|plasma|whole blood|blood|platelet[- ]poor plasma|rbcs?|red blood cells))?$/i);
      if (!match) return null;
      const ml = Number(match[1]);
      const matrix = normalizeSearch(match[2] || normalizeSpecimenType(test.specimenType));
      return ml > 0 && Number.isFinite(ml) ? { ml, matrix } : null;
    };
    const p = simple(test.preferredVolume), m = simple(test.minimumVolume);
    if (!p || !m || p.matrix !== m.matrix || m.ml > p.ml) return null;
    return m.ml + (p.ml - m.ml) / (largePool ? 5 : 2);
  }

  function labcorpVolumePolicyEligible(test) {
    return collectionSpecimenGroupForTest(test) === 'blood'
      && !hasCollectionFillRule(test) && !collectionTubeException(test)
      && !requiresDistinctDrawTransport(test) && explicitCollectionCount(test) === 1
      && !(isSstDraw(test) ? requiresDedicatedSst(test) || needsTwoSstForMinimum(test) : requiresDedicatedCollectionTube(test))
      && !needsPreferredSerumYieldSstCount(test);
  }

  function labcorpLargeCompatiblePool(tests) {
    return uniqueTests(tests.filter(labcorpVolumePolicyEligible)).length >= 10;
  }

  function planningTargetOrExistingVolume(test, preferred, minimum, largePool = false) {
    // Keep the existing planning target for dedicated, high-yield, and other
    // protected routes; this change is only to ordinary compatible pools.
    const target = specimenPlanningVolumeMl(test, labcorpVolumePolicyEligible(test) ? largePool : true);
    return target ?? (preferred === null ? minimum : preferred);
  }

  function sstEstimateForTests(tests) {
    let sharedMl = 0;
    let dedicatedTubes = 0;
    let unmeasuredTubes = 0;
    const unmeasuredTests = [];

    const pool = tests.filter(isSstDraw);
    const largePool = labcorpLargeCompatiblePool(pool);
    pool.forEach(test => {
      const preferredMl = parseVolumeMl(test.preferredVolume);
      const minimumMl = parseVolumeMl(test.minimumVolume);
      const plannedMl = planningTargetOrExistingVolume(test, preferredMl, minimumMl, largePool);
      const explicitCount = explicitSstTubeCount(test);

      // Minimum >=4 mL plans two SSTs for this test, unless an explicit
      // instruction calls for more. Preferred volume alone does not trigger
      // this two-tube rule. Keep these sources out of the shared serum pool.
      const twoSstMinimum = needsTwoSstForMinimum(test);
      if (requiresDedicatedSst(test) || hasCollectionFillRule(test) || twoSstMinimum) {
        const volumeFloor = !hasCollectionFillRule(test) && plannedMl !== null &&
          (specimenPlanningVolumeMl(test, largePool) !== null || reviewedSstComponentPolicy(test) ||
            (minimumMl === null && needsPreferredSerumYieldSstCount(test)))
          ? Math.ceil(plannedMl / SST_USABLE_ML_PER_TUBE - 1e-9) : 1;
        dedicatedTubes += Math.max(explicitCount, twoSstMinimum ? 2 : 1, volumeFloor);
      } else if (plannedMl !== null) {
        const contribution = specimenPlanningVolumeMl(test, largePool) !== null || needsPreferredSerumYieldSstCount(test)
          ? plannedMl : Math.min(plannedMl, SST_USABLE_ML_PER_TUBE);
        sharedMl += Math.max(contribution, minimumMl ?? 0);
      } else {
        unmeasuredTubes += 1;
        unmeasuredTests.push(test.testName);
      }
    });

    const sharedTubes = sharedMl > 0 ? Math.ceil(sharedMl / SST_USABLE_ML_PER_TUBE) : 0;
    return {
      sharedMl,
      sharedTubes,
      dedicatedTubes,
      unmeasuredTubes,
      unmeasuredTests,
      totalTubes: sharedTubes + dedicatedTubes + unmeasuredTubes
    };
  }

  function tigerSstEstimateForTests(tests) {
    let sharedMl = 0;
    let dedicatedTubes = 0;
    let unmeasuredTubes = 0;

    const pool = tests.filter(isSstDraw);
    const largePool = labcorpLargeCompatiblePool(pool);
    pool.forEach(test => {
      // Pool usable serum, not the 7.5 mL whole-blood draw volume.
      // Use the same pool-size policy as Gold SST.
      // Retain Tiger's existing recognition of totals and per-tube volumes;
      // change only the unit to usable serum mL, without blood conversion.
      const serumConversion = { factor: 1 };
      const preferredMl = volumeForRequirement(test, 'preferred', serumConversion);
      const minimumMl = volumeForRequirement(test, 'minimum', serumConversion);
      const plannedMl = planningTargetOrExistingVolume(test, preferredMl, minimumMl, largePool);
      const explicitCount = Math.max(explicitSstTubeCount(test), 1);

      const twoSstMinimum = needsTwoSstForMinimum(test);
      if (requiresDedicatedSst(test) || hasCollectionFillRule(test) || twoSstMinimum) {
        // Respect explicit multi-tube requirements, with the same >=4 mL
        // two-SST minimum policy used for Gold SST.
        const volumeFloor = !hasCollectionFillRule(test) && plannedMl !== null &&
          (specimenPlanningVolumeMl(test, largePool) !== null || reviewedSstComponentPolicy(test) ||
            (minimumMl === null && needsPreferredSerumYieldSstCount(test)))
          ? Math.ceil(plannedMl / TIGER_SST_USABLE_ML_PER_TUBE - 1e-9) : 1;
        dedicatedTubes += Math.max(explicitCount, twoSstMinimum ? 2 : 1, volumeFloor);
      } else if (plannedMl !== null) {
        const contribution = specimenPlanningVolumeMl(test, largePool) !== null || needsPreferredSerumYieldSstCount(test)
          ? plannedMl : Math.min(plannedMl, TIGER_SST_USABLE_ML_PER_TUBE);
        sharedMl += Math.max(contribution, minimumMl ?? 0);
      } else {
        unmeasuredTubes += 1;
      }
    });

    const sharedTubes = sharedMl > 0 ? Math.ceil(sharedMl / TIGER_SST_USABLE_ML_PER_TUBE) : 0;
    return {
      sharedMl,
      sharedTubes,
      dedicatedTubes,
      unmeasuredTubes,
      totalTubes: sharedTubes + dedicatedTubes + unmeasuredTubes
    };
  }

  function singleSstSpecimenVolumeLevel(test) {
    // Severity follows the same per-test Gold/Tiger SST yield assumptions as
    // the existing volume check. An explicit multi-tube order stays exempt.
    if (!isSstDraw(test) || requiresDedicatedSst(test) && explicitSstTubeCount(test) > 1) return '';
    // A minimum of at least 4 mL has an automatic 2-SST collection plan, even if
    // the selected Tiger SST has a 4 mL estimated yield.
    if (needsTwoSstForMinimum(test)) return 'minimum';
    const tiger = selectedSstIsTiger();
    const capacity = tiger ? TIGER_SST_USABLE_ML_PER_TUBE : SST_USABLE_ML_PER_TUBE;
    const preferred = tiger ? volumeForRequirement(test, 'preferred', { factor: 1 }) : parseVolumeMl(test.preferredVolume);
    const minimum = tiger ? volumeForRequirement(test, 'minimum', { factor: 1 }) : parseVolumeMl(test.minimumVolume);
    if (minimum !== null && minimum > capacity + 1e-8) return 'minimum';
    if (preferred !== null && preferred > capacity + 1e-8) return 'preferred';
    return '';
  }

  function singleSstSpecimenVolumeWarning(test) {
    const level = singleSstSpecimenVolumeLevel(test);
    const tube = selectedSstIsTiger() ? 'Tiger' : 'Gold';
    if (level === 'minimum') {
      return needsTwoSstForMinimum(test)
        ? 'Minimum is at least 4 mL: two SSTs planned (unless more explicitly required). Verify specimen volume with the receiving lab.'
        : `minimum required volume may exceed one ${tube} SST's assumed yield. Verify specimen volume with the receiving lab.`;
    }
    if (level === 'preferred') {
      return `preferred volume may exceed one ${tube} SST's assumed yield. Verify specimen sufficiency and collect additional tubes if needed.`;
    }
    return '';
  }

  // Reviewed catalog components whose collectionCount was derived from serum
  // yield rather than a required number of independent collection tubes.
  // Exact IDs, volumes, counts and notes protect manual edits and other tests.
  // Only SOURCE serum allocation is shared; each frozen submission stays separate.
  const REVIEWED_FROZEN_SST_SOURCE_ALLOCATIONS = Object.freeze({
    "labcorp-verified-20261118-batch35-551710": [
      "1.2 mL serum",
      "0.6 mL serum",
      1,
      1,
      "Serum pathway. Centrifuge within six hours, transfer serum to polypropylene screw-cap frozen transport tube, freeze and maintain frozen transit. Do not freeze original SST. Submit separate frozen aliquots for different orders; avoid heparin/SPS and hemolyzed specimens."
    ],
    "labcorp-verified-20261118-batch35-551750": [
      "1.2 mL serum",
      "0.6 mL serum",
      1,
      1,
      "Serum pathway. Centrifuge within six hours, transfer serum to polypropylene screw-cap frozen transport tube, freeze and maintain frozen transit. Do not freeze original SST. Submit separate frozen aliquots for different orders; avoid heparin/SPS and hemolyzed specimens."
    ],
    "labcorp-verified-20261118-batch36-254892::additional-draw-0": [
      "2 mL serum",
      "2 mL serum",
      1,
      1,
      "Centrifuge within 24 hours, transfer separated serum to a dedicated polypropylene screw-cap transport tube, then freeze. Do not freeze or open the dedicated HIV Ag/Ab SST. Maintain frozen transport; do not combine with other tests."
    ],
    "labcorp-verified-20261118-batch36-254937::additional-draw-0": [
      "2 mL serum",
      "2 mL serum",
      1,
      1,
      "Centrifuge within 24 hours, transfer separated serum to a dedicated polypropylene screw-cap transport tube, then freeze. Do not freeze or open the dedicated HIV Ag/Ab SST. Maintain frozen transport; do not combine with other tests."
    ],
    "labcorp-verified-20261118-batch36-254905::additional-draw-0": [
      "3 mL serum",
      "3 mL serum",
      2,
      1,
      "Centrifuge within 24 hours, transfer separated serum to a dedicated polypropylene screw-cap transport tube, then freeze. Do not freeze or open the dedicated HIV Ag/Ab SST. Maintain frozen transport; do not combine with other tests."
    ],
    "labcorp-verified-20261118-batch36-254951::additional-draw-0": [
      "3 mL serum",
      "3 mL serum",
      2,
      1,
      "Centrifuge within 24 hours, transfer separated serum to a dedicated polypropylene screw-cap transport tube, then freeze. Do not freeze or open the dedicated HIV Ag/Ab SST. Maintain frozen transport; do not combine with other tests."
    ],
    "labcorp-verified-20261118-batch36-254868::additional-draw-0": [
      "3 mL serum",
      "2.75 mL serum",
      2,
      1,
      "Centrifuge within 24 hours, transfer separated serum to a dedicated polypropylene screw-cap transport tube, then freeze. Do not freeze or open the dedicated HIV Ag/Ab SST. Maintain frozen transport; do not combine with other tests."
    ],
    "labcorp-verified-20261118-batch36-254736::additional-draw-0": [
      "3 mL serum",
      "2.75 mL serum",
      2,
      1,
      "Centrifuge within 24 hours, transfer separated serum to a dedicated polypropylene screw-cap transport tube, then freeze. Do not freeze or open the dedicated HIV Ag/Ab SST. Maintain frozen transport; do not combine with other tests."
    ],
    "labcorp-verified-20261118-batch36-254880::additional-draw-0": [
      "3.5 mL serum",
      "3.5 mL serum",
      2,
      1,
      "Centrifuge within 24 hours, transfer separated serum to a dedicated polypropylene screw-cap transport tube, then freeze. Do not freeze or open the dedicated HIV Ag/Ab SST. Maintain frozen transport; do not combine with other tests."
    ],
    "labcorp-verified-20261118-batch36-254801::additional-draw-0": [
      "3.5 mL serum",
      "3.5 mL serum",
      2,
      1,
      "Centrifuge within 24 hours, transfer separated serum to a dedicated polypropylene screw-cap transport tube, then freeze. Do not freeze or open the dedicated HIV Ag/Ab SST. Maintain frozen transport; do not combine with other tests."
    ],
    "labcorp-verified-20261118-batch36-254855::additional-draw-0": [
      "9 mL serum",
      "6 mL serum",
      4,
      2,
      "Centrifuge within 24 hours, transfer separated serum to 2 separate polypropylene screw-cap transport tubes of sufficient capacity, then freeze. Do not freeze or open the dedicated HIV Ag/Ab SST. Maintain frozen transport; do not combine with other tests. Use Labcorp-approved vials of adequate capacity with expansion headspace and confirm aliquot distribution with the receiving lab."
    ],
    "labcorp-verified-20261118-batch36-254842::additional-draw-0": [
      "10 mL serum",
      "6 mL serum",
      4,
      2,
      "Centrifuge within 24 hours, transfer separated serum to 2 separate polypropylene screw-cap transport tubes of sufficient capacity, then freeze. Do not freeze or open the dedicated HIV Ag/Ab SST. Maintain frozen transport; do not combine with other tests. Use Labcorp-approved vials of adequate capacity with expansion headspace and confirm aliquot distribution with the receiving lab."
    ],
    "labcorp-verified-20261118-batch36-254972::additional-draw-0": [
      "8 mL serum",
      "6 mL serum",
      4,
      2,
      "Centrifuge within 24 hours, transfer separated serum to 2 separate polypropylene screw-cap transport tubes of sufficient capacity, then freeze. Do not freeze or open the dedicated HIV Ag/Ab SST. Maintain frozen transport; do not combine with other tests. Use Labcorp-approved vials of adequate capacity with expansion headspace and confirm aliquot distribution with the receiving lab."
    ],
    "labcorp-verified-20261118-batch36-254988::additional-draw-0": [
      "9 mL serum",
      "6 mL serum",
      4,
      2,
      "Centrifuge within 24 hours, transfer separated serum to 2 separate polypropylene screw-cap transport tubes of sufficient capacity, then freeze. Do not freeze or open the dedicated HIV Ag/Ab SST. Maintain frozen transport; do not combine with other tests. Use Labcorp-approved vials of adequate capacity with expansion headspace and confirm aliquot distribution with the receiving lab."
    ],
    "labcorp-verified-20261118-batch36-083971::additional-draw-0": [
      "1 mL serum",
      "0.65 mL serum",
      1,
      1,
      "Centrifuge within 24 hours, transfer separated serum to a dedicated polypropylene screw-cap transport tube, then freeze. Do not freeze or open the dedicated HIV Ag/Ab SST. Maintain frozen transport; do not combine with other tests."
    ],
    "labcorp-verified-20261118-batch36-144149::additional-draw-0": [
      "2.5 mL serum",
      "0.7 mL serum",
      1,
      1,
      "Centrifuge within 24 hours and transfer 2.5 mL serum to a separate polypropylene screw-cap tube; freeze. Do not freeze the SST. Keep separate from other frozen tests."
    ],
    "labcorp-verified-20261118-batch37-144547::additional-draw-0": [
      "2.5 mL serum",
      "0.7 mL serum",
      1,
      1,
      "Centrifuge within 24 hours. Separate serum into a dedicated polypropylene screw-cap frozen transport tube; use a lab-approved vial with adequate capacity and freezing headspace. Keep frozen; do not combine with other tests."
    ],
    "labcorp-verified-20261118-batch37-144052": [
      "3 mL serum",
      "1 mL serum",
      2,
      1,
      "Centrifuge within 24 hours. Separate serum into a dedicated polypropylene screw-cap frozen transport tube; use a lab-approved vial with adequate capacity and freezing headspace. Keep frozen; do not combine with other tests. Serum route configured. Genotyping may fail with viral load below 2,500 IU/mL."
    ],
    "labcorp-verified-20261118-batch37-550688": [
      "4 mL serum",
      "2 mL serum",
      2,
      2,
      "Centrifuge within 6 hours. Separate serum into a dedicated polypropylene screw-cap frozen transport tube; use a lab-approved vial with adequate capacity and freezing headspace. Keep frozen; do not combine with other tests. Divide total required serum into two appropriate frozen vials if needed for capacity; confirm acceptance and identify both as paired aliquots. Serum route configured. Genotyping may fail with viral load below 2,500 IU/mL."
    ],
    "labcorp-verified-20261118-batch37-550683": [
      "5 mL serum",
      "2 mL serum",
      2,
      2,
      "Centrifuge within 6 hours. Separate serum into a dedicated polypropylene screw-cap frozen transport tube; use a lab-approved vial with adequate capacity and freezing headspace. Keep frozen; do not combine with other tests. Divide total required serum into two appropriate frozen vials if needed for capacity; confirm acceptance and identify both as paired aliquots. Serum route configured. Genotyping may fail with viral load below 2,500 IU/mL."
    ]
  });

  function reviewedFrozenSstSourceMl(test, largePool = true) {
    const reviewed = REVIEWED_FROZEN_SST_SOURCE_ALLOCATIONS[test.id];
    if (!Array.isArray(reviewed) || !isSstDraw(test) ||
        normalizeSpecimenType(test.specimenType).toLowerCase() !== 'serum' ||
        !isFrozenSerumPlasmaTransport(test, test.transportContainer) ||
        isOriginalContainerSubmission(test) || isSpunSstSubmission(test) ||
        !/^yes$/i.test(String(test.spin || '').trim()) ||
        String(test.specialLabeling || '').trim() || hasCollectionFillRule(test)) return null;
    if (test.preferredVolume !== reviewed[0] || test.minimumVolume !== reviewed[1] ||
        Number(test.collectionCount) !== reviewed[2] || Number(test.submissionCount) !== reviewed[3] ||
        String(test.specialInstructions || '').trim() !== reviewed[4]) return null;
    const ml = specimenPlanningVolumeMl(test, largePool) ?? parseVolumeMl(test.preferredVolume);
    return Number.isFinite(ml) && ml > 0 ? ml : null;
  }

  const REVIEWED_FROZEN_SST_SOURCE_KEY = 'reviewed-frozen-sst-source';
  function sstTransferGroupEstimate(group, tiger) {
    if (group.key !== REVIEWED_FROZEN_SST_SOURCE_KEY) {
      return tiger ? tigerSstEstimateForTests(group.tests) : sstEstimateForTests(group.tests);
    }
    const capacity = tiger ? TIGER_SST_USABLE_ML_PER_TUBE : SST_USABLE_ML_PER_TUBE;
    // Count reviewed compatible source orders, not required frozen vials.
    // Sum the appropriate targets before rounding once; no per-test cap.
    const largePool = uniqueTests(group.tests).length >= 10;
    const sharedMl = group.tests.reduce((sum, test) => sum + reviewedFrozenSstSourceMl(test, largePool), 0);
    const minimumFloor = group.tests.filter(needsTwoSstForMinimum).length * 2;
    const sharedTubes = Math.max(minimumFloor, Math.ceil(sharedMl / capacity - 1e-9));
    return { sharedMl, sharedTubes, dedicatedTubes: 0, unmeasuredTubes: 0,
      unmeasuredTests: [], totalTubes: sharedTubes };
  }

  function sstTransferDestinationGroups(tests) {
    const groups = new Map();
    tests.filter(isSstDraw).forEach(test => {
      const keys = reviewedFrozenSstSourceMl(test) !== null
        ? [REVIEWED_FROZEN_SST_SOURCE_KEY] : transferDestinationKeysForTest(test);
      keys.forEach(destinationKey => {
        if (!groups.has(destinationKey)) groups.set(destinationKey, []);
        groups.get(destinationKey).push(test);
      });
    });
    return Array.from(groups.entries()).map(([key, groupTests]) => ({ key, tests: uniqueTests(groupTests) }));
  }

  function tigerSstCollectionEstimateForTests(tests) {
    const sstTests = tests.filter(isSstDraw);
    const originalSubmissionTests = sstTests.filter(test => isSpunSstSubmission(test) || isOriginalContainerSubmission(test));
    const transferSourceTests = sstTests.filter(test => !originalSubmissionTests.includes(test));

    const originalEstimate = tigerSstEstimateForTests(originalSubmissionTests);
    const transferGroups = sstTransferDestinationGroups(transferSourceTests).map(group => ({
      ...group,
      estimate: sstTransferGroupEstimate(group, true)
    }));
    const transferSourceTubes = transferGroups.reduce((sum, group) => sum + group.estimate.totalTubes, 0);

    return {
      originalTubes: originalEstimate.totalTubes,
      transferSourceTubes,
      transferGroups,
      totalTubes: originalEstimate.totalTubes + transferSourceTubes
    };
  }

  function sstCollectionEstimateForTests(tests) {
    const sstTests = tests.filter(isSstDraw);
    const originalSubmissionTests = sstTests.filter(test => isSpunSstSubmission(test) || isOriginalContainerSubmission(test));
    const transferSourceTests = sstTests.filter(test => !originalSubmissionTests.includes(test));

    // Original-submit SSTs remain separate. Unreviewed transfer tests retain
    // existing destination-specific and explicit count rules. Reviewed compatible
    // frozen components share a volume-based source allocation within each bag.
    const originalEstimate = sstEstimateForTests(originalSubmissionTests);
    const transferGroups = sstTransferDestinationGroups(transferSourceTests).map(group => ({
      ...group,
      estimate: sstTransferGroupEstimate(group, false)
    }));
    const transferSourceTubes = transferGroups.reduce((sum, group) => sum + group.estimate.totalTubes, 0);
    const transferEstimate = { totalTubes: transferSourceTubes, groups: transferGroups };

    return {
      originalEstimate,
      transferEstimate,
      transferGroups,
      originalTubes: originalEstimate.totalTubes,
      transferSourceTubes,
      totalTubes: originalEstimate.totalTubes + transferSourceTubes
    };
  }

  function isLavenderDraw(test) {
    return tubeClass(test.drawContainer) === 'tube-lavender' && !collectionTubeException(test)?.label;
  }

  function isRedTopDraw(test) {
    return tubeClass(test.drawContainer) === 'tube-red';
  }

  function pooledCollectionMaterial(test) {
    const specimen = normalizeSpecimenType(test.specimenType);
    const volumeText = `${test.preferredVolume || ''} ${test.minimumVolume || ''}`.toLowerCase();
    if (/whole\s*blood/.test(volumeText) || specimen === 'Whole Blood') return 'whole blood';
    if (specimen === 'Plasma') return 'plasma';
    if (specimen === 'Serum') return 'serum';
    if (specimen === 'RBCs') return 'RBCs';
    return String(specimen || 'specimen').toLowerCase();
  }

  function pooledCollectionPath(test) {
    return isOriginalContainerSubmission(test) ? 'original' : 'transfer';
  }

  function transferDestinationKeysForTest(test) {
    if (isOriginalContainerSubmission(test)) return [];
    const keys = splitSubmissionContainers(test)
      .filter(container => !container.originalTube)
      .map(container => container.key)
      .filter(Boolean);
    if (keys.length) return Array.from(new Set(keys));
    const fallback = normalizeSearch(finalTransportContainer(test));
    return fallback ? [`transfer|${fallback}`] : ['transfer|verify'];
  }

  // Explicit lab requirements override the standard volume estimate.
  const COLLECTION_TUBE_EXCEPTIONS = Object.freeze({
    '001917': { count: 2, dedicated: true },
    '120089': { count: 3, dedicated: true },
    '007187': { count: 1, dedicated: true, label: 'Lavender EDTA (7 mL draw)' },
    '005595': { count: 1, dedicated: true, label: 'Green Heparin (5 mL draw)' },
    '182913': { count: 1, dedicated: true, label: 'Green Lithium Heparin (6 mL minimum in one tube)' },
    // BasoFunction orders require a single original large-volume sodium heparin tube.
    ...Object.fromEntries(
      '800039 826007 827149 827235 827243 827245 827301 827356 827363 827488 828165 828167 828223 828227 828232 828238 828253 828256 828257 828259 828263 828265 828267 829318'.split(' ').map(code =>
        [code, { count: 1, dedicated: true, label: 'Green Sodium Heparin (10 mL tube)' }]
      )
    )
  });

  function collectionTubeException(test) {
    return COLLECTION_TUBE_EXCEPTIONS[String(test.testCode || '').trim()] || null;
  }

  function requiredSourceSpecimenMl(test, largePool = false) {
    const description = String(test.preferredVolume || '');
    // Calibrated citrate tubes and alternative fill sizes are not aliquot volumes.
    if (/^\s*(?:one\s+|1\s+)?full\b[^;]{0,120}\b(?:tube|blue[- ]top|citrate)\b/i.test(description)) return null;
    const preferred = volumeForRequirement(test, 'preferred', {factor: 1});
    const minimum = volumeForRequirement(test, 'minimum', {factor: 1});
    return planningTargetOrExistingVolume(test, preferred, minimum, largePool);
  }

  function usableSourceSpecimenMl(test, material) {
    const cls = tubeClass(test.drawContainer);
    const exception = collectionTubeException(test);
    // Standard 4 mL light-blue, green, and lavender collection tubes:
    // planned plasma yield = 4 / 2.5 = 1.6 mL. Whole blood retains its
    // nominal fill capacity. Explicit 5/6/9 mL tubes remain separate.
    if (['tube-blue', 'tube-green', 'tube-lavender'].includes(cls)) {
      const drawMl = exception && exception.tubeMl ? exception.tubeMl : WHOLE_BLOOD_USABLE_ML_PER_TUBE;
      return drawMl / (material === 'whole blood' ? 1 : SERUM_PLASMA_TO_WHOLE_BLOOD_FACTOR);
    }
    return pooledCollectionCapacity(material);
  }

  function recommendedCollectionTubesForTest(test, largePool = false) {
    const explicit = explicitCollectionCount(test);
    const exception = collectionTubeException(test);
    if (/^Streck cfDNA Tube\b/i.test(test.drawContainer || '')) return explicit;
    if (exception && exception.count) return Math.max(explicit, exception.count);
    // Lab-prescribed multiple distinct tubes/timepoints and calibrated fills
    // are authoritative, not candidates for a smaller collection count.
    if (explicit > 1) return explicit;
    // The one-fifth target excludes fill-rule records; keep the existing conservative
    // volume-derived count when a calibrated tube has a numeric requirement.
    const volume = requiredSourceSpecimenMl(test, largePool);
    if (volume === null || volume <= 0) return explicit;
    return Math.max(explicit, Math.ceil(volume / usableSourceSpecimenMl(test, pooledCollectionMaterial(test)) - 1e-9));
  }

  function pooledCollectionCapacity(material) {
    return material === 'whole blood'
      ? WHOLE_BLOOD_USABLE_ML_PER_TUBE
      : PROCESSED_SPECIMEN_USABLE_ML_PER_TUBE;
  }

  function requiresDedicatedCollectionTube(test) {
    if (requiresDistinctDrawTransport(test)) return true;
    const text = `${test.drawContainer || ''} ${test.preferredVolume || ''} ${test.minimumVolume || ''} ${test.specialInstructions || ''}`.toLowerCase();
    return /\bdedicated(?:\s+collection)?\s+tube\b|\bown\s+tube\b|\bdo\s+not\s+share\b|\bfull\s+(?:lavender|red(?:-top)?|edta|collection)?\s*tube\b|\b(?:each|individual)\s+(?:lavender|red(?:-top)?|edta|collection)\s+tube\b/.test(text)
      || explicitCollectionCount(test) > 1
      || Boolean(collectionTubeException(test)?.dedicated);
  }

  function pooledTubeEstimateForTests(tests, material) {
    const capacityMl = pooledCollectionCapacity(material);
    let sharedMl = 0;
    let sharedTubeEquivalents = 0;
    let dedicatedTubes = 0;
    let unmeasuredTubes = 0;
    const largePool = labcorpLargeCompatiblePool(tests);
    tests.forEach(test => {
      const volume = requiredSourceSpecimenMl(test, largePool);
      const tubes = recommendedCollectionTubesForTest(test, largePool);
      if (requiresDedicatedCollectionTube(test) || hasCollectionFillRule(test) || tubes > 1) {
        dedicatedTubes += tubes;
      } else if (volume !== null) {
        sharedMl += volume;
        sharedTubeEquivalents += volume / usableSourceSpecimenMl(test, material);
      } else {
        unmeasuredTubes++;
      }
    });
    const sharedTubes = Math.ceil(sharedTubeEquivalents - 1e-9);
    return { capacityMl, sharedMl, sharedTubes, dedicatedTubes, unmeasuredTubes,
      totalTubes: sharedTubes + dedicatedTubes + unmeasuredTubes };
  }

  function pooledCollectionEstimateForTests(tests, matchesTube) {
    const groups = new Map();
    tests.filter(matchesTube).forEach(test => {
      const material = pooledCollectionMaterial(test);
      const path = pooledCollectionPath(test);
      const isBloodTransfer = path === 'transfer' && collectionSpecimenGroupForTest(test) === 'blood';
      const destinationKeys = isBloodTransfer ? transferDestinationKeysForTest(test) : [''];

      // For blood transfers, keep each destination submission card in its own
      // source-tube pool. This intentionally draws an extra tube when needed so
      // every From pill can carry a number and the pill totals reconcile exactly
      // to the source-for-transfer count in What to Collect.
      destinationKeys.forEach(destinationKey => {
        const key = `${path}|${normalizeSearch(material)}|${destinationKey}`;
        if (!groups.has(key)) groups.set(key, { key, path, material, destinationKey, tests: [] });
        groups.get(key).tests.push(test);
      });
    });

    const estimatedGroups = Array.from(groups.values()).map(group => ({
      ...group,
      tests: uniqueTests(group.tests),
      estimate: pooledTubeEstimateForTests(uniqueTests(group.tests), group.material)
    }));

    return {
      groups: estimatedGroups,
      totalTubes: estimatedGroups.reduce((sum, group) => sum + group.estimate.totalTubes, 0)
    };
  }

  function buildTransportBagPlan(tests) {
    const bags = new Map();
    tests.forEach(test => {
      const info = transportBagInfo(test);
      const isStat = Boolean(test.isStat);
      const key = `${isStat ? 'stat' : 'routine'}-${info.key}`;
      if (!bags.has(key)) bags.set(key, { ...info, key, isStat,
        order: info.order + (isStat ? 0 : 10),
        label: isStat ? `STAT · ${info.label}` : info.label,
        className: `${info.className}${isStat ? ' bag-stat' : ''}`, tests: [] });
      bags.get(key).tests.push(test);
    });

    return Array.from(bags.values())
      .sort((a, b) => a.order - b.order)
      .map(bag => ({
        ...bag,
        sstEstimate: sstCollectionEstimateForTests(bag.tests),
        tigerSstEstimate: tigerSstCollectionEstimateForTests(bag.tests),
        lavenderEstimate: pooledCollectionEstimateForTests(bag.tests, isLavenderDraw),
        redTopEstimate: pooledCollectionEstimateForTests(bag.tests, isRedTopDraw)
      }));
  }

  function isUrineTest(test) {
    return /urine/.test(String(test.specimenType || '').toLowerCase());
  }

  function urineCollectionType(test) {
    if (!isUrineTest(test)) return { key: '', label: '' };

    // Classify the REQUIRED urine collection from high-signal specimen fields.
    // Do not classify from general notes/reject criteria because phrases such as
    // “24-hour urine unacceptable,” “within 24 hours,” or “do not use first morning”
    // describe exclusions/timing, not the specimen the nurse should collect.
    // Duration belongs to the specimen protocol, not the stock jug label.
    // A 12-hour collection may use a jug sold as a "24 Hour Urine Container".
    const protocolText = `${test.testName || ''} ${test.specimenType || ''}`.toLowerCase();
    if (/\b12\s*[- ]?\s*(?:hours?|hrs?)\b|\b12h\b/.test(protocolText)) {
      return { key: '12-hour-urine', label: '12-hour urine' };
    }
    const requirementText = `${test.testName || ''} ${test.specimenType || ''} ${test.drawContainer || ''} ${test.preferredVolume || ''} ${test.minimumVolume || ''}`.toLowerCase();
    const instructions = String(test.specialInstructions || '').toLowerCase();

    if (/24\s*[- ]?hour|24\s*hr|24h\b/.test(requirementText)) {
      return { key: '24-hour-urine', label: '24-hour urine' };
    }
    if (/\btimed(?:\s+urine|\s+collection)?\b/.test(requirementText)) {
      return { key: 'timed-urine', label: 'Timed urine' };
    }
    if (/first[- ]?morning|first\s+morning|first\s+voided\s+(?:morning\s+)?urine/.test(requirementText)) {
      return { key: 'first-morning-urine', label: 'First-morning urine' };
    }
    if (/first[- ]?catch|initial urine stream/.test(requirementText)
        || /first[- ]?catch\s+urine|initial urine stream/.test(instructions)) {
      return { key: 'first-catch-urine', label: 'First-catch urine' };
    }
    return { key: 'random-urine', label: 'Random urine' };
  }

  function requiresSeparateUrineCollection(test) {
    if (!isUrineTest(test)) return false;
    if (explicitCollectionCount(test) > 1) return true;
    // Only explicit collection-level separation should prevent sharing.
    // Instructions about separate transport tubes, preservative tubes, bags,
    // or unacceptable specimens do not by themselves require another cup.
    const notes = `${test.drawContainer || ''} ${test.specialInstructions || ''}`.toLowerCase();
    return /\b(?:collect|obtain|provide|requires?|use)\s+(?:a[n]?\s+)?(?:separate|additional|dedicated|second|new)\s+(?:urine\s+)?(?:specimen|sample|collection|cup|container)\b/.test(notes)
      || /\b(?:separate|additional|dedicated)\s+(?:urine\s+)?(?:specimen|sample|collection|cup)\s+(?:is\s+)?(?:required|needed)\b/.test(notes)
      || /\b(?:do not|don't|must not)\s+(?:pool|combine|share)\s+(?:(?:the|this|urine|collection)\s+)?(?:specimens?|samples?|urine)\b/.test(notes);
  }

  function isShareableUrineCupTest(test) {
    return isUrineTest(test)
      && ['random-urine', 'first-morning-urine', 'first-catch-urine'].includes(urineCollectionType(test).key)
      && canonicalCollectionContainer(test).label === 'Sterile cup'
      && !/metal[- ]?free|trace[- ]?metal|trace element|acid[- ]?washed|acid[- ]?preserv|6\s*N\s*HCl/i.test(String(test.transportContainer || ''))
      && !requiresSeparateUrineCollection(test);
  }

  function isShareableStoolSourceTest(test) {
    // Pool only ordinary stool specimens collected from the same bowel movement.
    // Timed total-stool collections, trace-metal containers, explicitly separate
    // specimens, and other specialty sources must keep their own collection.
    if (collectionSpecimenGroupForTest(test) !== 'stool' || explicitCollectionCount(test) > 1) return false;
    const notes = `${test.drawContainer || ''} ${test.specialInstructions || ''}`.toLowerCase();
    if (/\b(?:do not|don't|must not|cannot)\s+(?:pool|combine|share)\b|\b(?:separate|additional|dedicated)\s+(?:stool\s+)?(?:specimen|sample|collection|container)\b|\b(?:collect|obtain|provide)\s+(?:a\s+)?(?:second|separate|additional)\s+(?:stool\s+)?(?:specimen|sample|collection)\b|\b\d+\s*[- ]?\s*(?:hour|hr|day)\s+(?:total\s+)?stool\s+collection\b/.test(notes)) return false;
    const source = canonicalCollectionContainer(test);
    if (source.className === 'tube-urine-cup') return true;
    // Total-Fix workflows explicitly require transferring FRESH STOOL to the vial.
    // A clean collection cup may be the shared pre-transfer source only when
    // the entry confirms that step, and the transfer time still must be met.
    if (source.className === 'tube-total-fix') {
      return /(?:transfer|add|place)\b[^.]{0,140}\bstool\b[^.]{0,90}\b(?:total[- ]?fix|vial)\b|\btransfer\b[^.]{0,140}\btotal[- ]?fix\b|\bpass specimen into a clean dry container\b/i.test(notes);
    }
    return false;
  }

  function is24HourUrineTest(test) {
    return urineCollectionType(test).key === '24-hour-urine';
  }

  function isTimedUrineTest(test) {
    if (!isUrineTest(test)) return false;
    // A first-catch specimen is not a timed urine collection jug.
    return ['12-hour-urine', 'timed-urine', '24-hour-urine'].includes(urineCollectionType(test).key);
  }

  // Count the original timed-urine source once when the same collection
  // genuinely supplies multiple independent submitted aliquots. Shipping
  // temperature does not create another 24-hour patient collection.
  function shareableTimedUrineSourceKey(test, info) {
    if (!isTimedUrineTest(test) || info.className !== 'tube-24h-urine'
        || requiresSeparateUrineCollection(test)
        || explicitCollectionCount(test) !== 1
        || isOriginalContainerSubmission(test)) return '';
    // Labcorp specialty 501533 has conflicting preservative/shipping guidance
    // between the hospital CDOS record and direct Esoterix instructions.
    // Never assume that its source can be shared until the route is resolved.
    if (String(test.testCode || '').trim() === '501533') return '';
    const text = `${test.drawContainer || ''} ${test.specialInstructions || ''}`.toLowerCase();
    const unpreserved = /\b(?:unpreserved|preservative[- ]?free|no[- ]?acid(?:[- ]?preservative)?|no\s+preservative|without\s+(?:acid|preservative))\b/.test(text);
    // A prohibition such as "acid-preserved source containers are not used"
    // is not evidence that acid is a required preservative.
    const explicitlyRejectsAcid = /\b(?:acid[- ]?preserved|hydrochloric\s+acid|6\s*n\s*hcl)\b[^.;]{0,100}\b(?:not\s+(?:used|accepted|required|allowed)|rejected|prohibited)\b|\b(?:do not use|avoid|never use)\b[^.;]{0,100}\b(?:acid[- ]?preserved|hydrochloric\s+acid|hcl)\b/.test(text);
    const acidPreserved = /\b(?:6\s*n\s*hcl|hydrochloric\s+acid|acid[- ]?preserved|acidified\s+urine)\b/.test(text)
      && !explicitlyRejectsAcid;
    if (unpreserved === acidPreserved) return '';
    return [urineCollectionType(test).key, info.key,
      acidPreserved ? 'acid-preserved' : 'unpreserved'].join('|');
  }

  function listedTimedUrineAliquotMl(test) {
    const stated = String(test.preferredVolume || '');
    const multiple = stated.match(/\b(?:two|2)\s+(\d+(?:\.\d+)?)\s*mL\s+aliquots?\b/i);
    if (multiple) return 2 * Number(multiple[1]);
    const single = stated.match(/\b(\d+(?:\.\d+)?)\s*mL\b/i);
    return single ? Number(single[1]) : null;
  }

  function describeTimedUrineSource(item) {
    const tests = uniqueTests(item.tests || []);
    const aliquots = tests.map(listedTimedUrineAliquotMl);
    const knownVolume = aliquots.every(value => value !== null);
    const volume = knownVolume ? aliquots.reduce((sum, value) => sum + value, 0) : null;
    const submissions = buildTransportBagPlan(tests)
      .map(bag => ({
        label: bag.label,
        count: buildSubmissionContents(bag).filter(part => !part.originalTube)
          .reduce((sum, part) => sum + part.count, 0)
      }))
      .filter(entry => entry.count > 0);
    const count = submissions.reduce((sum, entry) => sum + entry.count, 0);
    const bags = submissions.map(entry => `${entry.label}: ${entry.count}`).join(' · ');
    const shared = tests.length > 1 ? 'One shared original urine collection' : 'Original urine collection';
    return `${shared}; measure and mix the full timed volume. Transfer to ${count} separately labeled submission ${count === 1 ? 'container' : 'containers'}${volume !== null ? ` (listed aliquots total ${formatMl(volume)})` : ''}. ${bags}. The original collection jug is not an additional shipping container.`;
  }

  function uniqueTests(tests) {
    const seen = new Set();
    return tests.filter(test => {
      const key = test.sourceTestId || test.id;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  function canonicalCollectionContainer(test) {
    const draw = String(test.drawContainer || 'Verify collection container').trim();
    // Keep the EXACT original device name on both the collection card and
    // submission card for swabs, including Aptima and Amies variants.
    if (/\bswab\b/i.test(String(test.specimenType || '')) &&
        normalizeSearch(draw) === normalizeSearch(test.transportContainer || '')) {
      return { key: 'original-swab|' + normalizeSearch(draw), label: draw,
        className: tubeClass(draw) || 'tube-transport' };
    }
    // A clean sterile cup is not interchangeable with a metal-free, acid-
    // washed, or specially preserved urine collection device.
    const requiresSpecialSource = /metal[- ]?free|trace[- ]?metal|trace element|acid[- ]?washed|acid[- ]?preserv|6\s*N\s*HCl|specific gravity preservation|preloaded\s+preserv|aptima|cobas|uri[- ]?sponge|boric|gray[- ]?top|red\s*\/\s*yellow|swirl|cary[- ]?blair|dedicated\s+kit/i.test(draw);
    if (isUrineTest(test) && !isTimedUrineTest(test) && !requiresSpecialSource &&
        (cleanCollectionContainer(draw) === 'Sterile cup' ||
         isPlainUrineAliquotTransport(test, draw) ||
         /^(?:random|spot|first[- ]?(?:catch|morning))?\s*urine(?:\s+(?:sample|specimen|collection))?$/i.test(draw))) {
      return { key: 'sterile-urine-cup', label: 'Sterile cup', className: 'tube-urine-cup' };
    }

    if (isUrineTest(test) && requiresSpecialSource) {
      const specialtyClass = /metal[- ]?free|trace[- ]?metal|trace element|acid[- ]?washed/i.test(draw)
        ? 'tube-trace-metal-container' : (tubeClass(draw) || 'tube-transport');
      return { key: 'special-urine|' + normalizeSearch(draw),
        label: draw, className: specialtyClass };
    }
    // Older timed urine catalog rows use '24-Hour Urine Collection' rather
    // than 'Container' or 'Jug'. Keep the exact preservation qualifier and
    // provide the correct source-device icon without inventing a new route.
    const rawClass = tubeClass(draw);
    const timedJugAlias = !rawClass && isTimedUrineTest(test) && /(?:24\s*[- ]?hour|24h\b|\btimed)\s+urine\s+(?:collection|container|jug)\b/i.test(draw);
    const cls = timedJugAlias ? 'tube-24h-urine' : rawClass;
    const labels = {
      'tube-nmr-lipotube': 'NMR LipoTube (Black/Yellow)',
      'tube-culture': 'Blood Culture Bottles',
      'tube-blue': 'Light Blue Citrate',
      'tube-sst': selectedSstLabel(),
      'tube-microtainer': draw,
      'tube-lavender': 'Lavender EDTA',
      'tube-pink': 'Pink EDTA',
      'tube-tan': /heparin/i.test(draw) ? 'Tan Sodium Heparin' : 'K2 EDTA Tan Top',
      'tube-green': /sodium\s+heparin/i.test(draw)
        ? 'Green Sodium Heparin'
        : /lithium\s+heparin/i.test(draw)
          ? 'Green Lithium Heparin'
          : 'Green Heparin — verify additive',
      'tube-red': 'Red Top',
      'tube-royal-edta': 'Royal Blue EDTA (purple stripe)',
      'tube-royal-no-additive': 'Royal Blue No Additive (red stripe)',
      'tube-royal-heparin': 'Royal Blue Sodium Heparin',
      'tube-royal': 'Royal Blue — verify additive',
      'tube-gray': 'Gray Fluoride / Oxalate Blood Tube',
      'tube-yellow': 'Yellow ACD',
      'tube-aptima': 'Aptima Multitest Transport Tube (orange label)',
      'tube-total-fix': 'Total-Fix® Transport Vial',
      'tube-trace-metal-container': 'Trace Metal-Free Plastic Container',
      'tube-24h-urine': '24-Hour Urine Container',
      'tube-urine-cup': 'Sterile cup',
      'tube-ua-swirl': 'Red/Yellow Swirl UA Preservative Tube',
      'tube-urine-culture': 'Gray-Top Urine Culture Preservative Tube'
    };
    const label = collectionTubeException(test)?.label || (timedJugAlias ? draw : labels[cls]) || draw;
    return { key: `${cls || 'other'}|${normalizeSearch(label)}`, label, className: cls };
  }

  function numberWordValue(value) {
    const words = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8 };
    if (/^\d+$/.test(String(value))) return Number(value);
    return words[String(value).toLowerCase()] || 0;
  }

  function explicitCollectionCount(test) {
    const structured = Math.floor(Number(test.collectionCount) || 1);
    if (structured > 1) return structured;

    const draw = String(test.drawContainer || '').toLowerCase();
    const note = String(test.specialInstructions || '').toLowerCase();
    const countPattern = '(\\d+|one|two|three|four|five|six|seven|eight)';

    // A count in the structured draw-container field is reliable when the number
    // directly describes tubes/bottles/containers. Do not infer counts from specimen
    // mass, time, RCF/RPM, tube dimensions, identifiers, test codes, or K2 additive text.
    const drawPattern = new RegExp(`(?:^|\\s)${countPattern}\\s*(?:x|×)?\\s*(?:full\\s+|separate\\s+|standard\\s+){0,2}(?:[a-z][a-z /-]{0,24}\\s+)?(?:tubes?|bottles?|containers?)\\b`);
    const drawMatch = draw.match(drawPattern);
    // A number describing the COLLECTION DURATION is never a count of
    // physical jugs. "24 Hour Urine Container" means one source jug.
    if (isTimedUrineTest(test) &&
        /^\s*(?:12|24)\s*[- ]?\s*(?:hours?|hrs?)\s+urine\s+(?:container|collection|jug)\b/.test(draw)) return 1;
    if (drawMatch && !/\b(?:ml|g|gram|grams|mg|mm|cm|hours?|hrs?|minutes?|mins?|days?|rcf|rpm)\b/.test(drawMatch[0])) {
      return Math.max(numberWordValue(drawMatch[1]), 1);
    }

    // Free text is intentionally strict. Only explicit instructions such as
    // “Draw 3 tubes” or “Collect 4 separate EDTA tubes” create extra collection
    // tubes. This prevents phrases like “10 g ... into the container”, “2 hours”,
    // “1600 RCF”, “K2 EDTA”, and “two patient identifiers” from changing counts.
    const actionPattern = new RegExp(`\\b(?:draw|collect|use|requires?|obtain)\\s+(?:blood\\s+(?:in|into)\\s+)?${countPattern}\\s*(?:x|×)?\\s*(?:full\\s+|separate\\s+|standard\\s+){0,2}(?:[a-z][a-z /-]{0,24}\\s+)?(?:tubes?|bottles?|containers?)\\b`);
    const actionMatch = note.match(actionPattern);
    if (actionMatch && !/\b(?:ml|g|gram|grams|mg|mm|cm|hours?|hrs?|minutes?|mins?|days?|rcf|rpm|identifiers?)\b/.test(actionMatch[0])) {
      return Math.max(numberWordValue(actionMatch[1]), 1);
    }

    return 1;
  }

  function pooledCollectionGroupLabel(group) {
    if (group.path === 'original') {
      return group.material === 'whole blood' ? 'whole blood' : `original ${group.material}`;
    }
    return `source for ${group.material}`;
  }

  function pooledCollectionDetailParts(estimate) {
    const totals = new Map();
    (estimate.groups || []).filter(group => group.estimate.totalTubes > 0).forEach(group => {
      const label = pooledCollectionGroupLabel(group);
      totals.set(label, (totals.get(label) || 0) + group.estimate.totalTubes);
    });
    return Array.from(totals.entries()).map(([label, count]) => `${count} ${label}`);
  }

  function addPooledCollectionItem(items, tests, bags, options) {
    const matchingTests = tests.filter(options.matchesTube);
    const total = bags.reduce((sum, bag) => sum + bag[options.estimateKey].totalTubes, 0);
    if (!total) return;

    const detail = bags
      .filter(bag => bag[options.estimateKey].totalTubes > 0)
      .map(bag => {
        const parts = pooledCollectionDetailParts(bag[options.estimateKey]);
        return `${bag.label.replace(/ bag$/i, '')}: ${parts.join(' + ')}`;
      })
      .join(' · ');

    items.push({
      key: options.key,
      label: options.label,
      className: options.className,
      count: total,
      tests: uniqueTests(matchingTests),
      detail
    });
  }

  function isAdditionalPoolableBloodDraw(test) {
    const specimen = String(test.specimenType || '').toLowerCase();
    if (!/blood|plasma|serum|rbcs?|platelet/.test(specimen)) return false;
    const cls = tubeClass(test.drawContainer);
    if (cls === 'tube-lavender') return Boolean(collectionTubeException(test)?.label);
    return ['tube-blue', 'tube-green', 'tube-pink', 'tube-tan', 'tube-royal', 'tube-royal-edta',
      'tube-royal-no-additive', 'tube-royal-heparin', 'tube-gray', 'tube-yellow'].includes(cls);
  }

  function addAdditionalPooledBloodItems(items, tests, bags) {
    const containerGroups = new Map();
    tests.filter(isAdditionalPoolableBloodDraw).forEach(test => {
      const info = canonicalCollectionContainer(test);
      const groupKey = requiresDistinctDrawTransport(test)
        ? `${info.key}|required-draw|${test.id}` : info.key;
      if (!containerGroups.has(groupKey)) containerGroups.set(groupKey, { ...info, key: groupKey, tests: [] });
      containerGroups.get(groupKey).tests.push(test);
    });

    containerGroups.forEach(containerGroup => {
      let total = 0;
      const details = [];
      bags.forEach(bag => {
        const bagTests = bag.tests.filter(test => containerGroup.tests.includes(test));
        if (!bagTests.length) return;
        const estimate = pooledCollectionEstimateForTests(bagTests, () => true);
        total += estimate.totalTubes;
        if (estimate.totalTubes) {
          const parts = pooledCollectionDetailParts(estimate);
          details.push(`${bag.label.replace(/ bag$/i, '')}: ${parts.join(' + ')}`);
        }
      });
      if (!total) return;
      items.push({
        key: containerGroup.key,
        label: containerGroup.label,
        className: containerGroup.className,
        count: total,
        tests: uniqueTests(containerGroup.tests),
        detail: details.join(' · ')
      });
    });
  }

  function collectionSpecimenGroupForTest(test) {
    // Classify by the actual required specimen, not the test title. Names such
    // as Maple Syrup Urine Disease and Thiopurine are BLOOD tests; relying on
    // substrings in the title incorrectly grouped them with urine specimens.
    const specimen = String(test.specimenType || '').toLowerCase().trim();
    if (/\bstool\b|\bfeces\b|\bfecal\b|\bfaecal\b/.test(specimen)) return 'stool';
    if (/\burine\b|\burinary\b/.test(specimen)) return 'urine';
    if (/\bserum\b|\bplasma\b|\bblood\b|\brbcs?\b|\berythrocytes?\b/.test(specimen)) return 'blood';
    return 'other';
  }

  function collectionSpecimenGroupForItem(item) {
    const groups = new Set((item.tests || []).map(collectionSpecimenGroupForTest));
    if (groups.size === 1) return Array.from(groups)[0];
    if (groups.has('blood')) return 'blood';
    if (groups.has('urine')) return 'urine';
    if (groups.has('stool')) return 'stool';
    return 'other';
  }

  // Specimen identity is independent of tube stock. Display the correct color
  // even on original Transport Tubes, not only on Sterile cups.
  function collectionSpecimenBadgesForItem(item) {
    const badges = new Map();
    uniqueTests(item.tests || []).forEach(test => {
      const specimen = normalizeSpecimenType(test.specimenType);
      const value = specimen.toLowerCase().trim();
      const group = collectionSpecimenGroupForTest(test);
      let badge = null;
      if (group === 'urine') {
        badge = { label: urineCollectionType(test).label || 'Urine', kind: 'urine' };
      } else if (group === 'stool') {
        badge = { label: 'Stool', kind: 'stool' };
      } else if (/\bcsf\b|cerebrospinal/.test(value)) {
        badge = { label: 'CSF', kind: 'csf' };
      } else if (/\bsputum\b/.test(value)) {
        badge = { label: 'Sputum', kind: 'sputum' };
      } else if (group !== 'blood' &&
        (/\b(?:fluid|fluids|effusion|ascites|ascitic|drainage|saliva|semen|bile|synovial|pleural|peritoneal|pericardial|amniotic|joint|bursal|aqueous|vitreous)\b/.test(value) ||
         /\b(?:jp|joint)\s+aspirate\b/.test(value))) {
        badge = { label: /^(?:body|bodily)\s+fluid$/i.test(specimen) ? 'Body Fluid' : titleCaseSpecimen(specimen), kind: 'fluid' };
      }
      if (badge) badges.set(badge.kind + '|' + badge.label.toLowerCase(), badge);
    });
    return Array.from(badges.values());
  }

  function collectionSpecimenBadgeForItem(item) {
    const badges = collectionSpecimenBadgesForItem(item);
    return badges.length === 1 ? badges[0].label : '';
  }

  function collectionSpecimenBadgeKindForItem(item) {
    const badges = collectionSpecimenBadgesForItem(item);
    return badges.length === 1 ? badges[0].kind : 'other';
  }

  function collectionMergeSubtypeForItem(item) {
    const tests = uniqueTests(item.tests || []);
    const groups = new Set(tests.map(collectionSpecimenGroupForTest));
    if (groups.size !== 1) return 'mixed';
    const group = Array.from(groups)[0];
    if (group === 'urine') {
      const keys = Array.from(new Set(tests.map(test => urineCollectionType(test).key).filter(Boolean)));
      return keys.length === 1 ? keys[0] : 'urine-mixed';
    }
    return group;
  }

  function printSstTigerBadge(item) {
    return '';
  }

  function groupSwabCollectionCardsForPrint(items) {
    const groups = new Map();
    const cards = [];
    items.forEach(item => {
      if (!item.tests.length || !item.tests.every(test => /\bswabs?\b/i.test(test.specimenType || ''))) {
        cards.push(item);
        return;
      }
      const key = [item.className, normalizeSearch(item.label), Boolean(item.isStat)].join('|');
      let group = groups.get(key);
      if (!group) {
        group = { ...item, tests: [...item.tests], details: new Set() };
        groups.set(key, group);
        cards.push(group);
      } else {
        group.count += item.count;
        group.tests = uniqueTests([...group.tests, ...item.tests]);
      }
      if (item.detail) group.details.add(item.detail);
    });
    groups.forEach(group => {
      group.detail = [...group.details].join(' · ');
    });
    return cards;
  }

  function printCollectionGroups(items, wholeBloodGroups) {
    items = groupSwabCollectionCardsForPrint(items);
    const cards = items.map(item => {
      const specimenBadges = collectionSpecimenBadgesForItem(item).map(({ label, kind }) =>
        `<span class="print-collection-specimen-badge specimen-${kind}">${escapeHtml(label)}</span>`).join('');
      const tigerBadge = printSstTigerBadge(item);
      const microtainerBadge = /^tube-microtainer\b/.test(item.className) ? '<span class="microtainer-flag">MICROTAINER</span>' : '';
      const printedTestCount = uniqueTests(item.tests).length;
      // Keep each SST collection card in one half-width column, even when
      // it holds many tests. Pair the list into two internal print columns.
      const longSstList = item.className === 'tube-sst' && printedTestCount >= 9;
      const columnRows = Math.ceil(printedTestCount / (longSstList ? 2 : 3));
      const yieldReviewTests = item.className === 'tube-sst'
        ? uniqueTests(item.tests).filter(test => singleSstSpecimenVolumeLevel(test)) : [];
      const twoSstTests = yieldReviewTests.filter(test => needsTwoSstForMinimum(test));
      const minimumYieldTests = yieldReviewTests.filter(test => singleSstSpecimenVolumeLevel(test) === 'minimum' && !needsTwoSstForMinimum(test));
      const preferredYieldTests = yieldReviewTests.filter(test => singleSstSpecimenVolumeLevel(test) === 'preferred');
      return `<article class="print-collection-card${longSstList ? ' is-sst-long' : printedTestCount >= 12 ? ' is-long' : ''}" style="--print-column-rows:${columnRows}">
        <div class="print-container-count"><strong>${item.count}</strong><span class="tube ${item.displayClassName || item.className}">${escapeHtml(item.label)}</span>${tigerBadge}${microtainerBadge}${specimenBadges ? `<span class="print-collection-specimen-list">${specimenBadges}</span>` : ''}${printCollectionWholeBloodDetail(item, wholeBloodGroups)}</div>
        ${item.detail ? `<div class="print-container-detail">${escapeHtml(item.detail)}</div>` : ''}
        ${/^tube-microtainer\b/.test(item.className) ? '<div class="print-microtainer-note">Microcollection tubes · follow the test-specific Microtainer instructions.</div>' : ''}
        ${yieldReviewTests.length ? `<div class="print-sst-volume-warning">
          <div class="print-sst-volume-summary">
            <strong>Volume check</strong>
            <span>${selectedSstIsTiger() ? 'Tiger' : 'Gold'} SST · ${selectedSstIsTiger() ? '4' : '2.5'} mL estimated serum yield</span>
          </div>
          ${twoSstTests.length ? `<div class="print-sst-volume-tier is-minimum">
            <strong>2 SSTs planned (minimum ≥4 mL):</strong>
            <span>${twoSstTests.map(test => `<b>${escapeHtml(displayCode(test))}</b>`).join(' · ')}</span>
          </div>` : ''}
          ${minimumYieldTests.length ? `<div class="print-sst-volume-tier is-minimum">
            <strong>Minimum exceeds one SST yield:</strong>
            <span>${minimumYieldTests.map(test => `<b>${escapeHtml(displayCode(test))}</b>`).join(' · ')}</span>
          </div>` : ''}
          ${preferredYieldTests.length ? `<div class="print-sst-volume-tier is-preferred">
            <strong>Preferred exceeds yield:</strong>
            <span>${preferredYieldTests.map(test => `<b>${escapeHtml(displayCode(test))}</b>`).join(' · ')}</span>
          </div>` : ''}
          <div class="print-sst-volume-action">Verify specimen volume with receiving lab.</div>
        </div>` : ''}
        <div class="print-for-tests"><b>For ${item.tests.length} ${item.tests.length === 1 ? 'test' : 'tests'}:</b><ul>${uniqueTests(item.tests).map(test => `<li${item.className === 'tube-sst' && singleSstSpecimenVolumeLevel(test) ? ` class="is-volume-warning-test is-volume-${singleSstSpecimenVolumeLevel(test)}"` : ''}><strong>${escapeHtml(displayCode(test))}</strong> ${escapeHtml(test.testName)}${test.isStat ? '<span class="print-collection-stat-label"> · STAT</span>' : ''}${manualTestInlineTag(test)}</li>`).join('')}</ul></div>
         ${printManualCardWarning(item.tests)}
      </article>`;
    });
    // A printed page can start between rows, never halfway through either
    // card in a pair. Do not change the two-column presentation or tube math.
    const rows = [];
    const fullWidth = item => item.className !== 'tube-sst' &&
      uniqueTests(item.tests).length >= 12;
    for (let i = 0; i < cards.length;) {
      const next = !fullWidth(items[i]) && i + 1 < cards.length &&
        !fullWidth(items[i + 1]) ? i + 2 : i + 1;
      rows.push('<div class="print-collection-row">' + cards.slice(i, next).join('') + '</div>');
      i = next;
    }
    // Keep a compact collection plan together when its complete set of
    // paired tube rows fits a single printed page. The old row-only break
    // avoidance could leave a small final row stranded on a mostly empty page.
    // For larger plans, retain the existing breaks between full paired rows.
    const printTestRefs = items.reduce((sum, item) => sum + uniqueTests(item.tests).length, 0);
    const maxCardRefs = Math.max(0, ...items.map(item => uniqueTests(item.tests).length));
    const compactCollection = rows.length <= 3 && printTestRefs <= 24
      && maxCardRefs <= 15 && !items.some(fullWidth);
    return '<div class="print-collection-grid' + (compactCollection ? ' print-collection-fits-one-page' : '') + '">' + rows.join('') + '</div>';
  }

  function buildCollectionPlan(tests, bags) {
    // Separate STAT and routine blood sources, but a single compatible urine
    // collection cup may supply both priorities. The downstream transport bags
    // still remain separate by priority and temperature.
    const routine = tests.filter(test => !test.isStat);
    const stat = tests.filter(test => test.isStat);
    const items = [
      ...buildCollectionPlanForPriority(routine, bags.filter(bag => !bag.isStat), false),
      ...buildCollectionPlanForPriority(stat, bags.filter(bag => bag.isStat), true)
    ];
    const sharedCups = new Map();
    const merged = [];
    items.forEach(item => {
      const isShareableCup = (item.className === 'tube-urine-cup'
        && collectionSpecimenGroupForItem(item) === 'urine'
        && !item.urineSeparateCollection
        && item.tests.every(isShareableUrineCupTest))
        || (item.className === 'tube-urine-cup'
          && item.sharedStoolSource
          && item.tests.every(isShareableStoolSourceTest));
      if (!isShareableCup) {
        merged.push(item);
        return;
      }
      const subtype = collectionMergeSubtypeForItem(item);
      const key = `${subtype}|${normalizeSearch(item.label)}`;
      if (!sharedCups.has(key)) {
        const copy = { ...item, tests: uniqueTests(item.tests), hasStat: Boolean(item.isStat), hasRoutine: !item.isStat };
        sharedCups.set(key, copy);
        merged.push(copy);
        return;
      }
      const cup = sharedCups.get(key);
      cup.tests = uniqueTests([...cup.tests, ...item.tests]);
      cup.count = Math.max(cup.count, item.count);
      cup.hasStat ||= Boolean(item.isStat);
      cup.hasRoutine ||= !item.isStat;
      cup.sharedStatRoutine = cup.hasStat && cup.hasRoutine;
      cup.isStat = cup.hasStat && !cup.hasRoutine;
      if (cup.sharedStatRoutine) {
        cup.detail = collectionSpecimenGroupForItem(cup) === 'stool'
          ? 'Collect stool once in a sterile cup; prepare separate STAT/routine and temperature-specific transport containers. Follow preservative and timing requirements.'
          : 'Collect once in a shared sterile cup; prepare separate STAT and routine transport specimens and bags.';
      }
    });
    // One collection card per physical blood tube type. Separate STAT and
    // routine *requirements* still sum, so distinct transport bag source counts
    // never get lost. Urine sharing and incompatible urine collection subtypes
    // retain their prior special handling.
    const groupedBlood = new Map();
    const collectionCards = [];
    merged.forEach(item => {
      if (collectionSpecimenGroupForItem(item) !== 'blood') {
        collectionCards.push(item);
        return;
      }
      const key = `${item.className}|${normalizeSearch(item.label)}`;
      if (!groupedBlood.has(key)) {
        const card = { ...item, isStat: false, sharedStatRoutine: false,
          tests: uniqueTests(item.tests), details: item.detail ? [item.detail] : [] };
        groupedBlood.set(key, card);
        collectionCards.push(card);
        return;
      }
      const card = groupedBlood.get(key);
      card.count += item.count;
      card.tests = uniqueTests([...card.tests, ...item.tests]);
      if (item.detail && !card.details.includes(item.detail)) card.details.push(item.detail);
    });
    groupedBlood.forEach(card => {
      card.detail = consolidateBloodCollectionDetails(card.details);
      delete card.details;
    });
    // Collection order: SST, remaining blood tubes, urine, stool, then swabs.
    // Merge only visually identical source cards. Add counts for distinct
    // collections; do not silently pool separately collected specimens.
    const visualCards = [];
    const visualIndex = new Map();
    collectionCards.forEach(item => {
      const specimenGroup = collectionSpecimenGroupForItem(item);
      if (specimenGroup === 'blood' || specimenGroup === 'other') {
        visualCards.push(item);
        return;
      }
      const key = `${collectionMergeSubtypeForItem(item)}|${item.className}|${normalizeSearch(item.label)}${specimenGroup === 'urine' && isTimedUrineTest((item.tests || [])[0]) ? '|' + item.key : ''}`;
      if (!visualIndex.has(key)) {
        const copy = { ...item, tests: uniqueTests(item.tests || []) };
        visualIndex.set(key, copy);
        visualCards.push(copy);
        return;
      }
      const card = visualIndex.get(key);
      card.count += item.count;
      card.tests = uniqueTests([...card.tests, ...(item.tests || [])]);
      card.urineSeparateCollection ||= Boolean(item.urineSeparateCollection);
      card.stoolSeparateCollection ||= Boolean(item.stoolSeparateCollection);
      card.detail = Array.from(new Set([card.detail, item.detail].flatMap(detail => (detail || '').split(' · ')).filter(Boolean))).join(' · ');
    });
    return visualCards.sort((a, b) => collectionSortRank(a) - collectionSortRank(b));
  }

  function consolidateBloodCollectionDetails(details) {
    // Merge identical temperature/usage entries across STAT and routine blood
    // allocations for the COLLECTION display only. Bags remain separate and
    // source tube counts are additive, not pooled between priorities.
    const byTemperature = new Map();
    const unmatched = [];
    details.forEach(detail => String(detail || '').split(/\s*·\s*/).forEach(chunk => {
      const part = chunk.trim();
      if (!part || /^STAT$/i.test(part)) return;
      const match = part.match(/^([^:]+):\s*(.+)$/);
      if (!match) { unmatched.push(part); return; }
      const temperature = match[1].trim();
      const components = match[2].split(/\s*\+\s*/);
      const entries = components.map(value => value.match(/^(\d+)\s+(.+)$/));
      if (entries.some(entry => !entry)) { unmatched.push(part); return; }
      if (!byTemperature.has(temperature)) byTemperature.set(temperature, new Map());
      const measures = byTemperature.get(temperature);
      entries.forEach(entry => {
        const label = entry[2].trim();
        measures.set(label, (measures.get(label) || 0) + Number(entry[1]));
      });
    }));
    const result = Array.from(byTemperature, ([temperature, measures]) =>
      `${temperature}: ${Array.from(measures, ([label, count]) => `${count} ${label}`).join(' + ')}`);
    return [...result, ...Array.from(new Set(unmatched))].join(' · ');
  }

  function collectionSortRank(item) {
    if (item.className === 'tube-sst') return 0;
    const specimenGroup = collectionSpecimenGroupForItem(item);
    if (specimenGroup === 'blood') return 1;
    if (specimenGroup === 'urine') return 2;
    if (specimenGroup === 'stool') return 3;
    const sourceText = [item.label, ...(item.tests || []).flatMap(test => [test.specimenType, test.drawContainer])]
      .join(' ').toLowerCase();
    if (/swab|transport media|viral media|utm|eswab|e-swab|culturette|aptima/.test(sourceText)) return 4;
    return 5;
  }

  function buildCollectionPlanForPriority(tests, bags, isStat) {
    if (!tests.length) return [];
    const items = [];
    const sstTests = tests.filter(isSstDraw);
    const totalSst = bags.reduce((sum, bag) => sum + selectedSstEstimateForBag(bag).totalTubes, 0);
    if (totalSst > 0) {
      const breakdown = bags
        .filter(bag => selectedSstEstimateForBag(bag).totalTubes > 0)
        .map(bag => {
          const estimate = selectedSstEstimateForBag(bag);
          const parts = [];
          if (estimate.originalTubes > 0) parts.push(`${estimate.originalTubes} original-submit`);
          if (estimate.transferSourceTubes > 0) parts.push(`${estimate.transferSourceTubes} source-for-transfer`);
          return `${bag.label.replace(/ bag$/i, '')}: ${parts.join(' + ')}`;
        })
        .join(' · ');
      items.push({ key: 'sst', label: selectedSstLabel(), className: 'tube-sst', displayClassName: selectedSstVisualClass(), count: totalSst, tests: uniqueTests(sstTests), detail: breakdown });
    }

    addPooledCollectionItem(items, tests, bags, {
      key: 'lavender',
      label: 'Lavender EDTA',
      className: 'tube-lavender',
      estimateKey: 'lavenderEstimate',
      matchesTube: isLavenderDraw
    });

    addPooledCollectionItem(items, tests, bags, {
      key: 'red-top',
      label: 'Red Top',
      className: 'tube-red',
      estimateKey: 'redTopEstimate',
      matchesTube: isRedTopDraw
    });

    addAdditionalPooledBloodItems(items, tests, bags);

    // One clean source cup can supply multiple COMPATIBLE stool assays. Each
    // assay retains its own final submission container, preservative, temperature,
    // and STAT bag as calculated by buildSubmissionContents. This is a SOURCE cup
    // count, not permission to combine incompatible tests or submitted aliquots.
    const sharedStoolTests = uniqueTests(tests.filter(isShareableStoolSourceTest));
    if (sharedStoolTests.length) {
      const originalCupTests = sharedStoolTests.filter(test =>
        splitSubmissionContainers(test).every(container =>
          container.originalTube && container.label === 'Sterile cup'));
      const originalCupBags = bags.filter(bag => bag.tests.some(test => originalCupTests.includes(test))).length;
      const detail = originalCupBags > 1
        ? 'Keep separate labeled sterile cups for each shipping temperature. Follow the submission plan for any required media.'
        : originalCupTests.length === sharedStoolTests.length
          ? 'Submit the original unpreserved sterile cup. Check sufficient stool volume for all tests.'
          : 'Collect stool in a sterile cup. Transfer only where the submission plan calls for a separate container or medium.';
      items.push({ key: 'stool-shared-source-cup', label: 'Sterile cup',
        className: 'tube-urine-cup', count: Math.max(1, originalCupBags), tests: sharedStoolTests,
        sharedStoolSource: true, detail });
    }

    const usesSpotUrineCup = test => isUrineTest(test) && !isTimedUrineTest(test)
      && canonicalCollectionContainer(test).className !== 'tube-trace-metal-container';
    const spotUrineGroups = new Map();
    tests.filter(usesSpotUrineCup).forEach(test => {
      const urineType = urineCollectionType(test);
      const dedicated = requiresSeparateUrineCollection(test);
      const key = dedicated ? `${urineType.key}|separate|${test.id}` : urineType.key;
      if (!spotUrineGroups.has(key)) spotUrineGroups.set(key, { ...urineType, key, dedicated, tests: [] });
      spotUrineGroups.get(key).tests.push(test);
    });
    spotUrineGroups.forEach(group => {
      items.push({
        key: `sterile-urine-cup|${group.key}`,
        label: 'Sterile cup',
        className: 'tube-urine-cup',
        urineSeparateCollection: group.dedicated,
        urineCollectionKey: group.key,
        count: group.dedicated ? Math.max(...group.tests.map(explicitCollectionCount)) : 1,
        tests: uniqueTests(group.tests),
        detail: group.dedicated
          ? 'Separate urine collection required. Follow test-specific collection instructions.'
          : group.tests.every(isOriginalContainerSubmission)
            ? 'Submit the original sterile cup; no transfer. Confirm sufficient urine for all ordered tests.'
            : group.tests.some(isOriginalContainerSubmission)
              ? 'Submit the original cup for direct-submit tests; fill required preservative/transport tubes for the other tests. Confirm sufficient urine.'
              : 'Collect in the sterile cup first, then fill any required preservative or transport tubes.'
      });
    });

    const grouped = new Map();
    tests.forEach(test => {
      if (isSstDraw(test)) return;
      if (isLavenderDraw(test) || isRedTopDraw(test)) return;
      if (isAdditionalPoolableBloodDraw(test)) return;
      if (usesSpotUrineCup(test)) return;
      if (isShareableStoolSourceTest(test)) return;
      if (test.transportOnly && isTimedUrineTest(test)) return;
      const info = canonicalCollectionContainer(test);
      // Keep physically identical containers separate when they hold different specimen types.
      // A Sterile cup, for example, may be used for either urine or stool, but those
      // specimens should never be combined into the same collection card/count.
      const specimenGroup = collectionSpecimenGroupForTest(test);
      const specimenSubtype = specimenGroup === 'urine' ? urineCollectionType(test).key
        : specimenGroup === 'other' ? (normalizeSearch(normalizeSpecimenType(test.specimenType)) || 'other')
        : specimenGroup;
      const urineCup = specimenGroup === 'urine' && info.className === 'tube-urine-cup';
      const separateCup = urineCup && !isShareableUrineCupTest(test);
      const separateStool = specimenGroup === 'stool' && info.className === 'tube-urine-cup';
      const timedShareKey = shareableTimedUrineSourceKey(test, info);
      const groupKey = timedShareKey
        ? `shared-timed-urine|${timedShareKey}`
        : `${specimenSubtype}|${info.key}${separateCup || separateStool || info.className === 'tube-salivette' || isTimedUrineTest(test) ? `|separate|${test.sourceTestId || test.id}` : ''}`;
      if (!grouped.has(groupKey)) grouped.set(groupKey, { ...info, key: groupKey, urineSeparateCollection: separateCup, stoolSeparateCollection: separateStool, urineCollectionKey: groupKey, count: 0, tests: [], detail: '', timedSharedSource: Boolean(timedShareKey) });
      const item = grouped.get(groupKey);
      if (timedShareKey || (urineCup && !separateCup)) item.count = Math.max(item.count, explicitCollectionCount(test));
      else item.count += explicitCollectionCount(test);
      item.tests.push(test);
    });

    grouped.forEach(item => {
      item.tests = uniqueTests(item.tests);
      if (item.className === 'tube-24h-urine'
          && collectionSpecimenGroupForItem(item) === 'urine'
          && item.tests.every(test => !isOriginalContainerSubmission(test))) {
        item.detail = describeTimedUrineSource(item);
        // Do not assume the general Labcorp unpreserved route is accepted
        // for the Esoterix-specific 501533 order: its direct instructions
        // name an acid-preserved, frozen specimen.
        if (item.tests.some(test => String(test.testCode || '').trim() === '501533')) {
          item.detail += ' VERIFY BEFORE COLLECTION: Labcorp specialty 501533 lists 6N HCl preservative and frozen shipment; the available CDOS entry lists unpreserved/refrigerated. Do not pool with other 24-hour urine until the receiving lab confirms its accepted route.';
        }
      }
      if (item.className === 'tube-nmr-lipotube') {
        item.detail = 'Clot upright 30 minutes, centrifuge 1600–1800 ×g for 10–15 minutes, do not open, refrigerate at 2–8°C, and ship with frozen cool packs.';
      }
      // LabCorp explicitly accepts the same 30% acetic-acid-preserved
      // 24-hour urine collection for PBG (003103) and delta-ALA (096354).
      // Count that physical jug once, but submit a separate frozen amber
      // aliquot for EACH assay. Do not generalize this exception to other
      // timed urine tests or incompatible preservative workflows.
      const codes = new Set(item.tests.map(test => String(test.testCode || '').trim()));
      if (item.className === 'tube-24h-urine'
          && collectionSpecimenGroupForItem(item) === 'urine'
          && codes.has('003103') && codes.has('096354')) {
        item.count = Math.max(1, item.count - 1);
        item.detail = 'One 24-hour urine collection with 30% acetic acid for PBG and delta-ALA. Refrigerate during collection; mix and submit separate frozen, light-protected aliquots.';
      }
      items.push(item);
    });

    // Final card-level normalization. Collection cards are grouped by the physical
    // collection container AND specimen type, so urine and stool never merge just
    // because both use a Sterile cup. Conversely, duplicate urine cards that
    // use the same cup are collapsed into one card even when downstream transport
    // tubes or processing differ.
    const mergedItems = [];
    const mergedIndex = new Map();
    items.forEach(item => {
      const specimenGroup = collectionSpecimenGroupForItem(item);
      const specimenSubtype = collectionMergeSubtypeForItem(item);
      const normalizedLabel = String(item.label || '').trim().toLowerCase();
      const separateKey = (item.urineSeparateCollection || item.stoolSeparateCollection) ? `|${item.urineCollectionKey || item.key}` : '';
      // A single print card must never merge physically incompatible timed
      // sources, even if the same commercially labeled jug is used for each.
      const timedSeparation = specimenGroup === 'urine' && isTimedUrineTest((item.tests || [])[0])
        ? `|${item.key}` : '';
      const sameContainerKey = `${specimenSubtype}|${item.className || ''}|${normalizedLabel}${separateKey}${timedSeparation}`;
      const mergeableNonBlood = specimenGroup !== 'blood' && specimenGroup !== 'other';

      if (!mergeableNonBlood || !mergedIndex.has(sameContainerKey)) {
        const copy = { ...item, tests: uniqueTests(item.tests || []) };
        mergedItems.push(copy);
        if (mergeableNonBlood) mergedIndex.set(sameContainerKey, copy);
        return;
      }

      const target = mergedIndex.get(sameContainerKey);
      target.tests = uniqueTests([...(target.tests || []), ...(item.tests || [])]);

      // Spot urine collected in the same Sterile cup is one shared source
      // specimen. Preserve a larger explicit cup count if a test truly requires it.
      if (specimenGroup === 'urine' && item.className === 'tube-urine-cup') {
        target.count = Math.max(Number(target.count) || 0, Number(item.count) || 0);
      } else {
        target.count = (Number(target.count) || 0) + (Number(item.count) || 0);
      }

      const details = [target.detail, item.detail].filter(Boolean);
      target.detail = Array.from(new Set(details)).join(' · ');
    });

    return mergedItems.map(item => ({ ...item, isStat }));
  }

  function shortDrawSource(test) {
    const draw = String(test.drawContainer || '').trim();
    if (/\bnmr\s*lipo\s*tube\b/i.test(draw)) return 'NMR LipoTube (Black/Yellow)';

    // Match royal-blue tubes before generic EDTA or red-top rules. Otherwise
    // "Royal Blue EDTA" becomes Lavender EDTA and "red stripe" becomes Red Top.
    if (/royal blue|royal-blue/i.test(draw)) {
      if (/edta|purple stripe|purple strip|lavender stripe|lavender strip/i.test(draw)) return 'Royal Blue EDTA (purple stripe)';
      if (/no additive|red stripe|red strip/i.test(draw)) return 'Royal Blue No Additive (red stripe)';
      if (/heparin|green band|green stripe/i.test(draw)) return 'Royal Blue Sodium Heparin';
      return 'Royal Blue — verify additive';
    }

    // Source descriptions must match the actual container. Do not confuse
    // "preserved" with a red-top blood tube.
    if (/24\s*[- ]?hour\s+urine\s+(?:container|jug)|24h\s+urine\s+(?:container|jug)/i.test(draw)) return '24-Hour Urine Container';
    if (/^(?:sterile\s+(?:urine\s+|specimen\s+)?(?:cup|container)|urine\s+collection\s+cup)$/i.test(draw)) return 'Sterile cup';

    if (/microtainer/i.test(draw)) return draw;
    if (/light blue|sodium citrate|citrate/i.test(draw)) return 'Light Blue Citrate';
    if (/blue/i.test(draw) && /edta/i.test(draw)) return 'Blue Top EDTA';
    if (/blue/i.test(draw) && /serum|no additive/i.test(draw)) return 'Blue Top No Additive (serum)';
    if (/pink/i.test(draw)) return 'Pink EDTA';
    if (/tan/i.test(draw) && /heparin/i.test(draw)) return 'Tan Sodium Heparin';
    if (/tan/i.test(draw) && /edta|k2/i.test(draw)) return 'K2 EDTA Tan Top';
    if (/sst|gold/i.test(draw)) return selectedSstLabel();
    if (/lavender|edta/i.test(draw)) return 'Lavender EDTA';
    if (/sodium\s+heparin/i.test(draw)) return 'Green Sodium Heparin';
    if (/lithium\s+heparin/i.test(draw)) return 'Green Lithium Heparin';
    if (/green|heparin/i.test(draw)) return 'Green Heparin — verify additive';
    if (/\bred\b/i.test(draw)) return 'Red Top';
    if (/yellow|acd/i.test(draw)) return 'Yellow ACD';
    // A gray fluoride tube does not automatically contain oxalate. Do not
    // add an unlisted additive to the specimen label.
    if (/gray|grey|fluoride|oxalate/i.test(draw)) {
      if (/oxalate/i.test(draw)) return 'Gray Fluoride/Oxalate';
      if (/sodium\s+fluoride/i.test(draw)) return 'Gray Sodium Fluoride';
      if (/fluoride/i.test(draw)) return 'Gray Fluoride';
      return 'Gray Top — verify additive';
    }
    if (/aptima/i.test(draw)) return 'Aptima Multitest';
    return draw && !/^verify/i.test(draw) ? draw : '';
  }

  function explicitSubmissionCount(test) {
    const structured = Math.floor(Number(test.submissionCount) || 1);
    if (structured > 1) return structured;
    const exception = collectionTubeException(test);
    if (exception?.submissionCount) return Math.max(structured, exception.submissionCount);

    const containerText = String(test.transportContainer || '').toLowerCase();
    const note = String(test.specialInstructions || '').toLowerCase();
    const countPattern = '(\\d+|one|two|three|four|five|six|seven|eight)';

    // Counts explicitly embedded in the transport-container field are authoritative.
    const containerPattern = new RegExp(`(?:^|\\s)${countPattern}\\s*(?:x|×)?\\s*(?:separate\\s+)?(?:[a-z][a-z-]*\\s+){0,4}(?:transport tubes?|cryovials?|vials?|containers?)\\b`);
    const containerMatch = containerText.match(containerPattern);
    if (containerMatch) return Math.max(numberWordValue(containerMatch[1]), 1);

    // In narrative text only “submit ...” language controls submission counts.
    // Collection counts, time points, specimen volumes, and recommendations do not.
    const submitPattern = new RegExp(`\\bsubmit\\s+${countPattern}\\s*(?:x|×)?\\s*(?:separate\\s+)?(?:frozen\\s+)?(?:[a-z][a-z-]*\\s+){0,3}(?:aliquots?|transport tubes?|cryovials?|vials?|tubes?|containers?)\\b`);
    const submitMatch = note.match(submitPattern);
    // "submit 10 mL aliquot" describes volume in ONE cup, not 10 cups.
    // Only allow numbers that count physically separate destination vessels.
    return submitMatch && !/\b(?:ml|milliliters?|millilitres?|g|grams?|mg)\b/.test(submitMatch[0])
      ? Math.max(numberWordValue(submitMatch[1]), 1) : 1;
  }

  function titleCaseSpecimen(value) {
    return String(value || 'Specimen').replace(/\b\w/g, char => char.toUpperCase());
  }

  function specificSpecimenSource(test) {
    const stated = String(test.specimenType || '').trim();
    const normalized = normalizeSpecimenType(stated);
    // Collection instructions can list several acceptable swabs. They must
    // never turn a body-fluid, urine, or other non-swab specimen into a swab.
    if (/\bmeconium\b/i.test(stated) ||
        (/\bstool\b/i.test(normalized) && /\bmeconium\b/i.test(test.specialLabeling || ''))) return 'Meconium';
    if (!/\bswab\b/i.test(stated) && !/\bswab\b/i.test(normalized)) {
      return titleCaseSpecimen(normalized || stated || 'Specimen');
    }
    // The declared specimen type is authoritative when it names the site.
    if (stated && !/^(?:swab|swab specimen|swab,? unspecified)$/i.test(stated)) {
      return titleCaseSpecimen(stated);
    }
    // Generic "Swab" orders need an actual collection site. Infer one only
    // if exactly one unambiguous site occurs in the TEST NAME, never from
    // acceptable or excluded sites buried in the handling instructions.
    const name = String(test.testName || '');
    const sites = [
      [/nasopharyngeal|\bnp swab\b/i, 'Nasopharyngeal swab'],
      [/\bnasal\b|anterior nares/i, 'Nasal swab'],
      [/\bthroat\b|oropharyngeal/i, 'Throat swab'],
      [/\bvaginal\b/i, 'Vaginal swab'],
      [/\bendocervical\b/i, 'Endocervical swab'],
      [/\bcervical\b/i, 'Cervical swab'],
      [/\burethral\b/i, 'Urethral swab'],
      [/\brectal\b/i, 'Rectal swab'],
      [/\blesion\b/i, 'Lesion swab'],
      [/\bwound\b/i, 'Wound swab'],
      [/\bbuccal\b|\bcheek\b/i, 'Buccal swab'],
      [/\boral swab\b/i, 'Oral swab'],
      [/\bconjunctival\b|\beye swab\b/i, 'Conjunctival swab']
    ].filter(([pattern]) => pattern.test(name));
    return sites.length === 1 ? sites[0][1] : 'Collection site: ____';
  }
  function specimenSourceDetail(test) {
    const specimen = titleCaseSpecimen(normalizeSpecimenType(test.specimenType));
    const sourceSpecimen = specificSpecimenSource(test);
    const sourceTube = shortDrawSource(test);

    if (/swab/i.test(sourceSpecimen)) return sourceSpecimen;
    if (/serum/i.test(specimen) && /^sst$/i.test(sourceTube)) return `${specimen} from SST`;
    return sourceTube ? `${specimen} from ${sourceTube}` : sourceSpecimen;
  }

  // Frozen serum/plasma aliquots belong in dedicated purple-cap frozen
  // transport tubes, not the green-top routine serum/plasma transport badge.
  // Keep the actual source requirements in the record; do not recategorize
  // original SSTs, whole blood, urine amber tubes, or specialty containers.
  function isFrozenSerumPlasmaTransport(test, container) {
    const material = normalizeSpecimenType(test?.specimenType || '').toLowerCase();
    const tube = String(container || '').toLowerCase();
    const temp = String(test?.transportTemperature || '').toLowerCase().trim();
    return temp === 'frozen'
      && /^(?:serum|plasma|platelet[- ]poor plasma)$/.test(material)
      && /(?:transport\s+tube|transpak)/.test(tube)
      && !/(?:amber|acid[- ]?washed|metal[- ]?free|trace[- ]?metal|glass|cryovial)/.test(tube);
  }
  function frozenTransportLabel(test, container) {
    if (!isFrozenSerumPlasmaTransport(test, container)) return String(container || '');
    // PP Transpak uses the same purple-cap frozen tube.
    return 'Frozen Transport Tube';
  }

  // Generic empty plastic serum/plasma transport vials use the same green
  // badge. Keep frozen, special media, metal-free, platelet-poor and light-
  // protected containers separate; specimen identity and source still matter.
  // Standard stock aliases may contain a quantity or a separation qualifier.
  // Remove only those qualifiers for physical device classification, not from
  // the original record or the dedicated aliquot/count rules.
  function standardTransportStockName(transport) {
    return normalizeSearch(transport)
      .replace(/^\d+\s*(?:x\s*)?(?:separate\s+)?/, '')
      .replace(/^(?:two|three|four|separate|individual|dedicated)\s+/, '')
      .replace(/\s+(?:\d+|two|three|four)\s+(?:separate\s+)?(?:tubes?|vials?|aliquots?)$/, '')
      .replace(/\b(?:no preservatives?|without preservatives?|unpreserved|preservative[ -]?free)\b/g, '')
      .replace(/\s+/g, ' ').trim();
  }

  function isGenericSerumPlasmaTransport(test, transport) {
    const material = normalizeSpecimenType(test.specimenType).toLowerCase().trim();
    if (!['serum', 'plasma', 'serum or plasma'].includes(material)) return false;
    if (String(test.transportTemperature || '').toLowerCase().trim() === 'frozen') return false;
    if (typeof isFrozenSerumPlasmaTransport === 'function' && isFrozenSerumPlasmaTransport(test, transport)) return false;
    const raw = standardTransportStockName(transport);
    // Generic plastic vials share green transport badges, never specialty media.
    if (/amber|light protect|metal free|acid washed|acid rinsed|trace metal|trace element|preserv|cryovial|glass|royal blue|nmr|citrate|heparin|edta|platelet poor|special|frozen|transpak|fluoride|oxalate|formalin|cary blair/.test(raw)) return false;
    const clean = raw.replace(/\b(?:additive free|no additive|sterile|plain|unpreserved|dedicated)\b/g, '').replace(/\s+/g, ' ').trim();
    if (!/\b(?:tube|vial|container)s?\b/.test(clean)) return false;
    if (!/\b(?:serum|plasma|plastic|polypropylene|transport|transfer|aliquot|screw cap)\b/.test(clean)) return false;
    return !clean.replace(/\b(?:serum|plasma|plastic|polypropylene|transport|transfer|aliquot|screw cap|tubes?|vials?|containers?)\b/g, '').replace(/\s+/g, '').trim();
  }
  function isPlainUrineAliquotTransport(test, transport) {
    if (!isUrineTest(test)) return false;
    const raw = normalizeSearch(transport).replace(/\b(?:no preservatives?|without preservatives?|unpreserved|preservative[ -]?free)\b/g, '').replace(/\s+/g, ' ').trim();
    // A negative qualifier such as "no HCl" describes an unpreserved source,
    // not an acid-preserved specialty collection device.
    const source = normalizeSearch(test.drawContainer)
      .replace(/\b(?:no|without)\s+(?:\d+\s*n\s*)?(?:hcl|acid(?:\s+preservative)?)\b/g, '').trim();
    // A plain urine aliquot can use a sterile leakproof screw-cap cup.
    // Do not convert preservative, molecular or specialty transport devices.
    if (/acid|hcl|metal free|trace metal|trace element|boric|preserv|culture|swirl|urinalysis|ua tube|uri sponge|amber|light protect|formalin|special|24 hour|timed|para pak|aptima|cobas|cary blair/.test(raw)) return false;
    if (/acid|hcl|metal free|trace metal|trace element/.test(source)) return false;
    if (!/\b(?:urine|aliquot|sterile cup)\b/.test(raw)) return false;
    if (!/\b(?:cup|tube|vial|container)\b/.test(raw)) return false;
    return !raw.replace(/\b(?:sterile|unpreserved|plain|plastic|polypropylene|screw cap|leakproof|leak proof|urine|aliquot|transport|transfer|collection|cup|tube|vial|container)s?\b/g, '').replace(/\s+/g, '').trim();
  }
  function transportTubeClass(test, container) {
    const value = genericTransportName(container).toLowerCase();
    if (/microtainer/.test(value)) return microtainerIcon(value);
    // Preserve the same specialty icon for original Salivette submission devices.
    if (/\bsalivette\b/.test(value)) return 'tube-salivette';
    const specialty = tubeClass(container);
    if (isFrozenSerumPlasmaTransport(test, container)) return 'tube-frozen-purple';
    if (/^tube-(?:qft-|eswab|utm|frozen-purple|op-|stool-clean)/.test(specialty)) return specialty;
    const specimen = normalizeSpecimenType(test.specimenType).toLowerCase();
    const specimenAndContainer = `${specimen} ${value}`;
    const isStandardSerumOrPlasma = isGenericSerumPlasmaTransport(test, container);
    const isSpecialtyMetalContainer = /acid[- ]?washed|acid[- ]?rinsed|metal[- ]?free|trace[- ]?metal/.test(value);

    if (/uri[- ]?sponge/.test(value)) return 'tube-urisponge';
    if (/aptima/.test(value)) {
      const drawn = String(test.drawContainer || '').toLowerCase() + ' ' + value;
      if (/\burine\b/i.test(String(test.specimenType || '')) || /\burine\b/.test(value))
        return 'tube-aptima-urine';
      if (/\bunisex\b|white[- ]?label/.test(drawn)) return 'tube-aptima-unisex';
      if (/pap[- ]?vial|green[- ]?label|specimen transfer/.test(drawn)) return 'tube-aptima-transfer';
      return 'tube-aptima';
    }
    if (/amber|protect from light|light[- ]?protected/.test(value)) return 'tube-amber';

    // Specialty acid-washed/metal-free tubes must stay neutral, regardless of specimen type.
    if (isSpecialtyMetalContainer) {
      if (/\burine\b/.test(specimen) || /\burine\b|\bcup\b/.test(value))
        return 'tube-trace-metal-container';
      return 'tube-transport tube-metal-free-neutral';
    }

    if (/^transport tube$/.test(value)) return 'tube-transport tube-transport-green-top';
    if (isStandardSerumOrPlasma || /transport tube|transfer tube|transfer vial|aliquot|cryovial|screw[- ]?cap|pour[- ]?off|plastic.*(?:vial|container)/.test(value)) {
      // Ordinary serum/plasma plastic vials use the green-top transport badge; specialty devices do not.
      return isStandardSerumOrPlasma
        ? 'tube-transport tube-transport-green-top'
        : 'tube-transport';
    }
    return tubeClass(container);
  }

  function requiresSeparateTransportAliquot(test) {
    // An explicit lab instruction overrides the two-test pooling shortcut.
    // Collection-only separation is not the same as a dedicated transport tube.
    if (explicitSubmissionCount(test) > 1) return true;
    const transport = String(test.transportContainer || '').toLowerCase();
    const notes = routeSpecificPoolingNotes(test).toLowerCase();
    // "Dedicated plastic serum transport tube" is a physical stock alias,
    // never permission to pool it with another test's specimen.
    if (/\b(?:dedicated|separate|individual)\b/.test(transport)) return true;
    return /\b(?:dedicated|individual|separate|own|additional)\s+(?:(?:serum|plasma|specimen|sample)\s+)?(?:transport\s+)?(?:tube|vial|aliquot|cryovial|container)\b/.test(transport)
      || /\b(?:dedicated|individual|separate|own|additional)\s+(?:(?:serum|plasma|specimen|sample)\s+)?(?:transport\s+)?(?:tube|vial|aliquot|cryovial|container)\s+(?:required|needed)\b/.test(notes)
      || /\b(?:submit|provide|prepare|transfer|use|requires?)\s+(?:a[n]?\s+)?(?:dedicated|individual|separate|own|additional|second)\s+(?:(?:serum|plasma|specimen|sample)\s+)?(?:transport\s+)?(?:tube|vial|aliquot|cryovial|container)\b/.test(notes)
      || /\b(?:do not|don't|must not|cannot)\s+(?:pool|combine|share|mix)\b/.test(notes)
      || /\b(?:each|every)\s+(?:test|assay)\s+(?:requires?|needs?)\s+(?:its\s+)?(?:own|separate|dedicated)\b/.test(notes);
  }

  function isShareableSerumPlasmaTransport(test, container) {
    // Different collection timepoints and required additional draws are never
    // eligible for ordinary same-sample serum/plasma vial pooling.
    if (requiresDistinctDrawTransport(test)) return false;
    const specimen = normalizeSpecimenType(test.specimenType).toLowerCase();
    if (!/^(?:serum|plasma)$/.test(specimen)) return false;
    if (requiresSeparateTransportAliquot(test)) return false;
    if (container.originalTube || container.count !== 1) return false;
    // Never combine amber, acid-washed, platelet-poor, cryovial, special media,
    // preservative or other specialty submission containers into this rule.
    if (!container.key.includes(`|standard-${specimen}-transport|spin-`) || container.key.includes('|dedicated-')) return false;
    return container.className === 'tube-transport tube-transport-green-top';
  }

  function applySerumPlasmaTransportPooling(items) {
    return Array.from(items.values()).map(item => {
      item.tests = uniqueTests(item.tests || []);
      if (!item.originalTube && item.tests.length > 0 && item.tests.every(test =>
        isShareableSerumPlasmaTransport(test, splitSubmissionContainers(test).find(c => c.key === item.key) || {})
      )) {
        item.count = Math.ceil(item.tests.length / SERUM_PLASMA_TESTS_PER_TRANSPORT_TUBE);
        item.pooledSerumPlasmaTransport = true;
      }
      return item;
    });
  }

  // Each additional/timed draw is a distinct specimen, irrespective of
  // whether its transport device matches another sample.
  function timedSpecimenLabel(test) {
    const labeling = String(test?.specialLabeling || '').trim();
    const timepoint = labeling.split(/\s+[-–]\s+|\s*:\s*/)[0].trim();
    return /^(?:fasting|baseline|pre[- ]?(?:dose|load|glucose)|post[- ]?dose|timed\s+(?:specimen|sample)\s+\d+|\d+(?:\.\d+)?\s*[- ]?(?:hours?|hrs?|h|minutes?|mins?))$/i.test(timepoint)
      ? timepoint : '';
  }

  function requiresDistinctDrawTransport(test) {
    if (reviewedSstComponentPolicy(test) === 'shared') return false;
    // Salivette kits are independent timed collections; never merge samples across orders.
    if (/\bsalivette\b/i.test(`${test.drawContainer || ''} ${test.transportContainer || ''}`)) return true;
    return Boolean(timedSpecimenLabel(test) ||
      test.sourceTestId ||
      (Array.isArray(test.additionalDrawRequirements) && test.additionalDrawRequirements.length));
  }

  function submissionTransportGroupingKey(test, transport) {
    const raw = normalizeSearch(transport)
      .replace(/^\d+\s*(?:x|×)?\s*(?:separate\s+)?/, '')
      .replace(/\s+/g, ' ').trim();
    if (isGenericSerumPlasmaTransport(test, transport)) {
      const material = normalizeSpecimenType(test.specimenType).toLowerCase();
      if (material !== 'serum' && material !== 'plasma')
        return `${raw}|uncertain-matrix-${normalizeSearch(String(test.sourceTestId || test.id || displayCode(test)))}`;
      const key = `standard-${material}-transport|spin-${normalizeSearch(String(test.spin || '').trim()) || 'verify'}`;
      if (requiresDistinctDrawTransport(test)) {
        // Never pool separate collection timepoints into one physical vial.
        return `${key}|required-draw-${normalizeSearch(String(test.id || test.sourceTestId || displayCode(test)))}`;
      }
      return requiresSeparateTransportAliquot(test)
        ? `${key}|dedicated-${normalizeSearch(String(test.sourceTestId || test.id || displayCode(test)))}`
        : key;
    }
    return requiresDistinctDrawTransport(test)
      ? `${raw}|required-draw-${normalizeSearch(String(test.id || test.sourceTestId || displayCode(test)))}`
      : raw;
  }

  // Swab collection devices are generally submitted intact in their supplied
  // medium. Directory aliases such as "Aptima" versus "Aptima Multitest
  // Transport Tube" describe ONE device, not a separate aliquot destination.
  // Do not apply this to urine/stool swabs or to explicit fluid transfers.
  function isDirectSwabKitSubmission(test) {
    const specimen = String(test.specimenType || '').toLowerCase();
    if (!/\bswabs?\b/.test(specimen) ||
        /\b(?:urine|stool|feces|faeces|fecal|faecal)\b/.test(specimen)) return false;

    const draw = String(test.drawContainer || '').toLowerCase().trim();
    const transport = String(finalTransportContainer(test) || '').toLowerCase().trim();
    const notes = String(test.specialInstructions || '').toLowerCase();
    // Cytology/Pap receiving vials are separate devices, not swab transport kits.
    if (/\b(?:thinprep|preservcyt|surepath|cytology|pap[- ]?vial|fixative|slides?|smears?)\b/i.test(transport)) return false;
    if (!draw || !transport || /^(?:verify|do not collect|n\/?a\b)/.test(draw) ||
        /^(?:verify|do not collect|n\/?a\b)/.test(transport)) return false;

    // A specimen in a primary cup or liquid vial must not be reclassified as
    // a direct swab, even if the test name contains "swab".
    const fluidSource = /\b(?:urine|stool|feces|faeces|fecal|faecal)\b/.test(draw + ' ' + transport) &&
      /\b(?:cup|aliquot|specimen|sample|container|transfer)\b/.test(draw + ' ' + transport);
    if (fluidSource) return false;
    const explicitLiquidTransfer =
      /\b(?:aliquot|pour\s*(?:off|into)|decant)\b/.test(notes) ||
      /\btransfer\s+(?:the\s+)?(?:urine|stool|feces|faeces|liquid|supernatant|specimen)\b/.test(notes) ||
      /\b(?:transfer|move)\b.{0,75}\b(?:another|second|separate|different)\s+(?:tube|vial|container)\b/.test(notes);
    if (explicitLiquidTransfer) return false;

    const kit = /\b(?:swab|aptima|affirm|atts|eswab|e-swab|amies|cobas|multitest|unisex|fibronectin)\b|(?:viral|universal)\s+transport|(?:\butm\b|\bvtm\b)/;
    const originalLabel = /\b(?:original|same|primary)\s+(?:swab|collection|transport)?\s*(?:tube|container|kit)\b|no\s+transfer/.test(transport);
    if (!kit.test(draw)) return false;
    return kit.test(transport) || originalLabel;
  }

  function isOriginalContainerSubmission(test) {
    if (isDirectSwabKitSubmission(test)) return true;
    const draw = String(test.drawContainer || '').trim();
    const transport = finalTransportContainer(test);
    if (isPlainUrineAliquotTransport(test, transport) && !isTimedUrineTest(test) &&
      cleanCollectionContainer(draw) === 'Sterile cup') return true;
    const combined = `${transport} ${test.specialInstructions || ''}`.toLowerCase();
    // Ordinary stool is first collected into a sterile cup, and then moved to
    // Total-Fix. The preservative vial is a transport container, not the
    // original source cup, even if older records listed the vial for both.
    if (collectionSpecimenGroupForTest(test) === 'stool' && /total[- ]?fix/.test(transport.toLowerCase())) return false;
    if (!draw || /^do not collect$/i.test(draw) || /^n\/?a$/i.test(transport)) return false;

    // LabCorp accepts an unpreserved plastic urine cup itself for many assays.
    // If BOTH actual containers normalize to that cup, submission is direct.
    // A true preservative/aliquot/special transport device does not normalize.
    if (isUrineTest(test) &&
        cleanCollectionContainer(draw) === 'Sterile cup' &&
        cleanCollectionContainer(transport) === 'Sterile cup') return true;

    // Swabs are collected directly into their supplied transport kit. Unlike
    // spun blood or transferred urine/stool, no second container is required.
    if (/\bswab\b/i.test(String(test.specimenType || '')) &&
        /(?:swab|amies|aptima|cobas|viral transport|\butm\b|\bvtm\b)/i.test(transport) &&
        normalizeSearch(draw) === normalizeSearch(transport)) return true;

    const drawClass = tubeClass(draw);
    const transportClass = tubeClass(transport);
    // The required transport-container field is authoritative. Mentions of
    // original tubes for alternative or paired specimens in free-text notes
    // cannot turn an explicitly transferred sample into an original-tube order.
    const namedTransferDestination = /\b(?:transport|transfer)\s+(?:tubes?|vials?|containers?)\b|\b(?:aliquot|cryovial|transpak|pour[- ]?off|preservative\s+tube)\b/i.test(transport);
    const samePhysicalContainer = normalizeSearch(cleanCollectionContainer(draw)) ===
      normalizeSearch(cleanCollectionContainer(transport));
    const transportSaysOriginal = /\b(?:no transfer|original tube|same tube|primary tube|do not open|unopened|submit\s+(?:the\s+)?(?:spun\s+)?(?:original|collection|primary)\s+tube)\b/i.test(transport);
    if (namedTransferDestination && !samePhysicalContainer && !transportSaysOriginal) return false;

    // When LabCorp explicitly lists a spun SST/Gold as BOTH collection source
    // and submission container, it is the original tube. Notes describing
    // optional red-top/plasma alternatives must not turn that SST into a
    // second printed submission card or a fictitious serum transfer.
    // Preserve any mandatory separate-serum or no-gel restriction.
    const instructions = String(test.specialInstructions || '').toLowerCase();
    const spunOriginalSst = drawClass === 'tube-sst'
      && transportClass === 'tube-sst'
      && /sst|gold|serum separator|gel[- ]barrier/.test(transport.toLowerCase())
      && !/do not use (?:an? )?(?:sst|gel)|gel[- ]barrier (?:tube|specimen) (?:not acceptable|rejected)|must (?:transfer|pour off|separate) (?:the )?(?:serum|specimen)|(?:transfer|separation) (?:of )?(?:serum|specimen) (?:is )?(?:mandatory|required)/.test(instructions);
    // A mandatory tube-to-tube serum transfer or gel prohibition overrides any
    // apparently matching SST label; do not silently merge those submissions.
    const transferRequired = /\bmust\s+(?:(?:immediately|promptly)\s+)?(?:transfer|pour\s+off)\b|\btransfer\s+(?:of\s+)?serum\s+(?:to|into)\s+(?:a\s+)?(?:separate|dedicated|another)\s+(?:tube|container)\s+(?:is\s+)?(?:mandatory|required)\b|\b(?:separate|dedicated)\s+serum\s+(?:transport\s+)?tube\s+(?:is\s+)?(?:mandatory|required)\b/.test(instructions);
    const noGelSst = /\bdo\s+not\s+use\s+(?:an?\s+)?(?:sst|gel)|\bgel[- ]barrier\s+(?:tube|specimen)\s+(?:not\s+acceptable|rejected)\b/.test(instructions);
    if (drawClass === 'tube-sst' && (transferRequired || noGelSst)) return false;
    if (spunOriginalSst) return true;

    const explicitOriginal = transportSaysOriginal || (samePhysicalContainer &&
      /\b(?:no transfer|original tube|same tube|primary tube|do not open|unopened)\b/i.test(String(test.specialInstructions || '')));
    const matchingTube = Boolean(drawClass && transportClass && drawClass === transportClass)
      && !/transport tube|aliquot|cryovial|screw[- ]?cap|pour[- ]?off/.test(transport.toLowerCase());
    return explicitOriginal || matchingTube;
  }

  function originalContainerSubmission(test) {
    const draw = String(test.drawContainer || 'Original collection container').trim();
    const sourceSpecimen = specificSpecimenSource(test);
    const isAptima70049 = String(test.testCode || '').trim() === '70049';
    const label = isAptima70049 ? 'Aptima' : (collectionTubeException(test)?.label || draw);
    const directUrineCup = isUrineTest(test) && !isTimedUrineTest(test) &&
      cleanCollectionContainer(draw) === 'Sterile cup' &&
      (cleanCollectionContainer(finalTransportContainer(test)) === 'Sterile cup' ||
        isPlainUrineAliquotTransport(test, finalTransportContainer(test)));
    const shareUrineCup = directUrineCup && isShareableUrineCupTest(test) &&
      explicitSubmissionCount(test) === 1;
    const processing = isAptima70049
      ? `${sourceSpecimen} · Submit as Aptima`
      : directUrineCup ? 'Submit in original sterile cup; no transfer'
      : /^sterile cup$/i.test(label) ? 'Submit in original container'
      : (String(test.spin || '').toLowerCase() === 'yes' ? 'Process as directed; submit in original tube' : 'Submit in original tube');
    const nmrProcessing = tubeClass(draw) === 'tube-nmr-lipotube'
      ? 'Clot upright 30 min, spin 1600–1800 ×g for 10–15 min, do not open; refrigerate 2–8°C and ship with frozen cool packs'
      : processing;
    return {
      key: directUrineCup
        ? `original-urine-cup|${urineCollectionType(test).key}|${shareUrineCup ? 'shared' : String(test.sourceTestId || test.id || test.testCode)}`
        : `original|${normalizeSearch(label)}|${normalizeSearch(sourceSpecimen)}${requiresDistinctDrawTransport(test)
          ? '|required-draw-' + normalizeSearch(String(test.id || test.sourceTestId || displayCode(test))) : ''}`,
      label,
      className: tubeClass(draw) || (/\bswab\b/i.test(test.specimenType) ? 'tube-transport' : ''),
      shareableOriginalUrineCup: shareUrineCup,
      // Every original collection tube must travel as an original submission.
      // If two distinct whole-blood tubes are drawn, they cannot be compressed
      // into a single original tube in the bag plan (e.g. 38287).
      count: Math.max(explicitSubmissionCount(test), collectionSpecimenGroupForTest(test) === 'blood'
        ? recommendedCollectionTubesForTest(test) : explicitCollectionCount(test)),
      detail: isAptima70049 ? processing : `${sourceSpecimen} · ${nmrProcessing}`,
      originalTube: true
    };
  }

  // A rejected gray-top culture tube must never become a second submission.
  // The required transport field, not free-text instructions, determines
  // whether a UA and culture need separate preservative containers.
  function requiresDualUrinalysisCultureContainers(test) {
    if (!isUrineTest(test)) return false;
    if (String(test.testCode || '').trim() === '3020') return true;
    const transport = String(finalTransportContainer(test) || '').toLowerCase();
    return /red\s*\/\s*yellow|yellow\s*\/\s*red|red[- ]yellow|yellow[- ]red|swirl/.test(transport)
      && /gray|grey|uri[- ]?sponge/.test(transport)
      && /urine|culture/.test(transport);
  }

  function splitSubmissionContainers(test) {
    // O&P order codes with both formalin and PVA require one vial of each.
    if (['008623', '188110', '205281'].includes(String(test.testCode || '').trim())) {
      return [
        { key: 'labcorp-op-formalin', label: 'Pink Formalin O&P Vial',
          className: 'tube-op-formalin', count: 1, detail: 'Feces preserved in formalin to fill line; no Cary-Blair' },
        { key: 'labcorp-op-pva', label: 'Gray PVA O&P Vial',
          className: 'tube-op-pva', count: 1, detail: 'Feces preserved in PVA to fill line; no Cary-Blair' }
      ];
    }
    const transport = finalTransportContainer(test);
    const code = String(test.testCode || '').trim();
    // Metal-free plasma and packed RBCs must reach the lab as TWO separate
    // processed materials, though they originate from the same royal-blue draw.
    if (code === '081162') {
      return [
        { key: '081162-metal-free-plasma', label: 'Metal-Free Plasma Transport Tube',
          className: 'tube-transport', count: 1, outputSpecimenType: 'Plasma', sharedSplitSource: true,
          detail: 'Separated plasma in acid-washed metal-free tube · refrigerate' },
        { key: '081162-metal-free-rbcs', label: 'Metal-Free Packed Red Blood Cells Transport Tube',
          className: 'tube-transport', count: 1, outputSpecimenType: 'RBCs', sharedSplitSource: true,
          detail: 'Packed red blood cells in a DIFFERENT acid-washed metal-free tube · refrigerate' }
      ];
    }
    // Orotic acid and urine creatinine are separate aliquots that travel in
    // different temperature bags, never combined with other frozen specimens.
    if (code === '007010') {
      const frozen = String(test.transportTemperature || '').toLowerCase() === 'frozen';
      return [{
        key: frozen ? '007010-orotic-acid-frozen' : '007010-creatinine-room',
        label: frozen ? 'Unpreserved Urine Container (Frozen, Orotic Acid)'
          : 'Unpreserved Urine Container (Room Temp, Creatinine)',
        className: 'tube-transport', count: 1,
        detail: frozen ? 'Freeze immediately · dedicated aliquot · do not share'
          : 'Separate aliquot · keep at room temperature'
      }];
    }
    // Vitamins A/E may travel in spun SST; beta-carotene must have a second
    // light-protected amber tube. Both aliquots can come from one adequate SST.
    if (code === '001750' || code === '144057') {
      return [
        { key: 'vitamin-profile-original-sst', label: 'SST / Gold (spun)',
          className: 'tube-sst', originalTube: true, count: 1,
          detail: 'Vitamin A / E · serum aliquot · keep at room temperature' },
        { key: 'vitamin-profile-amber-' + code, label: 'Amber Transport Tube',
          className: 'tube-amber', count: 1, sourceAlreadyCounted: true,
          outputSpecimenType: 'Serum',
          detail: 'Separate beta-carotene aliquot; protect from light' }
      ];
    }
    // Plain urine aliquot transport tubes/containers can use the same sterile
    // screw-cap specimen cup. Timed collections still need the original jug.
    if (isPlainUrineAliquotTransport(test, transport)) {
      const original = !isTimedUrineTest(test) &&
        cleanCollectionContainer(test.drawContainer) === 'Sterile cup';
      const share = original && isShareableUrineCupTest(test) &&
        !requiresSeparateTransportAliquot(test) && explicitSubmissionCount(test) === 1;
      return [{
        key: `original-urine-cup|${urineCollectionType(test).key}|${share ? 'shared' : String(test.sourceTestId || test.id || test.testCode)}`,
        label: 'Sterile cup', className: 'tube-urine-cup',
        originalTube: original, shareableOriginalUrineCup: share,
        count: explicitSubmissionCount(test),
        detail: original ? 'Submit the original unpreserved sterile cup; no transfer'
          : 'Aliquot from the well-mixed timed/24-hour source into a sterile screw-cap cup; record total volume'
      }];
    }

    if (requiresDualUrinalysisCultureContainers(test)) {
      return [
        { key: 'ua-swirl', label: 'Red/Yellow Swirl UA Preservative Tube', className: 'tube-ua-swirl', count: 1, detail: 'Urine in preservative tube' },
        selectedUrineCultureIsSponge() && isCultureTransportEligible(test)
          ? { key: 'urine-culture-urisponge', label: 'UriSponge Urine Culture Transport', className: 'tube-urisponge', count: 1, detail: 'Saturated UriSponge from sterile cup · do not pour urine into tube' }
          : { key: 'urine-culture', label: 'Gray-Top Urine Culture Preservative Tube', className: 'tube-urine-culture', count: 1, detail: 'Urine in culture preservative tube' }
      ];
    }

    // Multiple compatible unpreserved stool assays from the same bowel movement
    // share one original sterile cup. Keep different sources, timed collections,
    // dedicated kits, and separately submitted specimens distinct.
    if (collectionSpecimenGroupForTest(test) === 'stool'
        && cleanCollectionContainer(test.drawContainer) === 'Sterile cup'
        && cleanCollectionContainer(transport) === 'Sterile cup'
        && explicitSubmissionCount(test) === 1
        && isShareableStoolSourceTest(test)) {
      return [{
        key: 'original-stool-cup|shared',
        label: 'Sterile cup',
        className: 'tube-urine-cup',
        originalTube: true,
        shareableOriginalStoolCup: true,
        count: 1,
        detail: 'Submit original unpreserved stool cup; no transfer'
      }];
    }

    if (isOriginalContainerSubmission(test)) return [originalContainerSubmission(test)];

    if (isCultureTransportEligible(test) && /uri[- ]?sponge/i.test(transport)) {
      return [{
        key: 'urine-culture-urisponge',
        label: 'UriSponge Urine Culture Transport',
        className: 'tube-urisponge',
        count: explicitSubmissionCount(test),
        detail: 'Fully saturate sponge for 5 seconds · do not pour urine into the tube'
      }];
    }

    const specimen = titleCaseSpecimen(normalizeSpecimenType(test.specimenType));
    const sourceSpecimen = specificSpecimenSource(test);

    if (/amber|protect from light|light[- ]?protected/i.test(transport)) {
      const sourcePhrase = specimenSourceDetail(test);
      return [{
        key: `amber|${normalizeSearch(sourcePhrase)}|${normalizeSearch(transport)}`,
        label: isUrineTest(test) && /\b(?:no preservative|unpreserved|23598)\b/i.test(transport)
          ? transport : `Amber ${specimen} Transport Tube — Protect From Light`,
        className: 'tube-amber',
        count: explicitSubmissionCount(test),
        detail: sourcePhrase
      }];
    }

    // One separate frozen tube per serum/plasma assay. Never pool these with
    // routine green-top transport tubes or with other frozen test aliquots.
    if (isFrozenSerumPlasmaTransport(test, transport)) {
      const sourcePhrase = specimenSourceDetail(test);
      return [{
        key: `frozen-transport|${normalizeSearch(sourcePhrase)}|frozen-transport-tube|${normalizeSearch(String(
          timedSpecimenLabel(test) ? test.id : (test.sourceTestId || test.id || test.testCode)
        ))}`,
        label: frozenTransportLabel(test, transport),
        className: 'tube-frozen-purple',
        count: explicitSubmissionCount(test),
        detail: sourcePhrase + ' · Freeze separate aliquot'
      }];
    }

    if (isGenericSerumPlasmaTransport(test, transport) || /transport tube|transfer tube|transport vial|transfer vial|aliquot|cryovial|screw[- ]?cap|pour[- ]?off|plastic.*(?:vial|container)/i.test(transport)) {
      const sourcePhrase = specimenSourceDetail(test);
      const isSwab = /swab/i.test(sourceSpecimen);
      const isSpecialtyMetalContainer = /acid[- ]?washed|acid[- ]?rinsed|metal[- ]?free|trace[- ]?metal/i.test(transport);
      // Preserve the actual named transport medium for non-blood specimens.
      // A Total-Fix or Cary-Blair vial is not a generic "Stool Transport Tube".
      const namedNonBloodDevice = collectionSpecimenGroupForTest(test) !== 'blood' &&
        !/^(?:(?:stool|urine|swab|csf|sputum|saliva|semen|body[- ]?fluid)\s+)?(?:frozen\s+)?(?:transport|transfer)\s+(?:tube|vial|container)$/i.test(transport);
      const label = namedNonBloodDevice ? transport
        : isGenericSerumPlasmaTransport(test, transport) ? 'Transport Tube'
        : /^transport tube$/i.test(transport) || /^frozen transport tube(?:\s*\(.*\))?$/i.test(transport)
          ? 'Transport Tube'
          : isSwab ? 'Swab Transport Tube'
          : (isSpecialtyMetalContainer ? `Acid-Washed / Metal-Free ${specimen} Transport Tube` : `${specimen} Transport Tube`);
      return [{
        key: `transport|${normalizeSearch(sourcePhrase)}|${submissionTransportGroupingKey(test, transport)}`,
        label,
        className: transportTubeClass(test, transport),
        count: explicitSubmissionCount(test),
        detail: isSwab ? `${sourceSpecimen} in transport tube` : sourcePhrase
      }];
    }

    const urineSubtype = isUrineTest(test) ? urineCollectionType(test).key : '';
    return [{
      key: `container|${normalizeSearch(transport)}|${normalizeSearch(sourceSpecimen)}|${urineSubtype}`,
      label: transport || 'Verify Submission Container',
      className: transportTubeClass(test, transport),
      count: explicitSubmissionCount(test),
      detail: sourceSpecimen
    }];
  }

  function isSpunSstSubmission(test) {
    const transport = finalTransportContainer(test).toLowerCase();
    // Group all SST/Gold specimens that are submitted in the original collection
    // tube under one SST card. Some tests describe that same workflow as
    // "Primary tube (do not open)" instead of literally saying SST/Gold.
    return isSstDraw(test)
      && isOriginalContainerSubmission(test)
      && !/transport tube|aliquot|cryovial/.test(transport);
  }

  function buildSubmissionContents(bag) {
    const items = new Map();
    const spunSstTests = bag.tests.filter(test => isSpunSstSubmission(test) && !timedSpecimenLabel(test));
    const spunEstimate = selectedSstEstimateForTests(spunSstTests);
    if (spunEstimate.totalTubes > 0) {
      items.set('sst-spun', {
        key: 'sst-spun',
        label: selectedSstLabel(),
        className: 'tube-sst',
        displayClassName: selectedSstVisualClass(),
        count: spunEstimate.totalTubes,
        detail: `Serum from ${selectedSstLabel()} · spun · submit in original tube`,
        originalTube: true,
        tests: uniqueTests(spunSstTests)
      });
    }

    [
      { estimate: bag.lavenderEstimate, label: 'Lavender EDTA', className: 'tube-lavender' },
      { estimate: bag.redTopEstimate, label: 'Red Top', className: 'tube-red' }
    ].forEach(pool => {
      pool.estimate.groups
        .filter(group => group.path === 'original' && group.estimate.totalTubes > 0)
        .forEach(group => {
          items.set(`pooled-original|${pool.className}|${group.key}`, {
            key: `pooled-original|${pool.className}|${group.key}`,
            label: pool.label,
            className: pool.className,
            count: group.estimate.totalTubes,
            detail: `${titleCaseSpecimen(group.material)} · Submit in original tube`,
            originalTube: true,
            tests: uniqueTests(group.tests)
          });
        });
    });

    bag.tests.forEach(test => {
      if (isSpunSstSubmission(test)) {
        if (timedSpecimenLabel(test)) {
          const key = `timed-original-sst|${test.id}`;
          items.set(key, {
            key,
            label: selectedSstIsTiger() ? 'Tiger SST (Spun)' : 'Gold SST (Spun)',
            className: 'tube-sst',
            displayClassName: selectedSstVisualClass(),
            count: selectedSstEstimateForTests([test]).totalTubes,
            detail: 'Serum · spun · submit in original tube',
            originalTube: true,
            tests: [test]
          });
          return;
        }
        // The original SST is already counted in sst-spun above. The vitamin
        // combination profiles additionally need a dedicated amber aliquot.
        if (['001750', '144057'].includes(String(test.testCode || '').trim())) {
          splitSubmissionContainers(test).filter(container => !container.originalTube).forEach(container => {
            if (!items.has(container.key)) items.set(container.key, { ...container, tests: [] });
            const item = items.get(container.key);
            item.tests.push(test);
          });
        }
        return;
      }
      if ((isLavenderDraw(test) || isRedTopDraw(test)) && isOriginalContainerSubmission(test)) return;
      splitSubmissionContainers(test).forEach(container => {
        if (!items.has(container.key)) items.set(container.key, { ...container, tests: [] });
        const item = items.get(container.key);
        // Compatible direct-submit urine assays can share the very same
        // original sterile cup within a bag, provided volume is sufficient.
        // Dedicated or different urine collection types are never merged.
        if (container.shareableOriginalUrineCup || container.shareableOriginalStoolCup) item.count = Math.max(item.count, container.count);
        else item.count += item.tests.length ? container.count : 0;
        if (!item.detail && container.detail) item.detail = container.detail;
        item.tests.push(test);
      });
    });

    return applySerumPlasmaTransportPooling(items);
  }

  function transferContainerCountForTests(tests) {
    // Reuse the actual submission grouping and pooling logic. In particular,
    // two eligible serum/plasma tests are one tube in BOTH the bag and the
    // transfer-source summary. Preserve priority and temperature separation.
    return buildTransportBagPlan(uniqueTests(tests))
      .reduce((sum, bag) => sum + buildSubmissionContents(bag)
        .filter(item => !item.originalTube)
        .reduce((count, item) => count + Math.max(Number(item.count) || 0, 0), 0), 0);
  }

  function transferSpecimenWord(tests) {
    const materials = Array.from(new Set(tests.map(test => normalizeSpecimenType(test.specimenType).toLowerCase()).filter(Boolean)));
    if (materials.length === 1) {
      if (materials[0] === 'serum') return 'serum';
      if (materials[0] === 'plasma') return 'plasma';
      if (materials[0] === 'platelet poor plasma') return 'platelet-poor plasma';
    }
    return 'transport';
  }

  function bagTransferSourceSummaries(bag) {
    const summaries = [];

    const sstTransferTests = bag.tests.filter(test => isSstDraw(test) && !isOriginalContainerSubmission(test));
    const sstEstimate = selectedSstEstimateForBag(bag);
    if (sstTransferTests.length && sstEstimate.transferSourceTubes > 0) {
      const transportCount = transferContainerCountForTests(sstTransferTests);
      const sourceCount = sstEstimate.transferSourceTubes;
      if (transportCount > 0) {
        summaries.push(`${transportCount} ${transferSpecimenWord(sstTransferTests)} ${transportCount === 1 ? 'tube' : 'tubes'} from ${sourceCount} ${sourceCount === 1 ? 'SST' : 'SSTs'}`);
      }
    }

    const redTransferTests = bag.tests.filter(test => isRedTopDraw(test) && !isOriginalContainerSubmission(test));
    if (redTransferTests.length) {
      const transportCount = transferContainerCountForTests(redTransferTests);
      const sourceCount = bag.redTopEstimate.groups
        .filter(group => group.path === 'transfer')
        .reduce((sum, group) => sum + group.estimate.totalTubes, 0);
      if (transportCount > 0 && sourceCount > 0) {
        summaries.push(`${transportCount} ${transferSpecimenWord(redTransferTests)} ${transportCount === 1 ? 'tube' : 'tubes'} from ${sourceCount} ${sourceCount === 1 ? 'Red Top' : 'Red Tops'}`);
      }
    }

    return summaries;
  }

  function printBagTransferSourceSummary(bag) {
    const summaries = bagTransferSourceSummaries(bag);
    if (!summaries.length) return '';
    return `<div class="print-transfer-source-summary">${summaries.map(summary => `<span>(${escapeHtml(summary)})</span>`).join('')}</div>`;
  }

  function testReferences(tests, statBag = false) {
    return uniqueTests(tests).map(test => statBag
      ? `<li><span class="print-bag-stat-ref"><strong>${escapeHtml(displayCode(test))}</strong><span class="print-bag-stat-name">${escapeHtml(test.testName)}</span><span class="print-bag-test-stat">· STAT</span></span>${manualTestInlineTag(test)}</li>`
      : `<li><strong>${escapeHtml(displayCode(test))}</strong> ${escapeHtml(test.testName)}${manualTestInlineTag(test)}</li>`).join('');
  }

  function derivedSpecimenSourceLabel(test, item) {
    const sourceTube = shortDrawSource(test);
    const specimen = titleCaseSpecimen(normalizeSpecimenType(test.specimenType));
    const lowerSpecimen = specimen.toLowerCase();
    const sourceSpecimen = specificSpecimenSource(test);

    // Always provide an explicit STOOL label on submitted stool containers,
    // including original cups; this is separate from routing/handling notes.
    if (collectionSpecimenGroupForTest(test) === 'stool') return 'Stool';
    // Primary non-stool collection containers already identify ordinary specimen
    // types; only genuinely additional labeling instructions get a badge.
    if (item.originalTube && !/swab/.test(lowerSpecimen) && !/swab/i.test(sourceSpecimen)) return '';
    if (/\brbcs?\b|red blood cell/.test(lowerSpecimen)) return sourceTube ? `RBCs from ${sourceTube}` : 'RBCs';
    if (/plasma/.test(lowerSpecimen)) return sourceTube ? `${specimen} from ${sourceTube}` : specimen;
    if (/urine|stool|swab|saliva|semen|csf|cerebrospinal|tissue/.test(lowerSpecimen) || /swab/i.test(sourceSpecimen)) {
      // Original swab tubes may need the site on the label. Never infer a site
      // from a list of merely acceptable (or unacceptable) swab sources.
      if (/swab/i.test(sourceSpecimen) && /^swab$/i.test(String(test.specimenType || '').trim())) {
        const identifyingText = `${test.testName || ''} ${test.specimenType || ''}`;
        const clearSite = [
          [/nasopharyngeal|\bnp swab\b/i, 'Nasopharyngeal swab'],
          [/\bthroat\b|oropharyngeal/i, 'Throat swab'],
          [/\bvaginal\b/i, 'Vaginal swab'],
          [/\bendocervical\b/i, 'Endocervical swab'],
          [/\bconjunctiv|\beye swab\b/i, 'Conjunctival swab'],
          [/\brectal\b/i, 'Rectal swab'],
          [/\blesion\b/i, 'Lesion swab'],
          [/\bbuccal\b/i, 'Buccal swab'],
          [/\bnasal\b/i, 'Nasal swab'],
          [/\burethral\b/i, 'Urethral swab'],
          [/\bcervical\b/i, 'Cervical swab']
        ].filter(([pattern]) => pattern.test(identifyingText));
        return clearSite.length === 1 ? clearSite[0][1] : 'Collection site: ____';
      }
      return sourceSpecimen;
    }
    if (!sourceTube) return '';

    // For routine SST-derived serum aliquots, including amber tubes, the
    // specimen-type label "Serum" is sufficient. Preserve genuinely special
    // no-additive/trace-metal source instructions and explicit requirements.
    if (lowerSpecimen === 'serum' && (isSstDraw(test) || /^tube-microtainer\b/.test(tubeClass(test.drawContainer)))
      && (/^tube-transport(?:\s|$)/.test(item.className || '')
        || /\btube-amber\b/.test(item.className || ''))) return 'Serum';

    const specialSerumSource = /sst|gold|blue|pink|lavender|edta|heparin|citrate|acd|gray|grey|tan|green/i.test(sourceTube);
    const standardSerumSource = /^(?:sst|gold|red top)$/i.test(sourceTube);
    if (/serum/.test(lowerSpecimen) && specialSerumSource && !standardSerumSource) {
      return `${specimen} from ${sourceTube}`;
    }
    return '';
  }

  // Two independently generated label strings often repeat the same source
  // (e.g. "Platelet-poor plasma from Light Blue Citrate" twice). Strip only
  // redundant specimen-source instructions; preserve additional handling,
  // patient identifiers, time, additives, and other explicit directions.
  function normalizedLabelComparison(value) {
    return String(value || '').toLowerCase()
      // The same SST source is sometimes written as "SST / Gold" in Quest
      // instructions and "Gold / SST" in the calculated transport plan.
      .replace(/\b(?:sst\s*\/\s*gold|gold\s*\/\s*sst)\b/g, 'gold sst')
      .replace(/\bspun\b/g, ' ')
      .replace(/\bcentrifuged\b/g, ' ')
      .replace(/[–—-]/g, ' ')
      .replace(/[^a-z0-9]+/g, ' ')
      .trim().replace(/\s+/g, ' ');
  }

  function explicitLabelAddsInformation(explicit, derived) {
    if (!explicit || !derived) return Boolean(explicit);
    const text = explicit.toLowerCase();
    const derivedText = derived.toLowerCase();
    const normalizedExplicit = normalizedLabelComparison(explicit);
    const normalizedDerived = normalizedLabelComparison(derived);
    if (normalizedExplicit && normalizedExplicit === normalizedDerived) return false;
    // A plain source label (with optional "label") does not add information
    // if it is fully represented by the generated source description.
    const sourceOnly = normalizedExplicit.replace(/^(?:label|mark|specimen|tube) /, '');
    if (sourceOnly && sourceOnly === normalizedDerived) return false;
    const onlySerumType = /(?:mark|label).*(?:specimen type|tube).*serum/.test(text)
      && !/patient|hiv|no additive|identifier/.test(text);
    const onlyPlasmaType = /(?:mark|label).*(?:specimen type|tube).*plasma/.test(text)
      && !/patient|hiv|no additive|identifier/.test(text);
    if (onlySerumType && (derivedText === 'serum' || derivedText.startsWith('serum from '))) return false;
    if (onlyPlasmaType && /^.*plasma(?: from |$)/.test(derivedText)) return false;
    return true;
  }

  // Source-only labeling directions should name the actual specimen on the
  // printed label. Render the existing specimen color badge rather than the
  // vague phrase "specimen source". Do not reinterpret specialized directions.
  // Generic "label source and date/time" wording is formatted once in the
  // printout. The badge beside the container title already identifies the
  // specimen type, so do not repeat that colored badge on every LABEL line.
  // Specific collection sites, timepoints, tube sequences, and special labels
  // remain explicit and must never be discarded.
  function printGenericSpecimenSourceLabel(test, explicit) {
    const wording = String(explicit || '').trim().replace(/\s+/g, ' ').replace(/[.]$/, '');
    const dateTime = '(?:collection\\s+)?date\\s*(?:\\/|and|&)\\s*time';
    const general = new RegExp('^(?:label|mark)\\s+(?:(?:the|exact|precise|specific)\\s+)?(?:specimen\\s+)?source\\s*(?:and|,)\\s*' + dateTime + '$','i');
    const namedSerum = new RegExp('^(?:label|mark)\\s+(?:serum|plasma|whole blood)\\s+specimen\\s+source\\s*(?:and|,)\\s*' + dateTime + '$','i');
    const namedCsf = /^label\s+csf\s*,\s*collection\s+date\s+and\s+time$/i;
    const fluidSource = /^label\s+precise\s+body[- ]fluid\s+source\s*,\s*collection\s+date\/time$/i;
    const jointSite = /^label\s+exact\s+joint\/source\s*,\s*collection\s+date\s+and\s+time$/i;
    const csfSequence = /^label\s+specimen\s+source\s+csf\s*,\s*tube\s+sequence\s*,\s*collection\s+date\s+and\s+time$/i;
    const dateOnly = /^specimen\s+collection\s+date\s+and\s+time$/i;
    const specimen = normalizeSpecimenType(test.specimenType).toLowerCase().trim();
    let note = '';
    if (csfSequence.test(wording)) note = 'Specimen source · Tube sequence · Collection date/time';
    else if (jointSite.test(wording)) note = 'Exact joint/site · Collection date/time';
    else if (fluidSource.test(wording)) note = 'Exact anatomical source/site · Collection date/time';
    else if (dateOnly.test(wording)) note = 'Collection date/time';
    else if (general.test(wording) || namedSerum.test(wording) || namedCsf.test(wording)) {
      if (/\bswab\b/.test(specimen)) note = 'Collection date/time';
      else if (/^(?:body|bodily|other)\s+fluid$/.test(specimen)) note = 'Exact anatomical source/site · Collection date/time';
      else if (/\b(?:pleural|pericardial|peritoneal|synovial|joint|ascitic|pancreatic|amniotic)\s+fluid\b/.test(specimen)) note = 'Source/site · Collection date/time';
      else note = 'Specimen source · Collection date/time';
    }
    if (!note) return null;
    // An inline badge remains useful only if one print item combines multiple
    // specimen types. In a single-source item it duplicates the title badge.
    const badge = printBagSpecimenBadge({ tests: [test] });
    return {
      note,
      token: `\uE000${specimen}\uE001`,
      badge: /Verify Specimen|Mixed Specimens/.test(badge)
        ? '' : badge.replace('print-bag-specimen-badge', 'print-collect-chip-specimen')
    };
  }
  // Remove redundant specimen names but preserve specific label requirements.
  function normalizePrintedLabelDetail(explicit, derived, test) {
    const text = String(explicit || '').trim().replace(/\s+/g, ' ');
    // Strip the redundant category heading sometimes embedded in a label.
    const directive = text.replace(/^site-specific culture swab\s*[-·:]\s*/i, '');
    const match = directive.match(/^label\s+(.+?)\s+(with\s+exact\s+site\s+and|and\s+exact|and|with)\s+collection\s+date\s*(?:\/\s*time|\s+and\s+time)(?:\s*;\s*(.*))?\.?$/i);
    if (!match) return text;
    const subject = match[1].trim();
    const modifier = match[2].toLowerCase();
    // A list of possible urine sources must not appear as though every source
    // applies to this patient's specimen. Ask for the actual collection source.
    if (/^urine\s*[-:]\s*catheterized\s*\/\s*suprapubic\s*\/\s*cystoscopic\s*(?:source)?$/i.test(subject)) {
      return 'Specify actual urine collection source · Collection date/time';
    }
    const known = [derived, normalizeSpecimenType(test.specimenType), specificSpecimenSource(test)];
    const duplicated = known.some(value => value && normalizedLabelComparison(value) === normalizedLabelComparison(subject));
    const detail = String(match[3] || '').trim()
      .replace(/^specify\s+left\s+or\s+right\s+(ear|eye)$/i, 'Specify left/right $1')
      .replace(/\.$/, '');
    const qualifier = /^with\s+exact\s+site/.test(modifier) ? 'Exact site'
      : /^and\s+exact$/.test(modifier) ? 'Exact collection date/time' : 'Collection date/time';
    return [duplicated ? '' : subject, qualifier === 'Exact site' ? 'Exact site · Collection date/time' : qualifier, detail]
      .filter(Boolean).join(' · ');
  }


  // Label text comes from the declared specimen and explicit labeling field,
  // never from narrative processing, rejection criteria, or alternatives.
  // Ordinary date/time and patient identifiers are standard label practice and
  // are not repeated here unless the test requires a special distinction.
  function conciseSpecimenLabel(test, item = {}) {
    const raw = String(test.specialLabeling || '').trim().replace(/\s+/g, ' ');
    const specimenType = normalizeSpecimenType(test.specimenType);
    const specimen = specimenType.toLowerCase();
    const lower = raw.toLowerCase();
    const specificSource = specificSpecimenSource(test);
    const parts = [];
    const add = value => {
      const text = String(value || '').trim();
      if (text && !parts.some(existing => normalizedLabelComparison(existing) === normalizedLabelComparison(text))) parts.push(text);
    };

    let source = specificSource || titleCaseSpecimen(specimenType);
    if (/^(?:site[- ]specific\s+)?culture\s+swab$/i.test(specimenType) || /^(?:swab,?\s*unspecified|site[- ]specific\s+culture\s+swab)$/i.test(specimenType)) source = 'Swab';
    if (/\bvesicle\s*\/\s*lesion\s+swab\b/i.test(raw) && /\bswab\b/.test(specimen)) source = 'Vesicle/lesion swab';
    if (/^other\s*\/\s*verify$/i.test(source)) source = 'Specimen';

    // A generic swab needs an actual site; never infer it from a list of
    // acceptable or rejected swabs in the test description.
    if (/\bswab\b/i.test(specimenType) &&
        (/^collection site:\s*_+$/i.test(source) || /^swab$/i.test(source)))
      source = 'Swab';

    // Plasma/serum from a specialized primary tube must name its additive
    // and original source on the label, not just on the transfer instruction.
    const drawSourceForLabel = shortDrawSource(test);
    const oneBloodMaterial = (/\b(?:plasma|serum)\b/i.test(specimenType) && !/\bor\b/i.test(specimenType)) || item.outputSpecimenType === 'RBCs';
    const standardSerumSource = /^(?:sst\b|gold\b|tiger\b|red top\b|amber microtainer sst\b)/i.test(drawSourceForLabel);
    const verifiedSpecialSource = /\b(?:edta|heparin|citrate|fluoride|oxalate|royal blue|acd|metal[- ]?free|trace[- ]?metal)\b/i.test(drawSourceForLabel) &&
      !/\bverify\b/i.test(drawSourceForLabel);
    const drawSourceQualifier = oneBloodMaterial && !standardSerumSource && verifiedSpecialSource
      ? drawSourceForLabel : '';

    if (/^Label each timed specimen with actual collection date and time$/i.test(raw)) {
      add('Collection date/time on each tube');
    }

    const explicit = /^(?:label\b|mark\b|identify\b|write\b|specimen\s+collection\b)/i.test(raw);
    // Salivary cortisol is explicitly timed. State the identity, sequence and
    // collection time on the printed label for every ORIGINAL Salivette device.
    if (/\bsalivette\b/i.test(`${test.drawContainer || ''} ${test.transportContainer || ''}`)
        && /\bcortisol\b/i.test(String(test.testName || ''))) {
      const samples = Math.max(1, Math.floor(Number(test.submissionCount) || Number(test.collectionCount) || 1));
      if (samples > 1) add(`Number devices 1–${samples} of ${samples}`);
      add('Collection time');
    }
    if (explicit) {
      // Only a declared label instruction can add label-specific details.
      if (/\b(?:trace\s*metal[- ]?free|metal[- ]?free)\b/i.test(raw)) add('Trace metal-free');
      if (/\bedta\s+plasma\b|\bplasma\s+from\s+(?:spun\s+)?(?:lavender|edta)\b/i.test(raw)) add('EDTA');
      if (/\bgreen\s+sodium\s+heparin\b/i.test(raw)) add('Sodium heparin');
      if (/\broyal\s+blue\s+edta\s*\(purple\s+stripe\)/i.test(raw)) add('Royal blue EDTA (purple stripe)');
      if (/\blower\s+respiratory\s+tract\b/i.test(raw)) add('Lower respiratory tract');
      if (/\bmultiple\s+screw[- ]?cap\s+aliquots\b/i.test(raw)) add('Label each aliquot');
      if (/\bplasma\s+from\s+gray\s+fluoride\s*\/\s*oxalate\b/i.test(raw)) add('Fluoride/oxalate');
      if (/\bcitrate\s+plasma\b/i.test(raw)) add('Citrated');
      if (/catheterized\s*\/\s*suprapubic\s*\/\s*cystoscopic/i.test(raw)) add('Actual collection method');
      else if (/\b(?:exact|specific|precise)\b.{0,42}\b(?:anatomic(?:al)?\s+)?(?:source|site|joint|location)\b|\b(?:source|site)\b.{0,24}\b(?:exact|specific)\b|\bspecify\s+(?:exact\s+)?(?:site|source)/i.test(raw)) {
        add(/\b(?:swab|eye|ear|lesion)\b/i.test(specimenType) ? 'Exact collection site' : 'Exact anatomical source/site');
      }
      // For CSF and fluid specimens, a source requested without "exact" is
      // still a source-label requirement. Do not infer source from general notes.
      if (/\b(?:csf|fluid|sputum)\b/i.test(specimen) &&
          /(?:\b(?:anatomical|anatomic|specimen)\s+source\b|\bcollection\s+(?:date\/time\s+and\s+)?source\b|\bdate\/time\s+and\s+source\b)/i.test(raw) &&
          !parts.some(value => /source\/site|lumbar|lower respiratory tract/i.test(value)))
        add('Anatomical source/site');
      if (/\b(?:left\s+or\s+right|left\/right|laterality)\b/i.test(raw)) add('Left/right');
      if (/\bacute\s+or\s+convalescent\b/i.test(raw)) add('Acute or convalescent');
      if (/\btube\s*(?:number|sequence|#)\b/i.test(raw)) {
        const tube = raw.match(/\btube\s*#\s*(\d+)\b/i);
        add(tube ? 'Tube #' + tube[1] : 'Tube sequence');
      }
      if (/\blumbar\s+puncture\b/i.test(raw)) add('Lumbar puncture source');
      if (/\btwo\s+patient\s+identifiers\b|\b2\s+patient\s+identifiers\b/i.test(raw)) add('Two patient identifiers');
      if (/\bpatient\s+age\b|\bage\s+and\s+start/i.test(raw)) add('Patient age');
      if (/\bverified\s+ph\b|\bph\s*[≤<]/i.test(raw)) add('Verified pH');
      if (/\bend\s+of\s+shift\b/i.test(raw)) add('End of shift');
      if (/\bend\s+of\s+workweek\b/i.test(raw)) add('End of workweek');
      if (/\b(?:2[- ]hour\s+postprandial|post[- ]prandial)\b/i.test(raw)) add('Postprandial');
      if (/\bmeal\s*\/\s*draw\s+time\b/i.test(raw)) add('Meal/draw times');
      else if (/\bcollection\s+and\s+separation\s+time\b/i.test(raw)) add('Collection and separation times');
      else if (/\b(?:exact\s+(?:(?:collection|draw|meal)\s+)?(?:date|time)|draw\s+time|exposure\s+time|time\s+of\s+draw)\b/i.test(raw))
        add('Exact collection time');
      const timedUrineHours = String(specimenType).match(/\b(12|24)\s*[- ]?\s*(?:hour|hr|h)\b/i)
        || raw.match(/\b(12|24)\s*[- ]?\s*(?:hour|hr|h)\b/i);
      if (/\burine\b/.test(specimen) && timedUrineHours) {
        add('Total ' + timedUrineHours[1] + '-hour volume');
        add('Start/end times');
      } else if (/(?:start\s*\/\s*end|start\s+and\s+end)\s+(?:date\s*\/\s*)?time/i.test(raw)) {
        add('Start/end times');
      }
      // Fasting or a paired specimen is not an instruction to write that
      // description on the current container. Its own required draw remains
      // in the separate collection/submission route.
    } else if (/^(?:fasting|baseline|pre[- ]dose|post[- ]dose|\d+\s*[- ]?hour)\b/i.test(raw)) {
      add(raw.split(/\s*[-–:]\s*/)[0]);
    }
    const timedLabel = /^(?:fasting|baseline|pre[- ]dose|post[- ]dose|\d+\s*[- ]?hour)\b/i.test(raw);
    const timedPeriod = raw.match(/^Timed specimen \d+\s*:\s*(AM|PM)\b/i);
    if (timedPeriod) add(timedPeriod[1].toUpperCase());
    if (explicit || timedLabel || timedPeriod) {
      const dateAndTime = /\b(?:collection\s+)?dates?\s*(?:\/|and|&)\s*times?\b/i.test(raw);
      const drawTime = /\b(?:collection|draw)\s+times?\b|\btime\s+of\s+(?:draw|collection)\b/i.test(raw);
      if (dateAndTime && !parts.some(part => /date\/time/.test(part))) {
        if (is24HourUrineTest(test) && /\b(?:start|begin)\b/i.test(raw) && /\b(?:end|finish)\b/i.test(raw)) {
          const abbreviated = parts.indexOf('Start/end times');
          if (abbreviated !== -1) parts.splice(abbreviated, 1);
          add('Collection start/end dates and times');
        } else {
          add('Collection date/time');
        }
      } else if (drawTime && !parts.some(part => /\btime\b/i.test(part))) {
        add('Collection time');
      }
      if (/\bpeak\b/i.test(raw) && /\btrough\b/i.test(raw)) add('Identify peak or trough');
    }
    if (is24HourUrineTest(test)) {
      add('Total 24-hour volume');
      if (!parts.includes('Collection start/end dates and times')) add('Start/end times');
    }

    // A genuine handling instruction in a label field must not masquerade as
    // text to write on the vial. Handling is displayed on a separate line.
    const processing = [];
    if (/\bfroz(?:en)?\s+immediately\s+after\s+separation\b|\bfreeze\s+immediately\s+after\s+separation\b/i.test(raw))
      processing.push('Freeze immediately after separation');
    else if (/\b(?:freeze|frozen)\b/i.test(raw)) processing.push('Keep frozen');
    if (/\blight\s+protected\b|\bprotect\s+from\s+light\b/i.test(raw) && !/amber|protect from light/i.test(String(item.label || '')))
      processing.push('Protect from light');

    // Specimen identity and site are part of a useful submitted-container
    // label. Keep explicit site instructions, and prompt only when absent.
    if (/\bswab\b/i.test(specimenType) && /^swab$/i.test(source) &&
        !parts.some(part => /\b(?:site|source)\b/i.test(part)))
      add('Collection site: ____');
    if (/^(?:(?:other|bodily)\s+)?body\s+fluid$|^bodily\s+fluid$/i.test(source) &&
        !parts.some(part => /\b(?:site|source)\b/i.test(part)))
      add('Anatomical source/site: ____');

    const hasSpecialDetails = parts.length > 0;
    // A submitted stool, urine or swab container always needs its specimen
    // identity, including when the original collection container is submitted.
    const alwaysLabelSpecimen = /\b(?:stool|feces|fecal|faeces|faecal|urine|swab)\b/i.test(specimenType);
    // The name of a generic transfer tube, sterile cup or trace-metal-free
    // container does not indicate what specimen is actually inside.
    const submissionContainer = [item.label, test.transportContainer].filter(Boolean).join(' ');
    const genericSubmissionContainer = /\b(?:transport|transfer)\s+(?:tube|vial|container)s?\b|\b(?:aliquot|cryovial|sterile\s+(?:urine\s+|specimen\s+)?cup|trace[- ]?metal[- ]?free|metal[- ]?free|acid[- ]?washed|trace[- ]?element)\b/i.test(submissionContainer);
    const onlyRoutineDateTime = /^(?:label|mark)\s+(?:specimen\s+)?(?:collection\s+)?date\s*(?:\/|and|&)\s*time\.?$/i.test(raw);
    const needsPrintedLabel = !item.originalTube || hasSpecialDetails || (explicit && !onlyRoutineDateTime)
      || alwaysLabelSpecimen || genericSubmissionContainer || Boolean(drawSourceQualifier);
    if (needsPrintedLabel && /^(?:specimen|other clinical specimen|unspecified specimen|multiple specimen types|various specimens)$/i.test(source))
      source = 'Specimen type/source: ____';

    // The full source tube already contains EDTA, citrate or heparin.
    // Do not repeat those additives as separate label fragments.
    const labelParts = [source, drawSourceQualifier];
    parts.forEach(part => {
      const normalizedPart = normalizedLabelComparison(part);
      const normalizedTube = normalizedLabelComparison(drawSourceQualifier);
      const repeatedAdditive = normalizedTube && (normalizedTube.includes(normalizedPart)
        || (normalizedPart === 'citrated' && normalizedTube.includes('citrate')));
      if (!repeatedAdditive) labelParts.push(part);
    });
    const label = needsPrintedLabel ? labelParts.filter(Boolean).join(' • ') : '';
    return { label, processing: Array.from(new Set(processing)) };
  }

  function printLabelingNotes(item) {
    // The allocation note lists every timed tube. Print each distinct
    // labeling and handling instruction once, in first-use order.
    if (item.printVisualGroupParts && item.printVisualGroupParts.every(part => printTimedSpecimenGroupInfo(part))) {
      const notes = item.printVisualGroupParts.map(part => printLabelingNotes(part));
      return [...new Set(notes)].join('');
    }
    const labels = new Map();
    const handling = new Map();
    const contexts = (item.printVisualGroupParts || [item]).flatMap(part =>
      uniqueTests(part.tests || []).map(test => ({ test, part })));
    contexts.forEach(({ test, part }) => {
      const result = conciseSpecimenLabel(specimenForSubmissionItem(test, part), part);
      const code = displayCode(test);
      if (result.label) {
        const key = normalizedLabelComparison(result.label);
        if (!labels.has(key)) labels.set(key, { text: result.label, codes: [] });
        labels.get(key).codes.push(code);
      }
      result.processing.forEach(note => {
        const key = normalizedLabelComparison(note);
        if (!handling.has(key)) handling.set(key, { text: note, codes: [] });
        handling.get(key).codes.push(code);
      });
    });
    if (!labels.size && !handling.size) return '';
    const render = (rows, kind, showCodes) => Array.from(rows.values()).map(({text: note, codes}) =>
      `<div class="print-label-note${kind === 'Process' ? ' print-label-process' : ''}"><span>${kind}</span><div>${escapeHtml(note)}${showCodes ? ` <small>${escapeHtml([...new Set(codes)].join(', '))}</small>` : ''}</div></div>`).join('');
    // A unique requirement that applies to only one of several tests still
    // needs its code, even if it is the sole visible LABEL/PROCESS row.
    const testCount = uniqueTests(item.tests || []).length;
    const labelCoverage = new Set(Array.from(labels.values()).flatMap(row => row.codes)).size;
    const processCoverage = new Set(Array.from(handling.values()).flatMap(row => row.codes)).size;
    const showLabelCodes = labels.size > 1 || (testCount > 1 && labelCoverage < testCount);
    const showProcessCodes = handling.size > 1 || (testCount > 1 && processCoverage < testCount);
    return `<div class="print-label-notes">${render(labels, 'Label', showLabelCodes)}${render(handling, 'Process', showProcessCodes)}</div>`;
  }

  function isTransferSubmission(test) {
    if (isOriginalContainerSubmission(test)) return false;
    const value = finalTransportContainer(test);
    const lower = value.toLowerCase();
    const source = canonicalCollectionContainer(test);
    const transportClass = transportTubeClass(test, value);
    if (/transport tube|aliquot|cryovial|screw[- ]?cap|pour[- ]?off|preservative/i.test(value)) return true;
    if (isUrineTest(test) && !isTimedUrineTest(test) && source.className === 'tube-urine-cup') return true;
    return Boolean(source.className && transportClass && source.className !== transportClass);
  }

  function printTransferSourceBadge(test) {
    if (!isTransferSubmission(test)) return '';
    const source = canonicalCollectionContainer(test);
    if (!source.label || !source.className) return '';
    const isSstSource = source.className === 'tube-sst';
    const displayClass = isSstSource ? selectedSstVisualClass() : source.className;
    const displayLabel = isSstSource ? selectedSstTransportLabel() : source.label;
    return `<span class="print-source-tube-badge tube ${displayClass}">From ${escapeHtml(displayLabel)}</span>`;
  }

  function transferSourceTubeCountForItemTests(tests, source) {
    const unique = uniqueTests(tests);
    if (!unique.length || !source || !source.className || !source.label) return 0;

    // Use the same collection-plan engine that powers "What to collect" so the
    // source count badge works for every transfer source, not just SST/Red/Lavender.
    // This keeps Royal Blue, heparin, citrate, urine cups, and other source tubes
    // consistent with the actual collection count and pooling rules.
    const sourceBags = buildTransportBagPlan(unique);
    const sourceItems = buildCollectionPlan(unique, sourceBags);
    const sourceLabel = normalizeSearch(source.label);

    return sourceItems
      .filter(item => item.className === source.className && normalizeSearch(item.label) === sourceLabel)
      .reduce((sum, item) => sum + Math.max(Number(item.count) || 0, 0), 0);
  }

  // A single order can have an original-tube submission AND a transfer.
  // Determine the source from the actual output card, not the primary route.
  function isTransferForSubmissionItem(test, item) {
    if (!item || item.originalTube) return false;
    if (isTransferSubmission(test)) return true;
    return splitSubmissionContainers(test).some(route => route.key === item.key && !route.originalTube);
  }

  // Display the actual output material without changing collection estimates.
  function specimenForSubmissionItem(test, item) {
    return item.outputSpecimenType ? { ...test, specimenType: item.outputSpecimenType } : test;
  }

  function submissionSourceGroupsForItem(item) {
    const badges = new Map();
    if (!item || item.originalTube) return badges;
    uniqueTests(item.tests || []).forEach(test => {
      if (!isTransferForSubmissionItem(test, item)) return;
      const source = canonicalCollectionContainer(test);
      if (!source.label || !source.className) return;
      const key = `${source.className}|${source.label}`;
      if (!badges.has(key)) badges.set(key, { key, source, tests: [] });
      badges.get(key).tests.push(test);
    });
    return badges;
  }

  function isBloodTransferSourceGroup(tests) {
    const groups = new Set(uniqueTests(tests || []).map(collectionSpecimenGroupForTest));
    return groups.size === 1 && groups.has('blood');
  }

  function applyBloodSourceCountAllocations(contents) {
    // Blood transfer cards never share a displayed source-tube allocation across
    // destination cards. Each card gets its own numbered source count, and What
    // to Collect intentionally draws the sum of those card-level counts.
    contents.forEach(item => {
      submissionSourceGroupsForItem(item).forEach(group => {
        if (!isBloodTransferSourceGroup(group.tests) || item.sourceAlreadyCounted || item.sharedSplitSource) return;
        const sourceCount = transferSourceTubeCountForItemTests(group.tests, group.source);
        if (!item.sourceCountOverrides) item.sourceCountOverrides = new Map();
        item.sourceCountOverrides.set(group.key, Math.max(sourceCount, 1));
      });
    });
  }

  // Specimen identity within the transfer-source pill is a print-only cue;
  // the colored specimen badge in the title remains the source of truth.
  function printTransferSpecimenType(tests) {
    const types = [...new Set(uniqueTests(tests || []).map(test => normalizeSpecimenType(test.specimenType).toLowerCase().trim()))];
    if (!types.length) return { label: 'Specimen', color: 'other' };
    const categories = types.map(specimen => {
      if (/\b(?:stool|feces|fecal|faeces|faecal)\b/.test(specimen)) return ['Stool', 'stool'];
      if (/\burine\b/.test(specimen)) return ['Urine', 'urine'];
      if (/\b(?:platelet[- ]poor )?plasma\b/.test(specimen)) return [specimen.includes('platelet') ? 'Platelet-Poor Plasma' : 'Plasma', 'plasma'];
      if (/\bserum\b/.test(specimen)) return ['Serum', 'serum'];
      if (/\brbcs?\b|red blood cells/.test(specimen)) return ['Red Blood Cells', 'rbc'];
      if (/\bwhole blood\b/.test(specimen)) return ['Whole Blood', 'blood'];
      if (/\bblood\b/.test(specimen)) return ['Blood', 'blood'];
      if (/\bswab\b/.test(specimen)) return ['Swab', 'swab'];
      if (/\b(?:csf|cerebrospinal)\b/.test(specimen)) return ['CSF', 'csf'];
      if (/\bsputum\b/.test(specimen)) return ['Sputum', 'sputum'];
      if (/\b(?:fluid|saliva|semen|bile)\b/.test(specimen)) return [titleCaseSpecimen(specimen), 'fluid'];
      if (/\btissue\b/.test(specimen)) return ['Tissue', 'other'];
      return ['Specimen', 'other'];
    });
    const labels = new Map(categories.map(([label, color]) => [label, color]));
    return labels.size === 1
      ? { label: labels.keys().next().value, color: labels.values().next().value }
      : { label: 'Mixed', color: 'other' };
  }

  function printSubmissionSourceBadges(item) {
    if (item.originalTube) return '';
    const badges = submissionSourceGroupsForItem(item);
    if (!badges.size) return '';

    return `<span class="print-source-badges">${Array.from(badges.values()).map(({ key, source, tests }) => {
      const hasOverride = item.sourceCountOverrides instanceof Map && item.sourceCountOverrides.has(key);
      const sharedSource = item.sourceAlreadyCounted || item.sharedSplitSource;
      const sourceCount = sharedSource ? 0 : (hasOverride ? item.sourceCountOverrides.get(key) : transferSourceTubeCountForItemTests(tests, source));
      // The timed collection container can supply more than one aliquot.
      // Never imply that each aliquot requires another collection jug.
      const showSourceCount = !['tube-urine-cup', 'tube-24h-urine'].includes(source.className) && !sharedSource;
      const countBadge = showSourceCount && sourceCount > 0 ? `<span class="print-source-count">${sourceCount}</span>` : '';
      const displayClass = source.className === 'tube-sst' ? selectedSstVisualClass() : source.className;
      // Keep the number, icon, and entire "From ..." source inside the original pill.
      // Only the separate "· Spin" processing cue belongs outside the pill.
      const outputTests = uniqueTests(tests).map(test => specimenForSubmissionItem(test, item));
      const spun = outputTests.length > 0 && outputTests.every(test => {
        const specimen = normalizeSpecimenType(test.specimenType).toLowerCase();
        return /^(?:serum|plasma|platelet[- ]poor plasma|rbcs?|red blood cells)$/.test(specimen)
          && /^yes$/i.test(String(test.spin || '').trim());
      });
      const sourceLabel = source.label;
      const specimen = printTransferSpecimenType(outputTests);
      const specimenCue = `<span class="print-source-specimen source-${specimen.color}">${escapeHtml(specimen.label)}</span>`;
      // The upward arrow sits before the intact pill, while specimen identity,
      // From spun/source wording, tube icon and quantity all remain inside it.
      return `<span class="print-source-group"><span class="print-source-transfer-arrow" aria-hidden="true">↑</span><span class="print-source-transfer-word">Transfer</span><span class="print-source-tube-badge tube ${displayClass}">${countBadge}${specimenCue}<span class="print-source-from">from</span><span class="print-source-origin">${spun ? '<span class="print-source-spun-label">Spun</span> ' : ''}<span class="print-source-tube-name">${escapeHtml(sourceLabel)}</span></span></span>${spun ? '<span class="print-source-spun">· Spin ✓</span>' : ''}</span>`;
    }).join('')}</span>`;
  }

  function printProcessedTransferDetail(item) {
    const detail = String(item.detail || '');
    if (!detail || item.originalTube || !/^(?:serum|plasma|platelet[- ]poor plasma) from\b/i.test(detail)) {
      return detail;
    }

    // Add a processing cue only when every test in this transport card is a
    // centrifuged blood-to-serum/plasma transfer. Do not suggest spinning
    // whole blood, cells, urine, or a specimen whose test says not to spin.
    const tests = uniqueTests(item.tests || []);
    const allRequireSpin = tests.length > 0 && tests.every(test =>
      collectionSpecimenGroupForTest(test) === 'blood' &&
      isTransferSubmission(test) &&
      /^(?:serum|plasma|platelet[- ]poor plasma)$/i.test(normalizeSpecimenType(test.specimenType)) &&
      /^yes$/i.test(String(test.spin || '').trim())
    );
    // Keep the specimen type first; "spun" modifies the source collection tube.
    // Example: "Plasma from spun Lavender EDTA".
    return allRequireSpin
      ? detail.replace(/^((?:serum|plasma|platelet[- ]poor plasma) from )(?!spun\b)/i, '$1spun ')
      : detail;
  }

  // Printed submission cards show the specimen identity separately from the
  // container. This is display-only: no pooling, label, or shipment changes.
  function printBagSpecimenBadge(item) {
    const categories = (item.tests || []).map(originalTest => {
      const test = specimenForSubmissionItem(originalTest, item);
      const specimen = normalizeSpecimenType(test.specimenType).toLowerCase().trim();
      if (specificSpecimenSource(test) === 'Meconium') return ['Meconium', 'stool'];
      if (/\b(?:stool|feces|fecal|faeces|faecal)\b/.test(specimen)) return ['Stool', 'stool'];
      if (/\burine\b/.test(specimen)) return ['Urine', 'urine'];
      if (/\b(?:platelet[- ]poor )?plasma\b/.test(specimen)) return [specimen.includes('platelet') ? 'Platelet-Poor Plasma' : 'Plasma', 'plasma'];
      if (/\bserum\b/.test(specimen)) return ['Serum', 'serum'];
      if (/\brbcs?\b|red blood cells/.test(specimen)) return ['Red Blood Cells', 'rbc'];
      if (/\bwhole blood\b/.test(specimen)) return ['Whole Blood', 'blood'];
      if (/\b(?:blood)\b/.test(specimen)) return ['Blood', 'blood'];
      if (/\bswab\b/.test(specimen)) return ['Swab', 'swab'];
      if (/\b(?:csf|cerebrospinal)\b/.test(specimen)) return ['CSF', 'csf'];
      if (/\bsputum\b/.test(specimen)) return ['Sputum', 'sputum'];
      if (/\b(?:body|bodily|pericardial|peritoneal|pleural|synovial|pancreatic|amniotic|ascitic|joint|bursal|aqueous|vitreous)\b.*\bfluids?\b|\b(?:ascites|effusion|drainage|saliva|semen|bile)\b/.test(specimen))
        return [titleCaseSpecimen(test.specimenType), 'fluid'];
      if (/\btissue\b/.test(specimen)) return ['Tissue', 'other'];
      return ['Verify Specimen', 'other'];
    });
    const unique = new Map(categories.map(([label, category]) => [label, category]));
    const [label, color] = unique.size === 0 ? ['Verify Specimen', 'other']
      : unique.size === 1 ? [unique.keys().next().value, unique.values().next().value]
      : ['Mixed Specimens', 'other'];
    return `<span class="print-bag-specimen-badge specimen-${color}">${escapeHtml(label)}</span>`;
  }

  function printSubmissionItemDetail(item) {
    const badges = printSubmissionSourceBadges(item);
    const detail = String(item.detail || '').trim();
    // The specimen type already appears in the colored title badge. For a transfer,
    // show the original full source pill, and a separate spin cue when applicable.
    if (badges) {
      // A few device-specific handling instructions are more than a generic
      // source line and should remain visible, in addition to the transfer cue.
      const handling = [];
      if (item.sourceAlreadyCounted && !String(item.key || '').startsWith('vitamin-profile-amber-')) handling.push('Use collection SST already counted; retain enough serum for original submission');
      if (item.sharedSplitSource) handling.push('Same collection source for both outputs; verify sufficient yield of each material');
      if (item.sourceAlreadyCounted || item.sharedSplitSource ||
          /fully saturate|do not pour|\b\d+\s*seconds?\b|protect from light|freeze immediately|freeze separate aliquot|fill (?:to|line)|acid[- ]washed|preserv|separate aliquot|record total volume/i.test(detail)) {
        let retained = detail;
        const prefix = (item.tests || []).map(specimenSourceDetail).find(source =>
          source && retained.startsWith(source + ' · '));
        if (prefix) retained = retained.slice(prefix.length + 3);
        if (retained) handling.push(retained);
      }
      const critical = handling.join(' · ');
      return `<div class="print-submit-item-detail">${badges}${critical ? `<span class="print-source-extra">${escapeHtml(critical)}</span>` : ''}</div>`;
    }
    // Original-tube submission is a handling instruction, not a specimen label.
    // Restore it even though the colored badge above already identifies specimen
    // type. Both Gold and Tiger SST share the same clear spun-SST instruction.
    if (item.originalTube) {
      // An original sterile urine cup is not a blood tube and was never
      // transferred. Keep this explicit in the printed submission bag.
      if (item.className === 'tube-urine-cup' &&
          (item.tests || []).every(test => isUrineTest(test))) {
        return '<div class="print-submit-item-detail">Submit original sterile cup · No transfer</div>';
      }
      const isSpunSst = item.key === 'sst-spun';
      const isMicrotainerSst = /^tube-microtainer\b/.test(item.className);
      const spins = /\bspun\b|\bcentrifug/i.test(detail)
        || (isMicrotainerSst && uniqueTests(item.tests || []).every(test => /^yes$/i.test(String(test.spin || '').trim())));
      const exceptional = /fully saturate|do not pour|protect from light/i.test(detail) ? detail : '';
      const handling = isSpunSst
        ? 'Submit in original tube · Spin ✓'
        : `${/^sterile cup$/i.test(item.label) ? 'Submit in original container' : 'Submit in original tube'}${spins ? ' · Spin ✓' : ''}`;
      const lightProtection = isMicrotainerSst && /amber/i.test(item.label || '') ? ' · Protect from light' : '';
      const text = `${handling}${lightProtection}${exceptional ? ` · ${exceptional}` : ''}`;
      return `<div class="print-submit-item-detail">${escapeHtml(text)}</div>`;
    }
    // Other non-transfer containers can have meaningful processing directions.
    // Pure specimen names are redundant with the specimen-type badge.
    const redundant = /^(?:serum|plasma|platelet[- ]poor plasma|rbcs?|red blood cells|stool|urine|whole blood|blood|swab|saliva|csf|tissue)$/i.test(detail);
    if (!detail || redundant) return '';
    return `<div class="print-submit-item-detail">${escapeHtml(detail)}</div>`;
  }

  function parseListedSpecimenVolumeMl(value) {
    const text = String(value || '').replace(/,/g, ' ').replace(/\s+/g, ' ').trim();
    if (!text) return null;

    // Prefer an explicitly stated total over any component/per-tube volume.
    const totalMatch = text.match(/\btotal(?:\s+(?:volume|specimen))?\s*:?\s*(\d+(?:\.\d+)?)\s*m\s*l\b/i);
    if (totalMatch) return Number(totalMatch[1]);

    // Handle formats such as "1.9 mL (x3)" or "1.9 mL x 3".
    const amountThenCount = text.match(/(\d+(?:\.\d+)?)\s*m\s*l\s*(?:\(\s*)?[x×]\s*(\d+)(?:\s*\))?/i);
    if (amountThenCount) return Number(amountThenCount[1]) * Number(amountThenCount[2]);

    // Handle formats such as "3 x 1.5 mL".
    const countThenAmount = text.match(/\b(\d+)\s*[x×]\s*(\d+(?:\.\d+)?)\s*m\s*l\b/i);
    if (countThenAmount) return Number(countThenAmount[1]) * Number(countThenAmount[2]);

    // If the text explicitly says the listed amount is required in each of N tubes,
    // calculate the total.
    const eachMatch = text.match(/(\d+(?:\.\d+)?)\s*m\s*l\b[^.;]{0,100}\b(?:in\s+each\s+of|each\s+of|per)\s+(\d+|two|three|four|five|six|seven|eight|nine|ten)\b/i);
    if (eachMatch) {
      const words = { two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10 };
      const count = words[String(eachMatch[2]).toLowerCase()] || Number(eachMatch[2]);
      if (count > 0) return Number(eachMatch[1]) * count;
    }

    const first = text.match(/(\d+(?:\.\d+)?)\s*m\s*l\b/i);
    return first ? Number(first[1]) : null;
  }

  function listedVolumeAlreadyTotalsMultipleTubes(value) {
    const text = String(value || '').replace(/,/g, ' ').replace(/\s+/g, ' ').trim();
    if (!text) return false;
    return /\btotal(?:\s+(?:volume|specimen))?\s*:?\s*\d+(?:\.\d+)?\s*m\s*l\b/i.test(text)
      || /\d+(?:\.\d+)?\s*m\s*l\s*(?:\(\s*)?[x×]\s*\d+/i.test(text)
      || /\b\d+\s*[x×]\s*\d+(?:\.\d+)?\s*m\s*l\b/i.test(text)
      || /\d+(?:\.\d+)?\s*m\s*l\b[^.;]{0,100}\b(?:in\s+each\s+of|each\s+of|per)\s+(?:\d+|two|three|four|five|six|seven|eight|nine|ten)\b/i.test(text);
  }

  function listedVolumeIsPerTube(value) {
    const text = String(value || '').replace(/,/g, ' ').replace(/\s+/g, ' ').trim();
    return /\b(?:each|per)\s+(?:tube|specimen|aliquot|sample)\b/i.test(text)
      || /\b(?:each|per)\s+specimen\b/i.test(text);
  }

  function wholeBloodConversionFactor(specimenType) {
    const specimen = normalizeSearch(specimenType);
    if (/whole blood/.test(specimen)) return { factor: 1, type: 'whole-blood' };
    if (/serum|plasma|platelet/.test(specimen)) return { factor: SERUM_PLASMA_TO_WHOLE_BLOOD_FACTOR, type: 'serum-plasma' };
    if (/\brbcs?\b|red blood cell|packed red/.test(specimen)) return { factor: RBC_TO_WHOLE_BLOOD_FACTOR, type: 'rbc' };
    return null;
  }

  function formatCalculatedMl(value) {
    if (!Number.isFinite(value)) return 'Verify';
    const rounded = Math.round((value + Number.EPSILON) * 100) / 100;
    return `${rounded.toLocaleString(undefined, { maximumFractionDigits: 2 })} mL`;
  }

  function hasCollectionFillRule(test) {
    // Reviewed serum components have no calibrated fill requirement; a full
    // EDTA tube mentioned by the parent profile belongs to its own component.
    if (reviewedSstComponentPolicy(test)) return false;
    const text = `${test.drawContainer || ''} ${test.preferredVolume || ''} ${test.minimumVolume || ''} ${test.specialInstructions || ''}`;
    return /fill(?:ed)?\s+(?:the\s+)?(?:collection\s+)?tube\s+(?:completely|to)|fill(?:ed)?\s+to\s+(?:the\s+)?(?:marked\s+)?line|fill\s+line|marked\s+line|full\s+(?:unopened\s+)?(?:collection\s+)?(?:tube|sst|gold|lavender|red(?:-top)?|edta)|completely\s+fill/i.test(text);
  }

  function levelRequiresUnknownFullTube(test, level) {
    const value = String(level === 'preferred' ? test.preferredVolume : test.minimumVolume || '');
    if (!/\bfull\s+(?:collection\s+)?(?:[a-z0-9.%()/-]+\s+){0,4}tube\b/i.test(value)) return false;
    return parseListedSpecimenVolumeMl(value) === null;
  }

  function volumeForRequirement(test, level, conversion) {
    const value = String(level === 'preferred' ? test.preferredVolume : test.minimumVolume || '');
    const parsed = parseListedSpecimenVolumeMl(value);
    if (parsed === null) return null;
    let specimenMl = parsed;
    const count = explicitCollectionCount(test);
    if (count > 1 && !listedVolumeAlreadyTotalsMultipleTubes(value) && listedVolumeIsPerTube(value)) {
      specimenMl *= count;
    }
    return specimenMl * conversion.factor;
  }

  function buildWholeBloodVolumePlan(collectionTests, collectionItems) {
    const plannedCounts = new Map();
    collectionItems.forEach(item => {
      const key = `${item.className || ''}|${normalizeSearch(item.label)}`;
      plannedCounts.set(key, (plannedCounts.get(key) || 0) + item.count);
    });

    const groups = new Map();
    collectionTests.forEach(test => {
      const conversion = wholeBloodConversionFactor(test.specimenType);
      if (!conversion) return;

      const source = canonicalCollectionContainer(test);
      if (!source.label || !source.className) return;
      // Microtainer draw volumes are test-specific microcollection volumes.
      // Do not apply the standard 2.5x whole-blood conversion to them.
      if (/^tube-microtainer\b/.test(source.className)) return;
      const key = `${source.className}|${normalizeSearch(source.label)}`;
      if (!groups.has(key)) {
        groups.set(key, {
          key,
          label: source.label,
          className: source.className,
          preferredMl: 0,
          minimumMl: 0,
          preferredVerify: 0,
          minimumVerify: 0,
          preferredFullTubes: 0,
          minimumFullTubes: 0,
          dedicatedTubes: 0,
          hasProcessedSpecimen: false,
          hasRbcEstimate: false,
          hasFillRule: false,
          tests: []
        });
      }

      const group = groups.get(key);
      const count = Math.max(recommendedCollectionTubesForTest(test), 1);
      const dedicated = requiresDedicatedCollectionTube(test);
      const fillRule = hasCollectionFillRule(test);
      const isCitrate = source.className === 'tube-blue';

      if (dedicated) group.dedicatedTubes += count;
      if (fillRule) group.hasFillRule = true;
      if (conversion.type === 'serum-plasma') group.hasProcessedSpecimen = true;
      if (conversion.type === 'rbc') group.hasRbcEstimate = true;

      // Citrate tubes must preserve the blood:additive ratio. When the source says
      // fill to line/full tube, the actual whole-blood draw is governed by the tube's
      // calibrated fill line rather than a serum/plasma conversion estimate.
      if (isCitrate && fillRule) {
        group.tests.push(test);
        return;
      }

      for (const level of ['preferred', 'minimum']) {
        const fullUnknown = levelRequiresUnknownFullTube(test, level);
        if (fullUnknown) {
          group[`${level}FullTubes`] += count;
          continue;
        }
        const ml = volumeForRequirement(test, level, conversion);
        if (ml === null) group[`${level}Verify`] += 1;
        else group[`${level}Ml`] += ml;
      }
      group.tests.push(test);
    });

    return Array.from(groups.values()).map(group => ({
      ...group,
      count: plannedCounts.get(group.key) || 0,
      tests: group.tests
    }));
  }

  function bloodVolumeGroupForCollectionItem(item, groups) {
    const key = `${item.className || ''}|${normalizeSearch(item.label)}`;
    const exact = groups.find(group => group.key === key);
    if (exact) return exact;
    const sameClass = groups.filter(group => group.className === item.className);
    return sameClass.length === 1 ? sameClass[0] : null;
  }

  function wholeBloodRequirementText(group, level) {
    if (group.className === 'tube-blue' && group.hasFillRule && group.count) {
      return `${group.count} ${group.count === 1 ? 'tube' : 'tubes'} to fill line`;
    }

    const ml = group[`${level}Ml`];
    const fullTubes = group[`${level}FullTubes`];
    const verify = group[`${level}Verify`];
    const parts = [];
    if (ml > 0) parts.push(formatCalculatedMl(ml));
    if (fullTubes > 0) parts.push(`${fullTubes} full ${fullTubes === 1 ? 'tube' : 'tubes'}`);
    if (verify > 0) parts.push(`verify ${verify} ${verify === 1 ? 'test' : 'tests'}`);
    return parts.length ? parts.join(' + ') : 'Verify';
  }

  function printCollectionWholeBloodDetail(item, wholeBloodGroups) {
    // Labcorp NMR volume is the required serum yield, not a calculated draw volume.
    if (item.className === 'tube-nmr-lipotube') {
      const test = uniqueTests(item.tests || [])[0];
      return `<span class="print-collection-volume-wrap"><span class="print-collection-blood-volume">
        <span class="print-collection-blood-label">Serum Required / Tube</span>
        <span class="print-collection-blood-metric"><b>Preferred</b><strong>${escapeHtml(test?.preferredVolume || 'Verify')}</strong></span>
        <span class="print-collection-blood-metric"><b>Minimum</b><strong>${escapeHtml(test?.minimumVolume || 'Verify')}</strong></span>
      </span></span>`;
    }
    const group = bloodVolumeGroupForCollectionItem(item, wholeBloodGroups);
    if (!group) return '';
    const notes = [];
    if (group.dedicatedTubes > 0) notes.push(`${group.dedicatedTubes} dedicated ${group.dedicatedTubes === 1 ? 'tube' : 'tubes'} included`);
    const note = notes.length ? `<small class="print-collection-dedicated-note">${escapeHtml(notes.join(' · '))}</small>` : '';
    return `<span class="print-collection-volume-wrap">
      <span class="print-collection-blood-volume">
        <span class="print-collection-blood-label">Draw Volume</span>
        <span class="print-collection-blood-metric"><b>Preferred</b><strong>${escapeHtml(wholeBloodRequirementText(group, 'preferred'))}</strong></span>
        <span class="print-collection-blood-metric"><b>Minimum</b><strong>${escapeHtml(wholeBloodRequirementText(group, 'minimum'))}</strong></span>
      </span>${note}
    </span>`;
  }

  // Print-only display alias. Keep the original catalog wording for processing,
  // aliquot planning, specialty-container requirements and preservation checks.
  // This applies to standard serum/plasma transfer tubes, never stool/urine,
  // microbiology kits, dedicated purple frozen tubes or trace-metal containers.
  function printTransportTubeLabel(label, specimens = []) {
    const raw = String(label || '').trim();
    if (!raw) return raw;
    const types = (Array.isArray(specimens) ? specimens : [specimens])
      .filter(Boolean).map(test => normalizeSpecimenType(test.specimenType || '').toLowerCase());
    if (types.some(type => !/^(?:serum|plasma|serum or plasma|platelet-poor plasma|platelet poor plasma)$/.test(type)))
      return raw;
    const standard = /^(?:transport tube|serum transport tube(?:\s*\/\s*vial)?|plasma transport tube(?:\s*\/\s*vial)?|plastic (?:serum|plasma) transport tube|plastic screw[- ]?cap serum transport vial|chilled (?:plastic )?screw[- ]?cap transport vial|chilled plastic screw[- ]?cap vial|clean screw[- ]?capp?ed? (?:plastic )?vial \(no preservative\)|clean screw[- ]?cap vial \(no preservative\))$/i;
    const routes = (Array.isArray(specimens) ? specimens : [specimens]).filter(Boolean);
    return standard.test(raw) || (routes.length > 0 && routes.every(test => isGenericSerumPlasmaTransport(test, raw))) ? 'Transport Tube' : raw;
  }
  function printTransportTubeQualifier(label, specimens = []) {
    if (printTransportTubeLabel(label, specimens) !== 'Transport Tube') return '';
    const tests = Array.isArray(specimens) ? specimens : [specimens];
    const containers = [label, ...tests.map(test => test?.transportContainer)];
    return containers.some(container => /\bno preservative\b/i.test(String(container || '')))
      ? 'No preservative' : '';
  }

  function printContainerBadges(test) {
    const value = String(test.transportContainer || '').trim();
    const lower = value.toLowerCase();
    const sourceBadge = printTransferSourceBadge(test);
    if ((/red\s*\/\s*yellow|red-yellow|swirl/.test(lower)) && /gray|grey|urisponge/.test(lower) && /urine|culture/.test(lower)) {
      const cultureBadge = /urisponge/.test(lower)
        ? '<span class="print-tube-badge tube tube-urisponge">UriSponge Culture</span>'
        : '<span class="print-tube-badge tube tube-urine-culture">Gray-Top Urine Culture Tube</span>';
      return `<span class="print-tube-badge tube tube-ua-swirl">Red/Yellow Swirl UA Tube</span><br>${cultureBadge}${sourceBadge ? `<div class="print-transport-source">${sourceBadge}</div>` : ''}`;
    }

    const sourceSpecimen = specificSpecimenSource(test);
    let sourceText = /transport tube|aliquot|cryovial|screw[- ]?cap|pour[- ]?off/i.test(value)
      ? specimenSourceDetail(test)
      : sourceSpecimen;

    const explicitOriginalOption = /^no transfer\s*\/\s*submit in original tube$/i.test(value);
    const displayedTube = explicitOriginalOption ? String(test.drawContainer || '').trim() : value;
    const transportClass = explicitOriginalOption ? tubeClass(displayedTube) : transportTubeClass(test, value);
    const isSstTransport = transportClass === 'tube-sst';
    const displayClass = isSstTransport ? selectedSstVisualClass() : transportClass;
    let displayValue = explicitOriginalOption ? `${displayedTube} (original tube)` : printTransportTubeLabel(value || 'Verify', test);

    if (isSstTransport) {
      const keepSpun = /\bspun\b/i.test(value) || isSpunSstSubmission(test) || isOriginalContainerSubmission(test);
      displayValue = `${selectedSstTransportLabel()}${keepSpun ? ' (spun)' : ''}`;
    }

    // In the print table's Transport Tube column only, keep the Tiger label compact.
    // The Draw Container column and collection plan still show the 7.5 mL capacity.
    if (selectedSstIsTiger() && isSstDraw(test) && sourceText) {
      sourceText = sourceText.replace(/Tiger SST\s*·\s*7\.5\s*mL/gi, 'Tiger SST');
    }

    return `<span class="print-tube-badge tube ${displayClass}">${escapeHtml(displayValue)}</span>${printTransportTubeQualifier(value, test) ? '<div class="print-transport-source">No preservative</div>' : ''}${sourceText ? `<div class="print-transport-source">${escapeHtml(sourceText)}${sourceBadge}</div>` : ''}`;
  }

  function printNotesFooter() {
    return `
      <div class="print-shipping-notes">
        <div class="print-bag-note-title">Specimen precautions</div>
        <div class="print-bag-note">
          <div><strong>STAT specimens</strong>Confirm STAT acceptance with the receiving lab. Schedule a separate STAT pickup, use the correct STAT requisition, and never mix STAT and routine specimens in the same shipment.</div>
          <div><strong>Collection &amp; transport</strong>Follow each test’s processing time, temperature, container, and special-handling instructions. Keep room-temperature, refrigerated, and frozen specimens in separate bags.</div>
          <div><strong>Urine collections</strong>Confirm whether the order requires random, first-morning, timed, or 24-hour urine. Never combine different collection periods. For timed/24-hour urine, follow the required start/end times, total-volume, preservative, and storage instructions.</div>
          <div><strong>Volume disclaimer</strong>Tube counts and draw volumes are estimates, not guaranteed specimen yields. Actual serum/plasma recovery varies. Check the lab’s required volume and any full, dedicated, or separate-tube instructions before sending.</div>
        </div>
      </div>
      <div class="print-prebag-footer">
      <div class="print-footer">
        <div class="print-missing-test"><strong>Missing a test?</strong> <b>Contact Sam</b> to have it added.</div>
      </div>
      <div class="print-ownership"><span><strong>Copyright and ownership:</strong> Copyright © 2026 Sam Hay. All rights reserved. Independently developed and maintained by Sam Hay as a personal software project and hosted through a personally controlled account. No license or ownership interest is granted except through Sam Hay’s express written authorization. Use by any organization does not, by itself, transfer ownership of the software or source code. Access to this hosted version is provided by permission and may be modified, suspended, or withdrawn by Sam Hay at any time and for any reason.</span></div>
      </div>
    `;
  }

  // Compact print-only summary. Alert text and severity come from collectAlerts;
  // generic restriction notices remain visible without repeating yellow banners.
  function printCompactAlertSummary(tests, alerts) {
    if (!alerts.length) return '';
    const grouped = new Map();
    const restrictions = new Map();
    for (const alert of alerts) {
      const match = tests.find(test =>
        alert.text.startsWith(displayCode(test) + ' ' + test.testName + ': ') ||
        alert.text.startsWith(test.testName + ': ')
      );
      const prefix = match ? (alert.text.startsWith(displayCode(match) + ' ' + match.testName + ': ')
        ? displayCode(match) + ' ' + match.testName + ': '
        : match.testName + ': ') : '';
      const detail = prefix ? alert.text.slice(prefix.length) : alert.text;
      const label = match ? displayCode(match) + ' · ' + match.testName : 'General';
      if (detail === 'collection or rejection restriction noted.') {
        restrictions.set(label, label);
        continue;
      }
      const id = match ? match.id : label;
      if (!grouped.has(id)) grouped.set(id, { label, danger: false, messages: [] });
      const group = grouped.get(id);
      group.danger = group.danger || alert.type === 'danger';
      if (!group.messages.includes(detail)) group.messages.push(detail);
    }
    const rows = [...grouped.values()].map(group =>
      '<div class="print-alert-item' + (group.danger ? ' is-urgent' : '') + '">' +
      '<strong>' + escapeHtml(group.label) + '</strong>' +
      '<span>' + group.messages.map(escapeHtml).join(' · ') + '</span></div>'
    ).join('');
    const review = restrictions.size
      ? '<div class="print-alert-review"><strong>Review collection / rejection restrictions:</strong> ' +
        escapeHtml([...restrictions.values()].join('; ')) +
        '. See each test’s Notes column below.</div>'
      : '';
    return '<section class="print-alerts print-compact-alerts">' +
      '<div class="print-alerts-title"><strong>Collection alerts</strong><span>' +
      alerts.length + (alerts.length === 1 ? ' notice' : ' notices') + '</span></div>' +
      '<div class="print-alerts-grid">' + rows + '</div>' + review + '</section>';
  }

  // Print-only visual grouping. Physical transport allocations, source tube
  // counts, and labeling remain separate within each displayed subgroup.
  function isPrintableStandardSstSerumAliquot(item) {
  if (!item || item.originalTube || item.count < 1 || item.className !== 'tube-transport tube-transport-green-top'
      || !String(item.key || '').includes('|standard-serum-transport|')) return false;
  const tests = uniqueTests(item.tests || []);
  return tests.length > 0 && tests.every(test => isSstDraw(test)
    && normalizeSpecimenType(test.specimenType).toLowerCase() === 'serum'
    && !isOriginalContainerSubmission(test)
    && splitSubmissionContainers(test).some(container => container.key === item.key));
}

  function printSstSerumTransportGroupContents(contents) {
    const compatible = contents.filter(isPrintableStandardSstSerumAliquot);
    if (compatible.length < 2) return contents;
    const groups = new Map();
    compatible.forEach(item => {
      const process = (String(item.key).match(/\|spin-([^|]+)/) || [, 'verify'])[1];
      // This function is called per bag. Keep timed samples out of routine
      // visual grouping; dedicated aliquots may share a card but not a vial.
      if (item.tests.some(test => timedSpecimenLabel(test))) return;
      if (!groups.has(process)) groups.set(process, []);
      groups.get(process).push(item);
    });
    const replacements = new Map();
    groups.forEach(parts => {
      if (parts.length < 2) return;
      const first = parts[0], overrides = new Map();
      parts.forEach(part => {
        if (!(part.sourceCountOverrides instanceof Map)) return;
        part.sourceCountOverrides.forEach((count, key) =>
          overrides.set(key, (overrides.get(key) || 0) + count));
      });
      const allocations = new Map();
      const ordinary = [];
      parts.forEach(part => {
        const separate = part.tests.some(test => requiresDistinctDrawTransport(test) || requiresSeparateTransportAliquot(test));
        const codes = uniqueTests(part.tests).map(displayCode).join(', ');
        if (separate) allocations.set(codes, (allocations.get(codes) || 0) + part.count);
        else ordinary.push(part.count + ' for ' + codes);
      });
      const notes = [...allocations].map(([codes, count]) => count + ' for ' + codes);
      const summary = [
        notes.length ? 'Keep separate: ' + notes.join(' · ') : '',
        ordinary.length ? 'Other transport allocations: ' + ordinary.join(' · ') : ''
      ].filter(Boolean).join(' · ');
      replacements.set(first, {
        ...first,
        label: 'Transport Tube',
        className: 'tube-transport tube-transport-green-top',
        count: parts.reduce((sum, part) => sum + part.count, 0),
        tests: uniqueTests(parts.flatMap(part => part.tests || [])),
        sourceCountOverrides: overrides.size ? overrides : first.sourceCountOverrides,
        printVisualGroupParts: parts,
        printAllocationNote: summary
      });
      parts.slice(1).forEach(part => replacements.set(part, null));
    });
    return contents.flatMap(item => replacements.has(item)
      ? (replacements.get(item) ? [replacements.get(item)] : []) : [item]);
  }



  // Print-only grouping. A shared card is NOT permission to pool specimens.
  // Keep each required tube, code, label, and source allocation intact.
  // Display-only grouping for independently collected timed aliquots.
  // Never modify physical vial counts or allow different timepoints to pool.
  function printTimedSpecimenGroupInfo(item) {
    if (!item || item.pooledSerumPlasmaTransport ||
        item.printAllocationNote || !Array.isArray(item.tests) || item.tests.length !== 1 ||
        !item.label || !item.className) return null;
    const test = item.tests[0];
    const timepoint = timedSpecimenLabel(test);
    if (!timepoint) return null;
    const sourceId = String(test.sourceTestId || test.id || '').trim();
    if (!sourceId || !String(test.testCode || '').trim()) return null;
    const source = canonicalCollectionContainer(test);
    if (!source || !source.key) return null;
    return {
      timepoint,
      sourceId,
      code: displayCode(test),
      key: ['timed-separate-aliquots',
        !item.originalTube && /^Timed specimen \d+\s+-/i.test(test.specialLabeling || '')
          ? printLabelingNotes(item) : sourceId,
        item.originalTube ? 'original' : 'transfer',
        normalizeSearch(String(item.label)), String(item.className),
        normalizeSearch(source.key), normalizeSearch(normalizeSpecimenType(test.specimenType)),
        normalizeSearch(String(test.transportContainer || '')),
        normalizeSearch(String(test.transportTemperature || '')),
        normalizeSearch(String(test.spin || ''))].join('||')
    };
  }

  function printContainerPresentationKey(item) {
    if (!item || !(item.count > 0) || !item.className || !item.label
      || item.printAllocationNote || item.pooledSerumPlasmaTransport
      || !Array.isArray(item.tests) || !item.tests.length) return '';
    const timed = printTimedSpecimenGroupInfo(item);
    if (timed) return timed.key;
    // Untimed Salivettes may carry different site- or order-specific instructions.
    if (/\bsalivette\b/i.test(item.label)) return '';
    if (item.originalTube && item.tests.every(test =>
      /\bswabs?\b/i.test(test.specimenType || '') && !requiresDistinctDrawTransport(test))) {
      return ['original-swab', item.className, normalizeSearch(item.label)].join('||');
    }
    const id = String(item.key || '');
    // Existing SST pooling and deliberately dedicated specimens are kept apart.
    if (/^(?:sst-spun|pooled-original\|frozen-transport\||vitamin-profile-|081162-|007010-|labcorp-op-)/.test(id)
      || /\|dedicated-|\|separate\|/.test(id)) return '';
    const cls = String(item.className);
    const label = normalizeSearch(item.label);
    if (!label || /verify|unknown|unspecified/.test(label)) return '';
    const materials = new Set(uniqueTests(item.tests).map(test => [
      collectionSpecimenGroupForTest(test),
      normalizeSearch(normalizeSpecimenType(test.specimenType)),
      isUrineTest(test) ? urineCollectionType(test).key : '',
      normalizeSearch(specificSpecimenSource(test)),
      /^yes$/i.test(String(test.spin || '')) ? 'spun' : 'unspun'
    ].join('|')));
    if (materials.size !== 1) return '';
    const source = Array.from(submissionSourceGroupsForItem(item).keys()).sort().join(',');
    // These are vetted aliases for identical urine preservative devices.
    // A gray fluoride/oxalate blood tube will never match the urine culture type.
    const container = cls === 'tube-ua-swirl' && /red\s*\/\s*yellow|red[- ]yellow|swirl/.test(label)
      ? 'red-yellow-ua-preservative'
      : cls === 'tube-urine-culture' && /gray[- ]?top.*(?:urine|culture)/.test(label)
        ? 'gray-top-urine-culture'
        : label;
    const detail = normalizeSearch(item.detail || '');
    const handling = container === 'red-yellow-ua-preservative' && /^(?:urine|urine in preservative tube)$/.test(detail)
      ? 'urine-ua-preserved'
      : container === 'gray-top-urine-culture' && /^(?:urine|urine in culture preservative tube)$/.test(detail)
        ? 'urine-culture-preserved'
        : detail;
    return [cls, container, item.originalTube ? 'original' : 'transfer',
      materials.values().next().value, source, handling].join('||');
  }

  // Summarize matching per-order allocations without changing tube counts.
  function compactPrintAllocationNote(parts) {
    // A physical allocation can cover multiple orders. In that case preserve
    // the original per-allocation wording rather than imply one tube per code.
    if (parts.some(part => uniqueTests(part.tests || []).length !== 1)) {
      return 'Separate containers: ' + parts.map(part =>
        part.count + ' for ' + uniqueTests(part.tests || []).map(displayCode).join(', ')
      ).join(' · ');
    }
    const groups = new Map();
    parts.forEach(part => {
      const count = Number(part.count);
      if (!groups.has(count)) groups.set(count, []);
      // Do not deduplicate across parts: each part is a physical allocation.
      groups.get(count).push(...uniqueTests(part.tests || []).map(displayCode));
    });
    const frozen = parts.every(part => part.className === 'tube-frozen-purple');
    return (frozen ? 'Separate frozen aliquots: ' : 'Separate containers: ')
      + [...groups.entries()].sort((a, b) => a[0] - b[0]).map(([count, codes]) =>
        count + ' each for ' + codes.join(', ')
      ).join(' · ');
  }

  function groupSubmissionContainersForPrint(contents) {
    const groups = new Map();
    contents.forEach(item => {
      const key = printContainerPresentationKey(item);
      if (!key) return;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(item);
    });
    const replacement = new Map();
    groups.forEach(parts => {
      if (parts.length < 2) return;
      const first = parts[0];
      const sourceOverrides = new Map();
      parts.forEach(part => {
        if (!(part.sourceCountOverrides instanceof Map)) return;
        part.sourceCountOverrides.forEach((count, key) => {
          sourceOverrides.set(key, (sourceOverrides.get(key) || 0) + count);
        });
      });
      // Reconcile the grouped source pill with the same bag-level source pool.
      // Summing already rounded individual source counts would reintroduce the
      // overcount, even though physical frozen transport quantities are unchanged.
      const groupTests = parts.flatMap(part => part.tests || []);
      const sharedFrozenSource = parts.every(part => part.className === 'tube-frozen-purple') &&
        groupTests.filter(test => reviewedFrozenSstSourceMl(test) !== null).length > 1;
      if (sharedFrozenSource) {
        submissionSourceGroupsForItem({ ...first, tests: groupTests }).forEach(group => {
          if (group.source.className !== 'tube-sst') return;
          sourceOverrides.set(group.key, transferSourceTubeCountForItemTests(group.tests, group.source));
        });
      }
      const timedInfo = parts.map(printTimedSpecimenGroupInfo);
      const timedOrders = new Map();
      if (timedInfo.every(Boolean)) {
        timedInfo.forEach((info, index) => {
          if (!timedOrders.has(info.sourceId)) timedOrders.set(info.sourceId, { code: info.code, count: 0, parts: [] });
          const order = timedOrders.get(info.sourceId);
          order.count += parts[index].count;
          order.parts.push(info.timepoint + ' × ' + parts[index].count);
        });
      }
      const timedAllocation = [...timedOrders.values()].map(order => timedOrders.size > 1
        ? order.code + ' × ' + order.count
        : order.parts.join(' · ')).join(' · ');
      replacement.set(first, {
        ...first,
        count: parts.reduce((total, part) => total + part.count, 0),
        tests: uniqueTests(parts.flatMap(part => part.tests || [])),
        sourceCountOverrides: sourceOverrides.size ? sourceOverrides : first.sourceCountOverrides,
        printVisualGroupParts: parts,
        printAllocationNote: timedAllocation
          ? 'Keep separate, do not pool: ' + timedAllocation + ' · Label each container with its collection time'
          : compactPrintAllocationNote(parts) + (sharedFrozenSource
              ? ' · Shared source allocation using pool-size volume targets: same collection only; verify serum yield, follow the shortest processing deadline and keep submitted aliquots separate.'
              : '')
      });
      parts.slice(1).forEach(part => replacement.set(part, null));
    });
    return contents.flatMap(item => replacement.has(item)
      ? (replacement.get(item) ? [replacement.get(item)] : []) : [item]);
  }

  function printBagItemProgress(item, itemIndex, contents) {
  const manual = uniqueTests(item.tests || []).some(isManuallyAddedTest);
  if (!manual && contents.length < 2) return '';
  const next = itemIndex + 1 < contents.length ? 'MORE IN THIS BAG ↓' : 'LAST GROUP · CHECK END OF BAG';
  return '<div class="print-bag-item-progress' + (manual ? ' has-manual-entry' : '') + '">'
    + (manual ? '<span class="print-bag-manual-flag">MANUAL ENTRY · Verify in lab directory</span>' : '')
    + (contents.length > 1 ? '<strong>' + next + '</strong>' : '') + '</div>';
}

  function printCollectionSubmissionPlan(tests) {
    const collectionTests = expandedCollectionTests(tests);
    const bags = buildTransportBagPlan(collectionTests);
    const collectionItems = buildCollectionPlan(collectionTests, bags);
    const wholeBloodGroups = buildWholeBloodVolumePlan(collectionTests, collectionItems);
    const totalCollect = collectionItems.reduce((sum, item) => sum + item.count, 0);
    const bagLabels = [...bags].sort((a, b) =>
      Number(a.isStat) - Number(b.isStat) ||
      transportBagInfo(a.tests[0]).order - transportBagInfo(b.tests[0]).order
    ).map(bag => `<span class="print-bag-pill ${bag.className}">${bag.isStat ? 'STAT · ' : ''}${escapeHtml(printBagTemperatureLabel(bag, true))}${printBagTemperatureBadge(bag)}</span>`).join('');
    // Render shipping bags in paired rows. Each pair has matching heights,
    // which keeps the next bag row together during printed page breaks instead
    // of leaving a short isolated bag and a large area of empty purple space.
    const bagRenderData = bags.map(bag => {
      const contents = buildSubmissionContents(bag);
      applyBloodSourceCountAllocations(contents);
      const totalContainers = contents.reduce((sum, item) => sum + item.count, 0);
      // Combine compatible SST-derived serum transport items for the printout
      // without merging their real tube allocations or labels.
      return { bag, contents: groupSubmissionContainersForPrint(printSstSerumTransportGroupContents(contents)), totalContainers };
    });
    // v11.25: Print in a predictable left-to-right, then top-to-bottom order:
    // all routine bags first, then STAT bags. Within each priority group the
    // sequence is room-temperature, refrigerated, frozen, mixed, verify.
    // The ordering changes presentation only; it does not alter the bag
    // membership, container totals, or STAT collection/pooling calculations.
    const bagDisplayOrder = [...bagRenderData].sort((left, right) =>
      Number(left.bag.isStat) - Number(right.bag.isStat) ||
      (transportBagInfo(left.bag.tests[0]).order - transportBagInfo(right.bag.tests[0]).order)
    );
    const bagRows = [];
    for (let i = 0; i < bagDisplayOrder.length; i += 2) {
      bagRows.push(bagDisplayOrder.slice(i, i + 2));
    }
    // No forced break on the framed submission section: it can otherwise
    // paint an empty bordered sheet before the first atomic two-bag row.
    // The heading is already attached to that first paired row in printSummary().
    const fastingItems = fastingRequirementsForTests(tests).map(({ test, requirement }) => ({ test, requirement: printFastingRequirement(test, requirement) }));
    const preparationItems = preCollectionPrecautionsForTests(tests);
    const preparationPanel = preparationItems.length ? `<div class="print-fasting-panel print-prep-panel">
      <div class="print-fasting-panel-title"><strong>Collection precautions</strong><span>Check before the draw</span></div>
      <div class="print-fasting-list">${preparationItems.map(({ test, requirement }) => `<div class="print-fasting-item print-prep-item"><span class="print-fasting-status print-prep-status">${escapeHtml(requirement.label)}</span><div><strong>${escapeHtml(displayCode(test))} · ${escapeHtml(test.testName)}</strong><small>${escapeHtml(requirement.note)}</small></div></div>`).join('')}</div>
    </div>` : '';
    const fastingPanel = fastingItems.length ? `<div class="print-fasting-panel">
      <div class="print-fasting-panel-title"><strong>Fasting instructions</strong><span>Confirm before collection</span></div>
      <div class="print-fasting-list">${fastingItems.map(({ test, requirement }) => `<div class="print-fasting-item fasting-${requirement.level}"><span class="print-fasting-status">${escapeHtml(requirement.label)}</span><div><strong>${escapeHtml(displayCode(test))} · ${escapeHtml(test.testName)}</strong><small>${escapeHtml(requirement.note)}</small></div></div>`).join('')}</div>
    </div>` : '';

    return `<section class="print-logistics-plan">
      <div class="print-logistics-heading"><strong>Collection and submission plan</strong><span>STAT area: ${escapeHtml(STAT_AREAS[statArea].label)}.</span></div>
      <div class="print-logistics-totals">
        <div class="print-total-box collect-total"><span>TOTAL TO COLLECT</span><strong>${totalCollect}</strong><small>tubes / collection containers</small></div>
        <div class="print-collect-chips">${collectionItems.map(item => {
          const specimenTag = collectionSpecimenBadgesForItem(item).map(({ label, kind }) =>
            `<span class="print-collect-chip-specimen specimen-${kind}">${escapeHtml(label)}</span>`).join('');
          return `<span class="print-collect-chip tube ${item.displayClassName || item.className}"><b>${item.count}</b> ${escapeHtml(item.label)}${specimenTag}</span>`;
        }).join('')}</div>
        <div class="print-total-box submit-total"><span>TOTAL TO SUBMIT</span><strong>${bags.length}</strong><small>${bags.length === 1 ? 'transport bag' : 'transport bags'}</small></div>
        <div class="print-submit-bags">${bagLabels}</div>
      </div>
      ${fastingPanel}
      ${preparationPanel}

      ${selectedTests().some(isCultureTransportEligible) ? `<div class="print-urine-culture-choice"><strong>Urine culture transport:</strong> ${selectedUrineCultureIsSponge() ? 'UriSponge' : 'Gray-top urine culture tube'}</div>` : ''}
      ${printOrderOfDraw(collectionTests)}

      <div class="print-logistics-subheading print-section-banner"><strong>What to collect</strong><span class="print-heading-count">${collectionItems.length} collection ${collectionItems.length === 1 ? 'type' : 'types'}</span></div>
      ${printCollectionGroups(collectionItems, wholeBloodGroups)}

      <section class="print-submit-section">
        <div class="print-submit-heading">
          <strong>What to submit after processing</strong>
          <div class="print-submit-heading-summary">
            <span class="print-submit-bag-types">${bagDisplayOrder.map(({ bag }) => {
              return `<span class="print-bag-short-label">${escapeHtml(printBagTemperatureLabel(bag, true))}${printBagTemperatureBadge(bag)}</span>`;
            }).join('')}</span>
            <span class="print-submit-bag-count"><b>${bags.length}</b> ${bags.length === 1 ? 'bag' : 'bags'}</span>
          </div>
        </div>
        <div class="print-bag-grid${bags.length === 1 ? ' single-bag' : ''}">${bagRows.map((row, rowIndex) => `<div class="print-bag-row${row.length === 1 ? ' single-row' : ''}">${row.map(({ bag, contents, totalContainers }, columnIndex) => {
          const bagName = printBagTemperatureLabel(bag);
          const bagNumber = rowIndex * 2 + columnIndex + 1;
          return `<article class="print-bag-card ${bag.className} ${bag.isStat ? 'bag-stat' : 'bag-routine'}${contents.length > 11 ? ' bag-long' : ''}">
            <div class="print-bag-topbar"><span class="print-bag-topbar-label">LABCORP · Bag</span><span class="print-bag-priority ${bag.isStat ? 'priority-stat' : 'priority-routine'}">${bag.isStat ? 'STAT' : 'Routine'}</span><span class="print-bag-topbar-index" aria-label="Bag ${bagNumber} of ${bags.length}">${bagNumber}/${bags.length}</span></div>
            <div class="print-bag-card-header"><div><div class="print-bag-title">${printBagTemperatureBadge(bag)}<strong>${escapeHtml(bagName)}</strong></div><span>${bag.isStat ? 'STAT specimens only · keep separate from routine and other temperatures' : 'Routine only · keep separate from STAT and other temperatures'}</span></div><div class="print-bag-header-right"><div class="print-bag-container-total"><strong>${totalContainers}</strong><span>containers</span></div></div></div>
            <div class="print-submit-content">${contents.map((item, itemIndex) => `<div class="print-submit-item${item.originalTube ? ' original-tube-submit' : ''}">
              <div class="print-submit-item-title"><strong>${item.count}</strong><span class="tube ${item.displayClassName || item.className}"><span class="print-submit-container-name">${escapeHtml(item.originalTube && item.key === 'sst-spun' ? (selectedSstIsTiger() ? 'Tiger SST (Spun)' : 'Gold SST (Spun)') : printTransportTubeLabel(item.label, item.tests))}</span></span>${printSstTigerBadge(item)}${printBagSpecimenBadge(item)}</div>
              ${printSubmissionItemDetail(item)}
              ${printTransportTubeQualifier(item.label, item.tests) ? '<div class="print-submit-item-detail">No preservative · Use an additive-free transport tube</div>' : ''}
              ${printLabelingNotes(item)}
              ${item.tests.length > 1 && item.tests.every(test => specificSpecimenSource(test) === 'Meconium') ? '<div class="print-serum-allocation-note">Confirm specimen quantity and whether Labcorp can share one meconium cup across these orders before collecting separate cups.</div>' : ''}
              ${item.printAllocationNote ? `<div class="print-serum-allocation-note">${escapeHtml(item.printAllocationNote)}</div>` : ''}
              <div class="print-for-tests${uniqueTests(item.tests).length > 8 ? ' is-bag-dense' : ''}"><b>For ${item.tests.length} ${item.tests.length === 1 ? 'test' : 'tests'}:</b><ul${uniqueTests(item.tests).length > 8 ? ` style="--bag-test-rows:${Math.ceil(uniqueTests(item.tests).length / 2)}"` : ''}>${testReferences(item.tests, bag.isStat)}</ul></div>
              ${printBagItemProgress(item, itemIndex, contents)}
            </div>`).join('')}</div>
             <div class="print-bag-end" aria-label="End of LABCORP bag ${bagNumber} of ${bags.length}">
              <div class="print-bag-end-top"><span class="print-bag-end-lab">LABCORP</span><strong>END OF BAG</strong><span class="print-bag-end-temp">${escapeHtml(printBagTemperatureLabel(bag, true))} · ${bag.isStat ? 'STAT' : 'ROUTINE'}</span></div>
              <div class="print-bag-end-bottom"><strong>BAG ${bagNumber} OF ${bags.length}</strong><span>${totalContainers} ${totalContainers === 1 ? 'CONTAINER' : 'CONTAINERS'}</span></div>
              ${bagNumber < bags.length ? `<div class="print-bag-next"><span aria-hidden="true">›</span> MORE BAGS FOLLOW · CONTINUE TO BAG ${bagNumber + 1} OF ${bags.length}</div>` : ''}
            </div>
          </article>`;
        }).join('')}</div>`).join('')}</div>
        <div class="print-submit-footer"><span class="print-submit-footer-label">Confirm number of bags before sealing and sending</span><span class="print-submit-footer-badge"><strong>${bags.length}</strong> <span>${bags.length === 1 ? 'bag' : 'bags'}</span></span></div>
      </section>
    </section>`;
  }


  function printDetailContainerPath(test) {
    let path = menuSingleContainerPath(test)
      .replaceAll('class="badge tube ', 'class="print-tube-badge tube ')
      .replace(/(<span class="container-path-arrow"[^>]*>)→(<\/span>)/g, '$1↓$2');
    const labels = [normalizeSpecimenType(test.specimenType)].filter(Boolean);
    const badges = Array.from(new Set(labels)).map(label => {
      const group = /\burine\b/i.test(label) ? 'specimen-urine'
        : /\bstool\b/i.test(label) ? 'specimen-stool'
        : /\bswab\b/i.test(label) ? 'specimen-swab' : '';
      return specimenBadge(label, `${group} print-specimen-badge`.trim());
    }).join(' ');
    // Transferring intact whole blood does not require centrifugation.
    // Keep the spin cue for serum, plasma and RBC preparations.
    const spinValue = normalizeSpecimenType(test.specimenType) === 'Whole Blood'
      ? 'No' : String(test.spin || '').trim();
    const spinDisplay = /^(?:yes|true|spin|centrifuge)$/i.test(spinValue)
      ? 'Spin ✓'
      : /^(?:no|false|do not spin)$/i.test(spinValue) ? ''
      : /^(?:n\/?a|not applicable)$/i.test(spinValue) ? ''
      : spinValue ? `Spin: ${escapeHtml(spinValue)}` : '';
    // For transfers, show a compact "↓ spin" instruction between source and submission.
    // Direct original-tube submissions retain their existing spin reminder below.
    const transferSpin = spinDisplay === 'Spin ✓' && path.includes('container-path is-transfer');
    if (transferSpin) {
      path = path
        .replace('aria-label="Then transfer to"', 'aria-label="Spin, then transfer to"')
        .replace(/(<span class="container-path-arrow"[^>]*>)↓(<\/span>)/, '$1↓ <span class="print-transfer-spin" aria-hidden="true">spin</span>$2');
    }
    const spinBadge = spinDisplay && !transferSpin ? `<span class="print-detail-spin" aria-label="Spin instruction">· ${spinDisplay}</span>` : '';
    return `<div class="print-detail-container">${path}<div class="print-detail-specimens">${badges}${spinBadge}</div></div>`;
  }

    function printStabilityForTemperature(test) {
    const raw = String(test.stability || '').replace(/\s+/g, ' ').trim();
    const t = String(test.transportTemperature || '').toLowerCase();
    const opts = [/(?:room|ambient)/.test(t) && 'room',/(?:refriger|cold|chill)/.test(t) && 'refrigerated',/(?:froz|freez)/.test(t) && 'frozen'].filter(Boolean);
    if (!raw || opts.length !== 1) return 'Verify';
    const name = /(room\s*(?:temp(?:erature)?)?|ambient|rt\b|refrigerat(?:ed|ion)\b|refrig\b|froz(?:en)?\b|freez(?:er|ing)\b)/i;
    const period = /(\d+(?:\.\d+)?(?:\s*[-–]\s*\d+(?:\.\d+)?)?\s*(?:minutes?|mins?|hours?|hrs?|days?|weeks?|months?|years?|h\b|d\b)|unstable|indefinitely)/i;
    const key = value => /froz|freez/i.test(value) ? 'frozen' : /refrig/i.test(value) ? 'refrigerated' : 'room';
    const seen = new Set(), values = [];
    const before = new RegExp(name.source + '\\s*:?\\s*(?:for\\s+|up\\s+to\\s+)?' + period.source,'ig');
    for (const m of raw.matchAll(before)) {
      seen.add(m.index + m[0].lastIndexOf(m[2]));
      values.push([key(m[1]),m[2].toLowerCase()]);
    }
    const after = new RegExp(period.source + '\\s*(?:at\\s+|under\\s+)?' + name.source,'ig');
    for (const m of raw.matchAll(after)) {
      if (!seen.has(m.index)) values.push([key(m[2]),m[1].toLowerCase()]);
    }
    const eligible = [...new Set(values.filter(x=>x[0]===opts[0]).map(x=>x[1]))];
    if (eligible.length===1) return eligible[0].replace(/^\w/,x=>x.toUpperCase());
    if (eligible.length>1 || values.length || name.test(raw)) return 'Verify';
    const generic = raw.match(new RegExp('^\\s*'+period.source+'\\s*[.!]?\\s*$','i'));
    if (generic) return generic[1];
    const periods = [...raw.matchAll(new RegExp(period.source,'ig'))];
    if (periods.length===1 && new RegExp('^'+period.source,'i').test(raw) && /refrigerate|keep cold/i.test(raw)) return periods[0][1];
    return 'Verify';
  }

  function printDetailHandling(test) {
    const notes = String(printSpecialInstructions(test) || '').trim();
    const alt = String(test.alternativeContainer || '').trim();
    const altAlreadyInNotes = alt && notes.toLowerCase().replace(/\s+/g, ' ')
      .includes(alt.toLowerCase().replace(/\s+/g, ' '));
    const altNote = alt && !altAlreadyInNotes
      ? `<div class="print-detail-alt-note"><strong>Alternative:</strong> ${escapeHtml(alt)}</div>` : '';
    const label = conciseSpecimenLabel(test, { originalTube: isOriginalContainerSubmission(test) });
    const labelNote = label.label
      ? `<div class="print-detail-label-note"><strong>Label:</strong> ${escapeHtml(label.label)}</div>` : '';
    const processing = label.processing
      .filter(value => !notes.toLowerCase().includes(value.toLowerCase()))
      .map(value => `<div class="print-detail-label-note"><strong>Processing:</strong> ${escapeHtml(value)}</div>`).join('');
    return `<div class="print-detail-handling-text">${escapeHtml(notes)}</div>${altNote}${labelNote}${processing}`;
  }


  // Print-table display only: specimen type already appears in Container / specimen.
  // Preserve labels when the same test needs multiple distinct specimen types.
  function printDetailVolumeText(test, level) {
    const volume = combinedVolumeText(test, level);
    const types = [test.specimenType, ...additionalDrawRequirements(test).map(req => req.specimenType || test.specimenType)]
      .map(type => normalizeSpecimenType(type).trim().toLowerCase());
    if (!types.length || types.some(type => type !== types[0])) return volume;
    const specimenNames = {
      serum: 'serum',
      plasma: 'plasma',
      'whole blood': 'whole\\s+blood',
      urine: 'urine',
      stool: 'stool',
      rbcs: 'rbcs?',
      saliva: 'saliva',
      csf: 'csf'
    };
    const name = specimenNames[types[0]];
    if (!name) return volume;
    return volume.replace(new RegExp('(\\b\\d+(?:\\.\\d+)?\\s*mL)\\s+' + name + '\\b', 'gi'), '$1');
  }

  // The test-details print table has one row per independently required
  // collection route. Keep each route's collection, transport and lab metadata
  // aligned; never concatenate unrelated specimens into one table cell.
  function printDetailRoutes(test) {
    const extras = additionalDrawRequirements(test);
    return expandedCollectionTests([test]).map((route, index) => {
      const requirement = extras[index - 1];
      if (!requirement) return { ...route, additionalDrawRequirements: [] };
      return {
        ...route,
        additionalDrawRequirements: [],
        // Do not copy the primary container's values into an unspecified
        // secondary route. These are separate specimens and requirements.
        // LabCorp can specify a second transport aliquot from the SAME tube.
        drawContainer: requirement.transportOnly ? test.drawContainer : (requirement.container || 'Verify collection container'),
        transportOnly: Boolean(requirement.transportOnly),
        transportContainer: requirement.transportContainer || (requirement.transportOnly ? test.transportContainer : requirement.container) || '',
        transportTemperature: requirement.transportTemperature || (requirement.transportOnly ? test.transportTemperature : 'Not specified'),
        transportTemperatureRaw: requirement.transportTemperatureRaw || '',
        preferredVolume: requirement.preferredVolume || '',
        minimumVolume: requirement.minimumVolume || '',
        stability: requirement.stability || '',
        spin: requirement.spin || 'Verify',
        specialInstructions: requirement.specialInstructions || '',
        specialLabeling: requirement.specialLabeling || '',
        alternativeContainer: requirement.alternativeContainer || '',
        collectionCount: requirement.transportOnly ? 1 : Math.max(Number(requirement.count) || 1, 1),
        submissionCount: Math.max(Number(requirement.submissionCount) || 1, 1)
      };
    });
  }

  function printDetailHasNotes(route) {
    const notes = String(printSpecialInstructions(route) || '').trim();
    return (notes && notes !== '—') ||
      Boolean(String(route.alternativeContainer || '').trim()) ||
      Boolean(String(route.specialLabeling || '').trim());
  }

  function printDetailRows(test, showNotes = true) {
    const routes = printDetailRoutes(test);
    const multi = routes.length > 1;
    const hasTransportOnlyPath = additionalDrawRequirements(test).some(req => req.transportOnly);
    const noun = hasTransportOnlyPath ? 'collection paths' : 'required specimens';
    const testIdentity = `<td class="print-detail-test-name print-detail-identity" rowspan="${routes.length}"><span class="print-detail-inline-code">${escapeHtml(displayCode(test))}</span><div class="print-test-name-stack${test.testName.length > 48 ? ' print-long-test-name' : ''}"><strong>${escapeHtml(test.testName)}</strong>${test.isStat ? '<span class="print-priority-tag">STAT</span>' : ''}${printFastingBadge(test, 'print-test-fasting-badge')}${gestationalWarningBadge(test, 'print-gestational-warning')}${printManualTestNote(test)}</div>${multi ? `<div class="print-route-count">${routes.length} ${noun}</div>` : ''}</td>`;
    return `<tbody class="print-detail-test-group${multi ? ' print-detail-multi-group' : ''}">` +
      routes.map((route, index) => {
        const routeIndex = multi ? `<span class="print-detail-route-number" aria-label="Collection path ${index + 1} of ${routes.length}">${hasTransportOnlyPath ? 'Path' : 'Specimen'} ${index + 1} of ${routes.length}</span>` : '';
        const drawCount = Math.max(1, Number(route.collectionCount) || 1);
        const submitCount = Math.max(1, Number(route.submissionCount) || 1);
        const quantities = drawCount > 1 || submitCount > 1
          ? `<div class="print-detail-quantity">${drawCount > 1 ? `Draw ${drawCount}${submitCount > 1 ? ' · ' : ''}` : ''}${submitCount > 1 ? `Submit ${submitCount}` : ''}</div>`
          : '';
        const reuseNote = route.transportOnly ? '<div class="print-detail-quantity">From same collected specimen</div>' : '';
        return `<tr class="print-detail-route-row${index ? ' print-detail-route-secondary' : ''}">` +
          (index === 0 ? testIdentity : '') +
          `<td class="print-detail-route-container">${routeIndex}${printDetailContainerPath(route)}${quantities}${reuseNote}</td>` +
          `<td class="print-detail-temperature-stability"><span class="print-temp-badge ${temperatureClass(route.transportTemperature)}">${escapeHtml(route.transportTemperature)}</span><div class="print-detail-stability"><strong>Stability:</strong> <span class="print-stability-period">${escapeHtml(printStabilityForTemperature(route))}</span></div></td>` +
          `<td><span class="print-preferred-volume">${escapeHtml(printDetailVolumeText(route, 'preferred') || 'Verify')}</span><br><span class="print-minimum-volume">Minimum: ${escapeHtml(printDetailVolumeText(route, 'minimum') || '—')}</span></td>` +
          (showNotes ? `<td class="print-detail-route-notes">${printDetailHasNotes(route) ? printDetailHandling(route) : ''}${index === 0 ? tatBadge(test, true) : ''}</td>` : '') +
          '</tr>';
      }).join('') + '</tbody>';
  }

  function printSummary() {
    const tests = selectedTests();
    if (!tests.length) return showToast('Add at least one test before printing.');
    const printDetailWithNotes = tests.some(test =>
      Boolean(tatBadge(test, true)) || printDetailRoutes(test).some(printDetailHasNotes));
    // Pre-draw warnings already appear in Collection precautions.
    const preparationTexts = new Set(tests.flatMap(test =>
      preCollectionPrecautions(test).map(req => `${displayCode(test)} ${test.testName}: ${req.note}`)
    ));
    const alerts = collectAlerts(tests).filter(alert => !preparationTexts.has(alert.text));
    els.printSheet.innerHTML = `
      <div class="print-header">
        <div class="print-header-identity"><h1 class="print-title">LabCorp Collection Summary</h1><div class="print-subtitle">Send-out workflow</div></div>
        <div class="print-meta">Generated ${escapeHtml(new Date().toLocaleString())}<span class="print-selected-count">${tests.length} ${tests.length === 1 ? 'test' : 'tests'}</span><span class="print-lab-destination">RECEIVING LAB: LABCORP</span></div>
      </div>
      ${window.LabRegionalRestrictions.printNotice(tests, 'labcorp')}
      ${tests.some(isManuallyAddedTest) ? '<div class="print-manual-test-notice"><strong>Manual entry:</strong> Confirm the test code, specimen, collection tubes, and submission requirements in the official lab directory before collecting.</div>' : ''}
      ${printCollectionSubmissionPlan(tests)}
      <section class="print-detail-table-section${tests.length <= 3 ? ' print-brief-order' : ''}">
      ${printCompactAlertSummary(tests, alerts)}
      <table class="print-table">
        ${printDetailWithNotes
          ? '<colgroup><col style="width:19%"><col style="width:25%"><col style="width:16%"><col style="width:9%"><col style="width:31%"></colgroup>'
          : '<colgroup><col style="width:21%"><col style="width:45%"><col style="width:20%"><col style="width:14%"></colgroup>'}
        <thead><tr class="print-detail-title-row"><th colspan="${printDetailWithNotes ? 5 : 4}" class="print-detail-title-cell"><div class="print-detail-lab-heading"><strong>Test details</strong><span class="print-detail-lab-badge">LABCORP</span></div></th></tr><tr><th>Code / test</th><th>Collection / transport</th><th>Temperature / stability</th><th>Volume</th>${printDetailWithNotes ? '<th>Notes</th>' : ''}</tr></thead>
        ${tests.map(test => printDetailRows(test, printDetailWithNotes)).join('')}
      </table>
      </section>
      ${printNotesFooter()}
`;
    // Keep the same two-column card layout. On a phone, fit the print sheet
    // inside the page instead of forcing its 10-inch landscape width onto a
    // portrait page (which can clip the right-hand borders).
    const mobilePrint = window.matchMedia('(max-width: 720px), (hover: none) and (pointer: coarse)').matches;
    document.documentElement.classList.toggle('mobile-print', mobilePrint);
    let mobilePageRule = document.getElementById('mobilePrintPageRule');
    if (mobilePrint && !mobilePageRule) {
      mobilePageRule = document.createElement('style');
      mobilePageRule.id = 'mobilePrintPageRule';
      mobilePageRule.textContent = '@page { size: auto; margin: 0.20in; }';
      document.head.appendChild(mobilePageRule);
    } else if (!mobilePrint) {
      mobilePageRule?.remove();
    }
    // Keep "What to collect" on the same printed page as the first paired
    // collection row. The existing row owns equal-height cards and is unchanged.
    const collectionHeading = els.printSheet.querySelector('.print-logistics-subheading.print-section-banner');
    const collectionGrid = els.printSheet.querySelector('.print-collection-grid');
    const firstCollectionRow = collectionGrid?.querySelector(':scope > .print-collection-row');
    if (collectionHeading && firstCollectionRow) {
      const firstGroup = document.createElement('div');
      firstGroup.className = 'print-collection-first-group';
      collectionGrid.insertBefore(firstGroup, firstCollectionRow);
      firstGroup.append(collectionHeading, firstCollectionRow);
    }
    // Attach the submission heading to the FIRST paired bag row on every
    // print layout. That row is wrapped as one pagination unit below, so the
    // heading cannot print alone while its first two bags move to another page.
    // Continuations never repeat the heading; paired bag alignment is unchanged.
    const heading = els.printSheet.querySelector('.print-submit-heading');
    const firstBagRow = els.printSheet.querySelector('.print-bag-row');
    if (heading && firstBagRow) firstBagRow.insertBefore(heading, firstBagRow.firstChild);
    // Keep the bag masthead with its first specimen card at automatic page breaks.
    // Other specimen cards can still paginate independently.
    els.printSheet.querySelectorAll('.print-bag-card').forEach(card => {
      const bar = card.querySelector('.print-bag-topbar');
      const heading = card.querySelector('.print-bag-card-header');
      const containerList = card.querySelector('.print-submit-content');
      const firstItem = containerList?.querySelector(':scope > .print-submit-item');
      if (!bar || !heading || !containerList || !firstItem) return;
      const opening = document.createElement('div');
      opening.className = 'print-bag-opening';
      card.insertBefore(opening, bar);
      opening.append(bar, heading);
      const firstItemList = document.createElement('div');
      firstItemList.className = 'print-submit-content print-bag-first-item';
      firstItemList.appendChild(firstItem);
      opening.appendChild(firstItemList);
      if (!containerList.children.length) containerList.remove();
    });

    // Print paired bag slices instead of allowing Safari to fragment a grid
    // cell independently and delay the neighboring bag to a later page.
    // Four submission groups per slice keep paired cards atomic and leave
    // room for the masthead, verification notes, and bottom-aligned footer.
    const printBagGroupsPerSlice = 4;
    els.printSheet.querySelectorAll('.print-bag-row').forEach(row => {
      const originalCards = Array.from(row.children).filter(node => node.classList.contains('print-bag-card'));
      if (!originalCards.length) return;
      const itemsByCard = originalCards.map(card => Array.from(card.querySelectorAll('.print-submit-item')));
      const sliceCount = Math.max(...itemsByCard.map(items => Math.ceil(items.length / printBagGroupsPerSlice)));
      if (sliceCount <= 1) return;

      const parent = row.parentNode;
      const heading = Array.from(row.children).find(node => node.classList.contains('print-submit-heading'));
      for (let sliceIndex = 0; sliceIndex < sliceCount; sliceIndex++) {
        const sliceRow = row.cloneNode(false);
        sliceRow.classList.remove('single-row');
        if (sliceIndex === 0 && heading) sliceRow.appendChild(heading);
        let visibleCardCount = 0;

        originalCards.forEach((card, cardIndex) => {
          const allItems = itemsByCard[cardIndex];
          const start = sliceIndex * printBagGroupsPerSlice;
          if (start >= allItems.length) return;
          const end = Math.min(start + printBagGroupsPerSlice, allItems.length);
          const sliceCard = card.cloneNode(true);
          sliceCard.classList.remove('bag-long');
          sliceCard.classList.toggle('bag-continued', sliceIndex > 0);
          sliceCard.querySelectorAll('.print-submit-item').forEach(item => item.remove());

          const firstContent = sliceCard.querySelector('.print-bag-first-item');
          let remainingContent = Array.from(sliceCard.children).find(node => node.classList.contains('print-submit-content'));
          if (!firstContent) return;
          firstContent.appendChild(allItems[start].cloneNode(true));
          for (let itemIndex = start + 1; itemIndex < end; itemIndex++) {
            if (!remainingContent) {
              remainingContent = document.createElement('div');
              remainingContent.className = 'print-submit-content';
              sliceCard.querySelector('.print-bag-opening').after(remainingContent);
            }
            remainingContent.appendChild(allItems[itemIndex].cloneNode(true));
          }
          if (remainingContent && !remainingContent.children.length) remainingContent.remove();

          if (sliceIndex > 0) {
            // A later slice is not another transport bag. Replace the cloned
            // masthead with a compact handoff cue, not a second bag opening.
            const opening = sliceCard.querySelector('.print-bag-opening');
            const topbar = opening?.querySelector('.print-bag-topbar');
            const header = opening?.querySelector('.print-bag-card-header');
            const lab = topbar?.querySelector('.print-bag-topbar-label')?.textContent?.split('·')[0]?.trim() || 'LAB';
            const bagIndex = topbar?.querySelector('.print-bag-topbar-index')?.textContent?.trim().replace('/', ' OF ') || '';
            const temperature = header?.querySelector('.print-bag-title strong')?.textContent?.trim() || 'BAG';
            const priority = topbar?.querySelector('.print-bag-priority')?.textContent?.trim() || '';
            const cue = document.createElement('div');
            cue.className = 'print-bag-continuation-cue';
            cue.setAttribute('role', 'note');
            cue.textContent = '› CONTINUE ' + lab + ' BAG ' + bagIndex
              + ' · ' + temperature + ' · ' + priority + ' · SAME BAG';
            topbar?.remove();
            header?.remove();
            opening?.insertBefore(cue, opening.firstChild);
            // Verification notes belong to the individual tube cards and
            // travel with those cards on any continuation page.
          }
          if (end < allItems.length) {
            // A partial print fragment must remain visibly open at the bottom.
            sliceCard.classList.add('bag-has-more');
            sliceCard.querySelector('.print-bag-end')?.remove();
            const continuation = document.createElement('div');
            continuation.className = 'print-bag-continues';
            continuation.textContent = '› MORE CONTAINERS FOLLOW · SAME BAG · ' + end + ' OF ' + allItems.length + ' GROUPS SHOWN';
            sliceCard.appendChild(continuation);
          }
          sliceRow.appendChild(sliceCard);
          visibleCardCount++;
        });

        if (visibleCardCount === 1) sliceRow.classList.add('single-row');
        parent.insertBefore(sliceRow, row);
      }
      row.remove();
    });
    // Short side-by-side bag pairs must start together rather than leaving
    // a bag topbar on the previous page. Keep the original grid, stretch,
    // equal-height footer, and individual long-bag pagination rules.
    els.printSheet.querySelectorAll('.print-bag-row').forEach(row => {
      if (row.querySelector('.bag-long')) return;
      const pairKeep = document.createElement('div');
      pairKeep.className = 'print-bag-pair-keep';
      row.parentNode.insertBefore(pairKeep, row);
      pairKeep.appendChild(row);
    });
    window.print();
  }

  function exportSummaryCsv() {
    const tests = selectedTests();
    if (!tests.length) return showToast('Add at least one test before exporting.');
    const headers = ['Priority','Test Code','Test Name','Specimen Type','Draw Container','Additional Required Draws','Alternative Container','Transport Tube / Container','Preferred Volume','Minimum Volume','Transport Temperature','Raw Temperature','Stability','Spin','Special Labeling','Special Instructions'];
    const rows = tests.map(test => [test.isStat ? 'STAT' : 'Routine',test.testCode,test.testName,[test.specimenType, ...additionalDrawRequirements(test).map(item => item.specimenType)].filter(Boolean).join(' + '),test.drawContainer,additionalDrawRequirements(test).filter(item => !item.transportOnly).map(item => `${item.container}${item.specimenType ? ` (${item.specimenType})` : ''}`).join(' + '),test.alternativeContainer,(['001750', '144057', '081162'].includes(String(test.testCode))
      ? splitSubmissionContainers(test).map(container => container.label).join(' + ')
      : [test.transportContainer, ...additionalDrawRequirements(test).map(item => item.transportContainer)].filter(Boolean).join(' + ')),combinedVolumeText(test, 'preferred'),combinedVolumeText(test, 'minimum'),test.transportTemperature,test.transportTemperatureRaw,test.stability,test.spin,test.specialLabeling,test.specialInstructions]);
    const csv = [headers, ...rows].map(row => row.map(csvCell).join(',')).join('\r\n');
    downloadBlob(csv, `labcorp-collection-summary-${isoDate()}.csv`, 'text/csv;charset=utf-8');
  }

  function manualEntryOwner(test) {
    return String(test.addedByInitials || '').trim().toUpperCase() || 'not recorded';
  }

  function manualTestInlineTag(test) {
    return isManuallyAddedTest(test)
      ? `<span class="print-manual-inline"> · MANUAL ENTRY · Added by ${escapeHtml(manualEntryOwner(test))}</span>`
      : '';
  }

  function manualLibraryTag(test) {
    return isManuallyAddedTest(test)
      ? `<span class="manual-added-by-label">Manual entry · Added by ${escapeHtml(manualEntryOwner(test))}</span>`
      : '';
  }

  function printManualCardWarning(tests) {
    const manualTests = uniqueTests(tests || []).filter(isManuallyAddedTest);
    if (!manualTests.length) return '';
    return `<div class="print-manual-card-warning"><strong>Manual ${manualTests.length === 1 ? 'entry' : 'entries'}:</strong> Confirm code, collection and submission containers, counts, and handling in the official directory before use.</div>`;
  }

  function isManuallyAddedTest(test) {
    return String(test.id || '').startsWith('custom-') || String(test.source || '') === 'Custom entry';
  }

  function printManualTestNote(test) {
    return isManuallyAddedTest(test)
      ? `<span class="print-manual-verification"><span class="print-manual-owner">Manual entry · Added by ${escapeHtml(manualEntryOwner(test))}</span><span class="print-manual-confirm">Confirm in official directory</span></span>`
      : '';
  }

  function displayCode(test) {
    return String(test.testCode || '').trim() || 'Manual';
  }

  function directorySearchUrl(query) {
    const value = String(query || '').trim();
    return 'https://www.labcorp.com/test-menu/search' + (value ? '?query=' + encodeURIComponent(value) : '');
  }
  function directoryUrl(test) {
    // Prefer the exact LabCorp official record URL bundled with verified tests.
    const source = String(test?.source || '');
    const match = source.match(/https:\/\/(?:www|womenshealth)\.labcorp\.com\/tests\/[0-9]+\/[a-z0-9-]+/i);
    if (match) return match[0];
    return directorySearchUrl(test?.testCode || test?.testName || '');
  }

  function temperatureClass(temp) {
    const value = String(temp || '').toLowerCase();
    if (value === 'room temperature') return 'temp-room';
    if (value === 'refrigerated') return 'temp-refrigerated';
    if (value === 'frozen') return 'temp-frozen';
    if (value.includes('room') || value.includes('mixed')) return 'temp-mixed';
    return 'temp-unknown';
  }

  function tubeClass(container) {
    const value = genericTransportName(container).toLowerCase();
    // Sarstedt Salivette cortisol devices have a cobalt blue cap, not a gray tube.
    if (/\bsalivette\b/.test(value)) return 'tube-salivette';
    // Only the generic additive-free Transport Tube uses the regular green badge.
    // Preserve Labcorp purple frozen caps and specialty kit-specific badge rules.
    if (/^transport tube$/.test(value)) return 'tube-transport tube-transport-green-top';
    // Named specialty tube must take priority over individual cap colors.
    if (/\bnmr\s*lipo\s*tube\b/.test(value)) return 'tube-nmr-lipotube';
    // Special LabCorp tube and vial badges reflect the actual kit cap/medium.
    if (/quanti[- ]?feron/.test(value)) {
      if (/\bnil\b/.test(value)) return 'tube-qft-nil';
      if (/\btb\s*1\b/.test(value)) return 'tube-qft-tb1';
      if (/\btb\s*2\b/.test(value)) return 'tube-qft-tb2';
      if (/\bmitogen\b/.test(value)) return 'tube-qft-mitogen';
      return 'tube-green';
    }
    if (/e[- ]?swab|\bliquid\s+amies\b|\bamies\s+liquid\b/.test(value)) return 'tube-eswab';
    if (/\butm\b|\bvtm\b|universal transport medium|viral transport medium/.test(value)) return 'tube-utm';
    if (/purple\s+pp|pp\s+transpak|(?:dedicated\s+)?frozen\s+(?:(?:serum|plasma|platelet[- ]poor plasma)\s+)?transport\s+tube|frozen\s+transpak/.test(value)) return 'tube-frozen-purple';
    if (/pink.*formalin|formalin.*o\s*&\s*p/.test(value)) return 'tube-op-formalin';
    if (/gray\s+pva|grey\s+pva|pva\s+o\s*&\s*p/.test(value)) return 'tube-op-pva';
    if (/para[- ]?pak.*clean|sterile\s+screw[- ]?cap\s+stool|stool.*screw[- ]?cap/.test(value)) return 'tube-stool-clean';
    // Para-Pak C&S orange vial has a red Cary-Blair medium, not a gray cap.
    if (/cary[- ]?blair|para[- ]?pak\s+c\s*&\s*s\s+orange/.test(value)) return 'tube-cary-blair';
    if (/microtainer/.test(value)) return microtainerIcon(value);
    if (/uri[- ]?sponge/.test(value)) return 'tube-urisponge';
    if (/aptima/.test(value) && /\burine\b/.test(value)) return 'tube-aptima-urine';
    if (/aptima/.test(value) && /\bunisex\b|white[- ]?label/.test(value)) return 'tube-aptima-unisex';
    if (/aptima/.test(value) && /pap[- ]?vial|green[- ]?label|specimen transfer/.test(value)) return 'tube-aptima-transfer';
    if (/aptima/.test(value)) return 'tube-aptima';
    if (/total[- ]?fix/.test(value)) return 'tube-total-fix';
    if (/(?:trace[ -]?metal[- ]?free|acid[- ]?washed).*container|container.*(?:trace[ -]?metal[- ]?free|acid[- ]?washed)/.test(value)) return 'tube-trace-metal-container';
    if (/24\s*[- ]?hour\s+urine\s+(?:container|jug)|24h\s+urine\s+(?:container|jug)/.test(value)) return 'tube-24h-urine';
    if (/sterile\s+(?:urine\s+)?cup|urine\s+collection\s+cup/.test(value)) return 'tube-urine-cup';
    if (/blood culture|culture bottle|bactec|\bsps\b/.test(value)) return 'tube-culture';
    if (value.includes('red/yellow') && (value.includes('gray') || value.includes('grey'))) return 'tube-ua-pair';
    if (/gray|grey/.test(value) && /urine|culture|boric/.test(value)) return 'tube-urine-culture';
    if (value.includes('red/yellow') || value.includes('swirl')) return 'tube-ua-swirl';
    if (value.includes('sst') || value.includes('gold')) return 'tube-sst';
    if (value.includes('lavender')) return 'tube-lavender';

    if (/royal blue|royal-blue/.test(value)) {
      if (/no additive|red stripe|red strip/.test(value)) return 'tube-royal-no-additive';
      if (/heparin|green band|green stripe/.test(value)) return 'tube-royal-heparin';
      if (/edta|purple stripe|purple strip|lavender stripe|lavender strip/.test(value)) return 'tube-royal-edta';
      return 'tube-royal';
    }

    if (/acid[- ]?washed|acid[- ]?rinsed|metal[- ]?free|trace[- ]?(?:metal|element)/.test(value)) {
      if (/\burine\b|\bcup\b|plastic\s+container/.test(value) &&
          !/\b(?:serum|plasma|whole blood|rbcs?)\b/.test(value)) return 'tube-trace-metal-container';
      return 'tube-transport tube-metal-free-neutral';
    }

    if (value.includes('tan')) return 'tube-tan';
    if (value.includes('heparin') || value.includes('green')) return 'tube-green';
    if (value.includes('red')) return 'tube-red';
    if (value.includes('light blue') || value.includes('citrate')) return 'tube-blue';
    if (value.includes('gray') || value.includes('grey')) return 'tube-gray';
    if (value.includes('pink')) return 'tube-pink';
    if (value.includes('yellow')) return 'tube-yellow';
    return '';
  }

  function parseSimpleMl(value) {
    const text = String(value || '').replace(/,/g, '');
    if ((text.match(/\bml\b/gi) || []).length > 1 || /\n|\)|\(/.test(text)) return null;
    const match = text.match(/(\d+(?:\.\d+)?)\s*m\s*l\b/i);
    return match ? Number(match[1]) : null;
  }

  function formatMl(value) {
    return `${Number(value.toFixed(2))} mL`;
  }

  function setDrawContainerValue(value) {
    const normalized = cleanCollectionContainer(value);
    const hasOption = Array.from(els.drawContainer.options).some(option => option.value === normalized);
    if (hasOption) {
      els.drawContainer.value = normalized;
      els.customDrawContainer.value = '';
    } else if (normalized) {
      els.drawContainer.value = '__other__';
      els.customDrawContainer.value = normalized;
    } else {
      els.drawContainer.value = '';
      els.customDrawContainer.value = '';
    }
    toggleCustomDrawContainer();
  }

  function setTransportContainerValue(value) {
    // Backward compatibility: saved tests using the former duplicate original-
    // tube choice edit as the single original-tube option, not a custom tube.
    const supplied = cleanCollectionContainer(value);
    const normalized = /^(?:pp\s+transpak(?:\s*\(purple cap\))?|frozen transport tube\s*\(pp transpak\))$/i.test(supplied)
      ? 'Frozen Transport Tube'
      : /^(?:whole blood\s*\/\s*original tube|no transfer\s*\/\s*submit in original tube)$/i.test(supplied)
      ? 'Submit in original tube' : supplied;
    const match = Array.from(els.transportContainer.options).find(option =>
      option.value && option.value !== '__other__' && normalizeSearch(option.value) === normalizeSearch(normalized));
    if (match) {
      els.transportContainer.value = match.value;
      els.customTransportContainer.value = '';
    } else if (normalized) {
      els.transportContainer.value = '__other__';
      els.customTransportContainer.value = normalized;
    } else {
      els.transportContainer.value = '';
      els.customTransportContainer.value = '';
    }
    toggleCustomTransportContainer(false);
  }

  function toggleCustomTransportContainer(shouldFocus = true) {
    const isOther = els.transportContainer.value === '__other__';
    els.customTransportContainerRow.classList.toggle('hidden', !isOther);
    els.customTransportContainerRow.classList.toggle('is-active', isOther);
    els.customTransportContainer.disabled = !isOther;
    els.customTransportContainer.required = isOther;
    if (!isOther) els.customTransportContainer.value = '';
    if (isOther && shouldFocus) els.customTransportContainer.focus();
  }

  function selectedTransportContainer(strict = false) {
    if (els.transportContainer.value === '__other__') {
      return els.customTransportContainer.value.trim() || (strict ? '' : 'Verify Official Instructions');
    }
    return els.transportContainer.value || (strict ? '' : 'Verify Official Instructions');
  }

  function isSelectedDrawSst() {
    const draw = selectedDrawContainer(true);
    return /\bsst\b|gold|serum separator|red\s*\/\s*black/i.test(draw);
  }

  function updateSstSpinRequirement() {
    const isSst = isSelectedDrawSst();
    if (isSst) els.spin.value = 'Yes';
    els.spin.disabled = isSst;
    els.spin.title = isSst ? 'SST specimens must be spun before submission.' : '';
    window.syncPortalSelects?.();
  }

  function toggleCustomDrawContainer() {
    const isOther = els.drawContainer.value === '__other__';
    els.customDrawContainerRow.classList.toggle('hidden', !isOther);
    els.customDrawContainer.disabled = !isOther;
    els.customDrawContainer.required = isOther;
    els.customDrawContainerRow.classList.toggle('is-active', isOther);
    els.customDrawContainerRow.classList.remove('is-disabled');
    els.customDrawContainer.placeholder = 'Type any tube, cup, swab, or collection kit';
    if (!isOther) els.customDrawContainer.value = '';
    if (isOther) setTimeout(() => els.customDrawContainer.focus(), 0);
  }

  function selectedDrawContainer(strict = false) {
    if (els.drawContainer.value === '__other__') {
      return els.customDrawContainer.value.trim() || (strict ? '' : 'Verify Official Instructions');
    }
    return els.drawContainer.value || (strict ? '' : 'Verify Official Instructions');
  }

  function setSelectValue(select, value, fallback) {
    let option = Array.from(select.options).find(item => item.value === value);
    if (!option && select === els.specimenType && String(value || '').trim()) {
      option = document.createElement('option');
      option.value = value;
      option.textContent = value;
      option.dataset.addedSpecimen = 'true';
      select.appendChild(option);
    }
    select.value = option ? option.value : fallback;
  }

  function loadJson(key, fallback) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : fallback;
    } catch { return fallback; }
  }

  function downloadBlob(content, filename, type) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function csvCell(value) {
    const text = String(value ?? '');
    return `"${text.replace(/"/g, '""')}"`;
  }

  function isoDate() {
    return new Date().toISOString().slice(0, 10);
  }

  function truncate(value, length) {
    const text = String(value || '');
    return text.length > length ? `${text.slice(0, length - 1)}…` : text;
  }

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
  }

  function escapeAttr(value) {
    return escapeHtml(value).replace(/`/g, '&#96;');
  }

  function showToast(message) {
    clearTimeout(toastTimer);
    els.toast.textContent = message;
    els.toast.classList.add('show');
    toastTimer = setTimeout(() => els.toast.classList.remove('show'), 2300);
  }
  init();
})();
