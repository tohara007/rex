import { useState } from 'react';
import { createFileRoute, useParams } from '@tanstack/react-router';
import {
  useGetChatMessages,
  usePostChatMessage,
  useDeleteChatMessage,
} from '../../hooks/useChatMessages';
import { ChatView } from '../../components/ChatView';
import { ChatInput } from '../../components/ChatInput';
import { Modal } from '../../components/Modal';
import { useAuth } from '../../auth';

export const Route = createFileRoute('/rooms/$id')({
  component: ChatRoomPage,
});

function ChatRoomPage() {
  const { user } = useAuth();
  const { id } = useParams({ strict: false }); // id = roomId
  const messages = useGetChatMessages(id);
  const { postMessage } = usePostChatMessage(id, user);
  const { deleteMessage } = useDeleteChatMessage(id);

  /* 削除対象メッセージID管理 */
  const [selectedId, setSelectedId] = useState<string | null>(null);

  /* 削除リクエスト（モーダルオープン） */
  const handleRequestDelete = (id: string) => {
    setSelectedId(id);
  };

  /* 削除確認＆削除実行 */
  const handleConfirmDelete = () => {
    if (selectedId) {
      deleteMessage(selectedId);
      setSelectedId(null);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold p-4">{id}</h2>
      <ChatView
        messages={messages}
        onRequestDelete={handleRequestDelete}
        user={user}
      />
      <ChatInput onSend={postMessage} />
      {selectedId && (
        <Modal
          onClose={() => setSelectedId(null)}
          onHandleConfirmDelete={handleConfirmDelete}
        />
      )}
    </div>
  );
}
