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
import { useGetUser } from '../../hooks/useUsers';
import { useChatRoom } from '../../hooks/useChatRooms';

export const Route = createFileRoute('/rooms/$id')({
  component: ChatRoomPage,
});

function ChatRoomPage() {
  const { user } = useAuth();
  const { id } = useParams({ strict: false }); // id = roomId
  const { room, loading } = useChatRoom(id);
  const { user: userProfile } = useGetUser(user?.uid);
  const messages = useGetChatMessages(id);
  const { postMessage } = usePostChatMessage(id, user, userProfile);
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

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Now Loading...
      </div>
    );

  return (
    <div className="flex flex-col h-full w-full">
      {/* ルーム名タイトル */}
      <div className="px-4 py-2 border-b">
        <div className="text-lg font-bold">#{room.name}</div>
        <p>{room.description}</p>
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
