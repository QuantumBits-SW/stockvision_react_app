import { setUser, removeUser, setLoading } from '../store/slices/authSlice';
import { store } from '../store/index'
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  FacebookAuthProvider
} from 'firebase/auth';
import { firebaseAuth } from '../../firebase';


export const authObserver = () => {
  store.dispatch(setLoading(true));
  onAuthStateChanged(firebaseAuth, async (user) => {
    if(user) {
      const token = user.stsTokenManager.accessToken;
      store.dispatch(setUser({ user, token}));
    } else {
      store.dispatch(removeUser());
    }
  })
}

export const createUser = async (email, password) => {
  try{
    const result = await createUserWithEmailAndPassword(firebaseAuth, email, password);
    return {
      message: "User created successfully!",
      result
    };
  } catch(error) {
    throw new Error(error);
  }
}

export const login = async (email, password) => {
  try{
    const result = await signInWithEmailAndPassword(firebaseAuth, email, password);
    return {
      message: "Successfully signed in!",
      result
    };
  } catch(error) {
    throw new Error(error);
  }
}

export const logout = async () => {
  try{
    await signOut(firebaseAuth);
    store.dispatch(removeUser());
    return "Successfully logged out!";
  } catch(error) {
    throw new Error(error);
  }
}

export const loginWithProvider = async (provider) => {
  try{
    let authProvider = null;
    if (provider === 'google') {
      authProvider = new GoogleAuthProvider();
    } else if (provider === 'fb') {
      authProvider = new FacebookAuthProvider();
      authProvider.addScope('email');
    }
    const result = await signInWithPopup(firebaseAuth, authProvider);
    return {
      message: `Successfully signed in using ${provider.toUpperCase()}`,
      result
    };;
  }catch(error){
    throw new Error(error);
  }
}

export const resetPassword = async (email) => {
  try{
    await sendPasswordResetEmail(firebaseAuth, email);
    return "Reset email sent!";
  } catch(error) {
    throw new Error(error);
  }
}