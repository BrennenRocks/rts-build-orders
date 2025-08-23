import { relations } from 'drizzle-orm';
import {
  index,
  integer,
  pgTable,
  serial,
  text,
  uniqueIndex,
} from 'drizzle-orm/pg-core';
import { createInsertSchema, createUpdateSchema } from 'drizzle-zod';
import { timestamps } from '../shared';
import { buildOrders } from './build-orders';
import { stepResources } from './step-resources';

export const buildOrderSteps = pgTable(
  'build_order_steps',
  {
    id: serial('id').primaryKey(),
    buildOrderId: integer('build_order_id')
      .notNull()
      .references(() => buildOrders.id, { onDelete: 'cascade' }),
    gameTime: integer('game_time').notNull(),
    description: text('description').notNull(),
    sortOrder: integer('sort_order').notNull(),
    ...timestamps,
  },
  (t) => [
    index('steps_build_order_idx').on(t.buildOrderId),
    index('steps_build_order_sort_idx').on(t.buildOrderId, t.sortOrder),
    uniqueIndex('steps_build_order_sort_unique').on(
      t.buildOrderId,
      t.sortOrder
    ),
  ]
);

export const buildOrderStepsRelations = relations(
  buildOrderSteps,
  ({ one, many }) => ({
    buildOrder: one(buildOrders, {
      fields: [buildOrderSteps.buildOrderId],
      references: [buildOrders.id],
    }),
    resources: many(stepResources),
  })
);

export const insertBuildOrderStepSchema = createInsertSchema(buildOrderSteps);
export const updateBuildOrderStepSchema = createUpdateSchema(buildOrderSteps);
