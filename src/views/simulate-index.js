/**
 * Choosing what to simulate.
 *
 * The home band used to send you straight into whichever procedure happened to
 * sort first, which is not a choice. This is the chooser: everything in the
 * HALO set, worst standing first, so the one the schedule thinks you most need
 * is at the top but you can take any of them.
 */

import { html, when } from '../lib/dom.js';
import { href } from '../lib/router.js';
import { HALO_PROCEDURES } from '../data/index.js';
import { standing } from '../lib/rehearsal.js';
import { dueLabel, rehearsalChip } from '../components/rehearsal-status.js';
import { icon } from '../components/icons.js';
import { backLink } from '../components/back-link.js';
import { ACTION_EXPORT } from './home.js';

/** Worst first: never simulated, then most overdue, then nearest due. */
const RANK = { never: 0, due: 1, soon: 2, fresh: 3 };

const ordered = () =>
  HALO_PROCEDURES.map((procedure) => ({ procedure, standing: standing(procedure.id) })).sort(
    (a, b) =>
      RANK[a.standing.state] - RANK[b.standing.state] ||
      (a.standing.daysUntilDue ?? 0) - (b.standing.daysUntilDue ?? 0) ||
      a.procedure.name.localeCompare(b.procedure.name),
  );

export const simulateIndexView = () => {
  const entries = ordered();
  const outstanding = entries.filter((entry) => RANK[entry.standing.state] <= 1).length;

  return html`
    ${backLink(href('/'), 'All systems')}
    <header class="mt-3 mb-5">
      <p class="font-display text-[0.7rem] font-bold tracking-[0.14em] text-halo uppercase">
        High acuity, low occurrence
      </p>
      <h1 class="mt-1 font-display text-[1.6rem] leading-tight font-bold tracking-tight">
        Mental Simulation and Visualization
      </h1>
      <p class="mt-2 text-[0.9rem] leading-relaxed text-muted-foreground">
        Pick the one you want to work through. Watch it, visualise the anatomy, then talk the
        technique through from memory and see what you left out.
      </p>
      <p class="mt-3">
        <button
          class="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border bg-background px-3.5 font-display text-[0.83rem] font-semibold shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground"
          type="button"
          data-action="${ACTION_EXPORT}"
        >
          ${icon('calendar', { size: 15 })} Add reminders to calendar
        </button>
      </p>
    </header>

    ${when(
      outstanding,
      html`<p class="mb-3 font-display text-[0.72rem] font-semibold tracking-[0.06em] text-halo uppercase">
        <span class="tabular">${outstanding}</span> outstanding
      </p>`,
    )}

    <ul class="grid gap-2.5">
      ${entries.map(
        ({ procedure, standing: state }) => html`
          <li data-system="${procedure.systemId}">
            <a
              class="group relative flex flex-col gap-1.5 overflow-hidden rounded-xl border border-border bg-card py-3.5 pr-3.5 pl-4.5 shadow-xs transition-all hover:-translate-y-px hover:border-sys/35 hover:shadow-md"
              href="${href(`/rehearse/${procedure.id}`)}"
            >
              <span class="absolute inset-y-0 left-0 w-1 bg-sys/70 transition-colors group-hover:bg-sys"></span>
              <span class="flex flex-wrap items-start justify-between gap-x-3 gap-y-1.5">
                <span class="font-display text-[1.02rem] leading-snug font-semibold tracking-tight">
                  ${procedure.name}
                </span>
                ${rehearsalChip(state)}
              </span>
              <span class="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.78rem]">
                <span class="font-display font-semibold tracking-[0.08em] text-sys uppercase">
                  ${procedure.systemName}
                </span>
                ${when(
                  state.state !== 'never',
                  html`<span class="text-muted-foreground">·</span>
                    <span class="text-muted-foreground">
                      ${dueLabel(state)}${state.lastScore === null
                        ? ''
                        : html`, last score
                            <span class="font-semibold tabular text-foreground">${state.lastScore}</span>`}
                    </span>`,
                )}
              </span>
            </a>
          </li>
        `,
      )}
    </ul>
  `;
};
