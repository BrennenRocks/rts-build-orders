import type { inferRouterOutputs } from '@trpc/server';
import { cva, type VariantProps } from 'class-variance-authority';
import { Swords } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { AppRouter } from '../../../../server/src/routers';
import { Card } from '../ui/card';

const buildOrderItemVariants = cva(
  'relative overflow-hidden rounded-xl border-2 shadow-[0_0_6px_1px_rgba(0,0,0,0.3)]',
  {
    variants: {
      faction: {
        // Stormgate factions
        celestial:
          'border-stormgate-celestial/20 bg-stormgate-celestial/15 shadow-stormgate-celestial',
        infernals:
          'border-stormgate-infernal/20 bg-stormgate-infernal/15 shadow-stormgate-infernal',
        vanguard:
          'border-stormgate-vanguard/20 bg-stormgate-vanguard/15 shadow-stormgate-vanguard',

        // AoE4 factions
        'abbasid-dynasty':
          'border-aoe4-abbasid-dynasty/20 bg-aoe4-abbasid-dynasty/15 shadow-aoe4-abbasid-dynasty',
        ayyubids:
          'border-aoe4-ayyubids/20 bg-aoe4-ayyubids/15 shadow-aoe4-ayyubids',
        byzantines:
          'border-aoe4-byzantines/20 bg-aoe4-byzantines/15 shadow-aoe4-byzantines',
        chinese:
          'border-aoe4-chinese/20 bg-aoe4-chinese/15 shadow-aoe4-chinese',
        'delhi-sultanate':
          'border-aoe4-delhi-sultanate/20 bg-aoe4-delhi-sultanate/15 shadow-aoe4-delhi-sultanate',
        english:
          'border-aoe4-english/20 bg-aoe4-english/15 shadow-aoe4-english',
        french: 'border-aoe4-french/20 bg-aoe4-french/15 shadow-aoe4-french',
        'holy-roman-empire':
          'border-aoe4-holy-roman-empire/20 bg-aoe4-holy-roman-empire/15 shadow-aoe4-holy-roman-empire',
        'house-of-lancaster':
          'border-aoe4-house-of-lancaster/20 bg-aoe4-house-of-lancaster/15 shadow-aoe4-house-of-lancaster',
        japanese:
          'border-aoe4-japanese/20 bg-aoe4-japanese/15 shadow-aoe4-japanese',
        'jeanne-darc':
          'border-aoe4-jeanne-darc/20 bg-aoe4-jeanne-darc/15 shadow-aoe4-jeanne-darc',
        'knights-templar':
          'border-aoe4-knights-templar/20 bg-aoe4-knights-templar/15 shadow-aoe4-knights-templar',
        malian: 'border-aoe4-malian/20 bg-aoe4-malian/15 shadow-aoe4-malian',
        mongols:
          'border-aoe4-mongols/20 bg-aoe4-mongols/15 shadow-aoe4-mongols',
        'order-of-the-dragon':
          'border-aoe4-order-of-the-dragon/20 bg-aoe4-order-of-the-dragon/15 shadow-aoe4-order-of-the-dragon',
        rus: 'border-aoe4-rus/20 bg-aoe4-rus/15 shadow-aoe4-rus',
        'zhu-xis-legacy':
          'border-aoe4-zhu-xis-legacy/20 bg-aoe4-zhu-xis-legacy/15 shadow-aoe4-zhu-xis-legacy',

        // WC3 factions
        human: 'border-wc3-human/20 bg-wc3-human/15 shadow-wc3-human',
        orc: 'border-wc3-orc/20 bg-wc3-orc/15 shadow-wc3-orc',
        undead: 'border-wc3-undead/20 bg-wc3-undead/15 shadow-wc3-undead',
        'night-elf':
          'border-wc3-night-elf/20 bg-wc3-night-elf/15 shadow-wc3-night-elf',

        // SC2 factions
        zerg: 'border-sc2-zerg/20 bg-sc2-zerg/15 shadow-sc2-zerg',
        protoss: 'border-sc2-protoss/20 bg-sc2-protoss/15 shadow-sc2-protoss',
        terran: 'border-sc2-terran/20 bg-sc2-terran/15 shadow-sc2-terran',

        // Default fallback
        default: 'border-gray-200/20 bg-gray-200/15 shadow-gray-200',
      },
    },
    defaultVariants: {
      faction: 'default',
    },
  }
);

type BuildOrderItemProps = {
  buildOrder: inferRouterOutputs<AppRouter>['buildOrders']['getMany']['data'][number];
};

export default function BuildOrderItem({ buildOrder }: BuildOrderItemProps) {
  // Get tags from the actual data
  const tags = buildOrder.tags?.map((tag) => tag.tag.name) || [];

  // Format update date
  const updatedDate = new Date(buildOrder.updatedAt).toLocaleDateString(
    'en-US',
    {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }
  );

  // Get opponent faction for the image format
  const opponentFaction = buildOrder.opponentFactions?.[0]?.faction;

  // Get the faction variant, fallback to default if not found
  const factionVariant =
    (buildOrder.faction.slug as VariantProps<
      typeof buildOrderItemVariants
    >['faction']) || 'default';

  return (
    <Card
      className={cn(
        buildOrderItemVariants({ faction: factionVariant }),
        'gap-y-2 p-3'
      )}
    >
      {/* Title with faction images */}
      <div className="flex items-center gap-2">
        {/* Player faction */}
        <img
          alt={buildOrder.faction.name}
          className="size-7 rounded object-cover"
          src={`https://images.rtsbuildorders.com/${buildOrder.game.slug}/${buildOrder.faction.slug}.webp`}
        />

        {/* Swords icon */}
        <Swords className="size-3 text-white" />

        {/* Opponent faction */}
        {opponentFaction ? (
          <img
            alt={opponentFaction.name}
            className="size-7 rounded object-cover"
            src={`https://images.rtsbuildorders.com/${buildOrder.game.slug}/${opponentFaction.slug}.webp`}
          />
        ) : (
          <span className="font-bold text-sm text-white">?</span>
        )}

        {/* Title */}
        <h2 className="ml-2 font-bold text-lg text-white leading-tight">
          {buildOrder.name}
        </h2>
      </div>

      {/* Description */}
      <p className="line-clamp-2 text-sm text-white/80">
        {buildOrder.description}
      </p>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              className="rounded-md bg-black/30 px-2 py-1 font-medium text-white text-xs"
              key={tag}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Updated date */}
      <div className="text-white/70 text-xs">Updated on {updatedDate}</div>
    </Card>
  );
}
