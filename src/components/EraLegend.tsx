import { branches } from "~/data/timeline";

export function EraLegend() {
  return (
    <div className="era-legend">
      {branches.map((b) => (
        <span key={b.id} className="era-legend__item">
          <span className="era-legend__swatch" style={{ backgroundColor: b.color }} />
          {b.label}
        </span>
      ))}
    </div>
  );
}
