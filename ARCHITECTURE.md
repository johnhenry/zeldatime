# Architecture

Chronicle Slate is a TanStack Start (React SSR) app. Start here to understand how it fits together.

## Principle: data is truth, everything else is a projection

All game/timeline facts live in `src/data/games.ts` and `src/data/timeline.ts` as plain typed
tables (`src/types/game.ts`, `src/types/timeline.ts`). Components never hardcode game facts —
`TimelineDiagram`, `GameCard`, and the detail route are pure projections of that data. Adding a
game is a data-table row, not a new code path.

## The two research papers are one source of truth

`docs/lore-research.md` and `docs/ui-research.md` are the canonical research documents. The Codex
routes (`src/routes/codex/lore.tsx`, `src/routes/codex/ui.tsx`) import them directly via Vite's
`?raw` import and render them with `react-markdown` — there is no copy step, so the repo docs and
the in-app reading experience can never drift apart.

## Routing (file-based, `src/routes/`)

- `__root.tsx` — HTML shell, global `<head>` meta, loads `/styles.css` and font links, wraps
  everything in `SlateFrame`.
- `index.tsx` — the interactive timeline: `TimelineDiagram` (SVG branch diagram) + `FilterBar` +
  `EraLegend`, filter state synced to the URL via `validateSearch`.
- `game/$slug.tsx` — full detail page per game, including placement-confidence and sourcing notes
  for the four officially-unplaced titles (BOTW, TOTK, Age of Calamity, Age of Imprisonment).
- `codex/index.tsx`, `codex/lore.tsx`, `codex/ui.tsx` — the research-paper reading section.
- `about.tsx` — project scope + originality/non-affiliation disclaimer.

## The timeline diagram

`src/components/TimelineDiagram.tsx` lays games out as SVG: each `Branch` (see
`src/data/timeline.ts`) is a fixed horizontal lane; each game's `timelineOrder` (in-universe
chronological position, not release order) becomes its x-coordinate via a `d3-scale` linear scale.
`d3-shape`'s `line()` generator draws each branch's path; a dashed `curveBasis` stub connects a
branch to wherever its parent branch last had a game, visually rendering the Ocarina of Time
three-way split and the Age of Calamity divergence. Rendering is plain React-controlled SVG (no
d3-managed DOM), so it stays accessible and easy to reason about.

## Original design system, zero copied assets

`public/styles.css` defines the "Chronicle Slate" design language: an original HUD-frame chrome
(corner brackets, luminous rule lines), a bespoke per-branch color palette (CSS custom
properties), and a Cinzel/Inter font pairing (Google Fonts, OFL-licensed) — all derived from
`docs/ui-research.md`'s design-implications section, never from copied screenshots or logos. See
`about.tsx` and the footer for the explicit non-affiliation disclaimer.

## Build & deploy

Standard TanStack Start Nixpacks/Dokku spine, cloned from `~/Projects/animal-town`: `vite build`
produces `dist/client` + `dist/server`, `server.js` runs `srvx` bound to `0.0.0.0` on `PORT`
(default 3000), `nixpacks.toml` pins `nodejs_24`. No app-specific deployment quirks.
