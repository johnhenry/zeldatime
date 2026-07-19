import type { Branch, Era } from "./game";

export interface TimelineNode {
  id: string;
  label: string;
  era: Era;
  order: number;
  description?: string;
}

export interface TimelineBranch {
  id: Branch;
  label: string;
  parent: Branch | null;
  splitAt: string;
  color: string;
}
