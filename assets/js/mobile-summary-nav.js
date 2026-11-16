/* Jump straight to Cart on mobile and keep the shortcut off Cart controls. */
(function () {
  'use strict';

  function initMobileSummaryNav() {
    const shortcut = document.querySelector('a.mobile-summary[href="#testsOverviewSection"]');
    const returnShortcut = document.querySelector('a.mobile-search-return[href="#batchEntry"]');
    const cart = document.getElementById('testsOverviewSection');
    const summary = document.getElementById('collectionSummary');
    const addTests = document.getElementById('batchEntry');
    if (!shortcut || !returnShortcut || !cart || !summary || !addTests) return;

    let updateQueued = false;
    function updateVisibility() {
      updateQueued = false;
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const cartBounds = cart.getBoundingClientRect();
      const summaryBounds = summary.getBoundingClientRect();
      // Keep View cart available above Cart; hide it when Cart reaches the viewport
      // and through the remainder of the summary so it cannot overlap any controls.
      const cartReached = cartBounds.top < viewportHeight - 96 && summaryBounds.bottom > 72;
      shortcut.classList.toggle('is-in-cart', cartReached);
      shortcut.setAttribute('aria-hidden', String(cartReached));
      returnShortcut.classList.toggle('is-in-cart', cartReached);
      returnShortcut.setAttribute('aria-hidden', String(!cartReached));
      if (cartReached && document.activeElement === shortcut) shortcut.blur();
      if (!cartReached && document.activeElement === returnShortcut) returnShortcut.blur();
    }

    function requestVisibilityUpdate() {
      if (updateQueued) return;
      updateQueued = true;
      window.requestAnimationFrame(updateVisibility);
    }

    let cartAccentTimer = null;
    shortcut.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation();
      const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      cart.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });

      // Briefly emphasize the destination, then restore its normal appearance.
      window.clearTimeout(cartAccentTimer);
      cart.classList.remove('cart-jump-highlight');
      // Restart the animation on repeated taps.
      void cart.offsetWidth;
      cart.classList.add('cart-jump-highlight');
      cartAccentTimer = window.setTimeout(function () {
        cart.classList.remove('cart-jump-highlight');
        cartAccentTimer = null;
      }, 2200);
    });

    // Return to the Add Tests entry area without opening the mobile keyboard
    // or changing the selected tests, input text, or filters.
    returnShortcut.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation();
      const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      addTests.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
    });

    window.addEventListener('scroll', requestVisibilityUpdate, { passive: true });
    window.addEventListener('resize', requestVisibilityUpdate, { passive: true });
    updateVisibility();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileSummaryNav, { once: true });
  } else {
    initMobileSummaryNav();
  }
})();
