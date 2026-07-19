import { createFileRoute } from "@tanstack/react-router";
import { SlateFrame } from "~/components/SlateFrame";
import { MarkdownDoc } from "~/components/MarkdownDoc";
import speciesResearch from "../../../docs/species-research.md?raw";

export const Route = createFileRoute("/codex/species")({
  component: SpeciesCodexPage,
  head: () => ({
    meta: [{ title: "A Natural History of Hyrule | Codex | Chronicle Slate" }],
  }),
});

function SpeciesCodexPage() {
  return (
    <SlateFrame>
      <div className="codex-reader">
        <MarkdownDoc source={speciesResearch} />
      </div>
    </SlateFrame>
  );
}
