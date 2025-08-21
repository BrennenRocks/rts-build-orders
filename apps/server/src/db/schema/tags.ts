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
import { buildOrdersToTags } from './build-orders-to-tags';
import { games } from './games';

export const badgeVariants = [
  'default',
  'secondary',
  'destructive',
  'outline',
] as const;
export type BadgeVariant = (typeof badgeVariants)[number];

export const tags = pgTable(
  'tags',
  {
    id: serial('id').primaryKey(),
    gameId: integer('game_id')
      .notNull()
      .references(() => games.id, {
        onDelete: 'cascade',
      }),
    slug: text('slug').notNull(),
    name: text('name').notNull(),
    colorVariant: text('color_variant').notNull().default('default'),
    ...timestamps,
  },
  (t) => [
    index('tags_game_idx').on(t.gameId),
    index('tags_slug_idx').on(t.slug),
    index('tags_name_idx').on(t.name),
    uniqueIndex('tags_game_slug_unique').on(t.gameId, t.slug),
  ]
);

export const tagsRelations = relations(tags, ({ one, many }) => ({
  game: one(games, {
    fields: [tags.gameId],
    references: [games.id],
  }),
  buildOrders: many(buildOrdersToTags),
}));
