import { useSuspenseQuery } from '@tanstack/react-query';
import { useSearch } from '@tanstack/react-router';
import { trpc } from '@/utils/trpc';
import BuildOrderItem from './build-order-item';

export default function BuildOrderList() {
  const { limit, offset, opponentFactionSlugs, tagSlugs, factionSlug } =
    useSearch({ from: '/build-orders' });

  const { data: buildOrdersData } = useSuspenseQuery(
    trpc.buildOrders.getMany.queryOptions({
      limit,
      offset,
      opponentFactionSlugs,
      tagSlugs,
      factionSlug,
    })
  );

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {buildOrdersData.data.map((buildOrder) => (
          <BuildOrderItem buildOrder={buildOrder} key={buildOrder.id} />
        ))}
      </div>
    </div>
  );
}
