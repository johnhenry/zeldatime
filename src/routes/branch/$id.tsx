import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SlateFrame } from "~/components/SlateFrame";
import { GameCard } from "~/components/GameCard";
import { branches, getBranch } from "~/data/timeline";
import { getGamesByBranch } from "~/data/games";
import { getThreadsForBranch } from "~/data/threads";
import type { Branch } from "~/types/game";
import { absoluteUrl, ogImageFor } from "~/lib/site";
import { articleLd, breadcrumbLd } from "~/lib/jsonld";

export const Route = createFileRoute("/branch/$id")({
  component: BranchDetailPage,
  loader: ({ params }) => {
    const branch = getBranch(params.id);
    if (!branch) throw notFound();
    return branch;
  },
  head: ({ params, loaderData }) => {
    const branch = loaderData ?? getBranch(params.id);
    if (!branch) return { meta: [{ title: "Branch Not Found | Chronicle Slate" }] };

    const title = `${branch.label} | Chronicle Slate`;
    const games = getGamesByBranch(branch.id as Branch);
    const ogImage = ogImageFor(games.flatMap((g) => [g.keyArt, g.image])) ?? absoluteUrl("/icon-512.png");

    return {
      meta: [
        { title },
        { name: "description", content: branch.summary },
        { property: "og:type", content: "article" },
        { property: "og:title", content: title },
        { property: "og:description", content: branch.summary },
        { property: "og:image", content: ogImage },
        { property: "og:url", content: absoluteUrl(`/branch/${branch.id}`) },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: branch.summary },
        { name: "twitter:image", content: ogImage },
        { "script:ld+json": articleLd({ title: branch.label, description: branch.summary, path: `/branch/${branch.id}` }) },
        {
          "script:ld+json": breadcrumbLd([
            { name: "Timeline", path: "/" },
            { name: "Branches", path: "/branch" },
            { name: branch.label, path: `/branch/${branch.id}` },
          ]),
        },
      ],
    };
  },
});

function BranchDetailPage() {
  const branch = Route.useLoaderData();
  const games = getGamesByBranch(branch.id as Branch).sort((a, b) => a.timelineOrder - b.timelineOrder);
  const parent = branch.parent ? getBranch(branch.parent) : null;
  const children = branches.filter((b) => b.parent === branch.id);
  const threads = getThreadsForBranch(branch.id as Branch);

  return (
    <SlateFrame>
      <article className="section-page branch-page">
        <header className="branch-page__hero" style={{ borderColor: branch.color }}>
          <h1 style={{ color: branch.color }}>{branch.label}</h1>
          <p className="branch-page__summary">{branch.summary}</p>
          <p className="branch-page__split">
            <strong>Fork point:</strong> {branch.splitAt}
          </p>
          {parent && (
            <p className="branch-page__lineage">
              Diverges from{" "}
              <Link to="/branch/$id" params={{ id: parent.id }} style={{ color: parent.color }}>
                {parent.label}
              </Link>
            </p>
          )}
          {children.length > 0 && (
            <p className="branch-page__lineage">
              Forks into:{" "}
              {children.map((c, i) => (
                <span key={c.id}>
                  {i > 0 && " · "}
                  <Link to="/branch/$id" params={{ id: c.id }} style={{ color: c.color }}>
                    {c.label}
                  </Link>
                </span>
              ))}
            </p>
          )}
        </header>

        <section className="branch-page__arc">
          <h2 className="section-title">The Story Arc</h2>
          {branch.storyArc.split("\n\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </section>

        <section>
          <h2 className="section-title">Games, in chronological order</h2>
          <div className="game-grid">
            {games.map((g) => (
              <GameCard key={g.id} game={g} />
            ))}
          </div>
        </section>

        {threads.length > 0 && (
          <section>
            <h2 className="section-title">Threads running through this branch</h2>
            <div className="chip-row">
              {threads.map((t) => (
                <Link key={t.id} to="/threads/$id" params={{ id: t.id }} className="chip chip--thread">
                  {t.title}
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </SlateFrame>
  );
}
