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

interface BlogAuthor {
  name?: string;
  image?: string;
}

export interface BlogPost {
  slug?: string;
  title?: string;
  excerpt?: string;
  content?: string;
  author?: BlogAuthor;
  readTime?: number;
  category?: string;
  featuredImage?: string;
  isPublished?: boolean;
  status?: "draft" | "published" | "scheduled";
  tags: string[];
  views?: number;
  likes?: number;
  seoScore?: number;
  metaDescription?: string;
  metaKeywords?: string[];
  createdAt?: string | Date | Timestamp | null;
  publishDate?: string | Date | Timestamp | null;
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
  name: string;
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
