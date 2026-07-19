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
        <p>Two research papers underpin this project — read them in full below.</p>
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
        </div>
      </div>
    </SlateFrame>
  );
}
