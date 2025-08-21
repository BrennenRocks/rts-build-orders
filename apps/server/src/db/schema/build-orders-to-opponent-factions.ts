import { relations } from 'drizzle-orm';
import { index, integer, pgTable, primaryKey } from 'drizzle-orm/pg-core';
import { buildOrders } from './build-orders';
import { factions } from './factions';

export const buildOrdersToOpponentFactions = pgTable(
  'build_orders_to_opponent_factions',
  {
    buildOrderId: integer('build_order_id')
      .notNull()
      .references(() => buildOrders.id, { onDelete: 'cascade' }),
    factionId: integer('faction_id')
      .notNull()
      .references(() => factions.id, { onDelete: 'cascade' }),
  },
  (t) => [
    primaryKey({ columns: [t.buildOrderId, t.factionId] }),
    index('bo_to_opp_build_order_idx').on(t.buildOrderId),
    index('bo_to_opp_faction_idx').on(t.factionId),
  ]
);

export const buildOrdersToOpponentFactionsRelations = relations(
  buildOrdersToOpponentFactions,
  ({ one }) => ({
    buildOrder: one(buildOrders, {
      fields: [buildOrdersToOpponentFactions.buildOrderId],
      references: [buildOrders.id],
    }),
    faction: one(factions, {
      fields: [buildOrdersToOpponentFactions.factionId],
      references: [factions.id],
    }),
  })
);
