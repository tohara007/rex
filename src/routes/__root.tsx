import { createRootRoute, Outlet, useNavigate } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { logout } from '../auth';

export const Route = createRootRoute({
  component: Layout,
});

function Layout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate({ to: '/login' });
  };

  return (
    <div>
      <header className="flex justify-between items-center p-4 border-b">
        <h1 className="text-xl font-bold">ReX</h1>
        <button className="btn btn-sm btn-outline" onClick={handleLogout}>
          Logout
        </button>
      </header>
      <main className="p-4">
        <Outlet />
      </main>
      <TanStackRouterDevtools />
    </div>
  );
}
