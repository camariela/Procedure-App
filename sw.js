/**
 * Offline support.
 *
 * The shell is precached on install; every other same-origin asset caches
 * itself the first time it is used. That means adding a procedure data file
 * needs no change here — there is no file list to keep in step.
 *
 * Bump CACHE_VERSION to force all clients onto fresh assets.
 */

const CACHE_VERSION = 'v2';
const CACHE_NAME = `emproc-${CACHE_VERSION}`;
const SHELL = ['./', './index.html', './manifest.webmanifest'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(SHELL))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

const cachePut = async (request, response) => {
  if (response && response.ok && response.type === 'basic') {
    const cache = await caches.open(CACHE_NAME);
    await cache.put(request, response.clone());
  }
  return response;
};

/** Navigations: fresh when online, the cached shell when not. */
const handleNavigation = async (request) => {
  try {
    return await cachePut(request, await fetch(request));
  } catch {
    return (await caches.match(request)) ?? (await caches.match('./index.html'));
  }
};

/** Assets: serve from cache immediately, refresh in the background. */
const handleAsset = async (request) => {
  const cached = await caches.match(request);
  const network = fetch(request)
    .then((response) => cachePut(request, response))
    .catch(() => cached);
  return cached ?? network;
};

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  // Videos and anything else off-origin go straight to the network.
  if (new URL(request.url).origin !== self.location.origin) return;

  event.respondWith(
    request.mode === 'navigate' ? handleNavigation(request) : handleAsset(request),
  );
});
