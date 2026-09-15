/**
 * The shape every procedure record follows.
 *
 * @typedef {Object} Procedure
 * @property {string}   id              URL-safe slug, unique across the catalogue.
 * @property {string}   name            Display name.
 * @property {string[]} [aka]           Alternative names, used by search.
 * @property {'emergent'|'urgent'|'routine'} acuity
 * @property {'halo'|'occasional'|'frequent'} frequency
 *                                  How often one clinician actually does this. HALO —
 *                                  high acuity, low occurrence — is the rehearsal set:
 *                                  rare enough to forget, unforgiving enough to matter.
 * @property {string}   summary         One line: what this is and when it is reached for.
 * @property {{id: string, title: string, checked?: boolean}} [video]
 *                                  Video source; defaults to the shared placeholder.
 * @property {Array<{item: string, detail?: string, optional?: boolean}>} equipment
 * @property {string[]} indications
 * @property {{absolute?: string[], relative?: string[]}} [contraindications]
 * @property {Array<{action?: string, text: string, caution?: string}>} steps
 *                                  `action` is the imperative headline shown in the
 *                                  list; `text` is the full instruction, folded away
 *                                  beneath it. A step with no `action` shows its
 *                                  `text` as the headline instead.
 * @property {string[]} [pearls]
 * @property {string[]} [complications]
 * @property {boolean}  [verified]      Set true once a clinician has reviewed the content.
 *
 * Adding a procedure: append a record to the relevant file in ./procedures/ and
 * it appears in navigation, search and the offline cache automatically.
 */

import { PLACEHOLDER_VIDEO } from './config.js';

const REQUIRED = ['id', 'name', 'acuity', 'frequency', 'summary', 'equipment', 'indications', 'steps'];

const FREQUENCIES = ['halo', 'occasional', 'frequent'];

const DEFAULTS = {
  aka: [],
  contraindications: {},
  pearls: [],
  complications: [],
  verified: false,
};

/**
 * Stamp a system's procedures with their system id and fail loudly on a
 * malformed record, so a typo surfaces at load instead of as a blank screen.
 */
export const defineProcedures = (systemId, procedures) =>
  procedures.map((procedure) => {
    const missing = REQUIRED.filter((field) => procedure[field] === undefined);
    if (missing.length) {
      throw new Error(`Procedure "${procedure.id ?? '?'}" is missing: ${missing.join(', ')}`);
    }
    if (!FREQUENCIES.includes(procedure.frequency)) {
      throw new Error(
        `Procedure "${procedure.id}" has frequency "${procedure.frequency}"; expected one of ${FREQUENCIES.join(', ')}`,
      );
    }
    const video = { checked: false, ...(procedure.video ?? PLACEHOLDER_VIDEO) };
    return { ...DEFAULTS, ...procedure, video, systemId };
  });
