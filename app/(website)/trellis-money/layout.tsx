export const metadata = {
  title: "Trellis Money | Emilio Rivera's Portfolio",
  description:
    "Trellis Money is a financial platform helping families build wealth and access financial tools.",
};

import { navBarData } from "@/utils/data/navbar/navbarData";
import Navbar from "@/components/navbar/Navbar";

/**
 *
 * The Trellis Money layout page
 *
 * @param {React.ReactNode} children
 * @returns layout for Trellis Money
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
