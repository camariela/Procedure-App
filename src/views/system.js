/**
 * One organ system and everything filed under it.
 */

import { html } from '../lib/dom.js';
import { href } from '../lib/router.js';
import { systemById, proceduresBySystem } from '../data/index.js';
import { icon } from '../components/icons.js';
import { emptyState, procedureList } from '../components/procedure-list.js';
import { notFoundView } from './not-found.js';

export const systemView = ({ captured }) => {
  const system = systemById.get(captured.systemId);
  if (!system) return notFoundView();

  const procedures = proceduresBySystem(system.id);
  return html`
    <a class="backlink" href="${href('/')}">${icon('back', { size: 18 })} All systems</a>
    <header class="page-head">
      <span class="page-head__icon">${icon(system.icon, { size: 28 })}</span>
      <div>
        <h1 class="page-head__title">${system.name}</h1>
        <p class="page-head__sub">${system.blurb}</p>
      </div>
    </header>
    ${procedures.length
      ? procedureList(procedures)
      : emptyState('No procedures filed under this system yet.')}
  `;
};
