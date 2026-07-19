import { games } from "~/data/games";
import { branches } from "~/data/timeline";

export interface StatDatum {
  label: string;
  value: number;
  color?: string;
}

export function releasesByDecade(): StatDatum[] {
  const byDecade = new Map<string, number>();
  for (const g of games) {
    const year = parseInt(g.releaseYear, 10);
    if (Number.isNaN(year)) continue;
    const decade = `${Math.floor(year / 10) * 10}s`;
    byDecade.set(decade, (byDecade.get(decade) ?? 0) + 1);
  }
  return [...byDecade.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([label, value]) => ({ label, value }));
}

export function gamesPerBranch(): StatDatum[] {
  return branches
    .map((b) => ({
      label: b.label.replace(/\s*\(.*\)$/, ""),
      value: games.filter((g) => g.branch === b.id).length,
      color: b.color,
    }))
    .filter((d) => d.value > 0);
}

export function canonicitySplit(): StatDatum[] {
  const colors: Record<string, string> = {
    canon: "#4caf7d",
    "semi-canon": "#e8b24d",
    "non-canon": "#777777",
  };
  const byCanon = new Map<string, number>();
  for (const g of games) byCanon.set(g.canonicity, (byCanon.get(g.canonicity) ?? 0) + 1);
  return [...byCanon.entries()].map(([label, value]) => ({ label, value, color: colors[label] }));
}

export function platformFamilies(): StatDatum[] {
  const family = (platform: string): string => {
    const p = platform.toLowerCase();
    if (p.includes("switch")) return "Switch / Switch 2";
    if (p.includes("wii")) return "Wii / Wii U";
    if (p.includes("gamecube") || p.includes("gc")) return "GameCube";
    if (p.includes("3ds")) return "3DS";
    if (p.includes("ds")) return "DS";
    if (p.includes("game boy")) return "Game Boy line";
    if (p.includes("nes") || p.includes("famicom")) return "NES / SNES era";
    if (p.includes("super nintendo") || p.includes("snes")) return "NES / SNES era";
    if (p.includes("64")) return "Nintendo 64";
    if (p.includes("cd-i")) return "Philips CD-i";
    return "Other";
  };
  const byFamily = new Map<string, number>();
  for (const g of games) {
    const f = family(g.platform);
    byFamily.set(f, (byFamily.get(f) ?? 0) + 1);
  }
  return [...byFamily.entries()]
    .sort(([, a], [, b]) => b - a)
    .map(([label, value]) => ({ label, value }));
}

export function longestGap(): { years: number; from: string; to: string } {
  const mainline = games
    .filter((g) => g.canonicity === "canon")
    .map((g) => ({ title: g.title, year: parseInt(g.releaseYear, 10) }))
    .filter((g) => !Number.isNaN(g.year))
    .sort((a, b) => a.year - b.year);
  let best = { years: 0, from: "", to: "" };
  for (let i = 1; i < mainline.length; i++) {
    const gap = mainline[i].year - mainline[i - 1].year;
    if (gap > best.years) {
      best = { years: gap, from: mainline[i - 1].title, to: mainline[i].title };
    }
  }
  return best;
}
