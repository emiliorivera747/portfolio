export const metadata = {
  title: "Blog | Emilio Rivera's Portfolio",
  description:
    "Writing on software engineering, projects, and lessons learned.",
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
