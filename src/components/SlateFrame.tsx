import type { ReactNode } from "react";
import { Nav } from "~/components/Nav";
import { Footer } from "~/components/Footer";
import { TechTexture } from "~/components/TechTexture";

interface SlateFrameProps {
  children: ReactNode;
}

export function SlateFrame({ children }: SlateFrameProps) {
  return (
    <div className="slate-frame">
      <TechTexture />
      <div className="slate-frame__corner slate-frame__corner--tl" aria-hidden="true" />
      <div className="slate-frame__corner slate-frame__corner--tr" aria-hidden="true" />
      <div className="slate-frame__corner slate-frame__corner--bl" aria-hidden="true" />
      <div className="slate-frame__corner slate-frame__corner--br" aria-hidden="true" />
      <Nav />
      <div className="slate-frame__body">{children}</div>
      <Footer />
    </div>
  );
}
