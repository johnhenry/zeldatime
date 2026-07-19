import { createFileRoute } from "@tanstack/react-router";
import { SlateFrame } from "~/components/SlateFrame";
import { MarkdownDoc } from "~/components/MarkdownDoc";
import unplacedEra from "../../../docs/unplaced-era.md?raw";

export const Route = createFileRoute("/codex/unplaced")({
  component: UnplacedCodexPage,
  head: () => ({
    meta: [{ title: "The Unplaced Era | Codex | Chronicle Slate" }],
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
