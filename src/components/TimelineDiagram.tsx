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

const LANE_HEIGHT = 92;
const TOP_PADDING = 40;
const SIDE_PADDING = 90;
const NODE_SPACING = 150;
const NODE_RADIUS = 7;

const FLOATING_AFTER_PLACED = new Set(["botw-era", "aoc-divergence", "ancient-imprisonment"]);

interface Point {
  x: number;
  y: number;
  game: Game;
}

export function TimelineDiagram({ games }: { games: Game[] }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState<string | null>(null);

  const laneY = useMemo(() => {
    const map = new Map<string, number>();
    LANE_ORDER.forEach((id, i) => map.set(id, TOP_PADDING + i * LANE_HEIGHT));
    return map;
  }, []);

  // Lay branches out in dependency order: a branch with a parent starts right
  // where its parent's last node lands, so forks read as a short local step
  // rather than a scale-driven diagonal. The officially-unplaced titles
  // (BOTW-era, Age of Calamity, Age of Imprisonment) have no parent to fork
  // from, so they start together in their own column after the placed
  // branches end — grouped as "modern, unresolved" rather than piled at the
  // diagram's origin alongside the pre-split trunk and non-canon games.
  const pointsByBranch = useMemo(() => {
    const map = new Map<string, Point[]>();
    const branchEndX = new Map<string, number>();
    let placedMaxX = SIDE_PADDING;

    for (const branch of branches) {
      const branchGames = games
        .filter((g) => g.branch === branch.id)
        .sort((a, b) => a.timelineOrder - b.timelineOrder);
      const y = laneY.get(branch.id) ?? TOP_PADDING;

      let startX: number;
      if (branch.parent && branchEndX.has(branch.parent)) {
        startX = (branchEndX.get(branch.parent) ?? SIDE_PADDING) + NODE_SPACING;
      } else if (FLOATING_AFTER_PLACED.has(branch.id)) {
        startX = placedMaxX + NODE_SPACING;
      } else {
        startX = SIDE_PADDING;
      }

      const points = branchGames.map((g, i) => ({ x: startX + i * NODE_SPACING, y, game: g }));
      map.set(branch.id, points);

      if (points.length > 0) {
        const endX = points[points.length - 1].x;
        branchEndX.set(branch.id, endX);
        if (branch.parent === "pre-split") placedMaxX = Math.max(placedMaxX, endX);
      }
    }

    return map;
  }, [games, laneY]);

  const width = useMemo(() => {
    let maxX = SIDE_PADDING;
    for (const points of pointsByBranch.values()) {
      for (const p of points) maxX = Math.max(maxX, p.x);
    }
    return maxX + SIDE_PADDING;
  }, [pointsByBranch]);

  const height = TOP_PADDING * 2 + LANE_ORDER.length * LANE_HEIGHT;

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
      <svg
        className="timeline-diagram"
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        role="img"
        aria-label="Interactive Legend of Zelda timeline, branching by era"
      >
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
                  strokeDasharray="4 4"
                  opacity={0.45}
                />
              )}
              {points.length > 1 && (
                <path d={lineGen(points) ?? undefined} className="timeline-branch-path" stroke={branch.color} />
              )}
              {points.map((p) => (
                <g
                  key={p.game.id}
                  className="timeline-node"
                  transform={`translate(${p.x}, ${p.y})`}
                  onClick={() => navigate({ to: "/game/$slug", params: { slug: p.game.id } })}
                  onMouseEnter={() => setHovered(p.game.id)}
                  onMouseLeave={() => setHovered((h) => (h === p.game.id ? null : h))}
                >
                  <circle
                    r={NODE_RADIUS}
                    fill={branch.color}
                    stroke={p.game.canonicity === "canon" ? "none" : "var(--slate-950)"}
                    strokeWidth={p.game.canonicity === "canon" ? 0 : 2}
                    strokeDasharray={p.game.canonicity === "non-canon" ? "2 2" : undefined}
                    opacity={p.game.placementConfidence === "speculative" ? 0.6 : 1}
                  />
                  <text
                    x={0}
                    y={-14}
                    textAnchor="middle"
                    fontSize={hovered === p.game.id ? 13 : 11}
                    fontWeight={hovered === p.game.id ? 700 : 400}
                  >
                    {p.game.title}
                  </text>
                </g>
              ))}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
