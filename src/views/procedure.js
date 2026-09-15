/**
 * A single procedure. The active panel lives in the URL (`?section=steps`) so
 * it survives a reload, a share and the back button without any local state.
 *
 * The tab row follows shadcn's Tabs: a muted track, and the active trigger
 * lifted onto the page background rather than tinted.
 */

import { html, when } from '../lib/dom.js';
import { href } from '../lib/router.js';
import { procedureById, systemById } from '../data/index.js';
import { SECTIONS, sectionById } from '../components/sections.js';
import { acuityBadge, haloBadge, reviewBadge } from '../components/badges.js';
import { icon } from '../components/icons.js';
import { backLink } from '../components/back-link.js';
import { rehearsalStrip } from '../components/rehearsal-status.js';
import { standing } from '../lib/rehearsal.js';
import { notFoundView } from './not-found.js';

export const panelFor = (procedure, sectionId) => sectionById(sectionId).render(procedure);

const TAB =
  'inline-flex min-h-9 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-center font-display text-[0.78rem] leading-tight font-semibold tracking-tight transition-all';

const tabs = (procedure, activeId) => html`
  <nav
    class="mb-4 grid grid-cols-2 gap-1 rounded-lg bg-muted p-[3px] ring-1 ring-border/60 sm:grid-cols-4"
    role="tablist"
    aria-label="Procedure sections"
  >
    ${SECTIONS.map(
      (section) => html`
        <a
          class="${TAB} ${section.id === activeId
            ? 'border-border/70 bg-background text-foreground shadow-xs'
            : 'text-muted-foreground hover:text-foreground'}"
          role="tab"
          aria-selected="${section.id === activeId ? 'true' : 'false'}"
          href="${href(`/procedure/${procedure.id}?section=${section.id}`)}"
        >
          ${icon(section.icon, { size: 16, className: section.tone })}
          <span>${section.label}</span>
        </a>
      `,
    )}
  </nav>
`;

export const procedureView = ({ captured, params }) => {
  const procedure = procedureById.get(captured.procedureId);
  if (!procedure) return notFoundView();

  const section = sectionById(params.get('section'));
  const system = systemById.get(procedure.systemId);

  return html`
    <div data-system="${procedure.systemId}">
      ${backLink(href(`/system/${procedure.systemId}`), system.name)}
      <header class="mt-3 mb-5 border-l-[3px] border-sys pl-4">
        <p class="font-display text-[0.7rem] font-bold tracking-[0.14em] text-sys uppercase">
          ${system.name}
        </p>
        <h1 class="mt-1 font-display text-[1.75rem] leading-[1.15] font-bold tracking-tight">
          ${procedure.name}
        </h1>
        <p class="mt-2 text-[0.92rem] leading-relaxed text-muted-foreground">${procedure.summary}</p>
        <p class="mt-3 flex flex-wrap items-center gap-1.5">
          ${haloBadge(procedure.frequency)} ${acuityBadge(procedure.acuity)}
          ${reviewBadge(procedure.verified)}
        </p>
      </header>
      ${when(
        procedure.frequency === 'halo',
        rehearsalStrip(procedure, standing(procedure.id), href(`/rehearse/${procedure.id}`)),
      )}
      ${tabs(procedure, section.id)}
      <div
        data-panel
        data-procedure="${procedure.id}"
        data-section="${section.id}"
        role="tabpanel"
      >
        ${section.render(procedure)}
      </div>
    </div>
  `;
};
