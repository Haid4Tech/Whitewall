import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../config/firebase";

/**
 * Authenticate with Email and Password
 * @param email
 * @param password
 * @returns
 */
export const login = async (email: string, password: string) => {
  try {
    console.log("start login");
    const response = await signInWithEmailAndPassword(auth, email, password);
    return response.user;
  } catch (error) {
    console.log(error);
    return 400;
  }
};

/**
 * Log User out
 */
export const logoutUser = async () => {
  try {
    await signOut(auth);
    console.log("User logged out successfully");
  } catch (error) {
    console.error("Error logging out:", error);
  }
};
