import { NextRequest, NextResponse } from "next/server";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

// Digital Ocean Spaces configuration
const SPACES_ENDPOINT =
  process.env.NEXT_PUBLIC_SPACES_ENDPOINT ||
  "https://nyc3.digitaloceanspaces.com";
const SPACES_BUCKET =
  process.env.NEXT_PUBLIC_SPACES_BUCKET || "your-bucket-name";
const SPACES_ACCESS_KEY = process.env.NEXT_PUBLIC_SPACES_ACCESS_KEY || "";
const SPACES_SECRET_KEY = process.env.NEXT_PUBLIC_SPACES_SECRET_KEY || "";

// Initialize S3 client for Digital Ocean Spaces
const s3Client = new S3Client({
  endpoint: SPACES_ENDPOINT,
  region: "nyc3", // or your preferred region
  credentials: {
    accessKeyId: SPACES_ACCESS_KEY,
    secretAccessKey: SPACES_SECRET_KEY,
  },
});

export async function DELETE(request: NextRequest) {
  try {
    // Check if credentials are configured
    if (!SPACES_ACCESS_KEY || !SPACES_SECRET_KEY) {
      return NextResponse.json(
        { error: "Digital Ocean Spaces credentials not configured" },
        { status: 500 }
      );
    }

    const { imageUrl } = await request.json();

    if (!imageUrl) {
      return NextResponse.json(
        { error: "Image URL is required" },
        { status: 400 }
      );
    }

    // Extract key from URL
    const urlParts = imageUrl.split("/");
    const key = urlParts.slice(-2).join("/"); // Get the last two parts (properties/filename)

    // Delete from Digital Ocean Spaces
    const deleteCommand = new DeleteObjectCommand({
      Bucket: SPACES_BUCKET,
      Key: key,
    });

    await s3Client.send(deleteCommand);

    return NextResponse.json({
      success: true,
      message: "Image deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting image:", error);
    return NextResponse.json(
      { error: "Failed to delete image" },
      { status: 500 }
    );
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
