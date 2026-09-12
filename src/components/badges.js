/**
 * Status badges. Acuity and review state are shown the same way everywhere, so
 * they live here rather than in each view.
 */

import { html, when } from '../lib/dom.js';

const ACUITY_LABEL = {
  emergent: 'Emergent',
  urgent: 'Urgent',
  routine: 'Routine',
};

export const acuityBadge = (acuity) =>
  html`<span class="badge badge--${acuity}">${ACUITY_LABEL[acuity] ?? acuity}</span>`;

/**
 * Every procedure ships unreviewed. Flip `verified: true` in the data file once
 * a clinician has checked the content and this disappears.
 */
export const reviewBadge = (verified) =>
  verified
    ? html`<span class="badge badge--verified">Clinically reviewed</span>`
    : html`<span class="badge badge--draft">Draft &middot; not clinically reviewed</span>`;

export const placeholderBadge = (isPlaceholder) =>
  when(isPlaceholder, html`<span class="badge badge--placeholder">Placeholder video</span>`);
