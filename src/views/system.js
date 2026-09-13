/**
 * One organ system and everything filed under it.
 */

import { html } from '../lib/dom.js';
import { href } from '../lib/router.js';
import { systemById, proceduresBySystem } from '../data/index.js';
import { icon } from '../components/icons.js';
import { emptyState, procedureList } from '../components/procedure-list.js';
import { notFoundView } from './not-found.js';
import { backLink } from '../components/back-link.js';

export const systemView = ({ captured }) => {
  const system = systemById.get(captured.systemId);
  if (!system) return notFoundView();

  const procedures = proceduresBySystem(system.id);
  return html`
    <div data-system="${system.id}">
      ${backLink(href('/'), 'All systems')}
      <header class="mt-3 mb-6 flex items-start gap-3.5">
        <span
          class="grid size-12 shrink-0 place-items-center rounded-xl bg-sys/10 text-sys ring-1 ring-sys/15"
          >${icon(system.icon, { size: 26 })}</span
        >
        <div class="min-w-0">
          <h1 class="font-display text-[1.75rem] leading-tight font-bold tracking-tight">
            ${system.name}
          </h1>
          <p class="mt-1 text-[0.9rem] leading-relaxed text-muted-foreground">${system.blurb}</p>
        </div>
      </header>
      ${procedures.length
        ? procedureList(procedures, { showStanding: true })
        : emptyState('No procedures filed under this system yet.')}
    </div>
  `;
};
