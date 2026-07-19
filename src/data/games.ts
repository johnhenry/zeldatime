import type { Game } from "~/types/game";

export const games: Game[] = [];

export function getGameBySlug(id: string): Game | undefined {
  return games.find((g) => g.id === id);
}

export function getRelatedGames(game: Game, limit = 4): Game[] {
  return games
    .filter((g) => g.id !== game.id && g.branch === game.branch)
    .slice(0, limit);
}

export function getGamesByBranch(branch: Game["branch"]): Game[] {
  return games.filter((g) => g.branch === branch);
}
