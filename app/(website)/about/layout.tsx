export const metadata = {
  title: "About | Emilio Rivera's Portfolio",
  description:
    "Discover Emilio Rivera's journey as a Software Engineer, his skills, and his passion for technology, public speaking, and continuous learning.",
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
import { navBarData } from "@/utils/data/navbar/navbarData";
import Navbar from "@/components/navbar/Navbar";

/**
 *
 * Layout for the about me page
 *
 * @param children - in this case would be the about page
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
        <Navbar menuItems={navBarData} mode={'light'}/>
        {children}
      </main>
    </div>
  );
}
