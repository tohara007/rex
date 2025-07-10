import { createFileRoute } from '@tanstack/react-router';
import { ChangePassword } from '../components/ChangePassword';
import { useAuth } from '../auth';
import { updatePassword } from 'firebase/auth';

export const Route = createFileRoute('/change-password')({
  component: ChangePasswordPage,
});

function ChangePasswordPage() {
  const { user } = useAuth();

  const handleChangePassword = async (newPassword: string) => {
    if (!user) {
      alert('ログインしていません');
      return;
    }

    try {
      await updatePassword(user, newPassword);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      alert('パスワード変更に失敗しました');
    }
  };

  return <ChangePassword onChangePassword={handleChangePassword} />;
}
