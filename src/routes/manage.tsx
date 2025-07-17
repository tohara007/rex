import { useEffect } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { ManageUsers } from '../components/ManageUsers';
import { useGetUsers, useDeleteUser, useGetUser } from '../hooks/useUsers';
import { useAuth } from '../auth';

export const Route = createFileRoute('/manage')({
  component: ManagePage,
});

function ManagePage() {
  const { user } = useAuth();
  const uid = user?.uid;
  const navigate = useNavigate();

  const { user: userProfile, loading: loadingUserProfile } = useGetUser(
    uid ?? ''
  );
  const {
    users: userProfiles,
    loading: loadingUserProfiles,
    setUsers,
  } = useGetUsers();
  const { deleteUser } = useDeleteUser(setUsers);

  /** 管理者ユーザチェック */
  useEffect(() => {
    if (!loadingUserProfile && userProfile?.role !== 'admin') {
      navigate({ to: '/' });
    }
  }, [loadingUserProfile, userProfile, navigate]);

  if (loadingUserProfile || loadingUserProfiles)
    return <div>Now Loading...</div>;

  if (userProfile?.role !== 'admin') return null;

  return <ManageUsers users={userProfiles} onDelete={deleteUser} />;
}
