"use client";
import React from "react";
import { CldImage } from "next-cloudinary";
import Link from "next/link";

import { NavbarLogoProp } from "@/types/navbar";

/**
 * Stores the logo for the navbae
 *
 * @param logoTextColor - text color
 * @param menuTextColor - the menu text color
 * @returns logo
 */
const NavbarLogo = ({ logoTextColor, menuTextColor }: NavbarLogoProp) => {
  return (
    <div className="z-30 justify-self-start">
      <Link
        href="/"
        className={`flex flex-row tracking-widest hover:text-primary-500 hover:backdrop-blur-md rounded-lg p-[0.8rem] ${logoTextColor} ${menuTextColor} font-semibold`}
        aria-label="Logo"
      >
        <CldImage
          src="https://res.cloudinary.com/dcss55nem/image/upload/v1702588027/favicon_5_a5rhl0.png"
          fetchPriority="high"
          height={30}
          width={30}
          className="pr-1 self-end"
          alt="logo"
        />{" "}
        <h1 className="self-end font-bold tracking-widest">
          {"milio's Portfolio"}
        </h1>
      </Link>
    </div>
  );
};

export default NavbarLogo;
