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
import { games } from './games';
import { stepResources } from './step-resources';

export const resources = pgTable(
  'resources',
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
    index('resources_game_idx').on(t.gameId),
    index('resources_slug_idx').on(t.slug),
    index('resources_name_idx').on(t.name),
    uniqueIndex('resources_game_slug_unique').on(t.gameId, t.slug),
  ]
);

export const resourcesRelations = relations(resources, ({ one, many }) => ({
  game: one(games, {
    fields: [resources.gameId],
    references: [games.id],
  }),
  stepResources: many(stepResources),
}));
