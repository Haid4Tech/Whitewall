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
  image: string;
  featured: boolean;
  description: string;
  amenities: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishDate: string;
  readTime: string;
  category: string;
  image: string;
  tags: string[];
}

export interface IFieldItems {
  id: string;
  htmlfor: string;
  label: string;
  name?: string;
  type?: string;
  placeholder?: string;
  compulsory?: boolean;
}
