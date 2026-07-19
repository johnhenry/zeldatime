import { createFileRoute, Link } from "@tanstack/react-router";
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

export const Route = createFileRoute("/game/$slug")({
  component: GameDetailPage,
  head: ({ params }) => {
    const game = getGameBySlug(params.slug);
    return {
      meta: [
        { title: game ? `${game.title} | Chronicle Slate` : "Game Not Found | Chronicle Slate" },
        { name: "description", content: game?.synopsis ?? "Game not found" },
      ],
    };
  },
});

function GameDetailPage() {
  const { slug } = Route.useParams();
  const game = getGameBySlug(slug);

  if (!game) {
    return (
      <SlateFrame>
        <div className="not-found">
          <h1>404</h1>
          <p>This game hasn't been chronicled yet.</p>
          <Link to="/">Back to the Timeline</Link>
        </div>
      </SlateFrame>
    );
  }

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
