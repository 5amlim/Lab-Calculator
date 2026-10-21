/* Shared lab dropdown: native details for keyboard/touch support.
   Do not store lab choice; the main index page is always Quest. */
(function () {
  'use strict';
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
