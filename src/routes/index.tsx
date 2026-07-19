import { createFileRoute } from "@tanstack/react-router";
import { SlateFrame } from "~/components/SlateFrame";
import { games } from "~/data/games";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <SlateFrame>
      <main className="container">
        <h1>Chronicle Slate</h1>
        <p>{games.length} games tracked.</p>
      </main>
    </SlateFrame>
  );
}
