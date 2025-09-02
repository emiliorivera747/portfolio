import React, {forwardRef} from "react";

import { SubmitButtonPropsV2 } from "@/types/buttons";
import { cn } from "@/lib/utils";


/**
 * PrimarySubmitButton is a styled button component used for form submissions.
 * 
 */
const PrimarySubmitButton = forwardRef<HTMLButtonElement, SubmitButtonPropsV2>(({
  text = "Submit",
  className,
  isLoading, 
}, ref) => {
 
  const defaultClass = `flex items-center justify-center w-full bg-gradient-to-r from-secondary-700 to-secondary-800 text-white px-[.94118rem] py-[1.05882rem] h-[3.2941176471rem] rounded-[12px] hover:bg-blue-700 hover:to-blue-700 transition duration-300`

  return (
    <button type="submit" className={cn(defaultClass, className)} disabled={ isLoading} ref={ref}>
      {text}
    </button>
  );
});

PrimarySubmitButton.displayName = "PrimarySubmitButton";

export default PrimarySubmitButton;
