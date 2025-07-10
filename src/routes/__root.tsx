import {
  createRootRoute,
  Link,
  Outlet,
  useNavigate,
} from '@tanstack/react-router';
// import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { logout, useAuth } from '../auth';
import { ChatRoomList } from '../components/ChatRoomList';
import { useChatRooms } from '../hooks/useChatRooms';
import { useGetUser } from '../hooks/useUsers';

export const Route = createRootRoute({
  component: Layout,
});

function Layout() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { rooms, loading } = useChatRooms();
  const { user: userProfile } = useGetUser(user?.uid ?? '');

  const handleLogout = async () => {
    await logout();
    navigate({ to: '/login' });
  };

  if (loading) return <p className="p-4">Now Loading...</p>;

  return (
    <div className="flex h-screen w-screen">
      {/* 左：サイドバー */}
      <aside className="w-64 bg-base-200 border-r p-4 flex flex-col">
        <h1 className="text-2xl font-bold mb-4">ReX</h1>
        {user && (
          <>
            <Link
              to="/setting/$uid"
              params={{ uid: user.uid }}
              className="btn btn-outline mb-4"
            >
              <p className="text-md text-gray-500">
                👤 {userProfile?.displayName}
              </p>
            </Link>
            {userProfile?.role === 'admin' && (
              <Link to="/manage" className="btn btn-sm btn-outline mb-4">
                ユーザー管理
              </Link>
            )}
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
