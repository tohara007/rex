// src/App.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { useAuth, AuthProvider } from './auth';

const queryClient = new QueryClient();

const router = createRouter({
  routeTree,
  context: undefined!,
});

function InnerApp() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="p-4">Loading auth...</div>;
  }

  return <RouterProvider router={router} context={{ auth: { user } }} />;
}

export default function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <InnerApp />
      </QueryClientProvider>
    </AuthProvider>
  );
}
