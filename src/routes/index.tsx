import { createFileRoute } from "@tanstack/react-router";
import { games } from "~/data/games";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <div className="page">
      <main className="container">
        <h1>Chronicle Slate</h1>
        <p>{games.length} games tracked.</p>
      </main>
    </div>
  );
}
