import { getIconsForPaper } from "~/data/icons";
import type { IconCategory, MapIcon } from "~/data/icons";

/**
 * Hand-drawn 24x24 glyphs — original geometric interpretations, not traced
 * from or copied out of any game. See src/data/icons.ts for the rationale.
 */
function Glyph({ id, color }: { id: string; color: string }) {
  const stroke = { fill: "none", stroke: color, strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

  switch (id) {
    case "life-gauge":
      return (
        <path
          d="M12 20 3 11a5 5 0 0 1 7-7l2 2 2-2a5 5 0 0 1 7 7z"
          fill={color}
          opacity={0.85}
        />
      );
    case "stamina-wheel":
      return (
        <>
          <circle cx="12" cy="12" r="8" {...stroke} strokeDasharray="10 3" />
          <circle cx="12" cy="12" r="2.5" fill={color} />
        </>
      );
    case "diegetic-slate":
      return (
        <>
          <rect x="4" y="3" width="16" height="18" rx="2" {...stroke} />
          <path d="M7 8h10M7 12h10M7 16h6" {...stroke} strokeWidth={1.2} />
        </>
      );
    case "rune-ability":
      return (
        <>
          <circle cx="12" cy="12" r="8" {...stroke} />
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <line
              key={deg}
              x1="12"
              y1="12"
              x2={12 + 6.5 * Math.cos((deg * Math.PI) / 180)}
              y2={12 + 6.5 * Math.sin((deg * Math.PI) / 180)}
              stroke={color}
              strokeWidth={1.3}
            />
          ))}
          <circle cx="12" cy="12" r="2" fill={color} />
        </>
      );
    case "shrine-marker":
      return (
        <path d="M12 3 20 12 12 21 4 12z" fill={color} opacity={0.85} />
      );
    case "tower-marker":
      return (
        <>
          <path d="M12 2 5 21h4l3-8 3 8h4z" fill={color} opacity={0.85} />
          <circle cx="12" cy="7" r="1.6" fill="var(--slate-950)" />
        </>
      );
    case "divine-beast":
      return (
        <>
          <rect x="4" y="9" width="16" height="9" rx="2" {...stroke} />
          <circle cx="9" cy="13.5" r="1.4" fill={color} />
          <circle cx="15" cy="13.5" r="1.4" fill={color} />
          <path d="M6 9 4 4M18 9l2-5" {...stroke} strokeWidth={1.3} />
        </>
      );
    case "korok-marker":
      return (
        <>
          <circle cx="12" cy="12" r="7" {...stroke} strokeDasharray="3 2.5" />
          <path d="M12 9v6M9.5 12h5" {...stroke} strokeWidth={1.4} />
        </>
      );
    case "outpost-ally":
    case "outpost-enemy":
      return (
        <>
          <path d="M12 2 21 7v6c0 5-4 8-9 9-5-1-9-4-9-9V7z" fill={color} opacity={0.28} stroke={color} strokeWidth={1.6} />
          <path d="M12 6v9M8.5 10h7" stroke={color} strokeWidth={1.4} strokeLinecap="round" />
        </>
      );
    case "weak-point-gauge":
      return (
        <>
          <circle cx="12" cy="12" r="8" {...stroke} strokeOpacity={0.35} />
          <path d="M12 4a8 8 0 0 1 7 11.5" {...stroke} />
          <circle cx="12" cy="12" r="2.4" fill={color} />
        </>
      );
    case "sync-gauge":
      return (
        <>
          <circle cx="8.5" cy="12" r="5" {...stroke} />
          <circle cx="15.5" cy="12" r="5" {...stroke} />
          <path d="M12 8.5a5 5 0 0 1 0 7" fill="none" stroke={color} strokeWidth={2.2} strokeLinecap="round" />
        </>
      );
    case "special-attack-gauge":
      return (
        <>
          <rect x="3" y="9" width="18" height="6" rx="3" {...stroke} />
          <rect x="4.5" y="10.5" width="12" height="3" rx="1.5" fill={color} />
        </>
      );
    case "energy-cell":
      return (
        <>
          <rect x="7" y="3" width="10" height="18" rx="2.5" {...stroke} />
          <rect x="10" y="1.5" width="4" height="2.5" rx="1" fill={color} />
          <rect x="9" y="12" width="6" height="6.5" rx="1" fill={color} opacity={0.85} />
        </>
      );
    case "powerful-foe":
      return (
        <>
          <circle cx="12" cy="12" r="8" {...stroke} strokeDasharray="2.5 2.5" />
          <circle cx="12" cy="12" r="3.5" fill={color} />
        </>
      );
    case "ally-order":
      return (
        <>
          <circle cx="12" cy="12" r="7.5" {...stroke} />
          <circle cx="12" cy="12" r="3" {...stroke} />
          <line x1="12" y1="1" x2="12" y2="4.5" stroke={color} strokeWidth={1.6} />
          <line x1="12" y1="19.5" x2="12" y2="23" stroke={color} strokeWidth={1.6} />
          <line x1="1" y1="12" x2="4.5" y2="12" stroke={color} strokeWidth={1.6} />
          <line x1="19.5" y1="12" x2="23" y2="12" stroke={color} strokeWidth={1.6} />
        </>
      );
    default:
      return <circle cx="12" cy="12" r="8" {...stroke} />;
  }
}

const CATEGORY_LABELS: Record<IconCategory, string> = {
  hud: "HUD & Overlay",
  map: "Map Markers",
  musou: "Musou / Warriors HUD",
};

function IconEntry({ icon }: { icon: MapIcon }) {
  return (
    <div className="icon-key__entry">
      <svg viewBox="0 0 24 24" width="34" height="34" className="icon-key__glyph" style={{ filter: "url(#fx-glow-soft)" }}>
        <Glyph id={icon.id} color={icon.color} />
      </svg>
      <div className="icon-key__text">
        <strong>{icon.label}</strong>
        <p>{icon.description}</p>
      </div>
    </div>
  );
}

export function IconKey({ paper }: { paper: "ui" | "aoi-maps" }) {
  const icons = getIconsForPaper(paper);
  const categories: IconCategory[] = ["hud", "map", "musou"];

  return (
    <aside className="icon-key panel">
      <h2 className="icon-key__title section-title">Icon Key</h2>
      <p className="icon-key__disclaimer">
        No official icon reference for these games' HUDs and maps exists publicly — a gap this
        project's own research confirmed. The glyphs below are Chronicle Slate's{" "}
        <strong>original interpretive drawings</strong> of what the sourced descriptions say,
        not reproductions of any game's actual icon art.
      </p>
      {categories.map((cat) => {
        const inCategory = icons.filter((i) => i.category === cat);
        if (inCategory.length === 0) return null;
        return (
          <div key={cat} className="icon-key__group">
            <h3>{CATEGORY_LABELS[cat]}</h3>
            <div className="icon-key__grid">
              {inCategory.map((icon) => (
                <IconEntry key={icon.id} icon={icon} />
              ))}
            </div>
          </div>
        );
      })}
    </aside>
  );
}
