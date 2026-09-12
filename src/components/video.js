/**
 * Video panel.
 *
 * Renders a lightweight facade rather than an iframe on load: the embed is only
 * created when the user presses play. That keeps the list fast, keeps YouTube
 * out of the page until asked, and means the rest of the procedure still works
 * with no network.
 */

import { html, when } from '../lib/dom.js';
import { icon } from './icons.js';
import { placeholderBadge } from './badges.js';
import { embedUrl, isPlaceholderVideo, searchUrl, watchUrl } from '../data/config.js';

export const ACTION_PLAY = 'play-video';

export const videoPanel = (procedure) => {
  const placeholder = isPlaceholderVideo(procedure);
  return html`
    <figure class="video">
      <div class="video__frame" data-video-frame>
        <button class="video__facade" type="button" data-action="${ACTION_PLAY}">
          <span class="video__play">${icon('play', { size: 32 })}</span>
          <span class="video__facade-label">Play step-by-step video</span>
          <span class="video__facade-sub">${procedure.name}</span>
        </button>
      </div>
      <figcaption class="video__caption">
        ${placeholderBadge(placeholder)}
        ${when(
          placeholder,
          html`<p class="video__note">
            This procedure still points at the shared placeholder clip. Replace
            <code>videoId</code> in its data file with the real YouTube id.
          </p>`,
        )}
        <p class="video__links">
          <a href="${watchUrl(procedure.videoId)}" target="_blank" rel="noopener">Open on YouTube</a>
          <a href="${searchUrl(procedure.name)}" target="_blank" rel="noopener">Search YouTube for this procedure</a>
        </p>
      </figcaption>
    </figure>
  `;
};

/** Swap the facade for the real embed. Called once, on user gesture. */
export const mountEmbed = (frame, procedure) => {
  frame.innerHTML = '';
  const iframe = document.createElement('iframe');
  iframe.src = embedUrl(procedure.videoId);
  iframe.title = `${procedure.name} video`;
  iframe.loading = 'lazy';
  iframe.allow = 'accelerometer; autoplay; encrypted-media; picture-in-picture; fullscreen';
  iframe.allowFullscreen = true;
  frame.appendChild(iframe);
};
