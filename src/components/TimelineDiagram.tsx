import { useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { line as d3line, curveMonotoneX, curveBasis } from "d3-shape";
import type { Game } from "~/types/game";
import { branches, getBranch } from "~/data/timeline";

const LANE_ORDER = [
  "pre-split",
  "child",
  "adult",
  "downfall",
  "botw-era",
  "aoc-divergence",
  "ancient-imprisonment",
  "non-canon",
] as const;

const LANE_HEIGHT = 132;
// Must clear a label + year drawn above a top-lane node: ring(30) + label(20) + year(15) + ascender.
const TOP_PADDING = 96;
// Left gutter holds the lane's branch label so branch identity doesn't rely on the legend alone.
const GUTTER = 250;
const RIGHT_PADDING = 110;
const NODE_SPACING = 178;
const ART_RADIUS = 26;

// Compact lane labels for the gutter — full labels live in the legend and branch data.
const LANE_LABELS: Record<string, string> = {
  "pre-split": "SHARED TRUNK",
  child: "CHILD TIMELINE",
  adult: "ADULT TIMELINE",
  downfall: "DOWNFALL TIMELINE",
  "botw-era": "DISTANT FUTURE",
  "aoc-divergence": "ALTERNATE HISTORY",
  "ancient-imprisonment": "IMPRISONING WAR",
  "non-canon": "NON-CANON (CD-i)",
};

interface Point {
  x: number;
  y: number;
  game: Game;
}

export function TimelineDiagram({ games }: { games: Game[] }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState<string | null>(null);

  // Only branches that actually have games (after filtering) get a lane, so
  // filtered views compact vertically instead of leaving dead bands.
  const activeLanes = useMemo(() => {
    const withGames = new Set(games.map((g) => g.branch));
    return LANE_ORDER.filter((id) => withGames.has(id));
  }, [games]);

  const laneY = useMemo(() => {
    const map = new Map<string, number>();
    activeLanes.forEach((id, i) => map.set(id, TOP_PADDING + i * LANE_HEIGHT));
    return map;
  }, [activeLanes]);

  // Lay branches out in dependency order: a branch with a parent starts right
  // where its parent's last node lands, so forks read as a short local step
  // rather than a scale-driven diagonal. Branches with no parent — the trunk,
  // the officially-unplaced modern titles, and non-canon — all start at the
  // gutter edge; their lane label carries the "unconnected" semantics, and
  // keeping them left means the first screenful shows every branch.
  const pointsByBranch = useMemo(() => {
    const map = new Map<string, Point[]>();
    const branchEndX = new Map<string, number>();

    for (const branch of branches) {
      const branchGames = games
        .filter((g) => g.branch === branch.id)
        .sort((a, b) => a.timelineOrder - b.timelineOrder);
      const y = laneY.get(branch.id) ?? TOP_PADDING;

      const startX =
        branch.parent && branchEndX.has(branch.parent)
          ? (branchEndX.get(branch.parent) ?? GUTTER) + NODE_SPACING
          : GUTTER;

      const points = branchGames.map((g, i) => ({ x: startX + i * NODE_SPACING, y, game: g }));
      map.set(branch.id, points);

      if (points.length > 0) {
        branchEndX.set(branch.id, points[points.length - 1].x);
      }
    }

    return map;
  }, [games, laneY]);

  const width = useMemo(() => {
    let maxX = GUTTER;
    for (const points of pointsByBranch.values()) {
      for (const p of points) maxX = Math.max(maxX, p.x);
    }
    return maxX + RIGHT_PADDING;
  }, [pointsByBranch]);

  const height = TOP_PADDING + activeLanes.length * LANE_HEIGHT;

  const lineGen = d3line<Point>()
    .x((d) => d.x)
    .y((d) => d.y)
    .curve(curveMonotoneX);

  const forkGen = d3line<{ x: number; y: number }>()
    .x((d) => d.x)
    .y((d) => d.y)
    .curve(curveBasis);

  if (games.length === 0) {
    return (
      <div className="timeline-diagram-wrap">
        <p style={{ color: "var(--slate-400)" }}>No games match the current filters.</p>
      </div>
    );
  }

  return (
    <div className="timeline-diagram-wrap">
      {/* Rendered at native pixel size inside a horizontally scrollable wrap:
          scaling the whole SVG down to container width made every label
          unreadably small. */}
      <svg
        className="timeline-diagram"
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        role="img"
        aria-label="Interactive Legend of Zelda timeline, branching by era"
      >
        <defs>
          <clipPath id="art-clip">
            <circle r={ART_RADIUS} cx={0} cy={0} />
          </clipPath>
        </defs>

        {/* Lane gutter: label + faint guide rule per active branch. */}
        {branches.map((branch) => {
          const y = laneY.get(branch.id);
          if (y === undefined || !(pointsByBranch.get(branch.id) ?? []).length) return null;
          return (
            <g key={`lane-${branch.id}`}>
              <line
                x1={18}
                x2={width - 40}
                y1={y}
                y2={y}
                stroke={branch.color}
                strokeWidth={1}
                opacity={0.1}
              />
              <text
                x={18}
                y={y - 10}
                fontSize={11.5}
                fontWeight={600}
                letterSpacing={1.2}
                fill={branch.color}
                opacity={0.9}
              >
                {LANE_LABELS[branch.id] ?? branch.label.toUpperCase()}
              </text>
            </g>
          );
        })}

        {branches.map((branch) => {
          const points = pointsByBranch.get(branch.id) ?? [];
          if (points.length === 0) return null;
          const parent = branch.parent ? getBranch(branch.parent) : null;
          const parentPoints = parent ? pointsByBranch.get(parent.id) ?? [] : [];
          const forkOrigin = parentPoints.length > 0 ? parentPoints[parentPoints.length - 1] : null;

          return (
            <g key={branch.id}>
              {forkOrigin && (
                <path
                  d={
                    forkGen([
                      { x: forkOrigin.x, y: forkOrigin.y },
                      { x: (forkOrigin.x + points[0].x) / 2, y: (forkOrigin.y + points[0].y) / 2 },
                      { x: points[0].x, y: points[0].y },
                    ]) ?? undefined
                  }
                  className="timeline-branch-path"
                  stroke={branch.color}
                  strokeDasharray="5 5"
                  opacity={0.45}
                />
              )}
              {points.length > 1 && (
                <path
                  d={lineGen(points) ?? undefined}
                  className="timeline-branch-path timeline-branch-path--flow"
                  stroke={branch.color}
                  filter="url(#fx-glow-soft)"
                />
              )}
            </g>
          );
        })}

        {/* Nodes render after all paths so hovered art never sits under a line. */}
        {branches.map((branch) => {
          const points = pointsByBranch.get(branch.id) ?? [];
          return points.map((p, i) => {
            const isHovered = hovered === p.game.id;
            // Alternate labels above/below so long adjacent titles never collide.
            const labelAbove = i % 2 === 0;
            const labelY = labelAbove ? -(ART_RADIUS + 20) : ART_RADIUS + 26;

            return (
              <g
                key={p.game.id}
                className="timeline-node"
                transform={`translate(${p.x}, ${p.y})`}
                onClick={() => navigate({ to: "/game/$slug", params: { slug: p.game.id } })}
                onMouseEnter={() => setHovered(p.game.id)}
                onMouseLeave={() => setHovered((h) => (h === p.game.id ? null : h))}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") navigate({ to: "/game/$slug", params: { slug: p.game.id } });
                }}
                role="link"
                aria-label={`${p.game.title} (${p.game.releaseYear})`}
              >
                {/* Invisible hit area keeps hover stable while the visible ring animates. */}
                <circle r={ART_RADIUS + 10} fill="transparent" />

                {p.game.image ? (
                  <>
                    <circle
                      className="timeline-node__ring"
                      r={ART_RADIUS + 4}
                      fill="var(--slate-950)"
                      stroke={branch.color}
                      strokeWidth={isHovered ? 5 : 2.5}
                      strokeDasharray={p.game.canonicity === "non-canon" ? "4 3" : undefined}
                      opacity={p.game.placementConfidence === "speculative" && !isHovered ? 0.8 : 1}
                      filter={isHovered ? "url(#fx-glow-cyan)" : "url(#fx-glow-soft)"}
                    />
                    <image
                      href={p.game.image}
                      x={-ART_RADIUS}
                      y={-ART_RADIUS}
                      width={ART_RADIUS * 2}
                      height={ART_RADIUS * 2}
                      clipPath="url(#art-clip)"
                      preserveAspectRatio="xMidYMid slice"
                      style={{ pointerEvents: "none" }}
                    />
                  </>
                ) : (
                  <circle
                    className="timeline-node__dot"
                    r={isHovered ? 12 : 9}
                    fill={branch.color}
                    strokeDasharray={p.game.canonicity === "non-canon" ? "3 2" : undefined}
                    opacity={p.game.placementConfidence === "speculative" && !isHovered ? 0.7 : 1}
                  />
                )}

                <text
                  x={0}
                  y={labelY}
                  textAnchor="middle"
                  fontSize={13}
                  fontWeight={isHovered ? 700 : 500}
                  fill={isHovered ? "var(--slate-100)" : "var(--slate-200)"}
                >
                  {p.game.title}
                </text>
                <text
                  className="timeline-node__year"
                  x={0}
                  y={labelY + (labelAbove ? -15 : 15)}
                  textAnchor="middle"
                  fontSize={10.5}
                >
                  {p.game.releaseYear}
                </text>
              </g>
            );
          });
        })}
      </svg>
    </div>
  );
}
