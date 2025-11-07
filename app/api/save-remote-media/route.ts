import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// --- Import the NEW Abstraction Layer (The Bouncer) ---
import { uploadMedia } from "@/services/media-storage";

// --- Types ---
import { MediaUploadResult } from "@/types/mediaStorage";

const prisma = new PrismaClient();

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
    if (!response.ok) throw new Error(`Failed to fetch file from URL: ${response.statusText}`);
    

    // 2. --- Convert the fetched file to a Buffer ---
    const fileBuffer = Buffer.from(await response.arrayBuffer());
    const fileType =
      response.headers.get("content-type") || "application/octet-stream";

    // 3. --- Call the Bouncer (media-storage) with the Buffer ---
    const uploadResult: MediaUploadResult = await uploadMedia({
      fileBuffer,
      fileType,
      alt,
    });

    // 4. Save the new Media record with provider details
    const newMedia = await prisma.media.create({
      data: {
        url: uploadResult.url,
        media_type: uploadResult.media_type,
        description: uploadResult.alt,
        alt: uploadResult.alt,
        provider_asset_id: uploadResult.providerAssetId,
        storage_provider: uploadResult.storageProvider,
      },
      select: { id: true, url: true },
    });

    // 5. Cloudinary file is now redundant, you may optionally delete it here
    // using the Cloudinary Delete API, but that's a step for later optimization.

    return NextResponse.json(newMedia, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "A server error or download/upload error occurred." },
      { status: 500 }
    );
  }
}
