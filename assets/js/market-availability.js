/* Shared Quest / LabCorp collection-market safety gate.
 * Market acceptance is independent of STAT-menu eligibility.
 * Only add code-specific approvals or restrictions with an official local source
 * and verification date. An empty directory is NOT a nationwide approval.
 */
(() => {
  'use strict';
  const STORAGE_KEY = 'labCollectionCalculator.collectionMarket.v1';
  const LABELS = Object.freeze({
    socal: 'Southern California',
    norcal: 'Northern California',
    ny: 'New York',
    fl: 'Florida'
  });
  // Curated, evidence-backed per-LAB code entries belong here. Example schema:
  // '12345': { allowed: ['socal'], denied: ['ny'], source: 'Official lab URL',
  //            verified: 'YYYY-MM-DD', note: 'Only at the named receiving site' }
  // Do NOT turn a national test listing or a regional STAT menu into a routine
  // collection approval. Missing records remain unverified for every market.
  const RULES = Object.freeze({
    quest: Object.freeze({
      // The official Quest listing expressly assigns this order code to CA patients.
      '90372': { denied: ['ny', 'fl'], source: 'https://testdirectory.questdiagnostics.com/test/test-detail/90372/?cc=MASTER', verified: '2026-11-15', note: 'California patient testing code. For non-California patients use Quest 338; confirm local account acceptance.' },
      // These Quest codes expressly require a CA replacement order code.
      '335': { denied: ['socal','norcal'], source: 'https://testdirectory.questdiagnostics.com/test/test-detail/335/cholinesterase-plasma?cc=MASTER', verified: '2026-11-15', note: 'Non-California patient code; for California use Quest 90368.' },
      '39481': { denied: ['socal','norcal'], source: 'https://testdirectory.questdiagnostics.com/test/test-detail/39481/cholinesterase-serum-plasma-rbc?cc=MASTER', verified: '2026-11-15', note: 'Non-California patient code; for California use Quest 90369.' },
      '16167': { denied: ['socal','norcal','ny'], source: 'https://testdirectory.questdiagnostics.com/test/test-detail/16167/?cc=SKB', verified: '2026-11-15', note: 'Not offered for California patients; New York patients use Quest 16966.' }
    }),
    labcorp: Object.freeze({
      '791280': { denied: ['socal','norcal','ny'], source: 'https://www.labcorp.com/tests/791280/lead-blood-filter-paper', verified: '2026-11-15', note: 'Labcorp states this filter-paper lead assay is unavailable in New York and California.' }
    })
  });
  let acknowledged = false;
  let cartSignature = '';
  let mounted = false;

  function market() {
    try {
      const value = localStorage.getItem(STORAGE_KEY) || '';
      return Object.hasOwn(LABELS, value) ? value : '';
    } catch (_) { return ''; }
  }
  function label() { return LABELS[market()] || 'Not selected'; }
  function catalogLab() { return document.body?.classList.contains('labcorp-page') ? 'labcorp' : 'quest'; }
  function ruleFor(test, lab = catalogLab()) {
    return (RULES[lab] || {})[String(test?.testCode || '').trim()] || null;
  }
  function status(test, lab = catalogLab()) {
    const area = market();
    if (!area) return { kind: 'no-market', label: 'Choose market', reason: 'Select a collection market before adding tests.' };
    const rule = ruleFor(test, lab);
    if (rule && Array.isArray(rule.denied) && rule.denied.includes(area))
      return { kind: 'restricted', label: 'Not available in ' + LABELS[area], reason: rule.note || 'Not accepted by the receiving service area.', source: rule.source };
    if (rule && Array.isArray(rule.allowed) && rule.allowed.includes(area) && rule.source && rule.verified)
      return { kind: 'verified', label: 'Market verified', reason: 'Local market acceptance documented ' + rule.verified, source: rule.source };
    // An allow-list for other areas is NOT automatically a denial here:
    // routing to a different regional lab may still be possible.
    return { kind: 'unverified', label: 'Verify for ' + LABELS[area], reason: 'Not verified for this collection market. Confirm code, receiving site and local account in the official directory.' };
  }
  function canAdd(test, lab = catalogLab()) {
    const state = status(test, lab).kind;
    return state !== 'no-market' && state !== 'restricted';
  }
  function statAreaCompatible(statArea) {
    const area = market();
    if (!area || !statArea || statArea === 'unselected') return false;
    if (area === 'socal') return statArea.startsWith('socal');
    if (area === 'norcal') return statArea.startsWith('norcal');
    if (area === 'ny') return statArea.startsWith('ny');
    if (area === 'fl') return statArea === 'fl' || statArea === 'va_short_pump';
    return false;
  }
  function signature(tests, lab = catalogLab()) {
    return JSON.stringify([lab, market(), (tests || []).map(test => [String(test.id), String(test.testCode), String(test.testName), String(test.drawContainer), String(test.transportContainer), String(test.specialInstructions), JSON.stringify(test.additionalDrawRequirements || [])]).sort((a,b) => a[0].localeCompare(b[0]))]);
  }
  function reset() {
    acknowledged = false;
    cartSignature = '';
    const check = document.getElementById('marketAcceptanceCheck');
    if (check) check.checked = false;
  }
  function review(tests, lab = catalogLab()) {
    const array = Array.isArray(tests) ? tests : [];
    const nextSignature = signature(array, lab);
    if (cartSignature !== nextSignature) { reset(); cartSignature = nextSignature; }
    const selector = document.getElementById('collectionMarketSelect');
    if (selector && selector.value !== market()) selector.value = market();
    const regionText = document.getElementById('marketSelectionHelp');
    if (regionText) regionText.textContent = market()
      ? label() + ' selected. STAT receiving lab is a separate setting.'
      : 'Choose a market before adding tests. Your choice carries between Quest and LabCorp on this browser.';
    const panel = document.getElementById('marketReviewPanel');
    const desc = document.getElementById('marketReviewDescription');
    const check = document.getElementById('marketAcceptanceCheck');
    if (!panel || !desc || !check) return;
    const restricted = array.filter(t => status(t, lab).kind === 'restricted');
    const unverified = array.filter(t => status(t, lab).kind === 'unverified');
    panel.classList.toggle('market-review-blocked', !market() || restricted.length > 0);
    if (!array.length) {
      desc.textContent = 'Add tests to the cart to review local receiving-lab acceptance.';
    } else if (!market()) {
      desc.textContent = 'Select the collection market. The cart cannot be printed or exported without it.';
    } else if (restricted.length) {
      desc.textContent = restricted.map(t => t.testCode + ' ' + t.testName).join('; ') + ' cannot be used in ' + label() + '. Remove restricted tests before continuing.';
    } else if (unverified.length) {
      desc.textContent = unverified.length + ' of ' + array.length + ' test(s) have no documented local market approval. Check each code against the current official directory and receiving lab/account before collection.';
    } else {
      desc.textContent = 'All selected tests have recorded local-market evidence. Confirm receiving site, account and current requirements.';
    }
    check.disabled = !array.length || !market() || Boolean(restricted.length);
    check.checked = !check.disabled && acknowledged;
    const labelEl = document.getElementById('marketAcceptanceLabel');
    if (labelEl) labelEl.textContent = 'I confirmed acceptance of each selected test for ' + label() + ' with the receiving laboratory and account.';
  }
  function confirmed(tests, lab = catalogLab()) {
    const array = Array.isArray(tests) ? tests : [];
    return Boolean(array.length && market() && acknowledged &&
      !array.some(t => status(t, lab).kind === 'restricted') &&
      cartSignature === signature(array, lab));
  }
  function blockMessage(tests, lab = catalogLab()) {
    if (!market()) return 'Select a collection market before printing or exporting.';
    const restricted = (tests || []).filter(t => status(t, lab).kind === 'restricted');
    if (restricted.length) return 'Restricted for ' + label() + ': ' + restricted.map(t => t.testCode).join(', ') + '. Remove these tests.';
    return 'Verify each test with the receiving lab for ' + label() + ', then check the confirmation in the cart.';
  }
  function badge(test, lab = catalogLab()) {
    const s = status(test, lab);
    const cl = s.kind === 'restricted' ? 'restricted' : s.kind === 'verified' ? 'verified' : 'unverified';
    return '<span class="market-test-badge ' + cl + '" title="' + escapeAttribute(s.reason) + '">' + escapeHtml(s.label) + '</span>';
  }
  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  }
  function escapeAttribute(value) { return escapeHtml(value); }
  function mount() {
    if (mounted) return;
    const select = document.getElementById('collectionMarketSelect');
    const check = document.getElementById('marketAcceptanceCheck');
    if (!select || !check) return;
    mounted = true;
    select.value = market();
    select.addEventListener('change', () => {
      const value = Object.hasOwn(LABELS, select.value) ? select.value : '';
      try { if (value) localStorage.setItem(STORAGE_KEY, value); else localStorage.removeItem(STORAGE_KEY); } catch (_) {}
      reset();
      document.dispatchEvent(new CustomEvent('labmarketchange', { detail: { market: value } }));
    });
    check.addEventListener('change', () => {
      acknowledged = Boolean(check.checked && !check.disabled);
      document.dispatchEvent(new CustomEvent('labmarketreviewchange'));
    });
  }
  window.LabMarketAvailability = Object.freeze({
    mount, market, label, status, canAdd, statAreaCompatible,
    review, confirmed, blockMessage, badge, reset, labels: LABELS
  });
})();