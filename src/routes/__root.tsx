import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Chronicle Slate — An Interactive Zelda Timeline" },
      {
        name: "description",
        content:
          "An original, fan-made interactive timeline of every Legend of Zelda game, from the Skyward Sword origin through the Age of Calamity divergence.",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "/styles.css",
      },
    ],
  }),
  component: RootComponent,
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
