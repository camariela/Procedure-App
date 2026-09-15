/**
 * Scoring a spoken (or typed) run-through of a procedure against its steps.
 *
 * Deliberately a local, explainable algorithm rather than a model call: the app
 * has no backend, has to work on aeroplane mode, and — more importantly — a
 * clinician deserves to see exactly why a step was marked missed. Every match
 * is reported with the words that earned it.
 *
 * Two things are measured, because they fail differently:
 *   coverage — did every step get said at all (the dangerous failure)
 *   order    — were the ones that were said in the right sequence
 */

const STOPWORDS = new Set(
  `the a an and or but if then than that this these those there here of in on at to into onto from
   by for with without within over under up down out off is are was were be been being do does did
   doing done have has had having it its as so such not no nor too very can could should would will
   shall may might must you your yours we our us they them their he she his her i me my
   about after again all also any because before between both during each few first from further
   how just like more most much only other same some still through until upon what when where which
   while who whom why your` .split(/\s+/),
);

const NUMBER_WORDS = {
  zero: '0', one: '1', two: '2', three: '3', four: '4', five: '5', six: '6', seven: '7',
  eight: '8', nine: '9', ten: '10', eleven: '11', twelve: '12', thirteen: '13', fourteen: '14',
  fifteen: '15', sixteen: '16', seventeen: '17', eighteen: '18', nineteen: '19', twenty: '20',
  thirty: '30', forty: '40', fifty: '50', sixty: '60', seventy: '70', eighty: '80', ninety: '90',
  hundred: '100',
};

/** Crude but predictable: enough to make "bleeding" and "bleeds" the same word. */
const stem = (word) =>
  word
    .replace(/ies$/, 'y')
    .replace(/(sses|shes|ches|xes)$/, (m) => m.slice(0, -2))
    .replace(/([^aeious])s$/, '$1')
    .replace(/(ing|ed)$/, '');

/** Spoken numbers arrive as words about half the time; clinical numbers matter. */
const normalize = (text) =>
  String(text ?? '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .split(' ')
    .map((word) => NUMBER_WORDS[word] ?? word)
    .filter(Boolean);

/** Content words worth matching on: no stopwords, no one-letter noise. */
export const terms = (text) => {
  const out = [];
  for (const word of normalize(text)) {
    if (STOPWORDS.has(word)) continue;
    if (word.length < 3 && !/\d/.test(word)) continue;
    const key = /\d/.test(word) ? word : stem(word);
    if (!out.includes(key)) out.push(key);
  }
  return out;
};

/**
 * Terms that appear in most of a procedure's steps say nothing about which step
 * was recalled, so they are dropped from matching. Self-tuning, which beats
 * maintaining a list of medical filler words by hand.
 */
const distinctiveTerms = (steps) => {
  const perStep = steps.map((step) => terms(step.text));
  if (steps.length < 4) return perStep;
  const limit = steps.length * 0.5;
  const frequency = new Map();
  for (const list of perStep) {
    for (const term of list) frequency.set(term, (frequency.get(term) ?? 0) + 1);
  }
  return perStep.map((list, i) => {
    const kept = list.filter((term) => frequency.get(term) < limit);
    return kept.length ? kept : perStep[i];
  });
};

/** A step counts as recalled on 40% of its distinctive terms, minimum two. */
const THRESHOLD = 0.4;
const MIN_HITS = 2;

const median = (values) => {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = sorted.length >> 1;
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
};

/** Longest run of matched steps that came out in the right order. */
const longestOrderedRun = (positions) => {
  const tails = [];
  for (const value of positions) {
    let lo = 0;
    let hi = tails.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (tails[mid] <= value) lo = mid + 1;
      else hi = mid;
    }
    tails[lo] = value;
  }
  return tails.length;
};

export const PASS_MARK = 80;

/**
 * @param {Array<{text: string, caution?: string}>} steps
 * @param {string} transcript What the clinician actually said.
 */
export const scoreRecall = (steps, transcript) => {
  const spoken = normalize(transcript).map((word) => (/\d/.test(word) ? word : stem(word)));
  const spokenAt = new Map();
  spoken.forEach((word, index) => {
    if (!spokenAt.has(word)) spokenAt.set(word, index);
  });

  const wanted = distinctiveTerms(steps);
  const results = steps.map((step, index) => {
    const list = wanted[index];
    const hit = list.filter((term) => spokenAt.has(term));
    const need = Math.max(MIN_HITS, Math.ceil(list.length * THRESHOLD));
    const matched = hit.length >= Math.min(need, list.length);
    return {
      index,
      text: step.text,
      caution: step.caution,
      matched,
      hit,
      missed: list.filter((term) => !spokenAt.has(term)),
      // Where in the run-through this step was reached. The median of its hits,
      // not the earliest: one shared word said early should not drag a whole
      // step backwards and make a faithful recitation look out of order.
      at: matched ? median(hit.map((term) => spokenAt.get(term))) : null,
    };
  });

  const matched = results.filter((step) => step.matched);
  const coverage = steps.length ? matched.length / steps.length : 0;
  const ordered = matched.length
    ? longestOrderedRun(matched.map((step) => step.at)) / matched.length
    : 0;

  // Coverage carries more weight than sequence: a step you never said is a step
  // you would not have done.
  const score = Math.round(100 * (0.7 * coverage + 0.3 * ordered));
  const missedCritical = results.filter((step) => !step.matched && step.caution).length;

  return {
    score,
    coverage,
    order: ordered,
    total: steps.length,
    matched: matched.length,
    missedCritical,
    steps: results,
    // Missing a step that carries a caution fails the attempt whatever the sum.
    pass: score >= PASS_MARK && missedCritical === 0,
    spokenWords: spoken.length,
  };
};
