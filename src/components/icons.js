/**
 * Inline SVG icon set. Inline keeps them themeable with `currentColor` and
 * removes a network round-trip that would otherwise fail offline.
 */

import { html, raw } from '../lib/dom.js';

const PATHS = {
  lungs:
    '<path d="M12 3v9M8.5 6.5c0 3-3.5 3.5-3.5 8 0 3 1 5.5 2.5 5.5S10 18 10 15v-3c0-2-1.5-5.5-1.5-5.5ZM15.5 6.5c0 3 3.5 3.5 3.5 8 0 3-1 5.5-2.5 5.5S14 18 14 15v-3c0-2 1.5-5.5 1.5-5.5Z"/>',
  heart:
    '<path d="M12 20.5 4.8 13.3a4.6 4.6 0 0 1 0-6.5 4.6 4.6 0 0 1 6.5 0l.7.7.7-.7a4.6 4.6 0 0 1 6.5 6.5Z"/><path d="M4.5 12.5h3L9 9.8l2 5 1.6-3.3 1 1h5.6"/>',
  drop: '<path d="M12 3.5S6 10 6 14a6 6 0 0 0 12 0c0-4-6-10.5-6-10.5Z"/><path d="M9.5 14.5a2.5 2.5 0 0 0 2.5 2.5"/>',
  ribs:
    '<path d="M12 3.5v17"/><path d="M12 6.5c2.8 0 5.2 1 6.5 2.6M12 6.5c-2.8 0-5.2 1-6.5 2.6M12 11c2.6 0 4.8 1 6 2.5M12 11c-2.6 0-4.8 1-6 2.5M12 15.5c2.2 0 4.1 1 5.2 2.3M12 15.5c-2.2 0-4.1 1-5.2 2.3"/>',
  brain:
    '<path d="M9.5 4.5A2.8 2.8 0 0 0 6.8 7 2.6 2.6 0 0 0 5 9.5c0 1 .5 1.9 1.3 2.4A2.7 2.7 0 0 0 6 14c0 1.1.6 2 1.6 2.4 0 1.7 1.2 3 2.8 3 .9 0 1.6-.5 1.6-1.4V6.2c0-1-.7-1.7-1.7-1.7Z"/><path d="M14.5 4.5A2.8 2.8 0 0 1 17.2 7 2.6 2.6 0 0 1 19 9.5c0 1-.5 1.9-1.3 2.4.2.4.3.8.3 1.3 0 1.1-.6 2-1.6 2.4 0 1.7-1.2 3-2.8 3-.9 0-1.6-.5-1.6-1.4V6.2c0-1 .7-1.7 1.7-1.7Z"/>',
  abdomen: '<circle cx="12" cy="12" r="8"/><path d="M9 8c2 1.5 1 3.5-.5 4.5S7 16 9 17M15 8c-2 1.5-1 3.5.5 4.5S17 16 15 17"/>',
  kidney:
    '<path d="M13.5 4.5c-3.3 0-6 3.4-6 7.5s2.7 7.5 6 7.5c1.7 0 2.6-1.2 2.6-2.6 0-1.6-1.6-2.4-1.6-4.9s1.6-3.3 1.6-4.9c0-1.4-.9-2.6-2.6-2.6Z"/><path d="M11 10.5c1.2.6 1.2 2.4 0 3"/>',
  obstetric:
    '<path d="M6 10c0-2.4 12-2.4 12 0 0 4.6-3.6 6.6-4.2 9.6h-3.6C9.6 16.6 6 14.6 6 10Z"/><path d="M6 10c-.7-2-1.6-3-2.9-3.3M18 10c.7-2 1.6-3 2.9-3.3"/><circle cx="2.5" cy="6.2" r="1.2"/><circle cx="21.5" cy="6.2" r="1.2"/>',
  bone: '<path d="M8.5 15.5 15.5 8.5"/><path d="M7 13a2.5 2.5 0 1 0-2.4 3.4A2.5 2.5 0 1 0 8 19l1-1M17 11a2.5 2.5 0 1 0 2.4-3.4A2.5 2.5 0 1 0 16 5l-1 1"/>',
  eye: '<path d="M2.5 12S6 6.5 12 6.5 21.5 12 21.5 12 18 17.5 12 17.5 2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="2.5"/>',
  suture:
    '<path d="M12 3.5v17"/><path d="M8.5 6.5 15.5 9M8.5 11 15.5 13.5M8.5 15.5 15.5 18"/>',
  syringe:
    '<path d="M4 20l3.5-3.5M8.5 15.5 15 9l3 3-6.5 6.5ZM14 7l3 3M16 5l3 3M11 12l1.5 1.5"/>',
  mic: '<path d="M12 3.5a2.7 2.7 0 0 1 2.7 2.7v5.3a2.7 2.7 0 0 1-5.4 0V6.2A2.7 2.7 0 0 1 12 3.5Z"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5v3M9 20.5h6"/>',
  stop: '<rect x="6.5" y="6.5" width="11" height="11" rx="2"/>',
  calendar:
    '<rect x="3.5" y="5.5" width="17" height="15" rx="2.5"/><path d="M3.5 10h17M8 3.5v4M16 3.5v4"/>',
  target:
    '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1"/>',
  keyboard:
    '<rect x="2.5" y="6.5" width="19" height="11" rx="2"/><path d="M6 10h.01M9.5 10h.01M13 10h.01M16.5 10h.01M6 13.5h.01M18 10h.01M8.5 14h7"/>',
  search: '<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4 4"/>',
  back: '<path d="M15 5l-7 7 7 7"/>',
  play: '<path d="M8 5.5v13l11-6.5Z"/>',
  check: '<path d="M5 12.5 10 17.5 19 7"/>',
  reset: '<path d="M4.5 12a7.5 7.5 0 1 0 2.3-5.4"/><path d="M4 4v4h4"/>',
  warning: '<path d="M12 4 2.5 20.5h19Z"/><path d="M12 10v4.5M12 17.5v.5"/>',
  book: '<path d="M5 4.5h9a3 3 0 0 1 3 3V20a2.5 2.5 0 0 0-2.5-2.5H5Z"/><path d="M17 7.5h2v12h-2"/>',
  kit: '<rect x="3.5" y="7.5" width="17" height="12" rx="2"/><path d="M9 7.5V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1.5M12 11v5M9.5 13.5h5"/>',
  offline: '<path d="M12 19.5v.01"/><path d="M8.5 16a5 5 0 0 1 7 0M5 12.5a10 10 0 0 1 14 0"/><path d="M3 3l18 18"/>',
};

/** @param {keyof PATHS} name */
export const icon = (name, { size = 24, className = '' } = {}) =>
  PATHS[name]
    ? html`<svg
        class="shrink-0 ${className}"
        viewBox="0 0 24 24"
        width="${size}"
        height="${size}"
        fill="none"
        stroke="currentColor"
        stroke-width="1.6"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >${raw(PATHS[name])}</svg>`
    : '';
