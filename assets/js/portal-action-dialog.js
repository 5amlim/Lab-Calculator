/* Shared in-page action dialogs for all calculator confirmations and notices.
 * Replaces browser alert/confirm UI. No changes to collection or test data.
 */
(() => {
  'use strict';
  const queue = [];
  let active = null;
  let dialog = null;
  // Closing a native dialog dispatches its close event asynchronously.
  // Do not open the next queued confirmation until that event has fired.
  let closing = false;
  let pumpScheduled = false;

  function ensureDialog() {
    if (dialog?.isConnected) return dialog;
    dialog = document.createElement('dialog');
    dialog.className = 'portal-action-dialog no-print';
    dialog.setAttribute('aria-labelledby', 'portalActionTitle');
    dialog.setAttribute('aria-describedby', 'portalActionMessage');
    dialog.innerHTML = `
      <div class="portal-action-content">
        <header class="portal-action-header">
          <span class="portal-action-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 8v5m0 3h.01"/><circle cx="12" cy="12" r="9"/>
            </svg>
          </span>
          <div class="portal-action-heading">
            <span class="portal-action-kicker" id="portalActionKicker">CONFIRM ACTION</span>
            <h2 id="portalActionTitle"></h2>
          </div>
        </header>
        <div class="portal-action-subject" id="portalActionSubject" hidden></div>
        <p class="portal-action-message" id="portalActionMessage"></p>
        <footer class="portal-action-buttons">
          <button type="button" class="portal-action-cancel" id="portalActionCancel">Cancel</button>
          <button type="button" class="portal-action-proceed" id="portalActionProceed">Continue</button>
        </footer>
      </div>`;
    document.body.appendChild(dialog);
    dialog.querySelector('#portalActionCancel').addEventListener('click', () => settle(false));
    dialog.querySelector('#portalActionProceed').addEventListener('click', () => settle(true));
    dialog.addEventListener('cancel', event => {
      event.preventDefault();
      settle(false);
    });
    dialog.addEventListener('click', event => {
      if (event.target === dialog) settle(false);
    });
    dialog.addEventListener('close', () => {
      // WebKit can dispatch the previous close event after the next modal opens.
      // Never dismiss a new request because of an older close event.
      if (dialog?.open) return;
      if (active) {
        const dismissed = active;
        active = null;
        dismissed.resolve(false);
      }
      closing = false;
      schedulePump();
    });
    return dialog;
  }

  // A close event is not consistently dispatched before the next task on
  // mobile Safari. The fallback task keeps queued portals moving either way.
  function schedulePump() {
    if (pumpScheduled) return;
    pumpScheduled = true;
    setTimeout(() => {
      pumpScheduled = false;
      if (closing && (!dialog || !dialog.open)) closing = false;
      pump();
    }, 0);
  }

  function settle(accepted) {
    if (!active) return;
    const item = active;
    active = null;
    closing = true;
    try {
      if (dialog?.open) dialog.close();
    } catch (error) {
      console.warn('Could not close action dialog; recovering the portal.', error);
      dialog?.remove();
      dialog = null;
    }
    item.resolve(Boolean(accepted));
    schedulePump();
  }

  function pump() {
    if (active || closing || !queue.length) return;
    if (!document.body) {
      document.addEventListener('DOMContentLoaded', pump, { once: true });
      return;
    }
    const node = ensureDialog();
    // This can happen if a third-party script opened the shared dialog.
    // Close safely rather than calling showModal() on an already-open dialog.
    if (node.open) {
      closing = true;
      try { node.close(); }
      catch (error) {
        console.warn('Could not reset action dialog; recreating the portal.', error);
        node.remove();
        dialog = null;
      }
      schedulePump();
      return;
    }
    const item = queue.shift();
    active = item;
    const opts = item.options || {};
    const tone = ['danger', 'warning', 'info'].includes(opts.tone) ? opts.tone : 'info';
    node.dataset.tone = tone;
    node.querySelector('#portalActionKicker').textContent = opts.kicker ||
      (item.kind === 'alert' ? 'NOTICE' : tone === 'danger' ? 'PLEASE CONFIRM' : tone === 'warning' ? 'REVIEW BEFORE CONTINUING' : 'CONFIRM ACTION');
    node.querySelector('#portalActionTitle').textContent = opts.title ||
      (item.kind === 'alert' ? 'Notice' : 'Confirm action');
    const subject = String(opts.subject || '').trim();
    const subjectNode = node.querySelector('#portalActionSubject');
    subjectNode.textContent = subject;
    subjectNode.hidden = !subject;
    node.classList.toggle('has-subject', Boolean(subject));
    node.querySelector('#portalActionMessage').textContent = item.message;
    const cancel = node.querySelector('#portalActionCancel');
    const proceed = node.querySelector('#portalActionProceed');
    cancel.hidden = item.kind === 'alert';
    cancel.textContent = opts.cancelLabel || 'Cancel';
    proceed.textContent = opts.confirmLabel || (item.kind === 'alert' ? 'Got it' : 'Continue');
    try {
      node.showModal();
    } catch (error) {
      // Failing closed is safer than running a destructive action without
      // confirmation. A broken modal must never block later queued requests.
      console.warn('Action dialog could not be opened.', error);
      active = null;
      item.resolve(false);
      schedulePump();
      return;
    }
    try { proceed.focus({ preventScroll: true }); } catch (error) { /* optional */ }
  }

  function request(kind, message, options = {}) {
    return new Promise(resolve => {
      queue.push({ kind, message: String(message ?? ''), options, resolve });
      pump();
    });
  }

  window.PortalDialog = Object.freeze({
    confirm: (message, options) => request('confirm', message, options),
    alert: (message, options) => request('alert', message, options)
  });
})();
