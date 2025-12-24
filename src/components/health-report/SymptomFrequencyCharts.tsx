'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui';
import { healthReportService } from '@/services/api';
import { SymptomFrequency } from '@/types';

interface CircularProgressProps {
  percentage: number;
  label: string;
  color: string;
}

function CircularProgress({ percentage, label, color }: CircularProgressProps) {
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center p-4 bg-gray-50 rounded-xl">
      <div className="relative w-20 h-20">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 80 80">
          <circle
            cx="40"
            cy="40"
            r={radius}
            stroke="#f0f0f0"
            strokeWidth="6"
            fill="none"
          />
          <circle
            cx="40"
            cy="40"
            r={radius}
            stroke={color}
            strokeWidth="6"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-gray-900">{percentage}%</span>
        </div>
      </div>
      <div className="mt-2 flex items-center gap-1.5">
        <div
          className="w-2.5 h-2.5 rounded-full"
          style={{ backgroundColor: color }}
        />
        <span className="text-xs text-gray-600 text-center">{label}</span>
      </div>
    </div>
  );
}

export function SymptomFrequencyCharts() {
  const [frequency, setFrequency] = useState<SymptomFrequency | null>(null);

  useEffect(() => {
    const fetchFrequency = async () => {
      try {
        const response = await healthReportService.getSymptomFrequency();
        setFrequency(response.data);
      } catch (error) {
        console.error('Failed to fetch frequency:', error);
      }
    };
    fetchFrequency();
  }, []);

  if (!frequency) {
    return (
      <Card>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/2 mb-4" />
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-28 bg-gray-200 rounded-xl" />
            ))}
          </div>
        </div>
      </Card>
    );
  }

  const topCharts = [
    { percentage: frequency.physicalPain, label: 'Physical Pain', color: '#DC2626' },
    { percentage: frequency.moodMental, label: 'Mood & Mental', color: '#22C55E' },
    { percentage: frequency.digestionAppetite, label: 'Digestion & Appetite', color: '#F59E0B' },
  ];

  const bottomCharts = [
    { percentage: frequency.sexualHealth, label: 'Sexual Health', color: '#DC2626' },
    { percentage: Math.round((frequency.physicalPain + frequency.moodMental) / 2), label: 'Digestion & Appetite', color: '#FBBF24' },
  ];

  return (
    <Card>
      <h2 className="text-lg font-semibold text-gray-900 mb-1">Symptom Frequency</h2>
      <p className="text-sm text-gray-500 mb-4">
        Study your body system & understand your wellbeing
      </p>

      {/* Top row - 3 charts */}
      <div className="grid grid-cols-3 gap-3 mb-3">
        {topCharts.map((chart) => (
          <CircularProgress
            key={chart.label}
            percentage={chart.percentage}
            label={chart.label}
            color={chart.color}
          />
        ))}
      </div>

      {/* Bottom row - 2 charts centered */}
      <div className="grid grid-cols-3 gap-3">
        <div className="col-start-1">
          <CircularProgress
            percentage={bottomCharts[0].percentage}
            label={bottomCharts[0].label}
            color={bottomCharts[0].color}
          />
        </div>
        <div className="col-start-2">
          <CircularProgress
            percentage={bottomCharts[1].percentage}
            label={bottomCharts[1].label}
            color={bottomCharts[1].color}
          />
        </div>
      </div>
    </Card>
  );
}
