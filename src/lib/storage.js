/**
 * Namespaced JSON storage. Every read and write is guarded so the app still
 * works in private windows or wherever storage is blocked.
 */

const PREFIX = 'emproc:';

const backing = (() => {
  try {
    const probe = `${PREFIX}probe`;
    localStorage.setItem(probe, '1');
    localStorage.removeItem(probe);
    return localStorage;
  } catch {
    return null;
  }
})();

export const read = (key, fallback = null) => {
  if (!backing) return fallback;
  try {
    const value = backing.getItem(PREFIX + key);
    return value === null ? fallback : JSON.parse(value);
  } catch {
    return fallback;
  }
};

export const write = (key, value) => {
  if (!backing) return false;
  try {
    backing.setItem(PREFIX + key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
};

export const remove = (key) => {
  if (!backing) return;
  try {
    backing.removeItem(PREFIX + key);
  } catch {
    /* ignore */
  }
};
