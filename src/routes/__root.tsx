import { useEffect, useState } from 'react';
import {
  createRootRoute,
  Link,
  Outlet,
  useNavigate,
} from '@tanstack/react-router';
import { logout, useAuth } from '../auth';
import { ChatRoomList } from '../components/ChatRoomList';
import { useChatRooms } from '../hooks/useChatRooms';
import { useGetUser } from '../hooks/useUsers';
import { CreateRoomModal } from '../components/CreateChatRoomModal';

export const Route = createRootRoute({
  component: Layout,
});

function Layout() {
  const navigate = useNavigate();
  const { user, loading: userloading } = useAuth();
  const { rooms, loading: roomsLoading } = useChatRooms();
  const { user: userProfile, loading: userProfileLoading } = useGetUser(
    user?.uid ?? ''
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate({ to: '/login' });
  };

  /** ログインチェック */
  useEffect(() => {
    if (!user) {
      navigate({ to: '/login' });
    }
  }, [user]);

  if (userloading && roomsLoading && userProfileLoading)
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Now Loading...
      </div>
    );

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
              <Link to="/manage" className="btn btn-sm btn-secondary mb-4">
                🛠️ ユーザー管理
              </Link>
            )}
            {(userProfile?.role === 'admin' ||
              userProfile?.role === 'user') && (
              <button
                className="btn btn-sm btn-primary mb-4"
                onClick={() => setIsModalOpen(true)}
              >
                ＋ ルーム作成
              </button>
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

      {/* チャットルーム作成モーダル */}
      {isModalOpen && userProfile && (
        <CreateRoomModal
          user={userProfile}
          navigate={navigate}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
