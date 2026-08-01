import type { Media } from "@/payload-types";

// Matches the fields `imageSourceFields()` adds in payload.config.ts: the
// item stores either a pasted URL or an uploaded Media doc, and `imageSource`
// says which one to read.
export type ImageSourceEntry = {
  imageSource?: ("url" | "upload") | null;
  imageUrl?: string | null;
  image?: (number | null) | Media;
};

// Returns "" when the image can't be resolved — an upload chosen but not yet
// populated (the query needs depth >= 1 for that), or a missing URL.
export function resolveImageUrl(entry: ImageSourceEntry): string {
  if (entry.imageSource === "upload") {
    return typeof entry.image === "object" && entry.image?.url
      ? entry.image.url
      : "";
  }
  return entry.imageUrl ?? "";
}

// Uploaded images live in S3, which CldImage can't serve — it only builds
// Cloudinary delivery URLs. Callers use this to pick the right <Image>.
export function isCloudinaryUrl(url: string): boolean {
  return url.includes("cloudinary.com");
}
