import { games } from "~/data/games";
import { threads } from "~/data/threads";
import { branches } from "~/data/timeline";
import { glossary } from "~/data/glossary";

export type SearchItemKind = "game" | "thread" | "branch" | "term" | "page";

export interface SearchItem {
  id: string;
  kind: SearchItemKind;
  title: string;
  subtitle: string;
  to: string;
  params?: Record<string, string>;
  hash?: string;
  /** Curated exact synonyms for the item itself (e.g. "totk" for Tears of
   *  the Kingdom) — scores nearly as high as the title. Keep this short;
   *  it's for alternate NAMES, not general recall. */
  aliases: string;
  /** Broad prose-derived recall text (summaries, blurbs) — lowest-priority
   *  tier, so an incidental mention (a branch summary that happens to say
   *  "TOTK") never outranks the actual entity with that name/alias. */
  keywords: string;
}

const STATIC_PAGES: SearchItem[] = [
  { id: "page-home", kind: "page", title: "Timeline", subtitle: "The interactive branching chart", to: "/", aliases: "", keywords: "chart home" },
  { id: "page-explore", kind: "page", title: "Explore", subtitle: "Branches, threads, glossary, stats", to: "/explore", aliases: "", keywords: "hub" },
  { id: "page-branch", kind: "page", title: "Branches", subtitle: "All timeline branches", to: "/branch", aliases: "", keywords: "hub" },
  { id: "page-threads", kind: "page", title: "Threads", subtitle: "Recurring elements across every game", to: "/threads", aliases: "", keywords: "hub species items enemies" },
  { id: "page-glossary", kind: "page", title: "Glossary", subtitle: "Key terms, briefly defined", to: "/glossary", aliases: "", keywords: "terms" },
  { id: "page-stats", kind: "page", title: "Stats & Trivia", subtitle: "The chronicle by the numbers", to: "/stats", aliases: "", keywords: "trivia charts numbers" },
  { id: "page-codex", kind: "page", title: "Codex", subtitle: "The research library", to: "/codex", aliases: "", keywords: "papers research" },
  { id: "page-codex-lore", kind: "page", title: "The Zelda Timeline", subtitle: "Codex paper — lore & canon", to: "/codex/lore", aliases: "", keywords: "codex lore timeline paper" },
  { id: "page-codex-ui", kind: "page", title: "Switch-Era UI & Menu Design", subtitle: "Codex paper — UI research", to: "/codex/ui", aliases: "", keywords: "codex ui design paper" },
  { id: "page-codex-species", kind: "page", title: "A Natural History of Hyrule", subtitle: "Codex paper — species", to: "/codex/species", aliases: "", keywords: "codex species paper zora rito korok" },
  { id: "page-codex-unplaced", kind: "page", title: "The Unplaced Era", subtitle: "Codex paper — the unplaced titles", to: "/codex/unplaced", aliases: "", keywords: "codex unplaced paper" },
  { id: "page-codex-aoi", kind: "page", title: "The Maps of the Imprisoning War", subtitle: "Codex paper — Age of Imprisonment UI", to: "/codex/aoi-maps", aliases: "", keywords: "codex maps paper" },
  { id: "page-about", kind: "page", title: "About", subtitle: "About this project", to: "/about", aliases: "", keywords: "" },
];

// Fan-standard abbreviations. A Zelda site's own search box is exactly
// where players will reach for "totk"/"botw" instead of full titles.
const GAME_ALIASES: Record<string, string> = {
  "ocarina-of-time": "oot",
  "majoras-mask": "mm",
  "twilight-princess": "tp",
  "wind-waker": "ww",
  "a-link-to-the-past": "alttp lttp",
  "a-link-between-worlds": "albw",
  "links-awakening": "la",
  "skyward-sword": "ss",
  "breath-of-the-wild": "botw",
  "tears-of-the-kingdom": "totk",
  "the-legend-of-zelda": "loz",
  "adventure-of-link": "aol",
  "age-of-calamity": "aoc",
  "age-of-imprisonment": "aoi",
  "spirit-tracks": "st",
  "phantom-hourglass": "ph",
  "four-swords-adventures": "fsa",
  "tri-force-heroes": "tfh",
  "oracle-of-seasons": "oos",
  "oracle-of-ages": "ooa",
};

let cachedIndex: SearchItem[] | null = null;

export function buildSearchIndex(): SearchItem[] {
  if (cachedIndex) return cachedIndex;

  const gameItems: SearchItem[] = games.map((g) => ({
    id: `game-${g.id}`,
    kind: "game",
    title: g.title,
    subtitle: `${g.releaseYear} · ${g.platform}`,
    to: "/game/$slug",
    params: { slug: g.id },
    aliases: GAME_ALIASES[g.id] ?? "",
    keywords: `${g.platform} ${g.releaseYear} ${g.branch} ${g.canonicity}`,
  }));

  const branchItems: SearchItem[] = branches.map((b) => ({
    id: `branch-${b.id}`,
    kind: "branch",
    title: b.label,
    subtitle: "Timeline branch",
    to: "/branch/$id",
    params: { id: b.id },
    aliases: "",
    keywords: `branch ${b.summary}`,
  }));

  const threadItems: SearchItem[] = threads.map((t) => ({
    id: `thread-${t.id}`,
    kind: "thread",
    title: t.title,
    subtitle: `Thread · ${t.kind}`,
    to: "/threads/$id",
    params: { id: t.id },
    aliases: "",
    keywords: `${t.kind} thread ${t.blurb}`,
  }));

  const termItems: SearchItem[] = glossary.map((term) => ({
    id: `term-${term.id}`,
    kind: "term",
    title: term.term,
    subtitle: "Glossary term",
    to: "/glossary",
    hash: term.id,
    aliases: "",
    keywords: `glossary ${term.definition}`,
  }));

  cachedIndex = [...gameItems, ...branchItems, ...threadItems, ...termItems, ...STATIC_PAGES];
  return cachedIndex;
}

/**
 * Hand-rolled scorer, no fuzzy-search dependency. Tiers, highest first:
 * exact title, exact alias, title-prefix, alias-word, title-word-boundary,
 * title-substring, keywords-word, keywords-substring. Curated aliases sit
 * ABOVE general title-substring/keywords matches specifically so a fan
 * typing "totk" finds the game itself, not a branch or Codex page whose
 * prose merely happens to mention "TOTK" in passing.
 */
export function scoreAndFilter(query: string, items: SearchItem[], limit = 8): SearchItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const qBoundary = new RegExp(`\\b${escapeRegExp(q)}\\b`);
  const qPrefix = new RegExp(`\\b${escapeRegExp(q)}`);

  const scored: { item: SearchItem; score: number }[] = [];
  for (const item of items) {
    const title = item.title.toLowerCase();
    const aliases = item.aliases.toLowerCase();
    const keywords = item.keywords.toLowerCase();
    let score = -1;

    if (title === q) score = 100;
    else if (aliases && qBoundary.test(aliases)) score = 95;
    else if (title.startsWith(q)) score = 80;
    else if (qPrefix.test(title)) score = 60;
    else if (title.includes(q)) score = 40;
    else if (qBoundary.test(keywords)) score = 25;
    else if (keywords.includes(q)) score = 10;

    if (score > 0) scored.push({ item, score });
  }

  scored.sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title));
  return scored.slice(0, limit).map((s) => s.item);
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
