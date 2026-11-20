'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('./helpers/browser-vm.cjs');

const read = p => fs.readFileSync(path.join(__dirname, '..', p), 'utf8');
const script = read('assets/js/portal-selects.js');

function hoverHelpers(fineHover) {
  const anchor = "  if (document.readyState === 'loading')";
  assert(script.includes(anchor), 'Dropdown startup hook missing');
  const instrumented = script.replace(anchor,
    "  window.__hoverTest = {isMouseHover,canHover};\n" + anchor);
  const context = {
    window: {matchMedia(query) {
      return { matches: fineHover && query === '(hover: hover) and (pointer: fine)' };
    }},
    document: {readyState:'loading',addEventListener(){}}
  };
  vm.runInNewContext(instrumented, context, {filename:'portal-selects.js',timeout:12000});
  return context.window.__hoverTest;
}

test('Touch hover cannot trigger side submenus even when touch generates pointerenter',()=>{
  const mobile = hoverHelpers(false);
  assert.equal(mobile.canHover.matches, false);
  for (const pointerType of ['touch','pen','mouse',''])
    assert.equal(mobile.isMouseHover({pointerType}), false, pointerType);
  const desktop = hoverHelpers(true);
  assert.equal(desktop.isMouseHover({pointerType:'touch'}), false);
  assert.equal(desktop.isMouseHover({pointerType:'pen'}), false);
  assert.equal(desktop.isMouseHover({pointerType:'mouse'}), true);
});

test('Nested picker only auto-opens or clears on mouse hover, not scrolling or touch focus',()=>{
  assert.match(script,/choice\.addEventListener\('pointerenter', event => \{\s*if \(!isMouseHover\(event\) \|\| item\.submenuReturnTarget === choice\) return;\s*openSubmenu\(/);
  assert.match(script,/choice\.addEventListener\('focus', \(\) => \{\s*if \(!canHover\.matches \|\| item\.submenuReturnTarget === choice\) return;\s*openSubmenu\(/);
  assert.match(script,/choice\.addEventListener\('pointerenter', event => \{\s*if \(isMouseHover\(event\)\) clearSubmenu\(item\);/);
  assert.match(script,/choice\.addEventListener\('focus', \(\) => \{\s*if \(canHover\.matches\) clearSubmenu\(item\);/);
  // Tapping the chevron and pressing ArrowRight remain explicit ways to open a side menu.
  assert.match(script,/arrow\.addEventListener\('click', e => \{[\s\S]*?openSubmenu\(item,choice,option\.value,root,true\)/);
  assert.match(script,/if \(e\.key === 'ArrowRight'\)[\s\S]*?openSubmenu\(item, choice, choice\.dataset\.value, root, true\)/);
});

test('Both calculators load updated touch-safe dropdown and non-sticky hover CSS',()=>{
  const css = read('assets/css/experience.css');
  assert(css.includes('@media screen and (hover: none)'));
  assert(css.includes('#catalogFilterControl .portal-select-menu .portal-select-option:hover:not(.is-selected):not(:focus-visible)'));
  for(const html of ['index.html','labcorp.html']){
    const source = read(html);
    assert(source.match(/portal\-selects\.js\?v=[\w.-]+/));
    assert(source.match(/experience\.css\?v=[\w.-]+/));
  }
});
