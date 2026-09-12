/**
 * Video configuration.
 *
 * Every procedure ships pointing at one shared placeholder clip. Replace a
 * procedure's `videoId` with the real YouTube id once footage exists and the
 * "placeholder" badge disappears on its own — no other change needed.
 */

/** YouTube's own long-standing sample clip, used here as an obvious stand-in. */
export const PLACEHOLDER_VIDEO_ID = 'M7lc1UVf-VE';

export const isPlaceholderVideo = (procedure) => procedure.videoId === PLACEHOLDER_VIDEO_ID;

export const embedUrl = (videoId) =>
  `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?autoplay=1&rel=0&modestbranding=1`;

export const watchUrl = (videoId) =>
  `https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}`;

/** Always-valid fallback while videos are still placeholders. */
export const searchUrl = (procedureName) =>
  `https://www.youtube.com/results?search_query=${encodeURIComponent(`${procedureName} emergency procedure technique`)}`;
