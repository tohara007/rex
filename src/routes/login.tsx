import * as React from 'react';
import { useNavigate, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/login')({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem('user', 'chat-user');
    navigate({ to: '/' });
  };

  return (
    <div>
      <h1>ログインページ</h1>
      <button onClick={handleLogin}>ログイン</button>
    </div>
  );
}
