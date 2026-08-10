import { SITE_NAME, pageMetadata } from "@/lib/seo";

export const metadata = {
  ...pageMetadata({
    title: "Work",
    description:
      "Client and product work by Emilio Rivera spanning web applications, design systems, and community initiatives.",
    path: "/work",
  }),
  // A plain-string title in an intermediate layout doesn't hand the root
  // layout's template down to that branch, so /work/[slug] came out with no
  // site name on it. Declaring the template here restores it for children,
  // while `default` covers this segment's own page.
  title: {
    default: "Work",
    template: `%s | ${SITE_NAME}`,
  },
};

import { getNavBarData } from "@/lib/navbar";
import Navbar from "@/components/navbar/Navbar";

/**
 *
 * The layout page for my-portfolio
 *
 * @param {React.ReactNode} children
 * @returns layout
 */
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menuItems = await getNavBarData();
  return (
    <div>
      <main>
        <Navbar menuItems={menuItems} mode="dark"/>
        {children}
      </main>
    </div>
  );
}
