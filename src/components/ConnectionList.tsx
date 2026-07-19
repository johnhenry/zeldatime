import { Link } from "@tanstack/react-router";
import type { Game } from "~/types/game";
import type { ConnectionType } from "~/types/content";
import { getGameBySlug } from "~/data/games";

const LABELS: Record<ConnectionType, string> = {
  "diverges-from": "Diverges from",
  "direct-sequel": "Direct sequel to",
  "direct-prequel": "Direct prequel to",
  "remake-of": "Remake of",
  "same-hero": "Shares its hero with",
  parallel: "Parallel story with",
  thematic: "Thematically linked to",
};

export function ConnectionList({ game }: { game: Game }) {
  const connections = game.connections ?? [];
  if (connections.length === 0) return null;

  return (
    <ul className="connection-list">
      {connections.map((c) => {
        const target = getGameBySlug(c.targetId);
        if (!target) return null;
        return (
          <li key={`${c.type}-${c.targetId}`} className="connection-list__item">
            <span className="connection-list__type">{LABELS[c.type]}</span>
            <Link to="/game/$slug" params={{ slug: target.id }} className="connection-list__target">
              {target.image && <img src={target.image} alt="" loading="lazy" />}
              {target.title}
            </Link>
            {c.note && <span className="connection-list__note">{c.note}</span>}
          </li>
        );
      })}
    </ul>
  );
}
