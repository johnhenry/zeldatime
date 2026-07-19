import { createFileRoute } from "@tanstack/react-router";
import { SlateFrame } from "~/components/SlateFrame";
import { MarkdownDoc } from "~/components/MarkdownDoc";
import uiResearch from "../../../docs/ui-research.md?raw";

export const Route = createFileRoute("/codex/ui")({
  component: UiCodexPage,
  head: () => ({
    meta: [{ title: "Switch-Era UI & Menu Design | Codex | Chronicle Slate" }],
  }),
});

function UiCodexPage() {
  return (
    <SlateFrame>
      <div className="codex-reader">
        <MarkdownDoc source={uiResearch} />
      </div>
    </SlateFrame>
  );
}
