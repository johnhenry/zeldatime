import { createFileRoute, Link } from "@tanstack/react-router";
import { SlateFrame } from "~/components/SlateFrame";
import { getThread } from "~/data/threads";
import { getGameBySlug } from "~/data/games";
import { getBranch } from "~/data/timeline";

export const Route = createFileRoute("/threads/$id")({
  component: ThreadDetailPage,
  head: ({ params }) => {
    const thread = getThread(params.id);
    return {
      meta: [
        { title: thread ? `${thread.title} | Threads | Chronicle Slate` : "Thread Not Found | Chronicle Slate" },
        { name: "description", content: thread?.blurb ?? "Thread not found" },
      ],
    };
  },
});

function ThreadDetailPage() {
  const { id } = Route.useParams();
  const thread = getThread(id);

  if (!thread) {
    return (
      <SlateFrame>
        <div className="not-found">
          <h1>404</h1>
          <p>This thread hasn't been woven yet.</p>
          <Link to="/threads">All threads</Link>
        </div>
      </SlateFrame>
    );
  }

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
