import "../styles/globals.scss";
import Navbar from "@/components/Navbar";
import { Open_Sans } from "next/font/google";
import { ToastContainer } from "react-toastify";
import Head from "next/head";
const openSans = Open_Sans({ subsets: ["latin"], weight: ["400"] });
export default function App({ Component, pageProps }) {
  const navBarData = [
    {
      id: 1,
      label: "Home",
      url: "/",
    },
    {
      id: 2,
      label: "Projects",
      url: "/projects",
    },
    {
      id: 3,
      label: "About",
      url: "/about",
    },
  ];
  return (
    <div className={openSans.className}>
      {" "}
      <Head>
          <link rel="shortcut icon" href="/favicon.png" />
        </Head>
      <Navbar menuItems={navBarData} />
      <Component {...pageProps} />
      <ToastContainer />
    </div>
  );
}
