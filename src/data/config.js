/**
 * Video configuration.
 *
 * A procedure's `video` is `{ id, title }` — the YouTube id plus the title as
 * published. The title is shown under the player so a wrong, replaced or dead
 * video is obvious at a glance rather than silently playing the wrong thing.
 *
 * `checked` marks a video a clinician has actually watched and approved.
 * Everything ships false; flip it in the data file once you have seen it.
 */

/** Used by any procedure with no video sourced yet. */
export const PLACEHOLDER_VIDEO = {
  id: 'M7lc1UVf-VE',
  title: 'Placeholder — no video sourced for this procedure yet',
};

export const isPlaceholderVideo = (procedure) => procedure.video.id === PLACEHOLDER_VIDEO.id;

export const embedUrl = (videoId) =>
  `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?autoplay=1&rel=0&modestbranding=1`;

export const watchUrl = (videoId) =>
  `https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}`;

/** Always-valid fallback, whatever state the embedded video is in. */
export const searchUrl = (procedureName) =>
  `https://www.youtube.com/results?search_query=${encodeURIComponent(`${procedureName} emergency procedure technique`)}`;
