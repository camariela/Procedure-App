/**
 * The four panels of a procedure, declared in one place.
 *
 * The procedure view renders whichever section is active without knowing what
 * any of them contain, so adding or reordering a panel is a change here only.
 *
 * Callouts follow shadcn's Alert: one recipe, a tone per meaning. The tones are
 * not decoration — indications, absolute and relative contraindications and
 * complications are four different weights of "stop and think", and reading
 * them apart at a glance is the point.
 */

import { html, when } from '../lib/dom.js';
import { tickList } from './checklist.js';
import { videoPanel } from './video.js';
import { icon } from './icons.js';

const TONES = {
  indication: 'border-routine/25 bg-routine/8 text-routine',
  absolute: 'border-destructive/30 bg-destructive/10 text-destructive',
  relative: 'border-urgent/25 bg-urgent/10 text-urgent',
  complication: 'border-complication/25 bg-complication/8 text-complication',
  pearl: 'border-info/25 bg-info/8 text-info',
};

/** Alert-style callout. The tone colours the frame, the title and the markers. */
const callout = (tone, title, items, iconName) => html`
  <section class="rounded-xl border px-4 py-3.5 ${TONES[tone]}">
    <h3 class="flex items-center gap-1.5 font-display text-[0.76rem] font-bold tracking-[0.08em] uppercase">
      ${when(iconName, icon(iconName, { size: 15 }))} ${title}
    </h3>
    <ul class="mt-2.5 grid gap-1.5">
      ${items.map(
        (item) => html`<li class="flex gap-2.5 text-[0.89rem] leading-relaxed text-foreground/85">
          <span class="mt-[0.5em] size-1.5 shrink-0 rounded-full bg-current opacity-45"></span>
          <span>${item}</span>
        </li>`,
      )}
    </ul>
  </section>
`;

const equipmentPanel = (procedure) =>
  tickList({
    procedureId: procedure.id,
    list: 'equipment',
    items: procedure.equipment.map((entry) => ({
      key: entry.item,
      primary: entry.item,
      detail: entry.detail,
      optional: entry.optional,
    })),
  });

const stepsPanel = (procedure) => html`
  <div class="grid gap-4">
    <p class="text-[0.85rem] leading-relaxed text-muted-foreground">
      The video demonstrates the anatomy; this is the sequence in text. Tick each step as it is
      completed.
    </p>
    ${tickList({
      procedureId: procedure.id,
      list: 'steps',
      ordered: true,
      items: procedure.steps.map((step, index) => ({
        key: String(index),
        primary: step.text,
        note: step.caution,
      })),
    })}
    ${when(procedure.pearls.length, callout('pearl', 'Pearls', procedure.pearls))}
  </div>
`;

const safetyPanel = (procedure) => {
  const { absolute = [], relative = [] } = procedure.contraindications;
  return html`
    <div class="grid gap-3">
      ${callout('indication', 'Indications', procedure.indications)}
      ${when(
        absolute.length,
        callout('absolute', 'Absolute contraindications', absolute, 'warning'),
      )}
      ${when(relative.length, callout('relative', 'Relative contraindications', relative))}
      ${when(
        procedure.complications.length,
        callout('complication', 'Complications', procedure.complications),
      )}
    </div>
  `;
};

/**
 * Ordered; the first entry is the default panel. `tone` colours the tab's icon
 * so the four panels are told apart by colour as well as by label — the Safety
 * tab being the red one is worth something at three in the morning.
 */
export const SECTIONS = [
  { id: 'video', label: 'Video', icon: 'play', tone: 'text-primary', render: videoPanel },
  { id: 'equipment', label: 'Equipment', icon: 'kit', tone: 'text-info', render: equipmentPanel },
  { id: 'steps', label: 'Technique', icon: 'book', tone: 'text-routine', render: stepsPanel },
  {
    id: 'safety',
    label: 'Indications / Contraindications',
    icon: 'warning',
    tone: 'text-destructive',
    render: safetyPanel,
  },
];

/*
 * The ids are the URL (`?section=technique` would break every link already
 * shared), so labels change here and ids do not.
 */

export const sectionById = (id) => SECTIONS.find((section) => section.id === id) ?? SECTIONS[0];
