/**
 * Procedure rows, built on shadcn's Card. Shared by search results, the HALO
 * band and the system listing so the three never drift apart.
 *
 * Each row carries `data-system`, which resolves `--sys` to that system's hue;
 * the rail and the system label then color themselves without knowing which
 * system they belong to.
 *
 * `compact` drops the summary and the badges. It is for the HALO band, where
 * every row is HALO and emergent and repeating that fifteen times says
 * nothing.
 */

import { html, when } from '../lib/dom.js';
import { href } from '../lib/router.js';
import { acuityBadge, haloBadge } from './badges.js';
import { rehearsalChip } from './rehearsal-status.js';
import { standing } from '../lib/rehearsal.js';

export const procedureList = (
  procedures,
  { showSystem = false, compact = false, showStanding = false } = {},
) => html`
  <ul class="grid gap-2.5">
    ${procedures.map(
      (procedure) => html`
        <li data-system="${procedure.systemId}">
          <a
            class="group relative flex flex-col gap-1.5 overflow-hidden rounded-xl border border-border bg-card py-3.5 pr-3.5 pl-4.5 shadow-xs transition-all hover:-translate-y-px hover:border-sys/35 hover:shadow-md"
            href="${href(`/procedure/${procedure.id}`)}"
          >
            <span class="absolute inset-y-0 left-0 w-1 bg-sys/70 transition-colors group-hover:bg-sys"></span>
            <span class="flex flex-wrap items-start justify-between gap-x-3 gap-y-1.5">
              <span class="font-display text-[1.02rem] leading-snug font-semibold tracking-tight text-card-foreground">
                ${procedure.name}
              </span>
              ${when(
                !compact,
                html`<span class="flex shrink-0 flex-wrap items-center gap-1.5">
                  ${haloBadge(procedure.frequency)} ${acuityBadge(procedure.acuity)}
                </span>`,
              )}
            </span>
            ${when(
              !compact,
              html`<span class="text-[0.88rem] leading-relaxed font-medium text-muted-foreground">
                ${procedure.summary}
              </span>`,
            )}
            <span class="flex flex-wrap items-center gap-2">
              ${when(
                showSystem,
                html`<span class="font-display text-[0.7rem] font-semibold tracking-[0.08em] text-sys uppercase">
                  ${procedure.systemName}
                </span>`,
              )}
              ${showStanding && procedure.frequency === 'halo'
                ? rehearsalChip(standing(procedure.id))
                : ''}
            </span>
          </a>
        </li>
      `,
    )}
  </ul>
`;

export const emptyState = (message) => html`
  <p class="rounded-xl border border-dashed border-border bg-muted/40 px-4 py-8 text-center text-sm text-muted-foreground">
    ${message}
  </p>
`;
