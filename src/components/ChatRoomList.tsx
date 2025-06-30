type ChatRoom = {
  id: string;
  name: string;
};

export function ChatRoomList({ rooms }: { rooms: ChatRoom[] }) {
  if (rooms.length === 0)
    return <p className="p-4">参加可能なチャットルームがありません</p>;

  return (
    <ul className="menu bg-base-100 rounded-box">
      {rooms.map((room) => (
        <li key={room.id}>
          <a href={`/rooms/${room.id}`}>{room.name}</a>
        </li>
      ))}
    </ul>
  );
}
