import { relations } from 'drizzle-orm';
import { index, integer, pgTable, serial } from 'drizzle-orm/pg-core';
import { createInsertSchema, createUpdateSchema } from 'drizzle-zod';
import { timestamps } from '../shared';
import { buildOrderSteps } from './build-order-steps';
import { resources } from './resources';

export const stepResources = pgTable(
  'step_resources',
  {
    id: serial('id').primaryKey(),
    stepId: integer('step_id')
      .notNull()
      .references(() => buildOrderSteps.id, { onDelete: 'cascade' }),
    resourceId: integer('resource_id')
      .notNull()
      .references(() => resources.id, { onDelete: 'cascade' }),
    amount: integer('amount').notNull(),
    ...timestamps,
  },
  (t) => [
    index('step_resources_step_idx').on(t.stepId),
    index('step_resources_resource_idx').on(t.resourceId),
  ]
);

export const stepResourcesRelations = relations(stepResources, ({ one }) => ({
  step: one(buildOrderSteps, {
    fields: [stepResources.stepId],
    references: [buildOrderSteps.id],
  }),
  resource: one(resources, {
    fields: [stepResources.resourceId],
    references: [resources.id],
  }),
}));

export const insertStepResourceSchema = createInsertSchema(stepResources);
export const updateStepResourceSchema = createUpdateSchema(stepResources);
