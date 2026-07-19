/**
 * Original synthesized UI sounds — tiny oscillator+envelope cues, no samples,
 * nothing ripped from any game. Muted by default; preference persisted in
 * localStorage under "zeldatime:sound". SSR-safe: the AudioContext is only
 * created lazily in response to a user gesture in the browser.
 */

const PREF_KEY = "zeldatime:sound";

let ctx: AudioContext | null = null;
let soundOn = false;

function getContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

export function isSoundEnabled(): boolean {
  return soundOn;
}

export function loadSoundPreference(): boolean {
  if (typeof window === "undefined") return false;
  soundOn = window.localStorage.getItem(PREF_KEY) === "on";
  return soundOn;
}

export function setSoundEnabled(on: boolean): void {
  soundOn = on;
  if (typeof window !== "undefined") {
    window.localStorage.setItem(PREF_KEY, on ? "on" : "off");
  }
}

interface Tone {
  freq: number;
  /** seconds */
  duration: number;
  type?: OscillatorType;
  /** seconds after cue start */
  delay?: number;
  gain?: number;
  /** glide to this frequency over the duration */
  glideTo?: number;
}

function play(tones: Tone[]): void {
  if (!soundOn) return;
  const audio = getContext();
  if (!audio) return;
  const now = audio.currentTime;
  for (const t of tones) {
    const start = now + (t.delay ?? 0);
    const osc = audio.createOscillator();
    const gain = audio.createGain();
    osc.type = t.type ?? "sine";
    osc.frequency.setValueAtTime(t.freq, start);
    if (t.glideTo) osc.frequency.exponentialRampToValueAtTime(t.glideTo, start + t.duration);
    const peak = t.gain ?? 0.06;
    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(peak, start + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + t.duration);
    osc.connect(gain).connect(audio.destination);
    osc.start(start);
    osc.stop(start + t.duration + 0.05);
  }
}

/** Soft high tick for hovers. */
export function playHover(): void {
  play([{ freq: 1320, duration: 0.06, type: "triangle", gain: 0.028 }]);
}

/** Two-note confirm chime for clicks/selections. */
export function playConfirm(): void {
  play([
    { freq: 660, duration: 0.09, type: "sine" },
    { freq: 990, duration: 0.14, type: "sine", delay: 0.07 },
  ]);
}

/** Rising whoosh for page transitions. */
export function playTransition(): void {
  play([{ freq: 220, glideTo: 880, duration: 0.22, type: "sine", gain: 0.045 }]);
}

/** Toggle blip. */
export function playToggle(on: boolean): void {
  play([{ freq: on ? 520 : 400, glideTo: on ? 780 : 260, duration: 0.12, type: "triangle" }]);
}
