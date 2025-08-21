import { relations } from 'drizzle-orm';
import {
  index,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import { timestamps } from '../shared';
import { buildOrderSteps } from './build-order-steps';
import { buildOrdersToOpponentFactions } from './build-orders-to-opponent-factions';
import { buildOrdersToTags } from './build-orders-to-tags';
import { factions } from './factions';
import { favorites } from './favorites';
import { games } from './games';

export const buildOrders = pgTable(
  'build_orders',
  {
    id: serial('id').primaryKey(),
    uuid: text('uuid').notNull().unique(),
    userId: text('user_id').notNull(),
    gameId: integer('game_id')
      .notNull()
      .references(() => games.id, { onDelete: 'cascade' }),
    factionId: integer('faction_id')
      .notNull()
      .references(() => factions.id, { onDelete: 'cascade' }),
    name: text('name').notNull(),
    description: text('description').notNull(),
    videoUrl: text('video_url'),
    patchVersion: text('patch_version'),
    visibility: text('visibility').notNull().default('public'),
    status: text('status').notNull().default('active'),
    favoritesCount: integer('favorites_count').notNull().default(0),
    deletedAt: timestamp('deleted_at'),
    ...timestamps,
  },
  (t) => [
    index('build_orders_game_idx').on(t.gameId),
    index('build_orders_faction_idx').on(t.factionId),
    index('build_orders_user_idx').on(t.userId),
    index('build_orders_game_faction_idx').on(t.gameId, t.factionId),
  ]
);

export const buildOrdersRelations = relations(buildOrders, ({ one, many }) => ({
  game: one(games, {
    fields: [buildOrders.gameId],
    references: [games.id],
  }),
  faction: one(factions, {
    fields: [buildOrders.factionId],
    references: [factions.id],
  }),
  steps: many(buildOrderSteps),
  opponentFactions: many(buildOrdersToOpponentFactions),
  tags: many(buildOrdersToTags),
  favorites: many(favorites),
}));
