import { newsletterRouter } from '@/modules/newsletter.router';
import { publicProcedure, router } from '../lib/trpc';

export const appRouter = router({
  healthCheck: publicProcedure.query(() => {
    return 'OK';
  }),
  newsletter: newsletterRouter,
});
export type AppRouter = typeof appRouter;
