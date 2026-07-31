/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  env: {
    DATABASE_URL: process.env.DATABASE_URL ?? "",
  },
  reactStrictMode: true,
  // Sharp ships native .so binaries (libvips) that Next's build tracer can
  // fail to bundle correctly for serverless deployment — this tells Next to
  // leave it external instead, so Node's own module resolution handles it.
  serverExternalPackages: ['sharp'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: '*.amazonaws.com',
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
  // Project pages moved from flat top-level routes to /projects/[slug].
  async redirects() {
    return [
      { source: '/casa-chirilagua', destination: '/projects/casa-chirilagua', permanent: true },
      { source: '/trellis-money', destination: '/projects/trellis-money', permanent: true },
      { source: '/cipotes-sonriendo-foundation', destination: '/projects/cipotes-sonriendo-foundation', permanent: true },
      { source: '/my-portfolio', destination: '/projects/my-portfolio', permanent: true },
    ];
  },
};

import bundleAnalyzer from '@next/bundle-analyzer';
import { withPayload } from '@payloadcms/next/withPayload';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withPayload(withBundleAnalyzer(nextConfig));
