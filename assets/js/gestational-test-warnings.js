/* Pregnancy-specific test warnings shared by Quest and Labcorp calculators.
 * Verified against Quest gestational diabetes guide and Labcorp 101000/102004/102277.
 * This is labeling/education only: never changes collection tube or pooling rules.
 * Match exact codes first; use test names for future catalog additions.
 */
(() => {
  'use strict';
  const profiles = Object.freeze({
    '8477': { label: 'Gestational · 50 g screen', note: 'GESTATIONAL GLUCOSE SCREEN (50 g, 135 cutoff): No fasting required. Give the ordered 50 g glucose dose and collect ONE specimen exactly 1 hour afterward. Confirm this 135 mg/dL screening cutoff matches the order. Label the draw interval and collection time. This is NOT the fasting diagnostic OGTT.' },
    '19833': { label: 'Gestational · 50 g screen', note: 'GESTATIONAL GLUCOSE SCREEN (50 g, 140 cutoff): No fasting required. Give the ordered 50 g glucose dose and collect ONE specimen exactly 1 hour afterward. Confirm this 140 mg/dL screening cutoff matches the order. Label the draw interval and collection time. This is NOT the fasting diagnostic OGTT.' },
    '102277': { label: 'Gestational · 50 g screen', note: 'GESTATIONAL GLUCOSE SCREEN (50 g): Fasting is NOT required. Give 50 g oral glucose and collect ONE specimen at 1 hour. Label as 1-hour and record collection time. Do not substitute the fasting 75 g or 100 g diagnostic protocol.' },
    '18927': { label: 'Gestational · 75 g OGTT', note: 'GESTATIONAL DIAGNOSTIC OGTT (75 g): Confirm fasting preparation and clinician-approved protocol. Collect THREE separate tubes: FASTING before glucose, then 1 hour and 2 hours after 75 g oral glucose. Label each exact collection interval and time. Never pool timed tubes.' },
    '101000': { label: 'Gestational · 75 g OGTT', note: 'GESTATIONAL DIAGNOSTIC OGTT (75 g): Fast 8–14 hours, water permitted, per Labcorp instructions. Collect THREE separate specimens: FASTING before glucose, then at 1 hour and 2 hours after 75 g oral glucose. Label timepoints; do not pool. Follow supervised collection protocol.' },
    '6745': { label: 'Gestational · 100 g OGTT', note: 'GESTATIONAL DIAGNOSTIC OGTT (100 g): Confirm fasting preparation and clinician-approved protocol. Collect FOUR separate tubes: FASTING before glucose, then at 1, 2 and 3 hours after 100 g oral glucose. Record each draw time; do not pool. This differs from the nonfasting 50 g screen.' },
    '102004': { label: 'Gestational · 100 g OGTT', note: 'GESTATIONAL DIAGNOSTIC OGTT (100 g): Fast 8–14 hours, water permitted, per Labcorp instructions. Collect FOUR separate specimens: FASTING before glucose, then 1, 2 and 3 hours after 100 g oral glucose. Label all timepoints; do not pool. Follow supervised collection protocol.' },
    '1430': { label: 'Gestational · mixed draws', note: 'GESTATIONAL FASTING + SCREEN PANEL: Confirm the exact ordered fasting baseline and 50 g post-load screen, with the 135 mg/dL cutoff. Verify draw intervals and tube labels in the receiving Quest directory before administering glucose. Do not substitute a single nonfasting screen.' },
    '19834': { label: 'Gestational · mixed draws', note: 'GESTATIONAL FASTING + SCREEN PANEL: Confirm the exact ordered fasting baseline and 50 g post-load screen, with the 140 mg/dL cutoff. Verify draw intervals and tube labels in the receiving Quest directory before administering glucose. Do not substitute a single nonfasting screen.' }
  });

  function warningFor(test) {
    if (!test || typeof test !== 'object') return null;
    const code = String(test.testCode || '').trim();
    const name = String(test.testName || '').trim();
    const lower = name.toLowerCase();
    // Prevent a coincidentally matching numeric code from a different provider.
    const labcorp = document.body && (document.body.dataset.galleryLab === 'L' || document.body.classList.contains('labcorp-page'));
    const codeMatchesProvider = labcorp
      ? ['101000','102004','102277'].includes(code)
      : ['8477','19833','18927','6745','1430','19834'].includes(code);
    if (codeMatchesProvider && profiles[code]) return { ...profiles[code], kind: 'glucose' };

    if (!/\bgestation(?:al)?\b|\bpregnan(?:cy|t)\b/.test(lower)) return null;
    const glucose = /glucose|gtt|ogtt|diabetes screen|diabetes tolerance/.test(lower);
    if (glucose) {
      return {
        kind: 'glucose',
        label: 'Gestational · check protocol',
        note: 'PREGNANCY-SPECIFIC GLUCOSE TEST: Before collection, confirm screening versus diagnostic testing, whether fasting is required, the prescribed oral glucose dose, each collection timepoint, and required separate tubes with the official receiving-lab directory. Do not substitute a standard glucose tolerance protocol.'
      };
    }
    return {
      kind: 'pregnancy',
      label: 'Pregnancy-specific test',
      note: 'PREGNANCY-SPECIFIC ORDER: Verify the exact pregnancy/gestational assay, clinician-requested gestational context and current lab requirements. Pregnancy-specific reference ranges or methods may differ from routine testing. Do not assume a glucose challenge or fasting is required for this test.'
    };
  }

  window.gestationalTestWarning = warningFor;
})();
