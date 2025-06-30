import { createFileRoute, redirect } from '@tanstack/react-router';
import { useAuth } from '../auth';
import { ChatRoomList } from '../components/ChatRoomList';
import { useChatRooms } from '../hooks/useChatRooms';

export const Route = createFileRoute('/')({
  beforeLoad: ({ context }) => {
    if (!context.auth.user) {
      throw redirect({ to: '/login' });
    }
  },
  component: RoomsPage,
});

function RoomsPage() {
  const { user } = useAuth();
  const { rooms, loading } = useChatRooms();

  if (loading) return <p className="p-4">読み込み中...</p>;

  return (
    <div>
      <h2 className="text-xl mb-4">Here We Go, {user?.email}!</h2>
      <ChatRoomList rooms={rooms} />
    </div>
  );
}
