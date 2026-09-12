/**
 * Tickable list. Equipment gathering and step completion are the same
 * interaction, so they share one component and one storage shape.
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
    <div class="ticklist ${complete ? 'is-complete' : ''}">
      <div class="ticklist__head">
        <p class="ticklist__count">
          ${count} of ${total} ${complete ? 'complete' : 'ticked'}
        </p>
        <button class="button button--ghost" type="button" data-action="${ACTION_RESET}" data-list="${list}">
          ${icon('reset', { size: 16 })} Reset
        </button>
      </div>
      <ol class="ticklist__items ${ordered ? 'ticklist__items--ordered' : ''}">
        ${items.map((item, index) => {
          const isDone = done.has(item.key);
          return html`
            <li class="ticklist__item ${isDone ? 'is-done' : ''}">
              <button
                class="ticklist__button"
                type="button"
                role="checkbox"
                aria-checked="${isDone ? 'true' : 'false'}"
                data-action="${ACTION_TICK}"
                data-list="${list}"
                data-key="${item.key}"
              >
                <span class="ticklist__marker">
                  ${ordered ? html`<span class="ticklist__number">${index + 1}</span>` : ''}
                  <span class="ticklist__box">${icon('check', { size: 16 })}</span>
                </span>
                <span class="ticklist__body">
                  <span class="ticklist__primary">
                    ${item.primary}
                    ${when(item.optional, html`<span class="tag">optional</span>`)}
                  </span>
                  ${when(item.detail, html`<span class="ticklist__detail">${item.detail}</span>`)}
                  ${when(
                    item.note,
                    html`<span class="ticklist__note">${icon('warning', { size: 15 })} ${item.note}</span>`,
                  )}
                </span>
              </button>
            </li>
          `;
        })}
      </ol>
    </div>
  `;
};
