import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useNavigate, useSearch } from '@tanstack/react-router';
import type { inferRouterOutputs } from '@trpc/server';
import {
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from 'lucide-react';
import { useTransition } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination';
import { usePagination } from '@/hooks/use-pagination';
import { trpc } from '@/utils/trpc';
import type { AppRouter } from '../../../../server/src/routers';
import BuildOrderItem from './build-order-item';

// Wrapper component that handles data fetching and loading/error states
function BuildOrderListContainer() {
  const {
    limit = 9,
    offset = 0,
    opponentFactionSlugs,
    tagSlugs,
    factionSlug,
  } = useSearch({ from: '/build-orders' });

  const {
    data: buildOrdersData,
    isFetching,
    isPending,
    error,
    isPlaceholderData,
  } = useQuery({
    ...trpc.buildOrders.getMany.queryOptions({
      limit,
      offset,
      opponentFactionSlugs,
      tagSlugs,
      factionSlug,
    }),
    placeholderData: keepPreviousData,
    staleTime: 5000,
  });

  console.log({ isFetching, isPending, isPlaceholderData });
  // Handle loading state
  if (isPending && !buildOrdersData) {
    return (
      <div className="container mx-auto">
        <div className="flex items-center justify-center py-8">
          <div className="text-muted-foreground">Loading build orders...</div>
        </div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="container mx-auto">
        <div className="flex items-center justify-center py-8">
          <div className="text-destructive">
            Error loading build orders: {error.message}
          </div>
        </div>
      </div>
    );
  }

  // Ensure we have data before rendering
  if (!buildOrdersData) {
    return (
      <div className="container mx-auto">
        <div className="flex items-center justify-center py-8">
          <div className="text-muted-foreground">No data available</div>
        </div>
      </div>
    );
  }

  return (
    <BuildOrderList
      buildOrdersData={buildOrdersData}
      factionSlug={factionSlug}
      limit={limit}
      offset={offset}
      opponentFactionSlugs={opponentFactionSlugs}
      tagSlugs={tagSlugs}
    />
  );
}

type BuildOrderListProps = {
  buildOrdersData: inferRouterOutputs<AppRouter>['buildOrders']['getMany'];
  limit: number;
  offset: number;
  opponentFactionSlugs?: string[];
  tagSlugs?: string[];
  factionSlug?: string;
};

function BuildOrderList({
  buildOrdersData,
  limit,
  offset,
  opponentFactionSlugs,
  tagSlugs,
  factionSlug,
}: BuildOrderListProps) {
  const navigate = useNavigate({ from: '/build-orders' });
  const [isTransitioning, startTransition] = useTransition();

  // Preload previous page for better performance (only if there's a previous page)
  const prevPageOffset = Math.max(0, offset - limit);
  const hasPrevPage = offset > 0;
  useQuery({
    ...trpc.buildOrders.getMany.queryOptions({
      limit,
      offset: prevPageOffset,
      opponentFactionSlugs,
      tagSlugs,
      factionSlug,
    }),
    enabled: hasPrevPage,
    staleTime: 5000,
  });

  // Preload next page for better performance (only if there's a next page)
  const nextPageOffset = offset + limit;
  const hasNextPage = nextPageOffset < buildOrdersData.pagination.total;
  useQuery({
    ...trpc.buildOrders.getMany.queryOptions({
      limit,
      offset: nextPageOffset,
      opponentFactionSlugs,
      tagSlugs,
      factionSlug,
    }),
    enabled: hasNextPage,
    staleTime: 5000,
  });

  // Calculate current page and total pages
  const currentPage = Math.floor(offset / limit) + 1;
  const totalPages = Math.ceil(buildOrdersData.pagination.total / limit);

  const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
    currentPage,
    totalPages,
    paginationItemsToDisplay: 5,
  });

  const handlePageChange = (page: number) => {
    startTransition(() => {
      const newOffset = (page - 1) * limit;
      navigate({
        search: (prev) => ({
          ...prev,
          offset: newOffset,
        }),
        replace: true,
      });
    });
  };

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                  isDisabled={currentPage === 1 || isTransitioning}
                  onClick={() => handlePageChange(1)}
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
                  isDisabled={currentPage === 1 || isTransitioning}
                  onClick={() => handlePageChange(currentPage - 1)}
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
                    onClick={() => handlePageChange(page)}
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
                  isDisabled={currentPage === totalPages || isTransitioning}
                  onClick={() => handlePageChange(currentPage + 1)}
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
                  isDisabled={currentPage === totalPages || isTransitioning}
                  onClick={() => handlePageChange(totalPages)}
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

export default BuildOrderListContainer;
