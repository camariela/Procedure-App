/**
 * Tickable list. Gathering equipment and working through a technique are the
 * same interaction, so they share one component and one storage shape.
 *
 * Steps are read under pressure, so each row leads with a short imperative and
 * keeps the full clinical sentence folded away beneath it. The step you are on
 * — the first one not yet ticked — is unfolded automatically, so working down
 * the list needs no taps beyond ticking. Cautions are never folded.
 */

import { html, when } from '../lib/dom.js';
import { progress, ticked } from '../lib/checklist.js';
import { icon } from './icons.js';

export const ACTION_TICK = 'tick';
export const ACTION_RESET = 'reset-list';
export const ACTION_DETAIL = 'toggle-detail';

/** Rows the reader has opened by hand. Module state, so a re-render keeps them. */
const opened = new Set();
const rowKey = (procedureId, list, key) => `${procedureId}:${list}:${key}`;

export const toggleDetail = (procedureId, list, key) => {
  const id = rowKey(procedureId, list, key);
  if (!opened.delete(id)) opened.add(id);
};

/**
 * @param {Object} options
 * @param {string} options.procedureId
 * @param {string} options.list Storage key within the procedure, e.g. 'equipment'.
 * @param {Array<{key: string, primary: string, detail?: string, body?: string, note?: string, optional?: boolean}>} options.items
 *   `primary` is the headline. `detail` sits under it and always shows;
 *   `body` folds away; `note` is a caution and always shows.
 * @param {boolean} [options.ordered] Number the items instead of ticking boxes only.
 */
export const tickList = ({ procedureId, list, items, ordered = false }) => {
  const done = ticked(procedureId, list);
  const { done: count, total, complete } = progress(procedureId, list, items.length);
  const current = items.findIndex((item) => !done.has(item.key));

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
          // The step you are on opens itself; anything else opens on request.
          const open = Boolean(item.body) && (index === current || opened.has(rowKey(procedureId, list, item.key)));
          return html`
            <li class="transition-colors ${isDone ? 'bg-muted/40' : ''}">
              <div class="flex items-stretch">
                <button
                  class="flex flex-1 items-center gap-3 py-3 pr-2 pl-4 text-left transition-colors hover:bg-accent/40"
                  type="button"
                  role="checkbox"
                  aria-checked="${isDone ? 'true' : 'false'}"
                  data-action="${ACTION_TICK}"
                  data-list="${list}"
                  data-key="${item.key}"
                >
                  <span class="flex shrink-0 items-center gap-2">
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

                  <span class="flex min-w-0 flex-1 flex-col gap-0.5">
                    <span
                      class="text-[0.95rem] leading-snug font-semibold transition-colors ${isDone
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
                      html`<span class="text-[0.83rem] leading-relaxed font-normal text-muted-foreground">
                        ${item.detail}
                      </span>`,
                    )}
                  </span>
                </button>

                ${when(
                  item.body,
                  html`<button
                    class="grid w-11 shrink-0 place-items-center text-muted-foreground transition-colors hover:bg-accent/40 hover:text-foreground"
                    type="button"
                    aria-expanded="${open ? 'true' : 'false'}"
                    aria-label="${open ? 'Hide detail' : 'Show detail'}"
                    data-action="${ACTION_DETAIL}"
                    data-list="${list}"
                    data-key="${item.key}"
                  >
                    <span class="transition-transform ${open ? 'rotate-180' : ''}">
                      ${icon('chevron', { size: 18 })}
                    </span>
                  </button>`,
                )}
              </div>

              ${when(
                open || item.note,
                html`<div class="flex flex-col gap-2 pr-4 pb-3 ${ordered ? 'pl-15' : 'pl-12'}">
                  ${when(
                    open,
                    html`<p class="text-[0.87rem] leading-relaxed text-muted-foreground">${item.body}</p>`,
                  )}
                  ${when(
                    item.note,
                    html`<p
                      class="flex items-start gap-1.5 rounded-lg border border-caution/20 bg-caution/10 px-2.5 py-1.5 text-[0.82rem] leading-relaxed font-medium text-caution"
                    >
                      ${icon('warning', { size: 14, className: 'mt-0.5' })}
                      <span>${item.note}</span>
                    </p>`,
                  )}
                </div>`,
              )}
            </li>
          `;
        })}
      </ol>
    </section>
  `;
};
