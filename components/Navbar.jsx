import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
function Navbar({ menuItems }) {
  const [openMenu, setOpenMenu] = useState(false);
  const [openClass, setOpenClass] = useState("");
  const [isHidden, setIsHidden] = useState("hidden");
  const [logoTextColor, setLogoTextColor] = useState("text-black");
  const [logoBgColor, setLogoBgColor] = useState("hover:bg-zinc-800");

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
    <nav className="absolute p-4 pr-6 bg-black w-screen">
      {/*Flex Container For Nav Items  */}
      <div
        className="flex items-center justify-between
space-x-20 my-2"
      >
        {/* Logo */}
        <div className="z-30 justify-self-start ">
          <Link
            href="/"
            className={`flex flewx-row tracking-widest hover:text-softRed  ${logoBgColor} rounded-lg p-2 ${logoTextColor} text-white font-bold`}
          >
            <Image src="https://res.cloudinary.com/dcss55nem/image/upload/v1702588027/favicon_5_a5rhl0.png" height={30} width={30} className="pr-1 self-end" alt="logo"/> <h1 className="self-end font-bold tracking-widest">{"milio's Portfolio"}</h1>
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
                  className="tracking-widest hover:text-softRed hover:bg-zinc-800 rounded-lg p-2 text-white font-bold"
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
          {/* Hamburger Button */}
          <button
            id="menu-btn"
            className={`${openClass} z-30 block focus:outline-none hamburger justify-end`}
            onClick={handleMenuClick}
          >
            <span className="hamburger-top"></span>
            <span className="hamburger-middle"></span>
            <span className="hamburger-bottom"></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="menu"
        className={` ${openClass} fixed inset-0 z-20 ${isHidden} flex-col items-center self-end w-full h-full m-h-screen px-6 py-1 pt-24 pb-4 tracking-widest text-white uppercase divide-y divide-gray-500 opacity-95 bg-black`}
      >
        {menuItems.map((item, index) => {
          return (
            <div key={index} className="w-full py-3 text-center">
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
    </nav>
  );
}

export default Navbar;
