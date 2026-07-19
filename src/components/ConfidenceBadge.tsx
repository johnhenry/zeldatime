import type { PlacementConfidence } from "~/types/game";

const LABELS: Record<PlacementConfidence, string> = {
  official: "Officially Placed",
  "strong-community": "Strong Community Consensus",
  speculative: "Speculative Placement",
};

export function ConfidenceBadge({ confidence }: { confidence: PlacementConfidence }) {
  return (
    <span className={`confidence-badge confidence-badge--${confidence}`}>
      {LABELS[confidence]}
    </span>
  );
}
