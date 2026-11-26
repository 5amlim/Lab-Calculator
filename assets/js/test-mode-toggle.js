/* Switch the Select Tests area between the existing search and converter. */
(() => {
  'use strict';
  const find = document.getElementById('findTestsTab');
  const convert = document.getElementById('convertTestsTab');
  const findPanel = document.getElementById('findTestsView');
  const convertPanel = document.getElementById('convertTestsView');
  const description = document.getElementById('testModeDescription');
  const actions = document.querySelector('.library-heading .library-actions');
  const converterHeaderActions = document.getElementById('converterHeaderActions');
  const converterDetails = document.getElementById('labcorpCrosswalk');
  if (!find || !convert || !findPanel || !convertPanel) return;

  const source = document.body.dataset.galleryLab === 'Q' ? 'LabCorp' : 'Quest';
  const destination = document.body.dataset.galleryLab === 'Q' ? 'Quest' : 'LabCorp';
  function show(mode, focus = false) {
    const isFind = mode !== 'convert';
    find.classList.toggle('is-active', isFind);
    convert.classList.toggle('is-active', !isFind);
    find.setAttribute('aria-selected', String(isFind));
    convert.setAttribute('aria-selected', String(!isFind));
    find.tabIndex = isFind ? 0 : -1;
    convert.tabIndex = isFind ? -1 : 0;
    findPanel.hidden = !isFind;
    convertPanel.hidden = isFind;
    if (actions) actions.hidden = !isFind;
    if (converterHeaderActions) converterHeaderActions.hidden = isFind;
    if (description) description.textContent = isFind
      ? 'Search by test code or name.'
      : 'Find possible ' + destination + ' equivalents for ' + source + ' tests.';
    if (!isFind && converterDetails) converterDetails.open = true;
    if (focus) (isFind ? find : convert).focus({ preventScroll: true });
  }
  find.addEventListener('click', () => show('find'));
  convert.addEventListener('click', () => show('convert'));
  [find, convert].forEach(button => button.addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const target = event.key === 'Home' ? 'find'
      : event.key === 'End' ? 'convert'
      : button === find ? 'convert' : 'find';
    show(target, true);
  }));
  show('find');

  // One moving selection surface per segmented control. Read the actual
  // selected state instead of changing the calculator's clinical settings.
  for (const group of document.querySelectorAll('.test-mode-switch, .sst-mode-toggle')) {
    const buttons = Array.from(group.querySelectorAll(':scope > button'));
    if (buttons.length !== 2) continue;
    let lastGeometry = '';
    let frame = 0;
    function syncIndicator() {
      const selected = buttons.find(button => button.getAttribute('aria-selected') === 'true' ||
        button.getAttribute('aria-pressed') === 'true');
      if (!selected || !selected.offsetWidth || !selected.offsetHeight) return;
      const geometry = [selected.offsetLeft, selected.offsetTop, selected.offsetWidth, selected.offsetHeight];
      const key = geometry.join(',');
      if (key !== lastGeometry) {
        ['x', 'y', 'w', 'h'].forEach((name, index) =>
          group.style.setProperty('--calc-toggle-' + name, geometry[index] + 'px'));
        lastGeometry = key;
      }
      if (!group.classList.contains('calc-sliding-toggle')) {
        group.classList.add('calc-sliding-toggle');
        requestAnimationFrame(() => group.classList.add('calc-sliding-toggle-ready'));
      }
    }
    function schedule() {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        syncIndicator();
      });
    }
    group.classList.add('calc-toggle-positioned');
    const observer = new MutationObserver(schedule);
    buttons.forEach(button => observer.observe(button, {
      attributes: true, attributeFilter: ['aria-selected', 'aria-pressed']
    }));
    if (typeof ResizeObserver === 'function') {
      const resize = new ResizeObserver(schedule);
      resize.observe(group);
      buttons.forEach(button => resize.observe(button));
    }
    window.addEventListener('resize', schedule, { passive: true });
    syncIndicator();
  }
})();
