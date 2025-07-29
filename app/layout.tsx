import "../styles/globals.css";

export const metadata = {
  title: "Home | Emilio Rivera Portfolio",
  description:
    "Welcome to Emilio Rivera Portfolio, a Full Stack Engineer based in San Jose, CA. specializing in React.js, Next.js, and Node.js.",
};

//Data
import { navBarData } from "@/utils/data/navbar/navbarData";
import Navbar from "../components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navBarDataStringId = navBarData.map((item) => ({
    ...item,
    id: String(item.id),
    content:
      item.content?.map((subItem) => ({
        ...subItem,
        id: String(subItem.id),
      })) || [],
  }));
  return (
    <html lang="en">
      <body>
        <Navbar menuItems={navBarDataStringId} />
        {children}
      </body>
    </html>
  );
}
