/**
 * Speech recognition, where the browser has it.
 *
 * Two things worth knowing, both surfaced to the user rather than hidden:
 * Chromium sends the audio to Google's servers to transcribe it, so this is the
 * one part of the app that needs a network and does not keep your voice on the
 * device; and Firefox does not implement it at all. Both cases fall back to
 * typing the run-through, which is scored by exactly the same code.
 */

const Recogniser =
  typeof window !== 'undefined' ? window.SpeechRecognition ?? window.webkitSpeechRecognition : null;

export const speechAvailable = () => Boolean(Recogniser);

/**
 * @param {Object} handlers
 * @param {(text: string, isFinal: boolean) => void} handlers.onTranscript Called with everything heard so far.
 * @param {(reason: string) => void} [handlers.onError]
 * @param {() => void} [handlers.onEnd]
 * @returns {{start: () => void, stop: () => void}}
 */
export const listen = ({ onTranscript, onError, onEnd }) => {
  const recognition = new Recogniser();
  recognition.lang = navigator.language || 'en-GB';
  recognition.continuous = true;
  recognition.interimResults = true;

  let settled = '';
  let stopped = false;

  recognition.onresult = (event) => {
    let interim = '';
    for (let i = event.resultIndex; i < event.results.length; i += 1) {
      const chunk = event.results[i][0].transcript;
      if (event.results[i].isFinal) settled += `${chunk} `;
      else interim += chunk;
    }
    onTranscript(`${settled}${interim}`.trim(), false);
  };

  recognition.onerror = (event) => {
    // `no-speech` and `aborted` fire routinely while someone gathers their
    // thoughts; only report the ones that actually end the attempt.
    if (event.error === 'no-speech' || event.error === 'aborted') return;
    onError?.(
      event.error === 'not-allowed'
        ? 'Microphone permission was refused.'
        : event.error === 'network'
          ? 'Speech recognition needs a network connection. Type the run-through instead.'
          : `Speech recognition failed (${event.error}).`,
    );
  };

  recognition.onend = () => {
    // Continuous mode still stops itself on a long pause; restart until asked not to.
    if (!stopped) {
      try {
        recognition.start();
        return;
      } catch {
        /* fall through to ending */
      }
    }
    onTranscript(settled.trim(), true);
    onEnd?.();
  };

  return {
    start: () => {
      stopped = false;
      recognition.start();
    },
    stop: () => {
      stopped = true;
      recognition.stop();
    },
  };
};
