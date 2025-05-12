import React from 'react'
import { CldImage } from 'next-cloudinary';

/**
 * Displays tools 
 * 
 * @param {*} param0 
 * @returns 
 */
const Tools = ({ toolsData }) => {

  return (
    <div className="h-full w-screen flex overflow-auto px-[0.4rem] sm:px-60 pb-10 items-center justify-center gap-10 flex-wrap">
      {toolsData.map((item, i) => (
        <div key={i} className="flex flex-col items-center justify-center gap-4 backdrop-blur-md">
          <CldImage
            alt={item.name}
            name={item.name}
            src={item.imageUrl}
            width={100}
            height={100}
          />
          <div className="flex item-center justify-center" >
            <p className="text-primary-600 text-xs"> {item.name}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Tools