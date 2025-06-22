import { createFileRoute } from '@tanstack/react-router';
import { useAuth } from '../auth';

export const Route = createFileRoute('/chat')({
  component: ChatPage,
});

function ChatPage() {
  const { user } = useAuth();

  return (
    <div>
      <p>チャットページへようこそ、{user}さん！</p>;
    </div>
  );
}
