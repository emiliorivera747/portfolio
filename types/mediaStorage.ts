export type MediaUploadResult = {
  url: string;
  alt: string;
  media_type: "image" | "video";
  providerAssetId: string;
  storageProvider: "CLOUDINARY" | "S3";
};
