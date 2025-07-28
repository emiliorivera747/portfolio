import type { AppProps } from 'next/app';
import "@/styles/globals.css";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

import Navbar from "../components/Navbar";
import Head from "next/head";
import { navBarData } from "@/utils/data/navbar/navbarData";

/**
 *  Main App component that wraps around all pages.
 * 
 * @param {*} param0 
 * @returns 
 */
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Convert navBarData id to string for Navbar prop compatibility
  const navBarDataStringId = navBarData.map((item) => ({
    ...item,
    id: String(item.id),
    content: item.content?.map((subItem) => ({ ...subItem, id: String(subItem.id) })) || [],
  }));

  return (
    <AnimatePresence mode="wait">
      <motion.div key={router.pathname} {...({ className: "h-auto" } as any)}>
        <Head>
          <link rel="shortcut icon" href="/favicon.png" />
        </Head>
        <Navbar menuItems={navBarDataStringId} />
        <Component {...pageProps} />
        <motion.div
          {...({
            className: "absolute top-0 left-0 w-screen h-screen bg-black z-50",
            initial: { scaleY: 0 },
            animate: { scaleY: 0 },
            exit: { scaleY: 1 },
            transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
          } as any)}
        />
      </motion.div>
    </AnimatePresence>
  );
}
