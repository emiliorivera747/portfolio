import React from "react";
import { cn } from "@/lib/utils";

// Types
import { PrimaryHeaderProps } from "@/types/headers";

/**
 * Useful default header which can be used throughout the whole
 * application.
 *
 *
 * @param label - hearder label
 */
const PrimaryHeader = ({ title, className, ref }: PrimaryHeaderProps) => {
  const defaultClass = "mb-2  text-primary-900 font-semibold";
  return (
    <h1 className={cn(defaultClass, className)} ref={ref}>
      {title}
    </h1>
  );
};

export default PrimaryHeader;
