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
    <div className="flex flex-col h-full w-full">
      {/* ルーム名タイトル */}
      <div className="px-4 py-2 border-b bg-base-100 text-lg font-bold">
        #{id}
      </div>

      {/* メッセージ一覧：スクロール可能 */}
      <div className="flex-1 overflow-y-auto">
        <ChatView
          messages={messages}
          onRequestDelete={handleRequestDelete}
          user={user}
        />
      </div>

      {/* チャット入力欄 */}
      <div className="border-t">
        <ChatInput onSend={postMessage} />
      </div>

      {/* 削除モーダル */}
      {selectedId && (
        <Modal
          onClose={() => setSelectedId(null)}
          onHandleConfirmDelete={handleConfirmDelete}
        />
      )}
    </div>
  );
}
