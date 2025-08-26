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

  console.log({ buildOrdersData });
  return (
    <div className="flex flex-col gap-4">
      {buildOrdersData.data.map((buildOrder) => (
        <BuildOrderItem buildOrder={buildOrder} key={buildOrder.id} />
      ))}
    </div>
  );
}
