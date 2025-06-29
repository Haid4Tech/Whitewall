import { db } from "@/config/firebase";
import { User } from "@/common/types";
import { doc, getDoc } from "firebase/firestore";

/**
 * Get User Information from UID
 * @param uid
 * @returns
 */
export const userById = async (uid: string): Promise<User | null> => {
  try {
    const userDocRef = doc(db, "users", uid);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      return userDocSnap.data() as User;
    } else {
      console.warn(`No user found with ID: ${uid}`);
      return null;
    }
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return null;
  }
};
