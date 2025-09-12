"use client";
import React, { useState } from "react";

// External Lib
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

// Next.js
import Link from "next/link";

// Types
import { MenuItem, NavbarProps } from "@/types/navbar";

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
  const [openMenu, setOpenMenu] = useState(false);
  const [logoTextColor, setLogoTextColor] = useState("text-black");
  const [menuTextColor, setMenuTextColor] = useState("text-white");

  const [hamburgerBgColor, setHamburgerBgColor] = useState(
    mode === "light" ? "bg-white" : "bg-primary-1000"
  );

  const [navbarClass, setNavbarClass] = useState(
    "backdrop-blur bg-tertiary-300/90"
  );

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();

    if (latest > previous && latest > 150) setHidden(true);
    else setHidden(false);

    if (latest > 600) {
      setNavbarClass("backdrop-blur bg-tertiary-300/90");
      setMenuTextColor(
        mode === "light" ? "text-primary-1000" : "text-primary-100"
      );
    } else {
      setNavbarClass("bg-transparent");
      setMenuTextColor(
        mode === "light" ? "text-primary-100" : "text-primary-1000"
      );
    }
  });

  return (
    <motion.nav
      {...({
        variants: { visible: { y: 0 }, hidden: { y: "-100%" } },
        animate: hidden ? "hidden" : "visible",
        transition: { duration: 0.2, ease: "easeInOut" },
        className: `fixed w-full z-50 sm:px-12 px-4 h-16 ${navbarClass} items-center justify-center nav-bar`,
      } as any)}
    >
      {/* Flex Container For Nav Items  */}
      <div className="flex items-center h-16 justify-between space-x-20 w-full">
        <NavbarLogo
          logoTextColor={logoTextColor}
          menuTextColor={menuTextColor}
        />

        {/* Nav Items */}
        <div className="flex flex-row items-center justify-end">
          <NavMenu menuItems={menuItems} menuTextColor={menuTextColor} />

          {/* Hamburger Button */}
          <button
            id="menu-btn"
            aria-label="Toggle Menu"
            aria-expanded={openMenu}
            aria-controls="menu"
            className={`${
              openMenu ? "open" : ""
            } z-50 block focus:outline-none hamburger justify-end`}
            onClick={() => setOpenMenu(!openMenu)}
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
        className={` ${openMenu ? "open" : ""} fixed z-40 top-0 right-0 ${
          openMenu ? "flex" : "hidden"
        } flex flex-col items-center self-end w-full sm:w-80 h-screen px-6 py-1 pt-24 pb-4 tracking-widest text-white uppercase divide-y divide-gray-500 bg-black opacity-90 transition-all duration-1000 ease-in-out`}
      >
        {menuItems.map((item: MenuItem, index: number) => {
          return (
            <div key={index} className="w-full py-3 text-center">
              <Link
                key={item.id}
                href={item.url}
                className="block hover:text-zinc-400"
                aria-label={item.label}
                onClick={() => setOpenMenu(!openMenu)}
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
