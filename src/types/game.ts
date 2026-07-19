export type Era =
  | "skyward-origin"
  | "era-of-creation"
  | "hero-of-time"
  | "era-of-decline"
  | "era-of-prosperity"
  | "reawakening"
  | "alternate-history"
  | "non-canon";

export type Branch =
  | "pre-split"
  | "child"
  | "adult"
  | "downfall"
  | "botw-era"
  | "aoc-divergence"
  | "ancient-imprisonment"
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
  /** In-universe chronological position within its branch, for timeline layout (not release order). */
  timelineOrder: number;
  synopsis: string;
  trivia: string[];
  canonicity: Canonicity;
  placementConfidence: PlacementConfidence;
  sourcingNotes?: string;
}
