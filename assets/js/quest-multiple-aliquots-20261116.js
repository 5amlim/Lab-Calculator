/* Preserve independent collection and submission quantities in Quest's
   published catalog. Runs after all catalog extensions, before app.js.
   Do not convert a two-aliquot requirement into two draws without evidence. */
(() => {
  'use strict';
  if (!Array.isArray(window.SEED_TESTS)) return;
  const words = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6,
    seven: 7, eight: 8, nine: 9, ten: 10 };
  const number = value => words[String(value).toLowerCase()] || Number(value) || 0;
  // The directory describes a quantity of tubes, not a different tube type.
  const quantityContainer = /^\s*(\d+|one|two|three|four|five|six|seven|eight|nine|ten)\s+(?:(?:separate)\s+)?(?:(serum|polypropylene|plastic)\s+)?transport\s+tubes?\s*$/i;
  // These have independently documented collection requirements, even where
  // the older catalog text only specified repeated plasma aliquots.
  const verifiedTwoCitrateDraws = new Set(['7017','7942','8267','8754','8757','17854','39457']);
  for (const test of window.SEED_TESTS) {
    if (!test || test.status === 'reference' || test.status === 'blocked') continue;
    const match = String(test.transportContainer || '').match(quantityContainer);
    if (!match) continue;
    const submit = number(match[1]);
    if (!Number.isInteger(submit) || submit < 2 || submit > 10) continue;
    test.submissionCount = Math.max(Number(test.submissionCount) || 1, submit);
    const modifier = String(match[2] || '').toLowerCase();
    test.transportContainer = modifier === 'polypropylene' ? 'Polypropylene Transport Tube'
      : modifier === 'serum' ? 'Serum Transport Tube'
      : modifier === 'plastic' ? 'Plastic Transport Tube' : 'Transport Tube';
    const instructions = String(test.specialInstructions || '');
    const drawMatch = instructions.match(/\bDraw\s+(\d+|one|two|three|four|five|six|seven|eight|nine|ten)\s+(?:separate\s+)?(?:light[- ]blue[- ]top\s+)?tubes?\b/i);
    const explicitDraw = drawMatch ? number(drawMatch[1]) : 0;
    if (explicitDraw > 1) test.collectionCount = Math.max(Number(test.collectionCount) || 1, explicitDraw);
    if (submit === 2 && verifiedTwoCitrateDraws.has(String(test.testCode)) &&
        /light\s+blue|citrate/i.test(test.drawContainer || '')) {
      test.collectionCount = 2;
    }
    // One EDTA tube deliberately split into TWO polypropylene aliquots.
    if (String(test.testCode) === '14258') test.collectionCount = 1;
    // One red-top serum collection split into TWO refrigerated aliquots.
    if (String(test.testCode) === '37077') test.collectionCount = 1;
  }
})();
