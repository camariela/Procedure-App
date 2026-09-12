/**
 * Checklist state for equipment and steps.
 *
 * One record per procedure, keyed `checklist:<procedureId>`, holding the set of
 * ticked item keys per list. Views read a lookup and call toggle/reset; nothing
 * else in the app touches storage for this.
 */

import { read, write, remove } from './storage.js';

const keyFor = (procedureId) => `checklist:${procedureId}`;

const load = (procedureId) => read(keyFor(procedureId), {}) ?? {};

/** @returns {Set<string>} ticked item keys for one list of one procedure. */
export const ticked = (procedureId, list) => new Set(load(procedureId)[list] ?? []);

export const toggle = (procedureId, list, item) => {
  const record = load(procedureId);
  const items = new Set(record[list] ?? []);
  if (!items.delete(item)) items.add(item);
  write(keyFor(procedureId), { ...record, [list]: [...items] });
  return items;
};

/** Clear one list, or the whole procedure when `list` is omitted. */
export const reset = (procedureId, list) => {
  if (!list) return remove(keyFor(procedureId));
  const record = load(procedureId);
  delete record[list];
  write(keyFor(procedureId), record);
};

export const progress = (procedureId, list, total) => {
  const done = Math.min(ticked(procedureId, list).size, total);
  return { done, total, complete: total > 0 && done === total };
};
