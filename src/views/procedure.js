/**
 * A single procedure. The active panel lives in the URL (`?section=steps`) so
 * it survives a reload, a share and the back button without any local state.
 */

import { html } from '../lib/dom.js';
import { href } from '../lib/router.js';
import { procedureById, systemById } from '../data/index.js';
import { SECTIONS, sectionById } from '../components/sections.js';
import { acuityBadge, haloBadge, reviewBadge } from '../components/badges.js';
import { icon } from '../components/icons.js';
import { notFoundView } from './not-found.js';

export const panelFor = (procedure, sectionId) => sectionById(sectionId).render(procedure);

const tabs = (procedure, activeId) => html`
  <nav class="tabs" role="tablist" aria-label="Procedure sections">
    ${SECTIONS.map(
      (section) => html`
        <a
          class="tab ${section.id === activeId ? 'is-active' : ''}"
          role="tab"
          aria-selected="${section.id === activeId ? 'true' : 'false'}"
          href="${href(`/procedure/${procedure.id}?section=${section.id}`)}"
        >
          ${icon(section.icon, { size: 18 })}
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
    <a class="backlink" href="${href(`/system/${procedure.systemId}`)}">
      ${icon('back', { size: 18 })} ${system.name}
    </a>
    <header class="page-head page-head--procedure">
      <h1 class="page-head__title">${procedure.name}</h1>
      <p class="page-head__sub">${procedure.summary}</p>
      <p class="badges">
        ${haloBadge(procedure.frequency)} ${acuityBadge(procedure.acuity)}
        ${reviewBadge(procedure.verified)}
      </p>
    </header>
    ${tabs(procedure, section.id)}
    <div class="panel" data-panel data-procedure="${procedure.id}" data-section="${section.id}" role="tabpanel">
      ${section.render(procedure)}
    </div>
  `;
};
