import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

/**
 * Authenticate with Email and Password
 * @param email
 * @param password
 * @returns
 */
export const login = async (email: string, password: string) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    return response.user;
  } catch (error) {
    console.log(error);
    return 400;
  }
};
