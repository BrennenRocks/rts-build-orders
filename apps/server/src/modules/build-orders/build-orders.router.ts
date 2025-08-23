import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { protectedProcedure, publicProcedure, router } from '@/lib/trpc';
import {
  createBuildOrder,
  createBuildOrderSchema,
  deleteBuildOrder,
  getBuildOrderById,
  updateBuildOrder,
  updateBuildOrderSchema,
} from './build-orders.service';

export const buildOrdersRouter = router({
  create: protectedProcedure
    .input(createBuildOrderSchema)
    .mutation(({ input, ctx }) => {
      if (!ctx.session?.user.id) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }

      return createBuildOrder({ ...input, userId: ctx.session.user.id });
    }),

  update: protectedProcedure
    .input(
      updateBuildOrderSchema.extend({
        id: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (!ctx.session?.user.id) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }

      // TODO: check if user is owner of build order
      return await updateBuildOrder(input);
    }),

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input }) => getBuildOrderById(input.id)),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ input, ctx }) => {
      if (!ctx.session?.user.id) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }

      // TODO: check if user is owner of build order
      return deleteBuildOrder(input.id);
    }),
});
