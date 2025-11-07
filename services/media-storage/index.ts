// @/services/media-storage/index.ts

import { MediaUploadResult } from "@/types/mediaStorage";
import { uploadToCloudinary } from "@/services/media-storage/cloudinary-service";
// import { uploadToS3 } from "./s3-service";

type UploadParams = {
  fileBuffer: Buffer;
  fileType: string;
  alt: string;
};

// This is your new "single point of truth" for uploads.
// Your API route will ONLY call this function.
export async function uploadMedia(
  params: UploadParams
): Promise<MediaUploadResult> {
  const provider = process.env.STORAGE_PROVIDER;

  // if (provider === "S3") {
  //   // Call the S3-specific function
  //   return await uploadToS3(params);
  // }

  if (provider === "CLOUDINARY") return await uploadToCloudinary(params);

  // Default to Cloudinary if no provider is set
  if (process.env.NODE_ENV === "development") {
    console.warn(
      "No STORAGE_PROVIDER set. Defaulting to CLOUDINARY. Set STORAGE_PROVIDER in .env.local (e.g., 'CLOUDINARY' or 'S3')"
    );
  }
  return await uploadToCloudinary(params);
}
