import { Link } from "@tanstack/react-router";
import type { Game } from "~/types/game";
import { getBranchNeighbors } from "~/data/games";
import { getBranch } from "~/data/timeline";

export function GamePager({ game }: { game: Game }) {
  const { prev, next } = getBranchNeighbors(game);
  const branch = getBranch(game.branch);
  if (!prev && !next) return null;

  return (
    <nav className="game-pager" aria-label={`More of the ${branch?.label}`}>
      {prev ? (
        <Link to="/game/$slug" params={{ slug: prev.id }} className="game-pager__link game-pager__link--prev">
          {prev.image && <img src={prev.image} alt="" loading="lazy" />}
          <span>
            <small>Earlier in this branch</small>
            {prev.title}
          </span>
        </Link>
      ) : (
        <span className="game-pager__spacer" />
      )}
      {next ? (
        <Link to="/game/$slug" params={{ slug: next.id }} className="game-pager__link game-pager__link--next">
          <span>
            <small>Next in this branch</small>
            {next.title}
          </span>
          {next.image && <img src={next.image} alt="" loading="lazy" />}
        </Link>
      ) : (
        <span className="game-pager__spacer" />
      )}
    </nav>
  );
}
