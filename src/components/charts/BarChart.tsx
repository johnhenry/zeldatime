import { scaleLinear } from "d3-scale";
import type { StatDatum } from "~/data/stats";

interface BarChartProps {
  data: StatDatum[];
  title: string;
  color?: string;
}

const BAR_HEIGHT = 30;
const GAP = 12;
const LABEL_WIDTH = 168;
const VALUE_WIDTH = 36;
const CHART_WIDTH = 560;

export function BarChart({ data, title, color = "var(--accent-cyan)" }: BarChartProps) {
  const max = Math.max(1, ...data.map((d) => d.value));
  const x = scaleLinear().domain([0, max]).range([0, CHART_WIDTH - LABEL_WIDTH - VALUE_WIDTH]);
  const height = data.length * (BAR_HEIGHT + GAP);

  return (
    <figure className="bar-chart panel">
      <figcaption className="bar-chart__title">{title}</figcaption>
      <svg viewBox={`0 0 ${CHART_WIDTH} ${height}`} width="100%" role="img" aria-label={title}>
        {data.map((d, i) => {
          const y = i * (BAR_HEIGHT + GAP);
          const barColor = d.color ?? color;
          return (
            <g key={d.label}>
              <text x={LABEL_WIDTH - 10} y={y + BAR_HEIGHT / 2 + 4} textAnchor="end" fontSize={12.5} fill="var(--slate-200)">
                {d.label}
              </text>
              <rect
                x={LABEL_WIDTH}
                y={y + 4}
                width={Math.max(3, x(d.value))}
                height={BAR_HEIGHT - 8}
                rx={4}
                fill={barColor}
                opacity={0.85}
                filter="url(#fx-glow-soft)"
              />
              <text
                x={LABEL_WIDTH + Math.max(3, x(d.value)) + 8}
                y={y + BAR_HEIGHT / 2 + 4}
                fontSize={12.5}
                fontWeight={600}
                fill="var(--slate-100)"
              >
                {d.value}
              </text>
            </g>
          );
        })}
      </svg>
    </figure>
  );
}
