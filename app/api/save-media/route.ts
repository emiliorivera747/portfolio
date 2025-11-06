// app/api/save-media/route.ts

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { authenticateUser } from "@/utils/api-helpers/authenticateUser";

// --- Import the NEW Abstraction Layer ---
import { uploadMedia } from "@/services/media-storage";

// --- Types ---
import { MediaUploadResult } from "@/types/mediaStorage";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const result = await authenticateUser();
  if (result instanceof NextResponse) return result;

  try {
    // 1. --- Get FormData, not JSON ---
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const alt = formData.get("alt") as string;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided." },
        { status: 400 }
      );
    }

    // 2. --- Convert file to a Buffer ---
    // A Buffer is a universal format that both S3 and Cloudinary can handle.
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    // 3. --- Call the ONE abstraction ---
    // This function doesn't know about Cloudinary or S3.
    // It just does its job.
    const uploadResult: MediaUploadResult = await uploadMedia({
      fileBuffer,
      fileType: file.type, // Pass the MIME type
      alt,
    });

    // 4. Save the new Media record (this stays the same)
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