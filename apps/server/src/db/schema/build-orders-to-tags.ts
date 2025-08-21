import { relations } from 'drizzle-orm';
import { index, integer, pgTable, primaryKey } from 'drizzle-orm/pg-core';
import { buildOrders } from './build-orders';
import { tags } from './tags';

export const buildOrdersToTags = pgTable(
  'build_orders_to_tags',
  {
    buildOrderId: integer('build_order_id')
      .notNull()
      .references(() => buildOrders.id, { onDelete: 'cascade' }),
    tagId: integer('tag_id')
      .notNull()
      .references(() => tags.id, { onDelete: 'cascade' }),
  },
  (t) => [
    primaryKey({ columns: [t.buildOrderId, t.tagId] }),
    index('bo_to_tags_build_order_idx').on(t.buildOrderId),
    index('bo_to_tags_tag_idx').on(t.tagId),
  ]
);

export const buildOrdersToTagsRelations = relations(
  buildOrdersToTags,
  ({ one }) => ({
    buildOrder: one(buildOrders, {
      fields: [buildOrdersToTags.buildOrderId],
      references: [buildOrders.id],
    }),
    tag: one(tags, {
      fields: [buildOrdersToTags.tagId],
      references: [tags.id],
    }),
  })
);
