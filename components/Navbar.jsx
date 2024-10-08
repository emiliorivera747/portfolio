import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion"

import Link from "next/link";
import Image from "next/image";
function Navbar({ menuItems }) {

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
  //   useMotionValueEvent(scrollY, "change", (latest) => {
  //   console.log("Page scroll: ", latest)
  // })
  // useEffect(() => {

  //   const unsubscribe = scrollY.on("change", (latest) => { console.log(latest); });
  //   return () => unsubscribe();
  // }, [scrollY]);
  useMotionValueEvent(scrollY, "change", (latest) => {
    console.log("Latest: ",latest);
    const previous = scrollY.getPrevious();
    console.log("Pre: ",previous);
    if(latest > previous && latest > 150){
      setHidden(true);
      setIsHidden("hidden");
      setOpenClass("");
    }
    else{
      setHidden(false);
    }

    if(latest > 600){
      setBgColor("backdrop-blur-[10rem]");
      setMenuTextColor("text-zinc-800");
      setHamburgerBgColor("bg-zinc-800");
    }
    else{
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
      variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className={`fixed top-0 left-0 w-full z-50 sm:px-12 px-4  h-20 ${bgColor} items-center justify-center`}>
      {/*Flex Container For Nav Items  */}
      <div

        className="flex items-center h-16 justify-between
space-x-20 my-2 w-full"
      >
        {/* Logo */}
        <div className="z-30 justify-self-start ">
          <Link
            href="/"
            className={`flex flewx-row tracking-widest hover:text-white  ${logoBgColor} rounded-lg p-[0.8rem] ${logoTextColor} ${menuTextColor} font-bold`}
          >
            <Image src="https://res.cloudinary.com/dcss55nem/image/upload/v1702588027/favicon_5_a5rhl0.png" height={30} width={30} className="pr-1 self-end" alt="logo" /> <h1 className="self-end font-bold tracking-widest">{"milio's Portfolio"}</h1>
          </Link>
        </div>

        {/*Nav Items*/}
        <div className="flex flex-row items-center justify-end">
          {" "}
          <div className="hidden items-center justify-end space-x-10 uppercase text-grayishBlue md:flex pr-10 z-30">
            {menuItems.map((item) => {
              return (
                <Link
                  key={item.id}
                  href={item.url}
                  className={`tracking-widest hover:text-white hover:bg-zinc-800 rounded-lg p-[0.8rem] ${menuTextColor}  font-bold text-sm`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>


          {/* Hamburger Button */}
          <button
            id="menu-btn"
            className={`${openClass} z-50 block focus:outline-none hamburger justify-end  `}
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
        className={` ${openClass} fixed z-40 top-0 right-0 ${isHidden} flex flex-col items-center self-end w-full sm:w-80 h-screen m-h-screen px-6 py-1 pt-24 pb-4 tracking-widest text-white uppercase divide-y divide-gray-500  bg-black opacity-90 transition-all duration-1000 ease-in-out`}
      >
        {menuItems.map((item, index) => {
          return (
            <div key={index} className="w-full py-3 text-center ">
              <Link
                key={item.id}
                href={item.url}
                className="block hover:text-zinc-400"
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

export default Navbar;
