import type { Thread } from "~/types/content";
import { games } from "~/data/games";
import type { Branch } from "~/types/game";

export const threads: Thread[] = [
  {
    id: "master-sword",
    title: "The Master Sword",
    kind: "artifact",
    blurb:
      "The Blade of Evil's Bane — forged from the Goddess Sword, tempered by sacred flames, and waiting in one pedestal or another across every era of Hyrule's history.",
    entries: [
      { gameId: "skyward-sword", note: "Forged: Link and Fi temper the Goddess Sword into the Master Sword itself." },
      { gameId: "ocarina-of-time", note: "The pedestal in the Temple of Time is the literal mechanism of the timeline split — drawing the blade seals Link away for seven years." },
      { gameId: "wind-waker", note: "Found beneath the waves in sunken Hyrule Castle, its power dimmed with the sages' deaths." },
      { gameId: "twilight-princess", note: "Repels Zant's curse and restores wolf-Link to human form." },
      { gameId: "a-link-to-the-past", note: "The classic quest template: three pendants, then the sword in the Lost Woods." },
      { gameId: "a-link-between-worlds", note: "Reforged again with the lost Master Ore." },
      { gameId: "breath-of-the-wild", note: "Aged and dormant in Korok Forest, held in trust by the Great Deku Tree for a century." },
      { gameId: "tears-of-the-kingdom", note: "Broken in the opening — then healed across ten thousand years inside the light dragon." },
    ],
  },
  {
    id: "ganon-incarnations",
    title: "Ganon's Incarnations",
    kind: "character",
    blurb:
      "Gerudo king, boar-demon, disembodied malice — the same hatred wearing different bodies, exactly as Demise's curse promised.",
    entries: [
      { gameId: "skyward-sword", note: "Demise's dying curse is the origin: an undying hatred bound to reincarnate against the hero and the goddess-blood forever." },
      { gameId: "ocarina-of-time", note: "Ganondorf at his most human — a schemer whose theft of the Triforce of Power creates every later Ganon." },
      { gameId: "wind-waker", note: "The most sympathetic Ganondorf: weary, articulate, coveting Hyrule for the wind that blew on his desert." },
      { gameId: "twilight-princess", note: "Executed by sages, sealed in the Twilight Realm, and puppeteering Zant from exile." },
      { gameId: "four-swords-adventures", note: "A reborn Gerudo Ganondorf, distinct from the Hero of Time's nemesis — proof the curse recycles." },
      { gameId: "a-link-to-the-past", note: "Pure beast-Ganon, ruling the Dark World the Triforce built from his wish." },
      { gameId: "the-legend-of-zelda", note: "The original pig-demon in his mountain lair, holding the Triforce of Power." },
      { gameId: "breath-of-the-wild", note: "Calamity Ganon: hatred so old it has abandoned form entirely — a storm of malice wearing machinery." },
      { gameId: "tears-of-the-kingdom", note: "The Demon King restored to a body: the mummified Ganondorf sealed since the Imprisoning War." },
      { gameId: "age-of-imprisonment", note: "The same Demon King at the height of his ancient war, before the seal." },
    ],
  },
  {
    id: "triforce",
    title: "The Triforce",
    kind: "force",
    blurb:
      "The golden power left behind by the creator goddesses — granting any wish, judging no wisher. Nearly every era's catastrophe traces back to someone touching it.",
    entries: [
      { gameId: "skyward-sword", note: "Link becomes the first mortal wielder, wishing Demise's destruction." },
      { gameId: "ocarina-of-time", note: "The theft: Ganondorf's touch splits it into Power, Wisdom, and Courage — the split that defines the mythos." },
      { gameId: "a-link-to-the-past", note: "The Imprisoning War's aftermath: Ganon's wish on the complete Triforce built the Dark World." },
      { gameId: "wind-waker", note: "The Triforce of Courage lies shattered across the Great Sea; the King of Red Lions wishes Hyrule its final rest." },
      { gameId: "the-legend-of-zelda", note: "Zelda splits the Triforce of Wisdom into eight fragments rather than surrender it." },
      { gameId: "adventure-of-link", note: "The Triforce of Courage completes the set — guarded by a sleeping princess and a final trial." },
      { gameId: "tri-force-heroes", note: "Right there in the title — though played mostly for style." },
    ],
  },
  {
    id: "zelda-incarnations",
    title: "Zelda's Incarnations",
    kind: "character",
    blurb:
      "Goddess-blood, sage, pirate captain, ghost, scholar, dragon — the princess is never just a princess, and half the timeline's pivots are hers.",
    entries: [
      { gameId: "skyward-sword", note: "Not royalty at all: Hylia herself, reborn mortal by her own design." },
      { gameId: "ocarina-of-time", note: "Sheik — seven years in disguise running a resistance." },
      { gameId: "wind-waker", note: "Tetra, pirate captain, who learns her lineage mid-adventure and visibly resents the dress." },
      { gameId: "spirit-tracks", note: "A ghost possessing a Phantom knight — the series' only co-op Zelda protagonist in the mainline." },
      { gameId: "breath-of-the-wild", note: "A scholar crushed by expectation who then holds Calamity Ganon alone for one hundred years." },
      { gameId: "tears-of-the-kingdom", note: "Swallows the secret stone and spends ten thousand years as a dragon to heal the Master Sword." },
      { gameId: "age-of-imprisonment", note: "The same time-stranded Zelda, now a playable warrior in the founding era's war." },
      { gameId: "wand-of-gamelon", note: "Non-canon, but historically the first playable Zelda." },
    ],
  },
  {
    id: "link-incarnations",
    title: "Link's Incarnations",
    kind: "character",
    blurb:
      "Not one hero but a lineage of them — farm boys, knights, islanders, and engineers who keep answering the same call across every branch.",
    entries: [
      { gameId: "skyward-sword", note: "The first hero, whose bond with Zelda and victory over Demise starts the whole cycle." },
      { gameId: "ocarina-of-time", note: "The Hero of Time — the only Link whose personal choices split history three ways." },
      { gameId: "majoras-mask", note: "The same child hero, further from home than any other Link has ever been." },
      { gameId: "wind-waker", note: "The Hero of Winds — no destiny, no bloodline; he earns the title." },
      { gameId: "twilight-princess", note: "The Hero of Twilight, a ranch hand who fights half the game as a wolf." },
      { gameId: "spirit-tracks", note: "A royal engineer — the most working-class Link on the chart." },
      { gameId: "breath-of-the-wild", note: "A knight who already failed once, waking from a hundred-year sleep with no memory of it." },
    ],
  },
  {
    id: "imprisoning-war",
    title: "The Imprisoning War(s)",
    kind: "recurring",
    blurb:
      "The name Hyrule gives its wars against Ganon — used for at least two different conflicts millennia apart, which is exactly the kind of thing that keeps timeline theorists up at night.",
    entries: [
      { gameId: "a-link-to-the-past", note: "The original usage: the Downfall-era war that sealed Ganon in the Dark World, backstory to ALttP." },
      { gameId: "ocarina-of-time", note: "Retroactively revealed as that war — the Downfall branch's version of these events." },
      { gameId: "tears-of-the-kingdom", note: "A far more ancient Imprisoning War surfaces: Rauru's founding-era sealing of Ganondorf beneath Hyrule." },
      { gameId: "age-of-imprisonment", note: "That ancient war, played in full — the game is named for it." },
      { gameId: "age-of-calamity", note: "The Calamity cycle is the same shape — seal, wait, catastrophe — refought with Sheikah machines." },
    ],
  },
];

export function getThread(id: string): Thread | undefined {
  return threads.find((t) => t.id === id);
}

export function getThreadsForGame(gameId: string): Thread[] {
  return threads.filter((t) => t.entries.some((e) => e.gameId === gameId));
}

export function getThreadsForBranch(branchId: Branch): Thread[] {
  const branchGameIds = new Set(games.filter((g) => g.branch === branchId).map((g) => g.id));
  return threads.filter((t) => t.entries.some((e) => branchGameIds.has(e.gameId)));
}
