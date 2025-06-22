import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';

import { useAuth, AuthProvider } from './auth';

const queryClient = new QueryClient();

// ← router をここで生成
const router = createRouter({
  routeTree,
  context: {
    auth: undefined!, // This will be set after we wrap the app in an AuthProvider
  },
});

function InnerApp() {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
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
