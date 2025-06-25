// import {
//   S3Client,
//   PutObjectCommand,
//   DeleteObjectCommand,
//   ObjectCannedACL,
// } from "@aws-sdk/client-s3";

// Digital Ocean Spaces configuration
// const SPACES_ENDPOINT =
//   process.env.NEXT_PUBLIC_SPACES_ENDPOINT ||
//   "https://nyc3.digitaloceanspaces.com";
// const SPACES_BUCKET =
//   process.env.NEXT_PUBLIC_SPACES_BUCKET || "your-bucket-name";
// const SPACES_ACCESS_KEY = process.env.NEXT_PUBLIC_SPACES_ACCESS_KEY || "";
// const SPACES_SECRET_KEY = process.env.NEXT_PUBLIC_SPACES_SECRET_KEY || "";

/**
 * Upload images using Next.js API route to avoid CORS issues
 * @param files - Array of image files to upload
 * @param onProgress - Callback function to track upload progress
 * @returns Promise<string[]> - Array of uploaded image URLs
 */
export const uploadImagesToSpaces = async (
  files: File[],
  onProgress?: (progress: number) => void
): Promise<string[]> => {
  try {
    const formData = new FormData();

    // Add all files to FormData
    files.forEach((file) => {
      formData.append("files", file);
    });

    // Upload to our API route
    const response = await fetch("/api/upload-images", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Upload failed");
    }

    const result = await response.json();

    if (result.success) {
      // Update progress to 100% when complete
      if (onProgress) {
        onProgress(100);
      }
      return result.urls;
    } else {
      throw new Error(result.error || "Upload failed");
    }
  } catch (error) {
    console.error("Error uploading images:", error);
    throw new Error("Failed to upload images. Please try again.");
  }
};

/**
 * Delete an image from Digital Ocean Spaces (server-side only)
 * @param imageUrl - The URL of the image to delete
 */
export const deleteImageFromSpaces = async (
  imageUrl: string
): Promise<void> => {
  try {
    const response = await fetch("/api/delete-image", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageUrl }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Delete failed");
    }
  } catch (error) {
    console.error("Error deleting image:", error);
    throw new Error("Failed to delete image.");
  }
};

/**
 * Validate image file
 * @param file - File to validate
 * @returns boolean - Whether file is valid
 */
export const validateImageFile = (file: File): boolean => {
  const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  const maxSize = 10 * 1024 * 1024; // 10MB

  if (!validTypes.includes(file.type)) {
    return false;
  }

  if (file.size > maxSize) {
    return false;
  }

  return true;
};

/**
 * Compress image before upload (optional)
 * @param file - Image file to compress
 * @param quality - Compression quality (0-1)
 * @returns Promise<File> - Compressed file
 */
export const compressImage = async (
  file: File,
  quality: number = 0.8
): Promise<File> => {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      // Calculate new dimensions (max 1920px width/height)
      const maxDimension = 1920;
      let { width, height } = img;

      if (width > height && width > maxDimension) {
        height = (height * maxDimension) / width;
        width = maxDimension;
      } else if (height > maxDimension) {
        width = (width * maxDimension) / height;
        height = maxDimension;
      }

      canvas.width = width;
      canvas.height = height;

      // Draw and compress
      ctx?.drawImage(img, 0, 0, width, height);
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          } else {
            resolve(file);
          }
        },
        file.type,
        quality
      );
    };

    img.src = URL.createObjectURL(file);
  });
};
