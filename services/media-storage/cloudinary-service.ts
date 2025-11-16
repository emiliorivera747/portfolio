// @/services/media-storage/cloudinary-service.ts

import { v2 as cloudinary } from "cloudinary";
import { MediaUploadResult } from "@/types/mediaStorage";

// --- Cloudinary Configuration ---
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

type UploadParams = {
  fileBuffer: Buffer;
  fileType: string;
  alt: string;
  fileHash: string;
};

/**
 * Uploads the file to Cloudinary
 * @param params The file buffer, type, and alt text.
 * @returns A standardized MediaUploadResult object.
 */
export async function uploadToCloudinary(
  params: UploadParams
): Promise<MediaUploadResult> {
  const { fileBuffer, fileType, alt, fileHash } = params;

  try {
    // 1. Convert the buffer to a Data URI.
    // This is a Cloudinary-specific step, so we isolate it here.
    const dataUri = `data:${fileType};base64,${fileBuffer.toString("base64")}`;

    // 2. Upload using the dataUri
    const uploadResult = await cloudinary.uploader.upload(dataUri, {
      folder: "blog-uploads",
      resource_type: "auto",
      public_id: fileHash,
      overwrite: false,
      unique_filename: false,
    });

    return {
      id: uploadResult.id,
      url: uploadResult.secure_url,
      alt: alt,
      media_type: uploadResult.resource_type === "image" ? "image" : "video",
      providerAssetId: uploadResult.public_id,
      storageProvider: "CLOUDINARY",
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error && error.message ? error.message : "Unknown error";
    throw new Error(`Failed to upload media to Cloudinary: ${errorMessage}`);
  }
}
