'use client';

import { Chip } from '@/components/ui';

interface SymptomOption {
  id: string;
  label: string;
  emoji: string;
}

interface SymptomChipsProps {
  title: string;
  options: SymptomOption[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
}

export function SymptomChips({
  title,
  options,
  selectedValues,
  onChange,
}: SymptomChipsProps) {
  const toggleSymptom = (id: string) => {
    if (selectedValues.includes(id)) {
      onChange(selectedValues.filter((v) => v !== id));
    } else {
      onChange([...selectedValues, id]);
    }
  };

  return (
    <div>
      <h3 className="font-semibold text-gray-900 mb-3">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <Chip
            key={option.id}
            emoji={option.emoji}
            selected={selectedValues.includes(option.id)}
            onClick={() => toggleSymptom(option.id)}
          >
            {option.label}
          </Chip>
        ))}
      </div>
    </div>
  );
}
