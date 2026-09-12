/**
 * Hash router. Hash-based so the app can be served from any static host or
 * sub-path (GitHub Pages included) with no server rewrite rules.
 */

const parse = () => {
  const [path, query = ''] = (location.hash.slice(1) || '/').split('?');
  const segments = path.split('/').filter(Boolean);
  return { segments, params: new URLSearchParams(query) };
};

/**
 * @param {Array<{ pattern: string[], view: Function }>} routes
 *   A pattern segment starting with ':' captures that segment by name.
 * @param {Function} fallback Rendered when nothing matches.
 */
export const createRouter = (routes, fallback) => {
  const match = ({ segments, params }) => {
    for (const route of routes) {
      if (route.pattern.length !== segments.length) continue;
      const captured = {};
      const ok = route.pattern.every((part, i) =>
        part.startsWith(':')
          ? ((captured[part.slice(1)] = decodeURIComponent(segments[i])), true)
          : part === segments[i],
      );
      if (ok) return { view: route.view, captured, params };
    }
    return { view: fallback, captured: {}, params };
  };

  const start = (onChange) => {
    const run = () => onChange(match(parse()));
    addEventListener('hashchange', run);
    run();
  };

  return { start };
};

export const href = (path) => `#${path}`;

export const navigate = (path) => {
  location.hash = path;
};
