import { useState } from 'react';

type Props = {
  onSend: (message: string) => void;
};

export const ChatInput = ({ onSend }: Props) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setText('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 p-2 border-t w-full"
    >
      <input
        type="text"
        placeholder="メッセージを入力"
        className="input w-full"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit" className="btn btn-primary">
        <span className="text-xl">📤</span>
      </button>
    </form>
  );
};
