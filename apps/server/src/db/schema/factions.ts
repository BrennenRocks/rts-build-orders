import { relations } from 'drizzle-orm';
import {
  index,
  integer,
  pgTable,
  serial,
  text,
  uniqueIndex,
} from 'drizzle-orm/pg-core';
import { timestamps } from '../shared';
import { buildOrders } from './build-orders';
import { buildOrdersToOpponentFactions } from './build-orders-to-opponent-factions';
import { games } from './games';

export const factions = pgTable(
  'factions',
  {
    id: serial('id').primaryKey(),
    gameId: integer('game_id')
      .notNull()
      .references(() => games.id, { onDelete: 'cascade' }),
    slug: text('slug').notNull(),
    name: text('name').notNull(),
    ...timestamps,
  },
  (t) => [
    index('factions_game_idx').on(t.gameId),
    index('factions_slug_idx').on(t.slug),
    index('factions_name_idx').on(t.name),
    uniqueIndex('factions_game_slug_unique').on(t.gameId, t.slug),
  ]
);

export const factionsRelations = relations(factions, ({ one, many }) => ({
  game: one(games, {
    fields: [factions.gameId],
    references: [games.id],
  }),
  buildOrders: many(buildOrders),
  opponentBuildOrders: many(buildOrdersToOpponentFactions),
}));
