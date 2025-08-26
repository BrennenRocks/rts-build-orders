import { createFileRoute } from '@tanstack/react-router';
import { Suspense } from 'react';
import z from 'zod';
import BuildOrderList from '@/components/build-orders/build-order-list';

const DEFAULT_LIMIT = 20;
export const Route = createFileRoute('/build-orders')({
  validateSearch: z.object({
    limit: z.number().default(DEFAULT_LIMIT),
    offset: z.number().default(0),
    factionSlug: z.string().optional(),
    opponentFactionSlugs: z.array(z.string()).optional().default([]),
    tagSlugs: z.array(z.string()).optional().default([]),
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Suspense fallback={<div>Build Orders Loading...</div>}>
      <BuildOrderList />
    </Suspense>
  );
}
