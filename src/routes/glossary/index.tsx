import { createFileRoute, Link } from "@tanstack/react-router";
import { SlateFrame } from "~/components/SlateFrame";
import { glossary } from "~/data/glossary";
import { getGameBySlug } from "~/data/games";
import { pageMeta } from "~/lib/site";

export const Route = createFileRoute("/glossary/")({
  component: GlossaryPage,
  head: () => ({
    meta: pageMeta(
      "Glossary | Chronicle Slate",
      "Key terms of the Zelda timeline, briefly defined and cross-linked.",
      "/glossary"
    ),
  }),
});

function GlossaryPage() {
  const sorted = [...glossary].sort((a, b) => a.term.localeCompare(b.term));

  return (
    <SlateFrame>
      <div className="section-page glossary-page">
        <h1>Glossary</h1>
        <p className="section-page__intro">
          The load-bearing vocabulary of the Zelda timeline — defined briefly, linked everywhere.
        </p>
        <dl className="glossary-list">
          {sorted.map((t) => (
            <div key={t.id} id={t.id} className="glossary-entry panel">
              <dt>{t.term}</dt>
              <dd>
                <p>{t.definition}</p>
                {(t.relatedGameIds?.length || t.relatedThreadIds?.length) && (
                  <div className="chip-row">
                    {t.relatedGameIds?.map((gid) => {
                      const g = getGameBySlug(gid);
                      return g ? (
                        <Link key={gid} to="/game/$slug" params={{ slug: gid }} className="chip">
                          {g.title}
                        </Link>
                      ) : null;
                    })}
                    {t.relatedThreadIds?.map((tid) => (
                      <Link key={tid} to="/threads/$id" params={{ id: tid }} className="chip chip--thread">
                        Thread
                      </Link>
                    ))}
                  </div>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </SlateFrame>
  );
}
