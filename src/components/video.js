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

export const videoPanel = (procedure) => {
  const { video } = procedure;
  const placeholder = isPlaceholderVideo(procedure);

  return html`
    <figure class="video">
      <div class="video__frame" data-video-frame>
        <button class="video__facade" type="button" data-action="${ACTION_PLAY}">
          <span class="video__play">${icon('play', { size: 32 })}</span>
          <span class="video__facade-label">Play step-by-step video</span>
          <span class="video__facade-sub">${video.title}</span>
        </button>
      </div>
      <figcaption class="video__caption">
        ${videoBadge({ placeholder, checked: video.checked })}
        <p class="video__title">${video.title}</p>
        ${when(
          placeholder,
          html`<p class="video__note">
            No video sourced yet. Set <code>video</code> in this procedure's data file.
          </p>`,
        )}
        ${when(
          !placeholder && !video.checked,
          html`<p class="video__note">
            Sourced from a YouTube search and not yet watched end to end. Check it
            matches the steps below, then set <code>checked: true</code> in the data file.
          </p>`,
        )}
        <p class="video__links">
          <a href="${watchUrl(video.id)}" target="_blank" rel="noopener">Open on YouTube</a>
          <a href="${searchUrl(procedure.name)}" target="_blank" rel="noopener">Find another video</a>
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
