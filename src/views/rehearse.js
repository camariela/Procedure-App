/**
 * Mental simulation: watch it, picture it, then say it from memory and find out
 * what you left out.
 *
 * Mental practice — rehearsing a procedure in the mind's eye and out loud
 * without touching a patient — is the cheapest way to hold a procedure you
 * almost never perform.
 *
 * Three stages, held in module state rather than the URL, because a half-spoken
 * run-through is not something to restore from a bookmark. The rest of the app
 * stays a pure function of the route; this one screen is the exception and says
 * so.
 */

import { html, qs, render, when } from '../lib/dom.js';
import { href, navigate } from '../lib/router.js';
import { procedureById, systemById } from '../data/index.js';
import { scoreRecall, PASS_MARK } from '../lib/score.js';
import { recordAttempt, standing } from '../lib/rehearsal.js';
import { listen, speechAvailable } from '../lib/speech.js';
import { icon } from '../components/icons.js';
import { videoPanel } from '../components/video.js';
import { rehearsalChip } from '../components/rehearsal-status.js';
import { backLink } from '../components/back-link.js';
import { notFoundView } from './not-found.js';

export const ACTIONS = {
  begin: 'rehearse-begin',
  record: 'rehearse-record',
  stop: 'rehearse-stop',
  type: 'rehearse-type',
  submit: 'rehearse-submit',
  retake: 'rehearse-retake',
  finish: 'rehearse-finish',
};

/** @type {{id: string, stage: string, transcript: string, result: object|null, error: string, mode: string, recording: boolean}|null} */
let session = null;
let recognizer = null;

const fresh = (id) => ({
  id,
  stage: 'watch',
  transcript: '',
  result: null,
  error: '',
  mode: speechAvailable() ? 'speech' : 'typed',
  recording: false,
});

const BUTTON =
  'inline-flex h-10 items-center justify-center gap-2 rounded-lg px-4 font-display text-[0.88rem] font-semibold shadow-xs transition-colors';
const PRIMARY = `${BUTTON} bg-primary text-primary-foreground hover:bg-primary/90`;
const QUIET = `${BUTTON} border border-border bg-background hover:bg-accent hover:text-accent-foreground`;

const stageDots = (stage) => {
  const stages = [
    ['watch', 'Watch'],
    ['recall', 'Recall'],
    ['result', 'Score'],
  ];
  const current = stages.findIndex(([id]) => id === stage);
  return html`
    <ol class="mb-5 flex items-center gap-1.5" aria-label="Simulation progress">
      ${stages.map(
        ([id, label], index) => html`
          <li class="flex flex-1 items-center gap-1.5">
            <span
              class="flex h-7 flex-1 items-center justify-center gap-1.5 rounded-md font-display text-[0.74rem] font-semibold tracking-tight transition-colors ${index <=
              current
                ? 'bg-primary/10 text-primary'
                : 'bg-muted text-muted-foreground'}"
              aria-current="${id === stage ? 'step' : 'false'}"
            >
              <span class="tabular">${index + 1}</span> ${label}
            </span>
          </li>
        `,
      )}
    </ol>
  `;
};

const watchStage = (procedure) => html`
  <div class="grid gap-4">
    <p class="text-[0.9rem] leading-relaxed text-muted-foreground">
      Watch it once, all the way through, with the steps in front of you. Then close them, picture
      yourself doing it, and say the whole thing out loud from memory. Seeing it and saying it are
      the parts that make it hold.
    </p>
    ${videoPanel(procedure)}
    <div class="flex flex-wrap gap-2">
      <button class="${PRIMARY}" type="button" data-action="${ACTIONS.begin}">
        ${icon('mic', { size: 16 })} I have watched it — start recall
      </button>
      <a class="${QUIET}" href="${href(`/procedure/${procedure.id}?section=steps`)}">
        Read the steps first
      </a>
    </div>
  </div>
`;

const recallStage = (procedure) => html`
  <div class="grid gap-4">
    <div class="rounded-xl border border-info/25 bg-info/8 px-4 py-3.5">
      <h2 class="flex items-center gap-1.5 font-display text-[0.76rem] font-bold tracking-[0.08em] text-info uppercase">
        ${icon('target', { size: 15 })} Talk through all
        <span class="tabular">${procedure.steps.length}</span> steps
      </h2>
      <p class="mt-2 text-[0.88rem] leading-relaxed text-foreground/85">
        Out loud, in order, in your own words, as if you were talking a registrar through it. Picture
        each landmark as you name it. Say the numbers — sizes, doses, landmarks and times are all
        scored. Nothing is uploaded or kept but the text.
      </p>
    </div>

    ${session.mode === 'speech'
      ? html`
          <div
            class="flex flex-col items-center gap-3 rounded-xl border border-border bg-card px-4 py-7 shadow-xs"
          >
            <button
              class="grid size-20 place-items-center rounded-full shadow-sm transition-all ${session.recording
                ? 'animate-pulse bg-halo text-halo-foreground ring-4 ring-halo/20'
                : 'bg-primary text-primary-foreground hover:scale-105'}"
              type="button"
              data-action="${session.recording ? ACTIONS.stop : ACTIONS.record}"
              aria-label="${session.recording ? 'Stop and score' : 'Start recording'}"
            >
              ${icon(session.recording ? 'stop' : 'mic', { size: 30 })}
            </button>
            <p class="font-display text-[0.88rem] font-semibold tracking-tight">
              ${session.recording ? 'Listening — tap to stop and score' : 'Tap to start'}
            </p>
            ${when(
              session.transcript,
              html`<p
                class="max-h-40 w-full overflow-y-auto rounded-lg bg-muted/60 px-3 py-2.5 text-[0.85rem] leading-relaxed text-muted-foreground"
              >
                ${session.transcript}
              </p>`,
            )}
            ${when(
              !session.recording,
              html`<button class="text-[0.82rem] font-medium text-primary underline underline-offset-4" type="button" data-action="${ACTIONS.type}">
                Type it instead
              </button>`,
            )}
          </div>
        `
      : html`
          <div class="grid gap-3 rounded-xl border border-border bg-card p-4 shadow-xs">
            <p class="flex items-start gap-2 text-[0.85rem] leading-relaxed text-muted-foreground">
              ${icon('keyboard', { size: 16, className: 'mt-0.5 text-info' })}
              <span>
                ${speechAvailable()
                  ? 'Typed run-through. Scored by exactly the same code as the spoken one.'
                  : 'This browser has no speech recognition, so type the run-through instead. It is scored identically.'}
              </span>
            </p>
            <textarea
              id="recall-text"
              rows="10"
              placeholder="First I would…"
              class="w-full resize-y rounded-lg border border-input bg-background px-3 py-2.5 text-[0.9rem] leading-relaxed shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/25"
            >${session.transcript}</textarea>
            <div class="flex flex-wrap gap-2">
              <button class="${PRIMARY}" type="button" data-action="${ACTIONS.submit}">Score it</button>
              ${when(
                speechAvailable(),
                html`<button class="${QUIET}" type="button" data-action="${ACTIONS.type}">
                  ${icon('mic', { size: 15 })} Speak it instead
                </button>`,
              )}
            </div>
          </div>
        `}
    ${when(
      session.error,
      html`<p class="rounded-lg border border-destructive/25 bg-destructive/10 px-3.5 py-2.5 text-[0.85rem] font-medium text-destructive">
        ${session.error}
      </p>`,
    )}
  </div>
`;

const ring = (score, pass) => {
  const circumference = 2 * Math.PI * 42;
  return html`
    <div class="relative grid size-28 shrink-0 place-items-center">
      <svg class="absolute size-28 -rotate-90" viewBox="0 0 100 100" aria-hidden="true">
        <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" stroke-width="9" class="text-muted" />
        <circle
          cx="50"
          cy="50"
          r="42"
          fill="none"
          stroke="currentColor"
          stroke-width="9"
          stroke-linecap="round"
          stroke-dasharray="${circumference}"
          stroke-dashoffset="${circumference * (1 - score / 100)}"
          class="${pass ? 'text-verified' : 'text-halo'}"
        />
      </svg>
      <span class="relative text-center">
        <span class="block font-display text-[2rem] leading-none font-bold tabular ${pass ? 'text-verified' : 'text-halo'}"
          >${score}</span
        >
        <span class="block font-display text-[0.62rem] font-semibold tracking-[0.1em] text-muted-foreground uppercase">
          of 100
        </span>
      </span>
    </div>
  `;
};

const resultStage = (procedure) => {
  const { result } = session;
  const missed = result.steps.filter((step) => !step.matched);
  return html`
    <div class="grid gap-4">
      <section
        class="flex flex-wrap items-center gap-5 rounded-xl border px-4 py-4 shadow-xs ${result.pass
          ? 'border-verified/25 bg-verified/8'
          : 'border-halo/25 bg-halo/8'}"
      >
        ${ring(result.score, result.pass)}
        <div class="min-w-0 flex-1">
          <h2 class="font-display text-[1.2rem] font-bold tracking-tight ${result.pass ? 'text-verified' : 'text-halo'}">
            ${result.pass ? 'Passed' : 'Take it again'}
          </h2>
          <p class="mt-1.5 text-[0.88rem] leading-relaxed text-foreground/85">
            ${result.pass
              ? html`You covered <span class="font-semibold tabular">${result.matched}</span> of
                  <span class="tabular">${result.total}</span> steps in a workable order. Back in
                  <span class="font-semibold tabular">${standing(procedure.id).interval}</span>
                  days.`
              : result.missedCritical
                ? html`You missed
                    <span class="font-semibold tabular">${result.missedCritical}</span> step${result.missedCritical ===
                    1
                      ? ''
                      : 's'}
                    carrying a caution. That fails the attempt whatever the score.`
                : html`Below <span class="tabular">${PASS_MARK}</span>. Watch it again and run it
                    through once more.`}
          </p>
          <dl class="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-[0.8rem]">
            <div class="flex items-center gap-1.5">
              <dt class="text-muted-foreground">Steps recalled</dt>
              <dd class="font-display font-bold tabular">${result.matched}/${result.total}</dd>
            </div>
            <div class="flex items-center gap-1.5">
              <dt class="text-muted-foreground">In order</dt>
              <dd class="font-display font-bold tabular">${Math.round(result.order * 100)}%</dd>
            </div>
            <div class="flex items-center gap-1.5">
              <dt class="text-muted-foreground">Words</dt>
              <dd class="font-display font-bold tabular">${result.spokenWords}</dd>
            </div>
          </dl>
        </div>
      </section>

      ${when(
        missed.length,
        html`<section class="rounded-xl border border-urgent/25 bg-urgent/8 px-4 py-3.5">
          <h3 class="flex items-center gap-1.5 font-display text-[0.76rem] font-bold tracking-[0.08em] text-urgent uppercase">
            ${icon('warning', { size: 15 })} Not said
            <span class="tabular">(${missed.length})</span>
          </h3>
          <ul class="mt-2.5 grid gap-2.5">
            ${missed.map(
              (step) => html`<li class="text-[0.87rem] leading-relaxed">
                <span class="flex items-start gap-2">
                  <span class="mt-0.5 font-display text-[0.7rem] font-bold tabular text-urgent"
                    >${step.index + 1}</span
                  >
                  <span class="text-foreground/85">
                    ${step.text}
                    ${when(
                      step.caution,
                      html`<span class="mt-1 block font-medium text-destructive">
                        Caution missed: ${step.caution}
                      </span>`,
                    )}
                  </span>
                </span>
              </li>`,
            )}
          </ul>
        </section>`,
      )}

      <details class="rounded-xl border border-border bg-card px-4 py-3 shadow-xs">
        <summary class="cursor-pointer font-display text-[0.84rem] font-semibold tracking-tight">
          Step-by-step marking
        </summary>
        <ul class="mt-3 grid gap-2">
          ${result.steps.map(
            (step) => html`<li class="flex items-start gap-2.5 text-[0.85rem] leading-relaxed">
              <span
                class="mt-0.5 grid size-4.5 shrink-0 place-items-center rounded-[4px] ${step.matched
                  ? 'bg-verified/15 text-verified'
                  : 'bg-halo/15 text-halo'}"
                >${icon(step.matched ? 'check' : 'warning', { size: 11 })}</span
              >
              <span class="min-w-0">
                <span class="${step.matched ? 'text-muted-foreground' : 'font-medium text-foreground'}">
                  ${step.text}
                </span>
                ${when(
                  !step.matched && step.missed.length,
                  html`<span class="mt-0.5 block text-[0.78rem] text-muted-foreground">
                    Looked for: ${step.missed.slice(0, 8).join(', ')}
                  </span>`,
                )}
              </span>
            </li>`,
          )}
        </ul>
      </details>

      ${when(
        session.transcript,
        html`<details class="rounded-xl border border-border bg-card px-4 py-3 shadow-xs">
          <summary class="cursor-pointer font-display text-[0.84rem] font-semibold tracking-tight">
            What you said
          </summary>
          <p class="mt-2.5 text-[0.85rem] leading-relaxed text-muted-foreground">${session.transcript}</p>
        </details>`,
      )}

      <div class="flex flex-wrap gap-2">
        <button class="${result.pass ? QUIET : PRIMARY}" type="button" data-action="${ACTIONS.retake}">
          ${icon('reset', { size: 15 })} Run it again
        </button>
        <button class="${result.pass ? PRIMARY : QUIET}" type="button" data-action="${ACTIONS.finish}">
          ${icon('check', { size: 15 })} Save and finish
        </button>
      </div>
    </div>
  `;
};

const body = (procedure) => {
  if (session.stage === 'watch') return watchStage(procedure);
  if (session.stage === 'recall') return recallStage(procedure);
  return resultStage(procedure);
};

export const rehearseView = ({ captured }) => {
  const procedure = procedureById.get(captured.procedureId);
  if (!procedure) return notFoundView();
  if (session?.id !== procedure.id) session = fresh(procedure.id);

  const system = systemById.get(procedure.systemId);
  return html`
    <div data-system="${procedure.systemId}">
      ${backLink(href(`/procedure/${procedure.id}`), procedure.name)}
      <header class="mt-3 mb-5">
        <p class="font-display text-[0.7rem] font-bold tracking-[0.14em] text-sys uppercase">
          ${system.name} · Mental Simulation
        </p>
        <h1 class="mt-1 font-display text-[1.6rem] leading-[1.15] font-bold tracking-tight">
          ${procedure.name}
        </h1>
        <p class="mt-2.5">${rehearsalChip(standing(procedure.id))}</p>
      </header>
      <div data-rehearse>${stageDots(session.stage)} ${body(procedure)}</div>
    </div>
  `;
};

/** Re-render the flow in place, so recording does not move the page. */
const refresh = () => {
  const host = qs('[data-rehearse]');
  const procedure = procedureById.get(session?.id);
  if (host && procedure) render(host, html`${stageDots(session.stage)} ${body(procedure)}`);
};

const score = (procedure) => {
  session.result = scoreRecall(procedure.steps, session.transcript);
  session.stage = 'result';
  refresh();
};

/** Actions owned by this screen. Returns true when it handled the action. */
export const rehearseAction = (action) => {
  if (!session) return false;
  const procedure = procedureById.get(session.id);
  if (!procedure) return false;

  switch (action) {
    case ACTIONS.begin:
      session.stage = 'recall';
      refresh();
      return true;

    case ACTIONS.record:
      session.error = '';
      session.transcript = '';
      session.recording = true;
      recognizer = listen({
        onTranscript: (text) => {
          session.transcript = text;
          const live = qs('[data-rehearse] .max-h-40');
          if (live) live.textContent = text;
        },
        onError: (message) => {
          session.error = message;
          session.recording = false;
          refresh();
        },
        onEnd: () => {
          if (session.recording) {
            session.recording = false;
            refresh();
          }
        },
      });
      try {
        recognizer.start();
      } catch {
        session.error = 'Could not start the microphone.';
        session.recording = false;
      }
      refresh();
      return true;

    case ACTIONS.stop:
      session.recording = false;
      recognizer?.stop();
      recognizer = null;
      // Give the recognizer a beat to flush its last phrase before scoring.
      setTimeout(() => score(procedure), 250);
      return true;

    case ACTIONS.type:
      recognizer?.stop();
      recognizer = null;
      session.recording = false;
      session.mode = session.mode === 'typed' ? 'speech' : 'typed';
      refresh();
      return true;

    case ACTIONS.submit:
      session.transcript = qs('#recall-text')?.value.trim() ?? '';
      if (!session.transcript) {
        session.error = 'Nothing to score yet.';
        refresh();
        return true;
      }
      score(procedure);
      return true;

    case ACTIONS.retake:
      session.transcript = '';
      session.result = null;
      session.error = '';
      session.stage = 'recall';
      refresh();
      return true;

    case ACTIONS.finish:
      recordAttempt(procedure.id, {
        score: session.result.score,
        pass: session.result.pass,
        transcript: session.transcript,
      });
      session = null;
      navigate(`/procedure/${procedure.id}`);
      return true;

    default:
      return false;
  }
};
