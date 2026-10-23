/* Read-only Quest-to-Labcorp comparison. Quest references are never passed into
   the Labcorp planning engine; only verified Labcorp catalog records are usable. */
(() => {
  'use strict';
  const table = document.getElementById('labcorpCrosswalkBody');
  if (!table || !Array.isArray(window.QUEST_TO_LABCORP_INDEX)) return;
  const rows = window.QUEST_TO_LABCORP_INDEX.slice().sort((a,b) => a[1].localeCompare(b[1]) || a[0].localeCompare(b[0]));
  const metadata = window.QUEST_TO_LABCORP_METADATA || {};
  const search = document.getElementById('labcorpCrosswalkSearch');
  const filter = document.getElementById('labcorpCrosswalkFilter');
  const count = document.getElementById('labcorpCrosswalkStatus');
  const summary = document.getElementById('labcorpCrosswalkCount');
  const more = document.getElementById('labcorpCrosswalkMore');
  const exportCsv = document.getElementById('labcorpCrosswalkExport');
  let visible = 24;

  const normalize = value => String(value || '').toLowerCase().normalize('NFKD')
    .replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,' ').trim();
  const escape = value => String(value == null ? '' : value).replace(/[&<>"']/g, ch =>
    ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const directoryUrl = (testName, labcorpCode) =>
    'https://www.labcorp.com/test-menu/search?query=' + encodeURIComponent(labcorpCode || testName);
  const active = new Map((window.SEED_TESTS || []).map(test => [String(test.testCode),test]));

  function matchingRows() {
    const query = normalize(search.value).split(' ').filter(Boolean);
    const status = filter.value;
    return rows.filter(row => {
      if (status === 'suggested' && !row[3]) return false;
      if (status === 'pending' && row[3]) return false;
      const text = normalize([row[0],row[1],row[2],row[3],row[4]].join(' '));
      return query.every(word => text.includes(word));
    });
  }
  function render() {
    const matched = matchingRows();
    const subset = matched.slice(0,visible);
    const result = subset.map(row => {
      const [questCode,questName,questSpecimen,labcorpCode,labcorpName,blocked] = row;
      const usable = Boolean(labcorpCode && active.has(String(labcorpCode)));
      const suggestion = labcorpCode
        ? '<strong>' + escape(labcorpName) + '</strong><small>Labcorp candidate code ' + escape(labcorpCode) + ' · Verify assay and specimen requirements</small>'
        : '<span class="crosswalk-pending">Labcorp match not confirmed</span>';
      const action = usable
        ? '<button type="button" class="crosswalk-open" data-labcorp-code="' + escape(labcorpCode) + '">View Labcorp test (verify equivalence)</button>'
        : '<a href="' + escape(directoryUrl(questName,labcorpCode)) + '" target="_blank" rel="noopener noreferrer">Search Labcorp ↗</a>';
      return '<tr><td><strong>' + escape(questCode) + '</strong><small>' + (questCode === 'XXX' ? 'No Quest code supplied' : 'Quest code only') + '</small></td>' +
        '<td><strong>' + escape(questName) + '</strong><small>Quest specimen: ' + escape(questSpecimen || 'Not listed') +
        (blocked ? ' · Quest do-not-perform record' : '') + '</small></td>' +
        '<td>' + suggestion + '</td><td>' + action + '</td></tr>';
    }).join('');
    table.innerHTML = result || '<tr><td colspan="4" class="crosswalk-empty">No matches in this comparison. Try a different name or code.</td></tr>';
    count.textContent = 'Showing ' + Math.min(visible,matched.length).toLocaleString() + ' of ' +
      matched.length.toLocaleString() + ' Quest tests' + (filter.value === 'suggested' ? ' with possible Labcorp matches' : '');
    summary.textContent = rows.length.toLocaleString() + ' Quest entries · ' +
      rows.filter(row => Boolean(row[3])).length.toLocaleString() + ' possible Labcorp code matches';
    more.hidden = matched.length <= visible;
  }
  search.addEventListener('input', () => { visible=24; render(); });
  filter.addEventListener('change', () => { visible=24; render(); });
  more.addEventListener('click',() => { visible += 40; render(); });
  table.addEventListener('click', event => {
    const btn = event.target.closest('button[data-labcorp-code]');
    if (!btn) return;
    const input = document.getElementById('libraryFilter');
    if (!input) return;
    input.value = btn.dataset.labcorpCode;
    input.dispatchEvent(new Event('input',{bubbles:true}));
    input.focus({preventScroll:true});
    input.scrollIntoView({behavior:'smooth',block:'center'});
  });
  exportCsv.addEventListener('click',() => {
    const columns = ['Quest test code (reference only)','Quest test name','Quest specimen (reference only)',
      'Possible Labcorp code (not verified as equivalent)','Possible Labcorp name',
      'Match status','Labcorp directory lookup URL'];
    const fields = [columns, ...rows.map(row => [row[0],row[1],row[2],row[3],row[4],
      row[3] ? 'Possible match - verify before use' : 'Unmapped - verification required',directoryUrl(row[1],row[3])])];
    const quote = cell => '"' + String(cell == null ? '' : cell).replace(/"/g,'""') + '"';
    const output = '\uFEFF' + fields.map(r => r.map(quote).join(',')).join('\r\n');
    const blob = new Blob([output],{type:'text/csv;charset=utf-8'});
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href=url;anchor.download='quest-labcorp-comparison.csv';
    document.body.appendChild(anchor);anchor.click();anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url),1000);
  });
  render();
})();
