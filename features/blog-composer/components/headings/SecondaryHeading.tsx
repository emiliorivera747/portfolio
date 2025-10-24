import React from "react";

import { cn } from "@/lib/utils";

/**
 *  Can be used in the composer as the secondary heading
 */
const SecondaryHeading = ({
  className,
  label,
}: {
  className?: string;
  label: string;
}) => {
  const defaultClass = "text-lg font-medium text-primary-900 mb-2";
  return <h1 className={cn(defaultClass, className)}>{label}</h1>;
};

export default SecondaryHeading;
