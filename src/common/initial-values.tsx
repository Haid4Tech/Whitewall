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
  updatedAt: undefined,
  createdAt: undefined,
};
