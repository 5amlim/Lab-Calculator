(function manualNotice() {
  'use strict';

  let continueToForm = null;

  const magnifier = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="6.5"></circle><path d="m16 16 5 5"></path></svg>';
  const laptop = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><rect x="4" y="3.5" width="16" height="13" rx="2"></rect><path d="M2 20h20M9 20l1-3.5h4l1 3.5"></path></svg>';
  const check = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="m5 12 4 4L19 6"></path></svg>';

  function setup() {
    const form = document.getElementById('testForm');
    const actions = form && form.querySelector('.dialog-actions');
    if (!actions || document.getElementById('manualTestNotice')) return;

    const notice = document.createElement('dialog');
    notice.id = 'manualTestNotice';
    notice.className = 'manual-test-notice no-print';
    notice.setAttribute('aria-labelledby', 'manualTestNoticeTitle');
    notice.setAttribute('aria-describedby', 'manualTestNoticeDescription');
    notice.innerHTML = `
      <div class="manual-notice-header">
        <div class="manual-notice-icon" aria-hidden="true">${laptop}</div>
        <div>
          <div class="manual-notice-kicker">BEFORE YOU ADD A TEST</div>
          <h2 id="manualTestNoticeTitle">Saved in this browser only</h2>
          <p id="manualTestNoticeDescription">Other staff and devices cannot see this test. Clearing browser data may remove it.</p>
        </div>
      </div>
      <div class="manual-notice-check">
        <span class="manual-notice-check-icon" aria-hidden="true">${check}</span>
        <div><strong>Double-check before collecting and processing</strong>
          <p>Verify test details in the official test directory.</p>
        </div>
      </div>
      <div class="manual-notice-permanent">
        <span aria-hidden="true" class="manual-notice-spark">✳</span>
        <div><strong>Need this test available to everyone?</strong>
          <p>Contact <strong>Sam Hay</strong> to request a permanent addition to the calculator.</p>
        </div>
      </div>
      <div class="manual-notice-actions">
        <button type="button" class="manual-notice-cancel" id="manualNoticeCancel">Cancel</button>
        <button type="button" class="manual-notice-continue" id="manualNoticeContinue">I understand · Continue</button>
      </div>`;
    document.body.appendChild(notice);

    const guide = document.createElement('section');
    guide.className = 'manual-test-form-help no-print';
    guide.setAttribute('aria-label', 'Manually added test guidance');
    guide.innerHTML = `
      <div class="manual-form-alert">
        <span class="manual-form-alert-icon" aria-hidden="true">${laptop}</span>
        <div><strong>Manual entries stay in this browser</strong><p>Only visible in this browser. Verify details in the official test directory before use.</p></div>
      </div>
      <div class="manual-help-accordion">
        <details class="manual-help-details">
          <summary class="manual-help-toggle">
            <span class="manual-help-question" aria-hidden="true">?</span>
            <span class="manual-help-copy"><strong>How do I delete a manually added test?</strong><small>View deletion steps</small></span>
            <span class="manual-help-chevron shared-chevron" aria-hidden="true"></span>
          </summary>
          <div class="manual-help-popover" id="manualDeleteIllustration">
            <p class="manual-guide-title">Remove a test from this browser</p>
            <div class="manual-guide-steps">
              <div class="manual-guide-step">
                <span class="manual-guide-number" aria-hidden="true">1</span>
                <strong>Find the test</strong>
                <div class="manual-mock-search" aria-hidden="true">
                  <span class="manual-mock-field-label">Search tests</span>
                  <div class="manual-mock-input"><span class="manual-mock-search-icon">${magnifier}</span><span>Search by name or code</span></div>
                </div>
                <p>Search the test list for the entry you added.</p>
              </div>
              <div class="manual-guide-step">
                <span class="manual-guide-number" aria-hidden="true">2</span>
                <strong>Select Edit</strong>
                <div class="manual-mock-row" aria-hidden="true">
                  <div class="manual-mock-row-copy"><b>Your manually added test</b><small>Manual entry · Added by XX</small></div>
                  <span class="manual-mock-edit">Edit</span>
                </div>
                <p>Choose <b>Edit</b> beside that test in the list.</p>
              </div>
              <div class="manual-guide-step">
                <span class="manual-guide-number" aria-hidden="true">3</span>
                <strong>Scroll down in the form</strong>
                <div class="manual-mock-form" aria-hidden="true">
                  <div class="manual-mock-form-heading">Edit test <span>×</span></div>
                  <div class="manual-mock-form-fields"><span></span><span></span><span></span><div>↓ Scroll to bottom</div></div>
                  <div class="manual-mock-form-actions">
                    <span class="manual-mock-delete">Delete manual entry</span>
                    <span class="manual-mock-secondary">Cancel</span>
                    <span class="manual-mock-primary">Save changes</span>
                  </div>
                </div>
                <p>At the bottom of the Edit test form, select <b>Delete manual entry</b>.</p>
              </div>
              <div class="manual-guide-step">
                <span class="manual-guide-number" aria-hidden="true">4</span>
                <strong>Confirm deletion</strong>
                <div class="manual-mock-confirm" aria-hidden="true">
                  <div class="manual-mock-confirm-heading">Browser confirmation</div>
                  <p>Delete the custom entry “Your manually added test”?</p>
                  <div><span>Cancel</span><span class="manual-mock-ok">OK</span></div>
                </div>
                <p>Select <b>OK</b> in the browser confirmation to remove the test.</p>
              </div>
            </div>
            <p class="manual-guide-footnote">The delete option only appears when editing a manually added test. It removes that entry from this browser, not from anyone else's calculator.</p>
          </div>
        </details>
      </div>
            <p class="manual-help-permanent"><strong>Need this test available to everyone?</strong> Contact <strong>Sam Hay</strong> to add it permanently.</p>`;
    actions.parentElement.insertBefore(guide, actions);

    const cancel = document.getElementById('manualNoticeCancel');
    const proceed = document.getElementById('manualNoticeContinue');
    cancel.addEventListener('click', () => notice.close());
    notice.addEventListener('close', () => { continueToForm = null; });
    proceed.addEventListener('click', () => {
      const callback = continueToForm;
      continueToForm = null;
      notice.close();
      if (typeof callback === 'function') callback();
    });

  }

  window.showManualTestNotice = function(onContinue) {
    const notice = document.getElementById('manualTestNotice');
    if (!notice || typeof notice.showModal !== 'function') {
      onContinue();
      return;
    }
    continueToForm = onContinue;
    if (!notice.open) notice.showModal();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup, { once: true });
  } else {
    setup();
  }
})();
