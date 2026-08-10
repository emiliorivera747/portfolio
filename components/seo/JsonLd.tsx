import {
  AUTHOR_JOB_TITLE,
  AUTHOR_LOCATION,
  AUTHOR_NAME,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
} from "@/lib/seo";

/**
 * Emits a JSON-LD block. Structured data is what lets a search engine show a
 * result as something richer than a blue link — an author card, an article
 * with a date, a breadcrumb trail.
 *
 * The payload is serialised rather than interpolated loosely, and the script
 * type keeps the browser from executing it.
 */
function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // The content is built here from typed values, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Identity for the site owner — the entity every page ultimately describes. */
export function PersonJsonLd({ sameAs = [] }: { sameAs?: string[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Person",
        name: AUTHOR_NAME,
        url: SITE_URL,
        jobTitle: AUTHOR_JOB_TITLE,
        address: {
          "@type": "PostalAddress",
          addressLocality: AUTHOR_LOCATION,
        },
        ...(sameAs.length ? { sameAs } : {}),
      }}
    />
  );
}

/** Declares the site itself, which is what enables a sitelinks search box. */
export function WebSiteJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: SITE_NAME,
        url: SITE_URL,
        author: { "@type": "Person", name: AUTHOR_NAME },
      }}
    />
  );
}

export function ArticleJsonLd({
  title,
  description,
  path,
  image,
  datePublished,
  dateModified,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: title,
        description,
        url: absoluteUrl(path),
        mainEntityOfPage: absoluteUrl(path),
        ...(image ? { image: [image] } : {}),
        ...(datePublished ? { datePublished } : {}),
        ...(dateModified ? { dateModified } : {}),
        author: { "@type": "Person", name: AUTHOR_NAME, url: SITE_URL },
        publisher: { "@type": "Person", name: AUTHOR_NAME, url: SITE_URL },
      }}
    />
  );
}

/** A case study — CreativeWork is the closest fit for a portfolio project. */
export function ProjectJsonLd({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: title,
        description,
        url: absoluteUrl(path),
        ...(image ? { image: [image] } : {}),
        creator: { "@type": "Person", name: AUTHOR_NAME, url: SITE_URL },
      }}
    />
  );
}

/** Breadcrumbs render as a path under the result instead of a bare URL. */
export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: absoluteUrl(item.path),
        })),
      }}
    />
  );
}
