/** biome-ignore-all lint/performance/noNamespaceImport: Drizzle wants this */
/** biome-ignore-all lint/style/noMagicNumbers: its a seed file */
import { reset, seed } from 'drizzle-seed';
import { db } from '.';
import {
  buildOrderSteps,
  buildOrders,
  buildOrdersToOpponentFactions,
  buildOrdersToTags,
  stepResources,
  users,
} from './schema';

// Faction-specific build order data
const factionBuildOrders = {
  // StarCraft II
  terran: [
    {
      name: 'Marine Rush',
      description: 'Fast marine production for early pressure',
      tags: ['rush', 'timing-attack'],
    },
    {
      name: 'Siege Tank Push',
      description: 'Mid-game tank-based timing attack',
      tags: ['timing-attack', 'macro'],
    },
    {
      name: 'Bio Ball',
      description: 'Marine/Medivac late game composition',
      tags: ['macro', 'late-game'],
    },
    {
      name: 'Proxy Barracks',
      description: 'Aggressive proxy barracks cheese',
      tags: ['proxy', 'cheese', 'all-in'],
    },
  ],
  protoss: [
    {
      name: 'Zealot Rush',
      description: 'Early zealot pressure build',
      tags: ['rush', 'timing-attack'],
    },
    {
      name: 'Stalker Blink',
      description: 'Blink stalker harassment build',
      tags: ['timing-attack', 'macro'],
    },
    {
      name: 'Carrier Fleet',
      description: 'Late game carrier-based army',
      tags: ['macro', 'late-game'],
    },
    {
      name: 'Proxy Gateway',
      description: 'Proxy gateway cheese strategy',
      tags: ['proxy', 'cheese', 'all-in'],
    },
  ],
  zerg: [
    {
      name: 'Zergling Rush',
      description: 'Fast zergling swarm attack',
      tags: ['rush', 'timing-attack'],
    },
    {
      name: 'Roach Warren',
      description: 'Mid-game roach timing push',
      tags: ['timing-attack', 'macro'],
    },
    {
      name: 'Mutalisk Harass',
      description: 'Mobile mutalisk harassment',
      tags: ['macro', 'economic'],
    },
    {
      name: 'Proxy Hatchery',
      description: 'Aggressive proxy hatchery play',
      tags: ['proxy', 'cheese', 'all-in'],
    },
  ],

  // Age of Empires IV
  english: [
    {
      name: 'Longbow Rush',
      description: 'Early longbow archer pressure',
      tags: ['rush', 'feudal-aggro'],
    },
    {
      name: 'Fast Castle',
      description: 'Quick advancement to Castle Age',
      tags: ['fast-castle', 'economic'],
    },
    {
      name: 'Knight Push',
      description: 'Castle Age knight timing attack',
      tags: ['timing-attack', 'macro'],
    },
    {
      name: 'Trebuchet Siege',
      description: 'Late game siege warfare',
      tags: ['late-game', 'macro'],
    },
  ],
  french: [
    {
      name: 'Knight Rush',
      description: 'Early knight cavalry charge',
      tags: ['rush', 'feudal-aggro'],
    },
    {
      name: 'Crossbow Mass',
      description: 'Massed crossbow army',
      tags: ['timing-attack', 'macro'],
    },
    {
      name: 'Castle Drop',
      description: 'Aggressive castle placement',
      tags: ['timing-attack', 'proxy'],
    },
    {
      name: 'Royal Knight',
      description: 'Elite royal knight composition',
      tags: ['macro', 'late-game'],
    },
  ],
  'holy-roman-empire': [
    {
      name: 'MAA Rush',
      description: 'Men-at-Arms early pressure',
      tags: ['rush', 'feudal-aggro'],
    },
    {
      name: 'Prelate Boom',
      description: 'Economic boom with prelates',
      tags: ['economic', 'macro'],
    },
    {
      name: 'Landsknecht Push',
      description: 'Landsknecht timing attack',
      tags: ['timing-attack', 'macro'],
    },
    {
      name: 'Imperial Palace',
      description: 'Late game imperial units',
      tags: ['late-game', 'macro'],
    },
  ],
  rus: [
    {
      name: 'Horse Archer',
      description: 'Mobile horse archer harassment',
      tags: ['rush', 'feudal-aggro'],
    },
    {
      name: 'Wooden Fortress',
      description: 'Defensive wooden fortress build',
      tags: ['economic', 'macro'],
    },
    {
      name: 'Streltsy Mass',
      description: 'Massed streltsy gunpowder units',
      tags: ['timing-attack', 'macro'],
    },
    {
      name: 'Kremlin Power',
      description: 'Late game kremlin-boosted army',
      tags: ['late-game', 'macro'],
    },
  ],
  mongols: [
    {
      name: 'Mongol Rush',
      description: 'Fast cavalry archer rush',
      tags: ['rush', 'feudal-aggro'],
    },
    {
      name: 'Ovoo Boom',
      description: 'Economic boom using ovoos',
      tags: ['economic', 'macro'],
    },
    {
      name: 'Khan Timing',
      description: 'Khan-supported army push',
      tags: ['timing-attack', 'macro'],
    },
    {
      name: 'Mangudai Elite',
      description: 'Elite mangudai late game',
      tags: ['late-game', 'macro'],
    },
  ],
  chinese: [
    {
      name: 'Zhuge Nu Rush',
      description: 'Early repeating crossbow rush',
      tags: ['rush', 'feudal-aggro'],
    },
    {
      name: 'Dynasty Boom',
      description: 'Economic dynasty advancement',
      tags: ['economic', 'macro'],
    },
    {
      name: 'Nest of Bees',
      description: 'Nest of bees artillery timing',
      tags: ['timing-attack', 'macro'],
    },
    {
      name: 'Imperial Guard',
      description: 'Late game imperial units',
      tags: ['late-game', 'macro'],
    },
  ],
  'abbasid-dynasty': [
    {
      name: 'Camel Rush',
      description: 'Early camel archer pressure',
      tags: ['rush', 'feudal-aggro'],
    },
    {
      name: 'House of Wisdom',
      description: 'Tech-focused economic build',
      tags: ['economic', 'macro'],
    },
    {
      name: 'Mamluk Timing',
      description: 'Mamluk cavalry timing attack',
      tags: ['timing-attack', 'macro'],
    },
    {
      name: 'Abbasid Guard',
      description: 'Elite guard unit composition',
      tags: ['late-game', 'macro'],
    },
  ],
  'delhi-sultanate': [
    {
      name: 'Scholar Rush',
      description: 'Fast scholar-based research',
      tags: ['rush', 'economic'],
    },
    {
      name: 'Elephant Push',
      description: 'War elephant timing attack',
      tags: ['timing-attack', 'macro'],
    },
    {
      name: 'Mosque Network',
      description: 'Defensive mosque network',
      tags: ['economic', 'macro'],
    },
    {
      name: "Sultan's Army",
      description: 'Late game elite composition',
      tags: ['late-game', 'macro'],
    },
  ],

  // Warcraft III
  human: [
    {
      name: 'Footman Rush',
      description: 'Early footman pressure build',
      tags: ['rush', 'timing-attack'],
    },
    {
      name: 'Tower Rush',
      description: 'Aggressive tower placement',
      tags: ['rush', 'proxy', 'cheese'],
    },
    {
      name: 'Knight Mass',
      description: 'Massed knight army',
      tags: ['macro', 'timing-attack'],
    },
    {
      name: 'Archmage Late',
      description: 'Late game archmage strategy',
      tags: ['late-game', 'macro'],
    },
  ],
  orc: [
    {
      name: 'Grunt Rush',
      description: 'Fast grunt warrior rush',
      tags: ['rush', 'timing-attack'],
    },
    {
      name: 'Burrow Push',
      description: 'Aggressive burrow placement',
      tags: ['proxy', 'timing-attack'],
    },
    {
      name: 'Raider Harass',
      description: 'Mobile raider harassment',
      tags: ['macro', 'economic'],
    },
    {
      name: 'Tauren Chieftain',
      description: 'Late game tauren strategy',
      tags: ['late-game', 'macro'],
    },
  ],
  'night-elf': [
    {
      name: 'Archer Rush',
      description: 'Early archer harassment',
      tags: ['rush', 'timing-attack'],
    },
    {
      name: 'Ancient Protector',
      description: 'Defensive ancient strategy',
      tags: ['economic', 'macro'],
    },
    {
      name: 'Huntress Mass',
      description: 'Massed huntress army',
      tags: ['timing-attack', 'macro'],
    },
    {
      name: 'Keeper Grove',
      description: 'Late game keeper strategy',
      tags: ['late-game', 'macro'],
    },
  ],
  undead: [
    {
      name: 'Ghoul Rush',
      description: 'Fast ghoul swarm attack',
      tags: ['rush', 'timing-attack'],
    },
    {
      name: 'Necropolis Creep',
      description: 'Aggressive necropolis spread',
      tags: ['proxy', 'timing-attack'],
    },
    {
      name: 'Skeleton Mass',
      description: 'Massed skeleton army',
      tags: ['macro', 'timing-attack'],
    },
    {
      name: 'Lich Master',
      description: 'Late game lich strategy',
      tags: ['late-game', 'macro'],
    },
  ],

  // Stormgate
  vanguard: [
    {
      name: 'Marine Drop',
      description: 'Early marine harassment',
      tags: ['rush', 'timing-attack'],
    },
    {
      name: 'Mech Push',
      description: 'Mechanical unit timing attack',
      tags: ['timing-attack', 'macro'],
    },
    {
      name: 'Air Superiority',
      description: 'Air-focused late game',
      tags: ['late-game', 'macro'],
    },
    {
      name: 'Proxy Factory',
      description: 'Aggressive factory placement',
      tags: ['proxy', 'cheese', 'all-in'],
    },
  ],
  infernals: [
    {
      name: 'Fiend Rush',
      description: 'Fast fiend swarm attack',
      tags: ['rush', 'timing-attack'],
    },
    {
      name: 'Portal Network',
      description: 'Portal-based expansion',
      tags: ['economic', 'macro'],
    },
    {
      name: 'Demon Army',
      description: 'Mid-game demon composition',
      tags: ['timing-attack', 'macro'],
    },
    {
      name: 'Infernal Lord',
      description: 'Late game infernal strategy',
      tags: ['late-game', 'macro'],
    },
  ],
  celestial: [
    {
      name: 'Zealot Charge',
      description: 'Early zealot warrior rush',
      tags: ['rush', 'timing-attack'],
    },
    {
      name: 'Crystal Network',
      description: 'Economic crystal expansion',
      tags: ['economic', 'macro'],
    },
    {
      name: 'Templar Guard',
      description: 'Elite templar composition',
      tags: ['timing-attack', 'macro'],
    },
    {
      name: 'Celestial Ascension',
      description: 'Late game celestial power',
      tags: ['late-game', 'macro'],
    },
  ],
};

// Game and faction ID mappings based on migration data
const gameIds = {
  sc2: 1,
  aoe4: 2,
  wc3: 3,
  stormgate: 4,
};

const factionIds = {
  // Stormgate (game_id: 4)
  vanguard: 1,
  infernals: 2,
  celestial: 3,
  // StarCraft II (game_id: 1)
  terran: 4,
  protoss: 5,
  zerg: 6,
  // Warcraft III (game_id: 3)
  human: 7,
  orc: 8,
  'night-elf': 9,
  undead: 10,
  // Age of Empires IV (game_id: 2)
  english: 11,
  french: 12,
  'holy-roman-empire': 13,
  rus: 14,
  mongols: 15,
  chinese: 16,
  'abbasid-dynasty': 17,
  'delhi-sultanate': 18,
} as const;

// Tag ID mappings based on database data
const tagIds = {
  rush: 1,
  macro: 2,
  'timing-attack': 3,
  cheese: 4,
  'all-in': 5,
  'late-game': 6,
  proxy: 7,
  economic: 8,
  'fast-castle': 9,
  'feudal-aggro': 10,
} as const;

// Resource ID mappings based on actual database data
const resourceIds = {
  // StarCraft II (game_id: 1)
  minerals: 1,
  vespene: 2,
  'sc2-supply': 3,
  // Age of Empires IV (game_id: 2)
  'aoe4-food': 4,
  wood: 5,
  'aoe4-gold': 6,
  stone: 7,
  population: 8,
  // Warcraft III (game_id: 3)
  'wc3-gold': 9,
  lumber: 10,
  'wc3-food': 11,
  // Stormgate (game_id: 4)
  luminite: 12,
  therium: 13,
  'stormgate-supply': 14,
} as const;

// Build order steps templates by game
const buildStepTemplates = {
  sc2: [
    { time: 0, desc: 'Start with 6 workers' },
    { time: 15, desc: 'Build supply depot' },
    { time: 30, desc: 'Build barracks' },
    { time: 45, desc: 'Train marine' },
    { time: 60, desc: 'Build refinery' },
    { time: 90, desc: 'Expand to natural' },
    { time: 120, desc: 'Build factory' },
    { time: 150, desc: 'Tech upgrade' },
  ],
  aoe4: [
    { time: 0, desc: 'Start with villagers gathering food' },
    { time: 30, desc: 'Build house for population' },
    { time: 60, desc: 'Advance to Feudal Age' },
    { time: 120, desc: 'Build military production' },
    { time: 180, desc: 'Train military units' },
    { time: 240, desc: 'Advance to Castle Age' },
    { time: 300, desc: 'Build siege workshop' },
    { time: 360, desc: 'Mass army for attack' },
  ],
  wc3: [
    { time: 0, desc: 'Start with 5 workers' },
    { time: 20, desc: 'Build altar of heroes' },
    { time: 40, desc: 'Train hero unit' },
    { time: 60, desc: 'Build barracks' },
    { time: 90, desc: 'Train tier 1 units' },
    { time: 120, desc: 'Upgrade to tier 2' },
    { time: 180, desc: 'Build advanced units' },
    { time: 240, desc: 'Push with army' },
  ],
  stormgate: [
    { time: 0, desc: 'Start with workers' },
    { time: 25, desc: 'Build supply structure' },
    { time: 50, desc: 'Build production facility' },
    { time: 75, desc: 'Train basic units' },
    { time: 100, desc: 'Expand resource gathering' },
    { time: 150, desc: 'Tech up' },
    { time: 200, desc: 'Build advanced units' },
    { time: 250, desc: 'Execute timing attack' },
  ],
};

// Create build order data with game and faction IDs
type BuildOrderWithIds = {
  name: string;
  description: string;
  tags: string[];
  tagIds: number[];
  gameId: number;
  factionId: number;
};

const buildOrdersWithIds: BuildOrderWithIds[] = [];
for (const [factionSlug, builds] of Object.entries(factionBuildOrders)) {
  const factionId = factionIds[factionSlug as keyof typeof factionIds];
  let gameId: number;

  // Determine game ID based on faction
  if (['terran', 'protoss', 'zerg'].includes(factionSlug)) {
    gameId = gameIds.sc2;
  } else if (
    [
      'english',
      'french',
      'holy-roman-empire',
      'rus',
      'mongols',
      'chinese',
      'abbasid-dynasty',
      'delhi-sultanate',
    ].includes(factionSlug)
  ) {
    gameId = gameIds.aoe4;
  } else if (['human', 'orc', 'night-elf', 'undead'].includes(factionSlug)) {
    gameId = gameIds.wc3;
  } else if (['vanguard', 'infernals', 'celestial'].includes(factionSlug)) {
    gameId = gameIds.stormgate;
  } else {
    throw new Error(`Unknown faction: ${factionSlug}`);
  }

  for (const build of builds) {
    const buildTagIds = build.tags
      .map((tag) => tagIds[tag as keyof typeof tagIds])
      .filter(Boolean);
    buildOrdersWithIds.push({
      ...build,
      tagIds: buildTagIds,
      gameId,
      factionId,
    });
  }
}

async function main() {
  await reset(db, {
    buildOrders,
    buildOrderSteps,
    buildOrdersToOpponentFactions,
    buildOrdersToTags,
    stepResources,
    users,
  });

  await seed(db, {
    buildOrders,
    buildOrderSteps,
    buildOrdersToOpponentFactions,
    buildOrdersToTags,
    stepResources,
    users,
  }).refine((f) => ({
    users: {
      count: 10,
      columns: {
        name: f.fullName({ isUnique: true }),
        email: f.email(),
        emailVerified: f.boolean(),
        image: f.default({ defaultValue: null }),
      },
    },
    buildOrders: {
      count: 200, // Approximately 4-5 build orders per faction
      columns: {
        // userId will be automatically populated from the users relation
        gameId: f.valuesFromArray({
          values: buildOrdersWithIds.map((bo) => bo.gameId),
        }),
        factionId: f.valuesFromArray({
          values: buildOrdersWithIds.map((bo) => bo.factionId),
        }),
        name: f.valuesFromArray({
          values: buildOrdersWithIds.map((bo) => bo.name),
        }),
        description: f.valuesFromArray({
          values: buildOrdersWithIds.map((bo) => bo.description),
        }),
        videoUrl: f.default({ defaultValue: null }),
        patchVersion: f.valuesFromArray({
          values: ['1.0.0', '1.1.0', '1.2.0', '2.0.0', '2.1.0'],
        }),
        visibility: f.valuesFromArray({
          values: ['public', 'private', 'unlisted'],
        }),
        status: f.valuesFromArray({
          values: ['active', 'draft', 'archived'],
        }),
        favoritesCount: f.int({ minValue: 0, maxValue: 300 }),
        deletedAt: f.default({ defaultValue: null }),
      },
      with: {
        buildOrderSteps: [
          { weight: 1, count: [2, 4, 8] }, // Simple builds
        ],
        buildOrdersToTags: [
          { weight: 1, count: [1] }, // Single tag
        ],
        buildOrdersToOpponentFactions: [
          { weight: 1, count: [1] }, // Universal build (no specific counters)
        ],
      },
    },
    buildOrderSteps: {
      columns: {
        gameTime: f.int({ minValue: 0, maxValue: 600 }), // 0-10 minutes in seconds
        description: f.valuesFromArray({
          values: [
            ...buildStepTemplates.sc2.map((s) => s.desc),
            ...buildStepTemplates.aoe4.map((s) => s.desc),
            ...buildStepTemplates.wc3.map((s) => s.desc),
            ...buildStepTemplates.stormgate.map((s) => s.desc),
            // Additional generic steps
            'Scout enemy base',
            'Harass enemy workers',
            'Defend against rush',
            'Secure expansion',
            'Build defensive structures',
            'Research upgrades',
            'Mass production phase',
            'Execute final push',
          ],
        }),
        sortOrder: f.int({ minValue: 1, maxValue: 1000, isUnique: true }),
      },
    },
    buildOrdersToTags: {
      columns: {
        tagId: f.valuesFromArray({
          values: buildOrdersWithIds.flatMap((bo) => bo.tagIds),
        }),
      },
    },
    buildOrdersToOpponentFactions: {
      columns: {
        factionId: f.valuesFromArray({
          values: Object.values(factionIds),
        }),
      },
    },
    stepResources: {
      columns: {
        resourceId: f.valuesFromArray({
          values: Object.values(resourceIds),
        }),
        amount: f.int({ minValue: 10, maxValue: 500 }),
      },
    },
  }));

  // biome-ignore lint: Expected in seed file
  console.log(
    '✅ Database seeded successfully with build orders for all factions!'
  );
  // biome-ignore lint: Expected in seed file
  console.log('📊 Generated:');
  // biome-ignore lint: Expected in seed file
  console.log('   - 10 users');
  // biome-ignore lint: Expected in seed file
  console.log('   - ~200 build orders across all factions');
  // biome-ignore lint: Expected in seed file
  console.log('   - ~400-600 build order to tag relationships');
  // biome-ignore lint: Expected in seed file
  console.log('   - ~400-800 build order to opponent faction relationships');
  // biome-ignore lint: Expected in seed file
  console.log('   - ~1,600 build order steps');
  // biome-ignore lint: Expected in seed file
  console.log('   - ~3,200 step resources');
}

// biome-ignore lint: Expected in seed file
main().catch(console.error);
