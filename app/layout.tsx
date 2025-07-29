
import "../styles/globals.css";

export const metadata = {
  icons: {
    icon: '/favicon.ico',
    
  },
  title: "Home | Emilio Rivera Portfolio",
  description:
    "Welcome to Emilio Rivera's Portfolio, a Software Engineer based in San Jose, CA. specializing in React.js, Next.js, and Node.js.",
};


//Data
import { navBarData } from "@/utils/data/navbar/navbarData";
import Navbar from "../components/Navbar";

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
