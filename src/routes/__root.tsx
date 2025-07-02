import { createRootRoute, Outlet, useNavigate } from '@tanstack/react-router';
// import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { logout, useAuth } from '../auth';
import { ChatRoomList } from '../components/ChatRoomList';
import { useChatRooms } from '../hooks/useChatRooms';

export const Route = createRootRoute({
  component: Layout,
});

function Layout() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { rooms, loading } = useChatRooms();

  const handleLogout = async () => {
    await logout();
    navigate({ to: '/login' });
  };

  if (loading) return <p className="p-4">Now Loading...</p>;

  return (
    <div className="flex h-screen w-screen">
      {/* 左：サイドバー */}
      <aside className="w-64 bg-base-200 border-r p-4 flex flex-col">
        <h1 className="text-xl font-bold mb-4">ReX</h1>
        {user && (
          <>
            <p className="text-sm text-gray-500 mb-6">👤 {user?.email}</p>
            <ChatRoomList rooms={rooms} />
            <button
              className="btn btn-sm btn-outline mt-auto"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}
      </aside>

      {/* 右：メイン表示 */}
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
    </div>
  );
}
