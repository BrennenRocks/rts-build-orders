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
import { authClient } from '@/lib/auth-client';

export interface RouterAppContext {
  trpc: typeof trpc;
  queryClient: QueryClient;
  user: User | null;
}

export const Route = createRootRouteWithContext<RouterAppContext>()({
  beforeLoad: async () => {
    try {
      const session = await authClient.getSession();
      return { user: session.data?.user ?? null };
    } catch (e) {
      console.error('Failed to fetch user session', e);
      return { user: null };
    }
  },
  component: RootComponent,
  head: () => ({
    meta: [
      {
        title: 'Build Orders',
      },
      {
        name: 'description',
        content: 'Create, learn, and master build orders',
      },
    ],
    links: [
      {
        rel: 'icon',
        href: '/favicon.ico',
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
