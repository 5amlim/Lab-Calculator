/* Shared lab dropdown: native details for keyboard/touch support.
   Do not store lab choice; the main index page is always Quest. */
(function () {
  'use strict';
  // Published counts are available immediately, even if index requests fail.
  const counts = {quest:3313, cedars:39, labcorp:5632};
  const current = document.querySelector('.lab-select--quest') ? 'quest'
    : document.querySelector('.lab-select--labcorp') ? 'labcorp' : 'cedars';
  const recordCount = document.getElementById('recordCount');
  function syncLabBadges() {
    const match = /^\s*(\d+)\s+(?:active\s+)?tests?\b/i.exec(recordCount?.textContent || '');
    if (match && Number(match[1]) > 0) {
      counts[current] = Number(match[1]);
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
  if (typeof fetch === 'function') {
    for (const lab of ['quest', 'labcorp']) {
      if (lab === current) continue;
      fetch('assets/search/' + lab + '-tests.json', { cache: 'no-cache' })
        .then(response => response.ok ? response.json() : null)
        .then(index => {
          if (!Array.isArray(index?.tests) || !index.tests.length) return;
          counts[lab] = index.tests.length;
          syncLabBadges();
        })
        .catch(() => {});
    }
  }
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
