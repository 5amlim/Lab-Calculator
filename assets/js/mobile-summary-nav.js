/* Keep the mobile shortcut away from controls once the collection summary is visible. */
(function () {
  'use strict';

  function initMobileSummaryNav() {
    const shortcut = document.querySelector('a.mobile-summary[href="#collectionSummary"]');
    const summary = document.getElementById('collectionSummary');
    if (!shortcut || !summary) return;

    let updateQueued = false;
    function updateVisibility() {
      updateQueued = false;
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const bounds = summary.getBoundingClientRect();
      // Ignore the edges where only a sliver of the summary is in view.
      const summaryInView = bounds.top < viewportHeight - 96 && bounds.bottom > 72;
      shortcut.classList.toggle('is-in-summary', summaryInView);
      shortcut.setAttribute('aria-hidden', String(summaryInView));
      if (summaryInView && document.activeElement === shortcut) shortcut.blur();
    }

    function requestVisibilityUpdate() {
      if (updateQueued) return;
      updateQueued = true;
      window.requestAnimationFrame(updateVisibility);
    }

    // Handle the tap on the shortcut itself instead of letting a touch reach
    // underlying Cart controls while the viewport is scrolling.
    shortcut.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation();
      const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      summary.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
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
