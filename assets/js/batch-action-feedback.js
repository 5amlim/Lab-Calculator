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

  function highlight(element, tone) {
    if (!element) return;
    const prior = timers.get(element);
    if (prior) clearTimeout(prior);
    element.classList.remove('calculator-action-glow',
      ...TONES.map(value => 'calculator-action-glow--' + value));
    // Re-run the animation when the same control is clicked again.
    void element.offsetWidth;
    element.classList.add('calculator-action-glow', 'calculator-action-glow--' + tone);
    timers.set(element, setTimeout(() => {
      element.classList.remove('calculator-action-glow', 'calculator-action-glow--' + tone);
      timers.delete(element);
    }, DURATION));
  }

  function highlightUnresolved() {
    // Only highlight pending matches when there are tests in the cart.
    if (!selectedCount()) return;
    results.querySelectorAll('.batch-row.needs-confirmation, .batch-row.unmatched').forEach(row => {
      // A previously added match does not still need to be confirmed.
      if (row.classList.contains('needs-confirmation') &&
          row.querySelector('.batch-main-add-toggle:disabled')) return;
      const isIssue = row.classList.contains('unmatched') ||
        !row.querySelector('.batch-main-add-toggle');
      highlight(row, isIssue ? 'issue' : 'confirm');
    });
  }

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
