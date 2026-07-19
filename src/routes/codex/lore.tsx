import { createFileRoute } from "@tanstack/react-router";
import { SlateFrame } from "~/components/SlateFrame";
import { MarkdownDoc } from "~/components/MarkdownDoc";
import { pageMeta } from "~/lib/site";
import loreResearch from "../../../docs/lore-research.md?raw";

export const Route = createFileRoute("/codex/lore")({
  component: LoreCodexPage,
  head: () => ({
    meta: pageMeta(
      "The Zelda Timeline | Codex | Chronicle Slate",
      "The official three-branch mythology, and where the newest games actually fit — a sourced research paper.",
      "/codex/lore"
    ),
  }),
});

function LoreCodexPage() {
  return (
    <SlateFrame>
      <div className="codex-reader">
        <MarkdownDoc source={loreResearch} />
      </div>
    </SlateFrame>
  );
}
