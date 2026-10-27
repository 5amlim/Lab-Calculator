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
  const PAGE_STEP = 30;
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
    libraryFilter: $('libraryFilter'), categoryFilter: $('categoryFilter'), specimenFilter: $('specimenFilter'), temperatureFilter: $('temperatureFilter'), transportContainerFilter: $('transportContainerFilter'), fastingFilter: $('fastingFilter'), pediatricFilter: $('pediatricFilter'), spinFilter: $('spinFilter'), catalogFilterButton: $('catalogFilterButton'), catalogFilterButtonText: $('catalogFilterButtonText'), catalogFilterPanel: $('catalogFilterPanel'), catalogFilterReset: $('catalogFilterReset'), catalogFilterDone: $('catalogFilterDone'), catalogFilterControl: $('catalogFilterControl'), clearBrowserTestsButton: $('clearBrowserTestsButton'), browserCustomCount: $('browserCustomCount'),
    libraryBody: $('libraryBody'), libraryStatus: $('libraryStatus'), loadMoreButton: $('loadMoreButton'), loadMoreInlineButton: $('loadMoreInlineButton'),
    blockedListButton: $('blockedListButton'), blockedListPanel: $('blockedListPanel'), blockedListBody: $('blockedListBody'),
    addTestButton: $('addTestButton'), addSelectedTestButton: $('addSelectedTestButton'), testsDetailsButton: $('testsDetailsButton'), testsDetailsPanel: $('testsDetailsPanel'),
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

  const seedDatabase = (window.SEED_TESTS || []).map(normalizeRecord);
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
  let libraryLimit = PAGE_STEP;
  let blockedListOpen = false;
  let toastTimer;

  init();

  function init() {
    if (els.categoryFilter && window.LabClinicalCategories) {
      els.categoryFilter.innerHTML = '<option value="">All categories</option>' +
        window.LabClinicalCategories.options.map(({id,label}) =>
          `<option value="${id}">${label.replace(/&/g, '&amp;')}</option>`).join('');
    }
    bindEvents();
    renderAll();
  }

  function bindEvents() {
    els.previewButton.addEventListener('click', () => renderBatch(false));
    els.addBestButton.addEventListener('click', () => renderBatch(true));
    els.clearSearchButton.addEventListener('click', () => {
      els.searchInput.value = '';
      els.batchResults.classList.add('hidden');
      els.batchResults.innerHTML = '';
      els.searchInput.focus();
    });
    els.searchInput.addEventListener('keydown', (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') renderBatch(true);
    });
    els.libraryFilter.addEventListener('input', () => { libraryLimit = PAGE_STEP; renderLibrary(); });
    [els.categoryFilter, els.specimenFilter, els.temperatureFilter, els.transportContainerFilter, els.fastingFilter, els.pediatricFilter, els.spinFilter].forEach(control => control.addEventListener('change', () => { libraryLimit = PAGE_STEP; renderLibrary(); }));
    els.catalogFilterButton.addEventListener('click', () => { if (els.catalogFilterPanel.classList.contains('hidden')) setStatPickerOpen(false); toggleCatalogFilters(); });
    els.catalogFilterDone.addEventListener('click', () => toggleCatalogFilters(false));
    els.catalogFilterReset.addEventListener('click', resetCatalogFilters);
    document.addEventListener('click', event => { if (!els.catalogFilterControl.contains(event.target)) toggleCatalogFilters(false); });
    document.addEventListener('keydown', event => { if (event.key === 'Escape') toggleCatalogFilters(false); });
    els.clearBrowserTestsButton.addEventListener('click', clearBrowserAddedTests);
    els.loadMoreButton.addEventListener('click', () => { libraryLimit += PAGE_STEP; renderLibrary(); });
    els.blockedListButton?.addEventListener('click', () => { blockedListOpen = !blockedListOpen; renderBlockedList(); });
    els.loadMoreInlineButton?.addEventListener('click', () => { libraryLimit += PAGE_STEP; renderLibrary(); });
    els.libraryBody.addEventListener('click', handleLibraryClick);
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

  function renderAll() {
    els.recordCount.textContent = `${database.length} tests`;
    renderLibrary();
    renderBlockedList();
    renderOrder();
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

  function applyUserState(state) {
    // Separate LabCorp records and local edits; no Quest code migrations.
    const builtIns = seedDatabase.map(test => ({ ...test }));
    const byId = new Map(builtIns.map((test, i) => [test.id, i]));
    const byKey = new Map(builtIns.map((test, i) => [databaseKey(test), i]));
    (state.overrides || []).map(normalizeRecord).forEach(override => {
      const index = byId.get(override.id) ?? byKey.get(databaseKey(override));
      if (index !== undefined) builtIns[index] = override;
    });
    const customTests = (state.customTests || []).map(normalizeRecord);
    return [...customTests, ...builtIns];
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
          window.alert('The calculator loaded, but custom browser changes could not be saved. Browser storage may be unavailable.');
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
    return String(value ?? '');
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
      drawContainer = transportContainer;
    }
    // Microtainer-only neonatal instructions override the generic SST/Gold
    // source. Never count these small-volume microcollection tubes as regular
    // 5 mL Gold or 7.5 mL Tiger SSTs. Preserve the full manufacturer notes.
    const microtainerRequired = /\bmicrotainer(?:s)?\b/i.test(`${drawContainer} ${record.specialInstructions || ''}`)
      && /\bserum\b/i.test(specimenType)
      && /sst|serum separator|gold|microtainer/i.test(drawContainer);
    if (microtainerRequired) drawContainer = 'Amber Microtainer SST';
    return {
      id: String(record.id || `custom-${Date.now()}-${index}`),
      testCode: String(record.testCode ?? record[['que', 'stCode'].join('')] ?? '').trim(),
      testName: String(record.testName ?? '').trim(),
      addedByInitials: String(record.addedByInitials || '').trim().toUpperCase(),
      specimenType,
      drawContainer,
      alternativeContainer: cleanCollectionContainer(String(record.alternativeContainer || '')),
      additionalDrawRequirements: normalizeAdditionalDrawRequirements(record.additionalDrawRequirements),
      collectionCount: Number(record.collectionCount) > 1 ? Math.floor(Number(record.collectionCount)) : 1,
      submissionCount: Number(record.submissionCount) > 1 ? Math.floor(Number(record.submissionCount)) : 1,
      transportContainer,
      preferredVolume: String(record.preferredVolume || ''),
      minimumVolume: String(record.minimumVolume || ''),
      transportTemperature: String(record.transportTemperature || 'Not specified'),
      transportTemperatureRaw: String(record.transportTemperatureRaw || ''),
      stability: String(record.stability || ''),
      spin: String(record.spin || 'Verify'),
      specialLabeling: String(record.specialLabeling || '').trim(),
      specialInstructions: String(record.specialInstructions || ''),
      fastingStatus: ['required', 'preferred'].includes(String(record.fastingStatus || '').toLowerCase()) ? String(record.fastingStatus).toLowerCase() : '',
      fastingInstructions: String(record.fastingInstructions || '').trim(),
      status: record.status === 'blocked' ? 'blocked' : 'active',
      source: String(record.source || 'Custom entry'),
      sourceRow: record.sourceRow || null
    };
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
          alternativeContainer: '',
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
          collectionCount: count
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
    return `<span class="${className} tube ${displayClass}">${escapeHtml(label)}${cls === 'tube-microtainer' ? ' · MICROTAINER' : ''}</span>`;
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
            label: frozenTransportLabel(test, finalTransportContainer(test)),
            className: transportTubeClass(test, finalTransportContainer(test))
          },
          ...additionalDrawRequirements(test).map(requirement => {
            const label = requirement.transportContainer || requirement.container;
            return {
              label,
              className: transportTubeClass(
                { ...test, specimenType: requirement.specimenType || test.specimenType },
                label
              )
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
  function menuContainerBadges(test) {
    // Directory-only presentation. Never change collection, processing or pooling.
    // Display the physical source followed by its distinct submission container.
    const specimen = String(test.specimenType || '').toLowerCase();
    const rawDraw = String(test.drawContainer || 'Verify collection container').trim();
    const draw = cleanCollectionContainer(rawDraw);
    const transport = String(finalTransportContainer(test) || '').trim();
    const isCup = /^(?:sterile\s+(?:urine\s+|stool\s+|specimen\s+)?cup|stool\s+collection\s+cup|urine\s+collection\s+cup)$/i.test(rawDraw);
    const collectionLabel = isCup ? 'Sterile cup' : draw;
    const drawBadges = drawContainerBadge(collectionLabel) +
      additionalDrawRequirements(test).filter(req => !req.transportOnly)
        .map(req => drawContainerBadge(cleanCollectionContainer(req.container || 'Verify collection container'))).join(' ');
    const cleanName = value => {
      const text = normalizeSearch(cleanCollectionContainer(value))
        .replace(/\b(?:spun|centrifuged|original|tube)\b/g, ' ').replace(/\s+/g, ' ').trim();
      return /^(?:gold\s+sst|sst\s+gold|gold|sst)$/.test(text) ? 'sst gold' : text;
    };
    // Presentation only. Mandatory transfer instructions take priority over
    // similarly named SST tubes; never conceal a required aliquot step.
    const collectionNotes = String(test.specialInstructions || '').toLowerCase();
    const mandatoryTransfer = /\bmust\s+(?:immediately\s+|promptly\s+)?(?:transfer|pour\s+off)\b|\b(?:transfer|separation)\s+of\s+(?:the\s+)?serum\s+(?:is\s+)?(?:mandatory|required)\b|\b(?:transfer|separate)\s+(?:serum|plasma)\s+(?:to|into)\s+(?:a\s+)?(?:separate|dedicated|plastic)\s+(?:tube|container)\b/.test(collectionNotes);
    const original = /\bno\s+transfer\b|\bsubmit\s+in\s+(?:the\s+)?original\s+(?:tube|container)\b|\b(?:original|primary)\s+(?:tube|container)\b/i.test(transport);
    const same = cleanName(collectionLabel) === cleanName(transport) ||
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

  function cleanCollectionContainer(value) {
    const text = String(value || '').trim();
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
    return cleanCollectionContainer(cleaned);
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
    return `<span class="specimen-badge ${specimenClass(label)} ${extraClass}">${escapeHtml(label)}</span>`;
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

  function curatedLabAliases(normalizedName) {
    const aliases = [];
    LAB_SEARCH_ALIAS_RULES.forEach(({ name, terms }) => {
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
    const aliases = Array.from(new Set(curatedLabAliases(name).map(normalizeSearch).filter(Boolean)));
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

  // Relevance order: exact code, code prefix, full name, name keywords (any
  // order), common abbreviations, then typo matches. Instructions rank last.
  function rankLibraryTest(query, test) {
    const q = normalizeSearch(query);
    if (!q) return 0;
    const clinicalQuery = window.LabClinicalCategories?.matchQuery(q);
    if (clinicalQuery && !clinicalQuery.rest)
      return window.LabClinicalCategories.forTest(test).includes(clinicalQuery.id) ? 1000 : 0;
    const { code, name, aliases, nameWords, aliasWords, info } = librarySearchIndex(test);
    if (code && q === code) return 2000;
    if (/^\d+$/.test(q)) return code.startsWith(q) ? 1650 : (q.length >= 3 && code.includes(q) ? 1200 : 0);
    if (name === q) return 1500;
    // Curated full aliases precede prefix/substring matches so PTT finds aPTT
    // instead of incidentally preferring PTT-LA. Exact name/code still wins.
    if (aliases.includes(q)) return 1480 - Math.min(75, name.length / 2);
    const tokens = q.split(' ').filter(Boolean);
    const finalIsRoman = /^(?:i|ii|iii|iv|v|vi|vii|viii|ix|x|xi|xii)$/.test(tokens[tokens.length - 1]);
    if (name.startsWith(q) && (!finalIsRoman || name === q || name.startsWith(`${q} `))) {
      return 1450 - Math.min(120, name.length - q.length);
    }
    if (name.includes(q) && (!finalIsRoman || name.includes(`${q} `) || name.endsWith(q))) {
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
    // Browsing a category cannot automatically select an unrelated order code.
    const clinicalQuery = window.LabClinicalCategories?.matchQuery(q);
    if (clinicalQuery && !clinicalQuery.rest) return 0;
    const code = normalizeSearch(test.testCode);
    const name = normalizeSearch(test.testName);
    const leading = q.match(/^([a-z]*\d[a-z0-9]*) (.+)$/);
    if (leading && leading[1] === code) {
      const nameScore = rankLibraryTest(leading[2], test);
      return 2000 + Math.max(0, nameScore / 50);
    }
    // If the first token looks like a code, only the matching code may rank.
    // Do not turn a mismatched numbered order into a different name-only result.
    if (leading && /^\d+$/.test(leading[1])) return 0;
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
    const results = database
      .filter(test => test.status !== 'blocked' &&
        window.LabClinicalCategories.forTest(test).includes(category.id) &&
        (!category.rest || rankLibraryTest(category.rest, test) > 0))
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
    if (!chosen || chosen.test.status === 'blocked' || !isExactBatchMatch(row.query, chosen.test)) return false;
    if (chosen !== row.matches[0]) return false;
    // An identical name shared by multiple distinct codes cannot be silently
    // resolved without the user specifying a code.
    const q = normalizeSearch(row.query);
    if (q === normalizeSearch(chosen.test.testCode)) {
      const sameCodeTests = database.filter(test => normalizeSearch(test.testCode) === q);
      if (sameCodeTests.length > 1) return false;
    }
    if (q === normalizeSearch(chosen.test.testName)) {
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
    const hardIssueCount = rows.filter(row => ['no-match', 'blocked', 'low-confidence', 'not-added'].includes(row.outcome)).length;
    const unresolved = rows.filter(row => ['no-match', 'blocked', 'low-confidence', 'confirm-match', 'not-added'].includes(row.outcome));
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
    const unresolved = rows.filter(row => ['no-match', 'blocked', 'low-confidence', 'not-added'].includes(row.outcome));
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
    if (outcome === 'blocked') return 'This test is marked “do not perform”';
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
    const autoSafe = canAutoAddBatchRow(row);
    const needsConfirmation = !blocked && !autoSafe;
    const selected = selectedIds.includes(choice.test.id);
    const rowClass = blocked ? 'unmatched' : needsConfirmation ? 'needs-confirmation' : 'exact-match';
    const exactLabel = autoSafe ? 'Exact match' : 'Confirm test code/name';
    const status = blocked
      ? '<span class="batch-match-warning is-blocked">Do not perform</span>'
      : autoSafe
        ? `<span class="batch-match-exact">${exactLabel}</span>`
        : `<span class="batch-match-warning">${exactLabel}</span>`;
    const options = row.matches.length > 1 && (needsConfirmation || blocked || row.matches.some(match => normalizeSearch(match.test.testName) === normalizeSearch(row.query)));
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
                <span class="batch-choice-option-name">${escapeHtml(displayCode(test))} · ${escapeHtml(test.testName)}</span>
                <span class="batch-choice-option-tags">${isStatEligible(test) ? '<span class="batch-choice-stat"><span class="batch-choice-stat-word">STAT</span> eligible</span>' : ''}${test.status === 'blocked' ? '<span class="batch-choice-blocked">Do not perform</span>' : ''}</span>
              </button>
              <button type="button" class="batch-choice-quick-add batch-add-toggle" data-action="toggle-batch-add-options"
                data-batch-index="${row.index}" data-id="${escapeAttr(test.id)}"
                aria-controls="batch-choice-stat-options-${row.index}-${matchIndex}" aria-expanded="false" aria-haspopup="true"
                title="${selectedIds.includes(test.id) ? 'Already in cart' : test.status === 'blocked' ? 'Do not perform' : 'Choose Routine or STAT priority'}"
                aria-label="${selectedIds.includes(test.id) ? 'Already in cart: ' : 'Choose how to add: '}${escapeAttr(displayCode(test) + ' ' + test.testName)}"
                ${selectedIds.includes(test.id) || test.status === 'blocked' ? 'disabled' : ''}>${selectedIds.includes(test.id) ? '✓' : '+'}</button>
              <button type="button" class="batch-choice-details-button" data-action="toggle-batch-test-details"
                aria-expanded="false" aria-controls="batch-choice-details-${row.index}-${matchIndex}" aria-label="Details for ${escapeAttr(displayCode(test) + ' ' + test.testName)}">Details</button>
            </div>
            ${!selectedIds.includes(test.id) && test.status !== 'blocked' ? `<div class="batch-choice-stat-options" id="batch-choice-stat-options-${row.index}-${matchIndex}" hidden role="group"
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
              ${test.specialLabeling ? `<div><b>Labeling:</b> ${escapeHtml(test.specialLabeling)}</div>` : ''}
              ${test.specialInstructions ? `<div><b>Handling:</b> ${escapeHtml(test.specialInstructions)}</div>` : ''}
              <a href="${escapeAttr(directoryUrl(test))}" target="_blank" rel="noopener noreferrer">Verify in official directory ↗</a>
            </div>
          </div>`).join('')}
        </div>
      </div>
    </div>` : '';
    const buttonLabel = selected ? '✓ Added' : needsConfirmation ? 'Confirm & add' : '+ Add';
    return `<div class="batch-row ${rowClass}" data-batch-index="${row.index}">
      <div class="batch-query-block"><span class="batch-kicker">You entered</span><div class="batch-query">${escapeHtml(row.query)}</div></div>
      <div class="batch-match">
        <div class="batch-match-title"><span class="batch-kicker">${choice === row.matches[0] ? 'Best match' : 'Selected match'}</span>${status}</div>
        <strong>${escapeHtml(displayCode(choice.test))} · ${escapeHtml(choice.test.testName)}</strong>
        <div class="batch-match-meta">${blocked ? '<span>Marked do not perform</span>' : ''}${requiredSpecimenBadges(choice.test)}<span class="batch-meta-dot">·</span>${requiredDrawContainerBadges(choice.test)}${isStatEligible(choice.test) ? '<span class="batch-choice-stat"><span class="batch-choice-stat-word">STAT</span> eligible</span>' : ''}</div>
        ${picker}
      </div>
      <div class="batch-row-action">
        <div class="batch-main-add-control">
          <button type="button" class="mini-button batch-main-add-toggle batch-add-toggle ${needsConfirmation ? 'confirm-match-button' : ''}" data-action="toggle-batch-add-options"
            data-batch-index="${row.index}" data-id="${escapeAttr(choice.test.id)}" aria-haspopup="true"
            aria-expanded="false" aria-controls="batch-main-add-options-${row.index}"
            ${blocked || selected ? 'disabled' : ''}>${buttonLabel}<span class="batch-main-add-chevron shared-chevron" aria-hidden="true"></span></button>
          ${!blocked && !selected ? `<div class="batch-choice-stat-options batch-main-add-options" id="batch-main-add-options-${row.index}" hidden role="group"
             aria-label="Choose priority for ${escapeAttr(displayCode(choice.test) + ' ' + choice.test.testName)}">
             <button type="button" data-action="add-batch-option" data-batch-index="${row.index}" data-id="${escapeAttr(choice.test.id)}" data-priority="routine" data-source="main">+ Add as Routine</button>
             ${isStatEligible(choice.test) ? `<button type="button" data-action="add-batch-option" data-batch-index="${row.index}" data-id="${escapeAttr(choice.test.id)}" data-priority="stat" data-source="main" data-stat-note="Confirm receiving-lab acceptance"><span>+ Add as <b>STAT</b></span></button>` : ''}
           </div>` : ''}
        </div>
        ${needsConfirmation ? `<a class="mini-button edit batch-directory-button" href="${escapeAttr(directorySearchUrl(row.query))}" target="_blank" rel="noreferrer">Search directory ↗</a>` : ''}
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
              <span class="batch-category-name">${escapeHtml(test.testName)}</span>
              ${isStatEligible(test) ? '<span class="batch-choice-stat"><span class="batch-choice-stat-word">STAT</span> eligible</span>' : ''}
            </div>
            <button type="button" class="mini-button batch-category-add" data-action="add-category-test"
              data-batch-index="${row.index}" data-id="${escapeAttr(test.id)}" ${selected ? 'disabled' : ''}>${selected ? '✓ Added' : '+ Add'}</button>
          </div>`;
        }).join('')}
      </div>
      ${results.length > 5 ? `<div class="batch-category-footer"><span>Scroll inside the list to browse all ${results.length} tests</span></div>` : ''}
    </div>`;
  }

  function specimenFilterCategory(specimenType) {
    const value = normalizeSearch(specimenType || '');
    if (['serum', 'plasma', 'platelet poor plasma', 'rbcs', 'whole blood'].includes(value)) return 'Blood';
    if (value.includes('urine')) return 'Urine';
    if (value.includes('stool')) return 'Stool';
    if (value.includes('swab')) return 'Swab';
    return 'Other';
  }

  // Filter by the transport requirement recorded for each test, not the draw
  // tube. Keep special containers separate from generic transport tubes.
  function transportContainerFilterCategories(test) {
    const value = normalizeSearch(test.transportContainer || '');
    // Direct submission in the collection cup is still sterile-cup transport,
    // including records described as "original tube / no transfer".
    if (cleanCollectionContainer(test.transportContainer) === 'Sterile cup' ||
        (/\b(?:original tube|primary tube|no transfer|do not open)\b/.test(value) &&
          cleanCollectionContainer(test.drawContainer) === 'Sterile cup')) return ['sterile-cup', 'original'];
    if (isFrozenSerumPlasmaTransport(test, test.transportContainer)) return ['frozen-transport'];
    if (/red yellow|ua preservative/.test(value)) {
      // A few urine panels require both UA and culture preservative tubes.
      return /gray top urine|urine culture|urisponge/.test(value)
        ? ['urine-ua', 'urine-culture'] : ['urine-ua'];
    }
    if (/gray top urine|urine culture|urisponge/.test(value)) return ['urine-culture'];
    if (/amber|light protected|protect from light/.test(value)) return ['amber'];
    if (/acid washed|metal free|trace element|trace metal/.test(value)) return ['metal'];
    if (/sst|gold spun/.test(value)) return ['sst'];
    if (/no transfer|original tube|primary tube|do not open/.test(value)) return ['original'];
    if (/^(lavender edta|edta lavender top tube|gray top|gray fluoride oxalate|yellow acd b)$/.test(value)) return ['original'];
    if (/aptima/.test(value)) return ['aptima'];
    if (/viral|vcm|utm|transport media/.test(value)) return ['viral'];
    if (/total fix|stool container/.test(value)) return ['stool'];
    if (/sterile (?:urine )?cup/.test(value)) return ['sterile-cup'];
    if (/plastic urine container|24 hour urine/.test(value)) return ['urine-cup'];
    if (/plasma transport/.test(value)) return ['plasma'];
    if (/serum transport|serum .* transport vial/.test(value)) return ['serum'];
    if (/^(?:(?:\d+|two)\s+)?(?:separate\s+)?transport tubes?$/.test(value)) return ['transport'];
    return ['special'];
  }

  // This is a TRANSPORT filter: a sterile source cup alone is not enough.
  // A culture specimen transferred to a gray-top tube is filtered by that tube.
  function usesSterileCup(test) {
    return transportContainerFilterCategories(test).includes('sterile-cup');
  }

  function toggleCatalogFilters(force) {
    const open = typeof force === 'boolean' ? force : els.catalogFilterPanel.classList.contains('hidden');
    els.catalogFilterPanel.classList.toggle('hidden', !open);
    els.catalogFilterButton.setAttribute('aria-expanded', String(open));
  }

  function resetCatalogFilters() {
    els.categoryFilter.value = '';
    els.specimenFilter.value = '';
    els.temperatureFilter.value = '';
    els.transportContainerFilter.value = '';
    els.fastingFilter.value = '';
    els.pediatricFilter.checked = false;
    els.spinFilter.checked = false;
    libraryLimit = PAGE_STEP;
    renderLibrary();
    window.syncPortalSelects?.();
  }

  function libraryFilterCount() {
    return [els.categoryFilter.value, els.specimenFilter.value, els.temperatureFilter.value, els.transportContainerFilter.value, els.fastingFilter.value,
      els.pediatricFilter.checked, els.spinFilter.checked].filter(Boolean).length;
  }

  function matchesLibraryFilters(test) {
    const category = els.categoryFilter.value;
    if (category && !window.LabClinicalCategories?.forTest(test).includes(category)) return false;
    const specimen = els.specimenFilter.value;
    if (specimen && specimenFilterCategory(test.specimenType) !== specimen) return false;
    const temperature = els.temperatureFilter.value;
    if (temperature && transportBagInfo(test).key !== temperature) return false;
    const container = els.transportContainerFilter.value;
    if (container && !(container === 'sterile-cup'
      ? usesSterileCup(test)
      : transportContainerFilterCategories(test).includes(container))) return false;
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

  function clearBrowserAddedTests() {
    const custom = browserAddedTests();
    if (!custom.length) return;
    if (!window.confirm(`Remove ${custom.length} manual ${custom.length === 1 ? 'entry' : 'entries'}? This cannot be undone. Built-in packaged tests and edits to those tests will not be deleted.`)) return;
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

  function renderLibrary() {
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
    if (!raw) return 'This test is not supported by the current onsite collection or processing workflow.';
    const cleaned = raw
      .replace(/^Do not perform onsite\.\s*/i, '')
      .split(/\s+(?:Patient preparation|Collection details|Unacceptable specimens):/i)[0]
      .trim();
    return cleaned || 'This test is not supported by the current onsite collection or processing workflow.';
  }

  function renderBlockedList() {
    if (!els.blockedListButton || !els.blockedListPanel || !els.blockedListBody) return;
    const blocked = database.filter(test => test.status === 'blocked');
    els.blockedListButton.textContent = blockedListOpen ? `Hide do not perform list (${blocked.length})` : `Do not perform list (${blocked.length})`;
    els.blockedListButton.setAttribute('aria-expanded', String(blockedListOpen));
    els.blockedListPanel.classList.toggle('hidden', !blockedListOpen);
    if (!blockedListOpen) return;
    els.blockedListBody.innerHTML = blocked.length ? blocked.map(test => `
      <article class="blocked-list-item">
        <div class="blocked-list-code">${escapeHtml(displayCode(test))}</div>
        <div class="blocked-list-copy"><strong>${escapeHtml(test.testName)}</strong><p>${escapeHtml(blockedReason(test))}</p></div>
        <a class="blocked-list-link" href="${escapeAttr(directoryUrl(test))}" target="_blank" rel="noreferrer">Official directory ↗</a>
      </article>`).join('') : '<div class="empty-state">No tests are currently marked do not perform.</div>';
  }

  function renderLibraryRow(test) {
    const selected = selectedIds.includes(test.id);
    const blocked = test.status === 'blocked';
    return `<tr class="${selected ? 'is-selected' : ''}">
      <td class="code-cell" data-label="Code">${escapeHtml(displayCode(test))}</td>
      <td data-label="Test"><div class="test-name">${escapeHtml(test.testName)}${manualLibraryTag(test)}${statSelectedIds.includes(test.id) && isStatEligible(test) ? '<span class="library-stat-eligible selected" title="Manually marked STAT; verify receiving-lab acceptance and courier routing.">STAT selected</span>' : ''}</div><div class="subtext">${escapeHtml(truncate(test.specialInstructions, 95))}</div></td>
      <td data-label="Container">${menuContainerBadges(test)}<div class="subtext specimen-line">${requiredSpecimenBadges(test)}</div></td>
      <td data-label="Temperature"><span class="badge ${temperatureClass(test.transportTemperature)}">${escapeHtml(test.transportTemperature)}</span></td>
      <td data-label="Volume"><span class="preferred-volume-chip">${escapeHtml(menuVolumeText(test, 'preferred') || 'Verify')}</span><div class="subtext">Minimum: ${escapeHtml(menuVolumeText(test, 'minimum') || '—')}</div></td>
      <td class="row-actions" data-label="Actions">
        ${blocked ? '<span class="badge temp-unknown">Do not perform</span>' : selected
          ? `<button class="mini-button" disabled>✓ Added${statSelectedIds.includes(test.id) ? ' · STAT' : ''}</button>`
          : isStatEligible(test)
            ? `<button type="button" class="mini-button library-routine-action" data-action="add" data-id="${escapeAttr(test.id)}">Add as routine</button><button type="button" class="mini-button library-stat-action" data-action="add-stat" data-id="${escapeAttr(test.id)}" title="Confirm eligibility and add as STAT">Add as STAT</button>`
            : `<button class="mini-button" data-action="add" data-id="${escapeAttr(test.id)}" aria-label="Add ${escapeAttr(test.testName)}">+ Add</button>`}
        <button class="mini-button edit" data-action="edit" data-id="${escapeAttr(test.id)}">Edit</button><a class="mini-button edit" href="${escapeAttr(directoryUrl(test))}" target="_blank" rel="noreferrer">Official directory ↗</a>
      </td>
    </tr>`;
  }

  function handleLibraryClick(event) {
    const button = event.target.closest('button[data-action]');
    if (!button) return;
    if (button.dataset.action === 'new-from-query') {
      openMissingTestFromQuery(button.dataset.query);
      return;
    }
    const id = button.dataset.id;
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

  function handleBatchClick(event) {
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
      if (!test || test.status === 'blocked') return;
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
      if (!test || test.status === 'blocked' || selectedIds.includes(test.id)) return;
      if (wantStat && !isStatEligible(test)) return;
      // The main action retains its ambiguity check. Choosing an alternate
      // candidate or a fuzzy match from the list also requires confirmation.
      const exactSafe = button.dataset.source === 'main'
        ? canAutoAddBatchRow(row)
        : isExactBatchMatch(row.query, test) && test.id === row.matches[0]?.test.id && canAutoAddBatchRow(row);
      if (!exactSafe &&
          !window.confirm(`This entry is not an unambiguous exact match.\n\nYou entered: ${row.query}\nSelected test: ${displayCode(test)} · ${test.testName}\n\nPlease verify the test code and specimen requirements. Add this specific test?`)) return;
      if (wantStat && !confirmStatSelection(test)) return;
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
    return Boolean(test && test.status !== 'blocked' && area &&
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
          const available = test && test.status !== 'blocked';
          const added = available && selectedIds.includes(test.id);
          const button = available
            ? added
              ? `<button type="button" class="stat-menu-add is-added" data-action="stat-menu-remove" data-id="${escapeAttr(test.id)}" aria-label="Remove ${escapeAttr(info.names?.[code] || test.testName)} from cart" title="Remove from cart">✓</button>`
              : `<button type="button" class="stat-menu-add" data-action="stat-menu-add" data-id="${escapeAttr(test.id)}" aria-label="Add ${escapeAttr(info.names?.[code] || test.testName)} as STAT" title="Add as STAT (confirmation required)">+</button>`
            : `<button type="button" class="stat-menu-add needs-setup" data-action="stat-menu-setup" data-code="${escapeAttr(code)}" aria-label="Set up missing test ${escapeAttr(code)}" title="Open Add missing test to enter verified collection requirements">+</button>`;
          return `<div class="stat-menu-test"><strong>${escapeHtml(code)}</strong><span>${escapeHtml(info.names?.[code] || test?.testName || 'Needs verified specimen details')}</span>${test?.status === 'blocked' ? '<small>Not available for onsite collection</small>' : ''}${button}</div>`;
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
    return window.confirm(`Mark ${displayCode(test)} · ${test.testName} as STAT?\n\nReceiving lab: ${STAT_AREAS[statArea].label}\n\nThis code is in the configured regional STAT menu. Confirm current receiving-lab acceptance, cutoff, requisition, and separate STAT courier routing before proceeding.`);
  }

  function toggleStatPriority(id) {
    if (!selectedIds.includes(id)) return;
    const test = database.find(item => item.id === id);
    if (!isStatEligible(test)) return;
    if (!statSelectedIds.includes(id) && !confirmStatSelection(test)) return;
    statSelectedIds = statSelectedIds.includes(id)
      ? statSelectedIds.filter(item => item !== id)
      : [...statSelectedIds, id];
    saveStatSelectedIds();
    renderOrder();
    renderLibrary();
  }

  function addStatFromMenu(id) {
    const test = database.find(item => item.id === id);
    if (!isStatEligible(test)) return;
    if (selectedIds.includes(id)) return;
    // Never add a test or change its routing until the user confirms it.
    if (!confirmStatSelection(test)) return;
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
    if (!test || test.status === 'blocked') return false;
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

  function clearOrder() {
    if (!selectedIds.length) return;
    if (!window.confirm('Clear all selected tests from this summary?')) return;
    selectedIds = [];
    statSelectedIds = [];
    saveStatSelectedIds();
    saveSelected();
    renderOrder();
    renderLibrary();
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
    return selectedIds.map(id => database.find(test => test.id === id)).filter(Boolean)
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
          <div><div class="test-name">${escapeHtml(displayCode(test))} · ${escapeHtml(test.testName)}${manualLibraryTag(test)}</div><div class="subtext specimen-line">${requiredSpecimenBadges(test)} <span>·</span> <span class="preferred-volume-inline">${escapeHtml(combinedVolumeText(test, 'preferred') || 'verify')}</span> <span>· Minimum ${escapeHtml(combinedVolumeText(test, 'minimum') || 'verify')}</span></div>${fastingBadge(test, 'selected-fasting-badge')}</div>
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
          <span class="tests-overview-name">${escapeHtml(test.testName)}</span>
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
  function preCollectionPrecautions(test) {
    const code = ''; // Do not apply Quest-only test-code preparation rules to LabCorp codes.
    const notes = String(test.specialInstructions || '');
    const result = [];
    const add = (label, note) => result.push({ label, note });

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
      if (test.status === 'blocked') alerts.push({ type: 'danger', text: `${test.testName}: marked do not perform.` });
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
    els.blockedStatus.checked = record.status === 'blocked';
    els.addToSummary.checked = options.addToSummary !== false;
    els.addToSummaryRow.classList.toggle('hidden', isExisting);
    els.saveTestButton.textContent = isExisting ? 'Save changes' : 'Save test';
    els.deleteTestButton.classList.toggle('hidden', !isExisting || !record.id.startsWith('custom-'));
    if (els.optionalDetails) els.optionalDetails.open = isExisting;
    els.testDialog.showModal();
    window.syncPortalSelects?.();
    setTimeout(() => (isExisting ? els.testName : els.testCode.value ? els.testName : els.testName.value ? els.testCode : els.testCode).focus(), 0);
  }

  function closeDialog() {
    window.closePortalSelects?.();
    els.testDialog.close();
  }

  function saveTestFromForm(event) {
    event.preventDefault();
    const id = els.testId.value || `custom-${Date.now()}`;
    const existingIndex = database.findIndex(test => test.id === id);
    const record = normalizeRecord({
      id,
      testCode: els.testCode.value,
      testName: els.testName.value,
      addedByInitials: els.addedByInitials.disabled ? (existingIndex >= 0 ? database[existingIndex].addedByInitials : '') : els.addedByInitials.value.trim().toUpperCase(),
      specimenType: els.specimenType.value,
      drawContainer: selectedDrawContainer(),
      alternativeContainer: els.alternativeContainer.value,
      additionalDrawRequirements: existingIndex >= 0 ? database[existingIndex].additionalDrawRequirements : [],
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

  function deleteCustomTest() {
    const id = els.testId.value;
    if (!id.startsWith('custom-')) return;
    const test = database.find(item => item.id === id);
    if (!test || !window.confirm(`Delete the custom entry “${test.testName}”?`)) return;
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
      window.alert('This change is visible now but could not be saved in this browser. Browser storage may be unavailable.');
    }
    els.recordCount.textContent = `${database.length} tests`;
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

  function explicitSstTubeCount(test) {
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

  function requiresDedicatedSst(test) {
    const text = `${test.drawContainer || ''} ${test.transportContainer || ''} ${test.specialInstructions || ''}`.toLowerCase();
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
    return /preferred serum yield requires multi-sst calculation/i.test(String(test.specialInstructions || ''));
  }

  // Local SST planning policy: a recorded minimum of at least 4 mL
  // receives two SST collection tubes. Explicit higher tube counts override
  // this floor. Do not apply to other collection tube types.
  function needsTwoSstForMinimum(test) {
    if (!isSstDraw(test)) return false;
    const minimum = parseVolumeMl(test.minimumVolume);
    return minimum !== null && minimum >= 4 - 1e-8;
  }

  function sstEstimateForTests(tests) {
    let sharedMl = 0;
    let dedicatedTubes = 0;
    let unmeasuredTubes = 0;
    const unmeasuredTests = [];

    tests.filter(isSstDraw).forEach(test => {
      const preferredMl = parseVolumeMl(test.preferredVolume);
      const fallbackMl = preferredMl === null ? parseVolumeMl(test.minimumVolume) : null;
      const plannedMl = preferredMl === null ? fallbackMl : preferredMl;
      const explicitCount = explicitSstTubeCount(test);

      // Minimum >=4 mL plans two SSTs for this test, unless an explicit
      // instruction calls for more. Preferred volume alone does not trigger
      // this two-tube rule. Keep these sources out of the shared serum pool.
      const twoSstMinimum = needsTwoSstForMinimum(test);
      if (requiresDedicatedSst(test) || twoSstMinimum) {
        dedicatedTubes += Math.max(explicitCount, twoSstMinimum ? 2 : 1);
      } else if (plannedMl !== null) {
        sharedMl += needsPreferredSerumYieldSstCount(test) ? plannedMl : Math.min(plannedMl, SST_USABLE_ML_PER_TUBE);
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

    tests.filter(isSstDraw).forEach(test => {
      // Pool using usable serum volumes, as with Gold SST, rather than the
      // 7.5 mL whole-blood draw volume. Preferred takes priority over minimum.
      // Retain Tiger's existing recognition of totals and per-tube volumes;
      // change only the unit to usable serum mL, without blood conversion.
      const serumConversion = { factor: 1 };
      const preferredMl = volumeForRequirement(test, 'preferred', serumConversion);
      const fallbackMl = preferredMl === null ? volumeForRequirement(test, 'minimum', serumConversion) : null;
      const plannedMl = preferredMl === null ? fallbackMl : preferredMl;
      const explicitCount = Math.max(explicitSstTubeCount(test), 1);

      const twoSstMinimum = needsTwoSstForMinimum(test);
      if (requiresDedicatedSst(test) || hasCollectionFillRule(test) || twoSstMinimum) {
        // Respect explicit multi-tube requirements, with the same >=4 mL
        // two-SST minimum policy used for Gold SST.
        dedicatedTubes += Math.max(explicitCount, twoSstMinimum ? 2 : 1);
      } else if (plannedMl !== null) {
        // Preferred volume alone does not increase an individual tube count.
        // The print volume caution asks staff to verify unusual yields.
        sharedMl += needsPreferredSerumYieldSstCount(test) ? plannedMl : Math.min(plannedMl, TIGER_SST_USABLE_ML_PER_TUBE);
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

  function sstTransferDestinationGroups(tests) {
    const groups = new Map();
    tests.filter(isSstDraw).forEach(test => {
      transferDestinationKeysForTest(test).forEach(destinationKey => {
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
      estimate: tigerSstEstimateForTests(group.tests)
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

    // Original-submit SSTs remain pooled separately. For transfers, each
    // destination submission card gets its own SST source pool. That makes the
    // workflow intentionally a little more generous on draw volume, but much
    // easier to process and guarantees that every numbered From pill adds up to
    // the source-for-transfer count shown in What to Collect.
    const originalEstimate = sstEstimateForTests(originalSubmissionTests);
    const transferGroups = sstTransferDestinationGroups(transferSourceTests).map(group => ({
      ...group,
      estimate: sstEstimateForTests(group.tests)
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
    return tubeClass(test.drawContainer) === 'tube-lavender';
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

  function pooledCollectionCapacity(material) {
    return material === 'whole blood'
      ? WHOLE_BLOOD_USABLE_ML_PER_TUBE
      : PROCESSED_SPECIMEN_USABLE_ML_PER_TUBE;
  }

  function requiresDedicatedCollectionTube(test) {
    const text = `${test.drawContainer || ''} ${test.preferredVolume || ''} ${test.minimumVolume || ''} ${test.specialInstructions || ''}`.toLowerCase();
    return /\bdedicated(?:\s+collection)?\s+tube\b|\bown\s+tube\b|\bdo\s+not\s+share\b|\bfull\s+(?:lavender|red(?:-top)?|edta|collection)?\s*tube\b|\b(?:each|individual)\s+(?:lavender|red(?:-top)?|edta|collection)\s+tube\b/.test(text)
      || explicitCollectionCount(test) > 1;
  }

  function pooledTubeEstimateForTests(tests, material) {
    const capacityMl = pooledCollectionCapacity(material);
    let sharedMl = 0;
    let dedicatedTubes = 0;
    let unmeasuredTubes = 0;

    tests.forEach(test => {
      const preferredMl = parseVolumeMl(test.preferredVolume);
      const fallbackMl = preferredMl === null ? parseVolumeMl(test.minimumVolume) : null;
      const plannedMl = preferredMl === null ? fallbackMl : preferredMl;
      const explicitCount = explicitCollectionCount(test);

      // One test never creates multiple draw tubes solely because of its listed
      // volume. Extra tubes are added only for an explicit collection count or
      // a dedicated/full-tube instruction.
      if (requiresDedicatedCollectionTube(test)) {
        dedicatedTubes += Math.max(explicitCount, 1);
      } else if (plannedMl !== null) {
        sharedMl += Math.min(plannedMl, capacityMl);
      } else {
        unmeasuredTubes += 1;
      }
    });

    const sharedTubes = sharedMl > 0 ? Math.ceil(sharedMl / capacityMl) : 0;
    return {
      capacityMl,
      sharedMl,
      sharedTubes,
      dedicatedTubes,
      unmeasuredTubes,
      totalTubes: sharedTubes + dedicatedTubes + unmeasuredTubes
    };
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
    return urineCollectionType(test).key !== 'random-urine'
      && urineCollectionType(test).key !== 'first-morning-urine';
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
    if (isUrineTest(test) && !isTimedUrineTest(test)) {
      return { key: 'sterile-urine-cup', label: 'Sterile cup', className: 'tube-urine-cup' };
    }

    const cls = tubeClass(draw);
    const labels = {
      'tube-culture': 'Blood Culture Bottles',
      'tube-blue': 'Light Blue Citrate',
      'tube-sst': selectedSstLabel(),
      'tube-microtainer': 'Amber Microtainer SST',
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
    const label = labels[cls] || draw;
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
    if (drawMatch && !/\\b(?:ml|g|gram|grams|mg|mm|cm|hours?|hrs?|minutes?|mins?|days?|rcf|rpm)\\b/.test(drawMatch[0])) {
      return Math.max(numberWordValue(drawMatch[1]), 1);
    }

    // Free text is intentionally strict. Only explicit instructions such as
    // “Draw 3 tubes” or “Collect 4 separate EDTA tubes” create extra collection
    // tubes. This prevents phrases like “10 g ... into the container”, “2 hours”,
    // “1600 RCF”, “K2 EDTA”, and “two patient identifiers” from changing counts.
    const actionPattern = new RegExp(`\\b(?:draw|collect|use|requires?|obtain)\\s+(?:blood\\s+(?:in|into)\\s+)?${countPattern}\\s*(?:x|×)?\\s*(?:full\\s+|separate\\s+|standard\\s+){0,2}(?:[a-z][a-z /-]{0,24}\\s+)?(?:tubes?|bottles?|containers?)\\b`);
    const actionMatch = note.match(actionPattern);
    if (actionMatch && !/\\b(?:ml|g|gram|grams|mg|mm|cm|hours?|hrs?|minutes?|mins?|days?|rcf|rpm|identifiers?)\\b/.test(actionMatch[0])) {
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
    return ['tube-blue', 'tube-green', 'tube-pink', 'tube-tan', 'tube-royal', 'tube-royal-edta',
      'tube-royal-no-additive', 'tube-royal-heparin', 'tube-gray', 'tube-yellow'].includes(cls);
  }

  function addAdditionalPooledBloodItems(items, tests, bags) {
    const containerGroups = new Map();
    tests.filter(isAdditionalPoolableBloodDraw).forEach(test => {
      const info = canonicalCollectionContainer(test);
      if (!containerGroups.has(info.key)) containerGroups.set(info.key, { ...info, tests: [] });
      containerGroups.get(info.key).tests.push(test);
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

  function collectionSpecimenBadgeForItem(item) {
    const tests = uniqueTests(item.tests || []);
    const groups = new Set(tests.map(collectionSpecimenGroupForTest));
    if (groups.size !== 1) return '';
    const group = Array.from(groups)[0];
    if (group === 'stool') return 'Stool';
    if (group !== 'urine') return '';
    const labels = Array.from(new Set(tests.map(test => urineCollectionType(test).label).filter(Boolean)));
    if (labels.length === 1) return labels[0];
    return 'Urine';
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

  function printCollectionGroups(items, wholeBloodGroups) {
    const cards = items.map(item => {
      const specimenBadge = collectionSpecimenBadgeForItem(item);
      const specimenGroup = collectionSpecimenGroupForItem(item);
      const tigerBadge = printSstTigerBadge(item);
      const microtainerBadge = item.className === 'tube-microtainer' ? '<span class="microtainer-flag">MICROTAINER</span>' : '';
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
        <div class="print-container-count"><strong>${item.count}</strong><span class="tube ${item.displayClassName || item.className}">${escapeHtml(item.label)}</span>${tigerBadge}${microtainerBadge}${specimenBadge ? `<span class="print-collection-specimen-badge specimen-${specimenGroup}">${escapeHtml(specimenBadge)}</span>` : ''}${printCollectionWholeBloodDetail(item, wholeBloodGroups)}</div>
        ${item.detail ? `<div class="print-container-detail">${escapeHtml(item.detail)}</div>` : ''}
        ${item.className === 'tube-microtainer' ? '<div class="print-microtainer-note">Microcollection tubes · protect from light; follow the test-specific Microtainer instructions.</div>' : ''}
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
    return collectionCards.sort((a, b) => collectionSortRank(a) - collectionSortRank(b));
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
      items.push({ key: 'stool-shared-source-cup', label: 'Sterile cup',
        className: 'tube-urine-cup', count: 1, tests: sharedStoolTests,
        sharedStoolSource: true,
        detail: sharedStoolTests.length > 1
          ? 'Collect stool in one sterile cup, then transfer to each required transport or preservative container. Verify sufficient quantity and transfer timing.'
          : 'Collect stool in a sterile cup; transfer to the required transport or preservative container as needed.' });
    }

    const spotUrineGroups = new Map();
    tests.filter(test => isUrineTest(test) && !isTimedUrineTest(test)).forEach(test => {
      const urineType = urineCollectionType(test);
      const dedicated = requiresSeparateUrineCollection(test);
      const key = dedicated ? `${urineType.key}|separate|${test.sourceTestId || test.id}` : urineType.key;
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
      if (isUrineTest(test) && !isTimedUrineTest(test)) return;
      if (isShareableStoolSourceTest(test)) return;
      const info = canonicalCollectionContainer(test);
      // Keep physically identical containers separate when they hold different specimen types.
      // A Sterile cup, for example, may be used for either urine or stool, but those
      // specimens should never be combined into the same collection card/count.
      const specimenGroup = collectionSpecimenGroupForTest(test);
      const specimenSubtype = specimenGroup === 'urine' ? urineCollectionType(test).key : specimenGroup;
      const urineCup = specimenGroup === 'urine' && info.className === 'tube-urine-cup';
      const separateCup = urineCup && !isShareableUrineCupTest(test);
      const separateStool = specimenGroup === 'stool' && info.className === 'tube-urine-cup';
      const groupKey = `${specimenSubtype}|${info.key}${separateCup || separateStool ? `|separate|${test.sourceTestId || test.id}` : ''}`;
      if (!grouped.has(groupKey)) grouped.set(groupKey, { ...info, key: groupKey, urineSeparateCollection: separateCup, stoolSeparateCollection: separateStool, urineCollectionKey: groupKey, count: 0, tests: [], detail: '' });
      const item = grouped.get(groupKey);
      if (urineCup && !separateCup) item.count = Math.max(item.count, explicitCollectionCount(test));
      else item.count += explicitCollectionCount(test);
      item.tests.push(test);
    });

    grouped.forEach(item => {
      item.tests = uniqueTests(item.tests);
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
      const sameContainerKey = `${specimenSubtype}|${item.className || ''}|${normalizedLabel}${separateKey}`;
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
    if (/^(?:sterile\s+(?:urine\s+|specimen\s+)?cup|urine\s+collection\s+cup)$/i.test(draw)) return 'Sterile cup';

    if (/microtainer/i.test(draw)) return 'Amber Microtainer SST';
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
    if (/gray|grey|fluoride|oxalate/i.test(draw)) return 'Gray Fluoride/Oxalate';
    if (/aptima/i.test(draw)) return 'Aptima Multitest';
    return draw && !/^verify/i.test(draw) ? draw : '';
  }

  function explicitSubmissionCount(test) {
    const structured = Math.floor(Number(test.submissionCount) || 1);
    if (structured > 1) return structured;

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
    return submitMatch ? Math.max(numberWordValue(submitMatch[1]), 1) : 1;
  }

  function titleCaseSpecimen(value) {
    return String(value || 'Specimen').replace(/\b\w/g, char => char.toUpperCase());
  }

  function specificSpecimenSource(test) {
    const stated = String(test.specimenType || '').trim();
    const normalized = normalizeSpecimenType(stated);
    const text = `${test.testName || ''} ${test.preferredVolume || ''} ${test.minimumVolume || ''} ${test.specialInstructions || ''}`.toLowerCase();
    const swabSources = [
      [/nasopharyngeal|\bnp swab\b/, 'Nasopharyngeal swab'],
      [/anterior nasal|nares|nasal swab/, 'Nasal swab'],
      [/throat|pharyn|tonsil/, 'Throat swab'],
      [/vaginal/, 'Vaginal swab'],
      [/endocervical/, 'Endocervical swab'],
      [/cervical swab/, 'Cervical swab'],
      [/urethral/, 'Urethral swab'],
      [/rectal/, 'Rectal swab'],
      [/lesion/, 'Lesion swab'],
      [/wound/, 'Wound swab'],
      [/buccal|cheek/, 'Buccal swab'],
      [/oral swab|mouth swab/, 'Oral swab'],
      [/conjunctival|eye swab/, 'Conjunctival swab']
    ];

    if (/swab/i.test(stated) || /swab/.test(text)) {
      for (const [pattern, label] of swabSources) {
        if (pattern.test(text)) return label;
      }
      if (stated && !/^swab$/i.test(stated)) return titleCaseSpecimen(stated);
      return 'Swab — source must be clarified';
    }

    return titleCaseSpecimen(normalized || stated || 'Specimen');
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

  function transportTubeClass(test, container) {
    const value = String(container || '').toLowerCase();
    const specialty = tubeClass(container);
    if (isFrozenSerumPlasmaTransport(test, container)) return 'tube-frozen-purple';
    if (/^tube-(?:qft-|eswab|utm|frozen-purple|op-|stool-clean)/.test(specialty)) return specialty;
    const specimen = normalizeSpecimenType(test.specimenType).toLowerCase();
    const specimenAndContainer = `${specimen} ${value}`;
    const isStandardSerumOrPlasma = /\b(?:serum|plasma)\b/.test(specimenAndContainer);
    const isSpecialtyMetalContainer = /acid[- ]?washed|acid[- ]?rinsed|metal[- ]?free|trace[- ]?metal/.test(value);

    if (/uri[- ]?sponge/.test(value)) return 'tube-urisponge';
    if (/aptima/.test(value)) return 'tube-aptima';
    if (/amber|protect from light|light[- ]?protected/.test(value)) return 'tube-amber';

    // Specialty acid-washed/metal-free tubes must stay neutral, regardless of specimen type.
    if (isSpecialtyMetalContainer) return 'tube-transport';

    if (/transport tube|aliquot|cryovial|screw[- ]?cap|pour[- ]?off/.test(value)) {
      // Serum, plasma, and platelet-poor plasma use the green-top transport badge.
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
    const notes = String(test.specialInstructions || '').toLowerCase();
    return /\b(?:dedicated|individual|separate|own|additional)\s+(?:(?:serum|plasma|specimen|sample)\s+)?(?:transport\s+)?(?:tube|vial|aliquot|cryovial|container)\b/.test(transport)
      || /\b(?:dedicated|individual|separate|own|additional)\s+(?:(?:serum|plasma|specimen|sample)\s+)?(?:transport\s+)?(?:tube|vial|aliquot|cryovial|container)\s+(?:required|needed)\b/.test(notes)
      || /\b(?:submit|provide|prepare|transfer|use|requires?)\s+(?:a[n]?\s+)?(?:dedicated|individual|separate|own|additional|second)\s+(?:(?:serum|plasma|specimen|sample)\s+)?(?:transport\s+)?(?:tube|vial|aliquot|cryovial|container)\b/.test(notes)
      || /\b(?:do not|don't|must not|cannot)\s+(?:pool|combine|share|mix)\b/.test(notes)
      || /\b(?:each|every)\s+(?:test|assay)\s+(?:requires?|needs?)\s+(?:its\s+)?(?:own|separate|dedicated)\b/.test(notes);
  }

  function isShareableSerumPlasmaTransport(test, container) {
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

  function submissionTransportGroupingKey(test, transport) {
    const raw = normalizeSearch(transport)
      .replace(/^\d+\s*(?:x|×)?\s*(?:separate\s+)?/, '')
      .replace(/\s+/g, ' ')
      .trim();
    const specimen = normalizeSpecimenType(test.specimenType).toLowerCase();
    const specialContainer = /acid[- ]?washed|acid[- ]?rinsed|metal[- ]?free|trace[- ]?metal|amber|protect from light|light[- ]?protected|aptima|preservative|cryovial|glass|royal blue|trace element/.test(raw);
    const genericTransport = /^(?:(?:serum|plasma)\s+)?(?:plastic\s+)?transport\s+tubes?$/.test(raw);

    // Normalize only ordinary generic serum/plasma transport tubes. Specialty
    // containers (acid-washed, metal-free, amber, cryovial, etc.) retain their
    // exact container identity and can never merge into the standard green-top group.
    if (!specialContainer && /^(?:serum|plasma)$/.test(specimen) && genericTransport) {
      const standardKey = `standard-${specimen}-transport`;
      // Explicit separate aliquots keep their own card, even if only one
      // dedicated transport tube is requested.
      const processing = normalizeSearch(String(test.spin || '').trim());
      const sharingKey = `${standardKey}|spin-${processing || 'verify'}`;
      return requiresSeparateTransportAliquot(test)
        ? `${sharingKey}|dedicated-${normalizeSearch(String(test.sourceTestId || test.id || displayCode(test)))}`
        : sharingKey;
    }

    return raw;
  }

  function isOriginalContainerSubmission(test) {
    const draw = String(test.drawContainer || '').trim();
    const transport = finalTransportContainer(test);
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

    const explicitOriginal = /no transfer|original tube|same tube|primary tube|do not open|unopened|submit (?:the )?(?:spun )?(?:original|collection|primary) tube|leave .* in (?:the )?original tube/.test(combined);
    const matchingTube = Boolean(drawClass && transportClass && drawClass === transportClass)
      && !/transport tube|aliquot|cryovial|screw[- ]?cap|pour[- ]?off/.test(combined);
    return explicitOriginal || matchingTube;
  }

  function originalContainerSubmission(test) {
    const draw = String(test.drawContainer || 'Original collection container').trim();
    const sourceSpecimen = specificSpecimenSource(test);
    const isAptima70049 = String(test.testCode || '').trim() === '70049';
    const label = isAptima70049 ? 'Aptima' : draw;
    const directUrineCup = isUrineTest(test) && cleanCollectionContainer(draw) === 'Sterile cup' &&
      cleanCollectionContainer(finalTransportContainer(test)) === 'Sterile cup';
    const shareUrineCup = directUrineCup && isShareableUrineCupTest(test) &&
      explicitSubmissionCount(test) === 1;
    const processing = isAptima70049
      ? `${sourceSpecimen} · Submit as Aptima`
      : directUrineCup ? 'Submit in original sterile cup; no transfer'
      : (String(test.spin || '').toLowerCase() === 'yes' ? 'Process as directed; submit in original tube' : 'Submit in original tube');
    return {
      key: directUrineCup
        ? `original-urine-cup|${urineCollectionType(test).key}|${shareUrineCup ? 'shared' : String(test.sourceTestId || test.id || test.testCode)}`
        : `original|${normalizeSearch(label)}|${normalizeSearch(sourceSpecimen)}`,
      label,
      className: tubeClass(draw) || (/\bswab\b/i.test(test.specimenType) ? 'tube-transport' : ''),
      shareableOriginalUrineCup: shareUrineCup,
      // Every original collection tube must travel as an original submission.
      // If two distinct whole-blood tubes are drawn, they cannot be compressed
      // into a single original tube in the bag plan (e.g. 38287).
      count: Math.max(explicitSubmissionCount(test), explicitCollectionCount(test)),
      detail: isAptima70049 ? processing : `${sourceSpecimen} · ${processing}`,
      originalTube: true
    };
  }

  function splitSubmissionContainers(test) {
    // LabCorp O&P (008623) and Giardia + O&P (188110) require TWO DIFFERENT
    // preservative vials, pink formalin and gray PVA. Never treat them as one.
    if (['008623', '188110'].includes(String(test.testCode || '').trim())) {
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
          className: 'tube-transport', count: 1, detail: 'Separated plasma in acid-washed metal-free tube · refrigerate' },
        { key: '081162-metal-free-rbcs', label: 'Metal-Free Packed RBC Transport Tube',
          className: 'tube-transport', count: 1, detail: 'Packed RBCs in a DIFFERENT acid-washed metal-free tube · refrigerate' }
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
        { key: 'vitamin-profile-amber-' + code, label: 'Amber Serum Transport Tube (Beta-Carotene)',
          className: 'tube-amber', count: 1,
          detail: 'Separate serum aliquot · protect from light · room temperature' }
      ];
    }
    const combined = `${transport} ${test.specialInstructions || ''}`.toLowerCase();
    if (String(test.testCode || '') === '3020' || (/red\s*\/\s*yellow|red-yellow|swirl/.test(combined) && /gray|grey|urisponge/.test(combined) && /urine|culture/.test(combined))) {
      return [
        { key: 'ua-swirl', label: 'Red/Yellow Swirl UA Preservative Tube', className: 'tube-ua-swirl', count: 1, detail: 'Urine in preservative tube' },
        selectedUrineCultureIsSponge() && isCultureTransportEligible(test)
          ? { key: 'urine-culture-urisponge', label: 'UriSponge Urine Culture Transport', className: 'tube-urisponge', count: 1, detail: 'Saturated UriSponge from sterile cup · do not pour urine into tube' }
          : { key: 'urine-culture', label: 'Gray-Top Urine Culture Preservative Tube', className: 'tube-urine-culture', count: 1, detail: 'Urine in culture preservative tube' }
      ];
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
        label: `Amber ${specimen} Transport Tube — Protect From Light`,
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
        key: `frozen-transport|${normalizeSearch(sourcePhrase)}|frozen-transport-tube|${normalizeSearch(String(test.sourceTestId || test.id || test.testCode))}`,
        label: frozenTransportLabel(test, transport),
        className: 'tube-frozen-purple',
        count: explicitSubmissionCount(test),
        detail: sourcePhrase + ' · Freeze separate aliquot'
      }];
    }

    if (/transport tube|aliquot|cryovial|screw[- ]?cap|pour[- ]?off/i.test(transport)) {
      const sourcePhrase = specimenSourceDetail(test);
      const isSwab = /swab/i.test(sourceSpecimen);
      const isSpecialtyMetalContainer = /acid[- ]?washed|acid[- ]?rinsed|metal[- ]?free|trace[- ]?metal/i.test(transport);
      const label = isSwab
        ? 'Swab Transport Tube'
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
    const spunSstTests = bag.tests.filter(isSpunSstSubmission);
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
        if (container.shareableOriginalUrineCup) item.count = Math.max(item.count, container.count);
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
    if (sstTransferTests.length && bag.sstEstimate.transferSourceTubes > 0) {
      const transportCount = transferContainerCountForTests(sstTransferTests);
      const sourceCount = bag.sstEstimate.transferSourceTubes;
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
    if (lowerSpecimen === 'serum' && (isSstDraw(test) || tubeClass(test.drawContainer) === 'tube-microtainer')
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

  function printLabelingNotes(item) {
    const grouped = new Map();
    uniqueTests(item.tests).forEach(test => {
      const is24Hour = is24HourUrineTest(test);
      const derived = derivedSpecimenSourceLabel(test, item);
      let explicit = String(test.specialLabeling || '').trim();
      // A basic patient ID is already part of routine specimen identification.
      // "Submit only for ..." is a processing restriction, not label wording;
      // the HIV-specific restrictions remain in the test's handling field.
      if (item.originalTube && /patient identifier; submit only for hiv testing/i.test(explicit)) explicit = '';
      // RBCs are already in the named original collection tube; a source-only
      // instruction adds nothing to that primary tube's label.
      if (item.originalTube && /^rbcs? from /i.test(explicit)) explicit = '';
      const parts = [];
      // For 24-hour urine transfers, "24h urine" already identifies the specimen.
      // Do not prepend a redundant generic "Urine" label.
      // If the lab explicitly requires a specific serum source on the label,
      // show the exact directive instead of prefixing it with generic "Serum".
      const explicitSerumSource = derived === 'Serum'
        && /\bserum\s+from\s+(?:spun\s+)?(?:gold|sst|tiger|red(?:-top)?)/i.test(explicit);
      if (derived && !(is24Hour && /^urine$/i.test(derived.trim())) && !explicitSerumSource) parts.push(derived);
      // Amber transport tubes should always carry a visible specimen-type label,
      // including ordinary serum transfers where the standard SST source would
      // otherwise suppress a redundant derived label.
      if (item.className === 'tube-amber' && !derived) {
        const amberSpecimen = titleCaseSpecimen(normalizeSpecimenType(test.specimenType));
        if (amberSpecimen) parts.push(amberSpecimen);
      }
      if (is24Hour) parts.push('24h urine · Total volume: ____ mL · Start: ____ · End: ____');
      const explicitIsRedundant24hUrine = is24Hour && /^urine$/i.test(explicit.trim());
      if (!explicitIsRedundant24hUrine && explicitLabelAddsInformation(explicit, derived)) parts.push(explicit);
      // Deduplicate equivalent labels from the same test before comparing across
      // tests. Preserve instructions that add a distinct labeling requirement.
      const uniqueParts = [];
      const seenParts = new Set();
      parts.forEach(part => {
        const key = normalizedLabelComparison(part);
        if (key && !seenParts.has(key)) { seenParts.add(key); uniqueParts.push(part); }
      });
      const note = uniqueParts.join(' · ');
      if (!note) return;
      // Equal labels from different tests need only one LABEL line. Keep all
      // contributing codes together, including tests with different naming.
      const groupKey = note.toLowerCase()
        .replace(/\b(?:sst\s*\/\s*gold|gold\s*\/\s*sst)\b/g, 'gold/sst')
        .replace(/\s+/g, ' ').trim();
      if (!grouped.has(groupKey)) grouped.set(groupKey, { note, codes: [] });
      grouped.get(groupKey).codes.push(displayCode(test));
    });
    if (!grouped.size) return '';
    return `<div class="print-label-notes">${Array.from(grouped.values()).map(({ note, codes }) => `<div class="print-label-note"><span>Label</span><div>${escapeHtml(note)} <small>${escapeHtml([...new Set(codes)].join(', '))}</small></div></div>`).join('')}</div>`;
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

  function submissionSourceGroupsForItem(item) {
    const badges = new Map();
    if (!item || item.originalTube) return badges;
    uniqueTests(item.tests || []).forEach(test => {
      if (!isTransferSubmission(test)) return;
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
        if (!isBloodTransferSourceGroup(group.tests)) return;
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
      if (/\brbcs?\b|red blood cells/.test(specimen)) return ['RBCs', 'rbc'];
      if (/\bwhole blood\b/.test(specimen)) return ['Whole Blood', 'blood'];
      if (/\bblood\b/.test(specimen)) return ['Blood', 'blood'];
      if (/\bswab\b/.test(specimen)) return ['Swab', 'swab'];
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
      const sourceCount = hasOverride ? item.sourceCountOverrides.get(key) : transferSourceTubeCountForItemTests(tests, source);
      const showSourceCount = source.className !== 'tube-urine-cup';
      const countBadge = showSourceCount && sourceCount > 0 ? `<span class="print-source-count">${sourceCount}</span>` : '';
      const displayClass = source.className === 'tube-sst' ? selectedSstVisualClass() : source.className;
      // Keep the number, icon, and entire "From ..." source inside the original pill.
      // Only the separate "· Spin" processing cue belongs outside the pill.
      const spun = uniqueTests(tests).length > 0 && uniqueTests(tests).every(test => {
        const specimen = normalizeSpecimenType(test.specimenType).toLowerCase();
        return /^(?:serum|plasma|platelet[- ]poor plasma|rbcs?|red blood cells)$/.test(specimen)
          && /^yes$/i.test(String(test.spin || '').trim());
      });
      const sourceLabel = source.label;
      const specimen = printTransferSpecimenType(tests);
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
    const categories = (item.tests || []).map(test => {
      const specimen = normalizeSpecimenType(test.specimenType).toLowerCase().trim();
      if (/\b(?:stool|feces|fecal|faeces|faecal)\b/.test(specimen)) return ['Stool', 'stool'];
      if (/\burine\b/.test(specimen)) return ['Urine', 'urine'];
      if (/\b(?:platelet[- ]poor )?plasma\b/.test(specimen)) return [specimen.includes('platelet') ? 'Platelet-Poor Plasma' : 'Plasma', 'plasma'];
      if (/\bserum\b/.test(specimen)) return ['Serum', 'serum'];
      if (/\brbcs?\b|red blood cells/.test(specimen)) return ['RBCs', 'rbc'];
      if (/\bwhole blood\b/.test(specimen)) return ['Whole Blood', 'blood'];
      if (/\b(?:blood)\b/.test(specimen)) return ['Blood', 'blood'];
      if (/\bswab\b/.test(specimen)) return ['Swab', 'swab'];
      if (/\b(?:csf|cerebrospinal)\b/.test(specimen)) return ['CSF', 'other'];
      if (/\bsaliva\b/.test(specimen)) return ['Saliva', 'other'];
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
      const critical = /fully saturate|do not pour|\b\d+\s*seconds?\b/i.test(detail) ? detail : '';
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
      const isMicrotainerSst = item.className === 'tube-microtainer';
      const spins = /\bspun\b|\bcentrifug/i.test(detail)
        || (isMicrotainerSst && uniqueTests(item.tests || []).every(test => /^yes$/i.test(String(test.spin || '').trim())));
      const exceptional = /fully saturate|do not pour|protect from light/i.test(detail) ? detail : '';
      const handling = isSpunSst
        ? 'Submit in original tube · Spin ✓'
        : `Submit in original tube${spins ? ' · Spin ✓' : ''}`;
      const lightProtection = isMicrotainerSst ? ' · Protect from light' : '';
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
      if (source.className === 'tube-microtainer') return;
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
      const count = Math.max(explicitCollectionCount(test), 1);
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
    let displayValue = explicitOriginalOption ? `${displayedTube} (original tube)` : value || 'Verify';

    if (isSstTransport) {
      const keepSpun = /\bspun\b/i.test(value) || isSpunSstSubmission(test) || isOriginalContainerSubmission(test);
      displayValue = `${selectedSstTransportLabel()}${keepSpun ? ' (spun)' : ''}`;
    }

    // In the print table's Transport Tube column only, keep the Tiger label compact.
    // The Draw Container column and collection plan still show the 7.5 mL capacity.
    if (selectedSstIsTiger() && isSstDraw(test) && sourceText) {
      sourceText = sourceText.replace(/Tiger SST\s*·\s*7\.5\s*mL/gi, 'Tiger SST');
    }

    return `<span class="print-tube-badge tube ${displayClass}">${escapeHtml(displayValue)}</span>${sourceText ? `<div class="print-transport-source">${escapeHtml(sourceText)}${sourceBadge}</div>` : ''}`;
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
    if (!groups.has(process)) groups.set(process, []);
    groups.get(process).push(item);
  });
  const replacements = new Map();
  groups.forEach(parts => {
    if (parts.length < 2) return;
    const first = parts[0], overrides = new Map();
    parts.forEach(part => {
      if (!part.sourceCountOverrides || typeof part.sourceCountOverrides.forEach !== 'function') return;
      part.sourceCountOverrides.forEach((count, key) =>
        overrides.set(key, (overrides.get(key) || 0) + count));
    });
    const dedicated = parts.filter(part => String(part.key).includes('|dedicated-'));
    const regularCount = parts.filter(part => !String(part.key).includes('|dedicated-'))
      .reduce((sum, part) => sum + part.count, 0);
    const dedicatedNotes = dedicated.map(part =>
      String(part.count) + ' for ' + uniqueTests(part.tests).map(displayCode).join(', '));
    replacements.set(first, {
      ...first,
      count: parts.reduce((sum, part) => sum + part.count, 0),
      tests: uniqueTests(parts.flatMap(part => part.tests || [])),
      sourceCountOverrides: overrides.size ? overrides : first.sourceCountOverrides,
      printAllocationNote: dedicatedNotes.length
        ? 'Keep separate: ' + dedicatedNotes.join(' · ')
          + (regularCount ? ' · ' + regularCount + ' for other tests' : '')
        : ''
    });
    parts.slice(1).forEach(part => replacements.set(part, null));
  });
  return contents.flatMap(item => replacements.has(item)
    ? (replacements.get(item) ? [replacements.get(item)] : []) : [item]);
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
      return { bag, contents: printSstSerumTransportGroupContents(contents), totalContainers };
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
          const specimenGroup = collectionSpecimenGroupForItem(item);
          const specimenTag = item.className === 'tube-urine-cup' && (specimenGroup === 'urine' || specimenGroup === 'stool')
            ? `<span class="print-collect-chip-specimen specimen-${specimenGroup}">${escapeHtml(specimenGroup === 'stool' ? 'Stool' : 'Urine')}</span>`
            : '';
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
              <div class="print-submit-item-title"><strong>${item.count}</strong><span class="tube ${item.displayClassName || item.className}"><span class="print-submit-container-name">${escapeHtml(item.originalTube && item.key === 'sst-spun' ? (selectedSstIsTiger() ? 'Tiger SST (Spun)' : 'Gold SST (Spun)') : item.label)}</span></span>${printSstTigerBadge(item)}${printBagSpecimenBadge(item)}</div>
              ${printSubmissionItemDetail(item)}
              ${printLabelingNotes(item)}
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
    let path = menuContainerBadges(test)
      .replaceAll('class="badge tube ', 'class="print-tube-badge tube ')
      .replace(/(<span class="container-path-arrow"[^>]*>)→(<\/span>)/g, '$1↓$2');
    const labels = [normalizeSpecimenType(test.specimenType),
      ...additionalDrawRequirements(test).map(req => normalizeSpecimenType(req.specimenType))]
      .filter(Boolean);
    const badges = Array.from(new Set(labels)).map(label => {
      const group = /\burine\b/i.test(label) ? 'specimen-urine'
        : /\bstool\b/i.test(label) ? 'specimen-stool'
        : /\bswab\b/i.test(label) ? 'specimen-swab' : '';
      return `<span class="specimen-badge ${specimenClass(label)} ${group} print-specimen-badge">${escapeHtml(label)}</span>`;
    }).join(' ');
    const spinValue = String(test.spin || '').trim();
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
    const extraRequirements = additionalRequirementSummary(test, true);
    return `<div class="print-detail-handling-text">${escapeHtml(notes)}</div>${altNote}${extraRequirements}`;
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

  function printSummary() {
    const tests = selectedTests();
    if (!tests.length) return showToast('Add at least one test before printing.');
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
      ${tests.some(isManuallyAddedTest) ? '<div class="print-manual-test-notice"><strong>Manual entry:</strong> Confirm the test code, specimen, collection tubes, and submission requirements in the official lab directory before collecting.</div>' : ''}
      ${printCollectionSubmissionPlan(tests)}
      <section class="print-detail-table-section${tests.length <= 3 ? ' print-brief-order' : ''}">
      ${printCompactAlertSummary(tests, alerts)}
      <table class="print-table">
        <colgroup><col style="width:6%"><col style="width:15%"><col style="width:14%"><col style="width:8%"><col style="width:8%"><col style="width:6%"><col style="width:43%"></colgroup>
        <thead><tr class="print-detail-title-row"><th colspan="7" class="print-detail-title-cell"><div class="print-detail-lab-heading"><strong>Test details</strong><span class="print-detail-lab-badge">LABCORP</span></div></th></tr><tr><th>Code</th><th>Test</th><th>Container / specimen</th><th>Temperature</th><th>Volume</th><th>Stability</th><th>Notes</th></tr></thead>
        <tbody>${tests.map(test => `<tr><td>${escapeHtml(displayCode(test))}</td><td><div class="print-test-name-stack${test.testName.length > 48 ? ' print-long-test-name' : ''}"><strong>${escapeHtml(test.testName)}</strong>${test.isStat ? '<span class="print-priority-tag">STAT</span>' : ''}${printFastingBadge(test, 'print-test-fasting-badge')}${printManualTestNote(test)}</div></td><td>${printDetailContainerPath(test)}</td><td><span class="print-temp-badge ${temperatureClass(test.transportTemperature)}">${escapeHtml(test.transportTemperature)}</span></td><td><span class="print-preferred-volume">${escapeHtml(printDetailVolumeText(test, 'preferred') || 'Verify')}</span><br><span class="print-minimum-volume">Minimum: ${escapeHtml(printDetailVolumeText(test, 'minimum') || '—')}</span></td><td><span class="print-stability-period">${escapeHtml(printStabilityForTemperature(test))}</span></td><td>${printDetailHandling(test)}</td></tr>`).join('')}</tbody>
      </table>
      </section>
      ${printNotesFooter()}
`;
    // Keep the same two-column card layout. On a phone, fit the print sheet
    // inside the page instead of forcing its 10-inch landscape width onto a
    // portrait page (which can clip the right-hand borders).
    const mobilePrint = window.matchMedia('(max-width: 720px)').matches;
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
      ? `<span class="print-manual-verification">Manual entry · Added by ${escapeHtml(manualEntryOwner(test))} · Confirm in official directory</span>`
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
    const value = String(container || '').toLowerCase();
    // Special LabCorp tube and vial badges reflect the actual kit cap/medium.
    if (/quanti[- ]?feron/.test(value)) {
      if (/\bnil\b/.test(value)) return 'tube-qft-nil';
      if (/\btb\s*1\b/.test(value)) return 'tube-qft-tb1';
      if (/\btb\s*2\b/.test(value)) return 'tube-qft-tb2';
      if (/\bmitogen\b/.test(value)) return 'tube-qft-mitogen';
    }
    if (/e[- ]?swab|\bliquid\s+amies\b|\bamies\s+liquid\b/.test(value)) return 'tube-eswab';
    if (/\butm\b|\bvtm\b|universal transport medium|viral transport medium/.test(value)) return 'tube-utm';
    if (/purple\s+pp|pp\s+transpak|(?:dedicated\s+)?frozen\s+(?:(?:serum|plasma|platelet[- ]poor plasma)\s+)?transport\s+tube|frozen\s+transpak/.test(value)) return 'tube-frozen-purple';
    if (/pink.*formalin|formalin.*o\s*&\s*p/.test(value)) return 'tube-op-formalin';
    if (/gray\s+pva|grey\s+pva|pva\s+o\s*&\s*p/.test(value)) return 'tube-op-pva';
    if (/para[- ]?pak.*clean|sterile\s+screw[- ]?cap\s+stool|stool.*screw[- ]?cap/.test(value)) return 'tube-stool-clean';
    // Para-Pak C&S orange vial has a red Cary-Blair medium, not a gray cap.
    if (/cary[- ]?blair|para[- ]?pak\s+c\s*&\s*s\s+orange/.test(value)) return 'tube-cary-blair';
    if (/microtainer/.test(value)) return 'tube-microtainer';
    if (/uri[- ]?sponge/.test(value)) return 'tube-urisponge';
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
    const normalized = String(value || '').trim();
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
    const supplied = String(value || '').trim();
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
    const option = Array.from(select.options).find(item => item.value === value);
    select.value = option ? value : fallback;
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
})();
