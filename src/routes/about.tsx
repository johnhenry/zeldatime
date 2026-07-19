import { createFileRoute } from "@tanstack/react-router";
import { SlateFrame } from "~/components/SlateFrame";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [{ title: "About | Chronicle Slate" }],
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
          Every visual element here — the frame chrome, iconography, color palettes, and
          typography — is an original design inspired by patterns observed while researching
          Zelda's UI language. No screenshots, logos, or assets from any Nintendo product are used
          anywhere on this site or in its source code.
        </p>
        <p>
          This project is not affiliated with, endorsed by, or sponsored by Nintendo. The Legend
          of Zelda and all related properties are trademarks of Nintendo.
        </p>
      </article>
    </SlateFrame>
  );
}
