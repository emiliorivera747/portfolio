export const metadata = {
  title: "Cipotes Sonriendo Foundation | Emilio Rivera's Portfolio",
  description: "Website for the Cipotes Sonriendo Foundation.",
};

import { navBarData } from "@/utils/data/navbar/navbarData";
import Navbar from "@/components/navbar/Navbar";

/**
 *
 * The Cipotes Sonriendo Foundation layout page
 *
 * @param {React.ReactNode} children
 * @returns layout for Cipotes Sonriendo Foundation
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
