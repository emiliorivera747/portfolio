import { v2 as cloudinary } from "cloudinary";

import { MediaUploadResult } from "@/types/mediaStorage";

// --- Cloudinary Configuration ---
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Uploads the file to cloudinary
 * @param dataUri The Base64/Data URI string of the file.
 * @param altText The alt text/description for the file.
 * @returns A standardized MediaUploadResult object.
 */
export async function uploadToCloudinary(
  dataUri: string,
  altText: string
): Promise<MediaUploadResult> {
  try {
    const uploadResult = await cloudinary.uploader.upload(dataUri, {
      folder: "blog-uploads",
      resource_type: "auto",
    });

    return {
      url: uploadResult.secure_url,
      alt: altText,
      type: uploadResult.resource_type === "image" ? "image" : "video",
      providerAssetId: uploadResult.public_id,
      storageProvider: "CLOUDINARY",
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error && error.message ? error.message : "Unknown error";
    throw new Error(`Failed to upload media: ${errorMessage}`);
  }
}
