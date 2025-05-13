import "@/styles/globals.css";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

import Navbar from "../components/Navbar";
import { ToastContainer } from "react-toastify";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const navBarData = [
    {
      id: 2,
      label: "Projects",
      url: "/projects",
      content: [
        {
          id: 1,
          label: "Casa Chirilagua",
          url: "/casa-chirilagua",
        },
        {
          id: 2,
          label: "Portfolio",
          url: "/my-portfolio",
        },
      ],
    },
    {
      id: 3,
      label: "About",
      url: "/about",
      content: [
        {
          id: 1,
          label: "About Me",
          url: "/about",
        },
        {
          id: 2,
          label: "Contact",
          url: "/#",
        },
      ],
    },
  ];
  return (
    <AnimatePresence mode="wait">
      <motion.div key={router.pathname} className={"h-auto"}>
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
        />
      </motion.div>
    </AnimatePresence>
  );
}
