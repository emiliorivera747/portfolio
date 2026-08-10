"use client";
import React, { useCallback, useEffect, useState } from "react";

// External Lib
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ChevronDown } from "lucide-react";

// Next.js
import Link from "next/link";

// Types
import { MenuItem, NavbarProps, SubMenuItem } from "@/types/navbar";

// Components
import { CldImage } from "next-cloudinary";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import NavbarLogo from "@/components/navbar/NavbarLogo";
import { BRAND_LOGO_URL, BRAND_NAME } from "@/lib/brand";
import NavMenu from "@/components/navbar/NavMenu";

/**
 * The mark shown beside a sub-item in the mobile menu. A project carries its
 * own logo (or initials as a fallback); the "All Work" entry carries a stack
 * of the first few. Mirrors what the desktop dropdown draws, so the two menus
 * read as the same navigation rather than two different ones.
 */
function SubItemMark({ subItem }: { subItem: SubMenuItem }) {
  if (subItem.stack?.length) {
    return (
      <div className="flex -space-x-3 shrink-0">
        {subItem.stack.slice(0, 3).map((entry, index) => (
          <Avatar
            key={index}
            className="w-8 h-8 border border-white/20 bg-white ring-2 ring-black"
          >
            {entry.logo && (
              <AvatarImage src={entry.logo} alt="" className="object-contain p-1" />
            )}
            <AvatarFallback className="bg-primary-800 text-white text-[0.6rem]">
              {entry.initials}
            </AvatarFallback>
          </Avatar>
        ))}
      </div>
    );
  }

  // About's sub-items are plain links with nothing to show — no empty circle.
  if (!subItem.logo && !subItem.initials) return null;

  return (
    <Avatar
      className={`w-8 h-8 shrink-0 border border-white/15 ${
        subItem.logo ? "bg-white" : "bg-primary-800"
      }`}
    >
      {subItem.logo && (
        <AvatarImage src={subItem.logo} alt="" className="object-contain p-1" />
      )}
      <AvatarFallback className="bg-primary-800 text-white text-[0.65rem]">
        {subItem.initials}
      </AvatarFallback>
    </Avatar>
  );
}

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

      {/* Mobile Menu.
          bg-black/95 rather than `bg-black opacity-90`: opacity applies to the
          whole subtree, so the old panel dimmed its own text and logos along
          with the backdrop. Tinting the background alone keeps the contents at
          full strength. */}
      <div
        id="menu"
        role="menu"
        aria-hidden={!openMenu}
        aria-label="Main Navigation"
        className={`${openMenu ? "open" : ""} fixed z-40 top-0 right-0 ${
          openMenu ? "flex" : "hidden"
        } flex-col w-full sm:w-80 h-screen px-4 pt-5 pb-6 text-white bg-black/95 backdrop-blur-xl border-l border-white/10 overflow-y-auto`}
      >
        {/* pr-14 keeps the wordmark clear of the hamburger, which floats above
            this panel in the top-right corner. */}
        <Link
          href="/"
          onClick={() => setOpenMenu(false)}
          aria-label={`${BRAND_NAME} home`}
          className="flex items-center gap-3 pr-14 pb-5 mb-3 border-b border-white/10"
        >
          <CldImage
            src={BRAND_LOGO_URL}
            width={36}
            height={36}
            alt=""
            aria-hidden="true"
            className="rounded-lg"
          />
          <span className="font-bold tracking-widest text-sm uppercase">
            {BRAND_NAME}
          </span>
        </Link>

        <div className="flex flex-col gap-0.5">
          {menuItems.map((item: MenuItem, index: number) => {
            const isExpanded = expandedItem === item.id;
            return (
              <div key={index} className="w-full">
                {item.content ? (
                  <>
                    <button
                      className="w-full py-3 px-3 flex items-center justify-between gap-2 rounded-xl uppercase tracking-widest text-sm hover:bg-white/5 transition-colors"
                      onClick={() => setExpandedItem(isExpanded ? null : (item.id ?? index))}
                      aria-expanded={isExpanded}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`h-4 w-4 shrink-0 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                      />
                    </button>
                    {isExpanded && (
                      <div className="flex flex-col gap-0.5 pb-2">
                        {item.content.map((subItem) => {
                          const rowClass =
                            "flex items-center gap-3 w-full rounded-xl px-3 py-2.5 text-sm text-zinc-300 normal-case tracking-normal hover:bg-white/5 hover:text-white transition-colors";
                          const rowContent = (
                            <>
                              <SubItemMark subItem={subItem} />
                              <span>{subItem.label}</span>
                            </>
                          );

                          return (
                            <div key={subItem.id} className="w-full">
                              {subItem.external || subItem.url.includes("#") ? (
                                <a
                                  href={subItem.url}
                                  className={rowClass}
                                  aria-label={subItem.label}
                                  {...(subItem.external ? { target: "_blank", rel: "noopener" } : {})}
                                  onClick={() => setOpenMenu(false)}
                                >
                                  {rowContent}
                                </a>
                              ) : (
                                <Link
                                  href={subItem.url}
                                  className={rowClass}
                                  aria-label={subItem.label}
                                  onClick={() => setOpenMenu(false)}
                                >
                                  {rowContent}
                                </Link>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.url}
                    className="flex items-center w-full py-3 px-3 rounded-xl uppercase tracking-widest text-sm hover:bg-white/5 transition-colors"
                    aria-label={item.label}
                    onClick={() => setOpenMenu(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}
