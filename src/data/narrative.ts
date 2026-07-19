import type { NarrativeStep } from "~/types/content";

/**
 * The scrollytelling script: one step per era beat, in reading order.
 * focusGameIds drive which medallions the stage displays per step.
 */
export const narrativeSteps: NarrativeStep[] = [
  {
    id: "origin",
    eraLabel: "The Origin",
    branchIds: ["pre-split"],
    headline: "It begins in the sky",
    body: "Before Hyrule has a name, the goddess Hylia seals the demon king Demise — and his dying curse promises that his hatred will return, forever, against the blood of the goddess and the spirit of the hero. One game stands at the top of every official timeline: Skyward Sword.",
    focusGameIds: ["skyward-sword"],
    accentColor: "#d9a441",
  },
  {
    id: "trunk",
    eraLabel: "The Shared Trunk",
    branchIds: ["pre-split"],
    headline: "One history, for now",
    body: "The wind mage Vaati rises and is sealed; the Four Sword is forged and shelved. The Minish Cap and Four Swords fill the quiet centuries — quiet, because the detonation hasn't happened yet.",
    focusGameIds: ["minish-cap", "four-swords"],
    accentColor: "#d9a441",
  },
  {
    id: "split",
    eraLabel: "The Split",
    branchIds: ["pre-split"],
    headline: "One ending becomes three futures",
    body: "Ocarina of Time ends three different ways depending on how you read it — the hero warns the past, the hero wins and vanishes, the hero falls. Nintendo's official chart refuses to choose. All three happen. History forks.",
    focusGameIds: ["ocarina-of-time"],
    accentColor: "#e8b24d",
  },
  {
    id: "child",
    eraLabel: "The Child Timeline",
    branchIds: ["child"],
    headline: "The warning lands",
    body: "Sent back to childhood, Link tells Zelda everything — and Ganondorf's coup dies before it starts. This branch trades apocalypse for stranger dooms: Termina's falling moon, the Twilight invasion, and a final double-threat of Vaati and Ganon reborn.",
    focusGameIds: ["majoras-mask", "twilight-princess", "four-swords-adventures"],
    accentColor: "#4caf7d",
  },
  {
    id: "adult",
    eraLabel: "The Adult Timeline",
    branchIds: ["adult"],
    headline: "Victory, then the flood",
    body: "The hero wins and is returned to his own era — leaving the adult world heroless when Ganon breaks free. The gods' answer is the ocean. Centuries later, a boy with no destiny sails the Great Sea and earns the title the old world lost.",
    focusGameIds: ["wind-waker", "phantom-hourglass", "spirit-tracks"],
    accentColor: "#3f8ec9",
  },
  {
    id: "downfall",
    eraLabel: "The Downfall Timeline",
    branchIds: ["downfall"],
    headline: "The hero falls",
    body: "In the timeline nobody in-fiction wants to remember, Ganondorf wins the Triforce whole. Eight games of seals, declines, and stubborn survival follow — ending, chronologically, with the two games that started the series in 1986.",
    focusGameIds: ["a-link-to-the-past", "the-legend-of-zelda", "adventure-of-link"],
    accentColor: "#a34a4a",
  },
  {
    id: "distant-future",
    eraLabel: "The Distant Future",
    branchIds: ["botw-era"],
    headline: "After everything — but after which everything?",
    body: "Breath of the Wild and Tears of the Kingdom sit past the far end of all three branches, and Nintendo will not say which one leads there. 'That's up to the player's imagination,' says the series' producer. The chart simply… stops.",
    focusGameIds: ["breath-of-the-wild", "tears-of-the-kingdom"],
    accentColor: "#3fc9c9",
  },
  {
    id: "unplaced",
    eraLabel: "The Unplaced",
    branchIds: ["aoc-divergence", "ancient-imprisonment"],
    headline: "Stories without a chart",
    body: "Age of Calamity refights the Great Calamity as a winnable what-if. Age of Imprisonment plays the ancient Imprisoning War that TOTK only remembers. Both are officially blessed stories — and neither appears on any timeline Nintendo has ever printed. Their placement here is interpretation, and this site says so.",
    focusGameIds: ["age-of-calamity", "age-of-imprisonment"],
    accentColor: "#c9a13f",
  },
  {
    id: "non-canon",
    eraLabel: "Outside the Chart",
    branchIds: ["non-canon"],
    headline: "And then there are the CD-i games",
    body: "Licensed to Philips in a collapsed hardware deal, disowned by Nintendo, and immortal on the internet anyway. Every chronicle needs an appendix.",
    focusGameIds: ["faces-of-evil", "wand-of-gamelon", "zeldas-adventure"],
    accentColor: "#777777",
  },
];
