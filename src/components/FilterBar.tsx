import { branches } from "~/data/timeline";
import type { Canonicity } from "~/types/game";
import { playConfirm } from "~/lib/sound";

interface FilterBarProps {
  branch: string;
  canonicity: Canonicity | "all";
  onBranchChange: (branch: string) => void;
  onCanonicityChange: (canonicity: Canonicity | "all") => void;
  onClearAll: () => void;
  resultCount: number;
}

export function FilterBar({
  branch,
  canonicity,
  onBranchChange,
  onCanonicityChange,
  onClearAll,
  resultCount,
}: FilterBarProps) {
  return (
    <div className="filter-bar panel">
      <select
        value={branch}
        onChange={(e) => {
          playConfirm();
          onBranchChange(e.target.value);
        }}
        aria-label="Filter by branch"
      >
        <option value="all">All branches</option>
        {branches.map((b) => (
          <option key={b.id} value={b.id}>
            {b.label}
          </option>
        ))}
      </select>

      <select
        value={canonicity}
        onChange={(e) => onCanonicityChange(e.target.value as Canonicity | "all")}
        aria-label="Filter by canonicity"
      >
        <option value="all">All canonicity</option>
        <option value="canon">Canon</option>
        <option value="semi-canon">Semi-canon</option>
        <option value="non-canon">Non-canon</option>
      </select>

      <button type="button" className="filter-bar__clear" onClick={onClearAll}>
        Clear filters
      </button>

      <span className="filter-bar__count">{resultCount} games</span>
    </div>
  );
}
