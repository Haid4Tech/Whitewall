import { db } from "@/config/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

/**
 * Add new properties Data
 */
export const addProperties = async () => {
  try {
    const propertiesRef = await addDoc(collection(db, "properties"), {
      // Add data
    });
  } catch (error) {
    console.error("Error storing properties ", error as string);
    throw new Error(error as string);
  }
};

/**
 * Get properties data
 * @returns Array of properties data
 */
export const getProperties = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "properties"));
    const properties: any = [];
    querySnapshot.forEach((doc) => {
      properties.push(doc.data());
    });

    return properties;
  } catch (error) {
    console.error("Error getting properties ", error as string);
    throw new Error(error as string);
  }
};
