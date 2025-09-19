import React from "react";
import Link from "next/link";
import { BackToProps } from "@/types/buttons";

/**
 * Navigate the user back to the homepage or a desired
 * url.
 *
 */
const BackToButton = ({ url = "/" }: BackToProps) => {
  return (
    <Link
      href={url}
      className="hover:bg-primary-200 border rounded-[12px] text-primary-800 font-semibold flex items-center justify-center border-primary-500 gap-2  hover:text-primary-1000 w-[3rem] h-[3rem]"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 19.5 8.25 12l7.5-7.5"
        />
      </svg>
    </Link>
  );
};

export default BackToButton;
