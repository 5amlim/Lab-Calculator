/* v11.79: Animated, tube-badged in-page popovers for Add/Edit Test and Filter Tests.
   Native selects remain the source of truth for all existing app logic. */
(() => {
  const selectors = ['specimenFilter','temperatureFilter','fastingFilter','specimenType','drawContainer','transportContainer','transportTemperature','spin'];
  const labels = {specimenFilter:'Specimen type',temperatureFilter:'Transport temperature',fastingFilter:'Fasting',specimenType:'Specimen type',drawContainer:'Draw container',transportContainer:'Transport tube / container',transportTemperature:'Transport temperature',spin:'Spin requirement'};
  const controls = [];
  let active = null;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  // These are the same tube illustration classes used by the results and print cards.
  // Labels and underlying option values are never changed.
  function tubeIconClass(name) {
    const value = String(name || '').toLowerCase();
    if (!value || /^(other \/ manually type|do not collect|verify official instructions)$/.test(value)) return '';
    if (/microtainer/.test(value)) return 'tube-microtainer';
    if (/uri[- ]?sponge/.test(value)) return 'tube-urisponge';
    if (/aptima/.test(value)) return 'tube-aptima';
    if (/total[- ]?fix/.test(value)) return 'tube-total-fix';
    if (/24\s*[- ]?hour\s+urine\s+(?:container|jug)/.test(value)) return 'tube-24h-urine';
    if (/sterile\s+(?:urine\s+)?cup|urine\s+collection\s+cup|stool\s+container/.test(value)) return 'tube-urine-cup';
    if (/red\/yellow/.test(value)) return 'tube-ua-swirl';
    if (/gray|grey/.test(value) && /urine|culture|boric/.test(value)) return 'tube-urine-culture';
    if (/royal blue/.test(value)) {
      if (/no additive|red stripe/.test(value)) return 'tube-royal-no-additive';
      if (/heparin/.test(value)) return 'tube-royal-heparin';
      if (/edta|purple stripe/.test(value)) return 'tube-royal-edta';
      return 'tube-royal';
    }
    if (/amber/.test(value)) return 'tube-amber';
    if (/acid[- ]?washed|metal[- ]?free/.test(value)) return 'tube-transport-green-top';
    if (/serum transport|plasma transport/.test(value)) return 'tube-transport-green-top';
    if (/viral transport|transport media|swab|collection kit/.test(value)) return 'tube-transport';
    if (/sst|gold/.test(value)) return 'tube-sst';
    if (/lavender/.test(value)) return 'tube-lavender';
    if (/pink/.test(value)) return 'tube-pink';
    if (/tan/.test(value)) return 'tube-tan';
    if (/heparin|green/.test(value)) return 'tube-green';
    if (/red top/.test(value)) return 'tube-red';
    if (/light blue|citrate/.test(value)) return 'tube-blue';
    if (/gray|grey/.test(value)) return 'tube-gray';
    if (/yellow/.test(value)) return 'tube-yellow';
    return '';
  }
  function sourceContainerName() {
    const draw = document.getElementById('drawContainer');
    if (!draw) return '';
    return draw.value === '__other__' ? document.getElementById('customDrawContainer')?.value : draw.value;
  }
  function iconFor(item, value) {
    if (!['drawContainer', 'transportContainer'].includes(item.select.id) || !value || value === '__other__') return '';
    if (item.select.id === 'transportContainer' && /^(no transfer \/ submit in original tube|whole blood \/ original tube)$/i.test(value)) {
      return tubeIconClass(sourceContainerName());
    }
    return tubeIconClass(value);
  }
  function iconElement(cls) {
    if (!cls) return null;
    const el = document.createElement('span');
    el.className = `portal-select-icon tube ${cls}`;
    el.setAttribute('aria-hidden', 'true');
    return el;
  }
  function animateClose(menu) {
    if (!menu || !menu.isConnected) return;
    menu.style.pointerEvents = 'none';
    menu.setAttribute('aria-hidden', 'true');
    menu.removeAttribute('id'); // Avoid duplicate active listbox IDs during the brief exit.
    if (reducedMotion.matches || !menu.animate) { menu.remove(); return; }
    const animation = menu.animate([
      {opacity: 1, transform: 'translateY(0) scale(1)'},
      {opacity: 0, transform: 'translateY(-3px) scale(.994)'}
    ], {duration: 105, easing: 'ease-in', fill: 'forwards'});
    animation.finished.then(() => menu.remove()).catch(() => menu.remove());
  }
  function closeAll(restoreFocus = false) {
    if (!active) return;
    const old = active;
    animateClose(old.menu);
    old.button.setAttribute('aria-expanded','false');
    active = null;
    if (restoreFocus) old.button.focus();
  }
  function sync(item) {
    const selected = item.select.selectedOptions[0];
    item.text.textContent = selected ? selected.textContent.trim() : 'Choose an option';
    item.icon?.remove();
    item.icon = iconElement(iconFor(item, item.select.value));
    if (item.icon) item.button.insertBefore(item.icon, item.text);
    item.button.classList.toggle('portal-select-placeholder', !item.select.value);
    item.button.disabled = item.select.disabled;
    item.button.setAttribute('aria-label', `${labels[item.select.id]}: ${item.text.textContent}`);
  }
  function position(item) {
    if (!active || active !== item) return;
    const box = item.button.getBoundingClientRect();
    if (box.bottom < 0 || box.top > innerHeight) { closeAll(); return; }
    const side = 12;
    const width = Math.min(Math.max(box.width, 210), innerWidth - side * 2);
    const left = Math.max(side, Math.min(box.left, innerWidth - side - width));
    const downSpace = innerHeight - box.bottom - 16;
    const upSpace = box.top - 16;
    const goUp = downSpace < 180 && upSpace > downSpace;
    const height = Math.min(300, Math.max(95, (goUp ? upSpace : downSpace) - 8));
    item.menu.style.width = `${width}px`;
    item.menu.style.left = `${left}px`;
    item.menu.style.maxHeight = `${height}px`;
    item.menu.style.top = goUp ? `${Math.max(8, box.top - height - 7)}px` : `${Math.min(innerHeight - 10, box.bottom + 7)}px`;
  }
  function selectChoice(item, value) {
    item.select.value = value;
    item.select.dispatchEvent(new Event('change', {bubbles:true}));
    closeAll();
    sync(item);
    item.button.focus();
  }
  function open(item, first = false) {
    if (active === item) { closeAll(); return; }
    closeAll();
    if (item.button.disabled) return;
    const menu = document.createElement('div');
    menu.className = 'portal-select-menu';
    menu.id = `portal-menu-${item.select.id}`;
    menu.setAttribute('role','listbox');
    menu.setAttribute('aria-label',labels[item.select.id]);
    [...item.select.options].forEach((option, index) => {
      const choice = document.createElement('button');
      choice.type = 'button';
      choice.className = 'portal-select-option';
      choice.setAttribute('role','option');
      choice.id = `portal-choice-${item.select.id}-${index}`;
      choice.dataset.value = option.value;
      const icon = iconElement(iconFor(item, option.value));
      if (icon) choice.append(icon);
      const optionText = document.createElement('span');
      optionText.className = 'portal-option-label';
      optionText.textContent = option.textContent.trim();
      choice.append(optionText);
      choice.disabled = option.disabled;
      const chosen = option.value === item.select.value;
      choice.setAttribute('aria-selected',String(chosen));
      if (chosen) choice.classList.add('is-selected');
      choice.addEventListener('click', e => {e.stopPropagation();selectChoice(item, option.value);});
      menu.append(choice);
    });
    // Dialogs are promoted to the browser top layer; popovers must remain inside the dialog.
    const root = item.select.closest('dialog') || item.select.closest('#catalogFilterControl') || document.body;
    root.append(menu);
    item.menu = menu;
    active = item;
    item.button.setAttribute('aria-expanded','true');
    position(item);
    const selected = menu.querySelector('.is-selected');
    (first ? menu.querySelector('.portal-select-option:not(:disabled)') : selected || menu.querySelector('.portal-select-option:not(:disabled)'))?.scrollIntoView({block:'nearest'});
    menu.addEventListener('keydown', e => {
      const choices = [...menu.querySelectorAll('.portal-select-option:not(:disabled)')];
      const i = choices.indexOf(document.activeElement);
      if (e.key === 'Escape') {e.preventDefault();e.stopPropagation();closeAll(true);return;}
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Home' || e.key === 'End') {
        e.preventDefault();
        const next = e.key === 'Home' ? 0 : e.key === 'End' ? choices.length-1 : (i + (e.key === 'ArrowDown' ? 1 : -1) + choices.length) % choices.length;
        choices[next]?.focus();
      }
    });
  }
  function init() {
    for (const id of selectors) {
      const select = document.getElementById(id);
      if (!select || select.dataset.portalReady) continue;
      select.dataset.portalReady = 'true';
      // Required values are validated by saveTestFromForm, which provides a useful toast.
      if (select.closest('#testForm')) select.required = false;
      select.classList.add('portal-select-native');
      select.tabIndex = -1;
      select.setAttribute('aria-hidden','true');
      const wrap = document.createElement('span');
      wrap.className = 'portal-select-wrap';
      const button = document.createElement('button');
      button.type = 'button';
      button.id = `portal-trigger-${id}`;
      button.className = 'portal-select-button';
      button.setAttribute('aria-haspopup','listbox');
      button.setAttribute('aria-expanded','false');
      button.setAttribute('aria-controls',`portal-menu-${id}`);
      const text = document.createElement('span');
      text.className = 'portal-select-text';
      const chevron = document.createElement('span');
      chevron.className = 'shared-chevron';
      chevron.setAttribute('aria-hidden','true');
      button.append(text, chevron);
      wrap.append(button);
      select.after(wrap);
      const item = {select,button,text,wrap,menu:null,icon:null};
      controls.push(item);
      sync(item);
      button.addEventListener('click', e => {e.preventDefault();e.stopPropagation();open(item);});
      button.addEventListener('keydown', e => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
          e.preventDefault();
          open(item);
          const choices = [...item.menu?.querySelectorAll('.portal-select-option:not(:disabled)') || []];
          const selectedIndex = choices.findIndex(ch=>ch.dataset.value===select.value);
          choices[Math.max(0,Math.min(choices.length-1,selectedIndex+(e.key==='ArrowDown'?1:-1)))]?.focus();
        }
      });
      select.addEventListener('change',()=>sync(item));
    }
    // The original-tube icon is always derived from the current draw selection.
    const draw = document.getElementById('drawContainer');
    const customDraw = document.getElementById('customDrawContainer');
    const transport = controls.find(item => item.select.id === 'transportContainer');
    draw?.addEventListener('change', () => { if (transport) sync(transport); });
    customDraw?.addEventListener('input', () => { if (transport) sync(transport); });
    window.syncPortalSelects = () => controls.forEach(sync);
    window.closePortalSelects = closeAll;
    window.focusPortalSelect = select => {
      const item = controls.find(item => item.select === select);
      if (item) item.button.focus(); else select.focus();
    };
    document.addEventListener('pointerdown', e => {
      if (active && !active.wrap.contains(e.target) && !active.menu.contains(e.target)) closeAll();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && active) {e.preventDefault();e.stopPropagation();closeAll(true);}
    }, true);
    // Reposition on resize or main scrolling, with no movement of the underlying form.
    window.addEventListener('resize',()=> {if(active) position(active);},{passive:true});
    document.addEventListener('scroll', e => {
      if (active && !active.menu.contains(e.target)) position(active);
    }, true);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',init);
  else init();
})();
