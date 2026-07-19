import type { Game } from "~/types/game";

interface TimelinePreviewCardProps {
  game: Game;
  branchColor: string;
  /** SVG-space coordinates of the hovered/focused node. */
  x: number;
  y: number;
  /** Flip above the node when it's near the bottom of the diagram. */
  flipAbove: boolean;
}

/**
 * Plain HTML, never SVG — this is a sibling of the <svg>, absolutely
 * positioned inside the same scrolling .timeline-diagram-wrap, at the
 * hovered/focused node's own coordinates (the SVG renders at native pixel
 * size with no scaling, so node coordinates map 1:1 to CSS pixels here).
 * Never touches .timeline-node itself, so it can't violate the
 * no-CSS-transform rule documented on that class.
 */
export function TimelinePreviewCard({ game, branchColor, x, y, flipAbove }: TimelinePreviewCardProps) {
  const art = game.keyArt ?? game.image;

  return (
    <div
      className="timeline-preview"
      style={{
        left: x,
        top: flipAbove ? y - 18 : y + 18,
        transform: flipAbove ? "translate(-50%, -100%)" : "translate(-50%, 0)",
        borderColor: branchColor,
      }}
      aria-hidden="true"
    >
      {art && (
        <div className="timeline-preview__art">
          <img src={art} alt="" loading="lazy" />
        </div>
      )}
      <div className="timeline-preview__body">
        <strong>{game.title}</strong>
        <span className="timeline-preview__meta">
          {game.releaseYear} · {game.platform}
        </span>
        <p>{game.synopsis}</p>
      </div>
    </div>
  );
}
