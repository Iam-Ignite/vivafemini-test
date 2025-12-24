'use client';

import { Slider } from '@/components/ui';

interface FlowIntensitySliderProps {
  value: number;
  onChange: (value: number) => void;
}

export function FlowIntensitySlider({ value, onChange }: FlowIntensitySliderProps) {
  return (
    <div>
      <h3 className="font-semibold text-gray-900 mb-2">Flow Intensity</h3>
      <p className="text-gray-600 text-sm mb-4">How heavy is your flow today?</p>
      <Slider
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        min={0}
        max={10}
      />
    </div>
  );
}
