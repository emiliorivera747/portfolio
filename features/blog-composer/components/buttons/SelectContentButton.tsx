import React from "react";
import { SelectContentButtonProps } from "@/features/blog-composer/types/buttons";
import { cn } from "@/lib/utils";

/**
 * Allows the user to select different content for the blog such as images.
 *
 * @param param0
 * @returns
 */
const SelectContentButton = ({
  path,
  strokeWidth = 1.5,
  className,
  ref,
}: SelectContentButtonProps) => {
  const defaultClasses =
    "bg-primary-100 w-full py-4 border rounded-[12px] flex items-center justify-center hover:bg-primary-200 hover:text-primary-1000 text-primary-800 hover:text-bold";

  return (
    <div className={cn(defaultClasses, className)} ref={ref}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={strokeWidth}
        stroke="currentColor"
        className="size-6"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d={path} />
      </svg>
    </div>
  );
};

export default SelectContentButton;
