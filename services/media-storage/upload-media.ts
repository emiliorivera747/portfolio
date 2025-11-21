import { MediaUploadResult } from "@/types/mediaStorage";
import { uploadToCloudinary } from "@/services/media-storage/cloudinary-service";
import { PrismaClient } from "@prisma/client";
import * as crypto from "crypto";

const prisma = new PrismaClient();

type UploadParams = {
  fileBuffer: Buffer;
  fileType: string;
  alt: string;
};

export async function uploadMedia(
  params: UploadParams
): Promise<MediaUploadResult> {
  const { fileBuffer, fileType, alt } = params;

  // Calculates the file hash
  const fileHash = crypto.createHash("sha256").update(fileBuffer).digest("hex");

  // Check for existing Media by Hash
  const existingMedia = await prisma.media.findUnique({
    where: {
      file_hash: fileHash,
    },
  });

  if (existingMedia) {
    // Duplicate file detected for hash: ${fileHash}. Returning existing record.
    return {
      id: existingMedia.id,
      url: existingMedia.url,
      alt: existingMedia.alt || alt,
      media_type: existingMedia.media_type as "image" | "video",
      providerAssetId: existingMedia.provider_asset_id || "N/A",
      storageProvider: existingMedia.storage_provider as "CLOUDINARY" | "S3",
    };
  }

  // Not Duplicate
  const provider = process.env.NEXT_PUBLIC_STORAGE_PROVIDER;
  let uploadResult: MediaUploadResult;

  if (provider === "CLOUDINARY") {
    uploadResult = await uploadToCloudinary({ ...params, fileHash });
  } else {
    uploadResult = await uploadToCloudinary({ ...params, fileHash });
  }

  const newMedia = await prisma.media.create({
    data: {
      id: typeof uploadResult.id === "string" ? parseInt(uploadResult.id, 10) : uploadResult.id,
      url: uploadResult.url,
      media_type: uploadResult.media_type,
      description: uploadResult.alt,
      alt: uploadResult.alt,
      provider_asset_id: uploadResult.providerAssetId,
      storage_provider: uploadResult.storageProvider,
      file_hash: fileHash,
    },
  });

  return {
    ...uploadResult,
    url: newMedia.url,
    alt: newMedia.alt || alt,
  };
}
