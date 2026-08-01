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

// Everything is Cloudinary-hosted now, but a handful of images (blog covers,
// testimonial photos) still render through plain next/image, so callers use
// this to decide which component to reach for.
export function isCloudinaryUrl(url: string): boolean {
  return url.includes("cloudinary.com");
}

// CldImage wants a Cloudinary *public ID*, not a delivery URL. It can recover
// the ID from the URLs pasted into the CMS by hand, which carry a version and
// an extension (.../upload/v1701048415/nextjs-black.png) — but not from the
// ones Payload's storage adapter generates, which carry neither
// (.../upload/payload/auth0-login-dialog). Those fail with "Resource not
// found". Extracting the ID ourselves handles both shapes.
export function cloudinaryPublicId(url: string): string {
  const match = url.match(/\/(?:image|video|raw)\/upload\/(?:v\d+\/)?(.+)$/);
  if (!match) return url;
  return match[1].replace(/\.[^/.]+$/, "");
}
