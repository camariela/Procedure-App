/**
 * Home: search across everything, or browse by organ system.
 */

import { html, when } from '../lib/dom.js';
import { href } from '../lib/router.js';
import { SYSTEM_INDEX, PROCEDURES, HALO_PROCEDURES } from '../data/index.js';
import { search } from '../lib/search.js';
import { icon } from '../components/icons.js';
import { emptyState, procedureList } from '../components/procedure-list.js';

const systemGrid = () => html`
  <ul class="systems">
    ${SYSTEM_INDEX.map(
      (system) => html`
        <li>
          <a class="system" href="${href(`/system/${system.id}`)}">
            <span class="system__icon">${icon(system.icon, { size: 26 })}</span>
            <span class="system__body">
              <span class="system__name">${system.name}</span>
              <span class="system__blurb">${system.blurb}</span>
            </span>
            <span class="system__count">${system.procedures.length}</span>
          </a>
        </li>
      `,
    )}
  </ul>
`;

const results = (query) => {
  const matches = search(PROCEDURES, query);
  return html`
    <section class="section">
      <h2 class="section__title">
        ${matches.length} result${matches.length === 1 ? '' : 's'} for &ldquo;${query}&rdquo;
      </h2>
      ${matches.length
        ? procedureList(matches, { showSystem: true })
        : emptyState('Nothing matched. Try the procedure name, a synonym, or an indication.')}
    </section>
  `;
};

export const homeView = ({ params }) => {
  const query = (params.get('q') ?? '').trim();
  return html`
    <section class="hero">
      <h1 class="hero__title">Emergency Procedures</h1>
      <p class="hero__sub">
        ${PROCEDURES.length} procedures across ${SYSTEM_INDEX.length} organ systems. Watch the
        video, gather the kit, then do it.
      </p>
    </section>
    ${query
      ? results(query)
      : html`
          <section class="section section--halo">
            <h2 class="section__title">
              Rehearse <span class="section__note">high acuity, low occurrence</span>
            </h2>
            <p class="section__lead">
              You will do these rarely and badly unless you practise them cold. Read
              one when nothing is happening, not when it is.
            </p>
            ${procedureList(HALO_PROCEDURES, { showSystem: true })}
          </section>
          <section class="section">
            <h2 class="section__title">Browse by system</h2>
            ${systemGrid()}
          </section>
        `}
    ${when(
      query,
      html`<p class="section__foot">
        <a href="${href('/')}">Clear search and browse all systems</a>
      </p>`,
    )}
  `;
};
