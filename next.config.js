/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  env: {
    DATABASE_URL: process.env.DATABASE_URL ?? "",
  },
  reactStrictMode: true,
  experimental: {
    // Enables app/global-not-found.tsx. Needed because this app has two root
    // layouts — (website) and (payload) — so there's no single layout a 404 for
    // unmatched URLs could be composed from.
    globalNotFound: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  // Improve build performance
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  // Project pages have moved twice: first from flat top-level routes to
  // /projects/[slug], and now to /work/[slug]. Both generations of URL are
  // pointed straight at the current one rather than chained through each
  // other, so any inbound link costs a single redirect.
  async redirects() {
    return [
      { source: '/projects', destination: '/work', permanent: true },
      { source: '/projects/:slug', destination: '/work/:slug', permanent: true },
      { source: '/casa-chirilagua', destination: '/work/casa-chirilagua', permanent: true },
      { source: '/trellis-money', destination: '/work/trellis-money', permanent: true },
      { source: '/cipotes-sonriendo-foundation', destination: '/work/cipotes-sonriendo-foundation', permanent: true },
      { source: '/my-portfolio', destination: '/work/my-portfolio', permanent: true },
    ];
  },
};

import bundleAnalyzer from '@next/bundle-analyzer';
import { withPayload } from '@payloadcms/next/withPayload';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withPayload(withBundleAnalyzer(nextConfig));
