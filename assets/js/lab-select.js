/* Shared lab dropdown: native details for keyboard/touch support.
   Do not store lab choice; the main index page is always Quest. */
(function () {
  'use strict';
  // Verified published counts; update the active page from its live #recordCount.
  const counts = {quest:2692, cedars:39, labcorp:1072};
  const cacheKey = 'lab-selector-counts-v2:' + (location.pathname.split('/').filter(Boolean)[0] || 'site');
  try {
    const cached = JSON.parse(sessionStorage.getItem(cacheKey) || '{}');
    for (const name of Object.keys(counts)) if (Number.isInteger(cached[name]) && cached[name] > 0) counts[name] = cached[name];
  } catch (_) {}
  const current = document.querySelector('.lab-select--quest') ? 'quest'
    : document.querySelector('.lab-select--labcorp') ? 'labcorp' : 'cedars';
  const recordCount = document.getElementById('recordCount');
  function syncLabBadges() {
    const match = /^\s*(\d+)\s+tests?\b/i.exec(recordCount?.textContent || '');
    if (match && Number(match[1]) > 0) {
      counts[current] = Number(match[1]);
      try { sessionStorage.setItem(cacheKey, JSON.stringify(counts)); } catch (_) {}
    }
    document.querySelectorAll('.lab-select-choice').forEach(function (choice) {
      const lab = ['quest','cedars','labcorp'].find(name => choice.classList.contains(name));
      if (!lab) return;
      const selected = choice.getAttribute('aria-current') === 'page';
      let badge = choice.querySelector('.lab-select-choice-state');
      if (!badge) { badge = document.createElement('span'); choice.appendChild(badge); }
      badge.className = 'lab-select-choice-state' + (selected ? '' : ' lab-select-choice-count');
      badge.textContent = selected ? 'Selected' : counts[lab] + ' tests';
      badge.setAttribute('aria-label', selected ? 'Selected laboratory' : counts[lab] + ' available tests');
    });
  }
  syncLabBadges();
  if (recordCount && typeof MutationObserver !== 'undefined') {
    new MutationObserver(syncLabBadges).observe(recordCount, {childList:true,characterData:true,subtree:true});
  }

  document.querySelectorAll('.lab-select').forEach(function (dropdown) {
    document.addEventListener('pointerdown', function (event) {
      if (dropdown.open && !dropdown.contains(event.target)) {
        dropdown.open = false;
      }
    });
    dropdown.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && dropdown.open) {
        event.preventDefault();
        dropdown.open = false;
        const trigger = dropdown.querySelector('summary');
        if (trigger) trigger.focus();
      }
    });
  });
})();
