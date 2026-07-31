/**
 * @type {import('next').NextConfig}
 */

// Every route that calls getPayload() (home page, /projects, /studio,
// /payload-demo, /api/*, ...) traces in every platform's optional native
// binaries for both sharp (@img/sharp-*, Payload's Media/Sharp config) and
// esbuild (@esbuild/*, pulled in at runtime via Payload's own "tsx"
// dependency, used to load payload.config.ts). Only linux-x64 is ever
// actually needed on Vercel; the rest (win32, darwin, musl, arm, riscv64,
// aix, sunos, ...) blew every Payload-touching function well past Vercel's
// 250MB serverless function size limit.
//
// This repo uses pnpm, so these packages physically live under pnpm's
// virtual store (node_modules/.pnpm/<pkg>+<name>@<version>/node_modules/...),
// not the flat node_modules/<scope>/<name> path — the glob has to match the
// real location, with the version wildcarded.
const unwantedSharpPlatforms = [
  'sharp-darwin-arm64',
  'sharp-darwin-x64',
  'sharp-freebsd-wasm32',
  'sharp-libvips-darwin-arm64',
  'sharp-libvips-darwin-x64',
  'sharp-libvips-linux-arm',
  'sharp-libvips-linux-arm64',
  'sharp-libvips-linux-ppc64',
  'sharp-libvips-linux-riscv64',
  'sharp-libvips-linux-s390x',
  'sharp-libvips-linuxmusl-arm64',
  'sharp-libvips-linuxmusl-x64',
  'sharp-linux-arm',
  'sharp-linux-arm64',
  'sharp-linux-ppc64',
  'sharp-linux-riscv64',
  'sharp-linux-s390x',
  'sharp-linuxmusl-arm64',
  'sharp-linuxmusl-x64',
  'sharp-wasm32',
  'sharp-webcontainers-wasm32',
  'sharp-win32-arm64',
  'sharp-win32-ia32',
  'sharp-win32-x64',
];

const unwantedEsbuildPlatforms = [
  'aix-ppc64',
  'android-arm',
  'android-arm64',
  'android-x64',
  'darwin-arm64',
  'darwin-x64',
  'freebsd-arm64',
  'freebsd-x64',
  'linux-arm',
  'linux-arm64',
  'linux-ia32',
  'linux-loong64',
  'linux-mips64el',
  'linux-ppc64',
  'linux-riscv64',
  'linux-s390x',
  'netbsd-arm64',
  'netbsd-x64',
  'openbsd-arm64',
  'openbsd-x64',
  'openharmony-arm64',
  'sunos-x64',
  'win32-arm64',
  'win32-ia32',
  'win32-x64',
];

const pnpmGlob = (scope, name) =>
  `./node_modules/.pnpm/${scope}+${name}@*/node_modules/${scope}/${name}/**/*`;

const unwantedNativeBinaryGlobs = [
  ...unwantedSharpPlatforms.map((name) => pnpmGlob('@img', name)),
  ...unwantedEsbuildPlatforms.map((name) => pnpmGlob('@esbuild', name)),
];

const wantedNativeBinaryGlobs = [
  './node_modules/sharp/**/*',
  pnpmGlob('@img', 'sharp-linux-x64'),
  pnpmGlob('@img', 'sharp-libvips-linux-x64'),
  pnpmGlob('@esbuild', 'linux-x64'),
];

const nextConfig = {
  env: {
    DATABASE_URL: process.env.DATABASE_URL ?? "",
  },
  reactStrictMode: true,
  // Sharp ships native .so binaries (libvips) that Next's build tracer can
  // fail to bundle correctly for serverless deployment — this tells Next to
  // leave it external instead, so Node's own module resolution handles it.
  serverExternalPackages: ['sharp'],
  // See unwantedNativeBinaryGlobs/wantedNativeBinaryGlobs above. Applied to
  // every route ('**/*') since it's not just /studio or /api — any page
  // component that fetches from Payload hits this.
  outputFileTracingExcludes: {
    '**/*': unwantedNativeBinaryGlobs,
  },
  // Explicitly keep the linux-x64 binaries Vercel actually runs on, in case
  // the exclude globs above are ever broadened accidentally.
  outputFileTracingIncludes: {
    '**/*': wantedNativeBinaryGlobs,
  },
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
