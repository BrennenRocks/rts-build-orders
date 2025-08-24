import { TRPCError } from '@trpc/server';
import { and, eq, isNull, type TablesRelationalConfig } from 'drizzle-orm';
import type { PgQueryResultHKT, PgTransaction } from 'drizzle-orm/pg-core';
import { z } from 'zod';
import { db } from '@/db';
import {
  buildOrderSteps,
  buildOrders,
  buildOrdersToOpponentFactions,
  buildOrdersToTags,
  factions,
  stepResources,
} from '@/db/schema';
import {
  insertBuildOrderStepSchema,
  updateBuildOrderStepSchema,
} from '@/db/schema/build-order-steps';
import {
  updateBuildOrderSchema as baseBuildOrderUpdateSchema,
  insertBuildOrderSchema,
} from '@/db/schema/build-orders';
import { insertStepResourceSchema } from '@/db/schema/step-resources';

// Extended schema for creating a complete build order with steps, tags, etc.
export const createBuildOrderSchema = insertBuildOrderSchema.extend({
  steps: z
    .array(
      insertBuildOrderStepSchema.omit({ buildOrderId: true }).extend({
        resources: z
          .array(insertStepResourceSchema.omit({ stepId: true }))
          .optional(),
      })
    )
    .optional(),
  tagIds: z.array(z.number()).optional(),
  opponentFactionIds: z.array(z.number()).optional(),
});

// Extended schema for updating a complete build order
export const updateBuildOrderSchema = baseBuildOrderUpdateSchema.extend({
  steps: z
    .array(
      updateBuildOrderStepSchema.extend({
        resources: z
          .array(insertStepResourceSchema.omit({ stepId: true }))
          .optional(),
      })
    )
    .optional(),
  tagIds: z.array(z.number()).optional(),
  opponentFactionIds: z.array(z.number()).optional(),
});

export type CreateBuildOrderInput = z.infer<typeof createBuildOrderSchema>;
export type UpdateBuildOrderInput = z.infer<typeof updateBuildOrderSchema> & {
  id: number;
};

// Constants for pagination limits
const MIN_LIMIT = 1;
const MAX_LIMIT = 100;
const DEFAULT_LIMIT = 20;
const DEFAULT_OFFSET = 0;

// Schema for paginated build orders query
export const getBuildOrdersSchema = z.object({
  limit: z.number().min(MIN_LIMIT).max(MAX_LIMIT).default(DEFAULT_LIMIT),
  offset: z.number().min(DEFAULT_OFFSET).default(DEFAULT_OFFSET),
  factionSlug: z.string().optional(),
  opponentFactionSlugs: z.array(z.string()).optional(),
  tagSlugs: z.array(z.string()).optional(),
});

export type GetBuildOrdersInput = z.infer<typeof getBuildOrdersSchema>;

type StepResourceInput = Omit<
  z.infer<typeof insertStepResourceSchema>,
  'stepId'
>;

type CreateStepData = Omit<
  z.infer<typeof insertBuildOrderStepSchema>,
  'buildOrderId'
> & {
  resources?: StepResourceInput[];
};

type UpdateStepData = Omit<
  z.infer<typeof updateBuildOrderStepSchema>,
  'buildOrderId'
> & {
  resources?: StepResourceInput[];
};

type DrizzleTransaction = PgTransaction<
  PgQueryResultHKT,
  Record<string, unknown>,
  TablesRelationalConfig
>;

async function createBuildOrderSteps(
  tx: DrizzleTransaction,
  buildOrderId: number,
  steps: CreateStepData[]
) {
  for (const stepData of steps) {
    const { resources, ...stepInfo } = stepData;

    const [step] = await tx
      .insert(buildOrderSteps)
      .values({
        ...stepInfo,
        buildOrderId,
      })
      .returning();

    // Create step resources if provided
    if (resources?.length) {
      await tx.insert(stepResources).values(
        resources.map((resource) => ({
          ...resource,
          stepId: step.id,
        }))
      );
    }
  }
}

async function createBuildOrderTags(
  tx: DrizzleTransaction,
  buildOrderId: number,
  tagIds: number[]
) {
  // TODO: check if tags exist
  await tx.insert(buildOrdersToTags).values(
    tagIds.map((tagId) => ({
      buildOrderId,
      tagId,
    }))
  );
}

async function createBuildOrderOpponentFactions(
  tx: DrizzleTransaction,
  buildOrderId: number,
  opponentFactionIds: number[]
) {
  // TODO: check if factions exist
  await tx.insert(buildOrdersToOpponentFactions).values(
    opponentFactionIds.map((factionId) => ({
      buildOrderId,
      factionId,
    }))
  );
}

export function createBuildOrder(input: CreateBuildOrderInput) {
  const { steps, tagIds, opponentFactionIds, ...buildOrderData } = input;

  return db.transaction(async (tx) => {
    const [buildOrder] = await tx
      .insert(buildOrders)
      .values(buildOrderData)
      .returning();

    const buildOrderId = buildOrder.id;

    await Promise.all([
      steps?.length ? createBuildOrderSteps(tx, buildOrderId, steps) : null,
      tagIds?.length ? createBuildOrderTags(tx, buildOrderId, tagIds) : null,
      opponentFactionIds?.length
        ? createBuildOrderOpponentFactions(tx, buildOrderId, opponentFactionIds)
        : null,
    ]);

    return buildOrder;
  });
}

async function updateBuildOrderSteps(
  tx: DrizzleTransaction,
  buildOrderId: number,
  steps: UpdateStepData[]
) {
  // Delete existing steps (cascade will handle step resources)
  await tx
    .delete(buildOrderSteps)
    .where(eq(buildOrderSteps.buildOrderId, buildOrderId));

  // Create new steps
  if (steps.length > 0) {
    // Convert update step data to create step data by ensuring required fields
    const createSteps: CreateStepData[] = steps.map((step) => ({
      gameTime: step.gameTime ?? 0,
      description: step.description ?? '',
      sortOrder: step.sortOrder ?? 0,
      ...step,
    }));
    await createBuildOrderSteps(tx, buildOrderId, createSteps);
  }
}

async function updateBuildOrderTags(
  tx: DrizzleTransaction,
  buildOrderId: number,
  tagIds: number[]
) {
  // Delete existing tag associations
  await tx
    .delete(buildOrdersToTags)
    .where(eq(buildOrdersToTags.buildOrderId, buildOrderId));

  // Create new tag associations
  if (tagIds.length > 0) {
    await createBuildOrderTags(tx, buildOrderId, tagIds);
  }
}

async function updateBuildOrderOpponentFactions(
  tx: DrizzleTransaction,
  buildOrderId: number,
  opponentFactionIds: number[]
) {
  // Delete existing opponent faction associations
  await tx
    .delete(buildOrdersToOpponentFactions)
    .where(eq(buildOrdersToOpponentFactions.buildOrderId, buildOrderId));

  // Create new opponent faction associations
  if (opponentFactionIds.length > 0) {
    await createBuildOrderOpponentFactions(
      tx,
      buildOrderId,
      opponentFactionIds
    );
  }
}

export async function updateBuildOrder(input: UpdateBuildOrderInput) {
  const { id, steps, tagIds, opponentFactionIds, ...buildOrderData } = input;

  // Check if build order exists
  const existingBuildOrder = await db.query.buildOrders.findFirst({
    where: eq(buildOrders.id, id),
  });

  if (!existingBuildOrder) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'Build order not found',
    });
  }

  return db.transaction(async (tx) => {
    // Update the build order
    const [updatedBuildOrder] = await tx
      .update(buildOrders)
      .set(buildOrderData)
      .where(eq(buildOrders.id, id))
      .returning();

    // Handle steps update if provided
    if (steps !== undefined) {
      await updateBuildOrderSteps(tx, id, steps);
    }

    // Handle tag associations update if provided
    if (tagIds !== undefined) {
      await updateBuildOrderTags(tx, id, tagIds);
    }

    // Handle opponent faction associations update if provided
    if (opponentFactionIds !== undefined) {
      await updateBuildOrderOpponentFactions(tx, id, opponentFactionIds);
    }

    return updatedBuildOrder;
  });
}

export async function getBuildOrderById(id: number) {
  const buildOrder = await db.query.buildOrders.findFirst({
    where: eq(buildOrders.id, id),
    with: {
      game: true,
      faction: true,
      user: true,
      steps: {
        with: {
          resources: {
            with: {
              resource: true,
            },
          },
        },
        orderBy: (steps, { asc }) => [asc(steps.sortOrder)],
      },
      tags: {
        with: {
          tag: true,
        },
      },
      opponentFactions: {
        with: {
          faction: true,
        },
      },
    },
  });

  if (!buildOrder) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'Build order not found',
    });
  }

  return buildOrder;
}

export async function getBuildOrders(input: GetBuildOrdersInput) {
  const { limit, offset, factionSlug, opponentFactionSlugs, tagSlugs } = input;

  // Build the where conditions
  const conditions = [
    isNull(buildOrders.deletedAt), // Only get non-deleted build orders
  ];

  // Handle faction slug filtering
  if (factionSlug) {
    // First get the faction ID from the slug
    const faction = await db.query.factions.findFirst({
      where: eq(factions.slug, factionSlug),
      columns: { id: true },
    });

    if (faction) {
      conditions.push(eq(buildOrders.factionId, faction.id));
    } else {
      // If faction doesn't exist, return empty results
      return {
        data: [],
        pagination: {
          total: 0,
          limit,
          offset,
          hasMore: false,
        },
      };
    }
  }

  const query = db.query.buildOrders.findMany({
    where: and(...conditions),
    with: {
      game: true,
      faction: true,
      tags: {
        with: {
          tag: true,
        },
      },
      opponentFactions: {
        with: {
          faction: true,
        },
      },
    },
    limit,
    offset,
    orderBy: (buildOrdersTable, { desc }) => [desc(buildOrdersTable.createdAt)],
  });

  let results = await query;

  // Apply client-side filtering for opponent factions and tags if needed
  if (opponentFactionSlugs?.length) {
    results = results.filter((buildOrder) =>
      buildOrder.opponentFactions.some((of) =>
        opponentFactionSlugs.includes(of.faction.slug)
      )
    );
  }

  if (tagSlugs?.length) {
    results = results.filter((buildOrder) =>
      tagSlugs.every((tagSlug) =>
        buildOrder.tags.some((t) => t.tag.slug === tagSlug)
      )
    );
  }

  // Get total count for pagination metadata
  const totalQuery = db.query.buildOrders.findMany({
    where: and(...conditions),
    columns: { id: true },
  });

  let totalResults = await totalQuery;

  // Apply the same filters to total count
  if (opponentFactionSlugs?.length) {
    const fullResults = await db.query.buildOrders.findMany({
      where: and(...conditions),
      with: {
        opponentFactions: {
          with: {
            faction: true,
          },
        },
      },
      columns: { id: true },
    });

    totalResults = fullResults.filter((buildOrder) =>
      buildOrder.opponentFactions.some((of) =>
        opponentFactionSlugs.includes(of.faction.slug)
      )
    );
  }

  if (tagSlugs?.length) {
    const fullResults = await db.query.buildOrders.findMany({
      where: and(...conditions),
      with: {
        tags: {
          with: {
            tag: true,
          },
        },
      },
      columns: { id: true },
    });

    totalResults = fullResults.filter((buildOrder) =>
      tagSlugs.every((tagSlug) =>
        buildOrder.tags.some((t) => t.tag.slug === tagSlug)
      )
    );
  }

  const total = totalResults.length;

  return {
    data: results,
    pagination: {
      total,
      limit,
      offset,
      hasMore: offset + limit < total,
    },
  };
}

export async function deleteBuildOrder(id: number) {
  const existingBuildOrder = await db.query.buildOrders.findFirst({
    where: eq(buildOrders.id, id),
  });

  if (!existingBuildOrder) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'Build order not found',
    });
  }

  // Soft delete by setting deletedAt timestamp
  const [deletedBuildOrder] = await db
    .update(buildOrders)
    .set({ deletedAt: new Date() })
    .where(eq(buildOrders.id, id))
    .returning();

  return deletedBuildOrder;
}
