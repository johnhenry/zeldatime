import { useMemo, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { line as d3line, curveMonotoneX, curveBasis } from "d3-shape";
import type { Game } from "~/types/game";
import { branches, getBranch } from "~/data/timeline";
import { playHover, playTransition } from "~/lib/sound";
import { TimelinePreviewCard } from "~/components/TimelinePreviewCard";

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

export type TimelineMode = "story" | "release";

interface Point {
  x: number;
  y: number;
  game: Game;
}

function parseYear(releaseYear: string): number {
  const m = releaseYear.match(/\d{4}/);
  return m ? parseInt(m[0], 10) : 0;
}

export function TimelineDiagram({ games, mode = "story" }: { games: Game[]; mode?: TimelineMode }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState<string | null>(null);
  const nodeRefs = useRef<Map<string, SVGGElement>>(new Map());

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
  const storyPoints = useMemo(() => {
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

  // Release mode is a genuinely different layout, not a filter on the story
  // one: branch lanes are an in-universe construct that don't mean anything
  // sorted by real-world release date, so this is a single lane, nodes
  // spaced evenly in release order, still colored by their branch.
  const releasePoints = useMemo(() => {
    const y = TOP_PADDING;
    return [...games]
      .sort((a, b) => parseYear(a.releaseYear) - parseYear(b.releaseYear) || a.title.localeCompare(b.title))
      .map((g, i) => ({ x: GUTTER + i * NODE_SPACING, y, game: g }));
  }, [games]);

  const pointsByBranch = mode === "story" ? storyPoints : new Map([["release", releasePoints]]);

  const allPoints = useMemo(() => Array.from(pointsByBranch.values()).flat(), [pointsByBranch]);

  // Label above/below alternation must reset per lane, not run continuously
  // across the flattened point list — otherwise a lane's own node count
  // parity drifts against its neighbors' and adjacent-lane labels collide.
  const labelAbove = useMemo(() => {
    const map = new Map<string, boolean>();
    for (const points of pointsByBranch.values()) {
      points.forEach((p, i) => map.set(p.game.id, i % 2 === 0));
    }
    return map;
  }, [pointsByBranch]);

  // Global reading order for Home/End: lane order (story) or release order
  // (already the array order in release mode), then x within a lane.
  const orderedPoints = useMemo(() => {
    if (mode === "release") return releasePoints;
    return [...allPoints].sort((a, b) => {
      const laneA = activeLanes.indexOf(a.game.branch as (typeof activeLanes)[number]);
      const laneB = activeLanes.indexOf(b.game.branch as (typeof activeLanes)[number]);
      return laneA - laneB || a.x - b.x;
    });
  }, [allPoints, activeLanes, mode, releasePoints]);

  const width = useMemo(() => {
    let maxX = GUTTER;
    for (const p of allPoints) maxX = Math.max(maxX, p.x);
    return maxX + RIGHT_PADDING;
  }, [allPoints]);

  const height = mode === "story" ? TOP_PADDING + activeLanes.length * LANE_HEIGHT : TOP_PADDING + LANE_HEIGHT;

  const lineGen = d3line<Point>()
    .x((d) => d.x)
    .y((d) => d.y)
    .curve(curveMonotoneX);

  const forkGen = d3line<{ x: number; y: number }>()
    .x((d) => d.x)
    .y((d) => d.y)
    .curve(curveBasis);

  const focusNode = (id: string) => {
    nodeRefs.current.get(id)?.focus();
  };

  const handleNodeKeyDown = (e: React.KeyboardEvent<SVGGElement>, current: Point) => {
    switch (e.key) {
      case "Enter":
      case " ": {
        e.preventDefault();
        playTransition();
        navigate({ to: "/game/$slug", params: { slug: current.game.id } });
        return;
      }
      case "ArrowLeft":
      case "ArrowRight": {
        e.preventDefault();
        const lane = allPoints.filter((p) => p.y === current.y).sort((a, b) => a.x - b.x);
        const idx = lane.findIndex((p) => p.game.id === current.game.id);
        const target = e.key === "ArrowLeft" ? lane[idx - 1] : lane[idx + 1];
        if (target) focusNode(target.game.id);
        return;
      }
      case "ArrowUp":
      case "ArrowDown": {
        e.preventDefault();
        const laneYs = [...new Set(allPoints.map((p) => p.y))].sort((a, b) => a - b);
        const laneIdx = laneYs.indexOf(current.y);
        const targetY = e.key === "ArrowUp" ? laneYs[laneIdx - 1] : laneYs[laneIdx + 1];
        if (targetY === undefined) return;
        const candidates = allPoints.filter((p) => p.y === targetY);
        const nearest = candidates.reduce<Point | undefined>((best, p) => {
          if (!best || Math.abs(p.x - current.x) < Math.abs(best.x - current.x)) return p;
          return best;
        }, undefined);
        if (nearest) focusNode(nearest.game.id);
        return;
      }
      case "Home": {
        e.preventDefault();
        if (orderedPoints[0]) focusNode(orderedPoints[0].game.id);
        return;
      }
      case "End": {
        e.preventDefault();
        if (orderedPoints.length > 0) focusNode(orderedPoints[orderedPoints.length - 1].game.id);
        return;
      }
    }
  };

  const hoveredPoint = hovered ? allPoints.find((p) => p.game.id === hovered) : undefined;
  const hoveredBranch = hoveredPoint ? getBranch(hoveredPoint.game.branch) : undefined;

  if (games.length === 0) {
    return (
      <div className="timeline-diagram-wrap">
        <p style={{ color: "var(--slate-400)" }}>No games match the current filters.</p>
      </div>
    );
  }

  return (
    <div
      className="timeline-diagram-wrap"
      tabIndex={0}
      role="region"
      aria-label="Scrollable timeline chart — use arrow keys or drag to pan"
    >
      {/* Rendered at native pixel size inside a horizontally scrollable wrap:
          scaling the whole SVG down to container width made every label
          unreadably small. tabIndex+role/aria-label make the scroll region
          itself keyboard-operable (native browser arrow-key scroll on a
          focused scroll container), independent of the node-to-node
          traversal on the timeline-node elements inside it. */}
      <svg
        className="timeline-diagram"
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        role="img"
        aria-label={
          mode === "story"
            ? "Interactive Legend of Zelda timeline, branching by era"
            : "Legend of Zelda games in real-world release order"
        }
      >
        <defs>
          <clipPath id="art-clip">
            <circle r={ART_RADIUS} cx={0} cy={0} />
          </clipPath>
        </defs>

        {mode === "story" &&
          /* Lane gutter: label + faint guide rule per active branch. */
          branches.map((branch) => {
            const y = laneY.get(branch.id);
            if (y === undefined || !(storyPoints.get(branch.id) ?? []).length) return null;
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

        {mode === "release" && (
          <text x={18} y={TOP_PADDING - 10} fontSize={11.5} fontWeight={600} letterSpacing={1.2} fill="var(--accent-cyan)" opacity={0.9}>
            REAL-WORLD RELEASE ORDER
          </text>
        )}

        {mode === "story" &&
          branches.map((branch) => {
            const points = storyPoints.get(branch.id) ?? [];
            if (points.length === 0) return null;
            const parent = branch.parent ? getBranch(branch.parent) : null;
            const parentPoints = parent ? storyPoints.get(parent.id) ?? [] : [];
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
        {allPoints.map((p) => {
          const branch = getBranch(p.game.branch);
          const isHovered = hovered === p.game.id;
          const above = labelAbove.get(p.game.id) ?? true;
          const labelY = above ? -(ART_RADIUS + 20) : ART_RADIUS + 26;

          return (
            <g
              key={p.game.id}
              ref={(el) => {
                if (el) nodeRefs.current.set(p.game.id, el);
                else nodeRefs.current.delete(p.game.id);
              }}
              className="timeline-node"
              transform={`translate(${p.x}, ${p.y})`}
              onClick={() => {
                playTransition();
                navigate({ to: "/game/$slug", params: { slug: p.game.id } });
              }}
              onMouseEnter={() => {
                setHovered(p.game.id);
                playHover();
              }}
              onMouseLeave={() => setHovered((h) => (h === p.game.id ? null : h))}
              onFocus={() => setHovered(p.game.id)}
              onBlur={() => setHovered((h) => (h === p.game.id ? null : h))}
              tabIndex={0}
              onKeyDown={(e) => handleNodeKeyDown(e, p)}
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
                    stroke={branch?.color}
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
                  fill={branch?.color}
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
                y={labelY + (above ? -15 : 15)}
                textAnchor="middle"
                fontSize={10.5}
              >
                {p.game.releaseYear}
              </text>
            </g>
          );
        })}
      </svg>

      {hoveredPoint && hoveredBranch && (
        <TimelinePreviewCard
          game={hoveredPoint.game}
          branchColor={hoveredBranch.color}
          x={hoveredPoint.x}
          y={hoveredPoint.y}
          flipAbove={hoveredPoint.y > height - LANE_HEIGHT}
        />
      )}
    </div>
  );
}
