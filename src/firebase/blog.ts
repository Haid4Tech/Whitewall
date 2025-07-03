/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  updateDoc,
  query,
  where,
  doc,
  getDoc,
  Timestamp,
  onSnapshot,
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
 * Clean Payload by removing undefined fields
 * @param obj
 * @returns
 */
function cleanPayload(obj: Record<string, any>): Record<string, any> {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (
      value !== undefined &&
      typeof value !== "function" &&
      !(value instanceof File)
    ) {
      // Preserve Firebase Timestamp objects
      if (value instanceof Timestamp) {
        acc[key] = value;
      }
      // Recursively clean nested objects
      else if (value && typeof value === "object" && !Array.isArray(value)) {
        acc[key] = cleanPayload(value);
      } else {
        acc[key] = value;
      }
    }
    return acc;
  }, {} as Record<string, any>);
}

/**
 * Adds a new blog post to the Firestore "blog" collection.
 * @param blogData - An object containing the blog post data.
 * @returns The newly created document ID or null if the operation fails.
 */
export async function createBlog(data: BlogPost) {
  try {
    const now = Timestamp.now();

    // If the blog is to be featured, unfeature any existing blog
    if (data.featured) {
      const q = query(collection(db, "blogs"), where("featured", "==", true));
      const snapshot = await getDocs(q);

      // Unfeature all currently featured blogs
      const unfeaturePromises = snapshot.docs.map((docSnap) =>
        updateDoc(doc(db, "blogs", docSnap.id), { featured: false })
      );

      await Promise.all(unfeaturePromises);
    }

    const cleaned = cleanPayload({
      ...data,
      featured: !!data.featured,
      createdAt: now,
      updatedAt: now,
      publishDate: data.isPublished ? now : null,
    });

    const docRef = await addDoc(collection(db, "blogs"), cleaned);
    return docRef.id;
  } catch (error) {
    console.error("Error adding blog document:", error);
    throw error;
  }
}
/**
 * Upload image to Firebase
 * @param file
 * @returns
 */
export const uploadImageToFirebase = async (file: File) => {
  const storage = getStorage();
  const storageRef = ref(storage, `uploads/${file.name}`);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
};

/**
 * Deletes a Blog from Firestore.
 * @param id - The blog document ID.
 * @returns True if successful, false otherwise.
 */
export const deleteBlog = async (id: string): Promise<boolean> => {
  try {
    const docRef = doc(db, "blogs", id);
    await deleteDoc(docRef);

    return true;
  } catch (error) {
    console.error("Error deleting blog:", error);
    return false;
  }
};

/**
 * Update Blog Data
 * @param data
 * @returns
 */
export async function updateBlog(data: BlogPost) {
  try {
    if (!data.id) {
      throw new Error("Blog ID is required to update a blog.");
    }

    const updatedAt = Timestamp.now();
    const publishDate =
      data.isPublished && !data.publishDate
        ? updatedAt
        : data.publishDate || null;

    // If setting as featured, unfeature any other blog
    if (data.featured) {
      const q = query(collection(db, "blogs"), where("featured", "==", true));
      const snapshot = await getDocs(q);

      const unfeaturePromises = snapshot.docs
        .filter((docSnap) => docSnap.id !== data.id)
        .map((docSnap) =>
          updateDoc(doc(db, "blogs", docSnap.id), { featured: false })
        );

      await Promise.all(unfeaturePromises);
    }

    const updatePayload = cleanPayload({
      ...data,
      updatedAt,
      publishDate,
      featured: !!data.featured,
    });

    const docRef = doc(db, "blogs", data.id);
    await updateDoc(docRef, updatePayload);

    return true;
  } catch (error) {
    console.error("Error updating blog document:", error);
    throw error;
  }
}

/**
 * Check if any blog is featured
 * @returns
 */
export async function isAnyBlogFeatured(): Promise<boolean> {
  const q = query(collection(db, "blogs"), where("featured", "==", true));
  const snapshot = await getDocs(q);
  return !snapshot.empty;
}

/**
 * Check if a particular blog is featured
 * @param blogId
 * @returns
 */
export async function isBlogFeatured(blogId: string): Promise<boolean> {
  const docRef = doc(db, "blogs", blogId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    return data.featured === true;
  }

  return false;
}

/**
 * Listen for blog summary
 * @param callback
 * @returns
 */
export const listenToBlogCounts = (
  callback: (counts: { all: number; published: number; drafts: number }) => void
) => {
  const col = collection(db, "blogs");

  const unsubscribe = onSnapshot(col, (snapshot) => {
    let all = 0;
    let published = 0;
    let drafts = 0;

    snapshot.forEach((doc) => {
      all++;
      const status = doc.data().isPublished;
      if (status) published++;
      else if (!status) drafts++;
    });

    callback({ all, published, drafts });
  });

  return unsubscribe; // call this to stop listening
};
