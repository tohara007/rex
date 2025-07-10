import { createFileRoute } from '@tanstack/react-router';
import { useAuth } from '../../auth';
import { useGetUser, useUpdateUser } from '../../hooks/useUsers';
import { SetUser } from '../../components/SetUser';

export const Route = createFileRoute('/setting/$uid')({
  component: SettingsPage,
});

function SettingsPage() {
  const { uid } = Route.useParams();
  const { user } = useAuth();

  const { user: userProfile, loading } = useGetUser(uid);
  const { updateUser } = useUpdateUser(uid);

  if (user?.uid !== uid) return <div>権限がありません</div>;
  if (loading || !userProfile) return <div>Loading...</div>;

  return <SetUser user={userProfile} onUpdate={updateUser} />;
}
