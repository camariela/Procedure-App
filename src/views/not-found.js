import { html } from '../lib/dom.js';
import { href } from '../lib/router.js';

export const notFoundView = () => html`
  <section class="py-10 text-center">
    <h1 class="font-display text-[1.75rem] font-bold tracking-tight">Not found</h1>
    <p class="mt-2 text-sm text-muted-foreground">That page does not exist.</p>
    <p class="mt-5">
      <a
        class="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-5 font-display text-[0.88rem] font-semibold text-primary-foreground shadow-xs transition-colors hover:bg-primary/90"
        href="${href('/')}"
        >Back to all systems</a
      >
    </p>
  </section>
`;
