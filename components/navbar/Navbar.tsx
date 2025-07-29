'use client'
import React, { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { CldImage } from 'next-cloudinary';
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

// Types 
import {MenuItem, SubMenuItem, NavbarProps} from '@/types/navbar';

// Components
import NavbarLogo from '@/components/navbar/NavbarLogo'


/**
 *  Displays the main navigation bar.
 * 
 * @param menuItems - Items for  the navigation bar
 * @returns Navbar
 */
export default function Navbar({ menuItems }: NavbarProps) {

  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [bgColor, setBgColor] = useState("bg-transparent");
  const [openMenu, setOpenMenu] = useState(false);
  const [openClass, setOpenClass] = useState("");
  const [isHidden, setIsHidden] = useState("hidden");
  const [logoTextColor, setLogoTextColor] = useState("text-black");
  const [logoBgColor, setLogoBgColor] = useState("hover:bg-zinc-800");
  const [menuTextColor, setMenuTextColor] = useState("text-white");
  const [hamburgerBgColor, setHamburgerBgColor] = useState("bg-white");

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setHidden(true);
      setIsHidden("hidden");
      setOpenClass("");
    }
    else {
      setHidden(false);
    }

    if (latest > 600) {
      setBgColor("backdrop-blur-[10rem]");
      setMenuTextColor("text-zinc-800");
      setHamburgerBgColor("bg-zinc-800");
    }
    else {
      setBgColor("bg-transparent");
      setMenuTextColor("text-white");
      setHamburgerBgColor("bg-white");

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
        className: `fixed top-0 left-0 w-full z-50 sm:px-12 px-4  h-20 ${bgColor} items-center justify-center nav-bar`,
      } as any)}
    >
      {/*Flex Container For Nav Items  */}
      <div
        className="flex items-center h-16 justify-between
space-x-20 my-2 w-full"
      >
        <NavbarLogo logoTextColor={logoTextColor} menuTextColor={menuTextColor}/>

        {/*Nav Items*/}
        <div className="flex flex-row items-center justify-end">
          {" "}
          <div className="hidden items-center justify-end space-x-10  md:flex pr-10 z-30 ">
            <NavigationMenu>
              <NavigationMenuList className="gap-2">
                {menuItems.map((item: MenuItem) => {
                  return (
                    <NavigationMenuItem key={item.id} className="relative">
                      <NavigationMenuTrigger className={`uppercase bg-transparent text-white font-bold hover:text-white hover:backdrop-blur-md hover:bg-transparent focus:bg-transparent tracking-widest rounded-lg p-[0.8rem] ${menuTextColor} font-bold text-sm tracking-wider focus:text-white data-[state=open]:hover:bg-transparent data-[state=open]:text-white `}>{item.label}</NavigationMenuTrigger>
                      <NavigationMenuContent className="py-4  px-6 pb-6 bg-white flex flex-col gap-2 rounded-lg border-none">
                        {item.content?.map((subItem: SubMenuItem) => {
                          return (
                            <NavigationMenuLink key={subItem.id} className="w-[10rem]" asChild>
                              <Link
                                key={subItem.id}
                                href={subItem.url}
                                className={`block text-[1.1rem] text-primary-1000 rounded-lg p-[0.2rem] font-semibold hover:underline hover:underline-offset-4 hover:decoration-2`}
                                aria-label={subItem.label}
                              >
                                {subItem.label}
                              </Link>
                            </NavigationMenuLink>
                          )
                        })}
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  );
                })}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

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


