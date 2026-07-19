/**
 * Shared SVG <defs> mounted once in SlateFrame. Other SVGs reference these
 * by id, e.g. filter="url(#fx-glow-cyan)". Keeping glow in the SVG filter
 * layer (not CSS transforms) preserves the diagram's hover-stability rule.
 */
export function TechTexture() {
  return (
    <svg aria-hidden="true" focusable="false" style={{ position: "absolute", width: 0, height: 0 }}>
      <defs>
        <filter id="fx-glow-cyan" x="-60%" y="-60%" width="220%" height="220%">
          <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#4fd1c5" floodOpacity="0.6" />
        </filter>
        <filter id="fx-glow-amber" x="-60%" y="-60%" width="220%" height="220%">
          <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#e8b24d" floodOpacity="0.6" />
        </filter>
        <filter id="fx-glow-soft" x="-60%" y="-60%" width="220%" height="220%">
          <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#4fd1c5" floodOpacity="0.35" />
        </filter>
        <linearGradient id="grad-holo" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#e8b24d" />
          <stop offset="100%" stopColor="#4fd1c5" />
        </linearGradient>
      </defs>
    </svg>
  );
}
