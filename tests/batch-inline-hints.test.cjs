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

test('hints require a unique, active, exact code or name', () => {
  const { resolveExact } = loadHints();
  const cases = new Map([
    ['809', 'Sed Rate'], ['sed rate', '809'], [' SED-RATE ', '809'],
    ['001234', 'Glycated Hemoglobin'], ['1234', null],
    ['Glycated Hemoglobin', '001234'], ['Glycated', null],
    ['Ambiguous Panel', null], ['200', 'Ambiguous Panel'],
    ['999', null], ['Blocked Test', null], ['77', null],
    ['AB-23', 'Alphanumeric assay'], ['alphanumeric assay', 'AB-23'],
    ['', null], ['unknown', null],
  ]);
  for (const [query, expected] of cases) {
    assert.equal(resolveExact(query, catalog, normalize), expected, query);
  }
  assert.equal(catalog.length, 8);
});

test('multiline hints never modify the input and refresh when text changes', () => {
  const listeners = {};
  const root = { insertBefore(el) { this.mirror = el; } };
  function element(tag) {
    return {
      tag, style: {}, attrs: {}, children: [], className: '', scrollTop: 0,
      setAttribute(k, v) { this.attrs[k] = v; },
      appendChild(child) { this.children.push(child); },
      replaceChildren() { this.children = []; },
      getBoundingClientRect() { return { left: 110, right: 500, top: 10, bottom: 200 }; },
    };
  }
  const textarea = {
    parentElement: root, value: '809\nSed Rate\nunknown\n',
    offsetWidth: 390, clientWidth: 388, offsetHeight: 120, offsetLeft: 0, offsetTop: 0,
    scrollTop: 0, scrollLeft: 0,
    addEventListener(type, fn) { listeners[type] = fn; },
  };
  const context = {
    window: {
      addEventListener() {},
      getComputedStyle() {
        return { borderLeftWidth: '1px', borderRightWidth: '1px',
          paddingRight: '12px', marginLeft: '7px' };
      },
      ResizeObserver: class { observe() {} },
    },
    document: {
      createElement: element,
      createTextNode(text) { return { text, length: text.length, type: 'text' }; },
      createRange() {
        let node;
        return {
          setStart(textNode, offset) { node = textNode; assert.equal(offset, textNode.length); },
          collapse() {},
          getBoundingClientRect() {
            const textNodes = root.mirror.children.filter(item => item.type === 'text');
            const index = textNodes.indexOf(node);
            const previousText = textNodes.slice(0, index).map(item => item.text).join('');
            const row = previousText.split('\n').length - 1;
            return { left: 125 + node.length * 9, top: 18 + row * 24, height: 24 };
          },
        };
      },
    },
  };
  const { mount, resolveExact } = loadHints(context);
  mount(textarea, query => resolveExact(query, catalog, normalize));
  assert.equal(textarea.value, '809\nSed Rate\nunknown\n');
  assert.equal(root.mirror.attrs['aria-hidden'], 'true');
  const visibleLabels = () => root.mirror.children
    .filter(n => n.className === 'batch-inline-ghost-label');
  const labels = () => visibleLabels().map(n => n.textContent);
  assert.deepEqual(labels(), ['• Sed Rate', '• 809']);
  assert.deepEqual(visibleLabels().map(n => n.style.top), ['8px', '32px']);
  assert.equal(root.mirror.children.filter(n => n.type === 'text').map(n => n.text).join(''),
    textarea.value, 'the mirror text must preserve the original line breaks');
  textarea.value = '809\nGlycated\n';
  listeners.input();
  assert.equal(textarea.value, '809\nGlycated\n');
  assert.deepEqual(labels(), ['• Sed Rate']);
  textarea.scrollTop = 20;
  listeners.scroll();
  assert.equal(root.mirror.scrollTop, 20);
});
