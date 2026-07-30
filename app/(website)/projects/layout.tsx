export const metadata = {
  title: "Projects | Emilio Rivera's Portfolio",
  description:
    "A collection of projects by Emilio Rivera spanning web applications, design systems, and community initiatives.",
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
        <Navbar menuItems={navBarData} mode="dark"/>
        {children}
      </main>
    </div>
  );
}
