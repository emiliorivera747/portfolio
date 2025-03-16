import React, { forwardRef } from 'react';
import {cn} from '@/lib/utils';

const SecondaryHeader = forwardRef(({ title, className }, ref) => {
  const defaultClasses = "font-bold text-3xl text-primary-1000";
  return (
    <div ref={ref} className={cn(defaultClasses, className)}>{title}</div>
  );
});

SecondaryHeader.displayName = 'SecondaryHeader';

export default SecondaryHeader;

