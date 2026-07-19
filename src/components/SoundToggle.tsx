import { useEffect, useState } from "react";
import { loadSoundPreference, setSoundEnabled, playToggle } from "~/lib/sound";

export function SoundToggle() {
  // SSR and first paint agree on "off"; the stored preference applies on mount.
  const [on, setOn] = useState(false);

  useEffect(() => {
    setOn(loadSoundPreference());
  }, []);

  const toggle = () => {
    const next = !on;
    setOn(next);
    setSoundEnabled(next);
    playToggle(next);
  };

  return (
    <button
      type="button"
      className={`sound-toggle ${on ? "sound-toggle--on" : ""}`}
      onClick={toggle}
      aria-pressed={on}
      aria-label={on ? "Turn interface sounds off" : "Turn interface sounds on"}
      title={on ? "Sound on" : "Sound off"}
    >
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" />
        {on ? (
          <>
            <path d="M16 8.5a5 5 0 0 1 0 7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M18.5 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </>
        ) : (
          <path d="M16 9l5 6M21 9l-5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        )}
      </svg>
    </button>
  );
}
