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
      // A previous confirmation must not dismiss a newer one. The close event
      // belongs to the dialog that just finished, not a pending queued action.
      closing = false;
      if (active) {
        const dismissed = active;
        active = null;
        dismissed.resolve(false);
      }
      pump();
    });
    return dialog;
  }

  function settle(accepted) {
    if (!active) return;
    const item = active;
    active = null;
    // Set the closing guard before resolving the promise, since an awaiting
    // handler may immediately request a second confirmation (e.g. STAT).
    if (dialog?.open) {
      closing = true;
      dialog.close();
    }
    item.resolve(Boolean(accepted));
    if (!closing) Promise.resolve().then(pump);
  }

  function pump() {
    if (active || closing || !queue.length) return;
    if (!document.body) {
      document.addEventListener('DOMContentLoaded', pump, { once: true });
      return;
    }
    const item = queue.shift();
    const node = ensureDialog();
    if (typeof node.showModal !== 'function') {
      item.resolve(false);
      Promise.resolve().then(pump);
      return;
    }
    active = item;
    const opts = item.options;
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
    node.showModal();
    proceed.focus({ preventScroll: true });
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
