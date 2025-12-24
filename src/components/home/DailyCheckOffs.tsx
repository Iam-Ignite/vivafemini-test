'use client';

import { Card } from '@/components/ui';

interface DailyCheckOffsProps {
  symptoms?: string;
  healthReportStatus?: string;
}

export function DailyCheckOffs({
  symptoms = 'Mild Bloating, Cravings',
  healthReportStatus = 'Pilates (Logged)',
}: DailyCheckOffsProps) {
  return (
    <Card className="h-full">
      <h3 className="font-semibold text-gray-900 mb-4">Daily Check-Offs</h3>

      <div className="divide-y divide-gray-100">
        <div className="flex justify-between items-center pb-4">
          <span className="text-gray-600 text-sm">Symptoms</span>
          <span className="text-primary font-medium text-xs flex items-center gap-1">
            {symptoms} <span>🍂</span>
          </span>
        </div>

        <div className="flex justify-between items-center pt-4">
          <span className="text-gray-600 text-sm">Health Report</span>
          <span className="text-primary font-medium text-xs">
            {healthReportStatus}
          </span>
        </div>
      </div>
    </Card>
  );
}
