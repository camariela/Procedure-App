/**
 * Rehearsal scheduling for the HALO set.
 *
 * Procedural skill decays with disuse, and the procedures you most need to be
 * good at are the ones you do least — so the interval expands only as long as
 * you keep passing, and collapses the moment you do not.
 *
 * The ladder below is a reasonable reading of the skill-decay literature
 * (measurable decay in resuscitation procedural skills within 3-6 months of no
 * practice, which is why retraining has moved towards low-dose, high-frequency).
 * It is a default, not a guideline: change LADDER and every schedule follows.
 */

import { read, write, remove } from './storage.js';

const KEY = 'rehearsal';
const DAY = 86_400_000;

/** Days until the next rehearsal, by how many consecutive passes you have. */
export const LADDER = [30, 60, 90, 180];

/** Inside this window the app starts nudging rather than waiting for the date. */
const SOON_DAYS = 7;

const all = () => read(KEY, {}) ?? {};

const startOfDay = (date) => {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy;
};

/** Interval earned by `passes` consecutive passes. One pass buys the first rung. */
export const intervalFor = (passes) =>
  LADDER[Math.min(Math.max(passes - 1, 0), LADDER.length - 1)];

/**
 * @typedef {Object} Standing
 * @property {'never'|'due'|'soon'|'fresh'} state
 * @property {number|null} daysUntilDue  Negative once overdue.
 * @property {Date|null}   due
 * @property {Date|null}   lastPassed
 * @property {number}      passes        Consecutive passes, capped by LADDER.
 * @property {number}      interval      Days currently between rehearsals.
 * @property {number|null} lastScore
 * @property {number}      attempts
 */

/** @returns {Standing} */
export const standing = (procedureId, now = new Date()) => {
  const record = all()[procedureId];
  const passes = record?.passes ?? 0;
  const interval = intervalFor(passes);
  const base = {
    passes,
    interval,
    lastScore: record?.lastScore ?? null,
    attempts: record?.attempts ?? 0,
    lastPassed: record?.last ? new Date(record.last) : null,
  };

  if (!record?.last) return { ...base, state: 'never', due: null, daysUntilDue: null };

  // A failed run-through is due again immediately, whatever the calendar says —
  // the last thing you did was get it wrong.
  if (record.lastResult === 'fail') {
    return { ...base, state: 'due', due: startOfDay(now), daysUntilDue: 0 };
  }

  const due = new Date(startOfDay(new Date(record.last)).getTime() + interval * DAY);
  const daysUntilDue = Math.round((startOfDay(due) - startOfDay(now)) / DAY);
  const state = daysUntilDue <= 0 ? 'due' : daysUntilDue <= SOON_DAYS ? 'soon' : 'fresh';
  return { ...base, due, daysUntilDue, state };
};

/**
 * Record an attempt. A pass advances the ladder and resets the clock; a fail
 * banks the score but leaves the procedure due, because the answer to a failed
 * run-through is another run-through, not another month.
 */
export const recordAttempt = (procedureId, { score, pass, transcript = '' }, now = new Date()) => {
  const store = all();
  const previous = store[procedureId] ?? {};
  store[procedureId] = {
    ...previous,
    last: pass ? now.toISOString() : previous.last ?? null,
    lastResult: pass ? 'pass' : 'fail',
    passes: pass ? Math.min((previous.passes ?? 0) + 1, LADDER.length) : 0,
    lastScore: score,
    lastAttempt: now.toISOString(),
    attempts: (previous.attempts ?? 0) + 1,
    transcript: transcript.slice(0, 4000),
  };
  write(KEY, store);
  return standing(procedureId, now);
};

export const lastTranscript = (procedureId) => all()[procedureId]?.transcript ?? '';

export const forget = (procedureId) => {
  const store = all();
  delete store[procedureId];
  Object.keys(store).length ? write(KEY, store) : remove(KEY);
};

/** Everything needing attention, worst first. Drives the home band and the badge. */
export const dueList = (procedures, now = new Date()) =>
  procedures
    .map((procedure) => ({ procedure, standing: standing(procedure.id, now) }))
    .filter((entry) => entry.standing.state === 'never' || entry.standing.state === 'due')
    .sort((a, b) => (a.standing.daysUntilDue ?? -9999) - (b.standing.daysUntilDue ?? -9999));
