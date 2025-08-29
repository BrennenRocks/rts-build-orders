import { QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import ReactDOM from 'react-dom/client';
import { scan } from 'react-scan';
import Loader from './components/loader';
import { routeTree } from './routeTree.gen';
import { queryClient, trpc } from './utils/trpc';

scan({
  enabled: import.meta.env.DEV,
});

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  defaultPendingComponent: () => <Loader />,
  context: { trpc, queryClient, user: null },
  Wrap({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  },
});

declare module '@tanstack/react-router' {
  // biome-ignore lint/nursery/useConsistentTypeDefinitions: I want to override the interface
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById('app');

if (!rootElement) {
  throw new Error('Root element not found');
}

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<RouterProvider router={router} />);
}
