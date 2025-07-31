import React from 'react'
import { CldImage } from 'next-cloudinary';
import { ToolsProps, ToolItem } from '@/types/tools';

/**
 * Component to display a list of tools.
 * 
 * @param {Object} props - The component props.
 * @param {ToolItem[]} props.toolsData - Array of tools with name and imageUrl.
 * @returns {JSX.Element} The rendered Tools component.
 */
const Tools = ({ toolsData }: ToolsProps) => {

  return (
    <div className="h-full  w-screen flex overflow-auto px-[0.4rem] sm:px-60 pb-10 items-center justify-center gap-10 flex-wrap pt-2">
      {toolsData.map((item: ToolItem, i: number) => (
      <div
        key={i}
        className="flex flex-col items-center justify-center gap-4 backdrop-blur-md h-[10rem] w-[10rem] sm:h-[12rem] sm:w-[12rem] bg-white rounded-[12px] transition-shadow duration-300 ease-in-out border border-primary-300 shadow-sm hover:shadow-lg hover:scale-105"
      >
        <CldImage
        alt={item.name}
        src={item.imageUrl}
        width={100}
        height={100}
        />
        <div className="flex item-center justify-center">
        <p className="text-primary-700 text-xs"> {item.name}</p>
        </div>
      </div>
      ))}
    </div>
  );
}

export default Tools