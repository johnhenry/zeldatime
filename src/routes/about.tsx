import { createFileRoute } from "@tanstack/react-router";
import { SlateFrame } from "~/components/SlateFrame";
import { pageMeta } from "~/lib/site";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: pageMeta(
      "About | Chronicle Slate",
      "An unofficial, fan-made research project about the Legend of Zelda timeline — original design, sourced content.",
      "/about"
    ),
  }),
});

function AboutPage() {
  return (
    <SlateFrame>
      <article className="about-page">
        <h1>About Chronicle Slate</h1>
        <p>
          Chronicle Slate is an independent, fan-made research project mapping the full Legend of
          Zelda timeline — including the officially unplaced Switch-era titles — as an interactive
          diagram, alongside two long-form research papers on the series' lore and its Switch-era
          menu and map design.
        </p>
        <p>
          The site's interface — the frame chrome, iconography, color palettes, and typography —
          is an original design inspired by patterns observed while researching Zelda's UI
          language. Game box art shown throughout is the property of Nintendo and its licensors,
          hotlinked from public reference sources and displayed for identification and commentary;
          no game assets are stored in this project's source code.
        </p>
        <p>
          This project is not affiliated with, endorsed by, or sponsored by Nintendo. The Legend
          of Zelda and all related properties are trademarks of Nintendo.
        </p>
      </article>
    </SlateFrame>
  );
}
