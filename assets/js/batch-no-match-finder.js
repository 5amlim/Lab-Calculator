/* Search an active lab catalog for any unmatched Add Tests input line.
   The selected test code replaces that line only. Never adds to cart. */
(function () {
  'use strict';

  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function mount(config) {
    const textarea = config?.textarea;
    if (!textarea?.parentElement || typeof config.search !== 'function' ||
        typeof config.onSelect !== 'function') return { sync: () => {} };

    const lab = config.lab === 'LabCorp' ? 'LabCorp' : 'Quest';
    const host = textarea.parentElement;
    const layer = document.createElement('div');
    layer.className = 'batch-no-match-actions';
    host.appendChild(layer);

    const drawer = document.createElement('div');
    drawer.className = 'crosswalk-match-drawer-host batch-match-drawer-host';
    drawer.hidden = true;
    drawer.innerHTML =
      '<div class="crosswalk-match-drawer-scrim" data-close-batch-match="true"></div>' +
      '<aside class="crosswalk-match-drawer" role="dialog" aria-modal="true" aria-labelledby="batchMatchFinderTitle">' +
        '<header class="crosswalk-match-drawer-header">' +
          '<div><span class="crosswalk-match-drawer-eyebrow">ACTIVE ' + escapeHtml(lab.toUpperCase()) + ' TESTS</span>' +
          '<h3 id="batchMatchFinderTitle">Find a ' + escapeHtml(lab) + ' test</h3></div>' +
          '<button type="button" class="crosswalk-match-drawer-close" data-close-batch-match="true" aria-label="Close test finder">✕</button>' +
        '</header>' +
        '<p class="crosswalk-match-drawer-source" id="batchMatchFinderOriginal"></p>' +
        '<label class="crosswalk-match-drawer-search-label" for="batchMatchFinderQuery">Search ' + escapeHtml(lab) + ' directory</label>' +
        '<div class="crosswalk-match-drawer-search-box">' +
          '<span aria-hidden="true">⌕</span><input id="batchMatchFinderQuery" type="search" autocomplete="off" placeholder="Test name or code"></div>' +
        '<div class="crosswalk-match-directory-action"><a id="batchMatchFinderDirectoryLink" class="crosswalk-match-directory-button" target="_blank" rel="noopener noreferrer">Search ' + escapeHtml(lab) + ' directory ↗</a></div>' +
        '<p class="crosswalk-match-drawer-status" role="status" aria-live="polite"></p>' +
        '<div class="crosswalk-match-drawer-results" role="list"></div>' +
        '<footer class="crosswalk-match-drawer-footer">' +
          '<p><strong>Review before adding.</strong> A manually selected test is not automatically a clinical equivalent. Confirm analyte, method, specimen, volume, and transport requirements.</p>' +
        '</footer>' +
      '</aside>';
    document.body.appendChild(drawer);

    const searchInput = drawer.querySelector('#batchMatchFinderQuery');
    const sourceLabel = drawer.querySelector('#batchMatchFinderOriginal');
    const status = drawer.querySelector('.crosswalk-match-drawer-status');
    const results = drawer.querySelector('.crosswalk-match-drawer-results');
    const officialLink = drawer.querySelector('#batchMatchFinderDirectoryLink');
    let rows = [];
    let active = null;
    let previousFocus = null;

    function drawButtons() {
      layer.replaceChildren();
      if (drawer.hidden === false) return;
      for (const row of rows) {
        if (!row?.query || row.tone !== 'unavailable') continue;
        const top = row.top - textarea.scrollTop;
        if (top < -25 || top > textarea.clientHeight - 2) continue;
        const left = Math.min(row.left, Math.max(0, textarea.clientWidth - 28));
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'batch-no-match-search';
        button.dataset.lineIndex = String(row.index);
        button.style.top = top + 'px';
        button.style.left = left + 'px';
        button.title = 'Find a ' + lab + ' test for "' + row.query + '"';
        button.setAttribute('aria-label', 'Search ' + lab + ' tests for unmatched line ' +
          (row.index + 1) + ': ' + row.query);
        button.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">' +
          '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5"/></svg>';
        button.addEventListener('pointerdown', event => event.preventDefault());
        button.addEventListener('click', event => {
          event.preventDefault();
          event.stopPropagation();
          open(row.index, row.query, button);
        });
        layer.appendChild(button);
      }
    }

    function updateDirectoryLink() {
      const query = searchInput.value.trim() || active?.source || '';
      officialLink.href = config.directoryUrl?.(query) ||
        (lab === 'LabCorp'
          ? 'https://www.labcorp.com/test-menu/search?query=' + encodeURIComponent(query)
          : 'https://testdirectory.questdiagnostics.com/test/results?q=' + encodeURIComponent(query));
      officialLink.setAttribute('aria-label', 'Search official ' + lab + ' directory for ' + (query || 'tests'));
    }
    function renderMatches() {
      if (!active) return;
      const query = searchInput.value.trim();
      updateDirectoryLink();
      let matches = [];
      if (query) {
        try {
          matches = config.search(query) || [];
        } catch (_) {
          status.textContent = 'Directory search unavailable. Try again.';
          results.replaceChildren();
          return;
        }
      }
      const shown = matches.slice(0, 30);
      status.textContent = !query ? 'Enter a test name or code.' :
        matches.length ? 'Showing ' + shown.length + ' possible ' + lab + ' tests' :
        'No indexed tests found. Try a shorter name or a different code.';
      results.innerHTML = shown.map(item => {
        const code = String(item.code || '').trim();
        if (!code) return '';
        return '<div class="crosswalk-match-drawer-result" role="listitem">' +
          '<div class="crosswalk-match-drawer-result-details"><strong>' + escapeHtml(code) + '</strong>' +
            '<span>' + escapeHtml(item.name || '') + '</span>' +
            (item.specimen ? '<small>Specimen · ' + escapeHtml(item.specimen) + '</small>' : '') +
          '</div><button type="button" data-batch-code="' + escapeHtml(code) + '">Select</button></div>';
      }).join('');
    }

    function open(index, source, trigger) {
      const current = textarea.value.split('\n')[index]?.trim();
      if (!current || current !== source) return;
      active = { index, source };
      previousFocus = trigger;
      sourceLabel.textContent = 'Unmatched entry · ' + source;
      searchInput.value = source;
      drawer.hidden = false;
      document.body.classList.add('batch-match-drawer-visible');
      renderMatches();
      drawButtons();
      searchInput.focus({ preventScroll: true });
      searchInput.select();
    }

    function close() {
      if (drawer.hidden) return;
      drawer.hidden = true;
      document.body.classList.remove('batch-match-drawer-visible');
      active = null;
      drawButtons();
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
      else textarea.focus({ preventScroll: true });
    }

    searchInput.addEventListener('input', renderMatches);
    drawer.addEventListener('click', event => {
      if (event.target.closest('[data-close-batch-match]')) {
        close();
        return;
      }
      const picked = event.target.closest('button[data-batch-code]');
      if (!picked || !active) return;
      const code = picked.dataset.batchCode;
      const source = textarea.value.split('\n')[active.index]?.trim();
      if (source !== active.source) {
        status.textContent = 'The input line has changed. Close and reopen this search.';
        return;
      }
      if (config.onSelect(active.index, active.source, code) !== true) {
        status.textContent = 'Could not update this line. Please reopen the search.';
        return;
      }
      // The matched row no longer has an icon. Restore focus to Add Tests.
      previousFocus = null;
      close();
    });
    drawer.addEventListener('keydown', event => {
      if (event.key === 'Escape') { event.preventDefault(); close(); return; }
      if (event.key !== 'Tab') return;
      const elements = [...drawer.querySelectorAll('button,input,a[href]')]
        .filter(el => !el.disabled && el.getClientRects().length);
      if (!elements.length) return;
      const first = elements[0], last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault(); last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); first.focus();
      }
    });
    textarea.addEventListener('scroll', drawButtons, { passive: true });
    window.addEventListener('resize', drawButtons, { passive: true });

    return {
      sync(nextRows) {
        rows = Array.isArray(nextRows) ? nextRows : [];
        drawButtons();
      }
    };
  }

  window.LabBatchMatchFinder = { mount };
})();
