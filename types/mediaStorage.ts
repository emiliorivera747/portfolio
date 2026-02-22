export type MediaUploadResult = {
  id: string | number,
  url: string;
  alt: string;
  mediaType: "image" | "video";
  providerAssetId: string;
  storageProvider: "CLOUDINARY" | "S3";
};
