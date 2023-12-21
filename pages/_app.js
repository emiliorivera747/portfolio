import "../styles/globals.scss";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import { Open_Sans } from "next/font/google";
import { ToastContainer } from "react-toastify";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
const openSans = Open_Sans({ subsets: ["latin"], weight: ["400"] });
export default function App({ Component, pageProps }) {
  const router = useRouter();
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
    <AnimatePresence mode="wait">
      <motion.div key={router.pathname} className={openSans.className}>
        <Head>
          <link rel="shortcut icon" href="/favicon.png" />
        </Head>
        <Navbar menuItems={navBarData} />
        <Component {...pageProps} />
        <ToastContainer />
        <motion.div
          className="absolute top-0 left-0 w-screen h-screen bg-black z-50"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 1 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        ></motion.div>
        <Analytics />
        <SpeedInsights />
      </motion.div>
    </AnimatePresence>
  );
}
