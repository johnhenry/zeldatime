import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { buildSearchIndex, scoreAndFilter, type SearchItem } from "~/lib/searchIndex";
import { playConfirm, playToggle } from "~/lib/sound";

const KIND_LABEL: Record<SearchItem["kind"], string> = {
  game: "Game",
  thread: "Thread",
  branch: "Branch",
  term: "Term",
  page: "Page",
};

/**
 * Self-contained: owns the trigger button, the dialog, and the global
 * keydown listener in one component (Nav mounts once via SlateFrame, so
 * there's exactly one instance -- no context/provider needed). Follows the
 * SoundToggle SSR-safe pattern: renders a static trigger during SSR/first
 * paint, wires up the keydown listener and dialog only after mount.
 */
export function CommandPalette() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    const onKeyDown = (e: KeyboardEvent) => {
      const isMod = e.metaKey || e.ctrlKey;
      if (isMod && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mounted, open]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      // Focus after the dialog paints.
      requestAnimationFrame(() => inputRef.current?.focus());
    } else {
      triggerRef.current?.focus();
    }
  }, [open]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return scoreAndFilter(query, buildSearchIndex());
  }, [query]);

  // Keyed on `query`, not `results.length` -- two different queries can
  // produce the same result count, which would silently skip this reset
  // and leave a stale highlighted row (and Enter would jump to the wrong
  // page) whenever the count happens to match.
  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const go = (item: SearchItem) => {
    playConfirm();
    setOpen(false);
    // The search index's `to`/`params` are built from data, not literal
    // route paths, so they can't satisfy navigate()'s inferred route-path
    // union without a cast -- every value in the index is a real route
    // defined elsewhere in src/routes/, just not provable to the type
    // checker from a dynamic string.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    navigate({ to: item.to, params: item.params, hash: item.hash } as any);
  };

  const onInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = results[activeIndex];
      if (item) go(item);
    } else if (e.key === "Tab") {
      // Simple focus trap: keep focus inside the input (there's only one
      // real tab stop besides the results, which are click/arrow-only).
      e.preventDefault();
    }
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="cmdk-trigger"
        onClick={() => {
          playToggle(true);
          setOpen(true);
        }}
        aria-label="Search Chronicle Slate (Ctrl+K)"
        title="Search (Ctrl+K)"
      >
        <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
          <circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <line x1="15.3" y1="15.3" x2="21" y2="21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        <span className="cmdk-trigger__hint">⌘K</span>
      </button>

      {mounted && open && (
        <div className="cmdk-overlay" onClick={() => setOpen(false)}>
          <div
            className="cmdk-dialog panel"
            role="dialog"
            aria-modal="true"
            aria-label="Search Chronicle Slate"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="cmdk-input-row">
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" className="cmdk-input-icon">
                <circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
                <line x1="15.3" y1="15.3" x2="21" y2="21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                className="cmdk-input"
                placeholder="Search games, threads, branches, terms…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKeyDown}
                role="combobox"
                aria-expanded={results.length > 0}
                aria-controls="cmdk-listbox"
                aria-activedescendant={results[activeIndex] ? `cmdk-opt-${results[activeIndex].id}` : undefined}
                autoComplete="off"
              />
              <kbd className="cmdk-esc">Esc</kbd>
            </div>

            <div id="cmdk-listbox" role="listbox" className="cmdk-results" ref={listRef}>
              {query.trim() && results.length === 0 && (
                <p className="cmdk-empty">No matches for &ldquo;{query}&rdquo;.</p>
              )}
              {results.map((item, i) => (
                <button
                  key={item.id}
                  id={`cmdk-opt-${item.id}`}
                  role="option"
                  aria-selected={i === activeIndex}
                  type="button"
                  className={`cmdk-result ${i === activeIndex ? "cmdk-result--active" : ""}`}
                  onMouseEnter={() => setActiveIndex(i)}
                  onClick={() => go(item)}
                >
                  <span className="cmdk-result__kind">{KIND_LABEL[item.kind]}</span>
                  <span className="cmdk-result__text">
                    <strong>{item.title}</strong>
                    <small>{item.subtitle}</small>
                  </span>
                </button>
              ))}
              {!query.trim() && (
                <p className="cmdk-empty">Type to search every game, branch, thread, and term.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
