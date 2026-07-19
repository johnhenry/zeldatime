import type { Game } from "~/types/game";
import { SITE_NAME, absoluteUrl, ogImageFor } from "~/lib/site";

/**
 * Structured data, framed carefully as fan coverage of a game rather than
 * an authoritative catalog entry — no publisher/author claims implying
 * Nintendo origin. See public/robots.txt / about.tsx for the same stance.
 */

export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: absoluteUrl("/"),
    description:
      "An original, fan-made interactive timeline of every Legend of Zelda game, with sourced research on the series' lore and Switch-era UI design.",
    isAccessibleForFree: true,
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function videoGameLd(game: Game) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: game.title,
    datePublished: game.releaseYear,
    gamePlatform: game.platform,
    image: ogImageFor([game.keyArt, game.image]),
    description: game.synopsis,
    about: `Fan-written coverage on ${SITE_NAME}, an unofficial reference site. Not published or endorsed by Nintendo.`,
    mainEntityOfPage: absoluteUrl(`/game/${game.id}`),
  };
}

export function articleLd(opts: { title: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    mainEntityOfPage: absoluteUrl(opts.path),
    author: { "@type": "Organization", name: SITE_NAME },
  };
}
