/**
 * How a procedure's mental-simulation standing is shown. One place, because it
 * appears on the home band, on the procedure page and on the simulation screen,
 * and the three must never disagree.
 */

import { html, when } from '../lib/dom.js';
import { icon } from './icons.js';

const STATE = {
  never: ['Never simulated', 'border-draft/25 bg-draft/10 text-draft'],
  due: ['Due now', 'border-transparent bg-halo text-halo-foreground'],
  soon: ['Due soon', 'border-urgent/25 bg-urgent/10 text-urgent'],
  fresh: ['Simulated', 'border-verified/25 bg-verified/10 text-verified'],
};

const plural = (n, word) => `${n} ${word}${Math.abs(n) === 1 ? '' : 's'}`;

/** Short human form of when this next falls due. */
export const dueLabel = ({ state, daysUntilDue }) => {
  if (state === 'never') return 'never simulated';
  if (daysUntilDue < 0) return `${plural(-daysUntilDue, 'day')} overdue`;
  if (daysUntilDue === 0) return 'due today';
  return `due in ${plural(daysUntilDue, 'day')}`;
};

export const rehearsalChip = (standing) => {
  const [label, tone] = STATE[standing.state];
  const text = standing.state === 'due' && standing.daysUntilDue < 0
    ? `${-standing.daysUntilDue}d overdue`
    : label;
  return html`<span
    class="inline-flex w-fit shrink-0 items-center gap-1 rounded-md border px-2 py-0.5 font-display text-[0.68rem] font-semibold tracking-[0.06em] whitespace-nowrap uppercase ${tone}"
    >${text}</span
  >`;
};

/**
 * The strip on a procedure page: where you stand, and the way back in.
 */
export const rehearsalStrip = (procedure, standing, rehearseHref) => html`
  <section
    class="mb-4 flex flex-wrap items-center gap-x-4 gap-y-3 rounded-xl border border-border bg-card px-4 py-3 shadow-xs"
  >
    <div class="flex min-w-0 flex-1 flex-col gap-1.5">
      <div class="flex flex-wrap items-center gap-2">
        ${rehearsalChip(standing)}
        <span class="font-display text-[0.8rem] font-semibold tracking-tight text-muted-foreground">
          Mental Simulation
        </span>
      </div>
      <p class="text-[0.83rem] leading-relaxed text-muted-foreground">
        ${standing.state === 'never'
          ? html`Talk it through once and the app will keep it on a
              <span class="tabular">${standing.interval}</span>-day cycle.`
          : html`Last passed
              <span class="font-medium text-foreground"
                >${standing.lastPassed.toLocaleDateString()}</span
              >
              at <span class="font-medium tabular text-foreground">${standing.lastScore}</span>,
              ${dueLabel(standing)} · every
              <span class="tabular">${standing.interval}</span> days`}
      </p>
    </div>
    <a
      class="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-lg bg-primary px-3.5 font-display text-[0.83rem] font-semibold text-primary-foreground shadow-xs transition-colors hover:bg-primary/90"
      href="${rehearseHref}"
      >${icon('mic', { size: 15 })} ${standing.state === 'never' ? 'Run it' : 'Run it again'}</a
    >
  </section>
`;

/** Compact summary for the home band: how many need attention. */
export const dueSummary = (due, total) =>
  when(
    total > 0,
    html`<span
      class="font-display text-[0.72rem] font-semibold tracking-[0.06em] uppercase ${due
        ? 'text-halo'
        : 'text-verified'}"
      >${due ? html`<span class="tabular">${due}</span> due now` : 'all simulated'}</span
    >`,
  );
