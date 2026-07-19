import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

/**
 * A tiny original pixel-art adventurer who strolls along the bottom-left
 * whenever the page scrolls, facing the scroll direction. Entirely our own
 * sprite (drawn in the site's palette) — inspired by 8-bit heroes generally,
 * copied from none. Hidden for reduced-motion users; SSR renders nothing
 * until mount.
 *
 * Portaled directly onto <body> so its `position: fixed` containing block
 * is always the viewport, no matter what CSS (transform/filter/backdrop-
 * filter/etc.) some future ancestor picks up — those properties silently
 * re-anchor `fixed` descendants to themselves instead of the screen, which
 * is the classic way a "pinned to viewport" widget starts drifting with
 * the page.
 */

const G = "#4caf7d"; // cap & tunic
const D = "#2e7d54"; // shade / legs
const S = "#e8c39e"; // skin
const H = "#8a5a2b"; // hair
const B = "#5c3a1e"; // boots
const E = "#101720"; // eye

const PALETTE: Record<string, string> = { G, D, S, H, B, E };

// 12x15 pixel maps, facing right. "." = transparent. B/C differ in stride
// (legs apart vs crossed) AND a 1px torso bob, so the cross-fade reads as a
// step-and-bounce gait rather than an ambiguous side-to-side flicker.
const FRAME_A = [
  "...GGGG.....",
  "..GGGGGG....",
  ".GGGGGGGG...",
  "..HSSSSS....",
  "..SSSES.....",
  "...SSSS.....",
  "..DGGGGD....",
  ".GGGGGGGG...",
  ".GGGGGGGG...",
  ".DGGGGGGD...",
  "..GGGGGG....",
  "..GGGGGG....",
  ".DD....DD...",
  ".DD....DD...",
  "BBB....BBB..",
];

const FRAME_B = [
  ".............",
  "...GGGG......",
  "..GGGGGG.....",
  ".GGGGGGGG....",
  "..HSSSSS.....",
  "..SSSES......",
  "...SSSS......",
  "..DGGGGD.....",
  ".GGGGGGGG....",
  ".GGGGGGGG....",
  ".DGGGGGGD....",
  "..GGGGGG.....",
  "....DDD......",
  "....DDD......",
  "...BBBB......",
];

function Frame({ map }: { map: string[] }) {
  const rects = [];
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      const c = map[y][x];
      if (c === ".") continue;
      rects.push(<rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={PALETTE[c]} />);
    }
  }
  return <g>{rects}</g>;
}

// Hysteresis band for direction flips (Schmitt-trigger, not a flat
// per-event threshold). Mobile rubber-band/momentum scrolling fires many
// small back-and-forth `scroll` events even during a steady downward
// swipe; a flat "ignore deltas under Npx" filter still flips on any single
// jittery event that happens to exceed it. Instead we track the extreme
// point reached in the CURRENT direction and only flip once scroll moves
// DIR_HYSTERESIS past that extreme — small dips/overshoots within an
// ongoing trend never cross that line, only a genuine reversal does.
const DIR_HYSTERESIS = 24;

export function ScrollWalker() {
  const [mounted, setMounted] = useState(false);
  const [walking, setWalking] = useState(false);
  const [dir, setDir] = useState<1 | -1>(1);
  const idleTimer = useRef<number>(0);
  const lastY = useRef(0);
  const extremeY = useRef(0);
  const committedDir = useRef<1 | -1>(1);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setMounted(true);
    lastY.current = window.scrollY;
    extremeY.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      if (y === lastY.current) return;
      lastY.current = y;

      if (committedDir.current === 1) {
        extremeY.current = Math.max(extremeY.current, y);
        if (y < extremeY.current - DIR_HYSTERESIS) {
          committedDir.current = -1;
          extremeY.current = y;
          setDir(-1);
        }
      } else {
        extremeY.current = Math.min(extremeY.current, y);
        if (y > extremeY.current + DIR_HYSTERESIS) {
          committedDir.current = 1;
          extremeY.current = y;
          setDir(1);
        }
      }

      setWalking(true);
      window.clearTimeout(idleTimer.current);
      idleTimer.current = window.setTimeout(() => setWalking(false), 650);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(idleTimer.current);
    };
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div
      className={`scroll-walker ${walking ? "scroll-walker--walking" : ""}`}
      style={{ transform: `scaleX(${dir}) translateZ(0)` }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 13 15" width="36" height="45" shapeRendering="crispEdges">
        <g className="scroll-walker__frame scroll-walker__frame--a">
          <Frame map={FRAME_A} />
        </g>
        <g className="scroll-walker__frame scroll-walker__frame--b">
          <Frame map={FRAME_B} />
        </g>
      </svg>
    </div>,
    document.body
  );
}
