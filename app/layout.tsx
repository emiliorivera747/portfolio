
import "../styles/globals.css";

export const metadata = {
  icons: {
    icon: '/favicon.png',
    
  },
  title: "Home | Emilio Rivera Portfolio",
  description:
    "Welcome to Emilio Rivera's Portfolio, a Software Engineer based in San Jose, CA. specializing in React.js, Next.js, and Node.js.",
};


//Data
import { navBarData } from "@/utils/data/navbar/navbarData";
import Navbar from "../components/navbar/Navbar";


/**
 * 
 * The root layout for all of the pages 
 * 
 * @param children - the child componeent in this case woul be the page.tsx
 * @returns root layout
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body>
        <Navbar menuItems={navBarData} />
        {children}
      </body>
    </html>
  );
}
