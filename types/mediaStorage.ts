export type MediaUploadResult = {
    url: string;
    alt: string;
    type: "image" | "video";
    providerAssetId: string;
    storageProvider: "CLOUDINARY" | "S3";
  };