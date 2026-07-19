import { createFileRoute } from "@tanstack/react-router";
import { SlateFrame } from "~/components/SlateFrame";
import { MarkdownDoc } from "~/components/MarkdownDoc";
import { pageMeta } from "~/lib/site";
import unplacedEra from "../../../docs/unplaced-era.md?raw";

export const Route = createFileRoute("/codex/unplaced")({
  component: UnplacedCodexPage,
  head: () => ({
    meta: pageMeta(
      "The Unplaced Era | Codex | Chronicle Slate",
      "Nine years, four major games, zero chart updates — reading Nintendo's silence as a deliberate publishing strategy.",
      "/codex/unplaced"
    ),
  }),
});

function UnplacedCodexPage() {
  return (
    <SlateFrame>
      <div className="codex-reader">
        <MarkdownDoc source={unplacedEra} />
      </div>
    </SlateFrame>
  );
}
