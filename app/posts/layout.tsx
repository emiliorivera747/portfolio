export const metadata = {
  title: "Posts | Emilio Rivera's Portfolio",
  description:
    "Browse a collection of posts showcasing Emilio Rivera's projects, experiences, and insights. Discover detailed write-ups and updates on topics including public speaking, software engineering, and more",
};

import { navBarData } from "@/utils/data/navbar/navbarData";
import Navbar from "@/components/navbar/Navbar";

/**
 *
 * The layout page for my-portfolio
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
