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

  function highlight(element, tone, duration = DURATION) {
    if (!element || duration <= 0) return;
    const prior = timers.get(element);
    if (prior) clearTimeout(prior);
    element.classList.remove('calculator-action-glow',
      ...TONES.map(value => 'calculator-action-glow--' + value));
    element.style.animationDuration = `${duration}ms`;
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
      highlight(row, isIssue ? 'issue' : 'confirm', 3000);
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
      for (const id of current) {
        if (!previouslySelected.has(id)) recentAdditions.set(id, now + DURATION);
      }
      previouslySelected = current;
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
