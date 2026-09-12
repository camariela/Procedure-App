/**
 * Procedure rows. Shared by search results and the system listing so the two
 * never drift apart.
 */

import { html, when } from '../lib/dom.js';
import { href } from '../lib/router.js';
import { acuityBadge, haloBadge } from './badges.js';

export const procedureList = (procedures, { showSystem = false } = {}) => html`
  <ul class="cards">
    ${procedures.map(
      (procedure) => html`
        <li>
          <a class="card" href="${href(`/procedure/${procedure.id}`)}">
            <span class="card__head">
              <span class="card__name">${procedure.name}</span>
              <span class="card__badges">
                ${haloBadge(procedure.frequency)} ${acuityBadge(procedure.acuity)}
              </span>
            </span>
            <span class="card__summary">${procedure.summary}</span>
            ${when(showSystem, html`<span class="card__system">${procedure.systemName}</span>`)}
          </a>
        </li>
      `,
    )}
  </ul>
`;

export const emptyState = (message) => html`<p class="empty">${message}</p>`;
