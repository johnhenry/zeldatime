import { createFileRoute, Link } from "@tanstack/react-router";
import { SlateFrame } from "~/components/SlateFrame";
import { threads } from "~/data/threads";
import type { ThreadKind } from "~/types/content";
import { pageMeta } from "~/lib/site";

export const Route = createFileRoute("/threads/")({
  component: ThreadsHubPage,
  head: () => ({
    meta: pageMeta(
      "Threads | Chronicle Slate",
      "Species, artifacts, items, enemies, wildlife, and places traced across every Zelda game they touch.",
      "/threads"
    ),
  }),
});

const KIND_ORDER: ThreadKind[] = [
  "character",
  "species",
  "artifact",
  "item",
  "force",
  "enemy",
  "wildlife",
  "place",
  "recurring",
];

const KIND_SECTIONS: Record<ThreadKind, { title: string; blurb: string }> = {
  character: { title: "Characters", blurb: "The three souls the curse keeps recycling." },
  species: { title: "Species", blurb: "Watch whole peoples evolve — or refuse to — across the branches." },
  artifact: { title: "Artifacts", blurb: "The relics history keeps handing back to its heroes." },
  item: { title: "Items & Equipment", blurb: "The tools, gear, and collectibles every era reinvents." },
  force: { title: "Forces", blurb: "The powers that bend every timeline around them." },
  enemy: { title: "Enemies", blurb: "The menagerie that keeps showing up for a beating." },
  wildlife: { title: "Wildlife & Critters", blurb: "Cuccos, horses, and fairies — Hyrule's living furniture." },
  place: { title: "Places & Temples", blurb: "The landmarks each era ruins and rebuilds." },
  recurring: { title: "Recurring Events", blurb: "History's habit of rhyming with itself." },
};

function ThreadsHubPage() {
  return (
    <SlateFrame>
      <div className="section-page">
        <h1>Threads</h1>
        <p className="section-page__intro">
          The elements that refuse to stay in one game — species, artifacts, items, enemies,
          critters, and places, each traced across every era it appears in.
        </p>
        {KIND_ORDER.map((kind) => {
          const group = threads.filter((t) => t.kind === kind);
          if (group.length === 0) return null;
          const section = KIND_SECTIONS[kind];
          return (
            <section key={kind} className="thread-kind-section">
              <h2 className="section-title">{section.title}</h2>
              <p className="thread-kind-section__blurb">{section.blurb}</p>
              <div className="thread-grid">
                {group.map((t) => (
                  <Link key={t.id} to="/threads/$id" params={{ id: t.id }} className="thread-card panel">
                    <span className="thread-card__kind">{section.title}</span>
                    <h3>{t.title}</h3>
                    <p>{t.blurb}</p>
                    <span className="thread-card__count">{t.entries.length} appearances</span>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </SlateFrame>
  );
}
