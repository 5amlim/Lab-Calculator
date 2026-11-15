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

      // Rebuild the mirror using only the original textarea text. Inline
      // positioning elements can increase a line box's height and progressively
      // misalign subsequent rows. Collapsed ranges locate the true caret instead.
      var lines = textarea.value.split('\n');
      var hints = [];
      mirror.scrollTop = 0;
      mirror.scrollLeft = 0;
      lines.forEach(function (line, index) {
        if (index) mirror.appendChild(document.createTextNode('\n'));
        var node = document.createTextNode(line);
        mirror.appendChild(node);
        var query = line.trim();
        if (!query) return;
        var hint = resolveExactHint(query);
        if (hint) hints.push({ node: node, hint: hint });
      });

      var mirrorRect = mirror.getBoundingClientRect();
      var rightEdge = mirrorRect.right -
        parseFloat(window.getComputedStyle(mirror).paddingRight || '0') - 5;
      hints.forEach(function (entry) {
        var caret = document.createRange();
        caret.setStart(entry.node, entry.node.length);
        caret.collapse(true);
        var rect = caret.getBoundingClientRect();
        if (!rect || !rect.height) return;

        var label = document.createElement('span');
        label.className = 'batch-inline-ghost-label';
        label.textContent = '• ' + entry.hint;
        label.style.left = (rect.left - mirrorRect.left) + 'px';
        label.style.top = (rect.top - mirrorRect.top) + 'px';
        mirror.appendChild(label);

        var gap = parseFloat(window.getComputedStyle(label).marginLeft || '0');
        var free = Math.floor(rightEdge - rect.left - gap);
        label.style.maxWidth = Math.max(0, free) + 'px';
        if (free < 35) label.style.display = 'none';
      });
      syncScroll();
    }

    textarea.addEventListener('input', refresh);
    textarea.addEventListener('scroll', syncScroll, { passive: true });
    window.addEventListener('resize', refresh, { passive: true });
    if (window.ResizeObserver) new window.ResizeObserver(refresh).observe(textarea);
    refresh();
    return refresh;
  }

  window.LabBatchInlineHints = { mount: mount, resolveExact: resolveExact };
})();
