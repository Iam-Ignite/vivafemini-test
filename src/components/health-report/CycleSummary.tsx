'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui';
import { healthReportService } from '@/services/api';
import { CycleSummary as CycleSummaryType } from '@/types';

export function CycleSummary() {
  const [summary, setSummary] = useState<CycleSummaryType | null>(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await healthReportService.getSummary();
        setSummary(response.data);
      } catch (error) {
        console.error('Failed to fetch summary:', error);
      }
    };
    fetchSummary();
  }, []);

  if (!summary) {
    return (
      <Card>
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-3/4" />
          <div className="flex gap-2">
            <div className="h-8 bg-gray-200 rounded-full w-32" />
            <div className="h-8 bg-gray-200 rounded-full w-32" />
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Cycle Summary – October 2025
      </h2>

      <div className="flex flex-wrap gap-2 mb-3">
        {/* Cycle Length Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-pink-50 border border-pink-200 rounded-full">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E91E8C" strokeWidth="2">
            <path d="M23 4v6h-6M1 20v-6h6" />
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
          </svg>
          <span className="text-sm text-pink-600">Cycle Length:</span>
          <span className="text-sm font-semibold text-pink-700">{summary.cycleLength} Days</span>
        </div>

        {/* Period Duration Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-pink-50 border border-pink-200 rounded-full">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E91E8C" strokeWidth="2">
            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
          </svg>
          <span className="text-sm text-pink-600">Period Duration:</span>
          <span className="text-sm font-semibold text-pink-700">{summary.periodDuration} Days</span>
        </div>

        {/* Estimated Next Period Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-full">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <span className="text-sm text-gray-600">Estimated Next Period:</span>
          <span className="text-sm font-semibold text-gray-800">{summary.estimatedNextPeriod}</span>
        </div>
      </div>

      {/* Ovulation Window Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-50 border border-purple-200 rounded-full">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
        <span className="text-sm text-purple-600">Ovulation Window:</span>
        <span className="text-sm font-semibold text-purple-700">{summary.ovulationWindow}</span>
      </div>
    </Card>
  );
}
