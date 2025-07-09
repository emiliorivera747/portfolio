import React from "react";
import { RoleProp } from "@/features/primary-landing-page/types/props";

/**
 * The Role component displays the role of the individual in a stylized format.
 *
 * @returns Role component for the primary landing page.
 */
const Role = ({ role }: RoleProp) => {
  return (
    <h1 className="font-semibold from-primary-700 to-primary-500 bg-gradient-to-r bg-clip-text text-transparent sm:text-2xl text-xl z-50  sm:mx-1 2xl:text-[2rem] pl-1 sm:pl-0 pb-1">
      {role}
    </h1>
  );
};

export default Role;
