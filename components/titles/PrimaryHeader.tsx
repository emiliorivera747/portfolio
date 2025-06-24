import React, { forwardRef } from 'react';
import {cn} from '@/lib/utils';

interface PrimaryHeaderProps {
  title: string;
  className?: string;
}

const PrimaryHeader = forwardRef<HTMLDivElement, PrimaryHeaderProps>(({ title, className }, ref) => {
  const defaultClasses = "font-bold text-3xl text-zinc-700";

  return (
    <div ref={ref} className={cn(defaultClasses, className)}>{title}</div>
  );
});

PrimaryHeader.displayName = 'PrimaryHeader';
export default PrimaryHeader;
