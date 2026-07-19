import { createFileRoute, Link } from "@tanstack/react-router";
import { SlateFrame } from "~/components/SlateFrame";
import { threads } from "~/data/threads";

export const Route = createFileRoute("/threads/")({
  component: ThreadsHubPage,
  head: () => ({
    meta: [
      { title: "Threads | Chronicle Slate" },
      { name: "description", content: "Recurring artifacts, characters, and forces traced across every Zelda game they touch." },
    ],
  }),
});

const KIND_LABELS: Record<string, string> = {
  artifact: "Artifact",
  character: "Character",
  force: "Force",
  recurring: "Recurring event",
};

function ThreadsHubPage() {
  return (
    <SlateFrame>
      <div className="section-page">
        <h1>Threads</h1>
        <p className="section-page__intro">
          The elements that refuse to stay in one game — traced across every era they appear in.
        </p>
        <div className="thread-grid">
          {threads.map((t) => (
            <Link key={t.id} to="/threads/$id" params={{ id: t.id }} className="thread-card panel">
              <span className="thread-card__kind">{KIND_LABELS[t.kind]}</span>
              <h2>{t.title}</h2>
              <p>{t.blurb}</p>
              <span className="thread-card__count">{t.entries.length} appearances</span>
            </Link>
          ))}
        </div>
      </div>
    </SlateFrame>
  );
}
