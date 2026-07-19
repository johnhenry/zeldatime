export type Era =
  | "skyward-origin"
  | "era-of-creation"
  | "hero-of-time"
  | "era-of-decline"
  | "era-of-prosperity"
  | "reawakening"
  | "non-canon";

export type Branch =
  | "pre-split"
  | "child"
  | "adult"
  | "downfall"
  | "converged"
  | "botw-era"
  | "aoc-divergence"
  | "non-canon";

export type Canonicity = "canon" | "semi-canon" | "non-canon";

export type PlacementConfidence = "official" | "strong-community" | "speculative";

export interface Game {
  id: string;
  title: string;
  releaseDate: string;
  platform: string;
  era: Era;
  branch: Branch;
  synopsis: string;
  trivia: string[];
  canonicity: Canonicity;
  placementConfidence: PlacementConfidence;
  sourcingNotes?: string;
}
