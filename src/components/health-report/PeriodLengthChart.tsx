'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui';
import { healthReportService } from '@/services/api';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  ComposedChart,
} from 'recharts';

interface PeriodData {
  date: string;
  flowIntensity: number;
}

export function PeriodLengthChart() {
  const [data, setData] = useState<PeriodData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await healthReportService.getPeriodLength();
        setData(response.data);
      } catch (error) {
        console.error('Failed to fetch period data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <Card>
      <h2 className="text-lg font-semibold text-gray-900 mb-1">Period Length</h2>
      <p className="text-sm text-gray-600 mb-4">
        Monthly period pattern (0–7 days) and flow intensity
      </p>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 10 }}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
              }}
            />
            <YAxis tick={{ fontSize: 10 }} domain={[0, 10]} />
            <Tooltip
              formatter={(value: number) => [`${value}`, 'Flow Intensity']}
              labelFormatter={(label) => new Date(label).toLocaleDateString()}
            />
            <Area
              type="monotone"
              dataKey="flowIntensity"
              fill="#FFB8D9"
              stroke="none"
              fillOpacity={0.5}
            />
            <Line
              type="monotone"
              dataKey="flowIntensity"
              stroke="#E91E8C"
              strokeWidth={2}
              dot={{ fill: '#E91E8C', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
        ℹ️ Higher peaks indicate stronger symptoms. Flow overlay (pink) shows heavier days.
      </p>
    </Card>
  );
}
