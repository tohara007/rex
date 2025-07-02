import { Link, useRouterState } from '@tanstack/react-router';

type ChatRoom = {
  id: string;
  name: string;
};

export function ChatRoomList({ rooms }: { rooms: ChatRoom[] }) {
  const { location } = useRouterState();

  return (
    <ul className="menu bg-base-100 rounded-box w-full">
      {rooms.map((room) => {
        const isActive = location.pathname === `/rooms/${room.id}`;
        return (
          <li key={room.id}>
            <Link
              to={`/rooms/${room.id}`}
              className={isActive ? 'active font-bold' : ''}
            >
              #{room.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
