import { Link } from "@tanstack/react-router";
import type { Game } from "~/types/game";
import { branches, getBranch } from "~/data/timeline";

/**
 * Mobile-first vertical rendering of the timeline. Deliberately a separate
 * DOM component (not an orientation mode of the SVG diagram): HTML flows,
 * thumb-scrolls, and lazy-loads naturally, and <img> accepts hosts that
 * SVG <image> can't.
 */
export function VerticalTimeline({ games }: { games: Game[] }) {
  const activeBranches = branches.filter((b) => games.some((g) => g.branch === b.id));

  if (games.length === 0) {
    return (
      <div className="timeline-vertical">
        <p style={{ color: "var(--slate-400)" }}>No games match the current filters.</p>
      </div>
    );
  }

  return (
    <div className="timeline-vertical">
      {activeBranches.map((branch) => {
        const branchGames = games
          .filter((g) => g.branch === branch.id)
          .sort((a, b) => a.timelineOrder - b.timelineOrder);
        const parent = branch.parent ? getBranch(branch.parent) : null;

        return (
          <section key={branch.id} className="vt-branch" style={{ borderColor: branch.color }}>
            <header className="vt-branch__header">
              <h2 style={{ color: branch.color }}>{branch.label}</h2>
              {parent && (
                <p className="vt-branch__fork">
                  diverges from <strong style={{ color: parent.color }}>{parent.label}</strong> at{" "}
                  {branch.splitAt}
                </p>
              )}
            </header>
            <ol className="vt-branch__games" style={{ borderColor: branch.color }}>
              {branchGames.map((g) => (
                <li key={g.id} className="vt-game">
                  <Link to="/game/$slug" params={{ slug: g.id }} className="vt-game__link">
                    {g.image && (
                      <img
                        src={g.image}
                        alt={`${g.title} box art`}
                        loading="lazy"
                        className="vt-game__art"
                        style={{ borderColor: branch.color }}
                      />
                    )}
                    <span className="vt-game__text">
                      <strong>{g.title}</strong>
                      <small>
                        {g.releaseYear} &middot; {g.platform}
                      </small>
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </section>
        );
      })}
    </div>
  );
}
