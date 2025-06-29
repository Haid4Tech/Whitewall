/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  addDoc,
  collection,
  getDocs,
  doc,
  getDoc,
  Timestamp,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { BlogPost } from "../common/types";
import { db } from "../config/firebase";

/**
 * Fetches all blog documents from Firestore.
 * @returns An array of blog documents.
 */
export const getBlogs = async () => {
  try {
    const queryBlogSnapshot = await getDocs(collection(db, "blogs"));

    // Map Firestore documents to an array
    const blogs = queryBlogSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as ({ id: string } & BlogPost)[];

    return blogs;
  } catch (error) {
    console.log(error);
    return [];
  }
};

/**
 * Fetches a single blog document by ID from Firestore.
 * @param blogId - The ID of the blog document.
 * @returns The blog document data or null if not found.
 */
export const getBlogDocumentById = async (blogId: string) => {
  try {
    const blogRef = doc(db, "blogs", blogId);
    const blogSnapshot = await getDoc(blogRef);

    if (blogSnapshot.exists()) {
      return { id: blogSnapshot.id, ...blogSnapshot.data() };
    } else {
      console.warn(`Blog document with ID ${blogId} not found.`);
      return null;
    }
  } catch (error) {
    console.error("Error fetching blog document:", error);
    return null;
  }
};

/**
 * Adds a new blog post to the Firestore "blog" collection.
 * @param blogData - An object containing the blog post data.
 * @returns The newly created document ID or null if the operation fails.
 */
export const createBlog = async (blogData: any) => {
  try {
    const docRef = await addDoc(collection(db, "blogs"), {
      ...blogData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });

    console.log("Blog added with ID:", docRef.id);
    return docRef.id; // Return the document ID
  } catch (error) {
    console.error("Error adding blog document:", error);
    return null;
  }
};

export const uploadImageToFirebase = async (file: File) => {
  const storage = getStorage();
  const storageRef = ref(storage, `uploads/${file.name}`);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
};
