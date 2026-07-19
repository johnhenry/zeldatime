import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SlateFrame } from "~/components/SlateFrame";
import { GameCard } from "~/components/GameCard";
import { ConfidenceBadge } from "~/components/ConfidenceBadge";
import { GameBackground } from "~/components/GameBackground";
import { GamePager } from "~/components/GamePager";
import { ConnectionList } from "~/components/ConnectionList";
import { getGameBySlug, getRelatedGames } from "~/data/games";
import { getBranch } from "~/data/timeline";
import { getThreadsForGame } from "~/data/threads";
import { getTermsForGame } from "~/data/glossary";
import { absoluteUrl, ogImageFor } from "~/lib/site";
import { videoGameLd, breadcrumbLd } from "~/lib/jsonld";

export const Route = createFileRoute("/game/$slug")({
  component: GameDetailPage,
  loader: ({ params }) => {
    const game = getGameBySlug(params.slug);
    if (!game) throw notFound();
    return game;
  },
  head: ({ params, loaderData }) => {
    const game = loaderData ?? getGameBySlug(params.slug);
    if (!game) return { meta: [{ title: "Game Not Found | Chronicle Slate" }] };

    const title = `${game.title} | Chronicle Slate`;
    const ogImage = ogImageFor([game.keyArt, game.image]) ?? absoluteUrl("/icon-512.png");
    const branch = getBranch(game.branch);

    return {
      meta: [
        { title },
        { name: "description", content: game.synopsis },
        { property: "og:type", content: "article" },
        { property: "og:title", content: title },
        { property: "og:description", content: game.synopsis },
        { property: "og:image", content: ogImage },
        { property: "og:url", content: absoluteUrl(`/game/${game.id}`) },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: game.synopsis },
        { name: "twitter:image", content: ogImage },
        { "script:ld+json": videoGameLd(game) },
        {
          "script:ld+json": breadcrumbLd([
            { name: "Timeline", path: "/" },
            { name: branch?.label ?? "Branch", path: `/branch/${game.branch}` },
            { name: game.title, path: `/game/${game.id}` },
          ]),
        },
      ],
    };
  },
});

function GameDetailPage() {
  const game = Route.useLoaderData();
  const branch = getBranch(game.branch);
  const related = getRelatedGames(game);
  const threads = getThreadsForGame(game.id);
  const terms = getTermsForGame(game.id);

  return (
    <SlateFrame>
      <GameBackground game={game} />
      <article className="detail-page">
        <div className="detail-hero" style={{ borderColor: branch?.color }}>
          {game.image && (
            <div className="detail-hero__art" style={{ borderColor: branch?.color }}>
              <img src={game.image} alt={`${game.title} box art`} />
            </div>
          )}
          <div className="detail-hero__info">
            <Link
              to="/branch/$id"
              params={{ id: game.branch }}
              className="detail-hero__branch"
              style={{ color: branch?.color }}
            >
              {branch?.label} →
            </Link>
            <h1>{game.title}</h1>
            <p className="detail-hero__meta">
              {game.releaseDate} &middot; {game.platform}
            </p>
            <div className="detail-hero__badges">
              <span className={`canonicity-badge canonicity-badge--${game.canonicity}`}>
                {game.canonicity.replace("-", " ")}
              </span>
              <ConfidenceBadge confidence={game.placementConfidence} />
            </div>
          </div>
        </div>

        <section className="detail-synopsis">
          <p>{game.synopsis}</p>
        </section>

        {game.sourcingNotes && (
          <section className="detail-sourcing">
            <h2 className="section-title">Placement Reasoning</h2>
            <p>{game.sourcingNotes}</p>
          </section>
        )}

        {game.trivia.length > 0 && (
          <section className="detail-trivia">
            <h2 className="section-title">Notable &amp; Interesting</h2>
            <ul>
              {game.trivia.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        {(game.connections?.length ?? 0) > 0 && (
          <section className="detail-connections">
            <h2 className="section-title">Connections</h2>
            <ConnectionList game={game} />
          </section>
        )}

        {threads.length > 0 && (
          <section className="detail-threads">
            <h2 className="section-title">Part of these threads</h2>
            <div className="chip-row">
              {threads.map((t) => (
                <Link key={t.id} to="/threads/$id" params={{ id: t.id }} className="chip chip--thread">
                  {t.title}
                </Link>
              ))}
            </div>
          </section>
        )}

        {terms.length > 0 && (
          <section className="detail-terms">
            <h2 className="section-title">Key terms</h2>
            <div className="chip-row">
              {terms.map((t) => (
                <Link key={t.id} to="/glossary" hash={t.id} className="chip chip--term">
                  {t.term}
                </Link>
              ))}
            </div>
          </section>
        )}

        {related.length > 0 && (
          <section className="detail-related">
            <h2 className="section-title">Also on the {branch?.label}</h2>
            <div className="game-grid">
              {related.map((g) => (
                <GameCard key={g.id} game={g} />
              ))}
            </div>
          </section>
        )}

        <GamePager game={game} />
      </article>
    </SlateFrame>
  );
}
