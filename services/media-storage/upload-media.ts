import { MediaUploadResult } from "@/types/mediaStorage";
import { uploadToCloudinary } from "@/services/media-storage/cloudinary-service";
import { db } from "@/lib/db/drizzle";
import { media } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import * as crypto from "crypto";

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
  const existingMedia = await db.query.media.findFirst({
    where: eq(media.fileHash, fileHash),
  });

  if (existingMedia) {
    // Duplicate file detected for hash: ${fileHash}. Returning existing record.
    return {
      id: existingMedia.id,
      url: existingMedia.url,
      alt: existingMedia.alt || alt,
      media_type: existingMedia.mediaType as "image" | "video",
      providerAssetId: existingMedia.providerAssetId || "N/A",
      storageProvider: existingMedia.storageProvider as "CLOUDINARY" | "S3",
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

  const [newMedia] = await db
    .insert(media)
    .values({
      url: uploadResult.url,
      mediaType: uploadResult.media_type,
      description: uploadResult.alt,
      alt: uploadResult.alt,
      providerAssetId: uploadResult.providerAssetId,
      storageProvider: uploadResult.storageProvider,
      fileHash: fileHash,
    })
    .returning();

  return {
    ...uploadResult,
    id: newMedia.id,
    url: newMedia.url,
    alt: newMedia.alt || alt,
  };
}
