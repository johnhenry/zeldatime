import { createFileRoute, Link } from "@tanstack/react-router";
import { SlateFrame } from "~/components/SlateFrame";

export const Route = createFileRoute("/explore/")({
  component: ExplorePage,
  head: () => ({
    meta: [
      { title: "Explore | Chronicle Slate" },
      { name: "description", content: "Branches, threads, glossary, and stats — every way into the chronicle." },
    ],
  }),
});

const SECTIONS = [
  {
    to: "/branch" as const,
    title: "Branches",
    blurb: "Eight histories, one per timeline lane — story arcs, fork points, and every game in order.",
  },
  {
    to: "/threads" as const,
    title: "Threads",
    blurb: "The Master Sword, Ganon's incarnations, the Triforce — recurring elements traced across every appearance.",
  },
  {
    to: "/glossary" as const,
    title: "Glossary",
    blurb: "The load-bearing vocabulary: Imprisoning Wars, Sheikah Slates, Demise's curse, and what 'semi-canon' means here.",
  },
  {
    to: "/stats" as const,
    title: "Stats & Trivia",
    blurb: "The chronicle by the numbers — decades, platforms, branches, and the longest droughts.",
  },
];

function ExplorePage() {
  return (
    <SlateFrame>
      <div className="section-page explore-page">
        <h1>Explore</h1>
        <p className="section-page__intro">Every way into the chronicle beyond the timeline itself.</p>
        <div className="explore-grid">
          {SECTIONS.map((s) => (
            <Link key={s.to} to={s.to} className="explore-card panel">
              <h2>{s.title}</h2>
              <p>{s.blurb}</p>
            </Link>
          ))}
        </div>
      </div>
    </SlateFrame>
  );
}
