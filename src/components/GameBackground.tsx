import type { Game } from "~/types/game";
import { getBranch } from "~/data/timeline";

/**
 * Full-bleed page backdrop. Key art when available (CSS background — safe
 * for any host); otherwise the universal treatment: the game's own box art
 * blurred and branch-tinted under a circuit texture and legibility fade.
 */
export function GameBackground({ game }: { game: Game }) {
  const branch = getBranch(game.branch);
  const art = game.keyArt ?? game.image;
  if (!art) return null;

  return (
    <div className={`game-bg ${game.keyArt ? "game-bg--keyart" : "game-bg--blur"}`} aria-hidden="true">
      <div className="game-bg__image" style={{ backgroundImage: `url(${art})` }} />
      <div className="game-bg__tint" style={{ background: `radial-gradient(ellipse 70% 50% at 50% 0%, ${branch?.color}33, transparent 70%)` }} />
      <div className="game-bg__texture" />
      <div className="game-bg__fade" />
    </div>
  );
}
