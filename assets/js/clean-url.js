/* Keep page addresses free of campaign tracking parameters. */
(() => {
  'use strict';

  if (typeof window === 'undefined' || typeof window.history?.replaceState !== 'function') return;

  const url = new URL(window.location.href);
  let changed = false;

  for (const key of [...url.searchParams.keys()]) {
    if (!/^utm_/i.test(key)) continue;
    url.searchParams.delete(key);
    changed = true;
  }

  if (!changed) return;

  const query = url.searchParams.toString();
  const cleanPath = url.pathname + (query ? '?' + query : '') + url.hash;
  window.history.replaceState(window.history.state, '', cleanPath);
})();
