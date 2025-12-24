'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui';
import { healthReportService } from '@/services/api';
import { TrendWatch as TrendWatchType } from '@/types';

export function TrendWatch() {
  const [trends, setTrends] = useState<TrendWatchType | null>(null);

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        const response = await healthReportService.getTrends();
        setTrends(response.data);
      } catch (error) {
        console.error('Failed to fetch trends:', error);
      }
    };
    fetchTrends();
  }, []);

  return (
    <Card className="h-full">
      <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <span className="text-lg">📊</span> Trend Watch
      </h3>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 text-xs">Most Frequent Symptom</span>
          <span className="inline-flex px-3 py-1 bg-pink-50 text-primary text-xs font-medium rounded-full border border-pink-200">
            {trends?.mostFrequentSymptom || 'Bloating'}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600 text-xs">Symptom Intensity Change</span>
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full border border-green-200">
            {trends?.symptomIntensityChange || 'Stable'} <span>😊</span>
          </span>
        </div>
      </div>
    </Card>
  );
}
