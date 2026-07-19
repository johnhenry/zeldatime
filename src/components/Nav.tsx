import { Link } from "@tanstack/react-router";
import { SoundToggle } from "~/components/SoundToggle";
import { CommandPalette } from "~/components/CommandPalette";
import { playConfirm } from "~/lib/sound";

const ACTIVE_PROPS = { "aria-current": "page" as const };

export function Nav() {
  return (
    <header className="nav">
      <Link to="/" className="nav__brand">
        <span className="nav__brand-mark" aria-hidden="true" />
        Chronicle Slate
      </Link>
      <nav className="nav__links">
        <Link to="/" activeOptions={{ exact: true }} activeProps={ACTIVE_PROPS} onClick={() => playConfirm()}>
          Timeline
        </Link>
        <Link to="/explore" activeProps={ACTIVE_PROPS} onClick={() => playConfirm()}>
          Explore
        </Link>
        <Link to="/codex" activeProps={ACTIVE_PROPS} onClick={() => playConfirm()}>
          Codex
        </Link>
        <Link to="/about" activeProps={ACTIVE_PROPS} onClick={() => playConfirm()}>
          About
        </Link>
        <CommandPalette />
        <SoundToggle />
      </nav>
    </header>
  );
}
