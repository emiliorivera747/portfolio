export const metadata = {
  title: "Blog | Emilio Rivera's Portfolio",
  description: "Writing on software engineering, projects, and lessons learned.",
};

import { navBarData } from "@/utils/data/navbar/navbarData";
import Navbar from "@/components/navbar/Navbar";

/**
 *
 * The layout for the blog page
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
      <main>
        <Navbar menuItems={navBarData} mode="dark" />
        {children}
      </main>
    </div>
  );
}
