(() => {
  'use strict';

  const DB_KEY = 'labCollectionCalculator.database.v10';
  const LEGACY_STORAGE_PREFIX = ['que', 'stLabCalculator'].join('');
  const LEGACY_DB_KEYS = [9, 8, 7, 6, 5, 4, 3, 2, 1].map(version => `${LEGACY_STORAGE_PREFIX}.database.v${version}`);
  const SELECTED_KEY = 'labCollectionCalculator.selected.v1';
  const LEGACY_SELECTED_KEYS = [`${LEGACY_STORAGE_PREFIX}.selected.v1`];
  const PAGE_STEP = 80;
  const SST_USABLE_ML_PER_TUBE = 2;
  const ORDER_OF_DRAW = [
    { key: 'culture', number: 1, label: 'Blood cultures', additive: 'See bottle label', tubeClass: 'tube-culture' },
    { key: 'citrate', number: 2, label: 'Light blue', additive: 'Sodium citrate', tubeClass: 'tube-blue' },
    { key: 'sst', number: 3, label: 'Gold / SST', additive: 'Gel, serum', tubeClass: 'tube-sst' },
    { key: 'serum', number: 4, label: 'Red', additive: 'No gel, serum', tubeClass: 'tube-red' },
    { key: 'heparin', number: 5, label: 'Green', additive: 'Heparin', tubeClass: 'tube-green' },
    { key: 'edta', number: 6, label: 'Lavender / Pink', additive: 'EDTA', tubeClass: 'tube-lavender' },
    { key: 'royal', number: 7, label: 'Royal blue', additive: 'EDTA — verify label', tubeClass: 'tube-royal' },
    { key: 'gray', number: 8, label: 'Gray', additive: 'Fluoride / oxalate', tubeClass: 'tube-gray' },
    { key: 'acd', number: 9, label: 'Yellow ACD', additive: 'Citrate ACD — draw last', tubeClass: 'tube-yellow' }
  ];

  const $ = (id) => document.getElementById(id);
  const els = {
    recordCount: $('recordCount'), searchInput: $('searchInput'), addBestButton: $('addBestButton'),
    previewButton: $('previewButton'), clearSearchButton: $('clearSearchButton'), batchResults: $('batchResults'),
    libraryFilter: $('libraryFilter'), tempFilter: $('tempFilter'), showBlocked: $('showBlocked'),
    libraryBody: $('libraryBody'), libraryStatus: $('libraryStatus'), loadMoreButton: $('loadMoreButton'),
    addTestButton: $('addTestButton'), addSelectedTestButton: $('addSelectedTestButton'),
    selectedCount: $('selectedCount'), selectedList: $('selectedList'),
    drawPlan: $('drawPlan'), orderOfDraw: $('orderOfDraw'), collectionAlerts: $('collectionAlerts'), clearOrderButton: $('clearOrderButton'),
    printButton: $('printButton'), exportSummaryButton: $('exportSummaryButton'),
    printSheet: $('printSheet'), testDialog: $('testDialog'), testForm: $('testForm'), dialogTitle: $('dialogTitle'),
    closeDialogButton: $('closeDialogButton'), cancelDialogButton: $('cancelDialogButton'), deleteTestButton: $('deleteTestButton'),
    saveTestButton: $('saveTestButton'), testId: $('testId'), testCode: $('testCode'), testName: $('testName'), specimenType: $('specimenType'),
    drawContainer: $('drawContainer'), customDrawContainer: $('customDrawContainer'), customDrawContainerRow: $('customDrawContainerRow'), alternativeContainer: $('alternativeContainer'), transportContainer: $('transportContainer'),
    preferredVolume: $('preferredVolume'), minimumVolume: $('minimumVolume'), transportTemperature: $('transportTemperature'),
    transportTemperatureRaw: $('transportTemperatureRaw'), stability: $('stability'), spin: $('spin'),
    specialInstructions: $('specialInstructions'), blockedStatus: $('blockedStatus'), addToSummary: $('addToSummary'),
    addToSummaryRow: $('addToSummaryRow'), openDirectoryFromDialogButton: $('openDirectoryFromDialogButton'), toast: $('toast')
  };

  let database = loadDatabase();
  let selectedIds = loadSelectedIds();
  let libraryLimit = PAGE_STEP;
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
    els.tempFilter.addEventListener('change', () => { libraryLimit = PAGE_STEP; renderLibrary(); });
    els.showBlocked.addEventListener('change', () => { libraryLimit = PAGE_STEP; renderLibrary(); });
    els.loadMoreButton.addEventListener('click', () => { libraryLimit += PAGE_STEP; renderLibrary(); });
    els.libraryBody.addEventListener('click', handleLibraryClick);
    els.batchResults.addEventListener('click', handleBatchClick);
    els.selectedList.addEventListener('click', handleSelectedClick);
    els.addTestButton.addEventListener('click', () => openDialog(null, { addToSummary: true }));
    els.addSelectedTestButton.addEventListener('click', () => openDialog(null, { addToSummary: true }));
    els.clearOrderButton.addEventListener('click', clearOrder);
    els.printButton.addEventListener('click', printSummary);
    els.exportSummaryButton.addEventListener('click', exportSummaryCsv);
    els.closeDialogButton.addEventListener('click', closeDialog);
    els.cancelDialogButton.addEventListener('click', closeDialog);
    els.testForm.addEventListener('submit', saveTestFromForm);
    els.deleteTestButton.addEventListener('click', deleteCustomTest);
    els.openDirectoryFromDialogButton.addEventListener('click', openDirectoryFromDialog);
    els.drawContainer.addEventListener('change', toggleCustomDrawContainer);
    els.customDrawContainer.addEventListener('input', handleCustomDrawContainerInput);
  }

  function renderAll() {
    els.recordCount.textContent = `${database.length} local tests`;
    renderLibrary();
    renderOrder();
  }

  function loadDatabase() {
    const seed = (window.SEED_TESTS || []).map(normalizeRecord);
    const stored = loadJson(DB_KEY, null);
    if (Array.isArray(stored) && stored.length) return stored.map(normalizeRecord);

    // Published data corrections should replace older built-in records. Preserve only
    // staff-created custom tests when migrating from an earlier browser database.
    const merged = new Map(seed.map(test => [databaseKey(test), test]));
    LEGACY_DB_KEYS.forEach(key => {
      const legacy = loadJson(key, null);
      if (!Array.isArray(legacy)) return;
      legacy.map(normalizeRecord)
        .filter(test => test.id.startsWith('custom-') || test.source === 'Custom entry')
        .forEach(test => merged.set(databaseKey(test), test));
    });
    const migrated = Array.from(merged.values());
    localStorage.setItem(DB_KEY, JSON.stringify(migrated));
    return migrated;
  }

  function loadSelectedIds() {
    const current = loadJson(SELECTED_KEY, null);
    if (Array.isArray(current)) return current.filter(id => database.some(test => test.id === id));
    for (const key of LEGACY_SELECTED_KEYS) {
      const legacy = loadJson(key, null);
      if (!Array.isArray(legacy)) continue;
      const migrated = legacy.filter(id => database.some(test => test.id === id));
      localStorage.setItem(SELECTED_KEY, JSON.stringify(migrated));
      return migrated;
    }
    return [];
  }

  function databaseKey(test) {
    return `${normalizeSearch(test.testCode)}|${normalizeSearch(test.testName)}`;
  }

  function normalizeRecord(record, index = 0) {
    return {
      id: String(record.id || `custom-${Date.now()}-${index}`),
      testCode: String(record.testCode ?? record[['que', 'stCode'].join('')] ?? '').trim(),
      testName: String(record.testName ?? '').trim(),
      specimenType: normalizeSpecimenType(record.specimenType),
      drawContainer: String(record.drawContainer || 'Verify Official Instructions'),
      alternativeContainer: String(record.alternativeContainer || ''),
      transportContainer: cleanTransportContainer(record.transportContainer),
      preferredVolume: String(record.preferredVolume || ''),
      minimumVolume: String(record.minimumVolume || ''),
      transportTemperature: String(record.transportTemperature || 'Not specified'),
      transportTemperatureRaw: String(record.transportTemperatureRaw || ''),
      stability: String(record.stability || ''),
      spin: String(record.spin || 'Verify'),
      specialInstructions: String(record.specialInstructions || ''),
      status: record.status === 'blocked' ? 'blocked' : 'active',
      source: String(record.source || 'Custom entry'),
      sourceRow: record.sourceRow || null
    };
  }

  function cleanTransportContainer(value) {
    return String(value || '')
      .trim()
      .replace(/^labeled\s+transport\s+tube\s*\(local workflow;\s*verify\s+[a-z]+\)$/i, 'Transport tube (verify official instructions)')
      .replace(/^labeled\s+transport\s+tube$/i, 'Transport tube')
      .replace(/\blabeled transport tube\b/gi, 'transport tube')
      .replace(/\s{2,}/g, ' ');
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

  function rankTest(query, test) {
    const raw = query.trim();
    const q = normalizeSearch(raw);
    if (!q) return 0;
    const code = normalizeSearch(test.testCode);
    const name = normalizeSearch(test.testName);
    const searchable = normalizeSearch([
      test.testCode, test.testName, test.specimenType, test.drawContainer,
      test.alternativeContainer, test.transportTemperature, test.specialInstructions
    ].join(' '));
    const leadingCode = raw.match(/^([A-Za-z]*\d+[A-Za-z0-9-]*)\b/);

    if (code && q === code) return 1000;
    if (leadingCode && normalizeSearch(leadingCode[1]) === code) return 970 + (name.includes(q.replace(code, '').trim()) ? 10 : 0);
    if (q === name) return 930;
    if (name.startsWith(q)) return 850 - Math.min(100, name.length - q.length);
    if (name.includes(q)) return 780 - Math.min(120, name.length - q.length);

    const tokens = q.split(' ').filter(Boolean);
    const nameTokens = new Set(name.split(' ').filter(Boolean));
    const allInName = tokens.every(token => name.includes(token));
    if (allInName) return 690 + tokens.length * 12;
    const allAnywhere = tokens.every(token => searchable.includes(token));
    if (allAnywhere) return 560 + tokens.length * 8;
    const overlap = tokens.filter(token => nameTokens.has(token) || name.includes(token)).length;
    if (overlap) return 260 + overlap * 70;
    return 0;
  }

  function findMatches(query, limit = 5) {
    return database
      .map(test => ({ test, score: rankTest(query, test) }))
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score || a.test.testName.localeCompare(b.test.testName))
      .slice(0, limit);
  }

  function renderBatch(addBest) {
    const queries = parseQueries(els.searchInput.value);
    if (!queries.length) {
      showToast('Enter at least one test name or code.');
      els.searchInput.focus();
      return;
    }

    const rows = queries.map(query => ({ query, matches: findMatches(query, 3) }));
    if (addBest) {
      let added = 0;
      rows.forEach(row => {
        const best = row.matches[0];
        if (best && best.score >= 330 && best.test.status !== 'blocked') {
          if (addSelected(best.test.id, false)) added += 1;
        }
      });
      saveSelected();
      renderOrder();
      showToast(`${added} ${added === 1 ? 'test' : 'tests'} added to the summary.`);
    }

    const matchedCount = rows.filter(row => row.matches.length).length;
    els.batchResults.classList.remove('hidden');
    els.batchResults.innerHTML = `
      <div class="panel-heading">
        <div><h2>Batch matches</h2><p>${matchedCount} of ${rows.length} lines found a possible match. Review ambiguous names before collection.</p></div>
      </div>
      <div class="batch-grid">
        ${rows.map(renderBatchRow).join('')}
      </div>`;
  }

  function renderBatchRow(row) {
    if (!row.matches.length) {
      return `<div class="batch-row unmatched"><div class="batch-query">${escapeHtml(row.query)}</div><div class="batch-match">No local match found<small>Search the full official test directory, then add the verified collection details.</small></div><div class="batch-unmatched-actions"><a class="mini-button edit" href="${escapeAttr(directorySearchUrl(row.query))}" target="_blank" rel="noreferrer">Search Official Directory ↗</a><button class="mini-button edit" data-action="new-from-query" data-query="${escapeAttr(row.query)}">Add missing test</button></div></div>`;
    }
    const best = row.matches[0];
    const alternatives = row.matches.slice(1).map(item => `${item.test.testCode} ${item.test.testName}`).join(' · ');
    const blocked = best.test.status === 'blocked';
    return `<div class="batch-row ${blocked ? 'unmatched' : ''}">
      <div class="batch-query">${escapeHtml(row.query)}</div>
      <div class="batch-match"><strong>${escapeHtml(displayCode(best.test))} · ${escapeHtml(best.test.testName)}</strong>
        <small>${blocked ? 'Marked do not perform. ' : ''}${specimenBadge(best.test.specimenType)} · ${escapeHtml(best.test.drawContainer)}${alternatives ? `<br>Other matches: ${escapeHtml(alternatives)}` : ''}</small>
      </div>
      <button class="mini-button" data-action="add" data-id="${escapeAttr(best.test.id)}" ${blocked ? 'disabled' : ''}>${selectedIds.includes(best.test.id) ? 'Added' : 'Add'}</button>
    </div>`;
  }

  function renderLibrary() {
    const filter = normalizeSearch(els.libraryFilter.value);
    const temperature = els.tempFilter.value;
    const showBlocked = els.showBlocked.checked;
    const filtered = database.filter(test => {
      if (!showBlocked && test.status === 'blocked') return false;
      if (temperature && test.transportTemperature !== temperature) return false;
      if (!filter) return true;
      const haystack = normalizeSearch([
        test.testCode, test.testName, test.specimenType, test.drawContainer, test.alternativeContainer,
        test.transportContainer, test.transportTemperature, test.specialInstructions
      ].join(' '));
      return filter.split(' ').every(token => haystack.includes(token));
    });

    const shown = filtered.slice(0, libraryLimit);
    els.libraryBody.innerHTML = shown.length ? shown.map(renderLibraryRow).join('') : `<tr><td colspan="6" class="empty-state">No tests match these filters.</td></tr>`;
    els.libraryStatus.textContent = `Showing ${shown.length} of ${filtered.length}`;
    els.loadMoreButton.classList.toggle('hidden', shown.length >= filtered.length);
  }

  function renderLibraryRow(test) {
    const selected = selectedIds.includes(test.id);
    const blocked = test.status === 'blocked';
    return `<tr>
      <td class="code-cell">${escapeHtml(displayCode(test))}</td>
      <td><div class="test-name">${escapeHtml(test.testName)}</div><div class="subtext">${escapeHtml(truncate(test.specialInstructions, 95))}</div></td>
      <td><span class="badge tube ${tubeClass(test.drawContainer)}">${escapeHtml(test.drawContainer)}</span><div class="subtext specimen-line">${specimenBadge(test.specimenType)}${test.alternativeContainer ? ` <span>· Alt: ${escapeHtml(test.alternativeContainer)}</span>` : ''}</div></td>
      <td><span class="badge ${temperatureClass(test.transportTemperature)}">${escapeHtml(test.transportTemperature)}</span></td>
      <td><span class="preferred-volume-chip">${escapeHtml(test.preferredVolume || 'Verify')}</span><div class="subtext">Minimum: ${escapeHtml(test.minimumVolume || '—')}</div></td>
      <td class="row-actions">
        ${blocked ? '<span class="badge temp-unknown">Do not perform</span>' : `<button class="mini-button" data-action="add" data-id="${escapeAttr(test.id)}">${selected ? 'Added' : 'Add'}</button>`}
        <button class="mini-button edit" data-action="edit" data-id="${escapeAttr(test.id)}">Edit</button><a class="mini-button edit" href="${escapeAttr(directoryUrl(test))}" target="_blank" rel="noreferrer">Official directory ↗</a>
      </td>
    </tr>`;
  }

  function handleLibraryClick(event) {
    const button = event.target.closest('button[data-action]');
    if (!button) return;
    const id = button.dataset.id;
    if (button.dataset.action === 'add') {
      addSelected(id);
      button.textContent = 'Added';
    } else if (button.dataset.action === 'edit') {
      openDialog(database.find(test => test.id === id));
    }
  }

  function handleBatchClick(event) {
    const button = event.target.closest('button[data-action]');
    if (!button) return;
    if (button.dataset.action === 'add') {
      addSelected(button.dataset.id);
      renderBatch(false);
    } else if (button.dataset.action === 'new-from-query') {
      openDialog({ testName: button.dataset.query }, { addToSummary: true });
    }
  }

  function handleSelectedClick(event) {
    const button = event.target.closest('button[data-action]');
    if (!button) return;
    if (button.dataset.action === 'remove') removeSelected(button.dataset.id);
    if (button.dataset.action === 'edit') openDialog(database.find(test => test.id === button.dataset.id));
  }

  function addSelected(id, rerender = true) {
    const test = database.find(item => item.id === id);
    if (!test || test.status === 'blocked') return false;
    if (selectedIds.includes(id)) return false;
    selectedIds.push(id);
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
    saveSelected();
    renderOrder();
    renderLibrary();
  }

  function clearOrder() {
    if (!selectedIds.length) return;
    if (!window.confirm('Clear all selected tests from this summary?')) return;
    selectedIds = [];
    saveSelected();
    renderOrder();
    renderLibrary();
  }

  function saveSelected() {
    localStorage.setItem(SELECTED_KEY, JSON.stringify(selectedIds));
  }

  function selectedTests() {
    return selectedIds.map(id => database.find(test => test.id === id)).filter(Boolean);
  }

  function renderOrder() {
    const tests = selectedTests();
    els.selectedCount.textContent = tests.length;
    renderDrawPlan(tests);
    renderOrderOfDraw(tests);
    renderAlerts(tests);
    if (!tests.length) {
      els.selectedList.className = 'selected-list empty-state';
      els.selectedList.textContent = 'No tests selected.';
      return;
    }
    els.selectedList.className = 'selected-list';
    els.selectedList.innerHTML = tests.map(test => `
      <article class="selected-card">
        <div class="selected-card-top">
          <div><div class="test-name">${escapeHtml(displayCode(test))} · ${escapeHtml(test.testName)}</div><div class="subtext specimen-line">${specimenBadge(test.specimenType)} <span>·</span> <span class="preferred-volume-inline">Preferred ${escapeHtml(test.preferredVolume || 'verify')}</span> <span>· Minimum ${escapeHtml(test.minimumVolume || 'verify')}</span></div></div>
          <div><a class="mini-button edit" href="${escapeAttr(directoryUrl(test))}" target="_blank" rel="noreferrer">Official directory ↗</a><button class="mini-button edit" data-action="edit" data-id="${escapeAttr(test.id)}">Edit</button><button class="mini-button remove" data-action="remove" data-id="${escapeAttr(test.id)}">Remove</button></div>
        </div>
        <div class="selected-details">
          <span class="badge tube ${tubeClass(test.drawContainer)}">${escapeHtml(test.drawContainer)}</span>
          <span class="badge ${temperatureClass(test.transportTemperature)}">${escapeHtml(test.transportTemperature)}</span>
          <span class="badge temp-unknown">Spin: ${escapeHtml(test.spin)}</span>
        </div>
        ${test.specialInstructions ? `<div class="selected-note">${escapeHtml(truncate(test.specialInstructions, 190))}</div>` : ''}
      </article>`).join('');
  }

  function buildDrawGroups(tests) {
    const groups = new Map();
    tests.forEach(test => {
      const key = test.drawContainer || 'Verify Official Instructions';
      if (!groups.has(key)) groups.set(key, { container: key, tests: [], specimenTypes: new Set(), minimumMl: 0, volumeCount: 0 });
      const group = groups.get(key);
      group.tests.push(test);
      group.specimenTypes.add(test.specimenType);
      const ml = parseSimpleMl(test.minimumVolume);
      if (ml !== null) { group.minimumMl += ml; group.volumeCount += 1; }
    });
    return Array.from(groups.values()).sort((a, b) => a.container.localeCompare(b.container));
  }

  function renderDrawPlan(tests) {
    if (!tests.length) {
      els.drawPlan.className = 'draw-plan empty-state';
      els.drawPlan.textContent = 'Add tests to see the draw plan.';
      return;
    }
    const groups = buildDrawGroups(tests);
    els.drawPlan.className = 'draw-plan';
    els.drawPlan.innerHTML = groups.map(group => {
      const volume = group.volumeCount ? ` · listed minimum total ${formatMl(group.minimumMl)}` : '';
      return `<div class="draw-card"><strong class="tube ${tubeClass(group.container)}">${escapeHtml(group.container)}</strong><strong>${group.tests.length} ${group.tests.length === 1 ? 'test' : 'tests'}</strong><div class="draw-meta specimen-line">${Array.from(group.specimenTypes).map(type => specimenBadge(type)).join(' ')}${volume ? `<span>${escapeHtml(volume)}</span>` : ''}</div><div class="draw-meta">Verify dedicated-tube requirements</div></div>`;
    }).join('');
  }

  function orderCategory(test) {
    // The order-of-draw panel is for blood collection tubes only. Urine culture
    // preservative tubes may also have gray caps, but they are not fluoride/oxalate
    // blood tubes and must never appear in the blood-tube order of draw.
    const specimen = String(test.specimenType || '').toLowerCase();
    if (/urine|stool|swab|saliva|semen|csf|cerebrospinal|tissue/.test(specimen)) return null;

    const value = `${test.drawContainer || ''} ${test.alternativeContainer || ''}`.toLowerCase();
    if (/blood culture|culture bottle|bactec|\bsps\b/.test(value)) return 'culture';
    if (/light blue|sodium citrate|coagulation tube/.test(value)) return 'citrate';
    if (/acid citrate dextrose|\bacd\b/.test(value)) return 'acd';
    if (/royal blue/.test(value)) return 'royal';
    if (/gray|grey|fluoride|oxalate/.test(value)) return 'gray';
    if (/sst|gold|serum separator|red\s*\/\s*black/.test(value)) return 'sst';
    if (/green|heparin|\bpst\b/.test(value)) return 'heparin';
    if (/lavender|purple|pink|\bedta\b|tan top/.test(value)) return 'edta';
    if (/red top|plain red|no gel|serum tube|^red$/.test(value.trim())) return 'serum';
    return null;
  }

  function renderOrderOfDraw(tests) {
    const selectedCategories = new Set(tests.map(orderCategory).filter(Boolean));
    els.orderOfDraw.innerHTML = ORDER_OF_DRAW.map(step => {
      const selected = selectedCategories.has(step.key);
      return `<div class="order-step ${selected ? 'is-selected' : ''}">
        <span class="order-number">${step.number}</span>
        <span class="order-tube tube ${step.tubeClass}">${escapeHtml(step.label)}</span>
        <span class="order-additive">${escapeHtml(step.additive)}</span>
        ${selected ? '<span class="order-selected">IN DRAW PLAN</span>' : ''}
      </div>`;
    }).join('');
  }

  function printOrderOfDraw(tests) {
    const selectedCategories = new Set(tests.map(orderCategory).filter(Boolean));
    return `<section class="print-order-section">
      <div class="print-section-heading"><strong>Nurse order of draw</strong><span>Standard sequence for multiple blood tubes</span></div>
      <div class="print-order-strip">${ORDER_OF_DRAW.map(step => `<div class="print-order-step ${selectedCategories.has(step.key) ? 'is-selected' : ''}"><span class="print-order-number">${step.number}</span><strong class="print-order-tube tube ${step.tubeClass}">${escapeHtml(step.label)}</strong><span>${escapeHtml(step.additive)}</span></div>`).join('')}</div>
      <div class="print-order-note"><strong>Butterfly:</strong> If light blue is first, use a partially filled citrate discard tube to fill tubing dead space, then fill the test tube completely. Confirm additives on tube labels; do not rely on stopper color alone. Follow test-specific official instructions and facility policy.</div>
    </section>`;
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
    els.collectionAlerts.innerHTML = alerts.map(alert => `<div class="alert ${alert.type === 'danger' ? 'danger' : ''}">${escapeHtml(alert.text)}</div>`).join('');
  }

  function openDialog(test = null, options = {}) {
    const isExisting = Boolean(test && test.id);
    const record = normalizeRecord(test || {});
    els.dialogTitle.textContent = isExisting ? 'Edit test' : 'Add missing test';
    els.testId.value = isExisting ? record.id : '';
    els.testCode.value = record.testCode;
    els.testName.value = record.testName;
    setSelectValue(els.specimenType, record.specimenType, 'Other / Verify');
    setDrawContainerValue(record.drawContainer === 'Verify Official Instructions' && !isExisting ? '' : record.drawContainer);
    els.alternativeContainer.value = record.alternativeContainer;
    els.transportContainer.value = record.transportContainer;
    els.preferredVolume.value = record.preferredVolume;
    els.minimumVolume.value = record.minimumVolume;
    setSelectValue(els.transportTemperature, record.transportTemperature, 'Not specified');
    els.transportTemperatureRaw.value = record.transportTemperatureRaw;
    els.stability.value = record.stability;
    setSelectValue(els.spin, record.spin, 'Verify');
    els.specialInstructions.value = record.specialInstructions;
    els.blockedStatus.checked = record.status === 'blocked';
    els.addToSummary.checked = options.addToSummary !== false;
    els.addToSummaryRow.classList.toggle('hidden', isExisting);
    els.saveTestButton.textContent = isExisting ? 'Save changes' : 'Save test';
    els.deleteTestButton.classList.toggle('hidden', !isExisting || !record.id.startsWith('custom-'));
    els.testDialog.showModal();
    setTimeout(() => (isExisting ? els.testName : els.testCode).focus(), 0);
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
      transportContainer: els.transportContainer.value,
      preferredVolume: els.preferredVolume.value,
      minimumVolume: els.minimumVolume.value,
      transportTemperature: els.transportTemperature.value,
      transportTemperatureRaw: els.transportTemperatureRaw.value,
      stability: els.stability.value,
      spin: els.spin.value,
      specialInstructions: els.specialInstructions.value,
      status: els.blockedStatus.checked ? 'blocked' : 'active',
      source: existingIndex >= 0 ? database[existingIndex].source : 'Custom entry',
      sourceRow: existingIndex >= 0 ? database[existingIndex].sourceRow : null
    });
    if (!record.testName) {
      showToast('Enter a test name before saving.');
      els.testName.focus();
      return;
    }
    if (existingIndex >= 0) database[existingIndex] = record;
    else database.unshift(record);

    const shouldAdd = existingIndex < 0 && els.addToSummary.checked && record.status !== 'blocked';
    if (shouldAdd && !selectedIds.includes(record.id)) {
      selectedIds.push(record.id);
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
    persistDatabase();
    saveSelected();
    closeDialog();
    renderAll();
    showToast('Custom test deleted.');
  }

  function persistDatabase() {
    localStorage.setItem(DB_KEY, JSON.stringify(database));
    els.recordCount.textContent = `${database.length} local tests`;
  }


  function transportBagInfo(test) {
    const value = `${test.transportTemperature || ''} ${test.transportTemperatureRaw || ''}`.toLowerCase();
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
    return wordMatch ? words[wordMatch[1]] : 0;
  }

  function requiresDedicatedSst(test) {
    const text = `${test.drawContainer || ''} ${test.transportContainer || ''} ${test.specialInstructions || ''}`.toLowerCase();
    return /dedicated|own tube|separate (?:sst|gold|tube)|do not share|full sst|full gold|each tube|individual tube/.test(text)
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

      if (requiresDedicatedSst(test)) {
        const calculated = plannedMl === null ? 1 : Math.ceil(plannedMl / SST_USABLE_ML_PER_TUBE);
        dedicatedTubes += Math.max(explicitCount, calculated, 1);
      } else if (plannedMl !== null) {
        sharedMl += plannedMl;
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

  function buildTransportBagPlan(tests) {
    const bags = new Map();
    tests.forEach(test => {
      const info = transportBagInfo(test);
      if (!bags.has(info.key)) bags.set(info.key, { ...info, tests: [] });
      bags.get(info.key).tests.push(test);
    });

    return Array.from(bags.values())
      .sort((a, b) => a.order - b.order)
      .map(bag => ({ ...bag, sstEstimate: sstEstimateForTests(bag.tests) }));
  }

  function isUrineTest(test) {
    return /urine/.test(String(test.specimenType || '').toLowerCase());
  }

  function isTimedUrineTest(test) {
    if (!isUrineTest(test)) return false;
    const text = `${test.testName || ''} ${test.drawContainer || ''} ${test.specialInstructions || ''}`.toLowerCase();
    return /24\s*[- ]?hour|24\s*hr|timed urine|timed collection/.test(text);
  }

  function uniqueTests(tests) {
    const seen = new Set();
    return tests.filter(test => {
      if (seen.has(test.id)) return false;
      seen.add(test.id);
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
      'tube-lavender': 'Lavender EDTA',
      'tube-pink': 'Pink EDTA',
      'tube-green': 'Green Heparin',
      'tube-red': 'Red Top',
      'tube-royal': 'Royal Blue',
      'tube-gray': 'Gray Fluoride / Oxalate Blood Tube',
      'tube-yellow': 'Yellow ACD',
      'tube-aptima': 'Aptima Multitest Transport Tube (orange label)',
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
    const draw = String(test.drawContainer || '').toLowerCase();
    const note = String(test.specialInstructions || '').toLowerCase();
    const countPattern = '(\\d+|one|two|three|four|five|six|seven|eight)';
    let match = draw.match(new RegExp(`\\b${countPattern}\\s+(?:full\\s+)?(?:[a-z][a-z /-]{0,35}\\s+)?(?:tubes?|bottles?|containers?)\\b`));
    if (!match) match = note.match(new RegExp(`\\b(?:draw|collect|use|requires?)\\D{0,18}${countPattern}\\s+(?:full\\s+)?(?:[a-z][a-z /-]{0,35}\\s+)?(?:tubes?|bottles?|containers?)\\b`));
    return match ? Math.max(numberWordValue(match[1]), 1) : 1;
  }

  function buildCollectionPlan(tests, bags) {
    const items = [];
    const sstTests = tests.filter(isSstDraw);
    const totalSst = bags.reduce((sum, bag) => sum + bag.sstEstimate.totalTubes, 0);
    if (totalSst > 0) {
      const breakdown = bags
        .filter(bag => bag.sstEstimate.totalTubes > 0)
        .map(bag => `${bag.label.replace(/ bag$/i, '')}: ${bag.sstEstimate.totalTubes}`)
        .join(' · ');
      items.push({ key: 'sst', label: 'Gold / SST', className: 'tube-sst', count: totalSst, tests: uniqueTests(sstTests), detail: breakdown });
    }

    const spotUrineTests = tests.filter(test => isUrineTest(test) && !isTimedUrineTest(test));
    if (spotUrineTests.length) {
      items.push({
        key: 'sterile-urine-cup',
        label: 'Sterile Urine Cup',
        className: 'tube-urine-cup',
        count: 1,
        tests: uniqueTests(spotUrineTests),
        detail: 'Collect the urine in the sterile cup first, then fill any required preservative or transport tubes.'
      });
    }

    const grouped = new Map();
    tests.forEach(test => {
      if (isSstDraw(test)) return;
      if (isUrineTest(test) && !isTimedUrineTest(test)) return;
      const info = canonicalCollectionContainer(test);
      if (!grouped.has(info.key)) grouped.set(info.key, { ...info, count: 0, tests: [], detail: '' });
      const item = grouped.get(info.key);
      item.count += explicitCollectionCount(test);
      item.tests.push(test);
    });

    grouped.forEach(item => {
      item.tests = uniqueTests(item.tests);
      items.push(item);
    });
    return items;
  }

  function shortDrawSource(test) {
    const draw = String(test.drawContainer || '').trim();
    if (/sst|gold/i.test(draw)) return 'SST';
    if (/lavender|edta/i.test(draw)) return 'Lavender EDTA';
    if (/green|heparin/i.test(draw)) return 'Green Heparin';
    if (/red/i.test(draw)) return 'Red Top';
    if (/light blue|citrate/i.test(draw)) return 'Light Blue Citrate';
    if (/royal/i.test(draw)) return 'Royal Blue';
    if (/aptima/i.test(draw)) return 'Aptima Multitest';
    return draw && !/^verify/i.test(draw) ? draw : '';
  }

  function explicitSubmissionCount(test) {
    const text = `${test.transportContainer || ''} ${test.preferredVolume || ''} ${test.specialInstructions || ''}`.toLowerCase();
    const countPattern = '(\\d+|one|two|three|four|five|six|seven|eight)';
    const pattern = new RegExp(`\\b${countPattern}\\s*(?:x|×)?\\s*(?:separate\\s+)?(?:frozen\\s+)?(?:aliquots?|transport tubes?|cryovials?|tubes?|containers?)\\b`);
    const match = text.match(pattern);
    return match ? Math.max(numberWordValue(match[1]), 1) : 1;
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

  function transportTubeClass(test, container) {
    const value = String(container || '').toLowerCase();
    const specimen = normalizeSpecimenType(test.specimenType).toLowerCase();
    const specimenAndContainer = `${specimen} ${value}`;
    const isStandardSerumOrPlasma = /\b(?:serum|plasma)\b/.test(specimenAndContainer);
    const isSpecialtyMetalContainer = /acid[- ]?washed|acid[- ]?rinsed|metal[- ]?free|trace[- ]?metal/.test(value);

    if (/aptima/.test(value)) return 'tube-aptima';

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
    if (String(test.testCode || '') === '3020' || (/red\s*\/\s*yellow|red-yellow|swirl/.test(combined) && /gray|grey/.test(combined) && /urine|culture/.test(combined))) {
      return [
        { key: 'ua-swirl', label: 'Red/Yellow Swirl UA Preservative Tube', className: 'tube-ua-swirl', count: 1, detail: 'Urine in preservative tube' },
        { key: 'urine-culture', label: 'Gray-Top Urine Culture Preservative Tube', className: 'tube-urine-culture', count: 1, detail: 'Urine in culture preservative tube' }
      ];
    }

    if (isOriginalContainerSubmission(test)) return [originalContainerSubmission(test)];

    const specimen = titleCaseSpecimen(normalizeSpecimenType(test.specimenType));
    const sourceSpecimen = specificSpecimenSource(test);
    const sourceTube = shortDrawSource(test);
    if (/transport tube|aliquot|cryovial|screw[- ]?cap|pour[- ]?off/i.test(transport)) {
      const sourcePhrase = sourceTube ? `${specimen} from ${sourceTube}` : sourceSpecimen;
      const isSwab = /swab/i.test(sourceSpecimen);
      const isSpecialtyMetalContainer = /acid[- ]?washed|acid[- ]?rinsed|metal[- ]?free|trace[- ]?metal/i.test(transport);
      const label = isSwab
        ? 'Swab Transport Tube'
        : (isSpecialtyMetalContainer ? `Acid-Washed / Metal-Free ${specimen} Transport Tube` : `${specimen} Transport Tube`);
      return [{
        key: `transport|${normalizeSearch(sourcePhrase)}|${normalizeSearch(transport)}`,
        label,
        className: transportTubeClass(test, transport),
        count: explicitSubmissionCount(test),
        detail: isSwab ? `${sourceSpecimen} in transport tube` : sourcePhrase
      }];
    }

    return [{
      key: `container|${normalizeSearch(transport)}|${normalizeSearch(sourceSpecimen)}`,
      label: transport || 'Verify Submission Container',
      className: transportTubeClass(test, transport),
      count: explicitSubmissionCount(test),
      detail: sourceSpecimen
    }];
  }

  function isSpunSstSubmission(test) {
    const transport = finalTransportContainer(test).toLowerCase();
    return isSstDraw(test) && /sst|gold|serum separator/.test(transport) && !/transport tube|aliquot|cryovial/.test(transport);
  }

  function buildSubmissionContents(bag) {
    const items = new Map();
    const spunSstTests = bag.tests.filter(isSpunSstSubmission);
    const spunEstimate = sstEstimateForTests(spunSstTests);
    if (spunEstimate.totalTubes > 0) {
      items.set('sst-spun', {
        key: 'sst-spun',
        label: 'SST / Gold',
        className: 'tube-sst',
        count: spunEstimate.totalTubes,
        detail: 'Serum · spun · submit in original tube',
        originalTube: true,
        tests: uniqueTests(spunSstTests)
      });
    }

    bag.tests.forEach(test => {
      if (isSpunSstSubmission(test)) return;
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

  function testReferences(tests) {
    return uniqueTests(tests).map(test => `<li><strong>${escapeHtml(displayCode(test))}</strong> ${escapeHtml(test.testName)}</li>`).join('');
  }

  function printContainerBadges(test) {
    const value = String(test.transportContainer || '').trim();
    const lower = value.toLowerCase();
    if ((/red\s*\/\s*yellow|red-yellow|swirl/.test(lower)) && /gray|grey/.test(lower) && /urine|culture/.test(lower)) {
      return `<span class="print-tube-badge tube tube-ua-swirl">Red/Yellow Swirl UA Tube</span><br><span class="print-tube-badge tube tube-urine-culture">Gray-Top Urine Culture Tube</span>`;
    }
    const sourceSpecimen = specificSpecimenSource(test);
    const sourceTube = shortDrawSource(test);
    const specimen = titleCaseSpecimen(normalizeSpecimenType(test.specimenType));
    const sourceText = /transport tube|aliquot|cryovial|screw[- ]?cap|pour[- ]?off/i.test(value)
      ? (/swab/i.test(sourceSpecimen) ? sourceSpecimen : (sourceTube ? `${specimen} from ${sourceTube}` : sourceSpecimen))
      : sourceSpecimen;
    return `<span class="print-tube-badge tube ${transportTubeClass(test, value)}">${escapeHtml(value || 'Verify')}</span>${sourceText ? `<div class="print-transport-source">${escapeHtml(sourceText)}</div>` : ''}`;
  }

  function printCollectionSubmissionPlan(tests) {
    const bags = buildTransportBagPlan(tests);
    const collectionItems = buildCollectionPlan(tests, bags);
    const totalCollect = collectionItems.reduce((sum, item) => sum + item.count, 0);
    const bagLabels = bags.map(bag => `<span class="print-bag-pill ${bag.className}">${escapeHtml(bag.label)}</span>`).join('');

    return `<section class="print-logistics-plan">
      <div class="print-logistics-heading"><strong>Collection and submission plan</strong><span>Collection containers are separated from processed specimens placed into transport bags.</span></div>
      <div class="print-logistics-totals">
        <div class="print-total-box collect-total"><span>TOTAL TO COLLECT</span><strong>${totalCollect}</strong><small>tubes / collection containers</small></div>
        <div class="print-collect-chips">${collectionItems.map(item => `<span class="print-collect-chip tube ${item.className}"><b>${item.count}</b> ${escapeHtml(item.label)}</span>`).join('')}</div>
        <div class="print-total-box submit-total"><span>TOTAL TO SUBMIT</span><strong>${bags.length}</strong><small>${bags.length === 1 ? 'transport bag' : 'transport bags'}</small></div>
        <div class="print-submit-bags">${bagLabels}</div>
      </div>

      ${printOrderOfDraw(tests)}

      <div class="print-logistics-subheading">What to collect</div>
      <div class="print-collection-grid">${collectionItems.map(item => `<article class="print-collection-card">
        <div class="print-container-count"><strong>${item.count}</strong><span class="tube ${item.className}">${escapeHtml(item.label)}</span></div>
        ${item.detail ? `<div class="print-container-detail">${escapeHtml(item.detail)}</div>` : ''}
        <div class="print-for-tests"><b>For tests:</b><ul>${testReferences(item.tests)}</ul></div>
      </article>`).join('')}</div>

      <section class="print-submit-section">
        <div class="print-submit-heading">
          <strong>What to submit after processing</strong>
          <span>Keep each temperature group in its own transport bag.</span>
        </div>
        <div class="print-bag-grid">${bags.map(bag => {
          const contents = buildSubmissionContents(bag);
          const totalContainers = contents.reduce((sum, item) => sum + item.count, 0);
          return `<article class="print-bag-card ${bag.className}">
            <div class="print-bag-card-header"><div><strong>${escapeHtml(bag.label)}</strong><span>Keep separate from other temperatures</span></div><div class="print-bag-container-total"><strong>${totalContainers}</strong><span>containers</span></div></div>
            <div class="print-submit-content">${contents.map(item => `<div class="print-submit-item${item.originalTube ? ' original-tube-submit' : ''}">
              <div class="print-submit-item-title"><strong>${item.count}</strong><span class="tube ${item.className}">${escapeHtml(item.label)}</span></div>
              ${item.detail ? `<div class="print-submit-item-detail">${escapeHtml(item.detail)}</div>` : ''}
              <div class="print-for-tests"><b>For tests:</b><ul>${testReferences(item.tests)}</ul></div>
            </div>`).join('')}</div>
          </article>`;
        }).join('')}</div>
      </section>
      <div class="print-bag-note"><strong>Planning rules:</strong> SST collection assumes 2 mL of usable serum/plasma per tube and rounds up independently by transport temperature. Routine non-SST blood tubes are estimated as one tube per test unless the record specifies more. Spot urine tests add one sterile urine cup for initial collection; timed or 24-hour urine collections follow their test-specific container instructions. Submission contents reflect the processed specimen or transport container and identify the tests assigned to each item. Specimens submitted in their original collection tube keep the same tube badge and are marked “submit in original tube.” Verify specialty, dedicated-tube, aliquot, and actual-yield requirements before collection.</div>
    </section>`;
  }


  function printSummary() {
    const tests = selectedTests();
    if (!tests.length) return showToast('Add at least one test before printing.');
    const alerts = collectAlerts(tests);
    els.printSheet.innerHTML = `
      <div class="print-header">
        <div><h1 class="print-title">Lab Collection Summary</h1><div class="print-subtitle">Send-out workflow</div></div>
        <div class="print-meta">Generated ${escapeHtml(new Date().toLocaleString())}<br>${tests.length} selected tests</div>
      </div>
      ${alerts.length ? `<div class="print-alerts">${alerts.map(alert => `<div>${escapeHtml(alert.text)}</div>`).join('')}</div>` : ''}
      <table class="print-table">
        <colgroup><col style="width:6%"><col style="width:14%"><col style="width:7%"><col style="width:10%"><col style="width:10%"><col style="width:5%"><col style="width:8%"><col style="width:7%"><col style="width:8%"><col style="width:25%"></colgroup>
        <thead><tr><th>Code</th><th>Test</th><th>Specimen</th><th>Draw container</th><th>Transport tube</th><th>Spin</th><th>Temperature</th><th>Volume</th><th>Stability</th><th>Special handling</th></tr></thead>
        <tbody>${tests.map(test => `<tr><td>${escapeHtml(displayCode(test))}</td><td><strong>${escapeHtml(test.testName)}</strong>${test.alternativeContainer ? `<br>Alt: <span class="print-inline-tube tube ${tubeClass(test.alternativeContainer)}">${escapeHtml(test.alternativeContainer)}</span>` : ''}</td><td>${specimenBadge(test.specimenType, 'print-specimen-badge')}</td><td><span class="print-tube-badge tube ${tubeClass(test.drawContainer)}">${escapeHtml(test.drawContainer)}</span></td><td>${printContainerBadges(test)}</td><td>${escapeHtml(test.spin)}</td><td><span class="print-temp-badge ${temperatureClass(test.transportTemperature)}">${escapeHtml(test.transportTemperature)}</span></td><td><span class="print-preferred-volume">Preferred: ${escapeHtml(test.preferredVolume || 'Verify')}</span><br><span class="print-minimum-volume">Minimum: ${escapeHtml(test.minimumVolume || '—')}</span></td><td>${escapeHtml(test.stability || 'Verify')}</td><td>${escapeHtml(test.specialInstructions || '—')}</td></tr>`).join('')}</tbody>
      </table>
      ${printCollectionSubmissionPlan(tests)}
      <div class="print-footer"><strong>Missing entry?</strong> Contact Sam for any missing entries you would like added. <strong>Source check:</strong> For every swab and transport tube, confirm the specimen source, such as throat swab, serum from SST, or plasma from Lavender EDTA. Verify current specimen requirements, service-area availability, rejection criteria, dedicated-tube requirements, and actual specimen yield in the official test directory before collection. Order-of-draw sources: the official order-of-draw reference; pink is grouped with the EDTA step based on BD tube labeling. The SST estimate uses the preferred volume when parseable, otherwise the minimum volume, and keeps transport temperatures separate.</div>
      <div class="print-ownership"><strong>Copyright and ownership:</strong> Copyright © 2026 Sam Hay. All rights reserved. Independently developed and maintained by Sam Hay as a personal software project and hosted through a personally controlled account. No license or ownership interest is granted except through Sam Hay’s express written authorization. Use by any organization does not, by itself, transfer ownership of the software or source code. Access to this hosted version is provided by permission and may be modified, suspended, or withdrawn by Sam Hay at any time and for any reason.</div>`;
    window.print();
  }

  function exportSummaryCsv() {
    const tests = selectedTests();
    if (!tests.length) return showToast('Add at least one test before exporting.');
    const headers = ['Test Code','Test Name','Specimen Type','Draw Container','Alternative Container','Transport Tube / Container','Preferred Volume','Minimum Volume','Transport Temperature','Raw Temperature','Stability','Spin','Special Instructions'];
    const rows = tests.map(test => [test.testCode,test.testName,test.specimenType,test.drawContainer,test.alternativeContainer,test.transportContainer,test.preferredVolume,test.minimumVolume,test.transportTemperature,test.transportTemperatureRaw,test.stability,test.spin,test.specialInstructions]);
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
    if (/aptima/.test(value)) return 'tube-aptima';
    if (/sterile\s+urine\s+cup|urine\s+collection\s+cup/.test(value)) return 'tube-urine-cup';
    if (/blood culture|culture bottle|bactec|\bsps\b/.test(value)) return 'tube-culture';
    if (value.includes('red/yellow') && (value.includes('gray') || value.includes('grey'))) return 'tube-ua-pair';
    if (/gray|grey/.test(value) && /urine|culture|boric/.test(value)) return 'tube-urine-culture';
    if (value.includes('red/yellow') || value.includes('swirl')) return 'tube-ua-swirl';
    if (value.includes('sst') || value.includes('gold')) return 'tube-sst';
    if (value.includes('lavender')) return 'tube-lavender';
    if (value.includes('heparin') || value.includes('green')) return 'tube-green';
    if (value.includes('red')) return 'tube-red';
    if (value.includes('light blue') || value.includes('citrate')) return 'tube-blue';
    if (value.includes('royal')) return 'tube-royal';
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

  function toggleCustomDrawContainer() {
    const isOther = els.drawContainer.value === '__other__';
    // Keep the manual field visible at all times so it is easy for staff to find.
    els.customDrawContainerRow.classList.remove('hidden');
    els.customDrawContainer.required = isOther;
    els.customDrawContainerRow.classList.toggle('is-active', isOther);
    if (isOther) setTimeout(() => els.customDrawContainer.focus(), 0);
  }

  function handleCustomDrawContainerInput() {
    if (els.customDrawContainer.value.trim()) {
      els.drawContainer.value = '__other__';
      toggleCustomDrawContainer();
    }
  }

  function selectedDrawContainer() {
    if (els.drawContainer.value === '__other__') {
      return els.customDrawContainer.value.trim() || 'Verify Official Instructions';
    }
    return els.drawContainer.value || 'Verify Official Instructions';
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
