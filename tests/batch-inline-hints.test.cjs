const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function loadHints(context = { window: {} }) {
  const source = fs.readFileSync(path.join(__dirname, '..', 'assets', 'js', 'batch-inline-hints.js'), 'utf8');
  vm.runInNewContext(source, context);
  return context.window.LabBatchInlineHints;
}
const normalize = value => String(value || '').toLowerCase().normalize('NFKD')
  .replace(/[®™]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
const catalog = [
  { testCode: '809', testName: 'Sed Rate', status: 'active' },
  { testCode: '001234', testName: 'Glycated Hemoglobin', status: 'active' },
  { testCode: '200', testName: 'Ambiguous Panel', status: 'active' },
  { testCode: '201', testName: 'Ambiguous Panel', status: 'active' },
  { testCode: '999', testName: 'Blocked Test', status: 'blocked' },
  { testCode: '77', testName: 'Duplicate Code A', status: 'active' },
  { testCode: '77', testName: 'Duplicate Code B', status: 'active' },
  { testCode: 'AB-23', testName: 'Alphanumeric assay', status: 'active' },
];

test('hints show active exact matches and mark exact blocked codes', () => {
  const { resolveExact } = loadHints();
  const cases = new Map([
    ['809', 'Sed Rate'], ['sed rate', '809'], [' SED-RATE ', '809'],
    ['001234', 'Glycated Hemoglobin'], ['1234', null],
    ['Glycated Hemoglobin', '001234'], ['Glycated', null],
    ['Ambiguous Panel', null], ['200', 'Ambiguous Panel'],
    ['99', null], ['Blocked Test', null], ['77', null],
    ['AB-23', 'Alphanumeric assay'], ['alphanumeric assay', 'AB-23'],
    ['', null], ['unknown', null],
  ]);
  for (const [query, expected] of cases) {
    assert.equal(resolveExact(query, catalog, normalize), expected, query);
  }
  const blockedHint = resolveExact(' 999 ', catalog, normalize);
  assert.equal(blockedHint.text, 'Blocked Test');
  assert.equal(blockedHint.tone, 'blocked');
  assert.equal(catalog.length, 8);
});

test('multiline hints keep one visual row per input row and never modify the value', () => {
  const listeners = {};
  const root = {
    insertBefore(element) { this.overlay = element; },
    appendChild(element) { this.measurer = element; },
  };
  function element(tag) {
    const node = {
      tag, style: {}, children: [], className: '', textContent: '', attrs: {}, dataset: {},
      classList: { add(name) { node.className += ' ' + name; } },
      setAttribute(key, val) { this.attrs[key] = val; },
      appendChild(child) { this.children.push(child); },
      replaceChildren() { this.children = []; },
      getBoundingClientRect() {
        if (this.className === 'batch-inline-ghost-measured-line') {
          const width = parseFloat(root.measurer.style.width) || 320;
          return { height: 24 * Math.max(1, Math.ceil(this.textContent.length * 8 / width)) };
        }
        return { height: 120 };
      },
    };
    if (tag === 'canvas') {
      node.getContext = () => ({ measureText: (value) => ({ width: value.length * 8 }) });
    }
    return node;
  }
  const textarea = {
    parentElement: root, classList: { contains: () => false }, value: '809\nSed Rate\n999\nunknown\n',
    offsetWidth: 390, clientWidth: 388, offsetHeight: 120,
    offsetLeft: 0, offsetTop: 0, scrollTop: 0, scrollLeft: 0,
    addEventListener(type, fn) { listeners[type] = fn; },
  };
  const style = {
    borderTopWidth: '1px', borderLeftWidth: '1px', borderRightWidth: '1px',
    paddingLeft: '12px', paddingRight: '12px', paddingTop: '12px',
    lineHeight: '24px', fontSize: '16px', fontFamily: 'Arial',
    fontWeight: '400', fontStyle: 'normal', letterSpacing: 'normal',
    wordSpacing: 'normal', tabSize: '8',
  };
  const context = {
    window: {
      addEventListener() {}, getComputedStyle: () => style,
      ResizeObserver: class { observe() {} },
    },
    document: { createElement: element },
  };
  const { mount, resolveExact } = loadHints(context);
  mount(textarea, query => resolveExact(query, catalog, normalize));
  const labels = () => root.overlay.children[0].children;
  assert.equal(textarea.value, '809\nSed Rate\n999\nunknown\n');
  assert.equal(root.overlay.attrs['aria-hidden'], 'true');
  assert.deepEqual(labels().map(node => node.textContent), ['• Sed Rate', '• 809', '• Blocked Test']);
  assert.deepEqual(labels().map(node => node.style.top), ['13px', '37px', '61px']);
  assert.match(labels()[2].className, /batch-inline-ghost-blocked/);
  textarea.value = '809\nGlycated\n';
  listeners.input();
  assert.equal(textarea.value, '809\nGlycated\n');
  assert.deepEqual(labels().map(node => node.textContent), ['• Sed Rate']);

  textarea.value = '809\n' + 'A'.repeat(200) + '\n809';
  listeners.input();
  assert.equal(labels().length, 2);
  assert.ok(parseFloat(labels()[1].style.top) > 4 * 24,
    'wrapped text above a match must not put the hint on the wrong row');

  textarea.scrollTop = 20;
  listeners.scroll();
  assert.equal(root.overlay.children[0].style.transform, 'translate(0px, -20px)');
});

test('Add Tests connects inline status rows to directory lookup without editing input text', () => {
  for (const [app, page] of [
    ['assets/js/app.js', 'index.html'], ['labcorp-app.js', 'labcorp.html']
  ]) {
    const code = fs.readFileSync(path.join(__dirname, '..', app), 'utf8');
    const html = fs.readFileSync(path.join(__dirname, '..', page), 'utf8');
    const start = code.indexOf('refreshBatchHints = window.LabBatchInlineHints.mount');
    const end = code.indexOf('\n        });', start);
    assert.ok(start >= 0 && end > start, app);
    const setup = code.slice(start, end);
    assert.match(setup, /colorUnavailable:\s*false/);
    assert.match(setup, /onStatusRows:\s*rows => lookup\?\.sync\(rows\)/);
    assert.match(code, /mountDirectoryLinks\(els\.searchInput, directorySearchUrl\)/);
    assert.match(html, /<textarea id="searchInput"[^>]*spellcheck="false"/);
    assert.match(html, /<textarea id="searchInput"[^>]*autocorrect="off"/);
    assert.match(html, /<textarea id="searchInput"[^>]*autocapitalize="off"/);
  }
});
