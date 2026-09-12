import { html } from '../lib/dom.js';
import { href } from '../lib/router.js';

export const notFoundView = () => html`
  <section class="section">
    <h1 class="page-head__title">Not found</h1>
    <p class="empty">That page does not exist.</p>
    <p><a class="button" href="${href('/')}">Back to all systems</a></p>
  </section>
`;
