import type { inferRouterOutputs } from '@trpc/server';
import type { AppRouter } from '../../../../server/src/routers';

type BuildOrderItemProps = {
  buildOrder: inferRouterOutputs<AppRouter>['buildOrders']['getMany']['data'][number];
};

export default function BuildOrderItem({ buildOrder }: BuildOrderItemProps) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-gray-200 p-4">
      <h2 className="font-bold text-lg">{buildOrder.name}</h2>
      <p className="text-gray-500 text-sm">{buildOrder.description}</p>
      <div className="flex flex-col gap-2">
        <h3 className="font-bold text-sm">Factions</h3>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2">
            <div className="flex flex-col gap-2">
              <div className="h-4 w-4 rounded-full bg-gray-200" />
              <div className="text-gray-500 text-sm">
                {buildOrder.faction.name}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
