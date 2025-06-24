import React, { forwardRef } from 'react';
import {cn} from '@/lib/utils';

interface SecondaryHeaderProps {
  title: string;
  className?: string;
}

const SecondaryHeader = forwardRef<HTMLDivElement, SecondaryHeaderProps>(
  ({ title, className }, ref) => {
    const defaultClasses = "font-semibold text-3xl text-primary-1000";
    return (
      <div ref={ref} className={cn(defaultClasses, className)}>{title}</div>
    );
  }
);

SecondaryHeader.displayName = 'SecondaryHeader';

export default SecondaryHeader;

