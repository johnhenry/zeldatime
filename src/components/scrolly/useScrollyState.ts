import { useEffect, useRef, useState } from "react";

/**
 * SSR-safe scrollytelling state. Server and first client render agree on
 * { active: 0, enabled: false } (static layout); the pinned experience is a
 * post-mount upgrade, only when the viewport is wide and the user hasn't
 * asked for reduced motion. Step detection is discrete (IntersectionObserver
 * around the viewport's center band) — no per-pixel scrub math to drift.
 */
export function useScrollyState(stepCount: number) {
  const [active, setActive] = useState(0);
  const [enabled, setEnabled] = useState(false);
  const stepRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const narrow = window.matchMedia("(max-width: 719px)");
    const update = () => setEnabled(!reduced.matches && !narrow.matches);
    update();
    reduced.addEventListener("change", update);
    narrow.addEventListener("change", update);
    return () => {
      reduced.removeEventListener("change", update);
      narrow.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = stepRefs.current.indexOf(entry.target as HTMLElement);
            if (idx >= 0) setActive(idx);
          }
        }
      },
      // A step is "active" while it crosses the middle band of the viewport.
      { rootMargin: "-45% 0px -45% 0px" }
    );
    for (const el of stepRefs.current) {
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [enabled, stepCount]);

  return { active, enabled, stepRefs };
}
