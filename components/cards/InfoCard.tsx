import { ReactNode } from "react";

interface InfoCardProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export default function InfoCard({ title, children, className = "" }: InfoCardProps) {
  return (
    <div
      className={`w-full flex flex-col col-span-2  p-6 rounded-[12px] md:p-16 backdrop-blur bg-primary-100 ${className}`}
    >
      <h1 className="text-primary-900 text-start leading-loose tracking-wider text-[1.1rem] font-bold pb-[1rem]">
        {title}
      </h1>
      {children}
    </div>
  );
}
