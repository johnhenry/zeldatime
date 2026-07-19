import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useMemo, useState } from "react";
import { SlateFrame } from "~/components/SlateFrame";
import { TimelineDiagram } from "~/components/TimelineDiagram";
import { EraLegend } from "~/components/EraLegend";
import { FilterBar } from "~/components/FilterBar";
import { games } from "~/data/games";
import type { Canonicity } from "~/types/game";

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
            Imprisonment.
          </p>
        </section>

        <EraLegend />

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
      </div>

      {/* Full-bleed: the diagram deserves the whole viewport, not the 1100px column. */}
      <div className="timeline-bleed">
        <TimelineDiagram games={filteredGames} />
      </div>
    </SlateFrame>
  );
}
