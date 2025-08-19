import type { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  useRouterState,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import Header from '@/components/header';
import Loader from '@/components/loader';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import type { trpc } from '@/utils/trpc';
import '../index.css';
import type { User } from 'better-auth';
// import { authClient } from '@/lib/auth-client';

export type RouterAppContext = {
  trpc: typeof trpc;
  queryClient: QueryClient;
  user: User | null;
};

export const Route = createRootRouteWithContext<RouterAppContext>()({
  beforeLoad: () => {
    // try {
    //   const session = await authClient.getSession();
    //   return { user: session.data?.user ?? null };
    // } catch (e) {
    //   console.error('Failed to fetch user session', e);
    //   return { user: null };
    // }

    // No need to fetch user session for now
    return { user: null };
  },
  component: RootComponent,
  head: () => ({
    meta: [
      {
        title: 'RTS Build Orders | Master Professional RTS Build Orders',
      },
      {
        name: 'description',
        content:
          'Master RTS games with professional build orders for StarCraft 2, Age of Empires 4, WarCraft 3, and Stormgate. Learn winning strategies used by pros to dominate your opponents.',
      },
      {
        name: 'keywords',
        content:
          'RTS build orders, StarCraft 2 builds, Age of Empires 4 builds, WarCraft 3 builds, Stormgate builds, RTS strategies, professional gaming, esports builds, real-time strategy, gaming guides',
      },
      {
        name: 'author',
        content: 'RTS Build Orders',
      },
      {
        name: 'robots',
        content: 'index, follow',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0',
      },
      {
        charset: 'utf-8',
      },
      // Open Graph tags for social media sharing
      {
        property: 'og:title',
        content: 'RTS Build Orders | Master Professional RTS Strategies',
      },
      {
        property: 'og:description',
        content:
          'Master RTS games with professional build orders for StarCraft 2, Age of Empires 4, WarCraft 3, and Stormgate. Learn winning strategies used by pros.',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:url',
        content: 'https://rtsbuildorders.com',
      },
      {
        property: 'og:image',
        content: 'https://images.rtsbuildorders.com/og-image.png',
      },
      {
        property: 'og:image:width',
        content: '1200',
      },
      {
        property: 'og:image:height',
        content: '628',
      },
      {
        property: 'og:image:alt',
        content:
          'RTS Build Orders - Professional gaming strategies for multiple RTS games',
      },
      {
        property: 'og:site_name',
        content: 'RTS Build Orders',
      },
      {
        property: 'og:locale',
        content: 'en_US',
      },
      // Twitter Card tags
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        name: 'twitter:title',
        content: 'RTS Build Orders | Master Professional RTS Strategies',
      },
      {
        name: 'twitter:description',
        content:
          'Master RTS games with professional build orders for StarCraft 2, Age of Empires 4, WarCraft 3, and Stormgate. Learn winning strategies used by pros.',
      },
      {
        name: 'twitter:image',
        content: 'https://images.rtsbuildorders.com/og-image.png',
      },
      {
        name: 'twitter:image:alt',
        content: 'RTS Build Orders - Professional gaming strategies',
      },
      // Additional SEO meta tags
      {
        name: 'application-name',
        content: 'RTS Build Orders',
      },
      {
        name: 'apple-mobile-web-app-title',
        content: 'RTS Build Orders',
      },
      {
        name: 'apple-mobile-web-app-capable',
        content: 'yes',
      },
      {
        name: 'apple-mobile-web-app-status-bar-style',
        content: 'black-translucent',
      },
    ],
    links: [
      // Canonical URL
      {
        rel: 'canonical',
        href: 'https://rtsbuildorders.com',
      },
      // Favicon and touch icons
      {
        rel: 'icon',
        href: '/favicon.ico',
        sizes: 'any',
      },
      // Preconnect to external domains for performance
      {
        rel: 'preconnect',
        href: 'https://images.rtsbuildorders.com',
      },
      {
        rel: 'dns-prefetch',
        href: 'https://images.rtsbuildorders.com',
      },
    ],
    scripts: [
      // JSON-LD structured data
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'RTS Build Orders',
          description:
            'Master RTS games with professional build orders for StarCraft 2, Age of Empires 4, WarCraft 3, and Stormgate. Learn winning strategies used by pros to dominate your opening moves.',
          url: 'https://rtsbuildorders.com',
          publisher: {
            '@type': 'Organization',
            name: 'RTS Build Orders',
            url: 'https://rtsbuildorders.com',
          },
          potentialAction: {
            '@type': 'SearchAction',
            target: 'https://rtsbuildorders.com/search?q={search_term_string}',
            'query-input': 'required name=search_term_string',
          },
          sameAs: [],
          mainEntity: {
            '@type': 'WebApplication',
            name: 'RTS Build Orders',
            applicationCategory: 'GameApplication',
            operatingSystem: 'Web Browser',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.8',
              ratingCount: '150',
            },
          },
        }),
      },
    ],
  }),
});

function RootComponent() {
  const isFetching = useRouterState({
    select: (s) => s.isLoading,
  });

  return (
    <>
      <HeadContent />
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        disableTransitionOnChange
        storageKey="rts-build-orders-ui-theme"
      >
        <div className="relative h-svh">
          <Header />
          {isFetching ? <Loader /> : <Outlet />}
          {/* <Footer /> */}
        </div>
        <Toaster richColors />
      </ThemeProvider>
      <TanStackRouterDevtools position="bottom-left" />
      <ReactQueryDevtools buttonPosition="bottom-right" position="bottom" />
    </>
  );
}
