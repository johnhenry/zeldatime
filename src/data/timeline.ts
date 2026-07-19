import type { TimelineBranch } from "~/types/timeline";

export const branches: TimelineBranch[] = [
  {
    id: "pre-split",
    label: "Shared Trunk (Before the Split)",
    parent: null,
    splitAt: "Skyward Sword",
    color: "#d9a441",
    summary: "The single shared history every branch descends from — from the goddess Hylia's war against Demise to the fateful ending of Ocarina of Time.",
    storyArc:
      "Everything begins in the sky. Skyward Sword establishes the mythology the entire series leans on: the goddess Hylia seals the demon king Demise, and his dying curse binds an undying hatred to the bloodline of the goddess and the spirit of the hero — the in-fiction reason a Link, a Zelda, and a Ganon keep returning across millennia.\n\nGenerations later, The Minish Cap and Four Swords chronicle the rise and sealing of the wind mage Vaati, and the forging of the Four Sword. Then comes Ocarina of Time — not the end of this era but its detonation point. Its ending can resolve three different ways, and Nintendo's official chart treats all three as real, each spawning its own future: the Child, Adult, and Downfall timelines.",
  },
  {
    id: "child",
    label: "Child Timeline",
    parent: "pre-split",
    splitAt: "Ocarina of Time",
    color: "#4caf7d",
    summary: "Link is sent back to his childhood and warns Zelda in time — Ganondorf's rise is averted before it begins.",
    storyArc:
      "In this branch, the Hero of Time is returned to his childhood after defeating Ganon — and this time, the warning lands. Zelda is told what is coming; Ganondorf's coup never happens. But averting one catastrophe doesn't buy peace: Majora's Mask finds the young hero lost in Termina, racing a falling moon through a three-day loop.\n\nGenerations later, Twilight Princess shows this timeline's Hyrule invaded from the Twilight Realm, with Ganondorf — executed by the sages, sealed, and escaped — as the shadow behind it. The branch closes with Four Swords Adventures, generations later still, when Vaati and a resurrected Ganon rise together. Officially, that game — not Twilight Princess — is this timeline's final chapter.",
  },
  {
    id: "adult",
    label: "Adult Timeline",
    parent: "pre-split",
    splitAt: "Ocarina of Time",
    color: "#3f8ec9",
    summary: "Link defeats Ganon as an adult but vanishes back to childhood — and with no hero left, the gods drown Hyrule to contain Ganon's return.",
    storyArc:
      "Here the Hero of Time wins — and then disappears, sent back to his own era, leaving the adult world without its hero. When Ganon eventually escapes his seal, no one can stop him, and the gods make a terrible choice: they flood Hyrule, sealing kingdom and King of Evil alike beneath a vast ocean.\n\nThe Wind Waker opens centuries later on that Great Sea, where a new Link — no chosen bloodline, just a boy from Outset Island — sails to save his sister and inherits the hero's title on merit. Phantom Hourglass picks up literally the next day. Spirit Tracks closes the branch roughly a century on, in New Hyrule, a country founded by Tetra's pirates far from the drowned original.",
  },
  {
    id: "downfall",
    label: "Downfall Timeline",
    parent: "pre-split",
    splitAt: "Ocarina of Time",
    color: "#a34a4a",
    summary: "The Hero of Time falls. Ganondorf claims the complete Triforce, and Hyrule endures its darkest, longest history.",
    storyArc:
      "The branch nobody talks about in-fiction: the Hero of Time loses. Ganondorf seizes the full Triforce, and Hyrule's history becomes a long war of seals, declines, and stubborn survival. A Link to the Past opens this era with the Imprisoning War's aftermath and the corrupted Dark World.\n\nIts hero then drifts through Link's Awakening's island dream and the linked Oracle adventures. Generations later, A Link Between Worlds replays the ancient conflict through the mirror kingdom of Lorule, and Tri Force Heroes follows a few years after. At this timeline's far end sit the two games that started everything in release order — the original Legend of Zelda and The Adventure of Link — recast as the era of Hyrule's greatest decline.\n\nA correction worth knowing: A Link to the Past is commonly misremembered as a pre-split 'era of creation' game. Both official charts place it here, opening the Downfall branch.",
  },
  {
    id: "botw-era",
    label: "Distant Future (BOTW / TOTK)",
    parent: null,
    splitAt: "Officially unspecified — Nintendo has never confirmed which branch it descends from",
    color: "#3fc9c9",
    summary: "Ten thousand-ish years past every branch's end — and Nintendo deliberately won't say which branch leads here.",
    storyArc:
      "Breath of the Wild and Tears of the Kingdom sit at a distant-future point after all three branches — and that's all Nintendo will commit to. Asked directly which timeline they descend from, producer Eiji Aonuma answered: 'That's… up to the player's imagination, isn't it?' The stance was extended, on record, to Tears of the Kingdom — 'a puzzle the users will have to see if they can solve.'\n\nIn-fiction, this era is defined by cataclysm and memory: the Great Calamity that broke Hyrule a century before BOTW, and the far older Imprisoning War against Ganondorf that TOTK unearths along with the Zonai. The deliberate ambiguity isn't an oversight. Nintendo drew a chart for the first eighteen games — and then chose to stop drawing.",
  },
  {
    id: "aoc-divergence",
    label: "Age of Calamity (alternate history)",
    parent: null,
    splitAt:
      "Not chart-placed — depicts the Champions' last stand against the Calamity as an alternate history, but no verified source ties it to a specific official branch",
    color: "#c9a13f",
    summary: "The Great Calamity refought — and won — in a what-if history that no official chart acknowledges.",
    storyArc:
      "Hyrule Warriors: Age of Calamity looks like a straight prequel to Breath of the Wild — the Champions, the Divine Beasts, the Calamity, one hundred years before. But its story bends: a small Guardian slips backward through time, warnings arrive that never arrived, and the doomed last stand BOTW remembers becomes a winnable war. What plays out is an alternate history of the Calamity, not the one BOTW's flashbacks record.\n\nOfficially, it sits nowhere: the last Nintendo-published timeline chart (2017) predates it, and no chart since has placed it. Its position on this site's diagram is an interpretive choice, flagged as such — no developer statement or verified community consensus pins it to a branch.",
  },
  {
    id: "ancient-imprisonment",
    label: "Age of Imprisonment (inferred prequel)",
    parent: null,
    splitAt: "Not chart-placed — marketed as preceding TOTK's Imprisoning War/Zonai era",
    color: "#b06fc9",
    summary: "The ancient Imprisoning War itself — Zelda stranded in Hyrule's founding era, fighting the war TOTK only remembers.",
    storyArc:
      "Shipped November 6, 2025 for Switch 2, Hyrule Warriors: Age of Imprisonment dramatizes the era Tears of the Kingdom only shows in fragments: the founding age of Hyrule, Rauru and Sonia's kingdom, the Zonai, and the Imprisoning War against Ganondorf — with the time-displaced Zelda of TOTK stranded in the middle of it. Nintendo calls its story a 'canonical tale,' and it shipped over a million copies by January 2026.\n\nStill, no official chart places it. Its 'prequel' status is inferred from its subject matter, not printed anywhere — which is why this site marks it speculative. Aonuma has even suggested this era could inspire the next mainline Zelda, meaning this corner of the timeline is live creative territory, not settled history.",
  },
  {
    id: "non-canon",
    label: "Non-Canon",
    parent: null,
    splitAt: "N/A",
    color: "#777777",
    summary: "The Philips CD-i games — licensed out during a failed hardware deal, disowned by Nintendo, immortal as memes.",
    storyArc:
      "When Nintendo and Philips' partnership on a CD-ROM add-on collapsed in the early '90s, the settlement let Philips license Zelda's characters for its CD-i console. Nintendo's involvement stopped at approving character art. The results — Link: The Faces of Evil, Zelda: The Wand of Gamelon, and Zelda's Adventure — have never appeared on any official timeline, and series producer Eiji Aonuma has said on record he doesn't think they 'really fit in the Zelda franchise.'\n\nThey survive today mostly through their gloriously stilted animated cutscenes, which became one of the internet's longest-running meme wells. Non-canon, but not forgotten.",
  },
];

export function getBranch(id: string): TimelineBranch | undefined {
  return branches.find((b) => b.id === id);
}
