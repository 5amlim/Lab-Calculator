/* Jump straight to Cart on mobile and keep the shortcut off Cart controls. */
(function () {
  'use strict';

  function initMobileSummaryNav() {
    const shortcut = document.querySelector('a.mobile-summary[href="#testsOverviewSection"]');
    const cart = document.getElementById('testsOverviewSection');
    const summary = document.getElementById('collectionSummary');
    if (!shortcut || !cart || !summary) return;

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
      if (cartReached && document.activeElement === shortcut) shortcut.blur();
    }

    function requestVisibilityUpdate() {
      if (updateQueued) return;
      updateQueued = true;
      window.requestAnimationFrame(updateVisibility);
    }

    shortcut.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation();
      const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      cart.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
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
