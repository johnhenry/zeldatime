export const SITE_ORIGIN = "https://zeldatime.johnhenry.me";
export const SITE_NAME = "Chronicle Slate";

export function absoluteUrl(path: string): string {
  return `${SITE_ORIGIN}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Prefer Wikipedia/Nintendo-hosted art for OG images. Fandom's CDN degrades
 * hotlinked images when a Referer is sent, and third-party crawlers
 * (Discord/Slack/Twitter) don't respect this site's own no-referrer meta —
 * that tag only governs requests the page itself initiates.
 */
export function ogImageFor(urls: (string | undefined)[]): string | undefined {
  const candidates = urls.filter((u): u is string => !!u);
  const stable = candidates.find((u) => !u.includes("static.wikia.nocookie.net"));
  return stable ?? candidates[0];
}

/**
 * Standard title/description + matching OG/Twitter meta for static pages
 * that don't need a custom share image (falls back to the root default).
 */
export function pageMeta(title: string, description: string, path: string) {
  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: absoluteUrl(path) },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
  ];
}
