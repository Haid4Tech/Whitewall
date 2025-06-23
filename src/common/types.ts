export interface INavItems {
  id: number;
  label: string;
  url: string;
}

export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  priceType: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  type: string;
  images: string[];
  featured: boolean;
  description: string;
  amenities: string[];
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
}

export interface User {
  name: string;
  uid: string;
}
