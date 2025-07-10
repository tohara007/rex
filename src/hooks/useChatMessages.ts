import { useEffect, useState } from 'react';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  where,
} from 'firebase/firestore';
import { db } from '../firebase';
import type { User } from 'firebase/auth';
import type { UserProfile } from '../hooks/useUsers';

type ChatMessage = {
  id: string;
  text: string;
  uid: string;
  displayName: string;
  photoURL?: string;
  createdAt: Timestamp;
};

export const useGetChatMessages = (roomId: string) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    if (!roomId) return;

    const threeDaysAgo = Timestamp.fromDate(
      new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
    );

    const q = query(
      collection(db, 'chatRooms', roomId, 'messages'),
      where('createdAt', '>=', threeDaysAgo),
      orderBy('createdAt', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(
        snapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() }) as ChatMessage
        )
      );
    });

    return () => unsubscribe();
  }, [roomId]);

  return messages;
};

export const usePostChatMessage = (
  roomId: string,
  user: User | null,
  userProfile: UserProfile | null
) => {
  const postMessage = async (text: string) => {
    if (!user) throw new Error('未ログインユーザーです');

    const messagesRef = collection(db, 'chatRooms', roomId, 'messages');

    await addDoc(messagesRef, {
      text,
      uid: user.uid,
      displayName: userProfile?.displayName || '匿名ユーザー',
      photoURL: user.photoURL || '',
      createdAt: serverTimestamp(),
    });
  };

  return { postMessage };
};

export const useDeleteChatMessage = (roomId: string) => {
  const deleteMessage = async (messageId: string) => {
    const messageRef = doc(db, 'chatRooms', roomId, 'messages', messageId);
    await deleteDoc(messageRef);
  };

  return { deleteMessage };
};
