import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { AuthProvider, initializeAuthPersistence } from './auth';

const queryClient = new QueryClient();

const router = createRouter({
  routeTree,
});

export default function App() {
  /** 初回起動時に、ログイン情報を削除 */
  useEffect(() => {
    initializeAuthPersistence().catch((err) => {
      console.error('Auth persistence init failed:', err);
    });
  }, []);

  if (import.meta.env.VITE_MAINTENANCE_MODE === 'true') {
    return (
      <div className="flex justify-center items-center w-screen h-screen text-xl font-bold">
        現在メンテナンス中です
      </div>
    );
  }
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  );
}
