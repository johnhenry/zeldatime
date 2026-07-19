import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { absoluteUrl } from "~/lib/site";
import { websiteLd } from "~/lib/jsonld";
import { NotFound } from "~/components/NotFound";

const DEFAULT_TITLE = "Chronicle Slate — An Interactive Zelda Timeline";
const DEFAULT_DESCRIPTION =
  "An original, fan-made interactive timeline of every Legend of Zelda game, from the Skyward Sword origin through the Age of Calamity divergence.";
const DEFAULT_OG_IMAGE = absoluteUrl("/icon-512.png");

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      // Fandom's CDN degrades hotlinked images to 300px when a Referer is sent.
      { name: "referrer", content: "no-referrer" },
      { name: "theme-color", content: "#0b0f14" },
      { title: DEFAULT_TITLE },
      { name: "description", content: DEFAULT_DESCRIPTION },

      // Open Graph / Twitter defaults — per-page routes override title/description/image.
      { property: "og:site_name", content: "Chronicle Slate" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: DEFAULT_TITLE },
      { property: "og:description", content: DEFAULT_DESCRIPTION },
      { property: "og:image", content: DEFAULT_OG_IMAGE },
      { property: "og:url", content: absoluteUrl("/") },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: DEFAULT_TITLE },
      { name: "twitter:description", content: DEFAULT_DESCRIPTION },
      { name: "twitter:image", content: DEFAULT_OG_IMAGE },

      { "script:ld+json": websiteLd() },
    ],
    links: [
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "icon", href: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Inter:wght@400;500;600;700&family=Spectral:ital@0;1&display=swap",
      },
      {
        rel: "stylesheet",
        href: "/styles.css",
      },
    ],
  }),
  component: RootComponent,
  notFoundComponent: () => <NotFound />,
});

function RootComponent() {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <Outlet />
        <Scripts />
      </body>
    </html>
  );
}
