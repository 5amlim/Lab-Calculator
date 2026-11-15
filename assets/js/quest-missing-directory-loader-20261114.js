/* Quest MASTER directory-only additions from the user's 2026-11-14 code/name list.
 * These records are SEARCH REFERENCES, not collection instructions.
 * No unverified specimens, tubes, temperatures, volumes, or transport routes may
 * be used for draw planning until verified individually against the Quest directory.
 */
(() => {
  'use strict';
  window.QUEST_MISSING_DIRECTORY_READY = (async () => {
    if (!Array.isArray(window.SEED_TESTS)) throw new Error('Quest seed catalog missing');
    if (typeof window.QUEST_MISSING_DIRECTORY_B64 !== 'string' ||
        typeof DecompressionStream !== 'function')
      throw new Error('Quest reference catalog decoding is unsupported');

    const encoded = window.QUEST_MISSING_DIRECTORY_B64;
    const binary = atob(encoded);
    const bytes = Uint8Array.from(binary, character => character.charCodeAt(0));
    const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('deflate'));
    const decoded = await new Response(stream).text();
    const lines = decoded.split('\n');
    if (lines.length !== 1068) throw new Error('Quest reference catalog count mismatch');

    // Existing code matches win regardless of their names. Never override a
    // validated collection workflow or a previously blocked code.
    const knownCodes = new Set(window.SEED_TESTS.map(record => String(record.testCode || '').trim()));
    let added = 0;
    for (const line of lines) {
      const separator = line.indexOf('|');
      const code = line.slice(0, separator);
      const name = line.slice(separator + 1);
      if (separator < 1 || !/^\d+$/.test(code) || !name.trim())
        throw new Error('Malformed Quest reference catalog row');
      if (knownCodes.has(code)) continue;

      window.SEED_TESTS.push({
        id: 'quest-directory-only-' + code + '-20261114',
        testCode: code,
        testName: name,
        specimenType: 'Not verified',
        drawContainer: 'Verify Official Instructions',
        alternativeContainer: '',
        transportContainer: 'Not verified',
        preferredVolume: 'Not verified',
        minimumVolume: 'Not verified',
        transportTemperature: 'Not specified',
        transportTemperatureRaw: '',
        stability: 'Not verified',
        spin: 'Verify',
        specialInstructions: 'DIRECTORY REFERENCE ONLY. This test was listed in the uploaded Quest MASTER missing-code worksheet, but its specimen, collection tube, volume, processing, transport, stability, fasting, timed draws, special kits, and receiving-area availability have not been independently verified. Open the official Quest directory before collecting. This reference record cannot be added to the cart or used for a draw plan.',
        status: 'reference',
        source: 'Quest MASTER missing-test worksheet (2026-11-14): code/name only; official Quest directory must be consulted'
      });
      knownCodes.add(code);
      added++;
    }
    window.QUEST_MISSING_DIRECTORY_COUNT = added;
    return added;
  })();
})();
