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
  onAuthStateChanged(authObserver, async (user) => {
    if(user) {
      const token = user.getIdToken();
      store.dispatch(setUser({user, token}));
    } else {
      store.dispatch(removeUser());
    }
  })
}

export const createUser = async (email, password) => {
  try{
    const result = await createUserWithEmailAndPassword(firebaseAuth, email, password);
    store.dispatch(setUser({
      user: result.user.email,
      token: result.user.accessToken
    }));
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
    await signOut();
    // store.dispatch(removeUser);
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
    store.dispatch(setUser({
      user: result.user.displayName,
      token: result.user.accessToken
    }));
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
