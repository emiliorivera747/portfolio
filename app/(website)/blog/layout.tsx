import { SITE_NAME, pageMetadata } from "@/lib/seo";

export const metadata = {
  ...pageMetadata({
    title: "Blog",
    description:
      "Writing on software engineering, projects, and lessons learned.",
    path: "/blog",
  }),
  // See the note in work/layout.tsx — an intermediate plain-string title stops
  // the root template reaching this branch's children (/blog/[slug]).
  title: {
    default: "Blog",
    template: `%s | ${SITE_NAME}`,
  },
};

/**
 *
 * The layout for the blog section. Each page (list, post) renders its own
 * Navbar since they need different modes (the post page toggles dark mode).
 *
 * @param {React.ReactNode} children
 * @returns layout
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
}
