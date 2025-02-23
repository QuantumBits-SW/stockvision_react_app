import axios from 'axios';
import { API_ENDPOINTS } from '../api/endpoints';
import { signInWithEmailAndPassword , signInWithPopup , getAdditionalUserInfo} from 'firebase/auth';
import { firebaseAuth , googleAuthProvider } from '../../firebase';

export const loginUser = async (email, password) => {
    try {
      const response = await signInWithEmailAndPassword(firebaseAuth, email, password);
      const token = await response.user.getIdToken();
      return token; 
    } catch (error) {
      console.error("Firebase Login Error:", error);
      throw error;
    }
  };

  export const signupUser = async(email, password) =>{
    try {
      const response = await createUserWithEmailAndPassword(firebaseAuth, email, password);
      const token = await response.user.getIdToken();
      return token; 
    } catch (error) {
      console.error("Firebase Signup Error:", error);
      throw error;
    }
  };

export const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(firebaseAuth, googleAuthProvider);
      const { isNewUser } = getAdditionalUserInfo(result)    
      const token = await result.user.getIdToken();
      const bodyObject = { "isNewUser": isNewUser }
      const userData = await getUserProfile(token, bodyObject);

      return userData;
    } catch (error) {
      console.error("Error during Google login:", error);
      throw error;
    }
  };

  export const getUserProfile = async (token, bodyObject) => {
    try {
      const response = await axios.post(API_ENDPOINTS.getUserProfile, 
        bodyObject, {
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw error;
    }
  };