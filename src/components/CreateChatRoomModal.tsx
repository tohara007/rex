import { useState } from 'react';
import { createChatRoom } from '../hooks/useChatRooms';
import { type UserProfile } from '../hooks/useUsers';

type Props = {
  onClose: () => void;
  user: UserProfile;
  navigate: ReturnType<typeof import('@tanstack/react-router').useNavigate>;
};

export function CreateRoomModal({ onClose, user, navigate }: Props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const roomId = await createChatRoom({
        name,
        description,
        currentUser: user,
      });
      navigate({ to: `/rooms/${roomId}` });
      onClose();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">チャットルーム作成</h3>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <input
            className="input w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="ルーム名"
            required
          />
          <textarea
            className="textarea w-full"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="説明 (任意)"
          />
          <button className="btn btn-primary w-full" type="submit">
            作成する
          </button>
          {error && <p className="text-red-600">{error}</p>}
        </form>
        <div className="modal-action">
          <button className="btn" onClick={onClose}>
            キャンセル
          </button>
        </div>
      </div>
    </div>
  );
}
