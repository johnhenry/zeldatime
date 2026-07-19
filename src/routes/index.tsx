import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useMemo, useState } from "react";
import { SlateFrame } from "~/components/SlateFrame";
import { TimelineDiagram, type TimelineMode } from "~/components/TimelineDiagram";
import { VerticalTimeline } from "~/components/VerticalTimeline";
import { TimelineScrolly } from "~/components/scrolly/TimelineScrolly";
import { EraLegend } from "~/components/EraLegend";
import { FilterBar } from "~/components/FilterBar";
import { games } from "~/data/games";
import type { Canonicity } from "~/types/game";
import { playConfirm } from "~/lib/sound";

type SearchParams = {
  branch?: string;
  canonicity?: string;
};

export const Route = createFileRoute("/")({
  component: HomePage,
  validateSearch: (search: Record<string, unknown>): SearchParams => ({
    branch: search.branch as string | undefined,
    canonicity: search.canonicity as string | undefined,
  }),
});

function HomePage() {
  const search = Route.useSearch();

  const [branch, setBranch] = useState(search.branch ?? "all");
  const [canonicity, setCanonicity] = useState<Canonicity | "all">(
    (search.canonicity as Canonicity | "all") ?? "all"
  );
  const [mode, setMode] = useState<TimelineMode>("story");

  const filteredGames = useMemo(
    () =>
      games.filter(
        (g) => (branch === "all" || g.branch === branch) && (canonicity === "all" || g.canonicity === canonicity)
      ),
    [branch, canonicity]
  );

  const syncUrl = useCallback((nextBranch: string, nextCanonicity: string) => {
    const params = new URLSearchParams();
    if (nextBranch !== "all") params.set("branch", nextBranch);
    if (nextCanonicity !== "all") params.set("canonicity", nextCanonicity);
    const q = params.toString();
    window.history.replaceState(null, "", q ? `/?${q}` : "/");
  }, []);

  return (
    <SlateFrame>
      <div className="container">
        <section className="hero">
          <h1>The Zelda Chronicle</h1>
          <p>
            An interactive map of every Legend of Zelda game — from the Skyward Sword origin
            point through the three-way split at Ocarina of Time, to the still-unofficial
            placement of Breath of the Wild, Tears of the Kingdom, Age of Calamity, and Age of
            Imprisonment. Scroll to walk the eras, or jump to the full chart below.
          </p>
        </section>
      </div>

      <TimelineScrolly />

      <div className="container">
        <div className="chart-divider">
          <h2 className="section-title">Explore the full chart</h2>
          <p>Every game, every branch, filterable — the complete chronicle at once.</p>
        </div>

        <EraLegend />

        <div className="chart-controls">
          <FilterBar
            branch={branch}
            canonicity={canonicity}
            onBranchChange={(b) => {
              setBranch(b);
              syncUrl(b, canonicity);
            }}
            onCanonicityChange={(c) => {
              setCanonicity(c);
              syncUrl(branch, c);
            }}
            onClearAll={() => {
              setBranch("all");
              setCanonicity("all");
              window.history.replaceState(null, "", "/");
            }}
            resultCount={filteredGames.length}
          />

          <div className="timeline-mode-toggle" role="group" aria-label="Timeline ordering">
            <button
              type="button"
              className={mode === "story" ? "active" : ""}
              aria-pressed={mode === "story"}
              onClick={() => {
                playConfirm();
                setMode("story");
              }}
            >
              Story order
            </button>
            <button
              type="button"
              className={mode === "release" ? "active" : ""}
              aria-pressed={mode === "release"}
              onClick={() => {
                playConfirm();
                setMode("release");
              }}
            >
              Release order
            </button>
          </div>
        </div>
      </div>

      {/* Full-bleed: the diagram deserves the whole viewport, not the 1100px column.
          Both orientations render; CSS media queries pick one (SSR-safe, no flash). */}
      <div className="timeline-bleed">
        <TimelineDiagram games={filteredGames} mode={mode} />
        <VerticalTimeline games={filteredGames} />
      </div>
    </SlateFrame>
  );
}
