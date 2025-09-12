"use client";
import React, { useState } from "react";

// External Lib
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

// Next.js
import Link from "next/link";

// Types
import { MenuItem, SubMenuItem, NavbarProps } from "@/types/navbar";

// Components
import NavbarLogo from "@/components/navbar/NavbarLogo";
import NavMenu from "@/components/navbar/NavMenu";

/**
 *  Displays the main navigation bar.
 *
 * @param menuItems - Items for  the navigation bar
 * @returns Navbar
 */
export default function Navbar({ menuItems, mode = "light" }: NavbarProps) {
  const { scrollY } = useScroll();

  const [hidden, setHidden] = useState(false);
  const [bgColor, setBgColor] = useState("bg-transparent");
  const [openMenu, setOpenMenu] = useState(false);
  const [openClass, setOpenClass] = useState("");
  const [isHidden, setIsHidden] = useState("hidden");
  const [logoTextColor, setLogoTextColor] = useState("text-black");
  const [logoBgColor, setLogoBgColor] = useState("hover:bg-zinc-800");
  const [menuTextColor, setMenuTextColor] = useState("text-white");
  const [hamburgerBgColor, setHamburgerBgColor] = useState(
    mode === "light" ? "bg-white" : "bg-primary-800"
  );
  const [navbarClass, setNavbarClass] = useState(
    "backdrop-blur bg-tertiary-300/80"
  );

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();

    if (latest > previous && latest > 150) {
      setHidden(true);
      setIsHidden("hidden");
      setOpenClass("");
    } else {
      setHidden(false);
    }

    if (latest > 600) {
      setNavbarClass("backdrop-blur bg-tertiary-300/80");
      setMenuTextColor(mode === "light" ? "text-zinc-800" : "text-white");
    } else {
      setNavbarClass("bg-transparent");
      setMenuTextColor(mode === "light" ? "text-white" : "text-zinc-800");
    }
  });

  const handleMenuClick = () => {
    setOpenMenu(!openMenu);
    if (openMenu) {
      setOpenClass("open");
      setIsHidden("flex");
      setLogoTextColor("text-white");
      setLogoBgColor("hover:bg-black");
    } else {
      setOpenClass("");
      setIsHidden("hidden");
      setLogoTextColor("text-black");
      setLogoBgColor("hover:bg-zinc-800");
    }
  };

  return (
    <motion.nav
      {...({
        variants: { visible: { y: 0 }, hidden: { y: "-100%" } },
        animate: hidden ? "hidden" : "visible",
        transition: { duration: 0.2, ease: "easeInOut" },
        className: `rounded-full fixed top-2 w-full z-50 sm:px-12 px-4  h-16 ${navbarClass} items-center justify-center nav-bar`,
      } as any)}
    >
      {/*Flex Container For Nav Items  */}
      <div
        className="flex items-center h-16 justify-between
// space-x-20  w-full"
      >
        <NavbarLogo
          logoTextColor={logoTextColor}
          menuTextColor={menuTextColor}
        />

        {/*Nav Items*/}
        <div className="flex flex-row items-center justify-end">
          {" "}
          <NavMenu menuItems={menuItems} menuTextColor={menuTextColor} />
          {/* Hamburger Button */}
          <button
            id="menu-btn"
            aria-label="Toggle Menu"
            aria-expanded={openMenu}
            aria-controls="menu"
            className={`${openClass} z-50 block focus:outline-none hamburger justify-end`}
            onClick={handleMenuClick}
          >
            <span className={`hamburger-top ${hamburgerBgColor}`}></span>
            <span className={`hamburger-middle ${hamburgerBgColor}`}></span>
            <span className={`hamburger-bottom ${hamburgerBgColor}`}></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="menu"
        role="menu"
        aria-hidden={!openMenu}
        aria-label="Main Navigation"
        className={` ${openClass} fixed z-40 top-0 right-0 ${isHidden} flex flex-col items-center self-end w-full sm:w-80 h-screen m-h-screen px-6 py-1 pt-24 pb-4 tracking-widest text-white uppercase divide-y divide-gray-500  bg-black opacity-90 transition-all duration-1000 ease-in-out`}
      >
        {menuItems.map((item: MenuItem, index: number) => {
          return (
            <div key={index} className="w-full py-3 text-center ">
              <Link
                key={item.id}
                href={item.url}
                className="block hover:text-zinc-400"
                aria-label={item.label}
                onClick={handleMenuClick}
              >
                {item.label}
              </Link>
            </div>
          );
        })}
      </div>
    </motion.nav>
  );
}
