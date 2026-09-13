/**
 * The one way back. Used by both detail views, so it lives here rather than
 * being written twice.
 */

import { html } from '../lib/dom.js';
import { icon } from './icons.js';

export const backLink = (to, label) => html`
  <a
    class="inline-flex h-8 items-center gap-1 -ml-2 rounded-md pr-2.5 pl-1.5 text-[0.85rem] font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-secondary-foreground"
    href="${to}"
    >${icon('back', { size: 16 })} ${label}</a
  >
`;
