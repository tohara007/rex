export { useAuth, AuthProvider } from './AuthContext';

import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase';

export function signIn(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logout() {
  return signOut(auth);
}
