import { createFileRoute } from '@tanstack/react-router';
import { LoginForm } from '../components/LoginForm';

export const Route = createFileRoute('/login')({
  component: LoginPage,
});

function LoginPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-sm w-full bg-white shadow-md rounded p-6">
        <h1 className="text-xl font-bold mb-4">ログイン</h1>
        <LoginForm />
      </div>
    </div>
  );
}
