export { useAuth, AuthProvider } from './AuthContext';

import {
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from '../firebase';

/** タブやブラウザを閉じると自動でログアウトする設定 */
await setPersistence(auth, browserSessionPersistence);

/** ログイン */
export function signIn(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

/** ログアウト */
export function logout() {
  return signOut(auth);
}
