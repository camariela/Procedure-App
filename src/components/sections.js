/**
 * The four panels of a procedure, declared in one place.
 *
 * The procedure view renders whichever section is active without knowing what
 * any of them contain, so adding or reordering a panel is a change here only.
 */

import { html, when } from '../lib/dom.js';
import { tickList } from './checklist.js';
import { videoPanel } from './video.js';
import { icon } from './icons.js';

const bulletList = (items, className = '') =>
  html`<ul class="bullets ${className}">
    ${items.map((item) => html`<li>${item}</li>`)}
  </ul>`;

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
  <p class="panel__lead">
    Written backup for the video. The video shows the anatomy; this is here for
    when you want the sequence in words.
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
  ${when(
    procedure.pearls.length,
    html`<section class="callout callout--pearl">
      <h3 class="callout__title">Pearls</h3>
      ${bulletList(procedure.pearls)}
    </section>`,
  )}
`;

const safetyPanel = (procedure) => {
  const { absolute = [], relative = [] } = procedure.contraindications;
  return html`
    <section class="callout callout--indication">
      <h3 class="callout__title">Indications</h3>
      ${bulletList(procedure.indications)}
    </section>
    ${when(
      absolute.length,
      html`<section class="callout callout--absolute">
        <h3 class="callout__title">${icon('warning', { size: 18 })} Absolute contraindications</h3>
        ${bulletList(absolute)}
      </section>`,
    )}
    ${when(
      relative.length,
      html`<section class="callout callout--relative">
        <h3 class="callout__title">Relative contraindications</h3>
        ${bulletList(relative)}
      </section>`,
    )}
    ${when(
      procedure.complications.length,
      html`<section class="callout callout--complication">
        <h3 class="callout__title">Complications</h3>
        ${bulletList(procedure.complications)}
      </section>`,
    )}
  `;
};

/** Ordered; the first entry is the default panel. */
export const SECTIONS = [
  { id: 'video', label: 'Video', icon: 'play', render: videoPanel },
  { id: 'equipment', label: 'Kit', icon: 'kit', render: equipmentPanel },
  { id: 'steps', label: 'Steps', icon: 'book', render: stepsPanel },
  { id: 'safety', label: 'Safety', icon: 'warning', render: safetyPanel },
];

export const sectionById = (id) => SECTIONS.find((section) => section.id === id) ?? SECTIONS[0];
