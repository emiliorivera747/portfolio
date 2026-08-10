import type { Metadata } from "next";
import NotFoundContent from "@/components/NotFoundContent";
import { BRAND_NAME } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Page Not Found | ${BRAND_NAME}`,
};

// Catches notFound() thrown inside the site's routes — a project or blog slug
// that doesn't resolve, for instance. URLs matching no route at all are handled
// by app/global-not-found.tsx, which renders the same component.
export default function NotFound() {
  return <NotFoundContent />;
}
