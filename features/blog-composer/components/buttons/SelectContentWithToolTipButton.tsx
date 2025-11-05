import React from "react";

// Components
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import SelectContentButton from "@/features/blog-composer/components/buttons/SelectContentButton";

// Types
import { SelectContentWithToolTipButtonProps } from "@/features/blog-composer/types/buttons";

/**
 * Displays the content type with tooltip
 */
const SelectContentWithToolTipButton = ({
  label,
  type,
  path,
  addContent,
}: SelectContentWithToolTipButtonProps) => {
  return (
    <Tooltip key={label}>
      <TooltipTrigger>
        {" "}
        <div key={label} onClick={() => addContent(type)} className="w-full">
          <SelectContentButton path={path} />
        </div>
      </TooltipTrigger>
      <TooltipContent className="bg-primary-800" side="bottom">
        {label}
      </TooltipContent>
    </Tooltip>
  );
};

export default SelectContentWithToolTipButton;
