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
// Only a genuine media extension gets stripped. The obvious `/\.[^/.]+$/`
// treats any trailing dot-segment as an extension, which mangles the public
// IDs Payload generates from real filenames — a macOS screenshot uploads as
// "payload/Screenshot 2026-08-22 at 7.09.38 PM", and that rule cut it back to
// "...at 7.09", which is not a resource that exists.
const MEDIA_EXTENSION =
  /\.(?:jpe?g|png|gif|webp|avif|svg|ico|bmp|tiff?|heic|mp4|webm|mov|m4v|ogg|pdf)$/i;

export function cloudinaryPublicId(url: string): string {
  const match = url.match(/\/(?:image|video|raw)\/upload\/(?:v\d+\/)?(.+)$/);
  if (!match) return url;
  return match[1].replace(MEDIA_EXTENSION, "");
}
