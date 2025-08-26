import type { inferRouterOutputs } from '@trpc/server';
import type { AppRouter } from '../../../../server/src/routers';

type BuildOrderItemProps = {
  buildOrder: inferRouterOutputs<AppRouter>['buildOrders']['getMany']['data'][number];
};

export default function BuildOrderItem({ buildOrder }: BuildOrderItemProps) {
  console.log(buildOrder.faction.slug);
  const isCelestial = buildOrder.faction.slug === 'celestial';
  const isInfernal = buildOrder.faction.slug === 'infernals';
  const isVanguard = buildOrder.faction.slug === 'vanguard';
  const isRus = buildOrder.faction.slug === 'rus';
  const isHolyRomanEmpire = buildOrder.faction.slug === 'holy-roman-empire';
  const isChinese = buildOrder.faction.slug === 'chinese';
  const isEnglish = buildOrder.faction.slug === 'english';
  const isDelhiSultanate = buildOrder.faction.slug === 'delhi-sultanate';
  const isFrench = buildOrder.faction.slug === 'french';
  const isMongols = buildOrder.faction.slug === 'mongols';
  const isAbbasidDynasty = buildOrder.faction.slug === 'abbasid-dynasty';

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-gray-200 p-4">
      <h2 className="font-bold text-lg">{buildOrder.name}</h2>
      <p className="text-gray-500 text-sm">{buildOrder.description}</p>
      <div className="flex flex-col gap-2">
        <h3 className="font-bold text-sm">Factions</h3>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2">
            <div className="flex flex-col gap-2">
              <div
                className={`size-4 rounded-full ${
                  isCelestial
                    ? 'bg-celestial'
                    : isInfernal
                      ? 'bg-infernal'
                      : isVanguard
                        ? 'bg-vanguard'
                        : isRus
                          ? 'bg-rus'
                          : isHolyRomanEmpire
                            ? 'bg-holy-roman-empire'
                            : isChinese
                              ? 'bg-chinese'
                              : isEnglish
                                ? 'bg-english'
                                : isDelhiSultanate
                                  ? 'bg-delhi-sultanate'
                                  : isFrench
                                    ? 'bg-french'
                                    : isMongols
                                      ? 'bg-mongols'
                                      : isAbbasidDynasty
                                        ? 'bg-abbasid-dynasty'
                                        : 'bg-gray-200'
                }`}
              />
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
