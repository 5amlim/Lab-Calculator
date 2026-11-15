/* Decorative, non-interactive exact-match hints for multi-line lab test entry. */
(function () {
  'use strict';

  // Only show a label when exactly one active catalog record owns the code/name.
  // No guesses from partial names, aliases, fuzzy matches, or leading-zero changes.
  function resolveExact(query, database, normalizeSearch) {
    var value = String(query || '').trim();
    if (!value || !Array.isArray(database)) return null;
    var codeMatches = database.filter(function (test) {
      return String(test.testCode || '').trim().toLowerCase() === value.toLowerCase();
    });
    if (codeMatches.length) {
      return codeMatches.length === 1 && codeMatches[0].status === 'active'
        ? String(codeMatches[0].testName || '').trim() || null : null;
    }
    var normalized = normalizeSearch(value);
    if (!normalized) return null;
    var nameMatches = database.filter(function (test) {
      return test.status === 'active' && normalizeSearch(test.testName) === normalized;
    });
    return nameMatches.length === 1
      ? String(nameMatches[0].testCode || '').trim() || null : null;
  }

  function mount(textarea, resolveExactHint) {
    if (!textarea || !textarea.parentElement || typeof resolveExactHint !== 'function') return function () {};

    var mirror = document.createElement('div');
    mirror.className = 'batch-inline-ghost';
    mirror.setAttribute('aria-hidden', 'true');
    textarea.parentElement.insertBefore(mirror, textarea);

    function copyMetrics() {
      var style = window.getComputedStyle(textarea);
      var keys = [
        'fontFamily', 'fontSize', 'fontWeight', 'fontStyle', 'fontStretch',
        'lineHeight', 'letterSpacing', 'wordSpacing', 'textAlign', 'textIndent',
        'textTransform', 'tabSize', 'paddingTop', 'paddingBottom',
        'paddingLeft', 'borderTopWidth', 'borderBottomWidth',
        'borderLeftWidth', 'borderRightWidth'
      ];
      keys.forEach(function (key) { mirror.style[key] = style[key]; });
      var scrollbarWidth = textarea.offsetWidth - textarea.clientWidth -
        parseFloat(style.borderLeftWidth || '0') - parseFloat(style.borderRightWidth || '0');
      mirror.style.paddingRight = (parseFloat(style.paddingRight || '0') + Math.max(0, scrollbarWidth)) + 'px';
      mirror.style.borderStyle = 'solid';
      mirror.style.borderColor = 'transparent';
      mirror.style.left = textarea.offsetLeft + 'px';
      mirror.style.top = textarea.offsetTop + 'px';
      mirror.style.width = textarea.offsetWidth + 'px';
      mirror.style.height = textarea.offsetHeight + 'px';
    }

    function syncScroll() {
      mirror.scrollTop = textarea.scrollTop;
      mirror.scrollLeft = textarea.scrollLeft;
    }

    function refresh() {
      copyMetrics();
      mirror.replaceChildren();
      if (!textarea.value) { syncScroll(); return; }

      var lines = textarea.value.split('\n');
      var hints = [];
      lines.forEach(function (line, index) {
        if (index) mirror.appendChild(document.createTextNode('\n'));
        mirror.appendChild(document.createTextNode(line));
        var query = line.trim();
        if (!query) return;
        var hint = resolveExactHint(query);
        if (!hint) return;
        var anchor = document.createElement('span');
        anchor.className = 'batch-inline-ghost-anchor';
        var label = document.createElement('span');
        label.className = 'batch-inline-ghost-label';
        label.textContent = ' • ' + hint;
        anchor.appendChild(label);
        mirror.appendChild(anchor);
        hints.push({ anchor: anchor, label: label });
      });

      // A long name must never cover the next line or shift the textarea layout.
      var rightEdge = mirror.getBoundingClientRect().right -
        parseFloat(window.getComputedStyle(mirror).paddingRight || '0') - 5;
      hints.forEach(function (entry) {
        var free = Math.floor(rightEdge - entry.anchor.getBoundingClientRect().left);
        entry.label.style.maxWidth = Math.max(0, free) + 'px';
        if (free < 35) entry.label.style.display = 'none';
      });
      syncScroll();
    }

    textarea.addEventListener('input', refresh);
    textarea.addEventListener('scroll', syncScroll, { passive: true });
    window.addEventListener('resize', refresh, { passive: true });
    if (window.ResizeObserver) new ResizeObserver(refresh).observe(textarea);
    refresh();
    return refresh;
  }

  window.LabBatchInlineHints = { mount: mount, resolveExact: resolveExact };
})();
