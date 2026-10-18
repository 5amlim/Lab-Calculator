(() => {
  'use strict';

  // Built-in catalog records live in data.js. Browser storage is reserved for
  // user-created tests and edits only, so catalog growth cannot exhaust localStorage.
  const USER_DATA_KEY = 'labCollectionCalculator.userData.v1';
  const LEGACY_STORAGE_PREFIX = ['que', 'stLabCalculator'].join('');
  const LEGACY_FULL_DB_KEYS = [
    'labCollectionCalculator.database.v28',
    'labCollectionCalculator.database.v27', 'labCollectionCalculator.database.v26',
    'labCollectionCalculator.database.v25', 'labCollectionCalculator.database.v24',
    'labCollectionCalculator.database.v23', 'labCollectionCalculator.database.v22',
    'labCollectionCalculator.database.v21', 'labCollectionCalculator.database.v20',
    'labCollectionCalculator.database.v19', 'labCollectionCalculator.database.v18',
    'labCollectionCalculator.database.v17', 'labCollectionCalculator.database.v16',
    'labCollectionCalculator.database.v15', 'labCollectionCalculator.database.v14',
    'labCollectionCalculator.database.v13', 'labCollectionCalculator.database.v12',
    'labCollectionCalculator.database.v11',
    ...[9, 8, 7, 6, 5, 4, 3, 2, 1].map(version => `${LEGACY_STORAGE_PREFIX}.database.v${version}`)
  ];
  const RETIRED_TEST_CODES = new Set(['91001']);
  // IDs retired when Quest 15447 / 90567 duplicate records were corrected.
  const CONSOLIDATED_TEST_IDS = { 'seed-103': 'seed-71', 'seed-157': 'seed-158' };
  const SELECTED_KEY = 'labCollectionCalculator.selected.v1';
  const SST_MODE_KEY = 'labCollectionCalculator.sstMode.v1';
  const URINE_CULTURE_MODE_KEY = 'labCollectionCalculator.urineCultureTransport.v1';
  const STAT_SELECTED_KEY = 'labCollectionCalculator.statSelected.v1';
  const DEFAULT_STAT_MIGRATION_KEY = 'labCollectionCalculator.defaultStat.v11.12';
  // Only canonicalize these legacy names after checking Quest's directory.
  // STAT designation is a separate order-priority choice, not part of the assay name.
  // 34162 uses the existing catalog mapping with the legacy STAT suffix removed;
  // its currently accessible Quest directory page could not be reverified.
  const VERIFIED_TEST_NAMES = Object.freeze({
    '809': 'Sed Rate by Modified Westergren',
    '4914': 'Prothrombin with INR and Partial Thromboplastin Times',
    '8847': 'Prothrombin Time with INR',
    '6631': 'Bilirubin, Total and Direct, Neonatal',
    '20381': 'Bilirubin, Total, Neonatal',
    '34162': 'Bilirubin, Direct, Neonatal'
  });
  // STAT availability is account/laboratory/service-area specific. Do NOT apply a
  // published menu from one Quest facility to another area. Source documentation:
  // https://www.questdiagnostics.com/content/dam/corporate/restricted/documents/test-directory/Specimen_Collection_and_Transport_Guide_2019.pdf
  // https://www.questdiagnostics.com/content/dam/corporate/restricted/images/medical-groups-lpg-phase-2/bayview/Short-Pump-RRL_STAT-Testing.pdf
  const STAT_AREA_KEY = 'labCollectionCalculator.questStatArea.v1';
  const STAT_AREAS = Object.freeze({
    unselected: { label: 'Area not selected', codes: [], note: 'Choose the receiving Quest service area before assigning STAT.' },
    socal: { label: 'Southern California', codes: ['809'], note: 'Sed rate is a clinic-requested default, not independently confirmed on a SoCal Quest STAT menu.' },
    norcal: { label: 'Northern California', codes: [], note: 'No account-specific Quest STAT menu verified for this area.' },
    ny: { label: 'New York', codes: [], note: 'No account-specific Quest STAT menu verified for this area.' },
    fl: { label: 'Florida', codes: [], note: 'No account-specific Quest STAT menu verified for this area.' },
    va_short_pump: { label: 'Virginia · Short Pump RRL only',
      codes: ['223','234','823','243','822','10165','285','6631','287','296','303','330','334','10231','375','34392','482','483','608','10256','593','606','7600','622','718','733','754','10314','836','859','861','867','866','896','899','294','905','4021','470','396','8396','8435','615','745','746','1759','6399','509','510','7998','8847','763','793','809','6448','5463','3020','7909','7048','37386','8659','654','11177','8467'],
      note: 'Quest published Short Pump RRL menu (updated July 24, 2025); only this specific Virginia lab, subject to hours and current acceptance.' }
  });
  const DEFAULT_STAT_TEST_CODES = new Set(['809']);
  const LEGACY_SELECTED_KEYS = [`${LEGACY_STORAGE_PREFIX}.selected.v1`];
  const PAGE_STEP = 30;
  const SST_USABLE_ML_PER_TUBE = 2;
  const PROCESSED_SPECIMEN_USABLE_ML_PER_TUBE = 2;
  const WHOLE_BLOOD_USABLE_ML_PER_TUBE = 4;
  const SERUM_PLASMA_TO_WHOLE_BLOOD_FACTOR = 2.5;
  const TIGER_SST_CAPACITY_ML = 7.5;
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
    libraryFilter: $('libraryFilter'), specimenFilter: $('specimenFilter'),
    libraryBody: $('libraryBody'), libraryStatus: $('libraryStatus'), loadMoreButton: $('loadMoreButton'), loadMoreInlineButton: $('loadMoreInlineButton'),
    blockedListButton: $('blockedListButton'), blockedListPanel: $('blockedListPanel'), blockedListBody: $('blockedListBody'),
    addTestButton: $('addTestButton'), addSelectedTestButton: $('addSelectedTestButton'), testsDetailsButton: $('testsDetailsButton'), testsDetailsPanel: $('testsDetailsPanel'),
    selectedCount: $('selectedCount'), selectedList: $('selectedList'), testsOverviewList: $('testsOverviewList'), testsOverviewSummary: $('testsOverviewSummary'),
    drawPlan: $('drawPlan'), drawPlanSummary: $('drawPlanSummary'), orderOfDraw: $('orderOfDraw'), orderOfDrawSummary: $('orderOfDrawSummary'), collectionAlerts: $('collectionAlerts'), clearOrderButton: $('clearOrderButton'),
    printButton: $('printButton'), exportSummaryButton: $('exportSummaryButton'),
    statAreaSelect: $('statAreaSelect'), statAreaHelp: $('statAreaHelp'),
    sstModeOptions: Array.from(document.querySelectorAll('[data-sst-mode]')),
    urineCultureControl: $('urineCultureModeControl'), urineCultureModeOptions: Array.from(document.querySelectorAll('[data-urine-culture-mode]')),
    printSheet: $('printSheet'), testDialog: $('testDialog'), testForm: $('testForm'), dialogTitle: $('dialogTitle'),
    closeDialogButton: $('closeDialogButton'), cancelDialogButton: $('cancelDialogButton'), deleteTestButton: $('deleteTestButton'),
    saveTestButton: $('saveTestButton'), testId: $('testId'), testCode: $('testCode'), testName: $('testName'), specimenType: $('specimenType'),
    drawContainer: $('drawContainer'), customDrawContainer: $('customDrawContainer'), customDrawContainerRow: $('customDrawContainerRow'), alternativeContainer: $('alternativeContainer'), transportContainer: $('transportContainer'), customTransportContainer: $('customTransportContainer'), customTransportContainerRow: $('customTransportContainerRow'),
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
  let statSelectedIds = loadStatSelectedIds();
  let statAreaResetNotice = '';
  applyDefaultStatMigration();
  reconcileStatWithArea();
  let sstTubeMode = loadSstTubeMode();
  let urineCultureMode = loadUrineCultureMode();
  finalizeStorageMigration();
  let batchReviewRows = [];
  let libraryLimit = PAGE_STEP;
  let blockedListOpen = false;
  let toastTimer;

  init();

  function init() {
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
    els.specimenFilter.addEventListener('change', () => { libraryLimit = PAGE_STEP; renderLibrary(); });
    els.loadMoreButton.addEventListener('click', () => { libraryLimit += PAGE_STEP; renderLibrary(); });
    els.blockedListButton?.addEventListener('click', () => { blockedListOpen = !blockedListOpen; renderBlockedList(); });
    els.loadMoreInlineButton?.addEventListener('click', () => { libraryLimit += PAGE_STEP; renderLibrary(); });
    els.libraryBody.addEventListener('click', handleLibraryClick);
    els.batchResults.addEventListener('click', handleBatchClick);
    els.batchResults.addEventListener('change', handleBatchChoiceChange);
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
    els.urineCultureModeOptions.forEach(button => button.addEventListener('click', () => setUrineCultureMode(button.dataset.urineCultureMode)));
    els.closeDialogButton.addEventListener('click', closeDialog);
    els.cancelDialogButton.addEventListener('click', closeDialog);
    els.testForm.addEventListener('submit', saveTestFromForm);
    els.deleteTestButton.addEventListener('click', deleteCustomTest);
    els.openDirectoryFromDialogButton.addEventListener('click', openDirectoryFromDialog);
    els.drawContainer.addEventListener('change', () => { toggleCustomDrawContainer(); updateSstSpinRequirement(); });
    els.customDrawContainer.addEventListener('input', updateSstSpinRequirement);
    els.transportContainer.addEventListener('change', toggleCustomTransportContainer);
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
    const builtIns = seedDatabase.map(test => ({ ...test }));
    const byId = new Map(builtIns.map((test, index) => [test.id, index]));
    const byKey = new Map(builtIns.map((test, index) => [databaseKey(test), index]));

    (state.overrides || []).map(normalizeRecord).forEach(override => {
      const index = byId.get(override.id) ?? byKey.get(databaseKey(override));
      if (index !== undefined) {
        const base = builtIns[index];
        if (base.testCode === '92701') {
          // Replace only the outdated values from earlier built-in releases.
          // Preserve staff-entered changes that differ from those legacy defaults.
          const legacyValues = {
            preferredVolume: '0.5 mL whole blood',
            minimumVolume: '0.1 mL',
            transportContainer: 'No transfer unless directed',
            stability: '70 days',
            source: 'Quest MASTER directory verified 2026-09-02'
          };
          const updated = { ...override };
          Object.entries(legacyValues).forEach(([field, previous]) => {
            if (updated[field] === previous) updated[field] = base[field];
          });
          const legacyInstructions = 'Fasting is preferred but not required. Lavender - EDTA\n1. Collect and label sample according to standard protocols.\n2. Gently invert tube 8-10 times immediately after draw. DO NOT SHAKE.\n3. Do not centrifuge.\n4. Store and transport refrigerated.';
          if (updated.specialInstructions === legacyInstructions) {
            updated.specialInstructions = base.specialInstructions;
          }
          builtIns[index] = updated;
        } else if (['15447', '6421', '90567'].includes(base.testCode)) {
          // Preserve explicit local edits, but correct fields still matching
          // the obsolete bundled defaults for these verified Quest codes.
          const previous = {
            '15447': {
              testName: 'Epstein-Barr Virus Early Antigen D Antibody (IgG)',
              stability: '4 days', specialInstructions: 'SST→transport'
            },
            '6421': {
              testName: 'EBV Panel', stability: '4 Days', specialInstructions: 'SST→transport'
            },
            '90567': {
              testName: 'Dihydrotestosterone',
              preferredVolume: '1 mL serum',
              specialInstructions: 'Collect in a red-top tube (no gel). Allow the blood to clot, centrifuge, and transfer serum to a transport tube. SST and plasma are not acceptable.'
            }
          }[base.testCode];
          const updated = { ...override };
          Object.entries(previous).forEach(([field, oldValue]) => {
            if (updated[field] === oldValue) updated[field] = base[field];
          });
          builtIns[index] = updated;
        } else {
          builtIns[index] = override;
        }
      }
    });

    const customTests = (state.customTests || []).map(normalizeRecord);
    // Retired Quest codes must not reappear through legacy user edits or saved custom tests.
    return [...customTests, ...builtIns].filter(test => !RETIRED_TEST_CODES.has(test.testCode));
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
    return String(value ?? '')
      .replace(/\bQuest(?:\s+Diagnostics)?[- ]referral\b/gi, 'referral')
      .replace(/\bQuest(?:\s+Diagnostics)?\s+MASTER\b/gi, 'official')
      .replace(/\bQuest(?:\s+Diagnostics)?(?:[’']s)?\b/gi, 'the laboratory');
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
    if (/^sterile urine cup$/i.test(draw)) return 'Sterile Urine Cup';

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
      return 'Sterile Urine Cup';
    }
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

    const specimenType = normalizeSpecimenType(record.specimenType);
    const transportContainer = cleanTransportContainer(record.transportContainer);
    const drawContainer = normalizeUrineCollectionSource(
      specimenType,
      cleanCollectionContainer(String(record.drawContainer || 'Verify Official Instructions')),
      transportContainer
    );

    return {
      id: String(record.id || `custom-${Date.now()}-${index}`),
      testCode: String(record.testCode ?? record[['que', 'stCode'].join('')] ?? '').trim(),
      testName: String(record.testName ?? '').trim(),
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
    return `<span class="${className} tube ${displayClass}">${escapeHtml(label)}</span>`;
  }

  function requiredDrawContainerBadges(test, className = 'badge') {
    const primary = drawContainerBadge(test.drawContainer, className);
    const extras = additionalDrawRequirements(test).map(requirement => drawContainerBadge(requirement.container, className)).join(' ');
    return extras ? `${primary} ${extras}` : primary;
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
        requirement.specimenType,
        `from ${requirement.container}`,
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
    const primary = cleanVolumeDisplayText(label === 'preferred' ? test.preferredVolume : test.minimumVolume);
    const extras = additionalDrawRequirements(test)
      .map(requirement => cleanVolumeDisplayText(label === 'preferred' ? requirement.preferredVolume : requirement.minimumVolume))
      .filter(Boolean);
    return [primary, ...extras].filter(Boolean).join(' + ');
  }

  function cleanCollectionContainer(value) {
    const text = String(value || '').trim();
    // Local standard: generic urine cups/containers are the existing Sterile Urine Cup.
    // Keep truly special devices (24-hour jugs, preservative tubes, trace-metal containers, Aptima, etc.) distinct.
    if (/^(?:sterile\s*,?\s*)?(?:plastic\s+)?urine\s+(?:collection\s+)?(?:cup|container)$/i.test(text)) {
      return 'Sterile Urine Cup';
    }
    if (/^urine\s+collection\s+(?:cup|container)$/i.test(text)) return 'Sterile Urine Cup';
    return text;
  }

  function cleanTransportContainer(value) {
    const cleaned = String(value || '')
      .trim()
      .replace(/^labeled\s+transport\s+tube\s*\(local workflow;\s*verify\s+[a-z]+\)$/i, 'Transport tube (verify official instructions)')
      .replace(/^labeled\s+transport\s+tube$/i, 'Transport tube')
      .replace(/\blabeled transport tube\b/gi, 'transport tube')
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
    const matchedCount = rows.filter(row => row.matches.length).length;
    const confirmCount = rows.filter(row => row.outcome === 'confirm-match').length;
    const inSummaryCount = rows.filter(row => ['added', 'already-selected'].includes(row.outcome)).length;
    const hardIssueCount = rows.filter(row => ['no-match', 'blocked', 'low-confidence', 'not-added'].includes(row.outcome)).length;
    const unresolved = rows.filter(row => ['no-match', 'blocked', 'low-confidence', 'confirm-match', 'not-added'].includes(row.outcome));
    const resultSummary = renderBatchResultSummary(rows, addBest);
    const reviewSummary = renderBatchReviewSummary(inSummaryCount, confirmCount, hardIssueCount, addBest);

    if (addBest) {
      const alreadySelected = rows.filter(row => row.outcome === 'already-selected').length;
      const accountedFor = added + alreadySelected;
      if (unresolved.length) {
        showToast(`${accountedFor} ${accountedFor === 1 ? 'test is' : 'tests are'} in the summary. ${unresolved.length} ${unresolved.length === 1 ? 'entry needs' : 'entries need'} review.`);
      } else {
        showToast(`All ${rows.length} ${rows.length === 1 ? 'test is' : 'tests are'} in the summary.`);
      }
    }

    const headerText = confirmCount
      ? `${confirmCount} ${confirmCount === 1 ? 'possible match needs' : 'possible matches need'} your confirmation before adding.`
      : hardIssueCount
        ? `${hardIssueCount} ${hardIssueCount === 1 ? 'entry needs' : 'entries need'} attention.`
        : `${matchedCount} of ${rows.length} entries matched.`;

    els.batchResults.classList.remove('hidden');
    els.batchResults.innerHTML = `
      <div class="panel-heading batch-panel-heading">
        <div><h2>Review matches</h2><p>${headerText}</p></div>
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
    const picker = options ? `<label class="batch-choice-label" for="batch-choice-${row.index}">Choose the correct test (code / name)</label>
      <select id="batch-choice-${row.index}" class="batch-match-choice" data-batch-index="${row.index}" aria-label="Choose the correct test for ${escapeAttr(row.query)}">
        ${row.matches.map(({ test }) => `<option value="${escapeAttr(test.id)}" ${test.id === choice.test.id ? 'selected' : ''}>${escapeHtml(displayCode(test))} · ${escapeHtml(test.testName)}${test.status === 'blocked' ? ' (Do not perform)' : ''}</option>`).join('')}
      </select>` : '';
    const buttonLabel = selected ? '✓ Added' : needsConfirmation ? 'Confirm & add' : '+ Add';
    return `<div class="batch-row ${rowClass}" data-batch-index="${row.index}">
      <div class="batch-query-block"><span class="batch-kicker">You entered</span><div class="batch-query">${escapeHtml(row.query)}</div></div>
      <div class="batch-match">
        <div class="batch-match-title"><span class="batch-kicker">${choice === row.matches[0] ? 'Best match' : 'Selected match'}</span>${status}</div>
        <strong>${escapeHtml(displayCode(choice.test))} · ${escapeHtml(choice.test.testName)}</strong>
        <div class="batch-match-meta">${blocked ? '<span>Marked do not perform</span>' : ''}${requiredSpecimenBadges(choice.test)}<span class="batch-meta-dot">·</span>${requiredDrawContainerBadges(choice.test)}</div>
        ${picker}
      </div>
      <div class="batch-row-action">
        <button class="mini-button ${needsConfirmation ? 'confirm-match-button' : ''}" data-action="add" data-id="${escapeAttr(choice.test.id)}" data-query="${escapeAttr(row.query)}" data-needs-confirmation="${needsConfirmation ? 'true' : 'false'}" ${blocked || selected ? 'disabled' : ''}>${buttonLabel}</button>
        ${needsConfirmation ? `<a class="mini-button edit batch-directory-button" href="${escapeAttr(directorySearchUrl(row.query))}" target="_blank" rel="noreferrer">Search directory ↗</a>` : ''}
      </div>
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

  function renderLibrary() {
    const filter = normalizeSearch(els.libraryFilter.value);
    const specimenCategory = els.specimenFilter.value;
    const filtered = database
      .filter(test => test.status !== 'blocked' && (!specimenCategory || specimenFilterCategory(test.specimenType) === specimenCategory))
      .map(test => ({ test, score: filter ? rankLibraryTest(filter, test) : 1 }))
      .filter(item => item.score > 0);
    if (filter) filtered.sort((a, b) => b.score - a.score || a.test.testName.localeCompare(b.test.testName));

    const shown = filtered.slice(0, libraryLimit).map(item => item.test);
    const query = els.libraryFilter.value.trim();
    els.libraryBody.innerHTML = shown.length ? shown.map(renderLibraryRow).join('') : `<tr><td colspan="6" class="empty-state">No tests match these filters.${query ? `<div class="missing-search-action"><button class="mini-button" type="button" data-action="new-from-query" data-query="${escapeAttr(query)}">+ Add missing test</button></div>` : ''}</td></tr>`;
    els.libraryStatus.textContent = `Showing ${shown.length} of ${filtered.length}`;
    const allLibraryTestsShown = shown.length >= filtered.length;
    els.loadMoreButton.classList.toggle('hidden', allLibraryTestsShown);
    els.loadMoreInlineButton?.classList.toggle('hidden', allLibraryTestsShown);
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
      <td data-label="Test"><div class="test-name">${escapeHtml(test.testName)}</div><div class="subtext">${escapeHtml(truncate(test.specialInstructions, 95))}</div></td>
      <td data-label="Specimen / tube">${requiredDrawContainerBadges(test)}<div class="subtext specimen-line">${requiredSpecimenBadges(test)}${test.alternativeContainer ? ` <span>· Alt: ${escapeHtml(test.alternativeContainer)}</span>` : ''}</div></td>
      <td data-label="Temperature"><span class="badge ${temperatureClass(test.transportTemperature)}">${escapeHtml(test.transportTemperature)}</span></td>
      <td data-label="Volume"><span class="preferred-volume-chip">${escapeHtml(combinedVolumeText(test, 'preferred') || 'Verify')}</span><div class="subtext">Minimum: ${escapeHtml(combinedVolumeText(test, 'minimum') || '—')}</div></td>
      <td class="row-actions" data-label="Actions">
        ${blocked ? '<span class="badge temp-unknown">Do not perform</span>' : `<button class="mini-button" data-action="add" data-id="${escapeAttr(test.id)}" ${selected ? 'disabled' : ''} aria-label="${selected ? 'Added' : 'Add'} ${escapeAttr(test.testName)}">${selected ? '✓ Added' : '+ Add'}</button>`}
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
    } else if (button.dataset.action === 'edit') {
      openDialog(database.find(test => test.id === id));
    }
  }

  function handleBatchChoiceChange(event) {
    const select = event.target.closest('select.batch-match-choice');
    if (!select) return;
    const row = batchReviewRows[Number(select.dataset.batchIndex)];
    if (!row || !row.matches.some(match => match.test.id === select.value)) return;
    row.chosenId = select.value;
    row.outcome = batchRowOutcome(row);
    const container = select.closest('.batch-row');
    if (container) container.outerHTML = renderBatchRow(row);
  }

  function handleBatchClick(event) {
    const button = event.target.closest('button[data-action]');
    if (!button) return;
    if (button.dataset.action === 'add') {
      const row = batchReviewRows[Number(button.closest('.batch-row')?.dataset.batchIndex)];
      const chosen = row && chosenBatchMatch(row);
      if (!chosen || chosen.test.id !== button.dataset.id || chosen.test.status === 'blocked') return;
      if (!canAutoAddBatchRow(row)) {
        const confirmed = window.confirm(`This entry is not an unambiguous exact match.\n\nYou entered: ${row.query}\nSelected test: ${displayCode(chosen.test)} · ${chosen.test.testName}\n\nPlease verify the test code and specimen requirements. Add this specific test?`);
        if (!confirmed) return;
      }
      addSelected(chosen.test.id);
      renderBatch(false);
    } else if (button.dataset.action === 'new-from-query') {
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
    els.testsDetailsButton.textContent = showingDetails ? '▴ Hide details' : '▾ Show details';
  }

  function loadStatArea() {
    try {
      const value = localStorage.getItem(STAT_AREA_KEY);
      return value && STAT_AREAS[value] ? value : 'unselected';
    } catch (_) { return 'unselected'; }
  }

  function isStatEligible(test) {
    if (!test || test.status === 'blocked') return false;
    return STAT_AREAS[statArea].codes.includes(String(test.testCode || '').trim());
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
      statAreaResetNotice = `${removed} previously marked STAT test${removed === 1 ? '' : 's'} reset to Routine because this service area has no verified listing for the code.`;
    }
    return removed;
  }

  function changeStatArea(value) {
    if (!STAT_AREAS[value] || value === statArea) return;
    const previous = statArea;
    statAreaResetNotice = '';
    statArea = value;
    try { localStorage.setItem(STAT_AREA_KEY, value); } catch (_) {}
    const removed = reconcileStatWithArea();
    if (previous === 'unselected' && value === 'socal') {
      // Apply the previously requested ESR clinic default when a user first
      // chooses Southern California for an existing order.
      selectedIds.forEach(id => {
        const test = database.find(item => item.id === id);
        if (test && DEFAULT_STAT_TEST_CODES.has(test.testCode) && isStatEligible(test) && !statSelectedIds.includes(id)) statSelectedIds.push(id);
      });
      saveStatSelectedIds();
    }
    renderOrder();
    if (removed) showToast(statAreaResetNotice);
  }

  function renderStatArea() {
    if (els.statAreaSelect) els.statAreaSelect.value = statArea;
    if (els.statAreaHelp) {
      els.statAreaHelp.textContent = `${STAT_AREAS[statArea].note} STAT routing still requires receiving-lab approval. ${statAreaResetNotice}`.trim();
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

  function applyDefaultStatMigration() {
    // Apply the requested clinic STAT default once to any existing selected ESR
    // when upgrading. Subsequent user toggles are respected across reloads.
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

  function toggleStatPriority(id) {
    if (!selectedIds.includes(id)) return;
    const test = database.find(item => item.id === id);
    if (!isStatEligible(test)) return;
    statSelectedIds = statSelectedIds.includes(id)
      ? statSelectedIds.filter(item => item !== id)
      : [...statSelectedIds, id];
    saveStatSelectedIds();
    renderOrder();
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
    try { return localStorage.getItem(URINE_CULTURE_MODE_KEY) === 'urisponge' ? 'urisponge' : 'gray'; }
    catch (error) { return 'gray'; }
  }

  function setUrineCultureMode(mode) {
    const next = mode === 'urisponge' ? 'urisponge' : 'gray';
    if (next === urineCultureMode) return;
    urineCultureMode = next;
    try { localStorage.setItem(URINE_CULTURE_MODE_KEY, next); } catch (error) {}
    renderOrder();
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
    const instructions = 'Collect clean-catch midstream urine in a sterile urine cup. Dip the UriSponge applicator into the urine sample, fully submerging for 5 seconds. Return saturated sponge to UriSponge tube and secure tightly. Do not pour urine into the UriSponge tube. Transport preserved urine at room temperature or refrigerated. Confirm acceptance with the Quest service area.';
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
          <div><div class="test-name">${escapeHtml(displayCode(test))} · ${escapeHtml(test.testName)}</div><div class="subtext specimen-line">${requiredSpecimenBadges(test)} <span>·</span> <span class="preferred-volume-inline">${escapeHtml(combinedVolumeText(test, 'preferred') || 'verify')}</span> <span>· Minimum ${escapeHtml(combinedVolumeText(test, 'minimum') || 'verify')}</span></div>${fastingBadge(test, 'selected-fasting-badge')}</div>
          <div>${isStatEligible(test) ? `<button class="mini-button stat-toggle${test.isStat ? ' is-stat' : ''}" type="button" data-action="toggle-stat" data-id="${escapeAttr(test.id)}" aria-pressed="${test.isStat ? 'true' : 'false'}" title="Mark as STAT or Routine">${test.isStat ? 'STAT ✓' : 'Routine · Mark STAT'}</button>` : ''}<a class="mini-button edit" href="${escapeAttr(directoryUrl(test))}" target="_blank" rel="noreferrer">Official directory ↗</a><button class="mini-button edit" data-action="edit" data-id="${escapeAttr(test.id)}">Edit</button><button class="mini-button remove selected-card-delete" data-action="remove" data-id="${escapeAttr(test.id)}" type="button" aria-label="Delete ${escapeAttr(test.testName)}">Delete</button></div>
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
      els.testsDetailsButton.textContent = '▾ Show details';
      els.testsOverviewList.className = 'tests-overview-list empty-state';
      els.testsOverviewList.innerHTML = '<div class="empty-symbol" aria-hidden="true">＋</div><strong>No tests selected</strong><p>Select Add next to a test, or enter names or codes in the box and select Add best matches.</p>';
      return;
    }
    els.testsOverviewList.className = 'tests-overview-list';
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
      <div class="print-order-strip">${ORDER_OF_DRAW.map(step => `<div class="print-order-step ${selectedCategories.has(step.key) ? 'is-selected' : ''}"><span class="print-order-number">${step.number}</span>${orderTubeMarkup(step, true)}<span class="print-order-additive">${escapeHtml(step.additive)}</span></div>`).join('')}</div>
      <div class="print-order-note"><strong>Butterfly:</strong> If light blue is first, use a partially filled citrate discard tube to fill tubing dead space, then fill the test tube completely. Confirm additives on tube labels; do not rely on stopper color alone. Follow test-specific official instructions and facility policy.</div>
    </section>`;
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
      const note = test.specialInstructions.toLowerCase();
      if (test.status === 'blocked') alerts.push({ type: 'danger', text: `${test.testName}: marked do not perform.` });
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
        <span class="collection-alerts-chevron" aria-hidden="true">⌄</span>
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
    if (isExisting) setSelectValue(els.specimenType, record.specimenType, 'Other / Verify');
    else els.specimenType.value = '';
    setDrawContainerValue(record.drawContainer === 'Verify Official Instructions' && !isExisting ? '' : record.drawContainer);
    els.alternativeContainer.value = record.alternativeContainer;
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
    setTimeout(() => (isExisting ? els.testName : els.testCode.value ? els.testName : els.testName.value ? els.testCode : els.testCode).focus(), 0);
  }

  function closeDialog() {
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
      specimenType: els.specimenType.value,
      drawContainer: selectedDrawContainer(),
      alternativeContainer: els.alternativeContainer.value,
      additionalDrawRequirements: existingIndex >= 0 ? database[existingIndex].additionalDrawRequirements : [],
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
    const missingField = requiredFields.find(field => !field.value);
    if (missingField) {
      showToast(missingField.message);
      missingField.element.focus();
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

      // A preferred specimen volume alone must never make one test count as
      // more than one collection SST. Only explicit collection instructions
      // such as “2 SST tubes,” “separate tube,” or “dedicated tube” can add
      // additional collection tubes for a single test.
      if (requiresDedicatedSst(test)) {
        dedicatedTubes += Math.max(explicitCount, 1);
      } else if (plannedMl !== null) {
        sharedMl += Math.min(plannedMl, SST_USABLE_ML_PER_TUBE);
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
    let sharedBloodMl = 0;
    let dedicatedTubes = 0;
    let unmeasuredTubes = 0;

    tests.filter(isSstDraw).forEach(test => {
      const conversion = wholeBloodConversionFactor(test.specimenType) || { factor: SERUM_PLASMA_TO_WHOLE_BLOOD_FACTOR, type: 'serum-plasma' };
      let bloodMl = volumeForRequirement(test, 'preferred', conversion);
      if (bloodMl === null) bloodMl = volumeForRequirement(test, 'minimum', conversion);
      const explicitCount = Math.max(explicitSstTubeCount(test), 1);

      if (requiresDedicatedSst(test) || hasCollectionFillRule(test)) {
        const capacityCount = bloodMl !== null ? Math.max(1, Math.ceil(bloodMl / TIGER_SST_CAPACITY_ML)) : 1;
        dedicatedTubes += Math.max(explicitCount, capacityCount);
      } else if (bloodMl !== null) {
        sharedBloodMl += bloodMl;
      } else {
        unmeasuredTubes += 1;
      }
    });

    const sharedTubes = sharedBloodMl > 0 ? Math.ceil(sharedBloodMl / TIGER_SST_CAPACITY_ML) : 0;
    return {
      sharedBloodMl,
      sharedTubes,
      dedicatedTubes,
      unmeasuredTubes,
      totalTubes: sharedTubes + dedicatedTubes + unmeasuredTubes
    };
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
    if (isUrineTest(test) && !isTimedUrineTest(test)) {
      return { key: 'sterile-urine-cup', label: 'Sterile Urine Cup', className: 'tube-urine-cup' };
    }

    const cls = tubeClass(draw);
    const labels = {
      'tube-culture': 'Blood Culture Bottles',
      'tube-blue': 'Light Blue Citrate',
      'tube-sst': selectedSstLabel(),
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
      'tube-urine-cup': 'Sterile Urine Cup',
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
    const specimen = String(test.specimenType || '').toLowerCase();
    const name = String(test.testName || '').toLowerCase();
    if (/stool|feces|fecal|faecal/.test(specimen) || /stool|feces|fecal|faecal/.test(name)) return 'stool';
    if (/urine|urinary/.test(specimen) || /urine|urinary/.test(name)) return 'urine';
    if (/serum|plasma|whole blood|blood|rbc|red blood/.test(specimen)) return 'blood';
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
    return `<div class="print-collection-grid">${items.map(item => {
      const specimenBadge = collectionSpecimenBadgeForItem(item);
      const specimenGroup = collectionSpecimenGroupForItem(item);
      const tigerBadge = printSstTigerBadge(item);
      return `<article class="print-collection-card${item.isStat ? ' is-stat' : ''}${item.tests.length >= 12 ? ' is-long' : ''}">
        <div class="print-container-count">${item.sharedStatRoutine ? '<span class="print-priority-tag">STAT + Routine shared</span>' : item.isStat ? '<span class="print-priority-tag">STAT</span>' : ''}<strong>${item.count}</strong><span class="tube ${item.displayClassName || item.className}">${escapeHtml(item.label)}</span>${tigerBadge}${specimenBadge ? `<span class="print-collection-specimen-badge specimen-${specimenGroup}">${escapeHtml(specimenBadge)}</span>` : ''}</div>
        ${item.detail ? `<div class="print-container-detail">${escapeHtml(item.detail)}</div>` : ''}
        ${printCollectionWholeBloodDetail(item, wholeBloodGroups)}
        <div class="print-for-tests"><b>For ${item.tests.length} ${item.tests.length === 1 ? 'test' : 'tests'}:</b><ul>${item.sharedStatRoutine ? uniqueTests(item.tests).map(test => `<li><strong>${escapeHtml(displayCode(test))}</strong> ${escapeHtml(test.testName)} (${test.isStat ? 'STAT' : 'Routine'})</li>`).join('') : testReferences(item.tests)}</ul></div>
      </article>`;
    }).join('')}</div>`;
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
      const isShareableCup = item.className === 'tube-urine-cup'
        && collectionSpecimenGroupForItem(item) === 'urine'
        && !item.urineSeparateCollection
        && item.tests.every(isShareableUrineCupTest);
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
        cup.detail = 'Collect once in a shared sterile cup; prepare separate STAT and routine transport specimens and bags.';
      }
    });
    // Print and collection chips follow collection workflow priority rather
    // than the order in which tests were added: SST, other blood, urine,
    // stool, then swabs/transport media. Keep STAT sources as separate cards.
    return merged.sort((a, b) => collectionSortRank(a) - collectionSortRank(b));
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
        label: 'Sterile Urine Cup',
        className: 'tube-urine-cup',
        urineSeparateCollection: group.dedicated,
        urineCollectionKey: group.key,
        count: group.dedicated ? Math.max(...group.tests.map(explicitCollectionCount)) : 1,
        tests: uniqueTests(group.tests),
        detail: group.dedicated ? 'Separate urine collection required. Follow test-specific collection instructions.' : 'Collect in the sterile cup first, then fill any required preservative or transport tubes.'
      });
    });

    const grouped = new Map();
    tests.forEach(test => {
      if (isSstDraw(test)) return;
      if (isLavenderDraw(test) || isRedTopDraw(test)) return;
      if (isAdditionalPoolableBloodDraw(test)) return;
      if (isUrineTest(test) && !isTimedUrineTest(test)) return;
      const info = canonicalCollectionContainer(test);
      // Keep physically identical containers separate when they hold different specimen types.
      // A Sterile Urine Cup, for example, may be used for either urine or stool, but those
      // specimens should never be combined into the same collection card/count.
      const specimenGroup = collectionSpecimenGroupForTest(test);
      const specimenSubtype = specimenGroup === 'urine' ? urineCollectionType(test).key : specimenGroup;
      const urineCup = specimenGroup === 'urine' && info.className === 'tube-urine-cup';
      const separateCup = urineCup && !isShareableUrineCupTest(test);
      const groupKey = `${specimenSubtype}|${info.key}${separateCup ? `|separate|${test.sourceTestId || test.id}` : ''}`;
      if (!grouped.has(groupKey)) grouped.set(groupKey, { ...info, key: groupKey, urineSeparateCollection: separateCup, urineCollectionKey: groupKey, count: 0, tests: [], detail: '' });
      const item = grouped.get(groupKey);
      if (urineCup && !separateCup) item.count = Math.max(item.count, explicitCollectionCount(test));
      else item.count += explicitCollectionCount(test);
      item.tests.push(test);
    });

    grouped.forEach(item => {
      item.tests = uniqueTests(item.tests);
      items.push(item);
    });

    // Final card-level normalization. Collection cards are grouped by the physical
    // collection container AND specimen type, so urine and stool never merge just
    // because both use a Sterile Urine Cup. Conversely, duplicate urine cards that
    // use the same cup are collapsed into one card even when downstream transport
    // tubes or processing differ.
    const mergedItems = [];
    const mergedIndex = new Map();
    items.forEach(item => {
      const specimenGroup = collectionSpecimenGroupForItem(item);
      const specimenSubtype = collectionMergeSubtypeForItem(item);
      const normalizedLabel = String(item.label || '').trim().toLowerCase();
      const separateKey = item.urineSeparateCollection ? `|${item.urineCollectionKey || item.key}` : '';
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

      // Spot urine collected in the same Sterile Urine Cup is one shared source
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
    if (/red/i.test(draw)) return 'Red Top';
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

  function transportTubeClass(test, container) {
    const value = String(container || '').toLowerCase();
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
      // Tests that explicitly require multiple separate submission tubes remain
      // their own card so that requirement is not obscured by pooling.
      return explicitSubmissionCount(test) > 1
        ? `${standardKey}|dedicated-${normalizeSearch(displayCode(test))}`
        : standardKey;
    }

    return raw;
  }

  function isOriginalContainerSubmission(test) {
    const draw = String(test.drawContainer || '').trim();
    const transport = finalTransportContainer(test);
    const combined = `${transport} ${test.specialInstructions || ''}`.toLowerCase();
    if (!draw || /^do not collect$/i.test(draw) || /^n\/?a$/i.test(transport)) return false;

    const drawClass = tubeClass(draw);
    const transportClass = tubeClass(transport);
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
    const processing = isAptima70049
      ? `${sourceSpecimen} · Submit as Aptima`
      : (String(test.spin || '').toLowerCase() === 'yes' ? 'Process as directed; submit in original tube' : 'Submit in original tube');
    return {
      key: `original|${normalizeSearch(label)}|${normalizeSearch(sourceSpecimen)}`,
      label,
      className: tubeClass(draw),
      count: explicitSubmissionCount(test),
      detail: isAptima70049 ? processing : `${sourceSpecimen} · ${processing}`,
      originalTube: true
    };
  }

  function splitSubmissionContainers(test) {
    const transport = finalTransportContainer(test);
    const combined = `${transport} ${test.specialInstructions || ''}`.toLowerCase();
    if (String(test.testCode || '') === '3020' || (/red\s*\/\s*yellow|red-yellow|swirl/.test(combined) && /gray|grey|urisponge/.test(combined) && /urine|culture/.test(combined))) {
      return [
        { key: 'ua-swirl', label: 'Red/Yellow Swirl UA Preservative Tube', className: 'tube-ua-swirl', count: 1, detail: 'Urine in preservative tube' },
        selectedUrineCultureIsSponge() && isCultureTransportEligible(test)
          ? { key: 'urine-culture-urisponge', label: 'UriSponge Urine Culture Transport', className: 'tube-urisponge', count: 1, detail: 'Saturated UriSponge from sterile urine cup · do not pour urine into tube' }
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
      if (isSpunSstSubmission(test)) return;
      if ((isLavenderDraw(test) || isRedTopDraw(test)) && isOriginalContainerSubmission(test)) return;
      splitSubmissionContainers(test).forEach(container => {
        if (!items.has(container.key)) items.set(container.key, { ...container, tests: [] });
        const item = items.get(container.key);
        item.count += item.tests.length ? container.count : 0;
        if (!item.detail && container.detail) item.detail = container.detail;
        item.tests.push(test);
      });
    });

    return Array.from(items.values()).map(item => ({ ...item, tests: uniqueTests(item.tests) }));
  }

  function transferContainerCountForTests(tests) {
    return tests.reduce((sum, test) => {
      return sum + splitSubmissionContainers(test)
        .filter(container => !container.originalTube)
        .reduce((containerSum, container) => containerSum + Math.max(Number(container.count) || 0, 0), 0);
    }, 0);
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

  function testReferences(tests) {
    return uniqueTests(tests).map(test => `<li><strong>${escapeHtml(displayCode(test))}</strong> ${escapeHtml(test.testName)}</li>`).join('');
  }

  function derivedSpecimenSourceLabel(test, item) {
    const sourceTube = shortDrawSource(test);
    const specimen = titleCaseSpecimen(normalizeSpecimenType(test.specimenType));
    const lowerSpecimen = specimen.toLowerCase();
    const sourceSpecimen = specificSpecimenSource(test);

    if (/\brbcs?\b|red blood cell/.test(lowerSpecimen)) return sourceTube ? `RBCs from ${sourceTube}` : 'RBCs';
    if (/plasma/.test(lowerSpecimen)) return sourceTube ? `${specimen} from ${sourceTube}` : specimen;
    if (/urine|stool|swab|saliva|semen|csf|cerebrospinal|tissue/.test(lowerSpecimen) || /swab/i.test(sourceSpecimen)) {
      return sourceSpecimen;
    }
    if (!sourceTube || item.originalTube) return '';

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
    if (onlySerumType && derivedText.startsWith('serum from ')) return false;
    if (onlyPlasmaType && /^.*plasma(?: from |$)/.test(derivedText)) return false;
    return true;
  }

  function printLabelingNotes(item) {
    const grouped = new Map();
    uniqueTests(item.tests).forEach(test => {
      const is24Hour = is24HourUrineTest(test);
      const derived = derivedSpecimenSourceLabel(test, item);
      const explicit = String(test.specialLabeling || '').trim();
      const parts = [];
      // For 24-hour urine transfers, "24h urine" already identifies the specimen.
      // Do not prepend a redundant generic "Urine" label.
      if (derived && !(is24Hour && /^urine$/i.test(derived.trim()))) parts.push(derived);
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
      const note = Array.from(new Set(parts)).join(' · ');
      if (!note) return;
      if (!grouped.has(note)) grouped.set(note, []);
      grouped.get(note).push(displayCode(test));
    });
    if (!grouped.size) return '';
    return `<div class="print-label-notes">${Array.from(grouped.entries()).map(([note, codes]) => `<div class="print-label-note"><span>Label</span><div>${escapeHtml(note)} <small>${escapeHtml(codes.join(', '))}</small></div></div>`).join('')}</div>`;
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
      return `<span class="print-source-tube-badge tube ${displayClass}">${countBadge}<span class="print-source-from">From</span><span>${escapeHtml(source.label)}</span></span>`;
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

  function printSubmissionItemDetail(item) {
    const badges = printSubmissionSourceBadges(item);
    const detail = printProcessedTransferDetail(item);
    if (!detail && !badges) return '';
    return `<div class="print-submit-item-detail">${detail ? escapeHtml(detail) : ''}${badges}</div>`;
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
      const key = `${item.isStat ? 'stat' : 'routine'}|${item.className || ''}|${normalizeSearch(item.label)}`;
      plannedCounts.set(key, (plannedCounts.get(key) || 0) + item.count);
    });

    const groups = new Map();
    collectionTests.forEach(test => {
      const conversion = wholeBloodConversionFactor(test.specimenType);
      if (!conversion) return;

      const source = canonicalCollectionContainer(test);
      if (!source.label || !source.className) return;
      const key = `${test.isStat ? 'stat' : 'routine'}|${source.className}|${normalizeSearch(source.label)}`;
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
    const key = `${item.isStat ? 'stat' : 'routine'}|${item.className || ''}|${normalizeSearch(item.label)}`;
    const exact = groups.find(group => group.key === key);
    if (exact) return exact;
    const sameClass = groups.filter(group => group.className === item.className && group.key.startsWith(item.isStat ? 'stat|' : 'routine|'));
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
    const note = notes.length ? `<small>${escapeHtml(notes.join(' · '))}</small>` : '';
    return `<div class="print-collection-blood-volume">
      <span class="print-collection-blood-copy">
        <span class="print-collection-blood-label">Estimated draw volume</span>
        ${note}
      </span>
      <span class="print-collection-blood-values">
        <span class="print-collection-blood-metric"><b>Preferred</b><strong>${escapeHtml(wholeBloodRequirementText(group, 'preferred'))}</strong></span>
        <span class="print-collection-blood-metric"><b>Minimum</b><strong>${escapeHtml(wholeBloodRequirementText(group, 'minimum'))}</strong></span>
      </span>
    </div>`;
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

  function printCollectionSubmissionPlan(tests) {
    const collectionTests = expandedCollectionTests(tests);
    const bags = buildTransportBagPlan(collectionTests);
    const collectionItems = buildCollectionPlan(collectionTests, bags);
    const wholeBloodGroups = buildWholeBloodVolumePlan(collectionTests, collectionItems);
    const totalCollect = collectionItems.reduce((sum, item) => sum + item.count, 0);
    const bagLabels = bags.map(bag => `<span class="print-bag-pill ${bag.className}">${escapeHtml(bag.label)}</span>`).join('');
    const fastingItems = fastingRequirementsForTests(tests);
    const fastingPanel = fastingItems.length ? `<div class="print-fasting-panel">
      <div class="print-fasting-panel-title"><strong>Fasting instructions</strong><span>Confirm before collection</span></div>
      <div class="print-fasting-list">${fastingItems.map(({ test, requirement }) => `<div class="print-fasting-item fasting-${requirement.level}"><span class="print-fasting-status">${escapeHtml(requirement.label)}</span><div><strong>${escapeHtml(displayCode(test))} · ${escapeHtml(test.testName)}</strong><small>${escapeHtml(requirement.note)}</small></div></div>`).join('')}</div>
    </div>` : '';

    return `<section class="print-logistics-plan">
      <div class="print-logistics-heading"><strong>Collection and submission plan</strong><span>Collection containers are separated from processed specimens placed into transport bags. STAT area: ${escapeHtml(STAT_AREAS[statArea].label)}.</span></div>
      <div class="print-logistics-totals">
        <div class="print-total-box collect-total"><span>TOTAL TO COLLECT</span><strong>${totalCollect}</strong><small>tubes / collection containers</small></div>
        <div class="print-collect-chips">${collectionItems.map(item => {
          const specimenGroup = collectionSpecimenGroupForItem(item);
          const specimenTag = item.className === 'tube-urine-cup' && (specimenGroup === 'urine' || specimenGroup === 'stool')
            ? `<span class="print-collect-chip-specimen specimen-${specimenGroup}">${escapeHtml(specimenGroup === 'stool' ? 'Stool' : 'Urine')}</span>`
            : '';
          return `<span class="print-collect-chip tube ${item.displayClassName || item.className}">${item.sharedStatRoutine ? '<em class="print-chip-stat">STAT + Routine shared</em> ' : item.isStat ? '<em class="print-chip-stat">STAT</em> ' : ''}<b>${item.count}</b> ${escapeHtml(item.label)}${specimenTag}</span>`;
        }).join('')}</div>
        <div class="print-total-box submit-total"><span>TOTAL TO SUBMIT</span><strong>${bags.length}</strong><small>${bags.length === 1 ? 'transport bag' : 'transport bags'}</small></div>
        <div class="print-submit-bags">${bagLabels}</div>
      </div>
      ${fastingPanel}

      ${selectedTests().some(isCultureTransportEligible) ? `<div class="print-urine-culture-choice"><strong>Urine culture transport:</strong> ${selectedUrineCultureIsSponge() ? 'UriSponge' : 'Gray-top urine culture tube'}</div>` : ''}
      ${printOrderOfDraw(collectionTests)}

      <div class="print-logistics-subheading">What to collect</div>
      ${printCollectionGroups(collectionItems, wholeBloodGroups)}

      <section class="print-submit-section">
        <div class="print-submit-heading">
          <strong>What to submit after processing</strong>
          <div class="print-submit-heading-summary">
            <span class="print-submit-bag-count"><b>${bags.length}</b> ${bags.length === 1 ? 'bag' : 'bags'}</span>
            <span class="print-submit-bag-types">${bags.map(bag => {
              const shortLabel = bag.label.replace(/\s+bag$/i, '').replace('Room-temperature', 'Room temp').replace('Refrigerated', 'Cold');
              return `<span>${escapeHtml(shortLabel)}</span>`;
            }).join('')}</span>
          </div>
        </div>
        <div class="print-bag-grid">${bags.map(bag => {
          const contents = buildSubmissionContents(bag);
          applyBloodSourceCountAllocations(contents);
          const totalContainers = contents.reduce((sum, item) => sum + item.count, 0);
          return `<article class="print-bag-card ${bag.className}">
            <div class="print-bag-card-header"><div><strong>${escapeHtml(bag.label)}</strong><span>${bag.isStat ? 'STAT specimens only · keep separate from routine and other temperatures' : 'Routine only · keep separate from STAT and other temperatures'}</span></div><div class="print-bag-container-total"><strong>${totalContainers}</strong><span>containers</span></div></div>
            <div class="print-submit-content">${contents.map(item => `<div class="print-submit-item${item.originalTube ? ' original-tube-submit' : ''}">
              <div class="print-submit-item-title"><strong>${item.count}</strong><span class="tube ${item.displayClassName || item.className}">${escapeHtml(item.label)}</span>${printSstTigerBadge(item)}</div>
              ${printSubmissionItemDetail(item)}
              ${printLabelingNotes(item)}
              <div class="print-for-tests"><b>For ${item.tests.length} ${item.tests.length === 1 ? 'test' : 'tests'}:</b><ul>${testReferences(item.tests)}</ul></div>
            </div>`).join('')}</div>
          </article>`;
        }).join('')}</div>
      </section>
      <div class="print-bag-note">
        <div><strong>STAT routing:</strong> Only tests listed for the selected Quest service area offer Mark STAT. Confirm that the specific order is accepted as STAT by the receiving lab, use its STAT requisition/courier workflow, and never put STAT specimens in a routine shipment.</div>
        <div><strong>Tube sharing:</strong> STAT and routine blood tests never share source tubes, and all STAT and routine transport bags remain separate. Compatible tests from one urine collection may share the source sterile cup across priorities, unless separate collections are specifically required. Within the same priority, compatible SST, Lavender EDTA, and Red Top tubes can be shared only when the processing steps and temperature match. Lavender whole blood stays separate from Lavender tubes used for plasma or RBCs. Tubes sent whole also stay separate from tubes used to prepare aliquots.</div>
        <div><strong>Tube counts:</strong> Estimates allow 2 mL of usable serum, plasma, or processed specimen per source tube and 4 mL of whole blood per Lavender tube. Multiple, dedicated, and full-tube requirements remain separate. Whole-blood amounts are shown inside each blood-tube card; serum/plasma amounts use a 2.5× whole-blood conversion.</div>
        <div><strong>Urine:</strong> Random/spot, first-morning, timed, and 24-hour collections are kept distinct when their collection requirements differ. Compatible tests may share a sterile urine cup even when their downstream transport specimens have different priorities or temperatures; keep those transport specimens separate. Explicitly required separate urine collections must not be pooled.</div>
      </div>
    </section>`;
  }


  function printSummary() {
    const tests = selectedTests();
    if (!tests.length) return showToast('Add at least one test before printing.');
    const alerts = collectAlerts(tests);
    els.printSheet.innerHTML = `
      <div class="print-header">
        <div><h1 class="print-title">Lab Collection Summary</h1><div class="print-subtitle">Send-out workflow</div></div>
        <div class="print-meta">Generated ${escapeHtml(new Date().toLocaleString())}<span class="print-selected-count">${tests.length} selected ${tests.length === 1 ? 'test' : 'tests'}</span></div>
      </div>
      ${alerts.length ? `<div class="print-alerts">${alerts.map(alert => `<div>${escapeHtml(alert.text)}</div>`).join('')}</div>` : ''}
      <table class="print-table">
        <colgroup><col style="width:6%"><col style="width:14%"><col style="width:7%"><col style="width:10%"><col style="width:10%"><col style="width:5%"><col style="width:8%"><col style="width:7%"><col style="width:8%"><col style="width:25%"></colgroup>
        <thead><tr><th>Code</th><th>Test</th><th>Specimen</th><th>Draw container</th><th>Transport tube</th><th>Spin</th><th>Temperature</th><th>Volume</th><th>Stability</th><th>Special handling</th></tr></thead>
        <tbody>${tests.map(test => `<tr><td>${escapeHtml(displayCode(test))}</td><td><div class="print-test-name-stack"><strong>${escapeHtml(test.testName)}</strong>${test.isStat ? '<span class="print-priority-tag">STAT</span>' : ''}${fastingBadge(test, 'print-test-fasting-badge')}</div>${test.alternativeContainer ? `<div class="print-test-alternative">Alt: <span class="print-inline-tube tube ${tubeClass(test.alternativeContainer)}">${escapeHtml(test.alternativeContainer)}</span></div>` : ''}${additionalRequirementSummary(test, true)}</td><td>${requiredSpecimenBadges(test, 'print-specimen-badge')}</td><td>${requiredDrawContainerBadges(test, 'print-tube-badge')}</td><td>${printContainerBadges(test)}</td><td>${escapeHtml(test.spin)}</td><td><span class="print-temp-badge ${temperatureClass(test.transportTemperature)}">${escapeHtml(test.transportTemperature)}</span></td><td><span class="print-preferred-volume">${escapeHtml(combinedVolumeText(test, 'preferred') || 'Verify')}</span><br><span class="print-minimum-volume">Minimum: ${escapeHtml(combinedVolumeText(test, 'minimum') || '—')}</span></td><td>${escapeHtml(test.stability || 'Verify')}</td><td>${escapeHtml(test.specialInstructions || '—')}</td></tr>`).join('')}</tbody>
      </table>
      ${printCollectionSubmissionPlan(tests)}
      <div class="print-footer">
        <div><strong>Order of draw:</strong> Pink tubes are grouped with EDTA. Temperatures are counted separately.</div>
        <div class="print-missing-test"><strong>Missing a test?</strong> <b>Contact Sam</b> to have it added.</div>
      </div>
      <div class="print-ownership"><span><strong>Copyright and ownership:</strong> Copyright © 2026 Sam Hay. All rights reserved. Independently developed and maintained by Sam Hay as a personal software project and hosted through a personally controlled account. No license or ownership interest is granted except through Sam Hay’s express written authorization. Use by any organization does not, by itself, transfer ownership of the software or source code. Access to this hosted version is provided by permission and may be modified, suspended, or withdrawn by Sam Hay at any time and for any reason.</span></div>`;
    window.print();
  }

  function exportSummaryCsv() {
    const tests = selectedTests();
    if (!tests.length) return showToast('Add at least one test before exporting.');
    const headers = ['Priority','Test Code','Test Name','Specimen Type','Draw Container','Additional Required Draws','Alternative Container','Transport Tube / Container','Preferred Volume','Minimum Volume','Transport Temperature','Raw Temperature','Stability','Spin','Special Labeling','Special Instructions'];
    const rows = tests.map(test => [test.isStat ? 'STAT' : 'Routine',test.testCode,test.testName,[test.specimenType, ...additionalDrawRequirements(test).map(item => item.specimenType)].filter(Boolean).join(' + '),test.drawContainer,additionalDrawRequirements(test).map(item => `${item.container}${item.specimenType ? ` (${item.specimenType})` : ''}`).join(' + '),test.alternativeContainer,test.transportContainer,combinedVolumeText(test, 'preferred'),combinedVolumeText(test, 'minimum'),test.transportTemperature,test.transportTemperatureRaw,test.stability,test.spin,test.specialLabeling,test.specialInstructions]);
    const csv = [headers, ...rows].map(row => row.map(csvCell).join(',')).join('\r\n');
    downloadBlob(csv, `lab-collection-summary-${isoDate()}.csv`, 'text/csv;charset=utf-8');
  }

  function displayCode(test) {
    return String(test.testCode || '').trim() || 'Manual';
  }

  function directorySearchUrl(query) {
    const value = String(query || '').trim();
    return value
      ? `https://testdirectory.questdiagnostics.com/test/results?q=${encodeURIComponent(value)}`
      : 'https://testdirectory.questdiagnostics.com/';
  }

  function directoryUrl(test) {
    const code = String(test.testCode || '').trim();
    if (/^\d+$/.test(code)) {
      return `https://testdirectory.questdiagnostics.com/test/test-detail/${encodeURIComponent(code)}/?cc=MASTER&q=${encodeURIComponent(code)}`;
    }
    return directorySearchUrl(test.testName || '');
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
    if (/uri[- ]?sponge/.test(value)) return 'tube-urisponge';
    if (/aptima/.test(value)) return 'tube-aptima';
    if (/total[- ]?fix/.test(value)) return 'tube-total-fix';
    if (/(?:trace[ -]?metal[- ]?free|acid[- ]?washed).*container|container.*(?:trace[ -]?metal[- ]?free|acid[- ]?washed)/.test(value)) return 'tube-trace-metal-container';
    if (/24\s*[- ]?hour\s+urine\s+(?:container|jug)|24h\s+urine\s+(?:container|jug)/.test(value)) return 'tube-24h-urine';
    if (/sterile\s+urine\s+cup|urine\s+collection\s+cup/.test(value)) return 'tube-urine-cup';
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
    const normalized = String(value || '').trim();
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
