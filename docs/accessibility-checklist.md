# Accessibility: what's covered, and what still needs a human pass

This project does not claim a certified WCAG 2.1 AA audit. That requires real
assistive-technology testing (screen readers, switch devices, magnification)
that this session can't perform. What follows is an honest split: what was
verified with automated/heuristic tooling, and what a human still needs to
check before claiming full compliance.

## Done this pass (automated / heuristic)

- **Focus visibility**: a single consistent `:focus-visible` ring (2px cyan,
  offset) applied to links, buttons, tabbable elements, form controls, and —
  via `outline` rather than `transform`, respecting the diagram's
  no-CSS-transform rule — the timeline's SVG nodes.
- **Keyboard access**: every interactive element that was previously
  mouse-only now has a keyboard path. The timeline diagram's scroll
  container is itself focusable and natively arrow-key-scrollable
  (`tabIndex`, `role="region"`, `aria-label`); individual timeline nodes
  already had `tabIndex`/`onKeyDown`/`role="link"`/`aria-label` from an
  earlier pass.
- **`aria-current="page"`** on the active nav link.
- **Color contrast**: every text/background pairing in the badge system was
  computed against the WCAG relative-luminance formula (not eyeballed). Two
  failures were found and fixed — `confidence-badge--speculative` (was
  ~3.1:1 against card backgrounds, now ~4.65:1) and
  `canonicity-badge--non-canon` (was ~3.7:1, now ~4.53:1) — via lightened
  variants used only for that badge text, so the shared `--era-downfall`/
  `--era-noncanon` branch colors used throughout the timeline diagram are
  unchanged. Everything else checked (confidence-badge--official,
  confidence-badge--strong-community, the default canonicity-badge) already
  passed comfortably (6.6:1–13:1).
- **Layout stability**: `aspect-ratio` reservations on hero art, essay
  images, and image-gallery tables reduce content jumping as hotlinked
  images load in.

## Not done — needs a real human pass

- **Screen reader testing** (VoiceOver, NVDA, JAWS): nothing in this project
  has been read aloud by an actual screen reader. The `aria-label`s,
  `role`s, and heading structure are reasoned about, not verified by ear.
  Priority pages to test first: the homepage timeline diagram (most complex
  interactive element), a game detail page, and the Codex reader.
- **Full keyboard-only pass**: confirm every interactive flow (filters,
  command palette when it ships, the vertical mobile timeline, chip
  navigation) is reachable and operable without a mouse, start to finish,
  by an actual human tabbing through — not just spot-checked elements.
- **Reduced-motion audit** beyond what's already covered: the site
  generally respects `prefers-reduced-motion` (scrollytelling, pixel
  walker, etc. already check for it), but a full sweep confirming *every*
  animation added since has a reduced-motion fallback hasn't been redone
  for the newest features in this pass.
- **Zoom/reflow testing**: confirm the site remains usable at 200% browser
  zoom and with text-only zoom, per WCAG 1.4.10.
- **Full contrast sweep beyond badges**: this pass specifically computed
  contrast for the badge system since it was the most likely offender
  (colored text on dark backgrounds). A complete sweep of every
  text/background pairing site-wide (chips, chart labels, footer text,
  disabled states) hasn't been done.
