import { useEffect, useState } from 'react';
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  serverTimestamp,
  where,
  getDocs,
  addDoc,
} from 'firebase/firestore';
import { db } from '../firebase';
import { type UserProfile } from './useUsers';

type CreateChatRoomArgs = {
  name: string;
  description?: string;
  currentUser: UserProfile;
};

/** チャットルーム一覧取得 */
export function useChatRooms() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'chatRooms'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setRooms(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return { rooms, loading };
}

/** チャットルーム個別取得 */
export function useChatRoom(roomId: string | undefined) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [room, setRoom] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!roomId) return;

    const roomRef = doc(db, 'chatRooms', roomId);
    const unsubscribe = onSnapshot(roomRef, (docSnap) => {
      if (docSnap.exists()) {
        setRoom({ id: docSnap.id, ...docSnap.data() });
      } else {
        setRoom(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [roomId]);

  return { room, loading };
}

/** チャットルーム作成 */
export async function createChatRoom({
  name,
  description,
  currentUser,
}: CreateChatRoomArgs) {
  /** ロールチェック */
  if (currentUser.role !== 'admin' && currentUser.role !== 'user') {
    throw new Error('チャットルームを作成する権限がありません。');
  }

  /** 重複チェック */
  const q = query(collection(db, 'chatRooms'), where('name', '==', name));
  const snapshot = await getDocs(q);
  if (!snapshot.empty) {
    throw new Error('同じ名前のルームがすでに存在します');
  }

  /** 作成 */
  const newRoom = {
    name,
    description,
    createdAt: serverTimestamp(),
    createdBy: currentUser.id,
  };

  const docRef = await addDoc(collection(db, 'chatRooms'), newRoom);

  return docRef.id;
}
