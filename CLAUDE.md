# Working agreement — zeldatime / Chronicle Slate

This is a fan-made, non-commercial research + web project mapping the Legend of Zelda timeline.
See `ARCHITECTURE.md` for how the app fits together and `PLAN.md` for why it was built this way.

## Hard rules

- **No copied Nintendo assets, ever.** No screenshots, ripped sprites, logos, or fonts from any
  Zelda/Nintendo product — in the app, in `public/`, or in commit history. All visuals are
  original, inspired-by interpretations derived from `docs/ui-research.md`. If you're about to
  add an image, ask: did I make this, or did it come from a game/wiki/fan-art source? Only the
  former is allowed.
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
