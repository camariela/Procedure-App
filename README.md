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

**One-time setup, and nothing deploys until it is done:** repository *Settings
→ Pages → Build and deployment → Source: **GitHub Actions***. Until Pages is
enabled the deploy job is rejected before it starts, with no step output to
explain why.

After that, every push to the default branch runs
`.github/workflows/deploy.yml`, which validates the catalogue and publishes the
repository to Pages as-is. The app lives at `https://<owner>.github.io/<repo>/`.

The workflow also triggers on `main`, for when the development branch is merged
into one. If you later deploy from a branch that is *not* the default branch,
add it under *Settings → Environments → github-pages → Deployment branches*.

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
  video: {                        // omit entirely to fall back to the placeholder
    id: 'abc123XYZ00',            // YouTube id
    title: 'As published on YouTube',
    checked: false,               // true once you have watched it end to end
  },
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

Every procedure points at a real YouTube video, each one taken from a web search
for that procedure rather than composed by hand.

**They have not been watched.** The sandbox this was built in blocks YouTube, so
the ids could not be checked for liveness, embeddability or whether the content
matches the steps. Each one therefore carries a **"Source unverified"** badge and
shows its published title under the player, so a video that has been replaced,
taken down or blocked from embedding is obvious rather than silent.

Watching a video and setting `checked: true` in its data file turns the badge
green. Swapping `id` and `title` replaces the video.

The player is a facade: nothing loads from YouTube until the user presses play,
so listings stay fast and the rest of the app works with no network. The "Open
on YouTube" and "Find another video" links stay visible whatever state the embed
is in, so a dead video never leaves you stuck.

## Offline

The service worker precaches the shell and caches every other same-origin asset
the first time it is used, so there is no file list to keep in step when you add
a procedure. Videos are deliberately not cached — they are cross-origin and
large. Bump `CACHE_VERSION` in `sw.js` to push all clients onto fresh assets.
