import { Link } from "@tanstack/react-router";
import { SoundToggle } from "~/components/SoundToggle";
import { playConfirm } from "~/lib/sound";

export function Nav() {
  return (
    <header className="nav">
      <Link to="/" className="nav__brand">
        <span className="nav__brand-mark" aria-hidden="true" />
        Chronicle Slate
      </Link>
      <nav className="nav__links">
        <Link to="/" activeOptions={{ exact: true }} onClick={() => playConfirm()}>
          Timeline
        </Link>
        <Link to="/explore" onClick={() => playConfirm()}>
          Explore
        </Link>
        <Link to="/codex" onClick={() => playConfirm()}>
          Codex
        </Link>
        <Link to="/about" onClick={() => playConfirm()}>
          About
        </Link>
        <SoundToggle />
      </nav>
    </header>
  );
}
