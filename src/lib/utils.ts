import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Timestamp } from "firebase/firestore";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAbsoluteUrl(path: string): string {
  // If the path is already an absolute URL (starts with http:// or https://), return it as is
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  // Otherwise, treat it as a local path and prepend the base URL
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `${baseUrl}/${cleanPath}`;
}

export function formatTimestamp(
  timestamp: string | Timestamp | undefined
): string {
  if (!timestamp) return "";

  let date: Date;

  if (typeof timestamp === "string") {
    const parsed = new Date(timestamp);
    if (isNaN(parsed.getTime())) return ""; // invalid string
    date = parsed;
  } else if (timestamp instanceof Timestamp) {
    date = timestamp.toDate();
  } else {
    return "";
  }

  return format(date, "MMMM d, yyyy h:mm a"); // Desired format
}

/**
 * Generates a URL-friendly slug from a string
 * @param text - The text to convert to a slug
 * @returns A URL-friendly slug
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters except spaces and hyphens
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
}

/**
 * Generates a unique slug by appending a number if the slug already exists
 * @param baseSlug - The base slug to make unique
 * @param existingSlugs - Array of existing slugs to check against
 * @returns A unique slug
 */
export function generateUniqueSlug(
  baseSlug: string,
  existingSlugs: string[]
): string {
  let slug = baseSlug;
  let counter = 1;

  while (existingSlugs.includes(slug)) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
}

export const formatPrice = (amount: number, currency: string) => {
  const locale = currency == "NGN" ? "en-NG" : "en-US";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(amount);
};

// Helper to format number with commas
export function formatNumberWithCommas(value: string) {
  if (!value) return "";
  const num = Number(value.replace(/,/g, ""));
  if (isNaN(num)) return value;
  return num.toLocaleString();
}
