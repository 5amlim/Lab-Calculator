/* Scroll affordances for the test directory and selected-test lists. */
(function () {
  'use strict';
  const targets = '.table-wrap, .cart-tests-viewport';
  const initialized = new WeakSet();
  function setup(viewport) {
    if (!viewport || initialized.has(viewport) || !viewport.parentElement) return;
    initialized.add(viewport);
    const frame = document.createElement('div');
    frame.className = 'scroll-cue-frame';
    viewport.parentNode.insertBefore(frame, viewport);
    frame.appendChild(viewport);
    const down = document.createElement('div');
    down.className = 'scroll-cue-bottom';
    down.setAttribute('aria-hidden', 'true');
    down.innerHTML = '<span>Scroll for more ↓</span>';
    const right = document.createElement('div');
    right.className = 'scroll-cue-right';
    right.setAttribute('aria-hidden', 'true');
    right.innerHTML = '<span>Scroll →</span>';
    frame.append(down, right);
    let queued = false;
    function update() {
      queued = false;
      if (!viewport.isConnected) return;
      const style = window.getComputedStyle(viewport);
      const vertical = /(auto|scroll)/.test(style.overflowY);
      const horizontal = /(auto|scroll)/.test(style.overflowX);
      const below = vertical && viewport.clientHeight > 60 &&
        viewport.scrollHeight > viewport.clientHeight + 12 &&
        viewport.scrollTop + viewport.clientHeight < viewport.scrollHeight - 8;
      const moreRight = horizontal && viewport.clientWidth > 100 &&
        viewport.scrollWidth > viewport.clientWidth + 12 &&
        viewport.scrollLeft + viewport.clientWidth < viewport.scrollWidth - 8;
      frame.classList.toggle('scroll-cue-more-below', below);
      frame.classList.toggle('scroll-cue-more-right', moreRight);
      if ((below || moreRight) && !viewport.hasAttribute('tabindex')) viewport.tabIndex = 0;
    }
    function scheduleUpdate() {
      if (queued) return;
      queued = true;
      requestAnimationFrame(update);
    }
    viewport.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate, { passive: true });
    if (typeof ResizeObserver !== 'undefined') {
      const observer = new ResizeObserver(scheduleUpdate);
      observer.observe(viewport);
      if (viewport.firstElementChild) observer.observe(viewport.firstElementChild);
    }
    const changes = new MutationObserver(scheduleUpdate);
    changes.observe(viewport, { childList: true, subtree: true });
    scheduleUpdate();
  }
  function start() { document.querySelectorAll(targets).forEach(setup); }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else { start(); }
})();
