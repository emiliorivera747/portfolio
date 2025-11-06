// // @/services/media-storage/s3-service.ts
// // (You'll need to install: npm install @aws-sdk/client-s3)

// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
// import { MediaUploadResult } from "@/types/mediaStorage";
// import { v4 as uuidv4 } from "uuid"; // npm install uuid @types/uuid

// const s3Client = new S3Client({
//   region: process.env.AWS_S3_REGION,
//   credentials: {
//     accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID!,
//     secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY!,
//   },
// });

// const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME!;

// type UploadParams = {
//   fileBuffer: Buffer;
//   fileType: string;
//   alt: string;
// };

// export async function uploadToS3(
//   params: UploadParams
// ): Promise<MediaUploadResult> {
//   const { fileBuffer, fileType, alt } = params;

//   // Generate a unique file key
//   const fileExtension = fileType.split("/")[1] || "bin";
//   const fileKey = `blog-uploads/${uuidv4()}.${fileExtension}`;

//   const command = new PutObjectCommand({
//     Bucket: BUCKET_NAME,
//     Key: fileKey,
//     Body: fileBuffer,
//     ContentType: fileType,
//     Metadata: {
//       alt: alt, // You can store alt text here
//     },
//   });

//   try {
//     await s3Client.send(command);

//     const fileUrl = `https://s3.${process.env.AWS_S3_REGION}.amazonaws.com/${BUCKET_NAME}/${fileKey}`;

//     // Determine media_type
//     const media_type = fileType.startsWith("image") ? "image" : "video";

//     return {
//       url: fileUrl,
//       alt: alt,
//       media_type: media_type,
//       providerAssetId: fileKey, // For S3, the "public_id" is the Key
//       storageProvider: "S3",
//     };
//   } catch (error) {
//     const errorMessage =
//       error instanceof Error && error.message ? error.message : "Unknown error";
//     throw new Error(`Failed to upload media to S3: ${errorMessage}`);
//   }
// }
