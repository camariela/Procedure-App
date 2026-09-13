# EM Procedures

A mobile-first reference for emergency medicine procedures: watch the video, tick
off the kit, then work through the steps — and, for the HALO set, say the whole
thing out loud from memory and find out what you left out. Plain ES modules, no
framework, no runtime dependencies, works offline.

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

The stylesheet is compiled and committed, so the repository runs as-is. Only
touch the build if you edit `src/styles/app.src.css`:

```sh
npm install          # once
npm run build:css    # after editing app.src.css — commit the result
npm run watch:css    # while editing
```

CI rebuilds the stylesheet and fails the deploy if the committed copy is stale,
so a forgotten rebuild cannot ship.

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
    rehearsal.js        Spaced-rehearsal schedule for the HALO set
    score.js            Marks a spoken or typed run-through against the steps
    speech.js           Web Speech API wrapper, with capability detection
    ics.js              Calendar export, so reminders arrive on a real device
  data/
    systems.js          Organ-system categories, in display order
    schema.js           Procedure shape, defaults and validation
    config.js           Video ids and YouTube URL builders
    procedures/*.js     One file per organ system
    index.js            Assembles, validates and indexes the catalogue
  views/                One function per route: home, system, procedure, rehearse, 404
  components/           Reusable pieces: cards, badges, video, tick lists, sections
  styles/
    app.src.css         Design tokens and font faces — the source
    app.css             Compiled Tailwind, committed, what the page loads
assets/fonts/           Self-hosted Inter and Space Grotesk (variable, woff2)
```

Views are pure functions of the route and return escaped HTML. State lives in
the URL (route and open tab) and `localStorage` (tick state, rehearsal
schedule). The one exception is the rehearsal screen, which holds a half-spoken
run-through in module state and says so in its own header comment.

## Styling

Tailwind v4, with shadcn/ui's design system ported rather than imported —
shadcn's components are React and this app has none, so what travels is the part
that matters: the semantic CSS-variable token layer (`--background`,
`--muted-foreground`, `--border`, `--ring`), the radius scale, and each
component's anatomy, written as utilities on the markup the JS components
already own. Each recipe appears exactly once, in the component that owns it,
which is where shadcn puts it too.

Tailwind is **compiled to a committed file**, never loaded from a CDN: the CDN
build is a runtime compiler, and an app you open at a bedside has to render with
no network.

Colour is spent on meaning, never decoration:

| Group | Job |
|---|---|
| `--halo` `--emergent` `--urgent` `--routine` | how rare, how sick |
| `--caution` `--destructive` `--complication` | the three weights of "stop" |
| `--verified` `--draft` | whether a human has checked this |
| `--info` | worth knowing, not a warning |
| `--sys-*` (twelve) | one hue per organ system |

Each system's hue is assigned once, by `[data-system]` setting `--sys`; rails,
icons and labels then colour themselves with `bg-sys` / `text-sys` without
knowing which system they are in. The twelve hues are spaced so that no two
systems adjacent in the grid land within 60° of each other.

Type is Space Grotesk for display and Inter for body, both self-hosted variable
fonts (one file per family covers every weight), both subset to latin and
latin-ext. Self-hosted rather than linked so the app renders in its own type
offline and makes no third-party request.

## Adding a procedure

Append a record to the relevant file in `src/data/procedures/`. It appears in
navigation, search and the offline cache with no other change.

```js
{
  id: 'lumbar-puncture',          // URL slug, unique across the catalogue
  name: 'Lumbar Puncture',
  aka: ['LP', 'spinal tap'],      // searchable synonyms
  acuity: 'urgent',               // 'emergent' | 'urgent' | 'routine'
  frequency: 'frequent',          // 'halo' | 'occasional' | 'frequent'
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

`schema.js` throws at load if a required field is missing or if `frequency` is
not one of the three allowed values, and `index.js` throws on a duplicate id or
an unknown system — so mistakes surface immediately rather than as a blank
screen.

`frequency` is how often one clinician actually performs the procedure, which is
a different axis from how sick the patient is. `halo` — high acuity, low
occurrence — marks the rehearsal set: rare enough that you will be rusty,
unforgiving enough that rust matters. Those records are collected into
`HALO_PROCEDURES` and lead the home screen.

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

## Rehearsal

Procedural skill decays with disuse, and the procedures you most need to be good
at are the ones you do least. The HALO set therefore has a rehearsal loop.

**The schedule.** `LADDER` in `src/lib/rehearsal.js` is `[30, 60, 90, 180]`
days. A pass moves you up a rung; a failed run-through drops you back to the
first and leaves the procedure due immediately, because the answer to a bad
run-through is another run-through, not another month. These intervals are a
reasonable reading of the skill-decay literature — measurable decay in
resuscitation procedural skills within three to six months without practice,
which is why retraining has moved towards low-dose, high-frequency — not a
citation of any one guideline. Change `LADDER` and every schedule follows.

**The run-through.** Watch the video, then talk through every step from memory.
`src/lib/score.js` marks what you said against the step list and reports two
numbers, because they fail differently: *coverage* (did every step get said at
all — the dangerous failure) and *order* (were the ones you said in sequence).
Coverage is weighted 70/30 because a step you never said is a step you would not
have done. The pass mark is 80, **and missing any step that carries a caution
fails the attempt outright whatever the total**.

Matching is a local, explainable algorithm rather than a model call: the app has
no backend, has to work on aeroplane mode, and a clinician deserves to see
exactly why a step was marked missed — so every miss lists the words it looked
for. Terms that appear in more than half of a procedure's steps are dropped
automatically, which tunes out medical filler without maintaining a list by
hand. Spoken numbers are normalised to digits, because sizes, doses, landmarks
and times are the part worth getting right.

**Speech.** Chromium and Safari have the Web Speech API; Firefox does not. Where
it is missing — or where you would rather type — the typed run-through is scored
by exactly the same code. Note that Chromium transcribes by sending audio to
Google's servers, so the spoken path is the one part of this app that needs a
network and does not keep your voice on the device. The typed path works
offline. Only the transcript is stored, locally.

### Reminders

**A static site cannot email you or push a notification while it is closed.**
Both need a server holding a subscription and doing the sending, and there isn't
one. Rather than pretend otherwise, *Add reminders to calendar* exports an
`.ics` file: one repeating appointment per HALO procedure, at its own interval,
each with an alarm and a deep link straight into that procedure's rehearsal
screen. Your calendar then does the reminding — on your phone, and by email if
you have that switched on. Nothing leaves the device to produce it.

If you later want true push or email, that is the piece to add: a small service
holding push subscriptions and the schedule. The schedule itself already lives
in `src/lib/rehearsal.js` and is portable.

## Offline

The service worker precaches the shell and caches every other same-origin asset
the first time it is used, so there is no file list to keep in step when you add
a procedure. Videos are deliberately not cached — they are cross-origin and
large. Bump `CACHE_VERSION` in `sw.js` to push all clients onto fresh assets.
