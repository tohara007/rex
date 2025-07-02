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
    <div className="flex flex-col gap-4 w-full px-2 py-4">
      {messages.map((msg) => {
        const isOwnMessage = user?.uid === msg.uid;
        return (
          <div
            key={msg.id}
            className={`chat ${isOwnMessage ? 'chat-end' : 'chat-start'} relative group`}
          >
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="User avatar"
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
            <div
              className={`chat-bubble max-w-md ${
                isOwnMessage
                  ? 'bg-blue-500 text-white self-end'
                  : 'bg-base-300 text-black self-start'
              }`}
            >
              {msg.text}
            </div>
            {/* 削除ボタン：hover時だけ表示 */}
            {isOwnMessage && (
              <button
                className="btn btn-xs btn-ghost absolute top-0 right-0 p-1 text-xs opacity-0 group-hover:opacity-100 transition"
                onClick={() => onRequestDelete(msg.id)}
              >
                🗑️
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};
