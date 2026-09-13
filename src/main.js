/**
 * Application bootstrap: wire the router, bind the handful of interactions the
 * app has, and register the service worker.
 *
 * Views are pure functions of the route, so everything here is either routing,
 * a delegated event, or progressive enhancement.
 */

import { onAction, qs, render } from './lib/dom.js';
import { createRouter, navigate } from './lib/router.js';
import { reset, toggle } from './lib/checklist.js';
import { procedureById } from './data/index.js';
import { homeView } from './views/home.js';
import { systemView } from './views/system.js';
import { procedureView, panelFor } from './views/procedure.js';
import { rehearseView, rehearseAction } from './views/rehearse.js';
import { notFoundView } from './views/not-found.js';
import { ACTION_TICK, ACTION_RESET } from './components/checklist.js';
import { ACTION_PLAY, mountEmbed } from './components/video.js';
import { ACTION_EXPORT, exportRehearsalCalendar } from './views/home.js';

const app = qs('#app');
const searchInput = qs('#search');

const router = createRouter(
  [
    { pattern: [], view: homeView },
    { pattern: ['system', ':systemId'], view: systemView },
    { pattern: ['procedure', ':procedureId'], view: procedureView },
    { pattern: ['rehearse', ':procedureId'], view: rehearseView },
  ],
  notFoundView,
);

/** Re-render only the open panel, so ticking a box does not move the page. */
const refreshPanel = () => {
  const panel = qs('[data-panel]');
  if (!panel) return;
  const procedure = procedureById.get(panel.dataset.procedure);
  if (procedure) render(panel, panelFor(procedure, panel.dataset.section));
};

onAction(app, 'click', (action, target, event) => {
  if (rehearseAction(action)) return;

  const panel = target.closest('[data-panel]');
  const procedureId = panel?.dataset.procedure;

  if (action === ACTION_TICK && procedureId) {
    toggle(procedureId, target.dataset.list, target.dataset.key);
    refreshPanel();
  }

  if (action === ACTION_RESET && procedureId) {
    reset(procedureId, target.dataset.list);
    refreshPanel();
  }

  if (action === ACTION_EXPORT) {
    exportRehearsalCalendar();
    return;
  }

  if (action === ACTION_PLAY && procedureId) {
    event.preventDefault();
    mountEmbed(qs('[data-video-frame]', panel), procedureById.get(procedureId));
  }
});

/** Search always lands on the home route, whichever page you started from. */
let searchTimer;
searchInput.addEventListener('input', () => {
  clearTimeout(searchTimer);
  const query = searchInput.value.trim();
  searchTimer = setTimeout(() => navigate(query ? `/?q=${encodeURIComponent(query)}` : '/'), 180);
});

searchInput.addEventListener('search', () => {
  if (!searchInput.value) navigate('/');
});

let lastPath = null;
router.start((route) => {
  render(app, route.view(route));
  document.title = qs('h1', app)?.textContent
    ? `${qs('h1', app).textContent.trim()} — EM Procedures`
    : 'EM Procedures';

  // Keep the field in step with the URL, and only jump to the top when the
  // page itself changed — switching tabs should stay put.
  const path = location.hash.split('?')[0];
  searchInput.value = route.params.get('q') ?? '';
  if (path !== lastPath) scrollTo({ top: 0 });
  lastPath = path;
});

if ('serviceWorker' in navigator) {
  addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {
      /* offline support is an enhancement; the app works without it */
    });
  });
}

const setOnlineState = () => document.body.classList.toggle('is-offline', !navigator.onLine);
addEventListener('online', setOnlineState);
addEventListener('offline', setOnlineState);
setOnlineState();
