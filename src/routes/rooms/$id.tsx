import { createFileRoute, useParams } from '@tanstack/react-router';
import {
  useGetChatMessages,
  usePostChatMessage,
} from '../../hooks/useChatMessages';
import { ChatView } from '../../components/ChatView';
import { ChatInput } from '../../components/ChatInput';
import { useAuth } from '../../auth';

export const Route = createFileRoute('/rooms/$id')({
  component: ChatRoomPage,
});

function ChatRoomPage() {
  const { user } = useAuth();
  const { id } = useParams({ strict: false }); // id = roomId
  const messages = useGetChatMessages(id);
  const { postMessage } = usePostChatMessage(id, user);

  return (
    <div>
      <h2 className="text-xl font-bold p-4">ルーム: {id}</h2>
      <ChatView messages={messages} />
      <ChatInput onSend={postMessage} />
    </div>
  );
}
