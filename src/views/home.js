/**
 * Home: search across everything, or browse by organ system.
 */

import { html, when } from '../lib/dom.js';
import { href } from '../lib/router.js';
import { SYSTEM_INDEX, PROCEDURES, HALO_PROCEDURES } from '../data/index.js';
import { search } from '../lib/search.js';
import { icon } from '../components/icons.js';
import { emptyState, procedureList } from '../components/procedure-list.js';
import { dueList, standing } from '../lib/rehearsal.js';
import { downloadCalendar, rehearsalCalendar } from '../lib/ics.js';
import { dueSummary } from '../components/rehearsal-status.js';

export const ACTION_EXPORT = 'export-calendar';

/**
 * The app is static, so it cannot email or push you anything while it is shut.
 * Your calendar can, on whatever device and by whatever channel you already
 * have set up — so hand it the schedule and let it do the reminding.
 */
export const exportRehearsalCalendar = () => {
  const entries = HALO_PROCEDURES.map((procedure) => ({
    procedure,
    standing: standing(procedure.id),
  }));
  const appUrl = location.href.split('#')[0];
  downloadCalendar(rehearsalCalendar(entries, appUrl));
};

const sectionTitle = (title, note = '') => html`
  <h2 class="font-display text-[1.3rem] font-bold tracking-tight">
    ${title}${when(
      note,
      html`<span class="ml-2 align-middle font-display text-[0.72rem] font-semibold tracking-[0.1em] text-muted-foreground uppercase">
        ${note}
      </span>`,
    )}
  </h2>
`;

const systemGrid = () => html`
  <ul class="grid gap-2.5 sm:grid-cols-2">
    ${SYSTEM_INDEX.map(
      (system) => html`
        <li data-system="${system.id}">
          <a
            class="group flex h-full items-center gap-3.5 rounded-xl border border-border bg-card p-3.5 shadow-xs transition-all hover:-translate-y-px hover:border-sys/40 hover:shadow-md"
            href="${href(`/system/${system.id}`)}"
          >
            <span
              class="grid size-11 shrink-0 place-items-center rounded-lg bg-sys/10 text-sys ring-1 ring-sys/15 transition-colors group-hover:bg-sys/15"
              >${icon(system.icon, { size: 24 })}</span
            >
            <span class="flex min-w-0 flex-col gap-0.5">
              <span class="font-display text-[0.98rem] leading-tight font-semibold tracking-tight">
                ${system.name}
              </span>
              <span class="text-[0.8rem] leading-snug font-medium text-muted-foreground">${system.blurb}</span>
            </span>
            <span
              class="ml-auto grid size-7 shrink-0 place-items-center rounded-md bg-secondary font-display text-[0.78rem] font-bold tabular text-secondary-foreground"
              >${system.procedures.length}</span
            >
          </a>
        </li>
      `,
    )}
  </ul>
`;

const rehearseBand = () => {
  const due = dueList(HALO_PROCEDURES);
  return html`
    <section
      class="mb-9 rounded-2xl border border-halo/20 bg-linear-to-b from-halo/8 to-transparent p-4 sm:p-5"
    >
      <div class="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        ${sectionTitle('Rehearse', 'high acuity, low occurrence')}
        ${dueSummary(due.length, HALO_PROCEDURES.length)}
      </div>
      <p class="mt-1.5 mb-3.5 max-w-prose text-[0.88rem] leading-relaxed text-muted-foreground">
        <span class="font-semibold tabular text-foreground">${HALO_PROCEDURES.length}</span>
        procedures you will do rarely and badly unless you practise them cold. Say one out loud when
        nothing is happening, not when it is.
      </p>
      <div class="mb-4 flex flex-wrap gap-2">
        ${when(
          due.length,
          html`<a
            class="inline-flex h-9 items-center gap-1.5 rounded-lg bg-halo px-3.5 font-display text-[0.83rem] font-semibold text-halo-foreground shadow-xs transition-colors hover:bg-halo/90"
            href="${href(`/rehearse/${due[0].procedure.id}`)}"
            >${icon('mic', { size: 15 })} Rehearse ${due[0].procedure.name}</a
          >`,
        )}
        <button
          class="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border bg-background px-3.5 font-display text-[0.83rem] font-semibold shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground"
          type="button"
          data-action="${ACTION_EXPORT}"
        >
          ${icon('calendar', { size: 15 })} Add reminders to calendar
        </button>
      </div>
      ${procedureList(HALO_PROCEDURES, { showSystem: true, compact: true, showStanding: true })}
    </section>
  `;
};

const results = (query) => {
  const matches = search(PROCEDURES, query);
  return html`
    <section class="grid gap-3.5">
      ${sectionTitle(
        html`<span class="tabular">${matches.length}</span> result${matches.length === 1 ? '' : 's'}
          for &ldquo;${query}&rdquo;`,
      )}
      ${matches.length
        ? procedureList(matches, { showSystem: true })
        : emptyState('Nothing matched. Try the procedure name, a synonym, or an indication.')}
    </section>
  `;
};

export const homeView = ({ params }) => {
  const query = (params.get('q') ?? '').trim();
  return html`
    <section class="mb-8">
      <p class="font-display text-[0.7rem] font-bold tracking-[0.18em] text-primary uppercase">
        Bedside reference
      </p>
      <h1 class="mt-2 font-display text-[2.4rem] leading-[1.05] font-bold tracking-tight sm:text-5xl">
        Emergency Procedures
      </h1>
      <p class="mt-3.5 max-w-prose text-[0.95rem] leading-relaxed text-muted-foreground">
        <span class="font-semibold tabular text-foreground">${PROCEDURES.length}</span> procedures
        across
        <span class="font-semibold tabular text-foreground">${SYSTEM_INDEX.length}</span> organ
        systems. Watch the video, gather the kit, then do it.
      </p>
    </section>

    ${query
      ? results(query)
      : html`
          ${rehearseBand()}

          <section class="grid gap-3.5">
            ${sectionTitle('Browse by system')} ${systemGrid()}
          </section>
        `}
    ${when(
      query,
      html`<p class="mt-6 text-center text-sm">
        <a class="font-medium text-primary underline underline-offset-4 hover:no-underline" href="${href('/')}">
          Clear search and browse all systems
        </a>
      </p>`,
    )}
  `;
};
