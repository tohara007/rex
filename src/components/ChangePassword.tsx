import { useState, type FormEvent } from 'react';

type Props = {
  onChangePassword: (newPassword: string) => Promise<void>;
};

export const ChangePassword = ({ onChangePassword }: Props) => {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      alert('パスワードが一致しません');
      return;
    }

    await onChangePassword(password);
    alert('パスワードを変更しました');
    setPassword('');
    setConfirm('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4 max-w-md mx-auto">
      <div>
        <label className="label">新しいパスワード</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input input-bordered w-full"
        />
      </div>
      <div>
        <label className="label">確認用</label>
        <input
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="input input-bordered w-full"
        />
      </div>
      <button type="submit" className="btn btn-primary w-full">
        変更する
      </button>
    </form>
  );
};
