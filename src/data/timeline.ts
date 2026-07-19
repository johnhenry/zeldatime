import type { TimelineBranch } from "~/types/timeline";

export const branches: TimelineBranch[] = [
  { id: "pre-split", label: "Shared Trunk (Before the Split)", parent: null, splitAt: "Skyward Sword", color: "#d9a441" },
  { id: "child", label: "Child Timeline", parent: "pre-split", splitAt: "Ocarina of Time", color: "#4caf7d" },
  { id: "adult", label: "Adult Timeline", parent: "pre-split", splitAt: "Ocarina of Time", color: "#3f8ec9" },
  { id: "downfall", label: "Downfall Timeline", parent: "pre-split", splitAt: "Ocarina of Time", color: "#a34a4a" },
  {
    id: "botw-era",
    label: "Distant Future (BOTW / TOTK)",
    parent: null,
    splitAt: "Officially unspecified — Nintendo has never confirmed which branch it descends from",
    color: "#3fc9c9",
  },
  {
    id: "aoc-divergence",
    label: "Age of Calamity (alternate history)",
    parent: null,
    splitAt:
      "Not chart-placed — depicts the Champions' last stand against the Calamity as an alternate history, but no verified source ties it to a specific official branch",
    color: "#c9a13f",
  },
  {
    id: "ancient-imprisonment",
    label: "Age of Imprisonment (inferred prequel)",
    parent: null,
    splitAt: "Not chart-placed — marketed as preceding TOTK's Imprisoning War/Zonai era",
    color: "#b06fc9",
  },
  { id: "non-canon", label: "Non-Canon", parent: null, splitAt: "N/A", color: "#777777" },
];

export function getBranch(id: string): TimelineBranch | undefined {
  return branches.find((b) => b.id === id);
}
