INSERT INTO games (slug, name) VALUES
  ('sc2', 'StarCraft II'),
  ('aoe4', 'Age of Empires IV'),
  ('wc3', 'Warcraft III'),
  ('stormgate', 'Stormgate');

-- Factions
-- Stormgate
INSERT INTO factions (game_id, slug, name) VALUES
  ((SELECT id FROM games WHERE slug = 'stormgate'), 'vanguard', 'Vanguard'),
  ((SELECT id FROM games WHERE slug = 'stormgate'), 'infernals', 'Infernals'),
  ((SELECT id FROM games WHERE slug = 'stormgate'), 'celestial', 'Celestial');

-- StarCraft II
INSERT INTO factions (game_id, slug, name) VALUES
  ((SELECT id FROM games WHERE slug = 'sc2'), 'terran', 'Terran'),
  ((SELECT id FROM games WHERE slug = 'sc2'), 'protoss', 'Protoss'),
  ((SELECT id FROM games WHERE slug = 'sc2'), 'zerg', 'Zerg');

-- Warcraft III
INSERT INTO factions (game_id, slug, name) VALUES
  ((SELECT id FROM games WHERE slug = 'wc3'), 'human', 'Human'),
  ((SELECT id FROM games WHERE slug = 'wc3'), 'orc', 'Orc'),
  ((SELECT id FROM games WHERE slug = 'wc3'), 'night-elf', 'Night Elf'),
  ((SELECT id FROM games WHERE slug = 'wc3'), 'undead', 'Undead');

-- Age of Empires IV
INSERT INTO factions (game_id, slug, name) VALUES
  ((SELECT id FROM games WHERE slug = 'aoe4'), 'english', 'English'),
  ((SELECT id FROM games WHERE slug = 'aoe4'), 'french', 'French'),
  ((SELECT id FROM games WHERE slug = 'aoe4'), 'holy-roman-empire', 'Holy Roman Empire'),
  ((SELECT id FROM games WHERE slug = 'aoe4'), 'rus', 'Rus'),
  ((SELECT id FROM games WHERE slug = 'aoe4'), 'mongols', 'Mongols'),
  ((SELECT id FROM games WHERE slug = 'aoe4'), 'chinese', 'Chinese'),
  ((SELECT id FROM games WHERE slug = 'aoe4'), 'abbasid-dynasty', 'Abbasid Dynasty'),
  ((SELECT id FROM games WHERE slug = 'aoe4'), 'delhi-sultanate', 'Delhi Sultanate');

-- Resources
-- StarCraft II
INSERT INTO resources (game_id, slug, name) VALUES
  ((SELECT id FROM games WHERE slug = 'sc2'), 'minerals', 'Minerals'),
  ((SELECT id FROM games WHERE slug = 'sc2'), 'vespene', 'Vespene Gas'),
  ((SELECT id FROM games WHERE slug = 'sc2'), 'supply', 'Supply');

-- Age of Empires IV
INSERT INTO resources (game_id, slug, name) VALUES
  ((SELECT id FROM games WHERE slug = 'aoe4'), 'food', 'Food'),
  ((SELECT id FROM games WHERE slug = 'aoe4'), 'wood', 'Wood'),
  ((SELECT id FROM games WHERE slug = 'aoe4'), 'gold', 'Gold'),
  ((SELECT id FROM games WHERE slug = 'aoe4'), 'stone', 'Stone'),
  ((SELECT id FROM games WHERE slug = 'aoe4'), 'population', 'Population');

-- Warcraft III
INSERT INTO resources (game_id, slug, name) VALUES
  ((SELECT id FROM games WHERE slug = 'wc3'), 'gold', 'Gold'),
  ((SELECT id FROM games WHERE slug = 'wc3'), 'lumber', 'Lumber'),
  ((SELECT id FROM games WHERE slug = 'wc3'), 'food', 'Food');

-- Stormgate
INSERT INTO resources (game_id, slug, name) VALUES
  ((SELECT id FROM games WHERE slug = 'stormgate'), 'luminite', 'Luminite'),
  ((SELECT id FROM games WHERE slug = 'stormgate'), 'therium', 'Therium'),
  ((SELECT id FROM games WHERE slug = 'stormgate'), 'supply', 'Supply');

-- Tags
-- Global tags
INSERT INTO tags (slug, name, color_variant) VALUES
  ('rush', 'Rush', 'destructive'),
  ('macro', 'Macro', 'secondary'),
  ('timing-attack', 'Timing Attack', 'default'),
  ('cheese', 'Cheese', 'destructive'),
  ('all-in', 'All-In', 'destructive'),
  ('late-game', 'Late Game', 'secondary'),
  ('proxy', 'Proxy', 'destructive'),
  ('economic', 'Economic', 'secondary');

-- AoE4-specific
INSERT INTO tags (game_id, slug, name, color_variant) VALUES
  ((SELECT id FROM games WHERE slug = 'aoe4'), 'fast-castle', 'Fast Castle', 'default'),
  ((SELECT id FROM games WHERE slug = 'aoe4'), 'feudal-aggro', 'Feudal Aggression', 'destructive');
