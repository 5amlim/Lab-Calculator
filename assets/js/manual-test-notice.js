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
          <h2 id="manualTestNoticeTitle">This entry is saved in your browser only</h2>
          <p id="manualTestNoticeDescription">Manually added tests are not shared with other staff or devices. They may be lost if browser data is cleared.</p>
        </div>
      </div>
      <div class="manual-notice-check">
        <span class="manual-notice-check-icon" aria-hidden="true">${check}</span>
        <div><strong>Double-check before collecting and processing</strong>
          <p>Verify the test code, specimen, collection and transport containers, tube quantities, volume, processing steps, and temperature against the official lab directory.</p>
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
        <div><strong>Manual entries stay in this browser</strong><p>Other staff will not see them. Always verify collection and processing details with the official lab directory before using a manual entry.</p></div>
      </div>
      <div class="manual-help-hover">
        <button type="button" class="manual-help-toggle" aria-expanded="false" aria-controls="manualDeleteIllustration">
          <span class="manual-help-question">?</span>
          <span><strong>How do I delete a manually added test?</strong><small>Hover or tap to see the illustrated steps</small></span>
          <span class="manual-help-chevron" aria-hidden="true">⌄</span>
        </button>
        <div class="manual-help-popover" id="manualDeleteIllustration">
          <p class="manual-guide-title">Remove a test from this browser</p>
          <div class="manual-guide-steps">
            <div class="manual-guide-step">
              <span class="manual-guide-number">1</span>
              <strong>Find the test</strong>
              <div class="manual-mock-search"><span>${magnifier}</span> Search test name or code</div>
            </div>
            <div class="manual-guide-step">
              <span class="manual-guide-number">2</span>
              <strong>Select Edit</strong>
              <div class="manual-mock-row"><span>Manual test <em>Added manually</em></span><b>Edit</b></div>
            </div>
            <div class="manual-guide-step">
              <span class="manual-guide-number">3</span>
              <strong>Scroll to the bottom</strong>
              <div class="manual-mock-bottom"><span>↓ Scroll in the form</span><b>Delete manual entry</b></div>
            </div>
            <div class="manual-guide-step">
              <span class="manual-guide-number">4</span>
              <strong>Confirm deletion</strong>
              <div class="manual-mock-confirm"><span>Delete this entry?</span><b>OK</b></div>
            </div>
          </div>
          <p class="manual-guide-footnote">The Delete button appears only when editing a manually added test. Deletion affects this browser only.</p>
        </div>
      </div>
      <p class="manual-help-permanent"><strong>Want to add a test for everyone?</strong> Contact <strong>Sam Hay</strong> for a permanent addition.</p>`;
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

    const toggle = guide.querySelector('.manual-help-toggle');
    const hover = guide.querySelector('.manual-help-hover');
    toggle.addEventListener('click', () => {
      const open = hover.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    document.addEventListener('click', event => {
      if (!hover.contains(event.target) && hover.classList.contains('is-open')) {
        hover.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && hover.classList.contains('is-open')) {
        hover.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
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
