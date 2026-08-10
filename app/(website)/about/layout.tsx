import { pageMetadata } from "@/lib/seo";

export const metadata = {
  ...pageMetadata({
    title: "About",
    description:
      "Discover Emilio Rivera's journey as a Software Engineer, his skills, and his passion for technology, public speaking, and continuous learning.",
    path: "/about",
  }),
  keywords: [
    "Emilio Rivera",
    "Software Engineer",
    "About Me",
    "Technology",
    "Public Speaking",
    "Continuous Learning",
    "Portfolio",
  ],
};

// Data
import { getNavBarData } from "@/lib/navbar";
import Navbar from "@/components/navbar/Navbar";

/**
 *
 * Layout for the about me page
 *
 * @param children - in this case would be the about page
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
        <Navbar menuItems={menuItems} mode={'light'}/>
        {children}
      </main>
    </div>
  );
}
