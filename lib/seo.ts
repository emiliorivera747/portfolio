// Shared SEO primitives. Kept in one place so the canonical host, the site
// name and the social-card defaults can't drift between pages.

// Trailing slashes are stripped so `${SITE_URL}/work` can never come out as
// a double-slashed URL, which search engines treat as a separate page.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_BASE_URL || "https://emilioulisesrivera.com"
).replace(/\/+$/, "");

export const SITE_NAME = "Emilio Rivera's Portfolio";
export const AUTHOR_NAME = "Emilio Rivera";
export const AUTHOR_JOB_TITLE = "Software Engineer";
export const AUTHOR_LOCATION = "San Jose, CA";

// Fallback social card. Cloudinary is already serving the site's imagery, so
// the hero art doubles as the default OG image rather than adding an asset.
export const DEFAULT_OG_IMAGE =
  "https://res.cloudinary.com/dcss55nem/image/upload/c_fill,w_1200,h_630/v1776990294/Untitled_design_11_apepib.png";

/** Absolute URL for a site-relative path — Open Graph and JSON-LD both need one. */
export function absoluteUrl(path = "/"): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Canonical + Open Graph + Twitter for one page, in the shape Next's Metadata
 * API expects. Every page that sets a title should call this, so each URL
 * declares exactly one canonical and ships a complete social card.
 */
export function pageMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  publishedTime,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
}) {
  const url = absoluteUrl(path);
  const ogImage = image || DEFAULT_OG_IMAGE;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      images: [ogImage],
    },
  };
}
