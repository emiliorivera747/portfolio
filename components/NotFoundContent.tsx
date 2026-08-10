import Image from "next/image";
import Link from "next/link";
import { BRAND_LOGO_URL, BRAND_NAME } from "@/lib/brand";

// Somewhere to go other than "back" — a dead end with no exits is the real
// problem with a default 404, more than how it looks.
const destinations = [
  { label: "Home", href: "/", description: "Start from the top" },
  { label: "Work", href: "/work", description: "Projects and case studies" },
  { label: "About", href: "/about", description: "How I got here" },
  { label: "Blog", href: "/blog", description: "Writing and notes" },
];

/**
 * The 404 UI itself, with no page shell around it.
 *
 * Shared by two entry points that Next treats very differently:
 * `app/(website)/not-found.tsx` catches notFound() inside the site's routes,
 * while `app/global-not-found.tsx` catches URLs that match no route at all.
 * The site has two root layouts, so there's no single layout the global case
 * could compose from — hence one component rendered into both.
 */
export default function NotFoundContent() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-white flex flex-col items-center justify-center px-6 py-16">
      {/* Soft radial wash behind the numerals, so the page has some depth
          without needing an image asset. secondary.100 rather than
          primary.100 — the latter is #f8f9fa, invisible against white.
          aria-hidden: pure decoration. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,theme(colors.secondary.100),transparent_60%)]"
      />

      <div className="relative flex flex-col items-center text-center max-w-xl">
        <Link
          href="/"
          aria-label={`${BRAND_NAME} home`}
          className="flex items-center gap-3 mb-10 rounded-lg p-2 transition-colors hover:bg-primary-100"
        >
          <Image
            src={BRAND_LOGO_URL}
            width={40}
            height={40}
            alt=""
            aria-hidden="true"
            priority
          />
          <span className="font-bold tracking-widest text-primary-1000 text-sm sm:text-base">
            {BRAND_NAME}
          </span>
        </Link>

        <p className="text-8xl sm:text-9xl font-bold leading-none bg-gradient-to-r from-primary-1000 to-primary-800 bg-clip-text text-transparent">
          404
        </p>

        <h1 className="mt-6 text-2xl sm:text-3xl font-bold text-primary-1000">
          This page took a wrong turn.
        </h1>
        <p className="mt-3 text-primary-800 font-light leading-relaxed tracking-wide">
          The page you&apos;re looking for doesn&apos;t exist, or it moved
          somewhere else. Here&apos;s where you might be headed instead.
        </p>

        <nav
          aria-label="Suggested pages"
          className="mt-10 grid grid-cols-2 gap-3 w-full"
        >
          {destinations.map((destination) => (
            <Link
              key={destination.href}
              href={destination.href}
              className="group flex flex-col items-start rounded-[12px] border border-primary-300 bg-white px-4 py-3 text-left shadow-sm transition-all duration-300 hover:shadow-lg hover:border-primary-600"
            >
              <span className="font-semibold text-primary-1000 text-sm sm:text-base">
                {destination.label}
              </span>
              <span className="text-primary-700 font-light text-xs sm:text-sm">
                {destination.description}
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </main>
  );
}
