import { createFileRoute } from "@tanstack/react-router";
import { SlateFrame } from "~/components/SlateFrame";
import { BarChart } from "~/components/charts/BarChart";
import { releasesByDecade, gamesPerBranch, canonicitySplit, platformFamilies, longestGap } from "~/data/stats";
import { games } from "~/data/games";
import { pageMeta } from "~/lib/site";

export const Route = createFileRoute("/stats")({
  component: StatsPage,
  head: () => ({
    meta: pageMeta("Stats & Trivia | Chronicle Slate", "The Zelda timeline by the numbers.", "/stats"),
  }),
});

function StatsPage() {
  const gap = longestGap();

  return (
    <SlateFrame>
      <div className="section-page stats-page">
        <h1>Stats &amp; Trivia</h1>
        <p className="section-page__intro">The chronicle by the numbers — {games.length} games across four decades.</p>

        <div className="stats-callouts">
          <div className="stat-callout panel">
            <span className="stat-callout__value">{games.length}</span>
            <span className="stat-callout__label">games chronicled</span>
          </div>
          <div className="stat-callout panel">
            <span className="stat-callout__value">3+1</span>
            <span className="stat-callout__label">official branches, plus a fork Nintendo won't discuss</span>
          </div>
          <div className="stat-callout panel">
            <span className="stat-callout__value">{gap.years} yrs</span>
            <span className="stat-callout__label">
              longest canon release gap ({gap.from} → {gap.to})
            </span>
          </div>
          <div className="stat-callout panel">
            <span className="stat-callout__value">4</span>
            <span className="stat-callout__label">titles with no official chart placement</span>
          </div>
        </div>

        <div className="stats-charts">
          <BarChart title="Releases by decade" data={releasesByDecade()} color="var(--accent-amber)" />
          <BarChart title="Games per branch" data={gamesPerBranch()} />
          <BarChart title="Canonicity" data={canonicitySplit()} />
          <BarChart title="Platform families" data={platformFamilies()} color="var(--accent-cyan)" />
        </div>
      </div>
    </SlateFrame>
  );
}
