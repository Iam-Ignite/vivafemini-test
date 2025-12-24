'use client';

import { cn } from '@/lib/utils';
import { InputHTMLAttributes, forwardRef } from 'react';

interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  showValue?: boolean;
}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  ({ className, label, showValue = true, value, min = 0, max = 10, ...props }, ref) => {
    const percentage = ((Number(value) - Number(min)) / (Number(max) - Number(min))) * 100;

    return (
      <div className="w-full">
        {(label || showValue) && (
          <div className="flex justify-between items-center mb-2">
            {label && <span className="text-sm text-gray-600">{label}</span>}
            {showValue && (
              <span className="text-sm font-medium text-gray-500">
                {value}/{max}
              </span>
            )}
          </div>
        )}
        <div className="relative">
          <div className="absolute inset-0 h-2 top-1/2 -translate-y-1/2 rounded-full bg-gray-200" />
          <div
            className="absolute h-2 top-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-pink-300 to-primary"
            style={{ width: `${percentage}%` }}
          />
          <input
            ref={ref}
            type="range"
            min={min}
            max={max}
            value={value}
            className={cn(
              'w-full h-2 bg-transparent rounded-full appearance-none cursor-pointer relative z-10',
              '[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer',
              '[&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:cursor-pointer',
              className
            )}
            {...props}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-400">
          <span>Light</span>
          <span>Medium</span>
          <span>Heavy</span>
        </div>
      </div>
    );
  }
);

Slider.displayName = 'Slider';
