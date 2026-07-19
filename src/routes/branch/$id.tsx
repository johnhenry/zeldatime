import { createFileRoute, Link } from "@tanstack/react-router";
import { SlateFrame } from "~/components/SlateFrame";
import { GameCard } from "~/components/GameCard";
import { branches, getBranch } from "~/data/timeline";
import { getGamesByBranch } from "~/data/games";
import { getThreadsForBranch } from "~/data/threads";
import type { Branch } from "~/types/game";

export const Route = createFileRoute("/branch/$id")({
  component: BranchDetailPage,
  head: ({ params }) => {
    const branch = getBranch(params.id);
    return {
      meta: [
        { title: branch ? `${branch.label} | Chronicle Slate` : "Branch Not Found | Chronicle Slate" },
        { name: "description", content: branch?.summary ?? "Branch not found" },
      ],
    };
  },
});

function BranchDetailPage() {
  const { id } = Route.useParams();
  const branch = getBranch(id);

  if (!branch) {
    return (
      <SlateFrame>
        <div className="not-found">
          <h1>404</h1>
          <p>No such branch in the chronicle.</p>
          <Link to="/branch">All branches</Link>
        </div>
      </SlateFrame>
    );
  }

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
