import type { Branch } from "./game";

export type ConnectionType =
  | "diverges-from"
  | "direct-sequel"
  | "direct-prequel"
  | "remake-of"
  | "same-hero"
  | "parallel"
  | "thematic";

export interface Connection {
  type: ConnectionType;
  targetId: string;
  note?: string;
}

export type ThreadKind = "artifact" | "character" | "force" | "recurring";

export interface ThreadEntry {
  gameId: string;
  note: string;
}

export interface Thread {
  id: string;
  title: string;
  kind: ThreadKind;
  blurb: string;
  entries: ThreadEntry[];
}

export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  source?: string;
  relatedGameIds?: string[];
  relatedThreadIds?: string[];
}

export interface NarrativeStep {
  id: string;
  eraLabel: string;
  branchIds: Branch[];
  headline: string;
  body: string;
  focusGameIds: string[];
  accentColor: string;
}
