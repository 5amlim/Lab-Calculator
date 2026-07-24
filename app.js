(() => {
  'use strict';

  const DB_KEY = 'questLabCalculator.database.v1';
  const SELECTED_KEY = 'questLabCalculator.selected.v1';
  const LABEL_KEY = 'questLabCalculator.orderLabel.v1';
  const PAGE_STEP = 80;

  const $ = (id) => document.getElementById(id);
  const els = {
    recordCount: $('recordCount'), searchInput: $('searchInput'), addBestButton: $('addBestButton'),
    previewButton: $('previewButton'), clearSearchButton: $('clearSearchButton'), batchResults: $('batchResults'),
    libraryFilter: $('libraryFilter'), tempFilter: $('tempFilter'), showBlocked: $('showBlocked'),
    libraryBody: $('libraryBody'), libraryStatus: $('libraryStatus'), loadMoreButton: $('loadMoreButton'),
    addTestButton: $('addTestButton'), exportDbButton: $('exportDbButton'), exportSeedButton: $('exportSeedButton'), importDbInput: $('importDbInput'),
    resetDbButton: $('resetDbButton'), selectedCount: $('selectedCount'), selectedList: $('selectedList'),
    drawPlan: $('drawPlan'), collectionAlerts: $('collectionAlerts'), clearOrderButton: $('clearOrderButton'),
    orderLabel: $('orderLabel'), printButton: $('printButton'), exportSummaryButton: $('exportSummaryButton'),
    printSheet: $('printSheet'), testDialog: $('testDialog'), testForm: $('testForm'), dialogTitle: $('dialogTitle'),
    closeDialogButton: $('closeDialogButton'), cancelDialogButton: $('cancelDialogButton'), deleteTestButton: $('deleteTestButton'),
    testId: $('testId'), questCode: $('questCode'), testName: $('testName'), specimenType: $('specimenType'),
    drawContainer: $('drawContainer'), alternativeContainer: $('alternativeContainer'), transportContainer: $('transportContainer'),
    preferredVolume: $('preferredVolume'), minimumVolume: $('minimumVolume'), transportTemperature: $('transportTemperature'),
    transportTemperatureRaw: $('transportTemperatureRaw'), stability: $('stability'), spin: $('spin'),
    specialInstructions: $('specialInstructions'), blockedStatus: $('blockedStatus'), toast: $('toast')
  };

  let database = loadDatabase();
  let selectedIds = loadJson(SELECTED_KEY, []).filter(id => database.some(t => t.id === id));
  let libraryLimit = PAGE_STEP;
  let toastTimer;

  init();

  function init() {
    els.orderLabel.value = localStorage.getItem(LABEL_KEY) || '';
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
    els.addTestButton.addEventListener('click', () => openDialog());
    els.exportDbButton.addEventListener('click', exportDatabase);
    els.exportSeedButton.addEventListener('click', exportSeedFile);
    els.importDbInput.addEventListener('change', importDatabase);
    els.resetDbButton.addEventListener('click', resetDatabase);
    els.clearOrderButton.addEventListener('click', clearOrder);
    els.orderLabel.addEventListener('input', () => localStorage.setItem(LABEL_KEY, els.orderLabel.value));
    els.printButton.addEventListener('click', printSummary);
    els.exportSummaryButton.addEventListener('click', exportSummaryCsv);
    els.closeDialogButton.addEventListener('click', closeDialog);
    els.cancelDialogButton.addEventListener('click', closeDialog);
    els.testForm.addEventListener('submit', saveTestFromForm);
    els.deleteTestButton.addEventListener('click', deleteCustomTest);
  }

  function renderAll() {
    els.recordCount.textContent = `${database.length} tests`;
    renderLibrary();
    renderOrder();
  }

  function loadDatabase() {
    const seed = (window.SEED_TESTS || []).map(normalizeRecord);
    const stored = loadJson(DB_KEY, null);
    if (!Array.isArray(stored) || !stored.length) return seed;

    // Merge newly published GitHub records into an existing browser database.
    // Local edits win when a code/name pair already exists.
    const merged = new Map(seed.map(test => [databaseKey(test), test]));
    stored.map(normalizeRecord).forEach(test => merged.set(databaseKey(test), test));
    return Array.from(merged.values());
  }

  function databaseKey(test) {
    return `${normalizeSearch(test.questCode)}|${normalizeSearch(test.testName)}`;
  }

  function normalizeRecord(record, index = 0) {
    return {
      id: String(record.id || `custom-${Date.now()}-${index}`),
      questCode: String(record.questCode ?? '').trim(),
      testName: String(record.testName ?? '').trim(),
      specimenType: String(record.specimenType || 'Other / Verify'),
      drawContainer: String(record.drawContainer || 'Verify Quest Instructions'),
      alternativeContainer: String(record.alternativeContainer || ''),
      transportContainer: String(record.transportContainer || ''),
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
    const code = normalizeSearch(test.questCode);
    const name = normalizeSearch(test.testName);
    const searchable = normalizeSearch([
      test.questCode, test.testName, test.specimenType, test.drawContainer,
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
      return `<div class="batch-row unmatched"><div class="batch-query">${escapeHtml(row.query)}</div><div class="batch-match">No match found<small>Add a new test or refine the name.</small></div><button class="mini-button edit" data-action="new-from-query" data-query="${escapeAttr(row.query)}">Add entry</button></div>`;
    }
    const best = row.matches[0];
    const alternatives = row.matches.slice(1).map(item => `${item.test.questCode} ${item.test.testName}`).join(' · ');
    const blocked = best.test.status === 'blocked';
    return `<div class="batch-row ${blocked ? 'unmatched' : ''}">
      <div class="batch-query">${escapeHtml(row.query)}</div>
      <div class="batch-match"><strong>${escapeHtml(best.test.questCode)} · ${escapeHtml(best.test.testName)}</strong>
        <small>${blocked ? 'Marked do not perform. ' : ''}${escapeHtml(best.test.specimenType)} · ${escapeHtml(best.test.drawContainer)}${alternatives ? `<br>Other matches: ${escapeHtml(alternatives)}` : ''}</small>
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
        test.questCode, test.testName, test.specimenType, test.drawContainer, test.alternativeContainer,
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
      <td class="code-cell">${escapeHtml(test.questCode || '—')}</td>
      <td><div class="test-name">${escapeHtml(test.testName)}</div><div class="subtext">${escapeHtml(truncate(test.specialInstructions, 95))}</div></td>
      <td><span class="badge tube ${tubeClass(test.drawContainer)}">${escapeHtml(test.drawContainer)}</span><div class="subtext">${escapeHtml(test.specimenType)}${test.alternativeContainer ? ` · Alt: ${escapeHtml(test.alternativeContainer)}` : ''}</div></td>
      <td><span class="badge ${temperatureClass(test.transportTemperature)}">${escapeHtml(test.transportTemperature)}</span></td>
      <td>${escapeHtml(test.minimumVolume || '—')}</td>
      <td class="row-actions">
        ${blocked ? '<span class="badge temp-unknown">Do not perform</span>' : `<button class="mini-button" data-action="add" data-id="${escapeAttr(test.id)}">${selected ? 'Added' : 'Add'}</button>`}
        <button class="mini-button edit" data-action="edit" data-id="${escapeAttr(test.id)}">Edit</button><a class="mini-button edit" href="${escapeAttr(questUrl(test))}" target="_blank" rel="noreferrer">Quest ↗</a>
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
      openDialog({ testName: button.dataset.query });
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
          <div><div class="test-name">${escapeHtml(test.questCode)} · ${escapeHtml(test.testName)}</div><div class="subtext">${escapeHtml(test.specimenType)} · Minimum ${escapeHtml(test.minimumVolume || 'verify')}</div></div>
          <div><a class="mini-button edit" href="${escapeAttr(questUrl(test))}" target="_blank" rel="noreferrer">Quest ↗</a><button class="mini-button edit" data-action="edit" data-id="${escapeAttr(test.id)}">Edit</button><button class="mini-button remove" data-action="remove" data-id="${escapeAttr(test.id)}">Remove</button></div>
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
      const key = test.drawContainer || 'Verify Quest Instructions';
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
      return `<div class="draw-card"><strong class="tube ${tubeClass(group.container)}">${escapeHtml(group.container)}</strong><strong>${group.tests.length} ${group.tests.length === 1 ? 'test' : 'tests'}</strong><div class="draw-meta">${escapeHtml(Array.from(group.specimenTypes).join(', '))}${volume}</div><div class="draw-meta">Verify dedicated-tube requirements</div></div>`;
    }).join('');
  }

  function collectAlerts(tests) {
    const alerts = [];
    tests.forEach(test => {
      const note = test.specialInstructions.toLowerCase();
      if (test.status === 'blocked') alerts.push({ type: 'danger', text: `${test.testName}: marked do not perform.` });
      if (/own tube|dedicated tube|needs own tube|two separate|full tube|required on label|draw waste|discard tube/.test(note)) alerts.push({ type: 'warning', text: `${test.testName}: dedicated tube, fill, labeling, or discard instructions may apply.` });
      if (/immediately|freeze immediately|centrifuge immediately|stat/.test(note)) alerts.push({ type: 'warning', text: `${test.testName}: time-sensitive processing noted.` });
      if (/protect from light|amber|wrap.*foil/.test(note)) alerts.push({ type: 'warning', text: `${test.testName}: protect from light.` });
      if (/cannot be done on housecall|do not refrigerate|unacceptable|reject/.test(note)) alerts.push({ type: 'danger', text: `${test.testName}: collection or rejection restriction noted.` });
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

  function openDialog(test = null) {
    const isExisting = Boolean(test && test.id);
    const record = normalizeRecord(test || {});
    els.dialogTitle.textContent = isExisting ? 'Edit test' : 'Add test';
    els.testId.value = isExisting ? record.id : '';
    els.questCode.value = record.questCode;
    els.testName.value = record.testName;
    setSelectValue(els.specimenType, record.specimenType, 'Other / Verify');
    els.drawContainer.value = record.drawContainer === 'Verify Quest Instructions' && !isExisting ? '' : record.drawContainer;
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
    els.deleteTestButton.classList.toggle('hidden', !isExisting || !record.id.startsWith('custom-'));
    els.testDialog.showModal();
    setTimeout(() => (isExisting ? els.testName : els.questCode).focus(), 0);
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
      questCode: els.questCode.value,
      testName: els.testName.value,
      specimenType: els.specimenType.value,
      drawContainer: els.drawContainer.value || 'Verify Quest Instructions',
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
    if (!record.questCode || !record.testName) return;
    if (existingIndex >= 0) database[existingIndex] = record;
    else database.unshift(record);
    persistDatabase();
    closeDialog();
    renderAll();
    showToast(existingIndex >= 0 ? 'Test updated.' : 'Test added.');
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
    els.recordCount.textContent = `${database.length} tests`;
  }

  function exportDatabase() {
    downloadBlob(JSON.stringify(database, null, 2), `quest-lab-database-${isoDate()}.json`, 'application/json');
  }

  function exportSeedFile() {
    const content = `// Generated by Quest Lab Calculator on ${new Date().toISOString()}\nwindow.SEED_TESTS = ${JSON.stringify(database, null, 2)};\n`;
    downloadBlob(content, 'data.js', 'text/javascript;charset=utf-8');
    showToast('data.js exported. Replace the file in GitHub to publish your changes.');
  }

  async function importDatabase(event) {
    const file = event.target.files && event.target.files[0];
    event.target.value = '';
    if (!file) return;
    try {
      const parsed = JSON.parse(await file.text());
      const incoming = Array.isArray(parsed) ? parsed : parsed.tests;
      if (!Array.isArray(incoming)) throw new Error('Expected an array of test records.');
      const normalized = incoming.map(normalizeRecord).filter(test => test.questCode && test.testName);
      const merged = new Map(database.map(test => [`${normalizeSearch(test.questCode)}|${normalizeSearch(test.testName)}`, test]));
      normalized.forEach((test, index) => {
        const key = `${normalizeSearch(test.questCode)}|${normalizeSearch(test.testName)}`;
        const previous = merged.get(key);
        if (previous) test.id = previous.id;
        else if (!test.id || database.some(item => item.id === test.id)) test.id = `custom-import-${Date.now()}-${index}`;
        merged.set(key, test);
      });
      database = Array.from(merged.values());
      persistDatabase();
      renderAll();
      showToast(`${normalized.length} imported records merged.`);
    } catch (error) {
      window.alert(`Could not import this file: ${error.message}`);
    }
  }

  function resetDatabase() {
    if (!window.confirm('Reset the local database to the original spreadsheet import? All local edits and custom entries will be removed.')) return;
    database = (window.SEED_TESTS || []).map(normalizeRecord);
    selectedIds = selectedIds.filter(id => database.some(test => test.id === id));
    localStorage.removeItem(DB_KEY);
    saveSelected();
    renderAll();
    showToast('Database reset to the spreadsheet version.');
  }

  function printSummary() {
    const tests = selectedTests();
    if (!tests.length) return showToast('Add at least one test before printing.');
    const groups = buildDrawGroups(tests);
    const alerts = collectAlerts(tests);
    const label = els.orderLabel.value.trim();
    els.printSheet.innerHTML = `
      <div class="print-header">
        <div><h1 class="print-title">Lab Collection Summary</h1><div class="print-subtitle">${label ? escapeHtml(label) : 'Quest send-out workflow'}</div></div>
        <div class="print-meta">Generated ${escapeHtml(new Date().toLocaleString())}<br>${tests.length} selected tests</div>
      </div>
      <div class="print-plan">${groups.map(group => `<div class="print-plan-card"><strong>${escapeHtml(group.container)}</strong>${group.tests.length} ${group.tests.length === 1 ? 'test' : 'tests'} · ${escapeHtml(Array.from(group.specimenTypes).join(', '))}${group.volumeCount ? `<br>Listed minimum total: ${escapeHtml(formatMl(group.minimumMl))}` : ''}</div>`).join('')}</div>
      ${alerts.length ? `<div class="print-alerts">${alerts.map(alert => `<div>${escapeHtml(alert.text)}</div>`).join('')}</div>` : ''}
      <table class="print-table">
        <colgroup><col style="width:6%"><col style="width:14%"><col style="width:7%"><col style="width:10%"><col style="width:10%"><col style="width:5%"><col style="width:8%"><col style="width:7%"><col style="width:8%"><col style="width:25%"></colgroup>
        <thead><tr><th>Code</th><th>Test</th><th>Specimen</th><th>Draw container</th><th>Transfer container</th><th>Spin</th><th>Temperature</th><th>Minimum</th><th>Stability</th><th>Special handling</th></tr></thead>
        <tbody>${tests.map(test => `<tr><td>${escapeHtml(test.questCode)}</td><td><strong>${escapeHtml(test.testName)}</strong>${test.alternativeContainer ? `<br>Alt: ${escapeHtml(test.alternativeContainer)}` : ''}</td><td>${escapeHtml(test.specimenType)}</td><td>${escapeHtml(test.drawContainer)}</td><td>${escapeHtml(test.transportContainer || 'Verify')}</td><td>${escapeHtml(test.spin)}</td><td>${escapeHtml(test.transportTemperature)}${test.transportTemperatureRaw && test.transportTemperatureRaw !== test.transportTemperature ? `<br>${escapeHtml(test.transportTemperatureRaw)}` : ''}</td><td>${escapeHtml(test.minimumVolume || 'Verify')}<br>Preferred: ${escapeHtml(test.preferredVolume || '—')}</td><td>${escapeHtml(test.stability || 'Verify')}</td><td>${escapeHtml(test.specialInstructions || '—')}</td></tr>`).join('')}</tbody>
      </table>
      <div class="print-footer">Verify current specimen requirements, service-area availability, and rejection criteria in the official Quest Test Directory before collection. “Listed minimum total” is a simple sum of parseable minimum-volume fields, not a recommendation for tube count or specimen sharing.</div>`;
    window.print();
  }

  function exportSummaryCsv() {
    const tests = selectedTests();
    if (!tests.length) return showToast('Add at least one test before exporting.');
    const headers = ['Quest Code','Test Name','Specimen Type','Draw Container','Alternative Container','Transport Container','Preferred Volume','Minimum Volume','Transport Temperature','Raw Temperature','Stability','Spin','Special Instructions'];
    const rows = tests.map(test => [test.questCode,test.testName,test.specimenType,test.drawContainer,test.alternativeContainer,test.transportContainer,test.preferredVolume,test.minimumVolume,test.transportTemperature,test.transportTemperatureRaw,test.stability,test.spin,test.specialInstructions]);
    const csv = [headers, ...rows].map(row => row.map(csvCell).join(',')).join('\r\n');
    downloadBlob(csv, `lab-collection-summary-${isoDate()}.csv`, 'text/csv;charset=utf-8');
  }

  function questUrl(test) {
    if (!/^\d+$/.test(test.questCode)) return 'https://testdirectory.questdiagnostics.com/';
    return `https://testdirectory.questdiagnostics.com/test/test-detail/${encodeURIComponent(test.questCode)}/?cc=MASTER&q=${encodeURIComponent(test.questCode)}`;
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
