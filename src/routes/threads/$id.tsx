import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SlateFrame } from "~/components/SlateFrame";
import { getThread } from "~/data/threads";
import { getGameBySlug } from "~/data/games";
import { getBranch } from "~/data/timeline";
import { absoluteUrl, ogImageFor } from "~/lib/site";
import { articleLd, breadcrumbLd } from "~/lib/jsonld";

export const Route = createFileRoute("/threads/$id")({
  component: ThreadDetailPage,
  loader: ({ params }) => {
    const thread = getThread(params.id);
    if (!thread) throw notFound();
    return thread;
  },
  head: ({ params, loaderData }) => {
    const thread = loaderData ?? getThread(params.id);
    if (!thread) return { meta: [{ title: "Thread Not Found | Chronicle Slate" }] };

    const title = `${thread.title} | Threads | Chronicle Slate`;
    const games = thread.entries.map((e) => getGameBySlug(e.gameId)).filter(Boolean) as { keyArt?: string; image?: string }[];
    const ogImage = ogImageFor(games.flatMap((g) => [g.keyArt, g.image])) ?? absoluteUrl("/icon-512.png");

    return {
      meta: [
        { title },
        { name: "description", content: thread.blurb },
        { property: "og:type", content: "article" },
        { property: "og:title", content: title },
        { property: "og:description", content: thread.blurb },
        { property: "og:image", content: ogImage },
        { property: "og:url", content: absoluteUrl(`/threads/${thread.id}`) },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: thread.blurb },
        { name: "twitter:image", content: ogImage },
        { "script:ld+json": articleLd({ title: thread.title, description: thread.blurb, path: `/threads/${thread.id}` }) },
        {
          "script:ld+json": breadcrumbLd([
            { name: "Timeline", path: "/" },
            { name: "Threads", path: "/threads" },
            { name: thread.title, path: `/threads/${thread.id}` },
          ]),
        },
      ],
    };
  },
});

function ThreadDetailPage() {
  const thread = Route.useLoaderData();

  return (
    <SlateFrame>
      <article className="section-page thread-page">
        <header>
          <h1>{thread.title}</h1>
          <p className="section-page__intro">{thread.blurb}</p>
        </header>

        <ol className="thread-entries">
          {thread.entries.map((entry) => {
            const game = getGameBySlug(entry.gameId);
            if (!game) return null;
            const branch = getBranch(game.branch);
            return (
              <li key={entry.gameId} className="thread-entry" style={{ borderColor: branch?.color }}>
                <Link to="/game/$slug" params={{ slug: game.id }} className="thread-entry__game">
                  {game.image && <img src={game.image} alt="" loading="lazy" />}
                  <span>
                    <strong>{game.title}</strong>
                    <small style={{ color: branch?.color }}>{branch?.label}</small>
                  </span>
                </Link>
                <p className="thread-entry__note">{entry.note}</p>
              </li>
            );
          })}
        </ol>
      </article>
    </SlateFrame>
  );
}
