/**
 * Video panel.
 *
 * Renders a lightweight facade rather than an iframe on load: the embed is only
 * created when the user presses play. That keeps the list fast, keeps YouTube
 * out of the page until asked, and means the rest of the procedure still works
 * with no network.
 *
 * The published title is always shown, and the YouTube links stay visible, so a
 * video that has been taken down, made private or blocked from embedding still
 * leaves the user one tap from finding the real thing.
 */

import { html, when } from '../lib/dom.js';
import { icon } from './icons.js';
import { videoBadge } from './badges.js';
import { embedUrl, isPlaceholderVideo, searchUrl, watchUrl } from '../data/config.js';

export const ACTION_PLAY = 'play-video';

const LINK =
  'inline-flex h-9 items-center justify-center gap-1.5 rounded-md border border-border bg-background px-3 text-[0.83rem] font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground';

export const videoPanel = (procedure) => {
  const { video } = procedure;
  const placeholder = isPlaceholderVideo(procedure);

  return html`
    <figure class="overflow-hidden rounded-xl border border-border bg-card shadow-xs">
      <div class="relative aspect-video w-full bg-foreground [&>iframe]:absolute [&>iframe]:inset-0 [&>iframe]:size-full [&>iframe]:border-0" data-video-frame>
        <button
          class="group absolute inset-0 flex size-full cursor-pointer flex-col items-center justify-center gap-3 bg-linear-to-br from-primary via-foreground to-sys/70 px-6 text-center text-primary-foreground transition-opacity hover:opacity-95"
          type="button"
          data-action="${ACTION_PLAY}"
        >
          <span
            class="grid size-16 place-items-center rounded-full bg-primary-foreground/15 pl-1 ring-1 ring-white/25 backdrop-blur-sm transition-transform group-hover:scale-105"
            >${icon('play', { size: 30 })}</span
          >
          <span class="font-display text-[0.95rem] font-semibold tracking-tight">Play step-by-step video</span>
          <span class="line-clamp-2 max-w-sm text-[0.8rem] leading-snug text-primary-foreground/70">${video.title}</span>
        </button>
      </div>

      <figcaption class="flex flex-col gap-2.5 p-4">
        ${videoBadge({ placeholder, checked: video.checked })}
        <p class="font-display text-[0.95rem] leading-snug font-medium tracking-tight text-card-foreground">
          ${video.title}
        </p>
        ${when(
          placeholder,
          html`<p class="text-[0.83rem] leading-relaxed text-muted-foreground">
            No video sourced yet. Set
            <code class="rounded bg-muted px-1 py-0.5 font-mono text-[0.78rem]">video</code> in this
            procedure's data file.
          </p>`,
        )}
        ${when(
          !placeholder && !video.checked,
          html`<p class="text-[0.83rem] leading-relaxed text-muted-foreground">
            Not yet watched end to end. Check it matches the steps, then set
            <code class="rounded bg-muted px-1 py-0.5 font-mono text-[0.78rem]">checked: true</code>
            in the data file.
          </p>`,
        )}
        <p class="flex flex-wrap gap-2 pt-0.5">
          <a class="${LINK}" href="${watchUrl(video.id)}" target="_blank" rel="noopener">Open on YouTube</a>
          <a class="${LINK}" href="${searchUrl(procedure.name)}" target="_blank" rel="noopener">Find another video</a>
        </p>
      </figcaption>
    </figure>
  `;
};

/** Swap the facade for the real embed. Called once, on user gesture. */
export const mountEmbed = (frame, procedure) => {
  frame.innerHTML = '';
  const iframe = document.createElement('iframe');
  iframe.src = embedUrl(procedure.video.id);
  iframe.title = `${procedure.name} video`;
  iframe.loading = 'lazy';
  iframe.allow = 'accelerometer; autoplay; encrypted-media; picture-in-picture; fullscreen';
  iframe.allowFullscreen = true;
  frame.appendChild(iframe);
};
