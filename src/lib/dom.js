/**
 * Minimal templating + DOM helpers.
 *
 * Everything interpolated into an `html` template is escaped unless it is
 * itself the result of an `html` call (or explicitly wrapped in `raw`), which
 * makes nesting templates safe by default.
 */

const RAW = Symbol('raw');

const ENTITIES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

/** Escape a value for interpolation into HTML text or an attribute. */
const esc = (value) =>
  String(value ?? '').replace(/[&<>"']/g, (char) => ENTITIES[char]);

/** Mark a string as pre-escaped HTML. */
export const raw = (value) => ({ [RAW]: String(value ?? '') });

const isRaw = (value) => Boolean(value) && typeof value === 'object' && RAW in value;

const format = (value) => {
  if (value === null || value === undefined || value === false) return '';
  if (isRaw(value)) return value[RAW];
  if (Array.isArray(value)) return value.map(format).join('');
  return esc(value);
};

/** Tagged template that builds escaped HTML. */
export const html = (strings, ...values) =>
  raw(strings.reduce((out, str, i) => out + format(values[i - 1]) + str));

/** Replace the contents of `node` with a template. */
export const render = (node, template) => {
  node.innerHTML = format(template);
  return node;
};

/** Conditional helper so views stay expression-shaped. */
export const when = (condition, template) => (condition ? template : '');

export const qs = (selector, scope = document) => scope.querySelector(selector);

/**
 * Delegated event listener. Keeps views stateless: they emit markup with
 * `data-action` attributes and behavior is bound once, per view root.
 */
export const onAction = (scope, type, handler) => {
  scope.addEventListener(type, (event) => {
    const target = event.target.closest('[data-action]');
    if (target && scope.contains(target)) handler(target.dataset.action, target, event);
  });
};
