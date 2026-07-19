import { narrativeSteps } from "~/data/narrative";
import { getGameBySlug } from "~/data/games";
import { getBranch } from "~/data/timeline";
import { useScrollyState } from "~/components/scrolly/useScrollyState";
import { Link } from "@tanstack/react-router";

function MedallionCluster({ stepIndex }: { stepIndex: number }) {
  const step = narrativeSteps[stepIndex];
  return (
    <div className="scrolly-cluster">
      <p className="scrolly-cluster__era" style={{ color: step.accentColor }}>
        {step.eraLabel}
      </p>
      <div className="scrolly-cluster__medallions">
        {step.focusGameIds.map((id) => {
          const game = getGameBySlug(id);
          if (!game) return null;
          const branch = getBranch(game.branch);
          return (
            <Link
              key={id}
              to="/game/$slug"
              params={{ slug: id }}
              className="scrolly-medallion"
              style={{ borderColor: branch?.color }}
              aria-label={game.title}
            >
              {game.image && <img src={game.image} alt="" loading="lazy" />}
              <span className="scrolly-medallion__label">{game.title}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

/**
 * The guided era-by-era narrative. Static stacked layout by default (SSR,
 * reduced motion, narrow screens); upgrades to a pinned sticky stage with
 * cross-fading era layers when eligible. DOM content is identical in both
 * modes — only classes and observers change after mount.
 */
export function TimelineScrolly() {
  const { active, enabled, stepRefs } = useScrollyState(narrativeSteps.length);

  return (
    <div className={`scrolly ${enabled ? "scrolly--active" : ""}`}>
      {/* Pinned stage: every era layer stacked; the active one is visible. */}
      <div className="scrolly__stage" aria-hidden={!enabled}>
        {narrativeSteps.map((step, i) => (
          <div key={step.id} className={`scrolly__layer ${i === active ? "scrolly__layer--active" : ""}`}>
            <MedallionCluster stepIndex={i} />
          </div>
        ))}
        <div className="scrolly__rail" role="presentation">
          {narrativeSteps.map((step, i) => (
            <span
              key={step.id}
              className={`scrolly__dot ${i === active ? "scrolly__dot--active" : ""}`}
              style={i === active ? { backgroundColor: step.accentColor, boxShadow: `0 0 8px ${step.accentColor}` } : undefined}
            />
          ))}
        </div>
      </div>

      {/* Steps: text cards (always visible) + per-step cluster (static mode only). */}
      <div className="scrolly__steps">
        {narrativeSteps.map((step, i) => (
          <section
            key={step.id}
            ref={(el) => {
              stepRefs.current[i] = el;
            }}
            className="scrolly__step"
          >
            <div className="scrolly__card panel" style={{ borderLeft: `3px solid ${step.accentColor}` }}>
              <p className="scrolly__card-era" style={{ color: step.accentColor }}>
                {step.eraLabel}
              </p>
              <h2>{step.headline}</h2>
              <p>{step.body}</p>
            </div>
            <div className="scrolly__inline-cluster">
              <MedallionCluster stepIndex={i} />
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
