/* Guide users to batch matches, newly added cart items, and unresolved entries.
   Works with the Quest and Labcorp calculators without changing add/confirm rules. */
(() => {
  'use strict';

  const DURATION = 3800;
  const TONES = ['review', 'cart', 'confirm', 'issue'];
  const timers = new WeakMap();
  const $ = id => document.getElementById(id);
  const results = $('batchResults');
  const cart = $('testsOverviewSection');
  const search = $('searchInput');
  if (!results || !cart || !search) return;

  const selectedCount = () => {
    const value = Number(($('selectedCount')?.textContent || '').trim());
    return Number.isFinite(value) ? value : 0;
  };

  function highlight(element, tone, duration = DURATION, animationDuration = duration) {
    if (!element || duration <= 0) return;
    const prior = timers.get(element);
    if (prior) clearTimeout(prior);
    element.classList.remove('calculator-action-glow',
      ...TONES.map(value => 'calculator-action-glow--' + value));
    element.style.animationDuration = `${animationDuration}ms`;
    // Re-run the animation when the same control is clicked again.
    void element.offsetWidth;
    element.classList.add('calculator-action-glow', 'calculator-action-glow--' + tone);
    timers.set(element, setTimeout(() => {
      element.classList.remove('calculator-action-glow', 'calculator-action-glow--' + tone);
      element.style.removeProperty('animation-duration');
      timers.delete(element);
    }, duration));
  }

  function highlightUnresolved() {
    // Draw attention to unadded entries regardless of whether the cart is empty.
    results.querySelectorAll('.batch-row.needs-confirmation, .batch-row.unmatched').forEach(row => {
      // A test already in the cart is not waiting for confirmation.
      if (row.classList.contains('needs-confirmation') &&
          row.querySelector('.batch-main-add-toggle:disabled')) return;
      // Missing, blocked or directory-only matches need different attention
      // from active matches that only need the user's confirmation.
      const isIssue = row.classList.contains('unmatched') ||
        !row.querySelector('.batch-main-add-toggle');
      // Five amber/coral glow pulses, then clean up after 10 seconds.
      highlight(row, isIssue ? 'issue' : 'confirm', 10000, 10000 / 5);
    });
  }


  // Capture the origin before the app replaces its search results or closes a menu.
  let lastOrigin = null;
  const visible = rect => rect.width > 0 && rect.height > 0 &&
    rect.bottom > 0 && rect.right > 0 && rect.top < window.innerHeight &&
    rect.left < window.innerWidth;
  function rememberOrigin(element) {
    if (!element) return;
    const rect = element.getBoundingClientRect();
    if (visible(rect)) lastOrigin = { rect, at: Date.now() };
  }
  document.addEventListener('click', event => {
    const control = event.target.closest?.('button, [role="option"], [role="button"]');
    if (control && (control.matches('#addBestButton, #crosswalkAddToCart, [data-action*="add"], [data-action*="confirm"]') ||
        control.closest('#batchResults, #libraryBody, #statMenuResults'))) {
      rememberOrigin(control);
    }
  }, true);
  document.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') rememberOrigin(event.target);
  }, true);

  function bubbleToCart(addedNames) {
    if (!addedNames.length || window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ||
        typeof Element.prototype.animate !== 'function') return;
    const mobile = document.querySelector('.mobile-summary');
    const title = $('testsOverviewTitle') || cart;
    const mobileRect = mobile?.getBoundingClientRect();
    const target = mobileRect && visible(mobileRect) ? mobile : title;
    const targetRect = target.getBoundingClientRect();
    const origin = lastOrigin && Date.now() - lastOrigin.at < 15000 ?
      lastOrigin.rect : search.getBoundingClientRect();
    if (!visible(origin)) return;
    const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
    const x = clamp(origin.left + origin.width / 2, 18, window.innerWidth - 18);
    const y = clamp(origin.top + origin.height / 2, 18, window.innerHeight - 18);
    const tx = clamp(targetRect.left + targetRect.width / 2, 18, window.innerWidth - 18);
    const ty = clamp(targetRect.top + targetRect.height / 2, 18, window.innerHeight - 18);
    const labels = addedNames.length > 3 ? [addedNames[0], '+' + (addedNames.length - 1) + ' tests'] : addedNames;
    labels.forEach((label, index) => {
      const bubble = document.createElement('span');
      bubble.className = 'no-print calculator-cart-flight';
      bubble.setAttribute('aria-hidden', 'true');
      bubble.textContent = label;
      Object.assign(bubble.style, {
        position: 'fixed', left: x + 'px', top: y + 'px',
        zIndex: '10000', pointerEvents: 'none', whiteSpace: 'nowrap',
        maxWidth: 'min(240px, 75vw)', overflow: 'hidden', textOverflow: 'ellipsis',
        padding: '8px 14px', borderRadius: '999px', fontSize: '14px',
        fontWeight: '650', lineHeight: '1.3', color: '#146448',
        background: '#e9f8f0', border: '1px solid #9dd9bc',
        boxShadow: '0 3px 12px rgba(22, 101, 71, .16)',
        transform: 'translate(-50%, -50%)', opacity: '0'
      });
      document.body.appendChild(bubble);
      const dx = tx - x, dy = ty - y;
      const move = (a, b, scale) =>
        'translate(calc(-50% + ' + a + 'px), calc(-50% + ' + b + 'px)) scale(' + scale + ')';
      const flight = bubble.animate([
        { transform: move(0, 0, .8), opacity: 0, offset: 0 },
        { transform: move(dx * .12, -32, 1.12), opacity: 1, offset: .22 },
        { transform: move(dx * .65, dy * .65 - 40, .95), opacity: 1, offset: .66 },
        { transform: move(dx, dy, .22), opacity: 0, offset: 1 }
      ], { duration: 900, delay: index * 110, easing: 'cubic-bezier(.25,.65,.35,1)', fill: 'both' });
      flight.onfinish = () => {
        bubble.remove();
        if (index === labels.length - 1 && visible(target.getBoundingClientRect())) {
          target.animate([{ scale: '1' }, { scale: '1.065' },
            { scale: '1' }], { duration: 280, easing: 'ease-out' });
        }
      };
      flight.oncancel = () => bubble.remove();
      setTimeout(() => bubble.remove(), 1600 + index * 110);
    });
  }


  // A short, non-blocking animation; preserve existing transforms and focus.
  const activeMotion = new WeakMap();
  function microMotion(element, frames, duration = 170) {
    if (!element || !element.getClientRects().length ||
        window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ||
        typeof element.animate !== 'function') return;
    activeMotion.get(element)?.cancel();
    activeMotion.set(element, element.animate(frames, { duration, easing: 'ease-out' }));
  }
  const reveal = element => microMotion(element, [
    { opacity: .25, translate: '0 7px' }, { opacity: 1, translate: '0 0' }
  ], 280);
  // A visible release cue for controls that remain on screen after the click.
  // Do not animate typing, disabled buttons or controls that were removed.
  document.addEventListener('click', event => {
    const button = event.target.closest?.('button:not(:disabled):not([aria-disabled="true"]), summary, .mobile-summary');
    if (!button || button.closest('.calc-sliding-toggle')) return;
    requestAnimationFrame(() => {
      if (!button.isConnected || !visible(button.getBoundingClientRect())) return;
      microMotion(button, [
        { scale: '1' }, { scale: '.96', offset: .28 },
        { scale: '1.025', offset: .7 }, { scale: '1' }
      ], 260);
    });
  }, true);
  const pulse = element => microMotion(element, [
    { scale: '1', opacity: 1 }, { scale: '1.10', opacity: .60, offset: .45 }, { scale: '1', opacity: 1 }
  ], 280);

  // Show a quick entrance on newly revealed catalog rows after Show more.
  // Never animate the full table on every search/filter keystroke.
  for (const id of ['loadMoreButton', 'loadMoreInlineButton']) {
    $(id)?.addEventListener('click', () => {
      const body = $('libraryBody');
      if (!body) return;
      const priorCount = body.rows.length;
      setTimeout(() => {
        const addedRows = Array.from(body.rows).slice(priorCount, priorCount + 8);
        for (const row of addedRows) {
          if (visible(row.getBoundingClientRect())) reveal(row);
        }
      }, 0);
    }, true);
  }

  // Animate intentional mode changes, not rerenders during typing.
  for (const id of ['findTestsView', 'convertTestsView']) {
    const panel = $(id);
    if (!panel) continue;
    new MutationObserver(records => {
      if (!panel.hidden && records.some(record => record.oldValue !== null)) reveal(panel);
    }).observe(panel, { attributes: true, attributeOldValue: true, attributeFilter: ['hidden'] });
  }
  // Only animate the body of a disclosure when opened; never delay closing.
  document.addEventListener('toggle', event => {
    const details = event.target;
    if (!details.matches?.('details[open]')) return;
    const content = details.querySelector(':scope > .cart-collapse-body, :scope > .collection-alerts-list');
    if (content) reveal(content);
  }, true);

  // New optional container cards are the only animated children of this form.
  const additionalContainers = $('additionalContainers');
  if (additionalContainers) {
    new MutationObserver(records => {
      for (const record of records) for (const node of record.addedNodes) {
        if (node.nodeType === 1 && node.matches('.additional-container-card')) reveal(node);
      }
    }).observe(additionalContainers, { childList: true });
  }

  function watchNewCartItems() {
    const overview = $('testsOverviewList');
    const details = $('selectedList');
    if (!overview || !details) return;

    // The existing remove controls carry each test's unique ID, so the cue
    // follows actual cart additions rather than a change in the total count.
    const selectedIds = () => new Set(
      Array.from(overview.querySelectorAll('.tests-overview-remove[data-id]'),
        button => button.dataset.id).filter(Boolean)
    );
    const priorities = () => new Map([...overview.querySelectorAll('.tests-overview-row')]
      .map(row => [row.querySelector('.tests-overview-remove[data-id]')?.dataset.id,
        row.classList.contains('is-stat')]));
    let previouslySelected = selectedIds();
    let previousPriorities = priorities();
    const recentAdditions = new Map();
    // Only successful add operations can queue feedback. Restored or rerendered
    // cart rows must not be mistaken for new user additions.
    const pendingAdditions = new Set();
    document.addEventListener('calculator:cart-test-added', event => {
      if (event.detail?.id != null) pendingAdditions.add(String(event.detail.id));
    });

    const onCartChange = () => {
      const current = selectedIds();
      const now = Date.now();
      const addedNow = [...current].filter(id => pendingAdditions.has(id) && !previouslySelected.has(id));
      for (const id of current) pendingAdditions.delete(id);
      for (const id of addedNow) recentAdditions.set(id, now + DURATION);
      const removedNow = [...previouslySelected].filter(id => !current.has(id));
      const nextPriorities = priorities();
      if (removedNow.length) {
        pulse($('selectedCount'));
        pulse($('mobileCount'));
        pulse($('testsOverviewTitle'));
      }
      for (const row of overview.querySelectorAll('.tests-overview-row')) {
        const id = row.querySelector('.tests-overview-remove[data-id]')?.dataset.id;
        if (previousPriorities.has(id) && previousPriorities.get(id) !== nextPriorities.get(id)) {
          pulse(row.querySelector('.stat-toggle'));
        }
      }
      previousPriorities = nextPriorities;
      previouslySelected = current;

      // After a genuine addition, reveal the newest test at the bottom of
      // the cart's own scrollable list without moving the main page.
      if (addedNow.length) {
        const names = [...overview.querySelectorAll('.tests-overview-row')]
          .filter(row => addedNow.includes(row.querySelector('.tests-overview-remove[data-id]')?.dataset.id))
          .map(row => row.querySelector('.tests-overview-name')?.textContent?.trim())
          .filter(Boolean);
        bubbleToCart(names);
        const viewport = $('cartTestsViewport');
        if (viewport) {
          window.requestAnimationFrame(() => {
            const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
            const target = Math.max(0, viewport.scrollHeight - viewport.clientHeight);
            if (typeof viewport.scrollTo === 'function') {
              viewport.scrollTo({ top: target, behavior: reduceMotion ? 'auto' : 'smooth' });
            } else {
              viewport.scrollTop = target;
            }
          });
        }
      }
      for (const [id, expires] of recentAdditions) {
        if (!current.has(id) || expires <= now) recentAdditions.delete(id);
      }
      if (!recentAdditions.size) return;

      // Keep cart highlights across rerenders of its regular and expanded views.
      for (const container of [overview, details]) {
        container.querySelectorAll('.tests-overview-row, .selected-card').forEach(row => {
          const id = row.querySelector('[data-action="remove"][data-id]')?.dataset.id;
          const remaining = recentAdditions.get(id) - now;
          if (remaining > 0) highlight(row, 'cart', remaining);
        });
      }

      // The matching test card should confirm a successful addition too.
      // These IDs come from actual changes to the cart, not from a click
      // that could be cancelled, rejected, or already selected.
      if (!results.classList.contains('hidden')) {
        results.querySelectorAll('.batch-row:not(.batch-category-row)').forEach(row => {
          const button = row.querySelector('.batch-main-add-toggle[data-id]');
          const remaining = recentAdditions.get(button?.dataset.id) - now;
          if (button?.disabled && remaining > 0) highlight(row, 'cart', remaining);
        });
        // Category search results have individual add buttons rather than
        // a single match card. Only highlight the added category item.
        results.querySelectorAll('.batch-category-item').forEach(item => {
          const button = item.querySelector('.batch-category-add[data-id]');
          const remaining = recentAdditions.get(button?.dataset.id) - now;
          if (remaining > 0) highlight(item, 'cart', remaining);
        });
      }
    };

    const observer = new MutationObserver(onCartChange);
    observer.observe(overview, { childList: true });
    observer.observe(details, { childList: true });
  }

  watchNewCartItems();

  function trigger(kind) {
    if (!search.value.trim()) return;
    const before = selectedCount();
    // Both calculators synchronously replace the review/cart markup in their click
    // handlers. Read the rendered outcome only after those handlers have finished.
    setTimeout(() => {
      if (results.classList.contains('hidden') || !results.querySelector('.batch-grid')) return;
      if (kind === 'review') highlight(results, 'review');
      if (kind === 'add' && selectedCount() > before) highlight(cart, 'cart');
      highlightUnresolved();
    }, 0);
  }

  // Capture before the app's click handler so the cart delta is accurate.
  $('previewButton')?.addEventListener('click', () => trigger('review'), true);
  $('addBestButton')?.addEventListener('click', () => trigger('add'), true);
  // Match the existing Cmd/Ctrl + Enter shortcut for Add best matches.
  search.addEventListener('keydown', event => {
    if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) trigger('add');
  }, true);
})();
