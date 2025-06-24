import { createFileRoute, redirect } from '@tanstack/react-router';
import { useAuth } from '../auth';
import { Rooms } from '../components/Rooms';

export const Route = createFileRoute('/')({
  beforeLoad: ({ context }) => {
    if (!context.auth.user) {
      throw redirect({ to: '/login' });
    }
  },
  component: RoomsPage,
});

function RoomsPage() {
  const { user } = useAuth();

  return (
    <div>
      <h2 className="text-xl mb-4">ようこそ、{user?.email} さん</h2>
      <Rooms />
    </div>
  );
}
