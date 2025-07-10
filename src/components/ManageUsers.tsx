import { type FC } from 'react';
import { type UserProfile } from '../hooks/useUsers';

type Props = {
  users: UserProfile[];
  onDelete: (uid: string) => void;
};

export const ManageUsers: FC<Props> = ({ users, onDelete }) => {
  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">ユーザー管理</h1>
      <ul className="space-y-4">
        {users.map((user) => (
          <li
            key={user.id}
            className="flex items-center justify-between p-4 border rounded-lg shadow"
          >
            <div className="flex items-center space-x-4">
              {/* <img
                src={user.iconURL}
                alt={user.displayName}
                className="w-12 h-12 rounded-full object-cover"
              /> */}
              <div>
                <p className="font-semibold">{user.displayName}</p>
                <p className="text-sm text-gray-600">{user.bio}</p>
                <p className="text-xs text-gray-400">ロール: {user.role}</p>
              </div>
            </div>
            {user.role !== 'admin' && (
              <button
                onClick={() => onDelete(user.id)}
                className="btn btn-error btn-sm"
              >
                削除
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
