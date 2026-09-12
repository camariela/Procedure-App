/**
 * Catalogue assembly. This is the only module that knows every data file
 * exists; everything else asks this one for procedures.
 *
 * To add a system: create ./procedures/<id>.js, add the entry to ./systems.js,
 * and import it below.
 */

import { SYSTEMS, systemById } from './systems.js';
import { haystack } from '../lib/search.js';

import abdominal from './procedures/abdominal.js';
import airway from './procedures/airway.js';
import analgesia from './procedures/analgesia.js';
import cardiovascular from './procedures/cardiovascular.js';
import genitourinary from './procedures/genitourinary.js';
import heent from './procedures/heent.js';
import musculoskeletal from './procedures/musculoskeletal.js';
import neurologic from './procedures/neurologic.js';
import softTissue from './procedures/soft-tissue.js';
import thoracic from './procedures/thoracic.js';
import vascularAccess from './procedures/vascular-access.js';

const RAW_PROCEDURES = [
  ...abdominal,
  ...airway,
  ...analgesia,
  ...cardiovascular,
  ...genitourinary,
  ...heent,
  ...musculoskeletal,
  ...neurologic,
  ...softTissue,
  ...thoracic,
  ...vascularAccess,
];

/** Decorate each record with its system name and a precomputed search haystack. */
export const PROCEDURES = RAW_PROCEDURES.map((procedure) => {
  const system = systemById.get(procedure.systemId);
  if (!system) throw new Error(`Unknown system "${procedure.systemId}" on "${procedure.id}"`);
  const decorated = { ...procedure, systemName: system.name };
  return { ...decorated, haystack: haystack(decorated) };
}).sort((a, b) => a.name.localeCompare(b.name));

const duplicate = PROCEDURES.map((p) => p.id).find((id, i, ids) => ids.indexOf(id) !== i);
if (duplicate) throw new Error(`Duplicate procedure id: ${duplicate}`);

export const procedureById = new Map(PROCEDURES.map((procedure) => [procedure.id, procedure]));

export const proceduresBySystem = (systemId) =>
  PROCEDURES.filter((procedure) => procedure.systemId === systemId);

/** Systems in display order, each with its procedures attached. */
export const SYSTEM_INDEX = SYSTEMS.map((system) => ({
  ...system,
  procedures: proceduresBySystem(system.id),
}));

export { SYSTEMS, systemById };
