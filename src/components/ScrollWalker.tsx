import { useEffect, useRef, useState } from "react";

/**
 * A tiny original pixel-art adventurer who strolls along the bottom-left
 * whenever the page scrolls, facing the scroll direction. Entirely our own
 * sprite (drawn in the site's palette) — inspired by 8-bit heroes generally,
 * copied from none. Hidden for reduced-motion users; SSR renders nothing
 * until mount.
 */

const G = "#4caf7d"; // cap & tunic
const D = "#2e7d54"; // shade / legs
const S = "#e8c39e"; // skin
const H = "#8a5a2b"; // hair
const B = "#5c3a1e"; // boots
const E = "#101720"; // eye

const PALETTE: Record<string, string> = { G, D, S, H, B, E };

// 12x15 pixel maps, facing right. "." = transparent.
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
  "....DDD.....",
  "....DDD.....",
  "...BBBB.....",
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

export function ScrollWalker() {
  const [mounted, setMounted] = useState(false);
  const [walking, setWalking] = useState(false);
  const [dir, setDir] = useState<1 | -1>(1);
  const idleTimer = useRef<number>(0);
  const lastY = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setMounted(true);
    lastY.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      if (y !== lastY.current) {
        setDir(y > lastY.current ? 1 : -1);
        lastY.current = y;
        setWalking(true);
        window.clearTimeout(idleTimer.current);
        idleTimer.current = window.setTimeout(() => setWalking(false), 650);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(idleTimer.current);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`scroll-walker ${walking ? "scroll-walker--walking" : ""}`}
      style={{ transform: `scaleX(${dir})` }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 12 15" width="36" height="45" shapeRendering="crispEdges">
        <g className="scroll-walker__frame scroll-walker__frame--a">
          <Frame map={FRAME_A} />
        </g>
        <g className="scroll-walker__frame scroll-walker__frame--b">
          <Frame map={FRAME_B} />
        </g>
      </svg>
    </div>
  );
}
