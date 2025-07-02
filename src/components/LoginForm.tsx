import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { signIn } from '../auth';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await signIn(email, password);
      navigate({ to: '/' });
    } catch (err) {
      console.error('エラー発生：', err);
      alert('ログインに失敗しました');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2 p-4">
      <input
        className="input w-full"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="メールアドレス"
      />
      <input
        className="input w-full"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="パスワード"
      />
      <button className="btn btn-primary w-full" type="submit">
        ログイン
      </button>
    </form>
  );
}
