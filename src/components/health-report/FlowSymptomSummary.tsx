'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui';
import { healthReportService } from '@/services/api';

interface FlowSummary {
  averageCycleLength: number;
  description: string;
  tips: string[];
}

export function FlowSymptomSummary() {
  const [summary, setSummary] = useState<FlowSummary | null>(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await healthReportService.getFlowSummary();
        setSummary(response.data);
      } catch (error) {
        console.error('Failed to fetch flow summary:', error);
      }
    };
    fetchSummary();
  }, []);

  if (!summary) {
    return (
      <Card>
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-3/4" />
          <div className="h-20 bg-gray-200 rounded" />
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <h2 className="text-lg font-semibold text-gray-900 mb-1">
        Flow & Symptom Summary
      </h2>
      <p className="text-sm text-gray-500 mb-4">
        Understand your symptoms linked to sleep & activity
      </p>

      <p className="text-gray-700 text-sm mb-4">{summary.description}</p>

      <div className="bg-pink-50 rounded-xl p-4">
        <h4 className="text-primary font-medium text-sm mb-3">Tips To Adhere To:</h4>
        <ul className="space-y-2">
          {summary.tips.map((tip, index) => (
            <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
              <span className="text-gray-400 mt-0.5">•</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
