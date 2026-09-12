# EM Procedures

A mobile-first reference for emergency medicine procedures: watch the video, tick
off the kit, then work through the steps. Plain ES modules, no build step, no
dependencies, works offline.

> **Reference only.** The clinical content is drafted for training and quick
> recall and is **not clinically reviewed**. Every procedure carries a visible
> draft badge until a clinician verifies it. It does not replace local protocols,
> senior support or clinical judgement.

## Running it locally

Any static server will do — ES modules need HTTP, so opening `index.html` from
the filesystem will not work.

```sh
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deployment

Pushes to `main` (or the development branch) trigger
`.github/workflows/deploy.yml`, which validates the catalogue and publishes the
repository to GitHub Pages as-is.

**One-time setup:** repository *Settings → Pages → Build and deployment →
Source: GitHub Actions*. If you want the workflow to publish from the
development branch before it merges, also add that branch under *Settings →
Environments → github-pages → Deployment branches*.

The app then lives at `https://<owner>.github.io/<repo>/`.

## How it is put together

```
index.html              App shell: top bar, search field, mount point, disclaimer
manifest.webmanifest    PWA metadata
sw.js                   Offline caching — shell precache, everything else cached on use
src/
  main.js               Bootstrap: routing, delegated events, service worker
  lib/
    dom.js              Escaping `html` tagged template, render, event delegation
    router.js           Hash router (works on any static host or sub-path)
    storage.js          Namespaced, failure-tolerant localStorage
    checklist.js        Tick state for equipment and steps
    search.js           Scored substring search over the catalogue
  data/
    systems.js          Organ-system categories, in display order
    schema.js           Procedure shape, defaults and validation
    config.js           Video ids and YouTube URL builders
    procedures/*.js     One file per organ system
    index.js            Assembles, validates and indexes the catalogue
  views/                One function per route: home, system, procedure, 404
  components/           Reusable pieces: cards, badges, video, tick lists, sections
  styles/               tokens → base → components
```

Views are pure functions of the route and return escaped HTML. State lives in
two places only: the URL (route and open tab) and `localStorage` (tick state).

## Adding a procedure

Append a record to the relevant file in `src/data/procedures/`. It appears in
navigation, search and the offline cache with no other change.

```js
{
  id: 'lumbar-puncture',          // URL slug, unique across the catalogue
  name: 'Lumbar Puncture',
  aka: ['LP', 'spinal tap'],      // searchable synonyms
  acuity: 'urgent',               // 'emergent' | 'urgent' | 'routine'
  summary: 'One line: what it is and when you reach for it.',
  videoId: 'abc123XYZ00',         // omit to keep the shared placeholder clip
  equipment: [{ item: 'Spinal needle', detail: '22 G atraumatic', optional: false }],
  indications: ['...'],
  contraindications: { absolute: ['...'], relative: ['...'] },
  steps: [{ text: 'Do this.', caution: 'Shown as a red warning under the step.' }],
  pearls: ['...'],
  complications: ['...'],
  verified: false,                // true removes the "not clinically reviewed" badge
}
```

`schema.js` throws at load if a required field is missing, and `index.js` throws
on a duplicate id or an unknown system — so mistakes surface immediately rather
than as a blank screen.

### Adding an organ system

1. Add an entry to `SYSTEMS` in `src/data/systems.js` (its `icon` must be a key
   in `src/components/icons.js`).
2. Create `src/data/procedures/<id>.js`.
3. Import and spread it in `src/data/index.js`.

## Videos

Every procedure currently points at one shared placeholder clip, flagged in the
UI with a "Placeholder video" badge. Replace a procedure's `videoId` with the
real YouTube id and the badge disappears on its own.

The player is a facade: nothing loads from YouTube until the user presses play,
so listings stay fast and the rest of the app works with no network.

## Offline

The service worker precaches the shell and caches every other same-origin asset
the first time it is used, so there is no file list to keep in step when you add
a procedure. Videos are deliberately not cached — they are cross-origin and
large. Bump `CACHE_VERSION` in `sw.js` to push all clients onto fresh assets.
