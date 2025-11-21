import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// --- Import the NEW Abstraction Layer (The Bouncer) ---
import { uploadMedia } from "@/services/media-storage/upload-media";

// --- Types ---
import { MediaUploadResult } from "@/types/mediaStorage";

// Define the payload structure coming from the client
type RemoteMediaBody = {
  remoteUrl: string; // The URL from Cloudinary
  alt: string;
  media_type: string;
};

import { authenticateUser } from "@/utils/api-helpers/authenticateUser";

export async function POST(request: Request) {
  // Authentication check goes here
  const authResult = await authenticateUser();
  if (authResult instanceof NextResponse) return authResult;

  try {
    const { remoteUrl, alt } = (await request.json()) as RemoteMediaBody;

    if (!remoteUrl) {
      return NextResponse.json(
        { error: "No remote URL provided." },
        { status: 400 }
      );
    }

    // 1. --- Fetch the file content from the remote URL ---
    const response = await fetch(remoteUrl);
    if (!response.ok)
      throw new Error(`Failed to fetch file from URL: ${response.statusText}`);

    // 2. --- Convert the fetched file to a Buffer ---
    const fileBuffer = Buffer.from(await response.arrayBuffer());
    const fileType =
      response.headers.get("content-type") || "application/octet-stream";
    
    /**
     * Call the Bouncer:
     *    - Handles Hashing 
     *    - Deduplication
     *    - Final Upload
     *    - Database Saving
     */
    const mediaRecord = await uploadMedia({
      fileBuffer,
      fileType,
      alt,
    });

    return NextResponse.json(mediaRecord, { status: 200 });
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "A server error or download/upload error occurred.";
    // Log error in development only
    if (process.env.NODE_ENV === 'development') {
      console.log(errorMessage);
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
