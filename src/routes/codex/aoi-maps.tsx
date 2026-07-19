import { createFileRoute } from "@tanstack/react-router";
import { SlateFrame } from "~/components/SlateFrame";
import { MarkdownDoc } from "~/components/MarkdownDoc";
import { IconKey } from "~/components/IconKey";
import { pageMeta } from "~/lib/site";
import aoiMapsResearch from "../../../docs/aoi-maps-research.md?raw";

export const Route = createFileRoute("/codex/aoi-maps")({
  component: AoiMapsCodexPage,
  head: () => ({
    meta: pageMeta(
      "The Maps of the Imprisoning War | Codex | Chronicle Slate",
      "Age of Imprisonment's HUD, minimap, and menus, element by element — closing our own earlier open question.",
      "/codex/aoi-maps"
    ),
  }),
});

function AoiMapsCodexPage() {
  return (
    <SlateFrame>
      <div className="codex-reader">
        <IconKey paper="aoi-maps" />
        <MarkdownDoc source={aoiMapsResearch} />
      </div>
    </SlateFrame>
  );
}
