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
        padding: '6px 11px', borderRadius: '999px', fontSize: '12px',
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
        { transform: move(dx * .12, -24, 1.08), opacity: 1, offset: .22 },
        { transform: move(dx * .65, dy * .65 - 40, .87), opacity: 1, offset: .66 },
        { transform: move(dx, dy, .22), opacity: 0, offset: 1 }
      ], { duration: 650, delay: index * 90, easing: 'cubic-bezier(.25,.65,.35,1)', fill: 'both' });
      flight.onfinish = () => {
        bubble.remove();
        if (index === labels.length - 1 && visible(target.getBoundingClientRect())) {
          target.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.045)' },
            { transform: 'scale(1)' }], { duration: 220, easing: 'ease-out' });
        }
      };
      flight.oncancel = () => bubble.remove();
      setTimeout(() => bubble.remove(), 1200 + index * 90);
    });
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
    let previouslySelected = selectedIds();
    const recentAdditions = new Map();

    const onCartChange = () => {
      const current = selectedIds();
      const now = Date.now();
      const addedNow = [...current].filter(id => !previouslySelected.has(id));
      for (const id of addedNow) recentAdditions.set(id, now + DURATION);
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
