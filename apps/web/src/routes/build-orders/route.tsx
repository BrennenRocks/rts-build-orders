import { createFileRoute } from '@tanstack/react-router';
import z from 'zod';
import BuildOrderList from '@/components/build-orders/build-order-list';

export const DEFAULT_LIMIT = 12;
export const Route = createFileRoute('/build-orders')({
  validateSearch: z.object({
    limit: z.number().default(DEFAULT_LIMIT),
    offset: z.number().default(0),
    factionSlug: z.string().optional(),
    opponentFactionSlugs: z.array(z.string()).optional().default([]),
    tagSlugs: z.array(z.string()).optional().default([]),
  }),
  loaderDeps: ({
    search: { limit, offset, factionSlug, opponentFactionSlugs, tagSlugs },
  }) => ({ limit, offset, factionSlug, opponentFactionSlugs, tagSlugs }),
  loader: ({ context, deps }) => {
    return context.queryClient.ensureQueryData(
      context.trpc.buildOrders.getMany.queryOptions({
        limit: deps.limit,
        offset: deps.offset,
        factionSlug: deps.factionSlug,
        opponentFactionSlugs: deps.opponentFactionSlugs,
        tagSlugs: deps.tagSlugs,
      })
    );
  },
  pendingComponent: BuildOrderList.Loading,
  component: RouteComponent,
});

function RouteComponent() {
  return <BuildOrderList />;
}
