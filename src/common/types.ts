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
  currency?: "USD" | "EUR" | "GBP" | "NGR";
  priceType: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  type: string;
  images: string[];
  status?: ListingStatus;
  liked?: boolean;
  featured: boolean;
  description: string;
  amenities: string[];
  createdAt?: string | Timestamp;
  updatedAt?: string | Timestamp;
}

export type IBlogCard = BlogPost & { id: string };

export interface BlogPost {
  slug?: string;
  title?: string;
  excerpt?: string;
  content?: string;
  author?: string;
  readTime?: number;
  category?: string;
  image?: string;
  isPublished?: boolean;
  tags: string[];
  createdAt?: string | Date;
  publishDate?: string | Date;
  updatedAt?: string | Date;
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
