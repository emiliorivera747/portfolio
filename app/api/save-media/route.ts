// app/api/save-media/route.ts

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// --- Import the Media Service ---
import { uploadToCloudinary } from "@/services/media-storage";

// --- Types ---
import { MediaUploadResult } from "@/types/mediaStorage";

const prisma = new PrismaClient();

// The data structure coming from the client must now include the file content
type MediaBody = {
  dataUri: string; // File content as data URI
  alt: string; // Alt text
};

export async function POST(request: Request) {
  try {
    const { dataUri, alt } = (await request.json()) as MediaBody;

    if (!dataUri) {
      return NextResponse.json(
        { error: "No file data provided." },
        { status: 400 }
      );
    }

    // 1. --- Call the Abstraction Layer ---
    const uploadResult: MediaUploadResult = await uploadToCloudinary(
      dataUri,
      alt
    );

    // 2. Save the new Media record with provider details
    const newMedia = await prisma.media.create({
      data: {
        url: uploadResult.url,
        media_type: uploadResult.media_type,
        description: uploadResult.alt,
        alt: uploadResult.alt,
        provider_asset_id: uploadResult.providerAssetId,
        storage_provider: uploadResult.storageProvider,
      },
      select: {
        id: true,
        url: true,
      },
    });

    return NextResponse.json(newMedia, { status: 200 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "A server error or upload error occurred." },
      { status: 500 }
    );
  }
}
