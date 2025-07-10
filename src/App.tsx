import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { AuthProvider } from './auth';

const queryClient = new QueryClient();

const router = createRouter({
  routeTree,
});

export default function App() {
  if (import.meta.env.VITE_MAINTENANCE_MODE === 'true') {
    return <div>現在メンテナンス中です</div>;
  }
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  );
}
