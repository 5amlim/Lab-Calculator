/* Cedars test-site prototype. Browser state uses a separate key from Quest. */
(function () {
  'use strict';
  const $ = (id) => document.getElementById(id);
  const published = Array.isArray(window.CEDARS_TESTS) ? window.CEDARS_TESTS : [];
  const STORAGE_KEY = 'cedarsCollectionCalculator.state.v1';
  const manual = [];
  const selected = new Set();
  let manualIndex = 0;
  let showCartDetails = false;
  let selectedContainer = '';
  const byId = (id) => published.concat(manual).find((t) => t.id === id);
  const clean = (value) => String(value == null ? '' : value).trim();
  const esc = (value) => clean(value).replace(/[&<>"']/g, (ch) =>
    ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[ch]));
  const norm = (value) => clean(value).toLowerCase().normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
  const compact = (value) => norm(value).replace(/\s/g, '');
  const records = () => published.concat(manual);
  const chosen = () => Array.from(selected).map(byId).filter(Boolean);
  const source = (test) => test.sourceNote || (test.manual ? 'Previously added manual entry (not approved)' : 'Cedars 2023 guide, slide ' + test.slide);
  const isUnknown = (t) => !t.temp || t.temp === 'Verify' || t.temp === 'Room / Refrigerated';
  const transportBucket = (test) => {
    if (test.temp === 'Room Temperature (deliver immediately)') return 'Room temperature · deliver immediately';
    if (test.temp === 'Room Temperature (refrigerate if delayed)') return 'Room temperature · refrigerate if delayed';
    if (test.temp === 'Room Temperature') return 'Room temperature';
    if (test.temp === 'Refrigerated') return 'Refrigerated';
    if (test.temp === 'Frozen') return 'Frozen';
    if (test.temp === 'Room / Refrigerated') return 'Room or refrigerated: select after confirming stability';
    return 'Transport temperature: verify in current directory';
  };
  const bagClass = (bucket) => bucket.includes('refrigerate if delayed') ? 'temp-delay' :
    bucket.includes('deliver immediately') ? 'temp-urgent' :
    bucket === 'Refrigerated' ? 'temp-refrigerated' :
    bucket === 'Frozen' ? 'temp-frozen' : bucket === 'Room temperature' ? 'temp-room' : 'temp-unknown';
  const containerArt = (container, size) => typeof window.CEDARS_CONTAINER_ART === 'function'
    ? window.CEDARS_CONTAINER_ART(container, size) : '';

  // Actual individual high-resolution reference photos supplied for the guide.
  // cleanStool/formalin use the full three-vial ParaPak reference photo.
  const photoCatalog = {
    adult:{label:'BD BACTEC adult aerobic and anaerobic culture bottle set'},
    peds:{label:'BD BACTEC pediatric culture bottle'},
    fungal:{label:'BD BACTEC Myco/F Lytic fungal blood culture bottle'},
    eswab:{label:'White-top BD eSwab culture tube'},
    utm:{label:'Red-top UTM viral transport medium tube'},
    cobasUrine:{label:'cobas PCR urine collection kit with transfer pipette'},
    cobasSwab:{label:'cobas PCR Media Dual Swab kit'},
    affirm:{label:'BD Affirm VPIII / ATTS swab kit'},
    urine:{label:'Gray-top urine culture preservative tube'},
    parapak:{label:'ParaPak three-vial stool collection set'},
    sterile:{label:'Sterile specimen collection cup (green lid)'} ,
    ua:{label:'Red and yellow swirl-top urinalysis preservative tube'},
    cleanStool:{label:'ParaPak three-vial set, including clean stool vial', imageKey:'parapak'},
    formalin:{label:'ParaPak three-vial set, including formalin vial', imageKey:'parapak'}
  };
  const photoReference = (container) => {
    const key = typeof window.CEDARS_CONTAINER_KIND === 'function'
      ? window.CEDARS_CONTAINER_KIND(container) : 'unknown';
    return photoCatalog[key] ? {key, ...photoCatalog[key]} : null;
  };
  const photoArt = (container, size) => {
    const illustration = containerArt(container, size);
    const photo = photoReference(container);
    if (!photo) return illustration;
    const camera = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"' +
      ' fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"' +
      ' stroke-linejoin="round"><path d="M4 7h4l2-3h4l2 3h4v12H4z"/>' +
      '<circle cx="12" cy="13" r="3.3"/></svg>';
    return '<button type="button" class="cedars-photo-trigger"' +
      ' data-photo-key="' + esc(photo.key) + '" aria-haspopup="dialog"' +
      ' aria-label="' + esc('View actual photo: ' + photo.label) + '"' +
      ' title="' + esc('View actual photo: ' + photo.label) + '">' +
      illustration + '<span class="cedars-photo-chip" aria-hidden="true">' +
      camera + '</span></button>';
  };
  function openPhoto(key) {
    const photo = photoCatalog[key];
    const sourceKey = photo && (photo.imageKey || key);
    const src = sourceKey && window.CEDARS_CONTAINER_PHOTOS && window.CEDARS_CONTAINER_PHOTOS[sourceKey];
    if (!photo || !src) return;
    const dialog = $('cedarsPhotoDialog');
    const image = $('cedarsPhotoImage');
    image.src = src;
    image.alt = photo.label;
    $('cedarsPhotoTitle').textContent = photo.label;
    $('cedarsPhotoCaption').textContent = photo.label;
    if (!dialog.open) dialog.showModal();
  }
  function closePhoto() {
    const dialog = $('cedarsPhotoDialog');
    if (dialog.open) dialog.close();
  }


  // The Quest calculator uses its own storage keys. Cedars restores its cart
  // and browser-created test records without ever accessing Quest state.
  function storageMessage(saved) {
    const status = $('cedarsStorageStatus');
    if (status) status.textContent = saved
      ? 'Cart and manually added tests are saved in this browser.'
      : 'Browser storage is unavailable. Your cart may clear after refreshing.';
  }
  function saveState() {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
        version: 1,
        customTests: manual,
        selectedIds: Array.from(selected)
      }));
      storageMessage(true);
      return true;
    } catch (error) {
      console.warn('Cedars cart could not be saved in this browser.', error);
      storageMessage(false);
      return false;
    }
  }
  function restoreState() {
    let state;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      state = raw ? JSON.parse(raw) : null;
      storageMessage(true);
    } catch (error) {
      console.warn('Cedars saved cart could not be read.', error);
      storageMessage(false);
      return;
    }
    if (!state || state.version !== 1 || typeof state !== 'object') return;

    const knownManual = new Set();
    const types = ['Blood','Urine','Stool','Swab','Other'];
    const temperatures = ['Verify','Room Temperature','Refrigerated','Frozen','Room / Refrigerated'];
    const field = (value, max) => clean(typeof value === 'string' ? value : '').slice(0, max);
    const storedManual = Array.isArray(state.customTests) ? state.customTests : [];
    for (const record of storedManual.slice(0, 250)) {
      if (!record || typeof record !== 'object' || record.manual !== true) continue;
      const id = field(record.id, 40);
      if (!/^cedars-manual-[1-9][0-9]{0,8}$/.test(id) || knownManual.has(id)) continue;
      const name = field(record.name,150);
      const collect = field(record.collect,180);
      const submit = field(record.submit,180);
      if (!name || !collect || !submit) continue;
      const number = Number(id.slice('cedars-manual-'.length));
      manualIndex = Math.max(manualIndex, number);
      knownManual.add(id);
      manual.push({
        id, name, collect, submit, manual: true, hold: true, blockReason: 'Not performed at this site',
        code: field(record.code,40),
        category: types.includes(record.category) ? record.category : 'Other',
        specimen: field(record.specimen,120) || 'Verify',
        qty: Math.min(20, Math.max(1, Number(record.qty) || 1)),
        temp: temperatures.includes(record.temp) ? record.temp : 'Verify',
        notes: field(record.notes,1200) || 'Manual record. Confirm requirements in current Cedars/Lexicomp directory.',
        aliases: ''
      });
    }

    const validIds = new Set(published.filter(test => !test.hold).map(test => test.id));
    // Previous manual records remain in the Do Not Perform reference list.
    // Neither legacy manual records nor former selectable built-ins can be restored.
    const savedIds = Array.isArray(state.selectedIds) ? state.selectedIds : [];
    const hasDisallowed = savedIds.some(id => typeof id === 'string' && !validIds.has(id));
    const ids = savedIds;
    for (const id of ids.slice(0, 2000)) {
      if (typeof id === 'string' && validIds.has(id)) selected.add(id);
    }
    if (hasDisallowed) saveState();
  }

  function editDistance(a, b) {
    if (!a || !b || Math.abs(a.length - b.length) > 2 || a.length > 55 || b.length > 55) return 99;
    const prior = Array.from({length: b.length + 1}, (_, i) => i);
    for (let i = 1; i <= a.length; i += 1) {
      let diag = prior[0];
      prior[0] = i;
      for (let j = 1; j <= b.length; j += 1) {
        const old = prior[j];
        prior[j] = Math.min(prior[j] + 1, prior[j - 1] + 1, diag + (a[i - 1] === b[j - 1] ? 0 : 1));
        diag = old;
      }
    }
    return prior[b.length];
  }

  function rank(test, query) {
    const q = norm(query);
    if (!q) return 1;
    const n = norm(test.name);
    const c = compact(test.code);
    const aliases = norm(test.aliases || '');
    const text = norm([test.name, test.code, test.secondaryCode, test.specimen, test.collect, test.submit, test.aliases, test.containerType].join(' '));
    if (compact(q) === c && c) return 100;
    if (test.secondaryCode && compact(q) === compact(test.secondaryCode)) return 100;
    if (q === n) return 99;
    if (n.startsWith(q)) return 90;
    if (n.includes(q)) return 75;
    if (aliases.includes(q)) return 65;
    const words = q.split(' ').filter(Boolean);
    if (words.every((word) => text.includes(word))) return 45 + Math.min(words.length, 10);
    if (q.length > 4 && editDistance(compact(q), compact(n)) <= 2) return 30;
    if (words.length === 1 && words[0].length > 4 &&
        n.split(' ').some((w) => editDistance(w, words[0]) <= 1)) return 25;
    return 0;
  }

  function exactMatches(query) {
    const q = compact(query);
    if (!q) return [];
    return records().filter((test) =>
      (test.code && compact(test.code) === q) ||
      (test.secondaryCode && compact(test.secondaryCode) === q) ||
      compact(test.name) === q ||
      (test.aliases || '').split('|').some((alias) => alias.trim() && compact(alias) === q));
  }

  // Use a closed set of specimen classes so dynamic data cannot become CSS.
  const specimenBadge = (category) => '<span class="cedars-specimen-badge ' + specimenClass(category) + '">' + esc(category || 'Other') + '</span>';
  // Single-stroke X: unlike the previous compound path, this draws one X.
  const removeXIcon = '<span class="remove-icon" aria-hidden="true">' +
    '<svg viewBox="0 0 24 24" focusable="false" fill="none" stroke="currentColor"' +
    ' stroke-width="2.2" stroke-linecap="round"><path d="M6 6 L18 18 M18 6 L6 18"/></svg></span>' +
    '<span class="remove-text" aria-hidden="true">Delete</span>';
  const specimenClass = (category) => {
    const value = String(category || '').toLowerCase();
    return ['swab','urine','stool','blood','other'].includes(value)
      ? 'type-' + value : 'type-other';
  };
  // Show the actual test identity, collection and transport instead of
  // a bare name in search suggestions and bulk-match review.
  const testCodes = (test) => [test.code, test.secondaryCode].filter(Boolean).join(' · ');
  function matchChoice(test) {
    const codes = testCodes(test);
    return '<div class="cedars-match-choice ' + specimenClass(test.category) + '">' +
      '<div class="cedars-match-info"><strong class="cedars-match-title">' + esc(test.name) + '</strong>' +
      '<div class="cedars-match-meta">' + specimenBadge(test.category) +
      (codes ? '<span class="cedars-match-code">' + esc(codes) + '</span>' : '') +
      '<span>' + esc(test.category) + ': ' + esc(test.specimen) + '</span>' +
      '<span>Collect: ' + esc(test.collect) + '</span>' +
      '<span>Transport: ' + esc(test.temp || 'Verify') + '</span></div></div>' +
      '<div class="cedars-match-actions"><button type="button" class="mini-button edit" data-info="' +
      esc(test.id) + '">Details</button>' +
      (test.hold ? '<span class="cedars-match-held">Verification required</span>' :
        '<button type="button" class="mini-button" data-add="' + esc(test.id) + '">' +
        (selected.has(test.id) ? '✓ Added' : 'Add') + '</button>') +
      '</div></div>';
  }
  // Use the same directly filtered directory table as Quest and LabCorp.
  // Do not duplicate results in a separate "Top matches" panel.
  function renderSearchSuggestions() {
    const panel = $('cedarsSearchSuggestions');
    panel.innerHTML = '';
    panel.classList.add('hidden');
  }

  // Show decision-useful collection details instead of long source citations.
  // Source citations remain available under Details.
  const methodLabel = (test) => {
    if (test.testMethod) return test.testMethod;
    const name = (test.name || '').toLowerCase();
    if (/pcr|molecular|nucleic acid/.test(name)) return 'PCR';
    if (/culture/.test(name)) return 'Culture';
    if (/guaiac|occult blood/.test(name)) return 'Guaiac test';
    if (/urinalysis/.test(name)) return 'Urinalysis';
    if (/antigen/.test(name)) return 'Antigen test';
    if (/calprotectin/.test(name)) return 'Fecal calprotectin';
    if (/leukocyte|wbc/.test(name)) return 'Fecal leukocytes';
    if (/vaginitis|vaginosis/.test(name)) return 'DNA probe';
    if (/screen/.test(name)) return 'Screen';
    return 'Collection';
  };
  const keyDetail = (test) => {
    const details = {
      'gc-ct-urine':'First-stream urine; transfer pipette',
      'gc-ct-swab':'Use the cobas swab kit',
      'urine-culture':'Clean-catch; fill gray top to mark',
      'urinalysis-swirl':'Transfer to UA preservative tube',
      'csf-culture':'Deliver immediately',
      'afbculture':'Refrigerate routine specimens; confirm CSF / gastric aspirate handling',
      'cdiff':'Standard: all three ParaPak vials',
      'fecal-guaiac':'Guaiac, not FIT; clean vial option'
    };
    return details[test.id] || test.specimen || '';
  };
  const rowSummary = (test) => {
    const sourceNames = Array.isArray(test.sourceOptions)
      ? test.sourceOptions.map(item => item.name).filter(Boolean) : [];
    const swabSites = Array.isArray(test.swabSites)
      ? test.swabSites.filter(Boolean) : [];
    const parts = [methodLabel(test), swabSites.length
      ? 'Swab sites: ' + swabSites.join(', ') :
      sourceNames.length ? 'Sources: ' + sourceNames.join(', ') : keyDetail(test)];
    const volume = (test.volumeDisplay || '').trim();
    if (volume && !/^(verify|not specified|n\/a|unknown)$/i.test(volume))
      parts.push('Volume: ' + volume);
    if (test.secondaryCode) parts.push('Code: ' + test.secondaryCode);
    return parts.filter(Boolean).join(' · ');
  };

  // Collection is the original sterile cup for urine/stool. Menu results show
  // what is actually submitted (e.g. cobas tube or separate ParaPak vials).
  const requiresOriginalStoolKit = (test) =>
    test.category === 'Stool' &&
    (test.id === 'fecal-fit' || /\b(?:FOBT-CHEK|FIT sampling bottle|dedicated stool collection kit)\b/i.test(String(test.collect || '')));
  const collectionContainer = (test) =>
    requiresOriginalStoolKit(test) ? test.collect :
    (test.category === 'Urine' || test.category === 'Stool') ? 'Sterile cup' :
    // For swabs and culture bottles, the transport kit IS the collection
    // device. An anatomical site or a kit's longer trade name is not a transfer.
    (test.category === 'Swab' || test.category === 'Blood') ? (test.submit || test.collect) :
    test.collect;

  // All Cedars menu rows show the original collection vessel before the
  // final submission container, without changing the existing container art.
  function cedarsMenuContainerPath(test) {
    const source = collectionContainer(test);
    const target = String(test.submit || 'Verify submission container').trim();
    const canonical = value => {
      const text = clean(value);
      // FIT bottles and sterile urine cups can have different catalog labels
      // without representing two different physical containers.
      if (/\bfobt[- ]?chek\b|\bfit\s+(?:sampling\s+)?bottle\b/i.test(text)) return 'fit original sampling bottle';
      if (/^(?:sterile\s+)?(?:specimen\s+)?(?:cup|container)(?:\s*\(urine\))?$/i.test(text)
          || /^sterile\s+(?:specimen\s+)?cup\s*\(urine\)$/i.test(text)) return 'sterile cup';
      return text.replace(/\b(?:sterile|specimen|collection)\b/g, ' ')
        .replace(/\s+/g, ' ').trim();
    };
    const sameCup = canonical(source) === 'sterile cup' && canonical(target) === 'sterile cup';
    const unchanged = canonical(source) === canonical(target) ||
      /^(?:submit|send)\s+(?:in\s+)?(?:the\s+)?original\s+(?:tube|cup|container)$/i.test(target);
    // Only urine/stool collection-to-preservative workflows show transfer
    // arrows. Swab transport kits and blood culture bottles are used directly
    // to collect the specimen, not transferred after the collection.
    const transfer = (test.category === 'Urine' || test.category === 'Stool') && !unchanged;
    const cls = specimenClass(test.category);
    const pill = (value, role) =>
      '<span class="cedars-container-name ' + cls + '" aria-label="' + role + '">' + esc(value) + '</span>';
    const single = sameCup ? 'Sterile cup' : (target || source);
    return '<div class="cedars-container-path' + (!transfer ? ' is-single' : '') + '">' +
      (!transfer ? pill(single, 'Collection and submission container') :
       '<span class="cedars-container-path-stage">' + pill(source, 'Collect in') + '</span>' +
       '<span class="cedars-container-path-arrow" role="img" aria-label="Then submit in">→</span>' +
       '<span class="cedars-container-path-stage">' + pill(target, 'Submit in') + '</span>') +
      '</div>';
  }

  // Menu-only: show the primary specimen and tube, not accepted alternatives.
  // Full source options remain in Details and the original records/planner.
  function primaryCedarsMenuSpecimen(test) {
    const value = String(test.specimen || '');
    // In the directory's specimen/container column display only the primary
    // specimen even when alternatives are embedded in the specimen text.
    return value.split(/\s+or\s+/i)[0]
      .replace(/\s*\((?:green|red|lavender|purple|blue)[^)]*\)\s*$/i, '')
      .trim() || value;
  }

  function primaryCedarsMenuContainer(test) {
    const value = String(test.submit || '');
    return value.split(/\s+or\s+/i)[0].trim() || value;
  }

  // Presentation-only grouping. Catalog and clinical collection rules do not change.
  function cedarsClinicalGroup(test) {
    const value = norm([test.name, test.aliases || ''].join(' '));
    if (/culture|mycobacter|afb\b|mrsa\b|vre\b|fungal|yeast/.test(value)) return 'Microbiology & cultures';
    if (/pcr\b|naat\b|molecular|nucleic acid|dna\b|rna\b|antigen|enteric virus|c\.?\s*diff/.test(value))
      return 'Molecular & infectious disease';
    if (/urinalysis|urine microscopy|urine sediment/.test(value)) return 'Urinalysis';
    if (/occult blood|fecal|stool|gastrointestinal/.test(value)) return 'Gastrointestinal testing';
    if (/vancomycin|drug level|therapeutic|toxicology/.test(value)) return 'Therapeutic drug monitoring';
    if (/sedimentation|esr\b|blood count|cbc\b|coagulation|platelet/.test(value))
      return 'Hematology & coagulation';
    if (/procalcitonin|electrolyte|chemistry|metabolic/.test(value)) return 'Chemistry & biomarkers';
    return 'Other clinical tests';
  }
  function cedarsGroupLabel(test, mode) {
    if (mode === 'clinical') return cedarsClinicalGroup(test);
    if (mode === 'temperature') return transportBucket(test) || 'Verify transport';
    if (mode === 'alphabetical') return '';
    return (test.category || 'Other') + ' specimens';
  }

  function makeRows() {
    const q = $('cedarsSearch').value;
    const cat = $('cedarsType').value;
    const showHolds = $('showHolds').checked;
    const groupBy = $('cedarsGroupBy').value;
    const rows = records().map((test) => ({test, score: rank(test, q)}))
      .filter(({test, score}) => score && (!cat || test.category === cat) &&
        (!selectedContainer || test.containerType === selectedContainer) && (showHolds || !test.hold))
      .sort((a, b) => {
        const specimenOrder = {Swab: 0, Urine: 1, Stool: 2, Blood: 3, Other: 4};
        const aGroup = cedarsGroupLabel(a.test, groupBy);
        const bGroup = cedarsGroupLabel(b.test, groupBy);
        if (groupBy === 'specimen') {
          const difference = (specimenOrder[a.test.category] ?? 99) - (specimenOrder[b.test.category] ?? 99);
          if (difference) return difference;
        } else if (groupBy !== 'alphabetical') {
          const difference = aGroup.localeCompare(bGroup);
          if (difference) return difference;
        }
        return a.test.name.localeCompare(b.test.name) ||
          (a.test.collect || '').localeCompare(b.test.collect || '');
      });
    const groupCounts = new Map();
    for (const row of rows) {
      const group = cedarsGroupLabel(row.test, groupBy);
      if (group) groupCounts.set(group, (groupCounts.get(group) || 0) + 1);
    }
    renderSearchSuggestions(rows, q);
    const activeFilterCount = Number(Boolean($('cedarsType').value)) +
      Number(Boolean(selectedContainer)) + Number($('showHolds').checked);
    const filterToggle = $('cedarsFilterButton');
    $('cedarsFilterButtonText').textContent = 'Filters' +
      (activeFilterCount ? ' (' + activeFilterCount + ')' : '');
    filterToggle.classList.toggle('has-filters', activeFilterCount > 0);
    $('recordCount').textContent = records().filter((t) => !t.hold).length + ' tests';
    $('libraryStatus').textContent = rows.length + ' matching tests' +
      (selectedContainer ? ' · container: ' + selectedContainer : '') + ' · ' +
      records().filter((t) => t.hold).length + ' restricted / needs verification';
    $('cedarsLibraryBody').innerHTML = rows.map(({test}, index) => {
      const label = cedarsGroupLabel(test, groupBy);
      const previous = index ? cedarsGroupLabel(rows[index - 1].test, groupBy) : '';
      const heading = label && (index === 0 || label !== previous)
        ? '<tr class="cedars-specimen-heading ' + specimenClass(test.category) + '"><td colspan="5">' +
          esc(label) + '<span class="cedars-group-count">' + groupCounts.get(label) +
          ' ' + (groupCounts.get(label) === 1 ? 'test' : 'tests') + '</span></td></tr>'
        : '';
      return heading + '<tr class="cedars-test-row ' + specimenClass(test.category) + '"><td class="code-cell">' + esc(test.code || '—') + '</td>' +
      '<td><div class="test-name">' + esc(test.name) + '</div>' + specimenBadge(test.category) +
      '<div class="subtext cedars-row-source">' + esc(rowSummary(test)) + '</div>' +
       (test.statReference2022 ? '<div class="cedars-stat-legacy-tag" title="Listed on the April 2022 Cedars outreach STAT reference. Verify current availability.">STAT ELIGIBLE</div>' : '') +
      (test.hold ? '<span class="cedars-hold">' + esc(test.blockReason || 'Not performed at this site') + '</span>' : '') + '</td>' +
      '<td><div class="cedars-container-cell">' + photoArt(primaryCedarsMenuContainer(test), 'table') +
      '<div class="cedars-container-copy"><div class="cedars-specimen-name">' + esc(primaryCedarsMenuSpecimen(test)) + '</div>' +
      cedarsMenuContainerPath({...test, submit: primaryCedarsMenuContainer(test)}) + '</div></div></td>' +
      '<td><span class="badge ' + (isUnknown(test) ? 'temp-unknown' : bagClass(transportBucket(test))) + '">' +
      esc(test.temp || 'Verify') + '</span></td>' +
      '<td class="row-actions"><button class="mini-button edit" type="button" data-info="' +
      esc(test.id) + '">Details</button>' +
      (!test.hold ? '<button class="mini-button" type="button" data-add="' + esc(test.id) + '">' +
      (selected.has(test.id) ? '✓ Added' : 'Add') + '</button>' : '') +
      '</td></tr>';
    }).join('');
    if (!rows.length) $('cedarsLibraryBody').innerHTML =
      '<tr><td colspan="5" class="cedars-empty">No matching tests. See Do Not Perform or contact Sam about new workflows.</td></tr>';
  }

  // Pool only the ORIGINAL urine collection CUP when collection methods are
  // compatible. The separate transport tubes and specimen-specific fill
  // requirements remain unchanged. First-stream PCR and first-morning AFB
  // are deliberately kept distinct from a routine clean-catch cup.
  const urineCupCategory = (test) => {
    if (test.category !== 'Urine') return '';
    if (test.id === 'gc-ct-urine' || /first[- ]stream/i.test(test.specimen || ''))
      return 'First-stream urine';
    if (test.id === 'urine-afb' || /first[- ]morning/i.test(test.specimen || ''))
      return 'First-morning urine (AFB)';
    return 'Clean-catch / routine urine';
  };
  const originalCollectionGroup = (test) => {
    // One source cup can supply compatible tests from the SAME stool specimen.
    // Dedicated collection kits, special timed collections and tests requiring
    // independent specimens retain their own source. Urine and stool NEVER
    // share a physical cup even though both are labeled "Sterile cup".
    if (test.category === 'Stool') {
      // A FIT bottle is itself the initial collection kit, not a cup to
      // transfer from. Never merge it with stool collected for other tests.
      if (requiresOriginalStoolKit(test)) return {
        key: 'stool-original-kit|' + test.id,
        container: test.collect,
        category: 'Stool',
        subtitle: 'Dedicated collection kit',
        shared: false
      };
      const instructions = `${test.name || ''} ${test.collect || ''} ${test.notes || ''}`;
      const dedicated = /\b(?:FOBT-CHEK|FIT bottle|separate stool specimen|separate stool sample|dedicated collection|24[- ]?hour|72[- ]?hour)\b/i.test(instructions);
      return {
        key: dedicated ? 'stool-cup|separate|' + test.id : 'stool-cup|compatible',
        container: 'Sterile cup',
        category: 'Stool',
        subtitle: dedicated ? 'Separate specimen required' : '',
        shared: true
      };
    }
    const type = urineCupCategory(test);
    if (type) return {
      key:'urine-cup|' + type,
      container:'Sterile cup',
      category:'Urine',
      subtitle:type,
      shared:true
    };
    return {
      key:'other|' + collectionContainer(test),
      container:collectionContainer(test),
      category:test.category,
      subtitle:'',
      shared:false
    };
  };
  const originalCupNote = (category, groupSize, subtitle) => {
    if (category === 'Stool') {
      if (subtitle) return 'Dedicated specimen: follow the collection kit instructions';
      return groupSize > 1
        ? '1 shared sterile cup for compatible tests from the same stool sample; transfer to each required vial'
        : 'Collect stool in a sterile cup and transfer to the required vial or kit';
    }
    if (category !== 'Urine') return 'Keep specimens separate';
    if (subtitle === 'Clean-catch / routine urine' && groupSize > 1)
      return '1 shared cup for compatible tests; sufficient urine must be collected to fill each separate transport tube';
    return subtitle + ' · use a separate cup when collection methods differ';
  };

  function renderCart() {
    const tests = chosen();
    $('selectedCount').textContent = String(tests.length);
    $('cedarsCartCount').textContent = tests.length + ' tests';
    $('mobileCount').textContent = tests.length + ' tests';
    $('cedarsPrint').disabled = $('cedarsCsv').disabled = !tests.length;
    $('cedarsDetailsToggle').setAttribute('aria-expanded', String(showCartDetails));
    $('cedarsDetailsToggleText').textContent = showCartDetails ? 'Hide details' : 'Show details';
    $('cedarsCart').innerHTML = tests.length ? tests.map((test) =>
      '<article class="cedars-cart-item ' + specimenClass(test.category) + '"><div class="cedars-cart-top">' +
      '<div class="cedars-cart-heading"><strong>' + esc(test.name) + specimenBadge(test.category) +
      '</strong>' + (test.code ? '<small>' + esc(test.code) + '</small>' : '') + '</div>' +
      '<button type="button" class="mini-button remove remove-flex cedars-cart-remove" data-remove="' + esc(test.id) +
      '" aria-label="Delete ' + esc(test.name) + '">' + removeXIcon + '</button></div>' +
      (showCartDetails ? '<div class="cedars-cart-details"><div class="cedars-cart-art-row">' +
        photoArt(collectionContainer(test), 'small') + '<div><b>Collect</b> ' + esc(collectionContainer(test)) + '</div></div>' +
        '</div><div><b>Submit</b> ' + esc(test.submit) + '</div><div><b>Transport</b> ' +
        esc(test.temp) + '</div><p>' + esc(test.notes || 'Verify current requirements.') +
        '</p><span class="cedars-source">' + esc(source(test)) + '</span></div>' : '') +
      '</article>').join('') :
      '<div class="cedars-empty">No tests selected.</div>';

    const groups = new Map();
    tests.forEach((test) => {
      const plan = originalCollectionGroup(test);
      if (!groups.has(plan.key)) groups.set(plan.key, {
        count:0, tests:[], category:plan.category, container:plan.container,
        subtitle:plan.subtitle, shared:plan.shared, singleOptions:[]
      });
      const row = groups.get(plan.key);
      row.count += plan.shared ? (row.count ? 0 : 1) : Math.max(1, Number(test.qty) || 1);
      row.tests.push(test.name);
      if (test.singleVialOption) row.singleOptions.push(test.name);
      if (row.category !== test.category) row.category = 'Other';
    });
    $('cedarsDrawCount').textContent = groups.size ?
      groups.size + ' collection types' : 'No collection types';
    $('cedarsDraw').innerHTML = tests.length ?
      Array.from(groups, ([, group]) =>
        '<div class="cedars-plan-row ' + specimenClass(group.category) + '"><span class="cedars-count">' + group.count + '×</span>' +
        photoArt(group.container, 'card') +
        '<div><strong>' + esc(group.container) + '</strong>' + specimenBadge(group.category) +
        (group.subtitle ? '<small class="cedars-urine-method">' + esc(group.subtitle) + '</small>' : '') +
        '<small>' + esc(group.tests.join('; ')) + '</small>' +
        (group.shared ? '<small class="cedars-urine-sharing-note">' +
          esc(originalCupNote(group.category, group.tests.length, group.subtitle)) + '</small>' : '') +
        (group.singleOptions.length ? '<small class="cedars-single-vial-note">Single white-cap clean vial also acceptable for: ' + esc(group.singleOptions.join('; ')) + '</small>' : '') +
        '</div></div>').join('') :
      '<div class="cedars-empty">Add tests to view collection containers.</div>';

    const bags = new Map();
    tests.forEach((test) => {
      const key = transportBucket(test);
      if (!bags.has(key)) bags.set(key, []);
      bags.get(key).push(test);
    });
    $('cedarsBagsCount').textContent = bags.size ? bags.size + ' temperature groups' : 'No transport groups';
    $('cedarsBags').innerHTML = tests.length ?
      '<p class="cedars-mini-note">Keep containers separate. Temperature grouping is not permission to combine specimens.</p>' +
      Array.from(bags, ([bucket, items]) =>
        '<div class="cedars-bag"><div class="cedars-bag-header"><span class="badge ' +
        bagClass(bucket) + '">' + esc(bucket) + '</span><span>' + items.length + ' tests</span></div>' +
        items.map((test) => '<div class="cedars-bag-line ' + specimenClass(test.category) + '">' +
          photoArt(test.submit, 'card') +
          '<div><strong>' + esc(test.name) + specimenBadge(test.category) +
          '</strong><small>' + esc(test.submit) + '</small>' +
          (test.id === 'afbculture' ? '<small class="cedars-single-vial-note">CSF / gastric aspirate: verify handling before refrigeration.</small>' : '') +
          (test.singleVialOption ? '<small class="cedars-single-vial-note">' + esc(test.singleVialOption) + '</small>' : '') +
          '</div></div>').join('') + '</div>').join('') :
      '<div class="cedars-empty">Add tests to view transport groups.</div>';
  }
  function renderContainerFilters() {
    const counts = new Map();
    records().filter(test => !test.hold).forEach(test => {
      const container = test.containerType || 'Other / verify';
      counts.set(container, (counts.get(container) || 0) + 1);
    });
    const order = ['eSwab','UTM','cobas urine','cobas swab','Affirm / ATTS',
      'Gray-top urine culture','UA swirl-top','3-vial ParaPak','Clean stool vial',
      'Adult blood culture','Pediatric blood culture','Myco/F Lytic',
      'Gold SST','Lavender EDTA','Green heparin','Red serum',
      'Sterile container','Sterile 50 mL tube','FIT bottle','SurePath','Other / verify'];
    const sorted = Array.from(counts).sort(([a],[b]) =>
      order.indexOf(a) - order.indexOf(b) || a.localeCompare(b));
    const entry = (container, count) => {
      const photo = photoReference(container);
      const photoButton = photo
        ? '<button type="button" class="cedars-filter-photo-button" data-photo-key="' +
          esc(photo.key) + '" aria-haspopup="dialog" aria-label="' +
          esc('View actual photo: ' + photo.label) + '" title="' +
          esc('View actual photo: ' + photo.label) +
          '"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none"' +
          ' stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
          '<path d="M4 7h4l2-3h4l2 3h4v12H4z"/>' +
          '<circle cx="12" cy="13" r="3.3"/></svg></button>' : '';
      return '<div class="cedars-container-filter-item' + (photo ? ' has-reference-photo' : '') + '">' +
        '<button type="button" class="cedars-container-filter-option' +
        (selectedContainer === container ? ' is-selected' : '') +
        '" data-container="' + esc(container) + '" aria-pressed="' +
        (selectedContainer === container ? 'true' : 'false') + '">' +
        (container ? containerArt(container, 'small') : '<span class="cedars-container-filter-all">All</span>') +
        '<span class="cedars-container-filter-copy"><strong>' +
        esc(container || 'All containers') + '</strong><small>' + count +
        (count === 1 ? ' test' : ' tests') + '</small></span></button>' +
        photoButton + '</div>';
    };
    $('cedarsContainerFilters').innerHTML =
      entry('',records().filter(t => !t.hold).length) +
      sorted.map(([key,count]) => entry(key,count)).join('');
  }
  function renderBlockedList() {
    const items = records().filter(test => test.hold).sort((a,b) => a.name.localeCompare(b.name));
    $('cedarsBlockedButton').textContent = 'Do Not Perform list (' + items.length + ')';
    $('cedarsBlockedList').innerHTML = items.map(test =>
      '<div class="cedars-blocked-item"><div class="cedars-blocked-item-info"><strong>' +
      esc(test.name) + '</strong><small>' + esc(test.code || 'Code not listed') +
      ' · ' + esc(test.blockReason || 'Not performed at this site') + '</small></div>' +
      '<button type="button" class="mini-button edit" data-info="' + esc(test.id) +
      '">Details</button></div>').join('');
  }
  function render() { makeRows(); renderContainerFilters(); renderBlockedList(); renderCart(); }

  function add(id) {
    const test = byId(id);
    if (!test || test.hold) return;
    selected.add(id);
    saveState();
    render();
  }
  function detail(id) {
    const test = byId(id);
    if (!test) return;
    $('cedarsInfoTitle').textContent = test.name;
    $('cedarsInfoBody').innerHTML =
      '<div class="cedars-info-illustrations">' +
      '<div>' + photoArt(collectionContainer(test), 'detail') + '<span>Collection container</span></div>' +
      '<div>' + photoArt(test.submit, 'detail') + '<span>Submission container</span></div>' +
      '</div>' +
      '<p class="cedars-illustration-note">Color-matched illustration based on supplied kit photos. Verify the actual manufacturer container before collecting.</p>' +
      '<div class="cedars-summary-notice"><strong>' +
      (test.hold ? esc(test.blockReason || 'Not performed at this site') + '. Do not collect or submit until the workflow is approved.' :
        '2023 reference only: verify the current Cedars/Lexicomp instructions.') +
      '</strong></div>' +
      '<dl>' +
      '<dt>Test code</dt><dd>' + esc([test.code, test.secondaryCode].filter(Boolean).join(' / ') || 'Not supplied') + '</dd>' +
      '<dt>Specimen</dt><dd>' + esc(test.specimen) + '</dd>' +
       (test.statReference2022 ? '<dt>Historical outreach STAT list</dt><dd>Included in Cedars 2022 reference (4-hour listed turnaround). Verify current STAT eligibility and actual turnaround.</dd>' : '') +
      (Array.isArray(test.swabSites) && test.swabSites.length
        ? '<dt>Swab sites</dt><dd>' + esc(test.swabSites.join(' · ')) +
          '<small>Use the ordered site and verify current Cedars specimen acceptance.</small></dd>' : '') +
      (Array.isArray(test.sourceOptions) && test.sourceOptions.length
        ? '<dt>Specimen source options</dt><dd><ul class="cedars-source-options">' +
          test.sourceOptions.map(item =>
            '<li><strong>' + esc(item.name) + ':</strong> ' +
            esc(item.requirements || 'Verify source-specific requirements') + '</li>'
          ).join('') + '</ul><small>Specify the actual specimen source on the order and verify Cedars acceptance and transport for that source.</small></dd>'
        : '') +
      '<dt>Volume</dt><dd>' + esc(test.volumeDisplay || 'Verify current requirements') + '</dd>' +
      '<dt>What to collect</dt><dd>' + esc(collectionContainer(test)) + '</dd>' +
      '<dt>Container filter</dt><dd>' + esc(test.containerType || 'Verify') + '</dd>' +
      '<dt>What to submit</dt><dd>' + esc(test.submit) + '</dd>' +
      (Array.isArray(test.submissionOptions) && test.submissionOptions.length
        ? '<dt>Accepted tube options</dt><dd><ul class="cedars-source-options">' +
          test.submissionOptions.map(item =>
            '<li><strong>' + esc(item.name) + ':</strong> ' +
            esc(item.requirements || 'Confirm with Cedars') + '</li>'
          ).join('') + '</ul><small>The cart uses the default tube only. Confirm the selected alternative and adjust collection instructions before collecting.</small></dd>'
        : '') +
      '<dt>Transport</dt><dd>' + esc(test.temp) + '</dd>' +
      '<dt>Handling notes</dt><dd>' + esc(test.notes || 'Verify current requirements.') + '</dd>' +
      '<dt>Source</dt><dd>' + esc(source(test)) + '</dd></dl>';
    $('cedarsInfoDialog').showModal();
  }
  function csvSafe(value) {
    const s = clean(value);
    const guarded = /^[=+\-@\t\r]/.test(s) ? "'" + s : s;
    return '"' + guarded.replace(/"/g, '""') + '"';
  }
  function saveCsv() {
    const tests = chosen();
    if (!tests.length) return;
    const heads = ['Test code', 'Test', 'Specimen', 'What to collect', 'What to submit', 'Container count (conservative)', 'Transport', 'Special notes', 'Source', 'Verification'];
    const rows = tests.map((t) => [[t.code,t.secondaryCode].filter(Boolean).join(' / '), t.name, t.specimen, collectionContainer(t), t.submit, t.qty, t.temp,
      t.notes, source(t), 'Verify in current Cedars/Lexicomp directory']);
    const csv = '\uFEFF' + [heads].concat(rows).map((row) => row.map(csvSafe).join(',')).join('\r\n');
    const url = URL.createObjectURL(new Blob([csv], {type: 'text/csv;charset=utf-8'}));
    const a = document.createElement('a');
    a.href = url; a.download = 'cedars-collection-summary.csv'; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function printPlan() {
    const tests = chosen();
    if (!tests.length) return;

    // The Cedars 2023 reference often lacks verified tube volumes or shipping
    // temperatures. Counts are additive per test; never silently pool specimens.
    // Original urine collection cups can be shared across COMPATIBLE tests.
    // First-stream, clean-catch, and first-morning AFB collection remain separate.
    // Each test still has its own required transport tube and fill/handling rules.
    const initialCollection = (test) => collectionContainer(test);
    const mustTransfer = (test) => (test.category === 'Urine' || test.category === 'Stool') &&
      !requiresOriginalStoolKit(test) &&
      !/^(?:sterile\s+)?(?:specimen\s+)?(?:cup|container)(?:\s*\(urine\))?$/i.test(String(test.submit || '').trim()) &&
      !/^sterile\s+(?:specimen\s+)?cup\s*\(urine\)$/i.test(String(test.submit || '').trim());
    const initialCountFor = (test) => (test.category === 'Urine' || test.category === 'Stool') ?
      1 : Math.max(1, Number(test.qty) || 1);
    const countFor = (test) => Math.max(1, Number(test.qty) || 1);
    const initialDirections = (test) => {
      if (test.id === 'gc-ct-urine') return 'Collect first-stream urine; transfer with the cobas kit pipette as instructed.';
      if (test.id === 'urine-culture') return 'Collect clean-catch urine; transfer to gray-top tube to its fill line.';
      if (test.category === 'Urine') return 'Follow the ordered urine collection method and test-specific transfer requirements.';
      if (test.category === 'Stool') return 'Collect stool in a clean, dry sterile cup; transfer to kit vials according to their instructions.';
      return '';
    };
    const transferDirections = (test) => {
      if (!mustTransfer(test)) return '<small class="cedars-print-submit-step is-original">' +
        (requiresOriginalStoolKit(test) ? 'Submit the original stool sampling bottle.' :
          'Submit the original sterile cup.') + ' No transfer needed.</small>';
      const special = test.id === 'gc-ct-urine' ? ' Use the supplied pipette and follow the kit fill marks.' :
        test.id === 'urine-culture' ? ' Fill the preservative tube to its mark.' :
        test.category === 'Stool' ? ' Fill each required vial to its mark; use the correct preservative.' : '';
      return '<small class="cedars-print-submit-step"><strong>Transfer from collection cup.</strong>' +
        esc(special) + '</small>';
    };
    const collection = new Map();
    const transport = new Map();
    tests.forEach((test) => {
      const original = originalCollectionGroup(test);
      const initialKey = original.key;
      if (!collection.has(initialKey)) collection.set(initialKey, {
        container:initialCollection(test), subtitle:original.subtitle, shared:original.shared,
        category:test.category, tests:[]
      });
      collection.get(initialKey).tests.push(test);
      const bucket = transportBucket(test);
      if (!transport.has(bucket)) transport.set(bucket, []);
      transport.get(bucket).push(test);
    });
    const testTag = (test) =>
      '<div class="cedars-print-test-ident">' +
      '<strong class="cedars-print-test-name">' + esc(test.name) + '</strong>' +
      '<span class="cedars-print-test-type ' + specimenClass(test.category) + '">' + esc(test.category || 'Other') + '</span>' +
      ((test.code || test.secondaryCode) ? '<span class="cedars-print-test-code">' + esc([test.code, test.secondaryCode].filter(Boolean).join(' / ')) + '</span>' : '') +
      '</div>';
    const collectionCards = Array.from(collection.values()).map(({container,tests:group,category,subtitle,shared}) => {
      const quantity = shared ? 1 : group.reduce((sum, test) => sum + initialCountFor(test), 0);
      const cupCollection = /^(?:sterile\s+)?(?:specimen\s+)?cup$/i.test(String(container).trim()) &&
        group.some(test => test.category === 'Urine' || test.category === 'Stool');
      const cupBadge = cupCollection ? '<span class="cedars-print-collector-pill ' + specimenClass(category) + '">' +
        esc(category) + '</span>' : '';
      return '<article class="cedars-print-card cedars-print-collection-card">' +
        '<div class="cedars-print-card-heading"><span class="cedars-print-total">' + quantity +
        '</span>' + containerArt(container, 'print') +
        '<div class="cedars-print-card-name"><strong>' + esc(container) +
        '</strong>' + cupBadge +
        (subtitle ? '<small><strong>' + esc(subtitle) + '</strong></small>' : '') +
        '<small>' + (cupCollection ?
          esc(originalCupNote(category, group.length, subtitle)) :
          'Keep specimens separate') + '</small></div></div>' +
        '<div class="cedars-print-for-tests">For ' + group.length +
        (group.length === 1 ? ' test' : ' tests') + '</div>' +
        '<ul class="cedars-print-test-list">' +
        group.map((test) => '<li>' + testTag(test) +
          (cupCollection ? '<small class="cedars-print-source-cup">' + esc(initialDirections(test)) + '</small>' :
            (countFor(test)>1 ? '<span class="cedars-print-count-note">' + countFor(test) + ' containers (standard)</span>' : '')) +
          '</li>').join('') + '</ul></article>';
    }).join('');

    // WHAT TO SUBMIT: container first, not a temperature-first bag list.
    // Keep specimens with differing temperatures in separate cards, even
    // when their container names match. Grouping is for readability only:
    // no specimen pooling or automatic sharing of collection kits.
    const specimenOrder = {Swab:0, Urine:1, Stool:2, Blood:3, Other:4};
    const methodOrder = (method) => method === 'CULTURE' ? 0 :
      method === 'PCR' ? 1 : 2;
    const submittedContainers = new Map();
    tests.forEach(test => {
      const bucket = transportBucket(test);
      const key = [test.category, test.submit, bucket].join('|');
      if (!submittedContainers.has(key)) submittedContainers.set(key, {
        category:test.category,container:test.submit,bucket,items:[]
      });
      submittedContainers.get(key).items.push(test);
    });
    const sortedContainers = Array.from(submittedContainers.values()).sort((a,b) =>
      (specimenOrder[a.category] ?? 9) - (specimenOrder[b.category] ?? 9) ||
      a.container.localeCompare(b.container) || a.bucket.localeCompare(b.bucket));
    const pendingCount = sortedContainers.filter(group =>
      group.bucket.startsWith('Transport temperature:') || group.bucket.startsWith('Room or')).length;
    // Keep the submission card scan-friendly: single container header,
    // temperature beside the container, and the test plus method per row.
    // Print submission rows only: show the existing directory container path
    // and a color-coded specimen badge, without changing collection cards.
    const printDetailSpecimenLabel = (test) => {
      const value = String(test.specimen || '').trim();
      return /^(?:serum|plasma|whole blood|blood|urine|stool|swab|csf|body fluid|synovial fluid|pleural fluid|peritoneal fluid)$/i.test(value)
        ? value : (test.category || 'Other');
    };
    const printDetailContainerPath = (test) =>
      '<div class="cedars-print-detail-container">' + cedarsMenuContainerPath(test) +
      '<span class="cedars-print-test-type ' + specimenClass(test.category) + '">' +
      esc(printDetailSpecimenLabel(test)) + '</span></div>';

    const printContainerTests = (items) =>
      '<ul class="cedars-print-simple-tests">' +
      items.slice().sort((a,b) =>
        methodOrder(methodLabel(a).toUpperCase()) -
        methodOrder(methodLabel(b).toUpperCase()) ||
        a.name.localeCompare(b.name)).map(test => {
        const method = methodLabel(test).toUpperCase();
        const methodStyle = method === 'CULTURE' ? ' is-culture' :
          method === 'PCR' ? ' is-pcr' : '';
        return '<li class="cedars-print-simple-test">' +
          '<div class="cedars-print-simple-test-heading">' +
          '<strong class="cedars-print-simple-test-name">' + esc(test.name) + '</strong>' +
          '<span class="cedars-print-method-badge' + methodStyle + '">' +
          esc(method) + '</span></div>' +
          ((test.code || test.secondaryCode)
            ? '<small class="cedars-print-test-code">' +
              esc([test.code,test.secondaryCode].filter(Boolean).join(' / ')) + '</small>' : '') +
          printDetailContainerPath(test) +
          ((test.category === 'Urine' || test.category === 'Stool')
            ? transferDirections(test) : '') +
          (test.category === 'Stool' && countFor(test)>1
            ? '<small class="cedars-print-count-note">' +
              countFor(test) + ' separate kit vials (standard)</small>' : '') +
          (test.singleVialOption
            ? '<small class="cedars-print-single-vial">' +
              esc(test.singleVialOption) + '</small>' : '') +
          '</li>';
      }).join('') + '</ul>';
    const transportCards = sortedContainers.map(({category,container,bucket,items}) => {
      const pending = bucket.startsWith('Transport temperature:') || bucket.startsWith('Room or');
      const temp = pending ?
        (bucket.startsWith('Room or') ? 'Confirm transport choice' : 'Verify temperature') :
        bucket;
      return '<article class="cedars-print-card cedars-print-submit-card cedars-print-by-container' +
        (pending?' is-unverified':'') + ' ' + specimenClass(category) + '">' +
        '<div class="cedars-print-card-heading cedars-print-container-heading">' +
          containerArt(container,'print') +
          '<div class="cedars-print-card-name"><strong>' + esc(container) + '</strong>' +
          '<div class="cedars-print-compact-meta">' +
            '<span class="cedars-print-transport-pill ' + (pending?'pending':'known') +
              '">' + esc(temp) + '</span>' +
            '<span class="cedars-print-submit-count">' +
              items.length + (items.length===1?' test':' tests') + '</span></div>' +
          '</div></div>' +
        (pending ? '<p class="cedars-print-pending-note">Confirm transport before sending.</p>' : '') +
        printContainerTests(items) +
        '</article>';
    }).join('');

    // Keep all source-specific directions available, but away from the main
    // collection/transport cards to reduce repeated instructions and clutter.
    const isPrecaution = (test) => /\b(fill|first[- ]morning|immediately|shake|avoid|reject\w*|discard|prime|do not|no swabs|no diapers)\b/i.test(test.notes || '');
    const noteCard = (test) =>
      '<article class="cedars-print-handling-item"><div class="cedars-print-handling-head">' +
      testTag(test) + '</div><p>' + esc(test.notes) + '</p><small>' +
      esc(source(test)) + '</small></article>';
    // Collection-critical notes come first, without duplicating them later.
    const precautionCards = tests.filter(test => clean(test.notes) && isPrecaution(test))
      .map(noteCard).join('');
    const handlingCards = tests.filter(test => clean(test.notes) && !isPrecaution(test))
      .map(noteCard).join('');

    const totalContainers = Array.from(collection.values()).reduce((sum,group) =>
      sum + (group.shared ? 1 : group.tests.reduce((n,test) => n + initialCountFor(test),0)), 0);
    $('cedarsPrintSheet').innerHTML =
      '<header class="cedars-print-header"><div><h1>Cedars Collection Summary</h1>' +
        '<p>Submission containers · Test method · Collection and transport</p></div>' +
        '<div class="cedars-print-meta"><span>' + esc(new Date().toLocaleString()) + '</span>' +
        '<strong>' + tests.length + (tests.length===1 ? ' test' : ' tests') + '</strong></div></header>' +
      (precautionCards ? '<section class="cedars-print-precautions">' +
        '<div class="cedars-print-precautions-title"><strong>Check before collection</strong>' +
        '<span>Source-specific requirements that can affect specimen acceptance</span></div>' +
        '<div class="cedars-print-handling-grid">' + precautionCards + '</div></section>' : '') +
      '<section class="cedars-print-section"><div class="cedars-print-section-heading">' +
        '<div><strong>1. What to collect</strong><small>Original collection vessel, by specimen type</small></div>' +
        '<span>' + totalContainers + ' total containers</span></div>' +
        '<div class="cedars-print-grid">' + collectionCards + '</div></section>' +
      '<section class="cedars-print-section' +
        (collection.size > 4 ? ' cedars-print-start-page' : '') + '">' +
        '<div class="cedars-print-section-heading"><div><strong>2. What to submit</strong>' +
          '<small>Use the container shown. Check temperature and tests.</small></div>' +
          '<span>' + sortedContainers.length + ' submission container' +
          (sortedContainers.length===1?'':'s') +
          (pendingCount ? ' · ' + pendingCount + ' pending' : '') + '</span></div>' +
        '<div class="cedars-print-grid">' + transportCards + '</div>' +
        '<p class="cedars-print-section-note">These are planning groups, not pre-approved bags. ' +
          'Keep specimens separate and confirm unverified temperatures before sending.</p></section>' +
      (handlingCards ? '<section class="cedars-print-section cedars-print-handling-section">' +
        '<div class="cedars-print-section-heading"><div><strong>3. Additional handling notes</strong>' +
        '<small>Test-specific instructions from the listed source</small></div></div>' +
        '<div class="cedars-print-handling-grid">' + handlingCards + '</div></section>' : '') +
      '<footer class="cedars-print-footer">Verify current Cedars/Lexicomp instructions before collecting. ' +
        'Compatible urine tests may share one sterile cup when collection method and volume allow; ' +
        'compatible stool tests from the same sample may share a separate sterile cup. ' +
        'Never combine urine with stool, first-stream with clean-catch, or separate transport containers. ' +
        'Confirm the original collection method and transfer process for each assay. No patient identifiers are required.</footer>';
    window.print();
  }
  // Manual entry cannot bypass the published approved menu.
  function openManual() { return; }
  function closeManual() { $('cedarsManualDialog').close(); }
  function submitManual(event) {
    event.preventDefault();
    return; // Manual additions require an approved catalog update.
    const name = clean($('manualName').value);
    const collect = clean($('manualCollect').value);
    const submit = clean($('manualSubmit').value);
    if (!name || !collect || !submit) return;
    const test = {
      id:'cedars-manual-' + (++manualIndex), name, code:clean($('manualCode').value),
      category:$('manualType').value, specimen:clean($('manualSpecimen').value) || $('manualType').value,
      collect, submit, qty:Math.min(20, Math.max(1, Number($('manualQty').value) || 1)),
      temp:$('manualTemp').value, notes:clean($('manualNotes').value) ||
        'Manual record. Confirm all requirements in current Cedars/Lexicomp directory.',
      manual:true, aliases:''
    };
    manual.push(test);
    selected.add(test.id);
    saveState();
    $('cedarsManualForm').reset();
    closeManual();
    render();
  }
  $('cedarsBlockedButton').addEventListener('click', () => {
    const panel = $('cedarsBlockedPanel');
    const open = panel.classList.contains('hidden');
    panel.classList.toggle('hidden', !open);
    $('cedarsBlockedButton').setAttribute('aria-expanded', String(open));
  });
  $('cedarsBlockedList').addEventListener('click', (event) => {
    const button = event.target.closest('[data-info]');
    if (button) detail(button.dataset.info);
  });
  $('cedarsLibraryBody').addEventListener('click', (event) => {
    const addButton = event.target.closest('[data-add]');
    const infoButton = event.target.closest('[data-info]');
    if (addButton) add(addButton.dataset.add);
    else if (infoButton) detail(infoButton.dataset.info);
  });
  const handleMatchAction = (event) => {
    const addButton = event.target.closest('[data-add]');
    const detailButton = event.target.closest('[data-info]');
    if (addButton) add(addButton.dataset.add);
    else if (detailButton) detail(detailButton.dataset.info);
  };
  $('cedarsSearchSuggestions').addEventListener('click', handleMatchAction);
  $('cedarsCart').addEventListener('click', (event) => {
    const button = event.target.closest('[data-remove]');
    if (!button) return;
    selected.delete(button.dataset.remove);
    saveState();
    render();
  });
  $('cedarsSearch').addEventListener('input', makeRows);
  $('cedarsType').addEventListener('change', makeRows);
  $('cedarsGroupBy').addEventListener('change', makeRows);
  $('cedarsContainerFilters').addEventListener('click', (event) => {
    const choice = event.target.closest('[data-container]');
    if (!choice) return;
    selectedContainer = choice.dataset.container || '';
    makeRows();
    renderContainerFilters();
  });
  const filterButton = $('cedarsFilterButton');
  const filterPanel = $('cedarsFilterPanel');
  const setFilterOpen = (open) => {
    filterPanel.classList.toggle('hidden', !open);
    filterButton.setAttribute('aria-expanded', String(open));
  };
  filterButton.addEventListener('click', () => setFilterOpen(filterPanel.classList.contains('hidden')));
  $('cedarsFilterDone').addEventListener('click', () => setFilterOpen(false));
  $('cedarsFilterReset').addEventListener('click', () => {
    $('cedarsType').value = '';
    $('showHolds').checked = false;
    selectedContainer = '';
    render();
    setFilterOpen(false);
  });
  document.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-photo-key]');
    if (trigger) {
      event.preventDefault();
      openPhoto(trigger.dataset.photoKey);
    }
    if (event.target === $('cedarsPhotoDialog')) closePhoto();
    if (!event.target.closest('#cedarsFilterControl')) setFilterOpen(false);
  });
  $('cedarsPhotoClose').addEventListener('click', closePhoto);
  $('cedarsPhotoDone').addEventListener('click', closePhoto);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setFilterOpen(false);
  });
  $('showHolds').addEventListener('change', makeRows);
  $('clearCart').addEventListener('click', () => { selected.clear(); saveState(); render(); });
  $('cedarsCsv').addEventListener('click', saveCsv);
  $('cedarsPrint').addEventListener('click', printPlan);
  $('cedarsInfoClose').addEventListener('click', () => $('cedarsInfoDialog').close());
  $('cedarsInfoDone').addEventListener('click', () => $('cedarsInfoDialog').close());
  $('cedarsDetailsToggle').addEventListener('click', () => { showCartDetails = !showCartDetails; renderCart(); });
  $('manualClose').addEventListener('click', closeManual);
  $('manualCancel').addEventListener('click', closeManual);
  $('cedarsManualForm').addEventListener('submit', submitManual);
  // Historical STAT reference links open matching tests directly in the collection directory.
  const linkedId = new URLSearchParams(window.location.search).get('test');
  if (linkedId) {
    const linked = byId(linkedId);
    if (linked) $('cedarsSearch').value = linked.name;
  }
  restoreState();
  render();
})();
