import { createFileRoute } from "@tanstack/react-router";
import { SlateFrame } from "~/components/SlateFrame";
import { MarkdownDoc } from "~/components/MarkdownDoc";
import { IconKey } from "~/components/IconKey";
import { pageMeta } from "~/lib/site";
import uiResearch from "../../../docs/ui-research.md?raw";

export const Route = createFileRoute("/codex/ui")({
  component: UiCodexPage,
  head: () => ({
    meta: pageMeta(
      "Switch-Era UI & Menu Design | Codex | Chronicle Slate",
      "What makes BOTW, TOTK, Age of Calamity, and Age of Imprisonment's menus and maps tick — and how it shaped this site's own design.",
      "/codex/ui"
    ),
  }),
});

function UiCodexPage() {
  return (
    <SlateFrame>
      <div className="codex-reader">
        <IconKey paper="ui" />
        <MarkdownDoc source={uiResearch} />
      </div>
    </SlateFrame>
  );
}
