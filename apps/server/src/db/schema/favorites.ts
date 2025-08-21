import { relations } from 'drizzle-orm';
import { index, integer, pgTable, primaryKey, text } from 'drizzle-orm/pg-core';
import { timestamps } from '../shared';
import { users } from './auth';
import { buildOrders } from './build-orders';

export const favorites = pgTable(
  'favorites',
  {
    userId: text('user_id').notNull(),
    buildOrderId: integer('build_order_id')
      .notNull()
      .references(() => buildOrders.id, { onDelete: 'cascade' }),
    ...timestamps,
  },
  (t) => [
    primaryKey({ columns: [t.userId, t.buildOrderId] }),
    index('favorites_user_idx').on(t.userId),
    index('favorites_build_order_idx').on(t.buildOrderId),
  ]
);

export const favoritesRelations = relations(favorites, ({ one }) => ({
  user: one(users, {
    fields: [favorites.userId],
    references: [users.id],
  }),
  buildOrder: one(buildOrders, {
    fields: [favorites.buildOrderId],
    references: [buildOrders.id],
  }),
}));
