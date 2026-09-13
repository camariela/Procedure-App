/**
 * Status badges, on shadcn's Badge anatomy: one base recipe, a variant map for
 * the parts that differ. Acuity and review state are shown the same way
 * everywhere, so they live here rather than in each view.
 */

import { html } from '../lib/dom.js';

const BASE =
  'inline-flex w-fit shrink-0 items-center gap-1 rounded-md border px-2 py-0.5 font-display text-[0.68rem] font-semibold tracking-[0.06em] whitespace-nowrap uppercase';

const badge = (variant, label) => html`<span class="${BASE} ${variant}">${label}</span>`;

const ACUITY = {
  emergent: ['Emergent', 'border-emergent/25 bg-emergent/10 text-emergent'],
  urgent: ['Urgent', 'border-urgent/25 bg-urgent/10 text-urgent'],
  routine: ['Routine', 'border-routine/25 bg-routine/10 text-routine'],
};

export const acuityBadge = (acuity) => {
  const [label, variant] = ACUITY[acuity] ?? [acuity, 'border-border bg-muted text-muted-foreground'];
  return badge(variant, label);
};

/**
 * Every procedure ships unreviewed. Flip `verified: true` in the data file once
 * a clinician has checked the content and this disappears.
 */
export const reviewBadge = (verified) =>
  verified
    ? badge('border-verified/25 bg-verified/10 text-verified', 'Clinically reviewed')
    : badge('border-draft/20 bg-draft/10 text-draft', 'Draft · not reviewed');

/**
 * High acuity, low occurrence. Solid rather than tinted — it is the one badge
 * that should win the row it sits in. The other two frequencies are the normal
 * case and do not need calling out.
 */
export const haloBadge = (frequency) =>
  frequency === 'halo'
    ? html`<span
        class="${BASE} border-transparent bg-halo text-halo-foreground shadow-xs"
        title="High acuity, low occurrence"
        >Halo</span
      >`
    : '';

/**
 * Video provenance, on the same honesty footing as the clinical draft badge:
 * a sourced video is not a checked one until somebody has watched it.
 */
export const videoBadge = ({ placeholder, checked }) => {
  if (placeholder) return badge('border-urgent/25 bg-urgent/10 text-urgent', 'No video sourced yet');
  return checked
    ? badge('border-verified/25 bg-verified/10 text-verified', 'Video checked')
    : badge('border-draft/20 bg-draft/10 text-draft', 'Source unverified');
};
