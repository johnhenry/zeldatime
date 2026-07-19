import { createFileRoute } from "@tanstack/react-router";
import { SlateFrame } from "~/components/SlateFrame";
import { MarkdownDoc } from "~/components/MarkdownDoc";
import aoiMapsResearch from "../../../docs/aoi-maps-research.md?raw";

export const Route = createFileRoute("/codex/aoi-maps")({
  component: AoiMapsCodexPage,
  head: () => ({
    meta: [{ title: "The Maps of the Imprisoning War | Codex | Chronicle Slate" }],
  }),
});

function AoiMapsCodexPage() {
  return (
    <SlateFrame>
      <div className="codex-reader">
        <MarkdownDoc source={aoiMapsResearch} />
      </div>
    </SlateFrame>
  );
}
