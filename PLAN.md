# PLAN — Chronicle Slate (zeldatime)

## Context

Nintendo's official Hyrule Historia timeline (the three-branch split following *Ocarina of Time*) hasn't been updated in years, leaving *Breath of the Wild*, *Tears of the Kingdom*, *Hyrule Warriors: Age of Calamity* (semi-canon, and itself an *OoT*-style divergence point), and *Hyrule Warriors: Age of Imprisonment* without an official place on the timeline. The goal is to (1) properly research both the lore/timeline question and the Switch-era UI/menu design language (with extra focus on Age of Calamity/Age of Imprisonment's maps and menus, and what players/critics actually say about them), then (2) build a slick, original, Nintendo-quality interactive timeline app whose own visual design is *inspired by* that UI research (never copying actual assets), deployed live at `zeldatime.johnhenry.me` with a public repo at `github.com/johnhenry/zeldatime`.

> **Correction (post-research):** at planning time this doc described Age of Imprisonment as an unreleased "2026 prequel." Deep research during implementation found it actually shipped November 6, 2025 on Switch 2 and has already been reviewed — see `docs/ui-research.md` and `docs/lore-research.md` for the corrected, sourced account.

**User decisions locked in:**
- Visual design: 100% original, no ripped screenshots/logos/assets — inspired-by only.
- Stack: TanStack Start (SSR), matching the live `animal-town.johnhenry.me` precedent.
- Game scope: full canon, ~24 games (mainline console + handheld + CD-i non-canon + Switch-era ambiguous titles).
- Research delivery: both `docs/*.md` in the repo **and** an in-app "Codex" reading section, kept in sync via `?raw` import (no duplication).

## Precedent to clone (verified)

`~/Projects/animal-town` is the exact TanStack Start pattern: `package.json` (Node ≥22.12, `@tanstack/react-router` ^1.144, `@tanstack/react-start` ^1.145, React 19, `srvx` ^0.10; devDeps `vite` ^7, `vite-tsconfig-paths`, `typescript` ^5.7; scripts `dev: vite`, `build: vite build && tsc --noEmit`, `start: node server.js`), `server.js` (srvx bound to `0.0.0.0`, `serveStatic` on `dist/client`, `PORT||3000`), `vite.config.ts` (`tsconfigPaths() + tanstackStart() + react()`), `nixpacks.toml`/`Procfile`/`.node-version` (pinned `nodejs_24`), `src/router.tsx` exporting `getRouter()`, file-based routes with `$slug` detail pages and `head()` meta, typed `src/data/*.ts` tables with `getBySlug`/`getRelated` helpers, URL-search-param filtering via `validateSearch`.

`~/Projects/rpg-roguelite` supplies the doc-layering convention (`CLAUDE.md` + `ARCHITECTURE.md` + `PLAN.md` + `docs/`) and the "truth lives in plain data, renderers are projections" principle — the timeline diagram and Codex are pure projections of `src/data/*.ts`.

## Deployment facts (already confirmed, no exploration needed)

`*.johnhenry.me` wildcard-routes through nginx (8080) → Dokku (8000); **no nginx/Cloudflare edits needed** for `zeldatime`. Standard flow: `dokku apps:create zeldatime` → `dokku domains:add zeldatime zeldatime.johnhenry.me` → `dokku ports:add zeldatime http:80:3000` → `git remote add dokku dokku:zeldatime && git push dokku main`. GitHub repo creation is a manual step not covered by the project-creation skill: `gh repo create johnhenry/zeldatime --public --source=. --push`.

## Implementation Plan

### Phase 1 — Research (parallel)
Run the `deep-research` skill twice, concurrently:
- **Lore run**: official three-branch timeline era-by-era, per-game canonical placement across all ~24 games, plus a dedicated cited investigation into community/forum placement reasoning for BOTW, TOTK, Age of Calamity, and Age of Imprisonment (Nintendo hasn't ruled). Require sourcing + confidence notes on every ambiguous placement.
- **UI/UX run**: Switch & Switch 2 Zelda menu/map UI broadly, with extra depth on Age of Calamity and Age of Imprisonment maps/menus — synthesize player/critic/forum sentiment (Sheikah Slate, Purah Pad, quest logs, map pins, stamina wheel, rune radial, chrome/typography/iconography feel). End with explicit "design implications for an original app" notes (palette cues, motion, chrome shapes) — for inspiration, never asset reproduction.

### Phase 2 — Content synthesis (sequential, depends on Phase 1)
- `docs/lore-research.md` — polished long-form paper from the lore run, era-by-era, with a dedicated ambiguous-titles section and inline sourcing.
- `docs/ui-research.md` — polished long-form paper from the UI run, ending in the design-implications bridge to Phase 4.
- `src/data/games.ts` — typed table, one row per game: `id`, `title`, `releaseDate`, `platform`, `era` (SkywardOrigin/EraOfCreation/HeroOfTime/EraOfDecline/EraOfProsperity/Reawakening/NonCanon), `branch` (child/adult/downfall/converged/pre-split/botw-era/non-canon), `synopsis`, `trivia[]`, `canonicity` (canon/semi-canon/non-canon), `placementConfidence` (official/strong-community/speculative), `sourcingNotes?`.
- `src/data/timeline.ts` — branch/era graph (nodes = eras/split points, edges = branches) driving the diagram, data-only.
- Scope list (~24): Skyward Sword, Minish Cap, Four Swords, Ocarina of Time, Majora's Mask, Twilight Princess, Four Swords Adventures, Wind Waker, Phantom Hourglass, Spirit Tracks, A Link to the Past, Oracle of Seasons, Oracle of Ages, Link's Awakening, A Link Between Worlds, Tri Force Heroes, original Legend of Zelda, Adventure of Link, Breath of the Wild, Tears of the Kingdom, Age of Calamity, Age of Imprisonment, plus CD-i titles flagged non-canon.

### Phase 3 — Original visual design system
Derived only from `ui-research.md` findings, zero copied assets. "Chronicle Slate" chrome concept: an original HUD-frame motif (rounded-rect bezel, corner nodes, luminous rule lines, faint rune/circuit texture) evoking — never copying — the Sheikah-Slate/Purah-Pad framing. Bespoke per-era color palette (CSS custom properties, contrast-checked via the `dataviz` skill's validator) drives both diagram edges and cards. Original display+body font pairing, original hand-drawn SVG icon set (branch markers, era seals, confidence indicators). Subtle motion (edge draw-on, slate-boot transitions, reduced-motion respected).

### Phase 4 — App architecture (TanStack Start)
Timeline diagram: **SVG path-based branch diagram** (d3-shape/d3-scale for layout, React-controlled SVG rendering) — the only approach that legibly shows simultaneous parallel branches (the OoT 3-way split, the AoC divergence) with crisp accessible text, per-era coloring, animated edges, zoom/pan.

Routes (`src/routes/`, file-based):
- `__root.tsx` — Chronicle Slate chrome shell + nav.
- `index.tsx` — Timeline landing: interactive branch diagram, era/branch/canonicity filters via `validateSearch`, click-through to detail.
- `game/$slug.tsx` — full detail: synopsis, era/branch badges, trivia, canonicity + placement-confidence + sourcing notes (prominent for ambiguous titles), related-games links.
- `codex/index.tsx`, `codex/lore.tsx`, `codex/ui.tsx` — render `docs/*.md` via Vite `?raw` import + `react-markdown`/`remark-gfm` inside the reading frame, with generated TOC. This keeps repo docs and in-app Codex identical with zero duplication.
- `about.tsx` — project blurb + explicit "fan project, original art, not affiliated with Nintendo" disclaimer.

Components (`src/components/`): `SlateFrame`, `Nav`, `TimelineDiagram`, `BranchPath`, `EraLegend`, `GameNode`, `GameCard`, `FilterBar`, `ConfidenceBadge`, `MarkdownDoc`, `Footer`. All are pure projections of `src/data/*.ts` — no game facts hardcoded in components.

### Phase 5 — Repo structure (`~/Projects/zeldatime`)
```
zeldatime/
  CLAUDE.md ARCHITECTURE.md PLAN.md README.md
  docs/lore-research.md docs/ui-research.md
  package.json vite.config.ts tsconfig.json server.js
  nixpacks.toml Procfile .node-version .gitignore
  public/styles.css public/fonts/ public/icons/
  src/router.tsx src/routeTree.gen.ts
  src/routes/ (__root, index, game/$slug, codex/*, about)
  src/components/ src/data/ src/types/ src/lib/
```
Clone animal-town's build spine verbatim (package.json baseline + add `react-markdown`, `remark-gfm`, `d3-shape`, `d3-scale`; vite.config; tsconfig `~/*` alias; server.js; nixpacks.toml; Procfile; `.node-version`; router.tsx).

### Phase 6 — Sequenced task list
1. [Parallel] Lore research + UI research (Phase 1).
2. [Sequential] Synthesize both `docs/*.md` + extract `data/games.ts` + `data/timeline.ts` (Phase 2).
3. [Sequential] Scaffold app from animal-town baseline, `git init -b main` (Phase 5).
4. [Parallel] Design system (Phase 3) + data/type wiring.
5. [Sequential] Build routes/components (Phase 4).
6. [Sequential] Local verification: `npm run build` (gate — runs `tsc --noEmit`), `npm run dev`, agent-browser screenshots of `/`, a game detail, `codex/lore`, `codex/ui`.
7. [Sequential] Author `CLAUDE.md`/`ARCHITECTURE.md`/`PLAN.md`/`README.md`.
8. [Sequential] `gh repo create johnhenry/zeldatime --public --source=. --push`.
9. [Sequential] Dokku deploy (commands above).
10. [Sequential] Live verification.

### Verification
**Local:** `npm run build` must pass clean. Agent-browser screenshots confirm the diagram renders all ~24 nodes with visually distinct branches and a legend, a game detail page renders correctly, and both Codex pages render their markdown with headings/TOC. Spot-check every game has a reachable detail route and ambiguous titles show confidence + sourcing notes, and the diagram visibly shows both the OoT 3-way split and the AoC divergence.

**Live:** `curl -sI https://zeldatime.johnhenry.me/` → 200; curl a `game/<slug>` route and both `/codex/*` routes for content. Agent-browser screenshots of the live site (fonts/icons/styling loading correctly over the wildcard route). Confirm `github.com/johnhenry/zeldatime` is public with `docs/*.md` present.

### Open implementation notes (already decided, not requiring further user input)
- Codex renders via Vite `?raw` import of `docs/*.md` (zero drift) rather than a copy step.
- Diagram built with `d3-shape`/`d3-scale` for path math, rendered as React-controlled SVG (not d3-managed DOM).
