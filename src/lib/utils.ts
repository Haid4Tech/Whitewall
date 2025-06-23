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
