import { createFileRoute } from "@tanstack/react-router";
import { SlateFrame } from "~/components/SlateFrame";
import { MarkdownDoc } from "~/components/MarkdownDoc";
import loreResearch from "../../../docs/lore-research.md?raw";

export const Route = createFileRoute("/codex/lore")({
  component: LoreCodexPage,
  head: () => ({
    meta: [{ title: "The Zelda Timeline | Codex | Chronicle Slate" }],
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
