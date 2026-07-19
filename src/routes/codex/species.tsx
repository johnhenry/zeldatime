import { createFileRoute } from "@tanstack/react-router";
import { SlateFrame } from "~/components/SlateFrame";
import { MarkdownDoc } from "~/components/MarkdownDoc";
import { pageMeta } from "~/lib/site";
import speciesResearch from "../../../docs/species-research.md?raw";

export const Route = createFileRoute("/codex/species")({
  component: SpeciesCodexPage,
  head: () => ({
    meta: pageMeta(
      "A Natural History of Hyrule | Codex | Chronicle Slate",
      "Zora into Rito, Kokiri into Korok — how Nintendo uses species evolution as its timeline's clock.",
      "/codex/species"
    ),
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
