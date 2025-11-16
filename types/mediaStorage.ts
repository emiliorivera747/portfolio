export type MediaUploadResult = {
  id: string | number,
  url: string;
  alt: string;
  media_type: "image" | "video";
  providerAssetId: string;
  storageProvider: "CLOUDINARY" | "S3";
};
