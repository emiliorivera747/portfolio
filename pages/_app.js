import "../styles/globals.scss";
import Navbar from "@/components/Navbar";
import { Open_Sans} from 'next/font/google';

const openSans = Open_Sans({ subsets: ['latin'], weight: ['400'] });
export default function App({ Component, pageProps }) {
  const navBarData = [
    {
      id: 1,
      label: "Projects",
      url: "/projects",
    },
    {
      id: 2, 
      label: "About",
      url: "/about",
    },
  ];
  return (
    <div className={openSans.className}>
      {" "}
      <Navbar menuItems={navBarData} />
      <Component {...pageProps} />
    </div>
  );
}
