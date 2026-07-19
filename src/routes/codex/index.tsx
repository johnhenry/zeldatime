import { createFileRoute, Link } from "@tanstack/react-router";
import { SlateFrame } from "~/components/SlateFrame";

export const Route = createFileRoute("/codex/")({
  component: CodexIndexPage,
  head: () => ({
    meta: [{ title: "Codex | Chronicle Slate" }],
  }),
});

function CodexIndexPage() {
  return (
    <SlateFrame>
      <div className="codex-index">
        <h1>The Codex</h1>
        <p>The research library underpinning this project — read every paper in full below.</p>
        <div className="codex-index__grid">
          <Link to="/codex/lore" className="codex-index__card">
            <h2>The Zelda Timeline</h2>
            <p>The official three-branch mythology, and where the newest games actually fit.</p>
          </Link>
          <Link to="/codex/ui" className="codex-index__card">
            <h2>Switch-Era UI &amp; Menu Design</h2>
            <p>
              What makes BOTW, TOTK, Age of Calamity, and Age of Imprisonment's menus and maps
              tick — and how it shaped this site's own design.
            </p>
          </Link>
          <Link to="/codex/unplaced" className="codex-index__card">
            <h2>The Unplaced Era</h2>
            <p>
              Nine years, four major games, zero chart updates — reading Nintendo's silence as a
              deliberate publishing strategy.
            </p>
          </Link>
          <Link to="/codex/species" className="codex-index__card">
            <h2>A Natural History of Hyrule</h2>
            <p>
              Zora into Rito, Kokiri into Korok — how Nintendo uses species evolution as its
              timeline's clock.
            </p>
          </Link>
          <Link to="/codex/aoi-maps" className="codex-index__card">
            <h2>The Maps of the Imprisoning War</h2>
            <p>
              A follow-up deep dive closing our own earlier open question: Age of Imprisonment's
              HUD, minimap, and menus, element by element — and an honest account of what still
              isn't documented anywhere.
            </p>
          </Link>
        </div>
      </div>
    </SlateFrame>
  );
}
