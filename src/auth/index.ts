export { useAuth, AuthProvider } from './AuthContext';

import {
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from '../firebase';

/** ログイン情報削除 */
export async function initializeAuthPersistence() {
  await setPersistence(auth, browserSessionPersistence);
}

/** ログイン */
export function signIn(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

/** ログアウト */
export function logout() {
  return signOut(auth);
}
