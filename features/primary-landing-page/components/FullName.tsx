import React from "react";
import { FullNameProp } from "@/features/primary-landing-page/types/props";

/**
 *
 * Displays the full name of the individual in a stylized format.
 *
 * @param firstName - The first name.
 * @param lastName - The last name.
 * @returns FullName component for the primary landing page.
 */
const FullName = ({ firstName, lastName }: FullNameProp) => {
  return (
    <div className="flex lg:flex-row flex-row gap-2  md:gap-4 text-6xl  md:text-7xl 2xl:text-[5rem] mb-4 sm:mb-8 bg-white-300 z-20">
      <h1 className="text-white font-semibold">{firstName}</h1>
      <h1 className="text-white font-semibold">{lastName}</h1>
    </div>
  );
};

export default FullName;
