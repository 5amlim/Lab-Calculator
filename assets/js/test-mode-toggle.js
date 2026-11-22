/* Switch the Select Tests area between the existing search and converter. */
(() => {
  'use strict';
  const find = document.getElementById('findTestsTab');
  const convert = document.getElementById('convertTestsTab');
  const findPanel = document.getElementById('findTestsView');
  const convertPanel = document.getElementById('convertTestsView');
  const description = document.getElementById('testModeDescription');
  const actions = document.querySelector('.library-heading .library-actions');
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
})();
