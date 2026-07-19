import { Link } from "@tanstack/react-router";
import type { Game } from "~/types/game";
import { getBranch } from "~/data/timeline";
import { ConfidenceBadge } from "~/components/ConfidenceBadge";

export function GameCard({ game }: { game: Game }) {
  const branch = getBranch(game.branch);

  return (
    <Link to="/game/$slug" params={{ slug: game.id }} className="game-card">
      <div className="game-card__branch" style={{ backgroundColor: branch?.color }} aria-hidden="true" />
      {game.image && (
        <div className="game-card__art">
          <img src={game.image} alt={`${game.title} box art`} loading="lazy" />
        </div>
      )}
      <div className="game-card__body">
        <h3>{game.title}</h3>
        <p className="game-card__meta">
          {game.releaseDate} &middot; {game.platform}
        </p>
        <p className="game-card__synopsis">{game.synopsis}</p>
        {game.placementConfidence !== "official" && (
          <ConfidenceBadge confidence={game.placementConfidence} />
        )}
      </div>
    </Link>
  );
}
