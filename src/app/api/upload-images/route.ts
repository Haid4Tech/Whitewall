import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

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

export async function POST(request: NextRequest) {
  try {
    // Check if credentials are configured
    if (!SPACES_ACCESS_KEY || !SPACES_SECRET_KEY) {
      return NextResponse.json(
        { error: "Digital Ocean Spaces credentials not configured" },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const files = formData.getAll("files") as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 });
    }

    // Validate files
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    const maxSize = 10 * 1024 * 1024; // 10MB

    for (const file of files) {
      if (!validTypes.includes(file.type)) {
        return NextResponse.json(
          {
            error: `Invalid file type: ${file.type}. Only JPG, PNG, and WebP are allowed.`,
          },
          { status: 400 }
        );
      }

      if (file.size > maxSize) {
        return NextResponse.json(
          { error: `File too large: ${file.name}. Maximum size is 10MB.` },
          { status: 400 }
        );
      }
    }

    const uploadedUrls: string[] = [];

    // Upload each file
    for (const file of files) {
      try {
        // Generate unique filename
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(2, 15);
        const fileExtension = file.name.split(".").pop();
        const fileName = `properties/${timestamp}-${randomString}.${fileExtension}`;

        // Convert file to buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Upload to Digital Ocean Spaces
        const uploadCommand = new PutObjectCommand({
          Bucket: SPACES_BUCKET,
          Key: fileName,
          Body: buffer,
          ContentType: file.type,
          ACL: "public-read",
          Metadata: {
            "original-name": file.name,
            "upload-date": new Date().toISOString(),
          },
        });

        await s3Client.send(uploadCommand);

        // Generate public URL
        const imageUrl = `${SPACES_ENDPOINT}/${SPACES_BUCKET}/${fileName}`;
        uploadedUrls.push(imageUrl);
      } catch (error) {
        console.error(`Error uploading file ${file.name}:`, error);
        return NextResponse.json(
          { error: `Failed to upload ${file.name}` },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      urls: uploadedUrls,
      message: `Successfully uploaded ${uploadedUrls.length} images`,
    });
  } catch (error) {
    console.error("Error in upload API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS(request: NextRequest) {
  console.log(request);
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
