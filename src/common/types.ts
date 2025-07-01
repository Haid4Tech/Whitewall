import { Timestamp } from "firebase/firestore";

export interface INavItems {
  id: number;
  label: string;
  url: string;
}

export type ListingStatus = "Available" | "Sold";

export interface Property {
  id: string;
  title: string;
  slug?: string;
  location: string;
  price: number;
  currency: "USD" | "EUR" | "GBP" | "NGN";
  priceType: string;
  bedrooms: number;
  bathrooms: number;
  sqft?: number | undefined | null;
  type: string;
  images: string[];
  status?: ListingStatus;
  liked?: boolean;
  featured: boolean;
  description: string;
  amenities: string[];
  createdAt?: string | Date | Timestamp | null;
  updatedAt?: string | Date | Timestamp | null;
}

export type IBlogCard = BlogPost & { id: string };

export interface BlogAuthor {
  name: string;
  avatarUrl?: string;
  bio?: string;
}

export interface BlogPost {
  id?: string; // If using Firestore or general database ID
  slug?: string;
  title?: string;
  excerpt?: string;
  content?: string;
  author?: BlogAuthor;
  readTime?: number;
  category?: string;
  featured?: boolean; // can still be used for display
  coverImageFile?: File | null; // NEW: to track uploaded cover image
  coverImageUrl?: string; // NEW: preview or uploaded URL

  images?: File[]; // NEW: raw image files
  imageUrls?: string[]; // NEW: image URLs or previews

  youtubeLinks?: string[]; // NEW: YouTube video links

  isPublished?: boolean;
  status?: "draft" | "published" | "scheduled" | null;

  tags?: string[]; // already present

  views?: number;
  likes?: number;
  seoScore?: number;
  metaDescription?: string;
  metaKeywords?: string[];

  publishDate?: string | Date | Timestamp | null;
  createdAt?: string | Date | Timestamp | null;
  updatedAt?: string | Date | Timestamp | null;
}

export interface IFieldItems {
  id?: string;
  htmlfor: string;
  label: string;
  name?: string;
  type?: string;
  placeholder?: string;
  compulsory?: boolean;
  row?: number;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  profile: string;
  uid: string;
}

export interface FilterState {
  searchQuery: string;
  location: string;
  propertyType: string;
  priceType: string;
  status: string;
  minPrice: string;
  maxPrice: string;
  minBedrooms: string;
  maxBedrooms: string;
  minBathrooms: string;
  maxBathrooms: string;
  minSqft: string;
  maxSqft: string;
  featured: boolean | null;
  amenities: string[];
}

export interface PropertyFormData {
  title: string;
  location: string;
  price: string;
  currency: string;
  priceType: string;
  bedrooms: string;
  bathrooms: string;
  sqft: string;
  type: string;
  featured: boolean;
  description: string;
  amenities: string[];
}
