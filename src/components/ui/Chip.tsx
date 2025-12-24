'use client';

import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  emoji?: string;
}

export const Chip = forwardRef<HTMLButtonElement, ChipProps>(
  ({ className, selected = false, emoji, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          'inline-flex items-center gap-1.5 px-4 py-2 rounded-full border text-sm font-medium transition-all cursor-pointer',
          selected
            ? 'bg-primary border-primary text-white'
            : 'bg-white border-gray-200 text-gray-700 hover:border-pink-300 hover:bg-pink-50',
          className
        )}
        {...props}
      >
        {emoji && <span className="text-base">{emoji}</span>}
        {children}
      </button>
    );
  }
);

Chip.displayName = 'Chip';
