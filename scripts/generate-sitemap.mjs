// Build-time sitemap generator. Run via `node --experimental-strip-types`
// (no separate build step). Static generation was chosen over a runtime
// server route: the URL set is entirely derived from compile-time-static
// arrays, so a server route buys nothing beyond ergonomics -- and this
// sidesteps ambiguity in this TanStack Start version's server-route API.
//
// games.ts has no runtime path-alias imports, so it's dynamic-imported
// directly for full fidelity (every game's real id). timeline.ts and
// threads.ts both import other `~/`-aliased modules at runtime, which a
// plain Node script can't resolve without a custom loader -- rather than
// build one, their `id: "..."` fields are extracted with a narrow regex
// (a stable, simple pattern, unlike the freeform prose those files also
// contain -- this is a deliberately different tradeoff than Phase 5's
// image-health-checker, which needs full Game objects, not just ids).

import { writeFileSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const SITE_ORIGIN = "https://zeldatime.johnhenry.me";

const { games } = await import(join(ROOT, "src/data/games.ts"));

function extractIds(relPath) {
  const src = readFileSync(join(ROOT, relPath), "utf-8");
  return [...src.matchAll(/^\s{2,4}id: "([a-z0-9-]+)",/gm)].map((m) => m[1]);
}

const branchIds = extractIds("src/data/timeline.ts");
const threadIds = extractIds("src/data/threads.ts");

const activeBranchIds = branchIds.filter((id) => games.some((g) => g.branch === id));

const staticPaths = [
  "/",
  "/about",
  "/stats",
  "/explore",
  "/glossary",
  "/branch",
  "/threads",
  "/codex",
  "/codex/lore",
  "/codex/ui",
  "/codex/species",
  "/codex/unplaced",
  "/codex/aoi-maps",
];

const dynamicPaths = [
  ...games.map((g) => `/game/${g.id}`),
  ...activeBranchIds.map((id) => `/branch/${id}`),
  ...threadIds.map((id) => `/threads/${id}`),
];

const allPaths = [...staticPaths, ...dynamicPaths];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPaths.map((p) => `  <url><loc>${SITE_ORIGIN}${p}</loc></url>`).join("\n")}
</urlset>
`;

writeFileSync(join(ROOT, "public/sitemap.xml"), xml);
console.log(`sitemap.xml written with ${allPaths.length} URLs (${games.length} games, ${activeBranchIds.length} branches, ${threadIds.length} threads)`);
