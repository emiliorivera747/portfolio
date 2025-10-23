import React from "react";

interface SelectContentButtonProps {
  path: string;
  strokeWidth?: number;
}

const SelectContentButton = ({
  path,
  strokeWidth = 1.5,
}: SelectContentButtonProps) => {
  return (
    <div className="w-full py-4 border rounded-[12px] flex items-center justify-center hover:bg-primary-100 hover:text-primary-1000 text-primary-800 hover:text-bold">
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
