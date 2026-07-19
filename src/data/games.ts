import type { Game } from "~/types/game";

export const games: Game[] = [
  // ── Shared trunk (before the Ocarina of Time split) ──────────────────
  {
    id: "skyward-sword",
    title: "Skyward Sword",
    releaseDate: "2011 (Wii); HD remaster 2021 (Switch)",
    releaseYear: "2011",
    image: "https://upload.wikimedia.org/wikipedia/en/9/99/Legend_of_Zelda_Skyward_Sword_boxart.png",
    keyArt: "https://static.wikia.nocookie.net/zelda_gamepedia_en/images/6/61/SS_Key_Artwork.jpg/revision/latest",
    connections: [
      { type: "thematic", targetId: "ocarina-of-time", note: "Demise's dying curse is the mythological engine behind every later Ganon." },
    ],
    platform: "Wii / Switch",
    era: "skyward-origin",
    branch: "pre-split",
    timelineOrder: 1,
    synopsis:
      "The chronological origin point of the entire series: the goddess Hylia seals Demise's malice beneath the floating island of Skyloft, and the first Link and Zelda forge the bond — and the Master Sword's earliest form — that echoes through every era that follows.",
    trivia: [
      "Establishes Demise's dying curse, which the series repeatedly invokes to explain why Link, Zelda, and Ganon(dorf) keep reincarnating.",
      "The Loftwing-riding, motion-controlled Wii original was remastered for Switch in 2021 with button controls added.",
    ],
    canonicity: "canon",
    placementConfidence: "official",
  },
  {
    id: "minish-cap",
    title: "The Minish Cap",
    releaseDate: "2004",
    releaseYear: "2004",
    image: "https://upload.wikimedia.org/wikipedia/en/0/0a/TLOZ-_Minish_Cap_NA_Box_art.png",
    connections: [
      { type: "direct-prequel", targetId: "four-swords", note: "The origin of Vaati and the Four Sword." },
    ],
    platform: "Game Boy Advance",
    era: "era-of-creation",
    branch: "pre-split",
    timelineOrder: 2,
    synopsis:
      "Link teams up with a sentient talking hat, Ezlo, and gains the ability to shrink to the size of the tiny Minish people to stop Vaati, the wind mage whose rise here sets in motion conflicts referenced throughout the pre-split era.",
    trivia: [
      "Introduces the Four Sword's creation myth and the Picori/Minish, tying directly into the following Four Swords games.",
      "Developed by Capcom's Flagship studio in collaboration with Nintendo, the same team behind the Oracle games.",
    ],
    canonicity: "canon",
    placementConfidence: "official",
  },
  {
    id: "four-swords",
    title: "Four Swords",
    releaseDate: "2002",
    releaseYear: "2002",
    image: "https://upload.wikimedia.org/wikipedia/en/8/83/The_Legend_of_Zelda_A_Link_to_the_Past_%26_Four_Swords_Game_Cover.jpg",
    connections: [
      { type: "direct-sequel", targetId: "minish-cap" },
      { type: "direct-prequel", targetId: "four-swords-adventures", note: "Vaati escapes again a branch later." },
    ],
    platform: "Game Boy Advance",
    era: "era-of-creation",
    branch: "pre-split",
    timelineOrder: 3,
    synopsis:
      "A cooperative-multiplayer dungeon crawler in which Link draws the Four Sword and splits into four colored copies of himself to stop Vaati, who has escaped his imprisonment and kidnapped Princess Zelda.",
    trivia: [
      "Originally bundled as a pack-in with the GBA re-release of A Link to the Past, requiring a Game Boy Advance link cable for its multiplayer.",
      "Establishes the Four Sword's shrine-sealing role, referenced again in Four Swords Adventures on the Child Timeline.",
    ],
    canonicity: "canon",
    placementConfidence: "official",
  },
  {
    id: "ocarina-of-time",
    title: "Ocarina of Time",
    releaseDate: "1998",
    releaseYear: "1998",
    image: "https://upload.wikimedia.org/wikipedia/en/5/57/The_Legend_of_Zelda_Ocarina_of_Time.jpg",
    keyArt: "https://static.wikia.nocookie.net/zelda_gamepedia_en/images/4/4b/OoT3D_Hyrule_Field_Artwork_2.png/revision/latest",
    connections: [
      { type: "thematic", targetId: "a-link-to-the-past", note: "Its Downfall-branch outcome becomes ALttP's Imprisoning War backstory." },
    ],
    platform: "Nintendo 64",
    era: "hero-of-time",
    branch: "pre-split",
    timelineOrder: 4,
    synopsis:
      "Link travels between childhood and adulthood to stop Ganondorf from seizing the Triforce. Its ending is the single fork point of the entire official timeline: depending on how it's interpreted, three different futures branch out from here.",
    trivia: [
      "The three possible outcomes of this game's ending — child Link warns Zelda and prevents Ganondorf's rise, adult Link defeats Ganon but a warning is never given, or Link is defeated entirely — are literally what create the Child, Adult, and Downfall timelines.",
      "Widely regarded as one of the most influential 3D action-adventure games ever made; the Ocarina itself becomes a recurring motif across later titles.",
    ],
    canonicity: "canon",
    placementConfidence: "official",
    sourcingNotes:
      "Per Hyrule Historia (2011) and the Zelda Encyclopedia (2017), this game's differing endings are the origin of the three-branch split. Verified against Zelda Wiki, Dexerto, and Zelda Archive summaries of the official chart.",
  },

  // ── Child Timeline ─────────────────────────────────────────────────
  {
    id: "majoras-mask",
    title: "Majora's Mask",
    releaseDate: "2000",
    releaseYear: "2000",
    image: "https://upload.wikimedia.org/wikipedia/en/6/60/The_Legend_of_Zelda_-_Majora%27s_Mask_Box_Art.jpg",
    keyArt: "https://static.wikia.nocookie.net/zelda_gamepedia_en/images/d/d9/MM_Artwork.png/revision/latest/window-crop/width/1600/x-offset/0/y-offset/500/window-width/2292/window-height/1289",
    connections: [
      { type: "direct-sequel", targetId: "ocarina-of-time", note: "The same child Link, mere weeks later." },
    ],
    platform: "Nintendo 64",
    era: "era-of-decline",
    branch: "child",
    timelineOrder: 5,
    synopsis:
      "Young Link, having just returned from Ocarina of Time and warned Hyrule of Ganondorf, travels to the parallel land of Termina, where he must repeatedly relive a three-day cycle to stop the moon from crashing into the earth.",
    trivia: [
      "Directly opens on the Child Timeline: this is the first game to occur after Link warns Zelda, averting Ganondorf's Ocarina of Time rise.",
      "Famous for its dark tone and 72-hour time-loop structure, a stark departure from Ocarina of Time.",
    ],
    canonicity: "canon",
    placementConfidence: "official",
  },
  {
    id: "twilight-princess",
    title: "Twilight Princess",
    releaseDate: "2006",
    releaseYear: "2006",
    image: "https://upload.wikimedia.org/wikipedia/en/0/0e/The_Legend_of_Zelda_Twilight_Princess_Game_Cover.jpg",
    keyArt: "https://static.wikia.nocookie.net/zelda_gamepedia_en/images/b/b0/TPHD_Cast_Artwork_3.png/revision/latest",
    connections: [
      { type: "thematic", targetId: "majoras-mask", note: "The Hero's Shade is heavily implied to be the Hero of Time, passing on his skills." },
    ],
    platform: "GameCube / Wii",
    era: "era-of-decline",
    branch: "child",
    timelineOrder: 6,
    synopsis:
      "Generations after Majora's Mask, a new Link transforms into a wolf to fight back the Twilight realm's invasion of Hyrule, guided by the mysterious imp Midna, while Ganondorf reemerges as the true threat behind it all.",
    trivia: [
      "The last game on the Child Timeline before Four Swords Adventures, set generations later still within the same branch.",
      "Originally developed for GameCube before being ported to launch alongside the Wii, supporting both Wii Remote motion controls and classic controls.",
    ],
    canonicity: "canon",
    placementConfidence: "official",
  },
  {
    id: "four-swords-adventures",
    title: "Four Swords Adventures",
    releaseDate: "2004",
    releaseYear: "2004",
    image: "https://upload.wikimedia.org/wikipedia/en/5/56/The_Legend_of_Zelda_Four_Swords_Adventures_Game_Cover.jpg",
    connections: [
      { type: "direct-sequel", targetId: "four-swords", note: "Vaati's sealing finally breaks." },
    ],
    platform: "GameCube",
    era: "era-of-decline",
    branch: "child",
    timelineOrder: 7,
    synopsis:
      "Set generations after Twilight Princess, this cooperative multiplayer sequel to Four Swords has Link split into four again to battle Vaati and a resurrected Ganon, closing out the Child Timeline.",
    trivia: [
      "Officially the final entry on the Child Timeline, per Hyrule Historia — not Twilight Princess as many assume.",
      "Used GameCube–Game Boy Advance link-cable connectivity so each player's GBA screen showed a private view of the action.",
    ],
    canonicity: "canon",
    placementConfidence: "official",
    sourcingNotes:
      "Verified against Zelda Dungeon Wiki's Child Timeline article and CBR's 'LOZ Extended Child Timeline' guide, both stating Four Swords Adventures — not Twilight Princess — closes this branch.",
  },

  // ── Adult Timeline ─────────────────────────────────────────────────
  {
    id: "wind-waker",
    title: "The Wind Waker",
    releaseDate: "2002",
    releaseYear: "2002",
    image: "https://upload.wikimedia.org/wikipedia/en/7/79/The_Legend_of_Zelda_The_Wind_Waker.jpg",
    keyArt: "https://static.wikia.nocookie.net/zelda_gamepedia_en/images/4/42/The_Wind_Waker_Scene_HD.jpg/revision/latest/window-crop/width/1600/x-offset/0/y-offset/465/window-width/4500/window-height/2531",
    connections: [
      { type: "direct-sequel", targetId: "ocarina-of-time", note: "Built directly on OoT's adult ending, centuries after the flood." },
      { type: "direct-prequel", targetId: "phantom-hourglass" },
    ],
    platform: "GameCube",
    era: "era-of-decline",
    branch: "adult",
    timelineOrder: 5,
    synopsis:
      "Adult Link defeated Ganon but never returned to warn anyone of the coming danger; when Ganon later resurfaces, the gods flood Hyrule to contain him. Centuries later, a new Link sails the Great Sea to rescue his sister and uncover his kingdom's sunken past.",
    trivia: [
      "Its cel-shaded art style was controversial at reveal but is now widely considered one of the series' most enduring visual styles.",
      "The flooded Hyrule beneath the Great Sea is literally the original Hyrule from Ocarina of Time, preserved and submerged.",
    ],
    canonicity: "canon",
    placementConfidence: "official",
  },
  {
    id: "phantom-hourglass",
    title: "Phantom Hourglass",
    releaseDate: "2007",
    releaseYear: "2007",
    image: "https://upload.wikimedia.org/wikipedia/en/5/5e/The_Legend_of_Zelda_Phantom_Hourglass_Game_Cover.jpg",
    connections: [
      { type: "direct-sequel", targetId: "wind-waker", note: "Begins the very next day." },
    ],
    platform: "Nintendo DS",
    era: "era-of-decline",
    branch: "adult",
    timelineOrder: 6,
    synopsis:
      "A direct sequel picking up the next day after Wind Waker, Link chases the ghost ship that abducted Tetra into the spirit world of the Ocean King, using the DS touch screen to steer his boat and solve puzzles.",
    trivia: [
      "One of the few Zelda games to be a direct narrative sequel to the previous mainline title, rather than a new era or hero.",
      "Controlled almost entirely via stylus, including sailing, sword swings, and item use.",
    ],
    canonicity: "canon",
    placementConfidence: "official",
  },
  {
    id: "spirit-tracks",
    title: "Spirit Tracks",
    releaseDate: "2009",
    releaseYear: "2009",
    image: "https://upload.wikimedia.org/wikipedia/en/9/91/The_Legend_of_Zelda_Spirit_Tracks_box_art.jpg",
    connections: [
      { type: "direct-sequel", targetId: "phantom-hourglass", note: "A century later, in New Hyrule." },
    ],
    platform: "Nintendo DS",
    era: "era-of-decline",
    branch: "adult",
    timelineOrder: 7,
    synopsis:
      "Roughly a century after Phantom Hourglass, in New Hyrule founded by Tetra's descendants, Link and the ghost of Princess Zelda restore the Spirit Tracks binding the Demon King Malladus, closing out the Adult Timeline.",
    trivia: [
      "Zelda spends most of the game as a spirit possessing a Phantom suit of armor, fighting alongside Link rather than waiting to be rescued.",
      "The last chronological entry on the Adult Timeline according to the official chart.",
    ],
    canonicity: "canon",
    placementConfidence: "official",
  },

  // ── Downfall Timeline ──────────────────────────────────────────────
  {
    id: "a-link-to-the-past",
    title: "A Link to the Past",
    releaseDate: "1991",
    releaseYear: "1991",
    image: "https://upload.wikimedia.org/wikipedia/en/2/21/The_Legend_of_Zelda_A_Link_to_the_Past_SNES_Game_Cover.jpg",
    keyArt: "https://static.wikia.nocookie.net/zelda_gamepedia_en/images/e/e0/ALttP_Sacred_Grove_Artwork.png/revision/latest",
    connections: [
      { type: "direct-prequel", targetId: "links-awakening", note: "Its Link sails off in triumph — and shipwrecks." },
      { type: "thematic", targetId: "a-link-between-worlds", note: "The same Hyrule, generations later." },
    ],
    platform: "Super Nintendo",
    era: "era-of-decline",
    branch: "downfall",
    timelineOrder: 5,
    synopsis:
      "Set on the timeline where Link was defeated by Ganondorf in Ocarina of Time and the villain claimed the full Triforce, this SNES classic sends a new Link into the corrupted Dark World to rescue Princess Zelda and six maidens.",
    trivia: [
      "Introduces the Light World / Dark World structure that would influence dungeon design across the series for decades.",
      "Chronologically opens the Downfall Timeline, the branch where Ganon's victory in Ocarina of Time was never undone.",
    ],
    canonicity: "canon",
    placementConfidence: "official",
    sourcingNotes:
      "A Link to the Past is commonly assumed by fans to be part of an earlier 'era of creation,' but Hyrule Historia and Zelda Encyclopedia both place it as the opening title of the Downfall Timeline, not the pre-split trunk.",
  },
  {
    id: "links-awakening",
    title: "Link's Awakening",
    releaseDate: "1993 (Game Boy); remake 2019 (Switch)",
    releaseYear: "1993",
    image: "https://upload.wikimedia.org/wikipedia/en/c/c1/Link%27s_Awakening.png",
    keyArt: "https://static.wikia.nocookie.net/zelda_gamepedia_en/images/4/49/LANS_Key_Artwork.png/revision/latest",
    connections: [
      { type: "direct-sequel", targetId: "a-link-to-the-past", note: "The same hero, shipwrecked after his victory." },
    ],
    platform: "Game Boy / Switch",
    era: "era-of-decline",
    branch: "downfall",
    timelineOrder: 6,
    synopsis:
      "Shipwrecked on the dreamlike Koholint Island, Link must wake the Wind Fish by gathering eight musical instruments — only to discover the entire island may be nothing more than the Wind Fish's dream.",
    trivia: [
      "The first Zelda game on a handheld console, and the first not to feature Princess Zelda or Hyrule at all.",
      "The 2019 Switch remake gave it a distinctive toy-diorama art style.",
    ],
    canonicity: "canon",
    placementConfidence: "official",
  },
  {
    id: "oracle-of-seasons",
    title: "Oracle of Seasons",
    releaseDate: "2001",
    releaseYear: "2001",
    image: "https://upload.wikimedia.org/wikipedia/en/4/47/The_Legend_of_Zelda_Oracle_of_Seasons_and_Oracle_of_Ages_Game_Cover.png",
    connections: [
      { type: "parallel", targetId: "oracle-of-ages", note: "Linked adventures — passwords carry one story into the other." },
    ],
    platform: "Game Boy Color",
    era: "era-of-decline",
    branch: "downfall",
    timelineOrder: 7,
    synopsis:
      "Link travels to Holodrum to stop General Onox from imprisoning the Oracle of Seasons, Din, using the Rod of Seasons to manipulate the land itself — one half of a pair of linked adventures developed alongside Oracle of Ages.",
    trivia: [
      "Password-linkable with Oracle of Ages: finishing one and feeding a code into the other unlocks a combined, extended storyline.",
      "Developed by Capcom's Flagship studio, the same team later behind The Minish Cap.",
    ],
    canonicity: "canon",
    placementConfidence: "official",
  },
  {
    id: "oracle-of-ages",
    title: "Oracle of Ages",
    releaseDate: "2001",
    releaseYear: "2001",
    image: "https://upload.wikimedia.org/wikipedia/en/4/47/The_Legend_of_Zelda_Oracle_of_Seasons_and_Oracle_of_Ages_Game_Cover.png",
    connections: [
      { type: "parallel", targetId: "oracle-of-seasons", note: "Finishing both unlocks the true Ganon ending." },
    ],
    platform: "Game Boy Color",
    era: "era-of-decline",
    branch: "downfall",
    timelineOrder: 8,
    synopsis:
      "Link's companion adventure to Oracle of Seasons sends him to Labrynna to rescue the Oracle of Ages, Nayru, from the sorceress Veran, using time-travel puzzles built around an ancient Harp.",
    trivia: [
      "Combining both Oracle games' passwords reveals a secret final chapter involving series antagonist Ganon's resurrection.",
      "Originally conceived as part of a planned trilogy (with a third 'Oracle of Secrets' title cut during development).",
    ],
    canonicity: "canon",
    placementConfidence: "official",
  },
  {
    id: "a-link-between-worlds",
    title: "A Link Between Worlds",
    releaseDate: "2013",
    releaseYear: "2013",
    image: "https://upload.wikimedia.org/wikipedia/en/1/1b/The_Legend_of_Zelda_A_Link_Between_Worlds_NA_cover.jpg",
    keyArt: "https://static.wikia.nocookie.net/zelda_gamepedia_en/images/4/4c/ALBW_Dungeon_Artwork.png/revision/latest",
    connections: [
      { type: "thematic", targetId: "a-link-to-the-past", note: "Reuses ALttP's overworld map, reimagined generations later." },
      { type: "direct-prequel", targetId: "tri-force-heroes" },
    ],
    platform: "Nintendo 3DS",
    era: "era-of-decline",
    branch: "downfall",
    timelineOrder: 9,
    synopsis:
      "A spiritual sequel set generations after A Link to the Past in the same Hyrule, where Link gains the ability to merge into walls as a living painting to stop the sorcerer Yuga from reviving Ganon.",
    trivia: [
      "Reuses A Link to the Past's overworld map almost exactly, reimagined in 3D — a rare direct callback to a specific earlier game's geography.",
      "Introduced an item-rental system letting players tackle dungeons in almost any order.",
    ],
    canonicity: "canon",
    placementConfidence: "official",
  },
  {
    id: "tri-force-heroes",
    title: "Tri Force Heroes",
    releaseDate: "2015",
    releaseYear: "2015",
    image: "https://upload.wikimedia.org/wikipedia/en/d/db/The_Legend_of_Zelda_Tri_Force_Heroes_Boxart.jpg",
    connections: [
      { type: "direct-sequel", targetId: "a-link-between-worlds", note: "The same Link, a few years on (per Aonuma)." },
    ],
    platform: "Nintendo 3DS",
    era: "era-of-decline",
    branch: "downfall",
    timelineOrder: 10,
    synopsis:
      "A three-player cooperative spin-off in which three Links, cursed alongside their kingdom's fashion-obsessed princess, must stack atop one another as a 'Totem' to solve puzzles and defeat the Drablands' witch sisters.",
    trivia: [
      "Producer Eiji Aonuma has placed it a few years after A Link Between Worlds, in a Game Informer interview, making it the direct successor on the Downfall Timeline.",
      "Built entirely around drop-in three-player co-op, with a single-player mode using AI doll companions.",
    ],
    canonicity: "canon",
    placementConfidence: "official",
    sourcingNotes:
      "Verified against a Game Informer interview in which Aonuma states Tri Force Heroes takes place a few years after A Link Between Worlds.",
  },
  {
    id: "the-legend-of-zelda",
    title: "The Legend of Zelda",
    releaseDate: "1986",
    releaseYear: "1986",
    image: "https://upload.wikimedia.org/wikipedia/en/4/41/Legend_of_zelda_cover_%28with_cartridge%29_gold.png",
    keyArt: "https://static.wikia.nocookie.net/zelda_gamepedia_en/images/7/7f/TLoZ_Link_Princess_Zelda_Artwork.png/revision/latest",
    connections: [
      { type: "direct-prequel", targetId: "adventure-of-link" },
    ],
    platform: "NES / Famicom Disk System",
    era: "era-of-decline",
    branch: "downfall",
    timelineOrder: 11,
    synopsis:
      "The original: Link explores an unmarked overworld and eight dungeons to reassemble the shattered Triforce of Wisdom and rescue Princess Zelda from Ganon. Chronologically, its unnamed hero is a distant, unrelated descendant of the earlier Downfall-branch heroes.",
    trivia: [
      "The game that started the series and the open-world 'explore, don't get told where to go' philosophy Nintendo returned to decades later with Breath of the Wild.",
      "One of the first console games to include a battery-backed save feature.",
    ],
    canonicity: "canon",
    placementConfidence: "official",
  },
  {
    id: "adventure-of-link",
    title: "Zelda II: The Adventure of Link",
    releaseDate: "1987",
    releaseYear: "1987",
    image: "https://upload.wikimedia.org/wikipedia/en/f/fd/Zelda_II_The_Adventure_of_Link_box.jpg",
    connections: [
      { type: "direct-sequel", targetId: "the-legend-of-zelda", note: "The same Link, years later." },
    ],
    platform: "NES / Famicom Disk System",
    era: "era-of-decline",
    branch: "downfall",
    timelineOrder: 12,
    synopsis:
      "A direct sequel to the original, blending side-scrolling action with overworld exploration as Link seeks to wake the sleeping Princess Zelda and prevent Ganon's followers from resurrecting him — the final chapter of the Downfall Timeline.",
    trivia: [
      "The only mainline Zelda game with traditional RPG-style experience points and leveling.",
      "Its side-scrolling combat was a notable departure never repeated by a mainline entry.",
    ],
    canonicity: "canon",
    placementConfidence: "official",
  },

  // ── Distant future: BOTW / TOTK (officially unplaced branch) ───────
  {
    id: "breath-of-the-wild",
    title: "Breath of the Wild",
    releaseDate: "2017",
    releaseYear: "2017",
    image: "https://upload.wikimedia.org/wikipedia/en/c/c6/The_Legend_of_Zelda_Breath_of_the_Wild.jpg",
    keyArt: "https://static.wikia.nocookie.net/zelda_gamepedia_en/images/2/22/BotW_Link_Climbing_Key_Art_English_Logo.png/revision/latest",
    connections: [
      { type: "direct-prequel", targetId: "tears-of-the-kingdom" },
      { type: "parallel", targetId: "age-of-calamity", note: "AoC retells this game's backstory as a winnable what-if." },
    ],
    platform: "Wii U / Switch",
    era: "era-of-prosperity",
    branch: "botw-era",
    timelineOrder: 14,
    synopsis:
      "A century after Calamity Ganon devastated Hyrule and felled its Champions, an amnesiac Link wakes to reclaim his memories and free Princess Zelda, who has held the Calamity at bay alone the entire time. Nintendo places it at the distant-future point after all three post-Ocarina-of-Time branches — but has never said which one it descends from.",
    trivia: [
      "Series producer Eiji Aonuma and director Hidemaro Fujibayashi have stated on record this ambiguity is deliberate — 'that's up to the player's imagination' — leaving Child, Adult, and Downfall theories all technically live.",
      "Its open-world redesign, diegetic Sheikah Slate interface, and minimalist HUD reshaped both the series and the wider open-world genre.",
    ],
    canonicity: "canon",
    placementConfidence: "official",
    sourcingNotes:
      "Nintendo's official chart places BOTW/TOTK after all three branches converge, but deliberately does not specify which branch precedes them. Verified against a Famitsu interview (translated by Kotaku and Source Gaming) in which Aonuma and Fujibayashi confirm this is an intentional, unresolved puzzle for players.",
  },
  {
    id: "tears-of-the-kingdom",
    title: "Tears of the Kingdom",
    releaseDate: "2023",
    releaseYear: "2023",
    image: "https://upload.wikimedia.org/wikipedia/en/f/fb/The_Legend_of_Zelda_Tears_of_the_Kingdom_cover.jpg",
    keyArt: "https://assets.nintendo.com/image/upload/c_fill,w_1600/q_auto:best/f_auto/ncom/en_US/games/switch/t/the-legend-of-zelda-tears-of-the-kingdom-switch/hero",
    connections: [
      { type: "direct-sequel", targetId: "breath-of-the-wild" },
      { type: "thematic", targetId: "age-of-imprisonment", note: "AoI dramatizes the ancient war this game excavates." },
    ],
    platform: "Switch",
    era: "reawakening",
    branch: "botw-era",
    timelineOrder: 15,
    synopsis:
      "Direct sequel to Breath of the Wild: Link and Zelda uncover the ancient Zonai civilization and the truth behind Ganondorf's imprisonment, as sky islands and a vast underground 'Depths' expand Hyrule vertically in both directions.",
    trivia: [
      "The Purah Pad succeeds the Sheikah Slate, keeping its map/camera/compendium roles while trading rune abilities for Ultrahand, Fuse, Ascend, Recall, and Autobuild.",
      "Its branch placement is subject to the same official ambiguity as Breath of the Wild — Nintendo has extended the 'up to the player' stance to this game as well.",
    ],
    canonicity: "canon",
    placementConfidence: "official",
    sourcingNotes:
      "TheGamer and Game Informer corroborate Nintendo extending the same deliberate branch-ambiguity stance from BOTW to TOTK, with Aonuma calling it 'a puzzle the users will have to see if they can solve.'",
  },

  // ── Age of Calamity: alternate-history divergence ───────────────────
  {
    id: "age-of-calamity",
    title: "Hyrule Warriors: Age of Calamity",
    releaseDate: "2020",
    releaseYear: "2020",
    image: "https://upload.wikimedia.org/wikipedia/en/e/e1/Hyrule_Warriors_Age_Of_Calamity.jpg",
    keyArt: "https://static.wikia.nocookie.net/zelda_gamepedia_en/images/6/6f/HWAoC_Key_Artwork.jpg/revision/latest",
    connections: [
      { type: "diverges-from", targetId: "breath-of-the-wild", note: "Splits from BOTW's remembered history at the Champions' last stand." },
    ],
    platform: "Switch",
    era: "alternate-history",
    branch: "aoc-divergence",
    timelineOrder: 13,
    synopsis:
      "Set 100 years before Breath of the Wild, this Dynasty Warriors-style prequel depicts the Great Calamity and the Champions' original battle against Ganon — but its ending diverges from what Breath of the Wild implies happened, playing out as an alternate 'what if the Champions had won' history.",
    trivia: [
      "Never appears on any Nintendo-published timeline chart at all — the last official chart (2017's Zelda Encyclopedia) predates it, and no chart has been issued since to place it.",
      "Its UI adapted Breath of the Wild's Sheikah-tech visual language into a musou-style HUD, translating a diegetic slate interface into fast-paced battlefield map/vitals overlays.",
    ],
    canonicity: "semi-canon",
    placementConfidence: "speculative",
    sourcingNotes:
      "Age of Calamity is entirely absent from Nintendo's last official timeline chart (verified via a full-text search of Zelda Wiki's Timeline page, which returns zero references to it). Its framing here as a divergence near the BOTW-era point reflects this project's own storytelling placement — not a confirmed Nintendo or community-consensus branch position, since no source in this research surfaced developer commentary pinning it to a specific timeline branch.",
  },

  // ── Age of Imprisonment: inferred prequel, not chart-placed ────────
  {
    id: "age-of-imprisonment",
    title: "Hyrule Warriors: Age of Imprisonment",
    releaseDate: "November 6, 2025",
    releaseYear: "2025",
    image: "https://upload.wikimedia.org/wikipedia/en/8/82/HyruleWarriors-AgeOfImprisonment-KeyArt.png",
    keyArt: "https://assets.nintendo.com/image/upload/c_fill,w_1600/q_auto:best/f_auto/ncom/en_US/articles/2025/the-battle-begins-in-hyrule-warriors-age-of-imprisonment/2250x1266_HWAOI_Launch",
    connections: [
      { type: "direct-prequel", targetId: "tears-of-the-kingdom", note: "Depicts the Imprisoning War TOTK only remembers." },
      { type: "parallel", targetId: "age-of-calamity", note: "Sibling musou what-if history." },
    ],
    platform: "Switch 2",
    era: "alternate-history",
    branch: "ancient-imprisonment",
    timelineOrder: 12,
    synopsis:
      "Set during the ancient Imprisoning War, this Switch 2 musou title depicts the Zonai-era conflict that seals Ganondorf and precedes Tears of the Kingdom — filling in roughly three hours of voice-acted backstory Nintendo has called a 'canonical tale,' though never formally chart-placed relative to TOTK.",
    trivia: [
      "Shipped over 1 million copies by January 2026 and carries the Sheikah/Zonai visual and menu language forward almost unchanged from BOTW/TOTK, per reviewers.",
      "Introduces new musou HUD elements not seen in earlier Hyrule Warriors entries: a Weak-Point Gauge, Sync Gauge, Warrior Special meter, Battery System, and a co-op 'Sync Strikes' mechanic.",
      "Eiji Aonuma has suggested in interviews that this game's take on the Imprisoning War could inspire the next mainline Zelda title.",
    ],
    canonicity: "semi-canon",
    placementConfidence: "speculative",
    sourcingNotes:
      "Marketed and reviewed as preceding Tears of the Kingdom's Imprisoning War/Zonai history, but no source — including its own promotional and press coverage — states a formal Hyrule Historia-style chart placement. Verified against Nintendo Life's coverage of Aonuma's comments; treated here as an inferred, not chart-confirmed, prequel.",
  },

  // ── Non-canon: Philips CD-i games ───────────────────────────────────
  {
    id: "faces-of-evil",
    title: "Link: The Faces of Evil",
    releaseDate: "1993",
    releaseYear: "1993",
    image: "https://upload.wikimedia.org/wikipedia/en/d/d6/Link_facesofevil_packaging.jpg",
    connections: [
      { type: "parallel", targetId: "wand-of-gamelon", note: "Developed together, released the same day." },
    ],
    platform: "Philips CD-i",
    era: "non-canon",
    branch: "non-canon",
    timelineOrder: 1,
    synopsis:
      "One of three Zelda games produced for the Philips CD-i under a licensing deal struck when Nintendo and Philips' partnership on a CD-ROM add-on collapsed. Nintendo licensed only character likenesses; it had no real hand in development.",
    trivia: [
      "Series producer Eiji Aonuma has stated on record that he doesn't think these games 'really fit in the Zelda franchise.'",
      "Infamous today largely for its unintentionally comedic animated cutscenes, since become a long-running internet meme.",
    ],
    canonicity: "non-canon",
    placementConfidence: "official",
    sourcingNotes:
      "Verified against Nintendo Life's reproduction of Aonuma's 2013 MTV Multiplayer interview and Wikipedia's account of the licensing deal, confirming Nintendo's involvement was limited to approving character art.",
  },
  {
    id: "wand-of-gamelon",
    title: "Zelda: The Wand of Gamelon",
    releaseDate: "1993",
    releaseYear: "1993",
    image: "https://upload.wikimedia.org/wikipedia/en/c/c6/Zelda_wandofgamelon_packaging.jpg",
    connections: [
      { type: "parallel", targetId: "faces-of-evil" },
    ],
    platform: "Philips CD-i",
    era: "non-canon",
    branch: "non-canon",
    timelineOrder: 2,
    synopsis:
      "The second CD-i title, and the only Zelda game in which Princess Zelda herself is the playable protagonist, searching for Link and fighting Ganon on the island of Gamelon.",
    trivia: [
      "Shares its engine and much of its production with Faces of Evil, developed by the same outside teams under the same Philips licensing deal.",
      "Like its sibling titles, excluded from every official Nintendo timeline publication.",
    ],
    canonicity: "non-canon",
    placementConfidence: "official",
  },
  {
    id: "zeldas-adventure",
    title: "Zelda's Adventure",
    releaseDate: "1994",
    releaseYear: "1994",
    image: "https://upload.wikimedia.org/wikipedia/en/6/61/Zeldasadventure_packaging.jpg",
    connections: [
      { type: "thematic", targetId: "the-legend-of-zelda", note: "Structurally an overhead homage to the 1986 original." },
    ],
    platform: "Philips CD-i",
    era: "non-canon",
    branch: "non-canon",
    timelineOrder: 3,
    synopsis:
      "The third and last Philips CD-i Zelda game, an overhead-view action-adventure closer in structure to the original NES Legend of Zelda, developed independently of Nintendo under the same character-licensing arrangement.",
    trivia: [
      "Developed by a different external studio (Viridis) than the other two CD-i titles.",
      "Like its CD-i siblings, it is unambiguously non-canon per Nintendo's own statements.",
    ],
    canonicity: "non-canon",
    placementConfidence: "official",
  },
];

export function getGameBySlug(id: string): Game | undefined {
  return games.find((g) => g.id === id);
}

export function getRelatedGames(game: Game, limit = 4): Game[] {
  return games
    .filter((g) => g.id !== game.id && g.branch === game.branch)
    .slice(0, limit);
}

export function getGamesByBranch(branch: Game["branch"]): Game[] {
  return games.filter((g) => g.branch === branch);
}

export function getBranchNeighbors(game: Game): { prev?: Game; next?: Game } {
  const siblings = games
    .filter((g) => g.branch === game.branch)
    .sort((a, b) => a.timelineOrder - b.timelineOrder);
  const i = siblings.findIndex((g) => g.id === game.id);
  return {
    prev: i > 0 ? siblings[i - 1] : undefined,
    next: i >= 0 && i < siblings.length - 1 ? siblings[i + 1] : undefined,
  };
}
