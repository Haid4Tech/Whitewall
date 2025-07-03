import { Property } from "./types";

export const initialProperties: Omit<Property, "id"> = {
  title: "",
  location: "",
  price: 0,
  currency: "NGN",
  priceType: "",
  bedrooms: 0,
  bathrooms: 0,
  sqft: 0,
  type: "",
  images: [],
  featured: false,
  description: "",
  amenities: [],
  status: "Available",
  liked: false,
  updatedAt: null,
  createdAt: null,
};

export const initialBlogData = {
  slug: "",
  title: "",
  excerpt: "",
  content: "",
  author: {
    name: "",
    image: "",
  },
  readTime: 0,
  category: "",
  featured: false,
  isPublished: false,
  status: null,
  tags: [],
  youtubeLinks: [],
  imageUrls: [],
  images: [],
  coverImageUrl: "",
  views: 0,
  likes: 0,
  seoScore: 0,
  metaDescription: "",
  metaKeywords: [],
  createdAt: null,
  publishDate: null,
  updatedAt: null,
};

export const propertiesInitialCount = {
  all: 0,
  sold: 0,
  available: 0,
};

export const blogInitialCount = {
  all: 0,
  published: 0,
  drafts: 0,
};
