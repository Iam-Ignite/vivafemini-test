'use client';

import { Badge } from '@/components/ui';
import { formatDate } from '@/lib/utils';

interface CycleDayIndicatorProps {
  cycleDay: number;
  avgCycleLength: number;
  cycleProgress: number;
  nextPeriodDate: string;
  daysUntilPeriod: number;
  fertileWindowStart?: string;
}

export function CycleDayIndicator({
  cycleDay,
  avgCycleLength,
  cycleProgress,
  nextPeriodDate,
  daysUntilPeriod,
  fertileWindowStart,
}: CycleDayIndicatorProps) {
  return (
    <div className="text-center py-4">
      <p className="text-gray-600 mb-2">Today is Cycle Day</p>

      <div className="relative inline-block">
        <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center mx-auto">
          <span className="text-4xl font-bold text-white">{cycleDay}</span>
        </div>
        <span className="absolute -top-2 -left-2 text-2xl">🌸</span>
        <span className="absolute -bottom-2 -right-2 text-2xl">🌺</span>
      </div>

      <div className="mt-4 flex items-center justify-center gap-4 text-sm text-gray-600">
        <span>Avg. Cycle: <strong>{avgCycleLength} Days</strong></span>
        <span>Currently: <strong>{cycleProgress}% of 100</strong></span>
      </div>

      <div className="mt-4">
        <Badge variant="outline" className="text-primary border-primary">
          Next Period: <span className="ml-1 font-semibold text-primary">{formatDate(nextPeriodDate, 'month-day')} ({daysUntilPeriod} Days)</span>
        </Badge>
      </div>

    
      {fertileWindowStart && (
        <p className="mt-2 text-sm text-gray-500">
          Fertile window starts <strong>{formatDate(fertileWindowStart, 'month-day')}</strong>
        </p>
      )}
    </div>
  );
}
