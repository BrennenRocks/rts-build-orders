import { buildOrdersRouter } from '@/modules/build-orders/build-orders.router';
import { newsletterRouter } from '@/modules/newsletter.router';
import { publicProcedure, router } from '../lib/trpc';

export const appRouter = router({
  healthCheck: publicProcedure.query(() => {
    return 'OK';
  }),
  newsletter: newsletterRouter,
  buildOrders: buildOrdersRouter,
});
export type AppRouter = typeof appRouter;
