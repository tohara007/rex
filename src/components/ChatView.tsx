import { Timestamp } from 'firebase/firestore';

type Props = {
  messages: {
    id: string;
    text: string;
    uid: string;
    displayName: string;
    photoURL?: string;
    createdAt: Timestamp;
  }[];
};

export const ChatView = ({ messages }: Props) => {
  return (
    <div className="p-4 space-y-4">
      {messages.map((msg) => (
        <div key={msg.id} className="chat chat-start">
          <div className="avatar">
            <div className="w-4 rounded-full">
              <img src={msg.photoURL || '/default-icon.svg'} alt="アイコン" />
            </div>
          </div>
          <div className="chat-header">
            {msg.displayName}
            <time className="text-xs opacity-50 ml-2">
              {msg.createdAt.toDate().toLocaleString()}
            </time>
          </div>
          <div className="chat-bubble">{msg.text}</div>
        </div>
      ))}
    </div>
  );
};
