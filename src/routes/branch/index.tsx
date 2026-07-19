import { createFileRoute, Link } from "@tanstack/react-router";
import { SlateFrame } from "~/components/SlateFrame";
import { branches } from "~/data/timeline";
import { getGamesByBranch } from "~/data/games";
import { pageMeta } from "~/lib/site";

export const Route = createFileRoute("/branch/")({
  component: BranchHubPage,
  head: () => ({
    meta: pageMeta(
      "Timeline Branches | Chronicle Slate",
      "Eight histories, one per timeline lane — story arcs, fork points, and every game in order.",
      "/branch"
    ),
  }),
});

function BranchHubPage() {
  return (
    <SlateFrame>
      <div className="section-page">
        <h1>Timeline Branches</h1>
        <p className="section-page__intro">
          Eight distinct histories — one shared trunk, three official futures, one deliberately
          unplaced era, two alternate-history spin-offs, and one disowned appendix.
        </p>
        <div className="branch-grid">
          {branches.map((b) => {
            const count = getGamesByBranch(b.id).length;
            if (count === 0) return null;
            return (
              <Link key={b.id} to="/branch/$id" params={{ id: b.id }} className="branch-card panel">
                <span className="branch-card__rail" style={{ backgroundColor: b.color }} />
                <h2 style={{ color: b.color }}>{b.label}</h2>
                <p>{b.summary}</p>
                <span className="branch-card__count">
                  {count} game{count === 1 ? "" : "s"}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </SlateFrame>
  );
}
