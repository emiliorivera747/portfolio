import "../styles/globals.css";
import { Nunito_Sans } from "next/font/google";
import type { Metadata } from "next";
import NotFoundContent from "@/components/NotFoundContent";
import { BRAND_NAME } from "@/lib/brand";

// This file bypasses the app's normal rendering entirely, so nothing from
// app/(website)/layout.tsx applies — global styles and the font have to be
// pulled in here or the page renders unstyled in a default serif.
//
// It exists because the app has two root layouts, (website) and (payload), so
// there is no single layout a global 404 could be composed from. Enabled by
// `experimental.globalNotFound` in next.config.js.
const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

export const metadata: Metadata = {
  title: `Page Not Found | ${BRAND_NAME}`,
  description: "The page you are looking for does not exist.",
};

// Unlike not-found.tsx, this must return a complete HTML document.
export default function GlobalNotFound() {
  return (
    <html lang="en" className={nunitoSans.className}>
      <body>
        <NotFoundContent />
      </body>
    </html>
  );
}
