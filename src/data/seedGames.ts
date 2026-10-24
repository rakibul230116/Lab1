import { Game, LeaderboardEntry } from '../types';

/**
 * Seed data for PlayHub
 *
 * NOTE FOR CLIENT / PRODUCTION:
 * Replace embedUrl values with licensed embeds from providers such as
 * GameDistribution, itch.io embeds, GameArter, or your own HTML5 game exports.
 * The current embedUrl format 'internal://<slug>' triggers PlayHub's built-in
 * responsive HTML5 canvas game engines.
 */
export const SEED_GAMES: Game[] = [
  // Arcade / Featured
  {
    id: 'game-1',
    title: 'Galaxy Runner',
    slug: 'galaxy-runner',
    category: 'Arcade',
    description: 'Sprint through cosmic space platforms, blast alien drones, and survive the endless interstellar void!',
    thumbnail: '/src/assets/images/hero_galaxy_runner_1792824089651.jpg',
    embedUrl: 'internal://galaxy-runner',
    rating: 4.9,
    ratingCount: 1420,
    plays: 284500,
    isFeatured: true,
    isPopular: true,
    isNew: false,
    createdAt: '2026-01-15T10:00:00Z',
    instructions: 'Pilot your cosmic scout ship or runner across orbital space gates. Destroy hostile alien drones before they breach your shield perimeter.',
    controls: [
      { key: 'Left / Right or A/D', action: 'Move / Steer ship' },
      { key: 'Spacebar / Tap', action: 'Fire primary plasma blasters' },
      { key: 'Shift / Double-tap', action: 'Engage sub-light boost' }
    ],
    tags: ['Space', 'Arcade', 'Shooter', 'Sci-Fi'],
    developer: 'CosmicForge Studios'
  },
  // Racing / Featured
  {
    id: 'game-2',
    title: 'Neon Racer 2099',
    slug: 'neon-racer-2099',
    category: 'Racing',
    description: 'Tear through rain-soaked cyberpunk highways at supersonic velocities in high-tech hovercrafts.',
    thumbnail: '/src/assets/images/hero_neon_racer_1792824090202.jpg',
    embedUrl: 'internal://neon-racer-2099',
    rating: 4.8,
    ratingCount: 1890,
    plays: 341200,
    isFeatured: true,
    isPopular: true,
    isNew: false,
    createdAt: '2026-02-01T12:00:00Z',
    instructions: 'Navigate crowded neon metropolitan expressways. Dodge traffic, collect turbo boosters, and maintain peak RPM without crashing.',
    controls: [
      { key: 'Left / Right or A/D', action: 'Steer vehicle' },
      { key: 'Up or W', action: 'Accelerate / Nitro' },
      { key: 'Down or S', action: 'Brake / Drift' }
    ],
    tags: ['Racing', 'Cyberpunk', 'Drift', 'Supercars'],
    developer: 'Veloce Interactive'
  },
  // Puzzle / Featured
  {
    id: 'game-3',
    title: 'Mystic Runes & Gems',
    slug: 'mystic-runes-gems',
    category: 'Puzzle',
    description: 'Harness elemental sorcery by linking mystical crystals, activating ancient altar runes, and solving enchanting trials.',
    thumbnail: '/src/assets/images/hero_mystic_gems_1792824090672.jpg',
    embedUrl: 'internal://mystic-runes-gems',
    rating: 4.7,
    ratingCount: 960,
    plays: 195400,
    isFeatured: true,
    isPopular: true,
    isNew: false,
    createdAt: '2026-02-14T08:30:00Z',
    instructions: 'Tap or drag adjacent enchanted gems to forge rows of three or more. Unleash cascading combo multipliers and unlock arcane vaults.',
    controls: [
      { key: 'Mouse Click / Tap', action: 'Select and swap gems' },
      { key: 'R Key', action: 'Shuffle rune board' },
      { key: 'H Key', action: 'Call wizard hint' }
    ],
    tags: ['Puzzle', 'Match 3', 'Magic', 'Fantasy'],
    developer: 'Aetheria Games'
  },
  // Action / Featured
  {
    id: 'game-4',
    title: 'Cyber Ninja Blade',
    slug: 'cyber-ninja-blade',
    category: 'Action',
    description: 'Leap across neo-Tokyo skyscrapers and slice through robotic synth assassins with your high-frequency katana.',
    thumbnail: '/src/assets/images/hero_cyber_ninja_1792824091476.jpg',
    embedUrl: 'internal://cyber-ninja-blade',
    rating: 4.9,
    ratingCount: 2150,
    plays: 412800,
    isFeatured: true,
    isPopular: true,
    isNew: true,
    createdAt: '2026-03-01T15:00:00Z',
    instructions: 'Test your reflexes in lighting-fast combat. Strike down incoming android threats before they strike, and chain deflect combo streaks.',
    controls: [
      { key: 'Mouse Click / Swipe', action: 'Slash katana blade' },
      { key: 'Spacebar', action: 'Dash dodge' },
      { key: 'Q / E Keys', action: 'Throw shuriken stars' }
    ],
    tags: ['Action', 'Ninja', 'Cyberpunk', 'Reflex'],
    developer: 'KatanaWorks Tokyo'
  },
  // Puzzle 2
  {
    id: 'game-5',
    title: '2048 Neon Rush',
    slug: '2048-neon-rush',
    category: 'Puzzle',
    description: 'The viral numeric slide puzzle remastered with glowing synthwave aesthetic and pulsing beats.',
    thumbnail: '/src/assets/images/hero_neon_racer_1792824090202.jpg',
    embedUrl: 'internal://2048-neon-rush',
    rating: 4.6,
    ratingCount: 780,
    plays: 162000,
    isFeatured: false,
    isPopular: true,
    isNew: false,
    createdAt: '2026-01-20T09:00:00Z',
    instructions: 'Use your arrow keys or swipe to slide all tiles. When two tiles with the same number touch, they merge into one!',
    controls: [
      { key: 'Arrow Keys / Swipe', action: 'Slide all grid tiles' },
      { key: 'U Key', action: 'Undo last move' }
    ],
    tags: ['Puzzle', 'Math', 'Numbers', 'Logic'],
    developer: 'Hexagon Lab'
  },
  // Puzzle 3
  {
    id: 'game-6',
    title: 'Zen Garden Tangram',
    slug: 'zen-garden-tangram',
    category: 'Puzzle',
    description: 'Arrange geometric polygonal tiles to recreate serene Japanese garden motifs accompanied by soothing ambient sounds.',
    thumbnail: '/src/assets/images/hero_mystic_gems_1792824090672.jpg',
    embedUrl: 'internal://zen-garden-tangram',
    rating: 4.8,
    ratingCount: 640,
    plays: 118400,
    isFeatured: false,
    isPopular: false,
    isNew: true,
    createdAt: '2026-03-05T11:00:00Z',
    instructions: 'Drag and rotate colorful geometric wooden pieces so they fill the target silhouette without overlapping.',
    controls: [
      { key: 'Drag & Drop', action: 'Move puzzle piece' },
      { key: 'Right Click / Double Tap', action: 'Rotate piece 45 degrees' }
    ],
    tags: ['Tangram', 'Relaxing', 'Zen', 'Shapes'],
    developer: 'Sakura Interactive'
  },
  // Action 2
  {
    id: 'game-7',
    title: 'Shadow Arena Strike',
    slug: 'shadow-arena-strike',
    category: 'Action',
    description: 'Enter the gladiatorial colosseum of shadows. Face relentless waves of armored warriors and behemoths.',
    thumbnail: '/src/assets/images/hero_cyber_ninja_1792824091476.jpg',
    embedUrl: 'internal://shadow-arena-strike',
    rating: 4.7,
    ratingCount: 1120,
    plays: 230900,
    isFeatured: false,
    isPopular: true,
    isNew: false,
    createdAt: '2026-02-10T14:15:00Z',
    instructions: 'Defeat waves of arena gladiators. Time your parries, roll behind heavy shieldmen, and upgrade armor between rounds.',
    controls: [
      { key: 'WASD / Arrow Keys', action: 'Move champion' },
      { key: 'J / Left Click', action: 'Primary melee strike' },
      { key: 'K / Right Click', action: 'Shield parry' }
    ],
    tags: ['Action', 'Gladiator', 'Combat', 'Arena'],
    developer: 'IronClad Games'
  },
  // Action 3
  {
    id: 'game-8',
    title: 'Alien Swarm Assault',
    slug: 'alien-swarm-assault',
    category: 'Action',
    description: 'Defend humanity\'s outermost deep-space outpost against an unending swarm of extraterrestrial bio-monsters.',
    thumbnail: '/src/assets/images/hero_galaxy_runner_1792824089651.jpg',
    embedUrl: 'internal://alien-swarm-assault',
    rating: 4.5,
    ratingCount: 890,
    plays: 178200,
    isFeatured: false,
    isPopular: false,
    isNew: true,
    createdAt: '2026-03-12T16:00:00Z',
    instructions: 'Position automated defense turrets and use personal heavy railguns to hold off subterranean insectoid swarms.',
    controls: [
      { key: 'Mouse Aim & Shoot', action: 'Target railgun' },
      { key: '1, 2, 3 Keys', action: 'Deploy sentry turrets' },
      { key: 'R Key', action: 'Reload ordnance' }
    ],
    tags: ['Shooter', 'Sci-Fi', 'Survival', 'Aliens'],
    developer: 'Sector 7 Games'
  },
  // Racing 2
  {
    id: 'game-9',
    title: 'Turbo Drift Outrun',
    slug: 'turbo-drift-outrun',
    category: 'Racing',
    description: 'Classic 80s arcade synth-wave mountain pass drifting. Power slide around hairpins to beat the clock.',
    thumbnail: '/src/assets/images/hero_neon_racer_1792824090202.jpg',
    embedUrl: 'internal://turbo-drift-outrun',
    rating: 4.7,
    ratingCount: 1340,
    plays: 289000,
    isFeatured: false,
    isPopular: true,
    isNew: false,
    createdAt: '2026-01-25T17:00:00Z',
    instructions: 'Master the weight transfer drift mechanic. Hit apexes cleanly to charge up your twin-turbo overdrive.',
    controls: [
      { key: 'Arrow Keys', action: 'Steer and throttle' },
      { key: 'Spacebar', action: 'Handbrake drift' },
      { key: 'C Key', action: 'Switch camera perspective' }
    ],
    tags: ['Drift', 'Arcade', 'Retro', 'Cars'],
    developer: 'Apex Horizon'
  },
  // Racing 3
  {
    id: 'game-10',
    title: 'Cyber Highway Sprint',
    slug: 'cyber-highway-sprint',
    category: 'Racing',
    description: 'High-octane motorcycle racing through futuristic tunnels with laser barricades and speed portals.',
    thumbnail: '/src/assets/images/hero_neon_racer_1792824090202.jpg',
    embedUrl: 'internal://cyber-highway-sprint',
    rating: 4.6,
    ratingCount: 710,
    plays: 142300,
    isFeatured: false,
    isPopular: false,
    isNew: true,
    createdAt: '2026-03-08T18:00:00Z',
    instructions: 'Weave through tunnel speed boosters and duck under low laser barriers to maintain maximum momentum.',
    controls: [
      { key: 'A / D Keys', action: 'Tilt motorcycle' },
      { key: 'Down Arrow', action: 'Tuck for aerodynamic speed' }
    ],
    tags: ['Motorcycle', 'Cyberpunk', 'High Speed'],
    developer: 'Veloce Interactive'
  },
  // Arcade 2
  {
    id: 'game-11',
    title: 'Retro Brick Buster',
    slug: 'retro-brick-buster',
    category: 'Arcade',
    description: 'Shatter walls of kaleidoscopic bricks, gather multi-ball powerups, and clear 50 retro-styled levels.',
    thumbnail: '/src/assets/images/hero_galaxy_runner_1792824089651.jpg',
    embedUrl: 'internal://retro-brick-buster',
    rating: 4.8,
    ratingCount: 1560,
    plays: 310500,
    isFeatured: false,
    isPopular: true,
    isNew: false,
    createdAt: '2026-01-10T12:00:00Z',
    instructions: 'Keep the laser sphere in play using your energy paddle. Catch green power-capsules for laser cannons and wide paddles.',
    controls: [
      { key: 'Mouse Move / Touch', action: 'Move paddle horizontally' },
      { key: 'Click / Spacebar', action: 'Launch initial ball' }
    ],
    tags: ['Breakout', 'Retro', 'Classic', 'Arcade'],
    developer: 'PixelArcade Co'
  },
  // Arcade 3
  {
    id: 'game-12',
    title: 'Pixel Bounce Mania',
    slug: 'pixel-bounce-mania',
    category: 'Arcade',
    description: 'Time your vertical hops across spinning gears, bouncy trampolines, and crumbling platforms.',
    thumbnail: '/src/assets/images/hero_galaxy_runner_1792824089651.jpg',
    embedUrl: 'internal://pixel-bounce-mania',
    rating: 4.4,
    ratingCount: 520,
    plays: 98400,
    isFeatured: false,
    isPopular: false,
    isNew: true,
    createdAt: '2026-03-14T10:00:00Z',
    instructions: 'Bounce continuously upwards. Avoid spikes and collect golden tokens to unlock quirky pixel skins.',
    controls: [
      { key: 'Left / Right or Tilt', action: 'Guide jumping character' }
    ],
    tags: ['Endless Hopper', 'Casual', 'Pixel Art'],
    developer: 'JumpWorks'
  },
  // Adventure 1
  {
    id: 'game-13',
    title: 'Dungeon Quest Legends',
    slug: 'dungeon-quest-legends',
    category: 'Adventure',
    description: 'Descend into subterranean crypts filled with goblin hordes, hidden treasure chests, and ancient secrets.',
    thumbnail: '/src/assets/images/hero_mystic_gems_1792824090672.jpg',
    embedUrl: 'internal://dungeon-quest-legends',
    rating: 4.9,
    ratingCount: 1780,
    plays: 367000,
    isFeatured: false,
    isPopular: true,
    isNew: false,
    createdAt: '2026-01-18T14:00:00Z',
    instructions: 'Explore procedurally generated dungeon chambers. Loot enchanted blades, drink health potions, and conquer floor bosses.',
    controls: [
      { key: 'WASD / Arrow Keys', action: 'Move hero through grid' },
      { key: 'Spacebar', action: 'Interact / Open chests' },
      { key: 'I Key', action: 'Open inventory bag' }
    ],
    tags: ['RPG', 'Dungeon Crawler', 'Rogue-lite', 'Fantasy'],
    developer: 'Mythic Realm'
  },
  // Adventure 2
  {
    id: 'game-14',
    title: 'Cosmic Voyager Chronicles',
    slug: 'cosmic-voyager-chronicles',
    category: 'Adventure',
    description: 'Chart unexplored exoplanets, trade with quirky extraterrestrial civilizations, and discover galaxy anomalies.',
    thumbnail: '/src/assets/images/hero_galaxy_runner_1792824089651.jpg',
    embedUrl: 'internal://cosmic-voyager-chronicles',
    rating: 4.7,
    ratingCount: 840,
    plays: 154000,
    isFeatured: false,
    isPopular: false,
    isNew: false,
    createdAt: '2026-02-22T19:00:00Z',
    instructions: 'Manage fuel and crew morale as you leap between star systems. Choose dialogue responses carefully in alien encounters.',
    controls: [
      { key: 'Mouse Navigation', action: 'Select stellar routes' },
      { key: '1-4 Keys', action: 'Select dialogue choices' }
    ],
    tags: ['Sci-Fi', 'Exploration', 'Story Rich'],
    developer: 'CosmicForge Studios'
  },
  // Adventure 3
  {
    id: 'game-15',
    title: 'Lost Temple Raider',
    slug: 'lost-temple-raider',
    category: 'Adventure',
    description: 'Sprint through treacherous ruins, evade swinging stone axes, leap across chasms, and recover ancient relics.',
    thumbnail: '/src/assets/images/hero_cyber_ninja_1792824091476.jpg',
    embedUrl: 'internal://lost-temple-raider',
    rating: 4.6,
    ratingCount: 1100,
    plays: 215600,
    isFeatured: false,
    isPopular: true,
    isNew: true,
    createdAt: '2026-03-02T13:00:00Z',
    instructions: 'Run endlessly through ancient Mayan ruins. Slide under tripwires and jump over perilous cliff edges.',
    controls: [
      { key: 'Up Arrow / W', action: 'Jump obstacle' },
      { key: 'Down Arrow / S', action: 'Slide under traps' },
      { key: 'Left / Right', action: 'Turn corner or switch lanes' }
    ],
    tags: ['Runner', 'Adventure', 'Traps', 'Temple'],
    developer: 'Relic Hunters'
  },
  // Brain Training 1
  {
    id: 'game-16',
    title: 'Memory Matrix Pro',
    slug: 'memory-matrix-pro',
    category: 'Brain Training',
    description: 'Test and enhance your spatial working memory by remembering intricate flashing grid patterns.',
    thumbnail: '/src/assets/images/hero_mystic_gems_1792824090672.jpg',
    embedUrl: 'internal://memory-matrix-pro',
    rating: 4.8,
    ratingCount: 1320,
    plays: 245000,
    isFeatured: false,
    isPopular: true,
    isNew: false,
    createdAt: '2026-01-30T10:00:00Z',
    instructions: 'A sequence of glowing matrix tiles will illuminate for 2 seconds. Tap the exact tiles in order after they conceal themselves.',
    controls: [
      { key: 'Mouse Click / Touch', action: 'Select revealed memory tiles' }
    ],
    tags: ['Brain', 'Memory', 'Cognitive', 'IQ'],
    developer: 'NeuroLab Training'
  },
  // Brain Training 2
  {
    id: 'game-17',
    title: 'Speed Math Blitz',
    slug: 'speed-math-blitz',
    category: 'Brain Training',
    description: 'Race against the clock solving rapid mental arithmetic equations. Build combo streaks to top the leaderboard!',
    thumbnail: '/src/assets/images/hero_neon_racer_1792824090202.jpg',
    embedUrl: 'internal://speed-math-blitz',
    rating: 4.7,
    ratingCount: 940,
    plays: 189000,
    isFeatured: false,
    isPopular: false,
    isNew: true,
    createdAt: '2026-03-10T08:00:00Z',
    instructions: 'Answer rapid addition, subtraction, and multiplication challenges in under 3 seconds per equation.',
    controls: [
      { key: 'Number Keys 0-9', action: 'Enter mathematical answer' },
      { key: 'Enter / Return', action: 'Submit calculation' }
    ],
    tags: ['Math', 'Mental Agility', 'Speed', 'Numbers'],
    developer: 'NeuroLab Training'
  },
  // Brain Training 3
  {
    id: 'game-18',
    title: 'Word Nexus Grid',
    slug: 'word-nexus-grid',
    category: 'Brain Training',
    description: 'Unscramble anagram clusters and connect letters to discover hidden dictionary terms in record time.',
    thumbnail: '/src/assets/images/hero_mystic_gems_1792824090672.jpg',
    embedUrl: 'internal://word-nexus-grid',
    rating: 4.8,
    ratingCount: 1650,
    plays: 320000,
    isFeatured: false,
    isPopular: true,
    isNew: false,
    createdAt: '2026-02-18T11:00:00Z',
    instructions: 'Connect adjacent letter tiles horizontally, vertically, or diagonally to form valid English words.',
    controls: [
      { key: 'Mouse Drag / Swipe', action: 'Link adjacent letter path' },
      { key: 'Spacebar', action: 'Clear current word buffer' }
    ],
    tags: ['Words', 'Vocabulary', 'Spelling', 'Puzzle'],
    developer: 'Lexicon Studio'
  }
];

export const INITIAL_LEADERBOARD: LeaderboardEntry[] = [
  { id: 'lb-1', gameId: 'game-1', gameTitle: 'Galaxy Runner', playerName: 'NovaVortex', score: 98450, date: '2026-03-20', rank: 1, avatar: '🚀' },
  { id: 'lb-2', gameId: 'game-2', gameTitle: 'Neon Racer 2099', playerName: 'CyberSpeed99', score: 87200, date: '2026-03-21', rank: 2, avatar: '🏎️' },
  { id: 'lb-3', gameId: 'game-4', gameTitle: 'Cyber Ninja Blade', playerName: 'ShadowBladeX', score: 81900, date: '2026-03-19', rank: 3, avatar: '🥷' },
  { id: 'lb-4', gameId: 'game-11', gameTitle: 'Retro Brick Buster', playerName: 'ArcadeWizard', score: 76400, date: '2026-03-22', rank: 4, avatar: '👾' },
  { id: 'lb-5', gameId: 'game-3', gameTitle: 'Mystic Runes & Gems', playerName: 'AetherMage', score: 71200, date: '2026-03-18', rank: 5, avatar: '💎' },
  { id: 'lb-6', gameId: 'game-16', gameTitle: 'Memory Matrix Pro', playerName: 'NeuroMaster', score: 68500, date: '2026-03-22', rank: 6, avatar: '🧠' },
  { id: 'lb-7', gameId: 'game-13', gameTitle: 'Dungeon Quest Legends', playerName: 'DragonSlayer', score: 64100, date: '2026-03-20', rank: 7, avatar: '⚔️' },
  { id: 'lb-8', gameId: 'game-17', gameTitle: 'Speed Math Blitz', playerName: 'QuantumBrain', score: 59800, date: '2026-03-21', rank: 8, avatar: '⚡' },
  { id: 'lb-9', gameId: 'game-9', gameTitle: 'Turbo Drift Outrun', playerName: 'ApexDrifter', score: 56400, date: '2026-03-17', rank: 9, avatar: '🔥' },
  { id: 'lb-10', gameId: 'game-18', gameTitle: 'Word Nexus Grid', playerName: 'WordSmithPro', score: 52900, date: '2026-03-22', rank: 10, avatar: '📖' }
];
