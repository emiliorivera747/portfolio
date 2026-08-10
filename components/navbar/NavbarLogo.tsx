"use client";
import React from "react";
import { CldImage } from "next-cloudinary";
import Link from "next/link";

import { NavbarLogoProp } from "@/types/navbar";
import { BRAND_LOGO_URL, BRAND_NAME } from "@/lib/brand";

/**
 * Stores the logo for the navbar
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
          src={BRAND_LOGO_URL}
          fetchPriority="high"
          height={30}
          width={30}
          className="pr-1 self-end"
          alt=""
          aria-hidden="true"
        />{" "}
        <h1 className="self-end font-bold tracking-widest">{BRAND_NAME}</h1>
      </Link>
    </div>
  );
};

export default React.memo(NavbarLogo);
