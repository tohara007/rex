import { useEffect, useState } from 'react';
import { db } from '../firebase';
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
  Timestamp,
} from 'firebase/firestore';

export type UserProfile = {
  id: string;
  displayName: string;
  bio: string;
  iconURL: string;
  isFirstLogin: boolean;
  role: 'admin' | 'user' | 'guest';
  createdAt: Timestamp;
  updatedAt: Timestamp;
  lastLoginAt: Timestamp;
  status: 'active' | 'inactive';
};

// 全ユーザー取得
export const useGetUsers = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const snapshot = await getDocs(collection(db, 'users'));
      const fetchedUsers = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as UserProfile[];
      setUsers(fetchedUsers);
      setLoading(false);
    };

    fetchUsers();
  }, []);

  return { users, loading, setUsers };
};

// 個別ユーザー取得
export const useGetUser = (uid: string | undefined) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uid) return;

    const fetchUser = async () => {
      const docRef = doc(db, 'users', uid);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        const data = snap.data();
        setUser({ ...data, id: docRef.id } as UserProfile);
      }
      setLoading(false);
    };

    fetchUser();
  }, [uid]);

  return { user, loading };
};

// 個別ユーザー更新
export const useUpdateUser = (uid: string | undefined) => {
  const updateUser = async (data: Partial<UserProfile>) => {
    if (!uid) return;
    const docRef = doc(db, 'users', uid);
    await updateDoc(docRef, {
      ...data,
      updatedAt: new Date(),
    });
  };

  return { updateUser };
};

// 個別ユーザー削除（一覧更新も同時に）
export const useDeleteUser = (
  setUsers: React.Dispatch<React.SetStateAction<UserProfile[]>>
) => {
  const deleteUser = async (uid: string) => {
    await deleteDoc(doc(db, 'users', uid));
    setUsers((prev) => prev.filter((u) => u.id !== uid));
  };

  return { deleteUser };
};
