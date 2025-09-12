export const metadata = {
  title: "About | Emilio Rivera's Portfolio",
  description:
    "Welcome to the about page where you can learn more about Emilio Rivera's Software Engineering journey. As well as his other hobbies and interest",
};

// Data
import { navBarData } from "@/utils/data/navbar/navbarData";
import Navbar from "@/components/navbar/Navbar";
<Navbar menuItems={navBarData}  />

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
        <Navbar menuItems={navBarData} mode={'dark'}/>
        {children}
      </main>
    </div>
  );
}
