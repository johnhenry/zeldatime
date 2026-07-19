# Chronicle Slate — an interactive Legend of Zelda timeline

**Live:** https://zeldatime.johnhenry.me

An original, fan-made interactive map of the entire Legend of Zelda canon — from the Skyward
Sword origin point, through the three-way split at Ocarina of Time, to the still-officially-unplaced
Switch-era titles: Breath of the Wild, Tears of the Kingdom, Hyrule Warriors: Age of Calamity, and
Hyrule Warriors: Age of Imprisonment.

Backed by two long-form research papers, also readable in-app under **Codex**:

- [`docs/lore-research.md`](docs/lore-research.md) — the Zelda timeline, era by era, including a
  dedicated, cited investigation into how the community and Nintendo have discussed placing the
  newest, officially-unplaced titles.
- [`docs/ui-research.md`](docs/ui-research.md) — Switch and Switch 2 Zelda menu/map design, with
  extra depth on Age of Calamity and Age of Imprisonment, and the design-language observations
  that inspired this site's own original visual style.

## Originality & non-affiliation

The site's interface — frame chrome, iconography, typography, and color palettes — is an
original design inspired by patterns identified in `docs/ui-research.md`. Game box art is the
property of Nintendo and its licensors; it is hotlinked from public reference sources (Wikipedia
et al.) for identification and commentary, and no game assets are stored in this repository.
This project is not affiliated with, endorsed by, or sponsored by Nintendo. The Legend of Zelda
and all related properties are trademarks of Nintendo.

## Development

```sh
npm install
npm run dev      # http://localhost:5173
npm run build    # production build + typecheck
npm start         # run the production build (server.js)
```

See [`ARCHITECTURE.md`](ARCHITECTURE.md) for how the app fits together.
