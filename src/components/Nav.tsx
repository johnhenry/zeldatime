import { Link } from "@tanstack/react-router";

export function Nav() {
  return (
    <header className="nav">
      <Link to="/" className="nav__brand">
        <span className="nav__brand-mark" aria-hidden="true" />
        Chronicle Slate
      </Link>
      <nav className="nav__links">
        <Link to="/" activeOptions={{ exact: true }}>
          Timeline
        </Link>
        <Link to="/explore">Explore</Link>
        <Link to="/codex">Codex</Link>
        <Link to="/about">About</Link>
      </nav>
    </header>
  );
}
