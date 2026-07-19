# Working agreement — zeldatime / Chronicle Slate

This is a fan-made, non-commercial research + web project mapping the Legend of Zelda timeline.
See `ARCHITECTURE.md` for how the app fits together and `PLAN.md` for why it was built this way.

## Hard rules

- **No Nintendo assets stored in the repo.** Game box art is allowed but only as HOTLINKED URLs
  (Wikipedia/upload.wikimedia.org preferred) kept in `src/data/games.ts` — never downloaded into
  `public/` or committed to history. The interface itself (chrome, icons, fonts, palettes) stays
  100% original, derived from `docs/ui-research.md`. Every page that shows box art must keep the
  identification-and-commentary attribution in the footer/about disclaimers intact.
- **Data is truth, components are projections.** Game/timeline facts belong in `src/data/*.ts`,
  never hardcoded in a component.
- **The Codex mirrors the docs, always.** `docs/lore-research.md` and `docs/ui-research.md` are
  canonical. The in-app Codex renders them via `?raw` import — never duplicate their content
  elsewhere in `src/`.
- **Ambiguous titles need sourcing.** Breath of the Wild, Tears of the Kingdom, Age of Calamity,
  and Age of Imprisonment aren't on Nintendo's official timeline chart. Every claim about their
  placement needs a `placementConfidence` rating and, if not `"official"`, a `sourcingNotes`
  explanation citing the actual community/dev reasoning.

## Before shipping a change

`npm run build` must pass clean (it runs `tsc --noEmit`). For anything touching the timeline
diagram or Codex, verify visually — a build passing doesn't mean the SVG layout is legible.
