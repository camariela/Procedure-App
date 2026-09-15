/**
 * Tiny scored substring search. No index build step, no dependency — the
 * catalogue is small enough that a linear scan is instant, and staying linear
 * means adding a procedure needs no reindexing.
 */

const normalize = (value) => String(value ?? '').toLowerCase().trim();

/** Flatten the fields worth matching on into one haystack string. */
export const haystack = (procedure) =>
  normalize(
    [
      procedure.name,
      ...(procedure.aka ?? []),
      procedure.systemName,
      ...(procedure.indications ?? []),
    ].join(' | '),
  );

/** Higher is better; 0 means no match. */
const score = (procedure, term) => {
  const name = normalize(procedure.name);
  if (name === term) return 100;
  if (name.startsWith(term)) return 80;
  if ((procedure.aka ?? []).some((alias) => normalize(alias).startsWith(term))) return 70;
  if (name.includes(term)) return 60;
  return procedure.haystack.includes(term) ? 30 : 0;
};

/**
 * Rank procedures against a query. Multi-word queries require every word to
 * match somewhere, so "chest tube" narrows rather than widens.
 */
export const search = (procedures, query) => {
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  if (!terms.length) return [];

  return procedures
    .map((procedure) => {
      const scores = terms.map((term) => score(procedure, term));
      return scores.every(Boolean)
        ? { procedure, score: scores.reduce((a, b) => a + b, 0) }
        : null;
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score || a.procedure.name.localeCompare(b.procedure.name))
    .map((hit) => hit.procedure);
};
