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
  const defaultClass =
    "font-semibold text-4xl text-transparent bg-clip-text bg-gradient-to-r to-primary-800 from-primary-900 mb-4";
  return (
    <h2 className={cn(defaultClass, className)} ref={ref}>
      {title}
    </h2>
  );
};

export default PrimaryHeader;
