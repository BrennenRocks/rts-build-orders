import type { QueryClient } from '@tanstack/react-query';
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
} from '@tanstack/react-router';
import Header from '@/components/header';
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
    ],
  }),
});

function RootComponent() {
  // const isFetching = useRouterState({
  //   select: (s) => s.isLoading,
  // });

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
          <Outlet />
          {/* <Footer /> */}
        </div>
        <Toaster richColors />
      </ThemeProvider>
      {/* {import.meta.env.DEV && <TanStackRouterDevtools position="bottom-left" />}
      {import.meta.env.DEV && (
        <ReactQueryDevtools buttonPosition="bottom-right" position="bottom" />
      )} */}
    </>
  );
}
