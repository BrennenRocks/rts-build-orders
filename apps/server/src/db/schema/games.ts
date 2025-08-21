import { relations } from 'drizzle-orm';
import { index, pgTable, serial, text } from 'drizzle-orm/pg-core';
import { timestamps } from '../shared';
import { buildOrders } from './build-orders';
import { factions } from './factions';
import { resources } from './resources';
import { tags } from './tags';

export const games = pgTable(
  'games',
  {
    id: serial('id').primaryKey(),
    slug: text('slug').notNull().unique(),
    name: text('name').notNull(),
    ...timestamps,
  },
  (t) => [
    index('games_slug_idx').on(t.slug),
    index('games_name_idx').on(t.name),
  ]
);

export const gamesRelations = relations(games, ({ many }) => ({
  factions: many(factions),
  resources: many(resources),
  tags: many(tags),
  buildOrders: many(buildOrders),
}));
