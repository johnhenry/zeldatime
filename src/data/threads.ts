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

  // ── Species ─────────────────────────────────────────────────────────
  {
    id: "zora-and-rito",
    title: "The Zora & the Rito",
    kind: "species",
    blurb:
      "The series' most famous evolutionary puzzle: Hyrule Historia implies the bird-like Rito evolved from the aquatic Zora after the flood — and then Breath of the Wild put both on screen at once.",
    entries: [
      { gameId: "ocarina-of-time", note: "The classic Zora: guardians of the domain, with Princess Ruto awakening as the Water Sage." },
      { gameId: "majoras-mask", note: "Termina's Zora include the rock band The Indigo-Go's; Link himself plays as one via the Zora Mask." },
      { gameId: "wind-waker", note: "The Rito debut as winged mail carriers — Hyrule Historia frames them as Zora who evolved after the Great Flood." },
      { gameId: "twilight-princess", note: "The Child-branch Zora endure, led by the ghost of Queen Rutela." },
      { gameId: "a-link-between-worlds", note: "Downfall-branch Zora, ruled by Queen Oren — proof the species persists on every branch." },
      { gameId: "breath-of-the-wild", note: "Zora AND Rito coexist — a favorite headache for timeline theorists, since one supposedly became the other." },
      { gameId: "tears-of-the-kingdom", note: "Sidon takes the Zora throne while Tulin flies for the Rito — both species now fixtures of the era." },
    ],
  },
  {
    id: "kokiri-and-koroks",
    title: "The Kokiri & the Koroks",
    kind: "species",
    blurb:
      "Eternal forest children who became walking leaf-spirits — one of the clearest on-record species transformations in the series.",
    entries: [
      { gameId: "ocarina-of-time", note: "The Kokiri: ageless children of the forest who die if they leave it, raised under the Great Deku Tree." },
      { gameId: "wind-waker", note: "The Koroks debut — Hyrule Historia states the Kokiri took plant form after the flood, migrating with the Deku Tree." },
      { gameId: "breath-of-the-wild", note: "Nine hundred Koroks hide across Hyrule, guarding seeds; Hestu's maracas made them a phenomenon." },
      { gameId: "tears-of-the-kingdom", note: "Koroks return — including the backpack-laden travelers players famously strapped to rockets." },
    ],
  },
  {
    id: "gorons",
    title: "The Gorons",
    kind: "species",
    blurb:
      "Rock-eating mountain folk and the series' most reliable constant — wherever there's a volcano, there's a Goron calling you Brother.",
    entries: [
      { gameId: "ocarina-of-time", note: "Debut: Darunia's tribe on Death Mountain, sworn brothers to Link." },
      { gameId: "majoras-mask", note: "Termina's Gorons mourn their hero Darmani, whose mask Link inherits." },
      { gameId: "wind-waker", note: "Even with Hyrule drowned, wandering Goron merchants still walk the Great Sea's islands." },
      { gameId: "twilight-princess", note: "The Death Mountain patriarchs test Link in sumo before yielding their mines." },
      { gameId: "spirit-tracks", note: "New Hyrule's Fire Realm hosts a Goron village — the species crossed an ocean with the founders." },
      { gameId: "breath-of-the-wild", note: "Daruk's people run Goron City's mining boom under Death Mountain's glow." },
    ],
  },
  {
    id: "gerudo",
    title: "The Gerudo",
    kind: "species",
    blurb:
      "The desert people who birth one male every hundred years — and whose most famous son is the series' villain.",
    entries: [
      { gameId: "ocarina-of-time", note: "Debut: desert warriors whose once-a-century male, Ganondorf, becomes their king — and Hyrule's doom." },
      { gameId: "majoras-mask", note: "Termina's Gerudo are pirates raiding the Great Bay." },
      { gameId: "four-swords-adventures", note: "A reborn Gerudo Ganondorf proves the once-a-century cycle keeps turning." },
      { gameId: "breath-of-the-wild", note: "Gerudo Town enforces its vai-only law; Urbosa's legacy hangs over the era." },
      { gameId: "tears-of-the-kingdom", note: "Chief Riju leads the tribe against a sand-shroud siege — with the ancient Gerudo king as the game's villain." },
    ],
  },
  {
    id: "sheikah-tribe",
    title: "The Sheikah",
    kind: "species",
    blurb:
      "The shadow tribe sworn to the royal family — sometimes ninjas, sometimes archaeologists, always holding the timeline's secrets (and, eventually, its technology).",
    entries: [
      { gameId: "skyward-sword", note: "Impa serves the goddess across two eras at once — the tribe's duty predates Hyrule itself." },
      { gameId: "ocarina-of-time", note: "Impa of Kakariko shelters Zelda; the Sheikah's eye symbol marks every secret in the game." },
      { gameId: "breath-of-the-wild", note: "The tribe's ancient technology — towers, shrines, Guardians, the Slate — defines the entire era's aesthetic." },
      { gameId: "age-of-calamity", note: "Sheikah tech goes to war: the what-if hinges on machines the true history buried." },
      { gameId: "tears-of-the-kingdom", note: "Purah's research (and Pad) carry the tribe's science forward as the Zonai past resurfaces." },
    ],
  },

  // ── Items & equipment ───────────────────────────────────────────────
  {
    id: "hookshot",
    title: "The Hookshot",
    kind: "item",
    blurb:
      "Spring-loaded chain, satisfying thunk — the series' definitive traversal tool, endlessly reinvented and conspicuously missing from the open-air era.",
    entries: [
      { gameId: "a-link-to-the-past", note: "Debut: a chest in the Swamp Palace changes dungeon design forever." },
      { gameId: "ocarina-of-time", note: "Hookshot then Longshot — the upgrade that reframes every wooden target in Hyrule." },
      { gameId: "twilight-princess", note: "Double Clawshots turn walls and ceilings into a climbing gym." },
      { gameId: "skyward-sword", note: "Clawshots return for vine-point traversal across the surface provinces." },
      { gameId: "breath-of-the-wild", note: "Absent — climbing replaced it. Fans have petitioned for its return ever since." },
    ],
  },
  {
    id: "boomerang",
    title: "The Boomerang",
    kind: "item",
    blurb:
      "The original utility weapon — stunning, fetching, and switch-flipping since 1986.",
    entries: [
      { gameId: "the-legend-of-zelda", note: "Debut: the wooden boomerang stuns; the magical one crosses the whole screen." },
      { gameId: "ocarina-of-time", note: "Young Link's signature tool — and the only way to win the Lord Jabu-Jabu fight." },
      { gameId: "wind-waker", note: "Multi-target lock-on turns it into a puzzle instrument." },
      { gameId: "twilight-princess", note: "The Gale Boomerang carries wind itself, snuffing and carrying flames." },
      { gameId: "phantom-hourglass", note: "Drawn by stylus: players trace its exact flight path on the touch screen." },
    ],
  },
  {
    id: "bottles-and-fairies",
    title: "Bottles & Bottled Fairies",
    kind: "item",
    blurb:
      "The humble glass bottle: the series' most beloved inventory slot, and the fairy inside it the original second chance.",
    entries: [
      { gameId: "a-link-to-the-past", note: "Debut: four bottles hidden across two worlds; a bottled fairy revives a fallen hero." },
      { gameId: "ocarina-of-time", note: "The bottle economy peaks — bugs, fish, Lon Lon milk, poes, and the infamous bottled Big Poe trade." },
      { gameId: "majoras-mask", note: "Chateau Romani in a bottle: infinite magic for a doomed three days." },
      { gameId: "skyward-sword", note: "Bottled fairies and potions brewed in Skyloft's bazaar keep the tradition alive." },
      { gameId: "breath-of-the-wild", note: "Gone — replaced wholesale by cooking. The fairy now hops out of your pouch on its own." },
    ],
  },
  {
    id: "heart-containers",
    title: "Heart Containers",
    kind: "item",
    blurb:
      "The shape of Zelda progression itself — whole from bosses, quartered from exploration, and famously traded against stamina in the modern era.",
    entries: [
      { gameId: "the-legend-of-zelda", note: "Debut: hidden containers and boss drops grow the life bar from three hearts." },
      { gameId: "a-link-to-the-past", note: "Pieces of Heart arrive — four fragments per container, hidden everywhere." },
      { gameId: "ocarina-of-time", note: "The piece-of-heart hunt becomes the series' defining sidequest loop." },
      { gameId: "breath-of-the-wild", note: "Goddess Statues sell them — and let you choose hearts or stamina, the era's core tradeoff." },
      { gameId: "tears-of-the-kingdom", note: "The statue economy returns, with a certain horned statue offering a darker exchange." },
    ],
  },
  {
    id: "rupees",
    title: "Rupees",
    kind: "item",
    blurb:
      "Hyrule's gemstone currency — hoarded, wallet-capped, and found in suspiciously grass-adjacent places for four decades.",
    entries: [
      { gameId: "the-legend-of-zelda", note: "Debut as 'Rupies' — and spent at the original 'It's a secret to everybody' shop." },
      { gameId: "wind-waker", note: "Wallet upgrades gate a triforce-hunting economy infamous for its ransom prices." },
      { gameId: "twilight-princess", note: "So abundant the game politely puts rupees back in chests when your wallet is full." },
      { gameId: "breath-of-the-wild", note: "Scarce again: no grass drops — you cook, hunt, and sell like a frontier trader." },
    ],
  },
  {
    id: "hylian-shield",
    title: "The Hylian Shield",
    kind: "item",
    blurb:
      "The crest-bearing shield — the visual shorthand for 'the hero' on every box it appears on.",
    entries: [
      { gameId: "ocarina-of-time", note: "Debut: adult-sized steel a child Link hides beneath like a turtle shell." },
      { gameId: "twilight-princess", note: "Standard kit for the Hero of Twilight — the crest at its most iconic." },
      { gameId: "skyward-sword", note: "An indestructible reward for surviving Lanayru's Lightning Round." },
      { gameId: "breath-of-the-wild", note: "One per playthrough, buried under Hyrule Castle — the era's ultimate durability flex." },
      { gameId: "tears-of-the-kingdom", note: "Findable again — and yes, fusable to a stick, because everything is." },
    ],
  },

  // ── Enemies ─────────────────────────────────────────────────────────
  {
    id: "bokoblins-and-moblins",
    title: "Bokoblins & Moblins",
    kind: "enemy",
    blurb:
      "Ganon's rank-and-file: spear-chucking Moblins since 1986, and the goblin grunts who became the modern era's slapstick stars.",
    entries: [
      { gameId: "the-legend-of-zelda", note: "Moblins debut as bulldog-faced spear throwers in the overworld's forests." },
      { gameId: "wind-waker", note: "Bokoblins debut as lantern-carrying lookouts; Moblins patrol the Forsaken Fortress." },
      { gameId: "skyward-sword", note: "Bokoblins are the backbone of Demise's forces — red, green, and cursed." },
      { gameId: "breath-of-the-wild", note: "The red-to-silver tier system turns them into the era's difficulty ladder — and its comedy troupe." },
      { gameId: "tears-of-the-kingdom", note: "Boss Bokoblins lead horde raids; Moblins get grabbier and meaner." },
    ],
  },
  {
    id: "octoroks",
    title: "Octoroks",
    kind: "enemy",
    blurb:
      "Rock-spitting octopi and the series' single most persistent enemy — land, sea, grass, and sky.",
    entries: [
      { gameId: "the-legend-of-zelda", note: "Debut: the very first enemy most players ever fought, spitting rocks on land." },
      { gameId: "ocarina-of-time", note: "Back to the water, ambushing from Lake Hylia's surface." },
      { gameId: "skyward-sword", note: "Grass Octoroks disguise as shrubbery — the shield-bounce tutorial in the wild." },
      { gameId: "breath-of-the-wild", note: "Treasure, Rock, Water, and Forest variants — plus the beloved weapon-cleaning Octorok exploit." },
      { gameId: "tears-of-the-kingdom", note: "Sky-high variants join in; the weapon-polishing trick survives." },
    ],
  },
  {
    id: "like-likes",
    title: "Like Likes",
    kind: "enemy",
    blurb:
      "The tube that eats your shield — a forty-year-old lesson in inventory anxiety, named after a Japanese proverb.",
    entries: [
      { gameId: "the-legend-of-zelda", note: "Debut: swallows Link whole and digests his Magical Shield. Generations traumatized." },
      { gameId: "ocarina-of-time", note: "Lurking in Death Mountain's caverns, still hungry for Hylian Shields." },
      { gameId: "wind-waker", note: "Now they eat the Deku Leaf's charge too." },
      { gameId: "tears-of-the-kingdom", note: "Reborn as wall-mounted cave horrors with a gem-bearing weak point." },
    ],
  },
  {
    id: "lynels",
    title: "Lynels",
    kind: "enemy",
    blurb:
      "Centaur-beasts from the original overworld who returned three decades later as the modern era's apex predator.",
    entries: [
      { gameId: "the-legend-of-zelda", note: "Debut on Death Mountain: sword-beams that punished careless approaches." },
      { gameId: "oracle-of-seasons", note: "Holodrum's winters bring them back for the handheld era." },
      { gameId: "a-link-between-worlds", note: "Death Mountain's Lorule side keeps the lineage alive." },
      { gameId: "breath-of-the-wild", note: "The legend reborn: mini-boss royalty that outclasses every 'real' boss — mount its back and pray." },
      { gameId: "age-of-calamity", note: "Playable-scale battles finally let you fight them as the armies they always felt like." },
    ],
  },

  // ── Wildlife & critters ─────────────────────────────────────────────
  {
    id: "cuccos",
    title: "Cuccos",
    kind: "wildlife",
    blurb:
      "The chickens of Hyrule — harmless, indestructible, and armed with the series' most famous revenge mechanic.",
    entries: [
      { gameId: "a-link-to-the-past", note: "Debut — along with the discovery that attacking one summons an unkillable avenging flock." },
      { gameId: "ocarina-of-time", note: "Anju's escaped Cuccos and the Super Cucco minigame make them civic infrastructure." },
      { gameId: "majoras-mask", note: "Raise every chick to adulthood inside three days for a Piece of Heart." },
      { gameId: "twilight-princess", note: "Attack one and you briefly CONTROL the Cucco — the series winking at its own legend." },
      { gameId: "breath-of-the-wild", note: "Weaponized: carried Cuccos absorb hits, and the flock still answers violence with violence." },
    ],
  },
  {
    id: "epona-and-horses",
    title: "Epona & the Horses of Hyrule",
    kind: "wildlife",
    blurb:
      "One song, one horse, every era — and eventually a whole wild-horse economy.",
    entries: [
      { gameId: "ocarina-of-time", note: "Debut: Epona's Song, learned as a child, wins her freedom from Lon Lon Ranch as an adult." },
      { gameId: "majoras-mask", note: "Stolen by the Skull Kid in the opening minutes — recovering her is half the quest's heart." },
      { gameId: "twilight-princess", note: "Named Epona by default; horseback combat becomes a headline feature." },
      { gameId: "breath-of-the-wild", note: "Wild horses tamed, boarded, and mourned — with Epona herself hidden behind an amiibo." },
      { gameId: "tears-of-the-kingdom", note: "Stables carry your BOTW horses forward — continuity you can ride." },
    ],
  },
  {
    id: "great-fairies",
    title: "Great Fairies",
    kind: "wildlife",
    blurb:
      "Fountain-dwelling benefactors whose redesigns are a timeline of the series' art direction all by themselves.",
    entries: [
      { gameId: "the-legend-of-zelda", note: "Debut: a quiet pond, a full heal — the original safe room." },
      { gameId: "ocarina-of-time", note: "The iconic (and iconically loud) upgrade-granting incarnation." },
      { gameId: "majoras-mask", note: "Shattered into stray fairies you reassemble in each region." },
      { gameId: "breath-of-the-wild", note: "Four flower-dwelling matrons who upgrade armor — for an escalating fee." },
      { gameId: "tears-of-the-kingdom", note: "Coaxed out by music: a traveling troupe's quests reopen the fountains." },
    ],
  },

  // ── Places & temples ────────────────────────────────────────────────
  {
    id: "temple-of-time",
    title: "The Temple of Time",
    kind: "place",
    blurb:
      "The room where the timeline breaks: home of the Pedestal of Time, and a ruin whose reappearances measure how far each era has fallen.",
    entries: [
      { gameId: "skyward-sword", note: "The Sealed Temple — implied to become the Temple of Time as eras turn." },
      { gameId: "ocarina-of-time", note: "The Door of Time, the Spiritual Stones, the pedestal — the exact site of the three-way split." },
      { gameId: "twilight-princess", note: "Its ruins hide a full dungeon in the past — the temple at its grandest." },
      { gameId: "breath-of-the-wild", note: "A shattered husk on the Great Plateau — the era's thesis statement in one ruin." },
      { gameId: "tears-of-the-kingdom", note: "Rebuilt on the Great Sky Island, where a new era's tutorial echoes an old one's." },
    ],
  },
  {
    id: "hyrule-castle",
    title: "Hyrule Castle",
    kind: "place",
    blurb:
      "Seat of the royal family, first dungeon, final dungeon, frozen time capsule, floating omen — the castle is whatever its era needs it to be.",
    entries: [
      { gameId: "a-link-to-the-past", note: "The rainy-night infiltration that opens the game — an all-time series opening." },
      { gameId: "ocarina-of-time", note: "Sneaking past guards to a courtyard audience with a princess." },
      { gameId: "wind-waker", note: "Preserved beneath the Great Sea, colorless and frozen mid-moment." },
      { gameId: "twilight-princess", note: "The final act's fortress, crowned in twilight." },
      { gameId: "breath-of-the-wild", note: "Calamity Ganon's nest: an open-world dungeon you can assault from any angle, any time." },
      { gameId: "tears-of-the-kingdom", note: "Torn from the earth and hanging over Hyrule — the era's inciting image." },
    ],
  },
  {
    id: "death-mountain",
    title: "Death Mountain",
    kind: "place",
    blurb:
      "The volcano on every era's horizon — Ganon's first lair, the Gorons' forever-home.",
    entries: [
      { gameId: "the-legend-of-zelda", note: "The original final dungeon: Ganon waits inside the mountain." },
      { gameId: "adventure-of-link", note: "A brutal early-game crossing that veterans still speak of carefully." },
      { gameId: "a-link-to-the-past", note: "Its Dark World reflection hosts the Tower of Hera and Ganon's Tower." },
      { gameId: "ocarina-of-time", note: "Goron City and Dodongo's Cavern make it a civilization, not just a dungeon." },
      { gameId: "breath-of-the-wild", note: "An active lava zone requiring fireproof prep — with Rudania stomping the caldera." },
    ],
  },
  {
    id: "lost-woods",
    title: "The Lost Woods",
    kind: "place",
    blurb:
      "The forest that eats the unworthy and guards the sword — navigable only by music, smoke, or faith.",
    entries: [
      { gameId: "the-legend-of-zelda", note: "Debut: a looping screen puzzle solved by a memorized path." },
      { gameId: "a-link-to-the-past", note: "The fog-wreathed grove where the Master Sword sleeps." },
      { gameId: "ocarina-of-time", note: "Saria's song echoes through it; wrong turns turn children into Stalfos, the legends say." },
      { gameId: "twilight-princess", note: "The Sacred Grove: a skull-faced guide, a hidden pedestal, and the old temple's bones." },
      { gameId: "breath-of-the-wild", note: "Navigated by torch smoke to reach Korok Forest and the waiting blade." },
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
