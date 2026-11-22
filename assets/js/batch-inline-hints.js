/* Decorative, noninteractive exact-match hints for multiline lab entry. */
(function () {
  'use strict';

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

  function mount(textarea, resolveExactHint, options) {
    options = options || {};
    if (!textarea || !textarea.parentElement || typeof resolveExactHint !== 'function') return function () {};

    // Only the textarea owns the text and caret. The overlay contains labels
    // with explicit coordinates, so it cannot affect any row's line height.
    var overlay = document.createElement('div');
    overlay.className = 'batch-inline-ghost';
    overlay.setAttribute('aria-hidden', 'true');
    var layer = document.createElement('div');
    layer.className = 'batch-inline-ghost-layer';
    overlay.appendChild(layer);
    textarea.parentElement.insertBefore(overlay, textarea);

    // An invisible measuring column reproduces native soft-wrapped rows.
    // It is never overlaid on the text and cannot change textarea layout.
    var measurer = document.createElement('div');
    measurer.className = 'batch-inline-ghost-measurer';
    textarea.parentElement.appendChild(measurer);
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');

    function numeric(value) {
      var number = parseFloat(value);
      return Number.isFinite(number) ? number : 0;
    }

    function syncScroll() {
      layer.style.transform = 'translate(' + (-textarea.scrollLeft) + 'px, ' + (-textarea.scrollTop) + 'px)';
    }

    function refresh() {
      var style = window.getComputedStyle(textarea);
      var borderTop = numeric(style.borderTopWidth);
      var borderLeft = numeric(style.borderLeftWidth);
      var borderRight = numeric(style.borderRightWidth);
      var paddingLeft = numeric(style.paddingLeft);
      var paddingRight = numeric(style.paddingRight);
      var paddingTop = numeric(style.paddingTop);
      var lineHeight = numeric(style.lineHeight) || numeric(style.fontSize) * 1.5;
      var fontSize = numeric(style.fontSize);
      var letterSpacing = style.letterSpacing === 'normal' ? 0 : numeric(style.letterSpacing);
      var wordSpacing = style.wordSpacing === 'normal' ? 0 : numeric(style.wordSpacing);
      var scrollbarWidth = Math.max(0, textarea.offsetWidth - textarea.clientWidth - borderLeft - borderRight);
      var innerWidth = Math.max(0, textarea.offsetWidth - borderLeft - borderRight - paddingLeft - paddingRight - scrollbarWidth);

      overlay.style.left = textarea.offsetLeft + 'px';
      overlay.style.top = textarea.offsetTop + 'px';
      overlay.style.width = textarea.offsetWidth + 'px';
      overlay.style.height = textarea.offsetHeight + 'px';
      overlay.style.fontFamily = style.fontFamily;
      overlay.style.fontSize = style.fontSize;
      overlay.style.fontWeight = style.fontWeight;
      overlay.style.fontStyle = style.fontStyle;
      overlay.style.lineHeight = style.lineHeight;
      overlay.style.letterSpacing = style.letterSpacing;

      measurer.style.width = innerWidth + 'px';
      // The converter uses one source code per visual row. Match the native
      // textarea's no-wrap behavior when measuring ghost label positions.
      measurer.style.whiteSpace = textarea.wrap === 'off' ? 'pre' : 'pre-wrap';
      measurer.style.fontFamily = style.fontFamily;
      measurer.style.fontSize = style.fontSize;
      measurer.style.fontWeight = style.fontWeight;
      measurer.style.fontStyle = style.fontStyle;
      measurer.style.lineHeight = style.lineHeight;
      measurer.style.letterSpacing = style.letterSpacing;
      measurer.style.wordSpacing = style.wordSpacing;
      measurer.style.tabSize = style.tabSize;
      ctx.font = [style.fontStyle, style.fontWeight, style.fontSize, style.fontFamily].join(' ');

      layer.replaceChildren();
      measurer.replaceChildren();
      if ((!textarea.value && !options.emptyLineHint) || innerWidth < 45) { syncScroll(); return; }
      var row = 0;
      var lines = textarea.value.split('\n');
      // Support decorative row labels beyond the last source entry (e.g. a
      // manually added Quest code on the matching right-hand output row).
      // These virtual lines never modify the textarea's actual value.
      var minRows = typeof options.minLineCount === 'function'
        ? Number(options.minLineCount()) : Number(options.minLineCount || 0);
      if (Number.isFinite(minRows)) {
        for (var i = lines.length; i < Math.min(2000, minRows); i++) lines.push('');
      }
      lines.forEach(function (line, index) {
        var measuredLine = document.createElement('div');
        measuredLine.className = 'batch-inline-ghost-measured-line';
        measuredLine.textContent = line || '\u200b';
        measurer.appendChild(measuredLine);
        var renderedHeight = measuredLine.getBoundingClientRect().height;
        var visualRows = Math.max(1, Math.round(renderedHeight / lineHeight));

        var query = line.trim();
        // An optional empty-line hint supports converter rows with no candidate.
        // It is visual-only, never inserted into copied or submitted test codes.
        var hint = query ? resolveExactHint(query) :
          (typeof options.emptyLineHint === 'function' ? options.emptyLineHint(index) : null);
        var hintText = hint && typeof hint === 'object' ? String(hint.text || '') : hint;
        if (hintText && visualRows === 1) {
          var prefixWidth = ctx.measureText(line).width + letterSpacing * line.length +
            wordSpacing * (line.match(/ /g) || []).length;
          var gap = query ? fontSize * 0.38 : 0;
          var space = innerWidth - prefixWidth - gap;
          if (space >= 32) {
            var label = document.createElement('span');
            label.className = 'batch-inline-ghost-label';
            label.dataset.lineIndex = String(index);
            label.textContent = (query ? '\u2022 ' : '') + hintText;
            if (!query) label.classList.add('batch-inline-ghost-empty');
            if (hint && typeof hint === 'object') {
              if (hint.tone === 'manual') label.classList.add('batch-inline-ghost-manual');
              if (hint.tone === 'reference') {
                label.classList.add('batch-inline-ghost-reference');
                if (hint.code) {
                  label.textContent = '';
                  var codeSpan = document.createElement('strong');
                  codeSpan.className = 'batch-inline-ghost-reference-code';
                  codeSpan.textContent = String(hint.code);
                  var nameSpan = document.createElement('span');
                  nameSpan.className = 'batch-inline-ghost-reference-name';
                  nameSpan.textContent = ' · ' + String(hint.name || '');
                  label.appendChild(codeSpan);
                  label.appendChild(nameSpan);
                }
              }
            }
            label.style.left = (borderLeft + paddingLeft + prefixWidth + gap) + 'px';
            label.style.top = (borderTop + paddingTop + row * lineHeight) + 'px';
            label.style.maxWidth = space + 'px';
            layer.appendChild(label);
          }
        }
        row += visualRows;
      });
      syncScroll();
    }

    // Shake only the protected decorative label. Never edit its ghost text.
    refresh.shakeLine = function (lineIndex) {
      var label = Array.from(layer.querySelectorAll('.batch-inline-ghost-label'))
        .find(function (node) { return node.dataset.lineIndex === String(lineIndex); });
      if (!label || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
      if (typeof label.animate === 'function') {
        label.animate([
          { transform: 'translateX(0)' },
          { transform: 'translateX(-4px)' },
          { transform: 'translateX(4px)' },
          { transform: 'translateX(-3px)' },
          { transform: 'translateX(3px)' },
          { transform: 'translateX(0)' }
        ], { duration: 260, easing: 'ease-in-out' });
      } else {
        label.classList.remove('crosswalk-locked-shake');
        void label.offsetWidth;
        label.classList.add('crosswalk-locked-shake');
      }
    };

    textarea.addEventListener('input', refresh);
    textarea.addEventListener('scroll', syncScroll, { passive: true });
    window.addEventListener('resize', refresh, { passive: true });
    if (window.ResizeObserver) new window.ResizeObserver(refresh).observe(textarea);
    refresh();
    return refresh;
  }

  window.LabBatchInlineHints = { mount: mount, resolveExact: resolveExact };
})();
