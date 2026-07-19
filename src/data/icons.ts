export type IconCategory = "hud" | "map" | "musou";

export interface MapIcon {
  id: string;
  label: string;
  description: string;
  category: IconCategory;
  color: string;
  /** Which paper(s) this icon is most relevant to. */
  papers: ("ui" | "aoi-maps")[];
}

/**
 * An original icon key — Chronicle Slate's own interpretive drawings of
 * concepts described in our research, NOT reproductions of any game's
 * actual icon art. No source in either research pass turned up a primary
 * icon-vocabulary reference for these games (a real, documented gap — see
 * docs/aoi-maps-research.md's "what still isn't documented" section), so
 * these are illustrative diagrams of what the *written descriptions* say,
 * drawn in this site's own geometric style.
 */
export const mapIcons: MapIcon[] = [
  {
    id: "life-gauge",
    label: "Life Gauge",
    description: "Heart-based health display, a series constant since 1986 — still the anchor of every HUD's top-left corner.",
    category: "hud",
    color: "#e05c5c",
    papers: ["ui", "aoi-maps"],
  },
  {
    id: "stamina-wheel",
    label: "Stamina Wheel",
    description: "BOTW/TOTK's circular stamina meter, appearing only while climbing, swimming, or sprinting — minimal by design.",
    category: "hud",
    color: "#4caf7d",
    papers: ["ui"],
  },
  {
    id: "diegetic-slate",
    label: "Diegetic Slate Device",
    description: "The Sheikah Slate / Purah Pad framing device — an in-world object housing the map, camera, and compendium, not a floating menu.",
    category: "hud",
    color: "#4fd1c5",
    papers: ["ui"],
  },
  {
    id: "rune-ability",
    label: "Rune / Zonai Ability",
    description: "Radial ability-select iconography — BOTW's runes, TOTK's Ultrahand/Fuse/Ascend/Recall/Autobuild wheel.",
    category: "hud",
    color: "#e8b24d",
    papers: ["ui"],
  },
  {
    id: "shrine-marker",
    label: "Shrine Marker",
    description: "BOTW/TOTK overworld map pin marking a shrine — small, orange-glowing, ubiquitous.",
    category: "map",
    color: "#e8b24d",
    papers: ["ui"],
  },
  {
    id: "tower-marker",
    label: "Tower Marker",
    description: "Sheikah Tower map pin — climbing one reveals the surrounding region's fog of war.",
    category: "map",
    color: "#4fd1c5",
    papers: ["ui"],
  },
  {
    id: "divine-beast",
    label: "Divine Beast",
    description: "One of the four colossal Sheikah machines — Vah Ruta, Rudania, Medoh, Naboris — piloted by a Champion.",
    category: "map",
    color: "#3fc9c9",
    papers: ["ui"],
  },
  {
    id: "korok-marker",
    label: "Hidden Collectible",
    description: "A quest-gated collectible marker — Korok-equivalent pickups that Age of Imprisonment's minimap hides until specific side quests unlock their display.",
    category: "map",
    color: "#c9a13f",
    papers: ["ui", "aoi-maps"],
  },
  {
    id: "outpost-ally",
    label: "Outpost — Allied",
    description: "Diamond shield icon, blue for allied control — captured by defeating a guarding boss and draining the outpost's collective health bar.",
    category: "musou",
    color: "#3f8ec9",
    papers: ["aoi-maps"],
  },
  {
    id: "outpost-enemy",
    label: "Outpost — Enemy",
    description: "The same diamond shield in red — an objective to seize on the minimap during large-scale battles.",
    category: "musou",
    color: "#a34a4a",
    papers: ["aoi-maps"],
  },
  {
    id: "weak-point-gauge",
    label: "Weak-Point Gauge",
    description: "Exposed on Powerful/Dangerous Foes only — broken via Unique Skills, a perfect-dodge Flurry Rush, or after landing a Special Attack.",
    category: "musou",
    color: "#e8b24d",
    papers: ["ui", "aoi-maps"],
  },
  {
    id: "sync-gauge",
    label: "Sync Gauge",
    description: "Fills as two nearby characters fight together; once full it pulsates and a Sync Strike becomes available via the L button.",
    category: "musou",
    color: "#4fd1c5",
    papers: ["ui", "aoi-maps"],
  },
  {
    id: "special-attack-gauge",
    label: "Special Attack Gauge",
    description: "A large yellow bar that fills as you land hits — the musou genre's classic build-and-release super meter.",
    category: "musou",
    color: "#e8c34d",
    papers: ["ui", "aoi-maps"],
  },
  {
    id: "energy-cell",
    label: "Energy Cell / Battery",
    description: "Two separate resources gate Zonai device use: an Energy Gauge that drains during use, and a passively-refilling Battery pool.",
    category: "musou",
    color: "#4caf7d",
    papers: ["aoi-maps"],
  },
  {
    id: "powerful-foe",
    label: "Powerful Foe",
    description: "An outlined red dot on the minimap — a stronger enemy, distinguished from ordinary mob groups shown as plain red dots.",
    category: "musou",
    color: "#a34a4a",
    papers: ["aoi-maps"],
  },
  {
    id: "ally-order",
    label: "Ally Order Target",
    description: "The target reticle placed on the map to direct an off-screen ally (or the whole party) to a location without switching control to them.",
    category: "musou",
    color: "#c9a13f",
    papers: ["aoi-maps"],
  },
];

export function getIconsForPaper(paper: "ui" | "aoi-maps"): MapIcon[] {
  return mapIcons.filter((i) => i.papers.includes(paper));
}
