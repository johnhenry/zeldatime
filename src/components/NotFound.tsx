import { Link } from "@tanstack/react-router";
import { SlateFrame } from "~/components/SlateFrame";

export function NotFound() {
  return (
    <SlateFrame>
      <div className="not-found">
        <svg viewBox="0 0 120 120" width="96" height="96" className="not-found__glyph" aria-hidden="true">
          <circle cx="60" cy="60" r="52" fill="none" stroke="var(--accent-amber-dim)" strokeWidth="2" strokeDasharray="6 6" opacity="0.5" />
          <path
            d="M40 45 Q60 30 80 45 M40 75 Q60 90 80 75"
            fill="none"
            stroke="var(--accent-cyan)"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.8"
          />
          <circle cx="46" cy="58" r="4" fill="var(--accent-amber)" />
          <circle cx="74" cy="58" r="4" fill="var(--accent-amber)" />
        </svg>
        <h1>Lost in the Lost Woods</h1>
        <p>
          Wrong turn — this path doesn't lead anywhere on the chronicle. Even Link needed the
          torch smoke to find his way back.
        </p>
        <div className="not-found__links">
          <Link to="/">Back to the Timeline</Link>
          <Link to="/explore">Explore the Codex</Link>
        </div>
      </div>
    </SlateFrame>
  );
}
