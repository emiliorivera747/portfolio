export const metadata = {
  title: "Work | Emilio Rivera's Portfolio",
  description:
    "Client and product work by Emilio Rivera spanning web applications, design systems, and community initiatives.",
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
