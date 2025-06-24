import { Link } from '@tanstack/react-router';

export function Rooms() {
  // 仮のルーム一覧（Firestoreに置き換える前提）
  const rooms = [
    { id: 'general', name: 'General' },
    { id: 'random', name: 'Random' },
    { id: 'dev', name: '開発チャンネル' },
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">チャットルーム一覧</h2>
      <ul className="space-y-2">
        {rooms.map((room) => (
          <li key={room.id}>
            <Link
              to="/rooms/$roomId"
              params={{ roomId: room.id }}
              className="btn btn-outline w-full"
            >
              {room.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
