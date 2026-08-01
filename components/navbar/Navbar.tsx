"use client";
import React, { useCallback, useEffect, useState } from "react";

// External Lib
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ChevronDown } from "lucide-react";

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
const NAV_TOP = "bg-transparent";
const NAV_SCROLLED = "backdrop-blur bg-white/10";
// Past this many pixels the bar sits over page content rather than the hero,
// so it needs its own background and the inverse text colour.
const SCROLLED_PAST = 600;

export default function Navbar({ menuItems, mode = "light" }: NavbarProps) {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  const [logoTextColor, setLogoTextColor] = useState("text-black");
  const [menuTextColor, setMenuTextColor] = useState(
    mode === "light" ? "text-white" : "text-primary-1000"
  );

  const [hamburgerBgColor, setHamburgerBgColor] = useState(
    mode === "light" ? "bg-white" : "bg-primary-1000"
  );

  const [navbarClass, setNavbarClass] = useState(NAV_TOP);

  // One place that decides every colour from "are we scrolled past the hero",
  // so the mount-time sync below and the scroll handler can't drift apart.
  const applyScrollState = useCallback(
    (scrolled: boolean) => {
      setNavbarClass(scrolled ? NAV_SCROLLED : NAV_TOP);
      setMenuTextColor(
        scrolled
          ? mode === "light"
            ? "text-primary-1000"
            : "text-primary-100"
          : mode === "light"
            ? "text-primary-100"
            : "text-primary-1000"
      );
      setHamburgerBgColor(
        scrolled
          ? "bg-primary-900"
          : mode === "light"
            ? "bg-white"
            : "bg-primary-1000"
      );
    },
    [mode]
  );

  // useMotionValueEvent only fires when the scroll value *changes*. Without
  // this, a page that mounts already scrolled — navigating back, a restored
  // scroll position, an anchor link — keeps the initial "top of page" colours,
  // leaving white text on a white background until you happen to scroll. Also
  // re-runs when `mode` changes, since each route passes a different one.
  useEffect(() => {
    applyScrollState(scrollY.get() > SCROLLED_PAST);
  }, [applyScrollState, scrollY]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();

    // getPrevious() is undefined on the very first change; `latest > undefined`
    // is always false, which quietly disabled the hide-on-scroll-down there.
    if (previous !== undefined && latest > previous && latest > 150)
      setHidden(true);
    else setHidden(false);

    applyScrollState(latest > SCROLLED_PAST);
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
          <NavMenu menuItems={menuItems} menuTextColor={menuTextColor} contentBg="light" />

          {/* Hamburger Button */}
          <button
            id="menu-btn"
            aria-label="Toggle Menu"
            aria-expanded={openMenu}
            aria-controls="menu"
            className={`${
              openMenu ? "open" : ""
            } z-50 block md:hidden hamburger justify-end focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-800 focus-visible:rounded`}
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
        className={`${openMenu ? "open" : ""} fixed z-40 top-0 right-0 ${
          openMenu ? "flex" : "hidden"
        } flex flex-col items-center self-end w-full sm:w-80 h-screen px-6 py-1 pt-24 pb-4 tracking-widest text-white uppercase divide-y divide-gray-500 bg-black opacity-90 overflow-y-auto`}
      >
        {menuItems.map((item: MenuItem, index: number) => {
          const isExpanded = expandedItem === item.id;
          return (
            <div key={index} className="w-full">
              {item.content ? (
                <>
                  <button
                    className="w-full py-3 flex items-center justify-center gap-2 hover:text-zinc-400 text-center"
                    onClick={() => setExpandedItem(isExpanded ? null : (item.id ?? index))}
                    aria-expanded={isExpanded}
                  >
                    {item.label}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isExpanded && (
                    <div className="flex flex-col divide-y divide-gray-700 pb-2">
                      {item.content.map((subItem) => (
                        <div key={subItem.id} className="w-full py-2 text-center">
                          {subItem.external || subItem.url.includes("#") ? (
                            <a
                              href={subItem.url}
                              className="block text-sm text-zinc-300 hover:text-white normal-case tracking-normal"
                              aria-label={subItem.label}
                              {...(subItem.external ? { target: "_blank", rel: "noopener" } : {})}
                              onClick={() => setOpenMenu(false)}
                            >
                              {subItem.label}
                            </a>
                          ) : (
                            <Link
                              href={subItem.url}
                              className="block text-sm text-zinc-300 hover:text-white normal-case tracking-normal"
                              aria-label={subItem.label}
                              onClick={() => setOpenMenu(false)}
                            >
                              {subItem.label}
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="py-3 text-center">
                  <Link
                    href={item.url}
                    className="block hover:text-zinc-400"
                    aria-label={item.label}
                    onClick={() => setOpenMenu(false)}
                  >
                    {item.label}
                  </Link>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </motion.nav>
  );
}
