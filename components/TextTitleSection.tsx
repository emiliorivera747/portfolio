import React from 'react'

interface TextTitleSectionProps {
  paragraph: string;
  title: string;
  bgColor: string;
  titleColor: string;
  pColor: string;
}

function TextTitleSection({paragraph, title, bgColor, titleColor, pColor}: TextTitleSectionProps) {
  return (
    <div className={`${bgColor} min-h-screen h-auto flex flex-col items-center justify-center gap-4`}>
      <h1 className={`${titleColor} text-4xl font-bold`}>{title}</h1>
      <p className={`${pColor} text-lg`}>{paragraph}</p>
    </div>
  )
}

export default TextTitleSection