import React from "react";
import Link from "next/link";

const page = () => {
  return (
    <section className="h-screen w-screen">
      <Link
        href="/"
        className="py-4 px-2 border rounded-[12px] text-primary-800 font-semibold flex items-center justify-center border-primary-500 gap-2 m-10 hover:text-primary-1000 w-[3rem] h-[3rem]"
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
    </section>
  );
};

export default page;
