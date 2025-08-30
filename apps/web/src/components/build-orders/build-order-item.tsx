import type { inferRouterOutputs } from '@trpc/server';
import { cva, type VariantProps } from 'class-variance-authority';
import { Swords } from 'lucide-react';
import type { AppRouter } from '../../../../server/src/routers';
import { Card } from '../ui/card';

const buildOrderItemVariants = cva(
  'relative overflow-hidden rounded-xl border-2 shadow-[0_0_6px_1px_rgba(0,0,0,0.3)] transition-all hover:scale-[1.01]',
  {
    variants: {
      faction: {
        // Stormgate factions
        celestial:
          'border-stormgate-celestial/20 bg-stormgate-celestial shadow-[0_4px_20px_rgba(128,32,196,0.4)]',
        infernals:
          'border-stormgate-infernal/20 bg-stormgate-infernal shadow-[0_4px_20px_rgba(143,47,30,0.4)]',
        vanguard:
          'border-stormgate-vanguard/20 bg-stormgate-vanguard shadow-[0_4px_20px_rgba(89,89,176,0.4)]',
        // AoE4 factions
        rus: 'border-aoe4-rus/20 bg-aoe4-rus shadow-[0_0_6px_1px_rgba(0,0,0,0.3)]',
        'holy-roman-empire':
          'border-aoe4-holy-roman-empire/20 bg-aoe4-holy-roman-empire shadow-[0_4px_20px_rgba(208,172,35,0.4)]',
        chinese:
          'border-aoe4-chinese/20 bg-aoe4-chinese shadow-[0_4px_20px_rgba(139,42,33,0.4)]',
        english:
          'border-aoe4-english/20 bg-aoe4-english shadow-[0_4px_20px_rgba(227,227,227,0.4)]',
        'delhi-sultanate':
          'border-aoe4-delhi-sultanate/20 bg-aoe4-delhi-sultanate shadow-[0_4px_20px_rgba(74,148,82,0.4)]',
        french:
          'border-aoe4-french/20 bg-aoe4-french shadow-[0_0_6px_1px_rgba(0,0,0,0.3)]',
        mongols:
          'border-aoe4-mongols/20 bg-aoe4-mongols shadow-[0_4px_20px_rgba(97,97,154,0.4)]',
        'abbasid-dynasty':
          'border-aoe4-abbasid-dynasty/20 bg-aoe4-abbasid-dynasty shadow-[0_4px_20px_rgba(84,84,84,0.4)]',
        orc: 'border-wc3-orc/20 bg-wc3-orc/15 shadow-wc3-orc',
        // Default fallback
        default:
          'border-gray-200 bg-gray-200 shadow-[0_4px_20px_rgba(156,163,175,0.4)]',
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
  console.log({ faction: buildOrder.faction.slug });
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
    <Card className={buildOrderItemVariants({ faction: factionVariant })}>
      {/* Header with faction images and swords icon */}
      <div className="flex items-center justify-center gap-3 p-4">
        {/* Player faction */}
        <div className="flex size-32 items-center justify-center rounded-lg bg-black/20">
          <img
            alt={buildOrder.faction.name}
            className="size-32 rounded-lg object-cover"
            src={`https://images.rtsbuildorders.com/${buildOrder.game.slug}/${buildOrder.faction.slug}.webp`}
          />
        </div>

        {/* Swords icon */}
        <Swords className="size-6 text-white" />

        {/* Opponent faction */}
        <div className="flex size-32 items-center justify-center rounded-lg bg-black/20">
          {opponentFaction ? (
            <img
              alt={opponentFaction.name}
              className="size-32 rounded-lg object-cover"
              src={`https://images.rtsbuildorders.com/${buildOrder.game.slug}/${opponentFaction.slug}.webp`}
            />
          ) : (
            <span className="font-bold text-2xl text-white">?</span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3 p-4">
        {/* Title */}
        <h2 className="font-bold text-lg text-white leading-tight">
          {buildOrder.name}
        </h2>

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
      </div>
    </Card>
  );
}
