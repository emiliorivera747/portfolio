export const metadata = {
  title: "Portfolio | Emilio Rivera's Portfolio",
  description:
    "Explore Emilio Rivera's personal portfolio website — a showcase of his skills, projects, and experience as a Software Engineer.",
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
