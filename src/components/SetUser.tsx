import { useState, useEffect, type FormEvent } from 'react';
import type { UserProfile } from '../hooks/useUsers'; // ユーザー型定義

type Props = {
  user: UserProfile | null;
  onUpdate: (updated: Partial<UserProfile>) => Promise<void>;
};

export const SetUser = ({ user, onUpdate }: Props) => {
  const [form, setForm] = useState({
    displayName: '',
    bio: '',
    iconURL: '',
  });

  useEffect(() => {
    if (user) {
      setForm({
        displayName: user.displayName || '',
        bio: user.bio || '',
        iconURL: user.iconURL || '',
      });
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await onUpdate(form);
    alert('更新しました');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <div>
        <label className="label">表示名</label>
        <input
          type="text"
          name="displayName"
          value={form.displayName}
          onChange={handleChange}
          className="input w-full"
        />
      </div>
      <div>
        <label className="label">紹介文</label>
        <textarea
          name="bio"
          value={form.bio}
          onChange={handleChange}
          className="textarea w-full"
        />
      </div>
      <div>
        <label className="label">アイコン画像URL</label>
        <input
          type="text"
          name="iconURL"
          value={form.iconURL}
          onChange={handleChange}
          className="input w-full"
        />
      </div>
      <button type="submit" className="btn btn-primary w-full">
        更新
      </button>
    </form>
  );
};
