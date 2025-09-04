import { useSuspenseQuery } from '@tanstack/react-query';
import { useSearch } from '@tanstack/react-router';
import {
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Swords,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination';
import { Skeleton } from '@/components/ui/skeleton';
import { usePagination } from '@/hooks/use-pagination';
import { DEFAULT_LIMIT } from '@/routes/build-orders/route';
import { trpc } from '@/utils/trpc';
import BuildOrderItem from './build-order-item';

// Skeleton component for individual build order items
function BuildOrderItemSkeleton() {
  return (
    <Card className="gap-y-2 border-2 border-gray-200/20 bg-gray-200/15 p-3 shadow-[0_0_6px_1px_rgba(0,0,0,0.3)]">
      {/* Title with faction images */}
      <div className="flex items-center gap-2">
        {/* Player faction skeleton */}
        <Skeleton className="size-7 rounded" />

        {/* Swords icon */}
        <Swords className="size-3 text-white" />

        {/* Opponent faction skeleton */}
        <Skeleton className="size-7 rounded" />

        {/* Title skeleton */}
        <Skeleton className="ml-2 h-6 w-32" />
      </div>

      {/* Description skeleton */}
      <div className="space-y-1">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>

      {/* Tags skeleton */}
      <div className="flex gap-2">
        <Skeleton className="h-5 w-16 rounded-md" />
        <Skeleton className="h-5 w-20 rounded-md" />
        <Skeleton className="h-5 w-12 rounded-md" />
      </div>

      {/* Updated date skeleton */}
      <Skeleton className="h-3 w-24" />
    </Card>
  );
}

// Loading component for BuildOrderList
function Loading() {
  return (
    <div className="container mx-auto">
      {/* Grid of skeleton items */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: Skeleton list is static
          <BuildOrderItemSkeleton key={index} />
        ))}
      </div>

      {/* Pagination skeleton */}
      <div className="mt-8 flex items-center justify-center gap-4">
        {/* Page information skeleton */}
        <Skeleton className="h-4 w-20" />

        {/* Pagination controls skeleton */}
        <div className="flex items-center gap-1">
          <Skeleton className="h-9 w-9 rounded-md" />
          <Skeleton className="h-9 w-6 rounded-md" />
          <Skeleton className="h-9 w-9 rounded-md" />
          <Skeleton className="h-9 w-9 rounded-md" />
          <Skeleton className="h-9 w-9 rounded-md" />
          <Skeleton className="h-9 w-6 rounded-md" />
          <Skeleton className="h-9 w-9 rounded-md" />
        </div>
      </div>
    </div>
  );
}

export default function BuildOrderList() {
  const {
    limit = DEFAULT_LIMIT,
    offset = 0,
    opponentFactionSlugs,
    tagSlugs,
    factionSlug,
  } = useSearch({ from: '/build-orders' });

  const { data: buildOrdersData } = useSuspenseQuery(
    trpc.buildOrders.getMany.queryOptions({
      limit,
      offset,
      opponentFactionSlugs,
      tagSlugs,
      factionSlug,
    })
  );

  // Calculate current page and total pages
  const currentPage = Math.floor(offset / limit) + 1;
  const totalPages = Math.ceil(buildOrdersData.pagination.total / limit);

  const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
    currentPage,
    totalPages,
    paginationItemsToDisplay: 5,
  });

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {buildOrdersData.data.map((buildOrder) => (
          <BuildOrderItem buildOrder={buildOrder} key={buildOrder.id} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-4">
          {/* Page information */}
          <div className="text-muted-foreground text-sm">
            Page {currentPage} of {totalPages}
          </div>

          {/* Pagination controls */}
          <Pagination className="mx-0 w-fit">
            <PaginationContent>
              {/* First page button */}
              <PaginationItem>
                <PaginationLink
                  aria-disabled={currentPage === 1}
                  aria-label="Go to first page"
                  className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
                  isDisabled={currentPage === 1}
                  search={(prev) => ({
                    ...prev,
                    offset: 0,
                  })}
                  to="/build-orders"
                >
                  <ChevronFirstIcon aria-hidden="true" size={16} />
                </PaginationLink>
              </PaginationItem>

              {/* Previous page button */}
              <PaginationItem>
                <PaginationLink
                  aria-disabled={currentPage === 1}
                  aria-label="Go to previous page"
                  className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
                  isDisabled={currentPage === 1}
                  search={(prev) => ({
                    ...prev,
                    offset: (currentPage - 2) * limit,
                  })}
                  to="/build-orders"
                >
                  <ChevronLeftIcon aria-hidden="true" size={16} />
                </PaginationLink>
              </PaginationItem>

              {/* Left ellipsis (...) */}
              {showLeftEllipsis && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              {/* Page number links */}
              {pages.map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    isActive={page === currentPage}
                    search={(prev) => ({
                      ...prev,
                      offset: (page - 1) * limit,
                    })}
                    to="/build-orders"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}

              {/* Right ellipsis (...) */}
              {showRightEllipsis && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              {/* Next page button */}
              <PaginationItem>
                <PaginationLink
                  aria-disabled={currentPage === totalPages}
                  aria-label="Go to next page"
                  className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
                  isDisabled={currentPage === totalPages}
                  search={(prev) => ({
                    ...prev,
                    offset: currentPage * limit,
                  })}
                  to="/build-orders"
                >
                  <ChevronRightIcon aria-hidden="true" size={16} />
                </PaginationLink>
              </PaginationItem>

              {/* Last page button */}
              <PaginationItem>
                <PaginationLink
                  aria-disabled={currentPage === totalPages}
                  aria-label="Go to last page"
                  className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
                  isDisabled={currentPage === totalPages}
                  search={(prev) => ({
                    ...prev,
                    offset: (totalPages - 1) * limit,
                  })}
                  to="/build-orders"
                >
                  <ChevronLastIcon aria-hidden="true" size={16} />
                </PaginationLink>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}

// Export Loading as a static property of BuildOrderList
BuildOrderList.Loading = Loading;
