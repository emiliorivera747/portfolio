import React, { forwardRef } from "react";
import { PrimaryButtonProps } from "@/types/buttons";
import { cn } from "@/lib/utils";

/**
 * PrimaryButton is a styled button component used for primary actions.
 *
 */
const PrimaryButton = forwardRef<HTMLButtonElement, PrimaryButtonProps>(
  (props, ref) => {
    const { className, text = "Submit", actionFunction } = props;
    const defaultClass = `flex items-center justify-center w-full bg-blue-500 text-white hover:bg-blue-700 from-primary-700 to-primary-800 hover:from-blue-700 hover:to-blue-700 px-[.94118rem] py-[1.05882rem] h-[3.2941176471rem] rounded-[12px] transition duration-300`;
    return (
      <button
        onClick={actionFunction}
        className={cn(defaultClass, className)}
        ref={ref}
      >
        {text}
      </button>
    );
  }
);

PrimaryButton.displayName = "PrimaryButton";

export default PrimaryButton;
