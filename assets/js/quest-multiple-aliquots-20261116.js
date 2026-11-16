/* Keep independently required draws and submit aliquots visible in Quest.
   Runs after catalog extensions, before app.js. Never assume two aliquots
   require two draws unless the directory instructions support that count. */
(() => {
  'use strict';
  if (!Array.isArray(window.SEED_TESTS)) return;
  const words = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6,
    seven: 7, eight: 8, nine: 9, ten: 10 };
  const number = value => words[String(value).toLowerCase()] || Number(value) || 0;
  const quantity = '(\\d+|one|two|three|four|five|six|seven|eight|nine|ten)';
  const quantityContainer = new RegExp('^\\s*' + quantity +
    '\\s+(?:(?:separate)\\s+)?(?:(serum|polypropylene|plastic)\\s+)?transport\\s+tubes?\\s*$', 'i');
  const drawPattern = new RegExp('\\bDraw\\s+' + quantity +
    '\\s+(?:separate\\s+)?(?:light[- ]blue[- ]top\\s+)?tubes?\\b', 'i');
  const collectPattern = new RegExp('\\bCollect\\s+' + quantity +
    '\\s+separate\\b[^;]{0,95}?\\btubes?\\b', 'i');
  const submitPattern = new RegExp('\\bSubmit\\s+' + quantity +
    '\\s+(?:separate\\s+)?transport\\s+tubes?\\b', 'i');
  const verifiedTwoCitrateDraws = new Set(['7017','7942','8267','8754','8757','17854','39457']);
  for (const test of window.SEED_TESTS) {
    if (!test || test.status === 'reference' || test.status === 'blocked') continue;
    const instructions = String(test.specialInstructions || '');
    const drawMatch = instructions.match(drawPattern) || instructions.match(collectPattern);
    const explicitDraw = drawMatch ? number(drawMatch[1]) : 0;
    if (explicitDraw > 1 && explicitDraw <= 10)
      test.collectionCount = Math.max(Number(test.collectionCount) || 1, explicitDraw);
    const match = String(test.transportContainer || '').match(quantityContainer);
    const normalizedTransport = match ? number(match[1]) : 0;
    if (normalizedTransport >= 2 && normalizedTransport <= 10) {
      test.submissionCount = Math.max(Number(test.submissionCount) || 1, normalizedTransport);
      const modifier = String(match[2] || '').toLowerCase();
      test.transportContainer = modifier === 'polypropylene' ? 'Polypropylene Transport Tube'
        : modifier === 'serum' ? 'Serum Transport Tube'
        : modifier === 'plastic' ? 'Plastic Transport Tube' : 'Transport Tube';
      if (normalizedTransport === 2 && verifiedTwoCitrateDraws.has(String(test.testCode)) &&
          /light\s+blue|citrate/i.test(test.drawContainer || '')) {
        test.collectionCount = 2;
      }
    }
    // Also cover the directory records that say "Transport Tube" but require
    // multiple distinct frozen aliquots in the collection instructions.
    const submitted = instructions.match(submitPattern);
    const submitCount = submitted ? number(submitted[1]) : 0;
    if (submitCount > 1 && submitCount <= 10 &&
        /\btransport\s+tubes?\b/i.test(String(test.transportContainer || ''))) {
      test.submissionCount = Math.max(Number(test.submissionCount) || 1, submitCount);
    }
    // A few panels explicitly require distinct primary tubes but are shipped
    // in those same original tubes rather than poured into another vial.
    if (['38287','94345'].includes(String(test.testCode)) &&
        /\b(?:original|spun|SST|serum separator)\b/i.test(String(test.transportContainer || ''))) {
      test.collectionCount = 2;
      test.submissionCount = 2;
    }
    // Independently documented multi-vial citrate panels. The existing
    // collection planner already reserves these respective tube counts.
    const knownCitratePanelCounts = { '15540': 4, '19790': 4, '33743': 5 };
    const panelCount = knownCitratePanelCounts[String(test.testCode)];
    if (panelCount && /light\\s+blue|citrate/i.test(String(test.drawContainer || ''))) {
      test.collectionCount = panelCount;
      test.submissionCount = panelCount;
    }
    // These are intentional ONE-draw-to-TWO-aliquot workflows, not two draws.
    if (String(test.testCode) === '14258') test.collectionCount = 1;
    if (String(test.testCode) === '37077') test.collectionCount = 1;
  }
})();
