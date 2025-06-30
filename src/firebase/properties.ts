/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  addDoc,
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
} from "firebase/firestore";
import { Property } from "../common/types";
import { db } from "../config/firebase";
import { generateSlug, generateUniqueSlug, clearPhotoGalleryCache } from "../lib/utils";

/**
 * Fetches all properties from Firestore.
 * @returns An array of property documents.
 */
export const getProperties = async (): Promise<Property[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "properties"));

    const properties = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Property[];

    return properties;
  } catch (error) {
    console.error("Error fetching properties:", error);
    return [];
  }
};

/**
 * Fetches a single property by ID from Firestore.
 * @param id - The property document ID.
 * @returns The property document or null if not found.
 */
export const getPropertyById = async (id: string): Promise<Property | null> => {
  try {
    const docRef = doc(db, "properties", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      } as Property;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching property:", error);
    return null;
  }
};

/**
 * Fetches featured properties from Firestore.
 * @param limitCount - Maximum number of featured properties to return.
 * @returns An array of featured property documents.
 */
export const getFeaturedProperties = async (
  limitCount: number = 6
): Promise<Property[]> => {
  try {
    const q = query(
      collection(db, "properties"),
      where("featured", "==", true),
      orderBy("createdAt", "desc"),
      limit(limitCount)
    );

    const querySnapshot = await getDocs(q);

    const properties = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Property[];

    return properties;
  } catch (error) {
    console.error("Error fetching featured properties:", error);
    return [];
  }
};

/**
 * Fetches a single property by slug from Firestore.
 * @param slug - The property slug.
 * @returns The property document or null if not found.
 */
export const getPropertyBySlug = async (
  slug: string
): Promise<Property | null> => {
  try {
    const q = query(collection(db, "properties"), where("slug", "==", slug));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return {
        id: doc.id,
        ...doc.data(),
      } as Property;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching property by slug:", error);
    return null;
  }
};

/**
 * Gets all existing slugs from the properties collection.
 * @returns Array of existing slugs.
 */
export const getExistingSlugs = async (): Promise<string[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "properties"));
    const slugs: string[] = [];

    querySnapshot.docs.forEach((doc) => {
      const data = doc.data();
      if (data.slug) {
        slugs.push(data.slug);
      }
    });

    return slugs;
  } catch (error) {
    console.error("Error fetching existing slugs:", error);
    return [];
  }
};

/**
 * Adds a new property to the Firestore "properties" collection.
 * @param propertyData - An object containing the property data.
 * @returns The newly created document ID or null if the operation fails.
 */
export const createProperty = async (
  propertyData: Omit<Property, "id">
): Promise<string | null> => {
  try {
    // Generate slug from title
    const baseSlug = generateSlug(propertyData.title);
    const existingSlugs = await getExistingSlugs();
    const uniqueSlug = generateUniqueSlug(baseSlug, existingSlugs);

    const docRef = await addDoc(collection(db, "properties"), {
      ...propertyData,
      slug: uniqueSlug,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });

    // Clear photo gallery cache since new property was added
    clearPhotoGalleryCache();

    console.log("Property added with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding property document:", error);
    return null;
  }
};

/**
 * Updates an existing property in Firestore.
 * @param id - The property document ID.
 * @param propertyData - The updated property data.
 * @returns True if successful, false otherwise.
 */
export const updateProperty = async (
  id: string,
  propertyData: Partial<Omit<Property, "id">>
): Promise<boolean> => {
  try {
    const docRef = doc(db, "properties", id);

    // If title is being updated, regenerate the slug
    const updatedData = { ...propertyData, updatedAt: Timestamp.now() };

    if (propertyData.title) {
      const baseSlug = generateSlug(propertyData.title);
      const existingSlugs = await getExistingSlugs();

      // Get current property to exclude its own slug from uniqueness check
      const currentProperty = await getPropertyById(id);
      const otherSlugs = existingSlugs.filter(
        (slug) => slug !== currentProperty?.slug
      );

      const uniqueSlug = generateUniqueSlug(baseSlug, otherSlugs);
      updatedData.slug = uniqueSlug;
    }

    await updateDoc(docRef, updatedData);

    // Clear photo gallery cache since property was updated
    clearPhotoGalleryCache();

    console.log("Property updated successfully");
    return true;
  } catch (error) {
    console.error("Error updating property:", error);
    return false;
  }
};

/**
 * Deletes a property from Firestore.
 * @param id - The property document ID.
 * @returns True if successful, false otherwise.
 */
export const deleteProperty = async (id: string): Promise<boolean> => {
  try {
    const docRef = doc(db, "properties", id);
    await deleteDoc(docRef);

    // Clear photo gallery cache since property was deleted
    clearPhotoGalleryCache();

    console.log("Property deleted successfully");
    return true;
  } catch (error) {
    console.error("Error deleting property:", error);
    return false;
  }
};

/**
 * Searches properties with filters.
 * @param filters - Object containing search filters.
 * @returns An array of filtered property documents.
 */
export const searchProperties = async (filters: {
  searchQuery?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  propertyType?: string;
  location?: string;
}): Promise<Property[]> => {
  try {
    let q: any = collection(db, "properties");

    // Apply filters
    if (filters.minPrice !== undefined) {
      q = query(q, where("price", ">=", filters.minPrice));
    }
    if (filters.maxPrice !== undefined) {
      q = query(q, where("price", "<=", filters.maxPrice));
    }
    if (filters.bedrooms && filters.bedrooms > 0) {
      q = query(q, where("bedrooms", ">=", filters.bedrooms));
    }
    if (filters.propertyType && filters.propertyType !== "all") {
      q = query(q, where("type", "==", filters.propertyType));
    }

    const querySnapshot = await getDocs(q);
    let properties = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Property, "id">),
    })) as Property[];

    // Apply client-side filters for text search
    if (filters.searchQuery) {
      const searchLower = filters.searchQuery.toLowerCase();
      properties = properties.filter(
        (property) =>
          property?.title?.toLowerCase().includes(searchLower) ||
          property?.location?.toLowerCase().includes(searchLower)
      );
    }

    if (filters.location) {
      const locationLower = filters.location.toLowerCase();
      properties = properties.filter((property) =>
        property?.location?.toLowerCase().includes(locationLower)
      );
    }

    return properties;
  } catch (error) {
    console.error("Error searching properties:", error);
    return [];
  }
};

/**
 * Fetches recent properties from Firestore for photo gallery.
 * @param limitCount - Maximum number of recent properties to return.
 * @returns An array of recent property documents.
 */
export const getRecentProperties = async (
  limitCount: number = 5
): Promise<Property[]> => {
  try {
    const q = query(
      collection(db, "properties"),
      orderBy("createdAt", "desc"),
      limit(limitCount)
    );

    const querySnapshot = await getDocs(q);

    const properties = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Property[];

    return properties;
  } catch (error) {
    console.error("Error fetching recent properties:", error);
    return [];
  }
};
