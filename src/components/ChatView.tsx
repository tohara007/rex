import { Timestamp } from 'firebase/firestore';
import type { User } from 'firebase/auth';

type Props = {
  messages: {
    id: string;
    text: string;
    uid: string;
    displayName: string;
    photoURL?: string;
    createdAt: Timestamp;
  }[];
  onRequestDelete: (id: string) => void;
  user: User | null;
};

export const ChatView = ({ messages, onRequestDelete, user }: Props) => {
  return (
    <div className="p-4 space-y-4">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`chat ${user?.uid !== msg.uid ? 'chat-start' : 'chat-end'} relative group`}
        >
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src={msg.photoURL || '/default-icon.svg'}
              />
            </div>
          </div>
          <div className="chat-header">
            {msg.displayName}
            <time className="text-xs opacity-50">
              {msg.createdAt.toDate().toLocaleString()}
            </time>
          </div>
          <div className="chat-bubble">{msg.text}</div>
          {/* 削除ボタン：hover時だけ表示 */}
          {user?.uid === msg.uid && (
            <button
              className="btn btn-xs btn-ghost absolute top-0 right-0 p-1 text-xs opacity-0 group-hover:opacity-100 transition"
              onClick={() => onRequestDelete(msg.id)}
            >
              🗑️
            </button>
          )}
        </div>
      ))}
    </div>
  );
};
