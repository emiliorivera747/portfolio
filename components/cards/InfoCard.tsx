import { ReactNode } from "react";

interface InfoCardProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export default function InfoCard({ title, children, className = "" }: InfoCardProps) {
  return (
    <div
      className={`w-full flex flex-col p-6 py-10 rounded-[12px] md:p-10 md:py-14 backdrop-blur bg-primary-100 ${className}`}
    >
      {/* Airbnb sets headings in semibold at a normal tracking — no
          letter-spacing on either headings or body. primary-1000 (#212529) is
          this palette's equivalent of their #222222 heading colour. */}
      <h2 className="text-primary-1000 text-start text-base md:text-lg font-semibold leading-snug pb-3">
        {title}
      </h2>
      {children}
    </div>
  );
}
