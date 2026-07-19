import type { TimelineBranch } from "~/types/timeline";

export const branches: TimelineBranch[] = [
  { id: "pre-split", label: "Before the Split", parent: null, splitAt: "Skyward Sword", color: "#d9a441" },
  { id: "child", label: "Hero of Time (Child)", parent: "pre-split", splitAt: "Ocarina of Time", color: "#4caf7d" },
  { id: "adult", label: "Hero of Time (Adult)", parent: "pre-split", splitAt: "Ocarina of Time", color: "#3f8ec9" },
  { id: "downfall", label: "Downfall Timeline", parent: "pre-split", splitAt: "Ocarina of Time", color: "#a34a4a" },
  { id: "converged", label: "Era of Decline", parent: "child", splitAt: "Twilight Princess / Four Swords", color: "#8a6fb0" },
  { id: "botw-era", label: "Era of Prosperity / Reawakening", parent: "converged", splitAt: "Breath of the Wild", color: "#3fc9c9" },
  { id: "aoc-divergence", label: "Age of Calamity Divergence", parent: "botw-era", splitAt: "Age of Calamity", color: "#c9a13f" },
  { id: "non-canon", label: "Non-Canon", parent: null, splitAt: "N/A", color: "#777777" },
];

export function getBranch(id: string): TimelineBranch | undefined {
  return branches.find((b) => b.id === id);
}
