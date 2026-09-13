/**
 * Tickable list. Gathering equipment and working through steps are the same
 * interaction, so they share one component and one storage shape.
 *
 * Built as a shadcn Card with a Checkbox-style control per row: the whole row
 * is the hit target, because this gets tapped with gloves on.
 */

import { html, when } from '../lib/dom.js';
import { progress, ticked } from '../lib/checklist.js';
import { icon } from './icons.js';

export const ACTION_TICK = 'tick';
export const ACTION_RESET = 'reset-list';

/**
 * @param {Object} options
 * @param {string} options.procedureId
 * @param {string} options.list Storage key within the procedure, e.g. 'equipment'.
 * @param {Array<{key: string, primary: string, detail?: string, note?: string, optional?: boolean}>} options.items
 * @param {boolean} [options.ordered] Number the items (steps) instead of ticking boxes only.
 */
export const tickList = ({ procedureId, list, items, ordered = false }) => {
  const done = ticked(procedureId, list);
  const { done: count, total, complete } = progress(procedureId, list, items.length);

  return html`
    <section class="overflow-hidden rounded-xl border border-border bg-card shadow-xs">
      <header
        class="flex items-center justify-between gap-3 border-b px-4 py-2.5 transition-colors ${complete
          ? 'border-verified/20 bg-verified/10'
          : 'border-border bg-muted/50'}"
      >
        <p class="flex items-center gap-2 font-display text-[0.82rem] font-semibold tracking-tight ${complete
          ? 'text-verified'
          : 'text-muted-foreground'}">
          ${when(complete, icon('check', { size: 15 }))}
          <span class="tabular">${count} of ${total}</span> ${complete ? 'complete' : 'ticked'}
        </p>
        <button
          class="inline-flex h-7 items-center gap-1.5 rounded-md px-2 text-[0.78rem] font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-secondary-foreground"
          type="button"
          data-action="${ACTION_RESET}"
          data-list="${list}"
        >
          ${icon('reset', { size: 14 })} Reset
        </button>
      </header>

      <ol class="divide-y divide-border">
        ${items.map((item, index) => {
          const isDone = done.has(item.key);
          return html`
            <li>
              <button
                class="flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-accent/40 ${isDone
                  ? 'bg-muted/40'
                  : ''}"
                type="button"
                role="checkbox"
                aria-checked="${isDone ? 'true' : 'false'}"
                data-action="${ACTION_TICK}"
                data-list="${list}"
                data-key="${item.key}"
              >
                <span class="flex shrink-0 items-center gap-2 pt-0.5">
                  ${when(
                    ordered,
                    html`<span
                      class="grid size-5 shrink-0 place-items-center rounded-md font-display text-[0.7rem] font-bold tabular transition-colors ${isDone
                        ? 'bg-primary/10 text-primary/60'
                        : 'bg-secondary text-secondary-foreground'}"
                      >${index + 1}</span
                    >`,
                  )}
                  <span
                    class="grid size-5 shrink-0 place-items-center rounded-[5px] border shadow-xs transition-colors ${isDone
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-input bg-background text-transparent'}"
                    >${icon('check', { size: 13 })}</span
                  >
                </span>

                <span class="flex min-w-0 flex-col gap-1">
                  <span
                    class="text-[0.92rem] leading-relaxed font-medium transition-colors ${isDone
                      ? 'text-muted-foreground line-through decoration-muted-foreground/40'
                      : 'text-card-foreground'}"
                  >
                    ${item.primary}
                    ${when(
                      item.optional,
                      html`<span
                        class="ml-1.5 inline-flex items-center rounded border border-border bg-secondary px-1.5 py-px align-middle font-display text-[0.62rem] font-semibold tracking-wide text-secondary-foreground uppercase"
                        >optional</span
                      >`,
                    )}
                  </span>
                  ${when(
                    item.detail,
                    html`<span class="text-[0.83rem] leading-relaxed text-muted-foreground">${item.detail}</span>`,
                  )}
                  ${when(
                    item.note,
                    html`<span
                      class="mt-0.5 flex items-start gap-1.5 rounded-lg border border-caution/20 bg-caution/10 px-2.5 py-1.5 text-[0.82rem] leading-relaxed font-medium text-caution"
                      >${icon('warning', { size: 14, className: 'mt-0.5' })}
                      <span>${item.note}</span></span
                    >`,
                  )}
                </span>
              </button>
            </li>
          `;
        })}
      </ol>
    </section>
  `;
};
