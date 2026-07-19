import { useEffect } from "react";

const REVEAL_SELECTOR = [
  ".game-card",
  ".thread-card",
  ".branch-card",
  ".explore-card",
  ".glossary-entry",
  ".vt-game",
  ".stat-callout",
  ".bar-chart",
  ".thread-entry",
  ".connection-list__item",
  ".codex-index__card",
].join(", ");

/**
 * Fade-up reveal for cards as they enter the viewport — works on mobile,
 * unlike the desktop-only pinned scrolly. Elements already on screen at
 * mount are never hidden (no flash); reduced-motion users get nothing.
 */
export function useRevealOnScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR));
    const below = els.filter((el) => el.getBoundingClientRect().top > window.innerHeight * 0.92);
    if (below.length === 0) return;

    for (const el of below) el.classList.add("rv");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("rv-in");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -6% 0px" }
    );
    for (const el of below) observer.observe(el);
    return () => observer.disconnect();
  }, []);
}
