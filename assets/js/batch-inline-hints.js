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
      if (codeMatches.length !== 1) return null;
      var match = codeMatches[0];
      var name = String(match.testName || '').trim();
      if (!name) return null;
      if (match.status === 'blocked') return { text: name, tone: 'blocked' };
      return match.status === 'active' ? name : null;
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
      if ((!textarea.value && !options.emptyLineHint) || innerWidth < 45) {
        if (typeof options.onStatusRows === 'function') options.onStatusRows([]);
        syncScroll();
        return;
      }
      // Use native textarea rendering for recolored text, rather than a
      // span with subtly different glyph metrics (especially on mobile).
      // Each noninteractive mirror covers its entire row, including trailing
      // glyphs, without modifying the original input, caret or copied value.
      function colorMirror(line, row, visualRows, index, className, color) {
        var mirror = document.createElement('textarea');
        mirror.className = className + ' batch-native-color-mirror';
        mirror.dataset.lineIndex = String(index);
        mirror.setAttribute('aria-hidden', 'true');
        mirror.tabIndex = -1;
        mirror.readOnly = true;
        mirror.wrap = textarea.wrap === 'off' ? 'off' : 'soft';
        mirror.value = line;
        var width = innerWidth;
        if (mirror.wrap === 'off') {
          width = Math.max(width, ctx.measureText(line).width +
            letterSpacing * line.length + wordSpacing * (line.match(/ /g) || []).length + 12);
        }
        var props = {
          position:'absolute',display:'block',boxSizing:'border-box',
          left:(borderLeft + paddingLeft)+'px',
          top:(borderTop + paddingTop + row*lineHeight)+'px',
          width:width+'px',height:(visualRows*lineHeight)+'px',
          minWidth:'0',minHeight:'0',maxWidth:'none',maxHeight:'none',
          margin:'0',padding:'0',border:'0',borderRadius:'0',outline:'0',
          boxShadow:'none',resize:'none',overflow:'hidden',pointerEvents:'none',
          backgroundColor:style.backgroundColor || '#fff',
          color:color,transform:'none',animation:'none',transition:'none'
        };
        for (var property of ['fontFamily','fontSize','fontWeight','fontStyle',
          'fontStretch','fontVariant','fontKerning','fontFeatureSettings',
          'fontVariationSettings','fontOpticalSizing','letterSpacing',
          'wordSpacing','tabSize','textTransform','textAlign','direction','lineHeight']) {
          if (style[property]) props[property] = style[property];
        }
        for (var key in props) {
          mirror.style.setProperty(key.replace(/[A-Z]/g,function(m){return '-'+m.toLowerCase();}),props[key],'important');
        }
        mirror.style.setProperty('-webkit-text-fill-color',color,'important');
        mirror.style.setProperty('-webkit-text-size-adjust','100%','important');
        mirror.style.setProperty('text-size-adjust','100%','important');
        layer.appendChild(mirror);
        return mirror;
      }
      var row = 0;
      var statusRows = [];
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
        // Paint only unavailable text in a noninteractive mask. Native
        // textarea text remains editable, selectable and copyable.
        var tone = query && typeof options.lineTone === 'function'
          ? options.lineTone(query, index) : null;
        if (tone === 'unavailable' && typeof options.onStatusRows === 'function') {
          // Place the lookup icon after the last visible character, without
          // changing the entered text or the textarea's line wrapping.
          var textWidth = ctx.measureText(line).width + letterSpacing * line.length +
            wordSpacing * (line.match(/ /g) || []).length;
          var atRight = Math.min(innerWidth - 23, Math.max(0, textWidth + 10));
          statusRows.push({
            index: index, query: query, tone: tone,
            left: textarea.offsetLeft + borderLeft + paddingLeft + atRight,
            top: textarea.offsetTop + borderTop + paddingTop +
              (row + visualRows - 1) * lineHeight + (lineHeight - 20) / 2
          });
        }
        // A stable visual layer for unresolved entries, not a hover-only
        // replacement. Hover changes only its paint color. Keep native text
        // visible on the caret/selection rows so editing stays unobstructed.
        if (tone === 'unavailable' && textarea.classList.contains('batch-directory-gutter')) {
          var selectionFirst = textarea.value.slice(0,textarea.selectionStart || 0).split('\n').length - 1;
          var selectionLast = textarea.value.slice(0,textarea.selectionEnd || 0).split('\n').length - 1;
          var editingRow = document.activeElement === textarea &&
            index >= selectionFirst && index <= selectionLast;
          if (!editingRow) {
            var mirror = colorMirror(line,row,visualRows,index,'batch-directory-hover-text',
              'var(--batch-directory-entry-color)');
            mirror.style.setProperty('--batch-directory-normal-color',style.color);
          }
        }
        if (tone && document.activeElement === textarea &&
            textarea.selectionStart != null) {
          var caretPrefix = textarea.value.slice(0,textarea.selectionStart);
          var caretLine = (caretPrefix.match(/\n/g)||[]).length;
          if (caretLine === index) tone = null;
        }
        if (tone === 'unavailable' && options.colorUnavailable !== false) {
          colorMirror(line,row,visualRows,index,'batch-inline-ghost-status-unavailable','#b34b36');
        }
        // An optional empty-line hint supports converter rows with no candidate.
        // It is visual-only, never inserted into copied or submitted test codes.
        var hint = query ? resolveExactHint(query) :
          (typeof options.emptyLineHint === 'function' ? options.emptyLineHint(index) : null);
        var hintText = hint && typeof hint === 'object' ? String(hint.text || '') : hint;
        var matchedResult = !!(query && typeof options.isMatchedRow === 'function' &&
          options.isMatchedRow(index, query));
        if ((hintText || matchedResult) && visualRows === 1) {
          var prefixWidth = ctx.measureText(line).width + letterSpacing * line.length +
            wordSpacing * (line.match(/ /g) || []).length;
          var gap = query ? fontSize * 0.38 : 0;
          var space = innerWidth - prefixWidth - gap;
          if (space >= 32) {
            var label = document.createElement('span');
            label.className = 'batch-inline-ghost-label';
            label.dataset.lineIndex = String(index);
            label.textContent = hintText ? (query ? '\u2022 ' : '') + hintText : '';
            if (!query) label.classList.add('batch-inline-ghost-empty');
            // Direction indicator is decorative only. Keep underlying hint
            // values unchanged so locks, copying, and matching still work.
            if (!query && typeof hintText === 'string' &&
                hintText.startsWith('No match for ')) {
              label.classList.add('batch-inline-ghost-no-match');
              if(typeof options.onNoMatchAction === 'function'){
                label.classList.add('crosswalk-no-match-actionable');
                // The clickable magnifier now precedes the read-only no-match
                // message instead of appearing after its closing quote.
                label.style.maxWidth = space+'px';
              }
            }
            if (hint && typeof hint === 'object') {
              if (hint.tone === 'blocked') label.classList.add('batch-inline-ghost-blocked');
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
            // Mark only generated crosswalk matches. The indicator remains
            // outside the textarea's real value, with a fixed-width suffix
            // so it stays visible even when long test names are truncated.
            if (matchedResult) {
              var nameText = label.textContent;
              label.textContent = '';
              label.classList.add('crosswalk-matched-result');
              var matchedName = document.createElement('span');
              matchedName.className = 'crosswalk-matched-name';
              matchedName.textContent = nameText;
              var matchedArrow = document.createElement('span');
              matchedArrow.className = 'crosswalk-matched-arrow';
              matchedArrow.textContent = '\u2194';
              label.appendChild(matchedName);
              label.appendChild(matchedArrow);
            }
            label.style.left = (borderLeft + paddingLeft + prefixWidth + gap) + 'px';
            label.style.top = (borderTop + paddingTop + row * lineHeight) + 'px';
            label.style.maxWidth = space + 'px';
            layer.appendChild(label);
          }
        }
        row += visualRows;
      });
      if (typeof options.onStatusRows === 'function') options.onStatusRows(statusRows);
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

    // Animate the real code on its specific textarea line. Mask the native
    // text temporarily and shake an identical overlay, keeping other rows still.
    refresh.shakeCodeLine = function(lineIndex){
      var value = textarea.value.split('\n')[lineIndex] || '';
      if(!value.trim() || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)return;
      var style=window.getComputedStyle(textarea);
      var height=numeric(style.lineHeight)||numeric(style.fontSize)*1.5;
      var top=numeric(style.borderTopWidth)+numeric(style.paddingTop)+lineIndex*height;
      var left=numeric(style.borderLeftWidth)+numeric(style.paddingLeft);
      var previous=Array.from(layer.querySelectorAll('.batch-inline-ghost-code-mask'))
        .find(function(node){return node.dataset.lineIndex===String(lineIndex);});
      if(previous)previous.remove();
      var mask=document.createElement('span');
      mask.className='batch-inline-ghost-code-mask';
      mask.dataset.lineIndex=String(lineIndex);
      mask.style.top=top+'px';
      mask.style.left=(left-5)+'px';
      mask.style.padding='0 5px';
      mask.style.background=style.backgroundColor||'#fff';
      mask.style.color=style.color;
      mask.style.fontFamily=style.fontFamily;
      mask.style.fontSize=style.fontSize;
      mask.style.fontWeight=style.fontWeight;
      mask.style.fontStyle=style.fontStyle;
      mask.style.letterSpacing=style.letterSpacing;
      mask.style.lineHeight=style.lineHeight;
      var copy=document.createElement('span');
      copy.textContent=value;
      mask.appendChild(copy);
      layer.appendChild(mask);
      if(typeof copy.animate==='function'){
        var animation=copy.animate([
          {transform:'translateX(0)'},{transform:'translateX(-4px)'},
          {transform:'translateX(4px)'},{transform:'translateX(-3px)'},
          {transform:'translateX(3px)'},{transform:'translateX(0)'}
        ],{duration:260,easing:'ease-in-out'});
        animation.finished.then(function(){mask.remove();},function(){mask.remove();});
      }else{
        copy.classList.add('crosswalk-locked-shake');
        copy.addEventListener('animationend',function(){mask.remove();},{once:true});
      }
    };

    textarea.addEventListener('input', refresh);
    textarea.addEventListener('click', refresh);
    textarea.addEventListener('keyup', function(event){
      if (/^(Arrow|Home|End|Page)/.test(event.key)) refresh();
    });
    textarea.addEventListener('focus', refresh);
    textarea.addEventListener('blur', refresh);
    if (textarea.classList.contains('batch-directory-gutter')) {
      textarea.addEventListener('select', refresh);
    }
    textarea.addEventListener('scroll', syncScroll, { passive: true });
    window.addEventListener('resize', refresh, { passive: true });
    if (window.ResizeObserver) new window.ResizeObserver(refresh).observe(textarea);
    refresh();
    return refresh;
  }

  window.LabBatchInlineHints = { mount: mount, resolveExact: resolveExact };
})();
