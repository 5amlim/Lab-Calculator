'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('./helpers/browser-vm.cjs');
const read = file => fs.readFileSync(path.join(__dirname, '..', file), 'utf8');

function bootDialog() {
  const controls = new Map();
  const find = id => {
    if (!controls.has(id)) controls.set(id, {
      id, textContent: '', hidden: false,
      listeners: {}, focus(){ this.focused = true; },
      addEventListener(event, fn){ this.listeners[event] = fn; }
    });
    return controls.get(id);
  };
  const dialog = {
    classList: { toggle() {} },
    open: false, isConnected: false, className: '', dataset: {}, attributes: {},
    listeners: {}, html: '',
    set innerHTML(value){ this.html = value; },
    get innerHTML(){ return this.html; },
    setAttribute(name, value){ this.attributes[name] = value; },
    querySelector(selector){ return find(selector.slice(1)); },
    addEventListener(event, fn){ this.listeners[event] = fn; },
    showModal(){ if(this.open)throw Error('Already open'); this.open = true; this.shown = (this.shown || 0) + 1; },
    close(){ this.open = false; queueMicrotask(() => this.listeners.close?.()); },
    emit(event){ this.listeners[event]?.({target:this,preventDefault(){}}); }
  };
  const document = {
    body: { appendChild(node){ node.isConnected = true; } },
    createElement(tag){ assert.equal(tag,'dialog'); return dialog; },
    addEventListener(){}
  };
  const window = {};
  vm.runInNewContext(read('assets/js/portal-action-dialog.js'), { window, document, console, Promise, setTimeout: setImmediate },
    {filename:'portal-action-dialog.js'});
  return { window, document, dialog, controls, find };
}
const tick = () => new Promise(resolve => setImmediate(resolve));

test('portal confirmation is a branded dialog, never a browser prompt', async () => {
  const { window, dialog, find } = bootDialog();
  const result = window.PortalDialog.confirm('Check specimen details.', {
    title: 'Confirm test match', confirmLabel: 'Add this test', tone: 'warning'
  });
  assert.equal(dialog.open, true);
  assert.equal(dialog.attributes['aria-labelledby'], 'portalActionTitle');
  assert.equal(dialog.attributes['aria-describedby'], 'portalActionMessage');
  assert.equal(dialog.dataset.tone, 'warning');
  assert.equal(find('portalActionTitle').textContent, 'Confirm test match');
  assert.equal(find('portalActionMessage').textContent, 'Check specimen details.');
  assert.equal(find('portalActionProceed').textContent, 'Add this test');
  find('portalActionCancel').listeners.click();
  assert.equal(await result, false, 'Cancel must never proceed');
  await tick();
  assert.equal(dialog.open, false);
});

test('Escape dismisses an action and queued dialogs open one at a time', async () => {
  const { window, dialog, find } = bootDialog();
  const first = window.PortalDialog.confirm('Delete manual test', {title:'Delete test?',tone:'danger'});
  const second = window.PortalDialog.confirm('Next confirmation', {title:'Next action'});
  assert.equal(find('portalActionTitle').textContent,'Delete test?');
  dialog.emit('cancel');
  assert.equal(await first, false);
  await tick();
  assert.equal(dialog.open, true, 'Second modal opens after the first has closed');
  assert.equal(find('portalActionTitle').textContent,'Next action');
  find('portalActionProceed').listeners.click();
  assert.equal(await second, true);
  await tick();
  assert.equal(dialog.open, false);
});

test('sequential test-match and STAT dialogs keep Cancel and Mark STAT clickable', async () => {
  for (const [action, expected] of [['Cancel', false], ['Proceed', true]]) {
    const { window, dialog, find } = bootDialog();
    const first = window.PortalDialog.confirm('Confirm test code.', {
      title: 'Confirm test match', confirmLabel: 'Add this test'
    });
    let second;
    const sequence = first.then(accepted => {
      assert.equal(accepted, true);
      // The app immediately requests STAT confirmation after a match choice.
      // The previous dialog's close event must never orphan this new dialog.
      second = window.PortalDialog.confirm('Confirm STAT receiving lab.', {
        title: 'Mark test as STAT?', confirmLabel: 'Mark STAT', tone: 'warning'
      });
    });
    find('portalActionProceed').listeners.click();
    await sequence;
    await tick();
    assert.equal(dialog.open, true, 'STAT confirmation is visible');
    assert.equal(find('portalActionTitle').textContent, 'Mark test as STAT?');
    find('portalAction' + action).listeners.click();
    assert.equal(await second, expected, action + ' must resolve the STAT confirmation');
    await tick();
    assert.equal(dialog.open, false, action + ' must close the STAT popup');
  }
});

test('portal alerts have a single acknowledgment action and render messages as text', async () => {
  const { window, dialog, find } = bootDialog();
  const message = '<img src=x onerror=alert(1)> This change was not saved.';
  const pending = window.PortalDialog.alert(message, {title:'Change not saved',tone:'warning'});
  assert.equal(find('portalActionMessage').textContent,message);
  assert.equal(find('portalActionCancel').hidden,true);
  assert.equal(find('portalActionProceed').textContent,'Got it');
  assert.equal(dialog.innerHTML.includes(message), false, 'Untrusted data must not be HTML');
  find('portalActionProceed').listeners.click();
  assert.equal(await pending,true);
});

for (const [label, app, html] of [
  ['Quest','assets/js/app.js','index.html'],
  ['Labcorp','labcorp-app.js','labcorp.html']
]) {
  test(label + ': no native popup and all confirmation routes await the portal choice', () => {
    const source = read(app), page = read(html);
    assert.doesNotMatch(source,/window\.(?:confirm|alert|prompt)\s*\(/);
    assert.match(source,/async function handleBatchClick\(event\)/);
    assert.match(source,/async function clearBrowserAddedTests\(\)/);
    assert.match(source,/async function deleteCustomTest\(\)/);
    assert.match(source,/async function clearOrder\(\)/);
    assert.match(source,/async function toggleStatPriority\(id\)/);
    assert.match(source,/async function addStatFromMenu\(id\)/);
    assert.equal((source.match(/await confirmStatSelection\(test\)/g)||[]).length, 3);
    assert.equal((source.match(/window\.PortalDialog\.confirm\(/g)||[]).length, 5);
    assert.equal((source.match(/window\.PortalDialog\.alert\(/g)||[]).length, 2);
    assert.doesNotMatch(source,/\$\{body\}/, 'STAT text interpolation must use defined data');
    assert.ok(page.includes('portal-action-dialog.css'));
    const portalPosition = page.indexOf('portal-action-dialog.js');
    const appPosition = page.indexOf(app === 'labcorp-app.js' ? 'labcorp-app.js?v=' : 'assets/js/app.js?v=');
    assert.ok(portalPosition > 0 && appPosition > portalPosition, 'Shared dialog loads before application');
  });
}
test('manual-entry deletion guide depicts the in-page confirmation', () => {
  const source = read('assets/js/manual-test-notice.js');
  assert.doesNotMatch(source,/Browser confirmation|browser confirmation/);
  assert.match(source,/In the in-page confirmation/);
  assert.match(source,/Delete test/);
});
