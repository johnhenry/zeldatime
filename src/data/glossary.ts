import type { GlossaryTerm } from "~/types/content";

export const glossary: GlossaryTerm[] = [
  {
    id: "triforce",
    term: "Triforce",
    definition:
      "The golden relic left by the three creator goddesses — Din, Nayru, and Farore — that grants the wish of whoever touches it, without judging the wisher. If the wisher's heart is unbalanced, it splits into its three components: Power, Wisdom, and Courage.",
    relatedThreadIds: ["triforce"],
  },
  {
    id: "hyrule-historia",
    term: "Hyrule Historia",
    definition:
      "Nintendo's 2011 25th-anniversary book, compiled under Eiji Aonuma — the first and most famous official publication of the complete series timeline, including the three-way Ocarina of Time split.",
    source: "docs/lore-research.md",
  },
  {
    id: "zelda-encyclopedia",
    term: "Zelda Encyclopedia",
    definition:
      "The 2017 companion volume whose revised chart is Nintendo's LAST published series timeline. Every game released since — including both Hyrule Warriors titles — exists outside any official chart.",
    source: "docs/lore-research.md",
  },
  {
    id: "timeline-split",
    term: "The Timeline Split",
    definition:
      "The three-way fork created by Ocarina of Time's ending: the Child Timeline (Link warns Zelda in time), the Adult Timeline (Link wins but vanishes into the past), and the Downfall Timeline (Link is defeated). Nintendo's official chart treats all three as simultaneously real.",
    relatedGameIds: ["ocarina-of-time"],
  },
  {
    id: "demises-curse",
    term: "Demise's Curse",
    definition:
      "The demon king's dying vow in Skyward Sword: an incarnation of his hatred will forever pursue those with the blood of the goddess and the spirit of the hero. The series' in-fiction explanation for why Link, Zelda, and Ganon endlessly recur.",
    relatedGameIds: ["skyward-sword"],
    relatedThreadIds: ["ganon-incarnations"],
  },
  {
    id: "great-calamity",
    term: "The Great Calamity",
    definition:
      "The catastrophe 100 years before Breath of the Wild: Calamity Ganon possessed Hyrule's own Guardians and Divine Beasts, killed the four Champions, and broke the kingdom in a single day.",
    relatedGameIds: ["breath-of-the-wild", "age-of-calamity"],
  },
  {
    id: "sheikah-slate",
    term: "Sheikah Slate",
    definition:
      "The ancient tablet Link carries in Breath of the Wild — map, camera, compendium, and rune-caster in one. Celebrated in UI-design writing as a masterclass in diegetic interface framing (the in-world device IS the menu). The direct inspiration — evoked, never copied — for this site's own 'Chronicle Slate' chrome.",
    source: "docs/ui-research.md",
    relatedGameIds: ["breath-of-the-wild"],
  },
  {
    id: "purah-pad",
    term: "Purah Pad",
    definition:
      "The Sheikah Slate's successor in Tears of the Kingdom — same map/camera/compendium core, with the old runes traded for Ultrahand, Fuse, Ascend, Recall, and Autobuild.",
    source: "docs/ui-research.md",
    relatedGameIds: ["tears-of-the-kingdom"],
  },
  {
    id: "zonai",
    term: "Zonai",
    definition:
      "The ancient, dragon-featured people from the sky whose ruins and devices define Tears of the Kingdom's era. Rauru, Hyrule's founding king, was one of the last of them.",
    relatedGameIds: ["tears-of-the-kingdom", "age-of-imprisonment"],
  },
  {
    id: "imprisoning-war",
    term: "Imprisoning War",
    definition:
      "A name Hyrule has used for at least two different wars against Ganon, millennia apart: the Downfall-era war behind A Link to the Past, and the far older founding-era war in which Rauru sealed Ganondorf beneath Hyrule — the war Tears of the Kingdom excavates and Age of Imprisonment dramatizes.",
    relatedThreadIds: ["imprisoning-war"],
  },
  {
    id: "divine-beasts",
    term: "Divine Beasts",
    definition:
      "Four colossal Sheikah machines — Vah Ruta, Vah Rudania, Vah Medoh, Vah Naboris — built ten thousand years before BOTW to fight the Calamity, each piloted by a Champion. Their possession by Ganon turned Hyrule's greatest weapons against it.",
    relatedGameIds: ["breath-of-the-wild", "age-of-calamity"],
  },
  {
    id: "champions",
    term: "The Champions",
    definition:
      "Mipha, Daruk, Revali, and Urbosa — the four pilots of the Divine Beasts who died in the Great Calamity. Age of Calamity's what-if history is built around saving them.",
    relatedGameIds: ["breath-of-the-wild", "age-of-calamity"],
  },
  {
    id: "canonicity",
    term: "Canonicity (as this site uses it)",
    definition:
      "Canon: on Nintendo's official chart or unambiguously mainline. Semi-canon: officially blessed stories ('a canonical tale') never placed on any chart — both Hyrule Warriors titles. Non-canon: explicitly disowned, i.e. the CD-i games.",
  },
  {
    id: "placement-confidence",
    term: "Placement Confidence",
    definition:
      "This site's honesty rating on each game's chart position. Official: printed on a Nintendo chart. Strong community: broad consensus from developer statements. Speculative: this site's own interpretive placement, flagged wherever it appears.",
  },
  {
    id: "musou",
    term: "Musou (Warriors-style)",
    definition:
      "The Dynasty Warriors genre: one hero against thousands, with battlefield-map micromanagement. Both Hyrule Warriors games translate Zelda's visual language into this genre's HUD — a translation whose successes and clutter problems are catalogued in this site's UI research paper.",
    source: "docs/ui-research.md",
    relatedGameIds: ["age-of-calamity", "age-of-imprisonment"],
  },
  {
    id: "dark-world",
    term: "The Dark World",
    definition:
      "The corrupted mirror of Hyrule in A Link to the Past — the Sacred Realm itself, twisted by Ganon's wish on the complete Triforce. Visitors take forms reflecting their nature; Link becomes a pink rabbit.",
    relatedGameIds: ["a-link-to-the-past"],
  },
  {
    id: "termina",
    term: "Termina",
    definition:
      "The parallel world of Majora's Mask, reached through a crack in the Lost Woods and doomed to a three-day lunar apocalypse that Link reliving the same 72 hours must avert.",
    relatedGameIds: ["majoras-mask"],
  },
  {
    id: "great-sea",
    term: "The Great Sea",
    definition:
      "The ocean covering Hyrule in the Adult Timeline — the gods' flood made geography. The original kingdom survives, frozen in time, on the seabed beneath it.",
    relatedGameIds: ["wind-waker", "phantom-hourglass"],
  },
];

export function getTerm(id: string): GlossaryTerm | undefined {
  return glossary.find((t) => t.id === id);
}

export function getTermsForGame(gameId: string): GlossaryTerm[] {
  return glossary.filter((t) => t.relatedGameIds?.includes(gameId));
}
