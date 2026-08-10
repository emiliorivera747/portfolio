import "../../styles/globals.css";
import Script from "next/script";
import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import {
  AUTHOR_JOB_TITLE,
  AUTHOR_NAME,
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";

import { Toaster } from "@/components/ui/sonner";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  // 200 is loaded so font-extralight renders a real ExtraLight cut. Without it
  // the browser fakes the weight off the 300 file, which is why extralight
  // text used to look subtly wrong rather than genuinely lighter.
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  // Without metadataBase, Next can't turn a relative image or canonical into
  // an absolute URL, and Open Graph requires absolute URLs to resolve at all.
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: "/favicon.png",
  },
  // Pages set a bare title (e.g. "Work") and the template appends the site
  // name, so every tab and search result reads consistently without each page
  // repeating the suffix.
  title: {
    default: `${AUTHOR_NAME} — ${AUTHOR_JOB_TITLE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Welcome to Emilio Rivera's Portfolio, a Software Engineer based in San Jose, CA. specializing in React.js, Next.js, and Node.js.",
  applicationName: SITE_NAME,
  authors: [{ name: AUTHOR_NAME, url: SITE_URL }],
  creator: AUTHOR_NAME,
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: SITE_URL,
    title: `${AUTHOR_NAME} — ${AUTHOR_JOB_TITLE}`,
    description:
      "Software Engineer based in San Jose, CA, specializing in React.js, Next.js, and Node.js.",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${AUTHOR_NAME} — ${AUTHOR_JOB_TITLE}`,
    description:
      "Software Engineer based in San Jose, CA, specializing in React.js, Next.js, and Node.js.",
    images: [DEFAULT_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// Components
import { ReactQueryClientProvider } from "@/features/react-query/components/ReactQueryClientProvider";
import { TooltipProvider } from "@/components/ui/tooltip";

/**
 *
 * The root layout for all of the pages
 *
 * @param children - the child componeent in this case woul be the page.tsx
 * @returns root layout
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryClientProvider>
      <TooltipProvider>
        <html lang="en" suppressHydrationWarning>
          <head>
            <Script
              async
              src="https://www.googletagmanager.com/gtag/js?id=G-R0GTFSV0LN"
            ></Script>
            <Script id="google-analytics">
              {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-R0GTFSV0LN');`}
            </Script>
          </head>
          <body className={nunitoSans.className}>
            {children}
            <Toaster />
          </body>
        </html>
      </TooltipProvider>
    </ReactQueryClientProvider>
  );
}
