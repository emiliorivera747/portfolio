import React, { forwardRef } from 'react';
import {cn} from '@/lib/utils';

const PrimaryHeader = forwardRef(({ title, className }, ref) => {
  const defaultClasses = "font-bold text-3xl text-zinc-700";

  return (
    <div ref={ref} className={cn(defaultClasses, className)}>{title}</div>
  );
});

export default PrimaryHeader;
