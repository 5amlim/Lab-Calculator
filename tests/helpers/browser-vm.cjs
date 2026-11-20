'use strict';

const vm = require('node:vm');

function addBrowserGlobals(context) {
  if (!context.window) return context;
  const window = context.window;
  window.parent ??= window;
  window.location ??= { search: '', origin: 'https://example.test' };

  const events = new EventTarget();
  window.addEventListener ??= events.addEventListener.bind(events);
  window.removeEventListener ??= events.removeEventListener.bind(events);
  window.dispatchEvent ??= events.dispatchEvent.bind(events);

  context.URL ??= URL;
  context.URLSearchParams ??= URLSearchParams;
  context.setTimeout ??= setTimeout;
  context.clearTimeout ??= clearTimeout;
  context.matchMedia ??= () => ({ matches: false });

  if (context.document) {
    context.document.documentElement ??= {};
    context.document.body ??= {};
    for (const element of [context.document.documentElement, context.document.body]) {
      if (element.classList) continue;
      const classes = new Set();
      element.classList = {
        add: name => classes.add(name),
        remove: name => classes.delete(name),
        contains: name => classes.has(name),
        toggle(name, force = !classes.has(name)) {
          if (force) classes.add(name);
          else classes.delete(name);
          return Boolean(force);
        }
      };
    }
  }
  return context;
}

module.exports = {
  ...vm,
  createContext(context, options) {
    return vm.createContext(addBrowserGlobals(context), options);
  },
  runInNewContext(code, context = {}, options) {
    return vm.runInNewContext(code, addBrowserGlobals(context), options);
  }
};
