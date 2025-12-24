'use client';
import { Card, Button } from '@/components/ui';
import { useCycleStore } from '@/store/cycleStore';
import { useState } from 'react';
import Image from 'next/image';

const testOptions = [
  { id: 'not_taken', label: "Didn't take test", icon: '/icons/pregnancy test-1.png' },
  { id: 'positive', label: 'Positive', icon: '/icons/pregnancy test-2.png' },
  { id: 'faint', label: 'Faint line', icon: '/icons/pregnancy test-2.png' },
  { id: 'negative', label: 'Negative', icon: '/icons/pregnancy test3-4.png' },
];

export function PregnancyTestCard() {
  const { updatePregnancyTest } = useCycleStore();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleApply = async () => {
    if (selectedOption) {
      await updatePregnancyTest(selectedOption);
    }
  };

  return (
    <Card className="relative">
      <h3 className="font-semibold text-gray-900 mb-4">
        Hi! Did you take your pregnancy test?
      </h3>

      <div className="flex justify-between gap-2 mb-4">
        {testOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => setSelectedOption(option.id)}
            className="flex flex-col items-center flex-1"
          >
            <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-2 transition-all ${
              selectedOption === option.id
                ? 'bg-primary'
                : ''
            }`}>
              <Image
                src={option.icon}
                alt={option.label}
                width={42}
                height={42}
                className="object-contain"
                unoptimized
              />
            </div>
            <span className="text-[10px] sm:text-xs text-gray-600 text-center leading-tight">{option.label}</span>
          </button>
        ))}
      </div>

      <Button
        variant="ghost"
        size="sm"
        className="w-1/4 m-auto flex mt-4 py-2 justify-center bg-gray-100 hover:bg-gray-200 text-gray-700"
        onClick={handleApply}
        disabled={!selectedOption}
      >
        Apply
      </Button>
    </Card>
  );
}
