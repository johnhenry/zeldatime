import { createFileRoute, Link } from "@tanstack/react-router";
import { SlateFrame } from "~/components/SlateFrame";
import { GameCard } from "~/components/GameCard";
import { ConfidenceBadge } from "~/components/ConfidenceBadge";
import { getGameBySlug, getRelatedGames } from "~/data/games";
import { getBranch } from "~/data/timeline";

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

  return (
    <SlateFrame>
      <article className="detail-page">
        <div className="detail-hero" style={{ borderColor: branch?.color }}>
          {game.image && (
            <div className="detail-hero__art" style={{ borderColor: branch?.color }}>
              <img src={game.image} alt={`${game.title} box art`} />
            </div>
          )}
          <div className="detail-hero__info">
            <p className="detail-hero__branch" style={{ color: branch?.color }}>
              {branch?.label}
            </p>
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
            <h2>Placement Reasoning</h2>
            <p>{game.sourcingNotes}</p>
          </section>
        )}

        {game.trivia.length > 0 && (
          <section className="detail-trivia">
            <h2>Notable &amp; Interesting</h2>
            <ul>
              {game.trivia.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        {related.length > 0 && (
          <section className="detail-related">
            <h2>Also on the {branch?.label}</h2>
            <div className="game-grid">
              {related.map((g) => (
                <GameCard key={g.id} game={g} />
              ))}
            </div>
          </section>
        )}
      </article>
    </SlateFrame>
  );
}
