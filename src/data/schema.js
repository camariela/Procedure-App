/**
 * The shape every procedure record follows.
 *
 * @typedef {Object} Procedure
 * @property {string}   id              URL-safe slug, unique across the catalogue.
 * @property {string}   name            Display name.
 * @property {string[]} [aka]           Alternative names, used by search.
 * @property {'emergent'|'urgent'|'routine'} acuity
 * @property {string}   summary         One line: what this is and when it is reached for.
 * @property {{id: string, title: string, checked?: boolean}} [video]
 *                                  Video source; defaults to the shared placeholder.
 * @property {Array<{item: string, detail?: string, optional?: boolean}>} equipment
 * @property {string[]} indications
 * @property {{absolute?: string[], relative?: string[]}} [contraindications]
 * @property {Array<{text: string, caution?: string}>} steps
 * @property {string[]} [pearls]
 * @property {string[]} [complications]
 * @property {boolean}  [verified]      Set true once a clinician has reviewed the content.
 *
 * Adding a procedure: append a record to the relevant file in ./procedures/ and
 * it appears in navigation, search and the offline cache automatically.
 */

import { PLACEHOLDER_VIDEO } from './config.js';

const REQUIRED = ['id', 'name', 'acuity', 'summary', 'equipment', 'indications', 'steps'];

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
    const video = { checked: false, ...(procedure.video ?? PLACEHOLDER_VIDEO) };
    return { ...DEFAULTS, ...procedure, video, systemId };
  });
